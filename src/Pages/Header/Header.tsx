import { Typography } from 'antd';
import { ProfilePreview } from 'pages/ProfilePreview';
import { useStyles } from 'pages/Header/styles';
import { useSelector } from 'react-redux';
import { appSelector } from 'store/reducers/app';

const { Title } = Typography;

interface IProps {
  title: string;
}

export const Header = ({ title }: IProps) => {
  const classes = useStyles();
  const { user } = useSelector(appSelector);

  return (
    <div className={classes.pageHeader}>
      <Title level={2} className={classes.title}>
        {title}
      </Title>
      <ProfilePreview chosenUser={user} />
    </div>
  );
};
