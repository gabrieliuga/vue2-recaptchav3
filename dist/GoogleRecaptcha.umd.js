(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.GoogleRecaptcha = {}));
}(this, function (exports) { 'use strict';

    // eslint-disable-next-line
    var _ = require('lodash');
    var script = {
        props: ['sitekey', 'action'],
        data: function data() {
            return {
                runs: 0,
                script_added: false,
            }
        },
        watch: {
            // eslint-disable-next-line
            action: function (newAction, oldAction) {
                var this$1 = this;

                setTimeout(function () {
                    this$1.runs = 0;
                    this$1.generateToken();
                }, 10);
            }
        },
        created: function created() {
            var this$1 = this;

            if (!_.isUndefined(this.sitekey) && this.script_added === false) {
                var recaptchaScript = document.createElement('script');
                recaptchaScript.setAttribute('src', ("https://www.google.com/recaptcha/api.js?render=" + (this.sitekey)));
                document.head.appendChild(recaptchaScript);
                setTimeout(function () {
                    this$1.generateToken();
                }, 10);
                this.script_added = true;
            } else {
                // eslint-disable-next-line
                console.log('Provide SiteKey for Google Recaptcha');
            }
        },
        methods: {
            generateToken: function generateToken() {
                var this$1 = this;

                if (!_.isUndefined(window['grecaptcha'])) {
                    window['grecaptcha'].ready(function () {
                        window['grecaptcha'].execute(this$1.sitekey, {action: this$1.action}).then(function (token) {
                            this$1.$emit('google_captcha_token', {
                                'response_token': token
                            });

                        });
                    });
                } else {
                    setTimeout(function () {
                        this$1.runs++;
                        this$1.generateToken();
                    }, 10);
                }
            },
            generateManualToken: function generateManualToken() {
                return window['grecaptcha'].execute(this.sitekey, {action: this.action});
            },
            isHidden: function isHidden() {
                if (this.hidden === 'true') {
                    return true;
                }
                return false;
            }
        },
        template: '',
        render: function render() {
            return '';
        }
    };

    function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
    /* server only */
    , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
      } // Vue.extend constructor export interop.


      var options = typeof script === 'function' ? script.options : script; // render functions

      if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true; // functional template

        if (isFunctionalTemplate) {
          options.functional = true;
        }
      } // scopedId


      if (scopeId) {
        options._scopeId = scopeId;
      }

      var hook;

      if (moduleIdentifier) {
        // server build
        hook = function hook(context) {
          // 2.3 injection
          context = context || // cached call
          this.$vnode && this.$vnode.ssrContext || // stateful
          this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
          // 2.2 with runInNewContext: true

          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          } // inject component styles


          if (style) {
            style.call(this, createInjectorSSR(context));
          } // register component module identifier for async chunk inference


          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        }; // used by ssr in case component is cached and beforeCreate
        // never gets called


        options._ssrRegister = hook;
      } else if (style) {
        hook = shadowMode ? function () {
          style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
        } : function (context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook) {
        if (options.functional) {
          // register for functional component in vue file
          var originalRender = options.render;

          options.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          // inject component registration as beforeCreate hook
          var existing = options.beforeCreate;
          options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }

      return script;
    }

    var normalizeComponent_1 = normalizeComponent;

    /* script */
    var __vue_script__ = script;

    /* template */

      /* style */
      var __vue_inject_styles__ = undefined;
      /* scoped */
      var __vue_scope_id__ = undefined;
      /* module identifier */
      var __vue_module_identifier__ = undefined;
      /* functional template */
      var __vue_is_functional_template__ = undefined;
      /* style inject */
      
      /* style inject SSR */
      

      
      var component = normalizeComponent_1(
        {},
        __vue_inject_styles__,
        __vue_script__,
        __vue_scope_id__,
        __vue_is_functional_template__,
        __vue_module_identifier__,
        undefined,
        undefined
      );

    // Import vue component

    // Declare install function executed by Vue.use()
    function install(Vue) {
        if (install.installed) { return; }
        install.installed = true;
        Vue.component('GoogleRecaptcha', component);
    }

    // Create module definition for Vue.use()
    var plugin = {
        install: install,
    };

    // Auto-install when vue is found (eg. in browser via <script> tag)
    var GlobalVue = null;
    if (typeof window !== 'undefined') {
        GlobalVue = window.Vue;
    } else if (typeof global !== 'undefined') {
        GlobalVue = global.Vue;
    }
    if (GlobalVue) {
        GlobalVue.use(plugin);
    }

    exports.default = component;
    exports.install = install;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
