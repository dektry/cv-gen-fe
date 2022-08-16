import { IDBLevels } from '../interfaces/users.interface'

interface IOrder {
  [key: string]: number;
}

export const sortLevels = (levels: IDBLevels[]) => {
  const order: IOrder = {
    Trainee: 0,
    Junior: 1,
    'Regular (Junior+)': 2,
    Middle: 3,
    'Middle+': 4,
    Senior: 5,
    Lead: 6,
    default: 100,
  };

  levels.sort((a, b) => {
    return a && a.name && b && b.name
      ? (order[a.name] || order.default) - (order[b.name] || order.default)
      : 1;
  });

  return levels;
};
