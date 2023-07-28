import { useQuery } from "react-query";
import { IGetContentsResult } from "../interface";
import {
  getNowPlayMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../api/movieApi";
import styled from "styled-components";
import { makeImagePath } from "../utils/utils";
import { AnimatePresence } from "framer-motion";
import { useMatch } from "react-router-dom";
import ContentDetail from "../Components/ContentDetail";
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

const SlideList = styled.div`
  display: grid;
  grid-template-rows: repeat(1fr);
  position: relative;
  gap: 80px;
  top: -100px;
`;

function Home() {
  const detailMovieMatch = useMatch("/movies/:category/:contentId");
  const topRatedMovies = useQuery<IGetContentsResult>(
    ["movies", "topRated"],
    () => getTopRatedMovies()
  );
  const nowPlayMovies = useQuery<IGetContentsResult>(
    ["movies", "nowPlaying"],
    () => getNowPlayMovies()
  );
  const upComingMovies = useQuery<IGetContentsResult>(
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
          <SlideList>
            {/* nowPlay */}
            <SliderComponent
              type="Movie"
              category="nowPlay"
              data={nowPlayMovies.data}
            />
            {/* TopRated */}
            <SliderComponent
              type="Movie"
              category="Top Rated"
              data={topRatedMovies.data}
            />
            {/* Upcoming */}
            <SliderComponent
              type="Movie"
              category="Upcoming"
              data={upComingMovies.data}
            />
          </SlideList>
          <AnimatePresence>
            {detailMovieMatch ? (
              <ContentDetail
                type="Movie"
                category={detailMovieMatch.params.category || ""}
                selectedId={detailMovieMatch.params.contentId || ""}
              />
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
