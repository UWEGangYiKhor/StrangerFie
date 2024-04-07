import { BLUR_FACE_HOST, BLUR_FACE_URL } from "@/utils/constants";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";

export default async function blurFacesServices(
	fileName: string
): Promise<Buffer> {
	const data = new FormData();
	data.append("image", fs.createReadStream(fileName));

	const response = await axios.post(BLUR_FACE_URL, data, {
		headers: {
			"X-RapidAPI-Key": process.env.RAPID_API_KEY ?? "",
			"X-RapidAPI-Host": BLUR_FACE_HOST,
			...data.getHeaders,
		},
	});

	return Buffer.from(
		response?.data?.results?.[0]?.entities?.[0]?.image,
		"base64"
	);
}
