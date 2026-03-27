export default function Footer({ copyright = "© 2025 Joshua Dolor", businessLine }) {
  return (
    <footer className="py-8 text-center border-t border-white/5 text-gray-500 text-sm">
      <p>{copyright}</p>
      {businessLine && (
        <p className="mt-2 text-gray-600">{businessLine}</p>
      )}
    </footer>
  );
}
