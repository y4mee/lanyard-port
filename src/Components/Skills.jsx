import React from 'react';
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiPhp,
  SiGo,
  SiReact,
  SiVuedotjs,
  SiSvelte,
  SiTailwindcss,
  SiNodedotjs,
  SiMysql,
  SiPostgresql,
  SiGraphql,
  SiMongoose,
  SiExpress,
  SiMongodb,
} from 'react-icons/si';

const techStacks = [
  {
    title: 'Languages',
    icons: [
      { icon: SiHtml5, name: 'HTML5' },
      { icon: SiCss3, name: 'CSS3' },
      { icon: SiTailwindcss, name: 'Tailwind CSS' },
      { icon: SiJavascript, name: 'JavaScript' },
      { icon: SiTypescript, name: 'TypeScript' },
      { icon: SiNodedotjs, name: 'Node.js' },
      { icon: SiReact, name: 'React' },
      { icon: SiExpress, name: 'Express' },
      { icon: SiMongodb, name: 'MongoDB' },
    ],
  },
];

const Skills = () => (
  <div className="max-w-3xl px-6 py-8 mx-auto text-white">
    <h2 className="text-2xl font-semibold mb-6 text-center tracking-wide">Tech Stack</h2>
    <div className="grid sm:grid-cols-1 gap-6">
      {techStacks.map((group, i) => (
        <div key={i}>
          <div className="flex items-center justify-center flex-wrap gap-6 p-4">
            {group.icons.map(({ icon: Icon, name }, j) => (
              <div
                key={j}
                title={name}
                className="relative group cursor-pointer transition-transform duration-300"
              >
                <Icon
                  className="w-8 h-8 text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.2)] 
                  group-hover:scale-125 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-300 ease-in-out"
                />
                <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 
                  bg-black/80 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 
                  transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap font-mono tracking-wide">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Skills;
