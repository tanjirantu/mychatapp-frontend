import RoomModel from "../model";

export default async () => {
	try {
		return await generateUserUid("R");
	} catch (err) {
		console.error(err);
		return new Error("Internal Server Error");
	}
};

const generateUserUid: any = async (prefix: String) => {
	const randomString =
		prefix + "-" + String.fromCharCode(...randomNumberGenerator(5, 32));

	const uidExists = await RoomModel.findOne({
		uid: randomString,
	});

	if (uidExists) {
		console.error("Matched!", randomString);
		return await generateUserUid(prefix);
	}

	return <any>randomString;
};

const randomNumberGenerator = (length: number, max: number) => {
	const randomNumber: number[] = [];

	for (let index = 0; index < length; index++) {
		// 49-57 and 65-78 and 80-90
		randomNumber.push(dictionary[Math.round(Math.random() * max)]);
	}

	return randomNumber;
};

const dictionary = [
	49, //1
	50, //2
	51, //3
	52, //4
	53, //5
	54, //6
	56, //7
	55, //8
	57, //9

	65, //A
	66, //B
	67, //C
	68, //D
	69, //E
	70, //F
	71, //G
	72, //H
	74, //J
	75, //K
	76, //L
	77, //M
	78, //N

	80, //P
	81, //Q
	82, //R
	83, //S
	84, //T
	85, //U
	86, //V
	87, //W
	88, //X
	89, //Y
	90, //Z
];
