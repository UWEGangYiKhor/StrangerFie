import { uploadFileDto } from "@/dto/uploadFileDto";
import fs from "fs";
import mergeImages from "../../../utils/mergeImages";
import localRemoveBgServices from "./localRemoveBgServices";
import blurFacesServices from "./blurFacesServices";
import {
	BACKGROUND_IMG_PATH,
	MERGED_IMG_PATH,
	MERGED_TMP_PATH,
	ONLY_CURRENT_PATH,
	ORIGINAL_IMG_BLUR_DIR,
	ORIGINAL_IMG_DIR,
	PERSON_BLUR_DIR,
	PERSON_DIR,
} from "@/utils/constants";
import mkdirIfNotExists from "@/utils/mkdirIfNotExists";
import { uploadFileResponses } from "@/responses/uploadFileResponses";

export default async function uploadFileServices(
	body: uploadFileDto
): Promise<uploadFileResponses> {
	if (!body?.image) {
		throw new Error();
	}

	const now = Date.now().toString();
	const originalFilename = `${ORIGINAL_IMG_DIR}${now}.jpg`;
	const blurredFilename = `${ORIGINAL_IMG_BLUR_DIR}${now}.jpg`;
	const personFilename = `${PERSON_DIR}${now}.png`;
	const blurredPersonFilename = `${PERSON_BLUR_DIR}${now}.png`;

	mkdirIfNotExists(ORIGINAL_IMG_DIR);
	mkdirIfNotExists(ORIGINAL_IMG_BLUR_DIR);
	mkdirIfNotExists(PERSON_DIR);
	mkdirIfNotExists(PERSON_BLUR_DIR);

	const imageBuffer = Buffer.from(body.image.split(",")[1], "base64");
	fs.writeFileSync(originalFilename, imageBuffer);

	const blurredImageBuffer = await blurFacesServices(originalFilename);
	fs.writeFileSync(blurredFilename, blurredImageBuffer);

	const personImageBuffer = await localRemoveBgServices(originalFilename);
	fs.writeFileSync(personFilename, personImageBuffer);

	const blurredPersonImageBuffer = await localRemoveBgServices(blurredFilename);
	fs.writeFileSync(blurredPersonFilename, blurredPersonImageBuffer);

	await mergeImages(MERGED_IMG_PATH, [personFilename], MERGED_TMP_PATH);
	await mergeImages(BACKGROUND_IMG_PATH, [personFilename], ONLY_CURRENT_PATH);

	return {
		mergedImage:
			"data:image/jpeg;base64," +
			fs.readFileSync(MERGED_TMP_PATH).toString("base64"),
		onlyCurrentImage:
			"data:image/jpeg;base64," +
			fs.readFileSync(ONLY_CURRENT_PATH).toString("base64"),
		id: now,
	};
}
