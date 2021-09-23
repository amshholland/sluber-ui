import React, { useState } from "react";
import { signOut } from "../firebaseConfig";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import "../styles/SignInAndOutButtons.css";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

function SignOut() {
	const { user } = useContext(AuthContext);
	const [showSignOut, setShowSignOut] = useState("none");

	const displaySignOutDropDown = () => {
		if (showSignOut === "none") {
			setShowSignOut("flex");
		} else {
			setShowSignOut("none");
		}
	};

	return (
		<div className="SignOut">
			{user && (
				<div className="signOutDiv">
					<div
						className="userAvatarDiv"
						onClick={() => displaySignOutDropDown()}
					>
						{!!user.photoURL && (
							<img
								className="userAvatar"
								src={user.photoURL}
								alt="google avatar"
							/>
						)}
					</div>
					<div style={{ display: showSignOut }}>
						{user && (
							<Link to="/FindRidePage">
								<Button
									className="signOut"
									variant="contained"
									color="primary"
									onClick={signOut}
								>
									Sign Out
								</Button>
							</Link>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default SignOut;
