import { Popover, Typography } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import { useSelector } from 'react-redux';
import { candidatesSelector } from 'store/reducers/candidates';
import { useStyles } from 'pages/GenerateCV/ChoosePerson/Candidate/styles';

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
