import React from 'react';

import { Input, Button, Tooltip } from 'antd';

import { ButtonWithLink } from 'common-components/ButtonWithLink';

import { SOFT_SKILL_INTERVIEW } from '../../../utils/constants';
import paths from 'config/routes.json';
import { ICandidate } from 'models/ICandidate';

import { useStyles } from './styles';

const { TextArea } = Input;

interface ISoftSkillFotterProps {
  setOpenSkillModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSaveChanges: () => Promise<void>;
  currentCandidate: ICandidate;
  hobby: string | undefined;
  comment: string | undefined;
  fieldsDisabled: boolean;
  saveDisabled: boolean;
  successfullySaved: boolean | undefined;
}

export const SoftSkillFotter = ({
  setOpenSkillModal,
  handleChange,
  hobby,
  comment,
  fieldsDisabled,
  saveDisabled,
  handleSaveChanges,
  currentCandidate,
  successfullySaved,
}: ISoftSkillFotterProps) => {
  const classes = useStyles();

  const saveButtonText = successfullySaved ? SOFT_SKILL_INTERVIEW.SAVE_CHANGES : SOFT_SKILL_INTERVIEW.SAVE;

  return (
    <div className={classes.footer}>
      <Tooltip placement="right" title={SOFT_SKILL_INTERVIEW.NEW_SKILL}>
        <Button
          title="Add a skill"
          type="primary"
          onClick={() => setOpenSkillModal(true)}
          className={classes.plusButton}
          disabled={successfullySaved}
        >
          +
        </Button>
      </Tooltip>
      <TextArea
        id="hobby"
        rows={2}
        placeholder="Hobbies"
        className={classes.textArea}
        onChange={handleChange}
        value={hobby}
        disabled={fieldsDisabled}
      />
      <TextArea
        id="comment"
        rows={2}
        placeholder="Comment"
        className={classes.textArea}
        onChange={handleChange}
        value={comment}
        disabled={fieldsDisabled}
      />
      <Button style={{ width: '100px' }} disabled={saveDisabled} onClick={handleSaveChanges}>
        {saveButtonText}
      </Button>
      <ButtonWithLink
        path={paths.generateCVtechnicalInterview}
        text={'Start tech interview'}
        id={currentCandidate?.id}
      />
    </div>
  );
};
