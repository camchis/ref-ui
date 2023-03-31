(self.webpackChunktradingview = self.webpackChunktradingview || []).push([
  [5009],
  {
    69040: (e) => {
      e.exports = {
        highlight: 'highlight-1aROqc2m',
        active: 'active-1aROqc2m',
      };
    },
    83963: (e) => {
      e.exports = {
        dialog: 'dialog-1xjtlTJV',
        contentList: 'contentList-1xjtlTJV',
      };
    },
    2789: (e) => {
      e.exports = {
        container: 'container-1NQ91aze',
        list: 'list-1NQ91aze',
        overlayScrollWrap: 'overlayScrollWrap-1NQ91aze',
        scroll: 'scroll-1NQ91aze',
      };
    },
    41350: (e) => {
      e.exports = { container: 'container-30_lleAw', title: 'title-30_lleAw' };
    },
    6960: (e) => {
      e.exports = {
        container: 'container-3n5_2-hI',
        inputContainer: 'inputContainer-3n5_2-hI',
        withCancel: 'withCancel-3n5_2-hI',
        input: 'input-3n5_2-hI',
        icon: 'icon-3n5_2-hI',
        cancel: 'cancel-3n5_2-hI',
      };
    },
    48325: (e) => {
      e.exports = {
        container: 'container-xPtOXn4t',
        labelWrap: 'labelWrap-xPtOXn4t',
        icon: 'icon-xPtOXn4t',
        text: 'text-xPtOXn4t',
      };
    },
    18342: (e) => {
      e.exports = { sortButton: 'sortButton-Srpxcu6T', icon: 'icon-Srpxcu6T' };
    },
    75695: (e) => {
      e.exports = { highlighted: 'highlighted-1Qud56dI' };
    },
    19330: (e, t, o) => {
      'use strict';
      o.d(t, {
        VerticalAttachEdge: () => n,
        HorizontalAttachEdge: () => r,
        VerticalDropDirection: () => i,
        HorizontalDropDirection: () => a,
        getPopupPositioner: () => s,
      });
      var n,
        r,
        i,
        a,
        l = o(16282);
      !(function (e) {
        (e[(e.Top = 0)] = 'Top'), (e[(e.Bottom = 1)] = 'Bottom');
      })(n || (n = {})),
        (function (e) {
          (e[(e.Left = 0)] = 'Left'), (e[(e.Right = 1)] = 'Right');
        })(r || (r = {})),
        (function (e) {
          (e[(e.FromTopToBottom = 0)] = 'FromTopToBottom'),
            (e[(e.FromBottomToTop = 1)] = 'FromBottomToTop');
        })(i || (i = {})),
        (function (e) {
          (e[(e.FromLeftToRight = 0)] = 'FromLeftToRight'),
            (e[(e.FromRightToLeft = 1)] = 'FromRightToLeft');
        })(a || (a = {}));
      const c = {
        verticalAttachEdge: n.Bottom,
        horizontalAttachEdge: r.Left,
        verticalDropDirection: i.FromTopToBottom,
        horizontalDropDirection: a.FromLeftToRight,
        verticalMargin: 0,
        horizontalMargin: 0,
        matchButtonAndListboxWidths: !1,
      };
      function s(e, t) {
        return (o, s) => {
          const d = (0, l.ensureNotNull)(e).getBoundingClientRect(),
            {
              verticalAttachEdge: u = c.verticalAttachEdge,
              verticalDropDirection: m = c.verticalDropDirection,
              horizontalAttachEdge: h = c.horizontalAttachEdge,
              horizontalDropDirection: g = c.horizontalDropDirection,
              horizontalMargin: f = c.horizontalMargin,
              verticalMargin: p = c.verticalMargin,
              matchButtonAndListboxWidths: v = c.matchButtonAndListboxWidths,
            } = t,
            y = u === n.Top ? -1 * p : p,
            x = h === r.Right ? d.right : d.left,
            S = u === n.Top ? d.top : d.bottom,
            C = {
              x: x - (g === a.FromRightToLeft ? o : 0) + f,
              y: S - (m === i.FromBottomToTop ? s : 0) + y,
            };
          return v && (C.overrideWidth = d.width), C;
        };
      }
    },
    59879: (e, t, o) => {
      'use strict';
      o.r(t), o.d(t, { LoadChartDialogRenderer: () => re });
      var n = o(67294),
        r = o(73935),
        i = o(16282),
        a = o(79881),
        l = o(64222),
        c = o(43367),
        s = o(93590),
        d = o(94184),
        u = o.n(d),
        m = o(76420),
        h = o(19330),
        g = o(49775),
        f = o(33512),
        p = o(86879),
        v = o(18342);
      function y(e) {
        const { sortDirection: t, children: o, ...r } = e,
          i = (0, n.useRef)(null),
          [a, l] = (0, n.useState)(!1);
        return n.createElement(
          'div',
          {
            ...r,
            ref: i,
            className: d(
              v.sortButton,
              'apply-common-tooltip',
              'common-tooltip-vertical'
            ),
            onClick: function () {
              l(!a);
            },
          },
          n.createElement(g.Icon, { className: v.icon, icon: 0 === t ? f : p }),
          n.createElement(
            m.PopupMenu,
            {
              doNotCloseOn: i.current,
              isOpened: a,
              onClose: () => {
                l(!1);
              },
              position: (0, h.getPopupPositioner)(i.current, {
                verticalMargin: -35,
                verticalAttachEdge: 0,
              }),
            },
            o
          )
        );
      }
      var x = o(95860),
        S = o(48325);
      function C(e) {
        const {
            label: t,
            listSortField: o,
            itemSortField: r,
            listSortDirection: i,
            itemSortDirection: a,
            onClick: l,
            className: c,
            ...s
          } = e,
          u = r === o && a === i;
        return n.createElement(x.PopupMenuItem, {
          ...s,
          className: d(S.container, c),
          label: n.createElement(
            'div',
            { className: S.labelWrap },
            n.createElement(g.Icon, {
              className: S.icon,
              icon: 0 === a ? f : p,
            }),
            n.createElement('span', { className: S.text }, t)
          ),
          isActive: u,
          onClick: function () {
            l(r, a);
          },
          'data-active': u.toString(),
          'data-sort-field': r,
          'data-sort-direction': 0 === a ? 'asc' : 'desc',
        });
      }
      var E = o(40834),
        D = o(41350);
      function w(e) {
        const { children: t, className: o } = e;
        return n.createElement('div', { className: u()(D.container, o) }, t);
      }
      function F(e) {
        const { title: t } = e;
        return n.createElement('div', { className: D.title }, t);
      }
      var b = o(75496);
      var N = o(33093),
        T = o(5383),
        I = o.n(T),
        R = o(76553),
        k = o(88098),
        M = o(77400);
      var L = o(27947),
        z = o(2789);
      function P(e) {
        const {
            className: t,
            onScroll: o,
            onTouchStart: r,
            reference: i,
            children: a,
            scrollbar: l,
            ...s
          } = e,
          [d, m] = (0, k.useDimensions)(),
          [h, g, f, p] = (0, M.useOverlayScroll)();
        return (
          (0, n.useEffect)(() => {
            const e = () => {};
            return c.isFF
              ? (document.addEventListener('wheel', () => e),
                () => {
                  document.removeEventListener('wheel', e);
                })
              : e;
          }, []),
          n.createElement(
            I(),
            { onMeasure: d },
            n.createElement(
              'div',
              {
                ...('overlay' === l && g),
                className: u()(z.container, t),
                onTouchStart: r,
                onScrollCapture: o,
              },
              'overlay' === l &&
                n.createElement(L.OverlayScrollContainer, {
                  ...h,
                  className: z.overlayScrollWrap,
                }),
              n.createElement(N.FixedSizeList, {
                ref: i,
                className: u()('native' === l ? z.scroll : z.list),
                outerRef: 'overlay' === l ? f : void 0,
                onItemsRendered: p,
                layout: 'vertical',
                width: '100%',
                height: (null == m ? void 0 : m.height) || 0,
                children: a,
                direction: (0, R.isRtl)() ? 'rtl' : 'ltr',
                ...s,
              })
            )
          )
        );
      }
      var A = o(22900);
      var B = o(62638),
        O = o(1467),
        W = o(78106),
        _ = o(87614);
      var H = o(54041),
        K = o(18675),
        V = o(11945),
        q = o(65802),
        $ = o(69040);
      const j = (0, a.t)(
        "Do you really want to delete Chart Layout '{name}' ?"
      );
      const Q = new H.DateFormatter('dd-MM-yyyy'),
        J = new K.TimeFormatter('%h:%m');
      function X(e) {
        const {
            chart: t,
            chartWidgetCollection: o,
            trackEvent: r,
            localFavorites: i,
            onClose: a,
            searchString: l,
            onClickRemove: c,
            onRemoveCanceled: s,
            isSelected: d,
          } = e,
          [m, h] = (0, n.useState)(() => t.active()),
          g = t.url
            ? (function (e) {
                const t = e.chartId ? `/chart/${e.chartId}/` : '/chart/',
                  o = new URL(t, location.href);
                return (
                  e.symbol && o.searchParams.append('symbol', e.symbol),
                  e.interval && o.searchParams.append('interval', e.interval),
                  e.style && o.searchParams.append('style', e.style),
                  (0, A.urlWithMobileAppParams)(o.href)
                );
              })({ chartId: t.url })
            : void 0,
          f = (0, n.useContext)(W.SlotContext),
          p = (0, n.useMemo)(() => new Date(1e3 * t.modified), [t]),
          v = (0, n.useMemo)(() => (0, q.createRegExpList)(l), [l]),
          y = u()($.highlight, m && $.active);
        return (
          (0, n.useEffect)(
            () => (
              o && o.metaInfo.id.subscribe(S),
              () => {
                o && o.metaInfo.id.unsubscribe(S);
              }
            ),
            []
          ),
          n.createElement(B.DialogContentItem, {
            url: g,
            title: n.createElement(V.HighlightedText, {
              className: y,
              queryString: l,
              rules: v,
              text: t.title,
            }),
            subtitle: n.createElement(
              n.Fragment,
              null,
              n.createElement(V.HighlightedText, {
                className: y,
                queryString: l,
                rules: v,
                text: t.description,
              }),
              ' ',
              '(',
              Q.format(p).replace(/-/g, '.'),
              ' ',
              J.formatLocal(p),
              ')'
            ),
            onClick: function (e) {
              0;
              t.openAction(), !1;
            },
            onClickFavorite: function () {
              0;
              const e = { ...i };
              e[t.id] ? delete e[t.id] : (e[t.id] = !0);
              t.favoriteAction(e);
            },
            onClickRemove: function () {
              !(function (e, t, o, n) {
                (0, _.showConfirm)(
                  {
                    text: e,
                    onConfirm: ({ dialogClose: e }) => {
                      t(), e();
                    },
                    onClose: () => {
                      o();
                    },
                  },
                  n
                );
              })(j.format({ name: t.title }), x, s, f);
            },
            isFavorite: Boolean(i[t.id]),
            isActive: m,
            isSelected: d,
            'data-name': 'load-chart-dialog-item',
          })
        );
        function x() {
          t.deleteAction().then(() => c(t.id));
        }
        function S(e) {
          h(t.id === e);
        }
      }
      var Z = o(79424),
        U = o(42998);
      var G = o(83963);
      const Y = { sortField: 'modified', sortDirection: 1 },
        ee = (function (e) {
          const { paddingTop: t = 0, paddingBottom: o = 0 } = e;
          return (0, n.forwardRef)(({ style: e, ...r }, i) => {
            const { height: a = 0 } = e;
            return n.createElement('div', {
              ref: i,
              style: {
                ...e,
                height: ((0, b.isNumber)(a) ? a : parseFloat(a)) + t + o + 'px',
              },
              ...r,
            });
          });
        })({ paddingBottom: 6 });
      function te(e) {
        let t;
        try {
          t = (0, O.getTranslatedResolution)(e);
        } catch (o) {
          t = e;
        }
        return t;
      }
      function oe(e) {
        const {
            charts: t,
            onClose: o,
            favoriteChartsService: r,
            chartWidgetCollection: d,
          } = e,
          [u, m] = (0, n.useState)(''),
          [h, g] = (0, n.useState)(u),
          [f, p] = (0, n.useState)([]),
          v = (0, n.useRef)(null),
          [x, S] = (0, n.useState)(() => r.get()),
          [D, b] = (0, n.useState)(() =>
            l.getJSON('loadChartDialog.viewState', Y)
          ),
          N = (0, n.useRef)(null),
          T = (0, n.useRef)(null),
          I = (0, n.useMemo)(
            () =>
              t.map((e) => ({
                ...e,
                description: `${e.symbol}, ${te(e.interval)}`,
              })),
            [t]
          );
        (0, n.useEffect)(() => {
          c.CheckMobile.any() || (0, i.ensureNotNull)(N.current).focus();
        }, []);
        const R = (0, n.useRef)();
        (0, n.useEffect)(
          () => (
            (R.current = setTimeout(() => {
              m(h);
            }, 300)),
            () => {
              clearTimeout(R.current);
            }
          ),
          [h]
        ),
          (0, n.useEffect)(
            () => (
              r.getOnChange().subscribe(null, H),
              () => {
                r.getOnChange().unsubscribe(null, H);
              }
            ),
            []
          );
        const k = (0, n.useCallback)(() => !0, []),
          M = (0, n.useMemo)(() => {
            return (0, q.rankedSearch)({
              data: I.filter((e) => !f.includes(e.id)).sort(
                ((e = D.sortDirection),
                (t, o) => {
                  if (x[t.id] && !x[o.id]) return -1;
                  if (!x[t.id] && x[o.id]) return 1;
                  const n = 0 === e ? 1 : -1;
                  return 'modified' === D.sortField
                    ? n * (t.modified - o.modified)
                    : n * t.title.localeCompare(o.title);
                })
              ),
              rules: (0, q.createRegExpList)(u),
              queryString: u,
              primaryKey: 'title',
              secondaryKey: 'description',
            });
            var e;
          }, [u, D, f, x]),
          {
            selectedItemIndex: L,
            setSelectedItemIndex: z,
            handleKeyboardSelection: A,
          } = (function (e, t, o) {
            const [r, i] = (0, n.useState)(-1);
            return (
              (0, n.useEffect)(() => {
                var e;
                -1 !== r &&
                  (null === (e = o.current) ||
                    void 0 === e ||
                    e.scrollToItem(r));
              }, [r]),
              {
                selectedItemIndex: r,
                setSelectedItemIndex: i,
                handleKeyboardSelection: function (o) {
                  switch ((0, U.hashFromEvent)(o)) {
                    case 40:
                      if (r === e - 1) return;
                      i(r + 1);
                      break;
                    case 38:
                      if (0 === r) return;
                      if (-1 === r) return void i(r + 1);
                      i(r - 1);
                      break;
                    case 13:
                      t(o);
                  }
                },
              }
            );
          })(
            M.length,
            function (e) {
              const t = M[L];
              if (-1 === L || !t) return;
              0;
              t.openAction(), !1;
            },
            T
          );
        return n.createElement(s.AdaptivePopupDialog, {
          ref: v,
          onClose: o,
          onClickOutside: o,
          onKeyDown: A,
          isOpened: !0,
          className: G.dialog,
          title: (0, a.t)('Load layout'),
          dataName: 'load-layout-dialog',
          render: function () {
            return n.createElement(
              n.Fragment,
              null,
              n.createElement(E.DialogSearch, {
                reference: N,
                onChange: O,
                placeholder: (0, a.t)('Search'),
              }),
              n.createElement(
                w,
                null,
                n.createElement(F, { title: (0, a.t)('Layout name') }),
                n.createElement(
                  y,
                  {
                    sortDirection: D.sortDirection,
                    title: (0, a.t)('Sort by layout name, date changed'),
                    'data-name': 'load-chart-dialog-sort-button',
                  },
                  n.createElement(C, {
                    label: (0, a.t)('Layout name (A to Z)'),
                    listSortField: D.sortField,
                    itemSortField: 'title',
                    listSortDirection: D.sortDirection,
                    itemSortDirection: 0,
                    onClick: V,
                    'data-name': 'load-chart-dialog-sort-menu-item',
                  }),
                  n.createElement(C, {
                    label: (0, a.t)('Layout name (Z to A)'),
                    listSortField: D.sortField,
                    itemSortField: 'title',
                    listSortDirection: D.sortDirection,
                    itemSortDirection: 1,
                    onClick: V,
                    'data-name': 'load-chart-dialog-sort-menu-item',
                  }),
                  n.createElement(C, {
                    label: (0, a.t)('Date modified (oldest first)'),
                    listSortField: D.sortField,
                    itemSortField: 'modified',
                    listSortDirection: D.sortDirection,
                    itemSortDirection: 0,
                    onClick: V,
                    'data-name': 'load-chart-dialog-sort-menu-item',
                  }),
                  n.createElement(C, {
                    label: (0, a.t)('Date modified (newest first)'),
                    listSortField: D.sortField,
                    itemSortField: 'modified',
                    listSortDirection: D.sortDirection,
                    itemSortDirection: 1,
                    onClick: V,
                    'data-name': 'load-chart-dialog-sort-menu-item',
                  })
                )
              ),
              n.createElement(P, {
                scrollbar: 'native',
                reference: T,
                itemCount: M.length,
                itemSize: 52,
                className: G.contentList,
                onScroll: B,
                innerElementType: ee,
                itemKey: (e) => (x[M[e].id] ? 'f_' : '') + M[e].id,
                children: ({ style: e, index: t }) =>
                  n.createElement(
                    'div',
                    { style: e },
                    n.createElement(X, {
                      chart: M[t],
                      onClose: o,
                      chartWidgetCollection: d,
                      trackEvent: W,
                      onRemoveCanceled: K,
                      localFavorites: x,
                      searchString: u,
                      onClickRemove: _,
                      isSelected: t === L,
                    })
                  ),
              })
            );
          },
          forceCloseOnEsc: k,
        });
        function B() {
          Z.globalCloseDelegate.fire();
        }
        function O(e) {
          const t = e.currentTarget.value;
          g(t), z(-1);
        }
        function W(e) {
          0;
        }
        function _(e) {
          p([e, ...f]);
        }
        function H(e) {
          S(e);
        }
        function K() {
          (0, i.ensureNotNull)(v.current).focus();
        }
        function V(e, t) {
          const o = { sortField: e, sortDirection: t };
          b(o),
            l.setValue('loadChartDialog.viewState', JSON.stringify(o), {
              forceFlush: !0,
            }),
            W();
        }
      }
      var ne = o(58738);
      class re extends ne.DialogRenderer {
        constructor(e) {
          super(), (this._options = e);
        }
        show() {
          r.render(
            n.createElement(oe, {
              ...this._options,
              onClose: () => this.hide(),
            }),
            this._container
          ),
            this._setVisibility(!0);
        }
        hide() {
          r.unmountComponentAtNode(this._container), this._setVisibility(!1);
        }
      }
    },
    40834: (e, t, o) => {
      'use strict';
      o.d(t, { DialogSearch: () => d });
      var n = o(67294),
        r = o(94184),
        i = o.n(r),
        a = o(79881),
        l = o(49775),
        c = o(2796),
        s = o(6960);
      function d(e) {
        const { children: t, renderInput: o, onCancel: r, ...d } = e;
        return n.createElement(
          'div',
          { className: s.container },
          n.createElement(
            'div',
            { className: i()(s.inputContainer, r && s.withCancel) },
            o || n.createElement(u, { ...d })
          ),
          t,
          n.createElement(l.Icon, { className: s.icon, icon: c }),
          r &&
            n.createElement(
              'div',
              { className: s.cancel, onClick: r },
              (0, a.t)('Cancel')
            )
        );
      }
      function u(e) {
        const {
          className: t,
          reference: o,
          value: r,
          onChange: a,
          onFocus: l,
          onBlur: c,
          onKeyDown: d,
          onSelect: u,
          placeholder: m,
          ...h
        } = e;
        return n.createElement('input', {
          ...h,
          ref: o,
          type: 'text',
          className: i()(t, s.input),
          autoComplete: 'off',
          'data-role': 'search',
          placeholder: m,
          value: r,
          onChange: a,
          onFocus: l,
          onBlur: c,
          onSelect: u,
          onKeyDown: d,
        });
      }
    },
    65802: (e, t, o) => {
      'use strict';
      o.d(t, {
        rankedSearch: () => r,
        createRegExpList: () => i,
        getHighlightedChars: () => a,
      });
      var n = o(47903);
      function r(e) {
        const {
          data: t,
          rules: o,
          queryString: r,
          isPreventedFromFiltering: i,
          primaryKey: a,
          secondaryKey: l = a,
          optionalPrimaryKey: c,
        } = e;
        return t
          .map((e) => {
            const t = c && e[c] ? e[c] : e[a],
              i = e[l];
            let s,
              d = 0;
            return (
              o.forEach((e) => {
                var o, a, l, c;
                const { re: u, fullMatch: m } = e;
                return (
                  (u.lastIndex = 0),
                  t && t.toLowerCase() === r.toLowerCase()
                    ? ((d = 3),
                      void (s =
                        null === (o = t.match(m)) || void 0 === o
                          ? void 0
                          : o.index))
                    : (0, n.isString)(t) && m.test(t)
                    ? ((d = 2),
                      void (s =
                        null === (a = t.match(m)) || void 0 === a
                          ? void 0
                          : a.index))
                    : (0, n.isString)(i) && m.test(i)
                    ? ((d = 1),
                      void (s =
                        null === (l = i.match(m)) || void 0 === l
                          ? void 0
                          : l.index))
                    : void (
                        (0, n.isString)(i) &&
                        u.test(i) &&
                        ((d = 1),
                        (s =
                          null === (c = i.match(u)) || void 0 === c
                            ? void 0
                            : c.index))
                      )
                );
              }),
              { matchPriority: d, matchIndex: s, item: e }
            );
          })
          .filter((e) => i || e.matchPriority)
          .sort((e, t) => {
            if (e.matchPriority < t.matchPriority) return 1;
            if (e.matchPriority > t.matchPriority) return -1;
            if (e.matchPriority === t.matchPriority) {
              if (void 0 === e.matchIndex || void 0 === t.matchIndex) return 0;
              if (e.matchIndex > t.matchIndex) return 1;
              if (e.matchIndex < t.matchIndex) return -1;
            }
            return 0;
          })
          .map(({ item: e }) => e);
      }
      function i(e, t) {
        const o = [],
          n = e.toLowerCase(),
          r =
            e
              .split('')
              .map((e, t) => `(${0 !== t ? '[/\\s-]' + l(e) : l(e)})`)
              .join('(.*?)') + '(.*)';
        return (
          o.push({
            fullMatch: new RegExp(`(${l(e)})`, 'i'),
            re: new RegExp('^' + r, 'i'),
            reserveRe: new RegExp(r, 'i'),
            fuzzyHighlight: !0,
          }),
          t &&
            t.hasOwnProperty(n) &&
            o.push({ fullMatch: t[n], re: t[n], fuzzyHighlight: !1 }),
          o
        );
      }
      function a(e, t, o) {
        const n = [];
        return e && o
          ? (o.forEach((e) => {
              const { fullMatch: o, re: r, reserveRe: i } = e;
              (o.lastIndex = 0), (r.lastIndex = 0);
              const a = o.exec(t),
                l = a || r.exec(t) || (i && i.exec(t));
              if (((e.fuzzyHighlight = !a), l))
                if (e.fuzzyHighlight) {
                  let e = l.index;
                  for (let t = 1; t < l.length; t++) {
                    const o = l[t],
                      r = l[t].length;
                    if (t % 2) {
                      const t =
                        o.startsWith(' ') ||
                        o.startsWith('/') ||
                        o.startsWith('-');
                      n[t ? e + 1 : e] = !0;
                    }
                    e += r;
                  }
                } else
                  for (let e = 0; e < l[0].length; e++) n[l.index + e] = !0;
            }),
            n)
          : n;
      }
      function l(e) {
        return e.replace(/[!-/[-^{-}]/g, '\\$&');
      }
    },
    11945: (e, t, o) => {
      'use strict';
      o.d(t, { HighlightedText: () => l });
      var n = o(67294),
        r = o(94184),
        i = o(65802),
        a = o(75695);
      function l(e) {
        const { queryString: t, rules: o, text: l, className: c } = e,
          s = (0, n.useMemo)(
            () => (0, i.getHighlightedChars)(t, l, o),
            [t, o, l]
          );
        return n.createElement(
          n.Fragment,
          null,
          s.length
            ? l
                .split('')
                .map((e, t) =>
                  n.createElement(
                    n.Fragment,
                    { key: t },
                    s[t]
                      ? n.createElement(
                          'span',
                          { className: r(a.highlighted, c) },
                          e
                        )
                      : n.createElement('span', null, e)
                  )
                )
            : l
        );
      }
    },
    86879: (e) => {
      e.exports =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28" fill="none"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M19.5 18.5h-3M21.5 13.5h-5M23.5 8.5h-7M8.5 7v13.5M4.5 16.5l4 4 4-4"/></svg>';
    },
    33512: (e) => {
      e.exports =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28" fill="none"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M19.5 18.5h-3M21.5 13.5h-5M23.5 8.5h-7M8.5 20.5V7M12.5 11l-4-4-4 4"/></svg>';
    },
    2796: (e) => {
      e.exports =
        '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none"><path stroke="currentColor" d="M12.4 12.5a7 7 0 1 0-4.9 2 7 7 0 0 0 4.9-2zm0 0l5.101 5"/></svg>';
    },
  },
]);
