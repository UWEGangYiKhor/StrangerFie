import { NextApiRequest, NextApiResponse } from "next";
import publishImageServices from "./publishImageServices";

async function publishImageHandler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "GET") {
		try {
			const { image } = await publishImageServices();
			res.status(200).json({ image });
		} catch (err) {
			if (process.env.NODE_ENV === "development") {
				console.error(err);
			}
			res.status(400);
		}
	} else {
		res.status(400);
	}
}

export default publishImageHandler;
