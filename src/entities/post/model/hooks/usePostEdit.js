import { useState, useEffect } from "react";

export const usePostEdit = (initialPost, onUpdate, onSuccess) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(initialPost.description);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        setEditedDescription(initialPost.description);
    }, [initialPost.description]);

    const handleSaveEdit = async (postId) => {
        if (!editedDescription.trim()) return;

        setIsUpdating(true);
        try {
            const updatedAt = new Date().toISOString();
            const updatedPost = await onUpdate({
                id: postId,
                description: editedDescription.trim(),
                updatedAt
            });

            onSuccess?.(editedDescription.trim(), updatedAt);
            setIsEditing(false);
        } catch (e) {
            console.error(e);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedDescription(initialPost.description);
    };

    return {
        isEditing,
        setIsEditing,
        editedDescription,
        setEditedDescription,
        isUpdating,
        handleSaveEdit,
        handleCancelEdit
    };
};