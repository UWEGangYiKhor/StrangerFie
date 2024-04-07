import { uploadFileDto } from "@/dto/uploadFileDto";
import { usePost } from "@/hooks/usePost";
import { uploadFileResponses } from "@/responses/uploadFileResponses";
import React, { useCallback } from "react";

type PropType = {
	imageData: string;
	setIsLoading: (value: boolean) => void;
	setImageData: (value: string) => void;
	setIsProcessed: (value: boolean) => void;
	setProcessedImage: (value: uploadFileResponses) => void;
};

export default function CapturedImage({
	imageData,
	setIsLoading,
	setImageData,
	setIsProcessed,
	setProcessedImage,
}: Readonly<PropType>) {
	const postUpload = usePost<uploadFileDto, uploadFileResponses>(
		"/api/uploadFile"
	);

	const confirmImage = useCallback(
		async (imageData: string) => {
			setIsLoading(true);
			const { data, status } = await postUpload({ image: imageData });
			setIsLoading(false);
			if (status === 200) {
				setIsProcessed(true);
				setProcessedImage(data);
			}
		},
		[postUpload, setIsLoading, setIsProcessed, setProcessedImage]
	);

	return (
		<div id="image_container">
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img className="images" src={imageData} alt="" />
			<div className="button_group">
				<button className="button grey_button" onClick={() => setImageData("")}>
					Retake
				</button>
				<button
					className="button green_button"
					onClick={() => confirmImage(imageData)}
				>
					Confirm
				</button>
			</div>
		</div>
	);
}
