import { useStyles } from './styles';

export const HomePage = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        There will be home page
      </div>
    </>
  );
};
