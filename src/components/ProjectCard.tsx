import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Link 
      to={`/project/${project.id}`}
      className="group relative flex flex-col bg-white/25 dark:bg-white/5 backdrop-blur-2xl border-2 border-white/50 dark:border-white/20 rounded-2xl overflow-hidden hover:shadow-[0_8px_48px_0_rgba(59,130,246,0.6)] transition-all duration-500 transform hover:-translate-y-2 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:border-primary-400/50"
    >
      {/* Liquid glass shine overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent z-10"></div>
      
      <div className="aspect-video w-full overflow-hidden bg-gradient-to-br from-gray-200/50 to-gray-300/50 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-xl relative">
        <img 
          src={project.thumbnail} 
          alt={project.title} 
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/40 transition-all duration-500" />
      </div>

      <div className="flex-1 p-6 flex flex-col relative z-20">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.slice(0, 3).map(tag => (
            <span 
              key={tag} 
              className="px-2.5 py-1 text-xs font-medium rounded-full bg-white/30 dark:bg-white/10 backdrop-blur-xl text-primary-600 dark:text-primary-400 border border-white/40 dark:border-white/20 shadow-sm"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-white/30 dark:bg-white/10 backdrop-blur-xl text-gray-500 dark:text-gray-400 border border-white/40 dark:border-white/20">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1">
          {project.title}
        </h3>

        <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 mb-3">
          <Calendar className="w-3 h-3 mr-1" />
          {project.period}
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 mb-4 flex-1">
          {project.summary}
        </p>

        <div className="mt-auto pt-4 border-t border-white/30 dark:border-white/20 flex items-center text-primary-600 dark:text-primary-400 font-medium text-sm group-hover:translate-x-2 transition-transform duration-500">
          View Details <ArrowRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;