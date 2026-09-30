export const routes = {
  home: "/",
  inquire: "/qualify",
  wake: "https://wakepe.com",
} as const;

export function inquireHref(intent?: "fund" | "acquire" | "other") {
  if (!intent) return routes.inquire;
  return `${routes.inquire}?intent=${intent}`;
}
