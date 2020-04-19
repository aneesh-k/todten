import { observable, action, computed } from "mobx";
import { createContext } from "react";
import { IActivity } from "../models/activity";
import { v4 } from "uuid";
import agent from "../api/agent";

class ActivitiesStore {
	//to store Activities List
	@observable activities: IActivity[] = [];

	@observable activityRegistry = new Map<string, IActivity>();

	//to store single Activity
	@observable activity: IActivity | null | undefined;

	//toggle display of Add/edit form
	@observable displayAddForm = false;

	//toggle Activity form
	@observable displayActivityForm = false;

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
	@action getActivities = () => {
		agent.Activities.list().then((activity) => {
			activity.forEach((r) => {
				r.date = r.date.split("T")[0];
				this.activities.push(r);
				this.activityRegistry.set(r.id, r);
			});
		});
	};

	//to display Activity form
	@action getActivity2 = async (id: string) => {
		const data = this.activityRegistry.get(id);
		if (this.activity) {
			this.activity = data;
		} else {
			agent.Activities.details(id)
				.then((resp) => {
					this.activity = resp;
				})
				.catch((error) => {
					console.log("No data with the given ID");
				});
		}
	};

	@action getActivity = async (id: string) => {
		const data = this.activityRegistry.get(id);
		if (this.activity) {
			this.activity = data;
		} else {
			const resp = await agent.Activities.details(id);
			try {
				this.activity = resp;
			} catch {
				console.log("No data found with the given ID");
			}
		}
	};

	//Add Activity
	@action AddActiviy = (activity: IActivity) => {
		if (activity.id.length < 1) {
			activity.id = v4();
			agent.Activities.create(activity)
				.then((resp) => {
					this.activityRegistry.set(activity.id, activity);
					console.log("added");
					this.displayAddForm = false;
				})
				.catch((reason) => {
					console.log("New activity not added in");
				});
		} else {
			agent.Activities.update(activity.id, activity)
				.then((resp) => {
					this.activityRegistry.set(activity.id, activity);
					console.log("added");
					this.activity = activity;
					this.displayAddForm = false;
				})
				.catch((reason) => {
					console.log("New activity not added in");
				});
		}
	};

	@action deleteActivity = (id: string) => {
		agent.Activities.delete(id)
			.then(() => {
				this.activityRegistry.delete(id);
				console.log("deleted");
				this.activity = null;
				this.displayAddForm = false;
			})
			.catch(() => {
				console.log("Value not deleted.");
			});
	};
}

export default createContext(new ActivitiesStore());
