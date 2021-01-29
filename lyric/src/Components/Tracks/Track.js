import React, { Component } from "react";
import Spinner from "../Layout/Spinner";
import { Consumer } from "../../Context/Context";
import EachTrack from "./EachTrack";
export default class Track extends Component {
  render() {
    return (
      <Consumer>
        {(value) => {
          // console.log(value);
          // return <h1>Tracks</h1>;
          const { track_list, heading } = value;
          if (track_list === undefined || track_list.length === 0) {
            return <Spinner />;
          } else {
            return (
              <>
                <h3 className="text-center mb-4">{heading}</h3>
                <div className="row">
                  {track_list.map((item, index) => {
                    return <EachTrack track={item.track} key={index} />;
                  })}
                </div>
              </>
            );
          }
        }}
      </Consumer>
    );
  }
}
