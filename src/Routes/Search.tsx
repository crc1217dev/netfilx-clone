import { getSearchMovies } from "../api/movieApi";
import { IGetContentsResult } from "../interface/interface";
import { useQuery } from "react-query";
import { getSearchTv } from "../api/tvApi";
import styled from "styled-components";
import fixedImg from "../resources/376X200.png";
import { makeImagePath } from "../utils/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";

interface ISearchProps {
  keyword: string;
  category: "Movie" | "Tv";
}
const Container = styled.div`
  position: relative;
  top: 10vh;
  width: 100%;
`;
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const GridList = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  /* overflow: hidden; */
  gap: 3.5vw 4px;
  margin: 0px 4% 10px;
  @media (min-width: 1500px) {
    margin: 10px 60px;
  }
  @media screen and (min-width: 1101px) and (max-width: 1400px) {
    grid-template-columns: repeat(5, 1fr);
    row-gap: 4vw;
  }
  @media screen and (min-width: 801px) and (max-width: 1100px) {
    grid-template-columns: repeat(4, 1fr);
    row-gap: 5vw;
  }
  @media screen and (min-width: 501px) and (max-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
    row-gap: 7vw;
  }
  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 7vw;
  }
`;
const Card = styled(motion.div)<{ $bgPhoto: string }>`
  /* position: relative; */
  width: 100%;
  height: 200px;
  cursor: pointer;
  background-size: cover;
  font-size: 66px;
  background-position: center center;
  background-image: url(${(props) => props.$bgPhoto ?? fixedImg});
`;
const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  position: absolute;
  width: 100%;
  bottom: 0;
  opacity: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;
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

function Search() {
  const location = useLocation();
  const { keyword, category }: ISearchProps = location.state;
  console.log(category, keyword);
  const searchItems = useQuery<IGetContentsResult>([category, "search"], () =>
    category === "Movie"
      ? getSearchMovies("en-US", keyword ?? "")
      : getSearchTv("en-US", keyword ?? "")
  );
  console.log(searchItems, category, keyword);
  return (
    <Container>
      {searchItems.isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <AnimatePresence>
          <GridList>
            {searchItems.data?.results.map((item) => (
              <Card
                variants={BoxVariants}
                initial="normal"
                whileHover="hover"
                transition={{ type: "tween" }}
                key={item.id}
                layoutId={item.id + ""}
                $bgPhoto={makeImagePath(
                  item.backdrop_path ?? item.poster_path ?? "",
                  "w500"
                )}
              >
                <Info variants={InfoVariants}>
                  <h4>{category === "Movie" ? item.title : item.name}</h4>
                </Info>
              </Card>
            ))}
          </GridList>
        </AnimatePresence>
      )}
    </Container>
  );
}

export default Search;
