import { useState } from 'react';

import { useSelector } from 'react-redux';
import { softSkillAssessmentSelector } from 'store/reducers/softSkillAssessment';
import { cloneDeep } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { Button } from 'antd';

import { SkillRadioButtons } from './components/SkillRadioButtons';
import { SkillQuestion } from './components/SkillQuestion';
import { SkillName } from './components/SkillName';
import { DeleteModal } from 'Pages/GenerateCV/common-components/DeleteModal';

import { ISoftSkill, ISoftAssessment } from 'models/ISoftAssessment';

import { useStyles } from './styles';

interface IProps {
  skill: ISoftSkill;
  employeeId: string;
  currentAssessment: ISoftAssessment;
  setCurrentAssessment: React.Dispatch<React.SetStateAction<ISoftAssessment>>;
}

export const SkillCard = ({ skill, employeeId, currentAssessment, setCurrentAssessment }: IProps) => {
  const { scores, softSkillsList } = useSelector(softSkillAssessmentSelector);

  const [currentSkill, setCurrentSkill] = useState(skill);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const classes = useStyles();

  const handleAddQuestion = () => {
    const softAssessmentCopy = cloneDeep(currentAssessment);
    const currentSkillIdx = softAssessmentCopy.softSkills.findIndex((el) => el.id === currentSkill.id);
    if (Number.isInteger(currentSkillIdx)) {
      softAssessmentCopy.softSkills[currentSkillIdx].questions = Array.isArray(
        softAssessmentCopy.softSkills[currentSkillIdx].questions
      )
        ? softAssessmentCopy.softSkills[currentSkillIdx].questions
        : [];
      softAssessmentCopy.softSkills[currentSkillIdx].questions.push({
        id: uuidv4(),
        soft_skill_id: currentSkill.id,
        value: '',
      });
      setCurrentSkill(softAssessmentCopy.softSkills[currentSkillIdx]);
    }
    setCurrentAssessment(softAssessmentCopy);
  };

  const handleClickDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleClickDeleteSkillGroup = () => {
    const filteredSkills = currentAssessment.softSkills.filter((item) => item.id !== skill.id);
    console.log(filteredSkills);

    setCurrentAssessment({
      ...currentAssessment,
      softSkills: filteredSkills,
    });
    setIsDeleteModalOpen(false);
  };

  const handleClose = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className={classes.skillCard}>
      <div className={classes.upperPart}>
        <div className={classes.leftPart}>
          <p className={classes.sectionName}>Section name:</p>
          <SkillName skill={currentSkill} />
          <SkillRadioButtons
            scores={scores}
            softskillsInterview={currentAssessment}
            softSkillsList={softSkillsList}
            employeeId={employeeId}
          />
        </div>
        <div className={classes.deleteSection} onClick={handleClickDelete}>
          Delete section
        </div>
      </div>
      {currentSkill.questions?.map((question) => (
        <SkillQuestion
          id={question.id}
          question={question.value}
          softSkillsList={softSkillsList}
          softskillsInterview={currentAssessment}
        />
      ))}
      <Button onClick={handleAddQuestion}>Add question</Button>

      <DeleteModal
        onSubmit={handleClickDeleteSkillGroup}
        onClose={handleClose}
        isOpen={isDeleteModalOpen}
        modalTitle={'Delete section'}
      />
    </div>
  );
};
