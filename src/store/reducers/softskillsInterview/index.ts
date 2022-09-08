import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getSoftSkillsList,
  completeSoftSkillsInterview,
  getSoftSkillInterview,
  editSoftSkillsInterview,
  uploadNewSkill,
  getSoftSkillScores,
} from 'actions/skills';

import { RootState } from 'store';
import {
  appStoreName,
  loadSoftSkillsListAction,
  loadSoftskillInterviewResultAction,
  completeSoftSkillInterviewResultAction,
  editSoftSkillInterviewResultAction,
  addNewSkillAction,
  loadSoftSkillScores,
} from './actions';

import {
  ISoftSkillInterview,
  ISoftSkillsInterviewState,
  ISoftSkill,
  ISoftSkillFromDB,
} from 'models/ISoftSkillsInterview';
import { message } from 'antd';

export const loadSoftSkillsList = createAsyncThunk(loadSoftSkillsListAction, () => getSoftSkillsList());

export const finishSoftSkillInterview = createAsyncThunk(
  completeSoftSkillInterviewResultAction,
  (data: ISoftSkillInterview) => completeSoftSkillsInterview(data)
);

export const saveChangesToSoftSkillsInterview = createAsyncThunk(
  editSoftSkillInterviewResultAction,
  (data: ISoftSkillInterview) => editSoftSkillsInterview(data)
);

export const loadSoftSkillInterview = createAsyncThunk(loadSoftskillInterviewResultAction, (id: string) =>
  getSoftSkillInterview(id)
);

export const addNewSkillToDB = createAsyncThunk(addNewSkillAction, (data: Partial<ISoftSkill>) => uploadNewSkill(data));

export const softSkillScores = createAsyncThunk(loadSoftSkillScores, () => getSoftSkillScores());

const initialState: ISoftSkillsInterviewState = {
  isLoading: false,
  softSkillsList: [],
  scores: [],
  softskillsInterview: {
    softSkills: [],
    hobby: '',
    comment: '',
    candidateId: '',
  },
};

const softskillsInterview = createSlice({
  name: appStoreName,
  initialState,
  reducers: {
    setSoftSkillsInterview: (state, { payload }: PayloadAction<ISoftSkillInterview>) => {
      state.softskillsInterview = payload;
    },
    setSoftSkillsList: (state, { payload }: PayloadAction<ISoftSkill[]>) => {
      state.softSkillsList = payload;
    },
    setSoftSkillInterviewSkillsList: (state, { payload }: PayloadAction<ISoftSkill[]>) => {
      state.softskillsInterview.softSkills = payload;
    },
    addNewSkill: (state, { payload }: PayloadAction<ISoftSkill>) => {
      const softSkillsList = [...state.softSkillsList];
      softSkillsList.push(payload);
      state.softSkillsList = softSkillsList;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadSoftSkillsList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loadSoftSkillsList.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      const processedSkills = payload.map((skill: ISoftSkill) => {
        return {
          id: skill.id,
          value: skill.value,
          comment: skill.comment,
          question: skill.question,
          score: skill.score,
        };
      });
      state.softskillsInterview.softSkills = processedSkills;
    });
    builder.addCase(loadSoftSkillInterview.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loadSoftSkillInterview.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      if (payload && typeof payload !== 'string') {
        const processedSkills = payload?.skills?.map((skill: ISoftSkillFromDB) => {
          return {
            id: skill.soft_skill_id.id,
            value: skill.soft_skill_id.value,
            comment: skill.soft_skill_id.comment,
            question: skill.soft_skill_id.question,
          };
        });
        delete payload.skills;
        payload.softSkills = processedSkills;
        payload.successfullySaved = true;
        state.softskillsInterview = payload;
      }
    });
    builder.addCase(finishSoftSkillInterview.fulfilled, (state) => {
      state.softskillsInterview.successfullySaved = true;
    });
    builder.addCase(saveChangesToSoftSkillsInterview.rejected, () => {
      message.error('Server error. Please contact admin');
    });
    builder.addCase(softSkillScores.fulfilled, (state, { payload }) => {
      state.scores = payload;
    });
  },
});

export default softskillsInterview.reducer;

export const softSkillInterviewSelector = (state: RootState): ISoftSkillsInterviewState => state.softskillsInterview;

export const {
  setSoftSkillsInterview,
  addNewSkill,
  setSoftSkillsList,
  setSoftSkillInterviewSkillsList,
} = softskillsInterview.actions;
