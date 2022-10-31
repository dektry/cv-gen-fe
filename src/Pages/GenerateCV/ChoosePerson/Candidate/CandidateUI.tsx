import React from 'react';

import { Form, Input, Button, Typography, Space, Spin } from 'antd';

import paths from 'config/routes.json';
import { Languages, LanguageLevels } from '../../utils/constants';

import { GenerateCvHeader } from 'common-components/GenerateCVHeader';
import { ButtonWithLink } from 'common-components/ButtonWithLink';
import { GenerateCV } from '../../common-components/GenerateCv';

import { ICandidate } from 'models/ICandidate';
import { useStyles } from './styles';

interface ICandidateProps {
  currentCandidate: ICandidate;
  candidateId: string | undefined;
  isEdited: boolean;
  isLoading: boolean;
  isChanged: boolean;
  handleClickEdit: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCandidateSave: () => void;
}

export const CandidateUI = ({
  isEdited,
  isChanged,
  candidateId,
  isLoading,
  handleClickEdit,
  handleCandidateSave,
  handleChange,
  currentCandidate,
}: ICandidateProps) => {
  const classes = useStyles();

  return (
    <>
      <GenerateCV />
      <div>
        <GenerateCvHeader backPath={paths.candidateList} />
        <Form className={classes.form}>
          <Button className={classes.editButton} onClick={handleClickEdit}>
            {isEdited ? 'Disable edit' : 'Edit'}
          </Button>
          <Form.Item>
            <Input
              name="fullName"
              onChange={handleChange}
              className={classes.nameInput}
              placeholder={'Name'}
              addonBefore="Full Name"
              value={`${currentCandidate.fullName || ''}`}
              disabled={!isEdited}
            />
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
                value={`${currentCandidate.email || ''}`}
                disabled={!isEdited}
              />
              <Input
                name="position"
                onChange={handleChange}
                className={classes.input}
                placeholder={'Position'}
                addonBefore="Position"
                value={`${currentCandidate.position || ''}`}
                disabled={!isEdited}
              />
            </Space>
            <Space direction="vertical" className={classes.space}>
              <Input
                name="level"
                onChange={handleChange}
                className={classes.input}
                placeholder={'Level'}
                addonBefore="Level"
                value={`${currentCandidate.level || ''}`}
                disabled={!isEdited}
              />
              {currentCandidate.location && (
                <Input
                  name="location"
                  onChange={handleChange}
                  className={classes.input}
                  placeholder={'Location'}
                  addonBefore="Location"
                  value={`${currentCandidate.location}`}
                  disabled={!isEdited}
                />
              )}
            </Space>
          </Form.Item>
          <Form.Item>
            <Input
              className={classes.input}
              placeholder={'Experience'}
              addonBefore="Experience in years"
              value={`${currentCandidate?.yearsOfExperience || ''}`}
              disabled={!isEdited}
            />
          </Form.Item>
          {currentCandidate?.languages && (
            <Form.Item>
              <Typography.Title level={5}>Languages</Typography.Title>
              {currentCandidate.languages.map((language) => {
                if (Languages[language.code] && LanguageLevels[language.level]) {
                  return (
                    <Input
                      name="languages"
                      key={language.code}
                      className={classes.input}
                      placeholder={'Languages'}
                      value={`${Languages[language.code]} - ${LanguageLevels[language.level]}`}
                      disabled={!isEdited}
                    />
                  );
                }
              })}
            </Form.Item>
          )}
          {currentCandidate?.education && (
            <Form.Item>
              <Typography.Title level={5}>Education</Typography.Title>
              {currentCandidate.education.map((school) => {
                return (
                  <Input
                    key={school.name}
                    name="education"
                    className={classes.input}
                    placeholder={'Education'}
                    value={`${school.name} (${school.from_year} - ${school.to_year})`}
                    disabled={!isEdited}
                  />
                );
              })}
            </Form.Item>
          )}
          <Button className={classes.button} disabled={!isEdited}>
            +
          </Button>
          <div className={classes.buttonsContainer}>
            {!isLoading ? (
              <Button
                className={classes.button}
                htmlType="submit"
                type="primary"
                onClick={handleCandidateSave}
                disabled={!isChanged}
              >
                Save changes
              </Button>
            ) : (
              <Spin />
            )}

            <div className={classes.interviewButtons}>
              <div style={{ width: '100%' }}>
                <ButtonWithLink id={candidateId} path={paths.technicalInterview} text="Start tech interview    " />
              </div>
              <div style={{ width: '100%' }}>
                <ButtonWithLink id={candidateId} path={paths.softSkillsInterview} text="Start softskills interview" />
              </div>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};
