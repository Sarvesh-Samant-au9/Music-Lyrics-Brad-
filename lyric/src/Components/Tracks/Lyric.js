import React, { Component } from "react";
import axios from "axios";
import Spinner from "../Layout/Spinner";

import { Link } from "react-router-dom";
const API_KEY = "a0cbda6f9949242d5a6761e237c1a6c3";
export default class Lyric extends Component {
  state = {
    track: {},
    lyrics: {},
  };

  // track.lyrics.get?track_id=15953433
  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${API_KEY}`
      )
      .then((res) => {
        // console.log(res.data.message.body.lyrics);
        this.setState({ lyrics: res.data.message.body.lyrics });
        return axios
          .get(
            `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${API_KEY}`
          )
          .then((trackResult) => {
            // console.log(trackResult.data.message.body);
            this.setState({ track: trackResult.data.message.body.track });
          });
      });
  }

  render() {
    // console.log(this.props);
    console.log(this.state);
    const { track, lyrics } = this.state;
    if (
      track === undefined ||
      lyrics === undefined ||
      Object.keys(track).length === 0 ||
      Object.keys(lyrics).length === 0
    ) {
      return <Spinner />;
    } else {
      return (
        <>
          <Link to="/" className="btn btn-outline-danger btn-sm mb-4">
            Return To Main Page
          </Link>
          <div className="card">
            <h5 className="card-header">
              {track.track_name} by{" "}
              <span className="text-secondary">{track.artist_name}</span>
            </h5>
            <div className="card-body">
              <p className="card-text">{lyrics.lyrics_body}</p>
            </div>
          </div>
          <ul className="list-group mt-3">
            <li className="list-group-item">
              <strong>Album ID:</strong> {track.album_id}
            </li>
            <li className="list-group-item">
              <strong>Song Genre</strong>
              {track.primary_genres.music_genre_list[0]
                ? track.primary_genres.music_genre_list[0].music_genre
                    .music_genre_name
                : " Not Available"}
            </li>
            <li className="list-group-item">
              <strong> Explicit Words?? </strong>
              {track.explicit === 0 ? "Not  Present" : "Yes"}
            </li>
            <li className="list-group-item">
              <strong>Rating: </strong>
              {track.track_rating}
            </li>
            <li className="list-group-item">
              <a
                className="btn btn-outline-success"
                target="_blank"
                rel="noopener noreferrer"
                href={track.track_share_url}
              >
                <strong>Get Full Song at MusixMatch </strong>
              </a>
            </li>
          </ul>
        </>
      );
    }
  }
}
