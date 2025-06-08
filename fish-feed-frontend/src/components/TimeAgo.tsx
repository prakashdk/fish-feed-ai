export const TimeAgo = ({ date, now }: { date: Date; now: Date }) => {
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 5) {
    return (
      <span className="flex items-center gap-1 text-red-500">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        Live
      </span>
    );
  }

  if (seconds < 60) return <span>{seconds} seconds ago</span>;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60)
    return (
      <span>
        {minutes} minute{minutes !== 1 ? "s" : ""} ago
      </span>
    );

  const hours = Math.floor(minutes / 60);
  if (hours < 24)
    return (
      <span>
        {hours} hour{hours !== 1 ? "s" : ""} ago
      </span>
    );

  const days = Math.floor(hours / 24);
  return (
    <span>
      {days} day{days !== 1 ? "s" : ""} ago
    </span>
  );
};
