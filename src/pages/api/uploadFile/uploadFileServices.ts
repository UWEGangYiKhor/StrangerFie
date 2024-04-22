import { uploadFileDto } from "../../../dto/uploadFileDto";
import mergeImages from "../../../utils/mergeImages";
import blurFacesServices from "./blurFacesServices";
import { uploadFileResponses } from "../../../responses/uploadFileResponses";
import prisma from "../../../utils/prismaClient";
import removeBgServices from "./removeBgServices";

export default async function uploadFileServices(
	body: uploadFileDto
): Promise<uploadFileResponses> {
	try {
		if (!body?.image) {
			throw new Error();
		}

		const imageBuffer = Buffer.from(body.image.split(",")[1], "base64");
		const blurredImageBuffer = await blurFacesServices(imageBuffer);
		const personImageBuffer = await removeBgServices(imageBuffer);
		const blurredPersonImageBuffer = await removeBgServices(blurredImageBuffer);

		const { id } = await prisma.images.create({
			data: {
				image_blob: imageBuffer,
				blurred_image_blob: blurredImageBuffer,
				person_image_blob: personImageBuffer,
				blurred_person_image_blob: blurredPersonImageBuffer,
				archived: false,
			},
		});

		const result = await prisma.publish_image.findFirstOrThrow({
			select: {
				background_image: true,
				image: true,
			},
			where: {
				archived: false,
			},
		});

		const mergedImage = await mergeImages(
			result.image ?? result.background_image,
			[personImageBuffer]
		);
		const onlyCurrentImage = await mergeImages(result.background_image, [
			personImageBuffer,
		]);

		await prisma.$disconnect();
		return {
			mergedImage: "data:image/jpeg;base64," + mergedImage.toString("base64"),
			onlyCurrentImage:
				"data:image/jpeg;base64," + onlyCurrentImage.toString("base64"),
			id: id.toString(),
		};
	} catch (err) {
		await prisma.$disconnect();
		throw err;
	}
}
