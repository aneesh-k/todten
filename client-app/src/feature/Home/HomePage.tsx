import React from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Segment, Container, Header, Button, Image } from "semantic-ui-react";
import { useContext } from "react";
import { RootStoreContext } from "../../app/stores/rootStore";
import LoginForm from "../User/LoginForm";
import RegisterForm from "../User/RegisterForm";

const HomePage = () => {
	const userStore = useContext(RootStoreContext).userStore;
	const modalStore = useContext(RootStoreContext).modalStore;

	return (
		<Segment inverted textAlign="center" vertical className="masthead">
			<Container text>
				<Header as="h1" inverted>
					<Image
						size="massive"
						src="/assets/logo.png"
						alt="logo"
						style={{ marginBottom: 12 }}
					/>
					Reactivities
				</Header>

				{userStore.isLoggedIn && userStore.User ? (
					<>
						<Header
							as="h2"
							inverted
							content={`Welcome back ${userStore.User.displayName}`}
						/>
						<Button as={Link} to="/activities" size="huge" inverted>
							Go to Activities
						</Button>
					</>
				) : (
					<>
						<Button
							onClick={() => modalStore.openModal(<LoginForm />)}
							inverted
							size="large"
						>
							Login
						</Button>
						<Button
							onClick={() => modalStore.openModal(<RegisterForm />)}
							inverted
							size="large"
						>
							Register
						</Button>
					</>
				)}
			</Container>
		</Segment>
	);
};

export default observer(HomePage);
