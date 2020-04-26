import React from "react";
import { IActivity } from "../../../app/models/activity";
import { Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import ActivityStore from "../../../app/stores/activitiesStore";
import ActivityListItem from "./ActivityListItem";

interface IProps {
	activities: IActivity[];
}

const ActivityList: React.FC = () => {
	const activityStore = useContext(ActivityStore);

	return (
		<React.Fragment>
			{activityStore.setActivitiesByDate.map(([date, activities]) => (
				<React.Fragment key={date}>
					<Label content={date} color="blue" size="large" />

					{activities.map((r) => (
						<ActivityListItem key={r.id} activity={r} />
					))}
				</React.Fragment>
			))}
		</React.Fragment>
	);
};

export default observer(ActivityList);

/*

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

*/
