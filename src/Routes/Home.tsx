import { useQuery } from "react-query";
import { IGetMoviesResult } from "../interface";
import { getMovies } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import MovieDetail from "../Components/MovieDetail";

const Wrapper = styled.div`
  background: black;
`;
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
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

const SliderWrapper = styled(motion.div)`
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  top: -100px;
`;
const SlideHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 15px;
  padding-top: 5px;
  width: 100%;
  margin-bottom: auto;
  z-index: 3;
`;

const SlideTitle = styled.h2`
  color: ${(props) => props.theme.white.lighter};
  font-size: 24px;
`;

const Slider = styled(motion.div)`
  display: flex;
  align-items: center;
  width: 100%;
`;
const PaginationIndicator = styled(motion.ul)`
  position: absolute;
  z-index: 3;
  margin-top: 34px;
  top: 0;
  right: 4%;
`;
const Indicator = styled(motion.li)`
  display: inline-block;
  height: 2px;
  width: 16px;
  margin-left: 2px;
  background-color: rgba(128, 128, 128, 0.562);
  &:first-child {
    background-color: rgb(183, 180, 180, 1);
  }
`;

const Arrow = styled(motion.div)`
  width: 50px;
  height: 50px;
  z-index: 1;
  cursor: pointer;
`;
const LeftArrow = styled(Arrow)`
  margin-right: auto;
`;
const RightArrow = styled(Arrow)`
  margin-left: auto;
`;
const ArrowSvg = styled(motion.svg)`
  fill: none;
  stroke: currentColor;
  stroke-width: 2.5;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: black;
  background-size: cover;
  background-position: center center;
  background-image: url(${(props) => props.bgPhoto});
  height: 200px;
  font-size: 66px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;
const rowVariants = {
  hidden: (isSlideBack: boolean) => ({
    x: isSlideBack ? -window.outerWidth : window.outerWidth,
  }),
  visible: () => ({
    x: 0,
  }),
  exit: (isSlideBack: boolean) => ({
    x: isSlideBack ? window.outerWidth : -window.outerWidth,
  }),
};
const BoxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    transition: {
      delay: 0.5,
      duration: 0.2,
      type: "tween",
    },
  },
};

const InfoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.2,
      type: "tween",
    },
  },
};

const SliderVariants = {
  rest: { opacity: 0, ease: "easeOut", duration: 0.2, type: "tween" },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeIn",
    },
  },
};

const offset = 6;

function Home() {
  const navigate = useNavigate();
  const detailMovieMatch = useMatch("/movies/:movieId");
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    () => getMovies()
  );
  const [index, setIndex] = useState(0);
  const [isSlideBack, setSlideBack] = useState(false);

  //prev 동작 후 next 동작시 오류가 생겨 수정.
  const moveSlide = async (isBack: boolean, maxIndex: number) => {
    await setSlideBack(isBack);
    isBack
      ? setIndex((prev) => (prev === 0 ? maxIndex : prev - 1))
      : setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };
  const controlSlideIndex = (isSlide: boolean) => {
    if (data) {
      const totalMovies = data?.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      if (leaving) return;
      toggleLeaving();
      moveSlide(isSlide, maxIndex);
    }
  };
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          {/* Slider */}
          <SliderWrapper>
            <SlideHeader>
              <SlideTitle>Popular</SlideTitle>
              {/* indicator */}
              <PaginationIndicator>
                {data
                  ? data.results
                      .slice(
                        data.results.length -
                          Math.floor(data?.results.length / offset)
                      )
                      .map((_, index) => <Indicator key={index}></Indicator>)
                  : null}
              </PaginationIndicator>
            </SlideHeader>
            <Slider initial="rest" whileHover="hover">
              <LeftArrow
                variants={SliderVariants}
                onClick={() => controlSlideIndex(true)}
              >
                <ArrowSvg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </ArrowSvg>
              </LeftArrow>
              <RightArrow
                variants={SliderVariants}
                onClick={() => controlSlideIndex(false)}
              >
                <ArrowSvg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </ArrowSvg>
              </RightArrow>
              <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                <Row
                  custom={isSlideBack}
                  key={index}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: "tween", duration: 1 }}
                >
                  {data?.results
                    .slice(1)
                    .slice(offset * index, offset * index + offset)
                    .map((movie) => (
                      <Box
                        layoutId={movie.id + ""}
                        key={movie.id}
                        variants={BoxVariants}
                        initial="normal"
                        whileHover="hover"
                        transition={{ type: "tween" }}
                        onClick={() => onBoxClicked(movie.id)}
                        bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                      >
                        <Info variants={InfoVariants}>
                          <h4>{movie.title}</h4>
                        </Info>
                      </Box>
                    ))}
                </Row>
              </AnimatePresence>
            </Slider>
          </SliderWrapper>
          <AnimatePresence>
            {detailMovieMatch ? (
              <MovieDetail selectedId={detailMovieMatch.params.movieId || ""} />
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
