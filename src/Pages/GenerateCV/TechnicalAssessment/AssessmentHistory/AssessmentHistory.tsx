import { useParams } from 'react-router-dom';

import { EmployeeHeader } from 'Pages/GenerateCV/common-components/EmployeeHeader';

import paths from 'config/routes.json';

export const AssessmentHistory = () => {

  const { id } = useParams<{ id: string }>();


  return (
    <>
      <EmployeeHeader backPath={paths.generateCVemployeesList} />
    </>
  )
}