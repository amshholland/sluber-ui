import React from "react";
import { render, screen } from "@testing-library/react";
import PageTemplate from "../containers/PageTemplate";
import SignIn from "../components/SignIn";

// test("Render CardList and tests if certain text exists", () => {
// 	render(<PageTemplate />);
// 	screen.getByRole("banner", { name: "Sluber" });
// });

const PageTemplate = ({ user }) => <div>A mock with '{user}' passed!</div>;

const signInOrSignOutButton = require("../containers/PageTemplate").default;
export default signInOrSignOutButton;

// export { user };
// jest.mock("../containers/PageTemplate", () => ({
// 	user: false,
// }));

// test("does not render sign out button", () => {
// 	render(<PageTemplate />);
// 	const signOutButton = screen.queryByRole("Button", { name: "Sign Out" });
// 	expect(signOutButton).not.toBeInTheDocument();
// });

// test("renders sign in button", () => {
// 	render(<PageTemplate />);
// 	const signInButton = screen.queryByRole("button", { name: "Sign In" });
// 	expect(signInButton).toBeInTheDocument();
// });
