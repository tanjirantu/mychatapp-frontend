const removeNullOrEmpty = (obj: { [k: string]: any }) => {
    Object.keys(obj).forEach(
        (key) =>
            (obj[key] && typeof obj[key] === 'object' && removeNullOrEmpty(obj[key])) ||
            ((obj[key] === undefined || obj[key] === null || obj[key] === '') && delete obj[key])
    );
    return obj as typeof obj;
};

export default removeNullOrEmpty;
