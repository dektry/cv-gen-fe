import React from 'react';
import { Input } from 'antd';

import { useStyles } from './styles';

export const CVGenerationInfo = React.memo(() => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.row}>
        <Input
          name="fullName"
          onChange={() => 1}
          placeholder={'Name'}
          addonBefore="Full Name"
          // value={`${currentEmployee.fullName || ''}`}
          // disabled={!isEdited}
        />
        <Input
          name="experience"
          onChange={() => 1}
          placeholder={'years'}
          addonBefore="Experience in years"
          // value={`${currentEmployee.fullName || ''}`}
          // disabled={!isEdited}
        />
      </div>
      <div className={classes.row}>
        <Input
          name="position"
          onChange={() => 1}
          placeholder={'Position'}
          addonBefore="Position"
          // value={`${currentEmployee.position || ''}`}
          // disabled={!isEdited}
        />
        <Input
          name="level"
          onChange={() => 1}
          placeholder={'Level'}
          addonBefore="Level"
          // value={`${currentEmployee.level || ''}`}
          // disabled={!isEdited}
        />
      </div>
      <div className={classes.row}>
        <Input
          name="description"
          onChange={() => 1}
          placeholder={'Description'}
          addonBefore="Description"
          // value={`${currentEmployee.level || ''}`}
          // disabled={!isEdited}
        />
      </div>{' '}
      <div className={classes.row}>
        <Input
          addonBefore="Languages"
          name="languages"
          placeholder={'Languages'}
          // value={`${currentEmployee.languages || ''}`}
          // disabled={!isEdited}
        />
      </div>
      <Input
        addonBefore="Education"
        name="education"
        placeholder={'Education'}
        // value={`${currentEmployee.formalEducation || ''}`}
        // disabled={!isEdited}
      />
      {/*{!isLoading ? (*/}
      {/*  <Button*/}
      {/*    className={classes.button}*/}
      {/*    htmlType="submit"*/}
      {/*    type="primary"*/}
      {/*    onClick={handleEmployeeSave}*/}
      {/*    disabled={!isChanged}*/}
      {/*  >*/}
      {/*    Save changes*/}
      {/*  </Button>*/}
      {/*) : (*/}
      {/*  <Spin />*/}
      {/*)}*/}
    </div>
  );
});
