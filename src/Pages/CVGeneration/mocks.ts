import { TProfSkill, TProject } from 'Pages/CVGeneration/CVGenerationPage';

// I believe this list should be stored in the database
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
      {
        name: 'JavaScript',
        level: 'Advanced',
      },
      {
        name: 'TypeScript',
        level: 'Advanced',
      },
      {
        name: 'JavaScript',
        level: 'Advanced',
      },
      {
        name: 'TypeScript',
        level: 'Advanced',
      },
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
      {
        name: 'React',
        level: 'Advanced',
      },
      {
        name: 'Svelte',
        level: 'Advanced',
      },
      {
        name: 'NextJS',
        level: 'Advanced',
      },
      {
        name: 'React Native',
        level: 'God plz no',
      },
      {
        name: 'React',
        level: 'Advanced',
      },
      {
        name: 'Angular',
        level: 'Advanced',
      },
    ],
  },
  {
    groupName: 'You name it!',
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
      {
        name: 'JavaScript',
        level: 'Advanced',
      },
      {
        name: 'TypeScript',
        level: 'Advanced',
      },
      {
        name: 'JavaScript',
        level: 'Advanced',
      },
      {
        name: 'TypeScript',
        level: 'Advanced',
      },
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
  {
    groupName: 'You name it!',
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

export const mockProjects: TProject[] = [
  {
    name: 'Project 1',
    duration: '8 months',
    position: 'Frontend developer',
    teamSize: 3,
    description: mockDescription,
    responsibilities: [
      'Implementing visual component using React React hooks and less',
      'Creating connection to Shopify, google analytics, and Google Ads',
      'Creating components for visual presentation of information using Highcharts (diagrams, maps)',
      'Requirements and estimation Bug fixing.',
    ],
    tools: ['React', 'Redux', 'TypeScript', 'Less', 'Highcharts', 'Shopify', 'Google Analytics', 'Google Ads'],
  },
  {
    name: 'Project 1',
    duration: '8 months',
    position: 'Frontend developer',
    teamSize: 3,
    description: mockDescription,
    responsibilities: [
      'Implementing visual component using React React hooks and less',
      'Creating connection to Shopify, google analytics, and Google Ads',
      'Creating components for visual presentation of information using Highcharts (diagrams, maps)',
      'Requirements and estimation Bug fixing.',
    ],
    tools: ['React', 'Redux', 'TypeScript', 'Less', 'Highcharts', 'Shopify', 'Google Analytics', 'Google Ads'],
  },
  {
    name: 'Project 1',
    duration: '8 months',
    position: 'Frontend developer',
    teamSize: 3,
    description: mockDescription,
    responsibilities: [
      'Implementing visual component using React React hooks and less',
      'Creating connection to Shopify, google analytics, and Google Ads',
      'Creating components for visual presentation of information using Highcharts (diagrams, maps)',
      'Requirements and estimation Bug fixing.',
    ],
    tools: ['React', 'Redux', 'TypeScript', 'Less', 'Highcharts', 'Shopify', 'Google Analytics', 'Google Ads'],
  },
  {
    name: 'Project 1',
    duration: '8 months',
    position: 'Frontend developer',
    teamSize: 3,
    description:
      'It is a long-established fact that a reader will be distracted by the readable content of a page when looking at ',
    responsibilities: [
      'Implementing visual component using React React hooks and less',
      'Creating connection to Shopify, google analytics, and Google Ads',
      'Requirements and estimation Bug fixing.',
    ],
    tools: ['React', 'Redux', 'TypeScript', 'Less', 'Highcharts', 'Google Ads'],
  },
  {
    name: 'Project 1',
    duration: '8 months',
    position: 'Frontend developer',
    teamSize: 3,
    description:
      'It is a long-established fact that a reader will be distracted by the readable content of a page when looking at ',
    responsibilities: [
      'Implementing visual component using React React hooks and less',
      'Creating connection to Shopify, google analytics, and Google Ads',
      'Requirements and estimation Bug fixing.',
    ],
    tools: ['React', 'Redux', 'TypeScript', 'Less', 'Highcharts', 'Google Ads'],
  },
];
