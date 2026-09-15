import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/project-details.css";
import { projects } from "../data/mockData";
import Timeline from "../components/Timeline";
import TaskDrawer from "../components/TaskDrawer";
import StatusBadge from "../components/StatusBadge";
import type { Task } from "../types";


export default function ProjectDetails() {
  const { projectId } = useParams();
  const project = projects.find(p => p.id === projectId) ?? projects[0];
  const [tab, setTab] = useState("Timeline");
  const [task, setTask] = useState<Task | null>(null);
  const tabs = ["Overview", "Timeline", "Tasks", "Calendar", "Files", "Activity"];
  return (
    <div className="project-detail">
      <div className="project-header">
        <div><Link to="/projects" className="back">← Projects</Link><div className="title-line"><h1>{project.name}</h1><StatusBadge status={project.status} /></div><p>{project.description}</p></div>
        <div className="header-actions"><button className="secondary">•••</button><button className="primary">+ Add</button></div>
      </div>
      <div className="project-summary">
        <div><label>Vendor</label><b>{project.vendor}</b></div>
        <div><label>Customers</label><div className="chip-list">{project.customers.map(c => <span className="chip" key={c.id}>{c.name}</span>)}</div></div>
        <div><label>Overall progress</label><div className="summary-progress"><div className="progress"><i style={{width:`${project.progress}%`}} /></div><b>{project.progress}%</b></div></div>
        <div><label>Timeline</label><b>{project.startDate} → {project.endDate}</b></div>
      </div>
      <div className="tabs">{tabs.map(t => <button key={t} className={tab === t ? "tab active" : "tab"} onClick={() => setTab(t)}>{t}</button>)}</div>
      {tab === "Timeline" && <Timeline project={project} onTaskClick={setTask} />}
      {tab === "Overview" && <Overview project={project} />}
      {tab === "Tasks" && <TaskList project={project} onTaskClick={setTask} />}
      {tab === "Calendar" && <div className="empty-panel"><h2>Project Calendar</h2><p>Calendar view will use the same tasks and milestones as the timeline.</p></div>}
      {tab === "Files" && <div className="empty-panel"><h2>Project Files</h2><p>Files attached to tasks and project-level documents will appear here.</p></div>}
      {tab === "Activity" && <div className="activity-list"><div><span className="avatar small">R</span><p><b>Rahul</b> changed Hardware development to 64%<small>Today, 09:40</small></p></div><div><span className="avatar small">P</span><p><b>Priya</b> commented on Hardware development<small>Yesterday, 16:20</small></p></div></div>}
      {task && <TaskDrawer task={task} onClose={() => setTask(null)} />}
    </div>
  );
}

function Overview({ project }: { project: typeof projects[number] }) {
  return <div className="overview-grid"><div className="panel"><h2>Schedule Summary</h2>{project.schedules.map(s => <div className="schedule-summary" key={s.id}><span className={`schedule-dot dot-${s.type}`} /><div><b>{s.name}</b><small>{s.owner}</small></div><span>{project.tasks.filter(t => t.scheduleId === s.id).length} tasks</span></div>)}</div><div className="panel"><h2>Upcoming Milestones</h2>{project.milestones.map(m => <div className="milestone-item" key={m.id}><span className="diamond">◆</span><div><b>{m.name}</b><small>{m.date}</small></div></div>)}</div></div>;
}
function TaskList({ project, onTaskClick }: { project: typeof projects[number], onTaskClick: (t: Task) => void }) {
  return <div className="project-table"><div className="table-head"><span>Task</span><span>Schedule</span><span>Assignee</span><span>Status</span><span>Due</span></div>{project.tasks.map(t => <button className="table-row task-row" onClick={() => onTaskClick(t)} key={t.id}><div><b>{t.title}</b><small>{t.description}</small></div><span>{project.schedules.find(s=>s.id===t.scheduleId)?.name}</span><span>{t.assigneeId}</span><StatusBadge status={t.status}/><span>{t.dueDate}</span></button>)}</div>;
}