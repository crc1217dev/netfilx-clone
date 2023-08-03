import { useQuery } from "react-query";
import { IGetContentsResult } from "../interface/interface";
import {
  getNowPlayMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../api/movieApi";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import { useMatch } from "react-router-dom";
import ContentDetail from "../Components/ContentDetail";
import SliderComponent from "../Components/SliderComponent";
import Banner from "../Components/Banner";

const Wrapper = styled.div`
  background: black;
`;
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SlideList = styled.div`
  display: grid;
  grid-template-rows: repeat(1fr);
  position: relative;
  gap: 80px;
  top: -10vh;
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
          <Banner contentData={nowPlayMovies.data?.results[0]!} />
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
