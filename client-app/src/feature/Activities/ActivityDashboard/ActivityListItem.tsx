import React from "react";
import { IActivity } from "../../../app/models/activity";
import { observer } from "mobx-react-lite";
import { Item, Button, Segment, Icon } from "semantic-ui-react";

import { Link } from "react-router-dom";

interface IProps {
	activity: IActivity;
}
const ActivityListItem: React.FC<IProps> = ({ activity }) => {
	return (
		<React.Fragment>
			<Segment.Group>
				<Segment>
					<Item.Group>
						<Item>
							<Item.Image size="tiny" src="/assets/user.png" circular />

							<Item.Content>
								<Item.Header as="a">{activity.title}</Item.Header>
								<Item.Meta>Hosted by Bob</Item.Meta>
							</Item.Content>
						</Item>
					</Item.Group>
				</Segment>
				<Segment>
					<Icon name="clock" /> {activity.date}{" "}
					<Icon name="marker" floated="right" /> {activity.venue},{" "}
					{activity.city}
				</Segment>
				<Segment secondary>Attendees will go here</Segment>
				<Segment clearing>
					{activity.description}
					<Button
						as={Link}
						to={`/activities/${activity.id}`}
						floated="right"
						content="View"
						color="blue"
					/>
				</Segment>
			</Segment.Group>
		</React.Fragment>
	);
};

export default observer(ActivityListItem);
