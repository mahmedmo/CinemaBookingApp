import React, { useState } from "react";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfUse from "./TermsOfUse";
import CookieSettings from "./CookieSettings";

export default function Footer() {
	const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
	const [showTermsOfUse, setShowTermsOfUse] = useState(false);
	const [showCookies, setShowCookies] = useState(false);

	const currentYear = new Date().getFullYear();

	const closeModal = () => {
		setShowPrivacyPolicy(false);
		setShowTermsOfUse(false);
		setShowCookies(false);
	};

	return (
		<footer className="w-full bg-black text-white py-4 relative">
			<div className="text-center mb-2">
				<p className="text-md">{currentYear} AcmePlex ©</p>
			</div>
			<div className="text-sm flex justify-center gap-10">
				<button
					onClick={() => setShowPrivacyPolicy(true)}
					className="text-white hover:underline focus:outline-none"
				>
					Privacy Policy
				</button>
				<button
					onClick={() => setShowTermsOfUse(true)}
					className="text-white hover:underline focus:outline-none"
				>
					Terms of Use
				</button>
				<button
					onClick={() => setShowCookies(true)}
					className="text-white hover:underline focus:outline-none"
				>
					Cookie Settings
				</button>
			</div>
			{showPrivacyPolicy && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="bg-black rounded-xl p-6 w-96 relative animate-zoomInBounce">
						<PrivacyPolicy />
						<div className="mt-8"></div>
						<button
							onClick={closeModal}
							className="absolute bottom-4 right-4 bg-[#e50914] text-white px-4 py-2 rounded hover:bg-red-700"
						>
							Close
						</button>
					</div>
				</div>
			)}
			{showTermsOfUse && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 rounded-xl">
					<div className="bg-black rounded-xl p-6 w-96 relative animate-zoomInBounce">
						<TermsOfUse />
						<div className="mt-8"></div>
						<button
							onClick={closeModal}
							className="absolute bottom-4 right-4 bg-[#e50914] text-white px-4 py-2 rounded hover:bg-red-700"
						>
							Close
						</button>
					</div>
				</div>
			)}
			{showCookies && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="bg-black rounded-xl p-6 w-96 relative animate-zoomInBounce">
						<CookieSettings />
						<div className="mt-8"></div>
						<button
							onClick={closeModal}
							className="absolute bottom-4 right-4 bg-[#e50914] text-white px-4 py-2 rounded hover:bg-red-700"
						>
							Close
						</button>
					</div>
				</div>
			)}
		</footer>
	);
}
