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
      className="group relative flex flex-col bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="aspect-video w-full overflow-hidden bg-gray-200 dark:bg-gray-800 relative">
        <img 
          src={project.thumbnail} 
          alt={project.title} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      <div className="flex-1 p-5 flex flex-col">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.slice(0, 3).map(tag => (
            <span 
              key={tag} 
              className="px-2 py-1 text-xs font-medium rounded-md bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border border-primary-100 dark:border-primary-900/50"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-1 text-xs font-medium rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1">
          {project.title}
        </h3>

        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
          <Calendar className="w-3 h-3 mr-1" />
          {project.period}
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4 flex-1">
          {project.summary}
        </p>

        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center text-primary-600 dark:text-primary-400 font-medium text-sm group-hover:translate-x-1 transition-transform duration-300">
          View Details <ArrowRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;