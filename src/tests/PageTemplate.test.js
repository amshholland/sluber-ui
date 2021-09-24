import React from "react";
import { render, screen } from "@testing-library/react";
import PageTemplate from "../containers/PageTemplate";

test("Render CardList and tests if certain text exists", () => {
	render(<PageTemplate />);
	screen.queryAllByLabelText("classes.title", { name: "Sluber" });
});

jest.mock("../containers/PageTemplate", () => () => "PageTemplate");
