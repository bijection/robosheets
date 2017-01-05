/**
 * crisp-client - Simple customer service built for startups.
 * @version v2.0.1
 * @author Crisp IM, Inc. https://crisp.im/
 * @date 1/2/2017
 */
(function() {
    var e = !1;
    try {
        var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        new(function() {
            function e() {
                var e = this,
                    i = "constructor";
                try {
                    (function() {
                        e.ns = "CrispLoader", e.__console = {
                            warn: function() {},
                            error: function() {},
                            info: function() {},
                            log: function() {},
                            debug: function() {}
                        }, e.__project_name = "crisp-client",
                        e.__host_assets = "client.crisp.im",
                        e.__host_relay = "client.relay.crisp.im",
                        e.__client_revision = "b69d566",
                        e.__client_environment = "production",
                        e.__better_protocol = "production" === e.__client_environment ? "https:" : "http:",
                        e.__url_website = "https://crisp.im",
                        e.__url_go = "https://go.crisp.im",
                        e.__url_image = "https://image.crisp.im",
                        e.__url_relay = [e.__better_protocol + "//",
                        "" + e.__host_relay].join(""),
                        e.__url_assets = [e.__better_protocol + "//",
                        "" + e.__host_assets].join(""),
                        e.__path_javascripts = "static/javascripts",
                        e.__path_stylesheets = "static/stylesheets",
                        e.__dollar_crisp = "$crisp",
                        e.__check_every = 100,
                        e.__check_timeout = 3e4,
                        e.__width_threshold = 320,
                        e.__website_domain = document.domain,
                        e.__page_url = document.location.href,
                        e.__page_title = document.title,
                        e.__page_referrer = document.referrer,
                        e.__browser_useragent = window.navigator.userAgent,
                        e.__browser_timezone = (new Date).getTimezoneOffset(),
                        e.__browser_locales = navigator.languages ? navigator.languages : [navigator.language || navigator.userLanguage],
                        e.__loader_script_regex = new RegExp(["(?:http:|https:)?//",
                            e.__host_assets.replace(".",
                            "."),
                        "/l/([a-zA-Z0-9-_]+).js"].join(""),
                        "i"),
                        "string" == typeof CRISP_WEBSITE_ID ? e.__website_id = CRISP_WEBSITE_ID : e.__website_id = e.__detect_website_id_from_dom(),
                        "string" == typeof CRISP_TOKEN_ID ? e.__token_id = CRISP_TOKEN_ID : e.__token_id = null,
                        "function" == typeof CRISP_READY_TRIGGER ? e.__ready_trigger = CRISP_READY_TRIGGER : e.__ready_trigger = {},
                        "object" === ("undefined" == typeof CRISP_RUNTIME_CONFIG ? "undefined" : t(CRISP_RUNTIME_CONFIG)) ? e.__runtime_configuration = CRISP_RUNTIME_CONFIG : e.__runtime_configuration = {},
                        "object" === ("undefined" == typeof CRISP_INCLUDE_ATTRS ? "undefined" : t(CRISP_INCLUDE_ATTRS)) ? e.__include_attrs = CRISP_INCLUDE_ATTRS : e.__include_attrs = {},
                        e.__apply_primary_locale();
                        var i = document.onreadystatechange || function() {};
                        Function.prototype.bind ? ("interactive" === document.readyState || "complete" === document.readyState ? e.init() : document.onreadystatechange = function() {
                            "function" == typeof i && i(), "interactive" === document.readyState && e.init()
                        }, "undefined" == typeof window[e.__dollar_crisp] || "function" != typeof window[e.__dollar_crisp].__init ? e.__include_client() : _) : _
                    })()
                } catch (e) {
                    this.__console.error(this.ns + "." + i, e)
                }
            }
            return e.prototype.init = function() {
                var e = this,
                    t = "init";
                try {
                    window.innerWidth && window.innerWidth < this.__width_threshold || navigator.cookieEnabled !== !0 || function() {
                        var _ = document.createElement("div");
                        _.id = "crisp-252", document.getElementsByTagName("body")[0].appendChild(_);
                        var i = function() {
                                var e = window.getComputedStyle(_).getPropertyValue("display");
                                return "none" === e
                            },
                            r = function r() {
                                setTimeout(function() {
                                    e.__check_timeout -= e.__check_every, "undefined" != typeof window[e.__dollar_crisp] && "function" == typeof window[e.__dollar_crisp].__init && i() === !0 ? (e.__console.info(e.ns + "." + t, "Dependencies loaded"), document.body.removeChild(_), window[e.__dollar_crisp].__init({
                                        dollar_crisp: window[e.__dollar_crisp],
                                        project_name: e.__project_name,
                                        url_go: e.__url_go,
                                        url_image: e.__url_image,
                                        url_relay: e.__url_relay,
                                        url_website: e.__url_website,
                                        url_assets: e.__url_assets,
                                        client_environment: e.__client_environment,
                                        client_revision: e.__client_revision,
                                        website_domain: e.__website_domain,
                                        website_id: e.__website_id,
                                        token_id: e.__token_id,
                                        page_url: e.__page_url,
                                        page_title: e.__page_title,
                                        page_referrer: e.__page_referrer,
                                        browser_useragent: e.__browser_useragent,
                                        browser_timezone: e.__browser_timezone,
                                        browser_locales: e.__browser_locales,
                                        ready_trigger: e.__ready_trigger,
                                        runtime_configuration: e.__runtime_configuration
                                    })) : e.__check_timeout > 0 ? r() : e.__console.error(e.ns + "." + t, "Could not load dependencies")
                                }, e.__check_every)
                            };
                        r()
                    }()
                } catch (e) {
                    this.__console.error(this.ns + "." + t, e)
                }
            }, e.prototype.__include_client = function() {
                var e = "__include_client";
                try {
                    this.__include_preconnect(this.__url_assets), this.__include_preconnect(this.__url_relay), this.__include_client_javascripts(), this.__include_client_stylesheets()
                } catch (t) {
                    this.__console.error(this.ns + "." + e, t)
                }
            }, e.prototype.__include_preconnect = function(e) {
                var t = "__include_preconnect";
                try {
                    var _ = document.createElement("link");
                    _.href = e, _.rel = "preconnect", _.crossorigin = "anonymous", this.__apply_include_attrs(_), document.getElementsByTagName("head")[0].appendChild(_)
                } catch (e) {
                    this.__console.error(this.ns + "." + t, e)
                }
            }, e.prototype.__include_client_javascripts = function() {
                var e = "__include_client_javascripts";
                try {
                    var t = document.createElement("script");
                    // t.src = [this.__url_assets + "/", this.__path_javascripts + "/", "client.js?" + this.__client_revision].join(""), t.type = "text/javascript", t.async = 1, this.__apply_include_attrs(t), document.getElementsByTagName("head")[0].appendChild(t)
                    t.src = "crispy/client.js", t.type = "text/javascript", t.async = 1, this.__apply_include_attrs(t), document.getElementsByTagName("head")[0].appendChild(t)
                } catch (t) {
                    this.__console.error(this.ns + "." + e, t)
                }
            }, e.prototype.__include_client_stylesheets = function() {
                var e = "__include_client_stylesheets";
                try {
                    var t = this.__detect_include_mode(),
                        _ = document.createElement("link");
                    _.href = [this.__url_assets + "/", this.__path_stylesheets + "/", "client_" + t + ".css?" + this.__client_revision].join(""), _.type = "text/css", _.rel = "stylesheet", this.__apply_include_attrs(_), document.getElementsByTagName("head")[0].appendChild(_)
                } catch (t) {
                    this.__console.error(this.ns + "." + e, t)
                }
            }, e.prototype.__apply_primary_locale = function() {
                var e = "__apply_primary_locale";
                try {
                    if (this.__runtime_configuration.locale) {
                        var t = this.__browser_locales.indexOf(this.__runtime_configuration.locale);
                        t !== -1 && this.__browser_locales.splice(t, 1), this.__browser_locales.unshift(this.__runtime_configuration.locale)
                    }
                } catch (t) {
                    this.__console.error(this.ns + "." + e, t)
                }
            }, e.prototype.__apply_include_attrs = function(e) {
                var t = "__apply_include_attrs";
                try {
                    for (var _ in this.__include_attrs) this.__include_attrs.hasOwnProperty(_) && e.setAttribute(_, this.__include_attrs[_])
                } catch (e) {
                    this.__console.error(this.ns + "." + t, e)
                }
            }, e.prototype.__detect_website_id_from_dom = function() {
                var e = "__detect_website_id_from_dom",
                    t = null;
                try {
                    for (var _ = document.querySelectorAll("script[src]"), i = 0; i < _.length; i++) {
                        var r = this.__loader_script_regex.exec(_[i].src);
                        if (r && "string" == typeof r[1]) {
                            t = r[1];
                            break
                        }
                    }
                } catch (t) {
                    this.__console.error(this.ns + "." + e, t)
                } finally {
                    return t
                }
            }, e.prototype.__detect_include_mode = function() {
                var e = "__detect_include_mode",
                    t = "default";
                try {
                    var _ = (navigator.userAgent || "").toLowerCase(),
                        i = (navigator.appVersion || "").toLowerCase(),
                        r = ((navigator.vendor || "").toLowerCase(), !1);
                    if (r !== !0 && (_.indexOf("msie") === -1 && i.indexOf("trident/") === -1 || (r = !0)), r !== !0 && _.indexOf("edge") !== -1 && (r = !0), r !== !0) {
                        var n = _.match(/chrom(e|ium)\/([0-9\.]+)/);
                        if (n) {
                            var o = 29;
                            parseInt(n[2], 10) <= o && (r = !0)
                        }
                    }
                    if (r !== !0) {
                        var s = _.match(/firefox\/([0-9\.]+)/);
                        if (s) {
                            var c = 46;
                            parseInt(s[1], 10) <= c && (r = !0)
                        }
                    }
                    if (r !== !0) {
                        var a = _.match(/version\/([0-9\.]+)( mobile\/([^\s]+))? safari\//);
                        if (a) {
                            var l = 9;
                            parseInt(a[1], 10) <= l && (r = !0)
                        }
                    }
                    if (r !== !0) {
                        var d = _.match(/android ([0-9\.]+)/);
                        if (d) {
                            var u = 6;
                            parseInt(d[1], 10) < u && (r = !0)
                        }
                    }
                    r !== !0 && _.indexOf("opera mini/") !== -1 && (r = !0), r === !0 && (t = "legacy")
                } catch (t) {
                    this.__console.error(this.ns + "." + e, t)
                } finally {
                    return t
                }
            }, e
        }())
    } catch (t) {
        if (e === !0) throw t
    }
})();