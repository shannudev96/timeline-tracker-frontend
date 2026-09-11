import { useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "../data/mockData";
import StatusBadge from "../components/StatusBadge";

export default function Projects() {
  const [q, setQ] = useState("");
  const filtered = projects.filter(p => `${p.name} ${p.vendor}`.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <div className="page-title"><div><h1>Projects</h1><p>Manage every project and its delivery timelines.</p></div><button className="primary">+ New Project</button></div>
      <div className="toolbar"><input value={q} onChange={e => setQ(e.target.value)} placeholder="Search projects..." /><button className="secondary">Status ▾</button><button className="secondary">Vendor ▾</button><div className="view-toggle"><button className="selected">▦</button><button>☷</button></div></div>
      <div className="project-grid">
        {filtered.map(p => <Link to={`/projects/${p.id}`} className="project-card" key={p.id}>
          <div className="card-top"><StatusBadge status={p.status} /><span>•••</span></div>
          <h2>{p.name}</h2><p>{p.description}</p>
          <div className="card-meta"><span>Vendor</span><b>{p.vendor}</b></div>
          <div className="progress-line"><div className="progress"><i style={{ width: `${p.progress}%` }} /></div><b>{p.progress}%</b></div>
          <div className="card-footer"><span>{p.startDate} → {p.endDate}</span><span>{p.customers.length} customers</span></div>
        </Link>)}
      </div>
    </>
  );
}