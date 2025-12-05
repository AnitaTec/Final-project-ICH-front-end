export const selectAuthRequest = (store) => {
  return {
    loading: store.auth.loading,
    error: store.auth.error,
    isRegisterSuccess: store.auth.isRegisterSuccess,
  };
};
