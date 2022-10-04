// I believe this list should be stored in the database
import { TProfSkill } from 'Pages/CVGeneration/CVGenerationPage';

export const mockSoftSkillsOptions = [
  'Responsibility',
  'Teamwork',
  'Communication',
  'Sociability',
  'Leadership',
  'Punctuality',
  'Confidence',
  'Resilience',
  'Collaboration',
  'Time management',
  'Discipline',
  'Creativity',
];

export const mockDescription =
  "It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here'.";

export const profSkillsMock: TProfSkill[] = [
  {
    groupName: 'Programming languages',
    skills: [
      {
        name: 'JavaScript',
        level: 'Advanced',
      },
      {
        name: 'TypeScript',
        level: 'Advanced',
      },
    ],
  },
  {
    groupName: 'Frameworks',
    skills: [
      {
        name: 'React',
        level: 'Advanced',
      },
      {
        name: 'Angular',
        level: 'Advanced',
      },
      {
        name: 'NestJS',
        level: 'Advanced',
      },
      {
        name: 'React Native',
        level: 'God plz no',
      },
    ],
  },
];
