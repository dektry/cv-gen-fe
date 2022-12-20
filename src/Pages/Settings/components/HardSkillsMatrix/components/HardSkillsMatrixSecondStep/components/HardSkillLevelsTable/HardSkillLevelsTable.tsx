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
  const classes = useStyles({ theme });

  const { allLevels } = useSelector(levelsSelector);

  const methods = useFormContext();

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
                  <TableCell component="th" scope="row">
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
                          <CustomSelect options={levelsOptions} value={value} onChange={onChange} />
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
