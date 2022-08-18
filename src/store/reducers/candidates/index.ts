import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';

import { RootState } from '../..';

import { appStoreName, loadCandidatesAction, loadOneCandidateAction } from './actions';
import { getAllCandidates, ILoadCandidateProps, getCandidate } from 'actions/candidate';

import { ICandidate, ICandidatesState, ICandidateTable } from 'models/ICandidate';

export const defaultCandidate: ICandidate = {
  id: '1111',
  pfId: 0,
  pfUpdatedAt: '1970-12-31T14:47:14.306Z',
  fullName: '',
  position: null,
  level: null,
  location: null,
  timezone: null,
  languages: [
    {
      id: null,
      code: '',
      level: '',
    },
  ],
  education: [
    {
      id: null,
      pfId: 0,
      school: '',
      name: '',
      from_year: 0,
      to_year: null,
      subject: '',
      description: '',
    },
  ],
  experience: [
    {
      id: null,
      pfId: 0,
      title: '',
      company: '',
      starts_on: '1970-12-31T00:00:00.000Z',
      ends_on: null,
      location: '',
      description: '',
    },
  ],
};

export const defaultPageSize = 10;
export const defaultCurrentPage = 1;

export const loadCandidates = createAsyncThunk(loadCandidatesAction, (props: ILoadCandidateProps) => {
  return getAllCandidates(props);
});

export const loadOneCandidate = createAsyncThunk(loadOneCandidateAction, (id: string) => {
  return getCandidate(id);
});

const initialState: ICandidatesState = {
  currentCandidate: defaultCandidate,
  chosenCandidate: null,
  candidates: [],
  totalItems: 0,
  currentPage: defaultCurrentPage,
  pageSize: defaultPageSize,
  nameFilter: '',
  isLoading: false,
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
      state.candidates = payload.candidates;
      state.totalItems = payload.count;
    });
    builder.addCase(loadOneCandidate.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loadOneCandidate.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      if (payload.fullName) {
        state.currentCandidate = payload;
      }
      if (payload?.experience?.length) {
        const sortedArray = payload.experience.sort((a, b) => {
          const startA = moment(a.starts_on);
          const startB = moment(b.starts_on);
          return startA.unix() - startB.unix();
        });
        const startCareer = moment(sortedArray[0].starts_on);
        const previousJob = moment(sortedArray[sortedArray.length - 1].ends_on);
        state.currentCandidate.yearsOfExperience = previousJob.diff(startCareer, 'years');
      }
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
