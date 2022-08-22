import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { cloneDeep } from 'lodash';

import { useSelector } from 'react-redux';
import { Form, Input, Button, Typography, Space } from 'antd';

import { useAppDispatch } from 'store';
import { loadInterviewResult } from 'store/reducers/interview';
import { loadPositions } from 'store/reducers/positions';
import { loadLevels } from 'store/reducers/levels';
import {
  loadSoftSkillsList,
  loadSoftSkillInterview,
} from 'store/reducers/softskillsInterview';
import {
  loadOneCandidate,
  candidatesSelector,
  setCandidate,
  setCandidatesIsLoading,
} from 'store/reducers/candidates';

import paths from 'config/routes.json';
import { Languages, LanguageLevels } from '../../utils/constants';

import { GenerateCvHeader } from 'common-components/GenerateCVHeader';
import { ICandidate } from 'models/ICandidate';
import { updateCandidate } from 'actions/candidate';
import { useStyles } from 'pages/GenerateCV/ChoosePerson/Candidate/styles';
// TODO: implement loader logic

function cleanCandidateFields(
  candidate: Partial<ICandidate>,
): Partial<ICandidate> {
  const copy = cloneDeep(candidate);
  delete copy.languages;
  delete copy.education;
  delete copy.experience;
  delete copy.yearsOfExperience;

  return copy;
}

export const Candidate = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [isChanged, setIsChanged] = useState(false);
  const { currentCandidate, isLoading } = useSelector(candidatesSelector);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      dispatch(loadOneCandidate(id));
      dispatch(loadSoftSkillInterview(id));
      dispatch(loadInterviewResult(id));
    }

    dispatch(setCandidatesIsLoading(true));
    dispatch(loadPositions());
    dispatch(loadLevels());
    dispatch(loadSoftSkillsList());
    dispatch(setCandidatesIsLoading(true));
  }, [dispatch, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const modifiedCandidate = {
      ...currentCandidate,
      [e.target.name]: e.target.value,
    };
    dispatch(setCandidate(modifiedCandidate));
    setIsChanged(true);
  };

  const handleCandidateSave = async () => {
    const candidateToSave = cleanCandidateFields(currentCandidate);
    await updateCandidate(candidateToSave);
    setIsChanged(false);
  };

  return (
    <div>
      <GenerateCvHeader backPath={paths.generateCVcandidateList} />
        <Form className={classes.form}>
          <Form.Item>
            <Input
              name="fullName"
              onChange={handleChange}
              className={classes.nameInput}
              placeholder={'Name'}
              addonBefore="Full Name"
              value={`${currentCandidate.fullName || ''}`}
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
              />
              <Input
                name="position"
                onChange={handleChange}
                className={classes.input}
                placeholder={'Position'}
                addonBefore="Position"
                value={`${currentCandidate.position || ''}`}
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
              />
              {currentCandidate.location && (
                <Input
                  name="location"
                  onChange={handleChange}
                  className={classes.input}
                  placeholder={'Location'}
                  addonBefore="Location"
                  value={`${currentCandidate.location}`}
                />
              )}
            </Space>
          </Form.Item>
          <Form.Item>
            <Input
              className={classes.input}
              placeholder={'Experience'}
              addonBefore="Experience in years"
              value={`${currentCandidate.yearsOfExperience || ''}`}
            />
          </Form.Item>
          {currentCandidate.languages[0] && (
            <Form.Item>
              <Typography.Title level={5}>Languages</Typography.Title>
              {currentCandidate.languages.map(language => {
                if (
                  Languages[language.code] &&
                  LanguageLevels[language.level]
                ) {
                  return (
                    <Input
                      name="languages"
                      key={language.code}
                      className={classes.input}
                      placeholder={'Languages'}
                      value={`${Languages[language.code]} - ${
                        LanguageLevels[language.level]
                      }`}
                    />
                  );
                }
              })}
            </Form.Item>
          )}
          {currentCandidate.education[0] && (
            <Form.Item>
              <Typography.Title level={5}>Education</Typography.Title>
              {currentCandidate.education.map(school => {
                return (
                  <Input
                    key={school.name}
                    name="education"
                    className={classes.input}
                    placeholder={'Education'}
                    value={`${school.name} (${school.from_year} - ${school.to_year})`}
                  />
                );
              })}
            </Form.Item>
          )}
          <Button className={classes.button}>+</Button>
          <div className={classes.buttonsContainer}>
            <Button
              className={classes.button}
              htmlType="submit"
              type="primary"
              onClick={handleCandidateSave}
              disabled={!isChanged}
            >
              Save changes
            </Button>
            <div className={classes.interviewButtons}>
              <Button className={classes.button}>
                <Link
                  to={paths.generateCVtechnicalInterview.replace(':id', id ? id : '')}
                >
                  Start tech interview
                </Link>
              </Button>
              <Button className={classes.button}>
                <Link
                  to={paths.generateCVsoftskillsInterview.replace(':id', id ? id : '')}
                >
                  Start softskills interview
                </Link>
              </Button>
            </div>
          </div>
        </Form>
    </div>
  );
};
