import { SorterResult, TablePaginationConfig } from 'antd/lib/table/interface';

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
  TITLE: string;
  FULLNAME: string;
  POSITION: string;
  LOCATION: string;
  LEVEL: string;
}

interface TableKeys {
  id: string;
  fullName: string;
  position: string;
  level: string;
  location: string;
}

export interface ITableParams<T> {
  handleChange: (pagination: TablePaginationConfig,
    sorter: SorterResult<T> | SorterResult<T>[]) => Promise<void>;
  entity: Entity;
  tableKeys: TableKeys;
  dataSource: T[];
  expandableParams: IExpandableParams<T> | undefined;
  handleRowClick: (record: T) => {
    onClick?: (() => void) | undefined;
  };
  paginationObj: ITablePaginationObj;
  loading: boolean;
}
