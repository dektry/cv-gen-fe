import React from 'react';

import { Input, Button, Tooltip } from 'antd';

import { ButtonWithLink } from 'common-components/ButtonWithLink';

import { SOFT_SKILL_INTERVIEW } from '../../../../utils/constants';
import paths from 'config/routes.json';
import { ICandidate } from 'models/ICandidate';

import { useStyles } from './styles';

const { TextArea } = Input;

interface ISoftSkillFooterProps {
  setOpenSkillModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  currentCandidate: ICandidate;
  comment: string | undefined;
}

export const SoftSkillFotter = ({
  setOpenSkillModal,
  handleChange,
  comment,
  currentCandidate,
}: ISoftSkillFooterProps) => {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <Tooltip placement="right" title={SOFT_SKILL_INTERVIEW.NEW_SKILL}>
        <Button
          title="Add a skill"
          type="primary"
          onClick={() => setOpenSkillModal(true)}
          className={classes.plusButton}
        >
          +
        </Button>
      </Tooltip>
      <TextArea
        id="comment"
        rows={2}
        placeholder="Feedback field"
        className={classes.textArea}
        onChange={handleChange}
        value={comment}
      />
      <ButtonWithLink path={paths.softSkillsInterviewResult} text={'See results'} id={currentCandidate?.id} />
      <ButtonWithLink path={paths.technicalInterview} text={'Start tech interview'} id={currentCandidate?.id} />
    </div>
  );
};
