import { observable, action, computed } from "mobx";
import { createContext } from "react";
import { IActivity } from "../models/activity";
import { v4 } from "uuid";
import agent from "../api/agent";

class ActivitiesStore {
	//to store Activities List
	@observable activities: IActivity[] = [];

	@observable activityRegistry = new Map();

	//to store single Activity
	@observable activity: IActivity | null = null;

	//toggle display of Add/edit form
	@observable displayAddForm = false;

	//toggle Activity form
	@observable displayActivityForm = false;

	@computed get sortActivitiesByDate() {
		return Array.from(this.activityRegistry.values()).sort(
			(a, b) => Date.parse(a.date) - Date.parse(b.date)
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
	@action getActivity = (id: string) => {
		this.activity = this.activityRegistry.get(id);
		this.displayActivityForm = true;
		this.displayAddForm = false;
	};

	//Add Activity
	@action AddActiviy = (activity: IActivity) => {
		//activity.id = this.activity.id ===null ? this.activity.id: v4() :
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

	// hide view activity card
	@action onCancelDetailButton = () => {
		this.displayActivityForm = false;
	};

	//to display New Activity form
	@action displayAddFormTrue = () => {
		this.displayAddForm = true;
	};

	@action addActivity = () => {
		this.activity = null;
		this.displayAddForm = true;
	};

	//hide add activity form
	@action displayAddFormFalse = () => {
		this.displayAddForm = false;
	};
}

export default createContext(new ActivitiesStore());
