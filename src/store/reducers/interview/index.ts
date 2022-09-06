import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';
import {
  appStoreName,
  loadCandidateAction,
  loadInterviewMatrixAction,
  loadInterviewResultAction,
  finishInterviewAction,
  editInterviewAction,
} from './actions';
import { getCandidate } from 'actions/candidate';

import { getSkillMatrixByIds } from 'actions/skills';

import { loadInterviewResultRequest, completeInterview, editInterview } from 'actions/interview';

import { IInterviewMatrix, IInterviewResult, IInterviewState, ICompleteInterview } from 'models/IInterview';
import { stat } from 'fs';

export const loadCandidate = createAsyncThunk(loadCandidateAction, (candidateId: string) => {
  return getCandidate(candidateId);
});

export const loadInterviewResult = createAsyncThunk(loadInterviewResultAction, async (candidateId: string) => {
  const { interview, answers } = await loadInterviewResultRequest(candidateId);
  if (interview) {
    return { ...interview, answers };
  }
  return null;
});

export const loadInterviewMatrix = createAsyncThunk(
  loadInterviewMatrixAction,
  ({ positionId, levelId }: { positionId: string; levelId: string }) => {
    return getSkillMatrixByIds(positionId, levelId);
  }
);

export const finishInterview = createAsyncThunk(finishInterviewAction, (interview: ICompleteInterview) =>
  completeInterview(interview)
);

export const saveChangesToInterview = createAsyncThunk(editInterviewAction, (interview: ICompleteInterview) =>
  editInterview(interview)
);

const initialState: IInterviewState = {
  isLoading: false,
  isLoadingInterviewMatrix: false,
  candidate: null,
  chosenPosition: undefined,
  chosenLevel: undefined,
  interviewResult: null,
  interviewMatrix: [],
  skillId: '',
};

const interview = createSlice({
  name: appStoreName,
  initialState,
  reducers: {
    setInterviewMatrix: (state, { payload }: PayloadAction<IInterviewMatrix>) => {
      state.interviewMatrix = payload;
    },
    setInterviewResult: (state, { payload }: PayloadAction<IInterviewResult | null>) => {
      state.interviewResult = payload;
    },
    chooseInterviewPosition: (state, { payload }: PayloadAction<string | undefined>) => {
      state.chosenPosition = payload;
    },
    chooseInterviewLevel: (state, { payload }: PayloadAction<string | undefined>) => {
      state.chosenLevel = payload;
    },
    setInterviewIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setSkillID: (state, { payload }: PayloadAction<string>) => {
      state.skillId = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCandidate.fulfilled, (state, { payload }) => {
      if (payload) {
        state.candidate = payload;
      }
    });
    builder.addCase(loadInterviewResult.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loadInterviewResult.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.interviewResult = payload;
    });
    builder.addCase(loadInterviewMatrix.pending, (state) => {
      state.isLoadingInterviewMatrix = true;
    });
    builder.addCase(loadInterviewMatrix.fulfilled, (state, { payload }) => {
      state.isLoadingInterviewMatrix = false;
      state.interviewMatrix = payload;
    });
    builder.addCase(finishInterview.fulfilled, (state, { payload }) => {
      if (payload) {
        state.interviewResult = payload.interview;
        if (state.interviewResult) {
          state.interviewResult.answers = payload.answers;
        }
      }
    });
    builder.addCase(saveChangesToInterview.fulfilled, (state, { payload }) => {
      if (payload) {
        state.interviewResult = payload.interview;
        if (state.interviewResult) {
          state.interviewResult.answers = payload.answers;
        }
      }
    });
  },
});

export default interview.reducer;

export const interviewSelector = (state: RootState): IInterviewState => state.interview;

export const {
  chooseInterviewLevel,
  chooseInterviewPosition,
  setInterviewIsLoading,
  setInterviewResult,
  setInterviewMatrix,
  setSkillID,
} = interview.actions;
