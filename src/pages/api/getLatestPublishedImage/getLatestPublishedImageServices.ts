import { completeImageResponses } from "../../../responses/completeImageResponses";
import { prismaClientSingleton } from "../../../utils/prismaClient";

async function getLatestPublishedImageServices(): Promise<completeImageResponses> {
	const prisma = prismaClientSingleton();
	try {
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
		await prisma.$disconnect();

		return {
			image: "data:image/jpeg;base64," + image.toString("base64"),
		};
	} catch (err) {
		throw err;
	}
}

export default getLatestPublishedImageServices;
