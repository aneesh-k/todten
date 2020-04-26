import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label, Select } from "semantic-ui-react";
import { category } from "../Options/categoryOptions";

interface IProps
	extends FieldRenderProps<string, HTMLElement>,
		FormFieldProps {}

const SelectInput: React.FC<IProps> = ({
	input,
	width,
	placeholder,
	options,
	meta: { touched, error },
}) => {
	return (
		<Form.Field error={touched && !!error} width={width}>
			<Select
				value={input.value}
				onChange={(e, data) => {
					input.onChange(data.value);
				}}
				placeholder={placeholder}
				options={category}
			/>
			{touched && error && (
				<Label basic color="red">
					{error}
				</Label>
			)}
		</Form.Field>
	);
};

export default SelectInput;
