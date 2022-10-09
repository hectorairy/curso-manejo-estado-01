import React from "react";

const SECURITY_CODE = "paradigma";

export const UseReducer = ({ name }) => {
  // const [value, setValue] = React.useState("");
  // const [error, setError] = React.useState(false);
  // const [loading, setLoading] = React.useState(false);
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const { value, error, loading, confirmed, deleted } = state;

  React.useEffect(() => {
    if (loading) {
      // setError(false);
      setTimeout(() => {
        if (value === SECURITY_CODE) {
          dispatch({ type: actionTypes.confirm });
          // setError(false);
          // setLoading(false);
        } else {
          dispatch({ type: actionTypes.error });
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
            dispatch({ type: actionTypes.write, payload: e.target.value });
          }}
        />
        <button
          onClick={() => {
            // setError(false);
            dispatch({ type: actionTypes.check });
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
        <button onClick={() => dispatch({ type: actionTypes.delete })}>
          Si, vamos a continuar
        </button>
        <button onClick={() => dispatch({ type: actionTypes.reset })}>
          No, ya me arrepentí
        </button>
      </>
    );
  } else {
    return (
      <>
        <p>Ya borramos {name} :( </p>
        <button onClick={() => dispatch({ type: actionTypes.reset })}>
          Restaurar estado
        </button>
      </>
    );
  }
};

const initialState = {
  value: "",
  error: false,
  loading: false,
  confirmed: false,
  deleted: false,
};

// const reducerIfs = (state, action) => {
//   if (action.type === "CONFIRM") {
//     return {
//       ...state,
//       error: false,
//       loading: false,
//       confirmed: true,
//     };
//   } else if (action.type === "ERROR") {
//     return {
//       ...state,
//       error: true,
//       loading: false,
//     };
//   } else {
//     return {
//       ...state,
//     };
//   }
// };

// const reducerSwitch = (state, action) => {
//   switch (action.type) {
//     case "CONFIRM":
//       return {
//         ...state,
//         error: false,
//         loading: false,
//         confirmed: true,
//       };
//     case "ERROR":
//       return {
//         ...state,
//         error: true,
//         loading: false,
//       };

//     default:
//       return {
//         ...state,
//       };
//   }
// };

const actionTypes = {
  confirm: "CONFIRM",
  error: "ERROR",
  write: "WRITE",
  check: "CHECK",
  delete: "DELETE",
  reset: "RESET",
};

const reducer = (state, action) => {
  const types = {
    [actionTypes.confirm]: {
      error: false,
      loading: false,
      confirmed: true,
    },
    [actionTypes.error]: {
      error: true,
      loading: false,
    },
    [actionTypes.write]: {
      value: action.payload,
    },
    [actionTypes.check]: {
      loading: true,
    },
    [actionTypes.delete]: {
      deleted: true,
    },
    [actionTypes.reset]: {
      confirmed: false,
      deleted: false,
      value: "",
    },
  };
  if (!types[action.type]) {
    return {
      ...state,
    };
  }

  return {
    ...state,
    ...types[action.type],
  };
};
