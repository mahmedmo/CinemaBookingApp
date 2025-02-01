import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
export default function Splash() {
	const navigate = useNavigate();
	const [currentTextIndex, setCurrentTextIndex] = useState(0);
	const [fade, setFade] = useState(true);
	const bg = require("../assets/background.jpg");
	const splashText = [
		"The Premium Cinema Experience.",
		"Entertainment at Its Finest.",
		"Enjoy our Diverse Catalog of Movies.",
		"Your Cinema, Your Movie, Your Choice.",
	];
	useEffect(() => {
		const interval = setInterval(() => {
			setFade(false);
			setTimeout(() => {
				setCurrentTextIndex((prevIndex) => (prevIndex + 1) % splashText.length);
				setFade(true);
			}, 1000);
		}, 4000);

		return () => clearInterval(interval);
	}, [splashText.length]);
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<div
			className="w-screen h-screen flex flex-col items-center justify-center"
			style={{
				backgroundImage: `url(${bg})`,
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
			}}
		>
			<div className="text-white text-6xl font-bold mb-2">AcmeBuddy</div>
			<div
				className={`text-white text-2xl font-medium transition-opacity duration-1000 ${
					fade ? "opacity-100" : "opacity-0"
				}`}
			>
				{splashText[currentTextIndex]}
			</div>
			<div
				onClick={() => {
					navigate("/browse");
				}}
				className={`flex flex-row mt-5 gap-2 items-center cursor-pointer text-white transition-opacity duration-150 active:opacity-75 font-bold `}
				style={{
					backgroundColor: "#e50914",
					borderRadius: "0.5rem",
					padding: "0.5rem 1rem",
					userSelect: "none",
				}}
			>
				<FontAwesomeIcon icon={faMagnifyingGlass} />
				Browse Movies
			</div>
			<div className="h-80"></div>
		</div>
	);
}
