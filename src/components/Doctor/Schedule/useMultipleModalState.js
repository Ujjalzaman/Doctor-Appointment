import { useState } from "react";
const useMultipleModalState = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const showModal = () => { setIsModalOpen(!isModalOpen) };
    const handleOk = () => { setIsModalOpen(false) };
    const handleCancel = () => { setIsModalOpen(false) };
    const showEditModal = () => { setIsEditModalOpen(!isEditModalOpen) };
    const handleEditOk = () => { setIsEditModalOpen(!isEditModalOpen) };
    const handleEditCancel = () => { setIsEditModalOpen(!isEditModalOpen) };
    return {
        isModalOpen,
        isEditModalOpen,
        showModal,
        handleCancel,
        handleOk,
        showEditModal,
        handleEditCancel,
        handleEditOk
    }
}

export default useMultipleModalState;