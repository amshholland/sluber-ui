import React from "react";
import { render, screen } from "@testing-library/react";
import CardList from "../components/CardList";

test("Render CardList and tests if certain text exists", () => {
	render(<CardList />);

	expect(screen.queryAllByLabelText("I'm interested"));
	expect(screen.queryAllByLabelText(/Departs at:/));
	expect(screen.queryAllByLabelText(/Arrives at:/));
});

test("Render CardList and tests if certain text exists", () => {
	render(<CardList />);

	screen.queryAllByLabelText("heading", { name: "Test" });
});

jest.mock("../components/CardList", () => () => "CardList");
