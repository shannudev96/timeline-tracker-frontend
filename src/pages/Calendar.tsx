import { projects } from "../data/mockData";

export default function Calendar() {
  const cells = Array.from({length: 35}, (_, i) => i - 2);
  const tasks = projects.flatMap(p => p.tasks);
  return <div className="project">
    <div className="calendar"><div className="calendar-head">{["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(x=><b key={x}>{x}</b>)}</div><div className="calendar-grid">{cells.map((n,i)=><div className={`day ${n<1||n>30?"muted":""}`} key={i}><span>{n>0&&n<=30?n:""}</span>{tasks.filter(t=>Number(t.startDate.slice(-2))===n).slice(0,2).map(t=><div className="calendar-task" key={t.id}>{t.title}</div>)}</div>)}</div></div>
  </div>;
}