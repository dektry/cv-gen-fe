import { createAsyncThunk } from '@reduxjs/toolkit';

import { generatePdf, getTemplate } from 'services/requests/cvGeneration';
import { generateCv, getProfSkills, loadCvTemplate, loadGroupOfTemplates } from './actionTypes';
import { TProfSkill } from 'Pages/CVGeneration';
import { getAllTechAssessments, httpGetTechAssessment } from 'services/requests/techAssessment';
import { IFormLevel } from 'models/IHardSkillsMatrix';

interface IDownloadProps {
  template: string;
  fileName: string;
}

export const fetchCvGenerationTemplate = createAsyncThunk(loadCvTemplate, async (templateName: string) => {
  const template = await getTemplate(templateName);
  return { [templateName]: template || '' };
});

export const fetchGroupOfTemplates = createAsyncThunk(loadGroupOfTemplates, async (templatesNames: string[]) => {
  const result: Record<string, string> = {};

  const templates: string[] = await Promise.all(templatesNames.map((templateName) => getTemplate(templateName)));

  templatesNames.forEach((templateName, index) => {
    result[templateName] = templates[index];
  });
  return result;
});

export const downloadCv = createAsyncThunk(generateCv, async ({ template, fileName }: IDownloadProps) => {
  const data = await generatePdf(template);

  const blob = new Blob([data], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = `${fileName}.pdf`;
  link.href = url;
  link.click();
  link.remove();
});

export const fetchProfSkills = createAsyncThunk(getProfSkills, async (userId: string) => {
  const profSkills: TProfSkill[] = [];

  const allAssessments = await getAllTechAssessments(userId);

  if (allAssessments && allAssessments.length && allAssessments[allAssessments.length - 1]) {
    const { id: lastAssessmentId } = allAssessments[allAssessments.length - 1];

    const lastAssessment = await httpGetTechAssessment(lastAssessmentId);

    lastAssessment.skillGroups.forEach((group: Record<string, unknown>) => {
      const profSkillGroup: TProfSkill = { groupName: '', skills: [] };

      profSkillGroup.groupName = group.value as string;
      profSkillGroup.skills = (group.skills as Record<string, unknown>[]).map((skill) => {
        const profSkill = { name: '', level: '' };

        profSkill.name = skill.value as string;
        profSkill.level = (skill.currentSkillLevel as IFormLevel).value || 'None';

        return profSkill;
      });

      profSkills.push(profSkillGroup);
    });
  }

  return profSkills;
});
