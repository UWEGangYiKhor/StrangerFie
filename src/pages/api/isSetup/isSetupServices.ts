import { isSetupResponses } from "../../../responses/isSetupResponses";
import { prismaClientSingleton } from "../../../utils/prismaClient";

export default async function isSetupServices(): Promise<isSetupResponses> {
	const prisma = prismaClientSingleton();
	try {
		const haventPublishCount = await prisma.publish_image.count({
			where: {
				archived: false,
			},
		});

		await prisma.$disconnect();
		return { status: haventPublishCount > 0 };
	} catch (err) {
		await prisma.$disconnect();
		throw err;
	}
}
