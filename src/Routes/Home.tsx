import { useQuery } from "react-query";
import { IGetMoviesResult } from "../interface";
import { getNowPlayMovies, getTopRatedMovies, getUpcomingMovies } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { AnimatePresence } from "framer-motion";
import { useMatch } from "react-router-dom";
import MovieDetail from "../Components/MovieDetail";
import SliderComponent from "../Components/SliderComponent";

const Wrapper = styled.div`
  background: black;
`;
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ $bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const MovieList = styled.div`
  display: grid;
  grid-template-rows: repeat(1fr);
  position: relative;
  gap: 80px;
  top: -100px;
`;

function Home() {
  const detailMovieMatch = useMatch("/movies/:category/:movieId");
  const topRatedMovies = useQuery<IGetMoviesResult>(
    ["movies", "topRated"],
    () => getTopRatedMovies()
  );
  const nowPlayMovies = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    () => getNowPlayMovies()
  );
  const upComingMovies = useQuery<IGetMoviesResult>(
    ["movies", "upComing"],
    () => getUpcomingMovies()
  );
  //prev 동작 후 next 동작시 오류가 생겨 수정.
  return (
    <Wrapper>
      {nowPlayMovies.isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            $bgPhoto={makeImagePath(
              nowPlayMovies.data?.results[0].backdrop_path || ""
            )}
          >
            <Title>{nowPlayMovies.data?.results[0].title}</Title>
            <Overview>{nowPlayMovies.data?.results[0].overview}</Overview>
          </Banner>
          <MovieList>
            {/* nowPlay */}
            <SliderComponent category="nowPlay" data={nowPlayMovies.data} />
            {/* TopRated */}
            <SliderComponent category="Top Rated" data={topRatedMovies.data} />
            {/* Upcoming */}
            <SliderComponent category="Upcoming" data={upComingMovies.data} />
          </MovieList>
          <AnimatePresence>
            {detailMovieMatch ? (
              <MovieDetail
                category={detailMovieMatch.params.category || ""}
                selectedId={detailMovieMatch.params.movieId || ""}
              />
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
