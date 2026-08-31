export default function ShowCategorySums({ catSums, total }) {
  if (!catSums || Object.keys(catSums).length === 0) {
    return (
      <div className="card border-0 shadow-sm rounded-4 h-100">
        <div className="card-body">
          <p className="text-muted small mb-0">No category data available.</p>
        </div>
      </div>
    );
  }

  // Sort categories by count, descending
  const entries = Object.entries(catSums).sort((a, b) => b[1] - a[1]);
  const max = Math.max(...entries.map(([, count]) => count));

  return (
    <div className="card border-0 shadow-sm rounded-4 h-100">
      <div className="card-body">
        <p className="text-muted small mb-3">Products by Category</p>
        <div className="d-flex flex-column gap-3">
          {entries.map(([category, count]) => {
            const pct = total ? Math.round((count / total) * 100) : 0;
            const barWidth = Math.round((count / max) * 100);
            return (
              <div key={category}>
                <div className="d-flex justify-content-between mb-1">
                  <span className="small fw-semibold">{category}</span>
                  <span className="small text-muted">
                    {count} {total ? `(${pct}%)` : ""}
                  </span>
                </div>
                <div className="progress" style={{ height: "6px" }}>
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: `${barWidth}%` }}
                    aria-valuenow={barWidth}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
