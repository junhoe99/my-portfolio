export const ProjectCategory = {
  RTL_DESIGN: "RTL Design",
  VERIFICATION: "Verification"
} as const;

export type ProjectCategory = typeof ProjectCategory[keyof typeof ProjectCategory];

export interface ProjectLink {
  type: 'github' | 'doc' | 'demo' | 'video';
  url: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  period: string;
  teamSize: string; // e.g., "Solo", "Team of 4"
  tags: ProjectCategory[];
  thumbnail: string; // Path to image
  summary: string; // Short description for card
  
  // Detail Section Fields
  background: string; // Background/Objective
  role: string[]; // Bullet points for Role/Contribution
  results: string; // Results/Outcome
  troubleshooting: string; // Problem & Solution story
  techStack: string[]; // Tools used e.g. Verilog, Vivado
  links: ProjectLink[];
}

export interface SkillCategory {
  categoryName: string;
  items: string[];
}