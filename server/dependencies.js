module.exports = {
    
  SHARED_DEPENDENCIES : [
    "@angular/common",
    "@angular/compiler",
    "@angular/core",
    "@angular/forms", // included in app.module.ts.template
    "@angular/platform-browser",
    "@angular/platform-browser-dynamic",
    "rxjs",
    "zone.js",

    "igniteui-angular", // needed for all samples because of styles.scss
    "jszip", // dependency for igniteui-angular

    // For polyfills
    "classlist.js",
    "core-js",
    "hammerjs",
    "@types/hammerjs",
    "intl",
    "web-animations-js"
  ],

  DEFAULT_DEPENDENCIES : [
    "@angular/animations",
    "@angular/forms",
    "@angular/http",
    "@angular/router",
    "classlist.js",
    "hammerjs",
    "web-animations-js",
    "jszip",
    "immediate",
    "intl",
    "tslib"
  ],

  CHARTS_DEPENDENCIES : [
    "@angular/animations",
    "igniteui-angular-core",
    "igniteui-angular-charts",
    "tslib"
  ],

  GAUGES_DEPENDENCIES : [
    "@angular/animations",
    "igniteui-angular-core",
    "igniteui-angular-gauges",
    "tslib"
  ],

  EXCEL_DEPENDENCIES : [
    "@angular/animations",
    "igniteui-angular-core",
    "igniteui-angular-excel",
    "tslib"
  ],

  EXACT_VERSION_PACKAGES : [
    "igniteui-angular",
    "igniteui-angular-core",
    "igniteui-angular-charts",
    "igniteui-angular-gauges",
    "igniteui-angular-excel"
  ]

};