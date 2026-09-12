import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localizedAlternates, resolveLocaleParam } from "@/lib/localized-metadata";
import { Link } from "@/i18n/navigation";
import { CtaButtonsGroup, LinkTile } from "@/components/public/content/ads-fragments";
import { FlowDiagram } from "@/components/public/content/theme-page";
import { DomainLookup } from "@/components/public/domain-lookup/domain-lookup";
import {
  aorPoints,
  aorStats,
  homePaths,
  infrastructurePillars,
  institutionMissions,
  policyLinks,
  registrarLinks,
  registryRoles,
  registrySteps,
  transparencyLinks,
} from "@/lib/home-content";

const HOME_PATH = "/";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocaleParam(rawLocale);

  const tHome = await getTranslations({ locale, namespace: "home" });
  const tMeta = await getTranslations({ locale, namespace: "meta" });

  return {
    title: { absolute: tHome("metaTitle") },
    description: tMeta("description"),
    ...localizedAlternates(locale, HOME_PATH),
  };
}

/* Layout helpers below use the ADS design tokens through `var(--ads-*)` (the
 * single source of tokens — main.css) so light/dark switching and theming stay
 * owned by the Design System. Only the institution-specific arrangement of
 * these blocks is expressed here, inline, without any local stylesheet. The
 * conventions are those of the portal reference page (`test/page.tsx`). */

const heroContainerStyle: CSSProperties = {
  maxWidth: "52rem",
  marginInline: "auto",
  textAlign: "center",
};

const heroBadgeStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.5rem",
  margin: "0 0 1.5rem",
  padding: "0.375rem 0.875rem",
  fontSize: "0.8125rem",
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--ads-color-primary)",
  background: "var(--ads-color-background)",
  border: "1px solid var(--ads-color-border)",
  borderRadius: "999px",
};

const cardListStyle: CSSProperties = {
  listStyle: "none",
  margin: "0",
  padding: "0",
};

/** Whole-card link block (alerts, indicators, figures…). */
const teaserCardStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  height: "100%",
  padding: "1.25rem",
  background: "var(--ads-color-background)",
  border: "1px solid var(--ads-color-border)",
  borderTop: "3px solid var(--ads-color-primary)",
  textDecoration: "none",
  color: "var(--ads-color-text)",
};

const figureValueStyle: CSSProperties = {
  display: "block",
  fontSize: "clamp(1.5rem, 3vw, 2rem)",
  lineHeight: 1.2,
  fontWeight: 700,
};

const figureLabelStyle: CSSProperties = {
  display: "block",
  fontSize: "0.9375rem",
  fontWeight: 600,
};

const statsLabelStyle: CSSProperties = {
  margin: "0 0 1rem",
  fontSize: "0.9375rem",
  fontWeight: 700,
};

const flowIntroStyle: CSSProperties = {
  margin: "0 0 1.5rem",
  maxWidth: "52rem",
  fontSize: "1rem",
  lineHeight: 1.7,
  color: "var(--ads-color-text-muted)",
};

const stepItemStyle: CSSProperties = {
  display: "flex",
  gap: "1rem",
  alignItems: "flex-start",
  height: "100%",
  padding: "1.25rem",
  background: "var(--ads-color-background)",
  border: "1px solid var(--ads-color-border)",
  borderTop: "3px solid var(--ads-color-primary)",
};

const stepBadgeStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "2rem",
  height: "2rem",
  flexShrink: 0,
  borderRadius: "50%",
  background: "var(--ads-color-primary)",
  color: "var(--ads-color-background)",
  fontSize: "0.9375rem",
  fontWeight: 700,
};

const stepTitleStyle: CSSProperties = {
  display: "block",
  fontWeight: 700,
};

const stepTextStyle: CSSProperties = {
  display: "block",
  fontSize: "0.9375rem",
  lineHeight: 1.55,
  color: "var(--ads-color-text-muted)",
};

const statusCardStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.75rem",
  marginTop: "1.75rem",
  padding: "1rem 1.25rem",
  background: "var(--ads-color-background)",
  border: "1px solid var(--ads-color-border)",
  borderTop: "3px solid var(--ads-color-success)",
};

const inlineLinkStyle: CSSProperties = {
  fontWeight: 600,
  textUnderlineOffset: "0.2em",
};

const ctaRowStyle: CSSProperties = {
  marginTop: "2rem",
};

/**
 * Homepage of the Autorité nationale des noms de domaine d'Astoria — the
 * institutional front door of the national `.aor` namespace.
 *
 * The page tells the story of the institution, section after section:
 *
 *   01 Héro                    — identifier l'institution (l'autorité du .aor)
 *   02 Le .aor                — comprendre le domaine national
 *   03 Le registre national   — comprendre le rôle central de l'ANRD
 *   04 Rechercher un domaine  — agir : la recherche de nom de domaine
 *   05 Enregistrer un .aor    — agir : le parcours utilisateur
 *   06 Bureaux d'enregistrement — comprendre : l'écosystème des registrars
 *   07 Gouvernance & règles   — faire confiance : un namespace gouverné
 *   08 Infrastructure & sécurité — faire confiance : une infrastructure critique
 *   09 Transparence & données — faire confiance : un registre ouvert
 *   10 L'ANRD                 — l'institution, pour conclure
 *
 * The ANRD is presented as the national authority that governs the namespace
 * — never as a registrar and never as a seller of domains. Operational figures
 * are placeholders (values come from `home-content.ts` and will be connected
 * to the registry APIs); no value is ever invented and presented as real.
 *
 * Every section is driven by the `anrdHome` configuration
 * (`lib/home-content.ts`) and the message catalogs, so the content can evolve
 * without rewriting the interface. The header already provides the primary
 * navigation; this page provides the journey.
 */
export default async function HomePage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocaleParam(rawLocale);
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <>
      {/* 01 — Héro: institutional statement. The ANRD is presented as the
          national authority of the .aor namespace, with two actions: search a
          domain (to the lookup below) and discover the extension. */}
      <section className="gov-section" aria-labelledby="home-hero-title">
        <div className="gov-section__container" style={heroContainerStyle}>
          <p className="gov-kicker">{t("hero.kicker")}</p>
          <h1 id="home-hero-title">{t("hero.title")}</h1>
          <p className="gov-lead">{t("hero.lead")}</p>
          <p style={heroBadgeStyle}>{t("hero.badge")}</p>
          <CtaButtonsGroup
            alignment="center"
            buttons={[
              {
                children: t("hero.ctaLookup"),
                href: "#recherche-domaine",
                priority: "primary",
                iconId: "fr-icon-search-line",
              },
              {
                children: t("hero.ctaExplore"),
                href: homePaths.aorExplore,
                priority: "secondary",
                iconId: "fr-icon-arrow-right-line",
              },
            ]}
          />
        </div>
      </section>

      {/* 02 — Le .aor: the national domain, its role and its key figures.
          Figures are placeholders until the registry data is connected. The
          “Discover the .aor” action lives in the hero: it is not repeated. */}
      <section className="gov-section gov-section--subtle" aria-labelledby="aor-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("aor.kicker")}</p>
              <h2 id="aor-title" className="gov-section__title">
                {t("aor.title")}
              </h2>
              <p className="gov-lead">{t("aor.lead")}</p>
            </div>
          </div>
          <div className="fr-grid-row fr-grid-row--gutters">
            {aorPoints.map((item) => (
              <div key={item.key} className="fr-col-12 fr-col-md-6 fr-col-lg-3">
                <LinkTile
                  title={t(`aor.items.${item.key}.title`)}
                  desc={t(`aor.items.${item.key}.text`)}
                  href={item.href}
                  iconId={item.iconId}
                />
              </div>
            ))}
          </div>
          <div style={{ marginTop: "2.5rem" }}>
            <p style={statsLabelStyle}>{t("aor.stats.label")}</p>
            <ul className="fr-grid-row fr-grid-row--gutters" role="list" style={cardListStyle}>
              {aorStats.map((stat) => (
                <li key={stat.key} className="fr-col-12 fr-col-md-6 fr-col-lg-3">
                  <div style={teaserCardStyle}>
                    <span style={figureValueStyle}>—</span>
                    <span style={figureLabelStyle}>{t(`aor.stats.items.${stat.key}.label`)}</span>
                  </div>
                </li>
              ))}
            </ul>
            <p className="fr-text--sm" style={{ color: "var(--ads-color-text-muted)" }}>
              {t("aor.stats.note")}
            </p>
          </div>
        </div>
      </section>

      {/* 03 — Le registre national: the institutional chain. The ANRD governs
          the namespace; the registrars connect the holders to it. */}
      <section className="gov-section" aria-labelledby="registry-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("registry.kicker")}</p>
              <h2 id="registry-title" className="gov-section__title">
                {t("registry.title")}
              </h2>
              <p className="gov-lead">{t("registry.lead")}</p>
            </div>
          </div>
          <p style={flowIntroStyle}>{t("registry.intro")}</p>
          <FlowDiagram
            items={registryRoles.map((role) => ({
              key: role.key,
              label: t(`registry.roles.${role.key}`),
            }))}
            caption={t("registry.caption")}
          />
        </div>
      </section>

      {/* 04 — Rechercher un nom de domaine: the most concrete action of the
          portal. Connected to the registry lookup once it is live. */}
      <section className="gov-section gov-section--subtle" aria-labelledby="lookup-title">
        <div className="gov-section__container" id="recherche-domaine">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("lookup.kicker")}</p>
              <h2 id="lookup-title" className="gov-section__title">
                {t("lookup.title")}
              </h2>
              <p className="gov-lead">{t("lookup.lead")}</p>
            </div>
          </div>
          <DomainLookup />
          <p style={ctaRowStyle}>
            <Link href={homePaths.registryLookup} style={inlineLinkStyle}>
              {t("lookup.cta")}
              <span className="fr-icon-arrow-right-line" aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>

      {/* 05 — Enregistrer un .aor: the user journey in four steps. Purely
          educational: registration always happens through an accredited
          registrar. */}
      <section className="gov-section" aria-labelledby="steps-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("steps.kicker")}</p>
              <h2 id="steps-title" className="gov-section__title">
                {t("steps.title")}
              </h2>
              <p className="gov-lead">{t("steps.lead")}</p>
            </div>
            <CtaButtonsGroup
              buttons={[
                {
                  children: t("steps.cta"),
                  href: homePaths.registerCta,
                  priority: "secondary",
                  iconId: "fr-icon-arrow-right-line",
                },
              ]}
            />
          </div>
          <ul
            className="fr-grid-row fr-grid-row--gutters"
            role="list"
            style={{ listStyle: "none", margin: "0", padding: "0" }}
          >
            {registrySteps.map((step, index) => (
              <li key={step.key} className="fr-col-12 fr-col-md-6 fr-col-lg-3">
                <div style={stepItemStyle}>
                  <span style={stepBadgeStyle} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span style={stepTitleStyle}>{t(`steps.items.${step.key}.title`)}</span>
                    <span style={stepTextStyle}>{t(`steps.items.${step.key}.text`)}</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 06 — Bureaux d'enregistrement: the ecosystem. The institutional
          distinction between the authority (ANRD) and the registrars. */}
      <section className="gov-section gov-section--subtle" aria-labelledby="registrars-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("registrars.kicker")}</p>
              <h2 id="registrars-title" className="gov-section__title">
                {t("registrars.title")}
              </h2>
              <p className="gov-lead">{t("registrars.lead")}</p>
            </div>
            <CtaButtonsGroup
              buttons={[
                {
                  children: t("registrars.cta"),
                  href: homePaths.registrarsCta,
                  priority: "secondary",
                  iconId: "fr-icon-arrow-right-line",
                },
              ]}
            />
          </div>
          <div className="fr-grid-row fr-grid-row--gutters">
            {registrarLinks.map((item) => (
              <div key={item.key} className="fr-col-12 fr-col-md-6 fr-col-lg-3">
                <LinkTile
                  title={t(`registrars.items.${item.key}.title`)}
                  desc={t(`registrars.items.${item.key}.text`)}
                  href={item.href}
                  iconId={item.iconId}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07 — Gouvernance & règles: the governed namespace. Policies are
          presented as institutional, versioned documents. */}
      <section className="gov-section" aria-labelledby="governance-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("governance.kicker")}</p>
              <h2 id="governance-title" className="gov-section__title">
                {t("governance.title")}
              </h2>
              <p className="gov-lead">{t("governance.lead")}</p>
            </div>
            <CtaButtonsGroup
              buttons={[
                {
                  children: t("governance.cta"),
                  href: homePaths.governanceCta,
                  priority: "secondary",
                  iconId: "fr-icon-arrow-right-line",
                },
              ]}
            />
          </div>
          <div className="fr-grid-row fr-grid-row--gutters">
            {policyLinks.map((item) => (
              <div key={item.key} className="fr-col-12 fr-col-md-6 fr-col-lg-4">
                <LinkTile
                  title={t(`governance.items.${item.key}.title`)}
                  desc={t(`governance.items.${item.key}.text`)}
                  href={item.href}
                  iconId={item.iconId}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08 — Infrastructure & sécurité: the four pillars of the national
          infrastructure and the government status platform. */}
      <section className="gov-section gov-section--subtle" aria-labelledby="infrastructure-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("infrastructure.kicker")}</p>
              <h2 id="infrastructure-title" className="gov-section__title">
                {t("infrastructure.title")}
              </h2>
              <p className="gov-lead">{t("infrastructure.lead")}</p>
            </div>
          </div>
          <div className="fr-grid-row fr-grid-row--gutters">
            {infrastructurePillars.map((item) => (
              <div key={item.key} className="fr-col-12 fr-col-md-6 fr-col-lg-3">
                <LinkTile
                  title={t(`infrastructure.items.${item.key}.title`)}
                  desc={t(`infrastructure.items.${item.key}.text`)}
                  href={item.href}
                  iconId={item.iconId}
                />
              </div>
            ))}
          </div>
          <div style={statusCardStyle}>
            <span
              className="fr-icon-checkbox-circle-line"
              aria-hidden="true"
              style={{ color: "var(--ads-color-success)", lineHeight: 1 }}
            />
            <span>
              <span
                style={{
                  display: "block",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  color: "var(--ads-color-text-muted)",
                }}
              >
                {t("infrastructure.statusLabel")}
              </span>
              <span style={{ display: "block", fontWeight: 700 }}>
                {t("infrastructure.statusValue")}
              </span>
            </span>
          </div>
          <p style={ctaRowStyle}>
            <a href={homePaths.statusDetail} target="_blank" rel="noopener noreferrer" style={inlineLinkStyle}>
              {t("infrastructure.statusLink")}
              <span className="fr-icon-external-link-line" aria-hidden="true" />
            </a>
          </p>
        </div>
      </section>

      {/* 09 — Transparence & données: what the ANRD publishes about the
          namespace. */}
      <section className="gov-section" aria-labelledby="transparency-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("transparency.kicker")}</p>
              <h2 id="transparency-title" className="gov-section__title">
                {t("transparency.title")}
              </h2>
              <p className="gov-lead">{t("transparency.lead")}</p>
            </div>
            <CtaButtonsGroup
              buttons={[
                {
                  children: t("transparency.cta"),
                  href: homePaths.transparencyCta,
                  priority: "secondary",
                  iconId: "fr-icon-arrow-right-line",
                },
              ]}
            />
          </div>
          <div className="fr-grid-row fr-grid-row--gutters">
            {transparencyLinks.map((item) => (
              <div key={item.key} className="fr-col-12 fr-col-md-6 fr-col-lg-3">
                <LinkTile
                  title={t(`transparency.items.${item.key}.title`)}
                  desc={t(`transparency.items.${item.key}.text`)}
                  href={item.href}
                  iconId={item.iconId}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 — L'ANRD: institutional closing. The authority, its mission and
          the ways to engage with it. */}
      <section className="gov-section gov-section--subtle" aria-labelledby="institution-title">
        <div className="gov-section__container" style={heroContainerStyle}>
          <p className="gov-kicker">{t("institution.kicker")}</p>
          <h2 id="institution-title" className="gov-section__title">
            {t("institution.title")}
          </h2>
          <p className="gov-lead" style={{ marginInline: "auto" }}>
            {t("institution.lead")}
          </p>
          <ul className="fr-grid-row fr-grid-row--gutters" role="list" style={cardListStyle}>
            {institutionMissions.map((mission) => (
              <li key={mission.key} className="fr-col-12 fr-col-md-6 fr-col-lg-4">
                <div style={teaserCardStyle}>
                  <span style={figureLabelStyle}>{t(`institution.items.${mission.key}.title`)}</span>
                  <span
                    style={{
                      display: "block",
                      fontSize: "0.9375rem",
                      lineHeight: 1.55,
                      color: "var(--ads-color-text-muted)",
                    }}
                  >
                    {t(`institution.items.${mission.key}.text`)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div style={ctaRowStyle}>
            <CtaButtonsGroup
              alignment="center"
              buttons={[
                {
                  children: t("institution.ctaDiscover"),
                  href: homePaths.institutionDiscover,
                  priority: "primary",
                  iconId: "fr-icon-arrow-right-line",
                },
                {
                  children: t("institution.ctaPolicies"),
                  href: homePaths.institutionPolicies,
                  priority: "secondary",
                  iconId: "fr-icon-arrow-right-line",
                },
                {
                  children: t("institution.ctaContact"),
                  href: homePaths.institutionContact,
                  priority: "secondary",
                  iconId: "fr-icon-mail-line",
                },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}