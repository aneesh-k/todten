import React, { useState } from "react";
import { Tab, Header, Card, Image, Grid, Button } from "semantic-ui-react";
import { useContext } from "react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import PhotoUploadWidget from "../../app/Common/PhotoUpload/PhotoUploadWidget";

const ProfilePhotos = () => {
	const profileStore = useContext(RootStoreContext).profileStore;

	const {
		Profile,
		isCurrentUser,
		uploadingPhoto,
		uploadPhoto,
		setMainLoading,
		setMainPhoto,
		deletePhoto,
		delPhotoLoading,
	} = profileStore;

	const [addPhoto, setAddPhoto] = useState(false);
	const [target, setTarget] = useState<string | undefined>(undefined);
	const [delTarget, setDelTarget] = useState<string | undefined>(undefined);

	const handleUploadPhoto = async (file: Blob) => {
		await uploadPhoto(file);
		setAddPhoto(false);
	};

	return (
		<Tab.Pane>
			<Grid>
				<Grid.Column width={16} style={{ paddingBottom: 0 }}>
					<Header floated="left" icon="image" content="Photos" />
					{isCurrentUser && (
						<Button
							floated="right"
							basic
							circular
							onClick={() => setAddPhoto(!addPhoto)}
							content={addPhoto ? "Cancel" : "Add photo"}
						/>
					)}
				</Grid.Column>
				<Grid.Column width={16}>
					{addPhoto ? (
						<PhotoUploadWidget
							uploadPhoto={handleUploadPhoto}
							uploadingPhoto={uploadingPhoto}
						/>
					) : (
						<Card.Group itemsPerRow={5}>
							{Profile &&
								Profile.photos.map((photo) => (
									<Card key={photo.id}>
										<Image src={photo.url} />
										{isCurrentUser && (
											<Button.Group widths={2}>
												<Button
													name={photo.id}
													basic
													positive
													disabled={photo.isMain}
													content="Main"
													loading={setMainLoading && target === photo.id}
													onClick={(e) => {
														setMainPhoto(photo);
														setTarget(e.currentTarget.name);
													}}
												/>
												<Button
													basic
													negative
													icon="trash"
													name={photo.id}
													disabled={photo.isMain}
													loading={delPhotoLoading && delTarget === photo.id}
													onClick={(e) => {
														setDelTarget(e.currentTarget.name);
														deletePhoto(photo);
													}}
												/>
											</Button.Group>
										)}
									</Card>
								))}
						</Card.Group>
					)}
				</Grid.Column>
			</Grid>
		</Tab.Pane>
	);
};

export default observer(ProfilePhotos);
