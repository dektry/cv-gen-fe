import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';
import { login } from 'actions/user';
import { getAllPositionGroups } from 'actions/positions';

// TODO this import will be moved to Position store
import { IAppState, ICredentials } from 'models/ILogin';
import { IDBPositionGroup } from 'models/IUser';

import {
  appStoreName,
  loadPositionGroupsAction,
  loginAction,
} from './actions';
import { defaultUser } from 'store/constants';

export const logIn = createAsyncThunk(
  loginAction,
  (credentials: ICredentials) => {
    return login(credentials);
  },
);


export const loadPositionGroups = createAsyncThunk(
  loadPositionGroupsAction,
  async (): Promise<IDBPositionGroup[]> => {
    return getAllPositionGroups();
  },
);

const initialState: IAppState = {
  positionGroups: [],
  levelGroups: [],
  user: defaultUser
};

const app = createSlice({
  name: appStoreName,
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<IAppState['user']>) => {
      state.user = payload;
    },
    logOut: state => {
      localStorage.clear();
      state.user = defaultUser;
    },
  },
  extraReducers: builder => {
    builder.addCase(logIn.fulfilled, (state, { payload }) => {
        state.user = payload;
    });
    builder.addCase(loadPositionGroups.fulfilled, (state, { payload }) => {
      state.positionGroups = payload;
    });
  },
});

export default app.reducer;

export const appSelector = (state: RootState): IAppState => state.app;

export const { logOut, setUser } = app.actions;
