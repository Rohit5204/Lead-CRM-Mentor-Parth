(this["webpackJsonpmentor-lead"]=this["webpackJsonpmentor-lead"]||[]).push([[77],{1173:function(e,t,a){"use strict";a.r(t);var c=a(14),n=a(7),r=a(179),s=a(80),l=a(1),i=a(34),j=a.n(i),d=a(567),b=a(642),o=a(565),m=a(23),h=a(41),x=a(570),O=a(288),g=a(571),u=a(572),p=a(573),f=a(574),N=a(650),y=a(547),I=a(291),w=a(2),E=Object(r.a)("div")((function(e){var t,a=e.theme;return t={margin:"30px"},Object(n.a)(t,a.breakpoints.down("sm"),{margin:"16px"}),Object(n.a)(t,"& .breadcrumb",Object(n.a)({marginBottom:"30px"},a.breakpoints.down("sm"),{marginBottom:"16px"})),t})),S=Object(r.a)(x.a)((function(){return{whiteSpace:"pre","& thead":{"& tr":{"& th":{paddingLeft:0,paddingRight:0}}},"& tbody":{"& tr":{"& td":{paddingLeft:0}}}}}));t.default=function(){var e=Object(m.f)(),t=Object(l.useState)([]),a=Object(c.a)(t,2),n=a[0],r=a[1],i=localStorage.getItem("accessToken"),x=localStorage.getItem("roleCode"),k=localStorage.getItem("userId"),v={"x-access-token":i,roleCode:x,userId:k};return Object(l.useEffect)((function(){j.a.get("https://43.204.38.243:3001/api/getMasterData?masterName=usermaster",{headers:v}).then((function(e){r(e.data.data)}))}),[n]),Object(w.jsx)(E,{children:Object(w.jsxs)(O.a,{children:[Object(w.jsx)(O.a,{className:"breadcrumb",children:Object(w.jsx)(s.a,{routeSegments:[{name:"Manage Employee",path:"/employees/manageEmployee"},{name:"Employee Detail Page"}]})}),Object(w.jsx)(O.a,{children:Object(w.jsxs)(d.a,{children:[Object(w.jsx)(b.a,{md:"5",children:Object(w.jsxs)(o.a,{className:"mb-3",children:[Object(w.jsx)("button",{type:"submit",className:"btn btn-success",onClick:function(){e("/employees/addEmployee")},children:"ADD"}),"\xa0"]})}),Object(w.jsx)(b.a,{children:Object(w.jsx)("h4",{children:"Employee Login "})})]})}),Object(w.jsx)(O.a,{className:"text-center",width:"100%",overflow:"auto",children:Object(w.jsxs)(S,{className:"table table-striped table-bordered",style:{borderRadius:"1px"},children:[Object(w.jsx)(g.a,{style:{borderLeft:"1px solid red",borderRight:"1px solid red"},className:"text-center",children:Object(w.jsxs)(u.a,{children:[Object(w.jsx)(p.a,{align:"center",children:"User Id"}),Object(w.jsx)(p.a,{align:"center",children:"Name"}),Object(w.jsx)(p.a,{align:"center",children:"Email"}),Object(w.jsx)(p.a,{align:"center",children:"Mobile Number"}),Object(w.jsx)(p.a,{align:"center",children:"Username"}),Object(w.jsx)(p.a,{align:"center",children:"Role"}),Object(w.jsx)(p.a,{align:"center",children:"Status"}),Object(w.jsx)(p.a,{align:"center",children:"Action"})]})}),Object(w.jsx)(f.a,{children:n.map((function(e,t){if(e.branchManagerId==k)return Object(w.jsxs)(u.a,{children:[Object(w.jsx)(p.a,{align:"center",children:e.userId}),Object(w.jsxs)(p.a,{align:"center",children:[e.firstName," ",e.lastName]}),Object(w.jsx)(p.a,{align:"center",children:e.email}),Object(w.jsx)(p.a,{align:"center",children:e.mobileNo}),Object(w.jsx)(p.a,{align:"center",children:e.userName}),Object(w.jsx)(p.a,{align:"center",children:e.roleName}),Object(w.jsx)(p.a,{align:"center",children:1==e.recodStatus?Object(w.jsx)(N.a,{color:"success",label:"Active"}):Object(w.jsx)(N.a,{color:"warning",label:"Inactive"})}),Object(w.jsx)(p.a,{align:"center",children:Object(w.jsx)(h.b,{to:"/employees/editEmployee",state:e,children:Object(w.jsx)(y.a,{children:Object(w.jsx)(I.a,{color:"success",children:"edit"})})})})]},t)}))})]})})]})})}}}]);
//# sourceMappingURL=77.7ee5903a.chunk.js.map