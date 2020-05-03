import React from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Header } from "semantic-ui-react";
import TextInput from "../../app/Common/Form/TextInput";
import { useContext } from "react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { IUserFormValues } from "../../app/models/user";
import { combineValidators, isRequired } from "revalidate";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import ErrorMessage from "../../app/Common/Form/ErrorMessage";

const LoginForm = () => {
	const userStore = useContext(RootStoreContext).userStore;

	const [errors, setErrors]: any = useState(null);
	const [loader, setLoader] = useState(false);
	var validate = combineValidators({
		email: isRequired("email"),
		password: isRequired("password"),
	});

	return (
		<React.Fragment>
			<Header
				as={"h2"}
				content="LogIn to Activities"
				textAlign="center"
				color="teal"
			/>
			<FinalForm
				onSubmit={(values: IUserFormValues) => {
					setLoader(true);
					userStore.login(values).catch((err) => {
						setErrors(err);
						setLoader(false);
					});
				}}
				validate={validate}
				render={({ handleSubmit, pristine }) => (
					<Form onSubmit={handleSubmit} error>
						<Field name="email" component={TextInput} placeholder="Email" />
						<Field
							name="password"
							component={TextInput}
							placeholder="Password"
							type="password"
						/>

						{errors && (
							<ErrorMessage
								error={errors}
								text={"Inavalid UserName or Password"}
							/>
						)}
						<br />
						<Button
							disabled={pristine}
							loading={loader}
							positive
							fluid
							content="Login"
						/>
					</Form>
				)}
			/>
		</React.Fragment>
	);
};

export default observer(LoginForm);
