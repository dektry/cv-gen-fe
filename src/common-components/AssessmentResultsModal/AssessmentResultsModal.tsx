import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { useStyles } from './styles';
import theme from 'theme/theme';
import { Typography } from '@mui/material';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  modalTitle: string;
  modalText: string;
}

export const AssessmentResultsModal = ({ isOpen, onClose, onSubmit, modalText, modalTitle }: IProps) => {
  const classes = useStyles({ theme });

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className={classes.box}>
        <CloseIcon className={classes.closeIcon} onClick={onClose} />
        <Typography variant="h2" className={classes.title}>
          {modalTitle}
        </Typography>
        <Typography variant="h3" className={classes.text}>
          {modalText}
        </Typography>
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
              {/* {assessment?.answers.map((el: ) => {
            return (
              <TableRow hover={true}>
                <TableCell>{el.created}</TableCell>
                <TableCell>{el.updated}</TableCell>
                <TableCell>{el.position}</TableCell>
                <TableCell>{el.level}</TableCell>
                <TableCell>
                  <div className={classes.link}>
                    View results
                  </div>
                </TableCell>
                <TableCell>
                  
                </TableCell>
              </TableRow>
            );
          })} */}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={classes.buttonContainer}>
          <Button className={classes.noButton} onClick={onClose}>
            No
          </Button>
          <Button className={classes.yesButton} onClick={onSubmit}>
            Yes
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
