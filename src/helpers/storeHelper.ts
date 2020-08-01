export interface Action<Type> {
  type: Type;
  payload: any;
}

interface Handler<S, T> {
  (state: S, action: Action<T>): S;
}

type HandlerList<S, H> = {
  [Key in keyof H]: Handler<S, Key>;
}

interface ChangeState {
  <S, T>(stateKey: keyof S): Handler<S, T>;
}

interface ReducerFactory {
  <S, H>(initialState: S, handlers: HandlerList<S, H>): Handler<S, keyof H>;
}

export const changeState: ChangeState = stateKey => {
  return (state, action) => ({
    ...state,
    [stateKey]: action.payload,
  });
};

export const reducerFactory: ReducerFactory = (initialState, handlers) => {
  return (state = initialState, action) => {
    const handler = handlers[action.type];

    if (handler) {
      return handler(state, action);
    }

    return state;
  };
};
