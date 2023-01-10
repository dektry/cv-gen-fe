import { TextField } from '@mui/material';
import { Typography } from '@mui/material';

import { useFormContext, Controller } from 'react-hook-form';

import theme from 'theme/theme';
import { useStyles } from '../../styles';

export const SocialNetworks = () => {
  const classes = useStyles({ theme });
  const { control } = useFormContext();
  return (
    <div>
      <Typography sx={{ mb: '8px', mt: '24px' }} variant="h2">
        SOCIAL NETWORKS
      </Typography>
      <div className={classes.gridContainer}>
        <Controller
          name="skypeUsername"
          control={control}
          render={({ field: { value, onChange } }) => (
            <TextField value={value || ''} label={'Skype'} placeholder={'Add username'} onChange={onChange} />
          )}
        />
        <Controller
          name="slackUsername"
          control={control}
          render={({ field: { value, onChange } }) => (
            <TextField value={value || ''} label={'Slack'} placeholder={'Add username'} onChange={onChange} />
          )}
        />
        <Controller
          name="twitterUsername"
          control={control}
          render={({ field: { value, onChange } }) => (
            <TextField value={value || ''} label={'Twitter'} placeholder={'Add username'} onChange={onChange} />
          )}
        />
        <Controller
          name="twitterUsername"
          control={control}
          render={({ field: { value, onChange } }) => (
            <TextField
              value={value || ''}
              label={'Facebook'}
              name="facebookUrl"
              placeholder={'Add link'}
              onChange={onChange}
            />
          )}
        />
      </div>
      <Controller
        name="linkedinUrl"
        control={control}
        render={({ field: { value, onChange } }) => (
          <TextField value={value || ''} label={'Linkedin'} placeholder={'Add link'} onChange={onChange} />
        )}
      />
    </div>
  );
};
