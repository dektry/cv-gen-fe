import React from 'react';
import { Avatar, Button, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { GenerateCvHeader } from '../../../../common-components/GenerateCVHeader';
import { useStyles } from './styles';

const { Title } = Typography;

export const CVGenerationHeader = React.memo(() => {
  const classes = useStyles();

  return (
    <div>
      <GenerateCvHeader backPath={'/'} />
      <Title level={2}> Generate CV</Title>
      <div className={classes.avatarAndBtnBox}>
        <Avatar size={64} icon={<UserOutlined />} />
        <Button size="large" type="primary">
          Generate CV
        </Button>
      </div>
    </div>
  );
});
