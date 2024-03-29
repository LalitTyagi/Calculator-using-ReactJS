import React, { Component } from "react";
import ReactDOM from "react-dom";

import Button from "./button.js";

import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: "0",
      previous: [],
      nextIsReset: false
    };
  }
  reset = () => {
    this.setState({ current: "0", previous: [], nextIsReset: false });
  };
  addToCurrent = symbol => {
    console.log("addToCurrent");
    if (["/", "-", "+", "*"].indexOf(symbol) > -1) {
      let { previous } = this.state; //let previous = this.state.previous;
      // console.log("previous", previous);
      previous.push(this.state.current + symbol);
      this.setState({ previous, nextIsReset: true }); //this.setState({previous:previous})
    } else {
      if (
        (this.state.current === "0" && symbol !== ".") ||
        this.state.nextIsReset
      ) {
        this.setState({ current: symbol, nextIsReset: false });
      } else {
        this.setState({ current: this.state.current + symbol });
      }
    }
  };
  calculate = symbol => {
    let { current, previous, nextIsReset } = this.state;
    if (previous.length > 0) {
      current = eval(String(previous[previous.length - 1] + current));
      this.setState({ current, previous: [], nextIsReset: true });
    }
  };
  render() {
    const button = [
      { symbol: "C", cols: 3, action: this.reset },
      { symbol: "/", cols: 1, action: this.addToCurrent },
      { symbol: "7", cols: 1, action: this.addToCurrent },
      { symbol: "8", cols: 1, action: this.addToCurrent },
      { symbol: "9", cols: 1, action: this.addToCurrent },
      { symbol: "*", cols: 1, action: this.addToCurrent },
      { symbol: "4", cols: 1, action: this.addToCurrent },
      { symbol: "5", cols: 1, action: this.addToCurrent },
      { symbol: "6", cols: 1, action: this.addToCurrent },
      { symbol: "-", cols: 1, action: this.addToCurrent },
      { symbol: "1", cols: 1, action: this.addToCurrent },
      { symbol: "2", cols: 1, action: this.addToCurrent },
      { symbol: "3", cols: 1, action: this.addToCurrent },
      { symbol: "+", cols: 1, action: this.addToCurrent },
      { symbol: "0", cols: 2, action: this.addToCurrent },
      { symbol: ".", cols: 1, action: this.addToCurrent },
      { symbol: "=", cols: 1, action: this.calculate }
    ];
    return (
      <div className="App">
        {this.state.previous.length > 0 ? (
          <div className="floaty-last">
            {this.state.previous[this.state.previous.length - 1]}
          </div>
        ) : null}
        <input className="result" type="text" value={this.state.current} />
        {button.map((btn, i) => {
          return (
            <Button
              key={i}
              symbol={btn.symbol}
              cols={btn.cols}
              action={symbol => btn.action(symbol)} //this prop action is a function that takes in the symbol and passes the symbol over to the buttons action function
            />
          );
        })}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
