import { useState } from 'react'

export default function TaskModal({ task, users, projects, onClose, onSubmit }) {
  const [title, setTitle] = useState(task?.title || '')
  const [description, setDescription] = useState(task?.description || '')
  const [status, setStatus] = useState(task?.status || 'TODO')
  const [priority, setPriority] = useState(task?.priority || 'MEDIUM')
  const [dueDate, setDueDate] = useState(task?.dueDate || '')
  const [assignedToId, setAssignedToId] = useState(task?.assignedTo?.id || '')
  const [projectId, setProjectId] = useState(task?.project?.id || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      title, description, status, priority,
      dueDate: dueDate || null,
      assignedToId: assignedToId || null,
      projectId: projectId || null
    })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{task ? 'Edit Task' : 'New Task'}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title *</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required placeholder="Task title..." />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} placeholder="Task description..." />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Status</label>
              <select value={status} onChange={e => setStatus(e.target.value)}>
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
              </select>
            </div>
            <div className="form-group">
              <label>Priority</label>
              <select value={priority} onChange={e => setPriority(e.target.value)}>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Due Date</label>
              <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Assignee</label>
              <select value={assignedToId} onChange={e => setAssignedToId(e.target.value)}>
                <option value="">Unassigned</option>
                {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Project</label>
            <select value={projectId} onChange={e => setProjectId(e.target.value)}>
              <option value="">No Project</option>
              {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">{task ? 'Update' : 'Create'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
