import { Github, Linkedin, Mail, MapPin, Sparkles } from "lucide-react";
import avatar from "@/assets/avatar.png";

export const AboutSection = () => (
  <div className="space-y-4">
    <div className="flex items-start gap-4">
      <img 
        src={avatar} 
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
      { year: "2022-Present", role: "Senior Data Engineer", company: "Tech Corp", desc: "Leading data infrastructure initiatives" },
      { year: "2020-2022", role: "Data Engineer", company: "StartupXYZ", desc: "Built ETL pipelines from scratch" },
      { year: "2018-2020", role: "Junior Developer", company: "Agency Inc", desc: "Full-stack web development" },
    ].map((exp, i) => (
      <div key={i} className="flex gap-4 p-3 bg-muted rounded-lg">
        <div className="text-sm text-primary font-mono whitespace-nowrap">{exp.year}</div>
        <div>
          <h3 className="font-semibold text-foreground">{exp.role}</h3>
          <p className="text-sm text-muted-foreground">{exp.company} • {exp.desc}</p>
        </div>
      </div>
    ))}
  </div>
);

export const VisionSection = () => (
  <div className="space-y-4">
    <p className="text-foreground leading-relaxed">
      I believe in <span className="text-primary font-semibold">continuous learning</span> and building technology that makes a positive impact.
    </p>
    <div className="grid gap-3">
      {["Master cloud-native architectures", "Contribute to open source", "Mentor aspiring engineers", "Build accessible tech"].map((goal, i) => (
        <div key={i} className="flex items-center gap-2 p-2 bg-accent/10 rounded">
          <span className="text-accent">✓</span>
          <span className="text-foreground">{goal}</span>
        </div>
      ))}
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
