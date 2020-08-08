import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      rates: {},
    };
  }

  componentDidMount() {
    fetch("https://api.exchangeratesapi.io/latest?base=IDR")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            rates: result.rates,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  createTable = () => {
    const rates = this.state;

    let nilaiTukar = Object.keys(rates).map((i) => rates[i])[2];
    let children = [];
    let tabel = [];

    let displayedCurrencies = ["RUB", "CAD", "USD", "CHF", "JPY", "EUR"];

    for (var key in nilaiTukar) {
      if (nilaiTukar.hasOwnProperty(key) && displayedCurrencies.includes(key)) {
        children.push(
          <tr>
            <td>{key}</td>
            <td>{this.prettyCurrency(nilaiTukar[key], "beli")}</td>
            <td>{this.prettyCurrency(nilaiTukar[key])}</td>
            <td>{this.prettyCurrency(nilaiTukar[key], "jual")}</td>
          </tr>
        );
      }
    }
    tabel.push(<tbody>{children}</tbody>);

    return tabel;
  };

  prettyCurrency = (crr, action) => {
    if (action === "beli") {
      crr = (crr * 102) / 100;
    } else if (action === "jual") {
      crr = (crr * 98) / 100;
    } else {
      // Do nothing...
    }
    var fixedCrr = crr.toFixed(4).toString();
    while (fixedCrr.length < 8) {
      fixedCrr = "0" + fixedCrr;
    }

    return fixedCrr;
  };

  render() {
    const { error, isLoaded } = this.state;

    if (error) {
      return <div>Oops: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <main>
          <div className="App-body">
            <table className="tabel">
              <thead>
                <tr>
                  <th>&nbsp;</th>
                  <th>WE BUY</th>
                  <th>EXCHANGE RATE</th>
                  <th>WE SELL</th>
                </tr>
              </thead>
              {this.createTable()}
            </table>
            <p>
              * base currency is GBP
              <br />* As for the API,&nbsp;
              <a href="https://exchangeratesapi.io/">
                https://exchangeratesapi.io/
              </a>
              &nbsp;is used.
            </p>
          </div>
        </main>
      );
    }
  }
}

export default App;
