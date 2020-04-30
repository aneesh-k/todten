import React from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Segment, Container, Header, Button, Image } from "semantic-ui-react";

const HomePage = () => {
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
				<Header as="h2" inverted content="Welcome to Reactivities" />
				<Button as={Link} to="/activities" size="huge" inverted>
					Take me to the activities!
				</Button>
			</Container>
		</Segment>
	);
};

export default observer(HomePage);