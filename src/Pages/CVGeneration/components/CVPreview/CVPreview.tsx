import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Pagination, Spin } from 'antd';
import handlebars from 'handlebars/dist/cjs/handlebars.js';
import { isEmpty } from 'lodash';

import { cvGenerationSelector } from 'store/reducers/cvGeneration';
import { useAppDispatch } from 'store';
import { downloadCv, fetchGroupOfTemplates } from 'store/reducers/cvGeneration/thunks';
import { CvInfoForm } from '../CVGenerationInfo';
import { useStyles } from 'Pages/CVGeneration/components/CVPreview/styles';
import { getCvPages } from 'Pages/CVGeneration/utils/getCvPages';
import { templateWidth } from 'Pages/CVGeneration/constants';

interface ICVPreviewProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  cvInfo: CvInfoForm;
}

export const CVPreview = React.memo((props: ICVPreviewProps) => {
  const { isModalOpen, handleOk, handleCancel, cvInfo } = props;

  const classes = useStyles();

  const dispatch = useAppDispatch();

  const { templates, isLoading, isGeneratingPdf } = useSelector(cvGenerationSelector);
  const compiledTemplates = useMemo(() => {
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

      if (isEmpty(compiledTemplates)) {
        dispatch(fetchGroupOfTemplates(['v2-intro', 'v2-prof-skills', 'v2-projects']));
      } else {
        const newPages = getCvPages({ ...cvInfo }, compiledTemplates);

        newPages.forEach((p) => {
          const newEl = document.createElement('div');
          newEl.innerHTML = p;
          cvCanvasEl.current?.children[0]?.appendChild(newEl);

          return newEl;
        });

        setPages(newPages);
      }
    }
    return () => {
      if (cvCanvasEl.current) {
        const pages = cvCanvasEl.current.children[0];
        if (pages) pages.innerHTML = '';
      }
      setPages([]);
    };
  }, [compiledTemplates, isModalOpen]);

  useEffect(() => {
    if (!isModalOpen) setCurrentPage(1);
  }, [isModalOpen]);

  useEffect(() => {
    if (!isGeneratingPdf) {
      handleOk();
    }
  }, [isGeneratingPdf]);

  const handleDownloadCv = () => {
    dispatch(
      downloadCv({ template: pages.join(''), fileName: `${cvInfo.firstName}_${cvInfo.position}_${cvInfo.level}` })
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const pagesPosition = (pages.length * templateWidth) / 2 - templateWidth / 2 - (currentPage - 1) * templateWidth;

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
          <Pagination simple current={currentPage} total={pages.length} pageSize={1} onChange={handlePageChange} />
        )}
        <div
          id="cv-canvas"
          style={{ width: cvCanvasDimensions.width + 'px', height: cvCanvasDimensions.height + 'px' }}
          className={classes.cvBox}
        >
          {isLoading ? <Spin size="large" tip={'Loading template...'} /> : null}
          <div
            className={classes.pages}
            style={{
              transform: `translateX(${pagesPosition}px)`,
              visibility: pages.length ? 'visible' : 'hidden',
              scale: `${cvCanvasDimensions.width / templateWidth} ${cvCanvasDimensions.width / templateWidth}`,
            }}
          ></div>
        </div>
      </div>
    </Modal>
  );
});
