import { useMemo, useRef, useState } from "react";
import type { Project, Task } from "../types";
import { users } from "../data/mockData";

type ZoomLevel = "day" | "week" | "month";

const DAY_MS = 1000 * 60 * 60 * 24;

function parseDate(date: string) {
  const d = new Date(`${date}T00:00:00`);
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function startOfWeek(date: Date) {
  const result = new Date(date);
  const day = result.getDay();

  // Monday = start of week
  const difference = day === 0 ? -6 : 1 - day;

  result.setDate(result.getDate() + difference);
  result.setHours(0, 0, 0, 0);

  return result;
}

function startOfMonth(date: Date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  );
}

function endOfMonth(date: Date) {
  return new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  );
}

function daysBetween(start: Date, end: Date) {
  return Math.round(
    (end.getTime() - start.getTime()) / DAY_MS
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function formatMonth(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function formatDay(date: Date) {
  return date.toLocaleDateString("en-US", {
    day: "numeric",
  });
}

function formatWeek(date: Date) {
  return `W${getWeekNumber(date)}`;
}

function getWeekNumber(date: Date) {
  const temp = new Date(date);
  temp.setHours(0, 0, 0, 0);

  temp.setDate(
    temp.getDate() + 3 - ((temp.getDay() + 6) % 7)
  );

  const week1 = new Date(
    temp.getFullYear(),
    0,
    4
  );

  return (
    1 +
    Math.round(
      ((temp.getTime() - week1.getTime()) / DAY_MS -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  );
}

export default function Timeline({
  project,
  onTaskClick,
}: {
  project: Project;
  onTaskClick: (task: Task) => void;
}) {
  const timelineRef = useRef<HTMLDivElement>(null);

  const [zoom, setZoom] = useState<ZoomLevel>("week");

  /*
   * ---------------------------------------------------------
   * Determine the complete project date range
   * ---------------------------------------------------------
   */

  const { timelineStart, timelineEnd } = useMemo(() => {
    const dates: Date[] = [];

    project.tasks.forEach((task) => {
      dates.push(parseDate(task.startDate));
      dates.push(parseDate(task.dueDate));
    });

    project.milestones.forEach((milestone) => {
      dates.push(parseDate(milestone.date));
    });

    if (dates.length === 0) {
      const today = new Date();

      return {
        timelineStart: startOfMonth(today),
        timelineEnd: endOfMonth(today),
      };
    }

    let start = new Date(
      Math.min(...dates.map((d) => d.getTime()))
    );

    let end = new Date(
      Math.max(...dates.map((d) => d.getTime()))
    );

    /*
     * Add some padding around the project.
     */
    start = addDays(start, -7);
    end = addDays(end, 7);

    return {
      timelineStart: startOfWeek(start),
      timelineEnd: end,
    };
  }, [project]);

  /*
   * ---------------------------------------------------------
   * Generate calendar cells
   * ---------------------------------------------------------
   */

  const calendarCells = useMemo(() => {
    const cells: Date[] = [];

    if (zoom === "day") {
      let current = new Date(timelineStart);

      while (current <= timelineEnd) {
        cells.push(new Date(current));
        current = addDays(current, 1);
      }
    }

    if (zoom === "week") {
      let current = startOfWeek(timelineStart);

      while (current <= timelineEnd) {
        cells.push(new Date(current));
        current = addDays(current, 7);
      }
    }

    if (zoom === "month") {
      let current = startOfMonth(timelineStart);

      while (current <= timelineEnd) {
        cells.push(new Date(current));
        current = new Date(
          current.getFullYear(),
          current.getMonth() + 1,
          1
        );
      }
    }

    return cells;
  }, [timelineStart, timelineEnd, zoom]);

  /*
   * ---------------------------------------------------------
   * Width of each calendar cell
   * ---------------------------------------------------------
   */

  const cellWidth =
    zoom === "day"
      ? 70
      : zoom === "week"
        ? 110
        : 150;

  const calendarWidth =
    calendarCells.length * cellWidth;

  /*
   * ---------------------------------------------------------
   * Convert date to percentage position
   * ---------------------------------------------------------
   */

  const getPosition = (dateString: string) => {
    const date = parseDate(dateString);

    const totalDays = daysBetween(
      timelineStart,
      timelineEnd
    );

    const position = daysBetween(
      timelineStart,
      date
    );

    return clamp(
      (position / Math.max(totalDays, 1)) * 100,
      0,
      100
    );
  };

  /*
   * ---------------------------------------------------------
   * Convert task duration to percentage width
   * ---------------------------------------------------------
   */

  const getTaskWidth = (
    startDate: string,
    endDate: string
  ) => {
    const start = parseDate(startDate);
    const end = parseDate(endDate);

    const totalDays = daysBetween(
      timelineStart,
      timelineEnd
    );

    const duration = Math.max(
      daysBetween(start, end),
      1
    );

    return clamp(
      (duration / Math.max(totalDays, 1)) * 100,
      1.5,
      100
    );
  };

  /*
   * ---------------------------------------------------------
   * Today
   * ---------------------------------------------------------
   */

  const goToToday = () => {
    const container = timelineRef.current;

    if (!container) return;

    const today = new Date();

    if (
      today < timelineStart ||
      today > timelineEnd
    ) {
      return;
    }

    const totalDays = daysBetween(
      timelineStart,
      timelineEnd
    );

    const todayOffset = daysBetween(
      timelineStart,
      today
    );

    const percentage =
      todayOffset / Math.max(totalDays, 1);

    const position =
      percentage * calendarWidth;

    container.scrollTo({
      left:
        position -
        container.clientWidth / 2,
      behavior: "smooth",
    });
  };

  /*
   * ---------------------------------------------------------
   * Zoom
   * ---------------------------------------------------------
   */

  const zoomOut = () => {
    setZoom((current) => {
      if (current === "day") return "week";
      if (current === "week") return "month";

      return "month";
    });
  };

  const zoomIn = () => {
    setZoom((current) => {
      if (current === "month") return "week";
      if (current === "week") return "day";

      return "day";
    });
  };

  /*
   * ---------------------------------------------------------
   * Calendar header grouping
   * ---------------------------------------------------------
   */

  const monthGroups = useMemo(() => {
    const groups: {
      label: string;
      count: number;
    }[] = [];

    calendarCells.forEach((date) => {
      const label = formatMonth(date);

      const last = groups[groups.length - 1];

      if (last?.label === label) {
        last.count += 1;
      } else {
        groups.push({
          label,
          count: 1,
        });
      }
    });

    return groups;
  }, [calendarCells]);

  return (
    <div className="timeline-card">

      {/* =====================================================
          TOOLBAR
      ===================================================== */}

      <div className="timeline-toolbar">

        <div>
          <button className="secondary">
            Gantt ▾
          </button>

          <button className="secondary">
            Filter ▾
          </button>
        </div>

        <div>
          <button
            className="secondary"
            onClick={goToToday}
          >
            Today
          </button>

          <button
            className="secondary"
            onClick={zoomOut}
            disabled={zoom === "month"}
          >
            Zoom −
          </button>

          <button
            className="secondary"
            onClick={zoomIn}
            disabled={zoom === "day"}
          >
            Zoom +
          </button>
        </div>

      </div>

      {/* =====================================================
          TIMELINE
      ===================================================== */}

      <div
        className="timeline-scroll"
        ref={timelineRef}
      >

        <div
          className="timeline-content"
          style={{
            width: `calc(280px + ${calendarWidth}px)`,
          }}
        >

          {/* =================================================
              CALENDAR HEADER
          ================================================= */}

          <div className="timeline-head">

            <div className="timeline-label">
              Schedule / Task
            </div>

            <div
              className="timeline-calendar"
              style={{
                width: `${calendarWidth}px`,
              }}
            >

              {/* Month row */}
              <div className="timeline-months">

                {monthGroups.map(
                  (group, index) => (
                    <div
                      key={`${group.label}-${index}`}
                      style={{
                        width:
                          group.count *
                          cellWidth,
                      }}
                    >
                      {group.label}
                    </div>
                  )
                )}

              </div>

              {/* Day / week / month row */}
              <div className="timeline-cells">

                {calendarCells.map(
                  (date) => (
                    <div
                      key={formatDate(date)}
                      className="timeline-cell"
                      style={{
                        width: `${cellWidth}px`,
                      }}
                    >
                      {zoom === "day" &&
                        formatDay(date)}

                      {zoom === "week" &&
                        formatWeek(date)}

                      {zoom === "month" &&
                        date.toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                          }
                        )}
                    </div>
                  )
                )}

              </div>

            </div>
          </div>

          {/* =================================================
              BODY
          ================================================= */}

          <div className="timeline-body">

            {project.schedules.map(
              (schedule) => {

                const tasks =
                  project.tasks.filter(
                    (task) =>
                      task.scheduleId ===
                      schedule.id
                  );

                const milestones =
                  project.milestones.filter(
                    (milestone) =>
                      milestone.scheduleId ===
                      schedule.id
                  );

                return (
                  <div
                    className="schedule-group"
                    key={schedule.id}
                  >

                    {/* Schedule */}
                    <div className="schedule-title">

                      <span
                        className={`schedule-dot dot-${schedule.type}`}
                      />

                      <span>
                        {schedule.name}
                      </span>

                      <small>
                        {schedule.owner}
                      </small>

                    </div>

                    {/* Tasks */}
                    {tasks.map((task) => {

                      const person =
                        users.find(
                          (user) =>
                            user.id ===
                            task.assigneeId
                        );

                      return (
                        <div
                          className="timeline-row"
                          key={task.id}
                        >

                          <div
                            className="task-name"
                            onClick={() =>
                              onTaskClick(task)
                            }
                          >

                            <span className="task-chevron">
                              ›
                            </span>

                            <span>
                              {task.title}
                            </span>

                            {person && (
                              <span className="task-person">
                                {person.initials}
                              </span>
                            )}

                          </div>

                          <div
                            className="track"
                            style={{
                              width: `${calendarWidth}px`,
                            }}
                          >

                            {/* Grid */}
                            <div
                              className="track-grid"
                              style={{
                                width: `${calendarWidth}px`,
                                backgroundSize: `${cellWidth}px 100%`,
                              }}
                            />

                            {/* Task bar */}
                            <div
                              className={`task-bar bar-${task.status}`}
                              style={{
                                left: `${
                                  getPosition(
                                    task.startDate
                                  ) *
                                  calendarWidth /
                                  100
                                }px`,
                                width: `${
                                  getTaskWidth(
                                    task.startDate,
                                    task.dueDate
                                  ) *
                                  calendarWidth /
                                  100
                                }px`,
                              }}
                              onClick={() =>
                                onTaskClick(task)
                              }
                            >
                              <span>
                                {task.progress}%
                              </span>
                            </div>

                          </div>

                        </div>
                      );
                    })}

                    {/* Milestones */}
                    {milestones.map(
                      (milestone) => (
                        <div
                          className="timeline-row milestone-row"
                          key={milestone.id}
                        >

                          <div className="task-name">

                            <span className="diamond">
                              ◆
                            </span>

                            {milestone.name}

                          </div>

                          <div
                            className="track"
                            style={{
                              width: `${calendarWidth}px`,
                            }}
                          >

                            <div
                              className="track-grid"
                              style={{
                                width: `${calendarWidth}px`,
                                backgroundSize: `${cellWidth}px 100%`,
                              }}
                            />

                            <div
                              className="milestone"
                              style={{
                                left: `${
                                  getPosition(
                                    milestone.date
                                  ) *
                                  calendarWidth /
                                  100
                                }px`,
                              }}
                              title={
                                milestone.date
                              }
                            >
                              ◆
                            </div>

                          </div>

                        </div>
                      )
                    )}

                  </div>
                );
              }
            )}

          </div>
        </div>
      </div>
    </div>
  );
}