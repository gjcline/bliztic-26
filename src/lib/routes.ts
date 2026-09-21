export const routes = {
  home: "/",
  fund: "/gtm-fund",
  acquire: "/acquire",
  inquire: "/qualify",
  privacy: "/privacy",
  terms: "/terms",
  wake: "https://wakepe.com",
} as const;

export function inquireHref(intent?: "fund" | "acquire" | "other") {
  if (!intent) return routes.inquire;
  return `${routes.inquire}?intent=${intent}`;
}
