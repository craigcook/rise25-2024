(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
  new MutationObserver((i) => {
      for (const a of i) if (a.type === "childList") for (const o of a.addedNodes) o.tagName === "LINK" && o.rel === "modulepreload" && r(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(i) {
      const a = {};
      return (
          i.integrity && (a.integrity = i.integrity),
          i.referrerPolicy && (a.referrerPolicy = i.referrerPolicy),
          i.crossOrigin === "use-credentials" ? (a.credentials = "include") : i.crossOrigin === "anonymous" ? (a.credentials = "omit") : (a.credentials = "same-origin"),
          a
      );
  }
  function r(i) {
      if (i.ep) return;
      i.ep = !0;
      const a = n(i);
      fetch(i.href, a);
  }
})();
var We = !1,
  Ke = !1,
  q = [],
  Ue = -1;
function yr(e) {
  wr(e);
}
function wr(e) {
  q.includes(e) || q.push(e), _r();
}
function en(e) {
  let t = q.indexOf(e);
  t !== -1 && t > Ue && q.splice(t, 1);
}
function _r() {
  !Ke && !We && ((We = !0), queueMicrotask(xr));
}
function xr() {
  (We = !1), (Ke = !0);
  for (let e = 0; e < q.length; e++) q[e](), (Ue = e);
  (q.length = 0), (Ue = -1), (Ke = !1);
}
var Q,
  ee,
  de,
  tn,
  qe = !0;
function Sr(e) {
  (qe = !1), e(), (qe = !0);
}
function Er(e) {
  (Q = e.reactive),
      (de = e.release),
      (ee = (t) =>
          e.effect(t, {
              scheduler: (n) => {
                  qe ? yr(n) : n();
              },
          })),
      (tn = e.raw);
}
function It(e) {
  ee = e;
}
function Tr(e) {
  let t = () => {};
  return [
      (r) => {
          let i = ee(r);
          return (
              e._x_effects ||
                  ((e._x_effects = new Set()),
                  (e._x_runEffects = () => {
                      e._x_effects.forEach((a) => a());
                  })),
              e._x_effects.add(i),
              (t = () => {
                  i !== void 0 && (e._x_effects.delete(i), de(i));
              }),
              i
          );
      },
      () => {
          t();
      },
  ];
}
function se(e, t, n = {}) {
  e.dispatchEvent(new CustomEvent(t, { detail: n, bubbles: !0, composed: !0, cancelable: !0 }));
}
function B(e, t) {
  if (typeof ShadowRoot == "function" && e instanceof ShadowRoot) {
      Array.from(e.children).forEach((i) => B(i, t));
      return;
  }
  let n = !1;
  if ((t(e, () => (n = !0)), n)) return;
  let r = e.firstElementChild;
  for (; r; ) B(r, t), (r = r.nextElementSibling);
}
function j(e, ...t) {
  console.warn(`Alpine Warning: ${e}`, ...t);
}
var Mt = !1;
function Ar() {
  Mt && j("Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems."),
      (Mt = !0),
      document.body || j("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"),
      se(document, "alpine:init"),
      se(document, "alpine:initializing"),
      pt(),
      Or((t) => D(t, B)),
      dt((t) => ut(t)),
      fn((t, n) => {
          bt(t, n).forEach((r) => r());
      });
  let e = (t) => !Oe(t.parentElement, !0);
  Array.from(document.querySelectorAll(an()))
      .filter(e)
      .forEach((t) => {
          D(t);
      }),
      se(document, "alpine:initialized");
}
var ct = [],
  nn = [];
function rn() {
  return ct.map((e) => e());
}
function an() {
  return ct.concat(nn).map((e) => e());
}
function on(e) {
  ct.push(e);
}
function sn(e) {
  nn.push(e);
}
function Oe(e, t = !1) {
  return Ie(e, (n) => {
      if ((t ? an() : rn()).some((i) => n.matches(i))) return !0;
  });
}
function Ie(e, t) {
  if (e) {
      if (t(e)) return e;
      if ((e._x_teleportBack && (e = e._x_teleportBack), !!e.parentElement)) return Ie(e.parentElement, t);
  }
}
function Cr(e) {
  return rn().some((t) => e.matches(t));
}
var ln = [];
function kr(e) {
  ln.push(e);
}
function D(e, t = B, n = () => {}) {
  Kr(() => {
      t(e, (r, i) => {
          n(r, i), ln.forEach((a) => a(r, i)), bt(r, r.attributes).forEach((a) => a()), r._x_ignore && i();
      });
  });
}
function ut(e) {
  B(e, (t) => {
      pn(t), Ir(t);
  });
}
var cn = [],
  un = [],
  dn = [];
function Or(e) {
  dn.push(e);
}
function dt(e, t) {
  typeof t == "function" ? (e._x_cleanups || (e._x_cleanups = []), e._x_cleanups.push(t)) : ((t = e), un.push(t));
}
function fn(e) {
  cn.push(e);
}
function hn(e, t, n) {
  e._x_attributeCleanups || (e._x_attributeCleanups = {}), e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []), e._x_attributeCleanups[t].push(n);
}
function pn(e, t) {
  e._x_attributeCleanups &&
      Object.entries(e._x_attributeCleanups).forEach(([n, r]) => {
          (t === void 0 || t.includes(n)) && (r.forEach((i) => i()), delete e._x_attributeCleanups[n]);
      });
}
function Ir(e) {
  if (e._x_cleanups) for (; e._x_cleanups.length; ) e._x_cleanups.pop()();
}
var ft = new MutationObserver(mt),
  ht = !1;
function pt() {
  ft.observe(document, { subtree: !0, childList: !0, attributes: !0, attributeOldValue: !0 }), (ht = !0);
}
function gn() {
  Mr(), ft.disconnect(), (ht = !1);
}
var le = [],
  He = !1;
function Mr() {
  (le = le.concat(ft.takeRecords())),
      le.length &&
          !He &&
          ((He = !0),
          queueMicrotask(() => {
              Nr(), (He = !1);
          }));
}
function Nr() {
  mt(le), (le.length = 0);
}
function A(e) {
  if (!ht) return e();
  gn();
  let t = e();
  return pt(), t;
}
var gt = !1,
  Ee = [];
function Rr() {
  gt = !0;
}
function Fr() {
  (gt = !1), mt(Ee), (Ee = []);
}
function mt(e) {
  if (gt) {
      Ee = Ee.concat(e);
      return;
  }
  let t = [],
      n = [],
      r = new Map(),
      i = new Map();
  for (let a = 0; a < e.length; a++)
      if (
          !e[a].target._x_ignoreMutationObserver &&
          (e[a].type === "childList" && (e[a].addedNodes.forEach((o) => o.nodeType === 1 && t.push(o)), e[a].removedNodes.forEach((o) => o.nodeType === 1 && n.push(o))), e[a].type === "attributes")
      ) {
          let o = e[a].target,
              s = e[a].attributeName,
              l = e[a].oldValue,
              c = () => {
                  r.has(o) || r.set(o, []), r.get(o).push({ name: s, value: o.getAttribute(s) });
              },
              u = () => {
                  i.has(o) || i.set(o, []), i.get(o).push(s);
              };
          o.hasAttribute(s) && l === null ? c() : o.hasAttribute(s) ? (u(), c()) : u();
      }
  i.forEach((a, o) => {
      pn(o, a);
  }),
      r.forEach((a, o) => {
          cn.forEach((s) => s(o, a));
      });
  for (let a of n) t.includes(a) || (un.forEach((o) => o(a)), ut(a));
  t.forEach((a) => {
      (a._x_ignoreSelf = !0), (a._x_ignore = !0);
  });
  for (let a of t) n.includes(a) || (a.isConnected && (delete a._x_ignoreSelf, delete a._x_ignore, dn.forEach((o) => o(a)), (a._x_ignore = !0), (a._x_ignoreSelf = !0)));
  t.forEach((a) => {
      delete a._x_ignoreSelf, delete a._x_ignore;
  }),
      (t = null),
      (n = null),
      (r = null),
      (i = null);
}
function mn(e) {
  return he(X(e));
}
function fe(e, t, n) {
  return (
      (e._x_dataStack = [t, ...X(n || e)]),
      () => {
          e._x_dataStack = e._x_dataStack.filter((r) => r !== t);
      }
  );
}
function X(e) {
  return e._x_dataStack ? e._x_dataStack : typeof ShadowRoot == "function" && e instanceof ShadowRoot ? X(e.host) : e.parentNode ? X(e.parentNode) : [];
}
function he(e) {
  return new Proxy({ objects: e }, Pr);
}
var Pr = {
  ownKeys({ objects: e }) {
      return Array.from(new Set(e.flatMap((t) => Object.keys(t))));
  },
  has({ objects: e }, t) {
      return t == Symbol.unscopables ? !1 : e.some((n) => Object.prototype.hasOwnProperty.call(n, t));
  },
  get({ objects: e }, t, n) {
      return t == "toJSON" ? Lr : Reflect.get(e.find((r) => Object.prototype.hasOwnProperty.call(r, t)) || {}, t, n);
  },
  set({ objects: e }, t, n) {
      return Reflect.set(e.find((r) => Object.prototype.hasOwnProperty.call(r, t)) || e[e.length - 1], t, n);
  },
};
function Lr() {
  return Reflect.ownKeys(this).reduce((t, n) => ((t[n] = Reflect.get(this, n)), t), {});
}
function vn(e) {
  let t = (r) => typeof r == "object" && !Array.isArray(r) && r !== null,
      n = (r, i = "") => {
          Object.entries(Object.getOwnPropertyDescriptors(r)).forEach(([a, { value: o, enumerable: s }]) => {
              if (s === !1 || o === void 0) return;
              let l = i === "" ? a : `${i}.${a}`;
              typeof o == "object" && o !== null && o._x_interceptor ? (r[a] = o.initialize(e, l, a)) : t(o) && o !== r && !(o instanceof Element) && n(o, l);
          });
      };
  return n(e);
}
function bn(e, t = () => {}) {
  let n = {
      initialValue: void 0,
      _x_interceptor: !0,
      initialize(r, i, a) {
          return e(
              this.initialValue,
              () => jr(r, i),
              (o) => Ve(r, i, o),
              i,
              a
          );
      },
  };
  return (
      t(n),
      (r) => {
          if (typeof r == "object" && r !== null && r._x_interceptor) {
              let i = n.initialize.bind(n);
              n.initialize = (a, o, s) => {
                  let l = r.initialize(a, o, s);
                  return (n.initialValue = l), i(a, o, s);
              };
          } else n.initialValue = r;
          return n;
      }
  );
}
function jr(e, t) {
  return t.split(".").reduce((n, r) => n[r], e);
}
function Ve(e, t, n) {
  if ((typeof t == "string" && (t = t.split(".")), t.length === 1)) e[t[0]] = n;
  else {
      if (t.length === 0) throw error;
      return e[t[0]] || (e[t[0]] = {}), Ve(e[t[0]], t.slice(1), n);
  }
}
var yn = {};
function R(e, t) {
  yn[e] = t;
}
function Ge(e, t) {
  return (
      Object.entries(yn).forEach(([n, r]) => {
          let i = null;
          function a() {
              if (i) return i;
              {
                  let [o, s] = Tn(t);
                  return (i = { interceptor: bn, ...o }), dt(t, s), i;
              }
          }
          Object.defineProperty(e, `$${n}`, {
              get() {
                  return r(t, a());
              },
              enumerable: !1,
          });
      }),
      e
  );
}
function Dr(e, t, n, ...r) {
  try {
      return n(...r);
  } catch (i) {
      ue(i, e, t);
  }
}
function ue(e, t, n = void 0) {
  Object.assign(e, { el: t, expression: n }),
      console.warn(
          `Alpine Expression Error: ${e.message}

${
  n
      ? 'Expression: "' +
        n +
        `"

`
      : ""
}`,
          t
      ),
      setTimeout(() => {
          throw e;
      }, 0);
}
var xe = !0;
function wn(e) {
  let t = xe;
  xe = !1;
  let n = e();
  return (xe = t), n;
}
function V(e, t, n = {}) {
  let r;
  return M(e, t)((i) => (r = i), n), r;
}
function M(...e) {
  return _n(...e);
}
var _n = xn;
function Hr(e) {
  _n = e;
}
function xn(e, t) {
  let n = {};
  Ge(n, e);
  let r = [n, ...X(e)],
      i = typeof t == "function" ? $r(r, t) : zr(r, t, e);
  return Dr.bind(null, e, t, i);
}
function $r(e, t) {
  return (n = () => {}, { scope: r = {}, params: i = [] } = {}) => {
      let a = t.apply(he([r, ...e]), i);
      Te(n, a);
  };
}
var $e = {};
function Br(e, t) {
  if ($e[e]) return $e[e];
  let n = Object.getPrototypeOf(async function () {}).constructor,
      r = /^[\n\s]*if.*\(.*\)/.test(e.trim()) || /^(let|const)\s/.test(e.trim()) ? `(async()=>{ ${e} })()` : e,
      a = (() => {
          try {
              let o = new n(["__self", "scope"], `with (scope) { __self.result = ${r} }; __self.finished = true; return __self.result;`);
              return Object.defineProperty(o, "name", { value: `[Alpine] ${e}` }), o;
          } catch (o) {
              return ue(o, t, e), Promise.resolve();
          }
      })();
  return ($e[e] = a), a;
}
function zr(e, t, n) {
  let r = Br(t, n);
  return (i = () => {}, { scope: a = {}, params: o = [] } = {}) => {
      (r.result = void 0), (r.finished = !1);
      let s = he([a, ...e]);
      if (typeof r == "function") {
          let l = r(r, s).catch((c) => ue(c, n, t));
          r.finished
              ? (Te(i, r.result, s, o, n), (r.result = void 0))
              : l
                    .then((c) => {
                        Te(i, c, s, o, n);
                    })
                    .catch((c) => ue(c, n, t))
                    .finally(() => (r.result = void 0));
      }
  };
}
function Te(e, t, n, r, i) {
  if (xe && typeof t == "function") {
      let a = t.apply(n, r);
      a instanceof Promise ? a.then((o) => Te(e, o, n, r)).catch((o) => ue(o, i, t)) : e(a);
  } else typeof t == "object" && t instanceof Promise ? t.then((a) => e(a)) : e(t);
}
var vt = "x-";
function te(e = "") {
  return vt + e;
}
function Wr(e) {
  vt = e;
}
var Je = {};
function T(e, t) {
  return (
      (Je[e] = t),
      {
          before(n) {
              if (!Je[n]) {
                  console.warn("Cannot find directive `${directive}`. `${name}` will use the default order of execution");
                  return;
              }
              const r = U.indexOf(n);
              U.splice(r >= 0 ? r : U.indexOf("DEFAULT"), 0, e);
          },
      }
  );
}
function bt(e, t, n) {
  if (((t = Array.from(t)), e._x_virtualDirectives)) {
      let a = Object.entries(e._x_virtualDirectives).map(([s, l]) => ({ name: s, value: l })),
          o = Sn(a);
      (a = a.map((s) => (o.find((l) => l.name === s.name) ? { name: `x-bind:${s.name}`, value: `"${s.value}"` } : s))), (t = t.concat(a));
  }
  let r = {};
  return t
      .map(kn((a, o) => (r[a] = o)))
      .filter(In)
      .map(qr(r, n))
      .sort(Vr)
      .map((a) => Ur(e, a));
}
function Sn(e) {
  return Array.from(e)
      .map(kn())
      .filter((t) => !In(t));
}
var Ye = !1,
  oe = new Map(),
  En = Symbol();
function Kr(e) {
  Ye = !0;
  let t = Symbol();
  (En = t), oe.set(t, []);
  let n = () => {
          for (; oe.get(t).length; ) oe.get(t).shift()();
          oe.delete(t);
      },
      r = () => {
          (Ye = !1), n();
      };
  e(n), r();
}
function Tn(e) {
  let t = [],
      n = (s) => t.push(s),
      [r, i] = Tr(e);
  return t.push(i), [{ Alpine: pe, effect: r, cleanup: n, evaluateLater: M.bind(M, e), evaluate: V.bind(V, e) }, () => t.forEach((s) => s())];
}
function Ur(e, t) {
  let n = () => {},
      r = Je[t.type] || n,
      [i, a] = Tn(e);
  hn(e, t.original, a);
  let o = () => {
      e._x_ignore || e._x_ignoreSelf || (r.inline && r.inline(e, t, i), (r = r.bind(r, e, t, i)), Ye ? oe.get(En).push(r) : r());
  };
  return (o.runCleanups = a), o;
}
var An = (e, t) => ({ name: n, value: r }) => (n.startsWith(e) && (n = n.replace(e, t)), { name: n, value: r }),
  Cn = (e) => e;
function kn(e = () => {}) {
  return ({ name: t, value: n }) => {
      let { name: r, value: i } = On.reduce((a, o) => o(a), { name: t, value: n });
      return r !== t && e(r, t), { name: r, value: i };
  };
}
var On = [];
function yt(e) {
  On.push(e);
}
function In({ name: e }) {
  return Mn().test(e);
}
var Mn = () => new RegExp(`^${vt}([^:^.]+)\\b`);
function qr(e, t) {
  return ({ name: n, value: r }) => {
      let i = n.match(Mn()),
          a = n.match(/:([a-zA-Z0-9\-:]+)/),
          o = n.match(/\.[^.\]]+(?=[^\]]*$)/g) || [],
          s = t || e[n] || n;
      return { type: i ? i[1] : null, value: a ? a[1] : null, modifiers: o.map((l) => l.replace(".", "")), expression: r, original: s };
  };
}
var Xe = "DEFAULT",
  U = ["ignore", "ref", "data", "id", "bind", "init", "for", "model", "modelable", "transition", "show", "if", Xe, "teleport"];
function Vr(e, t) {
  let n = U.indexOf(e.type) === -1 ? Xe : e.type,
      r = U.indexOf(t.type) === -1 ? Xe : t.type;
  return U.indexOf(n) - U.indexOf(r);
}
var Ze = [],
  wt = !1;
function _t(e = () => {}) {
  return (
      queueMicrotask(() => {
          wt ||
              setTimeout(() => {
                  Qe();
              });
      }),
      new Promise((t) => {
          Ze.push(() => {
              e(), t();
          });
      })
  );
}
function Qe() {
  for (wt = !1; Ze.length; ) Ze.shift()();
}
function Gr() {
  wt = !0;
}
function xt(e, t) {
  return Array.isArray(t) ? Nt(e, t.join(" ")) : typeof t == "object" && t !== null ? Jr(e, t) : typeof t == "function" ? xt(e, t()) : Nt(e, t);
}
function Nt(e, t) {
  let n = (i) =>
          i
              .split(" ")
              .filter((a) => !e.classList.contains(a))
              .filter(Boolean),
      r = (i) => (
          e.classList.add(...i),
          () => {
              e.classList.remove(...i);
          }
      );
  return (t = t === !0 ? (t = "") : t || ""), r(n(t));
}
function Jr(e, t) {
  let n = (s) => s.split(" ").filter(Boolean),
      r = Object.entries(t)
          .flatMap(([s, l]) => (l ? n(s) : !1))
          .filter(Boolean),
      i = Object.entries(t)
          .flatMap(([s, l]) => (l ? !1 : n(s)))
          .filter(Boolean),
      a = [],
      o = [];
  return (
      i.forEach((s) => {
          e.classList.contains(s) && (e.classList.remove(s), o.push(s));
      }),
      r.forEach((s) => {
          e.classList.contains(s) || (e.classList.add(s), a.push(s));
      }),
      () => {
          o.forEach((s) => e.classList.add(s)), a.forEach((s) => e.classList.remove(s));
      }
  );
}
function Me(e, t) {
  return typeof t == "object" && t !== null ? Yr(e, t) : Xr(e, t);
}
function Yr(e, t) {
  let n = {};
  return (
      Object.entries(t).forEach(([r, i]) => {
          (n[r] = e.style[r]), r.startsWith("--") || (r = Zr(r)), e.style.setProperty(r, i);
      }),
      setTimeout(() => {
          e.style.length === 0 && e.removeAttribute("style");
      }),
      () => {
          Me(e, n);
      }
  );
}
function Xr(e, t) {
  let n = e.getAttribute("style", t);
  return (
      e.setAttribute("style", t),
      () => {
          e.setAttribute("style", n || "");
      }
  );
}
function Zr(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function et(e, t = () => {}) {
  let n = !1;
  return function () {
      n ? t.apply(this, arguments) : ((n = !0), e.apply(this, arguments));
  };
}
T("transition", (e, { value: t, modifiers: n, expression: r }, { evaluate: i }) => {
  typeof r == "function" && (r = i(r)), r !== !1 && (!r || typeof r == "boolean" ? ei(e, n, t) : Qr(e, r, t));
});
function Qr(e, t, n) {
  Nn(e, xt, ""),
      {
          enter: (i) => {
              e._x_transition.enter.during = i;
          },
          "enter-start": (i) => {
              e._x_transition.enter.start = i;
          },
          "enter-end": (i) => {
              e._x_transition.enter.end = i;
          },
          leave: (i) => {
              e._x_transition.leave.during = i;
          },
          "leave-start": (i) => {
              e._x_transition.leave.start = i;
          },
          "leave-end": (i) => {
              e._x_transition.leave.end = i;
          },
      }[n](t);
}
function ei(e, t, n) {
  Nn(e, Me);
  let r = !t.includes("in") && !t.includes("out") && !n,
      i = r || t.includes("in") || ["enter"].includes(n),
      a = r || t.includes("out") || ["leave"].includes(n);
  t.includes("in") && !r && (t = t.filter((v, y) => y < t.indexOf("out"))), t.includes("out") && !r && (t = t.filter((v, y) => y > t.indexOf("out")));
  let o = !t.includes("opacity") && !t.includes("scale"),
      s = o || t.includes("opacity"),
      l = o || t.includes("scale"),
      c = s ? 0 : 1,
      u = l ? re(t, "scale", 95) / 100 : 1,
      h = re(t, "delay", 0) / 1e3,
      g = re(t, "origin", "center"),
      b = "opacity, transform",
      E = re(t, "duration", 150) / 1e3,
      k = re(t, "duration", 75) / 1e3,
      p = "cubic-bezier(0.4, 0.0, 0.2, 1)";
  i &&
      ((e._x_transition.enter.during = { transformOrigin: g, transitionDelay: `${h}s`, transitionProperty: b, transitionDuration: `${E}s`, transitionTimingFunction: p }),
      (e._x_transition.enter.start = { opacity: c, transform: `scale(${u})` }),
      (e._x_transition.enter.end = { opacity: 1, transform: "scale(1)" })),
      a &&
          ((e._x_transition.leave.during = { transformOrigin: g, transitionDelay: `${h}s`, transitionProperty: b, transitionDuration: `${k}s`, transitionTimingFunction: p }),
          (e._x_transition.leave.start = { opacity: 1, transform: "scale(1)" }),
          (e._x_transition.leave.end = { opacity: c, transform: `scale(${u})` }));
}
function Nn(e, t, n = {}) {
  e._x_transition ||
      (e._x_transition = {
          enter: { during: n, start: n, end: n },
          leave: { during: n, start: n, end: n },
          in(r = () => {}, i = () => {}) {
              tt(e, t, { during: this.enter.during, start: this.enter.start, end: this.enter.end }, r, i);
          },
          out(r = () => {}, i = () => {}) {
              tt(e, t, { during: this.leave.during, start: this.leave.start, end: this.leave.end }, r, i);
          },
      });
}
window.Element.prototype._x_toggleAndCascadeWithTransitions = function (e, t, n, r) {
  const i = document.visibilityState === "visible" ? requestAnimationFrame : setTimeout;
  let a = () => i(n);
  if (t) {
      e._x_transition && (e._x_transition.enter || e._x_transition.leave)
          ? e._x_transition.enter && (Object.entries(e._x_transition.enter.during).length || Object.entries(e._x_transition.enter.start).length || Object.entries(e._x_transition.enter.end).length)
              ? e._x_transition.in(n)
              : a()
          : e._x_transition
          ? e._x_transition.in(n)
          : a();
      return;
  }
  (e._x_hidePromise = e._x_transition
      ? new Promise((o, s) => {
            e._x_transition.out(
                () => {},
                () => o(r)
            ),
                e._x_transitioning.beforeCancel(() => s({ isFromCancelledTransition: !0 }));
        })
      : Promise.resolve(r)),
      queueMicrotask(() => {
          let o = Rn(e);
          o
              ? (o._x_hideChildren || (o._x_hideChildren = []), o._x_hideChildren.push(e))
              : i(() => {
                    let s = (l) => {
                        let c = Promise.all([l._x_hidePromise, ...(l._x_hideChildren || []).map(s)]).then(([u]) => u());
                        return delete l._x_hidePromise, delete l._x_hideChildren, c;
                    };
                    s(e).catch((l) => {
                        if (!l.isFromCancelledTransition) throw l;
                    });
                });
      });
};
function Rn(e) {
  let t = e.parentNode;
  if (t) return t._x_hidePromise ? t : Rn(t);
}
function tt(e, t, { during: n, start: r, end: i } = {}, a = () => {}, o = () => {}) {
  if ((e._x_transitioning && e._x_transitioning.cancel(), Object.keys(n).length === 0 && Object.keys(r).length === 0 && Object.keys(i).length === 0)) {
      a(), o();
      return;
  }
  let s, l, c;
  ti(e, {
      start() {
          s = t(e, r);
      },
      during() {
          l = t(e, n);
      },
      before: a,
      end() {
          s(), (c = t(e, i));
      },
      after: o,
      cleanup() {
          l(), c();
      },
  });
}
function ti(e, t) {
  let n,
      r,
      i,
      a = et(() => {
          A(() => {
              (n = !0), r || t.before(), i || (t.end(), Qe()), t.after(), e.isConnected && t.cleanup(), delete e._x_transitioning;
          });
      });
  (e._x_transitioning = {
      beforeCancels: [],
      beforeCancel(o) {
          this.beforeCancels.push(o);
      },
      cancel: et(function () {
          for (; this.beforeCancels.length; ) this.beforeCancels.shift()();
          a();
      }),
      finish: a,
  }),
      A(() => {
          t.start(), t.during();
      }),
      Gr(),
      requestAnimationFrame(() => {
          if (n) return;
          let o = Number(getComputedStyle(e).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3,
              s = Number(getComputedStyle(e).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
          o === 0 && (o = Number(getComputedStyle(e).animationDuration.replace("s", "")) * 1e3),
              A(() => {
                  t.before();
              }),
              (r = !0),
              requestAnimationFrame(() => {
                  n ||
                      (A(() => {
                          t.end();
                      }),
                      Qe(),
                      setTimeout(e._x_transitioning.finish, o + s),
                      (i = !0));
              });
      });
}
function re(e, t, n) {
  if (e.indexOf(t) === -1) return n;
  const r = e[e.indexOf(t) + 1];
  if (!r || (t === "scale" && isNaN(r))) return n;
  if (t === "duration" || t === "delay") {
      let i = r.match(/([0-9]+)ms/);
      if (i) return i[1];
  }
  return t === "origin" && ["top", "right", "left", "center", "bottom"].includes(e[e.indexOf(t) + 2]) ? [r, e[e.indexOf(t) + 2]].join(" ") : r;
}
var z = !1;
function Ne(e, t = () => {}) {
  return (...n) => (z ? t(...n) : e(...n));
}
function ni(e) {
  return (...t) => z && e(...t);
}
function ri(e, t) {
  e._x_dataStack && ((t._x_dataStack = e._x_dataStack), t.setAttribute("data-has-alpine-state", !0)),
      (z = !0),
      Fn(() => {
          D(t, (n, r) => {
              r(n, () => {});
          });
      }),
      (z = !1);
}
var nt = !1;
function ii(e, t) {
  t._x_dataStack || (t._x_dataStack = e._x_dataStack),
      (z = !0),
      (nt = !0),
      Fn(() => {
          ai(t);
      }),
      (z = !1),
      (nt = !1);
}
function ai(e) {
  let t = !1;
  D(e, (r, i) => {
      B(r, (a, o) => {
          if (t && Cr(a)) return o();
          (t = !0), i(a, o);
      });
  });
}
function Fn(e) {
  let t = ee;
  It((n, r) => {
      let i = t(n);
      return de(i), () => {};
  }),
      e(),
      It(t);
}
function oi(e) {
  return z ? (nt ? !0 : e.hasAttribute("data-has-alpine-state")) : !1;
}
function Pn(e, t, n, r = []) {
  switch ((e._x_bindings || (e._x_bindings = Q({})), (e._x_bindings[t] = n), (t = r.includes("camel") ? pi(t) : t), t)) {
      case "value":
          si(e, n);
          break;
      case "style":
          ci(e, n);
          break;
      case "class":
          li(e, n);
          break;
      case "selected":
      case "checked":
          ui(e, t, n);
          break;
      default:
          Ln(e, t, n);
          break;
  }
}
function si(e, t) {
  if (e.type === "radio") e.attributes.value === void 0 && (e.value = t), window.fromModel && (e.checked = Rt(e.value, t));
  else if (e.type === "checkbox")
      Number.isInteger(t) ? (e.value = t) : !Array.isArray(t) && typeof t != "boolean" && ![null, void 0].includes(t) ? (e.value = String(t)) : Array.isArray(t) ? (e.checked = t.some((n) => Rt(n, e.value))) : (e.checked = !!t);
  else if (e.tagName === "SELECT") hi(e, t);
  else {
      if (e.value === t) return;
      e.value = t === void 0 ? "" : t;
  }
}
function li(e, t) {
  e._x_undoAddedClasses && e._x_undoAddedClasses(), (e._x_undoAddedClasses = xt(e, t));
}
function ci(e, t) {
  e._x_undoAddedStyles && e._x_undoAddedStyles(), (e._x_undoAddedStyles = Me(e, t));
}
function ui(e, t, n) {
  Ln(e, t, n), fi(e, t, n);
}
function Ln(e, t, n) {
  [null, void 0, !1].includes(n) && gi(t) ? e.removeAttribute(t) : (jn(t) && (n = t), di(e, t, n));
}
function di(e, t, n) {
  e.getAttribute(t) != n && e.setAttribute(t, n);
}
function fi(e, t, n) {
  e[t] !== n && (e[t] = n);
}
function hi(e, t) {
  const n = [].concat(t).map((r) => r + "");
  Array.from(e.options).forEach((r) => {
      r.selected = n.includes(r.value);
  });
}
function pi(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, n) => n.toUpperCase());
}
function Rt(e, t) {
  return e == t;
}
function jn(e) {
  return [
      "disabled",
      "checked",
      "required",
      "readonly",
      "hidden",
      "open",
      "selected",
      "autofocus",
      "itemscope",
      "multiple",
      "novalidate",
      "allowfullscreen",
      "allowpaymentrequest",
      "formnovalidate",
      "autoplay",
      "controls",
      "loop",
      "muted",
      "playsinline",
      "default",
      "ismap",
      "reversed",
      "async",
      "defer",
      "nomodule",
  ].includes(e);
}
function gi(e) {
  return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(e);
}
function mi(e, t, n) {
  return e._x_bindings && e._x_bindings[t] !== void 0 ? e._x_bindings[t] : Dn(e, t, n);
}
function vi(e, t, n, r = !0) {
  if (e._x_bindings && e._x_bindings[t] !== void 0) return e._x_bindings[t];
  if (e._x_inlineBindings && e._x_inlineBindings[t] !== void 0) {
      let i = e._x_inlineBindings[t];
      return (i.extract = r), wn(() => V(e, i.expression));
  }
  return Dn(e, t, n);
}
function Dn(e, t, n) {
  let r = e.getAttribute(t);
  return r === null ? (typeof n == "function" ? n() : n) : r === "" ? !0 : jn(t) ? !![t, "true"].includes(r) : r;
}
function Hn(e, t) {
  var n;
  return function () {
      var r = this,
          i = arguments,
          a = function () {
              (n = null), e.apply(r, i);
          };
      clearTimeout(n), (n = setTimeout(a, t));
  };
}
function $n(e, t) {
  let n;
  return function () {
      let r = this,
          i = arguments;
      n || (e.apply(r, i), (n = !0), setTimeout(() => (n = !1), t));
  };
}
function Bn({ get: e, set: t }, { get: n, set: r }) {
  let i = !0,
      a,
      o,
      s,
      l = ee(() => {
          let c, u;
          i ? ((c = e()), r(JSON.parse(JSON.stringify(c))), (u = n()), (i = !1)) : ((c = e()), (u = n()), (o = JSON.stringify(c)), (s = JSON.stringify(u)), o !== a ? ((u = n()), r(c), (u = c)) : (t(JSON.parse(s ?? null)), (c = u))),
              (a = JSON.stringify(c)),
              JSON.stringify(u);
      });
  return () => {
      de(l);
  };
}
function bi(e) {
  (Array.isArray(e) ? e : [e]).forEach((n) => n(pe));
}
var K = {},
  Ft = !1;
function yi(e, t) {
  if ((Ft || ((K = Q(K)), (Ft = !0)), t === void 0)) return K[e];
  (K[e] = t), typeof t == "object" && t !== null && t.hasOwnProperty("init") && typeof t.init == "function" && K[e].init(), vn(K[e]);
}
function wi() {
  return K;
}
var zn = {};
function _i(e, t) {
  let n = typeof t != "function" ? () => t : t;
  return e instanceof Element ? Wn(e, n()) : ((zn[e] = n), () => {});
}
function xi(e) {
  return (
      Object.entries(zn).forEach(([t, n]) => {
          Object.defineProperty(e, t, {
              get() {
                  return (...r) => n(...r);
              },
          });
      }),
      e
  );
}
function Wn(e, t, n) {
  let r = [];
  for (; r.length; ) r.pop()();
  let i = Object.entries(t).map(([o, s]) => ({ name: o, value: s })),
      a = Sn(i);
  return (
      (i = i.map((o) => (a.find((s) => s.name === o.name) ? { name: `x-bind:${o.name}`, value: `"${o.value}"` } : o))),
      bt(e, i, n).map((o) => {
          r.push(o.runCleanups), o();
      }),
      () => {
          for (; r.length; ) r.pop()();
      }
  );
}
var Kn = {};
function Si(e, t) {
  Kn[e] = t;
}
function Ei(e, t) {
  return (
      Object.entries(Kn).forEach(([n, r]) => {
          Object.defineProperty(e, n, {
              get() {
                  return (...i) => r.bind(t)(...i);
              },
              enumerable: !1,
          });
      }),
      e
  );
}
var Ti = {
      get reactive() {
          return Q;
      },
      get release() {
          return de;
      },
      get effect() {
          return ee;
      },
      get raw() {
          return tn;
      },
      version: "3.13.1",
      flushAndStopDeferringMutations: Fr,
      dontAutoEvaluateFunctions: wn,
      disableEffectScheduling: Sr,
      startObservingMutations: pt,
      stopObservingMutations: gn,
      setReactivityEngine: Er,
      onAttributeRemoved: hn,
      onAttributesAdded: fn,
      closestDataStack: X,
      skipDuringClone: Ne,
      onlyDuringClone: ni,
      addRootSelector: on,
      addInitSelector: sn,
      addScopeToNode: fe,
      deferMutations: Rr,
      mapAttributes: yt,
      evaluateLater: M,
      interceptInit: kr,
      setEvaluator: Hr,
      mergeProxies: he,
      extractProp: vi,
      findClosest: Ie,
      onElRemoved: dt,
      closestRoot: Oe,
      destroyTree: ut,
      interceptor: bn,
      transition: tt,
      setStyles: Me,
      mutateDom: A,
      directive: T,
      entangle: Bn,
      throttle: $n,
      debounce: Hn,
      evaluate: V,
      initTree: D,
      nextTick: _t,
      prefixed: te,
      prefix: Wr,
      plugin: bi,
      magic: R,
      store: yi,
      start: Ar,
      clone: ii,
      cloneNode: ri,
      bound: mi,
      $data: mn,
      walk: B,
      data: Si,
      bind: _i,
  },
  pe = Ti;
function Ai(e, t) {
  const n = Object.create(null),
      r = e.split(",");
  for (let i = 0; i < r.length; i++) n[r[i]] = !0;
  return t ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i];
}
var Ci = Object.freeze({}),
  ki = Object.prototype.hasOwnProperty,
  Re = (e, t) => ki.call(e, t),
  G = Array.isArray,
  ce = (e) => Un(e) === "[object Map]",
  Oi = (e) => typeof e == "string",
  St = (e) => typeof e == "symbol",
  Fe = (e) => e !== null && typeof e == "object",
  Ii = Object.prototype.toString,
  Un = (e) => Ii.call(e),
  qn = (e) => Un(e).slice(8, -1),
  Et = (e) => Oi(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  Mi = (e) => {
      const t = Object.create(null);
      return (n) => t[n] || (t[n] = e(n));
  },
  Ni = Mi((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Vn = (e, t) => e !== t && (e === e || t === t),
  rt = new WeakMap(),
  ie = [],
  P,
  J = Symbol("iterate"),
  it = Symbol("Map key iterate");
function Ri(e) {
  return e && e._isEffect === !0;
}
function Fi(e, t = Ci) {
  Ri(e) && (e = e.raw);
  const n = ji(e, t);
  return t.lazy || n(), n;
}
function Pi(e) {
  e.active && (Gn(e), e.options.onStop && e.options.onStop(), (e.active = !1));
}
var Li = 0;
function ji(e, t) {
  const n = function () {
      if (!n.active) return e();
      if (!ie.includes(n)) {
          Gn(n);
          try {
              return Hi(), ie.push(n), (P = n), e();
          } finally {
              ie.pop(), Jn(), (P = ie[ie.length - 1]);
          }
      }
  };
  return (n.id = Li++), (n.allowRecurse = !!t.allowRecurse), (n._isEffect = !0), (n.active = !0), (n.raw = e), (n.deps = []), (n.options = t), n;
}
function Gn(e) {
  const { deps: t } = e;
  if (t.length) {
      for (let n = 0; n < t.length; n++) t[n].delete(e);
      t.length = 0;
  }
}
var Z = !0,
  Tt = [];
function Di() {
  Tt.push(Z), (Z = !1);
}
function Hi() {
  Tt.push(Z), (Z = !0);
}
function Jn() {
  const e = Tt.pop();
  Z = e === void 0 ? !0 : e;
}
function N(e, t, n) {
  if (!Z || P === void 0) return;
  let r = rt.get(e);
  r || rt.set(e, (r = new Map()));
  let i = r.get(n);
  i || r.set(n, (i = new Set())), i.has(P) || (i.add(P), P.deps.push(i), P.options.onTrack && P.options.onTrack({ effect: P, target: e, type: t, key: n }));
}
function W(e, t, n, r, i, a) {
  const o = rt.get(e);
  if (!o) return;
  const s = new Set(),
      l = (u) => {
          u &&
              u.forEach((h) => {
                  (h !== P || h.allowRecurse) && s.add(h);
              });
      };
  if (t === "clear") o.forEach(l);
  else if (n === "length" && G(e))
      o.forEach((u, h) => {
          (h === "length" || h >= r) && l(u);
      });
  else
      switch ((n !== void 0 && l(o.get(n)), t)) {
          case "add":
              G(e) ? Et(n) && l(o.get("length")) : (l(o.get(J)), ce(e) && l(o.get(it)));
              break;
          case "delete":
              G(e) || (l(o.get(J)), ce(e) && l(o.get(it)));
              break;
          case "set":
              ce(e) && l(o.get(J));
              break;
      }
  const c = (u) => {
      u.options.onTrigger && u.options.onTrigger({ effect: u, target: e, key: n, type: t, newValue: r, oldValue: i, oldTarget: a }), u.options.scheduler ? u.options.scheduler(u) : u();
  };
  s.forEach(c);
}
var $i = Ai("__proto__,__v_isRef,__isVue"),
  Yn = new Set(
      Object.getOwnPropertyNames(Symbol)
          .map((e) => Symbol[e])
          .filter(St)
  ),
  Bi = Xn(),
  zi = Xn(!0),
  Pt = Wi();
function Wi() {
  const e = {};
  return (
      ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
          e[t] = function (...n) {
              const r = _(this);
              for (let a = 0, o = this.length; a < o; a++) N(r, "get", a + "");
              const i = r[t](...n);
              return i === -1 || i === !1 ? r[t](...n.map(_)) : i;
          };
      }),
      ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
          e[t] = function (...n) {
              Di();
              const r = _(this)[t].apply(this, n);
              return Jn(), r;
          };
      }),
      e
  );
}
function Xn(e = !1, t = !1) {
  return function (r, i, a) {
      if (i === "__v_isReactive") return !e;
      if (i === "__v_isReadonly") return e;
      if (i === "__v_raw" && a === (e ? (t ? aa : tr) : t ? ia : er).get(r)) return r;
      const o = G(r);
      if (!e && o && Re(Pt, i)) return Reflect.get(Pt, i, a);
      const s = Reflect.get(r, i, a);
      return (St(i) ? Yn.has(i) : $i(i)) || (e || N(r, "get", i), t) ? s : at(s) ? (!o || !Et(i) ? s.value : s) : Fe(s) ? (e ? nr(s) : Ot(s)) : s;
  };
}
var Ki = Ui();
function Ui(e = !1) {
  return function (n, r, i, a) {
      let o = n[r];
      if (!e && ((i = _(i)), (o = _(o)), !G(n) && at(o) && !at(i))) return (o.value = i), !0;
      const s = G(n) && Et(r) ? Number(r) < n.length : Re(n, r),
          l = Reflect.set(n, r, i, a);
      return n === _(a) && (s ? Vn(i, o) && W(n, "set", r, i, o) : W(n, "add", r, i)), l;
  };
}
function qi(e, t) {
  const n = Re(e, t),
      r = e[t],
      i = Reflect.deleteProperty(e, t);
  return i && n && W(e, "delete", t, void 0, r), i;
}
function Vi(e, t) {
  const n = Reflect.has(e, t);
  return (!St(t) || !Yn.has(t)) && N(e, "has", t), n;
}
function Gi(e) {
  return N(e, "iterate", G(e) ? "length" : J), Reflect.ownKeys(e);
}
var Ji = { get: Bi, set: Ki, deleteProperty: qi, has: Vi, ownKeys: Gi },
  Yi = {
      get: zi,
      set(e, t) {
          return console.warn(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0;
      },
      deleteProperty(e, t) {
          return console.warn(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0;
      },
  },
  At = (e) => (Fe(e) ? Ot(e) : e),
  Ct = (e) => (Fe(e) ? nr(e) : e),
  kt = (e) => e,
  Pe = (e) => Reflect.getPrototypeOf(e);
function ge(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const i = _(e),
      a = _(t);
  t !== a && !n && N(i, "get", t), !n && N(i, "get", a);
  const { has: o } = Pe(i),
      s = r ? kt : n ? Ct : At;
  if (o.call(i, t)) return s(e.get(t));
  if (o.call(i, a)) return s(e.get(a));
  e !== i && e.get(t);
}
function me(e, t = !1) {
  const n = this.__v_raw,
      r = _(n),
      i = _(e);
  return e !== i && !t && N(r, "has", e), !t && N(r, "has", i), e === i ? n.has(e) : n.has(e) || n.has(i);
}
function ve(e, t = !1) {
  return (e = e.__v_raw), !t && N(_(e), "iterate", J), Reflect.get(e, "size", e);
}
function Lt(e) {
  e = _(e);
  const t = _(this);
  return Pe(t).has.call(t, e) || (t.add(e), W(t, "add", e, e)), this;
}
function jt(e, t) {
  t = _(t);
  const n = _(this),
      { has: r, get: i } = Pe(n);
  let a = r.call(n, e);
  a ? Qn(n, r, e) : ((e = _(e)), (a = r.call(n, e)));
  const o = i.call(n, e);
  return n.set(e, t), a ? Vn(t, o) && W(n, "set", e, t, o) : W(n, "add", e, t), this;
}
function Dt(e) {
  const t = _(this),
      { has: n, get: r } = Pe(t);
  let i = n.call(t, e);
  i ? Qn(t, n, e) : ((e = _(e)), (i = n.call(t, e)));
  const a = r ? r.call(t, e) : void 0,
      o = t.delete(e);
  return i && W(t, "delete", e, void 0, a), o;
}
function Ht() {
  const e = _(this),
      t = e.size !== 0,
      n = ce(e) ? new Map(e) : new Set(e),
      r = e.clear();
  return t && W(e, "clear", void 0, void 0, n), r;
}
function be(e, t) {
  return function (r, i) {
      const a = this,
          o = a.__v_raw,
          s = _(o),
          l = t ? kt : e ? Ct : At;
      return !e && N(s, "iterate", J), o.forEach((c, u) => r.call(i, l(c), l(u), a));
  };
}
function ye(e, t, n) {
  return function (...r) {
      const i = this.__v_raw,
          a = _(i),
          o = ce(a),
          s = e === "entries" || (e === Symbol.iterator && o),
          l = e === "keys" && o,
          c = i[e](...r),
          u = n ? kt : t ? Ct : At;
      return (
          !t && N(a, "iterate", l ? it : J),
          {
              next() {
                  const { value: h, done: g } = c.next();
                  return g ? { value: h, done: g } : { value: s ? [u(h[0]), u(h[1])] : u(h), done: g };
              },
              [Symbol.iterator]() {
                  return this;
              },
          }
      );
  };
}
function $(e) {
  return function (...t) {
      {
          const n = t[0] ? `on key "${t[0]}" ` : "";
          console.warn(`${Ni(e)} operation ${n}failed: target is readonly.`, _(this));
      }
      return e === "delete" ? !1 : this;
  };
}
function Xi() {
  const e = {
          get(a) {
              return ge(this, a);
          },
          get size() {
              return ve(this);
          },
          has: me,
          add: Lt,
          set: jt,
          delete: Dt,
          clear: Ht,
          forEach: be(!1, !1),
      },
      t = {
          get(a) {
              return ge(this, a, !1, !0);
          },
          get size() {
              return ve(this);
          },
          has: me,
          add: Lt,
          set: jt,
          delete: Dt,
          clear: Ht,
          forEach: be(!1, !0),
      },
      n = {
          get(a) {
              return ge(this, a, !0);
          },
          get size() {
              return ve(this, !0);
          },
          has(a) {
              return me.call(this, a, !0);
          },
          add: $("add"),
          set: $("set"),
          delete: $("delete"),
          clear: $("clear"),
          forEach: be(!0, !1),
      },
      r = {
          get(a) {
              return ge(this, a, !0, !0);
          },
          get size() {
              return ve(this, !0);
          },
          has(a) {
              return me.call(this, a, !0);
          },
          add: $("add"),
          set: $("set"),
          delete: $("delete"),
          clear: $("clear"),
          forEach: be(!0, !0),
      };
  return (
      ["keys", "values", "entries", Symbol.iterator].forEach((a) => {
          (e[a] = ye(a, !1, !1)), (n[a] = ye(a, !0, !1)), (t[a] = ye(a, !1, !0)), (r[a] = ye(a, !0, !0));
      }),
      [e, n, t, r]
  );
}
var [Zi, Qi, ea, ta] = Xi();
function Zn(e, t) {
  const n = t ? (e ? ta : ea) : e ? Qi : Zi;
  return (r, i, a) => (i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? r : Reflect.get(Re(n, i) && i in r ? n : r, i, a));
}
var na = { get: Zn(!1, !1) },
  ra = { get: Zn(!0, !1) };
function Qn(e, t, n) {
  const r = _(n);
  if (r !== n && t.call(e, r)) {
      const i = qn(e);
      console.warn(
          `Reactive ${i} contains both the raw and reactive versions of the same object${
              i === "Map" ? " as keys" : ""
          }, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
      );
  }
}
var er = new WeakMap(),
  ia = new WeakMap(),
  tr = new WeakMap(),
  aa = new WeakMap();
function oa(e) {
  switch (e) {
      case "Object":
      case "Array":
          return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
          return 2;
      default:
          return 0;
  }
}
function sa(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : oa(qn(e));
}
function Ot(e) {
  return e && e.__v_isReadonly ? e : rr(e, !1, Ji, na, er);
}
function nr(e) {
  return rr(e, !0, Yi, ra, tr);
}
function rr(e, t, n, r, i) {
  if (!Fe(e)) return console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive)) return e;
  const a = i.get(e);
  if (a) return a;
  const o = sa(e);
  if (o === 0) return e;
  const s = new Proxy(e, o === 2 ? r : n);
  return i.set(e, s), s;
}
function _(e) {
  return (e && _(e.__v_raw)) || e;
}
function at(e) {
  return !!(e && e.__v_isRef === !0);
}
R("nextTick", () => _t);
R("dispatch", (e) => se.bind(se, e));
R("watch", (e, { evaluateLater: t, effect: n }) => (r, i) => {
  let a = t(r),
      o = !0,
      s,
      l = n(() =>
          a((c) => {
              JSON.stringify(c),
                  o
                      ? (s = c)
                      : queueMicrotask(() => {
                            i(c, s), (s = c);
                        }),
                  (o = !1);
          })
      );
  e._x_effects.delete(l);
});
R("store", wi);
R("data", (e) => mn(e));
R("root", (e) => Oe(e));
R("refs", (e) => (e._x_refs_proxy || (e._x_refs_proxy = he(la(e))), e._x_refs_proxy));
function la(e) {
  let t = [],
      n = e;
  for (; n; ) n._x_refs && t.push(n._x_refs), (n = n.parentNode);
  return t;
}
var Be = {};
function ir(e) {
  return Be[e] || (Be[e] = 0), ++Be[e];
}
function ca(e, t) {
  return Ie(e, (n) => {
      if (n._x_ids && n._x_ids[t]) return !0;
  });
}
function ua(e, t) {
  e._x_ids || (e._x_ids = {}), e._x_ids[t] || (e._x_ids[t] = ir(t));
}
R("id", (e) => (t, n = null) => {
  let r = ca(e, t),
      i = r ? r._x_ids[t] : ir(t);
  return n ? `${t}-${i}-${n}` : `${t}-${i}`;
});
R("el", (e) => e);
ar("Focus", "focus", "focus");
ar("Persist", "persist", "persist");
function ar(e, t, n) {
  R(t, (r) => j(`You can't use [$${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`, r));
}
T("modelable", (e, { expression: t }, { effect: n, evaluateLater: r, cleanup: i }) => {
  let a = r(t),
      o = () => {
          let u;
          return a((h) => (u = h)), u;
      },
      s = r(`${t} = __placeholder`),
      l = (u) => s(() => {}, { scope: { __placeholder: u } }),
      c = o();
  l(c),
      queueMicrotask(() => {
          if (!e._x_model) return;
          e._x_removeModelListeners.default();
          let u = e._x_model.get,
              h = e._x_model.set,
              g = Bn(
                  {
                      get() {
                          return u();
                      },
                      set(b) {
                          h(b);
                      },
                  },
                  {
                      get() {
                          return o();
                      },
                      set(b) {
                          l(b);
                      },
                  }
              );
          i(g);
      });
});
T("teleport", (e, { modifiers: t, expression: n }, { cleanup: r }) => {
  e.tagName.toLowerCase() !== "template" && j("x-teleport can only be used on a <template> tag", e);
  let i = $t(n),
      a = e.content.cloneNode(!0).firstElementChild;
  (e._x_teleport = a),
      (a._x_teleportBack = e),
      e.setAttribute("data-teleport-template", !0),
      a.setAttribute("data-teleport-target", !0),
      e._x_forwardEvents &&
          e._x_forwardEvents.forEach((s) => {
              a.addEventListener(s, (l) => {
                  l.stopPropagation(), e.dispatchEvent(new l.constructor(l.type, l));
              });
          }),
      fe(a, {}, e);
  let o = (s, l, c) => {
      c.includes("prepend") ? l.parentNode.insertBefore(s, l) : c.includes("append") ? l.parentNode.insertBefore(s, l.nextSibling) : l.appendChild(s);
  };
  A(() => {
      o(a, i, t), D(a), (a._x_ignore = !0);
  }),
      (e._x_teleportPutBack = () => {
          let s = $t(n);
          A(() => {
              o(e._x_teleport, s, t);
          });
      }),
      r(() => a.remove());
});
var da = document.createElement("div");
function $t(e) {
  let t = Ne(
      () => document.querySelector(e),
      () => da
  )();
  return t || j(`Cannot find x-teleport element for selector: "${e}"`), t;
}
var or = () => {};
or.inline = (e, { modifiers: t }, { cleanup: n }) => {
  t.includes("self") ? (e._x_ignoreSelf = !0) : (e._x_ignore = !0),
      n(() => {
          t.includes("self") ? delete e._x_ignoreSelf : delete e._x_ignore;
      });
};
T("ignore", or);
T("effect", (e, { expression: t }, { effect: n }) => n(M(e, t)));
function ot(e, t, n, r) {
  let i = e,
      a = (l) => r(l),
      o = {},
      s = (l, c) => (u) => c(l, u);
  if (
      (n.includes("dot") && (t = fa(t)),
      n.includes("camel") && (t = ha(t)),
      n.includes("passive") && (o.passive = !0),
      n.includes("capture") && (o.capture = !0),
      n.includes("window") && (i = window),
      n.includes("document") && (i = document),
      n.includes("debounce"))
  ) {
      let l = n[n.indexOf("debounce") + 1] || "invalid-wait",
          c = Ae(l.split("ms")[0]) ? Number(l.split("ms")[0]) : 250;
      a = Hn(a, c);
  }
  if (n.includes("throttle")) {
      let l = n[n.indexOf("throttle") + 1] || "invalid-wait",
          c = Ae(l.split("ms")[0]) ? Number(l.split("ms")[0]) : 250;
      a = $n(a, c);
  }
  return (
      n.includes("prevent") &&
          (a = s(a, (l, c) => {
              c.preventDefault(), l(c);
          })),
      n.includes("stop") &&
          (a = s(a, (l, c) => {
              c.stopPropagation(), l(c);
          })),
      n.includes("self") &&
          (a = s(a, (l, c) => {
              c.target === e && l(c);
          })),
      (n.includes("away") || n.includes("outside")) &&
          ((i = document),
          (a = s(a, (l, c) => {
              e.contains(c.target) || (c.target.isConnected !== !1 && ((e.offsetWidth < 1 && e.offsetHeight < 1) || (e._x_isShown !== !1 && l(c))));
          }))),
      n.includes("once") &&
          (a = s(a, (l, c) => {
              l(c), i.removeEventListener(t, a, o);
          })),
      (a = s(a, (l, c) => {
          (ga(t) && ma(c, n)) || l(c);
      })),
      i.addEventListener(t, a, o),
      () => {
          i.removeEventListener(t, a, o);
      }
  );
}
function fa(e) {
  return e.replace(/-/g, ".");
}
function ha(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, n) => n.toUpperCase());
}
function Ae(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function pa(e) {
  return [" ", "_"].includes(e)
      ? e
      : e
            .replace(/([a-z])([A-Z])/g, "$1-$2")
            .replace(/[_\s]/, "-")
            .toLowerCase();
}
function ga(e) {
  return ["keydown", "keyup"].includes(e);
}
function ma(e, t) {
  let n = t.filter((a) => !["window", "document", "prevent", "stop", "once", "capture"].includes(a));
  if (n.includes("debounce")) {
      let a = n.indexOf("debounce");
      n.splice(a, Ae((n[a + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (n.includes("throttle")) {
      let a = n.indexOf("throttle");
      n.splice(a, Ae((n[a + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (n.length === 0 || (n.length === 1 && Bt(e.key).includes(n[0]))) return !1;
  const i = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter((a) => n.includes(a));
  return (n = n.filter((a) => !i.includes(a))), !(i.length > 0 && i.filter((o) => ((o === "cmd" || o === "super") && (o = "meta"), e[`${o}Key`])).length === i.length && Bt(e.key).includes(n[0]));
}
function Bt(e) {
  if (!e) return [];
  e = pa(e);
  let t = { ctrl: "control", slash: "/", space: " ", spacebar: " ", cmd: "meta", esc: "escape", up: "arrow-up", down: "arrow-down", left: "arrow-left", right: "arrow-right", period: ".", equal: "=", minus: "-", underscore: "_" };
  return (
      (t[e] = e),
      Object.keys(t)
          .map((n) => {
              if (t[n] === e) return n;
          })
          .filter((n) => n)
  );
}
T("model", (e, { modifiers: t, expression: n }, { effect: r, cleanup: i }) => {
  let a = e;
  t.includes("parent") && (a = e.parentNode);
  let o = M(a, n),
      s;
  typeof n == "string" ? (s = M(a, `${n} = __placeholder`)) : typeof n == "function" && typeof n() == "string" ? (s = M(a, `${n()} = __placeholder`)) : (s = () => {});
  let l = () => {
          let g;
          return o((b) => (g = b)), zt(g) ? g.get() : g;
      },
      c = (g) => {
          let b;
          o((E) => (b = E)), zt(b) ? b.set(g) : s(() => {}, { scope: { __placeholder: g } });
      };
  typeof n == "string" &&
      e.type === "radio" &&
      A(() => {
          e.hasAttribute("name") || e.setAttribute("name", n);
      });
  var u = e.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(e.type) || t.includes("lazy") ? "change" : "input";
  let h = z
      ? () => {}
      : ot(e, u, t, (g) => {
            c(va(e, t, g, l()));
        });
  if (
      (t.includes("fill") && ([null, ""].includes(l()) || (e.type === "checkbox" && Array.isArray(l()))) && e.dispatchEvent(new Event(u, {})),
      e._x_removeModelListeners || (e._x_removeModelListeners = {}),
      (e._x_removeModelListeners.default = h),
      i(() => e._x_removeModelListeners.default()),
      e.form)
  ) {
      let g = ot(e.form, "reset", [], (b) => {
          _t(() => e._x_model && e._x_model.set(e.value));
      });
      i(() => g());
  }
  (e._x_model = {
      get() {
          return l();
      },
      set(g) {
          c(g);
      },
  }),
      (e._x_forceModelUpdate = (g) => {
          g === void 0 && typeof n == "string" && n.match(/\./) && (g = ""), (window.fromModel = !0), A(() => Pn(e, "value", g)), delete window.fromModel;
      }),
      r(() => {
          let g = l();
          (t.includes("unintrusive") && document.activeElement.isSameNode(e)) || e._x_forceModelUpdate(g);
      });
});
function va(e, t, n, r) {
  return A(() => {
      if (n instanceof CustomEvent && n.detail !== void 0) return n.detail !== null && n.detail !== void 0 ? n.detail : n.target.value;
      if (e.type === "checkbox")
          if (Array.isArray(r)) {
              let i = t.includes("number") ? ze(n.target.value) : n.target.value;
              return n.target.checked ? r.concat([i]) : r.filter((a) => !ba(a, i));
          } else return n.target.checked;
      else {
          if (e.tagName.toLowerCase() === "select" && e.multiple)
              return t.includes("number")
                  ? Array.from(n.target.selectedOptions).map((i) => {
                        let a = i.value || i.text;
                        return ze(a);
                    })
                  : Array.from(n.target.selectedOptions).map((i) => i.value || i.text);
          {
              let i = n.target.value;
              return t.includes("number") ? ze(i) : t.includes("trim") ? i.trim() : i;
          }
      }
  });
}
function ze(e) {
  let t = e ? parseFloat(e) : null;
  return ya(t) ? t : e;
}
function ba(e, t) {
  return e == t;
}
function ya(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function zt(e) {
  return e !== null && typeof e == "object" && typeof e.get == "function" && typeof e.set == "function";
}
T("cloak", (e) => queueMicrotask(() => A(() => e.removeAttribute(te("cloak")))));
sn(() => `[${te("init")}]`);
T(
  "init",
  Ne((e, { expression: t }, { evaluate: n }) => (typeof t == "string" ? !!t.trim() && n(t, {}, !1) : n(t, {}, !1)))
);
T("text", (e, { expression: t }, { effect: n, evaluateLater: r }) => {
  let i = r(t);
  n(() => {
      i((a) => {
          A(() => {
              e.textContent = a;
          });
      });
  });
});
T("html", (e, { expression: t }, { effect: n, evaluateLater: r }) => {
  let i = r(t);
  n(() => {
      i((a) => {
          A(() => {
              (e.innerHTML = a), (e._x_ignoreSelf = !0), D(e), delete e._x_ignoreSelf;
          });
      });
  });
});
yt(An(":", Cn(te("bind:"))));
var sr = (e, { value: t, modifiers: n, expression: r, original: i }, { effect: a }) => {
  if (!t) {
      let s = {};
      xi(s),
          M(e, r)(
              (c) => {
                  Wn(e, c, i);
              },
              { scope: s }
          );
      return;
  }
  if (t === "key") return wa(e, r);
  if (e._x_inlineBindings && e._x_inlineBindings[t] && e._x_inlineBindings[t].extract) return;
  let o = M(e, r);
  a(() =>
      o((s) => {
          s === void 0 && typeof r == "string" && r.match(/\./) && (s = ""), A(() => Pn(e, t, s, n));
      })
  );
};
sr.inline = (e, { value: t, modifiers: n, expression: r }) => {
  t && (e._x_inlineBindings || (e._x_inlineBindings = {}), (e._x_inlineBindings[t] = { expression: r, extract: !1 }));
};
T("bind", sr);
function wa(e, t) {
  e._x_keyExpression = t;
}
on(() => `[${te("data")}]`);
T("data", (e, { expression: t }, { cleanup: n }) => {
  if (oi(e)) return;
  t = t === "" ? "{}" : t;
  let r = {};
  Ge(r, e);
  let i = {};
  Ei(i, r);
  let a = V(e, t, { scope: i });
  (a === void 0 || a === !0) && (a = {}), Ge(a, e);
  let o = Q(a);
  vn(o);
  let s = fe(e, o);
  o.init && V(e, o.init),
      n(() => {
          o.destroy && V(e, o.destroy), s();
      });
});
T("show", (e, { modifiers: t, expression: n }, { effect: r }) => {
  let i = M(e, n);
  e._x_doHide ||
      (e._x_doHide = () => {
          A(() => {
              e.style.setProperty("display", "none", t.includes("important") ? "important" : void 0);
          });
      }),
      e._x_doShow ||
          (e._x_doShow = () => {
              A(() => {
                  e.style.length === 1 && e.style.display === "none" ? e.removeAttribute("style") : e.style.removeProperty("display");
              });
          });
  let a = () => {
          e._x_doHide(), (e._x_isShown = !1);
      },
      o = () => {
          e._x_doShow(), (e._x_isShown = !0);
      },
      s = () => setTimeout(o),
      l = et(
          (h) => (h ? o() : a()),
          (h) => {
              typeof e._x_toggleAndCascadeWithTransitions == "function" ? e._x_toggleAndCascadeWithTransitions(e, h, o, a) : h ? s() : a();
          }
      ),
      c,
      u = !0;
  r(() =>
      i((h) => {
          (!u && h === c) || (t.includes("immediate") && (h ? s() : a()), l(h), (c = h), (u = !1));
      })
  );
});
T("for", (e, { expression: t }, { effect: n, cleanup: r }) => {
  let i = xa(t),
      a = M(e, i.items),
      o = M(e, e._x_keyExpression || "index");
  (e._x_prevKeys = []),
      (e._x_lookup = {}),
      n(() => _a(e, i, a, o)),
      r(() => {
          Object.values(e._x_lookup).forEach((s) => s.remove()), delete e._x_prevKeys, delete e._x_lookup;
      });
});
function _a(e, t, n, r) {
  let i = (o) => typeof o == "object" && !Array.isArray(o),
      a = e;
  n((o) => {
      Sa(o) && o >= 0 && (o = Array.from(Array(o).keys(), (p) => p + 1)), o === void 0 && (o = []);
      let s = e._x_lookup,
          l = e._x_prevKeys,
          c = [],
          u = [];
      if (i(o))
          o = Object.entries(o).map(([p, v]) => {
              let y = Wt(t, v, p, o);
              r((C) => u.push(C), { scope: { index: p, ...y } }), c.push(y);
          });
      else
          for (let p = 0; p < o.length; p++) {
              let v = Wt(t, o[p], p, o);
              r((y) => u.push(y), { scope: { index: p, ...v } }), c.push(v);
          }
      let h = [],
          g = [],
          b = [],
          E = [];
      for (let p = 0; p < l.length; p++) {
          let v = l[p];
          u.indexOf(v) === -1 && b.push(v);
      }
      l = l.filter((p) => !b.includes(p));
      let k = "template";
      for (let p = 0; p < u.length; p++) {
          let v = u[p],
              y = l.indexOf(v);
          if (y === -1) l.splice(p, 0, v), h.push([k, p]);
          else if (y !== p) {
              let C = l.splice(p, 1)[0],
                  O = l.splice(y - 1, 1)[0];
              l.splice(p, 0, O), l.splice(y, 0, C), g.push([C, O]);
          } else E.push(v);
          k = v;
      }
      for (let p = 0; p < b.length; p++) {
          let v = b[p];
          s[v]._x_effects && s[v]._x_effects.forEach(en), s[v].remove(), (s[v] = null), delete s[v];
      }
      for (let p = 0; p < g.length; p++) {
          let [v, y] = g[p],
              C = s[v],
              O = s[y],
              w = document.createElement("div");
          A(() => {
              O || j('x-for ":key" is undefined or invalid', a), O.after(w), C.after(O), O._x_currentIfEl && O.after(O._x_currentIfEl), w.before(C), C._x_currentIfEl && C.after(C._x_currentIfEl), w.remove();
          }),
              O._x_refreshXForScope(c[u.indexOf(y)]);
      }
      for (let p = 0; p < h.length; p++) {
          let [v, y] = h[p],
              C = v === "template" ? a : s[v];
          C._x_currentIfEl && (C = C._x_currentIfEl);
          let O = c[y],
              w = u[y],
              d = document.importNode(a.content, !0).firstElementChild,
              f = Q(O);
          fe(d, f, a),
              (d._x_refreshXForScope = (m) => {
                  Object.entries(m).forEach(([S, x]) => {
                      f[S] = x;
                  });
              }),
              A(() => {
                  C.after(d), D(d);
              }),
              typeof w == "object" && j("x-for key cannot be an object, it must be a string or an integer", a),
              (s[w] = d);
      }
      for (let p = 0; p < E.length; p++) s[E[p]]._x_refreshXForScope(c[u.indexOf(E[p])]);
      a._x_prevKeys = u;
  });
}
function xa(e) {
  let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
      n = /^\s*\(|\)\s*$/g,
      r = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,
      i = e.match(r);
  if (!i) return;
  let a = {};
  a.items = i[2].trim();
  let o = i[1].replace(n, "").trim(),
      s = o.match(t);
  return s ? ((a.item = o.replace(t, "").trim()), (a.index = s[1].trim()), s[2] && (a.collection = s[2].trim())) : (a.item = o), a;
}
function Wt(e, t, n, r) {
  let i = {};
  return (
      /^\[.*\]$/.test(e.item) && Array.isArray(t)
          ? e.item
                .replace("[", "")
                .replace("]", "")
                .split(",")
                .map((o) => o.trim())
                .forEach((o, s) => {
                    i[o] = t[s];
                })
          : /^\{.*\}$/.test(e.item) && !Array.isArray(t) && typeof t == "object"
          ? e.item
                .replace("{", "")
                .replace("}", "")
                .split(",")
                .map((o) => o.trim())
                .forEach((o) => {
                    i[o] = t[o];
                })
          : (i[e.item] = t),
      e.index && (i[e.index] = n),
      e.collection && (i[e.collection] = r),
      i
  );
}
function Sa(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function lr() {}
lr.inline = (e, { expression: t }, { cleanup: n }) => {
  let r = Oe(e);
  r._x_refs || (r._x_refs = {}), (r._x_refs[t] = e), n(() => delete r._x_refs[t]);
};
T("ref", lr);
T("if", (e, { expression: t }, { effect: n, cleanup: r }) => {
  e.tagName.toLowerCase() !== "template" && j("x-if can only be used on a <template> tag", e);
  let i = M(e, t),
      a = () => {
          if (e._x_currentIfEl) return e._x_currentIfEl;
          let s = e.content.cloneNode(!0).firstElementChild;
          return (
              fe(s, {}, e),
              A(() => {
                  e.after(s), D(s);
              }),
              (e._x_currentIfEl = s),
              (e._x_undoIf = () => {
                  B(s, (l) => {
                      l._x_effects && l._x_effects.forEach(en);
                  }),
                      s.remove(),
                      delete e._x_currentIfEl;
              }),
              s
          );
      },
      o = () => {
          e._x_undoIf && (e._x_undoIf(), delete e._x_undoIf);
      };
  n(() =>
      i((s) => {
          s ? a() : o();
      })
  ),
      r(() => e._x_undoIf && e._x_undoIf());
});
T("id", (e, { expression: t }, { evaluate: n }) => {
  n(t).forEach((i) => ua(e, i));
});
yt(An("@", Cn(te("on:"))));
T(
  "on",
  Ne((e, { value: t, modifiers: n, expression: r }, { cleanup: i }) => {
      let a = r ? M(e, r) : () => {};
      e.tagName.toLowerCase() === "template" && (e._x_forwardEvents || (e._x_forwardEvents = []), e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t));
      let o = ot(e, t, n, (s) => {
          a(() => {}, { scope: { $event: s }, params: [s] });
      });
      i(() => o());
  })
);
Le("Collapse", "collapse", "collapse");
Le("Intersect", "intersect", "intersect");
Le("Focus", "trap", "focus");
Le("Mask", "mask", "mask");
function Le(e, t, n) {
  T(t, (r) => j(`You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${n}`, r));
}
pe.setEvaluator(xn);
pe.setReactivityEngine({ reactive: Ot, effect: Fi, release: Pi, raw: _ });
var Ea = pe,
  F = Ea;
function Ta(e) {
  e.directive("intersect", (t, { value: n, expression: r, modifiers: i }, { evaluateLater: a, cleanup: o }) => {
      let s = a(r),
          l = { rootMargin: ka(i), threshold: Aa(i) },
          c = new IntersectionObserver((u) => {
              u.forEach((h) => {
                  h.isIntersecting !== (n === "leave") && (s(), i.includes("once") && c.disconnect());
              });
          }, l);
      c.observe(t),
          o(() => {
              c.disconnect();
          });
  });
}
function Aa(e) {
  if (e.includes("full")) return 0.99;
  if (e.includes("half")) return 0.5;
  if (!e.includes("threshold")) return 0;
  let t = e[e.indexOf("threshold") + 1];
  return t === "100" ? 1 : t === "0" ? 0 : +`.${t}`;
}
function Ca(e) {
  let t = e.match(/^(-?[0-9]+)(px|%)?$/);
  return t ? t[1] + (t[2] || "px") : void 0;
}
function ka(e) {
  const t = "margin",
      n = "0px 0px 0px 0px",
      r = e.indexOf(t);
  if (r === -1) return n;
  let i = [];
  for (let a = 1; a < 5; a++) i.push(Ca(e[r + a] || ""));
  return (i = i.filter((a) => a !== void 0)), i.length ? i.join(" ").trim() : n;
}
var Oa = Ta;
function Ia(e) {
  let t = () => {
      let n,
          r = localStorage;
      return e.interceptor(
          (i, a, o, s, l) => {
              let c = n || `_x_${s}`,
                  u = Kt(c, r) ? Ut(c, r) : i;
              return (
                  o(u),
                  e.effect(() => {
                      let h = a();
                      qt(c, h, r), o(h);
                  }),
                  u
              );
          },
          (i) => {
              (i.as = (a) => ((n = a), i)), (i.using = (a) => ((r = a), i));
          }
      );
  };
  Object.defineProperty(e, "$persist", { get: () => t() }),
      e.magic("persist", t),
      (e.persist = (n, { get: r, set: i }, a = localStorage) => {
          let o = Kt(n, a) ? Ut(n, a) : r();
          i(o),
              e.effect(() => {
                  let s = r();
                  qt(n, s, a), i(s);
              });
      });
}
function Kt(e, t) {
  return t.getItem(e) !== null;
}
function Ut(e, t) {
  return JSON.parse(t.getItem(e, t));
}
function qt(e, t, n) {
  n.setItem(e, JSON.stringify(t));
}
var Ma = Ia,
  cr = ["input", "select", "textarea", "a[href]", "button", "[tabindex]:not(slot)", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])', "details>summary:first-of-type", "details"],
  Ce = cr.join(","),
  ur = typeof Element > "u",
  Y = ur ? function () {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector,
  st =
      !ur && Element.prototype.getRootNode
          ? function (e) {
                return e.getRootNode();
            }
          : function (e) {
                return e.ownerDocument;
            },
  dr = function (t, n, r) {
      var i = Array.prototype.slice.apply(t.querySelectorAll(Ce));
      return n && Y.call(t, Ce) && i.unshift(t), (i = i.filter(r)), i;
  },
  fr = function e(t, n, r) {
      for (var i = [], a = Array.from(t); a.length; ) {
          var o = a.shift();
          if (o.tagName === "SLOT") {
              var s = o.assignedElements(),
                  l = s.length ? s : o.children,
                  c = e(l, !0, r);
              r.flatten ? i.push.apply(i, c) : i.push({ scope: o, candidates: c });
          } else {
              var u = Y.call(o, Ce);
              u && r.filter(o) && (n || !t.includes(o)) && i.push(o);
              var h = o.shadowRoot || (typeof r.getShadowRoot == "function" && r.getShadowRoot(o)),
                  g = !r.shadowRootFilter || r.shadowRootFilter(o);
              if (h && g) {
                  var b = e(h === !0 ? o.children : h.children, !0, r);
                  r.flatten ? i.push.apply(i, b) : i.push({ scope: o, candidates: b });
              } else a.unshift.apply(a, o.children);
          }
      }
      return i;
  },
  hr = function (t, n) {
      return t.tabIndex < 0 && (n || /^(AUDIO|VIDEO|DETAILS)$/.test(t.tagName) || t.isContentEditable) && isNaN(parseInt(t.getAttribute("tabindex"), 10)) ? 0 : t.tabIndex;
  },
  Na = function (t, n) {
      return t.tabIndex === n.tabIndex ? t.documentOrder - n.documentOrder : t.tabIndex - n.tabIndex;
  },
  pr = function (t) {
      return t.tagName === "INPUT";
  },
  Ra = function (t) {
      return pr(t) && t.type === "hidden";
  },
  Fa = function (t) {
      var n =
          t.tagName === "DETAILS" &&
          Array.prototype.slice.apply(t.children).some(function (r) {
              return r.tagName === "SUMMARY";
          });
      return n;
  },
  Pa = function (t, n) {
      for (var r = 0; r < t.length; r++) if (t[r].checked && t[r].form === n) return t[r];
  },
  La = function (t) {
      if (!t.name) return !0;
      var n = t.form || st(t),
          r = function (s) {
              return n.querySelectorAll('input[type="radio"][name="' + s + '"]');
          },
          i;
      if (typeof window < "u" && typeof window.CSS < "u" && typeof window.CSS.escape == "function") i = r(window.CSS.escape(t.name));
      else
          try {
              i = r(t.name);
          } catch (o) {
              return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", o.message), !1;
          }
      var a = Pa(i, t.form);
      return !a || a === t;
  },
  ja = function (t) {
      return pr(t) && t.type === "radio";
  },
  Da = function (t) {
      return ja(t) && !La(t);
  },
  Vt = function (t) {
      var n = t.getBoundingClientRect(),
          r = n.width,
          i = n.height;
      return r === 0 && i === 0;
  },
  Ha = function (t, n) {
      var r = n.displayCheck,
          i = n.getShadowRoot;
      if (getComputedStyle(t).visibility === "hidden") return !0;
      var a = Y.call(t, "details>summary:first-of-type"),
          o = a ? t.parentElement : t;
      if (Y.call(o, "details:not([open]) *")) return !0;
      var s = st(t).host,
          l = (s == null ? void 0 : s.ownerDocument.contains(s)) || t.ownerDocument.contains(t);
      if (!r || r === "full") {
          if (typeof i == "function") {
              for (var c = t; t; ) {
                  var u = t.parentElement,
                      h = st(t);
                  if (u && !u.shadowRoot && i(u) === !0) return Vt(t);
                  t.assignedSlot ? (t = t.assignedSlot) : !u && h !== t.ownerDocument ? (t = h.host) : (t = u);
              }
              t = c;
          }
          if (l) return !t.getClientRects().length;
      } else if (r === "non-zero-area") return Vt(t);
      return !1;
  },
  $a = function (t) {
      if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(t.tagName))
          for (var n = t.parentElement; n; ) {
              if (n.tagName === "FIELDSET" && n.disabled) {
                  for (var r = 0; r < n.children.length; r++) {
                      var i = n.children.item(r);
                      if (i.tagName === "LEGEND") return Y.call(n, "fieldset[disabled] *") ? !0 : !i.contains(t);
                  }
                  return !0;
              }
              n = n.parentElement;
          }
      return !1;
  },
  ke = function (t, n) {
      return !(n.disabled || Ra(n) || Ha(n, t) || Fa(n) || $a(n));
  },
  lt = function (t, n) {
      return !(Da(n) || hr(n) < 0 || !ke(t, n));
  },
  Ba = function (t) {
      var n = parseInt(t.getAttribute("tabindex"), 10);
      return !!(isNaN(n) || n >= 0);
  },
  za = function e(t) {
      var n = [],
          r = [];
      return (
          t.forEach(function (i, a) {
              var o = !!i.scope,
                  s = o ? i.scope : i,
                  l = hr(s, o),
                  c = o ? e(i.candidates) : s;
              l === 0 ? (o ? n.push.apply(n, c) : n.push(s)) : r.push({ documentOrder: a, tabIndex: l, item: i, isScope: o, content: c });
          }),
          r
              .sort(Na)
              .reduce(function (i, a) {
                  return a.isScope ? i.push.apply(i, a.content) : i.push(a.content), i;
              }, [])
              .concat(n)
      );
  },
  Wa = function (t, n) {
      n = n || {};
      var r;
      return n.getShadowRoot ? (r = fr([t], n.includeContainer, { filter: lt.bind(null, n), flatten: !1, getShadowRoot: n.getShadowRoot, shadowRootFilter: Ba })) : (r = dr(t, n.includeContainer, lt.bind(null, n))), za(r);
  },
  gr = function (t, n) {
      n = n || {};
      var r;
      return n.getShadowRoot ? (r = fr([t], n.includeContainer, { filter: ke.bind(null, n), flatten: !0, getShadowRoot: n.getShadowRoot })) : (r = dr(t, n.includeContainer, ke.bind(null, n))), r;
  },
  we = function (t, n) {
      if (((n = n || {}), !t)) throw new Error("No node provided");
      return Y.call(t, Ce) === !1 ? !1 : lt(n, t);
  },
  Ka = cr.concat("iframe").join(","),
  Se = function (t, n) {
      if (((n = n || {}), !t)) throw new Error("No node provided");
      return Y.call(t, Ka) === !1 ? !1 : ke(n, t);
  };
function Gt(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t &&
          (r = r.filter(function (i) {
              return Object.getOwnPropertyDescriptor(e, i).enumerable;
          })),
          n.push.apply(n, r);
  }
  return n;
}
function Jt(e) {
  for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t] != null ? arguments[t] : {};
      t % 2
          ? Gt(Object(n), !0).forEach(function (r) {
                Ua(e, r, n[r]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : Gt(Object(n)).forEach(function (r) {
                Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
            });
  }
  return e;
}
function Ua(e, t, n) {
  return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
}
var Yt = (function () {
      var e = [];
      return {
          activateTrap: function (n) {
              if (e.length > 0) {
                  var r = e[e.length - 1];
                  r !== n && r.pause();
              }
              var i = e.indexOf(n);
              i === -1 || e.splice(i, 1), e.push(n);
          },
          deactivateTrap: function (n) {
              var r = e.indexOf(n);
              r !== -1 && e.splice(r, 1), e.length > 0 && e[e.length - 1].unpause();
          },
      };
  })(),
  qa = function (t) {
      return t.tagName && t.tagName.toLowerCase() === "input" && typeof t.select == "function";
  },
  Va = function (t) {
      return t.key === "Escape" || t.key === "Esc" || t.keyCode === 27;
  },
  Ga = function (t) {
      return t.key === "Tab" || t.keyCode === 9;
  },
  Xt = function (t) {
      return setTimeout(t, 0);
  },
  Zt = function (t, n) {
      var r = -1;
      return (
          t.every(function (i, a) {
              return n(i) ? ((r = a), !1) : !0;
          }),
          r
      );
  },
  ae = function (t) {
      for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++) r[i - 1] = arguments[i];
      return typeof t == "function" ? t.apply(void 0, r) : t;
  },
  _e = function (t) {
      return t.target.shadowRoot && typeof t.composedPath == "function" ? t.composedPath()[0] : t.target;
  },
  Ja = function (t, n) {
      var r = (n == null ? void 0 : n.document) || document,
          i = Jt({ returnFocusOnDeactivate: !0, escapeDeactivates: !0, delayInitialFocus: !0 }, n),
          a = { containers: [], containerGroups: [], tabbableGroups: [], nodeFocusedBeforeActivation: null, mostRecentlyFocusedNode: null, active: !1, paused: !1, delayInitialFocusTimer: void 0 },
          o,
          s = function (d, f, m) {
              return d && d[f] !== void 0 ? d[f] : i[m || f];
          },
          l = function (d) {
              return a.containerGroups.findIndex(function (f) {
                  var m = f.container,
                      S = f.tabbableNodes;
                  return (
                      m.contains(d) ||
                      S.find(function (x) {
                          return x === d;
                      })
                  );
              });
          },
          c = function (d) {
              var f = i[d];
              if (typeof f == "function") {
                  for (var m = arguments.length, S = new Array(m > 1 ? m - 1 : 0), x = 1; x < m; x++) S[x - 1] = arguments[x];
                  f = f.apply(void 0, S);
              }
              if ((f === !0 && (f = void 0), !f)) {
                  if (f === void 0 || f === !1) return f;
                  throw new Error("`".concat(d, "` was specified but was not a node, or did not return a node"));
              }
              var I = f;
              if (typeof f == "string" && ((I = r.querySelector(f)), !I)) throw new Error("`".concat(d, "` as selector refers to no known node"));
              return I;
          },
          u = function () {
              var d = c("initialFocus");
              if (d === !1) return !1;
              if (d === void 0)
                  if (l(r.activeElement) >= 0) d = r.activeElement;
                  else {
                      var f = a.tabbableGroups[0],
                          m = f && f.firstTabbableNode;
                      d = m || c("fallbackFocus");
                  }
              if (!d) throw new Error("Your focus-trap needs to have at least one focusable element");
              return d;
          },
          h = function () {
              if (
                  ((a.containerGroups = a.containers.map(function (d) {
                      var f = Wa(d, i.tabbableOptions),
                          m = gr(d, i.tabbableOptions);
                      return {
                          container: d,
                          tabbableNodes: f,
                          focusableNodes: m,
                          firstTabbableNode: f.length > 0 ? f[0] : null,
                          lastTabbableNode: f.length > 0 ? f[f.length - 1] : null,
                          nextTabbableNode: function (x) {
                              var I = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0,
                                  L = m.findIndex(function (H) {
                                      return H === x;
                                  });
                              if (!(L < 0))
                                  return I
                                      ? m.slice(L + 1).find(function (H) {
                                            return we(H, i.tabbableOptions);
                                        })
                                      : m
                                            .slice(0, L)
                                            .reverse()
                                            .find(function (H) {
                                                return we(H, i.tabbableOptions);
                                            });
                          },
                      };
                  })),
                  (a.tabbableGroups = a.containerGroups.filter(function (d) {
                      return d.tabbableNodes.length > 0;
                  })),
                  a.tabbableGroups.length <= 0 && !c("fallbackFocus"))
              )
                  throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
          },
          g = function w(d) {
              if (d !== !1 && d !== r.activeElement) {
                  if (!d || !d.focus) {
                      w(u());
                      return;
                  }
                  d.focus({ preventScroll: !!i.preventScroll }), (a.mostRecentlyFocusedNode = d), qa(d) && d.select();
              }
          },
          b = function (d) {
              var f = c("setReturnFocus", d);
              return f || (f === !1 ? !1 : d);
          },
          E = function (d) {
              var f = _e(d);
              if (!(l(f) >= 0)) {
                  if (ae(i.clickOutsideDeactivates, d)) {
                      o.deactivate({ returnFocus: i.returnFocusOnDeactivate && !Se(f, i.tabbableOptions) });
                      return;
                  }
                  ae(i.allowOutsideClick, d) || d.preventDefault();
              }
          },
          k = function (d) {
              var f = _e(d),
                  m = l(f) >= 0;
              m || f instanceof Document ? m && (a.mostRecentlyFocusedNode = f) : (d.stopImmediatePropagation(), g(a.mostRecentlyFocusedNode || u()));
          },
          p = function (d) {
              var f = _e(d);
              h();
              var m = null;
              if (a.tabbableGroups.length > 0) {
                  var S = l(f),
                      x = S >= 0 ? a.containerGroups[S] : void 0;
                  if (S < 0) d.shiftKey ? (m = a.tabbableGroups[a.tabbableGroups.length - 1].lastTabbableNode) : (m = a.tabbableGroups[0].firstTabbableNode);
                  else if (d.shiftKey) {
                      var I = Zt(a.tabbableGroups, function (je) {
                          var De = je.firstTabbableNode;
                          return f === De;
                      });
                      if ((I < 0 && (x.container === f || (Se(f, i.tabbableOptions) && !we(f, i.tabbableOptions) && !x.nextTabbableNode(f, !1))) && (I = S), I >= 0)) {
                          var L = I === 0 ? a.tabbableGroups.length - 1 : I - 1,
                              H = a.tabbableGroups[L];
                          m = H.lastTabbableNode;
                      }
                  } else {
                      var ne = Zt(a.tabbableGroups, function (je) {
                          var De = je.lastTabbableNode;
                          return f === De;
                      });
                      if ((ne < 0 && (x.container === f || (Se(f, i.tabbableOptions) && !we(f, i.tabbableOptions) && !x.nextTabbableNode(f))) && (ne = S), ne >= 0)) {
                          var vr = ne === a.tabbableGroups.length - 1 ? 0 : ne + 1,
                              br = a.tabbableGroups[vr];
                          m = br.firstTabbableNode;
                      }
                  }
              } else m = c("fallbackFocus");
              m && (d.preventDefault(), g(m));
          },
          v = function (d) {
              if (Va(d) && ae(i.escapeDeactivates, d) !== !1) {
                  d.preventDefault(), o.deactivate();
                  return;
              }
              if (Ga(d)) {
                  p(d);
                  return;
              }
          },
          y = function (d) {
              var f = _e(d);
              l(f) >= 0 || ae(i.clickOutsideDeactivates, d) || ae(i.allowOutsideClick, d) || (d.preventDefault(), d.stopImmediatePropagation());
          },
          C = function () {
              if (a.active)
                  return (
                      Yt.activateTrap(o),
                      (a.delayInitialFocusTimer = i.delayInitialFocus
                          ? Xt(function () {
                                g(u());
                            })
                          : g(u())),
                      r.addEventListener("focusin", k, !0),
                      r.addEventListener("mousedown", E, { capture: !0, passive: !1 }),
                      r.addEventListener("touchstart", E, { capture: !0, passive: !1 }),
                      r.addEventListener("click", y, { capture: !0, passive: !1 }),
                      r.addEventListener("keydown", v, { capture: !0, passive: !1 }),
                      o
                  );
          },
          O = function () {
              if (a.active)
                  return r.removeEventListener("focusin", k, !0), r.removeEventListener("mousedown", E, !0), r.removeEventListener("touchstart", E, !0), r.removeEventListener("click", y, !0), r.removeEventListener("keydown", v, !0), o;
          };
      return (
          (o = {
              get active() {
                  return a.active;
              },
              get paused() {
                  return a.paused;
              },
              activate: function (d) {
                  if (a.active) return this;
                  var f = s(d, "onActivate"),
                      m = s(d, "onPostActivate"),
                      S = s(d, "checkCanFocusTrap");
                  S || h(), (a.active = !0), (a.paused = !1), (a.nodeFocusedBeforeActivation = r.activeElement), f && f();
                  var x = function () {
                      S && h(), C(), m && m();
                  };
                  return S ? (S(a.containers.concat()).then(x, x), this) : (x(), this);
              },
              deactivate: function (d) {
                  if (!a.active) return this;
                  var f = Jt({ onDeactivate: i.onDeactivate, onPostDeactivate: i.onPostDeactivate, checkCanReturnFocus: i.checkCanReturnFocus }, d);
                  clearTimeout(a.delayInitialFocusTimer), (a.delayInitialFocusTimer = void 0), O(), (a.active = !1), (a.paused = !1), Yt.deactivateTrap(o);
                  var m = s(f, "onDeactivate"),
                      S = s(f, "onPostDeactivate"),
                      x = s(f, "checkCanReturnFocus"),
                      I = s(f, "returnFocus", "returnFocusOnDeactivate");
                  m && m();
                  var L = function () {
                      Xt(function () {
                          I && g(b(a.nodeFocusedBeforeActivation)), S && S();
                      });
                  };
                  return I && x ? (x(b(a.nodeFocusedBeforeActivation)).then(L, L), this) : (L(), this);
              },
              pause: function () {
                  return a.paused || !a.active ? this : ((a.paused = !0), O(), this);
              },
              unpause: function () {
                  return !a.paused || !a.active ? this : ((a.paused = !1), h(), C(), this);
              },
              updateContainerElements: function (d) {
                  var f = [].concat(d).filter(Boolean);
                  return (
                      (a.containers = f.map(function (m) {
                          return typeof m == "string" ? r.querySelector(m) : m;
                      })),
                      a.active && h(),
                      this
                  );
              },
          }),
          o.updateContainerElements(t),
          o
      );
  };
function Ya(e) {
  let t, n;
  window.addEventListener("focusin", () => {
      (t = n), (n = document.activeElement);
  }),
      e.magic("focus", (r) => {
          let i = r;
          return {
              __noscroll: !1,
              __wrapAround: !1,
              within(a) {
                  return (i = a), this;
              },
              withoutScrolling() {
                  return (this.__noscroll = !0), this;
              },
              noscroll() {
                  return (this.__noscroll = !0), this;
              },
              withWrapAround() {
                  return (this.__wrapAround = !0), this;
              },
              wrap() {
                  return this.withWrapAround();
              },
              focusable(a) {
                  return Se(a);
              },
              previouslyFocused() {
                  return t;
              },
              lastFocused() {
                  return t;
              },
              focused() {
                  return n;
              },
              focusables() {
                  return Array.isArray(i) ? i : gr(i, { displayCheck: "none" });
              },
              all() {
                  return this.focusables();
              },
              isFirst(a) {
                  let o = this.all();
                  return o[0] && o[0].isSameNode(a);
              },
              isLast(a) {
                  let o = this.all();
                  return o.length && o.slice(-1)[0].isSameNode(a);
              },
              getFirst() {
                  return this.all()[0];
              },
              getLast() {
                  return this.all().slice(-1)[0];
              },
              getNext() {
                  let a = this.all(),
                      o = document.activeElement;
                  if (a.indexOf(o) !== -1) return this.__wrapAround && a.indexOf(o) === a.length - 1 ? a[0] : a[a.indexOf(o) + 1];
              },
              getPrevious() {
                  let a = this.all(),
                      o = document.activeElement;
                  if (a.indexOf(o) !== -1) return this.__wrapAround && a.indexOf(o) === 0 ? a.slice(-1)[0] : a[a.indexOf(o) - 1];
              },
              first() {
                  this.focus(this.getFirst());
              },
              last() {
                  this.focus(this.getLast());
              },
              next() {
                  this.focus(this.getNext());
              },
              previous() {
                  this.focus(this.getPrevious());
              },
              prev() {
                  return this.previous();
              },
              focus(a) {
                  a &&
                      setTimeout(() => {
                          a.hasAttribute("tabindex") || a.setAttribute("tabindex", "0"), a.focus({ preventScroll: this._noscroll });
                      });
              },
          };
      }),
      e.directive(
          "trap",
          e.skipDuringClone(
              (r, { expression: i, modifiers: a }, { effect: o, evaluateLater: s, cleanup: l }) => {
                  let c = s(i),
                      u = !1,
                      h = { escapeDeactivates: !1, allowOutsideClick: !0, fallbackFocus: () => r },
                      g = r.querySelector("[autofocus]");
                  g && (h.initialFocus = g);
                  let b = Ja(r, h),
                      E = () => {},
                      k = () => {};
                  const p = () => {
                      E(), (E = () => {}), k(), (k = () => {}), b.deactivate({ returnFocus: !a.includes("noreturn") });
                  };
                  o(() =>
                      c((v) => {
                          u !== v &&
                              (v &&
                                  !u &&
                                  setTimeout(() => {
                                      a.includes("inert") && (E = Qt(r)), a.includes("noscroll") && (k = Xa()), b.activate();
                                  }),
                              !v && u && p(),
                              (u = !!v));
                      })
                  ),
                      l(p);
              },
              (r, { expression: i, modifiers: a }, { evaluate: o }) => {
                  a.includes("inert") && o(i) && Qt(r);
              }
          )
      );
}
function Qt(e) {
  let t = [];
  return (
      mr(e, (n) => {
          let r = n.hasAttribute("aria-hidden");
          n.setAttribute("aria-hidden", "true"), t.push(() => r || n.removeAttribute("aria-hidden"));
      }),
      () => {
          for (; t.length; ) t.pop()();
      }
  );
}
function mr(e, t) {
  e.isSameNode(document.body) ||
      !e.parentNode ||
      Array.from(e.parentNode.children).forEach((n) => {
          n.isSameNode(e) ? mr(e.parentNode, t) : t(n);
      });
}
function Xa() {
  let e = document.documentElement.style.overflow,
      t = document.documentElement.style.paddingRight,
      n = window.innerWidth - document.documentElement.clientWidth;
  return (
      (document.documentElement.style.overflow = "hidden"),
      (document.documentElement.style.paddingRight = `${n}px`),
      () => {
          (document.documentElement.style.overflow = e), (document.documentElement.style.paddingRight = t);
      }
  );
}
var Za = Ya;
/*! Bundled license information:

tabbable/dist/index.esm.js:
(*!
* tabbable 5.3.3
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*)

focus-trap/dist/focus-trap.esm.js:
(*!
* focus-trap 6.9.4
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*)
*/ const Qa = [
      {
          title: "Activists",
          scrollHash: "activists",
          description: "Meet the digital activists using technology to amplify voices, effect change, and inspire audiences globally. These pioneers advocate for a better world, on and offline.",
          winners: [
              {
                  name: "Ahmad Hegab",
                  bio:
                      "<p>Ahmad Hegab is a passionate advocate for gender justice and digital safety. He actively works to combat technology-facilitated gender-based violence by tackling issues such as internet safety, toxic masculinity, male engagement towards gender justice, and digital harm related to human trafficking. Ahmad continues to speak up about the responsibilities of internet and digital technology corporations to prevent and respond to technology-facilitated violence against women and girls.</p><p>Ahmad is currently serving on the Board of Directors of Harassmap International. He is helping the new Harassmap MENA campaign to establish their work in the region, and he leads the technical support operations for Salam@, a regional program aimed at localizing the concept of digital safety in the MENA to prevent and eliminate technology-facilitated violence. Ahmad helps and mentor various initiatives and groups that work with men to confront violence.</p>",
                  image: "/media/img/2023/headshots/ahmad-hegab.jpg",
              },
              {
                  name: "Chris Smalls",
                  bio:
                      "<p>Chris Smalls is the founder and president of the Amazon Labor Union, an independent, democratic, worker-led labor union at Amazon in Staten Island. He is also the founder of The Congress of Essential Workers (TCOEW), a nationwide collective of essential workers and allies fighting for better working conditions, better wages, and a better world. Smalls was formerly an Amazon warehouse supervisor, helping open three major warehouses in New York, New Jersey, and Connecticut during his five years with the company, but he was fired in 2020 after organizing a protest against the company’s unsafe pandemic conditions. Smalls has been profiled by media outlets worldwide, including The New York Times, USA Today, The Guardian, The Wall Street Journal, CNBC, CBC Radio, Salon, and Jacobin.</p><p>He lives in Hackensack, New Jersey.</p>",
                  image: "/media/img/2023/headshots/chris-smalls.jpg",
              },
              {
                  name: "Larissa May",
                  bio:
                      "<p>Larissa May (Larz) is a digital wellbeing pioneer and the founder of #HalfTheStory (HTS), the first non-profit dedicated to empowering the next generation’s healthy relationship with social media. HTS' evidence-based program, Social Media U teaches key digital metacognition and emotional regulation skills, while empowering young people to understand and advocate for their digital wellbeing. Larz has become the face of the rapidly growing movement towards digital wellness, leading the global narrative around policy and youth-centric advocacy in the US, UK, EU, and UAE. Prior to #HalfTheStory, Larz helped build some of today’s most buzzy D2C brands, including Kin Euphorics and Otherland. Larz has been featured in TIME, Forbes, Refinery29, Good Morning America, Business Insider, and NBC.</p>",
                  image: "/media/img/2023/headshots/larissa-may.jpg",
              },
              {
                  name: "Daniel Motaung",
                  bio:
                      "<p>Daniel Motaung is a former Facebook content moderator turned whistleblower. He was a TIME100 NEXT 2022 awardee, recommended by Facebook whistleblower Frances Haugen, in recognition of organizing workers to fight against unjust practices within the content moderation environment and for putting “a face on the otherwise invisible human cost of moderating social media.” His work focuses on digital content evaluation and performance monitoring.</p>",
                  image: "/media/img/2023/headshots/daniel-motaung.jpg",
              },
              {
                  name: "Sneha Revanur",
                  bio:
                      "<p>Sneha Revanur is the 18-year-old founder and president of Encode Justice, an international 501(c)(4) organization mobilizing youth for human-centered artificial intelligence. It is now the world’s first and largest youth activist group in AI — Sneha is working to build a social, cultural, and political movement to reimagine what technology can do for humanity. Sneha’s work has been covered in CNN, the Washington Post, The Guardian, POLITICO, CNBC, Reuters, MIT Technology Review, Teen Vogue, The Hill, &amp; more. Sneha joined Vice President Harris at a private White House roundtable on AI with civil society leaders as the youngest invitee, and was most recently named the youngest of TIME's list of the 100 most influential voices in artificial intelligence.</p>",
                  image: "/media/img/2023/headshots/sneha-revanur.jpg",
              },
          ],
      },
      {
          title: "Builders",
          scrollHash: "builders",
          description: "Meet the engineers and technical people building the infrastructure of the internet. These builders shape the technical side of the web, making it more secure, accessible to everyone and a tool for knowledge.",
          winners: [
              {
                  name: "Keoni Mahelona",
                  bio:
                      "<p>Keoni Mahelona (kanaka maoli) is the driving force behind the development of digital technologies that aim to protect and promote indigenous languages and knowledge. He makes decisions every day to protect the sovereignty of platforms and data, from the digital and machine learning tools deployed for advanced applications to the storage and sharing of data in culturally appropriate and secure ways.</p>",
                  image: "/media/img/2023/headshots/keoni-mahelona.jpg",
              },
              {
                  name: "Raphael Mimoun",
                  bio:
                      "<p>Raphael is a technologist, activist, and digital safety trainer. He is the founder of Horizontal, a non-profit that builds tools for journalists and human rights defenders. Horizontal won the 2021 World Justice Challenge for Tella, an app used to document human rights violations in repressive environments, and recently released Shira, a phishing simulation platform. Raphael is passionate about building decentralized infrastructure—online and offline—that give more agency, autonomy, and power to people and communities. He organizes with Crosswalks Collective LA and strives for a prison-free world.</p>",
                  image: "/media/img/2023/headshots/raphael-mimoun.jpg",
              },
              {
                  name: "Trisha Prabhu",
                  bio:
                      "<p>Trisha Prabhu is the Founder and CEO of ReThink, a patented app that proactively stops cyberbullying. ReThink, which Trisha invented when she was just 13, has been named one of Google Play's Most Innovative Apps and shared with youth in 136 nations. For her efforts, Trisha/ReThink have been featured on the TED stage, at The White House, and on Forbes 30 Under 30. ReThink is also a winner of the Elevate Prize and Harvard's President's Innovation Challenge.</p><p>A summa cum laude graduate of Harvard College, Trisha is now pursuing her postgraduate studies at the University of Oxford as a US Rhodes Scholar.</p>",
                  image: "/media/img/2023/headshots/trisha-prabhu.jpg",
              },
              {
                  name: "Andy Yen",
                  bio:
                      "<p>Andy Yen is the Founder and CEO of Proton, one of the fastest growing consumer tech companies in Europe. Proton offers the world’s first privacy-by-default ecosystem, providing encrypted email, calendar, file storage, VPN, identity management and much more, built on the principle of your data, your rules. Andy launched Proton’s first product, ProtonMail, now the world’s largest encrypted email service, in 2014 while still working as a CERN scientist. Since then, Andy has become a leading voice in the global privacy movement. Today, Proton has more than 100m accounts and a team of more than 400 people worldwide.</p>",
                  image: "/media/img/2023/headshots/andy-yen.jpg",
              },
              {
                  name: "Rob Morris",
                  bio:
                      "<p>Rob Morris, PhD is the co-founder and CEO of Koko, a behavioral health platform that has helped over 2,000,000 people, mostly adolescents. Koko addresses the youth mental health crisis by meeting young people where they are — online — and providing free digital interventions. Rob’s personal mission is to embed mental health services throughout the entire Internet, creating a web of well-being. At Koko, he has worked directly with many major Internet platforms, including Pinterest, TikTok, Tumblr, OpenAI, and Twitch.</p><p>Rob earned his AB in psychology from Princeton University and his master's and PhD in media arts and sciences from the Massachusetts Institute of Technology. He is an award-winning designer and his work has been featured in Wired, NPR, Fast Company, and The New Yorker, among others.</p>",
                  image: "/media/img/2023/headshots/rob-morris.jpg",
              },
          ],
      },
      {
          title: "Artists",
          scrollHash: "artists",
          description: "Meet the creative forces creating innovative and thought-provoking digital artwork. These artists use the internet as their canvas to inspire others and rethink what's possible online.",
          winners: [
              {
                  name: "Dries Depoorter",
                  bio:
                      "<p>Belgian artist Dries Depoorter, based in Ghent, combines technology and art to create pieces that highlight modern concerns like privacy, artificial intelligence, surveillance, and social media. With a strong background in electronics, Dries has become a notable figure in the digital art world. His diverse portfolio includes innovative apps, interactive installations, websites and games.</p><p>A standout project of his, “Die With Me”, is a unique chat app that's only accessible when a user's phone battery is below 5%. Another project, “The Flemish Scrollers”, uses AI to automatically tag Belgian politicians when they use their phones during daily livestreams. His projects have gained international attention, solidifying Dries' position in the global art scene.</p><p>He has showcased his work at prestigious venues like the Barbican in London, Art Basel, Mutek Festival in Montreal, and Ars Electronica.</p>",
                  image: "/media/img/2023/headshots/dries-depoorter.jpg",
              },
              {
                  name: "Julia Janssen",
                  bio:
                      "<p>Julia Janssen makes the challenges of our digitalising society tangible in art. Through performative and interactive installations she makes her audience aware of the underlying infrastructures of data-driven technologies, such as informed consent, bias in AI, the right to be forgotten and so on. Her work takes you on a visual journey and explores how to deal with fairness, equality, freedom, autonomy and democracy in a data-driven society. Janssen is an artist and ambassador of the Dutch Data Protection Foundation in lawsuits against Twitter and Amazon. In her practice, she develops a (visual) language that creates consciousness and movement to make the Internet a better place.</p>",
                  image: "/media/img/2023/headshots/julia-janssen.jpg",
              },
              {
                  name: "Marlena Myles",
                  bio:
                      "<p>Marlena Myles is a self-taught Native American (Spirit Lake Dakota/Mohegan/Muscogee) artist located in St. Paul, Minnesota. Her art brings modernity to Indigenous history, languages and oral traditions while using the land as a teacher. Growing up on her traditional Dakota homelands, she enjoys using her artwork to teach Minnesotans the Indigenous history of this place we call home.</p><p>Her professional work includes children’s books, augmented reality, murals, fabrics and animations shown in Minneapolis Institute of Art and The Museum of Russian Art and other galleries. Her first permanent site-specific augmented reality public art installation known as the Dakota Spirit Walk is available on the Revelo AR app.</p><p>In 2021, she opened her own Dakota publishing company called Wíyouŋkihipi (We Are Capable) Productions to create a wider platform that educates and honors the culture, language and history of Dakota people.</p>",
                  image: "/media/img/2023/headshots/marlena-myles.jpg",
              },
              {
                  name: "Sylvia Grace Borda",
                  bio:
                      "<p>Sylvia Grace Borda is an artist, writer, educator, climate innovator and Women4Climate C40 Fellow.  Sylvia is recognised for her pioneering artworks of farmers staged in tableaux scenes embedded in Google Street View for which she won the Lumen Prize (2016). She has since gone on to co-create climate observation earthworks with Indigenous Oromo communities and collaborators in Ethiopia and elsewhere. Globally trackable in Google Earth, these earthworks are a ground-breaking initiative for arts and climate resilience. Sylvia is an arts advocate supporting sustainable built and natural environments and is recognised in Canada and abroad for her exploration of photography, eco-art works and community engagement. Sylvia lives and works on the unceded territories of the xwməθkwəy̓əm (Musqueam), Sḵwx̱wú7mesh (Squamish), and Sel̓íl̓witulh (Tsleil-Waututh) Nations in Vancouver, Canada.</p>",
                  image: "/media/img/2023/headshots/sylvia-grace-borda.jpg",
              },
              {
                  name: "Marek Tuszynski",
                  bio:
                      "<p>Marek Tuszynski, Executive Director and co-founder of Tactical Tech (2003), is a filmmaker, producer, curator, teacher and provocateur. For 30 years, he has worked at the intersection of technology and politics, information and activism, and the consequences of living in a quantified society. Before Tactical Tech, he co-founded organizations dedicated to creating a circular economy of electronics, documenting contemporary art in post-communist countries and rapid technology response in crisis.</p><p>He has co-founded Tactical Studios, co-curated the exhibitions Nervous Systems, The Glass Room, and Everything Will Be Fine, and co-authored the books “Visualising Information for Advocacy” and “Efficiency And Madness”. Marek lectures at universities worldwide and has advised on the right to encryption rights at the UN and served on the Technology Advisory Board for the International Criminal Court.</p>",
                  image: "/media/img/2023/headshots/marek-tuszynski.jpg",
              },
          ],
      },
      {
          title: "Creators",
          scrollHash: "creators",
          description: "Meet the content creators using storytelling to build community online. These filmmakers, educators, journalists and social media creators inspire their audiences and sparking important conversations.",
          winners: [
              {
                  name: "Kay Lopez",
                  bio:
                      "<p>Kay Lopez is a Social Media Consultant and Content Director focused on multicultural storytelling with experience in Houston, NYC and LA, and working on brands like General Mills, L'Oréal, NBCUniversal, Warner Media, and more.</p><p>Latinas Poderosas is a LATINA-empowered social platform that celebrates both past and present Latina accomplishments. Uplifting the modern-day mujer by motivating her to unapologetically embrace her heritage, traditions, and duality.</p>",
                  image: "/media/img/2023/headshots/kay-lopez.jpg",
              },
              {
                  name: "Rachel Hislop",
                  bio:
                      "<p>Rachel Hislop is a writer, editor, strategist and public speaker. As vice president of content at OkayMedia and editor-in-chief of Okayplayer.com and OkayAfrica.com, Rachel spearheaded a dynamic editorial strategy to engage a youthful demographic and propelled both brands to new heights. Rachel led Beyoncé’s digital presence as digital content manager for Parkwood Entertainment and for the star’s self-titled album, “Lemonade,” “The Formation World Tour,” and the “On The Run Tour.” She also managed digital strategies for Chloe x Halle, Ivy Park, and more. She is currently consulting with purpose-driven businesses and brands on the art of storytelling in the digital realm.</p>",
                  image: "/media/img/2023/headshots/rachel-hislop.jpg",
              },
              {
                  name: "Abbie Richards",
                  bio:
                      "<p>Abbie Richards is a TikToker and TikTok misinformation researcher. She specializes in understanding how misinformation, conspiracy theories, and extremism spread on TikTok and she creates educational content that explains these complex issues to a wider audience. She's amassed a multi-platform following of over half a million people who are interested in learning about these issues. Abbie is a senior video producer at Media Matters and is a co-founder of EcoTok, an environmental TikTok collective that specializes in social media-based climate communication. For her work as an online educator, Abbie was included in the Forbes 30 Under 30 2023 cohort and awarded the WIN WIN Youth Award for 2023.</p>",
                  image: "/media/img/2023/headshots/abbie-richards.jpg",
              },
              {
                  name: 'Vitus "V" Spehar',
                  bio:
                      "<p>V Spehar (they/them) is a Rochester-based citizen journalist and creator. Spehar launched Under the Desk News on TikTok in April 2020 with the aim to make news media less intimidating and easier to understand. Their one-minute segments (literally delivered from under a desk) have attracted a bipartisan audience of over 3 million people. Their reporting has taken them to the press room of the 2023 State of the Union to hosting the NBC's livestream of the Thanksgiving Day Parade to speaking at UNESCO summits. This year, V received a special achievement Webby for their concise and compassionate reporting.</p>",
                  image: "/media/img/2023/headshots/vitus-spehar.jpg",
              },
              {
                  name: "Nyamekye Wilson",
                  bio:
                      "<p>Nyamekye Wilson, also known as the “Moses of STEM,“ is a visionary driven by the transformational power of intersectionality and human-centered design. With a fervor for justice, Nyamekye's work echoes the spirit of impactful leaders in the civil rights and gender equity movement. Her passion for global STEM progress birthed a 6-figure ed tech company while working at Google. Nyamekye's most notable achievement is her extensive reach across 33 countries, impacting over 200 schools and empowering more than 9,000 Black women through her ed-tech nonprofit Black Sisters in STEM (Black SiS).</p><p>Her dedication to bridging the gender gap in STEM education and careers has garnered widespread recognition, including from Her Highness Sheikha Mozah Bint Marwan Al Maktoum of Dubai and the World Summit on the Information Society (WSIS).</p>",
                  image: "/media/img/2023/headshots/nyamekye-wilson.jpg",
              },
          ],
      },
      {
          title: "Advocates",
          scrollHash: "advocates",
          description: "Meet the people shaping the policies and regulations governing the internet. These policymakers, scientists and advocates fight for an open, free internet.",
          winners: [
              {
                  name: "Finn Lützow-Holm Myrstad",
                  bio:
                      "<p>Finn Lützow-Holm Myrstad is the director of digital policy at the Norwegian Consumer Council (NCC), focusing on national and international issues related to privacy, IT security, artificial intelligence, deceptive design, telecommunication and more. He leads the development of more ethical digital policies and advocates for governments and companies to improve theirs. Some of Finn’s projects involve privacy and security challenges posed by internet-connected devices, user terms in apps, tech companies’ use of deceptive design and online tracking.</p><p>He holds an MSc in Politics and Government of the European Union from the London School of Economics (LSE) and an Executive MBA from Hult International Business School.</p>",
                  image: "/media/img/2023/headshots/finn-myrstad.jpg",
              },
              {
                  name: "Fanny Hidvégi",
                  bio:
                      "<p>Fanny Hidvégi (@infofannny) is Access Now’s Europe Policy and Advocacy Director based in Brussels. She develops Access Now's European policy strategy and manages the EU office. Fanny was a member of the European Commission's High Level Expert Group on Artificial Intelligence, she served on the Council of Europe's Committee of Experts on Freedom of Expression and Digital Technologies, and on the board of the Hungarian Civil Liberties Union (HCLU).</p><p>She is a member of the European Parliament STOA Committee’s International Advisory Board. Fanny is an Obama Foundation Europe Leader and a Marshall Memorial Fellow. Fanny was selected to be a member of the POLITICO Tech 28 Class of 2022.</p>",
                  image: "/media/img/2023/headshots/fanny-hidvegi.jpg",
              },
              {
                  name: "Natalia Domagala",
                  bio:
                      "<p>Natalia Domagala is a global digital policy specialist. As the head of data and AI ethics policy at the U.K. Cabinet Office, she led the development of one of the first national standards for algorithmic transparency in the world. She also launched the first national-level public sector data ethicist role in the U.K. She has research experience in anthropology, gender, civic tech and economic development, recently co-editing the book “Situating Open Data: Global Trends in Local Contexts.” In 2022, Natalia received the Excellence in AI Award in the ethical AI category and was named one of the top 10 most prominent female AI experts by the Perspektywy Foundation.</p>",
                  image: "/media/img/2023/headshots/natalia-domagala.jpg",
              },
              {
                  name: "Charlotte Slaiman",
                  bio:
                      "<p>Charlotte is the Vice President at Public Knowledge. Prior to joining Public Knowledge, Charlotte worked in the Anticompetitive Practices Division of the Federal Trade Commission, investigating and litigating antitrust conduct violations, including the 2017 case against 1-800 Contacts for manipulating Google search ad auctions. She previously worked as a Legislative Aide to Senator Al Franken, focusing on Judiciary Committee issues including competition, media, and consumer privacy.</p>",
                  image: "/media/img/2023/headshots/charlotte-slaiman.jpg",
              },
              {
                  name: "J Nathan Matias",
                  bio:
                      "<p>Dr. J. Nathan Matias is a Guatemalan-American scientist and organizer who works for a world where digital power is guided by evidence and accountable to the public. For the last decade, he has championed community/citizen science on digital rights, pioneering rigorous scientific methods that have improved millions of people's lives on online harassment, mis/disinformation, algorithm accountability, and digital inclusion. Matias leads the Citizens and Technology Lab (CAT Lab) at Cornell University, where he is an Assistant Professor in the Department of Communication. Matias is also co-founder of the Coalition for Independent Technology Research, a nonprofit that works to advance and defend the right to ethically study the impact of technology on society.</p>",
                  image: "/media/img/2023/headshots/j-nathan-matias.jpg",
              },
          ],
      },
  ],
  eo = () => ({
      init() {
          window.addEventListener(
              "wheel",
              () => {
                  this.scroll();
              },
              { passive: !0 }
          );
      },
      scroll() {
          const e = this.$refs.hero,
              { scrollY: t, innerHeight: n } = window,
              { offsetHeight: r } = document.body,
              i = t + n >= r - 1;
          if (!(window.innerWidth < 768) && (i || (e.style.transform = `translate3d(0, ${window.scrollY * 0.45}px, 0)`), i)) {
              const a = document.getElementById("winners");
              if (!a) return;
              const { scrollLeft: o } = a;
              e.style.transform = `translate3d(-${o}px, ${window.scrollY * 0.45}px, 0)`;
              const s = 1 - o / 1e3;
              e.style.opacity = s.toString();
          }
      },
  }),
  to = () => ({
      atBottom: !1,
      init() {
          window.addEventListener(
              "wheel",
              (e) => {
                  this.scroll(e);
              },
              { passive: !1 }
          ),
              this.$watch("atBottom", (e) => {
                  var t;
                  e || ((this.$refs.slider.scrollLeft = 0), (t = document.getElementById("hero")) == null || t.style.removeProperty("opacity"));
              }),
              window.addEventListener(
                  "jump-to",
                  () => {
                      this.jumpTo("activists");
                  },
                  { passive: !0 }
              );
      },
      jumpTo(e) {
          const t = document.getElementById(e);
          if (!t) return;
          const n = this.$refs.slider,
              r = t.offsetLeft - 8;
          if (window.innerWidth >= 768) window.scrollTo({ top: document.body.scrollHeight - window.innerHeight, behavior: "smooth" });
          else if (!this.atBottom) {
              const s = n.offsetHeight,
                  c = n.getBoundingClientRect().top + s - 60;
              window.scrollTo({ top: c - window.innerHeight, behavior: "smooth" });
          }
          (this.atBottom = !0), n.scrollTo({ left: r, behavior: "smooth" });
          const i = this.$refs.sliderContainer,
              a = this.$refs.sliderParallax;
          (i.style.transition = "transform 1s ease"), (a.style.transition = "transform 0.5s ease"), (i.style.transform = "translate3d(0, 0 ,0)"), (a.style.transform = "translate3d(0, 0 ,0)");
          const o = document.getElementById("hero");
          if (o && window.innerWidth >= 768) {
              (o.style.transition = "opacity 0.5s ease-in-out, transform 0.5s ease-in-out"), (o.style.transform = `translate3d(-${r}px, ${window.scrollY * 0.45}px, 0)`);
              const s = 1 - r / 1e3;
              (o.style.opacity = s.toString()),
                  setTimeout(() => {
                      o.style.transition = "";
                  }, 500);
          }
          setTimeout(() => {
              (i.style.transition = ""), (a.style.transition = "");
              const s = new CustomEvent("footer-at-bottom");
              window.dispatchEvent(s);
          }, 1e3);
      },
      scroll(e) {
          const t = e.deltaY;
          if (e.deltaY === 0 || window.innerWidth < 768) return;
          const n = this.$refs.slider,
              { scrollY: r, innerHeight: i } = window,
              { offsetHeight: a } = document.body,
              { scrollLeft: o, offsetWidth: s, scrollWidth: l } = n,
              c = r + i >= a - 1,
              u = o <= 0,
              h = o + s >= l;
          if (c) {
              if (o === 0 && t < 0) return;
              e.preventDefault(), (this.atBottom = !0), t > 0 ? (h ? window.scrollBy(0, t) : (n.scrollLeft += t)) : u ? window.scrollBy(0, t) : (n.scrollLeft += t);
          } else this.atBottom = !1;
          const g = 40,
              b = this.$refs.sliderContainer;
          b.style.transform = `translate3d(${g}%, 0 ,0)`;
          const E = r / (a - i);
          let k = E * g;
          k > g - 0.02 && (k = g), (k = g - k);
          const p = { x: `${k}%`, y: "0" },
              v = this.$refs.sliderParallax;
          if (c) v.style.transform = "translate3d(0, 0, 0)";
          else {
              let y = E * 20;
              y > 19 && (y = 20), (y = 20 - y), (v.style.transform = `translate3d(0, -${y}%, 0)`);
          }
          b.style.transform = `translate3d(${p.x}, ${p.y}, 0)`;
      },
  }),
  no = () => ({
      open: !1,
      visible: !1,
      openBio(e) {
          window.innerWidth <= 768 || (this.open = e);
      },
  }),
  ro = () => ({
      visible: !0,
      init() {
          window.addEventListener(
              "wheel",
              () => {
                  this.scroll();
              },
              { passive: !0 }
          );
      },
      scroll() {
          const { scrollY: e, innerHeight: t } = window,
              { offsetHeight: n } = document.body,
              r = e + t >= n - 1;
          if (window.innerWidth < 768) return;
          const i = this.$refs.header;
          if (r) {
              const o = document.getElementById("winners");
              if (!o) return;
              const { scrollLeft: s } = o;
              if (s > 700) {
                  i.style.opacity = "1";
                  return;
              }
              i.style.opacity = "0";
              return;
          }
          const a = 1 - e / 125;
          i.style.opacity = a.toString();
      },
      jumpToWinners() {
          const e = new CustomEvent("jump-to");
          window.dispatchEvent(e);
      },
  }),
  io = () => ({
      atBottom: !1,
      init() {
          window.addEventListener(
              "wheel",
              () => {
                  this.scroll();
              },
              { passive: !0 }
          ),
              window.addEventListener(
                  "footer-at-bottom",
                  () => {
                      this.atBottom = !0;
                  },
                  { passive: !0 }
              );
      },
      scroll() {
          const { scrollY: e, innerHeight: t } = window,
              { offsetHeight: n } = document.body,
              r = e + t >= n - 1;
          window.innerWidth < 768 || (this.atBottom = r);
      },
  });
window.Alpine = F;
F.plugin(Oa);
F.plugin(Ma);
F.plugin(Za);
F.store("winners", { groups: Qa });
F.data("header", ro);
F.data("hero", eo);
F.data("slider", to);
F.data("slide", no);
F.data("footer", io);
F.start();
window.onbeforeunload = function () {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
};
