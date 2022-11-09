import { IEmployee } from 'models/IEmployee';
import { IProject } from 'models/IProject';

export function formatProject(project: IProject, employee?: IEmployee): IProject {
  let responsibilities: string[] = [];
  if (typeof project.responsibilities === 'string') {
    responsibilities = String(project.responsibilities).split(',');
  } else if (project.responsibilities) {
    responsibilities = project.responsibilities;
  }

  return {
    id: project.id || '',
    employeeId: employee?.id || '',
    teamSize: project.teamSize || 0,
    name: project.name || '',
    duration: project.duration || '',
    position: project.position || '',
    description: project.description || '',
    responsibilities: responsibilities || [],
    tools: project.tools || [],
  };
}
