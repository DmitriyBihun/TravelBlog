import { useState } from "react";

export const usePostDelete = (onDelete, onSuccess) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const confirmDelete = async (id) => {
        setIsDeleting(true);
        try {
            await onDelete(id);
            onSuccess?.();
        } catch (e) {
            console.error('Delete failed:', e);
        } finally {
            setIsDeleting(false);
            setIsOpen(false);
        }
    };

    return { isOpen, setIsOpen, confirmDelete, isDeleting };
};