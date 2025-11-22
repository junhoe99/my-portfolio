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

export interface TroubleshootingStep {
  problem: string; // 문제 상황 설명
  problemImage?: string; // 문제 상황 이미지/GIF
  analysis: string; // 원인 분석
  solution: string; // 해결 방법
  result: string; // 적용 결과
  resultImage?: string; // 결과 이미지/GIF
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
  demoGif?: string; // Optional: Demo GIF for RTL projects
  overview?: string; // Optional: Project overview summary
  background: string; // Background/Objective
  role: string[]; // Bullet points for Role/Contribution
  results: string; // Results/Outcome
  troubleshooting: string | TroubleshootingStep[]; // Problem & Solution story or structured steps
  techStack: string[]; // Tools used e.g. Verilog, Vivado
  links: ProjectLink[];
}

export interface SkillCategory {
  categoryName: string;
  items: string[];
}