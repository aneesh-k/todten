import { observable, computed, action } from "mobx";
import { IUser, IUserFormValues } from "../models/user";
import agent from "../api/agent";
import { RootStore } from "./rootStore";
import { history } from "../..";

export class UserStore {
	rootStore: RootStore;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	@observable User: IUser | null = null;

	@computed get isLoggedIn() {
		return !!this.User;
	}

	@action login = async (values: IUserFormValues) => {
		try {
			const user = await agent.Users.login(values);
			this.User = user;
			this.rootStore.commonStore.setToken(user.token);
			this.rootStore.modalStore.closeModal();
			history.push("/activities");
		} catch (error) {
			throw error;
		}
	};

	@action logout = () => {
		this.rootStore.commonStore.setToken(null);
		this.User = null;

		history.push("/");
	};

	@action getUser = async () => {
		try {
			const user = await agent.Users.current();
			this.User = user;
		} catch (error) {}
	};

	@action register = async (values: IUserFormValues) => {
		try {
			const user = await agent.Users.register(values);
			this.User = user;
			this.rootStore.commonStore.setToken(user.token);
			this.rootStore.modalStore.closeModal();
			history.push("/activities");
		} catch (error) {
			throw error;
		}
	};
}
