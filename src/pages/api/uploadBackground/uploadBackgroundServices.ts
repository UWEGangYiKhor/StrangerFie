import { uploadFileDto } from "@/dto/uploadFileDto";
import prisma from "@/utils/prismaClient";

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
		await prisma.publish_image.update({
			data: {
				background_image: imageBuffer,
			},
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
