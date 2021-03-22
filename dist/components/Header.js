var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default (function () {
    return (_jsx("header", __assign({ className: "header top_bg" }, { children: _jsx("div", __assign({ className: "container_wrap" }, { children: _jsxs("div", __assign({ className: "header_top" }, { children: [_jsx("div", __assign({ className: "header_logo" }, { children: _jsx("img", { src: "img/logo.png", alt: "img" }, void 0) }), void 0),
                    _jsxs("div", __assign({ className: "header_links" }, { children: [_jsx("a", __assign({ href: "#" }, { children: "Pools" }), void 0),
                            _jsx("a", __assign({ href: "" }, { children: "Connect wallet" }), void 0),
                            _jsx("button", { children: "Login" }, void 0)] }), void 0)] }), void 0) }), void 0) }), void 0));
});
