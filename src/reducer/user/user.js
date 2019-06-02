const initialState = {
  isAuthorizationRequired: false,
};


const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
};


const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload,
      });
  }

  return state;
};

const Operation = {
  checkAuth: () => {
    return (dispatch, _getState, api) => {
      return api
        .get(`/login`)
        .then((res) => {
          if (res.status === 200) {
            dispatch(ActionCreator.requireAuthorization(false));
          }
        });
    };
  }
};


export {
  ActionCreator,
  ActionType,
  reducer,
  Operation,
};
