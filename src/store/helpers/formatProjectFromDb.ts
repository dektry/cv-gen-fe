import { IProjectFromDB, IProject } from 'models/IProject';

export function formatProjectFromDb(project: IProjectFromDB): IProject {
  const teamSize = project.team_size ? parseInt(project.team_size) : 0;
  const tools = project.technologies.map((el) => el.name);

  return {
    id: project.id,
    employeeId: project.employee?.id || '',
    name: project.name,
    duration: project.duration,
    position: project.role,
    teamSize,
    description: project.description,
    responsibilities: project.responsibilities,
    tools,
  };
}
