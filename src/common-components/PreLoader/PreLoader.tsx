import { Spin } from 'antd';
import classNames from 'classnames';
import { useStyles } from 'common-components/PreLoader/styles';

interface IProps {
  status?: string;
  className?: string;
}

export const PreLoader = ({ status, className }: IProps) => {
  const classes = useStyles();
  return (
    <div className={classNames(classes.spinner, 'spinner', className)}>
      <Spin size="large" tip={status || 'Loading...'} />
    </div>
  );
};
