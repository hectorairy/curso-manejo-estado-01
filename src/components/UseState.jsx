import React from "react";

const SECURITY_CODE = "paradigma";

export const UseState = ({ name }) => {
  // const [value, setValue] = React.useState("");
  // const [error, setError] = React.useState(false);
  // const [loading, setLoading] = React.useState(false);
  const [state, setState] = React.useState({
    value: "",
    error: false,
    loading: false,
    confirmed: false,
    deleted: false,
  });

  const { value, error, loading, confirmed, deleted } = state;

  console.log(value);

  React.useEffect(() => {
    if (loading) {
      // setError(false);
      setTimeout(() => {
        if (value === SECURITY_CODE) {
          setState({
            ...state,
            error: false,
            loading: false,
            confirmed: true,
          });
          // setError(false);
          // setLoading(false);
        } else {
          setState({
            ...state,
            error: true,
            loading: false,
          });
          // setError(true);
          // setLoading(false);
        }
      }, 3000);
    }
  }, [loading]);

  if (!confirmed && !deleted) {
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
            setState({ ...state, value: e.target.value });
          }}
        />
        <button
          onClick={() => {
            // setError(false);
            setState({ ...state, loading: true });
          }}
        >
          Comprobar
        </button>
      </div>
    );
  } else if (confirmed && !deleted) {
    return (
      <>
        <p>Vamos a eliminar {name}, ¿Estás seguro de continuar?</p>
        <button
          onClick={() =>
            setState({
              ...state,
              deleted: true,
            })
          }
        >
          Si, vamos a continuar
        </button>
        <button
          onClick={() =>
            setState({
              ...state,
              confirmed: false,
              value: "",
            })
          }
        >
          No, ya me arrepentí
        </button>
      </>
    );
  } else {
    return (
      <>
        <p>Ya borramos {name} :( </p>
        <button
          onClick={() =>
            setState({
              ...state,
              confirmed: false,
              deleted: false,
              value: "",
            })
          }
        >
          Restaurar estado
        </button>
      </>
    );
  }
};
