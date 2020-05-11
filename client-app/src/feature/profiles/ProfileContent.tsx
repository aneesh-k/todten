import React from "react";
import { Tab } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ProfilePhotos from "./ProfilePhotos";
import FollowingContent from "./FollowingContent";
import FollowersContent from "./FollowersContent";

const panels = [
	{ menuItem: "About", render: () => <Tab.Pane>{"About Content"}</Tab.Pane> },
	{ menuItem: "Photos", render: () => <ProfilePhotos /> },
	{
		menuItem: "Activities",
		render: () => <Tab.Pane>{"Activities Content"}</Tab.Pane>,
	},
	{
		menuItem: "Followers",
		render: () => <FollowersContent />,
	},
	{
		menuItem: "Following",
		render: () => <FollowingContent />,
	},
];

const ProfileContent = () => {
	return (
		<Tab
			menu={{ fluid: true, vertical: true }}
			menuPosition="right"
			panes={panels}
		/>
	);
};

export default observer(ProfileContent);
