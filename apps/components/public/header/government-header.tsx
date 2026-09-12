"use client";

import * as React from "react";
import { Header } from "@codegouvaor/react-ads/Header";
import { SkipLinks } from "@codegouvaor/react-ads/SkipLinks";
import { headerFooterDisplayItem } from "@codegouvaor/react-ads/Display";
import type { HeaderProps } from "@codegouvaor/react-ads/Header";
import type { MainNavigationProps } from "@codegouvaor/react-ads/MainNavigation";
import type { MegaMenuProps } from "@codegouvaor/react-ads/MainNavigation/MegaMenu";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { getDomainUrl } from "@/lib/domains";
import {
  pageAnchors,
  primaryNavigation,
  searchPath,
  statusUrl,
  type NavigationSection,
} from "@/lib/site-structure";
import { useAuth } from "@/context/AuthContext";
import { UserAccountMenu } from "@/components/public/header/user-account-menu";
import { siteAccountConfig } from "@/lib/site-config";

/** Whether the current pathname corresponds to a navigation href. */
const isNavItemActive = (href: string, pathname: string): boolean =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

/**
 * Collect every href reachable from a navigation section (leader action,
 * themes and their destinations) so the parent tab can be marked active when
 * the user lands on any child page — even if the child href lives outside the
 * parent's own path tree.
 */
function collectChildHrefs(section: NavigationSection): string[] {
  const hrefs: string[] = [section.leader.link.href];
  for (const item of section.primaryItems) {
    hrefs.push(item.href);
    for (const link of item.links) hrefs.push(link.href);
  }
  return hrefs;
}

/**
 * Government Header of the Autorité nationale des noms de domaine d'Astoria
 * (ANRD) — the national authority that governs and administers the `.aor`
 * namespace.
 *
 * Main navigation — the permanent information architecture of the portal,
 * organised around the institutional perimeter of the registry authority
 * rather than generic website categories:
 *
 *   L'ANRD                   → Incarner  : présentation, organisation, transparence, actualités
 *   Le `.aor`                → Comprendre : le domaine national, enregistrement, identité nationale, évolution
 *   Noms de domaine          → Agir      : enregistrer, gérer, transférer, fin de vie
 *   Registre                 → Opérer    : fonctionnement, recherche, infrastructure, données
 *   Bureaux d'enregistrement → Encadrer  : bureaux accrédités, devenir bureau, opérations, conformité
 *   Règles & politiques      → Cadrer    : politiques `.aor`, tarification, litiges, cadre
 *   Ressources               → Outiller  : documentation, données, publications, assistance
 *
 * Each entry opens an institutional mega-menu (leader band with the entry
 * description and its main action, plus four section columns of four links).
 *
 * The whole navigation is configuration-driven (`primaryNavigation` in
 * `@/lib/site-structure`): the seven themes open the panels, and nothing else
 * competes with them in the header. `Rechercher` and `Statut` are transversal
 * functions of the platform (global search, government status platform) and
 * deliberately live outside the primary navigation — they are not counted
 * among the 112 navigation entries.
 *
 * The header behaviour (mega-menu opening on click, close on outside click and
 * `Escape`, keyboard support, mobile drawer) is provided by the ADS runtime
 * (`StartDsfrOnHydration`). When the user is authenticated the “MyGouv” link
 * is hidden and a custom account menu (`UserAccountMenu`) is rendered instead.
 */
export function GovernmentHeader() {
  const t = useTranslations();
  const tPrimaryNav = useTranslations("nav.primary");
  const tNavPanel = useTranslations("nav.panel");
  const tBrand = useTranslations("brand");
  const pathname = usePathname();
  const router = useRouter();

  const navigationItems: MainNavigationProps.Item[] = primaryNavigation.map((section) => {
    const childHrefs = collectChildHrefs(section);
    const isActive =
      isNavItemActive(section.href, pathname) ||
      childHrefs.some((href) => isNavItemActive(href, pathname));

    // The four themes of the section are the pillars of its panel: each one is
    // headed by its title (plain text, not navigable) and followed by its four
    // links, so the destinations are immediately visible and reachable.
    const categories: MegaMenuProps.Category[] = section.primaryItems.map(
      (item): MegaMenuProps.Category => ({
        categoryMainText: tNavPanel(item.labelKey),
        links: item.links.map((link) => ({
          text: tNavPanel(link.labelKey),
          linkProps: { href: link.href },
          isActive: isNavItemActive(link.href, pathname),
        })),
      })
    );

    return {
      isActive,
      text: tPrimaryNav(section.labelKey),
      megaMenu: {
        leader: {
          title: tNavPanel(section.leader.titleKey),
          paragraph: tNavPanel(section.leader.paragraphKey),
          link: {
            text: tNavPanel(section.leader.link.labelKey),
            linkProps: { href: section.leader.link.href },
          },
        },
        categories,
      },
    };
  });

  const handleSearch = (text: string) => {
    const query = text.trim();
    router.push(query ? `${searchPath}?q=${encodeURIComponent(query)}` : searchPath);
  };

  // Auth state for conditional account UI
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

  // Quick-access items — `Statut` and `MyGouv` are transversal actions:
  // - “Statut” points to the government status platform (status.gouv.aor),
  //   the single place where the availability of the State's services is
  //   reported; the ANRD portal only links to it, never duplicates it.
  // - “MyGouv” points to the SSO identity layer when the user is not
  //   authenticated (the portal never duplicates MyGouv's identity
  //   functionality), and is replaced by the account menu (with its personal
  //   entries) once the user is authenticated.
  const quickAccessItems = React.useMemo(() => {
    const items: HeaderProps.QuickAccessItem[] = [
      {
        iconId: "fr-icon-checkbox-circle-line",
        text: t("header.status"),
        linkProps: {
          href: statusUrl,
          target: "_blank",
          rel: "noopener noreferrer",
          title: t("header.status"),
        },
      },
    ];

    if (!isAuthenticated || isAuthLoading) {
      items.push({
        iconId: "fr-icon-account-circle-line",
        text: t("header.myGouv"),
        linkProps: { href: getDomainUrl("sso", "/login") },
      });
    }

    items.push(headerFooterDisplayItem);
    return items;
  }, [isAuthenticated, isAuthLoading, t]);

  return (
    <>
      <SkipLinks
        links={[
          { label: t("common.skipToContent"), anchor: `#${pageAnchors.content}` },
          { label: t("common.skipToFooter"), anchor: `#${pageAnchors.footer}` },
        ]}
      />
      <Header
        className="gov-header"
        classes={{ brand: "fr-enlarge-link" }}
        identity={{
          imgUrl: "/astoria-gouv.png",
          alt: tBrand("republicName"),
          // The lockup artwork already carries the full wordmark, so no
          // institution line is displayed under the image. ADS requires the
          // field, hence the empty string.
          institution: "",
        }}
        homeLinkProps={{
          href: "/",
          title: t("header.homeTitle"),
        }}
        serviceTitle={t("header.serviceTitle")}
        serviceTagline={t("header.serviceTagline")}
        navigation={navigationItems}
        quickAccessItems={quickAccessItems}
        renderSearchInput={(params) => (
          <input {...params} placeholder={t("meta.searchPlaceholder")} />
        )}
        onSearchButtonClick={handleSearch}
      />
      {/* Account menu — rendered outside the ADS Header so it can use
          its own dropdown positioning and auth state without conflicting
          with the ADS quick-access toolbar. */}
      {siteAccountConfig.enabled && <UserAccountMenu />}
    </>
  );
}
