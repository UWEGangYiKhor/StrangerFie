import { BGREMOVE1_HOST, BGREMOVE1_URL } from "@/utils/constants";
import axios from "axios";
import fs from "fs";

export default async function removeBgServices(
	imagePath: string,
	pathExtension: string
) {
	try {
		const imageFile = fs
			.readFileSync(imagePath + pathExtension)
			.toString("base64");
		const data = new URLSearchParams();
		data.set("image_base64", imageFile);
		data.set("output_format", "base64");

		const response = await axios.post(BGREMOVE1_URL, data, {
			headers: {
				"content-type": "application/x-www-form-urlencoded",
				"X-RapidAPI-Key": process.env.RAPID_API_KEY || "",
				"X-RapidAPI-Host": BGREMOVE1_HOST,
			},
		});

		const image = response?.data?.response?.image_base64;
		const imageBuffer = Buffer.from(image, "base64");
		fs.writeFileSync(imagePath + "_bgremoved" + ".png", imageBuffer);
	} catch (err) {
		console.error(err);
	}
}
