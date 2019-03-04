/**
 * crisp-client - Simple customer service built for startups.
 * @version v2.0.1
 * @author Crisp IM, Inc. https://crisp.im/
 * @date 1/2/2017
 */
(function() {
    var e = !0;
    try {
        var t = {};
        t.Library = new (function() {
            function e() {
                var e = "constructor";
                try {
                    this.ns = "CrispLibrary";
                    var r = {}
                      , i = t
                      , n = {
                        environment: "production"
                    };
                    r.Console = function() {
                        var e = {};
                        return e._environment = n.environment,
                        e._development = "development" == e._environment,
                        e._available = "undefined" != typeof window.console,
                        e._has = e._development && e._available,
                        e._log_sink = function(e, t, r) {}
                        ,
                        e.warn = function(t, r) {
                            e._has && console.warn(t, r),
                            e._log_sink("warn", t, r)
                        }
                        ,
                        e.error = function(t, r) {
                            e._has && console.error(t, r),
                            e._log_sink("error", t, r)
                        }
                        ,
                        e.info = function(t, r) {
                            e._has && console.info(t, r),
                            e._log_sink("info", t, r)
                        }
                        ,
                        e.log = function(t, r) {
                            e._has && console.log(t, r),
                            e._log_sink("log", t, r)
                        }
                        ,
                        e.debug = function(t, r) {
                            e._has && ("undefined" != typeof console.debug ? console.debug(t, r) : console.log(t, r)),
                            e._log_sink("debug", t, r)
                        }
                        ,
                        e.set_log_sink = function(t) {
                            if ("function" != typeof t)
                                throw new Error("Expected log sink argument to be a function");
                            e._log_sink = t
                        }
                        ,
                        e
                    }(),
                    !function(e) {
                        if ("object" == typeof exports && "undefined" != typeof module)
                            module.exports = e();
                        else if ("function" == typeof __crisp_void_define && define.amd)
                            define([], e);
                        else {
                            var t;
                            "undefined" != typeof r ? t = r : "undefined" != typeof global ? t = global : "undefined" != typeof self && (t = self),
                            t.jade = e()
                        }
                    }(function() {
                        return function e(t, r, i) {
                            function n(a, o) {
                                if (!r[a]) {
                                    if (!t[a]) {
                                        var c = "function" == typeof require && require;
                                        if (!o && c)
                                            return c(a, !0);
                                        if (s)
                                            return s(a, !0);
                                        var l = new Error("Cannot find module '" + a + "'");
                                        throw l.code = "MODULE_NOT_FOUND",
                                        l
                                    }
                                    var _ = r[a] = {
                                        exports: {}
                                    };
                                    t[a][0].call(_.exports, function(e) {
                                        var r = t[a][1][e];
                                        return n(r ? r : e)
                                    }, _, _.exports, e, t, r, i)
                                }
                                return r[a].exports
                            }
                            for (var s = "function" == typeof require && require, a = 0; a < i.length; a++)
                                n(i[a]);
                            return n
                        }({
                            1: [function(e, t, r) {
                                "use strict";
                                function i(e) {
                                    return null != e && "" !== e
                                }
                                function n(e) {
                                    return (Array.isArray(e) ? e.map(n) : e && "object" == typeof e ? Object.keys(e).filter(function(t) {
                                        return e[t]
                                    }) : [e]).filter(i).join(" ")
                                }
                                r.merge = function e(t, r) {
                                    if (1 === arguments.length) {
                                        for (var n = t[0], s = 1; s < t.length; s++)
                                            n = e(n, t[s]);
                                        return n
                                    }
                                    var a = t.class
                                      , o = r.class;
                                    (a || o) && (a = a || [],
                                    o = o || [],
                                    Array.isArray(a) || (a = [a]),
                                    Array.isArray(o) || (o = [o]),
                                    t.class = a.concat(o).filter(i));
                                    for (var c in r)
                                        "class" != c && (t[c] = r[c]);
                                    return t
                                }
                                ,
                                r.joinClasses = n,
                                r.cls = function(e, t) {
                                    for (var i = [], s = 0; s < e.length; s++)
                                        t && t[s] ? i.push(r.escape(n([e[s]]))) : i.push(n(e[s]));
                                    var a = n(i);
                                    return a.length ? ' class="' + a + '"' : ""
                                }
                                ,
                                r.style = function(e) {
                                    return e && "object" == typeof e ? Object.keys(e).map(function(t) {
                                        return t + ":" + e[t]
                                    }).join(";") : e
                                }
                                ,
                                r.attr = function(e, t, i, n) {
                                    return "style" === e && (t = r.style(t)),
                                    "boolean" == typeof t || null == t ? t ? " " + (n ? e : e + '="' + e + '"') : "" : 0 == e.indexOf("data") && "string" != typeof t ? (JSON.stringify(t).indexOf("&") !== -1 && console.warn("Since Jade 2.0.0, ampersands (`&`) in data attributes will be escaped to `&amp;`"),
                                    t && "function" == typeof t.toISOString && console.warn("Jade will eliminate the double quotes around dates in ISO form after 2.0.0"),
                                    " " + e + "='" + JSON.stringify(t).replace(/'/g, "&apos;") + "'") : i ? (t && "function" == typeof t.toISOString && console.warn("Jade will stringify dates in ISO form after 2.0.0"),
                                    " " + e + '="' + r.escape(t) + '"') : (t && "function" == typeof t.toISOString && console.warn("Jade will stringify dates in ISO form after 2.0.0"),
                                    " " + e + '="' + t + '"')
                                }
                                ,
                                r.attrs = function(e, t) {
                                    var i = []
                                      , s = Object.keys(e);
                                    if (s.length)
                                        for (var a = 0; a < s.length; ++a) {
                                            var o = s[a]
                                              , c = e[o];
                                            "class" == o ? (c = n(c)) && i.push(" " + o + '="' + c + '"') : i.push(r.attr(o, c, !1, t))
                                        }
                                    return i.join("")
                                }
                                ,
                                r.escape = function(e) {
                                    var t = String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
                                    return t === "" + e ? e : t
                                }
                                ,
                                r.rethrow = function t(r, i, n, s) {
                                    if (!(r instanceof Error))
                                        throw r;
                                    if (!("undefined" == typeof window && i || s))
                                        throw r.message += " on line " + n,
                                        r;
                                    try {
                                        s = s || e("fs").readFileSync(i, "utf8")
                                    } catch (e) {
                                        t(r, null, n)
                                    }
                                    var a = 3
                                      , o = s.split("\n")
                                      , c = Math.max(n - a, 0)
                                      , l = Math.min(o.length, n + a)
                                      , a = o.slice(c, l).map(function(e, t) {
                                        var r = t + c + 1;
                                        return (r == n ? "  > " : "    ") + r + "| " + e
                                    }).join("\n");
                                    throw r.path = i,
                                    r.message = (i || "Jade") + ":" + n + "\n" + a + "\n\n" + r.message,
                                    r
                                }
                            }
                            , {
                                fs: 2
                            }],
                            2: [function(e, t, r) {}
                            , {}]
                        }, {}, [1])(1)
                    }),
                    function(e, t) {
                        "function" == typeof __crisp_void_define && define.amd ? define(t) : "undefined" != typeof exports ? module.exports = t() : e.cash = e.$ = t()
                    }(r, function() {
                        function e(t, r) {
                            return new e.fn.init(t,r)
                        }
                        function t(e) {
                            var t = t || s.createDocumentFragment()
                              , r = r || t.appendChild(s.createElement("div"));
                            return r.innerHTML = e,
                            r
                        }
                        function r(e, t) {
                            return parseInt(a.getComputedStyle(e[0], null)[t], 10)
                        }
                        function i() {
                            function e(e) {
                                var t = (Math.random().toString(16) + "000000000").substr(2, 8);
                                return e ? "-" + t.substr(0, 4) + "-" + t.substr(4, 4) : t
                            }
                            return e() + e(!0) + e(!0) + e()
                        }
                        function n(t, r, n) {
                            var s = e(t).data("cshid") || i();
                            e(t).data("cshid", s),
                            s in f || (f[s] = {}),
                            r in f[s] || (f[s][r] = []),
                            f[s][r].push(n)
                        }
                        var s = document
                          , a = window
                          , o = Array.prototype
                          , c = o.slice
                          , l = o.filter
                          , _ = /^#[\w-]*$/
                          , p = /^\.[\w-]*$/
                          , h = /^[\w-]*$/
                          , u = e.fn = e.prototype = {
                            cash: !0,
                            length: 0
                        };
                        u.init = function(t, r) {
                            var i, n, a = [];
                            if (!t)
                                return this;
                            if (this.length = 1,
                            "string" != typeof t)
                                return t.cash ? t : (this[0] = t,
                                this);
                            if ("<" === t.charAt(0) && ">" === t.charAt(t.length - 1) && t.length >= 3)
                                a = e.parseHTML(t);
                            else {
                                if (i = _.test(t),
                                n = t.slice(1),
                                !r && i)
                                    return this[0] = s.getElementById(n),
                                    this;
                                r = e(r)[0] || s,
                                a = c.call(h.test(n) ? p.test(t) ? s.getElementsByClassName(n) : s.getElementsByTagName(t) : r.querySelectorAll(t))
                            }
                            return this.length = 0,
                            e.merge(this, a),
                            this
                        }
                        ,
                        u.init.prototype = u,
                        e.each = function(e, t) {
                            for (var r = e.length, i = 0; i < r; i++)
                                t.call(e[i], e[i], i, e)
                        }
                        ,
                        e.extend = u.extend = function(e, t) {
                            var r;
                            t || (t = e,
                            e = this);
                            for (r in t)
                                t.hasOwnProperty(r) && (e[r] = t[r]);
                            return e
                        }
                        ,
                        e.matches = function(e, t) {
                            return (e.matches || e.matchesSelector || e.msMatchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || e.oMatchesSelector).call(e, t)
                        }
                        ,
                        e.merge = function(e, t) {
                            for (var r = +t.length, i = e.length, n = 0; n < r; i++,
                            n++)
                                e[i] = t[n];
                            return e.length = i,
                            e
                        }
                        ,
                        e.parseHTML = function(e) {
                            var r = /^<(\w+)\s*\/?>(?:<\/\1>|)$/.exec(e);
                            return r ? [s.createElement(r[1])] : (r = t(e),
                            c.call(r.childNodes))
                        }
                        ,
                        e.unique = function(t) {
                            return e.merge(e(), c.call(t).filter(function(e, t, r) {
                                return r.indexOf(e) === t
                            }))
                        }
                        ;
                        var d = /\S+/g;
                        u.extend({
                            addClass: function(e) {
                                var t, r, i = e.match(d);
                                return this.each(function(e) {
                                    if (r = i.length,
                                    e.classList)
                                        for (; r--; )
                                            e.classList.add(i[r]);
                                    else
                                        for (; r--; )
                                            t = " " + e.className + " ",
                                            t.indexOf(" " + i[r] + " ") === -1 && (e.className += " " + i[r])
                                }),
                                this
                            },
                            attr: function(e, t) {
                                return t ? (this.each(function(r) {
                                    return r.setAttribute(e, t)
                                }),
                                this) : this[0].getAttribute(e)
                            },
                            hasClass: function(e) {
                                return this[0].classList ? this[0].classList.contains(e) : this[0].className.indexOf(e) !== -1
                            },
                            prop: function(e) {
                                return this[0][e]
                            },
                            removeAttr: function(e) {
                                return this.each(function(t) {
                                    return t.removeAttribute(e)
                                }),
                                this
                            },
                            removeClass: function(e) {
                                var t, r, i = e.match(d);
                                return this.each(function(e) {
                                    if (t = i.length,
                                    e.classList)
                                        for (; t--; )
                                            e.classList.remove(i[t]);
                                    else {
                                        for (r = " " + e.className + " "; t--; )
                                            r = r.replace(" " + i[t] + " ", " ");
                                        e.className = r.trim()
                                    }
                                }),
                                this
                            }
                        }),
                        u.extend({
                            add: function() {
                                var t, r = c.call(this), i = 0;
                                for (t = arguments.length; i < t; i++)
                                    r = r.concat(c.call(e(arguments[i])));
                                return e.unique(r)
                            },
                            each: function(t) {
                                e.each(this, t)
                            },
                            eq: function(t) {
                                return e(this[t])
                            },
                            filter: function(t) {
                                return "string" == typeof t ? l.call(this, function(r) {
                                    return e.matches(r, t)
                                }) : l.call(this, t)
                            },
                            first: function() {
                                return e(this[0])
                            },
                            get: function(e) {
                                return this[e]
                            },
                            index: function(t) {
                                return t ? c.call(e(t).children()).indexOf(this[0]) : c.call(e(this[0]).parent().children()).indexOf(this[0])
                            },
                            last: function() {
                                return e(this[this.length - 1])
                            }
                        }),
                        u.extend({
                            css: function(e, t) {
                                return "object" != typeof e ? t ? (this.each(function(r) {
                                    return r.style[e] = t
                                }),
                                this) : a.getComputedStyle(this[0], null)[e] : void this.each(function(t) {
                                    for (var r in e)
                                        e.hasOwnProperty(r) && (t.style[r] = e[r])
                                })
                            }
                        }),
                        u.extend({
                            data: function(t, r) {
                                return r ? (this.each(function(i) {
                                    i.dataset ? i.dataset[t] = r : e(i).attr("data-" + t, r)
                                }),
                                this) : this[0].dataset ? this[0].dataset[t] : e(this[0]).attr("data-" + t)
                            },
                            removeData: function(t) {
                                return this.each(function(r) {
                                    r.dataset ? delete r.dataset[t] : e(r).removeAttr("data-" + t)
                                }),
                                this
                            }
                        }),
                        u.extend({
                            height: function() {
                                return this[0].getBoundingClientRect().height
                            },
                            innerWidth: function() {
                                return this[0].clientWidth
                            },
                            innerHeight: function() {
                                return this[0].clientHeight
                            },
                            outerWidth: function(e) {
                                return e === !0 ? this[0].offsetWidth + (r(this, "margin-left") || r(this, "marginLeft") || 0) + (r(this, "margin-right") || r(this, "marginRight") || 0) : this[0].offsetWidth
                            },
                            outerHeight: function(e) {
                                return e === !0 ? this[0].offsetHeight + (r(this, "margin-top") || r(this, "marginTop") || 0) + (r(this, "margin-bottom") || r(this, "marginBottom") || 0) : this[0].offsetHeight
                            },
                            width: function() {
                                return this[0].getBoundingClientRect().width
                            }
                        });
                        var f = {};
                        u.extend({
                            off: function(t, r) {
                                return this.each(function(i) {
                                    if (r)
                                        i.removeEventListener(t, r);
                                    else
                                        for (var n in f[e(i).data("cshid")][t])
                                            i.removeEventListener(t, f[e(i).data("cshid")][t][n])
                                }),
                                this
                            },
                            on: function(t, r, i) {
                                return "function" == typeof r ? (i = r,
                                this.each(function(r) {
                                    n(e(r), t, i),
                                    r.addEventListener(t, i)
                                }),
                                this) : (this.each(function(s) {
                                    function a(t) {
                                        var n = t.target;
                                        if (e.matches(n, r))
                                            i.call(n);
                                        else {
                                            for (; !e.matches(n, r); ) {
                                                if (n === s)
                                                    return n = !1;
                                                n = n.parentNode
                                            }
                                            n && i.call(n)
                                        }
                                    }
                                    n(e(s), t, a),
                                    s.addEventListener(t, a)
                                }),
                                this)
                            },
                            ready: function(e) {
                                this[0].addEventListener("DOMContentLoaded", e)
                            },
                            trigger: function(e) {
                                var t = s.createEvent("HTMLEvents");
                                return t.initEvent(e, !0, !1),
                                this.each(function(e) {
                                    return e.dispatchEvent(t)
                                }),
                                this
                            }
                        });
                        var g = encodeURIComponent;
                        return u.extend({
                            serialize: function() {
                                var e, t, r, i = this[0], n = "";
                                for (t = i.elements.length - 1; t >= 0; t--)
                                    if (e = i.elements[t],
                                    e.name && "file" !== e.type && "reset" !== e.type)
                                        if ("select-multiple" === e.type)
                                            for (r = i.elements[t].options.length - 1; r >= 0; r--)
                                                e.options[r].selected && (n += "&" + e.name + "=" + g(e.options[r].value).replace(/%20/g, "+"));
                                        else
                                            "submit" !== e.type && "button" !== e.type && (n += "&" + e.name + "=" + g(e.value).replace(/%20/g, "+"));
                                return n.substr(1)
                            },
                            val: function(e) {
                                return void 0 === e ? this[0].value : (this.each(function(t) {
                                    return t.value = e
                                }),
                                this)
                            }
                        }),
                        u.extend({
                            append: function(t) {
                                return this[0].appendChild(e(t)[0]),
                                this
                            },
                            appendTo: function(t) {
                                return e(t)[0].appendChild(this[0]),
                                this
                            },
                            clone: function() {
                                return e(this[0].cloneNode(!0))
                            },
                            empty: function() {
                                return this.each(function(e) {
                                    return e.innerHTML = ""
                                }),
                                this
                            },
                            html: function(t) {
                                var r;
                                return "undefined" === t ? this[0].innerHTML : (r = "object" == typeof t ? e(t)[0].outerHTML : t,
                                this.each(function(e) {
                                    return e.innerHTML = "" + r
                                }),
                                this)
                            },
                            insertAfter: function(t) {
                                return e(t)[0].insertAdjacentHTML("afterend", this[0].outerHTML),
                                this
                            },
                            insertBefore: function(t) {
                                return e(t)[0].insertAdjacentHTML("beforebegin", this[0].outerHTML),
                                this
                            },
                            prepend: function(t) {
                                return e(this)[0].insertAdjacentHTML("afterBegin", e(t)[0].outerHTML),
                                this
                            },
                            prependTo: function(t) {
                                return e(t)[0].insertAdjacentHTML("afterBegin", this[0].outerHTML),
                                this
                            },
                            remove: function() {
                                this.each(function(e) {
                                    return e.parentNode.removeChild(e)
                                })
                            },
                            text: function(e) {
                                return e ? (this.each(function(t) {
                                    return t.textContent = e
                                }),
                                this) : this[0].textContent
                            }
                        }),
                        u.extend({
                            children: function(t) {
                                return t ? e(this[0].children).filter(function(r) {
                                    return e.matches(r, t)
                                }) : e.fn.extend(this[0].children, e.fn)
                            },
                            closest: function(t) {
                                return !t || e.matches(this[0], t) ? this : this.parent().closest(t)
                            },
                            is: function(t) {
                                return !!t && (t.cash ? this[0] === t[0] : "string" == typeof t && e.matches(this[0], t))
                            },
                            find: function(t) {
                                return e.fn.extend(this[0].querySelectorAll(t), e.fn)
                            },
                            has: function(t) {
                                return l.call(this, function(r) {
                                    return 0 !== e(r).find(t).length
                                })
                            },
                            next: function() {
                                return e(this[0].nextElementSibling)
                            },
                            not: function(t) {
                                return l.call(this, function(r) {
                                    return !e.matches(r, t)
                                })
                            },
                            parent: function() {
                                var t = o.map.call(this, function(e) {
                                    return e.parentElement || s.body.parentNode
                                });
                                return e.unique(t)
                            },
                            parents: function(t) {
                                var r, i = [], n = 0;
                                return this.each(function(a) {
                                    for (r = a; r !== s.body.parentNode; )
                                        r = r.parentElement,
                                        (!t || t && e.matches(r, t)) && (i[n] = r,
                                        n++)
                                }),
                                e.unique(i)
                            },
                            prev: function() {
                                return e(this[0].previousElementSibling)
                            },
                            siblings: function() {
                                var e = this.parent().children()
                                  , t = this[0];
                                return l.call(e, function(e) {
                                    return e !== t
                                })
                            }
                        }),
                        e
                    }),
                    function(e, t) {
                        e.CrispLibraryWeb = new t
                    }(r, function() {
                        function e() {}
                        return e.prototype.init = function(e) {
                            var t = function() {
                                function e(e) {
                                    this.parent = e,
                                    this.__smiley_list = {
                                        angry: /(^|\s|\()((?:=|:)(?:-)?@)($|\s|\))/i,
                                        blushing: /(^|\s|\()((?:=|:)(?:-)?\$)($|\s|\))/i,
                                        cool: /(^|\s|\()(8(?:-)?\))($|\s|\))/i,
                                        confused: /(^|\s|\()(x(?:-)?\))($|\s|\))/i,
                                        crying: /(^|\s|\()((?:=|:)&#039;(?:-)?\()($|\s|\))/i,
                                        embarrased: /(^|\s|\()((?:=|:)(?:-)?\/)($|\s|\))/i,
                                        heart: /(^|\s|\()(&lt;3)($|\s|\))/i,
                                        laughing: /(^|\s|\()((?:=|:)(?:-)?&#039;D)($|\s|\))/i,
                                        sad: /(^|\s|\()((?:=|:)(?:-)?(?:\(|\|))($|\s|\))/i,
                                        sick: /(^|\s|\()((?:=|:)(?:-)?S)($|\s|\))/i,
                                        "small-smile": /(^|\s|\()((?:=|:)(?:-)?\))($|\s|\))/i,
                                        "big-smile": /(^|\s|\()((?:=|:)(?:-)?D)($|\s|\))/i,
                                        "thumbs-up": /(^|\s|\()(\+1)($|\s|\))/i,
                                        surprised: /(^|\s|\()((?:=|:)(?:-)?o)($|\s|\))/i,
                                        tongue: /(^|\s|\()((?:=|:)(?:-)?P)($|\s|\))/i,
                                        winking: /(^|\s|\()(;(?:-)?\))($|\s|\))/i
                                    }
                                }
                                return e.prototype.code = function(e) {
                                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "small"
                                      , r = this.parent.template.render("smiley", {
                                        name: e,
                                        size: t
                                    });
                                    return r
                                }
                                ,
                                e.prototype.parse = function(e) {
                                    var t = void 0
                                      , r = void 0
                                      , i = void 0
                                      , n = void 0
                                      , s = void 0
                                      , a = e;
                                    for (t in this.__smiley_list)
                                        this.__smiley_list.hasOwnProperty(t) && (r = this.__smiley_list[t],
                                        s = a.match(r),
                                        s && (i = "small",
                                        a === s[2] && (i = "large"),
                                        n = this.code(t, i),
                                        a = a.replace(r, "$1" + n + "$3")));
                                    return a
                                }
                                ,
                                e.prototype.name = function(e) {
                                    var t = void 0
                                      , r = void 0
                                      , i = null;
                                    for (t in this.__smiley_list)
                                        if (this.__smiley_list.hasOwnProperty(t) && (r = this.__smiley_list[t],
                                        e.match(r))) {
                                            i = t;
                                            break
                                        }
                                    return i
                                }
                                ,
                                e
                            }()
                              , r = function() {
                                function e(e) {
                                    this.parent = e,
                                    this.__gtld_list = ["ac", "ad", "ae", "aero", "af", "ag", "ai", "al", "am", "an", "ao", "aq", "ar", "arpa", "as", "asia", "at", "au", "aw", "ax", "az", "ba", "bb", "be", "bf", "bg", "bh", "bi", "biz", "bj", "bm", "bo", "br", "bs", "bt", "bv", "bw", "by", "bz", "ca", "cat", "cc", "cd", "cf", "cg", "ch", "ci", "cl", "cm", "cn", "co", "com", "coop", "cr", "cu", "cv", "cw", "cx", "cz", "de", "dj", "dk", "dm", "do", "dz", "ec", "edu", "ee", "eg", "es", "eu", "fi", "fm", "fo", "fr", "ga", "gb", "gd", "ge", "gf", "gg", "gh", "gi", "gl", "gm", "gn", "gov", "gp", "gq", "gr", "gs", "gt", "gw", "gy", "hk", "hm", "hn", "hr", "ht", "hu", "id", "ie", "im", "in", "info", "int", "io", "iq", "ir", "is", "it", "je", "jo", "jobs", "jp", "kg", "ki", "km", "kn", "kp", "kr", "ky", "kz", "la", "lb", "lc", "li", "lk", "lr", "ls", "lt", "lu", "lv", "ly", "ma", "mc", "md", "me", "mg", "mh", "mil", "mk", "ml", "mn", "mo", "mobi", "mp", "mq", "mr", "ms", "mt", "mu", "museum", "mv", "mw", "mx", "my", "na", "name", "nc", "ne", "net", "nf", "ng", "nl", "no", "nr", "nu", "nz", "om", "org", "pa", "pe", "pf", "ph", "pk", "pl", "pm", "pn", "post", "pr", "pro", "ps", "pt", "pw", "py", "qa", "re", "ro", "rs", "ru", "rw", "sa", "sb", "sc", "sd", "se", "sg", "sh", "si", "sj", "sk", "sl", "sm", "sn", "so", "sr", "st", "su", "sv", "sx", "sy", "sz", "tc", "td", "tel", "tf", "tg", "th", "tj", "tk", "tl", "tm", "tn", "to", "tp", "travel", "tt", "tv", "tw", "tz", "ua", "ug", "uk", "us", "uy", "uz", "va", "vc", "ve", "vg", "vi", "vn", "vu", "wf", "ws", "yt", "امارات", "বাংলা", "中国", "中國", "الجزائر", "مصر", "გე", "香港", "भारत", "بھارت", "భారత్", "ભારત", "ਭਾਰਤ", "ভারত", "இந்தியா", "ایران", "ايران", "الاردن", "한국", "қаз", "ලංකා", "இலங்கை", "المغرب", "мон", "مليسيا", "عمان", "فلسطين", "срб", "рф", "قطر", "السعودية", "السعودیة", "السعودیۃ", "السعوديه", "سورية", "سوريا", "新加坡", "சிங்கப்பூர்", "ไทย", "تونس", "台灣", "台湾", "臺灣", "укр", "اليمن", "xxx", "онлайн", "сайт", "شبكة", "游戏", "企业", "camera", "clothing", "lighting", "singles", "ventures", "voyage", "guru", "holdings", "equipment", "bike", "estate", "tattoo", "在线", "中文网", "land", "plumbing", "contractors", "sexy", "menu", "世界", "uno", "gallery", "technology", "集团", "reviews", "guide", "我爱你", "graphics", "construction", "onl", "みんな", "diamonds", "kiwi", "enterprises", "today", "futbol", "photography", "tips", "directory", "kitchen", "移动", "kim", "삼성", "monash", "wed", "pink", "ruhr", "buzz", "careers", "shoes", "موقع", "career", "otsuka", "中信", "gift", "recipes", "coffee", "luxury", "domains", "photos", "limo", "viajes", "wang", "democrat", "mango", "cab", "support", "dance", "nagoya", "computer", "wien", "berlin", "codes", "email", "بازار", "repair", "holiday", "center", "systems", "wiki", "ceo", "international", "solar", "company", "education", "training", "academy", "marketing", "florist", "solutions", "build", "institute", "builders", "red", "blue", "ninja", "business", "gal", "social", "house", "camp", "immobilien", "moda", "glass", "management", "kaufen", "farm", "公益", "政务", "club", "voting", "tokyo", "moe", "guitars", "bargains", "组织机构", "desi", "cool", "boutique", "pics", "орг", "公司", "网络", "cheap", "广东", "photo", "network", "zone", "机构", "link", "qpon", "संगठन", "agency", "tienda", "works", "london", "watch", "rocks", "shiksha", "дети", "budapest", "nrw", "vote", "fishing", "expert", "horse", "christmas", "cooking", "商城", "casa", "rich", "voto", "tools", "八卦", "praxi", "events", "flights", "report", "partners", "neustar", "rentals", "catering", "community", "maison", "parts", "cleaning", "okinawa", "foundation", "properties", "vacations", "productions", "industries", "haus", "vision", "mormon", "cards", "ink", "villas", "consulting", "cruises", "krd", "xyz", "dating", "exposed", "condos", "eus", "caravan", "actor", "saarland", "yokohama", "pub", "рус", "ren", "fish", "bar", "dnp", "bid", "supply", "miami", "supplies", "quebec", "moscow", "globo", "axa", "москва", "商店", "vodka", "rest", "frogans", "wtc", "rodeo", "sohu", "best", "country", "kred", "feedback", "work", "luxe", "ryukyu", "autos", "homes", "jetzt", "yachts", "motorcycles", "mini", "ggee", "beer", "佛山", "college", "ovh", "meet", "网址", "gop", "blackfriday", "lacaixa", "商标", "vegas", "black", "soy", "trade", "gent", "ing", "dad", "shriram", "bayern", "scot", "webcam", "foo", "eat", "nyc", "prod", "how", "day", "meme", "mov", "paris", "boo", "new", "ifm", "life", "archi", "spiegel", "brussels", "church", "here", "dabur", "vlaanderen", "cologne", "手机", "wme", "nhk", "suzuki", "whoswho", "scb", "hamburg", "services", "bzh", "rio", "cash", "gives", "hiphop", "degree", "digital", "rehab", "wtf", "financial", "limited", "discount", "fail", "vet", "ngo", "fitness", "schule", "navy", "bio", "ong", "town", "toys", "army", "engineering", "capital", "exchange", "fan", "market", "media", "lease", "university", "reisen", "airforce", "pictures", "gripe", "engineering", "associates", "政府", "williamhill", "hiv", "sca", "reise", "accountants", "clinic", "versicherung", "top", "furniture", "dental", "fund", "creditcard", "insure", "audio", "claims", "loans", "auction", "attorney", "finance", "investments", "juegos", "dentist", "lds", "lawyer", "surgery", "gratis", "software", "mortgage", "republican", "credit", "tax", "africa", "joburg", "durban", "capetown", "sap", "datsun", "infiniti", "firmdale", "organic", "nissan", "website", "space", "schmidt", "cuisinella", "samsung", "crs", "doosan", "press", "emerck", "erni", "direct", "yandex", "lotto", "toshiba", "bauhaus", "host", "ltda", "global", "abogado", "place", "tirol", "gmx", "tatar", "scholarships", "eurovision", "wedding", "active", "madrid", "youtube", "sharp", "uol", "physio", "gmail", "channel", "fly", "zip", "esq", "rsvp", "wales", "cymru", "green", "lgbt", "网店", "cancerresearch", "everbank", "frl", "property", "forsale", "seat", "deals", "nra", "娱乐", "realtor", "bnpparibas", "melbourne", "hosting", "yoga", "city", "bond", "click", "cern"],
                                    this.__html_escape = {
                                        "&amp;": /&/g,
                                        "&lt;": /</g,
                                        "&gt;": />/g,
                                        "&quot;": /"/g,
                                        "&#039;": /'/g
                                    },
                                    this.__attribute_escape = {
                                        "\\\\": /\\/g,
                                        "\\t": /\t/g,
                                        "\\n": /\n/g,
                                        "\\u00A0": /\u00A0/g
                                    },
                                    this.__links_regex = {
                                        email: new RegExp("(\\s|<[^<>]+\\/>|^)([\\w\\._-]+@[\\w\\.\\/_-]+)(,|\\s|$)","gi"),
                                        domain: new RegExp("(\\s|<[^<>]+\\/>|^|\\()((?:[^<>\\s@]+)(?:\\.(?:" + this.__gtld_list.map(this.__regex_escape).join("|") + ")))(,|\\s|$)","gim"),
                                        uri: new RegExp("(\\s|<[^<>]+\\/>|^|\\()((?:https?|ftp|file):(?:[^<>\\s]+))(,|\\s|$)","gim")
                                    },
                                    this.__markdown_regex = [["title", /(^)(#{1})([^#].*)($)/gim], ["title", /(^)(#{2})([^#].*)($)/gim], ["title", /(^)(#{3})([^#].*)($)/gim], ["title", /(^)(#{4})([^#].*)($)/gim], ["title", /(^)(#{5})([^#].*)($)/gim], ["title", /(^)(#{6})([^#].*)($)/gim], ["image", /(\s|<[^<>]+\/>|^)!\[([^\[]*)\]\(([^\)]+)\)(\s|$)/gim], ["link", /(\s|<[^<>]+\/>|^)\[([^\[]+)\]\(([^\)]+)\)(\s|$)/gim], ["bold", /(\s|<[^<>]+\/>|^)(\*\*|__)(.*?)(?:\2)/gim], ["italic", /(\s|<[^<>]+\/>|^)(\*|_)(.*?)(?:\2)/gim], ["delete", /(\s|<[^<>]+\/>|^)(\~\~)(.*?)(?:\2)/gim], ["list", /(^\s*)(\*|(?:[\d]+\.))(?:[\s]+)(.*?)($)/gim], ["code", /(\s|<[^<>]+\/>|^)(`{1,3})([^`].*)(?:\2)(\s|$)/gim], ["blockquote", /(^)(&gt;|\>)(.*)($)/gim], ["line", /(^)(\s+)?(-{5,})(\s|$)/gim]],
                                    this.__markdown_trim_items = ["title", "list", "code", "blockquote"],
                                    this.__shortcuts_regex_cache = {},
                                    this.__shortcuts_list = {},
                                    this.__shorcuts_list_extended = !1,
                                    this.__format_pipeline = [this.__apply_escape, this.__apply_consecutive_lines, this.__apply_markdown, this.__apply_shortcuts, this.__apply_links_uri, this.__apply_links_domain, this.__apply_emails, this.__apply_smileys, this.__apply_new_lines]
                                }
                                return e.prototype.format = function(e) {
                                    var t = void 0
                                      , r = e;
                                    for (t = 0; t < this.__format_pipeline.length; t++)
                                        r = this.__format_pipeline[t].bind(this)(r);
                                    return r
                                }
                                ,
                                e.prototype.replace = function(e) {
                                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : []
                                      , r = void 0
                                      , i = void 0
                                      , n = e;
                                    for (r = 0; r < t.length; r++)
                                        i = r + 1,
                                        n = n.replace("%" + i + "s", t[r]);
                                    return n
                                }
                                ,
                                e.prototype.attribute = function(e) {
                                    return this.__apply_escape(e, "attribute")
                                }
                                ,
                                e.prototype.__apply_escape = function(e) {
                                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "html"
                                      , r = void 0
                                      , i = void 0
                                      , n = e
                                      , s = this["__" + t + "_escape"];
                                    for (i in s)
                                        s.hasOwnProperty(i) && (r = s[i],
                                        n = n.replace(r, i));
                                    return n
                                }
                                ,
                                e.prototype.__apply_consecutive_lines = function(e) {
                                    return e.replace(/\n(\s+)?\n(\s+)?\n/g, "\n\n")
                                }
                                ,
                                e.prototype.__apply_new_lines = function(e) {
                                    var t = this.parent.template.render("new_line");
                                    return e.trim().replace(/\n/g, t)
                                }
                                ,
                                e.prototype.__apply_emails = function(e) {
                                    var t = this;
                                    return e.replace(this.__links_regex.email, function(e, r, i, n) {
                                        var s = t.parent.template.render("link_email", {
                                            email: i,
                                            no_external_link: t.parent.config.runtime.no_external_link || !1
                                        });
                                        return "" + r + s + n
                                    })
                                }
                                ,
                                e.prototype.__apply_markdown = function(e) {
                                    e = "\n" + e + "\n";
                                    for (var t = 0; t < this.__markdown_regex.length; t++)
                                        e = e.replace(this.__markdown_regex[t][1], this.__replace_markdown_item(this.__markdown_regex[t]));
                                    return e = e.trim()
                                }
                                ,
                                e.prototype.__apply_links_domain = function(e) {
                                    var t = this;
                                    return e.replace(this.__links_regex.domain, function(e, r, i, n) {
                                        var s = t.parent.template.render("link_domain", {
                                            domain_value: i,
                                            domain_name: i,
                                            no_external_link: t.parent.config.runtime.no_external_link || !1
                                        });
                                        return "" + r + s + n
                                    })
                                }
                                ,
                                e.prototype.__apply_links_uri = function(e) {
                                    var t = this;
                                    return e.replace(this.__links_regex.uri, function(e, r, i, n) {
                                        var s = t.parent.template.render("link_uri", {
                                            uri_value: i,
                                            uri_name: i,
                                            no_external_link: t.parent.config.runtime.no_external_link || !1
                                        });
                                        return "" + r + s + n
                                    })
                                }
                                ,
                                e.prototype.__apply_shortcuts = function(e) {
                                    var t = this
                                      , r = void 0
                                      , i = void 0
                                      , n = e;
                                    return this.__discover_shortcuts(),
                                    Object.keys(this.__shortcuts_list).forEach(function(e) {
                                        t.__shortcuts_list.hasOwnProperty(e) && (r = t.__shortcuts_list[e],
                                        "undefined" == typeof t.__shortcuts_regex_cache[e] && (i = t.__regex_escape(e),
                                        t.__shortcuts_regex_cache[e] = new RegExp("([^\\w.<>/-]+|^)" + ("(" + i + ")") + "([^\\w.<>/-]+|$)","gi")),
                                        n = n.replace(t.__shortcuts_regex_cache[e], function(e, i, n, s) {
                                            var a = t.parent.template.render("link_uri", {
                                                uri_value: r,
                                                uri_name: n
                                            });
                                            return "" + i + a + s
                                        }))
                                    }),
                                    n
                                }
                                ,
                                e.prototype.__apply_smileys = function(e) {
                                    return this.parent.Smileys.parse(e)
                                }
                                ,
                                e.prototype.__replace_markdown_item = function(e) {
                                    var t = this;
                                    return function(r, i, n, s, a) {
                                        var o = ""
                                          , c = ""
                                          , l = {
                                            type: null,
                                            value: null,
                                            url_crisp_image: t.parent.config.url.crisp_image,
                                            no_external_link: t.parent.config.runtime.no_external_link || !1
                                        };
                                        o = ("string" == typeof i ? i : null) || "",
                                        c = ("string" == typeof a ? a : null) || "",
                                        l.type = n,
                                        l.value = s,
                                        t.__markdown_trim_items.indexOf(e[0]) !== -1 && "string" == typeof l.value && (l.value = l.value.trim());
                                        var _ = t.parent.template.render("markdown_" + e[0], l);
                                        return "" + o + _ + c
                                    }
                                }
                                ,
                                e.prototype.__discover_shortcuts = function() {
                                    this.__shorcuts_list_extended !== !0 && (this.__shortcuts_list.crisp = this.parent.config.url.crisp_web,
                                    this.parent.config.context && this.parent.config.context.name && this.parent.config.context.protocol && this.parent.config.context.domain && (this.__shortcuts_list[("" + this.parent.config.context.name).toLowerCase()] = this.parent.config.context.protocol + "//" + (this.parent.config.context.domain + "/")),
                                    this.__shorcuts_list_extended = !0)
                                }
                                ,
                                e.prototype.__regex_escape = function(e) {
                                    return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
                                }
                                ,
                                e
                            }()
                              , i = function() {
                                function e(e) {
                                    this.parent = e,
                                    this.__full_name_regex = /^(\S+)((\s+)(.+))?$/
                                }
                                return e.prototype.parse_first_name = function(e) {
                                    var t = e;
                                    if (t) {
                                        t = t.trim();
                                        var r = t.match(this.__full_name_regex);
                                        r && (t = r[1])
                                    }
                                    return t
                                }
                                ,
                                e
                            }();
                            this.__configure(e),
                            this.Smileys = new t(this),
                            this.Parse = new r(this),
                            this.Name = new i(this)
                        }
                        ,
                        e.prototype.__configure = function(e) {
                            e && e.template && (this.template = e.template),
                            e && e.config && (this.config = e.config)
                        }
                        ,
                        e
                    }()),
                    function(e, t) {
                        e.CrispLibraryClient = new t
                    }(r, function() {
                        function e() {}
                        return e.prototype.init = function(e) {
                            var t = {}
                              , r = function() {
                                function e(e) {
                                    this.parent = e,
                                    this.__message_compose_resend_delay = 6e4,
                                    this.__message_compose_regex = /(^(?:\S+(?:\s+|\?|\!|\.|\(|\)|:|;))+).*$/i,
                                    this.__init_storage(),
                                    this.__init_events()
                                }
                                return e.prototype.send_text_message = function(e) {
                                    this.__send_raw_message({
                                        type: "text",
                                        origin: "chat",
                                        content: e,
                                        timestamp: Date.now(),
                                        fingerprint: this.__gen_fingerprint()
                                    })
                                }
                                ,
                                e.prototype.send_file_message = function(e, t, r) {
                                    this.__send_raw_message({
                                        type: "file",
                                        origin: "chat",
                                        content: {
                                            name: e,
                                            url: t,
                                            type: r
                                        },
                                        timestamp: Date.now(),
                                        fingerprint: this.__gen_fingerprint()
                                    })
                                }
                                ,
                                e.prototype.send_animation_message = function(e, t) {
                                    this.__send_raw_message({
                                        type: "animation",
                                        origin: "chat",
                                        content: {
                                            url: e,
                                            type: t
                                        },
                                        timestamp: Date.now(),
                                        fingerprint: this.__gen_fingerprint()
                                    })
                                }
                                ,
                                e.prototype.send_message_compose = function(e) {
                                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                                    navigator && "1" === navigator.doNotTrack && (t = null),
                                    t = this.__rasterize_message_compose_excerpt(t),
                                    (e !== this.__message_compose.local.type || t !== (this.__message_compose.local.excerpt || null) || "start" === this.__message_compose.local.type && this.__message_compose_local_since && Date.now() - this.__message_compose_local_since >= this.__message_compose_resend_delay) && (this.__message_compose_local_since = Date.now(),
                                    this.__message_compose.local = {
                                        type: e
                                    },
                                    t && (this.__message_compose.local.excerpt = t),
                                    this.parent.socket.emit("message:compose:send", this.__message_compose.local),
                                    this.parent.event.publish("message:compose:send", this.__message_compose.local))
                                }
                                ,
                                e.prototype.receive_message_local = function(e, t, r) {
                                    var i = {
                                        from: "operator",
                                        type: e,
                                        origin: "local",
                                        timestamp: Date.now(),
                                        content: t,
                                        fingerprint: this.__gen_fingerprint(),
                                        user: r
                                    };
                                    this.parent.socket.emit("message:received:local", i),
                                    this.__handle_message_received_local(i)
                                }
                                ,
                                e.prototype.get_message_compose = function() {
                                    this.parent.event.publish("message:compose:received", this.__message_compose.remote)
                                }
                                ,
                                e.prototype.count_message_history = function() {
                                    return this.__messages_history_diff.length
                                }
                                ,
                                e.prototype.get_message_history = function() {
                                    for (var e = 0; e < this.__messages.length; e++) {
                                        var t = this.__messages[e];
                                        t.origin = "history",
                                        t.index = {
                                            current: e + 1,
                                            total: this.__messages.length
                                        },
                                        t.is_me ? this.parent.event.publish("history:message:sent", t) : this.parent.event.publish("history:message:received", t)
                                    }
                                    for (var r = 0; r < this.__messages_history_diff.length; r++) {
                                        var i = this.__messages_history_diff[r];
                                        i.is_me ? this.__handle_message_sent(i, origin = "diff") : this.__handle_message_received(i, origin = "diff")
                                    }
                                    this.__messages_history_diff = []
                                }
                                ,
                                e.prototype.is_sending_messages = function() {
                                    return this.__sending_messages_index.length > 0 && !0
                                }
                                ,
                                e.prototype.set_messages_in_view = function(e) {
                                    this.__messages_in_view = e,
                                    this.__check_mark_messages_read() === !0 && this.__write_messages_cache()
                                }
                                ,
                                e.prototype.get_unread_messages = function() {
                                    this.__unread_messages_count = -1,
                                    this.__handle_unread_messages()
                                }
                                ,
                                e.prototype.set_unread_messages_callback = function(e) {
                                    this.__unread_messages_callback = e
                                }
                                ,
                                e.prototype._clear = function() {
                                    this.__init_storage()
                                }
                                ,
                                e.prototype._storage_session_message_handle = function(e) {
                                    this._restore_messages(e)
                                }
                                ,
                                e.prototype._sync_message_compose_diff = function(e) {
                                    e && (this.__message_compose.remote = e)
                                }
                                ,
                                e.prototype._sync_message_history_diff = function(e) {
                                    if (e) {
                                        this.__sort_messages_by_timestamp(e);
                                        for (var t = 0; t < e.length; t++)
                                            this.__messages_history_diff.push(e[t]);
                                        this.__handle_unread_messages()
                                    }
                                }
                                ,
                                e.prototype._restore_messages = function(e) {
                                    e || (e = []),
                                    this.__messages = e,
                                    this.__sort_messages_by_timestamp(this.__messages);
                                    for (var t = 0; t < this.__messages.length; t++) {
                                        var r = this.__messages[t];
                                        this.__received_messages_index.push(r.fingerprint),
                                        e[t].is_me || r.read || this.__unread_messages_index.push(r.fingerprint)
                                    }
                                    this.__handle_unread_messages()
                                }
                                ,
                                e.prototype.__init_storage = function() {
                                    this.__messages = [],
                                    this.__messages_history_diff = [],
                                    this.__received_messages_index = [],
                                    this.__unread_messages_index = [],
                                    this.__sending_messages_index = [],
                                    this.__updated_messages_index = [],
                                    this.__messages_in_view = !1,
                                    this.__unread_messages_callback = function() {}
                                    ,
                                    this.__unread_messages_count = -1,
                                    this.__message_compose_local_since = 0,
                                    this.__message_compose = {
                                        local: {
                                            type: "stop"
                                        },
                                        remote: {
                                            type: "stop"
                                        }
                                    }
                                }
                                ,
                                e.prototype.__init_events = function() {
                                    this.parent.socket.on("message:sent", this.__handle_message_sent.bind(this)),
                                    this.parent.socket.on("message:received", this.__handle_message_received.bind(this)),
                                    this.parent.socket.on("message:received:local", this.__handle_message_received_local.bind(this)),
                                    this.parent.socket.on("message:compose:received", this.__handle_message_compose_received.bind(this)),
                                    this.parent.socket.on("message:acknowledge:read:send", this.__handle_message_read_send.bind(this)),
                                    this.parent.socket.on("message:acknowledge:read:received", this.__handle_message_read_received.bind(this)),
                                    this.parent.socket.on("message:acknowledge:pending", this.__handle_message_acknowledge_pending.bind(this))
                                }
                                ,
                                e.prototype.__rasterize_message_compose_excerpt = function(e) {
                                    var t = null;
                                    if (null !== e) {
                                        var r = e.match(this.__message_compose_regex);
                                        r && (t = (r[1] || "").trim())
                                    }
                                    return t
                                }
                                ,
                                e.prototype.__send_raw_message = function(e) {
                                    this.__sending_messages_index.indexOf(e.fingerprint) === -1 && this.__sending_messages_index.push(e.fingerprint),
                                    this.parent.socket.emit("message:send", e),
                                    this.parent.event.publish("message:send", e)
                                }
                                ,
                                e.prototype.__acknowledge_messages_pending = function(e) {
                                    this.parent.socket.emit("message:acknowledge:pending", {
                                        origin: "chat",
                                        fingerprints: e
                                    }),
                                    this.parent.socket.emit("message:acknowledge:delivered", {
                                        origin: "chat",
                                        fingerprints: e
                                    })
                                }
                                ,
                                e.prototype.__acknowledge_messages_read_received = function(e) {
                                    this.parent.socket.emit("message:acknowledge:read:received", {
                                        origin: "chat",
                                        fingerprints: e
                                    })
                                }
                                ,
                                e.prototype.__mark_messages_read = function(e, t) {
                                    var r = !1;
                                    t === !1 && (this.__unread_messages_index = [],
                                    this.__handle_unread_messages());
                                    for (var i = 0; i < this.__messages.length; i++) {
                                        var n = this.__messages[i];
                                        if (n.read !== !0 && (0 === e.length || e.indexOf(n.fingerprint) !== -1)) {
                                            var s = n.is_me === !0;
                                            t === s && (n.read = !0,
                                            r = !0,
                                            this.__set_message_updated(n))
                                        }
                                    }
                                    return r
                                }
                                ,
                                e.prototype.__check_mark_messages_read = function() {
                                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []
                                      , t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
                                      , r = t || !1;
                                    return t === !1 && this.__messages_in_view === !0 && this.__unread_messages_index.length > 0 && (this.__acknowledge_messages_read_received(this.__unread_messages_index),
                                    r = !0),
                                    r === !0 && this.__mark_messages_read(e, t)
                                }
                                ,
                                e.prototype.__write_messages_cache = function(e, t) {
                                    if (this.__updated_messages_index.length > 0) {
                                        for (var r = [], i = 0; i < this.__messages.length; i++)
                                            this.__updated_messages_index.indexOf(this.__messages[i].fingerprint) !== -1 && r.push(this.__messages[i]);
                                        this.__updated_messages_index = [],
                                        this.parent.Storage.update("message", r, e, t)
                                    } else
                                        "function" == typeof e && e()
                                }
                                ,
                                e.prototype.__cache_message = function(e, t, r) {
                                    this.__is_message_received(e) ? "function" == typeof t && t() : (this.__received_messages_index.push(e.fingerprint),
                                    this.__messages.push(e),
                                    this.__check_mark_messages_read(),
                                    this.__set_message_updated(e),
                                    this.__write_messages_cache(t, r))
                                }
                                ,
                                e.prototype.__set_message_updated = function(e) {
                                    this.__updated_messages_index.indexOf(e.fingerprint) === -1 && this.__updated_messages_index.push(e.fingerprint)
                                }
                                ,
                                e.prototype.__sort_messages_by_timestamp = function(e) {
                                    e.sort(function(e, t) {
                                        return e.timestamp < t.timestamp ? -1 : e.timestamp > t.timestamp ? 1 : 0
                                    })
                                }
                                ,
                                e.prototype.__gen_fingerprint = function() {
                                    for (var e = 5, t = navigator.userAgent + Date.now(), r = 5381, i = 0; i < t.length; i++) {
                                        var n = t.charCodeAt(i);
                                        r = (r << e) + r + n
                                    }
                                    return r
                                }
                                ,
                                e.prototype.__handle_unread_messages = function() {
                                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []
                                      , t = this.__unread_messages_index.length;
                                    t !== this.__unread_messages_count && (this.__unread_messages_count = t,
                                    "function" == typeof this.__unread_messages_callback && this.__unread_messages_callback(t, this.__unread_messages_index, [].concat(this.__messages, e)));
                                }
                                ,
                                e.prototype.__handle_message_sent = function(e) {
                                    var t = this
                                      , r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "network"
                                      , i = this.__sending_messages_index.indexOf(e.fingerprint);
                                    i !== -1 && this.__sending_messages_index.splice(i, 1),
                                    e.origin = r,
                                    e.index = {
                                        current: 1,
                                        total: 1
                                    },
                                    this.__cache_message(e, function() {
                                        t.parent.event.publish("message:sent", e)
                                    })
                                }
                                ,
                                e.prototype.__handle_message_received = function(e) {
                                    var t = this
                                      , r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "network"
                                      , i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "message:received";
                                    e.origin = r,
                                    e.index = {
                                        current: 1,
                                        total: 1
                                    },
                                    this.__unread_messages_index.push(e.fingerprint),
                                    this.__handle_unread_messages(pending_messages = [e]),
                                    this.__cache_message(e, function() {
                                        t.__acknowledge_messages_pending([e.fingerprint]),
                                        t.parent.event.publish(i, e)
                                    })
                                }
                                ,
                                e.prototype.__handle_message_received_local = function(e) {
                                    this.__handle_message_received(e, origin = "local", event = "message:received:local")
                                }
                                ,
                                e.prototype.__handle_message_compose_received = function(e) {
                                    this.__message_compose.remote = e,
                                    this.parent.event.publish("message:compose:received", e)
                                }
                                ,
                                e.prototype.__handle_message_read_send = function(e) {
                                    this.__check_mark_messages_read(e.fingerprints, !0) === !0 && this.__write_messages_cache(),
                                    this.parent.event.publish("message:acknowledge:read:send", e.fingerprints)
                                }
                                ,
                                e.prototype.__handle_message_read_received = function(e) {
                                    for (var t = 0; t < e.fingerprints.length; t++) {
                                        var r = this.__unread_messages_index.indexOf(e.fingerprints[t]);
                                        r !== -1 && this.__unread_messages_index.splice(r, 1)
                                    }
                                    this.__handle_unread_messages()
                                }
                                ,
                                e.prototype.__handle_message_acknowledge_pending = function(e) {
                                    this.parent.event.publish("message:acknowledge:pending", e.fingerprints)
                                }
                                ,
                                e.prototype.__is_message_received = function(e) {
                                    return this.__received_messages_index.indexOf(e.fingerprint) > -1
                                }
                                ,
                                e
                            }()
                              , i = function() {
                                function e(e) {
                                    this.parent = e,
                                    this.__regex_referer = new RegExp("^(https?\\:\\/\\/[^/]+)\\/chat\\/resume\\/\\?target_url=(.+)&session_id=(.+)$"),
                                    this.__regex_parameter_sid = /^\?.*(crisp_sid=([^&=]+)).*$/,
                                    this.__interval_heartbeat_soft = 15e4,
                                    this.__interval_heartbeat_hard = 18e4,
                                    this.parent.disable_autoload || (this.__init_storage(),
                                    this.__init_events())
                                }
                                return e.prototype.save = function() {
                                    this.parent.cookie.set(this.__get_cookie_key(), this.__session_id, {
                                        domain: this.__get_base_domain(),
                                        expires: 1 / 0
                                    }),
                                    this.parent.event.publish("session:saved", this.__session_id)
                                }
                                ,
                                e.prototype.storage_session_retrieve = function(e) {
                                    this.__storage_session_state_handle(e.state),
                                    this.parent.Message._storage_session_message_handle(e.message)
                                }
                                ,
                                e.prototype.sync_session_diff = function(e) {
                                    this.parent.Message._sync_message_compose_diff(e.compose),
                                    this.parent.Message._sync_message_history_diff(e.messages)
                                }
                                ,
                                e.prototype.sync_user_data = function(e) {
                                    this.__user_data.email && this.__user_data.email !== e.email ? this.set_email(this.__user_data.email, !0) : this.__user_data.email = e.email || null,
                                    this.__user_data.nickname && this.__user_data.nickname !== e.nickname ? this.set_nickname(this.__user_data.nickname, !0) : this.__user_data.nickname = e.nickname || null,
                                    this.__sync_data_diff(e.data || {}, this.__user_data.data)
                                }
                                ,
                                e.prototype.send_device = function() {
                                    this.parent.socket.emit("session:device", {
                                        page_url: this.parent.device.page_url,
                                        page_title: this.parent.device.page_title,
                                        page_referrer: this.parent.device.page_referrer
                                    })
                                }
                                ,
                                e.prototype.get_request_initiate = function(e) {
                                    Object.keys && 0 === Object.keys(this.__state).length && this.parent.Message.count_message_history() > 0 && this.__handle_session_request_initiate({}),
                                    "function" == typeof e && e()
                                }
                                ,
                                e.prototype.get_state = function(e) {
                                    this.handle_state(this.__state, e)
                                }
                                ,
                                e.prototype.handle_state = function(e, t) {
                                    this.__state = e,
                                    this.parent.event.publish("session:state", this.__state),
                                    "function" == typeof t && t()
                                }
                                ,
                                e.prototype.set_state = function(e, t) {
                                    for (var r in e)
                                        this.__state[r] = e[r];
                                    this.parent.Storage.update("state", e),
                                    this.sync_state(e, t)
                                }
                                ,
                                e.prototype.sync_state = function(e, t) {
                                    this.parent.socket.emit("session:state", e),
                                    this.handle_state(e, t)
                                }
                                ,
                                e.prototype.create = function() {
                                    var e = {
                                        website_id: this.parent.website_id,
                                        website_domain: this.parent.website_domain,
                                        useragent: this.parent.device.useragent,
                                        timezone: this.parent.device.timezone,
                                        locales: this.parent.device.locales
                                    };
                                    this.parent.token_id && (e.token_id = this.parent.token_id),
                                    this.parent.socket.emit("session:create", e)
                                }
                                ,
                                e.prototype.get_email = function() {
                                    return this.__user_data.email
                                }
                                ,
                                e.prototype.set_email = function(e) {
                                    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                                    this.__user_data.email === e && t !== !0 || (this.__user_data.email = e,
                                    this.__connected === !0 && this.parent.socket.emit("session:set_email", {
                                        email: e
                                    }))
                                }
                                ,
                                e.prototype.get_nickname = function() {
                                    return this.__user_data.nickname
                                }
                                ,
                                e.prototype.set_nickname = function(e) {
                                    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                                    this.__user_data.nickname === e && t !== !0 || (this.__user_data.nickname = e,
                                    this.__connected === !0 && this.parent.socket.emit("session:set_nickname", {
                                        nickname: e
                                    }))
                                }
                                ,
                                e.prototype.get_data = function() {
                                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                                    return null === e ? this.__user_data.data : this.__user_data.data[e] || null
                                }
                                ,
                                e.prototype.set_data = function(e, t) {
                                    var r = {};
                                    r[e] = t,
                                    this.__sync_data_diff(this.__user_data.data || {}, r)
                                }
                                ,
                                e.prototype.mark_active = function() {
                                    this.__last_active = Date.now()
                                }
                                ,
                                e.prototype.restore = function() {
                                    var e = this.__obtain_cached_session_id()
                                      , t = null
                                      , r = (location.search || "").match(this.__regex_parameter_sid)
                                      , i = (document.referrer || "").match(this.__regex_referer);
                                    r && r[2] && r[2] !== e && (t = r[2] || null),
                                    i && i[1] === this.parent.url_go && i[3] !== e && (t = i[3] || null);
                                    var n = t || e
                                      , s = t && !0;
                                    this.__restore_session(n, s)
                                }
                                ,
                                e.prototype.join = function() {
                                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                                    this.parent.socket.emit("session:join", {
                                        session_id: this.__session_id,
                                        expire: this.__interval_heartbeat_hard,
                                        storage: !0,
                                        sync: e,
                                        useragent: this.parent.device.useragent,
                                        timezone: this.parent.device.timezone,
                                        locales: this.parent.device.locales
                                    })
                                }
                                ,
                                e.prototype.clear = function(e, t) {
                                    var r = null;
                                    try {
                                        this.parent.Message._clear(),
                                        this.parent.Browsing._clear(),
                                        this.parent.Storage._clear(),
                                        this.__clear()
                                    } catch (e) {
                                        r = e
                                    }
                                    r ? "function" == typeof t && t(r) : "function" == typeof e && e()
                                }
                                ,
                                e.prototype.__init_storage = function() {
                                    this.__session_id = null,
                                    this.__connected = !1,
                                    this.__last_active = Date.now(),
                                    this.__user_data = {},
                                    this.__state = {}
                                }
                                ,
                                e.prototype.__init_events = function() {
                                    var e = this;
                                    this.parent.socket.on("session:created", this.__handle_session_created.bind(this)),
                                    this.parent.socket.on("session:joined", this.__handle_session_joined.bind(this)),
                                    this.parent.socket.on("session:state", this.__handle_session_state.bind(this)),
                                    this.parent.socket.on("session:error", this.__handle_session_error.bind(this)),
                                    this.parent.socket.on("session:request:initiate", this.__handle_session_request_initiate.bind(this)),
                                    this.parent.socket.on("connect", function() {
                                        e.__connected ? e.join() : e.restore()
                                    })
                                }
                                ,
                                e.prototype.__handle_session_created = function(e) {
                                    e.error ? this.parent.event.publish("session:created", {
                                        error: e.error
                                    }) : (this.__session_id = e.session_id,
                                    this.save(),
                                    this.join(),
                                    this.parent.event.publish("session:created", {
                                        session_id: this.__session_id
                                    }))
                                }
                                ,
                                e.prototype.__handle_session_joined = function(e) {
                                    e.error ? this.parent.event.publish("session:joined", {
                                        error: e.error
                                    }) : (this.__connected || (this.__connected = !0,
                                    this.send_device()),
                                    this.parent.Website.set_users_available(e.users_available),
                                    this.storage_session_retrieve(e.storage || {}),
                                    this.sync_session_diff(e.sync || {}),
                                    this.sync_user_data(e),
                                    this.parent.Browsing.restore_browsing_state(),
                                    this.parent.event.publish("session:joined", e),
                                    this.__keep_alive())
                                }
                                ,
                                e.prototype.__handle_session_state = function(e) {
                                    this.handle_state(e)
                                }
                                ,
                                e.prototype.__handle_session_error = function(e) {
                                    this.parent.event.publish("session:error", e)
                                }
                                ,
                                e.prototype.__handle_session_request_initiate = function(e) {
                                    this.parent.event.publish("session:request:initiate", e)
                                }
                                ,
                                e.prototype.__clear = function() {
                                    this.__init_storage(),
                                    this.parent.cookie.expire(this.__get_cookie_key(), {
                                        domain: this.__get_base_domain()
                                    })
                                }
                                ,
                                e.prototype.__obtain_cached_session_id = function() {
                                    return this.parent.cookie.get(this.__get_cookie_key()) || null
                                }
                                ,
                                e.prototype.__restore_session = function(e) {
                                    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                                    e ? (this.__session_id = e,
                                    t === !0 && this.save(),
                                    this.join(!0)) : this.create()
                                }
                                ,
                                e.prototype.__storage_session_state_handle = function(e) {
                                    this.__state = e || {}
                                }
                                ,
                                e.prototype.__keep_alive = function() {
                                    var e = this;
                                    setInterval(function() {
                                        e.parent.socket.emit("session:heartbeat", {
                                            last_active: e.__last_active || 0,
                                            availability: {
                                                type: "online",
                                                time: {
                                                    for: e.__interval_heartbeat_hard
                                                }
                                            }
                                        })
                                    }, this.__interval_heartbeat_soft)
                                }
                                ,
                                e.prototype.__get_cookie_key = function() {
                                    return "crisp-client/session/" + this.parent.website_id
                                }
                                ,
                                e.prototype.__get_base_domain = function() {
                                    var e = document.domain
                                      , t = e;
                                    try {
                                        for (var r = 0, i = t.split("."), n = "crisp-client/domain-detect/" + Date.now(); r < i.length - 1 && document.cookie.indexOf(n + "=" + n) === -1; )
                                            t = i.slice(-1 - ++r).join("."),
                                            document.cookie = n + "=" + n + ";domain=" + t + ";";
                                        document.cookie = n + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=" + t + ";"
                                    } catch (e) {} finally {
                                        return t || e
                                    }
                                }
                                ,
                                e.prototype.__sync_data_diff = function(e, t) {
                                    this.__user_data.data || (this.__user_data.data = {});
                                    var r = !1
                                      , i = {};
                                    for (var n in t)
                                        e[n] !== t[n] && (r = !0,
                                        i[n] = t[n]);
                                    this.__user_data.data = e;
                                    for (var s in i)
                                        this.__user_data.data[s] = i[s];
                                    r === !0 && this.__connected === !0 && this.parent.socket.emit("session:set_data", {
                                        data: i
                                    })
                                }
                                ,
                                e
                            }()
                              , n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                                return typeof e
                            }
                            : function(e) {
                                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                            }
                              , s = function() {
                                function e(e) {
                                    this.parent = e,
                                    this.__ray_entropy_factor = 1e4,
                                    this.__init_storage(),
                                    this.__init_events()
                                }
                                return e.prototype.update = function(e, t) {
                                    var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function() {}
                                      , i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : function() {}
                                      , n = {
                                        ray: this.__gen_ray(e),
                                        type: e,
                                        data: t
                                    };
                                    this.__pending_rays_index.push(n.ray),
                                    this.__callback_register[n.ray] = {
                                        success: r,
                                        error: i
                                    },
                                    this.parent.socket.emit("storage:sync:update", n),
                                    this.parent.event.publish("storage:sync:update", n)
                                }
                                ,
                                e.prototype.is_syncing_storage = function() {
                                    return this.__pending_rays_index.length > 0 && !0
                                }
                                ,
                                e.prototype._clear = function() {
                                    this.__init_storage()
                                }
                                ,
                                e.prototype.__init_storage = function() {
                                    this.__ray_entropy_seed = 1,
                                    this.__ray_entropy_increment = 0,
                                    this.__callback_register = {},
                                    this.__pending_rays_index = []
                                }
                                ,
                                e.prototype.__init_events = function() {
                                    this.parent.socket.on("storage:sync:updated", this.__handle_storage_sync_updated.bind(this))
                                }
                                ,
                                e.prototype.__handle_storage_sync_updated = function(e) {
                                    if ("object" === n(this.__callback_register[e.ray])) {
                                        e.error ? this.__callback_register[e.ray].error() : this.__callback_register[e.ray].success(),
                                        delete this.__callback_register[e.ray];
                                        var t = this.__pending_rays_index.indexOf(e.ray);
                                        t !== -1 && this.__pending_rays_index.splice(t, 1)
                                    }
                                    this.parent.event.publish("storage:sync:updated", e)
                                }
                                ,
                                e.prototype.__gen_ray = function(e) {
                                    var t = void 0
                                      , r = void 0;
                                    return t = Math.sin(this.__ray_entropy_seed++) * this.__ray_entropy_factor,
                                    t -= Math.floor(t),
                                    r = this.__ray_entropy_increment++,
                                    e + "/" + Date.now() + "/" + t + "/" + r
                                }
                                ,
                                e
                            }()
                              , a = function() {
                                function e(e) {
                                    this.parent = e,
                                    this.__init_storage(),
                                    this.__init_events()
                                }
                                return e.prototype.get_users_available = function() {
                                    this.__publish_users_available()
                                }
                                ,
                                e.prototype.set_users_available = function(e) {
                                    this.__users_available = e
                                }
                                ,
                                e.prototype.__init_storage = function() {
                                    this.__users_available = !1
                                }
                                ,
                                e.prototype.__init_events = function() {
                                    this.parent.socket.on("website:users:available", this.__handle_website_users_available.bind(this))
                                }
                                ,
                                e.prototype.__handle_website_users_available = function(e) {
                                    "boolean" == typeof e && (this.set_users_available(e),
                                    this.__publish_users_available())
                                }
                                ,
                                e.prototype.__publish_users_available = function() {
                                    this.parent.event.publish("website:users:available", this.__users_available)
                                }
                                ,
                                e
                            }()
                              , o = function() {
                                function e(e) {
                                    this.parent = e,
                                    this.__init_events()
                                }
                                return e.prototype.get_url_upload = function(e, t) {
                                    var r = {
                                        id: Date.now(),
                                        from: "visitor",
                                        file: {
                                            name: e,
                                            type: t
                                        }
                                    };
                                    this.parent.socket.emit("bucket:url:upload:generate", r),
                                    this.parent.event.publish("bucket:url:upload:generate", r)
                                }
                                ,
                                e.prototype.__init_events = function() {
                                    this.parent.socket.on("bucket:url:upload:generated", this.__handle_bucket_url_upload_generate.bind(this))
                                }
                                ,
                                e.prototype.__handle_bucket_url_upload_generate = function(e) {
                                    this.parent.event.publish("bucket:url:upload:generated", e)
                                }
                                ,
                                e
                            }()
                              , c = function() {
                                function e(e) {
                                    this.parent = e,
                                    this.__init_events()
                                }
                                return e.prototype.get_animation_list = function() {
                                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null
                                      , t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1
                                      , r = {
                                        id: Date.now(),
                                        from: "visitor",
                                        list: {
                                            page: t
                                        }
                                    };
                                    e && (r.list.query = e),
                                    this.parent.socket.emit("media:animation:list", r),
                                    this.parent.event.publish("media:animation:list", r)
                                }
                                ,
                                e.prototype.__init_events = function() {
                                    this.parent.socket.on("media:animation:listed", this.__handle_media_animation_list.bind(this))
                                }
                                ,
                                e.prototype.__handle_media_animation_list = function(e) {
                                    this.parent.event.publish("media:animation:listed", e)
                                }
                                ,
                                e
                            }()
                              , l = function() {
                                function e(e) {
                                    this.parent = e,
                                    this.__interval_heartbeat = 1e4,
                                    this.__timeout_dead_peer = 45e3,
                                    this.__throttle_delay = 150,
                                    this.__is_initiated = !1,
                                    this.__browsing_id = null,
                                    this.__is_playing = !1,
                                    this.__last_heartbeat = null,
                                    this.__keep_alive_interval = null,
                                    this.__tree_mirror = null,
                                    this.__mouse_position = {
                                        x: 0,
                                        y: 0,
                                        last_call: Date.now()
                                    },
                                    this.__scroll_position = {
                                        x: 0,
                                        y: 0,
                                        last_call: Date.now()
                                    },
                                    this.__resize_params = {
                                        last_call: Date.now()
                                    },
                                    this.__initial_stream = null,
                                    this.__init_events(),
                                    this.__restore_browsing_cache(),
                                    this.__bind_mouse(),
                                    this.__bind_resize(),
                                    this.__bind_scroll()
                                }
                                return e.prototype.init = function(e) {
                                    this.__tree_mirror = e.deps.tree_mirror || null,
                                    this.__is_initiated = !0,
                                    e.resume === !0 ? (this.parent.socket.emit("browsing:resume", {
                                        browsing_id: this.__browsing_id
                                    }),
                                    this.__keep_alive(!0),
                                    this.__is_playing === !0 && this.__start(!0)) : navigator && "1" === navigator.doNotTrack ? this.parent.socket.emit("browsing:request:decline", {}) : (this.__keep_alive(!0),
                                    this.parent.socket.emit("browsing:request:accept", {
                                        useragent: navigator.userAgent
                                    }))
                                }
                                ,
                                e.prototype.restore_browsing_state = function() {
                                    this.__browsing_id && (this.__is_dead_remote_peer() === !1 ? this.__handle_request_initiate({
                                        resume: !0
                                    }) : this.__stop())
                                }
                                ,
                                e.prototype._clear = function() {
                                    this.__init_storage(),
                                    "undefined" != typeof window.sessionStorage && window.sessionStorage.removeItem(this.__get_cookie_key())
                                }
                                ,
                                e.prototype.__init_storage = function() {
                                    this.__browsing_id = null,
                                    this.__is_playing = !1,
                                    this.__last_heartbeat = null,
                                    this.__keep_alive_interval = null
                                }
                                ,
                                e.prototype.__get_cookie_key = function() {
                                    return "crisp-client/browsing/" + this.parent.website_id
                                }
                                ,
                                e.prototype.__init_events = function() {
                                    this.parent.socket.on("browsing:request:initiate", this.__handle_request_initiate.bind(this)),
                                    this.parent.socket.on("browsing:request:initiated", this.__handle_request_initiated.bind(this)),
                                    this.parent.socket.on("browsing:action:start", this.__handle_action_start.bind(this)),
                                    this.parent.socket.on("browsing:action:stop", this.__handle_action_stop.bind(this)),
                                    this.parent.socket.on("browsing:action:heartbeat", this.__handle_action_heartbeat.bind(this))
                                }
                                ,
                                e.prototype.__restore_browsing_cache = function() {
                                    if (void 0 !== window.sessionStorage) {
                                        var e = window.sessionStorage.getItem(this.__get_cookie_key());
                                        e && (e = JSON.parse(e),
                                        this.__browsing_id = e.browsing_id || null,
                                        this.__is_playing = e.is_playing || !1,
                                        this.__last_heartbeat = e.last_heartbeat || null)
                                    }
                                }
                                ,
                                e.prototype.__handle_request_initiate = function(e) {
                                    e.resume !== !0 && this.__stop(),
                                    this.parent.event.publish("browsing:request:initiate", e || {})
                                }
                                ,
                                e.prototype.__handle_request_initiated = function(e) {
                                    this.__is_initiated === !0 && (this.__browsing_id = e.browsing_id,
                                    this.__last_heartbeat = Date.now(),
                                    this.__save_cache())
                                }
                                ,
                                e.prototype.__handle_action_start = function() {
                                    this.__is_initiated === !0 && this.__browsing_id && this.__start()
                                }
                                ,
                                e.prototype.__handle_action_stop = function() {
                                    this.__is_initiated === !0 && this.__browsing_id && this.__stop()
                                }
                                ,
                                e.prototype.__handle_action_heartbeat = function() {
                                    this.__is_initiated === !0 && this.__browsing_id && (this.__last_heartbeat = Date.now(),
                                    this.__save_cache())
                                }
                                ,
                                e.prototype.__save_cache = function() {
                                    "undefined" != typeof window.sessionStorage && JSON && "function" == typeof JSON.stringify && window.sessionStorage.setItem(this.__get_cookie_key(), JSON.stringify({
                                        browsing_id: this.__browsing_id,
                                        is_playing: this.__is_playing,
                                        last_heartbeat: this.__last_heartbeat
                                    }))
                                }
                                ,
                                e.prototype.__start = function() {
                                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                                    this.__is_playing = !0,
                                    this.__last_heartbeat = Date.now(),
                                    this.__save_cache(),
                                    this.__stream(),
                                    e !== !0 && this.parent.socket.emit("browsing:action:started", {})
                                }
                                ,
                                e.prototype.__stop = function() {
                                    var e = this.__is_playing;
                                    this.__browsing_id = null,
                                    this.__is_playing = !1,
                                    this.__last_heartbeat = null,
                                    this.__save_cache(),
                                    this.__keep_alive(!1),
                                    e === !0 && this.parent.socket.emit("browsing:action:stopped", {})
                                }
                                ,
                                e.prototype.__stream = function() {
                                    var e = this;
                                    return this.__stream_mouse(),
                                    this.__stream_tab(),
                                    this.__stream_scroll(),
                                    this.__mirror_client ? this.__stream_mirror(this.__initial_stream) : void (this.__mirror_client = new this.__tree_mirror(document,{
                                        initialize: function(t, r) {
                                            e.__initial_stream = {
                                                f: "initialize",
                                                args: [t, r]
                                            },
                                            e.__stream_mirror(e.__initial_stream)
                                        },
                                        applyChanged: function(t, r, i, n) {
                                            e.__stream_mirror({
                                                f: "applyChanged",
                                                args: [t, r, i, n]
                                            })
                                        }
                                    }))
                                }
                                ,
                                e.prototype.__stream_mirror = function(e) {
                                    this.parent.socket.emit("browsing:stream:mirror", e)
                                }
                                ,
                                e.prototype.__stream_tab = function() {
                                    this.parent.socket.emit("browsing:stream:tab", {
                                        title: document.title,
                                        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                                        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
                                    })
                                }
                                ,
                                e.prototype.__stream_mouse = function() {
                                    this.parent.socket.emit("browsing:stream:mouse", {
                                        x: this.__mouse_position.x,
                                        y: this.__mouse_position.y
                                    })
                                }
                                ,
                                e.prototype.__stream_scroll = function() {
                                    this.parent.socket.emit("browsing:stream:scroll", {
                                        x: this.__scroll_position.x,
                                        y: this.__scroll_position.y
                                    })
                                }
                                ,
                                e.prototype.__bind_mouse = function() {
                                    var e = this
                                      , t = void 0;
                                    "function" == typeof document.onmousemove && (t = document.onmousemove),
                                    document.onmousemove = function(r) {
                                        var i = e.__mouse_position.last_call;
                                        e.__mouse_position.x = r.pageX,
                                        e.__mouse_position.y = r.pageY,
                                        e.__mouse_position.last_call = Date.now(),
                                        i && Date.now() > i + e.__throttle_delay && e.__is_playing && e.__stream_mouse(),
                                        "function" == typeof t && t(r)
                                    }
                                }
                                ,
                                e.prototype.__bind_resize = function() {
                                    var e = this
                                      , t = void 0;
                                    "function" == typeof window.onmousemove && (t = window.onresize),
                                    window.onresize = function(r) {
                                        var i = e.__resize_params.last_call;
                                        e.__resize_params.last_call = Date.now(),
                                        i && Date.now() > i + e.__throttle_delay && e.__is_playing && e.__stream_tab(),
                                        "function" == typeof t && t(r)
                                    }
                                }
                                ,
                                e.prototype.__bind_scroll = function() {
                                    var e = this
                                      , t = void 0;
                                    "function" == typeof window.onscroll && (t = window.onscroll),
                                    window.onscroll = function(r) {
                                        var i = e.__scroll_position.last_call
                                          , n = document.documentElement;
                                        e.__scroll_position.x = (window.pageXOffset || n.scrollLeft) - (n.clientLeft || 0),
                                        e.__scroll_position.y = (window.pageYOffset || n.scrollTop) - (n.clientTop || 0),
                                        e.__scroll_position.last_call = Date.now(),
                                        i && Date.now() > i + e.__throttle_delay && e.__is_playing && e.__stream_scroll(),
                                        "function" == typeof t && t(r)
                                    }
                                }
                                ,
                                e.prototype.__is_dead_remote_peer = function() {
                                    return null === this.__last_heartbeat || null !== this.__last_heartbeat && Date.now() - this.__last_heartbeat >= this.__timeout_dead_peer
                                }
                                ,
                                e.prototype.__keep_alive = function() {
                                    var e = this
                                      , t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                                    null !== this.__keep_alive_interval && clearInterval(this.__keep_alive_interval),
                                    t === !0 && (this.__keep_alive_interval = setInterval(function() {
                                        e.parent.socket.emit("browsing:heartbeat", {}),
                                        e.__is_dead_remote_peer() === !0 && e.__stop()
                                    }, this.__interval_heartbeat))
                                }
                                ,
                                e
                            }()
                              , n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                                return typeof e
                            }
                            : function(e) {
                                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                            }
                              , _ = function() {
                                function e(e) {
                                    this.parent = e,
                                    this.__init_storage()
                                }
                                return e.prototype.configure = function(e) {
                                    this._state_project = e.project,
                                    this._state_revision = e.revision,
                                    this._state_environment = e.environment,
                                    this._state_useragent = e.useragent,
                                    this._state_page = e.page
                                }
                                ,
                                e.prototype.report = function(e, t, r) {
                                    if (!(this._state_project && this._state_revision && this._state_environment && this._state_useragent && this._state_page))
                                        throw new Error("Missing a configuration parameter. Did you call configure() before?");
                                    "object" === ("undefined" == typeof r ? "undefined" : n(r)) && r instanceof Error && (r = {
                                        fileName: r.fileName,
                                        lineNumber: r.lineNumber,
                                        columnNumber: r.columnNumber,
                                        message: r.message,
                                        stack: r.stack
                                    });
                                    var i = {
                                        project: this._state_project,
                                        revision: this._state_revision,
                                        environment: this._state_environment,
                                        useragent: this._state_useragent,
                                        page: this._state_page,
                                        level: e,
                                        namespace: t,
                                        traceback: r
                                    };
                                    this.parent.socket.emit("issue:report", i),
                                    this.parent.event.publish("issue:report", i)
                                }
                                ,
                                e.prototype.__init_storage = function() {
                                    this._state_project = null,
                                    this._state_revision = null,
                                    this._state_environment = null,
                                    this._state_useragent = null,
                                    this._state_page = null
                                }
                                ,
                                e
                            }();
                            (function(e, t) {
                                "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof __crisp_void_define && define.amd ? define([], t) : "object" == typeof exports ? exports.io = t() : e.io = t()
                            })(t, function() {
                                return function(e) {
                                    function t(i) {
                                        if (r[i])
                                            return r[i].exports;
                                        var n = r[i] = {
                                            exports: {},
                                            id: i,
                                            loaded: !1
                                        };
                                        return e[i].call(n.exports, n, n.exports, t),
                                        n.loaded = !0,
                                        n.exports
                                    }
                                    var r = {};
                                    return t.m = e,
                                    t.c = r,
                                    t.p = "",
                                    t(0)
                                }([function(e, t, r) {
                                    "use strict";
                                    function i(e, t) {
                                        "object" === ("undefined" == typeof e ? "undefined" : s(e)) && (t = e,
                                        e = void 0),
                                        t = t || {};
                                        var r, i = a(e), o = i.source, p = i.id, h = i.path, u = _[p] && h in _[p].nsps, d = t.forceNew || t["force new connection"] || !1 === t.multiplex || u;
                                        return d ? (l("ignoring socket cache for %s", o),
                                        r = c(o, t)) : (_[p] || (l("new io instance for %s", o),
                                        _[p] = c(o, t)),
                                        r = _[p]),
                                        i.query && !t.query ? t.query = i.query : t && "object" === s(t.query) && (t.query = n(t.query)),
                                        r.socket(i.path, t)
                                    }
                                    function n(e) {
                                        var t = [];
                                        for (var r in e)
                                            e.hasOwnProperty(r) && t.push(encodeURIComponent(r) + "=" + encodeURIComponent(e[r]));
                                        return t.join("&")
                                    }
                                    var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                                        return typeof e
                                    }
                                    : function(e) {
                                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                                    }
                                      , a = r(1)
                                      , o = r(7)
                                      , c = r(17)
                                      , l = r(3)("socket.io-client");
                                    e.exports = t = i;
                                    var _ = t.managers = {};
                                    t.protocol = o.protocol,
                                    t.connect = i,
                                    t.Manager = r(17),
                                    t.Socket = r(45)
                                }
                                , function(e, t, r) {
                                    (function(t) {
                                        "use strict";
                                        function i(e, r) {
                                            var i = e;
                                            r = r || t.location,
                                            null == e && (e = r.protocol + "//" + r.host),
                                            "string" == typeof e && ("/" === e.charAt(0) && (e = "/" === e.charAt(1) ? r.protocol + e : r.host + e),
                                            /^(https?|wss?):\/\//.test(e) || (s("protocol-less url %s", e),
                                            e = "undefined" != typeof r ? r.protocol + "//" + e : "https://" + e),
                                            s("parse %s", e),
                                            i = n(e)),
                                            i.port || (/^(http|ws)$/.test(i.protocol) ? i.port = "80" : /^(http|ws)s$/.test(i.protocol) && (i.port = "443")),
                                            i.path = i.path || "/";
                                            var a = i.host.indexOf(":") !== -1
                                              , o = a ? "[" + i.host + "]" : i.host;
                                            return i.id = i.protocol + "://" + o + ":" + i.port,
                                            i.href = i.protocol + "://" + o + (r && r.port === i.port ? "" : ":" + i.port),
                                            i
                                        }
                                        var n = r(2)
                                          , s = r(3)("socket.io-client:url");
                                        e.exports = i
                                    }
                                    ).call(t, function() {
                                        return this
                                    }())
                                }
                                , function(e, t) {
                                    var r = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
                                      , i = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
                                    e.exports = function(e) {
                                        var t = e
                                          , n = e.indexOf("[")
                                          , s = e.indexOf("]");
                                        n != -1 && s != -1 && (e = e.substring(0, n) + e.substring(n, s).replace(/:/g, ";") + e.substring(s, e.length));
                                        for (var a = r.exec(e || ""), o = {}, c = 14; c--; )
                                            o[i[c]] = a[c] || "";
                                        return n != -1 && s != -1 && (o.source = t,
                                        o.host = o.host.substring(1, o.host.length - 1).replace(/;/g, ":"),
                                        o.authority = o.authority.replace("[", "").replace("]", "").replace(/;/g, ":"),
                                        o.ipv6uri = !0),
                                        o
                                    }
                                }
                                , function(e, t, r) {
                                    (function(i) {
                                        function n() {
                                            return "undefined" != typeof document && "WebkitAppearance"in document.documentElement.style || window.console && (console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31
                                        }
                                        function s() {
                                            var e = arguments
                                              , r = this.useColors;
                                            if (e[0] = (r ? "%c" : "") + this.namespace + (r ? " %c" : " ") + e[0] + (r ? "%c " : " ") + "+" + t.humanize(this.diff),
                                            !r)
                                                return e;
                                            var i = "color: " + this.color;
                                            e = [e[0], i, "color: inherit"].concat(Array.prototype.slice.call(e, 1));
                                            var n = 0
                                              , s = 0;
                                            return e[0].replace(/%[a-z%]/g, function(e) {
                                                "%%" !== e && (n++,
                                                "%c" === e && (s = n))
                                            }),
                                            e.splice(s, 0, i),
                                            e
                                        }
                                        function a() {
                                            return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
                                        }
                                        function o(e) {
                                            try {
                                                null == e ? t.storage.removeItem("debug") : t.storage.debug = e
                                            } catch (e) {}
                                        }
                                        function c() {
                                            try {
                                                return t.storage.debug
                                            } catch (e) {}
                                            if ("undefined" != typeof i && "env"in i)
                                                return i.env.DEBUG
                                        }
                                        function l() {
                                            try {
                                                return window.localStorage
                                            } catch (e) {}
                                        }
                                        t = e.exports = r(5),
                                        t.log = a,
                                        t.formatArgs = s,
                                        t.save = o,
                                        t.load = c,
                                        t.useColors = n,
                                        t.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : l(),
                                        t.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"],
                                        t.formatters.j = function(e) {
                                            try {
                                                return JSON.stringify(e)
                                            } catch (e) {
                                                return "[UnexpectedJSONParseError]: " + e.message
                                            }
                                        }
                                        ,
                                        t.enable(c())
                                    }
                                    ).call(t, r(4))
                                }
                                , function(e, t) {
                                    function r() {
                                        throw new Error("setTimeout has not been defined")
                                    }
                                    function i() {
                                        throw new Error("clearTimeout has not been defined")
                                    }
                                    function n(e) {
                                        if (_ === setTimeout)
                                            return setTimeout(e, 0);
                                        if ((_ === r || !_) && setTimeout)
                                            return _ = setTimeout,
                                            setTimeout(e, 0);
                                        try {
                                            return _(e, 0)
                                        } catch (t) {
                                            try {
                                                return _.call(null, e, 0)
                                            } catch (t) {
                                                return _.call(this, e, 0)
                                            }
                                        }
                                    }
                                    function s(e) {
                                        if (p === clearTimeout)
                                            return clearTimeout(e);
                                        if ((p === i || !p) && clearTimeout)
                                            return p = clearTimeout,
                                            clearTimeout(e);
                                        try {
                                            return p(e)
                                        } catch (t) {
                                            try {
                                                return p.call(null, e)
                                            } catch (t) {
                                                return p.call(this, e)
                                            }
                                        }
                                    }
                                    function a() {
                                        f && u && (f = !1,
                                        u.length ? d = u.concat(d) : g = -1,
                                        d.length && o())
                                    }
                                    function o() {
                                        if (!f) {
                                            var e = n(a);
                                            f = !0;
                                            for (var t = d.length; t; ) {
                                                for (u = d,
                                                d = []; ++g < t; )
                                                    u && u[g].run();
                                                g = -1,
                                                t = d.length
                                            }
                                            u = null,
                                            f = !1,
                                            s(e)
                                        }
                                    }
                                    function c(e, t) {
                                        this.fun = e,
                                        this.array = t
                                    }
                                    function l() {}
                                    var _, p, h = e.exports = {};
                                    (function() {
                                        try {
                                            _ = "function" == typeof setTimeout ? setTimeout : r
                                        } catch (e) {
                                            _ = r
                                        }
                                        try {
                                            p = "function" == typeof clearTimeout ? clearTimeout : i
                                        } catch (e) {
                                            p = i
                                        }
                                    })();
                                    var u, d = [], f = !1, g = -1;
                                    h.nextTick = function(e) {
                                        var t = new Array(arguments.length - 1);
                                        if (arguments.length > 1)
                                            for (var r = 1; r < arguments.length; r++)
                                                t[r - 1] = arguments[r];
                                        d.push(new c(e,t)),
                                        1 !== d.length || f || n(o)
                                    }
                                    ,
                                    c.prototype.run = function() {
                                        this.fun.apply(null, this.array)
                                    }
                                    ,
                                    h.title = "browser",
                                    h.browser = !0,
                                    h.env = {},
                                    h.argv = [],
                                    h.version = "",
                                    h.versions = {},
                                    h.on = l,
                                    h.addListener = l,
                                    h.once = l,
                                    h.off = l,
                                    h.removeListener = l,
                                    h.removeAllListeners = l,
                                    h.emit = l,
                                    h.binding = function(e) {
                                        throw new Error("process.binding is not supported")
                                    }
                                    ,
                                    h.cwd = function() {
                                        return "/"
                                    }
                                    ,
                                    h.chdir = function(e) {
                                        throw new Error("process.chdir is not supported")
                                    }
                                    ,
                                    h.umask = function() {
                                        return 0
                                    }
                                }
                                , function(e, t, r) {
                                    function i() {
                                        return t.colors[_++ % t.colors.length]
                                    }
                                    function n(e) {
                                        function r() {}
                                        function n() {
                                            var e = n
                                              , r = +new Date
                                              , s = r - (l || r);
                                            e.diff = s,
                                            e.prev = l,
                                            e.curr = r,
                                            l = r,
                                            null == e.useColors && (e.useColors = t.useColors()),
                                            null == e.color && e.useColors && (e.color = i());
                                            for (var a = new Array(arguments.length), o = 0; o < a.length; o++)
                                                a[o] = arguments[o];
                                            a[0] = t.coerce(a[0]),
                                            "string" != typeof a[0] && (a = ["%o"].concat(a));
                                            var c = 0;
                                            a[0] = a[0].replace(/%([a-z%])/g, function(r, i) {
                                                if ("%%" === r)
                                                    return r;
                                                c++;
                                                var n = t.formatters[i];
                                                if ("function" == typeof n) {
                                                    var s = a[c];
                                                    r = n.call(e, s),
                                                    a.splice(c, 1),
                                                    c--
                                                }
                                                return r
                                            }),
                                            a = t.formatArgs.apply(e, a);
                                            var _ = n.log || t.log || console.log.bind(console);
                                            _.apply(e, a)
                                        }
                                        r.enabled = !1,
                                        n.enabled = !0;
                                        var s = t.enabled(e) ? n : r;
                                        return s.namespace = e,
                                        s
                                    }
                                    function s(e) {
                                        t.save(e);
                                        for (var r = (e || "").split(/[\s,]+/), i = r.length, n = 0; n < i; n++)
                                            r[n] && (e = r[n].replace(/[\\^$+?.()|[\]{}]/g, "\\$&").replace(/\*/g, ".*?"),
                                            "-" === e[0] ? t.skips.push(new RegExp("^" + e.substr(1) + "$")) : t.names.push(new RegExp("^" + e + "$")))
                                    }
                                    function a() {
                                        t.enable("")
                                    }
                                    function o(e) {
                                        var r, i;
                                        for (r = 0,
                                        i = t.skips.length; r < i; r++)
                                            if (t.skips[r].test(e))
                                                return !1;
                                        for (r = 0,
                                        i = t.names.length; r < i; r++)
                                            if (t.names[r].test(e))
                                                return !0;
                                        return !1
                                    }
                                    function c(e) {
                                        return e instanceof Error ? e.stack || e.message : e
                                    }
                                    t = e.exports = n.debug = n,
                                    t.coerce = c,
                                    t.disable = a,
                                    t.enable = s,
                                    t.enabled = o,
                                    t.humanize = r(6),
                                    t.names = [],
                                    t.skips = [],
                                    t.formatters = {};
                                    var l, _ = 0
                                }
                                , function(e, t) {
                                    function r(e) {
                                        if (e = String(e),
                                        !(e.length > 1e4)) {
                                            var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);
                                            if (t) {
                                                var r = parseFloat(t[1])
                                                  , i = (t[2] || "ms").toLowerCase();
                                                switch (i) {
                                                case "years":
                                                case "year":
                                                case "yrs":
                                                case "yr":
                                                case "y":
                                                    return r * _;
                                                case "days":
                                                case "day":
                                                case "d":
                                                    return r * l;
                                                case "hours":
                                                case "hour":
                                                case "hrs":
                                                case "hr":
                                                case "h":
                                                    return r * c;
                                                case "minutes":
                                                case "minute":
                                                case "mins":
                                                case "min":
                                                case "m":
                                                    return r * o;
                                                case "seconds":
                                                case "second":
                                                case "secs":
                                                case "sec":
                                                case "s":
                                                    return r * a;
                                                case "milliseconds":
                                                case "millisecond":
                                                case "msecs":
                                                case "msec":
                                                case "ms":
                                                    return r;
                                                default:
                                                    return
                                                }
                                            }
                                        }
                                    }
                                    function i(e) {
                                        return e >= l ? Math.round(e / l) + "d" : e >= c ? Math.round(e / c) + "h" : e >= o ? Math.round(e / o) + "m" : e >= a ? Math.round(e / a) + "s" : e + "ms"
                                    }
                                    function n(e) {
                                        return s(e, l, "day") || s(e, c, "hour") || s(e, o, "minute") || s(e, a, "second") || e + " ms"
                                    }
                                    function s(e, t, r) {
                                        if (!(e < t))
                                            return e < 1.5 * t ? Math.floor(e / t) + " " + r : Math.ceil(e / t) + " " + r + "s"
                                    }
                                    var a = 1e3
                                      , o = 60 * a
                                      , c = 60 * o
                                      , l = 24 * c
                                      , _ = 365.25 * l;
                                    e.exports = function(e, t) {
                                        t = t || {};
                                        var s = typeof e;
                                        if ("string" === s && e.length > 0)
                                            return r(e);
                                        if ("number" === s && isNaN(e) === !1)
                                            return t.long ? n(e) : i(e);
                                        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e))
                                    }
                                }
                                , function(e, t, r) {
                                    function i() {}
                                    function n(e) {
                                        var r = ""
                                          , i = !1;
                                        return r += e.type,
                                        t.BINARY_EVENT != e.type && t.BINARY_ACK != e.type || (r += e.attachments,
                                        r += "-"),
                                        e.nsp && "/" != e.nsp && (i = !0,
                                        r += e.nsp),
                                        null != e.id && (i && (r += ",",
                                        i = !1),
                                        r += e.id),
                                        null != e.data && (i && (r += ","),
                                        r += h.stringify(e.data)),
                                        p("encoded %j as %s", e, r),
                                        r
                                    }
                                    function s(e, t) {
                                        function r(e) {
                                            var r = d.deconstructPacket(e)
                                              , i = n(r.packet)
                                              , s = r.buffers;
                                            s.unshift(i),
                                            t(s)
                                        }
                                        d.removeBlobs(e, r)
                                    }
                                    function a() {
                                        this.reconstructor = null
                                    }
                                    function o(e) {
                                        var r = {}
                                          , i = 0;
                                        if (r.type = Number(e.charAt(0)),
                                        null == t.types[r.type])
                                            return _();
                                        if (t.BINARY_EVENT == r.type || t.BINARY_ACK == r.type) {
                                            for (var n = ""; "-" != e.charAt(++i) && (n += e.charAt(i),
                                            i != e.length); )
                                                ;
                                            if (n != Number(n) || "-" != e.charAt(i))
                                                throw new Error("Illegal attachments");
                                            r.attachments = Number(n)
                                        }
                                        if ("/" == e.charAt(i + 1))
                                            for (r.nsp = ""; ++i; ) {
                                                var s = e.charAt(i);
                                                if ("," == s)
                                                    break;
                                                if (r.nsp += s,
                                                i == e.length)
                                                    break
                                            }
                                        else
                                            r.nsp = "/";
                                        var a = e.charAt(i + 1);
                                        if ("" !== a && Number(a) == a) {
                                            for (r.id = ""; ++i; ) {
                                                var s = e.charAt(i);
                                                if (null == s || Number(s) != s) {
                                                    --i;
                                                    break
                                                }
                                                if (r.id += e.charAt(i),
                                                i == e.length)
                                                    break
                                            }
                                            r.id = Number(r.id)
                                        }
                                        return e.charAt(++i) && (r = c(r, e.substr(i))),
                                        p("decoded %s as %j", e, r),
                                        r
                                    }
                                    function c(e, t) {
                                        try {
                                            e.data = h.parse(t)
                                        } catch (e) {
                                            return _()
                                        }
                                        return e
                                    }
                                    function l(e) {
                                        this.reconPack = e,
                                        this.buffers = []
                                    }
                                    function _(e) {
                                        return {
                                            type: t.ERROR,
                                            data: "parser error"
                                        }
                                    }
                                    var p = r(8)("socket.io-parser")
                                      , h = r(11)
                                      , u = r(13)
                                      , d = r(14)
                                      , f = r(16);
                                    t.protocol = 4,
                                    t.types = ["CONNECT", "DISCONNECT", "EVENT", "ACK", "ERROR", "BINARY_EVENT", "BINARY_ACK"],
                                    t.CONNECT = 0,
                                    t.DISCONNECT = 1,
                                    t.EVENT = 2,
                                    t.ACK = 3,
                                    t.ERROR = 4,
                                    t.BINARY_EVENT = 5,
                                    t.BINARY_ACK = 6,
                                    t.Encoder = i,
                                    t.Decoder = a,
                                    i.prototype.encode = function(e, r) {
                                        if (p("encoding packet %j", e),
                                        t.BINARY_EVENT == e.type || t.BINARY_ACK == e.type)
                                            s(e, r);
                                        else {
                                            var i = n(e);
                                            r([i])
                                        }
                                    }
                                    ,
                                    u(a.prototype),
                                    a.prototype.add = function(e) {
                                        var r;
                                        if ("string" == typeof e)
                                            r = o(e),
                                            t.BINARY_EVENT == r.type || t.BINARY_ACK == r.type ? (this.reconstructor = new l(r),
                                            0 === this.reconstructor.reconPack.attachments && this.emit("decoded", r)) : this.emit("decoded", r);
                                        else {
                                            if (!f(e) && !e.base64)
                                                throw new Error("Unknown type: " + e);
                                            if (!this.reconstructor)
                                                throw new Error("got binary data when not reconstructing a packet");
                                            r = this.reconstructor.takeBinaryData(e),
                                            r && (this.reconstructor = null,
                                            this.emit("decoded", r))
                                        }
                                    }
                                    ,
                                    a.prototype.destroy = function() {
                                        this.reconstructor && this.reconstructor.finishedReconstruction()
                                    }
                                    ,
                                    l.prototype.takeBinaryData = function(e) {
                                        if (this.buffers.push(e),
                                        this.buffers.length == this.reconPack.attachments) {
                                            var t = d.reconstructPacket(this.reconPack, this.buffers);
                                            return this.finishedReconstruction(),
                                            t
                                        }
                                        return null
                                    }
                                    ,
                                    l.prototype.finishedReconstruction = function() {
                                        this.reconPack = null,
                                        this.buffers = [];
                                    }
                                }
                                , function(e, t, r) {
                                    function i() {
                                        return "WebkitAppearance"in document.documentElement.style || window.console && (console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31
                                    }
                                    function n() {
                                        var e = arguments
                                          , r = this.useColors;
                                        if (e[0] = (r ? "%c" : "") + this.namespace + (r ? " %c" : " ") + e[0] + (r ? "%c " : " ") + "+" + t.humanize(this.diff),
                                        !r)
                                            return e;
                                        var i = "color: " + this.color;
                                        e = [e[0], i, "color: inherit"].concat(Array.prototype.slice.call(e, 1));
                                        var n = 0
                                          , s = 0;
                                        return e[0].replace(/%[a-z%]/g, function(e) {
                                            "%%" !== e && (n++,
                                            "%c" === e && (s = n))
                                        }),
                                        e.splice(s, 0, i),
                                        e
                                    }
                                    function s() {
                                        return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
                                    }
                                    function a(e) {
                                        try {
                                            null == e ? t.storage.removeItem("debug") : t.storage.debug = e
                                        } catch (e) {}
                                    }
                                    function o() {
                                        var e;
                                        try {
                                            e = t.storage.debug
                                        } catch (e) {}
                                        return e
                                    }
                                    function c() {
                                        try {
                                            return window.localStorage
                                        } catch (e) {}
                                    }
                                    t = e.exports = r(9),
                                    t.log = s,
                                    t.formatArgs = n,
                                    t.save = a,
                                    t.load = o,
                                    t.useColors = i,
                                    t.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : c(),
                                    t.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"],
                                    t.formatters.j = function(e) {
                                        return JSON.stringify(e)
                                    }
                                    ,
                                    t.enable(o())
                                }
                                , function(e, t, r) {
                                    function i() {
                                        return t.colors[_++ % t.colors.length]
                                    }
                                    function n(e) {
                                        function r() {}
                                        function n() {
                                            var e = n
                                              , r = +new Date
                                              , s = r - (l || r);
                                            e.diff = s,
                                            e.prev = l,
                                            e.curr = r,
                                            l = r,
                                            null == e.useColors && (e.useColors = t.useColors()),
                                            null == e.color && e.useColors && (e.color = i());
                                            var a = Array.prototype.slice.call(arguments);
                                            a[0] = t.coerce(a[0]),
                                            "string" != typeof a[0] && (a = ["%o"].concat(a));
                                            var o = 0;
                                            a[0] = a[0].replace(/%([a-z%])/g, function(r, i) {
                                                if ("%%" === r)
                                                    return r;
                                                o++;
                                                var n = t.formatters[i];
                                                if ("function" == typeof n) {
                                                    var s = a[o];
                                                    r = n.call(e, s),
                                                    a.splice(o, 1),
                                                    o--
                                                }
                                                return r
                                            }),
                                            "function" == typeof t.formatArgs && (a = t.formatArgs.apply(e, a));
                                            var c = n.log || t.log || console.log.bind(console);
                                            c.apply(e, a)
                                        }
                                        r.enabled = !1,
                                        n.enabled = !0;
                                        var s = t.enabled(e) ? n : r;
                                        return s.namespace = e,
                                        s
                                    }
                                    function s(e) {
                                        t.save(e);
                                        for (var r = (e || "").split(/[\s,]+/), i = r.length, n = 0; n < i; n++)
                                            r[n] && (e = r[n].replace(/\*/g, ".*?"),
                                            "-" === e[0] ? t.skips.push(new RegExp("^" + e.substr(1) + "$")) : t.names.push(new RegExp("^" + e + "$")))
                                    }
                                    function a() {
                                        t.enable("")
                                    }
                                    function o(e) {
                                        var r, i;
                                        for (r = 0,
                                        i = t.skips.length; r < i; r++)
                                            if (t.skips[r].test(e))
                                                return !1;
                                        for (r = 0,
                                        i = t.names.length; r < i; r++)
                                            if (t.names[r].test(e))
                                                return !0;
                                        return !1
                                    }
                                    function c(e) {
                                        return e instanceof Error ? e.stack || e.message : e
                                    }
                                    t = e.exports = n,
                                    t.coerce = c,
                                    t.disable = a,
                                    t.enable = s,
                                    t.enabled = o,
                                    t.humanize = r(10),
                                    t.names = [],
                                    t.skips = [],
                                    t.formatters = {};
                                    var l, _ = 0
                                }
                                , function(e, t) {
                                    function r(e) {
                                        if (e = "" + e,
                                        !(e.length > 1e4)) {
                                            var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);
                                            if (t) {
                                                var r = parseFloat(t[1])
                                                  , i = (t[2] || "ms").toLowerCase();
                                                switch (i) {
                                                case "years":
                                                case "year":
                                                case "yrs":
                                                case "yr":
                                                case "y":
                                                    return r * _;
                                                case "days":
                                                case "day":
                                                case "d":
                                                    return r * l;
                                                case "hours":
                                                case "hour":
                                                case "hrs":
                                                case "hr":
                                                case "h":
                                                    return r * c;
                                                case "minutes":
                                                case "minute":
                                                case "mins":
                                                case "min":
                                                case "m":
                                                    return r * o;
                                                case "seconds":
                                                case "second":
                                                case "secs":
                                                case "sec":
                                                case "s":
                                                    return r * a;
                                                case "milliseconds":
                                                case "millisecond":
                                                case "msecs":
                                                case "msec":
                                                case "ms":
                                                    return r
                                                }
                                            }
                                        }
                                    }
                                    function i(e) {
                                        return e >= l ? Math.round(e / l) + "d" : e >= c ? Math.round(e / c) + "h" : e >= o ? Math.round(e / o) + "m" : e >= a ? Math.round(e / a) + "s" : e + "ms"
                                    }
                                    function n(e) {
                                        return s(e, l, "day") || s(e, c, "hour") || s(e, o, "minute") || s(e, a, "second") || e + " ms"
                                    }
                                    function s(e, t, r) {
                                        if (!(e < t))
                                            return e < 1.5 * t ? Math.floor(e / t) + " " + r : Math.ceil(e / t) + " " + r + "s"
                                    }
                                    var a = 1e3
                                      , o = 60 * a
                                      , c = 60 * o
                                      , l = 24 * c
                                      , _ = 365.25 * l;
                                    e.exports = function(e, t) {
                                        return t = t || {},
                                        "string" == typeof e ? r(e) : t.long ? n(e) : i(e)
                                    }
                                }
                                , function(e, t, r) {
                                    (function(e, r) {
                                        var i = !1;
                                        (function() {
                                            function n(e, t) {
                                                function r(e) {
                                                    if (r[e] !== g)
                                                        return r[e];
                                                    var n;
                                                    if ("bug-string-char-index" == e)
                                                        n = "a" != "a"[0];
                                                    else if ("json" == e)
                                                        n = r("json-stringify") && r("json-parse");
                                                    else {
                                                        var a, o = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
                                                        if ("json-stringify" == e) {
                                                            var c = t.stringify
                                                              , _ = "function" == typeof c && v;
                                                            if (_) {
                                                                (a = function() {
                                                                    return 1
                                                                }
                                                                ).toJSON = a;
                                                                try {
                                                                    _ = "0" === c(0) && "0" === c(new i) && '""' == c(new s) && c(y) === g && c(g) === g && c() === g && "1" === c(a) && "[1]" == c([a]) && "[null]" == c([g]) && "null" == c(null) && "[null,null,null]" == c([g, y, null]) && c({
                                                                        a: [a, !0, !1, null, "\0\b\n\f\r\t"]
                                                                    }) == o && "1" === c(null, a) && "[\n 1,\n 2\n]" == c([1, 2], null, 1) && '"-271821-04-20T00:00:00.000Z"' == c(new l((-864e13))) && '"+275760-09-13T00:00:00.000Z"' == c(new l(864e13)) && '"-000001-01-01T00:00:00.000Z"' == c(new l((-621987552e5))) && '"1969-12-31T23:59:59.999Z"' == c(new l((-1)))
                                                                } catch (e) {
                                                                    _ = !1
                                                                }
                                                            }
                                                            n = _
                                                        }
                                                        if ("json-parse" == e) {
                                                            var p = t.parse;
                                                            if ("function" == typeof p)
                                                                try {
                                                                    if (0 === p("0") && !p(!1)) {
                                                                        a = p(o);
                                                                        var h = 5 == a.a.length && 1 === a.a[0];
                                                                        if (h) {
                                                                            try {
                                                                                h = !p('"\t"')
                                                                            } catch (e) {}
                                                                            if (h)
                                                                                try {
                                                                                    h = 1 !== p("01")
                                                                                } catch (e) {}
                                                                            if (h)
                                                                                try {
                                                                                    h = 1 !== p("1.")
                                                                                } catch (e) {}
                                                                        }
                                                                    }
                                                                } catch (e) {
                                                                    h = !1
                                                                }
                                                            n = h
                                                        }
                                                    }
                                                    return r[e] = !!n
                                                }
                                                e || (e = c.Object()),
                                                t || (t = c.Object());
                                                var i = e.Number || c.Number
                                                  , s = e.String || c.String
                                                  , o = e.Object || c.Object
                                                  , l = e.Date || c.Date
                                                  , _ = e.SyntaxError || c.SyntaxError
                                                  , p = e.TypeError || c.TypeError
                                                  , h = e.Math || c.Math
                                                  , u = e.JSON || c.JSON;
                                                "object" == typeof u && u && (t.stringify = u.stringify,
                                                t.parse = u.parse);
                                                var d, f, g, m = o.prototype, y = m.toString, v = new l((-0xc782b5b800cec));
                                                try {
                                                    v = v.getUTCFullYear() == -109252 && 0 === v.getUTCMonth() && 1 === v.getUTCDate() && 10 == v.getUTCHours() && 37 == v.getUTCMinutes() && 6 == v.getUTCSeconds() && 708 == v.getUTCMilliseconds()
                                                } catch (e) {}
                                                if (!r("json")) {
                                                    var b = "[object Function]"
                                                      , w = "[object Date]"
                                                      , k = "[object Number]"
                                                      , L = "[object String]"
                                                      , x = "[object Array]"
                                                      , C = "[object Boolean]"
                                                      , S = r("bug-string-char-index");
                                                    if (!v)
                                                        var j = h.floor
                                                          , z = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
                                                          , A = function(e, t) {
                                                            return z[t] + 365 * (e - 1970) + j((e - 1969 + (t = +(t > 1))) / 4) - j((e - 1901 + t) / 100) + j((e - 1601 + t) / 400)
                                                        };
                                                    if ((d = m.hasOwnProperty) || (d = function(e) {
                                                        var t, r = {};
                                                        return (r.__proto__ = null,
                                                        r.__proto__ = {
                                                            toString: 1
                                                        },
                                                        r).toString != y ? d = function(e) {
                                                            var t = this.__proto__
                                                              , r = e in (this.__proto__ = null,
                                                            this);
                                                            return this.__proto__ = t,
                                                            r
                                                        }
                                                        : (t = r.constructor,
                                                        d = function(e) {
                                                            var r = (this.constructor || t).prototype;
                                                            return e in this && !(e in r && this[e] === r[e])
                                                        }
                                                        ),
                                                        r = null,
                                                        d.call(this, e)
                                                    }
                                                    ),
                                                    f = function(e, t) {
                                                        var r, i, n, s = 0;
                                                        (r = function() {
                                                            this.valueOf = 0
                                                        }
                                                        ).prototype.valueOf = 0,
                                                        i = new r;
                                                        for (n in i)
                                                            d.call(i, n) && s++;
                                                        return r = i = null,
                                                        s ? f = 2 == s ? function(e, t) {
                                                            var r, i = {}, n = y.call(e) == b;
                                                            for (r in e)
                                                                n && "prototype" == r || d.call(i, r) || !(i[r] = 1) || !d.call(e, r) || t(r)
                                                        }
                                                        : function(e, t) {
                                                            var r, i, n = y.call(e) == b;
                                                            for (r in e)
                                                                n && "prototype" == r || !d.call(e, r) || (i = "constructor" === r) || t(r);
                                                            (i || d.call(e, r = "constructor")) && t(r)
                                                        }
                                                        : (i = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"],
                                                        f = function(e, t) {
                                                            var r, n, s = y.call(e) == b, o = !s && "function" != typeof e.constructor && a[typeof e.hasOwnProperty] && e.hasOwnProperty || d;
                                                            for (r in e)
                                                                s && "prototype" == r || !o.call(e, r) || t(r);
                                                            for (n = i.length; r = i[--n]; o.call(e, r) && t(r))
                                                                ;
                                                        }
                                                        ),
                                                        f(e, t)
                                                    }
                                                    ,
                                                    !r("json-stringify")) {
                                                        var E = {
                                                            92: "\\\\",
                                                            34: '\\"',
                                                            8: "\\b",
                                                            12: "\\f",
                                                            10: "\\n",
                                                            13: "\\r",
                                                            9: "\\t"
                                                        }
                                                          , B = "000000"
                                                          , T = function(e, t) {
                                                            return (B + (t || 0)).slice(-e)
                                                        }
                                                          , O = "\\u00"
                                                          , I = function(e) {
                                                            for (var t = '"', r = 0, i = e.length, n = !S || i > 10, s = n && (S ? e.split("") : e); r < i; r++) {
                                                                var a = e.charCodeAt(r);
                                                                switch (a) {
                                                                case 8:
                                                                case 9:
                                                                case 10:
                                                                case 12:
                                                                case 13:
                                                                case 34:
                                                                case 92:
                                                                    t += E[a];
                                                                    break;
                                                                default:
                                                                    if (a < 32) {
                                                                        t += O + T(2, a.toString(16));
                                                                        break
                                                                    }
                                                                    t += n ? s[r] : e.charAt(r)
                                                                }
                                                            }
                                                            return t + '"'
                                                        }
                                                          , P = function(e, t, r, i, n, s, a) {
                                                            var o, c, l, _, h, u, m, v, b, S, z, E, B, O, M, D;
                                                            try {
                                                                o = t[e]
                                                            } catch (e) {}
                                                            if ("object" == typeof o && o)
                                                                if (c = y.call(o),
                                                                c != w || d.call(o, "toJSON"))
                                                                    "function" == typeof o.toJSON && (c != k && c != L && c != x || d.call(o, "toJSON")) && (o = o.toJSON(e));
                                                                else if (o > -1 / 0 && o < 1 / 0) {
                                                                    if (A) {
                                                                        for (h = j(o / 864e5),
                                                                        l = j(h / 365.2425) + 1970 - 1; A(l + 1, 0) <= h; l++)
                                                                            ;
                                                                        for (_ = j((h - A(l, 0)) / 30.42); A(l, _ + 1) <= h; _++)
                                                                            ;
                                                                        h = 1 + h - A(l, _),
                                                                        u = (o % 864e5 + 864e5) % 864e5,
                                                                        m = j(u / 36e5) % 24,
                                                                        v = j(u / 6e4) % 60,
                                                                        b = j(u / 1e3) % 60,
                                                                        S = u % 1e3
                                                                    } else
                                                                        l = o.getUTCFullYear(),
                                                                        _ = o.getUTCMonth(),
                                                                        h = o.getUTCDate(),
                                                                        m = o.getUTCHours(),
                                                                        v = o.getUTCMinutes(),
                                                                        b = o.getUTCSeconds(),
                                                                        S = o.getUTCMilliseconds();
                                                                    o = (l <= 0 || l >= 1e4 ? (l < 0 ? "-" : "+") + T(6, l < 0 ? -l : l) : T(4, l)) + "-" + T(2, _ + 1) + "-" + T(2, h) + "T" + T(2, m) + ":" + T(2, v) + ":" + T(2, b) + "." + T(3, S) + "Z"
                                                                } else
                                                                    o = null;
                                                            if (r && (o = r.call(t, e, o)),
                                                            null === o)
                                                                return "null";
                                                            if (c = y.call(o),
                                                            c == C)
                                                                return "" + o;
                                                            if (c == k)
                                                                return o > -1 / 0 && o < 1 / 0 ? "" + o : "null";
                                                            if (c == L)
                                                                return I("" + o);
                                                            if ("object" == typeof o) {
                                                                for (O = a.length; O--; )
                                                                    if (a[O] === o)
                                                                        throw p();
                                                                if (a.push(o),
                                                                z = [],
                                                                M = s,
                                                                s += n,
                                                                c == x) {
                                                                    for (B = 0,
                                                                    O = o.length; B < O; B++)
                                                                        E = P(B, o, r, i, n, s, a),
                                                                        z.push(E === g ? "null" : E);
                                                                    D = z.length ? n ? "[\n" + s + z.join(",\n" + s) + "\n" + M + "]" : "[" + z.join(",") + "]" : "[]"
                                                                } else
                                                                    f(i || o, function(e) {
                                                                        var t = P(e, o, r, i, n, s, a);
                                                                        t !== g && z.push(I(e) + ":" + (n ? " " : "") + t)
                                                                    }),
                                                                    D = z.length ? n ? "{\n" + s + z.join(",\n" + s) + "\n" + M + "}" : "{" + z.join(",") + "}" : "{}";
                                                                return a.pop(),
                                                                D
                                                            }
                                                        };
                                                        t.stringify = function(e, t, r) {
                                                            var i, n, s, o;
                                                            if (a[typeof t] && t)
                                                                if ((o = y.call(t)) == b)
                                                                    n = t;
                                                                else if (o == x) {
                                                                    s = {};
                                                                    for (var c, l = 0, _ = t.length; l < _; c = t[l++],
                                                                    o = y.call(c),
                                                                    (o == L || o == k) && (s[c] = 1))
                                                                        ;
                                                                }
                                                            if (r)
                                                                if ((o = y.call(r)) == k) {
                                                                    if ((r -= r % 1) > 0)
                                                                        for (i = "",
                                                                        r > 10 && (r = 10); i.length < r; i += " ")
                                                                            ;
                                                                } else
                                                                    o == L && (i = r.length <= 10 ? r : r.slice(0, 10));
                                                            return P("", (c = {},
                                                            c[""] = e,
                                                            c), n, s, i, "", [])
                                                        }
                                                    }
                                                    if (!r("json-parse")) {
                                                        var M, D, N = s.fromCharCode, q = {
                                                            92: "\\",
                                                            34: '"',
                                                            47: "/",
                                                            98: "\b",
                                                            116: "\t",
                                                            110: "\n",
                                                            102: "\f",
                                                            114: "\r"
                                                        }, R = function() {
                                                            throw M = D = null,
                                                            _()
                                                        }, U = function() {
                                                            for (var e, t, r, i, n, s = D, a = s.length; M < a; )
                                                                switch (n = s.charCodeAt(M)) {
                                                                case 9:
                                                                case 10:
                                                                case 13:
                                                                case 32:
                                                                    M++;
                                                                    break;
                                                                case 123:
                                                                case 125:
                                                                case 91:
                                                                case 93:
                                                                case 58:
                                                                case 44:
                                                                    return e = S ? s.charAt(M) : s[M],
                                                                    M++,
                                                                    e;
                                                                case 34:
                                                                    for (e = "@",
                                                                    M++; M < a; )
                                                                        if (n = s.charCodeAt(M),
                                                                        n < 32)
                                                                            R();
                                                                        else if (92 == n)
                                                                            switch (n = s.charCodeAt(++M)) {
                                                                            case 92:
                                                                            case 34:
                                                                            case 47:
                                                                            case 98:
                                                                            case 116:
                                                                            case 110:
                                                                            case 102:
                                                                            case 114:
                                                                                e += q[n],
                                                                                M++;
                                                                                break;
                                                                            case 117:
                                                                                for (t = ++M,
                                                                                r = M + 4; M < r; M++)
                                                                                    n = s.charCodeAt(M),
                                                                                    n >= 48 && n <= 57 || n >= 97 && n <= 102 || n >= 65 && n <= 70 || R();
                                                                                e += N("0x" + s.slice(t, M));
                                                                                break;
                                                                            default:
                                                                                R()
                                                                            }
                                                                        else {
                                                                            if (34 == n)
                                                                                break;
                                                                            for (n = s.charCodeAt(M),
                                                                            t = M; n >= 32 && 92 != n && 34 != n; )
                                                                                n = s.charCodeAt(++M);
                                                                            e += s.slice(t, M)
                                                                        }
                                                                    if (34 == s.charCodeAt(M))
                                                                        return M++,
                                                                        e;
                                                                    R();
                                                                default:
                                                                    if (t = M,
                                                                    45 == n && (i = !0,
                                                                    n = s.charCodeAt(++M)),
                                                                    n >= 48 && n <= 57) {
                                                                        for (48 == n && (n = s.charCodeAt(M + 1),
                                                                        n >= 48 && n <= 57) && R(),
                                                                        i = !1; M < a && (n = s.charCodeAt(M),
                                                                        n >= 48 && n <= 57); M++)
                                                                            ;
                                                                        if (46 == s.charCodeAt(M)) {
                                                                            for (r = ++M; r < a && (n = s.charCodeAt(r),
                                                                            n >= 48 && n <= 57); r++)
                                                                                ;
                                                                            r == M && R(),
                                                                            M = r
                                                                        }
                                                                        if (n = s.charCodeAt(M),
                                                                        101 == n || 69 == n) {
                                                                            for (n = s.charCodeAt(++M),
                                                                            43 != n && 45 != n || M++,
                                                                            r = M; r < a && (n = s.charCodeAt(r),
                                                                            n >= 48 && n <= 57); r++)
                                                                                ;
                                                                            r == M && R(),
                                                                            M = r
                                                                        }
                                                                        return +s.slice(t, M)
                                                                    }
                                                                    if (i && R(),
                                                                    "true" == s.slice(M, M + 4))
                                                                        return M += 4,
                                                                        !0;
                                                                    if ("false" == s.slice(M, M + 5))
                                                                        return M += 5,
                                                                        !1;
                                                                    if ("null" == s.slice(M, M + 4))
                                                                        return M += 4,
                                                                        null;
                                                                    R()
                                                                }
                                                            return "$"
                                                        }, H = function(e) {
                                                            var t, r;
                                                            if ("$" == e && R(),
                                                            "string" == typeof e) {
                                                                if ("@" == (S ? e.charAt(0) : e[0]))
                                                                    return e.slice(1);
                                                                if ("[" == e) {
                                                                    for (t = []; e = U(),
                                                                    "]" != e; r || (r = !0))
                                                                        r && ("," == e ? (e = U(),
                                                                        "]" == e && R()) : R()),
                                                                        "," == e && R(),
                                                                        t.push(H(e));
                                                                    return t
                                                                }
                                                                if ("{" == e) {
                                                                    for (t = {}; e = U(),
                                                                    "}" != e; r || (r = !0))
                                                                        r && ("," == e ? (e = U(),
                                                                        "}" == e && R()) : R()),
                                                                        "," != e && "string" == typeof e && "@" == (S ? e.charAt(0) : e[0]) && ":" == U() || R(),
                                                                        t[e.slice(1)] = H(U());
                                                                    return t
                                                                }
                                                                R()
                                                            }
                                                            return e
                                                        }, $ = function(e, t, r) {
                                                            var i = F(e, t, r);
                                                            i === g ? delete e[t] : e[t] = i
                                                        }, F = function(e, t, r) {
                                                            var i, n = e[t];
                                                            if ("object" == typeof n && n)
                                                                if (y.call(n) == x)
                                                                    for (i = n.length; i--; )
                                                                        $(n, i, r);
                                                                else
                                                                    f(n, function(e) {
                                                                        $(n, e, r)
                                                                    });
                                                            return r.call(e, t, n)
                                                        };
                                                        t.parse = function(e, t) {
                                                            var r, i;
                                                            return M = 0,
                                                            D = "" + e,
                                                            r = H(U()),
                                                            "$" != U() && R(),
                                                            M = D = null,
                                                            t && y.call(t) == b ? F((i = {},
                                                            i[""] = r,
                                                            i), "", t) : r
                                                        }
                                                    }
                                                }
                                                return t.runInContext = n,
                                                t
                                            }
                                            var s = "function" == typeof __crisp_void_define && i.amd
                                              , a = {
                                                function: !0,
                                                object: !0
                                            }
                                              , o = a[typeof t] && t && !t.nodeType && t
                                              , c = a[typeof window] && window || this
                                              , l = o && a[typeof e] && e && !e.nodeType && "object" == typeof r && r;
                                            if (!l || l.global !== l && l.window !== l && l.self !== l || (c = l),
                                            o && !s)
                                                n(c, o);
                                            else {
                                                var _ = c.JSON
                                                  , p = c.JSON3
                                                  , h = !1
                                                  , u = n(c, c.JSON3 = {
                                                    noConflict: function() {
                                                        return h || (h = !0,
                                                        c.JSON = _,
                                                        c.JSON3 = p,
                                                        _ = p = null),
                                                        u
                                                    }
                                                });
                                                c.JSON = {
                                                    parse: u.parse,
                                                    stringify: u.stringify
                                                }
                                            }
                                            s && i(function() {
                                                return u
                                            })
                                        }
                                        ).call(this)
                                    }
                                    ).call(t, r(12)(e), function() {
                                        return this
                                    }())
                                }
                                , function(e, t) {
                                    e.exports = function(e) {
                                        return e.webpackPolyfill || (e.deprecate = function() {}
                                        ,
                                        e.paths = [],
                                        e.children = [],
                                        e.webpackPolyfill = 1),
                                        e
                                    }
                                }
                                , function(e, t) {
                                    function r(e) {
                                        if (e)
                                            return i(e)
                                    }
                                    function i(e) {
                                        for (var t in r.prototype)
                                            e[t] = r.prototype[t];
                                        return e
                                    }
                                    e.exports = r,
                                    r.prototype.on = r.prototype.addEventListener = function(e, t) {
                                        return this._callbacks = this._callbacks || {},
                                        (this._callbacks[e] = this._callbacks[e] || []).push(t),
                                        this
                                    }
                                    ,
                                    r.prototype.once = function(e, t) {
                                        function r() {
                                            i.off(e, r),
                                            t.apply(this, arguments)
                                        }
                                        var i = this;
                                        return this._callbacks = this._callbacks || {},
                                        r.fn = t,
                                        this.on(e, r),
                                        this
                                    }
                                    ,
                                    r.prototype.off = r.prototype.removeListener = r.prototype.removeAllListeners = r.prototype.removeEventListener = function(e, t) {
                                        if (this._callbacks = this._callbacks || {},
                                        0 == arguments.length)
                                            return this._callbacks = {},
                                            this;
                                        var r = this._callbacks[e];
                                        if (!r)
                                            return this;
                                        if (1 == arguments.length)
                                            return delete this._callbacks[e],
                                            this;
                                        for (var i, n = 0; n < r.length; n++)
                                            if (i = r[n],
                                            i === t || i.fn === t) {
                                                r.splice(n, 1);
                                                break
                                            }
                                        return this
                                    }
                                    ,
                                    r.prototype.emit = function(e) {
                                        this._callbacks = this._callbacks || {};
                                        var t = [].slice.call(arguments, 1)
                                          , r = this._callbacks[e];
                                        if (r) {
                                            r = r.slice(0);
                                            for (var i = 0, n = r.length; i < n; ++i)
                                                r[i].apply(this, t)
                                        }
                                        return this
                                    }
                                    ,
                                    r.prototype.listeners = function(e) {
                                        return this._callbacks = this._callbacks || {},
                                        this._callbacks[e] || []
                                    }
                                    ,
                                    r.prototype.hasListeners = function(e) {
                                        return !!this.listeners(e).length
                                    }
                                }
                                , function(e, t, r) {
                                    (function(e) {
                                        var i = r(15)
                                          , n = r(16);
                                        t.deconstructPacket = function(e) {
                                            function t(e) {
                                                if (!e)
                                                    return e;
                                                if (n(e)) {
                                                    var s = {
                                                        _placeholder: !0,
                                                        num: r.length
                                                    };
                                                    return r.push(e),
                                                    s
                                                }
                                                if (i(e)) {
                                                    for (var a = new Array(e.length), o = 0; o < e.length; o++)
                                                        a[o] = t(e[o]);
                                                    return a
                                                }
                                                if ("object" == typeof e && !(e instanceof Date)) {
                                                    var a = {};
                                                    for (var c in e)
                                                        a[c] = t(e[c]);
                                                    return a
                                                }
                                                return e
                                            }
                                            var r = []
                                              , s = e.data
                                              , a = e;
                                            return a.data = t(s),
                                            a.attachments = r.length,
                                            {
                                                packet: a,
                                                buffers: r
                                            }
                                        }
                                        ,
                                        t.reconstructPacket = function(e, t) {
                                            function r(e) {
                                                if (e && e._placeholder) {
                                                    var n = t[e.num];
                                                    return n
                                                }
                                                if (i(e)) {
                                                    for (var s = 0; s < e.length; s++)
                                                        e[s] = r(e[s]);
                                                    return e
                                                }
                                                if (e && "object" == typeof e) {
                                                    for (var a in e)
                                                        e[a] = r(e[a]);
                                                    return e
                                                }
                                                return e
                                            }
                                            return e.data = r(e.data),
                                            e.attachments = void 0,
                                            e
                                        }
                                        ,
                                        t.removeBlobs = function(t, r) {
                                            function s(t, c, l) {
                                                if (!t)
                                                    return t;
                                                if (e.Blob && t instanceof Blob || e.File && t instanceof File) {
                                                    a++;
                                                    var _ = new FileReader;
                                                    _.onload = function() {
                                                        l ? l[c] = this.result : o = this.result,
                                                        --a || r(o)
                                                    }
                                                    ,
                                                    _.readAsArrayBuffer(t)
                                                } else if (i(t))
                                                    for (var p = 0; p < t.length; p++)
                                                        s(t[p], p, t);
                                                else if (t && "object" == typeof t && !n(t))
                                                    for (var h in t)
                                                        s(t[h], h, t)
                                            }
                                            var a = 0
                                              , o = t;
                                            s(o),
                                            a || r(o)
                                        }
                                    }
                                    ).call(t, function() {
                                        return this
                                    }())
                                }
                                , function(e, t) {
                                    e.exports = Array.isArray || function(e) {
                                        return "[object Array]" == Object.prototype.toString.call(e)
                                    }
                                }
                                , function(e, t) {
                                    (function(t) {
                                        function r(e) {
                                            return t.Buffer && t.Buffer.isBuffer(e) || t.ArrayBuffer && e instanceof ArrayBuffer
                                        }
                                        e.exports = r
                                    }
                                    ).call(t, function() {
                                        return this
                                    }())
                                }
                                , function(e, t, r) {
                                    "use strict";
                                    function i(e, t) {
                                        return this instanceof i ? (e && "object" === ("undefined" == typeof e ? "undefined" : n(e)) && (t = e,
                                        e = void 0),
                                        t = t || {},
                                        t.path = t.path || "/socket.io",
                                        this.nsps = {},
                                        this.subs = [],
                                        this.opts = t,
                                        this.reconnection(t.reconnection !== !1),
                                        this.reconnectionAttempts(t.reconnectionAttempts || 1 / 0),
                                        this.reconnectionDelay(t.reconnectionDelay || 1e3),
                                        this.reconnectionDelayMax(t.reconnectionDelayMax || 5e3),
                                        this.randomizationFactor(t.randomizationFactor || .5),
                                        this.backoff = new u({
                                            min: this.reconnectionDelay(),
                                            max: this.reconnectionDelayMax(),
                                            jitter: this.randomizationFactor()
                                        }),
                                        this.timeout(null == t.timeout ? 2e4 : t.timeout),
                                        this.readyState = "closed",
                                        this.uri = e,
                                        this.connecting = [],
                                        this.lastPing = null,
                                        this.encoding = !1,
                                        this.packetBuffer = [],
                                        this.encoder = new c.Encoder,
                                        this.decoder = new c.Decoder,
                                        this.autoConnect = t.autoConnect !== !1,
                                        void (this.autoConnect && this.open())) : new i(e,t)
                                    }
                                    var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                                        return typeof e
                                    }
                                    : function(e) {
                                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                                    }
                                      , s = r(18)
                                      , a = r(45)
                                      , o = r(36)
                                      , c = r(7)
                                      , l = r(47)
                                      , _ = r(48)
                                      , p = r(3)("socket.io-client:manager")
                                      , h = r(43)
                                      , u = r(51)
                                      , d = Object.prototype.hasOwnProperty;
                                    e.exports = i,
                                    i.prototype.emitAll = function() {
                                        this.emit.apply(this, arguments);
                                        for (var e in this.nsps)
                                            d.call(this.nsps, e) && this.nsps[e].emit.apply(this.nsps[e], arguments)
                                    }
                                    ,
                                    i.prototype.updateSocketIds = function() {
                                        for (var e in this.nsps)
                                            d.call(this.nsps, e) && (this.nsps[e].id = this.engine.id)
                                    }
                                    ,
                                    o(i.prototype),
                                    i.prototype.reconnection = function(e) {
                                        return arguments.length ? (this._reconnection = !!e,
                                        this) : this._reconnection
                                    }
                                    ,
                                    i.prototype.reconnectionAttempts = function(e) {
                                        return arguments.length ? (this._reconnectionAttempts = e,
                                        this) : this._reconnectionAttempts
                                    }
                                    ,
                                    i.prototype.reconnectionDelay = function(e) {
                                        return arguments.length ? (this._reconnectionDelay = e,
                                        this.backoff && this.backoff.setMin(e),
                                        this) : this._reconnectionDelay
                                    }
                                    ,
                                    i.prototype.randomizationFactor = function(e) {
                                        return arguments.length ? (this._randomizationFactor = e,
                                        this.backoff && this.backoff.setJitter(e),
                                        this) : this._randomizationFactor
                                    }
                                    ,
                                    i.prototype.reconnectionDelayMax = function(e) {
                                        return arguments.length ? (this._reconnectionDelayMax = e,
                                        this.backoff && this.backoff.setMax(e),
                                        this) : this._reconnectionDelayMax
                                    }
                                    ,
                                    i.prototype.timeout = function(e) {
                                        return arguments.length ? (this._timeout = e,
                                        this) : this._timeout
                                    }
                                    ,
                                    i.prototype.maybeReconnectOnOpen = function() {
                                        !this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect()
                                    }
                                    ,
                                    i.prototype.open = i.prototype.connect = function(e, t) {
                                        if (p("readyState %s", this.readyState),
                                        ~this.readyState.indexOf("open"))
                                            return this;
                                        p("opening %s", this.uri),
                                        this.engine = s(this.uri, this.opts);
                                        var r = this.engine
                                          , i = this;
                                        this.readyState = "opening",
                                        this.skipReconnect = !1;
                                        var n = l(r, "open", function() {
                                            i.onopen(),
                                            e && e()
                                        })
                                          , a = l(r, "error", function(t) {
                                            if (p("connect_error"),
                                            i.cleanup(),
                                            i.readyState = "closed",
                                            i.emitAll("connect_error", t),
                                            e) {
                                                var r = new Error("Connection error");
                                                r.data = t,
                                                e(r)
                                            } else
                                                i.maybeReconnectOnOpen()
                                        });
                                        if (!1 !== this._timeout) {
                                            var o = this._timeout;
                                            p("connect attempt will timeout after %d", o);
                                            var c = setTimeout(function() {
                                                p("connect attempt timed out after %d", o),
                                                n.destroy(),
                                                r.close(),
                                                r.emit("error", "timeout"),
                                                i.emitAll("connect_timeout", o)
                                            }, o);
                                            this.subs.push({
                                                destroy: function() {
                                                    clearTimeout(c)
                                                }
                                            })
                                        }
                                        return this.subs.push(n),
                                        this.subs.push(a),
                                        this
                                    }
                                    ,
                                    i.prototype.onopen = function() {
                                        p("open"),
                                        this.cleanup(),
                                        this.readyState = "open",
                                        this.emit("open");
                                        var e = this.engine;
                                        this.subs.push(l(e, "data", _(this, "ondata"))),
                                        this.subs.push(l(e, "ping", _(this, "onping"))),
                                        this.subs.push(l(e, "pong", _(this, "onpong"))),
                                        this.subs.push(l(e, "error", _(this, "onerror"))),
                                        this.subs.push(l(e, "close", _(this, "onclose"))),
                                        this.subs.push(l(this.decoder, "decoded", _(this, "ondecoded")))
                                    }
                                    ,
                                    i.prototype.onping = function() {
                                        this.lastPing = new Date,
                                        this.emitAll("ping")
                                    }
                                    ,
                                    i.prototype.onpong = function() {
                                        this.emitAll("pong", new Date - this.lastPing)
                                    }
                                    ,
                                    i.prototype.ondata = function(e) {
                                        this.decoder.add(e)
                                    }
                                    ,
                                    i.prototype.ondecoded = function(e) {
                                        this.emit("packet", e)
                                    }
                                    ,
                                    i.prototype.onerror = function(e) {
                                        p("error", e),
                                        this.emitAll("error", e)
                                    }
                                    ,
                                    i.prototype.socket = function(e, t) {
                                        function r() {
                                            ~h(n.connecting, i) || n.connecting.push(i)
                                        }
                                        var i = this.nsps[e];
                                        if (!i) {
                                            i = new a(this,e,t),
                                            this.nsps[e] = i;
                                            var n = this;
                                            i.on("connecting", r),
                                            i.on("connect", function() {
                                                i.id = n.engine.id
                                            }),
                                            this.autoConnect && r()
                                        }
                                        return i
                                    }
                                    ,
                                    i.prototype.destroy = function(e) {
                                        var t = h(this.connecting, e);
                                        ~t && this.connecting.splice(t, 1),
                                        this.connecting.length || this.close()
                                    }
                                    ,
                                    i.prototype.packet = function(e) {
                                        p("writing packet %j", e);
                                        var t = this;
                                        e.query && 0 === e.type && (e.nsp += "?" + e.query),
                                        t.encoding ? t.packetBuffer.push(e) : (t.encoding = !0,
                                        this.encoder.encode(e, function(r) {
                                            for (var i = 0; i < r.length; i++)
                                                t.engine.write(r[i], e.options);
                                            t.encoding = !1,
                                            t.processPacketQueue()
                                        }))
                                    }
                                    ,
                                    i.prototype.processPacketQueue = function() {
                                        if (this.packetBuffer.length > 0 && !this.encoding) {
                                            var e = this.packetBuffer.shift();
                                            this.packet(e)
                                        }
                                    }
                                    ,
                                    i.prototype.cleanup = function() {
                                        p("cleanup");
                                        for (var e = this.subs.length, t = 0; t < e; t++) {
                                            var r = this.subs.shift();
                                            r.destroy()
                                        }
                                        this.packetBuffer = [],
                                        this.encoding = !1,
                                        this.lastPing = null,
                                        this.decoder.destroy()
                                    }
                                    ,
                                    i.prototype.close = i.prototype.disconnect = function() {
                                        p("disconnect"),
                                        this.skipReconnect = !0,
                                        this.reconnecting = !1,
                                        "opening" === this.readyState && this.cleanup(),
                                        this.backoff.reset(),
                                        this.readyState = "closed",
                                        this.engine && this.engine.close()
                                    }
                                    ,
                                    i.prototype.onclose = function(e) {
                                        p("onclose"),
                                        this.cleanup(),
                                        this.backoff.reset(),
                                        this.readyState = "closed",
                                        this.emit("close", e),
                                        this._reconnection && !this.skipReconnect && this.reconnect()
                                    }
                                    ,
                                    i.prototype.reconnect = function() {
                                        if (this.reconnecting || this.skipReconnect)
                                            return this;
                                        var e = this;
                                        if (this.backoff.attempts >= this._reconnectionAttempts)
                                            p("reconnect failed"),
                                            this.backoff.reset(),
                                            this.emitAll("reconnect_failed"),
                                            this.reconnecting = !1;
                                        else {
                                            var t = this.backoff.duration();
                                            p("will wait %dms before reconnect attempt", t),
                                            this.reconnecting = !0;
                                            var r = setTimeout(function() {
                                                e.skipReconnect || (p("attempting reconnect"),
                                                e.emitAll("reconnect_attempt", e.backoff.attempts),
                                                e.emitAll("reconnecting", e.backoff.attempts),
                                                e.skipReconnect || e.open(function(t) {
                                                    t ? (p("reconnect attempt error"),
                                                    e.reconnecting = !1,
                                                    e.reconnect(),
                                                    e.emitAll("reconnect_error", t.data)) : (p("reconnect success"),
                                                    e.onreconnect())
                                                }))
                                            }, t);
                                            this.subs.push({
                                                destroy: function() {
                                                    clearTimeout(r)
                                                }
                                            })
                                        }
                                    }
                                    ,
                                    i.prototype.onreconnect = function() {
                                        var e = this.backoff.attempts;
                                        this.reconnecting = !1,
                                        this.backoff.reset(),
                                        this.updateSocketIds(),
                                        this.emitAll("reconnect", e)
                                    }
                                }
                                , function(e, t, r) {
                                    e.exports = r(19)
                                }
                                , function(e, t, r) {
                                    e.exports = r(20),
                                    e.exports.parser = r(27)
                                }
                                , function(e, t, r) {
                                    (function(t) {
                                        function i(e, r) {
                                            if (!(this instanceof i))
                                                return new i(e,r);
                                            r = r || {},
                                            e && "object" == typeof e && (r = e,
                                            e = null),
                                            e ? (e = _(e),
                                            r.hostname = e.host,
                                            r.secure = "https" === e.protocol || "wss" === e.protocol,
                                            r.port = e.port,
                                            e.query && (r.query = e.query)) : r.host && (r.hostname = _(r.host).host),
                                            this.secure = null != r.secure ? r.secure : t.location && "https:" === location.protocol,
                                            r.hostname && !r.port && (r.port = this.secure ? "443" : "80"),
                                            this.agent = r.agent || !1,
                                            this.hostname = r.hostname || (t.location ? location.hostname : "localhost"),
                                            this.port = r.port || (t.location && location.port ? location.port : this.secure ? 443 : 80),
                                            this.query = r.query || {},
                                            "string" == typeof this.query && (this.query = h.decode(this.query)),
                                            this.upgrade = !1 !== r.upgrade,
                                            this.path = (r.path || "/engine.io").replace(/\/$/, "") + "/",
                                            this.forceJSONP = !!r.forceJSONP,
                                            this.jsonp = !1 !== r.jsonp,
                                            this.forceBase64 = !!r.forceBase64,
                                            this.enablesXDR = !!r.enablesXDR,
                                            this.timestampParam = r.timestampParam || "t",
                                            this.timestampRequests = r.timestampRequests,
                                            this.transports = r.transports || ["polling", "websocket"],
                                            this.readyState = "",
                                            this.writeBuffer = [],
                                            this.prevBufferLen = 0,
                                            this.policyPort = r.policyPort || 843,
                                            this.rememberUpgrade = r.rememberUpgrade || !1,
                                            this.binaryType = null,
                                            this.onlyBinaryUpgrades = r.onlyBinaryUpgrades,
                                            this.perMessageDeflate = !1 !== r.perMessageDeflate && (r.perMessageDeflate || {}),
                                            !0 === this.perMessageDeflate && (this.perMessageDeflate = {}),
                                            this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024),
                                            this.pfx = r.pfx || null,
                                            this.key = r.key || null,
                                            this.passphrase = r.passphrase || null,
                                            this.cert = r.cert || null,
                                            this.ca = r.ca || null,
                                            this.ciphers = r.ciphers || null,
                                            this.rejectUnauthorized = void 0 === r.rejectUnauthorized ? null : r.rejectUnauthorized,
                                            this.forceNode = !!r.forceNode;
                                            var n = "object" == typeof t && t;
                                            n.global === n && (r.extraHeaders && Object.keys(r.extraHeaders).length > 0 && (this.extraHeaders = r.extraHeaders),
                                            r.localAddress && (this.localAddress = r.localAddress)),
                                            this.id = null,
                                            this.upgrades = null,
                                            this.pingInterval = null,
                                            this.pingTimeout = null,
                                            this.pingIntervalTimer = null,
                                            this.pingTimeoutTimer = null,
                                            this.open()
                                        }
                                        function n(e) {
                                            var t = {};
                                            for (var r in e)
                                                e.hasOwnProperty(r) && (t[r] = e[r]);
                                            return t
                                        }
                                        var s = r(21)
                                          , a = r(36)
                                          , o = r(3)("engine.io-client:socket")
                                          , c = r(43)
                                          , l = r(27)
                                          , _ = r(2)
                                          , p = r(44)
                                          , h = r(37);
                                        e.exports = i,
                                        i.priorWebsocketSuccess = !1,
                                        a(i.prototype),
                                        i.protocol = l.protocol,
                                        i.Socket = i,
                                        i.Transport = r(26),
                                        i.transports = r(21),
                                        i.parser = r(27),
                                        i.prototype.createTransport = function(e) {
                                            o('creating transport "%s"', e);
                                            var t = n(this.query);
                                            t.EIO = l.protocol,
                                            t.transport = e,
                                            this.id && (t.sid = this.id);
                                            var r = new s[e]({
                                                agent: this.agent,
                                                hostname: this.hostname,
                                                port: this.port,
                                                secure: this.secure,
                                                path: this.path,
                                                query: t,
                                                forceJSONP: this.forceJSONP,
                                                jsonp: this.jsonp,
                                                forceBase64: this.forceBase64,
                                                enablesXDR: this.enablesXDR,
                                                timestampRequests: this.timestampRequests,
                                                timestampParam: this.timestampParam,
                                                policyPort: this.policyPort,
                                                socket: this,
                                                pfx: this.pfx,
                                                key: this.key,
                                                passphrase: this.passphrase,
                                                cert: this.cert,
                                                ca: this.ca,
                                                ciphers: this.ciphers,
                                                rejectUnauthorized: this.rejectUnauthorized,
                                                perMessageDeflate: this.perMessageDeflate,
                                                extraHeaders: this.extraHeaders,
                                                forceNode: this.forceNode,
                                                localAddress: this.localAddress
                                            });
                                            return r
                                        }
                                        ,
                                        i.prototype.open = function() {
                                            var e;
                                            if (this.rememberUpgrade && i.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1)
                                                e = "websocket";
                                            else {
                                                if (0 === this.transports.length) {
                                                    var t = this;
                                                    return void setTimeout(function() {
                                                        t.emit("error", "No transports available")
                                                    }, 0)
                                                }
                                                e = this.transports[0]
                                            }
                                            this.readyState = "opening";
                                            try {
                                                e = this.createTransport(e)
                                            } catch (e) {
                                                return this.transports.shift(),
                                                void this.open()
                                            }
                                            e.open(),
                                            this.setTransport(e)
                                        }
                                        ,
                                        i.prototype.setTransport = function(e) {
                                            o("setting transport %s", e.name);
                                            var t = this;
                                            this.transport && (o("clearing existing transport %s", this.transport.name),
                                            this.transport.removeAllListeners()),
                                            this.transport = e,
                                            e.on("drain", function() {
                                                t.onDrain()
                                            }).on("packet", function(e) {
                                                t.onPacket(e)
                                            }).on("error", function(e) {
                                                t.onError(e)
                                            }).on("close", function() {
                                                t.onClose("transport close")
                                            })
                                        }
                                        ,
                                        i.prototype.probe = function(e) {
                                            function t() {
                                                if (h.onlyBinaryUpgrades) {
                                                    var t = !this.supportsBinary && h.transport.supportsBinary;
                                                    p = p || t
                                                }
                                                p || (o('probe transport "%s" opened', e),
                                                _.send([{
                                                    type: "ping",
                                                    data: "probe"
                                                }]),
                                                _.once("packet", function(t) {
                                                    if (!p)
                                                        if ("pong" === t.type && "probe" === t.data) {
                                                            if (o('probe transport "%s" pong', e),
                                                            h.upgrading = !0,
                                                            h.emit("upgrading", _),
                                                            !_)
                                                                return;
                                                            i.priorWebsocketSuccess = "websocket" === _.name,
                                                            o('pausing current transport "%s"', h.transport.name),
                                                            h.transport.pause(function() {
                                                                p || "closed" !== h.readyState && (o("changing transport and sending upgrade packet"),
                                                                l(),
                                                                h.setTransport(_),
                                                                _.send([{
                                                                    type: "upgrade"
                                                                }]),
                                                                h.emit("upgrade", _),
                                                                _ = null,
                                                                h.upgrading = !1,
                                                                h.flush())
                                                            })
                                                        } else {
                                                            o('probe transport "%s" failed', e);
                                                            var r = new Error("probe error");
                                                            r.transport = _.name,
                                                            h.emit("upgradeError", r)
                                                        }
                                                }))
                                            }
                                            function r() {
                                                p || (p = !0,
                                                l(),
                                                _.close(),
                                                _ = null)
                                            }
                                            function n(t) {
                                                var i = new Error("probe error: " + t);
                                                i.transport = _.name,
                                                r(),
                                                o('probe transport "%s" failed because of error: %s', e, t),
                                                h.emit("upgradeError", i)
                                            }
                                            function s() {
                                                n("transport closed")
                                            }
                                            function a() {
                                                n("socket closed")
                                            }
                                            function c(e) {
                                                _ && e.name !== _.name && (o('"%s" works - aborting "%s"', e.name, _.name),
                                                r())
                                            }
                                            function l() {
                                                _.removeListener("open", t),
                                                _.removeListener("error", n),
                                                _.removeListener("close", s),
                                                h.removeListener("close", a),
                                                h.removeListener("upgrading", c)
                                            }
                                            o('probing transport "%s"', e);
                                            var _ = this.createTransport(e, {
                                                probe: 1
                                            })
                                              , p = !1
                                              , h = this;
                                            i.priorWebsocketSuccess = !1,
                                            _.once("open", t),
                                            _.once("error", n),
                                            _.once("close", s),
                                            this.once("close", a),
                                            this.once("upgrading", c),
                                            _.open()
                                        }
                                        ,
                                        i.prototype.onOpen = function() {
                                            if (o("socket open"),
                                            this.readyState = "open",
                                            i.priorWebsocketSuccess = "websocket" === this.transport.name,
                                            this.emit("open"),
                                            this.flush(),
                                            "open" === this.readyState && this.upgrade && this.transport.pause) {
                                                o("starting upgrade probes");
                                                for (var e = 0, t = this.upgrades.length; e < t; e++)
                                                    this.probe(this.upgrades[e])
                                            }
                                        }
                                        ,
                                        i.prototype.onPacket = function(e) {
                                            if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState)
                                                switch (o('socket receive: type "%s", data "%s"', e.type, e.data),
                                                this.emit("packet", e),
                                                this.emit("heartbeat"),
                                                e.type) {
                                                case "open":
                                                    this.onHandshake(p(e.data));
                                                    break;
                                                case "pong":
                                                    this.setPing(),
                                                    this.emit("pong");
                                                    break;
                                                case "error":
                                                    var t = new Error("server error");
                                                    t.code = e.data,
                                                    this.onError(t);
                                                    break;
                                                case "message":
                                                    this.emit("data", e.data),
                                                    this.emit("message", e.data)
                                                }
                                            else
                                                o('packet received with socket readyState "%s"', this.readyState)
                                        }
                                        ,
                                        i.prototype.onHandshake = function(e) {
                                            this.emit("handshake", e),
                                            this.id = e.sid,
                                            this.transport.query.sid = e.sid,
                                            this.upgrades = this.filterUpgrades(e.upgrades),
                                            this.pingInterval = e.pingInterval,
                                            this.pingTimeout = e.pingTimeout,
                                            this.onOpen(),
                                            "closed" !== this.readyState && (this.setPing(),
                                            this.removeListener("heartbeat", this.onHeartbeat),
                                            this.on("heartbeat", this.onHeartbeat))
                                        }
                                        ,
                                        i.prototype.onHeartbeat = function(e) {
                                            clearTimeout(this.pingTimeoutTimer);
                                            var t = this;
                                            t.pingTimeoutTimer = setTimeout(function() {
                                                "closed" !== t.readyState && t.onClose("ping timeout")
                                            }, e || t.pingInterval + t.pingTimeout)
                                        }
                                        ,
                                        i.prototype.setPing = function() {
                                            var e = this;
                                            clearTimeout(e.pingIntervalTimer),
                                            e.pingIntervalTimer = setTimeout(function() {
                                                o("writing ping packet - expecting pong within %sms", e.pingTimeout),
                                                e.ping(),
                                                e.onHeartbeat(e.pingTimeout)
                                            }, e.pingInterval)
                                        }
                                        ,
                                        i.prototype.ping = function() {
                                            var e = this;
                                            this.sendPacket("ping", function() {
                                                e.emit("ping")
                                            })
                                        }
                                        ,
                                        i.prototype.onDrain = function() {
                                            this.writeBuffer.splice(0, this.prevBufferLen),
                                            this.prevBufferLen = 0,
                                            0 === this.writeBuffer.length ? this.emit("drain") : this.flush()
                                        }
                                        ,
                                        i.prototype.flush = function() {
                                            "closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (o("flushing %d packets in socket", this.writeBuffer.length),
                                            this.transport.send(this.writeBuffer),
                                            this.prevBufferLen = this.writeBuffer.length,
                                            this.emit("flush"))
                                        }
                                        ,
                                        i.prototype.write = i.prototype.send = function(e, t, r) {
                                            return this.sendPacket("message", e, t, r),
                                            this
                                        }
                                        ,
                                        i.prototype.sendPacket = function(e, t, r, i) {
                                            if ("function" == typeof t && (i = t,
                                            t = void 0),
                                            "function" == typeof r && (i = r,
                                            r = null),
                                            "closing" !== this.readyState && "closed" !== this.readyState) {
                                                r = r || {},
                                                r.compress = !1 !== r.compress;
                                                var n = {
                                                    type: e,
                                                    data: t,
                                                    options: r
                                                };
                                                this.emit("packetCreate", n),
                                                this.writeBuffer.push(n),
                                                i && this.once("flush", i),
                                                this.flush()
                                            }
                                        }
                                        ,
                                        i.prototype.close = function() {
                                            function e() {
                                                i.onClose("forced close"),
                                                o("socket closing - telling transport to close"),
                                                i.transport.close()
                                            }
                                            function t() {
                                                i.removeListener("upgrade", t),
                                                i.removeListener("upgradeError", t),
                                                e()
                                            }
                                            function r() {
                                                i.once("upgrade", t),
                                                i.once("upgradeError", t)
                                            }
                                            if ("opening" === this.readyState || "open" === this.readyState) {
                                                this.readyState = "closing";
                                                var i = this;
                                                this.writeBuffer.length ? this.once("drain", function() {
                                                    this.upgrading ? r() : e()
                                                }) : this.upgrading ? r() : e()
                                            }
                                            return this
                                        }
                                        ,
                                        i.prototype.onError = function(e) {
                                            o("socket error %j", e),
                                            i.priorWebsocketSuccess = !1,
                                            this.emit("error", e),
                                            this.onClose("transport error", e)
                                        }
                                        ,
                                        i.prototype.onClose = function(e, t) {
                                            if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
                                                o('socket close with reason: "%s"', e);
                                                var r = this;
                                                clearTimeout(this.pingIntervalTimer),
                                                clearTimeout(this.pingTimeoutTimer),
                                                this.transport.removeAllListeners("close"),
                                                this.transport.close(),
                                                this.transport.removeAllListeners(),
                                                this.readyState = "closed",
                                                this.id = null,
                                                this.emit("close", e, t),
                                                r.writeBuffer = [],
                                                r.prevBufferLen = 0
                                            }
                                        }
                                        ,
                                        i.prototype.filterUpgrades = function(e) {
                                            for (var t = [], r = 0, i = e.length; r < i; r++)
                                                ~c(this.transports, e[r]) && t.push(e[r]);
                                            return t
                                        }
                                    }
                                    ).call(t, function() {
                                        return this
                                    }())
                                }
                                , function(e, t, r) {
                                    (function(e) {
                                        function i(t) {
                                            var r, i = !1, o = !1, c = !1 !== t.jsonp;
                                            if (e.location) {
                                                var l = "https:" === location.protocol
                                                  , _ = location.port;
                                                _ || (_ = l ? 443 : 80),
                                                i = t.hostname !== location.hostname || _ !== t.port,
                                                o = t.secure !== l
                                            }
                                            if (t.xdomain = i,
                                            t.xscheme = o,
                                            r = new n(t),
                                            "open"in r && !t.forceJSONP)
                                                return new s(t);
                                            if (!c)
                                                throw new Error("JSONP disabled");
                                            return new a(t)
                                        }
                                        var n = r(22)
                                          , s = r(24)
                                          , a = r(40)
                                          , o = r(41);
                                        t.polling = i,
                                        t.websocket = o
                                    }
                                    ).call(t, function() {
                                        return this
                                    }())
                                }
                                , function(e, t, r) {
                                    (function(t) {
                                        var i = r(23);
                                        e.exports = function(e) {
                                            var r = e.xdomain
                                              , n = e.xscheme
                                              , s = e.enablesXDR;
                                            try {
                                                if ("undefined" != typeof XMLHttpRequest && (!r || i))
                                                    return new XMLHttpRequest
                                            } catch (e) {}
                                            try {
                                                if ("undefined" != typeof XDomainRequest && !n && s)
                                                    return new XDomainRequest
                                            } catch (e) {}
                                            if (!r)
                                                try {
                                                    return new (t[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")
                                                } catch (e) {}
                                        }
                                    }
                                    ).call(t, function() {
                                        return this
                                    }())
                                }
                                , function(e, t) {
                                    try {
                                        e.exports = "undefined" != typeof XMLHttpRequest && "withCredentials"in new XMLHttpRequest
                                    } catch (t) {
                                        e.exports = !1
                                    }
                                }
                                , function(e, t, r) {
                                    (function(t) {
                                        function i() {}
                                        function n(e) {
                                            if (c.call(this, e),
                                            this.requestTimeout = e.requestTimeout,
                                            t.location) {
                                                var r = "https:" === location.protocol
                                                  , i = location.port;
                                                i || (i = r ? 443 : 80),
                                                this.xd = e.hostname !== t.location.hostname || i !== e.port,
                                                this.xs = e.secure !== r
                                            } else
                                                this.extraHeaders = e.extraHeaders
                                        }
                                        function s(e) {
                                            this.method = e.method || "GET",
                                            this.uri = e.uri,
                                            this.xd = !!e.xd,
                                            this.xs = !!e.xs,
                                            this.async = !1 !== e.async,
                                            this.data = void 0 !== e.data ? e.data : null,
                                            this.agent = e.agent,
                                            this.isBinary = e.isBinary,
                                            this.supportsBinary = e.supportsBinary,
                                            this.enablesXDR = e.enablesXDR,
                                            this.requestTimeout = e.requestTimeout,
                                            this.pfx = e.pfx,
                                            this.key = e.key,
                                            this.passphrase = e.passphrase,
                                            this.cert = e.cert,
                                            this.ca = e.ca,
                                            this.ciphers = e.ciphers,
                                            this.rejectUnauthorized = e.rejectUnauthorized,
                                            this.extraHeaders = e.extraHeaders,
                                            this.create()
                                        }
                                        function a() {
                                            for (var e in s.requests)
                                                s.requests.hasOwnProperty(e) && s.requests[e].abort()
                                        }
                                        var o = r(22)
                                          , c = r(25)
                                          , l = r(36)
                                          , _ = r(38)
                                          , p = r(3)("engine.io-client:polling-xhr");
                                        e.exports = n,
                                        e.exports.Request = s,
                                        _(n, c),
                                        n.prototype.supportsBinary = !0,
                                        n.prototype.request = function(e) {
                                            return e = e || {},
                                            e.uri = this.uri(),
                                            e.xd = this.xd,
                                            e.xs = this.xs,
                                            e.agent = this.agent || !1,
                                            e.supportsBinary = this.supportsBinary,
                                            e.enablesXDR = this.enablesXDR,
                                            e.pfx = this.pfx,
                                            e.key = this.key,
                                            e.passphrase = this.passphrase,
                                            e.cert = this.cert,
                                            e.ca = this.ca,
                                            e.ciphers = this.ciphers,
                                            e.rejectUnauthorized = this.rejectUnauthorized,
                                            e.requestTimeout = this.requestTimeout,
                                            e.extraHeaders = this.extraHeaders,
                                            new s(e)
                                        }
                                        ,
                                        n.prototype.doWrite = function(e, t) {
                                            var r = "string" != typeof e && void 0 !== e
                                              , i = this.request({
                                                method: "POST",
                                                data: e,
                                                isBinary: r
                                            })
                                              , n = this;
                                            i.on("success", t),
                                            i.on("error", function(e) {
                                                n.onError("xhr post error", e)
                                            }),
                                            this.sendXhr = i
                                        }
                                        ,
                                        n.prototype.doPoll = function() {
                                            p("xhr poll");
                                            var e = this.request()
                                              , t = this;
                                            e.on("data", function(e) {
                                                t.onData(e)
                                            }),
                                            e.on("error", function(e) {
                                                t.onError("xhr poll error", e)
                                            }),
                                            this.pollXhr = e
                                        }
                                        ,
                                        l(s.prototype),
                                        s.prototype.create = function() {
                                            var e = {
                                                agent: this.agent,
                                                xdomain: this.xd,
                                                xscheme: this.xs,
                                                enablesXDR: this.enablesXDR
                                            };
                                            e.pfx = this.pfx,
                                            e.key = this.key,
                                            e.passphrase = this.passphrase,
                                            e.cert = this.cert,
                                            e.ca = this.ca,
                                            e.ciphers = this.ciphers,
                                            e.rejectUnauthorized = this.rejectUnauthorized;
                                            var r = this.xhr = new o(e)
                                              , i = this;
                                            try {
                                                p("xhr open %s: %s", this.method, this.uri),
                                                r.open(this.method, this.uri, this.async);
                                                try {
                                                    if (this.extraHeaders) {
                                                        r.setDisableHeaderCheck(!0);
                                                        for (var n in this.extraHeaders)
                                                            this.extraHeaders.hasOwnProperty(n) && r.setRequestHeader(n, this.extraHeaders[n])
                                                    }
                                                } catch (e) {}
                                                if (this.supportsBinary && (r.responseType = "arraybuffer"),
                                                "POST" === this.method)
                                                    try {
                                                        this.isBinary ? r.setRequestHeader("Content-type", "application/octet-stream") : r.setRequestHeader("Content-type", "text/plain;charset=UTF-8")
                                                    } catch (e) {}
                                                try {
                                                    r.setRequestHeader("Accept", "*/*")
                                                } catch (e) {}
                                                "withCredentials"in r && (r.withCredentials = !0),
                                                this.requestTimeout && (r.timeout = this.requestTimeout),
                                                this.hasXDR() ? (r.onload = function() {
                                                    i.onLoad()
                                                }
                                                ,
                                                r.onerror = function() {
                                                    i.onError(r.responseText)
                                                }
                                                ) : r.onreadystatechange = function() {
                                                    4 === r.readyState && (200 === r.status || 1223 === r.status ? i.onLoad() : setTimeout(function() {
                                                        i.onError(r.status)
                                                    }, 0))
                                                }
                                                ,
                                                p("xhr data %s", this.data),
                                                r.send(this.data)
                                            } catch (e) {
                                                return void setTimeout(function() {
                                                    i.onError(e)
                                                }, 0)
                                            }
                                            t.document && (this.index = s.requestsCount++,
                                            s.requests[this.index] = this)
                                        }
                                        ,
                                        s.prototype.onSuccess = function() {
                                            this.emit("success"),
                                            this.cleanup()
                                        }
                                        ,
                                        s.prototype.onData = function(e) {
                                            this.emit("data", e),
                                            this.onSuccess()
                                        }
                                        ,
                                        s.prototype.onError = function(e) {
                                            this.emit("error", e),
                                            this.cleanup(!0)
                                        }
                                        ,
                                        s.prototype.cleanup = function(e) {
                                            if ("undefined" != typeof this.xhr && null !== this.xhr) {
                                                if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = i : this.xhr.onreadystatechange = i,
                                                e)
                                                    try {
                                                        this.xhr.abort()
                                                    } catch (e) {}
                                                t.document && delete s.requests[this.index],
                                                this.xhr = null
                                            }
                                        }
                                        ,
                                        s.prototype.onLoad = function() {
                                            var e;
                                            try {
                                                var t;
                                                try {
                                                    t = this.xhr.getResponseHeader("Content-Type").split(";")[0]
                                                } catch (e) {}
                                                if ("application/octet-stream" === t)
                                                    e = this.xhr.response || this.xhr.responseText;
                                                else if (this.supportsBinary)
                                                    try {
                                                        e = String.fromCharCode.apply(null, new Uint8Array(this.xhr.response))
                                                    } catch (t) {
                                                        for (var r = new Uint8Array(this.xhr.response), i = [], n = 0, s = r.length; n < s; n++)
                                                            i.push(r[n]);
                                                        e = String.fromCharCode.apply(null, i)
                                                    }
                                                else
                                                    e = this.xhr.responseText
                                            } catch (e) {
                                                this.onError(e)
                                            }
                                            null != e && this.onData(e)
                                        }
                                        ,
                                        s.prototype.hasXDR = function() {
                                            return "undefined" != typeof t.XDomainRequest && !this.xs && this.enablesXDR
                                        }
                                        ,
                                        s.prototype.abort = function() {
                                            this.cleanup()
                                        }
                                        ,
                                        s.requestsCount = 0,
                                        s.requests = {},
                                        t.document && (t.attachEvent ? t.attachEvent("onunload", a) : t.addEventListener && t.addEventListener("beforeunload", a, !1))
                                    }
                                    ).call(t, function() {
                                        return this
                                    }())
                                }
                                , function(e, t, r) {
                                    function i(e) {
                                        var t = e && e.forceBase64;
                                        _ && !t || (this.supportsBinary = !1),
                                        n.call(this, e)
                                    }
                                    var n = r(26)
                                      , s = r(37)
                                      , a = r(27)
                                      , o = r(38)
                                      , c = r(39)
                                      , l = r(3)("engine.io-client:polling");
                                    e.exports = i;
                                    var _ = function() {
                                        var e = r(22)
                                          , t = new e({
                                            xdomain: !1
                                        });
                                        return null != t.responseType
                                    }();
                                    o(i, n),
                                    i.prototype.name = "polling",
                                    i.prototype.doOpen = function() {
                                        this.poll()
                                    }
                                    ,
                                    i.prototype.pause = function(e) {
                                        function t() {
                                            l("paused"),
                                            r.readyState = "paused",
                                            e()
                                        }
                                        var r = this;
                                        if (this.readyState = "pausing",
                                        this.polling || !this.writable) {
                                            var i = 0;
                                            this.polling && (l("we are currently polling - waiting to pause"),
                                            i++,
                                            this.once("pollComplete", function() {
                                                l("pre-pause polling complete"),
                                                --i || t()
                                            })),
                                            this.writable || (l("we are currently writing - waiting to pause"),
                                            i++,
                                            this.once("drain", function() {
                                                l("pre-pause writing complete"),
                                                --i || t()
                                            }))
                                        } else
                                            t()
                                    }
                                    ,
                                    i.prototype.poll = function() {
                                        l("polling"),
                                        this.polling = !0,
                                        this.doPoll(),
                                        this.emit("poll")
                                    }
                                    ,
                                    i.prototype.onData = function(e) {
                                        var t = this;
                                        l("polling got data %s", e);
                                        var r = function(e, r, i) {
                                            return "opening" === t.readyState && t.onOpen(),
                                            "close" === e.type ? (t.onClose(),
                                            !1) : void t.onPacket(e)
                                        };
                                        a.decodePayload(e, this.socket.binaryType, r),
                                        "closed" !== this.readyState && (this.polling = !1,
                                        this.emit("pollComplete"),
                                        "open" === this.readyState ? this.poll() : l('ignoring poll - transport state "%s"', this.readyState))
                                    }
                                    ,
                                    i.prototype.doClose = function() {
                                        function e() {
                                            l("writing close packet"),
                                            t.write([{
                                                type: "close"
                                            }])
                                        }
                                        var t = this;
                                        "open" === this.readyState ? (l("transport open - closing"),
                                        e()) : (l("transport not open - deferring close"),
                                        this.once("open", e))
                                    }
                                    ,
                                    i.prototype.write = function(e) {
                                        var t = this;
                                        this.writable = !1;
                                        var r = function() {
                                            t.writable = !0,
                                            t.emit("drain")
                                        };
                                        a.encodePayload(e, this.supportsBinary, function(e) {
                                            t.doWrite(e, r)
                                        })
                                    }
                                    ,
                                    i.prototype.uri = function() {
                                        var e = this.query || {}
                                          , t = this.secure ? "https" : "http"
                                          , r = "";
                                        !1 !== this.timestampRequests && (e[this.timestampParam] = c()),
                                        this.supportsBinary || e.sid || (e.b64 = 1),
                                        e = s.encode(e),
                                        this.port && ("https" === t && 443 !== Number(this.port) || "http" === t && 80 !== Number(this.port)) && (r = ":" + this.port),
                                        e.length && (e = "?" + e);
                                        var i = this.hostname.indexOf(":") !== -1;
                                        return t + "://" + (i ? "[" + this.hostname + "]" : this.hostname) + r + this.path + e
                                    }
                                }
                                , function(e, t, r) {
                                    function i(e) {
                                        this.path = e.path,
                                        this.hostname = e.hostname,
                                        this.port = e.port,
                                        this.secure = e.secure,
                                        this.query = e.query,
                                        this.timestampParam = e.timestampParam,
                                        this.timestampRequests = e.timestampRequests,
                                        this.readyState = "",
                                        this.agent = e.agent || !1,
                                        this.socket = e.socket,
                                        this.enablesXDR = e.enablesXDR,
                                        this.pfx = e.pfx,
                                        this.key = e.key,
                                        this.passphrase = e.passphrase,
                                        this.cert = e.cert,
                                        this.ca = e.ca,
                                        this.ciphers = e.ciphers,
                                        this.rejectUnauthorized = e.rejectUnauthorized,
                                        this.forceNode = e.forceNode,
                                        this.extraHeaders = e.extraHeaders,
                                        this.localAddress = e.localAddress
                                    }
                                    var n = r(27)
                                      , s = r(36);
                                    e.exports = i,
                                    s(i.prototype),
                                    i.prototype.onError = function(e, t) {
                                        var r = new Error(e);
                                        return r.type = "TransportError",
                                        r.description = t,
                                        this.emit("error", r),
                                        this
                                    }
                                    ,
                                    i.prototype.open = function() {
                                        return "closed" !== this.readyState && "" !== this.readyState || (this.readyState = "opening",
                                        this.doOpen()),
                                        this
                                    }
                                    ,
                                    i.prototype.close = function() {
                                        return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(),
                                        this.onClose()),
                                        this
                                    }
                                    ,
                                    i.prototype.send = function(e) {
                                        if ("open" !== this.readyState)
                                            throw new Error("Transport not open");
                                        this.write(e)
                                    }
                                    ,
                                    i.prototype.onOpen = function() {
                                        this.readyState = "open",
                                        this.writable = !0,
                                        this.emit("open")
                                    }
                                    ,
                                    i.prototype.onData = function(e) {
                                        var t = n.decodePacket(e, this.socket.binaryType);
                                        this.onPacket(t)
                                    }
                                    ,
                                    i.prototype.onPacket = function(e) {
                                        this.emit("packet", e)
                                    }
                                    ,
                                    i.prototype.onClose = function() {
                                        this.readyState = "closed",
                                        this.emit("close")
                                    }
                                }
                                , function(e, t, r) {
                                    (function(e) {
                                        function i(e, r) {
                                            var i = "b" + t.packets[e.type] + e.data.data;
                                            return r(i)
                                        }
                                        function n(e, r, i) {
                                            if (!r)
                                                return t.encodeBase64Packet(e, i);
                                            var n = e.data
                                              , s = new Uint8Array(n)
                                              , a = new Uint8Array(1 + n.byteLength);
                                            a[0] = y[e.type];
                                            for (var o = 0; o < s.length; o++)
                                                a[o + 1] = s[o];
                                            return i(a.buffer)
                                        }
                                        function s(e, r, i) {
                                            if (!r)
                                                return t.encodeBase64Packet(e, i);
                                            var n = new FileReader;
                                            return n.onload = function() {
                                                e.data = n.result,
                                                t.encodePacket(e, r, !0, i)
                                            }
                                            ,
                                            n.readAsArrayBuffer(e.data)
                                        }
                                        function a(e, r, i) {
                                            if (!r)
                                                return t.encodeBase64Packet(e, i);
                                            if (m)
                                                return s(e, r, i);
                                            var n = new Uint8Array(1);
                                            n[0] = y[e.type];
                                            var a = new w([n.buffer, e.data]);
                                            return i(a)
                                        }
                                        function o(e) {
                                            try {
                                                e = d.decode(e)
                                            } catch (e) {
                                                return !1
                                            }
                                            return e
                                        }
                                        function c(e, t, r) {
                                            for (var i = new Array(e.length), n = u(e.length, r), s = function(e, r, n) {
                                                t(r, function(t, r) {
                                                    i[e] = r,
                                                    n(t, i)
                                                })
                                            }, a = 0; a < e.length; a++)
                                                s(a, e[a], n)
                                        }
                                        var l, _ = r(28), p = r(29), h = r(31), u = r(32), d = r(33);
                                        e && e.ArrayBuffer && (l = r(34));
                                        var f = "undefined" != typeof navigator && /Android/i.test(navigator.userAgent)
                                          , g = "undefined" != typeof navigator && /PhantomJS/i.test(navigator.userAgent)
                                          , m = f || g;
                                        t.protocol = 3;
                                        var y = t.packets = {
                                            open: 0,
                                            close: 1,
                                            ping: 2,
                                            pong: 3,
                                            message: 4,
                                            upgrade: 5,
                                            noop: 6
                                        }
                                          , v = _(y)
                                          , b = {
                                            type: "error",
                                            data: "parser error"
                                        }
                                          , w = r(35);
                                        t.encodePacket = function(t, r, s, o) {
                                            "function" == typeof r && (o = r,
                                            r = !1),
                                            "function" == typeof s && (o = s,
                                            s = null);
                                            var c = void 0 === t.data ? void 0 : t.data.buffer || t.data;
                                            if (e.ArrayBuffer && c instanceof ArrayBuffer)
                                                return n(t, r, o);
                                            if (w && c instanceof e.Blob)
                                                return a(t, r, o);
                                            if (c && c.base64)
                                                return i(t, o);
                                            var l = y[t.type];
                                            return void 0 !== t.data && (l += s ? d.encode(String(t.data)) : String(t.data)),
                                            o("" + l)
                                        }
                                        ,
                                        t.encodeBase64Packet = function(r, i) {
                                            var n = "b" + t.packets[r.type];
                                            if (w && r.data instanceof e.Blob) {
                                                var s = new FileReader;
                                                return s.onload = function() {
                                                    var e = s.result.split(",")[1];
                                                    i(n + e)
                                                }
                                                ,
                                                s.readAsDataURL(r.data)
                                            }
                                            var a;
                                            try {
                                                a = String.fromCharCode.apply(null, new Uint8Array(r.data))
                                            } catch (e) {
                                                for (var o = new Uint8Array(r.data), c = new Array(o.length), l = 0; l < o.length; l++)
                                                    c[l] = o[l];
                                                a = String.fromCharCode.apply(null, c)
                                            }
                                            return n += e.btoa(a),
                                            i(n)
                                        }
                                        ,
                                        t.decodePacket = function(e, r, i) {
                                            if (void 0 === e)
                                                return b;
                                            if ("string" == typeof e) {
                                                if ("b" == e.charAt(0))
                                                    return t.decodeBase64Packet(e.substr(1), r);
                                                if (i && (e = o(e),
                                                e === !1))
                                                    return b;
                                                var n = e.charAt(0);
                                                return Number(n) == n && v[n] ? e.length > 1 ? {
                                                    type: v[n],
                                                    data: e.substring(1)
                                                } : {
                                                    type: v[n]
                                                } : b
                                            }
                                            var s = new Uint8Array(e)
                                              , n = s[0]
                                              , a = h(e, 1);
                                            return w && "blob" === r && (a = new w([a])),
                                            {
                                                type: v[n],
                                                data: a
                                            }
                                        }
                                        ,
                                        t.decodeBase64Packet = function(e, t) {
                                            var r = v[e.charAt(0)];
                                            if (!l)
                                                return {
                                                    type: r,
                                                    data: {
                                                        base64: !0,
                                                        data: e.substr(1)
                                                    }
                                                };
                                            var i = l.decode(e.substr(1));
                                            return "blob" === t && w && (i = new w([i])),
                                            {
                                                type: r,
                                                data: i
                                            }
                                        }
                                        ,
                                        t.encodePayload = function(e, r, i) {
                                            function n(e) {
                                                return e.length + ":" + e
                                            }
                                            function s(e, i) {
                                                t.encodePacket(e, !!a && r, !0, function(e) {
                                                    i(null, n(e))
                                                })
                                            }
                                            "function" == typeof r && (i = r,
                                            r = null);
                                            var a = p(e);
                                            return r && a ? w && !m ? t.encodePayloadAsBlob(e, i) : t.encodePayloadAsArrayBuffer(e, i) : e.length ? void c(e, s, function(e, t) {
                                                return i(t.join(""))
                                            }) : i("0:")
                                        }
                                        ,
                                        t.decodePayload = function(e, r, i) {
                                            if ("string" != typeof e)
                                                return t.decodePayloadAsBinary(e, r, i);
                                            "function" == typeof r && (i = r,
                                            r = null);
                                            var n;
                                            if ("" == e)
                                                return i(b, 0, 1);
                                            for (var s, a, o = "", c = 0, l = e.length; c < l; c++) {
                                                var _ = e.charAt(c);
                                                if (":" != _)
                                                    o += _;
                                                else {
                                                    if ("" == o || o != (s = Number(o)))
                                                        return i(b, 0, 1);
                                                    if (a = e.substr(c + 1, s),
                                                    o != a.length)
                                                        return i(b, 0, 1);
                                                    if (a.length) {
                                                        if (n = t.decodePacket(a, r, !0),
                                                        b.type == n.type && b.data == n.data)
                                                            return i(b, 0, 1);
                                                        var p = i(n, c + s, l);
                                                        if (!1 === p)
                                                            return
                                                    }
                                                    c += s,
                                                    o = ""
                                                }
                                            }
                                            return "" != o ? i(b, 0, 1) : void 0
                                        }
                                        ,
                                        t.encodePayloadAsArrayBuffer = function(e, r) {
                                            function i(e, r) {
                                                t.encodePacket(e, !0, !0, function(e) {
                                                    return r(null, e)
                                                })
                                            }
                                            return e.length ? void c(e, i, function(e, t) {
                                                var i = t.reduce(function(e, t) {
                                                    var r;
                                                    return r = "string" == typeof t ? t.length : t.byteLength,
                                                    e + r.toString().length + r + 2
                                                }, 0)
                                                  , n = new Uint8Array(i)
                                                  , s = 0;
                                                return t.forEach(function(e) {
                                                    var t = "string" == typeof e
                                                      , r = e;
                                                    if (t) {
                                                        for (var i = new Uint8Array(e.length), a = 0; a < e.length; a++)
                                                            i[a] = e.charCodeAt(a);
                                                        r = i.buffer
                                                    }
                                                    t ? n[s++] = 0 : n[s++] = 1;
                                                    for (var o = r.byteLength.toString(), a = 0; a < o.length; a++)
                                                        n[s++] = parseInt(o[a]);
                                                    n[s++] = 255;
                                                    for (var i = new Uint8Array(r), a = 0; a < i.length; a++)
                                                        n[s++] = i[a]
                                                }),
                                                r(n.buffer)
                                            }) : r(new ArrayBuffer(0))
                                        }
                                        ,
                                        t.encodePayloadAsBlob = function(e, r) {
                                            function i(e, r) {
                                                t.encodePacket(e, !0, !0, function(e) {
                                                    var t = new Uint8Array(1);
                                                    if (t[0] = 1,
                                                    "string" == typeof e) {
                                                        for (var i = new Uint8Array(e.length), n = 0; n < e.length; n++)
                                                            i[n] = e.charCodeAt(n);
                                                        e = i.buffer,
                                                        t[0] = 0
                                                    }
                                                    for (var s = e instanceof ArrayBuffer ? e.byteLength : e.size, a = s.toString(), o = new Uint8Array(a.length + 1), n = 0; n < a.length; n++)
                                                        o[n] = parseInt(a[n]);
                                                    if (o[a.length] = 255,
                                                    w) {
                                                        var c = new w([t.buffer, o.buffer, e]);
                                                        r(null, c)
                                                    }
                                                })
                                            }
                                            c(e, i, function(e, t) {
                                                return r(new w(t))
                                            })
                                        }
                                        ,
                                        t.decodePayloadAsBinary = function(e, r, i) {
                                            "function" == typeof r && (i = r,
                                            r = null);
                                            for (var n = e, s = [], a = !1; n.byteLength > 0; ) {
                                                for (var o = new Uint8Array(n), c = 0 === o[0], l = "", _ = 1; 255 != o[_]; _++) {
                                                    if (l.length > 310) {
                                                        a = !0;
                                                        break
                                                    }
                                                    l += o[_]
                                                }
                                                if (a)
                                                    return i(b, 0, 1);
                                                n = h(n, 2 + l.length),
                                                l = parseInt(l);
                                                var p = h(n, 0, l);
                                                if (c)
                                                    try {
                                                        p = String.fromCharCode.apply(null, new Uint8Array(p))
                                                    } catch (e) {
                                                        var u = new Uint8Array(p);
                                                        p = "";
                                                        for (var _ = 0; _ < u.length; _++)
                                                            p += String.fromCharCode(u[_])
                                                    }
                                                s.push(p),
                                                n = h(n, l)
                                            }
                                            var d = s.length;
                                            s.forEach(function(e, n) {
                                                i(t.decodePacket(e, r, !0), n, d)
                                            })
                                        }
                                    }
                                    ).call(t, function() {
                                        return this
                                    }())
                                }
                                , function(e, t) {
                                    e.exports = Object.keys || function(e) {
                                        var t = []
                                          , r = Object.prototype.hasOwnProperty;
                                        for (var i in e)
                                            r.call(e, i) && t.push(i);
                                        return t
                                    }
                                }
                                , function(e, t, r) {
                                    (function(t) {
                                        function i(e) {
                                            function r(e) {
                                                if (!e)
                                                    return !1;
                                                if (t.Buffer && t.Buffer.isBuffer(e) || t.ArrayBuffer && e instanceof ArrayBuffer || t.Blob && e instanceof Blob || t.File && e instanceof File)
                                                    return !0;
                                                if (n(e)) {
                                                    for (var i = 0; i < e.length; i++)
                                                        if (r(e[i]))
                                                            return !0
                                                } else if (e && "object" == typeof e) {
                                                    e.toJSON && (e = e.toJSON());
                                                    for (var s in e)
                                                        if (Object.prototype.hasOwnProperty.call(e, s) && r(e[s]))
                                                            return !0
                                                }
                                                return !1
                                            }
                                            return r(e)
                                        }
                                        var n = r(30);
                                        e.exports = i
                                    }
                                    ).call(t, function() {
                                        return this
                                    }())
                                }
                                , function(e, t) {
                                    e.exports = Array.isArray || function(e) {
                                        return "[object Array]" == Object.prototype.toString.call(e)
                                    }
                                }
                                , function(e, t) {
                                    e.exports = function(e, t, r) {
                                        var i = e.byteLength;
                                        if (t = t || 0,
                                        r = r || i,
                                        e.slice)
                                            return e.slice(t, r);
                                        if (t < 0 && (t += i),
                                        r < 0 && (r += i),
                                        r > i && (r = i),
                                        t >= i || t >= r || 0 === i)
                                            return new ArrayBuffer(0);
                                        for (var n = new Uint8Array(e), s = new Uint8Array(r - t), a = t, o = 0; a < r; a++,
                                        o++)
                                            s[o] = n[a];
                                        return s.buffer
                                    }
                                }
                                , function(e, t) {
                                    function r(e, t, r) {
                                        function n(e, i) {
                                            if (n.count <= 0)
                                                throw new Error("after called too many times");
                                            --n.count,
                                            e ? (s = !0,
                                            t(e),
                                            t = r) : 0 !== n.count || s || t(null, i)
                                        }
                                        var s = !1;
                                        return r = r || i,
                                        n.count = e,
                                        0 === e ? t() : n
                                    }
                                    function i() {}
                                    e.exports = r
                                }
                                , function(e, t, r) {
                                    var i;
                                    (function(e, n) {
                                        (function(s) {
                                            function a(e) {
                                                for (var t, r, i = [], n = 0, s = e.length; n < s; )
                                                    t = e.charCodeAt(n++),
                                                    t >= 55296 && t <= 56319 && n < s ? (r = e.charCodeAt(n++),
                                                    56320 == (64512 & r) ? i.push(((1023 & t) << 10) + (1023 & r) + 65536) : (i.push(t),
                                                    n--)) : i.push(t);
                                                return i
                                            }
                                            function o(e) {
                                                for (var t, r = e.length, i = -1, n = ""; ++i < r; )
                                                    t = e[i],
                                                    t > 65535 && (t -= 65536,
                                                    n += v(t >>> 10 & 1023 | 55296),
                                                    t = 56320 | 1023 & t),
                                                    n += v(t);
                                                return n
                                            }
                                            function c(e, t) {
                                                return v(e >> t & 63 | 128)
                                            }
                                            function l(e) {
                                                if (0 == (4294967168 & e))
                                                    return v(e);
                                                var t = "";
                                                return 0 == (4294965248 & e) ? t = v(e >> 6 & 31 | 192) : 0 == (4294901760 & e) ? (t = v(e >> 12 & 15 | 224),
                                                t += c(e, 6)) : 0 == (4292870144 & e) && (t = v(e >> 18 & 7 | 240),
                                                t += c(e, 12),
                                                t += c(e, 6)),
                                                t += v(63 & e | 128)
                                            }
                                            function _(e) {
                                                for (var t, r = a(e), i = r.length, n = -1, s = ""; ++n < i; )
                                                    t = r[n],
                                                    s += l(t);
                                                return s
                                            }
                                            function p() {
                                                if (y >= m)
                                                    throw Error("Invalid byte index");
                                                var e = 255 & g[y];
                                                if (y++,
                                                128 == (192 & e))
                                                    return 63 & e;
                                                throw Error("Invalid continuation byte")
                                            }
                                            function h() {
                                                var e, t, r, i, n;
                                                if (y > m)
                                                    throw Error("Invalid byte index");
                                                if (y == m)
                                                    return !1;
                                                if (e = 255 & g[y],
                                                y++,
                                                0 == (128 & e))
                                                    return e;
                                                if (192 == (224 & e)) {
                                                    var t = p();
                                                    if (n = (31 & e) << 6 | t,
                                                    n >= 128)
                                                        return n;
                                                    throw Error("Invalid continuation byte")
                                                }
                                                if (224 == (240 & e)) {
                                                    if (t = p(),
                                                    r = p(),
                                                    n = (15 & e) << 12 | t << 6 | r,
                                                    n >= 2048)
                                                        return n;
                                                    throw Error("Invalid continuation byte")
                                                }
                                                if (240 == (248 & e) && (t = p(),
                                                r = p(),
                                                i = p(),
                                                n = (15 & e) << 18 | t << 12 | r << 6 | i,
                                                n >= 65536 && n <= 1114111))
                                                    return n;
                                                throw Error("Invalid WTF-8 detected")
                                            }
                                            function u(e) {
                                                g = a(e),
                                                m = g.length,
                                                y = 0;
                                                for (var t, r = []; (t = h()) !== !1; )
                                                    r.push(t);
                                                return o(r)
                                            }
                                            var d = "object" == typeof t && t
                                              , f = ("object" == typeof e && e && e.exports == d && e,
                                            "object" == typeof n && n);
                                            f.global !== f && f.window !== f || (s = f);
                                            var g, m, y, v = String.fromCharCode, b = {
                                                version: "1.0.0",
                                                encode: _,
                                                decode: u
                                            };
                                            i = function() {
                                                return b
                                            }
                                            .call(t, r, t, e),
                                            !(void 0 !== i && (e.exports = i))
                                        })(this)
                                    }
                                    ).call(t, r(12)(e), function() {
                                        return this
                                    }())
                                }
                                , function(e, t) {
                                    (function() {
                                        for (var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", r = new Uint8Array(256), i = 0; i < e.length; i++)
                                            r[e.charCodeAt(i)] = i;
                                        t.encode = function(t) {
                                            var r, i = new Uint8Array(t), n = i.length, s = "";
                                            for (r = 0; r < n; r += 3)
                                                s += e[i[r] >> 2],
                                                s += e[(3 & i[r]) << 4 | i[r + 1] >> 4],
                                                s += e[(15 & i[r + 1]) << 2 | i[r + 2] >> 6],
                                                s += e[63 & i[r + 2]];
                                            return n % 3 === 2 ? s = s.substring(0, s.length - 1) + "=" : n % 3 === 1 && (s = s.substring(0, s.length - 2) + "=="),
                                            s
                                        }
                                        ,
                                        t.decode = function(e) {
                                            var t, i, n, s, a, o = .75 * e.length, c = e.length, l = 0;
                                            "=" === e[e.length - 1] && (o--,
                                            "=" === e[e.length - 2] && o--);
                                            var _ = new ArrayBuffer(o)
                                              , p = new Uint8Array(_);
                                            for (t = 0; t < c; t += 4)
                                                i = r[e.charCodeAt(t)],
                                                n = r[e.charCodeAt(t + 1)],
                                                s = r[e.charCodeAt(t + 2)],
                                                a = r[e.charCodeAt(t + 3)],
                                                p[l++] = i << 2 | n >> 4,
                                                p[l++] = (15 & n) << 4 | s >> 2,
                                                p[l++] = (3 & s) << 6 | 63 & a;
                                            return _
                                        }
                                    })()
                                }
                                , function(e, t) {
                                    (function(t) {
                                        function r(e) {
                                            for (var t = 0; t < e.length; t++) {
                                                var r = e[t];
                                                if (r.buffer instanceof ArrayBuffer) {
                                                    var i = r.buffer;
                                                    if (r.byteLength !== i.byteLength) {
                                                        var n = new Uint8Array(r.byteLength);
                                                        n.set(new Uint8Array(i,r.byteOffset,r.byteLength)),
                                                        i = n.buffer
                                                    }
                                                    e[t] = i
                                                }
                                            }
                                        }
                                        function i(e, t) {
                                            t = t || {};
                                            var i = new s;
                                            r(e);
                                            for (var n = 0; n < e.length; n++)
                                                i.append(e[n]);
                                            return t.type ? i.getBlob(t.type) : i.getBlob()
                                        }
                                        function n(e, t) {
                                            return r(e),
                                            new Blob(e,t || {})
                                        }
                                        var s = t.BlobBuilder || t.WebKitBlobBuilder || t.MSBlobBuilder || t.MozBlobBuilder
                                          , a = function() {
                                            try {
                                                var e = new Blob(["hi"]);
                                                return 2 === e.size
                                            } catch (e) {
                                                return !1
                                            }
                                        }()
                                          , o = a && function() {
                                            try {
                                                var e = new Blob([new Uint8Array([1, 2])]);
                                                return 2 === e.size
                                            } catch (e) {
                                                return !1
                                            }
                                        }()
                                          , c = s && s.prototype.append && s.prototype.getBlob;
                                        e.exports = function() {
                                            return a ? o ? t.Blob : n : c ? i : void 0
                                        }()
                                    }
                                    ).call(t, function() {
                                        return this
                                    }())
                                }
                                , function(e, t, r) {
                                    function i(e) {
                                        if (e)
                                            return n(e)
                                    }
                                    function n(e) {
                                        for (var t in i.prototype)
                                            e[t] = i.prototype[t];
                                        return e
                                    }
                                    e.exports = i,
                                    i.prototype.on = i.prototype.addEventListener = function(e, t) {
                                        return this._callbacks = this._callbacks || {},
                                        (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t),
                                        this
                                    }
                                    ,
                                    i.prototype.once = function(e, t) {
                                        function r() {
                                            this.off(e, r),
                                            t.apply(this, arguments)
                                        }
                                        return r.fn = t,
                                        this.on(e, r),
                                        this
                                    }
                                    ,
                                    i.prototype.off = i.prototype.removeListener = i.prototype.removeAllListeners = i.prototype.removeEventListener = function(e, t) {
                                        if (this._callbacks = this._callbacks || {},
                                        0 == arguments.length)
                                            return this._callbacks = {},
                                            this;
                                        var r = this._callbacks["$" + e];
                                        if (!r)
                                            return this;
                                        if (1 == arguments.length)
                                            return delete this._callbacks["$" + e],
                                            this;
                                        for (var i, n = 0; n < r.length; n++)
                                            if (i = r[n],
                                            i === t || i.fn === t) {
                                                r.splice(n, 1);
                                                break
                                            }
                                        return this
                                    }
                                    ,
                                    i.prototype.emit = function(e) {
                                        this._callbacks = this._callbacks || {};
                                        var t = [].slice.call(arguments, 1)
                                          , r = this._callbacks["$" + e];
                                        if (r) {
                                            r = r.slice(0);
                                            for (var i = 0, n = r.length; i < n; ++i)
                                                r[i].apply(this, t)
                                        }
                                        return this
                                    }
                                    ,
                                    i.prototype.listeners = function(e) {
                                        return this._callbacks = this._callbacks || {},
                                        this._callbacks["$" + e] || []
                                    }
                                    ,
                                    i.prototype.hasListeners = function(e) {
                                        return !!this.listeners(e).length
                                    }
                                }
                                , function(e, t) {
                                    t.encode = function(e) {
                                        var t = "";
                                        for (var r in e)
                                            e.hasOwnProperty(r) && (t.length && (t += "&"),
                                            t += encodeURIComponent(r) + "=" + encodeURIComponent(e[r]));
                                        return t
                                    }
                                    ,
                                    t.decode = function(e) {
                                        for (var t = {}, r = e.split("&"), i = 0, n = r.length; i < n; i++) {
                                            var s = r[i].split("=");
                                            t[decodeURIComponent(s[0])] = decodeURIComponent(s[1])
                                        }
                                        return t
                                    }
                                }
                                , function(e, t) {
                                    e.exports = function(e, t) {
                                        var r = function() {};
                                        r.prototype = t.prototype,
                                        e.prototype = new r,
                                        e.prototype.constructor = e
                                    }
                                }
                                , function(e, t) {
                                    "use strict";
                                    function r(e) {
                                        var t = "";
                                        do
                                            t = a[e % o] + t,
                                            e = Math.floor(e / o);
                                        while (e > 0);return t
                                    }
                                    function i(e) {
                                        var t = 0;
                                        for (_ = 0; _ < e.length; _++)
                                            t = t * o + c[e.charAt(_)];
                                        return t
                                    }
                                    function n() {
                                        var e = r(+new Date);
                                        return e !== s ? (l = 0,
                                        s = e) : e + "." + r(l++)
                                    }
                                    for (var s, a = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), o = 64, c = {}, l = 0, _ = 0; _ < o; _++)
                                        c[a[_]] = _;
                                    n.encode = r,
                                    n.decode = i,
                                    e.exports = n
                                }
                                , function(e, t, r) {
                                    (function(t) {
                                        function i() {}
                                        function n(e) {
                                            s.call(this, e),
                                            this.query = this.query || {},
                                            o || (t.___eio || (t.___eio = []),
                                            o = t.___eio),
                                            this.index = o.length;
                                            var r = this;
                                            o.push(function(e) {
                                                r.onData(e)
                                            }),
                                            this.query.j = this.index,
                                            t.document && t.addEventListener && t.addEventListener("beforeunload", function() {
                                                r.script && (r.script.onerror = i)
                                            }, !1)
                                        }
                                        var s = r(25)
                                          , a = r(38);
                                        e.exports = n;
                                        var o, c = /\n/g, l = /\\n/g;
                                        a(n, s),
                                        n.prototype.supportsBinary = !1,
                                        n.prototype.doClose = function() {
                                            this.script && (this.script.parentNode.removeChild(this.script),
                                            this.script = null),
                                            this.form && (this.form.parentNode.removeChild(this.form),
                                            this.form = null,
                                            this.iframe = null),
                                            s.prototype.doClose.call(this)
                                        }
                                        ,
                                        n.prototype.doPoll = function() {
                                            var e = this
                                              , t = document.createElement("script");
                                            this.script && (this.script.parentNode.removeChild(this.script),
                                            this.script = null),
                                            t.async = !0,
                                            t.src = this.uri(),
                                            t.onerror = function(t) {
                                                e.onError("jsonp poll error", t)
                                            }
                                            ;
                                            var r = document.getElementsByTagName("script")[0];
                                            r ? r.parentNode.insertBefore(t, r) : (document.head || document.body).appendChild(t),
                                            this.script = t;
                                            var i = "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent);
                                            i && setTimeout(function() {
                                                var e = document.createElement("iframe");
                                                document.body.appendChild(e),
                                                document.body.removeChild(e)
                                            }, 100)
                                        }
                                        ,
                                        n.prototype.doWrite = function(e, t) {
                                            function r() {
                                                i(),
                                                t()
                                            }
                                            function i() {
                                                if (n.iframe)
                                                    try {
                                                        n.form.removeChild(n.iframe)
                                                    } catch (e) {
                                                        n.onError("jsonp polling iframe removal error", e)
                                                    }
                                                try {
                                                    var e = '<iframe src="javascript:0" name="' + n.iframeId + '">';
                                                    s = document.createElement(e)
                                                } catch (e) {
                                                    s = document.createElement("iframe"),
                                                    s.name = n.iframeId,
                                                    s.src = "javascript:0"
                                                }
                                                s.id = n.iframeId,
                                                n.form.appendChild(s),
                                                n.iframe = s
                                            }
                                            var n = this;
                                            if (!this.form) {
                                                var s, a = document.createElement("form"), o = document.createElement("textarea"), _ = this.iframeId = "eio_iframe_" + this.index;
                                                a.className = "socketio",
                                                a.style.position = "absolute",
                                                a.style.top = "-1000px",
                                                a.style.left = "-1000px",
                                                a.target = _,
                                                a.method = "POST",
                                                a.setAttribute("accept-charset", "utf-8"),
                                                o.name = "d",
                                                a.appendChild(o),
                                                document.body.appendChild(a),
                                                this.form = a,
                                                this.area = o
                                            }
                                            this.form.action = this.uri(),
                                            i(),
                                            e = e.replace(l, "\\\n"),
                                            this.area.value = e.replace(c, "\\n");
                                            try {
                                                this.form.submit()
                                            } catch (e) {}
                                            this.iframe.attachEvent ? this.iframe.onreadystatechange = function() {
                                                "complete" === n.iframe.readyState && r()
                                            }
                                            : this.iframe.onload = r
                                        }
                                    }
                                    ).call(t, function() {
                                        return this
                                    }())
                                }
                                , function(e, t, r) {
                                    (function(t) {
                                        function i(e) {
                                            var t = e && e.forceBase64;
                                            t && (this.supportsBinary = !1),
                                            this.perMessageDeflate = e.perMessageDeflate,
                                            this.usingBrowserWebSocket = p && !e.forceNode,
                                            this.usingBrowserWebSocket || (h = n),
                                            s.call(this, e)
                                        }
                                        var n, s = r(26), a = r(27), o = r(37), c = r(38), l = r(39), _ = r(3)("engine.io-client:websocket"), p = t.WebSocket || t.MozWebSocket;
                                        if ("undefined" == typeof window)
                                            try {
                                                n = r(42)
                                            } catch (e) {}
                                        var h = p;
                                        h || "undefined" != typeof window || (h = n),
                                        e.exports = i,
                                        c(i, s),
                                        i.prototype.name = "websocket",
                                        i.prototype.supportsBinary = !0,
                                        i.prototype.doOpen = function() {
                                            if (this.check()) {
                                                var e = this.uri()
                                                  , t = void 0
                                                  , r = {
                                                    agent: this.agent,
                                                    perMessageDeflate: this.perMessageDeflate
                                                };
                                                r.pfx = this.pfx,
                                                r.key = this.key,
                                                r.passphrase = this.passphrase,
                                                r.cert = this.cert,
                                                r.ca = this.ca,
                                                r.ciphers = this.ciphers,
                                                r.rejectUnauthorized = this.rejectUnauthorized,
                                                this.extraHeaders && (r.headers = this.extraHeaders),
                                                this.localAddress && (r.localAddress = this.localAddress);
                                                try {
                                                    this.ws = this.usingBrowserWebSocket ? new h(e) : new h(e,t,r)
                                                } catch (e) {
                                                    return this.emit("error", e)
                                                }
                                                void 0 === this.ws.binaryType && (this.supportsBinary = !1),
                                                this.ws.supports && this.ws.supports.binary ? (this.supportsBinary = !0,
                                                this.ws.binaryType = "nodebuffer") : this.ws.binaryType = "arraybuffer",
                                                this.addEventListeners()
                                            }
                                        }
                                        ,
                                        i.prototype.addEventListeners = function() {
                                            var e = this;
                                            this.ws.onopen = function() {
                                                e.onOpen()
                                            }
                                            ,
                                            this.ws.onclose = function() {
                                                e.onClose()
                                            }
                                            ,
                                            this.ws.onmessage = function(t) {
                                                e.onData(t.data)
                                            }
                                            ,
                                            this.ws.onerror = function(t) {
                                                e.onError("websocket error", t)
                                            }
                                        }
                                        ,
                                        i.prototype.write = function(e) {
                                            function r() {
                                                i.emit("flush"),
                                                setTimeout(function() {
                                                    i.writable = !0,
                                                    i.emit("drain")
                                                }, 0)
                                            }
                                            var i = this;
                                            this.writable = !1;
                                            for (var n = e.length, s = 0, o = n; s < o; s++)
                                                (function(e) {
                                                    a.encodePacket(e, i.supportsBinary, function(s) {
                                                        if (!i.usingBrowserWebSocket) {
                                                            var a = {};
                                                            if (e.options && (a.compress = e.options.compress),
                                                            i.perMessageDeflate) {
                                                                var o = "string" == typeof s ? t.Buffer.byteLength(s) : s.length;
                                                                o < i.perMessageDeflate.threshold && (a.compress = !1)
                                                            }
                                                        }
                                                        try {
                                                            i.usingBrowserWebSocket ? i.ws.send(s) : i.ws.send(s, a)
                                                        } catch (e) {
                                                            _("websocket closed before onclose event")
                                                        }
                                                        --n || r()
                                                    })
                                                })(e[s])
                                        }
                                        ,
                                        i.prototype.onClose = function() {
                                            s.prototype.onClose.call(this)
                                        }
                                        ,
                                        i.prototype.doClose = function() {
                                            "undefined" != typeof this.ws && this.ws.close()
                                        }
                                        ,
                                        i.prototype.uri = function() {
                                            var e = this.query || {}
                                              , t = this.secure ? "wss" : "ws"
                                              , r = "";
                                            this.port && ("wss" === t && 443 !== Number(this.port) || "ws" === t && 80 !== Number(this.port)) && (r = ":" + this.port),
                                            this.timestampRequests && (e[this.timestampParam] = l()),
                                            this.supportsBinary || (e.b64 = 1),
                                            e = o.encode(e),
                                            e.length && (e = "?" + e);
                                            var i = this.hostname.indexOf(":") !== -1;
                                            return t + "://" + (i ? "[" + this.hostname + "]" : this.hostname) + r + this.path + e
                                        }
                                        ,
                                        i.prototype.check = function() {
                                            return !(!h || "__initialize"in h && this.name === i.prototype.name)
                                        }
                                    }
                                    ).call(t, function() {
                                        return this
                                    }())
                                }
                                , function(e, t) {}
                                , function(e, t) {
                                    var r = [].indexOf;
                                    e.exports = function(e, t) {
                                        if (r)
                                            return e.indexOf(t);
                                        for (var i = 0; i < e.length; ++i)
                                            if (e[i] === t)
                                                return i;
                                        return -1
                                    }
                                }
                                , function(e, t) {
                                    (function(t) {
                                        var r = /^[\],:{}\s]*$/
                                          , i = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g
                                          , n = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g
                                          , s = /(?:^|:|,)(?:\s*\[)+/g
                                          , a = /^\s+/
                                          , o = /\s+$/;
                                        e.exports = function(e) {
                                            return "string" == typeof e && e ? (e = e.replace(a, "").replace(o, ""),
                                            t.JSON && JSON.parse ? JSON.parse(e) : r.test(e.replace(i, "@").replace(n, "]").replace(s, "")) ? new Function("return " + e)() : void 0) : null
                                        }
                                    }
                                    ).call(t, function() {
                                        return this
                                    }())
                                }
                                , function(e, t, r) {
                                    "use strict";
                                    function i(e, t, r) {
                                        this.io = e,
                                        this.nsp = t,
                                        this.json = this,
                                        this.ids = 0,
                                        this.acks = {},
                                        this.receiveBuffer = [],
                                        this.sendBuffer = [],
                                        this.connected = !1,
                                        this.disconnected = !0,
                                        r && r.query && (this.query = r.query),
                                        this.io.autoConnect && this.open()
                                    }
                                    var n = r(7)
                                      , s = r(36)
                                      , a = r(46)
                                      , o = r(47)
                                      , c = r(48)
                                      , l = r(3)("socket.io-client:socket")
                                      , _ = r(49);
                                    e.exports = t = i;
                                    var p = {
                                        connect: 1,
                                        connect_error: 1,
                                        connect_timeout: 1,
                                        connecting: 1,
                                        disconnect: 1,
                                        error: 1,
                                        reconnect: 1,
                                        reconnect_attempt: 1,
                                        reconnect_failed: 1,
                                        reconnect_error: 1,
                                        reconnecting: 1,
                                        ping: 1,
                                        pong: 1
                                    }
                                      , h = s.prototype.emit;
                                    s(i.prototype),
                                    i.prototype.subEvents = function() {
                                        if (!this.subs) {
                                            var e = this.io;
                                            this.subs = [o(e, "open", c(this, "onopen")), o(e, "packet", c(this, "onpacket")), o(e, "close", c(this, "onclose"))]
                                        }
                                    }
                                    ,
                                    i.prototype.open = i.prototype.connect = function() {
                                        return this.connected ? this : (this.subEvents(),
                                        this.io.open(),
                                        "open" === this.io.readyState && this.onopen(),
                                        this.emit("connecting"),
                                        this)
                                    }
                                    ,
                                    i.prototype.send = function() {
                                        var e = a(arguments);
                                        return e.unshift("message"),
                                        this.emit.apply(this, e),
                                        this
                                    }
                                    ,
                                    i.prototype.emit = function(e) {
                                        if (p.hasOwnProperty(e))
                                            return h.apply(this, arguments),
                                            this;
                                        var t = a(arguments)
                                          , r = n.EVENT;
                                        _(t) && (r = n.BINARY_EVENT);
                                        var i = {
                                            type: r,
                                            data: t
                                        };
                                        return i.options = {},
                                        i.options.compress = !this.flags || !1 !== this.flags.compress,
                                        "function" == typeof t[t.length - 1] && (l("emitting packet with ack id %d", this.ids),
                                        this.acks[this.ids] = t.pop(),
                                        i.id = this.ids++),
                                        this.connected ? this.packet(i) : this.sendBuffer.push(i),
                                        delete this.flags,
                                        this
                                    }
                                    ,
                                    i.prototype.packet = function(e) {
                                        e.nsp = this.nsp,
                                        this.io.packet(e)
                                    }
                                    ,
                                    i.prototype.onopen = function() {
                                        l("transport is open - connecting"),
                                        "/" !== this.nsp && (this.query ? this.packet({
                                            type: n.CONNECT,
                                            query: this.query
                                        }) : this.packet({
                                            type: n.CONNECT
                                        }))
                                    }
                                    ,
                                    i.prototype.onclose = function(e) {
                                        l("close (%s)", e),
                                        this.connected = !1,
                                        this.disconnected = !0,
                                        delete this.id,
                                        this.emit("disconnect", e)
                                    }
                                    ,
                                    i.prototype.onpacket = function(e) {
                                        if (e.nsp === this.nsp)
                                            switch (e.type) {
                                            case n.CONNECT:
                                                this.onconnect();
                                                break;
                                            case n.EVENT:
                                                this.onevent(e);
                                                break;
                                            case n.BINARY_EVENT:
                                                this.onevent(e);
                                                break;
                                            case n.ACK:
                                                this.onack(e);
                                                break;
                                            case n.BINARY_ACK:
                                                this.onack(e);
                                                break;
                                            case n.DISCONNECT:
                                                this.ondisconnect();
                                                break;
                                            case n.ERROR:
                                                this.emit("error", e.data)
                                            }
                                    }
                                    ,
                                    i.prototype.onevent = function(e) {
                                        var t = e.data || [];
                                        l("emitting event %j", t),
                                        null != e.id && (l("attaching ack callback to event"),
                                        t.push(this.ack(e.id))),
                                        this.connected ? h.apply(this, t) : this.receiveBuffer.push(t)
                                    }
                                    ,
                                    i.prototype.ack = function(e) {
                                        var t = this
                                          , r = !1;
                                        return function() {
                                            if (!r) {
                                                r = !0;
                                                var i = a(arguments);
                                                l("sending ack %j", i);
                                                var s = _(i) ? n.BINARY_ACK : n.ACK;
                                                t.packet({
                                                    type: s,
                                                    id: e,
                                                    data: i
                                                })
                                            }
                                        }
                                    }
                                    ,
                                    i.prototype.onack = function(e) {
                                        var t = this.acks[e.id];
                                        "function" == typeof t ? (l("calling ack %s with %j", e.id, e.data),
                                        t.apply(this, e.data),
                                        delete this.acks[e.id]) : l("bad ack %s", e.id)
                                    }
                                    ,
                                    i.prototype.onconnect = function() {
                                        this.connected = !0,
                                        this.disconnected = !1,
                                        this.emit("connect"),
                                        this.emitBuffered()
                                    }
                                    ,
                                    i.prototype.emitBuffered = function() {
                                        var e;
                                        for (e = 0; e < this.receiveBuffer.length; e++)
                                            h.apply(this, this.receiveBuffer[e]);
                                        for (this.receiveBuffer = [],
                                        e = 0; e < this.sendBuffer.length; e++)
                                            this.packet(this.sendBuffer[e]);
                                        this.sendBuffer = []
                                    }
                                    ,
                                    i.prototype.ondisconnect = function() {
                                        l("server disconnect (%s)", this.nsp),
                                        this.destroy(),
                                        this.onclose("io server disconnect")
                                    }
                                    ,
                                    i.prototype.destroy = function() {
                                        if (this.subs) {
                                            for (var e = 0; e < this.subs.length; e++)
                                                this.subs[e].destroy();
                                            this.subs = null
                                        }
                                        this.io.destroy(this)
                                    }
                                    ,
                                    i.prototype.close = i.prototype.disconnect = function() {
                                        return this.connected && (l("performing disconnect (%s)", this.nsp),
                                        this.packet({
                                            type: n.DISCONNECT
                                        })),
                                        this.destroy(),
                                        this.connected && this.onclose("io client disconnect"),
                                        this
                                    }
                                    ,
                                    i.prototype.compress = function(e) {
                                        return this.flags = this.flags || {},
                                        this.flags.compress = e,
                                        this
                                    }
                                }
                                , function(e, t) {
                                    function r(e, t) {
                                        var r = [];
                                        t = t || 0;
                                        for (var i = t || 0; i < e.length; i++)
                                            r[i - t] = e[i];
                                        return r
                                    }
                                    e.exports = r
                                }
                                , function(e, t) {
                                    function r(e, t, r) {
                                        return e.on(t, r),
                                        {
                                            destroy: function() {
                                                e.removeListener(t, r)
                                            }
                                        }
                                    }
                                    e.exports = r
                                }
                                , function(e, t) {
                                    var r = [].slice;
                                    e.exports = function(e, t) {
                                        if ("string" == typeof t && (t = e[t]),
                                        "function" != typeof t)
                                            throw new Error("bind() requires a function");
                                        var i = r.call(arguments, 2);
                                        return function() {
                                            return t.apply(e, i.concat(r.call(arguments)))
                                        }
                                    }
                                }
                                , function(e, t, r) {
                                    (function(t) {
                                        function i(e) {
                                            function r(e) {
                                                if (!e)
                                                    return !1;
                                                if (t.Buffer && t.Buffer.isBuffer && t.Buffer.isBuffer(e) || t.ArrayBuffer && e instanceof ArrayBuffer || t.Blob && e instanceof Blob || t.File && e instanceof File)
                                                    return !0;
                                                if (n(e)) {
                                                    for (var i = 0; i < e.length; i++)
                                                        if (r(e[i]))
                                                            return !0
                                                } else if (e && "object" == typeof e) {
                                                    e.toJSON && "function" == typeof e.toJSON && (e = e.toJSON());
                                                    for (var s in e)
                                                        if (Object.prototype.hasOwnProperty.call(e, s) && r(e[s]))
                                                            return !0
                                                }
                                                return !1
                                            }
                                            return r(e)
                                        }
                                        var n = r(50);
                                        e.exports = i
                                    }
                                    ).call(t, function() {
                                        return this
                                    }())
                                }
                                , function(e, t) {
                                    e.exports = Array.isArray || function(e) {
                                        return "[object Array]" == Object.prototype.toString.call(e)
                                    }
                                }
                                , function(e, t) {
                                    function r(e) {
                                        e = e || {},
                                        this.ms = e.min || 100,
                                        this.max = e.max || 1e4,
                                        this.factor = e.factor || 2,
                                        this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0,
                                        this.attempts = 0
                                    }
                                    e.exports = r,
                                    r.prototype.duration = function() {
                                        var e = this.ms * Math.pow(this.factor, this.attempts++);
                                        if (this.jitter) {
                                            var t = Math.random()
                                              , r = Math.floor(t * this.jitter * e);
                                            e = 0 == (1 & Math.floor(10 * t)) ? e - r : e + r
                                        }
                                        return 0 | Math.min(e, this.max)
                                    }
                                    ,
                                    r.prototype.reset = function() {
                                        this.attempts = 0
                                    }
                                    ,
                                    r.prototype.setMin = function(e) {
                                        this.ms = e
                                    }
                                    ,
                                    r.prototype.setMax = function(e) {
                                        this.max = e
                                    }
                                    ,
                                    r.prototype.setJitter = function(e) {
                                        this.jitter = e
                                    }
                                }
                                ])
                            }),
                            function(e, t) {
                                "use strict";
                                if ("function" == typeof __crisp_void_define && define.amd)
                                    define(["exports"], t);
                                else if ("object" == typeof exports)
                                    t(exports);
                                else {
                                    var r = {};
                                    e.PubSub = r,
                                    t(r)
                                }
                            }("object" == typeof t && t || this, function(e) {
                                "use strict";
                                function t(e) {
                                    var t;
                                    for (t in e)
                                        if (e.hasOwnProperty(t))
                                            return !0;
                                    return !1
                                }
                                function r(e) {
                                    return function() {
                                        throw e
                                    }
                                }
                                function i(e, t, i) {
                                    try {
                                        e(t, i)
                                    } catch (e) {
                                        setTimeout(r(e), 0)
                                    }
                                }
                                function n(e, t, r) {
                                    e(t, r)
                                }
                                function s(e, t, r, s) {
                                    var a, o = l[t], c = s ? n : i;
                                    if (l.hasOwnProperty(t))
                                        for (a in o)
                                            o.hasOwnProperty(a) && c(o[a], e, r)
                                }
                                function a(e, t, r) {
                                    return function() {
                                        var i = String(e)
                                          , n = i.lastIndexOf(".");
                                        for (s(e, e, t, r); n !== -1; )
                                            i = i.substr(0, n),
                                            n = i.lastIndexOf("."),
                                            s(e, i, t, r)
                                    }
                                }
                                function o(e) {
                                    for (var r = String(e), i = Boolean(l.hasOwnProperty(r) && t(l[r])), n = r.lastIndexOf("."); !i && n !== -1; )
                                        r = r.substr(0, n),
                                        n = r.lastIndexOf("."),
                                        i = Boolean(l.hasOwnProperty(r) && t(l[r]));
                                    return i
                                }
                                function c(e, t, r, i) {
                                    var n = a(e, t, i)
                                      , s = o(e);
                                    return !!s && (r === !0 ? n() : setTimeout(n, 0),
                                    !0)
                                }
                                var l = {}
                                  , _ = -1;
                                e.publish = function(t, r) {
                                    return c(t, r, !1, e.immediateExceptions)
                                }
                                ,
                                e.publishSync = function(t, r) {
                                    return c(t, r, !0, e.immediateExceptions)
                                }
                                ,
                                e.subscribe = function(e, t) {
                                    if ("function" != typeof t)
                                        return !1;
                                    l.hasOwnProperty(e) || (l[e] = {});
                                    var r = "uid_" + String(++_);
                                    return l[e][r] = t,
                                    r
                                }
                                ,
                                e.clearAllSubscriptions = function() {
                                    l = {}
                                }
                                ,
                                e.clearSubscriptions = function(e) {
                                    var t;
                                    for (t in l)
                                        l.hasOwnProperty(t) && 0 === t.indexOf(e) && delete l[t]
                                }
                                ,
                                e.unsubscribe = function(e) {
                                    var t, r, i, n = "string" == typeof e && l.hasOwnProperty(e), s = !n && "string" == typeof e, a = "function" == typeof e, o = !1;
                                    if (n)
                                        return void delete l[e];
                                    for (t in l)
                                        if (l.hasOwnProperty(t)) {
                                            if (r = l[t],
                                            s && r[e]) {
                                                delete r[e],
                                                o = e;
                                                break
                                            }
                                            if (a)
                                                for (i in r)
                                                    r.hasOwnProperty(i) && r[i] === e && (delete r[i],
                                                    o = !0)
                                        }
                                    return o
                                }
                            }),
                            function(e, t) {
                                "use strict";
                                var r = function(e) {
                                    if ("object" != typeof e.document)
                                        throw new Error("Cookies.js requires a `window` with a `document` object");
                                    var r = function(e, t, i) {
                                        return 1 === arguments.length ? r.get(e) : r.set(e, t, i)
                                    };
                                    return r._document = e.document,
                                    r._cacheKeyPrefix = "cookey.",
                                    r._maxExpireDate = new Date("Fri, 31 Dec 9999 23:59:59 UTC"),
                                    r.defaults = {
                                        path: "/",
                                        secure: !1
                                    },
                                    r.get = function(e) {
                                        r._cachedDocumentCookie !== r._document.cookie && r._renewCache();
                                        var i = r._cache[r._cacheKeyPrefix + e];
                                        return i === t ? t : decodeURIComponent(i)
                                    }
                                    ,
                                    r.set = function(e, i, n) {
                                        return n = r._getExtendedOptions(n),
                                        n.expires = r._getExpiresDate(i === t ? -1 : n.expires),
                                        r._document.cookie = r._generateCookieString(e, i, n),
                                        r
                                    }
                                    ,
                                    r.expire = function(e, i) {
                                        return r.set(e, t, i)
                                    }
                                    ,
                                    r._getExtendedOptions = function(e) {
                                        return {
                                            path: e && e.path || r.defaults.path,
                                            domain: e && e.domain || r.defaults.domain,
                                            expires: e && e.expires || r.defaults.expires,
                                            secure: e && e.secure !== t ? e.secure : r.defaults.secure
                                        }
                                    }
                                    ,
                                    r._isValidDate = function(e) {
                                        return "[object Date]" === Object.prototype.toString.call(e) && !isNaN(e.getTime())
                                    }
                                    ,
                                    r._getExpiresDate = function(e, t) {
                                        if (t = t || new Date,
                                        "number" == typeof e ? e = e === 1 / 0 ? r._maxExpireDate : new Date(t.getTime() + 1e3 * e) : "string" == typeof e && (e = new Date(e)),
                                        e && !r._isValidDate(e))
                                            throw new Error("`expires` parameter cannot be converted to a valid Date instance");
                                        return e
                                    }
                                    ,
                                    r._generateCookieString = function(e, t, r) {
                                        e = e.replace(/[^#$&+\^`|]/g, encodeURIComponent),
                                        e = e.replace(/\(/g, "%28").replace(/\)/g, "%29"),
                                        t = (t + "").replace(/[^!#$&-+\--:<-\[\]-~]/g, encodeURIComponent),
                                        r = r || {};
                                        var i = e + "=" + t;
                                        return i += r.path ? ";path=" + r.path : "",
                                        i += r.domain ? ";domain=" + r.domain : "",
                                        i += r.expires ? ";expires=" + r.expires.toUTCString() : "",
                                        i += r.secure ? ";secure" : ""
                                    }
                                    ,
                                    r._getCacheFromString = function(e) {
                                        for (var i = {}, n = e ? e.split("; ") : [], s = 0; s < n.length; s++) {
                                            var a = r._getKeyValuePairFromCookieString(n[s]);
                                            i[r._cacheKeyPrefix + a.key] === t && (i[r._cacheKeyPrefix + a.key] = a.value)
                                        }
                                        return i
                                    }
                                    ,
                                    r._getKeyValuePairFromCookieString = function(e) {
                                        var t = e.indexOf("=");
                                        t = t < 0 ? e.length : t;
                                        var r, i = e.substr(0, t);
                                        try {
                                            r = decodeURIComponent(i)
                                        } catch (e) {
                                            console && "function" == typeof console.error && console.error('Could not decode cookie with key "' + i + '"', e)
                                        }
                                        return {
                                            key: r,
                                            value: e.substr(t + 1)
                                        }
                                    }
                                    ,
                                    r._renewCache = function() {
                                        r._cache = r._getCacheFromString(r._document.cookie),
                                        r._cachedDocumentCookie = r._document.cookie
                                    }
                                    ,
                                    r._areEnabled = function() {
                                        var e = "cookies.js"
                                          , t = "1" === r.set(e, 1).get(e);
                                        return r.expire(e),
                                        t
                                    }
                                    ,
                                    r.enabled = r._areEnabled(),
                                    r
                                }
                                  , i = "object" == typeof e.document ? r(e) : r;
                                "function" == typeof __crisp_void_define && define.amd ? define(function() {
                                    return i
                                }) : "object" == typeof exports ? ("object" == typeof module && "object" == typeof module.exports && (exports = module.exports = i),
                                exports.Cookies = i) : e.Cookies = i
                            }(t),
                            this.__configure(e),
                            this.__transports(e, t),
                            this.Browsing = new l(this),
                            this.Message = new r(this),
                            this.Session = new i(this),
                            this.Storage = new s(this),
                            this.Website = new a(this),
                            this.Bucket = new o(this),
                            this.Media = new c(this),
                            this.Issue = new _(this)
                        }
                        ,
                        e.prototype.__configure = function(e) {
                            e && e.environment && (this.environment = e.environment || "development"),
                            e && e.disable_autoload && (this.disable_autoload = e.disable_autoload),
                            e && e.url_go && (this.url_go = e.url_go),
                            e && e.website_domain && (this.website_domain = e.website_domain),
                            e && e.website_id && (this.website_id = e.website_id),
                            e && e.token_id && (this.token_id = e.token_id),
                            this.device = {},
                            e && e.useragent && (this.device.useragent = e.useragent),
                            e && e.timezone && (this.device.timezone = e.timezone),
                            e && e.locales && (this.device.locales = e.locales),
                            e && e.page_url && (this.device.page_url = e.page_url),
                            e && e.page_title && (this.device.page_title = e.page_title),
                            e && e.page_referrer && (this.device.page_referrer = e.page_referrer)
                        }
                        ,
                        e.prototype.__transports = function(e, t) {
                            var r = this
                              , i = ["polling"];
                            "production" === this.environment && (i = ["websocket"]),
                            this.event = t.PubSub,
                            this.socket = t.io(e.url_relay, {
                                path: "/",
                                transports: i,
                                reconnectionDelay: 1e4,
                                reconnectionDelayMax: 3e4
                            }),
                            window.addEventListener("unload", function() {
                                r.socket.connected === !0 && r.socket.disconnect()
                            }),
                            this.cookie = t.Cookies(window)
                        }
                        ,
                        e
                    }());
                    var s = {};
                    s.client = function(e) {
                        var t, r = [], n = e || {};
                        return function(e, n, s, a, o, c, l, _, p, h, u, d) {
                            r.push('<div class="crisp-client"><div class="crisp-0"><style type="text/css">.crisp-client .crisp-1 .crisp-2,\n.crisp-client .crisp-1 .crisp-3:hover,\n.crisp-client .crisp-1 .crisp-3:focus {\n  color: ' + i.Library.jade.runtime.escape(null == (t = a.reverse.hex) ? "" : t) + " !important;\n  -webkit-text-fill-color: " + i.Library.jade.runtime.escape(null == (t = a.reverse.hex) ? "" : t) + " !important;\n}\n\n.crisp-client .crisp-1 .crisp-4,\n.crisp-client .crisp-1 .crisp-5:hover,\n.crisp-client .crisp-1 .crisp-5:focus {\n  color: " + i.Library.jade.runtime.escape(null == (t = a[900].hex) ? "" : t) + " !important;\n  -webkit-text-fill-color: " + i.Library.jade.runtime.escape(null == (t = a[900].hex) ? "" : t) + " !important;\n}\n\n.crisp-client .crisp-1 .crisp-6,\n.crisp-client .crisp-1 .crisp-7:hover,\n.crisp-client .crisp-1 .crisp-7:focus {\n  color: " + i.Library.jade.runtime.escape(null == (t = a[500].hex) ? "" : t) + " !important;\n  -webkit-text-fill-color: " + i.Library.jade.runtime.escape(null == (t = a[500].hex) ? "" : t) + " !important;\n}\n\n.crisp-client .crisp-1 .crisp-8,\n.crisp-client .crisp-1 .crisp-9:hover,\n.crisp-client .crisp-1 .crisp-9:focus {\n  color: " + i.Library.jade.runtime.escape(null == (t = a[300].hex) ? "" : t) + " !important;\n  -webkit-text-fill-color: " + i.Library.jade.runtime.escape(null == (t = a[300].hex) ? "" : t) + " !important;\n}\n\n.crisp-client .crisp-1 .crisp-10 {\n  background-color: " + i.Library.jade.runtime.escape(null == (t = a.reverse.hex) ? "" : t) + " !important;\n}\n\n.crisp-client .crisp-1 .crisp-11 {\n  background-color: " + i.Library.jade.runtime.escape(null == (t = a[500].hex) ? "" : t) + " !important;\n}\n\n.crisp-client .crisp-1 .crisp-12 {\n  background-color: " + i.Library.jade.runtime.escape(null == (t = a[10].hex) ? "" : t) + " !important;\n}\n\n.crisp-client .crisp-1 .crisp-13,\n.crisp-client .crisp-1 .crisp-14:hover,\n.crisp-client .crisp-1 .crisp-14:focus {\n  border-color: " + i.Library.jade.runtime.escape(null == (t = a.reverse.hex) ? "" : t) + " !important;\n}\n\n.crisp-client .crisp-1 .crisp-15,\n.crisp-client .crisp-1 .crisp-16:hover,\n.crisp-client .crisp-1 .crisp-16:focus {\n  border-color: " + i.Library.jade.runtime.escape(null == (t = a.reverse.hex) ? "" : t) + " !important;\n  border-color: " + i.Library.jade.runtime.escape(null == (t = a.reverse.rgba(.6)) ? "" : t) + " !important;\n}\n\n.crisp-client .crisp-1 .crisp-17,\n.crisp-client .crisp-1 .crisp-18:hover,\n.crisp-client .crisp-1 .crisp-18:focus {\n  border-color: " + i.Library.jade.runtime.escape(null == (t = a[800].hex) ? "" : t) + " !important;\n}\n\n.crisp-client .crisp-1 .crisp-19,\n.crisp-client .crisp-1 .crisp-20:hover,\n.crisp-client .crisp-1 .crisp-20:focus {\n  border-color: " + i.Library.jade.runtime.escape(null == (t = a[500].hex) ? "" : t) + " !important;\n}\n\n.crisp-client .crisp-1 .crisp-21:placeholder {\n  color: " + i.Library.jade.runtime.escape(null == (t = a[200].hex) ? "" : t) + " !important;\n  -webkit-text-fill-color: " + i.Library.jade.runtime.escape(null == (t = a[200].hex) ? "" : t) + " !important;\n}\n\n.crisp-client .crisp-1 .crisp-21:-moz-placeholder {\n  color: " + i.Library.jade.runtime.escape(null == (t = a[200].hex) ? "" : t) + " !important;\n  -webkit-text-fill-color: " + i.Library.jade.runtime.escape(null == (t = a[200].hex) ? "" : t) + " !important;\n}\n\n.crisp-client .crisp-1 .crisp-21::-moz-placeholder {\n  color: " + i.Library.jade.runtime.escape(null == (t = a[200].hex) ? "" : t) + " !important;\n  -webkit-text-fill-color: " + i.Library.jade.runtime.escape(null == (t = a[200].hex) ? "" : t) + " !important;\n}\n\n.crisp-client .crisp-1 .crisp-21:-ms-input-placeholder {\n  color: " + i.Library.jade.runtime.escape(null == (t = a[200].hex) ? "" : t) + " !important;\n  -webkit-text-fill-color: " + i.Library.jade.runtime.escape(null == (t = a[200].hex) ? "" : t) + " !important;\n}\n\n.crisp-client .crisp-1 .crisp-21::-webkit-input-placeholder {\n  color: " + i.Library.jade.runtime.escape(null == (t = a[200].hex) ? "" : t) + " !important;\n  -webkit-text-fill-color: " + i.Library.jade.runtime.escape(null == (t = a[200].hex) ? "" : t) + " !important;\n}\n\n.crisp-client .crisp-1 .crisp-22:placeholder {\n  color: " + i.Library.jade.runtime.escape(null == (t = a[200].hex) ? "" : t) + " !important;\n  -webkit-text-fill-color: " + i.Library.jade.runtime.escape(null == (t = a[200].hex) ? "" : t) + " !important;\n}\n\n.crisp-client .crisp-1 .crisp-22:-moz-placeholder {\n  color: " + i.Library.jade.runtime.escape(null == (t = a[200].hex) ? "" : t) + " !important;\n  -webkit-text-fill-color: " + i.Library.jade.runtime.escape(null == (t = a[200].hex) ? "" : t) + " !important;\n}\n\n.crisp-client .crisp-1 .crisp-22::-moz-placeholder {\n  color: " + i.Library.jade.runtime.escape(null == (t = a[200].hex) ? "" : t) + " !important;\n  -webkit-text-fill-color: " + i.Library.jade.runtime.escape(null == (t = a[200].hex) ? "" : t) + " !important;\n}\n\n.crisp-client .crisp-1 .crisp-22:-ms-input-placeholder {\n  color: " + i.Library.jade.runtime.escape(null == (t = a[200].hex) ? "" : t) + " !important;\n  -webkit-text-fill-color: " + i.Library.jade.runtime.escape(null == (t = a[200].hex) ? "" : t) + " !important;\n}\n\n.crisp-client .crisp-1 .crisp-22::-webkit-input-placeholder {\n  color: " + i.Library.jade.runtime.escape(null == (t = a[200].hex) ? "" : t) + " !important;\n  -webkit-text-fill-color: " + i.Library.jade.runtime.escape(null == (t = a[200].hex) ? "" : t) + " !important;\n}\n\n.crisp-client .crisp-1 .crisp-23 {\n  background: " + i.Library.jade.runtime.escape(null == (t = a[500].hex) ? "" : t) + " !important;\n}\n\n.crisp-client .crisp-1 .crisp-23:hover,\n.crisp-client .crisp-1 .crisp-23:focus {\n  background: " + i.Library.jade.runtime.escape(null == (t = a[700].hex) ? "" : t) + " !important;\n}\n\n.crisp-client .crisp-1 .crisp-23:active {\n  background: " + i.Library.jade.runtime.escape(null == (t = a[900].hex) ? "" : t) + " !important;\n}\n\n.crisp-client .crisp-1 .crisp-24::-moz-selection,\n.crisp-client .crisp-1 .crisp-24 *::-moz-selection {\n  background-color: " + i.Library.jade.runtime.escape(null == (t = a[100].hex) ? "" : t) + " !important;\n}\n\n.crisp-client .crisp-1 .crisp-24::selection,\n.crisp-client .crisp-1 .crisp-24 *::selection {\n  background-color: " + i.Library.jade.runtime.escape(null == (t = a[100].hex) ? "" : t) + " !important;\n}</style>"),
                            u.default_button_horizontal && r.push('<style type="text/css">.crisp-client .crisp-1[data-full-view="false"][data-position-reverse="false"] .crisp-25 .crisp-26,\n.crisp-client .crisp-1[data-full-view="false"][data-position-reverse="false"] .crisp-25 .crisp-27 {\n  margin-right: ' + i.Library.jade.runtime.escape(null == (t = u.default_button_horizontal) ? "" : t) + 'px !important;\n}\n\n.crisp-client .crisp-1[data-full-view="false"][data-position-reverse="false"] .crisp-25 .crisp-26 .crisp-28 .crisp-29 {\n  margin-right: ' + i.Library.jade.runtime.escape(null == (t = u.default_button_horizontal) ? "" : t) + 'px !important;\n}\n\n.crisp-client .crisp-1[data-full-view="false"][data-position-reverse="true"] .crisp-25 .crisp-26,\n.crisp-client .crisp-1[data-full-view="false"][data-position-reverse="true"] .crisp-25 .crisp-27 {\n  margin-left: ' + i.Library.jade.runtime.escape(null == (t = u.default_button_horizontal) ? "" : t) + 'px !important;\n}\n\n.crisp-client .crisp-1[data-full-view="false"][data-position-reverse="true"] .crisp-25 .crisp-26 .crisp-28 .crisp-29 {\n  margin-left: ' + i.Library.jade.runtime.escape(null == (t = u.default_button_horizontal) ? "" : t) + "px !important;\n}\n</style>"),
                            u.default_button_vertical && r.push('<style type="text/css">.crisp-client .crisp-1[data-full-view="false"] .crisp-25 .crisp-26,\n.crisp-client .crisp-1[data-full-view="false"] .crisp-25 .crisp-27 {\n  margin-bottom: ' + i.Library.jade.runtime.escape(null == (t = u.default_button_vertical) ? "" : t) + 'px !important;\n}\n\n.crisp-client .crisp-1[data-full-view="false"] .crisp-25 .crisp-26 .crisp-28 .crisp-29 {\n  margin-bottom: ' + i.Library.jade.runtime.escape(null == (t = u.default_button_vertical) ? "" : t) + "px !important;\n}\n</style>"),
                            u.mobile_button_horizontal && r.push('<style type="text/css">.crisp-client .crisp-1[data-full-view="true"][data-position-reverse="false"] .crisp-25 .crisp-26 {\n  margin-right: ' + i.Library.jade.runtime.escape(null == (t = u.mobile_button_horizontal) ? "" : t) + 'px !important;\n}\n\n.crisp-client .crisp-1[data-full-view="true"][data-position-reverse="false"] .crisp-25 .crisp-26 .crisp-28 .crisp-29 {\n  margin-right: ' + i.Library.jade.runtime.escape(null == (t = u.mobile_button_horizontal) ? "" : t) + 'px !important;\n}\n\n.crisp-client .crisp-1[data-full-view="true"][data-position-reverse="true"] .crisp-25 .crisp-26 {\n  margin-left: ' + i.Library.jade.runtime.escape(null == (t = u.mobile_button_horizontal) ? "" : t) + 'px !important;\n}\n\n.crisp-client .crisp-1[data-full-view="true"][data-position-reverse="true"] .crisp-25 .crisp-26 .crisp-28 .crisp-29 {\n  margin-left: ' + i.Library.jade.runtime.escape(null == (t = u.mobile_button_horizontal) ? "" : t) + "px !important;\n}\n</style>"),
                            u.mobile_button_vertical && r.push('<style type="text/css">.crisp-client .crisp-1[data-full-view="true"] .crisp-25 .crisp-26 {\n  margin-bottom: ' + i.Library.jade.runtime.escape(null == (t = u.mobile_button_vertical) ? "" : t) + 'px !important;\n}\n\n.crisp-client .crisp-1[data-full-view="true"] .crisp-25 .crisp-26 .crisp-28 .crisp-29 {\n  margin-bottom: ' + i.Library.jade.runtime.escape(null == (t = u.mobile_button_vertical) ? "" : t) + "px !important;\n}</style>"),
                            r.push("</div><div" + i.Library.jade.runtime.attr("lang", "" + _, !0, !1) + i.Library.jade.runtime.attr("dir", "" + o, !0, !1) + i.Library.jade.runtime.attr("data-blocked-page", "" + s, !0, !1) + i.Library.jade.runtime.attr("data-blocked-locale", "" + n, !0, !1) + i.Library.jade.runtime.attr("data-lock-maximized", "" + h, !0, !1) + i.Library.jade.runtime.attr("data-last-operator-face", "" + p, !0, !1) + i.Library.jade.runtime.attr("data-availability-tooltip", "" + e, !0, !1) + i.Library.jade.runtime.attr("data-hide-on-away", "" + l, !0, !1) + i.Library.jade.runtime.attr("data-position-reverse", "" + d, !0, !1) + i.Library.jade.runtime.attr("data-force-identify", "" + c, !0, !1) + ' data-availability="none" data-has-messages="false" data-has-trigger-messages="false" class="crisp-1"></div></div>')
                        }
                        .call(this, "availability_tooltip"in n ? n.availability_tooltip : "undefined" != typeof availability_tooltip ? availability_tooltip : void 0, "blocked_locale"in n ? n.blocked_locale : "undefined" != typeof blocked_locale ? blocked_locale : void 0, "blocked_page"in n ? n.blocked_page : "undefined" != typeof blocked_page ? blocked_page : void 0, "colors"in n ? n.colors : "undefined" != typeof colors ? colors : void 0, "direction"in n ? n.direction : "undefined" != typeof direction ? direction : void 0, "force_identify"in n ? n.force_identify : "undefined" != typeof force_identify ? force_identify : void 0, "hide_on_away"in n ? n.hide_on_away : "undefined" != typeof hide_on_away ? hide_on_away : void 0, "lang"in n ? n.lang : "undefined" != typeof lang ? lang : void 0, "last_operator_face"in n ? n.last_operator_face : "undefined" != typeof last_operator_face ? last_operator_face : void 0, "lock_maximized"in n ? n.lock_maximized : "undefined" != typeof lock_maximized ? lock_maximized : void 0, "position"in n ? n.position : "undefined" != typeof position ? position : void 0, "position_reverse"in n ? n.position_reverse : "undefined" != typeof position_reverse ? position_reverse : void 0),
                        r.join("")
                    }
                    ,
                    s.viewport = function(e) {
                        var t = []
                          , r = e || {};
                        return function(e) {
                            t.push('<meta name="viewport"' + i.Library.jade.runtime.attr("content", "" + e, !0, !1) + "/>")
                        }
                        .call(this, "content"in r ? r.content : "undefined" != typeof content ? content : void 0),
                        t.join("")
                    }
                    ,
                    s.clear = function(e) {
                        var t = [];
                        return t.push('<span class="crisp-30"></span>'),
                        t.join("")
                    }
                    ,
                    s.new_line = function(e) {
                        var t = [];
                        return t.push('<br class="crisp-31"/>'),
                        t.join("")
                    }
                    ,
                    s.link_email = function(e) {
                        var t, r = [], n = e || {};
                        return function(e) {
                            r.push("<a" + i.Library.jade.runtime.attr("href", "mailto:" + e, !0, !1) + ' class="crisp-32 crisp-33">' + (null == (t = e) ? "" : t) + "</a>")
                        }
                        .call(this, "email"in n ? n.email : "undefined" != typeof email ? email : void 0),
                        r.join("")
                    }
                    ,
                    s.link_uri = function(e) {
                        var t, r = [], n = e || {};
                        return function(e, n) {
                            r.push("<a" + i.Library.jade.runtime.attr("href", "" + n, !0, !1) + ' target="_blank" class="crisp-32 crisp-34">' + (null == (t = e) ? "" : t) + "</a>")
                        }
                        .call(this, "uri_name"in n ? n.uri_name : "undefined" != typeof uri_name ? uri_name : void 0, "uri_value"in n ? n.uri_value : "undefined" != typeof uri_value ? uri_value : void 0),
                        r.join("")
                    }
                    ,
                    s.link_domain = function(e) {
                        var t, r = [], n = e || {};
                        return function(e, n) {
                            r.push("<a" + i.Library.jade.runtime.attr("href", "http://" + n + "/", !0, !1) + ' target="_blank" class="crisp-32 crisp-35">' + (null == (t = e) ? "" : t) + "</a>")
                        }
                        .call(this, "domain_name"in n ? n.domain_name : "undefined" != typeof domain_name ? domain_name : void 0, "domain_value"in n ? n.domain_value : "undefined" != typeof domain_value ? domain_value : void 0),
                        r.join("")
                    }
                    ,
                    s.markdown_blockquote = function(e) {
                        var t, r = [], i = e || {};
                        return function(e) {
                            r.push('<span class="crisp-36 crisp-37">' + (null == (t = e) ? "" : t) + "</span>")
                        }
                        .call(this, "value"in i ? i.value : "undefined" != typeof value ? value : void 0),
                        r.join("")
                    }
                    ,
                    s.markdown_bold = function(e) {
                        var t, r = [], i = e || {};
                        return function(e) {
                            r.push('<span class="crisp-36 crisp-38 crisp-39">' + (null == (t = e) ? "" : t) + "</span>")
                        }
                        .call(this, "value"in i ? i.value : "undefined" != typeof value ? value : void 0),
                        r.join("")
                    }
                    ,
                    s.markdown_code = function(e) {
                        var t, r = [], i = e || {};
                        return function(e) {
                            r.push('<span class="crisp-36 crisp-40">' + (null == (t = e) ? "" : t) + "</span>")
                        }
                        .call(this, "value"in i ? i.value : "undefined" != typeof value ? value : void 0),
                        r.join("")
                    }
                    ,
                    s.markdown_delete = function(e) {
                        var t, r = [], i = e || {};
                        return function(e) {
                            r.push('<span class="crisp-36 crisp-41">' + (null == (t = e) ? "" : t) + "</span>")
                        }
                        .call(this, "value"in i ? i.value : "undefined" != typeof value ? value : void 0),
                        r.join("")
                    }
                    ,
                    s.markdown_image = function(e) {
                        var t = []
                          , r = e || {};
                        return function(e, r, n, s) {
                            t.push("");
                            var a = e(s);
                            t.push("<img" + i.Library.jade.runtime.attr("src", "" + n + "/process/original/?url=" + a, !0, !1) + i.Library.jade.runtime.attr("alt", "" + r, !0, !1) + ' class="crisp-36 crisp-42"/>')
                        }
                        .call(this, "encodeURIComponent"in r ? r.encodeURIComponent : "undefined" != typeof encodeURIComponent ? encodeURIComponent : void 0, "type"in r ? r.type : "undefined" != typeof type ? type : void 0, "url_crisp_image"in r ? r.url_crisp_image : "undefined" != typeof url_crisp_image ? url_crisp_image : void 0, "value"in r ? r.value : "undefined" != typeof value ? value : void 0),
                        t.join("")
                    }
                    ,
                    s.markdown_italic = function(e) {
                        var t, r = [], i = e || {};
                        return function(e) {
                            r.push('<span class="crisp-36 crisp-43">' + (null == (t = e) ? "" : t) + "</span>")
                        }
                        .call(this, "value"in i ? i.value : "undefined" != typeof value ? value : void 0),
                        r.join("")
                    }
                    ,
                    s.markdown_line = function(e) {
                        var t = [];
                        return t.push('<span class="crisp-36 crisp-44"></span>'),
                        t.join("")
                    }
                    ,
                    s.markdown_link = function(e) {
                        var t, r = [], n = e || {};
                        return function(e, n) {
                            r.push("<a" + i.Library.jade.runtime.attr("href", "" + n, !0, !1) + ' target="_blank" class="crisp-36 crisp-45">' + (null == (t = e) ? "" : t) + "</a>")
                        }
                        .call(this, "type"in n ? n.type : "undefined" != typeof type ? type : void 0, "value"in n ? n.value : "undefined" != typeof value ? value : void 0),
                        r.join("")
                    }
                    ,
                    s.markdown_list = function(e) {
                        var t, r = [], n = e || {};
                        return function(e, n) {
                            r.push("<span" + i.Library.jade.runtime.attr("data-type", "" + e, !0, !1) + ' class="crisp-36 crisp-46">' + (null == (t = n) ? "" : t) + "</span>")
                        }
                        .call(this, "type"in n ? n.type : "undefined" != typeof type ? type : void 0, "value"in n ? n.value : "undefined" != typeof value ? value : void 0),
                        r.join("")
                    }
                    ,
                    s.markdown_title = function(e) {
                        var t, r = [], n = e || {};
                        return function(e, n) {
                            r.push("<span" + i.Library.jade.runtime.attr("data-type", "" + e, !0, !1) + ' class="crisp-36 crisp-47 crisp-39">' + (null == (t = n) ? "" : t) + "</span>")
                        }
                        .call(this, "type"in n ? n.type : "undefined" != typeof type ? type : void 0, "value"in n ? n.value : "undefined" != typeof value ? value : void 0),
                        r.join("")
                    }
                    ,
                    s.smiley = function(e) {
                        var t = []
                          , r = e || {};
                        return function(e, r) {
                            t.push("<span" + i.Library.jade.runtime.attr("data-size", r, !0, !1) + i.Library.jade.runtime.attr("data-name", e, !0, !1) + ' class="crisp-48"></span>')
                        }
                        .call(this, "name"in r ? r.name : "undefined" != typeof name ? name : void 0, "size"in r ? r.size : "undefined" != typeof size ? size : void 0),
                        t.join("")
                    }
                    ,
                    s.sounds_events = function(e) {
                        var t = []
                          , r = e || {};
                        return function(e, r, n, s) {
                            t.push("");
                            var a = [["oga", "audio/ogg"], ["m4a", "audio/aac"], ["mp3", "audio/mpeg"]]
                              , o = "events"
                              , c = ["chat-message-receive"]
                              , l = "auto";
                            t.push("<div" + i.Library.jade.runtime.attr("data-subset", "" + o, !0, !1) + ' class="crisp-49">'),
                            function() {
                                var n = c;
                                if ("number" == typeof n.length)
                                    for (var _ = 0, p = n.length; _ < p; _++) {
                                        var h = n[_];
                                        t.push("<audio" + i.Library.jade.runtime.attr("data-name", "" + h, !0, !1) + i.Library.jade.runtime.attr("preload", "" + l, !0, !1) + ' class="crisp-50">'),
                                        function() {
                                            var n = a;
                                            if ("number" == typeof n.length)
                                                for (var c = 0, l = n.length; c < l; c++) {
                                                    var _ = n[c];
                                                    r && r !== _[0] || t.push("<source" + i.Library.jade.runtime.attr("src", "" + s + "/static/sounds/" + o + "/" + h + "." + _[0] + "?" + e, !0, !1) + i.Library.jade.runtime.attr("type", "" + _[1], !0, !1) + ' class="crisp-51"/>')
                                                }
                                            else {
                                                var l = 0;
                                                for (var c in n) {
                                                    l++;
                                                    var _ = n[c];
                                                    r && r !== _[0] || t.push("<source" + i.Library.jade.runtime.attr("src", "" + s + "/static/sounds/" + o + "/" + h + "." + _[0] + "?" + e, !0, !1) + i.Library.jade.runtime.attr("type", "" + _[1], !0, !1) + ' class="crisp-51"/>')
                                                }
                                            }
                                        }
                                        .call(this),
                                        t.push("</audio>")
                                    }
                                else {
                                    var p = 0;
                                    for (var _ in n) {
                                        p++;
                                        var h = n[_];
                                        t.push("<audio" + i.Library.jade.runtime.attr("data-name", "" + h, !0, !1) + i.Library.jade.runtime.attr("preload", "" + l, !0, !1) + ' class="crisp-50">'),
                                        function() {
                                            var n = a;
                                            if ("number" == typeof n.length)
                                                for (var c = 0, l = n.length; c < l; c++) {
                                                    var _ = n[c];
                                                    r && r !== _[0] || t.push("<source" + i.Library.jade.runtime.attr("src", "" + s + "/static/sounds/" + o + "/" + h + "." + _[0] + "?" + e, !0, !1) + i.Library.jade.runtime.attr("type", "" + _[1], !0, !1) + ' class="crisp-51"/>')
                                                }
                                            else {
                                                var l = 0;
                                                for (var c in n) {
                                                    l++;
                                                    var _ = n[c];
                                                    r && r !== _[0] || t.push("<source" + i.Library.jade.runtime.attr("src", "" + s + "/static/sounds/" + o + "/" + h + "." + _[0] + "?" + e, !0, !1) + i.Library.jade.runtime.attr("type", "" + _[1], !0, !1) + ' class="crisp-51"/>')
                                                }
                                            }
                                        }
                                        .call(this),
                                        t.push("</audio>")
                                    }
                                }
                            }
                            .call(this),
                            t.push("</div>")
                        }
                        .call(this, "client_revision"in r ? r.client_revision : "undefined" != typeof client_revision ? client_revision : void 0, "selected_format"in r ? r.selected_format : "undefined" != typeof selected_format ? selected_format : void 0, "undefined"in r ? r.undefined : void 0, "url_assets"in r ? r.url_assets : "undefined" != typeof url_assets ? url_assets : void 0),
                        t.join("")
                    }
                    ,
                    s.magnify = function(e) {
                        var t = []
                          , r = e || {};
                        return function(e, r, n) {
                            switch (t.push('<div tabindex="0"' + i.Library.jade.runtime.attr("data-type", "" + n, !0, !1) + ' data-state="loading" class="crisp-52"><span class="crisp-53"></span>'),
                            n) {
                            case "embed":
                                t.push('<iframe type="text/html"' + i.Library.jade.runtime.attr("src", "" + r, !0, !1) + ' frameborder="0" class="crisp-54"></iframe>');
                                break;
                            default:
                                t.push("<img" + i.Library.jade.runtime.attr("src", "" + r, !0, !1) + ' alt="" class="crisp-54"/>')
                            }
                            t.push('<div class="crisp-55">'),
                            "file" === n && t.push('<a data-action="download"' + i.Library.jade.runtime.attr("href", "" + r, !0, !1) + i.Library.jade.runtime.attr("download", "" + (e || r), !0, !1) + ' target="_blank" class="crisp-56"></a><span class="crisp-57"></span>'),
                            t.push('<a data-action="close" href="#" class="crisp-56"></a></div></div>')
                        }
                        .call(this, "name"in r ? r.name : "undefined" != typeof name ? name : void 0, "source"in r ? r.source : "undefined" != typeof source ? source : void 0, "type"in r ? r.type : "undefined" != typeof type ? type : void 0),
                        t.join("")
                    }
                    ,
                    s.date_now = function(e) {
                        var t, r = [], n = e || {};
                        return function(e) {
                            r.push('<span data-type="now" class="crisp-58">' + i.Library.jade.runtime.escape(null == (t = e("date", "now")) ? "" : t) + "</span>")
                        }
                        .call(this, "_e"in n ? n._e : "undefined" != typeof _e ? _e : void 0),
                        r.join("")
                    }
                    ,
                    s.date_seconds = function(e) {
                        var t, r = [], n = e || {};
                        return function(e) {
                            r.push('<span data-type="seconds" class="crisp-58">' + i.Library.jade.runtime.escape(null == (t = e("date", "second")) ? "" : t) + "</span>")
                        }
                        .call(this, "_e"in n ? n._e : "undefined" != typeof _e ? _e : void 0),
                        r.join("")
                    }
                    ,
                    s.date_minutes = function(e) {
                        var t, r = [], n = e || {};
                        return function(e, n) {
                            r.push('<span data-type="minutes" class="crisp-58">'),
                            1 === n ? r.push(i.Library.jade.runtime.escape(null == (t = e("date", "minute_singular")) ? "" : t)) : r.push(i.Library.jade.runtime.escape(null == (t = e("date", "minute_plural", [n])) ? "" : t)),
                            r.push("</span>")
                        }
                        .call(this, "_e"in n ? n._e : "undefined" != typeof _e ? _e : void 0, "minutes"in n ? n.minutes : "undefined" != typeof minutes ? minutes : void 0),
                        r.join("")
                    }
                    ,
                    s.date_hours = function(e) {
                        var t, r = [], n = e || {};
                        return function(e, n) {
                            r.push('<span data-type="hours" class="crisp-58">'),
                            1 === n ? r.push(i.Library.jade.runtime.escape(null == (t = e("date", "hour_singular")) ? "" : t)) : r.push(i.Library.jade.runtime.escape(null == (t = e("date", "hour_plural", [n])) ? "" : t)),
                            r.push("</span>")
                        }
                        .call(this, "_e"in n ? n._e : "undefined" != typeof _e ? _e : void 0, "hours"in n ? n.hours : "undefined" != typeof hours ? hours : void 0),
                        r.join("")
                    }
                    ,
                    s.date_far_away = function(e) {
                        var t, r = [], n = e || {};
                        return function(e) {
                            r.push('<span data-type="far_away" class="crisp-58">' + i.Library.jade.runtime.escape(null == (t = e) ? "" : t) + "</span>")
                        }
                        .call(this, "date_full"in n ? n.date_full : "undefined" != typeof date_full ? date_full : void 0),
                        r.join("")
                    }
                    ,
                    s.duration_now = function(e) {
                        var t, r = [], n = e || {};
                        return function(e) {
                            r.push('<span data-type="now" class="crisp-59">' + i.Library.jade.runtime.escape(null == (t = e("duration", "now")) ? "" : t) + "</span>")
                        }
                        .call(this, "_e"in n ? n._e : "undefined" != typeof _e ? _e : void 0),
                        r.join("")
                    }
                    ,
                    s.duration_seconds = function(e) {
                        var t, r = [], n = e || {};
                        return function(e) {
                            r.push('<span data-type="seconds" class="crisp-59">' + i.Library.jade.runtime.escape(null == (t = e("duration", "second")) ? "" : t) + "</span>")
                        }
                        .call(this, "_e"in n ? n._e : "undefined" != typeof _e ? _e : void 0),
                        r.join("")
                    }
                    ,
                    s.duration_minutes = function(e) {
                        var t, r = [], n = e || {};
                        return function(e, n) {
                            r.push('<span data-type="minutes" class="crisp-59">'),
                            1 === n ? r.push(i.Library.jade.runtime.escape(null == (t = e("duration", "minute_singular")) ? "" : t)) : r.push(i.Library.jade.runtime.escape(null == (t = e("duration", "minute_plural", [n])) ? "" : t)),
                            r.push("</span>")
                        }
                        .call(this, "_e"in n ? n._e : "undefined" != typeof _e ? _e : void 0, "minutes"in n ? n.minutes : "undefined" != typeof minutes ? minutes : void 0),
                        r.join("")
                    }
                    ,
                    s.duration_hours = function(e) {
                        var t, r = [], n = e || {};
                        return function(e, n) {
                            r.push('<span data-type="hours" class="crisp-59">'),
                            1 === n ? r.push(i.Library.jade.runtime.escape(null == (t = e("duration", "hour_singular")) ? "" : t)) : r.push(i.Library.jade.runtime.escape(null == (t = e("duration", "hour_plural", [n])) ? "" : t)),
                            r.push("</span>")
                        }
                        .call(this, "_e"in n ? n._e : "undefined" != typeof _e ? _e : void 0, "hours"in n ? n.hours : "undefined" != typeof hours ? hours : void 0),
                        r.join("")
                    }
                    ,
                    s.duration_days = function(e) {
                        var t, r = [], n = e || {};
                        return function(e) {
                            r.push('<span data-type="days" class="crisp-59">' + i.Library.jade.runtime.escape(null == (t = e("duration", "days")) ? "" : t) + "</span>")
                        }
                        .call(this, "_e"in n ? n._e : "undefined" != typeof _e ? _e : void 0),
                        r.join("")
                    }
                    ,
                    s.chat = function(e) {
                        var t, r = [], n = e || {};
                        return function(e, n, s, a, o, c, l, _, p) {
                            r.push("");
                            r.push('<div class="crisp-25 crisp-24"><div data-visible="true" data-chat-status="none" class="crisp-27"><div class="crisp-60"><div class="crisp-61 crisp-11 crisp-17"><span class="crisp-62 crisp-11"></span><span class="crisp-63">');
                            var h = l.active_operators(p.id, a);
                            (function() {
                                var n = h;
                                if ("number" == typeof n.length)
                                    for (var s = 0, a = n.length; s < a; s++) {
                                        var o = n[s]
                                          , c = e(240, "operator", o.identifier, o.avatar);
                                        r.push("<span" + i.Library.jade.runtime.attr("style", "background-image: url('" + c + "') !important;", !0, !1) + ' class="crisp-64 crisp-19"><span' + i.Library.jade.runtime.attr("data-has-name", o.name ? "true" : "false", !0, !1) + ' class="crisp-65"><span class="crisp-66"><span class="crisp-67"></span><span class="crisp-68 crisp-69">' + i.Library.jade.runtime.escape(null == (t = o.name) ? "" : t) + "</span></span></span></span>")
                                    }
                                else {
                                    var a = 0;
                                    for (var s in n) {
                                        a++;
                                        var o = n[s]
                                          , c = e(240, "operator", o.identifier, o.avatar);
                                        r.push("<span" + i.Library.jade.runtime.attr("style", "background-image: url('" + c + "') !important;", !0, !1) + ' class="crisp-64 crisp-19"><span' + i.Library.jade.runtime.attr("data-has-name", o.name ? "true" : "false", !0, !1) + ' class="crisp-65"><span class="crisp-66"><span class="crisp-67"></span><span class="crisp-68 crisp-69">' + i.Library.jade.runtime.escape(null == (t = o.name) ? "" : t) + "</span></span></span></span>")
                                    }
                                }
                            }
                            ).call(this),
                            r.push('</span><span class="crisp-70"><span class="crisp-71 crisp-2 crisp-69">' + i.Library.jade.runtime.escape(null == (t = n("theme_text", ["default_chat", a.chat.theme_text + "_chat"])) ? "" : t) + '</span><span class="crisp-72"><span data-type="operator_name" class="crisp-73 crisp-74 crisp-2 crisp-39"></span><span class="crisp-73 crisp-2 crisp-69">' + i.Library.jade.runtime.escape(null == (t = n("chat", "chat_header_ongoing_from")) ? "" : t) + '</span><span data-type="website_name" class="crisp-73 crisp-2 crisp-69">' + i.Library.jade.runtime.escape(null == (t = a.website.name) ? "" : t) + '</span><span class="crisp-30"></span></span><span class="crisp-75"><span data-id="online" class="crisp-76">');
                            var u = a.chat.activity_metrics === !0 && s.metrics && !0;
                            r.push('<span data-type="default"' + i.Library.jade.runtime.attr("data-duration", u === !0 ? s.metrics.raw : null, !0, !1) + ' class="crisp-77 crisp-2 crisp-69">'),
                            u === !0 ? r.push(i.Library.jade.runtime.escape(null == (t = n("chat", "chat_header_ongoing_status_metrics", [s.metrics.format])) ? "" : t)) : r.push(i.Library.jade.runtime.escape(null == (t = n("chat", "chat_header_ongoing_status_online")) ? "" : t)),
                            r.push('</span><span data-type="ongoing" class="crisp-77 crisp-2 crisp-69">' + i.Library.jade.runtime.escape(null == (t = n("chat", "chat_header_ongoing_status_online")) ? "" : t) + '</span></span><span data-id="away" class="crisp-76">');
                            var u = a.chat.activity_metrics === !0 && s.last && !0;
                            r.push('<span data-type="default"' + i.Library.jade.runtime.attr("data-date-iso", u === !0 ? s.last.raw : null, !0, !1) + i.Library.jade.runtime.attr("data-date-format", u === !0 ? n("chat", "chat_header_ongoing_status_last") : null, !0, !1) + i.Library.jade.runtime.attr("data-date-watch", u === !0 ? "true" : null, !0, !1) + ' class="crisp-77 crisp-2 crisp-69">'),
                            u === !0 ? r.push(i.Library.jade.runtime.escape(null == (t = n("chat", "chat_header_ongoing_status_last", [s.last.format])) ? "" : t)) : r.push(i.Library.jade.runtime.escape(null == (t = n("chat", "chat_header_ongoing_status_away")) ? "" : t)),
                            r.push('</span><span data-type="ongoing" class="crisp-77 crisp-2 crisp-69">' + i.Library.jade.runtime.escape(null == (t = n("chat", "chat_header_ongoing_status_away")) ? "" : t) + '</span></span><span class="crisp-30"></span></span></span><span class="crisp-78"><span class="crisp-79"></span></span></div><span class="crisp-80"></span></div><div class="crisp-81"><div' + i.Library.jade.runtime.attr("data-refer-hide-space", "urn:crisp.im:debranding:0"in a.plugins ? "true" : "false", !0, !1) + ' class="crisp-82"><div' + i.Library.jade.runtime.attr("data-tile", a.chat.tile ? a.chat.tile : null, !0, !1) + ' class="crisp-83 crisp-12"><div class="crisp-84"><div class="crisp-85"></div><div class="crisp-86"></div></div></div><div class="crisp-87"><div class="crisp-88"></div><div class="crisp-89"><div class="crisp-90"><div class="crisp-91"></div><div class="crisp-92 crisp-39">' + i.Library.jade.runtime.escape(null == (t = n("chat", "chat_form_attach_tooltip")) ? "" : t) + '</div></div></div></div><div data-has-animation="true" class="crisp-93"><div class="crisp-94"><div class="crisp-95"><a href="#" data-type="smiley" class="crisp-96 crisp-7 crisp-39">' + i.Library.jade.runtime.escape(null == (t = n("chat", "chat_pickers_selector_smileys")) ? "" : t) + '</a><span class="crisp-97"></span><a href="#" data-type="gif" class="crisp-96 crisp-7 crisp-39">' + i.Library.jade.runtime.escape(null == (t = n("chat", "chat_pickers_selector_gifs")) ? "" : t) + '</a></div><div class="crisp-98"><div data-type="smiley" class="crisp-99"><span class="crisp-100">'),
                            function() {
                                var e = c.smileys;
                                if ("number" == typeof e.length)
                                    for (var t = 0, n = e.length; t < n; t++) {
                                        var s = e[t];
                                        r.push('<a href="#" data-size="large"' + i.Library.jade.runtime.attr("data-name", t, !0, !1) + i.Library.jade.runtime.attr("data-value", s, !0, !1) + ' class="crisp-101 crisp-48"></a>')
                                    }
                                else {
                                    var n = 0;
                                    for (var t in e) {
                                        n++;
                                        var s = e[t];
                                        r.push('<a href="#" data-size="large"' + i.Library.jade.runtime.attr("data-name", t, !0, !1) + i.Library.jade.runtime.attr("data-value", s, !0, !1) + ' class="crisp-101 crisp-48"></a>')
                                    }
                                }
                            }
                            .call(this),
                            r.push('</span></div><div data-type="gif" data-has-search="false" class="crisp-99"><span class="crisp-102"><span data-action="search" class="crisp-103">');
                            var d = n("chat", "chat_pickers_gif_search");
                            r.push('<a href="#" class="crisp-104"></a><input type="text" name="gif_search"' + i.Library.jade.runtime.attr("placeholder", "" + d, !0, !1) + ' maxlength="25" autocomplete="off" autocorrect="off" autocapitalize="off" class="crisp-105 crisp-106 crisp-69"/></span></span><span class="crisp-100"></span><span class="crisp-107"><span data-notice="no_results" class="crisp-108 crisp-39">' + i.Library.jade.runtime.escape(null == (t = n("chat", "chat_pickers_gif_no_results")) ? "" : t) + '</span></span></div></div></div></div><div class="crisp-109"><a href="#" data-type="new_messages" class="crisp-110"><span class="crisp-111 crisp-112"><span class="crisp-113"></span><span class="crisp-114 crisp-39">' + i.Library.jade.runtime.escape(null == (t = n("chat", "chat_alerts_new_messages")) ? "" : t) + '</span></span></a><a href="#" data-type="warn_reply" class="crisp-110"><div class="crisp-111"><span class="crisp-114 crisp-39">' + i.Library.jade.runtime.escape(null == (t = n("chat", "chat_alerts_warn_reply")) ? "" : t) + '</span></div></a><a href="#" data-type="email_invalid" class="crisp-110"><div class="crisp-111"><span class="crisp-114 crisp-39">' + i.Library.jade.runtime.escape(null == (t = n("chat", "chat_alerts_email_invalid")) ? "" : t) + '</span></div></a><div data-type="wait_reply" class="crisp-110"><div class="crisp-111 crisp-112"><span class="crisp-114 crisp-39"><span data-id="online" class="crisp-115">' + i.Library.jade.runtime.escape(null == (t = n("chat", "chat_alerts_wait_reply_online")) ? "" : t) + '</span><span data-id="away" class="crisp-115">' + i.Library.jade.runtime.escape(null == (t = n("chat", "chat_alerts_wait_reply_away")) ? "" : t) + '</span></span></div></div><div data-type="email_form" data-error="false" class="crisp-110"><div class="crisp-111"><span class="crisp-114 crisp-39">' + i.Library.jade.runtime.escape(null == (t = n("chat", "chat_alerts_email_form_label")) ? "" : t) + '</span><span class="crisp-114 crisp-116 crisp-117 crisp-69">' + i.Library.jade.runtime.escape(null == (t = n("chat", "chat_alerts_email_form_entice_default")) ? "" : t) + '</span><span class="crisp-114 crisp-116 crisp-118 crisp-39">' + i.Library.jade.runtime.escape(null == (t = n("chat", "chat_alerts_email_form_entice_error")) ? "" : t) + '</span><form action="#" method="post" class="crisp-119"><div class="crisp-120">');
                            var f = n("chat", "chat_alerts_email_form_email_field");
                            r.push('<div class="crisp-121"><input type="email" name="client_email"' + i.Library.jade.runtime.attr("placeholder", "" + f, !0, !1) + ' autocomplete="off" autocorrect="off" autocapitalize="off" class="crisp-122 crisp-106 crisp-21 crisp-69"/></div><a href="#" data-for="email_validate" class="crisp-123 crisp-23"><span class="crisp-124 crisp-2 crisp-39">' + i.Library.jade.runtime.escape(null == (t = n("chat", "chat_alerts_email_form_email_button")) ? "" : t) + '</span></a><span class="crisp-30"></span></div></form><div class="crisp-125"><a href="#" data-for="email_validate" class="crisp-126 crisp-39">' + i.Library.jade.runtime.escape(null == (t = n("chat", "chat_alerts_email_form_email_cancel")) ? "" : t) + '</a></div></div></div></div><div data-has-value="false" class="crisp-127"><form name="form_message" action="#" method="post" class="crisp-128">');
                            var g = n("chat", "chat_form_field_message");
                            if (r.push('<textarea name="message"' + i.Library.jade.runtime.attr("placeholder", "" + g, !0, !1) + ' cols="20" rows="1" autocomplete="off" data-has-selection-range="data-has-selection-range" class="crisp-129 crisp-106 crisp-22 crisp-69"></textarea></form><div class="crisp-130"><div class="crisp-131"><div data-type="smiley" data-state="none" class="crisp-132"><span class="crisp-133"><span class="crisp-134 crisp-69"><span class="crisp-135">' + i.Library.jade.runtime.escape(null == (t = n("chat", "chat_form_smiley_tooltip")) ? "" : t) + '</span></span><span class="crisp-136"></span><span class="crisp-30"></span></span><span class="crisp-137"><span class="crisp-138"><span class="crisp-139"><span class="crisp-140 crisp-141"></span><span class="crisp-142 crisp-141"></span></span></span></span></div><div data-type="file" data-state="none" class="crisp-132"><span class="crisp-133"><span class="crisp-134 crisp-69"><span class="crisp-135">' + i.Library.jade.runtime.escape(null == (t = n("chat", "chat_form_attach_tooltip")) ? "" : t) + '</span></span><span class="crisp-136"></span><span class="crisp-30"></span></span><span class="crisp-137"><input type="file" name="attach_file" title="" multiple="multiple" class="crisp-143"/><span class="crisp-138 crisp-141"></span><span class="crisp-144"><span class="crisp-145"></span></span></span></div><span class="crisp-146"><a href="#" class="crisp-147 crisp-23"><span class="crisp-148"></span></a></span><span class="crisp-30"></span></div><span class="crisp-30"></span></div></div>'),
                            !("urn:crisp.im:debranding:0"in a.plugins)) {
                                r.push('<div class="crisp-149"><div class="crisp-150">');
                                var m = o(p.domain);
                                r.push("<a" + i.Library.jade.runtime.attr("href", "" + c.url.crisp_web + "?ref=chatbox&domain=" + m, !0, !1) + ' target="_blank" class="crisp-151"><span class="crisp-152 crisp-69">We run on</span><span class="crisp-153"></span><span class="crisp-152 crisp-154 crisp-39">Crisp</span><span class="crisp-30"></span></a><span class="crisp-30"></span></div><span class="crisp-30"></span></div>')
                            }
                            if (r.push('</div></div></div><a data-visible="false" data-is-failure="false" data-is-initiated="true" href="#" class="crisp-26"><span class="crisp-28"><span data-id="new_messages" class="crisp-29"><span class="crisp-155"><span class="crisp-156"></span></span><span class="crisp-157"><span class="crisp-158"><span data-variant="plural" data-for-id="new_messages" class="crisp-159 crisp-39">' + i.Library.jade.runtime.escape(null == (t = n("chat", "minimized_tooltip_unread_plural")) ? "" : t) + '</span><span data-variant="singular" data-for-id="new_messages" class="crisp-159 crisp-39">' + i.Library.jade.runtime.escape(null == (t = n("chat", "minimized_tooltip_unread_singular")) ? "" : t) + '</span><span class="crisp-30"></span></span><span class="crisp-160"><span class="crisp-161 crisp-162"></span><span class="crisp-161 crisp-163"></span><span class="crisp-30"></span></span></span></span></span><span class="crisp-164 crisp-11"><span data-id="chat_opened" class="crisp-165"><span data-is-ongoing="false" class="crisp-166">'),
                            a.chat.last_operator_face === !0 && a.website.active_operators.length > 0) {
                                var y = a.website.active_operators[0]
                                  , v = e(240, "operator", y.user_id, y.avatar);
                                r.push("<span" + i.Library.jade.runtime.attr("style", "background-image: url('" + v + "') !important;", !0, !1) + ' class="crisp-167"></span>')
                            } else
                                r.push('<span class="crisp-167"></span>');
                            r.push('<span class="crisp-168"></span><span class="crisp-169 crisp-39">0</span></span></span></span></a><span data-visible="false" data-visible-subtle="false" class="crisp-170"><span class="crisp-171"></span></span></div>')
                        }
                        .call(this, "_a"in n ? n._a : "undefined" != typeof _a ? _a : void 0, "_e"in n ? n._e : "undefined" != typeof _e ? _e : void 0, "activity"in n ? n.activity : "undefined" != typeof activity ? activity : void 0, "configuration"in n ? n.configuration : "undefined" != typeof configuration ? configuration : void 0, "encodeURIComponent"in n ? n.encodeURIComponent : "undefined" != typeof encodeURIComponent ? encodeURIComponent : void 0, "environment"in n ? n.environment : "undefined" != typeof environment ? environment : void 0, "methods"in n ? n.methods : "undefined" != typeof methods ? methods : void 0, "undefined"in n ? n.undefined : void 0, "website"in n ? n.website : "undefined" != typeof website ? website : void 0),
                        r.join("")
                    }
                    ,
                    s.minimized_authorized = function(e) {
                        var t, r = [], n = e || {};
                        return function(e, n, s, a, o, c) {
                            r.push("");
                            var l = !1;
                            if (r.push('<div class="crisp-25 crisp-24"><a data-maximized="false"' + i.Library.jade.runtime.attr("data-is-failure", l === !0 ? "true" : "false", !0, !1) + ' data-is-initiated="false" href="#" class="crisp-26"><span class="crisp-28">'),
                            !l) {
                                r.push('<span data-id="general_entice" class="crisp-29"><span class="crisp-157"><span class="crisp-158 crisp-8 crisp-69">');
                                var _ = a.active_operators(c.id, s);
                                r.push('<span class="crisp-172 crisp-173 crisp-39"><span class="crisp-174 crisp-173"></span><span class="crisp-175 crisp-173">' + i.Library.jade.runtime.escape(null == (t = n("minimized", "tooltip_entice_close")) ? "" : t) + '</span><span class="crisp-30"></span></span><span' + i.Library.jade.runtime.attr("data-avatar-count", "" + (_.length || 0), !0, !1) + ' class="crisp-176">'),
                                _.length > 0 && (r.push('<span class="crisp-177">'),
                                function() {
                                    var t = _;
                                    if ("number" == typeof t.length)
                                        for (var n = 0, s = t.length; n < s; n++) {
                                            var a = t[n]
                                              , o = e(240, "operator", a.identifier, a.avatar);
                                            r.push("<span" + i.Library.jade.runtime.attr("style", "background-image: url('" + o + "') !important;", !0, !1) + ' class="crisp-178"></span>')
                                        }
                                    else {
                                        var s = 0;
                                        for (var n in t) {
                                            s++;
                                            var a = t[n]
                                              , o = e(240, "operator", a.identifier, a.avatar);
                                            r.push("<span" + i.Library.jade.runtime.attr("style", "background-image: url('" + o + "') !important;", !0, !1) + ' class="crisp-178"></span>')
                                        }
                                    }
                                }
                                .call(this),
                                r.push("</span>")),
                                r.push('<span class="crisp-179"><span class="crisp-180"><span class="crisp-181 crisp-39">' + i.Library.jade.runtime.escape(null == (t = n("minimized", "tooltip_entice_title", [s.website.name])) ? "" : t) + '</span><span data-id="online" class="crisp-182 crisp-2 crisp-39">' + i.Library.jade.runtime.escape(null == (t = n("minimized", "tooltip_entice_status_online")) ? "" : t) + '</span></span><span class="crisp-183 crisp-69">' + i.Library.jade.runtime.escape(null == (t = n("minimized", "tooltip_entice_explain_online")) ? "" : t) + '</span></span></span><span class="crisp-184"><span class="crisp-185"><span class="crisp-186"></span><span class="crisp-187"></span></span><span class="crisp-188 crisp-69">' + i.Library.jade.runtime.escape(null == (t = n("minimized", "tooltip_entice_form_compose")) ? "" : t) + '</span></span></span><span class="crisp-160"><span class="crisp-161 crisp-162"></span><span class="crisp-161 crisp-163"></span><span class="crisp-30"></span></span></span></span>')
                            }
                            if (l && r.push('<span data-id="failure_notice" class="crisp-29"><span class="crisp-157"><span class="crisp-158 crisp-39"></span><span class="crisp-160"><span class="crisp-161 crisp-162"></span><span class="crisp-161 crisp-163"></span><span class="crisp-30"></span></span></span></span>'),
                            r.push("</span>"),
                            l)
                                r.push('<span class="crisp-164 crisp-189"><span data-id="in_failure" class="crisp-165"><span data-is-ongoing="false" class="crisp-166"></span></span></span>');
                            else {
                                if (r.push('<span class="crisp-164 crisp-11"><span data-id="chat_closed" class="crisp-165"><span data-is-ongoing="false" class="crisp-166">'),
                                s.chat.last_operator_face === !0 && s.website.active_operators.length > 0) {
                                    var p = s.website.active_operators[0]
                                      , h = e(240, "operator", p.user_id, p.avatar);
                                    r.push("<span" + i.Library.jade.runtime.attr("style", "background-image: url('" + h + "') !important;", !0, !1) + ' class="crisp-167"></span>')
                                }
                                r.push("</span></span></span>")
                            }
                            r.push("</a></div>")
                        }
                        .call(this, "_a"in n ? n._a : "undefined" != typeof _a ? _a : void 0, "_e"in n ? n._e : "undefined" != typeof _e ? _e : void 0, "configuration"in n ? n.configuration : "undefined" != typeof configuration ? configuration : void 0, "methods"in n ? n.methods : "undefined" != typeof methods ? methods : void 0, "undefined"in n ? n.undefined : void 0, "website"in n ? n.website : "undefined" != typeof website ? website : void 0),
                        r.join("")
                    }
                    ,
                    s.minimized_unauthorized = function(e) {
                        var t, r = [], n = e || {};
                        return function(e, n, s) {
                            r.push("");
                            var a = !0;
                            if (r.push('<div class="crisp-25 crisp-24"><a data-maximized="false"' + i.Library.jade.runtime.attr("data-is-failure", a === !0 ? "true" : "false", !0, !1) + ' data-is-initiated="false" href="#" class="crisp-26"><span class="crisp-28">'),
                            a || r.push('<span data-id="general_entice" class="crisp-29"><span class="crisp-157"><span class="crisp-158 crisp-8 crisp-69"></span><span class="crisp-160"><span class="crisp-161 crisp-162"></span><span class="crisp-161 crisp-163"></span><span class="crisp-30"></span></span></span></span>'),
                            a && r.push('<span data-id="failure_notice" class="crisp-29"><span class="crisp-157"><span class="crisp-158 crisp-39">' + i.Library.jade.runtime.escape(null == (t = n("minimized", "unauthorized_pane")) ? "" : t) + '</span><span class="crisp-160"><span class="crisp-161 crisp-162"></span><span class="crisp-161 crisp-163"></span><span class="crisp-30"></span></span></span></span>'),
                            r.push("</span>"),
                            a)
                                r.push('<span class="crisp-164 crisp-189"><span data-id="in_failure" class="crisp-165"><span data-is-ongoing="false" class="crisp-166"></span></span></span>');
                            else {
                                if (r.push('<span class="crisp-164 crisp-11"><span data-id="chat_closed" class="crisp-165"><span data-is-ongoing="false" class="crisp-166">'),
                                s.chat.last_operator_face === !0 && s.website.active_operators.length > 0) {
                                    var o = s.website.active_operators[0]
                                      , c = e(240, "operator", o.user_id, o.avatar);
                                    r.push("<span" + i.Library.jade.runtime.attr("style", "background-image: url('" + c + "') !important;", !0, !1) + ' class="crisp-167"></span>')
                                }
                                r.push("</span></span></span>")
                            }
                            r.push("</a></div>")
                        }
                        .call(this, "_a"in n ? n._a : "undefined" != typeof _a ? _a : void 0, "_e"in n ? n._e : "undefined" != typeof _e ? _e : void 0, "configuration"in n ? n.configuration : "undefined" != typeof configuration ? configuration : void 0),
                        r.join("")
                    }
                    ,
                    s.chat_preview_message = function(e) {
                        var t, r = [], n = e || {};
                        return function(e, n, s, a, o, c, l, _, p, h) {
                            if (r.push(""),
                            "text" === p || "file" === p || "animation" === p) {
                                r.push('<span class="crisp-190"><span class="crisp-191">');
                                var u = e(240, h.type || _, h.user_id, h.avatar);
                                switch (r.push("<span" + i.Library.jade.runtime.attr("style", "background-image: url('" + u + "') !important;", !0, !1) + ' class="crisp-192"></span><span class="crisp-193"><span class="crisp-194"></span><span class="crisp-195"><span class="crisp-196 crisp-69">' + i.Library.jade.runtime.escape(null == (t = n("chat", "minimized_tooltip_message_from")) ? "" : t) + '</span><span class="crisp-197 crisp-39">' + i.Library.jade.runtime.escape(null == (t = a(h.nickname)) ? "" : t) + '</span><span class="crisp-30"></span></span><span class="crisp-198 crisp-69">'),
                                p) {
                                case "text":
                                    r.push(null == (t = s(o)) ? "" : t);
                                    break;
                                case "file":
                                case "animation":
                                    switch (o.type) {
                                    case "image/jpg":
                                    case "image/jpeg":
                                    case "image/png":
                                    case "image/gif":
                                        var d = c(o.url);
                                        switch (p) {
                                        case "animation":
                                            r.push("<span" + i.Library.jade.runtime.attr("style", "background-image: url('" + l.url.crisp_image + "/process/original/?url=" + d + "') !important;", !0, !1) + ' class="crisp-199"></span>');
                                            break;
                                        default:
                                            var f = 180
                                              , g = 180;
                                            r.push("<span" + i.Library.jade.runtime.attr("style", "background-image: url('" + l.url.crisp_image + "/process/resize/?url=" + d + "&width=" + f + "&height=" + g + "') !important;", !0, !1) + ' class="crisp-199"></span>')
                                        }
                                        break;
                                    default:
                                        o.name ? r.push("" + i.Library.jade.runtime.escape(null == (t = o.name) ? "" : t)) : r.push(i.Library.jade.runtime.escape(null == (t = n("chat", "chat_message_file_name")) ? "" : t))
                                    }
                                }
                                r.push('</span></span></span><span class="crisp-30"></span></span>')
                            }
                        }
                        .call(this, "_a"in n ? n._a : "undefined" != typeof _a ? _a : void 0, "_e"in n ? n._e : "undefined" != typeof _e ? _e : void 0, "_f"in n ? n._f : "undefined" != typeof _f ? _f : void 0, "_n"in n ? n._n : "undefined" != typeof _n ? _n : void 0, "content"in n ? n.content : "undefined" != typeof content ? content : void 0, "encodeURIComponent"in n ? n.encodeURIComponent : "undefined" != typeof encodeURIComponent ? encodeURIComponent : void 0, "environment"in n ? n.environment : "undefined" != typeof environment ? environment : void 0, "from"in n ? n.from : "undefined" != typeof from ? from : void 0, "type"in n ? n.type : "undefined" != typeof type ? type : void 0, "user"in n ? n.user : "undefined" != typeof user ? user : void 0),
                        r.join("")
                    }
                    ,
                    s.chat_message_text = function(e) {
                        var t, r = [], n = e || {};
                        return function(e, n, s, a, o, c, l, _, p, h, u, d, f, g) {
                            r.push("");
                            var m = "text";
                            if (r.push("<div" + i.Library.jade.runtime.attr("data-from", "" + u, !0, !1) + i.Library.jade.runtime.attr("data-date-iso", "" + l, !0, !1) + i.Library.jade.runtime.attr("data-fingerprint", "" + h, !0, !1) + i.Library.jade.runtime.attr("data-type", "" + m, !0, !1) + ' class="crisp-200">'),
                            "operator" === u) {
                                var y = e(96, g.type || u, g.user_id, g.avatar);
                                r.push("<span" + i.Library.jade.runtime.attr("style", "background-image: url('" + y + "') !important;", !0, !1) + ' class="crisp-201">'),
                                g.nickname && r.push('<span class="crisp-202"><span class="crisp-203"><span class="crisp-204"></span><span class="crisp-205 crisp-69">' + i.Library.jade.runtime.escape(null == (t = a(g.nickname)) ? "" : t) + "</span></span></span>"),
                                r.push("</span>")
                            }
                            r.push("<span" + i.Library.jade.runtime.cls(["crisp-206", "crisp-106", "operator" === u ? "crisp-11" : ""], [null, null, !0]) + "><span" + i.Library.jade.runtime.cls(["crisp-207", "crisp-69", "operator" === u ? "crisp-2" : ""], [null, null, !0]) + ">" + (null == (t = s(o)) ? "" : t)),
                            d.preview && function() {
                                var e = d.preview;
                                if ("number" == typeof e.length)
                                    for (var n = 0, s = e.length; n < s; n++) {
                                        var a = e[n];
                                        if (r.push('<span class="crisp-208">'),
                                        a.preview && a.preview.embed && a.preview.image) {
                                            var o = _(a.preview.image)
                                              , c = 600
                                              , l = 600;
                                            r.push("<a" + i.Library.jade.runtime.attr("href", "" + a.preview.embed, !0, !1) + ' target="_blank" data-type="embed"' + i.Library.jade.runtime.attr("style", "background-image: url('" + p.url.crisp_image + "/process/resize/?url=" + o + "&width=" + c + "&height=" + l + "') !important;", !0, !1) + ' class="crisp-209 crisp-209"><span class="crisp-210"></span><span class="crisp-211"></span></a>')
                                        } else {
                                            r.push("<a" + i.Library.jade.runtime.attr("href", "" + a.url, !0, !1) + ' target="_blank" data-type="link"' + i.Library.jade.runtime.cls(["crisp-209", "crisp-69", "operator" === u ? "crisp-15 crisp-2" : ""], [null, null, !0]) + ">");
                                            var h = a.title || a.website || a.url;
                                            r.push("" + i.Library.jade.runtime.escape(null == (t = h) ? "" : t) + "</a>")
                                        }
                                        r.push("</span>")
                                    }
                                else {
                                    var s = 0;
                                    for (var n in e) {
                                        s++;
                                        var a = e[n];
                                        if (r.push('<span class="crisp-208">'),
                                        a.preview && a.preview.embed && a.preview.image) {
                                            var o = _(a.preview.image)
                                              , c = 600
                                              , l = 600;
                                            r.push("<a" + i.Library.jade.runtime.attr("href", "" + a.preview.embed, !0, !1) + ' target="_blank" data-type="embed"' + i.Library.jade.runtime.attr("style", "background-image: url('" + p.url.crisp_image + "/process/resize/?url=" + o + "&width=" + c + "&height=" + l + "') !important;", !0, !1) + ' class="crisp-209 crisp-209"><span class="crisp-210"></span><span class="crisp-211"></span></a>')
                                        } else {
                                            r.push("<a" + i.Library.jade.runtime.attr("href", "" + a.url, !0, !1) + ' target="_blank" data-type="link"' + i.Library.jade.runtime.cls(["crisp-209", "crisp-69", "operator" === u ? "crisp-15 crisp-2" : ""], [null, null, !0]) + ">");
                                            var h = a.title || a.website || a.url;
                                            r.push("" + i.Library.jade.runtime.escape(null == (t = h) ? "" : t) + "</a>")
                                        }
                                        r.push("</span>")
                                    }
                                }
                            }
                            .call(this),
                            r.push("</span>"),
                            c && r.push('<span class="crisp-212"><span class="crisp-213"><span class="crisp-214"></span><span' + i.Library.jade.runtime.attr("data-date-iso", "" + l, !0, !1) + ' data-date-watch="true" class="crisp-215 crisp-69">' + i.Library.jade.runtime.escape(null == (t = c) ? "" : t) + "</span></span></span>"),
                            r.push('<span class="crisp-30"></span></span><span class="crisp-30"></span>'),
                            "visitor" === u && r.push('<span class="crisp-216"><span class="crisp-217"><span class="crisp-218"></span><span class="crisp-219 crisp-69">' + i.Library.jade.runtime.escape(null == (t = n("chat", "chat_message_info_read")) ? "" : t) + '</span><span class="crisp-30"></span></span><span class="crisp-30"></span></span>'),
                            "visitor" === u && r.push('<a href="#" class="crisp-220"><span class="crisp-221 crisp-69">' + i.Library.jade.runtime.escape(null == (t = n("chat", "chat_message_error_retry")) ? "" : t) + '</span><span class="crisp-222"></span><span class="crisp-30"></span></a>'),
                            r.push('<span class="crisp-30"></span></div>')
                        }
                        .call(this, "_a"in n ? n._a : "undefined" != typeof _a ? _a : void 0, "_e"in n ? n._e : "undefined" != typeof _e ? _e : void 0, "_f"in n ? n._f : "undefined" != typeof _f ? _f : void 0, "_n"in n ? n._n : "undefined" != typeof _n ? _n : void 0, "content"in n ? n.content : "undefined" != typeof content ? content : void 0, "date_formatted"in n ? n.date_formatted : "undefined" != typeof date_formatted ? date_formatted : void 0, "date_iso"in n ? n.date_iso : "undefined" != typeof date_iso ? date_iso : void 0, "encodeURIComponent"in n ? n.encodeURIComponent : "undefined" != typeof encodeURIComponent ? encodeURIComponent : void 0, "environment"in n ? n.environment : "undefined" != typeof environment ? environment : void 0, "fingerprint"in n ? n.fingerprint : "undefined" != typeof fingerprint ? fingerprint : void 0, "from"in n ? n.from : "undefined" != typeof from ? from : void 0, "metas"in n ? n.metas : "undefined" != typeof metas ? metas : void 0, "undefined"in n ? n.undefined : void 0, "user"in n ? n.user : "undefined" != typeof user ? user : void 0),
                        r.join("")
                    }
                    ,
                    s.chat_message_file = function(e) {
                        var t, r = [], n = e || {};
                        return function(e, n, s, a, o, c, l, _, p, h, u) {
                            r.push("");
                            var d = "file";
                            if (r.push("<div" + i.Library.jade.runtime.attr("data-from", "" + h, !0, !1) + i.Library.jade.runtime.attr("data-date-iso", "" + c, !0, !1) + i.Library.jade.runtime.attr("data-fingerprint", "" + p, !0, !1) + i.Library.jade.runtime.attr("data-type", "" + d, !0, !1) + ' class="crisp-200">'),
                            "operator" === h) {
                                var f = e(96, u.type || h, u.user_id, u.avatar);
                                r.push("<span" + i.Library.jade.runtime.attr("style", "background-image: url('" + f + "') !important;", !0, !1) + ' class="crisp-201">'),
                                u.nickname && r.push('<span class="crisp-202"><span class="crisp-203"><span class="crisp-204"></span><span class="crisp-205 crisp-69">' + i.Library.jade.runtime.escape(null == (t = s(u.nickname)) ? "" : t) + "</span></span></span>"),
                                r.push("</span>")
                            }
                            switch (r.push("<span" + i.Library.jade.runtime.cls(["crisp-206", "crisp-106", "operator" === h ? "crisp-11" : ""], [null, null, !0]) + "><span" + i.Library.jade.runtime.cls(["crisp-207", "crisp-69", "operator" === h ? "crisp-2" : ""], [null, null, !0]) + '><span class="crisp-223"><span class="crisp-224 crisp-69">'),
                            a.name ? r.push("" + i.Library.jade.runtime.escape(null == (t = a.name) ? "" : t)) : r.push(i.Library.jade.runtime.escape(null == (t = n("chat", "chat_message_file_name")) ? "" : t)),
                            r.push("</span>"),
                            a.type) {
                            case "image/jpg":
                            case "image/jpeg":
                            case "image/png":
                            case "image/gif":
                                r.push("<a" + i.Library.jade.runtime.attr("href", "" + a.url, !0, !1) + i.Library.jade.runtime.attr("data-name", "" + a.name, !0, !1) + ' class="crisp-225">');
                                var g = l(a.url)
                                  , m = 600
                                  , y = 600;
                                r.push("<span" + i.Library.jade.runtime.attr("style", "background-image: url('" + _.url.crisp_image + "/process/resize/?url=" + g + "&width=" + m + "&height=" + y + "') !important;", !0, !1) + ' class="crisp-226"></span></a>');
                                break;
                            default:
                                r.push("<a" + i.Library.jade.runtime.attr("href", "" + a.url, !0, !1) + i.Library.jade.runtime.attr("download", "" + (a.name || a.url), !0, !1) + ' target="_blank"' + i.Library.jade.runtime.cls(["crisp-227", "operator" === h ? "crisp-2 crisp-13" : ""], [null, !0]) + '><span class="crisp-228">' + i.Library.jade.runtime.escape(null == (t = n("chat", "chat_message_file_button")) ? "" : t) + "</span></a>")
                            }
                            r.push("</span></span>"),
                            o && r.push('<span class="crisp-212"><span class="crisp-213"><span class="crisp-214"></span><span' + i.Library.jade.runtime.attr("data-date-iso", "" + c, !0, !1) + ' data-date-watch="true" class="crisp-215 crisp-69">' + i.Library.jade.runtime.escape(null == (t = o) ? "" : t) + "</span></span></span>"),
                            r.push('<span class="crisp-30"></span></span><span class="crisp-30"></span>'),
                            "visitor" === h && r.push('<span class="crisp-216"><span class="crisp-217"><span class="crisp-218"></span><span class="crisp-219 crisp-69">' + i.Library.jade.runtime.escape(null == (t = n("chat", "chat_message_info_read")) ? "" : t) + '</span><span class="crisp-30"></span></span><span class="crisp-30"></span></span>'),
                            "visitor" === h && r.push('<a href="#" class="crisp-220"><span class="crisp-221 crisp-69">' + i.Library.jade.runtime.escape(null == (t = n("chat", "chat_message_error_retry")) ? "" : t) + '</span><span class="crisp-222"></span><span class="crisp-30"></span></a>'),
                            r.push('<span class="crisp-30"></span></div>')
                        }
                        .call(this, "_a"in n ? n._a : "undefined" != typeof _a ? _a : void 0, "_e"in n ? n._e : "undefined" != typeof _e ? _e : void 0, "_n"in n ? n._n : "undefined" != typeof _n ? _n : void 0, "content"in n ? n.content : "undefined" != typeof content ? content : void 0, "date_formatted"in n ? n.date_formatted : "undefined" != typeof date_formatted ? date_formatted : void 0, "date_iso"in n ? n.date_iso : "undefined" != typeof date_iso ? date_iso : void 0, "encodeURIComponent"in n ? n.encodeURIComponent : "undefined" != typeof encodeURIComponent ? encodeURIComponent : void 0, "environment"in n ? n.environment : "undefined" != typeof environment ? environment : void 0, "fingerprint"in n ? n.fingerprint : "undefined" != typeof fingerprint ? fingerprint : void 0, "from"in n ? n.from : "undefined" != typeof from ? from : void 0, "user"in n ? n.user : "undefined" != typeof user ? user : void 0),
                        r.join("")
                    }
                    ,
                    s.chat_message_animation = function(e) {
                        var t, r = [], n = e || {};
                        return function(e, n, s, a, o, c, l, _, p, h, u) {
                            r.push("");
                            var d = "animation";
                            if (r.push("<div" + i.Library.jade.runtime.attr("data-from", "" + h, !0, !1) + i.Library.jade.runtime.attr("data-date-iso", "" + c, !0, !1) + i.Library.jade.runtime.attr("data-fingerprint", "" + p, !0, !1) + i.Library.jade.runtime.attr("data-type", "" + d, !0, !1) + ' class="crisp-200">'),
                            "operator" === h) {
                                var f = e(96, u.type || h, u.user_id, u.avatar);
                                r.push("<span" + i.Library.jade.runtime.attr("style", "background-image: url('" + f + "') !important;", !0, !1) + ' class="crisp-201">'),
                                u.nickname && r.push('<span class="crisp-202"><span class="crisp-203"><span class="crisp-204"></span><span class="crisp-205 crisp-69">' + i.Library.jade.runtime.escape(null == (t = s(u.nickname)) ? "" : t) + "</span></span></span>"),
                                r.push("</span>")
                            }
                            r.push("<span" + i.Library.jade.runtime.cls(["crisp-206", "crisp-106", "operator" === h ? "crisp-11" : ""], [null, null, !0]) + "><span" + i.Library.jade.runtime.cls(["crisp-207", "crisp-69", "operator" === h ? "crisp-2" : ""], [null, null, !0]) + ">");
                            var g = a.url.match(/^(?:https?:)?(?:\/\/)?([^\/\?]+)/)[1]
                              , m = l(a.url);
                            r.push("<span" + i.Library.jade.runtime.attr("data-source", g ? g : null, !0, !1) + ' class="crisp-229"><span' + i.Library.jade.runtime.attr("style", "background-image: url('" + _.url.crisp_image + "/process/original/?url=" + m + "') !important;", !0, !1) + ' class="crisp-230"><span class="crisp-231"><span class="crisp-232"></span></span></span></span></span>'),
                            o && r.push('<span class="crisp-212"><span class="crisp-213"><span class="crisp-214"></span><span' + i.Library.jade.runtime.attr("data-date-iso", "" + c, !0, !1) + ' data-date-watch="true" class="crisp-215 crisp-69">' + i.Library.jade.runtime.escape(null == (t = o) ? "" : t) + "</span></span></span>"),
                            r.push('<span class="crisp-30"></span></span><span class="crisp-30"></span>'),
                            "visitor" === h && r.push('<span class="crisp-216"><span class="crisp-217"><span class="crisp-218"></span><span class="crisp-219 crisp-69">' + i.Library.jade.runtime.escape(null == (t = n("chat", "chat_message_info_read")) ? "" : t) + '</span><span class="crisp-30"></span></span><span class="crisp-30"></span></span>'),
                            "visitor" === h && r.push('<a href="#" class="crisp-220"><span class="crisp-221 crisp-69">' + i.Library.jade.runtime.escape(null == (t = n("chat", "chat_message_error_retry")) ? "" : t) + '</span><span class="crisp-222"></span><span class="crisp-30"></span></a>'),
                            r.push('<span class="crisp-30"></span></div>')
                        }
                        .call(this, "_a"in n ? n._a : "undefined" != typeof _a ? _a : void 0, "_e"in n ? n._e : "undefined" != typeof _e ? _e : void 0, "_n"in n ? n._n : "undefined" != typeof _n ? _n : void 0, "content"in n ? n.content : "undefined" != typeof content ? content : void 0, "date_formatted"in n ? n.date_formatted : "undefined" != typeof date_formatted ? date_formatted : void 0, "date_iso"in n ? n.date_iso : "undefined" != typeof date_iso ? date_iso : void 0, "encodeURIComponent"in n ? n.encodeURIComponent : "undefined" != typeof encodeURIComponent ? encodeURIComponent : void 0, "environment"in n ? n.environment : "undefined" != typeof environment ? environment : void 0, "fingerprint"in n ? n.fingerprint : "undefined" != typeof fingerprint ? fingerprint : void 0, "from"in n ? n.from : "undefined" != typeof from ? from : void 0, "user"in n ? n.user : "undefined" != typeof user ? user : void 0),
                        r.join("")
                    }
                    ,
                    s.chat_bubble_composing = function(e) {
                        var t = [];
                        return t.push('<div class="crisp-233"><span class="crisp-234 crisp-11"><span class="crisp-235 crisp-10"></span><span class="crisp-235 crisp-10"></span><span class="crisp-235 crisp-10"></span></span><span class="crisp-30"></span></div>'),
                        t.join("")
                    }
                    ,
                    s.chat_bubble_thread = function(e) {
                        var t, r = [], n = e || {};
                        return function(e, n, s, a) {
                            r.push("<div" + i.Library.jade.runtime.attr("data-day", "" + (e || "none"), !0, !1) + i.Library.jade.runtime.attr("data-month", "" + (n || "none"), !0, !1) + i.Library.jade.runtime.attr("data-year", "" + (a || "none"), !0, !1) + ' class="crisp-236">'),
                            s && r.push('<div class="crisp-237"><span class="crisp-238 crisp-39">' + i.Library.jade.runtime.escape(null == (t = s) ? "" : t) + "</span></div>"),
                            r.push('<div class="crisp-239"></div></div>')
                        }
                        .call(this, "day"in n ? n.day : "undefined" != typeof day ? day : void 0, "month"in n ? n.month : "undefined" != typeof month ? month : void 0, "title"in n ? n.title : "undefined" != typeof title ? title : void 0, "year"in n ? n.year : "undefined" != typeof year ? year : void 0),
                        r.join("")
                    }
                    ,
                    s.chat_bubble_group = function(e) {
                        var t = []
                          , r = e || {};
                        return function(e, r) {
                            t.push("<div" + i.Library.jade.runtime.attr("data-from", "" + e, !0, !1) + i.Library.jade.runtime.attr("data-user-marker", "" + r, !0, !1) + ' class="crisp-240"></div>')
                        }
                        .call(this, "from"in r ? r.from : "undefined" != typeof from ? from : void 0, "user_marker"in r ? r.user_marker : "undefined" != typeof user_marker ? user_marker : void 0),
                        t.join("")
                    }
                    ,
                    s.chat_picker_gif_item = function(e) {
                        var t = [];
                        return t.push('<a href="#" data-removable="true" data-loading="true" class="crisp-101 crisp-13 crisp-20"></a>'),
                        t.join("")
                    }
                    ,
                    this.logger = r.Console,
                    this.dom = r.cash,
                    this.crisp = {
                        web: r.CrispLibraryWeb,
                        client: r.CrispLibraryClient
                    },
                    this.jade = {
                        runtime: r.jade,
                        client: s
                    },
                    this.__extends()
                } catch (t) {
                    this.logger.error(this.ns + "." + e, t)
                }
            }
            return e.prototype.__extends = function() {
                var e = "__extends";
                try {
                    this.__extend_dom()
                } catch (t) {
                    this.logger.error(this.ns + "." + e, t)
                }
            }
            ,
            e.prototype.__extend_dom = function() {
                var e = "__extend_dom";
                try {
                    this.dom.fn.extend({
                        safe_css_text: function(e, t) {
                            return e ? t ? (this.each(function(r) {
                                r.style.cssText = e + ": " + t + " !important;"
                            }),
                            this) : this[0].style.cssText : void this.each(function(e) {
                                e.style.cssText = ""
                            })
                        }
                    })
                } catch (t) {
                    this.logger.error(this.ns + "." + e, t)
                }
            }
            ,
            e
        }());
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        }
        : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
        ;
        t.Utility = new (function() {
            function e() {
                var e = "constructor";
                try {
                    this.ns = "CrispUtility",
                    this.__page_url_regex = /^(?:https?:[\/]*)?([^\/]+)([^#]*)?(?:[\/]+)?(?:#.*)?$/i
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            return e.prototype.is_empty = function(e) {
                var r = "is_empty"
                  , i = !0;
                try {
                    this.keys(e).length > 0 && (i = !1)
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                } finally {
                    return i
                }
            }
            ,
            e.prototype.is_equal = function(e, i) {
                var n = "is_equal"
                  , s = !0;
                try {
                    var a = -1
                      , o = void 0
                      , c = void 0;
                    if (("undefined" == typeof e ? "undefined" : r(e)) !== ("undefined" == typeof i ? "undefined" : r(i)))
                        s = !1;
                    else if (e && "object" === ("undefined" == typeof e ? "undefined" : r(e)) && i && "object" === ("undefined" == typeof i ? "undefined" : r(i)))
                        for (e instanceof Array || i instanceof Array ? (c = this.union(e, i),
                        e.length === c.length && i.length === c.length || (s = !1)) : c = this.union(this.keys(e), this.keys(i)); ++a < c.length && s === !0; )
                            o = c[a],
                            s = this.is_equal(e[o], i[o]);
                    else
                        s = e === i && !0
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + n, e)
                } finally {
                    return s
                }
            }
            ,
            e.prototype.keys = function(e) {
                var i = "keys"
                  , n = [];
                try {
                    "object" === ("undefined" == typeof e ? "undefined" : r(e)) && e && (n = Object.keys(e))
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + i, e)
                } finally {
                    return n
                }
            }
            ,
            e.prototype.clone = function(e) {
                var i = "clone"
                  , n = void 0;
                try {
                    var s = void 0
                      , a = void 0;
                    n = Array.isArray(e) ? [] : {};
                    for (s in e)
                        a = e[s],
                        n[s] = "object" === ("undefined" == typeof a ? "undefined" : r(a)) ? this.clone(a) : a
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + i, e)
                } finally {
                    return n
                }
            }
            ,
            e.prototype.intersect = function(e, r) {
                var i = "intersect"
                  , n = [];
                try {
                    for (var s = 0; s < e.length; s++)
                        r.indexOf(e[s]) !== -1 && n.push(e[s])
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + i, e)
                } finally {
                    return n
                }
            }
            ,
            e.prototype.union = function(e, r) {
                var i = "union"
                  , n = [];
                try {
                    for (var s = 0; s < e.length; s++)
                        n.indexOf(e[s]) === -1 && n.push(e[s]);
                    for (var a = 0; a < r.length; a++)
                        n.indexOf(r[a]) === -1 && n.push(r[a])
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + i, e)
                } finally {
                    return n
                }
            }
            ,
            e.prototype.extract = function(e, r) {
                var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ""
                  , n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1
                  , s = "extract"
                  , a = r || i || "";
                try {
                    var o = (r || "").trim().match(e);
                    a = o && o[n] ? o[n] : i || ""
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + s, e)
                } finally {
                    return a
                }
            }
            ,
            e.prototype.compare_rule = function(e, r) {
                var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "."
                  , n = "compare_rule"
                  , s = !1;
                try {
                    s = r.indexOf("*") !== -1 ? new RegExp("^" + r.split("*").join(i + "*") + "$").test(e) && !0 : e === r && !0
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + n, e)
                } finally {
                    return s
                }
            }
            ,
            e.prototype.compare_rules = function(e, r) {
                var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "."
                  , n = "compare_rules"
                  , s = !1;
                try {
                    for (var a = 0; a < r.length && s !== !0; )
                        s = this.compare_rule(e, r[a], i),
                        a++
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + n, e)
                } finally {
                    return s
                }
            }
            ,
            e.prototype.compare_page_rules = function(e, r) {
                var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null
                  , n = "compare_page_rules"
                  , s = !1;
                try {
                    if (r.length > 0) {
                        var a = void 0
                          , o = [];
                        null === i && (i = t.Base._website_domain);
                        for (var c = 0; c < r.length; c++) {
                            var l = (r[c] || "").trim();
                            l ? (a = l.match(this.__page_url_regex),
                            a ? o.push("" + a[1] + (a[2] || "/")) : o.push("" + i + l)) : t.Library.logger.warn(this.ns + "." + n, "Parsed page URL: " + identifier + " is not valid: " + r[c])
                        }
                        var _ = e.match(this.__page_url_regex)
                          , p = _ ? "" + _[1] + (_[2] || "/") : null;
                        this.compare_rules(p, o, match_group = "[^/]") === !0 && (s = !0)
                    }
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + n, e)
                } finally {
                    return s
                }
            }
            ,
            e
        }()),
        t.Feature = new (function() {
            function e() {
                var e = "constructor";
                try {
                    this.ns = "CrispFeature",
                    this.__has_screen_touch = this.__has_window_property("ontouchstart"),
                    this.__has_device_vibrate = this.__has_navigator_property("vibrate"),
                    this.__has_css_animations = this.__has_css_support_for("animation"),
                    this.__html_audio_format = this.__detect_html_audio_support()
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            return e.prototype.has_screen_touch = function() {
                var e = "has_screen_touch";
                try {
                    return this.__has_screen_touch
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype.has_device_vibrate = function() {
                var e = "has_device_vibrate";
                try {
                    return this.__has_device_vibrate
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype.has_css_animations = function() {
                var e = "has_css_animations";
                try {
                    return this.__has_css_animations
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype.has_html_audio = function() {
                var e = "has_html_audio";
                try {
                    return null !== this.__html_audio_format && !0
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype.html_audio_format = function() {
                var e = "html_audio_format";
                try {
                    return this.__html_audio_format
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype.__has_window_property = function(e) {
                var r = "__has_window_property"
                  , i = !1;
                try {
                    i = !!(e in window)
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                } finally {
                    return i
                }
            }
            ,
            e.prototype.__has_navigator_property = function(e) {
                var r = "__has_navigator_property"
                  , i = !1;
                try {
                    i = !!(e in window.navigator)
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                } finally {
                    return i
                }
            }
            ,
            e.prototype.__has_css_support_for = function(e) {
                var r = "__has_css_support_for"
                  , i = !1;
                try {
                    var n = document.documentElement.style
                      , s = ["Khtml", "Ms", "O", "Moz", "Webkit"]
                      , a = s.length;
                    if (e in n)
                        i = !0;
                    else
                        for (e = e.replace(/^[a-z]/, function(e) {
                            return e.toUpperCase()
                        }); a--; )
                            if (s[a] + e in n) {
                                i = !0;
                                break
                            }
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                } finally {
                    return i
                }
            }
            ,
            e.prototype.__detect_html_audio_support = function() {
                var e = "__detect_html_audio_support"
                  , r = null;
                try {
                    var i = document.createElement("audio")
                      , n = !(!i.canPlayType || !i.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, ""))
                      , s = !(!i.canPlayType || !i.canPlayType('audio/mp4; codecs="mp4a.40.2"').replace(/no/, ""))
                      , a = !(!i.canPlayType || !i.canPlayType("audio/mpeg;").replace(/no/, ""));
                    n === !0 ? r = "oga" : s === !0 ? r = "m4a" : a === !0 && (r = "mp3")
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                } finally {
                    return r
                }
            }
            ,
            e
        }());
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        }
        : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
        ;
        t.Action = new (function() {
            function e() {
                var e = "constructor";
                try {
                    this.ns = "CrispAction",
                    this._events = ["session:loaded", "chat:initiated", "chat:opened", "chat:closed", "message:sent", "message:received", "message:compose:sent", "message:compose:received", "user:email:changed", "website:availability:changed"],
                    this.__event_register = {}
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            return e.prototype.do_chat_open = function() {
                t.Chat._is_initialized === !0 ? t.Chat.Interface._maximize() : t.Minimized.Interface._pane_open_handler()
            }
            ,
            e.prototype.do_chat_close = function() {
                t.Chat._is_initialized === !0 && t.Chat.Interface._minimize()
            }
            ,
            e.prototype.do_chat_toggle = function() {
                this.is_chat_closed() === !0 ? this.do_chat_open() : this.do_chat_close()
            }
            ,
            e.prototype.do_chat_show = function() {
                this.is_chat_hidden() === !0 && null !== t.Base._container_sel && (t.Base._container_sel.safe_css_text(null),
                t.Chat.Interface._apply_dynamic_sizing_properties())
            }
            ,
            e.prototype.do_chat_hide = function() {
                this.is_chat_visible() === !0 && null !== t.Base._container_sel && t.Base._container_sel.safe_css_text("display", "none")
            }
            ,
            e.prototype.do_message_send = function(e, i) {
                switch (e) {
                case "text":
                    if ("string" != typeof i || !i)
                        throw new Error("Invalid text message");
                    t.Library.crisp.client.Message.send_text_message(i);
                    break;
                case "file":
                    if ("object" !== ("undefined" == typeof i ? "undefined" : r(i)) || !i.name || !i.url || !i.type)
                        throw new Error("Invalid file message");
                    t.Library.crisp.client.Message.send_file_message(i.name, i.url, i.type);
                    break;
                case "animation":
                    if ("object" !== ("undefined" == typeof i ? "undefined" : r(i)) || !i.url || !i.type)
                        throw new Error("Invalid animation message");
                    t.Library.crisp.client.Message.send_animation_message(i.url, i.type)
                }
            }
            ,
            e.prototype.do_session_reset = function() {
                var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                t.Library.crisp.client.Session.clear(),
                e !== !1 && document.location.reload(!1)
            }
            ,
            e.prototype.do_trigger_run = function(e) {
                if (t.Trigger._run(e) !== !0)
                    throw new Error("Trigger does not exist")
            }
            ,
            e.prototype.is_chat_opened = function() {
                return !(t.Chat.Interface._is_maximized !== !0 || t.Chat._is_initialized !== !0)
            }
            ,
            e.prototype.is_chat_closed = function() {
                return this.is_chat_opened() === !1 && !0
            }
            ,
            e.prototype.is_chat_visible = function() {
                return this.is_chat_hidden() === !1 && !0
            }
            ,
            e.prototype.is_chat_hidden = function() {
                return (null === t.Base._container_sel || "none" === t.Base._container_sel.css("display")) && !0
            }
            ,
            e.prototype.is_chat_small = function() {
                return t.Base._is_full_view() === !1 && !0
            }
            ,
            e.prototype.is_chat_large = function() {
                return this.is_chat_small() === !1 && !0
            }
            ,
            e.prototype.is_website_available = function() {
                return t.Availability._users_available && !0
            }
            ,
            e.prototype.get_message_text = function() {
                return t.Chat.Selector.get("form_textarea_message").val() || ""
            }
            ,
            e.prototype.get_session_identifier = function() {
                return t.Broker._session_id || null
            }
            ,
            e.prototype.get_session_data = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                return t.Library.crisp.client.Session.get_data(e) || null
            }
            ,
            e.prototype.get_user_email = function() {
                return t.Library.crisp.client.Session.get_email() || null
            }
            ,
            e.prototype.get_user_nickname = function() {
                return t.Library.crisp.client.Session.get_nickname() || null
            }
            ,
            e.prototype.set_message_text = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                if ("string" != typeof e)
                    throw new Error("Invalid message text");
                var r = t.Chat.Selector.get("form_textarea_message");
                r && (r.val(e),
                r.trigger("keypress"))
            }
            ,
            e.prototype.set_session_data = function(e, r) {
                if ("string" != typeof e)
                    throw new Error("Invalid data key");
                if ("string" != typeof r && "boolean" != typeof r && "number" != typeof r)
                    throw new Error("Invalid data value");
                t.Library.crisp.client.Session.set_data(e, r)
            }
            ,
            e.prototype.set_user_email = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                if (!e || !t.Validate.is_email(e))
                    throw new Error("Invalid email");
                t.Library.crisp.client.Session.set_email(e),
                t.Chat._is_initialized === !0 && t.Chat.Alert._update({
                    email_form: "lock",
                    wait_reply: "show"
                }),
                this._event("user:email:changed", e)
            }
            ,
            e.prototype.set_user_nickname = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                if ("string" != typeof e || !e)
                    throw new Error("Invalid nickname");
                t.Library.crisp.client.Session.set_nickname(e)
            }
            ,
            e.prototype._on_event = function(e, t) {
                if ("function" != typeof t)
                    throw new Error("Handler must be a function");
                this.__event_register[e] = t
            }
            ,
            e.prototype._off_event = function(e) {
                "undefined" != typeof this.__event_register[e] && delete this.__event_register[e]
            }
            ,
            e.prototype._event = function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
                if (this._events.indexOf(e) === -1)
                    throw new Error("Event namespace not recognized: " + e);
                if ("function" == typeof this.__event_register[e])
                    try {
                        this.__event_register[e].apply(window, t instanceof Array ? t : "undefined" != typeof t ? [t] : [])
                    } catch (e) {}
            }
            ,
            e.prototype._unstack_pending = function() {
                var e = "_unstack_pending";
                try {
                    var r = t.Base._dollar_crisp.__spool.pending_actions;
                    if (r && r.length > 0) {
                        for (var i = 0; i < r.length; i++)
                            try {
                                t.Pipeline.push(r[i])
                            } catch (r) {
                                t.Library.logger.error(this.ns + "." + e + ":action", r)
                            }
                        t.Library.logger.info(this.ns + "." + e, "Unstacked " + r.length + " pending actions"),
                        delete t.Base._dollar_crisp.__spool.pending_actions
                    }
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e
        }()),
        t.Pipeline = new (function() {
            function e() {
                var e = "constructor";
                try {
                    this.ns = "CrispPipeline",
                    this.__safe_mode = !1
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            return e.prototype.push = function(e) {
                e[0] && e[1] && "function" == typeof this[e[0]] && this[e[0]](e[1], e[2] || [])
            }
            ,
            e.prototype.get = function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
                return this.__pipe_target("get", e, this.__args(t))
            }
            ,
            e.prototype.set = function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
                return this.__pipe_target("set", e, this.__args(t))
            }
            ,
            e.prototype.is = function(e) {
                return this.__pipe_target("is", e)
            }
            ,
            e.prototype.do = function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
                return this.__pipe_target("do", e, this.__args(t))
            }
            ,
            e.prototype.on = function(e, t) {
                return this.__pipe_event("on", e, [e, t])
            }
            ,
            e.prototype.off = function(e) {
                return this.__pipe_event("off", e, [e])
            }
            ,
            e.prototype.safe = function() {
                var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                if ("boolean" != typeof e)
                    throw new Error("Safe mode value must be 'true' or 'false'.");
                this.__safe_mode = e
            }
            ,
            e.prototype.help = function() {
                var e = [];
                for (var r in t.Action)
                    "_" !== r[0] && "function" == typeof t.Action[r] && e.push("$crisp." + r.replace("_", "('").replace(/_/g, ":") + "')");
                for (var i = ["on", "off"], n = 0; n < i.length; n++)
                    for (var s = 0; s < t.Action._events.length; s++)
                        e.push("$crisp." + i[n] + "('" + t.Action._events[s] + "')");
                return e
            }
            ,
            e.prototype.__args = function(e) {
                return e ? e instanceof Array ? e : [e] : []
            }
            ,
            e.prototype.__pipe_target = function(e, r) {
                var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
                try {
                    var n = e + "_" + (r || "").replace(/:/g, "_");
                    if ("function" == typeof t.Action[n])
                        return t.Action[n].apply(t.Action, i);
                    this.__namespace_error(r)
                } catch (e) {
                    if (this.__safe_mode !== !0)
                        throw e
                }
            }
            ,
            e.prototype.__pipe_event = function(e, r) {
                var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
                try {
                    var n = "_" + e + "_event";
                    if ("function" != typeof t.Action[n])
                        throw new Error("No such event method for action: " + e);
                    if (t.Action._events.indexOf(r) !== -1)
                        return t.Action[n].apply(t.Action, i);
                    this.__namespace_error(r)
                } catch (e) {
                    if (this.__safe_mode !== !0)
                        throw e
                }
            }
            ,
            e.prototype.__namespace_error = function(e) {
                throw new Error("No such namespace: " + e + " - Call $crisp.help() for a list of available actions.")
            }
            ,
            e
        }()),
        t.Validate = new (function() {
            function e() {
                var e = "constructor";
                try {
                    this.ns = "CrispValidate",
                    this.__email_regex = /^((\S+)@(\S+\.\S+))$/
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            return e.prototype.is_email = function(e) {
                var r = "is_email"
                  , i = !1;
                try {
                    e.match(this.__email_regex) && (i = !0)
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                } finally {
                    return i
                }
            }
            ,
            e
        }()),
        t.Date = new (function() {
            function e() {
                var e = "constructor";
                try {
                    this.ns = "CrispDate",
                    this.__watch_interval = 15,
                    this.__days_map = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
                    this.__months_map = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"],
                    this.__second_in_milliseconds = 1e3,
                    this.__minutes_in_hour = 60,
                    this.__hours_in_day = 24,
                    this.__seconds_in_minute = 60,
                    this.__seconds_in_hour = this.__minutes_in_hour * this.__seconds_in_minute,
                    this.__seconds_in_day = this.__hours_in_day * this.__seconds_in_hour
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            return e.prototype.timestamp_to_iso = function(e) {
                var r = "timestamp_to_iso";
                try {
                    return new Date(e).toISOString()
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.iso_to_timestamp = function(e) {
                var r = "iso_to_timestamp";
                try {
                    return new Date(e).getTime()
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.timestamp_to_properties = function(e) {
                var r = "timestamp_to_properties"
                  , i = {
                    day: null,
                    month: null,
                    year: null,
                    title: null
                };
                try {
                    if (e > 0) {
                        var n = new Date(e)
                          , s = t.Locale.text("days", this.__days_map[n.getDay()])
                          , a = t.Locale.text("months", this.__months_map[n.getMonth()]);
                        i.day = "" + n.getDate(),
                        i.month = "" + (n.getMonth() + 1),
                        i.year = "" + n.getFullYear(),
                        i.title = s + ", " + n.getDate() + " " + a,
                        (new Date).getYear() !== n.getYear() && (i.title += " (" + i.year + ")")
                    }
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                } finally {
                    return i
                }
            }
            ,
            e.prototype.seconds_in_timestamp = function(e) {
                var r = "seconds_in_timestamp"
                  , i = 0;
                try {
                    if (isNaN(e))
                        throw new Error("Timestamp is not a number");
                    i = Math.floor(parseInt(e, 10) / this.__second_in_milliseconds)
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                } finally {
                    return i
                }
            }
            ,
            e.prototype.now = function() {
                var e = "now";
                try {
                    return (new Date).toISOString()
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype.timestamp = function() {
                var e = "timestamp";
                try {
                    return (new Date).getTime()
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype.difference = function(e, r) {
                var i = "difference"
                  , n = -1;
                try {
                    var s = this.iso_to_timestamp(e)
                      , a = this.iso_to_timestamp(r);
                    n = s - a
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + i, e)
                } finally {
                    return n
                }
            }
            ,
            e.prototype.equal = function(e, r) {
                var i = "equal"
                  , n = !1;
                try {
                    n = 0 === this.difference(e, r) && !0
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + i, e)
                } finally {
                    return n
                }
            }
            ,
            e.prototype.format_date = function(e) {
                var r = "format_date"
                  , i = null;
                try {
                    var n = new Date
                      , s = new Date(e)
                      , a = n.getTime() - s.getTime()
                      , o = this.__render_select(a);
                    o.type || (o.type = "far_away",
                    o.data = {
                        date_full: ["" + this.__pad(s.getDate()), "/" + this.__pad(s.getMonth() + 1), "/" + s.getFullYear()].join("")
                    });
                    var c = t.Library.dom(t.Template.render("date_" + o.type, o.data));
                    if (i = c.text(),
                    !i)
                        throw new Error("Empty parsed date for ISO string: " + e)
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                } finally {
                    return i
                }
            }
            ,
            e.prototype.format_duration = function(e) {
                var r = "format_duration"
                  , i = null;
                try {
                    var n = this.__render_select(e);
                    n.type || (n.type = "days");
                    var s = t.Library.dom(t.Template.render("duration_" + n.type, n.data));
                    if (i = s.text(),
                    !i)
                        throw new Error("Empty parsed duration for duration: " + e)
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                } finally {
                    return i
                }
            }
            ,
            e.prototype.watch = function() {
                var e = this
                  , r = "watch";
                try {
                    t.Library.logger.debug(this.ns + "." + r, "Watch trigger scheduled in " + this.__watch_interval + " seconds"),
                    setTimeout(function() {
                        try {
                            null !== t.Base._container_sel && (t.Base._container_sel.find('[data-date-iso][data-date-watch="true"]').each(function(e, r, i) {
                                var n = i.eq(r)
                                  , s = n.attr("data-date-iso")
                                  , a = n.attr("data-date-format")
                                  , o = t.Date.format_date(s);
                                a && (o = t.Library.crisp.web.Parse.replace(a, [o.toLowerCase()])),
                                n.text(o)
                            }),
                            t.Library.logger.debug(e.ns + "." + r, "Updated dates and durations in DOM"),
                            e.watch())
                        } catch (i) {
                            t.Library.logger.error(e.ns + "." + r + ":timeout", i)
                        }
                    }, this.__watch_interval * this.__second_in_milliseconds)
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__render_select = function(e) {
                var r = "__render_select"
                  , i = {};
                try {
                    var n = Math.round(e / this.__second_in_milliseconds);
                    n < 10 ? i.type = "now" : n < this.__seconds_in_minute ? i.type = "seconds" : n < this.__seconds_in_hour ? (i.type = "minutes",
                    i.data = {
                        minutes: Math.floor(n / this.__seconds_in_minute)
                    }) : n < this.__seconds_in_day && (i.type = "hours",
                    i.data = {
                        hours: Math.floor(n / this.__seconds_in_hour)
                    })
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                } finally {
                    return i
                }
            }
            ,
            e.prototype.__pad = function(e) {
                var r = "__pad"
                  , i = "" + e;
                try {
                    if (isNaN(e))
                        throw i = "00",
                        new Error("Not a number: " + e);
                    "number" != typeof e && (e = parseInt(e, 10)),
                    e < 10 && (i = "0" + e)
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                } finally {
                    return i
                }
            }
            ,
            e
        }()),
        t.Theme = new (function() {
            function e() {
                var e = "constructor";
                try {
                    this.ns = "CrispTheme",
                    this.__color_hex_regex = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i,
                    this.__color_hex_to_number_base = 16,
                    this.__default_color = "default",
                    this.__available_colors = {
                        default: {
                            10: "#f5f8fb",
                            100: "#bbdefb",
                            200: "#a6c5db",
                            300: "#6193bc",
                            500: "#298ee8",
                            700: "#2e88d3",
                            800: "#288ade",
                            900: "#2271b3",
                            reverse: "#ffffff"
                        },
                        red: {
                            10: "#fafafa",
                            100: "#ffcdd2",
                            200: "#a6c5db",
                            300: "#a46a6a",
                            500: "#f44336",
                            700: "#d32f2f",
                            800: "#e33e32",
                            900: "#b71c1c",
                            reverse: "#ffffff"
                        },
                        pink: {
                            10: "#fafafa",
                            100: "#f8bbd0",
                            200: "#a6c5db",
                            300: "#b66a84",
                            500: "#e91e63",
                            700: "#c2185b",
                            800: "#da1457",
                            900: "#880e4f",
                            reverse: "#ffffff"
                        },
                        purple: {
                            10: "#fafafa",
                            100: "#e1bee7",
                            200: "#a6c5db",
                            300: "#937099",
                            500: "#9c27b0",
                            700: "#7b1fa2",
                            800: "#9121a4",
                            900: "#4a148c",
                            reverse: "#ffffff"
                        },
                        deep_purple: {
                            10: "#fafafa",
                            100: "#d1c4e9",
                            200: "#a6c5db",
                            300: "#786699",
                            500: "#673ab7",
                            700: "#512da8",
                            800: "#6336b3",
                            900: "#311b92",
                            reverse: "#ffffff"
                        },
                        indigo: {
                            10: "#fafafa",
                            100: "#c5cae9",
                            200: "#a6c5db",
                            300: "#697099",
                            500: "#3f51b5",
                            700: "#303f9f",
                            800: "#394aaa",
                            900: "#1a237e",
                            reverse: "#ffffff"
                        },
                        blue: {
                            10: "#f5f8fb",
                            100: "#bbdefb",
                            200: "#a6c5db",
                            300: "#6193bc",
                            500: "#298ee8",
                            700: "#2e88d3",
                            800: "#288ade",
                            900: "#2271b3",
                            reverse: "#ffffff"
                        },
                        light_blue: {
                            10: "#fafafa",
                            100: "#b3e5fc",
                            200: "#a6c5db",
                            300: "#628da1",
                            500: "#07a6ed",
                            700: "#0288d1",
                            800: "#069fe4",
                            900: "#01579b",
                            reverse: "#ffffff"
                        },
                        cyan: {
                            10: "#fafafa",
                            100: "#b2ebf2",
                            200: "#a6c5db",
                            300: "#6ca7ae",
                            500: "#00adc3",
                            700: "#0093a3",
                            800: "#00a1b6",
                            900: "#006064",
                            reverse: "#ffffff"
                        },
                        teal: {
                            10: "#fafafa",
                            100: "#b2dfdb",
                            200: "#a6c5db",
                            300: "#638c88",
                            500: "#009688",
                            700: "#00796b",
                            800: "#018a7d",
                            900: "#004d40",
                            reverse: "#ffffff"
                        },
                        green: {
                            10: "#fafafa",
                            100: "#c8e6c9",
                            200: "#a6c5db",
                            300: "#719873",
                            500: "#4caf50",
                            700: "#388e3c",
                            800: "#47a74b",
                            900: "#1b5e20",
                            reverse: "#ffffff"
                        },
                        light_green: {
                            10: "#fafafa",
                            100: "#dcedc8",
                            200: "#a6c5db",
                            300: "#839a68",
                            500: "#84bc44",
                            700: "#689f38",
                            800: "#80b840",
                            900: "#407f28",
                            reverse: "#ffffff"
                        },
                        amber: {
                            10: "#fafafa",
                            100: "#ffecb3",
                            200: "#a6c5db",
                            300: "#8a7b4e",
                            500: "#e8b10c",
                            700: "#e69308",
                            800: "#e3ad0c",
                            900: "#ed7112",
                            reverse: "#ffffff"
                        },
                        orange: {
                            10: "#fafafa",
                            100: "#ffe0b2",
                            200: "#a6c5db",
                            300: "#bf9b64",
                            500: "#ff9800",
                            700: "#f57c00",
                            800: "#f59302",
                            900: "#e65100",
                            reverse: "#ffffff"
                        },
                        deep_orange: {
                            10: "#fafafa",
                            100: "#ffccbc",
                            200: "#a6c5db",
                            300: "#ad8073",
                            500: "#ff5722",
                            700: "#e64a19",
                            800: "#ec4c1a",
                            900: "#bf360c",
                            reverse: "#ffffff"
                        },
                        brown: {
                            10: "#fafafa",
                            100: "#d7ccc8",
                            200: "#a6c5db",
                            300: "#8a695e",
                            500: "#795548",
                            700: "#5d4037",
                            800: "#6b4a40",
                            900: "#3e2723",
                            reverse: "#ffffff"
                        },
                        grey: {
                            10: "#fafafa",
                            100: "#757575",
                            200: "#a6c5db",
                            300: "#635d5d",
                            500: "#7d7d7d",
                            700: "#616161",
                            800: "#767676",
                            900: "#4d4d4d",
                            reverse: "#ffffff"
                        },
                        blue_grey: {
                            10: "#fafafa",
                            100: "#cfd8dc",
                            200: "#a6c5db",
                            300: "#7f949f",
                            500: "#607d8b",
                            700: "#455a64",
                            800: "#516771",
                            900: "#263238",
                            reverse: "#ffffff"
                        },
                        black: {
                            10: "#fafafa",
                            100: "#757575",
                            200: "#a6c5db",
                            300: "#3c3c3c",
                            500: "#282828",
                            700: "#252525",
                            800: "#202020",
                            900: "#161616",
                            reverse: "#ffffff"
                        }
                    }
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            return e.prototype.colors = function() {
                var e = "colors"
                  , r = {};
                try {
                    var i = void 0
                      , n = void 0;
                    i = t.Plugin.get_customization("color", "chatbox"),
                    n = this.__available_colors[t.Base._website_configuration.chat.theme] || this.__available_colors[this.__default_color],
                    this.__filter_colors_map_with_defaults(i, n);
                    for (var s in i)
                        r[s] = {
                            hex: i[s],
                            rgba: this.__generate_color_rgba.bind(this, i[s])
                        }
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                } finally {
                    return r
                }
            }
            ,
            e.prototype.__filter_colors_map_with_defaults = function(e, r) {
                var i = "__filter_colors_map_with_defaults";
                try {
                    for (var n in r)
                        e[n] || (e[n] = r[n])
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + i, e)
                }
            }
            ,
            e.prototype.__generate_color_rgba = function(e) {
                var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1
                  , i = "__generate_color_rgba"
                  , n = "rgba(0, 0, 0, 1)";
                try {
                    var s = [0, 0, 0]
                      , a = e.match(this.__color_hex_regex);
                    a && (s[0] = parseInt(a[1], this.__color_hex_to_number_base),
                    s[1] = parseInt(a[2], this.__color_hex_to_number_base),
                    s[2] = parseInt(a[3], this.__color_hex_to_number_base)),
                    n = "rgba(" + (s[0] + ", ") + (s[1] + ", ") + (s[2] + ", ") + ("" + r) + ")"
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + i, e)
                } finally {
                    return n
                }
            }
            ,
            e
        }()),
        t.Plugin = new (function() {
            function e() {
                var e = "constructor";
                try {
                    this.ns = "CrispPlugin"
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            return e.prototype.get_triggers = function() {
                var e = "get_triggers"
                  , r = {};
                try {
                    r = (((t.Base._website_configuration.plugins || {})["urn:crisp.im:triggers:0"] || {}).settings || {}).triggers || {}
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                } finally {
                    return r
                }
            }
            ,
            e.prototype.get_customization = function(e, r) {
                var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null
                  , n = "get_customization"
                  , s = null;
                try {
                    s = ((((t.Base._website_configuration.plugins || {})["urn:crisp.im:customization:0"] || {}).settings || {})[e] || {})[r] || {},
                    i && (s = s[i] || null)
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + n, e)
                } finally {
                    return s
                }
            }
            ,
            e
        }()),
        t.Sound = new (function() {
            function e() {
                var e = "constructor";
                try {
                    this.ns = "CrispSound",
                    this.__vibration_duration = 200,
                    this.__is_playback_allowed = !0,
                    this.__active_subsets = {}
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            return e.prototype.allow = function() {
                var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0]
                  , r = "allow";
                try {
                    this.__is_playback_allowed = e
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.initialize = function(e) {
                var r = this
                  , i = "initialize";
                try {
                    if (this.__is_playback_allowed === !1)
                        return void t.Library.logger.warn(this.ns + "." + i, "Playback not allowed");
                    if ("undefined" == typeof this.__active_subsets[e]) {
                        var n = t.Feature.html_audio_format()
                          , s = t.Library.dom(t.Template.render("sounds_" + e, {
                            selected_format: n,
                            url_assets: t.Base._url_assets,
                            client_revision: t.Base._client_revision
                        }));
                        this.__active_subsets[e] = {
                            subset: s,
                            names: {}
                        },
                        s.find(".crisp-50").each(function(t, i, n) {
                            var s = n.eq(i)
                              , a = s.attr("data-name");
                            r.__active_subsets[e].names[a] = s
                        }),
                        t.Base._container_sel.append(s),
                        t.Library.logger.debug(this.ns + "." + i, "Initialized subset " + e)
                    }
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + i, e)
                }
            }
            ,
            e.prototype.start = function(e, r) {
                var i = "start";
                try {
                    if (this.__is_playback_allowed === !1)
                        return void t.Library.logger.warn(this.ns + "." + i, "Playback not allowed");
                    if (t.Feature.has_device_vibrate() === !0 && window.navigator.vibrate(this.__vibration_duration),
                    t.Feature.has_html_audio() === !0) {
                        this.initialize(e);
                        var n = this.__active_subsets[e];
                        if ("undefined" == typeof n)
                            throw new Error("Subset does not exist: " + e);
                        var s = n.names[r];
                        if ("undefined" == typeof s)
                            throw new Error("Sound does not exist: " + r + " in subset " + e);
                        s[0].paused || s[0].pause(),
                        0 !== s[0].currentTime && (s[0].currentTime = 0),
                        s[0].load(),
                        s[0].play(),
                        t.Library.logger.debug(this.ns + "." + i, "Started sound named " + r + " in subset " + e)
                    }
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + i, e)
                }
            }
            ,
            e.prototype.stop = function(e, r) {
                var i = "stop";
                try {
                    if (this.__is_playback_allowed === !1)
                        return void t.Library.logger.warn(this.ns + "." + i, "Playback not allowed");
                    if (t.Feature.has_html_audio() === !0) {
                        var n = this.__active_subsets[e];
                        if ("undefined" == typeof n)
                            throw new Error("Subset does not exist: " + e);
                        var s = n.names[r];
                        if ("undefined" == typeof s)
                            throw new Error("Sound does not exist: " + r + " in subset " + e);
                        s[0].paused || (s[0].pause(),
                        0 !== s[0].currentTime && (s[0].currentTime = 0),
                        t.Library.logger.debug(this.ns + "." + i, "Stopped sound named " + r + " in subset " + e))
                    }
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + i, e)
                }
            }
            ,
            e.prototype.__is_supported = function() {
                var e = "__is_supported";
                try {
                    return t.Feature.has_html_audio()
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e
        }());
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        }
        : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
        ;
        t.Locale = new (function() {
            function e() {
                var e = "constructor";
                try {
                    this.ns = "CrispLocale",
                    this.__default_locale = "en",
                    this.__available_locales = ["ar", "az", "bg", "bn", "cs", "da", "de", "en", "es", "fa", "fi", "fr", "he", "id", "is", "it", "jp", "lt", "ms", "nl", "no", "pl", "pt-br", "pt-pt", "ro", "ru", "sk", "sr-cyrl-cs", "sr", "sv", "th", "tr", "vi", "zh-tw", "zh"],
                    this.__allowed_locales = this.__available_locales,
                    this.__data = null
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            return e.prototype.detect = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []
                  , r = "detect"
                  , i = this.__default_locale;
                try {
                    var n = void 0
                      , s = void 0
                      , a = !1
                      , o = []
                      , c = [];
                    for (e.length && (this.__allowed_locales = t.Utility.intersect(e, this.__available_locales),
                    this.__allowed_locales.length > 0 && this.__allowed_locales.indexOf(i) === -1 && (i = this.__default_locale = this.__allowed_locales[0])),
                    o = navigator.languages ? navigator.languages : [navigator.language || navigator.userLanguage],
                    n = 0; n < o.length; n++)
                        s = o[n],
                        s && (c.push(s.toLowerCase()),
                        s.indexOf("-") !== -1 && (s = s.split("-")[0],
                        s && c.push(s.toLowerCase())));
                    for (n = 0; n < c.length; n++)
                        if (this.__allowed_locales.indexOf(c[n]) !== -1) {
                            i = c[n],
                            a = !0;
                            break
                        }
                    a === !0 ? t.Library.logger.info(this.ns + "." + r, "Detected user language: " + i) : t.Library.logger.warn(this.ns + "." + r, "No user language supported, fallback to default: " + i)
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                } finally {
                    return i
                }
            }
            ,
            e.prototype.load = function(e, r) {
                var i = this
                  , n = "load";
                try {
                    (function() {
                        var s = e;
                        i.__allowed_locales.indexOf(e) === -1 && (s = i.__default_locale,
                        t.Library.logger.warn(i.ns + "." + n, "Unsupported locale requested: " + e)),
                        null === i.__data ? (t.Library.logger.debug(i.ns + "." + n, "Loading locale: " + s + "..."),
                        t.Base._load_dependency("locale", "locales/" + s + ".js", function(e) {
                            try {
                                i.__handle_locale_injection(s, e, r)
                            } catch (e) {
                                t.Library.logger.error(i.ns + "." + n + ":load", e)
                            }
                        })) : t.Library.logger.warn(i.ns + "." + n, "Locale already loaded")
                    })()
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + n, e)
                }
            }
            ,
            e.prototype.name = function() {
                var e = "name"
                  , r = null;
                try {
                    if (null === this.__data)
                        throw new Error("Cannot get locale name, locale data not loaded");
                    r = this.__data._meta.locale_name
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                } finally {
                    return r
                }
            }
            ,
            e.prototype.code = function() {
                var e = "code"
                  , r = null;
                try {
                    if (null === this.__data)
                        throw new Error("Cannot get locale code, locale data not loaded");
                    r = this.__data._meta.locale_code
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                } finally {
                    return r
                }
            }
            ,
            e.prototype.direction = function() {
                var e = "direction"
                  , r = null;
                try {
                    if (null === this.__data)
                        throw new Error("Cannot get locale direction, locale data not loaded");
                    r = this.__data._meta.locale_direction
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                } finally {
                    return r
                }
            }
            ,
            e.prototype.text = function(e, i) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : []
                  , s = "text"
                  , a = null;
                try {
                    var o = void 0
                      , c = void 0;
                    if ("object" === ("undefined" == typeof i ? "undefined" : r(i)) ? (o = i[0],
                    c = i[1]) : o = c = i,
                    null === this.__data)
                        throw new Error("Cannot get locale text, locale data not loaded");
                    if ("undefined" == typeof this.__data._strings[e])
                        throw new Error("Locale text group not found: " + e);
                    if ("undefined" == typeof this.__data._strings[e][c])
                        throw new Error("Locale text namespace not found in group: " + (c + " in " + e));
                    a = t.Plugin.get_customization("text", e, o) || this.__data._strings[e][c],
                    a = t.Library.crisp.web.Parse.replace(a, n),
                    a = this.__convert_to_iso(a)
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + s, e)
                } finally {
                    return a
                }
            }
            ,
            e.prototype.__handle_locale_injection = function(e, i, n) {
                var s = "__handle_locale_injection"
                  , a = null;
                try {
                    if (null !== this.__data)
                        throw new Error("Locale has already been loaded (double requested handled?)");
                    if ("object" !== ("undefined" == typeof i ? "undefined" : r(i)))
                        throw new Error("Did not receive a proper locale data file");
                    if (i._meta.locale_code !== e)
                        throw new Error("Received a mismatching locale code, expected: " + e);
                    t.Library.logger.debug(this.ns + "." + s, "Done loading locale: " + e),
                    this.__data = i,
                    "function" == typeof n && n()
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + s, e)
                } finally {
                    return a
                }
            }
            ,
            e.prototype.__convert_to_iso = function(e) {
                var r = "__convert_to_iso"
                  , i = null;
                try {
                    try {
                        i = decodeURIComponent(escape(e))
                    } catch (t) {
                        i = e
                    }
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                } finally {
                    return i
                }
            }
            ,
            e
        }()),
        t.Avatar = new (function() {
            function e() {
                var e = "constructor";
                try {
                    this.ns = "CrispAvatar",
                    this.__active_operators_maximum = 3
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            return e.prototype.url = function(e, r, i, n) {
                var s = "url"
                  , a = "";
                try {
                    a = n ? t.Base._url_image + "/process/thumbnail/?url=" + encodeURIComponent(n) + ("&width=" + e + "&height=" + e) + ("&" + t.Base._website_configuration.website.avatar_buster) : t.Base._url_image + "/avatar/" + r + "/" + ((i || "default") + "/" + e + "/") + ("?" + t.Base._website_configuration.website.avatar_buster)
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + s, e)
                } finally {
                    return a
                }
            }
            ,
            e.prototype.active_operators = function(e, r) {
                var i = "active_operators"
                  , n = [];
                try {
                    var s = r.website.active_operators;
                    if (s.length > 0)
                        for (var a = 0; a < s.length; a++)
                            a < this.__active_operators_maximum && n.push({
                                type: "operator",
                                identifier: s[a].user_id,
                                avatar: s[a].avatar,
                                name: t.Library.crisp.web.Name.parse_first_name(s[a].nickname)
                            });
                    else
                        n.push({
                            type: "website",
                            identifier: e,
                            name: r.website.name
                        })
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + i, e)
                } finally {
                    return n
                }
            }
            ,
            e
        }());
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        }
        : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
        ;
        t.Template = new (function() {
            function e() {
                var e = "constructor";
                try {
                    this.ns = "CrispTemplate"
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            return e.prototype.render = function(e) {
                var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                  , n = "render"
                  , s = "";
                try {
                    if ("function" != typeof t.Library.jade.client[e])
                        throw new Error("No such template: " + e);
                    if ("object" !== ("undefined" == typeof i ? "undefined" : r(i)))
                        throw new Error("Object argument is not an object");
                    i._e = t.Locale.text.bind(t.Locale),
                    i._f = t.Library.crisp.web.Parse.format.bind(t.Library.crisp.web.Parse),
                    i._n = t.Library.crisp.web.Name.parse_first_name.bind(t.Library.crisp.web.Name),
                    i._a = t.Avatar.url.bind(t.Avatar),
                    s = t.Library.jade.client[e](i).trim(),
                    t.Library.logger.debug(this.ns + "." + n, "Generated template for: " + e)
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + n, e)
                } finally {
                    return s
                }
            }
            ,
            e
        }()),
        t.Broker = new (function() {
            function e() {
                var e = "constructor";
                try {
                    this.ns = "CrispBroker",
                    this.__maximum_session_create_retry = 1,
                    this._default_session_configuration = {
                        chat: {
                            locale: "en",
                            theme: "default",
                            theme_text: "default",
                            theme_welcome: "default",
                            tile: "default",
                            blocked_pages: [],
                            blocked_locales: [],
                            last_operator_face: !1,
                            activity_metrics: !0,
                            availability_tooltip: !0,
                            hide_on_away: !1,
                            position_reverse: !1,
                            email_visitors: !0,
                            force_identify: !1
                        },
                        website: {
                            name: "",
                            domain: "",
                            avatar_buster: 1,
                            active_operators: []
                        },
                        plugins: []
                    },
                    this.__domain_regex = /^(?:https?:[\/]*)?([^\/]+)(?:\/.*)?$/i,
                    this._session_id = null,
                    this.__newly_created_session = !1,
                    this.__newly_joined_session = !0,
                    this.__initialization_sequence_step = 0,
                    this.__count_session_create_retry = 0,
                    this.__response_ids_spool = {}
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            return e.prototype.init = function(e, r, i, n, s, a, o, c, l, _, p, h) {
                var u = "init";
                try {
                    t.Library.logger.debug(this.ns + "." + u, "Initialize"),
                    t.Library.crisp.client.init({
                        environment: e,
                        url_relay: r,
                        url_go: i,
                        website_domain: n,
                        website_id: s,
                        token_id: a,
                        page_url: o,
                        page_title: c,
                        page_referrer: l,
                        useragent: _,
                        timezone: p,
                        locales: h
                    }),
                    this.__event_session_created(),
                    this.__event_session_joined(),
                    this.__event_session_state(),
                    this.__event_session_error(),
                    this.__event_session_request_initiate(),
                    this.__event_website_users_available(),
                    this.__event_message_received(),
                    this.__event_message_received_local(),
                    this.__event_message_send(),
                    this.__event_message_sent(),
                    this.__event_message_compose_received(),
                    this.__event_message_compose_send(),
                    this.__event_message_acknowledge_pending(),
                    this.__event_message_acknowledge_read_send(),
                    this.__event_message_acknowledge_read_received(),
                    this.__event_history_message_received(),
                    this.__event_history_message_sent(),
                    this.__event_browsing_request_initiate(),
                    this.__event_bucket_url_upload_generate(),
                    this.__event_bucket_url_upload_generated(),
                    this.__event_media_animation_list(),
                    this.__event_media_animation_listed(),
                    this.__event_storage_sync_update(),
                    this.__event_storage_sync_updated(),
                    this.__event_issue_report()
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + u, e)
                }
            }
            ,
            e.prototype.__event_session_created = function() {
                var e = this
                  , r = "__event_session_created";
                try {
                    t.Library.crisp.client.event.subscribe("session:created", function(i, n) {
                        t.Library.logger.info(e.ns + "." + r + ":event", n),
                        n.error ? (t.Library.logger.warn(e.ns + "." + r + ":event", "Session could not be created from server"),
                        "invalid_website_id" === n.error && t.Locale.load(e._default_session_configuration.chat.locale, function() {
                            t.Base.spawn_client(e._default_session_configuration),
                            t.Minimized.init(is_initial = !1, is_unauthorized = !0)
                        })) : n.session_id ? e.__newly_created_session = !0 : t.Library.logger.error(e.ns + "." + r + ":event", "Unrecognized session creation error")
                    })
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__event_session_joined = function() {
                var e = this
                  , r = "__event_session_joined";
                try {
                    t.Library.crisp.client.event.subscribe("session:joined", function(i, n) {
                        t.Library.logger.debug(e.ns + "." + r + ":event", n),
                        n.error ? (t.Library.logger.warn(e.ns + "." + r + ":event", "Session could not be joined from server"),
                        "invalid_session" === n.error && (++e.__count_session_create_retry <= e.__maximum_session_create_retry ? (t.Library.logger.info(e.ns + "." + r + ":event", "Flushing local session..."),
                        t.Library.crisp.client.Session.clear(function() {
                            t.Library.logger.info(e.ns + "." + r + ":event", "Flushed local session, trying to create a new one..."),
                            t.Library.crisp.client.Session.create()
                        }, function() {
                            t.Library.logger.warn(e.ns + "." + r + ":event", "Error flushing local session")
                        })) : t.Library.logger.warn(e.ns + "." + r + ":event", "Not flushing local session (retries limit reached)"))) : (e._session_id = n.session_id || null,
                        e.__newly_joined_session === !0 ? function() {
                            e.__newly_joined_session = !1;
                            var r = {
                                website: {
                                    name: n.website || "",
                                    domain: t.Utility.extract(e.__domain_regex, n.domain, t.Base._website_domain, 1),
                                    avatar_buster: n.avatar_buster || 1,
                                    active_operators: n.active_operators || [],
                                    response_metrics: n.response_metrics || {}
                                },
                                plugins: n.plugins,
                                chat: {
                                    locale: t.Locale.detect(n.settings.locale ? [n.settings.locale] : []),
                                    theme: n.settings.color_theme || "default",
                                    blocked_pages: n.settings.blocked_pages || [],
                                    blocked_locales: n.settings.blocked_locales || [],
                                    tile: "string" == typeof n.settings.tile ? n.settings.tile : "default",
                                    last_operator_face: "boolean" == typeof n.settings.last_operator_face && n.settings.last_operator_face,
                                    activity_metrics: "boolean" != typeof n.settings.activity_metrics || n.settings.activity_metrics,
                                    availability_tooltip: "boolean" != typeof n.settings.availability_tooltip || n.settings.availability_tooltip,
                                    hide_on_away: "boolean" == typeof n.settings.hide_on_away && n.settings.hide_on_away,
                                    position_reverse: "boolean" == typeof n.settings.position_reverse && n.settings.position_reverse,
                                    email_visitors: "boolean" != typeof n.settings.email_visitors || n.settings.email_visitors,
                                    force_identify: "boolean" == typeof n.settings.force_identify && n.settings.force_identify,
                                    theme_text: n.settings.text_theme || "default",
                                    theme_welcome: n.settings.welcome_message || "default"
                                }
                            };
                            t.Locale.load(r.chat.locale, function() {
                                t.Base.spawn_client(r),
                                t.Library.crisp.client.Website.get_users_available()
                            })
                        }() : t.Library.logger.warn(e.ns + "." + r, "Recovered session from network reconnect, not joining it again"))
                    })
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__event_session_state = function() {
                var e = this
                  , r = "__event_session_state";
                try {
                    t.Library.crisp.client.event.subscribe("session:state", function(i, n) {
                        t.Library.logger.debug(e.ns + "." + r + ":event", n),
                        1 === e.__initialization_sequence_step && (e.__initialization_sequence_step++,
                        t.Library.logger.info(e.ns + "." + r + ":event", "Initialization sequence finished")),
                        t.Chat._is_initialized === !1 ? (t.Utility.is_empty(n) ? (t.Minimized.init(is_initial = e.__newly_created_session),
                        t.Library.crisp.client.Session.get_request_initiate()) : t.Chat.init(n = n),
                        t.Base._trigger_session_loaded()) : t.Chat._is_initialized === !0 && t.Chat.State.receive(n)
                    })
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__event_session_error = function() {
                var e = this
                  , r = "__event_session_error";
                try {
                    t.Library.crisp.client.event.subscribe("session:error", function(i, n) {
                        switch (t.Library.logger.debug(e.ns + "." + r + ":event", i, n),
                        n.type) {
                        case "email:invalid_format":
                        case "email:domain_not_found":
                            t.Chat.Selector.get("alerts_email_form_input").val(n.value),
                            t.Chat.Selector.get("alerts_email_form").attr("data-error", "true"),
                            t.Chat.Alert._update({
                                warn_reply: "hide",
                                wait_reply: "hide",
                                email_invalid: "show"
                            });
                            break;
                        default:
                            t.Library.logger.warn(e.ns + "." + r + ":event", "Got an unrecognized session error type: " + n.type)
                        }
                    })
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__event_session_request_initiate = function() {
                var e = this
                  , r = "__event_session_request_initiate";
                try {
                    t.Library.crisp.client.event.subscribe("session:request:initiate", function(i, n) {
                        t.Library.logger.debug(e.ns + "." + r + ":event", n)
                    })
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__event_website_users_available = function() {
                var e = this
                  , r = "__event_website_users_available";
                try {
                    t.Library.crisp.client.event.subscribe("website:users:available", function(i, n) {
                        t.Library.logger.debug(e.ns + "." + r + ":event", n),
                        t.Availability.receive(n),
                        0 === e.__initialization_sequence_step ? (e.__initialization_sequence_step++,
                        t.Library.crisp.client.Session.get_state()) : t.Availability.apply()
                    })
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__event_message_received = function() {
                var e = this
                  , r = "__event_message_received";
                try {
                    t.Library.crisp.client.event.subscribe("message:received", function(i, n) {
                        t.Library.logger.debug(e.ns + "." + r + ":event", n),
                        e.__handle_message_received(n)
                    })
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__event_message_received_local = function() {
                var e = this
                  , r = "__event_message_received_local";
                try {
                    t.Library.crisp.client.event.subscribe("message:received:local", function(i, n) {
                        t.Library.logger.debug(e.ns + "." + r + ":event", n),
                        e.__handle_message_received(n)
                    })
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__event_message_send = function() {
                var e = this
                  , r = "__event_message_send";
                try {
                    t.Library.crisp.client.event.subscribe("message:send", function(i, n) {
                        t.Library.logger.debug(e.ns + "." + r + ":event", n),
                        t.Chat._is_initialized === !0 && t.Chat.Message.sent(n)
                    })
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__event_message_sent = function() {
                var e = this
                  , r = "__event_message_sent";
                try {
                    t.Library.crisp.client.event.subscribe("message:sent", function(i, n) {
                        t.Library.logger.debug(e.ns + "." + r + ":event", n),
                        t.Chat._is_initialized === !0 && t.Chat.Message.sent_acknowledgement(n),
                        t.Action._event("message:sent", n)
                    })
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__event_message_compose_send = function() {
                var e = this
                  , r = "__event_message_compose_send";
                try {
                    t.Library.crisp.client.event.subscribe("message:compose:send", function(i, n) {
                        t.Library.logger.debug(e.ns + "." + r + ":event", n),
                        t.Action._event("message:compose:sent", n)
                    })
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__event_message_acknowledge_pending = function() {
                var e = this
                  , r = "__event_message_acknowledge_pending";
                try {
                    t.Library.crisp.client.event.subscribe("message:acknowledge:pending", function(i, n) {
                        t.Library.logger.debug(e.ns + "." + r + ":event", n)
                    })
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__event_message_acknowledge_read_send = function() {
                var e = this
                  , r = "__event_message_acknowledge_read_send";
                try {
                    t.Library.crisp.client.event.subscribe("message:acknowledge:read:send", function(i, n) {
                        t.Library.logger.debug(e.ns + "." + r + ":event", n),
                        t.Chat.Message._acknowledge_read_send(n)
                    })
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__event_message_acknowledge_read_received = function() {
                var e = this
                  , r = "__event_message_acknowledge_read_received";
                try {
                    t.Library.crisp.client.event.subscribe("message:acknowledge:read:received", function(i, n) {
                        t.Library.logger.debug(e.ns + "." + r + ":event", n)
                    })
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__event_message_compose_received = function() {
                var e = this
                  , r = "__event_message_compose_received";
                try {
                    t.Library.crisp.client.event.subscribe("message:compose:received", function(i, n) {
                        if (t.Library.logger.debug(e.ns + "." + r + ":event", n),
                        t.Chat._is_initialized === !0)
                            switch (n.type) {
                            case "start":
                                t.Chat.Message._show_compose(n.timestamp);
                                break;
                            case "stop":
                                t.Chat.Message._hide_compose()
                            }
                        t.Action._event("message:compose:received", n)
                    })
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__event_history_message_received = function() {
                var e = this
                  , r = "__event_history_message_received";
                try {
                    t.Library.crisp.client.event.subscribe("history:message:received", function(i, n) {
                        t.Library.logger.debug(e.ns + "." + r + ":event", n),
                        t.Chat._is_initialized === !0 && t.Chat.Message.received_from_history(n)
                    })
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__event_history_message_sent = function() {
                var e = this
                  , r = "__event_history_message_sent";
                try {
                    t.Library.crisp.client.event.subscribe("history:message:sent", function(i, n) {
                        t.Library.logger.debug(e.ns + "." + r + ":event", n),
                        t.Chat._is_initialized === !0 && t.Chat.Message.sent_from_history(n)
                    })
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__event_browsing_request_initiate = function() {
                var e = this
                  , r = "__event_browsing_request_initiate";
                try {
                    t.Library.crisp.client.event.subscribe("browsing:request:initiate", function(i, n) {
                        t.Library.logger.debug(e.ns + "." + r + ":event", n),
                        t.Base._load_dependency("browsing", "browsing.js", function(i) {
                            try {
                                t.Library.crisp.client.Browsing.init({
                                    resume: n.resume || !1,
                                    deps: {
                                        tree_mirror: i.TreeMirrorClient
                                    }
                                })
                            } catch (i) {
                                t.Library.logger.error(e.ns + "." + r + ":load", i)
                            }
                        })
                    })
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__event_bucket_url_upload_generate = function() {
                var e = this
                  , r = "__event_bucket_url_upload_generate";
                try {
                    t.Library.crisp.client.event.subscribe("bucket:url:upload:generate", function(i, n) {
                        t.Library.logger.debug(e.ns + "." + r + ":event", n),
                        e.__response_ids_spool.bucket_url_upload_generate = n.id
                    })
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__event_bucket_url_upload_generated = function() {
                var e = this
                  , r = "__event_bucket_url_upload_generated";
                try {
                    t.Library.crisp.client.event.subscribe("bucket:url:upload:generated", function(i, n) {
                        if (t.Library.logger.debug(e.ns + "." + r + ":event", n),
                        e.__response_ids_spool.bucket_url_upload_generate === n.id) {
                            var s = t.Chat.Selector.get("form_button_attach").attr("data-state");
                            "preparing" === s ? t.Chat.Selector.get("form_attach").attr("data-action", n.url.signed).attr("data-resource", n.url.resource).attr("data-size-limit", n.policy.size_limit).trigger("event:attach") : t.Library.logger.warn(e.ns + "." + r, "Dropped file upload trigger because state is already: " + s)
                        } else
                            t.Library.logger.warn(e.ns + "." + r, "Dropped file upload trigger because ID does not match with spool: " + n.id)
                    })
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__event_media_animation_list = function() {
                var e = this
                  , r = "__event_media_animation_list";
                try {
                    t.Library.crisp.client.event.subscribe("media:animation:list", function(i, n) {
                        t.Library.logger.debug(e.ns + "." + r + ":event", n),
                        e.__response_ids_spool.media_animation_list = n.id
                    })
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__event_media_animation_listed = function() {
                var e = this
                  , r = "__event_media_animation_listed";
                try {
                    t.Library.crisp.client.event.subscribe("media:animation:listed", function(i, n) {
                        t.Library.logger.debug(e.ns + "." + r + ":event", n),
                        e.__response_ids_spool.media_animation_list === n.id ? t.Chat.Picker._handle_data_gif(n.results) : t.Library.logger.warn(e.ns + "." + r, "Dropped media animation list because ID does not match with spool: " + n.id)
                    })
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__event_storage_sync_update = function() {
                var e = this
                  , r = "__event_storage_sync_update";
                try {
                    t.Library.crisp.client.event.subscribe("storage:sync:update", function(i, n) {
                        t.Library.logger.debug(e.ns + "." + r + ":event", n)
                    })
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__event_storage_sync_updated = function() {
                var e = this
                  , r = "__event_storage_sync_updated";
                try {
                    t.Library.crisp.client.event.subscribe("storage:sync:updated", function(i, n) {
                        t.Library.logger.debug(e.ns + "." + r + ":event", n)
                    })
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__event_issue_report = function() {
                var e = this
                  , r = "__event_issue_report";
                try {
                    t.Library.crisp.client.event.subscribe("issue:report", function(i, n) {
                        t.Library.logger.debug(e.ns + "." + r + ":event", n)
                    })
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__handle_message_received = function(e) {
                var r = "__handle_message_received";
                try {
                    t.Chat._start_minimized();
                    var i = "network" === e.origin && !0;
                    t.Chat.Message.received(e, with_sounds = i, with_animations = i, with_scroll = !0, is_locally_generated = !1),
                    t.Action._event("message:received", e)
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e
        }()),
        t.Availability = new (function() {
            function e() {
                var e = "constructor";
                try {
                    this.ns = "CrispAvailability",
                    this._users_available = !1
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            return e.prototype.init = function() {
                var e = "init";
                try {
                    t.Library.logger.debug(this.ns + "." + e, "Initialize")
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype.receive = function(e) {
                var r = "receive";
                try {
                    this._users_available = e,
                    t.Action._event("website:availability:changed", this._users_available),
                    t.Library.logger.info(this.ns + "." + r, "Received new availability, stored changes: " + e)
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.apply = function() {
                var e = "apply";
                try {
                    var r = this._users_available === !0 ? "online" : "away";
                    null !== t.Base._container_sel && t.Base._container_sel.attr("data-availability", r),
                    t.Library.logger.info(this.ns + "." + e, "Applied availability: " + this._users_available)
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e
        }()),
        t.Trigger = new (function() {
            function e() {
                var e = "constructor";
                try {
                    this.ns = "CrispTrigger",
                    this.__second_in_milliseconds = 1e3,
                    this._processed = [],
                    this.__triggers = null,
                    this.__readiness_ensured = !1,
                    this.__event_mouse_inside = !1,
                    this.__event_mouse_defer = null,
                    this.__event_mouse_top_margin = 10
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            return e.prototype.init = function(e) {
                var r = "init";
                try {
                    t.Library.logger.debug(this.ns + "." + r, "Initialize"),
                    this.__triggers = e,
                    this.__listen()
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype._run = function(e) {
                var r = "_run"
                  , i = !1;
                try {
                    var n = (this.__triggers || {})[e];
                    n && n.enabled === !0 && (this.__actions(e, n),
                    i = !0)
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                } finally {
                    return i
                }
            }
            ,
            e.prototype.__listen = function() {
                var e = "__listen";
                try {
                    var r = void 0
                      , i = void 0
                      , n = void 0
                      , s = void 0;
                    for (var a in this.__triggers)
                        if (r = this.__triggers[a],
                        r.enabled === !0) {
                            if (i = r.events)
                                for (var o in i)
                                    n = i[o],
                                    n.enabled === !0 ? (s = this["__event_" + o],
                                    "function" == typeof s ? (s.bind(this)(a, r, n.settings || {}),
                                    t.Library.logger.info(this.ns + "." + e, "Attached " + o + " event listener for trigger: " + a)) : t.Library.logger.error(this.ns + "." + e, "Did not attach " + o + " event listener for trigger: " + (a + " because: no such event listener"))) : t.Library.logger.debug(this.ns + "." + e, "Did not attach " + o + " event listener for trigger: " + (a + " because: not enabled"));
                            t.Library.logger.debug(this.ns + "." + e, "Processed trigger: " + a + " (" + r.name + ")")
                        } else
                            t.Library.logger.debug(this.ns + "." + e, "Ignored trigger: " + a + " (" + r.name + ") because: not enabled")
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype.__actions = function(e, r) {
                var i = this
                  , n = "__actions";
                try {
                    if (this.__satisfy_preconditions() === !0) {
                        if (this._processed.indexOf(e) === -1) {
                            var s = t.Utility.clone(this._processed);
                            s.push(e),
                            this.__ensure_ready(),
                            t.Chat.State.propagate("trigger", s, force = !1, function(s) {
                                if (s === !0 && i.__satisfy_preconditions() === !0) {
                                    if (r.actions) {
                                        var a = void 0
                                          , o = void 0;
                                        for (var c in r.actions)
                                            a = r.actions[c],
                                            a.enabled === !0 ? (o = i["__action_" + c],
                                            "function" == typeof o ? (o.bind(i)(e, a.settings || {}),
                                            t.Library.logger.info(i.ns + "." + n, "Executed " + c + " action for trigger: " + e)) : t.Library.logger.error(i.ns + "." + n, "Did not execute " + c + " action for trigger: " + (e + " because: no such action processor"))) : t.Library.logger.debug(i.ns + "." + n, "Did not execute " + c + " action for trigger: " + (e + " because: not enabled"))
                                    }
                                    t.Library.logger.debug(i.ns + "." + n, "Processed all actions for trigger: " + e + " " + ("(" + r.name + ")"))
                                }
                            })
                        }
                    } else
                        t.Library.logger.debug(this.ns + "." + n, "Did not process actions for trigger: " + e + " " + ("(" + r.name + ") because: trigger actions bypassed"))
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + n, e)
                }
            }
            ,
            e.prototype.__ensure_ready = function() {
                var e = "__ensure_ready";
                try {
                    this.__readiness_ensured !== !0 && (this.__readiness_ensured = !0,
                    t.Chat._start_minimized())
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype.__satisfy_preconditions = function() {
                var e = "__satisfy_preconditions"
                  , r = !1;
                try {
                    r = t.Action.is_website_available() === !0 && t.Base._is_blocked_page !== !0 && t.Base._is_blocked_locale !== !0 && t.Chat.Message._has_messages !== !0 && !0
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                } finally {
                    return r
                }
            }
            ,
            e.prototype.__generate_settings_after = function(e) {
                var r = "__generate_settings_after"
                  , i = 100;
                try {
                    e && e.after && e.after > 0 && (i = e.after * this.__second_in_milliseconds)
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                } finally {
                    return i
                }
            }
            ,
            e.prototype.__event_delay = function(e, r, i) {
                var n = this
                  , s = "__event_delay";
                try {
                    i.after && i.after > 0 && setTimeout(function() {
                        n.__actions(e, r)
                    }, this.__generate_settings_after(i))
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + s, e)
                }
            }
            ,
            e.prototype.__event_leave = function(e, r, i) {
                var n = this
                  , s = "__event_leave";
                try {
                    window.addEventListener("mouseout", function(a) {
                        try {
                            n.__event_mouse_inside === !0 && !a.relatedTarget && !a.toElement && a.clientY <= n.__event_mouse_top_margin && (n.__event_mouse_inside = !1,
                            null === n.__event_mouse_defer && (n.__event_mouse_defer = setTimeout(function() {
                                n.__actions(e, r)
                            }, n.__generate_settings_after(i))))
                        } catch (e) {
                            t.Library.logger.error(n.ns + "." + s + ":mouseout", e)
                        }
                    }),
                    window.addEventListener("mouseover", function() {
                        try {
                            n.__event_mouse_inside !== !0 && (n.__event_mouse_inside = !0,
                            null !== n.__event_mouse_defer && (clearTimeout(n.__event_mouse_defer),
                            n.__event_mouse_defer = null))
                        } catch (e) {
                            t.Library.logger.error(n.ns + "." + s + ":mouseover", e)
                        }
                    })
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + s, e)
                }
            }
            ,
            e.prototype.__event_link = function(e, r, i) {
                var n = this
                  , s = "__event_link";
                try {
                    i.ids && i.ids.length > 0 && document.addEventListener("click", function(a) {
                        try {
                            a && a.target && "a" === (a.target.nodeName || "").toLowerCase() && i.ids.indexOf(a.target.id) !== -1 && setTimeout(function() {
                                n.__actions(e, r)
                            }, n.__generate_settings_after(i))
                        } catch (e) {
                            t.Library.logger.error(n.ns + "." + s + ":click", e)
                        }
                    })
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + s, e)
                }
            }
            ,
            e.prototype.__event_page = function(e, r, i) {
                var n = this
                  , s = "__event_page";
                try {
                    if (i.urls && i.urls.length > 0) {
                        var a = t.Utility.compare_page_rules(t.Base._page_url, i.urls);
                        a === !0 && setTimeout(function() {
                            n.__actions(e, r)
                        }, this.__generate_settings_after(i))
                    }
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + s, e)
                }
            }
            ,
            e.prototype.__action_message = function(e, r) {
                var i = "__action_message";
                try {
                    if (r) {
                        var n = (r[t.Locale.code()] || r.default || "").trim();
                        if (n) {
                            var s = t.Base._website_configuration.website.active_operators || []
                              , a = {
                                source: "trigger"
                            };
                            s[0] ? (a.user_id = s[0].user_id,
                            a.nickname = s[0].nickname,
                            s[0].avatar && (a.avatar = s[0].avatar)) : (a.type = "website",
                            a.user_id = t.Base._website_id,
                            a.nickname = t.Base._website_configuration.website.name),
                            t.Library.crisp.client.Message.receive_message_local("text", n, a)
                        }
                    }
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + i, e)
                }
            }
            ,
            e.prototype.__action_open = function(e, r) {
                var i = "__action_open";
                try {
                    t.Action.do_chat_open()
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + i, e)
                }
            }
            ,
            e.prototype.__action_sound = function(e, r) {
                var i = "__action_sound";
                try {
                    t.Sound.start("events", "chat-message-receive")
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + i, e)
                }
            }
            ,
            e
        }()),
        t.Base = new (function() {
            function e() {
                var e = "constructor";
                try {
                    this.ns = "CrispBase",
                    this._client_sel = null,
                    this._container_sel = null,
                    this.__full_view_width_threshold = 560,
                    this.__small_view_height_threshold = 640,
                    this.__large_view_height_threshold = 780,
                    this.__insert_check_every = 1e3,
                    this.__issue_report_interval_limit = 1e4,
                    this.__website_context_protocol = "http:",
                    this._is_initialized = !1,
                    this._website_configuration = {},
                    this._dollar_crisp = null,
                    this._project_name = null,
                    this._url_relay = null,
                    this._url_website = null,
                    this._url_go = null,
                    this._url_image = null,
                    this._url_assets = null,
                    this._client_environment = null,
                    this._client_revision = null,
                    this._website_domain = null,
                    this._website_id = null,
                    this._token_id = null,
                    this._page_url = null,
                    this._page_title = null,
                    this._page_referrer = null,
                    this._browser_useragent = null,
                    this._browser_timezone = null,
                    this._browser_locales = null,
                    this._is_blocked_page = !1,
                    this._is_blocked_locale = !1,
                    this._ready_trigger = null,
                    this._runtime_configuration = {},
                    this.__issue_report_last_date = 0
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            return e.prototype.init = function(e) {
                var r = "init";
                try {
                    this._is_initialized === !1 ? (t.Library.logger.debug(this.ns + "." + r, "Initialize"),
                    this._dollar_crisp = e.dollar_crisp || null,
                    this._project_name = e.project_name || null,
                    this._url_relay = e.url_relay || null,
                    this._url_website = e.url_website || null,
                    this._url_go = e.url_go || null,
                    this._url_image = e.url_image || null,
                    this._url_assets = e.url_assets || null,
                    this._client_environment = e.client_environment || null,
                    this._client_revision = e.client_revision || null,
                    this._website_domain = e.website_domain || null,
                    this._website_id = e.website_id || null,
                    this._token_id = e.token_id || null,
                    this._page_url = e.page_url || null,
                    this._page_title = e.page_title || null,
                    this._page_referrer = e.page_referrer || null,
                    this._browser_useragent = e.browser_useragent || null,
                    this._browser_timezone = e.browser_timezone || null,
                    this._browser_locales = e.browser_locales || null,
                    this._ready_trigger = e.ready_trigger || null,
                    this._runtime_configuration = e.runtime_configuration || {},
                    t.Broker.init(this._client_environment, this._url_relay, this._url_go, this._website_domain, this._website_id, this._token_id, this._page_url, this._page_title, this._page_referrer, this._browser_useragent, this._browser_timezone, this._browser_locales),
                    this.__configure_console_sink(),
                    this.__bind_event_window_resize(),
                    this._is_initialized = !0) : t.Library.logger.warn(this.ns + "." + r, "Already initialized, not re-initializing")
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.spawn_client = function(e) {
                var r = "spawn_client";
                try {
                    if (null !== this._client_sel)
                        throw new Error("Base client already spawned");
                    var i = t.Locale.code();
                    this._website_configuration = e,
                    t.Library.crisp.web.init({
                        template: t.Template,
                        config: {
                            url: {
                                crisp_web: this._url_website,
                                crisp_image: this._url_image
                            },
                            context: {
                                name: this._website_configuration.website.name,
                                domain: this._website_configuration.website.domain,
                                protocol: this.__website_context_protocol
                            },
                            runtime: this._runtime_configuration
                        }
                    }),
                    t.Trigger.init(t.Plugin.get_triggers()),
                    this._is_blocked_page = t.Utility.compare_page_rules(this._page_url, this._website_configuration.chat.blocked_pages) && !0,
                    this._is_blocked_locale = this._website_configuration.chat.blocked_locales.indexOf(i) !== -1 && !0 || !1,
                    this._client_sel = t.Library.dom(t.Template.render("client", {
                        lang: i,
                        direction: t.Locale.direction(),
                        colors: t.Theme.colors(),
                        position: t.Plugin.get_customization("position", "chatbox"),
                        blocked_page: this._is_blocked_page,
                        blocked_locale: this._is_blocked_locale,
                        lock_maximized: this._runtime_configuration.lock_maximized || !1,
                        last_operator_face: this._website_configuration.chat.last_operator_face === !0 && this._website_configuration.website.active_operators.length > 0,
                        availability_tooltip: this._website_configuration.chat.availability_tooltip,
                        hide_on_away: this._website_configuration.chat.hide_on_away,
                        position_reverse: this._website_configuration.chat.position_reverse,
                        force_identify: this._website_configuration.chat.force_identify
                    })),
                    this._container_sel = this._client_sel.find(".crisp-1"),
                    this.__insert_client(),
                    this._apply_sizing(),
                    t.Library.logger.info(this.ns + "." + r, "Base client spawned")
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype._apply_sizing = function() {
                var e = "_apply_sizing";
                try {
                    null !== this._container_sel && (this._container_sel.attr("data-full-view", this._is_full_view() === !0 ? "true" : "false"),
                    this._container_sel.attr("data-small-view", this._is_small_view() === !0 ? "true" : "false"),
                    this._container_sel.attr("data-large-view", this._is_large_view() === !0 ? "true" : "false"))
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype._is_full_view = function() {
                var e = "_is_full_view";
                try {
                    return this._runtime_configuration.lock_full_view === !0 || (window.innerHeight < window.innerWidth && window.innerHeight < this.__full_view_width_threshold || window.innerWidth < this.__full_view_width_threshold)
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype._is_large_view = function() {
                var e = "_is_large_view";
                try {
                    return window.innerHeight < window.innerWidth && window.innerHeight >= this.__large_view_height_threshold || window.innerWidth < window.innerHeight && window.innerWidth >= this.__large_view_height_threshold
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype._is_small_view = function() {
                var e = "_is_small_view";
                try {
                    return window.innerHeight < window.innerWidth && window.innerHeight < this.__small_view_height_threshold || window.innerWidth < window.innerHeight && window.innerWidth < this.__small_view_height_threshold
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype._trigger_session_loaded = function() {
                var e = "_trigger_session_loaded";
                try {
                    if ("function" == typeof this._ready_trigger)
                        try {
                            this._ready_trigger(),
                            this._ready_trigger = null
                        } catch (e) {}
                    t.Action._unstack_pending(),
                    t.Action._event("session:loaded", t.Broker._session_id)
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype._load_dependency = function(e, r, i) {
                var n = "_load_dependency";
                try {
                    (function() {
                        var n = e + "_handler"
                          , s = document.createElement("script");
                        s.type = "text/javascript",
                        s.async = 1,
                        s.src = [t.Base._url_assets + "/static/javascripts/" + r, "?" + t.Base._client_revision].join(""),
                        t.Base._dollar_crisp.__spool[n] = function(e) {
                            document.head.removeChild(s),
                            delete t.Base._dollar_crisp.__spool[n],
                            "function" == typeof i && i(e)
                        }
                        ;
                        var a = document.getElementsByTagName("head");
                        a && a[0] && a[0].appendChild(s)
                    })()
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + n, e)
                }
            }
            ,
            e.prototype.__configure_console_sink = function() {
                var e = this
                  , r = "__configure_console_sink";
                try {
                    "production" === this._client_environment ? (t.Library.crisp.client.Issue.configure({
                        project: this._project_name,
                        revision: this._client_revision,
                        environment: this._client_environment,
                        useragent: this._browser_useragent,
                        page: this._page_url
                    }),
                    t.Library.logger.set_log_sink(function(r, i, n) {
                        if ("error" === r) {
                            var s = Date.now();
                            s - e.__issue_report_last_date >= e.__issue_report_interval_limit && (e.__issue_report_last_date = s,
                            t.Library.crisp.client.Issue.report(r, i, n))
                        }
                    })) : t.Library.logger.warn(this.ns + "." + r, "Console sink is disabled in " + ("'" + this._client_environment + "' environment"))
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__bind_event_window_resize = function() {
                var e = this
                  , r = "__bind_event_window_resize";
                try {
                    (function() {
                        var i = window.onresize || function() {}
                        ;
                        window.onresize = function() {
                            try {
                                t.Chat._is_initialized === !0 ? t.Chat.Interface._apply_dynamic_sizing_properties() : e._apply_sizing()
                            } catch (i) {
                                t.Library.logger.error(e.ns + "." + r + ":resize:self", i)
                            }
                            "function" == typeof i && i()
                        }
                    })()
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__insert_client = function() {
                var e = this
                  , r = "__insert_client";
                try {
                    this.__append_client(),
                    setInterval(function() {
                        0 === t.Library.dom(".crisp-client").length && (e.__append_client(),
                        t.Library.logger.info(e.ns + "." + r, "Re-inserted client because body mutated"))
                    }, this.__insert_check_every)
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__append_client = function() {
                var e = "__append_client";
                try {
                    var r = t.Library.dom("body") || [];
                    r.length > 0 && r.append(this._client_sel)
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e
        }()),
        t.Minimized = new (function() {
            function e() {
                var e = "constructor";
                try {
                    this.ns = "CrispMinimized",
                    this._is_initialized = !1
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            return e.prototype.init = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0]
                  , r = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
                  , i = "init";
                try {
                    t.Library.logger.debug(this.ns + "." + i, "Initialize"),
                    this.__initialize_children(),
                    this.__launch(e = e, r = r),
                    this._is_initialized = !0
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + i, e)
                }
            }
            ,
            e.prototype.__initialize_children = function() {
                var e = "__initialize_children";
                try {
                    var r = void 0
                      , i = [t.Minimized.Interface, t.Minimized.Selector, t.Minimized.Event];
                    for (r = 0; r < i.length; r++)
                        i[r].init()
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype.__launch = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0]
                  , r = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
                  , i = "__launch";
                try {
                    r !== !0 ? t.Minimized.Interface._pane_authorized(e = e) : t.Minimized.Interface._pane_unauthorized(e = e),
                    t.Base._runtime_configuration.lock_maximized === !0 && (t.Library.logger.info(this.ns + "." + i, "Applied locked maximized state from runtime configuration"),
                    t.Minimized.Interface._pane_open_handler())
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + i, e)
                }
            }
            ,
            e
        }()),
        t.Minimized.Event = new (function() {
            function e() {
                var e = "constructor";
                try {
                    this.ns = "CrispMinimizedEvent"
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            return e.prototype.init = function() {
                var e = "init";
                try {
                    t.Library.logger.debug(this.ns + "." + e, "Initialize")
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype._pane_click = function(e) {
                var r = this
                  , i = "_pane_click";
                try {
                    t.Minimized.Selector._minimized_sel.on("click", function(e) {
                        try {
                            var n = e.target ? t.Library.dom(e.target) : null
                              , s = ".crisp-173";
                            n && n.is(s) ? t.Chat._start_minimized() : t.Minimized.Interface._pane_open_handler()
                        } catch (e) {
                            t.Library.logger.error(r.ns + "." + i, e)
                        } finally {
                            return !1
                        }
                    }),
                    t.Minimized.Selector._minimized_sel[0].onclick = function() {
                        return !1
                    }
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + i, e)
                }
            }
            ,
            e
        }()),
        t.Minimized.Interface = new (function() {
            function e() {
                var e = "constructor";
                this.__second_in_milliseconds = 1e3,
                this.__tooltip_short_show_delay = .25,
                this.__tooltip_full_show_delay = 2,
                this.__animate_initial_pane_timeout = 1e3,
                this.__animate_general_entice_tooltip_timeout = 500,
                this._pane_open_handler = function() {}
                ;
                try {
                    this.ns = "CrispMinimizedInterface"
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            return e.prototype.init = function() {
                var e = "init";
                try {
                    t.Library.logger.debug(this.ns + "." + e, "Initialize"),
                    this.__launch()
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype._pane_authorized = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0]
                  , r = "_pane_authorized";
                try {
                    this.__spawn_pane("minimized_authorized", is_clickable = !0, e = e),
                    this._pane_open_handler = function() {
                        t.Chat.init()
                    }
                    ,
                    t.Availability.apply(),
                    t.Minimized.Event._pane_click()
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype._pane_unauthorized = function() {
                var e = this
                  , r = arguments.length > 0 && void 0 !== arguments[0] && arguments[0]
                  , i = "_pane_unauthorized";
                try {
                    this.__spawn_pane("minimized_unauthorized", is_clickable = !1, r = r),
                    this._pane_open_handler = function() {
                        t.Library.logger.warn(e.ns + "." + i, "Cannot open a non-configured chatbox")
                    }
                    ,
                    t.Minimized.Event._pane_click()
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + i, e)
                }
            }
            ,
            e.prototype.__spawn_pane = function(e) {
                var r = this
                  , i = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]
                  , n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2]
                  , s = "__spawn_pane";
                try {
                    t.Minimized.Selector._excerpt_sel = t.Library.dom(t.Template.render(e, {
                        configuration: t.Base._website_configuration,
                        methods: {
                            active_operators: t.Avatar.active_operators.bind(t.Avatar)
                        },
                        website: {
                            id: t.Base._website_id
                        }
                    })),
                    t.Base._container_sel.empty(),
                    t.Base._container_sel.append(t.Minimized.Selector._excerpt_sel),
                    t.Minimized.Selector._bind(),
                    i === !0 && function() {
                        var e = t.Minimized.Selector._tooltips_sel.find([".crisp-29", '[data-id="general_entice"]'].join(""));
                        t.Feature.has_css_animations() ? (n === !0 && function() {
                            var e = "crisp-241";
                            t.Minimized.Selector._minimized_sel.addClass(e),
                            setTimeout(function() {
                                t.Minimized.Selector._minimized_sel.removeClass(e)
                            }, r.__animate_initial_pane_timeout)
                        }(),
                        t.Base._is_full_view() !== !0 && function() {
                            var t = n === !0 ? "full" : "short";
                            setTimeout(function() {
                                e.safe_css_text("display", "block");
                                var i = "full" === t ? "crisp-242" : "crisp-243";
                                e.addClass(i),
                                setTimeout(function() {
                                    e.removeClass(i)
                                }, r.__animate_general_entice_tooltip_timeout)
                            }, r["__tooltip_" + t + "_show_delay"] * r.__second_in_milliseconds)
                        }()) : t.Base._is_full_view() !== !0 && e.safe_css_text("display", "block")
                    }()
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + s, e)
                }
            }
            ,
            e.prototype.__launch = function() {
                var e = "__launch";
                try {
                    t.Library.crisp.client.Message.get_message_history()
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e
        }())(t),
        t.Minimized.Selector = new (function() {
            function e() {
                var e = "constructor";
                try {
                    this.ns = "CrispMinimizedSelector",
                    this._excerpt_sel = null,
                    this._minimized_sel = null,
                    this._tooltips_sel = null
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            return e.prototype.init = function() {
                var e = "init";
                try {
                    t.Library.logger.debug(this.ns + "." + e, "Initialize")
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype._bind = function() {
                var e = "_bind";
                try {
                    this.__bind_main(),
                    this.__bind_tooltips()
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype.__bind_main = function() {
                var e = "__bind_main";
                try {
                    this._minimized_sel = this._excerpt_sel.find(".crisp-26")
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype.__bind_tooltips = function() {
                var e = "__bind_tooltips";
                try {
                    this._tooltips_sel = this._minimized_sel.find(".crisp-28")
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e
        }()),
        t.Chat = new (function() {
            function e() {
                var e = "constructor";
                try {
                    this.ns = "CrispChat",
                    this._is_initialized = !1
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            return e.prototype.init = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null
                  , r = "init";
                try {
                    t.Library.logger.debug(this.ns + "." + r, "Initialize"),
                    this.__initialize_children(),
                    null !== e && t.Chat.State._restore(e),
                    null === e && t.Action._event("chat:initiated"),
                    this.__launch(),
                    this._is_initialized = !0
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype._start_minimized = function() {
                this._is_initialized !== !0 && (this.init({
                    maximized: !1
                }),
                t.Chat.State.propagate("maximized", !1, force = !0))
            }
            ,
            e.prototype.__initialize_children = function() {
                var e = "__initialize_children";
                try {
                    var r = void 0
                      , i = [t.Chat.Alert, t.Chat.Field, t.Chat.Interface, t.Chat.Message, t.Chat.Misc, t.Chat.Notification, t.Chat.Scroll, t.Chat.State, t.Chat.Selector, t.Chat.Event, t.Chat.Viewport];
                    for (r = 0; r < i.length; r++)
                        i[r].init()
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype.__launch = function() {
                var e = "__launch";
                try {
                    t.Chat.Interface._pane(),
                    t.Chat.Field._focus_on_foreground(),
                    t.Availability.apply(),
                    t.Sound.initialize("events"),
                    t.Chat.Message._show_welcome(),
                    t.Library.crisp.client.Message.get_message_compose(),
                    t.Library.crisp.client.Message.get_message_history(),
                    t.Library.crisp.client.Message.get_unread_messages(),
                    t.Date.watch()
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e
        }());
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        }
        : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
        ;
        t.Chat.Alert = new (function() {
            function e() {
                var e = "constructor";
                try {
                    this.ns = "CrispChatAlert",
                    this._states = {}
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r);
                }
            }
            return e.prototype.init = function() {
                var e = "init";
                try {
                    t.Library.logger.debug(this.ns + "." + e, "Initialize")
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype._update = function(e, i) {
                var n = "_update";
                try {
                    var s = void 0
                      , a = void 0
                      , o = void 0
                      , c = void 0;
                    "object" === ("undefined" == typeof e ? "undefined" : r(e)) ? s = e : (s = {},
                    s[e] = i);
                    var l = t.Utility.clone(this._states);
                    for (a in s)
                        s.hasOwnProperty(a) && (o = s[a],
                        c = !1,
                        "undefined" != typeof this._states[a] && this._states[a] === o && (c = !0),
                        "lock" === this._states[a] && "unlock" !== o && (c = !0),
                        c === !1 && (l[a] = o));
                    t.Chat.State.propagate("alert", l)
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + n, e)
                }
            }
            ,
            e.prototype._is_visible = function(e) {
                var r = "_is_visible"
                  , i = !1;
                try {
                    i = ("show" === this._states[e] || "unlock" === this._states[e]) && !0
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                } finally {
                    return i
                }
            }
            ,
            e
        }()),
        t.Chat.Picker = new (function() {
            function e() {
                var e = "constructor";
                try {
                    this.ns = "CrispChatPicker",
                    this.__items_gif_maximum = 10,
                    this.__visible = null,
                    this.__last_search_query = null
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            return e.prototype.init = function() {
                var e = "init";
                try {
                    t.Library.logger.debug(this.ns + "." + e, "Initialize")
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype._is_open = function() {
                var e = "_is_open"
                  , r = !1;
                try {
                    r = null !== this.__visible && !0
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                } finally {
                    return r
                }
            }
            ,
            e.prototype._toggle = function(e) {
                var r = "_toggle";
                try {
                    var i = t.Chat.Selector.get("pickers").find([".crisp-99", '[data-type="' + e + '"]'].join(""));
                    if (i.length > 0) {
                        var n = this._is_open();
                        this._reset(),
                        t.Chat.Selector.get("pickers").attr("data-has-animation", n === !1 ? "true" : "false"),
                        this.__show(e, i),
                        t.Chat.Field._focus_on_foreground()
                    }
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype._reset = function() {
                var e = "_reset";
                try {
                    this.__last_search_query = null,
                    null !== this.__visible && (t.Chat.Selector.get("pickers_inner_one").safe_css_text("display", "none"),
                    t.Chat.Selector.get("content").removeAttr("data-has-picker-" + this.__visible),
                    t.Library.dom([".crisp-101", '[data-removable="true"]'].join("")).remove(),
                    t.Library.logger.debug(this.ns + "." + e, 'Picker "' + this.__visible + '" hidden'),
                    this.__visible = null)
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype._load_data_gif = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ""
                  , r = "_load_data_gif";
                try {
                    if (null !== t.Chat.Event._search_defer_timeout && (clearTimeout(t.Chat.Event._search_defer_timeout),
                    t.Chat.Event._search_defer_timeout = null),
                    this.__last_search_query !== e) {
                        this.__last_search_query = e;
                        var i = t.Chat.Selector.get("pickers_gif").find(".crisp-100")
                          , n = t.Chat.Selector.get("pickers_gif").find(".crisp-107")
                          , s = t.Template.render("chat_picker_gif_item");
                        i.empty(),
                        n.safe_css_text("display", "none"),
                        i.safe_css_text("display", "block"),
                        t.Chat.Selector.get("pickers_gif").attr("data-has-search", e ? "true" : "false"),
                        t.Chat.Selector.get("pickers_search_input").val() !== e && t.Chat.Selector.get("pickers_search_input").val(e || "");
                        for (var a = 0; a < this.__items_gif_maximum; a++)
                            i.append(s);
                        t.Chat.Event._picker_actions_gif_items(i),
                        t.Library.crisp.client.Media.get_animation_list(e)
                    }
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype._handle_data_gif = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []
                  , r = "_handle_data_gif";
                try {
                    (function() {
                        var r = t.Chat.Selector.get("pickers_gif").find(".crisp-101")
                          , i = 0;
                        r && r.length > 0 && (r.each(function(r, n, s) {
                            var a = s.eq(n);
                            e[n] && e[n].type && e[n].url ? (a.attr("data-type", e[n].type),
                            a.attr("data-url", e[n].url),
                            a.safe_css_text("background-image", "url('" + t.Base._url_image + "/process/original/" + ("?url=" + encodeURIComponent(e[n].url) + "')")),
                            a.removeAttr("data-loading"),
                            i++) : a.remove()
                        }),
                        0 === i && (t.Chat.Selector.get("pickers_gif").find(".crisp-100").safe_css_text("display", "none"),
                        t.Chat.Selector.get("pickers_gif").find(".crisp-107").safe_css_text("display", "block")))
                    })()
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__show = function(e, r) {
                var i = "__show";
                try {
                    r.safe_css_text("display", "block"),
                    t.Chat.Selector.get("content").attr("data-has-picker-" + e, "true"),
                    this.__visible = e;
                    var n = this["__trigger_show_" + e];
                    "function" == typeof n && n.bind(this)(),
                    t.Library.logger.debug(this.ns + "." + i, 'Picker "' + e + '" shown')
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + i, e)
                }
            }
            ,
            e.prototype.__trigger_show_gif = function() {
                var e = "__trigger_show_gif";
                try {
                    this._load_data_gif()
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e
        }());
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        }
        : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
        ;
        if (t.Chat.Event = new (function() {
            function e() {
                var e = "constructor";
                try {
                    this.ns = "CrispChatEvent",
                    this.__textarea_height_safety_margin = 120,
                    this.__scroll_propagate_defer_wait = 500,
                    this.__search_defer_wait = 500,
                    this.__textarea_propagate_defer_wait = 1e3,
                    this.__textarea_change_multiplier_gap = .2,
                    this.__file_change_stack = [],
                    this._search_defer_timeout = null
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            return e.prototype.init = function() {
                var e = "init";
                try {
                    t.Library.logger.debug(this.ns + "." + e, "Initialize")
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype._bind = function() {
                var e = "_bind";
                try {
                    this.__chat_click_fuzzy(),
                    this.__chat_pane_minimize(),
                    this.__chat_pane_toggle(),
                    this.__chat_flow_scroll(),
                    this.__pickers_click(),
                    this.__picker_smiley(),
                    this.__picker_gif(),
                    this.__alert_warn_reply(),
                    this.__alert_email_invalid(),
                    this.__alert_email_form(),
                    this.__textarea_submit(),
                    this.__textarea_change(),
                    this.__file_drop(),
                    this.__file_submit(),
                    this.__file_change(),
                    this.__page_scroll(),
                    this.__page_change()
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype._message_actions_text = function(e) {
                var r = this
                  , i = "_message_actions_file";
                try {
                    (function() {
                        var n = e.find('.crisp-209[data-type="embed"]') || [];
                        n.length > 0 && (n.on("click", function() {
                            try {
                                t.Chat.Interface._magnify("embed", n.attr("href"))
                            } catch (e) {
                                t.Library.logger.error(r.ns + "." + i + ":click", e)
                            } finally {
                                return !1
                            }
                        }),
                        r.__touch_as_click(n),
                        n[0].onclick = function() {
                            return !1
                        }
                        )
                    })()
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + i, e)
                }
            }
            ,
            e.prototype._message_actions_file = function(e) {
                var r = this
                  , i = "_message_actions_file";
                try {
                    (function() {
                        var n = e.find(".crisp-225") || [];
                        n.length > 0 && (n.on("click", function() {
                            try {
                                t.Chat.Interface._magnify("file", n.attr("href"), n.attr("data-name"))
                            } catch (e) {
                                t.Library.logger.error(r.ns + "." + i + ":click", e)
                            } finally {
                                return !1
                            }
                        }),
                        r.__touch_as_click(n),
                        n[0].onclick = function() {
                            return !1
                        }
                        )
                    })()
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + i, e)
                }
            }
            ,
            e.prototype._message_actions_sent = function(e, r) {
                var i = this
                  , n = "_message_actions_sent";
                try {
                    var s = e.find(".crisp-220");
                    s.on("click", function() {
                        try {
                            e.remove(),
                            t.Action.do_message_send(r.type, r.content)
                        } catch (e) {
                            t.Library.logger.error(i.ns + "." + n + ":click", e)
                        } finally {
                            return !1
                        }
                    }),
                    this.__touch_as_click(s),
                    s[0].onclick = function() {
                        return !1
                    }
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + n, e)
                }
            }
            ,
            e.prototype._magnify_actions = function(e) {
                var r = this
                  , i = "_magnify_actions";
                try {
                    (function() {
                        var n = function() {
                            e.remove(),
                            t.Chat.Field._focus_on_foreground()
                        };
                        e.on("keydown", function(e) {
                            try {
                                27 === e.keyCode && n()
                            } catch (e) {
                                t.Library.logger.error(r.ns + "." + i + ":keydown", e)
                            }
                        }),
                        e.find(".crisp-54").on("load", function() {
                            e.attr("data-state", "loaded")
                        }),
                        e[0].onclick = function(e) {
                            var s = !1;
                            try {
                                var a = null
                                  , o = e.target ? t.Library.dom(e.target) : null;
                                switch (o && o.is(".crisp-56") && (a = o.attr("data-action")),
                                a) {
                                case "download":
                                    s = !0;
                                    break;
                                default:
                                    n()
                                }
                            } catch (e) {
                                t.Library.logger.error(r.ns + "." + i + ":click", e)
                            } finally {
                                return s
                            }
                        }
                        ,
                        r.__touch_as_click(e)
                    })()
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + i, e)
                }
            }
            ,
            e.prototype._picker_actions_gif_items = function(e) {
                var r = this
                  , i = "_picker_actions_gif_items";
                try {
                    var n = e.find(".crisp-101") || [];
                    if (n.length > 0) {
                        n.on("click", function(e) {
                            try {
                                var n = e.target ? t.Library.dom(e.target) : null;
                                if (n) {
                                    var s = n.attr("data-type")
                                      , a = n.attr("data-url");
                                    a && s && (t.Action.do_message_send("animation", {
                                        type: s,
                                        url: a
                                    }),
                                    t.Chat.Picker._reset())
                                }
                            } catch (e) {
                                t.Library.logger.error(r.ns + "." + i + ":click", e)
                            } finally {
                                return !1
                            }
                        }),
                        this.__touch_as_click(n);
                        for (var s = 0; s < n.length; s++)
                            n[s].onclick = function() {
                                return !1
                            }
                    }
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + i, e)
                }
            }
            ,
            e.prototype.__chat_click_fuzzy = function() {
                var e = this
                  , r = "__chat_click_fuzzy";
                try {
                    var i = t.Chat.Selector._chat_sel.find(".crisp-81");
                    i.on("click", function(i) {
                        try {
                            var n = i.target ? t.Library.dom(i.target) : null;
                            n && !n.is(".crisp-106") && 0 === n.parents(".crisp-106").length && t.Chat.Field._focus_on_foreground()
                        } catch (i) {
                            t.Library.logger.error(e.ns + "." + r + ":click", i)
                        }
                    })
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__chat_pane_minimize = function() {
                var e = this
                  , r = "__chat_pane_minimize";
                try {
                    t.Chat.Selector._chat_sel.on("keydown", function(i) {
                        try {
                            27 === i.keyCode && t.Action.do_chat_close()
                        } catch (i) {
                            t.Library.logger.error(e.ns + "." + r + ":keydown", i)
                        }
                    }),
                    t.Chat.Selector.get("header").on("click", function() {
                        try {
                            t.Action.do_chat_close()
                        } catch (i) {
                            t.Library.logger.error(e.ns + "." + r + ":click", i)
                        } finally {
                            return !1
                        }
                    }),
                    this.__touch_as_click(t.Chat.Selector.get("header")),
                    t.Chat.Selector.get("header")[0].onclick = function() {
                        return !1
                    }
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__chat_pane_toggle = function() {
                var e = this
                  , r = "__chat_pane_toggle";
                try {
                    t.Chat.Selector._minimized_sel.on("click", function() {
                        try {
                            t.Action.do_chat_toggle()
                        } catch (i) {
                            t.Library.logger.error(e.ns + "." + r + ":click", i)
                        } finally {
                            return !1
                        }
                    }),
                    this.__touch_as_click(t.Chat.Selector._minimized_sel),
                    t.Chat.Selector._minimized_sel[0].onclick = function() {
                        return !1
                    }
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__chat_flow_scroll = function() {
                var e = this
                  , r = "__chat_flow_scroll";
                try {
                    (function() {
                        var i = null
                          , n = function(r) {
                            null !== i && clearTimeout(i),
                            i = setTimeout(function() {
                                t.Chat.State.propagate("scroll", r)
                            }, e.__scroll_propagate_defer_wait)
                        };
                        t.Chat.Selector.get("flow").on("scroll", function() {
                            try {
                                t.Chat.Scroll._position = t.Chat.Selector.get("flow")[0].scrollTop,
                                t.Chat.Notification._check_clearance(),
                                n(t.Chat.Scroll._position)
                            } catch (i) {
                                t.Library.logger.error(e.ns + "." + r + ":scroll", i)
                            }
                        }),
                        t.Chat.Selector.get("alerts_new_messages").on("click", function() {
                            try {
                                t.Chat.Scroll._to()
                            } catch (i) {
                                t.Library.logger.error(e.ns + "." + r + ":click", i)
                            } finally {
                                return !1
                            }
                        }),
                        e.__touch_as_click(t.Chat.Selector.get("alerts_new_messages")),
                        t.Chat.Selector.get("alerts_new_messages")[0].onclick = function() {
                            return !1
                        }
                        ,
                        t.Chat.Selector.get("flow")[0].onscroll = function(e) {
                            e.preventDefault()
                        }
                    })()
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__pickers_click = function() {
                var e = this
                  , r = "__pickers_click";
                try {
                    var i = t.Chat.Selector.get("pickers_selector_one");
                    t.Chat.Selector.get("pickers").on("click", function(i) {
                        try {
                            var n = i.target ? t.Library.dom(i.target) : null;
                            n && 0 === n.parents(".crisp-93").length && t.Chat.Picker._reset()
                        } catch (i) {
                            t.Library.logger.error(e.ns + "." + r + ":click", i)
                        }
                    }),
                    i.on("click", function(i) {
                        try {
                            var n = i.target ? t.Library.dom(i.target) : null;
                            if (n) {
                                var s = n.attr("data-type");
                                s ? t.Chat.Picker._toggle(s) : t.Chat.Picker._reset()
                            }
                        } catch (i) {
                            t.Library.logger.error(e.ns + "." + r + ":click", i)
                        } finally {
                            return !1
                        }
                    }),
                    this.__touch_as_click(i);
                    for (var n = 0; n < i.length; n++)
                        i[n].onclick = function() {
                            return !1
                        }
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__picker_smiley = function() {
                var e = this
                  , r = "__picker_smiley";
                try {
                    var i = t.Chat.Selector.get("pickers_smiley").find(".crisp-101");
                    t.Chat.Selector.get("form_button_smiley").on("click", function() {
                        try {
                            t.Chat.Picker._is_open() === !1 ? t.Chat.Picker._toggle("smiley") : t.Chat.Picker._reset()
                        } catch (i) {
                            t.Library.logger.error(e.ns + "." + r + ":click", i)
                        }
                    }),
                    i.on("click", function(i) {
                        try {
                            (function() {
                                var e = i.target ? t.Library.dom(i.target) : null
                                  , r = e ? e.attr("data-value") : null;
                                r && function() {
                                    var e = void 0
                                      , i = void 0
                                      , n = t.Chat.Selector.get("form_textarea_message")
                                      , s = n[0].selectionStart;
                                    e = i = t.Action.get_message_text(),
                                    e && (s > 0 && " " !== e[s - 1] && (r = " " + r),
                                    s < e.length && " " !== e[s] && (r += " ")),
                                    i = e.substr(0, s) + r + e.substr(s),
                                    t.Action.set_message_text(i),
                                    n.trigger("keyup"),
                                    setTimeout(function() {
                                        s += r.length,
                                        n[0].selectionStart = n[0].selectionEnd = s
                                    }, 0)
                                }(),
                                t.Chat.Picker._reset(),
                                t.Chat.Field._focus_on_foreground()
                            })()
                        } catch (i) {
                            t.Library.logger.error(e.ns + "." + r + ":click", i)
                        } finally {
                            return !1
                        }
                    }),
                    this.__touch_as_click(i);
                    for (var n = 0; n < i.length; n++)
                        i[n].onclick = function() {
                            return !1
                        }
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__picker_gif = function() {
                var e = this
                  , r = "__picker_gif";
                try {
                    var i = t.Chat.Selector.get("pickers_gif").find(".crisp-104") || [];
                    t.Chat.Selector.get("pickers_search_input").on("keyup", function() {
                        try {
                            null !== e._search_defer_timeout && clearTimeout(e._search_defer_timeout),
                            e._search_defer_timeout = setTimeout(function() {
                                var e = t.Chat.Selector.get("pickers_search_input").val().trim();
                                t.Chat.Picker._load_data_gif(e)
                            }, e.__search_defer_wait)
                        } catch (i) {
                            t.Library.logger.error(e.ns + "." + r + ":keyup", i)
                        }
                    }),
                    i.length > 0 && (i.on("click", function() {
                        try {
                            t.Chat.Picker._load_data_gif()
                        } catch (i) {
                            t.Library.logger.error(e.ns + "." + r + ":click", i)
                        } finally {
                            return !1
                        }
                    }),
                    this.__touch_as_click(i),
                    i[0].onclick = function() {
                        return !1
                    }
                    )
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__alert_warn_reply = function() {
                var e = this
                  , r = "__alert_warn_reply";
                try {
                    t.Chat.Selector.get("alerts_warn_reply").on("click", function() {
                        try {
                            t.Chat.Alert._update({
                                warn_reply: "hide",
                                email_form: "unlock"
                            })
                        } catch (i) {
                            t.Library.logger.error(e.ns + "." + r + ":click", i)
                        } finally {
                            return !1
                        }
                    }),
                    this.__touch_as_click(t.Chat.Selector.get("alerts_warn_reply")),
                    t.Chat.Selector.get("alerts_warn_reply")[0].onclick = function() {
                        return !1
                    }
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__alert_email_invalid = function() {
                var e = this
                  , r = "__alert_email_invalid";
                try {
                    t.Chat.Selector.get("alerts_email_invalid").on("click", function() {
                        try {
                            t.Chat.Alert._update({
                                email_invalid: "hide",
                                email_form: "unlock"
                            })
                        } catch (i) {
                            t.Library.logger.error(e.ns + "." + r + ":click", i)
                        } finally {
                            return !1
                        }
                    }),
                    this.__touch_as_click(t.Chat.Selector.get("alerts_email_invalid")),
                    t.Chat.Selector.get("alerts_email_invalid")[0].onclick = function() {
                        return !1
                    }
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__alert_email_form = function() {
                var e = this
                  , r = "__alert_email_form";
                try {
                    (function() {
                        var i = function() {
                            t.Chat.Scroll._to_last_message()
                        }
                          , n = function() {
                            var e = t.Chat.Selector.get("alerts_email_form_input").val().trim();
                            try {
                                t.Action.set_user_email(e)
                            } catch (e) {}
                            i()
                        }
                          , s = function() {
                            if (t.Base._website_configuration.chat.force_identify !== !0) {
                                var e = t.Chat.Selector.get("alerts_email_form").attr("data-error");
                                "true" === e ? t.Chat.Alert._update({
                                    email_form: "lock",
                                    email_invalid: "show"
                                }) : t.Chat.Alert._update({
                                    email_form: "lock",
                                    warn_reply: "show"
                                }),
                                i()
                            }
                        };
                        t.Chat.Selector.get("alerts_email_form_form").on("submit", function() {
                            try {
                                n()
                            } catch (i) {
                                t.Library.logger.error(e.ns + "." + r + ":submit", i)
                            } finally {
                                return !1
                            }
                        }),
                        t.Chat.Selector.get("alerts_email_form").on("click", function(i) {
                            try {
                                var n = i.target ? t.Library.dom(i.target) : null;
                                n && 0 === n.parents(".crisp-110").length && s()
                            } catch (i) {
                                t.Library.logger.error(e.ns + "." + r + ":click", i)
                            } finally {
                                return !1
                            }
                        }),
                        t.Chat.Selector.get("alerts_email_form_validate").on("click", function() {
                            try {
                                n()
                            } catch (i) {
                                t.Library.logger.error(e.ns + "." + r + ":click", i)
                            } finally {
                                return !1
                            }
                        }),
                        t.Chat.Selector.get("alerts_email_form_cancel").on("click", function() {
                            try {
                                s()
                            } catch (i) {
                                t.Library.logger.error(e.ns + "." + r + ":click", i)
                            } finally {
                                return !1
                            }
                        }),
                        e.__touch_as_click(t.Chat.Selector.get("alerts_email_form_validate")),
                        e.__touch_as_click(t.Chat.Selector.get("alerts_email_form_cancel")),
                        t.Chat.Selector.get("alerts_email_form_form")[0].onsubmit = function() {
                            return !1
                        }
                        ,
                        t.Chat.Selector.get("alerts_email_form_validate")[0].onclick = function() {
                            return !1
                        }
                        ,
                        t.Chat.Selector.get("alerts_email_form_cancel")[0].onclick = function() {
                            return !1
                        }
                    })()
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__textarea_submit = function() {
                var e = this
                  , r = "__textarea_submit";
                try {
                    (function() {
                        var i = function() {
                            t.Chat.Message.send()
                        };
                        t.Chat.Selector.get("form_textarea_message").on("keyup", function(n) {
                            try {
                                if (13 === n.keyCode && !n.shiftKey)
                                    return i(),
                                    !1
                            } catch (i) {
                                t.Library.logger.error(e.ns + "." + r + ":keyup", i)
                            }
                        }),
                        t.Chat.Selector.get("form_message").on("submit", function() {
                            try {
                                i()
                            } catch (i) {
                                t.Library.logger.error(e.ns + "." + r + ":submit", i)
                            } finally {
                                return !1
                            }
                        }),
                        t.Chat.Selector.get("form_button_send").on("click", function() {
                            try {
                                t.Chat.Message.send()
                            } catch (i) {
                                t.Library.logger.error(e.ns + "." + r + ":click", i)
                            } finally {
                                return !1
                            }
                        }),
                        e.__touch_as_click(t.Chat.Selector.get("form_button_send")),
                        t.Chat.Selector.get("form_textarea_message")[0].onkeydown = function(e) {
                            if (13 === e.keyCode && !e.shiftKey)
                                return !1
                        }
                        ,
                        t.Chat.Selector.get("form_message")[0].onsubmit = function() {
                            return !1
                        }
                        ,
                        t.Chat.Selector.get("form_button_send")[0].onclick = function() {
                            return !1
                        }
                    })()
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__textarea_change = function() {
                var e = this
                  , r = "__textarea_change";
                try {
                    (function() {
                        var i = 1
                          , n = null
                          , s = parseInt(t.Chat.Selector.get("form_textarea_message").attr("rows"), 10)
                          , a = function(r) {
                            null !== n && clearTimeout(n),
                            n = setTimeout(function() {
                                t.Chat.State.propagate("textarea", r)
                            }, e.__textarea_propagate_defer_wait)
                        }
                          , o = function(n) {
                            try {
                                if (_textarea_val = "",
                                13 !== n.keyCode || n.shiftKey)
                                    if (_textarea_val = t.Action.get_message_text(),
                                    a(_textarea_val),
                                    _textarea_val) {
                                        var o = 8.5 * _textarea_val.length
                                          , c = o / t.Chat.Interface._textarea_base_width;
                                        c += (_textarea_val.match(/\n/g) || []).length;
                                        var l = Math.ceil(c);
                                        if (l - c < e.__textarea_change_multiplier_gap || l !== i) {
                                            c = l,
                                            i = c;
                                            var _ = t.Chat.Interface._form_container_height - t.Chat.Interface._textarea_base_line_height + t.Chat.Interface._textarea_base_line_height * c
                                              , p = t.Chat.Interface._textarea_base_line_height * (c - 1);
                                            t.Chat.Selector.get("form_textarea_message").attr("rows", s + (c - 1)),
                                            _ < t.Chat.Interface._flow_height + t.Chat.Interface._form_container_height - e.__textarea_height_safety_margin ? (t.Chat.Field._update_textarea_overlapping(p),
                                            t.Chat.Selector.get("form_container").safe_css_text("height", _ + "px"),
                                            t.Library.logger.info(e.ns + "." + r + ":fn", "New height set to: " + _)) : t.Library.logger.warn(e.ns + "." + r + ":fn", "Max height reached for new height: " + _)
                                        }
                                        t.Chat.Selector.get("form_container").attr("data-has-value", "true")
                                    } else
                                        t.Chat.Selector.get("form_container").safe_css_text(null),
                                        t.Chat.Selector.get("form_container").attr("data-has-value", "false"),
                                        t.Chat.Selector.get("form_textarea_message").attr("rows", s),
                                        t.Chat.Field._update_textarea_overlapping(0),
                                        t.Library.logger.info(e.ns + "." + r + ":fn", "Restored base properties");
                                t.Library.crisp.client.Message.send_message_compose(_textarea_val ? "start" : "stop", _textarea_val || null)
                            } catch (i) {
                                t.Library.logger.error(e.ns + "." + r + ":fn", i)
                            }
                        };
                        t.Chat.Selector.get("form_textarea_message").on("keypress", function(i) {
                            try {
                                o(i)
                            } catch (i) {
                                t.Library.logger.error(e.ns + "." + r + ":keypress", i)
                            }
                        }),
                        t.Chat.Selector.get("form_textarea_message").on("keyup", function(i) {
                            try {
                                o(i)
                            } catch (i) {
                                t.Library.logger.error(e.ns + "." + r + ":keyup", i)
                            }
                        })
                    })()
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__file_drop = function() {
                var e = this
                  , r = "__file_drop";
                try {
                    (function() {
                        var r = function(e) {
                            e.preventDefault(),
                            e.stopPropagation()
                        };
                        t.Chat.Selector.get("content").on("dragover", function(e) {
                            r(e),
                            t.Chat.Selector.get("content").attr("data-has-drop-zone", "true")
                        }),
                        t.Chat.Selector.get("drop_over").on("dragleave", function(e) {
                            r(e),
                            t.Chat.Selector.get("content").removeAttr("data-has-drop-zone")
                        }),
                        t.Chat.Selector.get("drop_over").on("drop", function(i) {
                            return r(i),
                            t.Chat.Selector.get("content").removeAttr("data-has-drop-zone"),
                            i.dataTransfer && i.dataTransfer.files && i.dataTransfer.files.length > 0 && e.__handle_file_change(i.dataTransfer.files),
                            !1
                        })
                    })()
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__file_submit = function() {
                var e = this
                  , i = "__file_submit";
                try {
                    t.Chat.Selector.get("form_attach").on("event:attach", function() {
                        try {
                            var n = function() {
                                var r = function() {
                                    t.Chat.Selector.get("form_input_attach").val(""),
                                    t.Chat.Selector.get("form_button_attach").attr("data-state", "none"),
                                    e.__file_change_stack.shift(),
                                    e.__file_change_stack.length > 0 && e.__handle_file_change(e.__file_change_stack)
                                }
                                  , n = function(n, s, a) {
                                    t.Library.logger.info(e.ns + "." + i, "Succeeded uploading file"),
                                    t.Action.do_message_send("file", {
                                        name: n || "File",
                                        url: s,
                                        type: a || "application/octet-stream"
                                    }),
                                    r()
                                }
                                  , s = function() {
                                    t.Library.logger.info(e.ns + "." + i, "Failed uploading file"),
                                    alert(t.Locale.text("chat", "chat_form_attach_alert_error")),
                                    r()
                                }
                                  , a = function(e) {
                                    t.Chat.Selector.get("form_button_attach").attr("data-state", "uploading")
                                }
                                  , o = t.Chat.Selector.get("form_attach").attr("data-action")
                                  , c = t.Chat.Selector.get("form_attach").attr("data-resource")
                                  , l = parseInt(t.Chat.Selector.get("form_attach").attr("data-size-limit"), 10);
                                if (!e.__file_change_stack[0])
                                    throw r(),
                                    new Error("Empty file data read from attach input");
                                if (!o || !c)
                                    throw r(),
                                    new Error(["Either empty bucket upload action or resource value ", "received from backend"].join(""));
                                if (e.__file_change_stack[0].size >= l)
                                    return r(),
                                    alert(t.Locale.text("chat", "chat_form_attach_alert_size")),
                                    {
                                        v: void 0
                                    };
                                var _ = new XMLHttpRequest;
                                _.file = e.__file_change_stack[0],
                                _.addEventListener("progress", a, !1),
                                _.addEventListener("error", s, !1),
                                _.addEventListener("abort", s, !1),
                                _.addEventListener("load", function() {
                                    n(e.__file_change_stack[0].name, c, e.__file_change_stack[0].type)
                                }, !1),
                                _.open("PUT", o, !0),
                                _.setRequestHeader("Content-Disposition", "attachment"),
                                _.send(e.__file_change_stack[0])
                            }();
                            if ("object" === ("undefined" == typeof n ? "undefined" : r(n)))
                                return n.v
                        } catch (r) {
                            t.Library.logger.error(e.ns + "." + i + ":submit", r)
                        } finally {
                            return !1
                        }
                    })
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + i, e)
                }
            }
            ,
            e.prototype.__file_change = function() {
                var e = this
                  , r = "__file_change";
                try {
                    t.Chat.Selector.get("form_input_attach").on("change", function(t) {
                        return !!(t.target.files && t.target.files.length > 0) && e.__handle_file_change(t.target.files)
                    })
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__page_scroll = function() {
                var e = this
                  , r = "__page_scroll";
                try {
                    document.addEventListener("wheel", function(i) {
                        try {
                            var n = i.target ? t.Library.dom(i.target) : null;
                            if (n && "number" == typeof i.wheelDelta && t.Action.is_chat_opened() === !0 && (n.parents(".crisp-client").length > 0 || n.is(".crisp-client"))) {
                                var s = t.Chat.Selector.get("flow")
                                  , a = ".crisp-84";
                                if (s && s[0] && (n.parents(a).length > 0 || n.is(a))) {
                                    var o = s[0].scrollTop - i.wheelDelta;
                                    s[0].scrollTop = o >= 0 ? o : 0
                                }
                                i.stopPropagation(),
                                i.preventDefault(),
                                i.returnValue = !1
                            }
                        } catch (i) {
                            t.Library.logger.error(e.ns + "." + r + ":wheel", i)
                        }
                    })
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__page_change = function() {
                var e = "__page_change";
                try {
                    window.addEventListener("beforeunload", function(e) {
                        var r = null;
                        t.Library.crisp.client.Message.is_sending_messages() === !0 && (r = t.Locale.text("chat", "chat_message_send_abort_warn"));
                        var i = t.Chat.Selector.get("form_button_attach").attr("data-state");
                        if (["preparing", "uploading"].indexOf(i) !== -1 && (r = t.Locale.text("chat", "chat_form_attach_abort_warn")),
                        r)
                            return e.returnValue = r
                    })
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype.__touch_as_click = function(e) {
                var r = this
                  , i = "__touch_as_click";
                try {
                    e.on("touchstart", function(e) {
                        try {
                            e.preventDefault()
                        } catch (e) {
                            t.Library.logger.error(r.ns + "." + i + ":touchstart", e)
                        }
                    }),
                    e.on("touchend", function(e) {
                        try {
                            e.preventDefault(),
                            e.target && "function" == typeof e.target.click && e.target.click()
                        } catch (e) {
                            t.Library.logger.error(r.ns + "." + i + ":touchend", e)
                        }
                    })
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + i, e)
                }
            }
            ,
            e.prototype.__handle_file_change = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []
                  , r = "__handle_file_change";
                try {
                    var i = t.Chat.Selector.get("form_button_attach").attr("data-state");
                    if (e.length > 0 && "none" === i) {
                        this.__file_change_stack = [];
                        for (var n = 0; n < e.length; n++)
                            this.__file_change_stack.push(e[n]);
                        t.Chat.Selector.get("form_button_attach").attr("data-state", "preparing"),
                        t.Library.crisp.client.Bucket.get_url_upload(e[0].name, e[0].type)
                    }
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                } finally {
                    return !1
                }
            }
            ,
            e
        }()),
        t.Chat.Field = new (function() {
            function e() {
                var e = "constructor";
                try {
                    this.ns = "CrispChatField",
                    this._textarea_val = ""
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            return e.prototype.init = function() {
                var e = "init";
                try {
                    t.Library.logger.debug(this.ns + "." + e, "Initialize")
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype._focus_on_foreground = function() {
                var e = "_focus_on_foreground";
                try {
                    if (!t.Feature.has_screen_touch() && t.Chat.Interface._chat_is_visible()) {
                        var r = null;
                        r = t.Chat.Picker._is_open() === !0 ? t.Chat.Selector.get("pickers_search_input") : t.Chat.Alert._is_visible("email_form") === !0 ? t.Chat.Selector.get("alerts_email_form_input") : t.Chat.Selector.get("form_textarea_message"),
                        r && r.length > 0 && r[0].focus()
                    }
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype._blur_from_foreground = function() {
                var e = "_blur_from_foreground";
                try {
                    t.Chat.Selector.get("form_textarea_message")[0].blur(),
                    t.Chat.Selector.get("alerts_email_form_input")[0].blur()
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype._update_textarea_overlapping = function(e) {
                var r = "_update_textarea_overlapping";
                try {
                    var i = t.Chat.Selector._chat_sel.find([".crisp-111", ".crisp-93"].join(", "));
                    i.safe_css_text("margin-bottom", e + "px")
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e
        }()),
        t.Chat.Interface = new (function() {
            function e() {
                var e = "constructor";
                try {
                    this.ns = "CrispChatInterface",
                    this.__desktop_small_chat_width = 320,
                    this.__desktop_small_chat_height = 380,
                    this.__desktop_regular_chat_width = 360,
                    this.__desktop_regular_chat_height = 460,
                    this.__desktop_large_chat_width = 400,
                    this.__desktop_large_chat_height = 560,
                    this.__textarea_width_sefety = 8,
                    this.__toggle_clean_timeout = 500,
                    this.__inactivity_timeout = 18e5,
                    this.__magnify_focus_timeout = 250,
                    this.__metric_reply_min = 3e4,
                    this.__metric_reply_max = 216e5,
                    this.__smileys = {
                        angry: ":(",
                        blushing: ":$",
                        confused: "x)",
                        cool: "8)",
                        crying: ":'(",
                        embarrased: ":/",
                        heart: "<3",
                        laughing: ":'D",
                        sad: ":(",
                        sick: ":S",
                        "small-smile": ":)",
                        "big-smile": ":D",
                        "thumbs-up": "+1",
                        surprised: ":o",
                        tongue: ":P",
                        winking: ";)"
                    },
                    this._visibility_animate_classes = {
                        minimized: {
                            minimize: "crisp-244",
                            maximize: "crisp-245"
                        },
                        shade: {
                            minimize: "crisp-246",
                            maximize: "crisp-247"
                        },
                        chat: {
                            minimize: "crisp-248",
                            maximize: "crisp-249"
                        }
                    },
                    this._is_maximized = !0,
                    this.__toggle_clean_timeout_wait = null,
                    this.__inactivity_timeout_wait = null,
                    this._flow_height = 0,
                    this._form_container_height = 0,
                    this._textarea_base_width = 0,
                    this._textarea_base_line_height = 0,
                    this._last_message_height = 40,
                    this.__effective_chat_width = 0,
                    this.__effective_chat_height = 0,
                    this.__has_window_focus = !0,
                    this.__is_inactive = !1
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            return e.prototype.init = function() {
                var e = "init";
                try {
                    this.__watch_focus(),
                    this.__watch_activity(),
                    t.Library.logger.debug(this.ns + "." + e, "Initialize")
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype._toggle_visibility = function() {
                var e = this
                  , r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "pane"
                  , i = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]
                  , n = "_toggle_visibility";
                try {
                    (function() {
                        var n = "chat" === r ? "true" : "false"
                          , s = function(r) {
                            var i = "close" === r ? "maximize" : "minimize"
                              , n = "close" === r ? "minimize" : "maximize";
                            null !== e.__toggle_clean_timeout_wait && clearTimeout(e.__toggle_clean_timeout_wait),
                            t.Chat.Selector._minimized_sel && (t.Chat.Selector._minimized_sel.removeClass(e._visibility_animate_classes.minimized[i]),
                            t.Chat.Selector._minimized_sel.addClass(e._visibility_animate_classes.minimized[n])),
                            t.Chat.Selector._shade_sel && (t.Chat.Selector._shade_sel.removeClass(e._visibility_animate_classes.shade[i]),
                            t.Chat.Selector._shade_sel.addClass(e._visibility_animate_classes.shade[n])),
                            t.Chat.Selector._chat_sel && (t.Chat.Selector._chat_sel.removeClass(e._visibility_animate_classes.chat[i]),
                            t.Chat.Selector._chat_sel.addClass(e._visibility_animate_classes.chat[n])),
                            e.__toggle_clean_timeout_wait = setTimeout(function() {
                                a(r)
                            }, e.__toggle_clean_timeout)
                        }
                          , a = function(r) {
                            var i = !(r && "open" !== r)
                              , n = !(r && "close" !== r);
                            i === !0 && (t.Chat.Selector._minimized_sel && (t.Chat.Selector._minimized_sel.attr("data-maximized", "true"),
                            t.Chat.Selector._minimized_sel.removeClass(e._visibility_animate_classes.minimized.maximize)),
                            t.Chat.Selector._shade_sel && t.Chat.Selector._shade_sel.removeClass(e._visibility_animate_classes.shade.maximize),
                            t.Chat.Selector._chat_sel && t.Chat.Selector._chat_sel.removeClass(e._visibility_animate_classes.chat.maximize)),
                            n === !0 && (t.Chat.Selector._shade_sel && t.Chat.Selector._shade_sel.attr("data-visible", "false"),
                            t.Chat.Selector._chat_sel && t.Chat.Selector._chat_sel.attr("data-visible", "false"),
                            t.Chat.Selector._minimized_sel && t.Chat.Selector._minimized_sel.removeClass(e._visibility_animate_classes.minimized.minimize),
                            t.Chat.Selector._shade_sel && t.Chat.Selector._shade_sel.removeClass(e._visibility_animate_classes.shade.minimize),
                            t.Chat.Selector._chat_sel && t.Chat.Selector._chat_sel.removeClass(e._visibility_animate_classes.chat.minimize))
                        };
                        "pane" === r ? e._is_maximized = !1 : e._is_maximized = !0,
                        e.__apply_focus(),
                        i === !0 && t.Feature.has_css_animations() ? "pane" === r ? (t.Chat.Selector._minimized_sel && t.Chat.Selector._minimized_sel.attr("data-maximized", n),
                        s("close")) : (t.Chat.Selector._shade_sel && t.Chat.Selector._shade_sel.attr("data-visible", n),
                        t.Chat.Selector._chat_sel && t.Chat.Selector._chat_sel.attr("data-visible", n),
                        s("open")) : (a(),
                        t.Chat.Selector._shade_sel && t.Chat.Selector._shade_sel.attr("data-visible", n),
                        t.Chat.Selector._chat_sel && t.Chat.Selector._chat_sel.attr("data-visible", n),
                        t.Chat.Selector._minimized_sel && t.Chat.Selector._minimized_sel.attr("data-maximized", n))
                    })()
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + n, e)
                }
            }
            ,
            e.prototype._minimize = function() {
                var e = "_minimize";
                try {
                    t.Base._runtime_configuration.lock_maximized !== !0 ? (t.Chat.State.propagate("maximized", !1),
                    t.Library.logger.debug(this.ns + "." + e, "Minimizing chat...")) : t.Library.logger.debug(this.ns + "." + e, "Cannot minimize chat, maximized mode is locked")
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype._maximize = function() {
                var e = "_maximize";
                try {
                    t.Chat.State.propagate("maximized", !0, force = !1, function() {
                        t.Chat.Scroll._to()
                    }),
                    t.Library.logger.debug(this.ns + "." + e, "Maximizing chat...")
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype._chat_is_visible = function() {
                var e = "_chat_is_visible"
                  , r = !0;
                try {
                    r = this._is_maximized
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                } finally {
                    return r
                }
            }
            ,
            e.prototype._pane = function() {
                var e = "_pane";
                try {
                    var r = t.Base._website_configuration || {}
                      , i = r.website || {};
                    t.Chat.Selector._excerpt_sel = t.Library.dom(t.Template.render("chat", {
                        activity: {
                            metrics: i.response_metrics && i.response_metrics.mean && i.response_metrics.mean >= this.__metric_reply_min && i.response_metrics.mean < this.__metric_reply_max ? {
                                format: t.Date.format_duration(i.response_metrics.mean).toLowerCase(),
                                raw: i.response_metrics.mean
                            } : null,
                            last: i.active_operators && i.active_operators[0] && i.active_operators[0].timestamp ? {
                                format: t.Date.format_date(t.Date.timestamp_to_iso(i.active_operators[0].timestamp)).toLowerCase(),
                                raw: t.Date.timestamp_to_iso(i.active_operators[0].timestamp)
                            } : null
                        },
                        configuration: r,
                        environment: {
                            smileys: this.__smileys,
                            url: {
                                crisp_web: t.Base._url_website
                            }
                        },
                        methods: {
                            active_operators: t.Avatar.active_operators.bind(t.Avatar)
                        },
                        website: {
                            id: t.Base._website_id,
                            domain: t.Base._website_configuration.website.domain
                        }
                    })),
                    t.Base._container_sel.empty(),
                    t.Base._container_sel.append(t.Chat.Selector._excerpt_sel),
                    t.Chat.Selector._bind(),
                    t.Chat.Event._bind(),
                    this._apply_dynamic_sizing_properties(),
                    this.__force_chat_hide(),
                    t.Chat.State._trigger_default_all()
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype._apply_dynamic_sizing_properties = function() {
                var e = "_apply_dynamic_sizing_properties";
                try {
                    if (t.Action.is_chat_visible() === !0) {
                        var r = window.innerWidth
                          , i = window.innerHeight;
                        t.Base._is_large_view() === !0 ? (this.__effective_chat_height = this.__desktop_large_chat_height,
                        this.__effective_chat_width = this.__desktop_large_chat_width) : t.Base._is_small_view() === !0 ? (this.__effective_chat_height = this.__desktop_small_chat_height,
                        this.__effective_chat_width = this.__desktop_small_chat_width) : (this.__effective_chat_height = this.__desktop_regular_chat_height,
                        this.__effective_chat_width = this.__desktop_regular_chat_width),
                        t.Base._apply_sizing(),
                        t.Base._is_full_view() === !0 && (this.__effective_chat_height = i,
                        this.__effective_chat_width = r,
                        this.__effective_chat_height -= t.Chat.Selector.get("header").height());
                        var n = "rtl" === t.Locale.direction() ? "right" : "left"
                          , s = "rtl" === t.Locale.direction() ? "left" : "right"
                          , a = parseInt(t.Chat.Selector.get("form_textarea_message").css(n).replace("px", ""), 10)
                          , o = parseInt(t.Chat.Selector.get("form_act").css(s).replace("px", ""), 10)
                          , c = this.__effective_chat_width - this.__textarea_width_sefety - a - o - t.Chat.Selector.get("form_act")[0].offsetWidth;
                        t.Chat.Selector._chat_sel.safe_css_text("width", this.__effective_chat_width + "px"),
                        t.Chat.Selector.get("content").safe_css_text("height", this.__effective_chat_height + "px"),
                        t.Chat.Selector.get("form_textarea_message").safe_css_text("width", c + "px"),
                        this._flow_height = t.Chat.Selector.get("flow").height(),
                        this._textarea_base_width = t.Chat.Selector.get("form_textarea_message").width(),
                        0 === this._form_container_height && (this._form_container_height = t.Chat.Selector.get("form_container").height()),
                        0 === this._textarea_base_line_height && (this._textarea_base_line_height = parseInt(t.Chat.Selector.get("form_textarea_message").css("line-height").replace("px", ""), 10)),
                        t.Chat.Scroll._margin = this._flow_height,
                        t.Base._is_full_view() && this._chat_is_visible() === !0 ? t.Chat.Viewport._adapt() : t.Chat.Viewport._unadapt(),
                        t.Sound.allow(!t.Base._is_full_view() && !0),
                        t.Chat.Selector.get("form_textarea_message").trigger("keyup"),
                        t.Library.logger.debug(this.ns + "." + e, "Applied dynamic sizing properties matching current window properties")
                    } else
                        t.Library.logger.warn(this.ns + "." + e, "Did not apply dynamic sizing properties because chat is not visible")
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype._has_focus = function() {
                var e = "_has_focus";
                try {
                    return this.__has_window_focus && this._chat_is_visible() && !0
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype._magnify = function(e, r) {
                var i = this
                  , n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null
                  , s = "_magnify";
                try {
                    (function() {
                        t.Library.logger.debug(i.ns + "." + s, "Magnifying media of type: " + e + "...");
                        var a = t.Base._container_sel.find(".crisp-52");
                        0 === a.length ? (a = t.Library.dom(t.Template.render("magnify", {
                            type: e,
                            source: r,
                            name: n
                        })),
                        t.Chat.Event._magnify_actions(a),
                        t.Base._container_sel.append(a),
                        setTimeout(function() {
                            a[0].focus()
                        }, i.__magnify_focus_timeout),
                        t.Library.logger.info(i.ns + "." + s, "Magnified media of type: " + e)) : t.Library.logger.warn(i.ns + "." + s, "Could not magnify media of type: " + e + " because: magnify container is missing")
                    })()
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + s, e)
                }
            }
            ,
            e.prototype.__apply_focus = function() {
                var e = "__apply_focus";
                try {
                    var r = this._has_focus();
                    t.Library.crisp.client.Message.set_messages_in_view(r),
                    t.Library.logger.info(this.ns + "." + e, "Toggled interface focus to state: " + r)
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype.__watch_focus = function() {
                var e = this
                  , r = "__watch_focus";
                try {
                    this.__has_window_focus = (!window.hasFocus || window.hasFocus()) && !0,
                    window.addEventListener("focus", function() {
                        e.__has_window_focus = !0,
                        e.__apply_focus()
                    }, !1),
                    window.addEventListener("blur", function() {
                        e.__has_window_focus = !1,
                        e.__apply_focus()
                    }, !1)
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__watch_activity = function() {
                var e = "__watch_activity";
                try {
                    this.__become_active(),
                    window.addEventListener("click", this.__become_active.bind(this), !1),
                    window.addEventListener("mousemove", this.__become_active.bind(this), !1),
                    window.addEventListener("keydown", this.__become_active.bind(this), !1),
                    window.addEventListener("focus", this.__become_active.bind(this), !1),
                    window.addEventListener("blur", this.__become_active.bind(this), !1)
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype.__become_active = function() {
                var e = this
                  , r = "__become_active";
                try {
                    null !== this.__inactivity_timeout_wait && clearTimeout(this.__inactivity_timeout_wait),
                    this.__inactivity_timeout_wait = setTimeout(function() {
                        e.__become_inactive()
                    }, this.__inactivity_timeout),
                    this.__is_inactive === !0 && (t.Library.crisp.client.socket.connect(),
                    t.Library.logger.warn(this.ns + "." + r, "Client became active, socket will connect again (resume network)")),
                    this.__is_inactive = !1,
                    t.Library.crisp.client.Session.mark_active()
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__become_inactive = function() {
                var e = "__become_inactive";
                try {
                    this.__is_inactive = !0,
                    t.Library.crisp.client.socket.disconnect(),
                    t.Library.logger.warn(this.ns + "." + e, "Client became inactive, socket will disconnect (pause network)")
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype.__force_chat_hide = function() {
                var e = "__force_chat_hide";
                try {
                    this._is_maximized = !1,
                    t.Chat.Selector._shade_sel.attr("data-visible", "false"),
                    t.Chat.Selector._chat_sel.attr("data-visible", "false")
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e
        }()),
        t.Chat.Message = new (function() {
            function e() {
                var e = "constructor";
                try {
                    this.ns = "CrispChatMessage",
                    this.__acknowledgement_timeout = 3e4,
                    this.__animate_entrance_timeout = 400,
                    this.__compose_expire_interval = 5e3,
                    this.__compose_expire_max_age = 12e4,
                    this._has_messages = !1,
                    this._has_trigger_messages = !1,
                    this.__acknowledgement_queue = [],
                    this.__sent_read_fingerprints = [],
                    this.__show_email_form_after = 1e3,
                    this.__show_email_form_timeout = null,
                    this.__message_compose_timestamp = null
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            return e.prototype.init = function() {
                var e = "init";
                try {
                    this.__register_unread_handler(),
                    t.Library.logger.debug(this.ns + "." + e, "Initialize")
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype.send = function() {
                var e = "send";
                try {
                    var r = t.Action.get_message_text();
                    r = r.trim(),
                    r && (t.Action.do_message_send("text", r),
                    t.Action.set_message_text(""),
                    t.Chat.Selector.get("form_textarea_message").trigger("keyup"))
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype.received = function(e) {
                var r = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]
                  , i = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2]
                  , n = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3]
                  , s = arguments.length > 4 && void 0 !== arguments[4] && arguments[4]
                  , a = "received";
                try {
                    var o = this.__show("from", e);
                    r === !0 && t.Chat.Interface._has_focus() === !1 && t.Sound.start("events", "chat-message-receive"),
                    n === !0 && t.Chat.Scroll._to_last_message(direction = "from"),
                    i === !0 && this.__animate_entrance(o),
                    e.user && "welcome" !== e.user.source && t.Chat.Misc._update_operator_details(e.user),
                    s === !1 && t.Chat.Alert._update("wait_reply", "lock"),
                    this.__message_compose_timestamp && e.timestamp > 0 && this.__message_compose_timestamp < e.timestamp && t.Chat.Message._hide_compose()
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + a, e)
                }
            }
            ,
            e.prototype.sent = function(e) {
                var r = this
                  , i = "sent";
                try {
                    var n = this.__show("to", e);
                    if (t.Chat.Scroll._to_last_message(direction = "to"),
                    this.__animate_entrance(n),
                    this.__schedule_acknowledgement_check(e.fingerprint),
                    t.Chat.Event._message_actions_sent(n, e),
                    "lock" !== t.Chat.Alert._states.email_form) {
                        var s = t.Action.get_user_email();
                        s || (t.Base._website_configuration.chat.email_visitors === !0 ? (null !== this.__show_email_form_timeout && clearTimeout(this.__show_email_form_timeout),
                        this.__show_email_form_timeout = setTimeout(function() {
                            r.__show_email_form_timeout = null,
                            t.Chat.Alert._update("email_form", "show")
                        }, this.__show_email_form_after)) : t.Chat.Alert._update("wait_reply", "show"))
                    }
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + i, e)
                }
            }
            ,
            e.prototype.sent_acknowledgement = function(e) {
                var r = "sent_acknowledgement";
                try {
                    var i = this.__acknowledgement_queue.indexOf(e.fingerprint);
                    i !== -1 && (this.__acknowledgement_queue.splice(i, 1),
                    t.Library.logger.info(this.ns + "." + r, "Acknowledged sent message with fingerprint: " + e.fingerprint)),
                    this.__show("to", e),
                    t.Chat.Scroll._to_last_message(direction = "to")
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.received_from_history = function(e) {
                var r = "received_from_history";
                try {
                    this.__show("from", e),
                    e.index.current === e.index.total && this.__history_restore_done()
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.sent_from_history = function(e) {
                var r = "sent_from_history";
                try {
                    this.__show("to", e),
                    e.read === !0 && this.__sent_read_fingerprints.push(e.fingerprint),
                    e.index.current === e.index.total && this.__history_restore_done()
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype._show_welcome = function() {
                var e = "_show_welcome";
                try {
                    var r = t.Chat.State._is_restored !== !0 && !0
                      , i = t.Locale.text("theme_welcome", ["default_chat", t.Base._website_configuration.chat.theme_welcome + "_chat"], [t.Base._website_configuration.website.name]);
                    this.received({
                        type: "text",
                        timestamp: 0,
                        content: i,
                        fingerprint: "1",
                        user: {
                            source: "welcome",
                            type: "website",
                            user_id: t.Base._website_id
                        }
                    }, with_sounds = !1, with_animations = r, with_scroll = r, is_locally_generated = !0)
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype._show_compose = function(e) {
                var r = "_show_compose";
                try {
                    var i = (t.Chat.Selector._chat_sel ? t.Chat.Selector._chat_sel.find(".crisp-233") : null) || [];
                    this.__message_compose_timestamp = e,
                    0 === i.length && (i = t.Library.dom(t.Template.render("chat_bubble_composing")),
                    t.Chat.Selector.get("flow_events").append(i),
                    t.Chat.Scroll._to_last_message(direction = null),
                    this.__check_compose_expire())
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype._hide_compose = function() {
                var e = "_hide_compose";
                try {
                    var r = t.Chat.Selector._chat_sel ? t.Chat.Selector._chat_sel.find(".crisp-233") : null;
                    this.__message_compose_timestamp = null,
                    r && r.length > 0 && r.remove()
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype._acknowledge_read_send = function(e) {
                var r = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
                  , i = "_acknowledge_read_send";
                try {
                    var n = null;
                    if (e.length > 0)
                        for (var s = t.Chat.Selector.get("flow_messages").find(".crisp-200"), a = s.length - 1; a >= 0; a--) {
                            var o = s[a].getAttribute("data-fingerprint");
                            if (o && (isNaN(o) || (o = parseInt(o, 10)),
                            e.indexOf(o) !== -1)) {
                                n = o;
                                break
                            }
                        }
                    else {
                        var c = t.Chat.Selector.get("flow_messages").find('.crisp-200[data-from="visitor"]');
                        c.length > 0 && (n = c.last().attr("data-fingerprint") || null)
                    }
                    null !== n && (t.Chat.Selector.get("flow_messages").find(".crisp-217").safe_css_text("display", "none"),
                    t.Chat.Selector.get("flow_messages").find([".crisp-200", '[data-fingerprint="' + n + '"]'].join("")).find(".crisp-217").safe_css_text("display", "inline-block"),
                    r === !1 && t.Library.logger.debug(this.ns + "." + i, ["Acknowledged send message read ", "for fingerprint: " + n].join("")))
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + i, e)
                }
            }
            ,
            e.prototype.__check_compose_expire = function() {
                var e = this
                  , r = "__check_compose_expire";
                try {
                    t.Library.logger.debug(this.ns + "." + r, "Checking for remote message compose state expiration"),
                    this.__message_compose_timestamp && (Date.now() - this.__message_compose_timestamp >= this.__compose_expire_max_age ? (t.Library.logger.warn(this.ns + "." + r, "Remote message compose state has expired"),
                    this._hide_compose()) : setTimeout(function() {
                        e.__check_compose_expire()
                    }, this.__compose_expire_interval))
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__display = function(e, r, i, n, s, a, o) {
                var c = "__display"
                  , l = null;
                try {
                    var _ = "from" === r ? "operator" : "visitor"
                      , p = "operator" === _ ? i.avatar || i.user_id : "session"
                      , h = ""
                      , u = "";
                    s > 0 && (h = t.Date.timestamp_to_iso(s),
                    u = t.Date.format_date(h)),
                    l = t.Library.dom(t.Template.render("chat_message_" + e, {
                        from: _,
                        user: i,
                        content: n,
                        date_iso: h,
                        date_formatted: u,
                        fingerprint: a,
                        metas: o,
                        configuration: t.Base._website_configuration,
                        environment: {
                            url: {
                                crisp_image: t.Base._url_image
                            }
                        }
                    }));
                    var d = t.Chat.Selector.get("flow_messages").find([".crisp-200", '[data-fingerprint="' + a + '"]'].join(""));
                    if (0 === d.length) {
                        var f = t.Date.timestamp_to_properties(s)
                          , g = t.Chat.Selector.get("flow_messages").children().last()
                          , m = g.filter(".crisp-236").length > 0 && !0;
                        m && g.attr("data-day") === f.day && g.attr("data-month") === f.month && g.attr("data-year") === f.year || (g = t.Library.dom(t.Template.render("chat_bubble_thread", f)),
                        t.Chat.Selector.get("flow_messages").append(g));
                        var y = g.find(".crisp-239")
                          , v = y.children().last()
                          , b = v.filter(".crisp-240").length > 0 && !0;
                        !b || b && (v.attr("data-from") !== _ || v.attr("data-user-marker") !== p) ? (v = t.Library.dom(t.Template.render("chat_bubble_group", {
                            from: _,
                            user_marker: p
                        })),
                        y.append(v)) : (v.find(".crisp-201").remove(),
                        v.find(".crisp-216").remove()),
                        v.append(l),
                        v.append(t.Template.render("clear")),
                        t.Chat.Selector._last_message_height = l.height(),
                        "operator" === _ && this.__message_compose_timestamp && s > 0 && s > this.__message_compose_timestamp && this._hide_compose()
                    } else {
                        var w = ".crisp-207"
                          , k = d.find(w)
                          , L = l.find(w);
                        k[0].parentNode.replaceChild(L[0], k[0]),
                        l = d
                    }
                    this._has_messages === !1 && s > 0 && (this._has_messages = !0,
                    t.Base._container_sel.attr("data-has-messages", "true"),
                    t.Chat.Interface._apply_dynamic_sizing_properties()),
                    this._has_trigger_messages === !1 && "trigger" === i.source && (this._has_trigger_messages = !0,
                    t.Base._container_sel.attr("data-has-trigger-messages", "true"))
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + c, e)
                } finally {
                    return l
                }
            }
            ,
            e.prototype.__animate_entrance = function(e) {
                var r = this
                  , i = "__animate_entrance";
                try {
                    t.Feature.has_css_animations() && function() {
                        var t = "crisp-250";
                        e.addClass(t),
                        setTimeout(function() {
                            e.removeClass(t)
                        }, r.__animate_entrance_timeout)
                    }()
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + i, e)
                }
            }
            ,
            e.prototype.__show = function(e, r) {
                var i = "__show"
                  , n = null;
                try {
                    switch (r.type) {
                    case "text":
                        if (!r.content)
                            throw new Error("Got an empty text message, dropping it");
                        n = this.__display("text", e, r.user || {}, r.content, r.timestamp, r.fingerprint, {
                            preview: r.preview
                        }),
                        t.Chat.Event._message_actions_text(n);
                        break;
                    case "file":
                        if (!r.content || !r.content.url)
                            throw new Error("Got an invalid file message, dropping it");
                        n = this.__display("file", e, r.user || {}, r.content, r.timestamp, r.fingerprint),
                        t.Chat.Event._message_actions_file(n);
                        break;
                    case "animation":
                        if (!r.content || !r.content.url)
                            throw new Error("Got an invalid animation message, dropping it");
                        n = this.__display("animation", e, r.user || {}, r.content, r.timestamp, r.fingerprint);
                        break;
                    default:
                        throw new Error("Got an unsupported message (with type: " + r.type + ")")
                    }
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + i, e)
                } finally {
                    return n
                }
            }
            ,
            e.prototype.__history_restore_done = function() {
                var e = "__history_restore_done";
                try {
                    this.__sent_read_fingerprints.length > 0 && (this._acknowledge_read_send(this.__sent_read_fingerprints, !0),
                    this.__sent_read_fingerprints = []),
                    t.Chat.State._retrigger("scroll")
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype.__register_unread_handler = function() {
                var e = "__register_unread_handler";
                try {
                    t.Library.crisp.client.Message.set_unread_messages_callback(function(e, r, i) {
                        t.Chat.Notification._update_unread(e, r, i)
                    })
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype.__schedule_acknowledgement_check = function(e) {
                var r = this
                  , i = "__schedule_acknowledgement_check";
                try {
                    this.__acknowledgement_queue.push(e),
                    setTimeout(function() {
                        try {
                            var n = r.__acknowledgement_queue.indexOf(e);
                            if (n === -1)
                                t.Library.logger.debug(r.ns + "." + i + ":timeout", "Message was delivered (fingerprint: " + e + ")");
                            else {
                                var s = t.Chat.Selector.get("flow_messages").find([".crisp-200", '[data-fingerprint="' + e + '"]'].join(""));
                                s.find(".crisp-216").safe_css_text("display", "none"),
                                s.find(".crisp-220").safe_css_text("display", "block"),
                                t.Library.logger.warn(r.ns + "." + i + ":timeout", "Message was not delivered (fingerprint: " + e + ")")
                            }
                            r.__acknowledgement_queue.splice(n, 1)
                        } catch (e) {
                            t.Library.logger.error(r.ns + "." + i + ":timeout", e)
                        }
                    }, this.__acknowledgement_timeout),
                    t.Library.logger.debug(this.ns + "." + i, ["Scheduled a message acknowledgement check ", "for fingerprint: " + e].join(""))
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + i, e)
                }
            }
            ,
            e
        }()),
        t.Chat.Misc = new (function() {
            function e() {
                var e = "constructor";
                try {
                    this.ns = "CrispChatMisc",
                    this._operator_details = {}
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            return e.prototype.init = function() {
                var e = "init";
                try {
                    t.Library.logger.debug(this.ns + "." + e, "Initialize")
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype._update_operator_details = function(e) {
                var r = "_update_operator_details";
                try {
                    t.Utility.is_equal(e, this._operator_details) || (t.Chat.State.propagate("operator", e),
                    t.Library.logger.debug(this.ns + "." + r, "Updated operator details"))
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e
        }()),
        t.Chat.Notification = new (function() {
            function e() {
                var e = "constructor";
                try {
                    this.ns = "CrispChatNotification",
                    this.__preview_stack_maximum = 5,
                    this.__second_in_milliseconds = 1e3,
                    this.__tooltip_show_delay = .1,
                    this.__tooltip_show_delay_timeout_wait = null,
                    this.__preview_stack_last_fingerprint = null,
                    this.__page_title_current = null,
                    this.__animate_new_messages_tooltip_timeout = 500,
                    this.__animate_extended_preview_timeout = 1e3
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            return e.prototype.init = function() {
                var e = "init";
                try {
                    t.Library.logger.debug(this.ns + "." + e, "Initialize")
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype._update_unread = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
                  , r = this
                  , i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : []
                  , n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : []
                  , s = "_update_unread";
                try {
                    (function() {
                        var a = "crisp-242";
                        e > 0 ? function() {
                            var o = 1 === e ? "singular" : "plural";
                            t.Chat.Selector.get("pane_unread").text(e),
                            t.Chat.Selector.get("tooltips_new_messages_text").safe_css_text("display", "none"),
                            t.Chat.Selector.get("tooltips_new_messages").find([".crisp-159", '[data-variant="' + o + '"]'].join("")).safe_css_text("display", "block");
                            var c = "none" === t.Chat.Selector.get("tooltips_new_messages").css("display") && !0
                              , l = r.__show_unread_preview(e, i, n, c);
                            null === r.__page_title_current && (r.__page_title_current = document.title),
                            r.__page_title_current && (document.title = "💬" + e + " - " + r.__page_title_current),
                            c === !0 && (t.Feature.has_css_animations() ? (null !== r.__tooltip_show_delay_timeout_wait && clearTimeout(r.__tooltip_show_delay_timeout_wait),
                            r.__tooltip_show_delay_timeout_wait = setTimeout(function() {
                                r.__tooltip_show_delay_timeout_wait = null,
                                t.Chat.Selector.get("tooltips_new_messages").safe_css_text("display", "block"),
                                t.Chat.Selector.get("tooltips_new_messages").addClass(a),
                                l.length > 0 && (t.Chat.Selector._shade_sel.attr("data-visible-subtle", "true"),
                                t.Action.is_chat_closed() === !0 && t.Chat.Selector._shade_sel.addClass(t.Chat.Interface._visibility_animate_classes.shade.maximize)),
                                setTimeout(function() {
                                    t.Chat.Selector._shade_sel.removeClass(t.Chat.Interface._visibility_animate_classes.shade.maximize),
                                    t.Chat.Selector.get("tooltips_new_messages").removeClass(a)
                                }, r.__animate_new_messages_tooltip_timeout)
                            }, r.__tooltip_show_delay * r.__second_in_milliseconds)) : (t.Chat.Selector.get("tooltips_new_messages").safe_css_text("display", "block"),
                            l.length > 0 && t.Chat.Selector._shade_sel.attr("data-visible-subtle", "true")),
                            t.Chat.Selector.get("pane_unread").safe_css_text("display", "block")),
                            t.Library.logger.info(r.ns + "." + s, "Pending notifications count now: " + e)
                        }() : (null !== r.__tooltip_show_delay_timeout_wait && clearTimeout(r.__tooltip_show_delay_timeout_wait),
                        t.Chat.Selector.get("tooltips_new_messages").removeClass(a),
                        t.Chat.Selector.get("tooltips_new_messages").safe_css_text("display", "none"),
                        t.Chat.Selector.get("pane_unread").safe_css_text("display", "none"),
                        t.Chat.Selector._shade_sel.attr("data-visible-subtle", "false"),
                        t.Chat.Selector.get("tooltips_extended_preview").empty(),
                        r.__page_title_current && (document.title = r.__page_title_current),
                        t.Library.logger.info(r.ns + "." + s, "Cleared pending notifications"))
                    })()
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + s, e)
                }
            }
            ,
            e.prototype._check_clearance = function() {
                var e = "_check_clearance";
                try {
                    var r = t.Chat.Selector.get("flow")[0].scrollTop
                      , i = t.Chat.Selector.get("flow")[0].scrollHeight
                      , n = t.Chat.Selector.get("flow")[0].clientHeight;
                    n + r >= i - t.Chat.Interface._last_message_height && t.Chat.Alert._update("new_messages", "hide")
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype.__show_unread_preview = function(e, r, i, n) {
                var s = this
                  , a = "__show_unread_preview"
                  , o = [];
                try {
                    (function() {
                        var e = null
                          , a = [];
                        t.Chat.Selector.get("tooltips_extended_preview").empty();
                        for (var c = i.length - 1; c >= 0 && !(r.indexOf(i[c].fingerprint) !== -1 && (o.unshift(i[c]),
                        o.length >= s.__preview_stack_maximum)); c--)
                            ;
                        for (var l = 0; l < o.length; l++) {
                            var _ = t.Library.dom(t.Template.render("chat_preview_message", {
                                type: o[l].type,
                                from: o[l].from,
                                content: o[l].content,
                                user: o[l].user || {},
                                environment: {
                                    url: {
                                        crisp_image: t.Base._url_image
                                    }
                                }
                            }));
                            _ && (_.appendTo(t.Chat.Selector.get("tooltips_extended_preview")),
                            l === o.length - 1 && null === e && (e = o[l].fingerprint),
                            null === e && null !== s.__preview_stack_last_fingerprint || a.push(_))
                        }
                        null !== e && (s.__preview_stack_last_fingerprint = e),
                        t.Feature.has_css_animations() && a.length > 0 && function() {
                            for (var e = "crisp-251", t = 0; t < a.length; t++)
                                a[t].addClass(e);
                            setTimeout(function() {
                                for (var t = 0; t < a.length; t++)
                                    a[t].removeClass(e)
                            }, (n === !0 ? s.__tooltip_show_delay * s.__second_in_milliseconds : 0) + s.__animate_extended_preview_timeout)
                        }()
                    })()
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + a, e)
                } finally {
                    return o
                }
            }
            ,
            e
        }()),
        t.Chat.Scroll = new (function() {
            function e() {
                var e = "constructor";
                try {
                    this.ns = "CrispChatScroll",
                    this._margin = 0,
                    this._position = 0
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            return e.prototype.init = function() {
                var e = "init";
                try {
                    t.Library.logger.debug(this.ns + "." + e, "Initialize")
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype._to = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null
                  , r = "_to";
                try {
                    null === e && (e = t.Chat.Selector.get("flow")[0].scrollHeight),
                    t.Chat.State.propagate("scroll", e),
                    t.Chat.Notification._check_clearance()
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype._to_last_message = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "to"
                  , r = "_to_last_message"
                  , i = !1;
                try {
                    if (t.Chat.Interface._chat_is_visible() === !0) {
                        var n = t.Chat.Selector.get("flow")[0].scrollTop
                          , s = t.Chat.Selector.get("flow")[0].scrollHeight
                          , a = t.Chat.Selector.get("flow")[0].clientHeight;
                        (!n || a + n >= s - this._margin / 2) && (i = !0,
                        this._to(),
                        t.Library.logger.debug(this.ns + "." + r, "Scrolled down to last message")),
                        i === !1 && "from" === e && t.Chat.Alert._is_visible("warn_reply") === !1 && t.Chat.Alert._is_visible("email_invalid") === !1 && t.Chat.Alert._is_visible("wait_reply") === !1 && t.Chat.Alert._update("new_messages", "show")
                    }
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                } finally {
                    return i
                }
            }
            ,
            e
        }()),
        t.Chat.Selector = new (function() {
            function e() {
                var e = "constructor";
                try {
                    this.ns = "CrispChatSelector",
                    this.__namespaced_class_names = {
                        pane_icon: "crisp-166",
                        pane_avatar: "crisp-167",
                        pane_unread: "crisp-169",
                        header: "crisp-61",
                        header_avatar: "crisp-64",
                        header_operator: "crisp-74",
                        drop_over: "crisp-88",
                        content: "crisp-81",
                        flow: "crisp-84",
                        flow_messages: "crisp-85",
                        flow_events: "crisp-86",
                        pickers: "crisp-93",
                        pickers_selector_one: "crisp-96",
                        pickers_inner_one: "crisp-99",
                        pickers_search_input: "crisp-105",
                        pickers_smiley: ["crisp-99", '[data-type="smiley"]'].join(""),
                        pickers_gif: ["crisp-99", '[data-type="gif"]'].join(""),
                        alerts: "crisp-109",
                        alerts_one: "crisp-110",
                        alerts_new_messages: 'crisp-110[data-type="new_messages"]',
                        alerts_email_form: 'crisp-110[data-type="email_form"]',
                        alerts_warn_reply: 'crisp-110[data-type="warn_reply"]',
                        alerts_email_invalid: 'crisp-110[data-type="email_invalid"]',
                        alerts_email_form_form: "crisp-119",
                        alerts_email_form_input: "crisp-122",
                        alerts_email_form_validate: ["crisp-123", '[data-for="email_validate"]'].join(""),
                        alerts_email_form_cancel: ["crisp-126", '[data-for="email_validate"]'].join(""),
                        form_container: "crisp-127",
                        form_message: "crisp-128",
                        form_attach: "crisp-128",
                        form_act: "crisp-130",
                        form_button_send: "crisp-147",
                        form_button_smiley: 'crisp-132[data-type="smiley"]',
                        form_button_attach: 'crisp-132[data-type="file"]',
                        form_textarea_message: "crisp-129",
                        form_input_attach: "crisp-143",
                        tooltips_new_messages: ["crisp-29", '[data-id="new_messages"]'].join(""),
                        tooltips_new_messages_text: ["crisp-159", '[data-for-id="new_messages"]'].join(""),
                        tooltips_extended_preview: "crisp-156"
                    },
                    this._viewport_sel = null,
                    this._excerpt_sel = null,
                    this._shade_sel = null,
                    this._chat_sel = null,
                    this._minimized_sel = null,
                    this.__cache = {}
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            return e.prototype.init = function() {
                var e = "init";
                try {
                    t.Library.logger.debug(this.ns + "." + e, "Initialize")
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype.get = function(e) {
                var r = "get"
                  , i = null;
                try {
                    if ("undefined" != typeof this.__cache[e])
                        i = this.__cache[e];
                    else {
                        if ("undefined" == typeof this.__namespaced_class_names[e])
                            throw new Error("Selector with namespace " + e + " not found");
                        if (i = this._excerpt_sel.find("." + this.__namespaced_class_names[e]),
                        0 === i.length)
                            throw new Error("Could not select the element with namespace: " + e);
                        this.__cache[e] = i
                    }
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                } finally {
                    return i
                }
            }
            ,
            e.prototype._bind = function() {
                var e = "_bind";
                try {
                    this.__bind_page(),
                    this.__bind_main()
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype.__bind_page = function() {
                var e = "__bind_page";
                try {
                    this._viewport_sel = t.Library.dom('head meta[name="viewport"]')
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype.__bind_main = function() {
                var e = "__bind_main";
                try {
                    this._shade_sel = this._excerpt_sel.find(".crisp-170"),
                    this._chat_sel = this._excerpt_sel.find(".crisp-27"),
                    this._minimized_sel = this._excerpt_sel.find(".crisp-26")
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e
        }()),
        t.Chat.State = new (function() {
            function e() {
                var e = "constructor";
                try {
                    this.ns = "CrispChatState",
                    this.__propagate_wait = 50,
                    this.__avatar_size = 240,
                    this.__register = {
                        trigger: this.__handle_trigger,
                        alert: this.__handle_alert,
                        operator: this.__handle_operator,
                        scroll: this.__handle_scroll,
                        maximized: this.__handle_maximized,
                        textarea: this.__handle_textarea
                    },
                    this._is_restored = !1,
                    this._session = {},
                    this.__pending = {},
                    this.__restored_state = [],
                    this.__pending_timeout = null,
                    this.__default = {
                        trigger: t.Trigger._processed,
                        alert: t.Chat.Alert._states,
                        operator: t.Chat.Misc._operator_details,
                        scroll: t.Chat.Scroll._position,
                        maximized: t.Chat.Interface._is_maximized,
                        textarea: t.Chat.Field._textarea_val
                    }
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            return e.prototype.init = function() {
                var e = "init";
                try {
                    t.Library.logger.debug(this.ns + "." + e, "Initialize")
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype.receive = function(e) {
                var r = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
                  , i = "receive";
                try {
                    var n = void 0
                      , s = void 0
                      , a = 0
                      , o = [];
                    for (n in e)
                        e.hasOwnProperty(n) && (t.Utility.is_equal(e[n], this._session[n]) || (o.push(n),
                        this._session[n] = e[n],
                        r === !1 && "undefined" != typeof this.__pending[n] && (delete this.__pending[n],
                        t.Library.logger.warn(this.ns + "." + i, "Received network state corrupted pending local state with namespace: " + n))));
                    for (s = 0; s < o.length; s++)
                        n = o[s],
                        t.Chat.State.__register[n].bind(this)(this._session[n]),
                        a++;
                    t.Library.logger.info(this.ns + "." + i, "Received new state, applied changes: " + a)
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + i, e)
                }
            }
            ,
            e.prototype.propagate = function(e, r) {
                var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2]
                  , n = this
                  , s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : function() {}
                  , a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : function() {}
                  , o = "propagate";
                try {
                    if (i !== !0 && t.Utility.is_equal(this._session[e], r))
                        t.Library.logger.debug(this.ns + "." + o, "Ignored propagation of remote state with namespace: " + e + " because: value already propagated"),
                        "function" == typeof s && s(!1);
                    else {
                        this.__pending[e] = r,
                        null !== this.__pending_timeout && (clearTimeout(this.__pending_timeout),
                        this.__pending_timeout = null,
                        t.Library.logger.info(this.ns + "." + o, "Grouped multiple changes in a single propagation (scheduled)"));
                        var c = t.Utility.clone(this._session);
                        c[e] = r,
                        this.receive(c, !0),
                        this.__pending_timeout = setTimeout(function() {
                            if (t.Utility.is_empty(n.__pending))
                                t.Library.logger.warn(n.ns + "." + o + ":timeout", "Did not propagate remote state with namespace: " + e + " because: pending state corrupted by incoming concurrent state"),
                                "function" == typeof s && s(!1);
                            else {
                                var r = t.Utility.clone(n.__pending);
                                n.__pending = {},
                                n.__pending_timeout = null,
                                t.Library.crisp.client.Session.set_state(r, function(e) {
                                    e ? "function" == typeof a && a() : "function" == typeof s && s(!0)
                                }),
                                t.Library.logger.info(n.ns + "." + o + ":timeout", "Propagated remote state with namespace: " + e)
                            }
                        }, this.__propagate_wait)
                    }
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + o, e)
                }
            }
            ,
            e.prototype._restore = function(e) {
                var r = "_restore";
                try {
                    t.Base._is_full_view() === !0 && (e.maximized = !1);
                    for (var i in this.__default)
                        "undefined" == typeof e[i] && (e[i] = this.__default[i]);
                    this._is_restored = !0,
                    this._session = e,
                    this.__restored_state = t.Utility.keys(this._session)
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype._retrigger = function(e) {
                var r = "_retrigger";
                try {
                    this._trigger_default(e, this.__default[e]),
                    t.Library.logger.info(this.ns + "." + r, "Retriggered stored state with namespace: " + e)
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype._trigger_default_all = function() {
                var e = "_trigger_default_all";
                try {
                    var r = void 0;
                    for (r in this.__default)
                        this.__default.hasOwnProperty(r) && this._trigger_default(r, this.__default[r])
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype._trigger_default = function(e, r) {
                var i = "_trigger_default";
                try {
                    if ("function" != typeof this.__register[e])
                        throw new Error("No such state handler: " + e);
                    "undefined" == typeof this._session[e] && (this._session[e] = r),
                    this.__register[e].bind(this)(this._session[e])
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + i, e)
                }
            }
            ,
            e.prototype.__is_popped_restored_state = function(e) {
                var r = "__is_popped_restored_state"
                  , i = !1;
                try {
                    var n = this.__restored_state.indexOf(e);
                    n !== -1 && (this.__restored_state.splice(n, 1),
                    i = !0)
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                } finally {
                    return i
                }
            }
            ,
            e.prototype.__handle_trigger = function(e) {
                var r = "__handle_trigger";
                try {
                    this.__is_popped_restored_state("trigger");
                    if (e && e.length > 0)
                        for (var i = 0; i < e.length; i++)
                            t.Trigger._processed.indexOf(e[i]) === -1 && t.Trigger._processed.push(e[i]);
                    t.Library.logger.debug(this.ns + "." + r, "Handled")
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__handle_alert = function(e) {
                var r = "__handle_alert";
                try {
                    var i = (this.__is_popped_restored_state("alert"),
                    void 0)
                      , n = void 0
                      , s = void 0
                      , a = void 0
                      , o = void 0
                      , c = void 0
                      , l = void 0
                      , _ = [["show", "unlock"], ["unlock", "show"], ["hide", "lock"], ["lock", "hide"], ["lock", "show"]];
                    for (n in e)
                        if (e.hasOwnProperty(n)) {
                            if (s = e[n],
                            o = t.Chat.Alert._states[n],
                            a = t.Chat.Selector.get("alerts").find([".crisp-110", '[data-type="' + n + '"]'].join("")),
                            i = !1,
                            o === s)
                                i = !0;
                            else if ("unlock" !== s && "lock" === o)
                                i = !0;
                            else
                                for (c = 0; c < _.length; c++)
                                    l = _[c],
                                    o === l[0] && s === l[1] && (i = !0);
                            if (a.length > 0 && i === !1) {
                                if ("show" === s || "unlock" === s)
                                    t.Chat.Selector.get("alerts_one").safe_css_text("display", "none"),
                                    a.safe_css_text("display", "inline-block"),
                                    t.Chat.Selector.get("content").attr("data-has-alert-" + n, "true"),
                                    t.Library.logger.debug(this.ns + "." + r, 'Alert "' + n + '" shown');
                                else {
                                    if ("hide" !== s && "lock" !== s)
                                        throw new Error("Unknown action: " + s);
                                    a.safe_css_text("display", "none"),
                                    t.Chat.Selector.get("content").removeAttr("data-has-alert-" + n),
                                    t.Library.logger.debug(this.ns + "." + r, 'Alert "' + n + '" hidden')
                                }
                                t.Chat.Alert._states[n] = s,
                                t.Chat.Field._focus_on_foreground()
                            } else
                                t.Chat.Alert._states[n] = s
                        }
                    t.Library.logger.debug(this.ns + "." + r, "Handled")
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__handle_operator = function(e) {
                var r = "__handle_operator";
                try {
                    var i = (this.__is_popped_restored_state("operator"),
                    void 0)
                      , n = void 0
                      , s = void 0
                      , a = void 0
                      , o = void 0
                      , c = void 0;
                    if (t.Chat.Misc._operator_details = e || {},
                    t.Utility.is_empty(t.Chat.Misc._operator_details) ? (i = "initial",
                    s = "website",
                    a = t.Base._website_id) : (i = "ongoing",
                    s = e.type || "operator",
                    a = e.user_id,
                    o = e.avatar,
                    n = t.Library.crisp.web.Name.parse_first_name(e.nickname)),
                    (o || a) && (c = t.Avatar.url(this.__avatar_size, s, a, o)),
                    c) {
                        if ("ongoing" === i) {
                            for (var l = t.Chat.Selector.get("header_avatar").first().siblings() || [], _ = t.Chat.Selector.get("header_avatar").find(".crisp-65"), p = 0; p < l.length; p++)
                                t.Library.dom(l[p]).remove();
                            _ && (_.attr("data-has-name", n ? "true" : "false"),
                            _.find(".crisp-68").text(n || "")),
                            t.Chat.Selector.get("header_operator").text(n || ""),
                            t.Chat.Selector.get("header_avatar").safe_css_text("background-image", "url('" + c + "')"),
                            t.Chat.Selector.get("pane_avatar").safe_css_text("background-image", "url('" + c + "')"),
                            t.Chat.Selector.get("pane_icon").attr("data-is-ongoing", "true")
                        }
                        t.Chat.Selector._chat_sel && t.Chat.Selector._chat_sel.attr("data-chat-status", i)
                    }
                    t.Library.logger.debug(this.ns + "." + r, "Handled")
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__handle_scroll = function(e) {
                var r = "__handle_scroll";
                try {
                    var i = this.__is_popped_restored_state("scroll");
                    i === !1 && (t.Chat.Scroll._position = e,
                    t.Chat.Selector.get("flow")[0].scrollTop = t.Chat.Scroll._position,
                    t.Library.logger.debug(this.ns + "." + r, "Handled"))
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__handle_maximized = function(e) {
                var r = "__handle_maximized";
                try {
                    var i = this.__is_popped_restored_state("maximized")
                      , n = i !== !0 && !0;
                    t.Base._runtime_configuration.lock_maximized === !0 && (e = !0),
                    e === !1 ? (t.Chat.Interface._toggle_visibility(visible_target = "pane", width_animations = n),
                    t.Chat.Field._blur_from_foreground(),
                    t.Chat.Viewport._unadapt(),
                    t.Chat.Picker._reset(),
                    t.Action._event("chat:closed"),
                    t.Library.logger.info(this.ns + "." + r, "Chat minimized")) : (t.Chat.Interface._toggle_visibility(visible_target = "chat", width_animations = n),
                    t.Chat.Field._focus_on_foreground(),
                    t.Chat.Viewport._adapt(),
                    t.Chat.Notification._check_clearance(),
                    t.Action._event("chat:opened"),
                    t.Library.logger.info(this.ns + "." + r, "Chat maximized")),
                    t.Library.logger.debug(this.ns + "." + r, "Handled")
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e.prototype.__handle_textarea = function(e) {
                var r = "__handle_textarea";
                try {
                    this.__is_popped_restored_state("textarea");
                    t.Action.set_message_text(e),
                    t.Library.logger.debug(this.ns + "." + r, "Handled")
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                }
            }
            ,
            e
        }()),
        t.Chat.Viewport = new (function() {
            function e() {
                var e = "constructor";
                try {
                    this.ns = "CrispChatViewport",
                    this.__content_regex = /;/g,
                    this.__is_adapted = !1,
                    this.__page_meta_values = null
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            return e.prototype.init = function() {
                var e = "init";
                try {
                    t.Library.logger.debug(this.ns + "." + e, "Initialize")
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype._adapt = function() {
                var e = "_adapt";
                try {
                    if (t.Base._is_full_view() === !0) {
                        if (this.__is_adapted === !1) {
                            null === this.__page_meta_values && (this.__page_meta_values = this.__parse());
                            var r = t.Utility.clone(this.__page_meta_values);
                            r.width = "device-width",
                            r["initial-scale"] = "1",
                            r["maximum-scale"] = "1",
                            r["user-scalable"] = "0";
                            var i = this.__generate_content_value(r);
                            null !== t.Chat.Selector._viewport_sel && t.Chat.Selector._viewport_sel.length > 0 ? t.Chat.Selector._viewport_sel.attr("content", i) : (t.Chat.Selector._viewport_sel = t.Library.dom(t.Template.render("viewport", {
                                content: i
                            })),
                            t.Library.dom("head").append(t.Chat.Selector._viewport_sel))
                        }
                        this.__is_adapted = !0,
                        t.Library.logger.debug(this.ns + "." + e, "Adapted viewport")
                    } else
                        this.__is_adapted = !1
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype._unadapt = function() {
                var e = "_unadapt";
                try {
                    if (this.__is_adapted === !0) {
                        if (null !== t.Chat.Selector._viewport_sel && t.Chat.Selector._viewport_sel.length > 0) {
                            var r = this.__generate_content_value(this.__page_meta_values);
                            r ? t.Chat.Selector._viewport_sel.attr("content", r) : (t.Chat.Selector._viewport_sel.remove(),
                            t.Chat.Selector._viewport_sel = null)
                        }
                        this.__is_adapted = !1,
                        t.Library.logger.debug(this.ns + "." + e, "Un-adapted viewport")
                    }
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                }
            }
            ,
            e.prototype.__parse = function() {
                var e = "__parse"
                  , r = {};
                try {
                    if (r = {},
                    t.Chat.Selector._viewport_sel.length > 0) {
                        var i = t.Chat.Selector._viewport_sel.attr("content");
                        if (i = i.trim(),
                        i = i.replace(this.__content_regex, ",")) {
                            var n = void 0
                              , s = void 0
                              , a = void 0
                              , o = void 0
                              , c = void 0
                              , l = void 0;
                            for (l = i.indexOf(",") !== -1 ? i.split(",") : [i],
                            n = 0; n < l.length; n++)
                                s = l[n],
                                s.indexOf("=") !== -1 && (a = s.split("="),
                                o = a[0].trim(),
                                c = a[1].trim(),
                                o && c && (r[o] = c))
                        }
                    }
                } catch (r) {
                    t.Library.logger.error(this.ns + "." + e, r)
                } finally {
                    return r
                }
            }
            ,
            e.prototype.__generate_content_value = function(e) {
                var r = "__generate_content_value"
                  , i = "";
                try {
                    var n = void 0
                      , s = [];
                    for (n in e)
                        e.hasOwnProperty(n) && s.push([n, e[n]].join("="));
                    i = s.join(", ")
                } catch (e) {
                    t.Library.logger.error(this.ns + "." + r, e)
                } finally {
                    return i
                }
            }
            ,
            e
        }()),
        _dollar_crisp = {
            __init: t.Base.init.bind(t.Base),
            __spool: {},
            push: t.Pipeline.push.bind(t.Pipeline),
            get: t.Pipeline.get.bind(t.Pipeline),
            set: t.Pipeline.set.bind(t.Pipeline),
            is: t.Pipeline.is.bind(t.Pipeline),
            on: t.Pipeline.on.bind(t.Pipeline),
            off: t.Pipeline.off.bind(t.Pipeline),
            do: t.Pipeline.do.bind(t.Pipeline),
            safe: t.Pipeline.safe.bind(t.Pipeline),
            help: t.Pipeline.help.bind(t.Pipeline)
        },
        e === !0 && (_dollar_crisp.debug = t),
        "object" == typeof window.$crisp && window.$crisp.length > 0) {
            _dollar_crisp.__spool.pending_actions = [];
            for (var i = 0; i < window.$crisp.length; i++)
                _dollar_crisp.__spool.pending_actions.push(window.$crisp[i])
        }
        window.$crisp = _dollar_crisp
    } catch (t) {
        if (e === !0)
            throw t
    }
})();
