import React from "react";
import {
	Segment,
	Item,
	Header,
	Button,
	Grid,
	Statistic,
	Divider,
	Reveal,
} from "semantic-ui-react";
import { IProfile } from "../../app/models/profile";
import { observer } from "mobx-react-lite";

interface IProps {
	profile: IProfile;
	isCurrentUser: boolean;
	follow: (username: string) => void;
	unfollow: (username: string) => void;
	followersLoader: boolean;
}

const ProfileHeader: React.FC<IProps> = ({
	profile,
	isCurrentUser,
	follow,
	unfollow,
	followersLoader,
}) => {
	return (
		<Segment>
			<Grid>
				<Grid.Column width={12}>
					<Item.Group>
						<Item>
							<Item.Image
								avatar
								size="small"
								src={profile.image || "/assets/user.png"}
							/>
							<Item.Content verticalAlign="middle">
								<Header as="h1">{profile.displayName}</Header>
							</Item.Content>
						</Item>
					</Item.Group>
				</Grid.Column>
				<Grid.Column width={4}>
					<Statistic.Group widths={2}>
						<Statistic label="Followers" value={profile.followerCount} />
						<Statistic label="Following" value={profile.followingCount} />
					</Statistic.Group>
					<Divider />
					{!isCurrentUser && (
						<Reveal animated="move">
							<Reveal.Content visible style={{ width: "100%" }}>
								<Button
									fluid
									color="teal"
									content={profile.isFollowed ? "Unfollow" : "Follow"}
								/>
							</Reveal.Content>
							<Reveal.Content hidden>
								<Button
									loading={followersLoader}
									fluid
									basic
									color={profile.isFollowed ? "red" : "green"}
									content={profile.isFollowed ? "Unfollow" : "Follow"}
									onClick={
										profile.isFollowed
											? () => unfollow(profile.userName)
											: () => follow(profile.userName)
									}
								/>
							</Reveal.Content>
						</Reveal>
					)}
				</Grid.Column>
			</Grid>
		</Segment>
	);
};

export default observer(ProfileHeader);
