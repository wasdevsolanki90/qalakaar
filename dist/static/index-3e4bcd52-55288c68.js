import{d as g,j as P,P as x,_ as L,a as o,u as _,c as k,e as B,B as w,f as A,A as j,s as C,r as v,g as O,E as T,D}from"./sanity-437a1abe.js";import{useDeskTool as S}from"./index-37eb7c2e-aa8eb011.js";import{P as H}from"./PaneItem-e46fd64d-6e25ab99.js";import"./json-inspector-5074c8a7.js";var I;function W(s,t){return t||(t=s.slice(0)),Object.freeze(Object.defineProperties(s,{raw:{value:Object.freeze(t)}}))}const E=s=>{let{index:t,menuItems:a,menuItemGroups:i,title:r}=s;const{features:c}=S(),{collapsed:l,isLast:p}=_(),u=p&&!l?-1:0;return o(k,{actions:o(B,{menuItems:a,menuItemGroups:i}),backButton:c.backButton&&t>0&&o(w,{as:A,"data-as":"a",icon:j,mode:"bleed"}),tabIndex:u,title:r})},G=g.hr(I||(I=W([`
  background-color: var(--card-border-color);
  height: 1px;
  margin: 0;
  border: none;
`])));function z(s){const{childItemId:t,items:a,isActive:i,layout:r,showIcons:c,title:l}=s,{collapsed:p}=C(),u=v.useCallback(e=>{var n;return((n=a==null?void 0:a.find((d,h)=>h===e))==null?void 0:n.type)==="divider"},[a]),m=v.useCallback(e=>{var n;const d=(n=e.displayOptions)==null?void 0:n.showIcon;return typeof d<"u"?d!==!1:c!==!1},[c]),f=v.useCallback((e,n)=>{const{virtualIndex:d}=n;if(e.type==="divider")return o(O,{marginTop:1,marginBottom:2,children:o(G,{})},"divider-".concat(d));const h=!i&&t===e.id,y=i&&t===e.id,b=e._id&&e.schemaType?{_id:e._id,_type:e.schemaType.name,title:e.title}:void 0;return o(H,{icon:m(e)?e.icon:!1,id:e.id,layout:r,marginBottom:1,pressed:h,schemaType:e.schemaType,selected:y,title:e.title,value:b},e.id)},[t,i,r,m]);return o(T,{overflow:p?"hidden":"auto",children:a&&a.length>0&&o(D,{activeItemDataAttr:"data-hovered",ariaLabel:"List of ".concat(l),canReceiveFocus:!0,focusRingOffset:-3,getItemDisabled:u,itemHeight:51,items:a,onlyShowSelectionWhenActive:!0,padding:2,paddingBottom:1,renderItem:f,wrapAround:!1})})}function U(s){const{childItemId:t,index:a,isActive:i,isSelected:r,pane:c,paneKey:l}=s,{defaultLayout:p,displayOptions:u,items:m,menuItems:f,menuItemGroups:e,title:n}=c,d=(u==null?void 0:u.showIcons)!==!1;return P(x,{currentMaxWidth:350,"data-testid":"desk-tool-list-pane","data-ui":"ListPane",id:l,maxWidth:640,minWidth:320,selected:r,children:[L,o(E,{index:a,menuItems:f,menuItemGroups:e,title:n}),o(z,{childItemId:t,isActive:i,items:m,layout:p,showIcons:d,title:n},l)]})}export{U as default};
