!(function (t, e) {
    "object" == typeof exports && "object" == typeof module ? (module.exports = e()) : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? (exports.Blobity = e()) : (t.Blobity = e());
})(self, function () {
    return (() => {
        var t = {
                109: (t, e) => {
                    "use strict";
                    Object.defineProperty(e, "__esModule", { value: !0 });
                    var n =
                            Object.assign ||
                            function (t) {
                                for (var e = 1; e < arguments.length; e++) {
                                    var n = arguments[e];
                                    for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
                                }
                                return t;
                            },
                        i = (function () {
                            function t(t, e) {
                                for (var n = 0; n < e.length; n++) {
                                    var i = e[n];
                                    (i.enumerable = i.enumerable || !1), (i.configurable = !0), "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
                                }
                            }
                            return function (e, n, i) {
                                return n && t(e.prototype, n), i && t(e, i), e;
                            };
                        })();
                    function o(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
                    }
                    var s = (function () {
                        function t(e) {
                            var i = this;
                            o(this, t), (this._handlers = { set: [], start: [], tick: [], end: [] });
                            var s = {
                                friction: 0.7,
                                acceleration: 0.04,
                                initialValue: 0,
                                names: ["x"],
                                test: function (t) {
                                    return Math.abs(t.current - t.target) > 0.1;
                                },
                            };
                            (this._options = n({}, s, e)),
                                e && e.friction && (this._options.friction = 1 - e.friction),
                                (this._instances = {}),
                                this._options.names.forEach(function (t) {
                                    i._instances[t] = new r(i._options.initialValue, i._options.acceleration, i._options.friction);
                                }),
                                (this._raf = null);
                        }
                        return (
                            i(t, [
                                {
                                    key: "set",
                                    value: function (t, e) {
                                        var n = this;
                                        null != e
                                            ? null != this._instances[t]
                                                ? ((this._instances[t].current = e),
                                                  (this._instances[t].target = e),
                                                  this._raf ||
                                                      (this._handlers.set.forEach(function (t) {
                                                          return t(n._instances);
                                                      }),
                                                      this._handlers.tick.forEach(function (t) {
                                                          return t(n._instances);
                                                      })))
                                                : console.warn('Instance "' + t + "\" doesn't exist.")
                                            : console.warn("Define a value.");
                                    },
                                },
                                {
                                    key: "animate",
                                    value: function (t, e) {
                                        var n = this;
                                        if (null != e) {
                                            if (null != this._instances[t])
                                                return (
                                                    this._instances[t].target !== e &&
                                                    ((this._instances[t].target = e),
                                                    this._raf ||
                                                        (this._handlers.start.forEach(function (t) {
                                                            return t(n._instances, n._instances);
                                                        }),
                                                        this._animateValues()),
                                                    e)
                                                );
                                            console.warn("Instance " + t + " doesn't exist.");
                                        } else console.warn("Define a value.");
                                    },
                                },
                                {
                                    key: "_animateValues",
                                    value: function () {
                                        var t = this,
                                            e = !0;
                                        Object.keys(this._instances).forEach(function (n) {
                                            t._instances[n].update(), t._options.test(t._instances[n]) && (e = !1);
                                        }),
                                            e
                                                ? (Object.keys(this._instances).forEach(function (e) {
                                                      (t._instances[e].current = t._instances[e].target), (t._instances[e].velocity = 0);
                                                  }),
                                                  this._handlers.tick.forEach(function (e) {
                                                      return e(t._instances);
                                                  }),
                                                  this._handlers.end.forEach(function (e) {
                                                      return e(t._instances);
                                                  }),
                                                  (this._raf = null))
                                                : ((this._raf = requestAnimationFrame(this._animateValues.bind(this))),
                                                  this._handlers.tick.forEach(function (e) {
                                                      return e(t._instances);
                                                  }));
                                    },
                                },
                                {
                                    key: "on",
                                    value: function (t, e) {
                                        this._handlers[t] ? this._handlers[t].push(e) : console.warn("Unsupported event " + t + ".");
                                    },
                                },
                                {
                                    key: "off",
                                    value: function (t, e) {
                                        var n = this;
                                        if (null != t)
                                            if (null != e)
                                                if (
                                                    this._handlers[t] &&
                                                    this._handlers[t].filter(function (t) {
                                                        return t === e;
                                                    }).length
                                                ) {
                                                    var i = this._handlers[t].filter(function (t) {
                                                            return t === e;
                                                        })[0],
                                                        o = this._handlers[t].indexOf(i);
                                                    o > -1 && this._handlers[t].splice(o, 1);
                                                } else console.warn("Handler for event " + t + " no found.");
                                            else this._handlers[t] = [];
                                        else
                                            Object.keys(this._handlers).forEach(function (t) {
                                                n._handlers[t] = [];
                                            });
                                    },
                                },
                            ]),
                            t
                        );
                    })();
                    e.default = s;
                    var r = (function () {
                        function t(e, n, i) {
                            o(this, t), (this.current = e), (this.target = e), (this._acceleration = n), (this._friction = i), (this.velocity = 0);
                        }
                        return (
                            i(t, [
                                {
                                    key: "update",
                                    value: function () {
                                        var t = this.target - this.current,
                                            e = t * this._acceleration;
                                        return this.applyForce(e), (this.velocity *= this._friction), (this.current += this.velocity), t;
                                    },
                                },
                                {
                                    key: "applyForce",
                                    value: function (t) {
                                        this.velocity += t;
                                    },
                                },
                            ]),
                            t
                        );
                    })();
                },
                705: (t, e, n) => {
                    var i = n(639).Symbol;
                    t.exports = i;
                },
                239: (t, e, n) => {
                    var i = n(705),
                        o = n(607),
                        s = n(333),
                        r = i ? i.toStringTag : void 0;
                    t.exports = function (t) {
                        return null == t ? (void 0 === t ? "[object Undefined]" : "[object Null]") : r && r in Object(t) ? o(t) : s(t);
                    };
                },
                561: (t, e, n) => {
                    var i = n(990),
                        o = /^\s+/;
                    t.exports = function (t) {
                        return t ? t.slice(0, i(t) + 1).replace(o, "") : t;
                    };
                },
                957: (t, e, n) => {
                    var i = "object" == typeof n.g && n.g && n.g.Object === Object && n.g;
                    t.exports = i;
                },
                607: (t, e, n) => {
                    var i = n(705),
                        o = Object.prototype,
                        s = o.hasOwnProperty,
                        r = o.toString,
                        a = i ? i.toStringTag : void 0;
                    t.exports = function (t) {
                        var e = s.call(t, a),
                            n = t[a];
                        try {
                            t[a] = void 0;
                            var i = !0;
                        } catch (t) {}
                        var o = r.call(t);
                        return i && (e ? (t[a] = n) : delete t[a]), o;
                    };
                },
                333: (t) => {
                    var e = Object.prototype.toString;
                    t.exports = function (t) {
                        return e.call(t);
                    };
                },
                639: (t, e, n) => {
                    var i = n(957),
                        o = "object" == typeof self && self && self.Object === Object && self,
                        s = i || o || Function("return this")();
                    t.exports = s;
                },
                990: (t) => {
                    var e = /\s/;
                    t.exports = function (t) {
                        for (var n = t.length; n-- && e.test(t.charAt(n)); );
                        return n;
                    };
                },
                279: (t, e, n) => {
                    var i = n(218),
                        o = n(771),
                        s = n(841),
                        r = Math.max,
                        a = Math.min;
                    t.exports = function (t, e, n) {
                        var c,
                            l,
                            u,
                            d,
                            h,
                            f,
                            p = 0,
                            v = !1,
                            m = !1,
                            y = !0;
                        if ("function" != typeof t) throw new TypeError("Expected a function");
                        function g(e) {
                            var n = c,
                                i = l;
                            return (c = l = void 0), (p = e), (d = t.apply(i, n));
                        }
                        function b(t) {
                            return (p = t), (h = setTimeout(x, e)), v ? g(t) : d;
                        }
                        function w(t) {
                            var n = t - f;
                            return void 0 === f || n >= e || n < 0 || (m && t - p >= u);
                        }
                        function x() {
                            var t = o();
                            if (w(t)) return k(t);
                            h = setTimeout(
                                x,
                                (function (t) {
                                    var n = e - (t - f);
                                    return m ? a(n, u - (t - p)) : n;
                                })(t)
                            );
                        }
                        function k(t) {
                            return (h = void 0), y && c ? g(t) : ((c = l = void 0), d);
                        }
                        function M() {
                            var t = o(),
                                n = w(t);
                            if (((c = arguments), (l = this), (f = t), n)) {
                                if (void 0 === h) return b(f);
                                if (m) return clearTimeout(h), (h = setTimeout(x, e)), g(f);
                            }
                            return void 0 === h && (h = setTimeout(x, e)), d;
                        }
                        return (
                            (e = s(e) || 0),
                            i(n) && ((v = !!n.leading), (u = (m = "maxWait" in n) ? r(s(n.maxWait) || 0, e) : u), (y = "trailing" in n ? !!n.trailing : y)),
                            (M.cancel = function () {
                                void 0 !== h && clearTimeout(h), (p = 0), (c = f = l = h = void 0);
                            }),
                            (M.flush = function () {
                                return void 0 === h ? d : k(o());
                            }),
                            M
                        );
                    };
                },
                218: (t) => {
                    t.exports = function (t) {
                        var e = typeof t;
                        return null != t && ("object" == e || "function" == e);
                    };
                },
                5: (t) => {
                    t.exports = function (t) {
                        return null != t && "object" == typeof t;
                    };
                },
                448: (t, e, n) => {
                    var i = n(239),
                        o = n(5);
                    t.exports = function (t) {
                        return "symbol" == typeof t || (o(t) && "[object Symbol]" == i(t));
                    };
                },
                771: (t, e, n) => {
                    var i = n(639);
                    t.exports = function () {
                        return i.Date.now();
                    };
                },
                493: (t, e, n) => {
                    var i = n(279),
                        o = n(218);
                    t.exports = function (t, e, n) {
                        var s = !0,
                            r = !0;
                        if ("function" != typeof t) throw new TypeError("Expected a function");
                        return o(n) && ((s = "leading" in n ? !!n.leading : s), (r = "trailing" in n ? !!n.trailing : r)), i(t, e, { leading: s, maxWait: e, trailing: r });
                    };
                },
                841: (t, e, n) => {
                    var i = n(561),
                        o = n(218),
                        s = n(448),
                        r = /^[-+]0x[0-9a-f]+$/i,
                        a = /^0b[01]+$/i,
                        c = /^0o[0-7]+$/i,
                        l = parseInt;
                    t.exports = function (t) {
                        if ("number" == typeof t) return t;
                        if (s(t)) return NaN;
                        if (o(t)) {
                            var e = "function" == typeof t.valueOf ? t.valueOf() : t;
                            t = o(e) ? e + "" : e;
                        }
                        if ("string" != typeof t) return 0 === t ? t : +t;
                        t = i(t);
                        var n = a.test(t);
                        return n || c.test(t) ? l(t.slice(2), n ? 2 : 8) : r.test(t) ? NaN : +t;
                    };
                },
                992: function (t, e, n) {
                    "use strict";
                    var i =
                            (this && this.__assign) ||
                            function () {
                                return (i =
                                    Object.assign ||
                                    function (t) {
                                        for (var e, n = 1, i = arguments.length; n < i; n++) for (var o in (e = arguments[n])) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                                        return t;
                                    }).apply(this, arguments);
                            },
                        o =
                            (this && this.__importDefault) ||
                            function (t) {
                                return t && t.__esModule ? t : { default: t };
                            };
                    Object.defineProperty(e, "__esModule", { value: !0 });
                    var s = o(n(493)),
                        r = o(n(109)),
                        a = n(382),
                        c = o(n(395)),
                        l = (function () {
                            function t(t) {
                                var e = this;
                                (this.options = {
                                    color: "rgb(180, 180, 180)",
                                    opacity: 1,
                                    licenseKey: true,
                                    size: 40,
                                    focusableElements: "[data-blobity], a:not([data-no-blobity]), button:not([data-no-blobity]), [data-blobity-tooltip]",
                                    focusableElementsOffsetX: 0,
                                    focusableElementsOffsetY: 0,
                                    zIndex: -1,
                                    invert: !1,
                                    dotColor: null,
                                    magnetic: !0,
                                    mode: "normal",
                                    radius: 4,
                                    font: "sans-serif",
                                    fontWeight: 400,
                                    fontSize: 40,
                                    fontColor: "#000000",
                                    tooltipPadding: 12,
                                }),
                                    (this.initialized = !1),
                                    (this.color = { r: 0, g: 0, b: 0 }),
                                    (this.fontColor = { r: 0, g: 0, b: 0 }),
                                    (this.stickedToElement = null),
                                    (this.sticketToElementTooltip = null),
                                    (this.disablingStickedToElementTimeout = null),
                                    (this.isActive = !0),
                                    (this.destroyed = !1),
                                    (this.currentMagnetic = null),
                                    (this.kinetPresets = { normal: { acceleration: 0.1, friction: 0.35 }, bouncy: { acceleration: 0.1, friction: 0.28 }, slow: { acceleration: 0.06, friction: 0.35 } }),
                                    (this.lastKnownCoordinates = { x: 0, y: 0 }),
                                    (this.currentOffsetX = 0),
                                    (this.currentOffsetY = 0),
                                    (this.manuallySetFocusedElement = null),
                                    (this.manuallySetTooltipText = null),
                                    (this.disableTimeStamp = new Date().getTime()),
                                    (this.reduceMotionSetting = !1),
                                    (this.kinetDefaultMethod = "animate"),
                                    (this.updateOptions = function (t) {
                                        if (
                                            ((e.options = i(i({}, e.options), t)),
                                            Array.isArray(e.options.color)
                                                ? (e.color = e.options.color.map(function (t) {
                                                      return a.convertColor(t);
                                                  }))
                                                : (e.color = a.convertColor(e.options.color)),
                                            (e.fontColor = a.convertColor(e.options.fontColor)),
                                            e.options.invert && (e.color = a.convertColor("rgb(255, 255, 255)")),
                                            e.options.dotColor)
                                        ) {
                                            if ((e.globalStyles && (document.head.removeChild(e.globalStyles), (e.globalStyles = void 0)), !e.globalStyles)) {
                                                var n = '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill-rule="evenodd" fill="' + e.options.dotColor + '"/></svg>';
                                                (e.globalStyles = document.createElement("style")),
                                                    e.globalStyles.setAttribute("data-blobity-global-styles", ""),
                                                    e.globalStyles.appendChild(document.createTextNode("* {cursor: inherit}")),
                                                    e.globalStyles.appendChild(document.createTextNode("html { cursor: url(data:image/svg+xml;base64," + btoa(n) + ") 4 4, auto;}")),
                                                    document.head.appendChild(e.globalStyles);
                                            }
                                        } else e.globalStyles && document.head.removeChild(e.globalStyles), (e.globalStyles = void 0);
                                        (e.canvas.style.cssText =
                                            "\n            position: fixed;\n            z-index: -1;\n            top: 0;\n            left: 0;\n            pointer-events: none;\n            opacity: 1;\n            will-change: transform;\n            overflow: visible;\n            opacity: " +
                                            e.options.opacity +
                                            "; \n            z-index: " +
                                            (e.options.invert ? 2147483647 : e.options.zIndex) +
                                            "; \n            " +
                                            (e.options.invert && "mix-blend-mode: difference") +
                                            ";\n        "),
                                            (e.currentOffsetX = e.options.focusableElementsOffsetX),
                                            (e.currentOffsetY = e.options.focusableElementsOffsetY),
                                            e.resize(),
                                            e.kinetInstance &&
                                                (Object.entries(e.kinetInstance._instances)
                                                    .filter(function (t) {
                                                        return "scale" !== t[0];
                                                    })
                                                    .forEach(function (t) {
                                                        var n = t[1];
                                                        (n._friction = 1 - e.kinetPresets[e.options.mode].friction), (n._acceleration = e.kinetPresets[e.options.mode].acceleration);
                                                    }),
                                                e.stickedToElement ||
                                                    e.sticketToElementTooltip ||
                                                    (void 0 !== t.radius && e.kinetInstance[e.kinetDefaultMethod]("radius", e.options.radius),
                                                    e.kinetInstance[e.kinetDefaultMethod]("width", e.options.size),
                                                    e.kinetInstance[e.kinetDefaultMethod]("height", e.options.size),
                                                    e.kinetInstance[e.kinetDefaultMethod]("x", e.lastKnownCoordinates.x - e.options.size / 2),
                                                    e.kinetInstance[e.kinetDefaultMethod]("y", e.lastKnownCoordinates.y - e.options.size / 2)));
                                    }),
                                    (this.destroy = function () {
                                        e.destroyed ||
                                            (window.removeEventListener("resize", e.resize),
                                            window.removeEventListener("mousemove", e.throttledMouseMove),
                                            document.removeEventListener("mouseenter", e.windowMouseEnter),
                                            document.removeEventListener("mouseleave", e.windowMouseLeave),
                                            document.removeEventListener("mouseover", e.focusableElementMouseEnter),
                                            document.removeEventListener("mouseout", e.focusableElementMouseLeave),
                                            document.removeEventListener("touchstart", e.disable),
                                            document.removeEventListener("touchend", e.disable),
                                            document.removeEventListener("mousemove", e.enable),
                                            e.prefersReducedMotionMediaQuery.removeEventListener("change", e.updatePrefersReducedMotionSetting),
                                            document.body.removeChild(e.canvas),
                                            (document.documentElement.style.cursor = ""),
                                            e.globalStyles && document.head.removeChild(e.globalStyles),
                                            (e.destroyed = !0));
                                    }),
                                    (this.disable = function () {
                                        (e.disableTimeStamp = new Date().getTime()), (e.isActive = !1), e.clear();
                                    }),
                                    (this.enable = function () {
                                        new Date().getTime() - e.disableTimeStamp > 16 && (e.isActive = !0);
                                    }),
                                    (this.updatePrefersReducedMotionSetting = function () {
                                        (e.reduceMotionSetting = e.prefersReducedMotionMediaQuery.matches), (e.kinetDefaultMethod = e.reduceMotionSetting ? "set" : "animate");
                                    }),
                                    (this.focusElement = function (t) {
                                        (e.manuallySetTooltipText = null), (e.manuallySetFocusedElement = t), e.highlightElement(t);
                                    }),
                                    (this.showTooltip = function (t) {
                                        (e.manuallySetFocusedElement = null), (e.manuallySetTooltipText = t), e.displayTooltip(t, e.lastKnownCoordinates.x, e.lastKnownCoordinates.y);
                                    }),
                                    (this.reset = function () {
                                        (e.manuallySetFocusedElement = null),
                                            (e.manuallySetTooltipText = null),
                                            e.activeTooltip
                                                ? e.displayTooltip(e.activeTooltip, e.lastKnownCoordinates.x, e.lastKnownCoordinates.y)
                                                : e.activeFocusedElement
                                                ? e.highlightElement(e.activeFocusedElement)
                                                : e.resetMorph(e.lastKnownCoordinates.x - e.options.size / 2, e.lastKnownCoordinates.y - e.options.size / 2);
                                    }),
                                    (this.focusableElementMouseEnter = function (t) {
                                        if (e.isActive && t.target) {
                                            var n = t.target.closest(e.options.focusableElements);
                                            if (n) {
                                                e.stickedToElement = n;
                                                var i = n.getAttribute("data-blobity-tooltip");
                                                n && null != i && (e.sticketToElementTooltip = i),
                                                    (e.currentOffsetX = n.getAttribute("data-blobity-offset-x") ? parseInt(String(n.getAttribute("data-blobity-offset-x"))) : e.options.focusableElementsOffsetX),
                                                    (e.currentOffsetY = n.getAttribute("data-blobity-offset-y") ? parseInt(String(n.getAttribute("data-blobity-offset-y"))) : e.options.focusableElementsOffsetY);
                                                var o = n.getAttribute("data-blobity-magnetic");
                                                e.reduceMotionSetting ||
                                                    (("true" === o || (e.options.magnetic && "false" !== o)) &&
                                                        ((e.currentMagnetic = new c.default(n)),
                                                        (e.currentMagnetic.onTick = function () {
                                                            if (!e.activeTooltip && e.activeFocusedElement === n) {
                                                                var t = n.getBoundingClientRect(),
                                                                    i = t.width,
                                                                    o = t.height,
                                                                    s = t.x,
                                                                    r = t.y,
                                                                    a = n.getAttribute("data-blobity-radius");
                                                                e.kinetInstance[e.kinetDefaultMethod]("textOpacity", 0),
                                                                    e.morph(
                                                                        { width: i + 2 * e.currentOffsetX, height: o + 2 * e.currentOffsetY, x: s - e.currentOffsetX, y: r - e.currentOffsetY },
                                                                        null != a ? parseInt(a) : e.options.radius
                                                                    );
                                                            }
                                                        })));
                                            }
                                        }
                                    }),
                                    (this.focusableElementMouseLeave = function (t) {
                                        t.target &&
                                            t.target.closest(e.options.focusableElements) &&
                                            ((e.stickedToElement = null),
                                            (e.sticketToElementTooltip = null),
                                            (e.currentOffsetX = e.options.focusableElementsOffsetX),
                                            (e.currentOffsetY = e.options.focusableElementsOffsetY),
                                            e.currentMagnetic && (e.currentMagnetic.destroy(), (e.currentMagnetic.onTick = null), (e.currentMagnetic = null)),
                                            e.resetMorph(t.clientX, t.clientY));
                                    }),
                                    (this.mouseDown = function () {
                                        e.kinetInstance[e.kinetDefaultMethod]("scale", 97);
                                    }),
                                    (this.mouseUp = function () {
                                        e.bounce();
                                    }),
                                    (this.windowMouseEnter = function () {
                                        e.kinetInstance[e.kinetDefaultMethod]("opacity", 1);
                                    }),
                                    (this.windowMouseLeave = function () {
                                        e.kinetInstance[e.kinetDefaultMethod]("opacity", 0);
                                    }),
                                    (this.highlightElement = function (t) {
                                        var n = t.getBoundingClientRect(),
                                            i = n.width,
                                            o = n.height,
                                            s = n.x,
                                            r = n.y,
                                            a = t.getAttribute("data-blobity-radius");
                                        e.kinetInstance[e.kinetDefaultMethod]("textOpacity", 0),
                                            e.morph({ width: i + 2 * e.currentOffsetX, height: o + 2 * e.currentOffsetY, x: s - e.currentOffsetX, y: r - e.currentOffsetY }, null != a ? parseInt(a) : e.options.radius);
                                    }),
                                    (this.displayTooltip = function (t, n, i) {
                                        (e.ctx.font = e.options.fontWeight + " " + e.options.fontSize + "px " + e.options.font), (e.ctx.textBaseline = "bottom"), (e.ctx.textAlign = "left");
                                        var o = e.ctx.measureText(t),
                                            s = o.actualBoundingBoxAscent,
                                            r = o.width,
                                            a = 2 * e.options.tooltipPadding;
                                        e.kinetInstance[e.kinetDefaultMethod]("textOpacity", 100), e.morph({ x: n + 6, y: i + 6, width: r + a, height: s + a }, 4);
                                    }),
                                    (this.mouseMove = function (t) {
                                        e.initialized
                                            ? ((e.lastKnownCoordinates = { x: t.clientX, y: t.clientY }),
                                              e.activeTooltip
                                                  ? e.displayTooltip(e.activeTooltip, t.clientX, t.clientY)
                                                  : e.activeFocusedElement
                                                  ? e.highlightElement(e.activeFocusedElement)
                                                  : (e.kinetInstance[e.kinetDefaultMethod]("textOpacity", 0),
                                                    e.kinetInstance[e.kinetDefaultMethod]("x", t.clientX - e.options.size / 2),
                                                    e.kinetInstance[e.kinetDefaultMethod]("y", t.clientY - e.options.size / 2),
                                                    e.kinetInstance[e.kinetDefaultMethod]("width", e.options.size),
                                                    e.kinetInstance[e.kinetDefaultMethod]("height", e.options.size),
                                                    e.kinetInstance[e.kinetDefaultMethod]("radius", e.options.size / 2)))
                                            : ((e.initialized = !0), e.kinetInstance.set("x", t.clientX - e.options.size / 2), e.kinetInstance.set("y", t.clientY - e.options.size / 2), e.kinetInstance[e.kinetDefaultMethod]("opacity", 1));
                                    }),
                                    (this.resetMorph = function (t, n) {
                                        e.disablingStickedToElementTimeout = setTimeout(function () {
                                            e.kinetInstance[e.kinetDefaultMethod]("width", e.options.size),
                                                e.kinetInstance[e.kinetDefaultMethod]("height", e.options.size),
                                                e.kinetInstance[e.kinetDefaultMethod]("radius", e.options.size / 2),
                                                e.kinetInstance[e.kinetDefaultMethod]("x", t),
                                                e.kinetInstance[e.kinetDefaultMethod]("y", n);
                                        });
                                    }),
                                    (this.clear = function () {
                                        e.ctx.resetTransform(), e.ctx.rotate(0), e.ctx.clearRect(-20, -20, window.innerWidth * window.devicePixelRatio + 20, window.innerHeight * window.devicePixelRatio + 20);
                                    }),
                                    (this.resize = function () {
                                        (e.ctx.canvas.style.width = window.innerWidth + "px"),
                                            (e.ctx.canvas.style.height = window.innerHeight + "px"),
                                            (e.ctx.canvas.width = window.innerWidth * window.devicePixelRatio),
                                            (e.ctx.canvas.height = window.innerHeight * window.devicePixelRatio),
                                            window.devicePixelRatio > 1 && (e.ctx.imageSmoothingEnabled = !1);
                                    }),
                                    (this.canvas = document.createElement("canvas")),
                                    document.body.appendChild(this.canvas),
                                    (this.ctx = this.canvas.getContext("2d")),
                                    this.updateOptions(i({}, t)),
                                    this.options.licenseKey,
                                    (this.kinetInstance = new r.default({
                                        names: ["x", "y", "opacity", "textOpacity", "width", "height", "radius", "scale"],
                                        acceleration: this.kinetPresets[this.options.mode].acceleration,
                                        friction: this.kinetPresets[this.options.mode].friction,
                                    })),
                                    (this.kinetInstance._instances.scale._acceleration = 0.06),
                                    (this.kinetInstance._instances.scale._friction = 0.9),
                                    this.kinetInstance.set("x", window.innerWidth / 2),
                                    this.kinetInstance.set("y", window.innerHeight / 2),
                                    this.kinetInstance.set("width", this.options.size),
                                    this.kinetInstance.set("height", this.options.size),
                                    this.kinetInstance.set("opacity", 0),
                                    this.kinetInstance.set("textOpacity", 0),
                                    this.kinetInstance.set("radius", this.options.size / 2),
                                    this.kinetInstance.set("scale", 100),
                                    this.kinetInstance.on("tick", function (t) {
                                        e.render(t.x.current, t.y.current, t.width.current, t.height.current, t.radius.current, t.x.velocity, t.y.velocity, t.opacity.current, t.scale.current, t.textOpacity.current);
                                    }),
                                    (this.throttledMouseMove = s.default(this.mouseMove)),
                                    window.addEventListener("resize", this.resize, { passive: !0 }),
                                    this.resize(),
                                    window.addEventListener("mousemove", this.throttledMouseMove, { passive: !0 }),
                                    document.addEventListener("mouseenter", this.windowMouseEnter),
                                    document.addEventListener("mouseleave", this.windowMouseLeave),
                                    document.addEventListener("mouseover", this.focusableElementMouseEnter),
                                    document.addEventListener("mouseout", this.focusableElementMouseLeave),
                                    document.addEventListener("mousedown", this.mouseDown),
                                    document.addEventListener("mouseup", this.mouseUp),
                                    document.addEventListener("touchstart", this.disable),
                                    document.addEventListener("touchend", this.disable),
                                    document.addEventListener("mousemove", this.enable, { passive: !0 }),
                                    (this.prefersReducedMotionMediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")),
                                    this.prefersReducedMotionMediaQuery.addEventListener("change", this.updatePrefersReducedMotionSetting),
                                    this.updatePrefersReducedMotionSetting();
                            }
                            return (
                                (t.prototype.bounce = function () {
                                    this.reduceMotionSetting ? this.kinetInstance.set("scale", 100) : (this.kinetInstance.set("scale", 97), (this.kinetInstance._instances.scale.velocity = 3), this.kinetInstance.animate("scale", 100));
                                }),
                                Object.defineProperty(t.prototype, "activeTooltip", {
                                    get: function () {
                                        return this.manuallySetTooltipText || this.sticketToElementTooltip;
                                    },
                                    enumerable: !1,
                                    configurable: !0,
                                }),
                                Object.defineProperty(t.prototype, "activeFocusedElement", {
                                    get: function () {
                                        return this.manuallySetFocusedElement || this.stickedToElement;
                                    },
                                    enumerable: !1,
                                    configurable: !0,
                                }),
                                (t.prototype.morph = function (t, e) {
                                    var n = t.width,
                                        i = t.height,
                                        o = t.x,
                                        s = t.y;
                                    this.disablingStickedToElementTimeout && clearTimeout(this.disablingStickedToElementTimeout),
                                        this.kinetInstance[this.kinetDefaultMethod]("radius", e),
                                        this.kinetInstance[this.kinetDefaultMethod]("width", n),
                                        this.kinetInstance[this.kinetDefaultMethod]("height", i),
                                        this.kinetInstance[this.kinetDefaultMethod]("x", o),
                                        this.kinetInstance[this.kinetDefaultMethod]("y", s);
                                }),
                                (t.prototype.render = function (t, e, n, i, o, s, r, c, l, u) {
                                    this.clear();
                                    var d = this.activeFocusedElement ? 0 : (this.options.size / 8) * 7;
                                    if (
                                        ((t *= window.devicePixelRatio),
                                        (e *= window.devicePixelRatio),
                                        (n = (this.activeTooltip ? n : Math.max(n, d)) * window.devicePixelRatio),
                                        (i = (this.activeTooltip ? i : Math.max(i, d)) * window.devicePixelRatio),
                                        (o *= window.devicePixelRatio),
                                        (s *= window.devicePixelRatio),
                                        (r *= window.devicePixelRatio),
                                        this.isActive)
                                    ) {
                                        var h = this.ctx;
                                        (h.globalAlpha = c), h.setTransform(l / 100, 0, 0, l / 100, t, e), h.translate(n, i), h.scale(l / 100, l / 100), h.translate(-n, -i);
                                        var f =
                                            Math.abs(n - this.options.size * window.devicePixelRatio) < 2 &&
                                            Math.abs(i - this.options.size * window.devicePixelRatio) < 2 &&
                                            Math.abs(o - (this.options.size * window.devicePixelRatio) / 2) < 2;
                                        if (f) {
                                            var p = (180 * Math.atan2(r, s)) / Math.PI + 180;
                                            h.translate(o, o), h.rotate((p * Math.PI) / 180), h.translate(-o, -o);
                                        }
                                        var v = f ? Math.min(2 * Math.sqrt(Math.pow(Math.abs(s), 2) + Math.pow(Math.abs(r), 2)), 60) / 2 : 0;
                                        if (
                                            (h.beginPath(),
                                            h.moveTo(o, 0),
                                            h.arcTo(n + v, v / 2, n + v, i + v / 2, a.positive(o - v / 2)),
                                            h.arcTo(n + v, i - v / 2, v, i - v / 2, a.positive(o - v / 2)),
                                            h.arcTo(0, i, 0, 0, a.positive(o)),
                                            h.arcTo(0, 0, n, 0, a.positive(o)),
                                            h.closePath(),
                                            a.isGradient(this.color))
                                        ) {
                                            var m = h.createLinearGradient(0, 0, n, i),
                                                y = this.color.length;
                                            this.color.forEach(function (t, e) {
                                                m.addColorStop((1 / (y - 1)) * e, "rgb(" + t.r + ", " + t.g + ", " + t.b + ")");
                                            }),
                                                (h.fillStyle = m);
                                        } else h.fillStyle = "rgb(" + this.color.r + ", " + this.color.g + ", " + this.color.b + ")";
                                        h.fill(),
                                            this.activeTooltip &&
                                                (h.setTransform(l / 100, 0, 0, l / 100, t, e),
                                                (this.ctx.textBaseline = "top"),
                                                (this.ctx.textAlign = "left"),
                                                (this.ctx.font = this.options.fontWeight + " " + this.options.fontSize * window.devicePixelRatio * (l / 100) + "px " + this.options.font),
                                                (h.fillStyle = "rgba(\n                    " + this.fontColor.r + ", " + this.fontColor.g + ", \n                    " + this.fontColor.b + ", " + u / 100 + ")"),
                                                h.fillText(this.activeTooltip, this.options.tooltipPadding * window.devicePixelRatio - ((l - 100) / 100) * n, this.options.tooltipPadding * window.devicePixelRatio - ((l - 100) / 100) * i));
                                    }
                                }),
                                t
                            );
                        })();
                    e.default = l;
                },
                395: function (t, e, n) {
                    "use strict";
                    var i =
                        (this && this.__importDefault) ||
                        function (t) {
                            return t && t.__esModule ? t : { default: t };
                        };
                    Object.defineProperty(e, "__esModule", { value: !0 });
                    var o = i(n(109)),
                        s = i(n(493)),
                        r = (function () {
                            function t(t) {
                                var e = this;
                                (this.destroying = !1),
                                    (this.onTick = null),
                                    (this.destroy = function () {
                                        window.removeEventListener("mousemove", e.throttledMouseMove), (e.destroying = !0), e.kinetInstance.animate("x", 0), e.kinetInstance.animate("y", 0);
                                    }),
                                    (this.mouseMove = function (t) {
                                        var n = e.getDistance(t.clientX + window.scrollX, t.clientY + window.scrollY);
                                        e.render(n, -1 * (e.center.x - t.clientX - window.scrollX), -1 * (e.center.y - t.clientY - window.scrollY));
                                    }),
                                    (this.kinetInstance = new o.default({ names: ["x", "y"], acceleration: 0.1, friction: 0.4 })),
                                    (this.element = t),
                                    (this.rect = this.element.getBoundingClientRect()),
                                    (this.center = { x: this.rect.x + window.scrollX + this.element.offsetWidth / 2, y: this.rect.y + window.scrollY + this.element.offsetHeight / 2 }),
                                    (this.maxDistanceX = this.element.offsetWidth / 2),
                                    (this.maxDistanceY = this.element.offsetWidth / 2),
                                    (this.throttledMouseMove = s.default(this.mouseMove)),
                                    window.addEventListener("mousemove", this.throttledMouseMove, { passive: !0 }),
                                    this.kinetInstance.on("tick", function (t) {
                                        (e.element.style.transform = "translate3d(" + t.x.current + "px, " + t.y.current + "px, 0) rotateY(" + t.x.current / 2 + "deg) rotateX(" + t.y.current / 2 + "deg)"), e.onTick && e.onTick();
                                    }),
                                    this.kinetInstance.on("end", function () {
                                        e.destroying && (e.element.style.transform = "");
                                    });
                            }
                            return (
                                (t.prototype.getDistance = function (t, e) {
                                    return Math.round(Math.sqrt(Math.pow(this.center.x - t, 2) + Math.pow(this.center.y - e, 2)));
                                }),
                                (t.prototype.render = function (t, e, n) {
                                    if (Math.abs(e) < this.maxDistanceX && Math.abs(n) < this.maxDistanceY) {
                                        var i = e / this.maxDistanceX,
                                            o = n / this.maxDistanceY;
                                        this.kinetInstance.animate("x", Math.round(20 * i)), this.kinetInstance.animate("y", Math.round(20 * o));
                                    } else this.kinetInstance.animate("x", 0), this.kinetInstance.animate("y", 0);
                                }),
                                t
                            );
                        })();
                    e.default = r;
                },
                419: function (t, e, n) {
                    "use strict";
                    var i =
                    (this && this.__importDefault) ||
                    function (t) {
                        return t && t.__esModule ? t : { default: t };
                    };
                    Object.defineProperty(e, "__esModule", { value: !0 });
                    var o = i(n(992));
                    t.exports = o.default;
                },
                382: (t, e) => {
                    "use strict";
                    Object.defineProperty(e, "__esModule", { value: !0 }), (e.negative = e.positive = e.isGradient = e.convertColor = e.extractRgbFromRgb = e.extractRgbFromHex = void 0);
                    e.extractRgbFromHex = function (t) {
                        return { r: parseInt(t.slice(1, 3), 16), g: parseInt(t.slice(3, 5), 16), b: parseInt(t.slice(5, 7), 16) };
                    };
                    e.extractRgbFromRgb = function (t) {
                        var e = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/.exec(t);
                        if (null === e) throw new Error("Couldn't convert color string " + t);
                        return { r: parseInt(e[1]), g: parseInt(e[2]), b: parseInt(e[3]) };
                    };
                    e.convertColor = function (t) {
                        if (t.includes("rgb")) return e.extractRgbFromRgb(t);
                        if (t.startsWith("#")) return e.extractRgbFromHex(t);
                        throw new Error("Couldn't convert color string " + t);
                    };
                    e.isGradient = function (t) {
                        return Array.isArray(t);
                    };
                    e.positive = function (t) {
                        return Math.max(t, 0);
                    };
                    e.negative = function (t) {
                        return Math.min(t, 0);
                    };
                },
            },
            e = {};
        function n(i) {
            var o = e[i];
            if (void 0 !== o) return o.exports;
            var s = (e[i] = { exports: {} });
            return t[i].call(s.exports, s, s.exports, n), s.exports;
        }
        return (
            (n.g = (function () {
                if ("object" == typeof globalThis) return globalThis;
                try {
                    return this || new Function("return this")();
                } catch (t) {
                    if ("object" == typeof window) return window;
                }
            })()),
            n(419)
        );
    })();
});
