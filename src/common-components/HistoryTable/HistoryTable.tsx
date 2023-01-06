import { useEffect, useState } from 'react';
import { useAppDispatch } from 'store';
import { AsyncThunkAction } from '@reduxjs/toolkit';

import { useForm, useFieldArray } from 'react-hook-form';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import AddRoundedIcon from '@mui/icons-material/DeleteRounded';
import { IAssessmentFromDB } from 'models/ICommon';
import { IAssessmentHistoryRecord } from 'models/ICommon';
import { NullableField } from 'models/TNullableField';

import { TypeBadge } from './components/TypeBadge';
import { AssessmentResultsModal } from 'common-components/AssessmentResultsModal';
import { DeleteModal } from 'common-components/DeleteModal';

import { useStyles } from './styles';
import theme from 'theme/theme';

interface IProps {
  assessments: IAssessmentHistoryRecord[];
  handleRowClick: (assessmentId: string, position: string) => void;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  getAssessment(arg: string): AsyncThunkAction<any, string, Record<string, unknown>>;
  deleteAssessment(arg: string): AsyncThunkAction<any, string, Record<string, unknown>>;
  assessmentShortResult: NullableField<IAssessmentFromDB>;
  isLoading: boolean;
}

export const HistoryTable = ({
  assessments,
  handleRowClick,
  getAssessment,
  assessmentShortResult,
  isLoading,
  deleteAssessment,
}: IProps) => {
  const classes = useStyles({ theme });

  const dispatch = useAppDispatch();

  const { control, reset } = useForm({
    defaultValues: { assessments },
  });

  const { fields, remove } = useFieldArray({
    name: 'assessments',
    control,
    keyName: 'assessmentKey',
  });

  useEffect(() => {
    const defaultValues = { assessments };
    reset({ ...defaultValues });
  }, [assessments]);

  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [assessmentId, setAssessmentId] = useState('');
  const [assessmentArrIndex, setAssessmentArrIndex] = useState(0);

  const handleResultsModalOpen = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    e.stopPropagation();
    dispatch(getAssessment(id));
    setIsResultsModalOpen(true);
  };

  const handleResultsModalClose = () => {
    setIsResultsModalOpen(false);
  };

  const handleDeleteModalOpen = (e: React.MouseEvent<HTMLButtonElement>, id: string, idx: number) => {
    e.stopPropagation();
    setAssessmentId(id);
    setAssessmentArrIndex(idx);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteAssessmentSubmit = () => {
    if (assessmentId) {
      dispatch(deleteAssessment(assessmentId));
      remove(assessmentArrIndex);
    }
    setAssessmentId('');
    setIsDeleteModalOpen(false);
  };

  const handleDeleteModalClose = () => {
    setAssessmentId('');
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      {fields.length ? (
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
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fields?.map((el, elIndex) => {
                return (
                  <TableRow hover={true} key={el.assessmentKey} onClick={() => handleRowClick(el.id, el.position)}>
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
                    <TableCell>
                      <Button
                        className={classes.deleteSkillBtn}
                        variant="contained"
                        endIcon={<AddRoundedIcon />}
                        onClick={(e) => handleDeleteModalOpen(e, el.id, elIndex)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div></div>
      )}
      <AssessmentResultsModal
        isOpen={isResultsModalOpen}
        onClose={handleResultsModalClose}
        modalTitle={'TECHNICAL ASSESSMENT RESULTS'}
        assessmentShortResult={assessmentShortResult}
        isLoading={isLoading}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        onSubmit={handleDeleteAssessmentSubmit}
        modalTitle={'DELETE TECHNICAL ASSESSMENT'}
        modalText={'Are you sure you want to delete this technical assessment? All data will be lost'}
      />
    </>
  );
};
