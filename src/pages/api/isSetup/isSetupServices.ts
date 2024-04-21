import { isSetupResponses } from "@/responses/isSetupResponses";
import prisma from "@/utils/prismaClient";

export default async function isSetupServices(): Promise<isSetupResponses> {
	try {
		const haventPublishCount = await prisma.publish_image.count({
			where: {
				archived: false,
			},
		});

		return { status: haventPublishCount > 0 };
	} catch (err) {
		throw err;
	}
}
