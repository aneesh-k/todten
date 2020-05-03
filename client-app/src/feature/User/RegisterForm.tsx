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

const RegisterForm = () => {
	const userStore = useContext(RootStoreContext).userStore;

	const [errors, setErrors]: any = useState(null);
	const [loader, setLoader] = useState(false);
	var validate = combineValidators({
		email: isRequired("email"),
		password: isRequired("password"),
		displayName: isRequired("displayName"),
		userName: isRequired("userName"),
	});

	return (
		<React.Fragment>
			<Header
				as={"h2"}
				content="Register for Activities"
				textAlign="center"
				color="teal"
			/>
			<FinalForm
				onSubmit={(values: IUserFormValues) => {
					setLoader(true);
					userStore
						.register(values)
						.catch((err) => {
							console.log(err);
							setErrors(err);
						})
						.finally(() => setLoader(false));
					console.log(values);
				}}
				validate={validate}
				render={({ handleSubmit, pristine, submitting }) => (
					<Form onSubmit={handleSubmit} error>
						<Field
							name="displayName"
							component={TextInput}
							placeholder="Display Name"
						/>
						<Field name="email" component={TextInput} placeholder="Email" />
						<Field
							name="userName"
							component={TextInput}
							placeholder="User Name"
						/>
						<Field
							name="password"
							component={TextInput}
							placeholder="Password"
							type="password"
						/>

						{errors && <ErrorMessage error={errors} />}
						<br />
						<Button
							disabled={pristine}
							loading={loader}
							positive
							fluid
							content="Register"
						/>
					</Form>
				)}
			/>
		</React.Fragment>
	);
};

export default observer(RegisterForm);
