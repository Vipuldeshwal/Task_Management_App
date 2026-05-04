import { useState, useEffect } from 'react'
import { getTasks, getUsers, getProjects, createTask, updateTask, updateTaskStatus, deleteTask } from '../services/api'
import { useAuth } from '../context/useAuth'
import toast from 'react-hot-toast'
import TaskModal from '../components/TaskModal'
import { HiOutlinePlus, HiOutlineDocumentText, HiOutlineClock, HiOutlineTrendingUp, HiOutlineCheckCircle, HiOutlineTrash, HiOutlinePencil } from 'react-icons/hi'

export default function Dashboard() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState([])
  const [users, setUsers] = useState([])
  const [projects, setProjects] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editTask, setEditTask] = useState(null)

  const fetchDashboardData = async () => {
    const [tasksResponse, usersResponse, projectsResponse] = await Promise.all([
      getTasks(),
      getUsers(),
      getProjects(),
    ])

    return {
      tasks: tasksResponse.data,
      users: usersResponse.data,
      projects: projectsResponse.data,
    }
  }

  const loadData = async () => {
    try {
      const data = await fetchDashboardData()
      setTasks(data.tasks)
      setUsers(data.users)
      setProjects(data.projects)
    } catch {
      toast.error('Failed to load data')
    }
  }

  useEffect(() => {
    let cancelled = false

    const initialize = async () => {
      try {
        const data = await fetchDashboardData()
        if (cancelled) return

        setTasks(data.tasks)
        setUsers(data.users)
        setProjects(data.projects)
      } catch {
        if (!cancelled) {
          toast.error('Failed to load data')
        }
      }
    }

    initialize()

    return () => {
      cancelled = true
    }
  }, [])

  const handleCreateTask = async (data) => {
    try {
      await createTask(data)
      toast.success('Task created!')
      loadData()
      setShowModal(false)
    } catch {
      toast.error('Failed to create task')
    }
  }

  const handleUpdateTask = async (id, data) => {
    try {
      await updateTask(id, data)
      toast.success('Task updated!')
      loadData()
      setShowModal(false)
      setEditTask(null)
    } catch {
      toast.error('Failed to update task')
    }
  }

  const handleStatusChange = async (id, status) => {
    try {
      await updateTaskStatus(id, status)
      toast.success('Status updated!')
      loadData()
    } catch {
      toast.error('Failed to update status')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this task?')) return
    try {
      await deleteTask(id)
      toast.success('Task deleted!')
      loadData()
    } catch {
      toast.error('Failed to delete task')
    }
  }

  const todoTasks = tasks.filter(t => t.status === 'TODO')
  const progressTasks = tasks.filter(t => t.status === 'IN_PROGRESS')
  const doneTasks = tasks.filter(t => t.status === 'DONE')
  const overdue = tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'DONE')

  return (
    <div className="dashboard">
      <header className="dash-header">
        <div>
          <h1>Welcome, {user?.name} 👋</h1>
          <p className="dash-subtitle">Here's your project overview</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setEditTask(null); setShowModal(true) }}>
          <HiOutlinePlus size={18} /> New Task
        </button>
      </header>


      <div className="stats-grid">
        <div className="stat-card"><div className="stat-icon total"><HiOutlineDocumentText size={24} /></div>
          <div className="stat-info"><span className="stat-value">{tasks.length}</span><span className="stat-label">Total Tasks</span></div></div>
        <div className="stat-card"><div className="stat-icon todo"><HiOutlineClock size={24} /></div>
          <div className="stat-info"><span className="stat-value">{todoTasks.length}</span><span className="stat-label">To Do</span></div></div>
        <div className="stat-card"><div className="stat-icon progress"><HiOutlineTrendingUp size={24} /></div>
          <div className="stat-info"><span className="stat-value">{progressTasks.length}</span><span className="stat-label">In Progress</span></div></div>
        <div className="stat-card"><div className="stat-icon done"><HiOutlineCheckCircle size={24} /></div>
          <div className="stat-info"><span className="stat-value">{doneTasks.length}</span><span className="stat-label">Completed</span></div></div>
      </div>

      {overdue.length > 0 && (
        <div className="overdue-banner">⚠️ You have {overdue.length} overdue task{overdue.length > 1 ? 's' : ''}!</div>
      )}


      <h2 className="section-title">Task Board</h2>
      <div className="kanban-board">
        {[{ title: 'To Do', status: 'TODO', items: todoTasks, cls: 'todo' },
          { title: 'In Progress', status: 'IN_PROGRESS', items: progressTasks, cls: 'progress' },
          { title: 'Done', status: 'DONE', items: doneTasks, cls: 'done' }].map(col => (
          <div className="kanban-column" key={col.status}>
            <div className={`kanban-header ${col.cls}-header`}>
              <span className={`kanban-dot ${col.cls}-dot`}></span>
              <h3>{col.title}</h3>
              <span className="kanban-count">{col.items.length}</span>
            </div>
            <div className="kanban-cards">
              {col.items.map(task => (
                <div className="kanban-card" key={task.id}>
                  <div className="kanban-card-title">{task.title}</div>
                  {task.description && <div className="kanban-card-desc">{task.description}</div>}
                  <div className="kanban-card-footer">
                    <span className={`priority-badge priority-${task.priority}`}>{task.priority}</span>
                    <span className="kanban-card-assignee">{task.assignedTo?.name || 'Unassigned'}</span>
                  </div>
                  {task.dueDate && <div className="kanban-card-due">Due: {task.dueDate}</div>}
                  <div className="kanban-card-actions">
                    {task.status !== 'DONE' && (
                      <button className="btn btn-sm btn-secondary"
                        onClick={() => handleStatusChange(task.id, task.status === 'TODO' ? 'IN_PROGRESS' : 'DONE')}>
                        {task.status === 'TODO' ? '→ Progress' : '→ Done'}
                      </button>
                    )}
                    <button className="btn btn-sm btn-secondary" onClick={() => { setEditTask(task); setShowModal(true) }}>
                      <HiOutlinePencil size={14} />
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(task.id)}>
                      <HiOutlineTrash size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>


      <div className="bottom-sections">
        <div className="section-block">
          <h2 className="section-title">Team ({users.length})</h2>
          <div className="team-list">
            {users.map(u => (
              <div className="team-card" key={u.id}>
                <div className="team-avatar">{u.name[0]}</div>
                <div className="team-info">
                  <h3>{u.name}</h3>
                  <p>{u.email}</p>
                  <span className="team-role">{u.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="section-block">
          <h2 className="section-title">Projects ({projects.length})</h2>
          <div className="project-list">
            {projects.map(p => (
              <div className="project-card" key={p.id}>
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <div className="project-meta">
                  <span>By {p.createdBy?.name}</span>
                  <span>{tasks.filter(t => t.project?.id === p.id).length} tasks</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <TaskModal
          task={editTask}
          users={users}
          projects={projects}
          onClose={() => { setShowModal(false); setEditTask(null) }}
          onSubmit={editTask ? (data) => handleUpdateTask(editTask.id, data) : handleCreateTask}
        />
      )}
    </div>
  )
}
