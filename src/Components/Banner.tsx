import styled from "styled-components";
import { makeImagePath } from "../utils/utils";
import { IContent } from "../interface";

const Wrapper = styled.div<{ $bgPhoto: string }>`
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

interface IBannerProps {
  contentData: IContent;
}
function Banner({ contentData }: IBannerProps) {
  return (
    <Wrapper
      $bgPhoto={makeImagePath(
        (contentData.backdrop_path ?? contentData.poster_path) || ""
      )}
    >
      <Title>{contentData.title}</Title>
      <Overview>{contentData.overview}</Overview>
    </Wrapper>
  );
}

export default Banner;
