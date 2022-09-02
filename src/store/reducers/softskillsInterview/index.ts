import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getSoftSkillsList,
  completeSoftSkillsInterview,
  getSoftSkillInterview,
  editSoftSkillsInterview,
  uploadNewSkill,
} from 'actions/skills';

import { RootState } from 'store';
import {
  appStoreName,
  loadSoftSkillsListAction,
  loadSoftskillInterviewResultAction,
  completeSoftSkillInterviewResultAction,
  editSoftSkillInterviewResultAction,
  addNewSkillAction,
} from './actions';

import {
  ISoftSkillInterview,
  ISoftSkillsInterviewState,
  ISoftSkill,
  ISoftSkillFromDB,
  IPositionOrLevel,
} from 'models/ISoftSkillsInterview';
import { message } from 'antd';

export const loadSoftSkillsList = createAsyncThunk(
  loadSoftSkillsListAction,
  () => getSoftSkillsList(),
);

export const finishSoftSkillInterview = createAsyncThunk(
  completeSoftSkillInterviewResultAction,
  (data: ISoftSkillInterview) => completeSoftSkillsInterview(data),
);

export const saveChangesToSoftSkillsInterview = createAsyncThunk(
  editSoftSkillInterviewResultAction,
  (data: ISoftSkillInterview) => editSoftSkillsInterview(data),
);

export const loadSoftSkillInterview = createAsyncThunk(
  loadSoftskillInterviewResultAction,
  (id: string) => getSoftSkillInterview(id),
);

export const addNewSkillToDB = createAsyncThunk(
  addNewSkillAction,
  (data: Partial<ISoftSkill>) => uploadNewSkill(data),
);

const initialState: ISoftSkillsInterviewState = {
  isLoading: false,
  softSkillsList: [],
  softskillsInterview: {
    softSkills: [],
    hobby: '',
    comment: '',
    candidateId: '',
    level: undefined,
    position: undefined,
    positionId: '',
    levelId: '',
  },
};

const softskillsInterview = createSlice({
  name: appStoreName,
  initialState,
  reducers: {
    setSoftSkillsInterview: (
      state,
      { payload }: PayloadAction<ISoftSkillInterview>,
    ) => {
      state.softskillsInterview = payload;
    },
    setSoftSkillsList: (state, { payload }: PayloadAction<ISoftSkill[]>) => {
      state.softSkillsList = payload;
    },
    setSoftSkillInterviewSkillsList: (
      state,
      { payload }: PayloadAction<ISoftSkill[]>,
    ) => {
      state.softskillsInterview.softSkills = payload;
    },
    addNewSkill: (state, { payload }: PayloadAction<ISoftSkill>) => {
      const softSkillsList = [...state.softSkillsList];
      softSkillsList.push(payload);
      state.softSkillsList = softSkillsList;
    },
    chooseInterviewPosition: (
      state,
      { payload }: PayloadAction<IPositionOrLevel>,
    ) => {
      state.softskillsInterview.position = payload;
      if (payload.id) {
        state.softskillsInterview.positionId = payload.id;
      }
    },
    chooseInterviewLevel: (
      state,
      { payload }: PayloadAction<IPositionOrLevel>,
    ) => {
      state.softskillsInterview.level = payload;
      if (payload.id) {
        state.softskillsInterview.levelId = payload.id;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(loadSoftSkillsList.fulfilled, (state, { payload }) => {
      const processedSkills = payload.map((skill: ISoftSkill) => {
        return {
          isActive: false,
          id: skill.id,
          value: skill.value,
          comment: skill.comment
        };
      });
      state.softSkillsList = processedSkills;
    });
    builder.addCase(loadSoftSkillInterview.fulfilled, (state, { payload }) => {
      if (payload && typeof payload !== 'string') {
        const processedSkills = payload?.skills?.map(
          (skill: ISoftSkillFromDB) => {
            return {
              isActive: skill.isActive,
              id: skill.soft_skill_id.id,
              value: skill.soft_skill_id.value,
              comment: skill.soft_skill_id.comment
            };
          },
        );
        delete payload.skills;
        payload.softSkills = processedSkills;
        payload.successfullySaved = true;
        state.softskillsInterview = payload;
      }
    });
    builder.addCase(finishSoftSkillInterview.fulfilled, state => {
      state.softskillsInterview.successfullySaved = true;
    });
    builder.addCase(saveChangesToSoftSkillsInterview.rejected, () => {
      message.error('Server error. Please contact admin');
    });
  },
});

export default softskillsInterview.reducer;

export const softSkillInterviewSelector = (
  state: RootState,
): ISoftSkillsInterviewState => state.softskillsInterview;

export const {
  setSoftSkillsInterview,
  addNewSkill,
  chooseInterviewPosition,
  chooseInterviewLevel,
  setSoftSkillsList,
  setSoftSkillInterviewSkillsList,
} = softskillsInterview.actions;
