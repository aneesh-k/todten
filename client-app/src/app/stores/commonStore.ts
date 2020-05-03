import { observable, action } from "mobx";
import { RootStore } from "./rootStore";

export default class CommonStore {
	rootStore: RootStore;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	@observable token: string | null = window.localStorage.getItem("jwt");
	@observable appLoading = false;

	@action setToken(token: string | null) {
		window.localStorage.setItem("jwt", token!);
		this.token = token;
	}

	@action setApploading() {
		this.appLoading = true;
	}
}
