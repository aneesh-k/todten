import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import "./styles.css";
import { Container, Loader } from "semantic-ui-react";
import NavBar from "../../feature/nav/NavBar";
import ActivityDashboard from "../../feature/Activities/ActivityDashboard/ActivityDashboard";
import { useContext } from "react";
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
import { RootStoreContext } from "../stores/rootStore";
import ModalContainer from "../Common/Modals/ModalContainer";
import ProfileDetail from "../../feature/profiles/ProfileDetail";

const App: React.FC<RouteComponentProps> = ({ location }) => {
	const commonStore = useContext(RootStoreContext).commonStore;
	const userStore = useContext(RootStoreContext).userStore;

	useEffect(() => {
		if (commonStore.token) {
			userStore.getUser().finally(() => commonStore.setApploading());
		} else {
			commonStore.setApploading();
		}
	}, [userStore, commonStore]);

	if (!commonStore.appLoading)
		return <Loader content="loading" active inline="centered" />;

	return (
		<React.Fragment>
			<ModalContainer />
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
							<Route path="/profile/:username" component={ProfileDetail} />
							<Route component={NotFound} />
						</Switch>
					</Container>
				)}
			/>
		</React.Fragment>
	);
};

export default withRouter(observer(App));
