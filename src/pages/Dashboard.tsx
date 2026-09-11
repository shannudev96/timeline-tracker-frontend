import { Link } from "react-router-dom";
import { projects } from "../data/mockData";
import StatusBadge from "../components/StatusBadge";

export default function Dashboard() {
  const active = projects.filter(p => p.status !== "completed").length;
  const risk = projects.filter(p => p.status === "at_risk").length;
  const overdue = 3;
  return (
    <>
      <div className="page-title"><div><h1>Dashboard</h1><p>Project delivery at a glance.</p></div><Link className="primary" to="/projects">View projects</Link></div>
      <div className="stats">
        <div className="stat"><span>Projects</span><strong>{projects.length}</strong><small>Total projects</small></div>
        <div className="stat"><span>Active</span><strong>{active}</strong><small>Currently running</small></div>
        <div className="stat"><span>At Risk</span><strong>{risk}</strong><small>Need attention</small></div>
        <div className="stat"><span>Overdue</span><strong>{overdue}</strong><small>Tasks past due</small></div>
      </div>
      <div className="section-head"><h2>Projects</h2><Link to="/projects">See all →</Link></div>
      <div className="project-table">
        <div className="table-head"><span>Project</span><span>Vendor</span><span>Progress</span><span>Status</span><span>Timeline</span></div>
        {projects.map(p => <Link className="table-row" to={`/projects/${p.id}`} key={p.id}><div><b>{p.name}</b><small>{p.description}</small></div><span>{p.vendor}</span><div className="progress-cell"><div className="progress"><i style={{ width: `${p.progress}%` }} /></div><small>{p.progress}%</small></div><StatusBadge status={p.status} /><span>{p.startDate} → {p.endDate}</span></Link>)}
      </div>
    </>
  );
}