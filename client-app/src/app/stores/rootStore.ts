import { UserStore } from "./userStore";
import { ActivitiesStore } from "./activitiesStore";
import { createContext } from "react";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";

export class RootStore {
	userStore: UserStore;
	activityStore: ActivitiesStore;
	commonStore: CommonStore;
	modalStore: ModalStore;

	constructor() {
		this.activityStore = new ActivitiesStore(this);
		this.userStore = new UserStore(this);
		this.commonStore = new CommonStore(this);
		this.modalStore = new ModalStore(this);
	}
}

export const RootStoreContext = createContext(new RootStore());
