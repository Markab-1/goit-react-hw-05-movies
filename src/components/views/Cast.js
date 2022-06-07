import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import fetchAllMovies from 'services/api';
import s from './style.module.css';

const Cast = () => {
  const [movieData, setMovieData] = useState({});
  const { movieId } = useParams();
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);

  const getStr = 'movie/' + movieId + '/credits';

  useEffect(() => {
    fetchAllMovies(getStr, '')
      .then(data => {
        setMovieData(data);
        setStatus('resolved');
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
          <ul className={s.castList}>
            {movieData.cast.map(item => (
              <li className={s.castItem} key={item.id}>
                <div>
                  {item.profile_path && (
                    <img
                      className={s.castImg}
                      src={
                        'https://image.tmdb.org/t/p/original' +
                        item.profile_path
                      }
                      alt={item.name}
                    />
                  )}
                  {!item.profile_path && (
                    <img
                      className={s.castImg}
                      src={require('../../no-pictures.jpg')}
                      alt={item.name}
                    />
                  )}
                  <h2>{item.name}</h2>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Cast;
