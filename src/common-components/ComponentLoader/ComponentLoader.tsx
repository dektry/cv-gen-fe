import { PreLoader } from 'common-components/PreLoader';
import { useStyles } from 'common-components/ComponentLoader/styles';

interface IProps {
  isLoading: boolean;
  children: React.ReactNode;
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
