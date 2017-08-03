/*
 Highcharts JS v5.0.14 (2017-07-28)

 (c) 2009-2017 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(h) {
    "object" === typeof module && module.exports ? module.exports = h : h(Highcharts)
})(function(h) {
    (function(f) {
        function h() {
            return Array.prototype.slice.call(arguments, 1)
        }

        function u(c) {
            c.apply(this);
            this.drawBreaks(this.xAxis, ["x"]);
            this.drawBreaks(this.yAxis, r(this.pointArrayMap, ["y"]))
        }
        var r = f.pick,
            g = f.wrap,
            q = f.each,
            y = f.extend,
            z = f.isArray,
            v = f.fireEvent,
            t = f.Axis,
            A = f.Series;
        y(t.prototype, {
            isInBreak: function(c, e) {
                var b = c.repeat || Infinity,
                    a = c.from,
                    d = c.to - c.from;
                e = e >= a ? (e - a) % b : b - (a - e) % b;
                return c.inclusive ?
                    e <= d : e < d && 0 !== e
            },
            isInAnyBreak: function(c, e) {
                var b = this.options.breaks,
                    a = b && b.length,
                    d, n, w;
                if (a) {
                    for (; a--;) this.isInBreak(b[a], c) && (d = !0, n || (n = r(b[a].showPoints, this.isXAxis ? !1 : !0)));
                    w = d && e ? d && !n : d
                }
                return w
            }
        });
        g(t.prototype, "setTickPositions", function(c) {
            c.apply(this, Array.prototype.slice.call(arguments, 1));
            if (this.options.breaks) {
                var e = this.tickPositions,
                    b = this.tickPositions.info,
                    a = [],
                    d;
                for (d = 0; d < e.length; d++) this.isInAnyBreak(e[d]) || a.push(e[d]);
                this.tickPositions = a;
                this.tickPositions.info = b
            }
        });
        g(t.prototype, "init", function(c, e, b) {
            var a = this;
            b.breaks && b.breaks.length && (b.ordinal = !1);
            c.call(this, e, b);
            c = this.options.breaks;
            a.isBroken = z(c) && !!c.length;
            a.isBroken && (a.val2lin = function(d) {
                    var n = d,
                        b, c;
                    for (c = 0; c < a.breakArray.length; c++)
                        if (b = a.breakArray[c], b.to <= d) n -= b.len;
                        else if (b.from >= d) break;
                    else if (a.isInBreak(b, d)) {
                        n -= d - b.from;
                        break
                    }
                    return n
                }, a.lin2val = function(d) {
                    var b, c;
                    for (c = 0; c < a.breakArray.length && !(b = a.breakArray[c], b.from >= d); c++) b.to < d ? d += b.len : a.isInBreak(b, d) && (d += b.len);
                    return d
                },
                a.setExtremes = function(a, b, c, e, f) {
                    for (; this.isInAnyBreak(a);) a -= this.closestPointRange;
                    for (; this.isInAnyBreak(b);) b -= this.closestPointRange;
                    t.prototype.setExtremes.call(this, a, b, c, e, f)
                }, a.setAxisTranslation = function(b) {
                    t.prototype.setAxisTranslation.call(this, b);
                    b = a.options.breaks;
                    var c = [],
                        d = [],
                        e = 0,
                        f, l, m = a.userMin || a.min,
                        p = a.userMax || a.max,
                        h = r(a.pointRangePadding, 0),
                        k, g;
                    q(b, function(b) {
                        l = b.repeat || Infinity;
                        a.isInBreak(b, m) && (m += b.to % l - m % l);
                        a.isInBreak(b, p) && (p -= p % l - b.from % l)
                    });
                    q(b, function(a) {
                        k = a.from;
                        for (l = a.repeat || Infinity; k - l > m;) k -= l;
                        for (; k < m;) k += l;
                        for (g = k; g < p; g += l) c.push({
                            value: g,
                            move: "in"
                        }), c.push({
                            value: g + (a.to - a.from),
                            move: "out",
                            size: a.breakSize
                        })
                    });
                    c.sort(function(a, b) {
                        return a.value === b.value ? ("in" === a.move ? 0 : 1) - ("in" === b.move ? 0 : 1) : a.value - b.value
                    });
                    f = 0;
                    k = m;
                    q(c, function(a) {
                        f += "in" === a.move ? 1 : -1;
                        1 === f && "in" === a.move && (k = a.value);
                        0 === f && (d.push({
                            from: k,
                            to: a.value,
                            len: a.value - k - (a.size || 0)
                        }), e += a.value - k - (a.size || 0))
                    });
                    a.breakArray = d;
                    a.unitLength = p - m - e + h;
                    v(a, "afterBreaks");
                    a.options.staticScale ?
                        a.transA = a.options.staticScale : a.unitLength && (a.transA *= (p - a.min + h) / a.unitLength);
                    h && (a.minPixelPadding = a.transA * a.minPointOffset);
                    a.min = m;
                    a.max = p
                })
        });
        g(A.prototype, "generatePoints", function(c) {
            c.apply(this, h(arguments));
            var e = this.xAxis,
                b = this.yAxis,
                a = this.points,
                d, f = a.length,
                g = this.options.connectNulls,
                x;
            if (e && b && (e.options.breaks || b.options.breaks))
                for (; f--;) d = a[f], x = null === d.y && !1 === g, x || !e.isInAnyBreak(d.x, !0) && !b.isInAnyBreak(d.y, !0) || (a.splice(f, 1), this.data[f] && this.data[f].destroyElements())
        });
        f.Series.prototype.drawBreaks = function(c, e) {
            var b = this,
                a = b.points,
                d, f, g, h;
            c && q(e, function(e) {
                d = c.breakArray || [];
                f = c.isXAxis ? c.min : r(b.options.threshold, c.min);
                q(a, function(a) {
                    h = r(a["stack" + e.toUpperCase()], a[e]);
                    q(d, function(b) {
                        g = !1;
                        if (f < b.from && h > b.to || f > b.from && h < b.from) g = "pointBreak";
                        else if (f < b.from && h > b.from && h < b.to || f > b.from && h > b.to && h < b.from) g = "pointInBreak";
                        g && v(c, g, {
                            point: a,
                            brk: b
                        })
                    })
                })
            })
        };
        f.Series.prototype.gappedPath = function() {
            var c = this.options.gapSize,
                e = this.points.slice(),
                b = e.length -
                1,
                a = this.yAxis,
                d;
            if (c && 0 < b)
                for ("value" !== this.options.gapUnit && (c *= this.closestPointRange); b--;) e[b + 1].x - e[b].x > c && (d = (e[b].x + e[b + 1].x) / 2, e.splice(b + 1, 0, {
                    isNull: !0,
                    x: d
                }), this.options.stacking && (d = a.stacks[this.stackKey][d] = new f.StackItem(a, a.options.stackLabels, !1, d, this.stack), d.total = 0));
            return this.getGraphPath(e)
        };
        g(f.seriesTypes.column.prototype, "drawPoints", u);
        g(f.Series.prototype, "drawPoints", u)
    })(h)
});