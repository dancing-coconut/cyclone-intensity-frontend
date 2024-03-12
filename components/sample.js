import React from "react";
import ReactDOM from "react-dom";
import { AnimatePresence } from "framer-motion";
import styled from "styled-components";
import Branding from "./branding";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  Link,
  useLocation
} from "react-router-dom";
import { MyRow, MyCol } from "../app/page";

import "./styles.css";

const A = styled(Link)`
  font-size: 25px;
  background-color: rgb(68, 109, 246);
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
`;

const Page1 = () => (
  <MyRow>
    <MyCol>Page1</MyCol>
    <MyCol>Page1</MyCol>
    <MyCol>Page1</MyCol>
    <MyCol>Page1</MyCol>
    <MyCol>Page1</MyCol>
    <MyCol>Page1</MyCol>
    <MyCol>Page1</MyCol>
    <MyCol>
      <br />
      <A to="/page2">to page 2</A>
    </MyCol>
  </MyRow>
);

const Page2 = () => (
  <MyRow>
    <MyCol>Page2</MyCol>
    <MyCol>Page2</MyCol>
    <MyCol>Page2</MyCol>
    <MyCol>Page2</MyCol>
    <MyCol>Page2</MyCol>
    <MyCol>Page2</MyCol>

    <MyCol>
      {" "}
      <br />
      <A to="/page1">to page 1</A>
    </MyCol>
  </MyRow>
);

const App = () => {
  const location = useLocation();
  return (
    <div>
      <AnimatePresence mode="wait" initial={false}>
        <Switch location={location} key={location.pathname}>
          <Route path="/page1">
            <Page1 />
          </Route>
          <Route path="/page2">
            <Page2 />
          </Route>
          <Redirect exact from="/" to="/page1" />
        </Switch>
      </AnimatePresence>
      <Branding />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
);
