import { useState, useEffect } from 'react';

import {
  addNewSkill,
  addNewSkillToDB,
  setSoftSkillsList,
} from 'store/softskillsInterview';
import { useAppDispatch } from 'store/store';

import { Modal, Input, message } from 'antd';

interface IProps {
  isOpenSkillModal: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

export const SoftSkillModal = ({
  isOpenSkillModal,
  onClose,
  onSubmit,
}: IProps) => {
  const dispatch = useAppDispatch();
  const [newSkill, setNewSkill] = useState('');

  const handleSubmit = async () => {
    try {
      if (!newSkill) {
        message.warning("Skill can't be empty");
      }

      const allSkills = (await dispatch(addNewSkillToDB({ value: newSkill })))
        .payload;
      if (allSkills && !allSkills.error) {
        dispatch(
          addNewSkill({
            isActive: false,
            id: allSkills[allSkills.length - 1].id,
            value: allSkills[allSkills.length - 1].value,
          }),
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
      <Input
        placeholder="Enter soft skill name here"
        onChange={e => setNewSkill(e.target.value)}
      />
    </Modal>
  );
};
