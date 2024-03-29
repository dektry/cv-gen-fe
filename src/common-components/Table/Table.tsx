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
    {entity.DATE && <Column
      title={entity.DATE}
      dataIndex={tableKeys.date}
      key={tableKeys.date}
      sorter
    />}
    {entity.FULLNAME && <Column
      title={entity.FULLNAME}
      dataIndex={tableKeys.fullName}
      key={tableKeys.fullName}
      sorter
    />}
    {entity.POSITION && <Column
      title={entity.POSITION}
      dataIndex={tableKeys.position}
      key={tableKeys.position}
      sorter
    />}
    {entity.LEVEL && <Column
      className={classes.displayNoneMobile}
      title={entity.LEVEL}
      dataIndex={tableKeys.level}
      key={tableKeys.level}
      sorter
    />}
    {entity.LOCATION && <Column
      className={classes.displayNoneMobile}
      title={entity.LOCATION}
      dataIndex={tableKeys.location}
      key={tableKeys.location}
      sorter
    />}
    {entity.TYPE && <Column
      title={entity.TYPE}
      dataIndex={tableKeys.type}
      key={tableKeys.type}
      sorter
    />}
  </Table>)
}