import { FC, useCallback, RefObject, MutableRefObject } from 'react';
import { debounce } from 'lodash';
import { Select } from 'antd';

const { Option } = Select;

import { CandidatesSelectFilter, defaultCurrentPage, defaultPageSize } from './utils/constants';

type SelectCandidateProps = {
  onChange: (props: Record<string, unknown>) => void;
  className?: string;
  fullNameRef: RefObject<string>;
  interviewRef: MutableRefObject<boolean>;
  softRef: MutableRefObject<boolean>;
};

export const SelectCandidateType: FC<SelectCandidateProps> = ({
  onChange,
  className,
  fullNameRef,
  interviewRef,
  softRef,
}) => {
  const handleOnChange = useCallback(
    debounce((value: string) => {
      interviewRef.current = value === CandidatesSelectFilter.TECH;
      softRef.current = value === CandidatesSelectFilter.SOFT;

      onChange({
        page: defaultCurrentPage,
        limit: defaultPageSize,
        fullName: fullNameRef?.current,
        woInterview: interviewRef.current,
        woSoftInterview: softRef.current,
      });
    }, 350),
    []
  );

  return (
    <Select
      className={className}
      defaultValue={CandidatesSelectFilter.ALL}
      style={{
        width: 120,
      }}
      onChange={handleOnChange}
    >
      <Option value={CandidatesSelectFilter.ALL}>{CandidatesSelectFilter.ALL}</Option>
      <Option value={CandidatesSelectFilter.TECH}>{CandidatesSelectFilter.TECH}</Option>
      <Option value={CandidatesSelectFilter.SOFT}>{CandidatesSelectFilter.SOFT}</Option>
    </Select>
  );
};
