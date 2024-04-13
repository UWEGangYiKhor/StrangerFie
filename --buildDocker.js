// Run this file with "node buildDocker.js imageName"

const child_process = require("child_process");
const process = require("process");
const fs = require("fs");

const envFile = fs.readFileSync(".env").toString().split("\n");
const env = {};

for (const line of envFile) {
	const key = line.substring(0, line.indexOf("="));
	let value = line.substring(line.indexOf("=") + 1);
	if (value.startsWith('"')) {
		value = value.substring(1, value.length - 1);
	}

	env[key] = value;
}

const RAPID_API_KEY = env.RAPID_API_KEY;
const DB_URL = env.POSTGRES_PRISMA_URL;
const imageName = process.argv[2];

const command = `docker build ${
	imageName ? "-t " + imageName : ""
} --platform linux/x86_64 --build-arg RAPID_API_KEY=${RAPID_API_KEY} --build-arg DB_URL=${DB_URL} .`;
const maskedCommand = `docker build ${
	imageName ? "-t " + imageName : ""
} --platform linux/x86_64 -build-arg RAPID_API_KEY=${
	RAPID_API_KEY.substring(0, 5) +
	"*****" +
	RAPID_API_KEY.substring(RAPID_API_KEY.length - 5)
} --build-arg DB_URL=${
	DB_URL.substring(0, 5) + "*****" + DB_URL.substring(DB_URL.length - 5)
} .`;
console.log(maskedCommand);

child_process.execSync(command, { stdio: "inherit" });
