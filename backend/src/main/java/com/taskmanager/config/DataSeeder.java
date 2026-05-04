package com.taskmanager.config;

import com.taskmanager.entity.Project;
import com.taskmanager.entity.Task;
import com.taskmanager.entity.User;
import com.taskmanager.repository.ProjectRepository;
import com.taskmanager.repository.TaskRepository;
import com.taskmanager.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedDatabase(UserRepository userRepo, ProjectRepository projectRepo,
                                   TaskRepository taskRepo, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepo.count() > 0) return;


            User admin = new User();
            admin.setName("Vipul");
            admin.setEmail("Vipul@example.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(User.Role.ADMIN);
            admin = userRepo.save(admin);

            User member = new User();
            member.setName("Vaibhav");
            member.setEmail("Vaibhav@example.com");
            member.setPassword(passwordEncoder.encode("member123"));
            member.setRole(User.Role.MEMBER);
            member = userRepo.save(member);


            Project project = new Project();
            project.setName("Task Manager App");
            project.setDescription("Build a full-stack task management application");
            project.setCreatedBy(admin);
            project = projectRepo.save(project);


            Task task1 = new Task();
            task1.setTitle("Set up Spring Boot backend");
            task1.setDescription("Initialize project with proper structure");
            task1.setStatus("DONE");
            task1.setPriority("HIGH");
            task1.setAssignedTo(admin);
            task1.setProject(project);
            task1.setDueDate(LocalDate.now().minusDays(1));
            taskRepo.save(task1);

            Task task2 = new Task();
            task2.setTitle("Create REST API endpoints");
            task2.setDescription("Implement CRUD operations for tasks, users, projects");
            task2.setStatus("IN_PROGRESS");
            task2.setPriority("HIGH");
            task2.setAssignedTo(admin);
            task2.setProject(project);
            task2.setDueDate(LocalDate.now().plusDays(2));
            taskRepo.save(task2);

            Task task3 = new Task();
            task3.setTitle("Build React frontend");
            task3.setDescription("Create a modern dashboard with task board");
            task3.setStatus("TODO");
            task3.setPriority("MEDIUM");
            task3.setAssignedTo(member);
            task3.setProject(project);
            task3.setDueDate(LocalDate.now().plusDays(5));
            taskRepo.save(task3);

            Task task4 = new Task();
            task4.setTitle("Add user authentication");
            task4.setDescription("Implement login/signup with JWT");
            task4.setStatus("TODO");
            task4.setPriority("LOW");
            task4.setAssignedTo(member);
            task4.setProject(project);
            task4.setDueDate(LocalDate.now().plusDays(10));
            taskRepo.save(task4);

            System.out.println("=== Sample data loaded: 2 users, 1 project, 4 tasks ===");
            System.out.println("Admin login: Vipul@example.com / admin123");
            System.out.println("Member login: Vaibhav@example.com / member123");
        };
    }
}
