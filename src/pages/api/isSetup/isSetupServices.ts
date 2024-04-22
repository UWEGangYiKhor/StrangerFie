import { isSetupResponses } from "../../../responses/isSetupResponses";
import prisma from "../../../utils/prismaClient";

function stringify(obj: any) {
	let cache: any = [];
	let str = JSON.stringify(obj, function (key, value) {
		if (typeof value === "object" && value !== null) {
			if (cache.indexOf(value) !== -1) {
				// Circular reference found, discard key
				return;
			}
			// Store value in our collection
			cache.push(value);
		}
		return value;
	});
	cache = null; // reset the cache
	return str;
}

export default async function isSetupServices(): Promise<
	isSetupResponses | any
> {
	return { status: stringify(prisma) };

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
