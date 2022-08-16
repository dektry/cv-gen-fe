import {
  FC,
  ChangeEvent,
  useCallback,
  MutableRefObject,
  RefObject,
} from 'react';
import { debounce } from 'lodash';
import { Input } from 'antd';

import { defaultCurrentPage, defaultPageSize } from 'constants/employees';

type SearchWithAutocompleteProps = {
  onChange: (props: Record<string, unknown>) => void;
  className?: string;
  fullNameRef?: MutableRefObject<string>;
  interviewRef?: MutableRefObject<boolean>;
  softRef?: MutableRefObject<boolean>;
};

export const SearchWithAutocomplete: FC<SearchWithAutocompleteProps> = ({
  onChange,
  className,
  fullNameRef,
  interviewRef,
  softRef,
}) => {
  const handleOnChange = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      if (fullNameRef) fullNameRef.current = e.target.value;

      onChange({
        page: defaultCurrentPage,
        limit: defaultPageSize,
        fullName: fullNameRef?.current || e.target.value,
        woInterview: interviewRef?.current,
        woSoftInterview: softRef?.current,
      });
    }, 350),
    [],
  );

  return <Input.Search className={className} onChange={handleOnChange} />;
};
