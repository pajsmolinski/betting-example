import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import * as ReactQuery from "react-query";

import { AppProvider } from "../providers/app";

import { Landing } from "./Landing";

const mockRacesData = [
  {
    id: 1,
    name: "Beat the Clock to Yellow Rock",
    active: true,
    participants: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  {
    id: 2,
    name: "Idaho a Go-Go",
    active: true,
    participants: [1, 2, 7],
  },
  {
    id: 3,
    name: "Idaho a Go-Go",
    active: false,
    participants: [1, 2, 7],
  },
];

test("should render races", () => {
  jest.spyOn(ReactQuery, "useQuery").mockReturnValue({
    isLoading: false,
    data: mockRacesData,
    isSuccess: true,
  } as any);

  render(
    <AppProvider>
      <Landing />
    </AppProvider>
  );

  const racesRows = screen.getAllByTestId("race-row");
  expect(racesRows.length).toBe(3);
});

test("should display spinner on loading", () => {
  jest.spyOn(ReactQuery, "useQuery").mockReturnValue({
    isLoading: true,
  } as any);

  render(
    <AppProvider>
      <Landing />
    </AppProvider>
  );

  const spinner = screen.getByText("Loading...");
  expect(spinner).toBeInTheDocument();
});

test("should hide inactive races on filter", () => {
  jest.spyOn(ReactQuery, "useQuery").mockReturnValue({
    isLoading: false,
    data: mockRacesData,
    isSuccess: true,
  } as any);

  render(
    <AppProvider>
      <Landing />
    </AppProvider>
  );

  fireEvent.click(screen.getByText("Show only active"));

  const racesRows = screen.getAllByTestId("race-row");
  expect(racesRows.length).toBe(2);
});
