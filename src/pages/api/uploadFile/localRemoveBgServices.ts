import { removeBackground, Config } from "@imgly/background-removal-node";

export default async function localRemoveBgServices(
	fileName: string
): Promise<Buffer> {
	let config: Config = {
		output: { format: "image/png" },
	};

	return Buffer.from(
		await (await removeBackground(fileName, config)).arrayBuffer()
	);
}
