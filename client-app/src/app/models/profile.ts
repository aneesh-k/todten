export interface IProfile {
	userName: string;
	displayName: string;
	image: string;
	bio: string;
	photos: IPhotos[];
	isFollowed: boolean;
	followerCount: number;
	followingCount: number;
}

export interface IPhotos {
	id: string;
	url: string;
	isMain: boolean;
}
