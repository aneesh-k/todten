import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import activitiesStore from "../../app/stores/activitiesStore";

const NavBar = () => {
	const activityStore = useContext(activitiesStore);
	return (
		<>
			<Menu fixed="top" inverted>
				<Container>
					<Menu.Item>
						<img src="assets/logo.png" alt="" />
					</Menu.Item>

					<Menu.Item name="features">Activites</Menu.Item>

					<Menu.Item name="testimonials">
						<Button
							positive
							content="Add Activity"
							onClick={activityStore.addActivity}
						/>
					</Menu.Item>
				</Container>
			</Menu>
		</>
	);
};

export default observer(NavBar);
