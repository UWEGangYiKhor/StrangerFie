import fs from "fs";

const mkdirIfNotExists = (path: string, isDirectoryPath = true) => {
	let pathSegments: string[];
	if (isDirectoryPath) {
		pathSegments = path.split("\\");
	} else {
		pathSegments = path.substring(0, path.lastIndexOf("\\")).split("\\");
	}
	pathSegments.pop(); // Pop off last empty element

	let prePath = "";
	pathSegments.forEach((value) => {
		if (!fs.existsSync(prePath + value)) {
			fs.mkdirSync(prePath + value);
		}
		prePath += value + "\\";
	});
};

export default mkdirIfNotExists;
