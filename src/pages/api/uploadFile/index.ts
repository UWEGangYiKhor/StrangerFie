import { NextApiRequest, NextApiResponse } from "next";
import uploadFileServices from "./uploadFileServices";

async function uploadFileHandler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		try {
			const { mergedImage, onlyCurrentImage, id } = await uploadFileServices(
				req.body
			);
			res.status(200).json({ mergedImage, onlyCurrentImage, id });
		} catch (err) {
			if (process.env.NODE_ENV === "development") {
				console.error(err);
			}
			console.error(err);
			res.status(500).end();
		}
	} else {
		res.status(400).end();
	}
}

export default uploadFileHandler;
