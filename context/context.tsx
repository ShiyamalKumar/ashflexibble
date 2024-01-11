"use client";
import React, { useState, createContext, ReactNode } from "react";

// Define the PropsCard type
type PropsCard = {
  description?: ReactNode;
  liveSiteUrl?: string;
  githubUrl?: string;
  category?: any;
  createdBy?: any;
  id: string;
  image: string;
  title: string;
  name: string;
  avatarUrl: string;
  userId: string;
};
// Define the type for the provider's props
type PropsCardProviderProps = {
  children: ReactNode;
};

// Create a context
export const ProjectsContext = createContext<{
  projects: PropsCard[];
  setProjects: React.Dispatch<React.SetStateAction<PropsCard[]>>;
}>({
  projects: [],
  setProjects: () => {},
});

// Create a provider component
const Context: React.FC<PropsCardProviderProps> = ({ children }) => {
  const [projects, setProjects] = useState<PropsCard[]>([]);

  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export default Context;
