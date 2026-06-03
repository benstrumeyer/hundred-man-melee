import { defineConfig } from "vite";
import babel from "vite-plugin-babel";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(root, "src");

// Replicates the old Webpack `resolve.root = [src]`: bare specifiers like
// "main/render" or "physics/physics" resolve against src/. Returns null for
// relative/absolute paths and for anything not found under src/, so real
// npm packages (jquery, howler) fall through to normal node_modules resolution.
function srcRootResolver() {
  return {
    name: "src-root-resolver",
    enforce: "pre",
    resolveId(source) {
      if (
        source.startsWith(".") ||
        source.startsWith("\0") ||
        path.isAbsolute(source)
      ) {
        return null;
      }
      const tries = [
        path.join(srcDir, source),
        path.join(srcDir, source + ".js"),
        path.join(srcDir, source, "index.js"),
      ];
      for (const candidate of tries) {
        try {
          if (fs.statSync(candidate).isFile()) return candidate;
        } catch {
          /* not this one */
        }
      }
      return null;
    },
  };
}

export default defineConfig({
  resolve: { extensions: [".js"] },
  plugins: [
    srcRootResolver(),
    // Strip Flow type annotations (present in src/input/gamepad/* and others).
    babel({
      filter: /[\\/]src[\\/].*\.jsx?$/,
      babelConfig: {
        babelrc: false,
        configFile: false,
        presets: ["@babel/preset-flow"],
      },
    }),
  ],
});
