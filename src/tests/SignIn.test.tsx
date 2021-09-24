import React from "react";
import PageTemplate from "../containers/PageTemplate";
import { render, screen } from "@testing-library/react";

test("does not render sign out button", () => {
	render(<PageTemplate />);
	const signOutButton = screen.queryByRole("button", { name: "Sign Out" });
	expect(signOutButton).not.toBeInTheDocument();
});

test("renders sign in button", () => {
	render(<PageTemplate />);
	const signInButton = screen.queryByRole("button", { name: "Sign In" });
	expect(signInButton).toBeInTheDocument();
});
