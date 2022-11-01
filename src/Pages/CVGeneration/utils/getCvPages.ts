import { message } from 'antd';

import { CvInfo, TProfSkill, TProject } from 'Pages/CVGeneration/CVGenerationPage';
import {
  invisibleBorderToWrapWithoutSkills,
  profSkillGroupHeight,
  profSkillLineHeight,
  projectBottomMargin,
  templatePadding,
} from '../constants';
import { formatEducationBeforeCvGen } from 'Pages/CVGeneration/utils/formatEducationBeforeCvGen';

type TNextPageStart = { group: number; skill: number };

export const getCvPages = (cvInfoData: CvInfo, templates: { [name: string]: HandlebarsTemplateDelegate }) => {
  let dataForPages: Partial<CvInfo>[] = [];
  const result: string[] = [];

  if (!cvInfoData.profSkills) return result;

  const cvInfo = { ...cvInfoData };

  try {
    const { profSkillsOnIntroPage, nextPageStart } = countProfSkillsOnIntroPage(
      templates['v2-intro'],
      cvInfo.firstName,
      cvInfo.description,
      cvInfo.softSkills,
      cvInfo.profSkills,
      cvInfo.position
    );

    dataForPages.push({
      ...cvInfo,
      profSkills: profSkillsOnIntroPage,
    });

    if (
      (cvInfo.profSkills.length - 1 === nextPageStart.group &&
        cvInfo.profSkills[nextPageStart.group].skills.length - 1 >= nextPageStart.skill) ||
      cvInfo.profSkills.length - 1 > nextPageStart.group
    ) {
      dataForPages = dataForPages.concat(
        groupProfSkillsForPages(templates['v2-prof-skills'], nextPageStart, cvInfo.profSkills)
      );
    }

    if (cvInfo.projects && cvInfo.projects.length > 0)
      dataForPages = dataForPages.concat(
        groupProjectsForPages(templates['v2-projects'], cvInfo.projects as TProject[])
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
  profSkills: TProfSkill[],
  position: string | null
): { profSkillsOnIntroPage: TProfSkill[]; nextPageStart: TNextPageStart } => {
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

  const result: TProfSkill[] = [];
  let group = 0;
  let skill = 0;

  // count how many prof skills can be placed on intro page
  for (let i = 0; i < profSkills.length; i++) {
    availableSpace -= profSkillGroupHeight;

    if (availableSpace < profSkillLineHeight) {
      break;
    }

    result.push({ ...profSkills[i], skills: [] });

    for (let j = 0; j < profSkills[i].skills.length; j++) {
      if (availableSpace < profSkillLineHeight && j % 2 === 0) {
        break;
      }
      // there are two skills in one line
      if ((j + 1) % 2 !== 0) availableSpace -= profSkillLineHeight;

      result[result.length - 1].skills.push(profSkills[i].skills[j]);

      group = i;
      skill = j + 1;
    }
  }

  return { profSkillsOnIntroPage: result, nextPageStart: { group, skill } };
};

const groupProfSkillsForPages = (
  template: HandlebarsTemplateDelegate,
  { group, skill }: TNextPageStart,
  profSkills: TProfSkill[]
): { profSkills: TProfSkill[] }[] => {
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

  const result: { profSkills: TProfSkill[] }[] = [];
  let currentPage: { profSkills: TProfSkill[] } = { profSkills: [] };
  result.push(currentPage as { profSkills: TProfSkill[] });

  for (let i = group; i < profSkills.length; i++) {
    // if true - group name was already added to intro page
    if (i === group && profSkills[i].skills[skill]) {
      currentPage.profSkills.push({ skills: [] });
    } else {
      // if condition above is false - skip current group
      if (i === group) ++i;

      availableSpace -= profSkillGroupHeight;

      if (availableSpace < profSkillLineHeight) {
        availableSpace = availableSpaceOnSinglePage;
        currentPage = { profSkills: [] };
        result.push(currentPage as { profSkills: TProfSkill[] });
      }

      currentPage.profSkills.push({ ...profSkills[i], skills: [] });
    }

    for (let j = 0; j < profSkills[i].skills.length; j++) {
      // if we are on the first page, we need to skip skills, which were already placed on intro page
      if (i == group && skill !== null && j < skill) continue;

      if (availableSpace < profSkillLineHeight) {
        availableSpace = availableSpaceOnSinglePage;
        currentPage = { profSkills: [{ skills: [] }] };
        result.push(currentPage as { profSkills: TProfSkill[] });
      }

      // there are two skills in one line
      if ((j + 1) % 2 !== 0) availableSpace -= profSkillLineHeight;

      currentPage.profSkills[currentPage.profSkills.length - 1].skills.push(profSkills[i].skills[j]);
    }
  }

  return result;
};

const groupProjectsForPages = (
  template: HandlebarsTemplateDelegate,
  projects: TProject[]
): { projects: TProject[] }[] => {
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

  const result: { projects: TProject[] }[] = [];
  let currentPage: { projects: TProject[] } = { projects: [] };
  result.push(currentPage as { projects: TProject[] });

  for (let i = 0; i < projects.length; i++) {
    if (availableSpace < projectsElementsHeight[i]) {
      availableSpace = availableSpaceOnSinglePage;
      currentPage = { projects: [] };
      result.push(currentPage as { projects: TProject[] });
    }
    availableSpace -= projectsElementsHeight[i];

    currentPage.projects.push(projects[i]);
  }

  return result;
};
