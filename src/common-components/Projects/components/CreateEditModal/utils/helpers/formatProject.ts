import { IEmployee } from 'models/IEmployee';
import { IProject } from 'models/IProject';

export function formatProject(project: Partial<IProject>, employee: IEmployee): IProject {
  return {
    id: project.id || '',
    employeeId: employee.id || '',
    teamSize: project.teamSize || 0,
    name: project.name || '',
    duration: project.duration || '',
    position: project.position || '',
    description: project.description || '',
    responsibilities: project.responsibilities || [],
    tools: project.tools || [],
  };
}
