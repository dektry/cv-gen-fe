import { message } from 'antd';

import { CvInfoForm, ICvProject, ICvProfSkill, IProfSkill } from 'models/ICVGeneration';
import {
  invisibleBorderToWrapWithoutSkills,
  profSkillGroupHeight,
  profSkillLineHeight,
  projectBottomMargin,
  templatePadding,
} from '../constants';
import { formatEducationBeforeCvGen } from 'Pages/CVGeneration/utils/formatEducationBeforeCvGen';
import { IProject } from 'models/IProject';

type TNextPageStart = { group: number; skill: number };

export const getCvPages = (cvInfoData: CvInfoForm, templates: { [name: string]: HandlebarsTemplateDelegate }) => {
  let dataForPages: Partial<CvInfoForm>[] = [];
  const result: string[] = [];

  if (!cvInfoData.profSkills) return result;

  const cvInfo: CvInfoForm = { ...cvInfoData };

  try {
    const { profSkillsOnIntroPage, nextPageStart } = countProfSkillsOnIntroPage(
      templates['v2-intro'],
      cvInfo.firstName || '',
      cvInfo.description || '',
      cvInfo.softSkills || [],
      cvInfo.profSkills || [],
      cvInfo.position || ''
    );

    dataForPages.push({
      ...cvInfo,
      profSkills: profSkillsOnIntroPage,
    });

    if (
      (cvInfo.profSkills?.[nextPageStart.group]?.skills &&
        (cvInfo.profSkills[nextPageStart.group].skills as IProfSkill[]).length - 1 >= nextPageStart.skill &&
        cvInfo.profSkills.length - 1 === nextPageStart.group) ||
      (cvInfo.profSkills && cvInfo.profSkills.length - 1 > nextPageStart.group)
    ) {
      dataForPages = dataForPages.concat(
        groupProfSkillsForPages(templates['v2-prof-skills'], nextPageStart, cvInfo.profSkills)
      );
    }

    if (cvInfo.projects && cvInfo.projects.length > 0)
      dataForPages = dataForPages.concat(
        groupProjectsForPages(templates['v2-projects'], cvInfo.projects as IProject[])
      );
  } catch (error) {
    console.error('[CALCULATION_PAGES_AMOUNT_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }

  dataForPages.forEach((data, index) => {
    if (data.firstName) {
      result.push(
        templates['v2-intro']({
          ...data,
          education: data.education && formatEducationBeforeCvGen(data.education),
          currentPage: ++index,
          pageCount: dataForPages.length,
        })
      );
    } else if (data.profSkills) {
      result.push(templates['v2-prof-skills']({ ...data, currentPage: ++index, pageCount: dataForPages.length }));
    } else if (data.projects && data.projects.length > 0) {
      result.push(templates['v2-projects']({ ...data, currentPage: ++index, pageCount: dataForPages.length }));
    }
  });

  return result;
};

const countProfSkillsOnIntroPage = (
  template: HandlebarsTemplateDelegate,
  firstName: string,
  description: string,
  softSkills: string[],
  profSkills: ICvProfSkill[],
  position: string | null
): { profSkillsOnIntroPage: ICvProfSkill[]; nextPageStart: TNextPageStart } => {
  const body = document.body;
  const div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.visibility = 'hidden';
  div.innerHTML = template({ firstName, description, softSkills, position });

  // create hidden div with template, which will be used to count height of prof skills
  body.appendChild(div);

  let availableSpace =
    document.getElementsByClassName('second-column')[0].clientHeight -
    document.getElementsByClassName('without-prof-skills')[0].clientHeight;

  div.remove();

  const result: ICvProfSkill[] = [];
  let group = 0;
  let skill = 0;

  // count how many prof skills can be placed on intro page
  for (let i = 0; i < profSkills.length; i++) {
    availableSpace -= profSkillGroupHeight;

    if (availableSpace < profSkillLineHeight) {
      break;
    }

    if (profSkills[i]?.skills) {
      result.push({ ...profSkills[i], skills: [] });

      for (let j = 0; j < (profSkills[i].skills as IProfSkill[]).length; j++) {
        if (availableSpace < profSkillLineHeight && j % 2 === 0) {
          break;
        }
        // there are two skills in one line
        if ((j + 1) % 2 !== 0) availableSpace -= profSkillLineHeight;

        if (profSkills[i].skills) {
          result[result.length - 1].skills?.push((profSkills[i].skills as IProfSkill[])[j]);
        }

        group = i;
        skill = j + 1;
      }
    }
  }

  return { profSkillsOnIntroPage: result, nextPageStart: { group, skill } };
};

const groupProfSkillsForPages = (
  template: HandlebarsTemplateDelegate,
  { group, skill }: TNextPageStart,
  profSkills: ICvProfSkill[]
): { profSkills: ICvProfSkill[] }[] => {
  const body = document.body;
  const div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.visibility = 'hidden';
  div.innerHTML = template({});

  // create hidden div with template, which will be used to count height of prof skills
  body.appendChild(div);

  const availableSpaceOnSinglePage =
    document.getElementsByClassName('container')[0].clientHeight -
    2 * templatePadding -
    invisibleBorderToWrapWithoutSkills -
    document.getElementsByClassName('without-prof-skills')[0].clientHeight;
  let availableSpace = availableSpaceOnSinglePage;
  div.remove();

  const result: { profSkills: ICvProfSkill[] }[] = [];
  let currentPage: { profSkills: ICvProfSkill[] } = { profSkills: [] };
  result.push(currentPage as { profSkills: ICvProfSkill[] });

  for (let i = group; i < profSkills.length; i++) {
    // if true - group name was already added to intro page
    if (profSkills[i].skills) {
      if (i === group && (profSkills[i].skills as IProfSkill[])[skill]) {
        currentPage.profSkills.push({ skills: [] });
      } else {
        // if condition above is false - skip current group
        if (i === group) ++i;

        availableSpace -= profSkillGroupHeight;

        if (availableSpace < profSkillLineHeight) {
          availableSpace = availableSpaceOnSinglePage;
          currentPage = { profSkills: [] };
          result.push(currentPage as { profSkills: ICvProfSkill[] });
        }

        currentPage.profSkills.push({ ...profSkills[i], skills: [] });
      }

      for (let j = 0; j < (profSkills[i].skills as IProfSkill[]).length; j++) {
        // if we are on the first page, we need to skip skills, which were already placed on intro page
        if (i == group && skill !== null && j < skill) continue;

        if (availableSpace < profSkillLineHeight) {
          availableSpace = availableSpaceOnSinglePage;
          currentPage = { profSkills: [{ skills: [] }] };
          result.push(currentPage as { profSkills: ICvProfSkill[] });
        }

        // there are two skills in one line
        if ((j + 1) % 2 !== 0) availableSpace -= profSkillLineHeight;

        (currentPage.profSkills[currentPage.profSkills.length - 1].skills as IProfSkill[]).push(
          (profSkills[i].skills as IProfSkill[])[j]
        );
      }
    }
  }

  return result;
};

const groupProjectsForPages = (
  template: HandlebarsTemplateDelegate,
  projects: ICvProject[]
): { projects: ICvProject[] }[] => {
  const body = document.body;
  const div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.visibility = 'hidden';

  div.innerHTML = template({ projects });

  // create hidden div with template, which will be used to count height of prof skills
  body.appendChild(div);

  const availableSpaceOnSinglePage =
    document.getElementsByClassName('container')[0].clientHeight -
    2 * templatePadding -
    invisibleBorderToWrapWithoutSkills -
    document.getElementsByClassName('without-projects')[0].clientHeight;
  let availableSpace = availableSpaceOnSinglePage;

  const projectsElements = document.getElementsByClassName('project-box');
  const projectsElementsHeight = Array.from(projectsElements).map((e) => e.clientHeight + projectBottomMargin);

  div.remove();

  const result: { projects: ICvProject[] }[] = [];
  let currentPage: { projects: ICvProject[] } = { projects: [] };
  result.push(currentPage as { projects: ICvProject[] });

  for (let i = 0; i < projects.length; i++) {
    if (availableSpace < projectsElementsHeight[i]) {
      availableSpace = availableSpaceOnSinglePage;
      currentPage = { projects: [] };
      result.push(currentPage as { projects: ICvProject[] });
    }
    availableSpace -= projectsElementsHeight[i];

    currentPage.projects.push(projects[i]);
  }

  return result;
};
