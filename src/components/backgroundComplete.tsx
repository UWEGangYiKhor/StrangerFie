import React from "react";

type PropType = {
	setShowDialog: (value: boolean) => void;
};

export default function BackgroundCompleteDialog({
	setShowDialog,
}: Readonly<PropType>) {
	return (
		<div id="consent_form_container">
			<div id="consent_form">
				<div>
					<h2>Background Saved!</h2>
				</div>
				<div id="consent_button_group">
					<button
						className="button green_button"
						onClick={() => {
							setShowDialog(false);
						}}
					>
						Okay
					</button>
				</div>
			</div>
		</div>
	);
}
