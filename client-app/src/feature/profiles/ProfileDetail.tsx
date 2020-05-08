import React, { useEffect } from "react";
import { Grid, Loader } from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { RouteComponentProps } from "react-router-dom";
import { useContext } from "react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { observer } from "mobx-react-lite";

interface IRouteProps {
	username: string;
}

interface IProps extends RouteComponentProps<IRouteProps> {}

const ProfileDetail: React.FC<IProps> = ({ match }) => {
	const profileStore = useContext(RootStoreContext).profileStore;

	const { profileLoader, getUserProfile, Profile } = profileStore;

	useEffect(() => {
		getUserProfile(match.params.username);
	}, [getUserProfile, match]);

	if (profileLoader) return <Loader active content="Loading Profile ... " />;

	return (
		<Grid>
			<Grid.Column width={16}>
				<ProfileHeader profile={Profile!} />
				<ProfileContent />
			</Grid.Column>
		</Grid>
	);
};

export default observer(ProfileDetail);
