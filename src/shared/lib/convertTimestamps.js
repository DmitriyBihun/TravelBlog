export const convertTimestamps = (data) => {
    const result = { ...data };

    if (result.createdAt && typeof result.createdAt?.toDate === 'function') {
        result.createdAt = result.createdAt.toDate().toISOString();
    }
    if (result.updatedAt && typeof result.updatedAt?.toDate === 'function') {
        result.updatedAt = result.updatedAt.toDate().toISOString();
    }

    return result;
};