import { techAssessmentSelector } from 'store/reducers/techAssessment';

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

import { useStyles } from './styles';
import theme from 'theme/theme';
import { useSelector } from 'react-redux';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  modalTitle: string;
}

export const AssessmentResultsModal = ({ isOpen, onClose, modalTitle }: IProps) => {
  const classes = useStyles({ theme });

  const { assessmentResult, isLoading } = useSelector(techAssessmentSelector);
  //TODO: Move assessment result info with position and level to separate component
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
            <div className={classes.upperContainer}>
              <Typography variant="h3">
                TECHNICAL ASSESSMENT {new Date(assessmentResult?.created as string).toLocaleDateString()}
              </Typography>
              <div className={classes.positionsContainer}>
                <div className={classes.positionLevelContainer}>
                  <Typography variant="h3">Position: </Typography>
                  {assessmentResult?.position && (
                    <Typography variant="h5" className={classes.tag}>
                      {assessmentResult?.position}
                    </Typography>
                  )}
                </div>
                <div className={classes.positionLevelContainer}>
                  <Typography variant="h3">Level: </Typography>
                  {assessmentResult?.position && (
                    <Typography variant="h5" className={classes.tag}>
                      {assessmentResult?.position}
                    </Typography>
                  )}
                </div>
              </div>
            </div>

            <TableContainer>
              <Table sx={{ margin: '24px 16px 16px 40px', width: '100%' }} aria-label="assessment results table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Skill name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Assigned</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Required</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {assessmentResult?.answers?.map((el) => {
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