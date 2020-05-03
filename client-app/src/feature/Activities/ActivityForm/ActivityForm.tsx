import React, { useState } from "react";
import { Form, Button, Segment, Grid } from "semantic-ui-react";
import { useContext } from "react";
import { IActivity } from "../../../app/models/activity";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/Common/Form/TextInput";
import TextAreaInput from "../../../app/Common/Form/TextAreaInput";
import SelectInput from "../../../app/Common/Form/SelectInput";
import {
	combineValidators,
	isRequired,
	composeValidators,
	hasLengthGreaterThan,
} from "revalidate";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface IMatchProps {
	id: string;
}

const validate = combineValidators({
	title: isRequired({ message: "event title is required" }),
	category: isRequired({ message: "event category is required" }),
	date: isRequired({ message: "event date is required" }),
	city: isRequired({ message: "event city is required" }),
	venue: isRequired({ message: "event venue is required" }),
	description: composeValidators(
		isRequired({ message: "event description is required" }),
		hasLengthGreaterThan(4)({ message: "Length should be greater that 5" })
	)(),
});

const ActivityForm: React.FC<RouteComponentProps<IMatchProps>> = ({
	match,
	history,
}) => {
	const activityStore = useContext(RootStoreContext).activityStore;

	const [activity, setActivity] = useState<IActivity>({
		id: "",
		title: "",
		description: "",
		venue: "",
		city: "",
		date: "",
		category: "",
	});

	const [loader, setLoader] = useState(false);

	useEffect(() => {
		if (match.params.id !== undefined) {
			setLoader(true);
			activityStore
				.getActivity(match.params.id)
				.then(() => {
					activityStore.activity && setActivity(activityStore.activity);
				})
				.finally(() => setLoader(false));
		}
		return () => {
			console.log("COmponent did unmount");
		};
	}, [activityStore, activityStore.getActivity, match.params.id]);

	const onFinalFormSubmit = (values: any) => {
		console.log(values);
		activityStore.AddActiviy(values);
		history.push(`/activities`);
	};

	return (
		<>
			<Grid>
				<Grid.Column width={12}>
					<Segment clearing>
						<FinalForm
							validate={validate}
							onSubmit={onFinalFormSubmit}
							initialValues={activity}
							render={({ handleSubmit, invalid, pristine }) => (
								<Form onSubmit={handleSubmit} loading={loader}>
									<Field
										placeholder="Title"
										name="title"
										value={activity.title}
										component={TextInput}
									/>

									<Field
										component={TextInput}
										name="date"
										type="date"
										label="Date"
										value={activity.date}
									/>
									<Field
										component={TextAreaInput}
										rows={3}
										label="Description"
										name="description"
										value={activity.description}
										placeholder="Description"
									/>
									<Field
										component={SelectInput}
										label="Category"
										placeholder="Category"
										name="category"
										value={activity.category}
									/>
									<Field
										component={TextInput}
										label="City"
										placeholder="City"
										name="city"
										value={activity.city}
									/>
									<Field
										component={TextInput}
										label="Venue"
										placeholder="Venue"
										name="venue"
										value={activity.venue}
									/>
									<Form.Button
										floated="right"
										color="blue"
										disabled={loader || invalid || pristine}
									>
										Submit
									</Form.Button>
									<Button
										floated="right"
										disabled={loader}
										onClick={() => {
											activity.id
												? history.push(`/activities/${activity.id}`)
												: history.push("/activities/");
										}}
									>
										Cancel
									</Button>
								</Form>
							)}
						/>
					</Segment>
				</Grid.Column>
			</Grid>
		</>
	);
};

export default observer(ActivityForm);

// onClick={() => {
// 	if (match.path.includes("createActivity")) {
// 		history.push("/activities");
// 	} else {
// 		history.push(`/activities/${activity.id}`);
// 	}
// }}

// onClick={onFormSubmit}
