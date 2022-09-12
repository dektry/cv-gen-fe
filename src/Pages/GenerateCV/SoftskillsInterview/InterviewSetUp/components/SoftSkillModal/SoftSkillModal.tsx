import { useState } from 'react';

import { useAppDispatch } from 'store';
import { addNewSkill, addNewSkillToDB } from 'store/reducers/softskillsInterview';

import { Modal, Input, message } from 'antd';

interface IProps {
  isOpenSkillModal: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

export const SoftSkillModal = ({ isOpenSkillModal, onClose, onSubmit }: IProps) => {
  const dispatch = useAppDispatch();
  const [newSkill, setNewSkill] = useState({
    value: '',
    question: ''
  });

  const handleSubmit = async () => {
    try {
      if (!newSkill) {
        message.warning("Skill can't be empty");
      }

      const allSkills = (await dispatch(addNewSkillToDB(newSkill))).payload;
      if (allSkills && !allSkills.error) {
        dispatch(
          addNewSkill({
            id: allSkills[allSkills.length - 1].id,
            value: allSkills[allSkills.length - 1].value,
            question: allSkills[allSkills.length - 1].question,
          })
        );
        onSubmit?.();
        onClose();
      } else if (allSkills && allSkills.error) {
        message.error(allSkills?.message);
      }
    } catch (error) {
      console.error('[API CLIENT ERROR]', error);
    }
  };

  return (
    <Modal
      title={'Add new soft skill name'}
      visible={isOpenSkillModal}
      width={800}
      onCancel={onClose}
      onOk={handleSubmit}
      destroyOnClose
    >
      <Input placeholder="Enter soft skill name here" onChange={(e) => setNewSkill({
        ...newSkill,
        value: e.target.value
      })} />
      <Input placeholder="Enter question to soft skill here" onChange={(e) => setNewSkill({
        ...newSkill,
        question: e.target.value
      })} />
    </Modal>
  );
};
