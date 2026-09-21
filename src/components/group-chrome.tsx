import type { ReactNode } from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";

const pageLinks = [
  { href: "/#about", label: "About" },
  { href: "/#approach", label: "Approach" },
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/#contact", label: "Contact" },
] as const;

const companyLinks = [
  { href: routes.fund, label: "GTM Fund", key: "fund" as const },
  { href: routes.acquire, label: "Acquire", key: "acquire" as const },
  { href: routes.inquire, label: "Inquire", key: "inquire" as const },
];

export function GroupChrome({
  active,
  children,
}: {
  active?: "inquire";
  children: ReactNode;
}) {
  return (
    <div className="bz-scroll" tabIndex={-1}>
      <div className="bz" id="top">
        <svg className="grain" aria-hidden="true" focusable="false">
          <filter id="paper-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="8" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#paper-grain)" />
        </svg>

        <a className="skip" href="#content">
          Skip to content
        </a>

        <header className="nav">
          <div className="wrap nav-in">
            <Link className="wordmark" href={routes.home} aria-label="Bliztic Group, home">
              BLIZTIC GROUP
            </Link>
            <nav className="navlinks" aria-label="Primary">
              {pageLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
              <Link
                href={routes.inquire}
                className={active === "inquire" ? "is-current" : undefined}
                aria-current={active === "inquire" ? "page" : undefined}
              >
                Inquire
              </Link>
            </nav>
            <button
              className="menu-btn"
              type="button"
              aria-controls="mobile-menu"
              aria-expanded="false"
              data-menu-toggle
            >
              Menu
            </button>
          </div>
          <nav id="mobile-menu" className="mmenu" aria-label="Mobile">
            {pageLinks.map((link) => (
              <Link key={link.href} href={link.href} data-menu-close>
                {link.label}
              </Link>
            ))}
            <Link href={routes.fund} data-menu-close>
              Fund
            </Link>
            <Link href={routes.acquire} data-menu-close>
              Acquire
            </Link>
            <Link
              href={routes.inquire}
              data-menu-close
              className={active === "inquire" ? "is-current" : undefined}
              aria-current={active === "inquire" ? "page" : undefined}
            >
              Inquire
            </Link>
          </nav>
        </header>

        <main id="content">{children}</main>

        <footer className="foot">
          <div className="wrap">
            <div className="grid ft-top">
              <Link className="ft-mark" href={routes.home}>
                BLIZTIC GROUP
              </Link>
              <p className="ft-line">Building, operating, and owning companies for the long term.</p>
            </div>
            <div className="grid ft-cols">
              <nav className="ft-col" aria-label="Footer">
                <h3>Navigation</h3>
                {pageLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </nav>
              <nav className="ft-col" aria-label="Company">
                <h3>Company</h3>
                {companyLinks.map((link) => (
                  <Link
                    key={link.key}
                    href={link.href}
                    className={active === link.key ? "is-current" : undefined}
                    aria-current={active === link.key ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="ft-col">
                <h3>Current venture</h3>
                <Link href="/#wake">Wake</Link>
                <a href={routes.wake} target="_blank" rel="noopener noreferrer">
                  Explore Wake
                </a>
              </div>
              <div className="ft-col">
                <h3>Legal</h3>
                <Link href={routes.privacy}>Privacy</Link>
                <Link href={routes.terms}>Terms</Link>
              </div>
            </div>
            <div className="ft-base">
              <span>© 2026 Bliztic Group</span>
              <a href="#top">
                Back to top <span aria-hidden="true">↑</span>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
