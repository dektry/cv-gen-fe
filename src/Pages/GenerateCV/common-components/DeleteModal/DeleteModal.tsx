import { Modal } from 'antd';

interface IProps {
  isOpen: boolean;
  modalTitle: string;
  onClose: () => void;
  onSubmit?: () => void;
}

export const DeleteModal = ({
  isOpen,
  modalTitle,
  onClose,
  onSubmit,
}: IProps) => {

  return (
    <Modal
      centered
      title={modalTitle}
      visible={isOpen}
      onOk={onSubmit}
      onCancel={onClose}
      width={800}
      destroyOnClose
    >

    </Modal>
  )
}