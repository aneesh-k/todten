import React from "react";
import { IActivity } from "../../../app/models/activity";
import { observer } from "mobx-react-lite";
import { Item, Button, Segment, Icon, Label } from "semantic-ui-react";

import { Link } from "react-router-dom";
import ActivityListAttendeeList from "./ActivityListAttendeeList";

interface IProps {
	activity: IActivity;
}
const ActivityListItem: React.FC<IProps> = ({ activity }) => {
	const hostedBy = activity.attendees.filter((r) => r.isHost)[0];

	return (
		<React.Fragment>
			<Segment.Group>
				<Segment>
					<Item.Group>
						<Item>
							<Item.Image
								size="tiny"
								src={hostedBy.image || "/assets/user.png"}
								circular
							/>

							<Item.Content>
								<Item.Header as={Link} to={`/activities/${activity.id}`}>
									{activity.title}
								</Item.Header>
								<Item.Meta>Hosted by {hostedBy.displayName}</Item.Meta>
								{activity.isGoing && !activity.isHost && (
									<Item.Meta>
										<Label
											basic
											content="You are going to this Activity"
											color="olive"
										/>
									</Item.Meta>
								)}
								{activity.isHost && (
									<Item.Meta>
										<Label
											basic
											content="You are host of this Activity"
											color="blue"
										/>
									</Item.Meta>
								)}
							</Item.Content>
						</Item>
					</Item.Group>
				</Segment>
				<Segment>
					<Icon name="clock" /> {activity.date}{" "}
					<Icon name="marker" floated="right" /> {activity.venue},{" "}
					{activity.city}
				</Segment>
				<Segment secondary>
					<ActivityListAttendeeList attendees={activity.attendees} />
				</Segment>
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
