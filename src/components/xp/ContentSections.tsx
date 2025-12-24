import { Github, Linkedin, Mail, MapPin, Sparkles } from "lucide-react";
import profileAvatar from "@/assets/profile-avatar.png";

export const AboutSection = () => (
  <div className="space-y-4">
    <div className="flex items-start gap-4">
      <img 
        src={profileAvatar} 
        alt="Ramyashree" 
        className="w-20 h-20 rounded-full object-cover border-2 border-primary/30 shrink-0"
      />
      <div>
        <h2 className="text-2xl font-bold text-foreground">Hey, I'm Ramyashree!</h2>
        <p className="text-muted-foreground flex items-center gap-1">
          <MapPin className="w-4 h-4" /> Data Engineer & Curious Explorer
        </p>
      </div>
    </div>
    
    <p className="text-foreground leading-relaxed">
      I'm a <span className="text-primary font-semibold">Data Engineer</span> who loves turning chaotic data into meaningful insights. 
      My curious mind keeps me exploring new technologies, languages, and ideas — there's always something exciting to learn!
    </p>
    
    <p className="text-foreground leading-relaxed">
      When I'm not wrangling data pipelines, you'll find me watching anime, gaming, 
      learning my 4th language, or planning my next adventure. I believe in building things that matter
      and having fun along the way! <Sparkles className="inline w-4 h-4 text-yellow-500" />
    </p>

    <div className="flex gap-3 pt-2 pb-4">
      <a href="https://github.com/ramyashreeshetty" target="_blank" rel="noopener noreferrer" 
        className="xp-button flex items-center gap-2">
        <Github className="w-4 h-4" /> GitHub
      </a>
      <a href="https://www.linkedin.com/in/ramyashree-shetty/" target="_blank" rel="noopener noreferrer"
        className="xp-button flex items-center gap-2">
        <Linkedin className="w-4 h-4" /> LinkedIn
      </a>
      <a href="mailto:ramyashetty18042000@gmail.com" className="xp-button flex items-center gap-2">
        <Mail className="w-4 h-4" /> Email
      </a>
    </div>
  </div>
);

export const ProjectsSection = () => (
  <div className="space-y-4">
    <p className="text-muted-foreground">Featured projects showcasing data engineering & development skills.</p>
    {[
      { name: "Data Pipeline Framework", desc: "Scalable ETL pipeline using Python & Apache Airflow", tags: ["Python", "Airflow", "AWS"] },
      { name: "Analytics Dashboard", desc: "Real-time analytics visualization with React", tags: ["React", "D3.js", "PostgreSQL"] },
      { name: "ML Feature Store", desc: "Centralized feature management for ML models", tags: ["Python", "Redis", "Docker"] },
    ].map((project, i) => (
      <div key={i} className="p-3 bg-muted rounded-lg border border-border">
        <h3 className="font-semibold text-foreground">{project.name}</h3>
        <p className="text-sm text-muted-foreground">{project.desc}</p>
        <div className="flex gap-2 mt-2">
          {project.tags.map(tag => (
            <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">{tag}</span>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export const HobbiesSection = () => (
  <div className="grid grid-cols-2 gap-4">
    {[
      { emoji: "🎌", title: "Anime", desc: "Studio Ghibli, shonen, slice of life" },
      { emoji: "🎮", title: "Gaming", desc: "RPGs, indie games, cozy sims" },
      { emoji: "🌍", title: "Languages", desc: "Learning Japanese, Spanish, Korean" },
      { emoji: "✈️", title: "Travel", desc: "Exploring new cultures & cuisines" },
    ].map((hobby, i) => (
      <div key={i} className="p-4 bg-muted rounded-lg text-center">
        <div className="text-3xl mb-2">{hobby.emoji}</div>
        <h3 className="font-semibold text-foreground">{hobby.title}</h3>
        <p className="text-xs text-muted-foreground">{hobby.desc}</p>
      </div>
    ))}
  </div>
);

export const ExperienceSection = () => (
  <div className="space-y-4">
    {[
      { 
        year: "Mar 2025 - Present", 
        role: "Senior Associate - Data Engineer", 
        company: "Radix", 
        location: "Mumbai, India • Hybrid",
        skills: "Tableau, Google BigQuery, +9 skills"
      },
      { 
        year: "Feb 2023 - Feb 2025", 
        role: "Data Engineer", 
        company: "Blazeclan Technologies", 
        location: "Pune, India • Hybrid",
        skills: "Python, Matillion ETL, +15 skills"
      },
      { 
        year: "Aug 2022 - Jan 2023", 
        role: "Intern", 
        company: "Blazeclan Technologies", 
        location: "Remote",
        skills: ""
      },
    ].map((exp, i) => (
      <div key={i} className="flex gap-4 p-3 bg-muted rounded-lg">
        <div className="text-xs text-primary font-mono whitespace-nowrap min-w-[100px]">{exp.year}</div>
        <div>
          <h3 className="font-semibold text-foreground">{exp.role}</h3>
          <p className="text-sm text-muted-foreground">{exp.company}</p>
          <p className="text-xs text-muted-foreground">{exp.location}</p>
          {exp.skills && <p className="text-xs text-primary/70 mt-1">{exp.skills}</p>}
        </div>
      </div>
    ))}
  </div>
);

export const VisionSection = () => (
  <div className="space-y-4">
    <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
      ✨ 2026 Vision Board
    </h2>
    
    <div className="grid grid-cols-3 gap-3">
      {/* Vision cards with cute aesthetic */}
      <div className="p-3 bg-gradient-to-br from-pink-100 to-rose-200 rounded-xl text-center shadow-sm border border-pink-200">
        <div className="text-2xl mb-1">💼</div>
        <div className="font-semibold text-rose-700 text-sm">Dream Job</div>
        <div className="text-xs text-rose-600">Independent</div>
      </div>
      
      <div className="p-3 bg-gradient-to-br from-blue-100 to-sky-200 rounded-xl text-center shadow-sm border border-blue-200">
        <div className="text-2xl mb-1">🌏</div>
        <div className="font-semibold text-sky-700 text-sm">Travel</div>
        <div className="text-xs text-sky-600">Visit Japan</div>
      </div>
      
      <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-200 rounded-xl text-center shadow-sm border border-green-200">
        <div className="text-2xl mb-1">📚</div>
        <div className="font-semibold text-emerald-700 text-sm">Learn</div>
        <div className="text-xs text-emerald-600">Fluent in Japanese</div>
      </div>
      
      <div className="p-3 bg-gradient-to-br from-purple-100 to-violet-200 rounded-xl text-center shadow-sm border border-purple-200">
        <div className="text-2xl mb-1">🏠</div>
        <div className="font-semibold text-violet-700 text-sm">Lifestyle</div>
        <div className="text-xs text-violet-600">Cozy home setup</div>
      </div>
      
      <div className="p-3 bg-gradient-to-br from-amber-100 to-yellow-200 rounded-xl text-center shadow-sm border border-yellow-200">
        <div className="text-2xl mb-1">💪</div>
        <div className="font-semibold text-amber-700 text-sm">Health</div>
        <div className="text-xs text-amber-600">Consistent routine</div>
      </div>
      
      <div className="p-3 bg-gradient-to-br from-teal-100 to-cyan-200 rounded-xl text-center shadow-sm border border-teal-200">
        <div className="text-2xl mb-1">🌟</div>
        <div className="font-semibold text-teal-700 text-sm">Open Source</div>
        <div className="text-xs text-teal-600">Major contribution</div>
      </div>
    </div>
    
    {/* Affirmation */}
    <div className="p-3 bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 rounded-lg text-center border border-purple-100">
      <p className="text-sm italic text-purple-600">"Building the future, one commit at a time 🚀"</p>
    </div>
  </div>
);

export const ContactSection = () => (
  <div className="space-y-4">
    <p className="text-muted-foreground">Let's connect! Fill out the form or reach out directly.</p>
    <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
      <input type="text" placeholder="Your Name" className="w-full p-2 border border-border rounded bg-background text-foreground" />
      <input type="email" placeholder="Your Email" className="w-full p-2 border border-border rounded bg-background text-foreground" />
      <textarea placeholder="Your Message" rows={3} className="w-full p-2 border border-border rounded bg-background text-foreground" />
      <button type="submit" className="xp-button w-full">Send Message</button>
    </form>
  </div>
);
