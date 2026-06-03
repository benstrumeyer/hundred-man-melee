// Entry shim: expose jQuery globally (legacy code uses window.$ / $), pull in
// Howler for its side effects, then the load screen. Converted from CommonJS
// require() to ESM imports for Vite.
import $ from "jquery";
window.$ = $;
window.jQuery = $;
import "howler";
import "./main/loadscreen.js";
