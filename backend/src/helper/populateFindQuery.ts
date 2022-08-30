export default (params: any) => {
	const query = {};
	for (const [key, value] of Object.entries({ ...params })) {
		if (!Array.isArray(value)) {
			if ((typeof value == "string" || typeof value == "boolean" || typeof value == "object") && value !== "") {
				Object.assign(query, { [key]: value });
			}
		}
		if (Array.isArray(value) && value.length) {
			Object.assign(query, { [key]: { $in: value } });
		}
	}
	return query;
};
