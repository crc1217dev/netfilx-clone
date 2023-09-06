import { useQuery } from "react-query";
import { IContentDetail, IContentTrailer } from "../interface/interface";
import { getMovieDetail, getMovieTrailers } from "../api/movieApi";
import styled from "styled-components";
import { motion } from "framer-motion";
import { makeImagePath } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { getTvDetail, getTvTrailers } from "../api/tvApi";
import CreditSlider from "./CreditSlider";

interface IContentDetailProps {
  selectedId: string;
  category: string;
  type: "Movie" | "Tv";
}

const Detail = styled(motion.div)`
  position: fixed;
  min-width: 850px;
  width: 70vw;
  height: 90vh;
  top: 50px;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
  box-shadow: rgba(0, 0, 0, 0.5) 0px 2px 8px;
  z-index: 2;
`;
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 2;
`;

const Cover = styled(motion.div)<{ $bgPhoto: string }>`
  position: relative;
  width: 100%;
  height: 400px;
  background-size: cover;
  background-image: url(${(props) => props.$bgPhoto});
  background-position: center center;
`;

const Title = styled.h3`
  font-size: 32px;
  font-weight: 500;
  color: ${(props) => props.theme.white.lighter};
  margin-bottom: 12px;
`;

const Contents = styled.div`
  width: 100%;
  height: fit-content;
  position: relative;
  display: grid;
  column-gap: 1em;
  grid-template-columns: 1.4fr 0.6fr;
  grid-template-rows: 1fr;
  padding-top: 6px;
`;
const LeftContents = styled.div`
  height: fit-content;
  padding: 6px;
  padding-left: 8px;
`;
const RightContents = styled.div`
  height: fit-content;
  padding: 6px;
`;

//w 1320; h 320;
const BottomContents = styled.div`
  width: 100%;
`;

const OverView = styled.div`
  color: ${(props) => props.theme.white.lighter};
  margin-bottom: 6px;
`;
const ContentTitle = styled.span`
  color: rgba(147, 147, 147, 0.954);
`;
const VoteStarBase = styled.div`
  z-index: 0;
  padding: 0;
`;
const VoteStar = styled(motion.div)`
  font-size: 2rem;
  color: #aaa9a9;
  position: relative;
  unicode-bidi: bidi-override;
  width: max-content;
  -webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 1.3px;
  -webkit-text-stroke-color: #2b2a29;
`;
const VoteStarFilling = styled(motion.div)<{ $score: number }>`
  color: #fff58c;
  padding: 0;
  position: absolute;
  z-index: 1;
  display: flex;
  top: 0;
  left: 0;
  overflow: hidden;
  width: ${(props) => props.$score + "%"};
  -webkit-text-fill-color: gold;
`;
function ContentDetail({ selectedId, category, type }: IContentDetailProps) {
  const navigate = useNavigate();

  const onOverlayClick = () =>
    type === "Movie" ? navigate("/") : navigate("/tv");
  const { data } = useQuery<IContentDetail>(["contents", "detail"], () =>
    type === "Movie"
      ? getMovieDetail("en-US", selectedId)
      : getTvDetail("en-US", selectedId)
  );
  const trailerResult = useQuery<IContentTrailer>(["content", "trailer"], () =>
    type === "Movie"
      ? getMovieTrailers("en-US", selectedId)
      : getTvTrailers("en-US", selectedId)
  );
  const trailer = trailerResult.data?.results.find(
    (trailer) =>
      trailer.type === "Trailer" &&
      (trailer.name === "Official Trailer" || trailer.name.includes("Trailer"))
  );
  return (
    <>
      <Overlay
        onClick={onOverlayClick}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <Detail layoutId={selectedId + category}>
        {data && (
          <>
            <Cover
              $bgPhoto={makeImagePath(
                data.backdrop_path ?? data.poster_path ?? "",
                "w500"
              )}
            >
              {trailer ? (
                <iframe
                  id="player"
                  title="youtbePlayer"
                  width="100%"
                  height="400"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                ></iframe>
              ) : null}
            </Cover>
            <Contents>
              <LeftContents>
                <Title>{type === "Movie" ? data.title : data.name}</Title>
                <OverView>{data.overview}</OverView>
              </LeftContents>
              <RightContents>
                <OverView>
                  <ContentTitle>
                    {type === "Movie" ? "Release date: " : "First air Date: "}
                  </ContentTitle>
                  {type === "Movie" ? data.release_date : data.first_air_date}
                </OverView>
                <OverView>
                  {type === "Movie" ? (
                    <>
                      <ContentTitle>Runtime: </ContentTitle>
                      {Math.floor(data.runtime / 60)} hours {data.runtime % 60}{" "}
                      min
                    </>
                  ) : (
                    <>
                      <ContentTitle>Tagline: </ContentTitle>
                      {data.tagline}
                    </>
                  )}
                </OverView>
                <OverView>
                  <ContentTitle>Genre: </ContentTitle>
                  {data.genres.map((genre, index) => {
                    return index === data.genres.length - 1
                      ? genre.name
                      : genre.name + ", ";
                  })}
                </OverView>
                <OverView>
                  <ContentTitle>status: </ContentTitle>
                  {data.status}
                </OverView>
                <OverView>
                  <ContentTitle>vote count: </ContentTitle>
                  {data.vote_count}
                </OverView>
                <OverView>
                  <ContentTitle>vote average: </ContentTitle>
                  {data.vote_average >= 0 ? (
                    <>
                      {Math.floor(data.vote_average * 10) + "%"}
                      <VoteStar
                      // initial={{ opacity: 0 }}
                      // animate={{ opacity: 1 }}
                      >
                        <VoteStarFilling
                          initial={{
                            opacity: 0,
                            color: "rgba(0,0,0, 0)",
                          }}
                          animate={{
                            opacity: 1,
                            color: "rgb(255, 244, 127)",
                          }}
                          transition={{ duration: 1.5 }}
                          $score={data.vote_average * 10 + 1.5}
                        >
                          <span>★</span>
                          <span>★</span>
                          <span>★</span>
                          <span>★</span>
                          <span>★</span>
                        </VoteStarFilling>
                        <VoteStarBase>
                          <span>★</span>
                          <span>★</span>
                          <span>★</span>
                          <span>★</span>
                          <span>★</span>
                        </VoteStarBase>
                      </VoteStar>
                    </>
                  ) : (
                    0
                  )}
                </OverView>
              </RightContents>
            </Contents>
            <BottomContents>
              <CreditSlider selectedId={selectedId} type={type} />
            </BottomContents>
          </>
        )}
      </Detail>
    </>
  );
}

export default ContentDetail;
