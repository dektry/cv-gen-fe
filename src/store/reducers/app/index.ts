import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';
import { login, auth } from 'actions/user';
import { getAllPositionGroups } from 'actions/positions';

// TODO this import will be moved to Position store
import { IAppState, ICredentials } from 'models/ILogin';
import { IDBPositionGroup } from 'models/IUser';

import { appStoreName, loadPositionGroupsAction, loginAction, authAction } from './actions';
import { defaultUser } from 'store/constants';

import { saveLocalStorage } from 'services/localStorage';

export const logIn = createAsyncThunk(authAction, (credentials: ICredentials) => {
  return login(credentials);
});

export const authUser = createAsyncThunk(loginAction, () => {
  return auth();
});

export const loadPositionGroups = createAsyncThunk(loadPositionGroupsAction, async (): Promise<IDBPositionGroup[]> => {
  return getAllPositionGroups();
});

const initialState: IAppState = {
  positionGroups: [],
  levelGroups: [],
  user: defaultUser,
  isLoading: false,
  isAuth: false,
};

const app = createSlice({
  name: appStoreName,
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<IAppState['user']>) => {
      state.user = payload;
    },
    logOut: (state) => {
      localStorage.clear();
      state.user = defaultUser;
    },
    setAppIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logIn.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
    builder.addCase(loadPositionGroups.fulfilled, (state, { payload }) => {
      state.positionGroups = payload;
    });
    builder.addCase(authUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(authUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;

      if (payload) {
        state.user = payload;
        state.isAuth = true;

        saveLocalStorage('jwt', payload.jwt.access_token);
      }
    });
  },
});

export default app.reducer;

export const appSelector = (state: RootState): IAppState => state.app;

export const { logOut, setUser } = app.actions;
