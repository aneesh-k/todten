import React from "react";
import { Container, Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetail from "../ActivityDetail/ActivityDetail";
import ActivityForm from "../ActivityDetail/ActivityForm";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import ActivityStore from "../../../app/stores/activitiesStore";

interface IProps {
	activities: IActivity[];
	activity: IActivity | null;
}

const ActivityDashboard: React.FC<IProps> = (props) => {
	const activityStore = useContext(ActivityStore);

	return (
		<>
			<Container>
				<Grid>
					<Grid.Column width={8}>
						<ActivityList
							key={props.activities.length}
							activities={props.activities}
						/>
					</Grid.Column>
					<Grid.Column width={6}>
						{activityStore.activity && activityStore.displayActivityForm && (
							<ActivityDetail activity={props.activity!} />
						)}
						{activityStore.displayAddForm && (
							<ActivityForm
								key={props.activity?.id}
								activity={props.activity!}
							/>
						)}
					</Grid.Column>
				</Grid>
			</Container>
		</>
	);
};

export default observer(ActivityDashboard);
