import { UploadClient } from "@uploadcare/upload-client";

const uploadClient = new UploadClient({
	publicKey: process.env.UPCARE_PUB_KEY || "",
});

export default uploadClient;
