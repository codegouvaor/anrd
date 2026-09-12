"use client";

import * as React from "react";
import { useTranslations } from "next-intl";

/**
 * Domain availability lookup of the homepage.
 *
 * The component is designed to be connected to the national registry lookup
 * API later: it normalizes the submitted name, displays the domain and renders
 * the result area. Until the registry interface is live it never asserts a
 * real availability — it shows an honest “lookup not connected” state and
 * explains the states the registry will return once online.
 */
export function DomainLookup() {
  const t = useTranslations("home.lookup");
  const [value, setValue] = React.useState("");
  const [submitted, setSubmitted] = React.useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = value.trim().toLowerCase().replace(/^\.+|\.+$/g, "");
    setSubmitted(trimmed ? (trimmed.includes(".") ? trimmed : `${trimmed}.aor`) : null);
  };

  return (
    <div style={{ maxWidth: "42rem" }}>
      <form onSubmit={handleSubmit} noValidate>
        <label
          htmlFor="domain-lookup-input"
          style={{
            display: "block",
            margin: "0 0 0.5rem",
            fontSize: "0.9375rem",
            fontWeight: 600,
          }}
        >
          {t("inputLabel")}
        </label>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          <input
            id="domain-lookup-input"
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder={t("placeholder")}
            inputMode="url"
            autoComplete="off"
            spellCheck={false}
            style={{
              flex: 1,
              padding: "0.75rem 1rem",
              fontSize: "1rem",
              lineHeight: 1.5,
              color: "var(--ads-color-text)",
              background: "var(--ads-color-background)",
              border: "1px solid var(--ads-color-border)",
              borderRadius: "0.25rem 0 0 0.25rem",
            }}
          />
          <button
            type="submit"
            className="fr-btn"
            style={{ alignSelf: "flex-start", whiteSpace: "nowrap" }}
          >
            {t("submit")}
          </button>
        </div>
      </form>

      {submitted ? (
        <div
          role="status"
          style={{
            marginTop: "1.5rem",
            padding: "1.25rem",
            background: "var(--ads-color-background)",
            border: "1px solid var(--ads-color-border)",
            borderTop: "3px solid var(--ads-color-primary)",
          }}
        >
          <p
            style={{
              margin: "0 0 0.5rem",
              fontSize: "1.0625rem",
              lineHeight: 1.4,
              fontWeight: 700,
            }}
          >
            {submitted}
          </p>
          <p
            style={{
              margin: "0 0 0.5rem",
              fontSize: "0.9375rem",
              lineHeight: 1.55,
              color: "var(--ads-color-text-muted)",
            }}
          >
            {t("result.note")}
          </p>
          <p
            style={{
              margin: "0 0 1rem",
              fontSize: "0.9375rem",
              lineHeight: 1.55,
              fontWeight: 600,
            }}
          >
            {t("result.availability")}
          </p>
          <p
            style={{
              margin: "0",
              fontSize: "0.875rem",
              lineHeight: 1.5,
              color: "var(--ads-color-text-muted)",
            }}
          >
            {t("result.states")}
          </p>
          <ul
            role="list"
            style={{
              listStyle: "none",
              margin: "0.5rem 0 0",
              padding: "0",
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <li
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                fontSize: "0.9375rem",
                fontWeight: 600,
              }}
            >
              <span className="fr-icon-check-line" aria-hidden="true" style={{ color: "var(--ads-color-success)" }} />
              {t("result.available")}
            </li>
            <li
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                fontSize: "0.9375rem",
                fontWeight: 600,
              }}
            >
              <span className="fr-icon-close-line" aria-hidden="true" style={{ color: "var(--ads-color-danger)" }} />
              {t("result.taken")}
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}