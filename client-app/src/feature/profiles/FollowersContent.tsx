import React, { useContext, useEffect } from "react";
import { Tab, Grid, Header, Card } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import ProfileCard from "./ProfileCard";
import { observer } from "mobx-react-lite";

const FollowersContent = () => {
	const rootStore = useContext(RootStoreContext);
	const {
		Profile,
		getFollowContent,
		loadingFollowContent,
		followers,
	} = rootStore.profileStore;

	useEffect(() => {
		getFollowContent(Profile!.userName, "followers");
	}, [getFollowContent, Profile]);

	return (
		<Tab.Pane loading={loadingFollowContent}>
			<Grid>
				<Grid.Column width={16}>
					<Header
						floated="left"
						icon="user"
						content={`People following ${Profile!.displayName}`}
					/>
				</Grid.Column>
				<Grid.Column width={16}>
					<Card.Group itemsPerRow={5}>
						{followers.map((profile) => (
							<ProfileCard key={profile.userName} profile={profile} />
						))}
					</Card.Group>
				</Grid.Column>
			</Grid>
		</Tab.Pane>
	);
};

export default observer(FollowersContent);
