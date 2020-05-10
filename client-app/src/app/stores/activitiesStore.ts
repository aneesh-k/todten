import { observable, action, computed } from "mobx";
import { IActivity, IAttendee } from "../models/activity";
import { v4 } from "uuid";
import agent from "../api/agent";
import { RootStore } from "./rootStore";
import { toast } from "react-toastify";
import {
	HubConnection,
	HubConnectionBuilder,
	LogLevel,
} from "@microsoft/signalr";
import { setTimeout } from "timers";

export class ActivitiesStore {
	rootStore: RootStore;
	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	//to store Activities List
	@observable activities: IActivity[] = [];

	@observable activityRegistry = new Map<string, IActivity>();

	//to store single Activity
	@observable activity: IActivity | null | undefined;

	//toggle display of Add/edit form
	@observable loadingInitial = false;

	@observable attendLoader = false;

	@observable.ref hubConnection: HubConnection | null = null;

	@action setHubConnection = async (activityId: string) => {
		this.hubConnection = new HubConnectionBuilder()
			.withUrl("http://localhost:5000/chat", {
				accessTokenFactory: () => this.rootStore.commonStore.token!,
			})
			.configureLogging(LogLevel.Information)
			.build();

		this.hubConnection
			.start()
			.catch(() => console.log("error starting the connection"))
			.then(() => {
				setTimeout(() => {}, 1000);
				this.hubConnection!.invoke("AddToGroup", activityId)
					.then(() => {})
					.catch(() => {
						console.log("Inside error of then invoek");
					});
			})
			.catch((err) => console.log("Error establishing connection", err));

		// try {
		// 	await this.hubConnection.start();
		// } catch (err) {
		// 	console.log("unable to start and connection failed", err);
		// }

		// this.hubConnection!.invoke("AddToGroup", activityId).catch((err) =>
		// 	console.log("err", err)
		// );

		this.hubConnection.on("ReceiveComment", (comment) => {
			this.activity!.comments.push(comment);
		});
	};

	@action stopHubConnection = (activityId: string) => {
		this.hubConnection!.invoke("RemoveFromGroup", activityId)
			.then(() => {
				this.hubConnection!.stop();
			})
			.catch((err) => console.log(err));
	};

	@action sendComment = async (values: any) => {
		values.activityId = this.activity!.id;
		values.username = this.rootStore.userStore.User!.username;
		try {
			await this.hubConnection!.invoke("SendComment", values);
		} catch (err) {
			console.log(err);
		}
	};

	@computed get setActivitiesByDate() {
		return this.sortActivitiesByDateFunc(
			Array.from(this.activityRegistry.values())
		);
	}

	sortActivitiesByDateFunc(activities: IActivity[]) {
		const sortedArray = activities.sort(
			(a, b) => Date.parse(a.date) - Date.parse(b.date)
		);
		return Object.entries(
			sortedArray.reduce((activities, activity) => {
				activities[activity.date] = activities[activity.date]
					? [...activities[activity.date], activity]
					: [activity];
				return activities;
			}, {} as { [key: string]: IActivity[] })
		);
	}

	//get list of activities from the API
	@action getActivities = async () => {
		if (this.rootStore.userStore.User === null) {
			this.rootStore.userStore.getUser();
		}
		const user = this.rootStore.userStore.User!;
		this.loadingInitial = true;
		try {
			const activities = await agent.Activities.list();
			activities.forEach((r) => {
				r.date = r.date.split("T")[0];
				r.isHost = r.attendees.some(
					(x) => x.userName === user.username && x.isHost
				);
				r.isGoing = r.attendees.some((x) => x.userName === user.username);
				this.activities.push(r);
				this.activityRegistry.set(r.id, r);
			});
			this.loadingInitial = false;
		} catch (error) {
			this.loadingInitial = false;
			console.log(error);
			console.log("Activities not loaded.");
		}
	};

	//to display Activity form
	@action getActivity = async (id: string) => {
		this.loadingInitial = true;
		const user = this.rootStore.userStore.User!;
		const data = this.activityRegistry.get(id);
		if (data) {
			this.activity = data;
		} else {
			try {
				const resp = await agent.Activities.details(id);
				resp.isGoing = resp.attendees.some((r) => r.userName === user.username);
				resp.isHost = resp.attendees.some(
					(r) => r.userName === user.username && r.isHost
				);
				this.activity = resp;
			} catch {
				console.log("No data found with the given ID");
			}
		}
		this.loadingInitial = false;
	};

	//Add Activity
	@action AddActiviy = async (activity: IActivity) => {
		if (activity.id.length < 1) {
			activity.id = v4();
			try {
				await agent.Activities.create(activity);
				const attendee: IAttendee = {
					isHost: true,
					userName: this.rootStore.userStore.User!.username,
					displayName: this.rootStore.userStore.User!.displayName,
					image: this.rootStore.userStore.User!.image!,
				};
				const attendees = [];
				attendees.push(attendee);
				activity.comments = [];
				activity.isHost = true;
				activity.attendees = attendees;
				this.activityRegistry.set(activity.id, activity);
				this.activity = activity;
				console.log("added");
			} catch (error) {
				console.log("Error adding data");
			}
		} else {
			try {
				await agent.Activities.update(activity.id, activity);
				this.activityRegistry.set(activity.id, activity);
				console.log("added");
				this.activity = activity;
			} catch (error) {
				console.log("activity not updated");
			}
		}
	};

	@action deleteActivity = async (id: string) => {
		try {
			await agent.Activities.delete(id);
			this.activityRegistry.delete(id);
			console.log("deleted");
			this.activity = null;
		} catch (error) {
			console.log("Value not deleted.");
		}
	};

	@action addAttendee = async () => {
		this.attendLoader = true;
		try {
			await agent.Activities.attend(this.activity!.id);
			if (this.activity) {
				const newAttendee: IAttendee = {
					isHost: false,
					userName: this.rootStore.userStore.User!.username,
					displayName: this.rootStore.userStore.User!.displayName,
					image: this.rootStore.userStore.User!.image!,
				};

				this.activity.attendees.push(newAttendee);
				this.activity.isGoing = true;
				this.activityRegistry.set(this.activity.id, this.activity);
				this.attendLoader = false;
			}
		} catch (error) {
			this.attendLoader = false;
			toast.error("unable to join the activity");
		}
	};

	@action deleteAttendee = async () => {
		this.attendLoader = true;
		try {
			await agent.Activities.unAttend(this.activity!.id);
			if (this.activity) {
				this.activity.attendees = this.activity.attendees.filter(
					(r) => r.userName !== this.rootStore.userStore.User!.username
				);
				this.activity.isGoing = false;
				this.activityRegistry.set(this.activity.id, this.activity);
				this.attendLoader = false;
			}
		} catch (error) {
			this.attendLoader = false;
			toast.error("Unable to remove from activity");
		}
	};
}

//export default createContext(new ActivitiesStore());
