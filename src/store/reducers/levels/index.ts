import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';
import {
  appStoreName,
  createLevelAction,
  loadLevelsAction,
  updateLevelAction,
} from './actions';
import {
  IDBLevels,
  ILevelsState,
  IUpdateLevel,
} from 'models/IUser';
import { defaultLevel, DELETED_LEVELS } from 'store/constants';
import {
  createLevelRequest,
  getAllLevels,
  updateLevelRequest,
} from 'actions/levels';
import { sortLevels } from 'pages/InterviewForm/utils/helpers/sortLevels';


export const loadLevels = createAsyncThunk(
  loadLevelsAction,
  async (): Promise<IDBLevels[]> => {
    const levels: IDBLevels[] = await getAllLevels();

    return levels.filter(item => item.name !== DELETED_LEVELS);
  },
);

export const createLevel = createAsyncThunk(
  createLevelAction,
  (newLevel: Omit<IDBLevels, 'id'>): Promise<IDBLevels> => {
    return createLevelRequest(newLevel);
  },
);

export const updateLevel = createAsyncThunk(
  updateLevelAction,
  ({ levelId, level }: IUpdateLevel): Promise<IDBLevels> => {
    return updateLevelRequest(levelId, level);
  },
);

const initialState: ILevelsState = {
  chosenLevel: defaultLevel,
  isEditLevel: false,
  allLevels: [],
  levelsSchema: [],
  isValidForm: false,
  isLoading: false,
};

const levels = createSlice({
  name: appStoreName,
  initialState,
  reducers: {
    chooseLevel: (state, { payload }: PayloadAction<IDBLevels>) => {
      state.chosenLevel = payload;
    },
    setIsEditLevel: (state, { payload }: PayloadAction<boolean>) => {
      state.isEditLevel = payload;
    },
    setLevelsFormStatus: (state, { payload }: PayloadAction<boolean>) => {
      state.isValidForm = payload;
    },
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setAllLevels: (state, { payload }: PayloadAction<IDBLevels[]>) => {
      state.allLevels = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadLevels.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(loadLevels.fulfilled, (state, { payload }) => {
      state.allLevels = sortLevels(payload);
      state.levelsSchema = payload.map(level => ({
        id: level.id ? level.id : '',
        name: level.name,
        value: 'none',
      }));
      state.isLoading = false;
    });
    builder.addCase(loadLevels.rejected, state => {
      state.isLoading = false;
    });
  },
});

export default levels.reducer;

export const levelsSelector = (state: RootState): ILevelsState => state.levels;

export const {
  setLevelsFormStatus,
  setIsEditLevel,
  setIsLoading,
  chooseLevel,
} = levels.actions;
