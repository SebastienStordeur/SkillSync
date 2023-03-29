import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthSliceState = {
  isAuthenticated: boolean;
  user: {
    id: string | null;
    displayableName: string | null;
    applications: string[];
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
    applications: [],
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Login reducer used after a successful Login request
     * Store the token and set the global isAuthenticated State to true
     * @param state
     * @param action
     */

    login(state, action: PayloadAction<LoginInterface>) {
      const payload = action.payload;
      localStorage.setItem("token", payload.token);
      state.isAuthenticated = true;
    },
    logout(state) {
      localStorage.removeItem("token");
      return (state = initialState);
    },

    /**
     * Get the current user informations and fill the global state user
     * @param state
     * @param action
     */

    getProfile(state, action) {
      const payload = action.payload.currentUser;
      state.user.id = payload.id;
      state.user.displayableName = payload.email;
      state.user.applications = payload.applications;
      //payload = id, displayable name || company, is_company, applications
    },
    retriveStoredToken(state) {
      state.isAuthenticated = true;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
