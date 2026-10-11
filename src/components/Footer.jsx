export default function Footer({
  copyright = "© 2026 Joshua Dolor",
  businessLine,
}) {
  return (
    <footer className="py-8 px-6 border-t border-white/5 text-mute text-sm">
      <div className="max-w-content mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p>{copyright}</p>
        {businessLine && <p>{businessLine}</p>}
      </div>
    </footer>
  );
}
