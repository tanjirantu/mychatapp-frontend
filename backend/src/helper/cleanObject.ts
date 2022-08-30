const cleanObject = (obj: any) => {
	Object.entries(obj).forEach(([k, v]: Array<any>) => {
		if (v && typeof v === "object") {
			cleanObject(v);
		}
		if ((v && typeof v === "object" && !Object.keys(v).length) || v === null || v === undefined) {
			if (Array.isArray(obj)) {
				obj.splice(k, 1);
			} else {
				delete obj[k];
			}
		}
	});
	return obj;
};

export default cleanObject;
