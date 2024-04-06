import WebCam from "@/components/webcam";
import { imageDto } from "@/dto/imageDto";
import axios, { AxiosResponse } from "axios";
import React, { useCallback, useState } from "react";

export default function StrangerFie() {
	const [imageData, setImageData] = useState<string>();
	const [isLoading, setIsLoading] = useState(false);
	const [processedImage, setProcessedImage] = useState<{
		mergedImage: string;
		onlyCurrentImage: string;
		id: string;
	}>();
	const [isProcessed, setIsProcessed] = useState(false);
	const [showCurrentOnly, setShowCurrentOnly] = useState(false);
	const [showQR, setShowQR] = useState(false);
	const [showConsentForm, setShowConsentForm] = useState(false);
	const [isCompleted, setCompleted] = useState(false);
	const [completedImage, setCompletedImage] = useState<string>();
	const [isPublished, setIsPublished] = useState(false);

	const confirmImage = useCallback(
		async (imageData: string) => {
			setIsLoading(true);
			const { data, status } = await axios.post<
				any,
				AxiosResponse<
					{
						mergedImage: string;
						onlyCurrentImage: string;
						id: string;
					},
					any
				>,
				imageDto
			>("/api/uploadFile", { image: imageData });
			setIsLoading(false);
			if (status === 200) {
				setIsProcessed(true);
				setProcessedImage(data);
			}
		},
		[setIsLoading, setIsProcessed, setProcessedImage]
	);

	const completeImage = useCallback(async () => {
		setIsLoading(true);
		const { data, status } = await axios.post<
			any,
			AxiosResponse<{ image: string }, any>,
			{ id: string }
		>("/api/completeImage", { id: processedImage?.id || "" });
		setIsLoading(false);
		if (status === 200) {
			setCompleted(true);
			setCompletedImage(data.image);
		}
	}, [setIsLoading, processedImage?.id, setCompleted, setCompletedImage]);

	const publishImage = useCallback(async () => {
		setIsLoading(true);
		const { data, status } = await axios.post<
			any,
			AxiosResponse<{ image: string }, any>,
			null
		>("/api/publishImage");
		setIsLoading(false);
		if (status === 200) {
			setIsPublished(true);
			setCompletedImage(data.image);
		}
	}, [setIsLoading, setIsPublished, setCompletedImage]);

	return (
		<main>
			{isCompleted ? (
				<>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img src={completedImage} alt="Completed Image" />
					{isPublished ? null : <button onClick={publishImage}>Publish</button>}
				</>
			) : isProcessed ? (
				showCurrentOnly ? (
					<>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img src={processedImage?.onlyCurrentImage} alt="Processed Image" />
						<button onClick={() => setShowCurrentOnly(false)}>
							Show Strangers
						</button>
						<button onClick={() => setShowQR(true)}>Download</button>
					</>
				) : (
					<>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img src={processedImage?.mergedImage} alt="Processed Image" />
						<button onClick={() => setShowCurrentOnly(true)}>
							Hide Strangers
						</button>
						<button onClick={() => setShowQR(true)}>Download</button>
					</>
				)
			) : imageData ? (
				<>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img src={imageData} alt="Captured Image" />
					<button onClick={() => confirmImage(imageData)}>Confirm</button>
					<button onClick={() => setImageData("")}>Retake</button>

					{/* eslint-disable-next-line @next/next/no-img-element */}
					{isLoading ? <img src="/loader.gif" alt="Loading" /> : ""}
				</>
			) : (
				<WebCam setImageData={setImageData} />
			)}

			{showQR ? (
				<div>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img src="/example_qr_code.png" alt="Image Download QR Code" />
					<button
						onClick={() => {
							setShowQR(false);
							setShowConsentForm(true);
						}}
					>
						Done
					</button>
				</div>
			) : null}

			{showConsentForm ? (
				<div>
					<h2>Consent Form</h2>
					<p>
						Do you allow us to leave your photo on the screen until the group
						photo is completed, and publish it onto our Facebook page? We will
						blur out your face until it is published.
					</p>
					<button onClick={() => setShowConsentForm(false)}>No</button>
					<button
						onClick={() => {
							setShowConsentForm(false);
							completeImage();
						}}
					>
						Yes
					</button>
				</div>
			) : null}
		</main>
	);
}
