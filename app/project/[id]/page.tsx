'use client';

import React, { useContext } from 'react';
import Image from "next/image";
import Link from "next/link";
import Modal from "@/components/Modal";
import { ProjectsContext } from "@/context/context";

const Projects = () => {
    const { projects } = useContext(ProjectsContext);

    if (!projects.length) return (
        <p className="no-result-text">No projects available</p>
    );

    return (
        <>
            {projects.map((project, index) => (
                <Modal key={index}>
                    <section className="project-details">
                        <div className="project-header">
                            <Image
                                src={project.image}
                                alt={project.title}
                                width={1064}
                                height={798}
                                className="project-image"
                            />
                            <div className="flex flex-col gap-10 my-4">
                            <h2 className="text-2xl font-bold mb-2 text-primary-purple">Title:<span className='mx-2 text-gray'>{project.title}</span></h2>
                            <p className="text-gray-600 mb-3 text-primary-purple">Description:<span className='mx-2 text-gray'>{project.description}</span></p>
                                {project.category && (
                                    <p className="project-category text-primary-purple">Category:<span className=' text-gray mx-2'>{project.category}</span></p>
                                )}
                                {project.liveSiteUrl && (
                                    <Link href={project.liveSiteUrl} passHref>
                                        <span className="text-blue-600 hover:text-blue-800 transition-colors duration-300">Live Site</span>
                                    </Link>
                                )}
                                {project.githubUrl && (
                                    <Link href={project.githubUrl} passHref>
                                        <span className="text-blue-600 hover:text-blue-800 transition-colors duration-300">GitHub</span>
                                    </Link>
                                )}
                            </div>
                        </div>

                        <div className="project-footer">
                        </div>
                    </section>
                </Modal>
            ))}
        </>
    );
};

export default Projects;
