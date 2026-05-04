package com.taskmanager.service;

import com.taskmanager.entity.Project;
import com.taskmanager.entity.Task;
import com.taskmanager.entity.User;
import com.taskmanager.repository.ProjectRepository;
import com.taskmanager.repository.TaskRepository;
import com.taskmanager.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository,
                       ProjectRepository projectRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
    }

    public Task createTask(String title, String description, String priority,
                           LocalDate dueDate, Long assignedToId, Long projectId) {
        Task task = new Task();
        task.setTitle(title);
        task.setDescription(description);
        task.setPriority(priority != null ? priority : "MEDIUM");

        if (assignedToId != null) {
            User assignee = userRepository.findById(assignedToId)
                    .orElseThrow(() -> new NoSuchElementException("User not found with id: " + assignedToId));
            task.setAssignedTo(assignee);
        }

        if (projectId != null) {
            Project project = projectRepository.findById(projectId)
                    .orElseThrow(() -> new NoSuchElementException("Project not found with id: " + projectId));
            task.setProject(project);
        }

        task.setDueDate(dueDate);
        return taskRepository.save(task);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Task not found with id: " + id));
    }

    public List<Task> getTasksByStatus(String status) {
        return taskRepository.findByStatus(status);
    }

    public List<Task> getTasksByPriority(String priority) {
        return taskRepository.findByPriority(priority);
    }

    public List<Task> getTasksByProject(Long projectId) {
        return taskRepository.findByProjectId(projectId);
    }

    public Task updateTask(Long id, String title, String description, String status,
                           String priority, LocalDate dueDate, Long assignedToId, Long projectId) {
        Task task = getTaskById(id);

        if (title != null) task.setTitle(title);
        if (description != null) task.setDescription(description);
        if (status != null) task.setStatus(status);
        if (priority != null) task.setPriority(priority);
        if (dueDate != null) task.setDueDate(dueDate);

        if (assignedToId != null) {
            User assignee = userRepository.findById(assignedToId)
                    .orElseThrow(() -> new NoSuchElementException("User not found with id: " + assignedToId));
            task.setAssignedTo(assignee);
        }

        if (projectId != null) {
            Project project = projectRepository.findById(projectId)
                    .orElseThrow(() -> new NoSuchElementException("Project not found with id: " + projectId));
            task.setProject(project);
        }

        return taskRepository.save(task);
    }

    public Task updateStatus(Long id, String status) {
        Task task = getTaskById(id);
        task.setStatus(status);
        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        Task task = getTaskById(id);
        taskRepository.delete(task);
    }

    public long countByStatus(String status) {
        return taskRepository.countByStatus(status);
    }
}
