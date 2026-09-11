import { Link } from "react-router-dom";
import { projects } from "../data/mockData";
import StatusBadge from "../components/StatusBadge";

export default function Dashboard() {
  const activeProjects = projects.filter(
    (project) => project.status !== "completed",
  ).length;

  const inProgressProjects = projects.filter(
    (project) => project.progress > 0 && project.progress < 100,
  ).length;

  const completedProjects = projects.filter(
    (project) => project.status === "completed",
  ).length;

  const atRiskProjects = projects.filter(
    (project) => project.status === "at_risk",
  ).length;

  return (
    <div className="dashboard">
      {/* Statistics */}
      <section className="dashboard-stats">
        <StatCard
          value={activeProjects}
          label="Active Projects"
          className="stat-blue"
        />

        <StatCard
          value={inProgressProjects}
          label="In Progress"
          className="stat-purple"
        />

        <StatCard
          value={completedProjects}
          label="Completed"
          className="stat-green"
        />

        <StatCard
          value={atRiskProjects}
          label="Over Due"
          className="stat-red"
        />
      </section>

      {/* Projects */}
      <section className="projects-section">
        <div className="projects-toolbar">
          <h2>All Projects</h2>

          <div className="project-actions">
            <div className="project-search">
              <span>⌕</span>
              <input placeholder="Search projects..." />
            </div>

            <button className="filter-btn">
              <span>☷</span>
              <span>Filter</span>
            </button>

            <button className="new-project-btn">
              <span>＋</span>
              New Project
            </button>
          </div>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>
      </section>

      {/* Pagination */}
      <div className="pagination-container">
        <span className="project-count">
          Showing 1–{projects.length} of 40 Projects
        </span>

        <div className="pagination">
          <button aria-label="Previous page">‹</button>

          <button className="pagination-active">1</button>

          <button>2</button>
          <button>3</button>
          <button>...</button>
          <button>8</button>

          <button aria-label="Next page">›</button>
        </div>
      </div>
    </div>
  );
}


/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  value,
  label,
  className,
}: {
  value: number;
  label: string;
  className: string;
}) {
  return (
    <div className={`stat-card ${className}`}>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}


/* =========================================================
   PROJECT CARD
========================================================= */

function ProjectCard({
  project,
}: {
  project: (typeof projects)[number];
}) {
  const completedTasks = project.tasks.filter(
    (task) => task.status === "completed",
  ).length;

  const totalTasks = project.tasks.length;

  const priority =
    project.status === "at_risk"
      ? "High"
      : project.progress >= 80
        ? "Medium"
        : "High";

  return (
    <Link
      to={`/projects/${project.id}`}
      className="dashboard-project-card"
    >
      {/* Header */}
      <div className="project-card-header">
        <h3>{project.name}</h3>

        <button
          type="button"
          className="project-menu"
          aria-label={`More options for ${project.name}`}
          onClick={(event) => event.preventDefault()}
        >
          •••
        </button>
      </div>

      {/* Tags */}
      <div className="project-tags">
        <StatusBadge status={project.status} />

        <span
          className={`priority-tag priority-${priority.toLowerCase()}`}
        >
          {priority}
        </span>
      </div>

      {/* Progress */}
      <div className="project-progress">
        <div className="progress-header">
          <span>Progress</span>

          <strong>{project.progress}%</strong>
        </div>

        <div className="progress-track">
          <div
            className="progress-value"
            style={{ width: `${project.progress}%` }}
          />
        </div>

        <div className="task-count">
          {completedTasks} / {totalTasks} tasks completed
        </div>
      </div>

      {/* Footer */}
      <div className="project-card-footer">
        <div className="project-members">
          <span className="member member-1">S</span>
          <span className="member member-2">R</span>
          <span className="member member-3">P</span>

          {project.tasks.length > 3 && (
            <span className="member member-more">
              +{project.tasks.length - 3}
            </span>
          )}
        </div>

        <span className="project-due">
          Due: {project.endDate}
        </span>
      </div>
    </Link>
  );
}