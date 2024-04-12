import { NextApiRequest, NextApiResponse } from "next";
import hasPublishedImage from "./hasPublishedImage";

async function hasPublishedImageHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		try {
			const { status } = await hasPublishedImage();
			res.status(200).json({ status });
		} catch (err) {
			if (process.env.NODE_ENV === "development") {
				console.error(err);
			}
			res.status(500).end();
		}
	} else {
		res.status(400).end();
	}
}

export default hasPublishedImageHandler;
