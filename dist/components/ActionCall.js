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
export default (function (props) {
    var top = props.top;
    return (_jsx("div", { children: top ?
            _jsx("section", __assign({ className: "top_section" }, { children: _jsxs("div", __assign({ className: "container" }, { children: [_jsxs("div", __assign({ className: "header_title" }, { children: [_jsxs("h1", { children: ["Community ", _jsx("span", { children: "Governed Fund" }, void 0), "Raising For Chain"] }, void 0),
                                _jsx("p", { children: "Filter through the messy landscape where rugs overshadow the great potential." }, void 0)] }), void 0),
                        _jsxs("div", __assign({ className: "header_btns" }, { children: [_jsx("button", __assign({ className: "btn" }, { children: "View pools" }), void 0),
                                _jsx("button", __assign({ className: "btn btn_scnd" }, { children: "Get Started" }), void 0)] }), void 0)] }), void 0) }), void 0) :
            _jsx("section", __assign({ className: "btm_section" }, { children: _jsxs("div", __assign({ className: "container" }, { children: [_jsxs("div", __assign({ className: "header_title" }, { children: [_jsxs("h1", { children: ["Subscribe to ", _jsx("span", { children: "Get Alerts" }, void 0), "For New Pools"] }, void 0),
                                _jsx("p", { children: "Subscribe to get notified about new pools and other relevant events." }, void 0)] }), void 0),
                        _jsx("div", __assign({ className: "header_btns" }, { children: _jsx("button", __assign({ className: "btn" }, { children: "View pools" }), void 0) }), void 0)] }), void 0) }), void 0) }, void 0));
});
