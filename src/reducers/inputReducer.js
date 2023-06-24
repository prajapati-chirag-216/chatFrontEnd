export const nameReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid: action.val.trim().length > 2 && action.val.trim().length < 8,
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isValid: state.value.trim().length > 2 && state.value.trim().length < 8,
    };
  }
  return { value: "", isValid: null };
};

export const roomReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid: action.val.trim().length > 3 && action.val.trim().length < 10,
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isValid: state.value.trim().length > 3 && state.value.trim().length < 10,
    };
  }
  return { value: "", isValid: null };
};
