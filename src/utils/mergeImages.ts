import sharp from "sharp";

export default async function mergeImages(
	backgroundImage: Buffer,
	foreGroundImage: Buffer[]
): Promise<Buffer> {
	sharp.cache(false);
	const inputFiles: { input: Buffer }[] = [];
	foreGroundImage.forEach((value) => {
		inputFiles.push({ input: value });
	});

	const image = sharp(backgroundImage).composite(inputFiles);
	return await image.toBuffer();
}
