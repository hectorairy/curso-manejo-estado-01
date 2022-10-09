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

  const onConfirm = () => {
    setState({
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    });
  };

  const onError = () => {
    setState({
      ...state,
      error: true,
      loading: false,
    });
  };

  const onWrite = (newValue) => {
    setState({ ...state, value: newValue });
  };

  const onCheck = () => {
    setState({ ...state, loading: true });
  };

  const onDelete = () => {
    setState({ ...state, deleted: true });
  };

  const onReset = () => {
    setState({
      ...state,
      confirmed: false,
      deleted: false,
      value: "",
    });
  };

  React.useEffect(() => {
    if (loading) {
      // setError(false);
      setTimeout(() => {
        if (value === SECURITY_CODE) {
          onConfirm();
          // setError(false);
          // setLoading(false);
        } else {
          onError();
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
            onWrite(e.target.value);
          }}
        />
        <button
          onClick={() => {
            // setError(false);
            onCheck();
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
        <button onClick={() => onDelete()}>Si, vamos a continuar</button>
        <button onClick={() => onReset()}>No, ya me arrepentí</button>
      </>
    );
  } else {
    return (
      <>
        <p>Ya borramos {name} :( </p>
        <button onClick={() => onReset()}>Restaurar estado</button>
      </>
    );
  }
};
