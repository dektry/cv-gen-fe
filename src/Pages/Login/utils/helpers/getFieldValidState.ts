export type message_type = '' | 'error' | 'success' | 'warning' | 'validating';

// eslint-disable-next-line
export const getFieldValidState = (fieldValue: string, fieldErrors: any): message_type => {
  if (fieldErrors?.type && fieldValue) {
    return 'error';
  }
  if (!fieldErrors?.type && fieldValue) {
    return 'success';
  }
  return 'warning';
};
