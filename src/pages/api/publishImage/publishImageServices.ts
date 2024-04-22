import mergeImages from "../../../utils/mergeImages";
import { publishImageResponses } from "../../../responses/publishImageResponses";
import { prismaClientSingleton } from "../../../utils/prismaClient";

export default async function publishImageServices(): Promise<publishImageResponses> {
	const prisma = prismaClientSingleton();
	try {
		const allImages = await prisma.images.findMany({
			select: {
				person_image_blob: true,
			},
			where: {
				archived: false,
			},
		});
		const { id, background_image } =
			await prisma.publish_image.findFirstOrThrow({
				select: {
					id: true,
					background_image: true,
				},
				where: {
					archived: false,
				},
			});

		const mergedImage = await mergeImages(
			background_image,
			allImages.map((value) => value.person_image_blob)
		);

		await prisma.images.updateMany({
			data: {
				archived: true,
				publish_id: id,
			},
			where: {
				archived: false,
			},
		});

		await prisma.publish_image.update({
			data: {
				image: mergedImage,
				publish_date: new Date(),
				archived: true,
			},
			where: {
				id,
			},
		});

		await prisma.$disconnect();
		return {
			image: "data:image/jpeg;base64," + mergedImage.toString("base64"),
		};
	} catch (err) {
		await prisma.$disconnect();
		throw err;
	}
}
