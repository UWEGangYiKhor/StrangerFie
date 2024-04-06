import sharp from "sharp";
import fs from "fs";
import { BACKGROUND_IMG_PATH } from "@/utils/constants";
sharp.cache(false);

export default async function mergeImagesServices(
	backgroundFileName: string,
	foregroundFileName: string[],
	outputFileName: string
): Promise<void> {
	try {
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
