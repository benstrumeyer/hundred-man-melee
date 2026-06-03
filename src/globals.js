// src/globals.js — side-effect module; MUST be imported before any legacy code.
import $ from "jquery";
import { Howl, Howler } from "howler";
window.$ = $;
window.jQuery = $;
window.Howl = Howl;
window.Howler = Howler;
window.offlineMode = true;
