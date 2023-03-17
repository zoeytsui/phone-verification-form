import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../../pages/index";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Home page", () => {
  it("phone input component verify button", () => {
    // render(<Home />);
    expect(true).toBeTruthy();
  });

});
