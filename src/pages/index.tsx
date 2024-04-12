import "@/styles/styles.css";
import React, { useCallback, useEffect, useState } from "react";
import CapturedImage from "@/components/capturedImage";
import CompletedImage from "@/components/completedImage";
import ConsentForm from "@/components/consentForm";
import Loader from "@/components/loader";
import ProcessedImage from "@/components/processedImage";
import QRCode from "@/components/qrCode";
import WebCam from "@/components/webcam";
import { uploadFileResponses } from "@/responses/uploadFileResponses";
import Head from "next/head";
import { useGet } from "@/hooks/useGet";
import { isSetupResponses } from "@/responses/isSetupResponses";
import { hasPublishedImageResponses } from "@/responses/hasPublishedImageResponses";

export default function StrangerFie() {
	const [imageData, setImageData] = useState<string>();
	const [isLoading, setIsLoading] = useState(false);
	const [processedImage, setProcessedImage] = useState<uploadFileResponses>();
	const [isProcessed, setIsProcessed] = useState(false);
	const [showQR, setShowQR] = useState(false);
	const [showConsentForm, setShowConsentForm] = useState(false);
	const [isCompleted, setIsCompleted] = useState(false);
	const [completedImage, setCompletedImage] = useState<string>();
	const [isPublished, setIsPublished] = useState(false);
	const [isSetup, setIsSetup] = useState(false);
	const [hasPublished, setHasPublished] = useState(false);
	const getIsSetupStatus = useGet<isSetupResponses>("/api/isSetup");
	const getHasPublishedImage = useGet<hasPublishedImageResponses>(
		"/api/hasPublishedImage"
	);

	useEffect(() => {
		setIsLoading(true);
		getIsSetupStatus().then(({ data }) => {
			setIsSetup(data.status);
			setIsLoading(false);
		});
		getHasPublishedImage().then(({ data }) => {
			setHasPublished(data.status);
			setIsLoading(false);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
						isSetup={isSetup}
					/>
				);
			}

			return (
				<WebCam
					setImageData={setImageData}
					isSetup={isSetup}
					hasPublished={hasPublished}
					setCompletedImage={setCompletedImage}
					setIsPublished={setIsPublished}
					setIsCompleted={setIsCompleted}
				/>
			);
		},
		[imageData, isSetup, hasPublished, completedImage, processedImage]
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
					setCompleted={setIsCompleted}
					setCompletedImage={setCompletedImage}
					id={processedImage?.id}
				/>
			) : null}

			{showElement(isCompleted, isProcessed, isPublished)}
		</main>
	);
}
