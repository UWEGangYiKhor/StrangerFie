import Image from "next/image";
import React from "react";

type PropType = {
	setShowQR: (value: boolean) => void;
	setShowConsentForm: (value: boolean) => void;
};

export default function QRCode({ setShowQR, setShowConsentForm }: PropType) {
	return (
		<div id="qr_code">
			<Image
				src="/example_qr_code.png"
				alt="Image Download QR Code"
				width={400}
				height={400}
			/>
			<button
				className="button green_button"
				onClick={() => {
					setShowQR(false);
					setShowConsentForm(true);
				}}
			>
				Done
			</button>
		</div>
	);
}
