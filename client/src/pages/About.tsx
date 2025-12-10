import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { useEffect, useRef } from 'react';
import { useSEO } from '../hooks/useSEO';

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: string;
}

const About: React.FC = () => {
  useSEO('about');
  const [isVisible, setIsVisible] = useState(false);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills: Skill[] = [
    // Web Development
    { name: "HTML", level: 100, category: "Web Development", icon: "fa-brands fa-html5" },
    { name: "CSS", level: 60, category: "Web Development", icon: "fa-brands fa-css3-alt" },
    { name: "JavaScript", level: 40, category: "Web Development", icon: "fa-brands fa-js" },
    
    // Programming
    { name: "C", level: 80, category: "Programming", icon: "fa-solid fa-c" },
    { name: "Python", level: 75, category: "Programming", icon: "fa-brands fa-python" },
    { name: "SQL", level: 85, category: "Programming", icon: "fa-solid fa-database" }
  ];

  const categories = Array.from(new Set(skills.map(skill => skill.category)));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, []);

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <SectionHeader 
          title="About Me" 
          highlightedWord="Me" 
          description="A passionate computer science student with a focus on web development and programming fundamentals."
        />
        
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-1/2">
            <div className="glassmorphism rounded-md p-6 h-full">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-accent">&lt;Personal_Brief /&gt;</h3>
                <div className="text-xs text-gray-400 font-mono border border-gray-700 px-2 py-1 rounded">
                  <i className="fas fa-code mr-1"></i> VERSION 1.0
                </div>
              </div>
              
              <p className="text-gray-300 mb-6">
                I am a dedicated Computer Science student with a strong foundation in programming fundamentals and web development. 
                Currently pursuing my Bachelor's degree at Lakshya Institute of Technology, I am passionate about creating 
                innovative digital solutions and continuously expanding my technical skills.
              </p>
              
              <p className="text-gray-300 mb-8">
                My academic focus includes web technologies, data structures, and problem-solving. I approach each project 
                with enthusiasm and a commitment to learning, aiming to build a strong foundation for my future career in 
                software development.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="font-mono text-sm text-gray-400 mb-1">Name:</p>
                  <p className="font-medium">Dinesh Kumar Sahoo</p>
                </div>
                <div>
                  <p className="font-mono text-sm text-gray-400 mb-1">Email:</p>
                  <p className="font-medium">dineshkumarcs0014@gmail.com</p>
                </div>
                <div>
                  <p className="font-mono text-sm text-gray-400 mb-1">Location:</p>
                  <p className="font-medium">Bhubaneswar, India</p>
                </div>
                <div>
                  <p className="font-mono text-sm text-gray-400 mb-1">Status:</p>
                  <p className="font-medium text-accent">Computer Science Student</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="glassmorphism rounded-md p-6">
              <h3 className="text-2xl font-bold text-accent mb-8">&lt;Technical Proficiencies /&gt;</h3>
              
              <div ref={skillsRef} className="space-y-8">
                {categories.map((category, catIndex) => (
                  <div key={category}>
                    {/* Category Header */}
                    <div className="flex items-center mb-4">
                      <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent"></div>
                      <h4 className="text-sm font-bold text-accent mx-4 tracking-wider">
                        {category.toUpperCase()}
                      </h4>
                      <div className="h-px flex-1 bg-gradient-to-l from-accent/50 to-transparent"></div>
                    </div>

                    {/* Skills in this category */}
                    <div className="space-y-4">
                      {skills
                        .filter(skill => skill.category === category)
                        .map((skill, index) => {
                          return (
                            <div
                              key={skill.name}
                              className="group"
                              style={{
                                animation: isVisible ? `fadeInUp 0.6s ease-out ${catIndex * 0.2 + index * 0.1}s both` : 'none'
                              }}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <i className={`${skill.icon} text-accent text-sm`}></i>
                                  <span className="font-mono text-sm">{skill.name}</span>
                                </div>
                                <span className="text-accent font-bold text-sm">{skill.level}%</span>
                              </div>
                              
                              <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden relative group-hover:shadow-lg group-hover:shadow-accent/20 transition-all duration-300">
                                {/* Animated background shimmer */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                                
                                {/* Progress bar with gradient - cyan to gold */}
                                <div
                                  className="h-full bg-gradient-to-r from-[#00FFB2] to-[#FFD700] rounded-full relative overflow-hidden transition-all duration-1000 ease-out"
                                  style={{
                                    width: isVisible ? `${skill.level}%` : '0%',
                                    transitionDelay: `${catIndex * 0.2 + index * 0.1}s`
                                  }}
                                >
                                  {/* Sliding shine effect */}
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-slide"></div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
