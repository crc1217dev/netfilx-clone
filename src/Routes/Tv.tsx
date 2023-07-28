import styled from "styled-components";
import SliderComponent from "../Components/SliderComponent";
import { makeImagePath } from "../utils/utils";
import { IGetContentsResult } from "../interface";
import { useQuery } from "react-query";
import {
  getAiringTodayTvShows,
  getOnTheAirTvShows,
  getTopRatedTvShows,
} from "../api/tvApi";
import { AnimatePresence } from "framer-motion";
import { useMatch } from "react-router-dom";
import ContentDetail from "../Components/ContentDetail";

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

function Tv() {
  const detailTvMatch = useMatch("/tv/:category/:contentId");
  const topRatedTvShows = useQuery<IGetContentsResult>(
    ["tvShows", "topRated"],
    () => getTopRatedTvShows()
  );
  const airingTodayShows = useQuery<IGetContentsResult>(
    ["movies", "nowPlaying"],
    () => getAiringTodayTvShows()
  );
  const onTheAirTvShows = useQuery<IGetContentsResult>(
    ["movies", "upComing"],
    () => getOnTheAirTvShows()
  );
  //prev 동작 후 next 동작시 오류가 생겨 수정.
  return (
    <Wrapper>
      {topRatedTvShows.isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            $bgPhoto={makeImagePath(
              topRatedTvShows.data?.results[0].backdrop_path || ""
            )}
          >
            <Title>{topRatedTvShows.data?.results[0].name}</Title>
            <Overview>{topRatedTvShows.data?.results[0].overview}</Overview>
          </Banner>
          <SlideList>
            {/* TopRated */}
            <SliderComponent
              type="Tv"
              category="Top Rated"
              data={topRatedTvShows.data}
            />
            {/* nowPlay */}
            <SliderComponent
              type="Tv"
              category="Airing Shows"
              data={airingTodayShows.data}
            />
            {/* Upcoming */}
            <SliderComponent
              type="Tv"
              category="Upcoming"
              data={onTheAirTvShows.data}
            />
          </SlideList>
          <AnimatePresence>
            {detailTvMatch ? (
              <ContentDetail
                type="Tv"
                category={detailTvMatch.params.category || ""}
                selectedId={detailTvMatch.params.contentId || ""}
              />
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default Tv;
