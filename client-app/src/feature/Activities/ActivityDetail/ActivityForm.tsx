import React, { useState, FormEvent } from "react";
import { Form, Button, Segment } from "semantic-ui-react";
import { useContext } from "react";
import activitiesStore from "../../../app/stores/activitiesStore";
import { IActivity } from "../../../app/models/activity";
import { observer } from "mobx-react-lite";

interface IProps {
	activity: IActivity;
}

const ActivityForm: React.FC<IProps> = ({ activity: initActivity }) => {
	const activityStore = useContext(activitiesStore);

	const finalActivity = (): IActivity => {
		if (initActivity == null) {
			return {
				id: "",
				title: "",
				description: "",
				venue: "",
				city: "",
				date: "",
				category: "",
			};
		} else {
			return initActivity;
		}
	};

	const [activity, setActivity] = useState<IActivity>(finalActivity);

	const onChangeInput = (
		e: FormEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setActivity({ ...activity, [e.currentTarget.name]: e.currentTarget.value });
	};

	const onFormSubmit = () => {
		console.log(activity);
		activityStore.AddActiviy(activity);
	};

	return (
		<>
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
					<Button floated="right" onClick={activityStore.displayAddFormFalse}>
						Cancel
					</Button>
				</Form>
			</Segment>
		</>
	);
};

export default observer(ActivityForm);
