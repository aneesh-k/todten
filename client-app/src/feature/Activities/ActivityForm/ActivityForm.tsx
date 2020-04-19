import React, { useState, FormEvent } from "react";
import { Form, Button, Segment, Grid } from "semantic-ui-react";
import { useContext } from "react";
import ActivitiesStore from "../../../app/stores/activitiesStore";
import { IActivity } from "../../../app/models/activity";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";

interface IMatchProps {
	id: string;
}

const ActivityForm: React.FC<RouteComponentProps<IMatchProps>> = ({
	match,
	history,
}) => {
	const activityStore = useContext(ActivitiesStore);

	// const finalActivity = (): IActivity => {
	// 	if (initActivity == null) {
	// 		return {
	// 			id: "",
	// 			title: "",
	// 			description: "",
	// 			venue: "",
	// 			city: "",
	// 			date: "",
	// 			category: "",
	// 		};
	// 	} else {
	// 		return initActivity;
	// 	}
	// };

	const [activity, setActivity] = useState<IActivity>({
		id: "",
		title: "",
		description: "",
		venue: "",
		city: "",
		date: "",
		category: "",
	});

	useEffect(() => {
		console.log("params");
		console.log(match.params.id);
		if (match.params.id !== undefined) {
			activityStore.getActivity(match.params.id).then(() => {
				activityStore.activity && setActivity(activityStore.activity);
			});
		}

		return () => {
			console.log("COmponent did unmount");
		};
	}, [activityStore, activityStore.getActivity, match.params.id]);

	const onChangeInput = (
		e: FormEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setActivity({ ...activity, [e.currentTarget.name]: e.currentTarget.value });
	};

	const onFormSubmit = () => {
		console.log(activity);
		activityStore.AddActiviy(activity);
		history.push("/activities");
	};

	return (
		<>
			<Grid>
				<Grid.Column width={12}>
					<Segment clearing>
						<Form>
							<Form.Input
								onChange={onChangeInput}
								label="Title"
								name="title"
								value={activity.title}
							/>

							<Form.Input
								onChange={onChangeInput}
								name="date"
								type="date"
								label="Date"
								value={activity.date}
							/>
							<Form.TextArea
								onChange={onChangeInput}
								rows={2}
								label="Description"
								name="description"
								value={activity.description}
								placeholder="Description"
							/>
							<Form.Input
								onChange={onChangeInput}
								label="Category"
								placeholder="Category"
								name="category"
								value={activity.category}
							/>
							<Form.Input
								onChange={onChangeInput}
								label="City"
								placeholder="City"
								name="city"
								value={activity.city}
							/>
							<Form.Input
								onChange={onChangeInput}
								label="Venue"
								placeholder="Venue"
								name="venue"
								value={activity.venue}
							/>
							<Form.Button floated="right" color="blue" onClick={onFormSubmit}>
								Submit
							</Form.Button>
							<Button
								floated="right"
								onClick={() => {
									if (match.path.includes("createActivity")) {
										history.push("/activities");
									} else {
										history.push(`/activities/${activity.id}`);
									}
								}}
							>
								Cancel
							</Button>
						</Form>
					</Segment>
				</Grid.Column>
			</Grid>
		</>
	);
};

export default observer(ActivityForm);
