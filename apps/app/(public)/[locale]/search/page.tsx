import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localizedAlternates, resolveLocaleParam } from "@/lib/localized-metadata";
import { PortalSearchBar } from "@/components/public/search/portal-search-bar";
import { ThemeHero, ThemeSection } from "@/components/public/content/theme-page";
import { Link } from "@/i18n/navigation";
import { legalPaths } from "@/lib/site-structure";

const PAGE_PATH = "/search";
const PAGE_NAMESPACE = "pages.search";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocaleParam(rawLocale);
  const t = await getTranslations({ locale, namespace: PAGE_NAMESPACE });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    ...localizedAlternates(locale, PAGE_PATH),
  };
}

const scopeListStyle: CSSProperties = {
  listStyle: "none",
  margin: "1.25rem 0 0",
  padding: "0",
  display: "grid",
  gap: "0.625rem",
  maxWidth: "42rem",
};

const scopeItemStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.625rem",
  padding: "0.75rem 1rem",
  background: "var(--ads-color-background)",
  border: "1px solid var(--ads-color-border)",
  fontSize: "0.9375rem",
  fontWeight: 600,
};

const scopeIconStyle: CSSProperties = {
  color: "var(--ads-color-primary)",
  lineHeight: 1,
};

/**
 * Search page of the ANRD portal (`/search`).
 *
 * The header and the home page push their queries here. The portal search
 * index is not wired yet: the page shows the query, restates what the global
 * search will cover (pages, documentation, policies, domains, registrars and
 * publications) and points to the sitemap as a fallback. The structure is
 * driven by the `pages.search.*` message keys.
 */
export default async function SearchPage({ params, searchParams }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocaleParam(rawLocale);
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: PAGE_NAMESPACE });
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  return (
    <>
      <ThemeHero kicker={t("hero.kicker")} title={t("hero.title")} lead={t("hero.lead")} />

      <section className="gov-section gov-section--subtle" aria-labelledby="search-form-title">
        <div className="gov-section__container" style={{ maxWidth: "48rem" }}>
          <PortalSearchBar
            label={t("form.label")}
            placeholder={t("form.placeholder")}
            defaultValue={query}
          />
        </div>
      </section>

      {query ? (
        <ThemeSection
          id="search-results"
          kicker={t("results.kicker")}
          title={t("results.title")}
          lead={t("results.leadQuery", { query })}
        >
          <div className="gov-prose">
            <h3>{t("results.empty.title")}</h3>
            <p>{t("results.empty.text")}</p>
          </div>
          <ul role="list" style={scopeListStyle}>
            {(["pages", "documentation", "policies", "domains", "registrars", "publications"] as const).map(
              (scope) => (
                <li key={scope} style={scopeItemStyle}>
                  <span className="fr-icon-check-line" aria-hidden="true" style={scopeIconStyle} />
                  <span>{t(`results.empty.scopes.${scope}`)}</span>
                </li>
              )
            )}
          </ul>
        </ThemeSection>
      ) : (
        <ThemeSection
          id="search-help"
          kicker={t("help.kicker")}
          title={t("help.title")}
          lead={t("help.lead")}
          subtle
        >
          <p>
            <Link href={legalPaths.sitemap} style={{ fontWeight: 600, textUnderlineOffset: "0.2em" }}>
              {t("help.links.sitemap")}
              <span className="fr-icon-arrow-right-line" aria-hidden="true" />
            </Link>
          </p>
        </ThemeSection>
      )}
    </>
  );
}