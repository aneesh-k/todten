import React from "react";
import { IActivity } from "../../../app/models/activity";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import ActivityStore from "../../../app/stores/activitiesStore";

interface IProps {
	activities: IActivity[];
}

const ActivityList: React.FC<IProps> = ({ activities }) => {
	const activityStore = useContext(ActivityStore);

	return (
		<>
			<Segment clearing>
				<Item.Group divided>
					{activities.map((activity) => (
						<Item key={activity.id}>
							<Item.Content>
								<Item.Header as="a">{activity.title}</Item.Header>
								<Item.Meta>{activity.date}</Item.Meta>
								<Item.Description>
									<div>{activity.city}</div>
									<div>{activity.venue}</div>
								</Item.Description>
								<Item.Extra>
									<Button
										floated="right"
										content="View"
										color="blue"
										onClick={() => activityStore.getActivity(activity.id)}
									/>
									<Button
										floated="right"
										content="Delete"
										color="red"
										onClick={() => activityStore.deleteActivity(activity.id)}
									/>
									<Label basic content={activity.category} />
								</Item.Extra>
							</Item.Content>
						</Item>
					))}
				</Item.Group>
			</Segment>
		</>
	);
};

export default observer(ActivityList);
