import React, { Fragment } from "react";
import { Loader, Container, Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivitiesStore from "../../../app/stores/activitiesStore";
import { useContext } from "react";
import { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import ActivityDetailInfo from "./ActivityDetailInfo";
import ActivityDetailChat from "./ActivityDetailChat";
import ActivityDetailSideBar from "./ActivityDetailSideBar";
import ActivityHeader from "./ActivityHeader";

interface IRouteProps {
	id: string;
}

const ActivityDetail: React.FC<RouteComponentProps<IRouteProps>> = ({
	match,
	history,
}) => {
	const activitiesStore = useContext(ActivitiesStore);

	useEffect(() => {
		activitiesStore.getActivity(match.params.id);
	}, [activitiesStore.getActivity, activitiesStore, match.params.id]);

	if (!activitiesStore.activity) return <Loader content="loading" />;

	return (
		<Fragment>
			<Container>
				<Grid>
					<Grid.Column width={10}>
						<ActivityHeader activity={activitiesStore.activity} />
						<ActivityDetailInfo activity={activitiesStore.activity} />
						<ActivityDetailChat />
					</Grid.Column>
					<Grid.Column width={6}>
						<ActivityDetailSideBar />
					</Grid.Column>
				</Grid>
			</Container>
		</Fragment>
	);
};

export default observer(ActivityDetail);

/*

<Card fluid>
				<Image
					src={`/assets/categoryImages/${
						activitiesStore.activity!.category
					}.jpg`}
					wrapped
					ui={false}
				/>
				<Card.Content>
					<Card.Header>{activitiesStore.activity!.title}</Card.Header>
					<Card.Meta>
						<span className="date">{activitiesStore.activity!.date}</span>
					</Card.Meta>
					<Card.Description>
						{activitiesStore.activity!.description}
					</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<Button.Group widths={2}>
						<Button
							primary
							color="blue"
							content="Edit"
							as={Link}
							to={`/manage/${activitiesStore.activity.id}`}
						/>
						<Button
							content="Cancel"
							onClick={() => history.push("/activities")}
						/>
					</Button.Group>
				</Card.Content>
			</Card>

*/
