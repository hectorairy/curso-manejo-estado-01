import React from "react";
import { Loading } from "./Loading";

export class ClassState extends React.Component {
  constructor() {
    super();
    this.state = {
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
    console.log("Actualizamos el componente ClassState");
    if (this.state.loading) {
      setTimeout(() => {
        console.log("Empezando cambio del estado loading");
        this.setState({ loading: false });
        console.log("Terminando cambio del estado loading");
      }, 3000);
    }
  }

  render() {
    return (
      <div>
        <h1>Eliminar {this.props.name}</h1>
        <p>Por favor, escribe el código de seguridad.</p>

        {this.state.error && <p>Error: el código es incorrecto</p>}

        {this.state.loading && <Loading />}

        <input type="text" placeholder="Código de seguridad" />
        <button onClick={() => this.setState({ loading: true })}>
          Comprobar
        </button>
      </div>
    );
  }
}
