import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./Components/Header";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/tv" element={<Tv />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="movies/:category/:movieId" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
