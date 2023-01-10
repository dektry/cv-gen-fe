import { v4 as uuidv4 } from 'uuid';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { IAssessmentsComparison } from 'models/ITechAssessment';

interface IProps {
  assessments: IAssessmentsComparison;
}

export const AssessmentsComparisonTable = ({ assessments }: IProps) => {
  const emptyCells: string[] = [];

  for (let i = 0; i <= assessments.head.length - 2; i++) {
    emptyCells.push(uuidv4());
  }

  console.log(assessments);

  return (
    <>
      <TableContainer>
        <Table stickyHeader sx={{ minWidth: 650, overflow: 'auto' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {assessments.head.map((el, idx) => (
                <TableCell key={`${el}-${idx}`} sx={{ fontWeight: 'bold' }}>
                  {el}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {assessments.body.map((row, groupIndex) => (
              <>
                <TableRow
                  key={`${row.groupName}-${groupIndex}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, background: '#f4f7fc' }}
                >
                  <TableCell>{row.groupName}</TableCell>
                  {emptyCells.map((el) => (
                    <TableCell key={el} />
                  ))}
                </TableRow>
                {row.skills.map((skill, skillIndex) => {
                  return (
                    <TableRow
                      key={`${skill[0]}-${skillIndex}`}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      {skill.map((level, levelIndex) => {
                        return <TableCell key={`${level}-${levelIndex}`}>{level}</TableCell>;
                      })}
                    </TableRow>
                  );
                })}
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
