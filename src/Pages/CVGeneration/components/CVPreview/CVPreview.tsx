import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Pagination, Spin } from 'antd';
import handlebars from 'handlebars/dist/cjs/handlebars.js';
import { isEmpty } from 'lodash';

import { cvGenerationSelector } from 'store/reducers/cvGeneration';
import { useAppDispatch } from 'store';
import { downloadCv, fetchGroupOfTemplates } from 'store/reducers/cvGeneration/thunks';
import { CvInfo } from 'Pages/CVGeneration/CVGenerationPage';
import { useStyles } from 'Pages/CVGeneration/components/CVPreview/styles';
import { getCvPages } from 'Pages/CVGeneration/utils/getCvPages';
import { profSkillsMock } from 'Pages/CVGeneration/mocks';
import { templateWidth } from 'Pages/CVGeneration/constants';

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
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const sumOfModalVerticalPaddingAndMargins = 300;
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        cvInfo.languages = ['English - B2', 'Russian - native'];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        cvInfo.education = [
          ['Belarusian State University of Informatics and Radioelectronics', 'Software Engineering', '2015-2019'],
          ['Belarusian National Technical University', 'Civil Engineering', '2010-2015'],
        ];

        const newPages = getCvPages({ ...cvInfo, profSkills: profSkillsMock }, compiledTemplate);
        setPages(newPages);
      }
    }
  }, [compiledTemplate, isModalOpen]);

  useEffect(() => {
    if (isModalOpen && pages.length) {
      const scale = cvCanvasDimensions.width / templateWidth;
      const newEl = document.createElement('div');

      newEl.innerHTML = pages[currentPage - 1];
      newEl.style.scale = `${scale} ${scale}`;

      cvCanvasEl.current?.appendChild(newEl);
    }
    return () => {
      if (cvCanvasEl.current) {
        cvCanvasEl.current.innerHTML = '';
      }
    };
  }, [pages, isModalOpen, currentPage]);

  useEffect(() => {
    if (!isGeneratingPdf) {
      handleOk();
    }
  }, [isGeneratingPdf]);

  const handleDownloadCv = () => {
    dispatch(downloadCv(pages.join('')));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
        {pages.length && (
          <Pagination
            simple
            defaultCurrent={currentPage}
            total={pages.length}
            pageSize={1}
            onChange={handlePageChange}
          />
        )}
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
