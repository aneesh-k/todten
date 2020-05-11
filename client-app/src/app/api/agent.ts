import axios, { AxiosResponse } from "axios";
import { IActivity } from "../models/activity";
import { history } from "../..";
import { toast } from "react-toastify";
import { IUser, IUserFormValues } from "../models/user";
import { IProfile, IPhotos } from "../models/profile";

axios.defaults.baseURL = "http://localhost:5000/api/";

axios.interceptors.request.use(
	(config) => {
		const token = window.localStorage.getItem("jwt");

		if (token) config.headers.Authorization = `Bearer ${token}`;
		return config;
	},
	(err) => Promise.reject(err)
);

axios.interceptors.response.use(undefined, (error) => {
	if (error.message === "Network Error" && !error.response) {
		toast.error("Network Error - Check for API status");
	}
	const { status, config, data } = error.response;
	if (status === 404) {
		history.push("/notfound");
	}
	if (
		status === 400 &&
		config.method === "get" &&
		data.errors.hasOwnProperty("id")
	) {
		history.push("/notfound");
	}
	if (status === 500) {
		toast.error("Server Error - Check console for more info");
	}
	// if (status === 400 && config.method === "post") {
	// 	history.push("/notfound");
	// }
	throw error.response;
	//toast.error("Something went wrong with submittig/retreiving data");
});

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
	new Promise<AxiosResponse>((resolve) =>
		setTimeout(() => resolve(response), ms)
	);

const requests = {
	get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
	post: (url: string, body: {}) =>
		axios.post(url, body).then(sleep(1000)).then(responseBody),
	put: (url: string, body: {}) =>
		axios.put(url, body).then(sleep(1000)).then(responseBody),
	del: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody),
	postFormData: (url: string, file: Blob) => {
		let data = new FormData();
		data.append("File", file);
		return axios
			.post(url, data, {
				headers: { "Content-type": "multipart/form-data" },
			})
			.then(responseBody);
	},
};

const Activities = {
	list: (): Promise<IActivity[]> => requests.get("/activities"),
	details: (id: string): Promise<IActivity> =>
		requests.get(`/activities/${id}`),
	create: (activity: IActivity) => requests.post("/activities", activity),
	update: (id: string, activity: IActivity) =>
		requests.put(`/activities/${id}`, activity),
	delete: (id: string) => requests.del(`/activities/${id}`),
	attend: (id: string) => requests.post(`/activities/${id}/attend`, {}),
	unAttend: (id: string) => requests.del(`/activities/${id}/attend`),
};

const Users = {
	current: (): Promise<IUser> => requests.get("/user"),
	login: (user: IUserFormValues): Promise<IUser> =>
		requests.post("/user/login", user),
	register: (user: IUserFormValues): Promise<IUser> =>
		requests.post("/user/register", user),
};

const Profile = {
	get: (username: string): Promise<IProfile> =>
		requests.get(`/profile/${username}`),

	uploadPhoto: (photo: Blob): Promise<IPhotos> =>
		requests.postFormData(`/photo/`, photo),

	setMainImage: (id: string) => requests.post(`/photo/${id}/setmain`, {}),
	deletePhoto: (id: string) => requests.del(`/photo/${id}`),
	follow: (username: string) =>
		requests.post(`/profile/${username}/follow`, {}),
	unfollow: (username: string) => requests.del(`/profile/${username}/follow`),
	getFollowContent: (
		username: string,
		predicate: string
	): Promise<IProfile[]> =>
		requests.get(`/profile/${username}/follow?predicate=${predicate}`),
};

export default {
	Activities,
	Users,
	Profile,
};
