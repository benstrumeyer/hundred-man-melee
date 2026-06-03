import "./globals.js";   // hoisted first -> window.$ / window.Howl / offlineMode set before anything else
import includeGamepadSVG from "./input/gamepad/includeGamepadSVG.js";
window.includeGamepadSVG = includeGamepadSVG;
import "./main.js";        // full ESM game graph; defines window.start via main/main.js:1734
import "./animations.js";  // CommonJS; sets window.animations = [...] (transformed by viteCommonjs)
import "./main/loadscreen.js"; // visual load screen; now calls window.start() directly (see step 7)

// initialise the gamepad SVG iframes (were inline <script> calls in dist HTML)
includeGamepadSVG("gamepadSVGCalibration", 600, 600, true);
includeGamepadSVG("gamepadSVG0", 150, 150, false);
includeGamepadSVG("gamepadSVG1", 150, 150, false);
includeGamepadSVG("gamepadSVG2", 150, 150, false);
includeGamepadSVG("gamepadSVG3", 150, 150, false);
