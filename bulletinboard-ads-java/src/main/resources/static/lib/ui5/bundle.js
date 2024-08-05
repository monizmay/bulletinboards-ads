/* Generated Using Rollup
  To add more webcomponents, refer to README in repo
  https://github.tools.sap/cloud-curriculum/ui5-bundler */

var class2type = {};
var hasOwn = class2type.hasOwnProperty;
var toString = class2type.toString;
var fnToString = hasOwn.toString;
var ObjectFunctionString = fnToString.call(Object);
var fnIsPlainObject = function (obj) {
    var proto, Ctor;
    if (!obj || toString.call(obj) !== "[object Object]") {
        return false;
    }
    proto = Object.getPrototypeOf(obj);
    if (!proto) {
        return true;
    }
    Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
    return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
};

var oToken = Object.create(null);
var fnMerge$1 = function (arg1, arg2, arg3, arg4) {
    var src, copyIsArray, copy, name, options, clone, target = arguments[2] || {}, i = 3, length = arguments.length, deep = arguments[0] || false, skipToken = arguments[1] ? undefined : oToken;
    if (typeof target !== 'object' && typeof target !== 'function') {
        target = {};
    }
    for (; i < length; i++) {
        if ((options = arguments[i]) != null) {
            for (name in options) {
                src = target[name];
                copy = options[name];
                if (name === '__proto__' || target === copy) {
                    continue;
                }
                if (deep && copy && (fnIsPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && Array.isArray(src) ? src : [];
                    }
                    else {
                        clone = src && fnIsPlainObject(src) ? src : {};
                    }
                    target[name] = fnMerge$1(deep, arguments[1], clone, copy);
                }
                else if (copy !== skipToken) {
                    target[name] = copy;
                }
            }
        }
    }
    return target;
};

const fnMerge = function (arg1, arg2) {
    return fnMerge$1(true, false, ...arguments);
};

const whenDOMReady = () => {
    return new Promise(resolve => {
        if (document.body) {
            resolve();
        }
        else {
            document.addEventListener("DOMContentLoaded", () => {
                resolve();
            });
        }
    });
};

class EventProvider {
    constructor() {
        this._eventRegistry = new Map();
    }
    attachEvent(eventName, fnFunction) {
        const eventRegistry = this._eventRegistry;
        const eventListeners = eventRegistry.get(eventName);
        if (!Array.isArray(eventListeners)) {
            eventRegistry.set(eventName, [fnFunction]);
            return;
        }
        if (!eventListeners.includes(fnFunction)) {
            eventListeners.push(fnFunction);
        }
    }
    detachEvent(eventName, fnFunction) {
        const eventRegistry = this._eventRegistry;
        const eventListeners = eventRegistry.get(eventName);
        if (!eventListeners) {
            return;
        }
        const indexOfFnToDetach = eventListeners.indexOf(fnFunction);
        if (indexOfFnToDetach !== -1) {
            eventListeners.splice(indexOfFnToDetach, 1);
        }
        if (eventListeners.length === 0) {
            eventRegistry.delete(eventName);
        }
    }
    /**
     * Fires an event and returns the results of all event listeners as an array.
     *
     * @param eventName the event to fire
     * @param data optional data to pass to each event listener
     * @returns {Array} an array with the results of all event listeners
     */
    fireEvent(eventName, data) {
        const eventRegistry = this._eventRegistry;
        const eventListeners = eventRegistry.get(eventName);
        if (!eventListeners) {
            return [];
        }
        return eventListeners.map(fn => {
            return fn.call(this, data);
        });
    }
    /**
     * Fires an event and returns a promise that will resolve once all listeners have resolved.
     *
     * @param eventName the event to fire
     * @param data optional data to pass to each event listener
     * @returns {Promise} a promise that will resolve when all listeners have resolved
     */
    fireEventAsync(eventName, data) {
        return Promise.all(this.fireEvent(eventName, data));
    }
    isHandlerAttached(eventName, fnFunction) {
        const eventRegistry = this._eventRegistry;
        const eventListeners = eventRegistry.get(eventName);
        if (!eventListeners) {
            return false;
        }
        return eventListeners.includes(fnFunction);
    }
    hasListeners(eventName) {
        return !!this._eventRegistry.get(eventName);
    }
}

/**
 * Creates a <style> tag in the <head> tag
 * @param cssText - the CSS
 * @param attributes - optional attributes to add to the tag
 * @returns {HTMLElement}
 */
const createStyleInHead = (cssText, attributes) => {
    const style = document.createElement("style");
    style.type = "text/css";
    if (attributes) {
        Object.entries(attributes).forEach(pair => style.setAttribute(...pair));
    }
    style.textContent = cssText;
    document.head.appendChild(style);
    return style;
};

/**
 * Creates a <link> tag in the <head> tag
 * @param href - the CSS
 * @param attributes - optional attributes to add to the tag
 */
const createLinkInHead = (href, attributes) => {
    const link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    if (attributes) {
        Object.entries(attributes).forEach(pair => link.setAttribute(...pair));
    }
    link.href = href;
    document.head.appendChild(link);
    return new Promise(resolve => {
        link.addEventListener("load", resolve);
        link.addEventListener("error", resolve); // intended
    });
};

const isSSR = typeof document === "undefined";
const internals = {
    get userAgent() {
        if (isSSR) {
            return "";
        }
        return navigator.userAgent;
    },
    get touch() {
        if (isSSR) {
            return false;
        }
        return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    },
    get ie() {
        if (isSSR) {
            return false;
        }
        return /(msie|trident)/i.test(internals.userAgent);
    },
    get chrome() {
        if (isSSR) {
            return false;
        }
        return !internals.ie && /(Chrome|CriOS)/.test(internals.userAgent);
    },
    get firefox() {
        if (isSSR) {
            return false;
        }
        return /Firefox/.test(internals.userAgent);
    },
    get safari() {
        if (isSSR) {
            return false;
        }
        return !internals.ie && !internals.chrome && /(Version|PhantomJS)\/(\d+\.\d+).*Safari/.test(internals.userAgent);
    },
    get webkit() {
        if (isSSR) {
            return false;
        }
        return !internals.ie && /webkit/.test(internals.userAgent);
    },
    get windows() {
        if (isSSR) {
            return false;
        }
        return navigator.platform.indexOf("Win") !== -1;
    },
    get macOS() {
        if (isSSR) {
            return false;
        }
        return !!navigator.userAgent.match(/Macintosh|Mac OS X/i);
    },
    get iOS() {
        if (isSSR) {
            return false;
        }
        return !!(navigator.platform.match(/iPhone|iPad|iPod/)) || !!(internals.userAgent.match(/Mac/) && "ontouchend" in document);
    },
    get android() {
        if (isSSR) {
            return false;
        }
        return !internals.windows && /Android/.test(internals.userAgent);
    },
    get androidPhone() {
        if (isSSR) {
            return false;
        }
        return internals.android && /(?=android)(?=.*mobile)/i.test(internals.userAgent);
    },
    get ipad() {
        if (isSSR) {
            return false;
        }
        // With iOS 13 the string 'iPad' was removed from the user agent string through a browser setting, which is applied on all sites by default:
        // "Request Desktop Website -> All websites" (for more infos see: https://forums.developer.apple.com/thread/119186).
        // Therefore the OS is detected as MACINTOSH instead of iOS and the device is a tablet if the Device.support.touch is true.
        return /ipad/i.test(internals.userAgent) || (/Macintosh/i.test(internals.userAgent) && "ontouchend" in document);
    },
};
let windowsVersion;
let webkitVersion;
let tablet;
const isWindows8OrAbove = () => {
    if (isSSR) {
        return false;
    }
    if (!internals.windows) {
        return false;
    }
    if (windowsVersion === undefined) {
        const matches = internals.userAgent.match(/Windows NT (\d+).(\d)/);
        windowsVersion = matches ? parseFloat(matches[1]) : 0;
    }
    return windowsVersion >= 8;
};
const isWebkit537OrAbove = () => {
    if (isSSR) {
        return false;
    }
    if (!internals.webkit) {
        return false;
    }
    if (webkitVersion === undefined) {
        const matches = internals.userAgent.match(/(webkit)[ /]([\w.]+)/);
        webkitVersion = matches ? parseFloat(matches[1]) : 0;
    }
    return webkitVersion >= 537.10;
};
const detectTablet = () => {
    if (isSSR) {
        return false;
    }
    if (tablet !== undefined) {
        return;
    }
    if (internals.ipad) {
        tablet = true;
        return;
    }
    if (internals.touch) {
        if (isWindows8OrAbove()) {
            tablet = true;
            return;
        }
        if (internals.chrome && internals.android) {
            tablet = !/Mobile Safari\/[.0-9]+/.test(internals.userAgent);
            return;
        }
        let densityFactor = window.devicePixelRatio ? window.devicePixelRatio : 1; // may be undefined in Windows Phone devices
        if (internals.android && isWebkit537OrAbove()) {
            densityFactor = 1;
        }
        tablet = (Math.min(window.screen.width / densityFactor, window.screen.height / densityFactor) >= 600);
        return;
    }
    tablet = (internals.ie && internals.userAgent.indexOf("Touch") !== -1) || (internals.android && !internals.androidPhone);
};
const isSafari = () => internals.safari;
const isChrome = () => internals.chrome;
const isFirefox = () => internals.firefox;
const isTablet = () => {
    detectTablet();
    return (internals.touch || isWindows8OrAbove()) && tablet;
};
const isPhone = () => {
    detectTablet();
    return internals.touch && !tablet;
};
const isDesktop = () => {
    if (isSSR) {
        return false;
    }
    return (!isTablet() && !isPhone()) || isWindows8OrAbove();
};
const isCombi = () => {
    return isTablet() && isDesktop();
};
const isIOS = () => {
    return internals.iOS;
};
const isAndroid = () => {
    return internals.android || internals.androidPhone;
};

const VersionInfo = {
    version: "1.21.0-rc.5",
    major: 1,
    minor: 21,
    patch: 0,
    suffix: "-rc.5",
    isNext: false,
    buildTime: 1704467438,
};

/**
 * Returns a singleton HTML element, inserted in given parent element of HTML page,
 * used mostly to store and share global resources between multiple UI5 Web Components runtimes.
 *
 * @param { string } tag the element tag/selector
 * @param { HTMLElement } parentElement the parent element to insert the singleton element instance
 * @param { Function } createEl a factory function for the element instantiation, by default document.createElement is used
 * @returns { Element }
 */
const getSingletonElementInstance = (tag, parentElement = document.body, createEl) => {
    let el = document.querySelector(tag);
    if (el) {
        return el;
    }
    el = createEl ? createEl() : document.createElement(tag);
    return parentElement.insertBefore(el, parentElement.firstChild);
};

const getMetaDomEl = () => {
    const el = document.createElement("meta");
    el.setAttribute("name", "ui5-shared-resources");
    el.setAttribute("content", ""); // attribute "content" should be present when "name" is set.
    return el;
};
const getSharedResourcesInstance = () => {
    if (typeof document === "undefined") {
        return null;
    }
    return getSingletonElementInstance(`meta[name="ui5-shared-resources"]`, document.head, getMetaDomEl);
};
/**
 * Use this method to initialize/get resources that you would like to be shared among UI5 Web Components runtime instances.
 * The data will be accessed via a singleton "ui5-shared-resources" HTML element in the "body" element of the page.
 *
 * @public
 * @param namespace Unique ID of the resource, may contain "." to denote hierarchy
 * @param initialValue Object or primitive that will be used as an initial value if the resource does not exist
 * @returns {*}
 */
const getSharedResource = (namespace, initialValue) => {
    const parts = namespace.split(".");
    let current = getSharedResourcesInstance();
    if (!current) {
        return initialValue;
    }
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        const lastPart = i === parts.length - 1;
        if (!Object.prototype.hasOwnProperty.call(current, part)) {
            current[part] = lastPart ? initialValue : {};
        }
        current = current[part];
    }
    return current;
};

let currentRuntimeIndex;
let currentRuntimeAlias = "";
const compareCache = new Map();
/**
 * Central registry where all runtimes register themselves by pushing an object.
 * The index in the registry servers as an ID for the runtime.
 * @type {*}
 */
const Runtimes = getSharedResource("Runtimes", []);
/**
 * Registers the current runtime in the shared runtimes resource registry
 */
const registerCurrentRuntime = () => {
    if (currentRuntimeIndex === undefined) {
        currentRuntimeIndex = Runtimes.length;
        const versionInfo = VersionInfo;
        Runtimes.push({
            ...versionInfo,
            alias: currentRuntimeAlias,
            description: `Runtime ${currentRuntimeIndex} - ver ${versionInfo.version}${""}`,
        });
    }
};
/**
 * Returns the index of the current runtime's object in the shared runtimes resource registry
 * @returns {*}
 */
const getCurrentRuntimeIndex = () => {
    return currentRuntimeIndex;
};
/**
 * Compares two runtimes and returns 1 if the first is of a bigger version, -1 if the second is of a bigger version, and 0 if equal
 * @param index1 The index of the first runtime to compare
 * @param index2 The index of the second runtime to compare
 * @returns {number}
 */
const compareRuntimes = (index1, index2) => {
    const cacheIndex = `${index1},${index2}`;
    if (compareCache.has(cacheIndex)) {
        return compareCache.get(cacheIndex);
    }
    const runtime1 = Runtimes[index1];
    const runtime2 = Runtimes[index2];
    if (!runtime1 || !runtime2) {
        throw new Error("Invalid runtime index supplied");
    }
    // If any of the two is a next version, bigger buildTime wins
    if (runtime1.isNext || runtime2.isNext) {
        return runtime1.buildTime - runtime2.buildTime;
    }
    // If major versions differ, bigger one wins
    const majorDiff = runtime1.major - runtime2.major;
    if (majorDiff) {
        return majorDiff;
    }
    // If minor versions differ, bigger one wins
    const minorDiff = runtime1.minor - runtime2.minor;
    if (minorDiff) {
        return minorDiff;
    }
    // If patch versions differ, bigger one wins
    const patchDiff = runtime1.patch - runtime2.patch;
    if (patchDiff) {
        return patchDiff;
    }
    // Bigger suffix wins, f.e. rc10 > rc9
    // Important: suffix is alphanumeric, must use natural compare
    const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });
    const result = collator.compare(runtime1.suffix, runtime2.suffix);
    compareCache.set(cacheIndex, result);
    return result;
};
const getAllRuntimes = () => {
    return Runtimes;
};

const getStyleId = (name, value) => {
    return value ? `${name}|${value}` : name;
};
const shouldUpdate = (runtimeIndex) => {
    if (runtimeIndex === undefined) {
        return true;
    }
    return compareRuntimes(getCurrentRuntimeIndex(), parseInt(runtimeIndex)) === 1; // 1 means the current is newer, 0 means the same, -1 means the resource's runtime is newer
};
const createStyle = (data, name, value = "", theme) => {
    const content = typeof data === "string" ? data : data.content;
    const currentRuntimeIndex = getCurrentRuntimeIndex();
    if (document.adoptedStyleSheets && !isSafari()) {
        const stylesheet = new CSSStyleSheet();
        stylesheet.replaceSync(content);
        stylesheet._ui5StyleId = getStyleId(name, value); // set an id so that we can find the style later
        if (theme) {
            stylesheet._ui5RuntimeIndex = currentRuntimeIndex;
            stylesheet._ui5Theme = theme;
        }
        document.adoptedStyleSheets = [...document.adoptedStyleSheets, stylesheet];
    }
    else {
        const attributes = {};
        attributes[name] = value;
        if (theme) {
            attributes["data-ui5-runtime-index"] = currentRuntimeIndex;
            attributes["data-ui5-theme"] = theme;
        }
        createStyleInHead(content, attributes);
    }
};
const updateStyle = (data, name, value = "", theme) => {
    const content = typeof data === "string" ? data : data.content;
    const currentRuntimeIndex = getCurrentRuntimeIndex();
    if (document.adoptedStyleSheets && !isSafari()) {
        const stylesheet = document.adoptedStyleSheets.find(sh => sh._ui5StyleId === getStyleId(name, value));
        if (!stylesheet) {
            return;
        }
        if (!theme) {
            stylesheet.replaceSync(content || "");
        }
        else {
            const stylesheetRuntimeIndex = stylesheet._ui5RuntimeIndex;
            const stylesheetTheme = stylesheet._ui5Theme;
            if (stylesheetTheme !== theme || shouldUpdate(stylesheetRuntimeIndex)) {
                stylesheet.replaceSync(content || "");
                stylesheet._ui5RuntimeIndex = String(currentRuntimeIndex);
                stylesheet._ui5Theme = theme;
            }
        }
    }
    else {
        const style = document.querySelector(`head>style[${name}="${value}"]`);
        if (!style) {
            return;
        }
        if (!theme) {
            style.textContent = content || "";
        }
        else {
            const styleRuntimeIndex = style.getAttribute("data-ui5-runtime-index") || undefined;
            const styleTheme = style.getAttribute("data-ui5-theme");
            if (styleTheme !== theme || shouldUpdate(styleRuntimeIndex)) {
                style.textContent = content || "";
                style.setAttribute("data-ui5-runtime-index", String(currentRuntimeIndex));
                style.setAttribute("data-ui5-theme", theme);
            }
        }
    }
};
const hasStyle = (name, value = "") => {
    const styleElement = document.querySelector(`head>style[${name}="${value}"]`);
    if (document.adoptedStyleSheets && !isSafari()) {
        return !!styleElement || !!document.adoptedStyleSheets.find(sh => sh._ui5StyleId === getStyleId(name, value));
    }
    return !!styleElement;
};
const removeStyle = (name, value = "") => {
    if (document.adoptedStyleSheets && !isSafari()) {
        document.adoptedStyleSheets = document.adoptedStyleSheets.filter(sh => sh._ui5StyleId !== getStyleId(name, value));
    }
    else {
        const styleElement = document.querySelector(`head > style[${name}="${value}"]`);
        styleElement?.parentElement?.removeChild(styleElement);
    }
};
const createOrUpdateStyle = (data, name, value = "", theme) => {
    if (hasStyle(name, value)) {
        updateStyle(data, name, value, theme);
    }
    else {
        createStyle(data, name, value, theme);
    }
};
const mergeStyles = (style1, style2) => {
    if (style1 === undefined) {
        return style2;
    }
    if (style2 === undefined) {
        return style1;
    }
    const style2Content = typeof style2 === "string" ? style2 : style2.content;
    if (typeof style1 === "string") {
        return `${style1} ${style2Content}`;
    }
    return {
        content: `${style1.content} ${style2Content}`,
        packageName: style1.packageName,
        fileName: style1.fileName,
    };
};

const features = new Map();
const registerFeature = (name, feature) => {
    features.set(name, feature);
};
const getFeature = (name) => {
    return features.get(name);
};

const styleData$z = {
    packageName: "@ui5/webcomponents-base",
    fileName: "FontFace.css",
    content: `@font-face{font-family:"72";font-style:normal;font-weight:400;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Regular.woff2?ui5-webcomponents) format("woff2"),local("72");unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:"72full";font-style:normal;font-weight:400;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Regular-full.woff2?ui5-webcomponents) format("woff2"),local('72-full')}@font-face{font-family:"72";font-style:normal;font-weight:700;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Bold.woff2?ui5-webcomponents) format("woff2"),local('72-Bold');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:"72full";font-style:normal;font-weight:700;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Bold-full.woff2?ui5-webcomponents) format("woff2")}@font-face{font-family:'72-Bold';font-style:normal;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Bold.woff2?ui5-webcomponents) format("woff2"),local('72-Bold');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:'72-Boldfull';font-style:normal;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Bold-full.woff2?ui5-webcomponents) format("woff2")}@font-face{font-family:'72-Light';font-style:normal;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Light.woff2?ui5-webcomponents) format("woff2"),local('72-Light');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:'72-Lightfull';font-style:normal;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Light-full.woff2?ui5-webcomponents) format("woff2")}@font-face{font-family:'72Mono';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72Mono-Regular.woff2?ui5-webcomponents) format('woff2'),local('72Mono');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:'72Monofull';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72Mono-Regular-full.woff2?ui5-webcomponents) format('woff2')}@font-face{font-family:'72Mono-Bold';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72Mono-Bold.woff2?ui5-webcomponents) format('woff2'),local('72Mono-Bold');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:'72Mono-Boldfull';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72Mono-Bold-full.woff2?ui5-webcomponents) format('woff2')}@font-face{font-family:"72Black";font-style:bold;font-weight:900;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Black.woff2?ui5-webcomponents) format("woff2"),local('72Black');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:'72Blackfull';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Black-full.woff2?ui5-webcomponents) format('woff2')}@font-face{font-family:"72-SemiboldDuplex";src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-SemiboldDuplex.woff2?ui5-webcomponents) format("woff2"),local('72-SemiboldDuplex');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}`,
};

const styleData$y = {
    packageName: "@ui5/webcomponents-base",
    fileName: "OverrideFontFace.css",
    content: `@font-face{font-family:'72override';unicode-range:U+0102-0103,U+01A0-01A1,U+01AF-01B0,U+1EA0-1EB7,U+1EB8-1EC7,U+1EC8-1ECB,U+1ECC-1EE3,U+1EE4-1EF1,U+1EF4-1EF7;src:local('Arial'),local('Helvetica'),local('sans-serif')}`,
};

const insertFontFace = () => {
    const openUI5Support = getFeature("OpenUI5Support");
    // Only set the main font if there is no OpenUI5 support, or there is, but OpenUI5 is not loaded
    if (!openUI5Support || !openUI5Support.isOpenUI5Detected()) {
        insertMainFontFace();
    }
    // Always set the override font - OpenUI5 in CSS Vars mode does not set it, unlike the main font
    insertOverrideFontFace();
};
const insertMainFontFace = () => {
    if (!hasStyle("data-ui5-font-face")) {
        createStyle(styleData$z, "data-ui5-font-face");
    }
};
const insertOverrideFontFace = () => {
    if (!hasStyle("data-ui5-font-face-override")) {
        createStyle(styleData$y, "data-ui5-font-face-override");
    }
};

const styleData$x = {
    packageName: "@ui5/webcomponents-base",
    fileName: "SystemCSSVars.css",
    content: `:root{--_ui5_content_density:cozy}.sapUiSizeCompact,.ui5-content-density-compact,[data-ui5-compact-size]{--_ui5_content_density:compact}[dir=rtl]{--_ui5_dir:rtl}[dir=ltr]{--_ui5_dir:ltr}`,
};

const insertSystemCSSVars = () => {
    if (!hasStyle("data-ui5-system-css-vars")) {
        createStyle(styleData$x, "data-ui5-system-css-vars");
    }
};

const assetParameters = { "themes": { "default": "sap_horizon", "all": ["sap_fiori_3", "sap_fiori_3_dark", "sap_belize", "sap_belize_hcb", "sap_belize_hcw", "sap_fiori_3_hcb", "sap_fiori_3_hcw", "sap_horizon", "sap_horizon_dark", "sap_horizon_hcb", "sap_horizon_hcw", "sap_horizon_exp", "sap_horizon_dark_exp", "sap_horizon_hcb_exp", "sap_horizon_hcw_exp"] }, "languages": { "default": "en", "all": ["ar", "bg", "ca", "cnr", "cs", "cy", "da", "de", "el", "en", "en_GB", "en_US_sappsd", "en_US_saprigi", "en_US_saptrc", "es", "es_MX", "et", "fi", "fr", "fr_CA", "hi", "hr", "hu", "in", "it", "iw", "ja", "kk", "ko", "lt", "lv", "mk", "ms", "nl", "no", "pl", "pt_PT", "pt", "ro", "ru", "sh", "sk", "sl", "sr", "sv", "th", "tr", "uk", "vi", "zh_CN", "zh_TW"] }, "locales": { "default": "en", "all": ["ar", "ar_EG", "ar_SA", "bg", "ca", "cs", "da", "de", "de_AT", "de_CH", "el", "el_CY", "en", "en_AU", "en_GB", "en_HK", "en_IE", "en_IN", "en_NZ", "en_PG", "en_SG", "en_ZA", "es", "es_AR", "es_BO", "es_CL", "es_CO", "es_MX", "es_PE", "es_UY", "es_VE", "et", "fa", "fi", "fr", "fr_BE", "fr_CA", "fr_CH", "fr_LU", "he", "hi", "hr", "hu", "id", "it", "it_CH", "ja", "kk", "ko", "lt", "lv", "ms", "nb", "nl", "nl_BE", "pl", "pt", "pt_PT", "ro", "ru", "ru_UA", "sk", "sl", "sr", "sr_Latn", "sv", "th", "tr", "uk", "vi", "zh_CN", "zh_HK", "zh_SG", "zh_TW"] } };
const DEFAULT_THEME = assetParameters.themes.default;
const SUPPORTED_THEMES = assetParameters.themes.all;
const DEFAULT_LANGUAGE = assetParameters.languages.default;
const DEFAULT_LOCALE = assetParameters.locales.default;

const getMetaTagValue = (metaTagName) => {
    const metaTag = document.querySelector(`META[name="${metaTagName}"]`), metaTagContent = metaTag && metaTag.getAttribute("content");
    return metaTagContent;
};
const validateThemeOrigin = (origin) => {
    const allowedOrigins = getMetaTagValue("sap-allowedThemeOrigins");
    return allowedOrigins && allowedOrigins.split(",").some(allowedOrigin => {
        return allowedOrigin === "*" || origin === allowedOrigin.trim();
    });
};
const buildCorrectUrl = (oldUrl, newOrigin) => {
    const oldUrlPath = new URL(oldUrl).pathname;
    return new URL(oldUrlPath, newOrigin).toString();
};
const validateThemeRoot = (themeRoot) => {
    let resultUrl;
    try {
        if (themeRoot.startsWith(".") || themeRoot.startsWith("/")) {
            // Handle relative url
            // new URL("/newExmPath", "http://example.com/exmPath") => http://example.com/newExmPath
            // new URL("./newExmPath", "http://example.com/exmPath") => http://example.com/exmPath/newExmPath
            // new URL("../newExmPath", "http://example.com/exmPath") => http://example.com/newExmPath
            resultUrl = new URL(themeRoot, window.location.href).toString();
        }
        else {
            const themeRootURL = new URL(themeRoot);
            const origin = themeRootURL.origin;
            if (origin && validateThemeOrigin(origin)) {
                // If origin is allowed, use it
                resultUrl = themeRootURL.toString();
            }
            else {
                // If origin is not allow and the URL is not relative, we have to replace the origin
                // with current location
                resultUrl = buildCorrectUrl(themeRootURL.toString(), window.location.href);
            }
        }
        if (!resultUrl.endsWith("/")) {
            resultUrl = `${resultUrl}/`;
        }
        return `${resultUrl}UI5/`;
    }
    catch (e) {
        // Catch if URL is not correct
    }
};

/**
 * Different types of AnimationMode.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.base.types.AnimationMode
 */
var AnimationMode;
(function (AnimationMode) {
    /**
     * @public
     * @type {Full}
     */
    AnimationMode["Full"] = "full";
    /**
     * @public
     * @type {Basic}
     */
    AnimationMode["Basic"] = "basic";
    /**
     * @public
     * @type {Minimal}
     */
    AnimationMode["Minimal"] = "minimal";
    /**
     * @public
     * @type {None}
     */
    AnimationMode["None"] = "none";
})(AnimationMode || (AnimationMode = {}));
var AnimationMode$1 = AnimationMode;

let initialized = false;
let initialConfig = {
    animationMode: AnimationMode$1.Full,
    theme: DEFAULT_THEME,
    themeRoot: undefined,
    rtl: undefined,
    language: undefined,
    timezone: undefined,
    calendarType: undefined,
    secondaryCalendarType: undefined,
    noConflict: false,
    formatSettings: {},
    fetchDefaultLanguage: false,
};
/* General settings */
const getAnimationMode$1 = () => {
    initConfiguration();
    return initialConfig.animationMode;
};
const getTheme$1 = () => {
    initConfiguration();
    return initialConfig.theme;
};
const getThemeRoot$1 = () => {
    initConfiguration();
    return initialConfig.themeRoot;
};
const getRTL$1 = () => {
    initConfiguration();
    return initialConfig.rtl;
};
const getLanguage$1 = () => {
    initConfiguration();
    return initialConfig.language;
};
/**
 * Returns if the default language, that is inlined at build time,
 * should be fetched over the network instead.
 * @returns {Boolean}
 */
const getFetchDefaultLanguage$1 = () => {
    initConfiguration();
    return initialConfig.fetchDefaultLanguage;
};
const getNoConflict$1 = () => {
    initConfiguration();
    return initialConfig.noConflict;
};
const booleanMapping = new Map();
booleanMapping.set("true", true);
booleanMapping.set("false", false);
const parseConfigurationScript = () => {
    const configScript = document.querySelector("[data-ui5-config]") || document.querySelector("[data-id='sap-ui-config']"); // for backward compatibility
    let configJSON;
    if (configScript) {
        try {
            configJSON = JSON.parse(configScript.innerHTML);
        }
        catch (err) {
            console.warn("Incorrect data-sap-ui-config format. Please use JSON"); /* eslint-disable-line */
        }
        if (configJSON) {
            initialConfig = fnMerge(initialConfig, configJSON);
        }
    }
};
const parseURLParameters = () => {
    const params = new URLSearchParams(window.location.search);
    // Process "sap-*" params first
    params.forEach((value, key) => {
        const parts = key.split("sap-").length;
        if (parts === 0 || parts === key.split("sap-ui-").length) {
            return;
        }
        applyURLParam(key, value, "sap");
    });
    // Process "sap-ui-*" params
    params.forEach((value, key) => {
        if (!key.startsWith("sap-ui")) {
            return;
        }
        applyURLParam(key, value, "sap-ui");
    });
};
const normalizeThemeRootParamValue = (value) => {
    const themeRoot = value.split("@")[1];
    return validateThemeRoot(themeRoot);
};
const normalizeThemeParamValue = (param, value) => {
    if (param === "theme" && value.includes("@")) { // the theme parameter might have @<URL-TO-THEME> in the value - strip this
        return value.split("@")[0];
    }
    return value;
};
const applyURLParam = (key, value, paramType) => {
    const lowerCaseValue = value.toLowerCase();
    const param = key.split(`${paramType}-`)[1];
    if (booleanMapping.has(value)) {
        value = booleanMapping.get(lowerCaseValue);
    }
    if (param === "theme") {
        initialConfig.theme = normalizeThemeParamValue(param, value);
        if (value && value.includes("@")) {
            initialConfig.themeRoot = normalizeThemeRootParamValue(value);
        }
    }
    else {
        initialConfig[param] = value;
    }
};
const applyOpenUI5Configuration = () => {
    const openUI5Support = getFeature("OpenUI5Support");
    if (!openUI5Support || !openUI5Support.isOpenUI5Detected()) {
        return;
    }
    const OpenUI5Config = openUI5Support.getConfigurationSettingsObject();
    initialConfig = fnMerge(initialConfig, OpenUI5Config);
};
const initConfiguration = () => {
    if (typeof document === "undefined" || initialized) {
        return;
    }
    // 1. Lowest priority - configuration script
    parseConfigurationScript();
    // 2. URL parameters overwrite configuration script parameters
    parseURLParameters();
    // 3. If OpenUI5 is detected, it has the highest priority
    applyOpenUI5Configuration();
    initialized = true;
};

const MAX_PROCESS_COUNT = 10;
class RenderQueue {
    constructor() {
        this.list = []; // Used to store the web components in order
        this.lookup = new Set(); // Used for faster search
    }
    add(webComponent) {
        if (this.lookup.has(webComponent)) {
            return;
        }
        this.list.push(webComponent);
        this.lookup.add(webComponent);
    }
    remove(webComponent) {
        if (!this.lookup.has(webComponent)) {
            return;
        }
        this.list = this.list.filter(item => item !== webComponent);
        this.lookup.delete(webComponent);
    }
    shift() {
        const webComponent = this.list.shift();
        if (webComponent) {
            this.lookup.delete(webComponent);
            return webComponent;
        }
    }
    isEmpty() {
        return this.list.length === 0;
    }
    isAdded(webComponent) {
        return this.lookup.has(webComponent);
    }
    /**
     * Processes the whole queue by executing the callback on each component,
     * while also imposing restrictions on how many times a component may be processed.
     *
     * @param callback - function with one argument (the web component to be processed)
     */
    process(callback) {
        let webComponent;
        const stats = new Map();
        webComponent = this.shift();
        while (webComponent) {
            const timesProcessed = stats.get(webComponent) || 0;
            if (timesProcessed > MAX_PROCESS_COUNT) {
                throw new Error(`Web component processed too many times this task, max allowed is: ${MAX_PROCESS_COUNT}`);
            }
            callback(webComponent);
            stats.set(webComponent, timesProcessed + 1);
            webComponent = this.shift();
        }
    }
}

const Tags = getSharedResource("Tags", new Map());
const Definitions = new Set();
let Failures = new Map();
let failureTimeout;
const UNKNOWN_RUNTIME = -1;
const registerTag = (tag) => {
    Definitions.add(tag);
    Tags.set(tag, getCurrentRuntimeIndex());
};
const isTagRegistered = (tag) => {
    return Definitions.has(tag);
};
const getAllRegisteredTags = () => {
    return [...Definitions.values()];
};
const recordTagRegistrationFailure = (tag) => {
    let tagRegRuntimeIndex = Tags.get(tag);
    if (tagRegRuntimeIndex === undefined) {
        tagRegRuntimeIndex = UNKNOWN_RUNTIME; // If the tag is taken, but not registered in Tags, then a version before 1.1.0 defined it => use the "unknown" key
    }
    if (!Failures.has(tagRegRuntimeIndex)) {
        Failures.set(tagRegRuntimeIndex, new Set());
    }
    Failures.get(tagRegRuntimeIndex).add(tag);
    if (!failureTimeout) {
        failureTimeout = setTimeout(() => {
            displayFailedRegistrations();
            Failures = new Map();
            failureTimeout = undefined;
        }, 1000);
    }
};
const displayFailedRegistrations = () => {
    const allRuntimes = getAllRuntimes();
    const currentRuntimeIndex = getCurrentRuntimeIndex();
    const currentRuntime = allRuntimes[currentRuntimeIndex];
    let message = `Multiple UI5 Web Components instances detected.`;
    if (allRuntimes.length > 1) {
        message = `${message}\nLoading order (versions before 1.1.0 not listed): ${allRuntimes.map(runtime => `\n${runtime.description}`).join("")}`;
    }
    [...Failures.keys()].forEach(otherRuntimeIndex => {
        let comparison;
        let otherRuntime;
        if (otherRuntimeIndex === UNKNOWN_RUNTIME) { // version < 1.1.0 defined the tag
            comparison = 1; // the current runtime is considered newer
            otherRuntime = {
                description: `Older unknown runtime`,
            };
        }
        else {
            comparison = compareRuntimes(currentRuntimeIndex, otherRuntimeIndex);
            otherRuntime = allRuntimes[otherRuntimeIndex];
        }
        let compareWord;
        if (comparison > 0) {
            compareWord = "an older";
        }
        else if (comparison < 0) {
            compareWord = "a newer";
        }
        else {
            compareWord = "the same";
        }
        message = `${message}\n\n"${currentRuntime.description}" failed to define ${Failures.get(otherRuntimeIndex).size} tag(s) as they were defined by a runtime of ${compareWord} version "${otherRuntime.description}": ${([...Failures.get(otherRuntimeIndex)]).sort().join(", ")}.`;
        if (comparison > 0) {
            message = `${message}\nWARNING! If your code uses features of the above web components, unavailable in ${otherRuntime.description}, it might not work as expected!`;
        }
        else {
            message = `${message}\nSince the above web components were defined by the same or newer version runtime, they should be compatible with your code.`;
        }
    });
    message = `${message}\n\nTo prevent other runtimes from defining tags that you use, consider using scoping or have third-party libraries use scoping: https://github.com/SAP/ui5-webcomponents/blob/main/docs/2-advanced/03-scoping.md.`;
    console.warn(message); // eslint-disable-line
};

const rtlAwareSet = new Set();
const markAsRtlAware = (klass) => {
    rtlAwareSet.add(klass);
};
const isRtlAware = (klass) => {
    return rtlAwareSet.has(klass);
};

const registeredElements$1 = new Set();
const eventProvider$4 = new EventProvider();
const invalidatedWebComponents = new RenderQueue(); // Queue for invalidated web components
let renderTaskPromise, renderTaskPromiseResolve;
let mutationObserverTimer;
let queuePromise;
/**
 * Schedules a render task (if not already scheduled) to render the component
 *
 * @param webComponent
 * @returns {Promise}
 */
const renderDeferred = async (webComponent) => {
    // Enqueue the web component
    invalidatedWebComponents.add(webComponent);
    // Schedule a rendering task
    await scheduleRenderTask();
};
/**
 * Renders a component synchronously and adds it to the registry of rendered components
 *
 * @param webComponent
 */
const renderImmediately = (webComponent) => {
    eventProvider$4.fireEvent("beforeComponentRender", webComponent);
    registeredElements$1.add(webComponent);
    webComponent._render();
};
/**
 * Cancels the rendering of a component, if awaiting to be rendered, and removes it from the registry of rendered components
 *
 * @param webComponent
 */
const cancelRender = (webComponent) => {
    invalidatedWebComponents.remove(webComponent);
    registeredElements$1.delete(webComponent);
};
/**
 * Schedules a rendering task, if not scheduled already
 */
const scheduleRenderTask = async () => {
    if (!queuePromise) {
        queuePromise = new Promise(resolve => {
            window.requestAnimationFrame(() => {
                // Render all components in the queue
                // console.log(`--------------------RENDER TASK START------------------------------`); // eslint-disable-line
                invalidatedWebComponents.process(renderImmediately);
                // console.log(`--------------------RENDER TASK END------------------------------`); // eslint-disable-line
                // Resolve the promise so that callers of renderDeferred can continue
                queuePromise = null;
                resolve();
                // Wait for Mutation observer before the render task is considered finished
                if (!mutationObserverTimer) {
                    mutationObserverTimer = setTimeout(() => {
                        mutationObserverTimer = undefined;
                        if (invalidatedWebComponents.isEmpty()) {
                            _resolveTaskPromise();
                        }
                    }, 200);
                }
            });
        });
    }
    await queuePromise;
};
/**
 * return a promise that will be resolved once all invalidated web components are rendered
 */
const whenDOMUpdated = () => {
    if (renderTaskPromise) {
        return renderTaskPromise;
    }
    renderTaskPromise = new Promise(resolve => {
        renderTaskPromiseResolve = resolve;
        window.requestAnimationFrame(() => {
            if (invalidatedWebComponents.isEmpty()) {
                renderTaskPromise = undefined;
                resolve();
            }
        });
    });
    return renderTaskPromise;
};
const whenAllCustomElementsAreDefined = () => {
    const definedPromises = getAllRegisteredTags().map(tag => customElements.whenDefined(tag));
    return Promise.all(definedPromises);
};
const renderFinished = async () => {
    await whenAllCustomElementsAreDefined();
    await whenDOMUpdated();
};
const _resolveTaskPromise = () => {
    if (!invalidatedWebComponents.isEmpty()) {
        // More updates are pending. Resolve will be called again
        return;
    }
    if (renderTaskPromiseResolve) {
        renderTaskPromiseResolve();
        renderTaskPromiseResolve = undefined;
        renderTaskPromise = undefined;
    }
};
/**
 * Re-renders all UI5 Elements on the page, with the option to specify filters to rerender only some components.
 *
 * Usage:
 * reRenderAllUI5Elements() -> re-renders all components
 * reRenderAllUI5Elements({tag: "ui5-button"}) -> re-renders only instances of ui5-button
 * reRenderAllUI5Elements({rtlAware: true}) -> re-renders only rtlAware components
 * reRenderAllUI5Elements({languageAware: true}) -> re-renders only languageAware components
 * reRenderAllUI5Elements({themeAware: true}) -> re-renders only themeAware components
 * reRenderAllUI5Elements({rtlAware: true, languageAware: true}) -> re-renders components that are rtlAware or languageAware
 * etc...
 *
 * @public
 * @param {object|undefined} filters - Object with keys that can be "rtlAware" or "languageAware"
 * @returns {Promise<void>}
 */
const reRenderAllUI5Elements = async (filters) => {
    registeredElements$1.forEach((element) => {
        const ctor = element.constructor;
        const tag = ctor.getMetadata().getTag();
        const rtlAware = isRtlAware(ctor);
        const languageAware = ctor.getMetadata().isLanguageAware();
        const themeAware = ctor.getMetadata().isThemeAware();
        if (!filters || (filters.tag === tag) || (filters.rtlAware && rtlAware) || (filters.languageAware && languageAware) || (filters.themeAware && themeAware)) {
            renderDeferred(element);
        }
    });
    await renderFinished();
};

const eventProvider$3 = new EventProvider();
const THEME_REGISTERED = "themeRegistered";
const attachThemeRegistered = (listener) => {
    eventProvider$3.attachEvent(THEME_REGISTERED, listener);
};
const fireThemeRegistered = (theme) => {
    return eventProvider$3.fireEvent(THEME_REGISTERED, theme);
};

const themeStyles = new Map();
const loaders$2 = new Map();
const customLoaders = new Map();
const registeredPackages = new Set();
const registeredThemes = new Set();
const registerThemePropertiesLoader = (packageName, themeName, loader) => {
    loaders$2.set(`${packageName}/${themeName}`, loader);
    registeredPackages.add(packageName);
    registeredThemes.add(themeName);
    fireThemeRegistered(themeName);
};
const getThemeProperties = async (packageName, themeName, externalThemeName) => {
    const cacheKey = `${packageName}_${themeName}_${externalThemeName || ""}`;
    const cachedStyleData = themeStyles.get(cacheKey);
    if (cachedStyleData !== undefined) { // it's valid for style to be an empty string
        return cachedStyleData;
    }
    if (!registeredThemes.has(themeName)) {
        const regThemesStr = [...registeredThemes.values()].join(", ");
        console.warn(`You have requested a non-registered theme ${themeName} - falling back to ${DEFAULT_THEME}. Registered themes are: ${regThemesStr}`); /* eslint-disable-line */
        return _getThemeProperties(packageName, DEFAULT_THEME);
    }
    const [style, customStyle] = await Promise.all([
        _getThemeProperties(packageName, themeName),
        externalThemeName ? _getThemeProperties(packageName, externalThemeName, true) : undefined,
    ]);
    const styleData = mergeStyles(style, customStyle);
    if (styleData) {
        themeStyles.set(cacheKey, styleData);
    }
    return styleData;
};
const _getThemeProperties = async (packageName, themeName, forCustomTheme = false) => {
    const loadersMap = forCustomTheme ? customLoaders : loaders$2;
    const loader = loadersMap.get(`${packageName}/${themeName}`);
    if (!loader) {
        // no themes for package
        if (!forCustomTheme) {
            console.error(`Theme [${themeName}] not registered for package [${packageName}]`); /* eslint-disable-line */
        }
        return;
    }
    let data;
    try {
        data = await loader(themeName);
    }
    catch (error) {
        const e = error;
        console.error(packageName, e.message); /* eslint-disable-line */
        return;
    }
    const themeProps = data._ || data; // Refactor: remove _ everywhere
    return themeProps;
};
const getRegisteredPackages = () => {
    return registeredPackages;
};
const isThemeRegistered = (theme) => {
    return registeredThemes.has(theme);
};

const warnings = new Set();
const getThemeMetadata = () => {
    // Check if the class was already applied, most commonly to the link/style tag with the CSS Variables
    let el = document.querySelector(".sapThemeMetaData-Base-baseLib") || document.querySelector(".sapThemeMetaData-UI5-sap-ui-core");
    if (el) {
        return getComputedStyle(el).backgroundImage;
    }
    el = document.createElement("span");
    el.style.display = "none";
    // Try with sapThemeMetaData-Base-baseLib first
    el.classList.add("sapThemeMetaData-Base-baseLib");
    document.body.appendChild(el);
    let metadata = getComputedStyle(el).backgroundImage;
    // Try with sapThemeMetaData-UI5-sap-ui-core only if the previous selector was not found
    if (metadata === "none") {
        el.classList.add("sapThemeMetaData-UI5-sap-ui-core");
        metadata = getComputedStyle(el).backgroundImage;
    }
    document.body.removeChild(el);
    return metadata;
};
const parseThemeMetadata = (metadataString) => {
    const params = /\(["']?data:text\/plain;utf-8,(.*?)['"]?\)$/i.exec(metadataString);
    if (params && params.length >= 2) {
        let paramsString = params[1];
        paramsString = paramsString.replace(/\\"/g, `"`);
        if (paramsString.charAt(0) !== "{" && paramsString.charAt(paramsString.length - 1) !== "}") {
            try {
                paramsString = decodeURIComponent(paramsString);
            }
            catch (ex) {
                if (!warnings.has("decode")) {
                    console.warn("Malformed theme metadata string, unable to decodeURIComponent"); // eslint-disable-line
                    warnings.add("decode");
                }
                return;
            }
        }
        try {
            return JSON.parse(paramsString);
        }
        catch (ex) {
            if (!warnings.has("parse")) {
                console.warn("Malformed theme metadata string, unable to parse JSON"); // eslint-disable-line
                warnings.add("parse");
            }
        }
    }
};
const processThemeMetadata = (metadata) => {
    let themeName;
    let baseThemeName;
    try {
        themeName = metadata.Path.match(/\.([^.]+)\.css_variables$/)[1];
        baseThemeName = metadata.Extends[0];
    }
    catch (ex) {
        if (!warnings.has("object")) {
            console.warn("Malformed theme metadata Object", metadata); // eslint-disable-line
            warnings.add("object");
        }
        return;
    }
    return {
        themeName,
        baseThemeName,
    };
};
const getThemeDesignerTheme = () => {
    const metadataString = getThemeMetadata();
    if (!metadataString || metadataString === "none") {
        return;
    }
    const metadata = parseThemeMetadata(metadataString);
    if (metadata) {
        return processThemeMetadata(metadata);
    }
};

const eventProvider$2 = new EventProvider();
const THEME_LOADED = "themeLoaded";
const fireThemeLoaded = (theme) => {
    return eventProvider$2.fireEvent(THEME_LOADED, theme);
};

let currThemeRoot;
/**
 * Returns the current theme root.
 *
 * @public
 * @since 1.14.0
 * @returns { string } the current theme root
 */
const getThemeRoot = () => {
    if (currThemeRoot === undefined) {
        currThemeRoot = getThemeRoot$1();
    }
    return currThemeRoot;
};
const formatThemeLink = (theme) => {
    return `${getThemeRoot()}Base/baseLib/${theme}/css_variables.css`; // theme root is always set at this point.
};
const attachCustomThemeStylesToHead = async (theme) => {
    const link = document.querySelector(`[sap-ui-webcomponents-theme="${theme}"]`);
    if (link) {
        document.head.removeChild(link);
    }
    await createLinkInHead(formatThemeLink(theme), { "sap-ui-webcomponents-theme": theme });
};

const BASE_THEME_PACKAGE = "@ui5/webcomponents-theming";
const isThemeBaseRegistered = () => {
    const registeredPackages = getRegisteredPackages();
    return registeredPackages.has(BASE_THEME_PACKAGE);
};
const loadThemeBase = async (theme) => {
    if (!isThemeBaseRegistered()) {
        return;
    }
    const cssData = await getThemeProperties(BASE_THEME_PACKAGE, theme);
    if (cssData) {
        createOrUpdateStyle(cssData, "data-ui5-theme-properties", BASE_THEME_PACKAGE, theme);
    }
};
const deleteThemeBase = () => {
    removeStyle("data-ui5-theme-properties", BASE_THEME_PACKAGE);
};
const loadComponentPackages = async (theme, externalThemeName) => {
    const registeredPackages = getRegisteredPackages();
    const packagesStylesPromises = [...registeredPackages].map(async (packageName) => {
        if (packageName === BASE_THEME_PACKAGE) {
            return;
        }
        const cssData = await getThemeProperties(packageName, theme, externalThemeName);
        if (cssData) {
            createOrUpdateStyle(cssData, `data-ui5-component-properties-${getCurrentRuntimeIndex()}`, packageName);
        }
    });
    return Promise.all(packagesStylesPromises);
};
const detectExternalTheme = async (theme) => {
    // If theme designer theme is detected, use this
    const extTheme = getThemeDesignerTheme();
    if (extTheme) {
        return extTheme;
    }
    // If OpenUI5Support is enabled, try to find out if it loaded variables
    const openUI5Support = getFeature("OpenUI5Support");
    if (openUI5Support && openUI5Support.isOpenUI5Detected()) {
        const varsLoaded = openUI5Support.cssVariablesLoaded();
        if (varsLoaded) {
            return {
                themeName: openUI5Support.getConfigurationSettingsObject()?.theme,
                baseThemeName: "", // baseThemeName is only relevant for custom themes
            };
        }
    }
    else if (getThemeRoot()) {
        await attachCustomThemeStylesToHead(theme);
        return getThemeDesignerTheme();
    }
};
const applyTheme = async (theme) => {
    const extTheme = await detectExternalTheme(theme);
    // Only load theme_base properties if there is no externally loaded theme, or there is, but it is not being loaded
    if (!extTheme || theme !== extTheme.themeName) {
        await loadThemeBase(theme);
    }
    else {
        deleteThemeBase();
    }
    // Always load component packages properties. For non-registered themes, try with the base theme, if any
    const packagesTheme = isThemeRegistered(theme) ? theme : extTheme && extTheme.baseThemeName;
    await loadComponentPackages(packagesTheme || DEFAULT_THEME, extTheme && extTheme.themeName === theme ? theme : undefined);
    fireThemeLoaded(theme);
};

let curTheme;
/**
 * Returns the current theme.
 * @public
 * @returns {string} the current theme name
 */
const getTheme = () => {
    if (curTheme === undefined) {
        curTheme = getTheme$1();
    }
    return curTheme;
};
/**
 * Returns if the currently set theme is part of legacy theme families ("sap_belize" or "sap_fiori_3").
 * <b>Note</b>: in addition, the method checks the base theme of a custom theme, built via the ThemeDesigner.
 *
 * @private
 * @returns { boolean }
 */
const isLegacyThemeFamily = () => {
    const currentTheme = getTheme();
    if (!isKnownTheme(currentTheme)) {
        return !getThemeDesignerTheme()?.baseThemeName?.startsWith("sap_horizon");
    }
    return !currentTheme.startsWith("sap_horizon");
};
const isKnownTheme = (theme) => SUPPORTED_THEMES.includes(theme);

let booted = false;
let bootPromise;
const eventProvider$1 = new EventProvider();
const boot = async () => {
    if (bootPromise !== undefined) {
        return bootPromise;
    }
    const bootExecutor = async (resolve) => {
        if (typeof document === "undefined") {
            resolve();
            return;
        }
        attachThemeRegistered(onThemeRegistered);
        registerCurrentRuntime();
        const openUI5Support = getFeature("OpenUI5Support");
        const isOpenUI5Loaded = openUI5Support ? openUI5Support.isOpenUI5Detected() : false;
        const f6Navigation = getFeature("F6Navigation");
        if (openUI5Support) {
            await openUI5Support.init();
        }
        if (f6Navigation && !isOpenUI5Loaded) {
            f6Navigation.init();
        }
        await whenDOMReady();
        await applyTheme(getTheme());
        openUI5Support && openUI5Support.attachListeners();
        insertFontFace();
        insertSystemCSSVars();
        resolve();
        booted = true;
        await eventProvider$1.fireEventAsync("boot");
    };
    bootPromise = new Promise(bootExecutor);
    return bootPromise;
};
/**
 * Callback, executed after theme properties registration
 * to apply the newly registered theme.
 * @private
 * @param { string } theme
 */
const onThemeRegistered = (theme) => {
    const currentTheme = getTheme();
    if (booted && theme === currentTheme) {
        applyTheme(currentTheme);
    }
};

const kebabToCamelMap = new Map();
const camelToKebabMap = new Map();
const kebabToCamelCase = (string) => {
    if (!kebabToCamelMap.has(string)) {
        const result = toCamelCase(string.split("-"));
        kebabToCamelMap.set(string, result);
    }
    return kebabToCamelMap.get(string);
};
const camelToKebabCase = (string) => {
    if (!camelToKebabMap.has(string)) {
        const result = string.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
        camelToKebabMap.set(string, result);
    }
    return camelToKebabMap.get(string);
};
const toCamelCase = (parts) => {
    return parts.map((string, index) => {
        return index === 0 ? string.toLowerCase() : string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }).join("");
};

/**
 * Determines the slot to which a node should be assigned
 * @param node Text node or HTML element
 * @returns {string}
 */
const getSlotName = (node) => {
    // Text nodes can only go to the default slot
    if (!(node instanceof HTMLElement)) {
        return "default";
    }
    // Discover the slot based on the real slot name (f.e. footer => footer, or content-32 => content)
    const slot = node.getAttribute("slot");
    if (slot) {
        const match = slot.match(/^(.+?)-\d+$/);
        return match ? match[1] : slot;
    }
    // Use default slot as a fallback
    return "default";
};
const getSlottedNodes = (node) => {
    if (node instanceof HTMLSlotElement) {
        return node.assignedNodes({ flatten: true }).filter(item => item instanceof HTMLElement);
    }
    return [node];
};
const getSlottedNodesList = (nodeList) => {
    return nodeList.reduce((acc, curr) => acc.concat(getSlottedNodes(curr)), []);
};

let suf;
let rulesObj = {
    include: [/^ui5-/],
    exclude: [],
};
const tagsCache = new Map(); // true/false means the tag should/should not be cached, undefined means not known yet.
/**
 * Returns the currently set scoping suffix, or undefined if not set.
 *
 * @public
 * @returns {String|undefined}
 */
const getCustomElementsScopingSuffix = () => {
    return suf;
};
/**
 * Determines whether custom elements with the given tag should be scoped or not.
 * The tag is first matched against the "include" rules and then against the "exclude" rules and the
 * result is cached until new rules are set.
 *
 * @public
 * @param tag
 */
const shouldScopeCustomElement = (tag) => {
    if (!tagsCache.has(tag)) {
        const result = rulesObj.include.some(rule => tag.match(rule)) && !rulesObj.exclude.some(rule => tag.match(rule));
        tagsCache.set(tag, result);
    }
    return tagsCache.get(tag);
};
/**
 * Returns the currently set scoping suffix, if any and if the tag should be scoped, or undefined otherwise.
 *
 * @public
 * @param tag
 * @returns {String}
 */
const getEffectiveScopingSuffixForTag = (tag) => {
    if (shouldScopeCustomElement(tag)) {
        return getCustomElementsScopingSuffix();
    }
};
/**
 * @public
 * Used for getting a scoped name for a CSS variable using the same transformation used in the build
 * @name the name of the css variable as written in the code
 * @returns a variable name with the current version inserted as available at runtime
 */
const getScopedVarName = (name) => {
    const versionStr = `v${VersionInfo.version.replaceAll(".", "-")}`;
    const expr = /(--_?ui5)([^,:)\s]+)/g;
    return name.replaceAll(expr, `$1-${versionStr}$2`);
};

/**
 *
 * @class
 * @public
 */
class UI5ElementMetadata {
    constructor(metadata) {
        this.metadata = metadata;
    }
    getInitialState() {
        if (Object.prototype.hasOwnProperty.call(this, "_initialState")) {
            return this._initialState;
        }
        const initialState = {};
        const slotsAreManaged = this.slotsAreManaged();
        // Initialize properties
        const props = this.getProperties();
        for (const propName in props) { // eslint-disable-line
            const propType = props[propName].type;
            const propDefaultValue = props[propName].defaultValue;
            if (propType === Boolean) {
                initialState[propName] = false;
                if (propDefaultValue !== undefined) {
                    console.warn("The 'defaultValue' metadata key is ignored for all booleans properties, they would be initialized with 'false' by default"); // eslint-disable-line
                }
            }
            else if (props[propName].multiple) {
                initialState[propName] = [];
            }
            else if (propType === Object) {
                initialState[propName] = "defaultValue" in props[propName] ? props[propName].defaultValue : {};
            }
            else if (propType === String) {
                initialState[propName] = "defaultValue" in props[propName] ? props[propName].defaultValue : "";
            }
            else {
                initialState[propName] = propDefaultValue;
            }
        }
        // Initialize slots
        if (slotsAreManaged) {
            const slots = this.getSlots();
            for (const [slotName, slotData] of Object.entries(slots)) { // eslint-disable-line
                const propertyName = slotData.propertyName || slotName;
                initialState[propertyName] = [];
            }
        }
        this._initialState = initialState;
        return initialState;
    }
    /**
     * Validates the property's value and returns it if correct
     * or returns the default value if not.
     * <b>Note:</b> Only intended for use by UI5Element.js
     * @public
     */
    static validatePropertyValue(value, propData) {
        const isMultiple = propData.multiple;
        if (isMultiple && value) {
            return value.map((propValue) => validateSingleProperty(propValue, propData));
        }
        return validateSingleProperty(value, propData);
    }
    /**
     * Validates the slot's value and returns it if correct
     * or throws an exception if not.
     * <b>Note:</b> Only intended for use by UI5Element.js
     * @pubic
     */
    static validateSlotValue(value, slotData) {
        return validateSingleSlot(value, slotData);
    }
    /**
     * Returns the tag of the UI5 Element without the scope
     * @public
     */
    getPureTag() {
        return this.metadata.tag || "";
    }
    /**
     * Returns the tag of the UI5 Element
     * @public
     */
    getTag() {
        const pureTag = this.metadata.tag;
        if (!pureTag) {
            return "";
        }
        const suffix = getEffectiveScopingSuffixForTag(pureTag);
        if (!suffix) {
            return pureTag;
        }
        return `${pureTag}-${suffix}`;
    }
    /**
     * Determines whether a property should have an attribute counterpart
     * @public
     * @param propName
     * @returns {boolean}
     */
    hasAttribute(propName) {
        const propData = this.getProperties()[propName];
        return propData.type !== Object && !propData.noAttribute && !propData.multiple;
    }
    /**
     * Returns an array with the properties of the UI5 Element (in camelCase)
     * @public
     * @returns {string[]}
     */
    getPropertiesList() {
        return Object.keys(this.getProperties());
    }
    /**
     * Returns an array with the attributes of the UI5 Element (in kebab-case)
     * @public
     * @returns {string[]}
     */
    getAttributesList() {
        return this.getPropertiesList().filter(this.hasAttribute.bind(this)).map(camelToKebabCase);
    }
    /**
     * Determines whether this UI5 Element has a default slot of type Node, therefore can slot text
     * @returns {boolean}
     */
    canSlotText() {
        return (this.getSlots().default)?.type === Node;
    }
    /**
     * Determines whether this UI5 Element supports any slots
     * @public
     */
    hasSlots() {
        return !!Object.entries(this.getSlots()).length;
    }
    /**
     * Determines whether this UI5 Element supports any slots with "individualSlots: true"
     * @public
     */
    hasIndividualSlots() {
        return this.slotsAreManaged() && Object.values(this.getSlots()).some(slotData => slotData.individualSlots);
    }
    /**
     * Determines whether this UI5 Element needs to invalidate if children are added/removed/changed
     * @public
     */
    slotsAreManaged() {
        return !!this.metadata.managedSlots;
    }
    /**
     * Determines whether this control supports F6 fast navigation
     * @public
     */
    supportsF6FastNavigation() {
        return !!this.metadata.fastNavigation;
    }
    /**
     * Returns an object with key-value pairs of properties and their metadata definitions
     * @public
     */
    getProperties() {
        if (!this.metadata.properties) {
            this.metadata.properties = {};
        }
        return this.metadata.properties;
    }
    /**
     * Returns an object with key-value pairs of events and their metadata definitions
     * @public
     */
    getEvents() {
        if (!this.metadata.events) {
            this.metadata.events = {};
        }
        return this.metadata.events;
    }
    /**
     * Returns an object with key-value pairs of slots and their metadata definitions
     * @public
     */
    getSlots() {
        if (!this.metadata.slots) {
            this.metadata.slots = {};
        }
        return this.metadata.slots;
    }
    /**
     * Determines whether this UI5 Element has any translatable texts (needs to be invalidated upon language change)
     * @returns {boolean}
     */
    isLanguageAware() {
        return !!this.metadata.languageAware;
    }
    /**
     * Determines whether this UI5 Element has any theme dependant carachteristics.
     * @returns {boolean}
     */
    isThemeAware() {
        return !!this.metadata.themeAware;
    }
    /**
     * Matches a changed entity (property/slot) with the given name against the "invalidateOnChildChange" configuration
     * and determines whether this should cause and invalidation
     *
     * @param slotName the name of the slot in which a child was changed
     * @param type the type of change in the child: "property" or "slot"
     * @param name the name of the property/slot that changed
     * @returns {boolean}
     */
    shouldInvalidateOnChildChange(slotName, type, name) {
        const config = this.getSlots()[slotName].invalidateOnChildChange;
        // invalidateOnChildChange was not set in the slot metadata - by default child changes do not affect the component
        if (config === undefined) {
            return false;
        }
        // The simple format was used: invalidateOnChildChange: true/false;
        if (typeof config === "boolean") {
            return config;
        }
        // The complex format was used: invalidateOnChildChange: { properties, slots }
        if (typeof config === "object") {
            // A property was changed
            if (type === "property") {
                // The config object does not have a properties field
                if (config.properties === undefined) {
                    return false;
                }
                // The config object has the short format: properties: true/false
                if (typeof config.properties === "boolean") {
                    return config.properties;
                }
                // The config object has the complex format: properties: [...]
                if (Array.isArray(config.properties)) {
                    return config.properties.includes(name);
                }
                throw new Error("Wrong format for invalidateOnChildChange.properties: boolean or array is expected");
            }
            // A slot was changed
            if (type === "slot") {
                // The config object does not have a slots field
                if (config.slots === undefined) {
                    return false;
                }
                // The config object has the short format: slots: true/false
                if (typeof config.slots === "boolean") {
                    return config.slots;
                }
                // The config object has the complex format: slots: [...]
                if (Array.isArray(config.slots)) {
                    return config.slots.includes(name);
                }
                throw new Error("Wrong format for invalidateOnChildChange.slots: boolean or array is expected");
            }
        }
        throw new Error("Wrong format for invalidateOnChildChange: boolean or object is expected");
    }
}
const validateSingleProperty = (value, propData) => {
    const propertyType = propData.type;
    let propertyValidator = propData.validator;
    if (propertyType && propertyType.isDataTypeClass) {
        propertyValidator = propertyType;
    }
    if (propertyValidator) {
        return propertyValidator.isValid(value) ? value : propData.defaultValue;
    }
    if (!propertyType || propertyType === String) {
        // eslint-disable-next-line @typescript-eslint/no-base-to-string -- if an object is passed as a value to a string property, this was an error so displaying [object Object] will indicate the issue to the developer
        return (typeof value === "string" || typeof value === "undefined" || value === null) ? value : value.toString();
    }
    if (propertyType === Boolean) {
        return typeof value === "boolean" ? value : false;
    }
    if (propertyType === Object) {
        return typeof value === "object" ? value : propData.defaultValue;
    }
    // Check if "value" is part of the enum (propertyType) values and return the defaultValue if not found.
    return value in propertyType ? value : propData.defaultValue;
};
const validateSingleSlot = (value, slotData) => {
    value && getSlottedNodes(value).forEach(el => {
        if (!(el instanceof slotData.type)) {
            throw new Error(`The element is not of type ${slotData.type.toString()}`);
        }
    });
    return value;
};

class StaticArea extends HTMLElement {
}
if (!customElements.get("ui5-static-area")) {
    customElements.define("ui5-static-area", StaticArea);
}

const getEventProvider = () => getSharedResource("CustomStyle.eventProvider", new EventProvider());
const CUSTOM_CSS_CHANGE = "CustomCSSChange";
const attachCustomCSSChange = (listener) => {
    getEventProvider().attachEvent(CUSTOM_CSS_CHANGE, listener);
};
const getCustomCSSFor = () => getSharedResource("CustomStyle.customCSSFor", {});
attachCustomCSSChange((tag) => {
    {
        reRenderAllUI5Elements({ tag });
    }
});
const getCustomCSS = (tag) => {
    const customCSSFor = getCustomCSSFor();
    return customCSSFor[tag] ? customCSSFor[tag].join("") : "";
};

const MAX_DEPTH_INHERITED_CLASSES = 10; // TypeScript complains about Infinity and big numbers
const getStylesString = (styles) => {
    if (Array.isArray(styles)) {
        return styles.filter(style => !!style).flat(MAX_DEPTH_INHERITED_CLASSES).map((style) => {
            return typeof style === "string" ? style : style.content;
        }).join(" ");
    }
    return typeof styles === "string" ? styles : styles.content;
};

const effectiveStyleMap = new Map();
attachCustomCSSChange((tag) => {
    effectiveStyleMap.delete(`${tag}_normal`); // there is custom CSS only for the component itself, not for its static area part
});
const getEffectiveStyle = (ElementClass, forStaticArea = false) => {
    const tag = ElementClass.getMetadata().getTag();
    const key = `${tag}_${forStaticArea ? "static" : "normal"}`;
    const openUI5Enablement = getFeature("OpenUI5Enablement");
    if (!effectiveStyleMap.has(key)) {
        let effectiveStyle;
        let busyIndicatorStyles = "";
        if (openUI5Enablement) {
            busyIndicatorStyles = getStylesString(openUI5Enablement.getBusyIndicatorStyles());
        }
        if (forStaticArea) {
            effectiveStyle = getStylesString(ElementClass.staticAreaStyles);
        }
        else {
            const customStyle = getCustomCSS(tag) || "";
            const builtInStyles = getStylesString(ElementClass.styles);
            effectiveStyle = `${builtInStyles} ${customStyle}`;
        }
        effectiveStyle = `${effectiveStyle} ${busyIndicatorStyles}`;
        effectiveStyleMap.set(key, effectiveStyle);
    }
    return effectiveStyleMap.get(key); // The key is guaranteed to exist
};

const constructableStyleMap = new Map();
attachCustomCSSChange((tag) => {
    constructableStyleMap.delete(`${tag}_normal`); // there is custom CSS only for the component itself, not for its static area part
});
/**
 * Returns (and caches) a constructable style sheet for a web component class
 * Note: Chrome
 * @param ElementClass
 * @returns {*}
 */
const getConstructableStyle = (ElementClass, forStaticArea = false) => {
    const tag = ElementClass.getMetadata().getTag();
    const key = `${tag}_${forStaticArea ? "static" : "normal"}`;
    if (!constructableStyleMap.has(key)) {
        const styleContent = getEffectiveStyle(ElementClass, forStaticArea);
        const style = new CSSStyleSheet();
        style.replaceSync(styleContent);
        constructableStyleMap.set(key, [style]);
    }
    return constructableStyleMap.get(key);
};

/**
 * Updates the shadow root of a UI5Element or its static area item
 * @param element
 * @param forStaticArea
 */
const updateShadowRoot = (element, forStaticArea = false) => {
    let styleStrOrHrefsArr;
    const ctor = element.constructor;
    const shadowRoot = forStaticArea ? element.staticAreaItem.shadowRoot : element.shadowRoot;
    let renderResult;
    if (forStaticArea) {
        renderResult = element.renderStatic(); // this is checked before calling updateShadowRoot
    }
    else {
        renderResult = element.render(); // this is checked before calling updateShadowRoot
    }
    if (!shadowRoot) {
        console.warn(`There is no shadow root to update`); // eslint-disable-line
        return;
    }
    if (document.adoptedStyleSheets && !isSafari()) { // Chrome
        shadowRoot.adoptedStyleSheets = getConstructableStyle(ctor, forStaticArea);
    }
    else { // FF, Safari
        styleStrOrHrefsArr = getEffectiveStyle(ctor, forStaticArea);
    }
    if (ctor.renderer) {
        ctor.renderer(renderResult, shadowRoot, styleStrOrHrefsArr, forStaticArea, { host: element });
        return;
    }
    ctor.render(renderResult, shadowRoot, styleStrOrHrefsArr, forStaticArea, { host: element });
};

const GLOBAL_CONTENT_DENSITY_CSS_VAR = "--_ui5_content_density";
const getEffectiveContentDensity = (el) => getComputedStyle(el).getPropertyValue(GLOBAL_CONTENT_DENSITY_CSS_VAR);

const eventProvider = new EventProvider();
const LANG_CHANGE = "languageChange";
const attachLanguageChange = (listener) => {
    eventProvider.attachEvent(LANG_CHANGE, listener);
};

let curLanguage;
let fetchDefaultLanguage;
/**
 * Returns the currently configured language, or the browser language as a fallback.
 * @public
 * @returns {string}
 */
const getLanguage = () => {
    if (curLanguage === undefined) {
        curLanguage = getLanguage$1();
    }
    return curLanguage;
};
/**
 * Defines if the default language, that is inlined, should be
 * fetched over the network instead of using the inlined one.
 * <b>Note:</b> By default the language will not be fetched.
 *
 * @public
 * @param {boolean} fetchDefaultLang
 */
const setFetchDefaultLanguage = (fetchDefaultLang) => {
    fetchDefaultLanguage = fetchDefaultLang;
};
/**
 * Returns if the default language, that is inlined, should be fetched over the network.
 * @public
 * @returns {boolean}
 */
const getFetchDefaultLanguage = () => {
    if (fetchDefaultLanguage === undefined) {
        setFetchDefaultLanguage(getFetchDefaultLanguage$1());
    }
    return fetchDefaultLanguage;
};

var getDesigntimePropertyAsArray = (value) => {
    const m = /\$([-a-z0-9A-Z._]+)(?::([^$]*))?\$/.exec(value);
    return m && m[2] ? m[2].split(/,/) : null;
};

var detectNavigatorLanguage = () => {
    const browserLanguages = navigator.languages;
    const navigatorLanguage = () => {
        return navigator.language;
    };
    const rawLocale = (browserLanguages && browserLanguages[0]) || navigatorLanguage();
    return rawLocale || DEFAULT_LANGUAGE;
};

const M_ISO639_OLD_TO_NEW = {
    "iw": "he",
    "ji": "yi",
    "in": "id",
    "sh": "sr",
};
const A_RTL_LOCALES = getDesigntimePropertyAsArray("$cldr-rtl-locales:ar,fa,he$") || [];
/**
 * Checks whether the language is using RTL
 * @param {string} language
 * @returns {boolean} whether the language is using RTL
 */
const impliesRTL = (language) => {
    language = (language && M_ISO639_OLD_TO_NEW[language]) || language;
    return A_RTL_LOCALES.indexOf(language) >= 0;
};
/**
 * Gets the effective RTL setting by first checking the configuration
 * and if not set using the currently set language or the navigator language if the language is not explicitly set.
 * @returns {boolean} whether RTL should be used
 */
const getRTL = () => {
    if (typeof document === "undefined") {
        return false;
    }
    const configurationRTL = getRTL$1();
    if (configurationRTL !== undefined) {
        return !!configurationRTL;
    }
    return impliesRTL(getLanguage() || detectNavigatorLanguage());
};

const GLOBAL_DIR_CSS_VAR = "--_ui5_dir";
const getEffectiveDir = (element) => {
    const doc = window.document;
    const dirValues = ["ltr", "rtl"]; // exclude "auto" and "" from all calculations
    const locallyAppliedDir = getComputedStyle(element).getPropertyValue(GLOBAL_DIR_CSS_VAR);
    // In that order, inspect the CSS Var (for modern browsers), the element itself, html and body (for IE fallback)
    if (dirValues.includes(locallyAppliedDir)) {
        return locallyAppliedDir;
    }
    if (dirValues.includes(element.dir)) {
        return element.dir;
    }
    if (dirValues.includes(doc.documentElement.dir)) {
        return doc.documentElement.dir;
    }
    if (dirValues.includes(doc.body.dir)) {
        return doc.body.dir;
    }
    // Finally, check the configuration for explicitly set RTL or language-implied RTL
    return getRTL() ? "rtl" : undefined;
};

const pureTagName = "ui5-static-area-item";
const popupIntegrationAttr = "data-sap-ui-integration-popup-content";
/**
 *
 * @class
 * @author SAP SE
 * @private
 */
class StaticAreaItem extends HTMLElement {
    constructor() {
        super();
        this._rendered = false;
        this.attachShadow({ mode: "open" });
    }
    /**
     * @param {UI5Element} ownerElement the UI5Element instance that owns this static area item
     */
    setOwnerElement(ownerElement) {
        this.ownerElement = ownerElement;
        this.classList.add(this.ownerElement._id); // used for getting the popover in the tests
        if (this.ownerElement.hasAttribute("data-ui5-static-stable")) {
            this.setAttribute("data-ui5-stable", this.ownerElement.getAttribute("data-ui5-static-stable")); // stable selector
        }
    }
    /**
     * Updates the shadow root of the static area item with the latest state, if rendered
     */
    update() {
        if (this._rendered) {
            this.updateAdditionalProperties();
            updateShadowRoot(this.ownerElement, true);
        }
    }
    updateAdditionalProperties() {
        this._updateAdditionalAttrs();
        this._updateContentDensity();
        this._updateDirection();
    }
    /**
     * Sets the correct content density based on the owner element's state
     * @private
     */
    _updateContentDensity() {
        if (getEffectiveContentDensity(this.ownerElement) === "compact") {
            this.classList.add("sapUiSizeCompact");
            this.classList.add("ui5-content-density-compact");
        }
        else {
            this.classList.remove("sapUiSizeCompact");
            this.classList.remove("ui5-content-density-compact");
        }
    }
    _updateDirection() {
        if (this.ownerElement) {
            const dir = getEffectiveDir(this.ownerElement);
            if (dir) {
                this.setAttribute("dir", dir);
            }
            else {
                this.removeAttribute("dir");
            }
        }
    }
    _updateAdditionalAttrs() {
        this.setAttribute(pureTagName, "");
        this.setAttribute(popupIntegrationAttr, "");
    }
    /**
     * @protected
     * Returns reference to the DOM element where the current fragment is added.
     */
    async getDomRef() {
        this.updateAdditionalProperties();
        if (!this._rendered) {
            this._rendered = true;
            updateShadowRoot(this.ownerElement, true);
        }
        await renderFinished(); // Wait for the content of the ui5-static-area-item to be rendered
        return this.shadowRoot;
    }
    static getTag() {
        const suffix = getEffectiveScopingSuffixForTag(pureTagName);
        if (!suffix) {
            return pureTagName;
        }
        return `${pureTagName}-${suffix}`;
    }
    static createInstance() {
        if (!customElements.get(StaticAreaItem.getTag())) {
            customElements.define(StaticAreaItem.getTag(), StaticAreaItem);
        }
        return document.createElement(this.getTag());
    }
}

/**
 * The tag prefixes to be ignored.
 */
const tagPrefixes = [];
/**
 * Determines whether custom elements with the given tag should be ignored.
 *
 * @private
 * @param { string } tag
 */
const shouldIgnoreCustomElement = (tag) => {
    return tagPrefixes.some(pref => tag.startsWith(pref));
};

const observers = new WeakMap();
/**
 * @param node
 * @param callback
 * @param options
 */
const observeDOMNode = (node, callback, options) => {
    const observer = new MutationObserver(callback);
    observers.set(node, observer);
    observer.observe(node, options);
};
/**
 * @param node
 */
const unobserveDOMNode = (node) => {
    const observer = observers.get(node);
    if (observer) {
        observer.disconnect();
        observers.delete(node);
    }
};

// Fire these events even with noConflict: true
const excludeList = [
    "value-changed",
    "click",
];
let noConflict;
const shouldFireOriginalEvent = (eventName) => {
    return excludeList.includes(eventName);
};
const shouldNotFireOriginalEvent = (eventName) => {
    const nc = getNoConflict();
    // return !(nc.events && nc.events.includes && nc.events.includes(eventName));
    return !(typeof nc !== "boolean" && nc.events && nc.events.includes && nc.events.includes(eventName));
};
/**
 * Returns if the "noConflict" configuration is set.
 * @public
 * @returns { NoConflictData }
 */
const getNoConflict = () => {
    if (noConflict === undefined) {
        noConflict = getNoConflict$1();
    }
    return noConflict;
};
const skipOriginalEvent = (eventName) => {
    const nc = getNoConflict();
    // Always fire these events
    if (shouldFireOriginalEvent(eventName)) {
        return false;
    }
    // Read from the configuration
    if (nc === true) {
        return true;
    }
    return !shouldNotFireOriginalEvent(eventName);
};

// Note: disabled is present in IE so we explicitly allow it here.
// Others, such as title/hidden, we explicitly override, so valid too
const allowList = [
    "disabled",
    "title",
    "hidden",
    "role",
    "draggable",
];
/**
 * Checks whether a property name is valid (does not collide with existing DOM API properties)
 *
 * @param name
 * @returns {boolean}
 */
const isValidPropertyName = (name) => {
    if (allowList.includes(name) || name.startsWith("aria")) {
        return true;
    }
    const classes = [
        HTMLElement,
        Element,
        Node,
    ];
    return !classes.some(klass => klass.prototype.hasOwnProperty(name)); // eslint-disable-line
};

const arraysAreEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
};

/**
 * Runs a component's template with the component's current state, while also scoping HTML
 *
 * @param template - the template to execute
 * @param component - the component
 * @public
 */
const executeTemplate = (template, component) => {
    const tagsToScope = getTagsToScope(component);
    const scope = getCustomElementsScopingSuffix();
    return template.call(component, component, tagsToScope, scope);
};
/**
 * Returns all tags, used inside component's template subject to scoping.
 * @param component - the component
 * @returns {Array[]}
 * @private
 */
const getTagsToScope = (component) => {
    const ctor = component.constructor;
    const componentTag = ctor.getMetadata().getPureTag();
    const tagsToScope = ctor.getUniqueDependencies().map((dep) => dep.getMetadata().getPureTag()).filter(shouldScopeCustomElement);
    if (shouldScopeCustomElement(componentTag)) {
        tagsToScope.push(componentTag);
    }
    return tagsToScope;
};

let autoId = 0;
const elementTimeouts = new Map();
const uniqueDependenciesCache = new Map();
/**
 * Triggers re-rendering of a UI5Element instance due to state change.
 * @param {ChangeInfo} changeInfo An object with information about the change that caused invalidation.
 * @private
 */
function _invalidate(changeInfo) {
    // Invalidation should be suppressed: 1) before the component is rendered for the first time 2) and during the execution of onBeforeRendering
    // This is necessary not only as an optimization, but also to avoid infinite loops on invalidation between children and parents (when invalidateOnChildChange is used)
    if (this._suppressInvalidation) {
        return;
    }
    // Call the onInvalidation hook
    this.onInvalidation(changeInfo);
    this._changedState.push(changeInfo);
    renderDeferred(this);
    this._invalidationEventProvider.fireEvent("invalidate", { ...changeInfo, target: this });
}
/**
 * Base class for all UI5 Web Components
 *
 * @class
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.base.UI5Element
 * @extends HTMLElement
 * @public
 */
class UI5Element extends HTMLElement {
    constructor() {
        super();
        const ctor = this.constructor;
        this._changedState = []; // Filled on each invalidation, cleared on re-render (used for debugging)
        this._suppressInvalidation = true; // A flag telling whether all invalidations should be ignored. Initialized with "true" because a UI5Element can not be invalidated until it is rendered for the first time
        this._inDOM = false; // A flag telling whether the UI5Element is currently in the DOM tree of the document or not
        this._fullyConnected = false; // A flag telling whether the UI5Element's onEnterDOM hook was called (since it's possible to have the element removed from DOM before that)
        this._childChangeListeners = new Map(); // used to store lazy listeners per slot for the child change event of every child inside that slot
        this._slotChangeListeners = new Map(); // used to store lazy listeners per slot for the slotchange event of all slot children inside that slot
        this._invalidationEventProvider = new EventProvider(); // used by parent components for listening to changes to child components
        this._componentStateFinalizedEventProvider = new EventProvider(); // used by friend classes for synchronization
        let deferredResolve;
        this._domRefReadyPromise = new Promise(resolve => {
            deferredResolve = resolve;
        });
        this._domRefReadyPromise._deferredResolve = deferredResolve;
        this._doNotSyncAttributes = new Set(); // attributes that are excluded from attributeChangedCallback synchronization
        this._state = { ...ctor.getMetadata().getInitialState() };
        this._upgradeAllProperties();
        if (ctor._needsShadowDOM()) {
            this.attachShadow({ mode: "open" });
        }
    }
    /**
     * Returns a unique ID for this UI5 Element
     *
     * @deprecated - This property is not guaranteed in future releases
     * @protected
     */
    get _id() {
        if (!this.__id) {
            this.__id = `ui5wc_${++autoId}`;
        }
        return this.__id;
    }
    render() {
        const template = this.constructor.template;
        return executeTemplate(template, this);
    }
    renderStatic() {
        const template = this.constructor.staticAreaTemplate;
        return executeTemplate(template, this);
    }
    /**
     * Do not call this method from derivatives of UI5Element, use "onEnterDOM" only
     * @private
     */
    async connectedCallback() {
        const ctor = this.constructor;
        this.setAttribute(ctor.getMetadata().getPureTag(), "");
        if (ctor.getMetadata().supportsF6FastNavigation()) {
            this.setAttribute("data-sap-ui-fastnavgroup", "true");
        }
        const slotsAreManaged = ctor.getMetadata().slotsAreManaged();
        this._inDOM = true;
        if (slotsAreManaged) {
            // always register the observer before yielding control to the main thread (await)
            this._startObservingDOMChildren();
            await this._processChildren();
        }
        if (!this._inDOM) { // Component removed from DOM while _processChildren was running
            return;
        }
        renderImmediately(this);
        this._domRefReadyPromise._deferredResolve();
        this._fullyConnected = true;
        this.onEnterDOM();
    }
    /**
     * Do not call this method from derivatives of UI5Element, use "onExitDOM" only
     * @private
     */
    disconnectedCallback() {
        const ctor = this.constructor;
        const slotsAreManaged = ctor.getMetadata().slotsAreManaged();
        this._inDOM = false;
        if (slotsAreManaged) {
            this._stopObservingDOMChildren();
        }
        if (this._fullyConnected) {
            this.onExitDOM();
            this._fullyConnected = false;
        }
        if (this.staticAreaItem && this.staticAreaItem.parentElement) {
            this.staticAreaItem.parentElement.removeChild(this.staticAreaItem);
        }
        cancelRender(this);
    }
    /**
     * Called every time before the component renders.
     * @public
     */
    onBeforeRendering() { }
    /**
     * Called every time after the component renders.
     * @public
     */
    onAfterRendering() { }
    /**
     * Called on connectedCallback - added to the DOM.
     * @public
     */
    onEnterDOM() { }
    /**
     * Called on disconnectedCallback - removed from the DOM.
     * @public
     */
    onExitDOM() { }
    /**
     * @private
     */
    _startObservingDOMChildren() {
        const ctor = this.constructor;
        const metadata = ctor.getMetadata();
        const shouldObserveChildren = metadata.hasSlots();
        if (!shouldObserveChildren) {
            return;
        }
        const canSlotText = metadata.canSlotText();
        const hasClonedSlot = Object.keys(metadata.getSlots()).some(slotName => metadata.getSlots()[slotName].cloned);
        const mutationObserverOptions = {
            childList: true,
            subtree: canSlotText || hasClonedSlot,
            characterData: canSlotText,
        };
        observeDOMNode(this, this._processChildren.bind(this), mutationObserverOptions);
    }
    /**
     * @private
     */
    _stopObservingDOMChildren() {
        unobserveDOMNode(this);
    }
    /**
     * Note: this method is also manually called by "compatibility/patchNodeValue.js"
     * @private
     */
    async _processChildren() {
        const hasSlots = this.constructor.getMetadata().hasSlots();
        if (hasSlots) {
            await this._updateSlots();
        }
    }
    /**
     * @private
     */
    async _updateSlots() {
        const ctor = this.constructor;
        const slotsMap = ctor.getMetadata().getSlots();
        const canSlotText = ctor.getMetadata().canSlotText();
        const domChildren = Array.from(canSlotText ? this.childNodes : this.children);
        const slotsCachedContentMap = new Map(); // Store here the content of each slot before the mutation occurred
        const propertyNameToSlotMap = new Map(); // Used for reverse lookup to determine to which slot the property name corresponds
        // Init the _state object based on the supported slots and store the previous values
        for (const [slotName, slotData] of Object.entries(slotsMap)) { // eslint-disable-line
            const propertyName = slotData.propertyName || slotName;
            propertyNameToSlotMap.set(propertyName, slotName);
            slotsCachedContentMap.set(propertyName, [...this._state[propertyName]]);
            this._clearSlot(slotName, slotData);
        }
        const autoIncrementMap = new Map();
        const slottedChildrenMap = new Map();
        const allChildrenUpgraded = domChildren.map(async (child, idx) => {
            // Determine the type of the child (mainly by the slot attribute)
            const slotName = getSlotName(child);
            const slotData = slotsMap[slotName];
            // Check if the slotName is supported
            if (slotData === undefined) {
                if (slotName !== "default") {
                    const validValues = Object.keys(slotsMap).join(", ");
                    console.warn(`Unknown slotName: ${slotName}, ignoring`, child, `Valid values are: ${validValues}`); // eslint-disable-line
                }
                return;
            }
            // For children that need individual slots, calculate them
            if (slotData.individualSlots) {
                const nextIndex = (autoIncrementMap.get(slotName) || 0) + 1;
                autoIncrementMap.set(slotName, nextIndex);
                child._individualSlot = `${slotName}-${nextIndex}`;
            }
            // Await for not-yet-defined custom elements
            if (child instanceof HTMLElement) {
                const localName = child.localName;
                const shouldWaitForCustomElement = localName.includes("-") && !shouldIgnoreCustomElement(localName);
                if (shouldWaitForCustomElement) {
                    const isDefined = window.customElements.get(localName);
                    if (!isDefined) {
                        const whenDefinedPromise = window.customElements.whenDefined(localName); // Class registered, but instances not upgraded yet
                        let timeoutPromise = elementTimeouts.get(localName);
                        if (!timeoutPromise) {
                            timeoutPromise = new Promise(resolve => setTimeout(resolve, 1000));
                            elementTimeouts.set(localName, timeoutPromise);
                        }
                        await Promise.race([whenDefinedPromise, timeoutPromise]);
                    }
                    window.customElements.upgrade(child);
                }
            }
            child = ctor.getMetadata().constructor.validateSlotValue(child, slotData);
            // Listen for any invalidation on the child if invalidateOnChildChange is true or an object (ignore when false or not set)
            if (instanceOfUI5Element(child) && slotData.invalidateOnChildChange) {
                const childChangeListener = this._getChildChangeListener(slotName);
                if (childChangeListener) {
                    child.attachInvalidate.call(child, childChangeListener);
                }
            }
            // Listen for the slotchange event if the child is a slot itself
            if (child instanceof HTMLSlotElement) {
                this._attachSlotChange(child, slotName);
            }
            const propertyName = slotData.propertyName || slotName;
            if (slottedChildrenMap.has(propertyName)) {
                slottedChildrenMap.get(propertyName).push({ child, idx });
            }
            else {
                slottedChildrenMap.set(propertyName, [{ child, idx }]);
            }
        });
        await Promise.all(allChildrenUpgraded);
        // Distribute the child in the _state object, keeping the Light DOM order,
        // not the order elements are defined.
        slottedChildrenMap.forEach((children, propertyName) => {
            this._state[propertyName] = children.sort((a, b) => a.idx - b.idx).map(_ => _.child);
        });
        // Compare the content of each slot with the cached values and invalidate for the ones that changed
        let invalidated = false;
        for (const [slotName, slotData] of Object.entries(slotsMap)) { // eslint-disable-line
            const propertyName = slotData.propertyName || slotName;
            if (!arraysAreEqual(slotsCachedContentMap.get(propertyName), this._state[propertyName])) {
                _invalidate.call(this, {
                    type: "slot",
                    name: propertyNameToSlotMap.get(propertyName),
                    reason: "children",
                });
                invalidated = true;
            }
        }
        // If none of the slots had an invalidation due to changes to immediate children,
        // the change is considered to be text content of the default slot
        if (!invalidated) {
            _invalidate.call(this, {
                type: "slot",
                name: "default",
                reason: "textcontent",
            });
        }
    }
    /**
     * Removes all children from the slot and detaches listeners, if any
     * @private
     */
    _clearSlot(slotName, slotData) {
        const propertyName = slotData.propertyName || slotName;
        const children = this._state[propertyName];
        children.forEach(child => {
            if (instanceOfUI5Element(child)) {
                const childChangeListener = this._getChildChangeListener(slotName);
                if (childChangeListener) {
                    child.detachInvalidate.call(child, childChangeListener);
                }
            }
            if (child instanceof HTMLSlotElement) {
                this._detachSlotChange(child, slotName);
            }
        });
        this._state[propertyName] = [];
    }
    /**
     * Attach a callback that will be executed whenever the component is invalidated
     *
     * @param {InvalidationInfo} callback
     * @public
     */
    attachInvalidate(callback) {
        this._invalidationEventProvider.attachEvent("invalidate", callback);
    }
    /**
     * Detach the callback that is executed whenever the component is invalidated
     *
     * @param {InvalidationInfo} callback
     * @public
     */
    detachInvalidate(callback) {
        this._invalidationEventProvider.detachEvent("invalidate", callback);
    }
    /**
     * Callback that is executed whenever a monitored child changes its state
     *
     * @param {sting} slotName the slot in which a child was invalidated
     * @param { ChangeInfo } childChangeInfo the changeInfo object for the child in the given slot
     * @private
     */
    _onChildChange(slotName, childChangeInfo) {
        if (!this.constructor.getMetadata().shouldInvalidateOnChildChange(slotName, childChangeInfo.type, childChangeInfo.name)) {
            return;
        }
        // The component should be invalidated as this type of change on the child is listened for
        // However, no matter what changed on the child (property/slot), the invalidation is registered as "type=slot" for the component itself
        _invalidate.call(this, {
            type: "slot",
            name: slotName,
            reason: "childchange",
            child: childChangeInfo.target,
        });
    }
    /**
     * Do not override this method in derivatives of UI5Element
     * @private
     */
    attributeChangedCallback(name, oldValue, newValue) {
        let newPropertyValue;
        if (this._doNotSyncAttributes.has(name)) { // This attribute is mutated internally, not by the user
            return;
        }
        const properties = this.constructor.getMetadata().getProperties();
        const realName = name.replace(/^ui5-/, "");
        const nameInCamelCase = kebabToCamelCase(realName);
        if (properties.hasOwnProperty(nameInCamelCase)) { // eslint-disable-line
            const propData = properties[nameInCamelCase];
            const propertyType = propData.type;
            let propertyValidator = propData.validator;
            if (propertyType && propertyType.isDataTypeClass) {
                propertyValidator = propertyType;
            }
            if (propertyValidator) {
                newPropertyValue = propertyValidator.attributeToProperty(newValue);
            }
            else if (propertyType === Boolean) {
                newPropertyValue = newValue !== null;
            }
            else {
                newPropertyValue = newValue;
            }
            this[nameInCamelCase] = newPropertyValue;
        }
    }
    /**
     * @private
     */
    _updateAttribute(name, newValue) {
        const ctor = this.constructor;
        if (!ctor.getMetadata().hasAttribute(name)) {
            return;
        }
        const properties = ctor.getMetadata().getProperties();
        const propData = properties[name];
        const propertyType = propData.type;
        let propertyValidator = propData.validator;
        const attrName = camelToKebabCase(name);
        const attrValue = this.getAttribute(attrName);
        if (propertyType && propertyType.isDataTypeClass) {
            propertyValidator = propertyType;
        }
        if (propertyValidator) {
            const newAttrValue = propertyValidator.propertyToAttribute(newValue);
            if (newAttrValue === null) { // null means there must be no attribute for the current value of the property
                this._doNotSyncAttributes.add(attrName); // skip the attributeChangedCallback call for this attribute
                this.removeAttribute(attrName); // remove the attribute safely (will not trigger synchronization to the property value due to the above line)
                this._doNotSyncAttributes.delete(attrName); // enable synchronization again for this attribute
            }
            else {
                this.setAttribute(attrName, newAttrValue);
            }
        }
        else if (propertyType === Boolean) {
            if (newValue === true && attrValue === null) {
                this.setAttribute(attrName, "");
            }
            else if (newValue === false && attrValue !== null) {
                this.removeAttribute(attrName);
            }
        }
        else if (typeof newValue !== "object") {
            if (attrValue !== newValue) {
                this.setAttribute(attrName, newValue);
            }
        } // else { return; } // old object handling
    }
    /**
     * @private
     */
    _upgradeProperty(propertyName) {
        if (this.hasOwnProperty(propertyName)) { // eslint-disable-line
            const value = this[propertyName];
            delete this[propertyName];
            this[propertyName] = value;
        }
    }
    /**
     * @private
     */
    _upgradeAllProperties() {
        const allProps = this.constructor.getMetadata().getPropertiesList();
        allProps.forEach(this._upgradeProperty.bind(this));
    }
    /**
     * Returns a singleton event listener for the "change" event of a child in a given slot
     *
     * @param slotName the name of the slot, where the child is
     * @returns {ChildChangeListener}
     * @private
     */
    _getChildChangeListener(slotName) {
        if (!this._childChangeListeners.has(slotName)) {
            this._childChangeListeners.set(slotName, this._onChildChange.bind(this, slotName));
        }
        return this._childChangeListeners.get(slotName);
    }
    /**
     * Returns a singleton slotchange event listener that invalidates the component due to changes in the given slot
     *
     * @param slotName the name of the slot, where the slot element (whose slotchange event we're listening to) is
     * @returns {SlotChangeListener}
     * @private
     */
    _getSlotChangeListener(slotName) {
        if (!this._slotChangeListeners.has(slotName)) {
            this._slotChangeListeners.set(slotName, this._onSlotChange.bind(this, slotName));
        }
        return this._slotChangeListeners.get(slotName);
    }
    /**
     * @private
     */
    _attachSlotChange(child, slotName) {
        const slotChangeListener = this._getSlotChangeListener(slotName);
        if (slotChangeListener) {
            child.addEventListener("slotchange", slotChangeListener);
        }
    }
    /**
     * @private
     */
    _detachSlotChange(child, slotName) {
        child.removeEventListener("slotchange", this._getSlotChangeListener(slotName));
    }
    /**
     * Whenever a slot element is slotted inside a UI5 Web Component, its slotchange event invalidates the component
     *
     * @param slotName the name of the slot, where the slot element (whose slotchange event we're listening to) is
     * @private
     */
    _onSlotChange(slotName) {
        _invalidate.call(this, {
            type: "slot",
            name: slotName,
            reason: "slotchange",
        });
    }
    /**
     * A callback that is executed each time an already rendered component is invalidated (scheduled for re-rendering)
     *
     * @param  changeInfo An object with information about the change that caused invalidation.
     * The object can have the following properties:
     *  - type: (property|slot) tells what caused the invalidation
     *   1) property: a property value was changed either directly or as a result of changing the corresponding attribute
     *   2) slot: a slotted node(nodes) changed in one of several ways (see "reason")
     *
     *  - name: the name of the property or slot that caused the invalidation
     *
     *  - reason: (children|textcontent|childchange|slotchange) relevant only for type="slot" only and tells exactly what changed in the slot
     *   1) children: immediate children (HTML elements or text nodes) were added, removed or reordered in the slot
     *   2) textcontent: text nodes in the slot changed value (or nested text nodes were added or changed value). Can only trigger for slots of "type: Node"
     *   3) slotchange: a slot element, slotted inside that slot had its "slotchange" event listener called. This practically means that transitively slotted children changed.
     *      Can only trigger if the child of a slot is a slot element itself.
     *   4) childchange: indicates that a UI5Element child in that slot was invalidated and in turn invalidated the component.
     *      Can only trigger for slots with "invalidateOnChildChange" metadata descriptor
     *
     *  - newValue: the new value of the property (for type="property" only)
     *
     *  - oldValue: the old value of the property (for type="property" only)
     *
     *  - child the child that was changed (for type="slot" and reason="childchange" only)
     *
     * @public
     */
    onInvalidation(changeInfo) { } // eslint-disable-line
    /**
     * Do not call this method directly, only intended to be called by js
     * @protected
     */
    _render() {
        const ctor = this.constructor;
        const hasIndividualSlots = ctor.getMetadata().hasIndividualSlots();
        // suppress invalidation to prevent state changes scheduling another rendering
        this._suppressInvalidation = true;
        this.onBeforeRendering();
        // Intended for framework usage only. Currently ItemNavigation updates tab indexes after the component has updated its state but before the template is rendered
        this._componentStateFinalizedEventProvider.fireEvent("componentStateFinalized");
        // resume normal invalidation handling
        this._suppressInvalidation = false;
        // Update the shadow root with the render result
        /*
        if (this._changedState.length) {
            let element = this.localName;
            if (this.id) {
                element = `${element}#${this.id}`;
            }
            console.log("Re-rendering:", element, this._changedState.map(x => { // eslint-disable-line
                let res = `${x.type}`;
                if (x.reason) {
                    res = `${res}(${x.reason})`;
                }
                res = `${res}: ${x.name}`;
                if (x.type === "property") {
                    res = `${res} ${JSON.stringify(x.oldValue)} => ${JSON.stringify(x.newValue)}`;
                }

                return res;
            }));
        }
        */
        this._changedState = [];
        // Update shadow root and static area item
        if (ctor._needsShadowDOM()) {
            updateShadowRoot(this);
        }
        if (this.staticAreaItem) {
            this.staticAreaItem.update();
        }
        // Safari requires that children get the slot attribute only after the slot tags have been rendered in the shadow DOM
        if (hasIndividualSlots) {
            this._assignIndividualSlotsToChildren();
        }
        // Call the onAfterRendering hook
        this.onAfterRendering();
    }
    /**
     * @private
     */
    _assignIndividualSlotsToChildren() {
        const domChildren = Array.from(this.children);
        domChildren.forEach((child) => {
            if (child._individualSlot) {
                child.setAttribute("slot", child._individualSlot);
            }
        });
    }
    /**
     * @private
     */
    _waitForDomRef() {
        return this._domRefReadyPromise;
    }
    /**
     * Returns the DOM Element inside the Shadow Root that corresponds to the opening tag in the UI5 Web Component's template
     * *Note:* For logical (abstract) elements (items, options, etc...), returns the part of the parent's DOM that represents this option
     * Use this method instead of "this.shadowRoot" to read the Shadow DOM, if ever necessary
     *
     * @public
     */
    getDomRef() {
        // If a component set _getRealDomRef to its children, use the return value of this function
        if (typeof this._getRealDomRef === "function") {
            return this._getRealDomRef();
        }
        if (!this.shadowRoot || this.shadowRoot.children.length === 0) {
            return;
        }
        const children = [...this.shadowRoot.children].filter(child => !["link", "style"].includes(child.localName));
        if (children.length !== 1) {
            console.warn(`The shadow DOM for ${this.constructor.getMetadata().getTag()} does not have a top level element, the getDomRef() method might not work as expected`); // eslint-disable-line
        }
        return children[0];
    }
    /**
     * Returns the DOM Element marked with "data-sap-focus-ref" inside the template.
     * This is the element that will receive the focus by default.
     * @public
     */
    getFocusDomRef() {
        const domRef = this.getDomRef();
        if (domRef) {
            const focusRef = domRef.querySelector("[data-sap-focus-ref]");
            return focusRef || domRef;
        }
    }
    /**
     * Waits for dom ref and then returns the DOM Element marked with "data-sap-focus-ref" inside the template.
     * This is the element that will receive the focus by default.
     * @public
     */
    async getFocusDomRefAsync() {
        await this._waitForDomRef();
        return this.getFocusDomRef();
    }
    /**
     * Set the focus to the element, returned by "getFocusDomRef()" (marked by "data-sap-focus-ref")
     * @param {FocusOptions} focusOptions additional options for the focus
     * @public
     */
    async focus(focusOptions) {
        await this._waitForDomRef();
        const focusDomRef = this.getFocusDomRef();
        if (focusDomRef && typeof focusDomRef.focus === "function") {
            focusDomRef.focus(focusOptions);
        }
    }
    /**
     *
     * @public
     * @param name - name of the event
     * @param data - additional data for the event
     * @param cancelable - true, if the user can call preventDefault on the event object
     * @param bubbles - true, if the event bubbles
     * @returns {boolean} false, if the event was cancelled (preventDefault called), true otherwise
     */
    fireEvent(name, data, cancelable = false, bubbles = true) {
        const eventResult = this._fireEvent(name, data, cancelable, bubbles);
        const camelCaseEventName = kebabToCamelCase(name);
        if (camelCaseEventName !== name) {
            return eventResult && this._fireEvent(camelCaseEventName, data, cancelable, bubbles);
        }
        return eventResult;
    }
    _fireEvent(name, data, cancelable = false, bubbles = true) {
        const noConflictEvent = new CustomEvent(`ui5-${name}`, {
            detail: data,
            composed: false,
            bubbles,
            cancelable,
        });
        // This will be false if the no-conflict event is prevented
        const noConflictEventResult = this.dispatchEvent(noConflictEvent);
        if (skipOriginalEvent(name)) {
            return noConflictEventResult;
        }
        const normalEvent = new CustomEvent(name, {
            detail: data,
            composed: false,
            bubbles,
            cancelable,
        });
        // This will be false if the normal event is prevented
        const normalEventResult = this.dispatchEvent(normalEvent);
        // Return false if any of the two events was prevented (its result was false).
        return normalEventResult && noConflictEventResult;
    }
    /**
     * Returns the actual children, associated with a slot.
     * Useful when there are transitive slots in nested component scenarios and you don't want to get a list of the slots, but rather of their content.
     * @public
     */
    getSlottedNodes(slotName) {
        return getSlottedNodesList(this[slotName]);
    }
    /**
     * Attach a callback that will be executed whenever the component's state is finalized
     *
     * @param {} callback
     * @public
     */
    attachComponentStateFinalized(callback) {
        this._componentStateFinalizedEventProvider.attachEvent("componentStateFinalized", callback);
    }
    /**
     * Detach the callback that is executed whenever the component's state is finalized
     *
     * @param {} callback
     * @public
     */
    detachComponentStateFinalized(callback) {
        this._componentStateFinalizedEventProvider.detachEvent("componentStateFinalized", callback);
    }
    /**
     * Determines whether the component should be rendered in RTL mode or not.
     * Returns: "rtl", "ltr" or undefined
     *
     * @public
     * @returns {String|undefined}
     */
    get effectiveDir() {
        markAsRtlAware(this.constructor); // if a UI5 Element calls this method, it's considered to be rtl-aware
        return getEffectiveDir(this);
    }
    /**
     * Used to duck-type UI5 elements without using instanceof
     * @returns {boolean}
     * @public
     */
    get isUI5Element() {
        return true;
    }
    get classes() {
        return {};
    }
    /**
     * Do not override this method in derivatives of UI5Element, use metadata properties instead
     * @private
     */
    static get observedAttributes() {
        return this.getMetadata().getAttributesList();
    }
    /**
     * @private
     */
    static _needsShadowDOM() {
        return !!this.template || Object.prototype.hasOwnProperty.call(this.prototype, "render");
    }
    /**
     * @private
     */
    static _needsStaticArea() {
        return !!this.staticAreaTemplate || Object.prototype.hasOwnProperty.call(this.prototype, "renderStatic");
    }
    /**
     * @public
     */
    getStaticAreaItemDomRef() {
        if (!this.constructor._needsStaticArea()) {
            throw new Error("This component does not use the static area");
        }
        if (!this.staticAreaItem) {
            this.staticAreaItem = StaticAreaItem.createInstance();
            this.staticAreaItem.setOwnerElement(this);
        }
        if (!this.staticAreaItem.parentElement) {
            getSingletonElementInstance("ui5-static-area").appendChild(this.staticAreaItem);
        }
        return this.staticAreaItem.getDomRef();
    }
    /**
     * @private
     */
    static _generateAccessors() {
        const proto = this.prototype;
        const slotsAreManaged = this.getMetadata().slotsAreManaged();
        // Properties
        const properties = this.getMetadata().getProperties();
        for (const [prop, propData] of Object.entries(properties)) { // eslint-disable-line
            if (!isValidPropertyName(prop)) {
                console.warn(`"${prop}" is not a valid property name. Use a name that does not collide with DOM APIs`); /* eslint-disable-line */
            }
            if (propData.type === Boolean && propData.defaultValue) {
                throw new Error(`Cannot set a default value for property "${prop}". All booleans are false by default.`);
            }
            if (propData.type === Array) {
                throw new Error(`Wrong type for property "${prop}". Properties cannot be of type Array - use "multiple: true" and set "type" to the single value type, such as "String", "Object", etc...`);
            }
            if (propData.type === Object && propData.defaultValue) {
                throw new Error(`Cannot set a default value for property "${prop}". All properties of type "Object" are empty objects by default.`);
            }
            if (propData.multiple && propData.defaultValue) {
                throw new Error(`Cannot set a default value for property "${prop}". All multiple properties are empty arrays by default.`);
            }
            Object.defineProperty(proto, prop, {
                get() {
                    if (this._state[prop] !== undefined) {
                        return this._state[prop];
                    }
                    const propDefaultValue = propData.defaultValue;
                    if (propData.type === Boolean) {
                        return false;
                    }
                    else if (propData.type === String) { // eslint-disable-line
                        return propDefaultValue;
                    }
                    else if (propData.multiple) { // eslint-disable-line
                        return [];
                    }
                    else {
                        return propDefaultValue;
                    }
                },
                set(value) {
                    let isDifferent;
                    const ctor = this.constructor;
                    const metadataCtor = ctor.getMetadata().constructor;
                    value = metadataCtor.validatePropertyValue(value, propData);
                    const propertyType = propData.type;
                    let propertyValidator = propData.validator;
                    const oldState = this._state[prop];
                    if (propertyType && propertyType.isDataTypeClass) {
                        propertyValidator = propertyType;
                    }
                    if (propertyValidator) {
                        isDifferent = !propertyValidator.valuesAreEqual(oldState, value);
                    }
                    else if (Array.isArray(oldState) && Array.isArray(value) && propData.multiple && propData.compareValues) { // compareValues is added for IE, test if needed now
                        isDifferent = !arraysAreEqual(oldState, value);
                    }
                    else {
                        isDifferent = oldState !== value;
                    }
                    if (isDifferent) {
                        this._state[prop] = value;
                        _invalidate.call(this, {
                            type: "property",
                            name: prop,
                            newValue: value,
                            oldValue: oldState,
                        });
                        this._updateAttribute(prop, value);
                    }
                },
            });
        }
        // Slots
        if (slotsAreManaged) {
            const slots = this.getMetadata().getSlots();
            for (const [slotName, slotData] of Object.entries(slots)) { // eslint-disable-line
                if (!isValidPropertyName(slotName)) {
                    console.warn(`"${slotName}" is not a valid property name. Use a name that does not collide with DOM APIs`); /* eslint-disable-line */
                }
                const propertyName = slotData.propertyName || slotName;
                Object.defineProperty(proto, propertyName, {
                    get() {
                        if (this._state[propertyName] !== undefined) {
                            return this._state[propertyName];
                        }
                        return [];
                    },
                    set() {
                        throw new Error("Cannot set slot content directly, use the DOM APIs (appendChild, removeChild, etc...)");
                    },
                });
            }
        }
    }
    /**
     * Returns the CSS for this UI5 Web Component Class
     * @protected
     */
    static get styles() {
        return "";
    }
    /**
     * Returns the Static Area CSS for this UI5 Web Component Class
     * @protected
     */
    static get staticAreaStyles() {
        return "";
    }
    /**
     * Returns an array with the dependencies for this UI5 Web Component, which could be:
     *  - composed components (used in its shadow root or static area item)
     *  - slotted components that the component may need to communicate with
     *
     * @protected
     */
    static get dependencies() {
        return [];
    }
    /**
     * Returns a list of the unique dependencies for this UI5 Web Component
     *
     * @public
     */
    static getUniqueDependencies() {
        if (!uniqueDependenciesCache.has(this)) {
            const filtered = this.dependencies.filter((dep, index, deps) => deps.indexOf(dep) === index);
            uniqueDependenciesCache.set(this, filtered);
        }
        return uniqueDependenciesCache.get(this) || [];
    }
    /**
     * Returns a promise that resolves whenever all dependencies for this UI5 Web Component have resolved
     *
     * @returns {Promise}
     */
    static whenDependenciesDefined() {
        return Promise.all(this.getUniqueDependencies().map(dep => dep.define()));
    }
    /**
     * Hook that will be called upon custom element definition
     *
     * @protected
     * @returns {Promise<void>}
     */
    static async onDefine() {
        return Promise.resolve();
    }
    /**
     * Registers a UI5 Web Component in the browser window object
     * @public
     * @returns {Promise<UI5Element>}
     */
    static async define() {
        await boot();
        await Promise.all([
            this.whenDependenciesDefined(),
            this.onDefine(),
        ]);
        const tag = this.getMetadata().getTag();
        const definedLocally = isTagRegistered(tag);
        const definedGlobally = window.customElements.get(tag);
        if (definedGlobally && !definedLocally) {
            recordTagRegistrationFailure(tag);
        }
        else if (!definedGlobally) {
            this._generateAccessors();
            registerTag(tag);
            window.customElements.define(tag, this);
        }
        return this;
    }
    /**
     * Returns an instance of UI5ElementMetadata.js representing this UI5 Web Component's full metadata (its and its parents')
     * Note: not to be confused with the "get metadata()" method, which returns an object for this class's metadata only
     * @public
     * @returns {UI5ElementMetadata}
     */
    static getMetadata() {
        if (this.hasOwnProperty("_metadata")) { // eslint-disable-line
            return this._metadata;
        }
        const metadataObjects = [this.metadata];
        let klass = this; // eslint-disable-line
        while (klass !== UI5Element) {
            klass = Object.getPrototypeOf(klass);
            metadataObjects.unshift(klass.metadata);
        }
        const mergedMetadata = fnMerge({}, ...metadataObjects);
        this._metadata = new UI5ElementMetadata(mergedMetadata);
        return this._metadata;
    }
}
/**
 * Returns the metadata object for this UI5 Web Component Class
 * @protected
 */
UI5Element.metadata = {};
/**
 * Always use duck-typing to cover all runtimes on the page.
 * @returns {boolean}
 */
const instanceOfUI5Element = (object) => {
    return "isUI5Element" in object;
};

/**
 * Returns a custom element class decorator.
 *
 * @param { string | object } tagNameOrComponentSettings
 * @returns { ClassDecorator }
 */
const customElement = (tagNameOrComponentSettings) => {
    return (target) => {
        if (!Object.prototype.hasOwnProperty.call(target, "metadata")) {
            target.metadata = {};
        }
        if (typeof tagNameOrComponentSettings === "string") {
            target.metadata.tag = tagNameOrComponentSettings;
            return;
        }
        const { tag, languageAware, themeAware, fastNavigation, } = tagNameOrComponentSettings;
        target.metadata.tag = tag;
        if (languageAware) {
            target.metadata.languageAware = languageAware;
        }
        if (themeAware) {
            target.metadata.themeAware = themeAware;
        }
        if (fastNavigation) {
            target.metadata.fastNavigation = fastNavigation;
        }
        ["render", "renderer", "template", "staticAreaTemplate", "styles", "staticAreaStyles", "dependencies"].forEach((customElementEntity) => {
            const _customElementEntity = customElementEntity === "render" ? "renderer" : customElementEntity;
            const customElementEntityValue = tagNameOrComponentSettings[_customElementEntity];
            customElementEntityValue && Object.defineProperty(target, customElementEntity, {
                get: () => customElementEntityValue,
            });
        });
    };
};

/**
 * Returns a property decorator.
 *
 * @param { Property } propData
 * @returns { PropertyDecorator }
 */
const property = (propData) => {
    return (target, propertyKey) => {
        const ctor = target.constructor;
        if (!Object.prototype.hasOwnProperty.call(ctor, "metadata")) {
            ctor.metadata = {};
        }
        const metadata = ctor.metadata;
        if (!metadata.properties) {
            metadata.properties = {};
        }
        const propsMetadata = metadata.properties;
        if (!propsMetadata[propertyKey]) {
            propsMetadata[propertyKey] = propData || { type: String };
        }
    };
};

/**
 * Returns an event class decorator.
 *
 * @param { string } name the event name
 * @param { EventData } data the event data
 * @returns { ClassDecorator }
 */
const event = (name, data = {}) => {
    return (target) => {
        if (!Object.prototype.hasOwnProperty.call(target, "metadata")) {
            target.metadata = {};
        }
        const metadata = target.metadata;
        if (!metadata.events) {
            metadata.events = {};
        }
        const eventsMetadata = metadata.events;
        if (!eventsMetadata[name]) {
            eventsMetadata[name] = data;
        }
    };
};

/**
 * Returns a slot decorator.
 *
 * @param { Slot } slotData
 * @returns { PropertyDecorator }
 */
const slot = (slotData) => {
    return (target, slotKey) => {
        const ctor = target.constructor;
        if (!Object.prototype.hasOwnProperty.call(ctor, "metadata")) {
            ctor.metadata = {};
        }
        const metadata = ctor.metadata;
        if (!metadata.slots) {
            metadata.slots = {};
        }
        const slotMetadata = metadata.slots;
        if (slotData && slotData.default && slotMetadata.default) {
            throw new Error("Only one slot can be the default slot.");
        }
        const key = slotData && slotData.default ? "default" : slotKey;
        slotData = slotData || { type: HTMLElement };
        if (!slotData.type) {
            slotData.type = HTMLElement;
        }
        if (!slotMetadata[key]) {
            slotMetadata[key] = slotData;
        }
        if (slotData.default) {
            delete slotMetadata.default.default;
            slotMetadata.default.propertyName = slotKey;
        }
        ctor.metadata.managedSlots = true;
    };
};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$1;const i$1=window,s$2=i$1.trustedTypes,e$3=s$2?s$2.createPolicy("lit-html",{createHTML:t=>t}):void 0,o$3="$lit$",n$1=`lit$${(Math.random()+"").slice(9)}$`,l$3="?"+n$1,h=`<${l$3}>`,r$1=document,u$2=()=>r$1.createComment(""),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,c$2=Array.isArray,v=t=>c$2(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),a$2="[ \t\n\f\r]",f$1=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m$1=/>/g,p$1=RegExp(`>|${a$2}(?:([^\\s"'>=/]+)(${a$2}*=${a$2}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,w=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=w(1),b=w(2),T=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),E=new WeakMap,C=r$1.createTreeWalker(r$1,129,null,!1);function P(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$3?e$3.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,e=[];let l,r=2===i?"<svg>":"",u=f$1;for(let i=0;i<s;i++){const s=t[i];let d,c,v=-1,a=0;for(;a<s.length&&(u.lastIndex=a,c=u.exec(s),null!==c);)a=u.lastIndex,u===f$1?"!--"===c[1]?u=_:void 0!==c[1]?u=m$1:void 0!==c[2]?(y.test(c[2])&&(l=RegExp("</"+c[2],"g")),u=p$1):void 0!==c[3]&&(u=p$1):u===p$1?">"===c[0]?(u=null!=l?l:f$1,v=-1):void 0===c[1]?v=-2:(v=u.lastIndex-c[2].length,d=c[1],u=void 0===c[3]?p$1:'"'===c[3]?$:g):u===$||u===g?u=p$1:u===_||u===m$1?u=f$1:(u=p$1,l=void 0);const w=u===p$1&&t[i+1].startsWith("/>")?" ":"";r+=u===f$1?s+h:v>=0?(e.push(d),s.slice(0,v)+o$3+s.slice(v)+n$1+w):s+n$1+(-2===v?(e.push(void 0),i):w);}return [P(t,r+(t[s]||"<?>")+(2===i?"</svg>":"")),e]};class N{constructor({strings:t,_$litType$:i},e){let h;this.parts=[];let r=0,d=0;const c=t.length-1,v=this.parts,[a,f]=V(t,i);if(this.el=N.createElement(a,e),C.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(h=C.nextNode())&&v.length<c;){if(1===h.nodeType){if(h.hasAttributes()){const t=[];for(const i of h.getAttributeNames())if(i.endsWith(o$3)||i.startsWith(n$1)){const s=f[d++];if(t.push(i),void 0!==s){const t=h.getAttribute(s.toLowerCase()+o$3).split(n$1),i=/([.?@])?(.*)/.exec(s);v.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?H:"?"===i[1]?L:"@"===i[1]?z:k});}else v.push({type:6,index:r});}for(const i of t)h.removeAttribute(i);}if(y.test(h.tagName)){const t=h.textContent.split(n$1),i=t.length-1;if(i>0){h.textContent=s$2?s$2.emptyScript:"";for(let s=0;s<i;s++)h.append(t[s],u$2()),C.nextNode(),v.push({type:2,index:++r});h.append(t[i],u$2());}}}else if(8===h.nodeType)if(h.data===l$3)v.push({type:2,index:r});else {let t=-1;for(;-1!==(t=h.data.indexOf(n$1,t+1));)v.push({type:7,index:r}),t+=n$1.length-1;}r++;}}static createElement(t,i){const s=r$1.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){var o,n,l,h;if(i===T)return i;let r=void 0!==e?null===(o=s._$Co)||void 0===o?void 0:o[e]:s._$Cl;const u=d(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,!1),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Co)&&void 0!==l?l:h._$Co=[])[e]=r:s._$Cl=r),void 0!==r&&(i=S(t,r._$AS(t,i.values),r,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:r$1).importNode(s,!0);C.currentNode=o;let n=C.nextNode(),l=0,h=0,u=e[0];for(;void 0!==u;){if(l===u.index){let i;2===u.type?i=new R(n,n.nextSibling,this,t):1===u.type?i=new u.ctor(n,u.name,u.strings,this,t):6===u.type&&(i=new Z(n,this,t)),this._$AV.push(i),u=e[++h];}l!==(null==u?void 0:u.index)&&(n=C.nextNode(),l++);}return C.currentNode=r$1,o}v(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{constructor(t,i,s,e){var o;this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cp=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===(null==t?void 0:t.nodeType)&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),d(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):v(t)?this.T(t):this._(t);}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t));}_(t){this._$AH!==A&&d(this._$AH)?this._$AA.nextSibling.data=t:this.$(r$1.createTextNode(t)),this._$AH=t;}g(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=N.createElement(P(e.h,e.h[0]),this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.v(s);else {const t=new M(o,this),i=t.u(this.options);t.v(s),this.$(i),this._$AH=t;}}_$AC(t){let i=E.get(t.strings);return void 0===i&&E.set(t.strings,i=new N(t)),i}T(t){c$2(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new R(this.k(u$2()),this.k(u$2()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cp=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class k{constructor(t,i,s,e,o){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=S(this,t,i,0),n=!d(t)||t!==this._$AH&&t!==T,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=S(this,e[s+l],i,l),h===T&&(h=this._$AH[l]),n||(n=!d(h)||h!==this._$AH[l]),h===A?t=A:t!==A&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}const I=s$2?s$2.emptyScript:"";class L extends k{constructor(){super(...arguments),this.type=4;}j(t){t&&t!==A?this.element.setAttribute(this.name,I):this.element.removeAttribute(this.name);}}class z extends k{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=S(this,t,i,0))&&void 0!==s?s:A)===T)return;const e=this._$AH,o=t===A&&e!==A||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==A&&(e===A||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const j={O:o$3,P:n$1,A:l$3,C:1,M:V,L:M,R:v,D:S,I:R,V:k,H:L,N:z,U:H,F:Z},B=i$1.litHtmlPolyfillSupport;null==B||B(N,R),(null!==(t$1=i$1.litHtmlVersions)&&void 0!==t$1?t$1:i$1.litHtmlVersions=[]).push("2.8.0");const D=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new R(i.insertBefore(u$2(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e$2=t=>(...e)=>({_$litDirective$:t,values:e});class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const {I:l$2}=j,r=()=>document.createComment(""),c$1=(o,i,n)=>{var t;const v=o._$AA.parentNode,d=void 0===i?o._$AB:i._$AA;if(void 0===n){const i=v.insertBefore(r(),d),t=v.insertBefore(r(),d);n=new l$2(i,t,o,o.options);}else {const l=n._$AB.nextSibling,i=n._$AM,u=i!==o;if(u){let l;null===(t=n._$AQ)||void 0===t||t.call(n,o),n._$AM=o,void 0!==n._$AP&&(l=o._$AU)!==i._$AU&&n._$AP(l);}if(l!==d||u){let o=n._$AA;for(;o!==l;){const l=o.nextSibling;v.insertBefore(o,d),o=l;}}}return n},f=(o,l,i=o)=>(o._$AI(l,i),o),s$1={},a$1=(o,l=s$1)=>o._$AH=l,m=o=>o._$AH,p=o=>{var l;null===(l=o._$AP)||void 0===l||l.call(o,!1,!0);let i=o._$AA;const n=o._$AB.nextSibling;for(;i!==n;){const o=i.nextSibling;i.remove(),i=o;}};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const u$1=(e,s,t)=>{const r=new Map;for(let l=s;l<=t;l++)r.set(e[l],l);return r},c=e$2(class extends i{constructor(e){if(super(e),e.type!==t.CHILD)throw Error("repeat() can only be used in text expressions")}ct(e,s,t){let r;void 0===t?t=s:void 0!==s&&(r=s);const l=[],o=[];let i=0;for(const s of e)l[i]=r?r(s,i):i,o[i]=t(s,i),i++;return {values:o,keys:l}}render(e,s,t){return this.ct(e,s,t).values}update(s,[t,r,c]){var d;const a=m(s),{values:p$1,keys:v}=this.ct(t,r,c);if(!Array.isArray(a))return this.ut=v,p$1;const h=null!==(d=this.ut)&&void 0!==d?d:this.ut=[],m$1=[];let y,x,j=0,k=a.length-1,w=0,A=p$1.length-1;for(;j<=k&&w<=A;)if(null===a[j])j++;else if(null===a[k])k--;else if(h[j]===v[w])m$1[w]=f(a[j],p$1[w]),j++,w++;else if(h[k]===v[A])m$1[A]=f(a[k],p$1[A]),k--,A--;else if(h[j]===v[A])m$1[A]=f(a[j],p$1[A]),c$1(s,m$1[A+1],a[j]),j++,A--;else if(h[k]===v[w])m$1[w]=f(a[k],p$1[w]),c$1(s,a[j],a[k]),k--,w++;else if(void 0===y&&(y=u$1(v,w,A),x=u$1(h,j,k)),y.has(h[j]))if(y.has(h[k])){const e=x.get(v[w]),t=void 0!==e?a[e]:null;if(null===t){const e=c$1(s,a[j]);f(e,p$1[w]),m$1[w]=e;}else m$1[w]=f(t,p$1[w]),c$1(s,a[j],t),a[e]=null;w++;}else p(a[k]),k--;else p(a[j]),j++;for(;w<=A;){const e=c$1(s,m$1[A+1]);f(e,p$1[w]),m$1[w++]=e;}for(;j<=k;){const e=a[j++];null!==e&&p(e);}return this.ut=v,a$1(s,m$1),T}});

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o$2=e$2(class extends i{constructor(t$1){var i;if(super(t$1),t$1.type!==t.ATTRIBUTE||"class"!==t$1.name||(null===(i=t$1.strings)||void 0===i?void 0:i.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return " "+Object.keys(t).filter((i=>t[i])).join(" ")+" "}update(i,[s]){var r,o;if(void 0===this.it){this.it=new Set,void 0!==i.strings&&(this.nt=new Set(i.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in s)s[t]&&!(null===(r=this.nt)||void 0===r?void 0:r.has(t))&&this.it.add(t);return this.render(s)}const e=i.element.classList;this.it.forEach((t=>{t in s||(e.remove(t),this.it.delete(t));}));for(const t in s){const i=!!s[t];i===this.it.has(t)||(null===(o=this.nt)||void 0===o?void 0:o.has(t))||(i?(e.add(t),this.it.add(t)):(e.remove(t),this.it.delete(t)));}return T}});

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

class StyleMapDirective extends i {
	constructor(partInfo) {
		var _a;
		super(partInfo);
		if (partInfo.type !== t.ATTRIBUTE ||
			partInfo.name !== 'style' ||
			((_a = partInfo.strings) === null || _a === void 0 ? void 0 : _a.length) > 2) {
			throw new Error('The `styleMap` directive must be used in the `style` attribute ' +
				'and must be the only part in the attribute.');
		}
	}
	render(styleInfo) {
		return "";
	}
	update(part, [styleInfo]) {
		const { style } = part.element;
		if (this._previousStyleProperties === undefined) {
			this._previousStyleProperties = new Set();
			for (const name in styleInfo) {
				this._previousStyleProperties.add(name);
			}
			// return this.render(styleInfo);
		}
		// Remove old properties that no longer exist in styleInfo
		// We use forEach() instead of for-of so that re don't require down-level
		// iteration.
		this._previousStyleProperties.forEach((name) => {
			// If the name isn't in styleInfo or it's null/undefined
			if (styleInfo[name] == null) {
				this._previousStyleProperties.delete(name);
				if (name.includes('-')) {
					style.removeProperty(name);
				}
				else {
					// Note reset using empty string (vs null) as IE11 does not always
					// reset via null (https://developer.mozilla.org/en-US/docs/Web/API/ElementCSSInlineStyle/style#setting_styles)
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					style[name] = '';
				}
			}
		});
		// Add or update properties
		for (const name in styleInfo) {
			const value = styleInfo[name];
			if (value != null) {
				this._previousStyleProperties.add(name);
				if (name.includes('-')) {
					style.setProperty(name, value);
				}
				else {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					style[name] = value;
				}
			}
		}
		return T;
	}
}

const styleMap = e$2(StyleMapDirective);

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const l$1=l=>null!=l?l:A;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let e$1 = class e extends i{constructor(i){if(super(i),this.et=A,i.type!==t.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(r){if(r===A||null==r)return this.ft=void 0,this.et=r;if(r===T)return r;if("string"!=typeof r)throw Error(this.constructor.directiveName+"() called with a non-string value");if(r===this.et)return this.ft;this.et=r;const s=[r];return s.raw=s,this.ft={_$litType$:this.constructor.resultType,strings:s,values:[]}}};e$1.directiveName="unsafeHTML",e$1.resultType=1;const o$1=e$2(e$1);

const effectiveHtml = (strings, ...values) => {
    const litStatic = getFeature("LitStatic");
    const fn = litStatic ? litStatic.html : x;
    return fn(strings, ...values);
};
const effectiveSvg = (strings, ...values) => {
    const litStatic = getFeature("LitStatic");
    const fn = litStatic ? litStatic.svg : b;
    return fn(strings, ...values);
};
const litRender = (templateResult, container, styleStrOrHrefsArr, forStaticArea, options) => {
    const openUI5Enablement = getFeature("OpenUI5Enablement");
    if (openUI5Enablement && !forStaticArea) {
        templateResult = openUI5Enablement.wrapTemplateResultInBusyMarkup(effectiveHtml, options.host, templateResult);
    }
    if (typeof styleStrOrHrefsArr === "string") {
        templateResult = effectiveHtml `<style>${styleStrOrHrefsArr}</style>${templateResult}`;
    }
    else if (Array.isArray(styleStrOrHrefsArr) && styleStrOrHrefsArr.length) {
        templateResult = effectiveHtml `${styleStrOrHrefsArr.map(href => effectiveHtml `<link type="text/css" rel="stylesheet" href="${href}">`)}${templateResult}`;
    }
    D(templateResult, container, options);
};
const scopeTag = (tag, tags, suffix) => {
    const litStatic = getFeature("LitStatic");
    if (litStatic) {
        return litStatic.unsafeStatic((tags || []).includes(tag) ? `${tag}-${suffix}` : tag);
    }
};

const KeyCodes = {
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    SHIFT: 16,
    CONTROL: 17,
    ALT: 18,
    BREAK: 19,
    CAPS_LOCK: 20,
    ESCAPE: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    ARROW_LEFT: 37,
    ARROW_UP: 38,
    ARROW_RIGHT: 39,
    ARROW_DOWN: 40,
    PRINT: 44,
    INSERT: 45,
    DELETE: 46,
    DIGIT_0: 48,
    DIGIT_1: 49,
    DIGIT_2: 50,
    DIGIT_3: 51,
    DIGIT_4: 52,
    DIGIT_5: 53,
    DIGIT_6: 54,
    DIGIT_7: 55,
    DIGIT_8: 56,
    DIGIT_9: 57,
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,
    WINDOWS: 91,
    CONTEXT_MENU: 93,
    TURN_OFF: 94,
    SLEEP: 95,
    NUMPAD_0: 96,
    NUMPAD_1: 97,
    NUMPAD_2: 98,
    NUMPAD_3: 99,
    NUMPAD_4: 100,
    NUMPAD_5: 101,
    NUMPAD_6: 102,
    NUMPAD_7: 103,
    NUMPAD_8: 104,
    NUMPAD_9: 105,
    NUMPAD_ASTERISK: 106,
    NUMPAD_PLUS: 107,
    NUMPAD_MINUS: 109,
    NUMPAD_COMMA: 110,
    NUMPAD_SLASH: 111,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    NUM_LOCK: 144,
    SCROLL_LOCK: 145,
    COLON: 186,
    PLUS: 187,
    COMMA: 188,
    SLASH: 189,
    DOT: 190,
    PIPE: 191,
    SEMICOLON: 192,
    MINUS: 219,
    GREAT_ACCENT: 220,
    EQUALS: 221,
    SINGLE_QUOTE: 222,
    BACKSLASH: 226,
};
const isEnter = (event) => (event.key ? event.key === "Enter" : event.keyCode === KeyCodes.ENTER) && !hasModifierKeys(event);
const isSpace = (event) => (event.key ? (event.key === "Spacebar" || event.key === " ") : event.keyCode === KeyCodes.SPACE) && !hasModifierKeys(event);
const isLeft = (event) => (event.key ? (event.key === "ArrowLeft" || event.key === "Left") : event.keyCode === KeyCodes.ARROW_LEFT) && !hasModifierKeys(event);
const isRight = (event) => (event.key ? (event.key === "ArrowRight" || event.key === "Right") : event.keyCode === KeyCodes.ARROW_RIGHT) && !hasModifierKeys(event);
const isUp = (event) => (event.key ? (event.key === "ArrowUp" || event.key === "Up") : event.keyCode === KeyCodes.ARROW_UP) && !hasModifierKeys(event);
const isDown = (event) => (event.key ? (event.key === "ArrowDown" || event.key === "Down") : event.keyCode === KeyCodes.ARROW_DOWN) && !hasModifierKeys(event);
const isUpShift = (event) => (event.key ? (event.key === "ArrowUp" || event.key === "Up") : event.keyCode === KeyCodes.ARROW_UP) && checkModifierKeys(event, false, false, true);
const isDownShift = (event) => (event.key ? (event.key === "ArrowDown" || event.key === "Down") : event.keyCode === KeyCodes.ARROW_DOWN) && checkModifierKeys(event, false, false, true);
const isLeftShift = (event) => (event.key ? (event.key === "ArrowLeft" || event.key === "Left") : event.keyCode === KeyCodes.ARROW_LEFT) && checkModifierKeys(event, false, false, true);
const isRightShift = (event) => (event.key ? (event.key === "ArrowRight" || event.key === "Right") : event.keyCode === KeyCodes.ARROW_RIGHT) && checkModifierKeys(event, false, false, true);
const isHome = (event) => (event.key ? event.key === "Home" : event.keyCode === KeyCodes.HOME) && !hasModifierKeys(event);
const isEnd = (event) => (event.key ? event.key === "End" : event.keyCode === KeyCodes.END) && !hasModifierKeys(event);
const isEscape = (event) => (event.key ? event.key === "Escape" || event.key === "Esc" : event.keyCode === KeyCodes.ESCAPE) && !hasModifierKeys(event);
const isTabNext = (event) => (event.key ? event.key === "Tab" : event.keyCode === KeyCodes.TAB) && !hasModifierKeys(event);
const isTabPrevious = (event) => (event.key ? event.key === "Tab" : event.keyCode === KeyCodes.TAB) && checkModifierKeys(event, /* Ctrl */ false, /* Alt */ false, /* Shift */ true);
const isBackSpace = (event) => (event.key ? event.key === "Backspace" : event.keyCode === KeyCodes.BACKSPACE) && !hasModifierKeys(event);
const isDelete = (event) => (event.key ? event.key === "Delete" : event.keyCode === KeyCodes.DELETE) && !hasModifierKeys(event);
const isPageUp = (event) => (event.key ? event.key === "PageUp" : event.keyCode === KeyCodes.PAGE_UP) && !hasModifierKeys(event);
const isPageDown = (event) => (event.key ? event.key === "PageDown" : event.keyCode === KeyCodes.PAGE_DOWN) && !hasModifierKeys(event);
const hasModifierKeys = (event) => event.shiftKey || event.altKey || getCtrlKey(event);
const getCtrlKey = (event) => !!(event.metaKey || event.ctrlKey); // double negation doesn't have effect on boolean but ensures null and undefined are equivalent to false.
const checkModifierKeys = (event, bCtrlKey, bAltKey, bShiftKey) => event.shiftKey === bShiftKey && event.altKey === bAltKey && getCtrlKey(event) === bCtrlKey;

const associatedElements = new WeakMap();
const registeredElements = new WeakMap();
const observerOptions = {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true,
};
const getEffectiveAriaLabelText = (el) => {
    const accessibleEl = el;
    if (!accessibleEl.accessibleNameRef) {
        if (accessibleEl.accessibleName) {
            return accessibleEl.accessibleName;
        }
        return undefined;
    }
    return getAllAccessibleNameRefTexts(el);
};
/**
 *
 * @param {HTMLElement} el Defines the HTMLElement, for which you need to get all related texts
 */
const getAllAccessibleNameRefTexts = (el) => {
    const ids = el.accessibleNameRef?.split(" ") ?? [];
    const owner = el.getRootNode();
    let result = "";
    ids.forEach((elementId, index) => {
        const element = owner.querySelector(`[id='${elementId}']`);
        const text = `${element && element.textContent ? element.textContent : ""}`;
        if (text) {
            result += text;
            if (index < ids.length - 1) {
                result += " ";
            }
        }
    });
    return result;
};
const _getAllAssociatedElementsFromDOM = (el) => {
    const set = new Set();
    // adding labels with attribute for matching the el.id
    const labelsForAssociated = _getAssociatedLabels(el);
    labelsForAssociated.forEach(itm => {
        set.add(itm);
    });
    // adding other elements that id is the same as accessibleNameRef value
    const value = el["accessibleNameRef"];
    const ids = value?.split(" ") ?? [];
    ids.forEach(id => {
        const refEl = _getReferencedElementById(el, id);
        if (refEl) {
            set.add(refEl);
        }
    });
    return Array.from(set);
};
const _getAssociatedLabels = (el) => {
    const labels = el.getRootNode().querySelectorAll(`[for="${el.id}"]`);
    return Array.from(labels);
};
const _getReferencedElementById = (el, elementId) => {
    return el.getRootNode().querySelector(`[id='${elementId}']`);
};
/**
 * @param {HTMLElement} el Defines the HTMLElement, for which you need to get all related "label for" texts
 */
const getAssociatedLabelForTexts = (el) => {
    const results = [];
    const labels = _getAssociatedLabels(el);
    labels.forEach((label) => {
        const labelText = label.textContent;
        labelText && results.push(labelText);
    });
    if (results.length) {
        return results.join(" ");
    }
    return undefined;
};
const _createInvalidationCallback = (el) => {
    const invalidationCallback = (changeInfo) => {
        if (!(changeInfo && changeInfo.type === "property" && changeInfo.name === "accessibleNameRef")) {
            return;
        }
        const registeredElement = registeredElements.get(el);
        if (!registeredElement) {
            return;
        }
        const oldAssociatedElements = registeredElement.observedElements;
        const newAssociatedElements = _getAllAssociatedElementsFromDOM(el);
        oldAssociatedElements.forEach(oldElement => {
            if (!newAssociatedElements.includes(oldElement)) {
                _removeObservedElementFromRegisteredElement(registeredElement, oldElement);
            }
        });
        newAssociatedElements.forEach(newElement => {
            if (!oldAssociatedElements.includes(newElement)) {
                _addObservedElementToRegisteredElement(registeredElement, newElement);
                registeredElement.observedElements.push(newElement);
            }
        });
        registeredElement?.callback();
    };
    return invalidationCallback;
};
const registerUI5Element = (el, callback) => {
    if (registeredElements.has(el)) {
        return;
    }
    const allAssociatedElements = _getAllAssociatedElementsFromDOM(el);
    const invalidationCallback = _createInvalidationCallback(el);
    const registeredElement = {
        host: el,
        observedElements: allAssociatedElements,
        callback,
        invalidationCallback,
    };
    registeredElements.set(el, registeredElement);
    el.attachInvalidate(invalidationCallback);
    allAssociatedElements.forEach((element) => {
        _addObservedElementToRegisteredElement(registeredElement, element);
    });
    callback();
};
const _addObservedElementToRegisteredElement = (registeredElement, element) => {
    let associatedElement = associatedElements.get(element);
    if (!associatedElement) {
        associatedElement = { observer: null, callbacks: [] };
        const observer = new MutationObserver(() => {
            const callbacks = associatedElement.callbacks;
            callbacks.forEach(callback => {
                callback();
            });
            const domEl = document.getElementById(element.id);
            // if no longer should be observed from this registeredElement, remove it
            if (!(registeredElement.host.id === element.getAttribute("for") || domEl)) {
                _removeObservedElementFromRegisteredElement(registeredElement, element);
            }
        });
        associatedElement.observer = observer;
        observer.observe(element, observerOptions);
        associatedElements.set(element, associatedElement);
    }
    if (!associatedElement.callbacks.includes(registeredElement.callback)) {
        associatedElement.callbacks.push(registeredElement.callback);
    }
};
const _removeObservedElementFromRegisteredElement = (registeredElement, element) => {
    const associatedElement = associatedElements.get(element);
    if (associatedElement) {
        associatedElement.callbacks = associatedElement.callbacks.filter(itm => itm !== registeredElement.callback);
        if (!associatedElement.callbacks.length) {
            associatedElement.observer?.disconnect();
            associatedElements.delete(element);
        }
    }
    registeredElement.observedElements = registeredElement.observedElements.filter(itm => itm !== element);
};
const deregisterUI5Element = (el) => {
    const registeredElement = registeredElements.get(el);
    if (!registeredElement) {
        return;
    }
    const oldObservedElements = [...registeredElement.observedElements];
    oldObservedElements.forEach(observedElement => {
        _removeObservedElementFromRegisteredElement(registeredElement, observedElement);
    });
    el.detachInvalidate(registeredElement.invalidationCallback);
    registeredElements.delete(el);
};

const rLocale = /^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i;
class Locale {
    constructor(sLocaleId) {
        const aResult = rLocale.exec(sLocaleId.replace(/_/g, "-"));
        if (aResult === null) {
            throw new Error(`The given language ${sLocaleId} does not adhere to BCP-47.`);
        }
        this.sLocaleId = sLocaleId;
        this.sLanguage = aResult[1] || DEFAULT_LANGUAGE;
        this.sScript = aResult[2] || "";
        this.sRegion = aResult[3] || "";
        this.sVariant = (aResult[4] && aResult[4].slice(1)) || null;
        this.sExtension = (aResult[5] && aResult[5].slice(1)) || null;
        this.sPrivateUse = aResult[6] || null;
        if (this.sLanguage) {
            this.sLanguage = this.sLanguage.toLowerCase();
        }
        if (this.sScript) {
            this.sScript = this.sScript.toLowerCase().replace(/^[a-z]/, s => {
                return s.toUpperCase();
            });
        }
        if (this.sRegion) {
            this.sRegion = this.sRegion.toUpperCase();
        }
    }
    getLanguage() {
        return this.sLanguage;
    }
    getScript() {
        return this.sScript;
    }
    getRegion() {
        return this.sRegion;
    }
    getVariant() {
        return this.sVariant;
    }
    getVariantSubtags() {
        return this.sVariant ? this.sVariant.split("-") : [];
    }
    getExtension() {
        return this.sExtension;
    }
    getExtensionSubtags() {
        return this.sExtension ? this.sExtension.slice(2).split("-") : [];
    }
    getPrivateUse() {
        return this.sPrivateUse;
    }
    getPrivateUseSubtags() {
        return this.sPrivateUse ? this.sPrivateUse.slice(2).split("-") : [];
    }
    hasPrivateUseSubtag(sSubtag) {
        return this.getPrivateUseSubtags().indexOf(sSubtag) >= 0;
    }
    toString() {
        const r = [this.sLanguage];
        if (this.sScript) {
            r.push(this.sScript);
        }
        if (this.sRegion) {
            r.push(this.sRegion);
        }
        if (this.sVariant) {
            r.push(this.sVariant);
        }
        if (this.sExtension) {
            r.push(this.sExtension);
        }
        if (this.sPrivateUse) {
            r.push(this.sPrivateUse);
        }
        return r.join("-");
    }
}

const cache = new Map();
const getLocaleInstance = (lang) => {
    if (!cache.has(lang)) {
        cache.set(lang, new Locale(lang));
    }
    return cache.get(lang);
};
const convertToLocaleOrNull = (lang) => {
    try {
        if (lang && typeof lang === "string") {
            return getLocaleInstance(lang);
        }
    }
    catch (e) {
        // ignore
    }
    return new Locale(DEFAULT_LOCALE);
};
/**
 * Returns the locale based on the parameter or configured language Configuration#getLanguage
 * If no language has been configured - a new locale based on browser language is returned
 */
const getLocale = (lang) => {
    if (lang) {
        return convertToLocaleOrNull(lang);
    }
    const configLanguage = getLanguage();
    if (configLanguage) {
        return getLocaleInstance(configLanguage);
    }
    return convertToLocaleOrNull(detectNavigatorLanguage());
};

const localeRegEX = /^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i;
const SAPSupportabilityLocales = /(?:^|-)(saptrc|sappsd)(?:-|$)/i;
/* Map for old language names for a few ISO639 codes. */
const M_ISO639_NEW_TO_OLD = {
    "he": "iw",
    "yi": "ji",
    "nb": "no",
    "sr": "sh",
};
/**
 * Normalizes the given locale in BCP-47 syntax.
 * @param {string} locale locale to normalize
 * @returns {string} Normalized locale, "undefined" if the locale can't be normalized or the default locale, if no locale provided.
 */
const normalizeLocale = (locale) => {
    let m;
    if (!locale) {
        return DEFAULT_LOCALE;
    }
    if (typeof locale === "string" && (m = localeRegEX.exec(locale.replace(/_/g, "-")))) { /* eslint-disable-line */
        let language = m[1].toLowerCase();
        let region = m[3] ? m[3].toUpperCase() : undefined;
        const script = m[2] ? m[2].toLowerCase() : undefined;
        const variants = m[4] ? m[4].slice(1) : undefined;
        const isPrivate = m[6];
        language = M_ISO639_NEW_TO_OLD[language] || language;
        // recognize and convert special SAP supportability locales (overwrites m[]!)
        if ((isPrivate && (m = SAPSupportabilityLocales.exec(isPrivate))) /* eslint-disable-line */ ||
            (variants && (m = SAPSupportabilityLocales.exec(variants)))) { /* eslint-disable-line */
            return `en_US_${m[1].toLowerCase()}`; // for now enforce en_US (agreed with SAP SLS)
        }
        // Chinese: when no region but a script is specified, use default region for each script
        if (language === "zh" && !region) {
            if (script === "hans") {
                region = "CN";
            }
            else if (script === "hant") {
                region = "TW";
            }
        }
        return language + (region ? "_" + region + (variants ? "_" + variants.replace("-", "_") : "") : ""); /* eslint-disable-line */
    }
    return DEFAULT_LOCALE;
};

/**
 * Calculates the next fallback locale for the given locale.
 *
 * @param {string} locale Locale string in Java format (underscores) or null
 * @returns {string} Next fallback Locale or "en" if no fallbacks found.
 */
const nextFallbackLocale = (locale) => {
    if (!locale) {
        return DEFAULT_LOCALE;
    }
    if (locale === "zh_HK") {
        return "zh_TW";
    }
    // if there are multiple segments (separated by underscores), remove the last one
    const p = locale.lastIndexOf("_");
    if (p >= 0) {
        return locale.slice(0, p);
    }
    // for any language but the default, fallback to the default first before falling back to the 'raw' language (empty string)
    return locale !== DEFAULT_LOCALE ? DEFAULT_LOCALE : "";
};

// contains package names for which the warning has been shown
const warningShown = new Set();
const reportedErrors = new Set();
const bundleData = new Map();
const bundlePromises = new Map();
const loaders$1 = new Map();
const _setI18nBundleData = (packageName, data) => {
    bundleData.set(packageName, data);
};
const getI18nBundleData = (packageName) => {
    return bundleData.get(packageName);
};
const _hasLoader = (packageName, localeId) => {
    const bundleKey = `${packageName}/${localeId}`;
    return loaders$1.has(bundleKey);
};
// load bundle over the network once
const _loadMessageBundleOnce = (packageName, localeId) => {
    const bundleKey = `${packageName}/${localeId}`;
    const loadMessageBundle = loaders$1.get(bundleKey);
    if (loadMessageBundle && !bundlePromises.get(bundleKey)) {
        bundlePromises.set(bundleKey, loadMessageBundle(localeId));
    }
    return bundlePromises.get(bundleKey); // Investigate if i18n loader exists and this won't return undefined.
};
const _showAssetsWarningOnce = (packageName) => {
    if (!warningShown.has(packageName)) {
        console.warn(`[${packageName}]: Message bundle assets are not configured. Falling back to English texts.`, /* eslint-disable-line */ ` Add \`import "${packageName}/dist/Assets.js"\` in your bundle and make sure your build tool supports dynamic imports and JSON imports. See section "Assets" in the documentation for more information.`); /* eslint-disable-line */
        warningShown.add(packageName);
    }
};
const useFallbackBundle = (packageName, localeId) => {
    return localeId !== DEFAULT_LANGUAGE && !_hasLoader(packageName, localeId);
};
/**
 * This method preforms the asynchronous task of fetching the actual text resources. It will fetch
 * each text resource over the network once (even for multiple calls to the same method).
 * It should be fully finished before the i18nBundle class is created in the webcomponents.
 * This method uses the bundle URLs that are populated by the <code>registerI18nBundle</code> method.
 * To simplify the usage, the synchronization of both methods happens internally for the same <code>bundleId</code>
 * @param {packageName} packageName the NPM package name
 * @public
 */
const fetchI18nBundle = async (packageName) => {
    const language = getLocale().getLanguage();
    const region = getLocale().getRegion();
    const variant = getLocale().getVariant();
    let localeId = language + (region ? `-${region}` : ``) + (variant ? `-${variant}` : ``);
    if (useFallbackBundle(packageName, localeId)) {
        localeId = normalizeLocale(localeId);
        while (useFallbackBundle(packageName, localeId)) {
            localeId = nextFallbackLocale(localeId);
        }
    }
    // use default language unless configured to always fetch it from the network
    const fetchDefaultLanguage = getFetchDefaultLanguage();
    if (localeId === DEFAULT_LANGUAGE && !fetchDefaultLanguage) {
        _setI18nBundleData(packageName, null); // reset for the default language (if data was set for a previous language)
        return;
    }
    if (!_hasLoader(packageName, localeId)) {
        _showAssetsWarningOnce(packageName);
        return;
    }
    try {
        const data = await _loadMessageBundleOnce(packageName, localeId);
        _setI18nBundleData(packageName, data);
    }
    catch (error) {
        const e = error;
        if (!reportedErrors.has(e.message)) {
            reportedErrors.add(e.message);
            console.error(e.message); /* eslint-disable-line */
        }
    }
};
// When the language changes dynamically (the user calls setLanguage), re-fetch all previously fetched bundles
attachLanguageChange((lang /* eslint-disable-line */) => {
    const allPackages = [...bundleData.keys()];
    return Promise.all(allPackages.map(fetchI18nBundle));
});

const messageFormatRegEX = /('')|'([^']+(?:''[^']*)*)(?:'|$)|\{([0-9]+(?:\s*,[^{}]*)?)\}|[{}]/g;
const formatMessage = (text, values) => {
    values = values || [];
    return text.replace(messageFormatRegEX, ($0, $1, $2, $3, offset) => {
        if ($1) {
            return '\''; /* eslint-disable-line */
        }
        if ($2) {
            return $2.replace(/''/g, '\''); /* eslint-disable-line */
        }
        if ($3) {
            const ind = typeof $3 === "string" ? parseInt($3) : $3;
            return String(values[ind]);
        }
        throw new Error(`[i18n]: pattern syntax error at pos ${offset}`);
    });
};

const I18nBundleInstances = new Map();
/**
 * @class
 * @public
 */
class I18nBundle {
    constructor(packageName) {
        this.packageName = packageName;
    }
    /**
     * Returns a text in the currently loaded language
     *
     * @public
     * @param {Object|String} textObj key/defaultText pair or just the key
     * @param params Values for the placeholders
     * @returns {string}
     */
    getText(textObj, ...params) {
        if (typeof textObj === "string") {
            textObj = { key: textObj, defaultText: textObj };
        }
        if (!textObj || !textObj.key) {
            return "";
        }
        const bundle = getI18nBundleData(this.packageName);
        if (bundle && !bundle[textObj.key]) {
            // eslint-disable-next-line no-console
            console.warn(`Key ${textObj.key} not found in the i18n bundle, the default text will be used`);
        }
        const messageText = bundle && bundle[textObj.key] ? bundle[textObj.key] : (textObj.defaultText || textObj.key);
        return formatMessage(messageText, params);
    }
}
/**
 * Returns the I18nBundle instance for the given package synchronously.
 *
 * @public
 * @param packageName
 * @returns { I18nBundle }
 */
const getI18nBundleSync = (packageName) => {
    if (I18nBundleInstances.has(packageName)) {
        return I18nBundleInstances.get(packageName);
    }
    const i18nBundle = new I18nBundle(packageName);
    I18nBundleInstances.set(packageName, i18nBundle);
    return i18nBundle;
};
/**
 * Fetches and returns the I18nBundle instance for the given package.
 *
 * @public
 * @param packageName
 * @returns { Promise<I18nBundle> }
 */
const getI18nBundle = async (packageName) => {
    await fetchI18nBundle(packageName);
    return getI18nBundleSync(packageName);
};

const markedEvents = new WeakMap();
/**
 * Marks the given event with random marker.
 */
const markEvent = (event, value) => {
    markedEvents.set(event, value);
};
/**
 * Returns the marker for the given event.
 */
const getEventMark = (event) => {
    return markedEvents.get(event);
};

/**
 * Supported icon collection aliases.
 *
 * Users might specify a collection, using both the key and the value in the following key-value pairs,
 * e.g the following pairs are completely exchangeable:
 *
 * - "SAP-icons/accept" and "SAP-icons-v4/accept"
 * - "horizon/accept" and "SAP-icons-v5/accept"
 * - "SAP-icons-TNT/actor" and "tnt/actor"
 * - "BusinessSuiteInAppSymbols/3d" and "business-suite/3d"
 */
var IconCollectionsAlias;
(function (IconCollectionsAlias) {
    IconCollectionsAlias["SAP-icons"] = "SAP-icons-v4";
    IconCollectionsAlias["horizon"] = "SAP-icons-v5";
    IconCollectionsAlias["SAP-icons-TNT"] = "tnt";
    IconCollectionsAlias["BusinessSuiteInAppSymbols"] = "business-suite";
})(IconCollectionsAlias || (IconCollectionsAlias = {}));
/**
 * Returns the collection name for a given alias:
 *
 * - "SAP-icons-TNT"resolves to "tnt"
 * - "BusinessSuiteInAppSymbols" resolves to "business-suite"
 * - "horizon" resolves to "SAP-icons-v5"
 *
 * @param { string } collectionName
 * @return { string } the normalized collection name
 */
const getIconCollectionByAlias = (collectionName) => {
    if (IconCollectionsAlias[collectionName]) {
        return IconCollectionsAlias[collectionName];
    }
    return collectionName;
};

var RegisteredIconCollection;
(function (RegisteredIconCollection) {
    RegisteredIconCollection["SAPIconsV4"] = "SAP-icons-v4";
    RegisteredIconCollection["SAPIconsV5"] = "SAP-icons-v5";
    RegisteredIconCollection["SAPIconsTNTV2"] = "tnt-v2";
    RegisteredIconCollection["SAPIconsTNTV3"] = "tnt-v3";
    RegisteredIconCollection["SAPBSIconsV1"] = "business-suite-v1";
    RegisteredIconCollection["SAPBSIconsV2"] = "business-suite-v2";
})(RegisteredIconCollection || (RegisteredIconCollection = {}));
const iconCollections = new Map();
iconCollections.set("SAP-icons", {
    "legacy": RegisteredIconCollection.SAPIconsV4,
    "sap_horizon": RegisteredIconCollection.SAPIconsV5,
});
iconCollections.set("tnt", {
    "legacy": RegisteredIconCollection.SAPIconsTNTV2,
    "sap_horizon": RegisteredIconCollection.SAPIconsTNTV3,
});
iconCollections.set("business-suite", {
    "legacy": RegisteredIconCollection.SAPBSIconsV1,
    "sap_horizon": RegisteredIconCollection.SAPBSIconsV2,
});
/**
 * Registers collection version per theme.
 * </b>For exmaple:</b> registerIconCollectionForTheme("my-custom-icons", {"sap_horizon": "my-custom-icons-v5"})
 * @param { string } collectionName
 * @param { ThemeToCollectionMap } themeCollectionMap
 */
const registerIconCollectionForTheme = (collectionName, themeCollectionMap) => {
    if (iconCollections.has(collectionName)) {
        iconCollections.set(collectionName, { ...themeCollectionMap, ...iconCollections.get(collectionName) });
        return;
    }
    iconCollections.set(collectionName, themeCollectionMap);
};
const getIconCollectionForTheme = (collectionName) => {
    const themeFamily = isLegacyThemeFamily() ? "legacy" : "sap_horizon";
    return iconCollections.has(collectionName) ? iconCollections.get(collectionName)[themeFamily] : collectionName;
};

const IconCollectionConfiguration = new Map();
/**
 * Returns the configured default icon collection for a given theme.
 *
 * @param { string } theme
 * @public
 * @returns { string | undefined }
 */
const getDefaultIconCollection = (theme) => {
    return IconCollectionConfiguration.get(theme);
};

/**
 * Returns the effective theme dependant icon collection:
 *
 * - "no collection" resolves to "SAP-icons-v4" in "Quartz" and "Belize", and to "SAP-icons-v5" in "Horizon"
 * - "tnt" (and its alias "SAP-icons-TNT") resolves to "tnt-v2" in "Quartz", "Belize", and resolves to "tnt-v3" in "Horizon"
 * - "business-suite" (and its alias "BusinessSuiteInAppSymbols") resolves to "business-suite-v1" in "Quartz", "Belize", and resolves to "business-suite-v2" in "Horizon"
 *
 * @param { IconCollection } collectionName
 * @returns { IconCollection } the effective collection name
 */
const getEffectiveIconCollection = (collectionName) => {
    const defaultIconCollection = getDefaultIconCollection(getTheme());
    // no collection + default collection, configured via setDefaultIconCollection - return the configured icon collection.
    if (!collectionName && defaultIconCollection) {
        return getIconCollectionByAlias(defaultIconCollection);
    }
    // no collection - return "SAP-icons-v4" or  "SAP-icons-v5".
    if (!collectionName) {
        return getIconCollectionForTheme("SAP-icons");
    }
    // has collection - return "SAP-icons-v4", "SAP-icons-v5", "tnt-v1", "tnt-v2", "business-suite-v1", "business-suite-v2", or custom ones.
    return getIconCollectionForTheme(collectionName);
};

const DEFAULT_THEME_FAMILY = "legacy"; // includes sap_belize_* and sap_fiori_*
const loaders = new Map();
const registry = getSharedResource("SVGIcons.registry", new Map());
const iconCollectionPromises = getSharedResource("SVGIcons.promises", new Map());
const ICON_NOT_FOUND$1 = "ICON_NOT_FOUND";
const _loadIconCollectionOnce = async (collectionName) => {
    if (!iconCollectionPromises.has(collectionName)) {
        if (!loaders.has(collectionName)) {
            throw new Error(`No loader registered for the ${collectionName} icons collection. Probably you forgot to import the "AllIcons.js" module for the respective package.`);
        }
        const loadIcons = loaders.get(collectionName);
        iconCollectionPromises.set(collectionName, loadIcons(collectionName));
    }
    return iconCollectionPromises.get(collectionName);
};
const _fillRegistry = (bundleData) => {
    Object.keys(bundleData.data).forEach(iconName => {
        const iconData = bundleData.data[iconName];
        registerIcon(iconName, {
            pathData: (iconData.path || iconData.paths),
            ltr: iconData.ltr,
            accData: iconData.acc,
            collection: bundleData.collection,
            packageName: bundleData.packageName,
        });
    });
};
// set
const registerIcon = (name, iconData) => {
    const key = `${iconData.collection}/${name}`;
    registry.set(key, {
        pathData: iconData.pathData,
        ltr: iconData.ltr,
        accData: iconData.accData,
        packageName: iconData.packageName,
        customTemplate: iconData.customTemplate,
        viewBox: iconData.viewBox,
        collection: iconData.collection,
    });
};
/**
 * Processes the full icon name and splits it into - "name", "collection".
 * - removes legacy protocol ("sap-icon://")
 * - resolves aliases (f.e "SAP-icons-TNT/actor" => "tnt/actor")
 *
 * @param { string } name
 * @return { object }
 */
const processName = (name) => {
    // silently support ui5-compatible URIs
    if (name.startsWith("sap-icon://")) {
        name = name.replace("sap-icon://", "");
    }
    let collection;
    [name, collection] = name.split("/").reverse();
    name = name.replace("icon-", "");
    if (collection) {
        collection = getIconCollectionByAlias(collection);
    }
    return { name, collection };
};
const getIconDataSync = (iconName) => {
    const { name, collection } = processName(iconName);
    return getRegisteredIconData(collection, name);
};
const getIconData = async (iconName) => {
    const { name, collection } = processName(iconName);
    let iconData = ICON_NOT_FOUND$1;
    try {
        iconData = (await _loadIconCollectionOnce(getEffectiveIconCollection(collection)));
    }
    catch (error) {
        const e = error;
        console.error(e.message); /* eslint-disable-line */
    }
    if (iconData === ICON_NOT_FOUND$1) {
        return iconData;
    }
    const registeredIconData = getRegisteredIconData(collection, name);
    if (registeredIconData) {
        return registeredIconData;
    }
    // not filled by another await. many getters will await on the same loader, but fill only once
    if (Array.isArray(iconData)) {
        iconData.forEach(data => {
            _fillRegistry(data);
            registerIconCollectionForTheme(collection, { [data.themeFamily || DEFAULT_THEME_FAMILY]: data.collection });
        });
    }
    else {
        _fillRegistry(iconData);
    }
    return getRegisteredIconData(collection, name);
};
const getRegisteredIconData = (collection, name) => {
    const registryKey = `${getEffectiveIconCollection(collection)}/${name}`;
    return registry.get(registryKey);
};
/**
 * Returns the accessible name for the given icon,
 * or undefined if accessible name is not present.
 *
 * @param { string } name
 * @return { Promise }
 */
const getIconAccessibleName = async (name) => {
    if (!name) {
        return;
    }
    let iconData = getIconDataSync(name);
    if (!iconData) {
        iconData = await getIconData(name);
    }
    if (iconData && iconData !== ICON_NOT_FOUND$1 && iconData.accData) {
        const i18nBundle = await getI18nBundle(iconData.packageName);
        return i18nBundle.getText(iconData.accData);
    }
};

const willShowContent = (childNodes) => {
    return Array.from(childNodes).filter(node => {
        return node.nodeType !== Node.COMMENT_NODE && (node.nodeType !== Node.TEXT_NODE || (node.nodeValue || "").trim().length !== 0);
    }).length > 0;
};

/**
 * Different Button designs.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.ButtonDesign
 */
var ButtonDesign;
(function (ButtonDesign) {
    /**
     * default type (no special styling)
     * @public
     * @type {Default}
     */
    ButtonDesign["Default"] = "Default";
    /**
     * accept type (green button)
     * @public
     * @type {Positive}
     */
    ButtonDesign["Positive"] = "Positive";
    /**
     * reject style (red button)
     * @public
     * @type {Negative}
     */
    ButtonDesign["Negative"] = "Negative";
    /**
     * transparent type
     * @public
     * @type {Transparent}
     */
    ButtonDesign["Transparent"] = "Transparent";
    /**
     * emphasized type
     * @public
     * @type {Emphasized}
     */
    ButtonDesign["Emphasized"] = "Emphasized";
    /**
     * attention type
     * @public
     * @type {Attention}
     */
    ButtonDesign["Attention"] = "Attention";
})(ButtonDesign || (ButtonDesign = {}));
var ButtonDesign$1 = ButtonDesign;

/**
 * Determines if the button has special form-related functionality.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.ButtonType
 */
var ButtonType;
(function (ButtonType) {
    /**
     * The button does not do anything special when inside a form
     * @public
     * @type {Button}
     */
    ButtonType["Button"] = "Button";
    /**
     * The button acts as a submit button (submits a form)
     * @public
     * @type {Submit}
     */
    ButtonType["Submit"] = "Submit";
    /**
     * The button acts as a reset button (resets a form)
     * @public
     * @type {Reset}
     */
    ButtonType["Reset"] = "Reset";
})(ButtonType || (ButtonType = {}));
var ButtonType$1 = ButtonType;

/* eslint no-unused-vars: 0 */
function block0$n(context, tags, suffix) { return effectiveHtml `<button type="button" class="ui5-button-root" ?disabled="${this.disabled}" data-sap-focus-ref  @focusout=${this._onfocusout} @focusin=${this._onfocusin} @click=${this._onclick} @mousedown=${this._onmousedown} @mouseup=${this._onmouseup} @keydown=${this._onkeydown} @keyup=${this._onkeyup} @touchstart="${this._ontouchstart}" @touchend="${this._ontouchend}" tabindex=${l$1(this.tabIndexValue)} aria-expanded="${l$1(this.accessibilityAttributes.expanded)}" aria-controls="${l$1(this.accessibilityAttributes.controls)}" aria-haspopup="${l$1(this.accessibilityAttributes.hasPopup)}" aria-label="${l$1(this.ariaLabelText)}" title="${l$1(this.buttonTitle)}" part="button">${this.icon ? block1$i.call(this, context, tags, suffix) : undefined}<span id="${l$1(this._id)}-content" class="ui5-button-text"><bdi><slot></slot></bdi></span>${this.hasButtonType ? block2$g.call(this, context, tags, suffix) : undefined}</button> `; }
function block1$i(context, tags, suffix) { return suffix ? effectiveHtml `<${scopeTag("ui5-icon", tags, suffix)} class="ui5-button-icon" name="${l$1(this.icon)}" accessible-role="${l$1(this.iconRole)}" part="icon" ?show-tooltip=${this.showIconTooltip}></${scopeTag("ui5-icon", tags, suffix)}>` : effectiveHtml `<ui5-icon class="ui5-button-icon" name="${l$1(this.icon)}" accessible-role="${l$1(this.iconRole)}" part="icon" ?show-tooltip=${this.showIconTooltip}></ui5-icon>`; }
function block2$g(context, tags, suffix) { return effectiveHtml `<span class="ui5-hidden-text">${l$1(this.buttonTypeText)}</span>`; }

/* eslint no-unused-vars: 0 */
function block0$m(context, tags, suffix) { return effectiveHtml `<svg class="ui5-icon-root" part="root" tabindex="${l$1(this._tabIndex)}" dir="${l$1(this._dir)}" viewBox="${l$1(this.viewBox)}" role="${l$1(this.effectiveAccessibleRole)}" focusable="false" preserveAspectRatio="xMidYMid meet" aria-label="${l$1(this.effectiveAccessibleName)}" aria-hidden=${l$1(this.effectiveAriaHidden)} xmlns="http://www.w3.org/2000/svg" @focusin=${this._onfocusin} @focusout=${this._onfocusout} @keydown=${this._onkeydown} @keyup=${this._onkeyup}>${blockSVG1$2.call(this, context, tags, suffix)}</svg>`; }
function block1$h(context, tags, suffix) { return effectiveSvg `<title id="${l$1(this._id)}-tooltip">${l$1(this.effectiveAccessibleName)}</title>`; }
function block2$f(context, tags, suffix) { return effectiveSvg `${l$1(this.customSvg)}`; }
function block3$d(context, tags, suffix, item, index) { return effectiveSvg `<path d="${l$1(item)}"></path>`; }
function blockSVG1$2(context, tags, suffix) {
    return effectiveSvg `${this.hasIconTooltip ? block1$h.call(this, context, tags, suffix) : undefined}<g role="presentation">${this.customSvg ? block2$f.call(this, context, tags, suffix) : undefined}${c(this.pathData, (item, index) => item._id || index, (item, index) => block3$d.call(this, context, tags, suffix, item, index))}</g>`;
}

/**
 * Different Icon semantic designs.
*
* @readonly
* @enum {string}
* @public
* @author SAP SE
* @alias sap.ui.webc.main.types.IconDesign
*/
var IconDesign;
(function (IconDesign) {
    /**
     * Contrast design
     * @public
     * @type {Contrast}
     */
    IconDesign["Contrast"] = "Contrast";
    /**
     * Critical design
     * @public
     * @type {Critical}
     */
    IconDesign["Critical"] = "Critical";
    /**
     * Default design (brand design)
     * @public
     * @type {Default}
    */
    IconDesign["Default"] = "Default";
    /**
     * info type
     * @public
     * @type {Information}
     */
    IconDesign["Information"] = "Information";
    /**
     * Negative design
     * @public
     * @type {Negative}
     */
    IconDesign["Negative"] = "Negative";
    /**
     * Neutral design
     * @public
     * @type {Neutral}
     */
    IconDesign["Neutral"] = "Neutral";
    /**
     * Design that indicates an icon which isn't interactive
     * @public
     * @type {NonInteractive}
     */
    IconDesign["NonInteractive"] = "NonInteractive";
    /**
     * Positive design
     * @public
     * @type {Positive}
     */
    IconDesign["Positive"] = "Positive";
})(IconDesign || (IconDesign = {}));
var IconDesign$1 = IconDesign;

const styleData$w = { packageName: "@ui5/webcomponents-theming", fileName: "themes/sap_horizon/parameters-bundle.css.ts", content: `:root{--sapThemeMetaData-Base-baseLib:{"Path": "Base.baseLib.sap_horizon.css_variables","PathPattern": "/%frameworkId%/%libId%/%themeId%/%fileId%.css","Extends": ["baseTheme"],"Tags": ["Fiori_3","LightColorScheme"],"FallbackThemeId": "sap_fiori_3","Engine":{"Name": "theming-engine","Version": "1.23061.0"},"Version":{"Build": "11.9.0.20231102110441","Source": "11.9.0"}};--sapBrandColor: #0070f2;--sapHighlightColor: #0064d9;--sapBaseColor: #fff;--sapShellColor: #fff;--sapBackgroundColor: #f5f6f7;--sapFontFamily: "72", "72full", Arial, Helvetica, sans-serif;--sapFontSize: .875rem;--sapTextColor: #1d2d3e;--sapLinkColor: #0064d9;--sapCompanyLogo: none;--sapBackgroundImage: none;--sapBackgroundImageOpacity: 1;--sapBackgroundImageRepeat: false;--sapSelectedColor: #0064d9;--sapHoverColor: #eaecee;--sapActiveColor: #dee2e5;--sapHighlightTextColor: #fff;--sapTitleColor: #1d2d3e;--sapNegativeColor: #aa0808;--sapCriticalColor: #e76500;--sapPositiveColor: #256f3a;--sapInformativeColor: #0070f2;--sapNeutralColor: #788fa6;--sapNegativeElementColor: #f53232;--sapCriticalElementColor: #e76500;--sapPositiveElementColor: #30914c;--sapInformativeElementColor: #0070f2;--sapNeutralElementColor: #788fa6;--sapNegativeTextColor: #aa0808;--sapCriticalTextColor: #b44f00;--sapPositiveTextColor: #256f3a;--sapInformativeTextColor: #0064d9;--sapNeutralTextColor: #1d2d3e;--sapErrorColor: #aa0808;--sapWarningColor: #e76500;--sapSuccessColor: #256f3a;--sapInformationColor: #0070f2;--sapErrorBackground: #ffeaf4;--sapWarningBackground: #fff8d6;--sapSuccessBackground: #f5fae5;--sapInformationBackground: #e1f4ff;--sapNeutralBackground: #eff1f2;--sapErrorBorderColor: #e90b0b;--sapWarningBorderColor: #dd6100;--sapSuccessBorderColor: #30914c;--sapInformationBorderColor: #0070f2;--sapNeutralBorderColor: #788fa6;--sapElement_LineHeight: 2.75rem;--sapElement_Height: 2.25rem;--sapElement_BorderWidth: .0625rem;--sapElement_BorderCornerRadius: .75rem;--sapElement_Compact_LineHeight: 2rem;--sapElement_Compact_Height: 1.625rem;--sapElement_Condensed_LineHeight: 1.5rem;--sapElement_Condensed_Height: 1.375rem;--sapContent_LineHeight: 1.5;--sapContent_IconHeight: 1rem;--sapContent_IconColor: #1d2d3e;--sapContent_ContrastIconColor: #fff;--sapContent_NonInteractiveIconColor: #758ca4;--sapContent_MarkerIconColor: #5d36ff;--sapContent_MarkerTextColor: #046c7a;--sapContent_MeasureIndicatorColor: #556b81;--sapContent_Selected_MeasureIndicatorColor: #0064d9;--sapContent_Placeholderloading_Background: #ccc;--sapContent_Placeholderloading_Gradient: linear-gradient(to right, #ccc 0%, #ccc 20%, #999 50%, #ccc 80%, #ccc 100%);--sapContent_ImagePlaceholderBackground: #eaecee;--sapContent_ImagePlaceholderForegroundColor: #5b738b;--sapContent_RatedColor: #d27700;--sapContent_UnratedColor: #758ca4;--sapContent_BusyColor: #0064d9;--sapContent_FocusColor: #0032a5;--sapContent_FocusStyle: solid;--sapContent_FocusWidth: .125rem;--sapContent_ContrastFocusColor: #fff;--sapContent_ShadowColor: #223548;--sapContent_ContrastShadowColor: #fff;--sapContent_Shadow0: 0 0 .125rem 0 rgba(34,53,72,.2), 0 .125rem .25rem 0 rgba(34,53,72,.2);--sapContent_Shadow1: 0 0 0 .0625rem rgba(34,53,72,.48), 0 .125rem .5rem 0 rgba(34,53,72,.3);--sapContent_Shadow2: 0 0 0 .0625rem rgba(34,53,72,.48), 0 .625rem 1.875rem 0 rgba(34,53,72,.25);--sapContent_Shadow3: 0 0 0 .0625rem rgba(34,53,72,.48), 0 1.25rem 5rem 0 rgba(34,53,72,.25);--sapContent_TextShadow: 0 0 .125rem #fff;--sapContent_ContrastTextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapContent_HeaderShadow: 0 .125rem .125rem 0 rgba(34,53,72,.05), inset 0 -.0625rem 0 0 #d9d9d9;--sapContent_Interaction_Shadow: inset 0 0 0 .0625rem rgba(85,107,129,.25);--sapContent_Selected_Shadow: inset 0 0 0 .0625rem rgba(79,160,255,.5);--sapContent_Negative_Shadow: inset 0 0 0 .0625rem rgba(255,142,196,.45);--sapContent_Critical_Shadow: inset 0 0 0 .0625rem rgba(255,213,10,.4);--sapContent_Positive_Shadow: inset 0 0 0 .0625rem rgba(48,145,76,.18);--sapContent_Informative_Shadow: inset 0 0 0 .0625rem rgba(104,174,255,.5);--sapContent_Neutral_Shadow: inset 0 0 0 .0625rem rgba(120,143,166,.3);--sapContent_SearchHighlightColor: #dafdf5;--sapContent_HelpColor: #188918;--sapContent_LabelColor: #556b82;--sapContent_MonospaceFontFamily: "72Mono", "72Monofull", lucida console, monospace;--sapContent_MonospaceBoldFontFamily: "72Mono-Bold", "72Mono-Boldfull", lucida console, monospace;--sapContent_IconFontFamily: "SAP-icons";--sapContent_DisabledTextColor: rgba(29,45,62,.6);--sapContent_DisabledOpacity: .4;--sapContent_ContrastTextThreshold: .65;--sapContent_ContrastTextColor: #fff;--sapContent_ForegroundColor: #efefef;--sapContent_ForegroundBorderColor: #758ca4;--sapContent_ForegroundTextColor: #1d2d3e;--sapContent_BadgeBackground: #aa0808;--sapContent_BadgeTextColor: #fff;--sapContent_DragAndDropActiveColor: #0064d9;--sapContent_Selected_TextColor: #0064d9;--sapContent_Selected_Background: #fff;--sapContent_Selected_Hover_Background: #e3f0ff;--sapContent_Selected_ForegroundColor: #0064d9;--sapContent_ForcedColorAdjust: none;--sapContent_Illustrative_Color1: #5d36ff;--sapContent_Illustrative_Color2: #0070f2;--sapContent_Illustrative_Color3: #f58b00;--sapContent_Illustrative_Color4: #00144a;--sapContent_Illustrative_Color5: #a9b4be;--sapContent_Illustrative_Color6: #d5dadd;--sapContent_Illustrative_Color7: #ebf8ff;--sapContent_Illustrative_Color8: #fff;--sapContent_Illustrative_Color9: #64edd2;--sapContent_Illustrative_Color10: #ebf8ff;--sapContent_Illustrative_Color11: #f31ded;--sapContent_Illustrative_Color12: #00a800;--sapContent_Illustrative_Color13: #005dc9;--sapContent_Illustrative_Color14: #004da5;--sapContent_Illustrative_Color15: #cc7400;--sapContent_Illustrative_Color16: #3b0ac6;--sapContent_Illustrative_Color17: #00a58a;--sapContent_Illustrative_Color18: #d1efff;--sapContent_Illustrative_Color19: #b8e6ff;--sapContent_Illustrative_Color20: #9eddff;--sapFontLightFamily: "72-Light", "72-Lightfull", "72", "72full", Arial, Helvetica, sans-serif;--sapFontBoldFamily: "72-Bold", "72-Boldfull", "72", "72full", Arial, Helvetica, sans-serif;--sapFontSemiboldFamily: "72-Semibold", "72-Semiboldfull", "72", "72full", Arial, Helvetica, sans-serif;--sapFontSemiboldDuplexFamily: "72-SemiboldDuplex", "72-SemiboldDuplexfull", "72", "72full", Arial, Helvetica, sans-serif;--sapFontBlackFamily: "72Black", "72Blackfull","72", "72full", Arial, Helvetica, sans-serif;--sapFontHeaderFamily: "72-Bold", "72-Boldfull", "72", "72full", Arial, Helvetica, sans-serif;--sapFontSmallSize: .75rem;--sapFontLargeSize: 1rem;--sapFontHeader1Size: 3rem;--sapFontHeader2Size: 2rem;--sapFontHeader3Size: 1.5rem;--sapFontHeader4Size: 1.25rem;--sapFontHeader5Size: 1rem;--sapFontHeader6Size: .875rem;--sapLink_TextDecoration: none;--sapLink_Hover_Color: #0064d9;--sapLink_Hover_TextDecoration: underline;--sapLink_Active_Color: #0064d9;--sapLink_Active_TextDecoration: none;--sapLink_Visited_Color: #0064d9;--sapLink_InvertedColor: #a6cfff;--sapLink_SubtleColor: #1d2d3e;--sapShell_Background: #eff1f2;--sapShell_BackgroundImage: linear-gradient(to bottom, #eff1f2, #eff1f2);--sapShell_BackgroundImageOpacity: 1;--sapShell_BackgroundImageRepeat: false;--sapShell_BorderColor: #fff;--sapShell_TextColor: #1d2d3e;--sapShell_InteractiveBackground: #eff1f2;--sapShell_InteractiveTextColor: #1d2d3e;--sapShell_InteractiveBorderColor: #556b81;--sapShell_GroupTitleTextColor: #1d2d3e;--sapShell_GroupTitleTextShadow: 0 0 .125rem #fff;--sapShell_Hover_Background: #fff;--sapShell_Active_Background: #fff;--sapShell_Active_TextColor: #0070f2;--sapShell_Selected_Background: #fff;--sapShell_Selected_TextColor: #0070f2;--sapShell_Selected_Hover_Background: #fff;--sapShell_Favicon: none;--sapShell_Navigation_Background: #fff;--sapShell_Navigation_Hover_Background: #fff;--sapShell_Navigation_SelectedColor: #0064d9;--sapShell_Navigation_Selected_TextColor: #0064d9;--sapShell_Navigation_TextColor: #1d2d3e;--sapShell_Navigation_Active_TextColor: #0064d9;--sapShell_Navigation_Active_Background: #fff;--sapShell_Shadow: 0 .125rem .125rem 0 rgba(34,53,72,.15), inset 0 -.0625rem 0 0 rgba(34,53,72,.2);--sapShell_NegativeColor: #aa0808;--sapShell_CriticalColor: #b44f00;--sapShell_PositiveColor: #256f3a;--sapShell_InformativeColor: #0064d9;--sapShell_NeutralColor: #1d2d3e;--sapShell_Category_1_Background: #0057d2;--sapShell_Category_1_BorderColor: #0057d2;--sapShell_Category_1_TextColor: #fff;--sapShell_Category_1_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_2_Background: #df1278;--sapShell_Category_2_BorderColor: #df1278;--sapShell_Category_2_TextColor: #fff;--sapShell_Category_2_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_3_Background: #e76500;--sapShell_Category_3_BorderColor: #e76500;--sapShell_Category_3_TextColor: #fff;--sapShell_Category_3_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_4_Background: #7800a4;--sapShell_Category_4_BorderColor: #7800a4;--sapShell_Category_4_TextColor: #fff;--sapShell_Category_4_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_5_Background: #aa2608;--sapShell_Category_5_BorderColor: #aa2608;--sapShell_Category_5_TextColor: #fff;--sapShell_Category_5_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_6_Background: #07838f;--sapShell_Category_6_BorderColor: #07838f;--sapShell_Category_6_TextColor: #fff;--sapShell_Category_6_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_7_Background: #f31ded;--sapShell_Category_7_BorderColor: #f31ded;--sapShell_Category_7_TextColor: #fff;--sapShell_Category_7_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_8_Background: #188918;--sapShell_Category_8_BorderColor: #188918;--sapShell_Category_8_TextColor: #fff;--sapShell_Category_8_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_9_Background: #002a86;--sapShell_Category_9_BorderColor: #002a86;--sapShell_Category_9_TextColor: #fff;--sapShell_Category_9_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_10_Background: #5b738b;--sapShell_Category_10_BorderColor: #5b738b;--sapShell_Category_10_TextColor: #fff;--sapShell_Category_10_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_11_Background: #d20a0a;--sapShell_Category_11_BorderColor: #d20a0a;--sapShell_Category_11_TextColor: #fff;--sapShell_Category_11_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_12_Background: #7858ff;--sapShell_Category_12_BorderColor: #7858ff;--sapShell_Category_12_TextColor: #fff;--sapShell_Category_12_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_13_Background: #a00875;--sapShell_Category_13_BorderColor: #a00875;--sapShell_Category_13_TextColor: #fff;--sapShell_Category_13_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_14_Background: #14565b;--sapShell_Category_14_BorderColor: #14565b;--sapShell_Category_14_TextColor: #fff;--sapShell_Category_14_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_15_Background: #223548;--sapShell_Category_15_BorderColor: #223548;--sapShell_Category_15_TextColor: #fff;--sapShell_Category_15_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_16_Background: #1e592f;--sapShell_Category_16_BorderColor: #1e592f;--sapShell_Category_16_TextColor: #fff;--sapShell_Category_16_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapAvatar_1_Background: #fff3b8;--sapAvatar_1_BorderColor: #fff3b8;--sapAvatar_1_TextColor: #a45d00;--sapAvatar_2_Background: #ffd0e7;--sapAvatar_2_BorderColor: #ffd0e7;--sapAvatar_2_TextColor: #aa0808;--sapAvatar_3_Background: #ffdbe7;--sapAvatar_3_BorderColor: #ffdbe7;--sapAvatar_3_TextColor: #ba066c;--sapAvatar_4_Background: #ffdcf3;--sapAvatar_4_BorderColor: #ffdcf3;--sapAvatar_4_TextColor: #a100c2;--sapAvatar_5_Background: #ded3ff;--sapAvatar_5_BorderColor: #ded3ff;--sapAvatar_5_TextColor: #552cff;--sapAvatar_6_Background: #d1efff;--sapAvatar_6_BorderColor: #d1efff;--sapAvatar_6_TextColor: #0057d2;--sapAvatar_7_Background: #c2fcee;--sapAvatar_7_BorderColor: #c2fcee;--sapAvatar_7_TextColor: #046c7a;--sapAvatar_8_Background: #ebf5cb;--sapAvatar_8_BorderColor: #ebf5cb;--sapAvatar_8_TextColor: #256f3a;--sapAvatar_9_Background: #ddccf0;--sapAvatar_9_BorderColor: #ddccf0;--sapAvatar_9_TextColor: #6c32a9;--sapAvatar_10_Background: #eaecee;--sapAvatar_10_BorderColor: #eaecee;--sapAvatar_10_TextColor: #556b82;--sapButton_Background: #fff;--sapButton_BorderColor: #bcc3ca;--sapButton_BorderWidth: .0625rem;--sapButton_BorderCornerRadius: .5rem;--sapButton_TextColor: #0064d9;--sapButton_Hover_Background: #eaecee;--sapButton_Hover_BorderColor: #bcc3ca;--sapButton_Hover_TextColor: #0064d9;--sapButton_IconColor: #0064d9;--sapButton_Active_Background: #fff;--sapButton_Active_BorderColor: #0064d9;--sapButton_Active_TextColor: #0064d9;--sapButton_Emphasized_Background: #0070f2;--sapButton_Emphasized_BorderColor: #0070f2;--sapButton_Emphasized_TextColor: #fff;--sapButton_Emphasized_Hover_Background: #0064d9;--sapButton_Emphasized_Hover_BorderColor: #0064d9;--sapButton_Emphasized_Hover_TextColor: #fff;--sapButton_Emphasized_Active_Background: #fff;--sapButton_Emphasized_Active_BorderColor: #0064d9;--sapButton_Emphasized_Active_TextColor: #0064d9;--sapButton_Emphasized_TextShadow: transparent;--sapButton_Emphasized_FontWeight: bold;--sapButton_Reject_Background: #ffd6e9;--sapButton_Reject_BorderColor: #ffc2de;--sapButton_Reject_TextColor: #aa0808;--sapButton_Reject_Hover_Background: #ffbddb;--sapButton_Reject_Hover_BorderColor: #ffbddb;--sapButton_Reject_Hover_TextColor: #aa0808;--sapButton_Reject_Active_Background: #fff;--sapButton_Reject_Active_BorderColor: #e90b0b;--sapButton_Reject_Active_TextColor: #aa0808;--sapButton_Reject_Selected_Background: #fff;--sapButton_Reject_Selected_BorderColor: #e90b0b;--sapButton_Reject_Selected_TextColor: #aa0808;--sapButton_Reject_Selected_Hover_Background: #ffbddb;--sapButton_Reject_Selected_Hover_BorderColor: #e90b0b;--sapButton_Accept_Background: #ebf5cb;--sapButton_Accept_BorderColor: #dbeda0;--sapButton_Accept_TextColor: #256f3a;--sapButton_Accept_Hover_Background: #e3f1b6;--sapButton_Accept_Hover_BorderColor: #e3f1b6;--sapButton_Accept_Hover_TextColor: #256f3a;--sapButton_Accept_Active_Background: #fff;--sapButton_Accept_Active_BorderColor: #30914c;--sapButton_Accept_Active_TextColor: #256f3a;--sapButton_Accept_Selected_Background: #fff;--sapButton_Accept_Selected_BorderColor: #30914c;--sapButton_Accept_Selected_TextColor: #256f3a;--sapButton_Accept_Selected_Hover_Background: #e3f1b6;--sapButton_Accept_Selected_Hover_BorderColor: #30914c;--sapButton_Lite_Background: transparent;--sapButton_Lite_BorderColor: transparent;--sapButton_Lite_TextColor: #0064d9;--sapButton_Lite_Hover_Background: #eaecee;--sapButton_Lite_Hover_BorderColor: #bcc3ca;--sapButton_Lite_Hover_TextColor: #0064d9;--sapButton_Lite_Active_Background: #fff;--sapButton_Lite_Active_BorderColor: #0064d9;--sapButton_Selected_Background: #fff;--sapButton_Selected_BorderColor: #0064d9;--sapButton_Selected_TextColor: #0064d9;--sapButton_Selected_Hover_Background: #e3f0ff;--sapButton_Selected_Hover_BorderColor: #0064d9;--sapButton_Attention_Background: #fff3b7;--sapButton_Attention_BorderColor: #ffeb84;--sapButton_Attention_TextColor: #b44f00;--sapButton_Attention_Hover_Background: #ffef9e;--sapButton_Attention_Hover_BorderColor: #ffef9e;--sapButton_Attention_Hover_TextColor: #b44f00;--sapButton_Attention_Active_Background: #fff;--sapButton_Attention_Active_BorderColor: #dd6100;--sapButton_Attention_Active_TextColor: #b44f00;--sapButton_Attention_Selected_Background: #fff;--sapButton_Attention_Selected_BorderColor: #dd6100;--sapButton_Attention_Selected_TextColor: #b44f00;--sapButton_Attention_Selected_Hover_Background: #ffef9e;--sapButton_Attention_Selected_Hover_BorderColor: #dd6100;--sapButton_Negative_Background: #f53232;--sapButton_Negative_BorderColor: #f53232;--sapButton_Negative_TextColor: #fff;--sapButton_Negative_Hover_Background: #e90b0b;--sapButton_Negative_Hover_BorderColor: #e90b0b;--sapButton_Negative_Hover_TextColor: #fff;--sapButton_Negative_Active_Background: #fff;--sapButton_Negative_Active_BorderColor: #f53232;--sapButton_Negative_Active_TextColor: #aa0808;--sapButton_Critical_Background: #e76500;--sapButton_Critical_BorderColor: #e76500;--sapButton_Critical_TextColor: #fff;--sapButton_Critical_Hover_Background: #dd6100;--sapButton_Critical_Hover_BorderColor: #dd6100;--sapButton_Critical_Hover_TextColor: #fff;--sapButton_Critical_Active_Background: #fff;--sapButton_Critical_Active_BorderColor: #dd6100;--sapButton_Critical_Active_TextColor: #b44f00;--sapButton_Success_Background: #30914c;--sapButton_Success_BorderColor: #30914c;--sapButton_Success_TextColor: #fff;--sapButton_Success_Hover_Background: #2c8646;--sapButton_Success_Hover_BorderColor: #2c8646;--sapButton_Success_Hover_TextColor: #fff;--sapButton_Success_Active_Background: #fff;--sapButton_Success_Active_BorderColor: #30914c;--sapButton_Success_Active_TextColor: #256f3a;--sapButton_Information_Background: #e8f3ff;--sapButton_Information_BorderColor: #b5d8ff;--sapButton_Information_TextColor: #0064d9;--sapButton_Information_Hover_Background: #d4e8ff;--sapButton_Information_Hover_BorderColor: #b5d8ff;--sapButton_Information_Hover_TextColor: #0064d9;--sapButton_Information_Active_Background: #fff;--sapButton_Information_Active_BorderColor: #0064d9;--sapButton_Information_Active_TextColor: #0064d9;--sapButton_Neutral_Background: #e8f3ff;--sapButton_Neutral_BorderColor: #b5d8ff;--sapButton_Neutral_TextColor: #0064d9;--sapButton_Neutral_Hover_Background: #d4e8ff;--sapButton_Neutral_Hover_BorderColor: #b5d8ff;--sapButton_Neutral_Hover_TextColor: #0064d9;--sapButton_Neutral_Active_Background: #fff;--sapButton_Neutral_Active_BorderColor: #0064d9;--sapButton_Neutral_Active_TextColor: #0064d9;--sapButton_Track_Background: #788fa6;--sapButton_Track_BorderColor: #788fa6;--sapButton_Track_TextColor: #fff;--sapButton_Track_Hover_Background: #637d97;--sapButton_Track_Hover_BorderColor: #637d97;--sapButton_Track_Selected_Background: #0064d9;--sapButton_Track_Selected_BorderColor: #0064d9;--sapButton_Track_Selected_TextColor: #fff;--sapButton_Track_Selected_Hover_Background: #0058c0;--sapButton_Track_Selected_Hover_BorderColor: #0058c0;--sapButton_Handle_Background: #fff;--sapButton_Handle_BorderColor: #fff;--sapButton_Handle_TextColor: #1d2d3e;--sapButton_Handle_Hover_Background: #fff;--sapButton_Handle_Hover_BorderColor: rgba(255,255,255,.5);--sapButton_Handle_Selected_Background: #fff;--sapButton_Handle_Selected_BorderColor: #fff;--sapButton_Handle_Selected_TextColor: #0064d9;--sapButton_Handle_Selected_Hover_Background: #fff;--sapButton_Handle_Selected_Hover_BorderColor: rgba(255,255,255,.5);--sapButton_Track_Negative_Background: #f53232;--sapButton_Track_Negative_BorderColor: #f53232;--sapButton_Track_Negative_TextColor: #fff;--sapButton_Track_Negative_Hover_Background: #e90b0b;--sapButton_Track_Negative_Hover_BorderColor: #e90b0b;--sapButton_Handle_Negative_Background: #fff;--sapButton_Handle_Negative_BorderColor: #fff;--sapButton_Handle_Negative_TextColor: #aa0808;--sapButton_Handle_Negative_Hover_Background: #fff;--sapButton_Handle_Negative_Hover_BorderColor: rgba(255,255,255,.5);--sapButton_Track_Positive_Background: #30914c;--sapButton_Track_Positive_BorderColor: #30914c;--sapButton_Track_Positive_TextColor: #fff;--sapButton_Track_Positive_Hover_Background: #2c8646;--sapButton_Track_Positive_Hover_BorderColor: #2c8646;--sapButton_Handle_Positive_Background: #fff;--sapButton_Handle_Positive_BorderColor: #fff;--sapButton_Handle_Positive_TextColor: #256f3a;--sapButton_Handle_Positive_Hover_Background: #fff;--sapButton_Handle_Positive_Hover_BorderColor: rgba(255,255,255,.5);--sapButton_TokenBackground: #fff;--sapButton_TokenBorderColor: #bcc3ca;--sapField_Background: #fff;--sapField_BackgroundStyle: 0 100% / 100% .0625rem no-repeat linear-gradient(0deg, #556b81, #556b81) border-box;--sapField_TextColor: #131e29;--sapField_PlaceholderTextColor: #556b82;--sapField_BorderColor: #556b81;--sapField_HelpBackground: #fff;--sapField_BorderWidth: .0625rem;--sapField_BorderStyle: none;--sapField_BorderCornerRadius: .25rem;--sapField_Shadow: inset 0 0 0 .0625rem rgba(85,107,129,.25);--sapField_Hover_Background: #fff;--sapField_Hover_BackgroundStyle: 0 100% / 100% .0625rem no-repeat linear-gradient(0deg, #0064d9, #0064d9) border-box;--sapField_Hover_BorderColor: #0064d9;--sapField_Hover_HelpBackground: #fff;--sapField_Hover_Shadow: inset 0 0 0 .0625rem rgba(79,160,255,.5);--sapField_Hover_InvalidShadow: inset 0 0 0 .0625rem rgba(255,142,196,.45);--sapField_Hover_WarningShadow: inset 0 0 0 .0625rem rgba(255,213,10,.4);--sapField_Hover_SuccessShadow: inset 0 0 0 .0625rem rgba(48,145,76,.18);--sapField_Hover_InformationShadow: inset 0 0 0 .0625rem rgba(104,174,255,.5);--sapField_Active_BorderColor: #0064d9;--sapField_Focus_Background: #fff;--sapField_Focus_BorderColor: #0032a5;--sapField_Focus_HelpBackground: #fff;--sapField_ReadOnly_Background: #eaecee;--sapField_ReadOnly_BackgroundStyle: 0 100% / .375rem .0625rem repeat-x linear-gradient(90deg, #556b81 0, #556b81 .25rem, transparent .25rem) border-box;--sapField_ReadOnly_BorderColor: #556b81;--sapField_ReadOnly_BorderStyle: none;--sapField_ReadOnly_HelpBackground: #eaecee;--sapField_RequiredColor: #ba066c;--sapField_InvalidColor: #e90b0b;--sapField_InvalidBackground: #ffeaf4;--sapField_InvalidBackgroundStyle: 0 100% / 100% .125rem no-repeat linear-gradient(0deg, #e90b0b, #e90b0b) border-box;--sapField_InvalidBorderWidth: .125rem;--sapField_InvalidBorderStyle: none;--sapField_InvalidShadow: inset 0 0 0 .0625rem rgba(255,142,196,.45);--sapField_WarningColor: #dd6100;--sapField_WarningBackground: #fff8d6;--sapField_WarningBackgroundStyle: 0 100% / 100% .125rem no-repeat linear-gradient(0deg, #dd6100, #dd6100) border-box;--sapField_WarningBorderWidth: .125rem;--sapField_WarningBorderStyle: none;--sapField_WarningShadow: inset 0 0 0 .0625rem rgba(255,213,10,.4);--sapField_SuccessColor: #30914c;--sapField_SuccessBackground: #f5fae5;--sapField_SuccessBackgroundStyle: 0 100% / 100% .0625rem no-repeat linear-gradient(0deg, #30914c, #30914c) border-box;--sapField_SuccessBorderWidth: .0625rem;--sapField_SuccessBorderStyle: none;--sapField_SuccessShadow: inset 0 0 0 .0625rem rgba(48,145,76,.18);--sapField_InformationColor: #0070f2;--sapField_InformationBackground: #e1f4ff;--sapField_InformationBackgroundStyle: 0 100% / 100% .125rem no-repeat linear-gradient(0deg, #0070f2, #0070f2) border-box;--sapField_InformationBorderWidth: .125rem;--sapField_InformationBorderStyle: none;--sapField_InformationShadow: inset 0 0 0 .0625rem rgba(104,174,255,.5);--sapGroup_TitleBackground: #fff;--sapGroup_TitleBorderColor: #a8b2bd;--sapGroup_TitleTextColor: #1d2d3e;--sapGroup_Title_FontSize: 1rem;--sapGroup_ContentBackground: #fff;--sapGroup_ContentBorderColor: #d9d9d9;--sapGroup_BorderWidth: .0625rem;--sapGroup_BorderCornerRadius: .5rem;--sapGroup_FooterBackground: transparent;--sapToolbar_Background: #fff;--sapToolbar_SeparatorColor: #d9d9d9;--sapList_HeaderBackground: #fff;--sapList_HeaderBorderColor: #a8b2bd;--sapList_HeaderTextColor: #1d2d3e;--sapList_BorderColor: #e5e5e5;--sapList_BorderWidth: .0625rem;--sapList_TextColor: #1d2d3e;--sapList_Active_TextColor: #1d2d3e;--sapList_Active_Background: #dee2e5;--sapList_SelectionBackgroundColor: #ebf8ff;--sapList_SelectionBorderColor: #0064d9;--sapList_Hover_SelectionBackground: #dcf3ff;--sapList_Background: #fff;--sapList_Hover_Background: #eaecee;--sapList_AlternatingBackground: #f5f6f7;--sapList_GroupHeaderBackground: #fff;--sapList_GroupHeaderBorderColor: #a8b2bd;--sapList_GroupHeaderTextColor: #1d2d3e;--sapList_TableGroupHeaderBackground: #eff1f2;--sapList_TableGroupHeaderBorderColor: #a8b2bd;--sapList_TableGroupHeaderTextColor: #1d2d3e;--sapList_FooterBackground: #fff;--sapList_FooterTextColor: #1d2d3e;--sapList_TableFooterBorder: #a8b2bd;--sapList_TableFixedBorderColor: #8c8c8c;--sapMessage_ErrorBorderColor: #ff8ec4;--sapMessage_WarningBorderColor: #ffe770;--sapMessage_SuccessBorderColor: #cee67e;--sapMessage_InformationBorderColor: #7bcfff;--sapPopover_BorderCornerRadius: .5rem;--sapProgress_Background: #d5dadd;--sapProgress_BorderColor: #d5dadd;--sapProgress_TextColor: #1d2d3e;--sapProgress_FontSize: .875rem;--sapProgress_NegativeBackground: #ffdbec;--sapProgress_NegativeBorderColor: #ffdbec;--sapProgress_NegativeTextColor: #1d2d3e;--sapProgress_CriticalBackground: #fff4bd;--sapProgress_CriticalBorderColor: #fff4bd;--sapProgress_CriticalTextColor: #1d2d3e;--sapProgress_PositiveBackground: #e5f2ba;--sapProgress_PositiveBorderColor: #e5f2ba;--sapProgress_PositiveTextColor: #1d2d3e;--sapProgress_InformationBackground: #cdedff;--sapProgress_InformationBorderColor: #cdedff;--sapProgress_InformationTextColor: #1d2d3e;--sapProgress_Value_Background: #788fa6;--sapProgress_Value_BorderColor: #788fa6;--sapProgress_Value_TextColor: #788fa6;--sapProgress_Value_NegativeBackground: #f53232;--sapProgress_Value_NegativeBorderColor: #f53232;--sapProgress_Value_NegativeTextColor: #f53232;--sapProgress_Value_CriticalBackground: #e76500;--sapProgress_Value_CriticalBorderColor: #e76500;--sapProgress_Value_CriticalTextColor: #e76500;--sapProgress_Value_PositiveBackground: #30914c;--sapProgress_Value_PositiveBorderColor: #30914c;--sapProgress_Value_PositiveTextColor: #30914c;--sapProgress_Value_InformationBackground: #0070f2;--sapProgress_Value_InformationBorderColor: #0070f2;--sapProgress_Value_InformationTextColor: #0070f2;--sapScrollBar_FaceColor: #7b91a8;--sapScrollBar_TrackColor: #fff;--sapScrollBar_BorderColor: #7b91a8;--sapScrollBar_SymbolColor: #0064d9;--sapScrollBar_Dimension: .75rem;--sapScrollBar_Hover_FaceColor: #5b728b;--sapSlider_Background: #d5dadd;--sapSlider_BorderColor: #d5dadd;--sapSlider_Selected_Background: #0064d9;--sapSlider_Selected_BorderColor: #0064d9;--sapSlider_HandleBackground: #fff;--sapSlider_HandleBorderColor: #b0d5ff;--sapSlider_RangeHandleBackground: #fff;--sapSlider_Hover_HandleBackground: #e3f0ff;--sapSlider_Hover_HandleBorderColor: #b0d5ff;--sapSlider_Hover_RangeHandleBackground: #e3f0ff;--sapSlider_Active_HandleBackground: #fff;--sapSlider_Active_HandleBorderColor: #0064d9;--sapSlider_Active_RangeHandleBackground: transparent;--sapPageHeader_Background: #fff;--sapPageHeader_BorderColor: #d9d9d9;--sapPageHeader_TextColor: #1d2d3e;--sapPageFooter_Background: #fff;--sapPageFooter_BorderColor: #d9d9d9;--sapPageFooter_TextColor: #1d2d3e;--sapInfobar_Background: #c2fcee;--sapInfobar_Hover_Background: #fff;--sapInfobar_Active_Background: #fff;--sapInfobar_NonInteractive_Background: #f5f6f7;--sapInfobar_TextColor: #046c7a;--sapObjectHeader_Background: #fff;--sapObjectHeader_Hover_Background: #eaecee;--sapObjectHeader_BorderColor: #d9d9d9;--sapObjectHeader_Title_TextColor: #1d2d3e;--sapObjectHeader_Title_FontSize: 1.5rem;--sapObjectHeader_Title_SnappedFontSize: 1.25rem;--sapObjectHeader_Title_FontFamily: "72Black", "72Blackfull","72", "72full", Arial, Helvetica, sans-serif;--sapObjectHeader_Subtitle_TextColor: #556b82;--sapBlockLayer_Background: #000;--sapTile_Background: #fff;--sapTile_Hover_Background: #eaecee;--sapTile_Active_Background: #dee2e5;--sapTile_BorderColor: transparent;--sapTile_BorderCornerRadius: 1rem;--sapTile_TitleTextColor: #1d2d3e;--sapTile_TextColor: #556b82;--sapTile_IconColor: #556b82;--sapTile_SeparatorColor: #ccc;--sapTile_Interactive_BorderColor: #b3b3b3;--sapTile_OverlayBackground: #fff;--sapTile_OverlayForegroundColor: #1d2d3e;--sapAccentColor1: #d27700;--sapAccentColor2: #aa0808;--sapAccentColor3: #ba066c;--sapAccentColor4: #a100c2;--sapAccentColor5: #5d36ff;--sapAccentColor6: #0057d2;--sapAccentColor7: #046c7a;--sapAccentColor8: #256f3a;--sapAccentColor9: #6c32a9;--sapAccentColor10: #5b738b;--sapAccentBackgroundColor1: #fff3b8;--sapAccentBackgroundColor2: #ffd0e7;--sapAccentBackgroundColor3: #ffdbe7;--sapAccentBackgroundColor4: #ffdcf3;--sapAccentBackgroundColor5: #ded3ff;--sapAccentBackgroundColor6: #d1efff;--sapAccentBackgroundColor7: #c2fcee;--sapAccentBackgroundColor8: #ebf5cb;--sapAccentBackgroundColor9: #ddccf0;--sapAccentBackgroundColor10: #eaecee;--sapIndicationColor_1: #840606;--sapIndicationColor_1_Background: #840606;--sapIndicationColor_1_BorderColor: #840606;--sapIndicationColor_1_TextColor: #fff;--sapIndicationColor_1_Hover_Background: #6c0505;--sapIndicationColor_1_Active_Background: #fff;--sapIndicationColor_1_Active_BorderColor: #fb9d9d;--sapIndicationColor_1_Active_TextColor: #840606;--sapIndicationColor_1_Selected_Background: #fff;--sapIndicationColor_1_Selected_BorderColor: #fb9d9d;--sapIndicationColor_1_Selected_TextColor: #840606;--sapIndicationColor_1b: #fb9d9d;--sapIndicationColor_1b_BorderColor: #fb9d9d;--sapIndicationColor_1b_Hover_Background: #fa8585;--sapIndicationColor_2: #aa0808;--sapIndicationColor_2_Background: #aa0808;--sapIndicationColor_2_BorderColor: #aa0808;--sapIndicationColor_2_TextColor: #fff;--sapIndicationColor_2_Hover_Background: #920707;--sapIndicationColor_2_Active_Background: #fff;--sapIndicationColor_2_Active_BorderColor: #fcc4c4;--sapIndicationColor_2_Active_TextColor: #aa0808;--sapIndicationColor_2_Selected_Background: #fff;--sapIndicationColor_2_Selected_BorderColor: #fcc4c4;--sapIndicationColor_2_Selected_TextColor: #aa0808;--sapIndicationColor_2b: #fcc4c4;--sapIndicationColor_2b_BorderColor: #fcc4c4;--sapIndicationColor_2b_Hover_Background: #fbacac;--sapIndicationColor_3: #b95100;--sapIndicationColor_3_Background: #e76500;--sapIndicationColor_3_BorderColor: #e76500;--sapIndicationColor_3_TextColor: #fff;--sapIndicationColor_3_Hover_Background: #d85e00;--sapIndicationColor_3_Active_Background: #fff;--sapIndicationColor_3_Active_BorderColor: #fff2c0;--sapIndicationColor_3_Active_TextColor: #b95100;--sapIndicationColor_3_Selected_Background: #fff;--sapIndicationColor_3_Selected_BorderColor: #fff2c0;--sapIndicationColor_3_Selected_TextColor: #b95100;--sapIndicationColor_3b: #fff2c0;--sapIndicationColor_3b_BorderColor: #fff2c0;--sapIndicationColor_3b_Hover_Background: #ffeda6;--sapIndicationColor_4: #256f3a;--sapIndicationColor_4_Background: #256f3a;--sapIndicationColor_4_BorderColor: #256f3a;--sapIndicationColor_4_TextColor: #fff;--sapIndicationColor_4_Hover_Background: #1f5c30;--sapIndicationColor_4_Active_Background: #fff;--sapIndicationColor_4_Active_BorderColor: #bae8bc;--sapIndicationColor_4_Active_TextColor: #256f3a;--sapIndicationColor_4_Selected_Background: #fff;--sapIndicationColor_4_Selected_BorderColor: #bae8bc;--sapIndicationColor_4_Selected_TextColor: #256f3a;--sapIndicationColor_4b: #bae8bc;--sapIndicationColor_4b_BorderColor: #bae8bc;--sapIndicationColor_4b_Hover_Background: #a7e2a9;--sapIndicationColor_5: #0070f2;--sapIndicationColor_5_Background: #0070f2;--sapIndicationColor_5_BorderColor: #0070f2;--sapIndicationColor_5_TextColor: #fff;--sapIndicationColor_5_Hover_Background: #0064d9;--sapIndicationColor_5_Active_Background: #fff;--sapIndicationColor_5_Active_BorderColor: #d3effd;--sapIndicationColor_5_Active_TextColor: #0070f2;--sapIndicationColor_5_Selected_Background: #fff;--sapIndicationColor_5_Selected_BorderColor: #d3effd;--sapIndicationColor_5_Selected_TextColor: #0070f2;--sapIndicationColor_5b: #d3effd;--sapIndicationColor_5b_BorderColor: #d3effd;--sapIndicationColor_5b_Hover_Background: #bbe6fc;--sapIndicationColor_6: #046c7a;--sapIndicationColor_6_Background: #046c7a;--sapIndicationColor_6_BorderColor: #046c7a;--sapIndicationColor_6_TextColor: #fff;--sapIndicationColor_6_Hover_Background: #035661;--sapIndicationColor_6_Active_Background: #fff;--sapIndicationColor_6_Active_BorderColor: #cdf5ec;--sapIndicationColor_6_Active_TextColor: #046c7a;--sapIndicationColor_6_Selected_Background: #fff;--sapIndicationColor_6_Selected_BorderColor: #cdf5ec;--sapIndicationColor_6_Selected_TextColor: #046c7a;--sapIndicationColor_6b: #cdf5ec;--sapIndicationColor_6b_BorderColor: #cdf5ec;--sapIndicationColor_6b_Hover_Background: #b8f1e4;--sapIndicationColor_7: #5d36ff;--sapIndicationColor_7_Background: #5d36ff;--sapIndicationColor_7_BorderColor: #5d36ff;--sapIndicationColor_7_TextColor: #fff;--sapIndicationColor_7_Hover_Background: #481cff;--sapIndicationColor_7_Active_Background: #fff;--sapIndicationColor_7_Active_BorderColor: #e2dbff;--sapIndicationColor_7_Active_TextColor: #5d36ff;--sapIndicationColor_7_Selected_Background: #fff;--sapIndicationColor_7_Selected_BorderColor: #e2dbff;--sapIndicationColor_7_Selected_TextColor: #5d36ff;--sapIndicationColor_7b: #e2dbff;--sapIndicationColor_7b_BorderColor: #e2dbff;--sapIndicationColor_7b_Hover_Background: #cdc2ff;--sapIndicationColor_8: #a100c2;--sapIndicationColor_8_Background: #a100c2;--sapIndicationColor_8_BorderColor: #a100c2;--sapIndicationColor_8_TextColor: #fff;--sapIndicationColor_8_Hover_Background: #8c00a9;--sapIndicationColor_8_Active_Background: #fff;--sapIndicationColor_8_Active_BorderColor: #f8d6ff;--sapIndicationColor_8_Active_TextColor: #a100c2;--sapIndicationColor_8_Selected_Background: #fff;--sapIndicationColor_8_Selected_BorderColor: #f8d6ff;--sapIndicationColor_8_Selected_TextColor: #a100c2;--sapIndicationColor_8b: #f8d6ff;--sapIndicationColor_8b_BorderColor: #f8d6ff;--sapIndicationColor_8b_Hover_Background: #f4bdff;--sapIndicationColor_9: #1d2d3e;--sapIndicationColor_9_Background: #1d2d3e;--sapIndicationColor_9_BorderColor: #1d2d3e;--sapIndicationColor_9_TextColor: #fff;--sapIndicationColor_9_Hover_Background: #15202d;--sapIndicationColor_9_Active_Background: #fff;--sapIndicationColor_9_Active_BorderColor: #d9d9d9;--sapIndicationColor_9_Active_TextColor: #1d2d3e;--sapIndicationColor_9_Selected_Background: #fff;--sapIndicationColor_9_Selected_BorderColor: #d9d9d9;--sapIndicationColor_9_Selected_TextColor: #1d2d3e;--sapIndicationColor_9b: #fff;--sapIndicationColor_9b_BorderColor: #d9d9d9;--sapIndicationColor_9b_Hover_Background: #f2f2f2;--sapIndicationColor_10: #45484a;--sapIndicationColor_10_Background: #83888b;--sapIndicationColor_10_BorderColor: #83888b;--sapIndicationColor_10_TextColor: #fff;--sapIndicationColor_10_Hover_Background: #767b7e;--sapIndicationColor_10_Active_Background: #fff;--sapIndicationColor_10_Active_BorderColor: #eaecee;--sapIndicationColor_10_Active_TextColor: #45484a;--sapIndicationColor_10_Selected_Background: #fff;--sapIndicationColor_10_Selected_BorderColor: #eaecee;--sapIndicationColor_10_Selected_TextColor: #45484a;--sapIndicationColor_10b: #eaecee;--sapIndicationColor_10b_BorderColor: #eaecee;--sapIndicationColor_10b_Hover_Background: #dcdfe3;--sapLegend_WorkingBackground: #fff;--sapLegend_NonWorkingBackground: #ebebeb;--sapLegend_CurrentDateTime: #a100c2;--sapLegendColor1: #c35500;--sapLegendColor2: #d23a0a;--sapLegendColor3: #df1278;--sapLegendColor4: #840606;--sapLegendColor5: #cc00dc;--sapLegendColor6: #0057d2;--sapLegendColor7: #07838f;--sapLegendColor8: #188918;--sapLegendColor9: #5b738b;--sapLegendColor10: #7800a4;--sapLegendColor11: #a93e00;--sapLegendColor12: #aa2608;--sapLegendColor13: #ba066c;--sapLegendColor14: #8d2a00;--sapLegendColor15: #4e247a;--sapLegendColor16: #002a86;--sapLegendColor17: #035663;--sapLegendColor18: #1e592f;--sapLegendColor19: #1a4796;--sapLegendColor20: #470ced;--sapLegendBackgroundColor1: #ffef9f;--sapLegendBackgroundColor2: #feeae1;--sapLegendBackgroundColor3: #fbf6f8;--sapLegendBackgroundColor4: #fbebeb;--sapLegendBackgroundColor5: #ffe5fe;--sapLegendBackgroundColor6: #d1efff;--sapLegendBackgroundColor7: #c2fcee;--sapLegendBackgroundColor8: #f5fae5;--sapLegendBackgroundColor9: #f5f6f7;--sapLegendBackgroundColor10: #fff0fa;--sapLegendBackgroundColor11: #fff8d6;--sapLegendBackgroundColor12: #fff6f6;--sapLegendBackgroundColor13: #f7ebef;--sapLegendBackgroundColor14: #f1ecd5;--sapLegendBackgroundColor15: #f0e7f8;--sapLegendBackgroundColor16: #ebf8ff;--sapLegendBackgroundColor17: #dafdf5;--sapLegendBackgroundColor18: #ebf5cb;--sapLegendBackgroundColor19: #fafdff;--sapLegendBackgroundColor20: #eceeff;--sapChart_OrderedColor_1: #0070f2;--sapChart_OrderedColor_2: #c87b00;--sapChart_OrderedColor_3: #75980b;--sapChart_OrderedColor_4: #df1278;--sapChart_OrderedColor_5: #8b47d7;--sapChart_OrderedColor_6: #049f9a;--sapChart_OrderedColor_7: #3c8cdd;--sapChart_OrderedColor_8: #cc00dc;--sapChart_OrderedColor_9: #798c77;--sapChart_OrderedColor_10: #da6c6c;--sapChart_OrderedColor_11: #5d36ff;--sapChart_Bad: #f53232;--sapChart_Critical: #e76500;--sapChart_Good: #30914c;--sapChart_Neutral: #788fa6;--sapChart_Sequence_1: #0070f2;--sapChart_Sequence_2: #c87b00;--sapChart_Sequence_3: #75980b;--sapChart_Sequence_4: #df1278;--sapChart_Sequence_5: #8b47d7;--sapChart_Sequence_6: #049f9a;--sapChart_Sequence_7: #3c8cdd;--sapChart_Sequence_8: #cc00dc;--sapChart_Sequence_9: #798c77;--sapChart_Sequence_10: #da6c6c;--sapChart_Sequence_11: #5d36ff;--sapChart_Sequence_Neutral: #788fa6;}
` };

const styleData$v = { packageName: "@ui5/webcomponents", fileName: "themes/sap_horizon/parameters-bundle.css.ts", content: `:root{--ui5-v1-21-0-rc-5-avatar-hover-box-shadow-offset: 0px 0px 0px .0625rem;--ui5-v1-21-0-rc-5-avatar-initials-color: var(--sapContent_ImagePlaceholderForegroundColor);--ui5-v1-21-0-rc-5-avatar-border-radius-img-deduction: .0625rem;--_ui5-v1-21-0-rc-5_avatar_outline: var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);--_ui5-v1-21-0-rc-5_avatar_focus_width: 1px;--_ui5-v1-21-0-rc-5_avatar_focus_color: var(--sapContent_FocusColor);--_ui5-v1-21-0-rc-5_avatar_focus_offset: .125rem;--ui5-v1-21-0-rc-5-avatar-initials-border: .0625rem solid var(--sapAvatar_1_BorderColor);--ui5-v1-21-0-rc-5-avatar-border-radius: var(--sapElement_BorderCornerRadius);--_ui5-v1-21-0-rc-5_avatar_fontsize_XS: 1rem;--_ui5-v1-21-0-rc-5_avatar_fontsize_S: 1.125rem;--_ui5-v1-21-0-rc-5_avatar_fontsize_M: 1.5rem;--_ui5-v1-21-0-rc-5_avatar_fontsize_L: 2.25rem;--_ui5-v1-21-0-rc-5_avatar_fontsize_XL: 3rem;--ui5-v1-21-0-rc-5-avatar-accent1: var(--sapAvatar_1_Background);--ui5-v1-21-0-rc-5-avatar-accent2: var(--sapAvatar_2_Background);--ui5-v1-21-0-rc-5-avatar-accent3: var(--sapAvatar_3_Background);--ui5-v1-21-0-rc-5-avatar-accent4: var(--sapAvatar_4_Background);--ui5-v1-21-0-rc-5-avatar-accent5: var(--sapAvatar_5_Background);--ui5-v1-21-0-rc-5-avatar-accent6: var(--sapAvatar_6_Background);--ui5-v1-21-0-rc-5-avatar-accent7: var(--sapAvatar_7_Background);--ui5-v1-21-0-rc-5-avatar-accent8: var(--sapAvatar_8_Background);--ui5-v1-21-0-rc-5-avatar-accent9: var(--sapAvatar_9_Background);--ui5-v1-21-0-rc-5-avatar-accent10: var(--sapAvatar_10_Background);--ui5-v1-21-0-rc-5-avatar-placeholder: var(--sapContent_ImagePlaceholderBackground);--ui5-v1-21-0-rc-5-avatar-accent1-color: var(--sapAvatar_1_TextColor);--ui5-v1-21-0-rc-5-avatar-accent2-color: var(--sapAvatar_2_TextColor);--ui5-v1-21-0-rc-5-avatar-accent3-color: var(--sapAvatar_3_TextColor);--ui5-v1-21-0-rc-5-avatar-accent4-color: var(--sapAvatar_4_TextColor);--ui5-v1-21-0-rc-5-avatar-accent5-color: var(--sapAvatar_5_TextColor);--ui5-v1-21-0-rc-5-avatar-accent6-color: var(--sapAvatar_6_TextColor);--ui5-v1-21-0-rc-5-avatar-accent7-color: var(--sapAvatar_7_TextColor);--ui5-v1-21-0-rc-5-avatar-accent8-color: var(--sapAvatar_8_TextColor);--ui5-v1-21-0-rc-5-avatar-accent9-color: var(--sapAvatar_9_TextColor);--ui5-v1-21-0-rc-5-avatar-accent10-color: var(--sapAvatar_10_TextColor);--ui5-v1-21-0-rc-5-avatar-placeholder-color: var(--sapContent_ImagePlaceholderForegroundColor);--ui5-v1-21-0-rc-5-avatar-accent1-border-color: var(--sapAvatar_1_BorderColor);--ui5-v1-21-0-rc-5-avatar-accent2-border-color: var(--sapAvatar_2_BorderColor);--ui5-v1-21-0-rc-5-avatar-accent3-border-color: var(--sapAvatar_3_BorderColor);--ui5-v1-21-0-rc-5-avatar-accent4-border-color: var(--sapAvatar_4_BorderColor);--ui5-v1-21-0-rc-5-avatar-accent5-border-color: var(--sapAvatar_5_BorderColor);--ui5-v1-21-0-rc-5-avatar-accent6-border-color: var(--sapAvatar_6_BorderColor);--ui5-v1-21-0-rc-5-avatar-accent7-border-color: var(--sapAvatar_7_BorderColor);--ui5-v1-21-0-rc-5-avatar-accent8-border-color: var(--sapAvatar_8_BorderColor);--ui5-v1-21-0-rc-5-avatar-accent9-border-color: var(--sapAvatar_9_BorderColor);--ui5-v1-21-0-rc-5-avatar-accent10-border-color: var(--sapAvatar_10_BorderColor);--ui5-v1-21-0-rc-5-avatar-placeholder-border-color: var(--sapContent_ImagePlaceholderBackground);--_ui5-v1-21-0-rc-5_avatar_icon_XS: var(--_ui5-v1-21-0-rc-5_avatar_fontsize_XS);--_ui5-v1-21-0-rc-5_avatar_icon_S: var(--_ui5-v1-21-0-rc-5_avatar_fontsize_S);--_ui5-v1-21-0-rc-5_avatar_icon_M: var(--_ui5-v1-21-0-rc-5_avatar_fontsize_M);--_ui5-v1-21-0-rc-5_avatar_icon_L: var(--_ui5-v1-21-0-rc-5_avatar_fontsize_L);--_ui5-v1-21-0-rc-5_avatar_icon_XL: var(--_ui5-v1-21-0-rc-5_avatar_fontsize_XL);--_ui5-v1-21-0-rc-5_avatar_group_button_focus_border: none;--_ui5-v1-21-0-rc-5_avatar_group_focus_border_radius: .375rem;--ui5-v1-21-0-rc-5-badge-color-scheme-1-border: var(--sapAccentColor1);--ui5-v1-21-0-rc-5-badge-color-scheme-2-border: var(--sapAccentColor2);--ui5-v1-21-0-rc-5-badge-color-scheme-3-border: var(--sapAccentColor3);--ui5-v1-21-0-rc-5-badge-color-scheme-4-border: var(--sapAccentColor4);--ui5-v1-21-0-rc-5-badge-color-scheme-5-border: var(--sapAccentColor5);--ui5-v1-21-0-rc-5-badge-color-scheme-6-border: var(--sapAccentColor6);--ui5-v1-21-0-rc-5-badge-color-scheme-7-border: var(--sapAccentColor7);--ui5-v1-21-0-rc-5-badge-color-scheme-8-border: var(--sapLegendColor18);--ui5-v1-21-0-rc-5-badge-color-scheme-9-border: var(--sapAccentColor10);--ui5-v1-21-0-rc-5-badge-color-scheme-10-border: var(--sapAccentColor9);--_ui5-v1-21-0-rc-5-badge-height: 1.375rem;--_ui5-v1-21-0-rc-5-badge-border: none;--_ui5-v1-21-0-rc-5-badge-border-radius: .25rem;--_ui5-v1-21-0-rc-5-badge-padding-inline: .375em;--_ui5-v1-21-0-rc-5-badge-padding-inline-icon-only: var(--_ui5-v1-21-0-rc-5-badge-padding-inline);--_ui5-v1-21-0-rc-5-badge-text-transform: none;--_ui5-v1-21-0-rc-5-badge-icon-gap: .25rem;--_ui5-v1-21-0-rc-5-badge-font-size: var(--sapFontSize);--_ui5-v1-21-0-rc-5-badge-font: "72override", var(--sapFontSemiboldDuplexFamily);--_ui5-v1-21-0-rc-5-badge-font-weight: normal;--_ui5-v1-21-0-rc-5-badge-default-border-color: transparent;--_ui5-v1-21-0-rc-5-badge-default-background: var(--ui5-v1-21-0-rc-5-badge-color-scheme-1-background);--_ui5-v1-21-0-rc-5-badge-default-color: var(--ui5-v1-21-0-rc-5-badge-color-scheme-1-color);--_ui5-v1-21-0-rc-5-badge-letter-spacing: normal;--ui5-v1-21-0-rc-5-badge-color-scheme-1-background: var(--sapAvatar_1_Background);--ui5-v1-21-0-rc-5-badge-color-scheme-1-color: var(--sapAvatar_1_TextColor);--ui5-v1-21-0-rc-5-badge-color-scheme-2-background: var(--sapAvatar_2_Background);--ui5-v1-21-0-rc-5-badge-color-scheme-2-color: var(--sapAvatar_2_TextColor);--ui5-v1-21-0-rc-5-badge-color-scheme-3-background: var(--sapAvatar_3_Background);--ui5-v1-21-0-rc-5-badge-color-scheme-3-color: var(--sapAvatar_3_TextColor);--ui5-v1-21-0-rc-5-badge-color-scheme-4-background: var(--sapAvatar_4_Background);--ui5-v1-21-0-rc-5-badge-color-scheme-4-color: var(--sapAvatar_4_TextColor);--ui5-v1-21-0-rc-5-badge-color-scheme-5-background: var(--sapAvatar_5_Background);--ui5-v1-21-0-rc-5-badge-color-scheme-5-color: var(--sapAvatar_5_TextColor);--ui5-v1-21-0-rc-5-badge-color-scheme-6-background: var(--sapAvatar_6_Background);--ui5-v1-21-0-rc-5-badge-color-scheme-6-color: var(--sapAvatar_6_TextColor);--ui5-v1-21-0-rc-5-badge-color-scheme-7-background: var(--sapAvatar_7_Background);--ui5-v1-21-0-rc-5-badge-color-scheme-7-color: var(--sapAvatar_7_TextColor);--ui5-v1-21-0-rc-5-badge-color-scheme-8-background: var(--sapAvatar_8_Background);--ui5-v1-21-0-rc-5-badge-color-scheme-8-color: var(--sapAvatar_8_TextColor);--ui5-v1-21-0-rc-5-badge-color-scheme-9-background: var(--sapAvatar_9_Background);--ui5-v1-21-0-rc-5-badge-color-scheme-9-color: var(--sapAvatar_9_TextColor);--ui5-v1-21-0-rc-5-badge-color-scheme-10-background: var(--sapAvatar_10_Background);--ui5-v1-21-0-rc-5-badge-color-scheme-10-color: var(--sapAvatar_10_TextColor);--_ui5-v1-21-0-rc-5_breadcrumbs_current_location_focus_border_radius: .25rem;--browser_scrollbar_border_radius: var(--sapElement_BorderCornerRadius);--browser_scrollbar_border: none;--_ui5-v1-21-0-rc-5_busy_indicator_color: var(--sapContent_BusyColor);--_ui5-v1-21-0-rc-5_busy_indicator_focus_border_radius: .75rem;--_ui5-v1-21-0-rc-5_busy_indicator_focus_outline: var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);--_ui5-v1-21-0-rc-5_button_base_min_compact_width: 2rem;--_ui5-v1-21-0-rc-5_button_base_height: var(--sapElement_Height);--_ui5-v1-21-0-rc-5_button_compact_height: 1.625rem;--_ui5-v1-21-0-rc-5_button_border_radius: var(--sapButton_BorderCornerRadius);--_ui5-v1-21-0-rc-5_button_compact_padding: .4375rem;--_ui5-v1-21-0-rc-5_button_emphasized_outline: 1px dotted var(--sapContent_FocusColor);--_ui5-v1-21-0-rc-5_button_focus_offset: 1px;--_ui5-v1-21-0-rc-5_button_focus_width: 1px;--_ui5-v1-21-0-rc-5_button_emphasized_focused_border_before: none;--_ui5-v1-21-0-rc-5_button_emphasized_focused_active_border_color: transparent;--_ui5-v1-21-0-rc-5_button_focused_border: .125rem solid var(--sapContent_FocusColor);--_ui5-v1-21-0-rc-5_button_focused_border_radius: .375rem;--_ui5-v1-21-0-rc-5_button_focused_inner_border_radius: .375rem;--_ui5-v1-21-0-rc-5_button_base_min_width: 2.25rem;--_ui5-v1-21-0-rc-5_button_base_padding: .5625rem;--_ui5-v1-21-0-rc-5_button_base_icon_only_padding: .5625rem;--_ui5-v1-21-0-rc-5_button_base_icon_margin: .375rem;--_ui5-v1-21-0-rc-5_button_icon_font_size: 1rem;--_ui5-v1-21-0-rc-5_button_text_shadow: none;--_ui5-v1-21-0-rc-5_button_emphasized_border_width: .0625rem;--_ui5-v1-21-0-rc-5_button_pressed_focused_border_color: var(--sapContent_FocusColor);--_ui5-v1-21-0-rc-5_button_fontFamily: var(--sapFontSemiboldDuplexFamily);--_ui5-v1-21-0-rc-5_button_emphasized_focused_border_color: var(--sapContent_ContrastFocusColor);--_ui5-v1-21-0-rc-5_card_box_shadow: var(--sapContent_Shadow0);--_ui5-v1-21-0-rc-5_card_header_border_color: var(--sapTile_SeparatorColor);--_ui5-v1-21-0-rc-5_card_header_focus_border: var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);--_ui5-v1-21-0-rc-5_card_header_focus_bottom_radius: 0px;--_ui5-v1-21-0-rc-5_card_header_title_font_weight: normal;--_ui5-v1-21-0-rc-5_card_header_subtitle_margin_top: .25rem;--_ui5-v1-21-0-rc-5_card_hover_box_shadow: var(--sapContent_Shadow2);--_ui5-v1-21-0-rc-5_card_header_focus_offset: 0px;--_ui5-v1-21-0-rc-5_card_header_focus_radius: var(--_ui5-v1-21-0-rc-5_card_border-radius);--_ui5-v1-21-0-rc-5_card_header_title_font_family: var(--sapFontHeaderFamily);--_ui5-v1-21-0-rc-5_card_header_title_font_size: var(--sapFontHeader6Size);--_ui5-v1-21-0-rc-5_card_header_hover_bg: var(--sapTile_Hover_Background);--_ui5-v1-21-0-rc-5_card_header_active_bg: var(--sapTile_Active_Background);--_ui5-v1-21-0-rc-5_card_header_border: none;--_ui5-v1-21-0-rc-5_card_border-radius: var(--sapTile_BorderCornerRadius);--_ui5-v1-21-0-rc-5_card_header_padding: 1rem 1rem .75rem 1rem;--_ui5-v1-21-0-rc-5_card_border: none;--ui5-v1-21-0-rc-5_carousel_background_color_solid: var(--sapGroup_ContentBackground);--ui5-v1-21-0-rc-5_carousel_background_color_translucent: var(--sapBackgroundColor);--ui5-v1-21-0-rc-5_carousel_button_size: 2.5rem;--ui5-v1-21-0-rc-5_carousel_inactive_dot_size: .25rem;--ui5-v1-21-0-rc-5_carousel_inactive_dot_margin: 0 .375rem;--ui5-v1-21-0-rc-5_carousel_inactive_dot_border: 1px solid var(--sapContent_ForegroundBorderColor);--ui5-v1-21-0-rc-5_carousel_inactive_dot_background: var(--sapContent_ForegroundBorderColor);--ui5-v1-21-0-rc-5_carousel_active_dot_border: 1px solid var(--sapContent_Selected_ForegroundColor);--ui5-v1-21-0-rc-5_carousel_active_dot_background: var(--sapContent_Selected_ForegroundColor);--ui5-v1-21-0-rc-5_carousel_navigation_button_active_box_shadow: none;--_ui5-v1-21-0-rc-5_checkbox_box_shadow: none;--_ui5-v1-21-0-rc-5_checkbox_transition: unset;--_ui5-v1-21-0-rc-5_checkbox_focus_border: none;--_ui5-v1-21-0-rc-5_checkbox_border_radius: 0;--_ui5-v1-21-0-rc-5_checkbox_focus_outline: var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);--_ui5-v1-21-0-rc-5_checkbox_outer_hover_background: transparent;--_ui5-v1-21-0-rc-5_checkbox_inner_width_height: 1.375rem;--_ui5-v1-21-0-rc-5_checkbox_inner_disabled_border_color: var(--sapField_BorderColor);--_ui5-v1-21-0-rc-5_checkbox_inner_information_box_shadow: none;--_ui5-v1-21-0-rc-5_checkbox_inner_warning_box_shadow: none;--_ui5-v1-21-0-rc-5_checkbox_inner_error_box_shadow: none;--_ui5-v1-21-0-rc-5_checkbox_inner_success_box_shadow: none;--_ui5-v1-21-0-rc-5_checkbox_inner_default_box_shadow: none;--_ui5-v1-21-0-rc-5_checkbox_inner_background: var(--sapField_Background);--_ui5-v1-21-0-rc-5_checkbox_wrapped_focus_padding: .375rem;--_ui5-v1-21-0-rc-5_checkbox_wrapped_content_margin_top: .125rem;--_ui5-v1-21-0-rc-5_checkbox_compact_wrapper_padding: .5rem;--_ui5-v1-21-0-rc-5_checkbox_compact_width_height: 2rem;--_ui5-v1-21-0-rc-5_checkbox_compact_inner_size: 1rem;--_ui5-v1-21-0-rc-5_checkbox_compact_focus_position: .375rem;--_ui5-v1-21-0-rc-5_checkbox_compact_wrapped_label_margin_top: -1px;--_ui5-v1-21-0-rc-5_checkbox_label_offset: var(--_ui5-v1-21-0-rc-5_checkbox_wrapper_padding);--_ui5-v1-21-0-rc-5_checkbox_disabled_label_color: var(--sapContent_LabelColor);--_ui5-v1-21-0-rc-5_checkbox_default_focus_border: none;--_ui5-v1-21-0-rc-5_checkbox_focus_outline_display: block;--_ui5-v1-21-0-rc-5_checkbox_wrapper_padding: .6875rem;--_ui5-v1-21-0-rc-5_checkbox_width_height: 2.75rem;--_ui5-v1-21-0-rc-5_checkbox_label_color: var(--sapField_TextColor);--_ui5-v1-21-0-rc-5_checkbox_inner_border: solid var(--sapField_BorderWidth) var(--sapField_BorderColor);--_ui5-v1-21-0-rc-5_checkbox_inner_border_radius: var(--sapField_BorderCornerRadius);--_ui5-v1-21-0-rc-5_checkbox_checkmark_color: var(--sapContent_Selected_ForegroundColor);--_ui5-v1-21-0-rc-5_checkbox_hover_background: var(--sapContent_Selected_Hover_Background);--_ui5-v1-21-0-rc-5_checkbox_inner_hover_border_color: var(--sapField_Hover_BorderColor);--_ui5-v1-21-0-rc-5_checkbox_inner_hover_checked_border_color: var(--sapField_Hover_BorderColor);--_ui5-v1-21-0-rc-5_checkbox_inner_selected_border_color: var(--sapField_BorderColor);--_ui5-v1-21-0-rc-5_checkbox_inner_active_border_color: var(--sapField_Hover_BorderColor);--_ui5-v1-21-0-rc-5_checkbox_active_background: var(--sapContent_Selected_Hover_Background);--_ui5-v1-21-0-rc-5_checkbox_inner_readonly_border: var(--sapElement_BorderWidth) var(--sapField_ReadOnly_BorderColor) dashed;--_ui5-v1-21-0-rc-5_checkbox_inner_error_border: var(--sapField_InvalidBorderWidth) solid var(--sapField_InvalidColor);--_ui5-v1-21-0-rc-5_checkbox_inner_error_background_hover: var(--sapField_Hover_Background);--_ui5-v1-21-0-rc-5_checkbox_inner_warning_border: var(--sapField_WarningBorderWidth) solid var(--sapField_WarningColor);--_ui5-v1-21-0-rc-5_checkbox_inner_warning_color: var(--sapField_WarningColor);--_ui5-v1-21-0-rc-5_checkbox_inner_warning_background_hover: var(--sapField_Hover_Background);--_ui5-v1-21-0-rc-5_checkbox_checkmark_warning_color: var(--sapField_WarningColor);--_ui5-v1-21-0-rc-5_checkbox_inner_success_border: var(--sapField_SuccessBorderWidth) solid var(--sapField_SuccessColor);--_ui5-v1-21-0-rc-5_checkbox_inner_success_background_hover: var(--sapField_Hover_Background);--_ui5-v1-21-0-rc-5_checkbox_inner_information_color: var(--sapField_InformationColor);--_ui5-v1-21-0-rc-5_checkbox_inner_information_border: var(--sapField_InformationBorderWidth) solid var(--sapField_InformationColor);--_ui5-v1-21-0-rc-5_checkbox_inner_information_background_hover: var(--sapField_Hover_Background);--_ui5-v1-21-0-rc-5_checkbox_disabled_opacity: var(--sapContent_DisabledOpacity);--_ui5-v1-21-0-rc-5_checkbox_focus_position: .3125rem;--_ui5-v1-21-0-rc-5_checkbox_focus_border_radius: .5rem;--_ui5-v1-21-0-rc-5_checkbox_right_focus_distance: var(--_ui5-v1-21-0-rc-5_checkbox_focus_position);--_ui5-v1-21-0-rc-5_checkbox_wrapped_focus_left_top_bottom_position: .1875rem;--_ui5-v1-21-0-rc-5_color-palette-item-outer-border-radius: .25rem;--_ui5-v1-21-0-rc-5_color-palette-item-inner-border-radius: .1875rem;--_ui5-v1-21-0-rc-5_color-palette-item-container-sides-padding: .3125rem;--_ui5-v1-21-0-rc-5_color-palette-item-container-rows-padding: .6875rem;--_ui5-v1-21-0-rc-5_color-palette-item-focus-height: 1.5rem;--_ui5-v1-21-0-rc-5_color-palette-item-container-padding: var(--_ui5-v1-21-0-rc-5_color-palette-item-container-sides-padding) var(--_ui5-v1-21-0-rc-5_color-palette-item-container-rows-padding);--_ui5-v1-21-0-rc-5_color-palette-item-hover-margin: .0625rem;--_ui5-v1-21-0-rc-5_color-palette-row-height: 9.5rem;--_ui5-v1-21-0-rc-5_color-palette-button-height: 3rem;--_ui5-v1-21-0-rc-5_color-palette-item-before-focus-color: .125rem solid var(--sapContent_FocusColor);--_ui5-v1-21-0-rc-5_color-palette-item-before-focus-offset: -.3125rem;--_ui5-v1-21-0-rc-5_color-palette-item-before-focus-hover-offset: -.0625rem;--_ui5-v1-21-0-rc-5_color-palette-item-after-focus-color: .0625rem solid var(--sapContent_ContrastFocusColor);--_ui5-v1-21-0-rc-5_color-palette-item-after-focus-offset: -.1875rem;--_ui5-v1-21-0-rc-5_color-palette-item-after-focus-hover-offset: .0625rem;--_ui5-v1-21-0-rc-5_color-palette-item-before-focus-border-radius: .4375rem;--_ui5-v1-21-0-rc-5_color-palette-item-after-focus-border-radius: .3125rem;--_ui5-v1-21-0-rc-5_color-palette-item-hover-outer-border-radius: .4375rem;--_ui5-v1-21-0-rc-5_color-palette-item-hover-inner-border-radius: .375rem;--_ui5-v1-21-0-rc-5_color_picker_circle_outer_border: .0625rem solid var(--sapContent_ContrastShadowColor);--_ui5-v1-21-0-rc-5_color_picker_circle_inner_border: .0625rem solid var(--sapField_BorderColor);--_ui5-v1-21-0-rc-5_color_picker_circle_inner_circle_size: .5625rem;--_ui5-v1-21-0-rc-5_color_picker_slider_handle_box_shadow: .125rem solid var(--sapField_BorderColor);--_ui5-v1-21-0-rc-5_color_picker_slider_handle_border: .125rem solid var(--sapField_BorderColor);--_ui5-v1-21-0-rc-5_color_picker_slider_handle_outline_hover: .125rem solid var(--sapContent_FocusColor);--_ui5-v1-21-0-rc-5_color_picker_slider_handle_outline_focus: .125rem solid var(--sapContent_FocusColor);--_ui5-v1-21-0-rc-5_color_picker_slider_handle_margin_top: -.1875rem;--_ui5-v1-21-0-rc-5_color_picker_slider_handle_focus_margin_top: var(--_ui5-v1-21-0-rc-5_color_picker_slider_handle_margin_top);--_ui5-v1-21-0-rc-5_color_picker_slider_container_margin_top: -11px;--_ui5-v1-21-0-rc-5_color_picker_slider_handle_inline_focus: 1px solid var(--sapContent_ContrastFocusColor);--_ui5-v1-21-0-rc-5_datepicker_icon_border: none;--_ui5-v1-21-0-rc-5-datepicker-hover-background: var(--sapField_Hover_Background);--_ui5-v1-21-0-rc-5-datepicker_border_radius: .25rem;--_ui5-v1-21-0-rc-5-datepicker_icon_border_radius: .125rem;--_ui5-v1-21-0-rc-5_daypicker_item_box_shadow: inset 0 0 0 .0625rem var(--sapContent_Selected_ForegroundColor);--_ui5-v1-21-0-rc-5_daypicker_item_margin: 2px;--_ui5-v1-21-0-rc-5_daypicker_item_border: none;--_ui5-v1-21-0-rc-5_daypicker_item_selected_border_color: var(--sapList_Background);--_ui5-v1-21-0-rc-5_daypicker_daynames_container_height: 2rem;--_ui5-v1-21-0-rc-5_daypicker_weeknumbers_container_padding_top: 2rem;--_ui5-v1-21-0-rc-5_daypicker_item_othermonth_background_color: var(--sapList_Background);--_ui5-v1-21-0-rc-5_daypicker_item_othermonth_color: var(--sapContent_LabelColor);--_ui5-v1-21-0-rc-5_daypicker_item_othermonth_hover_color: var(--sapContent_LabelColor);--_ui5-v1-21-0-rc-5_daypicker_item_now_inner_border_radius: 0;--_ui5-v1-21-0-rc-5_daypicker_item_outline_width: 1px;--_ui5-v1-21-0-rc-5_daypicker_item_outline_offset: 1px;--_ui5-v1-21-0-rc-5_daypicker_item_now_focus_after_width: calc(100% - .25rem) ;--_ui5-v1-21-0-rc-5_daypicker_item_now_focus_after_height: calc(100% - .25rem) ;--_ui5-v1-21-0-rc-5_daypicker_item_now_selected_focus_after_width: calc(100% - .375rem) ;--_ui5-v1-21-0-rc-5_daypicker_item_now_selected_focus_after_height: calc(100% - .375rem) ;--_ui5-v1-21-0-rc-5_daypicker_item_selected_background: transparent;--_ui5-v1-21-0-rc-5_daypicker_item_outline_focus_after: none;--_ui5-v1-21-0-rc-5_daypicker_item_border_focus_after: var(--_ui5-v1-21-0-rc-5_daypicker_item_outline_width) dotted var(--sapContent_FocusColor);--_ui5-v1-21-0-rc-5_daypicker_item_width_focus_after: calc(100% - .25rem) ;--_ui5-v1-21-0-rc-5_daypicker_item_height_focus_after: calc(100% - .25rem) ;--_ui5-v1-21-0-rc-5_daypicker_item_now_outline: none;--_ui5-v1-21-0-rc-5_daypicker_item_now_outline_offset: none;--_ui5-v1-21-0-rc-5_daypicker_item_now_outline_offset_focus_after: var(--_ui5-v1-21-0-rc-5_daypicker_item_now_outline_offset);--_ui5-v1-21-0-rc-5_daypicker_item_now_not_selected_inset: 0;--_ui5-v1-21-0-rc-5_daypicker_item_now_border_color: var(--sapLegend_CurrentDateTime);--_ui5-v1-21-0-rc-5_daypicker_two_calendar_item_now_inset: .1875rem;--_ui5-v1-21-0-rc-5_dp_two_calendar_item_secondary_text_border_radios: .25rem;--_ui5-v1-21-0-rc-5_daypicker_item_border_radius: .5rem;--_ui5-v1-21-0-rc-5_daypicker_item_focus_border: .0625rem dotted var(--sapContent_FocusColor);--_ui5-v1-21-0-rc-5_daypicker_item_selected_border: .0625rem solid var(--sapList_SelectionBorderColor);--_ui5-v1-21-0-rc-5_daypicker_item_not_selected_focus_border: .125rem solid var(--sapContent_FocusColor);--_ui5-v1-21-0-rc-5_daypicker_item_selected_focus_color: var(--sapContent_FocusColor);--_ui5-v1-21-0-rc-5_daypicker_item_selected_focus_width: .125rem;--_ui5-v1-21-0-rc-5_daypicker_item_no_selected_inset: .375rem;--_ui5-v1-21-0-rc-5_daypicker_item_now_border_focus_after: .125rem solid var(--sapList_SelectionBorderColor);--_ui5-v1-21-0-rc-5_daypicker_item_now_border_radius_focus_after: .3125rem;--_ui5-v1-21-0-rc-5_day_picker_item_selected_now_border_focus: .1875rem solid var(--sapList_SelectionBorderColor);--_ui5-v1-21-0-rc-5_day_picker_item_selected_now_border_radius_focus: .1875rem;--ui5-v1-21-0-rc-5-dp-item_withsecondtype_border: .375rem;--_ui5-v1-21-0-rc-5_daypicker_item_now_border: .125rem solid var(--sapLegend_CurrentDateTime);--_ui5-v1-21-0-rc-5_daypicker_dayname_color: var(--sapContent_LabelColor);--_ui5-v1-21-0-rc-5_daypicker_weekname_color: var(--sapContent_LabelColor);--_ui5-v1-21-0-rc-5_daypicker_item_selected_box_shadow: inset 0 0 0 .0625rem var(--sapContent_Selected_ForegroundColor);--_ui5-v1-21-0-rc-5_daypicker_item_selected_daytext_hover_background: transparent;--_ui5-v1-21-0-rc-5_daypicker_item_border_radius_item: .5rem;--_ui5-v1-21-0-rc-5_daypicker_item_border_radius_focus_after: .1875rem;--_ui5-v1-21-0-rc-5_daypicker_item_selected_between_border: .5rem;--_ui5-v1-21-0-rc-5_daypicker_item_selected_between_background: var(--sapList_SelectionBackgroundColor);--_ui5-v1-21-0-rc-5_daypicker_item_selected_between_text_background: transparent;--_ui5-v1-21-0-rc-5_daypicker_item_selected_between_text_font: var(--sapFontFamily);--_ui5-v1-21-0-rc-5_daypicker_item_selected_text_font: var(--sapFontBoldFamily);--_ui5-v1-21-0-rc-5_daypicker_item_selected_between_hover_background: var(--sapList_Hover_SelectionBackground);--_ui5-v1-21-0-rc-5_daypicker_item_now_box_shadow: inset 0 0 0 .35rem var(--sapList_Background);--_ui5-v1-21-0-rc-5_daypicker_item_selected_text_outline: .0625rem solid var(--sapSelectedColor);--_ui5-v1-21-0-rc-5_daypicker_item_now_selected_outline_offset: -.25rem;--_ui5-v1-21-0-rc-5_daypicker_item_now_selected_between_inset: .25rem;--_ui5-v1-21-0-rc-5_daypicker_item_now_selected_between_border: .0625rem solid var(--sapContent_Selected_ForegroundColor);--_ui5-v1-21-0-rc-5_daypicker_item_now_selected_between_border_radius: .1875rem;--_ui5-v1-21-0-rc-5_daypicker_item_select_between_border: 1px solid var(--sapContent_Selected_ForegroundColor);--_ui5-v1-21-0-rc-5_daypicker_item_weeekend_filter: brightness(105%);--_ui5-v1-21-0-rc-5_daypicker_item_selected_hover: var(--sapList_Hover_Background);--_ui5-v1-21-0-rc-5_daypicker_item_now_inset: .375rem;--_ui5-v1-21-0-rc-5-dp-item_withsecondtype_border: .25rem;--_ui5-v1-21-0-rc-5_daypicker_item_selected__secondary_type_text_outline: .125rem solid var(--sapSelectedColor);--_ui5-v1-21-0-rc-5_daypicker_two_calendar_item_now_day_text_content: "";--_ui5-v1-21-0-rc-5_daypicker_two_calendar_item_now_selected_border_width: .1875rem;--_ui5-v1-21-0-rc-5_daypicker_two_calendar_item_border_radius: .5rem;--_ui5-v1-21-0-rc-5_daypicker_two_calendar_item_border_focus_border_radius: .5rem;--_ui5-v1-21-0-rc-5_daypicker_two_calendar_item_no_selected_inset: 0;--_ui5-v1-21-0-rc-5_daypicker_two_calendar_item_selected_now_border_radius_focus: .3125rem;--_ui5-v1-21-0-rc-5_daypicker_two_calendar_item_no_selected_focus_inset: .1875rem;--_ui5-v1-21-0-rc-5_daypicker_two_calendar_item_no_select_focus_border_radius: .3125rem;--_ui5-v1-21-0-rc-5_daypicker_two_calendar_item_now_selected_border_inset: 0;--_ui5-v1-21-0-rc-5_dialog_resize_handle_color: var(--sapButton_Lite_TextColor);--_ui5-v1-21-0-rc-5_dialog_header_error_state_icon_color: var(--sapNegativeElementColor);--_ui5-v1-21-0-rc-5_dialog_header_information_state_icon_color: var(--sapInformativeElementColor);--_ui5-v1-21-0-rc-5_dialog_header_success_state_icon_color: var(--sapPositiveElementColor);--_ui5-v1-21-0-rc-5_dialog_header_warning_state_icon_color: var(--sapCriticalElementColor);--_ui5-v1-21-0-rc-5_dialog_header_state_line_height: .0625rem;--_ui5-v1-21-0-rc-5_dialog_header_focus_bottom_offset: 2px;--_ui5-v1-21-0-rc-5_dialog_header_focus_top_offset: 1px;--_ui5-v1-21-0-rc-5_dialog_header_focus_left_offset: 1px;--_ui5-v1-21-0-rc-5_dialog_header_focus_right_offset: 1px;--_ui5-v1-21-0-rc-5_dialog_resize_handle_right: 0;--_ui5-v1-21-0-rc-5_dialog_resize_handle_bottom: 3px;--_ui5-v1-21-0-rc-5_dialog_header_border_radius: var(--sapElement_BorderCornerRadius);--_ui5-v1-21-0-rc-5_file_uploader_value_state_error_hover_background_color: var(--sapField_Hover_Background);--_ui5-v1-21-0-rc-5_file_uploader_hover_border: none;--ui5-v1-21-0-rc-5-group-header-listitem-background-color: var(--sapList_GroupHeaderBackground);--ui5-v1-21-0-rc-5-icon-focus-border-radius: .25rem;--_ui5-v1-21-0-rc-5_input_width: 13.125rem;--_ui5-v1-21-0-rc-5_input_min_width: 2.75rem;--_ui5-v1-21-0-rc-5_input_height: var(--sapElement_Height);--_ui5-v1-21-0-rc-5_input_compact_height: 1.625rem;--_ui5-v1-21-0-rc-5_input_value_state_error_hover_background: var(--sapField_Hover_Background);--_ui5-v1-21-0-rc-5_input_background_color: var(--sapField_Background);--_ui5-v1-21-0-rc-5_input_border_radius: var(--sapField_BorderCornerRadius);--_ui5-v1-21-0-rc-5_input_placeholder_style: italic;--_ui5-v1-21-0-rc-5_input_placeholder_color: var(--sapField_PlaceholderTextColor);--_ui5-v1-21-0-rc-5_input_bottom_border_height: 0;--_ui5-v1-21-0-rc-5_input_bottom_border_color: transparent;--_ui5-v1-21-0-rc-5_input_focused_border_color: var(--sapField_Hover_BorderColor);--_ui5-v1-21-0-rc-5_input_state_border_width: .125rem;--_ui5-v1-21-0-rc-5_input_information_border_width: .125rem;--_ui5-v1-21-0-rc-5_input_error_font_weight: normal;--_ui5-v1-21-0-rc-5_input_warning_font_weight: normal;--_ui5-v1-21-0-rc-5_input_focus_border_width: 1px;--_ui5-v1-21-0-rc-5_input_error_warning_font_style: inherit;--_ui5-v1-21-0-rc-5_input_error_warning_text_indent: 0;--_ui5-v1-21-0-rc-5_input_disabled_color: var(--sapContent_DisabledTextColor);--_ui5-v1-21-0-rc-5_input_disabled_font_weight: normal;--_ui5-v1-21-0-rc-5_input_disabled_border_color: var(--sapField_BorderColor);--_ui5-v1-21-0-rc-5-input_disabled_background: var(--sapField_Background);--_ui5-v1-21-0-rc-5_input_readonly_border_color: var(--sapField_ReadOnly_BorderColor);--_ui5-v1-21-0-rc-5_input_readonly_background: var(--sapField_ReadOnly_Background);--_ui5-v1-21-0-rc-5_input_disabled_opacity: var(--sapContent_DisabledOpacity);--_ui5-v1-21-0-rc-5_input_icon_min_width: 2.25rem;--_ui5-v1-21-0-rc-5_input_compact_min_width: 2rem;--_ui5-v1-21-0-rc-5_input_transition: none;--_ui5-v1-21-0-rc-5-input-value-state-icon-display: none;--_ui5-v1-21-0-rc-5_input_value_state_error_border_color: var(--sapField_InvalidColor);--_ui5-v1-21-0-rc-5_input_focused_value_state_error_border_color: var(--sapField_InvalidColor);--_ui5-v1-21-0-rc-5_input_value_state_warning_border_color: var(--sapField_WarningColor);--_ui5-v1-21-0-rc-5_input_focused_value_state_warning_border_color: var(--sapField_WarningColor);--_ui5-v1-21-0-rc-5_input_value_state_success_border_color: var(--sapField_SuccessColor);--_ui5-v1-21-0-rc-5_input_focused_value_state_success_border_color: var(--sapField_SuccessColor);--_ui5-v1-21-0-rc-5_input_value_state_success_border_width: 1px;--_ui5-v1-21-0-rc-5_input_value_state_information_border_color: var(--sapField_InformationColor);--_ui5-v1-21-0-rc-5_input_focused_value_state_information_border_color: var(--sapField_InformationColor);--_ui5-v1-21-0-rc-5-input-value-state-information-border-width: 1px;--_ui5-v1-21-0-rc-5-input-background-image: none;--ui5-v1-21-0-rc-5_input_focus_pseudo_element_content: "";--_ui5-v1-21-0-rc-5_input_value_state_error_warning_placeholder_font_weight: normal;--_ui5-v1-21-0-rc-5-input_error_placeholder_color: var(--sapField_PlaceholderTextColor);--_ui5-v1-21-0-rc-5_input_icon_width: 2.25rem;--_ui5-v1-21-0-rc-5-input-icons-count: 0;--_ui5-v1-21-0-rc-5_input_margin_top_bottom: .1875rem;--_ui5-v1-21-0-rc-5_input_tokenizer_min_width: 3.25rem;--_ui5-v1-21-0-rc-5-input-border: none;--_ui5-v1-21-0-rc-5_input_hover_border: none;--_ui5-v1-21-0-rc-5_input_focus_border_radius: .25rem;--_ui5-v1-21-0-rc-5_input_readonly_focus_border_radius: .125rem;--_ui5-v1-21-0-rc-5_input_error_warning_border_style: none;--_ui5-v1-21-0-rc-5_input_focused_value_state_error_background: var(--sapField_Hover_Background);--_ui5-v1-21-0-rc-5_input_focused_value_state_warning_background: var(--sapField_Hover_Background);--_ui5-v1-21-0-rc-5_input_focused_value_state_success_background: var(--sapField_Hover_Background);--_ui5-v1-21-0-rc-5_input_focused_value_state_information_background: var(--sapField_Hover_Background);--_ui5-v1-21-0-rc-5_input_focused_value_state_error_focus_outline_color: var(--sapField_InvalidColor);--_ui5-v1-21-0-rc-5_input_focused_value_state_warning_focus_outline_color: var(--sapField_WarningColor);--_ui5-v1-21-0-rc-5_input_focused_value_state_success_focus_outline_color: var(--sapField_SuccessColor);--_ui5-v1-21-0-rc-5_input_focus_offset: 0;--_ui5-v1-21-0-rc-5_input_readonly_focus_offset: .125rem;--_ui5-v1-21-0-rc-5_input_information_icon_padding: .625rem .625rem .5rem .625rem;--_ui5-v1-21-0-rc-5_input_information_focused_icon_padding: .625rem .625rem .5625rem .625rem;--_ui5-v1-21-0-rc-5_input_error_warning_icon_padding: .625rem .625rem .5rem .625rem;--_ui5-v1-21-0-rc-5_input_error_warning_focused_icon_padding: .625rem .625rem .5625rem .625rem;--_ui5-v1-21-0-rc-5_input_custom_icon_padding: .625rem .625rem .5625rem .625rem;--_ui5-v1-21-0-rc-5_input_error_warning_custom_icon_padding: .625rem .625rem .5rem .625rem;--_ui5-v1-21-0-rc-5_input_error_warning_custom_focused_icon_padding: .625rem .625rem .5625rem .625rem;--_ui5-v1-21-0-rc-5_input_information_custom_icon_padding: .625rem .625rem .5rem .625rem;--_ui5-v1-21-0-rc-5_input_information_custom_focused_icon_padding: .625rem .625rem .5625rem .625rem;--_ui5-v1-21-0-rc-5_input_focus_outline_color: var(--sapField_Active_BorderColor);--_ui5-v1-21-0-rc-5_input_icon_wrapper_height: calc(100% - 1px) ;--_ui5-v1-21-0-rc-5_input_icon_wrapper_state_height: calc(100% - 2px) ;--_ui5-v1-21-0-rc-5_input_icon_wrapper_success_state_height: calc(100% - var(--_ui5-v1-21-0-rc-5_input_value_state_success_border_width));--_ui5-v1-21-0-rc-5_input_icon_color: var(--sapContent_IconColor);--_ui5-v1-21-0-rc-5_input_icon_pressed_bg: var(--sapButton_Selected_Background);--_ui5-v1-21-0-rc-5_input_icon_padding: .625rem .625rem .5625rem .625rem;--_ui5-v1-21-0-rc-5_input_icon_hover_bg: var(--sapField_Focus_Background);--_ui5-v1-21-0-rc-5_input_icon_pressed_color: var(--sapButton_Active_TextColor);--_ui5-v1-21-0-rc-5_input_icon_border_radius: .25rem;--_ui5-v1-21-0-rc-5_input_icon_box_shadow: var(--sapField_Hover_Shadow);--_ui5-v1-21-0-rc-5_input_icon_border: none;--_ui5-v1-21-0-rc-5_input_error_icon_box_shadow: var(--sapContent_Negative_Shadow);--_ui5-v1-21-0-rc-5_input_warning_icon_box_shadow: var(--sapContent_Critical_Shadow);--_ui5-v1-21-0-rc-5_input_information_icon_box_shadow: var(--sapContent_Informative_Shadow);--_ui5-v1-21-0-rc-5_input_success_icon_box_shadow: var(--sapContent_Positive_Shadow);--_ui5-v1-21-0-rc-5_input_icon_error_pressed_color: var(--sapButton_Reject_Selected_TextColor);--_ui5-v1-21-0-rc-5_input_icon_warning_pressed_color: var(--sapButton_Attention_Selected_TextColor);--_ui5-v1-21-0-rc-5_input_icon_information_pressed_color: var(--sapButton_Selected_TextColor);--_ui5-v1-21-0-rc-5_input_icon_success_pressed_color: var(--sapButton_Accept_Selected_TextColor);--_ui5-v1-21-0-rc-5_link_focus_text_decoration: underline;--_ui5-v1-21-0-rc-5_link_text_decoration: var(--sapLink_TextDecoration);--_ui5-v1-21-0-rc-5_link_hover_text_decoration: var(--sapLink_Hover_TextDecoration);--_ui5-v1-21-0-rc-5_link_focused_hover_text_decoration: none;--_ui5-v1-21-0-rc-5_link_focused_hover_text_color: var(--sapContent_ContrastTextColor);--_ui5-v1-21-0-rc-5_link_active_text_decoration: var(--sapLink_Active_TextDecoration);--_ui5-v1-21-0-rc-5_link_border: .125rem solid transparent;--_ui5-v1-21-0-rc-5_link_border_focus: .125rem solid var(--sapContent_FocusColor);--_ui5-v1-21-0-rc-5_link_focus_border-radius: .125rem;--_ui5-v1-21-0-rc-5_link_focus_background_color: var(--sapContent_FocusColor);--_ui5-v1-21-0-rc-5_link_focus_color: var(--sapContent_ContrastTextColor);--_ui5-v1-21-0-rc-5_link_subtle_text_decoration: underline;--_ui5-v1-21-0-rc-5_link_subtle_text_decoration_hover: none;--ui5-v1-21-0-rc-5_list_footer_text_color: var(--sapList_FooterTextColor);--ui5-v1-21-0-rc-5-listitem-background-color: var(--sapList_Background);--ui5-v1-21-0-rc-5-listitem-border-bottom: var(--sapList_BorderWidth) solid var(--sapList_BorderColor);--ui5-v1-21-0-rc-5-listitem-selected-border-bottom: 1px solid var(--sapList_SelectionBorderColor);--ui5-v1-21-0-rc-5-listitem-focused-selected-border-bottom: 1px solid var(--sapList_SelectionBorderColor);--_ui5-v1-21-0-rc-5_listitembase_focus_width: 1px;--_ui5-v1-21-0-rc-5-listitembase_disabled_opacity: .5;--_ui5-v1-21-0-rc-5_product_switch_item_border: none;--ui5-v1-21-0-rc-5-listitem-active-border-color: var(--sapContent_FocusColor);--_ui5-v1-21-0-rc-5_menu_item_padding: 0 1rem 0 .75rem;--_ui5-v1-21-0-rc-5_menu_item_submenu_icon_right: 1rem;--_ui5-v1-21-0-rc-5_menu_item_additional_text_start_margin: 1rem;--_ui5-v1-21-0-rc-5_menu_popover_border_radius: var(--sapPopover_BorderCornerRadius);--_ui5-v1-21-0-rc-5_monthpicker_item_border: none;--_ui5-v1-21-0-rc-5_monthpicker_item_margin: 1px;--_ui5-v1-21-0-rc-5_monthpicker_item_border_radius: .5rem;--_ui5-v1-21-0-rc-5_monthpicker_item_focus_after_border: var(--_ui5-v1-21-0-rc-5_button_focused_border);--_ui5-v1-21-0-rc-5_monthpicker_item_focus_after_border_radius: .5rem;--_ui5-v1-21-0-rc-5_monthpicker_item_focus_after_width: calc(100% - .5rem) ;--_ui5-v1-21-0-rc-5_monthpicker_item_focus_after_height: calc(100% - .5rem) ;--_ui5-v1-21-0-rc-5_monthpicker_item_focus_after_offset: .25rem;--_ui5-v1-21-0-rc-5_monthpicker_item_selected_text_color: var(--sapContent_Selected_TextColor);--_ui5-v1-21-0-rc-5_monthpicker_item_selected_background_color:var(--sapLegend_WorkingBackground);--_ui5-v1-21-0-rc-5_monthpicker_item_selected_hover_color: var(--sapList_Hover_Background);--_ui5-v1-21-0-rc-5_monthpicker_item_selected_box_shadow: none;--_ui5-v1-21-0-rc-5_monthpicker_item_focus_after_outline: .125rem solid var(--sapSelectedColor);--_ui5-v1-21-0-rc-5_monthpicker_item_selected_font_wieght: bold;--_ui5-v1-21-0-rc-5_message_strip_icon_width: 2.5rem;--_ui5-v1-21-0-rc-5_message_strip_button_border_width: 0;--_ui5-v1-21-0-rc-5_message_strip_button_border_style: none;--_ui5-v1-21-0-rc-5_message_strip_button_border_color: transparent;--_ui5-v1-21-0-rc-5_message_strip_button_border_radius: 0;--_ui5-v1-21-0-rc-5_message_strip_padding: .4375rem 2.5rem .4375rem 2.5rem;--_ui5-v1-21-0-rc-5_message_strip_padding_block_no_icon: .4375rem .4375rem;--_ui5-v1-21-0-rc-5_message_strip_padding_inline_no_icon: 1rem 2.5rem;--_ui5-v1-21-0-rc-5_message_strip_button_height: 1.625rem;--_ui5-v1-21-0-rc-5_message_strip_border_width: 1px;--_ui5-v1-21-0-rc-5_message_strip_close_button_border: none;--_ui5-v1-21-0-rc-5_message_strip_icon_top: .4375rem;--_ui5-v1-21-0-rc-5_message_strip_focus_width: 1px;--_ui5-v1-21-0-rc-5_message_strip_focus_offset: -2px;--_ui5-v1-21-0-rc-5_message_strip_close_button_top: .125rem;--_ui5-v1-21-0-rc-5_message_strip_close_button_right: .1875rem;--_ui5-v1-21-0-rc-5_panel_focus_border: var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);--_ui5-v1-21-0-rc-5_panel_header_height: 2.75rem;--_ui5-v1-21-0-rc-5_panel_button_root_width: 2.75rem;--_ui5-v1-21-0-rc-5_panel_button_root_height: 2.75rem;--_ui5-v1-21-0-rc-5_panel_header_padding_right: .5rem;--_ui5-v1-21-0-rc-5_panel_header_button_wrapper_padding: .25rem;--_ui5-v1-21-0-rc-5_panel_border_radius: var(--sapElement_BorderCornerRadius);--_ui5-v1-21-0-rc-5_panel_border_bottom: none;--_ui5-v1-21-0-rc-5_panel_default_header_border: .0625rem solid var(--sapGroup_TitleBorderColor);--_ui5-v1-21-0-rc-5_panel_outline_offset: -.125rem;--_ui5-v1-21-0-rc-5_panel_border_radius_expanded: var(--sapElement_BorderCornerRadius) var(--sapElement_BorderCornerRadius) 0 0;--_ui5-v1-21-0-rc-5_panel_icon_color: var(--sapButton_Lite_TextColor);--_ui5-v1-21-0-rc-5_panel_focus_offset: -1px;--_ui5-v1-21-0-rc-5_panel_content_padding: .625rem 1rem;--_ui5-v1-21-0-rc-5_panel_header_background_color: var(--sapGroup_TitleBackground);--_ui5-v1-21-0-rc-5_popover_background: var(--sapGroup_ContentBackground);--_ui5-v1-21-0-rc-5_popover_box_shadow: var(--sapContent_Shadow2);--_ui5-v1-21-0-rc-5_popover_no_arrow_box_shadow: var(--sapContent_Shadow1);--_ui5-v1-21-0-rc-5_popup_content_padding_s: 1rem;--_ui5-v1-21-0-rc-5_popup_content_padding_m_l: 2rem;--_ui5-v1-21-0-rc-5_popup_content_padding_xl: 3rem;--_ui5-v1-21-0-rc-5_popup_header_footer_padding_s: 1rem;--_ui5-v1-21-0-rc-5_popup_header_footer_padding_m_l: 2rem;--_ui5-v1-21-0-rc-5_popup_header_footer_padding_xl: 3rem;--_ui5-v1-21-0-rc-5_popup_viewport_margin: 10px;--_ui5-v1-21-0-rc-5_popup_header_font_weight: 400;--_ui5-v1-21-0-rc-5_popup_header_prop_header_text_alignment: flex-start;--_ui5-v1-21-0-rc-5_popup_header_background: var(--sapPageHeader_Background);--_ui5-v1-21-0-rc-5_popup_header_shadow: var(--sapContent_HeaderShadow);--_ui5-v1-21-0-rc-5_popup_header_border: none;--_ui5-v1-21-0-rc-5_popup_header_font_family: var(--sapFontHeaderFamily);--_ui5-v1-21-0-rc-5_popup_border_radius: .5rem;--_ui5-v1-21-0-rc-5_progress_indicator_bar_border_max: none;--_ui5-v1-21-0-rc-5_progress_indicator_icon_visibility: inline-block;--_ui5-v1-21-0-rc-5_progress_indicator_side_points_visibility: block;--_ui5-v1-21-0-rc-5_progress_indicator_padding: 1.25rem 0 .75rem 0;--_ui5-v1-21-0-rc-5_progress_indicator_padding_end: 1.25rem;--_ui5-v1-21-0-rc-5_progress_indicator_host_height: unset;--_ui5-v1-21-0-rc-5_progress_indicator_host_min_height: unset;--_ui5-v1-21-0-rc-5_progress_indicator_host_box_sizing: border-box;--_ui5-v1-21-0-rc-5_progress_indicator_root_position: relative;--_ui5-v1-21-0-rc-5_progress_indicator_root_border_radius: .25rem;--_ui5-v1-21-0-rc-5_progress_indicator_root_height: .375rem;--_ui5-v1-21-0-rc-5_progress_indicator_root_min_height: .375rem;--_ui5-v1-21-0-rc-5_progress_indicator_root_overflow: visible;--_ui5-v1-21-0-rc-5_progress_indicator_bar_height: .625rem;--_ui5-v1-21-0-rc-5_progress_indicator_bar_border_radius: .5rem;--_ui5-v1-21-0-rc-5_progress_indicator_remaining_bar_border_radius: .25rem;--_ui5-v1-21-0-rc-5_progress_indicator_remaining_bar_position: absolute;--_ui5-v1-21-0-rc-5_progress_indicator_remaining_bar_width: 100%;--_ui5-v1-21-0-rc-5_progress_indicator_remaining_bar_overflow: visible;--_ui5-v1-21-0-rc-5_progress_indicator_icon_position: absolute;--_ui5-v1-21-0-rc-5_progress_indicator_icon_right_position: -1.25rem;--_ui5-v1-21-0-rc-5_progress_indicator_value_margin: 0 0 .1875rem 0;--_ui5-v1-21-0-rc-5_progress_indicator_value_position: absolute;--_ui5-v1-21-0-rc-5_progress_indicator_value_top_position: -1.3125rem;--_ui5-v1-21-0-rc-5_progress_indicator_value_left_position: 0;--_ui5-v1-21-0-rc-5_progress_indicator_background_none: var(--sapProgress_Background);--_ui5-v1-21-0-rc-5_progress_indicator_background_error: var(--sapProgress_NegativeBackground);--_ui5-v1-21-0-rc-5_progress_indicator_background_warning: var(--sapProgress_CriticalBackground);--_ui5-v1-21-0-rc-5_progress_indicator_background_success: var(--sapProgress_PositiveBackground);--_ui5-v1-21-0-rc-5_progress_indicator_background_information: var(--sapProgress_InformationBackground);--_ui5-v1-21-0-rc-5_progress_indicator_value_state_none: var(--sapProgress_Value_Background);--_ui5-v1-21-0-rc-5_progress_indicator_value_state_error: var(--sapProgress_Value_NegativeBackground);--_ui5-v1-21-0-rc-5_progress_indicator_value_state_warning: var(--sapProgress_Value_CriticalBackground);--_ui5-v1-21-0-rc-5_progress_indicator_value_state_success: var(--sapProgress_Value_PositiveBackground);--_ui5-v1-21-0-rc-5_progress_indicator_value_state_information: var(--sapProgress_Value_InformationBackground);--_ui5-v1-21-0-rc-5_progress_indicator_value_state_none_border_color: var(--sapProgress_Value_BorderColor);--_ui5-v1-21-0-rc-5_progress_indicator_value_state_error_border_color: var(--sapProgress_Value_NegativeBorderColor);--_ui5-v1-21-0-rc-5_progress_indicator_value_state_warning_border_color: var(--sapProgress_Value_CriticalBorderColor);--_ui5-v1-21-0-rc-5_progress_indicator_value_state_success_border_color: var(--sapProgress_Value_PositiveBorderColor);--_ui5-v1-21-0-rc-5_progress_indicator_value_state_information_border_color: var(--sapProgress_Value_InformationBorderColor);--_ui5-v1-21-0-rc-5_progress_indicator_value_state_error_icon_color: var(--sapProgress_Value_NegativeTextColor);--_ui5-v1-21-0-rc-5_progress_indicator_value_state_warning_icon_color: var(--sapProgress_Value_CriticalTextColor);--_ui5-v1-21-0-rc-5_progress_indicator_value_state_success_icon_color: var(--sapProgress_Value_PositiveTextColor);--_ui5-v1-21-0-rc-5_progress_indicator_value_state_information_icon_color: var(--sapProgress_Value_InformationTextColor);--_ui5-v1-21-0-rc-5_progress_indicator_border: none;--_ui5-v1-21-0-rc-5_progress_indicator_border_color_error: var(--sapErrorBorderColor);--_ui5-v1-21-0-rc-5_progress_indicator_border_color_warning: var(--sapWarningBorderColor);--_ui5-v1-21-0-rc-5_progress_indicator_border_color_success: var(--sapSuccessBorderColor);--_ui5-v1-21-0-rc-5_progress_indicator_border_color_information: var(--sapInformationBorderColor);--_ui5-v1-21-0-rc-5_progress_indicator_color: var(--sapField_TextColor);--_ui5-v1-21-0-rc-5_progress_indicator_bar_color: var(--sapProgress_TextColor);--_ui5-v1-21-0-rc-5_progress_indicator_icon_size: var(--sapFontLargeSize);--_ui5-v1-21-0-rc-5_rating_indicator_item_height: 1em;--_ui5-v1-21-0-rc-5_rating_indicator_item_width: 1em;--_ui5-v1-21-0-rc-5_rating_indicator_component_spacing: .5rem 0px;--_ui5-v1-21-0-rc-5_rating_indicator_border_radius: .25rem;--_ui5-v1-21-0-rc-5_rating_indicator_outline_offset: .125rem;--_ui5-v1-21-0-rc-5_rating_indicator_readonly_item_height: .75em;--_ui5-v1-21-0-rc-5_rating_indicator_readonly_item_width: .75em;--_ui5-v1-21-0-rc-5_rating_indicator_readonly_item_spacing: .1875rem .1875rem;--_ui5-v1-21-0-rc-5_segmented_btn_inner_border: .0625rem solid transparent;--_ui5-v1-21-0-rc-5_segmented_btn_inner_border_odd_child: .0625rem solid transparent;--_ui5-v1-21-0-rc-5_segmented_btn_inner_pressed_border_odd_child: .0625rem solid var(--sapButton_Selected_BorderColor);--_ui5-v1-21-0-rc-5_segmented_btn_inner_border_radius: var(--sapButton_BorderCornerRadius);--_ui5-v1-21-0-rc-5_segmented_btn_background_color: var(--sapButton_Lite_Background);--_ui5-v1-21-0-rc-5_segmented_btn_border_color: var(--sapButton_Lite_BorderColor);--_ui5-v1-21-0-rc-5_segmented_btn_hover_box_shadow: none;--_ui5-v1-21-0-rc-5_segmented_btn_item_border_left: .0625rem;--_ui5-v1-21-0-rc-5_segmented_btn_item_border_right: .0625rem;--_ui5-v1-21-0-rc-5_radio_button_min_width: 2.75rem;--_ui5-v1-21-0-rc-5_radio_button_hover_fill_error: var(--sapField_Hover_Background);--_ui5-v1-21-0-rc-5_radio_button_hover_fill_warning: var(--sapField_Hover_Background);--_ui5-v1-21-0-rc-5_radio_button_hover_fill_success: var(--sapField_Hover_Background);--_ui5-v1-21-0-rc-5_radio_button_hover_fill_information: var(--sapField_Hover_Background);--_ui5-v1-21-0-rc-5_radio_button_checked_fill: var(--sapSelectedColor);--_ui5-v1-21-0-rc-5_radio_button_checked_error_fill: var(--sapField_InvalidColor);--_ui5-v1-21-0-rc-5_radio_button_checked_success_fill: var(--sapField_SuccessColor);--_ui5-v1-21-0-rc-5_radio_button_checked_information_fill: var(--sapField_InformationColor);--_ui5-v1-21-0-rc-5_radio_button_warning_error_border_dash: 0;--_ui5-v1-21-0-rc-5_radio_button_outer_ring_color: var(--sapField_BorderColor);--_ui5-v1-21-0-rc-5_radio_button_outer_ring_width: var(--sapField_BorderWidth);--_ui5-v1-21-0-rc-5_radio_button_outer_ring_bg: var(--sapField_Background);--_ui5-v1-21-0-rc-5_radio_button_outer_ring_hover_color: var(--sapField_Hover_BorderColor);--_ui5-v1-21-0-rc-5_radio_button_outer_ring_active_color: var(--sapField_Hover_BorderColor);--_ui5-v1-21-0-rc-5_radio_button_outer_ring_checked_hover_color: var(--sapField_Hover_BorderColor);--_ui5-v1-21-0-rc-5_radio_button_outer_ring_padding_with_label: 0 .6875rem;--_ui5-v1-21-0-rc-5_radio_button_border: none;--_ui5-v1-21-0-rc-5_radio_button_focus_border: none;--_ui5-v1-21-0-rc-5_radio_button_focus_outline: block;--_ui5-v1-21-0-rc-5_radio_button_color: var(--sapField_BorderColor);--_ui5-v1-21-0-rc-5_radio_button_label_offset: 1px;--_ui5-v1-21-0-rc-5_radio_button_items_align: unset;--_ui5-v1-21-0-rc-5_radio_button_information_border_width: var(--sapField_InformationBorderWidth);--_ui5-v1-21-0-rc-5_radio_button_border_width: var(--sapContent_FocusWidth);--_ui5-v1-21-0-rc-5_radio_button_border_radius: .5rem;--_ui5-v1-21-0-rc-5_radio_button_label_color: var(--sapField_TextColor);--_ui5-v1-21-0-rc-5_radio_button_inner_ring_radius: 27.5%;--_ui5-v1-21-0-rc-5_radio_button_outer_ring_padding: 0 .6875rem;--_ui5-v1-21-0-rc-5_radio_button_read_only_border_type: 4,2;--_ui5-v1-21-0-rc-5_radio_button_inner_ring_color: var(--sapContent_Selected_ForegroundColor);--_ui5-v1-21-0-rc-5_radio_button_checked_warning_fill: var(--sapField_WarningColor);--_ui5-v1-21-0-rc-5_radio_button_read_only_inner_ring_color: var(--sapField_TextColor);--_ui5-v1-21-0-rc-5_radio_button_read_only_border_width: var(--sapElement_BorderWidth);--_ui5-v1-21-0-rc-5_radio_button_hover_fill: var(--sapContent_Selected_Hover_Background);--_ui5-v1-21-0-rc-5_radio_button_focus_dist: .375rem;--_ui5-v1-21-0-rc-5_switch_height: 2.75rem;--_ui5-v1-21-0-rc-5_switch_foucs_border_size: 1px;--_ui5-v1-21-0-rc-5-switch-root-border-radius: 0;--_ui5-v1-21-0-rc-5-switch-root-box-shadow: none;--_ui5-v1-21-0-rc-5-switch-focus: "";--_ui5-v1-21-0-rc-5_switch_track_border_radius: .75rem;--_ui5-v1-21-0-rc-5-switch-track-border: 1px solid;--_ui5-v1-21-0-rc-5_switch_track_transition: none;--_ui5-v1-21-0-rc-5_switch_handle_border_radius: 1rem;--_ui5-v1-21-0-rc-5-switch-handle-icon-display: none;--_ui5-v1-21-0-rc-5-switch-slider-texts-display: inline;--_ui5-v1-21-0-rc-5_switch_width: 3.5rem;--_ui5-v1-21-0-rc-5_switch_min_width: none;--_ui5-v1-21-0-rc-5_switch_with_label_width: 3.875rem;--_ui5-v1-21-0-rc-5_switch_focus_outline: none;--_ui5-v1-21-0-rc-5_switch_root_after_outline: .125rem solid var(--sapContent_FocusColor);--_ui5-v1-21-0-rc-5_switch_root_after_boreder: none;--_ui5-v1-21-0-rc-5_switch_root_after_boreder_radius: 1rem;--_ui5-v1-21-0-rc-5_switch_root_outline_top: .5rem;--_ui5-v1-21-0-rc-5_switch_root_outline_bottom: .5rem;--_ui5-v1-21-0-rc-5_switch_root_outline_left: .375rem;--_ui5-v1-21-0-rc-5_switch_root_outline_right: .375rem;--_ui5-v1-21-0-rc-5_switch_disabled_opacity: var(--sapContent_DisabledOpacity);--_ui5-v1-21-0-rc-5_switch_transform: translateX(100%) translateX(-1.625rem);--_ui5-v1-21-0-rc-5_switch_transform_with_label: translateX(100%) translateX(-1.875rem);--_ui5-v1-21-0-rc-5_switch_rtl_transform: translateX(-100%) translateX(1.625rem);--_ui5-v1-21-0-rc-5_switch_rtl_transform_with_label: translateX(-100%) translateX(1.875rem);--_ui5-v1-21-0-rc-5_switch_track_width: 2.5rem;--_ui5-v1-21-0-rc-5_switch_track_height: 1.5rem;--_ui5-v1-21-0-rc-5_switch_track_with_label_width: 2.875rem;--_ui5-v1-21-0-rc-5_switch_track_with_label_height: 1.5rem;--_ui5-v1-21-0-rc-5_switch_track_active_background_color: var(--sapButton_Track_Selected_Background);--_ui5-v1-21-0-rc-5_switch_track_inactive_background_color: var(--sapButton_Track_Background);--_ui5-v1-21-0-rc-5_switch_track_hover_active_background_color: var(--sapButton_Track_Selected_Hover_Background);--_ui5-v1-21-0-rc-5_switch_track_hover_inactive_background_color: var(--sapButton_Track_Hover_Background);--_ui5-v1-21-0-rc-5_switch_track_active_border_color: var(--sapButton_Track_Selected_BorderColor);--_ui5-v1-21-0-rc-5_switch_track_inactive_border_color: var(--sapButton_Track_BorderColor);--_ui5-v1-21-0-rc-5_switch_track_hover_active_border_color: var(--sapButton_Track_Selected_Hover_BorderColor);--_ui5-v1-21-0-rc-5_switch_track_hover_inactive_border_color: var(--sapButton_Track_Hover_BorderColor);--_ui5-v1-21-0-rc-5_switch_track_semantic_accept_background_color: var(--sapButton_Track_Positive_Background);--_ui5-v1-21-0-rc-5_switch_track_semantic_reject_background_color: var(--sapButton_Track_Negative_Background);--_ui5-v1-21-0-rc-5_switch_track_semantic_hover_accept_background_color: var(--sapButton_Track_Positive_Hover_Background);--_ui5-v1-21-0-rc-5_switch_track_semantic_hover_reject_background_color: var(--sapButton_Track_Negative_Hover_Background);--_ui5-v1-21-0-rc-5_switch_track_semantic_accept_border_color: var(--sapButton_Track_Positive_BorderColor);--_ui5-v1-21-0-rc-5_switch_track_semantic_reject_border_color: var(--sapButton_Track_Negative_BorderColor);--_ui5-v1-21-0-rc-5_switch_track_semantic_hover_accept_border_color: var(--sapButton_Track_Positive_Hover_BorderColor);--_ui5-v1-21-0-rc-5_switch_track_semantic_hover_reject_border_color: var(--sapButton_Track_Negative_Hover_BorderColor);--_ui5-v1-21-0-rc-5_switch_track_icon_display: inline-block;--_ui5-v1-21-0-rc-5_switch_handle_width: 1.5rem;--_ui5-v1-21-0-rc-5_switch_handle_height: 1.25rem;--_ui5-v1-21-0-rc-5_switch_handle_with_label_width: 1.75rem;--_ui5-v1-21-0-rc-5_switch_handle_with_label_height: 1.25rem;--_ui5-v1-21-0-rc-5_switch_handle_border: var(--_ui5-v1-21-0-rc-5_switch_handle_border_width) solid var(--sapButton_Handle_BorderColor);--_ui5-v1-21-0-rc-5_switch_handle_border_width: .125rem;--_ui5-v1-21-0-rc-5_switch_handle_active_background_color: var(--sapButton_Handle_Selected_Background);--_ui5-v1-21-0-rc-5_switch_handle_inactive_background_color: var(--sapButton_Handle_Background);--_ui5-v1-21-0-rc-5_switch_handle_hover_active_background_color: var(--sapButton_Handle_Selected_Hover_Background);--_ui5-v1-21-0-rc-5_switch_handle_hover_inactive_background_color: var(--sapButton_Handle_Hover_Background);--_ui5-v1-21-0-rc-5_switch_handle_active_border_color: var(--sapButton_Handle_Selected_BorderColor);--_ui5-v1-21-0-rc-5_switch_handle_inactive_border_color: var(--sapButton_Handle_BorderColor);--_ui5-v1-21-0-rc-5_switch_handle_hover_active_border_color: var(--sapButton_Handle_Selected_BorderColor);--_ui5-v1-21-0-rc-5_switch_handle_hover_inactive_border_color: var(--sapButton_Handle_BorderColor);--_ui5-v1-21-0-rc-5_switch_handle_semantic_accept_background_color: var(--sapButton_Handle_Positive_Background);--_ui5-v1-21-0-rc-5_switch_handle_semantic_reject_background_color: var(--sapButton_Handle_Negative_Background);--_ui5-v1-21-0-rc-5_switch_handle_semantic_hover_accept_background_color: var(--sapButton_Handle_Positive_Hover_Background);--_ui5-v1-21-0-rc-5_switch_handle_semantic_hover_reject_background_color: var(--sapButton_Handle_Negative_Hover_Background);--_ui5-v1-21-0-rc-5_switch_handle_semantic_accept_border_color: var(--sapButton_Handle_Positive_BorderColor);--_ui5-v1-21-0-rc-5_switch_handle_semantic_reject_border_color: var(--sapButton_Handle_Negative_BorderColor);--_ui5-v1-21-0-rc-5_switch_handle_semantic_hover_accept_border_color: var(--sapButton_Handle_Positive_BorderColor);--_ui5-v1-21-0-rc-5_switch_handle_semantic_hover_reject_border_color: var(--sapButton_Handle_Negative_BorderColor);--_ui5-v1-21-0-rc-5_switch_handle_on_hover_box_shadow: 0 0 0 .125rem var(--sapButton_Handle_Selected_Hover_BorderColor);--_ui5-v1-21-0-rc-5_switch_handle_off_hover_box_shadow: 0 0 0 .125rem var(--sapButton_Handle_Hover_BorderColor);--_ui5-v1-21-0-rc-5_switch_handle_semantic_on_hover_box_shadow: 0 0 0 .125rem var(--sapButton_Handle_Positive_Hover_BorderColor);--_ui5-v1-21-0-rc-5_switch_handle_semantic_off_hover_box_shadow: 0 0 0 .125rem var(--sapButton_Handle_Negative_Hover_BorderColor);--_ui5-v1-21-0-rc-5_switch_handle_left: .0625rem;--_ui5-v1-21-0-rc-5_switch_text_font_family: var(--sapContent_IconFontFamily);--_ui5-v1-21-0-rc-5_switch_text_font_size: var(--sapFontLargeSize);--_ui5-v1-21-0-rc-5_switch_text_width: 1.25rem;--_ui5-v1-21-0-rc-5_switch_text_with_label_font_family: "72-Condensed-Bold" , "72" , "72full" , Arial, Helvetica, sans-serif;--_ui5-v1-21-0-rc-5_switch_text_with_label_font_size: var(--sapFontSmallSize);--_ui5-v1-21-0-rc-5_switch_text_with_label_width: 1.75rem;--_ui5-v1-21-0-rc-5_switch_text_inactive_left: .1875rem;--_ui5-v1-21-0-rc-5_switch_text_inactive_left_alternate: .0625rem;--_ui5-v1-21-0-rc-5_switch_text_inactive_right: auto;--_ui5-v1-21-0-rc-5_switch_text_inactive_right_alternate: 0;--_ui5-v1-21-0-rc-5_switch_text_active_left: .1875rem;--_ui5-v1-21-0-rc-5_switch_text_active_left_alternate: .0625rem;--_ui5-v1-21-0-rc-5_switch_text_active_right: auto;--_ui5-v1-21-0-rc-5_switch_text_active_color: var(--sapButton_Handle_Selected_TextColor);--_ui5-v1-21-0-rc-5_switch_text_inactive_color: var(--sapButton_Handle_TextColor);--_ui5-v1-21-0-rc-5_switch_text_semantic_accept_color: var(--sapButton_Handle_Positive_TextColor);--_ui5-v1-21-0-rc-5_switch_text_semantic_reject_color: var(--sapButton_Handle_Negative_TextColor);--_ui5-v1-21-0-rc-5_switch_text_overflow: hidden;--_ui5-v1-21-0-rc-5_switch_text_z_index: 1;--_ui5-v1-21-0-rc-5_switch_text_hidden: hidden;--_ui5-v1-21-0-rc-5_switch_text_min_width: none;--_ui5-v1-21-0-rc-5_switch_icon_width: 1rem;--_ui5-v1-21-0-rc-5_switch_icon_height: 1rem;--_ui5-v1-21-0-rc-5_select_disabled_background: var(--sapField_Background);--_ui5-v1-21-0-rc-5_select_disabled_border_color: var(--sapField_BorderColor);--_ui5-v1-21-0-rc-5_select_state_error_warning_border_style: solid;--_ui5-v1-21-0-rc-5_select_state_error_warning_border_width: .125rem;--_ui5-v1-21-0-rc-5_select_focus_width: 1px;--_ui5-v1-21-0-rc-5_select_label_color: var(--sapField_TextColor);--_ui5-v1-21-0-rc-5_select_hover_icon_left_border: none;--_ui5-v1-21-0-rc-5_select_option_focus_border_radius: var(--sapElement_BorderCornerRadius);--_ui5-v1-21-0-rc-5_split_button_host_transparent_hover_background: transparent;--_ui5-v1-21-0-rc-5_split_button_transparent_disabled_background: transparent;--_ui5-v1-21-0-rc-5_split_button_host_default_box_shadow: inset 0 0 0 var(--sapButton_BorderWidth) var(--sapButton_BorderColor);--_ui5-v1-21-0-rc-5_split_button_host_attention_box_shadow: inset 0 0 0 var(--sapButton_BorderWidth) var(--sapButton_Attention_BorderColor);--_ui5-v1-21-0-rc-5_split_button_host_emphasized_box_shadow: inset 0 0 0 var(--sapButton_BorderWidth) var(--sapButton_Emphasized_BorderColor);--_ui5-v1-21-0-rc-5_split_button_host_positive_box_shadow: inset 0 0 0 var(--sapButton_BorderWidth) var(--sapButton_Accept_BorderColor);--_ui5-v1-21-0-rc-5_split_button_host_negative_box_shadow: inset 0 0 0 var(--sapButton_BorderWidth) var(--sapButton_Reject_BorderColor);--_ui5-v1-21-0-rc-5_split_button_host_transparent_box_shadow: inset 0 0 0 var(--sapButton_BorderWidth) var(--sapButton_Lite_BorderColor);--_ui5-v1-21-0-rc-5_split_text_button_border_color: transparent;--_ui5-v1-21-0-rc-5_split_text_button_background_color: transparent;--_ui5-v1-21-0-rc-5_split_text_button_emphasized_border: var(--sapButton_BorderWidth) solid var(--sapButton_Emphasized_BorderColor);--_ui5-v1-21-0-rc-5_split_text_button_emphasized_border_width: .0625rem 0 .0625rem .0625rem;--_ui5-v1-21-0-rc-5_split_text_button_hover_border: var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-21-0-rc-5_split_text_button_emphasized_hover_border: var(--sapButton_BorderWidth) solid var(--sapButton_Emphasized_BorderColor);--_ui5-v1-21-0-rc-5_split_text_button_positive_hover_border: var(--sapButton_BorderWidth) solid var(--sapButton_Accept_BorderColor);--_ui5-v1-21-0-rc-5_split_text_button_negative_hover_border: var(--sapButton_BorderWidth) solid var(--sapButton_Reject_BorderColor);--_ui5-v1-21-0-rc-5_split_text_button_attention_hover_border: var(--sapButton_BorderWidth) solid var(--sapButton_Attention_BorderColor);--_ui5-v1-21-0-rc-5_split_text_button_transparent_hover_border: var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_--_ui5-v1-21-0-rc-5_split_button_text_button_border_width_rtl: .0625rem .0625rem .0625rem 0;--_ui5-v1-21-0-rc-5_split_text_button_emphasized_border_width_rtl: .0625rem;--_ui5-v1-21-0-rc-5_split_arrow_button_hover_border: var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-21-0-rc-5_split_arrow_button_emphasized_hover_border: var(--sapButton_BorderWidth) solid var(--sapButton_Emphasized_BorderColor);--_ui5-v1-21-0-rc-5_split_arrow_button_emphasized_hover_border_left: var(--sapButton_BorderWidth) solid var(--sapButton_Emphasized_BorderColor);--_ui5-v1-21-0-rc-5_split_arrow_button_positive_hover_border: var(--sapButton_BorderWidth) solid var(--sapButton_Accept_BorderColor);--_ui5-v1-21-0-rc-5_split_arrow_button_negative_hover_border: var(--sapButton_BorderWidth) solid var(--sapButton_Reject_BorderColor);--_ui5-v1-21-0-rc-5_split_arrow_button_attention_hover_border: var(--sapButton_BorderWidth) solid var(--sapButton_Attention_BorderColor);--_ui5-v1-21-0-rc-5_split_arrow_button_transparent_hover_border: var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-21-0-rc-5_split_text_button_hover_border_left: var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-21-0-rc-5_split_text_button_emphasized_hover_border_left: var(--sapButton_BorderWidth) solid var(--sapButton_Emphasized_BorderColor);--_ui5-v1-21-0-rc-5_split_text_button_positive_hover_border_left: var(--sapButton_BorderWidth) solid var(--sapButton_Accept_BorderColor);--_ui5-v1-21-0-rc-5_split_text_button_negative_hover_border_left: var(--sapButton_BorderWidth) solid var(--sapButton_Reject_BorderColor);--_ui5-v1-21-0-rc-5_split_text_button_attention_hover_border_left: var(--sapButton_BorderWidth) solid var(--sapButton_Attention_BorderColor);--_ui5-v1-21-0-rc-5_split_text_button_transparent_hover_border_left: var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-21-0-rc-5_split_text_button_hover_border_right_rtl: var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-21-0-rc-5_split_arrow_button_wrapper_emphasized_hover_border_left_width_rtl: var(--sapButton_BorderWidth);--_ui5-v1-21-0-rc-5_split_button_focused_border: .125rem solid var(--sapContent_FocusColor);--_ui5-v1-21-0-rc-5_split_button_focused_border_radius: .375rem;--_ui5-v1-21-0-rc-5_split_button_hover_border_radius: var(--_ui5-v1-21-0-rc-5_button_border_radius);--_ui5-v1-21-0-rc-5_split_button_middle_separator_width: 0;--_ui5-v1-21-0-rc-5_split_button_middle_separator_left: -.0625rem;--_ui5-v1-21-0-rc-5_split_button_middle_separator_hover_display: none;--_ui5-v1-21-0-rc-5_split_button_text_button_width: 2.375rem;--_ui5-v1-21-0-rc-5_split_button_text_button_right_border_width: .0625rem;--_ui5-v1-21-0-rc-5_split_button_transparent_hover_background: var(--sapButton_Lite_Hover_Background);--_ui5-v1-21-0-rc-5_split_button_transparent_hover_color: var(--sapButton_TextColor);--_ui5-v1-21-0-rc-5_split_button_host_transparent_hover_box_shadow: inset 0 0 0 var(--sapButton_BorderWidth) var(--sapButton_BorderColor);--_ui5-v1-21-0-rc-5_split_button_inner_focused_border_radius_outer: .375rem;--_ui5-v1-21-0-rc-5_split_button_inner_focused_border_radius_inner: .375rem;--_ui5-v1-21-0-rc-5_split_button_emphasized_separator_color: transparent;--_ui5-v1-21-0-rc-5_split_button_positive_separator_color: transparent;--_ui5-v1-21-0-rc-5_split_button_negative_separator_color: transparent;--_ui5-v1-21-0-rc-5_split_button_attention_separator_color: transparent;--_ui5-v1-21-0-rc-5_split_button_attention_separator_color_default: var(--sapButton_Attention_TextColor);--_ui5-v1-21-0-rc-5_split_text_button_hover_border_right: var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-21-0-rc-5_split_text_button_emphasized_hover_border_right: none;--_ui5-v1-21-0-rc-5_split_text_button_positive_hover_border_right: var(--sapButton_BorderWidth) solid var(--sapButton_Accept_BorderColor);--_ui5-v1-21-0-rc-5_split_text_button_negative_hover_border_right: var(--sapButton_BorderWidth) solid var(--sapButton_Reject_BorderColor);--_ui5-v1-21-0-rc-5_split_text_button_attention_hover_border_right: var(--sapButton_BorderWidth) solid var(--sapButton_Attention_BorderColor);--_ui5-v1-21-0-rc-5_split_text_button_transparent_hover_border_right: var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-21-0-rc-5_split_text_button_hover_border_left_rtl: var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-21-0-rc-5_split_text_button_emphasized_hover_border_left_rtl: var(--sapButton_BorderWidth) solid var(--sapButton_Emphasized_BorderColor);--_ui5-v1-21-0-rc-5_split_text_button_positive_hover_border_left_rtl: var(--sapButton_BorderWidth) solid var(--sapButton_Accept_BorderColor);--_ui5-v1-21-0-rc-5_split_text_button_negative_hover_border_left_rtl: var(--sapButton_BorderWidth) solid var(--sapButton_Reject_BorderColor);--_ui5-v1-21-0-rc-5_split_text_button_attention_hover_border_left_rtl: var(--sapButton_BorderWidth) solid var(--sapButton_Attention_BorderColor);--_ui5-v1-21-0-rc-5_split_text_button_transparent_hover_border_left_rtl: var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-21-0-rc-5_split_text_button_emphasized_hover_border_right_rtl: var(--sapButton_BorderWidth) solid var(--sapButton_Emphasized_BorderColor);--_ui5-v1-21-0-rc-5_split_text_button_positive_hover_border_right_rtl: var(--sapButton_BorderWidth) solid var(--sapButton_Accept_BorderColor);--_ui5-v1-21-0-rc-5_split_text_button_negative_hover_border_right_rtl: var(--sapButton_BorderWidth) solid var(--sapButton_Reject_BorderColor);--_ui5-v1-21-0-rc-5_split_text_button_attention_hover_border_right_rtl: var(--sapButton_BorderWidth) solid var(--sapButton_Attention_BorderColor);--_ui5-v1-21-0-rc-5_split_text_button_transparent_hover_border_right_rtl: var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-21-0-rc-5_tc_header_height: var(--_ui5-v1-21-0-rc-5_tc_item_height);--_ui5-v1-21-0-rc-5_tc_header_height_text_only: var(--_ui5-v1-21-0-rc-5_tc_item_text_only_height);--_ui5-v1-21-0-rc-5_tc_header_height_text_with_additional_text: var(--_ui5-v1-21-0-rc-5_tc_item_text_only_with_additional_text_height);--_ui5-v1-21-0-rc-5_tc_header_box_shadow: var(--sapContent_HeaderShadow);--_ui5-v1-21-0-rc-5_tc_header_background: var(--sapObjectHeader_Background);--_ui5-v1-21-0-rc-5_tc_header_background_translucent: var(--sapObjectHeader_Background);--_ui5-v1-21-0-rc-5_tc_content_background: var(--sapBackgroundColor);--_ui5-v1-21-0-rc-5_tc_content_background_translucent: var(--sapGroup_ContentBackground);--_ui5-v1-21-0-rc-5_tc_headeritem_padding: 1rem;--_ui5-v1-21-0-rc-5_tc_headerItem_additional_text_color: var(--sapContent_LabelColor);--_ui5-v1-21-0-rc-5_tc_headerItem_text_selected_color: var(--sapSelectedColor);--_ui5-v1-21-0-rc-5_tc_headerItem_text_selected_hover_color: var(--sapSelectedColor);--_ui5-v1-21-0-rc-5_tc_headerItem_additional_text_font_weight: normal;--_ui5-v1-21-0-rc-5_tc_headerItem_neutral_color: var(--sapNeutralTextColor);--_ui5-v1-21-0-rc-5_tc_headerItem_positive_color: var(--sapPositiveTextColor);--_ui5-v1-21-0-rc-5_tc_headerItem_negative_color: var(--sapNegativeTextColor);--_ui5-v1-21-0-rc-5_tc_headerItem_critical_color: var(--sapCriticalTextColor);--_ui5-v1-21-0-rc-5_tc_headerItem_neutral_border_color: var(--sapNeutralElementColor);--_ui5-v1-21-0-rc-5_tc_headerItem_positive_border_color: var(--sapPositiveElementColor);--_ui5-v1-21-0-rc-5_tc_headerItem_negative_border_color: var(--sapNegativeElementColor);--_ui5-v1-21-0-rc-5_tc_headerItem_critical_border_color: var(--sapCriticalElementColor);--_ui5-v1-21-0-rc-5_tc_headerItem_neutral_selected_border_color: var(--_ui5-v1-21-0-rc-5_tc_headerItem_neutral_color);--_ui5-v1-21-0-rc-5_tc_headerItem_positive_selected_border_color: var(--_ui5-v1-21-0-rc-5_tc_headerItem_positive_color);--_ui5-v1-21-0-rc-5_tc_headerItem_negative_selected_border_color: var(--_ui5-v1-21-0-rc-5_tc_headerItem_negative_color);--_ui5-v1-21-0-rc-5_tc_headerItem_critical_selected_border_color: var(--_ui5-v1-21-0-rc-5_tc_headerItem_critical_color);--_ui5-v1-21-0-rc-5_tc_headerItem_transition: none;--_ui5-v1-21-0-rc-5_tc_headerItem_hover_border_visibility: hidden;--_ui5-v1-21-0-rc-5_tc_headerItemContent_border_radius: .125rem .125rem 0 0;--_ui5-v1-21-0-rc-5_tc_headerItemContent_border_bg: transparent;--_ui5-v1-21-0-rc-5_tc_headerItem_neutral_border_bg: transparent;--_ui5-v1-21-0-rc-5_tc_headerItem_positive_border_bg: transparent;--_ui5-v1-21-0-rc-5_tc_headerItem_negative_border_bg: transparent;--_ui5-v1-21-0-rc-5_tc_headerItem_critical_border_bg: transparent;--_ui5-v1-21-0-rc-5_tc_headerItemContent_border_height: 0;--_ui5-v1-21-0-rc-5_tc_headerItemContent_focus_offset: 1rem;--_ui5-v1-21-0-rc-5_tc_headerItem_text_focus_border_offset_left: 0px;--_ui5-v1-21-0-rc-5_tc_headerItem_text_focus_border_offset_right: 0px;--_ui5-v1-21-0-rc-5_tc_headerItem_text_focus_border_offset_top: 0px;--_ui5-v1-21-0-rc-5_tc_headerItem_text_focus_border_offset_bottom: 0px;--_ui5-v1-21-0-rc-5_tc_headerItem_mixed_mode_focus_border_offset_left: .75rem;--_ui5-v1-21-0-rc-5_tc_headerItem_mixed_mode_focus_border_offset_right: .625rem;--_ui5-v1-21-0-rc-5_tc_headerItem_mixed_mode_focus_border_offset_top: .75rem;--_ui5-v1-21-0-rc-5_tc_headerItem_mixed_mode_focus_border_offset_bottom: .75rem;--_ui5-v1-21-0-rc-5_tc_headerItemContent_focus_border: none;--_ui5-v1-21-0-rc-5_tc_headerItemContent_default_focus_border: none;--_ui5-v1-21-0-rc-5_tc_headerItemContent_focus_border_radius: 0;--_ui5-v1-21-0-rc-5_tc_headerItemSemanticIcon_display: none;--_ui5-v1-21-0-rc-5_tc_headerItemSemanticIcon_size: .75rem;--_ui5-v1-21-0-rc-5_tc_mixedMode_itemText_font_family: var(--sapFontFamily);--_ui5-v1-21-0-rc-5_tc_mixedMode_itemText_font_size: var(--sapFontSmallSize);--_ui5-v1-21-0-rc-5_tc_mixedMode_itemText_font_weight: normal;--_ui5-v1-21-0-rc-5_tc_overflowItem_positive_color: var(--sapPositiveColor);--_ui5-v1-21-0-rc-5_tc_overflowItem_negative_color: var(--sapNegativeColor);--_ui5-v1-21-0-rc-5_tc_overflowItem_critical_color: var(--sapCriticalColor);--_ui5-v1-21-0-rc-5_tc_overflowItem_focus_offset: .125rem;--_ui5-v1-21-0-rc-5_tc_overflowItem_extraIndent: 0rem;--_ui5-v1-21-0-rc-5_tc_headerItemIcon_positive_selected_background: var(--sapPositiveColor);--_ui5-v1-21-0-rc-5_tc_headerItemIcon_negative_selected_background: var(--sapNegativeColor);--_ui5-v1-21-0-rc-5_tc_headerItemIcon_critical_selected_background: var(--sapCriticalColor);--_ui5-v1-21-0-rc-5_tc_headerItemIcon_neutral_selected_background: var(--sapNeutralColor);--_ui5-v1-21-0-rc-5_tc_headerItemIcon_semantic_selected_color: var(--sapGroup_ContentBackground);--_ui5-v1-21-0-rc-5_tc_header_border_bottom: .0625rem solid var(--sapObjectHeader_Background);--_ui5-v1-21-0-rc-5_tc_headerItemContent_border_bottom: .1875rem solid var(--sapSelectedColor);--_ui5-v1-21-0-rc-5_tc_headerItem_color: var(--sapTextColor);--_ui5-v1-21-0-rc-5_tc_overflowItem_default_color: var(--sapTextColor);--_ui5-v1-21-0-rc-5_tc_overflowItem_current_color: CurrentColor;--_ui5-v1-21-0-rc-5_tc_content_border_bottom: .0625rem solid var(--sapObjectHeader_BorderColor);--_ui5-v1-21-0-rc-5_tc_headerItem_expand_button_margin_inline_start: 0rem;--_ui5-v1-21-0-rc-5_tc_headerItem_single_click_expand_button_margin_inline_start: .25rem;--_ui5-v1-21-0-rc-5_tc_headerItem_expand_button_border_radius: .25rem;--_ui5-v1-21-0-rc-5_tc_headerItem_expand_button_separator_display: inline-block;--_ui5-v1-21-0-rc-5_tc_headerItem_focus_border: .125rem solid var(--sapContent_FocusColor);--_ui5-v1-21-0-rc-5_tc_headerItem_focus_border_offset: -5px;--_ui5-v1-21-0-rc-5_tc_headerItemIcon_focus_border_radius: 50%;--_ui5-v1-21-0-rc-5_tc_headerItem_focus_border_radius: .375rem;--_ui5-v1-21-0-rc-5_tc_headeritem_text_font_weight: bold;--_ui5-v1-21-0-rc-5_tc_headerItem_focus_offset: 1px;--_ui5-v1-21-0-rc-5_tc_headerItem_text_hover_color: var(--sapContent_Selected_ForegroundColor);--_ui5-v1-21-0-rc-5_tc_headerItemIcon_border: .125rem solid var(--sapContent_Selected_ForegroundColor);--_ui5-v1-21-0-rc-5_tc_headerItemIcon_color: var(--sapContent_Selected_ForegroundColor);--_ui5-v1-21-0-rc-5_tc_headerItemIcon_selected_background: var(--sapContent_Selected_ForegroundColor);--_ui5-v1-21-0-rc-5_tc_headerItemIcon_background_color: var(--sapContent_Selected_Background);--_ui5-v1-21-0-rc-5_tc_headerItemIcon_selected_color: var(--sapContent_ContrastIconColor);--_ui5-v1-21-0-rc-5_tc_mixedMode_itemText_color: var(--sapTextColor);--_ui5-v1-21-0-rc-5_tc_overflow_text_color: var(--sapTextColor);--_ui5-v1-21-0-rc-5_textarea_state_border_width: .125rem;--_ui5-v1-21-0-rc-5_textarea_information_border_width: .125rem;--_ui5-v1-21-0-rc-5_textarea_placeholder_font_style: italic;--_ui5-v1-21-0-rc-5_textarea_value_state_error_warning_placeholder_font_weight: normal;--_ui5-v1-21-0-rc-5_textarea_error_placeholder_font_style: italic;--_ui5-v1-21-0-rc-5_textarea_error_placeholder_color: var(--sapField_PlaceholderTextColor);--_ui5-v1-21-0-rc-5_textarea_error_hover_background_color: var(--sapField_Hover_Background);--_ui5-v1-21-0-rc-5_textarea_disabled_opacity: .4;--_ui5-v1-21-0-rc-5_textarea_focus_pseudo_element_content: "";--_ui5-v1-21-0-rc-5_textarea_min_height: 2.25rem;--_ui5-v1-21-0-rc-5_textarea_padding_right_and_left_readonly: .5625rem;--_ui5-v1-21-0-rc-5_textarea_padding_top_readonly: .4375rem;--_ui5-v1-21-0-rc-5_textarea_exceeded_text_height: 1rem;--_ui5-v1-21-0-rc-5_textarea_hover_border: none;--_ui5-v1-21-0-rc-5_textarea_focus_border_radius: .25rem;--_ui5-v1-21-0-rc-5_textarea_error_warning_border_style: none;--_ui5-v1-21-0-rc-5_textarea_line_height: 1.5;--_ui5-v1-21-0-rc-5_textarea_focused_value_state_error_background: var(--sapField_Hover_Background);--_ui5-v1-21-0-rc-5_textarea_focused_value_state_warning_background: var(--sapField_Hover_Background);--_ui5-v1-21-0-rc-5_textarea_focused_value_state_success_background: var(--sapField_Hover_Background);--_ui5-v1-21-0-rc-5_textarea_focused_value_state_information_background: var(--sapField_Hover_Background);--_ui5-v1-21-0-rc-5_textarea_focused_value_state_error_focus_outline_color: var(--sapField_InvalidColor);--_ui5-v1-21-0-rc-5_textarea_focused_value_state_warning_focus_outline_color: var(--sapField_WarningColor);--_ui5-v1-21-0-rc-5_textarea_focused_value_state_success_focus_outline_color: var(--sapField_SuccessColor);--_ui5-v1-21-0-rc-5_textarea_focus_offset: 0;--_ui5-v1-21-0-rc-5_textarea_readonly_focus_offset: 1px;--_ui5-v1-21-0-rc-5_textarea_focus_outline_color: var(--sapField_Active_BorderColor);--_ui5-v1-21-0-rc-5_textarea_value_state_focus_offset: 0;--_ui5-v1-21-0-rc-5_textarea_wrapper_padding: .0625rem;--_ui5-v1-21-0-rc-5_textarea_success_wrapper_padding: .0625rem;--_ui5-v1-21-0-rc-5_textarea_warning_error_wrapper_padding: .0625rem .0625rem .125rem .0625rem;--_ui5-v1-21-0-rc-5_textarea_information_wrapper_padding: .0625rem .0625rem .125rem .0625rem;--_ui5-v1-21-0-rc-5_textarea_padding_bottom_readonly: .375rem;--_ui5-v1-21-0-rc-5_textarea_padding_top_error_warning: .5rem;--_ui5-v1-21-0-rc-5_textarea_padding_bottom_error_warning: .4375rem;--_ui5-v1-21-0-rc-5_textarea_padding_top_information: .5rem;--_ui5-v1-21-0-rc-5_textarea_padding_bottom_information: .4375rem;--_ui5-v1-21-0-rc-5_textarea_padding_right_and_left: .625rem;--_ui5-v1-21-0-rc-5_textarea_padding_right_and_left_error_warning: .625rem;--_ui5-v1-21-0-rc-5_textarea_padding_right_and_left_information: .625rem;--_ui5-v1-21-0-rc-5_textarea_readonly_border_style: dashed;--_ui5-v1-21-0-rc-5_time_picker_border: .0625rem solid transparent;--_ui5-v1-21-0-rc-5-time_picker_border_radius: .25rem;--_ui5-v1-21-0-rc-5_toast_vertical_offset: 3rem;--_ui5-v1-21-0-rc-5_toast_horizontal_offset: 2rem;--_ui5-v1-21-0-rc-5_toast_background: var(--sapList_Background);--_ui5-v1-21-0-rc-5_toast_shadow: var(--sapContent_Shadow2);--_ui5-v1-21-0-rc-5_toast_offset_width: -.1875rem;--_ui5-v1-21-0-rc-5_wheelslider_item_text_size: var(--sapFontSize);--_ui5-v1-21-0-rc-5_wheelslider_label_text_size: var(--sapFontSmallSize);--_ui5-v1-21-0-rc-5_wheelslider_selection_frame_margin_top: calc(var(--_ui5-v1-21-0-rc-5_wheelslider_item_height) * 2);--_ui5-v1-21-0-rc-5_wheelslider_mobile_selection_frame_margin_top: calc(var(--_ui5-v1-21-0-rc-5_wheelslider_item_height) * 4);--_ui5-v1-21-0-rc-5_wheelslider_label_text_color: var(--sapContent_LabelColor);--_ui5-v1-21-0-rc-5_wheelslider_height: 240px;--_ui5-v1-21-0-rc-5_wheelslider_mobile_height: 432px;--_ui5-v1-21-0-rc-5_wheelslider_item_width: 48px;--_ui5-v1-21-0-rc-5_wheelslider_item_height: 46px;--_ui5-v1-21-0-rc-5_wheelslider_arrows_visibility: hidden;--_ui5-v1-21-0-rc-5_wheelslider_item_background_color: var(--sapLegend_WorkingBackground);--_ui5-v1-21-0-rc-5_wheelslider_item_text_color: var(--sapTextColor);--_ui_wheelslider_item_hover_color: var(--sapList_AlternatingBackground);--_ui_wheelslider_item_expanded_hover_color: var(--sapList_AlternatingBackground);--_ui_wheelslider_item_exanded_hover_color: var(--sapList_AlternatingBackground);--_ui5-v1-21-0-rc-5_wheelslider_item_border_color: var(--sapList_SelectionBorderColor);--_ui5-v1-21-0-rc-5_wheelslider_item_expanded_border_color: transparent;--_ui5-v1-21-0-rc-5_wheelslider_item_hovered_border_color: transparent;--_ui5-v1-21-0-rc-5_wheelslider_collapsed_item_text_color: var(--sapList_SelectionBorderColor);--_ui5-v1-21-0-rc-5_wheelslider_selected_item_background_color: var(--sapContent_Selected_Background);--_ui5-v1-21-0-rc-5_wheelslider_selected_item_hover_background_color: var(--sapButton_Emphasized_Hover_BorderColor);--_ui5-v1-21-0-rc-5_wheelslider_active_item_background_color:var(--sapContent_Selected_Background);--_ui5-v1-21-0-rc-5_wheelslider_active_item_text_color: var(--sapContent_Selected_TextColor);--_ui5-v1-21-0-rc-5_wheelslider_selection_frame_color: var(--sapList_SelectionBorderColor);--_ui_wheelslider_item_border_radius: var(--_ui5-v1-21-0-rc-5_button_border_radius);--_ui5-v1-21-0-rc-5_toggle_button_pressed_focussed: var(--sapButton_Selected_BorderColor);--_ui5-v1-21-0-rc-5_toggle_button_pressed_focussed_hovered: var(--sapButton_Selected_BorderColor);--_ui5-v1-21-0-rc-5_toggle_button_selected_positive_text_color: var(--sapButton_Selected_TextColor);--_ui5-v1-21-0-rc-5_toggle_button_selected_negative_text_color: var(--sapButton_Selected_TextColor);--_ui5-v1-21-0-rc-5_toggle_button_selected_attention_text_color: var(--sapButton_Selected_TextColor);--_ui5-v1-21-0-rc-5_toggle_button_emphasized_pressed_focussed_hovered: var(--sapContent_FocusColor);--_ui5-v1-21-0-rc-5_toggle_button_emphasized_text_shadow: none;--_ui5-v1-21-0-rc-5_yearpicker_item_selected_focus: var(--sapContent_Selected_Background);--_ui5-v1-21-0-rc-5_yearpicker_item_border: none;--_ui5-v1-21-0-rc-5_yearpicker_item_margin: 1px;--_ui5-v1-21-0-rc-5_yearpicker_item_border_radius: .5rem;--_ui5-v1-21-0-rc-5_yearpicker_item_focus_after_offset: .25rem;--_ui5-v1-21-0-rc-5_yearpicker_item_focus_after_border: var(--_ui5-v1-21-0-rc-5_button_focused_border);--_ui5-v1-21-0-rc-5_yearpicker_item_focus_after_border_radius: .5rem;--_ui5-v1-21-0-rc-5_yearpicker_item_focus_after_width: calc(100% - .5rem) ;--_ui5-v1-21-0-rc-5_yearpicker_item_focus_after_height: calc(100% - .5rem) ;--_ui5-v1-21-0-rc-5_yearpicker_item_selected_background_color: transparent;--_ui5-v1-21-0-rc-5_yearpicker_item_selected_text_color: var(--sapContent_Selected_TextColor);--_ui5-v1-21-0-rc-5_yearpicker_item_selected_box_shadow: none;--_ui5-v1-21-0-rc-5_yearpicker_item_selected_hover_color: var(--sapList_Hover_Background);--_ui5-v1-21-0-rc-5_yearpicker_item_focus_after_outline: none;--_ui5-v1-21-0-rc-5_calendar_header_middle_button_width: 6.25rem;--_ui5-v1-21-0-rc-5_calendar_header_middle_button_flex: 1 1 auto;--_ui5-v1-21-0-rc-5_calendar_header_middle_button_focus_after_display: block;--_ui5-v1-21-0-rc-5_calendar_header_middle_button_focus_after_width: calc(100% - .375rem) ;--_ui5-v1-21-0-rc-5_calendar_header_middle_button_focus_after_height: calc(100% - .375rem) ;--_ui5-v1-21-0-rc-5_calendar_header_middle_button_focus_after_top_offset: .125rem;--_ui5-v1-21-0-rc-5_calendar_header_middle_button_focus_after_left_offset: .125rem;--_ui5-v1-21-0-rc-5_calendar_header_arrow_button_border: none;--_ui5-v1-21-0-rc-5_calendar_header_arrow_button_border_radius: .5rem;--_ui5-v1-21-0-rc-5_calendar_header_button_background_color: var(--sapButton_Lite_Background);--_ui5-v1-21-0-rc-5_calendar_header_arrow_button_box_shadow: 0 0 .125rem 0 rgb(85 107 130 / 72%);--_ui5-v1-21-0-rc-5_calendar_header_middle_button_focus_border_radius: .5rem;--_ui5-v1-21-0-rc-5_calendar_header_middle_button_focus_border: none;--_ui5-v1-21-0-rc-5_calendar_header_middle_button_focus_after_border: none;--_ui5-v1-21-0-rc-5_calendar_header_middle_button_focus_background: transparent;--_ui5-v1-21-0-rc-5_calendar_header_middle_button_focus_outline: .125rem solid var(--sapSelectedColor);--_ui5-v1-21-0-rc-5_calendar_header_middle_button_focus_active_outline: .0625rem solid var(--sapSelectedColor);--_ui5-v1-21-0-rc-5_calendar_header_middle_button_focus_active_background: transparent;--_ui5-v1-21-0-rc-5_token_background: var(--sapButton_TokenBackground);--_ui5-v1-21-0-rc-5_token_readonly_background: var(--sapButton_TokenBackground);--_ui5-v1-21-0-rc-5_token_readonly_color: var(--sapContent_LabelColor);--_ui5-v1-21-0-rc-5_token_right_margin: .3125rem;--_ui5-v1-21-0-rc-5_token_padding: .25rem 0;--_ui5-v1-21-0-rc-5_token_left_padding: .3125rem;--_ui5-v1-21-0-rc-5_token_focused_selected_border: 1px solid var(--sapButton_Selected_BorderColor);--_ui5-v1-21-0-rc-5_token_focus_offset: -.25rem;--_ui5-v1-21-0-rc-5_token_focus_outline_width: .0625rem;--_ui5-v1-21-0-rc-5_token_hover_border_color: var(--sapButton_TokenBorderColor);--_ui5-v1-21-0-rc-5_token_selected_focus_outline: none;--_ui5-v1-21-0-rc-5_token_focus_outline: none;--_ui5-v1-21-0-rc-5_token_outline_offset: .125rem;--_ui5-v1-21-0-rc-5_token_selected_hover_border_color: var(--sapButton_Selected_BorderColor);--ui5-v1-21-0-rc-5_token_focus_pseudo_element_content: "";--_ui5-v1-21-0-rc-5_token_border_radius: .375rem;--_ui5-v1-21-0-rc-5_token_focus_outline_border_radius: .5rem;--_ui5-v1-21-0-rc-5_token_text_color: var(--sapTextColor);--_ui5-v1-21-0-rc-5_token_selected_text_font_family: var(--sapFontSemiboldDuplexFamily);--_ui5-v1-21-0-rc-5_token_selected_internal_border_bottom: .125rem solid var(--sapButton_Selected_BorderColor);--_ui5-v1-21-0-rc-5_token_selected_internal_border_bottom_radius: .1875rem;--_ui5-v1-21-0-rc-5_token_text_icon_top: .0625rem;--_ui5-v1-21-0-rc-5_token_selected_focused_offset_bottom: -.375rem;--_ui5-v1-21-0-rc-5_token_readonly_padding: .25rem .3125rem;--_ui5-v1-21-0-rc-5_tokenizer-popover_offset: .3125rem;--_ui5-v1-21-0-rc-5_tokenizer_n_more_text_color: var(--sapLinkColor);--_ui5-v1-21-0-rc-5-multi_combobox_token_margin_top: 1px;--_ui5-v1-21-0-rc-5_slider_progress_container_dot_background: var(--sapField_BorderColor);--_ui5-v1-21-0-rc-5_slider_progress_border: none;--_ui5-v1-21-0-rc-5_slider_padding: 1.406rem 1.0625rem;--_ui5-v1-21-0-rc-5_slider_inner_height: .25rem;--_ui5-v1-21-0-rc-5_slider_outer_height: 1.6875rem;--_ui5-v1-21-0-rc-5_slider_progress_border_radius: .25rem;--_ui5-v1-21-0-rc-5_slider_tickmark_bg: var(--sapField_BorderColor);--_ui5-v1-21-0-rc-5_slider_handle_margin_left: calc(-1 * (var(--_ui5-v1-21-0-rc-5_slider_handle_width) / 2));--_ui5-v1-21-0-rc-5_slider_handle_outline_offset: .075rem;--_ui5-v1-21-0-rc-5_slider_progress_outline: .0625rem dotted var(--sapContent_FocusColor);--_ui5-v1-21-0-rc-5_slider_progress_outline_offset: -.8125rem;--_ui5-v1-21-0-rc-5_slider_disabled_opacity: .4;--_ui5-v1-21-0-rc-5_slider_tooltip_border_color: var(--sapField_BorderColor);--_ui5-v1-21-0-rc-5_range_slider_handle_background_focus: transparent;--_ui5-v1-21-0-rc-5_slider_progress_box_sizing: content-box;--_ui5-v1-21-0-rc-5_range_slider_focus_outline_width: 100%;--_ui5-v1-21-0-rc-5_slider_progress_outline_offset_left: 0;--_ui5-v1-21-0-rc-5_range_slider_focus_outline_radius: 0;--_ui5-v1-21-0-rc-5_slider_progress_container_top: 0;--_ui5-v1-21-0-rc-5_slider_progress_height: 100%;--_ui5-v1-21-0-rc-5_slider_active_progress_border: none;--_ui5-v1-21-0-rc-5_slider_active_progress_left: 0;--_ui5-v1-21-0-rc-5_slider_active_progress_top: 0;--_ui5-v1-21-0-rc-5_slider_no_tickmarks_progress_container_top: var(--_ui5-v1-21-0-rc-5_slider_progress_container_top);--_ui5-v1-21-0-rc-5_slider_no_tickmarks_progress_height: var(--_ui5-v1-21-0-rc-5_slider_progress_height);--_ui5-v1-21-0-rc-5_slider_no_tickmarks_active_progress_border: var(--_ui5-v1-21-0-rc-5_slider_active_progress_border);--_ui5-v1-21-0-rc-5_slider_no_tickmarks_active_progress_left: var(--_ui5-v1-21-0-rc-5_slider_active_progress_left);--_ui5-v1-21-0-rc-5_slider_no_tickmarks_active_progress_top: var(--_ui5-v1-21-0-rc-5_slider_active_progress_top);--_ui5-v1-21-0-rc-5_slider_handle_focus_visibility: none;--_ui5-v1-21-0-rc-5_slider_handle_icon_size: 1rem;--_ui5-v1-21-0-rc-5_slider_progress_container_background: var(--sapSlider_Background);--_ui5-v1-21-0-rc-5_slider_progress_container_dot_display: block;--_ui5-v1-21-0-rc-5_slider_inner_min_width: 4rem;--_ui5-v1-21-0-rc-5_slider_progress_background: var(--sapSlider_Selected_Background);--_ui5-v1-21-0-rc-5_slider_progress_before_background: var(--sapSlider_Selected_Background);--_ui5-v1-21-0-rc-5_slider_progress_after_background: var(--sapContent_MeasureIndicatorColor);--_ui5-v1-21-0-rc-5_slider_handle_background: var(--sapSlider_HandleBackground);--_ui5-v1-21-0-rc-5_slider_handle_icon_display: inline-block;--_ui5-v1-21-0-rc-5_slider_handle_border: .0625rem solid var(--sapSlider_HandleBorderColor);--_ui5-v1-21-0-rc-5_slider_handle_border_radius: .5rem;--_ui5-v1-21-0-rc-5_slider_handle_height: 1.5rem;--_ui5-v1-21-0-rc-5_slider_handle_width: 2rem;--_ui5-v1-21-0-rc-5_slider_handle_top: -.625rem;--_ui5-v1-21-0-rc-5_slider_handle_font_family: "SAP-icons";--_ui5-v1-21-0-rc-5_slider_handle_hover_border: .0625rem solid var(--sapSlider_Hover_HandleBorderColor);--_ui5-v1-21-0-rc-5_slider_handle_focus_border: .125rem solid var(--sapContent_FocusColor);--_ui5-v1-21-0-rc-5_slider_handle_background_focus: var(--sapSlider_Active_RangeHandleBackground);--_ui5-v1-21-0-rc-5_slider_handle_outline: none;--_ui5-v1-21-0-rc-5_slider_handle_hover_background: var(--sapSlider_Hover_HandleBackground);--_ui5-v1-21-0-rc-5_slider_tooltip_background: var(--sapField_Focus_Background);--_ui5-v1-21-0-rc-5_slider_tooltip_border: none;--_ui5-v1-21-0-rc-5_slider_tooltip_border_radius: .5rem;--_ui5-v1-21-0-rc-5_slider_tooltip_box_shadow: var(--sapContent_Shadow1);--_ui5-v1-21-0-rc-5_range_slider_legacy_progress_focus_display: none;--_ui5-v1-21-0-rc-5_range_slider_progress_focus_display: block;--_ui5-v1-21-0-rc-5_slider_tickmark_in_range_bg: var(--sapSlider_Selected_BorderColor);--_ui5-v1-21-0-rc-5_slider_label_fontsize: var(--sapFontSmallSize);--_ui5-v1-21-0-rc-5_slider_label_color: var(--sapContent_LabelColor);--_ui5-v1-21-0-rc-5_slider_tooltip_min_width: 2rem;--_ui5-v1-21-0-rc-5_slider_tooltip_padding: .25rem;--_ui5-v1-21-0-rc-5_slider_tooltip_fontsize: var(--sapFontSmallSize);--_ui5-v1-21-0-rc-5_slider_tooltip_color: var(--sapContent_LabelColor);--_ui5-v1-21-0-rc-5_slider_tooltip_height: 1.375rem;--_ui5-v1-21-0-rc-5_slider_handle_focus_width: 1px;--_ui5-v1-21-0-rc-5_slider_start_end_point_size: .5rem;--_ui5-v1-21-0-rc-5_slider_start_end_point_left: -.75rem;--_ui5-v1-21-0-rc-5_slider_start_end_point_top: -.125rem;--_ui5-v1-21-0-rc-5_slider_handle_focused_tooltip_distance: calc(var(--_ui5-v1-21-0-rc-5_slider_tooltip_bottom) - var(--_ui5-v1-21-0-rc-5_slider_handle_focus_width));--_ui5-v1-21-0-rc-5_slider_tooltip_border_box: border-box;--_ui5-v1-21-0-rc-5_range_slider_handle_active_background: var(--sapSlider_Active_RangeHandleBackground);--_ui5-v1-21-0-rc-5_range_slider_active_handle_icon_display: none;--_ui5-v1-21-0-rc-5_range_slider_progress_focus_top: -15px;--_ui5-v1-21-0-rc-5_range_slider_progress_focus_left: calc(-1 * (var(--_ui5-v1-21-0-rc-5_slider_handle_width) / 2) - 5px);--_ui5-v1-21-0-rc-5_range_slider_progress_focus_padding: 0 1rem 0 1rem;--_ui5-v1-21-0-rc-5_range_slider_progress_focus_width: calc(100% + var(--_ui5-v1-21-0-rc-5_slider_handle_width) + 10px);--_ui5-v1-21-0-rc-5_range_slider_progress_focus_height: calc(var(--_ui5-v1-21-0-rc-5_slider_handle_height) + 10px);--_ui5-v1-21-0-rc-5_range_slider_root_hover_handle_icon_display: inline-block;--_ui5-v1-21-0-rc-5_range_slider_root_hover_handle_bg: var(--_ui5-v1-21-0-rc-5_slider_handle_hover_background);--_ui5-v1-21-0-rc-5_range_slider_root_active_handle_icon_display: none;--_ui5-v1-21-0-rc-5_slider_tickmark_height: .5rem;--_ui5-v1-21-0-rc-5_slider_tickmark_top: -2px;--_ui5-v1-21-0-rc-5_slider_handle_box_sizing: border-box;--_ui5-v1-21-0-rc-5_range_slider_handle_background: var(--sapSlider_RangeHandleBackground);--_ui5-v1-21-0-rc-5_slider_tooltip_bottom: 2rem;--_ui5-v1-21-0-rc-5_value_state_message_border: none;--_ui5-v1-21-0-rc-5_value_state_header_border: none;--_ui5-v1-21-0-rc-5_input_value_state_icon_offset: .5rem;--_ui5-v1-21-0-rc-5_value_state_header_box_shadow_error: inset 0 -.0625rem var(--sapField_InvalidColor);--_ui5-v1-21-0-rc-5_value_state_header_box_shadow_information: inset 0 -.0625rem var(--sapField_InformationColor);--_ui5-v1-21-0-rc-5_value_state_header_box_shadow_success: inset 0 -.0625rem var(--sapField_SuccessColor);--_ui5-v1-21-0-rc-5_value_state_header_box_shadow_warning: inset 0 -.0625rem var(--sapField_WarningColor);--_ui5-v1-21-0-rc-5_value_state_message_icon_offset_phone: 1rem;--_ui5-v1-21-0-rc-5_value_state_header_border_bottom: none;--_ui5-v1-21-0-rc-5_input_value_state_icon_display: inline-block;--_ui5-v1-21-0-rc-5_value_state_message_padding: .5rem .5rem .5rem 1.875rem;--_ui5-v1-21-0-rc-5_value_state_header_padding: .5rem .5rem .5rem 1.875rem;--_ui5-v1-21-0-rc-5_value_state_message_popover_box_shadow: var(--sapContent_Shadow1);--_ui5-v1-21-0-rc-5_value_state_message_icon_width: 1rem;--_ui5-v1-21-0-rc-5_value_state_message_icon_height: 1rem;--_ui5-v1-21-0-rc-5_value_state_header_offset: -.25rem;--_ui5-v1-21-0-rc-5_value_state_message_popover_border_radius: var(--sapPopover_BorderCornerRadius);--_ui5-v1-21-0-rc-5_value_state_message_padding_phone: .5rem .5rem .5rem 2.375rem;--_ui5-v1-21-0-rc-5_value_state_message_line_height: 1.125rem;--ui5-v1-21-0-rc-5_table_bottom_border: 1px solid var(--sapList_BorderColor);--ui5-v1-21-0-rc-5_table_multiselect_column_width: 2.75rem;--ui5-v1-21-0-rc-5_table_header_row_border_width: 1px;--_ui5-v1-21-0-rc-5_table_load_more_border-bottom: none;--ui5-v1-21-0-rc-5_table_header_row_outline_width: var(--sapContent_FocusWidth);--ui5-v1-21-0-rc-5_table_header_row_font_family: var(--sapFontSemiboldDuplexFamily);--ui5-v1-21-0-rc-5_table_header_row_border_bottom_color: var(--sapList_HeaderBorderColor);--ui5-v1-21-0-rc-5_table_header_row_font_weight: bold;--ui5-v1-21-0-rc-5_table_multiselect_popin_row_padding: 3.25rem;--ui5-v1-21-0-rc-5_table_row_outline_width: var(--sapContent_FocusWidth);--ui5-v1-21-0-rc-5_table_group_row_font-weight: bold;--ui5-v1-21-0-rc-5_table_border_width: 1px 0 1px 0;--_ui5-v1-21-0-rc-5-toolbar-padding-left: .5rem;--_ui5-v1-21-0-rc-5-toolbar-padding-right: .5rem;--_ui5-v1-21-0-rc-5-toolbar-item-margin-left: 0;--_ui5-v1-21-0-rc-5-toolbar-item-margin-right: .25rem;--_ui5-v1-21-0-rc-5_step_input_min_width: 7.25rem;--_ui5-v1-21-0-rc-5_step_input_padding: 2.5rem;--_ui5-v1-21-0-rc-5_step_input_input_error_background_color: inherit;--_ui5-v1-21-0-rc-5-step_input_button_state_hover_background_color: var(--sapField_Hover_Background);--_ui5-v1-21-0-rc-5_step_input_border_style: none;--_ui5-v1-21-0-rc-5_step_input_border_style_hover: none;--_ui5-v1-21-0-rc-5_step_input_button_background_color: transparent;--_ui5-v1-21-0-rc-5_step_input_input_border: none;--_ui5-v1-21-0-rc-5_step_input_input_margin_top: 0;--_ui5-v1-21-0-rc-5_step_input_button_display: inline-flex;--_ui5-v1-21-0-rc-5_step_input_button_left: 0;--_ui5-v1-21-0-rc-5_step_input_button_right: 0;--_ui5-v1-21-0-rc-5_step_input_input_border_focused_after: .125rem solid #0070f2;--_ui5-v1-21-0-rc-5_step_input_input_border_top_bottom_focused_after: 0;--_ui5-v1-21-0-rc-5_step_input_input_border_radius_focused_after: .25rem;--_ui5-v1-21-0-rc-5_step_input_input_information_border_color_focused_after: var(--sapField_InformationColor);--_ui5-v1-21-0-rc-5_step_input_input_warning_border_color_focused_after: var(--sapField_WarningColor);--_ui5-v1-21-0-rc-5_step_input_input_success_border_color_focused_after: var(--sapField_SuccessColor);--_ui5-v1-21-0-rc-5_step_input_input_error_border_color_focused_after: var(--sapField_InvalidColor);--_ui5-v1-21-0-rc-5_step_input_disabled_button_background: none;--_ui5-v1-21-0-rc-5_step_input_border_color_hover: none;--_ui5-v1-21-0-rc-5_step_input_border_hover: none;--_ui5-v1-21-0-rc-5_input_input_background_color: transparent;--_ui5-v1-21-0-rc-5_load_more_padding: 0;--_ui5-v1-21-0-rc-5_load_more_border: 1px top solid transparent;--_ui5-v1-21-0-rc-5_load_more_border_radius: none;--_ui5-v1-21-0-rc-5_load_more_outline_width: var(--sapContent_FocusWidth);--_ui5-v1-21-0-rc-5_load_more_border-bottom: var(--sapList_BorderWidth) solid var(--sapList_BorderColor);--_ui5-v1-21-0-rc-5_calendar_height: 24.5rem;--_ui5-v1-21-0-rc-5_calendar_width: 20rem;--_ui5-v1-21-0-rc-5_calendar_padding: 1rem;--_ui5-v1-21-0-rc-5_calendar_left_right_padding: .5rem;--_ui5-v1-21-0-rc-5_calendar_top_bottom_padding: 1rem;--_ui5-v1-21-0-rc-5_calendar_header_height: 3rem;--_ui5-v1-21-0-rc-5_calendar_header_arrow_button_width: 2.5rem;--_ui5-v1-21-0-rc-5_calendar_header_padding: .25rem 0;--_ui5-v1-21-0-rc-5_checkbox_root_side_padding: .6875rem;--_ui5-v1-21-0-rc-5_checkbox_icon_size: 1rem;--_ui5-v1-21-0-rc-5_checkbox_partially_icon_size: .75rem;--_ui5-v1-21-0-rc-5_custom_list_item_rb_min_width: 2.75rem;--_ui5-v1-21-0-rc-5_day_picker_item_width: 2.25rem;--_ui5-v1-21-0-rc-5_day_picker_item_height: 2.875rem;--_ui5-v1-21-0-rc-5_day_picker_empty_height: 3rem;--_ui5-v1-21-0-rc-5_day_picker_item_justify_content: space-between;--_ui5-v1-21-0-rc-5_dp_two_calendar_item_now_text_padding_top: .387rem;--_ui5-v1-21-0-rc-5_dp_two_calendar_item_primary_text_height: 1.8125rem;--_ui5-v1-21-0-rc-5_dp_two_calendar_item_secondary_text_height: 1rem;--_ui5-v1-21-0-rc-5_dp_two_calendar_item_text_padding_top: .575rem;--_ui5-v1-21-0-rc-5_color-palette-swatch-container-padding: .3125rem .6875rem;--_ui5-v1-21-0-rc-5_datetime_picker_width: 40.0625rem;--_ui5-v1-21-0-rc-5_datetime_picker_height: 25rem;--_ui5-v1-21-0-rc-5_datetime_timeview_width: 17rem;--_ui5-v1-21-0-rc-5_datetime_timeview_phonemode_width: 19.5rem;--_ui5-v1-21-0-rc-5_datetime_timeview_padding: 1rem;--_ui5-v1-21-0-rc-5_dialog_content_min_height: 2.75rem;--_ui5-v1-21-0-rc-5_dialog_footer_height: 2.75rem;--_ui5-v1-21-0-rc-5_input_inner_padding: 0 .625rem;--_ui5-v1-21-0-rc-5_input_inner_padding_with_icon: 0 .25rem 0 .625rem;--_ui5-v1-21-0-rc-5_input_inner_space_to_tokenizer: .125rem;--_ui5-v1-21-0-rc-5_input_inner_space_to_n_more_text: .1875rem;--_ui5-v1-21-0-rc-5_list_no_data_height: 3rem;--_ui5-v1-21-0-rc-5_list_item_cb_margin_right: 0;--_ui5-v1-21-0-rc-5_list_item_title_size: var(--sapFontLargeSize);--_ui5-v1-21-0-rc-5_list_no_data_font_size: var(--sapFontLargeSize);--_ui5-v1-21-0-rc-5_list_item_img_size: 3rem;--_ui5-v1-21-0-rc-5_list_item_img_top_margin: .5rem;--_ui5-v1-21-0-rc-5_list_item_img_bottom_margin: .5rem;--_ui5-v1-21-0-rc-5_list_item_img_hn_margin: .75rem;--_ui5-v1-21-0-rc-5_list_item_dropdown_base_height: 2.5rem;--_ui5-v1-21-0-rc-5_list_item_base_height: var(--sapElement_LineHeight);--_ui5-v1-21-0-rc-5_list_item_icon_size: 1.125rem;--_ui5-v1-21-0-rc-5_list_item_icon_padding-inline-end: .5rem;--_ui5-v1-21-0-rc-5_list_item_selection_btn_margin_top: calc(-1 * var(--_ui5-v1-21-0-rc-5_checkbox_wrapper_padding));--_ui5-v1-21-0-rc-5_list_item_content_vertical_offset: calc((var(--_ui5-v1-21-0-rc-5_list_item_base_height) - var(--_ui5-v1-21-0-rc-5_list_item_title_size)) / 2);--_ui5-v1-21-0-rc-5_group_header_list_item_height: 2.75rem;--_ui5-v1-21-0-rc-5_list_busy_row_height: 3rem;--_ui5-v1-21-0-rc-5_month_picker_item_height: 3rem;--_ui5-v1-21-0-rc-5_list_buttons_left_space: .125rem;--_ui5-v1-21-0-rc-5_popup_default_header_height: 2.75rem;--_ui5-v1-21-0-rc-5-notification-overflow-popover-padding: .25rem .5rem;--_ui5-v1-21-0-rc-5_year_picker_item_height: 3rem;--_ui5-v1-21-0-rc-5_tokenizer_padding: .25rem;--_ui5-v1-21-0-rc-5_token_height: 1.625rem;--_ui5-v1-21-0-rc-5_token_icon_size: .75rem;--_ui5-v1-21-0-rc-5_token_icon_padding: .25rem .5rem;--_ui5-v1-21-0-rc-5_token_wrapper_right_padding: .3125rem;--_ui5-v1-21-0-rc-5_token_wrapper_left_padding: 0;--_ui5-v1-21-0-rc-5_tl_bubble_padding: 1rem;--_ui5-v1-21-0-rc-5_tl_indicator_before_bottom: -1.625rem;--_ui5-v1-21-0-rc-5_tl_padding: 1rem 1rem 1rem .5rem;--_ui5-v1-21-0-rc-5_tl_li_margin_bottom: 1.625rem;--_ui5-v1-21-0-rc-5_switch_focus_width_size_horizon_exp: calc(100% + 4px) ;--_ui5-v1-21-0-rc-5_switch_focus_height_size_horizon_exp: calc(100% + 4px) ;--_ui5-v1-21-0-rc-5_tc_item_text: 3rem;--_ui5-v1-21-0-rc-5_tc_item_height: 4.75rem;--_ui5-v1-21-0-rc-5_tc_item_text_only_height: 2.75rem;--_ui5-v1-21-0-rc-5_tc_item_text_only_with_additional_text_height: 3.75rem;--_ui5-v1-21-0-rc-5_tc_item_text_line_height: 1.325rem;--_ui5-v1-21-0-rc-5_tc_item_icon_circle_size: 2.75rem;--_ui5-v1-21-0-rc-5_tc_item_icon_size: 1.25rem;--_ui5-v1-21-0-rc-5_tc_item_add_text_margin_top: .375rem;--_ui5-v1-21-0-rc-5_textarea_margin: .25rem 0;--_ui5-v1-21-0-rc-5_radio_button_height: 2.75rem;--_ui5-v1-21-0-rc-5_radio_button_label_side_padding: .875rem;--_ui5-v1-21-0-rc-5_radio_button_inner_size: 2.75rem;--_ui5-v1-21-0-rc-5_radio_button_svg_size: 1.375rem;--_ui5-v1-21-0-rc-5-responsive_popover_header_height: 2.75rem;--ui5-v1-21-0-rc-5_side_navigation_item_height: 2.75rem;--_ui5-v1-21-0-rc-5_load_more_text_height: 2.75rem;--_ui5-v1-21-0-rc-5_load_more_text_font_size: var(--sapFontMediumSize);--_ui5-v1-21-0-rc-5_load_more_desc_padding: .375rem 2rem .875rem 2rem;--ui5-v1-21-0-rc-5_table_header_row_height: 2.75rem;--ui5-v1-21-0-rc-5_table_row_height: 2.75rem;--ui5-v1-21-0-rc-5_table_focus_outline_offset: -.125rem;--ui5-v1-21-0-rc-5_table_group_row_height: 2rem;--_ui5-v1-21-0-rc-5-tree-indent-step: 1.5rem;--_ui5-v1-21-0-rc-5-tree-toggle-box-width: 2.75rem;--_ui5-v1-21-0-rc-5-tree-toggle-box-height: 2.25rem;--_ui5-v1-21-0-rc-5-tree-toggle-icon-size: 1.0625rem;--_ui5-v1-21-0-rc-5_timeline_tli_indicator_before_bottom: -1.625rem;--_ui5-v1-21-0-rc-5_timeline_tli_indicator_before_right: -1.625rem;--_ui5-v1-21-0-rc-5_timeline_tli_indicator_before_without_icon_bottom: -1.875rem;--_ui5-v1-21-0-rc-5_timeline_tli_indicator_before_without_icon_right: -1.9375rem;--_ui5-v1-21-0-rc-5-toolbar-separator-height: 2rem;--_ui5-v1-21-0-rc-5-toolbar-height: 2.75rem;--_ui5-v1-21-0-rc-5_toolbar_overflow_padding: .25rem .5rem;--_ui5-v1-21-0-rc-5_split_button_middle_separator_top: .625rem;--_ui5-v1-21-0-rc-5_split_button_middle_separator_height: 1rem;--_ui5-v1-21-0-rc-5_color-palette-item-height: 1.75rem;--_ui5-v1-21-0-rc-5_color-palette-item-hover-height: 2.25rem;--_ui5-v1-21-0-rc-5_color-palette-item-margin: calc(((var(--_ui5-v1-21-0-rc-5_color-palette-item-hover-height) - var(--_ui5-v1-21-0-rc-5_color-palette-item-height)) / 2) + .0625rem);--_ui5-v1-21-0-rc-5_color-palette-row-width: 12rem;--_ui5-v1-21-0-rc-5_textarea_padding_top: .5rem;--_ui5-v1-21-0-rc-5_textarea_padding_bottom: .4375rem}[data-ui5-compact-size],.ui5-content-density-compact,.sapUiSizeCompact{--_ui5-v1-21-0-rc-5_input_min_width: 2rem;--_ui5-v1-21-0-rc-5_input_icon_width: 2rem;--_ui5-v1-21-0-rc-5_input_information_icon_padding: .3125rem .5rem .1875rem .5rem;--_ui5-v1-21-0-rc-5_input_information_focused_icon_padding: .3125rem .5rem .25rem .5rem;--_ui5-v1-21-0-rc-5_input_error_warning_icon_padding: .3125rem .5rem .1875rem .5rem;--_ui5-v1-21-0-rc-5_input_error_warning_focused_icon_padding: .3125rem .5rem .25rem .5rem;--_ui5-v1-21-0-rc-5_input_custom_icon_padding: .3125rem .5rem .25rem .5rem;--_ui5-v1-21-0-rc-5_input_error_warning_custom_icon_padding: .3125rem .5rem .1875rem .5rem;--_ui5-v1-21-0-rc-5_input_error_warning_custom_focused_icon_padding: .3125rem .5rem .25rem .5rem;--_ui5-v1-21-0-rc-5_input_information_custom_icon_padding: .3125rem .5rem .1875rem .5rem;--_ui5-v1-21-0-rc-5_input_information_custom_focused_icon_padding: .3125rem .5rem .25rem .5rem;--_ui5-v1-21-0-rc-5_input_icon_padding: .3125rem .5rem .25rem .5rem;--_ui5-v1-21-0-rc-5_panel_header_button_wrapper_padding: .1875rem .25rem;--_ui5-v1-21-0-rc-5_rating_indicator_item_height: .67em;--_ui5-v1-21-0-rc-5_rating_indicator_item_width: .67em;--_ui5-v1-21-0-rc-5_rating_indicator_component_spacing: .8125rem 0px;--_ui5-v1-21-0-rc-5_rating_indicator_readonly_item_height: .5em;--_ui5-v1-21-0-rc-5_rating_indicator_readonly_item_width: .5em;--_ui5-v1-21-0-rc-5_rating_indicator_readonly_item_spacing: .125rem .125rem;--_ui5-v1-21-0-rc-5_radio_button_min_width: 2rem;--_ui5-v1-21-0-rc-5_radio_button_outer_ring_padding_with_label: 0 .5rem;--_ui5-v1-21-0-rc-5_radio_button_outer_ring_padding: 0 .5rem;--_ui5-v1-21-0-rc-5_radio_button_focus_dist: .1875rem;--_ui5-v1-21-0-rc-5_switch_height: 2rem;--_ui5-v1-21-0-rc-5_switch_width: 3rem;--_ui5-v1-21-0-rc-5_switch_min_width: none;--_ui5-v1-21-0-rc-5_switch_with_label_width: 3.75rem;--_ui5-v1-21-0-rc-5_switch_root_outline_top: .25rem;--_ui5-v1-21-0-rc-5_switch_root_outline_bottom: .25rem;--_ui5-v1-21-0-rc-5_switch_transform: translateX(100%) translateX(-1.375rem);--_ui5-v1-21-0-rc-5_switch_transform_with_label: translateX(100%) translateX(-1.875rem);--_ui5-v1-21-0-rc-5_switch_rtl_transform: translateX(1.375rem) translateX(-100%);--_ui5-v1-21-0-rc-5_switch_rtl_transform_with_label: translateX(1.875rem) translateX(-100%);--_ui5-v1-21-0-rc-5_switch_track_width: 2rem;--_ui5-v1-21-0-rc-5_switch_track_height: 1.25rem;--_ui5-v1-21-0-rc-5_switch_track_with_label_width: 2.75rem;--_ui5-v1-21-0-rc-5_switch_track_with_label_height: 1.25rem;--_ui5-v1-21-0-rc-5_switch_handle_width: 1.25rem;--_ui5-v1-21-0-rc-5_switch_handle_height: 1rem;--_ui5-v1-21-0-rc-5_switch_handle_with_label_width: 1.75rem;--_ui5-v1-21-0-rc-5_switch_handle_with_label_height: 1rem;--_ui5-v1-21-0-rc-5_switch_text_font_size: var(--sapFontSize);--_ui5-v1-21-0-rc-5_switch_text_width: 1rem;--_ui5-v1-21-0-rc-5_switch_text_active_left: .1875rem;--_ui5-v1-21-0-rc-5_textarea_padding_right_and_left_readonly: .4375rem;--_ui5-v1-21-0-rc-5_textarea_padding_top_readonly: .125rem;--_ui5-v1-21-0-rc-5_textarea_exceeded_text_height: .375rem;--_ui5-v1-21-0-rc-5_textarea_min_height: 1.625rem;--_ui5-v1-21-0-rc-5_textarea_padding_bottom_readonly: .0625rem;--_ui5-v1-21-0-rc-5_textarea_padding_top_error_warning: .1875rem;--_ui5-v1-21-0-rc-5_textarea_padding_bottom_error_warning: .125rem;--_ui5-v1-21-0-rc-5_textarea_padding_top_information: .1875rem;--_ui5-v1-21-0-rc-5_textarea_padding_bottom_information: .125rem;--_ui5-v1-21-0-rc-5_textarea_padding_right_and_left: .5rem;--_ui5-v1-21-0-rc-5_textarea_padding_right_and_left_error_warning: .5rem;--_ui5-v1-21-0-rc-5_textarea_padding_right_and_left_information: .5rem;--_ui5-v1-21-0-rc-5_token_selected_focused_offset_bottom: -.25rem;--_ui5-v1-21-0-rc-5_tokenizer-popover_offset: .1875rem;--_ui5-v1-21-0-rc-5_slider_handle_icon_size: .875rem;--_ui5-v1-21-0-rc-5_slider_padding: 1rem 1.0625rem;--_ui5-v1-21-0-rc-5_range_slider_progress_focus_width: calc(100% + var(--_ui5-v1-21-0-rc-5_slider_handle_width) + 10px);--_ui5-v1-21-0-rc-5_range_slider_progress_focus_height: calc(var(--_ui5-v1-21-0-rc-5_slider_handle_height) + 10px);--_ui5-v1-21-0-rc-5_range_slider_progress_focus_top: -.8125rem;--_ui5-v1-21-0-rc-5_slider_tooltip_bottom: 1.75rem;--_ui5-v1-21-0-rc-5_slider_handle_focused_tooltip_distance: calc(var(--_ui5-v1-21-0-rc-5_slider_tooltip_bottom) - var(--_ui5-v1-21-0-rc-5_slider_handle_focus_width));--_ui5-v1-21-0-rc-5_range_slider_progress_focus_left: calc(-1 * (var(--_ui5-v1-21-0-rc-5_slider_handle_width) / 2) - 5px);--_ui5-v1-21-0-rc-5_button_base_height: var(--sapElement_Compact_Height);--_ui5-v1-21-0-rc-5_button_base_padding: .4375rem;--_ui5-v1-21-0-rc-5_button_base_min_width: 2rem;--_ui5-v1-21-0-rc-5_button_icon_font_size: 1rem;--_ui5-v1-21-0-rc-5_calendar_height: 18rem;--_ui5-v1-21-0-rc-5_calendar_width: 17.75rem;--_ui5-v1-21-0-rc-5_calendar_left_right_padding: .25rem;--_ui5-v1-21-0-rc-5_calendar_top_bottom_padding: .5rem;--_ui5-v1-21-0-rc-5_calendar_header_height: 2rem;--_ui5-v1-21-0-rc-5_calendar_header_arrow_button_width: 2rem;--_ui5-v1-21-0-rc-5_calendar_header_padding: 0;--_ui5-v1-21-0-rc-5_checkbox_root_side_padding: var(--_ui5-v1-21-0-rc-5_checkbox_wrapped_focus_padding);--_ui5-v1-21-0-rc-5_checkbox_wrapped_content_margin_top: var(--_ui5-v1-21-0-rc-5_checkbox_compact_wrapped_label_margin_top);--_ui5-v1-21-0-rc-5_checkbox_wrapped_focus_left_top_bottom_position: var(--_ui5-v1-21-0-rc-5_checkbox_compact_focus_position);--_ui5-v1-21-0-rc-5_checkbox_width_height: var(--_ui5-v1-21-0-rc-5_checkbox_compact_width_height);--_ui5-v1-21-0-rc-5_checkbox_wrapper_padding: var(--_ui5-v1-21-0-rc-5_checkbox_compact_wrapper_padding);--_ui5-v1-21-0-rc-5_checkbox_inner_width_height: var(--_ui5-v1-21-0-rc-5_checkbox_compact_inner_size);--_ui5-v1-21-0-rc-5_checkbox_icon_size: .75rem;--_ui5-v1-21-0-rc-5_checkbox_partially_icon_size: .5rem;--_ui5-v1-21-0-rc-5_custom_list_item_rb_min_width: 2rem;--_ui5-v1-21-0-rc-5_daypicker_weeknumbers_container_padding_top: 2rem;--_ui5-v1-21-0-rc-5_day_picker_item_width: 2rem;--_ui5-v1-21-0-rc-5_day_picker_item_height: 2rem;--_ui5-v1-21-0-rc-5_day_picker_empty_height: 2.125rem;--_ui5-v1-21-0-rc-5_day_picker_item_justify_content: flex-end;--_ui5-v1-21-0-rc-5_dp_two_calendar_item_now_text_padding_top: 0rem;--_ui5-v1-21-0-rc-5_dp_two_calendar_item_primary_text_height: 1rem;--_ui5-v1-21-0-rc-5_dp_two_calendar_item_secondary_text_height: .75rem;--_ui5-v1-21-0-rc-5_dp_two_calendar_item_text_padding_top: 0;--_ui5-v1-21-0-rc-5_datetime_picker_height: 17rem;--_ui5-v1-21-0-rc-5_datetime_picker_width: 34.0625rem;--_ui5-v1-21-0-rc-5_datetime_timeview_width: 17rem;--_ui5-v1-21-0-rc-5_datetime_timeview_phonemode_width: 18.5rem;--_ui5-v1-21-0-rc-5_datetime_timeview_padding: .5rem;--_ui5-v1-21-0-rc-5_dialog_content_min_height: 2.5rem;--_ui5-v1-21-0-rc-5_dialog_footer_height: 2.5rem;--_ui5-v1-21-0-rc-5_input_height: var(--sapElement_Compact_Height);--_ui5-v1-21-0-rc-5_input_inner_padding: 0 .5rem;--_ui5-v1-21-0-rc-5_input_inner_padding_with_icon: 0 .2rem 0 .5rem;--_ui5-v1-21-0-rc-5_input_inner_space_to_tokenizer: .125rem;--_ui5-v1-21-0-rc-5_input_inner_space_to_n_more_text: .125rem;--_ui5-v1-21-0-rc-5_input_icon_min_width: var(--_ui5-v1-21-0-rc-5_input_compact_min_width);--_ui5-v1-21-0-rc-5_menu_item_padding: 0 .75rem 0 .5rem;--_ui5-v1-21-0-rc-5_menu_item_submenu_icon_right: .75rem;--_ui5-v1-21-0-rc-5-notification-overflow-popover-padding: .25rem .5rem;--_ui5-v1-21-0-rc-5_popup_default_header_height: 2.5rem;--_ui5-v1-21-0-rc-5_textarea_margin: .1875rem 0;--_ui5-v1-21-0-rc-5_list_no_data_height: 2rem;--_ui5-v1-21-0-rc-5_list_item_cb_margin_right: .5rem;--_ui5-v1-21-0-rc-5_list_item_title_size: var(--sapFontSize);--_ui5-v1-21-0-rc-5_list_item_img_top_margin: .55rem;--_ui5-v1-21-0-rc-5_list_no_data_font_size: var(--sapFontSize);--_ui5-v1-21-0-rc-5_list_item_dropdown_base_height: 2rem;--_ui5-v1-21-0-rc-5_list_item_base_height: 2rem;--_ui5-v1-21-0-rc-5_list_item_icon_size: 1rem;--_ui5-v1-21-0-rc-5_list_item_selection_btn_margin_top: calc(-1 * var(--_ui5-v1-21-0-rc-5_checkbox_wrapper_padding));--_ui5-v1-21-0-rc-5_list_item_content_vertical_offset: calc((var(--_ui5-v1-21-0-rc-5_list_item_base_height) - var(--_ui5-v1-21-0-rc-5_list_item_title_size)) / 2);--_ui5-v1-21-0-rc-5_list_busy_row_height: 2rem;--_ui5-v1-21-0-rc-5_list_buttons_left_space: .125rem;--_ui5-v1-21-0-rc-5_month_picker_item_height: 2rem;--_ui5-v1-21-0-rc-5_year_picker_item_height: 2rem;--_ui5-v1-21-0-rc-5_panel_header_height: 2rem;--_ui5-v1-21-0-rc-5_panel_button_root_height: 2rem;--_ui5-v1-21-0-rc-5_panel_button_root_width: 2.5rem;--_ui5-v1-21-0-rc-5_token_height: 1.25rem;--_ui5-v1-21-0-rc-5_token_right_margin: .25rem;--_ui5-v1-21-0-rc-5_token_left_padding: .25rem;--_ui5-v1-21-0-rc-5_token_readonly_padding: .125rem .25rem;--_ui5-v1-21-0-rc-5_token_focus_offset: -.125rem;--_ui5-v1-21-0-rc-5_token_icon_size: .75rem;--_ui5-v1-21-0-rc-5_token_icon_padding: .125rem .25rem;--_ui5-v1-21-0-rc-5_token_wrapper_right_padding: .25rem;--_ui5-v1-21-0-rc-5_token_wrapper_left_padding: 0;--_ui5-v1-21-0-rc-5_token_outline_offset: -.125rem;--_ui5-v1-21-0-rc-5_tl_bubble_padding: .5rem;--_ui5-v1-21-0-rc-5_tl_indicator_before_bottom: -.5rem;--_ui5-v1-21-0-rc-5_tl_padding: .5rem;--_ui5-v1-21-0-rc-5_tl_li_margin_bottom: .5rem;--_ui5-v1-21-0-rc-5_wheelslider_item_width: 64px;--_ui5-v1-21-0-rc-5_wheelslider_item_height: 32px;--_ui5-v1-21-0-rc-5_wheelslider_height: 224px;--_ui5-v1-21-0-rc-5_wheelslider_selection_frame_margin_top: calc(var(--_ui5-v1-21-0-rc-5_wheelslider_item_height) * 2);--_ui5-v1-21-0-rc-5_wheelslider_arrows_visibility: visible;--_ui5-v1-21-0-rc-5_wheelslider_mobile_selection_frame_margin_top: 128px;--_ui5-v1-21-0-rc-5_tc_item_text: 2rem;--_ui5-v1-21-0-rc-5_tc_item_text_line_height: 1.325rem;--_ui5-v1-21-0-rc-5_tc_item_add_text_margin_top: .3125rem;--_ui5-v1-21-0-rc-5_tc_item_height: 4rem;--_ui5-v1-21-0-rc-5_tc_header_height: var(--_ui5-v1-21-0-rc-5_tc_item_height);--_ui5-v1-21-0-rc-5_tc_item_icon_circle_size: 2rem;--_ui5-v1-21-0-rc-5_tc_item_icon_size: 1rem;--_ui5-v1-21-0-rc-5_radio_button_height: 2rem;--_ui5-v1-21-0-rc-5_radio_button_label_side_padding: .5rem;--_ui5-v1-21-0-rc-5_radio_button_inner_size: 2rem;--_ui5-v1-21-0-rc-5_radio_button_svg_size: 1rem;--_ui5-v1-21-0-rc-5-responsive_popover_header_height: 2.5rem;--ui5-v1-21-0-rc-5_side_navigation_item_height: 2rem;--_ui5-v1-21-0-rc-5_slider_handle_height: 1.25rem;--_ui5-v1-21-0-rc-5_slider_handle_width: 1.25rem;--_ui5-v1-21-0-rc-5_slider_tooltip_padding: .25rem;--_ui5-v1-21-0-rc-5_slider_progress_outline_offset: -.625rem;--_ui5-v1-21-0-rc-5_slider_outer_height: 1.3125rem;--_ui5-v1-21-0-rc-5_step_input_min_width: 6rem;--_ui5-v1-21-0-rc-5_step_input_padding: 2rem;--_ui5-v1-21-0-rc-5_load_more_text_height: 2.625rem;--_ui5-v1-21-0-rc-5_load_more_text_font_size: var(--sapFontSize);--_ui5-v1-21-0-rc-5_load_more_desc_padding: 0 2rem .875rem 2rem;--ui5-v1-21-0-rc-5_table_header_row_height: 2rem;--ui5-v1-21-0-rc-5_table_row_height: 2rem;--_ui5-v1-21-0-rc-5-tree-indent-step: .5rem;--_ui5-v1-21-0-rc-5-tree-toggle-box-width: 2rem;--_ui5-v1-21-0-rc-5-tree-toggle-box-height: 1.5rem;--_ui5-v1-21-0-rc-5-tree-toggle-icon-size: .8125rem;--_ui5-v1-21-0-rc-5_timeline_tli_indicator_before_bottom: -.5rem;--_ui5-v1-21-0-rc-5_timeline_tli_indicator_before_right: -.5rem;--_ui5-v1-21-0-rc-5_timeline_tli_indicator_before_without_icon_bottom: -.75rem;--_ui5-v1-21-0-rc-5_timeline_tli_indicator_before_without_icon_right: -.8125rem;--_ui5-v1-21-0-rc-5_vsd_header_container: 2.5rem;--_ui5-v1-21-0-rc-5_vsd_sub_header_container_height: 2rem;--_ui5-v1-21-0-rc-5_vsd_header_height: 4rem;--_ui5-v1-21-0-rc-5_vsd_expand_content_height: 25.4375rem;--_ui5-v1-21-0-rc-5-toolbar-separator-height: 1.5rem;--_ui5-v1-21-0-rc-5-toolbar-height: 2rem;--_ui5-v1-21-0-rc-5_toolbar_overflow_padding: .1875rem .375rem;--_ui5-v1-21-0-rc-5_textarea_padding_top: .1875rem;--_ui5-v1-21-0-rc-5_textarea_padding_bottom: .125rem;--_ui5-v1-21-0-rc-5_checkbox_focus_position: .25rem;--_ui5-v1-21-0-rc-5_split_button_middle_separator_top: .3125rem;--_ui5-v1-21-0-rc-5_split_button_middle_separator_height: 1rem;--_ui5-v1-21-0-rc-5_slider_handle_top: -.5rem;--_ui5-v1-21-0-rc-5_slider_tooltip_height: 1.375rem;--_ui5-v1-21-0-rc-5_color-palette-item-height: 1.25rem;--_ui5-v1-21-0-rc-5_color-palette-item-focus-height: 1rem;--_ui5-v1-21-0-rc-5_color-palette-item-container-sides-padding: .1875rem;--_ui5-v1-21-0-rc-5_color-palette-item-container-rows-padding: .8125rem;--_ui5-v1-21-0-rc-5_color-palette-item-hover-height: 1.625rem;--_ui5-v1-21-0-rc-5_color-palette-item-margin: calc(((var(--_ui5-v1-21-0-rc-5_color-palette-item-hover-height) - var(--_ui5-v1-21-0-rc-5_color-palette-item-height)) / 2) + .0625rem);--_ui5-v1-21-0-rc-5_color-palette-row-width: 8.75rem;--_ui5-v1-21-0-rc-5_color-palette-swatch-container-padding: .1875rem .5rem;--_ui5-v1-21-0-rc-5_color-palette-item-hover-margin: .0625rem;--_ui5-v1-21-0-rc-5_color-palette-row-height: 7.5rem;--_ui5-v1-21-0-rc-5_color-palette-button-height: 2rem;--_ui5-v1-21-0-rc-5_color-palette-item-before-focus-offset: -.25rem;--_ui5-v1-21-0-rc-5_color-palette-item-after-focus-offset: -.125rem;--_ui5-v1-21-0-rc-5_color_picker_slider_container_margin_top: -9px}[dir=rtl]{--_ui5-v1-21-0-rc-5_progress_indicator_bar_border_radius: .5rem;--_ui5-v1-21-0-rc-5_icon_transform_scale: scale(-1, 1);--_ui5-v1-21-0-rc-5_panel_toggle_btn_rotation: var(--_ui5-v1-21-0-rc-5_rotation_minus_90deg);--_ui5-v1-21-0-rc-5_li_notification_group_toggle_btn_rotation: var(--_ui5-v1-21-0-rc-5_rotation_minus_90deg);--_ui5-v1-21-0-rc-5_timeline_scroll_container_offset: -.5rem;--_ui5-v1-21-0-rc-5_popover_upward_arrow_margin: .1875rem .125rem 0 0;--_ui5-v1-21-0-rc-5_popover_right_arrow_margin: .1875rem .25rem 0 0;--_ui5-v1-21-0-rc-5_popover_downward_arrow_margin: -.4375rem .125rem 0 0;--_ui5-v1-21-0-rc-5_popover_left_arrow_margin: .1875rem -.375rem 0 0;--_ui5-v1-21-0-rc-5_dialog_resize_cursor:sw-resize;--_ui5-v1-21-0-rc-5_progress_indicator_bar_border_radius: 0 .5rem .5rem 0;--_ui5-v1-21-0-rc-5_progress_indicator_remaining_bar_border_radius: .5rem 0 0 .5rem;--_ui5-v1-21-0-rc-5_menu_submenu_margin_offset: 0 -.25rem;--_ui5-v1-21-0-rc-5_menu_submenu_placement_type_left_margin_offset: 0 .25rem;--_ui5-v1-21-0-rc-5-menu_item_icon_float: left;--_ui5-v1-21-0-rc-5-shellbar-notification-btn-count-offset: auto;--_ui5-v1-21-0-rc-5_split_text_button_hover_border_left: none;--_ui5-v1-21-0-rc-5_split_text_button_emphasized_hover_border_left: none;--_ui5-v1-21-0-rc-5_split_text_button_positive_hover_border_left: none;--_ui5-v1-21-0-rc-5_split_text_button_negative_hover_border_left: none;--_ui5-v1-21-0-rc-5_split_text_button_attention_hover_border_left: none;--_ui5-v1-21-0-rc-5_split_text_button_transparent_hover_border_left: none;--_ui5-v1-21-0-rc-5_split_text_button_hover_border_right: var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-21-0-rc-5_split_text_button_emphasized_hover_border_right: var(--sapButton_BorderWidth) solid var(--sapButton_Emphasized_BorderColor);--_ui5-v1-21-0-rc-5_split_text_button_positive_hover_border_right: var(--sapButton_BorderWidth) solid var(--sapButton_Accept_BorderColor);--_ui5-v1-21-0-rc-5_split_text_button_negative_hover_border_right: var(--sapButton_BorderWidth) solid var(--sapButton_Reject_BorderColor);--_ui5-v1-21-0-rc-5_split_text_button_attention_hover_border_right: var(--sapButton_BorderWidth) solid var(--sapButton_Attention_BorderColor);--_ui5-v1-21-0-rc-5_split_text_button_transparent_hover_border_right: var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-21-0-rc-5_segmented_btn_item_border_left: .0625rem;--_ui5-v1-21-0-rc-5_segmented_btn_item_border_right: .0625rem}:root,[dir=ltr]{--_ui5-v1-21-0-rc-5_rotation_90deg: rotate(90deg);--_ui5-v1-21-0-rc-5_rotation_minus_90deg: rotate(-90deg);--_ui5-v1-21-0-rc-5_icon_transform_scale: none;--_ui5-v1-21-0-rc-5_panel_toggle_btn_rotation: var(--_ui5-v1-21-0-rc-5_rotation_90deg);--_ui5-v1-21-0-rc-5_li_notification_group_toggle_btn_rotation: var(--_ui5-v1-21-0-rc-5_rotation_90deg);--_ui5-v1-21-0-rc-5_timeline_scroll_container_offset: .5rem;--_ui5-v1-21-0-rc-5_popover_upward_arrow_margin: .1875rem 0 0 .1875rem;--_ui5-v1-21-0-rc-5_popover_right_arrow_margin: .1875rem 0 0 -.375rem;--_ui5-v1-21-0-rc-5_popover_downward_arrow_margin: -.375rem 0 0 .125rem;--_ui5-v1-21-0-rc-5_popover_left_arrow_margin: .125rem 0 0 .25rem;--_ui5-v1-21-0-rc-5_dialog_resize_cursor: se-resize;--_ui5-v1-21-0-rc-5_progress_indicator_bar_border_radius: .5rem 0 0 .5rem;--_ui5-v1-21-0-rc-5_progress_indicator_remaining_bar_border_radius: 0 .5rem .5rem 0;--_ui5-v1-21-0-rc-5_menu_submenu_margin_offset: -.25rem 0;--_ui5-v1-21-0-rc-5_menu_submenu_placement_type_left_margin_offset: .25rem 0;--_ui5-v1-21-0-rc-5-menu_item_icon_float: right;--_ui5-v1-21-0-rc-5-shellbar-notification-btn-count-offset: -.125rem}
` };

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$w);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$v);
const styleData$u = { packageName: "@ui5/webcomponents", fileName: "themes/Icon.css.ts", content: `:host{-webkit-tap-highlight-color:rgba(0,0,0,0)}:host([hidden]){display:none}:host([invalid]){display:none}:host(:not([hidden]).ui5_hovered){opacity:.7}:host{display:inline-block;width:1rem;height:1rem;color:var(--sapContent_NonInteractiveIconColor);fill:currentColor;outline:none}:host([design="Contrast"]){color:var(--sapContent_ContrastIconColor)}:host([design="Critical"]){color:var(--sapCriticalElementColor)}:host([design="Default"]){color:var(--sapContent_IconColor)}:host([design="Information"]){color:var(--sapInformativeElementColor)}:host([design="Negative"]){color:var(--sapNegativeElementColor)}:host([design="Neutral"]){color:var(--sapNeutralElementColor)}:host([design="NonInteractive"]){color:var(--sapContent_NonInteractiveIconColor)}:host([design="Positive"]){color:var(--sapPositiveElementColor)}:host([interactive][focused]) .ui5-icon-root{outline:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);border-radius:var(--ui5-v1-21-0-rc-5-icon-focus-border-radius)}.ui5-icon-root{display:flex;height:100%;width:100%;outline:none;vertical-align:top}:host([interactive]){cursor:pointer}.ui5-icon-root:not([dir=ltr]){transform:var(--_ui5-v1-21-0-rc-5_icon_transform_scale);transform-origin:center}
` };

var __decorate$m = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const ICON_NOT_FOUND = "ICON_NOT_FOUND";
const PRESENTATION_ROLE = "presentation";
/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-icon</code> component represents an SVG icon.
 * There are two main scenarios how the <code>ui5-icon</code> component is used:
 * as a purely decorative element, <br>
 * or as an interactive element that can be focused and clicked.
 *
 * <h3>Usage</h3>
 *
 * 1. <b>Get familiar with the icons collections.</b>
 * <br>
 * Before displaying an icon, you need to explore the icons collections to find and import the desired icon.
 * <br>
 * Currently there are 3 icons collection, available as 3 npm packages:
 * <br>
 *
 * <ul>
 * <li>
 * <ui5-link target="_blank" href="https://www.npmjs.com/package/@ui5/webcomponents-icons">@ui5/webcomponents-icons</ui5-link> represents the "SAP-icons" collection and includes the following
 * <ui5-link target="_blank" href="https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/SAP-icons">icons</ui5-link>.
 * </li>
 * <li>
 * <ui5-link target="_blank" href="https://www.npmjs.com/package/@ui5/webcomponents-icons-tnt">@ui5/webcomponents-icons-tnt</ui5-link> represents the "tnt" collection and includes the following
 * <ui5-link target="_blank" href="https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/SAP-icons-TNT">icons</ui5-link>.
 * </li>
 * <li>
 * <ui5-link target="_blank" href="https://www.npmjs.com/package/@ui5/webcomponents-icons-business-suite">@ui5/webcomponents-icons-icons-business-suite</ui5-link> represents the "business-suite" collection and includes the following
 * <ui5-link target="_blank" href="https://ui5.sap.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/BusinessSuiteInAppSymbols">icons</ui5-link>.
 * </li>
 * </ul>
 *
 * 2. <b>After exploring the icons collections, add one or more of the packages as dependencies to your project.</b>
 * <br>
 * <code>npm i @ui5/webcomponents-icons</code><br>
 * <code>npm i @ui5/webcomponents-icons-tnt</code><br>
 * <code>npm i @ui5/webcomponents-icons-business-suite</code>
 * <br><br>
 *
 * 3. <b>Then, import the desired icon</b>.
 * <br>
 * <code>import "@ui5/{package_name}/dist/{icon_name}.js";</code>
 * <br><br>
 *
 * <b>For Example</b>:
 * <br>
 *
 * For the standard "SAP-icons" icon collection, import an icon from the <code>@ui5/webcomponents-icons</code> package:
 * <br>
 * <code>import "@ui5/webcomponents-icons/dist/employee.js";</code>
 * <br><br>
 *
 * For the "tnt" (SAP Fiori Tools) icon collection, import an icon from the <code>@ui5/webcomponents-icons-tnt</code> package:
 * <br>
 * <code>import "@ui5/webcomponents-icons-tnt/dist/antenna.js";</code>
 * <br><br>
 *
 * For the "business-suite" (SAP Business Suite) icon collection, import an icon from the <code>@ui5/webcomponents-icons-business-suite</code> package:
 * <br>
 * <code>import "@ui5/webcomponents-icons-business-suite/dist/ab-testing.js";</code>
 * <br><br>
 *
 * 4. <b>Display the icon using the <code>ui5-icon</code> web component.</b><br>
 * Set the icon collection ("SAP-icons", "tnt" or "business-suite" - "SAP-icons" is the default icon collection and can be skipped)<br>
 * and the icon name to the <code>name</code> property.
 * <br><br>
 *
 * <code>&lt;ui5-icon name="employee">&lt;/ui5-icon></code><br>
 * <code>&lt;ui5-icon name="tnt/antenna">&lt;/ui5-icon></code><br>
 * <code>&lt;ui5-icon name="business-suite/ab-testing">&lt;/ui5-icon></code>
 *
 * <br><br>
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-icon</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>root - Used to style the outermost wrapper of the <code>ui5-icon</code></li>
 * </ul>
 *
 * <br><br>
 * <h3>Keyboard Handling</h3>
 *
 * <ul>
 * <li>[SPACE, ENTER, RETURN] - Fires the <code>click</code> event if the <code>interactive</code> property is set to true.</li>
 * <li>[SHIFT] - If [SPACE] or [ENTER],[RETURN] is pressed, pressing [SHIFT] releases the ui5-icon without triggering the click event.</li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Icon.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.Icon
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-icon
 * @implements sap.ui.webc.main.IIcon
 * @public
 */
let Icon = class Icon extends UI5Element {
    _onFocusInHandler() {
        if (this.interactive) {
            this.focused = true;
        }
    }
    _onFocusOutHandler() {
        this.focused = false;
    }
    _onkeydown(e) {
        if (!this.interactive) {
            return;
        }
        if (isEnter(e)) {
            this.fireEvent("click");
        }
        if (isSpace(e)) {
            e.preventDefault(); // prevent scrolling
        }
    }
    _onkeyup(e) {
        if (this.interactive && isSpace(e)) {
            this.fireEvent("click");
        }
    }
    /**
    * Enforce "ltr" direction, based on the icons collection metadata.
    */
    get _dir() {
        return this.ltr ? "ltr" : undefined;
    }
    get effectiveAriaHidden() {
        if (this.ariaHidden === "") {
            if (this.isDecorative) {
                return true;
            }
            return;
        }
        return this.ariaHidden;
    }
    get _tabIndex() {
        return this.interactive ? "0" : undefined;
    }
    get isDecorative() {
        return this.effectiveAccessibleRole === PRESENTATION_ROLE;
    }
    get effectiveAccessibleRole() {
        if (this.accessibleRole) {
            return this.accessibleRole;
        }
        if (this.interactive) {
            return "button";
        }
        return this.effectiveAccessibleName ? "img" : PRESENTATION_ROLE;
    }
    async onBeforeRendering() {
        const name = this.name;
        if (!name) {
            /* eslint-disable-next-line */
            return console.warn("Icon name property is required", this);
        }
        let iconData = getIconDataSync(name);
        if (!iconData) {
            iconData = await getIconData(name);
        }
        if (!iconData) {
            this.invalid = true;
            /* eslint-disable-next-line */
            return console.warn(`Required icon is not registered. Invalid icon name: ${this.name}`);
        }
        if (iconData === ICON_NOT_FOUND) {
            this.invalid = true;
            /* eslint-disable-next-line */
            return console.warn(`Required icon is not registered. You can either import the icon as a module in order to use it e.g. "@ui5/webcomponents-icons/dist/${name.replace("sap-icon://", "")}.js", or setup a JSON build step and import "@ui5/webcomponents-icons/dist/AllIcons.js".`);
        }
        this.viewBox = iconData.viewBox || "0 0 512 512";
        if (iconData.customTemplate) {
            iconData.pathData = [];
            this.customSvg = executeTemplate(iconData.customTemplate, this);
        }
        // in case a new valid name is set, show the icon
        this.invalid = false;
        this.pathData = Array.isArray(iconData.pathData) ? iconData.pathData : [iconData.pathData];
        this.accData = iconData.accData;
        this.ltr = iconData.ltr;
        this.packageName = iconData.packageName;
        this._onfocusout = this.interactive ? this._onFocusOutHandler.bind(this) : undefined;
        this._onfocusin = this.interactive ? this._onFocusInHandler.bind(this) : undefined;
        if (this.accessibleName) {
            this.effectiveAccessibleName = this.accessibleName;
        }
        else if (this.accData) {
            const i18nBundle = await getI18nBundle(this.packageName);
            this.effectiveAccessibleName = i18nBundle.getText(this.accData) || undefined;
        }
        else {
            this.effectiveAccessibleName = undefined;
        }
    }
    get hasIconTooltip() {
        return this.showTooltip && this.effectiveAccessibleName;
    }
};
__decorate$m([
    property({ type: IconDesign$1, defaultValue: IconDesign$1.Default })
], Icon.prototype, "design", void 0);
__decorate$m([
    property({ type: Boolean })
], Icon.prototype, "interactive", void 0);
__decorate$m([
    property()
], Icon.prototype, "name", void 0);
__decorate$m([
    property()
], Icon.prototype, "accessibleName", void 0);
__decorate$m([
    property({ type: Boolean })
], Icon.prototype, "showTooltip", void 0);
__decorate$m([
    property()
], Icon.prototype, "accessibleRole", void 0);
__decorate$m([
    property()
], Icon.prototype, "ariaHidden", void 0);
__decorate$m([
    property({ multiple: true })
], Icon.prototype, "pathData", void 0);
__decorate$m([
    property({ type: Object, defaultValue: undefined, noAttribute: true })
], Icon.prototype, "accData", void 0);
__decorate$m([
    property({ type: Boolean })
], Icon.prototype, "focused", void 0);
__decorate$m([
    property({ type: Boolean })
], Icon.prototype, "invalid", void 0);
__decorate$m([
    property({ noAttribute: true, defaultValue: undefined })
], Icon.prototype, "effectiveAccessibleName", void 0);
Icon = __decorate$m([
    customElement({
        tag: "ui5-icon",
        languageAware: true,
        themeAware: true,
        renderer: litRender,
        template: block0$m,
        styles: styleData$u,
    })
    /**
     * Fired on mouseup, <code>SPACE</code> and <code>ENTER</code>.
     * - on mouse click, the icon fires native <code>click</code> event
     * - on <code>SPACE</code> and <code>ENTER</code>, the icon fires custom <code>click</code> event
     * @private
     * @since 1.0.0-rc.8
     */
    ,
    event("click")
], Icon);
Icon.define();
var Icon$1 = Icon;

const ARIA_LABEL_CARD_CONTENT = { key: "ARIA_LABEL_CARD_CONTENT", defaultText: "Card Content" };
const ARIA_ROLEDESCRIPTION_CARD = { key: "ARIA_ROLEDESCRIPTION_CARD", defaultText: "Card" };
const ARIA_ROLEDESCRIPTION_CARD_HEADER = { key: "ARIA_ROLEDESCRIPTION_CARD_HEADER", defaultText: "Card Header" };
const ARIA_ROLEDESCRIPTION_INTERACTIVE_CARD_HEADER = { key: "ARIA_ROLEDESCRIPTION_INTERACTIVE_CARD_HEADER", defaultText: "Interactive Card Header" };
const AVATAR_TOOLTIP = { key: "AVATAR_TOOLTIP", defaultText: "Avatar" };
const BUSY_INDICATOR_TITLE = { key: "BUSY_INDICATOR_TITLE", defaultText: "Please wait" };
const BUTTON_ARIA_TYPE_ACCEPT = { key: "BUTTON_ARIA_TYPE_ACCEPT", defaultText: "Positive Action" };
const BUTTON_ARIA_TYPE_REJECT = { key: "BUTTON_ARIA_TYPE_REJECT", defaultText: "Negative Action" };
const BUTTON_ARIA_TYPE_EMPHASIZED = { key: "BUTTON_ARIA_TYPE_EMPHASIZED", defaultText: "Emphasized" };
const DELETE = { key: "DELETE", defaultText: "Delete" };
const INPUT_SUGGESTIONS = { key: "INPUT_SUGGESTIONS", defaultText: "Suggestions available" };
const INPUT_SUGGESTIONS_TITLE = { key: "INPUT_SUGGESTIONS_TITLE", defaultText: "Select" };
const INPUT_SUGGESTIONS_ONE_HIT = { key: "INPUT_SUGGESTIONS_ONE_HIT", defaultText: "1 result available" };
const INPUT_SUGGESTIONS_MORE_HITS = { key: "INPUT_SUGGESTIONS_MORE_HITS", defaultText: "{0} results are available" };
const INPUT_SUGGESTIONS_NO_HIT = { key: "INPUT_SUGGESTIONS_NO_HIT", defaultText: "No results" };
const INPUT_CLEAR_ICON_ACC_NAME = { key: "INPUT_CLEAR_ICON_ACC_NAME", defaultText: "Clear" };
const LINK_SUBTLE = { key: "LINK_SUBTLE", defaultText: "Subtle" };
const LINK_EMPHASIZED = { key: "LINK_EMPHASIZED", defaultText: "Emphasized" };
const LIST_ITEM_SELECTED = { key: "LIST_ITEM_SELECTED", defaultText: "Selected" };
const LIST_ITEM_NOT_SELECTED = { key: "LIST_ITEM_NOT_SELECTED", defaultText: "Not Selected" };
const ARIA_LABEL_LIST_ITEM_CHECKBOX = { key: "ARIA_LABEL_LIST_ITEM_CHECKBOX", defaultText: "Multiple Selection mode." };
const ARIA_LABEL_LIST_ITEM_RADIO_BUTTON = { key: "ARIA_LABEL_LIST_ITEM_RADIO_BUTTON", defaultText: "Item Selection." };
const ARIA_LABEL_LIST_SELECTABLE = { key: "ARIA_LABEL_LIST_SELECTABLE", defaultText: "Contains Selectable Items" };
const ARIA_LABEL_LIST_MULTISELECTABLE = { key: "ARIA_LABEL_LIST_MULTISELECTABLE", defaultText: "Contains Multi-Selectable Items" };
const ARIA_LABEL_LIST_DELETABLE = { key: "ARIA_LABEL_LIST_DELETABLE", defaultText: "Contains Deletable Items" };
const MESSAGE_STRIP_CLOSE_BUTTON = { key: "MESSAGE_STRIP_CLOSE_BUTTON", defaultText: "Information Bar Close" };
const MESSAGE_STRIP_CLOSABLE = { key: "MESSAGE_STRIP_CLOSABLE", defaultText: "Closable" };
const MESSAGE_STRIP_ERROR = { key: "MESSAGE_STRIP_ERROR", defaultText: "Error Information Bar" };
const MESSAGE_STRIP_WARNING = { key: "MESSAGE_STRIP_WARNING", defaultText: "Warning Information Bar" };
const MESSAGE_STRIP_SUCCESS = { key: "MESSAGE_STRIP_SUCCESS", defaultText: "Success Information Bar" };
const MESSAGE_STRIP_INFORMATION = { key: "MESSAGE_STRIP_INFORMATION", defaultText: "Information Bar" };
const RADIO_BUTTON_GROUP_REQUIRED = { key: "RADIO_BUTTON_GROUP_REQUIRED", defaultText: "Select one of the available options." };
const LOAD_MORE_TEXT = { key: "LOAD_MORE_TEXT", defaultText: "More" };
const VALUE_STATE_TYPE_ERROR = { key: "VALUE_STATE_TYPE_ERROR", defaultText: "Value State Error" };
const VALUE_STATE_TYPE_WARNING = { key: "VALUE_STATE_TYPE_WARNING", defaultText: "Value State Warning" };
const VALUE_STATE_TYPE_SUCCESS = { key: "VALUE_STATE_TYPE_SUCCESS", defaultText: "Value State Success" };
const VALUE_STATE_TYPE_INFORMATION = { key: "VALUE_STATE_TYPE_INFORMATION", defaultText: "Value State Information" };
const VALUE_STATE_ERROR = { key: "VALUE_STATE_ERROR", defaultText: "Invalid entry" };
const VALUE_STATE_WARNING = { key: "VALUE_STATE_WARNING", defaultText: "Warning issued" };
const VALUE_STATE_INFORMATION = { key: "VALUE_STATE_INFORMATION", defaultText: "Informative entry" };
const VALUE_STATE_SUCCESS = { key: "VALUE_STATE_SUCCESS", defaultText: "Entry successfully validated" };
const DIALOG_HEADER_ARIA_ROLE_DESCRIPTION = { key: "DIALOG_HEADER_ARIA_ROLE_DESCRIPTION", defaultText: "Interactive Header" };
const DIALOG_HEADER_ARIA_DESCRIBEDBY_RESIZABLE = { key: "DIALOG_HEADER_ARIA_DESCRIBEDBY_RESIZABLE", defaultText: "Use Shift+Arrow keys to resize" };
const DIALOG_HEADER_ARIA_DESCRIBEDBY_DRAGGABLE = { key: "DIALOG_HEADER_ARIA_DESCRIBEDBY_DRAGGABLE", defaultText: "Use Arrow keys to move" };
const DIALOG_HEADER_ARIA_DESCRIBEDBY_DRAGGABLE_RESIZABLE = { key: "DIALOG_HEADER_ARIA_DESCRIBEDBY_DRAGGABLE_RESIZABLE", defaultText: "Use Arrow keys to move, Shift+Arrow keys to resize" };
const LABEL_COLON = { key: "LABEL_COLON", defaultText: ":" };

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$w);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$v);
const styleData$t = { packageName: "@ui5/webcomponents", fileName: "themes/Button.css.ts", content: `:host{vertical-align:middle}.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host(:not([hidden])){display:inline-block}:host{min-width:var(--_ui5-v1-21-0-rc-5_button_base_min_width);height:var(--_ui5-v1-21-0-rc-5_button_base_height);line-height:normal;font-family:var(--_ui5-v1-21-0-rc-5_button_fontFamily);font-size:var(--sapFontSize);text-shadow:var(--_ui5-v1-21-0-rc-5_button_text_shadow);border-radius:var(--_ui5-v1-21-0-rc-5_button_border_radius);cursor:pointer;background-color:var(--sapButton_Background);border:var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);color:var(--sapButton_TextColor);box-sizing:border-box;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ui5-button-root{min-width:inherit;cursor:inherit;height:100%;width:100%;box-sizing:border-box;display:flex;justify-content:center;align-items:center;outline:none;padding:0 var(--_ui5-v1-21-0-rc-5_button_base_padding);position:relative;background:transparent;border:none;color:inherit;text-shadow:inherit;font:inherit;white-space:inherit;overflow:inherit;text-overflow:inherit;letter-spacing:inherit;word-spacing:inherit;line-height:inherit;-webkit-user-select:none;-moz-user-select:none;user-select:none}:host(:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):hover),:host(:not([hidden]):not([disabled]).ui5_hovered){background:var(--sapButton_Hover_Background);border:1px solid var(--sapButton_Hover_BorderColor);color:var(--sapButton_Hover_TextColor)}.ui5-button-icon{color:inherit;flex-shrink:0}:host([icon-end]) .ui5-button-root{flex-direction:row-reverse}:host([icon-end]) .ui5-button-icon{margin-inline-start:var(--_ui5-v1-21-0-rc-5_button_base_icon_margin)}:host([icon-only]) .ui5-button-root{min-width:auto;padding:0}:host([icon-only]) .ui5-button-text{display:none}.ui5-button-text{outline:none;position:relative;white-space:inherit;overflow:inherit;text-overflow:inherit}:host([has-icon]:not([icon-end])) .ui5-button-text{margin-inline-start:var(--_ui5-v1-21-0-rc-5_button_base_icon_margin)}:host([has-icon][icon-end]) .ui5-button-text{margin-inline-start:0}:host([disabled]){opacity:var(--sapContent_DisabledOpacity);pointer-events:unset;cursor:default}:host([has-icon]:not([icon-only])) .ui5-button-text{min-width:calc(var(--_ui5-v1-21-0-rc-5_button_base_min_width) - var(--_ui5-v1-21-0-rc-5_button_base_icon_margin) - 1rem)}:host([disabled]:active){pointer-events:none}:host([focused]) .ui5-button-root:after{content:"";position:absolute;box-sizing:border-box;inset:.0625rem;border:var(--_ui5-v1-21-0-rc-5_button_focused_border);border-radius:var(--_ui5-v1-21-0-rc-5_button_focused_border_radius)}:host([design="Emphasized"][focused]) .ui5-button-root:after{border-color:var(--_ui5-v1-21-0-rc-5_button_emphasized_focused_border_color)}:host([design="Emphasized"][focused]) .ui5-button-root:before{content:"";position:absolute;box-sizing:border-box;inset:.0625rem;border:var(--_ui5-v1-21-0-rc-5_button_emphasized_focused_border_before);border-radius:var(--_ui5-v1-21-0-rc-5_button_focused_border_radius)}.ui5-button-root::-moz-focus-inner{border:0}bdi{display:block;white-space:inherit;overflow:inherit;text-overflow:inherit}:host([ui5-button][active]:not([disabled]):not([non-interactive])){background-image:none;background-color:var(--sapButton_Active_Background);border-color:var(--sapButton_Active_BorderColor);color:var(--sapButton_Active_TextColor)}:host([design="Positive"]){background-color:var(--sapButton_Accept_Background);border-color:var(--sapButton_Accept_BorderColor);color:var(--sapButton_Accept_TextColor)}:host([design="Positive"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):hover),:host([design="Positive"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]).ui5_hovered){background-color:var(--sapButton_Accept_Hover_Background);border-color:var(--sapButton_Accept_Hover_BorderColor);color:var(--sapButton_Accept_Hover_TextColor)}:host([ui5-button][design="Positive"][active]:not([non-interactive])){background-color:var(--sapButton_Accept_Active_Background);border-color:var(--sapButton_Accept_Active_BorderColor);color:var(--sapButton_Accept_Active_TextColor)}:host([design="Negative"]){background-color:var(--sapButton_Reject_Background);border-color:var(--sapButton_Reject_BorderColor);color:var(--sapButton_Reject_TextColor)}:host([design="Negative"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):hover),:host([design="Negative"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]).ui5_hovered){background-color:var(--sapButton_Reject_Hover_Background);border-color:var(--sapButton_Reject_Hover_BorderColor);color:var(--sapButton_Reject_Hover_TextColor)}:host([ui5-button][design="Negative"][active]:not([non-interactive])){background-color:var(--sapButton_Reject_Active_Background);border-color:var(--sapButton_Reject_Active_BorderColor);color:var(--sapButton_Reject_Active_TextColor)}:host([design="Attention"]){background-color:var(--sapButton_Attention_Background);border-color:var(--sapButton_Attention_BorderColor);color:var(--sapButton_Attention_TextColor)}:host([design="Attention"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):hover),:host([design="Attention"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]).ui5_hovered){background-color:var(--sapButton_Attention_Hover_Background);border-color:var(--sapButton_Attention_Hover_BorderColor);color:var(--sapButton_Attention_Hover_TextColor)}:host([ui5-button][design="Attention"][active]:not([non-interactive])){background-color:var(--sapButton_Attention_Active_Background);border-color:var(--sapButton_Attention_Active_BorderColor);color:var(--sapButton_Attention_Active_TextColor)}:host([design="Emphasized"]){background-color:var(--sapButton_Emphasized_Background);border-color:var(--sapButton_Emphasized_BorderColor);border-width:var(--_ui5-v1-21-0-rc-5_button_emphasized_border_width);color:var(--sapButton_Emphasized_TextColor);font-weight:var(--sapButton_Emphasized_FontWeight)}:host([design="Emphasized"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):hover),:host([design="Emphasized"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]).ui5_hovered){background-color:var(--sapButton_Emphasized_Hover_Background);border-color:var(--sapButton_Emphasized_Hover_BorderColor);border-width:var(--_ui5-v1-21-0-rc-5_button_emphasized_border_width);color:var(--sapButton_Emphasized_Hover_TextColor)}:host([ui5-button][design="Empasized"][active]:not([non-interactive])){background-color:var(--sapButton_Emphasized_Active_Background);border-color:var(--sapButton_Emphasized_Active_BorderColor);color:var(--sapButton_Emphasized_Active_TextColor)}:host([design="Emphasized"][focused]) .ui5-button-root:after{border-color:var(--_ui5-v1-21-0-rc-5_button_emphasized_focused_border_color);outline:none}:host([design="Emphasized"][focused][active]:not([non-interactive])) .ui5-button-root:after{border-color:var(--_ui5-v1-21-0-rc-5_button_emphasized_focused_active_border_color)}:host([design="Transparent"]){background-color:var(--sapButton_Lite_Background);color:var(--sapButton_Lite_TextColor);border-color:var(--sapButton_Lite_BorderColor)}:host([design="Transparent"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):hover),:host([design="Transparent"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]).ui5_hovered){background-color:var(--sapButton_Lite_Hover_Background);border-color:var(--sapButton_Lite_Hover_BorderColor);color:var(--sapButton_Lite_Hover_TextColor)}:host([ui5-button][design="Transparent"][active]:not([non-interactive])){background-color:var(--sapButton_Lite_Active_Background);border-color:var(--sapButton_Lite_Active_BorderColor);color:var(--sapButton_Active_TextColor)}:host([ui5-segmented-button-item][active][focused]) .ui5-button-root:after,:host([pressed][focused]) .ui5-button-root:after{border-color:var(--_ui5-v1-21-0-rc-5_button_pressed_focused_border_color);outline:none}:host([ui5-segmented-button-item][focused]:not(:last-child)) .ui5-button-root:after{border-top-right-radius:var(--_ui5-v1-21-0-rc-5_button_focused_inner_border_radius);border-bottom-right-radius:var(--_ui5-v1-21-0-rc-5_button_focused_inner_border_radius)}:host([ui5-segmented-button-item][focused]:not(:first-child)) .ui5-button-root:after{border-top-left-radius:var(--_ui5-v1-21-0-rc-5_button_focused_inner_border_radius);border-bottom-left-radius:var(--_ui5-v1-21-0-rc-5_button_focused_inner_border_radius)}
` };

var __decorate$l = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Button_1;
let isGlobalHandlerAttached$2 = false;
let activeButton = null;
/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-button</code> component represents a simple push button.
 * It enables users to trigger actions by clicking or tapping the <code>ui5-button</code>, or by pressing
 * certain keyboard keys, such as Enter.
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-button</code> UI, you can define text, icon, or both. You can also specify
 * whether the text or the icon is displayed first.
 * <br><br>
 * You can choose from a set of predefined types that offer different
 * styling to correspond to the triggered action.
 * <br><br>
 * You can set the <code>ui5-button</code> as enabled or disabled. An enabled
 * <code>ui5-button</code> can be pressed by clicking or tapping it. The button changes
 * its style to provide visual feedback to the user that it is pressed or hovered over with
 * the mouse cursor. A disabled <code>ui5-button</code> appears inactive and cannot be pressed.
 *
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-button</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>button - Used to style the native button element</li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Button";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.Button
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-button
 * @implements sap.ui.webc.main.IButton
 * @public
 */
let Button = Button_1 = class Button extends UI5Element {
    constructor() {
        super();
        this._deactivate = () => {
            if (activeButton) {
                activeButton._setActiveState(false);
            }
        };
        if (!isGlobalHandlerAttached$2) {
            document.addEventListener("mouseup", this._deactivate);
            isGlobalHandlerAttached$2 = true;
        }
        const handleTouchStartEvent = (e) => {
            markEvent(e, "button");
            if (this.nonInteractive) {
                return;
            }
            this._setActiveState(true);
        };
        this._ontouchstart = {
            handleEvent: handleTouchStartEvent,
            passive: true,
        };
    }
    onEnterDOM() {
        this._isTouch = (isPhone() || isTablet()) && !isCombi();
    }
    async onBeforeRendering() {
        const formSupport = getFeature("FormSupport");
        if (this.type !== ButtonType$1.Button && !formSupport) {
            console.warn(`In order for the "type" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
        }
        if (this.submits && !formSupport) {
            console.warn(`In order for the "submits" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
        }
        this.iconOnly = this.isIconOnly;
        this.hasIcon = !!this.icon;
        this.buttonTitle = this.tooltip || await getIconAccessibleName(this.icon);
    }
    _onclick(e) {
        if (this.nonInteractive) {
            return;
        }
        markEvent(e, "button");
        const formSupport = getFeature("FormSupport");
        if (formSupport && this._isSubmit) {
            formSupport.triggerFormSubmit(this);
        }
        if (formSupport && this._isReset) {
            formSupport.triggerFormReset(this);
        }
        if (isSafari()) {
            this.getDomRef()?.focus();
        }
    }
    _onmousedown(e) {
        if (this.nonInteractive || this._isTouch) {
            return;
        }
        markEvent(e, "button");
        this._setActiveState(true);
        activeButton = this; // eslint-disable-line
    }
    _ontouchend(e) {
        if (this.disabled) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (this.active) {
            this._setActiveState(false);
        }
        if (activeButton) {
            activeButton._setActiveState(false);
        }
    }
    _onmouseup(e) {
        markEvent(e, "button");
    }
    _onkeydown(e) {
        markEvent(e, "button");
        if (isSpace(e) || isEnter(e)) {
            this._setActiveState(true);
        }
    }
    _onkeyup(e) {
        if (isSpace(e) || isEnter(e)) {
            if (this.active) {
                this._setActiveState(false);
            }
        }
    }
    _onfocusout() {
        if (this.nonInteractive) {
            return;
        }
        if (this.active) {
            this._setActiveState(false);
        }
        if (isDesktop()) {
            this.focused = false;
        }
    }
    _onfocusin(e) {
        if (this.nonInteractive) {
            return;
        }
        markEvent(e, "button");
        if (isDesktop()) {
            this.focused = true;
        }
    }
    _setActiveState(active) {
        const eventPrevented = !this.fireEvent("_active-state-change", null, true);
        if (eventPrevented) {
            return;
        }
        this.active = active;
    }
    get hasButtonType() {
        return this.design !== ButtonDesign$1.Default && this.design !== ButtonDesign$1.Transparent;
    }
    get iconRole() {
        if (!this.icon) {
            return "";
        }
        return "presentation";
    }
    get isIconOnly() {
        return !willShowContent(this.text);
    }
    static typeTextMappings() {
        return {
            "Positive": BUTTON_ARIA_TYPE_ACCEPT,
            "Negative": BUTTON_ARIA_TYPE_REJECT,
            "Emphasized": BUTTON_ARIA_TYPE_EMPHASIZED,
        };
    }
    get buttonTypeText() {
        return Button_1.i18nBundle.getText(Button_1.typeTextMappings()[this.design]);
    }
    get tabIndexValue() {
        const tabindex = this.getAttribute("tabindex");
        if (tabindex) {
            return tabindex;
        }
        return this.nonInteractive ? "-1" : this._tabIndex;
    }
    get showIconTooltip() {
        return this.iconOnly && !this.tooltip;
    }
    get ariaLabelText() {
        return getEffectiveAriaLabelText(this);
    }
    get _isSubmit() {
        return this.type === ButtonType$1.Submit || this.submits;
    }
    get _isReset() {
        return this.type === ButtonType$1.Reset;
    }
    static async onDefine() {
        Button_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
};
__decorate$l([
    property({ type: ButtonDesign$1, defaultValue: ButtonDesign$1.Default })
], Button.prototype, "design", void 0);
__decorate$l([
    property({ type: Boolean })
], Button.prototype, "disabled", void 0);
__decorate$l([
    property()
], Button.prototype, "icon", void 0);
__decorate$l([
    property({ type: Boolean })
], Button.prototype, "iconEnd", void 0);
__decorate$l([
    property({ type: Boolean })
], Button.prototype, "submits", void 0);
__decorate$l([
    property()
], Button.prototype, "tooltip", void 0);
__decorate$l([
    property({ defaultValue: undefined })
], Button.prototype, "accessibleName", void 0);
__decorate$l([
    property({ defaultValue: "" })
], Button.prototype, "accessibleNameRef", void 0);
__decorate$l([
    property({ type: Object })
], Button.prototype, "accessibilityAttributes", void 0);
__decorate$l([
    property({ type: ButtonType$1, defaultValue: ButtonType$1.Button })
], Button.prototype, "type", void 0);
__decorate$l([
    property({ type: Boolean })
], Button.prototype, "active", void 0);
__decorate$l([
    property({ type: Boolean })
], Button.prototype, "iconOnly", void 0);
__decorate$l([
    property({ type: Boolean })
], Button.prototype, "focused", void 0);
__decorate$l([
    property({ type: Boolean })
], Button.prototype, "hasIcon", void 0);
__decorate$l([
    property({ type: Boolean })
], Button.prototype, "nonInteractive", void 0);
__decorate$l([
    property({ noAttribute: true })
], Button.prototype, "buttonTitle", void 0);
__decorate$l([
    property({ type: Object })
], Button.prototype, "_iconSettings", void 0);
__decorate$l([
    property({ defaultValue: "0", noAttribute: true })
], Button.prototype, "_tabIndex", void 0);
__decorate$l([
    property({ type: Boolean })
], Button.prototype, "_isTouch", void 0);
__decorate$l([
    slot({ type: Node, "default": true })
], Button.prototype, "text", void 0);
Button = Button_1 = __decorate$l([
    customElement({
        tag: "ui5-button",
        languageAware: true,
        renderer: litRender,
        template: block0$n,
        styles: styleData$t,
        dependencies: [Icon$1],
    })
    /**
     * Fired when the component is activated either with a
     * mouse/tap or by using the Enter or Space key.
     * <br><br>
     * <b>Note:</b> The event will not be fired if the <code>disabled</code>
     * property is set to <code>true</code>.
     *
     * @event sap.ui.webc.main.Button#click
     * @public
     * @native
     */
    ,
    event("click")
    /**
     * Fired whenever the active state of the component changes.
     * @private
     */
    ,
    event("_active-state-change")
], Button);
Button.define();
var Button$1 = Button;

let resizeObserver;
const observedElements = new Map();
const getResizeObserver = () => {
    if (!resizeObserver) {
        resizeObserver = new window.ResizeObserver(entries => {
            window.requestAnimationFrame(() => {
                entries.forEach(entry => {
                    const callbacks = observedElements.get(entry.target);
                    // Callbacks could be async and we need to handle returned promises to comply with the eslint "no-misused-promises" rule.
                    // Although Promise.all awaits all, we don't await the additional task after calling the callbacks and should not make any difference.
                    callbacks && Promise.all(callbacks.map((callback) => callback()));
                });
            });
        });
    }
    return resizeObserver;
};
const observe = (element, callback) => {
    const callbacks = observedElements.get(element) || [];
    // if no callbacks have been added for this element - start observing it
    if (!callbacks.length) {
        getResizeObserver().observe(element);
    }
    // save the callbacks in an array
    observedElements.set(element, [...callbacks, callback]);
};
const unobserve = (element, callback) => {
    const callbacks = observedElements.get(element) || [];
    if (callbacks.length === 0) {
        return;
    }
    const filteredCallbacks = callbacks.filter((fn) => fn !== callback);
    if (filteredCallbacks.length === 0) {
        getResizeObserver().unobserve(element);
        observedElements.delete(element);
    }
    else {
        observedElements.set(element, filteredCallbacks);
    }
};
/**
 * Allows to register/deregister resize observers for a DOM element
 *
 * @public
 * @class
  */
class ResizeHandler {
    /**
     * @static
     * @public
     * @param {*} element UI5 Web Component or DOM Element to be observed
     * @param {*} callback Callback to be executed
     */
    static register(element, callback) {
        let effectiveElement = element;
        if (instanceOfUI5Element(effectiveElement)) {
            effectiveElement = effectiveElement.getDomRef();
        }
        if (effectiveElement instanceof HTMLElement) {
            observe(effectiveElement, callback);
        }
        else {
            console.warn("Cannot register ResizeHandler for element", element); // eslint-disable-line
        }
    }
    /**
     * @static
     * @public
     * @param {*} element UI5 Web Component or DOM Element to be unobserved
     * @param {*} callback Callback to be removed
     */
    static deregister(element, callback) {
        let effectiveElement = element;
        if (instanceOfUI5Element(effectiveElement)) {
            effectiveElement = effectiveElement.getDomRef();
        }
        if (effectiveElement instanceof HTMLElement) {
            unobserve(effectiveElement, callback);
        }
        else {
            console.warn("Cannot deregister ResizeHandler for element", element); // eslint-disable-line
        }
    }
}

const getActiveElement = () => {
    let element = document.activeElement;
    while (element && element.shadowRoot && element.shadowRoot.activeElement) {
        element = element.shadowRoot.activeElement;
    }
    return element;
};

/**
 * Different navigation modes for ItemNavigation.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.base.types.NavigationMode
 */
var NavigationMode;
(function (NavigationMode) {
    /**
     * @public
     * @type {Auto}
     */
    NavigationMode["Auto"] = "Auto";
    /**
     * @public
     * @type {Vertical}
     */
    NavigationMode["Vertical"] = "Vertical";
    /**
     * @public
     * @type {Horizontal}
     */
    NavigationMode["Horizontal"] = "Horizontal";
    /**
     * @public
     * @type {Paging}
     */
    NavigationMode["Paging"] = "Paging";
})(NavigationMode || (NavigationMode = {}));
var NavigationMode$1 = NavigationMode;

/**
 * Different behavior for ItemNavigation.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.base.types.ItemNavigationBehavior
 */
var ItemNavigationBehavior;
(function (ItemNavigationBehavior) {
    /**
     * Static behavior: navigations stops at the first or last item.
     * @public
     * @type {Static}
     */
    ItemNavigationBehavior["Static"] = "Static";
    /**
     * Cycling behavior: navigating past the last item continues with the first and vice versa.
     * @public
     * @type {Cyclic}
     */
    ItemNavigationBehavior["Cyclic"] = "Cyclic";
})(ItemNavigationBehavior || (ItemNavigationBehavior = {}));
var ItemNavigationBehavior$1 = ItemNavigationBehavior;

/**
 * The ItemNavigation class manages the calculations to determine the correct "tabindex" for a group of related items inside a root component.
 * Important: ItemNavigation only does the calculations and does not change "tabindex" directly, this is a responsibility of the developer.
 *
 * The keys that trigger ItemNavigation are:
 *  - Up/down
 *  - Left/right
 *  - Home/End
 *
 * Usage:
 * 1) Use the "getItemsCallback" constructor property to pass a callback to ItemNavigation, which, whenever called, will return the list of items to navigate among.
 *
 * Each item passed to ItemNavigation via "getItemsCallback" must be:
 *  - A) either a UI5Element with a "_tabIndex" property
 *  - B) or an Object with "id" and "_tabIndex" properties which represents a part of the root component's shadow DOM.
 *    The "id" must be a valid ID within the shadow root of the component ItemNavigation operates on.
 *    This object must not be a DOM object because, as said, ItemNavigation will not set "tabindex" on it. It must be a representation of a DOM object only
 *    and the developer has the responsibility to update the "tabindex" in the component's DOM.
 *  - C) a combination of the above
 *
 * Whenever the user navigates with the keyboard, ItemNavigation will modify the "_tabIndex" properties of the items.
 * It is the items' responsibilities to re-render themselves and apply the correct value of "tabindex" (i.e. to map the "_tabIndex" ItemNavigation set to them to the "tabindex" property).
 * If the items of the ItemNavigation are UI5Elements themselves, this can happen naturally since they will be invalidated by their "_tabIndex" property.
 * If the items are Objects with "id" and "_tabIndex" however, it is the developer's responsibility to apply these and the easiest way is to have the root component invalidated by ItemNavigation.
 * To do so, set the "affectedPropertiesNames" constructor property to point to one or more of the root component's properties that need refreshing when "_tabIndex" is changed deeply.
 *
 * 2) Call the "setCurrentItem" method of ItemNavigation whenever you want to change the current item.
 * This is most commonly required if the user for example clicks on an item and thus selects it directly.
 * Pass as the only argument to "setCurrentItem" the item that becomes current (must be one of the items, returned by "getItemsCallback").
 *
 * @class
 * @public
 */
class ItemNavigation {
    /**
     *
     * @param rootWebComponent the component to operate on (component that slots or contains within its shadow root the items the user navigates among)
     * @param {ItemNavigationOptions} options Object with configuration options:
     *  - currentIndex: the index of the item that will be initially selected (from which navigation will begin)
     *  - navigationMode (Auto|Horizontal|Vertical): whether the items are displayed horizontally (Horizontal), vertically (Vertical) or as a matrix (Auto) meaning the user can navigate in both directions (up/down and left/right)
     *  - rowSize: tells how many items per row there are when the items are not rendered as a flat list but rather as a matrix. Relevant for navigationMode=Auto
     * 	- skipItemsSize: tells how many items upon PAGE_UP and PAGE_DOWN should be skipped to applying the focus on the next item
     *  - behavior (Static|Cycling): tells what to do when trying to navigate beyond the first and last items
     *    Static means that nothing happens if the user tries to navigate beyond the first/last item.
     *    Cycling means that when the user navigates beyond the last item they go to the first and vice versa.
     *  - getItemsCallback: function that, when called, returns an array with all items the user can navigate among
     *  - affectedPropertiesNames: a list of metadata properties on the root component which, upon user navigation, will be reassigned by address thus causing the root component to invalidate
     */
    constructor(rootWebComponent, options) {
        if (!rootWebComponent.isUI5Element) {
            throw new Error("The root web component must be a UI5 Element instance");
        }
        this.rootWebComponent = rootWebComponent;
        this.rootWebComponent.addEventListener("keydown", this._onkeydown.bind(this));
        this._initBound = this._init.bind(this);
        this.rootWebComponent.attachComponentStateFinalized(this._initBound);
        if (typeof options.getItemsCallback !== "function") {
            throw new Error("getItemsCallback is required");
        }
        this._getItems = options.getItemsCallback;
        this._currentIndex = options.currentIndex || 0;
        this._rowSize = options.rowSize || 1;
        this._behavior = options.behavior || ItemNavigationBehavior$1.Static;
        this._navigationMode = options.navigationMode || NavigationMode$1.Auto;
        this._affectedPropertiesNames = options.affectedPropertiesNames || [];
        this._skipItemsSize = options.skipItemsSize || null;
    }
    /**
     * Call this method to set a new "current" (selected) item in the item navigation
     * Note: the item passed to this function must be one of the items, returned by the getItemsCallback function
     *
     * @public
     * @param current the new selected item
     */
    setCurrentItem(current) {
        const currentItemIndex = this._getItems().indexOf(current);
        if (currentItemIndex === -1) {
            console.warn(`The provided item is not managed by ItemNavigation`, current); // eslint-disable-line
            return;
        }
        this._currentIndex = currentItemIndex;
        this._applyTabIndex();
    }
    /**
     * Call this method to dynamically change the row size
     *
     * @public
     * @param newRowSize
     */
    setRowSize(newRowSize) {
        this._rowSize = newRowSize;
    }
    _init() {
        this._getItems().forEach((item, idx) => {
            item._tabIndex = (idx === this._currentIndex) ? "0" : "-1";
        });
    }
    _onkeydown(event) {
        if (!this._canNavigate()) {
            return;
        }
        const horizontalNavigationOn = this._navigationMode === NavigationMode$1.Horizontal || this._navigationMode === NavigationMode$1.Auto;
        const verticalNavigationOn = this._navigationMode === NavigationMode$1.Vertical || this._navigationMode === NavigationMode$1.Auto;
        const isRTL = this.rootWebComponent.effectiveDir === "rtl";
        if (isRTL && isLeft(event) && horizontalNavigationOn) {
            this._handleRight();
        }
        else if (isRTL && isRight(event) && horizontalNavigationOn) {
            this._handleLeft();
        }
        else if (isLeft(event) && horizontalNavigationOn) {
            this._handleLeft();
        }
        else if (isRight(event) && horizontalNavigationOn) {
            this._handleRight();
        }
        else if (isUp(event) && verticalNavigationOn) {
            this._handleUp();
        }
        else if (isDown(event) && verticalNavigationOn) {
            this._handleDown();
        }
        else if (isHome(event)) {
            this._handleHome();
        }
        else if (isEnd(event)) {
            this._handleEnd();
        }
        else if (isPageUp(event)) {
            this._handlePageUp();
        }
        else if (isPageDown(event)) {
            this._handlePageDown();
        }
        else {
            return; // if none of the supported keys is pressed, we don't want to prevent the event or update the item navigation
        }
        event.preventDefault();
        this._applyTabIndex();
        this._focusCurrentItem();
    }
    _handleUp() {
        const itemsLength = this._getItems().length;
        if (this._currentIndex - this._rowSize >= 0) { // no border reached, just decrease the index by a row
            this._currentIndex -= this._rowSize;
            return;
        }
        if (this._behavior === ItemNavigationBehavior$1.Cyclic) { // if cyclic, go to the **last** item in the **previous** column
            const firstItemInThisColumnIndex = this._currentIndex % this._rowSize;
            const firstItemInPreviousColumnIndex = firstItemInThisColumnIndex === 0 ? this._rowSize - 1 : firstItemInThisColumnIndex - 1; // find the first item in the previous column (if the current column is the first column -> move to the last column)
            const rows = Math.ceil(itemsLength / this._rowSize); // how many rows there are (even if incomplete, f.e. for 14 items and _rowSize=4 -> 4 rows total, although only 2 items on the last row)
            let lastItemInPreviousColumnIndex = firstItemInPreviousColumnIndex + (rows - 1) * this._rowSize; // multiply rows by columns, and add the column's first item's index
            if (lastItemInPreviousColumnIndex > itemsLength - 1) { // for incomplete rows, use the previous row's last item, as for them the last item is missing
                lastItemInPreviousColumnIndex -= this._rowSize;
            }
            this._currentIndex = lastItemInPreviousColumnIndex;
        }
        else { // not cyclic, so just go to the first item
            this._currentIndex = 0;
        }
    }
    _handleDown() {
        const itemsLength = this._getItems().length;
        if (this._currentIndex + this._rowSize < itemsLength) { // no border reached, just increase the index by a row
            this._currentIndex += this._rowSize;
            return;
        }
        if (this._behavior === ItemNavigationBehavior$1.Cyclic) { // if cyclic, go to the **first** item in the **next** column
            const firstItemInThisColumnIndex = this._currentIndex % this._rowSize; // find the first item in the current column first
            const firstItemInNextColumnIndex = (firstItemInThisColumnIndex + 1) % this._rowSize; // to get the first item in the next column, just increase the index by 1. The modulo by rows is for the case when we are at the last column
            this._currentIndex = firstItemInNextColumnIndex;
        }
        else { // not cyclic, so just go to the last item
            this._currentIndex = itemsLength - 1;
        }
    }
    _handleLeft() {
        const itemsLength = this._getItems().length;
        if (this._currentIndex > 0) {
            this._currentIndex -= 1;
            return;
        }
        if (this._behavior === ItemNavigationBehavior$1.Cyclic) { // go to the first item in the next column
            this._currentIndex = itemsLength - 1;
        }
    }
    _handleRight() {
        const itemsLength = this._getItems().length;
        if (this._currentIndex < itemsLength - 1) {
            this._currentIndex += 1;
            return;
        }
        if (this._behavior === ItemNavigationBehavior$1.Cyclic) { // go to the first item in the next column
            this._currentIndex = 0;
        }
    }
    _handleHome() {
        const homeEndRange = this._rowSize > 1 ? this._rowSize : this._getItems().length;
        this._currentIndex -= this._currentIndex % homeEndRange;
    }
    _handleEnd() {
        const homeEndRange = this._rowSize > 1 ? this._rowSize : this._getItems().length;
        this._currentIndex += (homeEndRange - 1 - this._currentIndex % homeEndRange); // eslint-disable-line
    }
    _handlePageUp() {
        if (this._rowSize > 1) {
            // eslint-disable-next-line
            // TODO: handle page up on matrix (grid) layout - ColorPalette, ProductSwitch.
            return;
        }
        this._handlePageUpFlat();
    }
    _handlePageDown() {
        if (this._rowSize > 1) {
            // eslint-disable-next-line
            // TODO: handle page up on matrix (grid) layout - ColorPalette, ProductSwitch.
            return;
        }
        this._handlePageDownFlat();
    }
    /**
     * Handles PAGE_UP in a flat list-like structure, both vertically and horizontally.
     */
    _handlePageUpFlat() {
        if (this._skipItemsSize === null) {
            // Move the focus to the very top (as Home).
            this._currentIndex -= this._currentIndex;
            return;
        }
        if (this._currentIndex + 1 > this._skipItemsSize) {
            // When there are more than "skipItemsSize" number of items to the top,
            // move the focus up/left with the predefined number.
            this._currentIndex -= this._skipItemsSize;
        }
        else {
            // Otherwise, move the focus to the very top (as Home).
            this._currentIndex -= this._currentIndex;
        }
    }
    /**
     * Handles PAGE_DOWN in a flat list-like structure, both vertically and horizontally.
     */
    _handlePageDownFlat() {
        if (this._skipItemsSize === null) {
            // Move the focus to the very bottom (as End).
            this._currentIndex = this._getItems().length - 1;
            return;
        }
        const currentToEndRange = this._getItems().length - this._currentIndex - 1;
        if (currentToEndRange > this._skipItemsSize) {
            // When there are more than "skipItemsSize" number of items until the bottom,
            // move the focus down/right with the predefined number.
            this._currentIndex += this._skipItemsSize;
        }
        else {
            // Otherwise, move the focus to the very bottom (as End).
            this._currentIndex = this._getItems().length - 1;
        }
    }
    _applyTabIndex() {
        const items = this._getItems();
        for (let i = 0; i < items.length; i++) {
            items[i]._tabIndex = i === this._currentIndex ? "0" : "-1";
        }
        this._affectedPropertiesNames.forEach(propName => {
            const prop = this.rootWebComponent[propName];
            this.rootWebComponent[propName] = Array.isArray(prop) ? [...prop] : { ...prop };
        });
    }
    _focusCurrentItem() {
        const currentItem = this._getCurrentItem();
        if (currentItem) {
            currentItem.focus();
        }
    }
    _canNavigate() {
        const currentItem = this._getCurrentItem();
        const activeElement = getActiveElement();
        return currentItem && currentItem === activeElement;
    }
    _getCurrentItem() {
        const items = this._getItems();
        if (!items.length) {
            return;
        }
        // normalize the index
        while (this._currentIndex >= items.length) {
            this._currentIndex -= this._rowSize;
        }
        if (this._currentIndex < 0) {
            this._currentIndex = 0;
        }
        const currentItem = items[this._currentIndex];
        if (!currentItem) {
            return;
        }
        if (instanceOfUI5Element(currentItem)) {
            return currentItem.getFocusDomRef();
        }
        const currentItemDOMRef = this.rootWebComponent.getDomRef();
        if (!currentItemDOMRef) {
            return;
        }
        if (currentItem.id) {
            return currentItemDOMRef.querySelector(`[id="${currentItem.id}"]`);
        }
    }
}

/**
 * Base class for all data types.
 *
 * @class
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.base.types.DataType
 * @public
 */
class DataType {
    /**
     * Checks if the value is valid for its data type.
     * @public
     * @abstract
     * @returns {Boolean}
     */
    // eslint-disable-next-line
    static isValid(value) {
        return false;
    }
    static attributeToProperty(attributeValue) {
        return attributeValue;
    }
    static propertyToAttribute(propertyValue) {
        return propertyValue === null ? null : String(propertyValue);
    }
    static valuesAreEqual(value1, value2) {
        return value1 === value2;
    }
    static generateTypeAccessors(types) {
        Object.keys(types).forEach(type => {
            Object.defineProperty(this, type, {
                get() {
                    return types[type];
                },
            });
        });
    }
    static get isDataTypeClass() {
        return true;
    }
}

/**
 * @class
 * Integer data type.
 *
 * @constructor
 * @extends sap.ui.webc.base.types.DataType
 * @author SAP SE
 * @alias sap.ui.webc.base.types.Integer
 * @public
 */
class Integer extends DataType {
    static isValid(value) {
        return Number.isInteger(value);
    }
    static attributeToProperty(attributeValue) {
        return parseInt(attributeValue);
    }
}

/**
 * Returns the normalized event target in cases when it has shadow root.
 * @param {Object} target The original event target
 * @returns {Object} The normalized target
 */
const getNormalizedTarget = (target) => {
    let element = target;
    if (target.shadowRoot && target.shadowRoot.activeElement) {
        element = target.shadowRoot.activeElement;
    }
    return element;
};

const NO_SCROLLBAR_STYLE_CLASS = "ui5-content-native-scrollbars";
const getEffectiveScrollbarStyle = () => document.body.classList.contains(NO_SCROLLBAR_STYLE_CLASS);

/**
 * Delays function execution by given threshold.
 * @param fn {Function}
 * @param delay {Integer}
 */
let debounceInterval = null;
const debounce = (fn, delay) => {
    debounceInterval && clearTimeout(debounceInterval);
    debounceInterval = setTimeout(() => {
        debounceInterval = null;
        fn();
    }, delay);
};

/**
 * Determines if the element is within the viewport.
 * @param el {HTMLElement}
 */
const isElementInView = (el) => {
    const rect = el.getBoundingClientRect();
    return (rect.top >= 0 && rect.left >= 0
        && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        && rect.right <= (window.innerWidth || document.documentElement.clientWidth));
};

/**
 * Different list modes.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.ListMode
 */
var ListMode;
(function (ListMode) {
    /**
     * Default mode (no selection).
     * @public
     * @type {None}
     */
    ListMode["None"] = "None";
    /**
     * Right-positioned single selection mode (only one list item can be selected).
     * @public
     * @type {SingleSelect}
     */
    ListMode["SingleSelect"] = "SingleSelect";
    /**
     * Left-positioned single selection mode (only one list item can be selected).
     * @public
     * @type {SingleSelectBegin}
     */
    ListMode["SingleSelectBegin"] = "SingleSelectBegin";
    /**
     * Selected item is highlighted but no selection element is visible
     * (only one list item can be selected).
     * @public
     * @type {SingleSelectEnd}
     */
    ListMode["SingleSelectEnd"] = "SingleSelectEnd";
    /**
     * Selected item is highlighted and selection is changed upon arrow navigation
     * (only one list item can be selected - this is always the focused item).
     * @public
     * @type {SingleSelectAuto}
     */
    ListMode["SingleSelectAuto"] = "SingleSelectAuto";
    /**
     * Multi selection mode (more than one list item can be selected).
     * @public
     * @type {MultiSelect}
     */
    ListMode["MultiSelect"] = "MultiSelect";
    /**
     * Delete mode (only one list item can be deleted via provided delete button)
     * @public
     * @type {Delete}
     */
    ListMode["Delete"] = "Delete";
})(ListMode || (ListMode = {}));
var ListMode$1 = ListMode;

/**
 * Different list growing modes.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.ListGrowingMode
 */
var ListGrowingMode;
(function (ListGrowingMode) {
    /**
     * Component's "load-more" is fired upon pressing a "More" button.
     * at the bottom.
     * @public
     * @type {Button}
     */
    ListGrowingMode["Button"] = "Button";
    /**
     * Component's "load-more" is fired upon scroll.
     * @public
     * @type {Scroll}
     */
    ListGrowingMode["Scroll"] = "Scroll";
    /**
     * Component's growing is not enabled.
     * @public
     * @type {None}
     */
    ListGrowingMode["None"] = "None";
})(ListGrowingMode || (ListGrowingMode = {}));
var ListGrowingMode$1 = ListGrowingMode;

const isElementHidden = (el) => {
    if (el.nodeName === "SLOT") {
        return false;
    }
    return (el.offsetWidth <= 0 && el.offsetHeight <= 0) || (el.style && el.style.visibility === "hidden");
};

/**
 * Returns if the HTMLElement is tabbable.
 *
 * @public
 * @param { HTMLElement } el the component to operate on (component that slots or contains within its shadow root the items the user navigates among)
 * @returns { boolean } true if the element is tabbable or false - if not
 */
const isElementTabbable = (el) => {
    if (!el) {
        return false;
    }
    const nodeName = el.nodeName.toLowerCase();
    if (el.hasAttribute("data-sap-no-tab-ref")) {
        return false;
    }
    if (isElementHidden(el)) {
        return false;
    }
    const tabIndex = el.getAttribute("tabindex");
    if (tabIndex !== null && tabIndex !== undefined) {
        return parseInt(tabIndex) >= 0;
    }
    if (nodeName === "a" || /input|select|textarea|button|object/.test(nodeName)) {
        return !el.disabled;
    }
    return false;
};

/**
 * Returns the tabbable elements within the provided HTMLElement.
 *
 * @public
 * @param { HTMLElement } el the component to operate on (component that slots or contains within its shadow root the items the user navigates among)
 * @returns { Array<HTMLElement> } the tabbable elements
 */
const getTabbableElements = (el) => {
    return getTabbables([...el.children]);
};
const getTabbables = (nodes, tabbables) => {
    const tabbableElements = tabbables || [];
    if (!nodes) {
        return tabbableElements;
    }
    nodes.forEach(currentNode => {
        if (currentNode.nodeType === Node.TEXT_NODE || currentNode.nodeType === Node.COMMENT_NODE) {
            return;
        }
        let currentElement = currentNode;
        if (currentElement.hasAttribute("data-sap-no-tab-ref")) {
            return;
        }
        if (currentElement.shadowRoot) {
            // get the root node of the ShadowDom (1st none style tag)
            const children = currentElement.shadowRoot.children;
            currentElement = Array.from(children).find(node => node.tagName !== "STYLE");
        }
        if (!currentElement) {
            return;
        }
        if (isElementTabbable(currentElement)) {
            tabbableElements.push(currentElement);
        }
        if (currentElement.tagName === "SLOT") {
            getTabbables(currentElement.assignedNodes(), tabbableElements);
        }
        else {
            getTabbables([...currentElement.children], tabbableElements);
        }
    });
    return tabbableElements;
};

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$w);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$v);
const styleData$s = { packageName: "@ui5/webcomponents", fileName: "themes/ListItemBase.css.ts", content: `:host(:not([hidden])){display:block}:host{height:var(--_ui5-v1-21-0-rc-5_list_item_base_height);background:var(--ui5-v1-21-0-rc-5-listitem-background-color);box-sizing:border-box;border-bottom:1px solid transparent}:host([selected]){background:var(--sapList_SelectionBackgroundColor)}:host([has-border]){border-bottom:var(--ui5-v1-21-0-rc-5-listitem-border-bottom)}:host([selected]){border-bottom:var(--ui5-v1-21-0-rc-5-listitem-selected-border-bottom)}:host(:not([focused])[selected][has-border]){border-bottom:var(--ui5-v1-21-0-rc-5-listitem-selected-border-bottom)}:host([focused][selected]){border-bottom:var(--ui5-v1-21-0-rc-5-listitem-focused-selected-border-bottom)}.ui5-li-root{position:relative;display:flex;align-items:center;width:100%;height:100%;padding:0 1rem;box-sizing:border-box}:host([focused]) .ui5-li-root.ui5-li--focusable{outline:none}:host([focused]) .ui5-li-root.ui5-li--focusable:after{content:"";border:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);position:absolute;border-radius:0;inset:.125rem;pointer-events:none}:host([focused]) .ui5-li-content:focus:after{content:"";border:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);position:absolute;inset:0;pointer-events:none}:host([active][focused]) .ui5-li-root.ui5-li--focusable:after{border-color:var(--ui5-v1-21-0-rc-5-listitem-active-border-color)}:host([disabled]){opacity:var(--_ui5-v1-21-0-rc-5-listitembase_disabled_opacity);pointer-events:none}.ui5-li-content{max-width:100%;font-family:"72override",var(--sapFontFamily);color:var(--sapList_TextColor)}
` };

var __decorate$k = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @class
 * A class to serve as a foundation
 * for the <code>ListItem</code> and <code>GroupHeaderListItem</code> classes.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.ListItemBase
 * @extends sap.ui.webc.base.UI5Element
 * @public
 */
let ListItemBase = class ListItemBase extends UI5Element {
    _onfocusin(e) {
        this.fireEvent("_request-tabindex-change", e);
        if (e.target !== this.getFocusDomRef()) {
            return;
        }
        this.focused = true;
        this.fireEvent("_focused", e);
    }
    _onfocusout() {
        this.focused = false;
    }
    _onkeydown(e) {
        if (isTabNext(e)) {
            return this._handleTabNext(e);
        }
        if (isTabPrevious(e)) {
            return this._handleTabPrevious(e);
        }
    }
    _onkeyup(e) { } // eslint-disable-line
    _handleTabNext(e) {
        if (this.shouldForwardTabAfter()) {
            if (!this.fireEvent("_forward-after", {}, true)) {
                e.preventDefault();
            }
        }
    }
    _handleTabPrevious(e) {
        const target = e.target;
        if (this.shouldForwardTabBefore(target)) {
            this.fireEvent("_forward-before");
        }
    }
    /*
    * Determines if th current list item either has no tabbable content or
    * [TAB] is performed onto the last tabbale content item.
    */
    shouldForwardTabAfter() {
        const aContent = getTabbableElements(this.getFocusDomRef());
        return aContent.length === 0 || (aContent[aContent.length - 1] === getActiveElement());
    }
    /*
    * Determines if the current list item is target of [SHIFT+TAB].
    */
    shouldForwardTabBefore(target) {
        return this.getFocusDomRef() === target;
    }
    get classes() {
        return {
            main: {
                "ui5-li-root": true,
                "ui5-li--focusable": !this.disabled,
            },
        };
    }
    get _ariaDisabled() {
        return this.disabled ? true : undefined;
    }
    get hasConfigurableMode() {
        return false;
    }
    get _effectiveTabIndex() {
        if (this.disabled) {
            return -1;
        }
        if (this.selected) {
            return 0;
        }
        return this._tabIndex;
    }
};
__decorate$k([
    property({ type: Boolean })
], ListItemBase.prototype, "selected", void 0);
__decorate$k([
    property({ type: Boolean })
], ListItemBase.prototype, "hasBorder", void 0);
__decorate$k([
    property({ defaultValue: "-1", noAttribute: true })
], ListItemBase.prototype, "_tabIndex", void 0);
__decorate$k([
    property({ type: Boolean })
], ListItemBase.prototype, "disabled", void 0);
__decorate$k([
    property({ type: Boolean })
], ListItemBase.prototype, "focused", void 0);
ListItemBase = __decorate$k([
    customElement({
        renderer: litRender,
        styles: styleData$s,
    }),
    event("_request-tabindex-change"),
    event("_focused"),
    event("_forward-after"),
    event("_forward-before")
], ListItemBase);
var ListItemBase$1 = ListItemBase;

/**
 * Different types of list items separators.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.ListSeparators
 */
var ListSeparators;
(function (ListSeparators) {
    /**
     * Separators between the items including the last and the first one.
     * @public
     * @type {All}
     */
    ListSeparators["All"] = "All";
    /**
     * Separators between the items.
     * Note: This enumeration depends on the theme.
     * @public
     * @type {Inner}
     */
    ListSeparators["Inner"] = "Inner";
    /**
     * No item separators.
     * @public
     * @type {None}
     */
    ListSeparators["None"] = "None";
})(ListSeparators || (ListSeparators = {}));
var ListSeparators$1 = ListSeparators;

/**
 * Different BusyIndicator sizes.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.BusyIndicatorSize
 */
var BusyIndicatorSize;
(function (BusyIndicatorSize) {
    /**
     * small size
     * @public
     * @type {Small}
     */
    BusyIndicatorSize["Small"] = "Small";
    /**
     * medium size
     * @public
     * @type {Medium}
     */
    BusyIndicatorSize["Medium"] = "Medium";
    /**
     * large size
     * @public
     * @type {Large}
     */
    BusyIndicatorSize["Large"] = "Large";
})(BusyIndicatorSize || (BusyIndicatorSize = {}));
var BusyIndicatorSize$1 = BusyIndicatorSize;

/**
 * Different types of wrapping.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.WrappingType
 */
var WrappingType;
(function (WrappingType) {
    /**
     * The text will be truncated with an ellipsis.
     * @public
     * @type {None}
     */
    WrappingType["None"] = "None";
    /**
     * The text will wrap. The words will not be broken based on hyphenation.
     * @public
     * @type {Normal}
     */
    WrappingType["Normal"] = "Normal";
})(WrappingType || (WrappingType = {}));
var WrappingType$1 = WrappingType;

/* eslint no-unused-vars: 0 */
function block0$l(context, tags, suffix) { return effectiveHtml `<label class="ui5-label-root" @click=${this._onclick}><span class="ui5-label-text-wrapper"><bdi id="${l$1(this._id)}-bdi"><slot></slot></bdi></span><span aria-hidden="true" class="ui5-label-required-colon" data-colon="${l$1(this._colonSymbol)}"></span></label>`; }

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$w);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$v);
const styleData$r = { packageName: "@ui5/webcomponents", fileName: "themes/Label.css.ts", content: `:host(:not([hidden])){display:inline-flex}:host{max-width:100%;color:var(--sapContent_LabelColor);font-family:"72override",var(--sapFontFamily);font-size:var(--sapFontSize);font-weight:400;cursor:text}.ui5-label-root{width:100%;cursor:inherit}:host([wrapping-type="Normal"]) .ui5-label-root{white-space:normal}:host(:not([wrapping-type="Normal"])) .ui5-label-root{display:inline-flex;white-space:nowrap}:host(:not([wrapping-type="Normal"])) .ui5-label-text-wrapper{text-overflow:ellipsis;overflow:hidden;display:inline-block;vertical-align:top;flex:0 1 auto;min-width:0}:host([show-colon]) .ui5-label-required-colon:before{content:attr(data-colon)}:host([required]) .ui5-label-required-colon:after{content:"*";color:var(--sapField_RequiredColor);font-size:1.25rem;font-weight:700;position:relative;font-style:normal;vertical-align:middle;line-height:0}:host([required][show-colon]) .ui5-label-required-colon:after{margin-inline-start:.125rem}bdi{padding-right:.075rem}:host([show-colon]) .ui5-label-required-colon{margin-inline-start:-.05rem;white-space:pre}
` };

var __decorate$j = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Label_1;
/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-label</code> is a component used to represent a label for elements like input, textarea, select. <br><br>
 * The <code>for</code> property of the <code>ui5-label</code> must be the same as the id attribute of the related input element.<br><br>
 * Screen readers read out the label, when the user focuses the labelled control.
 * <br><br>
 * The <code>ui5-label</code> appearance can be influenced by properties,
 * such as <code>required</code> and <code>wrappingType</code>.
 * The appearance of the Label can be configured in a limited way by using the design property.
 * For a broader choice of designs, you can use custom styles.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Label";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.Label
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-label
 * @public
 */
let Label = Label_1 = class Label extends UI5Element {
    static async onDefine() {
        Label_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
    /**
     * Defines the text of the component.
     * <br><b>Note:</b> Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
     *
     * @type {Node[]}
     * @slot
     * @public
     * @name sap.ui.webc.main.Label.prototype.default
     */
    _onclick() {
        if (!this.for) {
            return;
        }
        const elementToFocus = this.getRootNode().querySelector(`[id="${this.for}"]`);
        if (elementToFocus) {
            elementToFocus.focus();
        }
    }
    get _colonSymbol() {
        return Label_1.i18nBundle.getText(LABEL_COLON);
    }
};
__decorate$j([
    property()
], Label.prototype, "for", void 0);
__decorate$j([
    property({ type: Boolean })
], Label.prototype, "showColon", void 0);
__decorate$j([
    property({ type: Boolean })
], Label.prototype, "required", void 0);
__decorate$j([
    property({ type: WrappingType$1, defaultValue: WrappingType$1.None })
], Label.prototype, "wrappingType", void 0);
Label = Label_1 = __decorate$j([
    customElement({
        tag: "ui5-label",
        renderer: litRender,
        template: block0$l,
        styles: styleData$r,
        languageAware: true,
    })
], Label);
Label.define();
var Label$1 = Label;

/* eslint no-unused-vars: 0 */
function block0$k(context, tags, suffix) { return effectiveHtml `<div class="${o$2(this.classes.root)}">${this._isBusy ? block1$g.call(this, context, tags, suffix) : undefined}<slot></slot>${this._isBusy ? block3$c.call(this, context, tags, suffix) : undefined}</div>`; }
function block1$g(context, tags, suffix) { return effectiveHtml `<div class="ui5-busy-indicator-busy-area" title="${l$1(this.ariaTitle)}" tabindex="0" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuetext="Busy" aria-labelledby="${l$1(this.labelId)}" data-sap-focus-ref><div class="ui5-busy-indicator-circles-wrapper"><div class="ui5-busy-indicator-circle circle-animation-0"></div><div class="ui5-busy-indicator-circle circle-animation-1"></div><div class="ui5-busy-indicator-circle circle-animation-2"></div></div>${this.text ? block2$e.call(this, context, tags, suffix) : undefined}</div>`; }
function block2$e(context, tags, suffix) { return suffix ? effectiveHtml `<${scopeTag("ui5-label", tags, suffix)} id="${l$1(this._id)}-label" class="ui5-busy-indicator-text" wrapping-type="Normal">${l$1(this.text)}</${scopeTag("ui5-label", tags, suffix)}>` : effectiveHtml `<ui5-label id="${l$1(this._id)}-label" class="ui5-busy-indicator-text" wrapping-type="Normal">${l$1(this.text)}</ui5-label>`; }
function block3$c(context, tags, suffix) { return effectiveHtml `<span data-ui5-focus-redirect tabindex="0" @focusin="${this._redirectFocus}"></span>`; }

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$w);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$v);
const styleData$q = { packageName: "@ui5/webcomponents", fileName: "themes/BusyIndicator.css.ts", content: `:host(:not([hidden])){display:inline-block}:host([_is-busy]){color:var(--_ui5-v1-21-0-rc-5_busy_indicator_color)}:host([size="Small"]) .ui5-busy-indicator-root{min-width:1.625rem;min-height:.5rem}:host([size="Small"][text]:not([text=""])) .ui5-busy-indicator-root{min-height:1.75rem}:host([size="Small"]) .ui5-busy-indicator-circle{width:.5rem;height:.5rem}:host([size="Small"]) .ui5-busy-indicator-circle:first-child,:host([size="Small"]) .ui5-busy-indicator-circle:nth-child(2){margin-inline-end:.0625rem}:host(:not([size])) .ui5-busy-indicator-root,:host([size="Medium"]) .ui5-busy-indicator-root{min-width:3.375rem;min-height:1rem}:host([size="Medium"]) .ui5-busy-indicator-circle:first-child,:host([size="Medium"]) .ui5-busy-indicator-circle:nth-child(2){margin-inline-end:.1875rem}:host(:not([size])[text]:not([text=""])) .ui5-busy-indicator-root,:host([size="Medium"][text]:not([text=""])) .ui5-busy-indicator-root{min-height:2.25rem}:host(:not([size])) .ui5-busy-indicator-circle,:host([size="Medium"]) .ui5-busy-indicator-circle{width:1rem;height:1rem}:host([size="Large"]) .ui5-busy-indicator-root{min-width:6.5rem;min-height:2rem}:host([size="Large"]) .ui5-busy-indicator-circle:first-child,:host([size="Large"]) .ui5-busy-indicator-circle:nth-child(2){margin-inline-end:.25rem}:host([size="Large"][text]:not([text=""])) .ui5-busy-indicator-root{min-height:3.25rem}:host([size="Large"]) .ui5-busy-indicator-circle{width:2rem;height:2rem}.ui5-busy-indicator-root{display:flex;justify-content:center;align-items:center;position:relative;background-color:inherit;height:inherit}.ui5-busy-indicator-busy-area{position:absolute;z-index:99;inset:0;display:flex;justify-content:center;align-items:center;background-color:inherit;flex-direction:column}.ui5-busy-indicator-busy-area:focus{outline:var(--_ui5-v1-21-0-rc-5_busy_indicator_focus_outline);outline-offset:-2px;border-radius:var(--_ui5-v1-21-0-rc-5_busy_indicator_focus_border_radius)}.ui5-busy-indicator-circles-wrapper{line-height:0}.ui5-busy-indicator-circle{display:inline-block;background-color:currentColor;border-radius:50%}.ui5-busy-indicator-circle:before{content:"";width:100%;height:100%;border-radius:100%}.circle-animation-0{animation:grow 1.6s infinite cubic-bezier(.32,.06,.85,1.11)}.circle-animation-1{animation:grow 1.6s infinite cubic-bezier(.32,.06,.85,1.11);animation-delay:.2s}.circle-animation-2{animation:grow 1.6s infinite cubic-bezier(.32,.06,.85,1.11);animation-delay:.4s}.ui5-busy-indicator-text{width:100%;margin-top:.25rem;text-align:center}@keyframes grow{0%,50%,to{-webkit-transform:scale(.5);-moz-transform:scale(.5);transform:scale(.5)}25%{-webkit-transform:scale(1);-moz-transform:scale(1);transform:scale(1)}}
` };

var __decorate$i = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var BusyIndicator_1;
/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-busy-indicator</code> signals that some operation is going on and that the
 * user must wait. It does not block the current UI screen so other operations could be triggered in parallel.
 * It displays 3 dots and each dot expands and shrinks at a different rate, resulting in a cascading flow of animation.
 *
 * <h3>Usage</h3>
 * For the <code>ui5-busy-indicator</code> you can define the size, the text and whether it is shown or hidden.
 * In order to hide it, use the "active" property.
 * <br><br>
 * In order to show busy state over an HTML element, simply nest the HTML element in a <code>ui5-busy-indicator</code> instance.
 * <br>
 * <b>Note:</b> Since <code>ui5-busy-indicator</code> has <code>display: inline-block;</code> by default and no width of its own,
 * whenever you need to wrap a block-level element, you should set <code>display: block</code> to the busy indicator as well.
 *
 * <h4>When to use:</h4>
 * <ul>
 * <li>The user needs to be able to cancel the operation.</li>
 * <li>Only part of the application or a particular component is affected.</li>
 * </ul>
 *
 * <h4>When not to use:</h4>
 * <ul>
 * <li>The operation takes less than one second.</li>
 * <li>You need to block the screen and prevent the user from starting another activity.</li>
 * <li>Do not show multiple busy indicators at once.</li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/BusyIndicator";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.BusyIndicator
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-busy-indicator
 * @public
 * @since 0.12.0
 */
let BusyIndicator = BusyIndicator_1 = class BusyIndicator extends UI5Element {
    constructor() {
        super();
        this._keydownHandler = this._handleKeydown.bind(this);
        this._preventEventHandler = this._preventEvent.bind(this);
    }
    onEnterDOM() {
        this.addEventListener("keydown", this._keydownHandler, {
            capture: true,
        });
        this.addEventListener("keyup", this._preventEventHandler, {
            capture: true,
        });
    }
    onExitDOM() {
        if (this._busyTimeoutId) {
            clearTimeout(this._busyTimeoutId);
            delete this._busyTimeoutId;
        }
        this.removeEventListener("keydown", this._keydownHandler, true);
        this.removeEventListener("keyup", this._preventEventHandler, true);
    }
    static async onDefine() {
        BusyIndicator_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
    get ariaTitle() {
        return BusyIndicator_1.i18nBundle.getText(BUSY_INDICATOR_TITLE);
    }
    get labelId() {
        return this.text ? `${this._id}-label` : undefined;
    }
    get classes() {
        return {
            root: {
                "ui5-busy-indicator-root": true,
            },
        };
    }
    onBeforeRendering() {
        if (this.active) {
            if (!this._isBusy && !this._busyTimeoutId) {
                this._busyTimeoutId = setTimeout(() => {
                    delete this._busyTimeoutId;
                    this._isBusy = true;
                }, Math.max(0, this.delay));
            }
        }
        else {
            if (this._busyTimeoutId) {
                clearTimeout(this._busyTimeoutId);
                delete this._busyTimeoutId;
            }
            this._isBusy = false;
        }
    }
    _handleKeydown(e) {
        if (!this._isBusy) {
            return;
        }
        e.stopImmediatePropagation();
        // move the focus to the last element in this DOM and let TAB continue to the next focusable element
        if (isTabNext(e)) {
            this.focusForward = true;
            this.shadowRoot.querySelector("[data-ui5-focus-redirect]").focus();
            this.focusForward = false;
        }
    }
    _preventEvent(e) {
        if (this._isBusy) {
            e.stopImmediatePropagation();
        }
    }
    /**
     * Moves the focus to busy area when coming with SHIFT + TAB
     */
    _redirectFocus(e) {
        if (this.focusForward) {
            return;
        }
        e.preventDefault();
        this.shadowRoot.querySelector(".ui5-busy-indicator-busy-area").focus();
    }
};
__decorate$i([
    property()
], BusyIndicator.prototype, "text", void 0);
__decorate$i([
    property({ type: BusyIndicatorSize$1, defaultValue: BusyIndicatorSize$1.Medium })
], BusyIndicator.prototype, "size", void 0);
__decorate$i([
    property({ type: Boolean })
], BusyIndicator.prototype, "active", void 0);
__decorate$i([
    property({ validator: Integer, defaultValue: 1000 })
], BusyIndicator.prototype, "delay", void 0);
__decorate$i([
    property({ type: Boolean })
], BusyIndicator.prototype, "_isBusy", void 0);
BusyIndicator = BusyIndicator_1 = __decorate$i([
    customElement({
        tag: "ui5-busy-indicator",
        languageAware: true,
        styles: styleData$q,
        renderer: litRender,
        template: block0$k,
        dependencies: [Label$1],
    })
], BusyIndicator);
BusyIndicator.define();
var BusyIndicator$1 = BusyIndicator;

/* eslint no-unused-vars: 0 */
function block0$j(context, tags, suffix) { return effectiveHtml `<div class="${o$2(this.classes.root)}" @focusin="${this._onfocusin}" @keydown="${this._onkeydown}" @ui5-_press=${l$1(this.onItemPress)} @ui5-close=${l$1(this.onItemClose)} @ui5-toggle=${l$1(this.onItemToggle)} @ui5-_request-tabindex-change=${l$1(this.onItemTabIndexChange)} @ui5-_focused=${l$1(this.onItemFocused)} @ui5-_forward-after=${l$1(this.onForwardAfter)} @ui5-_forward-before=${l$1(this.onForwardBefore)} @ui5-_selection-requested=${l$1(this.onSelectionRequested)} @ui5-_focus-requested=${l$1(this.onFocusRequested)}><div class="ui5-list-scroll-container">${this.header.length ? block1$f.call(this, context, tags, suffix) : undefined}${this.shouldRenderH1 ? block2$d.call(this, context, tags, suffix) : undefined}${this.hasData ? block3$b.call(this, context, tags, suffix) : undefined}<span id="${l$1(this._id)}-modeLabel" class="ui5-hidden-text">${l$1(this.ariaLabelModeText)}</span><ul id="${l$1(this._id)}-listUl" class="ui5-list-ul" role="${l$1(this.accessibleRole)}" aria-label="${l$1(this.ariaLabelTxt)}" aria-labelledby="${l$1(this.ariaLabelledBy)}" aria-roledescription="${l$1(this.accessibleRoleDescription)}"><slot></slot>${this.showNoDataText ? block4$a.call(this, context, tags, suffix) : undefined}</ul>${this.growsWithButton ? block5$8.call(this, context, tags, suffix) : undefined}${this.footerText ? block6$5.call(this, context, tags, suffix) : undefined}${this.hasData ? block7$4.call(this, context, tags, suffix) : undefined}<span tabindex="-1" aria-hidden="true" class="ui5-list-end-marker"></span></div>${this.busy ? block8$4.call(this, context, tags, suffix) : undefined}</div> `; }
function block1$f(context, tags, suffix) { return effectiveHtml `<slot name="header" />`; }
function block2$d(context, tags, suffix) { return effectiveHtml `<header id="${l$1(this.headerID)}" class="ui5-list-header">${l$1(this.headerText)}</header>`; }
function block3$b(context, tags, suffix) { return effectiveHtml `<div id="${l$1(this._id)}-before" tabindex="0" role="none" class="ui5-list-focusarea"></div>`; }
function block4$a(context, tags, suffix) { return effectiveHtml `<li id="${l$1(this._id)}-nodata" class="ui5-list-nodata"><div id="${l$1(this._id)}-nodata-text" class="ui5-list-nodata-text">${l$1(this.noDataText)}</div></li>`; }
function block5$8(context, tags, suffix) { return effectiveHtml `<div growing-button><div tabindex="0" role="button" id="${l$1(this._id)}-growing-btn" aria-labelledby="${l$1(this._id)}-growingButton-text" ?active="${this._loadMoreActive}" @click="${this._onLoadMoreClick}" @keydown="${this._onLoadMoreKeydown}" @keyup="${this._onLoadMoreKeyup}" @mousedown="${this._onLoadMoreMousedown}" @mouseup="${this._onLoadMoreMouseup}" growing-button-inner><span id="${l$1(this._id)}-growingButton-text" growing-button-text>${l$1(this._growingButtonText)}</span></div></div>`; }
function block6$5(context, tags, suffix) { return effectiveHtml `<footer id="${l$1(this._id)}-footer" class="ui5-list-footer">${l$1(this.footerText)}</footer>`; }
function block7$4(context, tags, suffix) { return effectiveHtml `<div id="${l$1(this._id)}-after" tabindex="0" role="none" class="ui5-list-focusarea"></div>`; }
function block8$4(context, tags, suffix) { return suffix ? effectiveHtml `<div class="ui5-list-busy-row"><${scopeTag("ui5-busy-indicator", tags, suffix)} delay="${l$1(this.busyDelay)}" active size="Medium" class="ui5-list-busy-ind" style="${styleMap(this.styles.busyInd)}" data-sap-focus-ref></${scopeTag("ui5-busy-indicator", tags, suffix)}></div>` : effectiveHtml `<div class="ui5-list-busy-row"><ui5-busy-indicator delay="${l$1(this.busyDelay)}" active size="Medium" class="ui5-list-busy-ind" style="${styleMap(this.styles.busyInd)}" data-sap-focus-ref></ui5-busy-indicator></div>`; }

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$w);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$v);
const styleData$p = { packageName: "@ui5/webcomponents", fileName: "themes/List.css.ts", content: `.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}[growing-button]{display:flex;align-items:center;padding:var(--_ui5-v1-21-0-rc-5_load_more_padding);border-top:1px solid var(--sapList_BorderColor);border-bottom:var(--_ui5-v1-21-0-rc-5_load_more_border-bottom);box-sizing:border-box;cursor:pointer;outline:none}[growing-button-inner]{display:flex;align-items:center;justify-content:center;flex-direction:column;min-height:var(--_ui5-v1-21-0-rc-5_load_more_text_height);width:100%;color:var(--sapButton_TextColor);background-color:var(--sapList_Background);border:var(--_ui5-v1-21-0-rc-5_load_more_border);border-radius:var(--_ui5-v1-21-0-rc-5_load_more_border_radius);box-sizing:border-box}[growing-button-inner]:focus{outline:var(--_ui5-v1-21-0-rc-5_load_more_outline_width) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);outline-offset:-.125rem;border-color:transparent}[growing-button-inner]:hover{background-color:var(--sapList_Hover_Background)}[growing-button-inner]:active,[growing-button-inner][active]{background-color:var(--sapList_Active_Background);border-color:var(--sapList_Active_Background)}[growing-button-inner]:active>*,[growing-button-inner][active]>*{color:var(--sapList_Active_TextColor)}[growing-button-text],[growing-button-subtext]{width:100%;text-align:center;font-family:"72override",var(--sapFontFamily);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;box-sizing:border-box}[growing-button-text]{height:var(--_ui5-v1-21-0-rc-5_load_more_text_height);padding:.875rem 1rem 0;font-size:var(--_ui5-v1-21-0-rc-5_load_more_text_font_size);font-weight:700}[growing-button-subtext]{font-size:var(--sapFontSize);padding:var(--_ui5-v1-21-0-rc-5_load_more_desc_padding)}:host(:not([hidden])){display:block;max-width:100%;width:100%;-webkit-tap-highlight-color:transparent}:host([indent]) .ui5-list-root{padding:2rem}:host([separators="None"]) .ui5-list-nodata{border-bottom:0}:host([busy]){opacity:.72}:host([busy]) .ui5-list-busy-row{position:absolute;inset:0;outline:none}:host([busy]) .ui5-list-busy-ind{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:1}.ui5-list-root{width:100%;height:100%;position:relative;box-sizing:border-box}.ui5-list-scroll-container{overflow:auto;height:100%}.ui5-list-ul{list-style-type:none;padding:0;margin:0}.ui5-list-ul:focus{outline:none}.ui5-list-focusarea{position:fixed}.ui5-list-header{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;box-sizing:border-box;font-size:var(--sapFontHeader4Size);font-family:"72override",var(--sapFontFamily);color:var(--sapGroup_TitleTextColor);height:3rem;line-height:3rem;padding:0 1rem;background-color:var(--sapGroup_TitleBackground);border-bottom:1px solid var(--sapGroup_TitleBorderColor)}.ui5-list-footer{height:2rem;box-sizing:border-box;-webkit-text-size-adjust:none;font-size:var(--sapFontSize);font-family:"72override",var(--sapFontFamily);line-height:2rem;background-color:var(--sapList_FooterBackground);color:var(--ui5-v1-21-0-rc-5_list_footer_text_color);padding:0 1rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ui5-list-nodata{list-style-type:none;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;color:var(--sapTextColor);background-color:var(--sapList_Background);border-bottom:1px solid var(--sapList_BorderColor);padding:0 1rem!important;height:var(--_ui5-v1-21-0-rc-5_list_no_data_height);font-size:var(--_ui5-v1-21-0-rc-5_list_no_data_font_size);font-family:"72override",var(--sapFontFamily)}.ui5-list-nodata-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
` };

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$w);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$v);
const styleData$o = { packageName: "@ui5/webcomponents", fileName: "themes/BrowserScrollbar.css.ts", content: `:not(.ui5-content-native-scrollbars) ::-webkit-scrollbar:horizontal{height:var(--sapScrollBar_Dimension)}:not(.ui5-content-native-scrollbars) ::-webkit-scrollbar:vertical{width:var(--sapScrollBar_Dimension)}:not(.ui5-content-native-scrollbars) ::-webkit-scrollbar{background-color:var(--sapScrollBar_TrackColor);border-left:var(--browser_scrollbar_border)}:not(.ui5-content-native-scrollbars) ::-webkit-scrollbar-thumb{border-radius:var(--browser_scrollbar_border_radius);background-color:var(--sapScrollBar_FaceColor)}:not(.ui5-content-native-scrollbars) ::-webkit-scrollbar-thumb:hover{background-color:var(--sapScrollBar_Hover_FaceColor)}:not(.ui5-content-native-scrollbars) ::-webkit-scrollbar-corner{background-color:var(--sapScrollBar_TrackColor)}
` };

/**
 * Different types of ValueStates.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.base.types.ValueState
 */
var ValueState;
(function (ValueState) {
    /**
     *
     * @public
     * @type {None}
     */
    ValueState["None"] = "None";
    /**
     *
     * @public
     * @type {Success}
     */
    ValueState["Success"] = "Success";
    /**
     *
     * @public
     * @type {Warning}
     */
    ValueState["Warning"] = "Warning";
    /**
     *
     * @public
     * @type {Error}
     */
    ValueState["Error"] = "Error";
    /**
     *
     * @public
     * @type {Information}
     */
    ValueState["Information"] = "Information";
})(ValueState || (ValueState = {}));
var ValueState$1 = ValueState;

const name$F = "accept";
const pathData$F = "M455.8 94q9 9 3 19l-222 326q-4 8-12 9t-14-5l-151-167q-5-5-4.5-11t5.5-11l25-25q12-12 23 0l96 96q5 5 13 4.5t12-8.5l175-249q4-7 11.5-8t13.5 4z";
const ltr$F = true;
const collection$F = "SAP-icons-v4";
const packageName$F = "@ui5/webcomponents-icons";

registerIcon(name$F, { pathData: pathData$F, ltr: ltr$F, collection: collection$F, packageName: packageName$F });

const name$E = "accept";
const pathData$E = "M187 416q-12 0-20-9L71 299q-7-7-7-17 0-11 7.5-18.5T90 256q12 0 19 9l77 87 217-247q8-9 19-9t18.5 7.5T448 122q0 10-6 16L206 407q-7 9-19 9z";
const ltr$E = true;
const collection$E = "SAP-icons-v5";
const packageName$E = "@ui5/webcomponents-icons";

registerIcon(name$E, { pathData: pathData$E, ltr: ltr$E, collection: collection$E, packageName: packageName$E });

isLegacyThemeFamily() ? pathData$F : pathData$E;

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$w);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$v);
const styleData$n = { packageName: "@ui5/webcomponents", fileName: "themes/CheckBox.css.ts", content: `.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host{-webkit-tap-highlight-color:rgba(0,0,0,0)}:host(:not([hidden])){display:inline-block}:host{overflow:hidden;max-width:100%;outline:none;border-radius:var(--_ui5-v1-21-0-rc-5_checkbox_border_radius);transition:var(--_ui5-v1-21-0-rc-5_checkbox_transition);cursor:pointer;user-select:none;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none}:host([disabled]){cursor:default}:host([disabled]) .ui5-checkbox-root{opacity:var(--_ui5-v1-21-0-rc-5_checkbox_disabled_opacity)}:host([disabled]) .ui5-checkbox-inner{border-color:var(--_ui5-v1-21-0-rc-5_checkbox_inner_disabled_border_color)}:host([disabled]) .ui5-checkbox-label{color:var(--_ui5-v1-21-0-rc-5_checkbox_disabled_label_color)}:host([readonly]:not([value-state="Warning"]):not([value-state="Error"])) .ui5-checkbox-inner{background:var(--sapField_ReadOnly_Background);border:var(--_ui5-v1-21-0-rc-5_checkbox_inner_readonly_border);color:var(--sapField_TextColor)}:host([wrapping-type="Normal"][text]) .ui5-checkbox-root{min-height:auto;box-sizing:border-box;align-items:flex-start;padding-top:var(--_ui5-v1-21-0-rc-5_checkbox_root_side_padding);padding-bottom:var(--_ui5-v1-21-0-rc-5_checkbox_root_side_padding)}:host([wrapping-type="Normal"][text]) .ui5-checkbox-root .ui5-checkbox-inner,:host([wrapping-type="Normal"][text]) .ui5-checkbox-root .ui5-checkbox-label{margin-top:var(--_ui5-v1-21-0-rc-5_checkbox_wrapped_content_margin_top)}:host([wrapping-type="Normal"][text]) .ui5-checkbox-root .ui5-checkbox-label{overflow-wrap:break-word;align-self:center}:host([wrapping-type="Normal"]) .ui5-checkbox-root:focus:before{bottom:var(--_ui5-v1-21-0-rc-5_checkbox_wrapped_focus_left_top_bottom_position)}:host([value-state="Error"]) .ui5-checkbox-inner,:host([value-state="Error"]) .ui5-checkbox--hoverable:hover .ui5-checkbox-inner{background:var(--sapField_InvalidBackground);border:var(--_ui5-v1-21-0-rc-5_checkbox_inner_error_border);color:var(--sapField_InvalidColor)}:host([value-state="Error"]) .ui5-checkbox--hoverable:hover .ui5-checkbox-inner{background:var(--_ui5-v1-21-0-rc-5_checkbox_inner_error_background_hover)}:host([value-state="Warning"]) .ui5-checkbox-inner,:host([value-state="Warning"]) .ui5-checkbox--hoverable:hover .ui5-checkbox-inner{background:var(--sapField_WarningBackground);border:var(--_ui5-v1-21-0-rc-5_checkbox_inner_warning_border);color:var(--_ui5-v1-21-0-rc-5_checkbox_inner_warning_color)}:host([value-state="Warning"]) .ui5-checkbox--hoverable:hover .ui5-checkbox-inner{background:var(--_ui5-v1-21-0-rc-5_checkbox_inner_warning_background_hover)}:host([value-state="Information"]) .ui5-checkbox-inner,:host([value-state="Information"]) .ui5-checkbox--hoverable:hover .ui5-checkbox-inner{background:var(--sapField_InformationBackground);border:var(--_ui5-v1-21-0-rc-5_checkbox_inner_information_border);color:var(--_ui5-v1-21-0-rc-5_checkbox_inner_information_color)}:host([value-state="Information"]) .ui5-checkbox--hoverable:hover .ui5-checkbox-inner{background:var(--_ui5-v1-21-0-rc-5_checkbox_inner_information_background_hover)}:host([value-state="Success"]) .ui5-checkbox-inner,:host([value-state="Success"]) .ui5-checkbox--hoverable:hover .ui5-checkbox-inner{background:var(--sapField_SuccessBackground);border:var(--_ui5-v1-21-0-rc-5_checkbox_inner_success_border);color:var(--sapField_SuccessColor)}:host([value-state="Success"]) .ui5-checkbox--hoverable:hover .ui5-checkbox-inner{background:var(--_ui5-v1-21-0-rc-5_checkbox_inner_success_background_hover)}:host([value-state="Warning"]) .ui5-checkbox-icon,:host([value-state="Warning"][indeterminate]) .ui5-checkbox-inner:after{color:var(--_ui5-v1-21-0-rc-5_checkbox_checkmark_warning_color)}:host([text]) .ui5-checkbox-root{padding-inline-end:var(--_ui5-v1-21-0-rc-5_checkbox_right_focus_distance)}:host([text]) .ui5-checkbox-root:focus:before{inset-inline-end:0}.ui5-checkbox-root{position:relative;display:inline-flex;align-items:center;width:100%;min-height:var(--_ui5-v1-21-0-rc-5_checkbox_width_height);min-width:var(--_ui5-v1-21-0-rc-5_checkbox_width_height);padding:0 var(--_ui5-v1-21-0-rc-5_checkbox_wrapper_padding);outline:none;transition:var(--_ui5-v1-21-0-rc-5_checkbox_transition);border:var(--_ui5-v1-21-0-rc-5_checkbox_default_focus_border);border-radius:var(--_ui5-v1-21-0-rc-5_checkbox_border_radius);box-sizing:border-box}.ui5-checkbox-root:focus:before{display:var(--_ui5-v1-21-0-rc-5_checkbox_focus_outline_display);content:"";position:absolute;inset-inline:var(--_ui5-v1-21-0-rc-5_checkbox_focus_position);inset-block:var(--_ui5-v1-21-0-rc-5_checkbox_focus_position);border:var(--_ui5-v1-21-0-rc-5_checkbox_focus_outline);border-radius:var(--_ui5-v1-21-0-rc-5_checkbox_focus_border_radius)}:host .ui5-checkbox-root:focus{border:var(--_ui5-v1-21-0-rc-5_checkbox_focus_border);border-radius:.5rem}:host(:hover:not([disabled])){background:var(--_ui5-v1-21-0-rc-5_checkbox_outer_hover_background)}.ui5-checkbox--hoverable .ui5-checkbox-label:hover{color:var(--_ui5-v1-21-0-rc-5_checkbox_label_color)}:host(:not([active]):not([checked]):not([value-state])) .ui5-checkbox--hoverable:hover .ui5-checkbox-inner,:host(:not([active]):not([checked])[value-state="None"]) .ui5-checkbox--hoverable:hover .ui5-checkbox-inner{background:var(--_ui5-v1-21-0-rc-5_checkbox_hover_background);border-color:var(--_ui5-v1-21-0-rc-5_checkbox_inner_hover_border_color)}:host(:not([active])[checked]:not([value-state])) .ui5-checkbox--hoverable:hover .ui5-checkbox-inner,:host(:not([active])[checked][value-state="None"]) .ui5-checkbox--hoverable:hover .ui5-checkbox-inner{background:var(--_ui5-v1-21-0-rc-5_checkbox_hover_background);border-color:var(--_ui5-v1-21-0-rc-5_checkbox_inner_hover_checked_border_color)}:host([checked]:not([value-state])) .ui5-checkbox-inner,:host([checked][value-state="None"]) .ui5-checkbox-inner{border-color:var(--_ui5-v1-21-0-rc-5_checkbox_inner_selected_border_color)}:host([active]:not([checked]):not([value-state]):not([disabled])) .ui5-checkbox-inner,:host([active]:not([checked])[value-state="None"]:not([disabled])) .ui5-checkbox-inner{border-color:var(--_ui5-v1-21-0-rc-5_checkbox_inner_active_border_color);background-color:var(--_ui5-v1-21-0-rc-5_checkbox_active_background)}:host([active][checked]:not([value-state]):not([disabled])) .ui5-checkbox-inner,:host([active][checked][value-state="None"]:not([disabled])) .ui5-checkbox-inner{border-color:var(--_ui5-v1-21-0-rc-5_checkbox_inner_selected_border_color);background-color:var(--_ui5-v1-21-0-rc-5_checkbox_active_background)}.ui5-checkbox-inner{min-width:var(--_ui5-v1-21-0-rc-5_checkbox_inner_width_height);max-width:var(--_ui5-v1-21-0-rc-5_checkbox_inner_width_height);height:var(--_ui5-v1-21-0-rc-5_checkbox_inner_width_height);max-height:var(--_ui5-v1-21-0-rc-5_checkbox_inner_width_height);border:var(--_ui5-v1-21-0-rc-5_checkbox_inner_border);border-radius:var(--_ui5-v1-21-0-rc-5_checkbox_inner_border_radius);background:var(--_ui5-v1-21-0-rc-5_checkbox_inner_background);color:var(--_ui5-v1-21-0-rc-5_checkbox_checkmark_color);box-sizing:border-box;position:relative;cursor:inherit}:host([indeterminate][checked]) .ui5-checkbox-inner:after{content:"";background-color:currentColor;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:var(--_ui5-v1-21-0-rc-5_checkbox_partially_icon_size);height:var(--_ui5-v1-21-0-rc-5_checkbox_partially_icon_size)}.ui5-checkbox-inner input{-webkit-appearance:none;visibility:hidden;width:0;left:0;position:absolute;font-size:inherit}.ui5-checkbox-root .ui5-checkbox-label{margin-inline-start:var(--_ui5-v1-21-0-rc-5_checkbox_label_offset);cursor:inherit;text-overflow:ellipsis;overflow:hidden;pointer-events:none;color:var(--_ui5-v1-21-0-rc-5_checkbox_label_color)}.ui5-checkbox-icon{width:var(--_ui5-v1-21-0-rc-5_checkbox_icon_size);height:var(--_ui5-v1-21-0-rc-5_checkbox_icon_size);color:currentColor;cursor:inherit;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}
` };

/* eslint no-unused-vars: 0 */
function block0$i(context, tags, suffix) { return effectiveHtml `<div class="ui5-checkbox-root ${o$2(this.classes.main)}" role="checkbox" part="root" aria-checked="${l$1(this.effectiveAriaChecked)}" aria-readonly="${l$1(this.ariaReadonly)}" aria-disabled="${l$1(this.effectiveAriaDisabled)}" aria-label="${l$1(this.ariaLabelText)}" aria-labelledby="${l$1(this.ariaLabelledBy)}" aria-describedby="${l$1(this.ariaDescribedBy)}" aria-required="${l$1(this.required)}" tabindex="${l$1(this.effectiveTabIndex)}" @mousedown="${this._onmousedown}" @mouseup="${this._onmouseup}" @keydown="${this._onkeydown}" @keyup="${this._onkeyup}" @click="${this._onclick}" @focusout="${this._onfocusout}"><div id="${l$1(this._id)}-CbBg" class="ui5-checkbox-inner">${this.isCompletelyChecked ? block1$e.call(this, context, tags, suffix) : undefined}<input id="${l$1(this._id)}-CB" type='checkbox' ?checked="${this.checked}" ?readonly="${this.readonly}" ?disabled="${this.disabled}" tabindex="-1" aria-hidden="true" data-sap-no-tab-ref /></div>${this.text ? block2$c.call(this, context, tags, suffix) : undefined}${this.hasValueState ? block3$a.call(this, context, tags, suffix) : undefined}<slot name="formSupport"></slot></div>`; }
function block1$e(context, tags, suffix) { return suffix ? effectiveHtml `<${scopeTag("ui5-icon", tags, suffix)} aria-hidden="true" name="accept" class="ui5-checkbox-icon"></${scopeTag("ui5-icon", tags, suffix)}>` : effectiveHtml `<ui5-icon aria-hidden="true" name="accept" class="ui5-checkbox-icon"></ui5-icon>`; }
function block2$c(context, tags, suffix) { return suffix ? effectiveHtml `<${scopeTag("ui5-label", tags, suffix)} part="label" id="${l$1(this._id)}-label" class="ui5-checkbox-label" wrapping-type="${l$1(this.wrappingType)}">${l$1(this.text)}</${scopeTag("ui5-label", tags, suffix)}>` : effectiveHtml `<ui5-label part="label" id="${l$1(this._id)}-label" class="ui5-checkbox-label" wrapping-type="${l$1(this.wrappingType)}">${l$1(this.text)}</ui5-label>`; }
function block3$a(context, tags, suffix) { return effectiveHtml `<span id="${l$1(this._id)}-descr" class="ui5-hidden-text">${l$1(this.valueStateText)}</span>`; }

var __decorate$h = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CheckBox_1;
let isGlobalHandlerAttached$1 = false;
let activeCb;
/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * Allows the user to set a binary value, such as true/false or yes/no for an item.
 * <br><br>
 * The <code>ui5-checkbox</code> component consists of a box and a label that describes its purpose.
 * If it's checked, an indicator is displayed inside the box.
 * To check/uncheck the <code>ui5-checkbox</code>, the user has to click or tap the square
 * box or its label.
 * <br><br>
 * The <code>ui5-checkbox</code> component only has 2 states - checked and unchecked.
 * Clicking or tapping toggles the <code>ui5-checkbox</code> between checked and unchecked state.
 *
 * <h3>Usage</h3>
 *
 * You can define the checkbox text with via the <code>text</code> property. If the text exceeds the available width, it is truncated by default.
 * In case you prefer text to wrap, set the <code>wrappingType</code> property to "Normal".
 * The touchable area for toggling the <code>ui5-checkbox</code> ends where the text ends.
 * <br><br>
 * You can disable the <code>ui5-checkbox</code> by setting the <code>disabled</code> property to
 * <code>true</code>,
 * or use the <code>ui5-checkbox</code> in read-only mode by setting the <code>readonly</code>
 * property to <code>true</code>.
 *
 * <br><br>
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-checkbox</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>root - Used to style the outermost wrapper of the <code>ui5-checkbox</code></li>
 * <li>label - Used to style the label of the <code>ui5-checkbox</code></li>
 * </ul>
 *
 * <br><br>
 * <h3>Keyboard Handling</h3>
 *
 * The user can use the following keyboard shortcuts to toggle the checked state of the <code>ui5-checkbox</code>.
 * <ul>
 * <li>[SPACE, ENTER] - Toggles between different states: checked, not checked.</li>
 * </ul>
 * <br><br>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/CheckBox";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.CheckBox
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-checkbox
 * @public
 */
let CheckBox = CheckBox_1 = class CheckBox extends UI5Element {
    constructor() {
        super();
        this._deactivate = () => {
            if (activeCb) {
                activeCb.active = false;
            }
        };
        if (!isGlobalHandlerAttached$1) {
            document.addEventListener("mouseup", this._deactivate);
            isGlobalHandlerAttached$1 = true;
        }
    }
    onBeforeRendering() {
        this._enableFormSupport();
    }
    _enableFormSupport() {
        const formSupport = getFeature("FormSupport");
        if (formSupport) {
            formSupport.syncNativeHiddenInput(this, (element, nativeInput) => {
                nativeInput.disabled = !!element.disabled;
                nativeInput.checked = !!element.checked;
                nativeInput.value = element.checked ? "on" : "";
            });
        }
        else if (this.name) {
            console.warn(`In order for the "name" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
        }
    }
    _onclick() {
        this.toggle();
    }
    _onmousedown() {
        if (this.readonly || this.disabled) {
            return;
        }
        this.active = true;
        activeCb = this; // eslint-disable-line
    }
    _onmouseup() {
        this.active = false;
    }
    _onfocusout() {
        this.active = false;
    }
    _onkeydown(e) {
        if (isSpace(e)) {
            e.preventDefault();
            this.active = true;
        }
        if (isEnter(e)) {
            this.toggle();
            this.active = true;
        }
    }
    _onkeyup(e) {
        if (isSpace(e)) {
            this.toggle();
        }
        this.active = false;
    }
    toggle() {
        if (this.canToggle()) {
            const lastState = {
                checked: this.checked,
                indeterminate: this.indeterminate,
            };
            if (this.indeterminate) {
                this.indeterminate = false;
                this.checked = true;
            }
            else {
                this.checked = !this.checked;
            }
            const changePrevented = !this.fireEvent("change", null, true);
            // Angular two way data binding
            const valueChagnePrevented = !this.fireEvent("value-changed", null, true);
            if (changePrevented || valueChagnePrevented) {
                this.checked = lastState.checked;
                this.indeterminate = lastState.indeterminate;
            }
        }
        return this;
    }
    canToggle() {
        return !(this.disabled || this.readonly);
    }
    valueStateTextMappings() {
        return {
            "Error": CheckBox_1.i18nBundle.getText(VALUE_STATE_ERROR),
            "Warning": CheckBox_1.i18nBundle.getText(VALUE_STATE_WARNING),
            "Success": CheckBox_1.i18nBundle.getText(VALUE_STATE_SUCCESS),
        };
    }
    get ariaLabelText() {
        return getEffectiveAriaLabelText(this);
    }
    get classes() {
        return {
            main: {
                "ui5-checkbox--hoverable": !this.disabled && !this.readonly && isDesktop(),
            },
        };
    }
    get ariaReadonly() {
        return this.readonly ? "true" : undefined;
    }
    get effectiveAriaDisabled() {
        return this.disabled ? "true" : undefined;
    }
    get effectiveAriaChecked() {
        return this.indeterminate && this.checked ? "mixed" : this.checked;
    }
    get ariaLabelledBy() {
        if (!this.ariaLabelText) {
            return this.text ? `${this._id}-label` : undefined;
        }
        return undefined;
    }
    get ariaDescribedBy() {
        return this.hasValueState ? `${this._id}-descr` : undefined;
    }
    get hasValueState() {
        return this.valueState !== ValueState$1.None;
    }
    get valueStateText() {
        if (this.valueState !== ValueState$1.None && this.valueState !== ValueState$1.Information) {
            return this.valueStateTextMappings()[this.valueState];
        }
    }
    get effectiveTabIndex() {
        const tabindex = this.getAttribute("tabindex");
        return this.disabled ? undefined : tabindex || "0";
    }
    get isCompletelyChecked() {
        return this.checked && !this.indeterminate;
    }
    static async onDefine() {
        CheckBox_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
};
__decorate$h([
    property()
], CheckBox.prototype, "accessibleNameRef", void 0);
__decorate$h([
    property()
], CheckBox.prototype, "accessibleName", void 0);
__decorate$h([
    property({ type: Boolean })
], CheckBox.prototype, "disabled", void 0);
__decorate$h([
    property({ type: Boolean })
], CheckBox.prototype, "readonly", void 0);
__decorate$h([
    property({ type: Boolean })
], CheckBox.prototype, "required", void 0);
__decorate$h([
    property({ type: Boolean })
], CheckBox.prototype, "indeterminate", void 0);
__decorate$h([
    property({ type: Boolean })
], CheckBox.prototype, "checked", void 0);
__decorate$h([
    property()
], CheckBox.prototype, "text", void 0);
__decorate$h([
    property({ type: ValueState$1, defaultValue: ValueState$1.None })
], CheckBox.prototype, "valueState", void 0);
__decorate$h([
    property({ type: WrappingType$1, defaultValue: WrappingType$1.None })
], CheckBox.prototype, "wrappingType", void 0);
__decorate$h([
    property()
], CheckBox.prototype, "name", void 0);
__decorate$h([
    property({ type: Boolean })
], CheckBox.prototype, "active", void 0);
__decorate$h([
    slot()
], CheckBox.prototype, "formSupport", void 0);
CheckBox = CheckBox_1 = __decorate$h([
    customElement({
        tag: "ui5-checkbox",
        languageAware: true,
        renderer: litRender,
        template: block0$i,
        styles: styleData$n,
        dependencies: [
            Label$1,
            Icon$1,
        ],
    })
    /**
     * Fired when the component checked state changes.
     *
     * @public
     * @event sap.ui.webc.main.CheckBox#change
     */
    ,
    event("change")
], CheckBox);
CheckBox.define();
var CheckBox$1 = CheckBox;

class RadioButtonGroup {
    static hasGroup(groupName) {
        return this.groups.has(groupName);
    }
    static getGroup(groupName) {
        return this.groups.get(groupName);
    }
    static getCheckedRadioFromGroup(groupName) {
        return this.checkedRadios.get(groupName);
    }
    static removeGroup(groupName) {
        this.checkedRadios.delete(groupName);
        return this.groups.delete(groupName);
    }
    static addToGroup(radioBtn, groupName) {
        if (this.hasGroup(groupName)) {
            this.enforceSingleSelection(radioBtn, groupName);
            if (this.getGroup(groupName)) {
                this.getGroup(groupName).push(radioBtn);
            }
        }
        else {
            this.createGroup(radioBtn, groupName);
        }
        this.updateTabOrder(groupName);
    }
    static removeFromGroup(radioBtn, groupName) {
        const group = this.getGroup(groupName);
        if (!group) {
            return;
        }
        const checkedRadio = this.getCheckedRadioFromGroup(groupName);
        // Remove the radio button from the given group
        group.forEach((_radioBtn, idx, arr) => {
            if (radioBtn._id === _radioBtn._id) {
                return arr.splice(idx, 1);
            }
        });
        if (checkedRadio === radioBtn) {
            this.checkedRadios.set(groupName, null);
        }
        // Remove the group if it is empty
        if (!group.length) {
            this.removeGroup(groupName);
        }
        this.updateTabOrder(groupName);
    }
    static createGroup(radioBtn, groupName) {
        if (radioBtn.checked) {
            this.checkedRadios.set(groupName, radioBtn);
        }
        this.groups.set(groupName, [radioBtn]);
    }
    static selectNextItem(item, groupName) {
        const group = this.getGroup(groupName);
        if (!group) {
            return;
        }
        const groupLength = group.length, currentItemPosition = group.indexOf(item);
        if (groupLength <= 1) {
            return;
        }
        const nextItemToSelect = this._nextSelectable(currentItemPosition, group);
        if (!nextItemToSelect) {
            return;
        }
        this.updateSelectionInGroup(nextItemToSelect, groupName);
    }
    static updateFormValidity(groupName) {
        const group = this.getGroup(groupName);
        if (!group) {
            return;
        }
        group.forEach(r => r._resetFormValidity());
        const groupRequiresValue = group.some(r => r.required) && group.every(r => !r.checked);
        if (groupRequiresValue) {
            group[0]._invalidateForm();
        }
    }
    static updateTabOrder(groupName) {
        const group = this.getGroup(groupName);
        if (!group) {
            return;
        }
        const hasCheckedRadio = group.some(radioBtn => radioBtn.checked);
        group.filter(radioBtn => !radioBtn.disabled).forEach((radioBtn, idx) => {
            if (hasCheckedRadio) {
                radioBtn._tabIndex = radioBtn.checked ? "0" : "-1";
            }
            else {
                radioBtn._tabIndex = idx === 0 ? "0" : "-1";
            }
        });
    }
    static selectPreviousItem(item, groupName) {
        const group = this.getGroup(groupName);
        if (!group) {
            return;
        }
        const groupLength = group.length, currentItemPosition = group.indexOf(item);
        if (groupLength <= 1) {
            return;
        }
        const previousItemToSelect = this._previousSelectable(currentItemPosition, group);
        if (!previousItemToSelect) {
            return;
        }
        this.updateSelectionInGroup(previousItemToSelect, groupName);
    }
    static selectItem(item, groupName) {
        this.updateSelectionInGroup(item, groupName);
        this.updateTabOrder(groupName);
    }
    static updateSelectionInGroup(radioBtnToSelect, groupName) {
        const checkedRadio = this.getCheckedRadioFromGroup(groupName);
        if (checkedRadio) {
            this._deselectRadio(checkedRadio);
        }
        this._selectRadio(radioBtnToSelect);
        this.checkedRadios.set(groupName, radioBtnToSelect);
    }
    static _deselectRadio(radioBtn) {
        if (radioBtn) {
            radioBtn.checked = false;
        }
    }
    static _selectRadio(radioBtn) {
        if (radioBtn) {
            radioBtn.focus();
            radioBtn.checked = true;
            radioBtn._checked = true;
            radioBtn.fireEvent("change");
        }
    }
    static _nextSelectable(pos, group) {
        if (!group) {
            return null;
        }
        const groupLength = group.length;
        let nextRadioToSelect = null;
        if (pos === groupLength - 1) {
            if (group[0].disabled || group[0].readonly) {
                return this._nextSelectable(1, group);
            }
            nextRadioToSelect = group[0];
        }
        else if (group[pos + 1].disabled || group[pos + 1].readonly) {
            return this._nextSelectable(pos + 1, group);
        }
        else {
            nextRadioToSelect = group[pos + 1];
        }
        return nextRadioToSelect;
    }
    static _previousSelectable(pos, group) {
        const groupLength = group.length;
        let previousRadioToSelect = null;
        if (pos === 0) {
            if (group[groupLength - 1].disabled || group[groupLength - 1].readonly) {
                return this._previousSelectable(groupLength - 1, group);
            }
            previousRadioToSelect = group[groupLength - 1];
        }
        else if (group[pos - 1].disabled || group[pos - 1].readonly) {
            return this._previousSelectable(pos - 1, group);
        }
        else {
            previousRadioToSelect = group[pos - 1];
        }
        return previousRadioToSelect;
    }
    static enforceSingleSelection(radioBtn, groupName) {
        const checkedRadio = this.getCheckedRadioFromGroup(groupName);
        if (radioBtn.checked) {
            if (!checkedRadio) {
                this.checkedRadios.set(groupName, radioBtn);
            }
            else if (radioBtn !== checkedRadio) {
                this._deselectRadio(checkedRadio);
                this.checkedRadios.set(groupName, radioBtn);
            }
        }
        else if (radioBtn === checkedRadio) {
            this.checkedRadios.set(groupName, null);
        }
        this.updateTabOrder(groupName);
        this.updateFormValidity(groupName);
    }
    static get groups() {
        if (!this._groups) {
            this._groups = new Map();
        }
        return this._groups;
    }
    static get checkedRadios() {
        if (!this._checkedRadios) {
            this._checkedRadios = new Map();
        }
        return this._checkedRadios;
    }
}

/* eslint no-unused-vars: 0 */
function block0$h(context, tags, suffix) { return effectiveHtml `<div class="ui5-radio-root" role="radio" aria-checked="${l$1(this.checked)}" aria-disabled="${l$1(this.effectiveAriaDisabled)}" aria-describedby="${l$1(this.effectiveAriaDescribedBy)}" aria-label="${l$1(this.ariaLabelText)}" tabindex="${l$1(this.effectiveTabIndex)}" @click="${this._onclick}" @keydown="${this._onkeydown}" @keyup="${this._onkeyup}" @mousedown="${this._onmousedown}" @mouseup="${this._onmouseup}" @focusout="${this._onfocusout}"><div class='ui5-radio-inner ${o$2(this.classes.inner)}'><svg class="ui5-radio-svg" focusable="false" aria-hidden="true">${blockSVG1$1.call(this, context, tags, suffix)}</svg><input type='radio' ?required="${this.required}" ?checked="${this.checked}" ?readonly="${this.readonly}" ?disabled="${this.effectiveAriaDisabled}" name="${l$1(this.name)}"  data-sap-no-tab-ref/></div>${this.text ? block1$d.call(this, context, tags, suffix) : undefined}${this.hasValueState ? block2$b.call(this, context, tags, suffix) : undefined}<slot name="formSupport"></slot></div>`; }
function block1$d(context, tags, suffix) { return suffix ? effectiveHtml `<${scopeTag("ui5-label", tags, suffix)} id="${l$1(this._id)}-label" class="ui5-radio-label" for="${l$1(this._id)}" wrapping-type="${l$1(this.wrappingType)}">${l$1(this.text)}</${scopeTag("ui5-label", tags, suffix)}>` : effectiveHtml `<ui5-label id="${l$1(this._id)}-label" class="ui5-radio-label" for="${l$1(this._id)}" wrapping-type="${l$1(this.wrappingType)}">${l$1(this.text)}</ui5-label>`; }
function block2$b(context, tags, suffix) { return effectiveHtml `<span id="${l$1(this._id)}-descr" class="ui5-hidden-text">${l$1(this.valueStateText)}</span>`; }
function blockSVG1$1(context, tags, suffix) {
    return effectiveSvg `<circle class="ui5-radio-svg-outer" cx="50%" cy="50%" r="50%" /><circle class="ui5-radio-svg-inner" cx="50%" cy="50%" />`;
}

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$w);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$v);
const styleData$m = { packageName: "@ui5/webcomponents", fileName: "themes/RadioButton.css.ts", content: `.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host(:not([hidden])){display:inline-block}:host{min-width:var(--_ui5-v1-21-0-rc-5_radio_button_min_width);max-width:100%;text-overflow:ellipsis;overflow:hidden;color:var(--_ui5-v1-21-0-rc-5_radio_button_color);border-radius:var(--_ui5-v1-21-0-rc-5_radio_button_border_radius)}:host(:not([disabled])) .ui5-radio-root{cursor:pointer}:host([checked]){color:var(--_ui5-v1-21-0-rc-5_radio_button_checked_fill)}:host([checked]) .ui5-radio-svg-inner{fill:var(--_ui5-v1-21-0-rc-5_radio_button_inner_ring_color)}:host([checked]) .ui5-radio-svg-outer{stroke:var(--_ui5-v1-21-0-rc-5_radio_button_outer_ring_color)}:host([disabled]) .ui5-radio-root{color:var(--_ui5-v1-21-0-rc-5_radio_button_color);opacity:var(--sapContent_DisabledOpacity)}:host([disabled][checked]) .ui5-radio-svg-outer{stroke:var(--_ui5-v1-21-0-rc-5_radio_button_color)}:host(:not([disabled])) .ui5-radio-root:focus:before{content:"";display:var(--_ui5-v1-21-0-rc-5_radio_button_focus_outline);position:absolute;inset:var(--_ui5-v1-21-0-rc-5_radio_button_focus_dist);pointer-events:none;border:var(--_ui5-v1-21-0-rc-5_radio_button_border_width) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);border-radius:var(--_ui5-v1-21-0-rc-5_radio_button_border_radius)}:host(:not([disabled])) .ui5-radio-root:focus{border-radius:var(--_ui5-v1-21-0-rc-5_radio_button_border_radius);border:var(--_ui5-v1-21-0-rc-5_radio_button_focus_border)}:host(:not([value-state="Error"]):not([value-state="Warning"]):not([value-state="Success"]):not([value-state="Information"])) .ui5-radio-root:hover .ui5-radio-inner--hoverable .ui5-radio-svg-outer{stroke:var(--_ui5-v1-21-0-rc-5_radio_button_outer_ring_hover_color)}:host(:not([value-state="Error"]):not([value-state="Warning"]):not([value-state="Success"]):not([value-state="Information"])[checked]) .ui5-radio-root:hover .ui5-radio-inner--hoverable .ui5-radio-svg-outer{stroke:var(--_ui5-v1-21-0-rc-5_radio_button_outer_ring_checked_hover_color)}.ui5-radio-root:hover .ui5-radio-inner--hoverable .ui5-radio-svg-outer,:host([checked]) .ui5-radio-root:hover .ui5-radio-inner--hoverable .ui5-radio-svg-outer{fill:var(--_ui5-v1-21-0-rc-5_radio_button_hover_fill)}:host([active][checked]:not([value-state]):not([disabled]):not([readonly])) .ui5-radio-svg-outer{stroke:var(--_ui5-v1-21-0-rc-5_radio_button_outer_ring_checked_hover_color)}:host([active]:not([checked]):not([value-state]):not([disabled]):not([readonly])) .ui5-radio-svg-outer{stroke:var(--_ui5-v1-21-0-rc-5_radio_button_outer_ring_active_color)}:host([text]) .ui5-radio-root{padding-inline-end:var(--_ui5-v1-21-0-rc-5_radio_button_border_width)}:host([text]) .ui5-radio-root:focus:before{inset-inline-end:0px}:host([text]) .ui5-radio-inner{padding:var(--_ui5-v1-21-0-rc-5_radio_button_outer_ring_padding_with_label)}:host([checked][readonly]) .ui5-radio-svg-inner{fill:var(--_ui5-v1-21-0-rc-5_radio_button_read_only_inner_ring_color)}:host([readonly]) .ui5-radio-root .ui5-radio-svg-outer{fill:var(--sapField_ReadOnly_Background);stroke:var(--sapField_ReadOnly_BorderColor);stroke-dasharray:var(--_ui5-v1-21-0-rc-5_radio_button_read_only_border_type);stroke-width:var(--_ui5-v1-21-0-rc-5_radio_button_read_only_border_width)}:host([value-state="Error"]) .ui5-radio-svg-outer,:host([value-state="Warning"]) .ui5-radio-svg-outer{stroke-width:var(--sapField_InvalidBorderWidth)}:host([value-state="Information"]) .ui5-radio-svg-outer{stroke-width:var(--_ui5-v1-21-0-rc-5_radio_button_information_border_width)}:host([value-state="Error"][checked]) .ui5-radio-svg-inner{fill:var(--_ui5-v1-21-0-rc-5_radio_button_checked_error_fill)}:host([value-state="Error"]) .ui5-radio-svg-outer,:host([value-state="Error"]) .ui5-radio-root:hover .ui5-radio-inner.ui5-radio-inner--hoverable:hover .ui5-radio-svg-outer{stroke:var(--sapField_InvalidColor);fill:var(--sapField_InvalidBackground)}:host([value-state="Error"]) .ui5-radio-root:hover .ui5-radio-inner.ui5-radio-inner--hoverable .ui5-radio-svg-outer{fill:var(--_ui5-v1-21-0-rc-5_radio_button_hover_fill_error)}:host([value-state="Warning"][checked]) .ui5-radio-svg-inner{fill:var(--_ui5-v1-21-0-rc-5_radio_button_checked_warning_fill)}:host([value-state="Warning"]) .ui5-radio-svg-outer,:host([value-state="Warning"]) .ui5-radio-root:hover .ui5-radio-inner.ui5-radio-inner--hoverable:hover .ui5-radio-svg-outer{stroke:var(--sapField_WarningColor);fill:var(--sapField_WarningBackground)}:host([value-state="Warning"]) .ui5-radio-root:hover .ui5-radio-inner.ui5-radio-inner--hoverable .ui5-radio-svg-outer{fill:var(--_ui5-v1-21-0-rc-5_radio_button_hover_fill_warning)}:host([value-state="Success"][checked]) .ui5-radio-svg-inner{fill:var(--_ui5-v1-21-0-rc-5_radio_button_checked_success_fill)}:host([value-state="Success"]) .ui5-radio-svg-outer,:host([value-state="Success"]) .ui5-radio-root:hover .ui5-radio-inner.ui5-radio-inner--hoverable:hover .ui5-radio-svg-outer{stroke:var(--sapField_SuccessColor);fill:var(--sapField_SuccessBackground)}:host([value-state="Success"]) .ui5-radio-root:hover .ui5-radio-inner.ui5-radio-inner--hoverable .ui5-radio-svg-outer{fill:var(--_ui5-v1-21-0-rc-5_radio_button_hover_fill_success)}:host([value-state="Information"][checked]) .ui5-radio-svg-inner{fill:var(--_ui5-v1-21-0-rc-5_radio_button_checked_information_fill)}:host([value-state="Information"]) .ui5-radio-svg-outer,:host([value-state="Information"]) .ui5-radio-root:hover .ui5-radio-inner.ui5-radio-inner--hoverable:hover .ui5-radio-svg-outer{stroke:var(--sapField_InformationColor);fill:var(--sapField_InformationBackground)}:host([value-state="Information"]) .ui5-radio-root:hover .ui5-radio-inner.ui5-radio-inner--hoverable .ui5-radio-svg-outer{fill:var(--_ui5-v1-21-0-rc-5_radio_button_hover_fill_information)}:host([value-state="Error"]) .ui5-radio-root,:host([value-state="Warning"]) .ui5-radio-root,:host([value-state="Information"]) .ui5-radio-root{stroke-dasharray:var(--_ui5-v1-21-0-rc-5_radio_button_warning_error_border_dash)}.ui5-radio-root{height:var(--_ui5-v1-21-0-rc-5_radio_button_height);position:relative;display:inline-flex;flex-wrap:nowrap;outline:none;max-width:100%;box-sizing:border-box;border:var(--_ui5-v1-21-0-rc-5_radio_button_border);border-radius:var(--_ui5-v1-21-0-rc-5_radio_button_border_radius)}.ui5-radio-inner{display:flex;align-items:center;padding:var(--_ui5-v1-21-0-rc-5_radio_button_outer_ring_padding);flex-shrink:0;height:var(--_ui5-v1-21-0-rc-5_radio_button_inner_size);font-size:1rem;pointer-events:none;vertical-align:top}.ui5-radio-inner{outline:none}.ui5-radio-inner input{-webkit-appearance:none;visibility:hidden;width:0;left:0;position:absolute;font-size:inherit;margin:0}[ui5-label].ui5-radio-label{display:flex;align-items:center;padding-inline-end:var(--_ui5-v1-21-0-rc-5_radio_button_label_offset);vertical-align:top;max-width:100%;text-overflow:ellipsis;overflow:hidden;pointer-events:none;color:var(--_ui5-v1-21-0-rc-5_radio_button_label_color)}:host([wrapping-type="Normal"][text]) .ui5-radio-root{height:auto}:host([wrapping-type="Normal"][text]) [ui5-label].ui5-radio-label{padding:var(--_ui5-v1-21-0-rc-5_radio_button_label_side_padding) 0;overflow-wrap:break-word}.ui5-radio-svg{height:var(--_ui5-v1-21-0-rc-5_radio_button_svg_size);width:var(--_ui5-v1-21-0-rc-5_radio_button_svg_size);overflow:visible;pointer-events:none}.ui5-radio-svg-outer{fill:var(--_ui5-v1-21-0-rc-5_radio_button_outer_ring_bg);stroke:currentColor;stroke-width:var(--_ui5-v1-21-0-rc-5_radio_button_outer_ring_width)}.ui5-radio-svg-inner{fill:none;r:var(--_ui5-v1-21-0-rc-5_radio_button_inner_ring_radius)}.ui5-radio-svg-outer,.ui5-radio-svg-inner{flex-shrink:0}:host(.ui5-li-singlesel-radiobtn) .ui5-radio-root .ui5-radio-inner .ui5-radio-svg-outer{fill:var(--sapList_Background)}
` };

var __decorate$g = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RadioButton_1;
let isGlobalHandlerAttached = false;
let activeRadio;
/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-radio-button</code> component enables users to select a single option from a set of options.
 * When a <code>ui5-radio-button</code> is selected by the user, the
 * <code>change</code> event is fired.
 * When a <code>ui5-radio-button</code> that is within a group is selected, the one
 * that was previously selected gets automatically deselected. You can group radio buttons by using the <code>name</code> property.
 * <br>
 * <b>Note:</b> If <code>ui5-radio-button</code> is not part of a group, it can be selected once, but can not be deselected back.
 *
 * <h3>Keyboard Handling</h3>
 *
 * Once the <code>ui5-radio-button</code> is on focus, it might be selected by pressing the Space and Enter keys.
 * <br>
 * The Arrow Down/Arrow Up and Arrow Left/Arrow Right keys can be used to change selection between next/previous radio buttons in one group,
 * while TAB and SHIFT + TAB can be used to enter or leave the radio button group.
 * <br>
 * <b>Note:</b> On entering radio button group, the focus goes to the currently selected radio button.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/RadioButton";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.RadioButton
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-radio-button
 * @public
 */
let RadioButton = RadioButton_1 = class RadioButton extends UI5Element {
    static get formAssociated() {
        return true;
    }
    constructor() {
        super();
        this._internals = this.attachInternals();
        this._deactivate = () => {
            if (activeRadio) {
                activeRadio.active = false;
            }
        };
        if (!isGlobalHandlerAttached) {
            document.addEventListener("mouseup", this._deactivate);
            isGlobalHandlerAttached = true;
        }
    }
    static async onDefine() {
        RadioButton_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
    onBeforeRendering() {
        this.syncGroup();
        this._enableFormSupport();
    }
    onExitDOM() {
        this.syncGroup(true);
    }
    syncGroup(forceRemove) {
        const oldGroup = this._name;
        const currentGroup = this.name;
        const oldChecked = this._checked;
        const currentChecked = this.checked;
        if (forceRemove) {
            RadioButtonGroup.removeFromGroup(this, oldGroup);
        }
        if (currentGroup !== oldGroup) {
            if (oldGroup) {
                // remove the control from the previous group
                RadioButtonGroup.removeFromGroup(this, oldGroup);
            }
            if (currentGroup) {
                // add the control to the existing group
                RadioButtonGroup.addToGroup(this, currentGroup);
            }
        }
        else if (currentGroup) {
            RadioButtonGroup.enforceSingleSelection(this, currentGroup);
        }
        if (this.name && currentChecked !== oldChecked) {
            RadioButtonGroup.updateTabOrder(this.name);
        }
        this._name = this.name;
        this._checked = this.checked;
    }
    _enableFormSupport() {
        const formSupport = getFeature("FormSupport");
        if (formSupport) {
            this._setFormValue();
        }
        else if (this.value) {
            console.warn(`In order for the "value" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
        }
    }
    _setFormValue() {
        this._internals.setFormValue(this.checked ? this.value : null);
    }
    _resetFormValidity() {
        this._internals.setValidity({});
    }
    _invalidateForm() {
        this._internals.setValidity({ valueMissing: true }, this.radioButtonGroupRequiredText, this.shadowRoot.firstElementChild);
    }
    _onclick() {
        return this.toggle();
    }
    _handleDown(e) {
        const currentGroup = this.name;
        if (!currentGroup) {
            return;
        }
        e.preventDefault();
        RadioButtonGroup.selectNextItem(this, currentGroup);
    }
    _handleUp(e) {
        const currentGroup = this.name;
        if (!currentGroup) {
            return;
        }
        e.preventDefault();
        RadioButtonGroup.selectPreviousItem(this, currentGroup);
    }
    _onkeydown(e) {
        if (isSpace(e)) {
            this.active = true;
            return e.preventDefault();
        }
        if (isEnter(e)) {
            this.active = true;
            return this.toggle();
        }
        const isRTL = this.effectiveDir === "rtl";
        if (isDown(e) || (!isRTL && isRight(e)) || (isRTL && isLeft(e))) {
            this._handleDown(e);
        }
        if (isUp(e) || (!isRTL && isLeft(e)) || (isRTL && isRight(e))) {
            this._handleUp(e);
        }
    }
    _onkeyup(e) {
        if (isSpace(e)) {
            this.toggle();
        }
        this.active = false;
    }
    _onmousedown() {
        this.active = true;
        activeRadio = this; // eslint-disable-line
    }
    _onmouseup() {
        this.active = false;
    }
    _onfocusout() {
        this.active = false;
    }
    toggle() {
        if (!this.canToggle()) {
            return this;
        }
        if (!this.name) {
            this.checked = !this.checked;
            this.fireEvent("change");
            return this;
        }
        RadioButtonGroup.selectItem(this, this.name);
        return this;
    }
    canToggle() {
        return !(this.disabled || this.readonly || this.checked);
    }
    get classes() {
        return {
            inner: {
                "ui5-radio-inner--hoverable": !this.disabled && !this.readonly && isDesktop(),
            },
        };
    }
    get effectiveAriaDisabled() {
        return this.disabled ? "true" : null;
    }
    get ariaLabelText() {
        return [getEffectiveAriaLabelText(this), this.text].filter(Boolean).join(" ");
    }
    get effectiveAriaDescribedBy() {
        return this.hasValueState ? `${this._id}-descr` : undefined;
    }
    get hasValueState() {
        return this.valueState !== ValueState$1.None;
    }
    get valueStateText() {
        switch (this.valueState) {
            case ValueState$1.Error:
                return RadioButton_1.i18nBundle.getText(VALUE_STATE_ERROR);
            case ValueState$1.Warning:
                return RadioButton_1.i18nBundle.getText(VALUE_STATE_WARNING);
            case ValueState$1.Success:
                return RadioButton_1.i18nBundle.getText(VALUE_STATE_SUCCESS);
            case ValueState$1.Information:
                return RadioButton_1.i18nBundle.getText(VALUE_STATE_INFORMATION);
            default:
                return "";
        }
    }
    get radioButtonGroupRequiredText() {
        return RadioButton_1.i18nBundle.getText(RADIO_BUTTON_GROUP_REQUIRED);
    }
    get effectiveTabIndex() {
        const tabindex = this.getAttribute("tabindex");
        if (this.disabled) {
            return "-1";
        }
        if (this.name) {
            return this._tabIndex;
        }
        return tabindex || "0";
    }
    get strokeWidth() {
        return this.valueState === "None" ? "1" : "2";
    }
};
__decorate$g([
    property({ type: Boolean })
], RadioButton.prototype, "disabled", void 0);
__decorate$g([
    property({ type: Boolean })
], RadioButton.prototype, "readonly", void 0);
__decorate$g([
    property({ type: Boolean })
], RadioButton.prototype, "required", void 0);
__decorate$g([
    property({ type: Boolean })
], RadioButton.prototype, "checked", void 0);
__decorate$g([
    property()
], RadioButton.prototype, "text", void 0);
__decorate$g([
    property({ type: ValueState$1, defaultValue: ValueState$1.None })
], RadioButton.prototype, "valueState", void 0);
__decorate$g([
    property()
], RadioButton.prototype, "name", void 0);
__decorate$g([
    property()
], RadioButton.prototype, "value", void 0);
__decorate$g([
    property({ type: WrappingType$1, defaultValue: WrappingType$1.None })
], RadioButton.prototype, "wrappingType", void 0);
__decorate$g([
    property()
], RadioButton.prototype, "accessibleName", void 0);
__decorate$g([
    property()
], RadioButton.prototype, "accessibleNameRef", void 0);
__decorate$g([
    property({ defaultValue: "-1", noAttribute: true })
], RadioButton.prototype, "_tabIndex", void 0);
__decorate$g([
    property({ type: Boolean })
], RadioButton.prototype, "active", void 0);
__decorate$g([
    slot()
], RadioButton.prototype, "formSupport", void 0);
RadioButton = RadioButton_1 = __decorate$g([
    customElement({
        tag: "ui5-radio-button",
        languageAware: true,
        renderer: litRender,
        template: block0$h,
        styles: styleData$m,
        dependencies: [Label$1],
    })
    /**
     * Fired when the component checked state changes.
     *
     * @event sap.ui.webc.main.RadioButton#change
     * @public
     * @since 1.0.0-rc.15
     */
    ,
    event("change")
], RadioButton);
RadioButton.define();
var RadioButton$1 = RadioButton;

var __decorate$f = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var List_1;
const INFINITE_SCROLL_DEBOUNCE_RATE = 250; // ms
const PAGE_UP_DOWN_SIZE = 10;
/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-list</code> component allows displaying a list of items, advanced keyboard
 * handling support for navigating between items, and predefined modes to improve the development efficiency.
 * <br><br>
 * The <code>ui5-list</code> is a container for the available list items:
 * <ul>
 * <li><code>ui5-li</code></li>
 * <li><code>ui5-li-custom</code></li>
 * <li><code>ui5-li-groupheader</code></li>
 * </ul>
 * <br><br>
 * To benefit from the built-in selection mechanism, you can use the available
 * selection modes, such as
 * <code>SingleSelect</code>, <code>MultiSelect</code> and <code>Delete</code>.
 * <br><br>
 * Additionally, the <code>ui5-list</code> provides header, footer, and customization for the list item separators.
 *
 * <br><br>
 * <h3>Keyboard Handling</h3>
 *
 * <h4>Basic Navigation</h4>
 * The <code>ui5-list</code> provides advanced keyboard handling.
 * When a list is focused the user can use the following keyboard
 * shortcuts in order to perform a navigation:
 * <br>
 *
 * <ul>
 * <li>[UP/DOWN] - Navigates up and down the items</li>
 * <li>[HOME] - Navigates to first item</li>
 * <li>[END] - Navigates to the last item</li>
 * </ul>
 *
 * The user can use the following keyboard shortcuts to perform actions (such as select, delete),
 * when the <code>mode</code> property is in use:
 * <ul>
 * <li>[SPACE] - Select an item (if <code>type</code> is 'Active') when <code>mode</code> is selection</li>
 * <li>[DELETE] - Delete an item if <code>mode</code> property is <code>Delete</code></li>
 * </ul>
 *
 * <h4>Fast Navigation</h4>
 * This component provides a build in fast navigation group which can be used via <code>F6 / Shift + F6</code> or <code> Ctrl + Alt(Option) + Down /  Ctrl + Alt(Option) + Up</code>.
 * In order to use this functionality, you need to import the following module:
 * <code>import "@ui5/webcomponents-base/dist/features/F6Navigation.js"</code>
 * <br><br>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/List.js";</code>
 * <br>
 * <code>import "@ui5/webcomponents/dist/StandardListItem.js";</code> (for <code>ui5-li</code>)
 * <br>
 * <code>import "@ui5/webcomponents/dist/CustomListItem.js";</code> (for <code>ui5-li-custom</code>)
 * <br>
 * <code>import "@ui5/webcomponents/dist/GroupHeaderListItem.js";</code> (for <code>ui5-li-groupheader</code>)
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.List
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-list
 * @appenddocs sap.ui.webc.main.StandardListItem sap.ui.webc.main.CustomListItem sap.ui.webc.main.GroupHeaderListItem
 * @public
 */
let List = List_1 = class List extends UI5Element {
    static async onDefine() {
        List_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
    constructor() {
        super();
        this._previouslyFocusedItem = null;
        // Indicates that the List is forwarding the focus before or after the internal ul.
        this._forwardingFocus = false;
        // Indicates that the List has already subscribed for resize.
        this.resizeListenerAttached = false;
        // Indicates if the IntersectionObserver started observing the List
        this.listEndObserved = false;
        this._itemNavigation = new ItemNavigation(this, {
            skipItemsSize: PAGE_UP_DOWN_SIZE,
            navigationMode: NavigationMode$1.Vertical,
            getItemsCallback: () => this.getEnabledItems(),
        });
        this._handleResize = this.checkListInViewport.bind(this);
        this._handleResize = this.checkListInViewport.bind(this);
        // Indicates the List bottom most part has been detected by the IntersectionObserver
        // for the first time.
        this.initialIntersection = true;
    }
    onExitDOM() {
        this.unobserveListEnd();
        this.resizeListenerAttached = false;
        ResizeHandler.deregister(this.getDomRef(), this._handleResize);
    }
    onBeforeRendering() {
        this.prepareListItems();
    }
    onAfterRendering() {
        if (this.growsOnScroll) {
            this.observeListEnd();
        }
        else if (this.listEndObserved) {
            this.unobserveListEnd();
        }
        if (this.grows) {
            this.checkListInViewport();
            this.attachForResize();
        }
    }
    attachForResize() {
        if (!this.resizeListenerAttached) {
            this.resizeListenerAttached = true;
            ResizeHandler.register(this.getDomRef(), this._handleResize);
        }
    }
    get shouldRenderH1() {
        return !this.header.length && this.headerText;
    }
    get headerID() {
        return `${this._id}-header`;
    }
    get modeLabelID() {
        return `${this._id}-modeLabel`;
    }
    get listEndDOM() {
        return this.shadowRoot.querySelector(".ui5-list-end-marker");
    }
    get hasData() {
        return this.getItems().length !== 0;
    }
    get showNoDataText() {
        return !this.hasData && this.noDataText;
    }
    get isDelete() {
        return this.mode === ListMode$1.Delete;
    }
    get isSingleSelect() {
        return [
            ListMode$1.SingleSelect,
            ListMode$1.SingleSelectBegin,
            ListMode$1.SingleSelectEnd,
            ListMode$1.SingleSelectAuto,
        ].includes(this.mode);
    }
    get isMultiSelect() {
        return this.mode === ListMode$1.MultiSelect;
    }
    get ariaLabelledBy() {
        if (this.accessibleNameRef || this.accessibleName) {
            return undefined;
        }
        const ids = [];
        if (this.isMultiSelect || this.isSingleSelect || this.isDelete) {
            ids.push(this.modeLabelID);
        }
        if (this.shouldRenderH1) {
            ids.push(this.headerID);
        }
        return ids.length ? ids.join(" ") : undefined;
    }
    get ariaLabelTxt() {
        return getEffectiveAriaLabelText(this);
    }
    get ariaLabelModeText() {
        if (this.hasData) {
            if (this.isMultiSelect) {
                return List_1.i18nBundle.getText(ARIA_LABEL_LIST_MULTISELECTABLE);
            }
            if (this.isSingleSelect) {
                return List_1.i18nBundle.getText(ARIA_LABEL_LIST_SELECTABLE);
            }
            if (this.isDelete) {
                return List_1.i18nBundle.getText(ARIA_LABEL_LIST_DELETABLE);
            }
        }
        return "";
    }
    get grows() {
        return this.growing !== ListGrowingMode$1.None;
    }
    get growsOnScroll() {
        return this.growing === ListGrowingMode$1.Scroll;
    }
    get growsWithButton() {
        return this.growing === ListGrowingMode$1.Button;
    }
    get _growingButtonText() {
        return List_1.i18nBundle.getText(LOAD_MORE_TEXT);
    }
    get busyIndPosition() {
        if (!this.grows) {
            return "absolute";
        }
        return this._inViewport ? "absolute" : "sticky";
    }
    get styles() {
        return {
            busyInd: {
                position: this.busyIndPosition,
            },
        };
    }
    get classes() {
        return {
            root: {
                "ui5-list-root": true,
                "ui5-content-native-scrollbars": getEffectiveScrollbarStyle(),
            },
        };
    }
    prepareListItems() {
        const slottedItems = this.getItemsForProcessing();
        slottedItems.forEach((item, key) => {
            const isLastChild = key === slottedItems.length - 1;
            const showBottomBorder = this.separators === ListSeparators$1.All
                || (this.separators === ListSeparators$1.Inner && !isLastChild);
            if (item.hasConfigurableMode) {
                item._mode = this.mode;
            }
            item.hasBorder = showBottomBorder;
        });
    }
    async observeListEnd() {
        if (!this.listEndObserved) {
            await renderFinished();
            this.getIntersectionObserver().observe(this.listEndDOM);
            this.listEndObserved = true;
        }
    }
    unobserveListEnd() {
        if (this.growingIntersectionObserver) {
            this.growingIntersectionObserver.disconnect();
            this.growingIntersectionObserver = null;
            this.listEndObserved = false;
        }
    }
    onInteresection(entries) {
        if (this.initialIntersection) {
            this.initialIntersection = false;
            return;
        }
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                debounce(this.loadMore.bind(this), INFINITE_SCROLL_DEBOUNCE_RATE);
            }
        });
    }
    /*
    * ITEM SELECTION BASED ON THE CURRENT MODE
    */
    onSelectionRequested(e) {
        const previouslySelectedItems = this.getSelectedItems();
        let selectionChange = false;
        this._selectionRequested = true;
        if (this.mode !== ListMode$1.None && this[`handle${this.mode}`]) {
            selectionChange = this[`handle${this.mode}`](e.detail.item, !!e.detail.selected);
        }
        if (selectionChange) {
            const changePrevented = !this.fireEvent("selection-change", {
                selectedItems: this.getSelectedItems(),
                previouslySelectedItems,
                selectionComponentPressed: e.detail.selectionComponentPressed,
                targetItem: e.detail.item,
                key: e.detail.key,
            }, true);
            if (changePrevented) {
                this._revertSelection(previouslySelectedItems);
            }
        }
    }
    handleSingleSelect(item) {
        if (item.selected) {
            return false;
        }
        this.deselectSelectedItems();
        item.selected = true;
        return true;
    }
    handleSingleSelectBegin(item) {
        return this.handleSingleSelect(item);
    }
    handleSingleSelectEnd(item) {
        return this.handleSingleSelect(item);
    }
    handleSingleSelectAuto(item) {
        return this.handleSingleSelect(item);
    }
    handleMultiSelect(item, selected) {
        item.selected = selected;
        return true;
    }
    handleDelete(item) {
        this.fireEvent("item-delete", { item });
        return true;
    }
    deselectSelectedItems() {
        this.getSelectedItems().forEach(item => { item.selected = false; });
    }
    getSelectedItems() {
        return this.getItems().filter(item => item.selected);
    }
    getEnabledItems() {
        return this.getItems().filter(item => !item.disabled);
    }
    getItems() {
        return this.getSlottedNodes("items");
    }
    getItemsForProcessing() {
        return this.getItems();
    }
    _revertSelection(previouslySelectedItems) {
        this.getItems().forEach((item) => {
            const oldSelection = previouslySelectedItems.indexOf(item) !== -1;
            const multiSelectCheckBox = item.shadowRoot.querySelector(".ui5-li-multisel-cb");
            const singleSelectRadioButton = item.shadowRoot.querySelector(".ui5-li-singlesel-radiobtn");
            item.selected = oldSelection;
            if (multiSelectCheckBox) {
                multiSelectCheckBox.checked = oldSelection;
            }
            else if (singleSelectRadioButton) {
                singleSelectRadioButton.checked = oldSelection;
            }
        });
    }
    _onkeydown(e) {
        if (isTabNext(e)) {
            this._handleTabNext(e);
        }
    }
    _onLoadMoreKeydown(e) {
        if (isSpace(e)) {
            e.preventDefault();
            this._loadMoreActive = true;
        }
        if (isEnter(e)) {
            this._onLoadMoreClick();
            this._loadMoreActive = true;
        }
        if (isTabNext(e)) {
            this.focusAfterElement();
        }
        if (isTabPrevious(e)) {
            if (this.getPreviouslyFocusedItem()) {
                this.focusPreviouslyFocusedItem();
            }
            else {
                this.focusFirstItem();
            }
            e.preventDefault();
        }
    }
    _onLoadMoreKeyup(e) {
        if (isSpace(e)) {
            this._onLoadMoreClick();
        }
        this._loadMoreActive = false;
    }
    _onLoadMoreMousedown() {
        this._loadMoreActive = true;
    }
    _onLoadMoreMouseup() {
        this._loadMoreActive = false;
    }
    _onLoadMoreClick() {
        this.loadMore();
    }
    checkListInViewport() {
        this._inViewport = isElementInView(this.getDomRef());
    }
    loadMore() {
        this.fireEvent("load-more");
    }
    /*
    * KEYBOARD SUPPORT
    */
    _handleTabNext(e) {
        getNormalizedTarget(e.target);
        {
            return;
        }
    }
    _onfocusin(e) {
        const target = getNormalizedTarget(e.target);
        // If the focusin event does not origin from one of the 'triggers' - ignore it.
        if (!this.isForwardElement(target)) {
            e.stopImmediatePropagation();
            return;
        }
        // The focus arrives in the List for the first time.
        // If there is selected item - focus it or focus the first item.
        if (!this.getPreviouslyFocusedItem()) {
            if (this.growsWithButton && this.isForwardAfterElement(target)) {
                this.focusGrowingButton();
            }
            else {
                this.focusFirstItem();
            }
            e.stopImmediatePropagation();
            return;
        }
        // The focus returns to the List,
        // focus the first selected item or the previously focused element.
        if (!this.getForwardingFocus()) {
            if (this.growsWithButton && this.isForwardAfterElement(target)) {
                this.focusGrowingButton();
                e.stopImmediatePropagation();
                return;
            }
            this.focusPreviouslyFocusedItem();
            e.stopImmediatePropagation();
        }
        this.setForwardingFocus(false);
    }
    isForwardElement(element) {
        const elementId = element.id;
        const beforeElement = this.getBeforeElement();
        if (this._id === elementId || (beforeElement && beforeElement.id === elementId)) {
            return true;
        }
        return this.isForwardAfterElement(element);
    }
    isForwardAfterElement(element) {
        const elementId = element.id;
        const afterElement = this.getAfterElement();
        return afterElement && afterElement.id === elementId;
    }
    onItemTabIndexChange(e) {
        const target = e.target;
        this._itemNavigation.setCurrentItem(target);
    }
    onItemFocused(e) {
        const target = e.target;
        e.stopPropagation();
        this._itemNavigation.setCurrentItem(target);
        this.fireEvent("item-focused", { item: target });
        if (this.mode === ListMode$1.SingleSelectAuto) {
            const detail = {
                item: target,
                selectionComponentPressed: false,
                selected: true,
                key: e.detail.key,
            };
            this.onSelectionRequested({ detail });
        }
    }
    onItemPress(e) {
        const pressedItem = e.detail.item;
        if (!this.fireEvent("item-click", { item: pressedItem }, true)) {
            return;
        }
        if (!this._selectionRequested && this.mode !== ListMode$1.Delete) {
            this._selectionRequested = true;
            const detail = {
                item: pressedItem,
                selectionComponentPressed: false,
                selected: !pressedItem.selected,
                key: e.detail.key,
            };
            this.onSelectionRequested({ detail });
        }
        this._selectionRequested = false;
    }
    // This is applicable to NotificationListItem
    onItemClose(e) {
        const target = e.target;
        const shouldFireItemClose = target?.hasAttribute("ui5-li-notification") || target?.hasAttribute("ui5-li-notification-group");
        if (shouldFireItemClose) {
            this.fireEvent("item-close", { item: e.detail?.item });
        }
    }
    onItemToggle(e) {
        this.fireEvent("item-toggle", { item: e.detail.item });
    }
    onForwardBefore(e) {
        this.setPreviouslyFocusedItem(e.target);
        this.focusBeforeElement();
        e.stopPropagation();
    }
    onForwardAfter(e) {
        this.setPreviouslyFocusedItem(e.target);
        if (!this.growsWithButton) {
            this.focusAfterElement();
        }
        else {
            this.focusGrowingButton();
            e.preventDefault();
        }
        e.stopPropagation();
    }
    focusBeforeElement() {
        this.setForwardingFocus(true);
        this.getBeforeElement().focus();
    }
    focusAfterElement() {
        this.setForwardingFocus(true);
        this.getAfterElement().focus();
    }
    focusGrowingButton() {
        const growingBtn = this.getGrowingButton();
        if (growingBtn) {
            growingBtn.focus();
        }
    }
    getGrowingButton() {
        return this.shadowRoot.querySelector(`[id="${this._id}-growing-btn"]`);
    }
    /**
     * Focuses the first list item and sets its tabindex to "0" via the ItemNavigation
     * @protected
     */
    focusFirstItem() {
        // only enabled items are focusable
        const firstItem = this.getFirstItem(x => !x.disabled);
        if (firstItem) {
            firstItem.focus();
        }
    }
    focusPreviouslyFocusedItem() {
        const previouslyFocusedItem = this.getPreviouslyFocusedItem();
        if (previouslyFocusedItem) {
            previouslyFocusedItem.focus();
        }
    }
    focusFirstSelectedItem() {
        // only enabled items are focusable
        const firstSelectedItem = this.getFirstItem(x => x.selected && !x.disabled);
        if (firstSelectedItem) {
            firstSelectedItem.focus();
        }
    }
    /**
     * Focuses a list item and sets its tabindex to "0" via the ItemNavigation
     * @protected
     * @param item
     */
    focusItem(item) {
        this._itemNavigation.setCurrentItem(item);
        item.focus();
    }
    onFocusRequested(e) {
        setTimeout(() => {
            this.setPreviouslyFocusedItem(e.target);
            this.focusPreviouslyFocusedItem();
        }, 0);
    }
    setForwardingFocus(forwardingFocus) {
        this._forwardingFocus = forwardingFocus;
    }
    getForwardingFocus() {
        return this._forwardingFocus;
    }
    setPreviouslyFocusedItem(item) {
        this._previouslyFocusedItem = item;
    }
    getPreviouslyFocusedItem() {
        return this._previouslyFocusedItem;
    }
    getFirstItem(filter) {
        const slottedItems = this.getItems();
        let firstItem = null;
        if (!filter) {
            return slottedItems.length ? slottedItems[0] : null;
        }
        for (let i = 0; i < slottedItems.length; i++) {
            if (filter(slottedItems[i])) {
                firstItem = slottedItems[i];
                break;
            }
        }
        return firstItem;
    }
    getAfterElement() {
        if (!this._afterElement) {
            this._afterElement = this.shadowRoot.querySelector(`[id="${this._id}-after"]`);
        }
        return this._afterElement;
    }
    getBeforeElement() {
        if (!this._beforeElement) {
            this._beforeElement = this.shadowRoot.querySelector(`[id="${this._id}-before"]`);
        }
        return this._beforeElement;
    }
    getIntersectionObserver() {
        if (!this.growingIntersectionObserver) {
            this.growingIntersectionObserver = new IntersectionObserver(this.onInteresection.bind(this), {
                root: null,
                rootMargin: "0px",
                threshold: 1.0,
            });
        }
        return this.growingIntersectionObserver;
    }
};
__decorate$f([
    property()
], List.prototype, "headerText", void 0);
__decorate$f([
    property()
], List.prototype, "footerText", void 0);
__decorate$f([
    property({ type: Boolean })
], List.prototype, "indent", void 0);
__decorate$f([
    property({ type: ListMode$1, defaultValue: ListMode$1.None })
], List.prototype, "mode", void 0);
__decorate$f([
    property()
], List.prototype, "noDataText", void 0);
__decorate$f([
    property({ type: ListSeparators$1, defaultValue: ListSeparators$1.All })
], List.prototype, "separators", void 0);
__decorate$f([
    property({ type: ListGrowingMode$1, defaultValue: ListGrowingMode$1.None })
], List.prototype, "growing", void 0);
__decorate$f([
    property({ type: Boolean })
], List.prototype, "busy", void 0);
__decorate$f([
    property({ validator: Integer, defaultValue: 1000 })
], List.prototype, "busyDelay", void 0);
__decorate$f([
    property()
], List.prototype, "accessibleName", void 0);
__decorate$f([
    property({ defaultValue: "" })
], List.prototype, "accessibleNameRef", void 0);
__decorate$f([
    property({ defaultValue: "list" })
], List.prototype, "accessibleRole", void 0);
__decorate$f([
    property({ defaultValue: undefined, noAttribute: true })
], List.prototype, "accessibleRoleDescription", void 0);
__decorate$f([
    property({ type: Boolean })
], List.prototype, "_inViewport", void 0);
__decorate$f([
    property({ type: Boolean })
], List.prototype, "_loadMoreActive", void 0);
__decorate$f([
    slot({ type: HTMLElement, "default": true })
], List.prototype, "items", void 0);
__decorate$f([
    slot()
], List.prototype, "header", void 0);
List = List_1 = __decorate$f([
    customElement({
        tag: "ui5-list",
        fastNavigation: true,
        renderer: litRender,
        template: block0$j,
        styles: [styleData$o, styleData$p],
        dependencies: [BusyIndicator$1],
    })
    /**
     * Fired when an item is activated, unless the item's <code>type</code> property
     * is set to <code>Inactive</code>.
     *
     * @event sap.ui.webc.main.List#item-click
     * @allowPreventDefault
     * @param {HTMLElement} item The clicked item.
     * @public
     */
    ,
    event("item-click", {
        detail: {
            item: { type: HTMLElement },
        },
    })
    /**
     * Fired when the <code>Close</code> button of any item is clicked
     * <br><br>
     * <b>Note:</b> This event is only applicable to list items that can be closed (such as notification list items),
     * not to be confused with <code>item-delete</code>.
     *
     * @event sap.ui.webc.main.List#item-close
     * @param {HTMLElement} item the item about to be closed.
     * @public
     * @since 1.0.0-rc.8
     */
    ,
    event("item-close", {
        detail: {
            item: { type: HTMLElement },
        },
    })
    /**
     * Fired when the <code>Toggle</code> button of any item is clicked.
     * <br><br>
     * <b>Note:</b> This event is only applicable to list items that can be toggled (such as notification group list items).
     *
     * @event sap.ui.webc.main.List#item-toggle
     * @param {HTMLElement} item the toggled item.
     * @public
     * @since 1.0.0-rc.8
     */
    ,
    event("item-toggle", {
        detail: {
            item: { type: HTMLElement },
        },
    })
    /**
     * Fired when the Delete button of any item is pressed.
     * <br><br>
     * <b>Note:</b> A Delete button is displayed on each item,
     * when the component <code>mode</code> property is set to <code>Delete</code>.
     *
     * @event sap.ui.webc.main.List#item-delete
     * @param {HTMLElement} item the deleted item.
     * @public
     */
    ,
    event("item-delete", {
        detail: {
            item: { type: HTMLElement },
        },
    })
    /**
     * Fired when selection is changed by user interaction
     * in <code>SingleSelect</code>, <code>SingleSelectBegin</code>, <code>SingleSelectEnd</code> and <code>MultiSelect</code> modes.
     *
     * @event sap.ui.webc.main.List#selection-change
     * @allowPreventDefault
     * @param {Array} selectedItems An array of the selected items.
     * @param {Array} previouslySelectedItems An array of the previously selected items.
     * @public
     */
    ,
    event("selection-change", {
        detail: {
            selectedItems: { type: Array },
            previouslySelectedItems: { type: Array },
            targetItem: { type: HTMLElement },
            selectionComponentPressed: { type: Boolean }, // protected, indicates if the user used the selection components to change the selection
        },
    })
    /**
     * Fired when the user scrolls to the bottom of the list.
     * <br><br>
     * <b>Note:</b> The event is fired when the <code>growing='Scroll'</code> property is enabled.
     *
     * @event sap.ui.webc.main.List#load-more
     * @public
     * @since 1.0.0-rc.6
     */
    ,
    event("load-more")
    /**
     * @private
     */
    ,
    event("item-focused", {
        detail: {
            item: { type: HTMLElement },
        },
    })
], List);
List.define();
var List$1 = List;

const ICON_ADD = { key: "ICON_ADD", defaultText: "Add" };
const ICON_DECLINE = { key: "ICON_DECLINE", defaultText: "Decline" };
const ICON_DELETE = { key: "ICON_DELETE", defaultText: "Delete" };
const ICON_ERROR = { key: "ICON_ERROR", defaultText: "Error" };
const ICON_OVERFLOW = { key: "ICON_OVERFLOW", defaultText: "More" };
const ICON_SAVE = { key: "ICON_SAVE", defaultText: "Save" };
const ICON_SEARCH = { key: "ICON_SEARCH", defaultText: "Search" };

const name$D = "decline";
const pathData$D = "M86 109l22-23q5-5 12-5 6 0 11 5l124 125L380 86q5-5 11-5 7 0 12 5l22 23q12 11 0 23L301 256l124 125q11 11 0 22l-22 23q-8 5-12 5-3 0-11-5L255 301 131 426q-5 5-11 5-4 0-12-5l-22-23q-11-11 0-22l124-125L86 132q-12-12 0-23z";
const ltr$D = false;
const accData$d = ICON_DECLINE;
const collection$D = "SAP-icons-v4";
const packageName$D = "@ui5/webcomponents-icons";

registerIcon(name$D, { pathData: pathData$D, ltr: ltr$D, accData: accData$d, collection: collection$D, packageName: packageName$D });

const name$C = "decline";
const pathData$C = "M292 256l117 116q7 7 7 18 0 12-7.5 19t-18.5 7q-10 0-18-8L256 292 140 408q-8 8-18 8-11 0-18.5-7.5T96 390q0-10 8-18l116-116-116-116q-8-8-8-18 0-11 7.5-18.5T122 96t18 7l116 117 116-117q7-7 18-7t18.5 7.5T416 122t-7 18z";
const ltr$C = false;
const accData$c = ICON_DECLINE;
const collection$C = "SAP-icons-v5";
const packageName$C = "@ui5/webcomponents-icons";

registerIcon(name$C, { pathData: pathData$C, ltr: ltr$C, accData: accData$c, collection: collection$C, packageName: packageName$C });

isLegacyThemeFamily() ? pathData$D : pathData$C;

const name$B = "edit";
const pathData$B = "M475 104q5 7 5 12 0 6-5 11L150 453q-4 4-8 4L32 480l22-110q0-5 4-9L384 36q4-4 11-4t11 4zm-121 99l-46-45L84 381l46 46zm87-88l-46-44-64 64 45 45z";
const ltr$B = false;
const collection$B = "SAP-icons-v4";
const packageName$B = "@ui5/webcomponents-icons";

registerIcon(name$B, { pathData: pathData$B, ltr: ltr$B, collection: collection$B, packageName: packageName$B });

const name$A = "edit";
const pathData$A = "M505 94q7 7 7 18t-6 17L130 505q-7 7-18 7H26q-11 0-18.5-7.5T0 486v-86q1-10 6-16L382 7q7-7 18-7t18 7zm-55 18l-50-50-50 50 50 50zm-86 86l-50-50L62 400l50 50z";
const ltr$A = false;
const collection$A = "SAP-icons-v5";
const packageName$A = "@ui5/webcomponents-icons";

registerIcon(name$A, { pathData: pathData$A, ltr: ltr$A, collection: collection$A, packageName: packageName$A });

isLegacyThemeFamily() ? pathData$B : pathData$A;

/**
 * Different list item types.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.ListItemType
 */
var ListItemType;
(function (ListItemType) {
    /**
     * Indicates the list item does not have any active feedback when item is pressed.
     * @public
     * @type {Inactive}
     */
    ListItemType["Inactive"] = "Inactive";
    /**
     * Indicates that the item is clickable via active feedback when item is pressed.
     * @public
     * @type {Active}
     */
    ListItemType["Active"] = "Active";
    /**
     * Enables detail button of the list item that fires detail-click event.
     * @public
     * @type {Detail}
     */
    ListItemType["Detail"] = "Detail";
    /**
     * Enables the type of navigation, which is specified to add an arrow at the end of the items and fires navigate-click event.
     * @public
     * @type {Navigation}
     */
    ListItemType["Navigation"] = "Navigation";
})(ListItemType || (ListItemType = {}));
var ListItemType$1 = ListItemType;

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$w);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$v);
const styleData$l = { packageName: "@ui5/webcomponents", fileName: "themes/ListItem.css.ts", content: `.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host([actionable]:not([disabled])){cursor:pointer}:host([selected][actionable]:not([active]):hover){background:var(--sapList_Hover_SelectionBackground)}:host([active][actionable]),:host([selected][active][actionable]){background:var(--sapList_Active_Background)}:host([actionable]:not([active]):not([selected]):hover){background:var(--sapList_Hover_Background)}:host([active][actionable]) .ui5-li-root.ui5-li--focusable:focus,:host([active][actionable]) .ui5-li-root.ui5-li--focusable .ui5-li-content:focus{outline-color:var(--sapContent_ContrastFocusColor)}:host([navigated]) .ui5-li-root .ui5-li-navigated{width:.1875rem;position:absolute;right:0;top:0;bottom:0;background-color:var(--sapList_SelectionBorderColor)}:host([active][actionable]) .ui5-li-root .ui5-li-icon{color:var(--sapList_Active_TextColor)}:host([active][actionable]) .ui5-li-title,:host([active][actionable]) .ui5-li-desc,:host([active][actionable]) .ui5-li-additional-text{color:var(--sapList_Active_TextColor)}:host([additional-text-state="Warning"]) .ui5-li-additional-text{color:var(--sapCriticalTextColor)}:host([additional-text-state="Success"]) .ui5-li-additional-text{color:var(--sapPositiveTextColor)}:host([additional-text-state="Error"]) .ui5-li-additional-text{color:var(--sapNegativeTextColor)}:host([additional-text-state="Information"]) .ui5-li-additional-text{color:var(--sapInformativeTextColor)}:host([has-title][description]){height:5rem}:host([has-title][image]){height:5rem}:host([_has-image-content]){height:5rem}:host([image]) .ui5-li-content{height:3rem}:host([description]) .ui5-li-root{padding:1rem}:host([description]) .ui5-li-content{height:3rem}:host([has-title][description]) .ui5-li-title{padding-bottom:.375rem}.ui5-li-text-wrapper{display:flex;flex-direction:column;flex:auto;min-width:1px;line-height:normal}:host([description]) .ui5-li-text-wrapper{height:100%;justify-content:space-between;padding:.125rem 0}.ui5-li-description-info-wrapper{display:flex;justify-content:space-between}.ui5-li-title{color:var(--sapList_TextColor);font-size:var(--_ui5-v1-21-0-rc-5_list_item_title_size)}.ui5-li-additional-text,:host(:not([wrapping-type="Normal"])) .ui5-li-title,.ui5-li-desc{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host([wrapping-type="Normal"]){height:auto}:host([wrapping-type="Normal"]) .ui5-li-content{margin:var(--_ui5-v1-21-0-rc-5_list_item_content_vertical_offset) 0}.ui5-li-desc{color:var(--sapContent_LabelColor);font-size:var(--sapFontSize)}.ui5-li-additional-text{margin:0 .25rem;color:var(--sapNeutralTextColor);font-size:var(--sapFontSize);min-width:3.75rem;text-align:end}:host([description]) .ui5-li-additional-text{align-self:flex-end}.ui5-li-img{width:var(--_ui5-v1-21-0-rc-5_list_item_img_size);height:var(--_ui5-v1-21-0-rc-5_list_item_img_size);border-radius:var(--ui5-v1-21-0-rc-5-avatar-border-radius)}.ui5-li-img,.ui5-li-imgContent{min-width:var(--_ui5-v1-21-0-rc-5_list_item_img_size);min-height:var(--_ui5-v1-21-0-rc-5_list_item_img_size);margin-top:var(--_ui5-v1-21-0-rc-5_list_item_img_top_margin);margin-bottom:var(--_ui5-v1-21-0-rc-5_list_item_img_bottom_margin);margin-inline-end:var(--_ui5-v1-21-0-rc-5_list_item_img_hn_margin)}.ui5-li-img-inner{object-fit:contain}.ui5-li-icon{min-width:var(--_ui5-v1-21-0-rc-5_list_item_icon_size);min-height:var(--_ui5-v1-21-0-rc-5_list_item_icon_size);color:var(--sapContent_NonInteractiveIconColor);padding-inline-end:var(--_ui5-v1-21-0-rc-5_list_item_icon_padding-inline-end)}.ui5-li-content{display:flex;align-items:center;flex:auto;overflow:hidden}.ui5-li-detailbtn,.ui5-li-deletebtn{display:flex;align-items:center;margin-left:var(--_ui5-v1-21-0-rc-5_list_buttons_left_space)}.ui5-li-multisel-cb,.ui5-li-singlesel-radiobtn{flex-shrink:0}:host([description]) .ui5-li-singlesel-radiobtn{align-self:flex-start;margin-top:var(--_ui5-v1-21-0-rc-5_list_item_selection_btn_margin_top)}:host([description]) .ui5-li-multisel-cb{align-self:flex-start;margin-top:var(--_ui5-v1-21-0-rc-5_list_item_selection_btn_margin_top)}:host([_mode="SingleSelectBegin"]) .ui5-li-root{padding-inline:0 1rem}:host([_mode="MultiSelect"]) .ui5-li-root{padding-inline:0 1rem}:host([_mode="SingleSelectEnd"]) .ui5-li-root{padding-inline:1rem 0}:host [ui5-checkbox].ui5-li-singlesel-radiobtn{margin-right:var(--_ui5-v1-21-0-rc-5_list_item_cb_margin_right)}
` };

/**
 * Different types of HasPopup.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.HasPopup
 */
var HasPopup;
(function (HasPopup) {
    /**
     * Dialog popup type.
     * @public
     * @type {Dialog}
     */
    HasPopup["Dialog"] = "Dialog";
    /**
     * Grid popup type.
     * @public
     * @type {Grid}
     */
    HasPopup["Grid"] = "Grid";
    /**
     * ListBox popup type.
     * @public
     * @type {ListBox}
     */
    HasPopup["ListBox"] = "ListBox";
    /**
     * Menu popup type.
     * @public
     * @type {Menu}
     */
    HasPopup["Menu"] = "Menu";
    /**
     * Tree popup type.
     * @public
     * @type {Tree}
     */
    HasPopup["Tree"] = "Tree";
})(HasPopup || (HasPopup = {}));
var HasPopup$1 = HasPopup;

const name$z = "slim-arrow-right";
const pathData$z = "M357.5 233q10 10 10 23t-10 23l-165 165q-12 11-23 0t0-23l160-159q6-6 0-12l-159-159q-5-5-5-11t5-11 11-5 11 5z";
const ltr$z = false;
const collection$z = "SAP-icons-v4";
const packageName$z = "@ui5/webcomponents-icons";

registerIcon(name$z, { pathData: pathData$z, ltr: ltr$z, collection: collection$z, packageName: packageName$z });

const name$y = "slim-arrow-right";
const pathData$y = "M186 416q-11 0-18.5-7.5T160 390q0-10 8-18l121-116-121-116q-8-8-8-18 0-11 7.5-18.5T186 96q10 0 17 7l141 134q8 8 8 19 0 12-8 18L203 409q-7 7-17 7z";
const ltr$y = false;
const collection$y = "SAP-icons-v5";
const packageName$y = "@ui5/webcomponents-icons";

registerIcon(name$y, { pathData: pathData$y, ltr: ltr$y, collection: collection$y, packageName: packageName$y });

isLegacyThemeFamily() ? pathData$z : pathData$y;

var __decorate$e = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ListItem_1;
/**
 * @class
 * A class to serve as a base
 * for the <code>StandardListItem</code> and <code>CustomListItem</code> classes.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.ListItem
 * @extends sap.ui.webc.main.ListItemBase
 * @public
 */
let ListItem = ListItem_1 = class ListItem extends ListItemBase$1 {
    constructor() {
        super();
        this.deactivateByKey = (e) => {
            if (isEnter(e)) {
                this.deactivate();
            }
        };
        this.deactivate = () => {
            if (this.active) {
                this.active = false;
            }
        };
        const handleTouchStartEvent = (e) => {
            this._onmousedown(e);
        };
        this._ontouchstart = {
            handleEvent: handleTouchStartEvent,
            passive: true,
        };
    }
    onBeforeRendering() {
        this.actionable = (this.type === ListItemType$1.Active || this.type === ListItemType$1.Navigation) && (this._mode !== ListMode$1.Delete);
    }
    onEnterDOM() {
        document.addEventListener("mouseup", this.deactivate);
        document.addEventListener("touchend", this.deactivate);
        document.addEventListener("keyup", this.deactivateByKey);
    }
    onExitDOM() {
        document.removeEventListener("mouseup", this.deactivate);
        document.removeEventListener("keyup", this.deactivateByKey);
        document.removeEventListener("touchend", this.deactivate);
    }
    _onkeydown(e) {
        super._onkeydown(e);
        const itemActive = this.type === ListItemType$1.Active, itemNavigated = this.typeNavigation;
        if (isSpace(e)) {
            e.preventDefault();
        }
        if ((isSpace(e) || isEnter(e)) && (itemActive || itemNavigated)) {
            this.activate();
        }
        if (isEnter(e)) {
            this.fireItemPress(e);
        }
    }
    _onkeyup(e) {
        if (isSpace(e) || isEnter(e)) {
            this.deactivate();
        }
        if (isSpace(e)) {
            this.fireItemPress(e);
        }
        if (this.modeDelete && isDelete(e)) {
            this.onDelete();
        }
    }
    _onmousedown(e) {
        if (getEventMark(e) === "button") {
            return;
        }
        this.activate();
    }
    _onmouseup(e) {
        if (getEventMark(e) === "button") {
            return;
        }
        this.deactivate();
    }
    _ontouchend(e) {
        this._onmouseup(e);
    }
    _onfocusout() {
        super._onfocusout();
        this.deactivate();
    }
    _onclick(e) {
        if (getEventMark(e) === "button") {
            return;
        }
        this.fireItemPress(e);
    }
    /*
     * Called when selection components in Single (ui5-radio-button)
     * and Multi (ui5-checkbox) selection modes are used.
     */
    onMultiSelectionComponentPress(e) {
        if (this.isInactive) {
            return;
        }
        this.fireEvent("_selection-requested", { item: this, selected: e.target.checked, selectionComponentPressed: true });
    }
    onSingleSelectionComponentPress(e) {
        if (this.isInactive) {
            return;
        }
        this.fireEvent("_selection-requested", { item: this, selected: !e.target.checked, selectionComponentPressed: true });
    }
    activate() {
        if (this.type === ListItemType$1.Active || this.type === ListItemType$1.Navigation) {
            this.active = true;
        }
    }
    onDelete() {
        this.fireEvent("_selection-requested", { item: this, selectionComponentPressed: false });
    }
    onDetailClick() {
        this.fireEvent("detail-click", { item: this, selected: this.selected });
    }
    fireItemPress(e) {
        if (this.isInactive) {
            return;
        }
        if (isEnter(e)) {
            e.preventDefault();
        }
        this.fireEvent("_press", { item: this, selected: this.selected, key: e.key });
    }
    get isInactive() {
        return this.type === ListItemType$1.Inactive || this.type === ListItemType$1.Detail;
    }
    get placeSelectionElementBefore() {
        return this._mode === ListMode$1.MultiSelect
            || this._mode === ListMode$1.SingleSelectBegin;
    }
    get placeSelectionElementAfter() {
        return !this.placeSelectionElementBefore
            && (this._mode === ListMode$1.SingleSelectEnd || this._mode === ListMode$1.Delete);
    }
    get modeSingleSelect() {
        return [
            ListMode$1.SingleSelectBegin,
            ListMode$1.SingleSelectEnd,
            ListMode$1.SingleSelect,
        ].includes(this._mode);
    }
    get modeMultiSelect() {
        return this._mode === ListMode$1.MultiSelect;
    }
    get modeDelete() {
        return this._mode === ListMode$1.Delete;
    }
    /**
     * Used in UploadCollectionItem
     */
    get renderDeleteButton() {
        return this.modeDelete;
    }
    /**
     * End
     */
    get typeDetail() {
        return this.type === ListItemType$1.Detail;
    }
    get typeNavigation() {
        return this.type === ListItemType$1.Navigation;
    }
    get typeActive() {
        return this.type === ListItemType$1.Active;
    }
    get _ariaSelected() {
        if (this.modeMultiSelect || this.modeSingleSelect) {
            return this.selected;
        }
        return undefined;
    }
    get ariaSelectedText() {
        let ariaSelectedText;
        // Selected state needs to be supported separately since now the role mapping is list -> listitem[]
        // to avoid the issue of nesting interactive elements, ex. (option -> radio/checkbox);
        // The text is added to aria-describedby because as part of the aria-labelledby
        // the whole content of the item is readout when the aria-labelledby value is changed.
        if (this._ariaSelected !== undefined) {
            ariaSelectedText = this._ariaSelected ? ListItem_1.i18nBundle.getText(LIST_ITEM_SELECTED) : ListItem_1.i18nBundle.getText(LIST_ITEM_NOT_SELECTED);
        }
        return ariaSelectedText;
    }
    get deleteText() {
        return ListItem_1.i18nBundle.getText(DELETE);
    }
    get hasDeleteButtonSlot() {
        return !!this.deleteButton.length;
    }
    get _accessibleNameRef() {
        if (this.accessibleName) {
            // accessibleName is set - return labels excluding content
            return `${this._id}-invisibleText`;
        }
        // accessibleName is not set - return _accInfo.listItemAriaLabel including content
        return `${this._id}-content ${this._id}-invisibleText`;
    }
    get _accInfo() {
        return {
            role: this.accessibleRole || this.role,
            ariaExpanded: undefined,
            ariaLevel: this._level || undefined,
            ariaLabel: ListItem_1.i18nBundle.getText(ARIA_LABEL_LIST_ITEM_CHECKBOX),
            ariaLabelRadioButton: ListItem_1.i18nBundle.getText(ARIA_LABEL_LIST_ITEM_RADIO_BUTTON),
            ariaSelectedText: this.ariaSelectedText,
            ariaHaspopup: this.ariaHaspopup || undefined,
            setsize: this.accessibilityAttributes.ariaSetsize,
            posinset: this.accessibilityAttributes.ariaPosinset,
        };
    }
    get hasConfigurableMode() {
        return true;
    }
    static async onDefine() {
        ListItem_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
};
__decorate$e([
    property({ type: ListItemType$1, defaultValue: ListItemType$1.Active })
], ListItem.prototype, "type", void 0);
__decorate$e([
    property({ type: Object })
], ListItem.prototype, "accessibilityAttributes", void 0);
__decorate$e([
    property({ type: Boolean })
], ListItem.prototype, "navigated", void 0);
__decorate$e([
    property({ type: Boolean })
], ListItem.prototype, "active", void 0);
__decorate$e([
    property()
], ListItem.prototype, "title", void 0);
__decorate$e([
    property({ type: Boolean })
], ListItem.prototype, "actionable", void 0);
__decorate$e([
    property({ defaultValue: "listitem" })
], ListItem.prototype, "role", void 0);
__decorate$e([
    property({ defaultValue: undefined, noAttribute: true })
], ListItem.prototype, "accessibleRoleDescription", void 0);
__decorate$e([
    property()
], ListItem.prototype, "accessibleRole", void 0);
__decorate$e([
    property({ type: ListMode$1, defaultValue: ListMode$1.None })
], ListItem.prototype, "_mode", void 0);
__decorate$e([
    property({ type: HasPopup$1, noAttribute: true })
], ListItem.prototype, "ariaHaspopup", void 0);
__decorate$e([
    property({ type: Integer })
], ListItem.prototype, "_level", void 0);
__decorate$e([
    property({ type: Boolean, noAttribute: true })
], ListItem.prototype, "disableDeleteButton", void 0);
__decorate$e([
    slot()
], ListItem.prototype, "deleteButton", void 0);
ListItem = ListItem_1 = __decorate$e([
    customElement({
        languageAware: true,
        styles: [ListItemBase$1.styles, styleData$l],
        dependencies: [
            Button$1,
            RadioButton$1,
            CheckBox$1,
        ],
    })
    /**
     * Fired when the user clicks on the detail button when type is <code>Detail</code>.
     *
     * @event sap.ui.webc.main.ListItem#detail-click
     * @public
     */
    ,
    event("detail-click"),
    event("_press"),
    event("_focused"),
    event("_selection-requested")
], ListItem);
var ListItem$1 = ListItem;

/**
 * Different types of Title level.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.TitleLevel
 */
var TitleLevel;
(function (TitleLevel) {
    /**
     * Renders <code>h1</code> tag.
     * @public
     * @type {H1}
     */
    TitleLevel["H1"] = "H1";
    /**
     * Renders <code>h2</code> tag.
     * @public
     * @type {H2}
     */
    TitleLevel["H2"] = "H2";
    /**
     * Renders <code>h3</code> tag.
     * @public
     * @type {H3}
     */
    TitleLevel["H3"] = "H3";
    /**
     * Renders <code>h4</code> tag.
     * @public
     * @type {H4}
     */
    TitleLevel["H4"] = "H4";
    /**
     * Renders <code>h5</code> tag.
     * @public
     * @type {H5}
     */
    TitleLevel["H5"] = "H5";
    /**
     * Renders <code>h6</code> tag.
     * @public
     * @type {H6}
     */
    TitleLevel["H6"] = "H6";
})(TitleLevel || (TitleLevel = {}));
var TitleLevel$1 = TitleLevel;

/* eslint no-unused-vars: 0 */
function block0$g(context, tags, suffix) { return effectiveHtml `${this.h1 ? block1$c.call(this, context, tags, suffix) : undefined}${this.h2 ? block2$a.call(this, context, tags, suffix) : undefined}${this.h3 ? block3$9.call(this, context, tags, suffix) : undefined}${this.h4 ? block4$9.call(this, context, tags, suffix) : undefined}${this.h5 ? block5$7.call(this, context, tags, suffix) : undefined}${this.h6 ? block6$4.call(this, context, tags, suffix) : undefined}`; }
function block1$c(context, tags, suffix) { return effectiveHtml `<h1 class="ui5-title-root"><span id="${l$1(this._id)}-inner"><slot></slot></span></h1>`; }
function block2$a(context, tags, suffix) { return effectiveHtml `<h2 class="ui5-title-root"><span id="${l$1(this._id)}-inner"><slot></slot></span></h2>`; }
function block3$9(context, tags, suffix) { return effectiveHtml `<h3 class="ui5-title-root"><span id="${l$1(this._id)}-inner"><slot></slot></span></h3>`; }
function block4$9(context, tags, suffix) { return effectiveHtml `<h4 class="ui5-title-root"><span id="${l$1(this._id)}-inner"><slot></slot></span></h4>`; }
function block5$7(context, tags, suffix) { return effectiveHtml `<h5 class="ui5-title-root"><span id="${l$1(this._id)}-inner"><slot></slot></span></h5>`; }
function block6$4(context, tags, suffix) { return effectiveHtml `<h6 class="ui5-title-root"><span id="${l$1(this._id)}-inner"><slot></slot></span></h6>`; }

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$w);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$v);
const styleData$k = { packageName: "@ui5/webcomponents", fileName: "themes/Title.css.ts", content: `:host(:not([hidden])){display:block;cursor:text}:host{max-width:100%;color:var(--sapGroup_TitleTextColor);font-size:var(--sapFontHeader2Size);font-family:"72override",var(--sapFontHeaderFamily);text-shadow:var(--sapContent_TextShadow)}.ui5-title-root{display:inline-block;position:relative;font-weight:400;font-size:inherit;box-sizing:border-box;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%;vertical-align:bottom;-webkit-margin-before:0;-webkit-margin-after:0;-webkit-margin-start:0;-webkit-margin-end:0;margin:0;cursor:inherit}:host([wrapping-type="Normal"]) .ui5-title-root,:host([wrapping-type="Normal"]) ::slotted(*){white-space:pre-line}::slotted(*){font-size:inherit;font-family:inherit;text-shadow:inherit}:host([level="H1"]){font-size:var(--sapFontHeader1Size)}:host([level="H2"]){font-size:var(--sapFontHeader2Size)}:host([level="H3"]){font-size:var(--sapFontHeader3Size)}:host([level="H4"]){font-size:var(--sapFontHeader4Size)}:host([level="H5"]){font-size:var(--sapFontHeader5Size)}:host([level="H6"]){font-size:var(--sapFontHeader6Size)}
` };

var __decorate$d = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-title</code> component is used to display titles inside a page.
 * It is a simple, large-sized text with explicit header/title semantics.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Title";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.Title
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-title
 * @public
 */
let Title = class Title extends UI5Element {
    /**
     * Defines the text of the component.
     * This component supports nesting a <code>Link</code> component inside.
     * <br><br>
     * <b>Note:</b> Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
     *
     * @type {Node[]}
     * @slot
     * @name sap.ui.webc.main.Title.prototype.default
     * @public
     */
    get normalizedLevel() {
        return this.level.toLowerCase();
    }
    get h1() {
        return this.normalizedLevel === "h1";
    }
    get h2() {
        return this.normalizedLevel === "h2";
    }
    get h3() {
        return this.normalizedLevel === "h3";
    }
    get h4() {
        return this.normalizedLevel === "h4";
    }
    get h5() {
        return this.normalizedLevel === "h5";
    }
    get h6() {
        return this.normalizedLevel === "h6";
    }
};
__decorate$d([
    property({ type: WrappingType$1, defaultValue: WrappingType$1.None })
], Title.prototype, "wrappingType", void 0);
__decorate$d([
    property({ type: TitleLevel$1, defaultValue: TitleLevel$1.H2 })
], Title.prototype, "level", void 0);
Title = __decorate$d([
    customElement({
        tag: "ui5-title",
        renderer: litRender,
        template: block0$g,
        styles: styleData$k,
    })
], Title);
Title.define();

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const e=Symbol.for(""),l=t=>{if((null==t?void 0:t.r)===e)return null==t?void 0:t._$litStatic$},o=t=>({_$litStatic$:t,r:e}),s=new Map,a=t=>(r,...e)=>{const o=e.length;let i,a;const n=[],u=[];let c,$=0,f=!1;for(;$<o;){for(c=r[$];$<o&&void 0!==(a=e[$],i=l(a));)c+=i+r[++$],f=!0;$!==o&&u.push(a),n.push(c),$++;}if($===o&&n.push(r[o]),f){const t=n.join("$$lit$$");void 0===(r=s.get(t))&&(n.raw=n,s.set(t,r=n)),e=u;}return t(r,...e)},n=a(x),u=a(b);

class LitStatic {
}
LitStatic.html = n;
LitStatic.svg = u;
LitStatic.unsafeStatic = o;
registerFeature("LitStatic", LitStatic);

/**
 * Returns the caret (cursor) position of the specified text field (field).
 * Return value range is 0-field.value.length.
 */
const getCaretPosition = (field) => {
    // Initialize
    let caretPos = 0;
    if (field.selectionStart || field.selectionStart === 0) { // Firefox support
        caretPos = field.selectionDirection === "backward" ? field.selectionStart : field.selectionEnd;
    }
    return caretPos;
};
const setCaretPosition = (field, caretPos) => {
    if (field.selectionStart) {
        field.focus();
        field.setSelectionRange(caretPos, caretPos);
    }
    else {
        field.focus();
    }
};

const name$x = "not-editable";
const pathData$x = "M443 104q5 7 5 12 0 6-5 11L118 453q-4 4-8 4L0 480l22-110q0-5 4-9L352 36q4-4 11-4t11 4zm-121 99l-46-45L52 381l46 46zm87-88l-46-44-64 64 45 45zm71 204l-63 64-65-64-33 32 66 63-66 66 33 32 65-66 63 66 32-32-66-66 66-63z";
const ltr$x = false;
const collection$x = "SAP-icons-v4";
const packageName$x = "@ui5/webcomponents-icons";

registerIcon(name$x, { pathData: pathData$x, ltr: ltr$x, collection: collection$x, packageName: packageName$x });

const name$w = "not-editable";
const pathData$w = "M504 94q7 7 7 18t-7 18L130 505q-9 7-18 7H26q-11 0-18.5-7.5T0 486v-86q0-10 8-18L381 7q9-7 18-7 11 0 18 7zm-55 18l-50-50-50 50 50 50zm-86 86l-50-50L62 400l50 50zm142 270q7 7 7 18t-7.5 18.5T486 512t-18-7l-37-38-38 38q-7 7-18 7t-18.5-7.5T349 486q0-10 8-18l38-37-38-38q-8-8-8-18 0-11 7.5-18.5T375 349q10 0 18 8l38 37 37-37q8-8 18-8 11 0 18.5 7.5T512 375t-7 18l-38 38z";
const ltr$w = false;
const collection$w = "SAP-icons-v5";
const packageName$w = "@ui5/webcomponents-icons";

registerIcon(name$w, { pathData: pathData$w, ltr: ltr$w, collection: collection$w, packageName: packageName$w });

isLegacyThemeFamily() ? pathData$x : pathData$w;

const name$v = "error";
const pathData$v = "M512 256q0 53-20.5 100t-55 81.5-81 54.5-99.5 20-100-20.5-81.5-55T20 355 0 256q0-54 20-100.5t55-81T156.5 20 256 0t99.5 20T437 75t55 81.5 20 99.5zM399 364q6-6 0-12l-86-86q-6-6 0-12l81-81q6-6 0-12l-37-37q-2-2-6-2t-6 2l-83 82q-1 3-6 3-3 0-6-3l-84-83q-1-2-6-2-4 0-6 2l-37 37q-6 6 0 12l83 82q6 6 0 12l-83 82q-2 2-2.5 6t2.5 6l36 37q4 2 6 2 4 0 6-2l85-84q2-2 6-2t6 2l88 88q4 2 6 2t6-2z";
const ltr$v = false;
const accData$b = ICON_ERROR;
const collection$v = "SAP-icons-v4";
const packageName$v = "@ui5/webcomponents-icons";

registerIcon(name$v, { pathData: pathData$v, ltr: ltr$v, accData: accData$b, collection: collection$v, packageName: packageName$v });

const name$u = "error";
const pathData$u = "M256 0q53 0 99.5 20T437 75t55 81.5 20 99.5-20 99.5-55 81.5-81.5 55-99.5 20-99.5-20T75 437t-55-81.5T0 256t20-99.5T75 75t81.5-55T256 0zm45 256l74-73q9-11 9-23 0-13-9.5-22.5T352 128q-12 0-23 9l-73 74-73-74q-10-9-23-9t-22.5 9.5T128 160q0 12 9 23l74 73-74 73q-9 10-9 23t9.5 22.5T160 384t23-9l73-74 73 74q11 9 23 9 13 0 22.5-9.5T384 352t-9-23z";
const ltr$u = false;
const accData$a = ICON_ERROR;
const collection$u = "SAP-icons-v5";
const packageName$u = "@ui5/webcomponents-icons";

registerIcon(name$u, { pathData: pathData$u, ltr: ltr$u, accData: accData$a, collection: collection$u, packageName: packageName$u });

isLegacyThemeFamily() ? pathData$v : pathData$u;

const name$t = "alert";
const pathData$t = "M501 374q5 10 7.5 19.5T512 412v5q0 31-23 47t-50 16H74q-13 0-26-4t-23.5-12-17-20T0 417q0-13 4-22.5t9-20.5L198 38q21-38 61-38 38 0 59 38zM257 127q-13 0-23.5 8T223 161q1 7 2 12 3 25 4.5 48t3.5 61q0 11 7.5 16t16.5 5q22 0 23-21l2-36 9-85q0-18-10.5-26t-23.5-8zm0 299q20 0 31.5-12t11.5-32q0-19-11.5-31T257 339t-31.5 12-11.5 31q0 20 11.5 32t31.5 12z";
const ltr$t = false;
const collection$t = "SAP-icons-v4";
const packageName$t = "@ui5/webcomponents-icons";

registerIcon(name$t, { pathData: pathData$t, ltr: ltr$t, collection: collection$t, packageName: packageName$t });

const name$s = "alert";
const pathData$s = "M505 399q7 13 7 27 0 21-15.5 37.5T456 480H56q-25 0-40.5-16.5T0 426q0-14 7-27L208 59q17-27 48-27 14 0 27 6.5T304 59zM288 176q0-14-9-23t-23-9-23 9-9 23v96q0 14 9 23t23 9 23-9 9-23v-96zm-32 240q14 0 23-9t9-23-9-23-23-9-23 9-9 23 9 23 23 9z";
const ltr$s = false;
const collection$s = "SAP-icons-v5";
const packageName$s = "@ui5/webcomponents-icons";

registerIcon(name$s, { pathData: pathData$s, ltr: ltr$s, collection: collection$s, packageName: packageName$s });

isLegacyThemeFamily() ? pathData$t : pathData$s;

const name$r = "sys-enter-2";
const pathData$r = "M512 256q0 54-20 100.5t-54.5 81T356 492t-100 20q-54 0-100.5-20t-81-55T20 355.5 0 256t20.5-100 55-81.5T157 20t99-20q53 0 100 20t81.5 54.5T492 156t20 100zm-118-87q4-8-1-13l-36-36q-3-4-8-4t-8 5L237 294q-3 1-4 0l-70-52q-4-3-7-3t-4.5 2-2.5 3l-29 41q-6 8 2 14l113 95q2 2 7 2t8-4z";
const ltr$r = true;
const collection$r = "SAP-icons-v4";
const packageName$r = "@ui5/webcomponents-icons";

registerIcon(name$r, { pathData: pathData$r, ltr: ltr$r, collection: collection$r, packageName: packageName$r });

const name$q = "sys-enter-2";
const pathData$q = "M256 0q53 0 100 20t81.5 54.5T492 156t20 100-20 100-54.5 81.5T356 492t-100 20-100-20-81.5-54.5T20 356 0 256t20-100 54.5-81.5T156 20 256 0zm150 183q10-9 10-23 0-13-9.5-22.5T384 128t-22 9L186 308l-68-63q-9-9-22-9t-22.5 9.5T64 268q0 15 10 24l91 83q9 9 21 9 13 0 23-9z";
const ltr$q = true;
const collection$q = "SAP-icons-v5";
const packageName$q = "@ui5/webcomponents-icons";

registerIcon(name$q, { pathData: pathData$q, ltr: ltr$q, collection: collection$q, packageName: packageName$q });

isLegacyThemeFamily() ? pathData$r : pathData$q;

const name$p = "information";
const pathData$p = "M0 256q0-53 20.5-100t55-81.5T157 20t99-20q54 0 100.5 20t81 55 54.5 81.5 20 99.5q0 54-20 100.5t-54.5 81T356 492t-100 20q-54 0-100.5-20t-81-55T20 355.5 0 256zm192 112v33h128v-33h-32V215q0-6-7-6h-88v31h32v128h-33zm34-201q14 11 30 11 17 0 29.5-11.5T298 138q0-19-13-31-12-12-29-12-19 0-30.5 12.5T214 138q0 17 12 29z";
const ltr$p = false;
const collection$p = "SAP-icons-v4";
const packageName$p = "@ui5/webcomponents-icons";

registerIcon(name$p, { pathData: pathData$p, ltr: ltr$p, collection: collection$p, packageName: packageName$p });

const name$o = "information";
const pathData$o = "M256 0q53 0 99.5 20T437 75t55 81.5 20 99.5-20 99.5-55 81.5-81.5 55-99.5 20-99.5-20T75 437t-55-81.5T0 256t20-99.5T75 75t81.5-55T256 0zm0 160q14 0 23-9t9-23-9-23-23-9-23 9-9 23 9 23 23 9zm32 64q0-14-9-23t-23-9-23 9-9 23v160q0 14 9 23t23 9 23-9 9-23V224z";
const ltr$o = false;
const collection$o = "SAP-icons-v5";
const packageName$o = "@ui5/webcomponents-icons";

registerIcon(name$o, { pathData: pathData$o, ltr: ltr$o, collection: collection$o, packageName: packageName$o });

isLegacyThemeFamily() ? pathData$p : pathData$o;

/**
 * Different input types.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.InputType
 */
var InputType;
(function (InputType) {
    /**
     * Defines a one-line text input field:
     * @public
     * @type {Text}
     */
    InputType["Text"] = "Text";
    /**
     * Used for input fields that must contain an e-mail address.
     * @public
     * @type {Email}
     */
    InputType["Email"] = "Email";
    /**
     * Defines a numeric input field.
     * @public
     * @type {Number}
     */
    InputType["Number"] = "Number";
    /**
     * Defines a password field.
     * @public
     * @type {Password}
     */
    InputType["Password"] = "Password";
    /**
     * Used for input fields that should contain a telephone number.
     * @public
     * @type {Tel}
     */
    InputType["Tel"] = "Tel";
    /**
     * Used for input fields that should contain a URL address.
     * @public
     * @type {URL}
     */
    InputType["URL"] = "URL";
})(InputType || (InputType = {}));
var InputType$1 = InputType;

/**
 * @class
 * DOM Element reference or ID.
 * <b>Note:</b> If an ID is passed, it is expected to be part of the same <code>document</code> element as the consuming component.
 *
 * @constructor
 * @extends sap.ui.webc.base.types.DataType
 * @author SAP SE
 * @alias sap.ui.webc.base.types.DOMReference
 * @public
 */
class DOMReference extends DataType {
    static isValid(value) {
        return (typeof value === "string" || value instanceof HTMLElement);
    }
    static propertyToAttribute(propertyValue) {
        if (propertyValue instanceof HTMLElement) {
            return null;
        }
        return propertyValue;
    }
}

const popupUtilsData = getSharedResource("PopupUtilsData", { currentZIndex: 100 });
const getFocusedElement = () => {
    const element = getActiveElement();
    return (element && typeof element.focus === "function") ? element : null;
};
const isFocusedElementWithinNode = (node) => {
    const fe = getFocusedElement();
    if (fe) {
        return isNodeContainedWithin(node, fe);
    }
    return false;
};
const isNodeContainedWithin = (parent, child) => {
    let currentNode = parent;
    if (currentNode.shadowRoot) {
        const children = Array.from(currentNode.shadowRoot.children);
        currentNode = children.find(n => n.localName !== "style");
        if (!currentNode) {
            return false;
        }
    }
    if (currentNode === child) {
        return true;
    }
    const childNodes = currentNode.localName === "slot" ? currentNode.assignedNodes() : currentNode.children;
    if (childNodes) {
        return Array.from(childNodes).some(n => isNodeContainedWithin(n, child));
    }
    return false;
};
const isPointInRect = (x, y, rect) => {
    return x >= rect.left && x <= rect.right
        && y >= rect.top && y <= rect.bottom;
};
const isClickInRect = (e, rect) => {
    let x;
    let y;
    if (e instanceof MouseEvent) {
        x = e.clientX;
        y = e.clientY;
    }
    else {
        const touch = e.touches[0];
        x = touch.clientX;
        y = touch.clientY;
    }
    return isPointInRect(x, y, rect);
};
function instanceOfPopup(object) {
    return "isUI5Element" in object && "_show" in object;
}
const getClosedPopupParent = (el) => {
    const parent = el.parentElement || (el.getRootNode && el.getRootNode().host);
    if (parent && ((instanceOfPopup(parent) || parent === document.documentElement))) {
        return parent;
    }
    return getClosedPopupParent(parent);
};
const getNextZIndex = () => {
    const openUI5Support = getFeature("OpenUI5Support");
    if (openUI5Support && openUI5Support.isOpenUI5Detected()) { // use OpenUI5 for getting z-index values, if loaded
        return openUI5Support.getNextZIndex();
    }
    popupUtilsData.currentZIndex += 2;
    return popupUtilsData.currentZIndex;
};

/**
 * Returns a value clamped between an upper bound 'max' and lower bound 'min'.
 * @param {number} val value
 * @param {number} min lower bound
 * @param {number} max upper bound
 * @returns {number}
 */
const clamp = (val, min, max) => {
    return Math.min(Math.max(val, min), max);
};

const isElementContainingBlock = (el) => {
    const computedStyle = getComputedStyle(el);
    return ["size", "inline-size"].indexOf(computedStyle.containerType) > -1
        || ["transform", "perspective"].indexOf(computedStyle.willChange) > -1
        || ["layout", "paint", "strict", "content"].indexOf(computedStyle.contain) > -1
        || (computedStyle.transform && computedStyle.transform !== "none")
        || (computedStyle.perspective && computedStyle.perspective !== "none")
        || (computedStyle.backdropFilter && computedStyle.backdropFilter !== "none");
};

const getParentElement = (el) => {
    return (el.parentElement ? el.parentNode : el.parentNode.host);
};

const rClickable = /^(?:a|area)$/i;
const rFocusable = /^(?:input|select|textarea|button)$/i;
const isElementClickable = (el) => {
    if (el.disabled) {
        return false;
    }
    const tabIndex = el.getAttribute("tabindex");
    if (tabIndex !== null && tabIndex !== undefined) {
        return parseInt(tabIndex) >= 0;
    }
    return rFocusable.test(el.nodeName)
        || (rClickable.test(el.nodeName)
            && !!el.href);
};

const isFocusTrap = (el) => {
    return el.hasAttribute("data-ui5-focus-trap");
};
const getFirstFocusableElement = async (container, startFromContainer) => {
    if (!container || isElementHidden(container)) {
        return null;
    }
    return findFocusableElement(container, true, startFromContainer);
};
const getLastFocusableElement = async (container, startFromContainer) => {
    if (!container || isElementHidden(container)) {
        return null;
    }
    return findFocusableElement(container, false, startFromContainer);
};
const isElemFocusable = (el) => {
    return el.hasAttribute("data-ui5-focus-redirect") || !isElementHidden(el);
};
const findFocusableElement = async (container, forward, startFromContainer) => {
    let child;
    let assignedElements;
    let currentIndex = -1;
    if (container.shadowRoot) {
        child = forward ? container.shadowRoot.firstChild : container.shadowRoot.lastChild;
    }
    else if (container instanceof HTMLSlotElement && container.assignedNodes()) {
        assignedElements = container.assignedNodes();
        currentIndex = forward ? 0 : assignedElements.length - 1;
        child = assignedElements[currentIndex];
    }
    else if (startFromContainer) {
        child = container;
    }
    else {
        child = forward ? container.firstElementChild : container.lastElementChild;
    }
    let focusableDescendant;
    /* eslint-disable no-await-in-loop */
    while (child) {
        const originalChild = child;
        if (instanceOfUI5Element(child)) {
            child = await child.getFocusDomRefAsync();
        }
        if (!child) {
            return null;
        }
        if (child.nodeType === 1 && isElemFocusable(child) && !isFocusTrap(child)) {
            if (isElementClickable(child)) {
                return (child && typeof child.focus === "function") ? child : null;
            }
            focusableDescendant = await findFocusableElement(child, forward);
            if (focusableDescendant) {
                return (focusableDescendant && typeof focusableDescendant.focus === "function") ? focusableDescendant : null;
            }
        }
        child = forward ? originalChild.nextSibling : originalChild.previousSibling;
        // If the child element is not part of the currently assigned element,
        // we have to check the next/previous element assigned to the slot or continue with the next/previous sibling of the slot,
        // otherwise, the nextSibling/previousSibling is the next element inside the light DOM
        if (assignedElements && !assignedElements[currentIndex].contains(child)) {
            currentIndex = forward ? currentIndex + 1 : currentIndex - 1;
            child = assignedElements[currentIndex];
        }
    }
    /* eslint-enable no-await-in-loop */
    return null;
};

const mediaRanges = new Map();
const DEAFULT_RANGE_SET = new Map();
DEAFULT_RANGE_SET.set("S", [0, 599]);
DEAFULT_RANGE_SET.set("M", [600, 1023]);
DEAFULT_RANGE_SET.set("L", [1024, 1439]);
DEAFULT_RANGE_SET.set("XL", [1440, Infinity]);
/**
 * Enumeration containing the names and settings of predefined screen width media query range sets.
 *
 * @namespace
 * @name MediaRange.RANGESETS
 * @public
 */
var RANGESETS;
(function (RANGESETS) {
    /**
     * A 4-step range set (S-M-L-XL).
     *
     * The ranges of this set are:
     * <ul>
     * <li><code>"S"</code>: For screens smaller than 600 pixels.</li>
     * <li><code>"M"</code>: For screens greater than or equal to 600 pixels and smaller than 1024 pixels.</li>
     * <li><code>"L"</code>: For screens greater than or equal to 1024 pixels and smaller than 1440 pixels.</li>
     * <li><code>"XL"</code>: For screens greater than or equal to 1440 pixels.</li>
     * </ul>
     *
     * @name MediaRange.RANGESETS.RANGE_4STEPS
     * @public
     */
    RANGESETS["RANGE_4STEPS"] = "4Step";
})(RANGESETS || (RANGESETS = {}));
/**
 * Initializes a screen width media query range set.
 *
 * This initialization step makes the range set ready to be used for one of the other functions in namespace <code>MediaRange</code>.
 *
 * A range set can be defined as shown in the following example:
 * <pre>
 * MediaRange.initRangeSet("MyRangeSet", [200, 400], ["Small", "Medium", "Large"]);
 * </pre>
 * This example defines the following named ranges:
 * <ul>
 * <li><code>"Small"</code>: For screens smaller than 200 pixels.</li>
 * <li><code>"Medium"</code>: For screens greater than or equal to 200 pixels and smaller than 400 pixels.</li>
 * <li><code>"Large"</code>: For screens greater than or equal to 400 pixels.</li>
 * </ul>
 *
 * @param {string} name The name of the range set to be initialized.
 * The name must be a valid id and consist only of letters and numeric digits.
 * @param {Range} [range] The given range set.
 * @name MediaRange.initRangeSet
 */
const initRangeSet = (name, range) => {
    mediaRanges.set(name, range);
};
/**
 * Returns information about the current active range of the range set with the given name.
 *
 * If the optional parameter <code>width</code> is given, the active range will be determined for that width,
 * otherwise it is determined for the current window size.
 *
 * @param {string} name The name of the range set. The range set must be initialized beforehand ({@link MediaRange.initRangeSet})
 * @param {number} [width] An optional width, based on which the range should be determined;
 * If <code>width</code> is not provided, the window size will be used.
 * @returns {string} The name of the current active interval of the range set.
 *
 * @name MediaRange.getCurrentRange
 * @function
 * @public
 */
const getCurrentRange = (name, width = window.innerWidth) => {
    let rangeSet = mediaRanges.get(name);
    if (!rangeSet) {
        rangeSet = mediaRanges.get(RANGESETS.RANGE_4STEPS);
    }
    let currentRangeName;
    const effectiveWidth = Math.floor(width);
    rangeSet.forEach((value, key) => {
        if (effectiveWidth >= value[0] && effectiveWidth <= value[1]) {
            currentRangeName = key;
        }
    });
    return currentRangeName || [...rangeSet.keys()][0];
};
/**
 * API for screen width changes.
 *
 * @namespace
 * @name MediaRange
 */
const MediaRange = {
    RANGESETS,
    initRangeSet,
    getCurrentRange,
};
MediaRange.initRangeSet(MediaRange.RANGESETS.RANGE_4STEPS, DEAFULT_RANGE_SET);

/* eslint no-unused-vars: 0 */
function block0$f(context, tags, suffix) { return effectiveHtml `<section style="${styleMap(this.styles.root)}" class="${o$2(this.classes.root)}" role="${l$1(this._role)}" aria-modal="${l$1(this._ariaModal)}" aria-label="${l$1(this._ariaLabel)}" aria-labelledby="${l$1(this._ariaLabelledBy)}" @keydown=${this._onkeydown} @focusout=${this._onfocusout} @mouseup=${this._onmouseup} @mousedown=${this._onmousedown}><span class="first-fe" data-ui5-focus-trap tabindex="0" @focusin=${this.forwardToLast}></span><div style="${styleMap(this.styles.content)}" class="${o$2(this.classes.content)}"  @scroll="${this._scroll}" part="content"><slot></slot></div><span class="last-fe" data-ui5-focus-trap tabindex="0" @focusin=${this.forwardToFirst}></span></section> `; }

/* eslint no-unused-vars: 0 */
function block0$e(context, tags, suffix) { return effectiveHtml `<div class="ui5-block-layer" ?hidden=${this._blockLayerHidden} tabindex="0" style="${styleMap(this.styles.blockLayer)}" @keydown="${this._preventBlockLayerFocus}" @mousedown="${this._preventBlockLayerFocus}"></div>`; }

/**
 * Popup accessible roles.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.PopupAccessibleRole
 */
var PopupAccessibleRole;
(function (PopupAccessibleRole) {
    /**
     * Represents no ARIA role.
     * @public
     * @type {None}
     */
    PopupAccessibleRole["None"] = "None";
    /**
     * Represents the ARIA role "dialog".
     * @public
     * @type {Dialog}
     */
    PopupAccessibleRole["Dialog"] = "Dialog";
    /**
     * Represents the ARIA role "alertdialog".
     * @public
     * @type {AlertDialog}
     */
    PopupAccessibleRole["AlertDialog"] = "AlertDialog";
})(PopupAccessibleRole || (PopupAccessibleRole = {}));
var PopupAccessibleRole$1 = PopupAccessibleRole;

let openedRegistry$1 = [];
const addOpenedPopup = (instance, parentPopovers = []) => {
    if (!openedRegistry$1.some(popup => popup.instance === instance)) {
        openedRegistry$1.push({
            instance,
            parentPopovers,
        });
    }
    _updateTopModalPopup();
    if (openedRegistry$1.length === 1) {
        attachGlobalListener();
    }
};
const removeOpenedPopup = (instance) => {
    openedRegistry$1 = openedRegistry$1.filter(el => {
        return el.instance !== instance;
    });
    _updateTopModalPopup();
    if (!openedRegistry$1.length) {
        detachGlobalListener();
    }
};
const getOpenedPopups = () => {
    return [...openedRegistry$1];
};
const _keydownListener = (event) => {
    if (!openedRegistry$1.length) {
        return;
    }
    if (isEscape(event)) {
        openedRegistry$1[openedRegistry$1.length - 1].instance.close(true);
    }
};
const attachGlobalListener = () => {
    document.addEventListener("keydown", _keydownListener);
};
const detachGlobalListener = () => {
    document.removeEventListener("keydown", _keydownListener);
};
const _updateTopModalPopup = () => {
    let popup;
    let hasModal = false;
    for (let i = openedRegistry$1.length - 1; i >= 0; i--) {
        popup = openedRegistry$1[i].instance;
        if (!hasModal && popup.isModal) {
            popup.isTopModalPopup = true;
            hasModal = true;
        }
        else {
            popup.isTopModalPopup = false;
        }
    }
};

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$w);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$v);
const styleData$j = { packageName: "@ui5/webcomponents", fileName: "themes/Popup.css.ts", content: `:host{min-width:1px;display:none;position:fixed}
` };

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$w);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$v);
const styleData$i = { packageName: "@ui5/webcomponents", fileName: "themes/PopupStaticAreaStyles.css.ts", content: `.ui5-block-layer{display:none;position:fixed;background-color:var(--sapBlockLayer_Background);opacity:.6;inset:-500px;outline:none;pointer-events:all;z-index:-1}.ui5-block-layer:not([hidden]){display:inline-block}
` };

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$w);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$v);
const styleData$h = { packageName: "@ui5/webcomponents", fileName: "themes/PopupGlobal.css.ts", content: `.ui5-popup-scroll-blocker{overflow:hidden}
` };

var __decorate$c = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Popup_1;
const createBlockingStyle = () => {
    if (!hasStyle("data-ui5-popup-scroll-blocker")) {
        createStyle(styleData$h, "data-ui5-popup-scroll-blocker");
    }
};
createBlockingStyle();
const pageScrollingBlockers = new Set();
/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 * Base class for all popup Web Components.
 *
 * If you need to create your own popup-like custom UI5 Web Components, it is highly recommended that you extend
 * at least Popup in order to have consistency with other popups in terms of modal behavior and z-index management.
 *
 * 1. The Popup class handles modality:
 *  - The "isModal" getter can be overridden by derivatives to provide their own conditions when they are modal or not
 *  - Derivatives may call the "blockPageScrolling" and "unblockPageScrolling" static methods to temporarily remove scrollbars on the html element
 *  - Derivatives may call the "open" and "close" methods which handle focus, manage the popup registry and for modal popups, manage the blocking layer
 *
 *  2. Provides blocking layer (relevant for modal popups only):
 *   - It is in the static area
 *   - Controlled by the "open" and "close" methods
 *
 * 3. The Popup class "traps" focus:
 *  - Derivatives may call the "applyInitialFocus" method (usually when opening, to transfer focus inside the popup)
 *
 * 4. The Popup class automatically assigns "z-index"
 *  - Each time a popup is opened, it gets a higher than the previously opened popup z-index
 *
 * 5. The template of this component exposes two inline partials you can override in derivatives:
 *  - beforeContent (upper part of the box, useful for header/title/close button)
 *  - afterContent (lower part, useful for footer/action buttons)
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.Popup
 * @extends sap.ui.webc.base.UI5Element
 * @public
 */
let Popup = Popup_1 = class Popup extends UI5Element {
    constructor() {
        super();
        this._resizeHandler = this._resize.bind(this);
    }
    onBeforeRendering() {
        this._blockLayerHidden = !this.isOpen() || !this.isTopModalPopup;
    }
    onAfterRendering() {
        this._updateMediaRange();
    }
    onEnterDOM() {
        ResizeHandler.register(this, this._resizeHandler);
    }
    onExitDOM() {
        if (this.isOpen()) {
            Popup_1.unblockPageScrolling(this);
            this._removeOpenedPopup();
        }
        ResizeHandler.deregister(this, this._resizeHandler);
    }
    get _displayProp() {
        return "block";
    }
    _resize() {
        this._updateMediaRange();
    }
    /**
     * Prevents the user from interacting with the content under the block layer
     */
    _preventBlockLayerFocus(e) {
        e.preventDefault();
    }
    /**
     * Temporarily removes scrollbars from the html element
     * @protected
     */
    static blockPageScrolling(popup) {
        pageScrollingBlockers.add(popup);
        if (pageScrollingBlockers.size !== 1) {
            return;
        }
        document.documentElement.classList.add("ui5-popup-scroll-blocker");
    }
    /**
     * Restores scrollbars on the html element, if needed
     * @protected
     */
    static unblockPageScrolling(popup) {
        pageScrollingBlockers.delete(popup);
        if (pageScrollingBlockers.size !== 0) {
            return;
        }
        document.documentElement.classList.remove("ui5-popup-scroll-blocker");
    }
    _scroll(e) {
        this.fireEvent("scroll", {
            scrollTop: e.target.scrollTop,
            targetRef: e.target,
        });
    }
    _onkeydown(e) {
        const isTabOutAttempt = e.target === this._root && isTabPrevious(e);
        // if the popup is closed, focus is already moved, so Enter keydown may result in click on the newly focused element
        const isEnterOnClosedPopupChild = isEnter(e) && !this.isOpen();
        if (isTabOutAttempt || isEnterOnClosedPopupChild) {
            e.preventDefault();
        }
    }
    _onfocusout(e) {
        // relatedTarget is the element, which will get focus. If no such element exists, focus the root.
        // This happens after the mouse is released in order to not interrupt text selection.
        if (!e.relatedTarget) {
            this._shouldFocusRoot = true;
        }
    }
    _onmousedown(e) {
        if (!isSafari()) { // Remove when adopting native dialog
            this._root.removeAttribute("tabindex");
        }
        if (this.shadowRoot.contains(e.target)) {
            this._shouldFocusRoot = true;
        }
        else {
            this._shouldFocusRoot = false;
        }
    }
    _onmouseup() {
        if (!isSafari()) { // Remove when adopting native dialog
            this._root.tabIndex = -1;
        }
        if (this._shouldFocusRoot) {
            if (isChrome()) {
                this._root.focus();
            }
            this._shouldFocusRoot = false;
        }
    }
    /**
     * Focus trapping
     * @private
     */
    async forwardToFirst() {
        const firstFocusable = await getFirstFocusableElement(this);
        if (firstFocusable) {
            firstFocusable.focus();
        }
        else {
            this._root.focus();
        }
    }
    /**
     * Focus trapping
     * @private
     */
    async forwardToLast() {
        const lastFocusable = await getLastFocusableElement(this);
        if (lastFocusable) {
            lastFocusable.focus();
        }
        else {
            this._root.focus();
        }
    }
    /**
     * Use this method to focus the element denoted by "initialFocus", if provided, or the first focusable element otherwise.
     * @protected
     */
    async applyInitialFocus() {
        await this.applyFocus();
    }
    /**
     * Focuses the element denoted by <code>initialFocus</code>, if provided,
     * or the first focusable element otherwise.
     * @public
     * @method
     * @name sap.ui.webc.main.Popup#applyFocus
     * @async
     * @returns {Promise} Promise that resolves when the focus is applied
     */
    async applyFocus() {
        await this._waitForDomRef();
        if (this.getRootNode() === this) {
            return;
        }
        let element;
        if (this.initialFocus) {
            element = this.getRootNode().getElementById(this.initialFocus)
                || document.getElementById(this.initialFocus);
        }
        element = element || await getFirstFocusableElement(this) || this._root; // in case of no focusable content focus the root
        if (element) {
            if (element === this._root) {
                element.tabIndex = -1;
            }
            element.focus();
        }
    }
    /**
     * Tells if the component is opened
     * @public
     * @method
     * @name sap.ui.webc.main.Popup#isOpen
     * @returns {boolean}
     */
    isOpen() {
        return this.opened;
    }
    isFocusWithin() {
        return isFocusedElementWithinNode(this._root);
    }
    /**
     * Shows the block layer (for modal popups only) and sets the correct z-index for the purpose of popup stacking
     * @protected
     */
    async _open(preventInitialFocus) {
        const prevented = !this.fireEvent("before-open", {}, true, false);
        if (prevented) {
            return;
        }
        if (this.isModal && !this.shouldHideBackdrop) {
            // create static area item ref for block layer
            this.getStaticAreaItemDomRef();
            this._blockLayerHidden = false;
            Popup_1.blockPageScrolling(this);
        }
        this._zIndex = getNextZIndex();
        this.style.zIndex = this._zIndex?.toString() || "";
        this._focusedElementBeforeOpen = getFocusedElement();
        this._show();
        if (this.getDomRef()) {
            this._updateMediaRange();
        }
        this._addOpenedPopup();
        this.opened = true;
        this.open = true;
        await renderFinished();
        if (!this._disableInitialFocus && !preventInitialFocus) {
            await this.applyInitialFocus();
        }
        this.fireEvent("after-open", {}, false, false);
    }
    _updateMediaRange() {
        this.mediaRange = MediaRange.getCurrentRange(MediaRange.RANGESETS.RANGE_4STEPS, this.getDomRef().offsetWidth);
    }
    /**
     * Adds the popup to the "opened popups registry"
     * @protected
     */
    _addOpenedPopup() {
        addOpenedPopup(this);
    }
    /**
     * Closes the popup.
     * @public
     * @method
     * @name sap.ui.webc.main.Popup#close
     * @returns {void}
     */
    close(escPressed = false, preventRegistryUpdate = false, preventFocusRestore = false) {
        if (!this.opened) {
            return;
        }
        const prevented = !this.fireEvent("before-close", { escPressed }, true, false);
        if (prevented) {
            return;
        }
        if (this.isModal) {
            this._blockLayerHidden = true;
            Popup_1.unblockPageScrolling(this);
        }
        this.hide();
        this.opened = false;
        this.open = false;
        if (!preventRegistryUpdate) {
            this._removeOpenedPopup();
        }
        if (!this.preventFocusRestore && !preventFocusRestore) {
            this.resetFocus();
        }
        this.fireEvent("after-close", {}, false, false);
    }
    /**
     * Removes the popup from the "opened popups registry"
     * @protected
     */
    _removeOpenedPopup() {
        removeOpenedPopup(this);
    }
    /**
     * Returns the focus to the previously focused element
     * @protected
     */
    resetFocus() {
        if (!this._focusedElementBeforeOpen) {
            return;
        }
        this._focusedElementBeforeOpen.focus();
        this._focusedElementBeforeOpen = null;
    }
    /**
     * Sets "block" display to the popup. The property can be overriden by derivatives of Popup.
     * @protected
     */
    _show() {
        this.style.display = this._displayProp;
    }
    /**
     * Sets "none" display to the popup
     * @protected
     */
    hide() {
        this.style.display = "none";
    }
    /**
     * Ensures ariaLabel is never null or empty string
     * @returns {string | undefined}
     * @protected
     */
    get _ariaLabel() {
        return getEffectiveAriaLabelText(this);
    }
    get _root() {
        return this.shadowRoot.querySelector(".ui5-popup-root");
    }
    get _role() {
        return (this.accessibleRole === PopupAccessibleRole$1.None) ? undefined : this.accessibleRole.toLowerCase();
    }
    get _ariaModal() {
        return this.accessibleRole === PopupAccessibleRole$1.None ? undefined : "true";
    }
    get contentDOM() {
        return this.shadowRoot.querySelector(".ui5-popup-content");
    }
    get styles() {
        return {
            root: {},
            content: {},
            blockLayer: {
                "zIndex": this._zIndex ? this._zIndex - 1 : "",
            },
        };
    }
    get classes() {
        return {
            root: {
                "ui5-popup-root": true,
                "ui5-content-native-scrollbars": getEffectiveScrollbarStyle(),
            },
            content: {
                "ui5-popup-content": true,
            },
        };
    }
};
__decorate$c([
    property()
], Popup.prototype, "initialFocus", void 0);
__decorate$c([
    property({ type: Boolean })
], Popup.prototype, "preventFocusRestore", void 0);
__decorate$c([
    property({ type: Boolean })
], Popup.prototype, "open", void 0);
__decorate$c([
    property({ type: Boolean, noAttribute: true })
], Popup.prototype, "opened", void 0);
__decorate$c([
    property({ defaultValue: undefined })
], Popup.prototype, "accessibleName", void 0);
__decorate$c([
    property({ defaultValue: "" })
], Popup.prototype, "accessibleNameRef", void 0);
__decorate$c([
    property({ type: PopupAccessibleRole$1, defaultValue: PopupAccessibleRole$1.Dialog })
], Popup.prototype, "accessibleRole", void 0);
__decorate$c([
    property()
], Popup.prototype, "mediaRange", void 0);
__decorate$c([
    property({ type: Boolean })
], Popup.prototype, "_disableInitialFocus", void 0);
__decorate$c([
    property({ type: Boolean })
], Popup.prototype, "_blockLayerHidden", void 0);
__decorate$c([
    property({ type: Boolean, noAttribute: true })
], Popup.prototype, "isTopModalPopup", void 0);
__decorate$c([
    slot({ type: HTMLElement, "default": true })
], Popup.prototype, "content", void 0);
Popup = Popup_1 = __decorate$c([
    customElement({
        renderer: litRender,
        styles: styleData$j,
        template: block0$f,
        staticAreaTemplate: block0$e,
        staticAreaStyles: styleData$i,
    })
    /**
     * Fired before the component is opened. This event can be cancelled, which will prevent the popup from opening. <b>This event does not bubble.</b>
     *
     * @public
     * @event sap.ui.webc.main.Popup#before-open
     * @allowPreventDefault
     */
    ,
    event("before-open")
    /**
     * Fired after the component is opened. <b>This event does not bubble.</b>
     *
     * @public
     * @event sap.ui.webc.main.Popup#after-open
     */
    ,
    event("after-open")
    /**
     * Fired before the component is closed. This event can be cancelled, which will prevent the popup from closing. <b>This event does not bubble.</b>
     *
     * @public
     * @event sap.ui.webc.main.Popup#before-close
     * @allowPreventDefault
     * @param {boolean} escPressed Indicates that <code>ESC</code> key has triggered the event.
     */
    ,
    event("before-close", {
        escPressed: { type: Boolean },
    })
    /**
     * Fired after the component is closed. <b>This event does not bubble.</b>
     *
     * @public
     * @event sap.ui.webc.main.Popup#after-close
     */
    ,
    event("after-close")
    /**
     * Fired whenever the popup content area is scrolled
     *
     * @private
     * @event sap.ui.webc.main.Popup#scroll
     */
    ,
    event("scroll")
], Popup);
var Popup$1 = Popup;

/**
 * Popover placement types.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.PopoverPlacementType
 */
var PopoverPlacementType;
(function (PopoverPlacementType) {
    /**
     * Popover will be placed at the left side of the reference element.
     * @public
     * @type {Left}
     */
    PopoverPlacementType["Left"] = "Left";
    /**
     * Popover will be placed at the right side of the reference element.
     * @public
     * @type {Right}
     */
    PopoverPlacementType["Right"] = "Right";
    /**
     * Popover will be placed at the top of the reference element.
     * @public
     * @type {Top}
     */
    PopoverPlacementType["Top"] = "Top";
    /**
     * Popover will be placed at the bottom of the reference element.
     * @public
     * @type {Bottom}
     */
    PopoverPlacementType["Bottom"] = "Bottom";
})(PopoverPlacementType || (PopoverPlacementType = {}));
var PopoverPlacementType$1 = PopoverPlacementType;

/**
 * Popover vertical align types.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.PopoverVerticalAlign
 */
var PopoverVerticalAlign;
(function (PopoverVerticalAlign) {
    /**
     *
     * @public
     * @type {Center}
     */
    PopoverVerticalAlign["Center"] = "Center";
    /**
     * Popover will be placed at the top of the reference control.
     * @public
     * @type {Top}
     */
    PopoverVerticalAlign["Top"] = "Top";
    /**
     * Popover will be placed at the bottom of the reference control.
     * @public
     * @type {Bottom}
     */
    PopoverVerticalAlign["Bottom"] = "Bottom";
    /**
     * Popover will be streched
     * @public
     * @type {Stretch}
     */
    PopoverVerticalAlign["Stretch"] = "Stretch";
})(PopoverVerticalAlign || (PopoverVerticalAlign = {}));
var PopoverVerticalAlign$1 = PopoverVerticalAlign;

/**
 * Popover horizontal align types.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.PopoverHorizontalAlign
 */
var PopoverHorizontalAlign;
(function (PopoverHorizontalAlign) {
    /**
     * Popover is centered.
     * @public
     * @type {Center}
     */
    PopoverHorizontalAlign["Center"] = "Center";
    /**
     * Popover is aligned with the left side of the target. When direction is RTL, it is right aligned.
     * @public
     * @type {Left}
     */
    PopoverHorizontalAlign["Left"] = "Left";
    /**
     * Popover is aligned with the right side of the target. When direction is RTL, it is left aligned.
     * @public
     * @type {Right}
     */
    PopoverHorizontalAlign["Right"] = "Right";
    /**
     * Popover is stretched.
     * @public
     * @type {Stretch}
     */
    PopoverHorizontalAlign["Stretch"] = "Stretch";
})(PopoverHorizontalAlign || (PopoverHorizontalAlign = {}));
var PopoverHorizontalAlign$1 = PopoverHorizontalAlign;

let updateInterval;
const intervalTimeout = 300;
const openedRegistry = [];
const repositionPopovers = () => {
    openedRegistry.forEach(popover => {
        popover.instance.reposition();
    });
};
const closePopoversIfLostFocus = () => {
    if (document.activeElement.tagName === "IFRAME") {
        getRegistry().reverse().forEach(popup => popup.instance.close(false, false, true));
    }
};
const runUpdateInterval = () => {
    updateInterval = setInterval(() => {
        repositionPopovers();
        closePopoversIfLostFocus();
    }, intervalTimeout);
};
const stopUpdateInterval = () => {
    clearInterval(updateInterval);
};
const attachGlobalScrollHandler = () => {
    document.addEventListener("scroll", repositionPopovers, { capture: true });
};
const detachGlobalScrollHandler = () => {
    document.removeEventListener("scroll", repositionPopovers, { capture: true });
};
const attachScrollHandler = (popover) => {
    popover && popover.shadowRoot.addEventListener("scroll", repositionPopovers, { capture: true });
};
const detachScrollHandler = (popover) => {
    popover && popover.shadowRoot.removeEventListener("scroll", repositionPopovers, { capture: true });
};
const attachGlobalClickHandler = () => {
    document.addEventListener("mousedown", clickHandler);
};
const detachGlobalClickHandler = () => {
    document.removeEventListener("mousedown", clickHandler);
};
const clickHandler = (event) => {
    const openedPopups = getOpenedPopups();
    if (openedPopups.length === 0) {
        return;
    }
    const isTopPopupPopover = instanceOfPopover(openedPopups[openedPopups.length - 1].instance);
    if (!isTopPopupPopover) {
        return;
    }
    // loop all open popovers
    for (let i = (openedPopups.length - 1); i !== -1; i--) {
        const popup = openedPopups[i].instance;
        // if popup is modal, opener is clicked, popup is dialog skip closing
        if (popup.isModal || popup.isOpenerClicked(event)) {
            return;
        }
        if (isClickInRect(event, popup.getBoundingClientRect())) {
            break;
        }
        popup.close();
    }
};
const addOpenedPopover = (instance) => {
    const parentPopovers = getParentPopoversIfNested(instance);
    addOpenedPopup(instance, parentPopovers);
    openedRegistry.push({
        instance,
        parentPopovers,
    });
    attachScrollHandler(instance);
    if (openedRegistry.length === 1) {
        attachGlobalScrollHandler();
        attachGlobalClickHandler();
        runUpdateInterval();
    }
};
const removeOpenedPopover = (instance) => {
    const popoversToClose = [instance];
    for (let i = 0; i < openedRegistry.length; i++) {
        const indexOfCurrentInstance = openedRegistry[i].parentPopovers.indexOf(instance);
        if (openedRegistry[i].parentPopovers.length > 0 && indexOfCurrentInstance > -1) {
            popoversToClose.push(openedRegistry[i].instance);
        }
    }
    for (let i = popoversToClose.length - 1; i >= 0; i--) {
        for (let j = 0; j < openedRegistry.length; j++) {
            let indexOfItemToRemove = -1;
            if (popoversToClose[i] === openedRegistry[j].instance) {
                indexOfItemToRemove = j;
            }
            if (indexOfItemToRemove >= 0) {
                removeOpenedPopup(openedRegistry[indexOfItemToRemove].instance);
                detachScrollHandler(openedRegistry[indexOfItemToRemove].instance);
                const itemToClose = openedRegistry.splice(indexOfItemToRemove, 1);
                itemToClose[0].instance.close(false, true);
            }
        }
    }
    if (!openedRegistry.length) {
        detachGlobalScrollHandler();
        detachGlobalClickHandler();
        stopUpdateInterval();
    }
};
const getRegistry = () => {
    return openedRegistry;
};
const getParentPopoversIfNested = (instance) => {
    let currentElement = instance.parentNode;
    const parentPopovers = [];
    while (currentElement && currentElement.parentNode) {
        for (let i = 0; i < openedRegistry.length; i++) {
            if (currentElement === openedRegistry[i].instance) {
                parentPopovers.push(currentElement);
            }
        }
        currentElement = currentElement.parentNode;
    }
    return parentPopovers;
};

/* eslint no-unused-vars: 0 */
function block0$d(context, tags, suffix) { return effectiveHtml `<section style="${styleMap(this.styles.root)}" class="${o$2(this.classes.root)}" role="${l$1(this._role)}" aria-modal="${l$1(this._ariaModal)}" aria-label="${l$1(this._ariaLabel)}" aria-labelledby="${l$1(this._ariaLabelledBy)}" @keydown=${this._onkeydown} @focusout=${this._onfocusout} @mouseup=${this._onmouseup} @mousedown=${this._onmousedown}><span class="first-fe" data-ui5-focus-trap tabindex="0" @focusin=${this.forwardToLast}></span><span class="ui5-popover-arrow" style="${styleMap(this.styles.arrow)}"></span>${this._displayHeader ? block1$b.call(this, context, tags, suffix) : undefined}<div style="${styleMap(this.styles.content)}" class="${o$2(this.classes.content)}"  @scroll="${this._scroll}" part="content"><slot></slot></div>${this._displayFooter ? block4$8.call(this, context, tags, suffix) : undefined}<span class="last-fe" data-ui5-focus-trap tabindex="0" @focusin=${this.forwardToFirst}></span></section> `; }
function block1$b(context, tags, suffix) { return effectiveHtml `<header class="ui5-popup-header-root" id="ui5-popup-header" part="header">${this.header.length ? block2$9.call(this, context, tags, suffix) : block3$8.call(this, context, tags, suffix)}</header>`; }
function block2$9(context, tags, suffix) { return effectiveHtml `<slot name="header"></slot>`; }
function block3$8(context, tags, suffix) { return effectiveHtml `<h1 class="ui5-popup-header-text">${l$1(this.headerText)}</h1>`; }
function block4$8(context, tags, suffix) { return effectiveHtml `${this.footer.length ? block5$6.call(this, context, tags, suffix) : undefined}`; }
function block5$6(context, tags, suffix) { return effectiveHtml `<footer class="ui5-popup-footer-root" part="footer"><slot name="footer"></slot></footer>`; }

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$w);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$v);
const styleData$g = { packageName: "@ui5/webcomponents", fileName: "themes/PopupsCommon.css.ts", content: `:host{display:none;position:fixed;background:var(--sapGroup_ContentBackground);border-radius:var(--_ui5-v1-21-0-rc-5_popup_border_radius);min-height:2rem;box-sizing:border-box}.ui5-popup-root{background:inherit;border-radius:inherit;width:100%;height:100%;box-sizing:border-box;display:flex;flex-direction:column;overflow:hidden;outline:none}.ui5-popup-root .ui5-popup-header-root{color:var(--sapPageHeader_TextColor);box-shadow:var(--_ui5-v1-21-0-rc-5_popup_header_shadow);border-bottom:var(--_ui5-v1-21-0-rc-5_popup_header_border)}.ui5-popup-content{color:var(--sapTextColor)}.ui5-popup-footer-root{background:var(--sapPageFooter_Background);border-top:1px solid var(--sapPageFooter_BorderColor);color:var(--sapPageFooter_TextColor)}.ui5-popup-header-root,.ui5-popup-footer-root,:host([header-text]) .ui5-popup-header-text{margin:0;font-size:1rem;font-family:"72override",var(--_ui5-v1-21-0-rc-5_popup_header_font_family);display:flex;justify-content:center;align-items:center}.ui5-popup-header-root .ui5-popup-header-text{font-weight:var(--_ui5-v1-21-0-rc-5_popup_header_font_weight)}.ui5-popup-content{overflow:auto;box-sizing:border-box}:host([header-text]) .ui5-popup-header-text{text-align:center;min-height:var(--_ui5-v1-21-0-rc-5_popup_default_header_height);max-height:var(--_ui5-v1-21-0-rc-5_popup_default_header_height);line-height:var(--_ui5-v1-21-0-rc-5_popup_default_header_height);text-overflow:ellipsis;overflow:hidden;white-space:nowrap;max-width:100%;display:inline-block}:host([header-text]) .ui5-popup-header-root{justify-content:var(--_ui5-v1-21-0-rc-5_popup_header_prop_header_text_alignment)}:host(:not([header-text])) .ui5-popup-header-text{display:none}:host([disable-scrolling]) .ui5-popup-content{overflow:hidden}:host([media-range="S"]) .ui5-popup-content{padding:1rem var(--_ui5-v1-21-0-rc-5_popup_content_padding_s)}:host([media-range="M"]) .ui5-popup-content,:host([media-range="L"]) .ui5-popup-content{padding:1rem var(--_ui5-v1-21-0-rc-5_popup_content_padding_m_l)}:host([media-range="XL"]) .ui5-popup-content{padding:1rem var(--_ui5-v1-21-0-rc-5_popup_content_padding_xl)}.ui5-popup-header-root{background:var(--_ui5-v1-21-0-rc-5_popup_header_background)}:host([media-range="S"]) .ui5-popup-header-root,:host([media-range="S"]) .ui5-popup-footer-root{padding-left:var(--_ui5-v1-21-0-rc-5_popup_header_footer_padding_s);padding-right:var(--_ui5-v1-21-0-rc-5_popup_header_footer_padding_s)}:host([media-range="M"]) .ui5-popup-header-root,:host([media-range="L"]) .ui5-popup-header-root,:host([media-range="M"]) .ui5-popup-footer-root,:host([media-range="L"]) .ui5-popup-footer-root{padding-left:var(--_ui5-v1-21-0-rc-5_popup_header_footer_padding_m_l);padding-right:var(--_ui5-v1-21-0-rc-5_popup_header_footer_padding_m_l)}:host([media-range="XL"]) .ui5-popup-header-root,:host([media-range="XL"]) .ui5-popup-footer-root{padding-left:var(--_ui5-v1-21-0-rc-5_popup_header_footer_padding_xl);padding-right:var(--_ui5-v1-21-0-rc-5_popup_header_footer_padding_xl)}
` };

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$w);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$v);
const styleData$f = { packageName: "@ui5/webcomponents", fileName: "themes/Popover.css.ts", content: `:host{box-shadow:var(--_ui5-v1-21-0-rc-5_popover_box_shadow);background-color:var(--_ui5-v1-21-0-rc-5_popover_background);max-width:calc(100vw - (100vw - 100%) - 2 * var(--_ui5-v1-21-0-rc-5_popup_viewport_margin))}:host([hide-arrow]){box-shadow:var(--_ui5-v1-21-0-rc-5_popover_no_arrow_box_shadow)}:host([opened][actual-placement-type="Top"]){margin-top:var(--_ui5-v1-21-0-rc-5-popover-margin-bottom)}:host([opened][actual-placement-type="Bottom"]){margin-top:var(--_ui5-v1-21-0-rc-5-popover-margin-top)}:host([actual-placement-type="Bottom"]) .ui5-popover-arrow{left:calc(50% - .5625rem);top:-.5rem;height:.5625rem}:host([actual-placement-type="Bottom"]) .ui5-popover-arrow:after{margin:var(--_ui5-v1-21-0-rc-5_popover_upward_arrow_margin)}:host([actual-placement-type="Left"]) .ui5-popover-arrow{top:calc(50% - .5625rem);right:-.5625rem;width:.5625rem}:host([actual-placement-type="Left"]) .ui5-popover-arrow:after{margin:var(--_ui5-v1-21-0-rc-5_popover_right_arrow_margin)}:host([actual-placement-type="Top"]) .ui5-popover-arrow{left:calc(50% - .5625rem);height:.5625rem;top:100%}:host([actual-placement-type="Top"]) .ui5-popover-arrow:after{margin:var(--_ui5-v1-21-0-rc-5_popover_downward_arrow_margin)}:host(:not([actual-placement-type])) .ui5-popover-arrow,:host([actual-placement-type="Right"]) .ui5-popover-arrow{left:-.5625rem;top:calc(50% - .5625rem);width:.5625rem;height:1rem}:host(:not([actual-placement-type])) .ui5-popover-arrow:after,:host([actual-placement-type="Right"]) .ui5-popover-arrow:after{margin:var(--_ui5-v1-21-0-rc-5_popover_left_arrow_margin)}:host([hide-arrow]) .ui5-popover-arrow{display:none}.ui5-popover-root{min-width:6.25rem}.ui5-popover-arrow{pointer-events:none;display:block;width:1rem;height:1rem;position:absolute;overflow:hidden}.ui5-popover-arrow:after{content:"";display:block;width:.7rem;height:.7rem;background-color:var(--_ui5-v1-21-0-rc-5_popover_background);box-shadow:var(--_ui5-v1-21-0-rc-5_popover_box_shadow);transform:rotate(-45deg)}
` };

var __decorate$b = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Popover_1;
const ARROW_SIZE = 8;
/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-popover</code> component displays additional information for an object
 * in a compact way and without leaving the page.
 * The Popover can contain various UI elements, such as fields, tables, images, and charts.
 * It can also include actions in the footer.
 *
 * <h3>Structure</h3>
 *
 * The popover has three main areas:
 * <ul>
 * <li>Header (optional)</li>
 * <li>Content</li>
 * <li>Footer (optional)</li>
 * </ul>
 *
 * <b>Note:</b> The <code>ui5-popover</code> is closed when the user clicks
 * or taps outside the popover
 * or selects an action within the popover. You can prevent this with the
 * <code>modal</code> property.
 *
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-popover</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>header - Used to style the header of the component</li>
 * <li>content - Used to style the content of the component</li>
 * <li>footer - Used to style the footer of the component</li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Popover.js";</code>
 *
 * <b>Note: </b> We recommend placing popup-like components (<code>ui5-dialog</code> and <code>ui5-popover</code>)
 * outside any other components. Preferably, the popup-like components should be placed
 * in an upper level HTML element. Otherwise, in some cases the parent HTML elements can break
 * the position and/or z-index management of the popup-like components.
 *
 * <b>Note:</b> We don't recommend nesting popup-like components (<code>ui5-dialog</code>, <code>ui5-popover</code>).
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.Popover
 * @extends sap.ui.webc.main.Popup
 * @tagname ui5-popover
 * @since 1.0.0-rc.6
 * @public
 */
let Popover = Popover_1 = class Popover extends Popup$1 {
    static get VIEWPORT_MARGIN() {
        return 10; // px
    }
    constructor() {
        super();
    }
    onAfterRendering() {
        super.onAfterRendering();
        if (!this.isOpen() && this.open) {
            let opener;
            if (this.opener instanceof HTMLElement) {
                opener = this.opener;
            }
            else if (typeof this.opener === "string") {
                opener = this.getRootNode().getElementById(this.opener) || document.getElementById(this.opener);
            }
            if (!opener) {
                console.warn("Valid opener id is required."); // eslint-disable-line
                return;
            }
            this.showAt(opener);
        }
        else if (this.isOpen() && !this.open) {
            this.close();
        }
    }
    isOpenerClicked(e) {
        const target = e.target;
        if (target === this._opener) {
            return true;
        }
        const ui5ElementTarget = target;
        if (ui5ElementTarget.getFocusDomRef && ui5ElementTarget.getFocusDomRef() === this._opener) {
            return true;
        }
        return e.composedPath().indexOf(this._opener) > -1;
    }
    /**
     * Shows the popover.
     * @param {HTMLElement} opener the element that the popover is shown at
     * @param {boolean} [preventInitialFocus=false] prevents applying the focus inside the popover
     * @public
     * @async
     * @method
     * @name sap.ui.webc.main.Popover#showAt
     * @async
     * @returns {Promise} Resolved when the popover is open
     */
    async showAt(opener, preventInitialFocus = false) {
        if (!opener || this.opened) {
            return;
        }
        this._opener = opener;
        this._openerRect = opener.getBoundingClientRect();
        await super._open(preventInitialFocus);
    }
    /**
     * Override for the _addOpenedPopup hook, which would otherwise just call addOpenedPopup(this)
     * @private
     */
    _addOpenedPopup() {
        addOpenedPopover(this);
    }
    /**
     * Override for the _removeOpenedPopup hook, which would otherwise just call removeOpenedPopup(this)
     * @private
     */
    _removeOpenedPopup() {
        removeOpenedPopover(this);
    }
    shouldCloseDueToOverflow(placement, openerRect) {
        const threshold = 32;
        const limits = {
            "Right": openerRect.right,
            "Left": openerRect.left,
            "Top": openerRect.top,
            "Bottom": openerRect.bottom,
        };
        const closedPopupParent = getClosedPopupParent(this._opener);
        let overflowsBottom = false;
        let overflowsTop = false;
        if (closedPopupParent.showAt) {
            const contentRect = closedPopupParent.contentDOM.getBoundingClientRect();
            overflowsBottom = openerRect.top > (contentRect.top + contentRect.height);
            overflowsTop = (openerRect.top + openerRect.height) < contentRect.top;
        }
        return (limits[placement] < 0 || (limits[placement] + threshold > closedPopupParent.innerHeight)) || overflowsBottom || overflowsTop;
    }
    shouldCloseDueToNoOpener(openerRect) {
        return openerRect.top === 0
            && openerRect.bottom === 0
            && openerRect.left === 0
            && openerRect.right === 0;
    }
    isOpenerOutsideViewport(openerRect) {
        return openerRect.bottom < 0
            || openerRect.top > window.innerHeight
            || openerRect.right < 0
            || openerRect.left > window.innerWidth;
    }
    /**
     * @override
     */
    _resize() {
        super._resize();
        if (this.opened) {
            this.reposition();
        }
    }
    reposition() {
        this._show();
    }
    _show() {
        if (!this.opened) {
            this._showOutsideViewport();
        }
        const popoverSize = this.getPopoverSize();
        let placement;
        if (popoverSize.width === 0 || popoverSize.height === 0) {
            // size can not be determined properly at this point, popover will be shown with the next reposition
            return;
        }
        if (this.isOpen()) {
            // update opener rect if it was changed during the popover being opened
            this._openerRect = this._opener.getBoundingClientRect();
        }
        if (this.shouldCloseDueToNoOpener(this._openerRect) && this.isFocusWithin() && this._oldPlacement) {
            // reuse the old placement as the opener is not available,
            // but keep the popover open as the focus is within
            placement = this._oldPlacement;
        }
        else {
            placement = this.calcPlacement(this._openerRect, popoverSize);
        }
        if (this._preventRepositionAndClose || this.isOpenerOutsideViewport(this._openerRect)) {
            return this.close();
        }
        this._oldPlacement = placement;
        this.actualPlacementType = placement.placementType;
        let left = clamp(this._left, Popover_1.VIEWPORT_MARGIN, document.documentElement.clientWidth - popoverSize.width - Popover_1.VIEWPORT_MARGIN);
        if (this.actualPlacementType === PopoverPlacementType$1.Right) {
            left = Math.max(left, this._left);
        }
        let top = clamp(this._top, Popover_1.VIEWPORT_MARGIN, document.documentElement.clientHeight - popoverSize.height - Popover_1.VIEWPORT_MARGIN);
        if (this.actualPlacementType === PopoverPlacementType$1.Bottom) {
            top = Math.max(top, this._top);
        }
        this.arrowTranslateX = placement.arrow.x;
        this.arrowTranslateY = placement.arrow.y;
        top = this._adjustForIOSKeyboard(top);
        const containingBlockClientLocation = this._getContainingBlockClientLocation();
        left -= containingBlockClientLocation.left;
        top -= containingBlockClientLocation.top;
        Object.assign(this.style, {
            top: `${top}px`,
            left: `${left}px`,
        });
        if (this.horizontalAlign === PopoverHorizontalAlign$1.Stretch && this._width) {
            this.style.width = this._width;
        }
    }
    /**
     * Adjust the desired top position to compensate for shift of the screen
     * caused by opened keyboard on iOS which affects all elements with position:fixed.
     * @private
     * @param {int} top The target top in px.
     * @returns {int} The adjusted top in px.
     */
    _adjustForIOSKeyboard(top) {
        if (!isIOS()) {
            return top;
        }
        const actualTop = Math.ceil(this.getBoundingClientRect().top);
        return top + (Number.parseInt(this.style.top || "0") - actualTop);
    }
    _getContainingBlockClientLocation() {
        let parentElement = getParentElement(this);
        while (parentElement) {
            if (isElementContainingBlock(parentElement)) {
                return parentElement.getBoundingClientRect();
            }
            parentElement = getParentElement(parentElement);
        }
        return { left: 0, top: 0 };
    }
    getPopoverSize() {
        const rect = this.getBoundingClientRect(), width = rect.width, height = rect.height;
        return { width, height };
    }
    _showOutsideViewport() {
        Object.assign(this.style, {
            display: this._displayProp,
            top: "-10000px",
            left: "-10000px",
        });
    }
    get arrowDOM() {
        return this.shadowRoot.querySelector(".ui5-popover-arrow");
    }
    /**
     * @private
     */
    calcPlacement(targetRect, popoverSize) {
        let left = 0;
        let top = 0;
        const allowTargetOverlap = this.allowTargetOverlap;
        const clientWidth = document.documentElement.clientWidth;
        const clientHeight = document.documentElement.clientHeight;
        let maxHeight = clientHeight;
        let maxWidth = clientWidth;
        const placementType = this.getActualPlacementType(targetRect, popoverSize);
        this._preventRepositionAndClose = this.shouldCloseDueToNoOpener(targetRect) || this.shouldCloseDueToOverflow(placementType, targetRect);
        const isVertical = placementType === PopoverPlacementType$1.Top
            || placementType === PopoverPlacementType$1.Bottom;
        if (this.horizontalAlign === PopoverHorizontalAlign$1.Stretch && isVertical) {
            popoverSize.width = targetRect.width;
            this._width = `${targetRect.width}px`;
        }
        else if (this.verticalAlign === PopoverVerticalAlign$1.Stretch && !isVertical) {
            popoverSize.height = targetRect.height;
        }
        const arrowOffset = this.hideArrow ? 0 : ARROW_SIZE;
        // calc popover positions
        switch (placementType) {
            case PopoverPlacementType$1.Top:
                left = this.getVerticalLeft(targetRect, popoverSize);
                top = Math.max(targetRect.top - popoverSize.height - arrowOffset, 0);
                if (!allowTargetOverlap) {
                    maxHeight = targetRect.top - arrowOffset;
                }
                break;
            case PopoverPlacementType$1.Bottom:
                left = this.getVerticalLeft(targetRect, popoverSize);
                top = targetRect.bottom + arrowOffset;
                if (allowTargetOverlap) {
                    top = Math.max(Math.min(top, clientHeight - popoverSize.height), 0);
                }
                else {
                    maxHeight = clientHeight - targetRect.bottom - arrowOffset;
                }
                break;
            case PopoverPlacementType$1.Left:
                left = Math.max(targetRect.left - popoverSize.width - arrowOffset, 0);
                top = this.getHorizontalTop(targetRect, popoverSize);
                if (!allowTargetOverlap) {
                    maxWidth = targetRect.left - arrowOffset;
                }
                break;
            case PopoverPlacementType$1.Right:
                left = targetRect.left + targetRect.width + arrowOffset;
                top = this.getHorizontalTop(targetRect, popoverSize);
                if (allowTargetOverlap) {
                    left = Math.max(Math.min(left, clientWidth - popoverSize.width), 0);
                }
                else {
                    maxWidth = clientWidth - targetRect.right - arrowOffset;
                }
                break;
        }
        // correct popover positions
        if (isVertical) {
            if (popoverSize.width > clientWidth || left < 0) {
                left = 0;
            }
            else if (left + popoverSize.width > clientWidth) {
                left -= left + popoverSize.width - clientWidth;
            }
        }
        else {
            if (popoverSize.height > clientHeight || top < 0) { // eslint-disable-line
                top = 0;
            }
            else if (top + popoverSize.height > clientHeight) {
                top -= top + popoverSize.height - clientHeight;
            }
        }
        this._maxHeight = Math.round(maxHeight - Popover_1.VIEWPORT_MARGIN);
        this._maxWidth = Math.round(maxWidth - Popover_1.VIEWPORT_MARGIN);
        if (this._left === undefined || Math.abs(this._left - left) > 1.5) {
            this._left = Math.round(left);
        }
        if (this._top === undefined || Math.abs(this._top - top) > 1.5) {
            this._top = Math.round(top);
        }
        const borderRadius = Number.parseInt(window.getComputedStyle(this).getPropertyValue("border-radius"));
        const arrowPos = this.getArrowPosition(targetRect, popoverSize, left, top, isVertical, borderRadius);
        return {
            arrow: arrowPos,
            top: this._top,
            left: this._left,
            placementType,
        };
    }
    /**
     * Calculates the position for the arrow.
     * @private
     * @param targetRect BoundingClientRect of the target element
     * @param {{width: number, height: number}} popoverSize Width and height of the popover
     * @param left Left offset of the popover
     * @param top Top offset of the popover
     * @param isVertical If the popover is positioned vertically to the target element
     * @param {number} borderRadius Value of the border-radius property
     * @returns {{x: number, y: number}} Arrow's coordinates
     */
    getArrowPosition(targetRect, popoverSize, left, top, isVertical, borderRadius) {
        const horizontalAlign = this._actualHorizontalAlign;
        let arrowXCentered = horizontalAlign === PopoverHorizontalAlign$1.Center || horizontalAlign === PopoverHorizontalAlign$1.Stretch;
        if (horizontalAlign === PopoverHorizontalAlign$1.Right && left <= targetRect.left) {
            arrowXCentered = true;
        }
        if (horizontalAlign === PopoverHorizontalAlign$1.Left && left + popoverSize.width >= targetRect.left + targetRect.width) {
            arrowXCentered = true;
        }
        let arrowTranslateX = 0;
        if (isVertical && arrowXCentered) {
            arrowTranslateX = targetRect.left + targetRect.width / 2 - left - popoverSize.width / 2;
        }
        let arrowTranslateY = 0;
        if (!isVertical) {
            arrowTranslateY = targetRect.top + targetRect.height / 2 - top - popoverSize.height / 2;
        }
        // Restricts the arrow's translate value along each dimension,
        // so that the arrow does not clip over the popover's rounded borders.
        const safeRangeForArrowY = popoverSize.height / 2 - borderRadius - ARROW_SIZE / 2;
        arrowTranslateY = clamp(arrowTranslateY, -safeRangeForArrowY, safeRangeForArrowY);
        const safeRangeForArrowX = popoverSize.width / 2 - borderRadius - ARROW_SIZE / 2;
        arrowTranslateX = clamp(arrowTranslateX, -safeRangeForArrowX, safeRangeForArrowX);
        return {
            x: Math.round(arrowTranslateX),
            y: Math.round(arrowTranslateY),
        };
    }
    /**
     * Fallbacks to new placement, prioritizing <code>Left</code> and <code>Right</code> placements.
     * @private
     */
    fallbackPlacement(clientWidth, clientHeight, targetRect, popoverSize) {
        if (targetRect.left > popoverSize.width) {
            return PopoverPlacementType$1.Left;
        }
        if (clientWidth - targetRect.right > targetRect.left) {
            return PopoverPlacementType$1.Right;
        }
        if (clientHeight - targetRect.bottom > popoverSize.height) {
            return PopoverPlacementType$1.Bottom;
        }
        if (clientHeight - targetRect.bottom < targetRect.top) {
            return PopoverPlacementType$1.Top;
        }
    }
    getActualPlacementType(targetRect, popoverSize) {
        const placementType = this.placementType;
        let actualPlacementType = placementType;
        const clientWidth = document.documentElement.clientWidth;
        const clientHeight = document.documentElement.clientHeight;
        switch (placementType) {
            case PopoverPlacementType$1.Top:
                if (targetRect.top < popoverSize.height
                    && targetRect.top < clientHeight - targetRect.bottom) {
                    actualPlacementType = PopoverPlacementType$1.Bottom;
                }
                break;
            case PopoverPlacementType$1.Bottom:
                if (clientHeight - targetRect.bottom < popoverSize.height
                    && clientHeight - targetRect.bottom < targetRect.top) {
                    actualPlacementType = PopoverPlacementType$1.Top;
                }
                break;
            case PopoverPlacementType$1.Left:
                if (targetRect.left < popoverSize.width) {
                    actualPlacementType = this.fallbackPlacement(clientWidth, clientHeight, targetRect, popoverSize) || placementType;
                }
                break;
            case PopoverPlacementType$1.Right:
                if (clientWidth - targetRect.right < popoverSize.width) {
                    actualPlacementType = this.fallbackPlacement(clientWidth, clientHeight, targetRect, popoverSize) || placementType;
                }
                break;
        }
        return actualPlacementType;
    }
    getVerticalLeft(targetRect, popoverSize) {
        const horizontalAlign = this._actualHorizontalAlign;
        let left = 0;
        switch (horizontalAlign) {
            case PopoverHorizontalAlign$1.Center:
            case PopoverHorizontalAlign$1.Stretch:
                left = targetRect.left - (popoverSize.width - targetRect.width) / 2;
                break;
            case PopoverHorizontalAlign$1.Left:
                left = targetRect.left;
                break;
            case PopoverHorizontalAlign$1.Right:
                left = targetRect.right - popoverSize.width;
                break;
        }
        return left;
    }
    getHorizontalTop(targetRect, popoverSize) {
        let top = 0;
        switch (this.verticalAlign) {
            case PopoverVerticalAlign$1.Center:
            case PopoverVerticalAlign$1.Stretch:
                top = targetRect.top - (popoverSize.height - targetRect.height) / 2;
                break;
            case PopoverVerticalAlign$1.Top:
                top = targetRect.top;
                break;
            case PopoverVerticalAlign$1.Bottom:
                top = targetRect.bottom - popoverSize.height;
                break;
        }
        return top;
    }
    get isModal() {
        return this.modal;
    }
    get shouldHideBackdrop() {
        return this.hideBackdrop;
    }
    get _ariaLabelledBy() {
        if (!this._ariaLabel && this._displayHeader) {
            return "ui5-popup-header";
        }
        return undefined;
    }
    get styles() {
        return {
            ...super.styles,
            root: {
                "max-height": this._maxHeight ? `${this._maxHeight}px` : "",
                "max-width": this._maxWidth ? `${this._maxWidth}px` : "",
            },
            arrow: {
                transform: `translate(${this.arrowTranslateX}px, ${this.arrowTranslateY}px)`,
            },
        };
    }
    get classes() {
        const allClasses = super.classes;
        allClasses.root["ui5-popover-root"] = true;
        return allClasses;
    }
    /**
     * Hook for descendants to hide header.
     */
    get _displayHeader() {
        return !!(this.header.length || this.headerText);
    }
    /**
     * Hook for descendants to hide footer.
     */
    get _displayFooter() {
        return true;
    }
    get _actualHorizontalAlign() {
        if (this.effectiveDir === "rtl") {
            if (this.horizontalAlign === PopoverHorizontalAlign$1.Left) {
                return PopoverHorizontalAlign$1.Right;
            }
            if (this.horizontalAlign === PopoverHorizontalAlign$1.Right) {
                return PopoverHorizontalAlign$1.Left;
            }
        }
        return this.horizontalAlign;
    }
};
__decorate$b([
    property()
], Popover.prototype, "headerText", void 0);
__decorate$b([
    property({ type: PopoverPlacementType$1, defaultValue: PopoverPlacementType$1.Right })
], Popover.prototype, "placementType", void 0);
__decorate$b([
    property({ type: PopoverHorizontalAlign$1, defaultValue: PopoverHorizontalAlign$1.Center })
], Popover.prototype, "horizontalAlign", void 0);
__decorate$b([
    property({ type: PopoverVerticalAlign$1, defaultValue: PopoverVerticalAlign$1.Center })
], Popover.prototype, "verticalAlign", void 0);
__decorate$b([
    property({ type: Boolean })
], Popover.prototype, "modal", void 0);
__decorate$b([
    property({ type: Boolean })
], Popover.prototype, "hideBackdrop", void 0);
__decorate$b([
    property({ type: Boolean })
], Popover.prototype, "hideArrow", void 0);
__decorate$b([
    property({ type: Boolean })
], Popover.prototype, "allowTargetOverlap", void 0);
__decorate$b([
    property({ validator: DOMReference })
], Popover.prototype, "opener", void 0);
__decorate$b([
    property({ type: Boolean })
], Popover.prototype, "disableScrolling", void 0);
__decorate$b([
    property({ validator: Integer, defaultValue: 0, noAttribute: true })
], Popover.prototype, "arrowTranslateX", void 0);
__decorate$b([
    property({ validator: Integer, defaultValue: 0, noAttribute: true })
], Popover.prototype, "arrowTranslateY", void 0);
__decorate$b([
    property({ type: PopoverPlacementType$1, defaultValue: PopoverPlacementType$1.Right })
], Popover.prototype, "actualPlacementType", void 0);
__decorate$b([
    property({ validator: Integer, noAttribute: true })
], Popover.prototype, "_maxHeight", void 0);
__decorate$b([
    property({ validator: Integer, noAttribute: true })
], Popover.prototype, "_maxWidth", void 0);
__decorate$b([
    slot({ type: HTMLElement })
], Popover.prototype, "header", void 0);
__decorate$b([
    slot({ type: HTMLElement })
], Popover.prototype, "footer", void 0);
Popover = Popover_1 = __decorate$b([
    customElement({
        tag: "ui5-popover",
        styles: [
            styleData$o,
            styleData$g,
            styleData$f,
        ],
        template: block0$d,
    })
], Popover);
const instanceOfPopover = (object) => {
    return "showAt" in object;
};
Popover.define();
var Popover$1 = Popover;

/* eslint no-unused-vars: 0 */
function block0$c(context, tags, suffix) { return effectiveHtml `<div class="ui5-input-root ui5-input-focusable-element" @focusin="${this._onfocusin}" @focusout="${this._onfocusout}"><div class="ui5-input-content"><input id="${l$1(this._id)}-inner" class="ui5-input-inner" style="${styleMap(this.styles.innerInput)}" type="${l$1(this.inputType)}" inner-input ?inner-input-with-icon="${this.icon.length}" ?disabled="${this.disabled}" ?readonly="${this._readonly}" .value="${l$1(this._innerValue)}" placeholder="${l$1(this._placeholder)}" maxlength="${l$1(this.maxlength)}" role="${l$1(this.accInfo.input.role)}" aria-controls="${l$1(this.accInfo.input.ariaControls)}" aria-invalid="${l$1(this.accInfo.input.ariaInvalid)}" aria-haspopup="${l$1(this.accInfo.input.ariaHasPopup)}" aria-describedby="${l$1(this.accInfo.input.ariaDescribedBy)}" aria-roledescription="${l$1(this.accInfo.input.ariaRoledescription)}" aria-autocomplete="${l$1(this.accInfo.input.ariaAutoComplete)}" aria-expanded="${l$1(this.accInfo.input.ariaExpanded)}" aria-label="${l$1(this.accInfo.input.ariaLabel)}" aria-required="${l$1(this.required)}" @input="${this._handleInput}" @change="${this._handleChange}" @keydown="${this._onkeydown}" @keyup="${this._onkeyup}" @click=${this._click} @focusin=${this.innerFocusIn} data-sap-focus-ref step="${l$1(this.nativeInputAttributes.step)}" min="${l$1(this.nativeInputAttributes.min)}" max="${l$1(this.nativeInputAttributes.max)}" />${this.effectiveShowClearIcon ? block1$a.call(this, context, tags, suffix) : undefined}${this.icon.length ? block2$8.call(this, context, tags, suffix) : undefined}<div class="ui5-input-value-state-icon">${o$1(this._valueStateInputIcon)}</div>${this.showSuggestions ? block3$7.call(this, context, tags, suffix) : undefined}${this.accInfo.input.ariaDescription ? block4$7.call(this, context, tags, suffix) : undefined}${this.hasValueState ? block5$5.call(this, context, tags, suffix) : undefined}</div><slot name="formSupport"></slot></div>`; }
function block1$a(context, tags, suffix) { return suffix ? effectiveHtml `<div @click=${this._clear} @mousedown=${this._iconMouseDown} class="ui5-input-clear-icon-wrapper" input-icon tabindex="-1"><${scopeTag("ui5-icon", tags, suffix)} tabindex="-1" class="ui5-input-clear-icon" name="decline" accessible-name="${l$1(this.clearIconAccessibleName)}"></${scopeTag("ui5-icon", tags, suffix)}></div>` : effectiveHtml `<div @click=${this._clear} @mousedown=${this._iconMouseDown} class="ui5-input-clear-icon-wrapper" input-icon tabindex="-1"><ui5-icon tabindex="-1" class="ui5-input-clear-icon" name="decline" accessible-name="${l$1(this.clearIconAccessibleName)}"></ui5-icon></div>`; }
function block2$8(context, tags, suffix) { return effectiveHtml `<div class="ui5-input-icon-root"><slot name="icon"></slot></div>`; }
function block3$7(context, tags, suffix) { return effectiveHtml `<span id="${l$1(this._id)}-suggestionsText" class="ui5-hidden-text">${l$1(this.suggestionsText)}</span><span id="${l$1(this._id)}-selectionText" class="ui5-hidden-text" aria-live="polite" role="status"></span><span id="${l$1(this._id)}-suggestionsCount" class="ui5-hidden-text" aria-live="polite">${l$1(this.availableSuggestionsCount)}</span>`; }
function block4$7(context, tags, suffix) { return effectiveHtml `<span id="${l$1(this._id)}-descr" class="ui5-hidden-text">${l$1(this.accInfo.input.ariaDescription)}</span>`; }
function block5$5(context, tags, suffix) { return effectiveHtml `<span id="${l$1(this._id)}-valueStateDesc" class="ui5-hidden-text">${l$1(this.ariaValueStateHiddenText)}</span>`; }

/* eslint no-unused-vars: 0 */
function block0$b(context, tags, suffix) { return effectiveHtml `${this.showSuggestions ? block1$9.call(this, context, tags, suffix) : undefined}${this.hasValueStateMessage ? block17$2.call(this, context, tags, suffix) : undefined} `; }
function block1$9(context, tags, suffix) { return suffix ? effectiveHtml `<${scopeTag("ui5-responsive-popover", tags, suffix)} class="${o$2(this.classes.popover)}" hide-arrow _disable-initial-focus placement-type="Bottom" horizontal-align="Left" style="${styleMap(this.styles.suggestionsPopover)}" @ui5-after-open="${l$1(this._afterOpenPopover)}" @ui5-after-close="${l$1(this._afterClosePopover)}" @ui5-scroll="${l$1(this._scroll)}">${this._isPhone ? block2$7.call(this, context, tags, suffix) : undefined}${!this._isPhone ? block7$3.call(this, context, tags, suffix) : undefined}<${scopeTag("ui5-list", tags, suffix)} separators="${l$1(this.suggestionSeparators)}" @mousedown="${this.onItemMouseDown}" mode="SingleSelect">${c(this.suggestionObjects, (item, index) => item._id || index, (item, index) => block12$2.call(this, context, tags, suffix, item, index))}</${scopeTag("ui5-list", tags, suffix)}>${this._isPhone ? block16$2.call(this, context, tags, suffix) : undefined}</${scopeTag("ui5-responsive-popover", tags, suffix)}>` : effectiveHtml `<ui5-responsive-popover class="${o$2(this.classes.popover)}" hide-arrow _disable-initial-focus placement-type="Bottom" horizontal-align="Left" style="${styleMap(this.styles.suggestionsPopover)}" @ui5-after-open="${l$1(this._afterOpenPopover)}" @ui5-after-close="${l$1(this._afterClosePopover)}" @ui5-scroll="${l$1(this._scroll)}">${this._isPhone ? block2$7.call(this, context, tags, suffix) : undefined}${!this._isPhone ? block7$3.call(this, context, tags, suffix) : undefined}<ui5-list separators="${l$1(this.suggestionSeparators)}" @mousedown="${this.onItemMouseDown}" mode="SingleSelect">${c(this.suggestionObjects, (item, index) => item._id || index, (item, index) => block12$2.call(this, context, tags, suffix, item, index))}</ui5-list>${this._isPhone ? block16$2.call(this, context, tags, suffix) : undefined}</ui5-responsive-popover>`; }
function block2$7(context, tags, suffix) { return suffix ? effectiveHtml `<div slot="header" class="ui5-responsive-popover-header"><div class="row"><span>${l$1(this._headerTitleText)}</span><${scopeTag("ui5-button", tags, suffix)} class="ui5-responsive-popover-close-btn" icon="decline" design="Transparent" @click="${this._closeRespPopover}"></${scopeTag("ui5-button", tags, suffix)}></div><div class="row"><div class="input-root-phone native-input-wrapper"><${scopeTag("ui5-input", tags, suffix)} class="ui5-input-inner-phone" type="${l$1(this.inputType)}" .value="${l$1(this.value)}" ?show-clear-icon=${this.showClearIcon} placeholder="${l$1(this.placeholder)}" @ui5-input="${l$1(this._handleInput)}" @ui5-change="${l$1(this._handleChange)}"></${scopeTag("ui5-input", tags, suffix)}></div></div></div>${this.hasValueStateMessage ? block3$6.call(this, context, tags, suffix) : undefined}` : effectiveHtml `<div slot="header" class="ui5-responsive-popover-header"><div class="row"><span>${l$1(this._headerTitleText)}</span><ui5-button class="ui5-responsive-popover-close-btn" icon="decline" design="Transparent" @click="${this._closeRespPopover}"></ui5-button></div><div class="row"><div class="input-root-phone native-input-wrapper"><ui5-input class="ui5-input-inner-phone" type="${l$1(this.inputType)}" .value="${l$1(this.value)}" ?show-clear-icon=${this.showClearIcon} placeholder="${l$1(this.placeholder)}" @ui5-input="${l$1(this._handleInput)}" @ui5-change="${l$1(this._handleChange)}"></ui5-input></div></div></div>${this.hasValueStateMessage ? block3$6.call(this, context, tags, suffix) : undefined}`; }
function block3$6(context, tags, suffix) { return suffix ? effectiveHtml `<div class="${o$2(this.classes.popoverValueState)}" style="${styleMap(this.styles.suggestionPopoverHeader)}"><${scopeTag("ui5-icon", tags, suffix)} class="ui5-input-value-state-message-icon" name="${l$1(this._valueStateMessageInputIcon)}"></${scopeTag("ui5-icon", tags, suffix)}>${this.shouldDisplayDefaultValueStateMessage ? block4$6.call(this, context, tags, suffix) : block5$4.call(this, context, tags, suffix)}</div>` : effectiveHtml `<div class="${o$2(this.classes.popoverValueState)}" style="${styleMap(this.styles.suggestionPopoverHeader)}"><ui5-icon class="ui5-input-value-state-message-icon" name="${l$1(this._valueStateMessageInputIcon)}"></ui5-icon>${this.shouldDisplayDefaultValueStateMessage ? block4$6.call(this, context, tags, suffix) : block5$4.call(this, context, tags, suffix)}</div>`; }
function block4$6(context, tags, suffix) { return effectiveHtml `${l$1(this.valueStateText)}`; }
function block5$4(context, tags, suffix) { return effectiveHtml `${c(this.valueStateMessageText, (item, index) => item._id || index, (item, index) => block6$3.call(this, context, tags, suffix, item, index))}`; }
function block6$3(context, tags, suffix, item, index) { return effectiveHtml `${l$1(item)}`; }
function block7$3(context, tags, suffix) { return effectiveHtml `${this.hasValueStateMessage ? block8$3.call(this, context, tags, suffix) : undefined}`; }
function block8$3(context, tags, suffix) { return suffix ? effectiveHtml `<div slot="header" ?focused=${this._isValueStateFocused} class="ui5-responsive-popover-header ${o$2(this.classes.popoverValueState)}" style=${styleMap(this.styles.suggestionPopoverHeader)}><${scopeTag("ui5-icon", tags, suffix)} class="ui5-input-value-state-message-icon" name="${l$1(this._valueStateMessageInputIcon)}"></${scopeTag("ui5-icon", tags, suffix)}>${this.shouldDisplayDefaultValueStateMessage ? block9$3.call(this, context, tags, suffix) : block10$3.call(this, context, tags, suffix)}</div>` : effectiveHtml `<div slot="header" ?focused=${this._isValueStateFocused} class="ui5-responsive-popover-header ${o$2(this.classes.popoverValueState)}" style=${styleMap(this.styles.suggestionPopoverHeader)}><ui5-icon class="ui5-input-value-state-message-icon" name="${l$1(this._valueStateMessageInputIcon)}"></ui5-icon>${this.shouldDisplayDefaultValueStateMessage ? block9$3.call(this, context, tags, suffix) : block10$3.call(this, context, tags, suffix)}</div>`; }
function block9$3(context, tags, suffix) { return effectiveHtml `${l$1(this.valueStateText)}`; }
function block10$3(context, tags, suffix) { return effectiveHtml `${c(this.valueStateMessageText, (item, index) => item._id || index, (item, index) => block11$3.call(this, context, tags, suffix, item, index))}`; }
function block11$3(context, tags, suffix, item, index) { return effectiveHtml `${l$1(item)}`; }
function block12$2(context, tags, suffix, item, index) { return effectiveHtml `${item.groupItem ? block13$2.call(this, context, tags, suffix, item, index) : block14$2.call(this, context, tags, suffix, item, index)}`; }
function block13$2(context, tags, suffix, item, index) { return suffix ? effectiveHtml `<${scopeTag("ui5-li-groupheader", tags, suffix)} data-ui5-key="${l$1(item.key)}">${o$1(item.text)}</${scopeTag("ui5-li-groupheader", tags, suffix)}>` : effectiveHtml `<ui5-li-groupheader data-ui5-key="${l$1(item.key)}">${o$1(item.text)}</ui5-li-groupheader>`; }
function block14$2(context, tags, suffix, item, index) { return suffix ? effectiveHtml `<${scopeTag("ui5-li-suggestion-item", tags, suffix)} wrapping-type="Normal" image="${l$1(item.image)}" icon="${l$1(item.icon)}" additional-text="${l$1(item.additionalText)}" type="${l$1(item.type)}" additional-text-state="${l$1(item.additionalTextState)}" data-ui5-key="${l$1(item.key)}">${o$1(item.text)}${item.description ? block15$2.call(this, context, tags, suffix, item, index) : undefined}</${scopeTag("ui5-li-suggestion-item", tags, suffix)}>` : effectiveHtml `<ui5-li-suggestion-item wrapping-type="Normal" image="${l$1(item.image)}" icon="${l$1(item.icon)}" additional-text="${l$1(item.additionalText)}" type="${l$1(item.type)}" additional-text-state="${l$1(item.additionalTextState)}" data-ui5-key="${l$1(item.key)}">${o$1(item.text)}${item.description ? block15$2.call(this, context, tags, suffix, item, index) : undefined}</ui5-li-suggestion-item>`; }
function block15$2(context, tags, suffix, item, index) { return effectiveHtml `<span slot="richDescription">${o$1(item.description)}</span>`; }
function block16$2(context, tags, suffix) { return suffix ? effectiveHtml `<div slot="footer" class="ui5-responsive-popover-footer"><${scopeTag("ui5-button", tags, suffix)} design="Transparent" @click="${this._closeRespPopover}">OK</${scopeTag("ui5-button", tags, suffix)}></div>` : effectiveHtml `<div slot="footer" class="ui5-responsive-popover-footer"><ui5-button design="Transparent" @click="${this._closeRespPopover}">OK</ui5-button></div>`; }
function block17$2(context, tags, suffix) { return suffix ? effectiveHtml `<${scopeTag("ui5-popover", tags, suffix)} skip-registry-update _disable-initial-focus prevent-focus-restore hide-arrow class="ui5-valuestatemessage-popover" placement-type="Bottom" horizontal-align="${l$1(this._valueStatePopoverHorizontalAlign)}"><div slot="header" class="${o$2(this.classes.popoverValueState)}" style="${styleMap(this.styles.popoverHeader)}"><${scopeTag("ui5-icon", tags, suffix)} class="ui5-input-value-state-message-icon" name="${l$1(this._valueStateMessageInputIcon)}"></${scopeTag("ui5-icon", tags, suffix)}>${this.shouldDisplayDefaultValueStateMessage ? block18$2.call(this, context, tags, suffix) : block19$2.call(this, context, tags, suffix)}</div></${scopeTag("ui5-popover", tags, suffix)}>` : effectiveHtml `<ui5-popover skip-registry-update _disable-initial-focus prevent-focus-restore hide-arrow class="ui5-valuestatemessage-popover" placement-type="Bottom" horizontal-align="${l$1(this._valueStatePopoverHorizontalAlign)}"><div slot="header" class="${o$2(this.classes.popoverValueState)}" style="${styleMap(this.styles.popoverHeader)}"><ui5-icon class="ui5-input-value-state-message-icon" name="${l$1(this._valueStateMessageInputIcon)}"></ui5-icon>${this.shouldDisplayDefaultValueStateMessage ? block18$2.call(this, context, tags, suffix) : block19$2.call(this, context, tags, suffix)}</div></ui5-popover>`; }
function block18$2(context, tags, suffix) { return effectiveHtml `${l$1(this.valueStateText)}`; }
function block19$2(context, tags, suffix) { return effectiveHtml `${c(this.valueStateMessageText, (item, index) => item._id || index, (item, index) => block20$2.call(this, context, tags, suffix, item, index))}`; }
function block20$2(context, tags, suffix, item, index) { return effectiveHtml `${l$1(item)}`; }

const StartsWith = (value, items, propName) => items.filter(item => item[propName].toLowerCase().startsWith(value.toLowerCase()));

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$w);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$v);
const styleData$e = { packageName: "@ui5/webcomponents", fileName: "themes/Input.css.ts", content: `:host{vertical-align:middle}.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}[input-icon]{color:var(--_ui5-v1-21-0-rc-5_input_icon_color);cursor:pointer;outline:none;padding:var(--_ui5-v1-21-0-rc-5_input_icon_padding);border-inline-start:var(--_ui5-v1-21-0-rc-5_input_icon_border);min-width:1rem;min-height:1rem;border-radius:var(--_ui5-v1-21-0-rc-5_input_icon_border_radius)}[input-icon][pressed]{background:var(--_ui5-v1-21-0-rc-5_input_icon_pressed_bg);box-shadow:var(--_ui5-v1-21-0-rc-5_input_icon_box_shadow);border-inline-start:var(--_ui5-v1-21-0-rc-5_select_hover_icon_left_border);color:var(--_ui5-v1-21-0-rc-5_input_icon_pressed_color)}[input-icon]:active{background-color:var(--sapButton_Active_Background);box-shadow:var(--_ui5-v1-21-0-rc-5_input_icon_box_shadow);border-inline-start:var(--_ui5-v1-21-0-rc-5_select_hover_icon_left_border);color:var(--_ui5-v1-21-0-rc-5_input_icon_pressed_color)}[input-icon]:not([pressed]):not(:active):hover{background:var(--_ui5-v1-21-0-rc-5_input_icon_hover_bg);box-shadow:var(--_ui5-v1-21-0-rc-5_input_icon_box_shadow)}[input-icon]:hover{border-inline-start:var(--_ui5-v1-21-0-rc-5_select_hover_icon_left_border);box-shadow:var(--_ui5-v1-21-0-rc-5_input_icon_box_shadow)}:host(:not([hidden])){display:inline-block}:host{width:var(--_ui5-v1-21-0-rc-5_input_width);min-width:calc(var(--_ui5-v1-21-0-rc-5_input_min_width) + (var(--_ui5-v1-21-0-rc-5-input-icons-count)*var(--_ui5-v1-21-0-rc-5_input_icon_width)));margin:var(--_ui5-v1-21-0-rc-5_input_margin_top_bottom) 0;height:var(--_ui5-v1-21-0-rc-5_input_height);color:var(--sapField_TextColor);font-size:var(--sapFontSize);font-family:"72override",var(--sapFontFamily);font-style:normal;border:var(--_ui5-v1-21-0-rc-5-input-border);border-radius:var(--_ui5-v1-21-0-rc-5_input_border_radius);box-sizing:border-box;text-align:start;transition:var(--_ui5-v1-21-0-rc-5_input_transition);background:var(--sapField_BackgroundStyle);background-color:var(--_ui5-v1-21-0-rc-5_input_background_color)}:host(:not([readonly])),:host([readonly][disabled]){box-shadow:var(--sapField_Shadow)}:host([focused]:not([opened])){border-color:var(--_ui5-v1-21-0-rc-5_input_focused_border_color);background-color:var(--sapField_Focus_Background)}.ui5-input-focusable-element{position:relative}:host([focused]:not([opened])) .ui5-input-focusable-element:after{content:var(--ui5-v1-21-0-rc-5_input_focus_pseudo_element_content);position:absolute;pointer-events:none;z-index:2;border:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--_ui5-v1-21-0-rc-5_input_focus_outline_color);border-radius:var(--_ui5-v1-21-0-rc-5_input_focus_border_radius);top:var(--_ui5-v1-21-0-rc-5_input_focus_offset);bottom:var(--_ui5-v1-21-0-rc-5_input_focus_offset);left:var(--_ui5-v1-21-0-rc-5_input_focus_offset);right:var(--_ui5-v1-21-0-rc-5_input_focus_offset)}:host([focused][readonly]:not([opened])) .ui5-input-focusable-element:after{top:var(--_ui5-v1-21-0-rc-5_input_readonly_focus_offset);bottom:var(--_ui5-v1-21-0-rc-5_input_readonly_focus_offset);left:var(--_ui5-v1-21-0-rc-5_input_readonly_focus_offset);right:var(--_ui5-v1-21-0-rc-5_input_readonly_focus_offset);border-radius:var(--_ui5-v1-21-0-rc-5_input_readonly_focus_border_radius)}.ui5-input-root:before{content:"";position:absolute;width:calc(100% - 2px);left:1px;bottom:-2px;border-bottom-left-radius:8px;border-bottom-right-radius:8px;height:var(--_ui5-v1-21-0-rc-5_input_bottom_border_height);transition:var(--_ui5-v1-21-0-rc-5_input_transition);background-color:var(--_ui5-v1-21-0-rc-5_input_bottom_border_color)}.ui5-input-root{width:100%;height:100%;position:relative;background:transparent;display:inline-block;outline:none;box-sizing:border-box;color:inherit;transition:border-color .2s ease-in-out;border-radius:var(--_ui5-v1-21-0-rc-5_input_border_radius);overflow:hidden}:host([disabled]){opacity:var(--_ui5-v1-21-0-rc-5_input_disabled_opacity);cursor:default;pointer-events:none;background-color:var(--_ui5-v1-21-0-rc-5-input_disabled_background);border-color:var(--_ui5-v1-21-0-rc-5_input_disabled_border_color)}:host([disabled]) .ui5-input-root:before,:host([readonly]) .ui5-input-root:before{content:none}[inner-input]{background:transparent;color:inherit;border:none;font-style:inherit;-webkit-appearance:none;-moz-appearance:textfield;padding:var(--_ui5-v1-21-0-rc-5_input_inner_padding);box-sizing:border-box;min-width:var(--_ui5-v1-21-0-rc-5_input_min_width);width:100%;text-overflow:ellipsis;flex:1;outline:none;font-size:inherit;font-family:inherit;line-height:inherit;letter-spacing:inherit;word-spacing:inherit;text-align:inherit}[inner-input][inner-input-with-icon]{padding:var(--_ui5-v1-21-0-rc-5_input_inner_padding_with_icon)}.ui5-input-value-state-icon{height:100%;display:var(--_ui5-v1-21-0-rc-5-input-value-state-icon-display);align-items:center}.ui5-input-value-state-icon>svg{margin-right:8px}[inner-input]::selection{background:var(--sapSelectedColor);color:var(--sapContent_ContrastTextColor)}:host([disabled]) [inner-input]::-webkit-input-placeholder{visibility:hidden}:host([readonly]) [inner-input]::-webkit-input-placeholder{visibility:hidden}:host([disabled]) [inner-input]::-moz-placeholder{visibility:hidden}:host([readonly]) [inner-input]::-moz-placeholder{visibility:hidden}[inner-input]::-webkit-input-placeholder{font-weight:400;font-style:var(--_ui5-v1-21-0-rc-5_input_placeholder_style);color:var(--_ui5-v1-21-0-rc-5_input_placeholder_color);padding-right:.125rem}[inner-input]::-moz-placeholder{font-weight:400;font-style:var(--_ui5-v1-21-0-rc-5_input_placeholder_style);color:var(--_ui5-v1-21-0-rc-5_input_placeholder_color);padding-right:.125rem}:host([value-state="Error"]) [inner-input]::-webkit-input-placeholder{color:var(--_ui5-v1-21-0-rc-5-input_error_placeholder_color);font-weight:var(--_ui5-v1-21-0-rc-5_input_value_state_error_warning_placeholder_font_weight)}:host([value-state="Error"]) [inner-input]::-moz-placeholder{color:var(--_ui5-v1-21-0-rc-5-input_error_placeholder_color);font-weight:var(--_ui5-v1-21-0-rc-5_input_value_state_error_warning_placeholder_font_weight)}:host([value-state="Warning"]) [inner-input]::-webkit-input-placeholder{font-weight:var(--_ui5-v1-21-0-rc-5_input_value_state_error_warning_placeholder_font_weight)}:host([value-state="Warning"]) [inner-input]::-moz-placeholder{font-weight:var(--_ui5-v1-21-0-rc-5_input_value_state_error_warning_placeholder_font_weight)}:host([value-state="Success"]) [inner-input]::-webkit-input-placeholder{color:var(--_ui5-v1-21-0-rc-5_input_placeholder_color)}:host([value-state="Success"]) [inner-input]::-moz-placeholder{color:var(--_ui5-v1-21-0-rc-5_input_placeholder_color)}:host([value-state="Information"]) [inner-input]::-webkit-input-placeholder{color:var(--_ui5-v1-21-0-rc-5_input_placeholder_color)}:host([value-state="Information"]) [inner-input]::-moz-placeholder{color:var(--_ui5-v1-21-0-rc-5_input_placeholder_color)}.ui5-input-content{height:100%;box-sizing:border-box;display:flex;flex-direction:row;justify-content:flex-end;overflow:hidden;outline:none;background:transparent;color:inherit;border-radius:var(--_ui5-v1-21-0-rc-5_input_border_radius)}:host([readonly]:not([disabled])){border-color:var(--_ui5-v1-21-0-rc-5_input_readonly_border_color);background:var(--sapField_ReadOnly_BackgroundStyle);background-color:var(--_ui5-v1-21-0-rc-5_input_readonly_background)}:host([value-state="None"]:not([readonly]):hover),:host(:not([value-state]):not([readonly]):hover){border:var(--_ui5-v1-21-0-rc-5_input_hover_border);border-color:var(--_ui5-v1-21-0-rc-5_input_focused_border_color);box-shadow:var(--sapField_Hover_Shadow);background:var(--sapField_Hover_BackgroundStyle);background-color:var(--sapField_Hover_Background)}:host(:not([value-state]):not([readonly])[focused]:not([opened]):hover),:host([value-state="None"]:not([readonly])[focused]:not([opened]):hover){box-shadow:none}:host([focused]):not([opened]) .ui5-input-root:before{content:none}:host(:not([readonly]):not([disabled])[value-state]:not([value-state="None"])){border-width:var(--_ui5-v1-21-0-rc-5_input_state_border_width)}:host([value-state="Error"]) [inner-input],:host([value-state="Warning"]) [inner-input]{font-style:var(--_ui5-v1-21-0-rc-5_input_error_warning_font_style);text-indent:var(--_ui5-v1-21-0-rc-5_input_error_warning_text_indent)}:host([value-state="Error"]) [inner-input]{font-weight:var(--_ui5-v1-21-0-rc-5_input_error_font_weight)}:host([value-state="Warning"]) [inner-input]{font-weight:var(--_ui5-v1-21-0-rc-5_input_warning_font_weight)}:host([value-state="Error"]:not([readonly]):not([disabled])){background:var(--sapField_InvalidBackgroundStyle);background-color:var(--sapField_InvalidBackground);border-color:var(--_ui5-v1-21-0-rc-5_input_value_state_error_border_color);box-shadow:var(--sapField_InvalidShadow)}:host([value-state="Error"][focused]:not([opened]):not([readonly])){background-color:var(--_ui5-v1-21-0-rc-5_input_focused_value_state_error_background);border-color:var(--_ui5-v1-21-0-rc-5_input_focused_value_state_error_border_color)}:host([value-state="Error"][focused]:not([opened]):not([readonly])) .ui5-input-focusable-element:after{border-color:var(--_ui5-v1-21-0-rc-5_input_focused_value_state_error_focus_outline_color)}:host([value-state="Error"]:not([readonly])) .ui5-input-root:before{background-color:var(--_ui5-v1-21-0-rc-5-input-value-state-error-border-botom-color)}:host([value-state="Error"]:not([readonly]):not([focused]):hover),:host([value-state="Error"]:not([readonly])[focused][opened]:hover){background-color:var(--_ui5-v1-21-0-rc-5_input_value_state_error_hover_background);box-shadow:var(--sapField_Hover_InvalidShadow)}:host([value-state="Error"]:not([readonly]):not([disabled])),:host([value-state="Warning"]:not([readonly]):not([disabled])),:host([value-state="Information"]:not([readonly]):not([disabled])){border-style:var(--_ui5-v1-21-0-rc-5_input_error_warning_border_style)}:host([value-state="Warning"]:not([readonly]):not([disabled])){background:var(--sapField_WarningBackgroundStyle);background-color:var(--sapField_WarningBackground);border-color:var(--_ui5-v1-21-0-rc-5_input_value_state_warning_border_color);box-shadow:var(--sapField_WarningShadow)}:host([value-state="Warning"][focused]:not([opened]):not([readonly])){background-color:var(--_ui5-v1-21-0-rc-5_input_focused_value_state_warning_background);border-color:var(--_ui5-v1-21-0-rc-5_input_focused_value_state_warning_border_color)}:host([value-state="Warning"][focused]:not([opened]):not([readonly])) .ui5-input-focusable-element:after{border-color:var(--_ui5-v1-21-0-rc-5_input_focused_value_state_warning_focus_outline_color)}:host([value-state="Warning"]:not([readonly])) .ui5-input-root:before{background-color:var(--_ui5-v1-21-0-rc-5_input_value_state_warning_border_botom_color)}:host([value-state="Warning"]:not([readonly]):not([focused]):hover),:host([value-state="Warning"]:not([readonly])[focused][opened]:hover){background-color:var(--sapField_Hover_Background);box-shadow:var(--sapField_Hover_WarningShadow)}:host([value-state="Success"]:not([readonly]):not([disabled])){background:var(--sapField_SuccessBackgroundStyle);background-color:var(--sapField_SuccessBackground);border-color:var(--_ui5-v1-21-0-rc-5_input_value_state_success_border_color);border-width:var(--_ui5-v1-21-0-rc-5_input_value_state_success_border_width);box-shadow:var(--sapField_SuccessShadow)}:host([value-state="Success"][focused]:not([opened]):not([readonly])){background-color:var(--_ui5-v1-21-0-rc-5_input_focused_value_state_success_background);border-color:var(--_ui5-v1-21-0-rc-5_input_focused_value_state_success_border_color)}:host([value-state="Success"][focused]:not([opened]):not([readonly])) .ui5-input-focusable-element:after{border-color:var(--_ui5-v1-21-0-rc-5_input_focused_value_state_success_focus_outline_color)}:host([value-state="Success"]:not([readonly])) .ui5-input-root:before{background-color:var(--_ui5-v1-21-0-rc-5_input_value_state_success_border_botom_color)}:host([value-state="Success"]:not([readonly]):not([focused]):hover),:host([value-state="Success"]:not([readonly])[focused][opened]:hover){background-color:var(--sapField_Hover_Background);box-shadow:var(--sapField_Hover_SuccessShadow)}:host([value-state="Information"]:not([readonly]):not([disabled])){background:var(--sapField_InformationBackgroundStyle);background-color:var(--sapField_InformationBackground);border-color:var(--_ui5-v1-21-0-rc-5_input_value_state_information_border_color);border-width:var(--_ui5-v1-21-0-rc-5_input_information_border_width);box-shadow:var(--sapField_InformationShadow)}:host([value-state="Information"][focused]:not([opened]):not([readonly])){background-color:var(--_ui5-v1-21-0-rc-5_input_focused_value_state_information_background);border-color:var(--_ui5-v1-21-0-rc-5_input_focused_value_state_information_border_color)}:host([value-state="Information"]:not([readonly])) .ui5-input-root:before{background-color:var(--_ui5-v1-21-0-rc-5_input_value_success_information_border_botom_color)}:host([value-state="Information"]:not([readonly]):not([focused]):hover),:host([value-state="Information"]:not([readonly])[focused][opened]:hover){background-color:var(--sapField_Hover_Background);box-shadow:var(--sapField_Hover_InformationShadow)}.ui5-input-icon-root{min-width:var(--_ui5-v1-21-0-rc-5_input_icon_min_width);height:100%;display:flex;justify-content:center;align-items:center}::slotted([ui5-icon][slot="icon"]){align-self:start;padding:var(--_ui5-v1-21-0-rc-5_input_custom_icon_padding);box-sizing:content-box!important}:host([value-state="Error"]) [input-icon],:host([value-state="Warning"]) [input-icon]{padding:var(--_ui5-v1-21-0-rc-5_input_error_warning_icon_padding)}:host([value-state="Error"][focused]) [input-icon],:host([value-state="Warning"][focused]) [input-icon]{padding:var(--_ui5-v1-21-0-rc-5_input_error_warning_focused_icon_padding)}:host([value-state="Information"]) [input-icon]{padding:var(--_ui5-v1-21-0-rc-5_input_information_icon_padding)}:host([value-state="Information"][focused]) [input-icon]{padding:var(--_ui5-v1-21-0-rc-5_input_information_focused_icon_padding)}:host([value-state="Error"]) ::slotted([input-icon][ui5-icon]),:host([value-state="Error"]) ::slotted([ui5-icon][slot="icon"]),:host([value-state="Warning"]) ::slotted([ui5-icon][slot="icon"]){padding:var(--_ui5-v1-21-0-rc-5_input_error_warning_custom_icon_padding)}:host([value-state="Error"][focused]) ::slotted([input-icon][ui5-icon]),:host([value-state="Error"][focused]) ::slotted([ui5-icon][slot="icon"]),:host([value-state="Warning"][focused]) ::slotted([ui5-icon][slot="icon"]){padding:var(--_ui5-v1-21-0-rc-5_input_error_warning_custom_focused_icon_padding)}:host([value-state="Information"]) ::slotted([ui5-icon][slot="icon"]){padding:var(--_ui5-v1-21-0-rc-5_input_information_custom_icon_padding)}:host([value-state="Information"][focused]) ::slotted([ui5-icon][slot="icon"]){padding:var(--_ui5-v1-21-0-rc-5_input_information_custom_focused_icon_padding)}:host([value-state="Error"]) [input-icon]:active,:host([value-state="Error"]) [input-icon][pressed]{box-shadow:var(--_ui5-v1-21-0-rc-5_input_error_icon_box_shadow);color:var(--_ui5-v1-21-0-rc-5_input_icon_error_pressed_color)}:host([value-state="Error"]) [input-icon]:not([pressed]):not(:active):hover{box-shadow:var(--_ui5-v1-21-0-rc-5_input_error_icon_box_shadow)}:host([value-state="Warning"]) [input-icon]:active,:host([value-state="Warning"]) [input-icon][pressed]{box-shadow:var(--_ui5-v1-21-0-rc-5_input_warning_icon_box_shadow);color:var(--_ui5-v1-21-0-rc-5_input_icon_warning_pressed_color)}:host([value-state="Warning"]) [input-icon]:not([pressed]):not(:active):hover{box-shadow:var(--_ui5-v1-21-0-rc-5_input_warning_icon_box_shadow)}:host([value-state="Information"]) [input-icon]:active,:host([value-state="Information"]) [input-icon][pressed]{box-shadow:var(--_ui5-v1-21-0-rc-5_input_information_icon_box_shadow);color:var(--_ui5-v1-21-0-rc-5_input_icon_information_pressed_color)}:host([value-state="Information"]) [input-icon]:not([pressed]):not(:active):hover{box-shadow:var(--_ui5-v1-21-0-rc-5_input_information_icon_box_shadow)}:host([value-state="Success"]) [input-icon]:active,:host([value-state="Success"]) [input-icon][pressed]{box-shadow:var(--_ui5-v1-21-0-rc-5_input_success_icon_box_shadow);color:var(--_ui5-v1-21-0-rc-5_input_icon_success_pressed_color)}:host([value-state="Success"]) [input-icon]:not([pressed]):not(:active):hover{box-shadow:var(--_ui5-v1-21-0-rc-5_input_success_icon_box_shadow)}.ui5-input-clear-icon-wrapper{height:var(--_ui5-v1-21-0-rc-5_input_icon_wrapper_height);padding:0;width:var(--_ui5-v1-21-0-rc-5_input_icon_width);min-width:var(--_ui5-v1-21-0-rc-5_input_icon_width);display:flex;justify-content:center;align-items:center;box-sizing:border-box}:host([value-state]:not([value-state="None"]):not([value-state="Success"])) .ui5-input-clear-icon-wrapper{height:var(--_ui5-v1-21-0-rc-5_input_icon_wrapper_state_height);vertical-align:top}:host([value-state="Success"]) .ui5-input-clear-icon-wrapper{height:var(--_ui5-v1-21-0-rc-5_input_icon_wrapper_success_state_height)}[ui5-icon].ui5-input-clear-icon{padding:0;color:inherit}[inner-input]::-webkit-outer-spin-button,[inner-input]::-webkit-inner-spin-button{-webkit-appearance:inherit;margin:inherit}
` };

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$w);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$v);
const styleData$d = { packageName: "@ui5/webcomponents", fileName: "themes/ResponsivePopoverCommon.css.ts", content: `.input-root-phone{flex:1;position:relative;height:var(--_ui5-v1-21-0-rc-5_input_height);color:var(--sapField_TextColor);font-size:var(--sapFontSize);font-family:"72override",var(--sapFontFamily);background:var(--sapField_BackgroundStyle);background-color:var(--_ui5-v1-21-0-rc-5_input_background_color);border:var(--_ui5-v1-21-0-rc-5-input-border);border-radius:var(--_ui5-v1-21-0-rc-5_input_border_radius);box-sizing:border-box}.input-root-phone [inner-input]{padding:0 .5rem;width:100%;height:100%}.input-root-phone [inner-input]:focus{background-color:var(--sapField_Focus_Background)}.input-root-phone:focus-within:before{content:"";position:absolute;pointer-events:none;z-index:2;border:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);border-radius:var(--_ui5-v1-21-0-rc-5_input_focus_border_radius);top:var(--_ui5-v1-21-0-rc-5_input_focus_offset);bottom:var(--_ui5-v1-21-0-rc-5_input_focus_offset);left:var(--_ui5-v1-21-0-rc-5_input_focus_offset);right:var(--_ui5-v1-21-0-rc-5_input_focus_offset)}.input-root-phone [value-state=Error] [input-icon][data-ui5-compact-size],.input-root-phone [value-state=Success] [input-icon][data-ui5-compact-size],.input-root-phone [value-state=Warning] [input-icon][data-ui5-compact-size]{padding:.1875rem .5rem}[inner-input]{background:transparent;color:inherit;border:none;font-style:normal;-webkit-appearance:none;-moz-appearance:textfield;line-height:normal;padding:var(--_ui5-v1-21-0-rc-5_input_inner_padding);box-sizing:border-box;min-width:3rem;text-overflow:ellipsis;flex:1;outline:none;font-size:inherit;font-family:inherit;border-radius:var(--_ui5-v1-21-0-rc-5_input_border_radius)}[inner-input]::selection,[inner-input]::-moz-selection{background:var(--sapSelectedColor);color:var(--sapContent_ContrastTextColor)}[inner-input]::-webkit-input-placeholder{font-style:italic;color:var(--sapField_PlaceholderTextColor)}[inner-input]::-moz-placeholder{font-style:italic;color:var(--sapField_PlaceholderTextColor)}.input-root-phone[value-state]:not([value-state=None]){border-width:var(--_ui5-v1-21-0-rc-5_input_state_border_width)}.input-root-phone[value-state=Error] [inner-input],.input-root-phone[value-state=Warning] [inner-input]{font-style:var(--_ui5-v1-21-0-rc-5_input_error_warning_font_style)}.input-root-phone[value-state=Error] [inner-input]{font-weight:var(--_ui5-v1-21-0-rc-5_input_error_font_weight)}.input-root-phone[value-state=Error]:not([readonly]){background:var(--sapField_InvalidBackgroundStyle);background-color:var(--sapField_InvalidBackground);border-color:var(--_ui5-v1-21-0-rc-5_input_value_state_error_border_color)}.input-root-phone[value-state=Error]:not([readonly]) [inner-input]:focus{background-color:var(--_ui5-v1-21-0-rc-5_input_focused_value_state_error_background);border-color:var(--_ui5-v1-21-0-rc-5_input_focused_value_state_error_border_color)}.input-root-phone[value-state=Error]:not([readonly]):focus-within:before{border-color:var(--_ui5-v1-21-0-rc-5_input_focused_value_state_error_focus_outline_color)}.input-root-phone[value-state=Error]:not([readonly]):not([disabled]),.input-root-phone[value-state=Warning]:not([readonly]):not([disabled]),.input-root-phone[value-state=Information]:not([readonly]):not([disabled]){border-style:var(--_ui5-v1-21-0-rc-5_input_error_warning_border_style)}.input-root-phone[value-state=Warning]:not([readonly]){background:var(--sapField_WarningBackgroundStyle);background-color:var(--sapField_WarningBackground);border-color:var(--_ui5-v1-21-0-rc-5_input_value_state_warning_border_color)}.input-root-phone[value-state=Warning]:not([readonly]) [inner-input]:focus{background-color:var(--_ui5-v1-21-0-rc-5_input_focused_value_state_warning_background);border-color:var(--_ui5-v1-21-0-rc-5_input_focused_value_state_warning_border_color)}.input-root-phone[value-state=Warning]:not([readonly]):focus-within:before{border-color:var(--_ui5-v1-21-0-rc-5_input_focused_value_state_warning_focus_outline_color)}.input-root-phone[value-state=Success]:not([readonly]){background:var(--sapField_SuccessBackgroundStyle);background-color:var(--sapField_SuccessBackground);border-color:var(--_ui5-v1-21-0-rc-5_input_value_state_success_border_color);border-width:var(--_ui5-v1-21-0-rc-5_input_value_state_success_border_width)}.input-root-phone[value-state=Success]:not([readonly]) [inner-input]:focus{background-color:var(--_ui5-v1-21-0-rc-5_input_focused_value_state_success_background);border-color:var(--_ui5-v1-21-0-rc-5_input_focused_value_state_success_border_color)}.input-root-phone[value-state=Success]:not([readonly]):focus-within:before{border-color:var(--_ui5-v1-21-0-rc-5_input_focused_value_state_success_focus_outline_color)}.input-root-phone[value-state=Information]:not([readonly]){background:var(--sapField_InformationBackgroundStyle);background-color:var(--sapField_InformationBackground);border-color:var(--_ui5-v1-21-0-rc-5_input_value_state_information_border_color);border-width:var(--_ui5-v1-21-0-rc-5_input_information_border_width)}.input-root-phone[value-state=Information]:not([readonly]) [inner-input]:focus{background-color:var(--_ui5-v1-21-0-rc-5_input_focused_value_state_information_background);border-color:var(--_ui5-v1-21-0-rc-5_input_focused_value_state_information_border_color)}.ui5-multi-combobox-toggle-button{margin-left:.5rem}.ui5-responsive-popover-header{width:100%;min-height:2.5rem;display:flex;flex-direction:column}.ui5-responsive-popover-header-text{width:calc(100% - var(--_ui5-v1-21-0-rc-5_button_base_min_width))}.ui5-responsive-popover-header .row{box-sizing:border-box;padding:.25rem 1rem;min-height:2.5rem;display:flex;justify-content:center;align-items:center;font-size:var(--sapFontHeader5Size)}.ui5-responsive-popover-footer{display:flex;justify-content:flex-end;padding:.25rem 0;width:100%}.ui5-responsive-popover-close-btn{position:absolute;right:1rem}
` };

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$w);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$v);
const styleData$c = { packageName: "@ui5/webcomponents", fileName: "themes/ValueStateMessage.css.ts", content: `.ui5-valuestatemessage-popover{border-radius:var(--_ui5-v1-21-0-rc-5_value_state_message_popover_border_radius);box-shadow:var(--_ui5-v1-21-0-rc-5_value_state_message_popover_box_shadow)}.ui5-input-value-state-message-icon{width:var(--_ui5-v1-21-0-rc-5_value_state_message_icon_width);height:var(--_ui5-v1-21-0-rc-5_value_state_message_icon_height);display:var(--_ui5-v1-21-0-rc-5_input_value_state_icon_display);position:absolute;padding-right:.375rem}.ui5-valuestatemessage-root .ui5-input-value-state-message-icon{left:var(--_ui5-v1-21-0-rc-5_input_value_state_icon_offset)}.ui5-input-value-state-message-icon[name=error]{color:var(--sapNegativeElementColor)}.ui5-input-value-state-message-icon[name=alert]{color:var(--sapCriticalElementColor)}.ui5-input-value-state-message-icon[name=success]{color:var(--sapPositiveElementColor)}.ui5-input-value-state-message-icon[name=information]{color:var(--sapInformativeElementColor)}.ui5-valuestatemessage-root{box-sizing:border-box;display:inline-block;color:var(--sapTextColor);font-size:var(--sapFontSmallSize);font-family:"72override",var(--sapFontFamily);height:auto;padding:var(--_ui5-v1-21-0-rc-5_value_state_message_padding);overflow:hidden;text-overflow:ellipsis;min-width:6.25rem;border:var(--_ui5-v1-21-0-rc-5_value_state_message_border);line-height:var(--_ui5-v1-21-0-rc-5_value_state_message_line_height)}[ui5-responsive-popover] .ui5-valuestatemessage-header,[ui5-popover] .ui5-valuestatemessage-header{min-height:2rem}[ui5-responsive-popover] .ui5-valuestatemessage-header{padding:var(--_ui5-v1-21-0-rc-5_value_state_header_padding);border:var(--_ui5-v1-21-0-rc-5_value_state_header_border);border-bottom:var(--_ui5-v1-21-0-rc-5_value_state_header_border_bottom);flex-grow:1;position:relative}.ui5-valuestatemessage--success{background:var(--sapSuccessBackground)}.ui5-valuestatemessage--warning{background:var(--sapWarningBackground)}.ui5-valuestatemessage--error{background:var(--sapErrorBackground)}.ui5-valuestatemessage--information{background:var(--sapInformationBackground)}.ui5-responsive-popover-header[focused],.ui5-responsive-popover-header:focus{outline-offset:var(--_ui5-v1-21-0-rc-5_value_state_header_offset);outline:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor)}.ui5-valuestatemessage-popover::part(header),.ui5-valuestatemessage-popover::part(content){padding:0}.ui5-valuestatemessage-popover::part(header),.ui5-valuestatemessage-popover::part(footer){min-height:0}.ui5-valuestatemessage-popover::part(header),.ui5-popover-with-value-state-header::part(header),.ui5-popover-with-value-state-header-phone::part(header){margin-bottom:0}.ui5-popover-with-value-state-header-phone .ui5-valuestatemessage-root{padding:var(--_ui5-v1-21-0-rc-5_value_state_message_padding_phone);width:100%}.ui5-popover-with-value-state-header-phone .ui5-input-value-state-message-icon{left:var(--_ui5-v1-21-0-rc-5_value_state_message_icon_offset_phone)}.ui5-popover-with-value-state-header-phone .ui5-valuestatemessage-header{position:relative;flex:none;top:0;left:0}.ui5-popover-with-value-state-header-phone::part(content){padding:0;overflow:hidden;display:flex;flex-direction:column}.ui5-popover-with-value-state-header-phone .ui5-valuestatemessage-root+[ui5-list]{overflow:auto}[ui5-responsive-popover] .ui5-valuestatemessage--error{box-shadow:var(--_ui5-v1-21-0-rc-5_value_state_header_box_shadow_error)}[ui5-responsive-popover] .ui5-valuestatemessage--information{box-shadow:var(--_ui5-v1-21-0-rc-5_value_state_header_box_shadow_information)}[ui5-responsive-popover] .ui5-valuestatemessage--success{box-shadow:var(--_ui5-v1-21-0-rc-5_value_state_header_box_shadow_success)}[ui5-responsive-popover] .ui5-valuestatemessage--warning{box-shadow:var(--_ui5-v1-21-0-rc-5_value_state_header_box_shadow_warning)}[ui5-responsive-popover].ui5-popover-with-value-state-header .ui5-valuestatemessage-root:has(+[ui5-list]:empty){box-shadow:none}
` };

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$w);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$v);
const styleData$b = { packageName: "@ui5/webcomponents", fileName: "themes/Suggestions.css.ts", content: `.ui5-suggestions-popover{box-shadow:var(--sapContent_Shadow1)}.ui5-suggestions-popover::part(header),.ui5-suggestions-popover::part(content){padding:0}.ui5-suggestions-popover::part(footer){padding:0 1rem}.ui5-suggestions-popover [ui5-li]::part(icon),.ui5-suggestions-popover [ui5-li-suggestion-item]::part(icon){color:var(--sapList_TextColor)}.input-root-phone.native-input-wrapper{display:contents}.input-root-phone.native-input-wrapper:before{display:none}.native-input-wrapper .ui5-input-inner-phone{margin:0}
` };

var __decorate$a = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Input_1;
// all sementic events
var INPUT_EVENTS;
(function (INPUT_EVENTS) {
    INPUT_EVENTS["CHANGE"] = "change";
    INPUT_EVENTS["INPUT"] = "input";
    INPUT_EVENTS["SUGGESTION_ITEM_SELECT"] = "suggestion-item-select";
})(INPUT_EVENTS || (INPUT_EVENTS = {}));
// all user interactions
var INPUT_ACTIONS;
(function (INPUT_ACTIONS) {
    INPUT_ACTIONS["ACTION_ENTER"] = "enter";
    INPUT_ACTIONS["ACTION_USER_INPUT"] = "input";
})(INPUT_ACTIONS || (INPUT_ACTIONS = {}));
/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-input</code> component allows the user to enter and edit text or numeric values in one line.
 * <br>
 * Additionally, you can provide <code>suggestionItems</code>,
 * that are displayed in a popover right under the input.
 * <br><br>
 * The text field can be editable or read-only (<code>readonly</code> property),
 * and it can be enabled or disabled (<code>disabled</code> property).
 * To visualize semantic states, such as "error" or "warning", the <code>valueState</code> property is provided.
 * When the user makes changes to the text, the change event is fired,
 * which enables you to react on any text change.
 * <br><br>
 * <b>Note:</b> If you are using the <code>ui5-input</code> as a single npm module,
 * don't forget to import the <code>InputSuggestions</code> module from
 * "@ui5/webcomponents/dist/features/InputSuggestions.js"
 * to enable the suggestions functionality.
 *
 * <h3>Keyboard Handling</h3>
 * The <code>ui5-input</code> provides the following keyboard shortcuts:
 * <br>
 *
 * <ul>
 * <li>[ESC] - Closes the suggestion list, if open. If closed or not enabled, cancels changes and reverts to the value which the Input field had when it got the focus.</li>
 * <li>[ENTER] or [RETURN] - If suggestion list is open takes over the current matching item and closes it. If value state or group header is focused, does nothing.</li>
 * <li>[DOWN] - Focuses the next matching item in the suggestion list.</li>
 * <li>[UP] - Focuses the previous matching item in the suggestion list.</li>
 * <li>[HOME] - If focus is in the text input, moves caret before the first character. If focus is in the list, highlights the first item and updates the input accordingly.</li>
 * <li>[END] - If focus is in the text input, moves caret after the last character. If focus is in the list, highlights the last item and updates the input accordingly.</li>
 * <li>[PAGEUP] - If focus is in the list, moves highlight up by page size (10 items by default). If focus is in the input, does nothing.</li>
 * <li>[PAGEDOWN] - If focus is in the list, moves highlight down by page size (10 items by default). If focus is in the input, does nothing.</li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Input.js";</code>
 * <br>
 * <code>import "@ui5/webcomponents/dist/features/InputSuggestions.js";</code> (optional - for input suggestions support)
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.Input
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-input
 * @appenddocs sap.ui.webc.main.SuggestionItem sap.ui.webc.main.SuggestionGroupItem
 * @implements sap.ui.webc.main.IInput
 * @public
 */
let Input = Input_1 = class Input extends UI5Element {
    constructor() {
        super();
        // Indicates if there is selected suggestionItem.
        this.hasSuggestionItemSelected = false;
        // Represents the value before user moves selection from suggestion item to another
        // and its value is updated after each move.
        // Note: Used to register and fire "input" event upon [SPACE] or [ENTER].
        // Note: The property "value" is updated upon selection move and can`t be used.
        this.valueBeforeItemSelection = "";
        // Represents the value before user moves selection between the suggestion items
        // and its value remains the same when the user navigates up or down the list.
        // Note: Used to cancel selection upon [ESC].
        this.valueBeforeItemPreview = "";
        // Indicates if the user selection has been canceled with [ESC].
        this.suggestionSelectionCancelled = false;
        // tracks the value between focus in and focus out to detect that change event should be fired.
        this.previousValue = "";
        // Indicates, if the component is rendering for first time.
        this.firstRendering = true;
        // The typed in value.
        this.typedInValue = "";
        // The last value confirmed by the user with "ENTER"
        this.lastConfirmedValue = "";
        // Indicates, if the user is typing. Gets reset once popup is closed
        this.isTyping = false;
        // Suggestions array initialization
        this.suggestionObjects = [];
        this._handleResizeBound = this._handleResize.bind(this);
        this._keepInnerValue = false;
        this._focusedAfterClear = false;
    }
    onEnterDOM() {
        ResizeHandler.register(this, this._handleResizeBound);
        registerUI5Element(this, this._updateAssociatedLabelsTexts.bind(this));
    }
    onExitDOM() {
        ResizeHandler.deregister(this, this._handleResizeBound);
        deregisterUI5Element(this);
    }
    onBeforeRendering() {
        if (!this._keepInnerValue) {
            this._innerValue = this.value;
        }
        if (this.showSuggestions) {
            this.enableSuggestions();
            this.suggestionObjects = this.Suggestions.defaultSlotProperties(this.typedInValue);
        }
        this.effectiveShowClearIcon = (this.showClearIcon && !!this.value && !this.readonly && !this.disabled);
        this.style.setProperty(getScopedVarName("--_ui5-input-icons-count"), `${this.iconsCount}`);
        this.FormSupport = getFeature("FormSupport");
        const hasItems = !!this.suggestionItems.length;
        const hasValue = !!this.value;
        const isFocused = this.shadowRoot.querySelector("input") === getActiveElement();
        if (this._isPhone) {
            this.open = this.openOnMobile;
        }
        else if (this._forceOpen) {
            this.open = true;
        }
        else {
            this.open = hasValue && hasItems && isFocused && this.isTyping;
        }
        if (this.FormSupport) {
            this.FormSupport.syncNativeHiddenInput(this);
        }
        else if (this.name) {
            console.warn(`In order for the "name" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`); // eslint-disable-line
        }
        const value = this.value;
        const innerInput = this.getInputDOMRefSync();
        if (!innerInput || !value) {
            return;
        }
        const autoCompletedChars = innerInput.selectionEnd - innerInput.selectionStart;
        // Typehead causes issues on Android devices, so we disable it for now
        // If there is already a selection the autocomplete has already been performed
        if (this._shouldAutocomplete && !isAndroid() && !autoCompletedChars && !this._isKeyNavigation) {
            const item = this._getFirstMatchingItem(value);
            if (item) {
                this._handleTypeAhead(item);
            }
        }
    }
    async onAfterRendering() {
        const innerInput = this.getInputDOMRefSync();
        if (this.Suggestions && this.showSuggestions) {
            this.Suggestions.toggle(this.open, {
                preventFocusRestore: true,
            });
            this._listWidth = await this.Suggestions._getListWidth();
        }
        if (this.shouldDisplayOnlyValueStateMessage) {
            this.openPopover();
        }
        else {
            this.closePopover();
        }
        if (this._performTextSelection) {
            // this is required to syncronize lit-html input's value and user's input
            // lit-html does not sync its stored value for the value property when the user is typing
            if (innerInput.value !== this._innerValue) {
                innerInput.value = this._innerValue;
            }
            if (this.typedInValue.length && this.value.length) {
                innerInput.setSelectionRange(this.typedInValue.length, this.value.length);
            }
        }
        this._performTextSelection = false;
    }
    _onkeydown(e) {
        this._isKeyNavigation = true;
        this._shouldAutocomplete = !this.noTypeahead && !(isBackSpace(e) || isDelete(e) || isEscape(e));
        if (isUp(e)) {
            return this._handleUp(e);
        }
        if (isDown(e)) {
            return this._handleDown(e);
        }
        if (isSpace(e)) {
            return this._handleSpace(e);
        }
        if (isTabNext(e)) {
            return this._handleTab();
        }
        if (isEnter(e)) {
            return this._handleEnter(e);
        }
        if (isPageUp(e)) {
            return this._handlePageUp(e);
        }
        if (isPageDown(e)) {
            return this._handlePageDown(e);
        }
        if (isHome(e)) {
            return this._handleHome(e);
        }
        if (isEnd(e)) {
            return this._handleEnd(e);
        }
        if (isEscape(e)) {
            return this._handleEscape();
        }
        if (this.showSuggestions) {
            this._clearPopoverFocusAndSelection();
        }
        this._keyDown = true;
        this._isKeyNavigation = false;
    }
    _onkeyup(e) {
        // The native Delete event does not update the value property "on time".
        // So, the (native) change event is always fired with the old value
        if (isDelete(e)) {
            this.value = e.target.value;
        }
        this._keyDown = false;
    }
    _handleUp(e) {
        if (this.Suggestions && this.Suggestions.isOpened()) {
            this.Suggestions.onUp(e);
        }
    }
    _handleDown(e) {
        if (this.Suggestions && this.Suggestions.isOpened()) {
            this.Suggestions.onDown(e);
        }
    }
    _handleSpace(e) {
        if (this.Suggestions) {
            this.Suggestions.onSpace(e);
        }
    }
    _handleTab() {
        if (this.Suggestions && (this.previousValue !== this.value)) {
            this.Suggestions.onTab();
        }
    }
    _handleEnter(e) {
        const suggestionItemPressed = !!(this.Suggestions && this.Suggestions.onEnter(e));
        const innerInput = this.getInputDOMRefSync();
        // Check for autocompleted item
        const matchingItem = this.suggestionItems.find(item => {
            return (item.text && item.text === this.value) || (item.textContent === this.value);
        });
        if (matchingItem) {
            const itemText = matchingItem.text ? matchingItem.text : (matchingItem.textContent || "");
            innerInput.setSelectionRange(itemText.length, itemText.length);
            if (!suggestionItemPressed) {
                this.selectSuggestion(matchingItem, true);
                this.open = false;
            }
        }
        if (this._isPhone && !this.suggestionItems.length && !this.isTypeNumber) {
            innerInput.setSelectionRange(this.value.length, this.value.length);
        }
        if (!suggestionItemPressed) {
            this.lastConfirmedValue = this.value;
            if (this.FormSupport) {
                this.FormSupport.triggerFormSubmit(this);
            }
            return;
        }
        this.focused = true;
    }
    _handlePageUp(e) {
        if (this._isSuggestionsFocused) {
            this.Suggestions.onPageUp(e);
        }
        else {
            e.preventDefault();
        }
    }
    _handlePageDown(e) {
        if (this._isSuggestionsFocused) {
            this.Suggestions.onPageDown(e);
        }
        else {
            e.preventDefault();
        }
    }
    _handleHome(e) {
        if (this._isSuggestionsFocused) {
            this.Suggestions.onHome(e);
        }
    }
    _handleEnd(e) {
        if (this._isSuggestionsFocused) {
            this.Suggestions.onEnd(e);
        }
    }
    _handleEscape() {
        const hasSuggestions = this.showSuggestions && !!this.Suggestions;
        const isOpen = hasSuggestions && this.open;
        const innerInput = this.getInputDOMRefSync();
        const isAutoCompleted = innerInput.selectionEnd - innerInput.selectionStart > 0;
        this.isTyping = false;
        if (!isOpen) {
            this.value = this.lastConfirmedValue ? this.lastConfirmedValue : this.previousValue;
            return;
        }
        if (isOpen && this.Suggestions._isItemOnTarget()) {
            // Restore the value.
            this.value = this.typedInValue || this.valueBeforeItemPreview;
            // Mark that the selection has been cancelled, so the popover can close
            // and not reopen, due to receiving focus.
            this.suggestionSelectionCancelled = true;
            this.focused = true;
            return;
        }
        if (isAutoCompleted) {
            this.value = this.typedInValue;
        }
        if (this._isValueStateFocused) {
            this._isValueStateFocused = false;
            this.focused = true;
        }
    }
    async _onfocusin(e) {
        await this.getInputDOMRef();
        this.focused = true; // invalidating property
        if (!this._focusedAfterClear) {
            this.previousValue = this.value;
        }
        this.valueBeforeItemPreview = this.value;
        this._inputIconFocused = !!e.target && e.target === this.querySelector("[ui5-icon]");
        this._focusedAfterClear = false;
    }
    /**
     * Called on "focusin" of the native input HTML Element.
     * <b>Note:</b> implemented in MultiInput, but used in the Input template.
     */
    innerFocusIn() { }
    _onfocusout(e) {
        const toBeFocused = e.relatedTarget;
        const focusedOutToSuggestions = this.Suggestions && toBeFocused && toBeFocused.shadowRoot && toBeFocused.shadowRoot.contains(this.Suggestions.responsivePopover);
        const focusedOutToValueStateMessage = toBeFocused && toBeFocused.shadowRoot && toBeFocused.shadowRoot.querySelector(".ui5-valuestatemessage-root");
        this._keepInnerValue = false;
        if (this.showClearIcon && !this.effectiveShowClearIcon) {
            this._clearIconClicked = false;
            this._handleChange();
        }
        // if focusout is triggered by pressing on suggestion item or value state message popover, skip invalidation, because re-rendering
        // will happen before "itemPress" event, which will make item "active" state not visualized
        if (focusedOutToSuggestions || focusedOutToValueStateMessage) {
            e.stopImmediatePropagation();
            return;
        }
        if (toBeFocused && (toBeFocused).classList.contains(this._id)) {
            return;
        }
        this.open = false;
        this._clearPopoverFocusAndSelection();
        if (!this._clearIconClicked) {
            this.previousValue = "";
        }
        this.lastConfirmedValue = "";
        this.focused = false; // invalidating property
        this.isTyping = false;
        this._forceOpen = false;
    }
    _clearPopoverFocusAndSelection() {
        if (!this.showSuggestions || !this.Suggestions) {
            return;
        }
        this._isValueStateFocused = false;
        this.hasSuggestionItemSelected = false;
        this.Suggestions._deselectItems();
        this.Suggestions._clearItemFocus();
    }
    _click() {
        if (isPhone() && !this.readonly && this.Suggestions) {
            this.blur();
            this.openOnMobile = true;
        }
    }
    _handleChange() {
        if (this._clearIconClicked) {
            this._clearIconClicked = false;
            return;
        }
        if (this.previousValue !== this.getInputDOMRefSync().value) {
            this.fireEvent(INPUT_EVENTS.CHANGE);
            this.previousValue = this.value;
            this.typedInValue = this.value;
        }
    }
    _clear() {
        this.value = "";
        this.fireEvent(INPUT_EVENTS.INPUT);
        if (!this._isPhone) {
            this.focus();
            this._focusedAfterClear = true;
        }
    }
    _iconMouseDown() {
        this._clearIconClicked = true;
    }
    _scroll(e) {
        this.fireEvent("suggestion-scroll", {
            scrollTop: e.detail.scrollTop,
            scrollContainer: e.detail.targetRef,
        });
    }
    _handleInput(e) {
        const inputDomRef = this.getInputDOMRefSync();
        const emptyValueFiredOnNumberInput = this.value && this.isTypeNumber && !inputDomRef.value;
        const eventType = e.inputType
            || (e.detail && e.detail.inputType)
            || "";
        this._keepInnerValue = false;
        const allowedEventTypes = [
            "deleteWordBackward",
            "deleteWordForward",
            "deleteSoftLineBackward",
            "deleteSoftLineForward",
            "deleteEntireSoftLine",
            "deleteHardLineBackward",
            "deleteHardLineForward",
            "deleteByDrag",
            "deleteByCut",
            "deleteContent",
            "deleteContentBackward",
            "deleteContentForward",
            "historyUndo",
        ];
        this._shouldAutocomplete = !allowedEventTypes.includes(eventType) && !this.noTypeahead;
        this.suggestionSelectionCancelled = false;
        if (e instanceof InputEvent) {
            // ---- Special cases of numeric Input ----
            // ---------------- Start -----------------
            // When the last character after the delimiter is removed.
            // In such cases, we want to skip the re-rendering of the
            // component as this leads to cursor repositioning and causes user experience issues.
            // There are few scenarios:
            // Example: type "123.4" and press BACKSPACE - the native input is firing event with the whole part as value (123).
            // Pressing BACKSPACE again will remove the delimiter and the native input will fire event with the whole part as value again (123).
            // Example: type "123.456", select/mark "456" and press BACKSPACE - the native input is firing event with the whole part as value (123).
            // Example: type "123.456", select/mark "123.456" and press BACKSPACE - the native input is firing event with empty value.
            const delimiterCase = this.isTypeNumber
                && (e.inputType === "deleteContentForward" || e.inputType === "deleteContentBackward")
                && !e.target.value.includes(".")
                && this.value.includes(".");
            // Handle special numeric notation with "e", example "12.5e12"
            const eNotationCase = emptyValueFiredOnNumberInput && e.data === "e";
            // Handle special numeric notation with "-", example "-3"
            // When pressing BACKSPACE, the native input fires event with empty value
            const minusRemovalCase = emptyValueFiredOnNumberInput
                && this.value.startsWith("-")
                && this.value.length === 2
                && (e.inputType === "deleteContentForward" || e.inputType === "deleteContentBackward");
            if (delimiterCase || eNotationCase || minusRemovalCase) {
                this.value = e.target.value;
                this._keepInnerValue = true;
            }
            // ----------------- End ------------------
        }
        if (e.target === inputDomRef) {
            this.focused = true;
            // stop the native event, as the semantic "input" would be fired.
            e.stopImmediatePropagation();
        }
        this.fireEventByAction(INPUT_ACTIONS.ACTION_ENTER, e);
        this.hasSuggestionItemSelected = false;
        this._isValueStateFocused = false;
        if (this.Suggestions) {
            this.Suggestions.updateSelectedItemPosition(-1);
        }
        this.isTyping = true;
    }
    _startsWithMatchingItems(str) {
        const textProp = this.suggestionItems[0].text ? "text" : "textContent";
        return StartsWith(str, this.suggestionItems, textProp);
    }
    _getFirstMatchingItem(current) {
        if (!this.suggestionItems.length) {
            return;
        }
        const matchingItems = this._startsWithMatchingItems(current).filter(item => !item.groupItem);
        if (matchingItems.length) {
            return matchingItems[0];
        }
    }
    _handleTypeAhead(item) {
        const value = item.text ? item.text : item.textContent || "";
        this._innerValue = value;
        this.value = value;
        this._performTextSelection = true;
        this._shouldAutocomplete = false;
    }
    _handleResize() {
        this._inputWidth = this.offsetWidth;
    }
    _updateAssociatedLabelsTexts() {
        this._associatedLabelsTexts = getAssociatedLabelForTexts(this);
        this._accessibleLabelsRefTexts = getAllAccessibleNameRefTexts(this);
    }
    _closeRespPopover() {
        this.Suggestions.close(true);
    }
    async _afterOpenPopover() {
        // Set initial focus to the native input
        if (isPhone()) {
            (await this.getInputDOMRef()).focus();
        }
    }
    _afterClosePopover() {
        this.announceSelectedItem();
        // close device's keyboard and prevent further typing
        if (isPhone()) {
            this.blur();
            this.focused = false;
        }
        this.openOnMobile = false;
        this.open = false;
        this._forceOpen = false;
        if (this.hasSuggestionItemSelected) {
            this.focus();
        }
    }
    /**
     * Checks if the value state popover is open.
     * @returns {boolean} true if the value state popover is open, false otherwise
     */
    isValueStateOpened() {
        return !!this._isPopoverOpen;
    }
    async openPopover() {
        const popover = await this._getPopover();
        if (popover) {
            this._isPopoverOpen = true;
            popover.showAt(this);
        }
    }
    async closePopover() {
        const popover = await this._getPopover();
        popover && popover.close();
    }
    async _getPopover() {
        const staticAreaItem = await this.getStaticAreaItemDomRef();
        return staticAreaItem.querySelector("[ui5-popover]");
    }
    /**
     * Manually opens the suggestions popover, assuming suggestions are enabled. Items must be preloaded for it to open.
     * @public
     * @method
     * @name sap.ui.webc.main.Input#openPicker
     * @return {void}
     * @since 1.3.0
     */
    openPicker() {
        if (!this.suggestionItems.length || this.disabled || this.readonly) {
            return;
        }
        this._forceOpen = true;
    }
    enableSuggestions() {
        if (this.Suggestions) {
            return;
        }
        const Suggestions = getFeature("InputSuggestions");
        if (Suggestions) {
            this.Suggestions = new Suggestions(this, "suggestionItems", true, false);
        }
        else {
            throw new Error(`You have to import "@ui5/webcomponents/dist/features/InputSuggestions.js" module to use ui5-input suggestions`);
        }
    }
    selectSuggestion(item, keyboardUsed) {
        if (item.groupItem) {
            return;
        }
        const value = this.typedInValue || this.value;
        const itemText = item.text || item.textContent || ""; // keep textContent for compatibility
        const fireInput = keyboardUsed
            ? this.valueBeforeItemSelection !== itemText : value !== itemText;
        this.hasSuggestionItemSelected = true;
        const valueOriginal = this.value;
        const valueBeforeItemSelectionOriginal = this.valueBeforeItemSelection;
        const lastConfirmedValueOriginal = this.lastConfirmedValue;
        const performTextSelectionOriginal = this._performTextSelection;
        const typedInValueOriginal = this.typedInValue;
        const previousValueOriginal = this.previousValue;
        if (fireInput) {
            this.value = itemText;
            this.valueBeforeItemSelection = itemText;
            this.lastConfirmedValue = itemText;
            this._performTextSelection = true;
            this.fireEvent(INPUT_EVENTS.CHANGE);
            if (isPhone()) {
                this.fireEvent(INPUT_EVENTS.INPUT);
            }
            // value might change in the change event handler
            this.typedInValue = this.value;
            this.previousValue = this.value;
        }
        this.valueBeforeItemPreview = "";
        this.suggestionSelectionCancelled = false;
        // Fire suggestion-item-select event after input change events for backward compatibility, but revert all input properties set before suggestion was prevented.
        // For v2.0 this code will be reworked.
        const isCancelledByUser = !this.fireEvent(INPUT_EVENTS.SUGGESTION_ITEM_SELECT, { item }, true);
        if (isCancelledByUser) {
            this.Suggestions?._clearSelectedSuggestionAndAccInfo();
            this.hasSuggestionItemSelected = false;
            this.suggestionSelectionCancelled = true;
            if (fireInput) {
                // revert properties set during fireInput
                if (itemText === this.value) { // If no chnages were made to the input value after suggestion-item-select was prevented - revert value to the original text
                    this.value = valueOriginal;
                }
                this.valueBeforeItemSelection = valueBeforeItemSelectionOriginal;
                this.lastConfirmedValue = lastConfirmedValueOriginal;
                this._performTextSelection = performTextSelectionOriginal;
                this.typedInValue = typedInValueOriginal;
                this.previousValue = previousValueOriginal;
            }
        }
        this.isTyping = false;
        this.openOnMobile = false;
        this._forceOpen = false;
    }
    previewSuggestion(item) {
        this.valueBeforeItemSelection = this.value;
        this.updateValueOnPreview(item);
        this.announceSelectedItem();
        this._previewItem = item;
    }
    /**
     * Updates the input value on item preview.
     * @param {Object} item The item that is on preview
     */
    updateValueOnPreview(item) {
        const noPreview = item.type === "Inactive" || item.groupItem;
        const itemValue = noPreview ? this.valueBeforeItemPreview : (item.effectiveTitle || item.textContent || "");
        this.value = itemValue;
        this._performTextSelection = true;
    }
    /**
     * The suggestion item on preview.
     * @type {sap.ui.webc.main.IInputSuggestionItem | null}
     * @name sap.ui.webc.main.Input.prototype.previewItem
     * @readonly
     * @public
     */
    get previewItem() {
        if (!this._previewItem) {
            return null;
        }
        return this.getSuggestionByListItem(this._previewItem);
    }
    async fireEventByAction(action, e) {
        if (this.disabled || this.readonly) {
            return;
        }
        const inputValue = await this.getInputValue();
        const isUserInput = action === INPUT_ACTIONS.ACTION_ENTER;
        this.value = inputValue;
        this.typedInValue = inputValue;
        this.valueBeforeItemPreview = inputValue;
        if (isUserInput) { // input
            this.fireEvent(INPUT_EVENTS.INPUT, { inputType: e.inputType });
            // Angular two way data binding
            this.fireEvent("value-changed");
        }
    }
    async getInputValue() {
        const domRef = this.getDomRef();
        if (domRef) {
            return (await this.getInputDOMRef()).value;
        }
        return "";
    }
    async getInputDOMRef() {
        if (isPhone() && this.Suggestions) {
            await this.Suggestions._getSuggestionPopover();
            return this.Suggestions.responsivePopover.querySelector(".ui5-input-inner-phone");
        }
        return this.nativeInput;
    }
    getInputDOMRefSync() {
        if (isPhone() && this.Suggestions && this.Suggestions.responsivePopover) {
            return this.Suggestions.responsivePopover.querySelector(".ui5-input-inner-phone").shadowRoot.querySelector("input");
        }
        return this.nativeInput;
    }
    /**
     * Returns a reference to the native input element
     * @protected
     */
    get nativeInput() {
        const domRef = this.getDomRef();
        return domRef ? domRef.querySelector(`input`) : null;
    }
    get nativeInputWidth() {
        return this.nativeInput ? this.nativeInput.offsetWidth : 0;
    }
    getLabelableElementId() {
        return this.getInputId();
    }
    getSuggestionByListItem(item) {
        const key = parseInt(item.getAttribute("data-ui5-key"));
        return this.suggestionItems[key];
    }
    /**
     * Returns if the suggestions popover is scrollable.
     * The method returns <code>Promise</code> that resolves to true,
     * if the popup is scrollable and false otherwise.
     * @returns {Promise}
     */
    isSuggestionsScrollable() {
        if (!this.Suggestions) {
            return Promise.resolve(false);
        }
        return this.Suggestions._isScrollable();
    }
    getInputId() {
        return `${this._id}-inner`;
    }
    /* Suggestions interface  */
    onItemMouseOver(e) {
        const item = e.target;
        const suggestion = this.getSuggestionByListItem(item);
        suggestion && suggestion.fireEvent("mouseover", {
            item: suggestion,
            targetRef: item,
        });
    }
    onItemMouseOut(e) {
        const item = e.target;
        const suggestion = this.getSuggestionByListItem(item);
        suggestion && suggestion.fireEvent("mouseout", {
            item: suggestion,
            targetRef: item,
        });
    }
    onItemMouseDown(e) {
        e.preventDefault();
    }
    onItemSelected(item, keyboardUsed) {
        this.selectSuggestion(item, keyboardUsed);
    }
    onItemPreviewed(item) {
        this.previewSuggestion(item);
        this.fireEvent("suggestion-item-preview", {
            item: this.getSuggestionByListItem(item),
            targetRef: item,
        });
    }
    get valueStateTypeMappings() {
        return {
            "Success": Input_1.i18nBundle.getText(VALUE_STATE_TYPE_SUCCESS),
            "Information": Input_1.i18nBundle.getText(VALUE_STATE_TYPE_INFORMATION),
            "Error": Input_1.i18nBundle.getText(VALUE_STATE_TYPE_ERROR),
            "Warning": Input_1.i18nBundle.getText(VALUE_STATE_TYPE_WARNING),
        };
    }
    valueStateTextMappings() {
        return {
            "Success": Input_1.i18nBundle.getText(VALUE_STATE_SUCCESS),
            "Information": Input_1.i18nBundle.getText(VALUE_STATE_INFORMATION),
            "Error": Input_1.i18nBundle.getText(VALUE_STATE_ERROR),
            "Warning": Input_1.i18nBundle.getText(VALUE_STATE_WARNING),
        };
    }
    announceSelectedItem() {
        const invisibleText = this.shadowRoot.querySelector(`[id="${this._id}-selectionText"]`);
        invisibleText.textContent = this.itemSelectionAnnounce;
    }
    get _readonly() {
        return this.readonly && !this.disabled;
    }
    get _headerTitleText() {
        return Input_1.i18nBundle.getText(INPUT_SUGGESTIONS_TITLE);
    }
    get clearIconAccessibleName() {
        return Input_1.i18nBundle.getText(INPUT_CLEAR_ICON_ACC_NAME);
    }
    get inputType() {
        return this.type.toLowerCase();
    }
    get isTypeNumber() {
        return this.type === InputType$1.Number;
    }
    get suggestionsTextId() {
        return this.showSuggestions ? `${this._id}-suggestionsText` : "";
    }
    get valueStateTextId() {
        return this.hasValueState ? `${this._id}-valueStateDesc` : "";
    }
    get accInfo() {
        const ariaHasPopupDefault = this.showSuggestions ? "true" : undefined;
        const ariaAutoCompleteDefault = this.showSuggestions ? "list" : undefined;
        const ariaDescribedBy = this._inputAccInfo.ariaDescribedBy ? `${this.suggestionsTextId} ${this.valueStateTextId} ${this._inputAccInfo.ariaDescribedBy}`.trim() : `${this.suggestionsTextId} ${this.valueStateTextId}`.trim();
        const info = {
            "input": {
                "ariaRoledescription": this._inputAccInfo && (this._inputAccInfo.ariaRoledescription || undefined),
                "ariaDescribedBy": ariaDescribedBy || undefined,
                "ariaInvalid": this.valueState === ValueState$1.Error ? "true" : undefined,
                "ariaHasPopup": this._inputAccInfo.ariaHasPopup ? this._inputAccInfo.ariaHasPopup : ariaHasPopupDefault,
                "ariaAutoComplete": this._inputAccInfo.ariaAutoComplete ? this._inputAccInfo.ariaAutoComplete : ariaAutoCompleteDefault,
                "role": this._inputAccInfo && this._inputAccInfo.role,
                "ariaControls": this._inputAccInfo && this._inputAccInfo.ariaControls,
                "ariaExpanded": this._inputAccInfo && this._inputAccInfo.ariaExpanded,
                "ariaDescription": this._inputAccInfo && this._inputAccInfo.ariaDescription,
                "ariaLabel": (this._inputAccInfo && this._inputAccInfo.ariaLabel) || this._accessibleLabelsRefTexts || this.accessibleName || this._associatedLabelsTexts || undefined,
            },
        };
        return info;
    }
    get nativeInputAttributes() {
        return {
            "min": this.isTypeNumber ? this._nativeInputAttributes.min : undefined,
            "max": this.isTypeNumber ? this._nativeInputAttributes.max : undefined,
            "step": this.isTypeNumber ? (this._nativeInputAttributes.step || "any") : undefined,
        };
    }
    get ariaValueStateHiddenText() {
        if (!this.hasValueState) {
            return;
        }
        const valueState = this.valueState !== ValueState$1.None ? this.valueStateTypeMappings[this.valueState] : "";
        if (this.shouldDisplayDefaultValueStateMessage) {
            return this.valueStateText ? `${valueState} ${this.valueStateText}` : valueState;
        }
        return `${valueState}`.concat(" ", this.valueStateMessageText.map(el => el.textContent).join(" "));
    }
    get itemSelectionAnnounce() {
        return this.Suggestions ? this.Suggestions.itemSelectionAnnounce : "";
    }
    get iconsCount() {
        const slottedIconsCount = this.icon ? this.icon.length : 0;
        const clearIconCount = Number(this.effectiveShowClearIcon) ?? 0;
        return slottedIconsCount + clearIconCount;
    }
    get classes() {
        return {
            popover: {
                "ui5-suggestions-popover": this.showSuggestions,
                "ui5-popover-with-value-state-header-phone": this._isPhone && this.showSuggestions && this.hasValueStateMessage,
                "ui5-popover-with-value-state-header": !this._isPhone && this.showSuggestions && this.hasValueStateMessage,
            },
            popoverValueState: {
                "ui5-valuestatemessage-root": true,
                "ui5-valuestatemessage-header": true,
                "ui5-valuestatemessage--success": this.valueState === ValueState$1.Success,
                "ui5-valuestatemessage--error": this.valueState === ValueState$1.Error,
                "ui5-valuestatemessage--warning": this.valueState === ValueState$1.Warning,
                "ui5-valuestatemessage--information": this.valueState === ValueState$1.Information,
            },
        };
    }
    get styles() {
        const remSizeIxPx = parseInt(getComputedStyle(document.documentElement).fontSize);
        const stylesObject = {
            popoverHeader: {
                "max-width": this._inputWidth ? `${this._inputWidth}px` : "",
            },
            suggestionPopoverHeader: {
                "display": this._listWidth === 0 ? "none" : "inline-block",
                "width": this._listWidth ? `${this._listWidth}px` : "",
            },
            suggestionsPopover: {
                "min-width": this._inputWidth ? `${this._inputWidth}px` : "",
                "max-width": this._inputWidth && (this._inputWidth / remSizeIxPx) > 40 ? `${this._inputWidth}px` : "40rem",
            },
            innerInput: {
                "padding": "",
            },
        };
        return stylesObject;
    }
    get suggestionSeparators() {
        return "None";
    }
    get valueStateMessageText() {
        return this.getSlottedNodes("valueStateMessage").map(el => el.cloneNode(true));
    }
    get shouldDisplayOnlyValueStateMessage() {
        return this.hasValueStateMessage && !this.readonly && !this.open && this.focused;
    }
    get shouldDisplayDefaultValueStateMessage() {
        return !this.valueStateMessage.length && this.hasValueStateMessage;
    }
    get hasValueState() {
        return this.valueState !== ValueState$1.None;
    }
    get hasValueStateMessage() {
        return this.hasValueState && this.valueState !== ValueState$1.Success
            && (!this._inputIconFocused // Handles the cases when valueStateMessage is forwarded (from datepicker e.g.)
                || !!(this._isPhone && this.Suggestions)); // Handles Input with suggestions on mobile
    }
    get valueStateText() {
        return this.valueState !== ValueState$1.None ? this.valueStateTextMappings()[this.valueState] : undefined;
    }
    get suggestionsText() {
        return Input_1.i18nBundle.getText(INPUT_SUGGESTIONS);
    }
    get availableSuggestionsCount() {
        if (this.showSuggestions && (this.value || this.Suggestions.isOpened())) {
            const nonGroupItems = this.suggestionObjects.filter(item => !item.groupItem);
            switch (nonGroupItems.length) {
                case 0:
                    return Input_1.i18nBundle.getText(INPUT_SUGGESTIONS_NO_HIT);
                case 1:
                    return Input_1.i18nBundle.getText(INPUT_SUGGESTIONS_ONE_HIT);
                default:
                    return Input_1.i18nBundle.getText(INPUT_SUGGESTIONS_MORE_HITS, nonGroupItems.length);
            }
        }
        return undefined;
    }
    get step() {
        return this.isTypeNumber ? "any" : undefined;
    }
    get _isPhone() {
        return isPhone();
    }
    get _isSuggestionsFocused() {
        return !this.focused && this.Suggestions && this.Suggestions.isOpened();
    }
    /**
     * Returns the placeholder value.
     * @protected
     */
    get _placeholder() {
        return this.placeholder;
    }
    /**
     * This method is relevant for sap_horizon theme only
     */
    get _valueStateInputIcon() {
        const iconPerValueState = {
            Error: `<path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20ZM7.70711 13.7071C7.31658 14.0976 6.68342 14.0976 6.29289 13.7071C5.90237 13.3166 5.90237 12.6834 6.29289 12.2929L8.58579 10L6.29289 7.70711C5.90237 7.31658 5.90237 6.68342 6.29289 6.29289C6.68342 5.90237 7.31658 5.90237 7.70711 6.29289L10 8.58579L12.2929 6.29289C12.6834 5.90237 13.3166 5.90237 13.7071 6.29289C14.0976 6.68342 14.0976 7.31658 13.7071 7.70711L11.4142 10L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L10 11.4142L7.70711 13.7071Z" fill="#EE3939"/>`,
            Warning: `<path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M11.8619 0.49298C11.6823 0.187541 11.3544 0 11 0C10.6456 0 10.3177 0.187541 10.1381 0.49298L0.138066 17.493C-0.0438112 17.8022 -0.0461447 18.1851 0.13195 18.4965C0.310046 18.8079 0.641283 19 1 19H21C21.3587 19 21.69 18.8079 21.868 18.4965C22.0461 18.1851 22.0438 17.8022 21.8619 17.493L11.8619 0.49298ZM11 6C11.5523 6 12 6.44772 12 7V10C12 10.5523 11.5523 11 11 11C10.4477 11 10 10.5523 10 10V7C10 6.44772 10.4477 6 11 6ZM11 16C11.8284 16 12.5 15.3284 12.5 14.5C12.5 13.6716 11.8284 13 11 13C10.1716 13 9.5 13.6716 9.5 14.5C9.5 15.3284 10.1716 16 11 16Z" fill="#F58B00"/>`,
            Success: `<path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10ZM14.7071 6.29289C14.3166 5.90237 13.6834 5.90237 13.2929 6.29289L8 11.5858L6.70711 10.2929C6.31658 9.90237 5.68342 9.90237 5.29289 10.2929C4.90237 10.6834 4.90237 11.3166 5.29289 11.7071L7.29289 13.7071C7.68342 14.0976 8.31658 14.0976 8.70711 13.7071L14.7071 7.70711C15.0976 7.31658 15.0976 6.68342 14.7071 6.29289Z" fill="#36A41D"/>`,
            Information: `<path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M3 0C1.34315 0 0 1.34315 0 3V15C0 16.6569 1.34315 18 3 18H15C16.6569 18 18 16.6569 18 15V3C18 1.34315 16.6569 0 15 0H3ZM9 6.5C9.82843 6.5 10.5 5.82843 10.5 5C10.5 4.17157 9.82843 3.5 9 3.5C8.17157 3.5 7.5 4.17157 7.5 5C7.5 5.82843 8.17157 6.5 9 6.5ZM9 8.5C9.55228 8.5 10 8.94772 10 9.5V13.5C10 14.0523 9.55228 14.5 9 14.5C8.44771 14.5 8 14.0523 8 13.5V9.5C8 8.94772 8.44771 8.5 9 8.5Z" fill="#1B90FF"/>`,
        };
        if (this.valueState !== ValueState$1.None) {
            return `
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 20 20" fill="none">
				${iconPerValueState[this.valueState]};
			</svg>
			`;
        }
        return "";
    }
    get _valueStatePopoverHorizontalAlign() {
        return this.effectiveDir !== "rtl" ? "Left" : "Right";
    }
    /**
     * This method is relevant for sap_horizon theme only
     */
    get _valueStateMessageInputIcon() {
        const iconPerValueState = {
            Error: "error",
            Warning: "alert",
            Success: "sys-enter-2",
            Information: "information",
        };
        return this.valueState !== ValueState$1.None ? iconPerValueState[this.valueState] : "";
    }
    /**
     * Returns the caret position inside the native input
     * @protected
     */
    getCaretPosition() {
        return getCaretPosition(this.nativeInput);
    }
    /**
     * Sets the caret to a certain position inside the native input
     * @protected
     * @param pos
     */
    setCaretPosition(pos) {
        setCaretPosition(this.nativeInput, pos);
    }
    /**
     * Removes the fractional part of floating-point number.
     * @param {string} value the numeric value of Input of type "Number"
     */
    removeFractionalPart(value) {
        if (value.includes(".")) {
            return value.slice(0, value.indexOf("."));
        }
        if (value.includes(",")) {
            return value.slice(0, value.indexOf(","));
        }
        return value;
    }
    static async onDefine() {
        const Suggestions = getFeature("InputSuggestions");
        [Input_1.i18nBundle] = await Promise.all([
            getI18nBundle("@ui5/webcomponents"),
            Suggestions ? Suggestions.init() : Promise.resolve(),
        ]);
    }
};
__decorate$a([
    property({ type: Boolean })
], Input.prototype, "disabled", void 0);
__decorate$a([
    property({ type: Boolean })
], Input.prototype, "highlight", void 0);
__decorate$a([
    property()
], Input.prototype, "placeholder", void 0);
__decorate$a([
    property({ type: Boolean })
], Input.prototype, "readonly", void 0);
__decorate$a([
    property({ type: Boolean })
], Input.prototype, "required", void 0);
__decorate$a([
    property({ type: Boolean })
], Input.prototype, "noTypeahead", void 0);
__decorate$a([
    property({ type: InputType$1, defaultValue: InputType$1.Text })
], Input.prototype, "type", void 0);
__decorate$a([
    property()
], Input.prototype, "value", void 0);
__decorate$a([
    property({ noAttribute: true })
], Input.prototype, "_innerValue", void 0);
__decorate$a([
    property({ type: ValueState$1, defaultValue: ValueState$1.None })
], Input.prototype, "valueState", void 0);
__decorate$a([
    property()
], Input.prototype, "name", void 0);
__decorate$a([
    property({ type: Boolean })
], Input.prototype, "showSuggestions", void 0);
__decorate$a([
    property({ validator: Integer })
], Input.prototype, "maxlength", void 0);
__decorate$a([
    property()
], Input.prototype, "accessibleName", void 0);
__decorate$a([
    property({ defaultValue: "" })
], Input.prototype, "accessibleNameRef", void 0);
__decorate$a([
    property({ type: Boolean })
], Input.prototype, "showClearIcon", void 0);
__decorate$a([
    property({ type: Boolean })
], Input.prototype, "effectiveShowClearIcon", void 0);
__decorate$a([
    property({ type: Boolean })
], Input.prototype, "focused", void 0);
__decorate$a([
    property({ type: Boolean })
], Input.prototype, "openOnMobile", void 0);
__decorate$a([
    property({ type: Boolean })
], Input.prototype, "open", void 0);
__decorate$a([
    property({ type: Boolean })
], Input.prototype, "_forceOpen", void 0);
__decorate$a([
    property({ type: Boolean })
], Input.prototype, "_isValueStateFocused", void 0);
__decorate$a([
    property({ type: Object, noAttribute: true })
], Input.prototype, "_inputAccInfo", void 0);
__decorate$a([
    property({ type: Object, noAttribute: true })
], Input.prototype, "_nativeInputAttributes", void 0);
__decorate$a([
    property({ validator: Integer })
], Input.prototype, "_inputWidth", void 0);
__decorate$a([
    property({ validator: Integer })
], Input.prototype, "_listWidth", void 0);
__decorate$a([
    property({ type: Boolean, noAttribute: true })
], Input.prototype, "_isPopoverOpen", void 0);
__decorate$a([
    property({ type: Boolean, noAttribute: true })
], Input.prototype, "_inputIconFocused", void 0);
__decorate$a([
    property({ type: String, noAttribute: true, defaultValue: undefined })
], Input.prototype, "_associatedLabelsTexts", void 0);
__decorate$a([
    property({ type: String, noAttribute: true, defaultValue: undefined })
], Input.prototype, "_accessibleLabelsRefTexts", void 0);
__decorate$a([
    slot({ type: HTMLElement, "default": true })
], Input.prototype, "suggestionItems", void 0);
__decorate$a([
    slot()
], Input.prototype, "icon", void 0);
__decorate$a([
    slot()
], Input.prototype, "formSupport", void 0);
__decorate$a([
    slot({
        type: HTMLElement,
        invalidateOnChildChange: true,
        cloned: true,
    })
], Input.prototype, "valueStateMessage", void 0);
Input = Input_1 = __decorate$a([
    customElement({
        tag: "ui5-input",
        languageAware: true,
        renderer: litRender,
        template: block0$c,
        staticAreaTemplate: block0$b,
        styles: styleData$e,
        staticAreaStyles: [styleData$d, styleData$c, styleData$b],
        get dependencies() {
            const Suggestions = getFeature("InputSuggestions");
            return [Popover$1, Icon$1].concat(Suggestions ? Suggestions.dependencies : []);
        },
    })
    /**
     * Fired when the input operation has finished by pressing Enter or on focusout.
     *
     * @event sap.ui.webc.main.Input#change
     * @public
     */
    ,
    event("change")
    /**
     * Fired when the value of the component changes at each keystroke,
     * and when a suggestion item has been selected.
     *
     * @event sap.ui.webc.main.Input#input
     * @public
     */
    ,
    event("input")
    /**
     * Fired when a suggestion item, that is displayed in the suggestion popup, is selected.
     *
     * @event sap.ui.webc.main.Input#suggestion-item-select
     * @param {HTMLElement} item The selected item.
     * @public
     */
    ,
    event("suggestion-item-select", {
        detail: {
            item: { type: HTMLElement },
        },
    })
    /**
     * Fired when the user navigates to a suggestion item via the ARROW keys,
     * as a preview, before the final selection.
     *
     * @event sap.ui.webc.main.Input#suggestion-item-preview
     * @param {HTMLElement} item The previewed suggestion item.
     * @param {HTMLElement} targetRef The DOM ref of the suggestion item.
     * @public
     * @since 1.0.0-rc.8
     */
    ,
    event("suggestion-item-preview", {
        detail: {
            item: { type: HTMLElement },
            targetRef: { type: HTMLElement },
        },
    })
    /**
     * Fired when the user scrolls the suggestion popover.
     *
     * @event sap.ui.webc.main.Input#suggestion-scroll
     * @param {Integer} scrollTop The current scroll position.
     * @param {HTMLElement} scrollContainer The scroll container.
     * @protected
     * @since 1.0.0-rc.8
     */
    ,
    event("suggestion-scroll", {
        detail: {
            scrollTop: { type: Integer },
            scrollContainer: { type: HTMLElement },
        },
    })
], Input);
Input.define();

/**
 * MessageStrip designs.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.MessageStripDesign
 */
var MessageStripDesign;
(function (MessageStripDesign) {
    /**
     * Message should be just an information
     * @public
     * @type {Information}
     */
    MessageStripDesign["Information"] = "Information";
    /**
     * Message is a success message
     * @public
     * @type {Positive}
     */
    MessageStripDesign["Positive"] = "Positive";
    /**
     * Message is an error
     * @public
     * @type {Negative}
     */
    MessageStripDesign["Negative"] = "Negative";
    /**
     * Message is a warning
     * @public
     * @type {Warning}
     */
    MessageStripDesign["Warning"] = "Warning";
})(MessageStripDesign || (MessageStripDesign = {}));
var MessageStripDesign$1 = MessageStripDesign;

/* eslint no-unused-vars: 0 */
function block0$a(context, tags, suffix) { return effectiveHtml `<div class="${o$2(this.classes.root)}" id="${l$1(this._id)}" role="note" aria-live="assertive" aria-labelledby="${l$1(this._id)}">${!this.hideIcon ? block1$8.call(this, context, tags, suffix) : undefined}<span class="ui5-hidden-text">${l$1(this.hiddenText)}</span><span class="ui5-message-strip-text"><slot></slot></span>${!this.hideCloseButton ? block4$5.call(this, context, tags, suffix) : undefined}</div>`; }
function block1$8(context, tags, suffix) { return effectiveHtml `<div class="ui5-message-strip-icon-wrapper" aria-hidden="true">${this.iconProvided ? block2$6.call(this, context, tags, suffix) : block3$5.call(this, context, tags, suffix)}</div>`; }
function block2$6(context, tags, suffix) { return effectiveHtml `<slot name="icon"></slot>`; }
function block3$5(context, tags, suffix) { return suffix ? effectiveHtml `<${scopeTag("ui5-icon", tags, suffix)} name="${l$1(this.standardIconName)}" class="ui5-message-strip-icon"></${scopeTag("ui5-icon", tags, suffix)}>` : effectiveHtml `<ui5-icon name="${l$1(this.standardIconName)}" class="ui5-message-strip-icon"></ui5-icon>`; }
function block4$5(context, tags, suffix) { return suffix ? effectiveHtml `<${scopeTag("ui5-button", tags, suffix)} icon="decline" design="Transparent" class="ui5-message-strip-close-button" tooltip="${l$1(this._closeButtonText)}" @click=${this._closeClick}></${scopeTag("ui5-button", tags, suffix)}>` : effectiveHtml `<ui5-button icon="decline" design="Transparent" class="ui5-message-strip-close-button" tooltip="${l$1(this._closeButtonText)}" @click=${this._closeClick}></ui5-button>`; }

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$w);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$v);
const styleData$a = { packageName: "@ui5/webcomponents", fileName: "themes/MessageStrip.css.ts", content: `.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host(:not([hidden])){display:inline-block;width:100%}.ui5-message-strip-root{width:100%;height:100%;display:flex;border-radius:var(--sapPopover_BorderCornerRadius);padding:var(--_ui5-v1-21-0-rc-5_message_strip_padding);border-width:var(--_ui5-v1-21-0-rc-5_message_strip_border_width);border-style:solid;box-sizing:border-box;position:relative}.ui5-message-strip-root-hide-icon{padding-inline:var(--_ui5-v1-21-0-rc-5_message_strip_padding_inline_no_icon);padding-block:var(--_ui5-v1-21-0-rc-5_message_strip_padding_block_no_icon)}.ui5-message-strip-root-hide-close-button{padding-inline-end:1rem}.ui5-message-strip-root--info{background-color:var(--sapInformationBackground);border-color:var(--sapMessage_InformationBorderColor);color:var(--sapTextColor)}.ui5-message-strip-root--info .ui5-message-strip-icon{color:var(--sapInformativeElementColor)}.ui5-message-strip-root--positive{background-color:var(--sapSuccessBackground);border-color:var(--sapMessage_SuccessBorderColor)}.ui5-message-strip-root--positive .ui5-message-strip-icon{color:var(--sapPositiveElementColor)}.ui5-message-strip-root--negative{background-color:var(--sapErrorBackground);border-color:var(--sapMessage_ErrorBorderColor)}.ui5-message-strip-root--negative .ui5-message-strip-icon{color:var(--sapNegativeElementColor)}.ui5-message-strip-root--warning{background-color:var(--sapWarningBackground);border-color:var(--sapMessage_WarningBorderColor)}.ui5-message-strip-root--warning .ui5-message-strip-icon{color:var(--sapCriticalElementColor)}.ui5-message-strip-icon-wrapper{position:absolute;top:var(--_ui5-v1-21-0-rc-5_message_strip_icon_top);inset-inline-start:.75rem;box-sizing:border-box}.ui5-message-strip-text{width:100%;color:var(--sapTextColor);line-height:1.2;font-family:"72override",var(--sapFontFamily);font-size:var(--sapFontSize)}.ui5-message-strip-close-button{height:1.625rem;min-height:1.625rem;position:absolute;top:var(--_ui5-v1-21-0-rc-5_message_strip_close_button_top);inset-inline-end:var(--_ui5-v1-21-0-rc-5_message_strip_close_button_right)}
` };

var __decorate$9 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MessageStrip_1;
var DesignClassesMapping;
(function (DesignClassesMapping) {
    DesignClassesMapping["Information"] = "ui5-message-strip-root--info";
    DesignClassesMapping["Positive"] = "ui5-message-strip-root--positive";
    DesignClassesMapping["Negative"] = "ui5-message-strip-root--negative";
    DesignClassesMapping["Warning"] = "ui5-message-strip-root--warning";
})(DesignClassesMapping || (DesignClassesMapping = {}));
var IconMapping;
(function (IconMapping) {
    IconMapping["Information"] = "information";
    IconMapping["Positive"] = "sys-enter-2";
    IconMapping["Negative"] = "error";
    IconMapping["Warning"] = "alert";
})(IconMapping || (IconMapping = {}));
/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-message-strip</code> component enables the embedding of app-related messages.
 * It displays 4 designs of messages, each with corresponding semantic color and icon: Information, Positive, Warning and Negative.
 * Each message can have a Close button, so that it can be removed from the UI, if needed.
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-message-strip</code> component, you can define whether it displays
 * an icon in the beginning and a close button. Moreover, its size and background
 * can be controlled with CSS.
 *
 * <h3>Keyboard Handling</h3>
 *
 * <h4>Fast Navigation</h4>
 * This component provides a build in fast navigation group which can be used via <code>F6 / Shift + F6</code> or <code> Ctrl + Alt(Option) + Down /  Ctrl + Alt(Option) + Up</code>.
 * In order to use this functionality, you need to import the following module:
 * <code>import "@ui5/webcomponents-base/dist/features/F6Navigation.js"</code>
 * <br><br>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/MessageStrip";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.MessageStrip
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-message-strip
 * @public
 * @since 0.9.0
 */
let MessageStrip = MessageStrip_1 = class MessageStrip extends UI5Element {
    _closeClick() {
        this.fireEvent("close");
    }
    static async onDefine() {
        MessageStrip_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
    static designAnnouncementMappings() {
        const getTranslation = (text) => {
            return MessageStrip_1.i18nBundle.getText(text);
        };
        return {
            Information: getTranslation(MESSAGE_STRIP_INFORMATION),
            Positive: getTranslation(MESSAGE_STRIP_SUCCESS),
            Negative: getTranslation(MESSAGE_STRIP_ERROR),
            Warning: getTranslation(MESSAGE_STRIP_WARNING),
        };
    }
    get hiddenText() {
        return `${MessageStrip_1.designAnnouncementMappings()[this.design]} ${this.hideCloseButton ? "" : this._closableText}`;
    }
    get _closeButtonText() {
        return MessageStrip_1.i18nBundle.getText(MESSAGE_STRIP_CLOSE_BUTTON);
    }
    get _closableText() {
        return MessageStrip_1.i18nBundle.getText(MESSAGE_STRIP_CLOSABLE);
    }
    get classes() {
        return {
            root: {
                "ui5-message-strip-root": true,
                "ui5-message-strip-root-hide-icon": this.hideIcon,
                "ui5-message-strip-root-hide-close-button": this.hideCloseButton,
                [this.designClasses]: true,
            },
        };
    }
    get iconProvided() {
        return this.icon.length > 0;
    }
    get standardIconName() {
        return IconMapping[this.design];
    }
    get designClasses() {
        return DesignClassesMapping[this.design];
    }
};
__decorate$9([
    property({
        type: MessageStripDesign$1,
        defaultValue: MessageStripDesign$1.Information,
    })
], MessageStrip.prototype, "design", void 0);
__decorate$9([
    property({ type: Boolean })
], MessageStrip.prototype, "hideIcon", void 0);
__decorate$9([
    property({ type: Boolean })
], MessageStrip.prototype, "hideCloseButton", void 0);
__decorate$9([
    slot()
], MessageStrip.prototype, "icon", void 0);
MessageStrip = MessageStrip_1 = __decorate$9([
    customElement({
        tag: "ui5-message-strip",
        languageAware: true,
        renderer: litRender,
        template: block0$a,
        styles: styleData$a,
        dependencies: [Icon$1, Button$1],
    })
    /**
     * Fired when the close button is pressed either with a
     * click/tap or by using the Enter or Space key.
     *
     * @event sap.ui.webc.main.MessageStrip#close
     * @public
     */
    ,
    event("close")
], MessageStrip);
MessageStrip.define();

const name$n = "resize-corner";
const pathData$n = "M384 224v32q0 12-10 22L182 470q-10 10-22 10h-32zM224 480l160-160v32q0 12-10 22l-96 96q-10 10-22 10h-32zm160-64v32q0 12-10 22t-22 10h-32z";
const ltr$n = false;
const collection$n = "SAP-icons-v4";
const packageName$n = "@ui5/webcomponents-icons";

registerIcon(name$n, { pathData: pathData$n, ltr: ltr$n, collection: collection$n, packageName: packageName$n });

const name$m = "resize-corner";
const pathData$m = "M202 512q-11 0-18.5-7.5T176 486q0-10 8-18l204-205q7-7 18-7t18.5 7.5T432 282t-7 18L220 505q-7 7-18 7zm128 0q-11 0-18.5-7.5T304 486q0-10 8-18l76-77q7-7 18-7t18.5 7.5T432 410t-7 18l-77 77q-7 7-18 7z";
const ltr$m = false;
const collection$m = "SAP-icons-v5";
const packageName$m = "@ui5/webcomponents-icons";

registerIcon(name$m, { pathData: pathData$m, ltr: ltr$m, collection: collection$m, packageName: packageName$m });

isLegacyThemeFamily() ? pathData$n : pathData$m;

/* eslint no-unused-vars: 0 */
function block0$9(context, tags, suffix) { return effectiveHtml `<section style="${styleMap(this.styles.root)}" class="${o$2(this.classes.root)}" role="${l$1(this._role)}" aria-modal="${l$1(this._ariaModal)}" aria-label="${l$1(this._ariaLabel)}" aria-labelledby="${l$1(this._ariaLabelledBy)}" @keydown=${this._onkeydown} @focusout=${this._onfocusout} @mouseup=${this._onmouseup} @mousedown=${this._onmousedown}><span class="first-fe" data-ui5-focus-trap tabindex="0" @focusin=${this.forwardToLast}></span>${this._displayHeader ? block1$7.call(this, context, tags, suffix) : undefined}<div style="${styleMap(this.styles.content)}" class="${o$2(this.classes.content)}"  @scroll="${this._scroll}" part="content"><slot></slot></div>${this.footer.length ? block10$2.call(this, context, tags, suffix) : undefined}${this._showResizeHandle ? block11$2.call(this, context, tags, suffix) : undefined}<span class="last-fe" data-ui5-focus-trap tabindex="0" @focusin=${this.forwardToFirst}></span></section> `; }
function block1$7(context, tags, suffix) { return effectiveHtml `<header><div class="ui5-popup-header-root" id="ui5-popup-header" role="group" aria-describedby=${l$1(this.effectiveAriaDescribedBy)} aria-roledescription=${l$1(this.ariaRoleDescriptionHeaderText)} tabindex="${l$1(this._headerTabIndex)}" @keydown="${this._onDragOrResizeKeyDown}" @mousedown="${this._onDragMouseDown}" part="header" state="${l$1(this.state)}">${this.hasValueState ? block2$5.call(this, context, tags, suffix) : undefined}${this.header.length ? block3$4.call(this, context, tags, suffix) : block4$4.call(this, context, tags, suffix)}${this.resizable ? block5$3.call(this, context, tags, suffix) : block8$2.call(this, context, tags, suffix)}</div></header>`; }
function block2$5(context, tags, suffix) { return suffix ? effectiveHtml `<${scopeTag("ui5-icon", tags, suffix)} class="ui5-dialog-value-state-icon" name="${l$1(this._dialogStateIcon)}"></${scopeTag("ui5-icon", tags, suffix)}>` : effectiveHtml `<ui5-icon class="ui5-dialog-value-state-icon" name="${l$1(this._dialogStateIcon)}"></ui5-icon>`; }
function block3$4(context, tags, suffix) { return effectiveHtml `<slot name="header"></slot>`; }
function block4$4(context, tags, suffix) { return effectiveHtml `<h1 id="ui5-popup-header-text" class="ui5-popup-header-text">${l$1(this.headerText)}</h1>`; }
function block5$3(context, tags, suffix) { return effectiveHtml `${this.draggable ? block6$2.call(this, context, tags, suffix) : block7$2.call(this, context, tags, suffix)}`; }
function block6$2(context, tags, suffix) { return effectiveHtml `<span id="${l$1(this._id)}-descr" aria-hidden="true" class="ui5-hidden-text">${l$1(this.ariaDescribedByHeaderTextDraggableAndResizable)}</span>`; }
function block7$2(context, tags, suffix) { return effectiveHtml `<span id="${l$1(this._id)}-descr" aria-hidden="true" class="ui5-hidden-text">${l$1(this.ariaDescribedByHeaderTextResizable)}</span>`; }
function block8$2(context, tags, suffix) { return effectiveHtml `${this.draggable ? block9$2.call(this, context, tags, suffix) : undefined}`; }
function block9$2(context, tags, suffix) { return effectiveHtml `<span id="${l$1(this._id)}-descr" aria-hidden="true" class="ui5-hidden-text">${l$1(this.ariaDescribedByHeaderTextDraggable)}</span>`; }
function block10$2(context, tags, suffix) { return effectiveHtml `<footer class="ui5-popup-footer-root" part="footer"><slot name="footer"></slot></footer>`; }
function block11$2(context, tags, suffix) { return suffix ? effectiveHtml `<${scopeTag("ui5-icon", tags, suffix)} name="resize-corner" class="ui5-popup-resize-handle" @mousedown="${this._onResizeMouseDown}"></${scopeTag("ui5-icon", tags, suffix)}>` : effectiveHtml `<ui5-icon name="resize-corner" class="ui5-popup-resize-handle" @mousedown="${this._onResizeMouseDown}"></ui5-icon>`; }

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$w);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$v);
const styleData$9 = { packageName: "@ui5/webcomponents", fileName: "themes/Dialog.css.ts", content: `.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host{min-width:20rem;min-height:6rem;max-height:94%;max-width:90%;flex-direction:column;box-shadow:var(--sapContent_Shadow3);border-radius:var(--sapElement_BorderCornerRadius)}:host([stretch]){width:90%;height:94%}:host([stretch][on-phone]){width:100%;height:100%;max-height:100%;max-width:100%;border-radius:0}:host([draggable]) .ui5-popup-header-root,:host([draggable]) ::slotted([slot="header"]){cursor:move}:host([draggable]) .ui5-popup-header-root *{cursor:auto}:host([draggable]) .ui5-popup-root{user-select:text}.ui5-popup-root{display:flex;flex-direction:column;max-width:100vw}.ui5-popup-header-root{position:relative}.ui5-popup-header-root:before{content:"";position:absolute;inset-block-start:auto;inset-block-end:0;inset-inline-start:0;inset-inline-end:0;height:var(--_ui5-v1-21-0-rc-5_dialog_header_state_line_height);background:var(--sapObjectHeader_BorderColor)}:host([state="Error"]) .ui5-popup-header-root:before{background:var(--sapErrorBorderColor)}:host([state="Information"]) .ui5-popup-header-root:before{background:var(--sapInformationBorderColor)}:host([state="Success"]) .ui5-popup-header-root:before{background:var(--sapSuccessBorderColor)}:host([state="Warning"]) .ui5-popup-header-root:before{background:var(--sapWarningBorderColor)}.ui5-dialog-value-state-icon{margin-inline-end:.5rem}:host([state="Error"]) .ui5-dialog-value-state-icon{color:var(--_ui5-v1-21-0-rc-5_dialog_header_error_state_icon_color)}:host([state="Information"]) .ui5-dialog-value-state-icon{color:var(--_ui5-v1-21-0-rc-5_dialog_header_information_state_icon_color)}:host([state="Success"]) .ui5-dialog-value-state-icon{color:var(--_ui5-v1-21-0-rc-5_dialog_header_success_state_icon_color)}:host([state="Warning"]) .ui5-dialog-value-state-icon{color:var(--_ui5-v1-21-0-rc-5_dialog_header_warning_state_icon_color)}.ui5-popup-header-root{outline:none}.ui5-popup-header-root:focus:after{content:"";position:absolute;left:var(--_ui5-v1-21-0-rc-5_dialog_header_focus_left_offset);bottom:var(--_ui5-v1-21-0-rc-5_dialog_header_focus_bottom_offset);right:var(--_ui5-v1-21-0-rc-5_dialog_header_focus_right_offset);top:var(--_ui5-v1-21-0-rc-5_dialog_header_focus_top_offset);border:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);border-radius:var(--_ui5-v1-21-0-rc-5_dialog_header_border_radius) var(--_ui5-v1-21-0-rc-5_dialog_header_border_radius) 0 0;pointer-events:none}:host([stretch]) .ui5-popup-content{width:100%;height:100%}.ui5-popup-content{min-height:var(--_ui5-v1-21-0-rc-5_dialog_content_min_height);flex:1 1 auto}.ui5-popup-resize-handle{position:absolute;bottom:var(--_ui5-v1-21-0-rc-5_dialog_resize_handle_bottom);inset-inline-end:var(--_ui5-v1-21-0-rc-5_dialog_resize_handle_right);cursor:var(--_ui5-v1-21-0-rc-5_dialog_resize_cursor);color:var(--_ui5-v1-21-0-rc-5_dialog_resize_handle_color)}::slotted([slot="footer"]){height:var(--_ui5-v1-21-0-rc-5_dialog_footer_height)}::slotted([slot="footer"][ui5-bar][design="Footer"]){border-top:none}::slotted([slot="header"][ui5-bar]){box-shadow:none}
` };

var __decorate$8 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Dialog_1;
/**
 * Defines the step size at which this component would change by when being dragged or resized with the keyboard.
 */
const STEP_SIZE = 16;
/**
 * Defines the icons corresponding to the dialog's state.
 */
const ICON_PER_STATE = {
    [ValueState$1.Error]: "error",
    [ValueState$1.Warning]: "alert",
    [ValueState$1.Success]: "sys-enter-2",
    [ValueState$1.Information]: "information",
};
/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>ui5-dialog</code> component is used to temporarily display some information in a
 * size-limited window in front of the regular app screen.
 * It is used to prompt the user for an action or a confirmation.
 * The <code>ui5-dialog</code> interrupts the current app processing as it is the only focused UI element and
 * the main screen is dimmed/blocked.
 * The dialog combines concepts known from other technologies where the windows have
 * names such as dialog box, dialog window, pop-up, pop-up window, alert box, or message box.
 * <br><br>
 * The <code>ui5-dialog</code> is modal, which means that an user action is required before it is possible to return to the parent window.
 * To open multiple dialogs, each dialog element should be separate in the markup. This will ensure the correct modal behavior. Avoid nesting dialogs within each other.
 * The content of the <code>ui5-dialog</code> is fully customizable.
 *
 * <h3>Structure</h3>
 * A <code>ui5-dialog</code> consists of a header, content, and a footer for action buttons.
 * The <code>ui5-dialog</code> is usually displayed at the center of the screen.
 * Its position can be changed by the user. To enable this, you need to set the property <code>draggable</code> accordingly.

 *
 * <h3>Responsive Behavior</h3>
 * The <code>stretch</code> property can be used to stretch the
 * <code>ui5-dialog</code> on full screen.
 *
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-dialog</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>header - Used to style the header of the component</li>
 * <li>content - Used to style the content of the component</li>
 * <li>footer - Used to style the footer of the component</li>
 * </ul>
 * <b>Note:</b> When a <code>ui5-bar</code> is used in the header or in the footer, you should remove the default dialog's paddings.
 * <br>
 * For more information see the sample "Bar in Header/Footer".

 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Dialog";</code>
 *
 * <b>Note: </b> We recommend placing popup-like components (<code>ui5-dialog</code> and <code>ui5-popover</code>)
 * outside any other components. Preferably, the popup-like components should be placed
 * in an upper level HTML element. Otherwise, in some cases the parent HTML elements can break
 * the position and/or z-index management of the popup-like components.
 *
 * <b>Note:</b> We don't recommend nesting popup-like components (<code>ui5-dialog</code>, <code>ui5-popover</code>).
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.Dialog
 * @extends sap.ui.webc.main.Popup
 * @tagname ui5-dialog
 * @public
 */
let Dialog = Dialog_1 = class Dialog extends Popup$1 {
    constructor() {
        super();
        this._draggedOrResized = false;
        this._revertSize = () => {
            Object.assign(this.style, {
                top: "",
                left: "",
                width: "",
                height: "",
            });
        };
        this._screenResizeHandler = this._screenResize.bind(this);
        this._dragMouseMoveHandler = this._onDragMouseMove.bind(this);
        this._dragMouseUpHandler = this._onDragMouseUp.bind(this);
        this._resizeMouseMoveHandler = this._onResizeMouseMove.bind(this);
        this._resizeMouseUpHandler = this._onResizeMouseUp.bind(this);
        this._dragStartHandler = this._handleDragStart.bind(this);
    }
    static async onDefine() {
        Dialog_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
    static _isHeader(element) {
        return element.classList.contains("ui5-popup-header-root") || element.getAttribute("slot") === "header";
    }
    /**
     * Shows the dialog.
     *
     * @param {boolean} [preventInitialFocus=false] Prevents applying the focus inside the popup
     * @public
     * @method
     * @name sap.ui.webc.main.Dialog#show
     * @async
     * @returns {Promise} Resolves when the dialog is open
     */
    async show(preventInitialFocus = false) {
        await super._open(preventInitialFocus);
    }
    get isModal() {
        return true;
    }
    get shouldHideBackdrop() {
        return false;
    }
    get _ariaLabelledBy() {
        let ariaLabelledById;
        if (this.headerText !== "" && !this._ariaLabel) {
            ariaLabelledById = "ui5-popup-header-text";
        }
        return ariaLabelledById;
    }
    get ariaRoleDescriptionHeaderText() {
        return (this.resizable || this.draggable) ? Dialog_1.i18nBundle.getText(DIALOG_HEADER_ARIA_ROLE_DESCRIPTION) : undefined;
    }
    get effectiveAriaDescribedBy() {
        return (this.resizable || this.draggable) ? `${this._id}-descr` : undefined;
    }
    get ariaDescribedByHeaderTextResizable() {
        return Dialog_1.i18nBundle.getText(DIALOG_HEADER_ARIA_DESCRIBEDBY_RESIZABLE);
    }
    get ariaDescribedByHeaderTextDraggable() {
        return Dialog_1.i18nBundle.getText(DIALOG_HEADER_ARIA_DESCRIBEDBY_DRAGGABLE);
    }
    get ariaDescribedByHeaderTextDraggableAndResizable() {
        return Dialog_1.i18nBundle.getText(DIALOG_HEADER_ARIA_DESCRIBEDBY_DRAGGABLE_RESIZABLE);
    }
    get _displayProp() {
        return "flex";
    }
    /**
     * Determines if the header should be shown.
     */
    get _displayHeader() {
        return this.header.length || this.headerText || this.draggable || this.resizable;
    }
    get _movable() {
        return !this.stretch && this.onDesktop && (this.draggable || this.resizable);
    }
    get _headerTabIndex() {
        return this._movable ? "0" : undefined;
    }
    get _showResizeHandle() {
        return this.resizable && this.onDesktop;
    }
    get _minHeight() {
        let minHeight = Number.parseInt(window.getComputedStyle(this.contentDOM).minHeight);
        const header = this._root.querySelector(".ui5-popup-header-root");
        if (header) {
            minHeight += header.offsetHeight;
        }
        const footer = this._root.querySelector(".ui5-popup-footer-root");
        if (footer) {
            minHeight += footer.offsetHeight;
        }
        return minHeight;
    }
    get hasValueState() {
        return this.state !== ValueState$1.None;
    }
    get _dialogStateIcon() {
        return ICON_PER_STATE[this.state];
    }
    get _role() {
        if (this.accessibleRole === PopupAccessibleRole$1.None) {
            return undefined;
        }
        if (this.state === ValueState$1.Error || this.state === ValueState$1.Warning) {
            return PopupAccessibleRole$1.AlertDialog.toLowerCase();
        }
        return this.accessibleRole.toLowerCase();
    }
    _show() {
        super._show();
        this._center();
    }
    onBeforeRendering() {
        super.onBeforeRendering();
        this._isRTL = this.effectiveDir === "rtl";
        this.onPhone = isPhone();
        this.onDesktop = isDesktop();
    }
    onAfterRendering() {
        super.onAfterRendering();
        if (!this.isOpen() && this.open) {
            this.show();
        }
        else if (this.isOpen() && !this.open) {
            this.close();
        }
    }
    onEnterDOM() {
        super.onEnterDOM();
        this._attachScreenResizeHandler();
        this.addEventListener("dragstart", this._dragStartHandler);
    }
    onExitDOM() {
        super.onExitDOM();
        this._detachScreenResizeHandler();
        this.removeEventListener("dragstart", this._dragStartHandler);
    }
    /**
     * @override
     */
    _resize() {
        super._resize();
        if (!this._draggedOrResized) {
            this._center();
        }
    }
    _screenResize() {
        this._center();
    }
    _attachScreenResizeHandler() {
        if (!this._screenResizeHandlerAttached) {
            window.addEventListener("resize", this._screenResizeHandler);
            this._screenResizeHandlerAttached = true;
        }
    }
    _detachScreenResizeHandler() {
        if (this._screenResizeHandlerAttached) {
            window.removeEventListener("resize", this._screenResizeHandler);
            this._screenResizeHandlerAttached = false; // prevent dialog from repositioning during resizing
        }
    }
    _center() {
        const height = window.innerHeight - this.offsetHeight, width = window.innerWidth - this.offsetWidth;
        Object.assign(this.style, {
            top: `${Math.round(height / 2)}px`,
            left: `${Math.round(width / 2)}px`,
        });
    }
    /**
     * Event handlers
     */
    _onDragMouseDown(e) {
        // allow dragging only on the header
        if (!this._movable || !this.draggable || !Dialog_1._isHeader(e.target)) {
            return;
        }
        e.preventDefault();
        const { top, left, } = this.getBoundingClientRect();
        const { width, height, } = window.getComputedStyle(this);
        Object.assign(this.style, {
            top: `${top}px`,
            left: `${left}px`,
            width: `${Math.round(Number.parseFloat(width) * 100) / 100}px`,
            height: `${Math.round(Number.parseFloat(height) * 100) / 100}px`,
        });
        this._x = e.clientX;
        this._y = e.clientY;
        this._draggedOrResized = true;
        this._attachMouseDragHandlers();
    }
    _onDragMouseMove(e) {
        e.preventDefault();
        const { clientX, clientY } = e;
        const calcX = this._x - clientX;
        const calcY = this._y - clientY;
        const { left, top, } = this.getBoundingClientRect();
        Object.assign(this.style, {
            left: `${Math.floor(left - calcX)}px`,
            top: `${Math.floor(top - calcY)}px`,
        });
        this._x = clientX;
        this._y = clientY;
    }
    _onDragMouseUp() {
        delete this._x;
        delete this._y;
        this._detachMouseDragHandlers();
    }
    _onDragOrResizeKeyDown(e) {
        if (!this._movable || !Dialog_1._isHeader(e.target)) {
            return;
        }
        if (this.draggable && [isUp, isDown, isLeft, isRight].some(key => key(e))) {
            this._dragWithEvent(e);
            return;
        }
        if (this.resizable && [isUpShift, isDownShift, isLeftShift, isRightShift].some(key => key(e))) {
            this._resizeWithEvent(e);
        }
    }
    _dragWithEvent(e) {
        const { top, left, width, height, } = this.getBoundingClientRect();
        let newPos = 0;
        let posDirection = "top";
        switch (true) {
            case isUp(e):
                newPos = top - STEP_SIZE;
                posDirection = "top";
                break;
            case isDown(e):
                newPos = top + STEP_SIZE;
                posDirection = "top";
                break;
            case isLeft(e):
                newPos = left - STEP_SIZE;
                posDirection = "left";
                break;
            case isRight(e):
                newPos = left + STEP_SIZE;
                posDirection = "left";
                break;
        }
        newPos = clamp(newPos, 0, posDirection === "left" ? window.innerWidth - width : window.innerHeight - height);
        this.style[posDirection] = `${newPos}px`;
    }
    _resizeWithEvent(e) {
        this._draggedOrResized = true;
        this.addEventListener("ui5-before-close", this._revertSize, { once: true });
        const { top, left } = this.getBoundingClientRect(), style = window.getComputedStyle(this), minWidth = Number.parseFloat(style.minWidth), maxWidth = window.innerWidth - left, maxHeight = window.innerHeight - top;
        let width = Number.parseFloat(style.width), height = Number.parseFloat(style.height);
        switch (true) {
            case isUpShift(e):
                height -= STEP_SIZE;
                break;
            case isDownShift(e):
                height += STEP_SIZE;
                break;
            case isLeftShift(e):
                width -= STEP_SIZE;
                break;
            case isRightShift(e):
                width += STEP_SIZE;
                break;
        }
        width = clamp(width, minWidth, maxWidth);
        height = clamp(height, this._minHeight, maxHeight);
        Object.assign(this.style, {
            width: `${width}px`,
            height: `${height}px`,
        });
    }
    _attachMouseDragHandlers() {
        window.addEventListener("mousemove", this._dragMouseMoveHandler);
        window.addEventListener("mouseup", this._dragMouseUpHandler);
    }
    _detachMouseDragHandlers() {
        window.removeEventListener("mousemove", this._dragMouseMoveHandler);
        window.removeEventListener("mouseup", this._dragMouseUpHandler);
    }
    _onResizeMouseDown(e) {
        if (!this._movable || !this.resizable) {
            return;
        }
        e.preventDefault();
        const { top, left, } = this.getBoundingClientRect();
        const { width, height, minWidth, } = window.getComputedStyle(this);
        this._initialX = e.clientX;
        this._initialY = e.clientY;
        this._initialWidth = Number.parseFloat(width);
        this._initialHeight = Number.parseFloat(height);
        this._initialTop = top;
        this._initialLeft = left;
        this._minWidth = Number.parseFloat(minWidth);
        this._cachedMinHeight = this._minHeight;
        Object.assign(this.style, {
            top: `${top}px`,
            left: `${left}px`,
        });
        this._draggedOrResized = true;
        this._attachMouseResizeHandlers();
    }
    _onResizeMouseMove(e) {
        const { clientX, clientY } = e;
        let newWidth, newLeft;
        if (this._isRTL) {
            newWidth = clamp(this._initialWidth - (clientX - this._initialX), this._minWidth, this._initialLeft + this._initialWidth);
            newLeft = clamp(this._initialLeft + (clientX - this._initialX), 0, this._initialX + this._initialWidth - this._minWidth);
        }
        else {
            newWidth = clamp(this._initialWidth + (clientX - this._initialX), this._minWidth, window.innerWidth - this._initialLeft);
        }
        const newHeight = clamp(this._initialHeight + (clientY - this._initialY), this._cachedMinHeight, window.innerHeight - this._initialTop);
        Object.assign(this.style, {
            height: `${newHeight}px`,
            width: `${newWidth}px`,
            left: newLeft ? `${newLeft}px` : undefined,
        });
    }
    _onResizeMouseUp() {
        delete this._initialX;
        delete this._initialY;
        delete this._initialWidth;
        delete this._initialHeight;
        delete this._initialTop;
        delete this._initialLeft;
        delete this._minWidth;
        delete this._cachedMinHeight;
        this._detachMouseResizeHandlers();
    }
    _handleDragStart(e) {
        if (this.draggable) {
            e.preventDefault();
        }
    }
    _attachMouseResizeHandlers() {
        window.addEventListener("mousemove", this._resizeMouseMoveHandler);
        window.addEventListener("mouseup", this._resizeMouseUpHandler);
        this.addEventListener("ui5-before-close", this._revertSize, { once: true });
    }
    _detachMouseResizeHandlers() {
        window.removeEventListener("mousemove", this._resizeMouseMoveHandler);
        window.removeEventListener("mouseup", this._resizeMouseUpHandler);
    }
};
__decorate$8([
    property()
], Dialog.prototype, "headerText", void 0);
__decorate$8([
    property({ type: Boolean })
], Dialog.prototype, "stretch", void 0);
__decorate$8([
    property({ type: Boolean })
], Dialog.prototype, "draggable", void 0);
__decorate$8([
    property({ type: Boolean })
], Dialog.prototype, "resizable", void 0);
__decorate$8([
    property({ type: ValueState$1, defaultValue: ValueState$1.None })
], Dialog.prototype, "state", void 0);
__decorate$8([
    property({ type: Boolean })
], Dialog.prototype, "onPhone", void 0);
__decorate$8([
    property({ type: Boolean })
], Dialog.prototype, "onDesktop", void 0);
__decorate$8([
    slot()
], Dialog.prototype, "header", void 0);
__decorate$8([
    slot()
], Dialog.prototype, "footer", void 0);
Dialog = Dialog_1 = __decorate$8([
    customElement({
        tag: "ui5-dialog",
        template: block0$9,
        styles: [
            styleData$o,
            styleData$g,
            styleData$9,
        ],
        dependencies: [
            Icon$1,
        ],
    })
], Dialog);
Dialog.define();

/**
 * Different link designs.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.LinkDesign
 */
var LinkDesign;
(function (LinkDesign) {
    /**
     * default type (no special styling)
     * @public
     * @type {Default}
     */
    LinkDesign["Default"] = "Default";
    /**
     * subtle type (appears as regular text, rather than a link)
     * @public
     * @type {Subtle}
     */
    LinkDesign["Subtle"] = "Subtle";
    /**
     * emphasized type
     * @public
     * @type {Emphasized}
     */
    LinkDesign["Emphasized"] = "Emphasized";
})(LinkDesign || (LinkDesign = {}));
var LinkDesign$1 = LinkDesign;

/* eslint no-unused-vars: 0 */
function block0$8(context, tags, suffix) { return effectiveHtml `<a class="ui5-link-root" role="${l$1(this.effectiveAccRole)}" href="${l$1(this.parsedRef)}" target="${l$1(this.target)}" rel="${l$1(this._rel)}" tabindex="${l$1(this.effectiveTabIndex)}" title="${l$1(this.title)}" ?disabled="${this.disabled}" aria-label="${l$1(this.ariaLabelText)}" aria-haspopup="${l$1(this.accessibilityAttributes.hasPopup)}" aria-expanded="${l$1(this.accessibilityAttributes.expanded)}" @focusin=${this._onfocusin} @focusout=${this._onfocusout} @click=${this._onclick} @keydown=${this._onkeydown} @keyup=${this._onkeyup}><slot></slot>${this.hasLinkType ? block1$6.call(this, context, tags, suffix) : undefined}</a>`; }
function block1$6(context, tags, suffix) { return effectiveHtml `<span class="ui5-hidden-text">${l$1(this.linkTypeText)}</span>`; }

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$w);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$v);
const styleData$8 = { packageName: "@ui5/webcomponents", fileName: "themes/Link.css.ts", content: `.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host(:not([hidden])){display:inline-flex}:host{max-width:100%;color:var(--sapLinkColor);font-family:var(--sapFontFamily);font-size:var(--sapFontSize);cursor:pointer;outline:none;text-decoration:var(--_ui5-v1-21-0-rc-5_link_text_decoration);text-shadow:var(--sapContent_TextShadow);white-space:nowrap;overflow-wrap:normal}:host(:hover){color:var(--sapLink_Hover_Color);text-decoration:var(--_ui5-v1-21-0-rc-5_link_hover_text_decoration)}:host(:active){color:var(--sapLink_Active_Color);text-decoration:var(--_ui5-v1-21-0-rc-5_link_active_text_decoration)}:host([disabled]){pointer-events:none}:host([disabled]) .ui5-link-root{text-shadow:none;outline:none;cursor:default;pointer-events:none;opacity:var(--sapContent_DisabledOpacity)}:host([design="Emphasized"]) .ui5-link-root{font-family:var(--sapFontBoldFamily)}:host([design="Subtle"]){color:var(--sapLink_SubtleColor);text-decoration:var(--_ui5-v1-21-0-rc-5_link_subtle_text_decoration)}:host([design="Subtle"]:hover:not(:active)){color:var(--sapLink_SubtleColor);text-decoration:var(--_ui5-v1-21-0-rc-5_link_subtle_text_decoration_hover)}:host([wrapping-type="Normal"]){white-space:normal;overflow-wrap:break-word}.ui5-link-root{max-width:100%;display:inline-block;position:relative;overflow:hidden;text-overflow:ellipsis;outline:none;white-space:inherit;overflow-wrap:inherit;text-decoration:inherit;color:inherit}:host .ui5-link-root{border:var(--_ui5-v1-21-0-rc-5_link_border);border-radius:var(--_ui5-v1-21-0-rc-5_link_focus_border-radius)}:host([focused]) .ui5-link-root,:host([design="Subtle"][focused]) .ui5-link-root{background-color:var(--_ui5-v1-21-0-rc-5_link_focus_background_color);border:var(--_ui5-v1-21-0-rc-5_link_border_focus);border-radius:var(--_ui5-v1-21-0-rc-5_link_focus_border-radius);text-shadow:none}:host([focused]),:host([design="Subtle"][focused]){color:var(--_ui5-v1-21-0-rc-5_link_focus_color);text-decoration:var(--_ui5-v1-21-0-rc-5_link_focus_text_decoration)}:host([focused]:hover:not(:active)){color:var(--_ui5-v1-21-0-rc-5_link_focused_hover_text_color);text-decoration:var(--_ui5-v1-21-0-rc-5_link_focused_hover_text_decoration)}
` };

var __decorate$7 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Link_1;
/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>ui5-link</code> is a hyperlink component that is used to navigate to other
 * apps and web pages, or to trigger actions.
 * It is a clickable text element, visualized in such a way that it stands out
 * from the standard text.
 * On hover, it changes its style to an underlined text to provide additional feedback to the user.
 *
 *
 * <h3>Usage</h3>
 *
 * You can set the <code>ui5-link</code> to be enabled or disabled.
 * <br><br>
 * To create a visual hierarchy in large lists of links, you can set the less important links as
 * <code>Subtle</code> or the more important ones as <code>Emphasized</code>,
 * by using the <code>design</code> property.
 * <br><br>
 * If the <code>href</code> property is set, the link behaves as the HTML
 * anchor tag (<code>&lt;a&gt;&lt;a&#47;&gt;</code>) and opens the specified URL in the given target frame (<code>target</code> property).
 * To specify where the linked content is opened, you can use the <code>target</code> property.
 *
 * <h3>Responsive behavior</h3>
 *
 * If there is not enough space, the text of the <code>ui5-link</code> becomes truncated.
 * If the <code>wrappingType</code> property is set to <code>"Normal"</code>, the text is displayed
 * on several lines instead of being truncated.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Link";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.Link
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-link
 * @public
 */
let Link = Link_1 = class Link extends UI5Element {
    constructor() {
        super();
        this._dummyAnchor = document.createElement("a");
    }
    onBeforeRendering() {
        const needsNoReferrer = this.target !== "_self"
            && this.href
            && this._isCrossOrigin();
        this._rel = needsNoReferrer ? "noreferrer noopener" : undefined;
    }
    _isCrossOrigin() {
        const loc = window.location;
        this._dummyAnchor.href = this.href;
        return !(this._dummyAnchor.hostname === loc.hostname
            && this._dummyAnchor.port === loc.port
            && this._dummyAnchor.protocol === loc.protocol);
    }
    get effectiveTabIndex() {
        if (this._tabIndex) {
            return this._tabIndex;
        }
        return (this.disabled || !this.textContent?.length) ? "-1" : "0";
    }
    get ariaLabelText() {
        return getEffectiveAriaLabelText(this);
    }
    get hasLinkType() {
        return this.design !== LinkDesign$1.Default;
    }
    static typeTextMappings() {
        return {
            "Subtle": LINK_SUBTLE,
            "Emphasized": LINK_EMPHASIZED,
        };
    }
    get linkTypeText() {
        return Link_1.i18nBundle.getText(Link_1.typeTextMappings()[this.design]);
    }
    get parsedRef() {
        return (this.href && this.href.length > 0) ? this.href : undefined;
    }
    get effectiveAccRole() {
        return this.accessibleRole.toLowerCase();
    }
    static async onDefine() {
        Link_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
    _onclick(e) {
        const { altKey, ctrlKey, metaKey, shiftKey, } = e;
        e.stopImmediatePropagation();
        markEvent(e, "link");
        const executeEvent = this.fireEvent("click", {
            altKey,
            ctrlKey,
            metaKey,
            shiftKey,
        }, true);
        if (!executeEvent) {
            e.preventDefault();
        }
    }
    _onfocusin(e) {
        markEvent(e, "link");
        this.focused = true;
    }
    _onfocusout() {
        this.focused = false;
    }
    _onkeydown(e) {
        if (isEnter(e) && !this.href) {
            this._onclick(e);
        }
        else if (isSpace(e)) {
            e.preventDefault();
        }
        markEvent(e, "link");
    }
    _onkeyup(e) {
        if (!isSpace(e)) {
            markEvent(e, "link");
            return;
        }
        this._onclick(e);
        if (this.href && !e.defaultPrevented) {
            const customEvent = new MouseEvent("click");
            customEvent.stopImmediatePropagation();
            this.getDomRef().dispatchEvent(customEvent);
        }
    }
};
__decorate$7([
    property({ type: Boolean })
], Link.prototype, "disabled", void 0);
__decorate$7([
    property()
], Link.prototype, "title", void 0);
__decorate$7([
    property()
], Link.prototype, "href", void 0);
__decorate$7([
    property()
], Link.prototype, "target", void 0);
__decorate$7([
    property({ type: LinkDesign$1, defaultValue: LinkDesign$1.Default })
], Link.prototype, "design", void 0);
__decorate$7([
    property({ type: WrappingType$1, defaultValue: WrappingType$1.None })
], Link.prototype, "wrappingType", void 0);
__decorate$7([
    property()
], Link.prototype, "accessibleName", void 0);
__decorate$7([
    property()
], Link.prototype, "accessibleNameRef", void 0);
__decorate$7([
    property({ defaultValue: "link" })
], Link.prototype, "accessibleRole", void 0);
__decorate$7([
    property({ type: Object })
], Link.prototype, "accessibilityAttributes", void 0);
__decorate$7([
    property({ noAttribute: true })
], Link.prototype, "_rel", void 0);
__decorate$7([
    property({ noAttribute: true })
], Link.prototype, "_tabIndex", void 0);
__decorate$7([
    property({ type: Boolean })
], Link.prototype, "focused", void 0);
Link = Link_1 = __decorate$7([
    customElement({
        tag: "ui5-link",
        languageAware: true,
        renderer: litRender,
        template: block0$8,
        styles: styleData$8,
    })
    /**
     * Fired when the component is triggered either with a mouse/tap
     * or by using the Enter key.
     *
     * @event sap.ui.webc.main.Link#click
     * @public
     * @allowPreventDefault
     * @param {Boolean} altKey Returns whether the "ALT" key was pressed when the event was triggered.
     * @param {Boolean} ctrlKey Returns whether the "CTRL" key was pressed when the event was triggered.
     * @param {Boolean} metaKey Returns whether the "META" key was pressed when the event was triggered.
     * @param {Boolean} shiftKey Returns whether the "SHIFT" key was pressed when the event was triggered.
     */
    ,
    event("click", {
        detail: {
            altKey: { type: Boolean },
            ctrlKey: { type: Boolean },
            metaKey: { type: Boolean },
            shiftKey: { type: Boolean },
        },
    })
], Link);
Link.define();

/* eslint no-unused-vars: 0 */
function block0$7(context, tags, suffix) { return effectiveHtml `<div class="${o$2(this.classes.root)}" role="region" aria-label="${l$1(this._getAriaLabel)}">${this._hasHeader ? block1$5.call(this, context, tags, suffix) : undefined}<div role="group" aria-label="${l$1(this._ariaCardContentLabel)}"><slot></slot></div></div>`; }
function block1$5(context, tags, suffix) { return effectiveHtml `<div class="ui5-card-header-root"><slot name="header"></slot></div>`; }

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$w);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$v);
const styleData$7 = { packageName: "@ui5/webcomponents", fileName: "themes/Card.css.ts", content: `.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host(:not([hidden])){display:inline-block;width:100%}.ui5-card-root{width:100%;height:100%;color:var(--sapGroup_TitleTextColor);background:var(--sapTile_Background);box-shadow:var(--_ui5-v1-21-0-rc-5_card_box_shadow);border-radius:var(--_ui5-v1-21-0-rc-5_card_border-radius);border:var(--_ui5-v1-21-0-rc-5_card_border);overflow:hidden;font-family:"72override",var(--sapFontFamily);font-size:var(--sapFontSize);box-sizing:border-box}.ui5-card-root.ui5-card--interactive:hover{box-shadow:var(--_ui5-v1-21-0-rc-5_card_hover_box_shadow)}.ui5-card-root.ui5-card--interactive:active{box-shadow:var(--_ui5-v1-21-0-rc-5_card_box_shadow)}.ui5-card-root.ui5-card--nocontent{height:auto}.ui5-card-root.ui5-card--nocontent .ui5-card-header-root{border-bottom:none}.ui5-card--nocontent ::slotted([ui5-card-header]){--_ui5-v1-21-0-rc-5_card_header_focus_bottom_radius: var(--_ui5-v1-21-0-rc-5_card_header_focus_radius)}.ui5-card-root .ui5-card-header-root{border-bottom:var(--_ui5-v1-21-0-rc-5_card_header_border)}
` };

var __decorate$6 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Card_1;
/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-card</code> is a component that represents information in the form of a
 * tile with separate header and content areas.
 * The content area of a <code>ui5-card</code> can be arbitrary HTML content.
 * The header can be used through slot <code>header</code>. For which there is a <code>ui5-card-header</code> component to achieve the card look and feel.
 *
 * Note: We recommend the usage of <code>ui5-card-header</code> for the header slot, so advantage can be taken for keyboard handling, styling and accessibility.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Card";</code>
 * <br>
 * <code>import "@ui5/webcomponents/dist/CardHeader.js";</code> (for <code>ui5-card-header</code>)
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.Card
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-card
 * @public
 * @appenddocs sap.ui.webc.main.CardHeader
 */
let Card = Card_1 = class Card extends UI5Element {
    get classes() {
        return {
            root: {
                "ui5-card-root": true,
                "ui5-card--interactive": this._hasHeader && this.header[0].interactive,
                "ui5-card--nocontent": !this.content.length,
            },
        };
    }
    get _hasHeader() {
        return !!this.header.length;
    }
    get _getAriaLabel() {
        const effectiveAriaLabelText = getEffectiveAriaLabelText(this), effectiveAriaLabel = effectiveAriaLabelText ? ` ${effectiveAriaLabelText}` : "";
        return Card_1.i18nBundle.getText(ARIA_ROLEDESCRIPTION_CARD) + effectiveAriaLabel;
    }
    get _ariaCardContentLabel() {
        return Card_1.i18nBundle.getText(ARIA_LABEL_CARD_CONTENT);
    }
    static async onDefine() {
        Card_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
};
__decorate$6([
    property()
], Card.prototype, "accessibleName", void 0);
__decorate$6([
    property()
], Card.prototype, "accessibleNameRef", void 0);
__decorate$6([
    slot({ type: HTMLElement, "default": true })
], Card.prototype, "content", void 0);
__decorate$6([
    slot({ type: HTMLElement, invalidateOnChildChange: true })
], Card.prototype, "header", void 0);
Card = Card_1 = __decorate$6([
    customElement({
        tag: "ui5-card",
        languageAware: true,
        renderer: litRender,
        template: block0$7,
        styles: styleData$7,
        dependencies: [Icon$1],
    })
], Card);
Card.define();

/* eslint no-unused-vars: 0 */
function block0$6(context, tags, suffix) { return effectiveHtml `<div id="${l$1(this._id)}--header" class="${o$2(this.classes.root)}" role="group" aria-roledescription="${l$1(this.ariaRoleDescription)}" @click="${this._click}" @keydown="${this._keydown}" @keyup="${this._keyup}" part="root"><div class="ui5-card-header-focusable-element" aria-labelledby="${l$1(this.ariaLabelledBy)}" role="${l$1(this.ariaRoleFocusableElement)}" data-sap-focus-ref tabindex="0">${this.hasAvatar ? block1$4.call(this, context, tags, suffix) : undefined}<div class="ui5-card-header-text"><div class="ui5-card-header-first-line">${this.titleText ? block2$4.call(this, context, tags, suffix) : undefined}${this.status ? block3$3.call(this, context, tags, suffix) : undefined}</div>${this.subtitleText ? block4$3.call(this, context, tags, suffix) : undefined}</div></div>${this.hasAction ? block5$2.call(this, context, tags, suffix) : undefined}</div></div>`; }
function block1$4(context, tags, suffix) { return effectiveHtml `<div id="${l$1(this._id)}-avatar" class="ui5-card-header-avatar" aria-label="${l$1(this.ariaCardAvatarLabel)}"><slot name="avatar"></slot></div>`; }
function block2$4(context, tags, suffix) { return effectiveHtml `<div id="${l$1(this._id)}-title" class="ui5-card-header-title" part="title" role="heading" aria-level="3">${l$1(this.titleText)}</div>`; }
function block3$3(context, tags, suffix) { return effectiveHtml `<div class="ui5-card-header-status"><span id="${l$1(this._id)}-status" part="status" dir="auto">${l$1(this.status)}</span></div>`; }
function block4$3(context, tags, suffix) { return effectiveHtml `<div id="${l$1(this._id)}-subtitle" class="ui5-card-header-subtitle" part="subtitle">${l$1(this.subtitleText)}</div>`; }
function block5$2(context, tags, suffix) { return effectiveHtml `<div class="ui5-card-header-action" @focusin="${this._actionsFocusin}" @focusout="${this._actionsFocusout}"><slot name="action"></slot></div>`; }

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$w);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$v);
const styleData$6 = { packageName: "@ui5/webcomponents", fileName: "themes/CardHeader.css.ts", content: `.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}.ui5-card-header{position:relative;display:flex;align-items:center;padding:var(--_ui5-v1-21-0-rc-5_card_header_padding);outline:none}:host([subtitleText]) .ui5-card-header{align-items:flex-start}.ui5-card-header.ui5-card-header-ff:not(.ui5-card-header-hide-focus):focus-within:before{outline:none;content:"";position:absolute;border:var(--_ui5-v1-21-0-rc-5_card_header_focus_border);pointer-events:none;top:var(--_ui5-v1-21-0-rc-5_card_header_focus_offset);left:var(--_ui5-v1-21-0-rc-5_card_header_focus_offset);right:var(--_ui5-v1-21-0-rc-5_card_header_focus_offset);bottom:var(--_ui5-v1-21-0-rc-5_card_header_focus_offset);border-top-left-radius:var(--_ui5-v1-21-0-rc-5_card_header_focus_radius);border-top-right-radius:var(--_ui5-v1-21-0-rc-5_card_header_focus_radius);border-bottom-left-radius:var(--_ui5-v1-21-0-rc-5_card_header_focus_bottom_radius);border-bottom-right-radius:var(--_ui5-v1-21-0-rc-5_card_header_focus_bottom_radius)}.ui5-card-header:not(.ui5-card-header-ff):not(.ui5-card-header-hide-focus):has(.ui5-card-header-focusable-element:focus):before{outline:none;content:"";position:absolute;border:var(--_ui5-v1-21-0-rc-5_card_header_focus_border);pointer-events:none;top:var(--_ui5-v1-21-0-rc-5_card_header_focus_offset);left:var(--_ui5-v1-21-0-rc-5_card_header_focus_offset);right:var(--_ui5-v1-21-0-rc-5_card_header_focus_offset);bottom:var(--_ui5-v1-21-0-rc-5_card_header_focus_offset);border-top-left-radius:var(--_ui5-v1-21-0-rc-5_card_header_focus_radius);border-top-right-radius:var(--_ui5-v1-21-0-rc-5_card_header_focus_radius);border-bottom-left-radius:var(--_ui5-v1-21-0-rc-5_card_header_focus_bottom_radius);border-bottom-right-radius:var(--_ui5-v1-21-0-rc-5_card_header_focus_bottom_radius)}.ui5-card-header-focusable-element{outline:none}.ui5-card-header-focusable-element{display:inherit;align-items:inherit;flex:1}.ui5-card-header.ui5-card-header--interactive:hover{cursor:pointer;background:var(--_ui5-v1-21-0-rc-5_card_header_hover_bg)}.ui5-card-header.ui5-card-header--active,.ui5-card-header.ui5-card-header--interactive:active{background:var(--_ui5-v1-21-0-rc-5_card_header_active_bg)}.ui5-card-header .ui5-card-header-text{flex:1;pointer-events:none}.ui5-card-header-first-line{display:flex;flex-flow:row;justify-content:space-between}.ui5-card-header-status{flex:none}.ui5-card-header .ui5-card-header-avatar{height:3rem;width:3rem;display:flex;align-items:center;justify-content:center;margin-inline-end:.75rem;pointer-events:none;align-self:flex-start}::slotted([ui5-icon]){width:1.5rem;height:1.5rem;color:var(--sapTile_IconColor)}::slotted(img[slot="avatar"]){width:100%;height:100%;border-radius:50%}.ui5-card-header .ui5-card-header-status{display:inline-block;font-family:"72override",var(--sapFontFamily);font-size:var(--sapFontSmallSize);color:var(--sapTile_TextColor);text-align:left;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;vertical-align:middle;margin-inline-start:1rem;margin-block-start:.125rem}.ui5-card-header .ui5-card-header-text .ui5-card-header-title{font-family:var(--_ui5-v1-21-0-rc-5_card_header_title_font_family);font-size:var(--_ui5-v1-21-0-rc-5_card_header_title_font_size);font-weight:var(--_ui5-v1-21-0-rc-5_card_header_title_font_weight);color:var(--sapTile_TitleTextColor);max-height:3.5rem;align-self:flex-end}.ui5-card-header .ui5-card-header-text .ui5-card-header-subtitle{font-family:"72override",var(--sapFontFamily);font-size:var(--sapFontSize);font-weight:400;color:var(--sapTile_TextColor);margin-top:var(--_ui5-v1-21-0-rc-5_card_header_subtitle_margin_top);max-height:2.1rem}.ui5-card-header .ui5-card-header-text .ui5-card-header-title,.ui5-card-header .ui5-card-header-text .ui5-card-header-subtitle{text-align:start;text-overflow:ellipsis;white-space:normal;word-wrap:break-word;overflow:hidden;-webkit-line-clamp:2;-webkit-box-orient:vertical;display:-webkit-box;max-width:100%}.ui5-card-header .ui5-card-header-text .ui5-card-header-title{-webkit-line-clamp:3}.ui5-card-header-action{display:flex;padding-inline-start:1rem;align-self:flex-start}
` };

var __decorate$5 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CardHeader_1;
/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-card-header</code> is a component, meant to be used as a header of the <code>ui5-card</code> component.
 * It displays valuable information, that can be defined with several properties, such as: <code>titleText</code>, <code>subtitleText</code>, <code>status</code>
 * and two slots: <code>avatar</code> and <code>action</code>.
 *
 * <h3>Keyboard handling</h3>
 * In case you enable <code>interactive</code> property, you can press the <code>ui5-card-header</code> by Space and Enter keys.
 *
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-card-header</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>root - Used to style the root DOM element of the CardHeader</li>
 * <li>title - Used to style the title of the CardHeader</li>
 * <li>subtitle - Used to style the subtitle of the CardHeader</li>
 * <li>status - Used to style the status of the CardHeader</li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/CardHeader";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.CardHeader
 * @implements sap.ui.webc.main.ICardHeader
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-card-header
 * @public
 * @since 1.0.0-rc.15
 */
let CardHeader = CardHeader_1 = class CardHeader extends UI5Element {
    get classes() {
        return {
            root: {
                "ui5-card-header": true,
                "ui5-card-header--interactive": this.interactive,
                "ui5-card-header--active": this.interactive && this._headerActive,
                "ui5-card-header-ff": isFirefox(),
            },
        };
    }
    get _root() {
        return this.shadowRoot.querySelector(".ui5-card-header");
    }
    get ariaRoleDescription() {
        return this.interactive ? CardHeader_1.i18nBundle.getText(ARIA_ROLEDESCRIPTION_INTERACTIVE_CARD_HEADER) : CardHeader_1.i18nBundle.getText(ARIA_ROLEDESCRIPTION_CARD_HEADER);
    }
    get ariaRoleFocusableElement() {
        return this.interactive ? "button" : null;
    }
    get ariaCardAvatarLabel() {
        return CardHeader_1.i18nBundle.getText(AVATAR_TOOLTIP);
    }
    get ariaLabelledBy() {
        const labels = [];
        if (this.titleText) {
            labels.push(`${this._id}-title`);
        }
        if (this.subtitleText) {
            labels.push(`${this._id}-subtitle`);
        }
        if (this.status) {
            labels.push(`${this._id}-status`);
        }
        if (this.hasAvatar) {
            labels.push(`${this._id}-avatar`);
        }
        return labels.length !== 0 ? labels.join(" ") : undefined;
    }
    get hasAvatar() {
        return !!this.avatar.length;
    }
    get hasAction() {
        return !!this.action.length;
    }
    static async onDefine() {
        CardHeader_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
    _actionsFocusin() {
        this._root.classList.add("ui5-card-header-hide-focus");
    }
    _actionsFocusout() {
        this._root.classList.remove("ui5-card-header-hide-focus");
    }
    _click(e) {
        // prevents the native browser "click" event from firing
        e.stopImmediatePropagation();
        if (this.interactive && this._root.contains(e.target)) {
            this.fireEvent("click");
        }
    }
    _keydown(e) {
        if (!this.interactive || !this._root.contains(e.target)) {
            return;
        }
        const enter = isEnter(e);
        const space = isSpace(e);
        this._headerActive = enter || space;
        if (enter) {
            this.fireEvent("click");
            return;
        }
        if (space) {
            e.preventDefault();
        }
    }
    _keyup(e) {
        if (!this.interactive || !this._root.contains(e.target)) {
            return;
        }
        const space = isSpace(e);
        this._headerActive = false;
        if (space) {
            this.fireEvent("click");
        }
    }
};
__decorate$5([
    property()
], CardHeader.prototype, "titleText", void 0);
__decorate$5([
    property()
], CardHeader.prototype, "subtitleText", void 0);
__decorate$5([
    property()
], CardHeader.prototype, "status", void 0);
__decorate$5([
    property({ type: Boolean })
], CardHeader.prototype, "interactive", void 0);
__decorate$5([
    property({ validator: Integer, defaultValue: 3 })
], CardHeader.prototype, "_ariaLevel", void 0);
__decorate$5([
    property({ type: Boolean, noAttribute: true })
], CardHeader.prototype, "_headerActive", void 0);
__decorate$5([
    slot()
], CardHeader.prototype, "avatar", void 0);
__decorate$5([
    slot()
], CardHeader.prototype, "action", void 0);
CardHeader = CardHeader_1 = __decorate$5([
    customElement({
        tag: "ui5-card-header",
        languageAware: true,
        renderer: litRender,
        template: block0$6,
        styles: styleData$6,
    })
    /**
     * Fired when the component is activated by mouse/tap or by using the Enter or Space key.
     * <br><br>
     * <b>Note:</b> The event would be fired only if the <code>interactive</code> property is set to true.
     * @event sap.ui.webc.main.CardHeader#click
     * @public
     */
    ,
    event("click")
], CardHeader);
CardHeader.define();

let curAnimationMode;
/**
 * Returns the animation mode - "full", "basic", "minimal" or "none".
 * @public
 * @returns { AnimationMode }
 */
const getAnimationMode = () => {
    if (curAnimationMode === undefined) {
        curAnimationMode = getAnimationMode$1();
    }
    return curAnimationMode;
};

/* eslint no-unused-vars: 0 */
function block0$5(context, tags, suffix) { return effectiveHtml `<div class="ui5-avatar-root" tabindex="${l$1(this.tabindex)}" data-sap-focus-ref @keyup=${this._onkeyup} @keydown=${this._onkeydown} @focusout=${this._onfocusout} @focusin=${this._onfocusin} @click=${this._onclick} role="${l$1(this._role)}" aria-haspopup="${l$1(this._ariaHasPopup)}" aria-label="${l$1(this.accessibleNameText)}" fallback-icon="${l$1(this._fallbackIcon)}">${this.hasImage ? block1$3.call(this, context, tags, suffix) : block2$3.call(this, context, tags, suffix)}<slot name="badge"></slot></div>`; }
function block1$3(context, tags, suffix) { return effectiveHtml `<slot></slot>`; }
function block2$3(context, tags, suffix) { return effectiveHtml `${this.icon ? block3$2.call(this, context, tags, suffix) : undefined}${this.initials ? block4$2.call(this, context, tags, suffix) : undefined}`; }
function block3$2(context, tags, suffix) { return suffix ? effectiveHtml `<${scopeTag("ui5-icon", tags, suffix)} class="ui5-avatar-icon" name="${l$1(this.icon)}"></${scopeTag("ui5-icon", tags, suffix)}>` : effectiveHtml `<ui5-icon class="ui5-avatar-icon" name="${l$1(this.icon)}"></ui5-icon>`; }
function block4$2(context, tags, suffix) { return suffix ? effectiveHtml `<span class="ui5-avatar-initials">${l$1(this.validInitials)}</span><${scopeTag("ui5-icon", tags, suffix)} class="ui5-avatar-icon ui5-avatar-icon-fallback" name="${l$1(this.fallbackIcon)}"></${scopeTag("ui5-icon", tags, suffix)}>` : effectiveHtml `<span class="ui5-avatar-initials">${l$1(this.validInitials)}</span><ui5-icon class="ui5-avatar-icon ui5-avatar-icon-fallback" name="${l$1(this.fallbackIcon)}"></ui5-icon>`; }

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$w);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => styleData$v);
const styleData$5 = { packageName: "@ui5/webcomponents", fileName: "themes/Avatar.css.ts", content: `:host(:not([hidden])){display:inline-block;box-sizing:border-box;position:relative}:host(:not([hidden]).ui5_hovered){opacity:.7}:host(:is([interactive]):not([disabled])){cursor:pointer}:host(:is([interactive][pressed]):not([hidden])){background:var(--sapButton_Active_Background);border-color:var(--sapButton_Active_BorderColor);color:var(--sapButton_Active_TextColor)}:host(:is([interactive][pressed]):not([hidden]):hover){background:var(--sapButton_Selected_Hover_Background);border-color:var(--sapButton_Selected_Hover_BorderColor);color:var(--sapButton_Selected_TextColor)}:host(:is([interactive]):not([hidden]):not([pressed]):not([disabled]):hover){box-shadow:var(--ui5-v1-21-0-rc-5-avatar-hover-box-shadow-offset)}:host(:is([interactive][focused]):not([hidden]):not([pressed])){outline:var(--_ui5-v1-21-0-rc-5_avatar_outline);outline-offset:var(--_ui5-v1-21-0-rc-5_avatar_focus_offset)}:host(:is([disabled])){opacity:var(--sapContent_DisabledOpacity)}:host{height:3rem;width:3rem;border-radius:50%;border:var(--ui5-v1-21-0-rc-5-avatar-initials-border);outline:none;color:var(--ui5-v1-21-0-rc-5-avatar-initials-color)}.ui5-avatar-root{display:flex;align-items:center;justify-content:center;outline:none;height:100%;width:100%}:host([_size="XS"]),:host([size="XS"]){height:2rem;width:2rem;min-height:2rem;min-width:2rem;font-size:var(--_ui5-v1-21-0-rc-5_avatar_fontsize_XS)}:host([_size="S"]),:host([size="S"]){min-height:3rem;min-width:3rem;font-size:var(--_ui5-v1-21-0-rc-5_avatar_fontsize_S)}:host([_size="M"]),:host([size="M"]){min-height:4rem;min-width:4rem;font-size:var(--_ui5-v1-21-0-rc-5_avatar_fontsize_M)}:host([_size="L"]),:host([size="L"]){min-height:5rem;min-width:5rem;font-size:var(--_ui5-v1-21-0-rc-5_avatar_fontsize_L)}:host([_size="XL"]),:host([size="XL"]){min-height:7rem;min-width:7rem;font-size:var(--_ui5-v1-21-0-rc-5_avatar_fontsize_XL)}:host .ui5-avatar-icon{height:var(--_ui5-v1-21-0-rc-5_avatar_fontsize_S);width:var(--_ui5-v1-21-0-rc-5_avatar_fontsize_S);color:inherit}:host([_size="XS"]) .ui5-avatar-icon,:host([size="XS"]) .ui5-avatar-icon{height:var(--_ui5-v1-21-0-rc-5_avatar_icon_XS);width:var(--_ui5-v1-21-0-rc-5_avatar_icon_XS)}:host([_size="S"]) .ui5-avatar-icon,:host([size="S"]) .ui5-avatar-icon{height:var(--_ui5-v1-21-0-rc-5_avatar_icon_S);width:var(--_ui5-v1-21-0-rc-5_avatar_icon_S)}:host([_size="M"]) .ui5-avatar-icon,:host([size="M"]) .ui5-avatar-icon{height:var(--_ui5-v1-21-0-rc-5_avatar_icon_M);width:var(--_ui5-v1-21-0-rc-5_avatar_icon_M)}:host([_size="L"]) .ui5-avatar-icon,:host([size="L"]) .ui5-avatar-icon{height:var(--_ui5-v1-21-0-rc-5_avatar_icon_L);width:var(--_ui5-v1-21-0-rc-5_avatar_icon_L)}:host([_size="XL"]) .ui5-avatar-icon,:host([size="XL"]) .ui5-avatar-icon{height:var(--_ui5-v1-21-0-rc-5_avatar_icon_XL);width:var(--_ui5-v1-21-0-rc-5_avatar_icon_XL)}::slotted(*){border-radius:50%;width:100%;height:100%;pointer-events:none}:host([shape="Square"]){border-radius:var(--ui5-v1-21-0-rc-5-avatar-border-radius)}:host([shape="Square"]) ::slotted(*){border-radius:calc(var(--ui5-v1-21-0-rc-5-avatar-border-radius) - var(--ui5-v1-21-0-rc-5-avatar-border-radius-img-deduction))}:host(:not([color-scheme])),:host(:not([_has-image])),:host([_color-scheme="Accent6"]),:host([ui5-avatar][color-scheme="Accent6"]){background-color:var(--ui5-v1-21-0-rc-5-avatar-accent6);color:var(--ui5-v1-21-0-rc-5-avatar-accent6-color);border-color:var(--ui5-v1-21-0-rc-5-avatar-accent6-border-color)}:host([_color-scheme="Accent1"]),:host([ui5-avatar][color-scheme="Accent1"]){background-color:var(--ui5-v1-21-0-rc-5-avatar-accent1);color:var(--ui5-v1-21-0-rc-5-avatar-accent1-color);border-color:var(--ui5-v1-21-0-rc-5-avatar-accent1-border-color)}:host([_color-scheme="Accent2"]),:host([ui5-avatar][color-scheme="Accent2"]){background-color:var(--ui5-v1-21-0-rc-5-avatar-accent2);color:var(--ui5-v1-21-0-rc-5-avatar-accent2-color);border-color:var(--ui5-v1-21-0-rc-5-avatar-accent2-border-color)}:host([_color-scheme="Accent3"]),:host([ui5-avatar][color-scheme="Accent3"]){background-color:var(--ui5-v1-21-0-rc-5-avatar-accent3);color:var(--ui5-v1-21-0-rc-5-avatar-accent3-color);border-color:var(--ui5-v1-21-0-rc-5-avatar-accent3-border-color)}:host([_color-scheme="Accent4"]),:host([ui5-avatar][color-scheme="Accent4"]){background-color:var(--ui5-v1-21-0-rc-5-avatar-accent4);color:var(--ui5-v1-21-0-rc-5-avatar-accent4-color);border-color:var(--ui5-v1-21-0-rc-5-avatar-accent4-border-color)}:host([_color-scheme="Accent5"]),:host([ui5-avatar][color-scheme="Accent5"]){background-color:var(--ui5-v1-21-0-rc-5-avatar-accent5);color:var(--ui5-v1-21-0-rc-5-avatar-accent5-color);border-color:var(--ui5-v1-21-0-rc-5-avatar-accent5-border-color)}:host([_color-scheme="Accent7"]),:host([ui5-avatar][color-scheme="Accent7"]){background-color:var(--ui5-v1-21-0-rc-5-avatar-accent7);color:var(--ui5-v1-21-0-rc-5-avatar-accent7-color);border-color:var(--ui5-v1-21-0-rc-5-avatar-accent7-border-color)}:host([_color-scheme="Accent8"]),:host([ui5-avatar][color-scheme="Accent8"]){background-color:var(--ui5-v1-21-0-rc-5-avatar-accent8);color:var(--ui5-v1-21-0-rc-5-avatar-accent8-color);border-color:var(--ui5-v1-21-0-rc-5-avatar-accent8-border-color)}:host([_color-scheme="Accent9"]),:host([ui5-avatar][color-scheme="Accent9"]){background-color:var(--ui5-v1-21-0-rc-5-avatar-accent9);color:var(--ui5-v1-21-0-rc-5-avatar-accent9-color);border-color:var(--ui5-v1-21-0-rc-5-avatar-accent9-border-color)}:host([_color-scheme="Accent10"]),:host([ui5-avatar][color-scheme="Accent10"]){background-color:var(--ui5-v1-21-0-rc-5-avatar-accent10);color:var(--ui5-v1-21-0-rc-5-avatar-accent10-color);border-color:var(--ui5-v1-21-0-rc-5-avatar-accent10-border-color)}:host([_color-scheme="Placeholder"]),:host([ui5-avatar][color-scheme="Placeholder"]){background-color:var(--ui5-v1-21-0-rc-5-avatar-placeholder);color:var(--ui5-v1-21-0-rc-5-avatar-placeholder-color);border-color:var(--ui5-v1-21-0-rc-5-avatar-placeholder-border-color)}:host([_has-image]){color:var(--ui5-v1-21-0-rc-5-avatar-accent10-color);background-color:transparent;vertical-align:middle}.ui5-avatar-initials{color:inherit}.ui5-avatar-icon~.ui5-avatar-initials,.ui5-avatar-icon~.ui5-avatar-icon-fallback{display:none}.ui5-avatar-initials:not(.ui5-avatar-initials-hidden)+.ui5-avatar-icon-fallback{display:none}.ui5-avatar-initials-hidden{position:absolute;visibility:hidden;z-index:0;pointer-events:none}::slotted([slot="badge"]){position:absolute;bottom:0;right:0;width:1.125rem;height:1.125rem;background:var(--sapButton_Emphasized_Background);border:var(--sapButton_Emphasized_Background);border-radius:1rem;color:var(--sapContent_BadgeTextColor);justify-content:center;font-family:"72override",var(--sapFontFamily);font-size:var(--sapFontSmallSize)}::slotted([ui5-badge][slot="badge"]){padding:.1875rem}:host([_size="L"]) ::slotted([slot="badge"]),:host([size="L"]) ::slotted([slot="badge"]){width:1.25rem;height:1.25rem}:host([_size="XL"]) ::slotted([slot="badge"]),:host([size="XL"]) ::slotted([slot="badge"]){padding:.375rem;width:1.75rem;height:1.75rem}:host([shape="Square"]) ::slotted([slot="badge"]){bottom:-.125rem;right:-.125rem}:host([_size="L"][shape="Square"]) ::slotted([slot="badge"]),:host([size="L"][shape="Square"]) ::slotted([slot="badge"]){bottom:-.1875rem;right:-.1875rem}:host([_size="XL"][shape="Square"]) ::slotted([slot="badge"]),:host([size="XL"][shape="Square"]) ::slotted([slot="badge"]){bottom:-.25rem;right:-.25rem}
` };

/**
 * Different types of AvatarSize.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.AvatarSize
 */
var AvatarSize;
(function (AvatarSize) {
    /**
     * component size - 2rem
     * font size - 1rem
     * @public
     * @type { XS }
     */
    AvatarSize["XS"] = "XS";
    /**
     * component size - 3rem
     * font size - 1.5rem
     * @public
     * @type { S }
     */
    AvatarSize["S"] = "S";
    /**
     * component size - 4rem
     * font size - 2rem
     * @public
     * @type { M }
     */
    AvatarSize["M"] = "M";
    /**
     * component size - 5rem
     * font size - 2.5rem
     * @public
     * @type { L }
     */
    AvatarSize["L"] = "L";
    /**
     * component size - 7rem
     * font size - 3rem
     * @public
     * @type { XL }
     */
    AvatarSize["XL"] = "XL";
})(AvatarSize || (AvatarSize = {}));
var AvatarSize$1 = AvatarSize;

/**
 * Different types of AvatarShape.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.AvatarShape
 */
var AvatarShape;
(function (AvatarShape) {
    /**
     * Circular shape.
     * @public
     * @type {Circle}
     */
    AvatarShape["Circle"] = "Circle";
    /**
     * Square shape.
     * @public
     * @type {Square}
     */
    AvatarShape["Square"] = "Square";
})(AvatarShape || (AvatarShape = {}));
var AvatarShape$1 = AvatarShape;

/**
 * Different types of AvatarColorScheme.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.main.types.AvatarColorScheme
 */
var AvatarColorScheme;
(function (AvatarColorScheme) {
    /**
     *
     * @public
     * @type {Accent1}
     */
    AvatarColorScheme["Accent1"] = "Accent1";
    /**
     *
     * @public
     * @type {Accent2}
     */
    AvatarColorScheme["Accent2"] = "Accent2";
    /**
     *
     * @public
     * @type {Accent3}
     */
    AvatarColorScheme["Accent3"] = "Accent3";
    /**
     *
     * @public
     * @type {Accent4}
     */
    AvatarColorScheme["Accent4"] = "Accent4";
    /**
     *
     * @public
     * @type {Accent5}
     */
    AvatarColorScheme["Accent5"] = "Accent5";
    /**
     *
     * @public
     * @type {Accent6}
     */
    AvatarColorScheme["Accent6"] = "Accent6";
    /**
     *
     * @public
     * @type {Accent7}
     */
    AvatarColorScheme["Accent7"] = "Accent7";
    /**
     *
     * @public
     * @type {Accent8}
     */
    AvatarColorScheme["Accent8"] = "Accent8";
    /**
     *
     * @public
     * @type {Accent9}
     */
    AvatarColorScheme["Accent9"] = "Accent9";
    /**
     *
     * @public
     * @type {Accent10}
     */
    AvatarColorScheme["Accent10"] = "Accent10";
    /**
     *
     * @public
     * @type {Placeholder}
     */
    AvatarColorScheme["Placeholder"] = "Placeholder";
})(AvatarColorScheme || (AvatarColorScheme = {}));
var AvatarColorScheme$1 = AvatarColorScheme;

const name$l = "employee";
const pathData$l = "M448 512H64V384q0-26 10-49.5t27.5-41T142 266t50-10h64q-27 0-50-10t-40.5-27.5T138 178t-10-50q0-26 10-49.5t27.5-41T206 10t50-10q26 0 49.5 10t41 27.5 27.5 41 10 49.5q0 27-10 50t-27.5 40.5-41 27.5-49.5 10h64q26 0 49.5 10t41 27.5 27.5 41 10 49.5v128zM96 384v96h320v-96q0-40-28-68t-68-28H192q-40 0-68 28t-28 68zm160-160q40 0 68-28t28-68-28-68-68-28-68 28-28 68 28 68 68 28zm32 192v-32h96v32h-96z";
const ltr$l = false;
const collection$l = "SAP-icons-v4";
const packageName$l = "@ui5/webcomponents-icons";

registerIcon(name$l, { pathData: pathData$l, ltr: ltr$l, collection: collection$l, packageName: packageName$l });

const name$k = "employee";
const pathData$k = "M342 255q48 23 77 67.5t29 99.5v32q0 11-7.5 18.5T422 480H90q-11 0-18.5-7.5T64 454v-32q0-55 29-99.5t77-67.5l-4-5q-19-17-28.5-40.5T128 160q0-27 10-50t27.5-40.5 41-27.5T256 32t49.5 10.5 41 28T374 111t10 49q0 27-11 52t-31 43zm-163-95q0 32 22.5 54.5T256 237t54.5-22.5T333 160t-22.5-54.5T256 83t-54.5 22.5T179 160zm51 181l-25-15q-13-7-13-19v-6q-34 17-55.5 49T115 422v7h115v-88zm167 81q0-40-21-72t-56-49v6q0 12-13 19l-26 15v88h116v-7zm-71-70q11 0 18.5 7.5T352 378t-7.5 18-18.5 7h-12q-11 0-18.5-7t-7.5-18 7.5-18.5T314 352h12z";
const ltr$k = false;
const collection$k = "SAP-icons-v5";
const packageName$k = "@ui5/webcomponents-icons";

registerIcon(name$k, { pathData: pathData$k, ltr: ltr$k, collection: collection$k, packageName: packageName$k });

isLegacyThemeFamily() ? pathData$l : pathData$k;

var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Avatar_1;
/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * An image-like component that has different display options for representing images and icons
 * in different shapes and sizes, depending on the use case.
 *
 * The shape can be circular or square. There are several predefined sizes, as well as an option to
 * set a custom size.
 *
 * <br><br>
 * <h3>Keyboard Handling</h3>
 *
 * <ul>
 * <li>[SPACE, ENTER, RETURN] - Fires the <code>click</code> event if the <code>interactive</code> property is set to true.</li>
 * <li>[SHIFT] - If [SPACE] is pressed, pressing [SHIFT] releases the component without triggering the click event.</li>
 * </ul>
 * <br><br>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Avatar.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.Avatar
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-avatar
 * @since 1.0.0-rc.6
 * @implements sap.ui.webc.main.IAvatar
 * @public
 */
let Avatar = Avatar_1 = class Avatar extends UI5Element {
    constructor() {
        super();
        this._handleResizeBound = this.handleResize.bind(this);
    }
    static async onDefine() {
        Avatar_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
    get tabindex() {
        return this._tabIndex || (this._interactive ? "0" : "-1");
    }
    /**
     * Returns the effective avatar size.
     * @readonly
     * @type {string}
     * @defaultValue "S"
     * @private
     */
    get _effectiveSize() {
        // we read the attribute, because the "size" property will always have a default value
        return this.getAttribute("size") || this._size;
    }
    /**
     * Returns the effective background color.
     * @readonly
     * @type {string}
     * @defaultValue "Accent6"
     * @private
     */
    get _effectiveBackgroundColor() {
        // we read the attribute, because the "background-color" property will always have a default value
        return this.getAttribute("color-scheme") || this._colorScheme;
    }
    get _role() {
        return this._interactive ? "button" : "img";
    }
    get _ariaHasPopup() {
        return this._getAriaHasPopup();
    }
    get _fallbackIcon() {
        if (this.fallbackIcon === "") {
            this.fallbackIcon = "employee";
        }
        return this.fallbackIcon;
    }
    get _interactive() {
        return this.interactive && !this.disabled;
    }
    get validInitials() {
        // initials should consist of only 1,2 or 3 latin letters
        const validInitials = /^[a-zA-Zà-üÀ-Ü]{1,3}$/, areInitialsValid = this.initials && validInitials.test(this.initials);
        if (areInitialsValid) {
            return this.initials;
        }
        return null;
    }
    get accessibleNameText() {
        if (this.accessibleName) {
            return this.accessibleName;
        }
        return Avatar_1.i18nBundle.getText(AVATAR_TOOLTIP) || undefined;
    }
    get hasImage() {
        this._hasImage = !!this.image.length;
        return this._hasImage;
    }
    get initialsContainer() {
        return this.getDomRef().querySelector(".ui5-avatar-initials");
    }
    onBeforeRendering() {
        this._onclick = this._interactive ? this._onClickHandler.bind(this) : undefined;
    }
    async onAfterRendering() {
        await renderFinished();
        if (this.initials && !this.icon) {
            this._checkInitials();
        }
    }
    onEnterDOM() {
        this.initialsContainer && ResizeHandler.register(this.initialsContainer, this._handleResizeBound);
    }
    onExitDOM() {
        this.initialsContainer && ResizeHandler.deregister(this.initialsContainer, this._handleResizeBound);
    }
    handleResize() {
        if (this.initials && !this.icon) {
            this._checkInitials();
        }
    }
    _checkInitials() {
        const avatar = this.getDomRef(), avatarInitials = avatar.querySelector(".ui5-avatar-initials");
        // if there aren`t initalts set - the fallBack icon should be shown
        if (!this.validInitials) {
            avatarInitials.classList.add("ui5-avatar-initials-hidden");
            return;
        }
        // if initials` width is bigger than the avatar, an icon should be shown inside the avatar
        avatarInitials && avatarInitials.classList.remove("ui5-avatar-initials-hidden");
        if (this.initials && this.initials.length === 3) {
            if (avatarInitials && avatarInitials.scrollWidth > avatar.scrollWidth) {
                avatarInitials.classList.add("ui5-avatar-initials-hidden");
            }
        }
    }
    _onClickHandler(e) {
        // prevent the native event and fire custom event to ensure the noConfict "ui5-click" is fired
        e.stopPropagation();
        this._fireClick();
    }
    _onkeydown(e) {
        if (!this._interactive) {
            return;
        }
        if (isEnter(e)) {
            this._fireClick();
        }
        if (isSpace(e)) {
            e.preventDefault(); // prevent scrolling
        }
    }
    _onkeyup(e) {
        if (this._interactive && !e.shiftKey && isSpace(e)) {
            this._fireClick();
        }
    }
    _fireClick() {
        this.fireEvent("click");
        this.pressed = !this.pressed;
    }
    _onfocusout() {
        this.focused = false;
    }
    _onfocusin() {
        if (this._interactive) {
            this.focused = true;
        }
    }
    _getAriaHasPopup() {
        if (!this._interactive || this.ariaHaspopup === "") {
            return;
        }
        return this.ariaHaspopup;
    }
};
__decorate$4([
    property({ type: Boolean })
], Avatar.prototype, "disabled", void 0);
__decorate$4([
    property({ type: Boolean })
], Avatar.prototype, "interactive", void 0);
__decorate$4([
    property({ type: Boolean })
], Avatar.prototype, "focused", void 0);
__decorate$4([
    property({ type: Boolean })
], Avatar.prototype, "pressed", void 0);
__decorate$4([
    property()
], Avatar.prototype, "icon", void 0);
__decorate$4([
    property()
], Avatar.prototype, "fallbackIcon", void 0);
__decorate$4([
    property()
], Avatar.prototype, "initials", void 0);
__decorate$4([
    property({ type: AvatarShape$1, defaultValue: AvatarShape$1.Circle })
], Avatar.prototype, "shape", void 0);
__decorate$4([
    property({ type: AvatarSize$1, defaultValue: AvatarSize$1.S })
], Avatar.prototype, "size", void 0);
__decorate$4([
    property({ type: AvatarSize$1, defaultValue: AvatarSize$1.S })
], Avatar.prototype, "_size", void 0);
__decorate$4([
    property({ type: AvatarColorScheme$1, defaultValue: AvatarColorScheme$1.Accent6 })
], Avatar.prototype, "colorScheme", void 0);
__decorate$4([
    property({ type: AvatarColorScheme$1, defaultValue: AvatarColorScheme$1.Accent6 })
], Avatar.prototype, "_colorScheme", void 0);
__decorate$4([
    property()
], Avatar.prototype, "accessibleName", void 0);
__decorate$4([
    property()
], Avatar.prototype, "ariaHaspopup", void 0);
__decorate$4([
    property({ noAttribute: true })
], Avatar.prototype, "_tabIndex", void 0);
__decorate$4([
    property({ type: Boolean })
], Avatar.prototype, "_hasImage", void 0);
__decorate$4([
    slot({ type: HTMLElement, "default": true })
], Avatar.prototype, "image", void 0);
__decorate$4([
    slot()
], Avatar.prototype, "badge", void 0);
Avatar = Avatar_1 = __decorate$4([
    customElement({
        tag: "ui5-avatar",
        languageAware: true,
        renderer: litRender,
        styles: styleData$5,
        template: block0$5,
        dependencies: [Icon$1],
    })
    /**
    * Fired on mouseup, space and enter if avatar is interactive
    * <b>Note:</b> The event will not be fired if the <code>disabled</code>
    * property is set to <code>true</code>.
    * @event
    * @private
    * @since 1.0.0-rc.11
    */
    ,
    event("click")
], Avatar);
Avatar.define();
var Avatar$1 = Avatar;

/* eslint no-unused-vars: 0 */
function block0$4(context, tags, suffix) { return effectiveHtml `<li part="native-li" data-sap-focus-ref tabindex="${l$1(this._effectiveTabIndex)}" class="${o$2(this.classes.main)}" @focusin="${this._onfocusin}" @focusout="${this._onfocusout}" @keyup="${this._onkeyup}" @keydown="${this._onkeydown}" @mouseup="${this._onmouseup}" @mousedown="${this._onmousedown}" @touchstart="${this._ontouchstart}" @touchend="${this._ontouchend}" @click="${this._onclick}" role="${l$1(this._accInfo.role)}" aria-expanded="${l$1(this._accInfo.ariaExpanded)}" title="${l$1(this.title)}" aria-level="${l$1(this._accInfo.ariaLevel)}" aria-haspopup="${l$1(this._accInfo.ariaHaspopup)}" aria-posinset="${l$1(this._accInfo.posinset)}" aria-roledescription="${l$1(this.accessibleRoleDescription)}" aria-setsize="${l$1(this._accInfo.setsize)}" aria-describedby="${l$1(this._id)}-invisibleText-describedby" aria-labelledby="${l$1(this._accessibleNameRef)}" aria-disabled="${l$1(this._ariaDisabled)}" aria-selected="${l$1(this._accInfo.ariaSelected)}" aria-checked="${l$1(this._accInfo.ariaChecked)}" aria-owns="${l$1(this._accInfo.ariaOwns)}">${this.placeSelectionElementBefore ? block1$2.call(this, context, tags, suffix) : undefined}<div part="content" id="${l$1(this._id)}-content" class="ui5-li-content">${this.hasImageContent ? block7$1.call(this, context, tags, suffix) : block8$1.call(this, context, tags, suffix)}${this.displayIconBegin ? block10$1.call(this, context, tags, suffix) : undefined}<div class="ui5-li-text-wrapper"><span part="title" class="ui5-li-title"><slot></slot></span>${this.description ? block11$1.call(this, context, tags, suffix) : undefined}${!this.typeActive ? block13$1.call(this, context, tags, suffix) : undefined}</div>${!this.description ? block14$1.call(this, context, tags, suffix) : undefined}</div>${this.displayIconEnd ? block16$1.call(this, context, tags, suffix) : undefined}${this.typeDetail ? block17$1.call(this, context, tags, suffix) : undefined}${this.typeNavigation ? block18$1.call(this, context, tags, suffix) : undefined}${this.navigated ? block19$1.call(this, context, tags, suffix) : undefined}${this.placeSelectionElementAfter ? block20$1.call(this, context, tags, suffix) : undefined}<span id="${l$1(this._id)}-invisibleText" class="ui5-hidden-text">${l$1(this._accInfo.listItemAriaLabel)}${l$1(this.accessibleName)}</span><span id="${l$1(this._id)}-invisibleText-describedby" class="ui5-hidden-text">${l$1(this._accInfo.ariaSelectedText)}</span></li> `; }
function block1$2(context, tags, suffix) { return effectiveHtml `${this.modeSingleSelect ? block2$2.call(this, context, tags, suffix) : undefined}${this.modeMultiSelect ? block3$1.call(this, context, tags, suffix) : undefined}${this.renderDeleteButton ? block4$1.call(this, context, tags, suffix) : undefined}`; }
function block2$2(context, tags, suffix) { return suffix ? effectiveHtml `<${scopeTag("ui5-radio-button", tags, suffix)} part="radio" ?disabled="${this.isInactive}" accessible-name="${l$1(this._accInfo.ariaLabelRadioButton)}" tabindex="-1" id="${l$1(this._id)}-singleSelectionElement" class="ui5-li-singlesel-radiobtn" ?checked="${this.selected}" @click="${this.onSingleSelectionComponentPress}"></${scopeTag("ui5-radio-button", tags, suffix)}>` : effectiveHtml `<ui5-radio-button part="radio" ?disabled="${this.isInactive}" accessible-name="${l$1(this._accInfo.ariaLabelRadioButton)}" tabindex="-1" id="${l$1(this._id)}-singleSelectionElement" class="ui5-li-singlesel-radiobtn" ?checked="${this.selected}" @click="${this.onSingleSelectionComponentPress}"></ui5-radio-button>`; }
function block3$1(context, tags, suffix) { return suffix ? effectiveHtml `<${scopeTag("ui5-checkbox", tags, suffix)} part="checkbox" ?disabled="${this.isInactive}" ?indeterminate=${this.indeterminate} tabindex="-1" id="${l$1(this._id)}-multiSelectionElement" class="ui5-li-multisel-cb" ?checked="${this.selected}" accessible-name="${l$1(this._accInfo.ariaLabel)}" @click="${this.onMultiSelectionComponentPress}"></${scopeTag("ui5-checkbox", tags, suffix)}>` : effectiveHtml `<ui5-checkbox part="checkbox" ?disabled="${this.isInactive}" ?indeterminate=${this.indeterminate} tabindex="-1" id="${l$1(this._id)}-multiSelectionElement" class="ui5-li-multisel-cb" ?checked="${this.selected}" accessible-name="${l$1(this._accInfo.ariaLabel)}" @click="${this.onMultiSelectionComponentPress}"></ui5-checkbox>`; }
function block4$1(context, tags, suffix) { return effectiveHtml `<div class="ui5-li-deletebtn">${this.hasDeleteButtonSlot ? block5$1.call(this, context, tags, suffix) : block6$1.call(this, context, tags, suffix)}</div>`; }
function block5$1(context, tags, suffix) { return effectiveHtml `<slot name="deleteButton"></slot>`; }
function block6$1(context, tags, suffix) { return suffix ? effectiveHtml `<${scopeTag("ui5-button", tags, suffix)} part="delete-button" tabindex="-1" data-sap-no-tab-ref id="${l$1(this._id)}-deleteSelectionElement" design="Transparent" icon="decline" ?disabled="${this.disableDeleteButton}" @click="${this.onDelete}" tooltip="${l$1(this.deleteText)}"></${scopeTag("ui5-button", tags, suffix)}>` : effectiveHtml `<ui5-button part="delete-button" tabindex="-1" data-sap-no-tab-ref id="${l$1(this._id)}-deleteSelectionElement" design="Transparent" icon="decline" ?disabled="${this.disableDeleteButton}" @click="${this.onDelete}" tooltip="${l$1(this.deleteText)}"></ui5-button>`; }
function block7$1(context, tags, suffix) { return effectiveHtml `<div class="ui5-li-imgContent"><slot name="imageContent"></slot></div>`; }
function block8$1(context, tags, suffix) { return effectiveHtml `${this.displayImage ? block9$1.call(this, context, tags, suffix) : undefined}`; }
function block9$1(context, tags, suffix) { return suffix ? effectiveHtml `<${scopeTag("ui5-avatar", tags, suffix)} shape="Square" class="ui5-li-img"><img src="${l$1(this.image)}" class="ui5-li-img-inner" /></${scopeTag("ui5-avatar", tags, suffix)}>` : effectiveHtml `<ui5-avatar shape="Square" class="ui5-li-img"><img src="${l$1(this.image)}" class="ui5-li-img-inner" /></ui5-avatar>`; }
function block10$1(context, tags, suffix) { return suffix ? effectiveHtml `<${scopeTag("ui5-icon", tags, suffix)} part="icon" name="${l$1(this.icon)}" class="ui5-li-icon" accessible-role="presentation" aria-hidden="true"></${scopeTag("ui5-icon", tags, suffix)}>` : effectiveHtml `<ui5-icon part="icon" name="${l$1(this.icon)}" class="ui5-li-icon" accessible-role="presentation" aria-hidden="true"></ui5-icon>`; }
function block11$1(context, tags, suffix) { return effectiveHtml `<div class="ui5-li-description-info-wrapper"><span part="description" class="ui5-li-desc">${l$1(this.description)}</span>${this.additionalText ? block12$1.call(this, context, tags, suffix) : undefined}</div>`; }
function block12$1(context, tags, suffix) { return effectiveHtml `<span part="additional-text" class="ui5-li-additional-text">${l$1(this.additionalText)}</span>`; }
function block13$1(context, tags, suffix) { return effectiveHtml `<span class="ui5-hidden-text">${l$1(this.type)}</span>`; }
function block14$1(context, tags, suffix) { return effectiveHtml `${this.additionalText ? block15$1.call(this, context, tags, suffix) : undefined}`; }
function block15$1(context, tags, suffix) { return effectiveHtml `<span part="additional-text" class="ui5-li-additional-text">${l$1(this.additionalText)}</span>`; }
function block16$1(context, tags, suffix) { return suffix ? effectiveHtml `<${scopeTag("ui5-icon", tags, suffix)} part="icon" name="${l$1(this.icon)}" class="ui5-li-icon" accessible-role="presentation" aria-hidden="true"></${scopeTag("ui5-icon", tags, suffix)}>` : effectiveHtml `<ui5-icon part="icon" name="${l$1(this.icon)}" class="ui5-li-icon" accessible-role="presentation" aria-hidden="true"></ui5-icon>`; }
function block17$1(context, tags, suffix) { return suffix ? effectiveHtml `<div class="ui5-li-detailbtn"><${scopeTag("ui5-button", tags, suffix)} part="detail-button" design="Transparent" icon="edit" @click="${this.onDetailClick}"></${scopeTag("ui5-button", tags, suffix)}></div>` : effectiveHtml `<div class="ui5-li-detailbtn"><ui5-button part="detail-button" design="Transparent" icon="edit" @click="${this.onDetailClick}"></ui5-button></div>`; }
function block18$1(context, tags, suffix) { return suffix ? effectiveHtml `<${scopeTag("ui5-icon", tags, suffix)} name ="slim-arrow-right"></${scopeTag("ui5-icon", tags, suffix)}>` : effectiveHtml `<ui5-icon name ="slim-arrow-right"></ui5-icon>`; }
function block19$1(context, tags, suffix) { return effectiveHtml `<div class="ui5-li-navigated"></div>`; }
function block20$1(context, tags, suffix) { return effectiveHtml `${this.modeSingleSelect ? block21$1.call(this, context, tags, suffix) : undefined}${this.modeMultiSelect ? block22$1.call(this, context, tags, suffix) : undefined}${this.renderDeleteButton ? block23.call(this, context, tags, suffix) : undefined}`; }
function block21$1(context, tags, suffix) { return suffix ? effectiveHtml `<${scopeTag("ui5-radio-button", tags, suffix)} part="radio" ?disabled="${this.isInactive}" accessible-name="${l$1(this._accInfo.ariaLabelRadioButton)}" tabindex="-1" id="${l$1(this._id)}-singleSelectionElement" class="ui5-li-singlesel-radiobtn" ?checked="${this.selected}" @click="${this.onSingleSelectionComponentPress}"></${scopeTag("ui5-radio-button", tags, suffix)}>` : effectiveHtml `<ui5-radio-button part="radio" ?disabled="${this.isInactive}" accessible-name="${l$1(this._accInfo.ariaLabelRadioButton)}" tabindex="-1" id="${l$1(this._id)}-singleSelectionElement" class="ui5-li-singlesel-radiobtn" ?checked="${this.selected}" @click="${this.onSingleSelectionComponentPress}"></ui5-radio-button>`; }
function block22$1(context, tags, suffix) { return suffix ? effectiveHtml `<${scopeTag("ui5-checkbox", tags, suffix)} part="checkbox" ?disabled="${this.isInactive}" ?indeterminate=${this.indeterminate} tabindex="-1" id="${l$1(this._id)}-multiSelectionElement" class="ui5-li-multisel-cb" ?checked="${this.selected}" accessible-name="${l$1(this._accInfo.ariaLabel)}" @click="${this.onMultiSelectionComponentPress}"></${scopeTag("ui5-checkbox", tags, suffix)}>` : effectiveHtml `<ui5-checkbox part="checkbox" ?disabled="${this.isInactive}" ?indeterminate=${this.indeterminate} tabindex="-1" id="${l$1(this._id)}-multiSelectionElement" class="ui5-li-multisel-cb" ?checked="${this.selected}" accessible-name="${l$1(this._accInfo.ariaLabel)}" @click="${this.onMultiSelectionComponentPress}"></ui5-checkbox>`; }
function block23(context, tags, suffix) { return effectiveHtml `<div class="ui5-li-deletebtn">${this.hasDeleteButtonSlot ? block24.call(this, context, tags, suffix) : block25.call(this, context, tags, suffix)}</div>`; }
function block24(context, tags, suffix) { return effectiveHtml `<slot name="deleteButton"></slot>`; }
function block25(context, tags, suffix) { return suffix ? effectiveHtml `<${scopeTag("ui5-button", tags, suffix)} part="delete-button" tabindex="-1" data-sap-no-tab-ref id="${l$1(this._id)}-deleteSelectionElement" design="Transparent" icon="decline" ?disabled="${this.disableDeleteButton}" @click="${this.onDelete}" tooltip="${l$1(this.deleteText)}"></${scopeTag("ui5-button", tags, suffix)}>` : effectiveHtml `<ui5-button part="delete-button" tabindex="-1" data-sap-no-tab-ref id="${l$1(this._id)}-deleteSelectionElement" design="Transparent" icon="decline" ?disabled="${this.disableDeleteButton}" @click="${this.onDelete}" tooltip="${l$1(this.deleteText)}"></ui5-button>`; }

var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @class
 * The <code>ui5-li</code> represents the simplest type of item for a <code>ui5-list</code>.
 *
 * This is a list item,
 * providing the most common use cases such as <code>text</code>,
 * <code>image</code> and <code>icon</code>.
 *
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-li</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>title - Used to style the title of the list item</li>
 * <li>description - Used to style the description of the list item</li>
 * <li>additional-text - Used to style the additionalText of the list item</li>
 * <li>icon - Used to style the icon of the list item</li>
 * <li>native-li - Used to style the main li tag of the list item</li>
 * <li>content - Used to style the content area of the list item</li>
 * <li>detail-button - Used to style the button rendered when the list item is of type detail</li>
 * <li>delete-button - Used to style the button rendered when the list item is in delete mode</li>
 * <li>radio - Used to style the radio button rendered when the list item is in single selection mode</li>
 * <li>checkbox - Used to style the checkbox rendered when the list item is in multiple selection mode</li>
 * </ul>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.StandardListItem
 * @extends sap.ui.webc.main.ListItem
 * @tagname ui5-li
 * @implements sap.ui.webc.main.IListItem
 * @public
 */
let StandardListItem = class StandardListItem extends ListItem$1 {
    onBeforeRendering() {
        super.onBeforeRendering();
        this.hasTitle = !!this.textContent;
        this._hasImageContent = this.hasImageContent;
    }
    get displayImage() {
        return !!this.image;
    }
    get displayIconBegin() {
        return !!(this.icon && !this.iconEnd);
    }
    get displayIconEnd() {
        return !!(this.icon && this.iconEnd);
    }
    get hasImageContent() {
        return !!this.imageContent.length;
    }
};
__decorate$3([
    property()
], StandardListItem.prototype, "description", void 0);
__decorate$3([
    property()
], StandardListItem.prototype, "icon", void 0);
__decorate$3([
    property({ type: Boolean })
], StandardListItem.prototype, "iconEnd", void 0);
__decorate$3([
    property()
], StandardListItem.prototype, "image", void 0);
__decorate$3([
    property()
], StandardListItem.prototype, "additionalText", void 0);
__decorate$3([
    property({ type: ValueState$1, defaultValue: ValueState$1.None })
], StandardListItem.prototype, "additionalTextState", void 0);
__decorate$3([
    property()
], StandardListItem.prototype, "accessibleName", void 0);
__decorate$3([
    property({ type: WrappingType$1, defaultValue: WrappingType$1.None })
], StandardListItem.prototype, "wrappingType", void 0);
__decorate$3([
    property({ type: Boolean })
], StandardListItem.prototype, "hasTitle", void 0);
__decorate$3([
    property({ type: Boolean })
], StandardListItem.prototype, "_hasImageContent", void 0);
__decorate$3([
    slot()
], StandardListItem.prototype, "imageContent", void 0);
StandardListItem = __decorate$3([
    customElement({
        tag: "ui5-li",
        template: block0$4,
        dependencies: [
            ...ListItem$1.dependencies,
            Icon$1,
            Avatar$1,
        ],
    })
], StandardListItem);
StandardListItem.define();
var StandardListItem$1 = StandardListItem;

const name$j = "search";
const pathData$j = "M470 426q10 9 10 22.5T470 471q-9 9-22 9t-23-9L308 353q-45 31-100 31-36 0-68-13.5T84 333t-38-56-14-69q0-36 14-68t38-56 56-38 68-14 68 14 56 38 38 56 14 68q0 28-8.5 53T353 308zm-262-74q30 0 56-11t45.5-30.5 31-46T352 208t-11.5-56-31-45.5-45.5-31T208 64t-56.5 11.5-46 31T75 152t-11 56 11 56.5 30.5 46 46 30.5 56.5 11z";
const ltr$j = true;
const accData$9 = ICON_SEARCH;
const collection$j = "SAP-icons-v4";
const packageName$j = "@ui5/webcomponents-icons";

registerIcon(name$j, { pathData: pathData$j, ltr: ltr$j, accData: accData$9, collection: collection$j, packageName: packageName$j });

const name$i = "search";
const pathData$i = "M473 436q7 7 7 18t-7.5 18.5T454 480q-10 0-18-8l-95-95q-51 39-117 39-40 0-75-15t-61-41-41-61-15-75 15-75 41-61 61-41 75-15 75 15 61 41 41 61 15 75q0 64-39 117zM83 224q0 30 11 55.5t30 44.5 44.5 30 55.5 11 55.5-11 44.5-30 30-44.5 11-55.5-11-55.5-30-44.5-44.5-30T224 83t-55.5 11-44.5 30-30 44.5T83 224z";
const ltr$i = true;
const accData$8 = ICON_SEARCH;
const collection$i = "SAP-icons-v5";
const packageName$i = "@ui5/webcomponents-icons";

registerIcon(name$i, { pathData: pathData$i, ltr: ltr$i, accData: accData$8, collection: collection$i, packageName: packageName$i });

isLegacyThemeFamily() ? pathData$j : pathData$i;

const name$h = "bell";
const pathData$h = "M32 416q0-7 15-21t31-40.5 25.5-67.5-1.5-101q-5-29 3-54.5t25-45 42-33T225 35q0-15 7-25t24-10q14 0 22.5 9t8.5 26q26 5 50 18t41 33 24.5 45.5T404 186q-12 60-1.5 101t27.5 67.5 33.5 40.5 16.5 21q0 14-9 23t-23 9H320q0 26-19 45t-45 19-45-19-19-45H64q-14 0-23-9t-9-23zm39 0h369q-10-11-25.5-30.5t-28-48.5-18-68 4.5-89q5-25-2.5-44T354 106q-19-23-42-32.5T256 64q-32 0-57.5 9.5T154 106q-10 11-18 30t-3 44q9 50 4 89t-16 68-25.5 48.5T71 416z";
const ltr$h = false;
const collection$h = "SAP-icons-v4";
const packageName$h = "@ui5/webcomponents-icons";

registerIcon(name$h, { pathData: pathData$h, ltr: ltr$h, collection: collection$h, packageName: packageName$h });

const name$g = "bell";
const pathData$g = "M475 374q5 7 5 16 0 11-7 18.5t-18 7.5H334q-5 27-27 45.5T256 480t-51-18.5-27-45.5H58q-11 0-18.5-7.5T32 390q0-10 6-16 1-1 8-9.5T61 341t14.5-35.5T82 260v-20q0-100 45-154t129-54 129.5 54T431 240v20q0 25 6.5 45.5T452 341t15 23.5 8 9.5zm-69-9q-11-20-19-46.5t-8-58.5v-20q0-32-5.5-60t-20-50-38-34.5T256 83t-59.5 12.5-38 34.5-20 50-5.5 60v20q0 32-8 58.5T106 365h300z";
const ltr$g = false;
const collection$g = "SAP-icons-v5";
const packageName$g = "@ui5/webcomponents-icons";

registerIcon(name$g, { pathData: pathData$g, ltr: ltr$g, collection: collection$g, packageName: packageName$g });

isLegacyThemeFamily() ? pathData$h : pathData$g;

const name$f = "overflow";
const pathData$f = "M448 192q26 0 45 19t19 45-19 45-45 19-45-19-19-45 19-45 45-19zm0 96q14 0 23-9t9-23-9-23-23-9-23 9-9 23 9 23 23 9zm-192-96q26 0 45 19t19 45-19 45-45 19-45-19-19-45 19-45 45-19zm0 96q14 0 23-9t9-23-9-23-23-9-23 9-9 23 9 23 23 9zM64 192q26 0 45 19t19 45-19 45-45 19-45-19-19-45 19-45 45-19zm0 96q14 0 23-9t9-23-9-23-23-9-23 9-9 23 9 23 23 9z";
const ltr$f = false;
const accData$7 = ICON_OVERFLOW;
const collection$f = "SAP-icons-v4";
const packageName$f = "@ui5/webcomponents-icons";

registerIcon(name$f, { pathData: pathData$f, ltr: ltr$f, accData: accData$7, collection: collection$f, packageName: packageName$f });

const name$e = "overflow";
const pathData$e = "M64 192q26 0 45 19t19 45-19 45-45 19-45-19-19-45 19-45 45-19zm192 0q26 0 45 19t19 45-19 45-45 19-45-19-19-45 19-45 45-19zm192 0q26 0 45 19t19 45-19 45-45 19-45-19-19-45 19-45 45-19z";
const ltr$e = false;
const accData$6 = ICON_OVERFLOW;
const collection$e = "SAP-icons-v5";
const packageName$e = "@ui5/webcomponents-icons";

registerIcon(name$e, { pathData: pathData$e, ltr: ltr$e, accData: accData$6, collection: collection$e, packageName: packageName$e });

isLegacyThemeFamily() ? pathData$f : pathData$e;

const name$d = "grid";
const pathData$d = "M394 362h55q14 0 22.5 9t8.5 23v54q0 14-8.5 23t-22.5 9h-55q-14 0-22.5-9t-8.5-23v-54q0-14 8.5-23t22.5-9zM228 197h55q14 0 22.5 9t8.5 23v54q0 13-9 22.5t-22 9.5h-55q-13 0-22-9.5t-9-22.5v-54q0-14 8.5-23t22.5-9zm135-79V64q0-14 8.5-23t22.5-9h55q14 0 22.5 9t8.5 23v54q0 13-9 22.5t-22 9.5h-55q-13 0-22-9.5t-9-22.5zm31 79h55q14 0 22.5 9t8.5 23v54q0 13-9 22.5t-22 9.5h-55q-13 0-22-9.5t-9-22.5v-54q0-14 8.5-23t22.5-9zM63 32h55q14 0 22.5 9t8.5 23v54q0 13-9 22.5t-22 9.5H63q-13 0-22-9.5T32 118V64q0-14 8.5-23T63 32zM32 229q0-14 8.5-23t22.5-9h55q14 0 22.5 9t8.5 23v54q0 13-9 22.5t-22 9.5H63q-13 0-22-9.5T32 283v-54zm31 133h55q14 0 22.5 9t8.5 23v54q0 13-9 22.5t-22 9.5H63q-13 0-22-9.5T32 448v-54q0-14 8.5-23t22.5-9zM228 32h55q14 0 22.5 9t8.5 23v54q0 13-9 22.5t-22 9.5h-55q-13 0-22-9.5t-9-22.5V64q0-14 8.5-23t22.5-9zm-31 362q0-14 8.5-23t22.5-9h55q14 0 22.5 9t8.5 23v54q0 13-9 22.5t-22 9.5h-55q-13 0-22-9.5t-9-22.5v-54z";
const ltr$d = false;
const collection$d = "SAP-icons-v4";
const packageName$d = "@ui5/webcomponents-icons";

registerIcon(name$d, { pathData: pathData$d, ltr: ltr$d, collection: collection$d, packageName: packageName$d });

const name$c = "grid";
const pathData$c = "M80 128q-20 0-34-14T32 80t14-34 34-14 34 14 14 34-14 34-34 14zm176 0q-20 0-34-14t-14-34 14-34 34-14 34 14 14 34-14 34-34 14zm176 0q-20 0-34-14t-14-34 14-34 34-14 34 14 14 34-14 34-34 14zM80 208q20 0 34 14t14 34-14 34-34 14-34-14-14-34 14-34 34-14zm176 0q20 0 34 14t14 34-14 34-34 14-34-14-14-34 14-34 34-14zm176 0q20 0 34 14t14 34-14 34-34 14-34-14-14-34 14-34 34-14zM80 384q20 0 34 14t14 34-14 34-34 14-34-14-14-34 14-34 34-14zm176 0q20 0 34 14t14 34-14 34-34 14-34-14-14-34 14-34 34-14zm176 0q20 0 34 14t14 34-14 34-34 14-34-14-14-34 14-34 34-14z";
const ltr$c = false;
const collection$c = "SAP-icons-v5";
const packageName$c = "@ui5/webcomponents-icons";

registerIcon(name$c, { pathData: pathData$c, ltr: ltr$c, collection: collection$c, packageName: packageName$c });

isLegacyThemeFamily() ? pathData$d : pathData$c;

/* eslint no-unused-vars: 0 */
function block0$3(context, tags, suffix) { return suffix ? effectiveHtml `<header class="${o$2(this.classes.wrapper)}" aria-label="${l$1(this._shellbarText)}" part="root"><div class="ui5-shellbar-overflow-container ui5-shellbar-overflow-container-left">${this.startButton.length ? block1$1.call(this, context, tags, suffix) : undefined}${this.hasMenuItems ? block2$1.call(this, context, tags, suffix) : undefined}${!this.hasMenuItems ? block8.call(this, context, tags, suffix) : undefined}${this.secondaryTitle ? block11.call(this, context, tags, suffix) : undefined}</div><div class="ui5-shellbar-overflow-container ui5-shellbar-overflow-container-middle">${this.showCoPilot ? block12.call(this, context, tags, suffix) : block15.call(this, context, tags, suffix)}</div><div class="ui5-shellbar-overflow-container ui5-shellbar-overflow-container-right"><div class="ui5-shellbar-overflow-container-right-child">${this.hasSearchField ? block16.call(this, context, tags, suffix) : undefined}${c(this.customItemsInfo, (item, index) => item._id || index, (item, index) => block19.call(this, context, tags, suffix, item, index))}${this.showNotifications ? block20.call(this, context, tags, suffix) : undefined}<${scopeTag("ui5-button", tags, suffix)} id="${l$1(this._id)}-item-5" style="${styleMap(this.styles.items.overflow)}" class="${o$2(this.classes.items.overflow)} ui5-shellbar-button ui5-shellbar-overflow-button-shown ui5-shellbar-overflow-button" icon="sap-icon://overflow" @click="${this._handleOverflowPress}" tooltip="${l$1(this._overflowText)}" .accessibilityAttributes=${l$1(this.accInfo.overflow.accessibilityAttributes)} data-ui5-stable="overflow"></${scopeTag("ui5-button", tags, suffix)}>${this.hasProfile ? block21.call(this, context, tags, suffix) : undefined}${this.showProductSwitch ? block22.call(this, context, tags, suffix) : undefined}</div></div></header> ` : effectiveHtml `<header class="${o$2(this.classes.wrapper)}" aria-label="${l$1(this._shellbarText)}" part="root"><div class="ui5-shellbar-overflow-container ui5-shellbar-overflow-container-left">${this.startButton.length ? block1$1.call(this, context, tags, suffix) : undefined}${this.hasMenuItems ? block2$1.call(this, context, tags, suffix) : undefined}${!this.hasMenuItems ? block8.call(this, context, tags, suffix) : undefined}${this.secondaryTitle ? block11.call(this, context, tags, suffix) : undefined}</div><div class="ui5-shellbar-overflow-container ui5-shellbar-overflow-container-middle">${this.showCoPilot ? block12.call(this, context, tags, suffix) : block15.call(this, context, tags, suffix)}</div><div class="ui5-shellbar-overflow-container ui5-shellbar-overflow-container-right"><div class="ui5-shellbar-overflow-container-right-child">${this.hasSearchField ? block16.call(this, context, tags, suffix) : undefined}${c(this.customItemsInfo, (item, index) => item._id || index, (item, index) => block19.call(this, context, tags, suffix, item, index))}${this.showNotifications ? block20.call(this, context, tags, suffix) : undefined}<ui5-button id="${l$1(this._id)}-item-5" style="${styleMap(this.styles.items.overflow)}" class="${o$2(this.classes.items.overflow)} ui5-shellbar-button ui5-shellbar-overflow-button-shown ui5-shellbar-overflow-button" icon="sap-icon://overflow" @click="${this._handleOverflowPress}" tooltip="${l$1(this._overflowText)}" .accessibilityAttributes=${l$1(this.accInfo.overflow.accessibilityAttributes)} data-ui5-stable="overflow"></ui5-button>${this.hasProfile ? block21.call(this, context, tags, suffix) : undefined}${this.showProductSwitch ? block22.call(this, context, tags, suffix) : undefined}</div></div></header> `; }
function block1$1(context, tags, suffix) { return effectiveHtml `<slot name="startButton"></slot>`; }
function block2$1(context, tags, suffix) { return effectiveHtml `${!this.showLogoInMenuButton ? block3.call(this, context, tags, suffix) : undefined}${this.showTitleInMenuButton ? block4.call(this, context, tags, suffix) : undefined}${this.showMenuButton ? block5.call(this, context, tags, suffix) : undefined}`; }
function block3(context, tags, suffix) { return effectiveHtml `<span class="ui5-shellbar-logo" role="${l$1(this.accLogoRole)}" aria-label="${l$1(this._logoText)}" title="${l$1(this._logoText)}" @click="${this._logoPress}" @keydown="${this._logoKeydown}" @keyup="${this._logoKeyup}" tabindex="0" data-ui5-stable="logo"><slot name="logo"></slot></span>`; }
function block4(context, tags, suffix) { return effectiveHtml `<h1 class="ui5-hidden-text">${l$1(this.primaryTitle)}</h1>`; }
function block5(context, tags, suffix) { return effectiveHtml `<button class="${o$2(this.classes.button)}" @click="${this._headerPress}" aria-haspopup="menu" aria-expanded="${l$1(this._menuPopoverExpanded)}" data-ui5-stable="menu">${this.showLogoInMenuButton ? block6.call(this, context, tags, suffix) : undefined}${this.showTitleInMenuButton ? block7.call(this, context, tags, suffix) : undefined}<span class="ui5-shellbar-menu-button-arrow"></span></button>`; }
function block6(context, tags, suffix) { return effectiveHtml `<span class="ui5-shellbar-logo" role="${l$1(this.accLogoRole)}" aria-label="${l$1(this._logoText)}" title="${l$1(this._logoText)}"><slot name="logo"></slot></span>`; }
function block7(context, tags, suffix) { return effectiveHtml `<div class="ui5-shellbar-menu-button-title">${l$1(this.primaryTitle)}</div>`; }
function block8(context, tags, suffix) { return effectiveHtml `${this.hasLogo ? block9.call(this, context, tags, suffix) : undefined}${this.primaryTitle ? block10.call(this, context, tags, suffix) : undefined}`; }
function block9(context, tags, suffix) { return effectiveHtml `<span class="ui5-shellbar-logo" role="${l$1(this.accLogoRole)}" aria-label="${l$1(this._logoText)}" title="${l$1(this._logoText)}" @click="${this._logoPress}" @keydown="${this._logoKeydown}" @keyup="${this._logoKeyup}" tabindex="0" data-ui5-stable="logo"><slot name="logo"></slot></span>`; }
function block10(context, tags, suffix) { return effectiveHtml `<h1 class="ui5-shellbar-title"><bdi>${l$1(this.primaryTitle)}</bdi></h1>`; }
function block11(context, tags, suffix) { return effectiveHtml `<h2 class="ui5-shellbar-secondary-title" data-ui5-stable="secondary-title">${l$1(this.secondaryTitle)}</h2>`; }
function block12(context, tags, suffix) { return effectiveHtml `<div class="ui5-shellbar-copilot-wrapper" tabindex="0" aria-label="${l$1(this._copilotText)}" role="button" title="${l$1(this._copilotText)}" @keydown="${this._coPilotKeydown}" @keyup="${this._coPilotKeyup}" ?active="${this.coPilotActive}" data-ui5-stable="copilot"><svg @click="${this._coPilotClick}" focusable="false" width="48" role="presentation" aria-hidden="true" height="48" viewBox="-150 -150 300 300" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="ui5-shellbar-coPilot">${blockSVG1.call(this, context, tags, suffix)}</svg></div>`; }
function block13(context, tags, suffix) { return effectiveSvg `<animateTransform attributeName="transform" type="rotate" from="54" to="416" dur="15s" repeatCount="indefinite"/>`; }
function block14(context, tags, suffix) { return effectiveSvg `<animateTransform attributeName="transform" type="rotate" from="90" to="450" dur="30s" repeatCount="indefinite"/>`; }
function block15(context, tags, suffix) { return effectiveHtml `<span class="ui5-shellbar-co-pilot-placeholder"></span>`; }
function block16(context, tags, suffix) { return suffix ? effectiveHtml `${this._fullWidthSearch ? block17.call(this, context, tags, suffix) : undefined}<div class="ui5-shellbar-search-field" style="${styleMap(this.styles.searchField)}">${!this._fullWidthSearch ? block18.call(this, context, tags, suffix) : undefined}</div><${scopeTag("ui5-button", tags, suffix)} id="${l$1(this._id)}-item-1" class="${o$2(this.classes.items.search)} ui5-shellbar-button ui5-shellbar-search-button" icon="sap-icon://search" data-ui5-text="Search" data-ui5-notifications-count="${l$1(this.notificationsCount)}" data-ui5-stable="toggle-search" @click=${this._handleSearchIconPress} tooltip="${l$1(this._searchText)}" .accessibilityAttributes=${l$1(this.accInfo.search.accessibilityAttributes)}></${scopeTag("ui5-button", tags, suffix)}>` : effectiveHtml `${this._fullWidthSearch ? block17.call(this, context, tags, suffix) : undefined}<div class="ui5-shellbar-search-field" style="${styleMap(this.styles.searchField)}">${!this._fullWidthSearch ? block18.call(this, context, tags, suffix) : undefined}</div><ui5-button id="${l$1(this._id)}-item-1" class="${o$2(this.classes.items.search)} ui5-shellbar-button ui5-shellbar-search-button" icon="sap-icon://search" data-ui5-text="Search" data-ui5-notifications-count="${l$1(this.notificationsCount)}" data-ui5-stable="toggle-search" @click=${this._handleSearchIconPress} tooltip="${l$1(this._searchText)}" .accessibilityAttributes=${l$1(this.accInfo.search.accessibilityAttributes)}></ui5-button>`; }
function block17(context, tags, suffix) { return suffix ? effectiveHtml `<div class="ui5-shellbar-search-full-width-wrapper" style="${styleMap(this.styles.searchField)}"><div class="ui5-shellbar-search-full-field"><slot name="searchField"></slot></div><${scopeTag("ui5-button", tags, suffix)} @click=${this._handleCancelButtonPress} class="ui5-shellbar-button" data-ui5-stable="cancel-search">${l$1(this._cancelBtnText)}</${scopeTag("ui5-button", tags, suffix)}></div>` : effectiveHtml `<div class="ui5-shellbar-search-full-width-wrapper" style="${styleMap(this.styles.searchField)}"><div class="ui5-shellbar-search-full-field"><slot name="searchField"></slot></div><ui5-button @click=${this._handleCancelButtonPress} class="ui5-shellbar-button" data-ui5-stable="cancel-search">${l$1(this._cancelBtnText)}</ui5-button></div>`; }
function block18(context, tags, suffix) { return effectiveHtml `<slot name="searchField"></slot>`; }
function block19(context, tags, suffix, item, index) { return suffix ? effectiveHtml `<${scopeTag("ui5-button", tags, suffix)} id="${l$1(item.id)}" style="${styleMap(item.styles)}" class="${l$1(item.classes)}" icon="${l$1(item.icon)}" tooltip="${l$1(item.title)}" data-count="${l$1(item.count)}" data-ui5-notifications-count="${l$1(this.notificationsCount)}" data-ui5-external-action-item-id="${l$1(item.refItemid)}" data-ui5-stable="${l$1(item.stableDomRef)}" @click=${item.press}></${scopeTag("ui5-button", tags, suffix)}>` : effectiveHtml `<ui5-button id="${l$1(item.id)}" style="${styleMap(item.styles)}" class="${l$1(item.classes)}" icon="${l$1(item.icon)}" tooltip="${l$1(item.title)}" data-count="${l$1(item.count)}" data-ui5-notifications-count="${l$1(this.notificationsCount)}" data-ui5-external-action-item-id="${l$1(item.refItemid)}" data-ui5-stable="${l$1(item.stableDomRef)}" @click=${item.press}></ui5-button>`; }
function block20(context, tags, suffix) { return suffix ? effectiveHtml `<${scopeTag("ui5-button", tags, suffix)} id="${l$1(this._id)}-item-2" style="${styleMap(this.styles.items.notification)}" class="${o$2(this.classes.items.notification)} ui5-shellbar-button ui5-shellbar-bell-button" icon="sap-icon://bell" data-ui5-text="Notifications" data-ui5-notifications-count="${l$1(this.notificationsCount)}" @click=${this._handleNotificationsPress} tooltip="${l$1(this._notificationsText)}" .accessibilityAttributes=${l$1(this.accInfo.notifications.accessibilityAttributes)} data-ui5-stable="notifications"></${scopeTag("ui5-button", tags, suffix)}>` : effectiveHtml `<ui5-button id="${l$1(this._id)}-item-2" style="${styleMap(this.styles.items.notification)}" class="${o$2(this.classes.items.notification)} ui5-shellbar-button ui5-shellbar-bell-button" icon="sap-icon://bell" data-ui5-text="Notifications" data-ui5-notifications-count="${l$1(this.notificationsCount)}" @click=${this._handleNotificationsPress} tooltip="${l$1(this._notificationsText)}" .accessibilityAttributes=${l$1(this.accInfo.notifications.accessibilityAttributes)} data-ui5-stable="notifications"></ui5-button>`; }
function block21(context, tags, suffix) { return suffix ? effectiveHtml `<${scopeTag("ui5-button", tags, suffix)} profile-btn id="${l$1(this._id)}-item-3" @click=${this._handleProfilePress} style="${styleMap(this.styles.items.profile)}" tooltip="${l$1(this._profileText)}" class="ui5-shellbar-button ui5-shellbar-image-button" .accessibilityAttributes=${l$1(this.accInfo.profile.accessibilityAttributes)} data-ui5-stable="profile"><slot name="profile"></slot></${scopeTag("ui5-button", tags, suffix)}>` : effectiveHtml `<ui5-button profile-btn id="${l$1(this._id)}-item-3" @click=${this._handleProfilePress} style="${styleMap(this.styles.items.profile)}" tooltip="${l$1(this._profileText)}" class="ui5-shellbar-button ui5-shellbar-image-button" .accessibilityAttributes=${l$1(this.accInfo.profile.accessibilityAttributes)} data-ui5-stable="profile"><slot name="profile"></slot></ui5-button>`; }
function block22(context, tags, suffix) { return suffix ? effectiveHtml `<${scopeTag("ui5-button", tags, suffix)} id="${l$1(this._id)}-item-4" style="${styleMap(this.styles.items.product)}" class="${o$2(this.classes.items.product)} ui5-shellbar-button ui5-shellbar-button-product-switch" icon="sap-icon://grid" data-ui5-text="Product Switch" @click=${this._handleProductSwitchPress} tooltip="${l$1(this._productsText)}" .accessibilityAttributes=${l$1(this.accInfo.products.accessibilityAttributes)} data-ui5-stable="product-switch"></${scopeTag("ui5-button", tags, suffix)}>` : effectiveHtml `<ui5-button id="${l$1(this._id)}-item-4" style="${styleMap(this.styles.items.product)}" class="${o$2(this.classes.items.product)} ui5-shellbar-button ui5-shellbar-button-product-switch" icon="sap-icon://grid" data-ui5-text="Product Switch" @click=${this._handleProductSwitchPress} tooltip="${l$1(this._productsText)}" .accessibilityAttributes=${l$1(this.accInfo.products.accessibilityAttributes)} data-ui5-stable="product-switch"></ui5-button>`; }
function blockSVG1(context, tags, suffix) {
    return effectiveSvg `<defs><linearGradient id="f" x1="0%" x2="100%" y1="100%" y2="0%"><stop offset="0%" class="ui5-shellbar-co-pilot-color1 ui5-shellbar-co-pilot-opaicty7"/><stop offset="80%" class="ui5-shellbar-co-pilot-color2 ui5-shellbar-co-pilot-opaicty7"/></linearGradient><linearGradient id="e" x1="0%" x2="100%" y1="100%" y2="0%"><stop offset="0%" class="ui5-shellbar-co-pilot-color1 ui5-shellbar-co-pilot-opaicty36"/><stop offset="80%" class="ui5-shellbar-co-pilot-color2 ui5-shellbar-co-pilot-opaicty36"/></linearGradient><linearGradient id="c" x1="0%" x2="100%" y1="100%" y2="0%"><stop offset="0%" class="ui5-shellbar-co-pilot-color1 ui5-shellbar-co-pilot-opaicty2"/><stop offset="80%" class="ui5-shellbar-co-pilot-color2 ui5-shellbar-co-pilot-opaicty2"/></linearGradient><path id="d" d="M98.158 0c.158 17.395-9.107 31.335-18.609 45.928-9.21 14.153-18.933 25.29-33.377 34.045C31.427 88.918 17.25 94.39 0 94.273c-17.155-.115-30.823-6.582-45.798-14.949-15.216-8.497-27.76-16.77-37.253-31.375C-92.668 33.158-98.487 17.571-97.179 0c1.233-16.978 12.691-29.086 21.044-43.957 8.456-15.059 12.272-32.152 26.873-41.367 14.76-9.322 31.83-7.68 49.262-6.77 16.897.88 31.86 3.06 46.42 11.693 14.452 8.568 23.18 20.866 32.26 34.976C88.05-30.91 98.014-17.277 98.157 0z"><animate attributeName="d" values="${l$1(this.coPilot.animationValues)}" dur="30s" repeatCount="indefinite"/><animateTransform attributeName="transform" type="scale" values="1;1.05;1.05;1.02;1" dur="0.15s" begin="a.mousedown" repeatCount="1" additive="sum"/></path><mask id="b"><circle r="120" fill="#fff"/><circle r="76"/></mask></defs><g mask="url(#b)"><g transform="rotate(54)"><use xlink:href="#d" fill="url(#c)">${this.coPilot.animated ? block13.call(this, context, tags, suffix) : undefined}</use></g><use xlink:href="#d" fill="url(#e)" transform="rotate(74)"/><g transform="rotate(90)"><use xlink:href="#d" fill="url(#f)">${this.coPilot.animated ? block14.call(this, context, tags, suffix) : undefined}</use></g></g><circle cx="0" cy="0" r="76" class="ui5-shellbar-co-pilot-circle" id="a"/>`;
}

/* eslint no-unused-vars: 0 */
function block0$2(context, tags, suffix) { return suffix ? effectiveHtml `<${scopeTag("ui5-popover", tags, suffix)} class="ui5-shellbar-menu-popover" hide-arrow placement-type="Bottom" @ui5-before-open=${l$1(this._menuPopoverBeforeOpen)} @ui5-after-close=${l$1(this._menuPopoverAfterClose)}><${scopeTag("ui5-list", tags, suffix)} separators="None" mode="SingleSelect" @ui5-selection-change=${l$1(this._menuItemPress)}>${c(this._menuPopoverItems, (item, index) => item._id || index, (item, index) => block1.call(this, context, tags, suffix, item, index))}</${scopeTag("ui5-list", tags, suffix)}></${scopeTag("ui5-popover", tags, suffix)}><${scopeTag("ui5-popover", tags, suffix)} class="ui5-shellbar-overflow-popover" placement-type="Bottom" horizontal-align="${l$1(this.popoverHorizontalAlign)}" hide-arrow @ui5-before-open=${l$1(this._overflowPopoverBeforeOpen)} @ui5-after-close=${l$1(this._overflowPopoverAfterClose)}><${scopeTag("ui5-list", tags, suffix)} separators="None" @ui5-item-click="${l$1(this._handleActionListClick)}">${c(this._hiddenIcons, (item, index) => item._id || index, (item, index) => block2.call(this, context, tags, suffix, item, index))}</${scopeTag("ui5-list", tags, suffix)}></${scopeTag("ui5-popover", tags, suffix)}>` : effectiveHtml `<ui5-popover class="ui5-shellbar-menu-popover" hide-arrow placement-type="Bottom" @ui5-before-open=${l$1(this._menuPopoverBeforeOpen)} @ui5-after-close=${l$1(this._menuPopoverAfterClose)}><ui5-list separators="None" mode="SingleSelect" @ui5-selection-change=${l$1(this._menuItemPress)}>${c(this._menuPopoverItems, (item, index) => item._id || index, (item, index) => block1.call(this, context, tags, suffix, item, index))}</ui5-list></ui5-popover><ui5-popover class="ui5-shellbar-overflow-popover" placement-type="Bottom" horizontal-align="${l$1(this.popoverHorizontalAlign)}" hide-arrow @ui5-before-open=${l$1(this._overflowPopoverBeforeOpen)} @ui5-after-close=${l$1(this._overflowPopoverAfterClose)}><ui5-list separators="None" @ui5-item-click="${l$1(this._handleActionListClick)}">${c(this._hiddenIcons, (item, index) => item._id || index, (item, index) => block2.call(this, context, tags, suffix, item, index))}</ui5-list></ui5-popover>`; }
function block1(context, tags, suffix, item, index) { return effectiveHtml `${l$1(item)}`; }
function block2(context, tags, suffix, item, index) { return suffix ? effectiveHtml `<${scopeTag("ui5-li", tags, suffix)} data-ui5-external-action-item-id="${l$1(item.refItemid)}" icon="${l$1(item.icon)}" type="Active" @ui5-_press="${l$1(item.press)}">${l$1(item.text)}</${scopeTag("ui5-li", tags, suffix)}>` : effectiveHtml `<ui5-li data-ui5-external-action-item-id="${l$1(item.refItemid)}" icon="${l$1(item.icon)}" type="Active" @ui5-_press="${l$1(item.press)}">${l$1(item.text)}</ui5-li>`; }

const styleData$4 = { packageName: "@ui5/webcomponents-fiori", fileName: "themes/sap_horizon/parameters-bundle.css.ts", content: `[data-ui5-compact-size],.ui5-content-density-compact,.sapUiSizeCompact{--_ui5-v1-21-0-rc-5_bar_base_height: 2.5rem;--_ui5-v1-21-0-rc-5_bar_subheader_height: 2.25rem;--_ui5-v1-21-0-rc-5_side_navigation_navigation_separator_margin: var(--_ui5-v1-21-0-rc-5_side_navigation_navigation_separator_margin_collapsed);--_ui5-v1-21-0-rc-5_side_navigation_padding: var(--_ui5-v1-21-0-rc-5_side_navigation_padding_compact);--_ui5-v1-21-0-rc-5_side_navigation_item_bottom_margin: var(--_ui5-v1-21-0-rc-5_side_navigation_item_bottom_margin_compact);--_ui5-v1-21-0-rc-5_side_navigation_item_height: 2rem}:root{--_ui5-v1-21-0-rc-5_bar_base_height: 2.75rem;--_ui5-v1-21-0-rc-5_bar_subheader_height: 3rem;--_ui5-v1-21-0-rc-5_bar-start-container-padding-start: .75rem;--_ui5-v1-21-0-rc-5_bar-mid-container-padding-start-end: .5rem;--_ui5-v1-21-0-rc-5_bar-end-container-padding-end: .75rem;--_ui5-v1-21-0-rc-5_fcl_solid_bg: var(--sapShell_Background);--_ui5-v1-21-0-rc-5_fcl_decoration_top: linear-gradient(to top, var(--sapHighlightColor), transparent);--_ui5-v1-21-0-rc-5_fcl_decoration_bottom: linear-gradient(to bottom, var(--sapHighlightColor), transparent);--sapIllus_BrandColorPrimary: var(--sapContent_Illustrative_Color1);--sapIllus_BrandColorSecondary: var(--sapContent_Illustrative_Color2);--sapIllus_StrokeDetailColor: var(--sapContent_Illustrative_Color4);--sapIllus_Layering1: var(--sapContent_Illustrative_Color5);--sapIllus_Layering2: var(--sapContent_Illustrative_Color6);--sapIllus_BackgroundColor: var(--sapContent_Illustrative_Color7);--sapIllus_ObjectFillColor: var(--sapContent_Illustrative_Color8);--sapIllus_AccentColor: var(--sapContent_Illustrative_Color3);--sapIllus_NoColor: none;--sapIllus_PatternShadow: url(#sapIllus_PatternShadow);--sapIllus_PatternHighlight: url(#sapIllus_PatternHighlight);--_ui5-v1-21-0-rc-5_media_gallery_thumbnail_border: 1px solid var(--sapContent_ForegroundColor);--_ui5-v1-21-0-rc-5_media_gallery_thumbnail_selected_border: 2px solid var(--sapSelectedColor);--_ui5-v1-21-0-rc-5_media_gallery_thumbnail_focus_outline: var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);--_ui5-v1-21-0-rc-5_media_gallery_item_overlay_box_shadow: inset 0px 0px 80px rgba(0, 0, 0, .2);--_ui5-v1-21-0-rc-5_page_list_bg: var(--sapGroup_ContentBackground);--_ui5-v1-21-0-rc-5_page_transparent_bg: transparent;--_ui5-v1-21-0-rc-5_vsd_header_container: 2.75rem;--_ui5-v1-21-0-rc-5_vsd_sub_header_container_height: 2.75rem;--_ui5-v1-21-0-rc-5_vsd_content_li_padding: .375rem;--_ui5-v1-21-0-rc-5_vsd_content_height: 23.4375rem;--_ui5-v1-21-0-rc-5_vsd_expand_content_height: 26.1875rem;--_ui5-v1-21-0-rc-5_product_switch_item_width: 11.25rem;--_ui5-v1-21-0-rc-5_product_switch_item_height: 7rem;--_ui5-v1-21-0-rc-5_product_switch_item_outline_width: .0625rem;--_ui5-v1-21-0-rc-5_product_switch_item_outline_color: var(--sapContent_FocusColor);--_ui5-v1-21-0-rc-5_product_switch_item_outline: var(--_ui5-v1-21-0-rc-5_product_switch_item_outline_width) var(--_ui5-v1-21-0-rc-5_product_switch_item_outline_color) dotted;--_ui5-v1-21-0-rc-5_product_switch_item_outline_offset: -.1875rem;--_ui5-v1-21-0-rc-5_product_switch_item_outline_offset_positive: .1875rem;--_ui5-v1-21-0-rc-5_product_switch_item_active_outline_color: var(--sapContent_FocusColor);--_ui5-v1-21-0-rc-5_shellbar_root_height: 3.25rem;--_ui5-v1-21-0-rc-5_shellbar_logo_outline_color: var(--sapContent_FocusColor);--_ui5-v1-21-0-rc-5_shellbar_logo_outline: var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--_ui5-v1-21-0-rc-5_shellbar_logo_outline_color);--_ui5-v1-21-0-rc-5_shellbar_logo_outline_offset: -.125rem;--_ui5-v1-21-0-rc-5_shellbar_outline_offset: -.1875rem;--_ui5-v1-21-0-rc-5_shellbar_button_border: none;--_ui5-v1-21-0-rc-5_shellbar_button_border_radius: var(--sapButton_BorderCornerRadius);--_ui5-v1-21-0-rc-5_shellbar_button_focused_border: .125rem solid var(--sapContent_FocusColor);--_ui5-v1-21-0-rc-5_shellbar_button_badge_border: 1px solid var(--sapContent_BadgeBackground);--_ui5-v1-21-0-rc-5_shellbar_logo_border_radius: .5rem;--_ui5-v1-21-0-rc-5_shellbar_button_box_shadow: var(--sapContent_Interaction_Shadow);--_ui5-v1-21-0-rc-5_shellbar_button_active_color: var(--sapShell_Active_TextColor);--_ui5-v1-21-0-rc-5_shellbar_logo_outline_border_radius: var(--sapField_BorderCornerRadius);--_ui5-v1-21-0-rc-5_shellbar_copilot_stop_color1: #0070F2;--_ui5-v1-21-0-rc-5_shellbar_copilot_stop_color2: #EBF8FF;--_ui5-v1-21-0-rc-5_shellbar_copilot_focus_offset: 3px;--_ui5-v1-21-0-rc-5_shellbar_search_button_border_radius: 50%;--_ui5-v1-21-0-rc-5_shellbar_search_button_size: 1.75rem;--_ui5-v1-21-0-rc-5_shellbar_search_field_height: 2.25rem;--_ui5-v1-21-0-rc-5_shellbar_search_field_background: var(--sapShell_InteractiveBackground);--_ui5-v1-21-0-rc-5_shellbar_search_field_border: none;--_ui5-v1-21-0-rc-5_shellbar_search_field_color: var(--sapShell_InteractiveTextColor);--_ui5-v1-21-0-rc-5_shellbar_search_field_background_hover: var(--sapShell_Hover_Background);--_ui5-v1-21-0-rc-5_shellbar_search_field_box_shadow_hover: var(--sapContent_Interaction_Shadow);--_ui5-v1-21-0-rc-5_shellbar_overflow_container_middle_height: 3rem;--_ui5-v1-21-0-rc-5_shellbar_menu_button_title_font_size: var(--sapFontHeader5Size);--_ui5-v1-21-0-rc-5_shellbar_input_border_radius: 1.125rem;--_ui5-v1-21-0-rc-5_shellbar_input_focus_border_radius: 1.125rem;--_ui5-v1-21-0-rc-5_shellbar_input_background_color: var(--sapShell_InteractiveBackground);--_ui5-v1-21-0-rc-5_TimelineItem_arrow_size: 1.625rem;--_ui5-v1-21-0-rc-5_TimelineItem_bubble_border_width: .125rem;--_ui5-v1-21-0-rc-5_TimelineItem_bubble_border_style: solid;--_ui5-v1-21-0-rc-5_TimelineItem_bubble_border_radius: var(--sapElement_BorderCornerRadius);--_ui5-v1-21-0-rc-5_TimelineItem_bubble_border_color: var(--sapGroup_ContentBorderColor);--_ui5-v1-21-0-rc-5_TimelineItem_bubble_border_top: -.25rem;--_ui5-v1-21-0-rc-5_TimelineItem_bubble_border_right: -.25rem;--_ui5-v1-21-0-rc-5_TimelineItem_bubble_border_bottom: -.25rem;--_ui5-v1-21-0-rc-5_TimelineItem_bubble_border_left: -.75rem;--_ui5-v1-21-0-rc-5_TimelineItem_bubble_rtl_left_offset: -.25rem;--_ui5-v1-21-0-rc-5_TimelineItem_bubble_rtl_right_offset: -.75rem;--_ui5-v1-21-0-rc-5_TimelineItem_bubble_focus_border_radius: .875rem;--_ui5-v1-21-0-rc-5_TimelineItem_horizontal_bubble_focus_top_offset: -.75rem;--_ui5-v1-21-0-rc-5_TimelineItem_horizontal_bubble_focus_left_offset: -.25rem;--_ui5-v1-21-0-rc-5_TimelineItem_bubble_content_padding: .5rem;--_ui5-v1-21-0-rc-5_TimelineItem_bubble_content_subtitle_padding_top: .125rem;--_ui5-v1-21-0-rc-5_TimelineItem_bubble_content_description_padding_top: .5rem;--_ui5-v1-21-0-rc-5_side_navigation_hover_border_style_color: none;--_ui5-v1-21-0-rc-5_side_navigation_hover_border_width: 0;--_ui5-v1-21-0-rc-5_side_navigation_group_border_width: 0 0 .0625rem 0;--_ui5-v1-21-0-rc-5_side_navigation_item_border_style_color: none;--_ui5-v1-21-0-rc-5_side_navigation_item_border_width: 0;--_ui5-v1-21-0-rc-5_side_navigation_last_item_border_style_color: none;--_ui5-v1-21-0-rc-5_side_navigation_no_icons_group_padding: 1rem;--_ui5-v1-21-0-rc-5_side_navigation_selected_item_border_color: var(--sapList_SelectionBorderColor);--_ui5-v1-21-0-rc-5_side_navigation_selected_border_width: 0 0 .0625rem 0;--_ui5-v1-21-0-rc-5_side_navigation_collapsed_selected_item_border_style_color: solid var(--_ui5-v1-21-0-rc-5_side_navigation_selected_item_border_color);--_ui5-v1-21-0-rc-5_side_navigation_collapsed_selected_group_border_color: var(--_ui5-v1-21-0-rc-5_side_navigation_selected_item_border_color);--_ui5-v1-21-0-rc-5_side_navigation_group_expanded_border_width: 0;--_ui5-v1-21-0-rc-5_side_navigation_group_bottom_border_color: var(--sapList_BorderColor);--_ui5-v1-21-0-rc-5_side_navigation_popup_arrow_box_shadow: var(--sapContent_Shadow2);--_ui5-v1-21-0-rc-5_side_navigation_width: 16rem;--_ui5-v1-21-0-rc-5_side_navigation_collapsed_width: 3.5rem;--_ui5-v1-21-0-rc-5_side_navigation_navigation_separator_margin: .5rem;--_ui5-v1-21-0-rc-5_side_navigation_navigation_separator_margin_collapsed: .5rem;--_ui5-v1-21-0-rc-5_side_navigation_navigation_separator_background_color: var(--sapToolbar_SeparatorColor);--_ui5-v1-21-0-rc-5_side_navigation_navigation_separator_radius: .125rem;--_ui5-v1-21-0-rc-5_side_navigation_navigation_separator_height: .0625rem;--_ui5-v1-21-0-rc-5_side_navigation_triangle_color: var(--sapContent_NonInteractiveIconColor);--_ui5-v1-21-0-rc-5_side_navigation_border_right: 0;--_ui5-v1-21-0-rc-5_side_navigation_border_radius: .5rem .5rem 0 0;--_ui5-v1-21-0-rc-5_side_navigation_phone_border_radius: .5rem;--_ui5-v1-21-0-rc-5_side_navigation_shadow_color1: color-mix(in srgb, var(--sapContent_ShadowColor) 16%, transparent);--_ui5-v1-21-0-rc-5_side_navigation_shadow_color2: color-mix(in srgb, var(--sapContent_ShadowColor) 16%, transparent);--_ui5-v1-21-0-rc-5_side_navigation_box_shadow: 0 0 .125rem 0 var(--_ui5-v1-21-0-rc-5_side_navigation_shadow_color1), 0 .5rem 1rem 0 var(--_ui5-v1-21-0-rc-5_side_navigation_shadow_color2);--_ui5-v1-21-0-rc-5_side_navigation_triangle_display: none;--_ui5-v1-21-0-rc-5_side_navigation_phone_width: 100%;--_ui5-v1-21-0-rc-5_side_navigation_icon_color: var(--sapList_TextColor);--_ui5-v1-21-0-rc-5_side_navigation_icon_font_size: 1.125rem;--_ui5-v1-21-0-rc-5_side_navigation_expand_icon_color: var(--sapList_TextColor);--_ui5-v1-21-0-rc-5_side_navigation_group_border_style_color: none;--_ui5-v1-21-0-rc-5_side_navigation_item_height: 2.5rem;--_ui5-v1-21-0-rc-5_side_navigation_item_border_radius: .375rem;--_ui5-v1-21-0-rc-5_side_navigation_item_bottom_margin: .25rem;--_ui5-v1-21-0-rc-5_side_navigation_item_bottom_margin_compact: .5rem;--_ui5-v1-21-0-rc-5_side_navigation_item_transition: background-color .3s ease-in-out;--_ui5-v1-21-0-rc-5_side_navigation_item_padding_right: 0;--_ui5-v1-21-0-rc-5_side_navigation_no_icons_nested_item_padding: 2rem;--_ui5-v1-21-0-rc-5_side_navigation_item_focus_border_offset: calc(-1 * var(--sapContent_FocusWidth));--_ui5-v1-21-0-rc-5_side_navigation_item_focus_border_radius: calc(var(--_ui5-v1-21-0-rc-5_side_navigation_item_border_radius) + var(--sapContent_FocusWidth));--_ui5-v1-21-0-rc-5_side_navigation_collapsed_selected_item_background: 0 100% / 100% .125rem no-repeat linear-gradient(0deg, var(--sapList_SelectionBorderColor), var(--sapList_SelectionBorderColor)), var(--sapList_SelectionBackgroundColor);--_ui5-v1-21-0-rc-5_side_navigation_selected_border_style_color: none;--_ui5-v1-21-0-rc-5_side_navigation_selected_and_focused_border_style_color: var(--_ui5-v1-21-0-rc-5_side_navigation_selected_border_style_color);--_ui5-v1-21-0-rc-5_side_navigation_group_icon_width: 2rem;--_ui5-v1-21-0-rc-5_side_navigation_group_text_weight: bold;--_ui5-v1-21-0-rc-5_side_navigation_group_bottom_margin_in_popup: .75rem;--_ui5-v1-21-0-rc-5_side_navigation_padding: .5rem;--_ui5-v1-21-0-rc-5_side_navigation_padding_compact: 1.5rem .75rem .75rem .75rem;--_ui5-v1-21-0-rc-5_side_navigation_parent_popup_padding: .75rem;--_ui5-v1-21-0-rc-5_side_navigation_parent_popup_border_radius: .75rem;--_ui5-v1-21-0-rc-5_side_navigation_popup_item_padding: 0 .5rem;--_ui5-v1-21-0-rc-5_side_navigation_popup_icon_width: .5rem;--_ui5-v1-21-0-rc-5_side_navigation_popup_shadow_color1: color-mix(in srgb, var(--sapContent_ShadowColor) 48%, transparent);--_ui5-v1-21-0-rc-5_side_navigation_popup_shadow_color2: color-mix(in srgb, var(--sapContent_ShadowColor) 16%, transparent);--_ui5-v1-21-0-rc-5_side_navigation_popup_box_shadow: 0 0 .125rem 0 var(--_ui5-v1-21-0-rc-5_side_navigation_popup_shadow_color1), 0 1rem 2rem 0 var(--_ui5-v1-21-0-rc-5_side_navigation_popup_shadow_color2);--_ui5-v1-21-0-rc-5_side_navigation_popup_title_text_size: 1.25rem;--_ui5-v1-21-0-rc-5_side_navigation_popup_title_line_height: 1.5rem;--_ui5-v1-21-0-rc-5_side_navigation_selection_indicator_display: inline-block;--ui5-v1-21-0-rc-5_upload_collection_drag_overlay_border: .125rem dashed var(--sapContent_ForegroundBorderColor);--ui5-v1-21-0-rc-5_upload_collection_drop_overlay_border: .125rem solid var(--sapContent_DragAndDropActiveColor);--ui5-v1-21-0-rc-5_upload_collection_drop_overlay_background: transparent;--ui5-v1-21-0-rc-5_upload_collection_thumbnail_size: 3rem;--ui5-v1-21-0-rc-5_upload_collection_thumbnail_margin_inline_end: .75rem;--ui5-v1-21-0-rc-5_upload_collection_small_size_buttons_margin_inline_start: 0;--ui5-v1-21-0-rc-5_upload_collection_small_size_buttons_margin_block_start: .5rem;--_ui5-v1-21-0-rc-5_wiz_content_item_wrapper_padding: 1rem;--_ui5-v1-21-0-rc-5_wiz_content_item_wrapper_bg: var(--sapGroup_ContentBackground);--_ui5-v1-21-0-rc-5_wiz_tab_selection_line: var(--sapSelectedColor);--_ui5-v1-21-0-rc-5_wiz_tab_icon_color: var(--sapSelectedColor);--_ui5-v1-21-0-rc-5_wiz_tab_title_color: var(--sapTextColor);--_ui5-v1-21-0-rc-5_wiz_tab_title_font_family: var(--sapFontBoldFamily);--_ui5-v1-21-0-rc-5_wiz_tab_focus_outline: var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);--_ui5-v1-21-0-rc-5_wiz_tab_focus_border_radius: 8px;--_ui5-v1-21-0-rc-5_wiz_tab_border: 1px solid var(--sapContent_Selected_ForegroundColor);--_ui5-v1-21-0-rc-5_wiz_tab_active_separator_color: var(--sapContent_Selected_ForegroundColor);--_ui5-v1-21-0-rc-5_wiz_tab_selected_bg: var(--sapContent_Selected_ForegroundColor);--_ui5-v1-21-0-rc-5-notification_item-border-raius: .75rem;--_ui5-v1-21-0-rc-5_fcl_column_border: solid .0625rem var(--sapGroup_ContentBorderColor);--_ui5-v1-21-0-rc-5_media_gallery_overflow_btn_background: var(--sapButton_Background);--_ui5-v1-21-0-rc-5_media_gallery_overflow_btn_color: var(--sapButton_TextColor);--_ui5-v1-21-0-rc-5_media_gallery_overflow_btn_border: 1px solid var(--sapButton_BorderColor)}
` };

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$w);
registerThemePropertiesLoader("@ui5/webcomponents-fiori", "sap_horizon", async () => styleData$4);
const styleData$3 = { packageName: "@ui5/webcomponents-fiori", fileName: "themes/ShellBar.css.ts", content: `.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host(:not([hidden])){display:inline-block;width:100%}:host{--_ui5-v1-21-0-rc-5_input_placeholder_color: var(--sapShell_InteractiveTextColor);--_ui5-v1-21-0-rc-5_input_border_radius: var(--_ui5-v1-21-0-rc-5_shellbar_input_border_radius);--_ui5-v1-21-0-rc-5_input_focus_border_radius: var(--_ui5-v1-21-0-rc-5_shellbar_input_focus_border_radius);--_ui5-v1-21-0-rc-5_input_background_color: var(--_ui5-v1-21-0-rc-5_shellbar_input_background_color)}.ui5-shellbar-root{position:relative;display:flex;justify-content:space-between;align-items:center;background:var(--sapShellColor);height:var(--_ui5-v1-21-0-rc-5_shellbar_root_height);font-family:"72override",var(--sapFontFamily);font-size:var(--sapFontSize);font-weight:400;box-sizing:border-box}.ui5-shellbar-menu-button,.ui5-shellbar-button,.ui5-shellbar-image-button,::slotted([ui5-button][slot="startButton"]){height:2.25rem;padding:0;margin-inline-start:.5rem;border:.0625rem solid var(--sapButton_Lite_BorderColor);background:var(--sapButton_Lite_Background);outline-color:var(--_ui5-v1-21-0-rc-5_shellbar_logo_outline_color);color:var(--sapShell_TextColor);box-sizing:border-box;cursor:pointer;border-radius:var(--_ui5-v1-21-0-rc-5_shellbar_button_border_radius);position:relative;font-size:.75rem;font-weight:700;white-space:initial;overflow:initial;text-overflow:initial;line-height:inherit;letter-spacing:inherit;word-spacing:inherit}::slotted([ui5-button][slot="startButton"]){margin-inline-start:0}::slotted([ui5-button][slot="startButton"]:hover),.ui5-shellbar-menu-button.ui5-shellbar-menu-button--interactive:hover,.ui5-shellbar-button:hover,.ui5-shellbar-image-button:hover{background:var(--sapShell_Hover_Background);border-color:var(--sapButton_Lite_Hover_BorderColor);color:var(--sapShell_TextColor)}::slotted([ui5-button][slot="startButton"][active]),.ui5-shellbar-menu-button.ui5-shellbar-menu-button--interactive:active,.ui5-shellbar-button[active],.ui5-shellbar-image-button:active{background:var(--sapShell_Active_Background);border-color:var(--sapButton_Lite_Active_BorderColor);color:var(--_ui5-v1-21-0-rc-5_shellbar_button_active_color)}.ui5-shellbar-menu-button.ui5-shellbar-menu-button--interactive:active .ui5-shellbar-menu-button-arrow{border-top-color:var(--_ui5-v1-21-0-rc-5_shellbar_button_active_color)}.ui5-shellbar-menu-button.ui5-shellbar-menu-button--interactive:focus{outline:var(--_ui5-v1-21-0-rc-5_shellbar_logo_outline);outline-offset:var(--_ui5-v1-21-0-rc-5_shellbar_outline_offset)}slot[name=profile]{min-width:0}::slotted([ui5-avatar][slot="profile"]){min-width:0;width:2rem;height:2rem;padding:.25rem;pointer-events:none}.ui5-shellbar-menu-button.ui5-shellbar-menu-button--interactive::-moz-focus-inner{border:none}.ui5-shellbar-menu-button-title,.ui5-shellbar-title{display:inline-block;font-family:"72override",var(--sapFontFamily);margin:0;font-size:var(--_ui5-v1-21-0-rc-5_shellbar_menu_button_title_font_size);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--sapShell_TextColor);flex:auto}:host(:not([primary-title])) .ui5-shellbar-menu-button{min-width:2.25rem;justify-content:center}.ui5-shellbar-secondary-title{display:inline-block;font-size:var(--sapFontSmallSize);color:var(--sapShell_TextColor);line-height:1rem;font-weight:400;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.ui5-shellbar-menu-button--interactive .ui5-shellbar-menu-button-arrow{display:inline-block;margin-inline-start:.375rem;width:10px;height:10px;width:0px;height:0px;color:var(--sapShell_InteractiveTextColor);border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid var(--sapShell_TextColor)}.ui5-shellbar-overflow-container{display:flex;justify-content:center;align-items:center;height:100%;overflow:hidden}.ui5-shellbar-overflow-container-middle{align-self:center;height:var(--_ui5-v1-21-0-rc-5_shellbar_overflow_container_middle_height);width:0;flex-shrink:0}:host([show-co-pilot]) .ui5-shellbar-overflow-container-middle{width:3rem}:host([breakpoint-size="S"]) .ui5-shellbar-menu-button{margin-inline-start:0}:host([breakpoint-size="S"]) .ui5-shellbar-root{padding:0 1rem}:host([breakpoint-size="S"]) .ui5-shellbar-search-full-width-wrapper{padding:0 1rem}:host([breakpoint-size="M"]) .ui5-shellbar-root{padding:0 2rem}:host([breakpoint-size="M"]) .ui5-shellbar-search-full-width-wrapper{padding:0 2rem}:host([breakpoint-size="L"]) .ui5-shellbar-root{padding:0 2rem}:host([breakpoint-size="XL"]) .ui5-shellbar-root{padding:0 3rem}:host([breakpoint-size="XXL"]) .ui5-shellbar-root{padding:0 3rem}.ui5-shellbar-logo{cursor:pointer;max-height:2rem}.ui5-shellbar-logo:focus{outline:var(--_ui5-v1-21-0-rc-5_shellbar_logo_outline);outline-offset:var(--_ui5-v1-21-0-rc-5_shellbar_logo_outline_offset);border-radius:var(--_ui5-v1-21-0-rc-5_shellbar_logo_border_radius)}.ui5-shellbar-logo:hover{box-shadow:var(--_ui5-v1-21-0-rc-5_shellbar_button_box_shadow);border-radius:var(--_ui5-v1-21-0-rc-5_shellbar_logo_border_radius)}.ui5-shellbar-menu-button .ui5-shellbar-logo:hover{box-shadow:none}.ui5-shellbar-button{--_ui5-v1-21-0-rc-5_button_focused_border: var(--_ui5-v1-21-0-rc-5_shellbar_button_focused_border);width:2.5rem}.ui5-shellbar-search-button{--_ui5-v1-21-0-rc-5_button_focused_border_radius: var(--_ui5-v1-21-0-rc-5_shellbar_search_button_border_radius);--_ui5-v1-21-0-rc-5_shellbar_button_border_radius: var(--_ui5-v1-21-0-rc-5_shellbar_search_button_border_radius);height:var(--_ui5-v1-21-0-rc-5_shellbar_search_button_size);width:var(--_ui5-v1-21-0-rc-5_shellbar_search_button_size);min-width:var(--_ui5-v1-21-0-rc-5_shellbar_search_button_size)}.ui5-shellbar-image-buttonImage{border-radius:50%;width:1.75rem;height:1.75rem;display:flex;background-size:cover}.ui5-shellbar-image-button{display:flex;justify-content:center;align-items:center;min-width:2.25rem;height:2.25rem;display:inline-flex;padding:0}.ui5-shellbar-overflow-container-left{padding:0 .125rem;justify-content:flex-start;margin-inline-end:.5rem;max-width:75%;flex-shrink:0;flex-grow:0}.ui5-shellbar-overflow-container-left>:nth-child(n){margin-inline-end:.5rem}:host([show-co-pilot]) .ui5-shellbar-overflow-container-left{flex-basis:50%;max-width:calc(50% - 1.5rem)}:host([show-co-pilot]) .ui5-shellbar-title{flex-grow:0}.ui5-shellbar-menu-button{white-space:nowrap;overflow:hidden;display:flex;align-items:center;padding:.25rem .5rem;cursor:text;-webkit-user-select:text;-moz-user-select:text;user-select:text}.ui5-shellbar-menu-button.ui5-shellbar-menu-button--interactive{-webkit-user-select:none;-moz-user-select:none;user-select:none;cursor:pointer;border:var(--_ui5-v1-21-0-rc-5_shellbar_button_border)}:host(:not([with-logo])) .ui5-shellbar-menu-button{margin-inline-start:0}.ui5-shellbar-overflow-container-right{padding:0 .125rem;display:block;overflow:hidden;box-sizing:border-box;white-space:nowrap;flex:1 1 auto;max-width:100%}:host([show-co-pilot]) .ui5-shellbar-overflow-container-right{flex-basis:0%}:host(:not([show-search-field])) .ui5-shellbar-overflow-container-right{padding-inline-start:8rem}.ui5-shellbar-overflow-container-right .ui5-shellbar-overflow-container-right-child{display:flex;justify-content:flex-end;height:inherit;align-items:center}.ui5-shellbar-overflow-container-right-child .ui5-shellbar-button[data-count]:has(+.ui5-shellbar-overflow-button):before{inset-inline-end:var(--_ui5-v1-21-0-rc-5-shellbar-notification-btn-count-offset)}.ui5-shellbar-overflow-button{display:none}:host([breakpoint-size="M"]) .ui5-shellbar-secondary-title{display:none}:host([breakpoint-size="S"]) .ui5-shellbar-secondary-title{display:none}:host([breakpoint-size="S"]) .ui5-shellbar-overflow-container-right{padding-inline-start:0}.ui5-shellbar-overflow-button-shown{display:inline-block}.ui5-shellbar-hidden-button,.ui5-shellbar-invisible-button{visibility:hidden}.ui5-shellbar-coPilot{height:100%;background-color:transparent;cursor:pointer}:host([breakpoint-size="L"]) .ui5-shellbar-with-searchfield .ui5-shellbar-overflow-container-right{padding-inline-start:1rem}:host([breakpoint-size="XL"]) .ui5-shellbar-with-searchfield .ui5-shellbar-overflow-container-right{padding-inline-start:1rem}:host(:not([notifications-count])) .ui5-shellbar-bell-button{position:relative}:host([notifications-count]:not([notifications-count=""])) .ui5-shellbar-bell-button:before,.ui5-shellbar-button[data-count]:before{position:absolute;width:auto;height:1rem;min-width:1rem;background:var(--sapContent_BadgeBackground);border:var(--_ui5-v1-21-0-rc-5_shellbar_button_badge_border);color:var(--sapContent_BadgeTextColor);top:-.25rem;right:-.25rem;padding:0 .3125rem;border-radius:.5rem;display:flex;justify-content:center;align-items:center;font-size:var(--sapFontSmallSize);font-family:"72override",var(--sapFontFamily);z-index:2;box-sizing:border-box}:host([notifications-count]:not([notifications-count=""])) .ui5-shellbar-bell-button:before{content:attr(data-ui5-notifications-count);inset-inline-end:var(--_ui5-v1-21-0-rc-5-shellbar-notification-btn-count-offset)}.ui5-shellbar-button[data-count]:before{content:attr(data-count)}.ui5-shellbar-menu-button{margin-inline-start:.5rem}.ui5-shellbar-search-field{align-items:center;flex-grow:1;min-width:240px;margin-inline-start:.5rem;max-width:25rem}.ui5-shellbar-search-full-width-wrapper .ui5-shellbar-search-full-field{height:2.25rem;width:100%}.ui5-shellbar-search-full-width-wrapper{position:absolute;top:0;left:0;background:var(--sapShellColor);height:100%;width:100%;z-index:100;display:flex;align-items:center;box-sizing:border-box}.ui5-shellbar-search-full-width-wrapper .ui5-shellbar-button{width:auto}::slotted([ui5-input]){background:var(--_ui5-v1-21-0-rc-5_shellbar_search_field_background);border:var(--_ui5-v1-21-0-rc-5_shellbar_search_field_border);color:var(--_ui5-v1-21-0-rc-5_shellbar_search_field_color);height:2.25rem;width:100%}::slotted([ui5-input]:hover){background:var(--_ui5-v1-21-0-rc-5_shellbar_search_field_background_hover);box-shadow:var(--_ui5-v1-21-0-rc-5_shellbar_search_field_box_shadow_hover)}::slotted([ui5-input][focused]){outline:var(--_ui5-v1-21-0-rc-5_shellbar_search_field_outline_focused)}::slotted([slot="logo"]){max-height:2rem;pointer-events:none}.ui5-shellbar-copilot-wrapper{position:relative;outline:none;box-sizing:border-box;height:100%}.ui5-shellbar-copilot-wrapper:hover{border-radius:var(--sapButton_BorderCornerRadius);background:var(--sapShell_Hover_Background)}.ui5-shellbar-copilot-wrapper:active,.ui5-shellbar-copilot-wrapper[active]{background:var(--sapShell_Active_Background)}.ui5-shellbar-copilot-wrapper:hover:after,.ui5-shellbar-copilot-wrapper:focus:after{content:"";position:absolute;left:var(--_ui5-v1-21-0-rc-5_shellbar_copilot_focus_offset);right:var(--_ui5-v1-21-0-rc-5_shellbar_copilot_focus_offset);top:var(--_ui5-v1-21-0-rc-5_shellbar_copilot_focus_offset);bottom:var(--_ui5-v1-21-0-rc-5_shellbar_copilot_focus_offset);outline:none;pointer-events:none;border-radius:var(--_ui5-v1-21-0-rc-5_shellbar_logo_outline_border_radius)}.ui5-shellbar-copilot-wrapper:hover:after{background:transparent;box-shadow:var(--sapContent_Interaction_Shadow)}.ui5-shellbar-copilot-wrapper:focus:after{border:var(--_ui5-v1-21-0-rc-5_shellbar_logo_outline)}.ui5-shellbar-co-pilot-placeholder{width:2.75rem;height:2.75rem}.ui5-shellbar-co-pilot-circle{fill:var(--sapShellColor)}.ui5-shellbar-co-pilot-color1{stop-color:var(--_ui5-v1-21-0-rc-5_shellbar_copilot_stop_color1)}.ui5-shellbar-co-pilot-color2{stop-color:var(--_ui5-v1-21-0-rc-5_shellbar_copilot_stop_color2)}.ui5-shellbar-co-pilot-opacity7{stop-opacity:.7}.ui5-shellbar-co-pilot-opacity36{stop-opacity:.36}.ui5-shellbar-co-pilot-opacity2{stop-opacity:.2}::slotted([ui5-button][slot="startButton"]){margin-inline:0 .5rem;justify-content:center;align-items:center}::slotted([ui5-button][profile-btn]){width:auto}
` };

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$w);
registerThemePropertiesLoader("@ui5/webcomponents-fiori", "sap_horizon", async () => styleData$4);
const styleData$2 = { packageName: "@ui5/webcomponents-fiori", fileName: "themes/ShellBarPopover.css.ts", content: `.ui5-shellbar-menu-popover::part(content),.ui5-shellbar-overflow-popover::part(content){padding:0}.ui5-shellbar-overflow-popover [ui5-li]::part(icon){color:var(--sapList_TextColor)}
` };

const SHELLBAR_LABEL = { key: "SHELLBAR_LABEL", defaultText: "Shell Bar" };
const SHELLBAR_LOGO = { key: "SHELLBAR_LOGO", defaultText: "Logo" };
const SHELLBAR_COPILOT = { key: "SHELLBAR_COPILOT", defaultText: "CoPilot" };
const SHELLBAR_NOTIFICATIONS = { key: "SHELLBAR_NOTIFICATIONS", defaultText: "{0} Notifications" };
const SHELLBAR_PROFILE = { key: "SHELLBAR_PROFILE", defaultText: "Profile" };
const SHELLBAR_PRODUCTS = { key: "SHELLBAR_PRODUCTS", defaultText: "Products" };
const SHELLBAR_SEARCH = { key: "SHELLBAR_SEARCH", defaultText: "Search" };
const SHELLBAR_OVERFLOW = { key: "SHELLBAR_OVERFLOW", defaultText: "More" };
const SHELLBAR_CANCEL = { key: "SHELLBAR_CANCEL", defaultText: "Cancel" };

var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ShellBar_1;
const HANDLE_RESIZE_DEBOUNCE_RATE = 200; // ms
/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-shellbar</code> is meant to serve as an application header
 * and includes numerous built-in features, such as: logo, profile image/icon, title, search field, notifications and so on.
 * <br><br>
 *
 * <h3>Stable DOM Refs</h3>
 *
 * You can use the following stable DOM refs for the <code>ui5-shellbar</code>:
 * <ul>
 * <li>logo</li>
 * <li>copilot</li>
 * <li>notifications</li>
 * <li>overflow</li>
 * <li>profile</li>
 * <li>product-switch</li>
 * </ul>
 *
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-shellbar</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>root - Used to style the outermost wrapper of the <code>ui5-shellbar</code></li>
 * </ul>
 *
 * <h3>Keyboard Handling</h3>
 *
 * <h4>Fast Navigation</h4>
 * This component provides a build in fast navigation group which can be used via <code>F6 / Shift + F6</code> or <code> Ctrl + Alt(Option) + Down /  Ctrl + Alt(Option) + Up</code>.
 * In order to use this functionality, you need to import the following module:
 * <code>import "@ui5/webcomponents-base/dist/features/F6Navigation.js"</code>
 * <br><br>
 *
 * <h3>ES6 Module Import</h3>
 * <code>import "@ui5/webcomponents-fiori/dist/ShellBar";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.fiori.ShellBar
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-shellbar
 * @appenddocs sap.ui.webc.fiori.ShellBarItem
 * @public
 * @since 0.8.0
 */
let ShellBar = ShellBar_1 = class ShellBar extends UI5Element {
    static get FIORI_3_BREAKPOINTS() {
        return [
            599,
            1023,
            1439,
            1919,
            10000,
        ];
    }
    static get FIORI_3_BREAKPOINTS_MAP() {
        return {
            "599": "S",
            "1023": "M",
            "1439": "L",
            "1919": "XL",
            "10000": "XXL",
        };
    }
    constructor() {
        super();
        this._itemsInfo = [];
        this._isInitialRendering = true;
        // marks if preventDefault() is called in item's press handler
        this._defaultItemPressPrevented = false;
        this.menuItemsObserver = new MutationObserver(() => {
            this._updateClonedMenuItems();
        });
        this._headerPress = async () => {
            this._updateClonedMenuItems();
            if (this.hasMenuItems) {
                const menuPopover = await this._getMenuPopover();
                menuPopover.showAt(this.shadowRoot.querySelector(".ui5-shellbar-menu-button"), true);
            }
        };
        this._handleResize = () => {
            this._debounce(async () => {
                await this._getResponsivePopover();
                this.overflowPopover.close();
                this._overflowActions();
            }, HANDLE_RESIZE_DEBOUNCE_RATE);
        };
    }
    _debounce(fn, delay) {
        clearTimeout(this._debounceInterval);
        this._debounceInterval = setTimeout(() => {
            this._debounceInterval = null;
            fn();
        }, delay);
    }
    _menuItemPress(e) {
        this.menuPopover.close();
        this.fireEvent("menu-item-click", {
            item: e.detail.selectedItems[0],
        }, true);
    }
    _logoPress() {
        this.fireEvent("logo-click", {
            targetRef: this.shadowRoot.querySelector(".ui5-shellbar-logo"),
        });
    }
    _menuPopoverBeforeOpen() {
        this._menuPopoverExpanded = true;
        if (this.menuPopover.content && this.menuPopover.content.length) {
            this.menuPopover.content[0].focusFirstItem();
        }
    }
    _menuPopoverAfterClose() {
        this._menuPopoverExpanded = false;
    }
    _overflowPopoverBeforeOpen() {
        this._overflowPopoverExpanded = true;
        if (this.overflowPopover.content && this.overflowPopover.content.length) {
            this.overflowPopover.content[0].focusFirstItem();
        }
    }
    _overflowPopoverAfterClose() {
        this._overflowPopoverExpanded = false;
    }
    _logoKeyup(e) {
        if (isSpace(e)) {
            this._logoPress();
        }
    }
    _logoKeydown(e) {
        if (isSpace(e)) {
            e.preventDefault();
            return;
        }
        if (isEnter(e)) {
            this._logoPress();
        }
    }
    _fireCoPilotClick() {
        this.fireEvent("co-pilot-click", {
            targetRef: this.shadowRoot.querySelector(".ui5-shellbar-coPilot"),
        });
    }
    _coPilotClick() {
        this._fireCoPilotClick();
    }
    _coPilotKeydown(e) {
        if (isSpace(e)) {
            this.coPilotActive = true;
            e.preventDefault();
            return;
        }
        if (isEnter(e)) {
            this.coPilotActive = true;
            this._fireCoPilotClick();
        }
    }
    _coPilotKeyup(e) {
        if (isSpace(e)) {
            this._fireCoPilotClick();
        }
        this.coPilotActive = false;
    }
    onBeforeRendering() {
        const animationsOn = getAnimationMode() === AnimationMode$1.Full;
        const coPilotAnimation = getFeature("CoPilotAnimation");
        this.coPilot = coPilotAnimation && animationsOn ? coPilotAnimation : { animated: false };
        this.withLogo = this.hasLogo;
        this._hiddenIcons = this._itemsInfo.filter(info => {
            const isHidden = (info.classes.indexOf("ui5-shellbar-hidden-button") !== -1);
            const isSet = info.classes.indexOf("ui5-shellbar-invisible-button") === -1;
            const isOverflowIcon = info.classes.indexOf("ui5-shellbar-overflow-button") !== -1;
            const isImageIcon = info.classes.indexOf("ui5-shellbar-image-button") !== -1;
            const shouldStayOnScreen = isOverflowIcon || (isImageIcon && this.hasProfile);
            return isHidden && isSet && !shouldStayOnScreen;
        });
        this._observeMenuItems();
    }
    onAfterRendering() {
        this._overflowActions();
        this._fullWidthSearch = this._showFullWidthSearch;
    }
    /**
     * Closes the overflow area.
     * Useful to manually close the overflow after having suppressed automatic closing with preventDefault() of ShellbarItem's press event
     * @public
     * @method
     * @name sap.ui.webc.fiori.ShellBar#closeOverflow
     */
    closeOverflow() {
        if (this.overflowPopover) {
            this.overflowPopover.close();
        }
    }
    _handleBarBreakpoints() {
        const width = this.getBoundingClientRect().width;
        const breakpoints = ShellBar_1.FIORI_3_BREAKPOINTS;
        const size = breakpoints.find(bp1 => width <= bp1) || ShellBar_1.FIORI_3_BREAKPOINTS[ShellBar_1.FIORI_3_BREAKPOINTS.length - 1];
        const mappedSize = ShellBar_1.FIORI_3_BREAKPOINTS_MAP[size];
        if (this.breakpointSize !== mappedSize) {
            this.breakpointSize = mappedSize;
        }
        return mappedSize;
    }
    _handleSizeS() {
        const hasIcons = this.showNotifications || this.showProductSwitch || !!this.searchField.length || !!this.items.length;
        const newItems = this._getAllItems(hasIcons).map((info) => {
            const isOverflowIcon = info.classes.indexOf("ui5-shellbar-overflow-button") !== -1;
            const isImageIcon = info.classes.indexOf("ui5-shellbar-image-button") !== -1;
            const shouldStayOnScreen = isOverflowIcon || (isImageIcon && this.hasProfile);
            return {
                ...info,
                classes: `${info.classes} ${shouldStayOnScreen ? "" : "ui5-shellbar-hidden-button"} ui5-shellbar-button`,
                styles: {
                    order: shouldStayOnScreen ? 1 : -1,
                },
            };
        });
        this._updateItemsInfo(newItems);
    }
    _handleActionsOverflow() {
        const rightContainerRect = this.shadowRoot.querySelector(".ui5-shellbar-overflow-container-right").getBoundingClientRect();
        let overflowSelector = ".ui5-shellbar-button:not(.ui5-shellbar-overflow-button):not(.ui5-shellbar-invisible-button)";
        if (this.showSearchField) {
            overflowSelector += ",.ui5-shellbar-search-field";
        }
        const elementsToOverflow = this.shadowRoot.querySelectorAll(overflowSelector);
        const isRTL = this.effectiveDir === "rtl";
        const overflowButtons = [...elementsToOverflow].filter(icon => {
            const iconRect = (icon).getBoundingClientRect();
            if (isRTL) {
                return (iconRect.left + iconRect.width) > (rightContainerRect.left + rightContainerRect.width);
            }
            return iconRect.left < rightContainerRect.left;
        });
        const showOverflowButton = !!overflowButtons.length;
        const items = this._getAllItems(showOverflowButton).filter(item => item.show);
        const itemsByPriority = items.sort((item1, item2) => {
            if (item1.priority > item2.priority) {
                return 1;
            }
            if (item1.priority < item2.priority) {
                return -1;
            }
            return 0;
        });
        for (let i = 0; i < itemsByPriority.length; i++) {
            if (i < overflowButtons.length) {
                itemsByPriority[i].classes = `${itemsByPriority[i].classes} ui5-shellbar-hidden-button`;
                itemsByPriority[i].styles = {
                    order: -1,
                };
            }
        }
        return itemsByPriority;
    }
    _overflowActions() {
        const size = this._handleBarBreakpoints();
        if (size === "S") {
            return this._handleSizeS();
        }
        const newItems = this._handleActionsOverflow();
        this._updateItemsInfo(newItems);
    }
    async _toggleActionPopover() {
        const overflowButton = this.shadowRoot.querySelector(".ui5-shellbar-overflow-button");
        const overflowPopover = await this._getOverflowPopover();
        overflowPopover.showAt(overflowButton, true);
    }
    onEnterDOM() {
        ResizeHandler.register(this, this._handleResize);
    }
    onExitDOM() {
        this.menuItemsObserver.disconnect();
        ResizeHandler.deregister(this, this._handleResize);
        clearTimeout(this._debounceInterval);
        this._debounceInterval = null;
    }
    _handleSearchIconPress() {
        this.showSearchField = !this.showSearchField;
        if (!this.showSearchField) {
            return;
        }
        const input = this.searchField[0];
        // update the state immediately
        if (input) {
            input.focused = true;
        }
        // move the focus later
        setTimeout(() => {
            if (input) {
                input.focus();
            }
        }, 100);
    }
    async _handleActionListClick() {
        if (!this._defaultItemPressPrevented) {
            this.closeOverflow();
            // wait for DOM to be updated when ui5-popover is closed, otherwise if Enter key is hold
            // there will be no visual indication that this has happened
            await renderFinished();
        }
        this._defaultItemPressPrevented = false;
    }
    _handleCustomActionPress(e) {
        const target = e.target;
        const refItemId = target.getAttribute("data-ui5-external-action-item-id");
        if (refItemId) {
            const shellbarItem = this.items.find(item => {
                return item._id === refItemId;
            });
            const prevented = shellbarItem.fireClickEvent(e);
            this._defaultItemPressPrevented = prevented;
        }
    }
    _handleOverflowPress() {
        this._toggleActionPopover();
    }
    _handleNotificationsPress(e) {
        const notificationIconRef = this.shadowRoot.querySelector(".ui5-shellbar-bell-button"), target = e.target;
        this._defaultItemPressPrevented = !this.fireEvent("notifications-click", {
            targetRef: notificationIconRef.classList.contains("ui5-shellbar-hidden-button") ? target : notificationIconRef,
        }, true);
    }
    _handleProfilePress() {
        this.fireEvent("profile-click", {
            targetRef: this.shadowRoot.querySelector(".ui5-shellbar-image-button"),
        });
    }
    _handleCancelButtonPress() {
        this.showSearchField = false;
    }
    _handleProductSwitchPress(e) {
        const buttonRef = this.shadowRoot.querySelector(".ui5-shellbar-button-product-switch"), target = e.target;
        this._defaultItemPressPrevented = !this.fireEvent("product-switch-click", {
            targetRef: buttonRef.classList.contains("ui5-shellbar-hidden-button") ? target : buttonRef,
        }, true);
    }
    /**
     * Returns the <code>logo</code> DOM ref.
     * @type {HTMLElement}
     * @name sap.ui.webc.fiori.ShellBar.prototype.logoDomRef
     * @public
     * @readonly
     * @since 1.0.0-rc.16
     */
    get logoDomRef() {
        return this.shadowRoot.querySelector(`*[data-ui5-stable="logo"]`);
    }
    /**
     * Returns the <code>copilot</code> DOM ref.
     * @type {HTMLElement}
     * @name sap.ui.webc.fiori.ShellBar.prototype.copilotDomRef
     * @public
     * @readonly
     * @since 1.0.0-rc.16
     */
    get copilotDomRef() {
        return this.shadowRoot.querySelector(`*[data-ui5-stable="copilot"]`);
    }
    /**
     * Returns the <code>notifications</code> icon DOM ref.
     * @type {HTMLElement}
     * @name sap.ui.webc.fiori.ShellBar.prototype.notificationsDomRef
     * @public
     * @readonly
     * @since 1.0.0-rc.16
     */
    get notificationsDomRef() {
        return this.shadowRoot.querySelector(`*[data-ui5-stable="notifications"]`);
    }
    /**
     * Returns the <code>overflow</code> icon DOM ref.
     * @type {HTMLElement}
     * @name sap.ui.webc.fiori.ShellBar.prototype.overflowDomRef
     * @public
     * @readonly
     * @since 1.0.0-rc.16
     */
    get overflowDomRef() {
        return this.shadowRoot.querySelector(`*[data-ui5-stable="overflow"]`);
    }
    /**
     * Returns the <code>profile</code> icon DOM ref.
     * @type {HTMLElement}
     * @name sap.ui.webc.fiori.ShellBar.prototype.profileDomRef
     * @public
     * @readonly
     * @since 1.0.0-rc.16
     */
    get profileDomRef() {
        return this.shadowRoot.querySelector(`*[data-ui5-stable="profile"]`);
    }
    /**
     * Returns the <code>product-switch</code> icon DOM ref.
     * @type {HTMLElement}
     * @name sap.ui.webc.fiori.ShellBar.prototype.productSwitchDomRef
     * @public
     * @readonly
     * @since 1.0.0-rc.16
     */
    get productSwitchDomRef() {
        return this.shadowRoot.querySelector(`*[data-ui5-stable="product-switch"]`);
    }
    /**
     * Returns all items that will be placed in the right of the bar as icons / dom elements.
     * @param {boolean} showOverflowButton Determines if overflow button should be visible (not overflowing)
     */
    _getAllItems(showOverflowButton) {
        let domOrder = -1;
        const items = [
            {
                icon: "search",
                text: this._searchText,
                classes: `${this.searchField.length ? "" : "ui5-shellbar-invisible-button"} ui5-shellbar-search-button ui5-shellbar-button`,
                priority: 4,
                domOrder: this.searchField.length ? (++domOrder) : -1,
                styles: {
                    order: this.searchField.length ? 1 : -10,
                },
                id: `${this._id}-item-${1}`,
                press: this._handleSearchIconPress.bind(this),
                show: !!this.searchField.length,
            },
            ...this.items.map((item) => {
                item._getRealDomRef = () => this.getDomRef().querySelector(`*[data-ui5-stable=${item.stableDomRef}]`);
                return {
                    icon: item.icon,
                    id: item._id,
                    count: item.count || undefined,
                    refItemid: item._id,
                    text: item.text,
                    classes: "ui5-shellbar-custom-item ui5-shellbar-button",
                    priority: 1,
                    domOrder: (++domOrder),
                    styles: {
                        order: 2,
                    },
                    show: true,
                    press: this._handleCustomActionPress.bind(this),
                    custom: true,
                    title: item.title,
                    stableDomRef: item.stableDomRef,
                };
            }),
            {
                icon: "bell",
                text: this._notificationsText,
                classes: `${this.showNotifications ? "" : "ui5-shellbar-invisible-button"} ui5-shellbar-bell-button ui5-shellbar-button`,
                priority: 3,
                styles: {
                    order: this.showNotifications ? 3 : -10,
                },
                id: `${this._id}-item-${2}`,
                show: this.showNotifications,
                domOrder: this.showNotifications ? (++domOrder) : -1,
                press: this._handleNotificationsPress.bind(this),
            },
            {
                icon: "overflow",
                text: "Overflow",
                classes: `${showOverflowButton ? "" : "ui5-shellbar-hidden-button"} ui5-shellbar-overflow-button-shown ui5-shellbar-overflow-button ui5-shellbar-button`,
                priority: 5,
                order: 4,
                styles: {
                    order: showOverflowButton ? 4 : -1,
                },
                domOrder: showOverflowButton ? (++domOrder) : -1,
                id: `${this.id}-item-${5}`,
                press: this._handleOverflowPress.bind(this),
                show: true,
            },
            {
                text: "Person",
                classes: `${this.hasProfile ? "" : "ui5-shellbar-invisible-button"} ui5-shellbar-image-button ui5-shellbar-button`,
                priority: 4,
                styles: {
                    order: this.hasProfile ? 5 : -10,
                },
                profile: true,
                id: `${this._id}-item-${3}`,
                domOrder: this.hasProfile ? (++domOrder) : -1,
                show: this.hasProfile,
                press: this._handleProfilePress.bind(this),
            },
            {
                icon: "grid",
                text: this._productsText,
                classes: `${this.showProductSwitch ? "" : "ui5-shellbar-invisible-button"} ui5-shellbar-button ui5-shellbar-button-product-switch`,
                priority: 2,
                styles: {
                    order: this.showProductSwitch ? 6 : -10,
                },
                id: `${this._id}-item-${4}`,
                show: this.showProductSwitch,
                domOrder: this.showProductSwitch ? (++domOrder) : -1,
                press: this._handleProductSwitchPress.bind(this),
            },
        ];
        return items;
    }
    _updateItemsInfo(newItems) {
        const isDifferent = JSON.stringify(this._itemsInfo) !== JSON.stringify(newItems);
        if (isDifferent) {
            this._itemsInfo = newItems;
        }
    }
    _updateClonedMenuItems() {
        this._menuPopoverItems = [];
        this.menuItems.forEach(item => {
            // clone the menuItem and remove the slot="menuItems",
            // otherwise would not be slotted in the internal ui5-li
            const clonedItem = item.cloneNode(true);
            clonedItem.removeAttribute("slot");
            this._menuPopoverItems.push(clonedItem);
        });
    }
    _observeMenuItems() {
        this.menuItems.forEach(item => {
            this.menuItemsObserver.observe(item, {
                characterData: true,
                childList: true,
                subtree: true,
                attributes: true,
            });
        });
    }
    async _getResponsivePopover() {
        const staticAreaItem = await this.getStaticAreaItemDomRef();
        this.overflowPopover = staticAreaItem.querySelector(".ui5-shellbar-overflow-popover");
        this.menuPopover = staticAreaItem.querySelector(".ui5-shellbar-menu-popover");
    }
    async _getOverflowPopover() {
        const staticAreaItem = await this.getStaticAreaItemDomRef();
        return staticAreaItem.querySelector(".ui5-shellbar-overflow-popover");
    }
    async _getMenuPopover() {
        const staticAreaItem = await this.getStaticAreaItemDomRef();
        return staticAreaItem.querySelector(".ui5-shellbar-menu-popover");
    }
    isIconHidden(name) {
        const itemInfo = this._itemsInfo.find(item => item.icon === name);
        if (!itemInfo) {
            return false;
        }
        return itemInfo.classes.indexOf("ui5-shellbar-hidden-button") !== -1;
    }
    get classes() {
        return {
            wrapper: {
                "ui5-shellbar-root": true,
                "ui5-shellbar-with-searchfield": this.hasSearchField,
            },
            button: {
                "ui5-shellbar-menu-button--interactive": this.hasMenuItems,
                "ui5-shellbar-menu-button": true,
            },
            items: {
                notification: {
                    "ui5-shellbar-hidden-button": this.isIconHidden("bell"),
                },
                product: {
                    "ui5-shellbar-hidden-button": this.isIconHidden("grid"),
                },
                search: {
                    "ui5-shellbar-hidden-button": this.isIconHidden("search"),
                },
                overflow: {
                    "ui5-shellbar-hidden-button": this.isIconHidden("overflow"),
                },
            },
        };
    }
    get styles() {
        return {
            items: {
                notification: {
                    "order": this.isIconHidden("bell") ? "-1" : "3",
                },
                overflow: {
                    "order": this.isIconHidden("overflow") ? "-1" : "4",
                },
                profile: {
                    "order": this.hasProfile ? "5" : "-1",
                },
                product: {
                    "order": this.isIconHidden("grid") ? "-1" : "6",
                },
            },
            searchField: {
                "display": this.correctSearchFieldStyles,
            },
        };
    }
    get correctSearchFieldStyles() {
        if (this.showSearchField) {
            return "flex";
        }
        return "none";
    }
    get customItemsInfo() {
        return this._itemsInfo.filter(itemInfo => !!itemInfo.custom);
    }
    get hasLogo() {
        return !!this.logo.length;
    }
    get showLogoInMenuButton() {
        return this.hasLogo && this.breakpointSize === "S";
    }
    get showTitleInMenuButton() {
        return this.primaryTitle && !(this.showLogoInMenuButton);
    }
    get showMenuButton() {
        return this.primaryTitle || this.showLogoInMenuButton;
    }
    get popoverHorizontalAlign() {
        return this.effectiveDir === "rtl" ? "Left" : "Right";
    }
    get hasSearchField() {
        return !!this.searchField.length;
    }
    get hasProfile() {
        return !!this.profile.length;
    }
    get hasMenuItems() {
        return this.menuItems.length > 0;
    }
    get _shellbarText() {
        return ShellBar_1.i18nBundle.getText(SHELLBAR_LABEL);
    }
    get _logoText() {
        return this.accessibilityTexts.logoTitle || ShellBar_1.i18nBundle.getText(SHELLBAR_LOGO);
    }
    get _copilotText() {
        return ShellBar_1.i18nBundle.getText(SHELLBAR_COPILOT);
    }
    get _notificationsText() {
        return ShellBar_1.i18nBundle.getText(SHELLBAR_NOTIFICATIONS, this.notificationsCount);
    }
    get _cancelBtnText() {
        return ShellBar_1.i18nBundle.getText(SHELLBAR_CANCEL);
    }
    get _showFullWidthSearch() {
        const size = this._handleBarBreakpoints();
        const searchBtnHidden = !!this.shadowRoot.querySelector(".ui5-shellbar-search-button.ui5-shellbar-hidden-button");
        return ((size === "S") || searchBtnHidden);
    }
    get _profileText() {
        return this.accessibilityTexts.profileButtonTitle || ShellBar_1.i18nBundle.getText(SHELLBAR_PROFILE);
    }
    get _productsText() {
        return ShellBar_1.i18nBundle.getText(SHELLBAR_PRODUCTS);
    }
    get _searchText() {
        return ShellBar_1.i18nBundle.getText(SHELLBAR_SEARCH);
    }
    get _overflowText() {
        return ShellBar_1.i18nBundle.getText(SHELLBAR_OVERFLOW);
    }
    get accInfo() {
        return {
            notifications: {
                "title": this._notificationsText,
                "accessibilityAttributes": {
                    hasPopup: this._notificationsHasPopup,
                },
            },
            profile: {
                "title": this._profileText,
                "accessibilityAttributes": {
                    hasPopup: this._profileHasPopup,
                },
            },
            products: {
                "title": this._productsText,
                "accessibilityAttributes": {
                    hasPopup: this._productsHasPopup,
                },
            },
            search: {
                "title": this._searchText,
                "accessibilityAttributes": {
                    hasPopup: this._searchHasPopup,
                    expanded: this.showSearchField,
                },
            },
            overflow: {
                "title": this._overflowText,
                "accessibilityAttributes": {
                    hasPopup: this._overflowHasPopup,
                    expanded: this._overflowPopoverExpanded,
                },
            },
        };
    }
    get _notificationsHasPopup() {
        const notificationsAccAttributes = this.accessibilityAttributes.notifications;
        return notificationsAccAttributes ? notificationsAccAttributes.ariaHasPopup : null;
    }
    get _profileHasPopup() {
        const profileAccAttributes = this.accessibilityAttributes.profile;
        return profileAccAttributes ? profileAccAttributes.ariaHasPopup : null;
    }
    get _productsHasPopup() {
        const productsAccAttributes = this.accessibilityAttributes.product;
        return productsAccAttributes ? productsAccAttributes.ariaHasPopup : null;
    }
    get _searchHasPopup() {
        const searcAccAttributes = this.accessibilityAttributes.search;
        return searcAccAttributes ? searcAccAttributes.ariaHasPopup : null;
    }
    get _overflowHasPopup() {
        const overflowAccAttributes = this.accessibilityAttributes.overflow;
        return overflowAccAttributes ? overflowAccAttributes.ariaHasPopup : HasPopup$1.Menu;
    }
    get accLogoRole() {
        return this.accessibilityRoles.logoRole || "button";
    }
    static async onDefine() {
        ShellBar_1.i18nBundle = await getI18nBundle("@ui5/webcomponents-fiori");
    }
};
__decorate$2([
    property()
], ShellBar.prototype, "primaryTitle", void 0);
__decorate$2([
    property()
], ShellBar.prototype, "secondaryTitle", void 0);
__decorate$2([
    property()
], ShellBar.prototype, "notificationsCount", void 0);
__decorate$2([
    property({ type: Boolean })
], ShellBar.prototype, "showNotifications", void 0);
__decorate$2([
    property({ type: Boolean })
], ShellBar.prototype, "showProductSwitch", void 0);
__decorate$2([
    property({ type: Boolean })
], ShellBar.prototype, "showCoPilot", void 0);
__decorate$2([
    property({ type: Boolean })
], ShellBar.prototype, "showSearchField", void 0);
__decorate$2([
    property({ type: Object })
], ShellBar.prototype, "accessibilityRoles", void 0);
__decorate$2([
    property({ type: Object })
], ShellBar.prototype, "accessibilityTexts", void 0);
__decorate$2([
    property({ type: Object })
], ShellBar.prototype, "accessibilityAttributes", void 0);
__decorate$2([
    property()
], ShellBar.prototype, "breakpointSize", void 0);
__decorate$2([
    property({ type: Boolean })
], ShellBar.prototype, "coPilotActive", void 0);
__decorate$2([
    property({ type: Boolean })
], ShellBar.prototype, "withLogo", void 0);
__decorate$2([
    property({ type: Object })
], ShellBar.prototype, "_itemsInfo", void 0);
__decorate$2([
    property({ type: Object, multiple: true })
], ShellBar.prototype, "_menuPopoverItems", void 0);
__decorate$2([
    property({ type: Boolean, noAttribute: true })
], ShellBar.prototype, "_menuPopoverExpanded", void 0);
__decorate$2([
    property({ type: Boolean, noAttribute: true })
], ShellBar.prototype, "_overflowPopoverExpanded", void 0);
__decorate$2([
    property({ type: Boolean, noAttribute: true })
], ShellBar.prototype, "_fullWidthSearch", void 0);
__decorate$2([
    slot({ type: HTMLElement, "default": true, invalidateOnChildChange: true })
], ShellBar.prototype, "items", void 0);
__decorate$2([
    slot()
], ShellBar.prototype, "profile", void 0);
__decorate$2([
    slot()
], ShellBar.prototype, "logo", void 0);
__decorate$2([
    slot()
], ShellBar.prototype, "menuItems", void 0);
__decorate$2([
    slot()
], ShellBar.prototype, "searchField", void 0);
__decorate$2([
    slot()
], ShellBar.prototype, "startButton", void 0);
ShellBar = ShellBar_1 = __decorate$2([
    customElement({
        tag: "ui5-shellbar",
        fastNavigation: true,
        languageAware: true,
        renderer: litRender,
        template: block0$3,
        staticAreaTemplate: block0$2,
        styles: styleData$3,
        staticAreaStyles: [styleData$2],
        dependencies: [
            Button$1,
            List$1,
            Popover$1,
            StandardListItem$1,
        ],
    })
    /**
     *
     * Fired, when the notification icon is activated.
     *
     * @event sap.ui.webc.fiori.ShellBar#notifications-click
     * @allowPreventDefault
     * @param {HTMLElement} targetRef dom ref of the activated element
     * @public
     */
    ,
    event("notifications-click", {
        detail: {
            targetRef: { type: HTMLElement },
        },
    })
    /**
     * Fired, when the profile slot is present.
     *
     * @event sap.ui.webc.fiori.ShellBar#profile-click
     * @param {HTMLElement} targetRef dom ref of the activated element
     * @public
     */
    ,
    event("profile-click", {
        detail: {
            targetRef: { type: HTMLElement },
        },
    })
    /**
     * Fired, when the product switch icon is activated.
     * <b>Note:</b> You can prevent closing of overflow popover by calling <code>event.preventDefault()</code>.
     *
     * @event sap.ui.webc.fiori.ShellBar#product-switch-click
     * @allowPreventDefault
     * @param {HTMLElement} targetRef dom ref of the activated element
     * @public
     */
    ,
    event("product-switch-click", {
        detail: {
            targetRef: { type: HTMLElement },
        },
    })
    /**
     * Fired, when the logo is activated.
     *
     * @event sap.ui.webc.fiori.ShellBar#logo-click
     * @param {HTMLElement} targetRef dom ref of the activated element
     * @since 0.10
     * @public
     */
    ,
    event("logo-click", {
        detail: {
            targetRef: { type: HTMLElement },
        },
    })
    /**
     * Fired, when the co pilot is activated.
     *
     * @event sap.ui.webc.fiori.ShellBar#co-pilot-click
     * @param {HTMLElement} targetRef dom ref of the activated element
     * @since 0.10
     * @public
     */
    ,
    event("co-pilot-click", {
        detail: {
            targetRef: { type: HTMLElement },
        },
    })
    /**
     * Fired, when a menu item is activated
     * <b>Note:</b> You can prevent closing of overflow popover by calling <code>event.preventDefault()</code>.
     *
     * @event sap.ui.webc.fiori.ShellBar#menu-item-click
     * @param {HTMLElement} item DOM ref of the activated list item
     * @since 0.10
     * @public
     */
    ,
    event("menu-item-click", {
        detail: {
            item: { type: HTMLElement },
        },
    })
], ShellBar);
ShellBar.define();

/**
 * Available Page Background Design.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.fiori.types.PageBackgroundDesign
 */
var PageBackgroundDesign;
(function (PageBackgroundDesign) {
    /**
     * Page background color when a List is set as the Page content.
     *
     * @type {List}
     * @public
     */
    PageBackgroundDesign["List"] = "List";
    /**
     * A solid background color dependent on the theme.
     *
     * @type {Solid}
     * @public
     */
    PageBackgroundDesign["Solid"] = "Solid";
    /**
     * Transparent background for the page.
     *
     * @type {Transparent}
     * @public
     */
    PageBackgroundDesign["Transparent"] = "Transparent";
})(PageBackgroundDesign || (PageBackgroundDesign = {}));
var PageBackgroundDesign$1 = PageBackgroundDesign;

/* eslint no-unused-vars: 0 */
function block0$1(context, tags, suffix) { return effectiveHtml `<div class="ui5-page-root"><header class="ui5-page-header-root" id="ui5-page-header"><slot name="header"></slot></header><section part="content" class="ui5-page-content-root" style="${styleMap(this.styles.content)}"><slot></slot></section><footer class="ui5-page-footer-root" style="${styleMap(this.styles.footer)}"><slot name="footer"></slot></footer></div>`; }

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$w);
registerThemePropertiesLoader("@ui5/webcomponents-fiori", "sap_horizon", async () => styleData$4);
const styleData$1 = { packageName: "@ui5/webcomponents-fiori", fileName: "themes/Page.css.ts", content: `:host(:not([hidden])){width:100%;height:100%;display:block}.ui5-page-root{height:inherit;overflow:hidden;position:relative;z-index:0;box-sizing:border-box;background-color:inherit}.ui5-page-header-root{z-index:1}.ui5-page-content-root{overflow:hidden auto;position:absolute;will-change:scroll-position;width:100%;top:2.75rem;bottom:0;box-sizing:border-box;font-size:var(--sapFontSize);color:var(--sapTextColor)}.ui5-page-footer-root{box-sizing:border-box;position:absolute;bottom:0;left:0;z-index:2;width:100%}:host([floating-footer]) .ui5-page-footer-root{opacity:1;bottom:.5rem}:host([media-range="S"]) .ui5-page-content-root,:host([media-range="S"][floating-footer]) .ui5-page-footer-root{padding:0 1rem}:host([media-range="S"]) ::slotted([ui5-bar][slot="header"]){box-sizing:border-box;padding:0 .25rem}:host([media-range="S"]) ::slotted([ui5-bar][design="Footer"]){box-sizing:border-box;padding:0 .25rem}:host([media-range="M"]) .ui5-page-content-root,:host([media-range="L"]) .ui5-page-content-root,:host([media-range="M"][floating-footer]) .ui5-page-footer-root,:host([media-range="L"][floating-footer]) .ui5-page-footer-root{padding:0 2rem}:host([media-range="M"]) ::slotted([ui5-bar][slot="header"]),:host([media-range="L"]) ::slotted([ui5-bar][slot="header"]){box-sizing:border-box;padding:0 1.25rem}:host([media-range="M"]) ::slotted([ui5-bar][design="Footer"]),:host([media-range="L"]) ::slotted([ui5-bar][design="Footer"]){box-sizing:border-box;padding:0 1.25rem}:host([media-range="XL"]) .ui5-page-content-root,:host([media-range="XL"][floating-footer]) .ui5-page-footer-root{padding:0 3rem}:host([media-range="XL"]) ::slotted([ui5-bar][slot="header"]){box-sizing:border-box;padding:0 2.25rem}:host([media-range="XL"]) ::slotted([ui5-bar][design="Footer"]){box-sizing:border-box;padding:0 2.25rem}:host([disable-scrolling]) .ui5-page-content-root{overflow:hidden}:host([hide-footer]:not([floating-footer])) .ui5-page-footer-root{display:none}:host([floating-footer]:not([hide-footer])) .ui5-page-footer-root{animation:bounceShow .35s forwards ease-in-out}:host([floating-footer][hide-footer]) .ui5-page-footer-root{animation:bounceHide .35s forwards ease-in-out}:host([background-design="Solid"]){background-color:var(--sapBackgroundColor)}:host([background-design="Transparent"]){background-color:var(--_ui5-v1-21-0-rc-5_page_transparent_bg)}:host([background-design="List"]){background-color:var(--_ui5-v1-21-0-rc-5_page_list_bg)}@keyframes bounceShow{0%{transform:translateY(100%);opacity:0}to{opacity:1}}@keyframes bounceHide{0%{transform:translateY(-5%);opacity:1}to{transform:translateY(100%);opacity:0}}
` };

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-page</code> is a container component that holds one whole screen of an application.
 * The page has three distinct areas that can hold content - a header, content area and a footer.
 * <h3>Structure</h3>
 * <h4>Header</h4>
 * The top most area of the page is occupied by the header. The standard header includes a navigation button and a title.
 * <h4>Content</h4>
 * The content occupies the main part of the page. Only the content area is scrollable by default.
 * This can be prevented by setting  <code>enableScrolling</code> to <code>false</code>.
 * <h4>Footer</h4>
 * The footer is optional and occupies the fixed bottom part of the page. Alternatively, the footer can be floating above the bottom part of the content.
 * This is enabled with the <code>floatingFooter</code> property.
 *
 * <b>Note:</b> <code>ui5-page</code> occipues the whole available space of its parent. In order to achieve the intended design you have to make sure
 * that there is enough space for the <code>ui5-page</code> to be rendered.
 * <b>Note:</b> In order for the <code>ui5-page</code> to be displayed, the parent element should have fixed height.
 *
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-page</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>content - Used to style the content section of the component</li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents-fiori/dist/Page.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.fiori.Page
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-page
 * @since 1.0.0-rc.12
 * @public
 */
let Page = class Page extends UI5Element {
    constructor() {
        super();
        this._updateMediaRange = this.updateMediaRange.bind(this);
    }
    onEnterDOM() {
        ResizeHandler.register(this, this._updateMediaRange);
    }
    onExitDOM() {
        ResizeHandler.deregister(this, this._updateMediaRange);
    }
    updateMediaRange() {
        this.mediaRange = MediaRange.getCurrentRange(MediaRange.RANGESETS.RANGE_4STEPS, this.getDomRef().offsetWidth);
    }
    get _contentBottom() {
        return !this.floatingFooter && !this.hideFooter ? "2.75rem" : "0";
    }
    get _contentPaddingBottom() {
        return this.floatingFooter && !this.hideFooter ? "3.5rem" : "0";
    }
    get _contentTop() {
        return this.header.length ? "2.75rem" : "0rem";
    }
    get styles() {
        return {
            content: {
                "padding-bottom": this.footer.length && this._contentPaddingBottom,
                "bottom": this.footer.length && this._contentBottom,
                "top": this._contentTop,
            },
            footer: {},
        };
    }
};
__decorate$1([
    property({ type: PageBackgroundDesign$1, defaultValue: PageBackgroundDesign$1.Solid })
], Page.prototype, "backgroundDesign", void 0);
__decorate$1([
    property({ type: Boolean })
], Page.prototype, "disableScrolling", void 0);
__decorate$1([
    property({ type: Boolean })
], Page.prototype, "floatingFooter", void 0);
__decorate$1([
    property({ type: Boolean })
], Page.prototype, "hideFooter", void 0);
__decorate$1([
    property()
], Page.prototype, "mediaRange", void 0);
__decorate$1([
    slot()
], Page.prototype, "header", void 0);
__decorate$1([
    slot({ type: HTMLElement, "default": true })
], Page.prototype, "content", void 0);
__decorate$1([
    slot()
], Page.prototype, "footer", void 0);
Page = __decorate$1([
    customElement({
        tag: "ui5-page",
        languageAware: true,
        renderer: litRender,
        styles: [
            styleData$o,
            styleData$1,
        ],
        template: block0$1,
    })
], Page);
Page.define();

/**
 * Different types of Bar design
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.fiori.types.BarDesign
 */
var BarDesign;
(function (BarDesign) {
    /**
     * Default type
     * @public
     * @type {Header}
     */
    BarDesign["Header"] = "Header";
    /**
     * Subheader type
     * @public
     * @type {Subheader}
     */
    BarDesign["Subheader"] = "Subheader";
    /**
     * Footer type
     * @public
     * @type {Footer}
     */
    BarDesign["Footer"] = "Footer";
    /**
     * Floating Footer type - there is visible border on all sides
     * @public
     * @type {FloatingFooter}
     */
    BarDesign["FloatingFooter"] = "FloatingFooter";
})(BarDesign || (BarDesign = {}));
var BarDesign$1 = BarDesign;

/* eslint no-unused-vars: 0 */
function block0(context, tags, suffix) { return effectiveHtml `<div class="${o$2(this.classes.root)}" aria-label="${l$1(this.accInfo.label)}" role="toolbar" part="bar"><div class="ui5-bar-content-container ui5-bar-startcontent-container"><slot name="startContent"></slot></div><div class="ui5-bar-content-container ui5-bar-midcontent-container"><slot></slot></div><div class="ui5-bar-content-container ui5-bar-endcontent-container"><slot name="endContent"></slot></div></div>`; }

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => styleData$w);
registerThemePropertiesLoader("@ui5/webcomponents-fiori", "sap_horizon", async () => styleData$4);
const styleData = { packageName: "@ui5/webcomponents-fiori", fileName: "themes/Bar.css.ts", content: `:host{background-color:var(--sapPageHeader_Background);height:var(--_ui5-v1-21-0-rc-5_bar_base_height);width:100%;box-shadow:var(--sapContent_HeaderShadow);display:block}.ui5-bar-root{display:flex;align-items:center;justify-content:space-between;height:inherit;width:inherit;background-color:inherit;box-shadow:inherit;border-radius:inherit}.ui5-bar-root .ui5-bar-startcontent-container{padding-inline-start:var(--_ui5-v1-21-0-rc-5_bar-start-container-padding-start);display:flex;flex-direction:row;align-items:center;justify-content:flex-start}.ui5-bar-root .ui5-bar-content-container{min-width:calc(30% - calc(var(--_ui5-v1-21-0-rc-5_bar-start-container-padding-start) + var(--_ui5-v1-21-0-rc-5_bar-end-container-padding-end) + (2*var(--_ui5-v1-21-0-rc-5_bar-mid-container-padding-start-end))))}.ui5-bar-root.ui5-bar-root-shrinked .ui5-bar-content-container{min-width:0px;overflow:hidden;height:100%}.ui5-bar-root .ui5-bar-endcontent-container{padding-inline-end:var(--_ui5-v1-21-0-rc-5_bar-end-container-padding-end);display:flex;flex-direction:row;align-items:center;justify-content:flex-end}.ui5-bar-root .ui5-bar-midcontent-container{padding:0 var(--_ui5-v1-21-0-rc-5_bar-mid-container-padding-start-end);display:flex;flex-direction:row;align-items:center;justify-content:center}:host([design="Footer"]){background-color:var(--sapPageFooter_Background);border-top:.0625rem solid var(--sapPageFooter_BorderColor);box-shadow:none}:host([design="Subheader"]){height:var(--_ui5-v1-21-0-rc-5_bar_subheader_height)}:host([design="FloatingFooter"]){border-radius:var(--sapElement_BorderCornerRadius);background-color:var(--sapPageFooter_Background);box-shadow:var(--sapContent_Shadow1);border:none}::slotted(*){margin:0 .25rem}
` };

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * The Bar is a container which is primarily used to hold titles, buttons and input elements
 * and its design and functionality is the basis for page headers and footers.
 * The component consists of three areas to hold its content - startContent slot, default slot and endContent slot.
 * It has the capability to center content, such as a title, while having other components on the left and right side.
 *
 * <h3>Usage</h3>
 * With the use of the design property, you can set the style of the Bar to appear designed like a Header, Subheader, Footer and FloatingFooter.
 * <br>
 * <b>Note:</b> Do not place a Bar inside another Bar or inside any bar-like component. Doing so may cause unpredictable behavior.
 *
 * <h3>Responsive Behavior</h3>
 * The default slot will be centered in the available space between the startContent and the endContent areas,
 * therefore it might not always be centered in the entire bar.
 *
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-bar</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>bar - Used to style the wrapper of the content of the component</li>
 * </ul>
 *
 * <h3>Keyboard Handling</h3>
 *
 * <h4>Fast Navigation</h4>
 * This component provides a build in fast navigation group which can be used via <code>F6 / Shift + F6</code> or <code> Ctrl + Alt(Option) + Down /  Ctrl + Alt(Option) + Up</code>.
 * In order to use this functionality, you need to import the following module:
 * <code>import "@ui5/webcomponents-base/dist/features/F6Navigation.js"</code>
 * <br><br>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents-fiori/dist/Bar.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.fiori.Bar
 * @implements sap.ui.webc.fiori.IBar
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-bar
 * @public
 * @since 1.0.0-rc.11
 */
let Bar = class Bar extends UI5Element {
    get accInfo() {
        return {
            "label": this.design,
        };
    }
    constructor() {
        super();
        this._handleResizeBound = this.handleResize.bind(this);
    }
    handleResize() {
        const bar = this.getDomRef();
        const barWidth = bar.offsetWidth;
        const needShrinked = Array.from(bar.children).some(child => {
            return child.offsetWidth > barWidth / 3;
        });
        bar.classList.toggle("ui5-bar-root-shrinked", needShrinked);
    }
    get classes() {
        return {
            root: {
                "ui5-bar-root": true,
            },
        };
    }
    onEnterDOM() {
        ResizeHandler.register(this, this._handleResizeBound);
        this.getDomRef().querySelectorAll(".ui5-bar-content-container").forEach(child => {
            ResizeHandler.register(child, this._handleResizeBound);
        }, this);
    }
    onExitDOM() {
        ResizeHandler.deregister(this, this._handleResizeBound);
        this.getDomRef().querySelectorAll(".ui5-bar-content-container").forEach(child => {
            ResizeHandler.deregister(child, this._handleResizeBound);
        }, this);
    }
};
__decorate([
    property({ type: BarDesign$1, defaultValue: BarDesign$1.Header })
], Bar.prototype, "design", void 0);
__decorate([
    slot({ type: HTMLElement })
], Bar.prototype, "startContent", void 0);
__decorate([
    slot({ type: HTMLElement, "default": true })
], Bar.prototype, "middleContent", void 0);
__decorate([
    slot({ type: HTMLElement })
], Bar.prototype, "endContent", void 0);
Bar = __decorate([
    customElement({
        tag: "ui5-bar",
        fastNavigation: true,
        renderer: litRender,
        styles: styleData,
        template: block0,
    })
], Bar);
Bar.define();

const name$b = "home";
const pathData$b = "M507.005 240.744Q512 245.738 512 252.23t-4.995 11.488-11.487 4.495-11.488-5.494L256.272 71.923 27.516 262.72q-4.995 4.995-10.988 5.494T5.54 263.72.045 252.231t4.496-11.487l119.872-101.892q21.976-18.98 43.454-36.96t38.459-32.466 27.47-23.475l10.49-8.99q4.994-4.995 11.986-4.995 5.994 0 10.989 4.995l10.489 8.99 27.47 23.475 38.46 32.465 44.452 36.961q52.944 44.952 118.873 101.892zM64.477 274.707q51.944-39.957 93.9-72.922 17.98-13.985 34.962-26.971t30.967-23.475 22.477-16.982 9.49-6.493 9.49 6.493 21.976 16.982 30.467 23.475 34.963 26.971q40.957 32.965 94.9 72.922v172.816q0 13.985-9.49 22.976t-22.477 8.99H288.238v-62.933q0-23.974-.5-43.953t.5-20.978h-63.932q-.998 1-.499 20.479t.5 43.453v63.932H96.442q-13.985 0-22.976-8.99t-8.99-22.976V274.707zm351.625 12.986l-159.83-119.872-159.83 119.872v159.83h95.899v-95.898q0-8.99 3.995-15.983 2.997-5.993 9.49-10.988t18.48-4.995h63.932q11.988 0 18.48 4.995t9.49 10.988 3.497 10.989l.5 4.994v95.898h95.897v-159.83z";
const ltr$b = false;
const collection$b = "SAP-icons-v4";
const packageName$b = "@ui5/webcomponents-icons";

registerIcon(name$b, { pathData: pathData$b, ltr: ltr$b, collection: collection$b, packageName: packageName$b });

const name$a = "home";
const pathData$a = "M451 148q29 26 29 66v208q0 38-26 64t-64 26H122q-38 0-64-26t-26-64V214q0-39 29-66L195 24q26-24 61-24 36 0 61 24zm-22 66q0-16-12-28L282 61q-12-10-26-10t-26 10L96 186q-13 11-13 28v208q0 17 11 28t28 11h38V313q0-24 17-41t41-17h77q23 0 40 17t17 41v148h38q17 0 28-11t11-28V214zm-128 99q0-7-6-7h-77q-7 0-7 7v148h90V313z";
const ltr$a = false;
const collection$a = "SAP-icons-v5";
const packageName$a = "@ui5/webcomponents-icons";

registerIcon(name$a, { pathData: pathData$a, ltr: ltr$a, collection: collection$a, packageName: packageName$a });

isLegacyThemeFamily() ? pathData$b : pathData$a;

const name$9 = "create";
const pathData$9 = "M0 128L128 0h192v32H160v96q0 14-9 23t-23 9H32v320h321V288h31v192q0 14-8.5 23t-22.5 9H33q-14 0-23.5-9T0 480V128zm304-32h80l24-75 25 75h79l-64 47 24 75-64-46-64 46 24-75zM96 336q0-7 5-11.5t11-4.5h160q16 0 16 16 0 6-4.5 11t-11.5 5H112q-6 0-11-5t-5-11zm0 64q0-7 5-11.5t11-4.5h160q16 0 16 16 0 6-4.5 11t-11.5 5H112q-6 0-11-5t-5-11z";
const ltr$9 = false;
const collection$9 = "SAP-icons-v4";
const packageName$9 = "@ui5/webcomponents-icons";

registerIcon(name$9, { pathData: pathData$9, ltr: ltr$9, collection: collection$9, packageName: packageName$9 });

const name$8 = "create";
const pathData$8 = "M482 59q14 2 14 16 0 7-4 11l-35 37 8 55q0 6-5 10t-11 4q-2 0-8-2l-41-24-41 24q-6 2-8 2-6 0-11-4t-5-10l8-55-34-37q-5-4-5-11 0-14 14-16l48-7 19-43q5-9 15-9 11 0 15 9l19 43zM374 256q11 0 18.5 7.5T400 282v204q0 11-7.5 18.5T374 512H42q-11 0-18.5-7.5T16 486V192q0-10 6-17L165 9q6-9 19-9h62q11 0 18.5 7.5T272 26t-7.5 18-18.5 7h-50l-20 24v66q0 21-15 36t-36 15H75l-8 9v260h282V282q0-11 7-18.5t18-7.5z";
const ltr$8 = false;
const collection$8 = "SAP-icons-v5";
const packageName$8 = "@ui5/webcomponents-icons";

registerIcon(name$8, { pathData: pathData$8, ltr: ltr$8, collection: collection$8, packageName: packageName$8 });

isLegacyThemeFamily() ? pathData$9 : pathData$8;

const name$7 = "save";
const pathData$7 = "M32 363V86q0-23 15.5-38.5T86 32h340q22 0 38 15.5T480 86v340q0 23-16 38.5T426 480H149q-5 0-13-5L37 375q-5-5-5-12zm32-6l91 91h5V320q0-14 9-23t23-9h128q13 0 22.5 9t9.5 23v128h74q9 0 15.5-6.5T448 426V86q0-9-6.5-15.5T426 64h-42v128q0 14-9.5 23t-22.5 9H160q-14 0-23-9t-9-23V64H86q-9 0-15.5 6.5T64 86v271zm96-293v128h192V64H160zm160 384V320H192v128h128zm-96-56v-48q0-8 7-8h17q8 0 8 8v48q0 8-8 8h-17q-7 0-7-8z";
const ltr$7 = false;
const accData$5 = ICON_SAVE;
const collection$7 = "SAP-icons-v4";
const packageName$7 = "@ui5/webcomponents-icons";

registerIcon(name$7, { pathData: pathData$7, ltr: ltr$7, accData: accData$5, collection: collection$7, packageName: packageName$7 });

const name$6 = "save";
const pathData$6 = "M505 151q7 9 7 19v252q0 38-26 64t-64 26H90q-38 0-64-26T0 422V90q0-38 26-64T90 0h252q10 0 19 7zm-44 29L332 51H179v90h147q11 0 18.5 7.5T352 167t-7.5 18-18.5 7H153q-11 0-18-7t-7-18V51H90q-17 0-28 11T51 90v332q0 17 11 28t28 11h38V314q0-11 7-18.5t18-7.5h206q11 0 18 7.5t7 18.5v147h38q17 0 28-11t11-28V180zM333 339H179v122h154V339z";
const ltr$6 = false;
const accData$4 = ICON_SAVE;
const collection$6 = "SAP-icons-v5";
const packageName$6 = "@ui5/webcomponents-icons";

registerIcon(name$6, { pathData: pathData$6, ltr: ltr$6, accData: accData$4, collection: collection$6, packageName: packageName$6 });

isLegacyThemeFamily() ? pathData$7 : pathData$6;

const name$5 = "add";
const pathData$5 = "M32 240q0-7 5-11.5t11-4.5h176V48q0-7 5-11.5t11-4.5h32q16 0 16 16v176h176q16 0 16 16v32q0 16-16 16H288v176q0 16-16 16h-32q-6 0-11-4.5t-5-11.5V288H48q-6 0-11-4.5T32 272v-32z";
const ltr$5 = false;
const accData$3 = ICON_ADD;
const collection$5 = "SAP-icons-v4";
const packageName$5 = "@ui5/webcomponents-icons";

registerIcon(name$5, { pathData: pathData$5, ltr: ltr$5, accData: accData$3, collection: collection$5, packageName: packageName$5 });

const name$4 = "add";
const pathData$4 = "M454 230q11 0 18.5 7.5T480 256t-7.5 18.5T454 282H282v172q0 11-7.5 18.5T256 480t-18.5-7.5T230 454V282H58q-11 0-18.5-7.5T32 256t7.5-18.5T58 230h172V58q0-11 7.5-18.5T256 32t18.5 7.5T282 58v172h172z";
const ltr$4 = false;
const accData$2 = ICON_ADD;
const collection$4 = "SAP-icons-v5";
const packageName$4 = "@ui5/webcomponents-icons";

registerIcon(name$4, { pathData: pathData$4, ltr: ltr$4, accData: accData$2, collection: collection$4, packageName: packageName$4 });

isLegacyThemeFamily() ? pathData$5 : pathData$4;

const name$3 = "cancel";
const pathData$3 = "M256 0q53 0 99.5 20T437 74.5t55 81.5 20 100-20 99.5-55 81.5-81.5 55-99.5 20-99.5-20T75 437t-55-81.5T0 256t20-100 55-81.5T156.5 20 256 0zm0 480q38 0 72.5-12.5T392 434L78 120q-22 29-34 63.5T32 256q0 46 17.5 87t48 71.5 71.5 48 87 17.5zm180-92q21-28 32.5-61.5T480 256q0-46-17.5-87t-48-71.5-71.5-48T256 32q-37 0-70.5 11.5T124 75z";
const ltr$3 = true;
const collection$3 = "SAP-icons-v4";
const packageName$3 = "@ui5/webcomponents-icons";

registerIcon(name$3, { pathData: pathData$3, ltr: ltr$3, collection: collection$3, packageName: packageName$3 });

const name$2 = "cancel";
const pathData$2 = "M256 0q53 0 100 20t81.5 54.5T492 156t20 100-20 100-54.5 81.5T356 492t-100 20-100-20-81.5-54.5T20 356 0 256t20-100 54.5-81.5T156 20 256 0zm162 382q43-55 43-126 0-43-16-80.5t-43.5-65-65-43.5T256 51q-71 0-126 43zM51 256q0 43 16 80t44 65 65 44 80 16q71 0 126-43L94 130q-43 55-43 126z";
const ltr$2 = true;
const collection$2 = "SAP-icons-v5";
const packageName$2 = "@ui5/webcomponents-icons";

registerIcon(name$2, { pathData: pathData$2, ltr: ltr$2, collection: collection$2, packageName: packageName$2 });

isLegacyThemeFamily() ? pathData$3 : pathData$2;

const name$1 = "delete";
const pathData$1 = "M480 96v33h-32l-32 351q0 32-32 32H128q-32 0-32-32L64 129H32V96h448zM128 480h256l32-351H96zM32 64V32h145l1-5 6-11 14.5-11L224 0h65q15 0 29.5 7.5T336 32h144v32H32zm206 352V191h34v225h-34zm71-2l20-224 33 3-20 224zM150 193l31-3 20 224-31 3z";
const ltr$1 = false;
const accData$1 = ICON_DELETE;
const collection$1 = "SAP-icons-v4";
const packageName$1 = "@ui5/webcomponents-icons";

registerIcon(name$1, { pathData: pathData$1, ltr: ltr$1, accData: accData$1, collection: collection$1, packageName: packageName$1 });

const name = "delete";
const pathData = "M454 109q11 0 18.5 7t7.5 18-7.5 18.5T454 160h-19v294q0 24-17 41t-41 17H135q-24 0-41-17t-17-41V160H58q-11 0-18.5-7.5T32 134t7.5-18 18.5-7h70V58q0-24 17-41t41-17h140q24 0 41 17t17 41v51h70zm-275 0h154V58q0-7-7-7H186q-7 0-7 7v51zm205 51H128v294q0 7 7 7h242q7 0 7-7V160zm-186 64q11 0 18.5 7.5T224 250v140q0 11-7.5 18.5T198 416t-18-7.5-7-18.5V250q0-11 7-18.5t18-7.5zm116 0q11 0 18 7.5t7 18.5v140q0 11-7 18.5t-18 7.5-18.5-7.5T288 390V250q0-11 7.5-18.5T314 224z";
const ltr = false;
const accData = ICON_DELETE;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

isLegacyThemeFamily() ? pathData$1 : pathData;
