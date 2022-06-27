import React, { useRef } from "react";
import { CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Movies, Actors, MovieInformation, Navbar, Profile } from "./index";
import useAlan from "./Alan";
import useStyles from "./styles";
const App = () => {
  const classes = useStyles();
  const AlanBtnContainer = useRef();
  useAlan();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routes>
          <Route exact path="/" element={<Movies />}></Route>
          <Route exact path="/movie/:id" element={<MovieInformation />}></Route>
          <Route exact path="/actors/:id" element={<Actors />}></Route>
          <Route exact path="/profile/:id" element={<Profile />}></Route>
        </Routes>
      </main>
      <div ref={AlanBtnContainer} />
    </div>
  );
};

export default App;
