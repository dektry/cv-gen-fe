import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';
import {
  appStoreName,
  createPositionAction,
  loadPositionsAction,
  loadSkillMatrixAction,
  updatePositionAction,
} from './actions';
import {
  IDBPosition,
  IMatrix,
  IPositionsState,
  IUpdatePosition,
} from 'models/IUser';
import { defaultPosition, DELETED_POSITION } from 'Pages/AuthCheck/utils/constants';
import {
  createPositionRequest,
  getAllPositions,
  updatePositionRequest,
} from 'actions/positions';
import { getSkillMatrixByPositionId } from 'actions/skills';


export const loadPositions = createAsyncThunk(
  loadPositionsAction,
  async (): Promise<IDBPosition[]> => {
    const positions: IDBPosition[] = await getAllPositions();

    return positions.filter(item => item.name !== DELETED_POSITION);
  },
);

export const loadSkillMatrix = createAsyncThunk(
  loadSkillMatrixAction,
  (positionId: string): Promise<IMatrix> => {
    return getSkillMatrixByPositionId(positionId);
  },
);

export const createPosition = createAsyncThunk(
  createPositionAction,
  (newPosition: Omit<IDBPosition, 'id'>): Promise<IDBPosition> => {
    return createPositionRequest(newPosition);
  },
);

export const updatePosition = createAsyncThunk(
  updatePositionAction,
  ({ positionId, position }: IUpdatePosition): Promise<IDBPosition> => {
    return updatePositionRequest(positionId, position);
  },
);

const initialState: IPositionsState = {
  chosenPosition: defaultPosition,
  isEditPosition: false,
  skillMatrix: [],
  allPositions: [],
  isValidForm: false,
  isLoading: false,
};

const positions = createSlice({
  name: appStoreName,
  initialState,
  reducers: {
    choosePosition: (state, { payload }: PayloadAction<IDBPosition>) => {
      state.chosenPosition = payload;
    },
    setIsEditPosition: (state, { payload }: PayloadAction<boolean>) => {
      state.isEditPosition = payload;
    },
    setPositionsFormStatus: (state, { payload }: PayloadAction<boolean>) => {
      state.isValidForm = payload;
    },
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loadPositions.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(loadPositions.fulfilled, (state, { payload }) => {
      state.allPositions = payload;
      state.isLoading = false;
    });
    builder.addCase(loadPositions.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(loadSkillMatrix.fulfilled, (state, { payload }) => {
      state.skillMatrix = payload;
    });
  },
});

export default positions.reducer;

export const positionsSelector = (state: RootState): IPositionsState =>
  state.positions;

export const {
  setPositionsFormStatus,
  setIsEditPosition,
  setIsLoading,
  choosePosition,
} = positions.actions;