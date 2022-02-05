import { Race } from "../types";
import { fetchApi } from "../utils/fetchApi";

type GetSingleRace = (id: number) => Promise<Race>;

export const getSingleRace: GetSingleRace = (id: number) => {
  return fetchApi<Race>(`races/${id}`);
};
