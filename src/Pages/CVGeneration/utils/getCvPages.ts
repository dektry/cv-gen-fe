import { CvInfo, TProfSkill } from 'Pages/CVGeneration/CVGenerationPage';
import { SoftSkills } from 'Pages/CVGeneration/components/CVGenerationInfo';

export const getCvPages = (cvInfo: CvInfo, templates: { [name: string]: HandlebarsTemplateDelegate }) => {
  console.log('getCvPages');
  const result: string[] = [];

  if (cvInfo.profSkills) {
    const { profSkillsOnIntroPage, nextPageStart } = countProfSkillsOnIntroPage(
      templates['v2-intro'],
      'firstName',
      cvInfo.description + cvInfo.description + cvInfo.description,
      cvInfo.softSkills,
      cvInfo.profSkills
    );

    console.log({ profSkillsOnIntroPage, nextPageStart });
  }

  return result;
};

const countProfSkillsOnIntroPage = (
  template: HandlebarsTemplateDelegate,
  firstName: string,
  description: string,
  softSkills: SoftSkills[],
  profSkills: TProfSkill[]
): { profSkillsOnIntroPage: TProfSkill[]; nextPageStart: { group: number; skill: number | null } } => {
  const profSkillGroupHeight = 19 + 12; // 19 - height of prof skill group, 12 - margin bottom
  const profSkillLineHeight = 23 + 12; // 23 - height of prof skill line, 12 - margin bottom

  const body = document.body;
  const div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.visibility = 'hidden';
  div.innerHTML = template({ firstName, description, softSkills });

  // create hidden div with template, which will be used to count height of prof skills
  body.appendChild(div);

  let availableSpace =
    document.getElementsByClassName('second-column')[0].clientHeight -
    document.getElementsByClassName('without-prof-skills')[0].clientHeight;

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
      if (availableSpace < profSkillLineHeight) {
        break;
      }
      availableSpace -= profSkillLineHeight;

      result[result.length - 1].skills.push(profSkills[i].skills[j]);

      group = i;
      skill = ++j;
    }
  }

  div.remove();

  return { profSkillsOnIntroPage: result, nextPageStart: { group, skill } };
};
