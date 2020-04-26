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
	@observable loadingInitial = false;

	// //toggle Activity form
	// @observable displayActivityForm = false;

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
		this.loadingInitial = true;
		try {
			const activities = await agent.Activities.list();
			activities.forEach((r) => {
				r.date = r.date.split("T")[0];
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
		const data = this.activityRegistry.get(id);
		if (data) {
			this.activity = data;
		} else {
			try {
				const resp = await agent.Activities.details(id);
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

		// .then(() => {
		// 	this.activityRegistry.delete(id);
		// 	console.log("deleted");
		// 	this.activity = null;
		// })
		// .catch(() => {
		// 	console.log("Value not deleted.");
		// });
	};
}

export default createContext(new ActivitiesStore());
