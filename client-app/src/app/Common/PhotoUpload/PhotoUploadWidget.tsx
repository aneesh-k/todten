import React, { Fragment } from "react";
import { Header, Grid, Image, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import PhotoDropzone from "./PhotoDropzone";
import { useState } from "react";
import { useEffect } from "react";

interface IProps {
	uploadPhoto: (image: Blob) => void;
	uploadingPhoto: boolean;
}

const PhotoUploadWidget: React.FC<IProps> = ({
	uploadPhoto,
	uploadingPhoto,
}) => {
	const [photo, setPhoto] = useState<any[]>([]);

	// const profileStore = useContext(RootStoreContext).profileStore;
	// const {uploadingPhoto, uploadPhoto} = profileStore

	useEffect(() => {
		return () => {
			photo.forEach((pic) => {
				URL.revokeObjectURL(pic.preview);
			});
		};
	});

	return (
		<Fragment>
			<Grid>
				<Grid.Column width={4}>
					<Header color="teal" sub content="Add Photo" />
					<PhotoDropzone setPhoto={setPhoto} />
				</Grid.Column>
				<Grid.Column width={2} />

				<Grid.Column width={2} />
				<Grid.Column width={4}>
					<Header sub color="teal" content="Preview & Upload" />
					{photo.length > 0 && (
						<Fragment>
							<Image src={photo[0].preview} />
							<Button.Group widths={2}>
								<Button
									loading={uploadingPhoto}
									primary
									basic
									icon="check"
									onClick={() => uploadPhoto(photo[0])}
								/>
								<Button
									primary
									basic
									negative
									icon="trash"
									onClick={() => setPhoto([])}
								/>
							</Button.Group>
						</Fragment>
					)}
				</Grid.Column>
			</Grid>
		</Fragment>
	);
};
export default observer(PhotoUploadWidget);
