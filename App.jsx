import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Building2, Cloud, Zap, FileText, Leaf, MessageSquare,
  BarChart3, Settings, Search, Plus, RefreshCw, Menu, X, Bell
} from "lucide-react";
import { supabase } from "./lib/supabase";

const branchSeed = [
  {name:"Mumbai Fort",city:"Mumbai",region:"West",code:"MUM-001",manager:"Priya Shah",score:78,grade:"B",co2:12.4,kwh:18.4,paper:24.0,trend:-4.2},
  {name:"Delhi Connaught",city:"Delhi",region:"North",code:"DEL-014",manager:"Arjun Mehta",score:64,grade:"C",co2:18.9,kwh:27.2,paper:31.0,trend:2.1},
  {name:"Bangalore MG Road",city:"Bangalore",region:"South",code:"BLR-007",manager:"Divya Rao",score:91,grade:"A",co2:8.2,kwh:12.8,paper:15.4,trend:-8.5},
  {name:"Chennai T. Nagar",city:"Chennai",region:"South",code:"CHN-022",manager:"Karthik Iyer",score:74,grade:"B",co2:14.1,kwh:21.5,paper:22.8,trend:-1.4},
  {name:"Kolkata Park St",city:"Kolkata",region:"East",code:"KOL-009",manager:"Riya Sen",score:52,grade:"D",co2:22.5,kwh:32.0,paper:40.2,trend:6.8},
  {name:"Hyderabad Banjara",city:"Hyderabad",region:"South",code:"HYD-018",manager:"Anil Reddy",score:86,grade:"A",co2:10.3,kwh:15.6,paper:18.7,trend:-5.2},
  {name:"Pune Koregaon",city:"Pune",region:"West",code:"PUN-031",manager:"Sneha Kulkarni",score:80,grade:"B",co2:11.8,kwh:17.3,paper:20.1,trend:-3.1},
  {name:"Ahmedabad CG Rd",city:"Ahmedabad",region:"West",code:"AHM-045",manager:"Vikram Patel",score:68,grade:"C",co2:16.7,kwh:24.8,paper:28.9,trend:1.5},
  {name:"Jaipur MI Road",city:"Jaipur",region:"North",code:"JAI-052",manager:"Neha Sharma",score:72,grade:"B",co2:13.2,kwh:19.7,paper:21.4,trend:-2.0},
  {name:"Panaji Main",city:"Panaji",region:"West",code:"GOA-061",manager:"Rohan D'Souza",score:94,grade:"A",co2:6.9,kwh:10.2,paper:12.8,trend:-11.3}
];

const nav = [
  ["Dashboard","/",LayoutDashboard],["Branches","/branches",Building2],["Emissions","/emissions",Cloud],
  ["Energy","/energy",Zap],["Paper Usage","/paper-usage",FileText],["Green Rooms","/green-rooms",Leaf],
  ["SMS Alerts","/sms-alerts",MessageSquare],["ESG Reports","/esg-reports",BarChart3],["Admin Panel","/admin",Settings]
];

function Layout({children}) {
  const [open,setOpen]=useState(false);
  const location=useLocation();
  const title=nav.find(x=>x[1]===location.pathname)?.[0] || "Dashboard";
  return <div className="app">
    <aside className={"sidebar "+(open?"show":"")}>
      <div className="brand"><div className="logo">V</div><div><b>Verdant</b><span>ESG Monitor</span></div><button className="mobile-close" onClick={()=>setOpen(false)}><X size={18}/></button></div>
      <nav>{nav.map(([label,path,Icon])=><NavLink key={path} to={path} onClick={()=>setOpen(false)} className={({isActive})=>isActive?"active":""}><Icon size={18}/><span>{label}</span></NavLink>)}</nav>
      <div className="sidebar-bottom"><div className="status-dot"></div><div><b>System healthy</b><span>FY26 · Bank-wide</span></div></div>
    </aside>
    {open && <div className="overlay" onClick={()=>setOpen(false)} />}
    <main className="main">
      <header className="topbar"><button className="menu" onClick={()=>setOpen(true)}><Menu size={21}/></button><div><small>VERDANT ESG MONITOR</small><h2>{title}</h2></div><div className="top-actions"><button><Bell size={18}/></button><div className="avatar">RS</div></div></header>
      <section className="content">{children}</section>
    </main>
  </div>
}

function Card({title,value,sub,icon:Icon,good=true}) {
 return <div className="metric card"><div className="metric-top"><span>{title}</span><div className="icon-box"><Icon size={17}/></div></div><strong>{value}</strong><div className={good?"delta good":"delta bad"}>{sub}</div></div>
}

function Dashboard({branches}) {
 const trend=[{m:"Feb",e:154,n:225},{m:"Mar",e:149,n:219},{m:"Apr",e:145,n:211},{m:"May",e:142,n:207},{m:"Jun",e:141,n:206},{m:"Jul",e:135,n:199}];
 const sources=[["Electricity",48],["Travel",19],["Fleet",14],["Waste",8],["Other",11]];
 return <div>
  <div className="page-head"><div><p className="eyebrow">FY26 · Bank-wide reporting</p><h1>Sustainability Overview</h1><p className="muted">Bank-wide ESG performance · July 2026</p></div><button className="primary"><Plus size={17}/> Log activity</button></div>
  <div className="ai"><div className="ai-badge">AI</div><div><b>AI insight</b><p>Bank-wide emissions fell 4.2% MoM. Kolkata Park St drove 63% of the remaining variance — consider an HVAC audit and a paper-lite retrofit.</p></div></div>
  <div className="metrics"><Card title="Carbon emissions" value="135.0 tCO₂e" sub="↓ 4.2% vs previous month" icon={Cloud}/><Card title="Energy consumption" value="199.5 MWh" sub="↓ 3.6% vs previous month" icon={Zap}/><Card title="Paper usage" value="235.3k sheets" sub="↓ 1.2% vs previous month" icon={FileText}/><Card title="ESG score" value="76 / 100" sub="↑ 2.4% vs previous month" icon={Leaf}/></div>
  <div className="grid-2"><div className="card chart-card"><div className="card-head"><div><b>Emissions & energy trend</b><span>Last 6 months</span></div></div><div className="chart"><svg viewBox="0 0 600 210" preserveAspectRatio="none"><polyline fill="none" stroke="currentColor" strokeWidth="3" points="10,75 125,85 240,102 355,110 470,115 590,140"/><polyline fill="none" stroke="currentColor" strokeWidth="2" opacity=".45" points="10,35 125,50 240,67 355,73 470,78 590,105"/></svg><div className="axis">{trend.map(x=><span key={x.m}>{x.m}</span>)}</div></div></div>
  <div className="card"><div className="card-head"><div><b>Emissions by source</b><span>tCO₂e this month</span></div></div>{sources.map(([n,v])=><div className="bar-row" key={n}><span>{n}</span><div className="bar"><i style={{width:v*1.65+"%"}}/></div><b>{v}%</b></div>)}</div></div>
  <div className="card"><div className="card-head"><div><b>Branch leaderboard</b><span>Current ESG score</span></div><NavLink to="/branches" className="link">View all</NavLink></div><div className="table-wrap"><table><thead><tr><th>#</th><th>Branch</th><th>Region</th><th>ESG score</th><th>Grade</th><th>MoM</th></tr></thead><tbody>{[...branches].sort((a,b)=>b.score-a.score).map((b,i)=><tr key={b.code}><td>{i+1}</td><td><b>{b.name}</b><small>{b.code}</small></td><td>{b.region}</td><td><b>{b.score}</b></td><td><span className={"grade g-"+b.grade}>{b.grade}</span></td><td className={b.trend<0?"green":"red"}>{b.trend<0?"▼":"▲"} {Math.abs(b.trend)}%</td></tr>)}</tbody></table></div></div>
 </div>
}

function Branches({branches,setBranches}) {
 const [q,setQ]=useState("");
 const list=branches.filter(b=>(b.name+" "+b.code+" "+b.city).toLowerCase().includes(q.toLowerCase()));
 return <div><div className="page-head"><div><h1>Branch Management</h1><p className="muted">{branches.length} of {branches.length} branches</p></div><button className="primary" onClick={()=>setBranches([...branches,{...branchSeed[0],name:"New Branch",code:"NEW-"+(branches.length+1)}])}><Plus size={17}/> Add branch</button></div>
 <div className="search"><Search size={18}/><input placeholder="Search by name, code, city…" value={q} onChange={e=>setQ(e.target.value)}/></div>
 <div className="branch-grid">{list.map(b=><div className="card branch" key={b.code}><div className="branch-title"><div><b>{b.name}</b><span>{b.city} · {b.region}</span></div><span className={"grade g-"+b.grade}>{b.grade}</span></div><div className="code">{b.code} · {b.manager}</div><div className="branch-stats"><div><span>ESG</span><strong>{b.score}</strong></div><div><span>tCO₂e</span><strong>{b.co2}</strong></div><div><span>kWh</span><strong>{b.kwh}k</strong></div><div><span>Paper</span><strong>{b.paper}k</strong></div></div><div className={b.trend<0?"green":"red"}>{b.trend<0?"▼":"▲"} {Math.abs(b.trend)}% MoM</div></div>)}</div></div>
}

function Emissions() {
 const [rows,setRows]=useState([{date:"2026-07-10",branch:"Mumbai Fort",source:"Electricity",qty:"4,200",unit:"kWh",co2:"3.44"},{date:"2026-07-09",branch:"Delhi Connaught",source:"Travel",qty:"1,240",unit:"km",co2:"0.29"},{date:"2026-07-08",branch:"Bangalore MG Road",source:"Waste",qty:"180",unit:"kg",co2:"0.09"},{date:"2026-07-07",branch:"Kolkata Park St",source:"Electricity",qty:"6,800",unit:"kWh",co2:"5.58"},{date:"2026-07-06",branch:"Pune Koregaon",source:"Fleet",qty:"320",unit:"L",co2:"0.83"},{date:"2026-07-05",branch:"Hyderabad Banjara",source:"Electricity",qty:"3,600",unit:"kWh",co2:"2.95"}]);
 const [form,setForm]=useState({branch:"Mumbai Fort",source:"Electricity",qty:"",unit:"kWh"});
 const save=()=>{if(!form.qty)return; const factor=form.source==="Electricity"?0.00082:form.source==="Travel"?0.00023:form.source==="Fleet"?0.0026:0.0005; const co2=(Number(form.qty)*factor).toFixed(2); setRows([{date:new Date().toISOString().slice(0,10),...form,co2},...rows]);setForm({...form,qty:""})};
 return <div><div className="page-head"><div><h1>Carbon Emissions Tracker</h1><p className="muted">Auto-calculated using standard emission factors</p></div></div>
 <div className="card form-card"><div className="card-head"><div><b>Log emission entry</b><span>CO₂e is auto-calculated with GHG Protocol emission factors.</span></div></div><div className="form-grid"><label>Branch<select value={form.branch} onChange={e=>setForm({...form,branch:e.target.value})}>{branchSeed.map(b=><option key={b.code}>{b.name}</option>)}</select></label><label>Source<select value={form.source} onChange={e=>setForm({...form,source:e.target.value})}>{["Electricity","Travel","Waste","Fleet"].map(x=><option key={x}>{x}</option>)}</select></label><label>Quantity<input value={form.qty} onChange={e=>setForm({...form,qty:e.target.value})} placeholder="e.g. 4200"/></label><label>Unit<input value={form.unit} onChange={e=>setForm({...form,unit:e.target.value})} placeholder="kWh, km, kg, L…"/></label><div className="calc"><span>Calculated CO₂e</span><b>{form.qty?((Number(form.qty)*(form.source==="Electricity"?0.00082:form.source==="Travel"?0.00023:form.source==="Fleet"?0.0026:0.0005)).toFixed(2)):"0.00"} t</b></div><button className="primary save" onClick={save}>Save entry</button></div></div>
 <div className="card"><div className="card-head"><b>Recent entries</b></div><div className="table-wrap"><table><thead><tr><th>Date</th><th>Branch</th><th>Source</th><th>Quantity</th><th>CO₂e</th></tr></thead><tbody>{rows.map((r,i)=><tr key={i}><td>{r.date}</td><td>{r.branch}</td><td>{r.source}</td><td>{r.qty} {r.unit}</td><td><b>{r.co2}</b></td></tr>)}</tbody></table></div></div></div>
}

function Energy() {
 const anomalies=[["Kolkata Park St","high","Energy · 11,240 kWh","Detected Jul 19, 03:12"],["Delhi Connaught","medium","Energy · 9,180 kWh","Detected Jul 14, 14:40"],["Ahmedabad CG Rd","low","Paper · 1,820 sheets","Detected Jul 09, 10:22"]];
 return <div><div className="page-head"><div><h1>Energy Consumption Monitor</h1><p className="muted">Daily kWh vs. target · anomaly detection</p></div></div><div className="metrics"><Card title="Daily average" value="6,650 kWh" sub="↓ 5.0% vs target" icon={Zap}/><Card title="Monthly total" value="199.5 MWh" sub="↓ 3.6% vs previous month" icon={BarChart3}/><Card title="Target" value="7,000 kWh/day" sub="Within target range" icon={Leaf}/></div><div className="grid-2"><div className="card chart-card"><div className="card-head"><div><b>Bank-wide daily consumption</b><span>Last 30 days · target 7,000 kWh/day</span></div></div><div className="energy-visual">{Array.from({length:30},(_,i)=><i key={i} style={{height:(35+((i*17)%55))+"%"}}/>)}</div></div><div className="card"><div className="card-head"><div><b>Anomalies flagged</b><span>AI-detected outliers</span></div><RefreshCw size={17}/></div>{anomalies.map(a=><div className="anomaly" key={a[0]}><span className={"severity "+a[1]}>{a[1]}</span><div><b>{a[0]}</b><span>{a[2]}</span><small>{a[3]}</small></div></div>)}</div></div></div>
}

function SimplePage({title,subtitle,icon:Icon,children}) { return <div><div className="page-head"><div><h1>{title}</h1><p className="muted">{subtitle}</p></div><button className="primary"><Plus size={17}/> Add entry</button></div><div className="card empty-card"><Icon size={36}/><h3>{children || "Module ready"}</h3><p>Connect this module to your Supabase tables to start storing and displaying live data.</p></div></div> }

export default function App() {
 const [branches,setBranches]=useState(branchSeed);
 useEffect(()=>{ if(!supabase)return; supabase.from("branches").select("*").order("name").then(({data,error})=>{if(!error && data?.length){setBranches(data.map(b=>({...b,score:Number(b.esg_score||0),grade:Number(b.esg_score||0)>=85?"A":Number(b.esg_score||0)>=70?"B":Number(b.esg_score||0)>=55?"C":"D",co2:0,kwh:0,paper:0,trend:0})))}})},[]);
 return <Layout><Routes>
   <Route path="/" element={<Dashboard branches={branches}/>}/>
   <Route path="/branches" element={<Branches branches={branches} setBranches={setBranches}/>}/>
   <Route path="/emissions" element={<Emissions/>}/>
   <Route path="/energy" element={<Energy/>}/>
   <Route path="/paper-usage" element={<SimplePage title="Paper Usage Monitor" subtitle="Track paper consumption and reduction targets" icon={FileText}>Paper usage tracking</SimplePage>}/>
   <Route path="/green-rooms" element={<SimplePage title="Green Rooms" subtitle="Monitor green room initiatives and energy savings" icon={Leaf}>Green room management</SimplePage>}/>
   <Route path="/sms-alerts" element={<SimplePage title="SMS Alerts" subtitle="Manage sustainability alerts and notifications" icon={MessageSquare}>SMS alert center</SimplePage>}/>
   <Route path="/esg-reports" element={<SimplePage title="ESG Reports" subtitle="Generate and review bank-wide sustainability reports" icon={BarChart3}>ESG reporting</SimplePage>}/>
   <Route path="/admin" element={<SimplePage title="Admin Panel" subtitle="System settings and data administration" icon={Settings}>Administration</SimplePage>}/>
 </Routes></Layout>
}