import React, { Fragment } from "react";
import { Segment, Header, Form, Button, Comment } from "semantic-ui-react";
import { useContext } from "react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextAreaInput from "../../../app/Common/Form/TextAreaInput";
import { formatDistance } from "date-fns";

const ActivityDetailChat = () => {
	const activityStore = useContext(RootStoreContext).activityStore;
	const {
		setHubConnection,
		stopHubConnection,
		sendComment,
		activity,
	} = activityStore;

	useEffect(() => {
		setHubConnection(activity!.id);
		return () => {
			stopHubConnection(activity!.id);
		};
	}, [setHubConnection, stopHubConnection, activity]);

	return (
		<Fragment>
			<Segment
				textAlign="center"
				attached="top"
				inverted
				color="teal"
				style={{ border: "none" }}
			>
				<Header>Chat about this event</Header>
			</Segment>
			<Segment attached>
				<Comment.Group>
					{activity!.comments.map((comment) => (
						<Comment key={comment.id}>
							<Comment.Avatar src={comment.image || "/assets/user.png"} />
							<Comment.Content>
								<Comment.Author as={Link} to={`/profile/${comment.username}`}>
									{comment.displayName}
								</Comment.Author>
								<Comment.Metadata>
									<div>{formatDistance(comment.createdAt, new Date())}</div>
								</Comment.Metadata>
								<Comment.Text>{comment.body}</Comment.Text>
							</Comment.Content>
						</Comment>
					))}

					<FinalForm
						onSubmit={sendComment}
						render={({ handleSubmit, submitting, form }) => (
							<Form onSubmit={() => handleSubmit()!.then(() => form.reset())}>
								<Field
									name="body"
									component={TextAreaInput}
									rows={2}
									placeholder="Add Comment here"
								/>
								<Button
									content="Add Reply"
									labelPosition="left"
									icon="edit"
									primary
									loading={submitting}
								/>
							</Form>
						)}
					/>
				</Comment.Group>
			</Segment>
		</Fragment>
	);
};

export default observer(ActivityDetailChat);
