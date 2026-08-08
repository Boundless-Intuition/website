import js from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // Everything here is generated or vendored, and none of it is ours to lint.
  // `.vercel` is where the Nitro vercel preset writes the build (`.output` is
  // the old Cloudflare target, kept for stale working copies) and `.claude`
  // holds agent worktrees — each a full second checkout with its own build.
  // Without these, `eslint .` walks tens of thousands of generated files: it
  // takes minutes and crashes outright if a build removes one mid-scan.
  {
    ignores: [
      "dist",
      ".output",
      ".vercel",
      ".vinxi",
      ".claude",
      "**/.vercel/**",
      "**/dist/**",
    ],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "server-only",
              message:
                "TanStack Start does not use the Next.js `server-only` package. Rename the module to `*.server.ts` or mark it with `@tanstack/react-start/server-only`.",
            },
          ],
        },
      ],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    // Build-time scripts run under Bun, not the browser.
    files: ["scripts/**/*.ts"],
    languageOptions: { globals: globals.node },
  },
  eslintPluginPrettier,
);
