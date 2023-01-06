import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { IAssessmentFromDB } from 'models/ICommon';

import { DatePositionLevelInfo } from 'common-components/DatePositionLevelInfo';

import { useStyles } from './styles';
import theme from 'theme/theme';
import { NullableField } from 'models/TNullableField';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  modalTitle: string;
  assessmentShortResult: NullableField<IAssessmentFromDB>;
  isLoading: boolean;
}

export const AssessmentResultsModal = ({ isOpen, onClose, modalTitle, assessmentShortResult, isLoading }: IProps) => {
  const classes = useStyles({ theme });

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className={classes.box}>
        <CloseIcon className={classes.closeIcon} onClick={onClose} />
        <Typography variant="h2" className={classes.title}>
          {modalTitle}
        </Typography>
        {isLoading ? (
          <CircularProgress sx={{ margin: 'auto' }} />
        ) : (
          <>
            <DatePositionLevelInfo
              title={'TECHNICAL ASSESSMENT'}
              date={assessmentShortResult?.created}
              position={assessmentShortResult?.position || ''}
              level={assessmentShortResult?.level || ''}
            />
            <div className={classes.tableContainer}>
              <TableContainer>
                <Table aria-label="assessment results table" sx={{ overflowY: 'scroll' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Skill name</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Assigned</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Required</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {assessmentShortResult?.answers?.map((el) => {
                      return (
                        <TableRow key={el.skill} hover={true}>
                          <TableCell>{el.skill}</TableCell>
                          <TableCell sx={{ background: `${el.color}` }}>{el.assigned}</TableCell>
                          <TableCell>{el.required}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </>
        )}
        <div className={classes.buttonContainer}>
          <Button className={classes.noButton} onClick={onClose}>
            Cancel
          </Button>
          <Button className={classes.yesButton} onClick={onClose}>
            Ok
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
