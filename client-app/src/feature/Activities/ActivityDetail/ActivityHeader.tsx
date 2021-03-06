import React from "react";
import { Segment, Item, Header, Button, Image } from "semantic-ui-react";

import { IActivity } from "../../../app/models/activity";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { RootStoreContext } from "../../../app/stores/rootStore";

const activityImageStyle = {
	filter: "brightness(30%)",
};

const activityImageTextStyle = {
	position: "absolute",
	bottom: "5%",
	left: "5%",
	width: "100%",
	height: "auto",
	color: "white",
};

interface IProps {
	activity: IActivity;
}

const ActivityHeader: React.FC<IProps> = ({ activity }) => {
	const activityStore = useContext(RootStoreContext).activityStore;
	const hostDetails = activityStore.activity?.attendees.filter(
		(r) => r.isHost
	)[0];

	return (
		<Segment.Group>
			<Segment basic attached="top" style={{ padding: "0" }}>
				<Image
					src={`/assets/categoryImages/${activity.category}.jpg`}
					fluid
					style={activityImageStyle}
				/>
				<Segment basic style={activityImageTextStyle}>
					<Item.Group>
						<Item>
							<Item.Content>
								<Header
									size="huge"
									content={activity.title}
									style={{ color: "white" }}
								/>
								<p>{activity.date.split("T")[0]}</p>
								<p>
									Hosted by{" "}
									<Link to={`/profile/${hostDetails?.userName}`}>
										<strong>{hostDetails?.displayName}</strong>
									</Link>
								</p>
							</Item.Content>
						</Item>
					</Item.Group>
				</Segment>
			</Segment>
			<Segment clearing attached="bottom">
				{activity.isHost ? (
					<Button
						as={Link}
						to={`/manage/${activity.id}`}
						color="orange"
						floated="right"
					>
						Manage Event
					</Button>
				) : activity.isGoing ? (
					<Button
						onClick={activityStore.deleteAttendee}
						loading={activityStore.attendLoader}
					>
						Cancel attendance
					</Button>
				) : (
					<Button
						onClick={activityStore.addAttendee}
						loading={activityStore.attendLoader}
						color="teal"
					>
						Join Activity
					</Button>
				)}
			</Segment>
		</Segment.Group>
	);
};

export default observer(ActivityHeader);
