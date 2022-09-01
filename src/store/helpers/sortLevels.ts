import { IDBLevels } from 'models/IUser'

interface IOrder {
  [key: string]: number;
}

export const sortLevels = (levels: IDBLevels[]) => {
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

  levels.sort((a, b) => {
    return a && a.name && b && b.name
      ? (order[a.name] || order.default) - (order[b.name] || order.default)
      : 1;
  });

  return levels;
};
