// OFF THE GRID — starter app. Demo data is saved in this browser only.
const ADMIN_PASSWORD = "gridmode"; // Change this before publishing; this is NOT secure authentication.
const $ = (id) => document.getElementById(id);
const todayKey = () => new Date().toISOString().slice(0,10);
const load = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));

let steps = load("otg_steps", {});
let games = load("otg_games", []);
let ps5 = load("otg_ps5", []);
let discoveries = load("otg_discoveries", [
  {name:"POINTER POINTER",desc:"A photo of someone pointing at your cursor.",url:"https://pointerpointer.com/"},
  {name:"WINDOW SWAP",desc:"Look through windows around the world.",url:"https://www.window-swap.com/"},
  {name:"THE USELESS WEB",desc:"A portal to random corners of the internet.",url:"https://theuselessweb.com/"},
  {name:"NEAL.FUN",desc:"A collection of curious internet experiments.",url:"https://neal.fun/"}
]);
let discoverySeen = false;
const quotes = ["You don't need motivation. You need your shoes on.","A little progress is still progress.","Your future self is rooting for today's walk.","Go outside. The internet will still be here.","One more block. One more step. Keep going."];
function todaySteps(){return Number(steps[todayKey()]||0)}
function streakCount(){let n=0,d=new Date();while(true){const k=d.toISOString().slice(0,10);if((steps[k]||0)>=10000){n++;d.setDate(d.getDate()-1)}else break}return n}
function renderClub(){
 const n=todaySteps(),pct=Math.min(100,Math.round(n/10000*100)),vals=Object.values(steps).map(Number);
 $("stepDisplay").textContent=n.toLocaleString("en-IN");$("stepProgress").style.width=pct+"%";$("stepPercent").textContent=pct+"% COMPLETE";$("stepStatus").textContent=n>=10000?"CHALLENGE COMPLETE":"KEEP MOVING";
 $("streak").innerHTML=streakCount()+' <small>DAYS</small>';$("best").innerHTML=(vals.length?Math.max(...vals):0).toLocaleString("en-IN")+' <small>STEPS</small>';$("daysHit").textContent=vals.filter(v=>v>=10000).length;
 const cal=$("calendar");cal.innerHTML="";for(let i=13;i>=0;i--){let d=new Date();d.setDate(d.getDate()-i);let k=d.toISOString().slice(0,10),v=Number(steps[k]||0),el=document.createElement("div");el.className="cal-day"+(v>=10000?" hit":"")+(i===0?" today":"");el.innerHTML=`${d.toLocaleDateString("en",{weekday:"short"}).toUpperCase()}<br><b>${d.getDate()}</b>`;el.title=`${v.toLocaleString()} steps`;cal.append(el)}
 $("stepInput").value=n||"";unlockAchievements();
}
function unlockAchievements(){
 const vals=Object.values(steps).map(Number),first=vals.some(v=>v>0),ten=vals.some(v=>v>=10000),three=vals.filter(v=>v>=10000).length>=3;
 [["achFirst",first],["ach10k",ten],["ach3",three],["achDiscover",discoverySeen]].forEach(([id,on])=>{const el=$(id);el.textContent=on?"UNLOCKED":"LOCKED";el.closest(".achievement").classList.toggle("unlocked",on)});
}
$("logSteps").addEventListener("click",()=>{const v=Math.floor(Number($("stepInput").value));if(!Number.isFinite(v)||v<0||v>100000){$("stepFeedback").textContent="Enter a number between 0 and 100,000.";return}steps[todayKey()]=v;save("otg_steps",steps);$("stepFeedback").textContent="Progress saved on this device. Keep it moving.";renderClub()});
$("newQuote").addEventListener("click",()=>{$("motivation").textContent=quotes[Math.floor(Math.random()*quotes.length)]});
function renderGames(){const grid=$("gameGrid");games.forEach((g,i)=>{const card=document.createElement("article");card.className="feature-card game-card";card.innerHTML=`<div class="card-top"><span>USER ADDED / ${String(i+4).padStart(2,"0")}</span><span class="tag">CUSTOM</span></div><div class="game-art art-${["one","two","three"][i%3]}"><span>✳</span></div><h3></h3><p></p><a class="text-link" target="_blank" rel="noopener">PLAY NOW ↗</a>`;card.querySelector("h3").textContent=g.name;card.querySelector("p").textContent=g.desc;card.querySelector("a").href=g.url;grid.append(card)})}
function renderPs5(){const list=$("ps5List");ps5.forEach((g,i)=>{const row=document.createElement("div");row.className="vault-game";row.innerHTML=`<span class="game-index">${String(i+5).padStart(2,"0")}</span><div><strong></strong><small></small></div><span class="game-state">＋</span>`;row.querySelector("strong").textContent=g.name;row.querySelector("small").textContent=g.status||"BACKLOG";list.append(row)})}
function renderDiscoveries(){const box=$("discoveryLinks");box.innerHTML="";discoveries.forEach((d,i)=>{const a=document.createElement("a");a.href=d.url;a.target="_blank";a.rel="noopener";a.innerHTML=`<span>${String(i+1).padStart(2,"0")}</span> <b>↗</b>`;const name=document.createTextNode(" "+d.name+" ");a.insertBefore(name,a.querySelector("b"));box.append(a)})}
$("randomBtn").addEventListener("click",()=>{if(!discoveries.length)return;const d=discoveries[Math.floor(Math.random()*discoveries.length)];$("discoveryName").textContent=d.name;$("discoveryDesc").textContent=d.desc;$("discoverySymbol").textContent=["✳","◈","✦","⌁","∞"][Math.floor(Math.random()*5)];discoverySeen=true;unlockAchievements();window.open(d.url,"_blank","noopener")});
$("secretBtn").addEventListener("click",()=>{$("secretMessage").classList.toggle("hidden");$("secretBtn").textContent=$("secretMessage").classList.contains("hidden")?"OPEN THE SECRET ROOM ↗":"CLOSE SECRET ROOM ↙"});
$("adminOpen").addEventListener("click",()=>$("adminModal").classList.remove("hidden"));$("adminClose").addEventListener("click",()=>$("adminModal").classList.add("hidden"));$("adminModal").addEventListener("click",e=>{if(e.target===$("adminModal"))$("adminModal").classList.add("hidden")});
$("unlockAdmin").addEventListener("click",()=>{if($("adminPassword").value===ADMIN_PASSWORD){$("adminLock").classList.add("hidden");$("adminContent").classList.remove("hidden")}else alert("Access key incorrect.")});
document.querySelectorAll(".admin-tabs button").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".admin-tabs button").forEach(b=>b.classList.toggle("active",b===btn));["games","ps5","discoveries"].forEach(t=>$("pane-"+t).classList.toggle("hidden",t!==btn.dataset.tab))}));
function validUrl(s){try{const u=new URL(s);return ["http:","https:"].includes(u.protocol)}catch{return false}}
$("addGame").addEventListener("click",()=>{const name=$("newGameName").value.trim(),desc=$("newGameDesc").value.trim(),url=$("newGameUrl").value.trim();if(!name||!validUrl(url)){alert("Add a game name and a valid https:// URL.");return}games.push({name,desc,url});save("otg_games",games);const g=games.pop();games.unshift(g);save("otg_games",games);$("gameGrid").querySelectorAll(".game-card").forEach((el,i)=>{if(i>=3)el.remove()});renderGames();$("newGameName").value=$("newGameDesc").value=$("newGameUrl").value="";});
$("addPs5").addEventListener("click",()=>{const name=$("newPs5Name").value.trim(),status=$("newPs5Status").value.trim();if(!name){alert("Add a game title.");return}ps5.push({name,status});save("otg_ps5",ps5);const list=$("ps5List");list.querySelectorAll(".user-added").forEach(e=>e.remove());const row=document.createElement("div");row.className="vault-game user-added";row.innerHTML=`<span class="game-index">＋</span><div><strong></strong><small></small></div><span class="game-state">＋</span>`;row.querySelector("strong").textContent=name;row.querySelector("small").textContent=status||"BACKLOG";list.append(row);$("newPs5Name").value=$("newPs5Status").value="";});
$("addDiscovery").addEventListener("click",()=>{const name=$("newDiscoveryName").value.trim(),desc=$("newDiscoveryDesc").value.trim(),url=$("newDiscoveryUrl").value.trim();if(!name||!validUrl(url)){alert("Add a discovery name and valid URL.");return}discoveries.push({name,desc,url});save("otg_discoveries",discoveries);const a=document.createElement("a");a.href=url;a.target="_blank";a.rel="noopener";a.innerHTML=`<span>${String(discoveries.length).padStart(2,"0")}</span> <b>↗</b>`;a.insertBefore(document.createTextNode(" "+name+" "),a.querySelector("b"));$("discoveryLinks").append(a);$("newDiscoveryName").value=$("newDiscoveryDesc").value=$("newDiscoveryUrl").value="";});
function clock(){const d=new Date();$("clock").textContent=d.toLocaleTimeString("en-IN",{timeZone:"Asia/Kolkata",hour12:false})+" IST"}setInterval(clock,1000);clock();
$("menuBtn").addEventListener("click",()=>$("nav").classList.toggle("open"));document.querySelectorAll("nav a").forEach(a=>a.addEventListener("click",()=>$("nav").classList.remove("open")));
renderClub();renderGames();renderPs5();renderDiscoveries();
