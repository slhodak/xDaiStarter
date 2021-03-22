import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Header from './Header';
import Footer from './Footer';
import ActionCall from './ActionCall';
import Pools from './Pools';
var testPools = ['a', 'b', 'c'];
export default (function () {
    return (_jsxs("div", { children: [_jsx(Header, {}, void 0),
            _jsx(ActionCall, { top: true }, void 0),
            _jsx(Pools, { pools: testPools }, void 0),
            _jsx(ActionCall, { top: false }, void 0),
            _jsx(Footer, {}, void 0)] }, void 0));
});
