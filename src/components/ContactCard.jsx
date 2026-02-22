const EmailIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const iconMap = {
  email: EmailIcon,
  phone: PhoneIcon,
};

export default function ContactCard({
  label,
  value,
  href,
  icon = "email",
  children,
}) {
  const IconComponent = typeof icon === "string" ? iconMap[icon] : null;
  const content = (
    <>
      <div className="w-12 h-12 bg-primary/10 rounded-custom flex items-center justify-center text-primary shrink-0">
        {children ?? (IconComponent ? <IconComponent /> : null)}
      </div>
      <div className="text-left">
        <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">
          {label}
        </div>
        <div className="text-lg font-bold">{value}</div>
      </div>
    </>
  );

  const className =
    "glass-card p-8 flex items-center gap-4 text-gray-300 hover:border-primary/30 transition-colors";

  if (href) {
    return (
      <a href={href} className={`${className} no-underline`}>
        {content}
      </a>
    );
  }
  return <div className={className}>{content}</div>;
}
