import { useSelector } from 'react-redux';
import { interviewSelector } from 'store/interview';

import { Table } from 'antd';

import { IInterviewResultAnswers } from 'interfaces/interview.interface';
import { levelTypes, levelTypesPriority } from 'constants/interview';
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
          render={(id, { desired }: IInterviewResultAnswers) => (
            <span>{levelTypes[desired]}</span>
          )}
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
