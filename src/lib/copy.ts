export const copy = {
  siteName: "Bliztic",
  positioning:
    "An ownership group dedicated to building, owning, and operating companies through GTM engineering.",

  nav: {
    fund: "GTM Fund",
    acquire: "Acquire",
    inquire: "Inquire",
    home: "Home",
  },

  home: {
    title: "Bliztic",
    description:
      "An ownership group dedicated to building, owning, and operating companies through GTM engineering.",
    whatTitle: "What we are",
    whatBody:
      "Bliztic is an ownership group. We build companies, buy companies, and run them.",
    whatMore:
      "The through line is GTM engineering: distribution as the operating system.",
    workTitle: "How we work",
    workBody:
      "We do not consult from the sidelines. We own outcomes through capital, systems, and operators who live inside the work.",
    capitalTitle: "Where capital goes",
    capitalBody:
      "Some companies need fuel for go to market. The GTM Fund exists for that.",
    capitalMore:
      "Others are ready for a different kind of partnership. Acquire is how those conversations start.",
    absentTitle: "What you will not find here",
    absentBody:
      "No portfolio wall. No public list of holdings. The work is quieter than that. When something is meant to stand alone, it has its own home.",
    closeBody:
      "If you are building something that needs an owner operator, or you are exploring a sale, inquire. We read every note.",
    cta: "Inquire",
    explore: "Explore",
  },

  fund: {
    title: "GTM Fund",
    description: "Bliztic funds GTM builds for companies that qualify.",
    lede: "Bliztic funds GTM builds for companies that qualify. The work is paid for. The company stays theirs.",
    whatTitle: "What the fund is",
    whatBody:
      "The GTM Fund exists to pay for the systems that take a product to market. Bliztic covers the build, then remains available as those systems go live. It is not a loan and it is not an agency retainer in disguise.",
    whoTitle: "Who it is for",
    whoBody:
      "It is for companies with a product, a buyer, and a reason to sell with more discipline than they have today. Founders who already know what they sell. Operators who need an engine, not another slide deck.",
    coverTitle: "What gets covered",
    coverBody:
      "The fund covers GTM work. Offer and message. Outbound systems. Pipeline design. The people who run the motion. It does not cover general overhead or unrelated product work.",
    qualifyTitle: "What qualify means",
    qualifyBody:
      "Qualify means a real product, a defined buyer, and a team ready to operate what gets built. We read each inquiry against those terms. When there is a fit we reply. When there is not, we stay quiet.",
    cta: "Check eligibility",
  },

  acquire: {
    title: "Acquire",
    description: "Bliztic buys and operates companies.",
    lede: "Bliztic buys companies and operates them. We do not publish tombstones or a list of holdings.",
    lookTitle: "What we look for",
    lookBody:
      "We look for a working product, paying customers, and a go to market motion that can be rebuilt and run. Size matters less than clarity. We prefer businesses we can operate, not stories we can tell.",
    startTitle: "How a conversation starts",
    startBody:
      "Send a short inquiry. If the company is a fit we will ask for more. There is no public process and no deal book.",
    operateTitle: "How we operate",
    operateBody:
      "After we buy a company we operate it through GTM engineering. Strategy, systems, staff, and execution sit in one motion. The company sells with discipline because the engine is owned, not rented.",
    cta: "Inquire about acquisition",
  },

  inquire: {
    title: "Inquire",
    description: "Send a short inquiry to Bliztic.",
    lede: "A short note is enough.",
    intent: "Intent",
    intentFund: "Fund",
    intentAcquire: "Acquire",
    intentOther: "Other",
    company: "Company",
    name: "Name",
    email: "Email",
    phone: "Phone",
    note: "What you are building or selling",
    size: "Size or stage",
    sizeHint: "Optional",
    submit: "Send",
    sending: "Sending",
    success: "We will be in touch.",
    error: "Something went wrong. Try again.",
    missing: "Please complete the required fields.",
  },

  notFound: {
    title: "Not here",
    body: "This page is not here.",
    home: "Home",
  },

  a11y: {
    nav: "Site",
    skip: "Skip to content",
  },
} as const;

export const intents = ["fund", "acquire", "other"] as const;

export type Intent = (typeof intents)[number];
