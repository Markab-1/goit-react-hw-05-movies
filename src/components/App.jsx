import React, { lazy, Suspense } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
//import HomePage from './views/HomePage';
//import MoviesPage from './views/MoviesPage';
//import MovieDetailsPage from './views/MovieDetailsPage';
//import NotFoundViews from './views/NotFoundViews';
import Container from './Container/Container';
import s from './styleApp.module.css';
import Loader from './Loader/Loader';

const HomePage = lazy(() => import('./views/HomePage'));
const MoviesPage = lazy(() => import('./views/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./views/MovieDetailsPage'));
const NotFoundViews = lazy(() => import('./views/NotFoundViews'));

export const App = () => {
  return (
    <Container>
      <ul className={s.list}>
        <li className={s.item}>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/movies">Movies</NavLink>
        </li>
      </ul>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route element={<NotFoundViews />} />
        </Routes>
      </Suspense>
    </Container>
  );
};
