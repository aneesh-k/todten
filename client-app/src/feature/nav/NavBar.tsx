import React from "react";
import { Menu, Container, Image as I, Dropdown } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { RootStoreContext } from "../../app/stores/rootStore";

const NavBar = () => {
	const userStore = useContext(RootStoreContext).userStore;

	return (
		<>
			<Menu fixed="top" inverted>
				<Container>
					<Menu.Item as={Link} to={"/"}>
						<I avatar src={"assets/logo.png"} alt="" />
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
					{userStore.User && (
						<Menu.Item position="right">
							<I
								avatar
								spaced="right"
								src={userStore.User.image || "/assets/user.png"}
							/>
							<Dropdown
								pointing="top left"
								text={`${userStore.User.displayName}`}
							>
								<Dropdown.Menu>
									<Dropdown.Item
										as={Link}
										to={`/profile/${userStore.User.username}`}
										text="My profile"
										icon="user"
									/>
									<Dropdown.Item
										onClick={userStore.logout}
										text="Logout"
										icon="power"
									/>
								</Dropdown.Menu>
							</Dropdown>
						</Menu.Item>
					)}
				</Container>
			</Menu>
		</>
	);
};

export default observer(NavBar);
