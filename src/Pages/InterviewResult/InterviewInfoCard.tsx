import { Select } from 'antd';

import { useAppDispatch } from 'store/store';
import { useSelector } from 'react-redux';
import {
  chooseInterviewPosition,
  chooseInterviewLevel,
  interviewSelector,
} from 'store/interview';
import { candidatesSelector } from 'store/candidates';
import { IDBLevels, IDBPosition } from 'interfaces/users.interface';

import { useStyles } from './styles';
import { INTERVIEW } from 'constants/titles';

type CardOptions = 'level' | 'position';

interface IProps {
  isEdited: boolean;
  cardOptions: CardOptions;
  options: IDBLevels[] | IDBPosition[];
}

export const InterviewInfoCard = (props: IProps) => {
  const { isEdited, cardOptions, options } = props;

  const classes = useStyles();

  const dispatch = useAppDispatch();
  const { currentCandidate } = useSelector(candidatesSelector);
  const { chosenLevel, chosenPosition, interviewResult } = useSelector(
    interviewSelector,
  );

  const currentCardOptions =
    cardOptions === 'position'
      ? {
          reducer: chooseInterviewPosition,
          headerText: INTERVIEW.POSITION,
          candidateInfo: currentCandidate?.position,
          selectPlaceholder: INTERVIEW.POSITION_PLACEHOLDER,
          selectValue: chosenPosition || interviewResult?.position?.id,
        }
      : {
          reducer: chooseInterviewLevel,
          headerText: INTERVIEW.LEVEL,
          candidateInfo: currentCandidate?.level,
          selectPlaceholder: INTERVIEW.LEVEL_PLACEHOLDER,
          selectValue: chosenLevel || interviewResult?.level?.id,
        };

  const {
    reducer,
    headerText,
    candidateInfo,
    selectPlaceholder,
    selectValue,
  } = currentCardOptions;

  const selectedOption = options.find(el => el.id === selectValue);
  const name = selectedOption?.name;

  const handleSelectChange = (value: string) => {
    dispatch(reducer(value));
  };

  return (
    <div className={classes.information}>
      <h3>{headerText}</h3>
      <div>
        <span className={classes.informationTitle}>{INTERVIEW.CANDIDATE}</span>
        <span>{candidateInfo}</span>
      </div>
      <div>
        <span className={classes.informationTitle}>{INTERVIEW.INTERVIEW}</span>
        {isEdited ? (
          <Select
            onChange={handleSelectChange}
            placeholder={selectPlaceholder}
            value={selectValue}
            className={classes.select}
          >
            {options.map((el: IDBLevels | IDBPosition) => (
              <Select.Option value={el.id} key={el.id}>
                {el.name}
              </Select.Option>
            ))}
          </Select>
        ) : (
          <span className={classes.infoSpan}>{name}</span>
        )}
      </div>
    </div>
  );
};
