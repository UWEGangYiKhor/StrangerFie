import { completeImageResponses } from "@/responses/completeImageResponses";
import prisma from "@/utils/prismaClient";

async function getLatestPublishedImageServices(): Promise<completeImageResponses> {
	const { image } = await prisma.publish_image.findFirstOrThrow({
		select: {
			image: true,
		},
		where: {
			archived: true,
		},
		orderBy: [
			{
				publish_date: "desc",
			},
		],
	});

	return {
		image: "data:image/jpeg;base64," + image.toString("base64"),
	};
}

export default getLatestPublishedImageServices;
