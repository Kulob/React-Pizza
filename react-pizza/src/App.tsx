import React from "react";
import Loadable from 'react-loadable';
import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import "./scss/app.scss";
import MainLayout from "./layouts/MainLayout";

// const Card = React.lazy(() => import(/*webpackChunkName: 'Card'*/'./pages/Card'))
const Card = Loadable({
  loader: () => import(/*webpackChunkName: 'Card'*/'./pages/Card'),
  loading: () =>  <div>Идёт загрузка корзины...</div>,
});

const FullPizza = React.lazy(() => import(/*webpackChunkName: 'FullPizza'*/'./pages/FullPizza'))

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="Card" element={
          <React.Suspense fallback={<div>Идёт загрузка корзины...</div>}>
            <Card/>
            </React.Suspense>
        } />
        <Route path="pizza/:id" element={
          <React.Suspense fallback={<div>Идёт загрузка...</div>}>
          <FullPizza/>
          </React.Suspense>
        } />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
