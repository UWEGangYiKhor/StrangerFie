import { hasPublishedImageResponses } from "../../../responses/hasPublishedImageResponses";
import prisma from "../../../utils/prismaClient";

export default async function hasPublishedImage(): Promise<hasPublishedImageResponses> {
	try {
		const publishCount = await prisma.publish_image.count({
			where: {
				archived: true,
			},
		});

		await prisma.$disconnect();
		return { status: publishCount > 0 };
	} catch (err) {
		await prisma.$disconnect();
		throw err;
	}
}
