'use strict'
;(self.webpackChunkhot_takes = self.webpackChunkhot_takes || []).push([
  [179],
  {
    154: () => {
      function ge (n) {
        return 'function' == typeof n
      }
      function vs (n) {
        const t = n(r => {
          Error.call(r), (r.stack = new Error().stack)
        })
        return (
          (t.prototype = Object.create(Error.prototype)),
          (t.prototype.constructor = t),
          t
        )
      }
      const Wo = vs(
        n =>
          function (t) {
            n(this),
              (this.message = t
                ? `${t.length} errors occurred during unsubscription:\n${t
                    .map((r, i) => `${i + 1}) ${r.toString()}`)
                    .join('\n  ')}`
                : ''),
              (this.name = 'UnsubscriptionError'),
              (this.errors = t)
          }
      )
      function si (n, e) {
        if (n) {
          const t = n.indexOf(e)
          0 <= t && n.splice(t, 1)
        }
      }
      class dt {
        constructor (e) {
          ;(this.initialTeardown = e),
            (this.closed = !1),
            (this._parentage = null),
            (this._teardowns = null)
        }
        unsubscribe () {
          let e
          if (!this.closed) {
            this.closed = !0
            const { _parentage: t } = this
            if (t)
              if (((this._parentage = null), Array.isArray(t)))
                for (const s of t) s.remove(this)
              else t.remove(this)
            const { initialTeardown: r } = this
            if (ge(r))
              try {
                r()
              } catch (s) {
                e = s instanceof Wo ? s.errors : [s]
              }
            const { _teardowns: i } = this
            if (i) {
              this._teardowns = null
              for (const s of i)
                try {
                  pp(s)
                } catch (o) {
                  ;(e = null != e ? e : []),
                    o instanceof Wo ? (e = [...e, ...o.errors]) : e.push(o)
                }
            }
            if (e) throw new Wo(e)
          }
        }
        add (e) {
          var t
          if (e && e !== this)
            if (this.closed) pp(e)
            else {
              if (e instanceof dt) {
                if (e.closed || e._hasParent(this)) return
                e._addParent(this)
              }
              ;(this._teardowns =
                null !== (t = this._teardowns) && void 0 !== t ? t : []).push(e)
            }
        }
        _hasParent (e) {
          const { _parentage: t } = this
          return t === e || (Array.isArray(t) && t.includes(e))
        }
        _addParent (e) {
          const { _parentage: t } = this
          this._parentage = Array.isArray(t) ? (t.push(e), t) : t ? [t, e] : e
        }
        _removeParent (e) {
          const { _parentage: t } = this
          t === e ? (this._parentage = null) : Array.isArray(t) && si(t, e)
        }
        remove (e) {
          const { _teardowns: t } = this
          t && si(t, e), e instanceof dt && e._removeParent(this)
        }
      }
      dt.EMPTY = (() => {
        const n = new dt()
        return (n.closed = !0), n
      })()
      const fp = dt.EMPTY
      function hp (n) {
        return (
          n instanceof dt ||
          (n && 'closed' in n && ge(n.remove) && ge(n.add) && ge(n.unsubscribe))
        )
      }
      function pp (n) {
        ge(n) ? n() : n.unsubscribe()
      }
      const Tr = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1
        },
        Ko = {
          setTimeout (...n) {
            const { delegate: e } = Ko
            return ((null == e ? void 0 : e.setTimeout) || setTimeout)(...n)
          },
          clearTimeout (n) {
            const { delegate: e } = Ko
            return ((null == e ? void 0 : e.clearTimeout) || clearTimeout)(n)
          },
          delegate: void 0
        }
      function gp (n) {
        Ko.setTimeout(() => {
          const { onUnhandledError: e } = Tr
          if (!e) throw n
          e(n)
        })
      }
      function Eu () {}
      const Bw = wu('C', void 0, void 0)
      function wu (n, e, t) {
        return { kind: n, value: e, error: t }
      }
      let Ir = null
      function Qo (n) {
        if (Tr.useDeprecatedSynchronousErrorHandling) {
          const e = !Ir
          if ((e && (Ir = { errorThrown: !1, error: null }), n(), e)) {
            const { errorThrown: t, error: r } = Ir
            if (((Ir = null), t)) throw r
          }
        } else n()
      }
      class Su extends dt {
        constructor (e) {
          super(),
            (this.isStopped = !1),
            e
              ? ((this.destination = e), hp(e) && e.add(this))
              : (this.destination = qw)
        }
        static create (e, t, r) {
          return new Zo(e, t, r)
        }
        next (e) {
          this.isStopped
            ? Au(
                (function Uw (n) {
                  return wu('N', n, void 0)
                })(e),
                this
              )
            : this._next(e)
        }
        error (e) {
          this.isStopped
            ? Au(
                (function jw (n) {
                  return wu('E', void 0, n)
                })(e),
                this
              )
            : ((this.isStopped = !0), this._error(e))
        }
        complete () {
          this.isStopped
            ? Au(Bw, this)
            : ((this.isStopped = !0), this._complete())
        }
        unsubscribe () {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null))
        }
        _next (e) {
          this.destination.next(e)
        }
        _error (e) {
          try {
            this.destination.error(e)
          } finally {
            this.unsubscribe()
          }
        }
        _complete () {
          try {
            this.destination.complete()
          } finally {
            this.unsubscribe()
          }
        }
      }
      const $w = Function.prototype.bind
      function Mu (n, e) {
        return $w.call(n, e)
      }
      class zw {
        constructor (e) {
          this.partialObserver = e
        }
        next (e) {
          const { partialObserver: t } = this
          if (t.next)
            try {
              t.next(e)
            } catch (r) {
              Yo(r)
            }
        }
        error (e) {
          const { partialObserver: t } = this
          if (t.error)
            try {
              t.error(e)
            } catch (r) {
              Yo(r)
            }
          else Yo(e)
        }
        complete () {
          const { partialObserver: e } = this
          if (e.complete)
            try {
              e.complete()
            } catch (t) {
              Yo(t)
            }
        }
      }
      class Zo extends Su {
        constructor (e, t, r) {
          let i
          if ((super(), ge(e) || !e))
            i = {
              next: null != e ? e : void 0,
              error: null != t ? t : void 0,
              complete: null != r ? r : void 0
            }
          else {
            let s
            this && Tr.useDeprecatedNextContext
              ? ((s = Object.create(e)),
                (s.unsubscribe = () => this.unsubscribe()),
                (i = {
                  next: e.next && Mu(e.next, s),
                  error: e.error && Mu(e.error, s),
                  complete: e.complete && Mu(e.complete, s)
                }))
              : (i = e)
          }
          this.destination = new zw(i)
        }
      }
      function Yo (n) {
        Tr.useDeprecatedSynchronousErrorHandling
          ? (function Hw (n) {
              Tr.useDeprecatedSynchronousErrorHandling &&
                Ir &&
                ((Ir.errorThrown = !0), (Ir.error = n))
            })(n)
          : gp(n)
      }
      function Au (n, e) {
        const { onStoppedNotification: t } = Tr
        t && Ko.setTimeout(() => t(n, e))
      }
      const qw = {
          closed: !0,
          next: Eu,
          error: function Gw (n) {
            throw n
          },
          complete: Eu
        },
        Tu =
          ('function' == typeof Symbol && Symbol.observable) || '@@observable'
      function sr (n) {
        return n
      }
      let me = (() => {
        class n {
          constructor (t) {
            t && (this._subscribe = t)
          }
          lift (t) {
            const r = new n()
            return (r.source = this), (r.operator = t), r
          }
          subscribe (t, r, i) {
            const s = (function Kw (n) {
              return (
                (n && n instanceof Su) ||
                ((function Ww (n) {
                  return n && ge(n.next) && ge(n.error) && ge(n.complete)
                })(n) &&
                  hp(n))
              )
            })(t)
              ? t
              : new Zo(t, r, i)
            return (
              Qo(() => {
                const { operator: o, source: a } = this
                s.add(
                  o
                    ? o.call(s, a)
                    : a
                    ? this._subscribe(s)
                    : this._trySubscribe(s)
                )
              }),
              s
            )
          }
          _trySubscribe (t) {
            try {
              return this._subscribe(t)
            } catch (r) {
              t.error(r)
            }
          }
          forEach (t, r) {
            return new (r = yp(r))((i, s) => {
              const o = new Zo({
                next: a => {
                  try {
                    t(a)
                  } catch (l) {
                    s(l), o.unsubscribe()
                  }
                },
                error: s,
                complete: i
              })
              this.subscribe(o)
            })
          }
          _subscribe (t) {
            var r
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(t)
          }
          [Tu] () {
            return this
          }
          pipe (...t) {
            return (function mp (n) {
              return 0 === n.length
                ? sr
                : 1 === n.length
                ? n[0]
                : function (t) {
                    return n.reduce((r, i) => i(r), t)
                  }
            })(t)(this)
          }
          toPromise (t) {
            return new (t = yp(t))((r, i) => {
              let s
              this.subscribe(
                o => (s = o),
                o => i(o),
                () => r(s)
              )
            })
          }
        }
        return (n.create = e => new n(e)), n
      })()
      function yp (n) {
        var e
        return null !== (e = null != n ? n : Tr.Promise) && void 0 !== e
          ? e
          : Promise
      }
      const Qw = vs(
        n =>
          function () {
            n(this),
              (this.name = 'ObjectUnsubscribedError'),
              (this.message = 'object unsubscribed')
          }
      )
      let Ct = (() => {
        class n extends me {
          constructor () {
            super(),
              (this.closed = !1),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null)
          }
          lift (t) {
            const r = new _p(this, this)
            return (r.operator = t), r
          }
          _throwIfClosed () {
            if (this.closed) throw new Qw()
          }
          next (t) {
            Qo(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                const r = this.observers.slice()
                for (const i of r) i.next(t)
              }
            })
          }
          error (t) {
            Qo(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                ;(this.hasError = this.isStopped = !0), (this.thrownError = t)
                const { observers: r } = this
                for (; r.length; ) r.shift().error(t)
              }
            })
          }
          complete () {
            Qo(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0
                const { observers: t } = this
                for (; t.length; ) t.shift().complete()
              }
            })
          }
          unsubscribe () {
            ;(this.isStopped = this.closed = !0), (this.observers = null)
          }
          get observed () {
            var t
            return (
              (null === (t = this.observers) || void 0 === t
                ? void 0
                : t.length) > 0
            )
          }
          _trySubscribe (t) {
            return this._throwIfClosed(), super._trySubscribe(t)
          }
          _subscribe (t) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(t),
              this._innerSubscribe(t)
            )
          }
          _innerSubscribe (t) {
            const { hasError: r, isStopped: i, observers: s } = this
            return r || i ? fp : (s.push(t), new dt(() => si(s, t)))
          }
          _checkFinalizedStatuses (t) {
            const { hasError: r, thrownError: i, isStopped: s } = this
            r ? t.error(i) : s && t.complete()
          }
          asObservable () {
            const t = new me()
            return (t.source = this), t
          }
        }
        return (n.create = (e, t) => new _p(e, t)), n
      })()
      class _p extends Ct {
        constructor (e, t) {
          super(), (this.destination = e), (this.source = t)
        }
        next (e) {
          var t, r
          null ===
            (r =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.next) ||
            void 0 === r ||
            r.call(t, e)
        }
        error (e) {
          var t, r
          null ===
            (r =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.error) ||
            void 0 === r ||
            r.call(t, e)
        }
        complete () {
          var e, t
          null ===
            (t =
              null === (e = this.destination) || void 0 === e
                ? void 0
                : e.complete) ||
            void 0 === t ||
            t.call(e)
        }
        _subscribe (e) {
          var t, r
          return null !==
            (r =
              null === (t = this.source) || void 0 === t
                ? void 0
                : t.subscribe(e)) && void 0 !== r
            ? r
            : fp
        }
      }
      function vp (n) {
        return ge(null == n ? void 0 : n.lift)
      }
      function Le (n) {
        return e => {
          if (vp(e))
            return e.lift(function (t) {
              try {
                return n(t, this)
              } catch (r) {
                this.error(r)
              }
            })
          throw new TypeError('Unable to lift unknown Observable type')
        }
      }
      function xe (n, e, t, r, i) {
        return new Zw(n, e, t, r, i)
      }
      class Zw extends Su {
        constructor (e, t, r, i, s, o) {
          super(e),
            (this.onFinalize = s),
            (this.shouldUnsubscribe = o),
            (this._next = t
              ? function (a) {
                  try {
                    t(a)
                  } catch (l) {
                    e.error(l)
                  }
                }
              : super._next),
            (this._error = i
              ? function (a) {
                  try {
                    i(a)
                  } catch (l) {
                    e.error(l)
                  } finally {
                    this.unsubscribe()
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r()
                  } catch (a) {
                    e.error(a)
                  } finally {
                    this.unsubscribe()
                  }
                }
              : super._complete)
        }
        unsubscribe () {
          var e
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: t } = this
            super.unsubscribe(),
              !t &&
                (null === (e = this.onFinalize) || void 0 === e || e.call(this))
          }
        }
      }
      function ne (n, e) {
        return Le((t, r) => {
          let i = 0
          t.subscribe(
            xe(r, s => {
              r.next(n.call(e, s, i++))
            })
          )
        })
      }
      function xr (n) {
        return this instanceof xr ? ((this.v = n), this) : new xr(n)
      }
      function Jw (n, e, t) {
        if (!Symbol.asyncIterator)
          throw new TypeError('Symbol.asyncIterator is not defined.')
        var i,
          r = t.apply(n, e || []),
          s = []
        return (
          (i = {}),
          o('next'),
          o('throw'),
          o('return'),
          (i[Symbol.asyncIterator] = function () {
            return this
          }),
          i
        )
        function o (f) {
          r[f] &&
            (i[f] = function (h) {
              return new Promise(function (p, g) {
                s.push([f, h, p, g]) > 1 || a(f, h)
              })
            })
        }
        function a (f, h) {
          try {
            !(function l (f) {
              f.value instanceof xr
                ? Promise.resolve(f.value.v).then(u, c)
                : d(s[0][2], f)
            })(r[f](h))
          } catch (p) {
            d(s[0][3], p)
          }
        }
        function u (f) {
          a('next', f)
        }
        function c (f) {
          a('throw', f)
        }
        function d (f, h) {
          f(h), s.shift(), s.length && a(s[0][0], s[0][1])
        }
      }
      function e0 (n) {
        if (!Symbol.asyncIterator)
          throw new TypeError('Symbol.asyncIterator is not defined.')
        var t,
          e = n[Symbol.asyncIterator]
        return e
          ? e.call(n)
          : ((n = (function Dp (n) {
              var e = 'function' == typeof Symbol && Symbol.iterator,
                t = e && n[e],
                r = 0
              if (t) return t.call(n)
              if (n && 'number' == typeof n.length)
                return {
                  next: function () {
                    return (
                      n && r >= n.length && (n = void 0),
                      { value: n && n[r++], done: !n }
                    )
                  }
                }
              throw new TypeError(
                e
                  ? 'Object is not iterable.'
                  : 'Symbol.iterator is not defined.'
              )
            })(n)),
            (t = {}),
            r('next'),
            r('throw'),
            r('return'),
            (t[Symbol.asyncIterator] = function () {
              return this
            }),
            t)
        function r (s) {
          t[s] =
            n[s] &&
            function (o) {
              return new Promise(function (a, l) {
                !(function i (s, o, a, l) {
                  Promise.resolve(l).then(function (u) {
                    s({ value: u, done: a })
                  }, o)
                })(a, l, (o = n[s](o)).done, o.value)
              })
            }
        }
      }
      const Ep = n => n && 'number' == typeof n.length && 'function' != typeof n
      function wp (n) {
        return ge(null == n ? void 0 : n.then)
      }
      function Sp (n) {
        return ge(n[Tu])
      }
      function Mp (n) {
        return (
          Symbol.asyncIterator &&
          ge(null == n ? void 0 : n[Symbol.asyncIterator])
        )
      }
      function Ap (n) {
        return new TypeError(
          `You provided ${
            null !== n && 'object' == typeof n ? 'an invalid object' : `'${n}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        )
      }
      const Tp = (function n0 () {
        return 'function' == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : '@@iterator'
      })()
      function Ip (n) {
        return ge(null == n ? void 0 : n[Tp])
      }
      function xp (n) {
        return Jw(this, arguments, function* () {
          const t = n.getReader()
          try {
            for (;;) {
              const { value: r, done: i } = yield xr(t.read())
              if (i) return yield xr(void 0)
              yield yield xr(r)
            }
          } finally {
            t.releaseLock()
          }
        })
      }
      function kp (n) {
        return ge(null == n ? void 0 : n.getReader)
      }
      function Ht (n) {
        if (n instanceof me) return n
        if (null != n) {
          if (Sp(n))
            return (function r0 (n) {
              return new me(e => {
                const t = n[Tu]()
                if (ge(t.subscribe)) return t.subscribe(e)
                throw new TypeError(
                  'Provided object does not correctly implement Symbol.observable'
                )
              })
            })(n)
          if (Ep(n))
            return (function s0 (n) {
              return new me(e => {
                for (let t = 0; t < n.length && !e.closed; t++) e.next(n[t])
                e.complete()
              })
            })(n)
          if (wp(n))
            return (function o0 (n) {
              return new me(e => {
                n.then(
                  t => {
                    e.closed || (e.next(t), e.complete())
                  },
                  t => e.error(t)
                ).then(null, gp)
              })
            })(n)
          if (Mp(n)) return Rp(n)
          if (Ip(n))
            return (function a0 (n) {
              return new me(e => {
                for (const t of n) if ((e.next(t), e.closed)) return
                e.complete()
              })
            })(n)
          if (kp(n))
            return (function l0 (n) {
              return Rp(xp(n))
            })(n)
        }
        throw Ap(n)
      }
      function Rp (n) {
        return new me(e => {
          ;(function u0 (n, e) {
            var t, r, i, s
            return (function Yw (n, e, t, r) {
              return new (t || (t = Promise))(function (s, o) {
                function a (c) {
                  try {
                    u(r.next(c))
                  } catch (d) {
                    o(d)
                  }
                }
                function l (c) {
                  try {
                    u(r.throw(c))
                  } catch (d) {
                    o(d)
                  }
                }
                function u (c) {
                  c.done
                    ? s(c.value)
                    : (function i (s) {
                        return s instanceof t
                          ? s
                          : new t(function (o) {
                              o(s)
                            })
                      })(c.value).then(a, l)
                }
                u((r = r.apply(n, e || [])).next())
              })
            })(this, void 0, void 0, function* () {
              try {
                for (t = e0(n); !(r = yield t.next()).done; )
                  if ((e.next(r.value), e.closed)) return
              } catch (o) {
                i = { error: o }
              } finally {
                try {
                  r && !r.done && (s = t.return) && (yield s.call(t))
                } finally {
                  if (i) throw i.error
                }
              }
              e.complete()
            })
          })(n, e).catch(t => e.error(t))
        })
      }
      function Nn (n, e, t, r = 0, i = !1) {
        const s = e.schedule(function () {
          t(), i ? n.add(this.schedule(null, r)) : this.unsubscribe()
        }, r)
        if ((n.add(s), !i)) return s
      }
      function Qe (n, e, t = 1 / 0) {
        return ge(e)
          ? Qe((r, i) => ne((s, o) => e(r, s, i, o))(Ht(n(r, i))), t)
          : ('number' == typeof e && (t = e),
            Le((r, i) =>
              (function c0 (n, e, t, r, i, s, o, a) {
                const l = []
                let u = 0,
                  c = 0,
                  d = !1
                const f = () => {
                    d && !l.length && !u && e.complete()
                  },
                  h = g => (u < r ? p(g) : l.push(g)),
                  p = g => {
                    s && e.next(g), u++
                    let _ = !1
                    Ht(t(g, c++)).subscribe(
                      xe(
                        e,
                        v => {
                          null == i || i(v), s ? h(v) : e.next(v)
                        },
                        () => {
                          _ = !0
                        },
                        void 0,
                        () => {
                          if (_)
                            try {
                              for (u--; l.length && u < r; ) {
                                const v = l.shift()
                                o ? Nn(e, o, () => p(v)) : p(v)
                              }
                              f()
                            } catch (v) {
                              e.error(v)
                            }
                        }
                      )
                    )
                  }
                return (
                  n.subscribe(
                    xe(e, h, () => {
                      ;(d = !0), f()
                    })
                  ),
                  () => {
                    null == a || a()
                  }
                )
              })(r, i, n, t)
            ))
      }
      function bs (n = 1 / 0) {
        return Qe(sr, n)
      }
      const ft = new me(n => n.complete())
      function Op (n) {
        return n && ge(n.schedule)
      }
      function xu (n) {
        return n[n.length - 1]
      }
      function Fp (n) {
        return ge(xu(n)) ? n.pop() : void 0
      }
      function Cs (n) {
        return Op(xu(n)) ? n.pop() : void 0
      }
      function Np (n, e = 0) {
        return Le((t, r) => {
          t.subscribe(
            xe(
              r,
              i => Nn(r, n, () => r.next(i), e),
              () => Nn(r, n, () => r.complete(), e),
              i => Nn(r, n, () => r.error(i), e)
            )
          )
        })
      }
      function Pp (n, e = 0) {
        return Le((t, r) => {
          r.add(n.schedule(() => t.subscribe(r), e))
        })
      }
      function Lp (n, e) {
        if (!n) throw new Error('Iterable cannot be null')
        return new me(t => {
          Nn(t, e, () => {
            const r = n[Symbol.asyncIterator]()
            Nn(
              t,
              e,
              () => {
                r.next().then(i => {
                  i.done ? t.complete() : t.next(i.value)
                })
              },
              0,
              !0
            )
          })
        })
      }
      function Ze (n, e) {
        return e
          ? (function _0 (n, e) {
              if (null != n) {
                if (Sp(n))
                  return (function h0 (n, e) {
                    return Ht(n).pipe(Pp(e), Np(e))
                  })(n, e)
                if (Ep(n))
                  return (function g0 (n, e) {
                    return new me(t => {
                      let r = 0
                      return e.schedule(function () {
                        r === n.length
                          ? t.complete()
                          : (t.next(n[r++]), t.closed || this.schedule())
                      })
                    })
                  })(n, e)
                if (wp(n))
                  return (function p0 (n, e) {
                    return Ht(n).pipe(Pp(e), Np(e))
                  })(n, e)
                if (Mp(n)) return Lp(n, e)
                if (Ip(n))
                  return (function m0 (n, e) {
                    return new me(t => {
                      let r
                      return (
                        Nn(t, e, () => {
                          ;(r = n[Tp]()),
                            Nn(
                              t,
                              e,
                              () => {
                                let i, s
                                try {
                                  ;({ value: i, done: s } = r.next())
                                } catch (o) {
                                  return void t.error(o)
                                }
                                s ? t.complete() : t.next(i)
                              },
                              0,
                              !0
                            )
                        }),
                        () => ge(null == r ? void 0 : r.return) && r.return()
                      )
                    })
                  })(n, e)
                if (kp(n))
                  return (function y0 (n, e) {
                    return Lp(xp(n), e)
                  })(n, e)
              }
              throw Ap(n)
            })(n, e)
          : Ht(n)
      }
      function Pn (n) {
        return n <= 0
          ? () => ft
          : Le((e, t) => {
              let r = 0
              e.subscribe(
                xe(t, i => {
                  ++r <= n && (t.next(i), n <= r && t.complete())
                })
              )
            })
      }
      function Vp (n = {}) {
        const {
          connector: e = () => new Ct(),
          resetOnError: t = !0,
          resetOnComplete: r = !0,
          resetOnRefCountZero: i = !0
        } = n
        return s => {
          let o = null,
            a = null,
            l = null,
            u = 0,
            c = !1,
            d = !1
          const f = () => {
              null == a || a.unsubscribe(), (a = null)
            },
            h = () => {
              f(), (o = l = null), (c = d = !1)
            },
            p = () => {
              const g = o
              h(), null == g || g.unsubscribe()
            }
          return Le((g, _) => {
            u++, !d && !c && f()
            const v = (l = null != l ? l : e())
            _.add(() => {
              u--, 0 === u && !d && !c && (a = ku(p, i))
            }),
              v.subscribe(_),
              o ||
                ((o = new Zo({
                  next: m => v.next(m),
                  error: m => {
                    ;(d = !0), f(), (a = ku(h, t, m)), v.error(m)
                  },
                  complete: () => {
                    ;(c = !0), f(), (a = ku(h, r)), v.complete()
                  }
                })),
                Ze(g).subscribe(o))
          })(s)
        }
      }
      function ku (n, e, ...t) {
        return !0 === e
          ? (n(), null)
          : !1 === e
          ? null
          : e(...t)
              .pipe(Pn(1))
              .subscribe(() => n())
      }
      function de (n) {
        for (let e in n) if (n[e] === de) return e
        throw Error('Could not find renamed property on target object.')
      }
      function Ru (n, e) {
        for (const t in e)
          e.hasOwnProperty(t) && !n.hasOwnProperty(t) && (n[t] = e[t])
      }
      function ae (n) {
        if ('string' == typeof n) return n
        if (Array.isArray(n)) return '[' + n.map(ae).join(', ') + ']'
        if (null == n) return '' + n
        if (n.overriddenName) return `${n.overriddenName}`
        if (n.name) return `${n.name}`
        const e = n.toString()
        if (null == e) return '' + e
        const t = e.indexOf('\n')
        return -1 === t ? e : e.substring(0, t)
      }
      function Ou (n, e) {
        return null == n || '' === n
          ? null === e
            ? ''
            : e
          : null == e || '' === e
          ? n
          : n + ' ' + e
      }
      const b0 = de({ __forward_ref__: de })
      function ye (n) {
        return (
          (n.__forward_ref__ = ye),
          (n.toString = function () {
            return ae(this())
          }),
          n
        )
      }
      function q (n) {
        return Bp(n) ? n() : n
      }
      function Bp (n) {
        return (
          'function' == typeof n &&
          n.hasOwnProperty(b0) &&
          n.__forward_ref__ === ye
        )
      }
      class M extends Error {
        constructor (e, t) {
          super(
            (function Fu (n, e) {
              return `NG0${Math.abs(n)}${e ? ': ' + e : ''}`
            })(e, t)
          ),
            (this.code = e)
        }
      }
      function U (n) {
        return 'string' == typeof n ? n : null == n ? '' : String(n)
      }
      function ht (n) {
        return 'function' == typeof n
          ? n.name || n.toString()
          : 'object' == typeof n && null != n && 'function' == typeof n.type
          ? n.type.name || n.type.toString()
          : U(n)
      }
      function Xo (n, e) {
        const t = e ? ` in ${e}` : ''
        throw new M(-201, `No provider for ${ht(n)} found${t}`)
      }
      function Mt (n, e) {
        null == n &&
          (function be (n, e, t, r) {
            throw new Error(
              `ASSERTION ERROR: ${n}` +
                (null == r ? '' : ` [Expected=> ${t} ${r} ${e} <=Actual]`)
            )
          })(e, n, null, '!=')
      }
      function R (n) {
        return {
          token: n.token,
          providedIn: n.providedIn || null,
          factory: n.factory,
          value: void 0
        }
      }
      function ze (n) {
        return { providers: n.providers || [], imports: n.imports || [] }
      }
      function Nu (n) {
        return jp(n, Jo) || jp(n, Hp)
      }
      function jp (n, e) {
        return n.hasOwnProperty(e) ? n[e] : null
      }
      function Up (n) {
        return n && (n.hasOwnProperty(Pu) || n.hasOwnProperty(A0))
          ? n[Pu]
          : null
      }
      const Jo = de({ ɵprov: de }),
        Pu = de({ ɵinj: de }),
        Hp = de({ ngInjectableDef: de }),
        A0 = de({ ngInjectorDef: de })
      var $ = (() => (
        (($ = $ || {})[($.Default = 0)] = 'Default'),
        ($[($.Host = 1)] = 'Host'),
        ($[($.Self = 2)] = 'Self'),
        ($[($.SkipSelf = 4)] = 'SkipSelf'),
        ($[($.Optional = 8)] = 'Optional'),
        $
      ))()
      let Lu
      function or (n) {
        const e = Lu
        return (Lu = n), e
      }
      function $p (n, e, t) {
        const r = Nu(n)
        return r && 'root' == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : t & $.Optional
          ? null
          : void 0 !== e
          ? e
          : void Xo(ae(n), 'Injector')
      }
      function ar (n) {
        return { toString: n }.toString()
      }
      var tn = (() => (
          ((tn = tn || {})[(tn.OnPush = 0)] = 'OnPush'),
          (tn[(tn.Default = 1)] = 'Default'),
          tn
        ))(),
        nn = (() => {
          return (
            ((n = nn || (nn = {}))[(n.Emulated = 0)] = 'Emulated'),
            (n[(n.None = 2)] = 'None'),
            (n[(n.ShadowDom = 3)] = 'ShadowDom'),
            nn
          )
          var n
        })()
      const I0 = 'undefined' != typeof globalThis && globalThis,
        x0 = 'undefined' != typeof window && window,
        k0 =
          'undefined' != typeof self &&
          'undefined' != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        ce = I0 || ('undefined' != typeof global && global) || x0 || k0,
        oi = {},
        fe = [],
        ea = de({ ɵcmp: de }),
        Vu = de({ ɵdir: de }),
        Bu = de({ ɵpipe: de }),
        zp = de({ ɵmod: de }),
        Vn = de({ ɵfac: de }),
        Ds = de({ __NG_ELEMENT_ID__: de })
      let R0 = 0
      function At (n) {
        return ar(() => {
          const t = {},
            r = {
              type: n.type,
              providersResolver: null,
              decls: n.decls,
              vars: n.vars,
              factory: null,
              template: n.template || null,
              consts: n.consts || null,
              ngContentSelectors: n.ngContentSelectors,
              hostBindings: n.hostBindings || null,
              hostVars: n.hostVars || 0,
              hostAttrs: n.hostAttrs || null,
              contentQueries: n.contentQueries || null,
              declaredInputs: t,
              inputs: null,
              outputs: null,
              exportAs: n.exportAs || null,
              onPush: n.changeDetection === tn.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              selectors: n.selectors || fe,
              viewQuery: n.viewQuery || null,
              features: n.features || null,
              data: n.data || {},
              encapsulation: n.encapsulation || nn.Emulated,
              id: 'c',
              styles: n.styles || fe,
              _: null,
              setInput: null,
              schemas: n.schemas || null,
              tView: null
            },
            i = n.directives,
            s = n.features,
            o = n.pipes
          return (
            (r.id += R0++),
            (r.inputs = Kp(n.inputs, t)),
            (r.outputs = Kp(n.outputs)),
            s && s.forEach(a => a(r)),
            (r.directiveDefs = i
              ? () => ('function' == typeof i ? i() : i).map(Gp)
              : null),
            (r.pipeDefs = o
              ? () => ('function' == typeof o ? o() : o).map(qp)
              : null),
            r
          )
        })
      }
      function Gp (n) {
        return (
          st(n) ||
          (function lr (n) {
            return n[Vu] || null
          })(n)
        )
      }
      function qp (n) {
        return (function kr (n) {
          return n[Bu] || null
        })(n)
      }
      const Wp = {}
      function Ye (n) {
        return ar(() => {
          const e = {
            type: n.type,
            bootstrap: n.bootstrap || fe,
            declarations: n.declarations || fe,
            imports: n.imports || fe,
            exports: n.exports || fe,
            transitiveCompileScopes: null,
            schemas: n.schemas || null,
            id: n.id || null
          }
          return null != n.id && (Wp[n.id] = n.type), e
        })
      }
      function Kp (n, e) {
        if (null == n) return oi
        const t = {}
        for (const r in n)
          if (n.hasOwnProperty(r)) {
            let i = n[r],
              s = i
            Array.isArray(i) && ((s = i[1]), (i = i[0])),
              (t[i] = r),
              e && (e[i] = s)
          }
        return t
      }
      const N = At
      function Dt (n) {
        return {
          type: n.type,
          name: n.name,
          factory: null,
          pure: !1 !== n.pure,
          onDestroy: n.type.prototype.ngOnDestroy || null
        }
      }
      function st (n) {
        return n[ea] || null
      }
      function $t (n, e) {
        const t = n[zp] || null
        if (!t && !0 === e)
          throw new Error(`Type ${ae(n)} does not have '\u0275mod' property.`)
        return t
      }
      const W = 11
      function yn (n) {
        return Array.isArray(n) && 'object' == typeof n[1]
      }
      function sn (n) {
        return Array.isArray(n) && !0 === n[1]
      }
      function Hu (n) {
        return 0 != (8 & n.flags)
      }
      function ia (n) {
        return 2 == (2 & n.flags)
      }
      function sa (n) {
        return 1 == (1 & n.flags)
      }
      function on (n) {
        return null !== n.template
      }
      function V0 (n) {
        return 0 != (512 & n[2])
      }
      function Nr (n, e) {
        return n.hasOwnProperty(Vn) ? n[Vn] : null
      }
      class U0 {
        constructor (e, t, r) {
          ;(this.previousValue = e),
            (this.currentValue = t),
            (this.firstChange = r)
        }
        isFirstChange () {
          return this.firstChange
        }
      }
      function Gt () {
        return Zp
      }
      function Zp (n) {
        return n.type.prototype.ngOnChanges && (n.setInput = $0), H0
      }
      function H0 () {
        const n = Xp(this),
          e = null == n ? void 0 : n.current
        if (e) {
          const t = n.previous
          if (t === oi) n.previous = e
          else for (let r in e) t[r] = e[r]
          ;(n.current = null), this.ngOnChanges(e)
        }
      }
      function $0 (n, e, t, r) {
        const i =
            Xp(n) ||
            (function z0 (n, e) {
              return (n[Yp] = e)
            })(n, { previous: oi, current: null }),
          s = i.current || (i.current = {}),
          o = i.previous,
          a = this.declaredInputs[t],
          l = o[a]
        ;(s[a] = new U0(l && l.currentValue, e, o === oi)), (n[r] = e)
      }
      Gt.ngInherit = !0
      const Yp = '__ngSimpleChanges__'
      function Xp (n) {
        return n[Yp] || null
      }
      let Wu
      function ke (n) {
        return !!n.listen
      }
      const Jp = {
        createRenderer: (n, e) =>
          (function Ku () {
            return void 0 !== Wu
              ? Wu
              : 'undefined' != typeof document
              ? document
              : void 0
          })()
      }
      function Ve (n) {
        for (; Array.isArray(n); ) n = n[0]
        return n
      }
      function oa (n, e) {
        return Ve(e[n])
      }
      function Wt (n, e) {
        return Ve(e[n.index])
      }
      function Qu (n, e) {
        return n.data[e]
      }
      function di (n, e) {
        return n[e]
      }
      function It (n, e) {
        const t = e[n]
        return yn(t) ? t : t[0]
      }
      function eg (n) {
        return 4 == (4 & n[2])
      }
      function Zu (n) {
        return 128 == (128 & n[2])
      }
      function ur (n, e) {
        return null == e ? null : n[e]
      }
      function tg (n) {
        n[18] = 0
      }
      function Yu (n, e) {
        n[5] += e
        let t = n,
          r = n[3]
        for (
          ;
          null !== r && ((1 === e && 1 === t[5]) || (-1 === e && 0 === t[5]));

        )
          (r[5] += e), (t = r), (r = r[3])
      }
      const B = {
        lFrame: ug(null),
        bindingsEnabled: !0,
        isInCheckNoChangesMode: !1
      }
      function ng () {
        return B.bindingsEnabled
      }
      function b () {
        return B.lFrame.lView
      }
      function re () {
        return B.lFrame.tView
      }
      function xt (n) {
        return (B.lFrame.contextLView = n), n[8]
      }
      function Ge () {
        let n = rg()
        for (; null !== n && 64 === n.type; ) n = n.parent
        return n
      }
      function rg () {
        return B.lFrame.currentTNode
      }
      function _n (n, e) {
        const t = B.lFrame
        ;(t.currentTNode = n), (t.isParent = e)
      }
      function Xu () {
        return B.lFrame.isParent
      }
      function Ju () {
        B.lFrame.isParent = !1
      }
      function aa () {
        return B.isInCheckNoChangesMode
      }
      function la (n) {
        B.isInCheckNoChangesMode = n
      }
      function pt () {
        const n = B.lFrame
        let e = n.bindingRootIndex
        return (
          -1 === e && (e = n.bindingRootIndex = n.tView.bindingStartIndex), e
        )
      }
      function fi () {
        return B.lFrame.bindingIndex++
      }
      function aS (n, e) {
        const t = B.lFrame
        ;(t.bindingIndex = t.bindingRootIndex = n), ec(e)
      }
      function ec (n) {
        B.lFrame.currentDirectiveIndex = n
      }
      function og () {
        return B.lFrame.currentQueryIndex
      }
      function nc (n) {
        B.lFrame.currentQueryIndex = n
      }
      function uS (n) {
        const e = n[1]
        return 2 === e.type ? e.declTNode : 1 === e.type ? n[6] : null
      }
      function ag (n, e, t) {
        if (t & $.SkipSelf) {
          let i = e,
            s = n
          for (
            ;
            !((i = i.parent),
            null !== i ||
              t & $.Host ||
              ((i = uS(s)), null === i || ((s = s[15]), 10 & i.type)));

          );
          if (null === i) return !1
          ;(e = i), (n = s)
        }
        const r = (B.lFrame = lg())
        return (r.currentTNode = e), (r.lView = n), !0
      }
      function ua (n) {
        const e = lg(),
          t = n[1]
        ;(B.lFrame = e),
          (e.currentTNode = t.firstChild),
          (e.lView = n),
          (e.tView = t),
          (e.contextLView = n),
          (e.bindingIndex = t.bindingStartIndex),
          (e.inI18n = !1)
      }
      function lg () {
        const n = B.lFrame,
          e = null === n ? null : n.child
        return null === e ? ug(n) : e
      }
      function ug (n) {
        const e = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: n,
          child: null,
          inI18n: !1
        }
        return null !== n && (n.child = e), e
      }
      function cg () {
        const n = B.lFrame
        return (
          (B.lFrame = n.parent), (n.currentTNode = null), (n.lView = null), n
        )
      }
      const dg = cg
      function ca () {
        const n = cg()
        ;(n.isParent = !0),
          (n.tView = null),
          (n.selectedIndex = -1),
          (n.contextLView = null),
          (n.elementDepthCount = 0),
          (n.currentDirectiveIndex = -1),
          (n.currentNamespace = null),
          (n.bindingRootIndex = -1),
          (n.bindingIndex = -1),
          (n.currentQueryIndex = 0)
      }
      function gt () {
        return B.lFrame.selectedIndex
      }
      function cr (n) {
        B.lFrame.selectedIndex = n
      }
      function Re () {
        const n = B.lFrame
        return Qu(n.tView, n.selectedIndex)
      }
      function Pr () {
        B.lFrame.currentNamespace = 'svg'
      }
      function da (n, e) {
        for (let t = e.directiveStart, r = e.directiveEnd; t < r; t++) {
          const s = n.data[t].type.prototype,
            {
              ngAfterContentInit: o,
              ngAfterContentChecked: a,
              ngAfterViewInit: l,
              ngAfterViewChecked: u,
              ngOnDestroy: c
            } = s
          o && (n.contentHooks || (n.contentHooks = [])).push(-t, o),
            a &&
              ((n.contentHooks || (n.contentHooks = [])).push(t, a),
              (n.contentCheckHooks || (n.contentCheckHooks = [])).push(t, a)),
            l && (n.viewHooks || (n.viewHooks = [])).push(-t, l),
            u &&
              ((n.viewHooks || (n.viewHooks = [])).push(t, u),
              (n.viewCheckHooks || (n.viewCheckHooks = [])).push(t, u)),
            null != c && (n.destroyHooks || (n.destroyHooks = [])).push(t, c)
        }
      }
      function fa (n, e, t) {
        fg(n, e, 3, t)
      }
      function ha (n, e, t, r) {
        ;(3 & n[2]) === t && fg(n, e, t, r)
      }
      function rc (n, e) {
        let t = n[2]
        ;(3 & t) === e && ((t &= 2047), (t += 1), (n[2] = t))
      }
      function fg (n, e, t, r) {
        const s = null != r ? r : -1,
          o = e.length - 1
        let a = 0
        for (let l = void 0 !== r ? 65535 & n[18] : 0; l < o; l++)
          if ('number' == typeof e[l + 1]) {
            if (((a = e[l]), null != r && a >= r)) break
          } else
            e[l] < 0 && (n[18] += 65536),
              (a < s || -1 == s) &&
                (yS(n, t, e, l), (n[18] = (4294901760 & n[18]) + l + 2)),
              l++
      }
      function yS (n, e, t, r) {
        const i = t[r] < 0,
          s = t[r + 1],
          a = n[i ? -t[r] : t[r]]
        if (i) {
          if (n[2] >> 11 < n[18] >> 16 && (3 & n[2]) === e) {
            n[2] += 2048
            try {
              s.call(a)
            } finally {
            }
          }
        } else
          try {
            s.call(a)
          } finally {
          }
      }
      class As {
        constructor (e, t, r) {
          ;(this.factory = e),
            (this.resolving = !1),
            (this.canSeeViewProviders = t),
            (this.injectImpl = r)
        }
      }
      function pa (n, e, t) {
        const r = ke(n)
        let i = 0
        for (; i < t.length; ) {
          const s = t[i]
          if ('number' == typeof s) {
            if (0 !== s) break
            i++
            const o = t[i++],
              a = t[i++],
              l = t[i++]
            r ? n.setAttribute(e, a, l, o) : e.setAttributeNS(o, a, l)
          } else {
            const o = s,
              a = t[++i]
            sc(o)
              ? r && n.setProperty(e, o, a)
              : r
              ? n.setAttribute(e, o, a)
              : e.setAttribute(o, a),
              i++
          }
        }
        return i
      }
      function hg (n) {
        return 3 === n || 4 === n || 6 === n
      }
      function sc (n) {
        return 64 === n.charCodeAt(0)
      }
      function ga (n, e) {
        if (null !== e && 0 !== e.length)
          if (null === n || 0 === n.length) n = e.slice()
          else {
            let t = -1
            for (let r = 0; r < e.length; r++) {
              const i = e[r]
              'number' == typeof i
                ? (t = i)
                : 0 === t ||
                  pg(n, t, i, null, -1 === t || 2 === t ? e[++r] : null)
            }
          }
        return n
      }
      function pg (n, e, t, r, i) {
        let s = 0,
          o = n.length
        if (-1 === e) o = -1
        else
          for (; s < n.length; ) {
            const a = n[s++]
            if ('number' == typeof a) {
              if (a === e) {
                o = -1
                break
              }
              if (a > e) {
                o = s - 1
                break
              }
            }
          }
        for (; s < n.length; ) {
          const a = n[s]
          if ('number' == typeof a) break
          if (a === t) {
            if (null === r) return void (null !== i && (n[s + 1] = i))
            if (r === n[s + 1]) return void (n[s + 2] = i)
          }
          s++, null !== r && s++, null !== i && s++
        }
        ;-1 !== o && (n.splice(o, 0, e), (s = o + 1)),
          n.splice(s++, 0, t),
          null !== r && n.splice(s++, 0, r),
          null !== i && n.splice(s++, 0, i)
      }
      function gg (n) {
        return -1 !== n
      }
      function hi (n) {
        return 32767 & n
      }
      function pi (n, e) {
        let t = (function DS (n) {
            return n >> 16
          })(n),
          r = e
        for (; t > 0; ) (r = r[15]), t--
        return r
      }
      let oc = !0
      function ma (n) {
        const e = oc
        return (oc = n), e
      }
      let ES = 0
      function Is (n, e) {
        const t = lc(n, e)
        if (-1 !== t) return t
        const r = e[1]
        r.firstCreatePass &&
          ((n.injectorIndex = e.length),
          ac(r.data, n),
          ac(e, null),
          ac(r.blueprint, null))
        const i = ya(n, e),
          s = n.injectorIndex
        if (gg(i)) {
          const o = hi(i),
            a = pi(i, e),
            l = a[1].data
          for (let u = 0; u < 8; u++) e[s + u] = a[o + u] | l[o + u]
        }
        return (e[s + 8] = i), s
      }
      function ac (n, e) {
        n.push(0, 0, 0, 0, 0, 0, 0, 0, e)
      }
      function lc (n, e) {
        return -1 === n.injectorIndex ||
          (n.parent && n.parent.injectorIndex === n.injectorIndex) ||
          null === e[n.injectorIndex + 8]
          ? -1
          : n.injectorIndex
      }
      function ya (n, e) {
        if (n.parent && -1 !== n.parent.injectorIndex)
          return n.parent.injectorIndex
        let t = 0,
          r = null,
          i = e
        for (; null !== i; ) {
          const s = i[1],
            o = s.type
          if (((r = 2 === o ? s.declTNode : 1 === o ? i[6] : null), null === r))
            return -1
          if ((t++, (i = i[15]), -1 !== r.injectorIndex))
            return r.injectorIndex | (t << 16)
        }
        return -1
      }
      function _a (n, e, t) {
        !(function wS (n, e, t) {
          let r
          'string' == typeof t
            ? (r = t.charCodeAt(0) || 0)
            : t.hasOwnProperty(Ds) && (r = t[Ds]),
            null == r && (r = t[Ds] = ES++)
          const i = 255 & r
          e.data[n + (i >> 5)] |= 1 << i
        })(n, e, t)
      }
      function _g (n, e, t) {
        if (t & $.Optional) return n
        Xo(e, 'NodeInjector')
      }
      function vg (n, e, t, r) {
        if (
          (t & $.Optional && void 0 === r && (r = null),
          0 == (t & ($.Self | $.Host)))
        ) {
          const i = n[9],
            s = or(void 0)
          try {
            return i ? i.get(e, r, t & $.Optional) : $p(e, r, t & $.Optional)
          } finally {
            or(s)
          }
        }
        return _g(r, e, t)
      }
      function bg (n, e, t, r = $.Default, i) {
        if (null !== n) {
          const s = (function TS (n) {
            if ('string' == typeof n) return n.charCodeAt(0) || 0
            const e = n.hasOwnProperty(Ds) ? n[Ds] : void 0
            return 'number' == typeof e ? (e >= 0 ? 255 & e : MS) : e
          })(t)
          if ('function' == typeof s) {
            if (!ag(e, n, r)) return r & $.Host ? _g(i, t, r) : vg(e, t, r, i)
            try {
              const o = s(r)
              if (null != o || r & $.Optional) return o
              Xo(t)
            } finally {
              dg()
            }
          } else if ('number' == typeof s) {
            let o = null,
              a = lc(n, e),
              l = -1,
              u = r & $.Host ? e[16][6] : null
            for (
              (-1 === a || r & $.SkipSelf) &&
              ((l = -1 === a ? ya(n, e) : e[a + 8]),
              -1 !== l && Eg(r, !1)
                ? ((o = e[1]), (a = hi(l)), (e = pi(l, e)))
                : (a = -1));
              -1 !== a;

            ) {
              const c = e[1]
              if (Dg(s, a, c.data)) {
                const d = AS(a, e, t, o, r, u)
                if (d !== Cg) return d
              }
              ;(l = e[a + 8]),
                -1 !== l && Eg(r, e[1].data[a + 8] === u) && Dg(s, a, e)
                  ? ((o = c), (a = hi(l)), (e = pi(l, e)))
                  : (a = -1)
            }
          }
        }
        return vg(e, t, r, i)
      }
      const Cg = {}
      function MS () {
        return new gi(Ge(), b())
      }
      function AS (n, e, t, r, i, s) {
        const o = e[1],
          a = o.data[n + 8],
          c = va(
            a,
            o,
            t,
            null == r ? ia(a) && oc : r != o && 0 != (3 & a.type),
            i & $.Host && s === a
          )
        return null !== c ? xs(e, o, c, a) : Cg
      }
      function va (n, e, t, r, i) {
        const s = n.providerIndexes,
          o = e.data,
          a = 1048575 & s,
          l = n.directiveStart,
          c = s >> 20,
          f = i ? a + c : n.directiveEnd
        for (let h = r ? a : a + c; h < f; h++) {
          const p = o[h]
          if ((h < l && t === p) || (h >= l && p.type === t)) return h
        }
        if (i) {
          const h = o[l]
          if (h && on(h) && h.type === t) return l
        }
        return null
      }
      function xs (n, e, t, r) {
        let i = n[t]
        const s = e.data
        if (
          (function _S (n) {
            return n instanceof As
          })(i)
        ) {
          const o = i
          o.resolving &&
            (function C0 (n, e) {
              const t = e ? `. Dependency path: ${e.join(' > ')} > ${n}` : ''
              throw new M(
                -200,
                `Circular dependency in DI detected for ${n}${t}`
              )
            })(ht(s[t]))
          const a = ma(o.canSeeViewProviders)
          o.resolving = !0
          const l = o.injectImpl ? or(o.injectImpl) : null
          ag(n, r, $.Default)
          try {
            ;(i = n[t] = o.factory(void 0, s, n, r)),
              e.firstCreatePass &&
                t >= r.directiveStart &&
                (function mS (n, e, t) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: i,
                    ngDoCheck: s
                  } = e.type.prototype
                  if (r) {
                    const o = Zp(e)
                    ;(t.preOrderHooks || (t.preOrderHooks = [])).push(n, o),
                      (
                        t.preOrderCheckHooks || (t.preOrderCheckHooks = [])
                      ).push(n, o)
                  }
                  i &&
                    (t.preOrderHooks || (t.preOrderHooks = [])).push(0 - n, i),
                    s &&
                      ((t.preOrderHooks || (t.preOrderHooks = [])).push(n, s),
                      (
                        t.preOrderCheckHooks || (t.preOrderCheckHooks = [])
                      ).push(n, s))
                })(t, s[t], e)
          } finally {
            null !== l && or(l), ma(a), (o.resolving = !1), dg()
          }
        }
        return i
      }
      function Dg (n, e, t) {
        return !!(t[e + (n >> 5)] & (1 << n))
      }
      function Eg (n, e) {
        return !(n & $.Self || (n & $.Host && e))
      }
      class gi {
        constructor (e, t) {
          ;(this._tNode = e), (this._lView = t)
        }
        get (e, t, r) {
          return bg(this._tNode, this._lView, e, r, t)
        }
      }
      function at (n) {
        return ar(() => {
          const e = n.prototype.constructor,
            t = e[Vn] || uc(e),
            r = Object.prototype
          let i = Object.getPrototypeOf(n.prototype).constructor
          for (; i && i !== r; ) {
            const s = i[Vn] || uc(i)
            if (s && s !== t) return s
            i = Object.getPrototypeOf(i)
          }
          return s => new s()
        })
      }
      function uc (n) {
        return Bp(n)
          ? () => {
              const e = uc(q(n))
              return e && e()
            }
          : Nr(n)
      }
      function ks (n) {
        return (function SS (n, e) {
          if ('class' === e) return n.classes
          if ('style' === e) return n.styles
          const t = n.attrs
          if (t) {
            const r = t.length
            let i = 0
            for (; i < r; ) {
              const s = t[i]
              if (hg(s)) break
              if (0 === s) i += 2
              else if ('number' == typeof s)
                for (i++; i < r && 'string' == typeof t[i]; ) i++
              else {
                if (s === e) return t[i + 1]
                i += 2
              }
            }
          }
          return null
        })(Ge(), n)
      }
      const yi = '__parameters__'
      function vi (n, e, t) {
        return ar(() => {
          const r = (function cc (n) {
            return function (...t) {
              if (n) {
                const r = n(...t)
                for (const i in r) this[i] = r[i]
              }
            }
          })(e)
          function i (...s) {
            if (this instanceof i) return r.apply(this, s), this
            const o = new i(...s)
            return (a.annotation = o), a
            function a (l, u, c) {
              const d = l.hasOwnProperty(yi)
                ? l[yi]
                : Object.defineProperty(l, yi, { value: [] })[yi]
              for (; d.length <= c; ) d.push(null)
              return (d[c] = d[c] || []).push(o), l
            }
          }
          return (
            t && (i.prototype = Object.create(t.prototype)),
            (i.prototype.ngMetadataName = n),
            (i.annotationCls = i),
            i
          )
        })
      }
      class x {
        constructor (e, t) {
          ;(this._desc = e),
            (this.ngMetadataName = 'InjectionToken'),
            (this.ɵprov = void 0),
            'number' == typeof t
              ? (this.__NG_ELEMENT_ID__ = t)
              : void 0 !== t &&
                (this.ɵprov = R({
                  token: this,
                  providedIn: t.providedIn || 'root',
                  factory: t.factory
                }))
        }
        toString () {
          return `InjectionToken ${this._desc}`
        }
      }
      const xS = new x('AnalyzeForEntryComponents')
      function Kt (n, e) {
        void 0 === e && (e = n)
        for (let t = 0; t < n.length; t++) {
          let r = n[t]
          Array.isArray(r)
            ? (e === n && (e = n.slice(0, t)), Kt(r, e))
            : e !== n && e.push(r)
        }
        return e
      }
      function vn (n, e) {
        n.forEach(t => (Array.isArray(t) ? vn(t, e) : e(t)))
      }
      function Sg (n, e, t) {
        e >= n.length ? n.push(t) : n.splice(e, 0, t)
      }
      function ba (n, e) {
        return e >= n.length - 1 ? n.pop() : n.splice(e, 1)[0]
      }
      function Fs (n, e) {
        const t = []
        for (let r = 0; r < n; r++) t.push(e)
        return t
      }
      function kt (n, e, t) {
        let r = bi(n, e)
        return (
          r >= 0
            ? (n[1 | r] = t)
            : ((r = ~r),
              (function OS (n, e, t, r) {
                let i = n.length
                if (i == e) n.push(t, r)
                else if (1 === i) n.push(r, n[0]), (n[0] = t)
                else {
                  for (i--, n.push(n[i - 1], n[i]); i > e; )
                    (n[i] = n[i - 2]), i--
                  ;(n[e] = t), (n[e + 1] = r)
                }
              })(n, r, e, t)),
          r
        )
      }
      function fc (n, e) {
        const t = bi(n, e)
        if (t >= 0) return n[1 | t]
      }
      function bi (n, e) {
        return (function Tg (n, e, t) {
          let r = 0,
            i = n.length >> t
          for (; i !== r; ) {
            const s = r + ((i - r) >> 1),
              o = n[s << t]
            if (e === o) return s << t
            o > e ? (i = s) : (r = s + 1)
          }
          return ~(i << t)
        })(n, e, 1)
      }
      const Ns = {},
        pc = '__NG_DI_FLAG__',
        Da = 'ngTempTokenPath',
        jS = /\n/gm,
        xg = '__source',
        HS = de({ provide: String, useValue: de })
      let Ps
      function kg (n) {
        const e = Ps
        return (Ps = n), e
      }
      function $S (n, e = $.Default) {
        if (void 0 === Ps) throw new M(203, '')
        return null === Ps
          ? $p(n, void 0, e)
          : Ps.get(n, e & $.Optional ? null : void 0, e)
      }
      function C (n, e = $.Default) {
        return (
          (function T0 () {
            return Lu
          })() || $S
        )(q(n), e)
      }
      function gc (n) {
        const e = []
        for (let t = 0; t < n.length; t++) {
          const r = q(n[t])
          if (Array.isArray(r)) {
            if (0 === r.length) throw new M(900, '')
            let i,
              s = $.Default
            for (let o = 0; o < r.length; o++) {
              const a = r[o],
                l = zS(a)
              'number' == typeof l
                ? -1 === l
                  ? (i = a.token)
                  : (s |= l)
                : (i = a)
            }
            e.push(C(i, s))
          } else e.push(C(r))
        }
        return e
      }
      function Ls (n, e) {
        return (n[pc] = e), (n.prototype[pc] = e), n
      }
      function zS (n) {
        return n[pc]
      }
      const Vs = Ls(
          vi('Inject', n => ({ token: n })),
          -1
        ),
        bn = Ls(vi('Optional'), 8),
        Ci = Ls(vi('SkipSelf'), 4)
      class Ug {
        constructor (e) {
          this.changingThisBreaksApplicationSecurity = e
        }
        toString () {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`
        }
      }
      function fr (n) {
        return n instanceof Ug ? n.changingThisBreaksApplicationSecurity : n
      }
      const fM =
          /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi,
        hM =
          /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i
      var Be = (() => (
        ((Be = Be || {})[(Be.NONE = 0)] = 'NONE'),
        (Be[(Be.HTML = 1)] = 'HTML'),
        (Be[(Be.STYLE = 2)] = 'STYLE'),
        (Be[(Be.SCRIPT = 3)] = 'SCRIPT'),
        (Be[(Be.URL = 4)] = 'URL'),
        (Be[(Be.RESOURCE_URL = 5)] = 'RESOURCE_URL'),
        Be
      ))()
      function wi (n) {
        const e = (function Hs () {
          const n = b()
          return n && n[12]
        })()
        return e
          ? e.sanitize(Be.URL, n) || ''
          : (function js (n, e) {
              const t = (function lM (n) {
                return (n instanceof Ug && n.getTypeName()) || null
              })(n)
              if (null != t && t !== e) {
                if ('ResourceURL' === t && 'URL' === e) return !0
                throw new Error(
                  `Required a safe ${e}, got a ${t} (see https://g.co/ng/security#xss)`
                )
              }
              return t === e
            })(n, 'URL')
          ? fr(n)
          : (function Ma (n) {
              return (n = String(n)).match(fM) || n.match(hM)
                ? n
                : 'unsafe:' + n
            })(U(n))
      }
      const Yg = '__ngContext__'
      function lt (n, e) {
        n[Yg] = e
      }
      function wc (n) {
        const e = (function $s (n) {
          return n[Yg] || null
        })(n)
        return e ? (Array.isArray(e) ? e : e.lView) : null
      }
      function Mc (n) {
        return n.ngOriginalError
      }
      function PM (n, ...e) {
        n.error(...e)
      }
      class Si {
        constructor () {
          this._console = console
        }
        handleError (e) {
          const t = this._findOriginalError(e),
            r = (function NM (n) {
              return (n && n.ngErrorLogger) || PM
            })(e)
          r(this._console, 'ERROR', e),
            t && r(this._console, 'ORIGINAL ERROR', t)
        }
        _findOriginalError (e) {
          let t = e && Mc(e)
          for (; t && Mc(t); ) t = Mc(t)
          return t || null
        }
      }
      const nm = (() =>
        (
          ('undefined' != typeof requestAnimationFrame &&
            requestAnimationFrame) ||
          setTimeout
        ).bind(ce))()
      function Dn (n) {
        return n instanceof Function ? n() : n
      }
      var Rt = (() => (
        ((Rt = Rt || {})[(Rt.Important = 1)] = 'Important'),
        (Rt[(Rt.DashCase = 2)] = 'DashCase'),
        Rt
      ))()
      function Tc (n, e) {
        return undefined(n, e)
      }
      function zs (n) {
        const e = n[3]
        return sn(e) ? e[3] : e
      }
      function Ic (n) {
        return am(n[13])
      }
      function xc (n) {
        return am(n[4])
      }
      function am (n) {
        for (; null !== n && !sn(n); ) n = n[4]
        return n
      }
      function Ai (n, e, t, r, i) {
        if (null != r) {
          let s,
            o = !1
          sn(r) ? (s = r) : yn(r) && ((o = !0), (r = r[0]))
          const a = Ve(r)
          0 === n && null !== t
            ? null == i
              ? hm(e, t, a)
              : Lr(e, t, a, i || null, !0)
            : 1 === n && null !== t
            ? Lr(e, t, a, i || null, !0)
            : 2 === n
            ? (function bm (n, e, t) {
                const r = Ta(n, e)
                r &&
                  (function sA (n, e, t, r) {
                    ke(n) ? n.removeChild(e, t, r) : e.removeChild(t)
                  })(n, r, e, t)
              })(e, a, o)
            : 3 === n && e.destroyNode(a),
            null != s &&
              (function lA (n, e, t, r, i) {
                const s = t[7]
                s !== Ve(t) && Ai(e, n, r, s, i)
                for (let a = 10; a < t.length; a++) {
                  const l = t[a]
                  Gs(l[1], l, n, e, r, s)
                }
              })(e, n, s, t, i)
        }
      }
      function Rc (n, e, t) {
        if (ke(n)) return n.createElement(e, t)
        {
          const r =
            null !== t
              ? (function K0 (n) {
                  const e = n.toLowerCase()
                  return 'svg' === e
                    ? 'http://www.w3.org/2000/svg'
                    : 'math' === e
                    ? 'http://www.w3.org/1998/MathML/'
                    : null
                })(t)
              : null
          return null === r ? n.createElement(e) : n.createElementNS(r, e)
        }
      }
      function um (n, e) {
        const t = n[9],
          r = t.indexOf(e),
          i = e[3]
        1024 & e[2] && ((e[2] &= -1025), Yu(i, -1)), t.splice(r, 1)
      }
      function Oc (n, e) {
        if (n.length <= 10) return
        const t = 10 + e,
          r = n[t]
        if (r) {
          const i = r[17]
          null !== i && i !== n && um(i, r), e > 0 && (n[t - 1][4] = r[4])
          const s = ba(n, 10 + e)
          !(function YM (n, e) {
            Gs(n, e, e[W], 2, null, null), (e[0] = null), (e[6] = null)
          })(r[1], r)
          const o = s[19]
          null !== o && o.detachView(s[1]),
            (r[3] = null),
            (r[4] = null),
            (r[2] &= -129)
        }
        return r
      }
      function cm (n, e) {
        if (!(256 & e[2])) {
          const t = e[W]
          ke(t) && t.destroyNode && Gs(n, e, t, 3, null, null),
            (function eA (n) {
              let e = n[13]
              if (!e) return Fc(n[1], n)
              for (; e; ) {
                let t = null
                if (yn(e)) t = e[13]
                else {
                  const r = e[10]
                  r && (t = r)
                }
                if (!t) {
                  for (; e && !e[4] && e !== n; )
                    yn(e) && Fc(e[1], e), (e = e[3])
                  null === e && (e = n), yn(e) && Fc(e[1], e), (t = e && e[4])
                }
                e = t
              }
            })(e)
        }
      }
      function Fc (n, e) {
        if (!(256 & e[2])) {
          ;(e[2] &= -129),
            (e[2] |= 256),
            (function iA (n, e) {
              let t
              if (null != n && null != (t = n.destroyHooks))
                for (let r = 0; r < t.length; r += 2) {
                  const i = e[t[r]]
                  if (!(i instanceof As)) {
                    const s = t[r + 1]
                    if (Array.isArray(s))
                      for (let o = 0; o < s.length; o += 2) {
                        const a = i[s[o]],
                          l = s[o + 1]
                        try {
                          l.call(a)
                        } finally {
                        }
                      }
                    else
                      try {
                        s.call(i)
                      } finally {
                      }
                  }
                }
            })(n, e),
            (function rA (n, e) {
              const t = n.cleanup,
                r = e[7]
              let i = -1
              if (null !== t)
                for (let s = 0; s < t.length - 1; s += 2)
                  if ('string' == typeof t[s]) {
                    const o = t[s + 1],
                      a = 'function' == typeof o ? o(e) : Ve(e[o]),
                      l = r[(i = t[s + 2])],
                      u = t[s + 3]
                    'boolean' == typeof u
                      ? a.removeEventListener(t[s], l, u)
                      : u >= 0
                      ? r[(i = u)]()
                      : r[(i = -u)].unsubscribe(),
                      (s += 2)
                  } else {
                    const o = r[(i = t[s + 1])]
                    t[s].call(o)
                  }
              if (null !== r) {
                for (let s = i + 1; s < r.length; s++) r[s]()
                e[7] = null
              }
            })(n, e),
            1 === e[1].type && ke(e[W]) && e[W].destroy()
          const t = e[17]
          if (null !== t && sn(e[3])) {
            t !== e[3] && um(t, e)
            const r = e[19]
            null !== r && r.detachView(n)
          }
        }
      }
      function dm (n, e, t) {
        return (function fm (n, e, t) {
          let r = e
          for (; null !== r && 40 & r.type; ) r = (e = r).parent
          if (null === r) return t[0]
          if (2 & r.flags) {
            const i = n.data[r.directiveStart].encapsulation
            if (i === nn.None || i === nn.Emulated) return null
          }
          return Wt(r, t)
        })(n, e.parent, t)
      }
      function Lr (n, e, t, r, i) {
        ke(n) ? n.insertBefore(e, t, r, i) : e.insertBefore(t, r, i)
      }
      function hm (n, e, t) {
        ke(n) ? n.appendChild(e, t) : e.appendChild(t)
      }
      function pm (n, e, t, r, i) {
        null !== r ? Lr(n, e, t, r, i) : hm(n, e, t)
      }
      function Ta (n, e) {
        return ke(n) ? n.parentNode(e) : e.parentNode
      }
      function gm (n, e, t) {
        return ym(n, e, t)
      }
      let ym = function mm (n, e, t) {
        return 40 & n.type ? Wt(n, t) : null
      }
      function Ia (n, e, t, r) {
        const i = dm(n, r, e),
          s = e[W],
          a = gm(r.parent || e[6], r, e)
        if (null != i)
          if (Array.isArray(t))
            for (let l = 0; l < t.length; l++) pm(s, i, t[l], a, !1)
          else pm(s, i, t, a, !1)
      }
      function xa (n, e) {
        if (null !== e) {
          const t = e.type
          if (3 & t) return Wt(e, n)
          if (4 & t) return Pc(-1, n[e.index])
          if (8 & t) {
            const r = e.child
            if (null !== r) return xa(n, r)
            {
              const i = n[e.index]
              return sn(i) ? Pc(-1, i) : Ve(i)
            }
          }
          if (32 & t) return Tc(e, n)() || Ve(n[e.index])
          {
            const r = vm(n, e)
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : xa(zs(n[16]), r)
              : xa(n, e.next)
          }
        }
        return null
      }
      function vm (n, e) {
        return null !== e ? n[16][6].projection[e.projection] : null
      }
      function Pc (n, e) {
        const t = 10 + n + 1
        if (t < e.length) {
          const r = e[t],
            i = r[1].firstChild
          if (null !== i) return xa(r, i)
        }
        return e[7]
      }
      function Lc (n, e, t, r, i, s, o) {
        for (; null != t; ) {
          const a = r[t.index],
            l = t.type
          if (
            (o && 0 === e && (a && lt(Ve(a), r), (t.flags |= 4)),
            64 != (64 & t.flags))
          )
            if (8 & l) Lc(n, e, t.child, r, i, s, !1), Ai(e, n, i, a, s)
            else if (32 & l) {
              const u = Tc(t, r)
              let c
              for (; (c = u()); ) Ai(e, n, i, c, s)
              Ai(e, n, i, a, s)
            } else 16 & l ? Cm(n, e, r, t, i, s) : Ai(e, n, i, a, s)
          t = o ? t.projectionNext : t.next
        }
      }
      function Gs (n, e, t, r, i, s) {
        Lc(t, r, n.firstChild, e, i, s, !1)
      }
      function Cm (n, e, t, r, i, s) {
        const o = t[16],
          l = o[6].projection[r.projection]
        if (Array.isArray(l))
          for (let u = 0; u < l.length; u++) Ai(e, n, i, l[u], s)
        else Lc(n, e, l, o[3], i, s, !0)
      }
      function Dm (n, e, t) {
        ke(n) ? n.setAttribute(e, 'style', t) : (e.style.cssText = t)
      }
      function Vc (n, e, t) {
        ke(n)
          ? '' === t
            ? n.removeAttribute(e, 'class')
            : n.setAttribute(e, 'class', t)
          : (e.className = t)
      }
      function Em (n, e, t) {
        let r = n.length
        for (;;) {
          const i = n.indexOf(e, t)
          if (-1 === i) return i
          if (0 === i || n.charCodeAt(i - 1) <= 32) {
            const s = e.length
            if (i + s === r || n.charCodeAt(i + s) <= 32) return i
          }
          t = i + 1
        }
      }
      const wm = 'ng-template'
      function cA (n, e, t) {
        let r = 0
        for (; r < n.length; ) {
          let i = n[r++]
          if (t && 'class' === i) {
            if (((i = n[r]), -1 !== Em(i.toLowerCase(), e, 0))) return !0
          } else if (1 === i) {
            for (; r < n.length && 'string' == typeof (i = n[r++]); )
              if (i.toLowerCase() === e) return !0
            return !1
          }
        }
        return !1
      }
      function Sm (n) {
        return 4 === n.type && n.value !== wm
      }
      function dA (n, e, t) {
        return e === (4 !== n.type || t ? n.value : wm)
      }
      function fA (n, e, t) {
        let r = 4
        const i = n.attrs || [],
          s = (function gA (n) {
            for (let e = 0; e < n.length; e++) if (hg(n[e])) return e
            return n.length
          })(i)
        let o = !1
        for (let a = 0; a < e.length; a++) {
          const l = e[a]
          if ('number' != typeof l) {
            if (!o)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ('' !== l && !dA(n, l, t)) || ('' === l && 1 === e.length))
                ) {
                  if (an(r)) return !1
                  o = !0
                }
              } else {
                const u = 8 & r ? l : e[++a]
                if (8 & r && null !== n.attrs) {
                  if (!cA(n.attrs, u, t)) {
                    if (an(r)) return !1
                    o = !0
                  }
                  continue
                }
                const d = hA(8 & r ? 'class' : l, i, Sm(n), t)
                if (-1 === d) {
                  if (an(r)) return !1
                  o = !0
                  continue
                }
                if ('' !== u) {
                  let f
                  f = d > s ? '' : i[d + 1].toLowerCase()
                  const h = 8 & r ? f : null
                  if ((h && -1 !== Em(h, u, 0)) || (2 & r && u !== f)) {
                    if (an(r)) return !1
                    o = !0
                  }
                }
              }
          } else {
            if (!o && !an(r) && !an(l)) return !1
            if (o && an(l)) continue
            ;(o = !1), (r = l | (1 & r))
          }
        }
        return an(r) || o
      }
      function an (n) {
        return 0 == (1 & n)
      }
      function hA (n, e, t, r) {
        if (null === e) return -1
        let i = 0
        if (r || !t) {
          let s = !1
          for (; i < e.length; ) {
            const o = e[i]
            if (o === n) return i
            if (3 === o || 6 === o) s = !0
            else {
              if (1 === o || 2 === o) {
                let a = e[++i]
                for (; 'string' == typeof a; ) a = e[++i]
                continue
              }
              if (4 === o) break
              if (0 === o) {
                i += 4
                continue
              }
            }
            i += s ? 1 : 2
          }
          return -1
        }
        return (function mA (n, e) {
          let t = n.indexOf(4)
          if (t > -1)
            for (t++; t < n.length; ) {
              const r = n[t]
              if ('number' == typeof r) return -1
              if (r === e) return t
              t++
            }
          return -1
        })(e, n)
      }
      function Mm (n, e, t = !1) {
        for (let r = 0; r < e.length; r++) if (fA(n, e[r], t)) return !0
        return !1
      }
      function yA (n, e) {
        e: for (let t = 0; t < e.length; t++) {
          const r = e[t]
          if (n.length === r.length) {
            for (let i = 0; i < n.length; i++) if (n[i] !== r[i]) continue e
            return !0
          }
        }
        return !1
      }
      function Am (n, e) {
        return n ? ':not(' + e.trim() + ')' : e
      }
      function _A (n) {
        let e = n[0],
          t = 1,
          r = 2,
          i = '',
          s = !1
        for (; t < n.length; ) {
          let o = n[t]
          if ('string' == typeof o)
            if (2 & r) {
              const a = n[++t]
              i += '[' + o + (a.length > 0 ? '="' + a + '"' : '') + ']'
            } else 8 & r ? (i += '.' + o) : 4 & r && (i += ' ' + o)
          else
            '' !== i && !an(o) && ((e += Am(s, i)), (i = '')),
              (r = o),
              (s = s || !an(r))
          t++
        }
        return '' !== i && (e += Am(s, i)), e
      }
      const H = {}
      function z (n) {
        Tm(re(), b(), gt() + n, aa())
      }
      function Tm (n, e, t, r) {
        if (!r)
          if (3 == (3 & e[2])) {
            const s = n.preOrderCheckHooks
            null !== s && fa(e, s, t)
          } else {
            const s = n.preOrderHooks
            null !== s && ha(e, s, 0, t)
          }
        cr(t)
      }
      function ka (n, e) {
        return (n << 17) | (e << 2)
      }
      function ln (n) {
        return (n >> 17) & 32767
      }
      function Bc (n) {
        return 2 | n
      }
      function Un (n) {
        return (131068 & n) >> 2
      }
      function jc (n, e) {
        return (-131069 & n) | (e << 2)
      }
      function Uc (n) {
        return 1 | n
      }
      function Bm (n, e) {
        const t = n.contentQueries
        if (null !== t)
          for (let r = 0; r < t.length; r += 2) {
            const i = t[r],
              s = t[r + 1]
            if (-1 !== s) {
              const o = n.data[s]
              nc(i), o.contentQueries(2, e[s], s)
            }
          }
      }
      function qs (n, e, t, r, i, s, o, a, l, u) {
        const c = e.blueprint.slice()
        return (
          (c[0] = i),
          (c[2] = 140 | r),
          tg(c),
          (c[3] = c[15] = n),
          (c[8] = t),
          (c[10] = o || (n && n[10])),
          (c[W] = a || (n && n[W])),
          (c[12] = l || (n && n[12]) || null),
          (c[9] = u || (n && n[9]) || null),
          (c[6] = s),
          (c[16] = 2 == e.type ? n[16] : c),
          c
        )
      }
      function Ti (n, e, t, r, i) {
        let s = n.data[e]
        if (null === s)
          (s = (function Zc (n, e, t, r, i) {
            const s = rg(),
              o = Xu(),
              l = (n.data[e] = (function PA (n, e, t, r, i, s) {
                return {
                  type: t,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: e ? e.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: i,
                  attrs: s,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: e,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0
                }
              })(0, o ? s : s && s.parent, t, e, r, i))
            return (
              null === n.firstChild && (n.firstChild = l),
              null !== s &&
                (o
                  ? null == s.child && null !== l.parent && (s.child = l)
                  : null === s.next && (s.next = l)),
              l
            )
          })(n, e, t, r, i)),
            (function oS () {
              return B.lFrame.inI18n
            })() && (s.flags |= 64)
        else if (64 & s.type) {
          ;(s.type = t), (s.value = r), (s.attrs = i)
          const o = (function Ms () {
            const n = B.lFrame,
              e = n.currentTNode
            return n.isParent ? e : e.parent
          })()
          s.injectorIndex = null === o ? -1 : o.injectorIndex
        }
        return _n(s, !0), s
      }
      function Ii (n, e, t, r) {
        if (0 === t) return -1
        const i = e.length
        for (let s = 0; s < t; s++)
          e.push(r), n.blueprint.push(r), n.data.push(null)
        return i
      }
      function Ws (n, e, t) {
        ua(e)
        try {
          const r = n.viewQuery
          null !== r && sd(1, r, t)
          const i = n.template
          null !== i && jm(n, e, i, 1, t),
            n.firstCreatePass && (n.firstCreatePass = !1),
            n.staticContentQueries && Bm(n, e),
            n.staticViewQueries && sd(2, n.viewQuery, t)
          const s = n.components
          null !== s &&
            (function OA (n, e) {
              for (let t = 0; t < e.length; t++) eT(n, e[t])
            })(e, s)
        } catch (r) {
          throw (
            (n.firstCreatePass &&
              ((n.incompleteFirstPass = !0), (n.firstCreatePass = !1)),
            r)
          )
        } finally {
          ;(e[2] &= -5), ca()
        }
      }
      function xi (n, e, t, r) {
        const i = e[2]
        if (256 == (256 & i)) return
        ua(e)
        const s = aa()
        try {
          tg(e),
            (function ig (n) {
              return (B.lFrame.bindingIndex = n)
            })(n.bindingStartIndex),
            null !== t && jm(n, e, t, 2, r)
          const o = 3 == (3 & i)
          if (!s)
            if (o) {
              const u = n.preOrderCheckHooks
              null !== u && fa(e, u, null)
            } else {
              const u = n.preOrderHooks
              null !== u && ha(e, u, 0, null), rc(e, 0)
            }
          if (
            ((function XA (n) {
              for (let e = Ic(n); null !== e; e = xc(e)) {
                if (!e[2]) continue
                const t = e[9]
                for (let r = 0; r < t.length; r++) {
                  const i = t[r],
                    s = i[3]
                  0 == (1024 & i[2]) && Yu(s, 1), (i[2] |= 1024)
                }
              }
            })(e),
            (function YA (n) {
              for (let e = Ic(n); null !== e; e = xc(e))
                for (let t = 10; t < e.length; t++) {
                  const r = e[t],
                    i = r[1]
                  Zu(r) && xi(i, r, i.template, r[8])
                }
            })(e),
            null !== n.contentQueries && Bm(n, e),
            !s)
          )
            if (o) {
              const u = n.contentCheckHooks
              null !== u && fa(e, u)
            } else {
              const u = n.contentHooks
              null !== u && ha(e, u, 1), rc(e, 1)
            }
          !(function kA (n, e) {
            const t = n.hostBindingOpCodes
            if (null !== t)
              try {
                for (let r = 0; r < t.length; r++) {
                  const i = t[r]
                  if (i < 0) cr(~i)
                  else {
                    const s = i,
                      o = t[++r],
                      a = t[++r]
                    aS(o, s), a(2, e[s])
                  }
                }
              } finally {
                cr(-1)
              }
          })(n, e)
          const a = n.components
          null !== a &&
            (function RA (n, e) {
              for (let t = 0; t < e.length; t++) JA(n, e[t])
            })(e, a)
          const l = n.viewQuery
          if ((null !== l && sd(2, l, r), !s))
            if (o) {
              const u = n.viewCheckHooks
              null !== u && fa(e, u)
            } else {
              const u = n.viewHooks
              null !== u && ha(e, u, 2), rc(e, 2)
            }
          !0 === n.firstUpdatePass && (n.firstUpdatePass = !1),
            s || (e[2] &= -73),
            1024 & e[2] && ((e[2] &= -1025), Yu(e[3], -1))
        } finally {
          ca()
        }
      }
      function FA (n, e, t, r) {
        const i = e[10],
          s = !aa(),
          o = eg(e)
        try {
          s && !o && i.begin && i.begin(), o && Ws(n, e, r), xi(n, e, t, r)
        } finally {
          s && !o && i.end && i.end()
        }
      }
      function jm (n, e, t, r, i) {
        const s = gt(),
          o = 2 & r
        try {
          cr(-1), o && e.length > 20 && Tm(n, e, 20, aa()), t(r, i)
        } finally {
          cr(s)
        }
      }
      function Um (n, e, t) {
        if (Hu(e)) {
          const i = e.directiveEnd
          for (let s = e.directiveStart; s < i; s++) {
            const o = n.data[s]
            o.contentQueries && o.contentQueries(1, t[s], s)
          }
        }
      }
      function Yc (n, e, t) {
        !ng() ||
          ((function $A (n, e, t, r) {
            const i = t.directiveStart,
              s = t.directiveEnd
            n.firstCreatePass || Is(t, e), lt(r, e)
            const o = t.initialInputs
            for (let a = i; a < s; a++) {
              const l = n.data[a],
                u = on(l)
              u && KA(e, t, l)
              const c = xs(e, n, a, t)
              lt(c, e),
                null !== o && QA(0, a - i, c, l, 0, o),
                u && (It(t.index, e)[8] = c)
            }
          })(n, e, t, Wt(t, e)),
          128 == (128 & t.flags) &&
            (function zA (n, e, t) {
              const r = t.directiveStart,
                i = t.directiveEnd,
                o = t.index,
                a = (function lS () {
                  return B.lFrame.currentDirectiveIndex
                })()
              try {
                cr(o)
                for (let l = r; l < i; l++) {
                  const u = n.data[l],
                    c = e[l]
                  ec(l),
                    (null !== u.hostBindings ||
                      0 !== u.hostVars ||
                      null !== u.hostAttrs) &&
                      Qm(u, c)
                }
              } finally {
                cr(-1), ec(a)
              }
            })(n, e, t))
      }
      function Xc (n, e, t = Wt) {
        const r = e.localNames
        if (null !== r) {
          let i = e.index + 1
          for (let s = 0; s < r.length; s += 2) {
            const o = r[s + 1],
              a = -1 === o ? t(e, n) : n[o]
            n[i++] = a
          }
        }
      }
      function Hm (n) {
        const e = n.tView
        return null === e || e.incompleteFirstPass
          ? (n.tView = Fa(
              1,
              null,
              n.template,
              n.decls,
              n.vars,
              n.directiveDefs,
              n.pipeDefs,
              n.viewQuery,
              n.schemas,
              n.consts
            ))
          : e
      }
      function Fa (n, e, t, r, i, s, o, a, l, u) {
        const c = 20 + r,
          d = c + i,
          f = (function NA (n, e) {
            const t = []
            for (let r = 0; r < e; r++) t.push(r < n ? null : H)
            return t
          })(c, d),
          h = 'function' == typeof u ? u() : u
        return (f[1] = {
          type: n,
          blueprint: f,
          template: t,
          queries: null,
          viewQuery: a,
          declTNode: e,
          data: f.slice().fill(null, c),
          bindingStartIndex: c,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: 'function' == typeof s ? s() : s,
          pipeRegistry: 'function' == typeof o ? o() : o,
          firstChild: null,
          schemas: l,
          consts: h,
          incompleteFirstPass: !1
        })
      }
      function Gm (n, e, t, r) {
        const i = ty(e)
        null === t
          ? i.push(r)
          : (i.push(t), n.firstCreatePass && ny(n).push(r, i.length - 1))
      }
      function qm (n, e, t) {
        for (let r in n)
          if (n.hasOwnProperty(r)) {
            const i = n[r]
            ;(t = null === t ? {} : t).hasOwnProperty(r)
              ? t[r].push(e, i)
              : (t[r] = [e, i])
          }
        return t
      }
      function Jc (n, e, t, r) {
        let i = !1
        if (ng()) {
          const s = (function GA (n, e, t) {
              const r = n.directiveRegistry
              let i = null
              if (r)
                for (let s = 0; s < r.length; s++) {
                  const o = r[s]
                  Mm(t, o.selectors, !1) &&
                    (i || (i = []),
                    _a(Is(t, e), n, o.type),
                    on(o) ? (Zm(n, t), i.unshift(o)) : i.push(o))
                }
              return i
            })(n, e, t),
            o = null === r ? null : { '': -1 }
          if (null !== s) {
            ;(i = !0), Ym(t, n.data.length, s.length)
            for (let c = 0; c < s.length; c++) {
              const d = s[c]
              d.providersResolver && d.providersResolver(d)
            }
            let a = !1,
              l = !1,
              u = Ii(n, e, s.length, null)
            for (let c = 0; c < s.length; c++) {
              const d = s[c]
              ;(t.mergedAttrs = ga(t.mergedAttrs, d.hostAttrs)),
                Xm(n, t, e, u, d),
                WA(u, d, o),
                null !== d.contentQueries && (t.flags |= 8),
                (null !== d.hostBindings ||
                  null !== d.hostAttrs ||
                  0 !== d.hostVars) &&
                  (t.flags |= 128)
              const f = d.type.prototype
              !a &&
                (f.ngOnChanges || f.ngOnInit || f.ngDoCheck) &&
                ((n.preOrderHooks || (n.preOrderHooks = [])).push(t.index),
                (a = !0)),
                !l &&
                  (f.ngOnChanges || f.ngDoCheck) &&
                  ((n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(
                    t.index
                  ),
                  (l = !0)),
                u++
            }
            !(function LA (n, e) {
              const r = e.directiveEnd,
                i = n.data,
                s = e.attrs,
                o = []
              let a = null,
                l = null
              for (let u = e.directiveStart; u < r; u++) {
                const c = i[u],
                  d = c.inputs,
                  f = null === s || Sm(e) ? null : ZA(d, s)
                o.push(f), (a = qm(d, u, a)), (l = qm(c.outputs, u, l))
              }
              null !== a &&
                (a.hasOwnProperty('class') && (e.flags |= 16),
                a.hasOwnProperty('style') && (e.flags |= 32)),
                (e.initialInputs = o),
                (e.inputs = a),
                (e.outputs = l)
            })(n, t)
          }
          o &&
            (function qA (n, e, t) {
              if (e) {
                const r = (n.localNames = [])
                for (let i = 0; i < e.length; i += 2) {
                  const s = t[e[i + 1]]
                  if (null == s) throw new M(-301, !1)
                  r.push(e[i], s)
                }
              }
            })(t, r, o)
        }
        return (t.mergedAttrs = ga(t.mergedAttrs, t.attrs)), i
      }
      function Km (n, e, t, r, i, s) {
        const o = s.hostBindings
        if (o) {
          let a = n.hostBindingOpCodes
          null === a && (a = n.hostBindingOpCodes = [])
          const l = ~e.index
          ;(function HA (n) {
            let e = n.length
            for (; e > 0; ) {
              const t = n[--e]
              if ('number' == typeof t && t < 0) return t
            }
            return 0
          })(a) != l && a.push(l),
            a.push(r, i, o)
        }
      }
      function Qm (n, e) {
        null !== n.hostBindings && n.hostBindings(1, e)
      }
      function Zm (n, e) {
        ;(e.flags |= 2), (n.components || (n.components = [])).push(e.index)
      }
      function WA (n, e, t) {
        if (t) {
          if (e.exportAs)
            for (let r = 0; r < e.exportAs.length; r++) t[e.exportAs[r]] = n
          on(e) && (t[''] = n)
        }
      }
      function Ym (n, e, t) {
        ;(n.flags |= 1),
          (n.directiveStart = e),
          (n.directiveEnd = e + t),
          (n.providerIndexes = e)
      }
      function Xm (n, e, t, r, i) {
        n.data[r] = i
        const s = i.factory || (i.factory = Nr(i.type)),
          o = new As(s, on(i), null)
        ;(n.blueprint[r] = o),
          (t[r] = o),
          Km(n, e, 0, r, Ii(n, t, i.hostVars, H), i)
      }
      function KA (n, e, t) {
        const r = Wt(e, n),
          i = Hm(t),
          s = n[10],
          o = Na(
            n,
            qs(
              n,
              i,
              null,
              t.onPush ? 64 : 16,
              r,
              e,
              s,
              s.createRenderer(r, t),
              null,
              null
            )
          )
        n[e.index] = o
      }
      function En (n, e, t, r, i, s) {
        const o = Wt(n, e)
        !(function ed (n, e, t, r, i, s, o) {
          if (null == s)
            ke(n) ? n.removeAttribute(e, i, t) : e.removeAttribute(i)
          else {
            const a = null == o ? U(s) : o(s, r || '', i)
            ke(n)
              ? n.setAttribute(e, i, a, t)
              : t
              ? e.setAttributeNS(t, i, a)
              : e.setAttribute(i, a)
          }
        })(e[W], o, s, n.value, t, r, i)
      }
      function QA (n, e, t, r, i, s) {
        const o = s[e]
        if (null !== o) {
          const a = r.setInput
          for (let l = 0; l < o.length; ) {
            const u = o[l++],
              c = o[l++],
              d = o[l++]
            null !== a ? r.setInput(t, d, u, c) : (t[c] = d)
          }
        }
      }
      function ZA (n, e) {
        let t = null,
          r = 0
        for (; r < e.length; ) {
          const i = e[r]
          if (0 !== i)
            if (5 !== i) {
              if ('number' == typeof i) break
              n.hasOwnProperty(i) &&
                (null === t && (t = []), t.push(i, n[i], e[r + 1])),
                (r += 2)
            } else r += 2
          else r += 4
        }
        return t
      }
      function Jm (n, e, t, r) {
        return new Array(n, !0, !1, e, null, 0, r, t, null, null)
      }
      function JA (n, e) {
        const t = It(e, n)
        if (Zu(t)) {
          const r = t[1]
          80 & t[2] ? xi(r, t, r.template, t[8]) : t[5] > 0 && td(t)
        }
      }
      function td (n) {
        for (let r = Ic(n); null !== r; r = xc(r))
          for (let i = 10; i < r.length; i++) {
            const s = r[i]
            if (1024 & s[2]) {
              const o = s[1]
              xi(o, s, o.template, s[8])
            } else s[5] > 0 && td(s)
          }
        const t = n[1].components
        if (null !== t)
          for (let r = 0; r < t.length; r++) {
            const i = It(t[r], n)
            Zu(i) && i[5] > 0 && td(i)
          }
      }
      function eT (n, e) {
        const t = It(e, n),
          r = t[1]
        ;(function tT (n, e) {
          for (let t = e.length; t < n.blueprint.length; t++)
            e.push(n.blueprint[t])
        })(r, t),
          Ws(r, t, t[8])
      }
      function Na (n, e) {
        return n[13] ? (n[14][4] = e) : (n[13] = e), (n[14] = e), e
      }
      function nd (n) {
        for (; n; ) {
          n[2] |= 64
          const e = zs(n)
          if (V0(n) && !e) return n
          n = e
        }
        return null
      }
      function id (n, e, t) {
        const r = e[10]
        r.begin && r.begin()
        try {
          xi(n, e, n.template, t)
        } catch (i) {
          throw (iy(e, i), i)
        } finally {
          r.end && r.end()
        }
      }
      function ey (n) {
        !(function rd (n) {
          for (let e = 0; e < n.components.length; e++) {
            const t = n.components[e],
              r = wc(t),
              i = r[1]
            FA(i, r, i.template, t)
          }
        })(n[8])
      }
      function sd (n, e, t) {
        nc(0), e(n, t)
      }
      const sT = (() => Promise.resolve(null))()
      function ty (n) {
        return n[7] || (n[7] = [])
      }
      function ny (n) {
        return n.cleanup || (n.cleanup = [])
      }
      function iy (n, e) {
        const t = n[9],
          r = t ? t.get(Si, null) : null
        r && r.handleError(e)
      }
      function sy (n, e, t, r, i) {
        for (let s = 0; s < t.length; ) {
          const o = t[s++],
            a = t[s++],
            l = e[o],
            u = n.data[o]
          null !== u.setInput ? u.setInput(l, i, r, a) : (l[a] = i)
        }
      }
      function Hn (n, e, t) {
        const r = oa(e, n)
        !(function lm (n, e, t) {
          ke(n) ? n.setValue(e, t) : (e.textContent = t)
        })(n[W], r, t)
      }
      function Pa (n, e, t) {
        let r = t ? n.styles : null,
          i = t ? n.classes : null,
          s = 0
        if (null !== e)
          for (let o = 0; o < e.length; o++) {
            const a = e[o]
            'number' == typeof a
              ? (s = a)
              : 1 == s
              ? (i = Ou(i, a))
              : 2 == s && (r = Ou(r, a + ': ' + e[++o] + ';'))
          }
        t ? (n.styles = r) : (n.stylesWithoutHost = r),
          t ? (n.classes = i) : (n.classesWithoutHost = i)
      }
      const od = new x('INJECTOR', -1)
      class oy {
        get (e, t = Ns) {
          if (t === Ns) {
            const r = new Error(`NullInjectorError: No provider for ${ae(e)}!`)
            throw ((r.name = 'NullInjectorError'), r)
          }
          return t
        }
      }
      const ad = new x('Set Injector scope.'),
        Ks = {},
        lT = {}
      let ld
      function ay () {
        return void 0 === ld && (ld = new oy()), ld
      }
      function ly (n, e = null, t = null, r) {
        const i = uy(n, e, t, r)
        return i._resolveInjectorDefTypes(), i
      }
      function uy (n, e = null, t = null, r) {
        return new uT(n, t, e || ay(), r)
      }
      class uT {
        constructor (e, t, r, i = null) {
          ;(this.parent = r),
            (this.records = new Map()),
            (this.injectorDefTypes = new Set()),
            (this.onDestroy = new Set()),
            (this._destroyed = !1)
          const s = []
          t && vn(t, a => this.processProvider(a, e, t)),
            vn([e], a => this.processInjectorType(a, [], s)),
            this.records.set(od, ki(void 0, this))
          const o = this.records.get(ad)
          ;(this.scope = null != o ? o.value : null),
            (this.source = i || ('object' == typeof e ? null : ae(e)))
        }
        get destroyed () {
          return this._destroyed
        }
        destroy () {
          this.assertNotDestroyed(), (this._destroyed = !0)
          try {
            this.onDestroy.forEach(e => e.ngOnDestroy())
          } finally {
            this.records.clear(),
              this.onDestroy.clear(),
              this.injectorDefTypes.clear()
          }
        }
        get (e, t = Ns, r = $.Default) {
          this.assertNotDestroyed()
          const i = kg(this),
            s = or(void 0)
          try {
            if (!(r & $.SkipSelf)) {
              let a = this.records.get(e)
              if (void 0 === a) {
                const l =
                  (function yT (n) {
                    return (
                      'function' == typeof n ||
                      ('object' == typeof n && n instanceof x)
                    )
                  })(e) && Nu(e)
                ;(a = l && this.injectableDefInScope(l) ? ki(ud(e), Ks) : null),
                  this.records.set(e, a)
              }
              if (null != a) return this.hydrate(e, a)
            }
            return (r & $.Self ? ay() : this.parent).get(
              e,
              (t = r & $.Optional && t === Ns ? null : t)
            )
          } catch (o) {
            if ('NullInjectorError' === o.name) {
              if (((o[Da] = o[Da] || []).unshift(ae(e)), i)) throw o
              return (function GS (n, e, t, r) {
                const i = n[Da]
                throw (
                  (e[xg] && i.unshift(e[xg]),
                  (n.message = (function qS (n, e, t, r = null) {
                    n =
                      n && '\n' === n.charAt(0) && '\u0275' == n.charAt(1)
                        ? n.substr(2)
                        : n
                    let i = ae(e)
                    if (Array.isArray(e)) i = e.map(ae).join(' -> ')
                    else if ('object' == typeof e) {
                      let s = []
                      for (let o in e)
                        if (e.hasOwnProperty(o)) {
                          let a = e[o]
                          s.push(
                            o +
                              ':' +
                              ('string' == typeof a ? JSON.stringify(a) : ae(a))
                          )
                        }
                      i = `{${s.join(', ')}}`
                    }
                    return `${t}${r ? '(' + r + ')' : ''}[${i}]: ${n.replace(
                      jS,
                      '\n  '
                    )}`
                  })('\n' + n.message, i, t, r)),
                  (n.ngTokenPath = i),
                  (n[Da] = null),
                  n)
                )
              })(o, e, 'R3InjectorError', this.source)
            }
            throw o
          } finally {
            or(s), kg(i)
          }
        }
        _resolveInjectorDefTypes () {
          this.injectorDefTypes.forEach(e => this.get(e))
        }
        toString () {
          const e = []
          return (
            this.records.forEach((r, i) => e.push(ae(i))),
            `R3Injector[${e.join(', ')}]`
          )
        }
        assertNotDestroyed () {
          if (this._destroyed) throw new M(205, !1)
        }
        processInjectorType (e, t, r) {
          if (!(e = q(e))) return !1
          let i = Up(e)
          const s = (null == i && e.ngModule) || void 0,
            o = void 0 === s ? e : s,
            a = -1 !== r.indexOf(o)
          if ((void 0 !== s && (i = Up(s)), null == i)) return !1
          if (null != i.imports && !a) {
            let c
            r.push(o)
            try {
              vn(i.imports, d => {
                this.processInjectorType(d, t, r) &&
                  (void 0 === c && (c = []), c.push(d))
              })
            } finally {
            }
            if (void 0 !== c)
              for (let d = 0; d < c.length; d++) {
                const { ngModule: f, providers: h } = c[d]
                vn(h, p => this.processProvider(p, f, h || fe))
              }
          }
          this.injectorDefTypes.add(o)
          const l = Nr(o) || (() => new o())
          this.records.set(o, ki(l, Ks))
          const u = i.providers
          if (null != u && !a) {
            const c = e
            vn(u, d => this.processProvider(d, c, u))
          }
          return void 0 !== s && void 0 !== e.providers
        }
        processProvider (e, t, r) {
          let i = Ri((e = q(e))) ? e : q(e && e.provide)
          const s = (function dT (n, e, t) {
            return dy(n) ? ki(void 0, n.useValue) : ki(cy(n), Ks)
          })(e)
          if (Ri(e) || !0 !== e.multi) this.records.get(i)
          else {
            let o = this.records.get(i)
            o ||
              ((o = ki(void 0, Ks, !0)),
              (o.factory = () => gc(o.multi)),
              this.records.set(i, o)),
              (i = e),
              o.multi.push(e)
          }
          this.records.set(i, s)
        }
        hydrate (e, t) {
          return (
            t.value === Ks && ((t.value = lT), (t.value = t.factory())),
            'object' == typeof t.value &&
              t.value &&
              (function mT (n) {
                return (
                  null !== n &&
                  'object' == typeof n &&
                  'function' == typeof n.ngOnDestroy
                )
              })(t.value) &&
              this.onDestroy.add(t.value),
            t.value
          )
        }
        injectableDefInScope (e) {
          if (!e.providedIn) return !1
          const t = q(e.providedIn)
          return 'string' == typeof t
            ? 'any' === t || t === this.scope
            : this.injectorDefTypes.has(t)
        }
      }
      function ud (n) {
        const e = Nu(n),
          t = null !== e ? e.factory : Nr(n)
        if (null !== t) return t
        if (n instanceof x) throw new M(204, !1)
        if (n instanceof Function)
          return (function cT (n) {
            const e = n.length
            if (e > 0) throw (Fs(e, '?'), new M(204, !1))
            const t = (function S0 (n) {
              const e = n && (n[Jo] || n[Hp])
              if (e) {
                const t = (function M0 (n) {
                  if (n.hasOwnProperty('name')) return n.name
                  const e = ('' + n).match(/^function\s*([^\s(]+)/)
                  return null === e ? '' : e[1]
                })(n)
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${t}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${t}" class.`
                  ),
                  e
                )
              }
              return null
            })(n)
            return null !== t ? () => t.factory(n) : () => new n()
          })(n)
        throw new M(204, !1)
      }
      function cy (n, e, t) {
        let r
        if (Ri(n)) {
          const i = q(n)
          return Nr(i) || ud(i)
        }
        if (dy(n)) r = () => q(n.useValue)
        else if (
          (function hT (n) {
            return !(!n || !n.useFactory)
          })(n)
        )
          r = () => n.useFactory(...gc(n.deps || []))
        else if (
          (function fT (n) {
            return !(!n || !n.useExisting)
          })(n)
        )
          r = () => C(q(n.useExisting))
        else {
          const i = q(n && (n.useClass || n.provide))
          if (
            !(function gT (n) {
              return !!n.deps
            })(n)
          )
            return Nr(i) || ud(i)
          r = () => new i(...gc(n.deps))
        }
        return r
      }
      function ki (n, e, t = !1) {
        return { factory: n, value: e, multi: t ? [] : void 0 }
      }
      function dy (n) {
        return null !== n && 'object' == typeof n && HS in n
      }
      function Ri (n) {
        return 'function' == typeof n
      }
      let rt = (() => {
        class n {
          static create (t, r) {
            var i
            if (Array.isArray(t)) return ly({ name: '' }, r, t, '')
            {
              const s = null !== (i = t.name) && void 0 !== i ? i : ''
              return ly({ name: s }, t.parent, t.providers, s)
            }
          }
        }
        return (
          (n.THROW_IF_NOT_FOUND = Ns),
          (n.NULL = new oy()),
          (n.ɵprov = R({ token: n, providedIn: 'any', factory: () => C(od) })),
          (n.__NG_ELEMENT_ID__ = -1),
          n
        )
      })()
      function ST (n, e) {
        da(wc(n)[1], Ge())
      }
      function se (n) {
        let e = (function Ey (n) {
            return Object.getPrototypeOf(n.prototype).constructor
          })(n.type),
          t = !0
        const r = [n]
        for (; e; ) {
          let i
          if (on(n)) i = e.ɵcmp || e.ɵdir
          else {
            if (e.ɵcmp) throw new M(903, '')
            i = e.ɵdir
          }
          if (i) {
            if (t) {
              r.push(i)
              const o = n
              ;(o.inputs = fd(n.inputs)),
                (o.declaredInputs = fd(n.declaredInputs)),
                (o.outputs = fd(n.outputs))
              const a = i.hostBindings
              a && IT(n, a)
              const l = i.viewQuery,
                u = i.contentQueries
              if (
                (l && AT(n, l),
                u && TT(n, u),
                Ru(n.inputs, i.inputs),
                Ru(n.declaredInputs, i.declaredInputs),
                Ru(n.outputs, i.outputs),
                on(i) && i.data.animation)
              ) {
                const c = n.data
                c.animation = (c.animation || []).concat(i.data.animation)
              }
            }
            const s = i.features
            if (s)
              for (let o = 0; o < s.length; o++) {
                const a = s[o]
                a && a.ngInherit && a(n), a === se && (t = !1)
              }
          }
          e = Object.getPrototypeOf(e)
        }
        !(function MT (n) {
          let e = 0,
            t = null
          for (let r = n.length - 1; r >= 0; r--) {
            const i = n[r]
            ;(i.hostVars = e += i.hostVars),
              (i.hostAttrs = ga(i.hostAttrs, (t = ga(t, i.hostAttrs))))
          }
        })(r)
      }
      function fd (n) {
        return n === oi ? {} : n === fe ? [] : n
      }
      function AT (n, e) {
        const t = n.viewQuery
        n.viewQuery = t
          ? (r, i) => {
              e(r, i), t(r, i)
            }
          : e
      }
      function TT (n, e) {
        const t = n.contentQueries
        n.contentQueries = t
          ? (r, i, s) => {
              e(r, i, s), t(r, i, s)
            }
          : e
      }
      function IT (n, e) {
        const t = n.hostBindings
        n.hostBindings = t
          ? (r, i) => {
              e(r, i), t(r, i)
            }
          : e
      }
      let La = null
      function Oi () {
        if (!La) {
          const n = ce.Symbol
          if (n && n.iterator) La = n.iterator
          else {
            const e = Object.getOwnPropertyNames(Map.prototype)
            for (let t = 0; t < e.length; ++t) {
              const r = e[t]
              'entries' !== r &&
                'size' !== r &&
                Map.prototype[r] === Map.prototype.entries &&
                (La = r)
            }
          }
        }
        return La
      }
      function Qs (n) {
        return (
          !!hd(n) && (Array.isArray(n) || (!(n instanceof Map) && Oi() in n))
        )
      }
      function hd (n) {
        return null !== n && ('function' == typeof n || 'object' == typeof n)
      }
      function wn (n, e, t) {
        return (n[e] = t)
      }
      function ut (n, e, t) {
        return !Object.is(n[e], t) && ((n[e] = t), !0)
      }
      function Va (n, e, t, r, i) {
        const s = (function Vr (n, e, t, r) {
          const i = ut(n, e, t)
          return ut(n, e + 1, r) || i
        })(n, e, t, r)
        return ut(n, e + 2, i) || s
      }
      function Je (n, e, t, r) {
        const i = b()
        return ut(i, fi(), e) && (re(), En(Re(), i, n, e, t, r)), Je
      }
      function oe (n, e, t, r, i, s, o, a) {
        const l = b(),
          u = re(),
          c = n + 20,
          d = u.firstCreatePass
            ? (function PT (n, e, t, r, i, s, o, a, l) {
                const u = e.consts,
                  c = Ti(e, n, 4, o || null, ur(u, a))
                Jc(e, t, c, ur(u, l)), da(e, c)
                const d = (c.tViews = Fa(
                  2,
                  c,
                  r,
                  i,
                  s,
                  e.directiveRegistry,
                  e.pipeRegistry,
                  null,
                  e.schemas,
                  u
                ))
                return (
                  null !== e.queries &&
                    (e.queries.template(e, c),
                    (d.queries = e.queries.embeddedTView(c))),
                  c
                )
              })(c, u, l, e, t, r, i, s, o)
            : u.data[c]
        _n(d, !1)
        const f = l[W].createComment('')
        Ia(u, l, f, d),
          lt(f, l),
          Na(l, (l[c] = Jm(f, l, f, d))),
          sa(d) && Yc(u, l, d),
          null != o && Xc(l, d, a)
      }
      function $i (n) {
        return di(
          (function sS () {
            return B.lFrame.contextLView
          })(),
          20 + n
        )
      }
      function y (n, e = $.Default) {
        const t = b()
        return null === t ? C(n, e) : bg(Ge(), t, q(n), e)
      }
      function _d () {
        throw new Error('invalid')
      }
      function j (n, e, t) {
        const r = b()
        return (
          ut(r, fi(), e) &&
            (function Ot (n, e, t, r, i, s, o, a) {
              const l = Wt(e, t)
              let c,
                u = e.inputs
              !a && null != u && (c = u[r])
                ? (sy(n, t, c, r, i),
                  ia(e) &&
                    (function BA (n, e) {
                      const t = It(e, n)
                      16 & t[2] || (t[2] |= 64)
                    })(t, e.index))
                : 3 & e.type &&
                  ((r = (function VA (n) {
                    return 'class' === n
                      ? 'className'
                      : 'for' === n
                      ? 'htmlFor'
                      : 'formaction' === n
                      ? 'formAction'
                      : 'innerHtml' === n
                      ? 'innerHTML'
                      : 'readonly' === n
                      ? 'readOnly'
                      : 'tabindex' === n
                      ? 'tabIndex'
                      : n
                  })(r)),
                  (i = null != o ? o(i, e.value || '', r) : i),
                  ke(s)
                    ? s.setProperty(l, r, i)
                    : sc(r) ||
                      (l.setProperty ? l.setProperty(r, i) : (l[r] = i)))
            })(re(), Re(), r, n, e, r[W], t, !1),
          j
        )
      }
      function vd (n, e, t, r, i) {
        const o = i ? 'class' : 'style'
        sy(n, t, e.inputs[o], o, r)
      }
      function k (n, e, t, r) {
        const i = b(),
          s = re(),
          o = 20 + n,
          a = i[W],
          l = (i[o] = Rc(
            a,
            e,
            (function gS () {
              return B.lFrame.currentNamespace
            })()
          )),
          u = s.firstCreatePass
            ? (function rI (n, e, t, r, i, s, o) {
                const a = e.consts,
                  u = Ti(e, n, 2, i, ur(a, s))
                return (
                  Jc(e, t, u, ur(a, o)),
                  null !== u.attrs && Pa(u, u.attrs, !1),
                  null !== u.mergedAttrs && Pa(u, u.mergedAttrs, !0),
                  null !== e.queries && e.queries.elementStart(e, u),
                  u
                )
              })(o, s, i, 0, e, t, r)
            : s.data[o]
        _n(u, !0)
        const c = u.mergedAttrs
        null !== c && pa(a, l, c)
        const d = u.classes
        null !== d && Vc(a, l, d)
        const f = u.styles
        return (
          null !== f && Dm(a, l, f),
          64 != (64 & u.flags) && Ia(s, i, l, u),
          0 ===
            (function eS () {
              return B.lFrame.elementDepthCount
            })() && lt(l, i),
          (function tS () {
            B.lFrame.elementDepthCount++
          })(),
          sa(u) && (Yc(s, i, u), Um(s, u, i)),
          null !== r && Xc(i, u),
          k
        )
      }
      function T () {
        let n = Ge()
        Xu() ? Ju() : ((n = n.parent), _n(n, !1))
        const e = n
        !(function nS () {
          B.lFrame.elementDepthCount--
        })()
        const t = re()
        return (
          t.firstCreatePass && (da(t, n), Hu(n) && t.queries.elementEnd(n)),
          null != e.classesWithoutHost &&
            (function bS (n) {
              return 0 != (16 & n.flags)
            })(e) &&
            vd(t, e, b(), e.classesWithoutHost, !0),
          null != e.stylesWithoutHost &&
            (function CS (n) {
              return 0 != (32 & n.flags)
            })(e) &&
            vd(t, e, b(), e.stylesWithoutHost, !1),
          T
        )
      }
      function le (n, e, t, r) {
        return k(n, e, t, r), T(), le
      }
      function ja (n, e, t) {
        const r = b(),
          i = re(),
          s = n + 20,
          o = i.firstCreatePass
            ? (function iI (n, e, t, r, i) {
                const s = e.consts,
                  o = ur(s, r),
                  a = Ti(e, n, 8, 'ng-container', o)
                return (
                  null !== o && Pa(a, o, !0),
                  Jc(e, t, a, ur(s, i)),
                  null !== e.queries && e.queries.elementStart(e, a),
                  a
                )
              })(s, i, r, e, t)
            : i.data[s]
        _n(o, !0)
        const a = (r[s] = r[W].createComment(''))
        return (
          Ia(i, r, a, o),
          lt(a, r),
          sa(o) && (Yc(i, r, o), Um(i, o, r)),
          null != t && Xc(r, o),
          ja
        )
      }
      function Ua () {
        let n = Ge()
        const e = re()
        return (
          Xu() ? Ju() : ((n = n.parent), _n(n, !1)),
          e.firstCreatePass && (da(e, n), Hu(n) && e.queries.elementEnd(n)),
          Ua
        )
      }
      function Sn () {
        return b()
      }
      function Ys (n) {
        return !!n && 'function' == typeof n.then
      }
      function zy (n) {
        return !!n && 'function' == typeof n.subscribe
      }
      const bd = zy
      function Ce (n, e, t, r) {
        const i = b(),
          s = re(),
          o = Ge()
        return (
          (function qy (n, e, t, r, i, s, o, a) {
            const l = sa(r),
              c = n.firstCreatePass && ny(n),
              d = e[8],
              f = ty(e)
            let h = !0
            if (3 & r.type || a) {
              const _ = Wt(r, e),
                v = a ? a(_) : _,
                m = f.length,
                D = a ? S => a(Ve(S[r.index])) : r.index
              if (ke(t)) {
                let S = null
                if (
                  (!a &&
                    l &&
                    (S = (function sI (n, e, t, r) {
                      const i = n.cleanup
                      if (null != i)
                        for (let s = 0; s < i.length - 1; s += 2) {
                          const o = i[s]
                          if (o === t && i[s + 1] === r) {
                            const a = e[7],
                              l = i[s + 2]
                            return a.length > l ? a[l] : null
                          }
                          'string' == typeof o && (s += 2)
                        }
                      return null
                    })(n, e, i, r.index)),
                  null !== S)
                )
                  ((S.__ngLastListenerFn__ || S).__ngNextListenerFn__ = s),
                    (S.__ngLastListenerFn__ = s),
                    (h = !1)
                else {
                  s = Cd(r, e, d, s, !1)
                  const G = t.listen(v, i, s)
                  f.push(s, G), c && c.push(i, D, m, m + 1)
                }
              } else
                (s = Cd(r, e, d, s, !0)),
                  v.addEventListener(i, s, o),
                  f.push(s),
                  c && c.push(i, D, m, o)
            } else s = Cd(r, e, d, s, !1)
            const p = r.outputs
            let g
            if (h && null !== p && (g = p[i])) {
              const _ = g.length
              if (_)
                for (let v = 0; v < _; v += 2) {
                  const we = e[g[v]][g[v + 1]].subscribe(s),
                    Te = f.length
                  f.push(s, we), c && c.push(i, r.index, Te, -(Te + 1))
                }
            }
          })(s, i, i[W], o, n, e, !!t, r),
          Ce
        )
      }
      function Wy (n, e, t, r) {
        try {
          return !1 !== t(r)
        } catch (i) {
          return iy(n, i), !1
        }
      }
      function Cd (n, e, t, r, i) {
        return function s (o) {
          if (o === Function) return r
          const a = 2 & n.flags ? It(n.index, e) : e
          0 == (32 & e[2]) && nd(a)
          let l = Wy(e, 0, r, o),
            u = s.__ngNextListenerFn__
          for (; u; ) (l = Wy(e, 0, u, o) && l), (u = u.__ngNextListenerFn__)
          return i && !1 === l && (o.preventDefault(), (o.returnValue = !1)), l
        }
      }
      function he (n = 1) {
        return (function cS (n) {
          return (B.lFrame.contextLView = (function dS (n, e) {
            for (; n > 0; ) (e = e[15]), n--
            return e
          })(n, B.lFrame.contextLView))[8]
        })(n)
      }
      function oI (n, e) {
        let t = null
        const r = (function pA (n) {
          const e = n.attrs
          if (null != e) {
            const t = e.indexOf(5)
            if (0 == (1 & t)) return e[t + 1]
          }
          return null
        })(n)
        for (let i = 0; i < e.length; i++) {
          const s = e[i]
          if ('*' !== s) {
            if (null === r ? Mm(n, s, !0) : yA(r, s)) return i
          } else t = i
        }
        return t
      }
      function s_ (n, e, t, r, i) {
        const s = n[t + 1],
          o = null === e
        let a = r ? ln(s) : Un(s),
          l = !1
        for (; 0 !== a && (!1 === l || o); ) {
          const c = n[a + 1]
          uI(n[a], e) && ((l = !0), (n[a + 1] = r ? Uc(c) : Bc(c))),
            (a = r ? ln(c) : Un(c))
        }
        l && (n[t + 1] = r ? Bc(s) : Uc(s))
      }
      function uI (n, e) {
        return (
          null === n ||
          null == e ||
          (Array.isArray(n) ? n[1] : n) === e ||
          (!(!Array.isArray(n) || 'string' != typeof e) && bi(n, e) >= 0)
        )
      }
      function Mn (n, e, t) {
        return cn(n, e, t, !1), Mn
      }
      function $n (n, e) {
        return cn(n, e, null, !0), $n
      }
      function cn (n, e, t, r) {
        const i = b(),
          s = re(),
          o = (function jn (n) {
            const e = B.lFrame,
              t = e.bindingIndex
            return (e.bindingIndex = e.bindingIndex + n), t
          })(2)
        s.firstUpdatePass &&
          (function h_ (n, e, t, r) {
            const i = n.data
            if (null === i[t + 1]) {
              const s = i[gt()],
                o = (function f_ (n, e) {
                  return e >= n.expandoStartIndex
                })(n, t)
              ;(function y_ (n, e) {
                return 0 != (n.flags & (e ? 16 : 32))
              })(s, r) &&
                null === e &&
                !o &&
                (e = !1),
                (e = (function _I (n, e, t, r) {
                  const i = (function tc (n) {
                    const e = B.lFrame.currentDirectiveIndex
                    return -1 === e ? null : n[e]
                  })(n)
                  let s = r ? e.residualClasses : e.residualStyles
                  if (null === i)
                    0 === (r ? e.classBindings : e.styleBindings) &&
                      ((t = Xs((t = Ed(null, n, e, t, r)), e.attrs, r)),
                      (s = null))
                  else {
                    const o = e.directiveStylingLast
                    if (-1 === o || n[o] !== i)
                      if (((t = Ed(i, n, e, t, r)), null === s)) {
                        let l = (function vI (n, e, t) {
                          const r = t ? e.classBindings : e.styleBindings
                          if (0 !== Un(r)) return n[ln(r)]
                        })(n, e, r)
                        void 0 !== l &&
                          Array.isArray(l) &&
                          ((l = Ed(null, n, e, l[1], r)),
                          (l = Xs(l, e.attrs, r)),
                          (function bI (n, e, t, r) {
                            n[ln(t ? e.classBindings : e.styleBindings)] = r
                          })(n, e, r, l))
                      } else
                        s = (function CI (n, e, t) {
                          let r
                          const i = e.directiveEnd
                          for (let s = 1 + e.directiveStylingLast; s < i; s++)
                            r = Xs(r, n[s].hostAttrs, t)
                          return Xs(r, e.attrs, t)
                        })(n, e, r)
                  }
                  return (
                    void 0 !== s &&
                      (r ? (e.residualClasses = s) : (e.residualStyles = s)),
                    t
                  )
                })(i, s, e, r)),
                (function aI (n, e, t, r, i, s) {
                  let o = s ? e.classBindings : e.styleBindings,
                    a = ln(o),
                    l = Un(o)
                  n[r] = t
                  let c,
                    u = !1
                  if (Array.isArray(t)) {
                    const d = t
                    ;(c = d[1]), (null === c || bi(d, c) > 0) && (u = !0)
                  } else c = t
                  if (i)
                    if (0 !== l) {
                      const f = ln(n[a + 1])
                      ;(n[r + 1] = ka(f, a)),
                        0 !== f && (n[f + 1] = jc(n[f + 1], r)),
                        (n[a + 1] = (function CA (n, e) {
                          return (131071 & n) | (e << 17)
                        })(n[a + 1], r))
                    } else
                      (n[r + 1] = ka(a, 0)),
                        0 !== a && (n[a + 1] = jc(n[a + 1], r)),
                        (a = r)
                  else
                    (n[r + 1] = ka(l, 0)),
                      0 === a ? (a = r) : (n[l + 1] = jc(n[l + 1], r)),
                      (l = r)
                  u && (n[r + 1] = Bc(n[r + 1])),
                    s_(n, c, r, !0),
                    s_(n, c, r, !1),
                    (function lI (n, e, t, r, i) {
                      const s = i ? n.residualClasses : n.residualStyles
                      null != s &&
                        'string' == typeof e &&
                        bi(s, e) >= 0 &&
                        (t[r + 1] = Uc(t[r + 1]))
                    })(e, c, n, r, s),
                    (o = ka(a, l)),
                    s ? (e.classBindings = o) : (e.styleBindings = o)
                })(i, s, e, t, o, r)
            }
          })(s, n, o, r),
          e !== H &&
            ut(i, o, e) &&
            (function g_ (n, e, t, r, i, s, o, a) {
              if (!(3 & e.type)) return
              const l = n.data,
                u = l[a + 1]
              Ha(
                (function km (n) {
                  return 1 == (1 & n)
                })(u)
                  ? m_(l, e, t, i, Un(u), o)
                  : void 0
              ) ||
                (Ha(s) ||
                  ((function xm (n) {
                    return 2 == (2 & n)
                  })(u) &&
                    (s = m_(l, null, t, i, a, o))),
                (function uA (n, e, t, r, i) {
                  const s = ke(n)
                  if (e)
                    i
                      ? s
                        ? n.addClass(t, r)
                        : t.classList.add(r)
                      : s
                      ? n.removeClass(t, r)
                      : t.classList.remove(r)
                  else {
                    let o = -1 === r.indexOf('-') ? void 0 : Rt.DashCase
                    if (null == i)
                      s ? n.removeStyle(t, r, o) : t.style.removeProperty(r)
                    else {
                      const a = 'string' == typeof i && i.endsWith('!important')
                      a && ((i = i.slice(0, -10)), (o |= Rt.Important)),
                        s
                          ? n.setStyle(t, r, i, o)
                          : t.style.setProperty(r, i, a ? 'important' : '')
                    }
                  }
                })(r, o, oa(gt(), t), i, s))
            })(
              s,
              s.data[gt()],
              i,
              i[W],
              n,
              (i[o + 1] = (function wI (n, e) {
                return (
                  null == n ||
                    ('string' == typeof e
                      ? (n += e)
                      : 'object' == typeof n && (n = ae(fr(n)))),
                  n
                )
              })(e, t)),
              r,
              o
            )
      }
      function Ed (n, e, t, r, i) {
        let s = null
        const o = t.directiveEnd
        let a = t.directiveStylingLast
        for (
          -1 === a ? (a = t.directiveStart) : a++;
          a < o && ((s = e[a]), (r = Xs(r, s.hostAttrs, i)), s !== n);

        )
          a++
        return null !== n && (t.directiveStylingLast = a), r
      }
      function Xs (n, e, t) {
        const r = t ? 1 : 2
        let i = -1
        if (null !== e)
          for (let s = 0; s < e.length; s++) {
            const o = e[s]
            'number' == typeof o
              ? (i = o)
              : i === r &&
                (Array.isArray(n) || (n = void 0 === n ? [] : ['', n]),
                kt(n, o, !!t || e[++s]))
          }
        return void 0 === n ? null : n
      }
      function m_ (n, e, t, r, i, s) {
        const o = null === e
        let a
        for (; i > 0; ) {
          const l = n[i],
            u = Array.isArray(l),
            c = u ? l[1] : l,
            d = null === c
          let f = t[i + 1]
          f === H && (f = d ? fe : void 0)
          let h = d ? fc(f, r) : c === r ? f : void 0
          if ((u && !Ha(h) && (h = fc(l, r)), Ha(h) && ((a = h), o))) return a
          const p = n[i + 1]
          i = o ? ln(p) : Un(p)
        }
        if (null !== e) {
          let l = s ? e.residualClasses : e.residualStyles
          null != l && (a = fc(l, r))
        }
        return a
      }
      function Ha (n) {
        return void 0 !== n
      }
      function J (n, e = '') {
        const t = b(),
          r = re(),
          i = n + 20,
          s = r.firstCreatePass ? Ti(r, i, 1, e, null) : r.data[i],
          o = (t[i] = (function kc (n, e) {
            return ke(n) ? n.createText(e) : n.createTextNode(e)
          })(t[W], e))
        Ia(r, t, o, s), _n(s, !1)
      }
      function zn (n) {
        return Js('', n, ''), zn
      }
      function Js (n, e, t) {
        const r = b(),
          i = (function Ni (n, e, t, r) {
            return ut(n, fi(), t) ? e + U(t) + r : H
          })(r, n, e, t)
        return i !== H && Hn(r, gt(), i), Js
      }
      const Br = void 0
      var zI = [
        'en',
        [['a', 'p'], ['AM', 'PM'], Br],
        [['AM', 'PM'], Br, Br],
        [
          ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
          ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
          ],
          ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
        ],
        Br,
        [
          ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
          [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
          ],
          [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
          ]
        ],
        Br,
        [
          ['B', 'A'],
          ['BC', 'AD'],
          ['Before Christ', 'Anno Domini']
        ],
        0,
        [6, 0],
        ['M/d/yy', 'MMM d, y', 'MMMM d, y', 'EEEE, MMMM d, y'],
        ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
        ['{1}, {0}', Br, "{1} 'at' {0}", Br],
        [
          '.',
          ',',
          ';',
          '%',
          '+',
          '-',
          'E',
          '\xd7',
          '\u2030',
          '\u221e',
          'NaN',
          ':'
        ],
        ['#,##0.###', '#,##0%', '\xa4#,##0.00', '#E0'],
        'USD',
        '$',
        'US Dollar',
        {},
        'ltr',
        function $I (n) {
          const t = Math.floor(Math.abs(n)),
            r = n.toString().replace(/^[^.]*\.?/, '').length
          return 1 === t && 0 === r ? 1 : 5
        }
      ]
      let qi = {}
      function V_ (n) {
        return (
          n in qi ||
            (qi[n] =
              ce.ng &&
              ce.ng.common &&
              ce.ng.common.locales &&
              ce.ng.common.locales[n]),
          qi[n]
        )
      }
      var w = (() => (
        ((w = w || {})[(w.LocaleId = 0)] = 'LocaleId'),
        (w[(w.DayPeriodsFormat = 1)] = 'DayPeriodsFormat'),
        (w[(w.DayPeriodsStandalone = 2)] = 'DayPeriodsStandalone'),
        (w[(w.DaysFormat = 3)] = 'DaysFormat'),
        (w[(w.DaysStandalone = 4)] = 'DaysStandalone'),
        (w[(w.MonthsFormat = 5)] = 'MonthsFormat'),
        (w[(w.MonthsStandalone = 6)] = 'MonthsStandalone'),
        (w[(w.Eras = 7)] = 'Eras'),
        (w[(w.FirstDayOfWeek = 8)] = 'FirstDayOfWeek'),
        (w[(w.WeekendRange = 9)] = 'WeekendRange'),
        (w[(w.DateFormat = 10)] = 'DateFormat'),
        (w[(w.TimeFormat = 11)] = 'TimeFormat'),
        (w[(w.DateTimeFormat = 12)] = 'DateTimeFormat'),
        (w[(w.NumberSymbols = 13)] = 'NumberSymbols'),
        (w[(w.NumberFormats = 14)] = 'NumberFormats'),
        (w[(w.CurrencyCode = 15)] = 'CurrencyCode'),
        (w[(w.CurrencySymbol = 16)] = 'CurrencySymbol'),
        (w[(w.CurrencyName = 17)] = 'CurrencyName'),
        (w[(w.Currencies = 18)] = 'Currencies'),
        (w[(w.Directionality = 19)] = 'Directionality'),
        (w[(w.PluralCase = 20)] = 'PluralCase'),
        (w[(w.ExtraData = 21)] = 'ExtraData'),
        w
      ))()
      const $a = 'en-US'
      let B_ = $a
      function Md (n, e, t, r, i) {
        if (((n = q(n)), Array.isArray(n)))
          for (let s = 0; s < n.length; s++) Md(n[s], e, t, r, i)
        else {
          const s = re(),
            o = b()
          let a = Ri(n) ? n : q(n.provide),
            l = cy(n)
          const u = Ge(),
            c = 1048575 & u.providerIndexes,
            d = u.directiveStart,
            f = u.providerIndexes >> 20
          if (Ri(n) || !n.multi) {
            const h = new As(l, i, y),
              p = Td(a, e, i ? c : c + f, d)
            ;-1 === p
              ? (_a(Is(u, o), s, a),
                Ad(s, n, e.length),
                e.push(a),
                u.directiveStart++,
                u.directiveEnd++,
                i && (u.providerIndexes += 1048576),
                t.push(h),
                o.push(h))
              : ((t[p] = h), (o[p] = h))
          } else {
            const h = Td(a, e, c + f, d),
              p = Td(a, e, c, c + f),
              g = h >= 0 && t[h],
              _ = p >= 0 && t[p]
            if ((i && !_) || (!i && !g)) {
              _a(Is(u, o), s, a)
              const v = (function $x (n, e, t, r, i) {
                const s = new As(n, t, y)
                return (
                  (s.multi = []),
                  (s.index = e),
                  (s.componentProviders = 0),
                  uv(s, i, r && !t),
                  s
                )
              })(i ? Hx : Ux, t.length, i, r, l)
              !i && _ && (t[p].providerFactory = v),
                Ad(s, n, e.length, 0),
                e.push(a),
                u.directiveStart++,
                u.directiveEnd++,
                i && (u.providerIndexes += 1048576),
                t.push(v),
                o.push(v)
            } else Ad(s, n, h > -1 ? h : p, uv(t[i ? p : h], l, !i && r))
            !i && r && _ && t[p].componentProviders++
          }
        }
      }
      function Ad (n, e, t, r) {
        const i = Ri(e),
          s = (function pT (n) {
            return !!n.useClass
          })(e)
        if (i || s) {
          const l = (s ? q(e.useClass) : e).prototype.ngOnDestroy
          if (l) {
            const u = n.destroyHooks || (n.destroyHooks = [])
            if (!i && e.multi) {
              const c = u.indexOf(t)
              ;-1 === c ? u.push(t, [r, l]) : u[c + 1].push(r, l)
            } else u.push(t, l)
          }
        }
      }
      function uv (n, e, t) {
        return t && n.componentProviders++, n.multi.push(e) - 1
      }
      function Td (n, e, t, r) {
        for (let i = t; i < r; i++) if (e[i] === n) return i
        return -1
      }
      function Ux (n, e, t, r) {
        return Id(this.multi, [])
      }
      function Hx (n, e, t, r) {
        const i = this.multi
        let s
        if (this.providerFactory) {
          const o = this.providerFactory.componentProviders,
            a = xs(t, t[1], this.providerFactory.index, r)
          ;(s = a.slice(0, o)), Id(i, s)
          for (let l = o; l < a.length; l++) s.push(a[l])
        } else (s = []), Id(i, s)
        return s
      }
      function Id (n, e) {
        for (let t = 0; t < n.length; t++) e.push((0, n[t])())
        return e
      }
      function Ee (n, e = []) {
        return t => {
          t.providersResolver = (r, i) =>
            (function jx (n, e, t) {
              const r = re()
              if (r.firstCreatePass) {
                const i = on(n)
                Md(t, r.data, r.blueprint, i, !0),
                  Md(e, r.data, r.blueprint, i, !1)
              }
            })(r, i ? i(n) : n, e)
        }
      }
      class cv {}
      class qx {
        resolveComponentFactory (e) {
          throw (function Gx (n) {
            const e = Error(
              `No component factory found for ${ae(
                n
              )}. Did you add it to @NgModule.entryComponents?`
            )
            return (e.ngComponent = n), e
          })(e)
        }
      }
      let Ki = (() => {
        class n {}
        return (n.NULL = new qx()), n
      })()
      function Wx () {
        return Qi(Ge(), b())
      }
      function Qi (n, e) {
        return new et(Wt(n, e))
      }
      let et = (() => {
        class n {
          constructor (t) {
            this.nativeElement = t
          }
        }
        return (n.__NG_ELEMENT_ID__ = Wx), n
      })()
      function Kx (n) {
        return n instanceof et ? n.nativeElement : n
      }
      class io {}
      let Gn = (() => {
          class n {}
          return (
            (n.__NG_ELEMENT_ID__ = () =>
              (function Zx () {
                const n = b(),
                  t = It(Ge().index, n)
                return (function Qx (n) {
                  return n[W]
                })(yn(t) ? t : n)
              })()),
            n
          )
        })(),
        Yx = (() => {
          class n {}
          return (
            (n.ɵprov = R({
              token: n,
              providedIn: 'root',
              factory: () => null
            })),
            n
          )
        })()
      class jr {
        constructor (e) {
          ;(this.full = e),
            (this.major = e.split('.')[0]),
            (this.minor = e.split('.')[1]),
            (this.patch = e.split('.').slice(2).join('.'))
        }
      }
      const Xx = new jr('13.2.3'),
        xd = {}
      function Ka (n, e, t, r, i = !1) {
        for (; null !== t; ) {
          const s = e[t.index]
          if ((null !== s && r.push(Ve(s)), sn(s)))
            for (let a = 10; a < s.length; a++) {
              const l = s[a],
                u = l[1].firstChild
              null !== u && Ka(l[1], l, u, r)
            }
          const o = t.type
          if (8 & o) Ka(n, e, t.child, r)
          else if (32 & o) {
            const a = Tc(t, e)
            let l
            for (; (l = a()); ) r.push(l)
          } else if (16 & o) {
            const a = vm(e, t)
            if (Array.isArray(a)) r.push(...a)
            else {
              const l = zs(e[16])
              Ka(l[1], l, a, r, !0)
            }
          }
          t = i ? t.projectionNext : t.next
        }
        return r
      }
      class so {
        constructor (e, t) {
          ;(this._lView = e),
            (this._cdRefInjectingView = t),
            (this._appRef = null),
            (this._attachedToViewContainer = !1)
        }
        get rootNodes () {
          const e = this._lView,
            t = e[1]
          return Ka(t, e, t.firstChild, [])
        }
        get context () {
          return this._lView[8]
        }
        set context (e) {
          this._lView[8] = e
        }
        get destroyed () {
          return 256 == (256 & this._lView[2])
        }
        destroy () {
          if (this._appRef) this._appRef.detachView(this)
          else if (this._attachedToViewContainer) {
            const e = this._lView[3]
            if (sn(e)) {
              const t = e[8],
                r = t ? t.indexOf(this) : -1
              r > -1 && (Oc(e, r), ba(t, r))
            }
            this._attachedToViewContainer = !1
          }
          cm(this._lView[1], this._lView)
        }
        onDestroy (e) {
          Gm(this._lView[1], this._lView, null, e)
        }
        markForCheck () {
          nd(this._cdRefInjectingView || this._lView)
        }
        detach () {
          this._lView[2] &= -129
        }
        reattach () {
          this._lView[2] |= 128
        }
        detectChanges () {
          id(this._lView[1], this._lView, this.context)
        }
        checkNoChanges () {
          !(function rT (n, e, t) {
            la(!0)
            try {
              id(n, e, t)
            } finally {
              la(!1)
            }
          })(this._lView[1], this._lView, this.context)
        }
        attachToViewContainerRef () {
          if (this._appRef) throw new M(902, '')
          this._attachedToViewContainer = !0
        }
        detachFromAppRef () {
          ;(this._appRef = null),
            (function JM (n, e) {
              Gs(n, e, e[W], 2, null, null)
            })(this._lView[1], this._lView)
        }
        attachToAppRef (e) {
          if (this._attachedToViewContainer) throw new M(902, '')
          this._appRef = e
        }
      }
      class Jx extends so {
        constructor (e) {
          super(e), (this._view = e)
        }
        detectChanges () {
          ey(this._view)
        }
        checkNoChanges () {
          !(function iT (n) {
            la(!0)
            try {
              ey(n)
            } finally {
              la(!1)
            }
          })(this._view)
        }
        get context () {
          return null
        }
      }
      class fv extends Ki {
        constructor (e) {
          super(), (this.ngModule = e)
        }
        resolveComponentFactory (e) {
          const t = st(e)
          return new kd(t, this.ngModule)
        }
      }
      function hv (n) {
        const e = []
        for (let t in n)
          n.hasOwnProperty(t) && e.push({ propName: n[t], templateName: t })
        return e
      }
      const tk = new x('SCHEDULER_TOKEN', {
        providedIn: 'root',
        factory: () => nm
      })
      class kd extends cv {
        constructor (e, t) {
          super(),
            (this.componentDef = e),
            (this.ngModule = t),
            (this.componentType = e.type),
            (this.selector = (function vA (n) {
              return n.map(_A).join(',')
            })(e.selectors)),
            (this.ngContentSelectors = e.ngContentSelectors
              ? e.ngContentSelectors
              : []),
            (this.isBoundToModule = !!t)
        }
        get inputs () {
          return hv(this.componentDef.inputs)
        }
        get outputs () {
          return hv(this.componentDef.outputs)
        }
        create (e, t, r, i) {
          const s = (i = i || this.ngModule)
              ? (function nk (n, e) {
                  return {
                    get: (t, r, i) => {
                      const s = n.get(t, xd, i)
                      return s !== xd || r === xd ? s : e.get(t, r, i)
                    }
                  }
                })(e, i.injector)
              : e,
            o = s.get(io, Jp),
            a = s.get(Yx, null),
            l = o.createRenderer(null, this.componentDef),
            u = this.componentDef.selectors[0][0] || 'div',
            c = r
              ? (function zm (n, e, t) {
                  if (ke(n)) return n.selectRootElement(e, t === nn.ShadowDom)
                  let r = 'string' == typeof e ? n.querySelector(e) : e
                  return (r.textContent = ''), r
                })(l, r, this.componentDef.encapsulation)
              : Rc(
                  o.createRenderer(null, this.componentDef),
                  u,
                  (function ek (n) {
                    const e = n.toLowerCase()
                    return 'svg' === e ? 'svg' : 'math' === e ? 'math' : null
                  })(u)
                ),
            d = this.componentDef.onPush ? 576 : 528,
            f = (function Dy (n, e) {
              return {
                components: [],
                scheduler: n || nm,
                clean: sT,
                playerHandler: e || null,
                flags: 0
              }
            })(),
            h = Fa(0, null, null, 1, 0, null, null, null, null, null),
            p = qs(null, h, f, d, null, null, o, l, a, s)
          let g, _
          ua(p)
          try {
            const v = (function by (n, e, t, r, i, s) {
              const o = t[1]
              t[20] = n
              const l = Ti(o, 20, 2, '#host', null),
                u = (l.mergedAttrs = e.hostAttrs)
              null !== u &&
                (Pa(l, u, !0),
                null !== n &&
                  (pa(i, n, u),
                  null !== l.classes && Vc(i, n, l.classes),
                  null !== l.styles && Dm(i, n, l.styles)))
              const c = r.createRenderer(n, e),
                d = qs(
                  t,
                  Hm(e),
                  null,
                  e.onPush ? 64 : 16,
                  t[20],
                  l,
                  r,
                  c,
                  s || null,
                  null
                )
              return (
                o.firstCreatePass &&
                  (_a(Is(l, t), o, e.type), Zm(o, l), Ym(l, t.length, 1)),
                Na(t, d),
                (t[20] = d)
              )
            })(c, this.componentDef, p, o, l)
            if (c)
              if (r) pa(l, c, ['ng-version', Xx.full])
              else {
                const { attrs: m, classes: D } = (function bA (n) {
                  const e = [],
                    t = []
                  let r = 1,
                    i = 2
                  for (; r < n.length; ) {
                    let s = n[r]
                    if ('string' == typeof s)
                      2 === i
                        ? '' !== s && e.push(s, n[++r])
                        : 8 === i && t.push(s)
                    else {
                      if (!an(i)) break
                      i = s
                    }
                    r++
                  }
                  return { attrs: e, classes: t }
                })(this.componentDef.selectors[0])
                m && pa(l, c, m), D && D.length > 0 && Vc(l, c, D.join(' '))
              }
            if (((_ = Qu(h, 20)), void 0 !== t)) {
              const m = (_.projection = [])
              for (let D = 0; D < this.ngContentSelectors.length; D++) {
                const S = t[D]
                m.push(null != S ? Array.from(S) : null)
              }
            }
            ;(g = (function Cy (n, e, t, r, i) {
              const s = t[1],
                o = (function UA (n, e, t) {
                  const r = Ge()
                  n.firstCreatePass &&
                    (t.providersResolver && t.providersResolver(t),
                    Xm(n, r, e, Ii(n, e, 1, null), t))
                  const i = xs(e, n, r.directiveStart, r)
                  lt(i, e)
                  const s = Wt(r, e)
                  return s && lt(s, e), i
                })(s, t, e)
              if (
                (r.components.push(o),
                (n[8] = o),
                i && i.forEach(l => l(o, e)),
                e.contentQueries)
              ) {
                const l = Ge()
                e.contentQueries(1, o, l.directiveStart)
              }
              const a = Ge()
              return (
                !s.firstCreatePass ||
                  (null === e.hostBindings && null === e.hostAttrs) ||
                  (cr(a.index),
                  Km(t[1], a, 0, a.directiveStart, a.directiveEnd, e),
                  Qm(e, o)),
                o
              )
            })(v, this.componentDef, p, f, [ST])),
              Ws(h, p, null)
          } finally {
            ca()
          }
          return new ik(this.componentType, g, Qi(_, p), p, _)
        }
      }
      class ik extends class zx {} {
        constructor (e, t, r, i, s) {
          super(),
            (this.location = r),
            (this._rootLView = i),
            (this._tNode = s),
            (this.instance = t),
            (this.hostView = this.changeDetectorRef = new Jx(i)),
            (this.componentType = e)
        }
        get injector () {
          return new gi(this._tNode, this._rootLView)
        }
        destroy () {
          this.hostView.destroy()
        }
        onDestroy (e) {
          this.hostView.onDestroy(e)
        }
      }
      class qn {}
      class pv {}
      const Zi = new Map()
      class yv extends qn {
        constructor (e, t) {
          super(),
            (this._parent = t),
            (this._bootstrapComponents = []),
            (this.injector = this),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new fv(this))
          const r = $t(e)
          ;(this._bootstrapComponents = Dn(r.bootstrap)),
            (this._r3Injector = uy(
              e,
              t,
              [
                { provide: qn, useValue: this },
                { provide: Ki, useValue: this.componentFactoryResolver }
              ],
              ae(e)
            )),
            this._r3Injector._resolveInjectorDefTypes(),
            (this.instance = this.get(e))
        }
        get (e, t = rt.THROW_IF_NOT_FOUND, r = $.Default) {
          return e === rt || e === qn || e === od
            ? this
            : this._r3Injector.get(e, t, r)
        }
        destroy () {
          const e = this._r3Injector
          !e.destroyed && e.destroy(),
            this.destroyCbs.forEach(t => t()),
            (this.destroyCbs = null)
        }
        onDestroy (e) {
          this.destroyCbs.push(e)
        }
      }
      class Rd extends pv {
        constructor (e) {
          super(),
            (this.moduleType = e),
            null !== $t(e) &&
              (function ok (n) {
                const e = new Set()
                !(function t (r) {
                  const i = $t(r, !0),
                    s = i.id
                  null !== s &&
                    ((function gv (n, e, t) {
                      if (e && e !== t)
                        throw new Error(
                          `Duplicate module registered for ${n} - ${ae(
                            e
                          )} vs ${ae(e.name)}`
                        )
                    })(s, Zi.get(s), r),
                    Zi.set(s, r))
                  const o = Dn(i.imports)
                  for (const a of o) e.has(a) || (e.add(a), t(a))
                })(n)
              })(e)
        }
        create (e) {
          return new yv(this.moduleType, e)
        }
      }
      function Od (n, e, t, r, i, s) {
        return (function bv (n, e, t, r, i, s, o, a) {
          const l = e + t
          return Va(n, l, i, s, o)
            ? wn(n, l + 3, a ? r.call(a, i, s, o) : r(i, s, o))
            : oo(n, l + 3)
        })(b(), pt(), n, e, t, r, i, s)
      }
      function oo (n, e) {
        const t = n[e]
        return t === H ? void 0 : t
      }
      function Wn (n, e) {
        const t = re()
        let r
        const i = n + 20
        t.firstCreatePass
          ? ((r = (function mk (n, e) {
              if (e)
                for (let t = e.length - 1; t >= 0; t--) {
                  const r = e[t]
                  if (n === r.name) return r
                }
            })(e, t.pipeRegistry)),
            (t.data[i] = r),
            r.onDestroy &&
              (t.destroyHooks || (t.destroyHooks = [])).push(i, r.onDestroy))
          : (r = t.data[i])
        const s = r.factory || (r.factory = Nr(r.type)),
          o = or(y)
        try {
          const a = ma(!1),
            l = s()
          return (
            ma(a),
            (function LT (n, e, t, r) {
              t >= n.data.length &&
                ((n.data[t] = null), (n.blueprint[t] = null)),
                (e[t] = r)
            })(t, b(), i, l),
            l
          )
        } finally {
          or(o)
        }
      }
      function Kn (n, e, t) {
        const r = n + 20,
          i = b(),
          s = di(i, r)
        return (function ao (n, e) {
          return n[1].data[e].pure
        })(i, r)
          ? (function _v (n, e, t, r, i, s) {
              const o = e + t
              return ut(n, o, i)
                ? wn(n, o + 1, s ? r.call(s, i) : r(i))
                : oo(n, o + 1)
            })(i, pt(), e, s.transform, t, s)
          : s.transform(t)
      }
      function Fd (n) {
        return e => {
          setTimeout(n, void 0, e)
        }
      }
      const Fe = class Ck extends Ct {
        constructor (e = !1) {
          super(), (this.__isAsync = e)
        }
        emit (e) {
          super.next(e)
        }
        subscribe (e, t, r) {
          var i, s, o
          let a = e,
            l = t || (() => null),
            u = r
          if (e && 'object' == typeof e) {
            const d = e
            ;(a = null === (i = d.next) || void 0 === i ? void 0 : i.bind(d)),
              (l = null === (s = d.error) || void 0 === s ? void 0 : s.bind(d)),
              (u =
                null === (o = d.complete) || void 0 === o ? void 0 : o.bind(d))
          }
          this.__isAsync && ((l = Fd(l)), a && (a = Fd(a)), u && (u = Fd(u)))
          const c = super.subscribe({ next: a, error: l, complete: u })
          return e instanceof dt && e.add(c), c
        }
      }
      function Dk () {
        return this._results[Oi()]()
      }
      class Nd {
        constructor (e = !1) {
          ;(this._emitDistinctChangesOnly = e),
            (this.dirty = !0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = null),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0)
          const t = Oi(),
            r = Nd.prototype
          r[t] || (r[t] = Dk)
        }
        get changes () {
          return this._changes || (this._changes = new Fe())
        }
        get (e) {
          return this._results[e]
        }
        map (e) {
          return this._results.map(e)
        }
        filter (e) {
          return this._results.filter(e)
        }
        find (e) {
          return this._results.find(e)
        }
        reduce (e, t) {
          return this._results.reduce(e, t)
        }
        forEach (e) {
          this._results.forEach(e)
        }
        some (e) {
          return this._results.some(e)
        }
        toArray () {
          return this._results.slice()
        }
        toString () {
          return this._results.toString()
        }
        reset (e, t) {
          const r = this
          r.dirty = !1
          const i = Kt(e)
          ;(this._changesDetected = !(function kS (n, e, t) {
            if (n.length !== e.length) return !1
            for (let r = 0; r < n.length; r++) {
              let i = n[r],
                s = e[r]
              if ((t && ((i = t(i)), (s = t(s))), s !== i)) return !1
            }
            return !0
          })(r._results, i, t)) &&
            ((r._results = i),
            (r.length = i.length),
            (r.last = i[this.length - 1]),
            (r.first = i[0]))
        }
        notifyOnChanges () {
          this._changes &&
            (this._changesDetected || !this._emitDistinctChangesOnly) &&
            this._changes.emit(this)
        }
        setDirty () {
          this.dirty = !0
        }
        destroy () {
          this.changes.complete(), this.changes.unsubscribe()
        }
      }
      Symbol
      let Qn = (() => {
        class n {}
        return (n.__NG_ELEMENT_ID__ = Sk), n
      })()
      const Ek = Qn,
        wk = class extends Ek {
          constructor (e, t, r) {
            super(),
              (this._declarationLView = e),
              (this._declarationTContainer = t),
              (this.elementRef = r)
          }
          createEmbeddedView (e) {
            const t = this._declarationTContainer.tViews,
              r = qs(
                this._declarationLView,
                t,
                e,
                16,
                null,
                t.declTNode,
                null,
                null,
                null,
                null
              )
            r[17] = this._declarationLView[this._declarationTContainer.index]
            const s = this._declarationLView[19]
            return (
              null !== s && (r[19] = s.createEmbeddedView(t)),
              Ws(t, r, e),
              new so(r)
            )
          }
        }
      function Sk () {
        return Qa(Ge(), b())
      }
      function Qa (n, e) {
        return 4 & n.type ? new wk(e, n, Qi(n, e)) : null
      }
      let fn = (() => {
        class n {}
        return (n.__NG_ELEMENT_ID__ = Mk), n
      })()
      function Mk () {
        return Sv(Ge(), b())
      }
      const Ak = fn,
        Ev = class extends Ak {
          constructor (e, t, r) {
            super(),
              (this._lContainer = e),
              (this._hostTNode = t),
              (this._hostLView = r)
          }
          get element () {
            return Qi(this._hostTNode, this._hostLView)
          }
          get injector () {
            return new gi(this._hostTNode, this._hostLView)
          }
          get parentInjector () {
            const e = ya(this._hostTNode, this._hostLView)
            if (gg(e)) {
              const t = pi(e, this._hostLView),
                r = hi(e)
              return new gi(t[1].data[r + 8], t)
            }
            return new gi(null, this._hostLView)
          }
          clear () {
            for (; this.length > 0; ) this.remove(this.length - 1)
          }
          get (e) {
            const t = wv(this._lContainer)
            return (null !== t && t[e]) || null
          }
          get length () {
            return this._lContainer.length - 10
          }
          createEmbeddedView (e, t, r) {
            const i = e.createEmbeddedView(t || {})
            return this.insert(i, r), i
          }
          createComponent (e, t, r, i, s) {
            const o =
              e &&
              !(function Os (n) {
                return 'function' == typeof n
              })(e)
            let a
            if (o) a = t
            else {
              const d = t || {}
              ;(a = d.index),
                (r = d.injector),
                (i = d.projectableNodes),
                (s = d.ngModuleRef)
            }
            const l = o ? e : new kd(st(e)),
              u = r || this.parentInjector
            if (!s && null == l.ngModule) {
              const f = (o ? u : this.parentInjector).get(qn, null)
              f && (s = f)
            }
            const c = l.create(u, i, void 0, s)
            return this.insert(c.hostView, a), c
          }
          insert (e, t) {
            const r = e._lView,
              i = r[1]
            if (
              (function J0 (n) {
                return sn(n[3])
              })(r)
            ) {
              const c = this.indexOf(e)
              if (-1 !== c) this.detach(c)
              else {
                const d = r[3],
                  f = new Ev(d, d[6], d[3])
                f.detach(f.indexOf(e))
              }
            }
            const s = this._adjustIndex(t),
              o = this._lContainer
            !(function tA (n, e, t, r) {
              const i = 10 + r,
                s = t.length
              r > 0 && (t[i - 1][4] = e),
                r < s - 10
                  ? ((e[4] = t[i]), Sg(t, 10 + r, e))
                  : (t.push(e), (e[4] = null)),
                (e[3] = t)
              const o = e[17]
              null !== o &&
                t !== o &&
                (function nA (n, e) {
                  const t = n[9]
                  e[16] !== e[3][3][16] && (n[2] = !0),
                    null === t ? (n[9] = [e]) : t.push(e)
                })(o, e)
              const a = e[19]
              null !== a && a.insertView(n), (e[2] |= 128)
            })(i, r, o, s)
            const a = Pc(s, o),
              l = r[W],
              u = Ta(l, o[7])
            return (
              null !== u &&
                (function XM (n, e, t, r, i, s) {
                  ;(r[0] = i), (r[6] = e), Gs(n, r, t, 1, i, s)
                })(i, o[6], l, r, u, a),
              e.attachToViewContainerRef(),
              Sg(Pd(o), s, e),
              e
            )
          }
          move (e, t) {
            return this.insert(e, t)
          }
          indexOf (e) {
            const t = wv(this._lContainer)
            return null !== t ? t.indexOf(e) : -1
          }
          remove (e) {
            const t = this._adjustIndex(e, -1),
              r = Oc(this._lContainer, t)
            r && (ba(Pd(this._lContainer), t), cm(r[1], r))
          }
          detach (e) {
            const t = this._adjustIndex(e, -1),
              r = Oc(this._lContainer, t)
            return r && null != ba(Pd(this._lContainer), t) ? new so(r) : null
          }
          _adjustIndex (e, t = 0) {
            return null == e ? this.length + t : e
          }
        }
      function wv (n) {
        return n[8]
      }
      function Pd (n) {
        return n[8] || (n[8] = [])
      }
      function Sv (n, e) {
        let t
        const r = e[n.index]
        if (sn(r)) t = r
        else {
          let i
          if (8 & n.type) i = Ve(r)
          else {
            const s = e[W]
            i = s.createComment('')
            const o = Wt(n, e)
            Lr(
              s,
              Ta(s, o),
              i,
              (function oA (n, e) {
                return ke(n) ? n.nextSibling(e) : e.nextSibling
              })(s, o),
              !1
            )
          }
          ;(e[n.index] = t = Jm(r, e, i, n)), Na(e, t)
        }
        return new Ev(t, n, e)
      }
      class Ld {
        constructor (e) {
          ;(this.queryList = e), (this.matches = null)
        }
        clone () {
          return new Ld(this.queryList)
        }
        setDirty () {
          this.queryList.setDirty()
        }
      }
      class Vd {
        constructor (e = []) {
          this.queries = e
        }
        createEmbeddedView (e) {
          const t = e.queries
          if (null !== t) {
            const r =
                null !== e.contentQueries ? e.contentQueries[0] : t.length,
              i = []
            for (let s = 0; s < r; s++) {
              const o = t.getByIndex(s)
              i.push(this.queries[o.indexInDeclarationView].clone())
            }
            return new Vd(i)
          }
          return null
        }
        insertView (e) {
          this.dirtyQueriesWithMatches(e)
        }
        detachView (e) {
          this.dirtyQueriesWithMatches(e)
        }
        dirtyQueriesWithMatches (e) {
          for (let t = 0; t < this.queries.length; t++)
            null !== kv(e, t).matches && this.queries[t].setDirty()
        }
      }
      class Mv {
        constructor (e, t, r = null) {
          ;(this.predicate = e), (this.flags = t), (this.read = r)
        }
      }
      class Bd {
        constructor (e = []) {
          this.queries = e
        }
        elementStart (e, t) {
          for (let r = 0; r < this.queries.length; r++)
            this.queries[r].elementStart(e, t)
        }
        elementEnd (e) {
          for (let t = 0; t < this.queries.length; t++)
            this.queries[t].elementEnd(e)
        }
        embeddedTView (e) {
          let t = null
          for (let r = 0; r < this.length; r++) {
            const i = null !== t ? t.length : 0,
              s = this.getByIndex(r).embeddedTView(e, i)
            s &&
              ((s.indexInDeclarationView = r),
              null !== t ? t.push(s) : (t = [s]))
          }
          return null !== t ? new Bd(t) : null
        }
        template (e, t) {
          for (let r = 0; r < this.queries.length; r++)
            this.queries[r].template(e, t)
        }
        getByIndex (e) {
          return this.queries[e]
        }
        get length () {
          return this.queries.length
        }
        track (e) {
          this.queries.push(e)
        }
      }
      class jd {
        constructor (e, t = -1) {
          ;(this.metadata = e),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = t)
        }
        elementStart (e, t) {
          this.isApplyingToNode(t) && this.matchTNode(e, t)
        }
        elementEnd (e) {
          this._declarationNodeIndex === e.index &&
            (this._appliesToNextNode = !1)
        }
        template (e, t) {
          this.elementStart(e, t)
        }
        embeddedTView (e, t) {
          return this.isApplyingToNode(e)
            ? ((this.crossesNgTemplate = !0),
              this.addMatch(-e.index, t),
              new jd(this.metadata))
            : null
        }
        isApplyingToNode (e) {
          if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
            const t = this._declarationNodeIndex
            let r = e.parent
            for (; null !== r && 8 & r.type && r.index !== t; ) r = r.parent
            return t === (null !== r ? r.index : -1)
          }
          return this._appliesToNextNode
        }
        matchTNode (e, t) {
          const r = this.metadata.predicate
          if (Array.isArray(r))
            for (let i = 0; i < r.length; i++) {
              const s = r[i]
              this.matchTNodeWithReadOption(e, t, xk(t, s)),
                this.matchTNodeWithReadOption(e, t, va(t, e, s, !1, !1))
            }
          else
            r === Qn
              ? 4 & t.type && this.matchTNodeWithReadOption(e, t, -1)
              : this.matchTNodeWithReadOption(e, t, va(t, e, r, !1, !1))
        }
        matchTNodeWithReadOption (e, t, r) {
          if (null !== r) {
            const i = this.metadata.read
            if (null !== i)
              if (i === et || i === fn || (i === Qn && 4 & t.type))
                this.addMatch(t.index, -2)
              else {
                const s = va(t, e, i, !1, !1)
                null !== s && this.addMatch(t.index, s)
              }
            else this.addMatch(t.index, r)
          }
        }
        addMatch (e, t) {
          null === this.matches
            ? (this.matches = [e, t])
            : this.matches.push(e, t)
        }
      }
      function xk (n, e) {
        const t = n.localNames
        if (null !== t)
          for (let r = 0; r < t.length; r += 2) if (t[r] === e) return t[r + 1]
        return null
      }
      function Rk (n, e, t, r) {
        return -1 === t
          ? (function kk (n, e) {
              return 11 & n.type ? Qi(n, e) : 4 & n.type ? Qa(n, e) : null
            })(e, n)
          : -2 === t
          ? (function Ok (n, e, t) {
              return t === et
                ? Qi(e, n)
                : t === Qn
                ? Qa(e, n)
                : t === fn
                ? Sv(e, n)
                : void 0
            })(n, e, r)
          : xs(n, n[1], t, e)
      }
      function Av (n, e, t, r) {
        const i = e[19].queries[r]
        if (null === i.matches) {
          const s = n.data,
            o = t.matches,
            a = []
          for (let l = 0; l < o.length; l += 2) {
            const u = o[l]
            a.push(u < 0 ? null : Rk(e, s[u], o[l + 1], t.metadata.read))
          }
          i.matches = a
        }
        return i.matches
      }
      function Ud (n, e, t, r) {
        const i = n.queries.getByIndex(t),
          s = i.matches
        if (null !== s) {
          const o = Av(n, e, i, t)
          for (let a = 0; a < s.length; a += 2) {
            const l = s[a]
            if (l > 0) r.push(o[a / 2])
            else {
              const u = s[a + 1],
                c = e[-l]
              for (let d = 10; d < c.length; d++) {
                const f = c[d]
                f[17] === f[3] && Ud(f[1], f, u, r)
              }
              if (null !== c[9]) {
                const d = c[9]
                for (let f = 0; f < d.length; f++) {
                  const h = d[f]
                  Ud(h[1], h, u, r)
                }
              }
            }
          }
        }
        return r
      }
      function Za (n) {
        const e = b(),
          t = re(),
          r = og()
        nc(r + 1)
        const i = kv(t, r)
        if (n.dirty && eg(e) === (2 == (2 & i.metadata.flags))) {
          if (null === i.matches) n.reset([])
          else {
            const s = i.crossesNgTemplate ? Ud(t, e, r, []) : Av(t, e, i, r)
            n.reset(s, Kx), n.notifyOnChanges()
          }
          return !0
        }
        return !1
      }
      function Hd (n, e, t, r) {
        const i = re()
        if (i.firstCreatePass) {
          const s = Ge()
          xv(i, new Mv(e, t, r), s.index),
            (function Nk (n, e) {
              const t = n.contentQueries || (n.contentQueries = [])
              e !== (t.length ? t[t.length - 1] : -1) &&
                t.push(n.queries.length - 1, e)
            })(i, n),
            2 == (2 & t) && (i.staticContentQueries = !0)
        }
        Iv(i, b(), t)
      }
      function Ya () {
        return (function Fk (n, e) {
          return n[19].queries[e].queryList
        })(b(), og())
      }
      function Iv (n, e, t) {
        const r = new Nd(4 == (4 & t))
        Gm(n, e, r, r.destroy),
          null === e[19] && (e[19] = new Vd()),
          e[19].queries.push(new Ld(r))
      }
      function xv (n, e, t) {
        null === n.queries && (n.queries = new Bd()),
          n.queries.track(new jd(e, t))
      }
      function kv (n, e) {
        return n.queries.getByIndex(e)
      }
      function el (...n) {}
      const tl = new x('Application Initializer')
      let Xi = (() => {
        class n {
          constructor (t) {
            ;(this.appInits = t),
              (this.resolve = el),
              (this.reject = el),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, i) => {
                ;(this.resolve = r), (this.reject = i)
              }))
          }
          runInitializers () {
            if (this.initialized) return
            const t = [],
              r = () => {
                ;(this.done = !0), this.resolve()
              }
            if (this.appInits)
              for (let i = 0; i < this.appInits.length; i++) {
                const s = this.appInits[i]()
                if (Ys(s)) t.push(s)
                else if (bd(s)) {
                  const o = new Promise((a, l) => {
                    s.subscribe({ complete: a, error: l })
                  })
                  t.push(o)
                }
              }
            Promise.all(t)
              .then(() => {
                r()
              })
              .catch(i => {
                this.reject(i)
              }),
              0 === t.length && r(),
              (this.initialized = !0)
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(tl, 8))
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        )
      })()
      const uo = new x('AppId'),
        e1 = {
          provide: uo,
          useFactory: function Jk () {
            return `${Kd()}${Kd()}${Kd()}`
          },
          deps: []
        }
      function Kd () {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()))
      }
      const Kv = new x('Platform Initializer'),
        co = new x('Platform ID'),
        Qv = new x('appBootstrapListener')
      let Zv = (() => {
        class n {
          log (t) {
            console.log(t)
          }
          warn (t) {
            console.warn(t)
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)()
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        )
      })()
      const Zn = new x('LocaleId'),
        Yv = new x('DefaultCurrencyCode')
      class t1 {
        constructor (e, t) {
          ;(this.ngModuleFactory = e), (this.componentFactories = t)
        }
      }
      let nl = (() => {
        class n {
          compileModuleSync (t) {
            return new Rd(t)
          }
          compileModuleAsync (t) {
            return Promise.resolve(this.compileModuleSync(t))
          }
          compileModuleAndAllComponentsSync (t) {
            const r = this.compileModuleSync(t),
              s = Dn($t(t).declarations).reduce((o, a) => {
                const l = st(a)
                return l && o.push(new kd(l)), o
              }, [])
            return new t1(r, s)
          }
          compileModuleAndAllComponentsAsync (t) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(t))
          }
          clearCache () {}
          clearCacheFor (t) {}
          getModuleId (t) {}
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)()
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        )
      })()
      const r1 = (() => Promise.resolve(0))()
      function Qd (n) {
        'undefined' == typeof Zone
          ? r1.then(() => {
              n && n.apply(null, null)
            })
          : Zone.current.scheduleMicroTask('scheduleMicrotask', n)
      }
      class pe {
        constructor ({
          enableLongStackTrace: e = !1,
          shouldCoalesceEventChangeDetection: t = !1,
          shouldCoalesceRunChangeDetection: r = !1
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Fe(!1)),
            (this.onMicrotaskEmpty = new Fe(!1)),
            (this.onStable = new Fe(!1)),
            (this.onError = new Fe(!1)),
            'undefined' == typeof Zone)
          )
            throw new Error('In this configuration Angular requires Zone.js')
          Zone.assertZonePatched()
          const i = this
          ;(i._nesting = 0),
            (i._outer = i._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (i._inner = i._inner.fork(new Zone.TaskTrackingZoneSpec())),
            e &&
              Zone.longStackTraceZoneSpec &&
              (i._inner = i._inner.fork(Zone.longStackTraceZoneSpec)),
            (i.shouldCoalesceEventChangeDetection = !r && t),
            (i.shouldCoalesceRunChangeDetection = r),
            (i.lastRequestAnimationFrameId = -1),
            (i.nativeRequestAnimationFrame = (function s1 () {
              let n = ce.requestAnimationFrame,
                e = ce.cancelAnimationFrame
              if ('undefined' != typeof Zone && n && e) {
                const t = n[Zone.__symbol__('OriginalDelegate')]
                t && (n = t)
                const r = e[Zone.__symbol__('OriginalDelegate')]
                r && (e = r)
              }
              return {
                nativeRequestAnimationFrame: n,
                nativeCancelAnimationFrame: e
              }
            })().nativeRequestAnimationFrame),
            (function l1 (n) {
              const e = () => {
                !(function a1 (n) {
                  n.isCheckStableRunning ||
                    -1 !== n.lastRequestAnimationFrameId ||
                    ((n.lastRequestAnimationFrameId =
                      n.nativeRequestAnimationFrame.call(ce, () => {
                        n.fakeTopEventTask ||
                          (n.fakeTopEventTask = Zone.root.scheduleEventTask(
                            'fakeTopEventTask',
                            () => {
                              ;(n.lastRequestAnimationFrameId = -1),
                                Yd(n),
                                (n.isCheckStableRunning = !0),
                                Zd(n),
                                (n.isCheckStableRunning = !1)
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          n.fakeTopEventTask.invoke()
                      })),
                    Yd(n))
                })(n)
              }
              n._inner = n._inner.fork({
                name: 'angular',
                properties: { isAngularZone: !0 },
                onInvokeTask: (t, r, i, s, o, a) => {
                  try {
                    return Xv(n), t.invokeTask(i, s, o, a)
                  } finally {
                    ;((n.shouldCoalesceEventChangeDetection &&
                      'eventTask' === s.type) ||
                      n.shouldCoalesceRunChangeDetection) &&
                      e(),
                      Jv(n)
                  }
                },
                onInvoke: (t, r, i, s, o, a, l) => {
                  try {
                    return Xv(n), t.invoke(i, s, o, a, l)
                  } finally {
                    n.shouldCoalesceRunChangeDetection && e(), Jv(n)
                  }
                },
                onHasTask: (t, r, i, s) => {
                  t.hasTask(i, s),
                    r === i &&
                      ('microTask' == s.change
                        ? ((n._hasPendingMicrotasks = s.microTask),
                          Yd(n),
                          Zd(n))
                        : 'macroTask' == s.change &&
                          (n.hasPendingMacrotasks = s.macroTask))
                },
                onHandleError: (t, r, i, s) => (
                  t.handleError(i, s),
                  n.runOutsideAngular(() => n.onError.emit(s)),
                  !1
                )
              })
            })(i)
        }
        static isInAngularZone () {
          return (
            'undefined' != typeof Zone &&
            !0 === Zone.current.get('isAngularZone')
          )
        }
        static assertInAngularZone () {
          if (!pe.isInAngularZone())
            throw new Error('Expected to be in Angular Zone, but it is not!')
        }
        static assertNotInAngularZone () {
          if (pe.isInAngularZone())
            throw new Error('Expected to not be in Angular Zone, but it is!')
        }
        run (e, t, r) {
          return this._inner.run(e, t, r)
        }
        runTask (e, t, r, i) {
          const s = this._inner,
            o = s.scheduleEventTask('NgZoneEvent: ' + i, e, o1, el, el)
          try {
            return s.runTask(o, t, r)
          } finally {
            s.cancelTask(o)
          }
        }
        runGuarded (e, t, r) {
          return this._inner.runGuarded(e, t, r)
        }
        runOutsideAngular (e) {
          return this._outer.run(e)
        }
      }
      const o1 = {}
      function Zd (n) {
        if (0 == n._nesting && !n.hasPendingMicrotasks && !n.isStable)
          try {
            n._nesting++, n.onMicrotaskEmpty.emit(null)
          } finally {
            if ((n._nesting--, !n.hasPendingMicrotasks))
              try {
                n.runOutsideAngular(() => n.onStable.emit(null))
              } finally {
                n.isStable = !0
              }
          }
      }
      function Yd (n) {
        n.hasPendingMicrotasks = !!(
          n._hasPendingMicrotasks ||
          ((n.shouldCoalesceEventChangeDetection ||
            n.shouldCoalesceRunChangeDetection) &&
            -1 !== n.lastRequestAnimationFrameId)
        )
      }
      function Xv (n) {
        n._nesting++, n.isStable && ((n.isStable = !1), n.onUnstable.emit(null))
      }
      function Jv (n) {
        n._nesting--, Zd(n)
      }
      class u1 {
        constructor () {
          ;(this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Fe()),
            (this.onMicrotaskEmpty = new Fe()),
            (this.onStable = new Fe()),
            (this.onError = new Fe())
        }
        run (e, t, r) {
          return e.apply(t, r)
        }
        runGuarded (e, t, r) {
          return e.apply(t, r)
        }
        runOutsideAngular (e) {
          return e()
        }
        runTask (e, t, r, i) {
          return e.apply(t, r)
        }
      }
      let Xd = (() => {
          class n {
            constructor (t) {
              ;(this._ngZone = t),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                this._watchAngularEvents(),
                t.run(() => {
                  this.taskTrackingZone =
                    'undefined' == typeof Zone
                      ? null
                      : Zone.current.get('TaskTrackingZone')
                })
            }
            _watchAngularEvents () {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  ;(this._didWork = !0), (this._isZoneStable = !1)
                }
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      pe.assertNotInAngularZone(),
                        Qd(() => {
                          ;(this._isZoneStable = !0),
                            this._runCallbacksIfReady()
                        })
                    }
                  })
                })
            }
            increasePendingRequestCount () {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              )
            }
            decreasePendingRequestCount () {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error('pending async requests below zero')
              return this._runCallbacksIfReady(), this._pendingCount
            }
            isStable () {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              )
            }
            _runCallbacksIfReady () {
              if (this.isStable())
                Qd(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let t = this._callbacks.pop()
                    clearTimeout(t.timeoutId), t.doneCb(this._didWork)
                  }
                  this._didWork = !1
                })
              else {
                let t = this.getPendingTasks()
                ;(this._callbacks = this._callbacks.filter(
                  r =>
                    !r.updateCb ||
                    !r.updateCb(t) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0)
              }
            }
            getPendingTasks () {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map(t => ({
                    source: t.source,
                    creationLocation: t.creationLocation,
                    data: t.data
                  }))
                : []
            }
            addCallback (t, r, i) {
              let s = -1
              r &&
                r > 0 &&
                (s = setTimeout(() => {
                  ;(this._callbacks = this._callbacks.filter(
                    o => o.timeoutId !== s
                  )),
                    t(this._didWork, this.getPendingTasks())
                }, r)),
                this._callbacks.push({ doneCb: t, timeoutId: s, updateCb: i })
            }
            whenStable (t, r, i) {
              if (i && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                )
              this.addCallback(t, r, i), this._runCallbacksIfReady()
            }
            getPendingRequestCount () {
              return this._pendingCount
            }
            findProviders (t, r, i) {
              return []
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(C(pe))
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          )
        })(),
        eb = (() => {
          class n {
            constructor () {
              ;(this._applications = new Map()), Jd.addToWindow(this)
            }
            registerApplication (t, r) {
              this._applications.set(t, r)
            }
            unregisterApplication (t) {
              this._applications.delete(t)
            }
            unregisterAllApplications () {
              this._applications.clear()
            }
            getTestability (t) {
              return this._applications.get(t) || null
            }
            getAllTestabilities () {
              return Array.from(this._applications.values())
            }
            getAllRootElements () {
              return Array.from(this._applications.keys())
            }
            findTestabilityInTree (t, r = !0) {
              return Jd.findTestabilityInTree(this, t, r)
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)()
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          )
        })()
      class c1 {
        addToWindow (e) {}
        findTestabilityInTree (e, t, r) {
          return null
        }
      }
      let hn,
        Jd = new c1()
      const tb = new x('AllowMultipleToken')
      class nb {
        constructor (e, t) {
          ;(this.name = e), (this.token = t)
        }
      }
      function rb (n, e, t = []) {
        const r = `Platform: ${e}`,
          i = new x(r)
        return (s = []) => {
          let o = ib()
          if (!o || o.injector.get(tb, !1))
            if (n) n(t.concat(s).concat({ provide: i, useValue: !0 }))
            else {
              const a = t
                .concat(s)
                .concat(
                  { provide: i, useValue: !0 },
                  { provide: ad, useValue: 'platform' }
                )
              !(function p1 (n) {
                if (hn && !hn.destroyed && !hn.injector.get(tb, !1))
                  throw new M(400, '')
                hn = n.get(sb)
                const e = n.get(Kv, null)
                e && e.forEach(t => t())
              })(rt.create({ providers: a, name: r }))
            }
          return (function g1 (n) {
            const e = ib()
            if (!e) throw new M(401, '')
            return e
          })()
        }
      }
      function ib () {
        return hn && !hn.destroyed ? hn : null
      }
      let sb = (() => {
        class n {
          constructor (t) {
            ;(this._injector = t),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1)
          }
          bootstrapModuleFactory (t, r) {
            const a = (function m1 (n, e) {
                let t
                return (
                  (t =
                    'noop' === n
                      ? new u1()
                      : ('zone.js' === n ? void 0 : n) ||
                        new pe({
                          enableLongStackTrace: !1,
                          shouldCoalesceEventChangeDetection: !!(null == e
                            ? void 0
                            : e.ngZoneEventCoalescing),
                          shouldCoalesceRunChangeDetection: !!(null == e
                            ? void 0
                            : e.ngZoneRunCoalescing)
                        })),
                  t
                )
              })(r ? r.ngZone : void 0, {
                ngZoneEventCoalescing: (r && r.ngZoneEventCoalescing) || !1,
                ngZoneRunCoalescing: (r && r.ngZoneRunCoalescing) || !1
              }),
              l = [{ provide: pe, useValue: a }]
            return a.run(() => {
              const u = rt.create({
                  providers: l,
                  parent: this.injector,
                  name: t.moduleType.name
                }),
                c = t.create(u),
                d = c.injector.get(Si, null)
              if (!d) throw new M(402, '')
              return (
                a.runOutsideAngular(() => {
                  const f = a.onError.subscribe({
                    next: h => {
                      d.handleError(h)
                    }
                  })
                  c.onDestroy(() => {
                    ef(this._modules, c), f.unsubscribe()
                  })
                }),
                (function y1 (n, e, t) {
                  try {
                    const r = t()
                    return Ys(r)
                      ? r.catch(i => {
                          throw (e.runOutsideAngular(() => n.handleError(i)), i)
                        })
                      : r
                  } catch (r) {
                    throw (e.runOutsideAngular(() => n.handleError(r)), r)
                  }
                })(d, a, () => {
                  const f = c.injector.get(Xi)
                  return (
                    f.runInitializers(),
                    f.donePromise.then(
                      () => (
                        (function QI (n) {
                          Mt(n, 'Expected localeId to be defined'),
                            'string' == typeof n &&
                              (B_ = n.toLowerCase().replace(/_/g, '-'))
                        })(c.injector.get(Zn, $a) || $a),
                        this._moduleDoBootstrap(c),
                        c
                      )
                    )
                  )
                })
              )
            })
          }
          bootstrapModule (t, r = []) {
            const i = ob({}, r)
            return (function f1 (n, e, t) {
              const r = new Rd(t)
              return Promise.resolve(r)
            })(0, 0, t).then(s => this.bootstrapModuleFactory(s, i))
          }
          _moduleDoBootstrap (t) {
            const r = t.injector.get(fo)
            if (t._bootstrapComponents.length > 0)
              t._bootstrapComponents.forEach(i => r.bootstrap(i))
            else {
              if (!t.instance.ngDoBootstrap) throw new M(403, '')
              t.instance.ngDoBootstrap(r)
            }
            this._modules.push(t)
          }
          onDestroy (t) {
            this._destroyListeners.push(t)
          }
          get injector () {
            return this._injector
          }
          destroy () {
            if (this._destroyed) throw new M(404, '')
            this._modules.slice().forEach(t => t.destroy()),
              this._destroyListeners.forEach(t => t()),
              (this._destroyed = !0)
          }
          get destroyed () {
            return this._destroyed
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(rt))
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        )
      })()
      function ob (n, e) {
        return Array.isArray(e)
          ? e.reduce(ob, n)
          : Object.assign(Object.assign({}, n), e)
      }
      let fo = (() => {
        class n {
          constructor (t, r, i, s, o) {
            ;(this._zone = t),
              (this._injector = r),
              (this._exceptionHandler = i),
              (this._componentFactoryResolver = s),
              (this._initStatus = o),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick()
                    })
                  }
                }))
            const a = new me(u => {
                ;(this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    u.next(this._stable), u.complete()
                  })
              }),
              l = new me(u => {
                let c
                this._zone.runOutsideAngular(() => {
                  c = this._zone.onStable.subscribe(() => {
                    pe.assertNotInAngularZone(),
                      Qd(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), u.next(!0))
                      })
                  })
                })
                const d = this._zone.onUnstable.subscribe(() => {
                  pe.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        u.next(!1)
                      }))
                })
                return () => {
                  c.unsubscribe(), d.unsubscribe()
                }
              })
            this.isStable = (function v0 (...n) {
              const e = Cs(n),
                t = (function f0 (n, e) {
                  return 'number' == typeof xu(n) ? n.pop() : e
                })(n, 1 / 0),
                r = n
              return r.length
                ? 1 === r.length
                  ? Ht(r[0])
                  : bs(t)(Ze(r, e))
                : ft
            })(a, l.pipe(Vp()))
          }
          bootstrap (t, r) {
            if (!this._initStatus.done) throw new M(405, '')
            let i
            ;(i =
              t instanceof cv
                ? t
                : this._componentFactoryResolver.resolveComponentFactory(t)),
              this.componentTypes.push(i.componentType)
            const s = (function h1 (n) {
                return n.isBoundToModule
              })(i)
                ? void 0
                : this._injector.get(qn),
              a = i.create(rt.NULL, [], r || i.selector, s),
              l = a.location.nativeElement,
              u = a.injector.get(Xd, null),
              c = u && a.injector.get(eb)
            return (
              u && c && c.registerApplication(l, u),
              a.onDestroy(() => {
                this.detachView(a.hostView),
                  ef(this.components, a),
                  c && c.unregisterApplication(l)
              }),
              this._loadComponent(a),
              a
            )
          }
          tick () {
            if (this._runningTick) throw new M(101, '')
            try {
              this._runningTick = !0
              for (let t of this._views) t.detectChanges()
            } catch (t) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(t)
              )
            } finally {
              this._runningTick = !1
            }
          }
          attachView (t) {
            const r = t
            this._views.push(r), r.attachToAppRef(this)
          }
          detachView (t) {
            const r = t
            ef(this._views, r), r.detachFromAppRef()
          }
          _loadComponent (t) {
            this.attachView(t.hostView),
              this.tick(),
              this.components.push(t),
              this._injector
                .get(Qv, [])
                .concat(this._bootstrapListeners)
                .forEach(i => i(t))
          }
          ngOnDestroy () {
            this._views.slice().forEach(t => t.destroy()),
              this._onMicrotaskEmptySubscription.unsubscribe()
          }
          get viewCount () {
            return this._views.length
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(pe), C(rt), C(Si), C(Ki), C(Xi))
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        )
      })()
      function ef (n, e) {
        const t = n.indexOf(e)
        t > -1 && n.splice(t, 1)
      }
      let lb = !0,
        Ji = (() => {
          class n {}
          return (n.__NG_ELEMENT_ID__ = b1), n
        })()
      function b1 (n) {
        return (function C1 (n, e, t) {
          if (ia(n) && !t) {
            const r = It(n.index, e)
            return new so(r, r)
          }
          return 47 & n.type ? new so(e[16], e) : null
        })(Ge(), b(), 16 == (16 & n))
      }
      class hb {
        constructor () {}
        supports (e) {
          return Qs(e)
        }
        create (e) {
          return new A1(e)
        }
      }
      const M1 = (n, e) => e
      class A1 {
        constructor (e) {
          ;(this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = e || M1)
        }
        forEachItem (e) {
          let t
          for (t = this._itHead; null !== t; t = t._next) e(t)
        }
        forEachOperation (e) {
          let t = this._itHead,
            r = this._removalsHead,
            i = 0,
            s = null
          for (; t || r; ) {
            const o = !r || (t && t.currentIndex < gb(r, i, s)) ? t : r,
              a = gb(o, i, s),
              l = o.currentIndex
            if (o === r) i--, (r = r._nextRemoved)
            else if (((t = t._next), null == o.previousIndex)) i++
            else {
              s || (s = [])
              const u = a - i,
                c = l - i
              if (u != c) {
                for (let f = 0; f < u; f++) {
                  const h = f < s.length ? s[f] : (s[f] = 0),
                    p = h + f
                  c <= p && p < u && (s[f] = h + 1)
                }
                s[o.previousIndex] = c - u
              }
            }
            a !== l && e(o, a, l)
          }
        }
        forEachPreviousItem (e) {
          let t
          for (t = this._previousItHead; null !== t; t = t._nextPrevious) e(t)
        }
        forEachAddedItem (e) {
          let t
          for (t = this._additionsHead; null !== t; t = t._nextAdded) e(t)
        }
        forEachMovedItem (e) {
          let t
          for (t = this._movesHead; null !== t; t = t._nextMoved) e(t)
        }
        forEachRemovedItem (e) {
          let t
          for (t = this._removalsHead; null !== t; t = t._nextRemoved) e(t)
        }
        forEachIdentityChange (e) {
          let t
          for (
            t = this._identityChangesHead;
            null !== t;
            t = t._nextIdentityChange
          )
            e(t)
        }
        diff (e) {
          if ((null == e && (e = []), !Qs(e))) throw new M(900, '')
          return this.check(e) ? this : null
        }
        onDestroy () {}
        check (e) {
          this._reset()
          let i,
            s,
            o,
            t = this._itHead,
            r = !1
          if (Array.isArray(e)) {
            this.length = e.length
            for (let a = 0; a < this.length; a++)
              (s = e[a]),
                (o = this._trackByFn(a, s)),
                null !== t && Object.is(t.trackById, o)
                  ? (r && (t = this._verifyReinsertion(t, s, o, a)),
                    Object.is(t.item, s) || this._addIdentityChange(t, s))
                  : ((t = this._mismatch(t, s, o, a)), (r = !0)),
                (t = t._next)
          } else
            (i = 0),
              (function NT (n, e) {
                if (Array.isArray(n)) for (let t = 0; t < n.length; t++) e(n[t])
                else {
                  const t = n[Oi()]()
                  let r
                  for (; !(r = t.next()).done; ) e(r.value)
                }
              })(e, a => {
                ;(o = this._trackByFn(i, a)),
                  null !== t && Object.is(t.trackById, o)
                    ? (r && (t = this._verifyReinsertion(t, a, o, i)),
                      Object.is(t.item, a) || this._addIdentityChange(t, a))
                    : ((t = this._mismatch(t, a, o, i)), (r = !0)),
                  (t = t._next),
                  i++
              }),
              (this.length = i)
          return this._truncate(t), (this.collection = e), this.isDirty
        }
        get isDirty () {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          )
        }
        _reset () {
          if (this.isDirty) {
            let e
            for (
              e = this._previousItHead = this._itHead;
              null !== e;
              e = e._next
            )
              e._nextPrevious = e._next
            for (e = this._additionsHead; null !== e; e = e._nextAdded)
              e.previousIndex = e.currentIndex
            for (
              this._additionsHead = this._additionsTail = null,
                e = this._movesHead;
              null !== e;
              e = e._nextMoved
            )
              e.previousIndex = e.currentIndex
            ;(this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null)
          }
        }
        _mismatch (e, t, r, i) {
          let s
          return (
            null === e ? (s = this._itTail) : ((s = e._prev), this._remove(e)),
            null !==
            (e =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(e.item, t) || this._addIdentityChange(e, t),
                this._reinsertAfter(e, s, i))
              : null !==
                (e =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, i))
              ? (Object.is(e.item, t) || this._addIdentityChange(e, t),
                this._moveAfter(e, s, i))
              : (e = this._addAfter(new T1(t, r), s, i)),
            e
          )
        }
        _verifyReinsertion (e, t, r, i) {
          let s =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null)
          return (
            null !== s
              ? (e = this._reinsertAfter(s, e._prev, i))
              : e.currentIndex != i &&
                ((e.currentIndex = i), this._addToMoves(e, i)),
            e
          )
        }
        _truncate (e) {
          for (; null !== e; ) {
            const t = e._next
            this._addToRemovals(this._unlink(e)), (e = t)
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null)
        }
        _reinsertAfter (e, t, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(e)
          const i = e._prevRemoved,
            s = e._nextRemoved
          return (
            null === i ? (this._removalsHead = s) : (i._nextRemoved = s),
            null === s ? (this._removalsTail = i) : (s._prevRemoved = i),
            this._insertAfter(e, t, r),
            this._addToMoves(e, r),
            e
          )
        }
        _moveAfter (e, t, r) {
          return (
            this._unlink(e),
            this._insertAfter(e, t, r),
            this._addToMoves(e, r),
            e
          )
        }
        _addAfter (e, t, r) {
          return (
            this._insertAfter(e, t, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = e)
                : (this._additionsTail._nextAdded = e)),
            e
          )
        }
        _insertAfter (e, t, r) {
          const i = null === t ? this._itHead : t._next
          return (
            (e._next = i),
            (e._prev = t),
            null === i ? (this._itTail = e) : (i._prev = e),
            null === t ? (this._itHead = e) : (t._next = e),
            null === this._linkedRecords && (this._linkedRecords = new pb()),
            this._linkedRecords.put(e),
            (e.currentIndex = r),
            e
          )
        }
        _remove (e) {
          return this._addToRemovals(this._unlink(e))
        }
        _unlink (e) {
          null !== this._linkedRecords && this._linkedRecords.remove(e)
          const t = e._prev,
            r = e._next
          return (
            null === t ? (this._itHead = r) : (t._next = r),
            null === r ? (this._itTail = t) : (r._prev = t),
            e
          )
        }
        _addToMoves (e, t) {
          return (
            e.previousIndex === t ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = e)
                  : (this._movesTail._nextMoved = e)),
            e
          )
        }
        _addToRemovals (e) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new pb()),
            this._unlinkedRecords.put(e),
            (e.currentIndex = null),
            (e._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = e),
                (e._prevRemoved = null))
              : ((e._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = e)),
            e
          )
        }
        _addIdentityChange (e, t) {
          return (
            (e.item = t),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = e)
                : (this._identityChangesTail._nextIdentityChange = e)),
            e
          )
        }
      }
      class T1 {
        constructor (e, t) {
          ;(this.item = e),
            (this.trackById = t),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null)
        }
      }
      class I1 {
        constructor () {
          ;(this._head = null), (this._tail = null)
        }
        add (e) {
          null === this._head
            ? ((this._head = this._tail = e),
              (e._nextDup = null),
              (e._prevDup = null))
            : ((this._tail._nextDup = e),
              (e._prevDup = this._tail),
              (e._nextDup = null),
              (this._tail = e))
        }
        get (e, t) {
          let r
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === t || t <= r.currentIndex) &&
              Object.is(r.trackById, e)
            )
              return r
          return null
        }
        remove (e) {
          const t = e._prevDup,
            r = e._nextDup
          return (
            null === t ? (this._head = r) : (t._nextDup = r),
            null === r ? (this._tail = t) : (r._prevDup = t),
            null === this._head
          )
        }
      }
      class pb {
        constructor () {
          this.map = new Map()
        }
        put (e) {
          const t = e.trackById
          let r = this.map.get(t)
          r || ((r = new I1()), this.map.set(t, r)), r.add(e)
        }
        get (e, t) {
          const i = this.map.get(e)
          return i ? i.get(e, t) : null
        }
        remove (e) {
          const t = e.trackById
          return this.map.get(t).remove(e) && this.map.delete(t), e
        }
        get isEmpty () {
          return 0 === this.map.size
        }
        clear () {
          this.map.clear()
        }
      }
      function gb (n, e, t) {
        const r = n.previousIndex
        if (null === r) return r
        let i = 0
        return t && r < t.length && (i = t[r]), r + e + i
      }
      class mb {
        constructor () {}
        supports (e) {
          return e instanceof Map || hd(e)
        }
        create () {
          return new x1()
        }
      }
      class x1 {
        constructor () {
          ;(this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null)
        }
        get isDirty () {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          )
        }
        forEachItem (e) {
          let t
          for (t = this._mapHead; null !== t; t = t._next) e(t)
        }
        forEachPreviousItem (e) {
          let t
          for (t = this._previousMapHead; null !== t; t = t._nextPrevious) e(t)
        }
        forEachChangedItem (e) {
          let t
          for (t = this._changesHead; null !== t; t = t._nextChanged) e(t)
        }
        forEachAddedItem (e) {
          let t
          for (t = this._additionsHead; null !== t; t = t._nextAdded) e(t)
        }
        forEachRemovedItem (e) {
          let t
          for (t = this._removalsHead; null !== t; t = t._nextRemoved) e(t)
        }
        diff (e) {
          if (e) {
            if (!(e instanceof Map || hd(e))) throw new M(900, '')
          } else e = new Map()
          return this.check(e) ? this : null
        }
        onDestroy () {}
        check (e) {
          this._reset()
          let t = this._mapHead
          if (
            ((this._appendAfter = null),
            this._forEach(e, (r, i) => {
              if (t && t.key === i)
                this._maybeAddToChanges(t, r),
                  (this._appendAfter = t),
                  (t = t._next)
              else {
                const s = this._getOrCreateRecordForKey(i, r)
                t = this._insertBeforeOrAppend(t, s)
              }
            }),
            t)
          ) {
            t._prev && (t._prev._next = null), (this._removalsHead = t)
            for (let r = t; null !== r; r = r._nextRemoved)
              r === this._mapHead && (this._mapHead = null),
                this._records.delete(r.key),
                (r._nextRemoved = r._next),
                (r.previousValue = r.currentValue),
                (r.currentValue = null),
                (r._prev = null),
                (r._next = null)
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          )
        }
        _insertBeforeOrAppend (e, t) {
          if (e) {
            const r = e._prev
            return (
              (t._next = e),
              (t._prev = r),
              (e._prev = t),
              r && (r._next = t),
              e === this._mapHead && (this._mapHead = t),
              (this._appendAfter = e),
              e
            )
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = t), (t._prev = this._appendAfter))
              : (this._mapHead = t),
            (this._appendAfter = t),
            null
          )
        }
        _getOrCreateRecordForKey (e, t) {
          if (this._records.has(e)) {
            const i = this._records.get(e)
            this._maybeAddToChanges(i, t)
            const s = i._prev,
              o = i._next
            return (
              s && (s._next = o),
              o && (o._prev = s),
              (i._next = null),
              (i._prev = null),
              i
            )
          }
          const r = new k1(e)
          return (
            this._records.set(e, r),
            (r.currentValue = t),
            this._addToAdditions(r),
            r
          )
        }
        _reset () {
          if (this.isDirty) {
            let e
            for (
              this._previousMapHead = this._mapHead, e = this._previousMapHead;
              null !== e;
              e = e._next
            )
              e._nextPrevious = e._next
            for (e = this._changesHead; null !== e; e = e._nextChanged)
              e.previousValue = e.currentValue
            for (e = this._additionsHead; null != e; e = e._nextAdded)
              e.previousValue = e.currentValue
            ;(this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null)
          }
        }
        _maybeAddToChanges (e, t) {
          Object.is(t, e.currentValue) ||
            ((e.previousValue = e.currentValue),
            (e.currentValue = t),
            this._addToChanges(e))
        }
        _addToAdditions (e) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = e)
            : ((this._additionsTail._nextAdded = e), (this._additionsTail = e))
        }
        _addToChanges (e) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = e)
            : ((this._changesTail._nextChanged = e), (this._changesTail = e))
        }
        _forEach (e, t) {
          e instanceof Map
            ? e.forEach(t)
            : Object.keys(e).forEach(r => t(e[r], r))
        }
      }
      class k1 {
        constructor (e) {
          ;(this.key = e),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null)
        }
      }
      function yb () {
        return new ho([new hb()])
      }
      let ho = (() => {
        class n {
          constructor (t) {
            this.factories = t
          }
          static create (t, r) {
            if (null != r) {
              const i = r.factories.slice()
              t = t.concat(i)
            }
            return new n(t)
          }
          static extend (t) {
            return {
              provide: n,
              useFactory: r => n.create(t, r || yb()),
              deps: [[n, new Ci(), new bn()]]
            }
          }
          find (t) {
            const r = this.factories.find(i => i.supports(t))
            if (null != r) return r
            throw new M(901, '')
          }
        }
        return (n.ɵprov = R({ token: n, providedIn: 'root', factory: yb })), n
      })()
      function _b () {
        return new es([new mb()])
      }
      let es = (() => {
        class n {
          constructor (t) {
            this.factories = t
          }
          static create (t, r) {
            if (r) {
              const i = r.factories.slice()
              t = t.concat(i)
            }
            return new n(t)
          }
          static extend (t) {
            return {
              provide: n,
              useFactory: r => n.create(t, r || _b()),
              deps: [[n, new Ci(), new bn()]]
            }
          }
          find (t) {
            const r = this.factories.find(s => s.supports(t))
            if (r) return r
            throw new M(901, '')
          }
        }
        return (n.ɵprov = R({ token: n, providedIn: 'root', factory: _b })), n
      })()
      const R1 = [new mb()],
        F1 = new ho([new hb()]),
        N1 = new es(R1),
        P1 = rb(null, 'core', [
          { provide: co, useValue: 'unknown' },
          { provide: sb, deps: [rt] },
          { provide: eb, deps: [] },
          { provide: Zv, deps: [] }
        ]),
        U1 = [
          { provide: fo, useClass: fo, deps: [pe, rt, Si, Ki, Xi] },
          {
            provide: tk,
            deps: [pe],
            useFactory: function H1 (n) {
              let e = []
              return (
                n.onStable.subscribe(() => {
                  for (; e.length; ) e.pop()()
                }),
                function (t) {
                  e.push(t)
                }
              )
            }
          },
          { provide: Xi, useClass: Xi, deps: [[new bn(), tl]] },
          { provide: nl, useClass: nl, deps: [] },
          e1,
          {
            provide: ho,
            useFactory: function L1 () {
              return F1
            },
            deps: []
          },
          {
            provide: es,
            useFactory: function V1 () {
              return N1
            },
            deps: []
          },
          {
            provide: Zn,
            useFactory: function B1 (n) {
              return (
                n ||
                (function j1 () {
                  return (
                    ('undefined' != typeof $localize && $localize.locale) || $a
                  )
                })()
              )
            },
            deps: [[new Vs(Zn), new bn(), new Ci()]]
          },
          { provide: Yv, useValue: 'USD' }
        ]
      let $1 = (() => {
          class n {
            constructor (t) {}
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(C(fo))
            }),
            (n.ɵmod = Ye({ type: n })),
            (n.ɵinj = ze({ providers: U1 })),
            n
          )
        })(),
        sl = null
      function In () {
        return sl
      }
      const Se = new x('DocumentToken')
      let Hr = (() => {
        class n {
          historyGo (t) {
            throw new Error('Not implemented')
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)()
          }),
          (n.ɵprov = R({
            token: n,
            factory: function () {
              return (function W1 () {
                return C(vb)
              })()
            },
            providedIn: 'platform'
          })),
          n
        )
      })()
      const K1 = new x('Location Initialized')
      let vb = (() => {
        class n extends Hr {
          constructor (t) {
            super(), (this._doc = t), this._init()
          }
          _init () {
            ;(this.location = window.location), (this._history = window.history)
          }
          getBaseHrefFromDOM () {
            return In().getBaseHref(this._doc)
          }
          onPopState (t) {
            const r = In().getGlobalEventTarget(this._doc, 'window')
            return (
              r.addEventListener('popstate', t, !1),
              () => r.removeEventListener('popstate', t)
            )
          }
          onHashChange (t) {
            const r = In().getGlobalEventTarget(this._doc, 'window')
            return (
              r.addEventListener('hashchange', t, !1),
              () => r.removeEventListener('hashchange', t)
            )
          }
          get href () {
            return this.location.href
          }
          get protocol () {
            return this.location.protocol
          }
          get hostname () {
            return this.location.hostname
          }
          get port () {
            return this.location.port
          }
          get pathname () {
            return this.location.pathname
          }
          get search () {
            return this.location.search
          }
          get hash () {
            return this.location.hash
          }
          set pathname (t) {
            this.location.pathname = t
          }
          pushState (t, r, i) {
            bb() ? this._history.pushState(t, r, i) : (this.location.hash = i)
          }
          replaceState (t, r, i) {
            bb()
              ? this._history.replaceState(t, r, i)
              : (this.location.hash = i)
          }
          forward () {
            this._history.forward()
          }
          back () {
            this._history.back()
          }
          historyGo (t = 0) {
            this._history.go(t)
          }
          getState () {
            return this._history.state
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(Se))
          }),
          (n.ɵprov = R({
            token: n,
            factory: function () {
              return (function Q1 () {
                return new vb(C(Se))
              })()
            },
            providedIn: 'platform'
          })),
          n
        )
      })()
      function bb () {
        return !!window.history.pushState
      }
      function af (n, e) {
        if (0 == n.length) return e
        if (0 == e.length) return n
        let t = 0
        return (
          n.endsWith('/') && t++,
          e.startsWith('/') && t++,
          2 == t ? n + e.substring(1) : 1 == t ? n + e : n + '/' + e
        )
      }
      function Cb (n) {
        const e = n.match(/#|\?|$/),
          t = (e && e.index) || n.length
        return n.slice(0, t - ('/' === n[t - 1] ? 1 : 0)) + n.slice(t)
      }
      function Yn (n) {
        return n && '?' !== n[0] ? '?' + n : n
      }
      let ts = (() => {
        class n {
          historyGo (t) {
            throw new Error('Not implemented')
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)()
          }),
          (n.ɵprov = R({
            token: n,
            factory: function () {
              return (function Z1 (n) {
                const e = C(Se).location
                return new Db(C(Hr), (e && e.origin) || '')
              })()
            },
            providedIn: 'root'
          })),
          n
        )
      })()
      const lf = new x('appBaseHref')
      let Db = (() => {
          class n extends ts {
            constructor (t, r) {
              if (
                (super(),
                (this._platformLocation = t),
                (this._removeListenerFns = []),
                null == r && (r = this._platformLocation.getBaseHrefFromDOM()),
                null == r)
              )
                throw new Error(
                  'No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document.'
                )
              this._baseHref = r
            }
            ngOnDestroy () {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()()
            }
            onPopState (t) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t)
              )
            }
            getBaseHref () {
              return this._baseHref
            }
            prepareExternalUrl (t) {
              return af(this._baseHref, t)
            }
            path (t = !1) {
              const r =
                  this._platformLocation.pathname +
                  Yn(this._platformLocation.search),
                i = this._platformLocation.hash
              return i && t ? `${r}${i}` : r
            }
            pushState (t, r, i, s) {
              const o = this.prepareExternalUrl(i + Yn(s))
              this._platformLocation.pushState(t, r, o)
            }
            replaceState (t, r, i, s) {
              const o = this.prepareExternalUrl(i + Yn(s))
              this._platformLocation.replaceState(t, r, o)
            }
            forward () {
              this._platformLocation.forward()
            }
            back () {
              this._platformLocation.back()
            }
            historyGo (t = 0) {
              var r, i
              null === (i = (r = this._platformLocation).historyGo) ||
                void 0 === i ||
                i.call(r, t)
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(C(Hr), C(lf, 8))
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          )
        })(),
        Y1 = (() => {
          class n extends ts {
            constructor (t, r) {
              super(),
                (this._platformLocation = t),
                (this._baseHref = ''),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r)
            }
            ngOnDestroy () {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()()
            }
            onPopState (t) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t)
              )
            }
            getBaseHref () {
              return this._baseHref
            }
            path (t = !1) {
              let r = this._platformLocation.hash
              return null == r && (r = '#'), r.length > 0 ? r.substring(1) : r
            }
            prepareExternalUrl (t) {
              const r = af(this._baseHref, t)
              return r.length > 0 ? '#' + r : r
            }
            pushState (t, r, i, s) {
              let o = this.prepareExternalUrl(i + Yn(s))
              0 == o.length && (o = this._platformLocation.pathname),
                this._platformLocation.pushState(t, r, o)
            }
            replaceState (t, r, i, s) {
              let o = this.prepareExternalUrl(i + Yn(s))
              0 == o.length && (o = this._platformLocation.pathname),
                this._platformLocation.replaceState(t, r, o)
            }
            forward () {
              this._platformLocation.forward()
            }
            back () {
              this._platformLocation.back()
            }
            historyGo (t = 0) {
              var r, i
              null === (i = (r = this._platformLocation).historyGo) ||
                void 0 === i ||
                i.call(r, t)
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(C(Hr), C(lf, 8))
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          )
        })(),
        uf = (() => {
          class n {
            constructor (t, r) {
              ;(this._subject = new Fe()),
                (this._urlChangeListeners = []),
                (this._platformStrategy = t)
              const i = this._platformStrategy.getBaseHref()
              ;(this._platformLocation = r),
                (this._baseHref = Cb(Eb(i))),
                this._platformStrategy.onPopState(s => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: s.state,
                    type: s.type
                  })
                })
            }
            path (t = !1) {
              return this.normalize(this._platformStrategy.path(t))
            }
            getState () {
              return this._platformLocation.getState()
            }
            isCurrentPathEqualTo (t, r = '') {
              return this.path() == this.normalize(t + Yn(r))
            }
            normalize (t) {
              return n.stripTrailingSlash(
                (function J1 (n, e) {
                  return n && e.startsWith(n) ? e.substring(n.length) : e
                })(this._baseHref, Eb(t))
              )
            }
            prepareExternalUrl (t) {
              return (
                t && '/' !== t[0] && (t = '/' + t),
                this._platformStrategy.prepareExternalUrl(t)
              )
            }
            go (t, r = '', i = null) {
              this._platformStrategy.pushState(i, '', t, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + Yn(r)),
                  i
                )
            }
            replaceState (t, r = '', i = null) {
              this._platformStrategy.replaceState(i, '', t, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + Yn(r)),
                  i
                )
            }
            forward () {
              this._platformStrategy.forward()
            }
            back () {
              this._platformStrategy.back()
            }
            historyGo (t = 0) {
              var r, i
              null === (i = (r = this._platformStrategy).historyGo) ||
                void 0 === i ||
                i.call(r, t)
            }
            onUrlChange (t) {
              this._urlChangeListeners.push(t),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe(r => {
                    this._notifyUrlChangeListeners(r.url, r.state)
                  }))
            }
            _notifyUrlChangeListeners (t = '', r) {
              this._urlChangeListeners.forEach(i => i(t, r))
            }
            subscribe (t, r, i) {
              return this._subject.subscribe({ next: t, error: r, complete: i })
            }
          }
          return (
            (n.normalizeQueryParams = Yn),
            (n.joinWithSlash = af),
            (n.stripTrailingSlash = Cb),
            (n.ɵfac = function (t) {
              return new (t || n)(C(ts), C(Hr))
            }),
            (n.ɵprov = R({
              token: n,
              factory: function () {
                return (function X1 () {
                  return new uf(C(ts), C(Hr))
                })()
              },
              providedIn: 'root'
            })),
            n
          )
        })()
      function Eb (n) {
        return n.replace(/\/index.html$/, '')
      }
      var je = (() => (
        ((je = je || {})[(je.Zero = 0)] = 'Zero'),
        (je[(je.One = 1)] = 'One'),
        (je[(je.Two = 2)] = 'Two'),
        (je[(je.Few = 3)] = 'Few'),
        (je[(je.Many = 4)] = 'Many'),
        (je[(je.Other = 5)] = 'Other'),
        je
      ))()
      const oR = function L_ (n) {
        return (function yt (n) {
          const e = (function GI (n) {
            return n.toLowerCase().replace(/_/g, '-')
          })(n)
          let t = V_(e)
          if (t) return t
          const r = e.split('-')[0]
          if (((t = V_(r)), t)) return t
          if ('en' === r) return zI
          throw new Error(`Missing locale data for the locale "${n}".`)
        })(n)[w.PluralCase]
      }
      class gl {}
      let NR = (() => {
        class n extends gl {
          constructor (t) {
            super(), (this.locale = t)
          }
          getPluralCategory (t, r) {
            switch (oR(r || this.locale)(t)) {
              case je.Zero:
                return 'zero'
              case je.One:
                return 'one'
              case je.Two:
                return 'two'
              case je.Few:
                return 'few'
              case je.Many:
                return 'many'
              default:
                return 'other'
            }
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(Zn))
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        )
      })()
      function Rb (n, e) {
        e = encodeURIComponent(e)
        for (const t of n.split(';')) {
          const r = t.indexOf('='),
            [i, s] = -1 == r ? [t, ''] : [t.slice(0, r), t.slice(r + 1)]
          if (i.trim() === e) return decodeURIComponent(s)
        }
        return null
      }
      let Ob = (() => {
        class n {
          constructor (t, r, i, s) {
            ;(this._iterableDiffers = t),
              (this._keyValueDiffers = r),
              (this._ngEl = i),
              (this._renderer = s),
              (this._iterableDiffer = null),
              (this._keyValueDiffer = null),
              (this._initialClasses = []),
              (this._rawClass = null)
          }
          set klass (t) {
            this._removeClasses(this._initialClasses),
              (this._initialClasses =
                'string' == typeof t ? t.split(/\s+/) : []),
              this._applyClasses(this._initialClasses),
              this._applyClasses(this._rawClass)
          }
          set ngClass (t) {
            this._removeClasses(this._rawClass),
              this._applyClasses(this._initialClasses),
              (this._iterableDiffer = null),
              (this._keyValueDiffer = null),
              (this._rawClass = 'string' == typeof t ? t.split(/\s+/) : t),
              this._rawClass &&
                (Qs(this._rawClass)
                  ? (this._iterableDiffer = this._iterableDiffers
                      .find(this._rawClass)
                      .create())
                  : (this._keyValueDiffer = this._keyValueDiffers
                      .find(this._rawClass)
                      .create()))
          }
          ngDoCheck () {
            if (this._iterableDiffer) {
              const t = this._iterableDiffer.diff(this._rawClass)
              t && this._applyIterableChanges(t)
            } else if (this._keyValueDiffer) {
              const t = this._keyValueDiffer.diff(this._rawClass)
              t && this._applyKeyValueChanges(t)
            }
          }
          _applyKeyValueChanges (t) {
            t.forEachAddedItem(r => this._toggleClass(r.key, r.currentValue)),
              t.forEachChangedItem(r =>
                this._toggleClass(r.key, r.currentValue)
              ),
              t.forEachRemovedItem(r => {
                r.previousValue && this._toggleClass(r.key, !1)
              })
          }
          _applyIterableChanges (t) {
            t.forEachAddedItem(r => {
              if ('string' != typeof r.item)
                throw new Error(
                  `NgClass can only toggle CSS classes expressed as strings, got ${ae(
                    r.item
                  )}`
                )
              this._toggleClass(r.item, !0)
            }),
              t.forEachRemovedItem(r => this._toggleClass(r.item, !1))
          }
          _applyClasses (t) {
            t &&
              (Array.isArray(t) || t instanceof Set
                ? t.forEach(r => this._toggleClass(r, !0))
                : Object.keys(t).forEach(r => this._toggleClass(r, !!t[r])))
          }
          _removeClasses (t) {
            t &&
              (Array.isArray(t) || t instanceof Set
                ? t.forEach(r => this._toggleClass(r, !1))
                : Object.keys(t).forEach(r => this._toggleClass(r, !1)))
          }
          _toggleClass (t, r) {
            ;(t = t.trim()) &&
              t.split(/\s+/g).forEach(i => {
                r
                  ? this._renderer.addClass(this._ngEl.nativeElement, i)
                  : this._renderer.removeClass(this._ngEl.nativeElement, i)
              })
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(y(ho), y(es), y(et), y(Gn))
          }),
          (n.ɵdir = N({
            type: n,
            selectors: [['', 'ngClass', '']],
            inputs: { klass: ['class', 'klass'], ngClass: 'ngClass' }
          })),
          n
        )
      })()
      class LR {
        constructor (e, t, r, i) {
          ;(this.$implicit = e),
            (this.ngForOf = t),
            (this.index = r),
            (this.count = i)
        }
        get first () {
          return 0 === this.index
        }
        get last () {
          return this.index === this.count - 1
        }
        get even () {
          return this.index % 2 == 0
        }
        get odd () {
          return !this.even
        }
      }
      let Fb = (() => {
        class n {
          constructor (t, r, i) {
            ;(this._viewContainer = t),
              (this._template = r),
              (this._differs = i),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null)
          }
          set ngForOf (t) {
            ;(this._ngForOf = t), (this._ngForOfDirty = !0)
          }
          set ngForTrackBy (t) {
            this._trackByFn = t
          }
          get ngForTrackBy () {
            return this._trackByFn
          }
          set ngForTemplate (t) {
            t && (this._template = t)
          }
          ngDoCheck () {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1
              const t = this._ngForOf
              !this._differ &&
                t &&
                (this._differ = this._differs.find(t).create(this.ngForTrackBy))
            }
            if (this._differ) {
              const t = this._differ.diff(this._ngForOf)
              t && this._applyChanges(t)
            }
          }
          _applyChanges (t) {
            const r = this._viewContainer
            t.forEachOperation((i, s, o) => {
              if (null == i.previousIndex)
                r.createEmbeddedView(
                  this._template,
                  new LR(i.item, this._ngForOf, -1, -1),
                  null === o ? void 0 : o
                )
              else if (null == o) r.remove(null === s ? void 0 : s)
              else if (null !== s) {
                const a = r.get(s)
                r.move(a, o), Nb(a, i)
              }
            })
            for (let i = 0, s = r.length; i < s; i++) {
              const a = r.get(i).context
              ;(a.index = i), (a.count = s), (a.ngForOf = this._ngForOf)
            }
            t.forEachIdentityChange(i => {
              Nb(r.get(i.currentIndex), i)
            })
          }
          static ngTemplateContextGuard (t, r) {
            return !0
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(y(fn), y(Qn), y(ho))
          }),
          (n.ɵdir = N({
            type: n,
            selectors: [['', 'ngFor', '', 'ngForOf', '']],
            inputs: {
              ngForOf: 'ngForOf',
              ngForTrackBy: 'ngForTrackBy',
              ngForTemplate: 'ngForTemplate'
            }
          })),
          n
        )
      })()
      function Nb (n, e) {
        n.context.$implicit = e.item
      }
      let $r = (() => {
        class n {
          constructor (t, r) {
            ;(this._viewContainer = t),
              (this._context = new VR()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = r)
          }
          set ngIf (t) {
            ;(this._context.$implicit = this._context.ngIf = t),
              this._updateView()
          }
          set ngIfThen (t) {
            Pb('ngIfThen', t),
              (this._thenTemplateRef = t),
              (this._thenViewRef = null),
              this._updateView()
          }
          set ngIfElse (t) {
            Pb('ngIfElse', t),
              (this._elseTemplateRef = t),
              (this._elseViewRef = null),
              this._updateView()
          }
          _updateView () {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )))
          }
          static ngTemplateContextGuard (t, r) {
            return !0
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(y(fn), y(Qn))
          }),
          (n.ɵdir = N({
            type: n,
            selectors: [['', 'ngIf', '']],
            inputs: { ngIf: 'ngIf', ngIfThen: 'ngIfThen', ngIfElse: 'ngIfElse' }
          })),
          n
        )
      })()
      class VR {
        constructor () {
          ;(this.$implicit = null), (this.ngIf = null)
        }
      }
      function Pb (n, e) {
        if (e && !e.createEmbeddedView)
          throw new Error(
            `${n} must be a TemplateRef, but received '${ae(e)}'.`
          )
      }
      class _f {
        constructor (e, t) {
          ;(this._viewContainerRef = e),
            (this._templateRef = t),
            (this._created = !1)
        }
        create () {
          ;(this._created = !0),
            this._viewContainerRef.createEmbeddedView(this._templateRef)
        }
        destroy () {
          ;(this._created = !1), this._viewContainerRef.clear()
        }
        enforceState (e) {
          e && !this._created
            ? this.create()
            : !e && this._created && this.destroy()
        }
      }
      let mo = (() => {
          class n {
            constructor () {
              ;(this._defaultUsed = !1),
                (this._caseCount = 0),
                (this._lastCaseCheckIndex = 0),
                (this._lastCasesMatched = !1)
            }
            set ngSwitch (t) {
              ;(this._ngSwitch = t),
                0 === this._caseCount && this._updateDefaultCases(!0)
            }
            _addCase () {
              return this._caseCount++
            }
            _addDefault (t) {
              this._defaultViews || (this._defaultViews = []),
                this._defaultViews.push(t)
            }
            _matchCase (t) {
              const r = t == this._ngSwitch
              return (
                (this._lastCasesMatched = this._lastCasesMatched || r),
                this._lastCaseCheckIndex++,
                this._lastCaseCheckIndex === this._caseCount &&
                  (this._updateDefaultCases(!this._lastCasesMatched),
                  (this._lastCaseCheckIndex = 0),
                  (this._lastCasesMatched = !1)),
                r
              )
            }
            _updateDefaultCases (t) {
              if (this._defaultViews && t !== this._defaultUsed) {
                this._defaultUsed = t
                for (let r = 0; r < this._defaultViews.length; r++)
                  this._defaultViews[r].enforceState(t)
              }
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)()
            }),
            (n.ɵdir = N({
              type: n,
              selectors: [['', 'ngSwitch', '']],
              inputs: { ngSwitch: 'ngSwitch' }
            })),
            n
          )
        })(),
        vf = (() => {
          class n {
            constructor (t, r, i) {
              ;(this.ngSwitch = i), i._addCase(), (this._view = new _f(t, r))
            }
            ngDoCheck () {
              this._view.enforceState(
                this.ngSwitch._matchCase(this.ngSwitchCase)
              )
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(y(fn), y(Qn), y(mo, 9))
            }),
            (n.ɵdir = N({
              type: n,
              selectors: [['', 'ngSwitchCase', '']],
              inputs: { ngSwitchCase: 'ngSwitchCase' }
            })),
            n
          )
        })()
      function gn (n, e) {
        return new M(2100, '')
      }
      class $R {
        createSubscription (e, t) {
          return e.subscribe({
            next: t,
            error: r => {
              throw r
            }
          })
        }
        dispose (e) {
          e.unsubscribe()
        }
        onDestroy (e) {
          e.unsubscribe()
        }
      }
      class zR {
        createSubscription (e, t) {
          return e.then(t, r => {
            throw r
          })
        }
        dispose (e) {}
        onDestroy (e) {}
      }
      const GR = new zR(),
        qR = new $R()
      let ml = (() => {
          class n {
            constructor (t) {
              ;(this._ref = t),
                (this._latestValue = null),
                (this._subscription = null),
                (this._obj = null),
                (this._strategy = null)
            }
            ngOnDestroy () {
              this._subscription && this._dispose()
            }
            transform (t) {
              return this._obj
                ? t !== this._obj
                  ? (this._dispose(), this.transform(t))
                  : this._latestValue
                : (t && this._subscribe(t), this._latestValue)
            }
            _subscribe (t) {
              ;(this._obj = t),
                (this._strategy = this._selectStrategy(t)),
                (this._subscription = this._strategy.createSubscription(t, r =>
                  this._updateLatestValue(t, r)
                ))
            }
            _selectStrategy (t) {
              if (Ys(t)) return GR
              if (zy(t)) return qR
              throw gn()
            }
            _dispose () {
              this._strategy.dispose(this._subscription),
                (this._latestValue = null),
                (this._subscription = null),
                (this._obj = null)
            }
            _updateLatestValue (t, r) {
              t === this._obj &&
                ((this._latestValue = r), this._ref.markForCheck())
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(y(Ji, 16))
            }),
            (n.ɵpipe = Dt({ name: 'async', type: n, pure: !1 })),
            n
          )
        })(),
        Vb = (() => {
          class n {
            transform (t) {
              if (null == t) return null
              if ('string' != typeof t) throw gn()
              return t.toUpperCase()
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)()
            }),
            (n.ɵpipe = Dt({ name: 'uppercase', type: n, pure: !0 })),
            n
          )
        })(),
        jb = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)()
            }),
            (n.ɵmod = Ye({ type: n })),
            (n.ɵinj = ze({ providers: [{ provide: gl, useClass: NR }] })),
            n
          )
        })()
      const Ub = 'browser'
      let fO = (() => {
        class n {}
        return (
          (n.ɵprov = R({
            token: n,
            providedIn: 'root',
            factory: () => new hO(C(Se), window)
          })),
          n
        )
      })()
      class hO {
        constructor (e, t) {
          ;(this.document = e), (this.window = t), (this.offset = () => [0, 0])
        }
        setOffset (e) {
          this.offset = Array.isArray(e) ? () => e : e
        }
        getScrollPosition () {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0]
        }
        scrollToPosition (e) {
          this.supportsScrolling() && this.window.scrollTo(e[0], e[1])
        }
        scrollToAnchor (e) {
          if (!this.supportsScrolling()) return
          const t = (function pO (n, e) {
            const t = n.getElementById(e) || n.getElementsByName(e)[0]
            if (t) return t
            if (
              'function' == typeof n.createTreeWalker &&
              n.body &&
              (n.body.createShadowRoot || n.body.attachShadow)
            ) {
              const r = n.createTreeWalker(n.body, NodeFilter.SHOW_ELEMENT)
              let i = r.currentNode
              for (; i; ) {
                const s = i.shadowRoot
                if (s) {
                  const o =
                    s.getElementById(e) || s.querySelector(`[name="${e}"]`)
                  if (o) return o
                }
                i = r.nextNode()
              }
            }
            return null
          })(this.document, e)
          t && (this.scrollToElement(t), t.focus())
        }
        setHistoryScrollRestoration (e) {
          if (this.supportScrollRestoration()) {
            const t = this.window.history
            t && t.scrollRestoration && (t.scrollRestoration = e)
          }
        }
        scrollToElement (e) {
          const t = e.getBoundingClientRect(),
            r = t.left + this.window.pageXOffset,
            i = t.top + this.window.pageYOffset,
            s = this.offset()
          this.window.scrollTo(r - s[0], i - s[1])
        }
        supportScrollRestoration () {
          try {
            if (!this.supportsScrolling()) return !1
            const e =
              Hb(this.window.history) ||
              Hb(Object.getPrototypeOf(this.window.history))
            return !(!e || (!e.writable && !e.set))
          } catch (e) {
            return !1
          }
        }
        supportsScrolling () {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              'pageXOffset' in this.window
            )
          } catch (e) {
            return !1
          }
        }
      }
      function Hb (n) {
        return Object.getOwnPropertyDescriptor(n, 'scrollRestoration')
      }
      class $b {}
      class Df extends class gO extends class q1 {} {
        constructor () {
          super(...arguments), (this.supportsDOMEvents = !0)
        }
      } {
        static makeCurrent () {
          !(function G1 (n) {
            sl || (sl = n)
          })(new Df())
        }
        onAndCancel (e, t, r) {
          return (
            e.addEventListener(t, r, !1),
            () => {
              e.removeEventListener(t, r, !1)
            }
          )
        }
        dispatchEvent (e, t) {
          e.dispatchEvent(t)
        }
        remove (e) {
          e.parentNode && e.parentNode.removeChild(e)
        }
        createElement (e, t) {
          return (t = t || this.getDefaultDocument()).createElement(e)
        }
        createHtmlDocument () {
          return document.implementation.createHTMLDocument('fakeTitle')
        }
        getDefaultDocument () {
          return document
        }
        isElementNode (e) {
          return e.nodeType === Node.ELEMENT_NODE
        }
        isShadowRoot (e) {
          return e instanceof DocumentFragment
        }
        getGlobalEventTarget (e, t) {
          return 'window' === t
            ? window
            : 'document' === t
            ? e
            : 'body' === t
            ? e.body
            : null
        }
        getBaseHref (e) {
          const t = (function mO () {
            return (
              (yo = yo || document.querySelector('base')),
              yo ? yo.getAttribute('href') : null
            )
          })()
          return null == t
            ? null
            : (function yO (n) {
                ;(yl = yl || document.createElement('a')),
                  yl.setAttribute('href', n)
                const e = yl.pathname
                return '/' === e.charAt(0) ? e : `/${e}`
              })(t)
        }
        resetBaseElement () {
          yo = null
        }
        getUserAgent () {
          return window.navigator.userAgent
        }
        getCookie (e) {
          return Rb(document.cookie, e)
        }
      }
      let yl,
        yo = null
      const zb = new x('TRANSITION_ID'),
        vO = [
          {
            provide: tl,
            useFactory: function _O (n, e, t) {
              return () => {
                t.get(Xi).donePromise.then(() => {
                  const r = In(),
                    i = e.querySelectorAll(`style[ng-transition="${n}"]`)
                  for (let s = 0; s < i.length; s++) r.remove(i[s])
                })
              }
            },
            deps: [zb, Se, rt],
            multi: !0
          }
        ]
      class Ef {
        static init () {
          !(function d1 (n) {
            Jd = n
          })(new Ef())
        }
        addToWindow (e) {
          ;(ce.getAngularTestability = (r, i = !0) => {
            const s = e.findTestabilityInTree(r, i)
            if (null == s)
              throw new Error('Could not find testability for element.')
            return s
          }),
            (ce.getAllAngularTestabilities = () => e.getAllTestabilities()),
            (ce.getAllAngularRootElements = () => e.getAllRootElements()),
            ce.frameworkStabilizers || (ce.frameworkStabilizers = []),
            ce.frameworkStabilizers.push(r => {
              const i = ce.getAllAngularTestabilities()
              let s = i.length,
                o = !1
              const a = function (l) {
                ;(o = o || l), s--, 0 == s && r(o)
              }
              i.forEach(function (l) {
                l.whenStable(a)
              })
            })
        }
        findTestabilityInTree (e, t, r) {
          if (null == t) return null
          const i = e.getTestability(t)
          return null != i
            ? i
            : r
            ? In().isShadowRoot(t)
              ? this.findTestabilityInTree(e, t.host, !0)
              : this.findTestabilityInTree(e, t.parentElement, !0)
            : null
        }
      }
      let bO = (() => {
        class n {
          build () {
            return new XMLHttpRequest()
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)()
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        )
      })()
      const _l = new x('EventManagerPlugins')
      let vl = (() => {
        class n {
          constructor (t, r) {
            ;(this._zone = r),
              (this._eventNameToPlugin = new Map()),
              t.forEach(i => (i.manager = this)),
              (this._plugins = t.slice().reverse())
          }
          addEventListener (t, r, i) {
            return this._findPluginFor(r).addEventListener(t, r, i)
          }
          addGlobalEventListener (t, r, i) {
            return this._findPluginFor(r).addGlobalEventListener(t, r, i)
          }
          getZone () {
            return this._zone
          }
          _findPluginFor (t) {
            const r = this._eventNameToPlugin.get(t)
            if (r) return r
            const i = this._plugins
            for (let s = 0; s < i.length; s++) {
              const o = i[s]
              if (o.supports(t)) return this._eventNameToPlugin.set(t, o), o
            }
            throw new Error(`No event manager plugin found for event ${t}`)
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(_l), C(pe))
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        )
      })()
      class Gb {
        constructor (e) {
          this._doc = e
        }
        addGlobalEventListener (e, t, r) {
          const i = In().getGlobalEventTarget(this._doc, e)
          if (!i)
            throw new Error(`Unsupported event target ${i} for event ${t}`)
          return this.addEventListener(i, t, r)
        }
      }
      let qb = (() => {
          class n {
            constructor () {
              this._stylesSet = new Set()
            }
            addStyles (t) {
              const r = new Set()
              t.forEach(i => {
                this._stylesSet.has(i) || (this._stylesSet.add(i), r.add(i))
              }),
                this.onStylesAdded(r)
            }
            onStylesAdded (t) {}
            getAllStyles () {
              return Array.from(this._stylesSet)
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)()
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          )
        })(),
        _o = (() => {
          class n extends qb {
            constructor (t) {
              super(),
                (this._doc = t),
                (this._hostNodes = new Map()),
                this._hostNodes.set(t.head, [])
            }
            _addStylesToHost (t, r, i) {
              t.forEach(s => {
                const o = this._doc.createElement('style')
                ;(o.textContent = s), i.push(r.appendChild(o))
              })
            }
            addHost (t) {
              const r = []
              this._addStylesToHost(this._stylesSet, t, r),
                this._hostNodes.set(t, r)
            }
            removeHost (t) {
              const r = this._hostNodes.get(t)
              r && r.forEach(Wb), this._hostNodes.delete(t)
            }
            onStylesAdded (t) {
              this._hostNodes.forEach((r, i) => {
                this._addStylesToHost(t, i, r)
              })
            }
            ngOnDestroy () {
              this._hostNodes.forEach(t => t.forEach(Wb))
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(C(Se))
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          )
        })()
      function Wb (n) {
        In().remove(n)
      }
      const wf = {
          svg: 'http://www.w3.org/2000/svg',
          xhtml: 'http://www.w3.org/1999/xhtml',
          xlink: 'http://www.w3.org/1999/xlink',
          xml: 'http://www.w3.org/XML/1998/namespace',
          xmlns: 'http://www.w3.org/2000/xmlns/',
          math: 'http://www.w3.org/1998/MathML/'
        },
        Sf = /%COMP%/g
      function bl (n, e, t) {
        for (let r = 0; r < e.length; r++) {
          let i = e[r]
          Array.isArray(i) ? bl(n, i, t) : ((i = i.replace(Sf, n)), t.push(i))
        }
        return t
      }
      function Zb (n) {
        return e => {
          if ('__ngUnwrap__' === e) return n
          !1 === n(e) && (e.preventDefault(), (e.returnValue = !1))
        }
      }
      let Cl = (() => {
        class n {
          constructor (t, r, i) {
            ;(this.eventManager = t),
              (this.sharedStylesHost = r),
              (this.appId = i),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new Mf(t))
          }
          createRenderer (t, r) {
            if (!t || !r) return this.defaultRenderer
            switch (r.encapsulation) {
              case nn.Emulated: {
                let i = this.rendererByCompId.get(r.id)
                return (
                  i ||
                    ((i = new MO(
                      this.eventManager,
                      this.sharedStylesHost,
                      r,
                      this.appId
                    )),
                    this.rendererByCompId.set(r.id, i)),
                  i.applyToHost(t),
                  i
                )
              }
              case 1:
              case nn.ShadowDom:
                return new AO(this.eventManager, this.sharedStylesHost, t, r)
              default:
                if (!this.rendererByCompId.has(r.id)) {
                  const i = bl(r.id, r.styles, [])
                  this.sharedStylesHost.addStyles(i),
                    this.rendererByCompId.set(r.id, this.defaultRenderer)
                }
                return this.defaultRenderer
            }
          }
          begin () {}
          end () {}
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(vl), C(_o), C(uo))
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        )
      })()
      class Mf {
        constructor (e) {
          ;(this.eventManager = e),
            (this.data = Object.create(null)),
            (this.destroyNode = null)
        }
        destroy () {}
        createElement (e, t) {
          return t
            ? document.createElementNS(wf[t] || t, e)
            : document.createElement(e)
        }
        createComment (e) {
          return document.createComment(e)
        }
        createText (e) {
          return document.createTextNode(e)
        }
        appendChild (e, t) {
          e.appendChild(t)
        }
        insertBefore (e, t, r) {
          e && e.insertBefore(t, r)
        }
        removeChild (e, t) {
          e && e.removeChild(t)
        }
        selectRootElement (e, t) {
          let r = 'string' == typeof e ? document.querySelector(e) : e
          if (!r)
            throw new Error(`The selector "${e}" did not match any elements`)
          return t || (r.textContent = ''), r
        }
        parentNode (e) {
          return e.parentNode
        }
        nextSibling (e) {
          return e.nextSibling
        }
        setAttribute (e, t, r, i) {
          if (i) {
            t = i + ':' + t
            const s = wf[i]
            s ? e.setAttributeNS(s, t, r) : e.setAttribute(t, r)
          } else e.setAttribute(t, r)
        }
        removeAttribute (e, t, r) {
          if (r) {
            const i = wf[r]
            i ? e.removeAttributeNS(i, t) : e.removeAttribute(`${r}:${t}`)
          } else e.removeAttribute(t)
        }
        addClass (e, t) {
          e.classList.add(t)
        }
        removeClass (e, t) {
          e.classList.remove(t)
        }
        setStyle (e, t, r, i) {
          i & (Rt.DashCase | Rt.Important)
            ? e.style.setProperty(t, r, i & Rt.Important ? 'important' : '')
            : (e.style[t] = r)
        }
        removeStyle (e, t, r) {
          r & Rt.DashCase ? e.style.removeProperty(t) : (e.style[t] = '')
        }
        setProperty (e, t, r) {
          e[t] = r
        }
        setValue (e, t) {
          e.nodeValue = t
        }
        listen (e, t, r) {
          return 'string' == typeof e
            ? this.eventManager.addGlobalEventListener(e, t, Zb(r))
            : this.eventManager.addEventListener(e, t, Zb(r))
        }
      }
      class MO extends Mf {
        constructor (e, t, r, i) {
          super(e), (this.component = r)
          const s = bl(i + '-' + r.id, r.styles, [])
          t.addStyles(s),
            (this.contentAttr = (function EO (n) {
              return '_ngcontent-%COMP%'.replace(Sf, n)
            })(i + '-' + r.id)),
            (this.hostAttr = (function wO (n) {
              return '_nghost-%COMP%'.replace(Sf, n)
            })(i + '-' + r.id))
        }
        applyToHost (e) {
          super.setAttribute(e, this.hostAttr, '')
        }
        createElement (e, t) {
          const r = super.createElement(e, t)
          return super.setAttribute(r, this.contentAttr, ''), r
        }
      }
      class AO extends Mf {
        constructor (e, t, r, i) {
          super(e),
            (this.sharedStylesHost = t),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: 'open' })),
            this.sharedStylesHost.addHost(this.shadowRoot)
          const s = bl(i.id, i.styles, [])
          for (let o = 0; o < s.length; o++) {
            const a = document.createElement('style')
            ;(a.textContent = s[o]), this.shadowRoot.appendChild(a)
          }
        }
        nodeOrShadowRoot (e) {
          return e === this.hostEl ? this.shadowRoot : e
        }
        destroy () {
          this.sharedStylesHost.removeHost(this.shadowRoot)
        }
        appendChild (e, t) {
          return super.appendChild(this.nodeOrShadowRoot(e), t)
        }
        insertBefore (e, t, r) {
          return super.insertBefore(this.nodeOrShadowRoot(e), t, r)
        }
        removeChild (e, t) {
          return super.removeChild(this.nodeOrShadowRoot(e), t)
        }
        parentNode (e) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(e))
          )
        }
      }
      let TO = (() => {
        class n extends Gb {
          constructor (t) {
            super(t)
          }
          supports (t) {
            return !0
          }
          addEventListener (t, r, i) {
            return (
              t.addEventListener(r, i, !1),
              () => this.removeEventListener(t, r, i)
            )
          }
          removeEventListener (t, r, i) {
            return t.removeEventListener(r, i)
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(Se))
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        )
      })()
      const Xb = ['alt', 'control', 'meta', 'shift'],
        xO = {
          '\b': 'Backspace',
          '\t': 'Tab',
          '\x7f': 'Delete',
          '\x1b': 'Escape',
          Del: 'Delete',
          Esc: 'Escape',
          Left: 'ArrowLeft',
          Right: 'ArrowRight',
          Up: 'ArrowUp',
          Down: 'ArrowDown',
          Menu: 'ContextMenu',
          Scroll: 'ScrollLock',
          Win: 'OS'
        },
        Jb = {
          A: '1',
          B: '2',
          C: '3',
          D: '4',
          E: '5',
          F: '6',
          G: '7',
          H: '8',
          I: '9',
          J: '*',
          K: '+',
          M: '-',
          N: '.',
          O: '/',
          '`': '0',
          '\x90': 'NumLock'
        },
        kO = {
          alt: n => n.altKey,
          control: n => n.ctrlKey,
          meta: n => n.metaKey,
          shift: n => n.shiftKey
        }
      let RO = (() => {
        class n extends Gb {
          constructor (t) {
            super(t)
          }
          supports (t) {
            return null != n.parseEventName(t)
          }
          addEventListener (t, r, i) {
            const s = n.parseEventName(r),
              o = n.eventCallback(s.fullKey, i, this.manager.getZone())
            return this.manager
              .getZone()
              .runOutsideAngular(() => In().onAndCancel(t, s.domEventName, o))
          }
          static parseEventName (t) {
            const r = t.toLowerCase().split('.'),
              i = r.shift()
            if (0 === r.length || ('keydown' !== i && 'keyup' !== i))
              return null
            const s = n._normalizeKey(r.pop())
            let o = ''
            if (
              (Xb.forEach(l => {
                const u = r.indexOf(l)
                u > -1 && (r.splice(u, 1), (o += l + '.'))
              }),
              (o += s),
              0 != r.length || 0 === s.length)
            )
              return null
            const a = {}
            return (a.domEventName = i), (a.fullKey = o), a
          }
          static getEventFullKey (t) {
            let r = '',
              i = (function OO (n) {
                let e = n.key
                if (null == e) {
                  if (((e = n.keyIdentifier), null == e)) return 'Unidentified'
                  e.startsWith('U+') &&
                    ((e = String.fromCharCode(parseInt(e.substring(2), 16))),
                    3 === n.location && Jb.hasOwnProperty(e) && (e = Jb[e]))
                }
                return xO[e] || e
              })(t)
            return (
              (i = i.toLowerCase()),
              ' ' === i ? (i = 'space') : '.' === i && (i = 'dot'),
              Xb.forEach(s => {
                s != i && kO[s](t) && (r += s + '.')
              }),
              (r += i),
              r
            )
          }
          static eventCallback (t, r, i) {
            return s => {
              n.getEventFullKey(s) === t && i.runGuarded(() => r(s))
            }
          }
          static _normalizeKey (t) {
            return 'esc' === t ? 'escape' : t
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(Se))
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        )
      })()
      const LO = rb(P1, 'browser', [
          { provide: co, useValue: Ub },
          {
            provide: Kv,
            useValue: function FO () {
              Df.makeCurrent(), Ef.init()
            },
            multi: !0
          },
          {
            provide: Se,
            useFactory: function PO () {
              return (
                (function Q0 (n) {
                  Wu = n
                })(document),
                document
              )
            },
            deps: []
          }
        ]),
        VO = [
          { provide: ad, useValue: 'root' },
          {
            provide: Si,
            useFactory: function NO () {
              return new Si()
            },
            deps: []
          },
          { provide: _l, useClass: TO, multi: !0, deps: [Se, pe, co] },
          { provide: _l, useClass: RO, multi: !0, deps: [Se] },
          { provide: Cl, useClass: Cl, deps: [vl, _o, uo] },
          { provide: io, useExisting: Cl },
          { provide: qb, useExisting: _o },
          { provide: _o, useClass: _o, deps: [Se] },
          { provide: Xd, useClass: Xd, deps: [pe] },
          { provide: vl, useClass: vl, deps: [_l, pe] },
          { provide: $b, useClass: bO, deps: [] }
        ]
      let eC = (() => {
        class n {
          constructor (t) {
            if (t)
              throw new Error(
                'BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.'
              )
          }
          static withServerTransition (t) {
            return {
              ngModule: n,
              providers: [
                { provide: uo, useValue: t.appId },
                { provide: zb, useExisting: uo },
                vO
              ]
            }
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(n, 12))
          }),
          (n.ɵmod = Ye({ type: n })),
          (n.ɵinj = ze({ providers: VO, imports: [jb, $1] })),
          n
        )
      })()
      function V (...n) {
        return Ze(n, Cs(n))
      }
      'undefined' != typeof window && window
      class Ft extends Ct {
        constructor (e) {
          super(), (this._value = e)
        }
        get value () {
          return this.getValue()
        }
        _subscribe (e) {
          const t = super._subscribe(e)
          return !t.closed && e.next(this._value), t
        }
        getValue () {
          const { hasError: e, thrownError: t, _value: r } = this
          if (e) throw t
          return this._throwIfClosed(), r
        }
        next (e) {
          super.next((this._value = e))
        }
      }
      const { isArray: QO } = Array,
        { getPrototypeOf: ZO, prototype: YO, keys: XO } = Object
      function rC (n) {
        if (1 === n.length) {
          const e = n[0]
          if (QO(e)) return { args: e, keys: null }
          if (
            (function JO (n) {
              return n && 'object' == typeof n && ZO(n) === YO
            })(e)
          ) {
            const t = XO(e)
            return { args: t.map(r => e[r]), keys: t }
          }
        }
        return { args: n, keys: null }
      }
      const { isArray: eF } = Array
      function iC (n) {
        return ne(e =>
          (function tF (n, e) {
            return eF(e) ? n(...e) : n(e)
          })(n, e)
        )
      }
      function sC (n, e) {
        return n.reduce((t, r, i) => ((t[r] = e[i]), t), {})
      }
      function oC (n, e, t) {
        n ? Nn(t, n, e) : e()
      }
      const Dl = vs(
        n =>
          function () {
            n(this),
              (this.name = 'EmptyError'),
              (this.message = 'no elements in sequence')
          }
      )
      function Tf (...n) {
        return (function iF () {
          return bs(1)
        })()(Ze(n, Cs(n)))
      }
      function aC (n) {
        return new me(e => {
          Ht(n()).subscribe(e)
        })
      }
      function lC () {
        return Le((n, e) => {
          let t = null
          n._refCount++
          const r = xe(e, void 0, void 0, void 0, () => {
            if (!n || n._refCount <= 0 || 0 < --n._refCount)
              return void (t = null)
            const i = n._connection,
              s = t
            ;(t = null),
              i && (!s || i === s) && i.unsubscribe(),
              e.unsubscribe()
          })
          n.subscribe(r), r.closed || (t = n.connect())
        })
      }
      class sF extends me {
        constructor (e, t) {
          super(),
            (this.source = e),
            (this.subjectFactory = t),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            vp(e) && (this.lift = e.lift)
        }
        _subscribe (e) {
          return this.getSubject().subscribe(e)
        }
        getSubject () {
          const e = this._subject
          return (
            (!e || e.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          )
        }
        _teardown () {
          this._refCount = 0
          const { _connection: e } = this
          ;(this._subject = this._connection = null),
            null == e || e.unsubscribe()
        }
        connect () {
          let e = this._connection
          if (!e) {
            e = this._connection = new dt()
            const t = this.getSubject()
            e.add(
              this.source.subscribe(
                xe(
                  t,
                  void 0,
                  () => {
                    this._teardown(), t.complete()
                  },
                  r => {
                    this._teardown(), t.error(r)
                  },
                  () => this._teardown()
                )
              )
            ),
              e.closed && ((this._connection = null), (e = dt.EMPTY))
          }
          return e
        }
        refCount () {
          return lC()(this)
        }
      }
      function Nt (n, e) {
        return Le((t, r) => {
          let i = null,
            s = 0,
            o = !1
          const a = () => o && !i && r.complete()
          t.subscribe(
            xe(
              r,
              l => {
                null == i || i.unsubscribe()
                let u = 0
                const c = s++
                Ht(n(l, c)).subscribe(
                  (i = xe(
                    r,
                    d => r.next(e ? e(l, d, c, u++) : d),
                    () => {
                      ;(i = null), a()
                    }
                  ))
                )
              },
              () => {
                ;(o = !0), a()
              }
            )
          )
        })
      }
      function aF (n, e, t, r, i) {
        return (s, o) => {
          let a = t,
            l = e,
            u = 0
          s.subscribe(
            xe(
              o,
              c => {
                const d = u++
                ;(l = a ? n(l, c, d) : ((a = !0), c)), r && o.next(l)
              },
              i &&
                (() => {
                  a && o.next(l), o.complete()
                })
            )
          )
        }
      }
      function uC (n, e) {
        return Le(aF(n, e, arguments.length >= 2, !0))
      }
      function mr (n, e) {
        return Le((t, r) => {
          let i = 0
          t.subscribe(xe(r, s => n.call(e, s, i++) && r.next(s)))
        })
      }
      function Ae (n) {
        return Le((e, t) => {
          let s,
            r = null,
            i = !1
          ;(r = e.subscribe(
            xe(t, void 0, void 0, o => {
              ;(s = Ht(n(o, Ae(n)(e)))),
                r ? (r.unsubscribe(), (r = null), s.subscribe(t)) : (i = !0)
            })
          )),
            i && (r.unsubscribe(), (r = null), s.subscribe(t))
        })
      }
      function ns (n, e) {
        return ge(e) ? Qe(n, e, 1) : Qe(n, 1)
      }
      function If (n) {
        return n <= 0
          ? () => ft
          : Le((e, t) => {
              let r = []
              e.subscribe(
                xe(
                  t,
                  i => {
                    r.push(i), n < r.length && r.shift()
                  },
                  () => {
                    for (const i of r) t.next(i)
                    t.complete()
                  },
                  void 0,
                  () => {
                    r = null
                  }
                )
              )
            })
      }
      function cC (n = lF) {
        return Le((e, t) => {
          let r = !1
          e.subscribe(
            xe(
              t,
              i => {
                ;(r = !0), t.next(i)
              },
              () => (r ? t.complete() : t.error(n()))
            )
          )
        })
      }
      function lF () {
        return new Dl()
      }
      function dC (n) {
        return Le((e, t) => {
          let r = !1
          e.subscribe(
            xe(
              t,
              i => {
                ;(r = !0), t.next(i)
              },
              () => {
                r || t.next(n), t.complete()
              }
            )
          )
        })
      }
      function rs (n, e) {
        const t = arguments.length >= 2
        return r =>
          r.pipe(
            n ? mr((i, s) => n(i, s, r)) : sr,
            Pn(1),
            t ? dC(e) : cC(() => new Dl())
          )
      }
      function ue (n, e, t) {
        const r = ge(n) || e || t ? { next: n, error: e, complete: t } : n
        return r
          ? Le((i, s) => {
              var o
              null === (o = r.subscribe) || void 0 === o || o.call(r)
              let a = !0
              i.subscribe(
                xe(
                  s,
                  l => {
                    var u
                    null === (u = r.next) || void 0 === u || u.call(r, l),
                      s.next(l)
                  },
                  () => {
                    var l
                    ;(a = !1),
                      null === (l = r.complete) || void 0 === l || l.call(r),
                      s.complete()
                  },
                  l => {
                    var u
                    ;(a = !1),
                      null === (u = r.error) || void 0 === u || u.call(r, l),
                      s.error(l)
                  },
                  () => {
                    var l, u
                    a &&
                      (null === (l = r.unsubscribe) ||
                        void 0 === l ||
                        l.call(r)),
                      null === (u = r.finalize) || void 0 === u || u.call(r)
                  }
                )
              )
            })
          : sr
      }
      class Jn {
        constructor (e, t) {
          ;(this.id = e), (this.url = t)
        }
      }
      class xf extends Jn {
        constructor (e, t, r = 'imperative', i = null) {
          super(e, t), (this.navigationTrigger = r), (this.restoredState = i)
        }
        toString () {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`
        }
      }
      class vo extends Jn {
        constructor (e, t, r) {
          super(e, t), (this.urlAfterRedirects = r)
        }
        toString () {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`
        }
      }
      class fC extends Jn {
        constructor (e, t, r) {
          super(e, t), (this.reason = r)
        }
        toString () {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`
        }
      }
      class dF extends Jn {
        constructor (e, t, r) {
          super(e, t), (this.error = r)
        }
        toString () {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`
        }
      }
      class fF extends Jn {
        constructor (e, t, r, i) {
          super(e, t), (this.urlAfterRedirects = r), (this.state = i)
        }
        toString () {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
        }
      }
      class hF extends Jn {
        constructor (e, t, r, i) {
          super(e, t), (this.urlAfterRedirects = r), (this.state = i)
        }
        toString () {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
        }
      }
      class pF extends Jn {
        constructor (e, t, r, i, s) {
          super(e, t),
            (this.urlAfterRedirects = r),
            (this.state = i),
            (this.shouldActivate = s)
        }
        toString () {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`
        }
      }
      class gF extends Jn {
        constructor (e, t, r, i) {
          super(e, t), (this.urlAfterRedirects = r), (this.state = i)
        }
        toString () {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
        }
      }
      class mF extends Jn {
        constructor (e, t, r, i) {
          super(e, t), (this.urlAfterRedirects = r), (this.state = i)
        }
        toString () {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
        }
      }
      class hC {
        constructor (e) {
          this.route = e
        }
        toString () {
          return `RouteConfigLoadStart(path: ${this.route.path})`
        }
      }
      class pC {
        constructor (e) {
          this.route = e
        }
        toString () {
          return `RouteConfigLoadEnd(path: ${this.route.path})`
        }
      }
      class yF {
        constructor (e) {
          this.snapshot = e
        }
        toString () {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
          }')`
        }
      }
      class _F {
        constructor (e) {
          this.snapshot = e
        }
        toString () {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
          }')`
        }
      }
      class vF {
        constructor (e) {
          this.snapshot = e
        }
        toString () {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
          }')`
        }
      }
      class bF {
        constructor (e) {
          this.snapshot = e
        }
        toString () {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
          }')`
        }
      }
      class gC {
        constructor (e, t, r) {
          ;(this.routerEvent = e), (this.position = t), (this.anchor = r)
        }
        toString () {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`
        }
      }
      const Y = 'primary'
      class CF {
        constructor (e) {
          this.params = e || {}
        }
        has (e) {
          return Object.prototype.hasOwnProperty.call(this.params, e)
        }
        get (e) {
          if (this.has(e)) {
            const t = this.params[e]
            return Array.isArray(t) ? t[0] : t
          }
          return null
        }
        getAll (e) {
          if (this.has(e)) {
            const t = this.params[e]
            return Array.isArray(t) ? t : [t]
          }
          return []
        }
        get keys () {
          return Object.keys(this.params)
        }
      }
      function is (n) {
        return new CF(n)
      }
      const mC = 'ngNavigationCancelingError'
      function kf (n) {
        const e = Error('NavigationCancelingError: ' + n)
        return (e[mC] = !0), e
      }
      function EF (n, e, t) {
        const r = t.path.split('/')
        if (
          r.length > n.length ||
          ('full' === t.pathMatch && (e.hasChildren() || r.length < n.length))
        )
          return null
        const i = {}
        for (let s = 0; s < r.length; s++) {
          const o = r[s],
            a = n[s]
          if (o.startsWith(':')) i[o.substring(1)] = a
          else if (o !== a.path) return null
        }
        return { consumed: n.slice(0, r.length), posParams: i }
      }
      function xn (n, e) {
        const t = n ? Object.keys(n) : void 0,
          r = e ? Object.keys(e) : void 0
        if (!t || !r || t.length != r.length) return !1
        let i
        for (let s = 0; s < t.length; s++)
          if (((i = t[s]), !yC(n[i], e[i]))) return !1
        return !0
      }
      function yC (n, e) {
        if (Array.isArray(n) && Array.isArray(e)) {
          if (n.length !== e.length) return !1
          const t = [...n].sort(),
            r = [...e].sort()
          return t.every((i, s) => r[s] === i)
        }
        return n === e
      }
      function _C (n) {
        return Array.prototype.concat.apply([], n)
      }
      function vC (n) {
        return n.length > 0 ? n[n.length - 1] : null
      }
      function it (n, e) {
        for (const t in n) n.hasOwnProperty(t) && e(n[t], t)
      }
      function kn (n) {
        return bd(n) ? n : Ys(n) ? Ze(Promise.resolve(n)) : V(n)
      }
      const MF = {
          exact: function DC (n, e, t) {
            if (
              !Gr(n.segments, e.segments) ||
              !El(n.segments, e.segments, t) ||
              n.numberOfChildren !== e.numberOfChildren
            )
              return !1
            for (const r in e.children)
              if (!n.children[r] || !DC(n.children[r], e.children[r], t))
                return !1
            return !0
          },
          subset: EC
        },
        bC = {
          exact: function AF (n, e) {
            return xn(n, e)
          },
          subset: function TF (n, e) {
            return (
              Object.keys(e).length <= Object.keys(n).length &&
              Object.keys(e).every(t => yC(n[t], e[t]))
            )
          },
          ignored: () => !0
        }
      function CC (n, e, t) {
        return (
          MF[t.paths](n.root, e.root, t.matrixParams) &&
          bC[t.queryParams](n.queryParams, e.queryParams) &&
          !('exact' === t.fragment && n.fragment !== e.fragment)
        )
      }
      function EC (n, e, t) {
        return wC(n, e, e.segments, t)
      }
      function wC (n, e, t, r) {
        if (n.segments.length > t.length) {
          const i = n.segments.slice(0, t.length)
          return !(!Gr(i, t) || e.hasChildren() || !El(i, t, r))
        }
        if (n.segments.length === t.length) {
          if (!Gr(n.segments, t) || !El(n.segments, t, r)) return !1
          for (const i in e.children)
            if (!n.children[i] || !EC(n.children[i], e.children[i], r))
              return !1
          return !0
        }
        {
          const i = t.slice(0, n.segments.length),
            s = t.slice(n.segments.length)
          return (
            !!(Gr(n.segments, i) && El(n.segments, i, r) && n.children[Y]) &&
            wC(n.children[Y], e, s, r)
          )
        }
      }
      function El (n, e, t) {
        return e.every((r, i) => bC[t](n[i].parameters, r.parameters))
      }
      class zr {
        constructor (e, t, r) {
          ;(this.root = e), (this.queryParams = t), (this.fragment = r)
        }
        get queryParamMap () {
          return (
            this._queryParamMap || (this._queryParamMap = is(this.queryParams)),
            this._queryParamMap
          )
        }
        toString () {
          return kF.serialize(this)
        }
      }
      class ee {
        constructor (e, t) {
          ;(this.segments = e),
            (this.children = t),
            (this.parent = null),
            it(t, (r, i) => (r.parent = this))
        }
        hasChildren () {
          return this.numberOfChildren > 0
        }
        get numberOfChildren () {
          return Object.keys(this.children).length
        }
        toString () {
          return wl(this)
        }
      }
      class bo {
        constructor (e, t) {
          ;(this.path = e), (this.parameters = t)
        }
        get parameterMap () {
          return (
            this._parameterMap || (this._parameterMap = is(this.parameters)),
            this._parameterMap
          )
        }
        toString () {
          return IC(this)
        }
      }
      function Gr (n, e) {
        return n.length === e.length && n.every((t, r) => t.path === e[r].path)
      }
      class SC {}
      class MC {
        parse (e) {
          const t = new jF(e)
          return new zr(
            t.parseRootSegment(),
            t.parseQueryParams(),
            t.parseFragment()
          )
        }
        serialize (e) {
          const t = `/${Co(e.root, !0)}`,
            r = (function FF (n) {
              const e = Object.keys(n)
                .map(t => {
                  const r = n[t]
                  return Array.isArray(r)
                    ? r.map(i => `${Sl(t)}=${Sl(i)}`).join('&')
                    : `${Sl(t)}=${Sl(r)}`
                })
                .filter(t => !!t)
              return e.length ? `?${e.join('&')}` : ''
            })(e.queryParams)
          return `${t}${r}${
            'string' == typeof e.fragment
              ? `#${(function RF (n) {
                  return encodeURI(n)
                })(e.fragment)}`
              : ''
          }`
        }
      }
      const kF = new MC()
      function wl (n) {
        return n.segments.map(e => IC(e)).join('/')
      }
      function Co (n, e) {
        if (!n.hasChildren()) return wl(n)
        if (e) {
          const t = n.children[Y] ? Co(n.children[Y], !1) : '',
            r = []
          return (
            it(n.children, (i, s) => {
              s !== Y && r.push(`${s}:${Co(i, !1)}`)
            }),
            r.length > 0 ? `${t}(${r.join('//')})` : t
          )
        }
        {
          const t = (function xF (n, e) {
            let t = []
            return (
              it(n.children, (r, i) => {
                i === Y && (t = t.concat(e(r, i)))
              }),
              it(n.children, (r, i) => {
                i !== Y && (t = t.concat(e(r, i)))
              }),
              t
            )
          })(n, (r, i) =>
            i === Y ? [Co(n.children[Y], !1)] : [`${i}:${Co(r, !1)}`]
          )
          return 1 === Object.keys(n.children).length && null != n.children[Y]
            ? `${wl(n)}/${t[0]}`
            : `${wl(n)}/(${t.join('//')})`
        }
      }
      function AC (n) {
        return encodeURIComponent(n)
          .replace(/%40/g, '@')
          .replace(/%3A/gi, ':')
          .replace(/%24/g, '$')
          .replace(/%2C/gi, ',')
      }
      function Sl (n) {
        return AC(n).replace(/%3B/gi, ';')
      }
      function Rf (n) {
        return AC(n)
          .replace(/\(/g, '%28')
          .replace(/\)/g, '%29')
          .replace(/%26/gi, '&')
      }
      function Ml (n) {
        return decodeURIComponent(n)
      }
      function TC (n) {
        return Ml(n.replace(/\+/g, '%20'))
      }
      function IC (n) {
        return `${Rf(n.path)}${(function OF (n) {
          return Object.keys(n)
            .map(e => `;${Rf(e)}=${Rf(n[e])}`)
            .join('')
        })(n.parameters)}`
      }
      const NF = /^[^\/()?;=#]+/
      function Al (n) {
        const e = n.match(NF)
        return e ? e[0] : ''
      }
      const PF = /^[^=?&#]+/,
        VF = /^[^&#]+/
      class jF {
        constructor (e) {
          ;(this.url = e), (this.remaining = e)
        }
        parseRootSegment () {
          return (
            this.consumeOptional('/'),
            '' === this.remaining ||
            this.peekStartsWith('?') ||
            this.peekStartsWith('#')
              ? new ee([], {})
              : new ee([], this.parseChildren())
          )
        }
        parseQueryParams () {
          const e = {}
          if (this.consumeOptional('?'))
            do {
              this.parseQueryParam(e)
            } while (this.consumeOptional('&'))
          return e
        }
        parseFragment () {
          return this.consumeOptional('#')
            ? decodeURIComponent(this.remaining)
            : null
        }
        parseChildren () {
          if ('' === this.remaining) return {}
          this.consumeOptional('/')
          const e = []
          for (
            this.peekStartsWith('(') || e.push(this.parseSegment());
            this.peekStartsWith('/') &&
            !this.peekStartsWith('//') &&
            !this.peekStartsWith('/(');

          )
            this.capture('/'), e.push(this.parseSegment())
          let t = {}
          this.peekStartsWith('/(') &&
            (this.capture('/'), (t = this.parseParens(!0)))
          let r = {}
          return (
            this.peekStartsWith('(') && (r = this.parseParens(!1)),
            (e.length > 0 || Object.keys(t).length > 0) &&
              (r[Y] = new ee(e, t)),
            r
          )
        }
        parseSegment () {
          const e = Al(this.remaining)
          if ('' === e && this.peekStartsWith(';'))
            throw new Error(
              `Empty path url segment cannot have parameters: '${this.remaining}'.`
            )
          return this.capture(e), new bo(Ml(e), this.parseMatrixParams())
        }
        parseMatrixParams () {
          const e = {}
          for (; this.consumeOptional(';'); ) this.parseParam(e)
          return e
        }
        parseParam (e) {
          const t = Al(this.remaining)
          if (!t) return
          this.capture(t)
          let r = ''
          if (this.consumeOptional('=')) {
            const i = Al(this.remaining)
            i && ((r = i), this.capture(r))
          }
          e[Ml(t)] = Ml(r)
        }
        parseQueryParam (e) {
          const t = (function LF (n) {
            const e = n.match(PF)
            return e ? e[0] : ''
          })(this.remaining)
          if (!t) return
          this.capture(t)
          let r = ''
          if (this.consumeOptional('=')) {
            const o = (function BF (n) {
              const e = n.match(VF)
              return e ? e[0] : ''
            })(this.remaining)
            o && ((r = o), this.capture(r))
          }
          const i = TC(t),
            s = TC(r)
          if (e.hasOwnProperty(i)) {
            let o = e[i]
            Array.isArray(o) || ((o = [o]), (e[i] = o)), o.push(s)
          } else e[i] = s
        }
        parseParens (e) {
          const t = {}
          for (
            this.capture('(');
            !this.consumeOptional(')') && this.remaining.length > 0;

          ) {
            const r = Al(this.remaining),
              i = this.remaining[r.length]
            if ('/' !== i && ')' !== i && ';' !== i)
              throw new Error(`Cannot parse url '${this.url}'`)
            let s
            r.indexOf(':') > -1
              ? ((s = r.substr(0, r.indexOf(':'))),
                this.capture(s),
                this.capture(':'))
              : e && (s = Y)
            const o = this.parseChildren()
            ;(t[s] = 1 === Object.keys(o).length ? o[Y] : new ee([], o)),
              this.consumeOptional('//')
          }
          return t
        }
        peekStartsWith (e) {
          return this.remaining.startsWith(e)
        }
        consumeOptional (e) {
          return (
            !!this.peekStartsWith(e) &&
            ((this.remaining = this.remaining.substring(e.length)), !0)
          )
        }
        capture (e) {
          if (!this.consumeOptional(e)) throw new Error(`Expected "${e}".`)
        }
      }
      class xC {
        constructor (e) {
          this._root = e
        }
        get root () {
          return this._root.value
        }
        parent (e) {
          const t = this.pathFromRoot(e)
          return t.length > 1 ? t[t.length - 2] : null
        }
        children (e) {
          const t = Of(e, this._root)
          return t ? t.children.map(r => r.value) : []
        }
        firstChild (e) {
          const t = Of(e, this._root)
          return t && t.children.length > 0 ? t.children[0].value : null
        }
        siblings (e) {
          const t = Ff(e, this._root)
          return t.length < 2
            ? []
            : t[t.length - 2].children.map(i => i.value).filter(i => i !== e)
        }
        pathFromRoot (e) {
          return Ff(e, this._root).map(t => t.value)
        }
      }
      function Of (n, e) {
        if (n === e.value) return e
        for (const t of e.children) {
          const r = Of(n, t)
          if (r) return r
        }
        return null
      }
      function Ff (n, e) {
        if (n === e.value) return [e]
        for (const t of e.children) {
          const r = Ff(n, t)
          if (r.length) return r.unshift(e), r
        }
        return []
      }
      class er {
        constructor (e, t) {
          ;(this.value = e), (this.children = t)
        }
        toString () {
          return `TreeNode(${this.value})`
        }
      }
      function ss (n) {
        const e = {}
        return n && n.children.forEach(t => (e[t.value.outlet] = t)), e
      }
      class kC extends xC {
        constructor (e, t) {
          super(e), (this.snapshot = t), Nf(this, e)
        }
        toString () {
          return this.snapshot.toString()
        }
      }
      function RC (n, e) {
        const t = (function UF (n, e) {
            const o = new Tl([], {}, {}, '', {}, Y, e, null, n.root, -1, {})
            return new FC('', new er(o, []))
          })(n, e),
          r = new Ft([new bo('', {})]),
          i = new Ft({}),
          s = new Ft({}),
          o = new Ft({}),
          a = new Ft(''),
          l = new yr(r, i, o, a, s, Y, e, t.root)
        return (l.snapshot = t.root), new kC(new er(l, []), t)
      }
      class yr {
        constructor (e, t, r, i, s, o, a, l) {
          ;(this.url = e),
            (this.params = t),
            (this.queryParams = r),
            (this.fragment = i),
            (this.data = s),
            (this.outlet = o),
            (this.component = a),
            (this._futureSnapshot = l)
        }
        get routeConfig () {
          return this._futureSnapshot.routeConfig
        }
        get root () {
          return this._routerState.root
        }
        get parent () {
          return this._routerState.parent(this)
        }
        get firstChild () {
          return this._routerState.firstChild(this)
        }
        get children () {
          return this._routerState.children(this)
        }
        get pathFromRoot () {
          return this._routerState.pathFromRoot(this)
        }
        get paramMap () {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(ne(e => is(e)))),
            this._paramMap
          )
        }
        get queryParamMap () {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(ne(e => is(e)))),
            this._queryParamMap
          )
        }
        toString () {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`
        }
      }
      function OC (n, e = 'emptyOnly') {
        const t = n.pathFromRoot
        let r = 0
        if ('always' !== e)
          for (r = t.length - 1; r >= 1; ) {
            const i = t[r],
              s = t[r - 1]
            if (i.routeConfig && '' === i.routeConfig.path) r--
            else {
              if (s.component) break
              r--
            }
          }
        return (function HF (n) {
          return n.reduce(
            (e, t) => ({
              params: Object.assign(Object.assign({}, e.params), t.params),
              data: Object.assign(Object.assign({}, e.data), t.data),
              resolve: Object.assign(
                Object.assign({}, e.resolve),
                t._resolvedData
              )
            }),
            { params: {}, data: {}, resolve: {} }
          )
        })(t.slice(r))
      }
      class Tl {
        constructor (e, t, r, i, s, o, a, l, u, c, d) {
          ;(this.url = e),
            (this.params = t),
            (this.queryParams = r),
            (this.fragment = i),
            (this.data = s),
            (this.outlet = o),
            (this.component = a),
            (this.routeConfig = l),
            (this._urlSegment = u),
            (this._lastPathIndex = c),
            (this._resolve = d)
        }
        get root () {
          return this._routerState.root
        }
        get parent () {
          return this._routerState.parent(this)
        }
        get firstChild () {
          return this._routerState.firstChild(this)
        }
        get children () {
          return this._routerState.children(this)
        }
        get pathFromRoot () {
          return this._routerState.pathFromRoot(this)
        }
        get paramMap () {
          return (
            this._paramMap || (this._paramMap = is(this.params)), this._paramMap
          )
        }
        get queryParamMap () {
          return (
            this._queryParamMap || (this._queryParamMap = is(this.queryParams)),
            this._queryParamMap
          )
        }
        toString () {
          return `Route(url:'${this.url
            .map(r => r.toString())
            .join('/')}', path:'${
            this.routeConfig ? this.routeConfig.path : ''
          }')`
        }
      }
      class FC extends xC {
        constructor (e, t) {
          super(t), (this.url = e), Nf(this, t)
        }
        toString () {
          return NC(this._root)
        }
      }
      function Nf (n, e) {
        ;(e.value._routerState = n), e.children.forEach(t => Nf(n, t))
      }
      function NC (n) {
        const e =
          n.children.length > 0 ? ` { ${n.children.map(NC).join(', ')} } ` : ''
        return `${n.value}${e}`
      }
      function Pf (n) {
        if (n.snapshot) {
          const e = n.snapshot,
            t = n._futureSnapshot
          ;(n.snapshot = t),
            xn(e.queryParams, t.queryParams) ||
              n.queryParams.next(t.queryParams),
            e.fragment !== t.fragment && n.fragment.next(t.fragment),
            xn(e.params, t.params) || n.params.next(t.params),
            (function wF (n, e) {
              if (n.length !== e.length) return !1
              for (let t = 0; t < n.length; ++t) if (!xn(n[t], e[t])) return !1
              return !0
            })(e.url, t.url) || n.url.next(t.url),
            xn(e.data, t.data) || n.data.next(t.data)
        } else
          (n.snapshot = n._futureSnapshot), n.data.next(n._futureSnapshot.data)
      }
      function Lf (n, e) {
        const t =
          xn(n.params, e.params) &&
          (function IF (n, e) {
            return (
              Gr(n, e) && n.every((t, r) => xn(t.parameters, e[r].parameters))
            )
          })(n.url, e.url)
        return (
          t &&
          !(!n.parent != !e.parent) &&
          (!n.parent || Lf(n.parent, e.parent))
        )
      }
      function Do (n, e, t) {
        if (t && n.shouldReuseRoute(e.value, t.value.snapshot)) {
          const r = t.value
          r._futureSnapshot = e.value
          const i = (function zF (n, e, t) {
            return e.children.map(r => {
              for (const i of t.children)
                if (n.shouldReuseRoute(r.value, i.value.snapshot))
                  return Do(n, r, i)
              return Do(n, r)
            })
          })(n, e, t)
          return new er(r, i)
        }
        {
          if (n.shouldAttach(e.value)) {
            const s = n.retrieve(e.value)
            if (null !== s) {
              const o = s.route
              return (
                (o.value._futureSnapshot = e.value),
                (o.children = e.children.map(a => Do(n, a))),
                o
              )
            }
          }
          const r = (function GF (n) {
              return new yr(
                new Ft(n.url),
                new Ft(n.params),
                new Ft(n.queryParams),
                new Ft(n.fragment),
                new Ft(n.data),
                n.outlet,
                n.component,
                n
              )
            })(e.value),
            i = e.children.map(s => Do(n, s))
          return new er(r, i)
        }
      }
      function Il (n) {
        return 'object' == typeof n && null != n && !n.outlets && !n.segmentPath
      }
      function Eo (n) {
        return 'object' == typeof n && null != n && n.outlets
      }
      function Vf (n, e, t, r, i) {
        let s = {}
        return (
          r &&
            it(r, (o, a) => {
              s[a] = Array.isArray(o) ? o.map(l => `${l}`) : `${o}`
            }),
          new zr(t.root === n ? e : PC(t.root, n, e), s, i)
        )
      }
      function PC (n, e, t) {
        const r = {}
        return (
          it(n.children, (i, s) => {
            r[s] = i === e ? t : PC(i, e, t)
          }),
          new ee(n.segments, r)
        )
      }
      class LC {
        constructor (e, t, r) {
          if (
            ((this.isAbsolute = e),
            (this.numberOfDoubleDots = t),
            (this.commands = r),
            e && r.length > 0 && Il(r[0]))
          )
            throw new Error('Root segment cannot have matrix parameters')
          const i = r.find(Eo)
          if (i && i !== vC(r))
            throw new Error('{outlets:{}} has to be the last command')
        }
        toRoot () {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            '/' == this.commands[0]
          )
        }
      }
      class Bf {
        constructor (e, t, r) {
          ;(this.segmentGroup = e), (this.processChildren = t), (this.index = r)
        }
      }
      function VC (n, e, t) {
        if (
          (n || (n = new ee([], {})),
          0 === n.segments.length && n.hasChildren())
        )
          return xl(n, e, t)
        const r = (function YF (n, e, t) {
            let r = 0,
              i = e
            const s = { match: !1, pathIndex: 0, commandIndex: 0 }
            for (; i < n.segments.length; ) {
              if (r >= t.length) return s
              const o = n.segments[i],
                a = t[r]
              if (Eo(a)) break
              const l = `${a}`,
                u = r < t.length - 1 ? t[r + 1] : null
              if (i > 0 && void 0 === l) break
              if (l && u && 'object' == typeof u && void 0 === u.outlets) {
                if (!jC(l, u, o)) return s
                r += 2
              } else {
                if (!jC(l, {}, o)) return s
                r++
              }
              i++
            }
            return { match: !0, pathIndex: i, commandIndex: r }
          })(n, e, t),
          i = t.slice(r.commandIndex)
        if (r.match && r.pathIndex < n.segments.length) {
          const s = new ee(n.segments.slice(0, r.pathIndex), {})
          return (
            (s.children[Y] = new ee(n.segments.slice(r.pathIndex), n.children)),
            xl(s, 0, i)
          )
        }
        return r.match && 0 === i.length
          ? new ee(n.segments, {})
          : r.match && !n.hasChildren()
          ? jf(n, e, t)
          : r.match
          ? xl(n, 0, i)
          : jf(n, e, t)
      }
      function xl (n, e, t) {
        if (0 === t.length) return new ee(n.segments, {})
        {
          const r = (function ZF (n) {
              return Eo(n[0]) ? n[0].outlets : { [Y]: n }
            })(t),
            i = {}
          return (
            it(r, (s, o) => {
              'string' == typeof s && (s = [s]),
                null !== s && (i[o] = VC(n.children[o], e, s))
            }),
            it(n.children, (s, o) => {
              void 0 === r[o] && (i[o] = s)
            }),
            new ee(n.segments, i)
          )
        }
      }
      function jf (n, e, t) {
        const r = n.segments.slice(0, e)
        let i = 0
        for (; i < t.length; ) {
          const s = t[i]
          if (Eo(s)) {
            const l = XF(s.outlets)
            return new ee(r, l)
          }
          if (0 === i && Il(t[0])) {
            r.push(new bo(n.segments[e].path, BC(t[0]))), i++
            continue
          }
          const o = Eo(s) ? s.outlets[Y] : `${s}`,
            a = i < t.length - 1 ? t[i + 1] : null
          o && a && Il(a)
            ? (r.push(new bo(o, BC(a))), (i += 2))
            : (r.push(new bo(o, {})), i++)
        }
        return new ee(r, {})
      }
      function XF (n) {
        const e = {}
        return (
          it(n, (t, r) => {
            'string' == typeof t && (t = [t]),
              null !== t && (e[r] = jf(new ee([], {}), 0, t))
          }),
          e
        )
      }
      function BC (n) {
        const e = {}
        return it(n, (t, r) => (e[r] = `${t}`)), e
      }
      function jC (n, e, t) {
        return n == t.path && xn(e, t.parameters)
      }
      class eN {
        constructor (e, t, r, i) {
          ;(this.routeReuseStrategy = e),
            (this.futureState = t),
            (this.currState = r),
            (this.forwardEvent = i)
        }
        activate (e) {
          const t = this.futureState._root,
            r = this.currState ? this.currState._root : null
          this.deactivateChildRoutes(t, r, e),
            Pf(this.futureState.root),
            this.activateChildRoutes(t, r, e)
        }
        deactivateChildRoutes (e, t, r) {
          const i = ss(t)
          e.children.forEach(s => {
            const o = s.value.outlet
            this.deactivateRoutes(s, i[o], r), delete i[o]
          }),
            it(i, (s, o) => {
              this.deactivateRouteAndItsChildren(s, r)
            })
        }
        deactivateRoutes (e, t, r) {
          const i = e.value,
            s = t ? t.value : null
          if (i === s)
            if (i.component) {
              const o = r.getContext(i.outlet)
              o && this.deactivateChildRoutes(e, t, o.children)
            } else this.deactivateChildRoutes(e, t, r)
          else s && this.deactivateRouteAndItsChildren(t, r)
        }
        deactivateRouteAndItsChildren (e, t) {
          e.value.component &&
          this.routeReuseStrategy.shouldDetach(e.value.snapshot)
            ? this.detachAndStoreRouteSubtree(e, t)
            : this.deactivateRouteAndOutlet(e, t)
        }
        detachAndStoreRouteSubtree (e, t) {
          const r = t.getContext(e.value.outlet),
            i = r && e.value.component ? r.children : t,
            s = ss(e)
          for (const o of Object.keys(s))
            this.deactivateRouteAndItsChildren(s[o], i)
          if (r && r.outlet) {
            const o = r.outlet.detach(),
              a = r.children.onOutletDeactivated()
            this.routeReuseStrategy.store(e.value.snapshot, {
              componentRef: o,
              route: e,
              contexts: a
            })
          }
        }
        deactivateRouteAndOutlet (e, t) {
          const r = t.getContext(e.value.outlet),
            i = r && e.value.component ? r.children : t,
            s = ss(e)
          for (const o of Object.keys(s))
            this.deactivateRouteAndItsChildren(s[o], i)
          r &&
            r.outlet &&
            (r.outlet.deactivate(),
            r.children.onOutletDeactivated(),
            (r.attachRef = null),
            (r.resolver = null),
            (r.route = null))
        }
        activateChildRoutes (e, t, r) {
          const i = ss(t)
          e.children.forEach(s => {
            this.activateRoutes(s, i[s.value.outlet], r),
              this.forwardEvent(new bF(s.value.snapshot))
          }),
            e.children.length && this.forwardEvent(new _F(e.value.snapshot))
        }
        activateRoutes (e, t, r) {
          const i = e.value,
            s = t ? t.value : null
          if ((Pf(i), i === s))
            if (i.component) {
              const o = r.getOrCreateContext(i.outlet)
              this.activateChildRoutes(e, t, o.children)
            } else this.activateChildRoutes(e, t, r)
          else if (i.component) {
            const o = r.getOrCreateContext(i.outlet)
            if (this.routeReuseStrategy.shouldAttach(i.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(i.snapshot)
              this.routeReuseStrategy.store(i.snapshot, null),
                o.children.onOutletReAttached(a.contexts),
                (o.attachRef = a.componentRef),
                (o.route = a.route.value),
                o.outlet && o.outlet.attach(a.componentRef, a.route.value),
                Pf(a.route.value),
                this.activateChildRoutes(e, null, o.children)
            } else {
              const a = (function tN (n) {
                  for (let e = n.parent; e; e = e.parent) {
                    const t = e.routeConfig
                    if (t && t._loadedConfig) return t._loadedConfig
                    if (t && t.component) return null
                  }
                  return null
                })(i.snapshot),
                l = a ? a.module.componentFactoryResolver : null
              ;(o.attachRef = null),
                (o.route = i),
                (o.resolver = l),
                o.outlet && o.outlet.activateWith(i, l),
                this.activateChildRoutes(e, null, o.children)
            }
          } else this.activateChildRoutes(e, null, r)
        }
      }
      class Uf {
        constructor (e, t) {
          ;(this.routes = e), (this.module = t)
        }
      }
      function _r (n) {
        return 'function' == typeof n
      }
      function qr (n) {
        return n instanceof zr
      }
      const wo = Symbol('INITIAL_VALUE')
      function So () {
        return Nt(n =>
          (function nF (...n) {
            const e = Cs(n),
              t = Fp(n),
              { args: r, keys: i } = rC(n)
            if (0 === r.length) return Ze([], e)
            const s = new me(
              (function rF (n, e, t = sr) {
                return r => {
                  oC(
                    e,
                    () => {
                      const { length: i } = n,
                        s = new Array(i)
                      let o = i,
                        a = i
                      for (let l = 0; l < i; l++)
                        oC(
                          e,
                          () => {
                            const u = Ze(n[l], e)
                            let c = !1
                            u.subscribe(
                              xe(
                                r,
                                d => {
                                  ;(s[l] = d),
                                    c || ((c = !0), a--),
                                    a || r.next(t(s.slice()))
                                },
                                () => {
                                  --o || r.complete()
                                }
                              )
                            )
                          },
                          r
                        )
                    },
                    r
                  )
                }
              })(r, e, i ? o => sC(i, o) : sr)
            )
            return t ? s.pipe(iC(t)) : s
          })(
            n.map(e =>
              e.pipe(
                Pn(1),
                (function oF (...n) {
                  const e = Cs(n)
                  return Le((t, r) => {
                    ;(e ? Tf(n, t, e) : Tf(n, t)).subscribe(r)
                  })
                })(wo)
              )
            )
          ).pipe(
            uC((e, t) => {
              let r = !1
              return t.reduce(
                (i, s, o) =>
                  i !== wo
                    ? i
                    : (s === wo && (r = !0),
                      r || (!1 !== s && o !== t.length - 1 && !qr(s)) ? i : s),
                e
              )
            }, wo),
            mr(e => e !== wo),
            ne(e => (qr(e) ? e : !0 === e)),
            Pn(1)
          )
        )
      }
      class aN {
        constructor () {
          ;(this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.children = new Mo()),
            (this.attachRef = null)
        }
      }
      class Mo {
        constructor () {
          this.contexts = new Map()
        }
        onChildOutletCreated (e, t) {
          const r = this.getOrCreateContext(e)
          ;(r.outlet = t), this.contexts.set(e, r)
        }
        onChildOutletDestroyed (e) {
          const t = this.getContext(e)
          t && ((t.outlet = null), (t.attachRef = null))
        }
        onOutletDeactivated () {
          const e = this.contexts
          return (this.contexts = new Map()), e
        }
        onOutletReAttached (e) {
          this.contexts = e
        }
        getOrCreateContext (e) {
          let t = this.getContext(e)
          return t || ((t = new aN()), this.contexts.set(e, t)), t
        }
        getContext (e) {
          return this.contexts.get(e) || null
        }
      }
      let Hf = (() => {
        class n {
          constructor (t, r, i, s, o) {
            ;(this.parentContexts = t),
              (this.location = r),
              (this.resolver = i),
              (this.changeDetector = o),
              (this.activated = null),
              (this._activatedRoute = null),
              (this.activateEvents = new Fe()),
              (this.deactivateEvents = new Fe()),
              (this.attachEvents = new Fe()),
              (this.detachEvents = new Fe()),
              (this.name = s || Y),
              t.onChildOutletCreated(this.name, this)
          }
          ngOnDestroy () {
            this.parentContexts.onChildOutletDestroyed(this.name)
          }
          ngOnInit () {
            if (!this.activated) {
              const t = this.parentContexts.getContext(this.name)
              t &&
                t.route &&
                (t.attachRef
                  ? this.attach(t.attachRef, t.route)
                  : this.activateWith(t.route, t.resolver || null))
            }
          }
          get isActivated () {
            return !!this.activated
          }
          get component () {
            if (!this.activated) throw new Error('Outlet is not activated')
            return this.activated.instance
          }
          get activatedRoute () {
            if (!this.activated) throw new Error('Outlet is not activated')
            return this._activatedRoute
          }
          get activatedRouteData () {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {}
          }
          detach () {
            if (!this.activated) throw new Error('Outlet is not activated')
            this.location.detach()
            const t = this.activated
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(t.instance),
              t
            )
          }
          attach (t, r) {
            ;(this.activated = t),
              (this._activatedRoute = r),
              this.location.insert(t.hostView),
              this.attachEvents.emit(t.instance)
          }
          deactivate () {
            if (this.activated) {
              const t = this.component
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(t)
            }
          }
          activateWith (t, r) {
            if (this.isActivated)
              throw new Error('Cannot activate an already activated outlet')
            this._activatedRoute = t
            const o = (r = r || this.resolver).resolveComponentFactory(
                t._futureSnapshot.routeConfig.component
              ),
              a = this.parentContexts.getOrCreateContext(this.name).children,
              l = new lN(t, a, this.location.injector)
            ;(this.activated = this.location.createComponent(
              o,
              this.location.length,
              l
            )),
              this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance)
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(y(Mo), y(fn), y(Ki), ks('name'), y(Ji))
          }),
          (n.ɵdir = N({
            type: n,
            selectors: [['router-outlet']],
            outputs: {
              activateEvents: 'activate',
              deactivateEvents: 'deactivate',
              attachEvents: 'attach',
              detachEvents: 'detach'
            },
            exportAs: ['outlet']
          })),
          n
        )
      })()
      class lN {
        constructor (e, t, r) {
          ;(this.route = e), (this.childContexts = t), (this.parent = r)
        }
        get (e, t) {
          return e === yr
            ? this.route
            : e === Mo
            ? this.childContexts
            : this.parent.get(e, t)
        }
      }
      let UC = (() => {
        class n {}
        return (
          (n.ɵfac = function (t) {
            return new (t || n)()
          }),
          (n.ɵcmp = At({
            type: n,
            selectors: [['ng-component']],
            decls: 1,
            vars: 0,
            template: function (t, r) {
              1 & t && le(0, 'router-outlet')
            },
            directives: [Hf],
            encapsulation: 2
          })),
          n
        )
      })()
      function HC (n, e = '') {
        for (let t = 0; t < n.length; t++) {
          const r = n[t]
          uN(r, cN(e, r))
        }
      }
      function uN (n, e) {
        n.children && HC(n.children, e)
      }
      function cN (n, e) {
        return e
          ? n || e.path
            ? n && !e.path
              ? `${n}/`
              : !n && e.path
              ? e.path
              : `${n}/${e.path}`
            : ''
          : n
      }
      function $f (n) {
        const e = n.children && n.children.map($f),
          t = e
            ? Object.assign(Object.assign({}, n), { children: e })
            : Object.assign({}, n)
        return (
          !t.component &&
            (e || t.loadChildren) &&
            t.outlet &&
            t.outlet !== Y &&
            (t.component = UC),
          t
        )
      }
      function Xt (n) {
        return n.outlet || Y
      }
      function $C (n, e) {
        const t = n.filter(r => Xt(r) === e)
        return t.push(...n.filter(r => Xt(r) !== e)), t
      }
      const zC = {
        matched: !1,
        consumedSegments: [],
        lastChild: 0,
        parameters: {},
        positionalParamSegments: {}
      }
      function kl (n, e, t) {
        var r
        if ('' === e.path)
          return 'full' === e.pathMatch && (n.hasChildren() || t.length > 0)
            ? Object.assign({}, zC)
            : {
                matched: !0,
                consumedSegments: [],
                lastChild: 0,
                parameters: {},
                positionalParamSegments: {}
              }
        const s = (e.matcher || EF)(t, n, e)
        if (!s) return Object.assign({}, zC)
        const o = {}
        it(s.posParams, (l, u) => {
          o[u] = l.path
        })
        const a =
          s.consumed.length > 0
            ? Object.assign(
                Object.assign({}, o),
                s.consumed[s.consumed.length - 1].parameters
              )
            : o
        return {
          matched: !0,
          consumedSegments: s.consumed,
          lastChild: s.consumed.length,
          parameters: a,
          positionalParamSegments:
            null !== (r = s.posParams) && void 0 !== r ? r : {}
        }
      }
      function Rl (n, e, t, r, i = 'corrected') {
        if (
          t.length > 0 &&
          (function hN (n, e, t) {
            return t.some(r => Ol(n, e, r) && Xt(r) !== Y)
          })(n, t, r)
        ) {
          const o = new ee(
            e,
            (function fN (n, e, t, r) {
              const i = {}
              ;(i[Y] = r),
                (r._sourceSegment = n),
                (r._segmentIndexShift = e.length)
              for (const s of t)
                if ('' === s.path && Xt(s) !== Y) {
                  const o = new ee([], {})
                  ;(o._sourceSegment = n),
                    (o._segmentIndexShift = e.length),
                    (i[Xt(s)] = o)
                }
              return i
            })(n, e, r, new ee(t, n.children))
          )
          return (
            (o._sourceSegment = n),
            (o._segmentIndexShift = e.length),
            { segmentGroup: o, slicedSegments: [] }
          )
        }
        if (
          0 === t.length &&
          (function pN (n, e, t) {
            return t.some(r => Ol(n, e, r))
          })(n, t, r)
        ) {
          const o = new ee(
            n.segments,
            (function dN (n, e, t, r, i, s) {
              const o = {}
              for (const a of r)
                if (Ol(n, t, a) && !i[Xt(a)]) {
                  const l = new ee([], {})
                  ;(l._sourceSegment = n),
                    (l._segmentIndexShift =
                      'legacy' === s ? n.segments.length : e.length),
                    (o[Xt(a)] = l)
                }
              return Object.assign(Object.assign({}, i), o)
            })(n, e, t, r, n.children, i)
          )
          return (
            (o._sourceSegment = n),
            (o._segmentIndexShift = e.length),
            { segmentGroup: o, slicedSegments: t }
          )
        }
        const s = new ee(n.segments, n.children)
        return (
          (s._sourceSegment = n),
          (s._segmentIndexShift = e.length),
          { segmentGroup: s, slicedSegments: t }
        )
      }
      function Ol (n, e, t) {
        return (
          (!(n.hasChildren() || e.length > 0) || 'full' !== t.pathMatch) &&
          '' === t.path
        )
      }
      function GC (n, e, t, r) {
        return (
          !!(Xt(n) === r || (r !== Y && Ol(e, t, n))) &&
          ('**' === n.path || kl(e, n, t).matched)
        )
      }
      function qC (n, e, t) {
        return 0 === e.length && !n.children[t]
      }
      class Ao {
        constructor (e) {
          this.segmentGroup = e || null
        }
      }
      class WC {
        constructor (e) {
          this.urlTree = e
        }
      }
      function Fl (n) {
        return new me(e => e.error(new Ao(n)))
      }
      function KC (n) {
        return new me(e => e.error(new WC(n)))
      }
      function gN (n) {
        return new me(e =>
          e.error(
            new Error(
              `Only absolute redirects can have named outlets. redirectTo: '${n}'`
            )
          )
        )
      }
      class _N {
        constructor (e, t, r, i, s) {
          ;(this.configLoader = t),
            (this.urlSerializer = r),
            (this.urlTree = i),
            (this.config = s),
            (this.allowRedirects = !0),
            (this.ngModule = e.get(qn))
        }
        apply () {
          const e = Rl(this.urlTree.root, [], [], this.config).segmentGroup,
            t = new ee(e.segments, e.children)
          return this.expandSegmentGroup(this.ngModule, this.config, t, Y)
            .pipe(
              ne(s =>
                this.createUrlTree(
                  zf(s),
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              Ae(s => {
                if (s instanceof WC)
                  return (this.allowRedirects = !1), this.match(s.urlTree)
                throw s instanceof Ao ? this.noMatchError(s) : s
              })
            )
        }
        match (e) {
          return this.expandSegmentGroup(this.ngModule, this.config, e.root, Y)
            .pipe(ne(i => this.createUrlTree(zf(i), e.queryParams, e.fragment)))
            .pipe(
              Ae(i => {
                throw i instanceof Ao ? this.noMatchError(i) : i
              })
            )
        }
        noMatchError (e) {
          return new Error(
            `Cannot match any routes. URL Segment: '${e.segmentGroup}'`
          )
        }
        createUrlTree (e, t, r) {
          const i = e.segments.length > 0 ? new ee([], { [Y]: e }) : e
          return new zr(i, t, r)
        }
        expandSegmentGroup (e, t, r, i) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.expandChildren(e, t, r).pipe(ne(s => new ee([], s)))
            : this.expandSegment(e, r, t, r.segments, i, !0)
        }
        expandChildren (e, t, r) {
          const i = []
          for (const s of Object.keys(r.children))
            'primary' === s ? i.unshift(s) : i.push(s)
          return Ze(i).pipe(
            ns(s => {
              const o = r.children[s],
                a = $C(t, s)
              return this.expandSegmentGroup(e, a, o, s).pipe(
                ne(l => ({ segment: l, outlet: s }))
              )
            }),
            uC((s, o) => ((s[o.outlet] = o.segment), s), {}),
            (function uF (n, e) {
              const t = arguments.length >= 2
              return r =>
                r.pipe(
                  n ? mr((i, s) => n(i, s, r)) : sr,
                  If(1),
                  t ? dC(e) : cC(() => new Dl())
                )
            })()
          )
        }
        expandSegment (e, t, r, i, s, o) {
          return Ze(r).pipe(
            ns(a =>
              this.expandSegmentAgainstRoute(e, t, r, a, i, s, o).pipe(
                Ae(u => {
                  if (u instanceof Ao) return V(null)
                  throw u
                })
              )
            ),
            rs(a => !!a),
            Ae((a, l) => {
              if (a instanceof Dl || 'EmptyError' === a.name) {
                if (qC(t, i, s)) return V(new ee([], {}))
                throw new Ao(t)
              }
              throw a
            })
          )
        }
        expandSegmentAgainstRoute (e, t, r, i, s, o, a) {
          return GC(i, t, s, o)
            ? void 0 === i.redirectTo
              ? this.matchSegmentAgainstRoute(e, t, i, s, o)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(e, t, r, i, s, o)
              : Fl(t)
            : Fl(t)
        }
        expandSegmentAgainstRouteUsingRedirect (e, t, r, i, s, o) {
          return '**' === i.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(e, r, i, o)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                e,
                t,
                r,
                i,
                s,
                o
              )
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect (e, t, r, i) {
          const s = this.applyRedirectCommands([], r.redirectTo, {})
          return r.redirectTo.startsWith('/')
            ? KC(s)
            : this.lineralizeSegments(r, s).pipe(
                Qe(o => {
                  const a = new ee(o, {})
                  return this.expandSegment(e, a, t, o, i, !1)
                })
              )
        }
        expandRegularSegmentAgainstRouteUsingRedirect (e, t, r, i, s, o) {
          const {
            matched: a,
            consumedSegments: l,
            lastChild: u,
            positionalParamSegments: c
          } = kl(t, i, s)
          if (!a) return Fl(t)
          const d = this.applyRedirectCommands(l, i.redirectTo, c)
          return i.redirectTo.startsWith('/')
            ? KC(d)
            : this.lineralizeSegments(i, d).pipe(
                Qe(f =>
                  this.expandSegment(e, t, r, f.concat(s.slice(u)), o, !1)
                )
              )
        }
        matchSegmentAgainstRoute (e, t, r, i, s) {
          if ('**' === r.path)
            return r.loadChildren
              ? (r._loadedConfig
                  ? V(r._loadedConfig)
                  : this.configLoader.load(e.injector, r)
                ).pipe(ne(f => ((r._loadedConfig = f), new ee(i, {}))))
              : V(new ee(i, {}))
          const { matched: o, consumedSegments: a, lastChild: l } = kl(t, r, i)
          if (!o) return Fl(t)
          const u = i.slice(l)
          return this.getChildConfig(e, r, i).pipe(
            Qe(d => {
              const f = d.module,
                h = d.routes,
                { segmentGroup: p, slicedSegments: g } = Rl(t, a, u, h),
                _ = new ee(p.segments, p.children)
              if (0 === g.length && _.hasChildren())
                return this.expandChildren(f, h, _).pipe(ne(S => new ee(a, S)))
              if (0 === h.length && 0 === g.length) return V(new ee(a, {}))
              const v = Xt(r) === s
              return this.expandSegment(f, _, h, g, v ? Y : s, !0).pipe(
                ne(D => new ee(a.concat(D.segments), D.children))
              )
            })
          )
        }
        getChildConfig (e, t, r) {
          return t.children
            ? V(new Uf(t.children, e))
            : t.loadChildren
            ? void 0 !== t._loadedConfig
              ? V(t._loadedConfig)
              : this.runCanLoadGuards(e.injector, t, r).pipe(
                  Qe(i =>
                    i
                      ? this.configLoader
                          .load(e.injector, t)
                          .pipe(ne(s => ((t._loadedConfig = s), s)))
                      : (function mN (n) {
                          return new me(e =>
                            e.error(
                              kf(
                                `Cannot load children because the guard of the route "path: '${n.path}'" returned false`
                              )
                            )
                          )
                        })(t)
                  )
                )
            : V(new Uf([], e))
        }
        runCanLoadGuards (e, t, r) {
          const i = t.canLoad
          return i && 0 !== i.length
            ? V(
                i.map(o => {
                  const a = e.get(o)
                  let l
                  if (
                    (function rN (n) {
                      return n && _r(n.canLoad)
                    })(a)
                  )
                    l = a.canLoad(t, r)
                  else {
                    if (!_r(a)) throw new Error('Invalid CanLoad guard')
                    l = a(t, r)
                  }
                  return kn(l)
                })
              ).pipe(
                So(),
                ue(o => {
                  if (!qr(o)) return
                  const a = kf(
                    `Redirecting to "${this.urlSerializer.serialize(o)}"`
                  )
                  throw ((a.url = o), a)
                }),
                ne(o => !0 === o)
              )
            : V(!0)
        }
        lineralizeSegments (e, t) {
          let r = [],
            i = t.root
          for (;;) {
            if (((r = r.concat(i.segments)), 0 === i.numberOfChildren))
              return V(r)
            if (i.numberOfChildren > 1 || !i.children[Y])
              return gN(e.redirectTo)
            i = i.children[Y]
          }
        }
        applyRedirectCommands (e, t, r) {
          return this.applyRedirectCreatreUrlTree(
            t,
            this.urlSerializer.parse(t),
            e,
            r
          )
        }
        applyRedirectCreatreUrlTree (e, t, r, i) {
          const s = this.createSegmentGroup(e, t.root, r, i)
          return new zr(
            s,
            this.createQueryParams(t.queryParams, this.urlTree.queryParams),
            t.fragment
          )
        }
        createQueryParams (e, t) {
          const r = {}
          return (
            it(e, (i, s) => {
              if ('string' == typeof i && i.startsWith(':')) {
                const a = i.substring(1)
                r[s] = t[a]
              } else r[s] = i
            }),
            r
          )
        }
        createSegmentGroup (e, t, r, i) {
          const s = this.createSegments(e, t.segments, r, i)
          let o = {}
          return (
            it(t.children, (a, l) => {
              o[l] = this.createSegmentGroup(e, a, r, i)
            }),
            new ee(s, o)
          )
        }
        createSegments (e, t, r, i) {
          return t.map(s =>
            s.path.startsWith(':')
              ? this.findPosParam(e, s, i)
              : this.findOrReturn(s, r)
          )
        }
        findPosParam (e, t, r) {
          const i = r[t.path.substring(1)]
          if (!i)
            throw new Error(
              `Cannot redirect to '${e}'. Cannot find '${t.path}'.`
            )
          return i
        }
        findOrReturn (e, t) {
          let r = 0
          for (const i of t) {
            if (i.path === e.path) return t.splice(r), i
            r++
          }
          return e
        }
      }
      function zf (n) {
        const e = {}
        for (const r of Object.keys(n.children)) {
          const s = zf(n.children[r])
          ;(s.segments.length > 0 || s.hasChildren()) && (e[r] = s)
        }
        return (function vN (n) {
          if (1 === n.numberOfChildren && n.children[Y]) {
            const e = n.children[Y]
            return new ee(n.segments.concat(e.segments), e.children)
          }
          return n
        })(new ee(n.segments, e))
      }
      class QC {
        constructor (e) {
          ;(this.path = e), (this.route = this.path[this.path.length - 1])
        }
      }
      class Nl {
        constructor (e, t) {
          ;(this.component = e), (this.route = t)
        }
      }
      function CN (n, e, t) {
        const r = n._root
        return To(r, e ? e._root : null, t, [r.value])
      }
      function Pl (n, e, t) {
        const r = (function EN (n) {
          if (!n) return null
          for (let e = n.parent; e; e = e.parent) {
            const t = e.routeConfig
            if (t && t._loadedConfig) return t._loadedConfig
          }
          return null
        })(e)
        return (r ? r.module.injector : t).get(n)
      }
      function To (
        n,
        e,
        t,
        r,
        i = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const s = ss(e)
        return (
          n.children.forEach(o => {
            ;(function wN (
              n,
              e,
              t,
              r,
              i = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const s = n.value,
                o = e ? e.value : null,
                a = t ? t.getContext(n.value.outlet) : null
              if (o && s.routeConfig === o.routeConfig) {
                const l = (function SN (n, e, t) {
                  if ('function' == typeof t) return t(n, e)
                  switch (t) {
                    case 'pathParamsChange':
                      return !Gr(n.url, e.url)
                    case 'pathParamsOrQueryParamsChange':
                      return (
                        !Gr(n.url, e.url) || !xn(n.queryParams, e.queryParams)
                      )
                    case 'always':
                      return !0
                    case 'paramsOrQueryParamsChange':
                      return !Lf(n, e) || !xn(n.queryParams, e.queryParams)
                    default:
                      return !Lf(n, e)
                  }
                })(o, s, s.routeConfig.runGuardsAndResolvers)
                l
                  ? i.canActivateChecks.push(new QC(r))
                  : ((s.data = o.data), (s._resolvedData = o._resolvedData)),
                  To(n, e, s.component ? (a ? a.children : null) : t, r, i),
                  l &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    i.canDeactivateChecks.push(new Nl(a.outlet.component, o))
              } else
                o && Io(e, a, i),
                  i.canActivateChecks.push(new QC(r)),
                  To(n, null, s.component ? (a ? a.children : null) : t, r, i)
            })(o, s[o.value.outlet], t, r.concat([o.value]), i),
              delete s[o.value.outlet]
          }),
          it(s, (o, a) => Io(o, t.getContext(a), i)),
          i
        )
      }
      function Io (n, e, t) {
        const r = ss(n),
          i = n.value
        it(r, (s, o) => {
          Io(s, i.component ? (e ? e.children.getContext(o) : null) : e, t)
        }),
          t.canDeactivateChecks.push(
            new Nl(
              i.component && e && e.outlet && e.outlet.isActivated
                ? e.outlet.component
                : null,
              i
            )
          )
      }
      class FN {}
      function ZC (n) {
        return new me(e => e.error(n))
      }
      class PN {
        constructor (e, t, r, i, s, o) {
          ;(this.rootComponentType = e),
            (this.config = t),
            (this.urlTree = r),
            (this.url = i),
            (this.paramsInheritanceStrategy = s),
            (this.relativeLinkResolution = o)
        }
        recognize () {
          const e = Rl(
              this.urlTree.root,
              [],
              [],
              this.config.filter(o => void 0 === o.redirectTo),
              this.relativeLinkResolution
            ).segmentGroup,
            t = this.processSegmentGroup(this.config, e, Y)
          if (null === t) return null
          const r = new Tl(
              [],
              Object.freeze({}),
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              {},
              Y,
              this.rootComponentType,
              null,
              this.urlTree.root,
              -1,
              {}
            ),
            i = new er(r, t),
            s = new FC(this.url, i)
          return this.inheritParamsAndData(s._root), s
        }
        inheritParamsAndData (e) {
          const t = e.value,
            r = OC(t, this.paramsInheritanceStrategy)
          ;(t.params = Object.freeze(r.params)),
            (t.data = Object.freeze(r.data)),
            e.children.forEach(i => this.inheritParamsAndData(i))
        }
        processSegmentGroup (e, t, r) {
          return 0 === t.segments.length && t.hasChildren()
            ? this.processChildren(e, t)
            : this.processSegment(e, t, t.segments, r)
        }
        processChildren (e, t) {
          const r = []
          for (const s of Object.keys(t.children)) {
            const o = t.children[s],
              a = $C(e, s),
              l = this.processSegmentGroup(a, o, s)
            if (null === l) return null
            r.push(...l)
          }
          const i = YC(r)
          return (
            (function LN (n) {
              n.sort((e, t) =>
                e.value.outlet === Y
                  ? -1
                  : t.value.outlet === Y
                  ? 1
                  : e.value.outlet.localeCompare(t.value.outlet)
              )
            })(i),
            i
          )
        }
        processSegment (e, t, r, i) {
          for (const s of e) {
            const o = this.processSegmentAgainstRoute(s, t, r, i)
            if (null !== o) return o
          }
          return qC(t, r, i) ? [] : null
        }
        processSegmentAgainstRoute (e, t, r, i) {
          if (e.redirectTo || !GC(e, t, r, i)) return null
          let s,
            o = [],
            a = []
          if ('**' === e.path) {
            const h = r.length > 0 ? vC(r).parameters : {}
            s = new Tl(
              r,
              h,
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              eD(e),
              Xt(e),
              e.component,
              e,
              XC(t),
              JC(t) + r.length,
              tD(e)
            )
          } else {
            const h = kl(t, e, r)
            if (!h.matched) return null
            ;(o = h.consumedSegments),
              (a = r.slice(h.lastChild)),
              (s = new Tl(
                o,
                h.parameters,
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                eD(e),
                Xt(e),
                e.component,
                e,
                XC(t),
                JC(t) + o.length,
                tD(e)
              ))
          }
          const l = (function VN (n) {
              return n.children
                ? n.children
                : n.loadChildren
                ? n._loadedConfig.routes
                : []
            })(e),
            { segmentGroup: u, slicedSegments: c } = Rl(
              t,
              o,
              a,
              l.filter(h => void 0 === h.redirectTo),
              this.relativeLinkResolution
            )
          if (0 === c.length && u.hasChildren()) {
            const h = this.processChildren(l, u)
            return null === h ? null : [new er(s, h)]
          }
          if (0 === l.length && 0 === c.length) return [new er(s, [])]
          const d = Xt(e) === i,
            f = this.processSegment(l, u, c, d ? Y : i)
          return null === f ? null : [new er(s, f)]
        }
      }
      function BN (n) {
        const e = n.value.routeConfig
        return e && '' === e.path && void 0 === e.redirectTo
      }
      function YC (n) {
        const e = [],
          t = new Set()
        for (const r of n) {
          if (!BN(r)) {
            e.push(r)
            continue
          }
          const i = e.find(s => r.value.routeConfig === s.value.routeConfig)
          void 0 !== i ? (i.children.push(...r.children), t.add(i)) : e.push(r)
        }
        for (const r of t) {
          const i = YC(r.children)
          e.push(new er(r.value, i))
        }
        return e.filter(r => !t.has(r))
      }
      function XC (n) {
        let e = n
        for (; e._sourceSegment; ) e = e._sourceSegment
        return e
      }
      function JC (n) {
        let e = n,
          t = e._segmentIndexShift ? e._segmentIndexShift : 0
        for (; e._sourceSegment; )
          (e = e._sourceSegment),
            (t += e._segmentIndexShift ? e._segmentIndexShift : 0)
        return t - 1
      }
      function eD (n) {
        return n.data || {}
      }
      function tD (n) {
        return n.resolve || {}
      }
      function nD (n) {
        return [...Object.keys(n), ...Object.getOwnPropertySymbols(n)]
      }
      function Gf (n) {
        return Nt(e => {
          const t = n(e)
          return t ? Ze(t).pipe(ne(() => e)) : V(e)
        })
      }
      class WN extends class qN {
        shouldDetach (e) {
          return !1
        }
        store (e, t) {}
        shouldAttach (e) {
          return !1
        }
        retrieve (e) {
          return null
        }
        shouldReuseRoute (e, t) {
          return e.routeConfig === t.routeConfig
        }
      } {}
      const qf = new x('ROUTES')
      class rD {
        constructor (e, t, r, i) {
          ;(this.injector = e),
            (this.compiler = t),
            (this.onLoadStartListener = r),
            (this.onLoadEndListener = i)
        }
        load (e, t) {
          if (t._loader$) return t._loader$
          this.onLoadStartListener && this.onLoadStartListener(t)
          const i = this.loadModuleFactory(t.loadChildren).pipe(
            ne(s => {
              this.onLoadEndListener && this.onLoadEndListener(t)
              const o = s.create(e)
              return new Uf(
                _C(o.injector.get(qf, void 0, $.Self | $.Optional)).map($f),
                o
              )
            }),
            Ae(s => {
              throw ((t._loader$ = void 0), s)
            })
          )
          return (t._loader$ = new sF(i, () => new Ct()).pipe(lC())), t._loader$
        }
        loadModuleFactory (e) {
          return kn(e()).pipe(
            Qe(t =>
              t instanceof pv ? V(t) : Ze(this.compiler.compileModuleAsync(t))
            )
          )
        }
      }
      class QN {
        shouldProcessUrl (e) {
          return !0
        }
        extract (e) {
          return e
        }
        merge (e, t) {
          return e
        }
      }
      function ZN (n) {
        throw n
      }
      function YN (n, e, t) {
        return e.parse('/')
      }
      function iD (n, e) {
        return V(null)
      }
      const XN = {
          paths: 'exact',
          fragment: 'ignored',
          matrixParams: 'ignored',
          queryParams: 'exact'
        },
        JN = {
          paths: 'subset',
          fragment: 'ignored',
          matrixParams: 'ignored',
          queryParams: 'subset'
        }
      let He = (() => {
        class n {
          constructor (t, r, i, s, o, a, l) {
            ;(this.rootComponentType = t),
              (this.urlSerializer = r),
              (this.rootContexts = i),
              (this.location = s),
              (this.config = l),
              (this.lastSuccessfulNavigation = null),
              (this.currentNavigation = null),
              (this.disposed = !1),
              (this.navigationId = 0),
              (this.currentPageId = 0),
              (this.isNgZoneEnabled = !1),
              (this.events = new Ct()),
              (this.errorHandler = ZN),
              (this.malformedUriErrorHandler = YN),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.hooks = {
                beforePreactivation: iD,
                afterPreactivation: iD
              }),
              (this.urlHandlingStrategy = new QN()),
              (this.routeReuseStrategy = new WN()),
              (this.onSameUrlNavigation = 'ignore'),
              (this.paramsInheritanceStrategy = 'emptyOnly'),
              (this.urlUpdateStrategy = 'deferred'),
              (this.relativeLinkResolution = 'corrected'),
              (this.canceledNavigationResolution = 'replace'),
              (this.ngModule = o.get(qn)),
              (this.console = o.get(Zv))
            const d = o.get(pe)
            ;(this.isNgZoneEnabled = d instanceof pe && pe.isInAngularZone()),
              this.resetConfig(l),
              (this.currentUrlTree = (function SF () {
                return new zr(new ee([], {}), {}, null)
              })()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.configLoader = new rD(
                o,
                a,
                f => this.triggerEvent(new hC(f)),
                f => this.triggerEvent(new pC(f))
              )),
              (this.routerState = RC(
                this.currentUrlTree,
                this.rootComponentType
              )),
              (this.transitions = new Ft({
                id: 0,
                targetPageId: 0,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                extractedUrl: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                urlAfterRedirects: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                rawUrl: this.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: 'imperative',
                restoredState: null,
                currentSnapshot: this.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: this.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null
              })),
              (this.navigations = this.setupNavigations(this.transitions)),
              this.processNavigations()
          }
          get browserPageId () {
            var t
            return null === (t = this.location.getState()) || void 0 === t
              ? void 0
              : t.ɵrouterPageId
          }
          setupNavigations (t) {
            const r = this.events
            return t.pipe(
              mr(i => 0 !== i.id),
              ne(i =>
                Object.assign(Object.assign({}, i), {
                  extractedUrl: this.urlHandlingStrategy.extract(i.rawUrl)
                })
              ),
              Nt(i => {
                let s = !1,
                  o = !1
                return V(i).pipe(
                  ue(a => {
                    this.currentNavigation = {
                      id: a.id,
                      initialUrl: a.currentRawUrl,
                      extractedUrl: a.extractedUrl,
                      trigger: a.source,
                      extras: a.extras,
                      previousNavigation: this.lastSuccessfulNavigation
                        ? Object.assign(
                            Object.assign({}, this.lastSuccessfulNavigation),
                            { previousNavigation: null }
                          )
                        : null
                    }
                  }),
                  Nt(a => {
                    const l = this.browserUrlTree.toString(),
                      u =
                        !this.navigated ||
                        a.extractedUrl.toString() !== l ||
                        l !== this.currentUrlTree.toString()
                    if (
                      ('reload' === this.onSameUrlNavigation || u) &&
                      this.urlHandlingStrategy.shouldProcessUrl(a.rawUrl)
                    )
                      return (
                        Ll(a.source) && (this.browserUrlTree = a.extractedUrl),
                        V(a).pipe(
                          Nt(d => {
                            const f = this.transitions.getValue()
                            return (
                              r.next(
                                new xf(
                                  d.id,
                                  this.serializeUrl(d.extractedUrl),
                                  d.source,
                                  d.restoredState
                                )
                              ),
                              f !== this.transitions.getValue()
                                ? ft
                                : Promise.resolve(d)
                            )
                          }),
                          (function bN (n, e, t, r) {
                            return Nt(i =>
                              (function yN (n, e, t, r, i) {
                                return new _N(n, e, t, r, i).apply()
                              })(n, e, t, i.extractedUrl, r).pipe(
                                ne(s =>
                                  Object.assign(Object.assign({}, i), {
                                    urlAfterRedirects: s
                                  })
                                )
                              )
                            )
                          })(
                            this.ngModule.injector,
                            this.configLoader,
                            this.urlSerializer,
                            this.config
                          ),
                          ue(d => {
                            this.currentNavigation = Object.assign(
                              Object.assign({}, this.currentNavigation),
                              { finalUrl: d.urlAfterRedirects }
                            )
                          }),
                          (function jN (n, e, t, r, i) {
                            return Qe(s =>
                              (function NN (
                                n,
                                e,
                                t,
                                r,
                                i = 'emptyOnly',
                                s = 'legacy'
                              ) {
                                try {
                                  const o = new PN(n, e, t, r, i, s).recognize()
                                  return null === o ? ZC(new FN()) : V(o)
                                } catch (o) {
                                  return ZC(o)
                                }
                              })(
                                n,
                                e,
                                s.urlAfterRedirects,
                                t(s.urlAfterRedirects),
                                r,
                                i
                              ).pipe(
                                ne(o =>
                                  Object.assign(Object.assign({}, s), {
                                    targetSnapshot: o
                                  })
                                )
                              )
                            )
                          })(
                            this.rootComponentType,
                            this.config,
                            d => this.serializeUrl(d),
                            this.paramsInheritanceStrategy,
                            this.relativeLinkResolution
                          ),
                          ue(d => {
                            if ('eager' === this.urlUpdateStrategy) {
                              if (!d.extras.skipLocationChange) {
                                const h = this.urlHandlingStrategy.merge(
                                  d.urlAfterRedirects,
                                  d.rawUrl
                                )
                                this.setBrowserUrl(h, d)
                              }
                              this.browserUrlTree = d.urlAfterRedirects
                            }
                            const f = new fF(
                              d.id,
                              this.serializeUrl(d.extractedUrl),
                              this.serializeUrl(d.urlAfterRedirects),
                              d.targetSnapshot
                            )
                            r.next(f)
                          })
                        )
                      )
                    if (
                      u &&
                      this.rawUrlTree &&
                      this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)
                    ) {
                      const {
                          id: f,
                          extractedUrl: h,
                          source: p,
                          restoredState: g,
                          extras: _
                        } = a,
                        v = new xf(f, this.serializeUrl(h), p, g)
                      r.next(v)
                      const m = RC(h, this.rootComponentType).snapshot
                      return V(
                        Object.assign(Object.assign({}, a), {
                          targetSnapshot: m,
                          urlAfterRedirects: h,
                          extras: Object.assign(Object.assign({}, _), {
                            skipLocationChange: !1,
                            replaceUrl: !1
                          })
                        })
                      )
                    }
                    return (this.rawUrlTree = a.rawUrl), a.resolve(null), ft
                  }),
                  Gf(a => {
                    const {
                      targetSnapshot: l,
                      id: u,
                      extractedUrl: c,
                      rawUrl: d,
                      extras: { skipLocationChange: f, replaceUrl: h }
                    } = a
                    return this.hooks.beforePreactivation(l, {
                      navigationId: u,
                      appliedUrlTree: c,
                      rawUrlTree: d,
                      skipLocationChange: !!f,
                      replaceUrl: !!h
                    })
                  }),
                  ue(a => {
                    const l = new hF(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot
                    )
                    this.triggerEvent(l)
                  }),
                  ne(a =>
                    Object.assign(Object.assign({}, a), {
                      guards: CN(
                        a.targetSnapshot,
                        a.currentSnapshot,
                        this.rootContexts
                      )
                    })
                  ),
                  (function MN (n, e) {
                    return Qe(t => {
                      const {
                        targetSnapshot: r,
                        currentSnapshot: i,
                        guards: { canActivateChecks: s, canDeactivateChecks: o }
                      } = t
                      return 0 === o.length && 0 === s.length
                        ? V(
                            Object.assign(Object.assign({}, t), {
                              guardsResult: !0
                            })
                          )
                        : (function AN (n, e, t, r) {
                            return Ze(n).pipe(
                              Qe(i =>
                                (function ON (n, e, t, r, i) {
                                  const s =
                                    e && e.routeConfig
                                      ? e.routeConfig.canDeactivate
                                      : null
                                  return s && 0 !== s.length
                                    ? V(
                                        s.map(a => {
                                          const l = Pl(a, e, i)
                                          let u
                                          if (
                                            (function oN (n) {
                                              return n && _r(n.canDeactivate)
                                            })(l)
                                          )
                                            u = kn(l.canDeactivate(n, e, t, r))
                                          else {
                                            if (!_r(l))
                                              throw new Error(
                                                'Invalid CanDeactivate guard'
                                              )
                                            u = kn(l(n, e, t, r))
                                          }
                                          return u.pipe(rs())
                                        })
                                      ).pipe(So())
                                    : V(!0)
                                })(i.component, i.route, t, e, r)
                              ),
                              rs(i => !0 !== i, !0)
                            )
                          })(o, r, i, n).pipe(
                            Qe(a =>
                              a &&
                              (function nN (n) {
                                return 'boolean' == typeof n
                              })(a)
                                ? (function TN (n, e, t, r) {
                                    return Ze(e).pipe(
                                      ns(i =>
                                        Tf(
                                          (function xN (n, e) {
                                            return (
                                              null !== n && e && e(new yF(n)),
                                              V(!0)
                                            )
                                          })(i.route.parent, r),
                                          (function IN (n, e) {
                                            return (
                                              null !== n && e && e(new vF(n)),
                                              V(!0)
                                            )
                                          })(i.route, r),
                                          (function RN (n, e, t) {
                                            const r = e[e.length - 1],
                                              s = e
                                                .slice(0, e.length - 1)
                                                .reverse()
                                                .map(o =>
                                                  (function DN (n) {
                                                    const e = n.routeConfig
                                                      ? n.routeConfig
                                                          .canActivateChild
                                                      : null
                                                    return e && 0 !== e.length
                                                      ? { node: n, guards: e }
                                                      : null
                                                  })(o)
                                                )
                                                .filter(o => null !== o)
                                                .map(o =>
                                                  aC(() =>
                                                    V(
                                                      o.guards.map(l => {
                                                        const u = Pl(
                                                          l,
                                                          o.node,
                                                          t
                                                        )
                                                        let c
                                                        if (
                                                          (function sN (n) {
                                                            return (
                                                              n &&
                                                              _r(
                                                                n.canActivateChild
                                                              )
                                                            )
                                                          })(u)
                                                        )
                                                          c = kn(
                                                            u.canActivateChild(
                                                              r,
                                                              n
                                                            )
                                                          )
                                                        else {
                                                          if (!_r(u))
                                                            throw new Error(
                                                              'Invalid CanActivateChild guard'
                                                            )
                                                          c = kn(u(r, n))
                                                        }
                                                        return c.pipe(rs())
                                                      })
                                                    ).pipe(So())
                                                  )
                                                )
                                            return V(s).pipe(So())
                                          })(n, i.path, t),
                                          (function kN (n, e, t) {
                                            const r = e.routeConfig
                                              ? e.routeConfig.canActivate
                                              : null
                                            if (!r || 0 === r.length)
                                              return V(!0)
                                            const i = r.map(s =>
                                              aC(() => {
                                                const o = Pl(s, e, t)
                                                let a
                                                if (
                                                  (function iN (n) {
                                                    return (
                                                      n && _r(n.canActivate)
                                                    )
                                                  })(o)
                                                )
                                                  a = kn(o.canActivate(e, n))
                                                else {
                                                  if (!_r(o))
                                                    throw new Error(
                                                      'Invalid CanActivate guard'
                                                    )
                                                  a = kn(o(e, n))
                                                }
                                                return a.pipe(rs())
                                              })
                                            )
                                            return V(i).pipe(So())
                                          })(n, i.route, t)
                                        )
                                      ),
                                      rs(i => !0 !== i, !0)
                                    )
                                  })(r, s, n, e)
                                : V(a)
                            ),
                            ne(a =>
                              Object.assign(Object.assign({}, t), {
                                guardsResult: a
                              })
                            )
                          )
                    })
                  })(this.ngModule.injector, a => this.triggerEvent(a)),
                  ue(a => {
                    if (qr(a.guardsResult)) {
                      const u = kf(
                        `Redirecting to "${this.serializeUrl(a.guardsResult)}"`
                      )
                      throw ((u.url = a.guardsResult), u)
                    }
                    const l = new pF(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot,
                      !!a.guardsResult
                    )
                    this.triggerEvent(l)
                  }),
                  mr(
                    a =>
                      !!a.guardsResult ||
                      (this.restoreHistory(a),
                      this.cancelNavigationTransition(a, ''),
                      !1)
                  ),
                  Gf(a => {
                    if (a.guards.canActivateChecks.length)
                      return V(a).pipe(
                        ue(l => {
                          const u = new gF(
                            l.id,
                            this.serializeUrl(l.extractedUrl),
                            this.serializeUrl(l.urlAfterRedirects),
                            l.targetSnapshot
                          )
                          this.triggerEvent(u)
                        }),
                        Nt(l => {
                          let u = !1
                          return V(l).pipe(
                            (function UN (n, e) {
                              return Qe(t => {
                                const {
                                  targetSnapshot: r,
                                  guards: { canActivateChecks: i }
                                } = t
                                if (!i.length) return V(t)
                                let s = 0
                                return Ze(i).pipe(
                                  ns(o =>
                                    (function HN (n, e, t, r) {
                                      return (function $N (n, e, t, r) {
                                        const i = nD(n)
                                        if (0 === i.length) return V({})
                                        const s = {}
                                        return Ze(i).pipe(
                                          Qe(o =>
                                            (function zN (n, e, t, r) {
                                              const i = Pl(n, e, r)
                                              return kn(
                                                i.resolve
                                                  ? i.resolve(e, t)
                                                  : i(e, t)
                                              )
                                            })(n[o], e, t, r).pipe(
                                              ue(a => {
                                                s[o] = a
                                              })
                                            )
                                          ),
                                          If(1),
                                          Qe(() =>
                                            nD(s).length === i.length
                                              ? V(s)
                                              : ft
                                          )
                                        )
                                      })(n._resolve, n, e, r).pipe(
                                        ne(
                                          s => (
                                            (n._resolvedData = s),
                                            (n.data = Object.assign(
                                              Object.assign({}, n.data),
                                              OC(n, t).resolve
                                            )),
                                            null
                                          )
                                        )
                                      )
                                    })(o.route, r, n, e)
                                  ),
                                  ue(() => s++),
                                  If(1),
                                  Qe(o => (s === i.length ? V(t) : ft))
                                )
                              })
                            })(
                              this.paramsInheritanceStrategy,
                              this.ngModule.injector
                            ),
                            ue({
                              next: () => (u = !0),
                              complete: () => {
                                u ||
                                  (this.restoreHistory(l),
                                  this.cancelNavigationTransition(
                                    l,
                                    "At least one route resolver didn't emit any value."
                                  ))
                              }
                            })
                          )
                        }),
                        ue(l => {
                          const u = new mF(
                            l.id,
                            this.serializeUrl(l.extractedUrl),
                            this.serializeUrl(l.urlAfterRedirects),
                            l.targetSnapshot
                          )
                          this.triggerEvent(u)
                        })
                      )
                  }),
                  Gf(a => {
                    const {
                      targetSnapshot: l,
                      id: u,
                      extractedUrl: c,
                      rawUrl: d,
                      extras: { skipLocationChange: f, replaceUrl: h }
                    } = a
                    return this.hooks.afterPreactivation(l, {
                      navigationId: u,
                      appliedUrlTree: c,
                      rawUrlTree: d,
                      skipLocationChange: !!f,
                      replaceUrl: !!h
                    })
                  }),
                  ne(a => {
                    const l = (function $F (n, e, t) {
                      const r = Do(n, e._root, t ? t._root : void 0)
                      return new kC(r, e)
                    })(
                      this.routeReuseStrategy,
                      a.targetSnapshot,
                      a.currentRouterState
                    )
                    return Object.assign(Object.assign({}, a), {
                      targetRouterState: l
                    })
                  }),
                  ue(a => {
                    ;(this.currentUrlTree = a.urlAfterRedirects),
                      (this.rawUrlTree = this.urlHandlingStrategy.merge(
                        a.urlAfterRedirects,
                        a.rawUrl
                      )),
                      (this.routerState = a.targetRouterState),
                      'deferred' === this.urlUpdateStrategy &&
                        (a.extras.skipLocationChange ||
                          this.setBrowserUrl(this.rawUrlTree, a),
                        (this.browserUrlTree = a.urlAfterRedirects))
                  }),
                  ((n, e, t) =>
                    ne(
                      r => (
                        new eN(
                          e,
                          r.targetRouterState,
                          r.currentRouterState,
                          t
                        ).activate(n),
                        r
                      )
                    ))(this.rootContexts, this.routeReuseStrategy, a =>
                    this.triggerEvent(a)
                  ),
                  ue({
                    next () {
                      s = !0
                    },
                    complete () {
                      s = !0
                    }
                  }),
                  (function cF (n) {
                    return Le((e, t) => {
                      try {
                        e.subscribe(t)
                      } finally {
                        t.add(n)
                      }
                    })
                  })(() => {
                    var a
                    s ||
                      o ||
                      this.cancelNavigationTransition(
                        i,
                        `Navigation ID ${i.id} is not equal to the current navigation id ${this.navigationId}`
                      ),
                      (null === (a = this.currentNavigation) || void 0 === a
                        ? void 0
                        : a.id) === i.id && (this.currentNavigation = null)
                  }),
                  Ae(a => {
                    if (
                      ((o = !0),
                      (function DF (n) {
                        return n && n[mC]
                      })(a))
                    ) {
                      const l = qr(a.url)
                      l || ((this.navigated = !0), this.restoreHistory(i, !0))
                      const u = new fC(
                        i.id,
                        this.serializeUrl(i.extractedUrl),
                        a.message
                      )
                      r.next(u),
                        l
                          ? setTimeout(() => {
                              const c = this.urlHandlingStrategy.merge(
                                  a.url,
                                  this.rawUrlTree
                                ),
                                d = {
                                  skipLocationChange:
                                    i.extras.skipLocationChange,
                                  replaceUrl:
                                    'eager' === this.urlUpdateStrategy ||
                                    Ll(i.source)
                                }
                              this.scheduleNavigation(
                                c,
                                'imperative',
                                null,
                                d,
                                {
                                  resolve: i.resolve,
                                  reject: i.reject,
                                  promise: i.promise
                                }
                              )
                            }, 0)
                          : i.resolve(!1)
                    } else {
                      this.restoreHistory(i, !0)
                      const l = new dF(
                        i.id,
                        this.serializeUrl(i.extractedUrl),
                        a
                      )
                      r.next(l)
                      try {
                        i.resolve(this.errorHandler(a))
                      } catch (u) {
                        i.reject(u)
                      }
                    }
                    return ft
                  })
                )
              })
            )
          }
          resetRootComponentType (t) {
            ;(this.rootComponentType = t),
              (this.routerState.root.component = this.rootComponentType)
          }
          setTransition (t) {
            this.transitions.next(
              Object.assign(Object.assign({}, this.transitions.value), t)
            )
          }
          initialNavigation () {
            this.setUpLocationChangeListener(),
              0 === this.navigationId &&
                this.navigateByUrl(this.location.path(!0), { replaceUrl: !0 })
          }
          setUpLocationChangeListener () {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe(t => {
                const r = 'popstate' === t.type ? 'popstate' : 'hashchange'
                'popstate' === r &&
                  setTimeout(() => {
                    var i
                    const s = { replaceUrl: !0 },
                      o = (
                        null === (i = t.state) || void 0 === i
                          ? void 0
                          : i.navigationId
                      )
                        ? t.state
                        : null
                    if (o) {
                      const l = Object.assign({}, o)
                      delete l.navigationId,
                        delete l.ɵrouterPageId,
                        0 !== Object.keys(l).length && (s.state = l)
                    }
                    const a = this.parseUrl(t.url)
                    this.scheduleNavigation(a, r, o, s)
                  }, 0)
              }))
          }
          get url () {
            return this.serializeUrl(this.currentUrlTree)
          }
          getCurrentNavigation () {
            return this.currentNavigation
          }
          triggerEvent (t) {
            this.events.next(t)
          }
          resetConfig (t) {
            HC(t),
              (this.config = t.map($f)),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1)
          }
          ngOnDestroy () {
            this.dispose()
          }
          dispose () {
            this.transitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0)),
              (this.disposed = !0)
          }
          createUrlTree (t, r = {}) {
            const {
                relativeTo: i,
                queryParams: s,
                fragment: o,
                queryParamsHandling: a,
                preserveFragment: l
              } = r,
              u = i || this.routerState.root,
              c = l ? this.currentUrlTree.fragment : o
            let d = null
            switch (a) {
              case 'merge':
                d = Object.assign(
                  Object.assign({}, this.currentUrlTree.queryParams),
                  s
                )
                break
              case 'preserve':
                d = this.currentUrlTree.queryParams
                break
              default:
                d = s || null
            }
            return (
              null !== d && (d = this.removeEmptyProps(d)),
              (function qF (n, e, t, r, i) {
                if (0 === t.length) return Vf(e.root, e.root, e, r, i)
                const s = (function WF (n) {
                  if ('string' == typeof n[0] && 1 === n.length && '/' === n[0])
                    return new LC(!0, 0, n)
                  let e = 0,
                    t = !1
                  const r = n.reduce((i, s, o) => {
                    if ('object' == typeof s && null != s) {
                      if (s.outlets) {
                        const a = {}
                        return (
                          it(s.outlets, (l, u) => {
                            a[u] = 'string' == typeof l ? l.split('/') : l
                          }),
                          [...i, { outlets: a }]
                        )
                      }
                      if (s.segmentPath) return [...i, s.segmentPath]
                    }
                    return 'string' != typeof s
                      ? [...i, s]
                      : 0 === o
                      ? (s.split('/').forEach((a, l) => {
                          ;(0 == l && '.' === a) ||
                            (0 == l && '' === a
                              ? (t = !0)
                              : '..' === a
                              ? e++
                              : '' != a && i.push(a))
                        }),
                        i)
                      : [...i, s]
                  }, [])
                  return new LC(t, e, r)
                })(t)
                if (s.toRoot()) return Vf(e.root, new ee([], {}), e, r, i)
                const o = (function KF (n, e, t) {
                    if (n.isAbsolute) return new Bf(e.root, !0, 0)
                    if (-1 === t.snapshot._lastPathIndex) {
                      const s = t.snapshot._urlSegment
                      return new Bf(s, s === e.root, 0)
                    }
                    const r = Il(n.commands[0]) ? 0 : 1
                    return (function QF (n, e, t) {
                      let r = n,
                        i = e,
                        s = t
                      for (; s > i; ) {
                        if (((s -= i), (r = r.parent), !r))
                          throw new Error("Invalid number of '../'")
                        i = r.segments.length
                      }
                      return new Bf(r, !1, i - s)
                    })(
                      t.snapshot._urlSegment,
                      t.snapshot._lastPathIndex + r,
                      n.numberOfDoubleDots
                    )
                  })(s, e, n),
                  a = o.processChildren
                    ? xl(o.segmentGroup, o.index, s.commands)
                    : VC(o.segmentGroup, o.index, s.commands)
                return Vf(o.segmentGroup, a, e, r, i)
              })(u, this.currentUrlTree, t, d, null != c ? c : null)
            )
          }
          navigateByUrl (t, r = { skipLocationChange: !1 }) {
            const i = qr(t) ? t : this.parseUrl(t),
              s = this.urlHandlingStrategy.merge(i, this.rawUrlTree)
            return this.scheduleNavigation(s, 'imperative', null, r)
          }
          navigate (t, r = { skipLocationChange: !1 }) {
            return (
              (function eP (n) {
                for (let e = 0; e < n.length; e++) {
                  const t = n[e]
                  if (null == t)
                    throw new Error(
                      `The requested path contains ${t} segment at index ${e}`
                    )
                }
              })(t),
              this.navigateByUrl(this.createUrlTree(t, r), r)
            )
          }
          serializeUrl (t) {
            return this.urlSerializer.serialize(t)
          }
          parseUrl (t) {
            let r
            try {
              r = this.urlSerializer.parse(t)
            } catch (i) {
              r = this.malformedUriErrorHandler(i, this.urlSerializer, t)
            }
            return r
          }
          isActive (t, r) {
            let i
            if (
              ((i =
                !0 === r
                  ? Object.assign({}, XN)
                  : !1 === r
                  ? Object.assign({}, JN)
                  : r),
              qr(t))
            )
              return CC(this.currentUrlTree, t, i)
            const s = this.parseUrl(t)
            return CC(this.currentUrlTree, s, i)
          }
          removeEmptyProps (t) {
            return Object.keys(t).reduce((r, i) => {
              const s = t[i]
              return null != s && (r[i] = s), r
            }, {})
          }
          processNavigations () {
            this.navigations.subscribe(
              t => {
                ;(this.navigated = !0),
                  (this.lastSuccessfulId = t.id),
                  (this.currentPageId = t.targetPageId),
                  this.events.next(
                    new vo(
                      t.id,
                      this.serializeUrl(t.extractedUrl),
                      this.serializeUrl(this.currentUrlTree)
                    )
                  ),
                  (this.lastSuccessfulNavigation = this.currentNavigation),
                  t.resolve(!0)
              },
              t => {
                this.console.warn(`Unhandled Navigation Error: ${t}`)
              }
            )
          }
          scheduleNavigation (t, r, i, s, o) {
            var a, l, u
            if (this.disposed) return Promise.resolve(!1)
            const c = this.transitions.value,
              d = Ll(r) && c && !Ll(c.source),
              f = c.rawUrl.toString() === t.toString(),
              h =
                c.id ===
                (null === (a = this.currentNavigation) || void 0 === a
                  ? void 0
                  : a.id)
            if (d && f && h) return Promise.resolve(!0)
            let g, _, v
            o
              ? ((g = o.resolve), (_ = o.reject), (v = o.promise))
              : (v = new Promise((S, G) => {
                  ;(g = S), (_ = G)
                }))
            const m = ++this.navigationId
            let D
            return (
              'computed' === this.canceledNavigationResolution
                ? (0 === this.currentPageId && (i = this.location.getState()),
                  (D =
                    i && i.ɵrouterPageId
                      ? i.ɵrouterPageId
                      : s.replaceUrl || s.skipLocationChange
                      ? null !== (l = this.browserPageId) && void 0 !== l
                        ? l
                        : 0
                      : (null !== (u = this.browserPageId) && void 0 !== u
                          ? u
                          : 0) + 1))
                : (D = 0),
              this.setTransition({
                id: m,
                targetPageId: D,
                source: r,
                restoredState: i,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.rawUrlTree,
                rawUrl: t,
                extras: s,
                resolve: g,
                reject: _,
                promise: v,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState
              }),
              v.catch(S => Promise.reject(S))
            )
          }
          setBrowserUrl (t, r) {
            const i = this.urlSerializer.serialize(t),
              s = Object.assign(
                Object.assign({}, r.extras.state),
                this.generateNgRouterState(r.id, r.targetPageId)
              )
            this.location.isCurrentPathEqualTo(i) || r.extras.replaceUrl
              ? this.location.replaceState(i, '', s)
              : this.location.go(i, '', s)
          }
          restoreHistory (t, r = !1) {
            var i, s
            if ('computed' === this.canceledNavigationResolution) {
              const o = this.currentPageId - t.targetPageId
              ;('popstate' !== t.source &&
                'eager' !== this.urlUpdateStrategy &&
                this.currentUrlTree !==
                  (null === (i = this.currentNavigation) || void 0 === i
                    ? void 0
                    : i.finalUrl)) ||
              0 === o
                ? this.currentUrlTree ===
                    (null === (s = this.currentNavigation) || void 0 === s
                      ? void 0
                      : s.finalUrl) &&
                  0 === o &&
                  (this.resetState(t),
                  (this.browserUrlTree = t.currentUrlTree),
                  this.resetUrlToCurrentUrlTree())
                : this.location.historyGo(o)
            } else
              'replace' === this.canceledNavigationResolution &&
                (r && this.resetState(t), this.resetUrlToCurrentUrlTree())
          }
          resetState (t) {
            ;(this.routerState = t.currentRouterState),
              (this.currentUrlTree = t.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                t.rawUrl
              ))
          }
          resetUrlToCurrentUrlTree () {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              '',
              this.generateNgRouterState(
                this.lastSuccessfulId,
                this.currentPageId
              )
            )
          }
          cancelNavigationTransition (t, r) {
            const i = new fC(t.id, this.serializeUrl(t.extractedUrl), r)
            this.triggerEvent(i), t.resolve(!1)
          }
          generateNgRouterState (t, r) {
            return 'computed' === this.canceledNavigationResolution
              ? { navigationId: t, ɵrouterPageId: r }
              : { navigationId: t }
          }
        }
        return (
          (n.ɵfac = function (t) {
            _d()
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        )
      })()
      function Ll (n) {
        return 'imperative' !== n
      }
      let Wf = (() => {
          class n {
            constructor (t, r, i, s, o) {
              ;(this.router = t),
                (this.route = r),
                (this.tabIndexAttribute = i),
                (this.renderer = s),
                (this.el = o),
                (this.commands = null),
                (this.onChanges = new Ct()),
                this.setTabIndexIfNotOnNativeEl('0')
            }
            setTabIndexIfNotOnNativeEl (t) {
              if (null != this.tabIndexAttribute) return
              const r = this.renderer,
                i = this.el.nativeElement
              null !== t
                ? r.setAttribute(i, 'tabindex', t)
                : r.removeAttribute(i, 'tabindex')
            }
            ngOnChanges (t) {
              this.onChanges.next(this)
            }
            set routerLink (t) {
              null != t
                ? ((this.commands = Array.isArray(t) ? t : [t]),
                  this.setTabIndexIfNotOnNativeEl('0'))
                : ((this.commands = null),
                  this.setTabIndexIfNotOnNativeEl(null))
            }
            onClick () {
              if (null === this.urlTree) return !0
              const t = {
                skipLocationChange: os(this.skipLocationChange),
                replaceUrl: os(this.replaceUrl),
                state: this.state
              }
              return this.router.navigateByUrl(this.urlTree, t), !0
            }
            get urlTree () {
              return null === this.commands
                ? null
                : this.router.createUrlTree(this.commands, {
                    relativeTo:
                      void 0 !== this.relativeTo ? this.relativeTo : this.route,
                    queryParams: this.queryParams,
                    fragment: this.fragment,
                    queryParamsHandling: this.queryParamsHandling,
                    preserveFragment: os(this.preserveFragment)
                  })
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(y(He), y(yr), ks('tabindex'), y(Gn), y(et))
            }),
            (n.ɵdir = N({
              type: n,
              selectors: [['', 'routerLink', '', 5, 'a', 5, 'area']],
              hostBindings: function (t, r) {
                1 & t &&
                  Ce('click', function () {
                    return r.onClick()
                  })
              },
              inputs: {
                queryParams: 'queryParams',
                fragment: 'fragment',
                queryParamsHandling: 'queryParamsHandling',
                preserveFragment: 'preserveFragment',
                skipLocationChange: 'skipLocationChange',
                replaceUrl: 'replaceUrl',
                state: 'state',
                relativeTo: 'relativeTo',
                routerLink: 'routerLink'
              },
              features: [Gt]
            })),
            n
          )
        })(),
        Vl = (() => {
          class n {
            constructor (t, r, i) {
              ;(this.router = t),
                (this.route = r),
                (this.locationStrategy = i),
                (this.commands = null),
                (this.href = null),
                (this.onChanges = new Ct()),
                (this.subscription = t.events.subscribe(s => {
                  s instanceof vo && this.updateTargetUrlAndHref()
                }))
            }
            set routerLink (t) {
              this.commands = null != t ? (Array.isArray(t) ? t : [t]) : null
            }
            ngOnChanges (t) {
              this.updateTargetUrlAndHref(), this.onChanges.next(this)
            }
            ngOnDestroy () {
              this.subscription.unsubscribe()
            }
            onClick (t, r, i, s, o) {
              if (
                0 !== t ||
                r ||
                i ||
                s ||
                o ||
                ('string' == typeof this.target && '_self' != this.target) ||
                null === this.urlTree
              )
                return !0
              const a = {
                skipLocationChange: os(this.skipLocationChange),
                replaceUrl: os(this.replaceUrl),
                state: this.state
              }
              return this.router.navigateByUrl(this.urlTree, a), !1
            }
            updateTargetUrlAndHref () {
              this.href =
                null !== this.urlTree
                  ? this.locationStrategy.prepareExternalUrl(
                      this.router.serializeUrl(this.urlTree)
                    )
                  : null
            }
            get urlTree () {
              return null === this.commands
                ? null
                : this.router.createUrlTree(this.commands, {
                    relativeTo:
                      void 0 !== this.relativeTo ? this.relativeTo : this.route,
                    queryParams: this.queryParams,
                    fragment: this.fragment,
                    queryParamsHandling: this.queryParamsHandling,
                    preserveFragment: os(this.preserveFragment)
                  })
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(y(He), y(yr), y(ts))
            }),
            (n.ɵdir = N({
              type: n,
              selectors: [
                ['a', 'routerLink', ''],
                ['area', 'routerLink', '']
              ],
              hostVars: 2,
              hostBindings: function (t, r) {
                1 & t &&
                  Ce('click', function (s) {
                    return r.onClick(
                      s.button,
                      s.ctrlKey,
                      s.shiftKey,
                      s.altKey,
                      s.metaKey
                    )
                  }),
                  2 & t && Je('target', r.target)('href', r.href, wi)
              },
              inputs: {
                target: 'target',
                queryParams: 'queryParams',
                fragment: 'fragment',
                queryParamsHandling: 'queryParamsHandling',
                preserveFragment: 'preserveFragment',
                skipLocationChange: 'skipLocationChange',
                replaceUrl: 'replaceUrl',
                state: 'state',
                relativeTo: 'relativeTo',
                routerLink: 'routerLink'
              },
              features: [Gt]
            })),
            n
          )
        })()
      function os (n) {
        return '' === n || !!n
      }
      let sD = (() => {
        class n {
          constructor (t, r, i, s, o, a) {
            ;(this.router = t),
              (this.element = r),
              (this.renderer = i),
              (this.cdr = s),
              (this.link = o),
              (this.linkWithHref = a),
              (this.classes = []),
              (this.isActive = !1),
              (this.routerLinkActiveOptions = { exact: !1 }),
              (this.isActiveChange = new Fe()),
              (this.routerEventsSubscription = t.events.subscribe(l => {
                l instanceof vo && this.update()
              }))
          }
          ngAfterContentInit () {
            V(this.links.changes, this.linksWithHrefs.changes, V(null))
              .pipe(bs())
              .subscribe(t => {
                this.update(), this.subscribeToEachLinkOnChanges()
              })
          }
          subscribeToEachLinkOnChanges () {
            var t
            null === (t = this.linkInputChangesSubscription) ||
              void 0 === t ||
              t.unsubscribe()
            const r = [
              ...this.links.toArray(),
              ...this.linksWithHrefs.toArray(),
              this.link,
              this.linkWithHref
            ]
              .filter(i => !!i)
              .map(i => i.onChanges)
            this.linkInputChangesSubscription = Ze(r)
              .pipe(bs())
              .subscribe(i => {
                this.isActive !== this.isLinkActive(this.router)(i) &&
                  this.update()
              })
          }
          set routerLinkActive (t) {
            const r = Array.isArray(t) ? t : t.split(' ')
            this.classes = r.filter(i => !!i)
          }
          ngOnChanges (t) {
            this.update()
          }
          ngOnDestroy () {
            var t
            this.routerEventsSubscription.unsubscribe(),
              null === (t = this.linkInputChangesSubscription) ||
                void 0 === t ||
                t.unsubscribe()
          }
          update () {
            !this.links ||
              !this.linksWithHrefs ||
              !this.router.navigated ||
              Promise.resolve().then(() => {
                const t = this.hasActiveLinks()
                this.isActive !== t &&
                  ((this.isActive = t),
                  this.cdr.markForCheck(),
                  this.classes.forEach(r => {
                    t
                      ? this.renderer.addClass(this.element.nativeElement, r)
                      : this.renderer.removeClass(this.element.nativeElement, r)
                  }),
                  this.isActiveChange.emit(t))
              })
          }
          isLinkActive (t) {
            const r = (function tP (n) {
              return !!n.paths
            })(this.routerLinkActiveOptions)
              ? this.routerLinkActiveOptions
              : this.routerLinkActiveOptions.exact || !1
            return i => !!i.urlTree && t.isActive(i.urlTree, r)
          }
          hasActiveLinks () {
            const t = this.isLinkActive(this.router)
            return (
              (this.link && t(this.link)) ||
              (this.linkWithHref && t(this.linkWithHref)) ||
              this.links.some(t) ||
              this.linksWithHrefs.some(t)
            )
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(y(He), y(et), y(Gn), y(Ji), y(Wf, 8), y(Vl, 8))
          }),
          (n.ɵdir = N({
            type: n,
            selectors: [['', 'routerLinkActive', '']],
            contentQueries: function (t, r, i) {
              if ((1 & t && (Hd(i, Wf, 5), Hd(i, Vl, 5)), 2 & t)) {
                let s
                Za((s = Ya())) && (r.links = s),
                  Za((s = Ya())) && (r.linksWithHrefs = s)
              }
            },
            inputs: {
              routerLinkActiveOptions: 'routerLinkActiveOptions',
              routerLinkActive: 'routerLinkActive'
            },
            outputs: { isActiveChange: 'isActiveChange' },
            exportAs: ['routerLinkActive'],
            features: [Gt]
          })),
          n
        )
      })()
      class oD {}
      class aD {
        preload (e, t) {
          return V(null)
        }
      }
      let lD = (() => {
          class n {
            constructor (t, r, i, s) {
              ;(this.router = t),
                (this.injector = i),
                (this.preloadingStrategy = s),
                (this.loader = new rD(
                  i,
                  r,
                  l => t.triggerEvent(new hC(l)),
                  l => t.triggerEvent(new pC(l))
                ))
            }
            setUpPreloading () {
              this.subscription = this.router.events
                .pipe(
                  mr(t => t instanceof vo),
                  ns(() => this.preload())
                )
                .subscribe(() => {})
            }
            preload () {
              const t = this.injector.get(qn)
              return this.processRoutes(t, this.router.config)
            }
            ngOnDestroy () {
              this.subscription && this.subscription.unsubscribe()
            }
            processRoutes (t, r) {
              const i = []
              for (const s of r)
                if (s.loadChildren && !s.canLoad && s._loadedConfig) {
                  const o = s._loadedConfig
                  i.push(this.processRoutes(o.module, o.routes))
                } else
                  s.loadChildren && !s.canLoad
                    ? i.push(this.preloadConfig(t, s))
                    : s.children && i.push(this.processRoutes(t, s.children))
              return Ze(i).pipe(
                bs(),
                ne(s => {})
              )
            }
            preloadConfig (t, r) {
              return this.preloadingStrategy.preload(r, () =>
                (r._loadedConfig
                  ? V(r._loadedConfig)
                  : this.loader.load(t.injector, r)
                ).pipe(
                  Qe(
                    s => (
                      (r._loadedConfig = s),
                      this.processRoutes(s.module, s.routes)
                    )
                  )
                )
              )
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(C(He), C(nl), C(rt), C(oD))
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          )
        })(),
        Kf = (() => {
          class n {
            constructor (t, r, i = {}) {
              ;(this.router = t),
                (this.viewportScroller = r),
                (this.options = i),
                (this.lastId = 0),
                (this.lastSource = 'imperative'),
                (this.restoredId = 0),
                (this.store = {}),
                (i.scrollPositionRestoration =
                  i.scrollPositionRestoration || 'disabled'),
                (i.anchorScrolling = i.anchorScrolling || 'disabled')
            }
            init () {
              'disabled' !== this.options.scrollPositionRestoration &&
                this.viewportScroller.setHistoryScrollRestoration('manual'),
                (this.routerEventsSubscription = this.createScrollEvents()),
                (this.scrollEventsSubscription = this.consumeScrollEvents())
            }
            createScrollEvents () {
              return this.router.events.subscribe(t => {
                t instanceof xf
                  ? ((this.store[this.lastId] =
                      this.viewportScroller.getScrollPosition()),
                    (this.lastSource = t.navigationTrigger),
                    (this.restoredId = t.restoredState
                      ? t.restoredState.navigationId
                      : 0))
                  : t instanceof vo &&
                    ((this.lastId = t.id),
                    this.scheduleScrollEvent(
                      t,
                      this.router.parseUrl(t.urlAfterRedirects).fragment
                    ))
              })
            }
            consumeScrollEvents () {
              return this.router.events.subscribe(t => {
                t instanceof gC &&
                  (t.position
                    ? 'top' === this.options.scrollPositionRestoration
                      ? this.viewportScroller.scrollToPosition([0, 0])
                      : 'enabled' === this.options.scrollPositionRestoration &&
                        this.viewportScroller.scrollToPosition(t.position)
                    : t.anchor && 'enabled' === this.options.anchorScrolling
                    ? this.viewportScroller.scrollToAnchor(t.anchor)
                    : 'disabled' !== this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition([0, 0]))
              })
            }
            scheduleScrollEvent (t, r) {
              this.router.triggerEvent(
                new gC(
                  t,
                  'popstate' === this.lastSource
                    ? this.store[this.restoredId]
                    : null,
                  r
                )
              )
            }
            ngOnDestroy () {
              this.routerEventsSubscription &&
                this.routerEventsSubscription.unsubscribe(),
                this.scrollEventsSubscription &&
                  this.scrollEventsSubscription.unsubscribe()
            }
          }
          return (
            (n.ɵfac = function (t) {
              _d()
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          )
        })()
      const Wr = new x('ROUTER_CONFIGURATION'),
        uD = new x('ROUTER_FORROOT_GUARD'),
        rP = [
          uf,
          { provide: SC, useClass: MC },
          {
            provide: He,
            useFactory: function lP (n, e, t, r, i, s, o = {}, a, l) {
              const u = new He(null, n, e, t, r, i, _C(s))
              return (
                a && (u.urlHandlingStrategy = a),
                l && (u.routeReuseStrategy = l),
                (function uP (n, e) {
                  n.errorHandler && (e.errorHandler = n.errorHandler),
                    n.malformedUriErrorHandler &&
                      (e.malformedUriErrorHandler = n.malformedUriErrorHandler),
                    n.onSameUrlNavigation &&
                      (e.onSameUrlNavigation = n.onSameUrlNavigation),
                    n.paramsInheritanceStrategy &&
                      (e.paramsInheritanceStrategy =
                        n.paramsInheritanceStrategy),
                    n.relativeLinkResolution &&
                      (e.relativeLinkResolution = n.relativeLinkResolution),
                    n.urlUpdateStrategy &&
                      (e.urlUpdateStrategy = n.urlUpdateStrategy),
                    n.canceledNavigationResolution &&
                      (e.canceledNavigationResolution =
                        n.canceledNavigationResolution)
                })(o, u),
                o.enableTracing &&
                  u.events.subscribe(c => {
                    var d, f
                    null === (d = console.group) ||
                      void 0 === d ||
                      d.call(console, `Router Event: ${c.constructor.name}`),
                      console.log(c.toString()),
                      console.log(c),
                      null === (f = console.groupEnd) ||
                        void 0 === f ||
                        f.call(console)
                  }),
                u
              )
            },
            deps: [
              SC,
              Mo,
              uf,
              rt,
              nl,
              qf,
              Wr,
              [class KN {}, new bn()],
              [class GN {}, new bn()]
            ]
          },
          Mo,
          {
            provide: yr,
            useFactory: function cP (n) {
              return n.routerState.root
            },
            deps: [He]
          },
          lD,
          aD,
          class nP {
            preload (e, t) {
              return t().pipe(Ae(() => V(null)))
            }
          },
          { provide: Wr, useValue: { enableTracing: !1 } }
        ]
      function iP () {
        return new nb('Router', He)
      }
      let cD = (() => {
        class n {
          constructor (t, r) {}
          static forRoot (t, r) {
            return {
              ngModule: n,
              providers: [
                rP,
                dD(t),
                {
                  provide: uD,
                  useFactory: aP,
                  deps: [[He, new bn(), new Ci()]]
                },
                { provide: Wr, useValue: r || {} },
                {
                  provide: ts,
                  useFactory: oP,
                  deps: [Hr, [new Vs(lf), new bn()], Wr]
                },
                { provide: Kf, useFactory: sP, deps: [He, fO, Wr] },
                {
                  provide: oD,
                  useExisting:
                    r && r.preloadingStrategy ? r.preloadingStrategy : aD
                },
                { provide: nb, multi: !0, useFactory: iP },
                [
                  Qf,
                  { provide: tl, multi: !0, useFactory: dP, deps: [Qf] },
                  { provide: fD, useFactory: fP, deps: [Qf] },
                  { provide: Qv, multi: !0, useExisting: fD }
                ]
              ]
            }
          }
          static forChild (t) {
            return { ngModule: n, providers: [dD(t)] }
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(uD, 8), C(He, 8))
          }),
          (n.ɵmod = Ye({ type: n })),
          (n.ɵinj = ze({})),
          n
        )
      })()
      function sP (n, e, t) {
        return t.scrollOffset && e.setOffset(t.scrollOffset), new Kf(n, e, t)
      }
      function oP (n, e, t = {}) {
        return t.useHash ? new Y1(n, e) : new Db(n, e)
      }
      function aP (n) {
        return 'guarded'
      }
      function dD (n) {
        return [
          { provide: xS, multi: !0, useValue: n },
          { provide: qf, multi: !0, useValue: n }
        ]
      }
      let Qf = (() => {
        class n {
          constructor (t) {
            ;(this.injector = t),
              (this.initNavigation = !1),
              (this.destroyed = !1),
              (this.resultOfPreactivationDone = new Ct())
          }
          appInitializer () {
            return this.injector.get(K1, Promise.resolve(null)).then(() => {
              if (this.destroyed) return Promise.resolve(!0)
              let r = null
              const i = new Promise(a => (r = a)),
                s = this.injector.get(He),
                o = this.injector.get(Wr)
              return (
                'disabled' === o.initialNavigation
                  ? (s.setUpLocationChangeListener(), r(!0))
                  : 'enabled' === o.initialNavigation ||
                    'enabledBlocking' === o.initialNavigation
                  ? ((s.hooks.afterPreactivation = () =>
                      this.initNavigation
                        ? V(null)
                        : ((this.initNavigation = !0),
                          r(!0),
                          this.resultOfPreactivationDone)),
                    s.initialNavigation())
                  : r(!0),
                i
              )
            })
          }
          bootstrapListener (t) {
            const r = this.injector.get(Wr),
              i = this.injector.get(lD),
              s = this.injector.get(Kf),
              o = this.injector.get(He),
              a = this.injector.get(fo)
            t === a.components[0] &&
              (('enabledNonBlocking' === r.initialNavigation ||
                void 0 === r.initialNavigation) &&
                o.initialNavigation(),
              i.setUpPreloading(),
              s.init(),
              o.resetRootComponentType(a.componentTypes[0]),
              this.resultOfPreactivationDone.next(null),
              this.resultOfPreactivationDone.complete())
          }
          ngOnDestroy () {
            this.destroyed = !0
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(rt))
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        )
      })()
      function dP (n) {
        return n.appInitializer.bind(n)
      }
      function fP (n) {
        return n.bootstrapListener.bind(n)
      }
      const fD = new x('Router Initializer')
      function Kr (n, e) {
        const t = ge(n) ? n : () => n,
          r = i => i.error(t())
        return new me(e ? i => e.schedule(r, 0, i) : r)
      }
      function hD (n) {
        return ne(() => n)
      }
      class pD {}
      class gD {}
      class tr {
        constructor (e) {
          ;(this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            e
              ? (this.lazyInit =
                  'string' == typeof e
                    ? () => {
                        ;(this.headers = new Map()),
                          e.split('\n').forEach(t => {
                            const r = t.indexOf(':')
                            if (r > 0) {
                              const i = t.slice(0, r),
                                s = i.toLowerCase(),
                                o = t.slice(r + 1).trim()
                              this.maybeSetNormalizedName(i, s),
                                this.headers.has(s)
                                  ? this.headers.get(s).push(o)
                                  : this.headers.set(s, [o])
                            }
                          })
                      }
                    : () => {
                        ;(this.headers = new Map()),
                          Object.keys(e).forEach(t => {
                            let r = e[t]
                            const i = t.toLowerCase()
                            'string' == typeof r && (r = [r]),
                              r.length > 0 &&
                                (this.headers.set(i, r),
                                this.maybeSetNormalizedName(t, i))
                          })
                      })
              : (this.headers = new Map())
        }
        has (e) {
          return this.init(), this.headers.has(e.toLowerCase())
        }
        get (e) {
          this.init()
          const t = this.headers.get(e.toLowerCase())
          return t && t.length > 0 ? t[0] : null
        }
        keys () {
          return this.init(), Array.from(this.normalizedNames.values())
        }
        getAll (e) {
          return this.init(), this.headers.get(e.toLowerCase()) || null
        }
        append (e, t) {
          return this.clone({ name: e, value: t, op: 'a' })
        }
        set (e, t) {
          return this.clone({ name: e, value: t, op: 's' })
        }
        delete (e, t) {
          return this.clone({ name: e, value: t, op: 'd' })
        }
        maybeSetNormalizedName (e, t) {
          this.normalizedNames.has(t) || this.normalizedNames.set(t, e)
        }
        init () {
          this.lazyInit &&
            (this.lazyInit instanceof tr
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach(e => this.applyUpdate(e)),
              (this.lazyUpdate = null)))
        }
        copyFrom (e) {
          e.init(),
            Array.from(e.headers.keys()).forEach(t => {
              this.headers.set(t, e.headers.get(t)),
                this.normalizedNames.set(t, e.normalizedNames.get(t))
            })
        }
        clone (e) {
          const t = new tr()
          return (
            (t.lazyInit =
              this.lazyInit && this.lazyInit instanceof tr
                ? this.lazyInit
                : this),
            (t.lazyUpdate = (this.lazyUpdate || []).concat([e])),
            t
          )
        }
        applyUpdate (e) {
          const t = e.name.toLowerCase()
          switch (e.op) {
            case 'a':
            case 's':
              let r = e.value
              if (('string' == typeof r && (r = [r]), 0 === r.length)) return
              this.maybeSetNormalizedName(e.name, t)
              const i = ('a' === e.op ? this.headers.get(t) : void 0) || []
              i.push(...r), this.headers.set(t, i)
              break
            case 'd':
              const s = e.value
              if (s) {
                let o = this.headers.get(t)
                if (!o) return
                ;(o = o.filter(a => -1 === s.indexOf(a))),
                  0 === o.length
                    ? (this.headers.delete(t), this.normalizedNames.delete(t))
                    : this.headers.set(t, o)
              } else this.headers.delete(t), this.normalizedNames.delete(t)
          }
        }
        forEach (e) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach(t =>
              e(this.normalizedNames.get(t), this.headers.get(t))
            )
        }
      }
      class pP {
        encodeKey (e) {
          return mD(e)
        }
        encodeValue (e) {
          return mD(e)
        }
        decodeKey (e) {
          return decodeURIComponent(e)
        }
        decodeValue (e) {
          return decodeURIComponent(e)
        }
      }
      const mP = /%(\d[a-f0-9])/gi,
        yP = {
          40: '@',
          '3A': ':',
          24: '$',
          '2C': ',',
          '3B': ';',
          '2B': '+',
          '3D': '=',
          '3F': '?',
          '2F': '/'
        }
      function mD (n) {
        return encodeURIComponent(n).replace(mP, (e, t) => {
          var r
          return null !== (r = yP[t]) && void 0 !== r ? r : e
        })
      }
      function yD (n) {
        return `${n}`
      }
      class vr {
        constructor (e = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = e.encoder || new pP()),
            e.fromString)
          ) {
            if (e.fromObject)
              throw new Error('Cannot specify both fromString and fromObject.')
            this.map = (function gP (n, e) {
              const t = new Map()
              return (
                n.length > 0 &&
                  n
                    .replace(/^\?/, '')
                    .split('&')
                    .forEach(i => {
                      const s = i.indexOf('='),
                        [o, a] =
                          -1 == s
                            ? [e.decodeKey(i), '']
                            : [
                                e.decodeKey(i.slice(0, s)),
                                e.decodeValue(i.slice(s + 1))
                              ],
                        l = t.get(o) || []
                      l.push(a), t.set(o, l)
                    }),
                t
              )
            })(e.fromString, this.encoder)
          } else
            e.fromObject
              ? ((this.map = new Map()),
                Object.keys(e.fromObject).forEach(t => {
                  const r = e.fromObject[t]
                  this.map.set(t, Array.isArray(r) ? r : [r])
                }))
              : (this.map = null)
        }
        has (e) {
          return this.init(), this.map.has(e)
        }
        get (e) {
          this.init()
          const t = this.map.get(e)
          return t ? t[0] : null
        }
        getAll (e) {
          return this.init(), this.map.get(e) || null
        }
        keys () {
          return this.init(), Array.from(this.map.keys())
        }
        append (e, t) {
          return this.clone({ param: e, value: t, op: 'a' })
        }
        appendAll (e) {
          const t = []
          return (
            Object.keys(e).forEach(r => {
              const i = e[r]
              Array.isArray(i)
                ? i.forEach(s => {
                    t.push({ param: r, value: s, op: 'a' })
                  })
                : t.push({ param: r, value: i, op: 'a' })
            }),
            this.clone(t)
          )
        }
        set (e, t) {
          return this.clone({ param: e, value: t, op: 's' })
        }
        delete (e, t) {
          return this.clone({ param: e, value: t, op: 'd' })
        }
        toString () {
          return (
            this.init(),
            this.keys()
              .map(e => {
                const t = this.encoder.encodeKey(e)
                return this.map
                  .get(e)
                  .map(r => t + '=' + this.encoder.encodeValue(r))
                  .join('&')
              })
              .filter(e => '' !== e)
              .join('&')
          )
        }
        clone (e) {
          const t = new vr({ encoder: this.encoder })
          return (
            (t.cloneFrom = this.cloneFrom || this),
            (t.updates = (this.updates || []).concat(e)),
            t
          )
        }
        init () {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach(e => this.map.set(e, this.cloneFrom.map.get(e))),
              this.updates.forEach(e => {
                switch (e.op) {
                  case 'a':
                  case 's':
                    const t =
                      ('a' === e.op ? this.map.get(e.param) : void 0) || []
                    t.push(yD(e.value)), this.map.set(e.param, t)
                    break
                  case 'd':
                    if (void 0 === e.value) {
                      this.map.delete(e.param)
                      break
                    }
                    {
                      let r = this.map.get(e.param) || []
                      const i = r.indexOf(yD(e.value))
                      ;-1 !== i && r.splice(i, 1),
                        r.length > 0
                          ? this.map.set(e.param, r)
                          : this.map.delete(e.param)
                    }
                }
              }),
              (this.cloneFrom = this.updates = null))
        }
      }
      class _P {
        constructor () {
          this.map = new Map()
        }
        set (e, t) {
          return this.map.set(e, t), this
        }
        get (e) {
          return (
            this.map.has(e) || this.map.set(e, e.defaultValue()),
            this.map.get(e)
          )
        }
        delete (e) {
          return this.map.delete(e), this
        }
        has (e) {
          return this.map.has(e)
        }
        keys () {
          return this.map.keys()
        }
      }
      function _D (n) {
        return 'undefined' != typeof ArrayBuffer && n instanceof ArrayBuffer
      }
      function vD (n) {
        return 'undefined' != typeof Blob && n instanceof Blob
      }
      function bD (n) {
        return 'undefined' != typeof FormData && n instanceof FormData
      }
      class xo {
        constructor (e, t, r, i) {
          let s
          if (
            ((this.url = t),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = 'json'),
            (this.method = e.toUpperCase()),
            (function vP (n) {
              switch (n) {
                case 'DELETE':
                case 'GET':
                case 'HEAD':
                case 'OPTIONS':
                case 'JSONP':
                  return !1
                default:
                  return !0
              }
            })(this.method) || i
              ? ((this.body = void 0 !== r ? r : null), (s = i))
              : (s = r),
            s &&
              ((this.reportProgress = !!s.reportProgress),
              (this.withCredentials = !!s.withCredentials),
              s.responseType && (this.responseType = s.responseType),
              s.headers && (this.headers = s.headers),
              s.context && (this.context = s.context),
              s.params && (this.params = s.params)),
            this.headers || (this.headers = new tr()),
            this.context || (this.context = new _P()),
            this.params)
          ) {
            const o = this.params.toString()
            if (0 === o.length) this.urlWithParams = t
            else {
              const a = t.indexOf('?')
              this.urlWithParams =
                t + (-1 === a ? '?' : a < t.length - 1 ? '&' : '') + o
            }
          } else (this.params = new vr()), (this.urlWithParams = t)
        }
        serializeBody () {
          return null === this.body
            ? null
            : _D(this.body) ||
              vD(this.body) ||
              bD(this.body) ||
              (function bP (n) {
                return (
                  'undefined' != typeof URLSearchParams &&
                  n instanceof URLSearchParams
                )
              })(this.body) ||
              'string' == typeof this.body
            ? this.body
            : this.body instanceof vr
            ? this.body.toString()
            : 'object' == typeof this.body ||
              'boolean' == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString()
        }
        detectContentTypeHeader () {
          return null === this.body || bD(this.body)
            ? null
            : vD(this.body)
            ? this.body.type || null
            : _D(this.body)
            ? null
            : 'string' == typeof this.body
            ? 'text/plain'
            : this.body instanceof vr
            ? 'application/x-www-form-urlencoded;charset=UTF-8'
            : 'object' == typeof this.body ||
              'number' == typeof this.body ||
              'boolean' == typeof this.body
            ? 'application/json'
            : null
        }
        clone (e = {}) {
          var t
          const r = e.method || this.method,
            i = e.url || this.url,
            s = e.responseType || this.responseType,
            o = void 0 !== e.body ? e.body : this.body,
            a =
              void 0 !== e.withCredentials
                ? e.withCredentials
                : this.withCredentials,
            l =
              void 0 !== e.reportProgress
                ? e.reportProgress
                : this.reportProgress
          let u = e.headers || this.headers,
            c = e.params || this.params
          const d = null !== (t = e.context) && void 0 !== t ? t : this.context
          return (
            void 0 !== e.setHeaders &&
              (u = Object.keys(e.setHeaders).reduce(
                (f, h) => f.set(h, e.setHeaders[h]),
                u
              )),
            e.setParams &&
              (c = Object.keys(e.setParams).reduce(
                (f, h) => f.set(h, e.setParams[h]),
                c
              )),
            new xo(r, i, o, {
              params: c,
              headers: u,
              context: d,
              reportProgress: l,
              responseType: s,
              withCredentials: a
            })
          )
        }
      }
      var $e = (() => (
        (($e = $e || {})[($e.Sent = 0)] = 'Sent'),
        ($e[($e.UploadProgress = 1)] = 'UploadProgress'),
        ($e[($e.ResponseHeader = 2)] = 'ResponseHeader'),
        ($e[($e.DownloadProgress = 3)] = 'DownloadProgress'),
        ($e[($e.Response = 4)] = 'Response'),
        ($e[($e.User = 5)] = 'User'),
        $e
      ))()
      class Zf {
        constructor (e, t = 200, r = 'OK') {
          ;(this.headers = e.headers || new tr()),
            (this.status = void 0 !== e.status ? e.status : t),
            (this.statusText = e.statusText || r),
            (this.url = e.url || null),
            (this.ok = this.status >= 200 && this.status < 300)
        }
      }
      class Yf extends Zf {
        constructor (e = {}) {
          super(e), (this.type = $e.ResponseHeader)
        }
        clone (e = {}) {
          return new Yf({
            headers: e.headers || this.headers,
            status: void 0 !== e.status ? e.status : this.status,
            statusText: e.statusText || this.statusText,
            url: e.url || this.url || void 0
          })
        }
      }
      class Bl extends Zf {
        constructor (e = {}) {
          super(e),
            (this.type = $e.Response),
            (this.body = void 0 !== e.body ? e.body : null)
        }
        clone (e = {}) {
          return new Bl({
            body: void 0 !== e.body ? e.body : this.body,
            headers: e.headers || this.headers,
            status: void 0 !== e.status ? e.status : this.status,
            statusText: e.statusText || this.statusText,
            url: e.url || this.url || void 0
          })
        }
      }
      class CD extends Zf {
        constructor (e) {
          super(e, 0, 'Unknown Error'),
            (this.name = 'HttpErrorResponse'),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${e.url || '(unknown url)'}`
                : `Http failure response for ${e.url || '(unknown url)'}: ${
                    e.status
                  } ${e.statusText}`),
            (this.error = e.error || null)
        }
      }
      function Xf (n, e) {
        return {
          body: e,
          headers: n.headers,
          context: n.context,
          observe: n.observe,
          params: n.params,
          reportProgress: n.reportProgress,
          responseType: n.responseType,
          withCredentials: n.withCredentials
        }
      }
      let Jf = (() => {
        class n {
          constructor (t) {
            this.handler = t
          }
          request (t, r, i = {}) {
            let s
            if (t instanceof xo) s = t
            else {
              let l, u
              ;(l = i.headers instanceof tr ? i.headers : new tr(i.headers)),
                i.params &&
                  (u =
                    i.params instanceof vr
                      ? i.params
                      : new vr({ fromObject: i.params })),
                (s = new xo(t, r, void 0 !== i.body ? i.body : null, {
                  headers: l,
                  context: i.context,
                  params: u,
                  reportProgress: i.reportProgress,
                  responseType: i.responseType || 'json',
                  withCredentials: i.withCredentials
                }))
            }
            const o = V(s).pipe(ns(l => this.handler.handle(l)))
            if (t instanceof xo || 'events' === i.observe) return o
            const a = o.pipe(mr(l => l instanceof Bl))
            switch (i.observe || 'body') {
              case 'body':
                switch (s.responseType) {
                  case 'arraybuffer':
                    return a.pipe(
                      ne(l => {
                        if (null !== l.body && !(l.body instanceof ArrayBuffer))
                          throw new Error('Response is not an ArrayBuffer.')
                        return l.body
                      })
                    )
                  case 'blob':
                    return a.pipe(
                      ne(l => {
                        if (null !== l.body && !(l.body instanceof Blob))
                          throw new Error('Response is not a Blob.')
                        return l.body
                      })
                    )
                  case 'text':
                    return a.pipe(
                      ne(l => {
                        if (null !== l.body && 'string' != typeof l.body)
                          throw new Error('Response is not a string.')
                        return l.body
                      })
                    )
                  default:
                    return a.pipe(ne(l => l.body))
                }
              case 'response':
                return a
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${i.observe}}`
                )
            }
          }
          delete (t, r = {}) {
            return this.request('DELETE', t, r)
          }
          get (t, r = {}) {
            return this.request('GET', t, r)
          }
          head (t, r = {}) {
            return this.request('HEAD', t, r)
          }
          jsonp (t, r) {
            return this.request('JSONP', t, {
              params: new vr().append(r, 'JSONP_CALLBACK'),
              observe: 'body',
              responseType: 'json'
            })
          }
          options (t, r = {}) {
            return this.request('OPTIONS', t, r)
          }
          patch (t, r, i = {}) {
            return this.request('PATCH', t, Xf(i, r))
          }
          post (t, r, i = {}) {
            return this.request('POST', t, Xf(i, r))
          }
          put (t, r, i = {}) {
            return this.request('PUT', t, Xf(i, r))
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(pD))
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        )
      })()
      class DD {
        constructor (e, t) {
          ;(this.next = e), (this.interceptor = t)
        }
        handle (e) {
          return this.interceptor.intercept(e, this.next)
        }
      }
      const eh = new x('HTTP_INTERCEPTORS')
      let CP = (() => {
        class n {
          intercept (t, r) {
            return r.handle(t)
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)()
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        )
      })()
      const DP = /^\)\]\}',?\n/
      let ED = (() => {
        class n {
          constructor (t) {
            this.xhrFactory = t
          }
          handle (t) {
            if ('JSONP' === t.method)
              throw new Error(
                'Attempted to construct Jsonp request without HttpClientJsonpModule installed.'
              )
            return new me(r => {
              const i = this.xhrFactory.build()
              if (
                (i.open(t.method, t.urlWithParams),
                t.withCredentials && (i.withCredentials = !0),
                t.headers.forEach((h, p) => i.setRequestHeader(h, p.join(','))),
                t.headers.has('Accept') ||
                  i.setRequestHeader(
                    'Accept',
                    'application/json, text/plain, */*'
                  ),
                !t.headers.has('Content-Type'))
              ) {
                const h = t.detectContentTypeHeader()
                null !== h && i.setRequestHeader('Content-Type', h)
              }
              if (t.responseType) {
                const h = t.responseType.toLowerCase()
                i.responseType = 'json' !== h ? h : 'text'
              }
              const s = t.serializeBody()
              let o = null
              const a = () => {
                  if (null !== o) return o
                  const h = i.statusText || 'OK',
                    p = new tr(i.getAllResponseHeaders()),
                    g =
                      (function EP (n) {
                        return 'responseURL' in n && n.responseURL
                          ? n.responseURL
                          : /^X-Request-URL:/m.test(n.getAllResponseHeaders())
                          ? n.getResponseHeader('X-Request-URL')
                          : null
                      })(i) || t.url
                  return (
                    (o = new Yf({
                      headers: p,
                      status: i.status,
                      statusText: h,
                      url: g
                    })),
                    o
                  )
                },
                l = () => {
                  let { headers: h, status: p, statusText: g, url: _ } = a(),
                    v = null
                  204 !== p &&
                    (v = void 0 === i.response ? i.responseText : i.response),
                    0 === p && (p = v ? 200 : 0)
                  let m = p >= 200 && p < 300
                  if ('json' === t.responseType && 'string' == typeof v) {
                    const D = v
                    v = v.replace(DP, '')
                    try {
                      v = '' !== v ? JSON.parse(v) : null
                    } catch (S) {
                      ;(v = D), m && ((m = !1), (v = { error: S, text: v }))
                    }
                  }
                  m
                    ? (r.next(
                        new Bl({
                          body: v,
                          headers: h,
                          status: p,
                          statusText: g,
                          url: _ || void 0
                        })
                      ),
                      r.complete())
                    : r.error(
                        new CD({
                          error: v,
                          headers: h,
                          status: p,
                          statusText: g,
                          url: _ || void 0
                        })
                      )
                },
                u = h => {
                  const { url: p } = a(),
                    g = new CD({
                      error: h,
                      status: i.status || 0,
                      statusText: i.statusText || 'Unknown Error',
                      url: p || void 0
                    })
                  r.error(g)
                }
              let c = !1
              const d = h => {
                  c || (r.next(a()), (c = !0))
                  let p = { type: $e.DownloadProgress, loaded: h.loaded }
                  h.lengthComputable && (p.total = h.total),
                    'text' === t.responseType &&
                      !!i.responseText &&
                      (p.partialText = i.responseText),
                    r.next(p)
                },
                f = h => {
                  let p = { type: $e.UploadProgress, loaded: h.loaded }
                  h.lengthComputable && (p.total = h.total), r.next(p)
                }
              return (
                i.addEventListener('load', l),
                i.addEventListener('error', u),
                i.addEventListener('timeout', u),
                i.addEventListener('abort', u),
                t.reportProgress &&
                  (i.addEventListener('progress', d),
                  null !== s &&
                    i.upload &&
                    i.upload.addEventListener('progress', f)),
                i.send(s),
                r.next({ type: $e.Sent }),
                () => {
                  i.removeEventListener('error', u),
                    i.removeEventListener('abort', u),
                    i.removeEventListener('load', l),
                    i.removeEventListener('timeout', u),
                    t.reportProgress &&
                      (i.removeEventListener('progress', d),
                      null !== s &&
                        i.upload &&
                        i.upload.removeEventListener('progress', f)),
                    i.readyState !== i.DONE && i.abort()
                }
              )
            })
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C($b))
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        )
      })()
      const th = new x('XSRF_COOKIE_NAME'),
        nh = new x('XSRF_HEADER_NAME')
      class wD {}
      let sh,
        wP = (() => {
          class n {
            constructor (t, r, i) {
              ;(this.doc = t),
                (this.platform = r),
                (this.cookieName = i),
                (this.lastCookieString = ''),
                (this.lastToken = null),
                (this.parseCount = 0)
            }
            getToken () {
              if ('server' === this.platform) return null
              const t = this.doc.cookie || ''
              return (
                t !== this.lastCookieString &&
                  (this.parseCount++,
                  (this.lastToken = Rb(t, this.cookieName)),
                  (this.lastCookieString = t)),
                this.lastToken
              )
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(C(Se), C(co), C(th))
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          )
        })(),
        rh = (() => {
          class n {
            constructor (t, r) {
              ;(this.tokenService = t), (this.headerName = r)
            }
            intercept (t, r) {
              const i = t.url.toLowerCase()
              if (
                'GET' === t.method ||
                'HEAD' === t.method ||
                i.startsWith('http://') ||
                i.startsWith('https://')
              )
                return r.handle(t)
              const s = this.tokenService.getToken()
              return (
                null !== s &&
                  !t.headers.has(this.headerName) &&
                  (t = t.clone({ headers: t.headers.set(this.headerName, s) })),
                r.handle(t)
              )
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(C(wD), C(nh))
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          )
        })(),
        SP = (() => {
          class n {
            constructor (t, r) {
              ;(this.backend = t), (this.injector = r), (this.chain = null)
            }
            handle (t) {
              if (null === this.chain) {
                const r = this.injector.get(eh, [])
                this.chain = r.reduceRight((i, s) => new DD(i, s), this.backend)
              }
              return this.chain.handle(t)
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(C(gD), C(rt))
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          )
        })(),
        MP = (() => {
          class n {
            static disable () {
              return { ngModule: n, providers: [{ provide: rh, useClass: CP }] }
            }
            static withOptions (t = {}) {
              return {
                ngModule: n,
                providers: [
                  t.cookieName ? { provide: th, useValue: t.cookieName } : [],
                  t.headerName ? { provide: nh, useValue: t.headerName } : []
                ]
              }
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)()
            }),
            (n.ɵmod = Ye({ type: n })),
            (n.ɵinj = ze({
              providers: [
                rh,
                { provide: eh, useExisting: rh, multi: !0 },
                { provide: wD, useClass: wP },
                { provide: th, useValue: 'XSRF-TOKEN' },
                { provide: nh, useValue: 'X-XSRF-TOKEN' }
              ]
            })),
            n
          )
        })(),
        AP = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)()
            }),
            (n.ɵmod = Ye({ type: n })),
            (n.ɵinj = ze({
              providers: [
                Jf,
                { provide: pD, useClass: SP },
                ED,
                { provide: gD, useExisting: ED }
              ],
              imports: [
                [
                  MP.withOptions({
                    cookieName: 'XSRF-TOKEN',
                    headerName: 'X-XSRF-TOKEN'
                  })
                ]
              ]
            })),
            n
          )
        })(),
        br = (() => {
          class n {
            constructor (t, r) {
              ;(this.http = t),
                (this.router = r),
                (this.isAuth$ = new Ft(!1)),
                (this.authToken = ''),
                (this.userId = '')
            }
            createUser (t, r) {
              return this.http.post(
                'https://piiquantes-backend.vercel.app/api/auth/signup',
                { email: t, password: r }
              )
            }
            getToken () {
              return this.authToken
            }
            getUserId () {
              return this.userId
            }
            loginUser (t, r) {
              return this.http
                .post('https://piiquantes-backend.vercel.app/api/auth/login', {
                  email: t,
                  password: r
                })
                .pipe(
                  ue(({ userId: i, token: s }) => {
                    ;(this.userId = i),
                      (this.authToken = s),
                      this.isAuth$.next(!0)
                  })
                )
            }
            logout () {
              ;(this.authToken = ''),
                (this.userId = ''),
                this.isAuth$.next(!1),
                this.router.navigate(['login'])
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(C(Jf), C(He))
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: 'root' })),
            n
          )
        })(),
        ih = (() => {
          class n {
            constructor (t, r) {
              ;(this.http = t), (this.auth = r), (this.sauces$ = new Ct())
            }
            getSauces () {
              this.http
                .get('https://piiquantes-backend.vercel.app/api/sauces')
                .pipe(
                  ue(t => this.sauces$.next(t)),
                  Ae(t => (console.error(t.error.message), V([])))
                )
                .subscribe()
            }
            getSauceById (t) {
              return this.http
                .get('https://piiquantes-backend.vercel.app/api/sauces/' + t)
                .pipe(Ae(r => Kr(r.error.message)))
            }
            likeSauce (t, r) {
              return this.http
                .post(
                  'https://piiquantes-backend.vercel.app/api/sauces/' +
                    t +
                    '/like',
                  { userId: this.auth.getUserId(), like: r ? 1 : 0 }
                )
                .pipe(
                  hD(r),
                  Ae(i => Kr(i.error.message))
                )
            }
            dislikeSauce (t, r) {
              return this.http
                .post(
                  'https://piiquantes-backend.vercel.app/api/sauces/' +
                    t +
                    '/like',
                  { userId: this.auth.getUserId(), like: r ? -1 : 0 }
                )
                .pipe(
                  hD(r),
                  Ae(i => Kr(i.error.message))
                )
            }
            createSauce (t, r) {
              const i = new FormData()
              return (
                i.append('sauce', JSON.stringify(t)),
                i.append('image', r),
                this.http
                  .post('https://piiquantes-backend.vercel.app/api/sauces', i)
                  .pipe(Ae(s => Kr(s.error.message)))
              )
            }
            modifySauce (t, r, i) {
              if ('string' == typeof i)
                return this.http
                  .put(
                    'https://piiquantes-backend.vercel.app/api/sauces/' + t,
                    r
                  )
                  .pipe(Ae(s => Kr(s.error.message)))
              {
                const s = new FormData()
                return (
                  s.append('sauce', JSON.stringify(r)),
                  s.append('image', i),
                  this.http
                    .put(
                      'https://piiquantes-backend.vercel.app/api/sauces/' + t,
                      s
                    )
                    .pipe(Ae(o => Kr(o.error.message)))
                )
              }
            }
            deleteSauce (t) {
              return this.http
                .delete('https://piiquantes-backend.vercel.app/api/sauces/' + t)
                .pipe(Ae(r => Kr(r.error.message)))
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(C(Jf), C(br))
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: 'root' })),
            n
          )
        })(),
        SD = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)()
            }),
            (n.ɵmod = Ye({ type: n })),
            (n.ɵinj = ze({})),
            n
          )
        })()
      try {
        sh = 'undefined' != typeof Intl && Intl.v8BreakIterator
      } catch (n) {
        sh = !1
      }
      let ko,
        ah,
        Qr = (() => {
          class n {
            constructor (t) {
              ;(this._platformId = t),
                (this.isBrowser = this._platformId
                  ? (function dO (n) {
                      return n === Ub
                    })(this._platformId)
                  : 'object' == typeof document && !!document),
                (this.EDGE =
                  this.isBrowser && /(edge)/i.test(navigator.userAgent)),
                (this.TRIDENT =
                  this.isBrowser &&
                  /(msie|trident)/i.test(navigator.userAgent)),
                (this.BLINK =
                  this.isBrowser &&
                  !(!window.chrome && !sh) &&
                  'undefined' != typeof CSS &&
                  !this.EDGE &&
                  !this.TRIDENT),
                (this.WEBKIT =
                  this.isBrowser &&
                  /AppleWebKit/i.test(navigator.userAgent) &&
                  !this.BLINK &&
                  !this.EDGE &&
                  !this.TRIDENT),
                (this.IOS =
                  this.isBrowser &&
                  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
                  !('MSStream' in window)),
                (this.FIREFOX =
                  this.isBrowser &&
                  /(firefox|minefield)/i.test(navigator.userAgent)),
                (this.ANDROID =
                  this.isBrowser &&
                  /android/i.test(navigator.userAgent) &&
                  !this.TRIDENT),
                (this.SAFARI =
                  this.isBrowser &&
                  /safari/i.test(navigator.userAgent) &&
                  this.WEBKIT)
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(C(co))
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: 'root' })),
            n
          )
        })()
      function oh (n) {
        return (function xP () {
          if (null == ko && 'undefined' != typeof window)
            try {
              window.addEventListener(
                'test',
                null,
                Object.defineProperty({}, 'passive', { get: () => (ko = !0) })
              )
            } finally {
              ko = ko || !1
            }
          return ko
        })()
          ? n
          : !!n.capture
      }
      function TD (n) {
        if (
          (function kP () {
            if (null == ah) {
              const n = 'undefined' != typeof document ? document.head : null
              ah = !(!n || (!n.createShadowRoot && !n.attachShadow))
            }
            return ah
          })()
        ) {
          const e = n.getRootNode ? n.getRootNode() : null
          if (
            'undefined' != typeof ShadowRoot &&
            ShadowRoot &&
            e instanceof ShadowRoot
          )
            return e
        }
        return null
      }
      function Ro (n) {
        return n.composedPath ? n.composedPath()[0] : n.target
      }
      function jP (n, e) {
        return n === e
      }
      function ID (n) {
        return null != n && 'false' != `${n}`
      }
      function lh (n, e = 0) {
        return (function HP (n) {
          return !isNaN(parseFloat(n)) && !isNaN(Number(n))
        })(n)
          ? Number(n)
          : e
      }
      function Oo (n) {
        return n instanceof et ? n.nativeElement : n
      }
      function OD (n) {
        return 0 === n.buttons || (0 === n.offsetX && 0 === n.offsetY)
      }
      function FD (n) {
        const e =
          (n.touches && n.touches[0]) ||
          (n.changedTouches && n.changedTouches[0])
        return !(
          !e ||
          -1 !== e.identifier ||
          (null != e.radiusX && 1 !== e.radiusX) ||
          (null != e.radiusY && 1 !== e.radiusY)
        )
      }
      const ZP = new x('cdk-input-modality-detector-options'),
        YP = { ignoreKeys: [18, 17, 224, 91, 16] },
        ls = oh({ passive: !0, capture: !0 })
      let XP = (() => {
        class n {
          constructor (t, r, i, s) {
            ;(this._platform = t),
              (this._mostRecentTarget = null),
              (this._modality = new Ft(null)),
              (this._lastTouchMs = 0),
              (this._onKeydown = o => {
                var a, l
                ;(null ===
                  (l =
                    null === (a = this._options) || void 0 === a
                      ? void 0
                      : a.ignoreKeys) || void 0 === l
                  ? void 0
                  : l.some(u => u === o.keyCode)) ||
                  (this._modality.next('keyboard'),
                  (this._mostRecentTarget = Ro(o)))
              }),
              (this._onMousedown = o => {
                Date.now() - this._lastTouchMs < 650 ||
                  (this._modality.next(OD(o) ? 'keyboard' : 'mouse'),
                  (this._mostRecentTarget = Ro(o)))
              }),
              (this._onTouchstart = o => {
                FD(o)
                  ? this._modality.next('keyboard')
                  : ((this._lastTouchMs = Date.now()),
                    this._modality.next('touch'),
                    (this._mostRecentTarget = Ro(o)))
              }),
              (this._options = Object.assign(Object.assign({}, YP), s)),
              (this.modalityDetected = this._modality.pipe(
                (function VP (n) {
                  return mr((e, t) => n <= t)
                })(1)
              )),
              (this.modalityChanged = this.modalityDetected.pipe(
                (function BP (n, e = sr) {
                  return (
                    (n = null != n ? n : jP),
                    Le((t, r) => {
                      let i,
                        s = !0
                      t.subscribe(
                        xe(r, o => {
                          const a = e(o)
                          ;(s || !n(i, a)) && ((s = !1), (i = a), r.next(o))
                        })
                      )
                    })
                  )
                })()
              )),
              t.isBrowser &&
                r.runOutsideAngular(() => {
                  i.addEventListener('keydown', this._onKeydown, ls),
                    i.addEventListener('mousedown', this._onMousedown, ls),
                    i.addEventListener('touchstart', this._onTouchstart, ls)
                })
          }
          get mostRecentModality () {
            return this._modality.value
          }
          ngOnDestroy () {
            this._modality.complete(),
              this._platform.isBrowser &&
                (document.removeEventListener('keydown', this._onKeydown, ls),
                document.removeEventListener(
                  'mousedown',
                  this._onMousedown,
                  ls
                ),
                document.removeEventListener(
                  'touchstart',
                  this._onTouchstart,
                  ls
                ))
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(Qr), C(pe), C(Se), C(ZP, 8))
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: 'root' })),
          n
        )
      })()
      const eL = new x('cdk-focus-monitor-default-options'),
        Ul = oh({ passive: !0, capture: !0 })
      let tL = (() => {
        class n {
          constructor (t, r, i, s, o) {
            ;(this._ngZone = t),
              (this._platform = r),
              (this._inputModalityDetector = i),
              (this._origin = null),
              (this._windowFocused = !1),
              (this._originFromTouchInteraction = !1),
              (this._elementInfo = new Map()),
              (this._monitoredElementCount = 0),
              (this._rootNodeFocusListenerCount = new Map()),
              (this._windowFocusListener = () => {
                ;(this._windowFocused = !0),
                  (this._windowFocusTimeoutId = window.setTimeout(
                    () => (this._windowFocused = !1)
                  ))
              }),
              (this._stopInputModalityDetector = new Ct()),
              (this._rootNodeFocusAndBlurListener = a => {
                const l = Ro(a),
                  u = 'focus' === a.type ? this._onFocus : this._onBlur
                for (let c = l; c; c = c.parentElement) u.call(this, a, c)
              }),
              (this._document = s),
              (this._detectionMode =
                (null == o ? void 0 : o.detectionMode) || 0)
          }
          monitor (t, r = !1) {
            const i = Oo(t)
            if (!this._platform.isBrowser || 1 !== i.nodeType) return V(null)
            const s = TD(i) || this._getDocument(),
              o = this._elementInfo.get(i)
            if (o) return r && (o.checkChildren = !0), o.subject
            const a = { checkChildren: r, subject: new Ct(), rootNode: s }
            return (
              this._elementInfo.set(i, a),
              this._registerGlobalListeners(a),
              a.subject
            )
          }
          stopMonitoring (t) {
            const r = Oo(t),
              i = this._elementInfo.get(r)
            i &&
              (i.subject.complete(),
              this._setClasses(r),
              this._elementInfo.delete(r),
              this._removeGlobalListeners(i))
          }
          focusVia (t, r, i) {
            const s = Oo(t)
            s === this._getDocument().activeElement
              ? this._getClosestElementsInfo(s).forEach(([a, l]) =>
                  this._originChanged(a, r, l)
                )
              : (this._setOrigin(r), 'function' == typeof s.focus && s.focus(i))
          }
          ngOnDestroy () {
            this._elementInfo.forEach((t, r) => this.stopMonitoring(r))
          }
          _getDocument () {
            return this._document || document
          }
          _getWindow () {
            return this._getDocument().defaultView || window
          }
          _getFocusOrigin (t) {
            return this._origin
              ? this._originFromTouchInteraction
                ? this._shouldBeAttributedToTouch(t)
                  ? 'touch'
                  : 'program'
                : this._origin
              : this._windowFocused && this._lastFocusOrigin
              ? this._lastFocusOrigin
              : 'program'
          }
          _shouldBeAttributedToTouch (t) {
            return (
              1 === this._detectionMode ||
              !!(null == t
                ? void 0
                : t.contains(this._inputModalityDetector._mostRecentTarget))
            )
          }
          _setClasses (t, r) {
            t.classList.toggle('cdk-focused', !!r),
              t.classList.toggle('cdk-touch-focused', 'touch' === r),
              t.classList.toggle('cdk-keyboard-focused', 'keyboard' === r),
              t.classList.toggle('cdk-mouse-focused', 'mouse' === r),
              t.classList.toggle('cdk-program-focused', 'program' === r)
          }
          _setOrigin (t, r = !1) {
            this._ngZone.runOutsideAngular(() => {
              ;(this._origin = t),
                (this._originFromTouchInteraction = 'touch' === t && r),
                0 === this._detectionMode &&
                  (clearTimeout(this._originTimeoutId),
                  (this._originTimeoutId = setTimeout(
                    () => (this._origin = null),
                    this._originFromTouchInteraction ? 650 : 1
                  )))
            })
          }
          _onFocus (t, r) {
            const i = this._elementInfo.get(r),
              s = Ro(t)
            !i ||
              (!i.checkChildren && r !== s) ||
              this._originChanged(r, this._getFocusOrigin(s), i)
          }
          _onBlur (t, r) {
            const i = this._elementInfo.get(r)
            !i ||
              (i.checkChildren &&
                t.relatedTarget instanceof Node &&
                r.contains(t.relatedTarget)) ||
              (this._setClasses(r), this._emitOrigin(i.subject, null))
          }
          _emitOrigin (t, r) {
            this._ngZone.run(() => t.next(r))
          }
          _registerGlobalListeners (t) {
            if (!this._platform.isBrowser) return
            const r = t.rootNode,
              i = this._rootNodeFocusListenerCount.get(r) || 0
            i ||
              this._ngZone.runOutsideAngular(() => {
                r.addEventListener(
                  'focus',
                  this._rootNodeFocusAndBlurListener,
                  Ul
                ),
                  r.addEventListener(
                    'blur',
                    this._rootNodeFocusAndBlurListener,
                    Ul
                  )
              }),
              this._rootNodeFocusListenerCount.set(r, i + 1),
              1 == ++this._monitoredElementCount &&
                (this._ngZone.runOutsideAngular(() => {
                  this._getWindow().addEventListener(
                    'focus',
                    this._windowFocusListener
                  )
                }),
                this._inputModalityDetector.modalityDetected
                  .pipe(
                    (function UP (n) {
                      return Le((e, t) => {
                        Ht(n).subscribe(xe(t, () => t.complete(), Eu)),
                          !t.closed && e.subscribe(t)
                      })
                    })(this._stopInputModalityDetector)
                  )
                  .subscribe(s => {
                    this._setOrigin(s, !0)
                  }))
          }
          _removeGlobalListeners (t) {
            const r = t.rootNode
            if (this._rootNodeFocusListenerCount.has(r)) {
              const i = this._rootNodeFocusListenerCount.get(r)
              i > 1
                ? this._rootNodeFocusListenerCount.set(r, i - 1)
                : (r.removeEventListener(
                    'focus',
                    this._rootNodeFocusAndBlurListener,
                    Ul
                  ),
                  r.removeEventListener(
                    'blur',
                    this._rootNodeFocusAndBlurListener,
                    Ul
                  ),
                  this._rootNodeFocusListenerCount.delete(r))
            }
            --this._monitoredElementCount ||
              (this._getWindow().removeEventListener(
                'focus',
                this._windowFocusListener
              ),
              this._stopInputModalityDetector.next(),
              clearTimeout(this._windowFocusTimeoutId),
              clearTimeout(this._originTimeoutId))
          }
          _originChanged (t, r, i) {
            this._setClasses(t, r),
              this._emitOrigin(i.subject, r),
              (this._lastFocusOrigin = r)
          }
          _getClosestElementsInfo (t) {
            const r = []
            return (
              this._elementInfo.forEach((i, s) => {
                ;(s === t || (i.checkChildren && s.contains(t))) &&
                  r.push([s, i])
              }),
              r
            )
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(pe), C(Qr), C(XP), C(Se, 8), C(eL, 8))
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: 'root' })),
          n
        )
      })()
      const PD = 'cdk-high-contrast-black-on-white',
        LD = 'cdk-high-contrast-white-on-black',
        uh = 'cdk-high-contrast-active'
      let nL = (() => {
        class n {
          constructor (t, r) {
            ;(this._platform = t), (this._document = r)
          }
          getHighContrastMode () {
            if (!this._platform.isBrowser) return 0
            const t = this._document.createElement('div')
            ;(t.style.backgroundColor = 'rgb(1,2,3)'),
              (t.style.position = 'absolute'),
              this._document.body.appendChild(t)
            const r = this._document.defaultView || window,
              i = r && r.getComputedStyle ? r.getComputedStyle(t) : null,
              s = ((i && i.backgroundColor) || '').replace(/ /g, '')
            switch ((t.remove(), s)) {
              case 'rgb(0,0,0)':
                return 2
              case 'rgb(255,255,255)':
                return 1
            }
            return 0
          }
          _applyBodyHighContrastModeCssClasses () {
            if (
              !this._hasCheckedHighContrastMode &&
              this._platform.isBrowser &&
              this._document.body
            ) {
              const t = this._document.body.classList
              t.remove(uh),
                t.remove(PD),
                t.remove(LD),
                (this._hasCheckedHighContrastMode = !0)
              const r = this.getHighContrastMode()
              1 === r
                ? (t.add(uh), t.add(PD))
                : 2 === r && (t.add(uh), t.add(LD))
            }
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(Qr), C(Se))
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: 'root' })),
          n
        )
      })()
      class VD {}
      const nr = '*'
      function BD (n, e = null) {
        return { type: 2, steps: n, options: e }
      }
      function jD (n) {
        return { type: 6, styles: n, offset: null }
      }
      function UD (n) {
        Promise.resolve(null).then(n)
      }
      class Fo {
        constructor (e = 0, t = 0) {
          ;(this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._started = !1),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._position = 0),
            (this.parentPlayer = null),
            (this.totalTime = e + t)
        }
        _onFinish () {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach(e => e()),
            (this._onDoneFns = []))
        }
        onStart (e) {
          this._onStartFns.push(e)
        }
        onDone (e) {
          this._onDoneFns.push(e)
        }
        onDestroy (e) {
          this._onDestroyFns.push(e)
        }
        hasStarted () {
          return this._started
        }
        init () {}
        play () {
          this.hasStarted() || (this._onStart(), this.triggerMicrotask()),
            (this._started = !0)
        }
        triggerMicrotask () {
          UD(() => this._onFinish())
        }
        _onStart () {
          this._onStartFns.forEach(e => e()), (this._onStartFns = [])
        }
        pause () {}
        restart () {}
        finish () {
          this._onFinish()
        }
        destroy () {
          this._destroyed ||
            ((this._destroyed = !0),
            this.hasStarted() || this._onStart(),
            this.finish(),
            this._onDestroyFns.forEach(e => e()),
            (this._onDestroyFns = []))
        }
        reset () {
          this._started = !1
        }
        setPosition (e) {
          this._position = this.totalTime ? e * this.totalTime : 1
        }
        getPosition () {
          return this.totalTime ? this._position / this.totalTime : 1
        }
        triggerCallback (e) {
          const t = 'start' == e ? this._onStartFns : this._onDoneFns
          t.forEach(r => r()), (t.length = 0)
        }
      }
      class HD {
        constructor (e) {
          ;(this._onDoneFns = []),
            (this._onStartFns = []),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this._onDestroyFns = []),
            (this.parentPlayer = null),
            (this.totalTime = 0),
            (this.players = e)
          let t = 0,
            r = 0,
            i = 0
          const s = this.players.length
          0 == s
            ? UD(() => this._onFinish())
            : this.players.forEach(o => {
                o.onDone(() => {
                  ++t == s && this._onFinish()
                }),
                  o.onDestroy(() => {
                    ++r == s && this._onDestroy()
                  }),
                  o.onStart(() => {
                    ++i == s && this._onStart()
                  })
              }),
            (this.totalTime = this.players.reduce(
              (o, a) => Math.max(o, a.totalTime),
              0
            ))
        }
        _onFinish () {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach(e => e()),
            (this._onDoneFns = []))
        }
        init () {
          this.players.forEach(e => e.init())
        }
        onStart (e) {
          this._onStartFns.push(e)
        }
        _onStart () {
          this.hasStarted() ||
            ((this._started = !0),
            this._onStartFns.forEach(e => e()),
            (this._onStartFns = []))
        }
        onDone (e) {
          this._onDoneFns.push(e)
        }
        onDestroy (e) {
          this._onDestroyFns.push(e)
        }
        hasStarted () {
          return this._started
        }
        play () {
          this.parentPlayer || this.init(),
            this._onStart(),
            this.players.forEach(e => e.play())
        }
        pause () {
          this.players.forEach(e => e.pause())
        }
        restart () {
          this.players.forEach(e => e.restart())
        }
        finish () {
          this._onFinish(), this.players.forEach(e => e.finish())
        }
        destroy () {
          this._onDestroy()
        }
        _onDestroy () {
          this._destroyed ||
            ((this._destroyed = !0),
            this._onFinish(),
            this.players.forEach(e => e.destroy()),
            this._onDestroyFns.forEach(e => e()),
            (this._onDestroyFns = []))
        }
        reset () {
          this.players.forEach(e => e.reset()),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1)
        }
        setPosition (e) {
          const t = e * this.totalTime
          this.players.forEach(r => {
            const i = r.totalTime ? Math.min(1, t / r.totalTime) : 1
            r.setPosition(i)
          })
        }
        getPosition () {
          const e = this.players.reduce(
            (t, r) => (null === t || r.totalTime > t.totalTime ? r : t),
            null
          )
          return null != e ? e.getPosition() : 0
        }
        beforeDestroy () {
          this.players.forEach(e => {
            e.beforeDestroy && e.beforeDestroy()
          })
        }
        triggerCallback (e) {
          const t = 'start' == e ? this._onStartFns : this._onDoneFns
          t.forEach(r => r()), (t.length = 0)
        }
      }
      const te = !1
      function $D (n) {
        return new M(3e3, te)
      }
      function VL () {
        return 'undefined' != typeof window && void 0 !== window.document
      }
      function dh () {
        return (
          'undefined' != typeof process &&
          '[object process]' === {}.toString.call(process)
        )
      }
      function Cr (n) {
        switch (n.length) {
          case 0:
            return new Fo()
          case 1:
            return n[0]
          default:
            return new HD(n)
        }
      }
      function zD (n, e, t, r, i = {}, s = {}) {
        const o = [],
          a = []
        let l = -1,
          u = null
        if (
          (r.forEach(c => {
            const d = c.offset,
              f = d == l,
              h = (f && u) || {}
            Object.keys(c).forEach(p => {
              let g = p,
                _ = c[p]
              if ('offset' !== p)
                switch (((g = e.normalizePropertyName(g, o)), _)) {
                  case '!':
                    _ = i[p]
                    break
                  case nr:
                    _ = s[p]
                    break
                  default:
                    _ = e.normalizeStyleValue(p, g, _, o)
                }
              h[g] = _
            }),
              f || a.push(h),
              (u = h),
              (l = d)
          }),
          o.length)
        )
          throw (function AL (n) {
            return new M(3502, te)
          })()
        return a
      }
      function fh (n, e, t, r) {
        switch (e) {
          case 'start':
            n.onStart(() => r(t && hh(t, 'start', n)))
            break
          case 'done':
            n.onDone(() => r(t && hh(t, 'done', n)))
            break
          case 'destroy':
            n.onDestroy(() => r(t && hh(t, 'destroy', n)))
        }
      }
      function hh (n, e, t) {
        const r = t.totalTime,
          s = ph(
            n.element,
            n.triggerName,
            n.fromState,
            n.toState,
            e || n.phaseName,
            null == r ? n.totalTime : r,
            !!t.disabled
          ),
          o = n._data
        return null != o && (s._data = o), s
      }
      function ph (n, e, t, r, i = '', s = 0, o) {
        return {
          element: n,
          triggerName: e,
          fromState: t,
          toState: r,
          phaseName: i,
          totalTime: s,
          disabled: !!o
        }
      }
      function Pt (n, e, t) {
        let r
        return (
          n instanceof Map
            ? ((r = n.get(e)), r || n.set(e, (r = t)))
            : ((r = n[e]), r || (r = n[e] = t)),
          r
        )
      }
      function GD (n) {
        const e = n.indexOf(':')
        return [n.substring(1, e), n.substr(e + 1)]
      }
      let gh = (n, e) => !1,
        qD = (n, e, t) => []
      ;(dh() || 'undefined' != typeof Element) &&
        ((gh = VL()
          ? (n, e) => {
              for (; e && e !== document.documentElement; ) {
                if (e === n) return !0
                e = e.parentNode || e.host
              }
              return !1
            }
          : (n, e) => n.contains(e)),
        (qD = (n, e, t) => {
          if (t) return Array.from(n.querySelectorAll(e))
          const r = n.querySelector(e)
          return r ? [r] : []
        }))
      let Yr = null,
        WD = !1
      function KD (n) {
        Yr ||
          ((Yr =
            (function jL () {
              return 'undefined' != typeof document ? document.body : null
            })() || {}),
          (WD = !!Yr.style && 'WebkitAppearance' in Yr.style))
        let e = !0
        return (
          Yr.style &&
            !(function BL (n) {
              return 'ebkit' == n.substring(1, 6)
            })(n) &&
            ((e = n in Yr.style),
            !e &&
              WD &&
              (e =
                'Webkit' + n.charAt(0).toUpperCase() + n.substr(1) in
                Yr.style)),
          e
        )
      }
      const QD = gh,
        ZD = qD
      let YD = (() => {
          class n {
            validateStyleProperty (t) {
              return KD(t)
            }
            matchesElement (t, r) {
              return !1
            }
            containsElement (t, r) {
              return QD(t, r)
            }
            query (t, r, i) {
              return ZD(t, r, i)
            }
            computeStyle (t, r, i) {
              return i || ''
            }
            animate (t, r, i, s, o, a = [], l) {
              return new Fo(i, s)
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)()
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          )
        })(),
        mh = (() => {
          class n {}
          return (n.NOOP = new YD()), n
        })()
      const yh = 'ng-enter',
        $l = 'ng-leave',
        zl = 'ng-trigger',
        Gl = '.ng-trigger',
        JD = 'ng-animating',
        _h = '.ng-animating'
      function Xr (n) {
        if ('number' == typeof n) return n
        const e = n.match(/^(-?[\.\d]+)(m?s)/)
        return !e || e.length < 2 ? 0 : vh(parseFloat(e[1]), e[2])
      }
      function vh (n, e) {
        return 's' === e ? 1e3 * n : n
      }
      function ql (n, e, t) {
        return n.hasOwnProperty('duration')
          ? n
          : (function $L (n, e, t) {
              let i,
                s = 0,
                o = ''
              if ('string' == typeof n) {
                const a = n.match(
                  /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i
                )
                if (null === a)
                  return e.push($D()), { duration: 0, delay: 0, easing: '' }
                i = vh(parseFloat(a[1]), a[2])
                const l = a[3]
                null != l && (s = vh(parseFloat(l), a[4]))
                const u = a[5]
                u && (o = u)
              } else i = n
              if (!t) {
                let a = !1,
                  l = e.length
                i < 0 &&
                  (e.push(
                    (function iL () {
                      return new M(3100, te)
                    })()
                  ),
                  (a = !0)),
                  s < 0 &&
                    (e.push(
                      (function sL () {
                        return new M(3101, te)
                      })()
                    ),
                    (a = !0)),
                  a && e.splice(l, 0, $D())
              }
              return { duration: i, delay: s, easing: o }
            })(n, e, t)
      }
      function us (n, e = {}) {
        return (
          Object.keys(n).forEach(t => {
            e[t] = n[t]
          }),
          e
        )
      }
      function Dr (n, e, t = {}) {
        if (e) for (let r in n) t[r] = n[r]
        else us(n, t)
        return t
      }
      function tE (n, e, t) {
        return t ? e + ':' + t + ';' : ''
      }
      function nE (n) {
        let e = ''
        for (let t = 0; t < n.style.length; t++) {
          const r = n.style.item(t)
          e += tE(0, r, n.style.getPropertyValue(r))
        }
        for (const t in n.style)
          n.style.hasOwnProperty(t) &&
            !t.startsWith('_') &&
            (e += tE(0, qL(t), n.style[t]))
        n.setAttribute('style', e)
      }
      function Rn (n, e, t) {
        n.style &&
          (Object.keys(e).forEach(r => {
            const i = Ch(r)
            t && !t.hasOwnProperty(r) && (t[r] = n.style[i]),
              (n.style[i] = e[r])
          }),
          dh() && nE(n))
      }
      function Jr (n, e) {
        n.style &&
          (Object.keys(e).forEach(t => {
            const r = Ch(t)
            n.style[r] = ''
          }),
          dh() && nE(n))
      }
      function No (n) {
        return Array.isArray(n) ? (1 == n.length ? n[0] : BD(n)) : n
      }
      const bh = new RegExp('{{\\s*(.+?)\\s*}}', 'g')
      function rE (n) {
        let e = []
        if ('string' == typeof n) {
          let t
          for (; (t = bh.exec(n)); ) e.push(t[1])
          bh.lastIndex = 0
        }
        return e
      }
      function Wl (n, e, t) {
        const r = n.toString(),
          i = r.replace(bh, (s, o) => {
            let a = e[o]
            return (
              e.hasOwnProperty(o) ||
                (t.push(
                  (function aL (n) {
                    return new M(3003, te)
                  })()
                ),
                (a = '')),
              a.toString()
            )
          })
        return i == r ? n : i
      }
      function Kl (n) {
        const e = []
        let t = n.next()
        for (; !t.done; ) e.push(t.value), (t = n.next())
        return e
      }
      const GL = /-+([a-z0-9])/g
      function Ch (n) {
        return n.replace(GL, (...e) => e[1].toUpperCase())
      }
      function qL (n) {
        return n.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
      }
      function Lt (n, e, t) {
        switch (e.type) {
          case 7:
            return n.visitTrigger(e, t)
          case 0:
            return n.visitState(e, t)
          case 1:
            return n.visitTransition(e, t)
          case 2:
            return n.visitSequence(e, t)
          case 3:
            return n.visitGroup(e, t)
          case 4:
            return n.visitAnimate(e, t)
          case 5:
            return n.visitKeyframes(e, t)
          case 6:
            return n.visitStyle(e, t)
          case 8:
            return n.visitReference(e, t)
          case 9:
            return n.visitAnimateChild(e, t)
          case 10:
            return n.visitAnimateRef(e, t)
          case 11:
            return n.visitQuery(e, t)
          case 12:
            return n.visitStagger(e, t)
          default:
            throw (function lL (n) {
              return new M(3004, te)
            })()
        }
      }
      function iE (n, e) {
        return window.getComputedStyle(n)[e]
      }
      function QL (n, e) {
        const t = []
        return (
          'string' == typeof n
            ? n.split(/\s*,\s*/).forEach(r =>
                (function ZL (n, e, t) {
                  if (':' == n[0]) {
                    const l = (function YL (n, e) {
                      switch (n) {
                        case ':enter':
                          return 'void => *'
                        case ':leave':
                          return '* => void'
                        case ':increment':
                          return (t, r) => parseFloat(r) > parseFloat(t)
                        case ':decrement':
                          return (t, r) => parseFloat(r) < parseFloat(t)
                        default:
                          return (
                            e.push(
                              (function EL (n) {
                                return new M(3016, te)
                              })()
                            ),
                            '* => *'
                          )
                      }
                    })(n, t)
                    if ('function' == typeof l) return void e.push(l)
                    n = l
                  }
                  const r = n.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/)
                  if (null == r || r.length < 4)
                    return (
                      t.push(
                        (function DL (n) {
                          return new M(3015, te)
                        })()
                      ),
                      e
                    )
                  const i = r[1],
                    s = r[2],
                    o = r[3]
                  e.push(sE(i, o))
                  '<' == s[0] && !('*' == i && '*' == o) && e.push(sE(o, i))
                })(r, t, e)
              )
            : t.push(n),
          t
        )
      }
      const Zl = new Set(['true', '1']),
        Yl = new Set(['false', '0'])
      function sE (n, e) {
        const t = Zl.has(n) || Yl.has(n),
          r = Zl.has(e) || Yl.has(e)
        return (i, s) => {
          let o = '*' == n || n == i,
            a = '*' == e || e == s
          return (
            !o && t && 'boolean' == typeof i && (o = i ? Zl.has(n) : Yl.has(n)),
            !a && r && 'boolean' == typeof s && (a = s ? Zl.has(e) : Yl.has(e)),
            o && a
          )
        }
      }
      const XL = new RegExp('s*:selfs*,?', 'g')
      function Dh (n, e, t) {
        return new JL(n).build(e, t)
      }
      class JL {
        constructor (e) {
          this._driver = e
        }
        build (e, t) {
          const r = new nV(t)
          return this._resetContextStyleTimingState(r), Lt(this, No(e), r)
        }
        _resetContextStyleTimingState (e) {
          ;(e.currentQuerySelector = ''),
            (e.collectedStyles = {}),
            (e.collectedStyles[''] = {}),
            (e.currentTime = 0)
        }
        visitTrigger (e, t) {
          let r = (t.queryCount = 0),
            i = (t.depCount = 0)
          const s = [],
            o = []
          return (
            '@' == e.name.charAt(0) &&
              t.errors.push(
                (function cL () {
                  return new M(3006, te)
                })()
              ),
            e.definitions.forEach(a => {
              if ((this._resetContextStyleTimingState(t), 0 == a.type)) {
                const l = a,
                  u = l.name
                u
                  .toString()
                  .split(/\s*,\s*/)
                  .forEach(c => {
                    ;(l.name = c), s.push(this.visitState(l, t))
                  }),
                  (l.name = u)
              } else if (1 == a.type) {
                const l = this.visitTransition(a, t)
                ;(r += l.queryCount), (i += l.depCount), o.push(l)
              } else
                t.errors.push(
                  (function dL () {
                    return new M(3007, te)
                  })()
                )
            }),
            {
              type: 7,
              name: e.name,
              states: s,
              transitions: o,
              queryCount: r,
              depCount: i,
              options: null
            }
          )
        }
        visitState (e, t) {
          const r = this.visitStyle(e.styles, t),
            i = (e.options && e.options.params) || null
          if (r.containsDynamicStyles) {
            const s = new Set(),
              o = i || {}
            r.styles.forEach(a => {
              if (Xl(a)) {
                const l = a
                Object.keys(l).forEach(u => {
                  rE(l[u]).forEach(c => {
                    o.hasOwnProperty(c) || s.add(c)
                  })
                })
              }
            }),
              s.size &&
                (Kl(s.values()),
                t.errors.push(
                  (function fL (n, e) {
                    return new M(3008, te)
                  })()
                ))
          }
          return {
            type: 0,
            name: e.name,
            style: r,
            options: i ? { params: i } : null
          }
        }
        visitTransition (e, t) {
          ;(t.queryCount = 0), (t.depCount = 0)
          const r = Lt(this, No(e.animation), t)
          return {
            type: 1,
            matchers: QL(e.expr, t.errors),
            animation: r,
            queryCount: t.queryCount,
            depCount: t.depCount,
            options: ei(e.options)
          }
        }
        visitSequence (e, t) {
          return {
            type: 2,
            steps: e.steps.map(r => Lt(this, r, t)),
            options: ei(e.options)
          }
        }
        visitGroup (e, t) {
          const r = t.currentTime
          let i = 0
          const s = e.steps.map(o => {
            t.currentTime = r
            const a = Lt(this, o, t)
            return (i = Math.max(i, t.currentTime)), a
          })
          return (
            (t.currentTime = i), { type: 3, steps: s, options: ei(e.options) }
          )
        }
        visitAnimate (e, t) {
          const r = (function iV (n, e) {
            let t = null
            if (n.hasOwnProperty('duration')) t = n
            else if ('number' == typeof n) return Eh(ql(n, e).duration, 0, '')
            const r = n
            if (
              r.split(/\s+/).some(s => '{' == s.charAt(0) && '{' == s.charAt(1))
            ) {
              const s = Eh(0, 0, '')
              return (s.dynamic = !0), (s.strValue = r), s
            }
            return (t = t || ql(r, e)), Eh(t.duration, t.delay, t.easing)
          })(e.timings, t.errors)
          t.currentAnimateTimings = r
          let i,
            s = e.styles ? e.styles : jD({})
          if (5 == s.type) i = this.visitKeyframes(s, t)
          else {
            let o = e.styles,
              a = !1
            if (!o) {
              a = !0
              const u = {}
              r.easing && (u.easing = r.easing), (o = jD(u))
            }
            t.currentTime += r.duration + r.delay
            const l = this.visitStyle(o, t)
            ;(l.isEmptyStep = a), (i = l)
          }
          return (
            (t.currentAnimateTimings = null),
            { type: 4, timings: r, style: i, options: null }
          )
        }
        visitStyle (e, t) {
          const r = this._makeStyleAst(e, t)
          return this._validateStyleAst(r, t), r
        }
        _makeStyleAst (e, t) {
          const r = []
          Array.isArray(e.styles)
            ? e.styles.forEach(o => {
                'string' == typeof o
                  ? o == nr
                    ? r.push(o)
                    : t.errors.push(
                        (function hL (n) {
                          return new M(3002, te)
                        })()
                      )
                  : r.push(o)
              })
            : r.push(e.styles)
          let i = !1,
            s = null
          return (
            r.forEach(o => {
              if (Xl(o)) {
                const a = o,
                  l = a.easing
                if ((l && ((s = l), delete a.easing), !i))
                  for (let u in a)
                    if (a[u].toString().indexOf('{{') >= 0) {
                      i = !0
                      break
                    }
              }
            }),
            {
              type: 6,
              styles: r,
              easing: s,
              offset: e.offset,
              containsDynamicStyles: i,
              options: null
            }
          )
        }
        _validateStyleAst (e, t) {
          const r = t.currentAnimateTimings
          let i = t.currentTime,
            s = t.currentTime
          r && s > 0 && (s -= r.duration + r.delay),
            e.styles.forEach(o => {
              'string' != typeof o &&
                Object.keys(o).forEach(a => {
                  if (!this._driver.validateStyleProperty(a))
                    return void t.errors.push(
                      (function pL (n) {
                        return new M(3009, te)
                      })()
                    )
                  const l = t.collectedStyles[t.currentQuerySelector],
                    u = l[a]
                  let c = !0
                  u &&
                    (s != i &&
                      s >= u.startTime &&
                      i <= u.endTime &&
                      (t.errors.push(
                        (function gL (n, e, t, r, i) {
                          return new M(3010, te)
                        })()
                      ),
                      (c = !1)),
                    (s = u.startTime)),
                    c && (l[a] = { startTime: s, endTime: i }),
                    t.options &&
                      (function zL (n, e, t) {
                        const r = e.params || {},
                          i = rE(n)
                        i.length &&
                          i.forEach(s => {
                            r.hasOwnProperty(s) ||
                              t.push(
                                (function oL (n) {
                                  return new M(3001, te)
                                })()
                              )
                          })
                      })(o[a], t.options, t.errors)
                })
            })
        }
        visitKeyframes (e, t) {
          const r = { type: 5, styles: [], options: null }
          if (!t.currentAnimateTimings)
            return (
              t.errors.push(
                (function mL () {
                  return new M(3011, te)
                })()
              ),
              r
            )
          let s = 0
          const o = []
          let a = !1,
            l = !1,
            u = 0
          const c = e.steps.map(v => {
            const m = this._makeStyleAst(v, t)
            let D =
                null != m.offset
                  ? m.offset
                  : (function rV (n) {
                      if ('string' == typeof n) return null
                      let e = null
                      if (Array.isArray(n))
                        n.forEach(t => {
                          if (Xl(t) && t.hasOwnProperty('offset')) {
                            const r = t
                            ;(e = parseFloat(r.offset)), delete r.offset
                          }
                        })
                      else if (Xl(n) && n.hasOwnProperty('offset')) {
                        const t = n
                        ;(e = parseFloat(t.offset)), delete t.offset
                      }
                      return e
                    })(m.styles),
              S = 0
            return (
              null != D && (s++, (S = m.offset = D)),
              (l = l || S < 0 || S > 1),
              (a = a || S < u),
              (u = S),
              o.push(S),
              m
            )
          })
          l &&
            t.errors.push(
              (function yL () {
                return new M(3012, te)
              })()
            ),
            a &&
              t.errors.push(
                (function _L () {
                  return new M(3200, te)
                })()
              )
          const d = e.steps.length
          let f = 0
          s > 0 && s < d
            ? t.errors.push(
                (function vL () {
                  return new M(3202, te)
                })()
              )
            : 0 == s && (f = 1 / (d - 1))
          const h = d - 1,
            p = t.currentTime,
            g = t.currentAnimateTimings,
            _ = g.duration
          return (
            c.forEach((v, m) => {
              const D = f > 0 ? (m == h ? 1 : f * m) : o[m],
                S = D * _
              ;(t.currentTime = p + g.delay + S),
                (g.duration = S),
                this._validateStyleAst(v, t),
                (v.offset = D),
                r.styles.push(v)
            }),
            r
          )
        }
        visitReference (e, t) {
          return {
            type: 8,
            animation: Lt(this, No(e.animation), t),
            options: ei(e.options)
          }
        }
        visitAnimateChild (e, t) {
          return t.depCount++, { type: 9, options: ei(e.options) }
        }
        visitAnimateRef (e, t) {
          return {
            type: 10,
            animation: this.visitReference(e.animation, t),
            options: ei(e.options)
          }
        }
        visitQuery (e, t) {
          const r = t.currentQuerySelector,
            i = e.options || {}
          t.queryCount++, (t.currentQuery = e)
          const [s, o] = (function eV (n) {
            const e = !!n.split(/\s*,\s*/).find(t => ':self' == t)
            return (
              e && (n = n.replace(XL, '')),
              (n = n
                .replace(/@\*/g, Gl)
                .replace(/@\w+/g, t => Gl + '-' + t.substr(1))
                .replace(/:animating/g, _h)),
              [n, e]
            )
          })(e.selector)
          ;(t.currentQuerySelector = r.length ? r + ' ' + s : s),
            Pt(t.collectedStyles, t.currentQuerySelector, {})
          const a = Lt(this, No(e.animation), t)
          return (
            (t.currentQuery = null),
            (t.currentQuerySelector = r),
            {
              type: 11,
              selector: s,
              limit: i.limit || 0,
              optional: !!i.optional,
              includeSelf: o,
              animation: a,
              originalSelector: e.selector,
              options: ei(e.options)
            }
          )
        }
        visitStagger (e, t) {
          t.currentQuery ||
            t.errors.push(
              (function bL () {
                return new M(3013, te)
              })()
            )
          const r =
            'full' === e.timings
              ? { duration: 0, delay: 0, easing: 'full' }
              : ql(e.timings, t.errors, !0)
          return {
            type: 12,
            animation: Lt(this, No(e.animation), t),
            timings: r,
            options: null
          }
        }
      }
      class nV {
        constructor (e) {
          ;(this.errors = e),
            (this.queryCount = 0),
            (this.depCount = 0),
            (this.currentTransition = null),
            (this.currentQuery = null),
            (this.currentQuerySelector = null),
            (this.currentAnimateTimings = null),
            (this.currentTime = 0),
            (this.collectedStyles = {}),
            (this.options = null)
        }
      }
      function Xl (n) {
        return !Array.isArray(n) && 'object' == typeof n
      }
      function ei (n) {
        return (
          n
            ? (n = us(n)).params &&
              (n.params = (function tV (n) {
                return n ? us(n) : null
              })(n.params))
            : (n = {}),
          n
        )
      }
      function Eh (n, e, t) {
        return { duration: n, delay: e, easing: t }
      }
      function wh (n, e, t, r, i, s, o = null, a = !1) {
        return {
          type: 1,
          element: n,
          keyframes: e,
          preStyleProps: t,
          postStyleProps: r,
          duration: i,
          delay: s,
          totalTime: i + s,
          easing: o,
          subTimeline: a
        }
      }
      class Jl {
        constructor () {
          this._map = new Map()
        }
        get (e) {
          return this._map.get(e) || []
        }
        append (e, t) {
          let r = this._map.get(e)
          r || this._map.set(e, (r = [])), r.push(...t)
        }
        has (e) {
          return this._map.has(e)
        }
        clear () {
          this._map.clear()
        }
      }
      const aV = new RegExp(':enter', 'g'),
        uV = new RegExp(':leave', 'g')
      function Sh (n, e, t, r, i, s = {}, o = {}, a, l, u = []) {
        return new cV().buildKeyframes(n, e, t, r, i, s, o, a, l, u)
      }
      class cV {
        buildKeyframes (e, t, r, i, s, o, a, l, u, c = []) {
          u = u || new Jl()
          const d = new Mh(e, t, u, i, s, c, [])
          ;(d.options = l),
            d.currentTimeline.setStyles([o], null, d.errors, l),
            Lt(this, r, d)
          const f = d.timelines.filter(h => h.containsAnimation())
          if (Object.keys(a).length) {
            let h
            for (let p = f.length - 1; p >= 0; p--) {
              const g = f[p]
              if (g.element === t) {
                h = g
                break
              }
            }
            h &&
              !h.allowOnlyTimelineStyles() &&
              h.setStyles([a], null, d.errors, l)
          }
          return f.length
            ? f.map(h => h.buildKeyframes())
            : [wh(t, [], [], [], 0, 0, '', !1)]
        }
        visitTrigger (e, t) {}
        visitState (e, t) {}
        visitTransition (e, t) {}
        visitAnimateChild (e, t) {
          const r = t.subInstructions.get(t.element)
          if (r) {
            const i = t.createSubContext(e.options),
              s = t.currentTimeline.currentTime,
              o = this._visitSubInstructions(r, i, i.options)
            s != o && t.transformIntoNewTimeline(o)
          }
          t.previousNode = e
        }
        visitAnimateRef (e, t) {
          const r = t.createSubContext(e.options)
          r.transformIntoNewTimeline(),
            this.visitReference(e.animation, r),
            t.transformIntoNewTimeline(r.currentTimeline.currentTime),
            (t.previousNode = e)
        }
        _visitSubInstructions (e, t, r) {
          let s = t.currentTimeline.currentTime
          const o = null != r.duration ? Xr(r.duration) : null,
            a = null != r.delay ? Xr(r.delay) : null
          return (
            0 !== o &&
              e.forEach(l => {
                const u = t.appendInstructionToTimeline(l, o, a)
                s = Math.max(s, u.duration + u.delay)
              }),
            s
          )
        }
        visitReference (e, t) {
          t.updateOptions(e.options, !0),
            Lt(this, e.animation, t),
            (t.previousNode = e)
        }
        visitSequence (e, t) {
          const r = t.subContextCount
          let i = t
          const s = e.options
          if (
            s &&
            (s.params || s.delay) &&
            ((i = t.createSubContext(s)),
            i.transformIntoNewTimeline(),
            null != s.delay)
          ) {
            6 == i.previousNode.type &&
              (i.currentTimeline.snapshotCurrentStyles(), (i.previousNode = eu))
            const o = Xr(s.delay)
            i.delayNextStep(o)
          }
          e.steps.length &&
            (e.steps.forEach(o => Lt(this, o, i)),
            i.currentTimeline.applyStylesToKeyframe(),
            i.subContextCount > r && i.transformIntoNewTimeline()),
            (t.previousNode = e)
        }
        visitGroup (e, t) {
          const r = []
          let i = t.currentTimeline.currentTime
          const s = e.options && e.options.delay ? Xr(e.options.delay) : 0
          e.steps.forEach(o => {
            const a = t.createSubContext(e.options)
            s && a.delayNextStep(s),
              Lt(this, o, a),
              (i = Math.max(i, a.currentTimeline.currentTime)),
              r.push(a.currentTimeline)
          }),
            r.forEach(o => t.currentTimeline.mergeTimelineCollectedStyles(o)),
            t.transformIntoNewTimeline(i),
            (t.previousNode = e)
        }
        _visitTiming (e, t) {
          if (e.dynamic) {
            const r = e.strValue
            return ql(t.params ? Wl(r, t.params, t.errors) : r, t.errors)
          }
          return { duration: e.duration, delay: e.delay, easing: e.easing }
        }
        visitAnimate (e, t) {
          const r = (t.currentAnimateTimings = this._visitTiming(e.timings, t)),
            i = t.currentTimeline
          r.delay && (t.incrementTime(r.delay), i.snapshotCurrentStyles())
          const s = e.style
          5 == s.type
            ? this.visitKeyframes(s, t)
            : (t.incrementTime(r.duration),
              this.visitStyle(s, t),
              i.applyStylesToKeyframe()),
            (t.currentAnimateTimings = null),
            (t.previousNode = e)
        }
        visitStyle (e, t) {
          const r = t.currentTimeline,
            i = t.currentAnimateTimings
          !i && r.getCurrentStyleProperties().length && r.forwardFrame()
          const s = (i && i.easing) || e.easing
          e.isEmptyStep
            ? r.applyEmptyStep(s)
            : r.setStyles(e.styles, s, t.errors, t.options),
            (t.previousNode = e)
        }
        visitKeyframes (e, t) {
          const r = t.currentAnimateTimings,
            i = t.currentTimeline.duration,
            s = r.duration,
            a = t.createSubContext().currentTimeline
          ;(a.easing = r.easing),
            e.styles.forEach(l => {
              a.forwardTime((l.offset || 0) * s),
                a.setStyles(l.styles, l.easing, t.errors, t.options),
                a.applyStylesToKeyframe()
            }),
            t.currentTimeline.mergeTimelineCollectedStyles(a),
            t.transformIntoNewTimeline(i + s),
            (t.previousNode = e)
        }
        visitQuery (e, t) {
          const r = t.currentTimeline.currentTime,
            i = e.options || {},
            s = i.delay ? Xr(i.delay) : 0
          s &&
            (6 === t.previousNode.type ||
              (0 == r &&
                t.currentTimeline.getCurrentStyleProperties().length)) &&
            (t.currentTimeline.snapshotCurrentStyles(), (t.previousNode = eu))
          let o = r
          const a = t.invokeQuery(
            e.selector,
            e.originalSelector,
            e.limit,
            e.includeSelf,
            !!i.optional,
            t.errors
          )
          t.currentQueryTotal = a.length
          let l = null
          a.forEach((u, c) => {
            t.currentQueryIndex = c
            const d = t.createSubContext(e.options, u)
            s && d.delayNextStep(s),
              u === t.element && (l = d.currentTimeline),
              Lt(this, e.animation, d),
              d.currentTimeline.applyStylesToKeyframe(),
              (o = Math.max(o, d.currentTimeline.currentTime))
          }),
            (t.currentQueryIndex = 0),
            (t.currentQueryTotal = 0),
            t.transformIntoNewTimeline(o),
            l &&
              (t.currentTimeline.mergeTimelineCollectedStyles(l),
              t.currentTimeline.snapshotCurrentStyles()),
            (t.previousNode = e)
        }
        visitStagger (e, t) {
          const r = t.parentContext,
            i = t.currentTimeline,
            s = e.timings,
            o = Math.abs(s.duration),
            a = o * (t.currentQueryTotal - 1)
          let l = o * t.currentQueryIndex
          switch (s.duration < 0 ? 'reverse' : s.easing) {
            case 'reverse':
              l = a - l
              break
            case 'full':
              l = r.currentStaggerTime
          }
          const c = t.currentTimeline
          l && c.delayNextStep(l)
          const d = c.currentTime
          Lt(this, e.animation, t),
            (t.previousNode = e),
            (r.currentStaggerTime =
              i.currentTime - d + (i.startTime - r.currentTimeline.startTime))
        }
      }
      const eu = {}
      class Mh {
        constructor (e, t, r, i, s, o, a, l) {
          ;(this._driver = e),
            (this.element = t),
            (this.subInstructions = r),
            (this._enterClassName = i),
            (this._leaveClassName = s),
            (this.errors = o),
            (this.timelines = a),
            (this.parentContext = null),
            (this.currentAnimateTimings = null),
            (this.previousNode = eu),
            (this.subContextCount = 0),
            (this.options = {}),
            (this.currentQueryIndex = 0),
            (this.currentQueryTotal = 0),
            (this.currentStaggerTime = 0),
            (this.currentTimeline = l || new tu(this._driver, t, 0)),
            a.push(this.currentTimeline)
        }
        get params () {
          return this.options.params
        }
        updateOptions (e, t) {
          if (!e) return
          const r = e
          let i = this.options
          null != r.duration && (i.duration = Xr(r.duration)),
            null != r.delay && (i.delay = Xr(r.delay))
          const s = r.params
          if (s) {
            let o = i.params
            o || (o = this.options.params = {}),
              Object.keys(s).forEach(a => {
                ;(!t || !o.hasOwnProperty(a)) &&
                  (o[a] = Wl(s[a], o, this.errors))
              })
          }
        }
        _copyOptions () {
          const e = {}
          if (this.options) {
            const t = this.options.params
            if (t) {
              const r = (e.params = {})
              Object.keys(t).forEach(i => {
                r[i] = t[i]
              })
            }
          }
          return e
        }
        createSubContext (e = null, t, r) {
          const i = t || this.element,
            s = new Mh(
              this._driver,
              i,
              this.subInstructions,
              this._enterClassName,
              this._leaveClassName,
              this.errors,
              this.timelines,
              this.currentTimeline.fork(i, r || 0)
            )
          return (
            (s.previousNode = this.previousNode),
            (s.currentAnimateTimings = this.currentAnimateTimings),
            (s.options = this._copyOptions()),
            s.updateOptions(e),
            (s.currentQueryIndex = this.currentQueryIndex),
            (s.currentQueryTotal = this.currentQueryTotal),
            (s.parentContext = this),
            this.subContextCount++,
            s
          )
        }
        transformIntoNewTimeline (e) {
          return (
            (this.previousNode = eu),
            (this.currentTimeline = this.currentTimeline.fork(this.element, e)),
            this.timelines.push(this.currentTimeline),
            this.currentTimeline
          )
        }
        appendInstructionToTimeline (e, t, r) {
          const i = {
              duration: null != t ? t : e.duration,
              delay:
                this.currentTimeline.currentTime +
                (null != r ? r : 0) +
                e.delay,
              easing: ''
            },
            s = new dV(
              this._driver,
              e.element,
              e.keyframes,
              e.preStyleProps,
              e.postStyleProps,
              i,
              e.stretchStartingKeyframe
            )
          return this.timelines.push(s), i
        }
        incrementTime (e) {
          this.currentTimeline.forwardTime(this.currentTimeline.duration + e)
        }
        delayNextStep (e) {
          e > 0 && this.currentTimeline.delayNextStep(e)
        }
        invokeQuery (e, t, r, i, s, o) {
          let a = []
          if ((i && a.push(this.element), e.length > 0)) {
            e = (e = e.replace(aV, '.' + this._enterClassName)).replace(
              uV,
              '.' + this._leaveClassName
            )
            let u = this._driver.query(this.element, e, 1 != r)
            0 !== r &&
              (u = r < 0 ? u.slice(u.length + r, u.length) : u.slice(0, r)),
              a.push(...u)
          }
          return (
            !s &&
              0 == a.length &&
              o.push(
                (function CL (n) {
                  return new M(3014, te)
                })()
              ),
            a
          )
        }
      }
      class tu {
        constructor (e, t, r, i) {
          ;(this._driver = e),
            (this.element = t),
            (this.startTime = r),
            (this._elementTimelineStylesLookup = i),
            (this.duration = 0),
            (this._previousKeyframe = {}),
            (this._currentKeyframe = {}),
            (this._keyframes = new Map()),
            (this._styleSummary = {}),
            (this._pendingStyles = {}),
            (this._backFill = {}),
            (this._currentEmptyStepKeyframe = null),
            this._elementTimelineStylesLookup ||
              (this._elementTimelineStylesLookup = new Map()),
            (this._localTimelineStyles = Object.create(this._backFill, {})),
            (this._globalTimelineStyles =
              this._elementTimelineStylesLookup.get(t)),
            this._globalTimelineStyles ||
              ((this._globalTimelineStyles = this._localTimelineStyles),
              this._elementTimelineStylesLookup.set(
                t,
                this._localTimelineStyles
              )),
            this._loadKeyframe()
        }
        containsAnimation () {
          switch (this._keyframes.size) {
            case 0:
              return !1
            case 1:
              return this.getCurrentStyleProperties().length > 0
            default:
              return !0
          }
        }
        getCurrentStyleProperties () {
          return Object.keys(this._currentKeyframe)
        }
        get currentTime () {
          return this.startTime + this.duration
        }
        delayNextStep (e) {
          const t =
            1 == this._keyframes.size && Object.keys(this._pendingStyles).length
          this.duration || t
            ? (this.forwardTime(this.currentTime + e),
              t && this.snapshotCurrentStyles())
            : (this.startTime += e)
        }
        fork (e, t) {
          return (
            this.applyStylesToKeyframe(),
            new tu(
              this._driver,
              e,
              t || this.currentTime,
              this._elementTimelineStylesLookup
            )
          )
        }
        _loadKeyframe () {
          this._currentKeyframe &&
            (this._previousKeyframe = this._currentKeyframe),
            (this._currentKeyframe = this._keyframes.get(this.duration)),
            this._currentKeyframe ||
              ((this._currentKeyframe = Object.create(this._backFill, {})),
              this._keyframes.set(this.duration, this._currentKeyframe))
        }
        forwardFrame () {
          ;(this.duration += 1), this._loadKeyframe()
        }
        forwardTime (e) {
          this.applyStylesToKeyframe(),
            (this.duration = e),
            this._loadKeyframe()
        }
        _updateStyle (e, t) {
          ;(this._localTimelineStyles[e] = t),
            (this._globalTimelineStyles[e] = t),
            (this._styleSummary[e] = { time: this.currentTime, value: t })
        }
        allowOnlyTimelineStyles () {
          return this._currentEmptyStepKeyframe !== this._currentKeyframe
        }
        applyEmptyStep (e) {
          e && (this._previousKeyframe.easing = e),
            Object.keys(this._globalTimelineStyles).forEach(t => {
              ;(this._backFill[t] = this._globalTimelineStyles[t] || nr),
                (this._currentKeyframe[t] = nr)
            }),
            (this._currentEmptyStepKeyframe = this._currentKeyframe)
        }
        setStyles (e, t, r, i) {
          t && (this._previousKeyframe.easing = t)
          const s = (i && i.params) || {},
            o = (function fV (n, e) {
              const t = {}
              let r
              return (
                n.forEach(i => {
                  '*' === i
                    ? ((r = r || Object.keys(e)),
                      r.forEach(s => {
                        t[s] = nr
                      }))
                    : Dr(i, !1, t)
                }),
                t
              )
            })(e, this._globalTimelineStyles)
          Object.keys(o).forEach(a => {
            const l = Wl(o[a], s, r)
            ;(this._pendingStyles[a] = l),
              this._localTimelineStyles.hasOwnProperty(a) ||
                (this._backFill[a] = this._globalTimelineStyles.hasOwnProperty(
                  a
                )
                  ? this._globalTimelineStyles[a]
                  : nr),
              this._updateStyle(a, l)
          })
        }
        applyStylesToKeyframe () {
          const e = this._pendingStyles,
            t = Object.keys(e)
          0 != t.length &&
            ((this._pendingStyles = {}),
            t.forEach(r => {
              this._currentKeyframe[r] = e[r]
            }),
            Object.keys(this._localTimelineStyles).forEach(r => {
              this._currentKeyframe.hasOwnProperty(r) ||
                (this._currentKeyframe[r] = this._localTimelineStyles[r])
            }))
        }
        snapshotCurrentStyles () {
          Object.keys(this._localTimelineStyles).forEach(e => {
            const t = this._localTimelineStyles[e]
            ;(this._pendingStyles[e] = t), this._updateStyle(e, t)
          })
        }
        getFinalKeyframe () {
          return this._keyframes.get(this.duration)
        }
        get properties () {
          const e = []
          for (let t in this._currentKeyframe) e.push(t)
          return e
        }
        mergeTimelineCollectedStyles (e) {
          Object.keys(e._styleSummary).forEach(t => {
            const r = this._styleSummary[t],
              i = e._styleSummary[t]
            ;(!r || i.time > r.time) && this._updateStyle(t, i.value)
          })
        }
        buildKeyframes () {
          this.applyStylesToKeyframe()
          const e = new Set(),
            t = new Set(),
            r = 1 === this._keyframes.size && 0 === this.duration
          let i = []
          this._keyframes.forEach((a, l) => {
            const u = Dr(a, !0)
            Object.keys(u).forEach(c => {
              const d = u[c]
              '!' == d ? e.add(c) : d == nr && t.add(c)
            }),
              r || (u.offset = l / this.duration),
              i.push(u)
          })
          const s = e.size ? Kl(e.values()) : [],
            o = t.size ? Kl(t.values()) : []
          if (r) {
            const a = i[0],
              l = us(a)
            ;(a.offset = 0), (l.offset = 1), (i = [a, l])
          }
          return wh(
            this.element,
            i,
            s,
            o,
            this.duration,
            this.startTime,
            this.easing,
            !1
          )
        }
      }
      class dV extends tu {
        constructor (e, t, r, i, s, o, a = !1) {
          super(e, t, o.delay),
            (this.keyframes = r),
            (this.preStyleProps = i),
            (this.postStyleProps = s),
            (this._stretchStartingKeyframe = a),
            (this.timings = {
              duration: o.duration,
              delay: o.delay,
              easing: o.easing
            })
        }
        containsAnimation () {
          return this.keyframes.length > 1
        }
        buildKeyframes () {
          let e = this.keyframes,
            { delay: t, duration: r, easing: i } = this.timings
          if (this._stretchStartingKeyframe && t) {
            const s = [],
              o = r + t,
              a = t / o,
              l = Dr(e[0], !1)
            ;(l.offset = 0), s.push(l)
            const u = Dr(e[0], !1)
            ;(u.offset = lE(a)), s.push(u)
            const c = e.length - 1
            for (let d = 1; d <= c; d++) {
              let f = Dr(e[d], !1)
              ;(f.offset = lE((t + f.offset * r) / o)), s.push(f)
            }
            ;(r = o), (t = 0), (i = ''), (e = s)
          }
          return wh(
            this.element,
            e,
            this.preStyleProps,
            this.postStyleProps,
            r,
            t,
            i,
            !0
          )
        }
      }
      function lE (n, e = 3) {
        const t = Math.pow(10, e - 1)
        return Math.round(n * t) / t
      }
      class Ah {}
      class hV extends Ah {
        normalizePropertyName (e, t) {
          return Ch(e)
        }
        normalizeStyleValue (e, t, r, i) {
          let s = ''
          const o = r.toString().trim()
          if (pV[t] && 0 !== r && '0' !== r)
            if ('number' == typeof r) s = 'px'
            else {
              const a = r.match(/^[+-]?[\d\.]+([a-z]*)$/)
              a &&
                0 == a[1].length &&
                i.push(
                  (function uL (n, e) {
                    return new M(3005, te)
                  })()
                )
            }
          return o + s
        }
      }
      const pV = (() =>
        (function gV (n) {
          const e = {}
          return n.forEach(t => (e[t] = !0)), e
        })(
          'width,height,minWidth,minHeight,maxWidth,maxHeight,left,top,bottom,right,fontSize,outlineWidth,outlineOffset,paddingTop,paddingLeft,paddingBottom,paddingRight,marginTop,marginLeft,marginBottom,marginRight,borderRadius,borderWidth,borderTopWidth,borderLeftWidth,borderRightWidth,borderBottomWidth,textIndent,perspective'.split(
            ','
          )
        ))()
      function uE (n, e, t, r, i, s, o, a, l, u, c, d, f) {
        return {
          type: 0,
          element: n,
          triggerName: e,
          isRemovalTransition: i,
          fromState: t,
          fromStyles: s,
          toState: r,
          toStyles: o,
          timelines: a,
          queriedElements: l,
          preStyleProps: u,
          postStyleProps: c,
          totalTime: d,
          errors: f
        }
      }
      const Th = {}
      class cE {
        constructor (e, t, r) {
          ;(this._triggerName = e), (this.ast = t), (this._stateStyles = r)
        }
        match (e, t, r, i) {
          return (function mV (n, e, t, r, i) {
            return n.some(s => s(e, t, r, i))
          })(this.ast.matchers, e, t, r, i)
        }
        buildStyles (e, t, r) {
          const i = this._stateStyles['*'],
            s = this._stateStyles[e],
            o = i ? i.buildStyles(t, r) : {}
          return s ? s.buildStyles(t, r) : o
        }
        build (e, t, r, i, s, o, a, l, u, c) {
          const d = [],
            f = (this.ast.options && this.ast.options.params) || Th,
            p = this.buildStyles(r, (a && a.params) || Th, d),
            g = (l && l.params) || Th,
            _ = this.buildStyles(i, g, d),
            v = new Set(),
            m = new Map(),
            D = new Map(),
            S = 'void' === i,
            G = { params: Object.assign(Object.assign({}, f), g) },
            we = c ? [] : Sh(e, t, this.ast.animation, s, o, p, _, G, u, d)
          let Te = 0
          if (
            (we.forEach(Bt => {
              Te = Math.max(Bt.duration + Bt.delay, Te)
            }),
            d.length)
          )
            return uE(t, this._triggerName, r, i, S, p, _, [], [], m, D, Te, d)
          we.forEach(Bt => {
            const jt = Bt.element,
              ms = Pt(m, jt, {})
            Bt.preStyleProps.forEach(mn => (ms[mn] = !0))
            const ir = Pt(D, jt, {})
            Bt.postStyleProps.forEach(mn => (ir[mn] = !0)),
              jt !== t && v.add(jt)
          })
          const Vt = Kl(v.values())
          return uE(t, this._triggerName, r, i, S, p, _, we, Vt, m, D, Te)
        }
      }
      class yV {
        constructor (e, t, r) {
          ;(this.styles = e), (this.defaultParams = t), (this.normalizer = r)
        }
        buildStyles (e, t) {
          const r = {},
            i = us(this.defaultParams)
          return (
            Object.keys(e).forEach(s => {
              const o = e[s]
              null != o && (i[s] = o)
            }),
            this.styles.styles.forEach(s => {
              if ('string' != typeof s) {
                const o = s
                Object.keys(o).forEach(a => {
                  let l = o[a]
                  l.length > 1 && (l = Wl(l, i, t))
                  const u = this.normalizer.normalizePropertyName(a, t)
                  ;(l = this.normalizer.normalizeStyleValue(a, u, l, t)),
                    (r[u] = l)
                })
              }
            }),
            r
          )
        }
      }
      class vV {
        constructor (e, t, r) {
          ;(this.name = e),
            (this.ast = t),
            (this._normalizer = r),
            (this.transitionFactories = []),
            (this.states = {}),
            t.states.forEach(i => {
              this.states[i.name] = new yV(
                i.style,
                (i.options && i.options.params) || {},
                r
              )
            }),
            dE(this.states, 'true', '1'),
            dE(this.states, 'false', '0'),
            t.transitions.forEach(i => {
              this.transitionFactories.push(new cE(e, i, this.states))
            }),
            (this.fallbackTransition = (function bV (n, e, t) {
              return new cE(
                n,
                {
                  type: 1,
                  animation: { type: 2, steps: [], options: null },
                  matchers: [(o, a) => !0],
                  options: null,
                  queryCount: 0,
                  depCount: 0
                },
                e
              )
            })(e, this.states))
        }
        get containsQueries () {
          return this.ast.queryCount > 0
        }
        matchTransition (e, t, r, i) {
          return this.transitionFactories.find(o => o.match(e, t, r, i)) || null
        }
        matchStyles (e, t, r) {
          return this.fallbackTransition.buildStyles(e, t, r)
        }
      }
      function dE (n, e, t) {
        n.hasOwnProperty(e)
          ? n.hasOwnProperty(t) || (n[t] = n[e])
          : n.hasOwnProperty(t) && (n[e] = n[t])
      }
      const CV = new Jl()
      class DV {
        constructor (e, t, r) {
          ;(this.bodyNode = e),
            (this._driver = t),
            (this._normalizer = r),
            (this._animations = {}),
            (this._playersById = {}),
            (this.players = [])
        }
        register (e, t) {
          const r = [],
            i = Dh(this._driver, t, r)
          if (r.length)
            throw (function TL (n) {
              return new M(3503, te)
            })()
          this._animations[e] = i
        }
        _buildPlayer (e, t, r) {
          const i = e.element,
            s = zD(0, this._normalizer, 0, e.keyframes, t, r)
          return this._driver.animate(
            i,
            s,
            e.duration,
            e.delay,
            e.easing,
            [],
            !0
          )
        }
        create (e, t, r = {}) {
          const i = [],
            s = this._animations[e]
          let o
          const a = new Map()
          if (
            (s
              ? ((o = Sh(this._driver, t, s, yh, $l, {}, {}, r, CV, i)),
                o.forEach(c => {
                  const d = Pt(a, c.element, {})
                  c.postStyleProps.forEach(f => (d[f] = null))
                }))
              : (i.push(
                  (function IL () {
                    return new M(3300, te)
                  })()
                ),
                (o = [])),
            i.length)
          )
            throw (function xL (n) {
              return new M(3504, te)
            })()
          a.forEach((c, d) => {
            Object.keys(c).forEach(f => {
              c[f] = this._driver.computeStyle(d, f, nr)
            })
          })
          const u = Cr(
            o.map(c => {
              const d = a.get(c.element)
              return this._buildPlayer(c, {}, d)
            })
          )
          return (
            (this._playersById[e] = u),
            u.onDestroy(() => this.destroy(e)),
            this.players.push(u),
            u
          )
        }
        destroy (e) {
          const t = this._getPlayer(e)
          t.destroy(), delete this._playersById[e]
          const r = this.players.indexOf(t)
          r >= 0 && this.players.splice(r, 1)
        }
        _getPlayer (e) {
          const t = this._playersById[e]
          if (!t)
            throw (function kL (n) {
              return new M(3301, te)
            })()
          return t
        }
        listen (e, t, r, i) {
          const s = ph(t, '', '', '')
          return fh(this._getPlayer(e), r, s, i), () => {}
        }
        command (e, t, r, i) {
          if ('register' == r) return void this.register(e, i[0])
          if ('create' == r) return void this.create(e, t, i[0] || {})
          const s = this._getPlayer(e)
          switch (r) {
            case 'play':
              s.play()
              break
            case 'pause':
              s.pause()
              break
            case 'reset':
              s.reset()
              break
            case 'restart':
              s.restart()
              break
            case 'finish':
              s.finish()
              break
            case 'init':
              s.init()
              break
            case 'setPosition':
              s.setPosition(parseFloat(i[0]))
              break
            case 'destroy':
              this.destroy(e)
          }
        }
      }
      const fE = 'ng-animate-queued',
        Ih = 'ng-animate-disabled',
        AV = [],
        hE = {
          namespaceId: '',
          setForRemoval: !1,
          setForMove: !1,
          hasAnimation: !1,
          removedBeforeQueried: !1
        },
        TV = {
          namespaceId: '',
          setForMove: !1,
          setForRemoval: !1,
          hasAnimation: !1,
          removedBeforeQueried: !0
        },
        Jt = '__ng_removed'
      class xh {
        constructor (e, t = '') {
          this.namespaceId = t
          const r = e && e.hasOwnProperty('value')
          if (
            ((this.value = (function RV (n) {
              return null != n ? n : null
            })(r ? e.value : e)),
            r)
          ) {
            const s = us(e)
            delete s.value, (this.options = s)
          } else this.options = {}
          this.options.params || (this.options.params = {})
        }
        get params () {
          return this.options.params
        }
        absorbOptions (e) {
          const t = e.params
          if (t) {
            const r = this.options.params
            Object.keys(t).forEach(i => {
              null == r[i] && (r[i] = t[i])
            })
          }
        }
      }
      const Po = 'void',
        kh = new xh(Po)
      class IV {
        constructor (e, t, r) {
          ;(this.id = e),
            (this.hostElement = t),
            (this._engine = r),
            (this.players = []),
            (this._triggers = {}),
            (this._queue = []),
            (this._elementListeners = new Map()),
            (this._hostClassName = 'ng-tns-' + e),
            en(t, this._hostClassName)
        }
        listen (e, t, r, i) {
          if (!this._triggers.hasOwnProperty(t))
            throw (function RL (n, e) {
              return new M(3302, te)
            })()
          if (null == r || 0 == r.length)
            throw (function OL (n) {
              return new M(3303, te)
            })()
          if (
            !(function OV (n) {
              return 'start' == n || 'done' == n
            })(r)
          )
            throw (function FL (n, e) {
              return new M(3400, te)
            })()
          const s = Pt(this._elementListeners, e, []),
            o = { name: t, phase: r, callback: i }
          s.push(o)
          const a = Pt(this._engine.statesByElement, e, {})
          return (
            a.hasOwnProperty(t) ||
              (en(e, zl), en(e, zl + '-' + t), (a[t] = kh)),
            () => {
              this._engine.afterFlush(() => {
                const l = s.indexOf(o)
                l >= 0 && s.splice(l, 1), this._triggers[t] || delete a[t]
              })
            }
          )
        }
        register (e, t) {
          return !this._triggers[e] && ((this._triggers[e] = t), !0)
        }
        _getTrigger (e) {
          const t = this._triggers[e]
          if (!t)
            throw (function NL (n) {
              return new M(3401, te)
            })()
          return t
        }
        trigger (e, t, r, i = !0) {
          const s = this._getTrigger(t),
            o = new Rh(this.id, t, e)
          let a = this._engine.statesByElement.get(e)
          a ||
            (en(e, zl),
            en(e, zl + '-' + t),
            this._engine.statesByElement.set(e, (a = {})))
          let l = a[t]
          const u = new xh(r, this.id)
          if (
            (!(r && r.hasOwnProperty('value')) &&
              l &&
              u.absorbOptions(l.options),
            (a[t] = u),
            l || (l = kh),
            u.value !== Po && l.value === u.value)
          ) {
            if (
              !(function PV (n, e) {
                const t = Object.keys(n),
                  r = Object.keys(e)
                if (t.length != r.length) return !1
                for (let i = 0; i < t.length; i++) {
                  const s = t[i]
                  if (!e.hasOwnProperty(s) || n[s] !== e[s]) return !1
                }
                return !0
              })(l.params, u.params)
            ) {
              const g = [],
                _ = s.matchStyles(l.value, l.params, g),
                v = s.matchStyles(u.value, u.params, g)
              g.length
                ? this._engine.reportError(g)
                : this._engine.afterFlush(() => {
                    Jr(e, _), Rn(e, v)
                  })
            }
            return
          }
          const f = Pt(this._engine.playersByElement, e, [])
          f.forEach(g => {
            g.namespaceId == this.id &&
              g.triggerName == t &&
              g.queued &&
              g.destroy()
          })
          let h = s.matchTransition(l.value, u.value, e, u.params),
            p = !1
          if (!h) {
            if (!i) return
            ;(h = s.fallbackTransition), (p = !0)
          }
          return (
            this._engine.totalQueuedPlayers++,
            this._queue.push({
              element: e,
              triggerName: t,
              transition: h,
              fromState: l,
              toState: u,
              player: o,
              isFallbackTransition: p
            }),
            p ||
              (en(e, fE),
              o.onStart(() => {
                cs(e, fE)
              })),
            o.onDone(() => {
              let g = this.players.indexOf(o)
              g >= 0 && this.players.splice(g, 1)
              const _ = this._engine.playersByElement.get(e)
              if (_) {
                let v = _.indexOf(o)
                v >= 0 && _.splice(v, 1)
              }
            }),
            this.players.push(o),
            f.push(o),
            o
          )
        }
        deregister (e) {
          delete this._triggers[e],
            this._engine.statesByElement.forEach((t, r) => {
              delete t[e]
            }),
            this._elementListeners.forEach((t, r) => {
              this._elementListeners.set(
                r,
                t.filter(i => i.name != e)
              )
            })
        }
        clearElementCache (e) {
          this._engine.statesByElement.delete(e),
            this._elementListeners.delete(e)
          const t = this._engine.playersByElement.get(e)
          t &&
            (t.forEach(r => r.destroy()),
            this._engine.playersByElement.delete(e))
        }
        _signalRemovalForInnerTriggers (e, t) {
          const r = this._engine.driver.query(e, Gl, !0)
          r.forEach(i => {
            if (i[Jt]) return
            const s = this._engine.fetchNamespacesByElement(i)
            s.size
              ? s.forEach(o => o.triggerLeaveAnimation(i, t, !1, !0))
              : this.clearElementCache(i)
          }),
            this._engine.afterFlushAnimationsDone(() =>
              r.forEach(i => this.clearElementCache(i))
            )
        }
        triggerLeaveAnimation (e, t, r, i) {
          const s = this._engine.statesByElement.get(e),
            o = new Map()
          if (s) {
            const a = []
            if (
              (Object.keys(s).forEach(l => {
                if ((o.set(l, s[l].value), this._triggers[l])) {
                  const u = this.trigger(e, l, Po, i)
                  u && a.push(u)
                }
              }),
              a.length)
            )
              return (
                this._engine.markElementAsRemoved(this.id, e, !0, t, o),
                r && Cr(a).onDone(() => this._engine.processLeaveNode(e)),
                !0
              )
          }
          return !1
        }
        prepareLeaveAnimationListeners (e) {
          const t = this._elementListeners.get(e),
            r = this._engine.statesByElement.get(e)
          if (t && r) {
            const i = new Set()
            t.forEach(s => {
              const o = s.name
              if (i.has(o)) return
              i.add(o)
              const l = this._triggers[o].fallbackTransition,
                u = r[o] || kh,
                c = new xh(Po),
                d = new Rh(this.id, o, e)
              this._engine.totalQueuedPlayers++,
                this._queue.push({
                  element: e,
                  triggerName: o,
                  transition: l,
                  fromState: u,
                  toState: c,
                  player: d,
                  isFallbackTransition: !0
                })
            })
          }
        }
        removeNode (e, t) {
          const r = this._engine
          if (
            (e.childElementCount && this._signalRemovalForInnerTriggers(e, t),
            this.triggerLeaveAnimation(e, t, !0))
          )
            return
          let i = !1
          if (r.totalAnimations) {
            const s = r.players.length ? r.playersByQueriedElement.get(e) : []
            if (s && s.length) i = !0
            else {
              let o = e
              for (; (o = o.parentNode); )
                if (r.statesByElement.get(o)) {
                  i = !0
                  break
                }
            }
          }
          if ((this.prepareLeaveAnimationListeners(e), i))
            r.markElementAsRemoved(this.id, e, !1, t)
          else {
            const s = e[Jt]
            ;(!s || s === hE) &&
              (r.afterFlush(() => this.clearElementCache(e)),
              r.destroyInnerAnimations(e),
              r._onRemovalComplete(e, t))
          }
        }
        insertNode (e, t) {
          en(e, this._hostClassName)
        }
        drainQueuedTransitions (e) {
          const t = []
          return (
            this._queue.forEach(r => {
              const i = r.player
              if (i.destroyed) return
              const s = r.element,
                o = this._elementListeners.get(s)
              o &&
                o.forEach(a => {
                  if (a.name == r.triggerName) {
                    const l = ph(
                      s,
                      r.triggerName,
                      r.fromState.value,
                      r.toState.value
                    )
                    ;(l._data = e), fh(r.player, a.phase, l, a.callback)
                  }
                }),
                i.markedForDestroy
                  ? this._engine.afterFlush(() => {
                      i.destroy()
                    })
                  : t.push(r)
            }),
            (this._queue = []),
            t.sort((r, i) => {
              const s = r.transition.ast.depCount,
                o = i.transition.ast.depCount
              return 0 == s || 0 == o
                ? s - o
                : this._engine.driver.containsElement(r.element, i.element)
                ? 1
                : -1
            })
          )
        }
        destroy (e) {
          this.players.forEach(t => t.destroy()),
            this._signalRemovalForInnerTriggers(this.hostElement, e)
        }
        elementContainsData (e) {
          let t = !1
          return (
            this._elementListeners.has(e) && (t = !0),
            (t = !!this._queue.find(r => r.element === e) || t),
            t
          )
        }
      }
      class xV {
        constructor (e, t, r) {
          ;(this.bodyNode = e),
            (this.driver = t),
            (this._normalizer = r),
            (this.players = []),
            (this.newHostElements = new Map()),
            (this.playersByElement = new Map()),
            (this.playersByQueriedElement = new Map()),
            (this.statesByElement = new Map()),
            (this.disabledNodes = new Set()),
            (this.totalAnimations = 0),
            (this.totalQueuedPlayers = 0),
            (this._namespaceLookup = {}),
            (this._namespaceList = []),
            (this._flushFns = []),
            (this._whenQuietFns = []),
            (this.namespacesByHostElement = new Map()),
            (this.collectedEnterElements = []),
            (this.collectedLeaveElements = []),
            (this.onRemovalComplete = (i, s) => {})
        }
        _onRemovalComplete (e, t) {
          this.onRemovalComplete(e, t)
        }
        get queuedPlayers () {
          const e = []
          return (
            this._namespaceList.forEach(t => {
              t.players.forEach(r => {
                r.queued && e.push(r)
              })
            }),
            e
          )
        }
        createNamespace (e, t) {
          const r = new IV(e, t, this)
          return (
            this.bodyNode && this.driver.containsElement(this.bodyNode, t)
              ? this._balanceNamespaceList(r, t)
              : (this.newHostElements.set(t, r), this.collectEnterElement(t)),
            (this._namespaceLookup[e] = r)
          )
        }
        _balanceNamespaceList (e, t) {
          const r = this._namespaceList.length - 1
          if (r >= 0) {
            let i = !1
            for (let s = r; s >= 0; s--)
              if (
                this.driver.containsElement(
                  this._namespaceList[s].hostElement,
                  t
                )
              ) {
                this._namespaceList.splice(s + 1, 0, e), (i = !0)
                break
              }
            i || this._namespaceList.splice(0, 0, e)
          } else this._namespaceList.push(e)
          return this.namespacesByHostElement.set(t, e), e
        }
        register (e, t) {
          let r = this._namespaceLookup[e]
          return r || (r = this.createNamespace(e, t)), r
        }
        registerTrigger (e, t, r) {
          let i = this._namespaceLookup[e]
          i && i.register(t, r) && this.totalAnimations++
        }
        destroy (e, t) {
          if (!e) return
          const r = this._fetchNamespace(e)
          this.afterFlush(() => {
            this.namespacesByHostElement.delete(r.hostElement),
              delete this._namespaceLookup[e]
            const i = this._namespaceList.indexOf(r)
            i >= 0 && this._namespaceList.splice(i, 1)
          }),
            this.afterFlushAnimationsDone(() => r.destroy(t))
        }
        _fetchNamespace (e) {
          return this._namespaceLookup[e]
        }
        fetchNamespacesByElement (e) {
          const t = new Set(),
            r = this.statesByElement.get(e)
          if (r) {
            const i = Object.keys(r)
            for (let s = 0; s < i.length; s++) {
              const o = r[i[s]].namespaceId
              if (o) {
                const a = this._fetchNamespace(o)
                a && t.add(a)
              }
            }
          }
          return t
        }
        trigger (e, t, r, i) {
          if (nu(t)) {
            const s = this._fetchNamespace(e)
            if (s) return s.trigger(t, r, i), !0
          }
          return !1
        }
        insertNode (e, t, r, i) {
          if (!nu(t)) return
          const s = t[Jt]
          if (s && s.setForRemoval) {
            ;(s.setForRemoval = !1), (s.setForMove = !0)
            const o = this.collectedLeaveElements.indexOf(t)
            o >= 0 && this.collectedLeaveElements.splice(o, 1)
          }
          if (e) {
            const o = this._fetchNamespace(e)
            o && o.insertNode(t, r)
          }
          i && this.collectEnterElement(t)
        }
        collectEnterElement (e) {
          this.collectedEnterElements.push(e)
        }
        markElementAsDisabled (e, t) {
          t
            ? this.disabledNodes.has(e) ||
              (this.disabledNodes.add(e), en(e, Ih))
            : this.disabledNodes.has(e) &&
              (this.disabledNodes.delete(e), cs(e, Ih))
        }
        removeNode (e, t, r, i) {
          if (nu(t)) {
            const s = e ? this._fetchNamespace(e) : null
            if (
              (s ? s.removeNode(t, i) : this.markElementAsRemoved(e, t, !1, i),
              r)
            ) {
              const o = this.namespacesByHostElement.get(t)
              o && o.id !== e && o.removeNode(t, i)
            }
          } else this._onRemovalComplete(t, i)
        }
        markElementAsRemoved (e, t, r, i, s) {
          this.collectedLeaveElements.push(t),
            (t[Jt] = {
              namespaceId: e,
              setForRemoval: i,
              hasAnimation: r,
              removedBeforeQueried: !1,
              previousTriggersValues: s
            })
        }
        listen (e, t, r, i, s) {
          return nu(t) ? this._fetchNamespace(e).listen(t, r, i, s) : () => {}
        }
        _buildInstruction (e, t, r, i, s) {
          return e.transition.build(
            this.driver,
            e.element,
            e.fromState.value,
            e.toState.value,
            r,
            i,
            e.fromState.options,
            e.toState.options,
            t,
            s
          )
        }
        destroyInnerAnimations (e) {
          let t = this.driver.query(e, Gl, !0)
          t.forEach(r => this.destroyActiveAnimationsForElement(r)),
            0 != this.playersByQueriedElement.size &&
              ((t = this.driver.query(e, _h, !0)),
              t.forEach(r => this.finishActiveQueriedAnimationOnElement(r)))
        }
        destroyActiveAnimationsForElement (e) {
          const t = this.playersByElement.get(e)
          t &&
            t.forEach(r => {
              r.queued ? (r.markedForDestroy = !0) : r.destroy()
            })
        }
        finishActiveQueriedAnimationOnElement (e) {
          const t = this.playersByQueriedElement.get(e)
          t && t.forEach(r => r.finish())
        }
        whenRenderingDone () {
          return new Promise(e => {
            if (this.players.length) return Cr(this.players).onDone(() => e())
            e()
          })
        }
        processLeaveNode (e) {
          var t
          const r = e[Jt]
          if (r && r.setForRemoval) {
            if (((e[Jt] = hE), r.namespaceId)) {
              this.destroyInnerAnimations(e)
              const i = this._fetchNamespace(r.namespaceId)
              i && i.clearElementCache(e)
            }
            this._onRemovalComplete(e, r.setForRemoval)
          }
          ;(null === (t = e.classList) || void 0 === t
            ? void 0
            : t.contains(Ih)) && this.markElementAsDisabled(e, !1),
            this.driver.query(e, '.ng-animate-disabled', !0).forEach(i => {
              this.markElementAsDisabled(i, !1)
            })
        }
        flush (e = -1) {
          let t = []
          if (
            (this.newHostElements.size &&
              (this.newHostElements.forEach((r, i) =>
                this._balanceNamespaceList(r, i)
              ),
              this.newHostElements.clear()),
            this.totalAnimations && this.collectedEnterElements.length)
          )
            for (let r = 0; r < this.collectedEnterElements.length; r++)
              en(this.collectedEnterElements[r], 'ng-star-inserted')
          if (
            this._namespaceList.length &&
            (this.totalQueuedPlayers || this.collectedLeaveElements.length)
          ) {
            const r = []
            try {
              t = this._flushAnimations(r, e)
            } finally {
              for (let i = 0; i < r.length; i++) r[i]()
            }
          } else
            for (let r = 0; r < this.collectedLeaveElements.length; r++)
              this.processLeaveNode(this.collectedLeaveElements[r])
          if (
            ((this.totalQueuedPlayers = 0),
            (this.collectedEnterElements.length = 0),
            (this.collectedLeaveElements.length = 0),
            this._flushFns.forEach(r => r()),
            (this._flushFns = []),
            this._whenQuietFns.length)
          ) {
            const r = this._whenQuietFns
            ;(this._whenQuietFns = []),
              t.length
                ? Cr(t).onDone(() => {
                    r.forEach(i => i())
                  })
                : r.forEach(i => i())
          }
        }
        reportError (e) {
          throw (function PL (n) {
            return new M(3402, te)
          })()
        }
        _flushAnimations (e, t) {
          const r = new Jl(),
            i = [],
            s = new Map(),
            o = [],
            a = new Map(),
            l = new Map(),
            u = new Map(),
            c = new Set()
          this.disabledNodes.forEach(I => {
            c.add(I)
            const O = this.driver.query(I, '.ng-animate-queued', !0)
            for (let L = 0; L < O.length; L++) c.add(O[L])
          })
          const d = this.bodyNode,
            f = Array.from(this.statesByElement.keys()),
            h = mE(f, this.collectedEnterElements),
            p = new Map()
          let g = 0
          h.forEach((I, O) => {
            const L = yh + g++
            p.set(O, L), I.forEach(ie => en(ie, L))
          })
          const _ = [],
            v = new Set(),
            m = new Set()
          for (let I = 0; I < this.collectedLeaveElements.length; I++) {
            const O = this.collectedLeaveElements[I],
              L = O[Jt]
            L &&
              L.setForRemoval &&
              (_.push(O),
              v.add(O),
              L.hasAnimation
                ? this.driver
                    .query(O, '.ng-star-inserted', !0)
                    .forEach(ie => v.add(ie))
                : m.add(O))
          }
          const D = new Map(),
            S = mE(f, Array.from(v))
          S.forEach((I, O) => {
            const L = $l + g++
            D.set(O, L), I.forEach(ie => en(ie, L))
          }),
            e.push(() => {
              h.forEach((I, O) => {
                const L = p.get(O)
                I.forEach(ie => cs(ie, L))
              }),
                S.forEach((I, O) => {
                  const L = D.get(O)
                  I.forEach(ie => cs(ie, L))
                }),
                _.forEach(I => {
                  this.processLeaveNode(I)
                })
            })
          const G = [],
            we = []
          for (let I = this._namespaceList.length - 1; I >= 0; I--)
            this._namespaceList[I].drainQueuedTransitions(t).forEach(L => {
              const ie = L.player,
                nt = L.element
              if ((G.push(ie), this.collectedEnterElements.length)) {
                const bt = nt[Jt]
                if (bt && bt.setForMove) {
                  if (
                    bt.previousTriggersValues &&
                    bt.previousTriggersValues.has(L.triggerName)
                  ) {
                    const ri = bt.previousTriggersValues.get(L.triggerName),
                      Ar = this.statesByElement.get(L.element)
                    Ar && Ar[L.triggerName] && (Ar[L.triggerName].value = ri)
                  }
                  return void ie.destroy()
                }
              }
              const Fn = !d || !this.driver.containsElement(d, nt),
                Ut = D.get(nt),
                Mr = p.get(nt),
                Ie = this._buildInstruction(L, r, Mr, Ut, Fn)
              if (Ie.errors && Ie.errors.length) return void we.push(Ie)
              if (Fn)
                return (
                  ie.onStart(() => Jr(nt, Ie.fromStyles)),
                  ie.onDestroy(() => Rn(nt, Ie.toStyles)),
                  void i.push(ie)
                )
              if (L.isFallbackTransition)
                return (
                  ie.onStart(() => Jr(nt, Ie.fromStyles)),
                  ie.onDestroy(() => Rn(nt, Ie.toStyles)),
                  void i.push(ie)
                )
              const Vw = []
              Ie.timelines.forEach(bt => {
                ;(bt.stretchStartingKeyframe = !0),
                  this.disabledNodes.has(bt.element) || Vw.push(bt)
              }),
                (Ie.timelines = Vw),
                r.append(nt, Ie.timelines),
                o.push({ instruction: Ie, player: ie, element: nt }),
                Ie.queriedElements.forEach(bt => Pt(a, bt, []).push(ie)),
                Ie.preStyleProps.forEach((bt, ri) => {
                  const Ar = Object.keys(bt)
                  if (Ar.length) {
                    let ii = l.get(ri)
                    ii || l.set(ri, (ii = new Set())),
                      Ar.forEach(dp => ii.add(dp))
                  }
                }),
                Ie.postStyleProps.forEach((bt, ri) => {
                  const Ar = Object.keys(bt)
                  let ii = u.get(ri)
                  ii || u.set(ri, (ii = new Set())),
                    Ar.forEach(dp => ii.add(dp))
                })
            })
          if (we.length) {
            const I = []
            we.forEach(O => {
              I.push(
                (function LL (n, e) {
                  return new M(3505, te)
                })()
              )
            }),
              G.forEach(O => O.destroy()),
              this.reportError(I)
          }
          const Te = new Map(),
            Vt = new Map()
          o.forEach(I => {
            const O = I.element
            r.has(O) &&
              (Vt.set(O, O),
              this._beforeAnimationBuild(
                I.player.namespaceId,
                I.instruction,
                Te
              ))
          }),
            i.forEach(I => {
              const O = I.element
              this._getPreviousPlayers(
                O,
                !1,
                I.namespaceId,
                I.triggerName,
                null
              ).forEach(ie => {
                Pt(Te, O, []).push(ie), ie.destroy()
              })
            })
          const Bt = _.filter(I => _E(I, l, u)),
            jt = new Map()
          gE(jt, this.driver, m, u, nr).forEach(I => {
            _E(I, l, u) && Bt.push(I)
          })
          const ir = new Map()
          h.forEach((I, O) => {
            gE(ir, this.driver, new Set(I), l, '!')
          }),
            Bt.forEach(I => {
              const O = jt.get(I),
                L = ir.get(I)
              jt.set(I, Object.assign(Object.assign({}, O), L))
            })
          const mn = [],
            ys = [],
            _s = {}
          o.forEach(I => {
            const { element: O, player: L, instruction: ie } = I
            if (r.has(O)) {
              if (c.has(O))
                return (
                  L.onDestroy(() => Rn(O, ie.toStyles)),
                  (L.disabled = !0),
                  L.overrideTotalTime(ie.totalTime),
                  void i.push(L)
                )
              let nt = _s
              if (Vt.size > 1) {
                let Ut = O
                const Mr = []
                for (; (Ut = Ut.parentNode); ) {
                  const Ie = Vt.get(Ut)
                  if (Ie) {
                    nt = Ie
                    break
                  }
                  Mr.push(Ut)
                }
                Mr.forEach(Ie => Vt.set(Ie, nt))
              }
              const Fn = this._buildAnimation(L.namespaceId, ie, Te, s, ir, jt)
              if ((L.setRealPlayer(Fn), nt === _s)) mn.push(L)
              else {
                const Ut = this.playersByElement.get(nt)
                Ut && Ut.length && (L.parentPlayer = Cr(Ut)), i.push(L)
              }
            } else
              Jr(O, ie.fromStyles),
                L.onDestroy(() => Rn(O, ie.toStyles)),
                ys.push(L),
                c.has(O) && i.push(L)
          }),
            ys.forEach(I => {
              const O = s.get(I.element)
              if (O && O.length) {
                const L = Cr(O)
                I.setRealPlayer(L)
              }
            }),
            i.forEach(I => {
              I.parentPlayer ? I.syncPlayerEvents(I.parentPlayer) : I.destroy()
            })
          for (let I = 0; I < _.length; I++) {
            const O = _[I],
              L = O[Jt]
            if ((cs(O, $l), L && L.hasAnimation)) continue
            let ie = []
            if (a.size) {
              let Fn = a.get(O)
              Fn && Fn.length && ie.push(...Fn)
              let Ut = this.driver.query(O, _h, !0)
              for (let Mr = 0; Mr < Ut.length; Mr++) {
                let Ie = a.get(Ut[Mr])
                Ie && Ie.length && ie.push(...Ie)
              }
            }
            const nt = ie.filter(Fn => !Fn.destroyed)
            nt.length ? FV(this, O, nt) : this.processLeaveNode(O)
          }
          return (
            (_.length = 0),
            mn.forEach(I => {
              this.players.push(I),
                I.onDone(() => {
                  I.destroy()
                  const O = this.players.indexOf(I)
                  this.players.splice(O, 1)
                }),
                I.play()
            }),
            mn
          )
        }
        elementContainsData (e, t) {
          let r = !1
          const i = t[Jt]
          return (
            i && i.setForRemoval && (r = !0),
            this.playersByElement.has(t) && (r = !0),
            this.playersByQueriedElement.has(t) && (r = !0),
            this.statesByElement.has(t) && (r = !0),
            this._fetchNamespace(e).elementContainsData(t) || r
          )
        }
        afterFlush (e) {
          this._flushFns.push(e)
        }
        afterFlushAnimationsDone (e) {
          this._whenQuietFns.push(e)
        }
        _getPreviousPlayers (e, t, r, i, s) {
          let o = []
          if (t) {
            const a = this.playersByQueriedElement.get(e)
            a && (o = a)
          } else {
            const a = this.playersByElement.get(e)
            if (a) {
              const l = !s || s == Po
              a.forEach(u => {
                u.queued || (!l && u.triggerName != i) || o.push(u)
              })
            }
          }
          return (
            (r || i) &&
              (o = o.filter(
                a => !((r && r != a.namespaceId) || (i && i != a.triggerName))
              )),
            o
          )
        }
        _beforeAnimationBuild (e, t, r) {
          const s = t.element,
            o = t.isRemovalTransition ? void 0 : e,
            a = t.isRemovalTransition ? void 0 : t.triggerName
          for (const l of t.timelines) {
            const u = l.element,
              c = u !== s,
              d = Pt(r, u, [])
            this._getPreviousPlayers(u, c, o, a, t.toState).forEach(h => {
              const p = h.getRealPlayer()
              p.beforeDestroy && p.beforeDestroy(), h.destroy(), d.push(h)
            })
          }
          Jr(s, t.fromStyles)
        }
        _buildAnimation (e, t, r, i, s, o) {
          const a = t.triggerName,
            l = t.element,
            u = [],
            c = new Set(),
            d = new Set(),
            f = t.timelines.map(p => {
              const g = p.element
              c.add(g)
              const _ = g[Jt]
              if (_ && _.removedBeforeQueried)
                return new Fo(p.duration, p.delay)
              const v = g !== l,
                m = (function NV (n) {
                  const e = []
                  return yE(n, e), e
                })((r.get(g) || AV).map(Te => Te.getRealPlayer())).filter(
                  Te => !!Te.element && Te.element === g
                ),
                D = s.get(g),
                S = o.get(g),
                G = zD(0, this._normalizer, 0, p.keyframes, D, S),
                we = this._buildPlayer(p, G, m)
              if ((p.subTimeline && i && d.add(g), v)) {
                const Te = new Rh(e, a, g)
                Te.setRealPlayer(we), u.push(Te)
              }
              return we
            })
          u.forEach(p => {
            Pt(this.playersByQueriedElement, p.element, []).push(p),
              p.onDone(() =>
                (function kV (n, e, t) {
                  let r
                  if (n instanceof Map) {
                    if (((r = n.get(e)), r)) {
                      if (r.length) {
                        const i = r.indexOf(t)
                        r.splice(i, 1)
                      }
                      0 == r.length && n.delete(e)
                    }
                  } else if (((r = n[e]), r)) {
                    if (r.length) {
                      const i = r.indexOf(t)
                      r.splice(i, 1)
                    }
                    0 == r.length && delete n[e]
                  }
                  return r
                })(this.playersByQueriedElement, p.element, p)
              )
          }),
            c.forEach(p => en(p, JD))
          const h = Cr(f)
          return (
            h.onDestroy(() => {
              c.forEach(p => cs(p, JD)), Rn(l, t.toStyles)
            }),
            d.forEach(p => {
              Pt(i, p, []).push(h)
            }),
            h
          )
        }
        _buildPlayer (e, t, r) {
          return t.length > 0
            ? this.driver.animate(
                e.element,
                t,
                e.duration,
                e.delay,
                e.easing,
                r
              )
            : new Fo(e.duration, e.delay)
        }
      }
      class Rh {
        constructor (e, t, r) {
          ;(this.namespaceId = e),
            (this.triggerName = t),
            (this.element = r),
            (this._player = new Fo()),
            (this._containsRealPlayer = !1),
            (this._queuedCallbacks = {}),
            (this.destroyed = !1),
            (this.markedForDestroy = !1),
            (this.disabled = !1),
            (this.queued = !0),
            (this.totalTime = 0)
        }
        setRealPlayer (e) {
          this._containsRealPlayer ||
            ((this._player = e),
            Object.keys(this._queuedCallbacks).forEach(t => {
              this._queuedCallbacks[t].forEach(r => fh(e, t, void 0, r))
            }),
            (this._queuedCallbacks = {}),
            (this._containsRealPlayer = !0),
            this.overrideTotalTime(e.totalTime),
            (this.queued = !1))
        }
        getRealPlayer () {
          return this._player
        }
        overrideTotalTime (e) {
          this.totalTime = e
        }
        syncPlayerEvents (e) {
          const t = this._player
          t.triggerCallback && e.onStart(() => t.triggerCallback('start')),
            e.onDone(() => this.finish()),
            e.onDestroy(() => this.destroy())
        }
        _queueEvent (e, t) {
          Pt(this._queuedCallbacks, e, []).push(t)
        }
        onDone (e) {
          this.queued && this._queueEvent('done', e), this._player.onDone(e)
        }
        onStart (e) {
          this.queued && this._queueEvent('start', e), this._player.onStart(e)
        }
        onDestroy (e) {
          this.queued && this._queueEvent('destroy', e),
            this._player.onDestroy(e)
        }
        init () {
          this._player.init()
        }
        hasStarted () {
          return !this.queued && this._player.hasStarted()
        }
        play () {
          !this.queued && this._player.play()
        }
        pause () {
          !this.queued && this._player.pause()
        }
        restart () {
          !this.queued && this._player.restart()
        }
        finish () {
          this._player.finish()
        }
        destroy () {
          ;(this.destroyed = !0), this._player.destroy()
        }
        reset () {
          !this.queued && this._player.reset()
        }
        setPosition (e) {
          this.queued || this._player.setPosition(e)
        }
        getPosition () {
          return this.queued ? 0 : this._player.getPosition()
        }
        triggerCallback (e) {
          const t = this._player
          t.triggerCallback && t.triggerCallback(e)
        }
      }
      function nu (n) {
        return n && 1 === n.nodeType
      }
      function pE (n, e) {
        const t = n.style.display
        return (n.style.display = null != e ? e : 'none'), t
      }
      function gE (n, e, t, r, i) {
        const s = []
        t.forEach(l => s.push(pE(l)))
        const o = []
        r.forEach((l, u) => {
          const c = {}
          l.forEach(d => {
            const f = (c[d] = e.computeStyle(u, d, i))
            ;(!f || 0 == f.length) && ((u[Jt] = TV), o.push(u))
          }),
            n.set(u, c)
        })
        let a = 0
        return t.forEach(l => pE(l, s[a++])), o
      }
      function mE (n, e) {
        const t = new Map()
        if ((n.forEach(a => t.set(a, [])), 0 == e.length)) return t
        const i = new Set(e),
          s = new Map()
        function o (a) {
          if (!a) return 1
          let l = s.get(a)
          if (l) return l
          const u = a.parentNode
          return (l = t.has(u) ? u : i.has(u) ? 1 : o(u)), s.set(a, l), l
        }
        return (
          e.forEach(a => {
            const l = o(a)
            1 !== l && t.get(l).push(a)
          }),
          t
        )
      }
      function en (n, e) {
        var t
        null === (t = n.classList) || void 0 === t || t.add(e)
      }
      function cs (n, e) {
        var t
        null === (t = n.classList) || void 0 === t || t.remove(e)
      }
      function FV (n, e, t) {
        Cr(t).onDone(() => n.processLeaveNode(e))
      }
      function yE (n, e) {
        for (let t = 0; t < n.length; t++) {
          const r = n[t]
          r instanceof HD ? yE(r.players, e) : e.push(r)
        }
      }
      function _E (n, e, t) {
        const r = t.get(n)
        if (!r) return !1
        let i = e.get(n)
        return i ? r.forEach(s => i.add(s)) : e.set(n, r), t.delete(n), !0
      }
      class ru {
        constructor (e, t, r) {
          ;(this.bodyNode = e),
            (this._driver = t),
            (this._normalizer = r),
            (this._triggerCache = {}),
            (this.onRemovalComplete = (i, s) => {}),
            (this._transitionEngine = new xV(e, t, r)),
            (this._timelineEngine = new DV(e, t, r)),
            (this._transitionEngine.onRemovalComplete = (i, s) =>
              this.onRemovalComplete(i, s))
        }
        registerTrigger (e, t, r, i, s) {
          const o = e + '-' + i
          let a = this._triggerCache[o]
          if (!a) {
            const l = [],
              u = Dh(this._driver, s, l)
            if (l.length)
              throw (function ML (n, e) {
                return new M(3404, te)
              })()
            ;(a = (function _V (n, e, t) {
              return new vV(n, e, t)
            })(i, u, this._normalizer)),
              (this._triggerCache[o] = a)
          }
          this._transitionEngine.registerTrigger(t, i, a)
        }
        register (e, t) {
          this._transitionEngine.register(e, t)
        }
        destroy (e, t) {
          this._transitionEngine.destroy(e, t)
        }
        onInsert (e, t, r, i) {
          this._transitionEngine.insertNode(e, t, r, i)
        }
        onRemove (e, t, r, i) {
          this._transitionEngine.removeNode(e, t, i || !1, r)
        }
        disableAnimations (e, t) {
          this._transitionEngine.markElementAsDisabled(e, t)
        }
        process (e, t, r, i) {
          if ('@' == r.charAt(0)) {
            const [s, o] = GD(r)
            this._timelineEngine.command(s, t, o, i)
          } else this._transitionEngine.trigger(e, t, r, i)
        }
        listen (e, t, r, i, s) {
          if ('@' == r.charAt(0)) {
            const [o, a] = GD(r)
            return this._timelineEngine.listen(o, t, a, s)
          }
          return this._transitionEngine.listen(e, t, r, i, s)
        }
        flush (e = -1) {
          this._transitionEngine.flush(e)
        }
        get players () {
          return this._transitionEngine.players.concat(
            this._timelineEngine.players
          )
        }
        whenRenderingDone () {
          return this._transitionEngine.whenRenderingDone()
        }
      }
      let VV = (() => {
        class n {
          constructor (t, r, i) {
            ;(this._element = t),
              (this._startStyles = r),
              (this._endStyles = i),
              (this._state = 0)
            let s = n.initialStylesByElement.get(t)
            s || n.initialStylesByElement.set(t, (s = {})),
              (this._initialStyles = s)
          }
          start () {
            this._state < 1 &&
              (this._startStyles &&
                Rn(this._element, this._startStyles, this._initialStyles),
              (this._state = 1))
          }
          finish () {
            this.start(),
              this._state < 2 &&
                (Rn(this._element, this._initialStyles),
                this._endStyles &&
                  (Rn(this._element, this._endStyles),
                  (this._endStyles = null)),
                (this._state = 1))
          }
          destroy () {
            this.finish(),
              this._state < 3 &&
                (n.initialStylesByElement.delete(this._element),
                this._startStyles &&
                  (Jr(this._element, this._startStyles),
                  (this._endStyles = null)),
                this._endStyles &&
                  (Jr(this._element, this._endStyles),
                  (this._endStyles = null)),
                Rn(this._element, this._initialStyles),
                (this._state = 3))
          }
        }
        return (n.initialStylesByElement = new WeakMap()), n
      })()
      function Oh (n) {
        let e = null
        const t = Object.keys(n)
        for (let r = 0; r < t.length; r++) {
          const i = t[r]
          BV(i) && ((e = e || {}), (e[i] = n[i]))
        }
        return e
      }
      function BV (n) {
        return 'display' === n || 'position' === n
      }
      class vE {
        constructor (e, t, r, i) {
          ;(this.element = e),
            (this.keyframes = t),
            (this.options = r),
            (this._specialStyles = i),
            (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._initialized = !1),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this.time = 0),
            (this.parentPlayer = null),
            (this.currentSnapshot = {}),
            (this._duration = r.duration),
            (this._delay = r.delay || 0),
            (this.time = this._duration + this._delay)
        }
        _onFinish () {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach(e => e()),
            (this._onDoneFns = []))
        }
        init () {
          this._buildPlayer(), this._preparePlayerBeforeStart()
        }
        _buildPlayer () {
          if (this._initialized) return
          this._initialized = !0
          const e = this.keyframes
          ;(this.domPlayer = this._triggerWebAnimation(
            this.element,
            e,
            this.options
          )),
            (this._finalKeyframe = e.length ? e[e.length - 1] : {}),
            this.domPlayer.addEventListener('finish', () => this._onFinish())
        }
        _preparePlayerBeforeStart () {
          this._delay ? this._resetDomPlayerState() : this.domPlayer.pause()
        }
        _triggerWebAnimation (e, t, r) {
          return e.animate(t, r)
        }
        onStart (e) {
          this._onStartFns.push(e)
        }
        onDone (e) {
          this._onDoneFns.push(e)
        }
        onDestroy (e) {
          this._onDestroyFns.push(e)
        }
        play () {
          this._buildPlayer(),
            this.hasStarted() ||
              (this._onStartFns.forEach(e => e()),
              (this._onStartFns = []),
              (this._started = !0),
              this._specialStyles && this._specialStyles.start()),
            this.domPlayer.play()
        }
        pause () {
          this.init(), this.domPlayer.pause()
        }
        finish () {
          this.init(),
            this._specialStyles && this._specialStyles.finish(),
            this._onFinish(),
            this.domPlayer.finish()
        }
        reset () {
          this._resetDomPlayerState(),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1)
        }
        _resetDomPlayerState () {
          this.domPlayer && this.domPlayer.cancel()
        }
        restart () {
          this.reset(), this.play()
        }
        hasStarted () {
          return this._started
        }
        destroy () {
          this._destroyed ||
            ((this._destroyed = !0),
            this._resetDomPlayerState(),
            this._onFinish(),
            this._specialStyles && this._specialStyles.destroy(),
            this._onDestroyFns.forEach(e => e()),
            (this._onDestroyFns = []))
        }
        setPosition (e) {
          void 0 === this.domPlayer && this.init(),
            (this.domPlayer.currentTime = e * this.time)
        }
        getPosition () {
          return this.domPlayer.currentTime / this.time
        }
        get totalTime () {
          return this._delay + this._duration
        }
        beforeDestroy () {
          const e = {}
          if (this.hasStarted()) {
            const t = this._finalKeyframe
            Object.keys(t).forEach(r => {
              'offset' != r &&
                (e[r] = this._finished ? t[r] : iE(this.element, r))
            })
          }
          this.currentSnapshot = e
        }
        triggerCallback (e) {
          const t = 'start' == e ? this._onStartFns : this._onDoneFns
          t.forEach(r => r()), (t.length = 0)
        }
      }
      class jV {
        validateStyleProperty (e) {
          return KD(e)
        }
        matchesElement (e, t) {
          return !1
        }
        containsElement (e, t) {
          return QD(e, t)
        }
        query (e, t, r) {
          return ZD(e, t, r)
        }
        computeStyle (e, t, r) {
          return window.getComputedStyle(e)[t]
        }
        animate (e, t, r, i, s, o = []) {
          const l = {
            duration: r,
            delay: i,
            fill: 0 == i ? 'both' : 'forwards'
          }
          s && (l.easing = s)
          const u = {},
            c = o.filter(f => f instanceof vE)
          ;(function WL (n, e) {
            return 0 === n || 0 === e
          })(r, i) &&
            c.forEach(f => {
              let h = f.currentSnapshot
              Object.keys(h).forEach(p => (u[p] = h[p]))
            }),
            (t = (function KL (n, e, t) {
              const r = Object.keys(t)
              if (r.length && e.length) {
                let s = e[0],
                  o = []
                if (
                  (r.forEach(a => {
                    s.hasOwnProperty(a) || o.push(a), (s[a] = t[a])
                  }),
                  o.length)
                )
                  for (var i = 1; i < e.length; i++) {
                    let a = e[i]
                    o.forEach(function (l) {
                      a[l] = iE(n, l)
                    })
                  }
              }
              return e
            })(e, (t = t.map(f => Dr(f, !1))), u))
          const d = (function LV (n, e) {
            let t = null,
              r = null
            return (
              Array.isArray(e) && e.length
                ? ((t = Oh(e[0])), e.length > 1 && (r = Oh(e[e.length - 1])))
                : e && (t = Oh(e)),
              t || r ? new VV(n, t, r) : null
            )
          })(e, t)
          return new vE(e, t, l, d)
        }
      }
      let UV = (() => {
        class n extends VD {
          constructor (t, r) {
            super(),
              (this._nextAnimationId = 0),
              (this._renderer = t.createRenderer(r.body, {
                id: '0',
                encapsulation: nn.None,
                styles: [],
                data: { animation: [] }
              }))
          }
          build (t) {
            const r = this._nextAnimationId.toString()
            this._nextAnimationId++
            const i = Array.isArray(t) ? BD(t) : t
            return (
              bE(this._renderer, null, r, 'register', [i]),
              new HV(r, this._renderer)
            )
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(io), C(Se))
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        )
      })()
      class HV extends class rL {} {
        constructor (e, t) {
          super(), (this._id = e), (this._renderer = t)
        }
        create (e, t) {
          return new $V(this._id, e, t || {}, this._renderer)
        }
      }
      class $V {
        constructor (e, t, r, i) {
          ;(this.id = e),
            (this.element = t),
            (this._renderer = i),
            (this.parentPlayer = null),
            (this._started = !1),
            (this.totalTime = 0),
            this._command('create', r)
        }
        _listen (e, t) {
          return this._renderer.listen(this.element, `@@${this.id}:${e}`, t)
        }
        _command (e, ...t) {
          return bE(this._renderer, this.element, this.id, e, t)
        }
        onDone (e) {
          this._listen('done', e)
        }
        onStart (e) {
          this._listen('start', e)
        }
        onDestroy (e) {
          this._listen('destroy', e)
        }
        init () {
          this._command('init')
        }
        hasStarted () {
          return this._started
        }
        play () {
          this._command('play'), (this._started = !0)
        }
        pause () {
          this._command('pause')
        }
        restart () {
          this._command('restart')
        }
        finish () {
          this._command('finish')
        }
        destroy () {
          this._command('destroy')
        }
        reset () {
          this._command('reset'), (this._started = !1)
        }
        setPosition (e) {
          this._command('setPosition', e)
        }
        getPosition () {
          var e, t
          return null !==
            (t =
              null === (e = this._renderer.engine.players[+this.id]) ||
              void 0 === e
                ? void 0
                : e.getPosition()) && void 0 !== t
            ? t
            : 0
        }
      }
      function bE (n, e, t, r, i) {
        return n.setProperty(e, `@@${t}:${r}`, i)
      }
      const CE = '@.disabled'
      let zV = (() => {
        class n {
          constructor (t, r, i) {
            ;(this.delegate = t),
              (this.engine = r),
              (this._zone = i),
              (this._currentId = 0),
              (this._microtaskId = 1),
              (this._animationCallbacksBuffer = []),
              (this._rendererCache = new Map()),
              (this._cdRecurDepth = 0),
              (this.promise = Promise.resolve(0)),
              (r.onRemovalComplete = (s, o) => {
                const a = null == o ? void 0 : o.parentNode(s)
                a && o.removeChild(a, s)
              })
          }
          createRenderer (t, r) {
            const s = this.delegate.createRenderer(t, r)
            if (!(t && r && r.data && r.data.animation)) {
              let c = this._rendererCache.get(s)
              return (
                c ||
                  ((c = new DE('', s, this.engine)),
                  this._rendererCache.set(s, c)),
                c
              )
            }
            const o = r.id,
              a = r.id + '-' + this._currentId
            this._currentId++, this.engine.register(a, t)
            const l = c => {
              Array.isArray(c)
                ? c.forEach(l)
                : this.engine.registerTrigger(o, a, t, c.name, c)
            }
            return r.data.animation.forEach(l), new GV(this, a, s, this.engine)
          }
          begin () {
            this._cdRecurDepth++, this.delegate.begin && this.delegate.begin()
          }
          _scheduleCountTask () {
            this.promise.then(() => {
              this._microtaskId++
            })
          }
          scheduleListenerCallback (t, r, i) {
            t >= 0 && t < this._microtaskId
              ? this._zone.run(() => r(i))
              : (0 == this._animationCallbacksBuffer.length &&
                  Promise.resolve(null).then(() => {
                    this._zone.run(() => {
                      this._animationCallbacksBuffer.forEach(s => {
                        const [o, a] = s
                        o(a)
                      }),
                        (this._animationCallbacksBuffer = [])
                    })
                  }),
                this._animationCallbacksBuffer.push([r, i]))
          }
          end () {
            this._cdRecurDepth--,
              0 == this._cdRecurDepth &&
                this._zone.runOutsideAngular(() => {
                  this._scheduleCountTask(),
                    this.engine.flush(this._microtaskId)
                }),
              this.delegate.end && this.delegate.end()
          }
          whenRenderingDone () {
            return this.engine.whenRenderingDone()
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(io), C(ru), C(pe))
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        )
      })()
      class DE {
        constructor (e, t, r) {
          ;(this.namespaceId = e),
            (this.delegate = t),
            (this.engine = r),
            (this.destroyNode = this.delegate.destroyNode
              ? i => t.destroyNode(i)
              : null)
        }
        get data () {
          return this.delegate.data
        }
        destroy () {
          this.engine.destroy(this.namespaceId, this.delegate),
            this.delegate.destroy()
        }
        createElement (e, t) {
          return this.delegate.createElement(e, t)
        }
        createComment (e) {
          return this.delegate.createComment(e)
        }
        createText (e) {
          return this.delegate.createText(e)
        }
        appendChild (e, t) {
          this.delegate.appendChild(e, t),
            this.engine.onInsert(this.namespaceId, t, e, !1)
        }
        insertBefore (e, t, r, i = !0) {
          this.delegate.insertBefore(e, t, r),
            this.engine.onInsert(this.namespaceId, t, e, i)
        }
        removeChild (e, t, r) {
          this.engine.onRemove(this.namespaceId, t, this.delegate, r)
        }
        selectRootElement (e, t) {
          return this.delegate.selectRootElement(e, t)
        }
        parentNode (e) {
          return this.delegate.parentNode(e)
        }
        nextSibling (e) {
          return this.delegate.nextSibling(e)
        }
        setAttribute (e, t, r, i) {
          this.delegate.setAttribute(e, t, r, i)
        }
        removeAttribute (e, t, r) {
          this.delegate.removeAttribute(e, t, r)
        }
        addClass (e, t) {
          this.delegate.addClass(e, t)
        }
        removeClass (e, t) {
          this.delegate.removeClass(e, t)
        }
        setStyle (e, t, r, i) {
          this.delegate.setStyle(e, t, r, i)
        }
        removeStyle (e, t, r) {
          this.delegate.removeStyle(e, t, r)
        }
        setProperty (e, t, r) {
          '@' == t.charAt(0) && t == CE
            ? this.disableAnimations(e, !!r)
            : this.delegate.setProperty(e, t, r)
        }
        setValue (e, t) {
          this.delegate.setValue(e, t)
        }
        listen (e, t, r) {
          return this.delegate.listen(e, t, r)
        }
        disableAnimations (e, t) {
          this.engine.disableAnimations(e, t)
        }
      }
      class GV extends DE {
        constructor (e, t, r, i) {
          super(t, r, i), (this.factory = e), (this.namespaceId = t)
        }
        setProperty (e, t, r) {
          '@' == t.charAt(0)
            ? '.' == t.charAt(1) && t == CE
              ? this.disableAnimations(e, (r = void 0 === r || !!r))
              : this.engine.process(this.namespaceId, e, t.substr(1), r)
            : this.delegate.setProperty(e, t, r)
        }
        listen (e, t, r) {
          if ('@' == t.charAt(0)) {
            const i = (function qV (n) {
              switch (n) {
                case 'body':
                  return document.body
                case 'document':
                  return document
                case 'window':
                  return window
                default:
                  return n
              }
            })(e)
            let s = t.substr(1),
              o = ''
            return (
              '@' != s.charAt(0) &&
                ([s, o] = (function WV (n) {
                  const e = n.indexOf('.')
                  return [n.substring(0, e), n.substr(e + 1)]
                })(s)),
              this.engine.listen(this.namespaceId, i, s, o, a => {
                this.factory.scheduleListenerCallback(a._data || -1, r, a)
              })
            )
          }
          return this.delegate.listen(e, t, r)
        }
      }
      let KV = (() => {
        class n extends ru {
          constructor (t, r, i) {
            super(t.body, r, i)
          }
          ngOnDestroy () {
            this.flush()
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(Se), C(mh), C(Ah))
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac })),
          n
        )
      })()
      const ds = new x('AnimationModuleType'),
        EE = [
          { provide: VD, useClass: UV },
          {
            provide: Ah,
            useFactory: function QV () {
              return new hV()
            }
          },
          { provide: ru, useClass: KV },
          {
            provide: io,
            useFactory: function ZV (n, e, t) {
              return new zV(n, e, t)
            },
            deps: [Cl, ru, pe]
          }
        ],
        wE = [
          { provide: mh, useFactory: () => new jV() },
          { provide: ds, useValue: 'BrowserAnimations' },
          ...EE
        ],
        YV = [
          { provide: mh, useClass: YD },
          { provide: ds, useValue: 'NoopAnimations' },
          ...EE
        ]
      let XV = (() => {
        class n {
          static withConfig (t) {
            return { ngModule: n, providers: t.disableAnimations ? YV : wE }
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)()
          }),
          (n.ɵmod = Ye({ type: n })),
          (n.ɵinj = ze({ providers: wE, imports: [eC] })),
          n
        )
      })()
      const eB = new x('mat-sanity-checks', {
        providedIn: 'root',
        factory: function JV () {
          return !0
        }
      })
      let fs = (() => {
        class n {
          constructor (t, r, i) {
            ;(this._sanityChecks = r),
              (this._document = i),
              (this._hasDoneGlobalChecks = !1),
              t._applyBodyHighContrastModeCssClasses(),
              this._hasDoneGlobalChecks || (this._hasDoneGlobalChecks = !0)
          }
          _checkIsEnabled (t) {
            return (
              !(function RP () {
                return (
                  ('undefined' != typeof __karma__ && !!__karma__) ||
                  ('undefined' != typeof jasmine && !!jasmine) ||
                  ('undefined' != typeof jest && !!jest) ||
                  ('undefined' != typeof Mocha && !!Mocha)
                )
              })() &&
              ('boolean' == typeof this._sanityChecks
                ? this._sanityChecks
                : !!this._sanityChecks[t])
            )
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(nL), C(eB, 8), C(Se))
          }),
          (n.ɵmod = Ye({ type: n })),
          (n.ɵinj = ze({ imports: [[SD], SD] })),
          n
        )
      })()
      function tB (n) {
        return class extends n {
          constructor (...e) {
            super(...e), (this._disabled = !1)
          }
          get disabled () {
            return this._disabled
          }
          set disabled (e) {
            this._disabled = ID(e)
          }
        }
      }
      function ME (n, e) {
        return class extends n {
          constructor (...t) {
            super(...t), (this.defaultColor = e), (this.color = e)
          }
          get color () {
            return this._color
          }
          set color (t) {
            const r = t || this.defaultColor
            r !== this._color &&
              (this._color &&
                this._elementRef.nativeElement.classList.remove(
                  `mat-${this._color}`
                ),
              r && this._elementRef.nativeElement.classList.add(`mat-${r}`),
              (this._color = r))
          }
        }
      }
      function nB (n) {
        return class extends n {
          constructor (...e) {
            super(...e), (this._disableRipple = !1)
          }
          get disableRipple () {
            return this._disableRipple
          }
          set disableRipple (e) {
            this._disableRipple = ID(e)
          }
        }
      }
      class iB {
        constructor (e, t, r) {
          ;(this._renderer = e),
            (this.element = t),
            (this.config = r),
            (this.state = 3)
        }
        fadeOut () {
          this._renderer.fadeOutRipple(this)
        }
      }
      const AE = { enterDuration: 225, exitDuration: 150 },
        Fh = oh({ passive: !0 }),
        TE = ['mousedown', 'touchstart'],
        IE = ['mouseup', 'mouseleave', 'touchend', 'touchcancel']
      class oB {
        constructor (e, t, r, i) {
          ;(this._target = e),
            (this._ngZone = t),
            (this._isPointerDown = !1),
            (this._activeRipples = new Set()),
            (this._pointerUpEventsRegistered = !1),
            i.isBrowser && (this._containerElement = Oo(r))
        }
        fadeInRipple (e, t, r = {}) {
          const i = (this._containerRect =
              this._containerRect ||
              this._containerElement.getBoundingClientRect()),
            s = Object.assign(Object.assign({}, AE), r.animation)
          r.centered && ((e = i.left + i.width / 2), (t = i.top + i.height / 2))
          const o =
              r.radius ||
              (function lB (n, e, t) {
                const r = Math.max(Math.abs(n - t.left), Math.abs(n - t.right)),
                  i = Math.max(Math.abs(e - t.top), Math.abs(e - t.bottom))
                return Math.sqrt(r * r + i * i)
              })(e, t, i),
            a = e - i.left,
            l = t - i.top,
            u = s.enterDuration,
            c = document.createElement('div')
          c.classList.add('mat-ripple-element'),
            (c.style.left = a - o + 'px'),
            (c.style.top = l - o + 'px'),
            (c.style.height = 2 * o + 'px'),
            (c.style.width = 2 * o + 'px'),
            null != r.color && (c.style.backgroundColor = r.color),
            (c.style.transitionDuration = `${u}ms`),
            this._containerElement.appendChild(c),
            (function aB (n) {
              window.getComputedStyle(n).getPropertyValue('opacity')
            })(c),
            (c.style.transform = 'scale(1)')
          const d = new iB(this, c, r)
          return (
            (d.state = 0),
            this._activeRipples.add(d),
            r.persistent || (this._mostRecentTransientRipple = d),
            this._runTimeoutOutsideZone(() => {
              const f = d === this._mostRecentTransientRipple
              ;(d.state = 1),
                !r.persistent && (!f || !this._isPointerDown) && d.fadeOut()
            }, u),
            d
          )
        }
        fadeOutRipple (e) {
          const t = this._activeRipples.delete(e)
          if (
            (e === this._mostRecentTransientRipple &&
              (this._mostRecentTransientRipple = null),
            this._activeRipples.size || (this._containerRect = null),
            !t)
          )
            return
          const r = e.element,
            i = Object.assign(Object.assign({}, AE), e.config.animation)
          ;(r.style.transitionDuration = `${i.exitDuration}ms`),
            (r.style.opacity = '0'),
            (e.state = 2),
            this._runTimeoutOutsideZone(() => {
              ;(e.state = 3), r.remove()
            }, i.exitDuration)
        }
        fadeOutAll () {
          this._activeRipples.forEach(e => e.fadeOut())
        }
        fadeOutAllNonPersistent () {
          this._activeRipples.forEach(e => {
            e.config.persistent || e.fadeOut()
          })
        }
        setupTriggerEvents (e) {
          const t = Oo(e)
          !t ||
            t === this._triggerElement ||
            (this._removeTriggerEvents(),
            (this._triggerElement = t),
            this._registerEvents(TE))
        }
        handleEvent (e) {
          'mousedown' === e.type
            ? this._onMousedown(e)
            : 'touchstart' === e.type
            ? this._onTouchStart(e)
            : this._onPointerUp(),
            this._pointerUpEventsRegistered ||
              (this._registerEvents(IE), (this._pointerUpEventsRegistered = !0))
        }
        _onMousedown (e) {
          const t = OD(e),
            r =
              this._lastTouchStartEvent &&
              Date.now() < this._lastTouchStartEvent + 800
          !this._target.rippleDisabled &&
            !t &&
            !r &&
            ((this._isPointerDown = !0),
            this.fadeInRipple(e.clientX, e.clientY, this._target.rippleConfig))
        }
        _onTouchStart (e) {
          if (!this._target.rippleDisabled && !FD(e)) {
            ;(this._lastTouchStartEvent = Date.now()),
              (this._isPointerDown = !0)
            const t = e.changedTouches
            for (let r = 0; r < t.length; r++)
              this.fadeInRipple(
                t[r].clientX,
                t[r].clientY,
                this._target.rippleConfig
              )
          }
        }
        _onPointerUp () {
          !this._isPointerDown ||
            ((this._isPointerDown = !1),
            this._activeRipples.forEach(e => {
              !e.config.persistent &&
                (1 === e.state ||
                  (e.config.terminateOnPointerUp && 0 === e.state)) &&
                e.fadeOut()
            }))
        }
        _runTimeoutOutsideZone (e, t = 0) {
          this._ngZone.runOutsideAngular(() => setTimeout(e, t))
        }
        _registerEvents (e) {
          this._ngZone.runOutsideAngular(() => {
            e.forEach(t => {
              this._triggerElement.addEventListener(t, this, Fh)
            })
          })
        }
        _removeTriggerEvents () {
          this._triggerElement &&
            (TE.forEach(e => {
              this._triggerElement.removeEventListener(e, this, Fh)
            }),
            this._pointerUpEventsRegistered &&
              IE.forEach(e => {
                this._triggerElement.removeEventListener(e, this, Fh)
              }))
        }
      }
      const uB = new x('mat-ripple-global-options')
      let xE = (() => {
          class n {
            constructor (t, r, i, s, o) {
              ;(this._elementRef = t),
                (this._animationMode = o),
                (this.radius = 0),
                (this._disabled = !1),
                (this._isInitialized = !1),
                (this._globalOptions = s || {}),
                (this._rippleRenderer = new oB(this, r, t, i))
            }
            get disabled () {
              return this._disabled
            }
            set disabled (t) {
              t && this.fadeOutAllNonPersistent(),
                (this._disabled = t),
                this._setupTriggerEventsIfEnabled()
            }
            get trigger () {
              return this._trigger || this._elementRef.nativeElement
            }
            set trigger (t) {
              ;(this._trigger = t), this._setupTriggerEventsIfEnabled()
            }
            ngOnInit () {
              ;(this._isInitialized = !0), this._setupTriggerEventsIfEnabled()
            }
            ngOnDestroy () {
              this._rippleRenderer._removeTriggerEvents()
            }
            fadeOutAll () {
              this._rippleRenderer.fadeOutAll()
            }
            fadeOutAllNonPersistent () {
              this._rippleRenderer.fadeOutAllNonPersistent()
            }
            get rippleConfig () {
              return {
                centered: this.centered,
                radius: this.radius,
                color: this.color,
                animation: Object.assign(
                  Object.assign(
                    Object.assign({}, this._globalOptions.animation),
                    'NoopAnimations' === this._animationMode
                      ? { enterDuration: 0, exitDuration: 0 }
                      : {}
                  ),
                  this.animation
                ),
                terminateOnPointerUp: this._globalOptions.terminateOnPointerUp
              }
            }
            get rippleDisabled () {
              return this.disabled || !!this._globalOptions.disabled
            }
            _setupTriggerEventsIfEnabled () {
              !this.disabled &&
                this._isInitialized &&
                this._rippleRenderer.setupTriggerEvents(this.trigger)
            }
            launch (t, r = 0, i) {
              return 'number' == typeof t
                ? this._rippleRenderer.fadeInRipple(
                    t,
                    r,
                    Object.assign(Object.assign({}, this.rippleConfig), i)
                  )
                : this._rippleRenderer.fadeInRipple(
                    0,
                    0,
                    Object.assign(Object.assign({}, this.rippleConfig), t)
                  )
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(y(et), y(pe), y(Qr), y(uB, 8), y(ds, 8))
            }),
            (n.ɵdir = N({
              type: n,
              selectors: [
                ['', 'mat-ripple', ''],
                ['', 'matRipple', '']
              ],
              hostAttrs: [1, 'mat-ripple'],
              hostVars: 2,
              hostBindings: function (t, r) {
                2 & t && $n('mat-ripple-unbounded', r.unbounded)
              },
              inputs: {
                color: ['matRippleColor', 'color'],
                unbounded: ['matRippleUnbounded', 'unbounded'],
                centered: ['matRippleCentered', 'centered'],
                radius: ['matRippleRadius', 'radius'],
                animation: ['matRippleAnimation', 'animation'],
                disabled: ['matRippleDisabled', 'disabled'],
                trigger: ['matRippleTrigger', 'trigger']
              },
              exportAs: ['matRipple']
            })),
            n
          )
        })(),
        cB = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)()
            }),
            (n.ɵmod = Ye({ type: n })),
            (n.ɵinj = ze({ imports: [[fs], fs] })),
            n
          )
        })()
      class dB extends dt {
        constructor (e, t) {
          super()
        }
        schedule (e, t = 0) {
          return this
        }
      }
      const su = {
        setInterval (...n) {
          const { delegate: e } = su
          return ((null == e ? void 0 : e.setInterval) || setInterval)(...n)
        },
        clearInterval (n) {
          const { delegate: e } = su
          return ((null == e ? void 0 : e.clearInterval) || clearInterval)(n)
        },
        delegate: void 0
      }
      class Nh extends dB {
        constructor (e, t) {
          super(e, t),
            (this.scheduler = e),
            (this.work = t),
            (this.pending = !1)
        }
        schedule (e, t = 0) {
          if (this.closed) return this
          this.state = e
          const r = this.id,
            i = this.scheduler
          return (
            null != r && (this.id = this.recycleAsyncId(i, r, t)),
            (this.pending = !0),
            (this.delay = t),
            (this.id = this.id || this.requestAsyncId(i, this.id, t)),
            this
          )
        }
        requestAsyncId (e, t, r = 0) {
          return su.setInterval(e.flush.bind(e, this), r)
        }
        recycleAsyncId (e, t, r = 0) {
          if (null != r && this.delay === r && !1 === this.pending) return t
          su.clearInterval(t)
        }
        execute (e, t) {
          if (this.closed) return new Error('executing a cancelled action')
          this.pending = !1
          const r = this._execute(e, t)
          if (r) return r
          !1 === this.pending &&
            null != this.id &&
            (this.id = this.recycleAsyncId(this.scheduler, this.id, null))
        }
        _execute (e, t) {
          let i,
            r = !1
          try {
            this.work(e)
          } catch (s) {
            ;(r = !0),
              (i = s || new Error('Scheduled action threw falsy error'))
          }
          if (r) return this.unsubscribe(), i
        }
        unsubscribe () {
          if (!this.closed) {
            const { id: e, scheduler: t } = this,
              { actions: r } = t
            ;(this.work = this.state = this.scheduler = null),
              (this.pending = !1),
              si(r, this),
              null != e && (this.id = this.recycleAsyncId(t, e, null)),
              (this.delay = null),
              super.unsubscribe()
          }
        }
      }
      const Vo = {
          schedule (n) {
            let e = requestAnimationFrame,
              t = cancelAnimationFrame
            const { delegate: r } = Vo
            r && ((e = r.requestAnimationFrame), (t = r.cancelAnimationFrame))
            const i = e(s => {
              ;(t = void 0), n(s)
            })
            return new dt(() => (null == t ? void 0 : t(i)))
          },
          requestAnimationFrame (...n) {
            const { delegate: e } = Vo
            return (
              (null == e ? void 0 : e.requestAnimationFrame) ||
              requestAnimationFrame
            )(...n)
          },
          cancelAnimationFrame (...n) {
            const { delegate: e } = Vo
            return (
              (null == e ? void 0 : e.cancelAnimationFrame) ||
              cancelAnimationFrame
            )(...n)
          },
          delegate: void 0
        },
        Ph = { now: () => (Ph.delegate || Date).now(), delegate: void 0 }
      class Bo {
        constructor (e, t = Bo.now) {
          ;(this.schedulerActionCtor = e), (this.now = t)
        }
        schedule (e, t = 0, r) {
          return new this.schedulerActionCtor(this, e).schedule(r, t)
        }
      }
      Bo.now = Ph.now
      class Lh extends Bo {
        constructor (e, t = Bo.now) {
          super(e, t),
            (this.actions = []),
            (this._active = !1),
            (this._scheduled = void 0)
        }
        flush (e) {
          const { actions: t } = this
          if (this._active) return void t.push(e)
          let r
          this._active = !0
          do {
            if ((r = e.execute(e.state, e.delay))) break
          } while ((e = t.shift()))
          if (((this._active = !1), r)) {
            for (; (e = t.shift()); ) e.unsubscribe()
            throw r
          }
        }
      }
      new (class hB extends Lh {
        flush (e) {
          this._active = !0
          const t = this._scheduled
          this._scheduled = void 0
          const { actions: r } = this
          let i
          e = e || r.shift()
          do {
            if ((i = e.execute(e.state, e.delay))) break
          } while ((e = r[0]) && e.id === t && r.shift())
          if (((this._active = !1), i)) {
            for (; (e = r[0]) && e.id === t && r.shift(); ) e.unsubscribe()
            throw i
          }
        }
      })(
        class fB extends Nh {
          constructor (e, t) {
            super(e, t), (this.scheduler = e), (this.work = t)
          }
          requestAsyncId (e, t, r = 0) {
            return null !== r && r > 0
              ? super.requestAsyncId(e, t, r)
              : (e.actions.push(this),
                e._scheduled ||
                  (e._scheduled = Vo.requestAnimationFrame(() =>
                    e.flush(void 0)
                  )))
          }
          recycleAsyncId (e, t, r = 0) {
            if ((null != r && r > 0) || (null == r && this.delay > 0))
              return super.recycleAsyncId(e, t, r)
            e.actions.some(i => i.id === t) ||
              (Vo.cancelAnimationFrame(t), (e._scheduled = void 0))
          }
        }
      )
      let Vh,
        gB = 1
      const ou = {}
      function kE (n) {
        return n in ou && (delete ou[n], !0)
      }
      const mB = {
          setImmediate (n) {
            const e = gB++
            return (
              (ou[e] = !0),
              Vh || (Vh = Promise.resolve()),
              Vh.then(() => kE(e) && n()),
              e
            )
          },
          clearImmediate (n) {
            kE(n)
          }
        },
        { setImmediate: yB, clearImmediate: _B } = mB,
        au = {
          setImmediate (...n) {
            const { delegate: e } = au
            return ((null == e ? void 0 : e.setImmediate) || yB)(...n)
          },
          clearImmediate (n) {
            const { delegate: e } = au
            return ((null == e ? void 0 : e.clearImmediate) || _B)(n)
          },
          delegate: void 0
        },
        RE =
          (new (class bB extends Lh {
            flush (e) {
              this._active = !0
              const t = this._scheduled
              this._scheduled = void 0
              const { actions: r } = this
              let i
              e = e || r.shift()
              do {
                if ((i = e.execute(e.state, e.delay))) break
              } while ((e = r[0]) && e.id === t && r.shift())
              if (((this._active = !1), i)) {
                for (; (e = r[0]) && e.id === t && r.shift(); ) e.unsubscribe()
                throw i
              }
            }
          })(
            class vB extends Nh {
              constructor (e, t) {
                super(e, t), (this.scheduler = e), (this.work = t)
              }
              requestAsyncId (e, t, r = 0) {
                return null !== r && r > 0
                  ? super.requestAsyncId(e, t, r)
                  : (e.actions.push(this),
                    e._scheduled ||
                      (e._scheduled = au.setImmediate(e.flush.bind(e, void 0))))
              }
              recycleAsyncId (e, t, r = 0) {
                if ((null != r && r > 0) || (null == r && this.delay > 0))
                  return super.recycleAsyncId(e, t, r)
                e.actions.some(i => i.id === t) ||
                  (au.clearImmediate(t), (e._scheduled = void 0))
              }
            }
          ),
          new Lh(Nh)),
        DB = RE
      function MB (n, e = RE) {
        return (function EB (n) {
          return Le((e, t) => {
            let r = !1,
              i = null,
              s = null,
              o = !1
            const a = () => {
                if ((null == s || s.unsubscribe(), (s = null), r)) {
                  r = !1
                  const u = i
                  ;(i = null), t.next(u)
                }
                o && t.complete()
              },
              l = () => {
                ;(s = null), o && t.complete()
              }
            e.subscribe(
              xe(
                t,
                u => {
                  ;(r = !0), (i = u), s || Ht(n(u)).subscribe((s = xe(t, a, l)))
                },
                () => {
                  ;(o = !0), (!r || !s || s.closed) && t.complete()
                }
              )
            )
          })
        })(() =>
          (function SB (n = 0, e, t = DB) {
            let r = -1
            return (
              null != e && (Op(e) ? (t = e) : (r = e)),
              new me(i => {
                let s = (function wB (n) {
                  return n instanceof Date && !isNaN(n)
                })(n)
                  ? +n - t.now()
                  : n
                s < 0 && (s = 0)
                let o = 0
                return t.schedule(function () {
                  i.closed ||
                    (i.next(o++),
                    0 <= r ? this.schedule(void 0, r) : i.complete())
                }, s)
              })
            )
          })(n, e)
        )
      }
      let OE = (() => {
        class n {
          constructor (t, r, i) {
            ;(this._platform = t),
              (this._change = new Ct()),
              (this._changeListener = s => {
                this._change.next(s)
              }),
              (this._document = i),
              r.runOutsideAngular(() => {
                if (t.isBrowser) {
                  const s = this._getWindow()
                  s.addEventListener('resize', this._changeListener),
                    s.addEventListener(
                      'orientationchange',
                      this._changeListener
                    )
                }
                this.change().subscribe(() => (this._viewportSize = null))
              })
          }
          ngOnDestroy () {
            if (this._platform.isBrowser) {
              const t = this._getWindow()
              t.removeEventListener('resize', this._changeListener),
                t.removeEventListener('orientationchange', this._changeListener)
            }
            this._change.complete()
          }
          getViewportSize () {
            this._viewportSize || this._updateViewportSize()
            const t = {
              width: this._viewportSize.width,
              height: this._viewportSize.height
            }
            return this._platform.isBrowser || (this._viewportSize = null), t
          }
          getViewportRect () {
            const t = this.getViewportScrollPosition(),
              { width: r, height: i } = this.getViewportSize()
            return {
              top: t.top,
              left: t.left,
              bottom: t.top + i,
              right: t.left + r,
              height: i,
              width: r
            }
          }
          getViewportScrollPosition () {
            if (!this._platform.isBrowser) return { top: 0, left: 0 }
            const t = this._document,
              r = this._getWindow(),
              i = t.documentElement,
              s = i.getBoundingClientRect()
            return {
              top: -s.top || t.body.scrollTop || r.scrollY || i.scrollTop || 0,
              left:
                -s.left || t.body.scrollLeft || r.scrollX || i.scrollLeft || 0
            }
          }
          change (t = 20) {
            return t > 0 ? this._change.pipe(MB(t)) : this._change
          }
          _getWindow () {
            return this._document.defaultView || window
          }
          _updateViewportSize () {
            const t = this._getWindow()
            this._viewportSize = this._platform.isBrowser
              ? { width: t.innerWidth, height: t.innerHeight }
              : { width: 0, height: 0 }
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(C(Qr), C(pe), C(Se, 8))
          }),
          (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: 'root' })),
          n
        )
      })()
      function TB (n, e) {
        if ((1 & n && (Pr(), le(0, 'circle', 4)), 2 & n)) {
          const t = he(),
            r = $i(1)
          Mn(
            'animation-name',
            'mat-progress-spinner-stroke-rotate-' + t._spinnerAnimationLabel
          )('stroke-dashoffset', t._getStrokeDashOffset(), 'px')(
            'stroke-dasharray',
            t._getStrokeCircumference(),
            'px'
          )(
            'stroke-width',
            t._getCircleStrokeWidth(),
            '%'
          )('transform-origin', t._getCircleTransformOrigin(r)),
            Je('r', t._getCircleRadius())
        }
      }
      function IB (n, e) {
        if ((1 & n && (Pr(), le(0, 'circle', 4)), 2 & n)) {
          const t = he(),
            r = $i(1)
          Mn('stroke-dashoffset', t._getStrokeDashOffset(), 'px')(
            'stroke-dasharray',
            t._getStrokeCircumference(),
            'px'
          )(
            'stroke-width',
            t._getCircleStrokeWidth(),
            '%'
          )('transform-origin', t._getCircleTransformOrigin(r)),
            Je('r', t._getCircleRadius())
        }
      }
      function xB (n, e) {
        if ((1 & n && (Pr(), le(0, 'circle', 4)), 2 & n)) {
          const t = he(),
            r = $i(1)
          Mn(
            'animation-name',
            'mat-progress-spinner-stroke-rotate-' + t._spinnerAnimationLabel
          )('stroke-dashoffset', t._getStrokeDashOffset(), 'px')(
            'stroke-dasharray',
            t._getStrokeCircumference(),
            'px'
          )(
            'stroke-width',
            t._getCircleStrokeWidth(),
            '%'
          )('transform-origin', t._getCircleTransformOrigin(r)),
            Je('r', t._getCircleRadius())
        }
      }
      function kB (n, e) {
        if ((1 & n && (Pr(), le(0, 'circle', 4)), 2 & n)) {
          const t = he(),
            r = $i(1)
          Mn('stroke-dashoffset', t._getStrokeDashOffset(), 'px')(
            'stroke-dasharray',
            t._getStrokeCircumference(),
            'px'
          )(
            'stroke-width',
            t._getCircleStrokeWidth(),
            '%'
          )('transform-origin', t._getCircleTransformOrigin(r)),
            Je('r', t._getCircleRadius())
        }
      }
      const FB = ME(
          class {
            constructor (n) {
              this._elementRef = n
            }
          },
          'primary'
        ),
        FE = new x('mat-progress-spinner-default-options', {
          providedIn: 'root',
          factory: function NB () {
            return { diameter: 100 }
          }
        })
      class rr extends FB {
        constructor (e, t, r, i, s, o, a, l) {
          super(e),
            (this._document = r),
            (this._diameter = 100),
            (this._value = 0),
            (this._resizeSubscription = dt.EMPTY),
            (this.mode = 'determinate')
          const u = rr._diameters
          ;(this._spinnerAnimationLabel = this._getSpinnerAnimationLabel()),
            u.has(r.head) || u.set(r.head, new Set([100])),
            (this._noopAnimations =
              'NoopAnimations' === i && !!s && !s._forceAnimations),
            s &&
              (s.diameter && (this.diameter = s.diameter),
              s.strokeWidth && (this.strokeWidth = s.strokeWidth)),
            t.isBrowser &&
              t.SAFARI &&
              a &&
              o &&
              l &&
              (this._resizeSubscription = a.change(150).subscribe(() => {
                'indeterminate' === this.mode && l.run(() => o.markForCheck())
              }))
        }
        get diameter () {
          return this._diameter
        }
        set diameter (e) {
          ;(this._diameter = lh(e)),
            (this._spinnerAnimationLabel = this._getSpinnerAnimationLabel()),
            this._styleRoot && this._attachStyleNode()
        }
        get strokeWidth () {
          return this._strokeWidth || this.diameter / 10
        }
        set strokeWidth (e) {
          this._strokeWidth = lh(e)
        }
        get value () {
          return 'determinate' === this.mode ? this._value : 0
        }
        set value (e) {
          this._value = Math.max(0, Math.min(100, lh(e)))
        }
        ngOnInit () {
          const e = this._elementRef.nativeElement
          ;(this._styleRoot = TD(e) || this._document.head),
            this._attachStyleNode(),
            e.classList.add('mat-progress-spinner-indeterminate-animation')
        }
        ngOnDestroy () {
          this._resizeSubscription.unsubscribe()
        }
        _getCircleRadius () {
          return (this.diameter - 10) / 2
        }
        _getViewBox () {
          const e = 2 * this._getCircleRadius() + this.strokeWidth
          return `0 0 ${e} ${e}`
        }
        _getStrokeCircumference () {
          return 2 * Math.PI * this._getCircleRadius()
        }
        _getStrokeDashOffset () {
          return 'determinate' === this.mode
            ? (this._getStrokeCircumference() * (100 - this._value)) / 100
            : null
        }
        _getCircleStrokeWidth () {
          return (this.strokeWidth / this.diameter) * 100
        }
        _getCircleTransformOrigin (e) {
          var t
          const r = 50 * (null !== (t = e.currentScale) && void 0 !== t ? t : 1)
          return `${r}% ${r}%`
        }
        _attachStyleNode () {
          const e = this._styleRoot,
            t = this._diameter,
            r = rr._diameters
          let i = r.get(e)
          if (!i || !i.has(t)) {
            const s = this._document.createElement('style')
            s.setAttribute(
              'mat-spinner-animation',
              this._spinnerAnimationLabel
            ),
              (s.textContent = this._getAnimationText()),
              e.appendChild(s),
              i || ((i = new Set()), r.set(e, i)),
              i.add(t)
          }
        }
        _getAnimationText () {
          const e = this._getStrokeCircumference()
          return '\n @keyframes mat-progress-spinner-stroke-rotate-DIAMETER {\n    0%      { stroke-dashoffset: START_VALUE;  transform: rotate(0); }\n    12.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(0); }\n    12.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(72.5deg); }\n    25%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(72.5deg); }\n\n    25.0001%   { stroke-dashoffset: START_VALUE;  transform: rotate(270deg); }\n    37.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(270deg); }\n    37.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(161.5deg); }\n    50%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(161.5deg); }\n\n    50.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(180deg); }\n    62.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(180deg); }\n    62.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(251.5deg); }\n    75%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(251.5deg); }\n\n    75.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(90deg); }\n    87.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(90deg); }\n    87.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(341.5deg); }\n    100%    { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(341.5deg); }\n  }\n'
            .replace(/START_VALUE/g, '' + 0.95 * e)
            .replace(/END_VALUE/g, '' + 0.2 * e)
            .replace(/DIAMETER/g, `${this._spinnerAnimationLabel}`)
        }
        _getSpinnerAnimationLabel () {
          return this.diameter.toString().replace('.', '_')
        }
      }
      ;(rr._diameters = new WeakMap()),
        (rr.ɵfac = function (e) {
          return new (e || rr)(
            y(et),
            y(Qr),
            y(Se, 8),
            y(ds, 8),
            y(FE),
            y(Ji),
            y(OE),
            y(pe)
          )
        }),
        (rr.ɵcmp = At({
          type: rr,
          selectors: [['mat-progress-spinner']],
          hostAttrs: [
            'role',
            'progressbar',
            'tabindex',
            '-1',
            1,
            'mat-progress-spinner'
          ],
          hostVars: 10,
          hostBindings: function (e, t) {
            2 & e &&
              (Je('aria-valuemin', 'determinate' === t.mode ? 0 : null)(
                'aria-valuemax',
                'determinate' === t.mode ? 100 : null
              )('aria-valuenow', 'determinate' === t.mode ? t.value : null)(
                'mode',
                t.mode
              ),
              Mn('width', t.diameter, 'px')('height', t.diameter, 'px'),
              $n('_mat-animation-noopable', t._noopAnimations))
          },
          inputs: {
            color: 'color',
            diameter: 'diameter',
            strokeWidth: 'strokeWidth',
            mode: 'mode',
            value: 'value'
          },
          exportAs: ['matProgressSpinner'],
          features: [se],
          decls: 4,
          vars: 8,
          consts: [
            [
              'preserveAspectRatio',
              'xMidYMid meet',
              'focusable',
              'false',
              'aria-hidden',
              'true',
              3,
              'ngSwitch'
            ],
            ['svg', ''],
            [
              'cx',
              '50%',
              'cy',
              '50%',
              3,
              'animation-name',
              'stroke-dashoffset',
              'stroke-dasharray',
              'stroke-width',
              'transform-origin',
              4,
              'ngSwitchCase'
            ],
            [
              'cx',
              '50%',
              'cy',
              '50%',
              3,
              'stroke-dashoffset',
              'stroke-dasharray',
              'stroke-width',
              'transform-origin',
              4,
              'ngSwitchCase'
            ],
            ['cx', '50%', 'cy', '50%']
          ],
          template: function (e, t) {
            1 & e &&
              (Pr(),
              k(0, 'svg', 0, 1),
              oe(2, TB, 1, 11, 'circle', 2),
              oe(3, IB, 1, 9, 'circle', 3),
              T()),
              2 & e &&
                (Mn('width', t.diameter, 'px')('height', t.diameter, 'px'),
                j('ngSwitch', 'indeterminate' === t.mode),
                Je('viewBox', t._getViewBox()),
                z(2),
                j('ngSwitchCase', !0),
                z(1),
                j('ngSwitchCase', !1))
          },
          directives: [mo, vf],
          styles: [
            '.mat-progress-spinner{display:block;position:relative;overflow:hidden}.mat-progress-spinner svg{position:absolute;transform:rotate(-90deg);top:0;left:0;transform-origin:center;overflow:visible}.mat-progress-spinner circle{fill:transparent;transition:stroke-dashoffset 225ms linear}._mat-animation-noopable.mat-progress-spinner circle{transition:none;animation:none}.cdk-high-contrast-active .mat-progress-spinner circle{stroke:CanvasText}.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] svg{animation:mat-progress-spinner-linear-rotate 2000ms linear infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] svg{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] circle{transition-property:stroke;animation-duration:4000ms;animation-timing-function:cubic-bezier(0.35, 0, 0.25, 1);animation-iteration-count:infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] circle{transition:none;animation:none}@keyframes mat-progress-spinner-linear-rotate{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes mat-progress-spinner-stroke-rotate-100{0%{stroke-dashoffset:268.606171575px;transform:rotate(0)}12.5%{stroke-dashoffset:56.5486677px;transform:rotate(0)}12.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(72.5deg)}25%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(72.5deg)}25.0001%{stroke-dashoffset:268.606171575px;transform:rotate(270deg)}37.5%{stroke-dashoffset:56.5486677px;transform:rotate(270deg)}37.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(161.5deg)}50%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(161.5deg)}50.0001%{stroke-dashoffset:268.606171575px;transform:rotate(180deg)}62.5%{stroke-dashoffset:56.5486677px;transform:rotate(180deg)}62.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(251.5deg)}75%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(251.5deg)}75.0001%{stroke-dashoffset:268.606171575px;transform:rotate(90deg)}87.5%{stroke-dashoffset:56.5486677px;transform:rotate(90deg)}87.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(341.5deg)}100%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(341.5deg)}}\n'
          ],
          encapsulation: 2,
          changeDetection: 0
        }))
      let jo = (() => {
          class n extends rr {
            constructor (t, r, i, s, o, a, l, u) {
              super(t, r, i, s, o, a, l, u), (this.mode = 'indeterminate')
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(
                y(et),
                y(Qr),
                y(Se, 8),
                y(ds, 8),
                y(FE),
                y(Ji),
                y(OE),
                y(pe)
              )
            }),
            (n.ɵcmp = At({
              type: n,
              selectors: [['mat-spinner']],
              hostAttrs: [
                'role',
                'progressbar',
                'mode',
                'indeterminate',
                1,
                'mat-spinner',
                'mat-progress-spinner'
              ],
              hostVars: 6,
              hostBindings: function (t, r) {
                2 & t &&
                  (Mn('width', r.diameter, 'px')('height', r.diameter, 'px'),
                  $n('_mat-animation-noopable', r._noopAnimations))
              },
              inputs: { color: 'color' },
              features: [se],
              decls: 4,
              vars: 8,
              consts: [
                [
                  'preserveAspectRatio',
                  'xMidYMid meet',
                  'focusable',
                  'false',
                  'aria-hidden',
                  'true',
                  3,
                  'ngSwitch'
                ],
                ['svg', ''],
                [
                  'cx',
                  '50%',
                  'cy',
                  '50%',
                  3,
                  'animation-name',
                  'stroke-dashoffset',
                  'stroke-dasharray',
                  'stroke-width',
                  'transform-origin',
                  4,
                  'ngSwitchCase'
                ],
                [
                  'cx',
                  '50%',
                  'cy',
                  '50%',
                  3,
                  'stroke-dashoffset',
                  'stroke-dasharray',
                  'stroke-width',
                  'transform-origin',
                  4,
                  'ngSwitchCase'
                ],
                ['cx', '50%', 'cy', '50%']
              ],
              template: function (t, r) {
                1 & t &&
                  (Pr(),
                  k(0, 'svg', 0, 1),
                  oe(2, xB, 1, 11, 'circle', 2),
                  oe(3, kB, 1, 9, 'circle', 3),
                  T()),
                  2 & t &&
                    (Mn('width', r.diameter, 'px')('height', r.diameter, 'px'),
                    j('ngSwitch', 'indeterminate' === r.mode),
                    Je('viewBox', r._getViewBox()),
                    z(2),
                    j('ngSwitchCase', !0),
                    z(1),
                    j('ngSwitchCase', !1))
              },
              directives: [mo, vf],
              styles: [
                '.mat-progress-spinner{display:block;position:relative;overflow:hidden}.mat-progress-spinner svg{position:absolute;transform:rotate(-90deg);top:0;left:0;transform-origin:center;overflow:visible}.mat-progress-spinner circle{fill:transparent;transition:stroke-dashoffset 225ms linear}._mat-animation-noopable.mat-progress-spinner circle{transition:none;animation:none}.cdk-high-contrast-active .mat-progress-spinner circle{stroke:CanvasText}.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] svg{animation:mat-progress-spinner-linear-rotate 2000ms linear infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] svg{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] circle{transition-property:stroke;animation-duration:4000ms;animation-timing-function:cubic-bezier(0.35, 0, 0.25, 1);animation-iteration-count:infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] circle{transition:none;animation:none}@keyframes mat-progress-spinner-linear-rotate{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes mat-progress-spinner-stroke-rotate-100{0%{stroke-dashoffset:268.606171575px;transform:rotate(0)}12.5%{stroke-dashoffset:56.5486677px;transform:rotate(0)}12.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(72.5deg)}25%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(72.5deg)}25.0001%{stroke-dashoffset:268.606171575px;transform:rotate(270deg)}37.5%{stroke-dashoffset:56.5486677px;transform:rotate(270deg)}37.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(161.5deg)}50%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(161.5deg)}50.0001%{stroke-dashoffset:268.606171575px;transform:rotate(180deg)}62.5%{stroke-dashoffset:56.5486677px;transform:rotate(180deg)}62.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(251.5deg)}75%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(251.5deg)}75.0001%{stroke-dashoffset:268.606171575px;transform:rotate(90deg)}87.5%{stroke-dashoffset:56.5486677px;transform:rotate(90deg)}87.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(341.5deg)}100%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(341.5deg)}}\n'
              ],
              encapsulation: 2,
              changeDetection: 0
            })),
            n
          )
        })(),
        LB = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)()
            }),
            (n.ɵmod = Ye({ type: n })),
            (n.ɵinj = ze({ imports: [[fs, jb], fs] })),
            n
          )
        })()
      function VB (n, e) {
        1 & n && le(0, 'mat-spinner')
      }
      function BB (n, e) {
        1 & n && (k(0, 'p'), J(1, ' No sauces to display! '), T())
      }
      function jB (n, e) {
        1 & n && (k(0, 'p', 3), J(1, 'THE SAUCES'), T())
      }
      function UB (n, e) {
        if (1 & n) {
          const t = Sn()
          k(0, 'div', 6),
            Ce('click', function () {
              const s = xt(t).$implicit
              return he(3).onClickSauce(s._id)
            }),
            le(1, 'img', 7),
            k(2, 'h4'),
            J(3),
            Wn(4, 'uppercase'),
            T(),
            k(5, 'p'),
            J(6),
            T()()
        }
        if (2 & n) {
          const t = e.$implicit
          z(1),
            j('src', t.imageUrl, wi),
            z(2),
            zn(Kn(4, 3, t.name)),
            z(3),
            Js('Heat: ', t.heat, '/10')
        }
      }
      function HB (n, e) {
        if (
          (1 & n && (k(0, 'div', 4), oe(1, UB, 7, 5, 'div', 5), T()), 2 & n)
        ) {
          const t = he().ngIf
          z(1), j('ngForOf', t)
        }
      }
      function $B (n, e) {
        if (
          (1 & n &&
            (ja(0),
            oe(1, BB, 2, 0, 'p', 0),
            oe(2, jB, 2, 0, 'p', 1),
            oe(3, HB, 2, 1, 'div', 2),
            Ua()),
          2 & n)
        ) {
          const t = e.ngIf,
            r = he()
          z(1),
            j('ngIf', !r.loading && t.length <= 0),
            z(1),
            j('ngIf', !r.loading && t.length > 0),
            z(1),
            j('ngIf', !r.loading && t.length > 0)
        }
      }
      let zB = (() => {
          class n {
            constructor (t, r) {
              ;(this.sauce = t), (this.router = r)
            }
            ngOnInit () {
              ;(this.loading = !0),
                (this.sauces$ = this.sauce.sauces$.pipe(
                  ue(() => {
                    ;(this.loading = !1), (this.errorMsg = '')
                  }),
                  Ae(
                    t => (
                      (this.errorMsg = JSON.stringify(t)),
                      (this.loading = !1),
                      V([])
                    )
                  )
                )),
                this.sauce.getSauces()
            }
            onClickSauce (t) {
              this.router.navigate(['sauce', t])
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(y(ih), y(He))
            }),
            (n.ɵcmp = At({
              type: n,
              selectors: [['app-sauce-list']],
              decls: 3,
              vars: 4,
              consts: [
                [4, 'ngIf'],
                ['class', 'list-title', 4, 'ngIf'],
                ['class', 'sauce-list', 4, 'ngIf'],
                [1, 'list-title'],
                [1, 'sauce-list'],
                ['class', 'sauce-list-item', 3, 'click', 4, 'ngFor', 'ngForOf'],
                [1, 'sauce-list-item', 3, 'click'],
                ['alt', 'Hot sauce bottle', 3, 'src']
              ],
              template: function (t, r) {
                1 & t &&
                  (oe(0, VB, 1, 0, 'mat-spinner', 0),
                  oe(1, $B, 4, 3, 'ng-container', 0),
                  Wn(2, 'async')),
                  2 & t &&
                    (j('ngIf', r.loading), z(1), j('ngIf', Kn(2, 2, r.sauces$)))
              },
              directives: [$r, jo, Fb],
              pipes: [ml, Vb],
              styles: [
                '.sauce-list[_ngcontent-%COMP%]{display:flex;justify-content:space-around;flex-wrap:wrap}.sauce-list-item[_ngcontent-%COMP%]{text-align:center;width:220px;transition:all .1s ease-in-out;cursor:pointer}.sauce-list-item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:200px;max-height:250px}.sauce-list-item[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:0;font-weight:500}.sauce-list-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0}.sauce-list-item[_ngcontent-%COMP%]:hover{transform:scale(1.05);box-shadow:1px 1px 20px #7878784d}.list-title[_ngcontent-%COMP%]{text-align:center;margin:2em auto}'
              ]
            })),
            n
          )
        })(),
        NE = (() => {
          class n {
            constructor (t, r) {
              ;(this._renderer = t),
                (this._elementRef = r),
                (this.onChange = i => {}),
                (this.onTouched = () => {})
            }
            setProperty (t, r) {
              this._renderer.setProperty(this._elementRef.nativeElement, t, r)
            }
            registerOnTouched (t) {
              this.onTouched = t
            }
            registerOnChange (t) {
              this.onChange = t
            }
            setDisabledState (t) {
              this.setProperty('disabled', t)
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(y(Gn), y(et))
            }),
            (n.ɵdir = N({ type: n })),
            n
          )
        })(),
        ti = (() => {
          class n extends NE {}
          return (
            (n.ɵfac = (function () {
              let e
              return function (r) {
                return (e || (e = at(n)))(r || n)
              }
            })()),
            (n.ɵdir = N({ type: n, features: [se] })),
            n
          )
        })()
      const On = new x('NgValueAccessor'),
        WB = { provide: On, useExisting: ye(() => hs), multi: !0 },
        QB = new x('CompositionEventMode')
      let hs = (() => {
        class n extends NE {
          constructor (t, r, i) {
            super(t, r),
              (this._compositionMode = i),
              (this._composing = !1),
              null == this._compositionMode &&
                (this._compositionMode = !(function KB () {
                  const n = In() ? In().getUserAgent() : ''
                  return /android (\d+)/.test(n.toLowerCase())
                })())
          }
          writeValue (t) {
            this.setProperty('value', null == t ? '' : t)
          }
          _handleInput (t) {
            ;(!this._compositionMode ||
              (this._compositionMode && !this._composing)) &&
              this.onChange(t)
          }
          _compositionStart () {
            this._composing = !0
          }
          _compositionEnd (t) {
            ;(this._composing = !1), this._compositionMode && this.onChange(t)
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(y(Gn), y(et), y(QB, 8))
          }),
          (n.ɵdir = N({
            type: n,
            selectors: [
              ['input', 'formControlName', '', 3, 'type', 'checkbox'],
              ['textarea', 'formControlName', ''],
              ['input', 'formControl', '', 3, 'type', 'checkbox'],
              ['textarea', 'formControl', ''],
              ['input', 'ngModel', '', 3, 'type', 'checkbox'],
              ['textarea', 'ngModel', ''],
              ['', 'ngDefaultControl', '']
            ],
            hostBindings: function (t, r) {
              1 & t &&
                Ce('input', function (s) {
                  return r._handleInput(s.target.value)
                })('blur', function () {
                  return r.onTouched()
                })('compositionstart', function () {
                  return r._compositionStart()
                })('compositionend', function (s) {
                  return r._compositionEnd(s.target.value)
                })
            },
            features: [Ee([WB]), se]
          })),
          n
        )
      })()
      function Er (n) {
        return null == n || 0 === n.length
      }
      function LE (n) {
        return null != n && 'number' == typeof n.length
      }
      const ct = new x('NgValidators'),
        wr = new x('NgAsyncValidators'),
        ZB =
          /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      class tt {
        static min (e) {
          return (function VE (n) {
            return e => {
              if (Er(e.value) || Er(n)) return null
              const t = parseFloat(e.value)
              return !isNaN(t) && t < n
                ? { min: { min: n, actual: e.value } }
                : null
            }
          })(e)
        }
        static max (e) {
          return (function BE (n) {
            return e => {
              if (Er(e.value) || Er(n)) return null
              const t = parseFloat(e.value)
              return !isNaN(t) && t > n
                ? { max: { max: n, actual: e.value } }
                : null
            }
          })(e)
        }
        static required (e) {
          return (function jE (n) {
            return Er(n.value) ? { required: !0 } : null
          })(e)
        }
        static requiredTrue (e) {
          return (function UE (n) {
            return !0 === n.value ? null : { required: !0 }
          })(e)
        }
        static email (e) {
          return (function HE (n) {
            return Er(n.value) || ZB.test(n.value) ? null : { email: !0 }
          })(e)
        }
        static minLength (e) {
          return (function $E (n) {
            return e =>
              Er(e.value) || !LE(e.value)
                ? null
                : e.value.length < n
                ? {
                    minlength: {
                      requiredLength: n,
                      actualLength: e.value.length
                    }
                  }
                : null
          })(e)
        }
        static maxLength (e) {
          return (function zE (n) {
            return e =>
              LE(e.value) && e.value.length > n
                ? {
                    maxlength: {
                      requiredLength: n,
                      actualLength: e.value.length
                    }
                  }
                : null
          })(e)
        }
        static pattern (e) {
          return (function GE (n) {
            if (!n) return lu
            let e, t
            return (
              'string' == typeof n
                ? ((t = ''),
                  '^' !== n.charAt(0) && (t += '^'),
                  (t += n),
                  '$' !== n.charAt(n.length - 1) && (t += '$'),
                  (e = new RegExp(t)))
                : ((t = n.toString()), (e = n)),
              r => {
                if (Er(r.value)) return null
                const i = r.value
                return e.test(i)
                  ? null
                  : { pattern: { requiredPattern: t, actualValue: i } }
              }
            )
          })(e)
        }
        static nullValidator (e) {
          return null
        }
        static compose (e) {
          return YE(e)
        }
        static composeAsync (e) {
          return XE(e)
        }
      }
      function lu (n) {
        return null
      }
      function qE (n) {
        return null != n
      }
      function WE (n) {
        const e = Ys(n) ? Ze(n) : n
        return bd(e), e
      }
      function KE (n) {
        let e = {}
        return (
          n.forEach(t => {
            e = null != t ? Object.assign(Object.assign({}, e), t) : e
          }),
          0 === Object.keys(e).length ? null : e
        )
      }
      function QE (n, e) {
        return e.map(t => t(n))
      }
      function ZE (n) {
        return n.map(e =>
          (function YB (n) {
            return !n.validate
          })(e)
            ? e
            : t => e.validate(t)
        )
      }
      function YE (n) {
        if (!n) return null
        const e = n.filter(qE)
        return 0 == e.length
          ? null
          : function (t) {
              return KE(QE(t, e))
            }
      }
      function jh (n) {
        return null != n ? YE(ZE(n)) : null
      }
      function XE (n) {
        if (!n) return null
        const e = n.filter(qE)
        return 0 == e.length
          ? null
          : function (t) {
              return (function GB (...n) {
                const e = Fp(n),
                  { args: t, keys: r } = rC(n),
                  i = new me(s => {
                    const { length: o } = t
                    if (!o) return void s.complete()
                    const a = new Array(o)
                    let l = o,
                      u = o
                    for (let c = 0; c < o; c++) {
                      let d = !1
                      Ht(t[c]).subscribe(
                        xe(
                          s,
                          f => {
                            d || ((d = !0), u--), (a[c] = f)
                          },
                          () => l--,
                          void 0,
                          () => {
                            ;(!l || !d) &&
                              (u || s.next(r ? sC(r, a) : a), s.complete())
                          }
                        )
                      )
                    }
                  })
                return e ? i.pipe(iC(e)) : i
              })(QE(t, e).map(WE)).pipe(ne(KE))
            }
      }
      function Uh (n) {
        return null != n ? XE(ZE(n)) : null
      }
      function JE (n, e) {
        return null === n ? [e] : Array.isArray(n) ? [...n, e] : [n, e]
      }
      function ew (n) {
        return n._rawValidators
      }
      function tw (n) {
        return n._rawAsyncValidators
      }
      function Hh (n) {
        return n ? (Array.isArray(n) ? n : [n]) : []
      }
      function uu (n, e) {
        return Array.isArray(n) ? n.includes(e) : n === e
      }
      function nw (n, e) {
        const t = Hh(e)
        return (
          Hh(n).forEach(i => {
            uu(t, i) || t.push(i)
          }),
          t
        )
      }
      function rw (n, e) {
        return Hh(e).filter(t => !uu(n, t))
      }
      class iw {
        constructor () {
          ;(this._rawValidators = []),
            (this._rawAsyncValidators = []),
            (this._onDestroyCallbacks = [])
        }
        get value () {
          return this.control ? this.control.value : null
        }
        get valid () {
          return this.control ? this.control.valid : null
        }
        get invalid () {
          return this.control ? this.control.invalid : null
        }
        get pending () {
          return this.control ? this.control.pending : null
        }
        get disabled () {
          return this.control ? this.control.disabled : null
        }
        get enabled () {
          return this.control ? this.control.enabled : null
        }
        get errors () {
          return this.control ? this.control.errors : null
        }
        get pristine () {
          return this.control ? this.control.pristine : null
        }
        get dirty () {
          return this.control ? this.control.dirty : null
        }
        get touched () {
          return this.control ? this.control.touched : null
        }
        get status () {
          return this.control ? this.control.status : null
        }
        get untouched () {
          return this.control ? this.control.untouched : null
        }
        get statusChanges () {
          return this.control ? this.control.statusChanges : null
        }
        get valueChanges () {
          return this.control ? this.control.valueChanges : null
        }
        get path () {
          return null
        }
        _setValidators (e) {
          ;(this._rawValidators = e || []),
            (this._composedValidatorFn = jh(this._rawValidators))
        }
        _setAsyncValidators (e) {
          ;(this._rawAsyncValidators = e || []),
            (this._composedAsyncValidatorFn = Uh(this._rawAsyncValidators))
        }
        get validator () {
          return this._composedValidatorFn || null
        }
        get asyncValidator () {
          return this._composedAsyncValidatorFn || null
        }
        _registerOnDestroy (e) {
          this._onDestroyCallbacks.push(e)
        }
        _invokeOnDestroyCallbacks () {
          this._onDestroyCallbacks.forEach(e => e()),
            (this._onDestroyCallbacks = [])
        }
        reset (e) {
          this.control && this.control.reset(e)
        }
        hasError (e, t) {
          return !!this.control && this.control.hasError(e, t)
        }
        getError (e, t) {
          return this.control ? this.control.getError(e, t) : null
        }
      }
      class Sr extends iw {
        constructor () {
          super(...arguments),
            (this._parent = null),
            (this.name = null),
            (this.valueAccessor = null)
        }
      }
      class vt extends iw {
        get formDirective () {
          return null
        }
        get path () {
          return null
        }
      }
      class sw {
        constructor (e) {
          this._cd = e
        }
        is (e) {
          var t, r, i
          return 'submitted' === e
            ? !!(null === (t = this._cd) || void 0 === t ? void 0 : t.submitted)
            : !!(null ===
                (i =
                  null === (r = this._cd) || void 0 === r
                    ? void 0
                    : r.control) || void 0 === i
                ? void 0
                : i[e])
        }
      }
      let cu = (() => {
          class n extends sw {
            constructor (t) {
              super(t)
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(y(Sr, 2))
            }),
            (n.ɵdir = N({
              type: n,
              selectors: [
                ['', 'formControlName', ''],
                ['', 'ngModel', ''],
                ['', 'formControl', '']
              ],
              hostVars: 14,
              hostBindings: function (t, r) {
                2 & t &&
                  $n('ng-untouched', r.is('untouched'))(
                    'ng-touched',
                    r.is('touched')
                  )('ng-pristine', r.is('pristine'))('ng-dirty', r.is('dirty'))(
                    'ng-valid',
                    r.is('valid')
                  )('ng-invalid', r.is('invalid'))(
                    'ng-pending',
                    r.is('pending')
                  )
              },
              features: [se]
            })),
            n
          )
        })(),
        du = (() => {
          class n extends sw {
            constructor (t) {
              super(t)
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(y(vt, 10))
            }),
            (n.ɵdir = N({
              type: n,
              selectors: [
                ['', 'formGroupName', ''],
                ['', 'formArrayName', ''],
                ['', 'ngModelGroup', ''],
                ['', 'formGroup', ''],
                ['form', 3, 'ngNoForm', ''],
                ['', 'ngForm', '']
              ],
              hostVars: 16,
              hostBindings: function (t, r) {
                2 & t &&
                  $n('ng-untouched', r.is('untouched'))(
                    'ng-touched',
                    r.is('touched')
                  )('ng-pristine', r.is('pristine'))('ng-dirty', r.is('dirty'))(
                    'ng-valid',
                    r.is('valid')
                  )('ng-invalid', r.is('invalid'))(
                    'ng-pending',
                    r.is('pending')
                  )('ng-submitted', r.is('submitted'))
              },
              features: [se]
            })),
            n
          )
        })()
      function Uo (n, e) {
        Gh(n, e),
          e.valueAccessor.writeValue(n.value),
          (function o2 (n, e) {
            e.valueAccessor.registerOnChange(t => {
              ;(n._pendingValue = t),
                (n._pendingChange = !0),
                (n._pendingDirty = !0),
                'change' === n.updateOn && aw(n, e)
            })
          })(n, e),
          (function l2 (n, e) {
            const t = (r, i) => {
              e.valueAccessor.writeValue(r), i && e.viewToModelUpdate(r)
            }
            n.registerOnChange(t),
              e._registerOnDestroy(() => {
                n._unregisterOnChange(t)
              })
          })(n, e),
          (function a2 (n, e) {
            e.valueAccessor.registerOnTouched(() => {
              ;(n._pendingTouched = !0),
                'blur' === n.updateOn && n._pendingChange && aw(n, e),
                'submit' !== n.updateOn && n.markAsTouched()
            })
          })(n, e),
          (function s2 (n, e) {
            if (e.valueAccessor.setDisabledState) {
              const t = r => {
                e.valueAccessor.setDisabledState(r)
              }
              n.registerOnDisabledChange(t),
                e._registerOnDestroy(() => {
                  n._unregisterOnDisabledChange(t)
                })
            }
          })(n, e)
      }
      function pu (n, e, t = !0) {
        const r = () => {}
        e.valueAccessor &&
          (e.valueAccessor.registerOnChange(r),
          e.valueAccessor.registerOnTouched(r)),
          mu(n, e),
          n &&
            (e._invokeOnDestroyCallbacks(),
            n._registerOnCollectionChange(() => {}))
      }
      function gu (n, e) {
        n.forEach(t => {
          t.registerOnValidatorChange && t.registerOnValidatorChange(e)
        })
      }
      function Gh (n, e) {
        const t = ew(n)
        null !== e.validator
          ? n.setValidators(JE(t, e.validator))
          : 'function' == typeof t && n.setValidators([t])
        const r = tw(n)
        null !== e.asyncValidator
          ? n.setAsyncValidators(JE(r, e.asyncValidator))
          : 'function' == typeof r && n.setAsyncValidators([r])
        const i = () => n.updateValueAndValidity()
        gu(e._rawValidators, i), gu(e._rawAsyncValidators, i)
      }
      function mu (n, e) {
        let t = !1
        if (null !== n) {
          if (null !== e.validator) {
            const i = ew(n)
            if (Array.isArray(i) && i.length > 0) {
              const s = i.filter(o => o !== e.validator)
              s.length !== i.length && ((t = !0), n.setValidators(s))
            }
          }
          if (null !== e.asyncValidator) {
            const i = tw(n)
            if (Array.isArray(i) && i.length > 0) {
              const s = i.filter(o => o !== e.asyncValidator)
              s.length !== i.length && ((t = !0), n.setAsyncValidators(s))
            }
          }
        }
        const r = () => {}
        return gu(e._rawValidators, r), gu(e._rawAsyncValidators, r), t
      }
      function aw (n, e) {
        n._pendingDirty && n.markAsDirty(),
          n.setValue(n._pendingValue, { emitModelToViewChange: !1 }),
          e.viewToModelUpdate(n._pendingValue),
          (n._pendingChange = !1)
      }
      function Kh (n, e) {
        const t = n.indexOf(e)
        t > -1 && n.splice(t, 1)
      }
      const Ho = 'VALID',
        yu = 'INVALID',
        ps = 'PENDING',
        $o = 'DISABLED'
      function Zh (n) {
        return (_u(n) ? n.validators : n) || null
      }
      function cw (n) {
        return Array.isArray(n) ? jh(n) : n || null
      }
      function Yh (n, e) {
        return (_u(e) ? e.asyncValidators : n) || null
      }
      function dw (n) {
        return Array.isArray(n) ? Uh(n) : n || null
      }
      function _u (n) {
        return null != n && !Array.isArray(n) && 'object' == typeof n
      }
      const Xh = n => n instanceof ep,
        vu = n => n instanceof bu,
        fw = n => n instanceof mw
      function hw (n) {
        return Xh(n) ? n.value : n.getRawValue()
      }
      function pw (n, e) {
        const t = vu(n),
          r = n.controls
        if (!(t ? Object.keys(r) : r).length) throw new M(1e3, '')
        if (!r[e]) throw new M(1001, '')
      }
      function gw (n, e) {
        vu(n),
          n._forEachChild((r, i) => {
            if (void 0 === e[i]) throw new M(1002, '')
          })
      }
      class Jh {
        constructor (e, t) {
          ;(this._pendingDirty = !1),
            (this._hasOwnPendingAsyncValidator = !1),
            (this._pendingTouched = !1),
            (this._onCollectionChange = () => {}),
            (this._parent = null),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []),
            (this._rawValidators = e),
            (this._rawAsyncValidators = t),
            (this._composedValidatorFn = cw(this._rawValidators)),
            (this._composedAsyncValidatorFn = dw(this._rawAsyncValidators))
        }
        get validator () {
          return this._composedValidatorFn
        }
        set validator (e) {
          this._rawValidators = this._composedValidatorFn = e
        }
        get asyncValidator () {
          return this._composedAsyncValidatorFn
        }
        set asyncValidator (e) {
          this._rawAsyncValidators = this._composedAsyncValidatorFn = e
        }
        get parent () {
          return this._parent
        }
        get valid () {
          return this.status === Ho
        }
        get invalid () {
          return this.status === yu
        }
        get pending () {
          return this.status == ps
        }
        get disabled () {
          return this.status === $o
        }
        get enabled () {
          return this.status !== $o
        }
        get dirty () {
          return !this.pristine
        }
        get untouched () {
          return !this.touched
        }
        get updateOn () {
          return this._updateOn
            ? this._updateOn
            : this.parent
            ? this.parent.updateOn
            : 'change'
        }
        setValidators (e) {
          ;(this._rawValidators = e), (this._composedValidatorFn = cw(e))
        }
        setAsyncValidators (e) {
          ;(this._rawAsyncValidators = e),
            (this._composedAsyncValidatorFn = dw(e))
        }
        addValidators (e) {
          this.setValidators(nw(e, this._rawValidators))
        }
        addAsyncValidators (e) {
          this.setAsyncValidators(nw(e, this._rawAsyncValidators))
        }
        removeValidators (e) {
          this.setValidators(rw(e, this._rawValidators))
        }
        removeAsyncValidators (e) {
          this.setAsyncValidators(rw(e, this._rawAsyncValidators))
        }
        hasValidator (e) {
          return uu(this._rawValidators, e)
        }
        hasAsyncValidator (e) {
          return uu(this._rawAsyncValidators, e)
        }
        clearValidators () {
          this.validator = null
        }
        clearAsyncValidators () {
          this.asyncValidator = null
        }
        markAsTouched (e = {}) {
          ;(this.touched = !0),
            this._parent && !e.onlySelf && this._parent.markAsTouched(e)
        }
        markAllAsTouched () {
          this.markAsTouched({ onlySelf: !0 }),
            this._forEachChild(e => e.markAllAsTouched())
        }
        markAsUntouched (e = {}) {
          ;(this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild(t => {
              t.markAsUntouched({ onlySelf: !0 })
            }),
            this._parent && !e.onlySelf && this._parent._updateTouched(e)
        }
        markAsDirty (e = {}) {
          ;(this.pristine = !1),
            this._parent && !e.onlySelf && this._parent.markAsDirty(e)
        }
        markAsPristine (e = {}) {
          ;(this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild(t => {
              t.markAsPristine({ onlySelf: !0 })
            }),
            this._parent && !e.onlySelf && this._parent._updatePristine(e)
        }
        markAsPending (e = {}) {
          ;(this.status = ps),
            !1 !== e.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !e.onlySelf && this._parent.markAsPending(e)
        }
        disable (e = {}) {
          const t = this._parentMarkedDirty(e.onlySelf)
          ;(this.status = $o),
            (this.errors = null),
            this._forEachChild(r => {
              r.disable(Object.assign(Object.assign({}, e), { onlySelf: !0 }))
            }),
            this._updateValue(),
            !1 !== e.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._updateAncestors(
              Object.assign(Object.assign({}, e), { skipPristineCheck: t })
            ),
            this._onDisabledChange.forEach(r => r(!0))
        }
        enable (e = {}) {
          const t = this._parentMarkedDirty(e.onlySelf)
          ;(this.status = Ho),
            this._forEachChild(r => {
              r.enable(Object.assign(Object.assign({}, e), { onlySelf: !0 }))
            }),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: e.emitEvent
            }),
            this._updateAncestors(
              Object.assign(Object.assign({}, e), { skipPristineCheck: t })
            ),
            this._onDisabledChange.forEach(r => r(!1))
        }
        _updateAncestors (e) {
          this._parent &&
            !e.onlySelf &&
            (this._parent.updateValueAndValidity(e),
            e.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched())
        }
        setParent (e) {
          this._parent = e
        }
        updateValueAndValidity (e = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              (this.status === Ho || this.status === ps) &&
                this._runAsyncValidator(e.emitEvent)),
            !1 !== e.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._parent &&
              !e.onlySelf &&
              this._parent.updateValueAndValidity(e)
        }
        _updateTreeValidity (e = { emitEvent: !0 }) {
          this._forEachChild(t => t._updateTreeValidity(e)),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: e.emitEvent
            })
        }
        _setInitialStatus () {
          this.status = this._allControlsDisabled() ? $o : Ho
        }
        _runValidator () {
          return this.validator ? this.validator(this) : null
        }
        _runAsyncValidator (e) {
          if (this.asyncValidator) {
            ;(this.status = ps), (this._hasOwnPendingAsyncValidator = !0)
            const t = WE(this.asyncValidator(this))
            this._asyncValidationSubscription = t.subscribe(r => {
              ;(this._hasOwnPendingAsyncValidator = !1),
                this.setErrors(r, { emitEvent: e })
            })
          }
        }
        _cancelExistingSubscription () {
          this._asyncValidationSubscription &&
            (this._asyncValidationSubscription.unsubscribe(),
            (this._hasOwnPendingAsyncValidator = !1))
        }
        setErrors (e, t = {}) {
          ;(this.errors = e), this._updateControlsErrors(!1 !== t.emitEvent)
        }
        get (e) {
          return (function f2 (n, e, t) {
            if (
              null == e ||
              (Array.isArray(e) || (e = e.split(t)),
              Array.isArray(e) && 0 === e.length)
            )
              return null
            let r = n
            return (
              e.forEach(i => {
                r = vu(r)
                  ? r.controls.hasOwnProperty(i)
                    ? r.controls[i]
                    : null
                  : (fw(r) && r.at(i)) || null
              }),
              r
            )
          })(this, e, '.')
        }
        getError (e, t) {
          const r = t ? this.get(t) : this
          return r && r.errors ? r.errors[e] : null
        }
        hasError (e, t) {
          return !!this.getError(e, t)
        }
        get root () {
          let e = this
          for (; e._parent; ) e = e._parent
          return e
        }
        _updateControlsErrors (e) {
          ;(this.status = this._calculateStatus()),
            e && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(e)
        }
        _initObservables () {
          ;(this.valueChanges = new Fe()), (this.statusChanges = new Fe())
        }
        _calculateStatus () {
          return this._allControlsDisabled()
            ? $o
            : this.errors
            ? yu
            : this._hasOwnPendingAsyncValidator ||
              this._anyControlsHaveStatus(ps)
            ? ps
            : this._anyControlsHaveStatus(yu)
            ? yu
            : Ho
        }
        _anyControlsHaveStatus (e) {
          return this._anyControls(t => t.status === e)
        }
        _anyControlsDirty () {
          return this._anyControls(e => e.dirty)
        }
        _anyControlsTouched () {
          return this._anyControls(e => e.touched)
        }
        _updatePristine (e = {}) {
          ;(this.pristine = !this._anyControlsDirty()),
            this._parent && !e.onlySelf && this._parent._updatePristine(e)
        }
        _updateTouched (e = {}) {
          ;(this.touched = this._anyControlsTouched()),
            this._parent && !e.onlySelf && this._parent._updateTouched(e)
        }
        _isBoxedValue (e) {
          return (
            'object' == typeof e &&
            null !== e &&
            2 === Object.keys(e).length &&
            'value' in e &&
            'disabled' in e
          )
        }
        _registerOnCollectionChange (e) {
          this._onCollectionChange = e
        }
        _setUpdateStrategy (e) {
          _u(e) && null != e.updateOn && (this._updateOn = e.updateOn)
        }
        _parentMarkedDirty (e) {
          return (
            !e &&
            !(!this._parent || !this._parent.dirty) &&
            !this._parent._anyControlsDirty()
          )
        }
      }
      class ep extends Jh {
        constructor (e = null, t, r) {
          super(Zh(t), Yh(r, t)),
            (this.defaultValue = null),
            (this._onChange = []),
            (this._pendingChange = !1),
            this._applyFormState(e),
            this._setUpdateStrategy(t),
            this._initObservables(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator
            }),
            _u(t) &&
              t.initialValueIsDefault &&
              (this.defaultValue = this._isBoxedValue(e) ? e.value : e)
        }
        setValue (e, t = {}) {
          ;(this.value = this._pendingValue = e),
            this._onChange.length &&
              !1 !== t.emitModelToViewChange &&
              this._onChange.forEach(r =>
                r(this.value, !1 !== t.emitViewToModelChange)
              ),
            this.updateValueAndValidity(t)
        }
        patchValue (e, t = {}) {
          this.setValue(e, t)
        }
        reset (e = this.defaultValue, t = {}) {
          this._applyFormState(e),
            this.markAsPristine(t),
            this.markAsUntouched(t),
            this.setValue(this.value, t),
            (this._pendingChange = !1)
        }
        _updateValue () {}
        _anyControls (e) {
          return !1
        }
        _allControlsDisabled () {
          return this.disabled
        }
        registerOnChange (e) {
          this._onChange.push(e)
        }
        _unregisterOnChange (e) {
          Kh(this._onChange, e)
        }
        registerOnDisabledChange (e) {
          this._onDisabledChange.push(e)
        }
        _unregisterOnDisabledChange (e) {
          Kh(this._onDisabledChange, e)
        }
        _forEachChild (e) {}
        _syncPendingControls () {
          return !(
            'submit' !== this.updateOn ||
            (this._pendingDirty && this.markAsDirty(),
            this._pendingTouched && this.markAsTouched(),
            !this._pendingChange) ||
            (this.setValue(this._pendingValue, {
              onlySelf: !0,
              emitModelToViewChange: !1
            }),
            0)
          )
        }
        _applyFormState (e) {
          this._isBoxedValue(e)
            ? ((this.value = this._pendingValue = e.value),
              e.disabled
                ? this.disable({ onlySelf: !0, emitEvent: !1 })
                : this.enable({ onlySelf: !0, emitEvent: !1 }))
            : (this.value = this._pendingValue = e)
        }
      }
      class bu extends Jh {
        constructor (e, t, r) {
          super(Zh(t), Yh(r, t)),
            (this.controls = e),
            this._initObservables(),
            this._setUpdateStrategy(t),
            this._setUpControls(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator
            })
        }
        registerControl (e, t) {
          return this.controls[e]
            ? this.controls[e]
            : ((this.controls[e] = t),
              t.setParent(this),
              t._registerOnCollectionChange(this._onCollectionChange),
              t)
        }
        addControl (e, t, r = {}) {
          this.registerControl(e, t),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange()
        }
        removeControl (e, t = {}) {
          this.controls[e] &&
            this.controls[e]._registerOnCollectionChange(() => {}),
            delete this.controls[e],
            this.updateValueAndValidity({ emitEvent: t.emitEvent }),
            this._onCollectionChange()
        }
        setControl (e, t, r = {}) {
          this.controls[e] &&
            this.controls[e]._registerOnCollectionChange(() => {}),
            delete this.controls[e],
            t && this.registerControl(e, t),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange()
        }
        contains (e) {
          return this.controls.hasOwnProperty(e) && this.controls[e].enabled
        }
        setValue (e, t = {}) {
          gw(this, e),
            Object.keys(e).forEach(r => {
              pw(this, r),
                this.controls[r].setValue(e[r], {
                  onlySelf: !0,
                  emitEvent: t.emitEvent
                })
            }),
            this.updateValueAndValidity(t)
        }
        patchValue (e, t = {}) {
          null != e &&
            (Object.keys(e).forEach(r => {
              this.controls[r] &&
                this.controls[r].patchValue(e[r], {
                  onlySelf: !0,
                  emitEvent: t.emitEvent
                })
            }),
            this.updateValueAndValidity(t))
        }
        reset (e = {}, t = {}) {
          this._forEachChild((r, i) => {
            r.reset(e[i], { onlySelf: !0, emitEvent: t.emitEvent })
          }),
            this._updatePristine(t),
            this._updateTouched(t),
            this.updateValueAndValidity(t)
        }
        getRawValue () {
          return this._reduceChildren({}, (e, t, r) => ((e[r] = hw(t)), e))
        }
        _syncPendingControls () {
          let e = this._reduceChildren(
            !1,
            (t, r) => !!r._syncPendingControls() || t
          )
          return e && this.updateValueAndValidity({ onlySelf: !0 }), e
        }
        _forEachChild (e) {
          Object.keys(this.controls).forEach(t => {
            const r = this.controls[t]
            r && e(r, t)
          })
        }
        _setUpControls () {
          this._forEachChild(e => {
            e.setParent(this),
              e._registerOnCollectionChange(this._onCollectionChange)
          })
        }
        _updateValue () {
          this.value = this._reduceValue()
        }
        _anyControls (e) {
          for (const t of Object.keys(this.controls)) {
            const r = this.controls[t]
            if (this.contains(t) && e(r)) return !0
          }
          return !1
        }
        _reduceValue () {
          return this._reduceChildren(
            {},
            (e, t, r) => ((t.enabled || this.disabled) && (e[r] = t.value), e)
          )
        }
        _reduceChildren (e, t) {
          let r = e
          return (
            this._forEachChild((i, s) => {
              r = t(r, i, s)
            }),
            r
          )
        }
        _allControlsDisabled () {
          for (const e of Object.keys(this.controls))
            if (this.controls[e].enabled) return !1
          return Object.keys(this.controls).length > 0 || this.disabled
        }
      }
      class mw extends Jh {
        constructor (e, t, r) {
          super(Zh(t), Yh(r, t)),
            (this.controls = e),
            this._initObservables(),
            this._setUpdateStrategy(t),
            this._setUpControls(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator
            })
        }
        at (e) {
          return this.controls[e]
        }
        push (e, t = {}) {
          this.controls.push(e),
            this._registerControl(e),
            this.updateValueAndValidity({ emitEvent: t.emitEvent }),
            this._onCollectionChange()
        }
        insert (e, t, r = {}) {
          this.controls.splice(e, 0, t),
            this._registerControl(t),
            this.updateValueAndValidity({ emitEvent: r.emitEvent })
        }
        removeAt (e, t = {}) {
          this.controls[e] &&
            this.controls[e]._registerOnCollectionChange(() => {}),
            this.controls.splice(e, 1),
            this.updateValueAndValidity({ emitEvent: t.emitEvent })
        }
        setControl (e, t, r = {}) {
          this.controls[e] &&
            this.controls[e]._registerOnCollectionChange(() => {}),
            this.controls.splice(e, 1),
            t && (this.controls.splice(e, 0, t), this._registerControl(t)),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange()
        }
        get length () {
          return this.controls.length
        }
        setValue (e, t = {}) {
          gw(this, e),
            e.forEach((r, i) => {
              pw(this, i),
                this.at(i).setValue(r, { onlySelf: !0, emitEvent: t.emitEvent })
            }),
            this.updateValueAndValidity(t)
        }
        patchValue (e, t = {}) {
          null != e &&
            (e.forEach((r, i) => {
              this.at(i) &&
                this.at(i).patchValue(r, {
                  onlySelf: !0,
                  emitEvent: t.emitEvent
                })
            }),
            this.updateValueAndValidity(t))
        }
        reset (e = [], t = {}) {
          this._forEachChild((r, i) => {
            r.reset(e[i], { onlySelf: !0, emitEvent: t.emitEvent })
          }),
            this._updatePristine(t),
            this._updateTouched(t),
            this.updateValueAndValidity(t)
        }
        getRawValue () {
          return this.controls.map(e => hw(e))
        }
        clear (e = {}) {
          this.controls.length < 1 ||
            (this._forEachChild(t => t._registerOnCollectionChange(() => {})),
            this.controls.splice(0),
            this.updateValueAndValidity({ emitEvent: e.emitEvent }))
        }
        _syncPendingControls () {
          let e = this.controls.reduce(
            (t, r) => !!r._syncPendingControls() || t,
            !1
          )
          return e && this.updateValueAndValidity({ onlySelf: !0 }), e
        }
        _forEachChild (e) {
          this.controls.forEach((t, r) => {
            e(t, r)
          })
        }
        _updateValue () {
          this.value = this.controls
            .filter(e => e.enabled || this.disabled)
            .map(e => e.value)
        }
        _anyControls (e) {
          return this.controls.some(t => t.enabled && e(t))
        }
        _setUpControls () {
          this._forEachChild(e => this._registerControl(e))
        }
        _allControlsDisabled () {
          for (const e of this.controls) if (e.enabled) return !1
          return this.controls.length > 0 || this.disabled
        }
        _registerControl (e) {
          e.setParent(this),
            e._registerOnCollectionChange(this._onCollectionChange)
        }
      }
      let Cu = (() => {
        class n {}
        return (
          (n.ɵfac = function (t) {
            return new (t || n)()
          }),
          (n.ɵdir = N({
            type: n,
            selectors: [['form', 3, 'ngNoForm', '', 3, 'ngNativeValidate', '']],
            hostAttrs: ['novalidate', '']
          })),
          n
        )
      })()
      const m2 = { provide: On, useExisting: ye(() => np), multi: !0 }
      let np = (() => {
          class n extends ti {
            writeValue (t) {
              this.setProperty('value', null == t ? '' : t)
            }
            registerOnChange (t) {
              this.onChange = r => {
                t('' == r ? null : parseFloat(r))
              }
            }
          }
          return (
            (n.ɵfac = (function () {
              let e
              return function (r) {
                return (e || (e = at(n)))(r || n)
              }
            })()),
            (n.ɵdir = N({
              type: n,
              selectors: [
                ['input', 'type', 'number', 'formControlName', ''],
                ['input', 'type', 'number', 'formControl', ''],
                ['input', 'type', 'number', 'ngModel', '']
              ],
              hostBindings: function (t, r) {
                1 & t &&
                  Ce('input', function (s) {
                    return r.onChange(s.target.value)
                  })('blur', function () {
                    return r.onTouched()
                  })
              },
              features: [Ee([m2]), se]
            })),
            n
          )
        })(),
        Cw = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)()
            }),
            (n.ɵmod = Ye({ type: n })),
            (n.ɵinj = ze({})),
            n
          )
        })()
      const v2 = { provide: On, useExisting: ye(() => rp), multi: !0 }
      let rp = (() => {
        class n extends ti {
          writeValue (t) {
            this.setProperty('value', parseFloat(t))
          }
          registerOnChange (t) {
            this.onChange = r => {
              t('' == r ? null : parseFloat(r))
            }
          }
        }
        return (
          (n.ɵfac = (function () {
            let e
            return function (r) {
              return (e || (e = at(n)))(r || n)
            }
          })()),
          (n.ɵdir = N({
            type: n,
            selectors: [
              ['input', 'type', 'range', 'formControlName', ''],
              ['input', 'type', 'range', 'formControl', ''],
              ['input', 'type', 'range', 'ngModel', '']
            ],
            hostBindings: function (t, r) {
              1 & t &&
                Ce('change', function (s) {
                  return r.onChange(s.target.value)
                })('input', function (s) {
                  return r.onChange(s.target.value)
                })('blur', function () {
                  return r.onTouched()
                })
            },
            features: [Ee([v2]), se]
          })),
          n
        )
      })()
      const ip = new x('NgModelWithFormControlWarning'),
        C2 = { provide: vt, useExisting: ye(() => gs) }
      let gs = (() => {
        class n extends vt {
          constructor (t, r) {
            super(),
              (this.validators = t),
              (this.asyncValidators = r),
              (this.submitted = !1),
              (this._onCollectionChange = () => this._updateDomValue()),
              (this.directives = []),
              (this.form = null),
              (this.ngSubmit = new Fe()),
              this._setValidators(t),
              this._setAsyncValidators(r)
          }
          ngOnChanges (t) {
            this._checkFormPresent(),
              t.hasOwnProperty('form') &&
                (this._updateValidators(),
                this._updateDomValue(),
                this._updateRegistrations(),
                (this._oldForm = this.form))
          }
          ngOnDestroy () {
            this.form &&
              (mu(this.form, this),
              this.form._onCollectionChange === this._onCollectionChange &&
                this.form._registerOnCollectionChange(() => {}))
          }
          get formDirective () {
            return this
          }
          get control () {
            return this.form
          }
          get path () {
            return []
          }
          addControl (t) {
            const r = this.form.get(t.path)
            return (
              Uo(r, t),
              r.updateValueAndValidity({ emitEvent: !1 }),
              this.directives.push(t),
              r
            )
          }
          getControl (t) {
            return this.form.get(t.path)
          }
          removeControl (t) {
            pu(t.control || null, t, !1), Kh(this.directives, t)
          }
          addFormGroup (t) {
            this._setUpFormContainer(t)
          }
          removeFormGroup (t) {
            this._cleanUpFormContainer(t)
          }
          getFormGroup (t) {
            return this.form.get(t.path)
          }
          addFormArray (t) {
            this._setUpFormContainer(t)
          }
          removeFormArray (t) {
            this._cleanUpFormContainer(t)
          }
          getFormArray (t) {
            return this.form.get(t.path)
          }
          updateModel (t, r) {
            this.form.get(t.path).setValue(r)
          }
          onSubmit (t) {
            return (
              (this.submitted = !0),
              (function uw (n, e) {
                n._syncPendingControls(),
                  e.forEach(t => {
                    const r = t.control
                    'submit' === r.updateOn &&
                      r._pendingChange &&
                      (t.viewToModelUpdate(r._pendingValue),
                      (r._pendingChange = !1))
                  })
              })(this.form, this.directives),
              this.ngSubmit.emit(t),
              !1
            )
          }
          onReset () {
            this.resetForm()
          }
          resetForm (t) {
            this.form.reset(t), (this.submitted = !1)
          }
          _updateDomValue () {
            this.directives.forEach(t => {
              const r = t.control,
                i = this.form.get(t.path)
              r !== i &&
                (pu(r || null, t), Xh(i) && (Uo(i, t), (t.control = i)))
            }),
              this.form._updateTreeValidity({ emitEvent: !1 })
          }
          _setUpFormContainer (t) {
            const r = this.form.get(t.path)
            ;(function lw (n, e) {
              Gh(n, e)
            })(r, t),
              r.updateValueAndValidity({ emitEvent: !1 })
          }
          _cleanUpFormContainer (t) {
            if (this.form) {
              const r = this.form.get(t.path)
              r &&
                (function u2 (n, e) {
                  return mu(n, e)
                })(r, t) &&
                r.updateValueAndValidity({ emitEvent: !1 })
            }
          }
          _updateRegistrations () {
            this.form._registerOnCollectionChange(this._onCollectionChange),
              this._oldForm &&
                this._oldForm._registerOnCollectionChange(() => {})
          }
          _updateValidators () {
            Gh(this.form, this), this._oldForm && mu(this._oldForm, this)
          }
          _checkFormPresent () {}
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(y(ct, 10), y(wr, 10))
          }),
          (n.ɵdir = N({
            type: n,
            selectors: [['', 'formGroup', '']],
            hostBindings: function (t, r) {
              1 & t &&
                Ce('submit', function (s) {
                  return r.onSubmit(s)
                })('reset', function () {
                  return r.onReset()
                })
            },
            inputs: { form: ['formGroup', 'form'] },
            outputs: { ngSubmit: 'ngSubmit' },
            exportAs: ['ngForm'],
            features: [Ee([C2]), se, Gt]
          })),
          n
        )
      })()
      const w2 = { provide: Sr, useExisting: ye(() => Go) }
      let Go = (() => {
          class n extends Sr {
            constructor (t, r, i, s, o) {
              super(),
                (this._ngModelWarningConfig = o),
                (this._added = !1),
                (this.update = new Fe()),
                (this._ngModelWarningSent = !1),
                (this._parent = t),
                this._setValidators(r),
                this._setAsyncValidators(i),
                (this.valueAccessor = (function Wh (n, e) {
                  if (!e) return null
                  let t, r, i
                  return (
                    Array.isArray(e),
                    e.forEach(s => {
                      s.constructor === hs
                        ? (t = s)
                        : (function d2 (n) {
                            return Object.getPrototypeOf(n.constructor) === ti
                          })(s)
                        ? (r = s)
                        : (i = s)
                    }),
                    i || r || t || null
                  )
                })(0, s))
            }
            set isDisabled (t) {}
            ngOnChanges (t) {
              this._added || this._setUpControl(),
                (function qh (n, e) {
                  if (!n.hasOwnProperty('model')) return !1
                  const t = n.model
                  return !!t.isFirstChange() || !Object.is(e, t.currentValue)
                })(t, this.viewModel) &&
                  ((this.viewModel = this.model),
                  this.formDirective.updateModel(this, this.model))
            }
            ngOnDestroy () {
              this.formDirective && this.formDirective.removeControl(this)
            }
            viewToModelUpdate (t) {
              ;(this.viewModel = t), this.update.emit(t)
            }
            get path () {
              return (function hu (n, e) {
                return [...e.path, n]
              })(
                null == this.name ? this.name : this.name.toString(),
                this._parent
              )
            }
            get formDirective () {
              return this._parent ? this._parent.formDirective : null
            }
            _checkParentType () {}
            _setUpControl () {
              this._checkParentType(),
                (this.control = this.formDirective.addControl(this)),
                this.control.disabled &&
                  this.valueAccessor.setDisabledState &&
                  this.valueAccessor.setDisabledState(!0),
                (this._added = !0)
            }
          }
          return (
            (n._ngModelWarningSentOnce = !1),
            (n.ɵfac = function (t) {
              return new (t || n)(
                y(vt, 13),
                y(ct, 10),
                y(wr, 10),
                y(On, 10),
                y(ip, 8)
              )
            }),
            (n.ɵdir = N({
              type: n,
              selectors: [['', 'formControlName', '']],
              inputs: {
                name: ['formControlName', 'name'],
                isDisabled: ['disabled', 'isDisabled'],
                model: ['ngModel', 'model']
              },
              outputs: { update: 'ngModelChange' },
              features: [Ee([w2]), se, Gt]
            })),
            n
          )
        })(),
        j2 = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)()
            }),
            (n.ɵmod = Ye({ type: n })),
            (n.ɵinj = ze({ imports: [[Cw]] })),
            n
          )
        })(),
        Pw = (() => {
          class n {
            static withConfig (t) {
              return {
                ngModule: n,
                providers: [
                  { provide: ip, useValue: t.warnOnNgModelWithFormControl }
                ]
              }
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)()
            }),
            (n.ɵmod = Ye({ type: n })),
            (n.ɵinj = ze({ imports: [j2] })),
            n
          )
        })(),
        cp = (() => {
          class n {
            group (t, r = null) {
              const i = this._reduceControls(t)
              let a,
                s = null,
                o = null
              return (
                null != r &&
                  ((function U2 (n) {
                    return (
                      void 0 !== n.asyncValidators ||
                      void 0 !== n.validators ||
                      void 0 !== n.updateOn
                    )
                  })(r)
                    ? ((s = null != r.validators ? r.validators : null),
                      (o =
                        null != r.asyncValidators ? r.asyncValidators : null),
                      (a = null != r.updateOn ? r.updateOn : void 0))
                    : ((s = null != r.validator ? r.validator : null),
                      (o =
                        null != r.asyncValidator ? r.asyncValidator : null))),
                new bu(i, { asyncValidators: o, updateOn: a, validators: s })
              )
            }
            control (t, r, i) {
              return new ep(t, r, i)
            }
            array (t, r, i) {
              const s = t.map(o => this._createControl(o))
              return new mw(s, r, i)
            }
            _reduceControls (t) {
              const r = {}
              return (
                Object.keys(t).forEach(i => {
                  r[i] = this._createControl(t[i])
                }),
                r
              )
            }
            _createControl (t) {
              return Xh(t) || vu(t) || fw(t)
                ? t
                : Array.isArray(t)
                ? this.control(
                    t[0],
                    t.length > 1 ? t[1] : null,
                    t.length > 2 ? t[2] : null
                  )
                : this.control(t)
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)()
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac, providedIn: Pw })),
            n
          )
        })()
      class H2 {}
      const $2 = ['mat-button', ''],
        z2 = ['*'],
        q2 = [
          'mat-button',
          'mat-flat-button',
          'mat-icon-button',
          'mat-raised-button',
          'mat-stroked-button',
          'mat-mini-fab',
          'mat-fab'
        ],
        W2 = ME(
          tB(
            nB(
              class {
                constructor (n) {
                  this._elementRef = n
                }
              }
            )
          )
        )
      let Du = (() => {
          class n extends W2 {
            constructor (t, r, i) {
              super(t),
                (this._focusMonitor = r),
                (this._animationMode = i),
                (this.isRoundButton = this._hasHostAttributes(
                  'mat-fab',
                  'mat-mini-fab'
                )),
                (this.isIconButton = this._hasHostAttributes('mat-icon-button'))
              for (const s of q2)
                this._hasHostAttributes(s) &&
                  this._getHostElement().classList.add(s)
              t.nativeElement.classList.add('mat-button-base'),
                this.isRoundButton && (this.color = 'accent')
            }
            ngAfterViewInit () {
              this._focusMonitor.monitor(this._elementRef, !0)
            }
            ngOnDestroy () {
              this._focusMonitor.stopMonitoring(this._elementRef)
            }
            focus (t, r) {
              t
                ? this._focusMonitor.focusVia(this._getHostElement(), t, r)
                : this._getHostElement().focus(r)
            }
            _getHostElement () {
              return this._elementRef.nativeElement
            }
            _isRippleDisabled () {
              return this.disableRipple || this.disabled
            }
            _hasHostAttributes (...t) {
              return t.some(r => this._getHostElement().hasAttribute(r))
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(y(et), y(tL), y(ds, 8))
            }),
            (n.ɵcmp = At({
              type: n,
              selectors: [
                ['button', 'mat-button', ''],
                ['button', 'mat-raised-button', ''],
                ['button', 'mat-icon-button', ''],
                ['button', 'mat-fab', ''],
                ['button', 'mat-mini-fab', ''],
                ['button', 'mat-stroked-button', ''],
                ['button', 'mat-flat-button', '']
              ],
              viewQuery: function (t, r) {
                if (
                  (1 & t &&
                    (function Tv (n, e, t) {
                      const r = re()
                      r.firstCreatePass &&
                        (xv(r, new Mv(n, e, t), -1),
                        2 == (2 & e) && (r.staticViewQueries = !0)),
                        Iv(r, b(), e)
                    })(xE, 5),
                  2 & t)
                ) {
                  let i
                  Za((i = Ya())) && (r.ripple = i.first)
                }
              },
              hostAttrs: [1, 'mat-focus-indicator'],
              hostVars: 5,
              hostBindings: function (t, r) {
                2 & t &&
                  (Je('disabled', r.disabled || null),
                  $n(
                    '_mat-animation-noopable',
                    'NoopAnimations' === r._animationMode
                  )('mat-button-disabled', r.disabled))
              },
              inputs: {
                disabled: 'disabled',
                disableRipple: 'disableRipple',
                color: 'color'
              },
              exportAs: ['matButton'],
              features: [se],
              attrs: $2,
              ngContentSelectors: z2,
              decls: 4,
              vars: 5,
              consts: [
                [1, 'mat-button-wrapper'],
                [
                  'matRipple',
                  '',
                  1,
                  'mat-button-ripple',
                  3,
                  'matRippleDisabled',
                  'matRippleCentered',
                  'matRippleTrigger'
                ],
                [1, 'mat-button-focus-overlay']
              ],
              template: function (t, r) {
                1 & t &&
                  ((function Ky (n) {
                    const e = b()[16][6]
                    if (!e.projection) {
                      const r = (e.projection = Fs(n ? n.length : 1, null)),
                        i = r.slice()
                      let s = e.child
                      for (; null !== s; ) {
                        const o = n ? oI(s, n) : 0
                        null !== o &&
                          (i[o] ? (i[o].projectionNext = s) : (r[o] = s),
                          (i[o] = s)),
                          (s = s.next)
                      }
                    }
                  })(),
                  k(0, 'span', 0),
                  (function Qy (n, e = 0, t) {
                    const r = b(),
                      i = re(),
                      s = Ti(i, 20 + n, 16, null, t || null)
                    null === s.projection && (s.projection = e),
                      Ju(),
                      64 != (64 & s.flags) &&
                        (function aA (n, e, t) {
                          Cm(
                            e[W],
                            0,
                            e,
                            t,
                            dm(n, t, e),
                            gm(t.parent || e[6], t, e)
                          )
                        })(i, r, s)
                  })(1),
                  T(),
                  le(2, 'span', 1)(3, 'span', 2)),
                  2 & t &&
                    (z(2),
                    $n(
                      'mat-button-ripple-round',
                      r.isRoundButton || r.isIconButton
                    ),
                    j('matRippleDisabled', r._isRippleDisabled())(
                      'matRippleCentered',
                      r.isIconButton
                    )('matRippleTrigger', r._getHostElement()))
              },
              directives: [xE],
              styles: [
                '.mat-button .mat-button-focus-overlay,.mat-icon-button .mat-button-focus-overlay{opacity:0}.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:.04}@media(hover: none){.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:0}}.mat-button,.mat-icon-button,.mat-stroked-button,.mat-flat-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-button.mat-button-disabled,.mat-icon-button.mat-button-disabled,.mat-stroked-button.mat-button-disabled,.mat-flat-button.mat-button-disabled{cursor:default}.mat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-button.cdk-program-focused .mat-button-focus-overlay,.mat-icon-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-icon-button.cdk-program-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-program-focused .mat-button-focus-overlay,.mat-flat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-flat-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-raised-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-raised-button::-moz-focus-inner{border:0}.mat-raised-button.mat-button-disabled{cursor:default}.mat-raised-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-raised-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-raised-button::-moz-focus-inner{border:0}._mat-animation-noopable.mat-raised-button{transition:none;animation:none}.mat-stroked-button{border:1px solid currentColor;padding:0 15px;line-height:34px}.mat-stroked-button .mat-button-ripple.mat-ripple,.mat-stroked-button .mat-button-focus-overlay{top:-1px;left:-1px;right:-1px;bottom:-1px}.mat-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:56px;height:56px;padding:0;flex-shrink:0}.mat-fab::-moz-focus-inner{border:0}.mat-fab.mat-button-disabled{cursor:default}.mat-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-fab{transition:none;animation:none}.mat-fab .mat-button-wrapper{padding:16px 0;display:inline-block;line-height:24px}.mat-mini-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:40px;height:40px;padding:0;flex-shrink:0}.mat-mini-fab::-moz-focus-inner{border:0}.mat-mini-fab.mat-button-disabled{cursor:default}.mat-mini-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-mini-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-mini-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-mini-fab{transition:none;animation:none}.mat-mini-fab .mat-button-wrapper{padding:8px 0;display:inline-block;line-height:24px}.mat-icon-button{padding:0;min-width:0;width:40px;height:40px;flex-shrink:0;line-height:40px;border-radius:50%}.mat-icon-button i,.mat-icon-button .mat-icon{line-height:24px}.mat-button-ripple.mat-ripple,.mat-button-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-button-ripple.mat-ripple:not(:empty){transform:translateZ(0)}.mat-button-focus-overlay{opacity:0;transition:opacity 200ms cubic-bezier(0.35, 0, 0.25, 1),background-color 200ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-button-focus-overlay{transition:none}.mat-button-ripple-round{border-radius:50%;z-index:1}.mat-button .mat-button-wrapper>*,.mat-flat-button .mat-button-wrapper>*,.mat-stroked-button .mat-button-wrapper>*,.mat-raised-button .mat-button-wrapper>*,.mat-icon-button .mat-button-wrapper>*,.mat-fab .mat-button-wrapper>*,.mat-mini-fab .mat-button-wrapper>*{vertical-align:middle}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button{display:inline-flex;justify-content:center;align-items:center;font-size:inherit;width:2.5em;height:2.5em}.cdk-high-contrast-active .mat-button,.cdk-high-contrast-active .mat-flat-button,.cdk-high-contrast-active .mat-raised-button,.cdk-high-contrast-active .mat-icon-button,.cdk-high-contrast-active .mat-fab,.cdk-high-contrast-active .mat-mini-fab{outline:solid 1px}.cdk-high-contrast-active .mat-button-base.cdk-keyboard-focused,.cdk-high-contrast-active .mat-button-base.cdk-program-focused{outline:solid 3px}\n'
              ],
              encapsulation: 2,
              changeDetection: 0
            })),
            n
          )
        })(),
        K2 = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)()
            }),
            (n.ɵmod = Ye({ type: n })),
            (n.ɵinj = ze({ imports: [[cB, fs], fs] })),
            n
          )
        })()
      function Q2 (n, e) {
        1 & n && le(0, 'mat-spinner')
      }
      function Z2 (n, e) {
        1 & n && le(0, 'img', 21), 2 & n && j('src', he(2).imagePreview, wi)
      }
      function Y2 (n, e) {
        if (1 & n) {
          const t = Sn()
          k(0, 'form', 2)(1, 'div', 3)(2, 'label', 4),
            J(3, 'Name'),
            T(),
            le(4, 'input', 5),
            T(),
            k(5, 'div', 3)(6, 'label', 6),
            J(7, 'Manufacturer'),
            T(),
            le(8, 'input', 7),
            T(),
            k(9, 'div', 3)(10, 'label', 8),
            J(11, 'Description'),
            T(),
            le(12, 'textarea', 9),
            T(),
            k(13, 'div', 3)(14, 'input', 10, 11),
            Ce('change', function (i) {
              return xt(t), he().onFileAdded(i)
            }),
            T(),
            k(16, 'button', 12),
            Ce('click', function () {
              return xt(t), $i(15).click()
            }),
            J(17, 'ADD IMAGE'),
            T(),
            oe(18, Z2, 1, 1, 'img', 13),
            T(),
            k(19, 'div', 3)(20, 'label', 14),
            J(21, 'Main Pepper Ingredient'),
            T(),
            le(22, 'input', 15),
            T(),
            k(23, 'div', 3)(24, 'label', 16),
            J(25, 'Heat'),
            T(),
            k(26, 'div', 17),
            le(27, 'input', 18)(28, 'input', 19),
            T()(),
            k(29, 'button', 20),
            Ce('click', function () {
              return xt(t), he().onSubmit()
            }),
            J(30, 'SUBMIT'),
            T()()
        }
        if (2 & n) {
          const t = he()
          j('formGroup', t.sauceForm),
            z(18),
            j('ngIf', t.imagePreview),
            z(11),
            j('disabled', t.sauceForm.invalid)
        }
      }
      let Lw = (() => {
        class n {
          constructor (t, r, i, s, o) {
            ;(this.formBuilder = t),
              (this.route = r),
              (this.router = i),
              (this.sauces = s),
              (this.auth = o)
          }
          ngOnInit () {
            ;(this.loading = !0),
              this.route.params
                .pipe(
                  Nt(t =>
                    t.id
                      ? ((this.mode = 'edit'), this.sauces.getSauceById(t.id))
                      : ((this.mode = 'new'),
                        this.initEmptyForm(),
                        (this.loading = !1),
                        ft)
                  ),
                  ue(t => {
                    t &&
                      ((this.sauce = t),
                      this.initModifyForm(t),
                      (this.loading = !1))
                  }),
                  Ae(t => (this.errorMsg = JSON.stringify(t)))
                )
                .subscribe()
          }
          initEmptyForm () {
            ;(this.sauceForm = this.formBuilder.group({
              name: [null, tt.required],
              manufacturer: [null, tt.required],
              description: [null, tt.required],
              image: [null, tt.required],
              mainPepper: [null, tt.required],
              heat: [1, tt.required],
              heatValue: [{ value: 1, disabled: !0 }]
            })),
              this.sauceForm.get('heat').valueChanges.subscribe(t => {
                this.sauceForm.get('heatValue').setValue(t)
              })
          }
          initModifyForm (t) {
            ;(this.sauceForm = this.formBuilder.group({
              name: [t.name, tt.required],
              manufacturer: [t.manufacturer, tt.required],
              description: [t.description, tt.required],
              image: [t.imageUrl, tt.required],
              mainPepper: [t.mainPepper, tt.required],
              heat: [t.heat, tt.required],
              heatValue: [{ value: t.heat, disabled: !0 }]
            })),
              this.sauceForm.get('heat').valueChanges.subscribe(r => {
                this.sauceForm.get('heatValue').setValue(r)
              }),
              (this.imagePreview = this.sauce.imageUrl)
          }
          onSubmit () {
            this.loading = !0
            const t = new H2()
            ;(t.name = this.sauceForm.get('name').value),
              (t.manufacturer = this.sauceForm.get('manufacturer').value),
              (t.description = this.sauceForm.get('description').value),
              (t.mainPepper = this.sauceForm.get('mainPepper').value),
              (t.heat = this.sauceForm.get('heat').value),
              (t.userId = this.auth.getUserId()),
              'new' === this.mode
                ? this.sauces
                    .createSauce(t, this.sauceForm.get('image').value)
                    .pipe(
                      ue(({ message: r }) => {
                        console.log(r),
                          (this.loading = !1),
                          this.router.navigate(['/sauces'])
                      }),
                      Ae(
                        r => (
                          console.error(r),
                          (this.loading = !1),
                          (this.errorMsg = r.message),
                          ft
                        )
                      )
                    )
                    .subscribe()
                : 'edit' === this.mode &&
                  this.sauces
                    .modifySauce(
                      this.sauce._id,
                      t,
                      this.sauceForm.get('image').value
                    )
                    .pipe(
                      ue(({ message: r }) => {
                        console.log(r),
                          (this.loading = !1),
                          this.router.navigate(['/sauces'])
                      }),
                      Ae(
                        r => (
                          console.error(r),
                          (this.loading = !1),
                          (this.errorMsg = r.message),
                          ft
                        )
                      )
                    )
                    .subscribe()
          }
          onFileAdded (t) {
            const r = t.target.files[0]
            this.sauceForm.get('image').setValue(r),
              this.sauceForm.updateValueAndValidity()
            const i = new FileReader()
            ;(i.onload = () => {
              this.imagePreview = i.result
            }),
              i.readAsDataURL(r)
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(y(cp), y(yr), y(He), y(ih), y(br))
          }),
          (n.ɵcmp = At({
            type: n,
            selectors: [['app-sauce-form']],
            decls: 2,
            vars: 2,
            consts: [
              [4, 'ngIf'],
              [3, 'formGroup', 4, 'ngIf'],
              [3, 'formGroup'],
              [1, 'form-group'],
              ['for', 'name'],
              [
                'type',
                'text',
                'id',
                'name',
                'formControlName',
                'name',
                1,
                'form-control'
              ],
              ['for', 'manufacturer'],
              [
                'type',
                'text',
                'id',
                'manufacturer',
                'formControlName',
                'manufacturer',
                1,
                'form-control'
              ],
              ['for', 'description'],
              [
                'id',
                'description',
                'rows',
                '5',
                'formControlName',
                'description',
                1,
                'form-control'
              ],
              ['type', 'file', 'accept', 'image/*', 3, 'change'],
              ['imageInput', ''],
              ['mat-raised-button', '', 'color', 'primary', 3, 'click'],
              [
                'style',
                'max-height: 100px;display:block;margin-top:10px',
                3,
                'src',
                4,
                'ngIf'
              ],
              ['for', 'main-pepper'],
              [
                'type',
                'text',
                'id',
                'main-pepper',
                'formControlName',
                'mainPepper',
                1,
                'form-control'
              ],
              ['for', 'heat'],
              [1, 'heat-container'],
              [
                'type',
                'range',
                'min',
                '1',
                'max',
                '10',
                'id',
                'heat',
                'formControlName',
                'heat',
                1,
                'custom-range',
                'heat-range'
              ],
              [
                'type',
                'number',
                'formControlName',
                'heatValue',
                1,
                'form-control',
                'heat-reading'
              ],
              [
                'mat-raised-button',
                '',
                'color',
                'primary',
                3,
                'disabled',
                'click'
              ],
              [
                2,
                'max-height',
                '100px',
                'display',
                'block',
                'margin-top',
                '10px',
                3,
                'src'
              ]
            ],
            template: function (t, r) {
              1 & t &&
                (oe(0, Q2, 1, 0, 'mat-spinner', 0),
                oe(1, Y2, 31, 3, 'form', 1)),
                2 & t && (j('ngIf', r.loading), z(1), j('ngIf', !r.loading))
            },
            directives: [$r, jo, Cu, du, gs, hs, cu, Go, Du, rp, np],
            styles: [
              'form[_ngcontent-%COMP%]{margin:2em auto;max-width:750px}.heat-range[_ngcontent-%COMP%]{width:60%;display:block}.heat-container[_ngcontent-%COMP%]{display:flex}.heat-reading[_ngcontent-%COMP%]{width:5em;margin-left:1.5em;background-color:#fff}input[type=file][_ngcontent-%COMP%]{display:none}'
            ]
          })),
          n
        )
      })()
      function X2 (n, e) {
        1 & n && le(0, 'mat-spinner')
      }
      const J2 = function (n, e, t) {
          return { 'fas liked': n, far: e, disabled: t }
        },
        ej = function (n, e, t) {
          return { 'fas disliked': n, far: e, disabled: t }
        }
      function tj (n, e) {
        if (1 & n) {
          const t = Sn()
          k(0, 'div', 13)(1, 'div', 14)(2, 'i', 15),
            Ce('click', function () {
              return xt(t), he(2).onLike()
            }),
            T(),
            k(3, 'span'),
            J(4),
            T()(),
            k(5, 'div', 16)(6, 'i', 17),
            Ce('click', function () {
              return xt(t), he(2).onDislike()
            }),
            T(),
            k(7, 'span'),
            J(8),
            T()()()
        }
        if (2 & n) {
          const t = he().ngIf,
            r = he()
          z(2),
            j('ngClass', Od(4, J2, r.liked, !r.liked, r.disliked)),
            z(2),
            zn(t.likes),
            z(2),
            j('ngClass', Od(8, ej, r.disliked, !r.disliked, r.liked)),
            z(2),
            zn(t.dislikes)
        }
      }
      function nj (n, e) {
        1 & n && (k(0, 'div', 18), le(1, 'mat-spinner', 19), T())
      }
      function rj (n, e) {
        if (1 & n) {
          const t = Sn()
          k(0, 'button', 20),
            Ce('click', function () {
              return xt(t), he(2).onModify()
            }),
            J(1, 'MODIFY'),
            T()
        }
      }
      function ij (n, e) {
        if (1 & n) {
          const t = Sn()
          k(0, 'button', 21),
            Ce('click', function () {
              return xt(t), he(2).onDelete()
            }),
            J(1, 'DELETE'),
            T()
        }
      }
      function sj (n, e) {
        if (1 & n) {
          const t = Sn()
          k(0, 'div', 2),
            le(1, 'img', 3),
            k(2, 'div', 4)(3, 'h1', 5),
            J(4),
            T(),
            k(5, 'p', 6),
            J(6),
            T(),
            k(7, 'h3'),
            J(8, 'Description'),
            T(),
            k(9, 'p'),
            J(10),
            T(),
            oe(11, tj, 9, 12, 'div', 7),
            oe(12, nj, 2, 0, 'div', 8),
            k(13, 'div', 9)(14, 'button', 10),
            Ce('click', function () {
              return xt(t), he().onBack()
            }),
            J(15, 'BACK'),
            T(),
            oe(16, rj, 2, 0, 'button', 11),
            oe(17, ij, 2, 0, 'button', 12),
            T()()()
        }
        if (2 & n) {
          const t = e.ngIf,
            r = he()
          z(1),
            j('src', null == t ? null : t.imageUrl, wi),
            z(3),
            zn(null == t ? null : t.name),
            z(2),
            Js('by ', null == t ? null : t.manufacturer, ''),
            z(4),
            zn(t.description),
            z(1),
            j('ngIf', !r.likePending),
            z(1),
            j('ngIf', r.likePending),
            z(4),
            j('ngIf', r.userId === t.userId),
            z(1),
            j('ngIf', r.userId === t.userId)
        }
      }
      let oj = (() => {
        class n {
          constructor (t, r, i, s) {
            ;(this.sauces = t),
              (this.route = r),
              (this.auth = i),
              (this.router = s)
          }
          ngOnInit () {
            ;(this.userId = this.auth.getUserId()),
              (this.loading = !0),
              (this.userId = this.auth.getUserId()),
              (this.sauce$ = this.route.params.pipe(
                ne(t => t.id),
                Nt(t => this.sauces.getSauceById(t)),
                ue(t => {
                  ;(this.loading = !1),
                    t.usersLiked.find(r => r === this.userId)
                      ? (this.liked = !0)
                      : t.usersDisliked.find(r => r === this.userId) &&
                        (this.disliked = !0)
                })
              ))
          }
          onLike () {
            this.disliked ||
              ((this.likePending = !0),
              this.sauce$
                .pipe(
                  Pn(1),
                  Nt(t =>
                    this.sauces.likeSauce(t._id, !this.liked).pipe(
                      ue(r => {
                        ;(this.likePending = !1), (this.liked = r)
                      }),
                      ne(r =>
                        Object.assign(Object.assign({}, t), {
                          likes: r ? t.likes + 1 : t.likes - 1
                        })
                      ),
                      ue(r => (this.sauce$ = V(r)))
                    )
                  )
                )
                .subscribe())
          }
          onDislike () {
            this.liked ||
              ((this.likePending = !0),
              this.sauce$
                .pipe(
                  Pn(1),
                  Nt(t =>
                    this.sauces.dislikeSauce(t._id, !this.disliked).pipe(
                      ue(r => {
                        ;(this.likePending = !1), (this.disliked = r)
                      }),
                      ne(r =>
                        Object.assign(Object.assign({}, t), {
                          dislikes: r ? t.dislikes + 1 : t.dislikes - 1
                        })
                      ),
                      ue(r => (this.sauce$ = V(r)))
                    )
                  )
                )
                .subscribe())
          }
          onBack () {
            this.router.navigate(['/sauces'])
          }
          onModify () {
            this.sauce$
              .pipe(
                Pn(1),
                ue(t => this.router.navigate(['/modify-sauce', t._id]))
              )
              .subscribe()
          }
          onDelete () {
            ;(this.loading = !0),
              this.sauce$
                .pipe(
                  Pn(1),
                  Nt(t => this.sauces.deleteSauce(t._id)),
                  ue(t => {
                    console.log(t),
                      (this.loading = !1),
                      this.router.navigate(['/sauces'])
                  }),
                  Ae(
                    t => (
                      (this.loading = !1),
                      (this.errorMessage = t.message),
                      console.error(t),
                      ft
                    )
                  )
                )
                .subscribe()
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(y(ih), y(yr), y(br), y(He))
          }),
          (n.ɵcmp = At({
            type: n,
            selectors: [['app-single-sauce']],
            decls: 3,
            vars: 4,
            consts: [
              [4, 'ngIf'],
              ['class', 'sauce-container', 4, 'ngIf'],
              [1, 'sauce-container'],
              ['alt', '', 3, 'src'],
              [1, 'sauce-info'],
              [1, 'sauce-name'],
              [1, 'manufacturer'],
              ['class', 'like-buttons', 4, 'ngIf'],
              ['class', 'like-pending', 4, 'ngIf'],
              [1, 'control-buttons'],
              ['mat-raised-button', '', 3, 'click'],
              [
                'mat-raised-button',
                '',
                'color',
                'primary',
                3,
                'click',
                4,
                'ngIf'
              ],
              ['mat-raised-button', '', 'color', 'warn', 3, 'click', 4, 'ngIf'],
              [1, 'like-buttons'],
              [1, 'likes'],
              [1, 'like', 'fa-thumbs-up', 'fa-lg', 3, 'ngClass', 'click'],
              [1, 'dislikes'],
              [1, 'dislike', 'fa-thumbs-down', 'fa-lg', 3, 'ngClass', 'click'],
              [1, 'like-pending'],
              [1, 'white-spinner'],
              ['mat-raised-button', '', 'color', 'primary', 3, 'click'],
              ['mat-raised-button', '', 'color', 'warn', 3, 'click']
            ],
            template: function (t, r) {
              1 & t &&
                (oe(0, X2, 1, 0, 'mat-spinner', 0),
                oe(1, sj, 18, 8, 'div', 1),
                Wn(2, 'async')),
                2 & t &&
                  (j('ngIf', r.loading), z(1), j('ngIf', Kn(2, 2, r.sauce$)))
            },
            directives: [$r, jo, Ob, Du],
            pipes: [ml],
            styles: [
              '.sauce-container[_ngcontent-%COMP%]{display:flex}.sauce-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-height:70vh;flex:1}.sauce-info[_ngcontent-%COMP%]{padding:40px 20px;flex:1}.manufacturer[_ngcontent-%COMP%], .sauce-name[_ngcontent-%COMP%]{margin:0}.like-buttons[_ngcontent-%COMP%]{display:flex}.like-buttons[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{margin-right:.5em;cursor:pointer}.likes[_ngcontent-%COMP%], .dislikes[_ngcontent-%COMP%]{margin:0 .4em}.liked[_ngcontent-%COMP%]{color:#33db00}.disliked[_ngcontent-%COMP%]{color:#db3300}.like[_ngcontent-%COMP%]:hover{color:#33db00}.dislike[_ngcontent-%COMP%]{transform:scaleX(-1) translateY(5px)}.dislike[_ngcontent-%COMP%]:hover{color:#db3300}.disabled[_ngcontent-%COMP%]{cursor:none;color:#bebebe}.disabled[_ngcontent-%COMP%]:hover{color:#bebebe}.control-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin:1em 1em 0 0}'
            ]
          })),
          n
        )
      })()
      function aj (n, e) {
        1 & n && le(0, 'mat-spinner')
      }
      function lj (n, e) {
        if ((1 & n && (k(0, 'p', 10), J(1), T()), 2 & n)) {
          const t = he(2)
          z(1), zn(t.errorMsg)
        }
      }
      function uj (n, e) {
        if (1 & n) {
          const t = Sn()
          k(0, 'form', 2)(1, 'div', 3)(2, 'label', 4),
            J(3, 'Email'),
            T(),
            le(4, 'input', 5),
            T(),
            k(5, 'div', 3)(6, 'label', 6),
            J(7, 'Password'),
            T(),
            le(8, 'input', 7),
            T(),
            k(9, 'button', 8),
            Ce('click', function () {
              return xt(t), he().onSignup()
            }),
            J(10, 'SIGN UP'),
            T(),
            oe(11, lj, 2, 1, 'p', 9),
            T()
        }
        if (2 & n) {
          const t = he()
          j('formGroup', t.signupForm),
            z(9),
            j('disabled', t.signupForm.invalid),
            z(2),
            j('ngIf', t.errorMsg)
        }
      }
      let cj = (() => {
        class n {
          constructor (t, r, i) {
            ;(this.formBuilder = t), (this.auth = r), (this.router = i)
          }
          ngOnInit () {
            this.signupForm = this.formBuilder.group({
              email: [null, [tt.required, tt.email]],
              password: [null, tt.required]
            })
          }
          onSignup () {
            this.loading = !0
            const t = this.signupForm.get('email').value,
              r = this.signupForm.get('password').value
            this.auth
              .createUser(t, r)
              .pipe(
                Nt(() => this.auth.loginUser(t, r)),
                ue(() => {
                  ;(this.loading = !1), this.router.navigate(['/sauces'])
                }),
                Ae(i => ((this.loading = !1), (this.errorMsg = i.message), ft))
              )
              .subscribe()
          }
        }
        return (
          (n.ɵfac = function (t) {
            return new (t || n)(y(cp), y(br), y(He))
          }),
          (n.ɵcmp = At({
            type: n,
            selectors: [['app-signup']],
            decls: 2,
            vars: 2,
            consts: [
              [4, 'ngIf'],
              [3, 'formGroup', 4, 'ngIf'],
              [3, 'formGroup'],
              [1, 'form-group'],
              ['for', 'email'],
              [
                'type',
                'email',
                'id',
                'email',
                'formControlName',
                'email',
                1,
                'form-control'
              ],
              ['for', 'password'],
              [
                'type',
                'password',
                'id',
                'password',
                'formControlName',
                'password',
                1,
                'form-control'
              ],
              [
                'mat-raised-button',
                '',
                'color',
                'primary',
                3,
                'disabled',
                'click'
              ],
              ['class', 'text-danger', 4, 'ngIf'],
              [1, 'text-danger']
            ],
            template: function (t, r) {
              1 & t &&
                (oe(0, aj, 1, 0, 'mat-spinner', 0),
                oe(1, uj, 12, 3, 'form', 1)),
                2 & t && (j('ngIf', r.loading), z(1), j('ngIf', !r.loading))
            },
            directives: [$r, jo, Cu, du, gs, hs, cu, Go, Du],
            styles: ['form[_ngcontent-%COMP%]{margin:2em auto;max-width:750px}']
          })),
          n
        )
      })()
      function dj (n, e) {
        1 & n && le(0, 'mat-spinner')
      }
      function fj (n, e) {
        if ((1 & n && (k(0, 'p', 10), J(1), T()), 2 & n)) {
          const t = he(2)
          z(1), zn(t.errorMsg)
        }
      }
      function hj (n, e) {
        if (1 & n) {
          const t = Sn()
          k(0, 'form', 2)(1, 'div', 3)(2, 'label', 4),
            J(3, 'Email'),
            T(),
            le(4, 'input', 5),
            T(),
            k(5, 'div', 3)(6, 'label', 6),
            J(7, 'Password'),
            T(),
            le(8, 'input', 7),
            T(),
            k(9, 'button', 8),
            Ce('click', function () {
              return xt(t), he().onLogin()
            }),
            J(10, 'LOGIN'),
            T(),
            oe(11, fj, 2, 1, 'p', 9),
            T()
        }
        if (2 & n) {
          const t = he()
          j('formGroup', t.loginForm),
            z(9),
            j('disabled', t.loginForm.invalid),
            z(2),
            j('ngIf', t.errorMsg)
        }
      }
      let pj = (() => {
          class n {
            constructor (t, r, i) {
              ;(this.formBuilder = t), (this.auth = r), (this.router = i)
            }
            ngOnInit () {
              this.loginForm = this.formBuilder.group({
                email: [null, [tt.required, tt.email]],
                password: [null, tt.required]
              })
            }
            onLogin () {
              this.loading = !0
              const t = this.loginForm.get('email').value,
                r = this.loginForm.get('password').value
              this.auth
                .loginUser(t, r)
                .pipe(
                  ue(() => {
                    ;(this.loading = !1), this.router.navigate(['/sauces'])
                  }),
                  Ae(
                    i => ((this.loading = !1), (this.errorMsg = i.message), ft)
                  )
                )
                .subscribe()
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(y(cp), y(br), y(He))
            }),
            (n.ɵcmp = At({
              type: n,
              selectors: [['app-login']],
              decls: 2,
              vars: 2,
              consts: [
                [4, 'ngIf'],
                [3, 'formGroup', 4, 'ngIf'],
                [3, 'formGroup'],
                [1, 'form-group'],
                ['for', 'email'],
                [
                  'type',
                  'email',
                  'id',
                  'email',
                  'formControlName',
                  'email',
                  1,
                  'form-control'
                ],
                ['for', 'password'],
                [
                  'type',
                  'password',
                  'id',
                  'password',
                  'formControlName',
                  'password',
                  1,
                  'form-control'
                ],
                [
                  'mat-raised-button',
                  '',
                  'color',
                  'primary',
                  3,
                  'disabled',
                  'click'
                ],
                ['class', 'text-danger', 4, 'ngIf'],
                [1, 'text-danger']
              ],
              template: function (t, r) {
                1 & t &&
                  (oe(0, dj, 1, 0, 'mat-spinner', 0),
                  oe(1, hj, 12, 3, 'form', 1)),
                  2 & t && (j('ngIf', r.loading), z(1), j('ngIf', !r.loading))
              },
              directives: [$r, jo, Cu, du, gs, hs, cu, Go, Du],
              styles: [
                'form[_ngcontent-%COMP%]{margin:2em auto;max-width:750px}'
              ]
            })),
            n
          )
        })(),
        qo = (() => {
          class n {
            constructor (t, r) {
              ;(this.auth = t), (this.router = r)
            }
            canActivate (t, r) {
              return this.auth.isAuth$.pipe(
                Pn(1),
                ue(i => {
                  i || this.router.navigate(['/login'])
                })
              )
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(C(br), C(He))
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          )
        })()
      const gj = [
        { path: 'signup', component: cj },
        { path: 'login', component: pj },
        { path: 'sauces', component: zB, canActivate: [qo] },
        { path: 'sauce/:id', component: oj, canActivate: [qo] },
        { path: 'new-sauce', component: Lw, canActivate: [qo] },
        { path: 'modify-sauce/:id', component: Lw, canActivate: [qo] },
        { path: '', pathMatch: 'full', redirectTo: 'sauces' },
        { path: '**', redirectTo: 'sauces' }
      ]
      let mj = (() => {
        class n {}
        return (
          (n.ɵfac = function (t) {
            return new (t || n)()
          }),
          (n.ɵmod = Ye({ type: n })),
          (n.ɵinj = ze({ providers: [qo], imports: [[cD.forRoot(gj)], cD] })),
          n
        )
      })()
      class yj extends Ct {
        constructor (e = 1 / 0, t = 1 / 0, r = Ph) {
          super(),
            (this._bufferSize = e),
            (this._windowTime = t),
            (this._timestampProvider = r),
            (this._buffer = []),
            (this._infiniteTimeWindow = !0),
            (this._infiniteTimeWindow = t === 1 / 0),
            (this._bufferSize = Math.max(1, e)),
            (this._windowTime = Math.max(1, t))
        }
        next (e) {
          const {
            isStopped: t,
            _buffer: r,
            _infiniteTimeWindow: i,
            _timestampProvider: s,
            _windowTime: o
          } = this
          t || (r.push(e), !i && r.push(s.now() + o)),
            this._trimBuffer(),
            super.next(e)
        }
        _subscribe (e) {
          this._throwIfClosed(), this._trimBuffer()
          const t = this._innerSubscribe(e),
            { _infiniteTimeWindow: r, _buffer: i } = this,
            s = i.slice()
          for (let o = 0; o < s.length && !e.closed; o += r ? 1 : 2)
            e.next(s[o])
          return this._checkFinalizedStatuses(e), t
        }
        _trimBuffer () {
          const {
              _bufferSize: e,
              _timestampProvider: t,
              _buffer: r,
              _infiniteTimeWindow: i
            } = this,
            s = (i ? 1 : 2) * e
          if ((e < 1 / 0 && s < r.length && r.splice(0, r.length - s), !i)) {
            const o = t.now()
            let a = 0
            for (let l = 1; l < r.length && r[l] <= o; l += 2) a = l
            a && r.splice(0, a + 1)
          }
        }
      }
      function vj (n, e) {
        1 & n && (k(0, 'a', 11), J(1, ' ALL SAUCES '), T())
      }
      function bj (n, e) {
        1 & n && (k(0, 'a', 12), J(1, ' ADD SAUCE '), T())
      }
      function Cj (n, e) {
        1 & n && (k(0, 'a', 13), J(1, ' SIGN UP '), T())
      }
      function Dj (n, e) {
        1 & n && (k(0, 'a', 14), J(1, ' LOGIN '), T())
      }
      function Ej (n, e) {
        if (1 & n) {
          const t = Sn()
          k(0, 'a', 15),
            Ce('click', function () {
              return xt(t), he().onLogout()
            }),
            J(1, ' LOGOUT '),
            T()
        }
      }
      let wj = (() => {
          class n {
            constructor (t) {
              this.auth = t
            }
            ngOnInit () {
              this.isAuth$ = this.auth.isAuth$.pipe(
                (function _j (n, e, t) {
                  var r, i
                  let s,
                    o = !1
                  return (
                    n && 'object' == typeof n
                      ? ((s =
                          null !== (r = n.bufferSize) && void 0 !== r
                            ? r
                            : 1 / 0),
                        (e =
                          null !== (i = n.windowTime) && void 0 !== i
                            ? i
                            : 1 / 0),
                        (o = !!n.refCount),
                        (t = n.scheduler))
                      : (s = null != n ? n : 1 / 0),
                    Vp({
                      connector: () => new yj(s, e, t),
                      resetOnError: !0,
                      resetOnComplete: !1,
                      resetOnRefCountZero: o
                    })
                  )
                })(1)
              )
            }
            onLogout () {
              this.auth.logout()
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(y(br))
            }),
            (n.ɵcmp = At({
              type: n,
              selectors: [['app-header']],
              decls: 28,
              vars: 15,
              consts: [
                [1, 'left-nav'],
                [
                  'routerLink',
                  'sauces',
                  'routerLinkActive',
                  'active',
                  4,
                  'ngIf'
                ],
                [
                  'routerLink',
                  'new-sauce',
                  'routerLinkActive',
                  'active',
                  4,
                  'ngIf'
                ],
                [1, 'logo'],
                [1, 'logo-image'],
                ['alt', 'Flame logo', 'src', '../../assets/images/flame.png'],
                [1, 'logo-text'],
                [1, 'right-nav'],
                [
                  'routerLink',
                  'signup',
                  'routerLinkActive',
                  'active',
                  4,
                  'ngIf'
                ],
                [
                  'routerLink',
                  'login',
                  'routerLinkActive',
                  'active',
                  4,
                  'ngIf'
                ],
                [3, 'click', 4, 'ngIf'],
                ['routerLink', 'sauces', 'routerLinkActive', 'active'],
                ['routerLink', 'new-sauce', 'routerLinkActive', 'active'],
                ['routerLink', 'signup', 'routerLinkActive', 'active'],
                ['routerLink', 'login', 'routerLinkActive', 'active'],
                [3, 'click']
              ],
              template: function (t, r) {
                1 & t &&
                  (k(0, 'nav')(1, 'div', 0)(2, 'ul')(3, 'li'),
                  oe(4, vj, 2, 0, 'a', 1),
                  Wn(5, 'async'),
                  T(),
                  k(6, 'li'),
                  oe(7, bj, 2, 0, 'a', 2),
                  Wn(8, 'async'),
                  T()()(),
                  k(9, 'div', 3)(10, 'div', 4),
                  le(11, 'img', 5),
                  T(),
                  k(12, 'div', 6)(13, 'h1'),
                  J(14, ' HOT TAKES '),
                  T(),
                  k(15, 'h5'),
                  J(16, " THE WEB'S BEST HOT SAUCE REVIEWS "),
                  T()()(),
                  k(17, 'div', 7)(18, 'ul')(19, 'li'),
                  oe(20, Cj, 2, 0, 'a', 8),
                  Wn(21, 'async'),
                  T(),
                  k(22, 'li'),
                  oe(23, Dj, 2, 0, 'a', 9),
                  Wn(24, 'async'),
                  T(),
                  k(25, 'li'),
                  oe(26, Ej, 2, 0, 'a', 10),
                  Wn(27, 'async'),
                  T()()()()),
                  2 & t &&
                    (z(4),
                    j('ngIf', Kn(5, 5, r.isAuth$)),
                    z(3),
                    j('ngIf', Kn(8, 7, r.isAuth$)),
                    z(13),
                    j('ngIf', !Kn(21, 9, r.isAuth$)),
                    z(3),
                    j('ngIf', !Kn(24, 11, r.isAuth$)),
                    z(3),
                    j('ngIf', Kn(27, 13, r.isAuth$)))
              },
              directives: [$r, Vl, sD],
              pipes: [ml],
              styles: [
                'nav[_ngcontent-%COMP%]{box-sizing:border-box;width:100%;max-width:1400px;margin:auto;position:relative;top:0;left:0;display:flex;padding:20px;justify-content:space-between;border-bottom:thin solid black}h1[_ngcontent-%COMP%]{font-weight:700;font-size:2.4em;margin:0}h5[_ngcontent-%COMP%]{font-size:1.2em;font-weight:400;margin:0}.logo[_ngcontent-%COMP%]{display:flex;align-items:center}.logo-text[_ngcontent-%COMP%]{text-align:center}.logo-image[_ngcontent-%COMP%]{margin-right:1em}.logo-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:4.5em}.left-nav[_ngcontent-%COMP%], .right-nav[_ngcontent-%COMP%]{align-self:center;width:30%}.right-nav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{justify-content:flex-end}ul[_ngcontent-%COMP%]{list-style:none;padding:0;margin:0;display:flex}li[_ngcontent-%COMP%]{margin:0 15px}a[_ngcontent-%COMP%]{color:#000;font-weight:400;text-decoration:none;cursor:pointer}a[_ngcontent-%COMP%]:hover{text-decoration:underline}.active[_ngcontent-%COMP%]{font-weight:700;text-decoration:underline}'
              ]
            })),
            n
          )
        })(),
        Sj = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)()
            }),
            (n.ɵcmp = At({
              type: n,
              selectors: [['app-root']],
              decls: 3,
              vars: 0,
              consts: [[1, 'container']],
              template: function (t, r) {
                1 & t &&
                  (le(0, 'app-header'),
                  k(1, 'div', 0),
                  le(2, 'router-outlet'),
                  T())
              },
              directives: [wj, Hf],
              styles: [
                '.container[_ngcontent-%COMP%]{position:relative;width:100%;max-width:1000px;margin:auto}'
              ]
            })),
            n
          )
        })(),
        Mj = (() => {
          class n {
            constructor (t) {
              this.auth = t
            }
            intercept (t, r) {
              const i = this.auth.getToken(),
                s = t.clone({
                  headers: t.headers.set('Authorization', 'Bearer ' + i)
                })
              return r.handle(s)
            }
          }
          return (
            (n.ɵfac = function (t) {
              return new (t || n)(C(br))
            }),
            (n.ɵprov = R({ token: n, factory: n.ɵfac })),
            n
          )
        })(),
        Aj = (() => {
          class n {}
          return (
            (n.ɵfac = function (t) {
              return new (t || n)()
            }),
            (n.ɵmod = Ye({ type: n, bootstrap: [Sj] })),
            (n.ɵinj = ze({
              providers: [{ provide: eh, useClass: Mj, multi: !0 }],
              imports: [[eC, mj, AP, Pw, XV, LB, K2]]
            })),
            n
          )
        })()
      ;(function v1 () {
        lb = !1
      })(),
        LO()
          .bootstrapModule(Aj)
          .catch(n => console.error(n))
    }
  },
  ge => {
    ge((ge.s = 154))
  }
])
