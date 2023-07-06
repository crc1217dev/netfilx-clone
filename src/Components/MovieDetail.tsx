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
  font-size: 28px;
  top: -40px;
  position: relative;
  color: ${(props) => props.theme.white.lighter};
`;
const DetailText = styled.p`
  position: relative;
  color: ${(props) => props.theme.white.lighter};
`;

const Contents = styled.div`
  top: -30px;
  width: 100%;
  height: 100%;
  position: relative;
  display: grid;
  column-gap: 2em;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
`;
const LeftContents = styled.div``;
const RightContents = styled.div``;
const OverView = styled(DetailText)`
  background-color: ${(props) => props.theme.black.lighter};
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
            <Title>{data.title}</Title>
            <Contents>
              <LeftContents>
                <OverView>{data.overview}</OverView>
              </LeftContents>
              <RightContents>
                <OverView>{data.overview}</OverView>
              </RightContents>
            </Contents>
          </>
        )}
      </Detail>
    </>
  );
}

export default MovieDetail;
