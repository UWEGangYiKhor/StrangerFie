import { NextApiRequest, NextApiResponse } from "next";
import getLatestPublishedImageServices from "./getLatestPublishedImageServices";

async function getLatestPublishedImageHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		try {
			const { image } = await getLatestPublishedImageServices();
			res.status(200).json({ image });
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

export default getLatestPublishedImageHandler;
