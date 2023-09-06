import { changeDateFormat } from "../utils/utils";

const token_key = process.env.REACT_APP_THEMOVIEDB_API_KEY;
const BASE_PATH = process.env.REACT_APP_THEMOVIEDB_API_PATH;
const getOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token_key}`,
  },
};

export function getTopRatedTvShows(language: string = "en-US") {
  return fetch(
    `${BASE_PATH}/tv/top_rated?language=${language}&page=1&sort_by=popularity.desc`,
    getOptions
  ).then((response) => response.json());
}

export function getAiringTodayTvShows(language: string = "en-US") {
  return fetch(
    `${BASE_PATH}/tv/airing_today?language=${language}&page=1&sort_by=popularity.desc`,
    getOptions
  ).then((response) => response.json());
}

export function getOnTheAirTvShows(language: string = "en-US") {
  const today = new Date();
  const lteDate = new Date(today);
  lteDate.setDate(today.getDate() + 7);
  return fetch(
    `${BASE_PATH}/tv/on_the_air?first_air_date.gte=${changeDateFormat(
      today
    )}&first_air_date.lte=${changeDateFormat(today)}&language=en-US&page=1`,
    getOptions
  ).then((response) => response.json());
}

export async function getTvDetail(
  language: string = "en-US",
  contentId: string
) {
  const response = await fetch(
    `${BASE_PATH}/tv/${contentId}?language=${language}`,
    getOptions
  );
  return await response.json();
}
export async function getTvTrailers(language: string = "en-US", id: string) {
  const response = await fetch(
    `${BASE_PATH}/tv/${id}/videos?language=${language}&type="Trailer"`,
    getOptions
  );
  return await response.json();
}

export async function getTvCredits(
  language: string = "en-US",
  contentId: string
) {
  const response = await fetch(
    `${BASE_PATH}/tv/${contentId}/credits?language=${language}`,
    getOptions
  );
  return await response.json();
}
