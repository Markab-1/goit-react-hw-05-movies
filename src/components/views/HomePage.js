import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import s from './style.module.css';
import fetchAllMovies from 'services/api';

class HomePage extends Component {
  state = {
    movies: [],
    status: '',
    error: null,
  };

  componentDidMount() {
    fetchAllMovies('movie/popular', '')
      .then(data => {
        this.setState({
          movies: data.results,
          status: 'resolved',
        });
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  }

  render() {
    const { status, error } = this.state;
    if (status === 'rejected') {
      return <h1>{error.message}</h1>;
    }
    return (
      <div className={s.container}>
        <h2 className={s.homeTitle}>Popular movies</h2>
        <ul className={s.list}>
          {this.state.movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.original_title}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default HomePage;
