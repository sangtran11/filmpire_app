import { useEffect, useContext } from "react";
import { ColorModeContext } from "../utils/ToggleColorMode";
import { fetchToken } from "../utils";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  selectGenreOrCategory,
  searchMovie,
} from "../features/currentGenreOrCategory";
import alanBtn from "@alan-ai/alan-sdk-web";

const useAlan = () => {
  const { setMode } = useContext(ColorModeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    alanBtn({
      key: "7b77cbd56545a9bbbed7e0da8abc67f42e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: ({ command, mode, genreOrCategory, genres, query }) => {
        if (command === "chooseGenre") {
          const foundGenre = genres.find(
            (genre) =>
              genre.name.toLowerCase() === genreOrCategory.toLowerCase()
          );
          if (foundGenre) {
            navigate("/");
            dispatch(selectGenreOrCategory(foundGenre.id));
          } else {
            const category = genreOrCategory.startsWith("top")
              ? "top_rated"
              : genreOrCategory;
            navigate("/");
            dispatch(selectGenreOrCategory(category));
          }
        } else if (command === "changeMode") {
          if (mode === "light") {
            setMode("light");
          } else {
            setMode("dark");
          }
        } else if (command === "search") {
          dispatch(searchMovie(query));
        } else if (command === "login") {
          fetchToken();
        } else if (command === "logout") {
          localStorage.clear();
          navigate("/");
        }
      },
    });
  }, []);
};

export default useAlan;
