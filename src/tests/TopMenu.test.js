import React from "react";
import { render, screen } from "@testing-library/react";
import TopMenu from "../components/TopMenu";

test("renders departure search field", () => {
	render(<TopMenu />);
	const divByClass = screen.getByLabelText(/Departure/);
	expect(divByClass).toBeInTheDocument();
});

// test("renders destination search field", () => {
// 	const topMenu = render(<TopMenu />);
// 	const divByClass = document.querySelector(".destination-search-cont");
// 	expect(divByClass.queryByLabelText("Destination"));
// });

// test("renders date search field", () => {
// 	const topMenu = render(<TopMenu />);
// 	const divByClass = document.querySelector(".search-date");
// 	expect(divByClass.innerHTML).toEqual("Date");
// });

jest.mock("../components/TopMenu", () => () => "TopMenu");
