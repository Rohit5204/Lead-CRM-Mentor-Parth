(this["webpackJsonpmentor-lead"]=this["webpackJsonpmentor-lead"]||[]).push([[84],{1194:function(e,n,t){"use strict";t.r(n);var c=t(7),a=t(5),i=t(288),s=t(659),o=t(80),r=t(11),l=t(14),j=t(660),b=t.n(j),d=t(547),O=t(489),u=t(1223),h=t(179),m=t(1),x=t.n(m),g=t(2),k=Object(h.a)(d.a)((function(e){return{padding:e.theme.spacing(.5)}})),p=function(){var e=Object(m.useState)([]),n=Object(l.a)(e,2),t=n[0],c=n[1],a=Object(m.useState)(!1),s=Object(l.a)(a,2),o=s[0],j=s[1],d=Object(m.useState)({}),h=Object(l.a)(d,2),x=h[0],p=h[1],v=function(e){return function(){c((function(n){return[].concat(Object(r.a)(n),[{message:e,key:(new Date).getTime()}])})),o?j(!1):f()}},f=function(){t.length>0&&(p(t.shift()),j(!0))},C=function(e,n){"clickaway"!==n&&j(!1)};return Object(g.jsxs)(i.a,{children:[Object(g.jsx)(O.a,{onClick:v("Message A"),children:"Show message A"}),Object(g.jsx)(O.a,{onClick:v("Message B"),children:"Show message B"}),Object(g.jsx)(u.a,{open:o,onClose:C,autoHideDuration:6e3,onExited:function(){return f()},ContentProps:{"aria-describedby":"message-id"},anchorOrigin:{vertical:"bottom",horizontal:"left"},message:Object(g.jsx)("span",{id:"message-id",children:x.message}),action:[Object(g.jsx)(O.a,{color:"secondary",size:"small",onClick:C,children:"UNDO"},"undo"),Object(g.jsx)(k,{color:"inherit","aria-label":"Close",onClick:C,children:Object(g.jsx)(b.a,{})},"close")]},x.key)]})},v=t(1199),f=t(79),C=t(1155),y=Object(h.a)("div")((function(e){var n=e.theme;return{"& .icon":{fontSize:20},"& .success":{backgroundColor:f.a[600]},"& .warning":{backgroundColor:C.a[700]},"& .error":{backgroundColor:n.palette.error.main},"& .info":{backgroundColor:n.palette.primary.main},"& .iconVariant":{opacity:.9,marginRight:n.spacing(1)},"& .message":{display:"flex",alignItems:"center"},"& .margin":{margin:n.spacing(1)}}}));function w(){var e=x.a.useState(!1),n=Object(l.a)(e,2),t=n[0],c=n[1];function a(e,n){"clickaway"!==n&&c(!1)}return Object(g.jsxs)(y,{children:[Object(g.jsx)(O.a,{variant:"outlined",className:"margin",onClick:function(){c(!0)},children:"Open success snackbar"}),Object(g.jsx)(u.a,{open:t,autoHideDuration:6e3,onClose:a,children:Object(g.jsx)(v.a,{onClose:a,severity:"success",sx:{width:"100%"},variant:"filled",children:"This is a success message!"})}),Object(g.jsx)(v.a,{onClose:a,sx:{m:1},severity:"error",variant:"filled",children:"This is an error message!"}),Object(g.jsx)(v.a,{onClose:a,sx:{m:1},severity:"warning",variant:"filled",children:"This is a warning message!"}),Object(g.jsx)(v.a,{onClose:a,sx:{m:1},severity:"info",variant:"filled",children:"This is an information message!"}),Object(g.jsx)(v.a,{onClose:a,sx:{m:1},severity:"success",variant:"filled",children:"This is a success message!"})]})}var S=t(9),I=t(888);function T(e){return Object(g.jsx)(I.a,Object(S.a)(Object(S.a)({},e),{},{direction:"left"}))}function z(e){return Object(g.jsx)(I.a,Object(S.a)(Object(S.a)({},e),{},{direction:"up"}))}function N(e){return Object(g.jsx)(I.a,Object(S.a)(Object(S.a)({},e),{},{direction:"right"}))}function B(e){return Object(g.jsx)(I.a,Object(S.a)(Object(S.a)({},e),{},{direction:"down"}))}var D=function(){var e=Object(m.useState)(!1),n=Object(l.a)(e,2),t=n[0],c=n[1],a=Object(m.useState)(void 0),s=Object(l.a)(a,2),o=s[0],r=s[1],j=function(e){return function(){c(!0),r((function(){return e}))}};return Object(g.jsxs)(i.a,{children:[Object(g.jsx)(O.a,{onClick:j(T),children:"Right"}),Object(g.jsx)(O.a,{onClick:j(z),children:"Up"}),Object(g.jsx)(O.a,{onClick:j(N),children:"Left"}),Object(g.jsx)(O.a,{onClick:j(B),children:"Down"}),Object(g.jsx)(u.a,{open:t,onClose:function(){return c(!1)},TransitionComponent:o,ContentProps:{"aria-describedby":"message-id"},message:Object(g.jsx)("span",{id:"message-id",children:"I love snacks"})})]})},P=t(1224),R=Object(g.jsx)(O.a,{color:"secondary",size:"small",children:"lorem ipsum dolorem"}),H=Object(a.a)("div")((function(e){return{maxWidth:600,"& .snackbar":{margin:e.theme.spacing(1)}}}));function L(){return Object(g.jsxs)(H,{children:[Object(g.jsx)(P.a,{className:"snackbar",message:"I love snacks.",action:R}),Object(g.jsx)(P.a,{className:"snackbar",message:"I love candy. I love cookies. I love cupcakes.           I love cheesecake. I love chocolate."}),Object(g.jsx)(P.a,{className:"snackbar",message:"I love candy. I love cookies. I love cupcakes.",action:R}),Object(g.jsx)(P.a,{className:"snackbar",message:"I love candy. I love cookies. I love cupcakes.           I love cheesecake. I love chocolate.",action:R})]})}function M(){var e=x.a.useState({open:!1,vertical:"top",horizontal:"center"}),n=Object(l.a)(e,2),t=n[0],c=n[1],a=t.vertical,s=t.horizontal,o=t.open,r=function(e){return function(){c(Object(S.a)({open:!0},e))}};return Object(g.jsxs)(i.a,{children:[Object(g.jsx)(O.a,{onClick:r({vertical:"top",horizontal:"center"}),children:"Top-Center"}),Object(g.jsx)(O.a,{onClick:r({vertical:"top",horizontal:"right"}),children:"Top-Right"}),Object(g.jsx)(O.a,{onClick:r({vertical:"bottom",horizontal:"right"}),children:"Bottom-Right"}),Object(g.jsx)(O.a,{onClick:r({vertical:"bottom",horizontal:"center"}),children:"Bottom-Center"}),Object(g.jsx)(O.a,{onClick:r({vertical:"bottom",horizontal:"left"}),children:"Bottom-Left"}),Object(g.jsx)(O.a,{onClick:r({vertical:"top",horizontal:"left"}),children:"Top-Left"}),Object(g.jsx)(u.a,{open:o,onClose:function(){c(Object(S.a)(Object(S.a)({},t),{},{open:!1}))},anchorOrigin:{vertical:a,horizontal:s},ContentProps:{"aria-describedby":"message-id"},message:Object(g.jsx)("span",{id:"message-id",children:"I love snacks"})},"".concat(a,",").concat(s))]})}var U=t(31);function A(){var e=Object(U.a)(),n=Object(m.useState)(!1),t=Object(l.a)(n,2),c=t[0],a=t[1];function s(e,n){"clickaway"!==n&&a(!1)}return Object(g.jsxs)(i.a,{children:[Object(g.jsx)(O.a,{onClick:function(){a(!0)},children:"Open simple snackbar"}),Object(g.jsx)(u.a,{anchorOrigin:{vertical:"bottom",horizontal:"left"},open:c,autoHideDuration:6e3,onClose:s,ContentProps:{"aria-describedby":"message-id"},message:Object(g.jsx)("span",{id:"message-id",children:"Note archived"}),action:[Object(g.jsx)(O.a,{color:"secondary",size:"small",onClick:s,children:"UNDO"},"undo"),Object(g.jsx)(d.a,{"aria-label":"Close",color:"inherit",onClick:s,sx:{padding:e.spacing(.5)},children:Object(g.jsx)(b.a,{})},"close")]})]})}var F=t(912);function J(){var e,n=Object(F.b)().enqueueSnackbar;return Object(g.jsxs)(x.a.Fragment,{children:[Object(g.jsx)(O.a,{onClick:function(){return n("I love snacks.")},children:"Show snackbar"}),Object(g.jsx)(O.a,{onClick:(e="warning",function(){n("This is a warning message!",{variant:e})}),children:"Show warning snackbar"})]})}function q(){return Object(g.jsx)(F.a,{maxSnack:3,children:Object(g.jsx)(J,{})})}var E=t(538),G=t(483);function V(e){return Object(g.jsx)(I.a,Object(S.a)(Object(S.a)({},e),{},{direction:"up"}))}function W(e){return Object(g.jsx)(E.a,Object(S.a)({},e))}function K(){var e=x.a.useState({open:!1,Transition:G.a}),n=Object(l.a)(e,2),t=n[0],c=n[1],a=function(e){return function(){c({open:!0,Transition:e})}};return Object(g.jsxs)("div",{children:[Object(g.jsx)(O.a,{onClick:a(W),children:"Grow Transition"}),Object(g.jsx)(O.a,{onClick:a(G.a),children:"Fade Transition"}),Object(g.jsx)(O.a,{onClick:a(V),children:"Slide Transition"}),Object(g.jsx)(u.a,{open:t.open,onClose:function(){c(Object(S.a)(Object(S.a)({},t),{},{open:!1}))},TransitionComponent:t.Transition,ContentProps:{"aria-describedby":"message-id"},message:Object(g.jsx)("span",{id:"message-id",children:"I love snacks"})})]})}var Q=Object(a.a)("div")((function(e){var n,t=e.theme;return n={margin:"30px"},Object(c.a)(n,t.breakpoints.down("sm"),{margin:"16px"}),Object(c.a)(n,"& .breadcrumb",Object(c.a)({marginBottom:"30px"},t.breakpoints.down("sm"),{marginBottom:"16px"})),n}));n.default=function(){return Object(g.jsxs)(Q,{children:[Object(g.jsx)(i.a,{className:"breadcrumb",children:Object(g.jsx)(o.a,{routeSegments:[{name:"Material",path:"/material"},{name:"Snackbar"}]})}),Object(g.jsxs)(s.a,{spacing:3,children:[Object(g.jsx)(o.k,{title:"simple snackbar",children:Object(g.jsx)(A,{})}),Object(g.jsx)(o.k,{title:"customized snackbar",children:Object(g.jsx)(w,{})}),Object(g.jsx)(o.k,{title:"positioned snackbar",children:Object(g.jsx)(M,{})}),Object(g.jsx)(o.k,{title:"message length",children:Object(g.jsx)(L,{})}),Object(g.jsx)(o.k,{title:"transition",children:Object(g.jsx)(K,{})}),Object(g.jsx)(o.k,{title:"consecutive snackbar",children:Object(g.jsx)(p,{})}),Object(g.jsx)(o.k,{title:"Control Slide direction",children:Object(g.jsx)(D,{})}),Object(g.jsx)(o.k,{title:"complementary project",children:Object(g.jsx)(q,{})})]})]})}}}]);
//# sourceMappingURL=84.e840e23d.chunk.js.map