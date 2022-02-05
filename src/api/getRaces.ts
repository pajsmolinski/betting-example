import { Race } from "../types";
import { fetchApi } from "../utils/fetchApi";

type GetRaces = () => Promise<Race[]>;

export const getRaces: GetRaces = () => {
  return fetchApi<Race[]>("races");
};
