import Mongoose from "mongoose";
import { MongodbConfiguration } from "../config";
Mongoose.Promise = global.Promise;

Mongoose.connection.on("disconnected", () => {
	console.error(
		`!!!!!!!!!! Database Disconnected @ ${MongodbConfiguration.databaseConnection.uri()} !!!!!!!!!!`
	);
});
Mongoose.connection.on("reconnected", () => {
	console.warn(
		`!!!!!!!!!! Database Reconnected @ ${MongodbConfiguration.databaseConnection.uri()} !!!!!!!!!!`
	);
});
Mongoose.connection.on("close", () => {
	console.log("Connection Closed");
});
Mongoose.connection.on("error", (err) => {
	console.error("error", err);
});

const ConnectToDatabase = async () => {
	await Mongoose.connect(
		MongodbConfiguration.databaseConnection.uri(),
		MongodbConfiguration.auth
	);

	const db = Mongoose.connection;

	db.on("error", console.error.bind(console, "Connection Error:"));

	db.once("open", () => {
		console.log(
			`${process.env.SERVICE_NAME?.toUpperCase()}: Connected to Database @ ${MongodbConfiguration.databaseConnection.uri()}`
		);
	});
};

export default ConnectToDatabase;
