import { message } from 'antd';

import { apiClient } from 'services/apiService';
import Helper from '../helper';
import endpoints from '../config/endpoint.json';

const { headerWithJWT } = Helper;

export const completeInterview = async (interview: ICompleteInterview) => {
  try {
    const { data } = await apiClient.post(endpoints.interviews, interview);
    return { ...data };
  } catch (error) {
    console.error('[API CLIENT ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const editInterview = async (interview: ICompleteInterview) => {
  try {
    const { data } = await apiClient.put(endpoints.interviews, interview);
    return { ...data };
  } catch (error) {
    console.error('[API CLIENT ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const loadInterviewResultRequest = async (
  candidateId: string,
): Promise<{
  interview: IInterviewCandidate;
  answers: IInterviewResultAnswers[];
}> => {
  return await fetch(`${apiUrl}/interviews/${candidateId}`, {
    method: 'GET',
    mode: 'cors',
    headers: headerWithJWT(),
  })
    .then(data => {
      return data.json();
    })
    .catch(error => error);
};