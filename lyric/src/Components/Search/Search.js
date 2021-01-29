import React, { Component } from "react";
import axios from "axios";
import { Consumer } from "../../Context/Context";

const API_KEY = "a0cbda6f9949242d5a6761e237c1a6c3";

export default class Search extends Component {
  state = {
    trackTitle: "",
  };

  changeHandler = (e) => {
    this.setState({ trackTitle: e.target.value });
  };
  formSubmitHandler = (dispatch, e) => {
    e.preventDefault();

    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${API_KEY}`
      )
      .then((response) => {
        console.log(response);
        dispatch({
          type: "SEARCH_TRACKS",
          payload: response.data.message.body.track_list,
        });
        // this.setState({ trackTitle: "" });
      });
  };

  render() {
    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card card-bod mb-4 p-4">
              <h1 className="display-4 text-center">
                <i className="fas fa-music"></i>
                Search A Song
              </h1>
              <p className="lead text-center">Get The Lyrics For Any Song</p>
              <form onSubmit={this.formSubmitHandler.bind(this, dispatch)}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter Song Title Here"
                    value={this.state.trackTitle}
                    // onChange={this.changeHandler.bind(Search)}
                    onChange={this.changeHandler}
                  />
                </div>
                <button
                  className="btn btn-outline-info btn-lg btn-block mb-5"
                  type="submit"
                >
                  Get Track Lyrics
                </button>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
