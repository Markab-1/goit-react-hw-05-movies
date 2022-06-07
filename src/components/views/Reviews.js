import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import fetchAllMovies from 'services/api';
import s from './style.module.css';

const Reviews = () => {
  const [movieData, setMovieData] = useState([]);
  const { movieId } = useParams();
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);

  const getStr = 'movie/' + movieId + '/reviews';

  console.log('movieData=', movieData);
  useEffect(() => {
    fetchAllMovies(getStr, '')
      .then(data => {
        setMovieData(data.results);
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
      {status === 'resolved' && movieData.length > 0 && (
        <div>
          <ul className={s.reviewsList}>
            {movieData.map(item => (
              <li className={s.reviewsItem} key={item.id}>
                <span className={s.reviewsAuthorTitle}>Author:</span>
                <span className={s.reviewsAuthor}> {item.author}</span>
                <div>
                  <span className={s.reviewsTitle}>Review:</span>
                  <p>{item.content}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {movieData.length === 0 && <div>There is no reviews</div>}
    </div>
  );
};

export default Reviews;
