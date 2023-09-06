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
export function getTopRatedMovies(language: string = "en-US") {
  return fetch(
    `${BASE_PATH}/movie/top_rated?language=${language}&page=1&sort_by=popularity.desc`,
    getOptions
  ).then((response) => response.json());
}

export function getNowPlayMovies(language: string = "en-US") {
  return fetch(
    `${BASE_PATH}/movie/now_playing?language=${language}&page=1&sort_by=popularity.desc`,
    getOptions
  ).then((response) => response.json());
}
export function getUpcomingMovies(language: string = "en-US") {
  const today = new Date();
  const lteDate = new Date(today);
  lteDate.setDate(today.getDate() + 21);
  return fetch(
    `${BASE_PATH}/movie/upcoming?language=${language}&page=1&primary_release_date.gte=${changeDateFormat(
      today
    )}&primary_release_date.lte=${changeDateFormat(
      lteDate
    )}&region=US&sort_by=primary_release_date.desc`,
    // "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=2023-07-27&primary_release_date.lte=2023-08-31&region=US&sort_by=primary_release_date.desc",
    getOptions
  ).then((response) => response.json());
}

export async function getMovieDetail(
  language: string = "en-US",
  contentId: string
) {
  const response = await fetch(
    `${BASE_PATH}/movie/${contentId}?language=${language}`,
    getOptions
  );
  return await response.json();
}
export async function getMovieTrailers(language: string = "en-US", id: string) {
  const response = await fetch(
    `${BASE_PATH}/movie/${id}/videos?language=${language}&type="Trailer"`,
    getOptions
  );
  return await response.json();
}

export async function getMovieCredits(
  language: string = "en-US",
  contentId: string
) {
  const response = await fetch(
    `${BASE_PATH}/movie/${contentId}/credits?language=${language}`,
    getOptions
  );
  return await response.json();
}
