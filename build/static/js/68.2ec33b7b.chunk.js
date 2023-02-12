(this["webpackJsonpmentor-lead"]=this["webpackJsonpmentor-lead"]||[]).push([[68],{1166:function(e,a,t){"use strict";t.r(a);var l=t(7),c=t(179),s=t(80),n=t(567),r=t(642),d=t(1193),i=t(590),b=t(23),j=t(2),o=Object(c.a)("div")((function(e){var a,t=e.theme;return a={margin:"2.9px"},Object(l.a)(a,t.breakpoints.down("sm"),{margin:"16px"}),Object(l.a)(a,"& .breadcrumb",Object(l.a)({marginBottom:"3px"},t.breakpoints.down("sm"),{marginBottom:"1px"})),a})),u=Object(c.a)("div")((function(e){e.theme;return{margin:"0px 0px 0px 441px"}}));a.default=function(){var e=Object(b.e)(),a=Object(b.f)();return Object(j.jsx)(o,{children:Object(j.jsxs)(s.k,{title:"Lead Management",children:[Object(j.jsxs)(n.a,{children:[Object(j.jsxs)(r.a,{children:[Object(j.jsx)(d.a.Label,{children:"Lead Sr No"}),Object(j.jsx)(d.a.Control,{disabled:!0,defaultValue:e.state.leadId,placeholder:"Lead Number"})]}),Object(j.jsxs)(r.a,{children:[Object(j.jsx)(d.a.Label,{children:" Lead Name"}),Object(j.jsx)(d.a.Control,{disabled:!0,defaultValue:e.state.name,placeholder:"Enter Lead Name"})]}),Object(j.jsxs)(r.a,{children:[Object(j.jsx)(d.a.Label,{children:" Expected Amount"}),Object(j.jsx)(d.a.Control,{disabled:!0,defaultValue:e.state.expectedAmount})]})]}),Object(j.jsxs)(n.a,{children:[Object(j.jsxs)(r.a,{children:[Object(j.jsx)(d.a.Label,{children:" Client Name"}),Object(j.jsx)(d.a.Control,{placeholder:"Enter Customer Name",disabled:!0,value:e.state.clientName})]}),Object(j.jsxs)(r.a,{children:[Object(j.jsx)(d.a.Label,{children:"Mobile Number"}),Object(j.jsx)(d.a.Control,{disabled:!0,placeholder:"Enter Customer Mobile No.",defaultValue:e.state.mobileNo})]}),Object(j.jsxs)(r.a,{children:[Object(j.jsx)(d.a.Label,{children:"Email Id"}),Object(j.jsx)(d.a.Control,{disabled:!0,placeholder:"Enter Email Id",defaultValue:e.state.emailId})]})]}),Object(j.jsxs)(n.a,{children:[Object(j.jsxs)(r.a,{children:[Object(j.jsx)(d.a.Label,{children:"Lead Source"}),Object(j.jsx)(d.a.Control,{disabled:!0,placeholder:"Enter Lead Source",defaultValue:e.state.platformName})]}),Object(j.jsxs)(r.a,{children:[Object(j.jsx)(d.a.Label,{children:"Interested In"}),Object(j.jsx)(d.a.Control,{disabled:!0,placeholder:"Interested In",defaultValue:e.state.intrestedIn})]}),Object(j.jsxs)(r.a,{children:[Object(j.jsx)(d.a.Label,{children:"Assign To"}),Object(j.jsx)(d.a.Control,{disabled:!0,placeholder:"Assign Employee",defaultValue:e.state.assignedUser})]})]}),Object(j.jsx)(n.a,{children:Object(j.jsxs)(r.a,{children:[Object(j.jsx)(d.a.Label,{children:"Address"}),Object(j.jsx)(d.a.Control,{disabled:!0,placeholder:"Enter the Address",defaultValue:e.state.streetName})]})}),Object(j.jsxs)(n.a,{children:[Object(j.jsxs)(r.a,{children:[Object(j.jsx)(d.a.Label,{children:"Pin Code"}),Object(j.jsx)(d.a.Control,{disabled:!0,placeholder:"Enter the Pin Code",defaultValue:e.state.zipCode})]}),Object(j.jsxs)(r.a,{children:[Object(j.jsx)(d.a.Label,{children:"City"}),Object(j.jsx)(d.a.Control,{disabled:!0,placeholder:"Enter the City",defaultValue:e.state.cityName})]}),Object(j.jsxs)(r.a,{children:[Object(j.jsx)(d.a.Label,{children:"State"}),Object(j.jsx)(d.a.Control,{disabled:!0,placeholder:"Mention the State",defaultValue:e.state.stateName})]})]}),Object(j.jsxs)(n.a,{children:[Object(j.jsxs)(r.a,{children:[Object(j.jsx)(d.a.Label,{children:"Country"}),Object(j.jsx)(d.a.Control,{disabled:!0,placeholder:"Mention the Country",defaultValue:e.state.countryName})]}),Object(j.jsxs)(r.a,{children:[Object(j.jsx)(d.a.Label,{children:"Status"}),Object(j.jsx)(d.a.Control,{disabled:!0,placeholder:"Mention the Status",defaultValue:e.state.statusName})]}),Object(j.jsxs)(r.a,{children:[Object(j.jsx)(d.a.Label,{children:"Label"}),Object(j.jsx)(d.a.Control,{disabled:!0,placeholder:"Mention the Label",defaultValue:e.state.labelName})]})]}),Object(j.jsx)(n.a,{children:Object(j.jsxs)(r.a,{md:"4",children:[Object(j.jsx)(d.a.Label,{children:"Created Date"}),Object(j.jsx)(d.a.Control,{disabled:!0,defaultValue:new Date(e.state.createdDate).toLocaleDateString("en-GB")})]})}),Object(j.jsx)(u,{className:"mt-2",children:Object(j.jsx)(n.a,{children:Object(j.jsxs)(r.a,{children:[Object(j.jsx)(i.a,{variant:"secondary",onClick:function(){a("/quotations/manageQuotation")},children:"Back"}),"\xa0"]})})})]})})}},563:function(e,a,t){"use strict";t.d(a,"b",(function(){return r}));var l=t(14),c=t(1),s=t(2),n=["as","disabled"];function r(e){var a=e.tagName,t=e.disabled,l=e.href,c=e.target,s=e.rel,n=e.role,r=e.onClick,d=e.tabIndex,i=void 0===d?0:d,b=e.type;a||(a=null!=l||null!=c||null!=s?"a":"button");var j={tagName:a};if("button"===a)return[{type:b||"button",disabled:t},j];var o=function(e){(t||"a"===a&&function(e){return!e||"#"===e.trim()}(l))&&e.preventDefault(),t?e.stopPropagation():null==r||r(e)};return"a"===a&&(l||(l="#"),t&&(l=void 0)),[{role:null!=n?n:"button",disabled:void 0,tabIndex:t?void 0:i,href:l,target:"a"===a?c:void 0,"aria-disabled":t||void 0,rel:"a"===a?s:void 0,onClick:o,onKeyDown:function(e){" "===e.key&&(e.preventDefault(),o(e))}},j]}var d=c.forwardRef((function(e,a){var t=e.as,c=e.disabled,d=function(e,a){if(null==e)return{};var t,l,c={},s=Object.keys(e);for(l=0;l<s.length;l++)t=s[l],a.indexOf(t)>=0||(c[t]=e[t]);return c}(e,n),i=r(Object.assign({tagName:t,disabled:c},d)),b=Object(l.a)(i,2),j=b[0],o=b[1].tagName;return Object(s.jsx)(o,Object.assign({},d,j,{ref:a}))}));d.displayName="Button",a.a=d},567:function(e,a,t){"use strict";var l=t(9),c=t(48),s=t(551),n=t.n(s),r=t(1),d=t(552),i=t(2),b=["bsPrefix","className","as"],j=r.forwardRef((function(e,a){var t=e.bsPrefix,s=e.className,r=e.as,j=void 0===r?"div":r,o=Object(c.a)(e,b),u=Object(d.c)(t,"row"),O=Object(d.a)(),x=Object(d.b)(),h="".concat(u,"-cols"),f=[];return O.forEach((function(e){var a,t=o[e];delete o[e],a=null!=t&&"object"===typeof t?t.cols:t;var l=e!==x?"-".concat(e):"";null!=a&&f.push("".concat(h).concat(l,"-").concat(a))})),Object(i.jsx)(j,Object(l.a)(Object(l.a)({ref:a},o),{},{className:n.a.apply(void 0,[s,u].concat(f))}))}));j.displayName="Row",a.a=j},590:function(e,a,t){"use strict";var l=t(9),c=t(14),s=t(48),n=t(551),r=t.n(n),d=t(1),i=t(563),b=t(552),j=t(2),o=["as","bsPrefix","variant","size","active","className"],u=d.forwardRef((function(e,a){var t=e.as,n=e.bsPrefix,d=e.variant,u=e.size,O=e.active,x=e.className,h=Object(s.a)(e,o),f=Object(b.c)(n,"btn"),m=Object(i.b)(Object(l.a)({tagName:t},h)),p=Object(c.a)(m,2),v=p[0],N=p[1].tagName;return Object(j.jsx)(N,Object(l.a)(Object(l.a)(Object(l.a)({},v),h),{},{ref:a,className:r()(x,f,O&&"active",d&&"".concat(f,"-").concat(d),u&&"".concat(f,"-").concat(u),h.href&&h.disabled&&"disabled")}))}));u.displayName="Button",u.defaultProps={variant:"primary",active:!1,disabled:!1},a.a=u}}]);
//# sourceMappingURL=68.2ec33b7b.chunk.js.map