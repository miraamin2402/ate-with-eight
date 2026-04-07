const svgSize = "h-6 w-6 shrink-0";

function InstagramIcon() {
  return (
    <svg
      className={svgSize}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.881 0 1.44 1.44 0 012.881 0z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      className={svgSize}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function SubstackIcon() {
  return (
    <svg
      className={svgSize}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.078V24L12 18.11 22.54 24V10.08H1.46zM22.54 0H1.46v2.836h21.08V0z" />
    </svg>
  );
}

const linkClass =
  "inline-flex text-[#1B2A6B] transition-colors duration-200 hover:text-[#C1440E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A6B]";

export function Footer() {
  return (
    <footer className="bg-[#F4E9D8] px-5 pt-10 pb-[30px] sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
        <div className="flex items-center justify-center gap-[20px]">
          <a
            href="https://www.instagram.com/coffeebymira/"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://x.com/mira_amin1"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
            aria-label="X (Twitter)"
          >
            <XIcon />
          </a>
          <a
            href="https://miraamin1.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
            aria-label="Substack"
          >
            <SubstackIcon />
          </a>
        </div>
        <p className="font-body mt-3 text-center text-[12px] italic lowercase leading-tight text-[#2C2C2A]">
          8w8 nyc
        </p>
      </div>
    </footer>
  );
}
