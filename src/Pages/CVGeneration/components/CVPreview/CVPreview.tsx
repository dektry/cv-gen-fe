import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Spin } from 'antd';
import handlebars from 'handlebars/dist/cjs/handlebars.js';
import { isEmpty } from 'lodash';

import { cvGenerationSelector } from 'store/reducers/cvGeneration';
import { useAppDispatch } from 'store';
import { fetchCvGenerationTemplate, downloadCv, fetchGroupOfTemplates } from 'store/reducers/cvGeneration/thunks';
import { CvInfo } from 'Pages/CVGeneration/CVGenerationPage';
import { useStyles } from 'Pages/CVGeneration/components/CVPreview/styles';
import { getCvPages } from 'Pages/CVGeneration/utils/getCvPages';
import { profSkillsMock } from 'Pages/CVGeneration/mocks';

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

  const { templates, isLoading, isGeneratingPdf } = useSelector(cvGenerationSelector);
  const compiledTemplate = useMemo(() => {
    const result: { [name: string]: HandlebarsTemplateDelegate } = {};
    Object.entries(templates).forEach(([key, value]) => {
      result[key] = handlebars.compile(value);
    });
    return result;
  }, [templates]);

  const cvCanvasEl = useRef<HTMLDivElement | null>(null);

  const [cvCanvasDimensions, setCvCanvasDimensions] = useState({ width: 0, height: 0 });
  const [pages, setPages] = useState<string[]>([]);

  useEffect(() => {
    const sumOfModalVerticalPaddingAndMargins = 270;
    const A4aspectRatio = 1.414;

    const height = window.innerHeight - sumOfModalVerticalPaddingAndMargins;
    const width = height / A4aspectRatio;
    setCvCanvasDimensions({ width, height });
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      if (!cvCanvasEl.current) cvCanvasEl.current = document.getElementById('cv-canvas') as HTMLDivElement;

      if (isEmpty(compiledTemplate)) {
        dispatch(fetchGroupOfTemplates(['v2-intro', 'v2-prof-skills', 'v2-projects']));
      } else {
        const templateWidth = 595;

        const newPages = getCvPages({ ...cvInfo, profSkills: profSkillsMock }, compiledTemplate);

        setPages(newPages);

        const scale = cvCanvasDimensions.width / templateWidth;
        const newEl = document.createElement('div');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        cvInfo.languages = [];
        console.log(newPages);
        newEl.innerHTML = newPages[0];
        newEl.style.scale = `${scale} ${scale}`;

        cvCanvasEl.current.appendChild(newEl);
      }
    }
    return () => {
      if (cvCanvasEl.current) {
        cvCanvasEl.current.innerHTML = '';
      }
    };
  }, [compiledTemplate, isModalOpen]);

  useEffect(() => {
    if (!isGeneratingPdf) {
      handleOk();
    }
  }, [isGeneratingPdf]);

  const handleDownloadCv = () => {
    const template = cvCanvasEl.current?.children[0].innerHTML || '';

    dispatch(downloadCv(template));
  };

  return (
    <Modal
      open={isModalOpen}
      confirmLoading={isGeneratingPdf}
      okButtonProps={{ disabled: isEmpty(templates) }}
      onOk={handleDownloadCv}
      onCancel={handleCancel}
      cancelText="CLOSE"
      okText="DOWNLOAD"
      width="50vw"
      style={{ top: '50px', minWidth: '525px' }}
    >
      <div className={classes.container}>
        <h1>CV Preview</h1>
        <div
          id="cv-canvas"
          style={{ width: cvCanvasDimensions.width + 'px', height: cvCanvasDimensions.height + 'px' }}
          className={classes.cvBox}
        >
          {isLoading && <Spin size="large" tip={'Loading template...'} />}
        </div>
      </div>
    </Modal>
  );
});
