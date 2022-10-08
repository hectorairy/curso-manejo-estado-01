import React from "react";

export const UseState = ({ name }) => {
  const [error] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    console.log("Empezando el useEffect");
    if (loading) {
      setTimeout(() => {
        console.log("Empezando cambio del estado loading");
        setLoading(false);
        console.log("Terminando cambio del estado loading");
      }, 3000);
    }
    console.log("Terminando el useEffect");
  }, [loading]);

  return (
    <div>
      <h1>Eliminar {name}</h1>
      <p>Por favor, escribe el código de seguridad.</p>

      {error && <p>Error: el código es incorrecto</p>}

      {loading && <p>Cargando...</p>}

      <input type="text" placeholder="Código de seguridad" />
      <button onClick={() => setLoading(true)}>Comprobar</button>
    </div>
  );
};
