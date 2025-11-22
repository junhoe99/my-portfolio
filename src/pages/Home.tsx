import React, { useState, useEffect } from 'react';
import { Github, Mail, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import { PROFILE_DATA, PROJECTS_DATA, SKILLS_DATA } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import { ProjectCategory } from '../types';

const Home: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState<boolean>(false);

  const uniqueTags = ['All', ...Array.from(new Set(PROJECTS_DATA.flatMap(p => p.tags)))];
  
  let filteredProjects = filter === 'All' 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.tags.includes(filter as ProjectCategory));
  
  // Apply featured filter if enabled
  if (showFeaturedOnly) {
    filteredProjects = filteredProjects.filter(p => p.featured);
  }

  // Scroll reveal animation
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="flex flex-col w-full">
      
      {/* Hero Section */}
      <section id="home" className="relative pt-20 pb-32 flex items-center justify-center min-h-[80vh] bg-gradient-to-b from-primary-50/50 to-white dark:from-dark-bg dark:to-dark-bg overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient orbs with glassmorphism effect */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-primary-400/30 via-primary-500/20 to-purple-500/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-32 right-20 w-96 h-96 bg-gradient-to-br from-blue-400/25 via-primary-400/20 to-cyan-400/25 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-primary-300/10 via-transparent to-purple-300/10 rounded-full blur-3xl animate-pulse-slow"></div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]"></div>
          
          {/* Floating particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-400 rounded-full animate-float-particle"></div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-400 rounded-full animate-float-particle-delayed"></div>
          <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-purple-400 rounded-full animate-float-particle-slow"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center relative z-10">
          <div className="animate-fade-in-up">
            <span className="inline-block py-2 px-4 rounded-full bg-white/20 dark:bg-white/10 text-primary-600 dark:text-primary-300 text-sm font-medium mb-6 backdrop-blur-xl border border-white/40 dark:border-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
              System Semiconductor Engineer
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white tracking-tight mb-6">
              Hello, I'm <span className="text-primary-600 dark:text-primary-400 relative inline-block">
                {PROFILE_DATA.name}
                <span className="absolute -inset-1 bg-gradient-to-r from-primary-400/20 to-purple-400/20 blur-xl -z-10"></span>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              {PROFILE_DATA.summary}
            </p>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-dark-bg dark:via-[#1a2332] dark:to-dark-bg reveal-on-scroll relative overflow-hidden">
        {/* Glass layer overlay */}
        <div className="absolute inset-0 bg-white/30 dark:bg-white/5 backdrop-blur-3xl"></div>
        <div className="max-w-7ㄲxl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-gray-900 dark:text-white inline-block border-b-4 border-primary-500 pb-2">About Me</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                <div className="group p-6 bg-white/30 dark:bg-white/5 backdrop-blur-2xl rounded-2xl border-2 border-white/50 dark:border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:shadow-[0_8px_32px_0_rgba(59,130,246,0.5)] transition-all duration-500 hover:-translate-y-2 hover:bg-white/40 dark:hover:bg-white/10">
                   <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                   <Briefcase className="w-8 h-8 text-primary-500 mb-3 relative z-10" />
                   <h4 className="font-bold text-gray-900 dark:text-white mb-1 relative z-10">관심분야</h4>
                   <p className="text-sm text-gray-600 dark:text-gray-400 relative z-10">RTL Design & Verification</p>
                </div>
                <div className="group p-6 bg-white/30 dark:bg-white/5 backdrop-blur-2xl rounded-2xl border-2 border-white/50 dark:border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:shadow-[0_8px_32px_0_rgba(59,130,246,0.5)] transition-all duration-500 hover:-translate-y-2 hover:bg-white/40 dark:hover:bg-white/10">
                   <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                   <GraduationCap className="w-8 h-8 text-primary-500 mb-3 relative z-10" />
                   <h4 className="font-bold text-gray-900 dark:text-white mb-1 relative z-10">학력사항</h4>
                   <p className="text-sm text-gray-600 dark:text-gray-400 relative z-10">{PROFILE_DATA.education}</p>
                </div>
                <div className="group p-6 bg-white/30 dark:bg-white/5 backdrop-blur-2xl rounded-2xl border-2 border-white/50 dark:border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:shadow-[0_8px_32px_0_rgba(59,130,246,0.5)] transition-all duration-500 hover:-translate-y-2 hover:bg-white/40 dark:hover:bg-white/10">
                   <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                   <MapPin className="w-8 h-8 text-primary-500 mb-3 relative z-10" />
                   <h4 className="font-bold text-gray-900 dark:text-white mb-1 relative z-10">주소</h4>
                   <p className="text-sm text-gray-600 dark:text-gray-400 relative z-10">{PROFILE_DATA.location}</p>
                </div>
                <div className="group p-6 bg-white/30 dark:bg-white/5 backdrop-blur-2xl rounded-2xl border-2 border-white/50 dark:border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:shadow-[0_8px_32px_0_rgba(59,130,246,0.5)] transition-all duration-500 hover:-translate-y-2 hover:bg-white/40 dark:hover:bg-white/10">
                   <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                   <Mail className="w-8 h-8 text-primary-500 mb-3 relative z-10" />
                   <h4 className="font-bold text-gray-900 dark:text-white mb-1 relative z-10">Contact</h4>
                   <p className="text-sm text-gray-600 dark:text-gray-400 relative z-10">{PROFILE_DATA.email}</p>
                </div>
             </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-gradient-to-br from-primary-50/30 via-white to-blue-50/30 dark:from-[#0f1419] dark:via-[#161f32] dark:to-[#1a2332] reveal-on-scroll relative overflow-hidden">
        {/* Glass layer overlay */}
        <div className="absolute inset-0 bg-white/20 dark:bg-black/20 backdrop-blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-gray-900 dark:text-white inline-block border-b-4 border-primary-500 pb-2">Skills</h2>
             <p className="mt-4 text-gray-600 dark:text-gray-400">Toolbox for Logic Design & Verification</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {SKILLS_DATA.map((category, index) => (
                <div 
                  key={category.categoryName} 
                  className="group relative bg-white/25 dark:bg-white/5 backdrop-blur-2xl rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:shadow-[0_8px_48px_0_rgba(59,130,246,0.6)] transition-all duration-500 border-2 border-white/50 dark:border-white/20 hover:-translate-y-3 overflow-hidden hover:border-primary-400/50"
                >
                  {/* Decorative gradient blob */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-primary-600/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                  
                  {/* Liquid glass shine effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/60 via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"></div>
                  
                  {/* Category number badge */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/30 dark:bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/40 dark:border-white/20">
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
      <section id="projects" className="py-24 bg-gradient-to-br from-white via-gray-50 to-white dark:from-dark-bg dark:via-[#1a2332] dark:to-dark-bg reveal-on-scroll relative overflow-hidden">
        {/* Glass layer overlay */}
        <div className="absolute inset-0 bg-white/30 dark:bg-white/5 backdrop-blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
             <h2 className="text-3xl font-bold text-gray-900 dark:text-white inline-block border-b-4 border-primary-500 pb-2">Projects</h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {/* Category Filters */}
            {uniqueTags.map(tag => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === tag
                    ? 'bg-primary-600 text-white shadow-[0_8px_32px_0_rgba(59,130,246,0.6)] backdrop-blur-xl border-2 border-primary-400/50'
                    : 'bg-white/25 dark:bg-white/5 backdrop-blur-2xl text-gray-600 dark:text-gray-300 hover:bg-white/40 dark:hover:bg-white/10 border-2 border-white/40 dark:border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:shadow-[0_8px_32px_0_rgba(59,130,246,0.4)] hover:-translate-y-0.5'
                }`}
              >
                {tag}
              </button>
            ))}
            
            {/* Featured Projects Toggle - Right aligned */}
            <button
              onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
              className={`px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 backdrop-blur-2xl border-2 ${
                showFeaturedOnly
                  ? 'bg-yellow-500 text-white border-yellow-400/50 shadow-[0_8px_32px_0_rgba(234,179,8,0.6)]'
                  : 'bg-white/25 dark:bg-white/5 text-gray-600 dark:text-gray-300 border-white/40 dark:border-white/20 hover:border-yellow-400/50 dark:hover:border-yellow-400/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:shadow-[0_8px_32px_0_rgba(234,179,8,0.4)] hover:-translate-y-0.5'
              }`}
            >
              ⭐ 주요 프로젝트
            </button>
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
            <a href={`mailto:${PROFILE_DATA.email}`} className="p-4 bg-white/10 backdrop-blur-2xl rounded-2xl hover:bg-primary-600 transition-all duration-500 border-2 border-white/30 hover:border-primary-400/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:shadow-[0_8px_32px_0_rgba(59,130,246,0.6)] hover:-translate-y-1 group">
              <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </a>
            <a href={PROFILE_DATA.github} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/10 backdrop-blur-2xl rounded-2xl hover:bg-primary-600 transition-all duration-500 border-2 border-white/30 hover:border-primary-400/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:shadow-[0_8px_32px_0_rgba(59,130,246,0.6)] hover:-translate-y-1 group">
              <Github className="w-6 h-6 group-hover:scale-110 transition-transform" />
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