import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../..';

import { appStoreName, loadEmployeeAction, loadEmployeesListAction, updateEmployeeAction } from './actions';

import { getAllEmployees, ILoadEmployeeProps, getEmployee, updateEmployee } from 'actions/employee';

import { IEmployeesState, IEmployee } from 'models/IEmployee';

export const defaultEmployee: IEmployee = {
  id: '101010',
  pfId: 101010,
  pfUpdatedAt: '1970-12-31T14:47:14.306Z',
  fullName: 'Say MyName',
  email: null,
  personalEmail: null,
  mobileNumber: null,
  dateOfBirth: null,
  gender: null,
  avatarUrl: null,
  hiredOn: null,
  skypeUsername: null,
  slackUsername: null,
  twitterUsername: null,
  facebookUrl: null,
  linkedinUrl: null,
  department: null,
  position: null,
  level: null,
  location: null,
  timezone: null,
  languages: null,
  formalEducation: null,
  startingPoint: null,
  interests: null,
};

export const defaultPageSize = 10;

export const defaultCurrentPage = 1;

export const getEmployeesList = createAsyncThunk(
  loadEmployeesListAction,
  ({ limit, page, sorter, fullName }: ILoadEmployeeProps) => {
    return getAllEmployees({ limit, page, sorter, fullName });
  }
);

export const loadEmployee = createAsyncThunk(loadEmployeeAction, (id: string) => getEmployee(id));

export const saveChangesToEmployee = createAsyncThunk(updateEmployeeAction, (employee: IEmployee) =>
  updateEmployee(employee)
);

const initialState: IEmployeesState = {
  currentEmployee: defaultEmployee,
  chosenEmployee: null,
  employees: [],
  totalItems: 0,
  currentPage: defaultCurrentPage,
  pageSize: defaultPageSize,
  nameFilter: '',
  isLoading: false,
  query: '',
};

const employees = createSlice({
  name: appStoreName,
  initialState,
  reducers: {
    setEmployee: (state, { payload }: PayloadAction<IEmployee>) => {
      state.currentEmployee = payload;
    },
    setChosenEmployee: (state, { payload }: PayloadAction<IEmployee>) => {
      state.chosenEmployee = payload;
    },
    setPageSize: (state, { payload }: PayloadAction<number>) => {
      state.pageSize = payload;
    },
    setCurrentPage: (state, { payload }: PayloadAction<number>) => {
      state.currentPage = payload;
    },
    setNameFilter: (state, { payload }: PayloadAction<string>) => {
      state.nameFilter = payload;
    },
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setSearchQuery: (state, { payload }: PayloadAction<string | undefined>) => {
      state.query = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEmployeesList.fulfilled, (state, { payload }) => {
      if (payload) {
        state.employees = payload.employees;
        state.totalItems = payload.count;
      }
    });
    builder.addCase(loadEmployee.fulfilled, (state, { payload }) => {
      state.currentEmployee = payload;
    });
    builder.addCase(saveChangesToEmployee.fulfilled, (state, { payload }) => {
      console.log(payload);
    });
  },
});

export default employees.reducer;

export const employeesSelector = (state: RootState): IEmployeesState => state.employees;

export const {
  setEmployee,
  setChosenEmployee,
  setLoading,
  setNameFilter,
  setPageSize,
  setSearchQuery,
  setCurrentPage,
} = employees.actions;
