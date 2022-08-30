const flattenObject = (ob = {}) => {
	let stringifiedJSON = JSON.stringify(ob);
	let parsedJson = JSON.parse(stringifiedJSON);

	var toReturn = <any>{};
	for (var i in parsedJson) {
		if (!parsedJson.hasOwnProperty(i)) continue;

		if (typeof parsedJson[i] == "object" && Object.prototype.toString.call(parsedJson[i]) !== "[object Array]") {
			var flatObject = flattenObject(parsedJson[i]);
			for (var x in flatObject) {
				if (!flatObject.hasOwnProperty(x)) continue;

				toReturn[i + "." + x] = flatObject[x];
			}
		} else {
			toReturn[i] = parsedJson[i];
		}
	}

	return toReturn;
};

export default flattenObject;
