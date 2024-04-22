import mergeImages from "../../../utils/mergeImages";
import { completeImageDto } from "../../../dto/completeImageDto";
import { completeImageResponses } from "../../../responses/completeImageResponses";
import prisma from "../../../utils/prismaClient";

async function completeImageServices(
	body: completeImageDto
): Promise<completeImageResponses> {
	try {
		if (!body?.id) {
			throw new Error();
		}

		const { blurred_person_image_blob: curPersonImage } =
			await prisma.images.findFirstOrThrow({
				select: {
					blurred_person_image_blob: true,
				},
				where: {
					id: parseInt(body.id),
				},
			});

		const { id, image } = await prisma.publish_image.findFirstOrThrow({
			select: {
				id: true,
				image: true,
			},
			where: {
				archived: false,
			},
		});

		const resultImage = await mergeImages(image, [curPersonImage]);

		await prisma.publish_image.update({
			data: {
				image: resultImage,
			},
			where: {
				id,
			},
		});
		await prisma.$disconnect();

		return {
			image: "data:image/jpeg;base64," + resultImage.toString("base64"),
		};
	} catch (err) {
		await prisma.$disconnect();
		throw err;
	}
}

export default completeImageServices;
