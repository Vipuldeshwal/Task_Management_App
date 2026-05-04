package com.taskmanager.controller;

import com.taskmanager.entity.Task;
import com.taskmanager.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Map<String, Object> body) {
        String title = (String) body.get("title");
        String description = (String) body.get("description");
        String priority = (String) body.get("priority");
        LocalDate dueDate = body.get("dueDate") != null ? LocalDate.parse((String) body.get("dueDate")) : null;
        Long assignedToId = body.get("assignedToId") != null ? Long.valueOf(body.get("assignedToId").toString()) : null;
        Long projectId = body.get("projectId") != null ? Long.valueOf(body.get("projectId").toString()) : null;

        Task task = taskService.createTask(title, description, priority, dueDate, assignedToId, projectId);
        return ResponseEntity.status(HttpStatus.CREATED).body(task);
    }

    @GetMapping
    public List<Task> getAllTasks(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String priority) {
        if (status != null && !status.isBlank()) {
            return taskService.getTasksByStatus(status);
        }
        if (priority != null && !priority.isBlank()) {
            return taskService.getTasksByPriority(priority);
        }
        return taskService.getAllTasks();
    }

    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Long id) {
        return taskService.getTaskById(id);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        String title = (String) body.get("title");
        String description = (String) body.get("description");
        String status = (String) body.get("status");
        String priority = (String) body.get("priority");
        LocalDate dueDate = body.get("dueDate") != null ? LocalDate.parse((String) body.get("dueDate")) : null;
        Long assignedToId = body.get("assignedToId") != null ? Long.valueOf(body.get("assignedToId").toString()) : null;
        Long projectId = body.get("projectId") != null ? Long.valueOf(body.get("projectId").toString()) : null;

        return taskService.updateTask(id, title, description, status, priority, dueDate, assignedToId, projectId);
    }

    @PatchMapping("/{id}/status")
    public Task updateStatus(@PathVariable Long id, @RequestParam String status) {
        return taskService.updateStatus(id, status);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
}
