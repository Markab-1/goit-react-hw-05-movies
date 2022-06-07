import React, { Component } from 'react';
import Notiflix from 'notiflix';
import { Link } from 'react-router-dom';

import fetchAllMovies from 'services/api';
import Searchbar from '../Searchbar/Searchbar';
import s from './style.module.css';

class MoviesPage extends Component {
  state = {
    movieName: '',
    movies: [],
    status: '',
    showBtn: false,
    pageNumber: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.movieName;
    const nextName = this.state.movieName;

    if (prevName !== nextName) {
      this.setState(
        {
          movies: [],
          status: 'pending',
          showBtn: false,
        },
        () => {
          this.fetchRequest();
        }
      );
    }
  }

  fetchRequest = () => {
    const { pageNumber, movieName } = this.state;

    const getStr = 'search/movie';
    const searchStr =
      '&language=en-US&video=true&query=' + movieName + '&page=' + pageNumber;
    fetchAllMovies(getStr, searchStr)
      .then(data => {
        this.setState({
          movies: [...this.state.movies, ...data.results],
          status: 'resolved',
        });
        if (data.results.length === 0) {
          Notiflix.Notify.failure(
            'Sorry, I can not find movies that match your search.'
          );
          return;
        }
        if (data.results.length > 0) {
          this.setState({ showBtn: true });
        }
      })
      .catch(error => this.setState({ error, status: 'rejected' }));

    this.setState(prevState => ({
      pageNumber: prevState.pageNumber + 1,
    }));
  };

  handleFormSubmit = movieName => {
    this.setState({ movieName });
  };

  render() {
    const { movies } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ul className={s.gallery}>
          {movies.map((movie, index) => (
            <li key={movie.id}>
              <Link to={`${movie.id}`}> {movie.original_title}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default MoviesPage;
