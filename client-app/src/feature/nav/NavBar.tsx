import React from "react";
import { Menu, Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
	return (
		<>
			<Menu fixed="top" inverted>
				<Container>
					<Menu.Item as={Link} to={"/"}>
						<img src="assets/logo.png" alt="" />
					</Menu.Item>

					<Menu.Item exact name="features" as={NavLink} to={"/activities"}>
						Activites
					</Menu.Item>

					<Menu.Item name="testimonials" as={NavLink} to={"/createActivity"}>
						{/* <Button
							positive
							content="Add Activity"
							onClick={activityStore.addActivity}
						/> */}
						Add Activity
					</Menu.Item>
				</Container>
			</Menu>
		</>
	);
};

export default observer(NavBar);
