import React, { useContext, useEffect } from "react";
import { Tab, Grid, Header, Card } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import ProfileCard from "./ProfileCard";
import { observer } from "mobx-react-lite";
const FollowingContent = () => {
	const rootStore = useContext(RootStoreContext);
	const {
		Profile,
		getFollowContent,
		loadingFollowContent,
		following,
	} = rootStore.profileStore;

	useEffect(() => {
		getFollowContent(Profile!.userName, "following");
	}, [getFollowContent, Profile]);

	return (
		<Tab.Pane loading={loadingFollowContent}>
			<Grid>
				<Grid.Column width={16}>
					<Header
						floated="left"
						icon="user"
						content={`People ${Profile!.displayName} is following`}
					/>
				</Grid.Column>
				<Grid.Column width={16}>
					<Card.Group itemsPerRow={5}>
						{following.map((profile) => (
							<ProfileCard key={profile.userName} profile={profile} />
						))}
					</Card.Group>
				</Grid.Column>
			</Grid>
		</Tab.Pane>
	);
};

export default observer(FollowingContent);
