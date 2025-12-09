import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, ExternalLink, Github, FileText, Youtube } from 'lucide-react';
import { PROJECTS_DATA } from '../data/projects';
import PDFViewer from '../components/PDFViewer';

// Simple markdown to HTML converter for bold text
const renderMarkdownText = (text: string) => {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
};

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

  const isRTLProject = project.tags.includes('RTL Design');

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

        {/* Main Content */}
        <div className="space-y-16">
          
          {/* Project Overview - RTL Design만 표시 */}
          {isRTLProject && (
            <section className="animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-primary-500 pl-4">
                Project Overview
              </h3>
              
              {/* Demo GIF/Video - Single Demo */}
              {project.demoGif && !project.gallery && (
                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-gray-200 dark:shadow-none border border-gray-100 dark:border-gray-800 mb-6 bg-gray-100 dark:bg-gray-800">
                  <img src={project.demoGif} alt={`${project.title} demo`} className="w-full h-auto" />
                </div>
              )}

              {/* Multi-Step Demo Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                    <span className="w-1 h-6 bg-primary-500 rounded-full mr-3"></span>
                    Project Demo Stages
                  </h4>
                  
                  <div className="space-y-6">
                    {project.gallery.map((media, index) => (
                      <div key={index} className="relative">
                        {/* Step Header */}
                        <div className="flex items-center mb-4">
                          <div className="flex items-center justify-center w-8 h-8 bg-primary-500 text-white rounded-full font-bold text-sm mr-3">
                            {index + 1}
                          </div>
                          <h5 className="text-base font-bold text-gray-900 dark:text-white">
                            {media.caption || `Step ${index + 1}`}
                          </h5>
                        </div>
                        
                        {/* GIF Container */}
                        <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 ml-11">
                          <img 
                            src={media.url} 
                            alt={media.caption || `Demo step ${index + 1}`} 
                            className="w-full h-auto"
                          />
                          {media.description && (
                            <div className="p-4 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                {media.description}
                              </p>
                            </div>
                          )}
                        </div>
                        
                        {/* Connecting Line (except for last item) */}
                        {project.gallery && index < project.gallery.length - 1 && (
                          <div className="absolute left-4 top-12 w-0.5 h-8 bg-gradient-to-b from-primary-500 to-primary-300 opacity-50"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Overview Text */}
              {project.overview && (
                <div className="bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/10 dark:to-blue-900/10 p-6 rounded-xl border border-primary-100 dark:border-primary-900/20">
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {project.overview}
                  </p>
                </div>
              )}
            </section>
          )}

          {/* Background & Objective */}
          <section className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-l-4 border-primary-500 pl-4">
              Background & Objective
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {project.background}
            </p>
          </section>

          {/* My Role */}
          <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-primary-500 pl-4">
              My Role
            </h3>
            
            {/* Check if role is simple string array or detailed RoleItem array */}
            {typeof project.role[0] === 'string' ? (
              // Legacy format - simple string array
              <div className="bg-gray-50 dark:bg-dark-card p-6 rounded-xl border border-gray-100 dark:border-gray-700">
                <ul className="space-y-3">
                  {(project.role as string[]).map((item, idx) => (
                    <li key={idx} className="flex items-start text-gray-700 dark:text-gray-300">
                      <span className="w-2 h-2 mt-2 bg-primary-500 rounded-full mr-3 flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              // New detailed format with images and descriptions
              <div className="space-y-6">
                {(project.role as any[]).map((roleItem, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-white via-gray-50/50 to-white dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300">
                    {/* Role Header */}
                    <div className="flex items-start gap-3 mb-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary-500 text-white rounded-full font-bold text-sm flex-shrink-0 mt-1">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          {roleItem.title}
                        </h4>
                        {roleItem.description && (
                          <div 
                            className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4"
                            dangerouslySetInnerHTML={{ 
                              __html: renderMarkdownText(roleItem.description) 
                            }}
                          />
                        )}
                      </div>
                    </div>
                    
                    {/* Role Images */}
                    {roleItem.images && roleItem.images.length > 0 && (
                      <div className="ml-11">
                        <div className={`grid gap-4 ${roleItem.images.length === 1 ? 'grid-cols-1' : roleItem.images.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                          {roleItem.images.map((image: string, imgIdx: number) => (
                            <div key={imgIdx} className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-all duration-300">
                              <img 
                                src={image} 
                                alt={`${roleItem.title} - Image ${imgIdx + 1}`}
                                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Results */}
          <section className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-l-4 border-primary-500 pl-4">
              Results
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {project.results}
            </p>
          </section>

          {/* Troubleshooting */}
          <section className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-red-500 pl-4">
              Troubleshooting
            </h3>
            
            {/* Check if troubleshooting is structured or plain text */}
            {typeof project.troubleshooting === 'string' ? (
              // Legacy format - plain text
              <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-xl border border-red-100 dark:border-red-900/20">
                <h4 className="font-bold text-red-800 dark:text-red-300 mb-2 flex items-center">
                  Challenge & Solution
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {project.troubleshooting}
                </p>
              </div>
            ) : (
              // New structured format
              <div className="space-y-8">
                {project.troubleshooting.map((step, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 p-8 rounded-2xl border border-red-200 dark:border-red-900/20 shadow-lg">
                    {/* Step number badge */}
                    <div className="flex items-center mb-6">
                      <div className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-lg mr-3">
                        {idx + 1}
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                        Issue #{idx + 1}
                      </h4>
                    </div>

                    {/* 1. Problem */}
                    <div className="mb-6">
                      <div className="flex items-center mb-3">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        <h5 className="font-bold text-red-800 dark:text-red-300 text-lg">문제 상황</h5>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed ml-4 mb-4">
                        {step.problem}
                      </p>
                      {step.problemImage && (
                        <div className="ml-4 rounded-xl overflow-hidden border border-red-200 dark:border-red-800 shadow-md">
                          <img src={step.problemImage} alt="Problem visualization" className="w-full h-auto" />
                        </div>
                      )}
                    </div>

                    {/* 2. Analysis */}
                    <div className="mb-6">
                      <div className="flex items-center mb-3">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                        <h5 className="font-bold text-orange-800 dark:text-orange-300 text-lg">원인 분석</h5>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed ml-4 bg-white/50 dark:bg-gray-800/30 p-4 rounded-lg">
                        {step.analysis}
                      </p>
                    </div>

                    {/* 3. Solution */}
                    <div className="mb-6">
                      <div className="flex items-center mb-3">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        <h5 className="font-bold text-blue-800 dark:text-blue-300 text-lg">해결 방법</h5>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed ml-4 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                        {step.solution}
                      </p>
                    </div>

                    {/* 4. Result */}
                    <div>
                      <div className="flex items-center mb-3">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <h5 className="font-bold text-green-800 dark:text-green-300 text-lg">적용 결과</h5>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed ml-4 mb-4 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                        {step.result}
                      </p>
                      {step.resultImage && (
                        <div className="ml-4 rounded-xl overflow-hidden border border-green-200 dark:border-green-800 shadow-md">
                          <img src={step.resultImage} alt="Result visualization" className="w-full h-auto" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
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

          {/* 관련문서 - RTL Design만 표시 */}
          {isRTLProject && project.links.some(link => link.type === 'doc') && (
            <section className="border-t border-gray-200 dark:border-gray-700 pt-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-primary-500 pl-4">
                관련 문서
              </h3>
              <div className="space-y-6">
                {project.links.filter(link => link.type === 'doc').map((link, idx) => (
                  <div key={idx} className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
                    {/* PDF Header */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{link.label}</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">PDF 문서 - 마우스 휠로 스크롤 가능</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* PDF Viewer */}
                    <PDFViewer
                      url={link.url}
                      title={link.label}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Related Materials - 기타 링크들 */}
          {project.links.some(link => link.type !== 'doc') && (
            <section className="border-t border-gray-200 dark:border-gray-700 pt-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Materials</h3>
              <div className="flex flex-wrap gap-4">
                {project.links.filter(link => link.type !== 'doc').map((link, idx) => (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;