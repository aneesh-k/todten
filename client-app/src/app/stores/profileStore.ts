import { RootStore } from "./rootStore";
import { action, observable, computed } from "mobx";
import { IProfile, IPhotos } from "../models/profile";
import agent from "../api/agent";
import { toast } from "react-toastify";

export default class ProfileStore {
	rootStore: RootStore;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	@observable profileLoader = true;
	@observable uploadingPhoto = false;
	@observable setMainLoading = false;
	@observable delPhotoLoading = false;

	@observable Profile: IProfile | null = null;

	@computed get isCurrentUser() {
		if (this.Profile?.userName === this.rootStore.userStore.User?.username)
			return true;
		else {
			return false;
		}
	}

	@action getUserProfile = async (username: string) => {
		this.profileLoader = true;
		try {
			const profile = await agent.Profile.get(username);
			this.Profile = profile;
			this.profileLoader = false;
		} catch (error) {
			this.profileLoader = false;
			console.log(error);
		}
	};

	@action uploadPhoto = async (file: Blob) => {
		this.uploadingPhoto = true;
		try {
			const photo = await agent.Profile.uploadPhoto(file);

			this.Profile!.photos.push(photo);

			if (photo.isMain && this.rootStore.userStore.User) {
				this.rootStore.userStore.User.image = photo.url;
				this.Profile!.image = photo.url;
			}
			this.uploadingPhoto = false;
		} catch (error) {
			this.uploadingPhoto = false;

			console.log(error);
			toast.error("Problem uploading photo");
		}
	};

	@action setMainPhoto = async (photo: IPhotos) => {
		this.setMainLoading = true;
		try {
			await agent.Profile.setMainImage(photo.id);
			this.Profile!.photos.find((x) => x.isMain)!.isMain = false;

			this.Profile!.photos.find((x) => x.id === photo.id)!.isMain = true;
			this.rootStore.userStore.User!.image = photo.url;
			this.Profile!.image = photo.url;
			this.setMainLoading = false;
		} catch (error) {
			this.setMainLoading = false;
			console.log(error);
			toast.error("Unable to set main photo");
		}
	};

	@action deletePhoto = async (photo: IPhotos) => {
		this.delPhotoLoading = true;
		try {
			await agent.Profile.deletePhoto(photo.id);
			this.Profile!.photos = this.Profile!.photos.filter(
				(x) => x.id !== photo.id
			);
			this.delPhotoLoading = false;
		} catch (error) {
			toast.error("unable to delete photo");
			console.log(error);
			this.delPhotoLoading = true;
		}
	};
}
