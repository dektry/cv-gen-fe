import { icons } from './icons';

interface IProps {
  iconType: string;
}

export const IconComponent = ({ iconType, ...restProps}: IProps) => {

  // const IconComponent = icons[iconType];

  // TODO: realize IconComponent logic
  return <div {...restProps} />;
}