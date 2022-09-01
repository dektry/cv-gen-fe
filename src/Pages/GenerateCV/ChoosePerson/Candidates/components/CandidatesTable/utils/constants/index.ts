import { ICandidate } from 'models/ICandidate';

export const CANDIDATE_TABLE_KEYS = {
  id: 'id',
  fullName: 'fullName',
  position: 'position',
  level: 'level',
  location: 'location',
};

export const defaultCandidate: ICandidate = {
  id: '1111',
  pfId: 0,
  pfUpdatedAt: '1970-12-31T14:47:14.306Z',
  fullName: '',
  position: null,
  level: null,
  location: null,
  timezone: null,
  languages: [
    {
      id: null,
      code: '',
      level: '',
    },
  ],
  education: [
    {
      id: null,
      pfId: 0,
      school: '',
      name: '',
      from_year: 0,
      to_year: null,
      subject: '',
      description: '',
    },
  ],
  experience: [
    {
      id: null,
      pfId: 0,
      title: '',
      company: '',
      starts_on: '1970-12-31T00:00:00.000Z',
      ends_on: null,
      location: '',
      description: '',
    },
  ],
};

export const defaultPageSize = 10;
export const defaultCurrentPage = 1;

export const GET_CANDIDATES = 'Get candidates...';

export const articlePageSizeOptions = ['5', '10', '20', '50'];

export const CANDIDATES = {
  TITLE: 'Candidates',
  FULLNAME: 'Full Name',
  POSITION: 'Position',
  LEVEL: 'Level',
  LOCATION: 'Location',
};
