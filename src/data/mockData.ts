import type { Project, User } from "../types";

export const users: User[] = [
  { id: "u1", name: "Shannu", initials: "S", role: "Project Manager" },
  { id: "u2", name: "Rahul", initials: "R", role: "Frontend Developer" },
  { id: "u3", name: "Priya", initials: "P", role: "Data Analyst" },
  { id: "u4", name: "Arjun", initials: "A", role: "DevOps" },
];

export const projects: Project[] = [
  {
    id: "p1",
    name: "EV ECR Application",
    description: "Application for managing EV ECR workflows, schedules and project delivery.",
    vendor: "ABC Technologies",
    status: "on_track",
    progress: 72,
    startDate: "2026-09-11",
    endDate: "2026-12-31",
    customers: [{ id: "c1", name: "Tata Motors" }, { id: "c2", name: "Mahindra" }],
    schedules: [
      { id: "s1", name: "Vendor Schedule", type: "vendor", owner: "ABC Technologies", startDate: "2026-09-11", endDate: "2026-12-20" },
      { id: "s2", name: "Tata Customer Schedule", type: "customer", owner: "Tata Motors", customerId: "c1", startDate: "2026-09-15", endDate: "2026-12-31" },
      { id: "s3", name: "Mahindra Customer Schedule", type: "customer", owner: "Mahindra", customerId: "c2", startDate: "2026-09-20", endDate: "2027-01-15" },
      { id: "s4", name: "Internal Delivery", type: "internal", owner: "Internal Team", startDate: "2026-09-11", endDate: "2026-12-31" },
    ],
    tasks: [
      { id: "t1", title: "Requirements & specification", description: "Finalize requirements and baseline the ECR specification.", status: "completed", priority: "high", assigneeId: "u1", scheduleId: "s1", startDate: "2026-09-11", dueDate: "2026-09-25", progress: 100 },
      { id: "t2", title: "Hardware development", description: "Vendor hardware development and integration preparation.", status: "in_progress", priority: "high", assigneeId: "u2", scheduleId: "s1", startDate: "2026-09-22", dueDate: "2026-10-20", progress: 64 },
      { id: "t3", title: "Hardware testing", description: "Complete validation and testing before delivery.", status: "todo", priority: "medium", assigneeId: "u3", scheduleId: "s1", startDate: "2026-10-21", dueDate: "2026-11-10", progress: 0 },
      { id: "t4", title: "Customer UAT", description: "Customer acceptance testing.", status: "todo", priority: "urgent", assigneeId: "u1", scheduleId: "s2", startDate: "2026-11-20", dueDate: "2026-12-05", progress: 0 },
      { id: "t5", title: "Integration", description: "Internal integration and deployment preparation.", status: "in_progress", priority: "high", assigneeId: "u4", scheduleId: "s4", startDate: "2026-10-25", dueDate: "2026-11-25", progress: 48 },
      { id: "t6", title: "Mahindra acceptance", description: "Acceptance and sign-off for Mahindra schedule.", status: "blocked", priority: "high", assigneeId: "u1", scheduleId: "s3", startDate: "2026-12-10", dueDate: "2027-01-05", progress: 0 },
    ],
    milestones: [
      { id: "m1", name: "Specification Baseline", date: "2026-09-25", scheduleId: "s1" },
      { id: "m2", name: "Vendor Delivery", date: "2026-11-15", scheduleId: "s1" },
      { id: "m3", name: "Tata Go-Live", date: "2026-12-15", scheduleId: "s2" },
      { id: "m4", name: "Mahindra Acceptance", date: "2027-01-05", scheduleId: "s3" },
    ],
  },
  {
    id: "p2",
    name: "Charging Platform",
    description: "Charging platform rollout and customer integration program.",
    vendor: "XYZ Mobility",
    status: "at_risk",
    progress: 45,
    startDate: "2026-08-01",
    endDate: "2027-01-31",
    customers: [{ id: "c3", name: "Hyundai" }],
    schedules: [
      { id: "s5", name: "Vendor Schedule", type: "vendor", owner: "XYZ Mobility", startDate: "2026-08-01", endDate: "2026-12-15" },
      { id: "s6", name: "Hyundai Customer Schedule", type: "customer", owner: "Hyundai", customerId: "c3", startDate: "2026-09-01", endDate: "2027-01-31" },
    ],
    tasks: [],
    milestones: [],
  },
  {
    id: "p3",
    name: "Mobile App",
    description: "Customer mobile application modernization.",
    vendor: "ABC Technologies",
    status: "completed",
    progress: 100,
    startDate: "2026-04-01",
    endDate: "2026-08-31",
    customers: [{ id: "c4", name: "Tata Motors" }],
    schedules: [],
    tasks: [],
    milestones: [],
  },
];