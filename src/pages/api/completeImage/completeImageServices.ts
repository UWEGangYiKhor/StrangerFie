import {
	MERGED_IMG_PATH,
	MERGED_TMP_PATH,
	PERSON_BLUR_DIR,
} from "@/utils/constants";
import mergeImagesServices from "../uploadFile/mergeImagesServices";
import fs from "fs";

async function completeImageServices(body: {
	id: string;
}): Promise<{ image: string }> {
	if (!body?.id) {
		throw new Error();
	}

	const blurredPersonFilename = `${PERSON_BLUR_DIR}${body.id}.png`;
	await mergeImagesServices(
		MERGED_IMG_PATH,
		[blurredPersonFilename],
		MERGED_TMP_PATH
	);
	fs.copyFileSync(MERGED_TMP_PATH, MERGED_IMG_PATH);

	return {
		image:
			"data:image/jpeg;base64," +
			fs.readFileSync(MERGED_IMG_PATH).toString("base64"),
	};
}

export default completeImageServices;
