import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

describe("your test suite", () => {
	window.URL.createObjectURL = jest.fn();

	afterEach(() => {
		window.URL.createObjectURL.mockReset();
	});

	it("renders learn react link", () => {
		const app = render(<App />);
		const appByClass = document.getElementsByClassName("App");
		expect(appByClass).toBeTruthy();
	});
});

jest.mock("./App", () => () => "App");
