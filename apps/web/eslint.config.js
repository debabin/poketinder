import { eslint } from "@siberiacancode/eslint";
import pluginTanstackQuery from "@tanstack/eslint-plugin-query";
import pluginTanstackRouter from "@tanstack/eslint-plugin-router";

export default eslint(
  {
    typescript: true,
    react: true,
    jsx: true,
  },
  {
    plugins: {
      "@tanstack/query": pluginTanstackQuery,
    },
    name: "tanstack-query",
    ...pluginTanstackQuery.configs.recomended,
  },
  {
    plugins: {
      "@tanstack/router": pluginTanstackRouter,
    },
    name: "tanstack-router",
    ...pluginTanstackRouter.configs.recomended,
  },
);
