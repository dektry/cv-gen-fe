import { message } from 'antd';

import { CvInfo, TProfSkill, TProject } from 'Pages/CVGeneration/CVGenerationPage';
import { SoftSkills } from 'Pages/CVGeneration/components/CVGenerationInfo';
import {
  invisibleBorderToWrapWithoutSkills,
  profSkillGroupHeight,
  profSkillLineHeight,
  projectBottomMargin,
  templatePadding,
} from '../constants';

type TNextPageStart = { group: number; skill: number | null };

export const getCvPages = (cvInfoData: CvInfo, templates: { [name: string]: HandlebarsTemplateDelegate }) => {
  let dataForPages: Partial<CvInfo>[] = [];
  const result: string[] = [];

  if (!cvInfoData.profSkills) return result;

  const cvInfo = { ...cvInfoData };

  // due current implementation is not used, but it is needed for future
  // send level label for cv generation
  // cvInfo.profSkills = cloneDeep(cvInfo.profSkills).map((group) => {
  //   group.skills = group.skills.map((skill) => {
  //     skill.level = mockLevels.find((l) => l.value === skill.level)?.label || '';
  //     return skill;
  //   });
  //   return group;
  // });

  try {
    const { profSkillsOnIntroPage, nextPageStart } = countProfSkillsOnIntroPage(
      templates['v2-intro'],
      'firstName',
      cvInfo.description,
      cvInfo.softSkills,
      cvInfo.profSkills,
      cvInfo.position
    );

    dataForPages.push({
      ...cvInfo,
      profSkills: profSkillsOnIntroPage,
    });

    dataForPages = dataForPages.concat(
      groupProfSkillsForPages(templates['v2-prof-skills'], nextPageStart, cvInfo.profSkills)
    );

    dataForPages = dataForPages.concat(groupProjectsForPages(templates['v2-projects'], cvInfo.projects as TProject[]));
  } catch (error) {
    console.error('[CALCULATION_PAGES_AMOUNT_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }

  dataForPages.forEach((data, index) => {
    if (data.firstName) {
      result.push(templates['v2-intro']({ ...data, currentPage: ++index, pageCount: dataForPages.length }));
    } else if (data.profSkills) {
      result.push(templates['v2-prof-skills']({ ...data, currentPage: ++index, pageCount: dataForPages.length }));
    } else if (data.projects) {
      result.push(templates['v2-projects']({ ...data, currentPage: ++index, pageCount: dataForPages.length }));
    }
  });

  return result;
};

const countProfSkillsOnIntroPage = (
  template: HandlebarsTemplateDelegate,
  firstName: string,
  description: string,
  softSkills: SoftSkills[],
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
  let skill = null;

  // count how many prof skills can be placed on intro page
  for (let i = 0; i < profSkills.length; i++) {
    availableSpace -= profSkillGroupHeight;

    if (availableSpace < profSkillLineHeight) {
      break;
    }

    result.push({ ...profSkills[i], skills: [] });

    for (let j = 0; j < profSkills[i].skills.length; j++) {
      if (availableSpace < profSkillLineHeight * 2 && j % 2 === 0) {
        break;
      }
      availableSpace -= profSkillLineHeight;

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
    if (i === group && skill !== null) {
      currentPage.profSkills.push({ skills: [] });
    } else {
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

      if (availableSpace < profSkillLineHeight * 2) {
        availableSpace = availableSpaceOnSinglePage;
        currentPage = { profSkills: [{ skills: [] }] };
        result.push(currentPage as { profSkills: TProfSkill[] });
      }

      availableSpace -= profSkillLineHeight;

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
