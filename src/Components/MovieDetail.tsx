import { useQuery } from "react-query";
import { IMovieDetail } from "../interface";
import { getMovieDetail } from "../api";
import styled from "styled-components";
import { motion } from "framer-motion";
import { makeImagePath } from "../utils";
import { useNavigate } from "react-router-dom";

interface IMovieDetailProps {
  selectedId: string;
}

const Detail = styled(motion.div)`
  position: fixed;
  min-width: 850px;
  width: 70vw;
  height: 90vh;
  top: 40px;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const Cover = styled(motion.div)<{ bgPhoto: string }>`
  position: relative;
  width: 100%;
  height: 400px;
  background-size: cover;
  background-image: url(${(props) => props.bgPhoto});
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
  height: 100%;
  position: relative;
  display: grid;
  column-gap: 2em;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
`;
const LeftContents = styled.div`
  padding: 12px;
`;
const RightContents = styled.div`
  padding: 12px;
`;

const OverView = styled.div`
  color: ${(props) => props.theme.white.lighter};
  margin-bottom: 4px;
`;
const ContentTitle = styled.span`
  color: rgba(147, 147, 147, 0.954);
`;

function MovieDetail({ selectedId }: IMovieDetailProps) {
  const navigate = useNavigate();

  const onOverlayClick = () => navigate(-1);
  const { data } = useQuery<IMovieDetail>(["movies", "detail"], () =>
    getMovieDetail("en-US", selectedId)
  );
  console.log(data);
  return (
    <>
      <Overlay
        onClick={onOverlayClick}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <Detail layoutId={selectedId}>
        {data && (
          <>
            <Cover bgPhoto={makeImagePath(data.backdrop_path, "w500")} />
            <Contents>
              <LeftContents>
                <Title>{data.title}</Title>
                <OverView>{data.overview}</OverView>
              </LeftContents>
              <RightContents>
                <OverView>
                  <ContentTitle>Release date: </ContentTitle>
                  {data.release_date}
                </OverView>
                <OverView>
                  <ContentTitle>Runtime: </ContentTitle>
                  {`${Math.floor(data.runtime / 60)} hours ${
                    data.runtime % 60
                  } min `}
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
              </RightContents>
            </Contents>
          </>
        )}
      </Detail>
    </>
  );
}

export default MovieDetail;
