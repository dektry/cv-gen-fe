import { PreLoader } from 'components/Molecules/PreLoader/PreLoader';
import { useStyles } from './styles';

interface IProps {
  isLoading: boolean;
  children: any;
  loaderStatus: string;
}

export const ComponentLoader = ({
  isLoading,
  children,
  loaderStatus,
}: IProps) => {
  const classes = useStyles();
  return isLoading ? (
    <div className={classes.loaderContainer}>
      <PreLoader className={classes.loader} status={loaderStatus} />
    </div>
  ) : (
    children
  );
};
