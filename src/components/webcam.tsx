import React, { useRef, useCallback } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
	width: 1920,
	height: 1080,
	facingMode: "user",
};

type PropType = {
	setImageData: (value: string) => void;
};

export default function WebCam({ setImageData }: PropType) {
	const webcamRef = useRef<Webcam>(null);

	const capture = useCallback(async () => {
		setImageData(webcamRef?.current?.getScreenshot() || "");
	}, [webcamRef, setImageData]);

	return (
		<>
			<Webcam
				audio={false}
				width={1280}
				height={720}
				ref={webcamRef}
				screenshotFormat="image/jpeg"
				videoConstraints={videoConstraints}
				mirrored={true}
			/>
			<button onClick={capture}>Capture Photo</button>
		</>
	);
}
