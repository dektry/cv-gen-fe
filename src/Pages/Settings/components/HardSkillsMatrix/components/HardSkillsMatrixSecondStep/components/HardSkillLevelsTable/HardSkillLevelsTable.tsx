import { useEffect } from 'react';

import { useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import { levelsSelector, loadLevels } from 'store/reducers/levels';

import { useFormContext, Controller } from 'react-hook-form';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { IFormSkillGroup } from 'models/IHardSkillsMatrix';
import { LevelTypesEnum } from 'models/IInterview';

import { CustomSelect } from 'common-components/CustomSelect';
import { SkillGroupField } from 'common-components/SkillGroupField';

import { useStyles } from './styles';
import theme from 'theme/theme';

const levelsOptions = Object.values(LevelTypesEnum).map((level) => ({
  label: level,
  value: level,
}));

interface IProps {
  skillGroup: IFormSkillGroup;
  idx: number;
}

export const HardSkillLevelsTable = ({ skillGroup, idx }: IProps) => {
  const dispatch = useAppDispatch();

  const classes = useStyles({ theme });

  const { allLevels } = useSelector(levelsSelector);

  const { control } = useFormContext();

  useEffect(() => {
    dispatch(loadLevels());
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Controller
          name={`skillGroups.${idx}.value`}
          control={control}
          render={({ field: { value, onChange } }) => <SkillGroupField value={value} onChange={onChange} />}
        />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.headerCell}>Skill</TableCell>
              {allLevels.map((level) => (
                <TableCell key={level.id} className={classes.headerCell} align="left">
                  {level.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {skillGroup.skills?.map((skill, skillIndex) => (
              <TableRow key={skill.value} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {skill.value}
                </TableCell>
                {skill.grades?.map((grade, gradeIndex) => (
                  <TableCell key={grade.levelId}>
                    <Controller
                      name={`skillGroups.${idx}.skills.${skillIndex}.grades.${gradeIndex}.value`}
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <CustomSelect options={levelsOptions} value={value} onChange={onChange} />
                      )}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
