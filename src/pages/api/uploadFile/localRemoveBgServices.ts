import { removeBackground, Config } from "@imgly/background-removal-node";

export default async function localRemoveBgServices(
	imageBuffer: Buffer
): Promise<Buffer> {
	let config: Config = {
		output: { format: "image/png" },
	};
	const blob = new Blob([imageBuffer], { type: "image/jpeg" });

	const removedBackground = await removeBackground(blob, config);

	return Buffer.from(await removedBackground.arrayBuffer());
}
