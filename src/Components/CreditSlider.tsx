import { motion } from "framer-motion";
import styled from "styled-components";
import { getMovieCredits } from "../api/movieApi";
import { getTvCredits } from "../api/tvApi";
import { useQuery } from "react-query";
import { IContentCredits } from "../interface/interface";
import { makeImagePath } from "../utils/utils";

interface ICreditProps {
  selectedId: string;
  type: "Movie" | "Tv";
}

const Slider = styled(motion.div)`
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  list-style: none;
  min-height: 320px;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    height: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(151, 151, 151, 0.8); /* 스크롤바의 색상 */
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(44, 44, 44, 1); /*스크롤바 뒷 배경 색상*/
  }
`;

const ListItem = styled.li`
  min-width: 210px;
  background-color: rgb(64, 64, 64);
  border-radius: 15px;
  margin: 10px 4px 10px 10px;
  border: 1px solid rgba(35, 35, 35, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Cover = styled.div<{ $bgPhoto: string }>`
  height: 200px;
  width: 100%;
  background-size: cover;
  background-image: url(${(props) => props.$bgPhoto});
  background-position: center center;
  border-radius: 15px;
`;
const TextDiv = styled.div`
  margin-top: 4px;
  display: flex;
  flex-direction: column;
  padding-left: 8px;
`;
const Name = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: rgb(255, 255, 255);
`;
const Character = styled.span`
  margin-top: 2px;
  font-size: 16px;
  color: rgb(255, 255, 255);
`;

function CreditSlider({ selectedId, type }: ICreditProps) {
  const credits = useQuery<IContentCredits>(["content", "credits"], () =>
    type === "Movie"
      ? getMovieCredits("en-US", selectedId)
      : getTvCredits("en-US", selectedId)
  );
  return (
    <Slider>
      {credits.data?.cast.map((item) => (
        <ListItem key={item.cast_id}>
          <Cover
            $bgPhoto={makeImagePath(item.profile_path ?? "", "w500")}
          ></Cover>
          <TextDiv>
            <Name>{item.name}</Name>
            <Character>{item.character}</Character>
          </TextDiv>
        </ListItem>
      ))}
    </Slider>
  );
}

export default CreditSlider;
