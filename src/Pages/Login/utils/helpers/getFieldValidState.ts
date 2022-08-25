export type message_type = '' | 'error' | 'success' | 'warning' | 'validating';

export const getFieldValidState = (fieldValue: string, fieldErrors: any): message_type => {
  if (fieldErrors?.type && fieldValue) {
    return 'error';
  }
  if (!fieldErrors?.type && fieldValue) {
    return 'success';
  }
  return 'warning';
};
