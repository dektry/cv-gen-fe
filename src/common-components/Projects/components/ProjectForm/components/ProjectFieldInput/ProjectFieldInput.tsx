import { TextField } from '@mui/material';

interface IProps {
  value?: string | string[] | number;
  fieldName: string;
  id?: string;
  type?: string;
  placeholder: string;
  label: string;
  multiline: boolean;
  onChange: {
    (e: React.ChangeEvent<HTMLElement>): void;
    <T = string | React.ChangeEvent<HTMLElement>>(field: T): T extends React.ChangeEvent<HTMLElement>
      ? void
      : (e: string | React.ChangeEvent<HTMLElement>) => void;
  };
  onBlur: {
    (e: React.FocusEvent<HTMLElement, Element>): void;
    <T = HTMLElement>(fieldOrEvent: T): T extends string ? (e: HTMLElement) => void : void;
  };
  touched: boolean | undefined;
  error: string | string[] | undefined;
}
export const ProjectFieldInput = ({
  value,
  fieldName,
  type,
  placeholder,
  label,
  multiline,
  onChange,
  onBlur,
  error,
  touched,
}: IProps) => {
  return (
    <TextField
      multiline={multiline}
      label={label}
      type={type}
      placeholder={placeholder}
      name={fieldName}
      error={!!(error && touched)}
      helperText={error}
      onChange={(e) => onChange(e)}
      value={value}
      onBlur={onBlur}
    />
  );
};
