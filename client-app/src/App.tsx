import React from "react";
import "./App.css";
import axios from "axios";
import { List } from "semantic-ui-react";

class App extends React.Component {
  state = {
    values: [],
  };

  componentDidMount() {
    axios.get("http://localhost:5000/value").then((resp) => {
      this.setState({
        values: resp.data,
      });
    });
  }

  render() {
    return (
      <>
        <List>
          {this.state.values.map((value: any) => (
            <List.Item key={value.id}>{value.name}</List.Item>
          ))}
        </List>
      </>
    );
  }
}

export default App;
