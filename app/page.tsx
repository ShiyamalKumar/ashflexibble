"use client";
import React, { useContext, useState } from "react";
import { ProjectsContext } from "@/context/context";
import Categories from "@/components/Categories";
import ProjectCard from "@/components/ProjectCard";

const Home = () => {
  const { projects } = useContext(ProjectsContext);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
  };

  const filteredProjects = selectedCategory
    ? projects.filter(project => project.category === selectedCategory)
    : projects;

  return (
    <section className="flexStart flex-col paddings">
      <Categories onCategorySelect={handleCategorySelect} />
      
      <section className="projects-grid">
        {filteredProjects.length > 0 ? (
          filteredProjects.map(node => (
            <ProjectCard
              key={node.id}
              id={node.id}
              image={node.image}
              title={node.title}
              name={node.name}
              avatarUrl={node.avatarUrl}
              userId={node.userId}
            />
          ))
        ) : (
          <p className="no-result-text text-center">No projects found in this category.</p>
        )}
      </section>
    </section>
  );
};

export default Home;
