import fs from "fs";
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
import mergeImagesServices from "../uploadFile/mergeImagesServices";
import mkdirIfNotExists from "@/utils/mkdirIfNotExists";

export default async function publishImageServices(): Promise<{
	image: string;
}> {
	const allPersonFiles = fs
		.readdirSync(PERSON_DIR)
		.filter((value) => value.endsWith(".png"))
		.map((value) => PERSON_DIR + value);

	await mergeImagesServices(
		BACKGROUND_IMG_PATH,
		allPersonFiles,
		COMPLETED_PATH
	);
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
