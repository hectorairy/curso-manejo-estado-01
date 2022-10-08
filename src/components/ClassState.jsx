import React from "react";

export class ClassState extends React.Component {
  render() {
    return (
      <div>
        <h1>Eliminar {this.props.name}</h1>
      </div>
    );
  }
}
