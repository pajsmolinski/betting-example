import { Participant } from "../types";
import { fetchApi } from "../utils/fetchApi";

type GetParticipants = (ids: number[]) => Promise<Participant[]>;

export const getParticipants: GetParticipants = (ids) => {
  return fetchApi<Participant[]>("participants").then((data) => {
    return data.filter((item) => ids.includes(item.id));
  });
};
