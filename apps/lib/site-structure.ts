/**
 * URL structure of the public portal of the Autorité nationale des noms de
 * domaine d'Astoria (ANRD).
 *
 * Hrefs are locale-agnostic pathnames: the next-intl Link (registered as the
 * ADS link renderer) prefixes the active locale automatically. Labels are
 * never stored here — they come from the message catalogs through the key
 * provided by each entry (see `apps/messages/{fr,en}.json`).
 *
 * Architecture of the navigation:
 *
 *   primaryNavigation  → the seven entries of the portal. Each entry opens a
 *                        mega-menu panel structured in four themes of four
 *                        links:
 *                            7 thèmes × 4 sections × 4 liens
 *
 * The information architecture reflects the institutional perimeter of a
 * national domain-name registry authority — the State operator that governs
 * and administers the `.aor` namespace. The ANRD is *not* a registrar and
 * does not sell domains directly: it is the authority that governs the
 * national namespace, while the accredited registrars form the ecosystem
 * through which holders obtain and manage their domains.
 *
 *   L'ANRD                  → incarner  : présentation, organisation, transparence, actualités
 *   Le `.aor`               → comprendre : le domaine national, enregistrement, identité nationale, évolution
 *   Noms de domaine         → agir      : enregistrer, gérer, transférer, fin de vie
 *   Registre                → opérer    : fonctionnement, recherche, infrastructure, données
 *   Bureaux d'enregistrement→ encadrer  : bureaux accrédités, devenir bureau, opérations, conformité
 *   Règles & politiques     → cadrer    : politiques `.aor`, tarification, litiges, cadre
 *   Ressources              → outiller  : documentation, données, publications, assistance
 *
 * `Rechercher` and `Statut` are transversal functions of the platform
 * (global search, government status platform), not categories of the
 * catalogue: they live in the header, outside the primary navigation.
 *
 * The hierarchy of the Republic is made perceptible by the navigation itself:
 *
 *   République d'Astoria
 *           ↓
 *         ANRD
 *           ↓
 *     Domaine national .aor
 *           ↓
 *  ┌──────┼─────────┐
 * Registre  Politiques  Bureaux
 *           ↓
 *  Titulaires / organisations
 *
 * The ANRD governs the namespace; the accredited registrars give holders
 * access to it. The 112 entries (7 × 4 × 4) are destinations prepared for the
 * future sections of the portal — many point to pages being published and
 * resolve as soon as those sections ship.
 *
 * Everything is configuration-driven: the header, the footer and the sitemap
 * derive their markup from this array, so adding a theme/section/link later
 * never requires rewriting a component.
 */
export const PORTAL_HOME = "/";

/** The seven entries of the portal — both `nav.primary` and `footer.columns` keys. */
export type PrimaryNavKey =
  | "lAnrd"
  | "leAor"
  | "nomsDeDomaine"
  | "registre"
  | "bureauxEnregistrement"
  | "reglesPolitiques"
  | "ressources";

/** A destination inside a mega-menu panel; its label is a `nav.panel` message key. */
export type NavigationLink = {
  labelKey: string;
  href: string;
};

/**
 * A section of a navigation theme. In the mega-menu panel it heads one of the
 * four columns (`labelKey` → `nav.panel.<theme>.<section>.title`); in the
 * footer it becomes a destination of the theme column. It carries the four
 * destinations of the section.
 */
export type NavigationItem = NavigationLink & {
  /** Related destinations nested under this section. */
  links: ReadonlyArray<NavigationLink>;
};

/**
 * One top-level entry of the Government Header navigation.
 *
 * Navigation principle (info.gouv.fr-inspired, adapted to Astoria): the header
 * is organised around the missions of the national registry authority and the
 * understanding of the `.aor` namespace — not around an administration's
 * internal structure. Each entry opens a mega-menu panel composed of
 *  - a leader band: the entry name, a one-line description and the main
 *    action of the section (“Tout sur le `.aor`”, …),
 *  - four sections, each headed by its title and followed by its four
 *    destinations.
 *
 * Top-level labels resolve under `nav.primary` (`labelKey`), panel content
 * under `nav.panel` (`titleKey`, `paragraphKey`, nested `labelKey`s).
 */
export type NavigationSection = {
  type: "megaMenu";
  /** Message key (`nav.primary`) of the top-level tab. */
  labelKey: PrimaryNavKey;
  /** Landing page of the section, used by the leader action and active-state detection. */
  href: string;
  /** Leader band shown on top of the panel. */
  leader: {
    titleKey: string;
    paragraphKey: string;
    link: NavigationLink;
  };
  /** The four sections of the theme, each with its four links. */
  primaryItems: ReadonlyArray<NavigationItem>;
};

export type FooterColumn = {
  /** Message key (`footer.columns`) of the column heading. */
  columnKey: string;
  links: ReadonlyArray<NavigationLink>;
};

export const sectionPaths = {
  lAnrd: "/l-anrd",
  leAor: "/le-aor",
  nomsDeDomaine: "/noms-de-domaine",
  registre: "/registre",
  bureauxEnregistrement: "/bureaux-d-enregistrement",
  reglesPolitiques: "/regles-et-politiques",
  ressources: "/ressources",
} as const;

export const legalPaths = {
  accessibility: "/legal/accessibility",
  privacy: "/legal/privacy",
  terms: "/legal/terms",
  cookies: "/legal/cookies",
  sitemap: "/sitemap",
} as const;

export const searchPath = "/search";

/**
 * The government status platform. The `Statut` button of the header links to
 * it; the detailed status page lives there, on the central government
 * platform. The ANRD portal may display a synthetic availability indicator,
 * but never duplicates the status platform.
 */
export const statusUrl = "https://status.gouv.aor";

/** DOM ids used as skip-link targets. */
export const pageAnchors = {
  content: "main-content",
  footer: "main-footer",
} as const;

/**
 * Main navigation of the Government Header of the Autorité nationale des noms
 * de domaine d'Astoria — the permanent information architecture of the portal,
 * organised in seven themes:
 *
 *   L'ANRD                   → incarner  : présentation, organisation, transparence, actualités
 *   Le `.aor`                → comprendre : le domaine national, enregistrement, identité nationale, évolution
 *   Noms de domaine          → agir      : enregistrer, gérer, transférer, fin de vie
 *   Registre                 → opérer    : fonctionnement, recherche, infrastructure, données
 *   Bureaux d'enregistrement → encadrer  : bureaux accrédités, devenir bureau, opérations, conformité
 *   Règles & politiques      → cadrer    : politiques `.aor`, tarification, litiges, cadre
 *   Ressources               → outiller  : documentation, données, publications, assistance
 *
 * Each entry opens a mega-menu panel with a leader band and four sections —
 * each section headed by its title and followed by its four destinations. The
 * panel is not the sitemap of the portal; it exposes the destinations that
 * matter to the visitor journey. The structure is configuration-driven: adding
 * a section only means adding an entry here (and the matching messages).
 *
 * The institutional hierarchy is built into the architecture itself: the ANRD
 * is presented as the national authority that governs the `.aor` namespace
 * (L'ANRD, Le `.aor`, Registre, Règles & politiques), while the accredited
 * registrars are the ecosystem through which holders obtain and manage their
 * domains (Noms de domaine, Bureaux d'enregistrement, Ressources). The ANRD
 * never appears as a registrar.
 *
 * Hrefs follow the URL plan of the portal; several point to pages being
 * published and will resolve as soon as those sections ship.
 */
export const primaryNavigation: ReadonlyArray<NavigationSection> = [
  {
    type: "megaMenu",
    labelKey: "lAnrd",
    href: sectionPaths.lAnrd,
    leader: {
      titleKey: "lAnrd.title",
      paragraphKey: "lAnrd.text",
      link: { labelKey: "lAnrd.allLink", href: sectionPaths.lAnrd },
    },
    primaryItems: [
      {
        labelKey: "lAnrd.presentation.title",
        href: "/l-anrd/presentation",
        links: [
          { labelKey: "lAnrd.presentation.lAnrd", href: "/l-anrd/presentation/l-anrd" },
          { labelKey: "lAnrd.presentation.mission", href: "/l-anrd/presentation/notre-mission" },
          { labelKey: "lAnrd.presentation.role", href: "/l-anrd/presentation/notre-role" },
          { labelKey: "lAnrd.presentation.histoire", href: "/l-anrd/presentation/histoire" },
        ],
      },
      {
        labelKey: "lAnrd.organisation.title",
        href: "/l-anrd/organisation",
        links: [
          { labelKey: "lAnrd.organisation.gouvernance", href: "/l-anrd/organisation/gouvernance" },
          { labelKey: "lAnrd.organisation.direction", href: "/l-anrd/organisation/direction" },
          { labelKey: "lAnrd.organisation.services", href: "/l-anrd/organisation/services" },
          { labelKey: "lAnrd.organisation.contacts", href: "/l-anrd/organisation/contacts" },
        ],
      },
      {
        labelKey: "lAnrd.transparence.title",
        href: "/l-anrd/transparence",
        links: [
          { labelKey: "lAnrd.transparence.rapports", href: "/l-anrd/transparence/rapports" },
          { labelKey: "lAnrd.transparence.decisions", href: "/l-anrd/transparence/decisions" },
          { labelKey: "lAnrd.transparence.donneesPubliques", href: "/l-anrd/transparence/donnees-publiques" },
          { labelKey: "lAnrd.transparence.marchesPublics", href: "/l-anrd/transparence/marches-publics" },
        ],
      },
      {
        labelKey: "lAnrd.actualites.title",
        href: "/l-anrd/actualites",
        links: [
          { labelKey: "lAnrd.actualites.actualites", href: "/l-anrd/actualites/actualites" },
          { labelKey: "lAnrd.actualites.communiques", href: "/l-anrd/actualites/communiques" },
          { labelKey: "lAnrd.actualites.annonces", href: "/l-anrd/actualites/annonces" },
          { labelKey: "lAnrd.actualites.agenda", href: "/l-anrd/actualites/agenda" },
        ],
      },
    ],
  },
  {
    type: "megaMenu",
    labelKey: "leAor",
    href: sectionPaths.leAor,
    leader: {
      titleKey: "leAor.title",
      paragraphKey: "leAor.text",
      link: { labelKey: "leAor.allLink", href: sectionPaths.leAor },
    },
    primaryItems: [
      {
        labelKey: "leAor.presentation.title",
        href: "/le-aor/presentation",
        links: [
          { labelKey: "leAor.presentation.questCeQue", href: "/le-aor/presentation/qu-est-ce-que-le-aor" },
          { labelKey: "leAor.presentation.domaineNational", href: "/le-aor/presentation/le-domaine-national" },
          { labelKey: "leAor.presentation.fonctionnement", href: "/le-aor/presentation/fonctionnement" },
          { labelKey: "leAor.presentation.chiffresCles", href: "/le-aor/presentation/chiffres-cles" },
        ],
      },
      {
        labelKey: "leAor.enregistrement.title",
        href: "/le-aor/enregistrement",
        links: [
          { labelKey: "leAor.enregistrement.quiPeutEnregistrer", href: "/le-aor/enregistrement/qui-peut-enregistrer" },
          { labelKey: "leAor.enregistrement.choisirUnNom", href: "/le-aor/enregistrement/choisir-un-nom" },
          { labelKey: "leAor.enregistrement.conditions", href: "/le-aor/enregistrement/conditions" },
          { labelKey: "leAor.enregistrement.ouEnregistrer", href: "/le-aor/enregistrement/ou-enregistrer" },
        ],
      },
      {
        labelKey: "leAor.identiteNationale.title",
        href: "/le-aor/identite-nationale",
        links: [
          { labelKey: "leAor.identiteNationale.usages", href: "/le-aor/identite-nationale/usages-du-aor" },
          { labelKey: "leAor.identiteNationale.domainesPublics", href: "/le-aor/identite-nationale/domaines-publics" },
          { labelKey: "leAor.identiteNationale.domainesPrives", href: "/le-aor/identite-nationale/domaines-prives" },
          { labelKey: "leAor.identiteNationale.sousDomaines", href: "/le-aor/identite-nationale/sous-domaines" },
        ],
      },
      {
        labelKey: "leAor.evolution.title",
        href: "/le-aor/evolution",
        links: [
          { labelKey: "leAor.evolution.histoire", href: "/le-aor/evolution/histoire-du-aor" },
          { labelKey: "leAor.evolution.evolutionsDuRegistre", href: "/le-aor/evolution/evolutions-du-registre" },
          { labelKey: "leAor.evolution.nouvellesPolitiques", href: "/le-aor/evolution/nouvelles-politiques" },
          { labelKey: "leAor.evolution.projets", href: "/le-aor/evolution/projets" },
        ],
      },
    ],
  },
  {
    type: "megaMenu",
    labelKey: "nomsDeDomaine",
    href: sectionPaths.nomsDeDomaine,
    leader: {
      titleKey: "nomsDeDomaine.title",
      paragraphKey: "nomsDeDomaine.text",
      link: { labelKey: "nomsDeDomaine.allLink", href: sectionPaths.nomsDeDomaine },
    },
    primaryItems: [
      {
        labelKey: "nomsDeDomaine.enregistrer.title",
        href: "/noms-de-domaine/enregistrer",
        links: [
          { labelKey: "nomsDeDomaine.enregistrer.rechercherUnDomaine", href: "/noms-de-domaine/enregistrer/rechercher-un-domaine" },
          { labelKey: "nomsDeDomaine.enregistrer.choisirUnBureau", href: "/noms-de-domaine/enregistrer/choisir-un-bureau" },
          { labelKey: "nomsDeDomaine.enregistrer.enregistrer", href: "/noms-de-domaine/enregistrer/enregistrer" },
          { labelKey: "nomsDeDomaine.enregistrer.tarifs", href: "/noms-de-domaine/enregistrer/tarifs" },
        ],
      },
      {
        labelKey: "nomsDeDomaine.gerer.title",
        href: "/noms-de-domaine/gerer",
        links: [
          { labelKey: "nomsDeDomaine.gerer.renouveler", href: "/noms-de-domaine/gerer/renouveler" },
          { labelKey: "nomsDeDomaine.gerer.modifier", href: "/noms-de-domaine/gerer/modifier" },
          { labelKey: "nomsDeDomaine.gerer.changerDeTitulaire", href: "/noms-de-domaine/gerer/changer-de-titulaire" },
          { labelKey: "nomsDeDomaine.gerer.gererLesContacts", href: "/noms-de-domaine/gerer/gerer-les-contacts" },
        ],
      },
      {
        labelKey: "nomsDeDomaine.transferer.title",
        href: "/noms-de-domaine/transferer",
        links: [
          { labelKey: "nomsDeDomaine.transferer.transfertEntrant", href: "/noms-de-domaine/transferer/transfert-entrant" },
          { labelKey: "nomsDeDomaine.transferer.transfertSortant", href: "/noms-de-domaine/transferer/transfert-sortant" },
          { labelKey: "nomsDeDomaine.transferer.codeDAutorisation", href: "/noms-de-domaine/transferer/code-d-autorisation" },
          { labelKey: "nomsDeDomaine.transferer.procedure", href: "/noms-de-domaine/transferer/procedure" },
        ],
      },
      {
        labelKey: "nomsDeDomaine.finDeVie.title",
        href: "/noms-de-domaine/fin-de-vie",
        links: [
          { labelKey: "nomsDeDomaine.finDeVie.expiration", href: "/noms-de-domaine/fin-de-vie/expiration" },
          { labelKey: "nomsDeDomaine.finDeVie.suppression", href: "/noms-de-domaine/fin-de-vie/suppression" },
          { labelKey: "nomsDeDomaine.finDeVie.restauration", href: "/noms-de-domaine/fin-de-vie/restauration" },
          { labelKey: "nomsDeDomaine.finDeVie.liberation", href: "/noms-de-domaine/fin-de-vie/liberation" },
        ],
      },
    ],
  },
  {
    type: "megaMenu",
    labelKey: "registre",
    href: sectionPaths.registre,
    leader: {
      titleKey: "registre.title",
      paragraphKey: "registre.text",
      link: { labelKey: "registre.allLink", href: sectionPaths.registre },
    },
    primaryItems: [
      {
        labelKey: "registre.fonctionnement.title",
        href: "/registre/fonctionnement",
        links: [
          { labelKey: "registre.fonctionnement.leRegistre", href: "/registre/fonctionnement/le-registre" },
          { labelKey: "registre.fonctionnement.architecture", href: "/registre/fonctionnement/architecture" },
          { labelKey: "registre.fonctionnement.zoneAor", href: "/registre/fonctionnement/zone-aor" },
          { labelKey: "registre.fonctionnement.delegation", href: "/registre/fonctionnement/delegation" },
        ],
      },
      {
        labelKey: "registre.recherche.title",
        href: "/registre/recherche",
        links: [
          { labelKey: "registre.recherche.rechercheDeDomaine", href: "/registre/recherche/recherche-de-domaine" },
          { labelKey: "registre.recherche.rdap", href: "/registre/recherche/rdap" },
          { labelKey: "registre.recherche.statut", href: "/registre/recherche/statut" },
          { labelKey: "registre.recherche.informationsPubliques", href: "/registre/recherche/informations-publiques" },
        ],
      },
      {
        labelKey: "registre.infrastructure.title",
        href: "/registre/infrastructure",
        links: [
          { labelKey: "registre.infrastructure.dns", href: "/registre/infrastructure/dns" },
          { labelKey: "registre.infrastructure.dnssec", href: "/registre/infrastructure/dnssec" },
          { labelKey: "registre.infrastructure.serveurs", href: "/registre/infrastructure/serveurs" },
          { labelKey: "registre.infrastructure.resilience", href: "/registre/infrastructure/resilience" },
        ],
      },
      {
        labelKey: "registre.donnees.title",
        href: "/registre/donnees",
        links: [
          { labelKey: "registre.donnees.statistiques", href: "/registre/donnees/statistiques" },
          { labelKey: "registre.donnees.openData", href: "/registre/donnees/open-data" },
          { labelKey: "registre.donnees.rapports", href: "/registre/donnees/rapports" },
          { labelKey: "registre.donnees.indicateurs", href: "/registre/donnees/indicateurs" },
        ],
      },
    ],
  },
  {
    type: "megaMenu",
    labelKey: "bureauxEnregistrement",
    href: sectionPaths.bureauxEnregistrement,
    leader: {
      titleKey: "bureauxEnregistrement.title",
      paragraphKey: "bureauxEnregistrement.text",
      link: { labelKey: "bureauxEnregistrement.allLink", href: sectionPaths.bureauxEnregistrement },
    },
    primaryItems: [
      {
        labelKey: "bureauxEnregistrement.bureauxAccredites.title",
        href: "/bureaux-d-enregistrement/bureaux-accredites",
        links: [
          { labelKey: "bureauxEnregistrement.bureauxAccredites.annuaire", href: "/bureaux-d-enregistrement/bureaux-accredites/annuaire" },
          { labelKey: "bureauxEnregistrement.bureauxAccredites.rechercherUnBureau", href: "/bureaux-d-enregistrement/bureaux-accredites/rechercher-un-bureau" },
          { labelKey: "bureauxEnregistrement.bureauxAccredites.conditions", href: "/bureaux-d-enregistrement/bureaux-accredites/conditions" },
          { labelKey: "bureauxEnregistrement.bureauxAccredites.obligations", href: "/bureaux-d-enregistrement/bureaux-accredites/obligations" },
        ],
      },
      {
        labelKey: "bureauxEnregistrement.devenirBureau.title",
        href: "/bureaux-d-enregistrement/devenir-bureau",
        links: [
          { labelKey: "bureauxEnregistrement.devenirBureau.conditions", href: "/bureaux-d-enregistrement/devenir-bureau/conditions" },
          { labelKey: "bureauxEnregistrement.devenirBureau.accreditation", href: "/bureaux-d-enregistrement/devenir-bureau/accreditation" },
          { labelKey: "bureauxEnregistrement.devenirBureau.candidature", href: "/bureaux-d-enregistrement/devenir-bureau/candidature" },
          { labelKey: "bureauxEnregistrement.devenirBureau.contrat", href: "/bureaux-d-enregistrement/devenir-bureau/contrat" },
        ],
      },
      {
        labelKey: "bureauxEnregistrement.operations.title",
        href: "/bureaux-d-enregistrement/operations",
        links: [
          { labelKey: "bureauxEnregistrement.operations.epp", href: "/bureaux-d-enregistrement/operations/epp" },
          { labelKey: "bureauxEnregistrement.operations.rdap", href: "/bureaux-d-enregistrement/operations/rdap" },
          { labelKey: "bureauxEnregistrement.operations.api", href: "/bureaux-d-enregistrement/operations/api" },
          { labelKey: "bureauxEnregistrement.operations.sandbox", href: "/bureaux-d-enregistrement/operations/sandbox" },
        ],
      },
      {
        labelKey: "bureauxEnregistrement.conformite.title",
        href: "/bureaux-d-enregistrement/conformite",
        links: [
          { labelKey: "bureauxEnregistrement.conformite.obligations", href: "/bureaux-d-enregistrement/conformite/obligations" },
          { labelKey: "bureauxEnregistrement.conformite.securite", href: "/bureaux-d-enregistrement/conformite/securite" },
          { labelKey: "bureauxEnregistrement.conformite.donnees", href: "/bureaux-d-enregistrement/conformite/donnees" },
          { labelKey: "bureauxEnregistrement.conformite.controles", href: "/bureaux-d-enregistrement/conformite/controles" },
        ],
      },
    ],
  },
  {
    type: "megaMenu",
    labelKey: "reglesPolitiques",
    href: sectionPaths.reglesPolitiques,
    leader: {
      titleKey: "reglesPolitiques.title",
      paragraphKey: "reglesPolitiques.text",
      link: { labelKey: "reglesPolitiques.allLink", href: sectionPaths.reglesPolitiques },
    },
    primaryItems: [
      {
        labelKey: "reglesPolitiques.politiquesAor.title",
        href: "/regles-et-politiques/politiques-aor",
        links: [
          { labelKey: "reglesPolitiques.politiquesAor.politiqueEnregistrement", href: "/regles-et-politiques/politiques-aor/politique-d-enregistrement" },
          { labelKey: "reglesPolitiques.politiquesAor.politiqueTransfert", href: "/regles-et-politiques/politiques-aor/politique-de-transfert" },
          { labelKey: "reglesPolitiques.politiquesAor.politiqueRenouvellement", href: "/regles-et-politiques/politiques-aor/politique-de-renouvellement" },
          { labelKey: "reglesPolitiques.politiquesAor.politiqueSuppression", href: "/regles-et-politiques/politiques-aor/politique-de-suppression" },
        ],
      },
      {
        labelKey: "reglesPolitiques.tarification.title",
        href: "/regles-et-politiques/tarification",
        links: [
          { labelKey: "reglesPolitiques.tarification.tarifsDuRegistre", href: "/regles-et-politiques/tarification/tarifs-du-registre" },
          { labelKey: "reglesPolitiques.tarification.frais", href: "/regles-et-politiques/tarification/frais" },
          { labelKey: "reglesPolitiques.tarification.revisions", href: "/regles-et-politiques/tarification/revisions" },
          { labelKey: "reglesPolitiques.tarification.historique", href: "/regles-et-politiques/tarification/historique" },
        ],
      },
      {
        labelKey: "reglesPolitiques.litiges.title",
        href: "/regles-et-politiques/litiges",
        links: [
          { labelKey: "reglesPolitiques.litiges.resolutionDesLitiges", href: "/regles-et-politiques/litiges/resolution-des-litiges" },
          { labelKey: "reglesPolitiques.litiges.procedures", href: "/regles-et-politiques/litiges/procedures" },
          { labelKey: "reglesPolitiques.litiges.decisions", href: "/regles-et-politiques/litiges/decisions" },
          { labelKey: "reglesPolitiques.litiges.recours", href: "/regles-et-politiques/litiges/recours" },
        ],
      },
      {
        labelKey: "reglesPolitiques.cadre.title",
        href: "/regles-et-politiques/cadre",
        links: [
          { labelKey: "reglesPolitiques.cadre.textesApplicables", href: "/regles-et-politiques/cadre/textes-applicables" },
          { labelKey: "reglesPolitiques.cadre.protectionDesDonnees", href: "/regles-et-politiques/cadre/protection-des-donnees" },
          { labelKey: "reglesPolitiques.cadre.conformite", href: "/regles-et-politiques/cadre/conformite" },
          { labelKey: "reglesPolitiques.cadre.versionsDesPolitiques", href: "/regles-et-politiques/cadre/versions-des-politiques" },
        ],
      },
    ],
  },
  {
    type: "megaMenu",
    labelKey: "ressources",
    href: sectionPaths.ressources,
    leader: {
      titleKey: "ressources.title",
      paragraphKey: "ressources.text",
      link: { labelKey: "ressources.allLink", href: sectionPaths.ressources },
    },
    primaryItems: [
      {
        labelKey: "ressources.documentation.title",
        href: "/ressources/documentation",
        links: [
          { labelKey: "ressources.documentation.guideAor", href: "/ressources/documentation/guide-aor" },
          { labelKey: "ressources.documentation.guideTitulaires", href: "/ressources/documentation/guide-titulaires" },
          { labelKey: "ressources.documentation.guideBureaux", href: "/ressources/documentation/guide-bureaux" },
          { labelKey: "ressources.documentation.documentationTechnique", href: "/ressources/documentation/documentation-technique" },
        ],
      },
      {
        labelKey: "ressources.donnees.title",
        href: "/ressources/donnees",
        links: [
          { labelKey: "ressources.donnees.statistiques", href: "/ressources/donnees/statistiques" },
          { labelKey: "ressources.donnees.openData", href: "/ressources/donnees/open-data" },
          { labelKey: "ressources.donnees.telechargements", href: "/ressources/donnees/telechargements" },
          { labelKey: "ressources.donnees.apiPubliques", href: "/ressources/donnees/api-publiques" },
        ],
      },
      {
        labelKey: "ressources.publications.title",
        href: "/ressources/publications",
        links: [
          { labelKey: "ressources.publications.rapports", href: "/ressources/publications/rapports" },
          { labelKey: "ressources.publications.etudes", href: "/ressources/publications/etudes" },
          { labelKey: "ressources.publications.communiques", href: "/ressources/publications/communiques" },
          { labelKey: "ressources.publications.archives", href: "/ressources/publications/archives" },
        ],
      },
      {
        labelKey: "ressources.assistance.title",
        href: "/ressources/assistance",
        links: [
          { labelKey: "ressources.assistance.questionsFrequentes", href: "/ressources/assistance/questions-frequentes" },
          { labelKey: "ressources.assistance.support", href: "/ressources/assistance/support" },
          { labelKey: "ressources.assistance.signalerUnAbus", href: "/ressources/assistance/signaler-un-abus" },
          { labelKey: "ressources.assistance.contact", href: "/ressources/assistance/contact" },
        ],
      },
    ],
  },
];

/**
 * Secondary navigation zone of the site footer, distinct from the main
 * navigation of the header. It mirrors the seven entries of the header
 * navigation and derives its links from the sections of each theme — so the
 * footer and the header can never drift apart.
 *
 * Column titles resolve under `footer.columns`, links under `nav.panel`.
 */
export const footerNavigation: ReadonlyArray<FooterColumn> = primaryNavigation.map(
  (section) => ({
    columnKey: section.labelKey,
    links: section.primaryItems,
  })
);