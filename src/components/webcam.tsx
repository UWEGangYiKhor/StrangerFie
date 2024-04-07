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
		<div id="image_container">
			<Webcam
				className="images"
				audio={false}
				width={1920}
				height={1080}
				ref={webcamRef}
				screenshotFormat="image/jpeg"
				videoConstraints={videoConstraints}
				mirrored={true}
			/>
			<div className="button_group">
				<button
					id="capture_button"
					className="button green_button"
					onClick={capture}
				>
					Capture Photo
				</button>
			</div>
		</div>
	);
}
