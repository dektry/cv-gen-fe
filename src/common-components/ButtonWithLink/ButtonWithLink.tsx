import { Link, generatePath } from 'react-router-dom';

import Button from 'antd/lib/button';

import { useStyles } from 'common-components/ButtonWithLink/styles';

interface IProps {
  id: string | undefined;
  path: string;
  text: string;
}

export const ButtonWithLink = ({ id, path, text }: IProps) => {
  const classes = useStyles();

  return (
    <div className={classes.buttonsContainer}>
      <Button className={classes.linkToResults}>
        <Link
          to={generatePath(path, {
            id: id ?? '',
          })}
        >
          {text}
        </Link>
      </Button>
    </div>
  );
};
