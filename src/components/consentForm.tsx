import { completeImageDto } from "@/dto/completeImageDto";
import { usePost } from "@/hooks/usePost";
import React, { useCallback } from "react";

type PropType = {
	setShowConsentForm: (value: boolean) => void;
	setIsLoading: (value: boolean) => void;
	setCompleted: (value: boolean) => void;
	setCompletedImage: (value: string) => void;
	id?: string;
};

export default function ConsentForm({
	setShowConsentForm,
	setIsLoading,
	id,
	setCompleted,
	setCompletedImage,
}: PropType) {
	const postComplete = usePost<completeImageDto>("/api/completeImage");

	const completeImage = useCallback(async () => {
		setIsLoading(true);
		const { data, status } = await postComplete({
			id: id || "",
		});
		setIsLoading(false);
		if (status === 200) {
			setCompleted(true);
			setCompletedImage(data.image);
		}
	}, [setIsLoading, postComplete, id, setCompleted, setCompletedImage]);

	return (
		<div id="consent_form_container">
			<div id="consent_form">
				<div>
					<h2>Consent Form</h2>
					<p>
						Do you allow us to leave your photo on the screen until the group
						photo is completed, and publish it onto our Facebook page? We will
						blur out your face until it is published.
					</p>
				</div>
				<div id="consent_button_group">
					<button
						className="button red_button"
						onClick={() => setShowConsentForm(false)}
					>
						No
					</button>
					<button
						className="button green_button"
						onClick={() => {
							setShowConsentForm(false);
							completeImage();
						}}
					>
						Yes
					</button>
				</div>
			</div>
		</div>
	);
}
