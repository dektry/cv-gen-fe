import { Link, generatePath } from 'react-router-dom';

import Button from 'antd/lib/button';

import { ICandidate } from 'models/ICandidate';

import { useStyles } from 'common-components/ButtonWithLink/styles';

interface IProps {
  candidate: ICandidate;
  path: string;
  text: string;
}

export const ButtonWithLink = ({ candidate, path, text }: IProps) => {
  const classes = useStyles();

  return (
    <div className={classes.buttonsContainer}>
      <Button className={classes.linkToResults}>
        <Link
          to={generatePath(path, {
            id: candidate.id,
          })}
        >
          {text}
        </Link>
      </Button>
    </div>
  );
};
