import { useSelector } from 'react-redux';
import { levelsSelector } from 'store/reducers/levels';

import { useFormContext, Controller } from 'react-hook-form';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';

import { IFormSkill } from 'models/ISoftSkillsMatrix';

import { SkillGroupField } from 'common-components/SkillGroupField';

import { useStyles } from './styles';
import theme from 'theme/theme';

interface IProps {
  skill: IFormSkill;
  idx: number;
}

export const SoftSkillLevelsTable = ({ skill, idx }: IProps) => {
  const classes = useStyles({ theme });

  const { allLevels } = useSelector(levelsSelector);

  const methods = useFormContext();

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Controller
          name={`matrix.skills.${idx}.value`}
          control={methods.control}
          render={({ field: { value, onChange } }) => <SkillGroupField value={value} onChange={onChange} />}
        />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.headerCell}>Grade</TableCell>
              {allLevels.map((level) => (
                <TableCell key={level.id} className={classes.headerCell} align="left">
                  {level.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {skill.levels?.map((level, levelIndex) => {
              return (
                <TableRow key={`${level.value}-${levelIndex}`} sx={{ border: 0 }}>
                  <TableCell
                    sx={{ maxWidth: '8rem', minWidth: '8rem', wordWrap: 'break-word' }}
                    component="th"
                    scope="row"
                  >
                    {level.value}
                  </TableCell>
                  {allLevels?.map((el, elIndex) => (
                    <TableCell key={`${skill.id}-${el.name}-${elIndex}`}>
                      <Controller
                        name={`matrix.skills.${idx}.levels.${levelIndex}.level_id.id`}
                        control={methods.control}
                        render={({ field: { value, onChange } }) => (
                          <Radio checked={value === el.id} onChange={onChange} value={el.id} name="radio-buttons" />
                        )}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
