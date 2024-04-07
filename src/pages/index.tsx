import "@/styles/styles.css";
import React, { useCallback, useState } from "react";
import CapturedImage from "@/components/capturedImage";
import CompletedImage from "@/components/completedImage";
import ConsentForm from "@/components/consentForm";
import Loader from "@/components/loader";
import ProcessedImage from "@/components/processedImage";
import QRCode from "@/components/qrCode";
import WebCam from "@/components/webcam";
import { uploadFileResponses } from "@/responses/uploadFileResponses";
import Head from "next/head";

export default function StrangerFie() {
	const [imageData, setImageData] = useState<string>();
	const [isLoading, setIsLoading] = useState(false);
	const [processedImage, setProcessedImage] = useState<uploadFileResponses>();
	const [isProcessed, setIsProcessed] = useState(false);
	const [showQR, setShowQR] = useState(false);
	const [showConsentForm, setShowConsentForm] = useState(false);
	const [isCompleted, setCompleted] = useState(false);
	const [completedImage, setCompletedImage] = useState<string>();
	const [isPublished, setIsPublished] = useState(false);

	const showElement = useCallback(
		(isCompleted: boolean, isProcessed: boolean, isPublished: boolean) => {
			if (isCompleted) {
				return (
					<CompletedImage
						image={completedImage}
						isPublished={isPublished}
						setIsLoading={setIsLoading}
						setIsPublished={setIsPublished}
						setCompletedImage={setCompletedImage}
					/>
				);
			}

			if (isProcessed) {
				return (
					<ProcessedImage imageData={processedImage} setShowQR={setShowQR} />
				);
			}

			if (imageData) {
				return (
					<CapturedImage
						imageData={imageData}
						setIsLoading={setIsLoading}
						setImageData={setImageData}
						setIsProcessed={setIsProcessed}
						setProcessedImage={setProcessedImage}
					/>
				);
			}

			return <WebCam setImageData={setImageData} />;
		},
		[completedImage, imageData, processedImage]
	);

	return (
		<main>
			<Head>
				<title>StrangerFie</title>
			</Head>
			{isLoading ? <Loader /> : null}
			{showQR ? (
				<QRCode setShowQR={setShowQR} setShowConsentForm={setShowConsentForm} />
			) : null}
			{showConsentForm ? (
				<ConsentForm
					setShowConsentForm={setShowConsentForm}
					setIsLoading={setIsLoading}
					setCompleted={setCompleted}
					setCompletedImage={setCompletedImage}
					id={processedImage?.id}
				/>
			) : null}

			{showElement(isCompleted, isProcessed, isPublished)}
		</main>
	);
}
