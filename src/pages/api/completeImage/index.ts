import { NextApiRequest, NextApiResponse } from "next";
import completeImageServices from "./completeImageServices";

async function completeImageHandler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		try {
			const { image } = await completeImageServices(req.body);
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

export default completeImageHandler;
