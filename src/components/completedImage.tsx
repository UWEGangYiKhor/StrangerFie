import { useGet } from "@/hooks/useGet";
import { publishImageResponses } from "@/responses/publishImageResponses";
import React, { useCallback } from "react";

type PropType = {
	image?: string;
	isPublished: boolean;
	setIsLoading: (value: boolean) => void;
	setIsPublished: (value: boolean) => void;
	setCompletedImage: (value: string) => void;
};

export default function CompletedImage({
	image,
	isPublished,
	setIsLoading,
	setIsPublished,
	setCompletedImage,
}: Readonly<PropType>) {
	const postPublish = useGet<publishImageResponses>("/api/publishImage");

	const publishImage = useCallback(async () => {
		setIsLoading(true);
		const { data, status } = await postPublish();
		setIsLoading(false);
		if (status === 200) {
			setIsPublished(true);
			setCompletedImage(data.image);
		}
	}, [postPublish, setCompletedImage, setIsLoading, setIsPublished]);

	return (
		<div id="image_container">
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img className="images" src={image} alt="" />
			{!isPublished ? (
				<div className="button_group">
					<button className="button blue_button" onClick={publishImage}>
						Publish
					</button>
				</div>
			) : null}
		</div>
	);
}
