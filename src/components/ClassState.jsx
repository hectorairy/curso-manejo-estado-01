import React from "react";
import { Loading } from "./Loading";

const SECURITY_CODE = "paradigma";
export class ClassState extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
      error: false,
      loading: false,
    };
  }

  //   componentDidMount() {
  //     console.log("componentDidMount");
  //   }

  //   UNSAFE_componentWillMount() {
  //     console.log("componentWillMount");
  //   }

  componentDidUpdate() {
    if (this.state.loading) {
      setTimeout(() => {
        if (this.state.value === SECURITY_CODE) {
          this.setState({ loading: false, error: false });
        } else {
          this.setState({ loading: false, error: true });
        }
      }, 3000);
    }
  }

  render() {
    return (
      <div>
        <h1>Eliminar {this.props.name}</h1>
        <p>Por favor, escribe el código de seguridad.</p>

        {!this.state.loading && this.state.error && (
          <p>Error: el código es incorrecto</p>
        )}

        {this.state.loading && <Loading />}

        <input
          type="text"
          placeholder="Código de seguridad"
          value={this.state.value}
          onChange={(e) => this.setState({ value: e.target.value })}
        />
        <button onClick={() => this.setState({ loading: true })}>
          Comprobar
        </button>
      </div>
    );
  }
}
