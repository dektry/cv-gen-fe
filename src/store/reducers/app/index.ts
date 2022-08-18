import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAppState, ICredentials } from 'interfaces/login.interface';
import {
  getAccesses,
  getAllOnboardingTemplates,
  getAllPositionGroups,
  login,
} from 'api/utils';
import {
  appStoreName,
  loadPermissionsAction,
  loadPositionGroupsAction,
  loginAction,
} from './actions';
// TODO this import will be moved to Position store
import { IDBPosition, IDBPositionGroup } from 'interfaces/users.interface';
import { RootState } from '../store';

export const logIn = createAsyncThunk(
  loginAction,
  (credentials: ICredentials) => {
    return login(credentials);
  },
);

export const loadPermissions = createAsyncThunk(
  loadPermissionsAction,
  async (_, api) => {
    const rootState = api.getState() as RootState;
    const allTemplates = await getAllOnboardingTemplates();
    const accessToOT = await getAccesses('users/access/onboarding-templates');
    const { user } = rootState.app;
    const assignedPermission = accessToOT?.positions?.some(
      (position: IDBPosition) =>
        user?.currentPositions?.map(item => item?.id).includes(position.id),
    );
    return { allTemplates, assignedPermission };
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
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(logIn.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
    builder.addCase(loadPermissions.fulfilled, (state, { payload }) => {
      state.isHavePermissionToOT = payload.assignedPermission;
      state.isHaveTemplates = !!payload.allTemplates?.length;
    });
    builder.addCase(loadPositionGroups.fulfilled, (state, { payload }) => {
      state.positionGroups = payload;
    });
  },
});

// eslint-disable-next-line import/no-default-export
export default app.reducer;

export const appSelector = (state: RootState): IAppState => state.app;

export const { logOut, setUser } = app.actions;
