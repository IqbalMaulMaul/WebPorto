import { HeroSection } from '../../components/sections/HeroSection';
import { AboutSection } from '../../components/sections/AboutSection';
import { SkillsSection } from '../../components/sections/SkillsSection';
import { FeaturedProjects } from '../../components/sections/FeaturedProjects';
import { ExperienceTimeline } from '../../components/sections/ExperienceTimeline';
import { ContactSection } from '../../components/sections/ContactSection';
import { useStudioMotion } from '../../hooks/useStudioMotion';
import { MaterialStudy } from '../../components/sections/MaterialStudy';

export const HomePage = () => {
  useStudioMotion();
  return <><HeroSection /><AboutSection /><SkillsSection /><MaterialStudy /><FeaturedProjects /><ExperienceTimeline /><ContactSection /></>;
};

