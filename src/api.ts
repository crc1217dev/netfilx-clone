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

const changeDateFormat = (prevDate: Date) => {
  const year = prevDate.getFullYear();
  const month = ("0" + (prevDate.getMonth() + 1)).slice(-2);
  const day = ("0" + prevDate.getDate()).slice(-2);
  const dateStr = `${year}-${month}-${day}`;
  console.log(dateStr);
  return dateStr;
};

export function getTopRatedMovies(language: string = "en-US") {
  return fetch(
    `${BASE_PATH}/movie/top_rated?language=${language}&page=1`,
    getOptions
  ).then((response) => response.json());
}

export function getNowPlayMovies(language: string = "en-US") {
  return fetch(
    `${BASE_PATH}/movie/now_playing?language=${language}&page=1`,
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
    )}&region=US&sort_by=primary_release_date.asc`,
    // "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=2023-07-27&primary_release_date.lte=2023-08-31&region=US&sort_by=primary_release_date.asc",
    getOptions
  ).then((response) => response.json());
}

export async function getMovieDetail(
  language: string = "en-US",
  movieId: string
) {
  const response = await fetch(
    `${BASE_PATH}/movie/${movieId}?language=${language}`,
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

//TODO Get movie Detail, trailer 한글 변환 필요
