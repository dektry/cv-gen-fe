import React from 'react';
import { Avatar, Button, Typography } from 'antd';

import { GenerateCvHeader } from '../../../../common-components/GenerateCVHeader';
import { useStyles } from './styles';
import { NullableField } from '../../../../models/TNullableField';

const { Title } = Typography;

interface ICVGenerationHeaderProps {
  avatarUrl: NullableField<string>;
}

export const CVGenerationHeader = React.memo((props: ICVGenerationHeaderProps) => {
  const { avatarUrl } = props;
  const classes = useStyles();

  return (
    <div>
      <GenerateCvHeader />
      <Title level={2}> Generate CV</Title>
      <div className={classes.avatarAndBtnBox}>
        <Avatar size={64} src={avatarUrl} />
        <Button size="large" type="primary">
          Generate CV
        </Button>
      </div>
    </div>
  );
});
