import type { FrIconClassName } from "@codegouvaor/react-ads/fr";
import { sectionPaths, statusUrl } from "./site-structure";

/**
 * Content configuration of the ANRD homepage (`/`).
 *
 * Structure only: every display string is resolved from the message catalogs
 * (`home.*`) by the page. The operational figures (number of registered
 * domains, accredited registrars, registry availability, DNSSEC) are
 * deliberately NOT set here: they will be connected to the registry APIs and
 * the government status platform. Until then the homepage renders them as
 * placeholders and never invents values presented as real.
 *
 * Hrefs reuse the URL plan of the portal (`site-structure.ts`): the homepage
 * links to the destinations of the header navigation, so the page, the header
 * and the sitemap can never drift apart.
 */

/** A data-driven entry of the homepage; its label is a `home.*` message key. */
export type HomeItem = {
  key: string;
  href: string;
  iconId?: FrIconClassName;
};

/** The four pillars of “Le .aor”. */
export const aorPoints: ReadonlyArray<HomeItem> = [
  { key: "what", href: "/le-aor/presentation/qu-est-ce-que-le-aor", iconId: "fr-icon-question-line" },
  { key: "role", href: "/le-aor/presentation/le-domaine-national", iconId: "fr-icon-flag-line" },
  { key: "operation", href: "/le-aor/presentation/fonctionnement", iconId: "fr-icon-settings-5-line" },
  { key: "importance", href: "/le-aor/identite-nationale/usages-du-aor", iconId: "fr-icon-map-pin-2-line" },
];

/**
 * The four operational indicators of the `.aor` namespace. Values are
 * placeholders until the registry APIs are connected — the seam where the real
 * data will plug in.
 */
export const aorStats: ReadonlyArray<{ key: string }> = [
  { key: "domains" },
  { key: "registrars" },
  { key: "availability" },
  { key: "dnssec" },
];

/** The institutional chain from holder to DNS (section “Le registre national”). */
export const registryRoles: ReadonlyArray<{ key: string }> = [
  { key: "holder" },
  { key: "registrar" },
  { key: "anrd" },
  { key: "registry" },
  { key: "dns" },
];

/** The four steps of “Enregistrer un .aor”. */
export const registrySteps: ReadonlyArray<{ key: string }> = [
  { key: "choose" },
  { key: "check" },
  { key: "register" },
  { key: "manage" },
];

/** The accredited registrar ecosystem (section “Bureaux d'enregistrement”). */
export const registrarLinks: ReadonlyArray<HomeItem> = [
  { key: "find", href: "/bureaux-d-enregistrement/bureaux-accredites/annuaire", iconId: "fr-icon-search-line" },
  { key: "become", href: "/bureaux-d-enregistrement/devenir-bureau", iconId: "fr-icon-user-add-line" },
  { key: "accreditation", href: "/bureaux-d-enregistrement/devenir-bureau/accreditation", iconId: "fr-icon-award-line" },
  { key: "obligations", href: "/bureaux-d-enregistrement/bureaux-accredites/obligations", iconId: "fr-icon-file-text-line" },
];

/** The six policies of the governed namespace (section “Gouvernance & règles”). */
export const policyLinks: ReadonlyArray<HomeItem> = [
  { key: "registration", href: "/regles-et-politiques/politiques-aor/politique-d-enregistrement", iconId: "fr-icon-edit-line" },
  { key: "transfer", href: "/regles-et-politiques/politiques-aor/politique-de-transfert", iconId: "fr-icon-refresh-line" },
  { key: "renewal", href: "/regles-et-politiques/politiques-aor/politique-de-renouvellement", iconId: "fr-icon-calendar-line" },
  { key: "deletion", href: "/regles-et-politiques/politiques-aor/politique-de-suppression", iconId: "fr-icon-error-warning-line" },
  { key: "disputes", href: "/regles-et-politiques/litiges/resolution-des-litiges", iconId: "fr-icon-chat-check-line" },
  { key: "data", href: "/regles-et-politiques/cadre/protection-des-donnees", iconId: "fr-icon-lock-line" },
];

/** The four pillars of the national infrastructure (section “Infrastructure & sécurité”). */
export const infrastructurePillars: ReadonlyArray<HomeItem> = [
  { key: "dns", href: "/registre/infrastructure/dns", iconId: "fr-icon-server-line" },
  { key: "dnssec", href: "/registre/infrastructure/dnssec", iconId: "fr-icon-lock-line" },
  { key: "rdap", href: "/registre/infrastructure/rdap", iconId: "fr-icon-database-line" },
  { key: "resilience", href: "/registre/infrastructure/resilience", iconId: "fr-icon-shield-line" },
];

/** What the ANRD publishes (section “Transparence & données”). */
export const transparencyLinks: ReadonlyArray<HomeItem> = [
  { key: "statistics", href: "/registre/donnees/statistiques", iconId: "fr-icon-bar-chart-box-line" },
  { key: "reports", href: "/registre/donnees/rapports", iconId: "fr-icon-file-text-line" },
  { key: "decisions", href: "/l-anrd/transparence/decisions", iconId: "fr-icon-book-2-line" },
  { key: "openData", href: "/registre/donnees/open-data", iconId: "fr-icon-download-line" },
];

/** The five missions of the closing institutional section. */
export const institutionMissions: ReadonlyArray<{ key: string }> = [
  { key: "administer" },
  { key: "operate" },
  { key: "stability" },
  { key: "policies" },
  { key: "develop" },
];

/** Destinations used by the CTAs of the homepage. */
export const homePaths = {
  aorExplore: sectionPaths.leAor,
  registryLookup: "/registre/recherche/informations-publiques",
  registerCta: "/noms-de-domaine/enregistrer",
  registrarsCta: sectionPaths.bureauxEnregistrement,
  governanceCta: "/regles-et-politiques/politiques-aor",
  transparencyCta: "/registre/donnees",
  institutionDiscover: sectionPaths.lAnrd,
  institutionPolicies: sectionPaths.reglesPolitiques,
  institutionContact: "/contact",
  statusDetail: statusUrl,
} as const;

/**
 * Build-time invariant: the homepage must never present the same destination
 * twice, and must never render a redundant element. Two rules are enforced:
 *
 * 1. Every CTA and every link tile of the page must have a unique href — a
 *    repeated destination fails the build instead of shipping a page with
 *    redundant entries. The hero CTA to the domain lookup is a same-page
 *    anchor and is intentionally excluded.
 * 2. Every link tile must carry a distinct `iconId` — a tile without one would
 *    render an arrow as its pictogram on top of the DSFR enlarge-link arrow
 *    (a duplicated arrow in the same card).
 */
const tileCollections = [aorPoints, registrarLinks, policyLinks, infrastructurePillars, transparencyLinks];

const homepageDestinations: readonly string[] = [
  ...Object.values(homePaths),
  ...tileCollections.flatMap((collection) => collection.map((item) => item.href)),
];

const seenHrefs = new Set<string>();
const duplicateHrefs = homepageDestinations.filter((href) => {
  if (seenHrefs.has(href)) return true;
  seenHrefs.add(href);
  return false;
});

if (duplicateHrefs.length > 0) {
  throw new Error(
    `[home-content] Duplicate destination on the homepage: ${[...new Set(duplicateHrefs)].join(", ")}`
  );
}

for (const collection of tileCollections) {
  for (const item of collection) {
    if (!item.iconId) {
      throw new Error(
        `[home-content] Link tile "${item.key}" has no iconId: the DSFR tile would render two arrows (pictogram + enlarge link).`
      );
    }
  }
}