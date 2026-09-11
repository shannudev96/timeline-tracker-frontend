import { useState } from "react";
import { projects } from "../data/mockData";
import TaskDrawer from "../components/TaskDrawer";
import StatusBadge from "../components/StatusBadge";
import type { Task } from "../types";

export default function Tasks() {
  const all = projects.flatMap(p => p.tasks);
  const [selected, setSelected] = useState<Task | null>(null);
  return <>
    <div className="page-title"><div><h1>My Tasks</h1><p>Work assigned to you across all projects.</p></div><button className="primary">+ New Task</button></div>
    <div className="toolbar"><button className="secondary">All status ▾</button><button className="secondary">All priorities ▾</button><button className="secondary">Due date ▾</button></div>
    <div className="task-board">{["todo","in_progress","blocked","completed"].map(status => <div className="task-column" key={status}><div className="column-head"><StatusBadge status={status}/><b>{all.filter(t=>t.status===status).length}</b></div>{all.filter(t=>t.status===status).map(t=><button className="mini-task" key={t.id} onClick={()=>setSelected(t)}><b>{t.title}</b><small>{projects.find(p=>p.tasks.some(x=>x.id===t.id))?.name}</small><div><span className={`priority priority-${t.priority}`}>{t.priority}</span><span>{t.dueDate}</span></div></button>)}</div>)}</div>
    {selected && <TaskDrawer task={selected} onClose={()=>setSelected(null)}/>}
  </>;
}