import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import "./styles.css";
import { Container } from "semantic-ui-react";
import NavBar from "../../feature/nav/NavBar";
import ActivityDashboard from "../../feature/Activities/ActivityDashboard/ActivityDashboard";
import { useContext } from "react";
import ActivityStore from "../stores/activitiesStore";
import "mobx-react-lite/batchingForReactDom";
import { useState } from "react";
import { IActivity } from "../models/activity";

const App = () => {
	const activityStore = useContext(ActivityStore);

	const activity = () => {
		return activityStore.activity;
	};

	useEffect(() => {
		activityStore.getActivities();
	}, [activityStore]);

	return (
		<>
			<NavBar />
			<Container style={{ marginTop: "7em" }}>
				<ActivityDashboard
					activities={activityStore.sortActivitiesByDate}
					activity={activityStore.activity}
				/>
			</Container>
		</>
	);
};

export default observer(App);
