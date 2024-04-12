import { BLUR_FACE_HOST, BLUR_FACE_URL } from "@/utils/constants";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import path from "path";

export default async function blurFacesServices(
	imageBuffer: Buffer
): Promise<Buffer> {
	const data = new FormData();
	const tmpFilePath = path.join(process.cwd(), "tmp_img.jpg");
	fs.writeFileSync(tmpFilePath, imageBuffer);
	data.append("image", fs.createReadStream(tmpFilePath));

	const response = await axios.post(BLUR_FACE_URL, data, {
		headers: {
			"X-RapidAPI-Key": process.env.RAPID_API_KEY ?? "",
			"X-RapidAPI-Host": BLUR_FACE_HOST,
			...data.getHeaders(),
		},
	});

	return Buffer.from(
		response?.data?.results?.[0]?.entities?.[0]?.image,
		"base64"
	);
}
