import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import Movie from "./movie";

class Movies extends Component {
  state = {
    movies: getMovies(),
  };

  handleDelete = (movie) => {
    deleteMovie(movie._id);
    this.setState({ movies: getMovies() });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  renderTable() {
    const { length: count } = this.state.movies;
    if (count === 0) return <p> There are no movies in the database </p>;

    return (
      <React.Fragment>
        Showing {this.state.movies.length} movies in the database.
        <table className="table">
          <thead>
            <tr>
              <th> Title</th>
              <th> Genre</th>
              <th> Stock</th>
              <th> Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => (
              <tr key={movie._id}>
                <Movie
                  key={movie._id}
                  movie={movie}
                  onDelete={this.handleDelete}
                  onLike={this.handleLike}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }

  render() {
    return <div>{this.renderTable()}</div>;
  }
}

export default Movies;
