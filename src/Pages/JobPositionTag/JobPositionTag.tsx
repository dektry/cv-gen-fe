import { Tag } from 'antd';
import classNames from 'classnames';
import { defaultUserColor, NONE } from 'pages/JobPositionTag/utils/constants';
import { useStyles } from './styles';
import { IDBPosition } from 'models/IUser';

interface IProps {
  position?: IDBPosition;
  className?: string;
}

export const JobPositionTag = ({ position, className }: IProps) => {
  const roleColor = position?.group?.color || defaultUserColor;
  const classes = useStyles();
  return (
    <>
      <Tag color={roleColor} className={classNames(classes.tag, className)}>
        {position?.name || NONE}
      </Tag>
    </>
  );
};
