import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Like from "./common/like";

class Movie extends Component {
  render() {
    return (
      <React.Fragment>
        <td>{this.props.movie.title}</td>
        <td>{this.props.movie.genre.name}</td>
        <td>{this.props.movie.numberInStock}</td>
        <td>{this.props.movie.dailyRentalRate}</td>
        <td>
          <Like
            liked={this.props.movie.liked}
            onClick={() => this.props.onLike(this.props.movie)}
          />
        </td>
        <td>
          <button
            onClick={() => this.props.onDelete(this.props.movie)}
            className="btn btn-danger btn-sm"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </td>
      </React.Fragment>
    );
  }
}

export default Movie;
