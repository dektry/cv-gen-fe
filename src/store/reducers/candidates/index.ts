import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';

import { RootState } from '../..';

import { appStoreName, loadCandidatesAction, loadOneCandidateAction, updateCandidateAction } from './actions';
import { getAllCandidates, ILoadCandidateProps, getCandidate, updateCandidate } from 'actions/candidate';

import { ICandidate, ICandidateExperience, ICandidatesState, ICandidateTable } from 'models/ICandidate';

import { defaultCandidate, defaultCurrentPage, defaultPageSize } from 'store/constants';

export const loadCandidates = createAsyncThunk(loadCandidatesAction, (props: ILoadCandidateProps) => {
  return getAllCandidates(props);
});

export const loadOneCandidate = createAsyncThunk(loadOneCandidateAction, (id: string) => {
  return getCandidate(id);
});
export const updateOneCandidate = createAsyncThunk(updateCandidateAction, (candidateInfo: Partial<ICandidate>) => {
  return updateCandidate(candidateInfo);
});

const calculateExperience = (experience: Array<ICandidateExperience>): number => {
  const sortedArray = experience.sort((a, b) => {
    const startA = moment(a.starts_on);
    const startB = moment(b.starts_on);
    return startA.unix() - startB.unix();
  });
  const startCareer = moment(sortedArray[0].starts_on);
  const previousJob = moment(sortedArray[sortedArray.length - 1].ends_on);

  return previousJob.diff(startCareer, 'years');
};

const initialState: ICandidatesState = {
  currentCandidate: defaultCandidate,
  chosenCandidate: null,
  candidates: [],
  totalItems: 0,
  currentPage: defaultCurrentPage,
  pageSize: defaultPageSize,
  nameFilter: '',
  isLoading: false,
  isLoadingOneCandidate: false,
};

const candidates = createSlice({
  name: appStoreName,
  initialState,
  reducers: {
    setCandidate: (state, { payload }: PayloadAction<ICandidate>) => {
      state.currentCandidate = payload;
    },
    chooseCandidate: (state, { payload }: PayloadAction<ICandidateTable>) => {
      state.chosenCandidate = payload;
    },
    setCandidatesTotalItems: (state, { payload }: PayloadAction<number>) => {
      state.totalItems = payload;
    },
    setCandidatesCurrentPage: (state, { payload }: PayloadAction<number>) => {
      state.currentPage = payload;
    },
    setCandidatesPageSize: (state, { payload }: PayloadAction<number>) => {
      state.pageSize = payload;
    },
    setCandidatesNameFilter: (state, { payload }: PayloadAction<string>) => {
      state.nameFilter = payload;
    },
    setCandidatesIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCandidates.fulfilled, (state, { payload }) => {
      if (payload) {
        state.candidates = payload.candidates;
        state.totalItems = payload.count;
      }
    });
    builder.addCase(loadOneCandidate.pending, (state) => {
      state.isLoadingOneCandidate = true;
    });
    builder.addCase(loadOneCandidate.fulfilled, (state, { payload }) => {
      state.isLoadingOneCandidate = false;
      if (payload?.fullName) {
        state.currentCandidate = payload;
      }
      if (payload?.experience?.length)
        state.currentCandidate.yearsOfExperience = calculateExperience(payload?.experience);
    });
    builder.addCase(updateOneCandidate.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateOneCandidate.fulfilled, (state) => {
      state.isLoading = false;
      // if (payload?.fullName) state.currentCandidate = payload;

      // if (payload?.experience?.length)
      //   state.currentCandidate.yearsOfExperience = calculateExperience(payload?.experience);
    });
  },
});

export default candidates.reducer;

export const candidatesSelector = (state: RootState): ICandidatesState => state.candidates;

export const {
  setCandidate,
  setCandidatesCurrentPage,
  setCandidatesIsLoading,
  setCandidatesNameFilter,
  setCandidatesPageSize,
  setCandidatesTotalItems,
  chooseCandidate,
} = candidates.actions;
