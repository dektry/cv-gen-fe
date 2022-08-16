import { candidatesSelector } from 'store/candidates';
import { useSelector } from 'react-redux';
import { Popover, Typography } from 'antd';
import { useStyles } from './styles';
import { InfoCircleOutlined } from '@ant-design/icons';

export const CandidatePopOver = () => {
  const {
    currentCandidate: { fullName, position, level, location },
  } = useSelector(candidatesSelector);
  const classes = useStyles();
  const popoverContent = (
    <div>
      {position && <p>Position: {position}</p>}
      {level && <p>Level: {level}</p>}
      {location && <p>Location: {location}</p>}
    </div>
  );

  return (
    <Popover content={popoverContent} title={'Candidate info'}>
      <div className={classes.candidateInfo}>
        <Typography.Text>{fullName}</Typography.Text>
        <InfoCircleOutlined className={classes.icon} />
      </div>
    </Popover>
  );
};
