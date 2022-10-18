import { IProject, IProjectFromDB } from 'models/IProject';

export function projectFormatter(project: IProject, id: string): IProjectFromDB {
  const processedTools = project.tools.map((el) => {
    return { name: el };
  });
  return {
    id: project.id,
    employeeId: id,
    team_size: String(project.teamSize),
    name: project.name,
    duration: project.duration,
    role: project.position,
    description: project.description,
    responsibilities: project.responsibilities,
    technologies: processedTools,
  };
}
