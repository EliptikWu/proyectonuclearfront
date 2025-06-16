export default function NotFoundIllustration() {
  return (
    <svg width={180} height={80} viewBox="0 0 180 80" fill="none" style={{ display: "block", margin: "0 auto" }}>
      {/* Primer 4 */}
      <g>
        <rect x="8" y="16" width="48" height="48" rx="8" fill="#edeafd" stroke="#2c176c" strokeWidth="2" />
        <text x="32" y="50" textAnchor="middle" fontWeight="bold" fontSize="38" fill="#2c176c" fontFamily="monospace">4</text>
      </g>
      {/* 0 */}
      <g>
        <circle cx="92" cy="40" r="24" fill="#fff" stroke="#2c176c" strokeWidth="2" />
        <text x="92" y="54" textAnchor="middle" fontWeight="bold" fontSize="38" fill="#2c176c" fontFamily="monospace">0</text>
      </g>
      {/* Segundo 4 */}
      <g>
        <rect x="124" y="16" width="48" height="48" rx="8" fill="#edeafd" stroke="#2c176c" strokeWidth="2" />
        <text x="148" y="50" textAnchor="middle" fontWeight="bold" fontSize="38" fill="#2c176c" fontFamily="monospace">4</text>
      </g>
      {/* Detalles */}
      <g stroke="#b5a3e8" strokeWidth="2">
        <path d="M25 12 l-10 -7" />
        <path d="M30 70 l-7 8" />
        <path d="M155 12 l10 -7" />
        <path d="M150 70 l7 8" />
        <path d="M92 6 l0 -10" />
        <path d="M92 74 l0 10" />
      </g>
    </svg>
  );
}
