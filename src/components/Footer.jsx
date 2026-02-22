export default function Footer({ copyright = "© 2025 Joshua Dolor" }) {
  return (
    <footer className="py-8 text-center border-t border-white/5 text-gray-500 text-sm">
      <p>{copyright}</p>
    </footer>
  );
}
