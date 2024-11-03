import React, { Component } from "react";
import "../App.css";
import USAMap from "./react-usa-map/src/index";
import ProgressBar from "./ProgressBar";
import SplitElectoralVotes from "./SplitElectoralVotes";
import HistoricalMaps from "../data/historical-maps";

class Controller extends Component {
  constructor(props) {
    super(props);

    this.state = {
      demPercentage: "",
      blankPercentage: 100,
      repPercentage: "",
      partyFocus: "",
      demVotes: 0,
      repVotes: 0,
      blueStates: {}, // object that will state abbrev's and votes and k-v pairs to use when counting votes
      redStates: {}, // same as above
      states: {
        AL: {
          color: "",
          votes: 9
        },
        AK: {
          color: "",
          votes: 3
        },
        AZ: {
          color: "",
          votes: 11
        },
        AR: {
          color: "",
          votes: 6
        },
        CA: {
          color: "",
          votes: 55
        },
        CO: {
          color: "",
          votes: 9
        },
        CT: {
          color: "",
          votes: 7
        },
        DC: {
          color: "",
          votes: 3
        },
        DE: {
          color: "",
          votes: 3
        },
        FL: {
          color: "",
          votes: 29
        },
        GA: {
          color: "",
          votes: 16
        },
        HI: {
          color: "",
          votes: 4
        },
        ID: {
          color: "",
          votes: 4
        },
        IL: {
          color: "",
          votes: 20
        },
        IN: {
          color: "",
          votes: 11
        },
        IA: {
          color: "",
          votes: 6
        },
        KS: {
          color: "",
          votes: 6
        },
        KY: {
          color: "",
          votes: 8
        },
        LA: {
          color: "",
          votes: 8
        },
        ME: {
          color: "",
          votes: 4
        },
        ME1: {
          color: "",
          votes: 2
        },
        ME2: {
          color: "",
          votes: 1
        },
        ME3: {
          color: "",
          votes: 1
        },
        MD: {
          color: "",
          votes: 10
        },
        MA: {
          color: "",
          votes: 11
        },
        MI: {
          color: "",
          votes: 16
        },
        MN: {
          color: "",
          votes: 10
        },
        MS: {
          color: "",
          votes: 6
        },
        MO: {
          color: "",
          votes: 10
        },
        MT: {
          color: "",
          votes: 3
        },
        NE: {
          color: "",
          votes: 5
        },
        NE1: {
          color: "",
          votes: 2
        },
        NE2: {
          color: "",
          votes: 1
        },
        NE3: {
          color: "",
          votes: 1
        },
        NE4: {
          color: "",
          votes: 1
        },
        NV: {
          color: "",
          votes: 6
        },
        NH: {
          color: "",
          votes: 4
        },
        NJ: {
          color: "",
          votes: 14
        },
        NM: {
          color: "",
          votes: 5
        },
        NY: {
          color: "",
          votes: 29
        },
        NC: {
          color: "",
          votes: 15
        },
        ND: {
          color: "",
          votes: 3
        },
        OH: {
          color: "",
          votes: 18
        },
        OK: {
          color: "",
          votes: 7
        },
        OR: {
          color: "",
          votes: 7
        },
        PA: {
          color: "",
          votes: 20
        },
        RI: {
          color: "",
          votes: 4
        },
        SC: {
          color: "",
          votes: 9
        },
        SD: {
          color: "",
          votes: 3
        },
        TN: {
          color: "",
          votes: 11
        },
        TX: {
          color: "",
          votes: 38
        },
        UT: {
          color: "",
          votes: 6
        },
        VT: {
          color: "",
          votes: 3
        },
        VA: {
          color: "",
          votes: 13
        },
        WA: {
          color: "",
          votes: 12
        },
        WV: {
          color: "",
          votes: 5
        },
        WI: {
          color: "",
          votes: 10
        },
        WY: {
          color: "",
          votes: 3
        }
      }
    };
  }

  partyToggle = event => {
    this.setState({
      partyFocus: event.target.value
    });
  };

  /* figure out what color we are changing the respective targetState to
  and update that targetState's color in the component state 
  --> Also update the blueStates or redStates object to faciliate future 
  counting operations in other functions
  */

  stateToggle = targetState => {
    const { partyFocus, blueStates, redStates } = this.state; // save typing later
    const { color, votes } = this.state.states[targetState];
    let newColor = ""; // new color to be changed to upon click event

    // blank --> red
    if ((color === "#D3D3D3" || color === "") && partyFocus === "republican") {
      newColor = "red";
      redStates[targetState] = votes; // add to redStates object
    }
    // blank --> blue
    else if (
      (color === "#D3D3D3" || color === "") &&
      partyFocus === "democrat"
    ) {
      newColor = "blue";
      blueStates[targetState] = votes;
    }

    // blue --> red
    else if (color === "blue" && partyFocus === "republican") {
      newColor = "red";
      delete blueStates[targetState]; // remove from blueStates object
      redStates[targetState] = votes; // add to redStates object
    }
    // red --> blue
    else if (color === "red" && partyFocus === "democrat") {
      newColor = "blue";
      delete redStates[targetState];
      blueStates[targetState] = votes;
    }

    // red --> blank
    else if (color === "red" && partyFocus === "republican") {
      newColor = "#D3D3D3";
      delete redStates[targetState];
    }
    // blue --> blank
    else if (color === "blue" && partyFocus === "democrat") {
      newColor = "#D3D3D3";
      delete blueStates[targetState];
    }

    // generate arrays with only vote totals for each state
    const blueVoteArray = Object.values(blueStates);
    const redVoteArray = Object.values(redStates);

    // copy entire current state object (states) so that I can alter the copy
    const updatedStates = Object.assign({}, this.state.states);

    // alter copy based upon changes made in this method
    updatedStates[targetState].color = newColor;

    this.setState(
      {
        states: updatedStates,
        blueStates: blueStates,
        redStates: redStates
      },
      () => {
        console.log(`newColor: ${newColor}`);
        /* if one was clicked, update the display of ME and NE so that their 
        colors can be udpated based upon split district votes  */
        if (
          targetState.substr(0, 2) === "ME" ||
          targetState.substr(0, 2) === "NE"
        ) {
          this.updateSplitElectoralStatesDisplay(targetState);
        }
        // update vote count by summing the two vote arrays
        this.updateVoteCount(blueVoteArray, redVoteArray);
      }
    );
  };

  updateDisplayFromHistorical = event => {
    const year = event.target.value;
    const historicalResult = HistoricalMaps[year];

    // make copy in order to alter
    const updatedStates = Object.assign({}, this.state.states);

    // these should be empty to start since will be updating all states
    const blueStates = {};
    const redStates = {};

    /* change display colors for each state based on historical object
    also update blueState and redState objects in thep process  */
    for (let state in updatedStates) {
      updatedStates[state].color = historicalResult[state];
      if (updatedStates[state].color === "red") {
        redStates[state] = updatedStates[state].votes;
      } else if (updatedStates[state].color === "blue") {
        blueStates[state] = updatedStates[state].votes;
      }
    }

    const blueVoteArray = Object.values(blueStates);
    const redVoteArray = Object.values(redStates);

    this.setState(
      {
        states: updatedStates,
        blueStates: blueStates,
        redStates: redStates
      },
      () => {
        // update color display for electoral split states
        this.updateSplitElectoralStatesDisplay();

        this.updateVoteCount(blueVoteArray, redVoteArray);
      }
    );
  };

  updateVoteCount = (blueVoteArray, redVoteArray) => {
    let blueVoteSum = 0;
    let redVoteSum = 0;

    // sum the votes
    if (blueVoteArray.length > 0) {
      blueVoteSum = blueVoteArray.reduce((sum, votes) => {
        return sum + votes;
      });
    }

    if (redVoteArray.length > 0) {
      redVoteSum = redVoteArray.reduce((sum, votes) => {
        return sum + votes;
      });
    }

    this.setState(
      {
        demVotes: blueVoteSum,
        repVotes: redVoteSum
      },
      () => {
        // console.log(redStates);
        // console.log(blueStates);
        this.updateProgressBar();
      }
    );
  };

  // This method updates BOTH the display color of both ME and NE
  updateSplitElectoralStatesDisplay = () => {
    /* Maine Update Logic
     ************************/
    const maineVotes = [
      this.state.states.ME1.color,
      this.state.states.ME1.color,
      this.state.states.ME2.color,
      this.state.states.ME3.color
    ];
    let maineRedSum = maineVotes.filter(color => color === "red").length;
    let maineBlueSum = maineVotes.filter(color => color === "blue").length;
    let newMaineColor = "";

    // blank
    if (maineRedSum === 0 && maineBlueSum === 0) {
      newMaineColor = "#d3d3d3";
    }
    // blue is up by 1, 2, or 3 (almost blue)
    else if (
      maineBlueSum - maineRedSum >= 1 &&
      maineBlueSum - maineRedSum <= 3
    ) {
      newMaineColor = "lightblue";
    }
    // blue is up 4 (all blue)
    else if (maineBlueSum - maineRedSum > 3) {
      newMaineColor = "blue";
    }
    // perfect-tie (@ 1 or 2 votes each)
    else if (maineRedSum === maineBlueSum) {
      newMaineColor = "violet";
    }
    // red is up 1, 2 or 3 (almost red)
    else if (
      maineRedSum - maineBlueSum >= 1 &&
      maineRedSum - maineBlueSum <= 3
    ) {
      newMaineColor = "lightcoral";
    }
    // red is up 4 (all red)
    else if (maineRedSum - maineBlueSum > 3) {
      newMaineColor = "red";
    }

    /* Nebraska Update Logic
     ***************************/
    const nebraskaVotes = [
      this.state.states.NE1.color,
      this.state.states.NE1.color,
      this.state.states.NE2.color,
      this.state.states.NE3.color,
      this.state.states.NE4.color
    ];
    let nebraskaRedSum = nebraskaVotes.filter(color => color === "red").length;
    let nebraskaBlueSum = nebraskaVotes.filter(color => color === "blue")
      .length;
    let newNebraskaColor = "";

    // all votes blank
    if (nebraskaRedSum === 0 && nebraskaBlueSum === 0) {
      newNebraskaColor = "#d3d3d3";
    }
    // blue is up by 1, 2, 3 or 4 (almost blue)
    else if (
      nebraskaBlueSum - nebraskaRedSum >= 1 &&
      nebraskaBlueSum - nebraskaRedSum <= 4
    ) {
      newNebraskaColor = "lightblue";
    }
    // blue is up by 5 (all blue)
    else if (nebraskaBlueSum - nebraskaRedSum > 4) {
      newNebraskaColor = "blue";
    }
    // perfect-tie (@ 2 votes each)
    else if (nebraskaRedSum === nebraskaBlueSum) {
      newNebraskaColor = "violet";
    }
    // red is up 1, 2, 3 or 4 (almost red)
    else if (
      nebraskaRedSum - nebraskaBlueSum >= 1 &&
      nebraskaRedSum - nebraskaBlueSum <= 4
    ) {
      newNebraskaColor = "lightcoral";
    }

    // red is up 5 (all red)
    else if (nebraskaRedSum - nebraskaBlueSum > 4) {
      newNebraskaColor = "red";
    }

    // copy entire current state so that I can alter the copy
    const updatedStates = Object.assign({}, this.state.states);

    updatedStates.ME.color = newMaineColor;
    updatedStates.NE.color = newNebraskaColor;
    this.setState({
      states: updatedStates
    });
  };

  /* Update progress bar by using vote counts to generate percentage 
  for width of progress bar element
  */
  updateProgressBar = () => {
    const demPercentage = (this.state.demVotes / 538) * 100;
    const repPercentage = (this.state.repVotes / 538) * 100;
    const blankPercentage =
      ((538 - this.state.demVotes - this.state.repVotes) / 538) * 100;

    this.setState({
      demPercentage: demPercentage,
      blankPercentage: blankPercentage,
      repPercentage: repPercentage
    });
  };

  /* mandatory */
  mapHandler = event => {
    // send in abbreviation from either normal state or the two split electoral ones (NE or ME)
    this.stateToggle(event.target.dataset.name || event.target.value);
  };

  statesCustomConfig = () => {
    return {
      AL: {
        fill: this.state.states.AL.color
      },
      AK: {
        fill: this.state.states.AK.color
      },
      AZ: {
        fill: this.state.states.AZ.color
      },
      AR: {
        fill: this.state.states.AR.color
      },
      CA: {
        fill: this.state.states.CA.color
      },
      CO: {
        fill: this.state.states.CO.color
      },
      CT: {
        fill: this.state.states.CT.color
      },
      DC2: {
        fill: this.state.states.DC.color
      },
      DE: {
        fill: this.state.states.DE.color
      },
      FL: {
        fill: this.state.states.FL.color
      },
      GA: {
        fill: this.state.states.GA.color
      },
      HI: {
        fill: this.state.states.HI.color
      },
      ID: {
        fill: this.state.states.ID.color
      },
      IL: {
        fill: this.state.states.IL.color
      },
      IN: {
        fill: this.state.states.IN.color
      },
      IA: {
        fill: this.state.states.IA.color
      },
      KS: {
        fill: this.state.states.KS.color
      },
      KY: {
        fill: this.state.states.KY.color
      },
      LA: {
        fill: this.state.states.LA.color
      },
      ME: {
        fill: this.state.states.ME.color,
        clickHandler: event =>
          alert(
            "Maine is not a winner-take-all state. See 'Split Electoral Votes' below."
          )
      },
      MD: {
        fill: this.state.states.MD.color
      },
      MA: {
        fill: this.state.states.MA.color
      },
      MI: {
        fill: this.state.states.MI.color
      },
      MN: {
        fill: this.state.states.MN.color
      },
      MS: {
        fill: this.state.states.MS.color
      },
      MO: {
        fill: this.state.states.MO.color
      },
      MT: {
        fill: this.state.states.MT.color
      },
      NE: {
        fill: this.state.states.NE.color,
        clickHandler: event =>
          alert(
            "Nebraska is not a winner-take-all state. See 'Split Electoral Votes' below."
          )
      },
      NV: {
        fill: this.state.states.NV.color
      },
      NH: {
        fill: this.state.states.NH.color
      },
      NJ: {
        fill: this.state.states.NJ.color
      },
      NM: {
        fill: this.state.states.NM.color
      },
      NY: {
        fill: this.state.states.NY.color
      },
      NC: {
        fill: this.state.states.NC.color
      },
      ND: {
        fill: this.state.states.ND.color
      },
      OH: {
        fill: this.state.states.OH.color
      },
      OK: {
        fill: this.state.states.OK.color
      },
      OR: {
        fill: this.state.states.OR.color
      },
      PA: {
        fill: this.state.states.PA.color
      },
      RI: {
        fill: this.state.states.RI.color
      },
      SC: {
        fill: this.state.states.SC.color
      },
      SD: {
        fill: this.state.states.SD.color
      },
      TN: {
        fill: this.state.states.TN.color
      },
      TX: {
        fill: this.state.states.TX.color
      },
      UT: {
        fill: this.state.states.UT.color
      },
      VT: {
        fill: this.state.states.VT.color
      },
      VA: {
        fill: this.state.states.VA.color
      },
      WA: {
        fill: this.state.states.WA.color
      },
      WV: {
        fill: this.state.states.WV.color
      },
      WI: {
        fill: this.state.states.WI.color
      },
      WY: {
        fill: this.state.states.WY.color
      }
    };
  };

  render() {
    return (
      <>
        <div className="body">
          <div className="jumbotron">
            <h1>Electoral College Map</h1>
            <p className="page-header">270 Votes are Necessary to Win</p>
          </div>
          <div className="content">
            <ProgressBar
              demPercentage={this.state.demPercentage}
              blankPercentage={this.state.blankPercentage}
              repPercentage={this.state.repPercentage}
              demVotes={this.state.demVotes}
              repVotes={this.state.repVotes}
              blankVotes={538 - this.state.demVotes - this.state.repVotes}
            />
            <div className="toggle-btns">
              <button
                onClick={this.partyToggle}
                value="democrat"
                className="btn btn-primary dem-btn"
              >
                {this.state.partyFocus === "democrat"
                  ? "Selected"
                  : "Select Blue States"}
              </button>

              {this.state.demVotes >= 270 && (
                <span className="winner-text" style={{ color: "blue" }}>
                  Democrats Win!
                </span>
              )}

              {this.state.repVotes >= 270 && (
                <span className="winner-text" style={{ color: "red" }}>
                  Republicans Win!
                </span>
              )}

              <button
                onClick={this.partyToggle}
                value="republican"
                className="btn btn-primary rep-btn"
              >
                {this.state.partyFocus === "republican"
                  ? "Selected"
                  : "Select Red States"}
              </button>
            </div>
            <USAMap
              title="United States of America"
              customize={this.statesCustomConfig()}
              onClick={this.mapHandler}
            />
            <div>
              <div className="dropdown">
                <h5>Select a Starting View:</h5>
                <select
                  className="select"
                  defaultValue={this.state.dropdownOption}
                  onChange={this.updateDisplayFromHistorical}
                >
                  <option value="2000">Reset Map</option>
                  <option value="2012">2012 Actual</option>
                  <option value="2016">2016 Actual</option>
                </select>
              </div>

              <SplitElectoralVotes
                onClick={this.mapHandler}
                ME1={this.state.states.ME1.color}
                ME2={this.state.states.ME2.color}
                ME3={this.state.states.ME3.color}
                NE1={this.state.states.NE1.color}
                NE2={this.state.states.NE2.color}
                NE3={this.state.states.NE3.color}
                NE4={this.state.states.NE4.color}
              />
            </div>
            <br /> <br />
            <hr />
          </div>
        </div>
      </>
    );
  }
}

export default Controller;
