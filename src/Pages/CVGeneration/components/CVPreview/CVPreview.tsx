import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Modal } from 'antd';
import handlebars from 'handlebars/dist/cjs/handlebars.js';

import { useStyles } from './styles';
import { cvGenerationSelector } from '../../../../store/reducers/cvGeneration';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../../store';
import { fetchCvGenerationTemplate } from '../../../../store/reducers/cvGeneration/thunks';
import { CvInfo } from '../../CVGenerationPage';

interface ICVPreviewProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  cvInfo: CvInfo;
}

export const CVPreview = React.memo((props: ICVPreviewProps) => {
  const { isModalOpen, handleOk, handleCancel, cvInfo } = props;

  const classes = useStyles();

  const dispatch = useAppDispatch();

  const { template } = useSelector(cvGenerationSelector);
  const compiledTemplate = useMemo(() => handlebars.compile(template), [template]);

  const cvCanvasEl = useRef<HTMLDivElement | null>(null);

  const [cvCanvasDimensions, setCvCanvasDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const sumOfModalVerticalPaddingAndMargins = 270;
    const A4aspectRatio = 1.414;

    const height = window.innerHeight - sumOfModalVerticalPaddingAndMargins;
    const width = height / A4aspectRatio;
    setCvCanvasDimensions({ width, height });

    if (!template) dispatch(fetchCvGenerationTemplate('v1'));
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      if (!cvCanvasEl.current) cvCanvasEl.current = document.getElementById('cv-canvas') as HTMLDivElement;

      const templateWidth = 595;

      const scale = cvCanvasDimensions.width / templateWidth;
      const newEl = document.createElement('div');
      newEl.innerHTML = compiledTemplate(cvInfo);
      newEl.style.scale = `${scale} ${scale}`;

      cvCanvasEl.current.appendChild(newEl);
    }
    return () => {
      if (cvCanvasEl.current) {
        cvCanvasEl.current.innerHTML = '';
      }
    };
  }, [template, isModalOpen]);

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
          id="cv-canvas"
          style={{ width: cvCanvasDimensions.width + 'px', height: cvCanvasDimensions.height + 'px' }}
          className={classes.cvBox}
        ></div>
      </div>
    </Modal>
  );
});
