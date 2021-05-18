require("dotenv").config();
const DB_PASSWORD_CLOUD = process.env.DB_PASSWORD_CLOUD;
const DB_HOST = process.env.DB_HOST;
const INSTANCE_CONNECTION_NAME = process.env.INSTANCE_CONNECTION_NAME;
console.log("host is: ", DB_HOST);

module.exports = {
	development: {
		username: "countrivia-user",
		password: DB_PASSWORD_CLOUD,
		database: "countrivia",
		host: DB_HOST,
		port: 3306,
		dialect: "mysql",
		define: {
			underscored: true,
		},
	},
	test: {
		username: "countrivia-user",
		password: DB_PASSWORD_CLOUD,
		database: "countrivia",
		host: DB_HOST,
		dialect: "mysql",
		port: 3306,
		define: {
			underscored: true,
		},
		dialectOptions: {
			socketPath: `/cloudsql/${INSTANCE_CONNECTION_NAME}`,
		},
	},
	production: {
		username: "countrivia-user",
		password: DB_PASSWORD_CLOUD,
		database: "countrivia",
		host: DB_HOST,
		dialect: "mysql",
		port: 3306,
		define: {
			underscored: true,
		},
		dialectOptions: {
			socketPath: `/cloudsql/${INSTANCE_CONNECTION_NAME}`,
		},
	},
};
