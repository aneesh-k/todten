import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import "./styles.css";
import { Container } from "semantic-ui-react";
import NavBar from "../../feature/nav/NavBar";
import ActivityDashboard from "../../feature/Activities/ActivityDashboard/ActivityDashboard";
import { useContext } from "react";
import ActivityStore from "../stores/activitiesStore";
import "mobx-react-lite/batchingForReactDom";
import {
	Route,
	withRouter,
	RouteComponentProps,
	Switch,
} from "react-router-dom";
import HomePage from "../../feature/Home/HomePage";
import ActivityForm from "../../feature/Activities/ActivityForm/ActivityForm";
import ActivityDetail from "../../feature/Activities/ActivityDetail/ActivityDetail";
import NotFound from "./NotFound";
import { ToastContainer } from "react-toastify";

const App: React.FC<RouteComponentProps> = ({ location }) => {
	const activityStore = useContext(ActivityStore);

	useEffect(() => {
		activityStore.getActivities();
	}, [activityStore]);

	return (
		<React.Fragment>
			<ToastContainer position="bottom-right" />
			<Route exact path="/" component={HomePage} />
			<Route
				path="/(.+)"
				render={() => (
					<Container style={{ margin: "7em" }}>
						<NavBar />
						<Switch>
							<Route exact path="/activities" component={ActivityDashboard} />
							<Route
								exact
								key={location.key}
								path={["/createActivity", "/manage/:id"]}
								component={ActivityForm}
							/>
							<Route exact path="/activities/:id" component={ActivityDetail} />
							<Route component={NotFound} />
						</Switch>
					</Container>
				)}
			/>
		</React.Fragment>
	);
};

export default withRouter(observer(App));
