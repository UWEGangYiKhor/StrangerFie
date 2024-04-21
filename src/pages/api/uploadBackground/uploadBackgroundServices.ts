import { uploadFileDto } from "../../../dto/uploadFileDto";
import mergeImages from "../../../utils/mergeImages";
import prisma from "../../../utils/prismaClient";

export default async function uploadBackgroundServices(
	body: uploadFileDto
): Promise<void> {
	if (!body?.image) {
		throw new Error();
	}

	const imageBuffer = Buffer.from(body.image.split(",")[1], "base64");
	const existingId = await prisma.publish_image.findFirst({
		select: {
			id: true,
		},
		where: {
			archived: false,
		},
	});

	if (existingId?.id) {
		const data: { background_image: Buffer; image?: Buffer } = {
			background_image: imageBuffer,
		};

		const existingPerson = await prisma.images.findMany({
			select: {
				blurred_person_image_blob: true,
			},
			where: {
				archived: false,
			},
		});
		if (existingPerson.length > 0) {
			const mergedImage = await mergeImages(
				imageBuffer,
				existingPerson.map(
					({ blurred_person_image_blob }) => blurred_person_image_blob
				)
			);
			data["image"] = mergedImage;
		}

		await prisma.publish_image.update({
			data,
			where: {
				id: existingId.id,
			},
		});
	} else {
		await prisma.publish_image.create({
			data: {
				background_image: imageBuffer,
				image: imageBuffer,
				archived: false,
			},
		});
	}
}
