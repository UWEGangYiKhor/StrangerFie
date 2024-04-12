import { hasPublishedImageResponses } from "@/responses/hasPublishedImageResponses";
import prisma from "@/utils/prismaClient";

export default async function hasPublishedImage(): Promise<hasPublishedImageResponses> {
	const publishCount = await prisma.publish_image.count({
		where: {
			archived: true,
		},
	});

	return { status: publishCount > 0 };
}
