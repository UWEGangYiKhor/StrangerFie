import Image from "next/image";
import React from "react";

export default function Loader() {
	return (
		<div id="loader">
			<Image
				src="/loader.gif"
				alt="Loading"
				width={100}
				height={100}
				unoptimized
			/>
		</div>
	);
}
