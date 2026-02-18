export interface Project {
  name: string;
  date: string;
  tagline: string;
  link: string;
}

const projectsList: Project[] = [
  {
    name: "Project",
    date: "2026",
    tagline: "Projectname",
    link: "google.com",
  },
  
];

export const ProjectData = {
  projectsList,
};
