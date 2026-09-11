import type { Project, Task, Schedule } from "../types";
import { users } from "../data/mockData";
import { useMemo } from "react";

const days = Array.from({ length: 18 }, (_, i) => i + 1);
const months = ["SEP", "OCT", "NOV", "DEC"];

function offset(date: string) {
  const d = new Date(date).getTime();
  const start = new Date("2026-09-01").getTime();
  return Math.max(0, Math.min(100, ((d - start) / (1000 * 60 * 60 * 24)) * 3.1));
}
function width(start: string, end: string) {
  const a = new Date(start).getTime(), b = new Date(end).getTime();
  return Math.max(4, ((b - a) / (1000 * 60 * 60 * 24)) * 3.1);
}

export default function Timeline({ project, onTaskClick }: { project: Project; onTaskClick: (t: Task) => void }) {
  const groups = useMemo(() => project.schedules.map(s => ({ schedule: s, tasks: project.tasks.filter(t => t.scheduleId === s.id) })), [project]);
  return (
    <div className="timeline-card">
      <div className="timeline-head">
        <div className="timeline-scale"><div className="timeline-label">Schedule / Task</div><div className="months">{months.map(m => <span key={m}>{m}</span>)}</div></div>
      </div>
      <div className="timeline-body">
        {groups.map(({ schedule, tasks }) => (
          <div key={schedule.id} className="schedule-group">
            <div className="schedule-title"><span className={`schedule-dot dot-${schedule.type}`} />{schedule.name}<small>{schedule.owner}</small></div>
            {tasks.map(task => {
              const person = users.find(u => u.id === task.assigneeId);
              return <div className="timeline-row" key={task.id}>
                <div className="task-name" onClick={() => onTaskClick(task)}><span className="task-chevron">›</span>{task.title}<span className="task-person">{person?.initials}</span></div>
                <div className="track">
                  <div className={`task-bar bar-${task.status}`} style={{ left: `${offset(task.startDate)}%`, width: `${width(task.startDate, task.dueDate)}%` }} onClick={() => onTaskClick(task)}>
                    <span>{task.progress}%</span>
                  </div>
                </div>
              </div>
            })}
            {project.milestones.filter(m => m.scheduleId === schedule.id).map(m => (
              <div className="timeline-row milestone-row" key={m.id}><div className="task-name"><span className="diamond">◆</span>{m.name}</div><div className="track"><div className="milestone" style={{ left: `${offset(m.date)}%` }} title={m.date}>◆</div></div></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}