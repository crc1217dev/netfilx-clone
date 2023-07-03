const token_key =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMWJmMjMzZmVmNTQ5NjczMTVhODJlNDBlMWZhMGI3MCIsInN1YiI6IjYzNjRjYmU3MGQyZjUzMDA3ZGY2Y2FiNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2jJkNqOgyF4x4F-EEThdPWuMRwqdltIhathZNpA2l98";
const BASE_PATH = "https://api.themoviedb.org/3";
const getOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token_key}`,
  },
};

export interface IGetMoviesResult {
  dates: Dates;
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface Dates {
  maximum: string;
  minimum: string;
}

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export function getMovies() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?language=en-US&page=1`,
    getOptions
  ).then((response) => response.json());
}
//TODO Get movie Detail, trailer
