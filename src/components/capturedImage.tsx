import { uploadFileDto } from "@/dto/uploadFileDto";
import { usePost } from "@/hooks/usePost";
import { uploadFileResponses } from "@/responses/uploadFileResponses";
import React, { useCallback, useState } from "react";
import BackgroundCompleteDialog from "./backgroundComplete";

type PropType = {
	imageData: string;
	setIsLoading: (value: boolean) => void;
	setImageData: (value: string) => void;
	setIsProcessed: (value: boolean) => void;
	setProcessedImage: (value: uploadFileResponses) => void;
	isSetup: boolean;
};

export default function CapturedImage({
	imageData,
	setIsLoading,
	setImageData,
	setIsProcessed,
	setProcessedImage,
	isSetup,
}: Readonly<PropType>) {
	const [showDialog, setShowDialog] = useState(false);
	const [uploadedBackground, setUploadedBackground] = useState(false);
	const postUpload = usePost<uploadFileDto, uploadFileResponses>(
		"/api/uploadFile"
	);
	const postBackground = usePost<uploadFileDto, void>("/api/uploadBackground");

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

	const uploadBackground = useCallback(
		async (imageData: string) => {
			setIsLoading(true);
			const { status } = await postBackground({ image: imageData });
			setIsLoading(false);
			if (status === 200) {
				setShowDialog(true);
				setUploadedBackground(true);
			}
		},
		[postBackground, setIsLoading]
	);

	return (
		<>
			{showDialog ? (
				<BackgroundCompleteDialog setShowDialog={setShowDialog} />
			) : null}

			<div id="image_container">
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img className="images" src={imageData} alt="" />

				{!uploadedBackground ? (
					<div className="button_group">
						<button
							className="button grey_button"
							onClick={() => setImageData("")}
						>
							Retake
						</button>
						<button
							className="button blue_button"
							onClick={() => uploadBackground(imageData)}
						>
							Save as Background
						</button>

						{isSetup ? (
							<button
								className="button green_button"
								onClick={() => confirmImage(imageData)}
							>
								Confirm
							</button>
						) : null}
					</div>
				) : null}
			</div>
		</>
	);
}
