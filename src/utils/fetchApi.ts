import { API_URL } from "../config";

type FetchApi = <T>(path: string) => Promise<T>;

export const fetchApi: FetchApi = (path: string) => {
  return fetch(`${API_URL}/${path}`).then((res) => {
    if (!res.ok) {
      throw res.statusText;
    }

    return res.json();
  });
};
