"use client";
import Image from "next/image";
import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useRouter } from "next/navigation";

import FormField from "./FormField";
import Button from "./Button";
import CustomMenu from "./CustomMenu";
import { categoryFilters } from "@/constant";
import { FormState, ProjectInterface, SessionInterface } from "@/common.types";
import { ProjectsContext } from "@/context/context";

type Props = {
  type: string;
  project?: ProjectInterface;
};

type PropsCard = {
  id: string;
  image: string;
  title: string;
  name: string;
  avatarUrl: string;
  userId: string;
};
const ProjectForm = ({ type, project }: Props) => {
  const router = useRouter();
  const { projects, setProjects } = useContext(ProjectsContext);

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [form, setForm] = useState<FormState>({
    title: project?.title || "",
    description: project?.description || "",
    image: project?.image || "",
    liveSiteUrl: project?.liveSiteUrl || "",
    githubUrl: project?.githubUrl || "",
    category: project?.category || "",
  });

  const handleStateChange = (fieldName: keyof FormState, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes("image")) {
      alert("Please upload an image!");

      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;

      handleStateChange("image", result);
    };
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      if (type === "create") {
        setProjects([
          ...projects,
          {
            id: projects.length.toString(),
            avatarUrl: "",
            image: form.image,
            name: "Default user",
            title: form.title,
            userId: "1",
            description: form.description,
            githubUrl: form.githubUrl,
            category: form.category,
            liveSiteUrl: form.liveSiteUrl,
          },
        ]);
        router.push("/");
      }
    } catch (error) {
      alert(
        `Failed to ${
          type === "create" ? "create" : "edit"
        } a project. Try again!`
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && "Choose a poster for your project"}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          required={type === "create" ? true : false}
          className="form_image-input"
          onChange={(e) => handleChangeImage(e)}
        />
        {form.image && (
          <Image
            src={form?.image}
            className="sm:p-10 object-contain z-20"
            alt="image"
            fill
          />
        )}
      </div>

      <FormField
        title="Title"
        state={form.title}
        placeholder="Flexibble"
        setState={(value) => handleStateChange("title", value)}
      />

      <FormField
        title="Description"
        state={form.description}
        placeholder="Showcase and discover remarkable developer projects."
        isTextArea
        setState={(value) => handleStateChange("description", value)}
      />

      <FormField
        type="url"
        title="Website URL"
        state={form.liveSiteUrl}
        placeholder="https://ashflexibble.pro"
        setState={(value) => handleStateChange("liveSiteUrl", value)}
      />

      <FormField
        type="url"
        title="GitHub URL"
        state={form.githubUrl}
        placeholder="https://github.com/samjason"
        setState={(value) => handleStateChange("githubUrl", value)}
      />

      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange("category", value)}
      />

      <div className="flexStart w-full">
        <Button
          title={
            submitting
              ? `${type === "create" ? "Creating" : "Editing"}`
              : `${type === "create" ? "Create" : "Edit"}`
          }
          type="submit"
          leftIcon={submitting ? "" : "/plus.svg"}
          submitting={submitting}
        />
      </div>
    </form>
  );
};

export default ProjectForm;
