export interface IActivity {
	id: string;
	title: string;
	date: string;
	description: string;
	category: string;
	city: string;
	venue: string;
	isHost: boolean;
	isGoing: boolean;
	attendees: IAttendee[];
}

export interface IFormActivity {
	id: string;
	title: string;
	date: string;
	description: string;
	category: string;
	city: string;
	venue: string;
}

export interface IAttendee {
	userName: string;
	displayName: string;
	isHost: boolean;
	image: string;
}
