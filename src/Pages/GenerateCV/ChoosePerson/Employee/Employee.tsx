import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { Form, Input, Image, Button, Space } from 'antd';

import { useAppDispatch } from 'store';
import {
  employeesSelector,
  loadEmployee,
  setEmployee,
  saveChangesToEmployee,
} from 'store/reducers/employees';

import { useStyles } from './styles';
import paths from 'config/routes.json';
import { GenerateCvHeader } from 'CommonComponents/GenerateCVHeader';

export const Employee = () => {
  const { id } = useParams<{ id: string }>();
  const [isChanged, setIsChanged] = useState(false);

  const classes = useStyles();

  const dispatch = useAppDispatch();
  const { currentEmployee } = useSelector(employeesSelector);

  useEffect(() => {
    if(id) {
      dispatch(loadEmployee(id));
    }
  }, [id, dispatch]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const modifiedEmployee = {
        ...currentEmployee,
        [e.target.name]: e.target.value,
      };
      dispatch(setEmployee(modifiedEmployee));
      setIsChanged(true);
    },
    [currentEmployee, dispatch],
  );

  const handleEmployeeSave = () => {
    dispatch(saveChangesToEmployee(currentEmployee));
  };

  return (
    <div>
      <GenerateCvHeader backPath={paths.generateCVemployeesList} />
      <div className={classes.avatarContainer}>
        <Image
          className={classes.avatar}
          src={currentEmployee.avatarUrl || ''}
          preview={false}
        />
      </div>
      <Form>
        <Form.Item>
          <Space direction="vertical" className={classes.space}>
            <Input
              name="fullName"
              onChange={handleChange}
              className={classes.nameInput}
              placeholder={'Name'}
              addonBefore="Full Name"
              value={`${currentEmployee.fullName || ''}`}
            />
            <Input
              name="gender"
              onChange={handleChange}
              className={classes.nameInput}
              placeholder={'Gender'}
              addonBefore="Gender"
              value={`${currentEmployee.gender || ''}`}
            />
          </Space>
        </Form.Item>
        <Form.Item>
          <Space direction="vertical" className={classes.space}>
            <Input
              className={classes.input}
              name="email"
              type="email"
              onChange={handleChange}
              placeholder={'Email'}
              addonBefore="Email"
              value={`${currentEmployee.email || ''}`}
            />
            <Input
              className={classes.input}
              name="personalEmail"
              type="personalEmail"
              onChange={handleChange}
              placeholder={'Personal email'}
              addonBefore="Personal email"
              value={`${currentEmployee.personalEmail || ''}`}
            />
          </Space>
          <Space direction="vertical" className={classes.space}>
            <Input
              name="position"
              onChange={handleChange}
              className={classes.input}
              placeholder={'Position'}
              addonBefore="Position"
              value={`${currentEmployee.position || ''}`}
            />
            <Input
              name="level"
              onChange={handleChange}
              className={classes.input}
              placeholder={'Level'}
              addonBefore="Level"
              value={`${currentEmployee.level || ''}`}
            />
          </Space>
        </Form.Item>
        <Form.Item>
          <Space direction="vertical" className={classes.space}>
            <Input
              name="location"
              onChange={handleChange}
              className={classes.input}
              placeholder={'Location'}
              addonBefore="Location"
              value={`${currentEmployee.location || ''}`}
            />
            <Input
              name="mobileNumber"
              onChange={handleChange}
              className={classes.input}
              placeholder={'Mobile number'}
              addonBefore="Mobile number"
              value={`${currentEmployee.mobileNumber || ''}`}
            />
          </Space>
          <Space direction="vertical" className={classes.space}>
            <Input
              name="hiredOn"
              onChange={handleChange}
              className={classes.input}
              placeholder={'Hired on'}
              addonBefore="Hired on"
              value={`${currentEmployee.hiredOn || ''}`}
            />
            <Input
              name="timezone"
              onChange={handleChange}
              className={classes.input}
              placeholder={'Timezone'}
              addonBefore="Timezone"
              value={`${currentEmployee.timezone || ''}`}
            />
          </Space>
        </Form.Item>
        <Form.Item>
          <Space direction="vertical" className={classes.space}>
            <Input
              addonBefore="Skype"
              name="skypeUsername"
              className={classes.input}
              placeholder={'Skype username'}
              value={`${currentEmployee.skypeUsername || ''}`}
            />
            <Input
              addonBefore="Slack"
              name="slackUsername"
              className={classes.input}
              placeholder={'Slack username'}
              value={`${currentEmployee.slackUsername || ''}`}
            />
            <Input
              addonBefore="Twitter"
              name="twitterUsername"
              className={classes.input}
              placeholder={'Twitter username'}
              value={`${currentEmployee.twitterUsername || ''}`}
            />
            <Input
              addonBefore="Facebook"
              name="facebookUrl"
              className={classes.input}
              placeholder={'Facebook URL'}
              value={`${currentEmployee.facebookUrl || ''}`}
            />
            <Input
              addonBefore="Linkedin"
              name="linkedinUrl"
              className={classes.input}
              placeholder={'Linkedin URL'}
              value={`${currentEmployee.linkedinUrl || ''}`}
            />
          </Space>
          <Space direction="vertical" className={classes.space}>
            <Input
              addonBefore="Languages"
              name="languages"
              className={classes.input}
              placeholder={'Languages'}
              value={`${currentEmployee.languages || ''}`}
            />
            <Input
              addonBefore="Education"
              name="education"
              className={classes.input}
              placeholder={'Education'}
              value={`${currentEmployee.formalEducation || ''}`}
            />
          </Space>
        </Form.Item>
        <div className={classes.buttonsContainer}>
          <Button
            className={classes.button}
            htmlType="submit"
            type="primary"
            onClick={handleEmployeeSave}
            disabled={!isChanged}
          >
            Save changes
          </Button>
          <div className={classes.interviewButtons}>
            <Button className={classes.button}>Start tech assessment</Button>
            <Button className={classes.button}>
              Start softskills interview
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};
