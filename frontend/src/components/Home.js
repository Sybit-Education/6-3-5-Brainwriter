import React, { Component } from "react";
import { Button, Grommet } from 'grommet';
import CreateRoundModerator from "./CreateRoundModerator";
import JoinRound from "./JoinRound";

export class Home extends Component {
  state = {
    page: ""
  };

  switchPage = event => {
    this.setState({
      page: event.target.value
    });
  };

  renderPage(page) {
    switch (page) {
      case "1":
        return <CreateRoundModerator />;
      case "2":
        return <JoinRound />;
      default:
        return (
          <Grommet>
            <Button color="brand" label="Schnelle Runde erstellen" value="1" onClick={this.switchPage} />
            <br />
            <Button label="Runde beitreten" value="2" onClick={this.switchPage} />
            <br />
          </Grommet>
        );
    }
  }

  render() {
    const { page } = this.state;
    return this.renderPage(page);
  }
}

export default Home;