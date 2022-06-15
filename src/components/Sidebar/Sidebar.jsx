import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/styles";
import { useGetGenresQuery } from "../../services/TMDB";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import { useDispatch, useSelector } from "react-redux";
import genresIcons from "../../assets/genres";

import useStyles from "./styles";

const blueLogo =
  "https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png";
const redLogo =
  "https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png";

const categories = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
];

const Sidebar = ({ setMobileOpen }) => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { genreIdOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const { data, isFetching } = useGetGenresQuery();
  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          alt="filmpire"
          src={theme.palette.mode === "light" ? redLogo : blueLogo}
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItem
              button
              onClick={() => {
                dispatch(selectGenreOrCategory(value));
              }}
            >
              <ListItemIcon>
                <img
                  src={genresIcons[label.toLowerCase()]}
                  className={classes.genreImages}
                  height={30}
                  alt={label}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          data.genres.map(({ name, id }) => (
            <Link key={id} className={classes.links} to="/">
              <ListItem
                onClick={() => {
                  dispatch(selectGenreOrCategory(id));
                }}
                button
              >
                <ListItemIcon>
                  <img
                    src={genresIcons[name.toLowerCase()]}
                    className={classes.genreImages}
                    height={30}
                    alt={name}
                  />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </Link>
          ))
        )}
      </List>
    </>
  );
};

export default Sidebar;
