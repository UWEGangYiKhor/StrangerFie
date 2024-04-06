import sharp from "sharp";

export default async function copyImages(
	src: string,
	des: string
): Promise<void> {
	return new Promise<void>((resolve, reject) => {
		try {
			sharp(src).toFile(des, function (err) {
				if (err) {
					console.error(err);
					reject(err);
				} else {
					resolve();
				}
			});
		} catch (err) {
			console.error(err);
			reject(err);
		}
	});
}
