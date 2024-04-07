import fs from "fs";
import mergeImages from "../../../utils/mergeImages";
import mkdirIfNotExists from "@/utils/mkdirIfNotExists";
import {
	BACKGROUND_IMG_PATH,
	COMPLETED_PATH,
	CUR_IMG_DIR,
	IMG_DIR,
	MERGED_IMG_PATH,
	MERGED_TMP_PATH,
	ONLY_CURRENT_PATH,
	PERSON_DIR,
} from "@/utils/constants";
import { publishImageResponses } from "@/responses/publishImageResponses";

export default async function publishImageServices(): Promise<publishImageResponses> {
	const allPersonFiles = fs
		.readdirSync(PERSON_DIR)
		.filter((value) => value.endsWith(".png"))
		.map((value) => PERSON_DIR + value);

	await mergeImages(BACKGROUND_IMG_PATH, allPersonFiles, COMPLETED_PATH);

	const imageData = fs.readFileSync(COMPLETED_PATH).toString("base64");
	const newDirName = Date.now().toString();
	const newDir = `${IMG_DIR}${newDirName}\\`;
	mkdirIfNotExists(newDir);

	fs.readdirSync(CUR_IMG_DIR).forEach((value) => {
		fs.renameSync(CUR_IMG_DIR + value, `${newDir}${value}`);
	});

	[MERGED_IMG_PATH, MERGED_TMP_PATH, ONLY_CURRENT_PATH].forEach((value) => {
		fs.renameSync(value, value.replace("\\", `\\${newDirName}\\`));
	});

	return {
		image: "data:image/jpeg;base64," + imageData,
	};
}
