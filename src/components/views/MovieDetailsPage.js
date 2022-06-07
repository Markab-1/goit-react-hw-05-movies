import { useEffect, useState } from 'react';
import { useParams, Route, Routes, NavLink } from 'react-router-dom';
import Notiflix from 'notiflix';

import Cast from './Cast';
import Reviews from './Reviews';
import fetchAllMovies from 'services/api';
import s from './style.module.css';

const MovieDetailsPage = () => {
  const [movieData, setMovieData] = useState({});
  const [posterPath, setPosterPath] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);

  let { movieId } = useParams();

  const getStr = 'movie/' + movieId;

  useEffect(() => {
    fetchAllMovies(getStr, '')
      .then(data => {
        setMovieData(data);
        setStatus('resolved');
        setPosterPath('https://image.tmdb.org/t/p/original' + data.poster_path);
        if (data.length === 0) {
          Notiflix.Notify.failure('Sorry, something wrong happened.');
          return;
        }
      })
      .catch(error => {
        setStatus('rejected');
        setError(error);
      });
  }, [getStr]);

  if (status === 'rejected') {
    return <h1>{error.message}</h1>;
  }

  return (
    <div>
      {status === 'resolved' && (
        <div>
          <div className={s.movieDescription}>
            <img
              className={s.img}
              src={posterPath}
              alt={movieData.original_title}
              width="200"
            />
            <div>
              <h1 className={s.title}>
                {movieData.original_title} (
                {movieData.release_date.split('-', 1)})
              </h1>
              <span className={s.score}>
                User score: {movieData.vote_average}
              </span>
              <h3 className={s.subtitle}>Overview</h3>
              <p className={s.overview}>{movieData.overview}</p>
              <h3 className={s.subtitle}>Genres</h3>
              <p className={s.overview}>
                {movieData.genres.map(genre => (
                  <span className={s.genres}>{genre.name}</span>
                ))}
              </p>
            </div>
          </div>
          <div className={s.movieAdditional}>
            <ul className={s.movieAdditionalList}>
              <li>
                <NavLink to="cast">Cast</NavLink>
              </li>
              <li>
                <NavLink to="reviews">Reviews</NavLink>
              </li>
            </ul>
            <Routes>
              <Route path="cast" element={<Cast />} />
              <Route path="reviews" element={<Reviews />} />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
