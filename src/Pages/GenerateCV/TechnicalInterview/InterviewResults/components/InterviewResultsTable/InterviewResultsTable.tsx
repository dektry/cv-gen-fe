import { Table } from 'antd';

import { useSelector } from 'react-redux';
import { interviewSelector } from 'store/reducers/interview';

import { IInterviewResultAnswers } from 'models/IInterview';
import { levelTypes, levelTypesPriority } from '../InterviewResult/utils/constants';
import { useStyles } from './styles';

export const InterviewResultsTable = () => {
  const { interviewResult } = useSelector(interviewSelector);

  const classes = useStyles();

  return (
    <div className={classes.interviewAnswers}>
      <Table
        dataSource={interviewResult?.answers || []}
        size="small"
        rowKey="id"
        pagination={false}
        scroll={{ y: 250 }}
      >
        <Table.Column title="Skill" dataIndex="skill" key="skill" />
        <Table.Column
          title="Desired"
          dataIndex="desired"
          key="desired"
          render={(id, { desired }: IInterviewResultAnswers) => <span>{levelTypes[desired]}</span>}
        />
        <Table.Column
          title="Actual"
          dataIndex="actual"
          key="actual"
          render={(id, { actual, desired }: IInterviewResultAnswers) => (
            <span
              className={
                levelTypesPriority[actual] === levelTypesPriority[desired]
                  ? classes.average
                  : levelTypesPriority[actual] > levelTypesPriority[desired]
                  ? classes.high
                  : classes.low
              }
            >
              {levelTypes[actual]}
            </span>
          )}
        />
      </Table>
    </div>
  );
};
