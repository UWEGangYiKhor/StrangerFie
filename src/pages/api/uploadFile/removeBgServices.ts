import { BG_REMOVE_HOST, BG_REMOVE_URL } from "../../../utils/constants";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";

export default async function removeBgServices(
	imageBuffer: Buffer
): Promise<Buffer> {
	const data = new FormData();
	const tmpFilePath =
		process.env.PLATFORM === "server" ? "/tmp/img2.jpg" : "./tmp_img2.jpg";
	fs.writeFileSync(tmpFilePath, imageBuffer);
	data.append("image", fs.createReadStream(tmpFilePath));

	const response = await axios.post(BG_REMOVE_URL, data, {
		params: { mode: "fg-image" },
		headers: {
			"X-RapidAPI-Key": process.env.RAPID_API_KEY ?? "",
			"X-RapidAPI-Host": BG_REMOVE_HOST,
			...data.getHeaders(),
		},
	});

	return Buffer.from(
		response?.data?.results?.[0]?.entities?.[0]?.image,
		"base64"
	);
}
