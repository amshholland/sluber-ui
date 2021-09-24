import React from "react";
import { render } from "@testing-library/react";
import TopMenu from "../components/TopMenu";

test("renders departure search field", () => {
	const topMenu = render(<TopMenu />);
	const divByClass = document.querySelector(".departure-search-cont");
	expect(divByClass.innerHTML).toEqual("Departure");
});

test("renders destination search field", () => {
	const topMenu = render(<TopMenu />);
	expect(screen.queryAllByLabelText("Destination"));
});

// test("renders date search field", () => {
// 	const topMenu = render(<TopMenu />);
// 	const divByClass = document.querySelector(".search-date");
// 	expect(divByClass.innerHTML).toEqual("Date");
// });
jest.mock("../components/TopMenu", () => () => "TopMenu");
