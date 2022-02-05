import { fireEvent, render, screen } from "@testing-library/react";
import * as ReactQuery from "react-query";
import * as ReactRouterDom from "react-router-dom";

import { AppProvider } from "../providers/app";

import { Race } from "./Race";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

const mockRaceData = {
  id: 1,
  name: "Beat the Clock to Yellow Rock",
  active: true,
  participants: [1, 2, 3, 4],
};

const mockParticipantsData = [
  {
    id: 1,
    body: "The Boulder Mobile",
  },
  {
    id: 2,
    body: "The Buzzwagon",
  },
  {
    id: 3,
    body: "The Creepy Coupe",
  },
  {
    id: 4,
    body: "The Bulletproof Bomb",
  },
];

test("should render race name", () => {
  jest.spyOn(ReactRouterDom, "useParams").mockReturnValue({ id: "1" });

  jest
    .spyOn(ReactQuery, "useQuery")
    .mockReturnValueOnce({
      isLoading: false,
      data: mockRaceData,
      isSuccess: true,
    } as any)
    .mockReturnValueOnce({
      isLoading: true,
    } as any);

  render(
    <AppProvider>
      <Race />
    </AppProvider>
  );

  const header = screen.getByText(mockRaceData.name);
  expect(header).toBeInTheDocument();
});

test("should save data to localstorage", () => {
  jest.spyOn(ReactRouterDom, "useParams").mockReturnValue({ id: "1" });

  jest
    .spyOn(ReactQuery, "useQuery")
    .mockReturnValueOnce({
      isLoading: false,
      data: mockRaceData,
      isSuccess: true,
    } as any)
    .mockReturnValueOnce({
      isLoading: false,
      data: mockParticipantsData,
      isSuccess: true,
    } as any);

  render(
    <AppProvider>
      <Race />
    </AppProvider>
  );

  const input = screen.getByTestId("money-input");
  fireEvent.input(input, { target: { value: "23" } });

  const firstParticipantBet = screen.getByTestId("1-bet-1st");
  fireEvent.click(firstParticipantBet);

  const secondParticipantBet = screen.getByTestId("2-bet-2nd");
  fireEvent.click(secondParticipantBet);

  const thirdParticipantBet = screen.getByTestId("3-bet-3rd");
  fireEvent.click(thirdParticipantBet);

  const localStorageData = JSON.parse(localStorage.getItem("race1") || "");

  expect(localStorageData).toStrictEqual({
    bet: 23,
    winners: { 1: 1, 2: 2, 3: 3 },
  });
});
