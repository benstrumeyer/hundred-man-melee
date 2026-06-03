import { defineConfig } from "vite";
import babel from "vite-plugin-babel";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(root, "src");
const distDir = path.join(root, "dist");

// Replicates the old Webpack `resolve.root = [src]`: bare specifiers like
// "main/render" or "physics/physics" resolve against src/. Returns null for
// relative/absolute paths and for anything not found under src/, so real
// npm packages (jquery, howler, pako, localforage, deepstream.io-client-js)
// fall through to normal node_modules resolution.
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
  // deepstream.io-client-js (legacy multiplayer dep) references Node's `global`,
  // which doesn't exist in the browser. Map it to globalThis so the dep evaluates.
  define: { global: "globalThis" },
  // Serve dist/ contents at the site root (/meleelight.css, /gamepad.css,
  // /assets/*, /music/*, /sfx/*). The root index.html lives at repo root,
  // NOT inside dist/, so it does not overlap publicDir.
  publicDir: distDir,
  resolve: { extensions: [".js"] },
  plugins: [
    srcRootResolver(),
    // Transform first-party source CommonJS (src/animations/**) in DEV and build.
    // Vite's built-in build.commonjsOptions only runs during `vite build`, so this
    // plugin is required for `vite dev` to handle require()/module.exports under src/.
    // Honors resolve.extensions [".js"], so the .js-less requires
    // (require("./THROWNFALCONBACK"), require("./CAPTUREDAMAGE")) resolve fine.
    // @originjs filter is a literal substring match (what.indexOf(include)>=0),
    // NOT a glob — so "src/animations" matches both src/animations.js and every
    // src/animations/<char>/*.js path. (No globs/regex; the plugin .split()s each entry.)
    viteCommonjs({ include: ["src/animations"] }),
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
  build: {
    // outDir MUST differ from publicDir (=dist); otherwise Vite recursively
    // copies dist into itself during the public-dir copy step (heap OOM + the
    // "outDir and publicDir are not separate folders" warning).
    outDir: "build",
    // Production Rollup CommonJS pass. include REPLACES Rollup's default
    // [/node_modules/], so /node_modules/ MUST stay here or howler/jquery break in build.
    commonjsOptions: {
      include: [/src[\\/]animations/, /node_modules/],
      transformMixedEsModules: true,
    },
  },
});
