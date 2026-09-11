export default function StatusBadge({ status }: { status: string }) {
  const labels: Record<string, string> = {
    on_track: "On Track", at_risk: "At Risk", completed: "Completed",
    todo: "To Do", in_progress: "In Progress", blocked: "Blocked", cancelled: "Cancelled",
  };
  return <span className={`status status-${status}`}>{labels[status] ?? status}</span>;
}