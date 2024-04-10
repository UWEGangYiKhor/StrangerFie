import sharp from "sharp";
import fs from "fs";
import { BACKGROUND_IMG_PATH } from "@/utils/constants";

export default async function mergeImages(
	backgroundFileName: string,
	foregroundFileName: string[],
	outputFileName: string
): Promise<void> {
	try {
		sharp.cache(false);
		const inputFiles: { input: string }[] = [];
		foregroundFileName.forEach((value) => {
			inputFiles.push({ input: value });
		});

		const image = sharp(
			fs.existsSync(backgroundFileName)
				? backgroundFileName
				: BACKGROUND_IMG_PATH
		).composite(inputFiles);
		await image.toFile(outputFileName);
	} catch (err) {
		console.error(err);
	}
}
