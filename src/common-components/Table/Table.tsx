import { Table } from 'antd';

import { ITableParams } from 'models/ICommon';
import { NullableField } from 'models/TNullableField';

import { useStyles } from './styles';


const { Column } = Table;

export function TableComponent<T extends { id: string | NullableField<string> }>(props: {params: ITableParams<T>}) {

  const { handleRowClick, handleChange, dataSource, paginationObj, expandableParams, loading, entity, tableKeys} = props.params;

  const classes = useStyles();

  return (<Table
    rowKey={'id'}
    size="small"
    onRow={handleRowClick}
    dataSource={dataSource}
    expandable={expandableParams}
    pagination={paginationObj}
    loading={loading}
    onChange={handleChange}
  >
    <Column
      title={entity.FULLNAME}
      dataIndex={tableKeys.fullName}
      key={tableKeys.fullName}
      sorter
    />
    <Column
      title={entity.POSITION}
      dataIndex={tableKeys.position}
      key={tableKeys.position}
      sorter
    />
    <Column
      className={classes.displayNoneMobile}
      title={entity.LEVEL}
      dataIndex={tableKeys.level}
      key={tableKeys.level}
      sorter
    />
    <Column
      className={classes.displayNoneMobile}
      title={entity.LOCATION}
      dataIndex={tableKeys.location}
      key={tableKeys.location}
      sorter
    />
  </Table>)
}