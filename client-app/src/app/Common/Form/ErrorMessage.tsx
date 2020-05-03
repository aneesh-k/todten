import React from "react";
import { Message } from "semantic-ui-react";
import { AxiosResponse } from "axios";

interface IProps {
	error: AxiosResponse;
	text?: string;
}

const ErrorMessage: React.FC<IProps> = ({ error, text }) => {
	return (
		<Message error>
			<Message.Header>{error.statusText}</Message.Header>
			{error.data && Object.values(error.data.errors).length > 0 && (
				<Message.List>
					{Object.values(error.data.errors)
						.flat()
						.map((err, i) => (
							<Message.Item content={err} key={i} />
						))}
				</Message.List>
			)}
			{text && <Message.Content content={text} />}
		</Message>
	);
};

export default ErrorMessage;
