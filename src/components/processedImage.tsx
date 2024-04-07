import React, { useState } from "react";

type PropType = {
	imageData?: { onlyCurrentImage: string; mergedImage: string };
	setShowQR: (value: boolean) => void;
};

export default function ProcessedImage({ imageData, setShowQR }: PropType) {
	const [showCurrentOnly, setShowCurrentOnly] = useState(false);

	return (
		<div id="image_container">
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				className="images"
				src={
					showCurrentOnly ? imageData?.onlyCurrentImage : imageData?.mergedImage
				}
				alt="Processed Image"
			/>
			<div className="button_group">
				<button
					className="button grey_button"
					onClick={() => setShowCurrentOnly(!showCurrentOnly)}
				>
					{showCurrentOnly ? "Show Strangers" : "Hide Strangers"}
				</button>
				<button className="button green_button" onClick={() => setShowQR(true)}>
					Download
				</button>
			</div>
		</div>
	);
}
