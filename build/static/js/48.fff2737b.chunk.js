(this["webpackJsonpmentor-lead"]=this["webpackJsonpmentor-lead"]||[]).push([[48],{1201:function(e,t,a){"use strict";a.r(t);var n=a(7),r=a(659),c=a(179),i=a(290),o=a(80),s=a(14),l=a(902),d=a.n(l),u=a(903),b=a.n(u),j=a(686),p=a.n(j),m=a(489),O=a(6),v=a(4),f=a(1),h=a.n(f),x=a(8),g=a(98),y=a(5),k=a(15),C=a(578),M=a(183),I=a(2),w=["className"],S=Object(y.a)("div",{name:"MuiListItemIcon",slot:"Root",overridesResolver:function(e,t){var a=e.ownerState;return[t.root,"flex-start"===a.alignItems&&t.alignItemsFlexStart]}})((function(e){var t=e.theme,a=e.ownerState;return Object(v.a)({minWidth:56,color:(t.vars||t).palette.action.active,flexShrink:0,display:"inline-flex"},"flex-start"===a.alignItems&&{marginTop:8})})),L=f.forwardRef((function(e,t){var a=Object(k.a)({props:e,name:"MuiListItemIcon"}),n=a.className,r=Object(O.a)(a,w),c=f.useContext(M.a),i=Object(v.a)({},a,{alignItems:c.alignItems}),o=function(e){var t=e.alignItems,a=e.classes,n={root:["root","flex-start"===t&&"alignItemsFlexStart"]};return Object(g.a)(n,C.b,a)}(i);return Object(I.jsx)(S,Object(v.a)({className:Object(x.a)(o.root,n),ownerState:i,ref:t},r))})),T=a(1153),B=a(284),H=a(581),R=Object(c.a)(H.a)((function(e){var t=e.theme;return{"&:focus":{backgroundColor:t.palette.primary.main,"& .MuiListItemIcon-root, & .MuiListItemText-primary":{color:t.palette.common.white}}}}));var z=function(){var e=h.a.useState(null),t=Object(s.a)(e,2),a=t[0],n=t[1];return Object(I.jsxs)("div",{children:[Object(I.jsx)(m.a,{color:"primary",variant:"contained","aria-haspopup":"true",onClick:function(e){n(e.currentTarget)},"aria-owns":a?"simple-menu":void 0,children:"Open Menu"}),Object(I.jsxs)(B.a,{elevation:0,id:"simple-menu",anchorEl:a,onClose:function(){n(null)},open:Boolean(a),getContentAnchorEl:null,anchorOrigin:{vertical:"bottom",horizontal:"center"},transformOrigin:{vertical:"top",horizontal:"center"},sx:{border:"1px solid #d3d4d5"},children:[Object(I.jsxs)(R,{children:[Object(I.jsx)(L,{children:Object(I.jsx)(p.a,{})}),Object(I.jsx)(T.a,{primary:"Sent mail"})]}),Object(I.jsxs)(R,{children:[Object(I.jsx)(L,{children:Object(I.jsx)(d.a,{})}),Object(I.jsx)(T.a,{primary:"Drafts"})]}),Object(I.jsxs)(R,{children:[Object(I.jsx)(L,{children:Object(I.jsx)(b.a,{})}),Object(I.jsx)(T.a,{primary:"Inbox"})]})]})]})},P=a(288),V=a(547),G=a(291),N=["None","Atria","Callisto","Dione","Ganymede","Hangouts Call","Luna","Oberon","Phobos","Pyxis","Sedna","Titania","Triton","Umbriel"];var D=function(){var e=h.a.useState(null),t=Object(s.a)(e,2),a=t[0],n=t[1],r=Boolean(a);function c(){n(null)}return Object(I.jsxs)(P.a,{children:[Object(I.jsx)(V.a,{"aria-label":"More","aria-owns":r?"long-menu":void 0,"aria-haspopup":"true",onClick:function(e){n(e.currentTarget)},children:Object(I.jsx)(G.a,{children:"more_vert"})}),Object(I.jsx)(B.a,{open:r,id:"long-menu",anchorEl:a,onClose:c,PaperProps:{style:{maxHeight:216,width:200}},children:N.map((function(e){return Object(I.jsx)(H.a,{selected:"Pyxis"===e,onClick:c,children:e},e)}))})]})},_=a(548),E=a(1205),F=Object(c.a)("div")((function(e){return{width:"100%",maxWidth:360,backgroundColor:e.theme.palette.background.paper}})),W=["Show some love to Material-UI","Show all notification content","Hide sensitive notification content","Hide all notification content"];function A(){var e=h.a.useState(null),t=Object(s.a)(e,2),a=t[0],n=t[1],r=h.a.useState(1),c=Object(s.a)(r,2),i=c[0],o=c[1];return Object(I.jsxs)(F,{children:[Object(I.jsx)(_.a,{component:"nav","aria-label":"Device settings",children:Object(I.jsx)(E.a,{button:!0,"aria-haspopup":"true","aria-controls":"lock-menu","aria-label":"When device is locked",onClick:function(e){n(e.currentTarget)},children:Object(I.jsx)(T.a,{primary:"When device is locked",secondary:W[i]})})}),Object(I.jsx)(B.a,{id:"lock-menu",anchorEl:a,keepMounted:!0,open:Boolean(a),onClose:function(){n(null)},children:W.map((function(e,t){return Object(I.jsx)(H.a,{disabled:0===t,selected:t===i,onClick:function(e){return function(e,t){o(t),n(null)}(0,t)},children:e},e)}))})]})}var J=function(){var e=h.a.useState(null),t=Object(s.a)(e,2),a=t[0],n=t[1];function r(){n(null)}return Object(I.jsxs)(P.a,{children:[Object(I.jsx)(m.a,{variant:"outlined","aria-haspopup":"true",onClick:function(e){n(e.currentTarget)},"aria-owns":a?"simple-menu":void 0,children:"Open Menu"}),Object(I.jsxs)(B.a,{id:"simple-menu",anchorEl:a,open:Boolean(a),onClose:r,children:[Object(I.jsx)(H.a,{onClick:r,children:"Profile"}),Object(I.jsx)(H.a,{onClick:r,children:"My account"}),Object(I.jsx)(H.a,{onClick:r,children:"Logout"})]})]})},U=Object(c.a)("div")((function(e){var t,a=e.theme;return t={margin:"30px"},Object(n.a)(t,a.breakpoints.down("sm"),{margin:16}),Object(n.a)(t,"& .breadcrumb",Object(n.a)({marginBottom:"30px"},a.breakpoints.down("sm"),{marginBottom:16})),t}));t.default=function(){return Object(I.jsxs)(U,{children:[Object(I.jsx)(i.a,{className:"breadcrumb",children:Object(I.jsx)(o.a,{routeSegments:[{name:"Material",path:"/material"},{name:"Menu"}]})}),Object(I.jsxs)(r.a,{spacing:3,children:[Object(I.jsx)(o.k,{title:"simple menu",children:Object(I.jsx)(J,{})}),Object(I.jsx)(o.k,{title:"selected menu",children:Object(I.jsx)(A,{})}),Object(I.jsx)(o.k,{title:"customized menu",children:Object(I.jsx)(z,{})}),Object(I.jsx)(o.k,{title:"max height menu",children:Object(I.jsx)(D,{})})]})]})}},558:function(e,t,a){"use strict";var n=a(289);t.a=n.a},560:function(e,t,a){"use strict";var n=a(535);t.a=n.a},577:function(e,t,a){"use strict";a.d(t,"b",(function(){return c}));var n=a(60),r=a(70);function c(e){return Object(n.a)("MuiListItemText",e)}var i=Object(r.a)("MuiListItemText",["root","multiline","dense","inset","primary","secondary"]);t.a=i},578:function(e,t,a){"use strict";a.d(t,"b",(function(){return c}));var n=a(60),r=a(70);function c(e){return Object(n.a)("MuiListItemIcon",e)}var i=Object(r.a)("MuiListItemIcon",["root","alignItemsFlexStart"]);t.a=i},581:function(e,t,a){"use strict";var n=a(7),r=a(6),c=a(4),i=a(1),o=a(8),s=a(98),l=a(470),d=a(5),u=a(15),b=a(183),j=a(542),p=a(61),m=a(28),O=a(279),v=a(578),f=a(577),h=a(60),x=a(70);function g(e){return Object(h.a)("MuiMenuItem",e)}var y=Object(x.a)("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]),k=a(2),C=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex"],M=Object(d.a)(j.a,{shouldForwardProp:function(e){return Object(d.b)(e)||"classes"===e},name:"MuiMenuItem",slot:"Root",overridesResolver:function(e,t){var a=e.ownerState;return[t.root,a.dense&&t.dense,a.divider&&t.divider,!a.disableGutters&&t.gutters]}})((function(e){var t,a=e.theme,r=e.ownerState;return Object(c.a)({},a.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!r.disableGutters&&{paddingLeft:16,paddingRight:16},r.divider&&{borderBottom:"1px solid ".concat((a.vars||a).palette.divider),backgroundClip:"padding-box"},(t={"&:hover":{textDecoration:"none",backgroundColor:(a.vars||a).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}}},Object(n.a)(t,"&.".concat(y.selected),Object(n.a)({backgroundColor:a.vars?"rgba(".concat(a.vars.palette.primary.mainChannel," / ").concat(a.vars.palette.action.selectedOpacity,")"):Object(l.a)(a.palette.primary.main,a.palette.action.selectedOpacity)},"&.".concat(y.focusVisible),{backgroundColor:a.vars?"rgba(".concat(a.vars.palette.primary.mainChannel," / calc(").concat(a.vars.palette.action.selectedOpacity," + ").concat(a.vars.palette.action.focusOpacity,"))"):Object(l.a)(a.palette.primary.main,a.palette.action.selectedOpacity+a.palette.action.focusOpacity)})),Object(n.a)(t,"&.".concat(y.selected,":hover"),{backgroundColor:a.vars?"rgba(".concat(a.vars.palette.primary.mainChannel," / calc(").concat(a.vars.palette.action.selectedOpacity," + ").concat(a.vars.palette.action.hoverOpacity,"))"):Object(l.a)(a.palette.primary.main,a.palette.action.selectedOpacity+a.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:a.vars?"rgba(".concat(a.vars.palette.primary.mainChannel," / ").concat(a.vars.palette.action.selectedOpacity,")"):Object(l.a)(a.palette.primary.main,a.palette.action.selectedOpacity)}}),Object(n.a)(t,"&.".concat(y.focusVisible),{backgroundColor:(a.vars||a).palette.action.focus}),Object(n.a)(t,"&.".concat(y.disabled),{opacity:(a.vars||a).palette.action.disabledOpacity}),Object(n.a)(t,"& + .".concat(O.a.root),{marginTop:a.spacing(1),marginBottom:a.spacing(1)}),Object(n.a)(t,"& + .".concat(O.a.inset),{marginLeft:52}),Object(n.a)(t,"& .".concat(f.a.root),{marginTop:0,marginBottom:0}),Object(n.a)(t,"& .".concat(f.a.inset),{paddingLeft:36}),Object(n.a)(t,"& .".concat(v.a.root),{minWidth:36}),t),!r.dense&&Object(n.a)({},a.breakpoints.up("sm"),{minHeight:"auto"}),r.dense&&Object(c.a)({minHeight:32,paddingTop:4,paddingBottom:4},a.typography.body2,Object(n.a)({},"& .".concat(v.a.root," svg"),{fontSize:"1.25rem"})))})),I=i.forwardRef((function(e,t){var a=Object(u.a)({props:e,name:"MuiMenuItem"}),n=a.autoFocus,l=void 0!==n&&n,d=a.component,j=void 0===d?"li":d,O=a.dense,v=void 0!==O&&O,f=a.divider,h=void 0!==f&&f,x=a.disableGutters,y=void 0!==x&&x,I=a.focusVisibleClassName,w=a.role,S=void 0===w?"menuitem":w,L=a.tabIndex,T=Object(r.a)(a,C),B=i.useContext(b.a),H={dense:v||B.dense||!1,disableGutters:y},R=i.useRef(null);Object(p.a)((function(){l&&R.current&&R.current.focus()}),[l]);var z,P=Object(c.a)({},a,{dense:H.dense,divider:h,disableGutters:y}),V=function(e){var t=e.disabled,a=e.dense,n=e.divider,r=e.disableGutters,i=e.selected,o=e.classes,l={root:["root",a&&"dense",t&&"disabled",!r&&"gutters",n&&"divider",i&&"selected"]},d=Object(s.a)(l,g,o);return Object(c.a)({},o,d)}(a),G=Object(m.a)(R,t);return a.disabled||(z=void 0!==L?L:-1),Object(k.jsx)(b.a.Provider,{value:H,children:Object(k.jsx)(M,Object(c.a)({ref:G,role:S,tabIndex:z,component:j,focusVisibleClassName:Object(o.a)(V.focusVisible,I)},T,{ownerState:P,classes:V}))})}));t.a=I},659:function(e,t,a){"use strict";var n=a(7),r=a(6),c=a(4),i=a(1),o=a(35),s=a(39),l=a(473),d=a(116),u=a(5),b=a(15),j=a(2),p=["component","direction","spacing","divider","children"];function m(e,t){var a=i.Children.toArray(e).filter(Boolean);return a.reduce((function(e,n,r){return e.push(n),r<a.length-1&&e.push(i.cloneElement(t,{key:"separator-".concat(r)})),e}),[])}var O=Object(u.a)("div",{name:"MuiStack",slot:"Root",overridesResolver:function(e,t){return[t.root]}})((function(e){var t=e.ownerState,a=e.theme,r=Object(c.a)({display:"flex"},Object(o.b)({theme:a},Object(o.d)({values:t.direction,breakpoints:a.breakpoints.values}),(function(e){return{flexDirection:e}})));if(t.spacing){var i=Object(s.a)(a),l=Object.keys(a.breakpoints.values).reduce((function(e,a){return("object"===typeof t.spacing&&null!=t.spacing[a]||"object"===typeof t.direction&&null!=t.direction[a])&&(e[a]=!0),e}),{}),u=Object(o.d)({values:t.direction,base:l}),b=Object(o.d)({values:t.spacing,base:l});r=Object(d.a)(r,Object(o.b)({theme:a},b,(function(e,a){return{"& > :not(style) + :not(style)":Object(n.a)({margin:0},"margin".concat((r=a?u[a]:t.direction,{row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"}[r])),Object(s.d)(i,e))};var r})))}return r})),v=i.forwardRef((function(e,t){var a=Object(b.a)({props:e,name:"MuiStack"}),n=Object(l.a)(a),i=n.component,o=void 0===i?"div":i,s=n.direction,d=void 0===s?"column":s,u=n.spacing,v=void 0===u?0:u,f=n.divider,h=n.children,x=Object(r.a)(n,p),g={direction:d,spacing:v};return Object(j.jsx)(O,Object(c.a)({as:o,ownerState:g,ref:t},x,{children:f?m(h,f):h}))}));t.a=v},686:function(e,t,a){"use strict";var n=a(555);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(556)),c=a(2),i=(0,r.default)((0,c.jsx)("path",{d:"M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"}),"Send");t.default=i},902:function(e,t,a){"use strict";var n=a(555);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(556)),c=a(2),i=(0,r.default)((0,c.jsx)("path",{d:"M21.99 8c0-.72-.37-1.35-.94-1.7L12 1 2.95 6.3C2.38 6.65 2 7.28 2 8v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2l-.01-10zM12 13 3.74 7.84 12 3l8.26 4.84L12 13z"}),"Drafts");t.default=i},903:function(e,t,a){"use strict";var n=a(555);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(556)),c=a(2),i=(0,r.default)((0,c.jsx)("path",{d:"M19 3H4.99c-1.11 0-1.98.9-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10zm-3-5h-2V7h-4v3H8l4 4 4-4z"}),"MoveToInbox");t.default=i}}]);
//# sourceMappingURL=48.fff2737b.chunk.js.map