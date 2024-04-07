import {
	MERGED_IMG_PATH,
	MERGED_TMP_PATH,
	PERSON_BLUR_DIR,
} from "@/utils/constants";
import fs from "fs";
import mergeImages from "../../../utils/mergeImages";
import { completeImageDto } from "@/dto/completeImageDto";
import { completeImageResponses } from "@/responses/completeImageResponses";

async function completeImageServices(
	body: completeImageDto
): Promise<completeImageResponses> {
	if (!body?.id) {
		throw new Error();
	}

	const blurredPersonFilename = `${PERSON_BLUR_DIR}${body.id}.png`;
	await mergeImages(MERGED_IMG_PATH, [blurredPersonFilename], MERGED_TMP_PATH);
	fs.copyFileSync(MERGED_TMP_PATH, MERGED_IMG_PATH);

	return {
		image:
			"data:image/jpeg;base64," +
			fs.readFileSync(MERGED_IMG_PATH).toString("base64"),
	};
}

export default completeImageServices;
