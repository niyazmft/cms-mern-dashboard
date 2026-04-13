import "@testing-library/jest-dom";
import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import StatBox from "./StatBox";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";

const renderWithTheme = (ui, mode = "dark") => {
  const theme = createTheme(themeSettings(mode));
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe("StatBox", () => {
  const mockProps = {
    title: "Total Users",
    value: "10,234",
    increase: "+14%",
    icon: <span data-testid="mock-icon">Icon</span>,
    description: "Since last month",
  };

  test("renders all provided props", () => {
    renderWithTheme(<StatBox {...mockProps} />);

    expect(screen.getByText("Total Users")).toBeInTheDocument();
    expect(screen.getByText("10,234")).toBeInTheDocument();
    expect(screen.getByText("+14%")).toBeInTheDocument();
    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
    expect(screen.getByText("Since last month")).toBeInTheDocument();
  });
});
