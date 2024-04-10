import { uploadFileDto } from "@/dto/uploadFileDto";
import fs from "fs";
import { BACKGROUND_IMG_PATH, IMG_DIR } from "@/utils/constants";
import mkdirIfNotExists from "@/utils/mkdirIfNotExists";

export default async function uploadBackgroundServices(
	body: uploadFileDto
): Promise<void> {
	if (!body?.image) {
		throw new Error();
	}

	mkdirIfNotExists(IMG_DIR);
	const imageBuffer = Buffer.from(body.image.split(",")[1], "base64");
	fs.writeFileSync(BACKGROUND_IMG_PATH, imageBuffer);
}
