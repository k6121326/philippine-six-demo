const draw = {issue:"DEMO-0001", numbers:["03","05","07","08","09","02"]};
const history = [
  {issue:"DEMO-0001",numbers:["03","05","07","08","09","02"]},
  {issue:"DEMO-0000",numbers:["01","04","06","07","08","10"]},
  {issue:"DEMO-0099",numbers:["02","03","05","08","09","01"]}
];
const $ = id => document.getElementById(id);
function renderBalls(target, nums){$(target).innerHTML=nums.map((n,i)=>`<span class="ball ${i===5?'blue':''}">${n}</span>`).join("");}
function renderHistory(target, english=false){$(target).innerHTML=history.map(h=>`<div class="history-row"><span>${english?'Draw ':'期数 '}${h.issue}</span><span class="mini-balls">${h.numbers.join(" · ")}</span></div>`).join("");}
renderBalls("balls",draw.numbers);renderBalls("ballsEn",draw.numbers);
$("drawIssue").textContent=draw.issue;$("drawIssueEn").textContent=draw.issue;
renderHistory("historyCn");renderHistory("historyEn",true);
document.querySelectorAll("[data-view]").forEach(btn=>btn.addEventListener("click",()=>{
 document.querySelectorAll("[data-view]").forEach(b=>b.classList.toggle("active",b===btn));
 document.querySelectorAll(".view").forEach(v=>v.classList.toggle("active",v.id===btn.dataset.view));
}));
$("demoLogin").addEventListener("click",()=>{$("loginNotice").textContent="演示登录已打开：本版本不创建真实账户。";});
$("showNotice").addEventListener("click",()=>{$("loginNotice").textContent="本网站为静态演示，不接收真实资金，不提供真实下注或提现。";});
const people=[{name:"Lucky888",id:"DEMO-1001",messages:[["customer","你好，请问如何查看历史记录？"],["admin","您好，可以在首页的历史期数区域查看演示记录。"],["customer","好的，谢谢！"]]},{name:"WinKing66",id:"DEMO-1002",messages:[["customer","我无法打开英文页面。"],["admin","您好，请尝试点击顶部的 English Results。"] ]},{name:"Dreamer001",id:"DEMO-1003",messages:[["customer","这是测试消息。"]] }];
let selected=0;
function getSaved(){try{return JSON.parse(localStorage.getItem("demoChats")||"{}")}catch(e){return {}}}
function save(){localStorage.setItem("demoChats",JSON.stringify(people.map(p=>p.messages)));}
function renderPeople(){const q=$("customerSearch").value.toLowerCase();$("customers").innerHTML=people.map((p,i)=>({p,i})).filter(x=>x.p.name.toLowerCase().includes(q)).map(({p,i})=>`<button class="customer ${i===selected?'selected':''}" data-person="${i}"><span class="avatar">${p.name[0]}</span><span><b>${p.name}</b><small>${p.messages[p.messages.length-1]?.[1]||p.messages[p.messages.length-1]?.[0]||"暂无消息"}</small></span></button>`).join("");document.querySelectorAll("[data-person]").forEach(b=>b.onclick=()=>{selected=Number(b.dataset.person);renderPeople();renderChat();});}
function renderChat(){const p=people[selected];$("chatName").textContent=p.name;$("profileName").textContent=p.name;$("chatStatus").textContent="演示客户 · 测试会话";$("messages").innerHTML=p.messages.map(([who,msg])=>`<div class="msg ${who==="admin"?"admin-msg":"customer-msg"}">${escapeHtml(msg)}<time>${who==="admin"?"平台客服":"客户"} · 演示消息</time></div>`).join("");$("messages").scrollTop=$("messages").scrollHeight;}
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
$("customerSearch").addEventListener("input",renderPeople);
$("chatForm").addEventListener("submit",e=>{e.preventDefault();const v=$("messageInput").value.trim();if(!v)return;people[selected].messages.push(["admin",v]);$("messageInput").value="";save();renderPeople();renderChat();});
const saved=getSaved();if(Array.isArray(saved)&&saved.length===people.length)saved.forEach((m,i)=>{if(Array.isArray(m))people[i].messages=m;});
renderPeople();renderChat();
