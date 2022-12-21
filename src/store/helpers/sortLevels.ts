import { IDBLevels } from 'models/IUser';
import { ILevel } from 'models/IHardSkillsMatrix';

interface IOrder {
  [key: string]: number;
}

const order: IOrder = {
  Trainee: 1,
  Junior: 2,
  'Regular (Junior+)': 3,
  Middle: 4,
  'Middle+': 5,
  Senior: 6,
  Lead: 7,
  default: 100,
};

export const sortLevels = (levels: IDBLevels[]) => {
  levels.sort((a, b) => {
    return a && a.name && b && b.name ? (order[a.name] || order.default) - (order[b.name] || order.default) : 1;
  });

  return levels;
};

export const sortSkillLevels = (levels: ILevel[]) => {
  levels.sort((a, b) => {
    return a && a.level_id.name && b && b.level_id.name
      ? (order[a.level_id.name] || order.default) - (order[b.level_id.name] || order.default)
      : 1;
  });

  return levels;
};
