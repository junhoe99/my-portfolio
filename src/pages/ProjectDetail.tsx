import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, ExternalLink, Github, FileText, Youtube } from 'lucide-react';
import { PROJECTS_DATA } from '../data/projects';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = PROJECTS_DATA.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-dark-bg dark:text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project not found</h2>
          <button onClick={() => navigate('/')} className="text-primary-500 hover:underline">
            Go back home
          </button>
        </div>
      </div>
    );
  }

  const getLinkIcon = (type: string) => {
    switch (type) {
      case 'github': return <Github className="w-4 h-4" />;
      case 'video': return <Youtube className="w-4 h-4" />;
      case 'doc': return <FileText className="w-4 h-4" />;
      default: return <ExternalLink className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation */}
        <Link to="/" className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-8 transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">{project.title}</h1>
          
          <div className="flex flex-wrap gap-6 text-gray-600 dark:text-gray-300 text-sm border-b border-gray-200 dark:border-gray-700 pb-8">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-primary-500" />
              {project.period}
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2 text-primary-500" />
              {project.teamSize}
            </div>
          </div>
        </div>

        {/* Thumbnail/Media Area */}
        <div className="rounded-2xl overflow-hidden shadow-2xl shadow-gray-200 dark:shadow-none border border-gray-100 dark:border-gray-800 mb-12 bg-gray-100 dark:bg-gray-800 aspect-video">
           <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
        </div>

        {/* Main Content */}
        <div className="space-y-16">
          
          {/* 1. Background / Objective */}
          <section className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-l-4 border-primary-500 pl-4">
              Background & Objective
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {project.background}
            </p>
          </section>

          {/* 2. Role / Contribution */}
          <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-l-4 border-primary-500 pl-4">
              My Role
            </h3>
            <div className="bg-gray-50 dark:bg-dark-card p-6 rounded-xl border border-gray-100 dark:border-gray-700">
              <ul className="space-y-3">
                {project.role.map((item, idx) => (
                  <li key={idx} className="flex items-start text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 mt-2 bg-primary-500 rounded-full mr-3 flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 3. Results */}
          <section className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-l-4 border-primary-500 pl-4">
              Results
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {project.results}
            </p>
          </section>

          {/* 4. Troubleshooting */}
          <section className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-l-4 border-red-500 pl-4">
              Troubleshooting
            </h3>
            <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-xl border border-red-100 dark:border-red-900/20">
              <h4 className="font-bold text-red-800 dark:text-red-300 mb-2 flex items-center">
                Challenge & Solution
              </h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {project.troubleshooting}
              </p>
            </div>
          </section>

          {/* Tech Stack */}
          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
              Tech Stack Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map(tech => (
                <span key={tech} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-md font-medium font-mono">
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* 5. Links */}
          <section className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Materials</h3>
            <div className="flex flex-wrap gap-4">
              {project.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-all shadow-sm hover:shadow-md"
                >
                  <span className="mr-2">{getLinkIcon(link.type)}</span>
                  {link.label}
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;