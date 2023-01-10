import { IProjectFromDB } from 'models/IProject';
import { ICvProject } from 'models/ICVGeneration';

export function projectFormatter(project: ICvProject, id: string): IProjectFromDB {
  const processedTools = project.tools?.map((el) => {
    return { name: el };
  });
  return {
    id: project.id || '',
    employeeId: id,
    team_size: String(project.teamSize || ''),
    name: project.name || '',
    duration: project.duration || '',
    role: project.position || '',
    description: project.description || '',
    responsibilities: project.responsibilities || [],
    technologies: processedTools || [],
  };
}
