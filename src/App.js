import React, { Component } from "react";
import Eos from "eosjs";
import NavBar from "./components/navbar";
import Counters from "./components/counters";
import "./App.css";
import { checkServer } from "./utils/index.js";

class App extends Component {
  state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 }
    ]
  };

  componentDidMount() {
    if (!checkServer()) {
      if (window.scatter) this.onScatterLoad();
      else document.addEventListener(`scatterLoaded`, this.onScatterLoad);
    }
  }

  componentWillUnmount() {
    if (!checkServer()) {
      document.removeEventListener(`scatterLoaded`, this.onScatterLoad);
    }
  }

  onScatterLoad = () => {
    const scatter = window.scatter;
    window.scatter = null;
    // this.props.scatterLoadedAction(scatter);
    const network = {
      blockchain: "eos",
      host: "0.0.0.0",
      port: 7777
    };
    const eosOptions = {};

    const eos = scatter.eos(network, Eos.Localnet, eosOptions);
    scatter
      .getIdentity()
      .then(identity => {
        console.log(identity);
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleIncrement = counter => {
    let counters = [...this.state.counters];
    let index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value++;
    this.setState({ counters });
  };

  handleReset = () => {
    const counters = this.state.counters.map(c => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };

  handleDelete = counterId => {
    const counters = this.state.counters.filter(c => c.id !== counterId);
    this.setState({ counters });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar
          totalCounters={this.state.counters.filter(c => c.value > 0).length}
        />
        <main className="container">
          <Counters
            counters={this.state.counters}
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            onDelete={this.handleDelete}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
