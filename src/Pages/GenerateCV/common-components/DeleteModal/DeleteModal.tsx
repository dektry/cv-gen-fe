import { Modal } from 'antd';

import { useStyles } from './styles';

interface IProps {
  isOpen: boolean;
  modalTitle: string;
  onClose: () => void;
  onSubmit?: () => void;
}

export const DeleteModal = ({ isOpen, modalTitle, onClose, onSubmit }: IProps) => {
  const classes = useStyles();

  return (
    <Modal
      className={classes.modal}
      centered
      title={modalTitle}
      visible={isOpen}
      onOk={onSubmit}
      onCancel={onClose}
      okText={'Yes'}
      cancelText={'No'}
      destroyOnClose
    >
      <div className={classes.warning}>Are you sure you want to delete this section? All data will be lost</div>
    </Modal>
  );
};
