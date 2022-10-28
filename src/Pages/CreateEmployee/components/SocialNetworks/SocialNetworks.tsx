import { TextField } from '@mui/material';
import { Typography } from '@mui/material';

import { ICreateEmployee } from 'models/IEmployee';
import { NullableField } from 'models/TNullableField';

import theme from 'theme/theme';
import { useStyles } from '../../styles';

interface IProps {
  skypeUsername: NullableField<string>;
  slackUsername: NullableField<string>;
  twitterUsername: NullableField<string>;
  facebookUrl: NullableField<string>;
  linkedinUrl: NullableField<string>;
  handleChangeInput: (fields: Partial<ICreateEmployee>) => void;
}

export const SocialNetworks = ({
  skypeUsername,
  slackUsername,
  twitterUsername,
  facebookUrl,
  linkedinUrl,
  handleChangeInput,
}: IProps) => {
  const classes = useStyles({ theme });
  return (
    <div>
      <Typography sx={{ mb: '8px' }} variant="h2">
        SOCIAL NETWORKS
      </Typography>
      <div className={classes.gridContainer}>
        <TextField
          value={skypeUsername || ''}
          label={'Skype'}
          name="skypeUsername"
          placeholder={'Add username'}
          onChange={(e) => handleChangeInput({ skypeUsername: e.target.value })}
        />
        <TextField
          value={slackUsername || ''}
          label={'Slack'}
          name="slackUsername"
          placeholder={'Add username'}
          onChange={(e) => handleChangeInput({ slackUsername: e.target.value })}
        />
        <TextField
          value={twitterUsername || ''}
          label={'Twitter'}
          name="twitterUsername"
          placeholder={'Add username'}
          onChange={(e) => handleChangeInput({ twitterUsername: e.target.value })}
        />
        <TextField
          value={facebookUrl || ''}
          label={'Facebook'}
          name="facebookUrl"
          placeholder={'Add link'}
          onChange={(e) => handleChangeInput({ facebookUrl: e.target.value })}
        />
      </div>
      <TextField
        value={linkedinUrl || ''}
        label={'Linkedin'}
        name="linkedinUrl"
        placeholder={'Add link'}
        onChange={(e) => handleChangeInput({ linkedinUrl: e.target.value })}
      />
    </div>
  );
};
