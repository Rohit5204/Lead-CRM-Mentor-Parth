(this["webpackJsonpmentor-lead"]=this["webpackJsonpmentor-lead"]||[]).push([[61],{1165:function(e,t,a){"use strict";a.r(t);var c=a(7),n=a(9),r=a(11),s=a(14),i=a(179),l=a(80),o=a(567),j=a(642),d=a(1192),b=a(565),u=a(592),O=a(783),h=a(645),m=a(288),x=a(491),p=a(1210),v=a(512),g=a(291),f=a(571),C=a(572),y=a(573),N=a(574),I=a(485),S=a(583),k=a(570),T=a(1),L=a(23),w=a(34),D=a.n(w),P=a(2),E=Object(i.a)(k.a)((function(){return{whiteSpace:"pre","& thead":{"& tr":{"& th":{paddingLeft:20,paddingRight:0}}},"& tbody":{"& tr":{"& td":{paddingLeft:30}}}}})),A=Object(i.a)("div")((function(e){var t,a=e.theme;return t={margin:"30px"},Object(c.a)(t,a.breakpoints.down("sm"),{margin:"16px"}),Object(c.a)(t,"& .breadcrumb",Object(c.a)({marginBottom:"30px"},a.breakpoints.down("sm"),{marginBottom:"16px"})),t})),B=Object(i.a)("div")((function(){return{margin:"0px 0px 0px 430px"}}));t.default=function(){var e=Object(T.useState)(""),t=Object(s.a)(e,2),a=t[0],c=t[1],i=Object(T.useState)(!1),k=Object(s.a)(i,2),w=k[0],R=k[1],G=Object(T.useState)(""),M=Object(s.a)(G,2),F=(M[0],M[1]),Q=Object(T.useState)(""),q=Object(s.a)(Q,2),V=q[0],z=q[1],H=Object(T.useState)(""),W=Object(s.a)(H,2),J=W[0],U=W[1],K=Object(T.useState)(""),X=Object(s.a)(K,2),Y=X[0],Z=X[1],$=Object(T.useState)(""),_=Object(s.a)($,2),ee=_[0],te=_[1],ae=Object(T.useState)(""),ce=Object(s.a)(ae,2),ne=ce[0],re=ce[1],se=Object(T.useState)(""),ie=Object(s.a)(se,2),le=ie[0],oe=ie[1],je=Object(T.useState)(""),de=Object(s.a)(je,2),be=de[0],ue=de[1],Oe=Object(T.useState)(""),he=Object(s.a)(Oe,2),me=he[0],xe=he[1],pe=Object(T.useState)(""),ve=Object(s.a)(pe,2),ge=ve[0],fe=ve[1],Ce=Object(T.useState)(18),ye=Object(s.a)(Ce,2),Ne=ye[0],Ie=ye[1],Se=Object(T.useState)(0),ke=Object(s.a)(Se,2),Te=ke[0],Le=ke[1],we=Object(T.useState)(""),De=Object(s.a)(we,2),Pe=De[0],Ee=(De[1],Object(T.useState)("")),Ae=Object(s.a)(Ee,2),Be=Ae[0],Re=Ae[1],Ge=Object(T.useState)(""),Me=Object(s.a)(Ge,2),Fe=Me[0],Qe=Me[1],qe=Object(T.useState)([]),Ve=Object(s.a)(qe,2),ze=Ve[0],He=Ve[1],We=Object(T.useState)([]),Je=Object(s.a)(We,2),Ue=Je[0],Ke=Je[1],Xe=Object(T.useState)([{id:Object(h.a)(6),name:"",qty:0,price:0}]),Ye=Object(s.a)(Xe,2),Ze=Ye[0],$e=Ye[1],_e=Object(T.useState)([{instalmentNumber:Object(h.a)(1),instalmentAmount:0,instalmentDate:"",createdBy:""}]),et=Object(s.a)(_e,2),tt=et[0],at=(et[1],{"x-access-token":localStorage.getItem("accessToken"),roleCode:localStorage.getItem("roleCode"),userId:localStorage.getItem("userId")});Object(T.useEffect)((function(){D.a.post("https://43.204.38.243:3001/api/getFilteredLeadData",{leadId:0,userId:0,statusId:0},{headers:at}).then((function(e){for(var t=0;t<e.data.data.length;t++)He((function(a){return[].concat(Object(r.a)(a),[e.data.data[t].name])}))})),D.a.post("https://43.204.38.243:3001/api/getCatalogue",{catId:0},{headers:at}).then((function(e){for(var t=0;t<e.data.data.length;t++)Ke((function(a){return[].concat(Object(r.a)(a),[e.data.data[t].gsName])}))}))}),[]);var ct=Object(L.f)(),nt={leadId:ze.leadId,quotationNumber:"Q00001",quotationDate:V,comapnyAddress:J,companyEmail:Y,companyContact:ee,billTo:ne,clientAddress:le,clientEmail:be,clientContact:me,gstNo:ge,gsCatalogueId:Ue.id,amount:st,gsQuantity:Pe,gst:Ne,discount:Te,grandTotal:it,remarks:Be,bankDetails:Fe,instalments:tt,isDraft:1,createdBy:1},rt=function(e){var t={id:e.target.id,name:e.target.name,value:e.target.value},a=Ze.map((function(e){for(var a in e)a===t.name&&e.id===t.id&&(e[a]=t.value);return e}));$e(a)},st=Ze.reduce((function(e,t){return t.name.trim().length>0?e+Number(t.price*Math.floor(t.qty)):e}),0),it=st-Te*st/100+Ne*st/100,lt=function(e){$e((function(t){return t.filter((function(t){return t.id!==e}))}))};return Object(P.jsxs)(A,{children:[Object(P.jsx)(m.a,{className:"breadcrumb",children:Object(P.jsx)(l.a,{routeSegments:[{name:"Quotation",path:"/quotations/addQuotation"},{name:"Add Quotation Page"}]})}),Object(P.jsxs)(l.k,{title:"Request Quotation",children:[Object(P.jsx)("h6",{style:{color:"green"},children:"Company Detail's"}),Object(P.jsxs)(o.a,{children:[Object(P.jsxs)(j.a,{children:[Object(P.jsx)(d.a.Label,{children:"Lead"}),Object(P.jsx)(x.a,{children:Object(P.jsx)(p.a,{style:{width:450},freeSolo:!0,autoComplete:!0,autoHighlight:!0,options:ze,renderInput:function(e){return Object(P.jsx)(v.a,Object(n.a)(Object(n.a)({},e),{},{onChange:function(e){return He(e.target.value)},variant:"outlined",label:"Select the Lead",size:"small"}))}})})]}),Object(P.jsxs)(j.a,{children:[Object(P.jsx)(d.a.Label,{children:"Quotation Date"}),Object(P.jsx)(d.a.Control,{type:"date",onChange:function(e){return z(e.target.value)},value:V})]})]}),Object(P.jsx)(o.a,{className:"mt-3",children:Object(P.jsx)(j.a,{children:Object(P.jsxs)(d.a.Group,{className:"mb-3",controlId:"exampleForm.ControlTextarea1",children:[Object(P.jsx)(d.a.Label,{children:"Address"}),Object(P.jsx)(d.a.Control,{as:"textarea",rows:3,onChange:function(e){return U(e.target.value)},value:J,placeholder:"Comapny Address"})]})})}),Object(P.jsxs)(o.a,{children:[Object(P.jsxs)(j.a,{children:[Object(P.jsx)(d.a.Label,{children:"Email"}),Object(P.jsxs)(b.a,{className:"mb-3",children:[Object(P.jsx)(b.a.Text,{id:"basic-addon1",children:Object(P.jsx)(g.a,{children:"email"})}),Object(P.jsx)(d.a.Control,{onChange:function(e){return Z(e.target.value)},value:Y,placeholder:"Company Email"})]})]}),Object(P.jsxs)(j.a,{children:[Object(P.jsx)(d.a.Label,{children:"Contact"}),Object(P.jsxs)(b.a,{className:"mb-1",children:[Object(P.jsx)(b.a.Text,{id:"basic-addon1",children:Object(P.jsx)(g.a,{children:"phone"})}),Object(P.jsx)(d.a.Control,{onChange:function(e){return te(e.target.value)},value:ee,placeholder:"Company Contact"})]})]})]}),Object(P.jsx)("br",{}),Object(P.jsx)("h6",{style:{color:"green"},children:"Client Detail's"}),Object(P.jsxs)(o.a,{children:[Object(P.jsxs)(j.a,{children:[Object(P.jsx)(d.a.Label,{children:"Bill To / Customer Name"}),Object(P.jsxs)(b.a,{className:"mb-3",children:[Object(P.jsx)(b.a.Text,{id:"basic-addon1",children:Object(P.jsx)(g.a,{children:"person"})}),Object(P.jsx)(d.a.Control,{onChange:function(e){return re(e.target.value)},value:ne,placeholder:"Billing Person Name"})]})]}),Object(P.jsxs)(j.a,{children:[Object(P.jsx)(d.a.Label,{children:"GST NO"}),Object(P.jsxs)(b.a,{className:"mb-3",children:[Object(P.jsx)(b.a.Text,{id:"basic-addon1",children:"GST"}),Object(P.jsx)(d.a.Control,{onChange:function(e){return fe(e.target.value)},value:ge,placeholder:"Enter the GST Number"})]})]})]}),Object(P.jsxs)(o.a,{children:[Object(P.jsxs)(j.a,{children:[Object(P.jsx)(d.a.Label,{children:"Client Email"}),Object(P.jsxs)(b.a,{className:"mb-3",children:[Object(P.jsx)(b.a.Text,{id:"basic-addon1",children:Object(P.jsx)(g.a,{children:"email"})}),Object(P.jsx)(d.a.Control,{onChange:function(e){return ue(e.target.value)},value:be,placeholder:"demo@gmail.com"})]})]}),Object(P.jsxs)(j.a,{children:[Object(P.jsx)(d.a.Label,{children:"Client Contact"}),Object(P.jsxs)(b.a,{className:"mb-3",children:[Object(P.jsx)(b.a.Text,{id:"basic-addon1",children:Object(P.jsx)(g.a,{children:"phone"})}),Object(P.jsx)(d.a.Control,{onChange:function(e){return xe(e.target.value)},value:me,placeholder:"demo@gmail.com"})]})]})]}),Object(P.jsx)(o.a,{className:"mt-2",children:Object(P.jsx)(j.a,{children:Object(P.jsxs)(d.a.Group,{className:"mb-3",controlId:"exampleForm.ControlTextarea1",children:[Object(P.jsx)(d.a.Label,{children:"Client Address"}),Object(P.jsx)(d.a.Control,{as:"textarea",rows:3,onChange:function(e){return oe(e.target.value)},value:le,placeholder:"Customer  Address"})]})})}),Object(P.jsx)("br",{}),Object(P.jsxs)(m.a,{className:"text-center mt-2",width:"100%",overflow:"auto",children:[Object(P.jsxs)(o.a,{children:[Object(P.jsx)(j.a,{}),Object(P.jsx)(j.a,{className:"col-sm-9",children:Object(P.jsx)("h4",{style:{color:"green"},children:"Product Quotation List"})}),Object(P.jsx)(j.a,{children:Object(P.jsx)(j.a,{className:"col-sm-1",children:Object(P.jsx)("button",{type:"button",onClick:function(){var e=Object(h.a)(6);$e((function(t){return[].concat(Object(r.a)(t),[{id:e,name:"",qty:1,price:"1.00"}])}))},className:"btn btn-success",children:"Add Items"})})})]}),Object(P.jsxs)(E,{children:[Object(P.jsx)(f.a,{children:Object(P.jsxs)(C.a,{children:[Object(P.jsx)(y.a,{align:"center",children:"Product Name"}),Object(P.jsx)(y.a,{align:"center",children:"Quantity"}),Object(P.jsx)(y.a,{align:"center",children:"Unit Price"}),Object(P.jsx)(y.a,{align:"center",children:"Action"})]})}),Object(P.jsx)(N.a,{children:Ze.map((function(e){return Object(P.jsx)(O.a,{align:"justify",id:e.id,name:e.name,qty:e.qty,price:e.price,onDeleteItem:lt,onEdtiItem:rt},e.id)}))})]})]}),Object(P.jsxs)(o.a,{children:[Object(P.jsxs)(j.a,{children:[Object(P.jsx)(d.a.Label,{children:"Tax Rate "}),Object(P.jsxs)(b.a,{className:"mb-3",children:[Object(P.jsx)(d.a.Control,{value:Ne,onChange:function(e){return Ie(e.target.value)},placeholder:"Enter the Tax Rate"})," ",Object(P.jsx)(b.a.Text,{children:"%"})]})]}),Object(P.jsxs)(j.a,{children:[Object(P.jsx)(d.a.Label,{children:"Discount rate:"}),Object(P.jsxs)(b.a,{className:"mb-3",children:[Object(P.jsx)(d.a.Control,{placeholder:"Discount Rate",value:Te,onChange:function(e){return Le(e.target.value)}}),Object(P.jsx)(b.a.Text,{children:"%"})]})]})]}),Object(P.jsxs)(o.a,{children:[Object(P.jsxs)(j.a,{children:[Object(P.jsx)(d.a.Label,{children:"Amount"}),Object(P.jsxs)(b.a,{className:"mb-3",children:[Object(P.jsx)(b.a.Text,{id:"basic-addon1",style:{color:"green"},children:Object(P.jsx)("b",{children:" \u20b9"})}),Object(P.jsx)(d.a.Control,{disabled:!0,placeholder:"Sub Total Amount",value:st})]})]}),Object(P.jsxs)(j.a,{children:[Object(P.jsx)(d.a.Label,{children:"Grand Total"}),Object(P.jsxs)(b.a,{className:"mb-3",children:[Object(P.jsx)(b.a.Text,{id:"basic-addon1",style:{color:"green"},children:Object(P.jsx)("b",{children:" \u20b9"})}),Object(P.jsx)(d.a.Control,{disabled:!0,placeholder:"Total Amount",value:it})]})]})]}),Object(P.jsxs)(o.a,{children:[Object(P.jsxs)(j.a,{children:[Object(P.jsx)(d.a.Label,{children:"Note or Remark"}),Object(P.jsx)(d.a.Control,{placeholder:"Write a Remark",onChange:function(e){return Re(e.target.value)},value:Be})]}),Object(P.jsxs)(j.a,{className:"mt-2",children:[Object(P.jsx)(d.a.Label,{children:"Bank Details"}),Object(P.jsx)(d.a.Check,{type:"switch",onChange:function(){return R(!w)},checked:w,id:"custom-switch",label:"If you have Payment Detail's,Please Check the Box"})]})]}),Object(P.jsx)(o.a,{children:Object(P.jsx)(j.a,{children:w?Object(P.jsxs)(o.a,{children:[Object(P.jsx)(j.a,{children:Object(P.jsxs)(x.a,{fullWidth:!0,children:[Object(P.jsx)("label",{children:"Choose Payment Option"}),Object(P.jsxs)(I.a,{value:a,label:"Age",onChange:function(e){c(e.target.value)},children:[Object(P.jsx)(S.a,{value:"",children:"Choose Payment Option"}),Object(P.jsx)(S.a,{value:"netBanking",children:"Net Banking"}),Object(P.jsx)(S.a,{value:"bank",children:"Bank Transfer"}),Object(P.jsx)(S.a,{value:"gPay",children:"G-Pay"}),Object(P.jsx)(S.a,{value:"amazonPay",children:"Amazon Pay"})]})]})}),Object(P.jsxs)(j.a,{children:[Object(P.jsx)(d.a.Label,{children:"Transaction Refrence Number"}),Object(P.jsx)(d.a.Control,{fullWidth:!0,placeholder:"Enter the Refrence Number of Transaction",onChange:function(e){return Qe(e.target.value)},value:Fe})]})]}):Object(P.jsx)("div",{})})}),Object(P.jsx)(o.a,{children:Object(P.jsx)(j.a,{children:a?Object(P.jsxs)(P.Fragment,{children:[Object(P.jsx)("br",{}),Object(P.jsx)("h6",{children:"Please Fill Detail's Only For Bank Transfer"}),Object(P.jsxs)(o.a,{children:[Object(P.jsxs)(j.a,{children:[Object(P.jsx)(d.a.Label,{children:"Bank Name"}),Object(P.jsx)(d.a.Control,{placeholder:"Enter the Bank Name"})]}),Object(P.jsxs)(j.a,{children:[Object(P.jsx)(d.a.Label,{children:"IFSC CODE"}),Object(P.jsx)(d.a.Control,{placeholder:"Enter the IFSC CODE"})]})]})]}):Object(P.jsx)("div",{})})})]}),Object(P.jsx)(B,{className:"mt-2",children:Object(P.jsx)(o.a,{children:Object(P.jsxs)(j.a,{children:[Object(P.jsx)(u.a,{variant:"contained",onClick:function(){ct("/quotations/manageQuotation")},children:"Cancel"}),"\xa0",Object(P.jsx)(u.a,{variant:"success",onClick:function(e){e.preventDefault(),console.log({addQuotation:nt}),D.a.post("https://43.204.38.243:3001/api/saveQuotation",nt),F(""),z(""),U(""),alert("Catalogue Successfully Created")},children:"Add"})]})})})]})}},565:function(e,t,a){"use strict";var c=a(48),n=a(9),r=a(551),s=a.n(r),i=a(1),l=a(562),o=a(552),j=a(563),d=i.createContext(null);d.displayName="InputGroupContext";var b=d,u=a(2),O=["bsPrefix","size","hasValidation","className","as"],h=Object(l.a)("input-group-text",{Component:"span"}),m=i.forwardRef((function(e,t){var a=e.bsPrefix,r=e.size,l=e.hasValidation,j=e.className,d=e.as,h=void 0===d?"div":d,m=Object(c.a)(e,O);a=Object(o.c)(a,"input-group");var x=Object(i.useMemo)((function(){return{}}),[]);return Object(u.jsx)(b.Provider,{value:x,children:Object(u.jsx)(h,Object(n.a)(Object(n.a)({ref:t},m),{},{className:s()(j,a,r&&"".concat(a,"-").concat(r),l&&"has-validation")}))})}));m.displayName="InputGroup";t.a=Object.assign(m,{Text:h,Radio:function(e){return Object(u.jsx)(h,{children:Object(u.jsx)(j.a,Object(n.a)({type:"radio"},e))})},Checkbox:function(e){return Object(u.jsx)(h,{children:Object(u.jsx)(j.a,Object(n.a)({type:"checkbox"},e))})}})},567:function(e,t,a){"use strict";var c=a(9),n=a(48),r=a(551),s=a.n(r),i=a(1),l=a(552),o=a(2),j=["bsPrefix","className","as"],d=i.forwardRef((function(e,t){var a=e.bsPrefix,r=e.className,i=e.as,d=void 0===i?"div":i,b=Object(n.a)(e,j),u=Object(l.c)(a,"row"),O=Object(l.a)(),h=Object(l.b)(),m="".concat(u,"-cols"),x=[];return O.forEach((function(e){var t,a=b[e];delete b[e],t=null!=a&&"object"===typeof a?a.cols:a;var c=e!==h?"-".concat(e):"";null!=t&&x.push("".concat(m).concat(c,"-").concat(t))})),Object(o.jsx)(d,Object(c.a)(Object(c.a)({ref:t},b),{},{className:s.a.apply(void 0,[r,u].concat(x))}))}));d.displayName="Row",t.a=d},578:function(e,t,a){"use strict";a.d(t,"b",(function(){return r}));var c=a(60),n=a(70);function r(e){return Object(c.a)("MuiListItemText",e)}var s=Object(n.a)("MuiListItemText",["root","multiline","dense","inset","primary","secondary"]);t.a=s},579:function(e,t,a){"use strict";a.d(t,"b",(function(){return r}));var c=a(60),n=a(70);function r(e){return Object(c.a)("MuiListItemIcon",e)}var s=Object(n.a)("MuiListItemIcon",["root","alignItemsFlexStart"]);t.a=s},583:function(e,t,a){"use strict";var c=a(7),n=a(6),r=a(4),s=a(1),i=a(8),l=a(98),o=a(470),j=a(5),d=a(15),b=a(183),u=a(542),O=a(61),h=a(28),m=a(279),x=a(579),p=a(578),v=a(60),g=a(70);function f(e){return Object(v.a)("MuiMenuItem",e)}var C=Object(g.a)("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]),y=a(2),N=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex"],I=Object(j.a)(u.a,{shouldForwardProp:function(e){return Object(j.b)(e)||"classes"===e},name:"MuiMenuItem",slot:"Root",overridesResolver:function(e,t){var a=e.ownerState;return[t.root,a.dense&&t.dense,a.divider&&t.divider,!a.disableGutters&&t.gutters]}})((function(e){var t,a=e.theme,n=e.ownerState;return Object(r.a)({},a.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!n.disableGutters&&{paddingLeft:16,paddingRight:16},n.divider&&{borderBottom:"1px solid ".concat((a.vars||a).palette.divider),backgroundClip:"padding-box"},(t={"&:hover":{textDecoration:"none",backgroundColor:(a.vars||a).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}}},Object(c.a)(t,"&.".concat(C.selected),Object(c.a)({backgroundColor:a.vars?"rgba(".concat(a.vars.palette.primary.mainChannel," / ").concat(a.vars.palette.action.selectedOpacity,")"):Object(o.a)(a.palette.primary.main,a.palette.action.selectedOpacity)},"&.".concat(C.focusVisible),{backgroundColor:a.vars?"rgba(".concat(a.vars.palette.primary.mainChannel," / calc(").concat(a.vars.palette.action.selectedOpacity," + ").concat(a.vars.palette.action.focusOpacity,"))"):Object(o.a)(a.palette.primary.main,a.palette.action.selectedOpacity+a.palette.action.focusOpacity)})),Object(c.a)(t,"&.".concat(C.selected,":hover"),{backgroundColor:a.vars?"rgba(".concat(a.vars.palette.primary.mainChannel," / calc(").concat(a.vars.palette.action.selectedOpacity," + ").concat(a.vars.palette.action.hoverOpacity,"))"):Object(o.a)(a.palette.primary.main,a.palette.action.selectedOpacity+a.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:a.vars?"rgba(".concat(a.vars.palette.primary.mainChannel," / ").concat(a.vars.palette.action.selectedOpacity,")"):Object(o.a)(a.palette.primary.main,a.palette.action.selectedOpacity)}}),Object(c.a)(t,"&.".concat(C.focusVisible),{backgroundColor:(a.vars||a).palette.action.focus}),Object(c.a)(t,"&.".concat(C.disabled),{opacity:(a.vars||a).palette.action.disabledOpacity}),Object(c.a)(t,"& + .".concat(m.a.root),{marginTop:a.spacing(1),marginBottom:a.spacing(1)}),Object(c.a)(t,"& + .".concat(m.a.inset),{marginLeft:52}),Object(c.a)(t,"& .".concat(p.a.root),{marginTop:0,marginBottom:0}),Object(c.a)(t,"& .".concat(p.a.inset),{paddingLeft:36}),Object(c.a)(t,"& .".concat(x.a.root),{minWidth:36}),t),!n.dense&&Object(c.a)({},a.breakpoints.up("sm"),{minHeight:"auto"}),n.dense&&Object(r.a)({minHeight:32,paddingTop:4,paddingBottom:4},a.typography.body2,Object(c.a)({},"& .".concat(x.a.root," svg"),{fontSize:"1.25rem"})))})),S=s.forwardRef((function(e,t){var a=Object(d.a)({props:e,name:"MuiMenuItem"}),c=a.autoFocus,o=void 0!==c&&c,j=a.component,u=void 0===j?"li":j,m=a.dense,x=void 0!==m&&m,p=a.divider,v=void 0!==p&&p,g=a.disableGutters,C=void 0!==g&&g,S=a.focusVisibleClassName,k=a.role,T=void 0===k?"menuitem":k,L=a.tabIndex,w=Object(n.a)(a,N),D=s.useContext(b.a),P={dense:x||D.dense||!1,disableGutters:C},E=s.useRef(null);Object(O.a)((function(){o&&E.current&&E.current.focus()}),[o]);var A,B=Object(r.a)({},a,{dense:P.dense,divider:v,disableGutters:C}),R=function(e){var t=e.disabled,a=e.dense,c=e.divider,n=e.disableGutters,s=e.selected,i=e.classes,o={root:["root",a&&"dense",t&&"disabled",!n&&"gutters",c&&"divider",s&&"selected"]},j=Object(l.a)(o,f,i);return Object(r.a)({},i,j)}(a),G=Object(h.a)(E,t);return a.disabled||(A=void 0!==L?L:-1),Object(y.jsx)(b.a.Provider,{value:P,children:Object(y.jsx)(I,Object(r.a)({ref:G,role:T,tabIndex:A,component:u,focusVisibleClassName:Object(i.a)(R.focusVisible,S)},w,{ownerState:B,classes:R}))})}));t.a=S},783:function(e,t,a){"use strict";a(1);var c=a(2),n=function(e){var t=e.onEditItem,a=e.cellData;return Object(c.jsx)("input",{className:a.className,type:a.type,placeholder:a.placeholder,min:a.min,max:a.max,step:a.step,name:a.name,id:a.id,value:a.value,onChange:t,required:!0})},r=a(547),s=a(291);t.a=function(e){e.id;var t=e.instalmentNumber,a=e.instalmentDate,i=e.instalmentAmount,l=e.onDeleteItem,o=e.onEdtiItem;return Object(c.jsxs)("tr",{children:[Object(c.jsx)("td",{className:"w-full",children:Object(c.jsx)(n,{onEditItem:function(e){return o(e)},cellData:{placeholder:"Installment No.",type:"text",name:"instalmentNumber",id:t,value:t}})}),Object(c.jsx)("td",{className:"w-full",children:Object(c.jsx)(n,{onEditItem:function(e){return o(e)},cellData:{type:"date",name:"instalmentDate",id:t,value:a}})}),Object(c.jsx)("td",{className:"w-full",children:Object(c.jsx)(n,{onEditItem:function(e){return o(e)},cellData:{placeholder:"Installment Amount",type:"text",name:"instalmentAmount",id:t,value:i}})}),Object(c.jsx)("td",{className:"flex items-center justify-center",children:Object(c.jsx)(r.a,{onClick:function(){l(t)},className:"ml-5",children:Object(c.jsx)(s.a,{color:"warning",children:"delete"})})})]})}}}]);
//# sourceMappingURL=61.91f38c02.chunk.js.map