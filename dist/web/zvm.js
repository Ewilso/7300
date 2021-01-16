function t() {
  for (var t, i, e = arguments[0], s = 1; s < arguments.length; ) for (i in (t = arguments[s++])) e[i] = t[i];
  return e;
}
function i() {}
function e(t) {
  for (var i = 0, e = t.length, s = new Uint16Array(e / 2); i < e; ) s[i / 2] = (t[i++] << 8) | t[i++];
  return s;
}
i.subClass = function (i) {
  function e() {
    this.init && this.init.apply(this, arguments);
  }
  return (e.prototype = t(Object.create(this.prototype), i)), (e.subClass = this.subClass), (e.super = e.prototype.super = this.prototype), e;
};
var s = {
    extend: t,
    Class: i,
    MemoryView: function (i, s, r) {
      return (
        "number" == typeof i ? (i = new ArrayBuffer(i)) : i.buffer && ((s |= 0), void 0 === r && (r = i.byteLength - s), (s += i.byteOffset), (i = i.buffer)),
        t(new DataView(i, s, r), {
          getUint8Array: function (t, i) {
            return (t += this.byteOffset), new Uint8Array(this.buffer.slice(t, t + i));
          },
          getUint16Array: function (t, i) {
            return (t += this.byteOffset), e(new Uint8Array(this.buffer, t, 2 * i));
          },
          setUint8Array: function (t, i) {
            i instanceof ArrayBuffer && (i = new Uint8Array(i)), new Uint8Array(this.buffer, this.byteOffset, this.byteLength).set(i, t);
          },
          getFourCC: function (t) {
            return String.fromCharCode(this.getUint8(t), this.getUint8(t + 1), this.getUint8(t + 2), this.getUint8(t + 3));
          },
          setFourCC: function (t, i) {
            this.setUint8(t, i.charCodeAt(0)), this.setUint8(t + 1, i.charCodeAt(1)), this.setUint8(t + 2, i.charCodeAt(2)), this.setUint8(t + 3, i.charCodeAt(3));
          },
        })
      );
    },
    U2S16: function (t) {
      return (t << 16) >> 16;
    },
    S2U16: function (t) {
      return 65535 & t;
    },
    Uint8toUint16Array: e,
  },
  r = s.MemoryView,
  n = s.Class.subClass({
    init: function (t) {
      if (((this.type = ""), (this.chunks = []), t)) {
        var i,
          e,
          s = r(t),
          n = 12;
        if ("FORM" !== s.getFourCC(0)) throw new Error("Not an IFF file");
        for (this.type = s.getFourCC(8), i = s.getUint32(4) + 8; n < i; ) {
          if ((e = s.getUint32(n + 4)) < 0 || e + n > i) throw new Error("IFF chunk out of range");
          this.chunks.push({ type: s.getFourCC(n), offset: n, data: s.getUint8Array(n + 8, e) }), (n += 8 + e), e % 2 && n++;
        }
      }
    },
    write: function () {
      for (var t, i, e = 12, s = 0, n = 12; s < this.chunks.length; )
        this.chunks[s].data.buffer && (this.chunks[s].data = this.chunks[s].data.buffer), (this.chunks[s].length = this.chunks[s].data.byteLength || this.chunks[s].data.length), (e += 8 + this.chunks[s++].length) % 2 && e++;
      for ((t = r(e)).setFourCC(0, "FORM"), t.setUint32(4, e - 8), t.setFourCC(8, this.type), s = 0; s < this.chunks.length; )
        (i = this.chunks[s++]), t.setFourCC(n, i.type), t.setUint32(n + 4, i.length), t.setUint8Array(n + 8, i.data), (n += 8 + i.length) % 2 && n++;
      return t.buffer;
    },
  }),
  o = n.subClass({
    init: function (t) {
      if ((this.super.init.call(this, t), t)) {
        if ("IFRS" !== this.type) throw new Error("Not a Blorb file");
        if ("RIdx" !== this.chunks[0].type) throw new Error("Malformed Blorb: chunk 1 is not RIdx");
        for (var i = r(this.chunks[0].data), e = 4; e < this.chunks[0].data.length; ) {
          if ("Exec" === i.getFourCC(e) && 0 === i.getUint32(e + 4))
            return void (this.exec = this.chunks.filter(function (t) {
              return t.offset === i.getUint32(e + 8);
            })[0]);
          e += 12;
        }
      }
    },
  }),
  h = n.subClass({
    init: function (t) {
      if ((this.super.init.call(this, t), t)) {
        if ("IFZS" !== this.type) throw new Error("Not a Quetzal savefile");
        for (var i, e, s, n = 0; n < this.chunks.length; )
          (i = this.chunks[n].type),
            (e = this.chunks[n++].data),
            "CMem" === i || "UMem" === i
              ? ((this.memory = e), (this.compressed = "CMem" === i))
              : "Stks" === i
              ? (this.stacks = e)
              : "IFhd" === i && ((s = r(e.buffer)), (this.release = s.getUint16(0)), (this.serial = s.getUint8Array(2, 6)), (this.checksum = s.getUint16(8)), (this.pc = 16777215 & s.getUint32(9)));
      }
    },
    write: function () {
      this.type = "IFZS";
      var t = r(13);
      return (
        t.setUint16(0, this.release),
        t.setUint8Array(2, this.serial),
        t.setUint32(9, this.pc),
        t.setUint16(8, this.checksum),
        (this.chunks = [
          { type: "IFhd", data: t },
          { type: this.compressed ? "CMem" : "UMem", data: this.memory },
          { type: "Stks", data: this.stacks },
        ]),
        this.super.write.call(this)
      );
    },
  });
var a = {
    IFF: n,
    Blorb: o,
    Quetzal: h,
    identify: function (t) {
      var i,
        e,
        s,
        n = r(t);
      if (
        ("FORM" === n.getFourCC(0) && "IFRS" === n.getFourCC(8)
          ? (i = new o(t)).exec && ((e = i.exec.type), (t = i.exec.data), "GLUL" === e && (s = (n = r(t)).getUint32(4)), "ZCOD" === e && (s = t[0]))
          : "Glul" === n.getFourCC(0)
          ? ((e = "GLUL"), (s = n.getUint32(4)))
          : (s = n.getUint8(0)) > 0 && s < 9 && (e = "ZCOD"),
        e && s)
      )
        return { format: e, version: s, data: t };
    },
  },
  u = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
var c = s.Class,
  l = s.U2S16,
  f = c.subClass({
    init: function (t, i) {
      (this.e = t), (this.v = i);
    },
    toString: function () {
      return this.v;
    },
    U2S: function () {
      return l(this.v);
    },
  }),
  _ = f.subClass({
    toString: function () {
      var t = this.v;
      return this.indirect ? "e.indirect(" + t + ")" : 0 === t ? "s[--e.sp]" : --t < 15 ? "l[" + t + "]" : "e.m.getUint16(" + (this.e.globals + 2 * (t - 15)) + ")";
    },
    store: function (t) {
      var i = this.v;
      return this.indirect
        ? "e.indirect(" + i + "," + t + ")"
        : this.returnval
        ? "e.variable(" + i + "," + t + ")"
        : 0 === i
        ? "t=" + t + ";s[e.sp++]=t"
        : --i < 15
        ? "l[" + i + "]=" + t
        : "e.ram.setUint16(" + (this.e.globals + 2 * (i - 15)) + "," + t + ")";
    },
    U2S: function () {
      return "e.U2S(" + this + ")";
    },
  }),
  g = c.subClass({
    init: function (t, i, e, s, r, n) {
      (this.e = t), (this.context = i), (this.code = e), (this.pc = s), (this.labels = [this.pc + "/" + this.code]), (this.next = r), (this.operands = n), this.post && this.post();
    },
    toString: function () {
      return this.label() + (this.func ? this.func.apply(this, this.operands) : "");
    },
    args: function (t) {
      return this.operands.join(t);
    },
    label: function () {
      return "/* " + this.labels.join() + " */ ";
    },
  }),
  p = g.subClass({ stopper: 1 }),
  d = p.subClass({
    post: function () {
      (this.origfunc = this.func), (this.func = this.newfunc);
    },
    newfunc: function () {
      return "e.stop=1;e.pc=" + this.next + ";" + this.origfunc.apply(this, arguments);
    },
  }),
  m = d.subClass({
    storer: 1,
    post: function () {
      (this.storer = this.operands.pop()), (this.origfunc = this.func), (this.func = this.newfunc);
    },
  }),
  U = c.subClass({
    init: function (t, i) {
      (this.ops = t || []), (this.code = i || "||");
    },
    toString: function () {
      for (var t, i = 0, e = []; i < this.ops.length; ) (t = this.ops[i++]), e.push(t.func ? (t.iftrue ? "" : "!(") + t.func.apply(t, t.operands) + (t.iftrue ? "" : ")") : t);
      return (this.invert ? "(!(" : "(") + e.join(this.code) + (this.invert ? "))" : ")");
    },
  }),
  w = g.subClass({
    brancher: 1,
    keyword: "if",
    post: function () {
      var t,
        i,
        e = this.operands.pop(),
        s = e[1];
      (this.iftrue = e[0]),
        0 === s || 1 === s ? (t = "e.ret(" + s + ")") : ((s += this.next - 2), this.context.targets.push(s), (t = "e.pc=" + s)),
        (this.result = t + ";return"),
        (this.offset = s),
        (this.cond = new U([this])),
        this.context.ops.length && ((i = this.context.ops.pop()).offset === s ? (this.cond.ops.unshift(i.cond), (this.labels = i.labels), this.labels.push(this.pc + "/" + this.code)) : this.context.ops.push(i));
    },
    toString: function () {
      var t = this.result;
      return (
        t instanceof C && (this.e.options.debug && (t.context = this.context), (t += t.stopper ? "; return" : ""), this.result.ops.length > 1 && ((t = "\n" + t + "\n"), this.e.options.debug && (t += this.context.spacer))),
        this.label() + this.keyword + this.cond + " {" + t + "}"
      );
    },
  }),
  k = w.subClass({
    storer: 1,
    post: function () {
      k.super.post.call(this), (this.storer = this.operands.pop()), (this.storer.returnval = 1), (this.origfunc = this.func), (this.func = this.newfunc);
    },
    newfunc: function () {
      return this.storer.store(this.origfunc.apply(this, arguments));
    },
  }),
  v = g.subClass({
    storer: 1,
    post: function () {
      this.storer = this.operands.pop();
    },
    toString: function () {
      var t = v.super.toString.call(this);
      return this.storer ? this.storer.store(t) : t;
    },
  }),
  b = p.subClass({
    result: { v: -1 },
    toString: function () {
      return this.label() + "e.call(" + this.operands.shift() + "," + this.result.v + "," + this.next + ",[" + this.args() + "])";
    },
  }),
  y = b.subClass({
    storer: 1,
    post: function () {
      this.result = this.operands.pop();
    },
  }),
  C = c.subClass({
    init: function (t, i) {
      (this.e = t), (this.pc = i), (this.pre = []), (this.ops = []), (this.post = []), (this.targets = []), t.options.debug && (this.spacer = "");
    },
    toString: function () {
      return this.e.options.debug
        ? (this.context && (this.spacer = this.context.spacer + "  "), this.pre.join("") + (this.ops.length > 1 ? this.spacer : "") + this.ops.join(";\n" + this.spacer) + this.post.join(""))
        : this.pre.join("") + this.ops.join(";") + this.post.join("");
    },
  }),
  x = C.subClass({
    toString: function () {
      return this.pre.unshift("var l=e.l,s=e.s,t=0;\n"), x.super.toString.call(this);
    },
  });
var S = {
    Operand: f,
    Variable: _,
    Opcode: g,
    Stopper: p,
    Pauser: d,
    PauserStorer: m,
    BrancherLogic: U,
    Brancher: w,
    BrancherStorer: k,
    Storer: v,
    Caller: b,
    CallerStorer: y,
    Context: C,
    RoutineContext: x,
    opcode_builder: function (t, i, e) {
      return (e = e || {}), i && (e.func = i), t.subClass(e);
    },
  },
  A = S.Variable,
  j = S.Opcode,
  F = S.Stopper,
  G = S.Pauser,
  E = S.PauserStorer,
  D = S.Brancher,
  M = S.BrancherStorer,
  O = S.Storer,
  z = S.Caller,
  B = S.CallerStorer,
  L = S.opcode_builder,
  R = function (t) {
    return "" + t;
  },
  I = new A(u.e, 0),
  V = L(D, function () {
    return 1;
  }),
  q = L(O, function (t) {
    return "e.S2U(~" + t + ")";
  }),
  Z = O.subClass({
    storer: 0,
    post: function () {
      var t = this.operands,
        i = t[0],
        e = i instanceof A;
      (t[0] = new A(this.e, e ? i : i.v)), (e || 0 === i.v) && (t[0].indirect = 1), (this.storer = 142 === this.code ? t.pop() : t.shift()), 0 === t.length && t.push(I);
    },
    func: R,
  }),
  N = j.subClass({
    func: function (t) {
      var i = t.v - 1,
        e = this.code % 2 ? 1 : -1;
      return t instanceof A || i > 14 ? "e.incdec(" + t + "," + e + ")" : (i < 0 ? "e.s[e.sp-1]" : "e.l[" + i + "]") + (1 === e ? "++" : "--");
    },
  }),
  T = F.subClass({
    brancher: 1,
    toString: function () {
      return "e.stop=1;e." + (181 === this.code ? "save" : "restore") + "(" + (this.pc + 1) + ")";
    },
  }),
  P = L(E, function () {
    return "e.restore(" + (this.next - 1) + ")";
  }),
  Q = L(E, function () {
    return "e.save(" + (this.next - 1) + ")";
  }),
  J = function (t) {
    return {
      1: L(D, function () {
        return 2 === arguments.length ? this.args("===") : "e.jeq(" + this.args() + ")";
      }),
      2: L(D, function (t, i) {
        return t.U2S() + "<" + i.U2S();
      }),
      3: L(D, function (t, i) {
        return t.U2S() + ">" + i.U2S();
      }),
      4: L(D, function (t, i) {
        return "e.U2S(e.incdec(" + t + ",-1))<" + i.U2S();
      }),
      5: L(D, function (t, i) {
        return "e.U2S(e.incdec(" + t + ",1))>" + i.U2S();
      }),
      6: L(D, function () {
        return "e.jin(" + this.args() + ")";
      }),
      7: L(D, function () {
        return "e.test(" + this.args() + ")";
      }),
      8: L(O, function () {
        return this.args("|");
      }),
      9: L(O, function () {
        return this.args("&");
      }),
      10: L(D, function () {
        return "e.test_attr(" + this.args() + ")";
      }),
      11: L(j, function () {
        return "e.set_attr(" + this.args() + ")";
      }),
      12: L(j, function () {
        return "e.clear_attr(" + this.args() + ")";
      }),
      13: Z,
      14: L(j, function () {
        return "e.insert_obj(" + this.args() + ")";
      }),
      15: L(O, function (t, i) {
        return "e.m.getUint16(e.S2U(" + t + "+2*" + i.U2S() + "))";
      }),
      16: L(O, function (t, i) {
        return "e.m.getUint8(e.S2U(" + t + "+" + i.U2S() + "))";
      }),
      17: L(O, function () {
        return "e.get_prop(" + this.args() + ")";
      }),
      18: L(O, function () {
        return "e.find_prop(" + this.args() + ")";
      }),
      19: L(O, function () {
        return "e.find_prop(" + this.args(",0,") + ")";
      }),
      20: L(O, function () {
        return "e.S2U(" + this.args("+") + ")";
      }),
      21: L(O, function () {
        return "e.S2U(" + this.args("-") + ")";
      }),
      22: L(O, function () {
        return "e.S2U(" + this.args("*") + ")";
      }),
      23: L(O, function (t, i) {
        return "e.S2U(parseInt(" + t.U2S() + "/" + i.U2S() + "))";
      }),
      24: L(O, function (t, i) {
        return "e.S2U(" + t.U2S() + "%" + i.U2S() + ")";
      }),
      25: B,
      26: z,
      27: L(j, function () {
        return "e.set_colour(" + this.args() + ")";
      }),
      28: L(F, function (t, i) {
        return "while(e.frames.length+1>" + i + "){e.frameptr=e.frames.pop()}return " + t;
      }),
      128: L(D, function (t) {
        return t + "===0";
      }),
      129: L(M, function (t) {
        return "e.get_sibling(" + t + ")";
      }),
      130: L(M, function (t) {
        return "e.get_child(" + t + ")";
      }),
      131: L(O, function (t) {
        return "e.get_parent(" + t + ")";
      }),
      132: L(O, function (t) {
        return "e.get_prop_len(" + t + ")";
      }),
      133: N,
      134: N,
      135: L(j, function (t) {
        return "e.print(2," + t + ")";
      }),
      136: B,
      137: L(j, function (t) {
        return "e.remove_obj(" + t + ")";
      }),
      138: L(j, function (t) {
        return "e.print(3," + t + ")";
      }),
      139: L(F, function (t) {
        return "return " + t;
      }),
      140: L(F, function (t) {
        return "e.pc=" + t.U2S() + "+" + (this.next - 2);
      }),
      141: L(j, function (t) {
        return "e.print(2," + t + "*" + this.e.addr_multipler + ")";
      }),
      142: Z.subClass({ storer: 1 }),
      143: t < 5 ? q : z,
      176: L(F, function () {
        return "return 1";
      }),
      177: L(F, function () {
        return "return 0";
      }),
      178: L(
        j,
        function (t) {
          return "e.print(2," + t + ")";
        },
        { printer: 1 }
      ),
      179: L(
        F,
        function (t) {
          return "e.print(2," + t + ");e.print(1,13);return 1";
        },
        { printer: 1 }
      ),
      180: j,
      181: t < 4 ? T : Q,
      182: t < 4 ? T : P,
      183: L(F, function () {
        return "e.restart()";
      }),
      184: L(
        F,
        function (t) {
          return "return " + t;
        },
        {
          post: function () {
            this.operands.push(I);
          },
        }
      ),
      185:
        t < 5
          ? L(j, function () {
              return "s[--e.sp]";
            })
          : L(O, function () {
              return "e.frames.length+1";
            }),
      186: L(G, function () {
        return "e.quit=1;e.Glk.glk_exit()";
      }),
      187: L(j, function () {
        return "e.print(1,13)";
      }),
      188:
        t < 4
          ? L(F, function () {
              return "e.pc=" + this.next + ";e.v3_status()";
            })
          : j,
      189: V,
      191: V,
      224: B,
      225: L(j, function (t, i, e) {
        return "e.ram.setUint16(e.S2U(" + t + "+2*" + i.U2S() + ")," + e + ")";
      }),
      226: L(j, function (t, i, e) {
        return "e.ram.setUint8(e.S2U(" + t + "+" + i.U2S() + ")," + e + ")";
      }),
      227: L(j, function () {
        return "e.put_prop(" + this.args() + ")";
      }),
      228:
        t < 5
          ? L(G, function () {
              return "e.read(0," + this.args() + ")";
            })
          : L(E, function () {
              return "e.read(" + this.storer.v + "," + this.args() + ")";
            }),
      229: L(j, function (t) {
        return "e.print(4," + t + ")";
      }),
      230: L(j, function (t) {
        return "e.print(0," + t.U2S() + ")";
      }),
      231: L(O, function (t) {
        return "e.random(" + t.U2S() + ")";
      }),
      232: L(O, R, {
        post: function () {
          this.storer = I;
        },
        storer: 0,
      }),
      233: Z,
      234: L(j, function (t) {
        return "e.split_window(" + t + ")";
      }),
      235: L(j, function (t) {
        return "e.set_window(" + t + ")";
      }),
      236: B,
      237: L(j, function (t) {
        return "e.erase_window(" + t.U2S() + ")";
      }),
      238: L(j, function (t) {
        return "e.erase_line(" + t + ")";
      }),
      239: L(j, function (t, i) {
        return "e.set_cursor(" + t + "-1," + i + "-1)";
      }),
      240: L(j, function (t) {
        return "e.get_cursor(" + t + ")";
      }),
      241: L(j, function (t) {
        return "e.set_style(" + t + ")";
      }),
      242: j,
      243: L(F, function () {
        return "e.pc=" + this.next + ";e.output_stream(" + this.args() + ")";
      }),
      244: L(G, function () {
        return "e.input_stream(" + this.args() + ")";
      }),
      245: j,
      246: L(E, function () {
        return "e.read_char(" + this.storer.v + "," + (this.args() || "1") + ")";
      }),
      247: L(M, function () {
        return "e.scan_table(" + this.args() + ")";
      }),
      248: q,
      249: z,
      250: z,
      251: L(j, function () {
        return "e.tokenise(" + this.args() + ")";
      }),
      252: L(j, function () {
        return "e.encode_text(" + this.args() + ")";
      }),
      253: L(j, function () {
        return "e.copy_table(" + this.args() + ")";
      }),
      254: L(j, function () {
        return "e.print_table(" + this.args() + ")";
      }),
      255: L(D, function (t) {
        return "e.stack.getUint8(e.frameptr+5)&(1<<(" + t + "-1))";
      }),
      1e3: Q,
      1001: P,
      1002: L(O, function (t, i) {
        return "e.S2U(e.log_shift(" + t + "," + i.U2S() + "))";
      }),
      1003: L(O, function (t, i) {
        return "e.S2U(e.art_shift(" + t.U2S() + "," + i.U2S() + "))";
      }),
      1004: L(O, function (t) {
        return "e.set_font(" + t + ")";
      }),
      1009: L(O, function () {
        return "e.save_undo(" + this.next + "," + this.storer.v + ")";
      }),
      1010: L(
        j,
        function () {
          return "if(e.restore_undo())return";
        },
        { storer: 1 }
      ),
      1011: L(j, function (t) {
        return "e.print(1," + t + ")";
      }),
      1012: L(O, function () {
        return 3;
      }),
      1013: L(j, function () {
        return "e.set_true_colour(" + this.args() + ")";
      }),
      1014: j.subClass({ brancher: 1 }),
      1030: L(O, function () {
        return "e.gestalt(" + this.args() + ")";
      }),
    };
  };
const H = s.extend,
  K = s.U2S16,
  W = s.S2U16;
function X(t) {
  const i = (t) => ("object" == typeof t ? X(t) : t),
    e = {};
  if (Array.isArray(t)) return t.map(i);
  for (let s in t) "buffer" !== s && "str" !== s && (e[s] = i(t[s]));
  return e;
}
const Y = (($ = new Uint8Array(2)), (new Uint16Array($.buffer)[0] = 1), 1 === $[0]);
var $;
function tt(t, i, e, s) {
  if (Y && !s) for (; i < e; ) t.setUint16(i, t.getUint16(i, 1)), (i += 2);
}
var it = {
    art_shift: function (t, i) {
      return i > 0 ? t << i : t >> -i;
    },
    call: function (t, i, e, s) {
      if (0 === t) return i >= 0 && this.variable(i, 0), (this.pc = e);
      this.pc = t * this.addr_multipler;
      var r = this.m.getUint8(this.pc++),
        n = this.stack,
        o = 0,
        h = this.frameptr;
      for (
        n.setUint16(h + 6, this.sp),
          this.frames.push(h),
          h = this.frameptr = this.s.byteOffset + 2 * this.sp,
          n.setUint32(h, e << 8),
          n.setUint8(h + 3, (i >= 0 ? 0 : 16) | r),
          n.setUint8(h + 4, i >= 0 ? i : 0),
          n.setUint8(h + 5, (1 << s.length) - 1),
          this.make_stacks(),
          this.sp = 0;
        o < r;

      )
        (this.l[o] = o < s.length ? s[o] : this.version < 5 ? this.m.getUint16(this.pc + 2 * o) : 0), o++;
      this.version < 5 && (this.pc += 2 * r);
    },
    clear_attr: function (t, i) {
      var e = (this.objects + (this.version3 ? 9 : 14) * t + i / 8) | 0;
      this.ram.setUint8(e, this.m.getUint8(e) & ~(128 >> i % 8));
    },
    copy_table: function (t, i, e) {
      e = K(e);
      var s = this.ram,
        r = 0,
        n = e < 0;
      if (((e = Math.abs(e)), 0 !== i))
        if (n) for (; r < e; ) s.setUint8(i + r, this.m.getUint8(t + r++));
        else s.setUint8Array(i, this.m.getUint8Array(t, e));
      else for (; r < e; ) s.setUint8(t + r++, 0);
    },
    do_autorestore: function (t) {
      const i = this.Glk;
      i.restore_allstate(t.glk), (this.io = t.io);
      const e = new i.RefBox();
      let s;
      for (; (s = i.glk_window_iterate(s, e)); ) 201 === e.value && ((this.mainwin = s), s.linebuf && (t.read_data.buffer = s.linebuf)), 202 === e.value && (this.statuswin = s), 203 === e.value && (this.upperwin = s);
      for (s = null; (s = i.glk_stream_iterate(s, e)); ) 210 === e.value && (this.io.streams[2].str = s), 211 === e.value && (this.io.streams[4].str = s);
      this.restart(1), this.restore_file(this.options.Dialog.streaming ? new Uint8Array(t.ram) : Uint8Array.from(t.ram), 1), (this.read_data = t.read_data), (this.xorshift_seed = t.xorshift_seed);
    },
    do_autosave: function (t) {
      if (!this.options.Dialog) throw new Error("A reference to Dialog is required");
      let i = null;
      if ((t || 0) >= 0) {
        const t = this.save_file(this.pc, 1);
        i = { glk: this.Glk.save_allstate(), io: X(this.io), ram: this.options.Dialog.streaming ? t : Array.from(new Uint8Array(t)), read_data: X(this.read_data), xorshift_seed: this.xorshift_seed };
      }
      this.options.Dialog.autosave_write(this.signature, i);
    },
    encode_text: function (t, i, e, s) {
      this.ram.setUint8Array(s, this.encode(this.m.getUint8Array(t + e, i)));
    },
    extension_table: function (t, i) {
      var e = this.extension;
      return !e || t > this.extension_count ? 0 : ((e += 2 * t), void 0 === i ? this.m.getUint16(e) : void this.ram.setUint16(e, i));
    },
    find_prop: function (t, i, e) {
      var s,
        r,
        n = this.m,
        o = this.version3,
        h = 0,
        a = n.getUint16(this.objects + (o ? 9 : 14) * t + (o ? 7 : 12));
      for (a += 2 * n.getUint8(a) + 1; ; ) {
        if (((r = (s = n.getUint8(a)) & (o ? 31 : 63)), h === e)) return r;
        if (r === i) return a + (!o && 128 & s ? 2 : 1);
        if (r < i) return 0;
        (h = r), (a += o ? 2 + (s >> 5) : 128 & s ? ((r = 63 & n.getUint8(a + 1)) ? r + 2 : 66) : 64 & s ? 3 : 2);
      }
    },
    gestalt: function (t) {
      switch (t) {
        case 1:
          return 258;
      }
      return 0;
    },
    get_child: function (t) {
      return this.version3 ? this.m.getUint8(this.objects + 9 * t + 6) : this.m.getUint16(this.objects + 14 * t + 10);
    },
    get_sibling: function (t) {
      return this.version3 ? this.m.getUint8(this.objects + 9 * t + 5) : this.m.getUint16(this.objects + 14 * t + 8);
    },
    get_parent: function (t) {
      return this.version3 ? this.m.getUint8(this.objects + 9 * t + 4) : this.m.getUint16(this.objects + 14 * t + 6);
    },
    get_prop: function (t, i) {
      var e,
        s = this.m,
        r = this.find_prop(t, i);
      return r ? ((e = s.getUint8(r - 1)), s[(this.version3 ? e >> 5 : 64 & e) ? "getUint16" : "getUint8"](r)) : s.getUint16(this.properties + 2 * (i - 1));
    },
    get_prop_len: function (t) {
      if (0 === t) return 0;
      var i = this.m.getUint8(t - 1);
      return this.version3 ? 1 + (i >> 5) : 128 & i ? (0 === (i &= 63) ? 64 : i) : 64 & i ? 2 : 1;
    },
    incdec: function (t, i) {
      if (0 === t) return (this.s[this.sp - 1] += i), this.s[this.sp - 1];
      if (--t < 15) return (this.l[t] += i), this.l[t];
      var e = this.globals + 2 * (t - 15);
      return this.ram.setUint16(e, this.m.getUint16(e) + i), this.ram.getUint16(e);
    },
    indirect: function (t, i) {
      return 0 === t ? (arguments.length > 1 ? (this.s[this.sp - 1] = i) : this.s[this.sp - 1]) : this.variable(t, i);
    },
    insert_obj: function (t, i) {
      this.remove_obj(t), this.set_family(t, i, i, t, t, this.get_child(i));
    },
    jeq: function () {
      for (var t = 1; t < arguments.length; ) if (arguments[t++] === arguments[0]) return 1;
    },
    jin: function (t, i) {
      return this.get_parent(t) === i;
    },
    log: function (t) {
      this.options.GlkOte && this.options.GlkOte.log(t);
    },
    log_shift: function (t, i) {
      return i > 0 ? t << i : t >>> -i;
    },
    make_stacks: function () {
      var t = 15 & this.stack.getUint8(this.frameptr + 3);
      (this.l = new Uint16Array(this.stack.buffer, this.frameptr + 8, t)), (this.s = new Uint16Array(this.stack.buffer, this.frameptr + 8 + 2 * t));
    },
    put_prop: function (t, i, e) {
      var s,
        r = this.find_prop(t, i);
      r && ((s = this.m.getUint8(r - 1)), this.ram[(this.version3 ? s >> 5 : 64 & s) ? "setUint16" : "setUint8"](r, e));
    },
    random: function (t) {
      var i = this.xorshift_seed;
      return t < 1 ? ((this.xorshift_seed = t), 0) : 0 === i ? (1 + Math.random() * t) | 0 : ((i ^= i << 13), (i ^= i >> 17), (this.xorshift_seed = i ^= i << 5), 1 + ((32767 & i) % t));
    },
    remove_obj: function (t) {
      var i,
        e,
        s,
        r = this.get_parent(t);
      if (0 !== r)
        if (((i = this.get_child(r)), (e = this.get_sibling(t)), i === t)) this.set_family(t, 0, r, e);
        else {
          for (; (s = this.get_sibling(i)) !== t; ) i = s;
          this.set_family(t, 0, 0, 0, i, e);
        }
    },
    restart: function (t) {
      var i = this.ram,
        e = i.getUint8(0),
        r = 3 === e,
        n = r ? 2 : 8 === e ? 8 : 4,
        o = i.getUint8(17),
        h = i.getUint16(10),
        a = e > 4 ? i.getUint16(54) : 0,
        u = s.MemoryView(this.options.stack_len);
      i.setUint8Array(0, this.origram),
        i.setUint8(17, o),
        H(this, {
          stack: u,
          frameptr: 0,
          frames: [],
          s: new Uint16Array(u.buffer, 8),
          sp: 0,
          l: [],
          undo: [],
          undo_len: 0,
          glk_blocking_call: null,
          version: e,
          version3: r,
          pc: i.getUint16(6),
          properties: h,
          objects: h + (r ? 53 : 112),
          globals: i.getUint16(12),
          eof: (i.getUint16(26) || 65536) * n,
          extension: a,
          extension_count: a ? i.getUint16(a) : 0,
          addr_multipler: n,
          opcodes: J(e),
        }),
        this.init_text(),
        t || this.init_io(),
        this.update_header();
    },
    restore: function (t) {
      (this.pc = t), this.fileref_create_by_prompt({ func: "restore", mode: 2, usage: 1 });
    },
    restore_file: function (t, i) {
      var e,
        s = this.ram,
        r = new a.Quetzal(t),
        n = r.memory,
        o = this.stack,
        h = s.getUint8(17),
        u = 0,
        c = 0;
      if (s.getUint16(2) !== r.release || s.getUint16(28) !== r.checksum) return 0;
      for (; u < 6; ) if (s.getUint8(18 + u) !== r.serial[u++]) return 0;
      if (((u = 0), s.setUint8Array(0, this.origram), r.compressed)) for (; u < n.length; ) 0 === (e = n[u++]) ? (c += 1 + n[u++]) : s.setUint8(c, e ^ this.origram[c++]);
      else s.setUint8Array(0, n);
      for (s.setUint8(17, h), o.setUint8Array(0, r.stacks), this.frames = [], u = 0; u < r.stacks.byteLength; )
        (this.frameptr = u), this.frames.push(u), tt(o, (c = u + 8), (c += 2 * (15 & o.getUint8(u + 3))), i), tt(o, c, (c += 2 * o.getUint16(u + 6)), i), (u = c);
      return this.frames.pop(), (this.sp = o.getUint16(this.frameptr + 6)), this.make_stacks(), (this.pc = r.pc), this.update_header(), this.version3 && this.split_window(0), 2;
    },
    restore_undo: function () {
      if (0 === this.undo.length) return 0;
      var t = this.undo.pop();
      return (
        (this.frameptr = t.frameptr),
        (this.pc = t.pc),
        (this.undo_len -= t.ram.byteLength + t.stack.byteLength),
        (t.ram[17] = this.m.getUint8(17)),
        this.ram.setUint8Array(0, t.ram),
        (this.frames = t.frames),
        (this.sp = t.sp),
        this.stack.setUint8Array(0, t.stack),
        this.make_stacks(),
        this.variable(t.var, 2),
        1
      );
    },
    ret: function (t) {
      var i = this.stack,
        e = this.frameptr,
        s = 16 & i.getUint8(e + 3) ? -1 : i.getUint8(e + 4);
      (this.pc = i.getUint32(e) >> 8), (e = this.frameptr = this.frames.pop()), this.make_stacks(), (this.sp = i.getUint16(e + 6)), s >= 0 && this.variable(s, t || 0);
    },
    save: function (t) {
      (this.pc = t), this.fileref_create_by_prompt({ func: "save", mode: 1, usage: 1 });
    },
    save_file: function (t, i) {
      var e,
        r,
        n,
        o = this.m,
        h = new a.Quetzal(),
        u = s.MemoryView(this.stack.buffer.slice()),
        c = 0,
        l = this.frameptr;
      if (((h.release = o.getUint16(2)), (h.serial = o.getUint8Array(18, 6)), (h.checksum = o.getUint16(28)), (h.pc = t), i)) h.memory = this.m.getUint8Array(0, this.staticmem);
      else {
        const t = [];
        for (h.compressed = 1, e = 0; e < this.staticmem; e++) 0 === (n = o.getUint8(e) ^ this.origram[e]) ? 256 == ++c && (t.push(0, 255), (c = 0)) : (c && (t.push(0, c - 1), (c = 0)), t.push(n));
        h.memory = t;
      }
      if ((u.setUint16(l + 6, this.sp), Y && !i)) {
        const t = this.frames.slice();
        for (t.push(l), e = 0; e < t.length; e++) tt(u, (r = (l = t[e]) + 8), (r += 2 * (15 & u.getUint8(l + 3)))), tt(u, r, (r += 2 * u.getUint16(l + 6)));
      }
      return (h.stacks = u.getUint8Array(0, this.frameptr + 8 + 2 * (15 & u.getUint8(l + 3)) + 2 * this.sp)), h.write();
    },
    save_restore_handler: function (t) {
      var i,
        e,
        s,
        r = this.m,
        n = this.Glk,
        o = 0,
        h = [];
      t &&
        ("save" === this.fileref_data.func ? (n.glk_put_buffer_stream(t, new Uint8Array(this.save_file(this.pc))), (o = 1)) : ((h = new Uint8Array(131072)), n.glk_get_buffer_stream(t, h), (o = this.restore_file(h.buffer))),
        n.glk_stream_close(t)),
        this.version3
          ? ((e = 128 & (i = r.getUint8(this.pc++))), (s = 64 & i ? 63 & i : (((i << 8) | r.getUint8(this.pc++)) << 18) >> 18), !o == !e && (0 === s || 1 === s ? this.ret(s) : (this.pc += s - 2)))
          : this.variable(r.getUint8(this.pc++), o);
    },
    save_undo: function (t, i) {
      var e;
      return (
        this.undo_len > this.options.undo_len && ((e = this.undo.shift()), (this.undo_len -= e.ram.byteLength + e.stack.byteLength)),
        (e = { frameptr: this.frameptr, frames: this.frames.slice(), pc: t, ram: this.m.getUint8Array(0, this.staticmem), sp: this.sp, stack: this.stack.getUint8Array(0, this.s.byteOffset + 2 * this.sp), var: i }),
        (this.undo_len += e.ram.byteLength + e.stack.byteLength),
        this.undo.push(e),
        1
      );
    },
    scan_table: function (t, i, e, s) {
      var r = 128 & (s = s || 130) ? "getUint16" : "getUint8";
      for (e = i + e * (s &= 127); i < e; ) {
        if (this.m[r](i) === t) return i;
        i += s;
      }
      return 0;
    },
    set_attr: function (t, i) {
      var e = (this.objects + (this.version3 ? 9 : 14) * t + i / 8) | 0;
      this.ram.setUint8(e, this.m.getUint8(e) | (128 >> i % 8));
    },
    set_family: function (t, i, e, s, r, n) {
      var o = this.ram,
        h = this.objects;
      this.version3 ? (o.setUint8(h + 9 * t + 4, i), e && o.setUint8(h + 9 * e + 6, s), r && o.setUint8(h + 9 * r + 5, n)) : (o.setUint16(h + 14 * t + 6, i), e && o.setUint16(h + 14 * e + 10, s), r && o.setUint16(h + 14 * r + 8, n));
    },
    test: function (t, i) {
      return (t & i) === i;
    },
    test_attr: function (t, i) {
      return (this.m.getUint8((this.objects + (this.version3 ? 9 : 14) * t + i / 8) | 0) << i % 8) & 128;
    },
    variable: function (t, i) {
      var e,
        s = void 0 !== i;
      if (0 === t) {
        if (!s) return this.s[--this.sp];
        this.s[this.sp++] = i;
      } else if (--t < 15) {
        if (!s) return this.l[t];
        this.l[t] = i;
      } else {
        if (((e = this.globals + 2 * (t - 15)), !s)) return this.m.getUint16(e);
        this.ram.setUint16(e, i);
      }
      return i;
    },
    U2S: K,
    S2U: W,
  },
  et = {
    init_text: function () {
      var t = this,
        i = this.m,
        e = this.version > 4 && i.getUint16(52),
        s = this.extension_table(3),
        r = s && i.getUint8(s++);
      (this.abbr_addr = i.getUint16(24)),
        (function (i) {
          for (var e = [[], [], []], s = 0; s < 78; ) e[(s / 26) | 0][s % 26] = i[s++];
          (e[2][1] = 13), (t.alphabets = e);
        })(e ? i.getUint8Array(e, 78) : this.text_to_zscii("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ \r0123456789.,!?_#'\"/\\-:()", 1)),
        (function (i) {
          for (var e = { 13: "\r" }, s = { 13: 13 }, r = 0; r < i.length; ) (e[155 + r] = String.fromCharCode(i[r])), (s[i[r]] = 155 + r++);
          for (r = 32; r < 127; ) (e[r] = String.fromCharCode(r)), (s[r] = r++);
          (t.unicode_table = e), (t.reverse_unicode_table = s);
        })(
          s
            ? i.getUint16Array(s, r)
            : this.text_to_zscii(
                unescape(
                  "%E4%F6%FC%C4%D6%DC%DF%BB%AB%EB%EF%FF%CB%CF%E1%E9%ED%F3%FA%FD%C1%C9%CD%D3%DA%DD%E0%E8%EC%F2%F9%C0%C8%CC%D2%D9%E2%EA%EE%F4%FB%C2%CA%CE%D4%DB%E5%C5%F8%D8%E3%F1%F5%C3%D1%D5%E6%C6%E7%C7%FE%F0%DE%D0%A3%u0153%u0152%A1%BF"
                ),
                1
              )
        ),
        (this.dictionaries = {}),
        (this.dict = i.getUint16(8)),
        this.parse_dict(this.dict);
    },
    decode: function (t, i) {
      var e,
        s,
        r,
        n = this.m,
        o = t,
        h = [],
        a = 0,
        u = 0,
        c = [],
        l = [],
        f = 0;
      if (this.jit[t]) return this.jit[t];
      for (i = i ? i + t : this.eof; t < i && ((e = n.getUint16(t)), (t += 2), h.push((e >> 10) & 31, (e >> 5) & 31, 31 & e), !(32768 & e)); );
      for (; a < h.length; )
        0 === (s = h[a++])
          ? c.push(32)
          : s < 4
          ? ((r = 1), c.push(-1), l.push("+this.abbr(" + (32 * (s - 1) + h[a++]) + ")+"))
          : s < 6
          ? (u = s)
          : 2 === u && 6 === s
          ? a + 1 < h.length && c.push((h[a++] << 5) | h[a++])
          : s < 32 && c.push(this.alphabets[u][s - 6]),
          (u = u < 4 ? 0 : u - 3),
          a % 3 == 0 && ((a += f), (f = 0));
      return (
        (c = this.zscii_to_text(c, l)),
        r &&
          (c = {
            toString: Function(
              'return"' +
                c
                  .replace(/\\/g, "\\\\")
                  .replace(/"/g, '\\"')
                  .replace(/\r/g, "\\r")
                  .replace(/\uE000/g, '"') +
                '"'
            ).bind(this),
          }),
        o >= this.staticmem && (this.jit[o] = c),
        c
      );
    },
    encode: function (t) {
      for (var i, e, s = this.alphabets, r = [], n = this.version3 ? 6 : 9, o = 0, h = []; r.length < n; )
        32 === (i = t[o++]) ? r.push(0) : (e = s[0].indexOf(i)) >= 0 ? r.push(e + 6) : (e = s[1].indexOf(i)) >= 0 ? r.push(4, e + 6) : (e = s[2].indexOf(i)) >= 0 ? r.push(5, e + 6) : void 0 === i ? r.push(5) : r.push(5, 6, i >> 5, 31 & i);
      for (r.length = n, o = 0; o < n; ) h.push((r[o++] << 2) | (r[o] >> 3), ((7 & r[o++]) << 5) | r[o++]);
      return (h[h.length - 2] |= 128), h;
    },
    zscii_to_text: function (t, i) {
      for (var e, s = 0, r = t.length, n = 0, o = ""; s < r; ) -1 === (e = t[s++]) && (o += i[n++]), (e = this.unicode_table[e]) && (o += e);
      return o;
    },
    text_to_zscii: function (t, i) {
      for (var e, s = [], r = 0, n = t.length; r < n; ) (e = t.charCodeAt(r++)), i || (e = this.reverse_unicode_table[e] || 63), s.push(e);
      return s;
    },
    parse_dict: function (t) {
      var i,
        e,
        s = this.m,
        r = t,
        n = {},
        o = s.getUint8(t++);
      for (n.separators = Array.prototype.slice.call(s.getUint8Array(t, o)), t += o, i = s.getUint8(t++), e = t + 2 + i * s.getUint16(t), t += 2; t < e; )
        (n[Array.prototype.toString.call(s.getUint8Array(t, this.version3 ? 4 : 6))] = t), (t += i);
      return (this.dictionaries[r] = n), n;
    },
    abbr: function (t) {
      return this.decode(2 * this.m.getUint16(this.abbr_addr + 2 * t));
    },
    tokenise: function (t, i, e, s) {
      (e = e || this.dict), (e = this.dictionaries[e] || this.parse_dict(e));
      var r,
        n,
        o,
        h,
        a = this.m,
        u = this.ram,
        c = 1e3,
        l = 1,
        f = e.separators,
        _ = [],
        g = 0;
      for (this.version > 4 && (c = a.getUint8(t + l++) + 2); l < c && 0 !== (r = a.getUint8(t + l)); )
        32 === r || f.indexOf(r) >= 0 ? (32 !== r && _.push([[r], l]), (n = null)) : (n || (_.push([[], l]), (n = _[_.length - 1][0])), n.push(r)), l++;
      for (o = Math.min(_.length, a.getUint8(i)); g < o; ) (h = e["" + this.encode(_[g][0])]), (s && !h) || (u.setUint16(i + 2 + 4 * g, h || 0), u.setUint8(i + 4 + 4 * g, _[g][0].length), u.setUint8(i + 5 + 4 * g, _[g][1])), g++;
      u.setUint8(i + 1, g);
    },
  };
const st = s.U2S16,
  rt = (function () {
    for (var t = { 4294967289: 8, 4294967290: 13, 4294967288: 27, 4294967292: 129, 4294967291: 130, 4294967294: 131, 4294967293: 132, 4294967283: 146, 4294967285: 148, 4294967284: 152, 4294967286: 154 }, i = 0; i < 12; )
      t[4294967279 - i] = 133 + i++;
    return t;
  })(),
  nt = [0, 2, 1, 10, 4, 9, 5, 6];
function ot(t) {
  const i = [0, 8, 16, 25, 33, 41, 49, 58, 66, 74, 82, 90, 99, 107, 115, 123, 132, 140, 148, 156, 165, 173, 181, 189, 197, 206, 214, 222, 230, 239, 247, 255];
  return (i[31 & t] << 16) | (i[(992 & t) >> 5] << 8) | i[(31744 & t) >> 10];
}
const ht = [65534, 65535, 0, 29, 832, 957, 22944, 31775, 30624, 32767, 23254, 17969, 11627];
var at,
  ut = {
    init_io: function () {
      (this.io = {
        reverse: 0,
        bold: 0,
        italic: 0,
        bg: -1,
        fg: -1,
        mono: 2 & this.m.getUint8(17),
        transcript: 1 & this.m.getUint8(17),
        streams: [0, 1, {}, [], {}],
        currentwin: 0,
        height: 0,
        glkheight: 0,
        maxheight: 0,
        seenheight: 0,
        width: 0,
        row: 0,
        col: 0,
      }),
        this.open_windows();
    },
    erase_line: function (t) {
      if (1 === t) {
        var i = this.io,
          e = i.row,
          s = i.col;
        this._print(Array(i.width - i.col + 1).join(" ")), this.set_cursor(e, s);
      }
    },
    erase_window: function (t) {
      t < 1 && (this.Glk.glk_window_clear(this.mainwin), this.io.bg >= 0 ? this.Glk.glk_stylehint_set(3, 0, 8, this.io.bg) : -1 === this.io.bg && this.Glk.glk_stylehint_clear(3, 0, 8)),
        0 !== t && (-1 === t && this.split_window(0), this.upperwin && (this.Glk.glk_window_clear(this.upperwin), this.set_cursor(0, 0)));
    },
    fileref_create_by_prompt: function (t) {
      void 0 === t.run && (t.run = 1), (this.fileref_data = t), (this.glk_blocking_call = "fileref_create_by_prompt"), this.Glk.glk_fileref_create_by_prompt(t.usage, t.mode, t.rock || 0);
    },
    fix_upper_window: function () {
      var t = this.Glk,
        i = this.io;
      i.seenheight >= i.maxheight && (i.maxheight = i.height),
        this.upperwin &&
          (0 === i.maxheight ? (t.glk_window_close(this.upperwin), (this.upperwin = null)) : i.maxheight !== i.glkheight && t.glk_window_set_arrangement(t.glk_window_get_parent(this.upperwin), 18, i.maxheight, null),
          (i.glkheight = i.maxheight)),
        (i.seenheight = i.maxheight),
        (i.maxheight = i.height);
    },
    format: function () {
      this.Glk.glk_set_style(nt[!!this.io.mono | this.io.italic | this.io.bold]), this.Glk.glk_gestalt(4352, 0) && this.Glk.garglk_set_reversevideo(this.io.reverse);
    },
    get_cursor: function (t) {
      this.ram.setUint16(t, this.io.row + 1), this.ram.setUint16(t + 2, this.io.col + 1);
    },
    handle_char_input: function (t) {
      var i = this.io.streams[4],
        e = rt[t] || this.reverse_unicode_table[t] || 63;
      this.variable(this.read_data.storer, e), 1 === i.mode && (i.cache += e), 2 === i.mode && this.Glk.glk_put_char_stream_uni(i.str, e);
    },
    handle_create_fileref: function (t) {
      var i,
        e = this.Glk,
        s = this.fileref_data;
      return (
        t && ((i = s.unicode ? e.glk_stream_open_file_uni(t, s.mode, s.rock || 0) : e.glk_stream_open_file(t, s.mode, s.rock || 0)), e.glk_fileref_destroy(t)),
        ("restore" !== s.func && "save" !== s.func) || this.save_restore_handler(i),
        "input_stream" === s.func && (this.io.streams[0] = i),
        "output_stream" === s.func && this.output_stream_handler(i),
        s.run
      );
    },
    handle_line_input: function (t, i) {
      var e = this.ram,
        s = this.read_data,
        r = this.io.streams,
        n = String.fromCharCode.apply(null, s.buffer.slice(0, t)) + "\n",
        o = this.text_to_zscii(n.slice(0, -1).toLowerCase());
      1 === r[2].mode && (r[2].cache += n),
        2 === r[2].mode && this.Glk.glk_put_jstring_stream(r[2].str, n),
        1 === r[4].mode && (r[4].cache += n),
        2 === r[4].mode && this.Glk.glk_put_jstring_stream(r[4].str, n),
        this.version < 5 ? (o.push(0), e.setUint8Array(s.bufaddr + 1, o)) : (e.setUint8(s.bufaddr + 1, t), e.setUint8Array(s.bufaddr + 2, o), this.variable(s.storer, isNaN(i) ? 13 : i)),
        s.parseaddr && this.tokenise(s.bufaddr, s.parseaddr);
    },
    input_stream: function (t) {
      var i = this.io;
      t && !i.streams[0] && this.fileref_create_by_prompt({ func: "input_stream", mode: 2, rock: 212, unicode: 1, usage: 259 }), !t && i.streams[0] && (this.Glk.glk_stream_close(i.streams[0]), (i.streams[0] = 0));
    },
    open_windows: function () {
      const t = this.Glk;
      if (this.mainwin) t.glk_stylehint_clear(0, 0, 8), t.garglk_set_zcolors_stream(this.mainwin.str, this.io.fg, this.io.bg), t.glk_window_clear(this.mainwin), this.upperwin && (t.glk_window_close(this.upperwin), (this.upperwin = null));
      else {
        const i = [1, 2, 4, 5, 6, 9, 10];
        for (let e = 0; e < 7; e++) t.glk_stylehint_set(0, i[e], 3, 0), t.glk_stylehint_set(0, i[e], 4, 0), t.glk_stylehint_set(0, i[e], 5, 0), t.glk_stylehint_set(0, i[e], 6, 1);
        t.glk_stylehint_set(0, 4, 4, 1),
          t.glk_stylehint_set(0, 1, 5, 1),
          t.glk_stylehint_set(0, 5, 4, 1),
          t.glk_stylehint_set(0, 5, 5, 1),
          t.glk_stylehint_set(0, 2, 6, 0),
          t.glk_stylehint_set(0, 9, 4, 1),
          t.glk_stylehint_set(0, 9, 6, 0),
          t.glk_stylehint_set(0, 10, 5, 1),
          t.glk_stylehint_set(0, 10, 6, 0),
          t.glk_stylehint_set(0, 6, 4, 1),
          t.glk_stylehint_set(0, 6, 5, 1),
          t.glk_stylehint_set(0, 6, 6, 0),
          (this.mainwin = t.glk_window_open(0, 0, 0, 3, 201)),
          t.glk_set_window(this.mainwin),
          this.version3 && ((this.statuswin = t.glk_window_open(this.mainwin, 18, 1, 4, 202)), this.statuswin && t.garglk_set_reversevideo_stream(t.glk_window_get_stream(this.statuswin), 1));
      }
    },
    output_stream: function (t, i, e) {
      var s,
        r,
        n = this.ram,
        o = this.io.streams;
      1 === (t = st(t)) && (o[1] = 1),
        -1 === t && (o[1] = 0),
        2 !== t || o[2].mode || (this.fileref_create_by_prompt({ func: "output_stream", mode: 5, rock: 210, run: !e, str: 2, unicode: 1, usage: 258 }), (o[2].cache = ""), (o[2].mode = 1), e || (this.stop = 1)),
        -2 === t && (n.setUint8(17, 254 & n.getUint8(17)), 2 === o[2].mode && this.Glk.glk_stream_close(o[2].str), (o[2].mode = this.io.transcript = 0)),
        3 === t && o[3].unshift([i, ""]),
        -3 === t && ((s = o[3].shift()), (r = this.text_to_zscii(s[1])), n.setUint16(s[0], r.length), n.setUint8Array(s[0] + 2, r)),
        4 !== t || o[4].mode || (this.fileref_create_by_prompt({ func: "output_stream", mode: 5, rock: 211, str: 4, unicode: 1, usage: 259 }), (o[4].cache = ""), (o[4].mode = 1), (this.stop = 1)),
        -4 === t && (2 === o[4].mode && this.Glk.glk_stream_close(o[4].str), (o[4].mode = 0));
    },
    output_stream_handler: function (t) {
      var i = this.ram,
        e = this.io.streams,
        s = this.fileref_data;
      2 === s.str &&
        (i.setUint8(17, (254 & i.getUint8(17)) | (t ? 1 : 0)), t ? ((e[2].mode = 2), (e[2].str = t), (this.io.transcript = 1), e[2].cache && this.Glk.glk_put_jstring_stream(e[2].str, e[2].cache)) : (e[2].mode = this.io.transcript = 0)),
        4 === s.str && (t ? ((e[4].mode = 2), (e[4].str = t), e[4].cache && this.Glk.glk_put_jstring_stream(e[4].str, e[4].cache)) : (e[4].mode = 0));
    },
    _print: function (t) {
      var i = this.Glk,
        e = this.io,
        s = 0;
      if (e.streams[3].length) e.streams[3][0][1] += t;
      else if (
        ((t = t.replace(/\r/g, "\n")),
        (1 & this.m.getUint8(17)) !== e.transcript && this.output_stream(e.transcript ? -2 : 2, 0, 1),
        (2 & this.m.getUint8(17)) != (2 & e.mono) && ((e.mono ^= 2), this.format()),
        e.currentwin && this.upperwin)
      )
        for (; s < t.length && e.row < e.height; ) i.glk_put_jstring(t[s++]), e.col++, e.col === e.width && ((e.col = 0), e.row++);
      else e.currentwin || (e.streams[1] && i.glk_put_jstring(t), 1 === e.streams[2].mode && (e.streams[2].cache += t), 2 === e.streams[2].mode && i.glk_put_jstring_stream(e.streams[2].str, t));
    },
    print: function (t, i) {
      var e, s;
      if (
        (0 === t && (s = i),
        1 === t && (s = String.fromCharCode(i)),
        2 === t && (s = this.jit[i] || this.decode(i)),
        3 === t && ((e = this.m.getUint16(this.objects + (this.version3 ? 9 : 14) * i + (this.version3 ? 7 : 12))), (s = this.decode(e + 1, 2 * this.m.getUint8(e)))),
        4 === t)
      ) {
        if (!this.unicode_table[i]) return;
        s = this.unicode_table[i];
      }
      this._print("" + s);
    },
    print_table: function (t, i, e, s) {
      (e = e || 1), (s = s || 0);
      for (var r = 0; r++ < e; ) this._print(this.zscii_to_text(this.m.getUint8Array(t, i)) + (r < e ? "\r" : "")), (t += i + s);
    },
    read: function (t, i, e, s, r) {
      var n,
        o,
        h = this.m.getUint8(i);
      if ((this.version3 && (h++, this.v3_status()), (n = Array(h)).fill(0), (this.read_data = { buffer: n, bufaddr: i, parseaddr: e, routine: r, storer: t, time: s }), this.io.streams[0])) {
        if ((10 === n[(o = this.Glk.glk_get_line_stream_uni(this.io.streams[0], n)) - 1] && o--, o)) return this._print(String.fromCharCode.apply(null, n.slice(0, o)) + "\n"), this.handle_line_input(o), (this.stop = 0);
        this.input_stream(0);
      }
      this.Glk.glk_request_line_event_uni(this.io.currentwin ? this.upperwin : this.mainwin, n, 0), this.fix_upper_window();
    },
    read_char: function (t, i, e, s) {
      if (this.io.streams[0]) {
        var r = this.Glk.glk_get_char_stream_uni(this.io.streams[0]);
        if (-1 !== r) return this.variable(t, r), (this.stop = 0);
        this.input_stream(0);
      }
      (this.read_data = { routine: s, storer: t, time: e }), this.Glk.glk_request_char_event_uni(this.io.currentwin ? this.upperwin : this.mainwin), this.fix_upper_window();
    },
    set_colour: function (t, i) {
      this.set_true_colour(ht[t], ht[i]);
    },
    set_cursor: function (t, i) {
      var e = this.io;
      e.currentwin && (t >= e.height && this.split_window(t + 1), this.upperwin && t >= 0 && i >= 0 && i < e.width && (this.Glk.glk_window_move_cursor(this.upperwin, i, t), (e.row = t), (e.col = i)));
    },
    set_font: function (t) {
      var i = 4 & this.io.mono ? 4 : 1;
      return 0 === t ? i : 1 !== t && 4 !== t ? 0 : (t !== i && ((this.io.mono ^= 4), this.format()), i);
    },
    set_style: function (t) {
      var i = this.io;
      0 === t && ((i.reverse = i.bold = i.italic = 0), (i.mono &= 254)), 1 & t && (i.reverse = 1), 2 & t && (i.bold = 4), 4 & t && (i.italic = 2), 8 & t && (i.mono |= 1), this.format();
    },
    set_true_colour: function (t, i) {
      const e = this.Glk;
      if (e.glk_gestalt(4352, 0)) {
        let s, r;
        65534 === t ? (s = -2) : ((s = 65535 === t ? -1 : ot(t)), (this.io.fg = s)),
          65534 === i ? (r = -2) : ((r = 65535 === i ? -1 : ot(i)), (this.io.bg = r)),
          e.garglk_set_zcolors_stream(this.mainwin.str, s, r),
          this.upperwin && e.garglk_set_zcolors_stream(this.upperwin.str, s, r);
      }
    },
    set_window: function (t) {
      (this.io.currentwin = t), t && this.set_cursor(0, 0), this.Glk.glk_set_window(this.upperwin && t ? this.upperwin : this.mainwin), this.format();
    },
    split_window: function (t) {
      var i,
        e = this.Glk,
        s = this.io,
        r = s.row,
        n = s.col,
        o = s.height;
      if (((s.height = t), this.upperwin && t > o)) {
        for (i = e.glk_window_get_stream(this.upperwin); o < t; ) e.glk_window_move_cursor(this.upperwin, 0, o++), e.glk_put_jstring_stream(i, Array(s.width + 1).join(" "));
        e.glk_window_move_cursor(this.upperwin, n, r);
      }
      t > s.maxheight &&
        ((s.maxheight = t),
        this.upperwin
          ? e.glk_window_set_arrangement(e.glk_window_get_parent(this.upperwin), 18, s.maxheight, null)
          : (this.io.bg >= 0 && e.glk_stylehint_set(4, 0, 8, this.io.bg),
            (this.upperwin = e.glk_window_open(this.mainwin, 18, s.maxheight, 4, 203)),
            e.garglk_set_zcolors_stream(this.upperwin.str, this.io.fg, this.io.bg),
            e.glk_stylehint_clear(4, 0, 8)),
        (s.glkheight = s.maxheight)),
        t && (s.row >= t && this.set_cursor(0, 0), this.version3 && e.glk_window_clear(this.upperwin));
    },
    update_header: function () {
      var t = this.ram;
      if (((this.xorshift_seed = 0), this.update_screen_size(), this.version3)) return t.setUint8(1, (143 & t.getUint8(1)) | (this.statuswin ? 32 : 16) | 64);
      t.setUint8(1, 28 | (this.Glk.glk_gestalt(4352, 0) ? 1 : 0)), t.setUint8(17, 87 & t.getUint8(17)), this.version > 4 && t.setUint16(38, 257), t.setUint16(50, 258), this.extension_table(4, 0);
    },
    update_screen_size: function () {
      const t = this.Glk,
        i = new t.RefBox(),
        e = new t.RefBox(),
        s = t.glk_window_open(this.mainwin, 18, 0, 4, 0);
      let r = 0,
        n = 0;
      t.glk_window_get_size(this.mainwin, e, i),
        (r = i.get_value()),
        this.upperwin && (t.glk_window_get_size(this.upperwin, e, i), (r += i.get_value())),
        this.statuswin && (t.glk_window_get_size(this.statuswin, e, i), (r += i.get_value())),
        s && (t.glk_window_get_size(s, e, 0), t.glk_window_close(s)),
        (n = e.get_value()),
        (r = Math.min(r, 254)),
        (n = this.io.width = Math.min(n, 255)),
        this.version > 3 && (this.ram.setUint8(32, r), this.ram.setUint8(33, n)),
        this.version > 4 && (this.ram.setUint16(34, n), this.ram.setUint16(36, r)),
        this.io.col >= n && (this.io.col = n - 1);
    },
    v3_status: function () {
      if (this.statuswin) {
        var t,
          i = this.Glk,
          e = i.glk_window_get_stream(this.statuswin),
          s = this.m,
          r = this.io.width,
          n = s.getUint16(this.globals + 2),
          o = s.getUint16(this.globals + 4),
          h = s.getUint16(this.objects + 9 * s.getUint16(this.globals) + 7),
          a = "" + this.decode(h + 1, 2 * s.getUint8(h));
        (t = 2 & s.getUint8(1) ? "Time: " + (n % 12 == 0 ? 12 : n % 12) + ":" + (o < 10 ? "0" : "") + o + " " + (n > 11 ? "PM" : "AM") : "Score: " + n + "  Turns: " + o),
          i.glk_window_move_cursor(this.statuswin, 0, 0),
          i.glk_put_jstring_stream(e, Array(r + 1).join(" ")),
          i.glk_window_move_cursor(this.statuswin, 0, 0),
          i.glk_put_jstring_stream(e, " " + a.slice(0, r - t.length - 4)),
          i.glk_window_move_cursor(this.statuswin, r - t.length - 1, 0),
          i.glk_put_jstring_stream(e, t);
      }
    },
  },
  ct = {
    disassemble: function () {
      var t,
        i,
        e,
        s,
        r,
        n,
        o,
        h = this.m,
        a = this.opcodes,
        u = new S.RoutineContext(this, this.pc);
      function c(t, i) {
        for (var e = 0; e < 4; e++) i.push((192 & t) >> 6), (t <<= 2);
      }
      for (;;) {
        if (
          ((i = t = this.pc),
          190 === (s = h.getUint8(t++)) ? ((n = -1), (s = h.getUint8(t++) + 1e3)) : 128 & s ? (64 & s ? ((n = -1), 32 & s || (s &= 31)) : (n = [(48 & s) >> 4])[0] < 3 && (s &= 207)) : ((n = [64 & s ? 2 : 1, 32 & s ? 2 : 1]), (s &= 31)),
          !a[s])
        )
          throw (this.log("" + u), (this.stop = 1), new Error("Unknown opcode #" + s + " at pc=" + i));
        for (r = a[s].prototype, -1 === n && ((n = []), c(h.getUint8(t++), n), (236 !== s && 250 !== s) || c(h.getUint8(t++), n)), o = [], e = 0; e < n.length; )
          0 === n[e] && (o.push(new S.Operand(this, h.getUint16(t))), (t += 2)), 1 === n[e] && o.push(new S.Operand(this, h.getUint8(t++))), 2 === n[e++] && o.push(new S.Variable(this, h.getUint8(t++)));
        if ((r.storer && o.push(new S.Variable(this, h.getUint8(t++))), r.brancher && ((e = h.getUint8(t++)), o.push([128 & e, 64 & e ? 63 & e : (((e << 8) | h.getUint8(t++)) << 18) >> 18])), r.printer))
          for (o.push(t); t < this.eof && ((e = h.getUint8(t)), (t += 2), !(128 & e)); );
        if (((this.pc = t), u.ops.push(new a[s](this, u, s, i, t, o)), (e = 0), r.stopper && !e)) break;
      }
      return u;
    },
  },
  lt = { stack_len: 1e5, undo_len: 1e6 },
  ft = {
    init: function () {
      (this.jit = {}), (this.init = this.start);
    },
    prepare: function (t, i) {
      if (!i.Glk) throw new Error("A reference to Glk is required");
      (this.Glk = i.Glk), (this.data = t), (this.options = s.extend({}, lt, i));
    },
    start: function () {
      var t,
        i = this.Glk;
      try {
        if (((t = a.identify(this.data)), delete this.data, !t || "ZCOD" !== t.format)) throw new Error("This is not a Z-Code file");
        if ([3, 4, 5, 8].indexOf(t.version) < 0) throw new Error("Unsupported Z-Machine version: " + t.version);
        (this.m = s.MemoryView(t.data)), (this.staticmem = this.m.getUint16(14)), (this.ram = s.MemoryView(this.m, 0, this.staticmem)), (this.origram = this.m.getUint8Array(0, this.staticmem));
        let e,
          r = "",
          n = 0;
        for (; n < 30; ) r += (this.origram[n] < 16 ? "0" : "") + this.origram[n++].toString(16);
        this.signature = r;
        const o = this.options.Dialog;
        if (o)
          if (this.options.clear_vm_autosave) o.autosave_write(r, null);
          else if (this.options.do_vm_autosave)
            try {
              const t = o.autosave_read(r);
              t && (this.do_autorestore(t), (e = 1));
            } catch (t) {
              this.log("Autorestore failed, deleting it: " + t), o.autosave_write(r, null);
            }
        e || (this.restart(), this.run()), this.quit || ((this.glk_event = new i.RefStruct()), this.glk_blocking_call ? this.glk_event.push_field(this.glk_blocking_call) : i.glk_select(this.glk_event)), i.update();
      } catch (t) {
        i.fatal_error(t), console.log(t);
      }
    },
    resume: function (t) {
      var i,
        e,
        s = this.Glk,
        r = this.glk_event;
      try {
        2 === (i = r.get_field(0)) && (this.handle_char_input(r.get_field(2)), (e = 1)),
          3 === i && (this.handle_line_input(r.get_field(2), r.get_field(3)), (e = 1)),
          5 === i && this.update_screen_size(),
          "fileref_create_by_prompt" === i && (e = this.handle_create_fileref(t)),
          (this.glk_blocking_call = null),
          e && this.run(),
          this.quit || ((this.glk_event = new s.RefStruct()), this.glk_blocking_call ? this.glk_event.push_field(this.glk_blocking_call) : s.glk_select(this.glk_event)),
          s.update();
      } catch (t) {
        s.fatal_error(t), console.log(t);
      }
    },
    get_signature: function () {
      return this.signature;
    },
    run: function () {
      var t, i;
      for (this.stop = 0; !this.stop; ) (t = this.pc), this.jit[t] || this.compile(), (i = this.jit[t](this)), isNaN(i) || this.ret(i);
    },
    compile: function () {
      var t = this.disassemble();
      (this.jit[t.pc] = new Function("e", "" + t)), t.pc < this.staticmem && this.log("Caching a JIT function in dynamic memory: " + t.pc);
    },
  },
  _t = s.Class.subClass(s.extend(ft, it, et, ut, ct)),
  gt =
    ((function (t) {
      const i = { serialize: () => ({}) };
      class e {
        constructor() {
          (this.class_map = { fileref: {}, stream: {}, window: {} }), (this.last_used_id = 101);
        }
        check_autosave() {
          return !this.vm.glk_blocking_call;
        }
        class_obj_from_id(t, i) {
          return this.class_map[t][i];
        }
        class_register(t, i, e) {
          if (e) {
            if (i.disprock !== e) throw new Error("class_register: object is not already registered");
            this.last_used_id <= e && (this.last_used_id = e + 1);
          } else {
            if (i.disprock) throw new Error("class_register: object is already registered");
            i.disprock = this.last_used_id++;
          }
          this.class_map[t][i.disprock] = i;
        }
        class_unregister(t, i) {
          if (!i.disprock || null == this.class_map[t][i.disprock]) throw new Error("class_unregister: object is not registered");
          delete this.class_map[t][i.disprock], (i.disprock = null);
        }
        get_retained_array(t) {
          return { arg: i, arr: t.slice(), len: t.length };
        }
        prepare_resume() {}
        retain_array() {}
        set_vm(t) {
          this.vm = t;
        }
        unretain_array() {}
      }
      t.exports && (t.exports = e), "undefined" != typeof window && (window.GiDispa = new e());
    })((at = { exports: {} }), at.exports),
    at.exports);
export { _t as ZVM, gt as ZVMDispatch };
