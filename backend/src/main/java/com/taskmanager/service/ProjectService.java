package com.taskmanager.service;

import com.taskmanager.entity.Project;
import com.taskmanager.entity.User;
import com.taskmanager.repository.ProjectRepository;
import com.taskmanager.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public ProjectService(ProjectRepository projectRepository, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public Project createProject(String name, String description, Long createdById) {
        User creator = userRepository.findById(createdById)
                .orElseThrow(() -> new NoSuchElementException("User not found with id: " + createdById));
        Project project = new Project();
        project.setName(name);
        project.setDescription(description);
        project.setCreatedBy(creator);
        return projectRepository.save(project);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project getProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Project not found with id: " + id));
    }

    public Project updateProject(Long id, String name, String description) {
        Project project = getProjectById(id);
        project.setName(name);
        project.setDescription(description);
        return projectRepository.save(project);
    }

    public void deleteProject(Long id) {
        Project project = getProjectById(id);
        projectRepository.delete(project);
    }
}
