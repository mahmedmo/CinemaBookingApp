import {
	faMagnifyingGlass,
	faTicket,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useUser } from "../../../app/UserContext";

export default function Header() {
	const navigate = useNavigate();
	const { user, setUser } = useUser();
	const [isHovered, setIsHovered] = useState(false);

	const handleSignOut = () => {
		setUser(null);
		navigate("/login", { replace: true });
	};

	return (
		<div className="w-screen h-20 bg-black flex flex-row align-middle justify-end pr-10 text-gray-300 gap-5 text-xl">
			<div
				className="flex flex-row items-center gap-2 hover:text-gray-400 cursor-pointer"
				onClick={() => navigate("/browse")}
			>
				<FontAwesomeIcon icon={faMagnifyingGlass} />
				Browse
			</div>
			<div
				className="flex flex-row items-center gap-2 hover:text-gray-400 cursor-pointer"
				onClick={() => navigate("/my-tickets")}
			>
				<FontAwesomeIcon icon={faTicket} />
				My Tickets
			</div>
			{user ? (
				<div
					className="flex flex-row items-center gap-2 hover:text-gray-400 cursor-pointer"
					onClick={isHovered ? handleSignOut : undefined}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					<FontAwesomeIcon icon={faUser} />
					{isHovered ? "Sign out" : user.email}
				</div>
			) : (
				<div
					className="flex flex-row items-center gap-2 hover:text-gray-400 cursor-pointer"
					onClick={() => navigate("/login")}
				>
					<FontAwesomeIcon icon={faUser} />
					Login
				</div>
			)}
		</div>
	);
}
