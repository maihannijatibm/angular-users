"use strict";(self.webpackChunkusers=self.webpackChunkusers||[]).push([[886],{1886:(P,i,r)=>{r.r(i),r.d(i,{ProfileModule:()=>v});var c=r(6814),a=r(2169),d=r(6748),m=r(23),s=r(5879),t=r(5195);let p=(()=>{var n;class l{constructor(o){this.store=o,this.user$=this.store.pipe((0,a.Ys)(d.dy)),this.subscriptions=[]}ngOnInit(){this.store.dispatch(m.PR());const o=this.user$.subscribe({next:e=>{e&&(this.user=e)}});this.subscriptions.push(o)}ngOnDestroy(){this.subscriptions.forEach(o=>o.unsubscribe)}}return(n=l).\u0275fac=function(o){return new(o||n)(s.Y36(a.yh))},n.\u0275cmp=s.Xpm({type:n,selectors:[["app-profile"]],decls:10,vars:4,consts:[[3,"href"]],template:function(o,e){1&o&&(s.TgZ(0,"mat-card")(1,"mat-card-header")(2,"mat-card-title"),s._uU(3),s.qZA(),s.TgZ(4,"mat-card-subtitle")(5,"a",0),s._uU(6),s.qZA()()(),s.TgZ(7,"mat-card-content")(8,"p"),s._uU(9),s.qZA()()()),2&o&&(s.xp6(3),s.Oqu(null==e.user?null:e.user.name),s.xp6(2),s.MGl("href","mailto:",null==e.user?null:e.user.email,"",s.LSH),s.xp6(1),s.Oqu(null==e.user?null:e.user.email),s.xp6(3),s.Oqu(null==e.user?null:e.user.bio))},dependencies:[t.a8,t.dn,t.dk,t.$j,t.n5],styles:["mat-card[_ngcontent-%COMP%]{border:0;border-radius:0;box-shadow:none}"]}),l})();var f=r(3073);const h=[{path:"",component:p}];let v=(()=>{var n;class l{}return(n=l).\u0275fac=function(o){return new(o||n)},n.\u0275mod=s.oAB({type:n}),n.\u0275inj=s.cJS({imports:[c.ez,f.Bz.forChild(h),t.QW]}),l})()}}]);