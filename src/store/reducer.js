//INITIAL STATE
const INITIAL_STATE = {};

//ACTION CONSTANTS
// const DEFAULT = 'DEFAULT';

//ACTION CREATORS
// export const defaultCreator = () => ({ type: DEFAULT });

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case DEFAULT:
    //   return { ...state};
    default:
      return state;
  }
};

export default reducer;
