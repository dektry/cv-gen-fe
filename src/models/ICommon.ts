import { SorterResult, TablePaginationConfig } from 'antd/lib/table/interface';
import { NullableField } from './TNullableField';
import { IInterviewResultAnswers } from './IInterview';

export interface IPagination {
  totalItems: number;
  currentPage: number;
  pageSize: number;
}

export interface IFilter {
  nameFilter: string;
}

export interface ITableExtension extends IPagination, IFilter {}

export interface IExpandableParams<T> {
  columnWidth: string;
  expandRowByClick: boolean;
  expandedRowRender: (record: T) => JSX.Element;
}

interface ITablePaginationObj {
  pageSize: number;
  total: number;
  current: number;
  showTotal: (total: number) => string;
}

interface Entity {
  TITLE?: string;
  FULLNAME?: string;
  FIRSTNAME?: string;
  LASTNAME?: string;
  POSITION?: string;
  LOCATION?: string;
  LEVEL?: string;
  TYPE?: string;
  DATE?: string;
}

interface TableKeys {
  id?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  position?: string;
  level?: string;
  location?: string;
  type?: string;
  date?: string;
}

export interface ITableParams<T> {
  handleChange?: (pagination: TablePaginationConfig, sorter: SorterResult<T> | SorterResult<T>[]) => Promise<void>;
  entity: Entity;
  tableKeys: TableKeys;
  dataSource: T[];
  expandableParams?: IExpandableParams<T> | undefined;
  handleRowClick: (record: T) => {
    onClick?: (() => void) | undefined;
  };
  paginationObj: ITablePaginationObj;
  loading: boolean;
  renderActions?: (record: T) => JSX.Element;
}

export interface IPersonalData {
  firstName: string;
  lastName: string;
  location: NullableField<string>;
  position: NullableField<string>;
  level: NullableField<string>;
}

export interface IAssessmentHistoryRecord {
  id: string;
  created: string;
  updated: string;
  level: string;
  position: string;
  type: 'Assessment' | 'Interview';
}

export interface IAssessmentFromDB {
  id: string;
  created: string;
  level: string;
  position: string;
  answers?: IInterviewResultAnswers[];
}
