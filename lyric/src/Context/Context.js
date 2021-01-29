import React, { Component } from "react";
import axios from "axios";
const Context = React.createContext();
const API_KEY = "a0cbda6f9949242d5a6761e237c1a6c3";

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_TRACKS":
      return {
        ...state,
        track_list: action.payload,
        heading: "Search Results",
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    track_list: [
      // {
      //   track: {
      //     track_name: "imagine",
      //   },
      //   track: {
      //     track_name: "King",
      //   },
      // },
    ],
    heading: "Top 10 Tracks in USA",
    dispatch: (action) => this.setState((state) => reducer(state, action)),
  };

  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${API_KEY}`
      )
      .then((response) => {
        console.log(response.data.message.body);
        this.setState({ track_list: response.data.message.body.track_list });
      })
      .catch((error) => console.log(error));
  }
  render() {
    return (
      <Context.Provider value={this.state}>
        {" "}
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
