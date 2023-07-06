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
export function getMovies(language: string = "en-US") {
  return fetch(
    `${BASE_PATH}/movie/now_playing?language=${language}&page=1`,
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
    `${BASE_PATH}/movie/${id}/videos?language=${language}`,
    getOptions
  );
  return await response.json();
}

//TODO Get movie Detail, trailer 한글 변환 필요
