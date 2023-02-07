import { useEffect } from 'react';
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

import { IFormSkillGroup } from 'models/IHardSkillsMatrix';

import { CustomSelect } from 'common-components/CustomSelect';
import { SkillGroupField } from 'common-components/SkillGroupField';

import { useStyles } from './styles';
import theme from 'theme/theme';
import { getSkillLevels } from 'store/reducers/hardSkillsMatrix/thunks';
import { useAppDispatch } from 'store';
import { hardSkillLevelsSelector } from 'store/reducers/hardSkillsMatrix';

interface IProps {
  skillGroup: IFormSkillGroup;
  idx: number;
}

export const HardSkillLevelsTable = ({ skillGroup, idx }: IProps) => {
  const classes = useStyles({ theme });
  const dispatch = useAppDispatch();

  const { allLevels } = useSelector(levelsSelector);
  const skillLevels = useSelector(hardSkillLevelsSelector);

  const methods = useFormContext();

  useEffect(() => {
    dispatch(getSkillLevels());
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Controller
          name={`matrix.skillGroups.${idx}.value`}
          control={methods.control}
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
            {skillGroup.skills?.map((skill, skillIndex) => {
              const data = skill.grades ? skill.grades : skill.levels;
              return (
                <TableRow key={skill.value} sx={{ border: 0 }}>
                  <TableCell
                    sx={{ maxWidth: '8rem', minWidth: '8rem', wordWrap: 'break-word' }}
                    component="th"
                    scope="row"
                  >
                    {skill.value}
                  </TableCell>
                  {data?.map((el, elIndex) => (
                    <TableCell key={`${el.value}-${elIndex}`}>
                      <Controller
                        name={
                          skill.grades
                            ? `matrix.skillGroups.${idx}.skills.${skillIndex}.grades.${elIndex}.value`
                            : `matrix.skillGroups.${idx}.skills.${skillIndex}.levels.${elIndex}.value`
                        }
                        control={methods.control}
                        render={({ field: { value, onChange } }) => (
                          <CustomSelect
                            sx={{ width: '8rem' }}
                            options={skillLevels}
                            value={value}
                            onChange={onChange}
                          />
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
