import React, { useState } from 'react';
import { Download, Github, Mail, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import { PROFILE_DATA, PROJECTS_DATA, SKILLS_DATA } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import { ProjectCategory } from '../types';

const Home: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');

  const uniqueTags = ['All', ...Array.from(new Set(PROJECTS_DATA.flatMap(p => p.tags)))];
  
  const filteredProjects = filter === 'All' 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.tags.includes(filter as ProjectCategory));

  return (
    <main className="flex flex-col w-full">
      
      {/* Hero Section */}
      <section id="home" className="relative pt-20 pb-32 flex items-center justify-center min-h-[80vh] bg-gradient-to-b from-primary-50/50 to-white dark:from-dark-bg dark:to-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <div className="animate-fade-in-up">
            <span className="inline-block py-1 px-3 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 text-sm font-medium mb-6">
              System Semiconductor Engineer
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white tracking-tight mb-6">
              Hello, I'm <span className="text-primary-600 dark:text-primary-400">{PROFILE_DATA.name}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              {PROFILE_DATA.summary}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="#projects" 
                className="px-8 py-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-semibold shadow-lg shadow-primary-500/30 transition-all transform hover:-translate-y-0.5"
              >
                View Projects
              </a>
              <a 
                href={PROFILE_DATA.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-lg bg-white dark:bg-dark-card border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-24 bg-white dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-gray-900 dark:text-white inline-block border-b-4 border-primary-500 pb-2">About Me</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                <div className="p-6 bg-gray-50 dark:bg-dark-card rounded-xl border border-gray-100 dark:border-gray-700">
                   <Briefcase className="w-8 h-8 text-primary-500 mb-3" />
                   <h4 className="font-bold text-gray-900 dark:text-white mb-1">Core Focus</h4>
                   <p className="text-sm text-gray-600 dark:text-gray-400">RTL Design & Verification</p>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-dark-card rounded-xl border border-gray-100 dark:border-gray-700">
                   <GraduationCap className="w-8 h-8 text-primary-500 mb-3" />
                   <h4 className="font-bold text-gray-900 dark:text-white mb-1">Educational Background</h4>
                   <p className="text-sm text-gray-600 dark:text-gray-400">{PROFILE_DATA.education}</p>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-dark-card rounded-xl border border-gray-100 dark:border-gray-700">
                   <MapPin className="w-8 h-8 text-primary-500 mb-3" />
                   <h4 className="font-bold text-gray-900 dark:text-white mb-1">Location</h4>
                   <p className="text-sm text-gray-600 dark:text-gray-400">{PROFILE_DATA.location}</p>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-dark-card rounded-xl border border-gray-100 dark:border-gray-700">
                   <Mail className="w-8 h-8 text-primary-500 mb-3" />
                   <h4 className="font-bold text-gray-900 dark:text-white mb-1">Contact</h4>
                   <p className="text-sm text-gray-600 dark:text-gray-400">{PROFILE_DATA.email}</p>
                </div>
             </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-gray-50 dark:bg-[#161f32]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-gray-900 dark:text-white inline-block border-b-4 border-primary-500 pb-2">Skills</h2>
             <p className="mt-4 text-gray-600 dark:text-gray-400">Toolbox for Logic Design & Verification</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {SKILLS_DATA.map((category, index) => (
                <div 
                  key={category.categoryName} 
                  className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-dark-card dark:to-gray-800/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 hover:-translate-y-2 overflow-hidden"
                >
                  {/* Decorative gradient blob */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-primary-600/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                  
                  {/* Category number badge */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary-600 dark:text-primary-400">{index + 1}</span>
                  </div>
                  
                  <div className="relative">
                    <h3 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 dark:from-primary-400 dark:to-primary-300 bg-clip-text text-transparent mb-6 flex items-center">
                      <span className="w-1 h-6 bg-gradient-to-b from-primary-500 to-primary-600 rounded-full mr-3"></span>
                      {category.categoryName}
                    </h3>
                    <ul className="space-y-3">
                      {category.items.map((skill) => (
                        <li key={skill} className="flex items-start text-gray-700 dark:text-gray-300 text-sm group/item">
                          <span className="mt-1.5 w-2 h-2 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full mr-3 flex-shrink-0 group-hover/item:scale-125 transition-transform"></span>
                          <span className="group-hover/item:text-gray-900 dark:group-hover/item:text-white transition-colors">{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-white dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
             <h2 className="text-3xl font-bold text-gray-900 dark:text-white inline-block border-b-4 border-primary-500 pb-2">Projects</h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {uniqueTags.map(tag => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === tag
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-20 text-gray-500 dark:text-gray-400">
              No projects found in this category.
            </div>
          )}
        </div>
      </section>

      {/* Contact / Footer Section */}
      <footer id="contact" className="bg-gray-900 dark:bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Let's Connect</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
           시스템 반도체 분야에서 새로운 기회를 찾고 있습니다.
           RTL 설계, UVM 검증, FPGA 프로토타이핑 관련 논의는 언제든 환영합니다.
          </p>
          
          <div className="flex justify-center gap-6 mb-12">
            <a href={`mailto:${PROFILE_DATA.email}`} className="p-3 bg-gray-800 rounded-full hover:bg-primary-600 transition-colors">
              <Mail className="w-6 h-6" />
            </a>
            <a href={PROFILE_DATA.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-800 rounded-full hover:bg-primary-600 transition-colors">
              <Github className="w-6 h-6" />
            </a>
          </div>

          <div className="border-t border-gray-800 pt-8 text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} {PROFILE_DATA.name}. All rights reserved.</p>
            <p className="mt-2">Built with React, TypeScript & Tailwind CSS.</p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Home;