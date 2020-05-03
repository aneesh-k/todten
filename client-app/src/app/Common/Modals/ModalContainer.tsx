import React, { useContext } from "react";
import { Modal } from "semantic-ui-react";
import { RootStoreContext } from "../../stores/rootStore";
import { observer } from "mobx-react-lite";

const ModalContainer = () => {
	const modalStore = useContext(RootStoreContext).modalStore;

	return (
		<Modal
			open={modalStore.modelData.open}
			onClose={() => modalStore.closeModal()}
			size="tiny"
		>
			<Modal.Content>{modalStore.modelData.body}</Modal.Content>
		</Modal>
	);
};

export default observer(ModalContainer);
