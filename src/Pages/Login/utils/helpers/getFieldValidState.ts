export const getFieldValidState = (
  fieldValue: string,
  fieldErrors: any
): '' | 'error' | 'success' | 'warning' | 'validating' => {
  if (fieldErrors?.type && fieldValue) {
    return 'error';
  }
  if (!fieldErrors?.type && fieldValue) {
    return 'success';
  }
  return 'warning';
};
