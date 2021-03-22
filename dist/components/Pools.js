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
import Pool from './Pool';
export default (function (props) {
    var pools = props.pools;
    return (_jsx("section", __assign({ className: "f_pools" }, { children: _jsxs("div", __assign({ className: "container_wrap" }, { children: [_jsx("div", __assign({ className: "f_pools_wrap " }, { children: _jsx("h2", __assign({ className: "pools-title" }, { children: "Pools in Voting" }), void 0) }), void 0),
                _jsx("div", __assign({ className: "pools_blocks-wrap" }, { children: pools.map(function (pool) { return _jsx(Pool, { pool: pool }, void 0); }) }), void 0)] }), void 0) }), void 0));
});
