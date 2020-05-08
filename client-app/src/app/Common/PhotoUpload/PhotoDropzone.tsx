import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Icon, Header } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

interface IProps {
	setPhoto: (file: object[]) => void;
}

const dropzoneStyle = {
	border: "dashed 3px",
	borderColor: "#eee",
	borderRadius: "5px",
	paddingTop: "30px",
	textAlign: "center" as "center",
	height: "200px",
};

const activeDropzoneStyle = {
	borderColor: "green",
};

const PhotoDropzone: React.FC<IProps> = ({ setPhoto }) => {
	const onDrop = useCallback(
		(acceptedFiles) => {
			console.log(acceptedFiles);
			setPhoto(
				acceptedFiles.map((file: any) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				)
			);
		},
		[setPhoto]
	);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return (
		<div
			{...getRootProps()}
			style={
				isDragActive
					? { ...dropzoneStyle, ...activeDropzoneStyle }
					: { ...dropzoneStyle }
			}
		>
			<input {...getInputProps()} />

			<Icon name="upload" size="huge" />
			<Header content="Drop Files here" />
		</div>
	);
};

export default observer(PhotoDropzone);
