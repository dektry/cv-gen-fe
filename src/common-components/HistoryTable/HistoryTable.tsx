import { useState } from 'react';
import { useAppDispatch } from 'store';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { getTechAssessment } from 'store/reducers/techAssessment';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IAssessmentHistoryRecord } from 'models/ITechAssessment';

import { TypeBadge } from './components/TypeBadge';
import { AssessmentResultsModal } from 'common-components/AssessmentResultsModal';

import { useStyles } from './styles';
import theme from 'theme/theme';

interface IProps {
  assessments: IAssessmentHistoryRecord[];
  handleRowClick: (assessmentId: string, position: string) => void;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  getTechAssessment(arg: string): AsyncThunkAction<any, string, Record<string, unknown>>;
}

export const HistoryTable = ({ assessments, handleRowClick }: IProps) => {
  const classes = useStyles({ theme });

  const dispatch = useAppDispatch();

  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);

  const handleResultsModalOpen = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    e.stopPropagation();
    dispatch(getTechAssessment(id));
    setIsResultsModalOpen(true);
  };

  const handleResultsModalClose = () => {
    setIsResultsModalOpen(false);
  };

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="assessment history table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Date of creation</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Date of update</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Position</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Level</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Results</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assessments?.map((el: IAssessmentHistoryRecord) => {
              return (
                <TableRow hover={true} key={el.id} onClick={() => handleRowClick(el.id, el.position)}>
                  <TableCell>{el.created}</TableCell>
                  <TableCell>{el.updated}</TableCell>
                  <TableCell>{el.position}</TableCell>
                  <TableCell>{el.level}</TableCell>
                  <TableCell>
                    <div onClick={(e) => handleResultsModalOpen(e, el.id)} className={classes.link}>
                      View results
                    </div>
                  </TableCell>
                  <TableCell>
                    <TypeBadge type={el.type} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <AssessmentResultsModal
        isOpen={isResultsModalOpen}
        onClose={handleResultsModalClose}
        modalTitle={'TECHNICAL ASSESSMENT RESULTS'}
      />
    </>
  );
};
