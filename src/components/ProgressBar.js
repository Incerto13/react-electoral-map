import React, { Component } from "react";
import "./ProgressBar.css";
import marker from "./270-marker.png";

class ProgressBar extends Component {
  render() {
    // console.log(`demPercentage: ${this.props.demPercentage}`);
    // console.log(`blankPercentage: ${this.props.blankPercentage}`);
    // console.log(`repPercentage: ${this.props.repPercentage}`);
    return (
      <div>
        <div className="progress-bar-labels">
          <div className="dem-label">
            Democrat &nbsp;&nbsp;{" "}
            <span className="num-label">{this.props.demVotes} </span>
          </div>
          <div className="rep-label">
            {" "}
            <span className="num-label">{this.props.repVotes}</span>{" "}
            &nbsp;&nbsp; Republican{" "}
          </div>

          <div className="marker">
            <img alt="270-marker" src={marker} />
          </div>
        </div>

        <div className="progress-bar">
          <DemFiller demPercentage={this.props.demPercentage} />
          <BlankFiller
            blankPercentage={this.props.blankPercentage}
            blankVotes={this.props.blankVotes}
          />
          <RepFiller repPercentage={this.props.repPercentage} />
        </div>
      </div>
    );
  }
}

const DemFiller = props => {
  return (
    <div className="dem-filler " style={{ width: `${props.demPercentage}%` }} />
  );
};

const BlankFiller = props => {
  return (
    <div
      className="blank-filler"
      style={{ width: `${props.blankPercentage}%` }}
    >
      {props.blankVotes >= 10 ? props.blankVotes : ""}
    </div>
  );
};

const RepFiller = props => {
  return (
    <div className="rep-filler" style={{ width: `${props.repPercentage}%` }} />
  );
};

export default ProgressBar;
