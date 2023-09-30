import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import SliderComponent from "../Components/SliderComponent";
import { getSearchMovies } from "../api/movieApi";
import { getSearchTv } from "../api/tvApi";
import { IGetContentsResult } from "../interface/interface";
import { useQuery } from "react-query";

function Search() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("keyword") ?? "";
  const prevPath = searchParams.get("prevPath");
  console.log(searchParams.get("keyword"), searchParams.get("prevPath"));
  const searchItems = useQuery<IGetContentsResult>(["Movie", "search"], () =>
    getSearchMovies("en-US", query ?? "")
  );
  return <></>;
}

export default Search;
