import styled from "styled-components";
import SliderComponent from "../Components/SliderComponent";
import { IGetContentsResult } from "../interface/interface";
import { useQuery } from "react-query";
import {
  getAiringTodayTvShows,
  getOnTheAirTvShows,
  getTopRatedTvShows,
} from "../api/tvApi";
import { AnimatePresence } from "framer-motion";
import { useMatch } from "react-router-dom";
import ContentDetail from "../Components/ContentDetail";
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
          <Banner contentData={topRatedTvShows.data?.results[0]!} />
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
