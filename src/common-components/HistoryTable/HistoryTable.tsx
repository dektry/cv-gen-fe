import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IAssessmentHistoryRecord } from 'models/ITechAssessment';

import { generatePath, Link } from 'react-router-dom';
import paths from 'config/routes.json';

import { TypeBadge } from './components/TypeBadge';

import { useStyles } from './styles';
import theme from 'theme/theme';

interface IProps {
  assessments: IAssessmentHistoryRecord[];
}

export const HistoryTable = ({ assessments }: IProps) => {
  const classes = useStyles({ theme });
  return (
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
              <TableRow hover={true} key={el.id}>
                <TableCell>{el.created}</TableCell>
                <TableCell>{el.updated}</TableCell>
                <TableCell>{el.position}</TableCell>
                <TableCell>{el.level}</TableCell>
                <TableCell>
                  <Link
                    className={classes.link}
                    to={generatePath(paths.technicalAssessment, {
                      id: el.id,
                      positionId: el.position,
                      levelId: el.level,
                    })}
                  >
                    View results
                  </Link>
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
  );
};
