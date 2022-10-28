import React from 'react';
import { AsyncThunk } from '@reduxjs/toolkit';
import { generatePath } from 'react-router-dom';

import { Form, Input, Image, Button, Space, Spin } from 'antd';

import { EmployeeHeader } from 'Pages/GenerateCV/common-components/EmployeeHeader';
import { Projects } from 'common-components/Projects';

import { IEmployee } from 'models/IEmployee';
import { IProject, IProjectFromDB } from 'models/IProject';

import paths from 'config/routes.json';

import { useStyles } from './styles';

interface IEmployeeProps {
  currentEmployee: IEmployee;
  employeeId: string | undefined;
  isEdited: boolean;
  isLoading: boolean;
  isChanged: boolean;
  handleClickEdit: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmployeeSave: () => void;
  handleUpdateProject: (dispatcher: AsyncThunk<void, IProjectFromDB, Record<string, never>>, project: IProject) => void;
  projects: IProject[] | [];
}

export const EmployeeUI = ({
  isEdited,
  isChanged,
  isLoading,
  handleClickEdit,
  handleEmployeeSave,
  handleChange,
  currentEmployee,
  employeeId,
  handleUpdateProject,
  projects,
}: IEmployeeProps) => {
  const classes = useStyles();

  const personalData = {
    fullName: currentEmployee.fullName,
    location: currentEmployee.location,
    position: currentEmployee.position,
    level: currentEmployee.level,
  };

  const backPath = generatePath(paths.employeesList);

  return (
    <>
      <EmployeeHeader personalData={personalData} backPath={backPath} />
      <div>
        <Button className={classes.editButton} onClick={handleClickEdit}>
          {isEdited ? 'Disable edit' : 'Edit'}
        </Button>
        <div className={classes.avatarContainer}>
          <Image className={classes.avatar} src={currentEmployee.avatarUrl || ''} preview={false} />
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
                disabled={!isEdited}
              />
              <Input
                name="gender"
                onChange={handleChange}
                className={classes.nameInput}
                placeholder={'Gender'}
                addonBefore="Gender"
                value={`${currentEmployee.gender || ''}`}
                disabled={!isEdited}
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
                disabled={!isEdited}
              />
              <Input
                className={classes.input}
                name="personalEmail"
                type="personalEmail"
                onChange={handleChange}
                placeholder={'Personal email'}
                addonBefore="Personal email"
                value={`${currentEmployee.personalEmail || ''}`}
                disabled={!isEdited}
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
                disabled={!isEdited}
              />
              <Input
                name="level"
                onChange={handleChange}
                className={classes.input}
                placeholder={'Level'}
                addonBefore="Level"
                value={`${currentEmployee.level || ''}`}
                disabled={!isEdited}
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
                disabled={!isEdited}
              />
              <Input
                name="mobileNumber"
                onChange={handleChange}
                className={classes.input}
                placeholder={'Mobile number'}
                addonBefore="Mobile number"
                value={`${currentEmployee.mobileNumber || ''}`}
                disabled={!isEdited}
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
                disabled={!isEdited}
              />
              <Input
                name="timezone"
                onChange={handleChange}
                className={classes.input}
                placeholder={'Timezone'}
                addonBefore="Timezone"
                value={`${currentEmployee.timezone || ''}`}
                disabled={!isEdited}
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
                disabled={!isEdited}
              />
              <Input
                addonBefore="Slack"
                name="slackUsername"
                className={classes.input}
                placeholder={'Slack username'}
                value={`${currentEmployee.slackUsername || ''}`}
                disabled={!isEdited}
              />
              <Input
                addonBefore="Twitter"
                name="twitterUsername"
                className={classes.input}
                placeholder={'Twitter username'}
                value={`${currentEmployee.twitterUsername || ''}`}
                disabled={!isEdited}
              />
              <Input
                addonBefore="Facebook"
                name="facebookUrl"
                className={classes.input}
                placeholder={'Facebook URL'}
                value={`${currentEmployee.facebookUrl || ''}`}
                disabled={!isEdited}
              />
              <Input
                addonBefore="Linkedin"
                name="linkedinUrl"
                className={classes.input}
                placeholder={'Linkedin URL'}
                value={`${currentEmployee.linkedinUrl || ''}`}
                disabled={!isEdited}
              />
            </Space>
            <Space direction="vertical" className={classes.space}>
              <Input
                addonBefore="Languages"
                name="languages"
                className={classes.input}
                placeholder={'Languages'}
                value={`${currentEmployee.languages || ''}`}
                disabled={!isEdited}
              />
              <Input
                addonBefore="Education"
                name="education"
                className={classes.input}
                placeholder={'Education'}
                value={`${currentEmployee.formalEducation || ''}`}
                disabled={!isEdited}
              />
            </Space>
          </Form.Item>
          <Projects employeeId={employeeId || ''} handleUpdateProject={handleUpdateProject} projects={projects} />
          <div className={classes.buttonsContainer}>
            {!isLoading ? (
              <Button
                className={classes.button}
                htmlType="submit"
                type="primary"
                onClick={handleEmployeeSave}
                disabled={!isChanged}
              >
                Save changes
              </Button>
            ) : (
              <Spin />
            )}
          </div>
        </Form>
      </div>
    </>
  );
};
