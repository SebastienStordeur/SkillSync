import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthSliceState = {
  isAuthenticated: boolean;
  user: {
    id: string | null;
    displayableName: string | null;
  };
};

interface LoginInterface {
  token: string;
}

const initialState: AuthSliceState = {
  isAuthenticated: false,
  user: {
    id: null,
    displayableName: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginInterface>) {
      const payload = action.payload;
      localStorage.setItem("token", payload.token);
      state.isAuthenticated = true;
    },
    logout(state) {
      localStorage.removeItem("token");
      return (state = initialState);
    },
    getProfile() {},
    retriveStoredToken(state) {
      state.isAuthenticated = true;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
