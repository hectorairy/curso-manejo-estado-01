import React from "react";

const SECURITY_CODE = "paradigma";

export const UseState = ({ name }) => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  console.log(value);

  React.useEffect(() => {
    if (loading) {
      // setError(false);
      setTimeout(() => {
        if (value === SECURITY_CODE) {
          setError(false);
          setLoading(false);
        } else {
          setError(true);
          setLoading(false);
        }
      }, 3000);
    }
  }, [loading]);

  return (
    <div>
      <h1>Eliminar {name}</h1>
      <p>Por favor, escribe el código de seguridad.</p>

      {!loading && error && <p>Error: el código es incorrecto</p>}

      {loading && <p>Cargando...</p>}

      <input
        type="text"
        placeholder="Código de seguridad"
        value={value}
        onChange={(e) => {
          // setError(false);
          setValue(e.target.value);
        }}
      />
      <button
        onClick={() => {
          // setError(false);
          setLoading(true);
        }}
      >
        Comprobar
      </button>
    </div>
  );
};
