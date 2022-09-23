import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';

import { useStyles } from './styles';

interface ICVPreviewProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

export const CVPreview = React.memo((props: ICVPreviewProps) => {
  const { isModalOpen, handleOk, handleCancel } = props;

  const classes = useStyles();

  const [cvCanvasDimensions, setCvCanvasDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const height = window.innerHeight - 270;
    const width = height / 1.414;
    setCvCanvasDimensions({ width, height });
  }, []);

  return (
    <Modal
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelText="CLOSE"
      okText="DOWNLOAD"
      width="50vw"
      style={{ top: '50px' }}
    >
      <div className={classes.container}>
        <h1>CV Preview</h1>
        <div
          style={{ width: cvCanvasDimensions.width + 'px', height: cvCanvasDimensions.height + 'px' }}
          className={classes.cvBox}
        >
          cv is comming
        </div>
      </div>
    </Modal>
  );
});
