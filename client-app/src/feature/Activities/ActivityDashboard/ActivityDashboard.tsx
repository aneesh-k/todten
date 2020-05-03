import React, { useEffect } from "react";
import { Container, Grid, Loader } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { RootStoreContext } from "../../../app/stores/rootStore";

const ActivityDashboard: React.FC = () => {
	const activityStore = useContext(RootStoreContext).activityStore;

	useEffect(() => {
		activityStore.getActivities();
	}, [activityStore]);

	if (activityStore.loadingInitial)
		return <Loader content="loading" active inline="centered" />;

	return (
		<>
			<Container>
				<Grid>
					<Grid.Column width={8}>
						<ActivityList key={activityStore.activities.length} />
					</Grid.Column>
					<Grid.Column width={4}>
						<h2>Activity Filters</h2>
					</Grid.Column>
				</Grid>
			</Container>
		</>
	);
};

export default observer(ActivityDashboard);
