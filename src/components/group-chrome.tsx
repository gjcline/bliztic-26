import type { ReactNode } from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";

const pageLinks = [
  { href: "/#about", label: "About" },
  { href: "/#approach", label: "Approach" },
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/#contact", label: "Contact" },
] as const;

export type GroupActive = "fund" | "acquire" | "inquire";

function LogoMark() {
  return (
    <img
      className="logo-mark"
      src="/LIZTIC_logo_white.webp"
      alt=""
      width={400}
      height={400}
    />
  );
}

export function GroupChrome({
  active,
  children,
}: {
  active?: GroupActive;
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
              <LogoMark />
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
              <a href={routes.wake} target="_blank" rel="noopener noreferrer">
                Explore Wake
              </a>
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
            <Link
              href={routes.inquire}
              data-menu-close
              className={active === "inquire" ? "is-current" : undefined}
              aria-current={active === "inquire" ? "page" : undefined}
            >
              Inquire
            </Link>
            <a href={routes.wake} target="_blank" rel="noopener noreferrer" data-menu-close>
              Explore Wake
            </a>
          </nav>
        </header>

        <main id="content">{children}</main>

        <footer className="page-end">
          <span>© 2026 Bliztic Group</span>
          <a href="https://www.bliztic.com/#top">
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </footer>
      </div>
    </div>
  );
}
