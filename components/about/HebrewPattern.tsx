// Subtle decorative backdrop — four Hebrew words for kindness/help/support/giving,
// echoing the calligraphic accents used on the Kehál donativos screen.
const WORDS = ["חסד", "עזרה", "תמיכה", "נדבה"];

export default function HebrewPattern() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern
          id="hebrew-pattern"
          width="220"
          height="140"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-8)"
        >
          <text x="10" y="30" fontSize="22" fill="#1b2e5e" fontWeight="700">
            {WORDS[0]}
          </text>
          <text x="120" y="70" fontSize="22" fill="#1b2e5e" fontWeight="700">
            {WORDS[1]}
          </text>
          <text x="20" y="115" fontSize="22" fill="#1b2e5e" fontWeight="700">
            {WORDS[2]}
          </text>
          <text x="150" y="130" fontSize="22" fill="#1b2e5e" fontWeight="700">
            {WORDS[3]}
          </text>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hebrew-pattern)" opacity="0.03" />
    </svg>
  );
}
