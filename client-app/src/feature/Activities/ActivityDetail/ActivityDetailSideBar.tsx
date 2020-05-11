import React, { Fragment } from "react";
import { Segment, List, Item, Label, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IActivity } from "../../../app/models/activity";
import { observer } from "mobx-react-lite";

interface IProps {
	activity: IActivity;
}

const ActivityDetailSideBar: React.FC<IProps> = ({ activity }) => {
	return (
		<Fragment>
			<Segment
				textAlign="center"
				style={{ border: "none" }}
				attached="top"
				secondary
				inverted
				color="teal"
			>
				{activity.attendees.length}{" "}
				{activity.attendees.length === 1 ? "Person" : "People"} going
			</Segment>
			<Segment attached>
				<List relaxed divided>
					{activity.attendees.map((attendee) => (
						<Item key={attendee.userName} style={{ position: "relative" }}>
							{attendee.isHost && (
								<Label
									style={{ position: "absolute" }}
									color="orange"
									ribbon="right"
								>
									Host
								</Label>
							)}
							<Image size="tiny" src={attendee.image || "/assets/user.png"} />
							<Item.Content verticalAlign="middle">
								<Item.Header as="h3">
									<Link to={`/profile/${attendee.userName}`}>
										{attendee.displayName}
									</Link>
								</Item.Header>
								{attendee.following && (
									<Item.Extra style={{ color: "orange" }}>Following</Item.Extra>
								)}
							</Item.Content>
						</Item>
					))}
				</List>
			</Segment>
		</Fragment>
	);
};

export default observer(ActivityDetailSideBar);
