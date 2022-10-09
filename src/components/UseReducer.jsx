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
          dispatch({ type: "COMFIRM" });
          // setError(false);
          // setLoading(false);
        } else {
          dispatch({ type: "ERROR" });
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
            dispatch({ type: "WRITE", payload: e.target.value });
          }}
        />
        <button
          onClick={() => {
            // setError(false);
            dispatch({ type: "CHECK" });
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
        <button onClick={() => dispatch({ type: "DELETE" })}>
          Si, vamos a continuar
        </button>
        <button onClick={() => dispatch({ type: "RESET" })}>
          No, ya me arrepentí
        </button>
      </>
    );
  } else {
    return (
      <>
        <p>Ya borramos {name} :( </p>
        <button onClick={() => dispatch({ type: "RESET" })}>
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

const reducer = (state, action) => {
  const types = {
    CONFIRM: {
      error: false,
      loading: false,
      confirmed: true,
    },
    ERROR: {
      error: true,
      loading: false,
    },
    WRITE: {
      value: action.payload,
    },
    CHECK: {
      loading: true,
    },
    DELETE: {
      deleted: true,
    },
    RESET: {
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
