import { BLURFACE_HOST, BLURFACE_URL } from "@/utils/constants";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";

export default async function blurFacesServices(
	fileName: string
): Promise<Buffer> {
	const data = new FormData();
	data.append("image", fs.createReadStream(fileName));

	const response = await axios.post(BLURFACE_URL, data, {
		headers: {
			"X-RapidAPI-Key": process.env.RAPID_API_KEY || "",
			"X-RapidAPI-Host": BLURFACE_HOST,
			...data.getHeaders,
		},
	});

	return Buffer.from(
		response?.data?.results?.[0]?.entities?.[0]?.image,
		"base64"
	);
}
