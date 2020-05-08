export interface IProfile {
	userName: string;
	displayName: string;
	image: string;
	bio: string;
	photos: IPhotos[];
}

export interface IPhotos {
	id: string;
	url: string;
	isMain: boolean;
}
