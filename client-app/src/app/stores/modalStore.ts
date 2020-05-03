import { RootStore } from "./rootStore";
import { observable, action } from "mobx";

export default class ModalStore {
	rootStore: RootStore;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	@observable.shallow modelData = {
		open: false,
		body: null,
	};

	@action openModal = (content: any) => {
		this.modelData.open = true;
		this.modelData.body = content;
	};

	@action closeModal = () => {
		this.modelData.open = false;
		this.modelData.body = null;
	};
}
