import React from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { observer } from "mobx-react-lite";
import ActivitiesStore from "../../../app/stores/activitiesStore";
import { useContext } from "react";

interface IProps {
	activity: IActivity;
}

const ActivityDetail: React.FC<IProps> = ({ activity }) => {
	const activitiesStore = useContext(ActivitiesStore);
	return (
		<>
			<Card fluid>
				<Image
					src={`/assets/categoryImages/${activity.category}.jpg`}
					wrapped
					ui={false}
				/>
				<Card.Content>
					<Card.Header>{activity.title}</Card.Header>
					<Card.Meta>
						<span className="date">{activity.date}</span>
					</Card.Meta>
					<Card.Description>{activity.description}</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<Button.Group widths={2}>
						<Button
							primary
							color="blue"
							content="Edit"
							onClick={activitiesStore.displayAddFormTrue}
						/>
						<Button
							content="Cancel"
							onClick={activitiesStore.onCancelDetailButton}
						/>
					</Button.Group>
				</Card.Content>
			</Card>
		</>
	);
};

export default observer(ActivityDetail);
