import { useState } from "react";
import type { Task } from "../types";
import { users } from "../data/mockData";
import StatusBadge from "./StatusBadge";

export default function TaskDrawer({ task, onClose }: { task: Task; onClose: () => void }) {
  const [comment, setComment] = useState("");
  const assignee = users.find(u => u.id === task.assigneeId);
  return (
    <div className="drawer-overlay" onClick={onClose}>
      <aside className="drawer" onClick={e => e.stopPropagation()}>
        <div className="drawer-head"><div><small>Task</small><h2>{task.title}</h2></div><button className="close-btn" onClick={onClose}>×</button></div>
        <div className="drawer-body">
          <div className="drawer-grid">
            <div><label>Status</label><StatusBadge status={task.status} /></div>
            <div><label>Priority</label><b className={`priority priority-${task.priority}`}>{task.priority}</b></div>
            <div><label>Assignee</label><span className="person"><span className="avatar small">{assignee?.initials ?? "?"}</span>{assignee?.name ?? "Unassigned"}</span></div>
            <div><label>Progress</label><b>{task.progress}%</b></div>
            <div><label>Start</label><b>{task.startDate}</b></div>
            <div><label>Due</label><b>{task.dueDate}</b></div>
          </div>
          <section><label>Description</label><p className="description">{task.description}</p></section>
          <section><label>Attachments</label><div className="file-row">▧ specification.pdf <span>2.4 MB</span></div><div className="file-row">▧ test-plan.xlsx <span>840 KB</span></div><button className="secondary full">+ Attach file</button></section>
          <section><label>Comments</label>
            <div className="comment"><span className="avatar small">P</span><div><b>Priya</b><p>@shannu please review the latest specification.</p><small>Today, 10:42</small></div></div>
            <div className="comment"><span className="avatar small">R</span><div><b>Rahul</b><p>Updated the development estimate.</p><small>Yesterday, 16:20</small></div></div>
            <div className="comment-box"><input value={comment} onChange={e => setComment(e.target.value)} placeholder="Write a comment... Use @ to mention" /><button className="primary" onClick={() => setComment("")}>Send</button></div>
          </section>
        </div>
      </aside>
    </div>
  );
}