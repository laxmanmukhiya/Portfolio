// ============================================================
// GameRoom — Kirokaze pixel-art aesthetic restyle
// Warm browns, CRT glow, retro beige hardware, striped rug
// All components and data unchanged — only visual styling
// ============================================================
import React, { useState, useEffect } from "react";
import { profile } from "../data/profile";

export default function GameRoom({ onObjectClick, visitedPanels }) {
  const [hoveredObj, setHoveredObj] = useState(null);
  const [blinkFrame, setBlinkFrame] = useState(0);
  const [floatFrame, setFloatFrame] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setBlinkFrame(f => (f + 1) % 60), 100);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const t = setInterval(() => setFloatFrame(f => (f + 1) % 100), 80);
    return () => clearInterval(t);
  }, []);

  const eyeOpen = blinkFrame < 55;

  const handleClick = (panelId) => { if (panelId) onObjectClick(panelId); };
  const isVisited = (id) => visitedPanels.has(id);

  return (
    <div style={s.root}>

      {/* TOP BAR */}
      <div style={s.topBar}>
        <div style={{display:'flex',gap:6}}>
          {['#c0392b','#e67e22','#27ae60'].map((c,i)=>(
            <span key={i} style={{display:'inline-block',width:12,height:12,borderRadius:'50%',background:c,border:`1px solid ${['#922b21','#b8600e','#1e8449'][i]}`}}/>
          ))}
        </div>
        <span style={s.topBarTitle}>// {profile.name}'s Room — Portfolio OS v1.0</span>
        <span style={s.topBarHint}>Click objects to explore ✦</span>
      </div>

      {/* SCENE WRAPPER */}
      <div style={s.scene}>

        {/* ═══ BACK WALL ═══ */}
        <div style={s.backWall}>
          <div style={s.wallTop} />
          {/* Wall damage patches */}
          <div style={{position:'absolute',left:'38%',top:30,width:90,height:55,background:'#5a3a28',opacity:0.25,clipPath:'polygon(5% 0,95% 8%,100% 92%,8% 100%)',zIndex:1}}/>
          <div style={{position:'absolute',left:'58%',top:18,width:60,height:40,background:'#7a5035',opacity:0.18,clipPath:'polygon(0 10%,92% 0,100% 85%,10% 100%)',zIndex:1}}/>
          <div style={{position:'absolute',right:'22%',top:55,width:40,height:28,background:'#4a2e1c',opacity:0.2,clipPath:'polygon(8% 0,100% 5%,95% 100%,0 90%)',zIndex:1}}/>

          {/* WINDOW */}
          <Obj id="window" h={hoveredObj} sh={setHoveredObj} onClick={()=>{}} style={{position:'absolute',left:'20%',top:18,zIndex:3}}>
            <div style={s.winOuter}>
              {/* Venetian blinds */}
              <div style={s.blindsOuter}>
                {Array.from({length:10}).map((_,i)=>(
                  <div key={i} style={{height:5,background:i%2===0?'#c8b89a':'#b0a080',borderBottom:'1px solid #887050',opacity:0.9}}/>
                ))}
              </div>
              {/* Window gap showing outside */}
              <div style={s.winGlass}>
                <div style={s.sky}>
                  {/* Light rays on floor (the signature Kirokaze effect) */}
                  <div style={{position:'absolute',bottom:-20,left:-10,width:240,height:80,background:'linear-gradient(170deg,#b8d87840,transparent 70%)',pointerEvents:'none'}}/>
                  {[[6,8],[18,22],[32,6],[48,16],[62,5],[74,20],[86,10],[14,38],[58,32]].map(([x,y],i)=>(
                    <div key={i} style={{position:'absolute',left:`${x}%`,top:`${y}%`,width:i%3?2:3,height:i%3?2:3,background:'#fff',borderRadius:'50%',animation:`starTwinkle ${2+i*0.3}s ease-in-out infinite`,animationDelay:`${i*0.35}s`}}/>
                  ))}
                  <div style={s.moon}/>
                  <Cloud style={{top:'22%',animationDuration:'20s'}}/>
                  <Cloud style={{top:'50%',animationDuration:'30s',animationDelay:'-14s',opacity:0.6}}/>
                  {/* Pixel cityscape */}
                  <svg style={{position:'absolute',bottom:0,left:0,width:'100%',height:65}} viewBox="0 0 220 65" preserveAspectRatio="none">
                    {[[0,35,22,30],[24,28,14,37],[40,38,20,27],[62,22,24,43],[88,34,18,31],[108,30,22,35],[132,24,28,41],[162,40,16,25],[180,32,20,33]].map(([x,y,w,h],i)=>(
                      <rect key={i} x={x} y={y} width={w} height={65-y} fill={`hsl(30,${15+i*2}%,${10+i}%)`}/>
                    ))}
                    {[[8,28],[26,22],[44,32],[66,16],[90,26],[112,20],[135,18],[165,34],[184,26]].map(([x,y],i)=>(
                      <rect key={i} x={x} y={y} width={3} height={3} fill={i%3===0?'#e8c870':i%3===1?'#b8d878':'#d4a870'} opacity="0.75"/>
                    ))}
                  </svg>
                </div>
              </div>
              {/* Window frame dividers */}
              <div style={s.winBarH}/><div style={s.winBarV}/>
            </div>
            <div style={s.winSill}/>
          </Obj>

          {/* SKILLS POSTER — sticky notes style */}
          <Obj id="poster" h={hoveredObj} sh={setHoveredObj} onClick={()=>handleClick('skills')}
            visited={isVisited('skills')} tip="📋 View Skills"
            style={{position:'absolute',left:'4%',top:22,zIndex:3}}>
            <div style={s.posterFrame}>
              <div style={s.posterInner}>
                <div style={s.posterTitle}>TECH STACK</div>
                <div style={{display:'flex',flexWrap:'wrap',gap:3,justifyContent:'center',margin:'5px 0'}}>
                  {[['🐍','#5a8a3a'],['🧠','#b85a3a'],['⚙️','#9a8530'],['📊','#5a6a9a'],['☁️','#3a8a7a'],['🔥','#b87030']].map(([e,c],i)=>(
                    <div key={i} style={{width:30,height:30,border:`1px solid ${c}`,display:'flex',alignItems:'center',justifyContent:'center',background:'#2a1e10',fontSize:14,boxShadow:`inset 0 0 6px ${c}30`}}>{e}</div>
                  ))}
                </div>
                <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:5,color:'#6a5a40',marginTop:3,letterSpacing:0.5}}>AI & DATA SCIENCE</div>
              </div>
            </div>
            {/* Sticky notes on wall */}
            <div style={{position:'absolute',top:-14,left:-10,width:38,height:32,background:'#d4b84a',transform:'rotate(-8deg)',padding:'3px 4px',fontSize:6,fontFamily:"'Press Start 2P',monospace",color:'#5a4820',lineHeight:1.4,boxShadow:'2px 2px 0 #00000040',zIndex:4}}>
              TODO<br/>↓ skills
            </div>
            <div style={{position:'absolute',top:-8,right:-14,width:34,height:28,background:'#b8d878',transform:'rotate(6deg)',padding:'3px 4px',fontSize:6,fontFamily:"'Press Start 2P',monospace",color:'#2a4820',lineHeight:1.4,boxShadow:'2px 2px 0 #00000040',zIndex:4}}>
              v2.0<br/>ready
            </div>
          </Obj>

          {/* CHALKBOARD / greenboard */}
          <div style={{position:'absolute',left:'32%',top:12,zIndex:3,width:140,height:100}}>
            <div style={{width:'100%',height:'100%',background:'#2a4a2a',border:'5px solid #5a3a1a',borderBottom:'8px solid #6a4a2a',boxShadow:'inset 0 0 20px #00000060,3px 3px 0 #00000060',padding:8,position:'relative'}}>
              {/* Chalk drawing — circuit/code doodle */}
              <svg width="100%" height="100%" viewBox="0 0 128 88" style={{opacity:0.85}}>
                <line x1="10" y1="20" x2="40" y2="20" stroke="#c8e8c8" strokeWidth="1.5" strokeLinecap="round"/>
                <rect x="40" y="14" width="16" height="12" fill="none" stroke="#c8e8c8" strokeWidth="1.5" rx="1"/>
                <line x1="56" y1="20" x2="80" y2="20" stroke="#c8e8c8" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="80" cy="20" r="6" fill="none" stroke="#c8e8c8" strokeWidth="1.5"/>
                <line x1="86" y1="20" x2="118" y2="20" stroke="#c8e8c8" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="80" y1="26" x2="80" y2="50" stroke="#c8e8c8" strokeWidth="1.2" strokeDasharray="3 2"/>
                <text x="8" y="62" fill="#c8e8c8" fontSize="8" fontFamily="monospace">&gt; run()</text>
                <text x="8" y="74" fill="#a8c8a8" fontSize="7" fontFamily="monospace">OK: 42ms</text>
                {/* Erased smudge */}
                <rect x="90" y="42" width="30" height="20" fill="#2a4a2a" opacity="0.6"/>
                <rect x="92" y="44" width="24" height="14" fill="#3a5a3a" opacity="0.4"/>
              </svg>
              {/* Chalk ledge */}
              <div style={{position:'absolute',bottom:-12,left:0,right:0,height:8,background:'#6a4a2a',display:'flex',alignItems:'center',gap:4,paddingLeft:6}}>
                {[0,1,2].map(i=>(<div key={i} style={{width:12,height:4,background:'#e8e0d0',opacity:0.9,borderRadius:1}}/>))}
              </div>
            </div>
          </div>

          {/* Calendar on wall */}
          <div style={{position:'absolute',left:'50%',top:16,zIndex:3,marginLeft:-28}}>
            <div style={{width:56,height:52,background:'#e8e0d0',border:'2px solid #8a6a40',boxShadow:'2px 2px 0 #00000060',padding:'3px 4px'}}>
              <div style={{background:'#b83a2a',padding:'2px 3px',marginBottom:2,textAlign:'center'}}>
                <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:5,color:'#f0d0c0'}}>APR</div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:1}}>
                {['S','M','T','W','T','F','S'].map((d,i)=>(
                  <div key={i} style={{fontSize:4,fontFamily:"'Press Start 2P',monospace",color:'#8a6a50',textAlign:'center'}}>{d}</div>
                ))}
                {Array.from({length:30}).map((_,i)=>(
                  <div key={i} style={{fontSize:4,fontFamily:"'Press Start 2P',monospace",color:i===2?'#b83a2a':'#5a4030',textAlign:'center',background:i===2?'#e8c0b0':'transparent',fontWeight:i===2?'bold':'normal'}}>{i+1}</div>
                ))}
              </div>
            </div>
            {/* Pin */}
            <div style={{position:'absolute',top:-4,left:'50%',transform:'translateX(-50%)',width:6,height:6,borderRadius:'50%',background:'#c83a2a',border:'1px solid #8a2a1a'}}/>
          </div>

          {/* BOOKSHELF */}
          <Obj id="bookshelf" h={hoveredObj} sh={setHoveredObj} onClick={()=>handleClick('education')}
            visited={isVisited('education')} tip="📚 View Education"
            style={{position:'absolute',right:'5%',top:14,zIndex:3}}>
            <div style={s.shelf}>
              <div style={{display:'flex',alignItems:'flex-end',gap:2,padding:'2px 6px'}}>
                {[['📘',52],['📗',44],['📙',56],['📕',48],['📒',42],['📓',50]].map(([e,h],i)=>(
                  <span key={i} style={{fontSize:18,height:h,display:'flex',alignItems:'flex-end',animation:`bookBob ${2.5+i*0.2}s ease-in-out infinite`,animationDelay:`${i*0.15}s`}}>{e}</span>
                ))}
                <span style={{fontSize:20,marginLeft:4}}>🏆</span>
              </div>
              <div style={s.shelfPlank}/>
              <div style={{display:'flex',alignItems:'flex-end',gap:2,padding:'2px 6px'}}>
                {[['📔',48],['📃',40],['🗂️',44],['📑',46]].map(([e,h],i)=>(
                  <span key={i} style={{fontSize:18,height:h,display:'flex',alignItems:'flex-end'}}>{e}</span>
                ))}
                <span style={{fontSize:18,marginLeft:'auto'}}>🌍</span>
                <span style={{fontSize:16}}>📋</span>
              </div>
              <div style={s.shelfPlank}/>
              <div style={{display:'flex',gap:8,padding:'4px 8px 6px',justifyContent:'center'}}>
                <span style={{fontSize:18}}>🏺</span><span style={{fontSize:16}}>📿</span><span style={{fontSize:16}}>🎮</span>
              </div>
            </div>
          </Obj>

          {/* MUSIC PLAYER */}
          <Obj id="music" h={hoveredObj} sh={setHoveredObj} onClick={()=>handleClick('music')}
            visited={isVisited('music')} tip="🎵 Music Player"
            style={{position:'absolute',left:'66%',top:22,zIndex:3}}>
            <div style={s.musicBox}>
              <div style={s.musicLabel}>♪ BEATS</div>
              <div style={s.musicScreen}>
                {[4,7,3,8,5,9,4,6].map((h,i)=>(
                  <div key={i} style={{width:7,height:h*3,borderRadius:'1px 1px 0 0',background:i%2===0?'#7a9a40':'#a8c860',animation:`barBounce ${0.4+i*0.05}s ease-in-out infinite`,animationDelay:`${i*0.1}s`}}/>
                ))}
              </div>
              <div style={{display:'flex',justifyContent:'space-around',margin:'4px 0'}}>
                {['◀◀','▶','▶▶'].map((btn,i)=>(
                  <span key={i} style={{fontSize:i===1?11:8,color:i===1?'#a8c860':'#6a7850'}}>{btn}</span>
                ))}
              </div>
              <div style={{display:'flex',justifyContent:'space-around'}}>
                {[0,1,2].map(i=>(
                  <div key={i} style={{width:10,height:10,borderRadius:'50%',background:'#1a1408',border:'1px solid #5a6a3060'}}/>
                ))}
              </div>
            </div>
          </Obj>

          {/* LIVE CLOCK */}
          <LiveClock style={{position:'absolute',left:'47%',top:22,zIndex:3}}/>

          {/* WALL TROPHY SHELF */}
          <div style={{position:'absolute',left:'31%',top:110,zIndex:3}}>
            <div style={{display:'flex',gap:8,padding:'4px 10px',justifyContent:'center'}}>
              {['🏆','🥈','⭐','🎖️'].map((e,i)=>(<span key={i} style={{fontSize:i===0?22:18}}>{e}</span>))}
            </div>
            <div style={{height:8,background:'linear-gradient(180deg,#8a6a3a,#6a4a20)',border:'1px solid #aa8a50',borderRadius:'1px 1px 0 0'}}/>
          </div>

          {/* Small wall socket */}
          <div style={{position:'absolute',left:'18%',top:95,zIndex:3}}>
            <div style={{width:18,height:14,background:'#c8b898',border:'2px solid #8a7a5a',borderRadius:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:2,boxShadow:'1px 1px 0 #00000040'}}>
              <div style={{display:'flex',gap:3}}>{[0,1].map(i=><div key={i} style={{width:3,height:5,background:'#5a4a2a',borderRadius:1}}/>)}</div>
            </div>
          </div>

          <div style={s.baseboard}/>
        </div>

        {/* ═══ FLOOR LINE ═══ */}
        <div style={s.floorEdge}/>

        {/* ═══ FLOOR ═══ */}
        <div style={s.floor}>
          {/* Floor tiles + striped rug (Kirokaze signature) */}
          <svg style={{position:'absolute',inset:0,width:'100%',height:'100%'}} viewBox="0 0 900 260" preserveAspectRatio="none">
            <defs>
              <pattern id="tile" x="0" y="0" width="90" height="65" patternUnits="userSpaceOnUse">
                <rect width="90" height="65" fill="#2a1e0e"/>
                <rect x="0" y="0" width="89" height="64" fill="#2e2210"/>
                <line x1="90" y1="0" x2="90" y2="65" stroke="#3a2c18" strokeWidth="1"/>
                <line x1="0" y1="65" x2="90" y2="65" stroke="#3a2c18" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="900" height="260" fill="url(#tile)"/>
            {/* Striped rug — signature Kirokaze teal/green */}
            <rect x="160" y="60" width="580" height="185" fill="#1a2818" rx="2" opacity="0.9"/>
            <rect x="170" y="68" width="560" height="169" fill="transparent" stroke="#2a4a28" strokeWidth="2"/>
            {/* Diagonal light stripes (window light effect) */}
            {[0,1,2,3,4,5,6,7].map(i=>(
              <rect key={i} x={160+i*73} y="60" width="36" height="185"
                fill={i%2===0?'#1e3820':'#162a18'} opacity="0.8"/>
            ))}
            {/* Bright light stripe from window */}
            <rect x="290" y="60" width="80" height="185" fill="#b8d878" opacity="0.06"/>
            <rect x="310" y="60" width="40" height="185" fill="#c8e888" opacity="0.04"/>
            {/* Rug border stripes */}
            <rect x="170" y="68" width="560" height="8" fill="#3a5a38" opacity="0.5"/>
            <rect x="170" y="221" width="560" height="8" fill="#3a5a38" opacity="0.5"/>
          </svg>

          {/* Window light cast on floor */}
          <div style={{position:'absolute',left:'22%',top:0,width:140,height:'100%',background:'linear-gradient(180deg,#b8d87818,transparent 80%)',pointerEvents:'none',zIndex:1,transform:'skewX(-8deg)'}}/>
          <div style={{position:'absolute',left:'27%',top:0,width:60,height:'100%',background:'linear-gradient(180deg,#c8e88810,transparent 70%)',pointerEvents:'none',zIndex:1,transform:'skewX(-8deg)'}}/>

          {/* DESK */}
          <div style={s.deskGroup}>
            <div style={s.deskSurface}>

              {/* MONITOR — retro beige CRT */}
              <Obj id="computer" h={hoveredObj} sh={setHoveredObj} onClick={()=>handleClick('about')}
                visited={isVisited('about')} tip="🖥️ About Me"
                style={{position:'relative',display:'flex',flexDirection:'column',alignItems:'center',gap:2}}>
                <div style={s.monitor}>
                  <div style={s.monitorBezel}>
                    <div style={s.monitorScreen}>
                      <div style={{position:'absolute',inset:0,background:`radial-gradient(ellipse at 50% 50%,#00cc4408,transparent 70%)`,pointerEvents:'none'}}/>
                      {/* Scanlines */}
                      <div style={{position:'absolute',inset:0,backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 3px,#00000018 3px,#00000018 4px)',pointerEvents:'none',zIndex:2}}/>
                      <div style={{display:'flex',alignItems:'center',gap:4,padding:'5px 7px 3px',borderBottom:'1px solid #001a04',background:'#040d02'}}>
                        {['#c03020','#c08020','#308030'].map((c,i)=>(
                          <span key={i} style={{display:'inline-block',width:7,height:7,borderRadius:'50%',background:c}}/>
                        ))}
                        <span style={{fontSize:8,color:'#4a7a40',marginLeft:4}}>~/portfolio</span>
                      </div>
                      <div style={{padding:'6px 8px',display:'flex',flexDirection:'column',gap:3}}>
                        <div style={{display:'flex',alignItems:'center',gap:3}}>
                          <span style={{fontSize:9,color:'#4a7a40'}}>❯ </span>
                          <span style={{fontSize:8,color:'#78cc60',fontFamily:"'Press Start 2P',monospace"}}>{profile.name}</span>
                          <span style={{fontSize:10,color:'#78cc60',animation:'cursorBlink 1s step-end infinite'}}>█</span>
                        </div>
                        <div style={{fontSize:9,color:'#4a7a40',paddingLeft:12}}>{profile.role}</div>
                        <div style={{fontSize:7,color:'#c8a840',paddingLeft:12,fontFamily:"'Press Start 2P',monospace",animation:'pulse 1.5s ease-in-out infinite'}}>[CLICK ME]</div>
                        <div style={{fontSize:8,color:'#2a4a20'}}> ──────────────</div>
                        <div style={{fontSize:9,color:'#70aa70',paddingLeft:12}}>📍 {profile.location}</div>
                      </div>
                    </div>
                  </div>
                  <div style={s.monitorNeck}/><div style={s.monitorBase}/>
                </div>
                {/* Keyboard */}
                <div style={s.keyboard}>
                  {[10,9,10,3].map((count,row)=>(
                    <div key={row} style={{display:'flex',gap:2,marginBottom:2,justifyContent:'center'}}>
                      {Array.from({length:count}).map((_,k)=>(
                        <div key={k} style={{height:12,width:row===3&&k===1?80:26,background:'#c0b098',border:'1px solid #8a7858',borderBottom:'2px solid #6a5838',borderRadius:1}}/>
                      ))}
                    </div>
                  ))}
                </div>
                <div style={s.mouse}/>
              </Obj>

              {/* LAPTOP */}
              <Obj id="laptop" h={hoveredObj} sh={setHoveredObj} onClick={()=>handleClick('projects')}
                visited={isVisited('projects')} tip="💻 View Projects"
                style={{position:'relative'}}>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                  <div style={s.laptopLid}>
                    <div style={{width:'100%',height:95,background:'#060e04',overflow:'hidden'}}>
                      <div style={{width:'100%',height:'100%',background:'linear-gradient(135deg,#081408,#0c1808)',padding:'8px 6px'}}>
                        {/* Scanlines on laptop too */}
                        <div style={{position:'absolute',inset:0,backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 2px,#00000020 2px,#00000020 3px)',pointerEvents:'none',zIndex:2}}/>
                        <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:6,color:'#7ab050',marginBottom:7,textAlign:'center',textShadow:'0 0 6px #60a030'}}>PROJECTS.exe</div>
                        <div style={{display:'flex',justifyContent:'center',gap:4,flexWrap:'wrap'}}>
                          {['🎯','📊','🌾','🎨','📈'].map((e,i)=>(<span key={i} style={{fontSize:15}}>{e}</span>))}
                        </div>
                        <div style={{height:3,background:'#7ab050',margin:'7px 8px 0',borderRadius:2,animation:'laptopPulse 2s ease-in-out infinite',boxShadow:'0 0 8px #60a030'}}/>
                      </div>
                    </div>
                  </div>
                  <div style={{width:155,height:4,background:'linear-gradient(180deg,#c8b898,#a89878)',border:'1px solid #8a7858'}}/>
                  <div style={{width:155,background:'#c0b090',border:'2px solid #9a8860',borderTop:'none',borderRadius:'0 0 4px 4px',padding:'4px 6px 6px'}}>
                    <div style={{height:5,background:'#a09070',marginBottom:3}}/>
                    <div style={{width:50,height:28,background:'#908060',border:'1px solid #7a6a40',margin:'0 auto',borderRadius:2}}/>
                  </div>
                </div>
              </Obj>

              {/* PHONE */}
              <Obj id="phone" h={hoveredObj} sh={setHoveredObj} onClick={()=>handleClick('contact')}
                visited={isVisited('contact')} tip="📱 Contact Me"
                style={{position:'relative'}}>
                <div style={s.phone}>
                  <div style={{width:16,height:4,background:'#1a1408',borderRadius:'0 0 3px 3px',margin:'0 auto',marginBottom:6}}/>
                  <div style={{textAlign:'center',padding:'0 4px'}}>
                    <div style={{fontSize:14,marginBottom:3}}>📧</div>
                    <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:6,color:'#a0b870',marginBottom:2}}>Contact</div>
                    <div style={{fontSize:7,color:'#6a7a50'}}>Tap to reach</div>
                  </div>
                  <div style={{width:16,height:4,background:'#3a3020',border:'1px solid #5a4a30',margin:'6px auto 0'}}/>
                </div>
              </Obj>

              {/* DESK DECO */}
              <div style={{display:'flex',flexDirection:'column',gap:5,alignItems:'center',paddingBottom:4}}>
                {/* Coffee */}
                <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                  <div style={{display:'flex',gap:4,height:14,position:'relative'}}>
                    <div style={{width:4,height:4,background:'#ffffff18',borderRadius:'50%',animation:'steamRise 2s ease-out infinite',position:'absolute',left:8}}/>
                    <div style={{width:4,height:4,background:'#ffffff18',borderRadius:'50%',animation:'steamRise 2s ease-out infinite',animationDelay:'0.5s',position:'absolute',left:14}}/>
                  </div>
                  <div style={{position:'relative',width:30}}>
                    <div style={{position:'absolute',right:-5,top:4,width:6,height:10,border:'2px solid #7a5030',borderLeft:'none',borderRadius:'0 4px 4px 0'}}/>
                    <div style={{width:28,height:28,background:'linear-gradient(180deg,#c8b090,#a89060)',border:'2px solid #7a5030',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13}}>☕</div>
                  </div>
                </div>
                {/* Pens */}
                <div style={{display:'flex',gap:2,alignItems:'flex-end',height:28}}>
                  {['#c86040','#6a8a40','#c8a030'].map((c,i)=>(
                    <div key={i} style={{width:4,height:24+i*2,background:`linear-gradient(180deg,${c},${c}80)`,border:`1px solid ${c}60`,borderRadius:'2px 2px 0 0'}}/>
                  ))}
                </div>
                {/* Mini plant */}
                <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                  <div style={{fontSize:20,lineHeight:1}}>🌱</div>
                  <div style={{width:20,height:12,background:'linear-gradient(180deg,#8b5020,#6a3a10)',border:'1px solid #aa7030',borderRadius:'0 0 2px 2px'}}/>
                </div>
              </div>
            </div>
            {/* Desk front */}
            <div style={s.deskFront}>
              <div style={{display:'flex',gap:0,paddingLeft:16}}>
                {[0,1].map(i=>(<div key={i} style={{width:110,height:22,border:'1px solid #8a6a3a',borderTop:'none',display:'flex',alignItems:'center',justifyContent:'center',background:'#4a3018'}}>
                  <div style={{width:8,height:4,background:'#aa8050',borderRadius:1,border:'1px solid #c8a060'}}/>
                </div>))}
              </div>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',paddingLeft:18,paddingRight:18}}>
              {[0,1].map(i=>(<div key={i} style={{width:14,height:42,background:'linear-gradient(180deg,#4a3018,#2a1a08)',border:'1px solid #6a4a20',borderTop:'none'}}/>))}
            </div>
          </div>

          {/* CHAIR */}
          <div style={s.chairGroup}>
            <div style={s.chairBack}>
              <div style={{position:'absolute',inset:6,border:'1px solid #5a4a2a40',borderRadius:2}}/>
              <div style={{position:'absolute',top:-12,left:4,right:4,height:14,background:'#3a2810',border:'2px solid #6a4a2060',borderRadius:3}}/>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',width:92,margin:'-4px auto 0'}}>
              {[0,1].map(i=>(<div key={i} style={{width:10,height:22,background:'#3a2810',border:'1px solid #6a4a2040',borderRadius:2}}/>))}
            </div>
            <div style={s.chairSeat}/>
            <div style={{width:8,height:28,background:'linear-gradient(180deg,#5a4a30,#3a3020)',border:'1px solid #7a6a40',margin:'0 auto'}}/>
            <div style={{width:60,height:14,position:'relative',margin:'0 auto'}}>
              {[0,72,144,216,288].map(deg=>(
                <div key={deg} style={{position:'absolute',width:26,height:5,background:'#3a3020',border:'1px solid #5a4a30',borderRadius:2,left:'50%',top:'50%',marginTop:-2.5,transform:`rotate(${deg}deg) translateX(14px)`,transformOrigin:'left center'}}/>
              ))}
              <div style={{position:'absolute',width:12,height:12,borderRadius:'50%',background:'#4a3a28',border:'2px solid #6a5a38',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}/>
            </div>
            <div style={{position:'relative',height:10,width:130,margin:'0 auto'}}>
              {[-24,0,24].map((x,i)=>(<div key={i} style={{position:'absolute',width:12,height:8,background:'#2a2018',border:'1px solid #4a3a28',borderRadius:2,bottom:0,left:52+x}}/>))}
            </div>
          </div>

          {/* PIXEL CHARACTER */}
          <PixelChar eyeOpen={eyeOpen} style={s.charPos} name={profile.name}/>

          {/* FLOOR LAMP */}
          <div style={{position:'absolute',left:22,bottom:8,zIndex:4}}>
            <div style={{width:40,height:24,background:'linear-gradient(180deg,#c8b898,#a89878)',border:'2px solid #8a7858',clipPath:'polygon(10% 0,90% 0,100% 100%,0 100%)',position:'relative'}}/>
            <div style={{width:4,height:64,background:'linear-gradient(180deg,#7a6a50,#5a4a30)',border:'1px solid #9a8a60',margin:'0 auto'}}/>
            <div style={{width:32,height:8,background:'#c0b090',border:'2px solid #9a8860',borderRadius:2,margin:'0 auto'}}/>
            {/* Warm glow pool */}
            <div style={{position:'absolute',top:24,left:-24,width:88,height:64,background:'radial-gradient(ellipse at 50% 0%,#d8a84040,transparent 70%)',pointerEvents:'none',animation:'lampGlowPulse 3s ease-in-out infinite'}}/>
          </div>

          {/* FLOOR PLANT */}
          <Obj id="plant" h={hoveredObj} sh={setHoveredObj} onClick={()=>{}} tip="🌿 A happy plant!"
            style={{position:'absolute',right:34,bottom:8,zIndex:4}}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
              <div style={{position:'relative',width:64,height:68}}>
                <div style={{position:'absolute',left:0,top:22,width:28,height:20,background:'#3a7a30',borderRadius:'50% 0 50% 0',transform:'rotate(-22deg)',boxShadow:'inset 0 2px 4px rgba(0,0,0,0.3)'}}/>
                <div style={{position:'absolute',right:0,top:12,width:28,height:20,background:'#4a8a38',borderRadius:'0 50% 0 50%',transform:'rotate(22deg)'}}/>
                <div style={{position:'absolute',left:'50%',top:0,width:22,height:34,background:'#3a9040',borderRadius:'50% 50% 0 0',transform:'translateX(-50%)',animation:'plantSway 3s ease-in-out infinite',transformOrigin:'bottom center'}}/>
              </div>
              <div style={{width:50,height:8,background:'#c08050',border:'2px solid #d09060',borderRadius:'2px 2px 0 0'}}/>
              <div style={{width:44,height:40,background:'linear-gradient(180deg,#9a6040,#6a3820)',border:'2px solid #b07050',borderRadius:'0 0 6px 6px'}}/>
            </div>
          </Obj>

          {/* Second monitor / device on side table */}
          <div style={{position:'absolute',right:90,bottom:32,zIndex:4}}>
            <div style={{width:80,height:60,background:'#c0b090',border:'3px solid #8a7858',borderRadius:'3px 3px 0 0',padding:4,boxShadow:'3px 3px 0 #00000050'}}>
              <div style={{width:'100%',height:'100%',background:'#0a1408',border:'1px solid #3a4a28',display:'flex',alignItems:'center',justifyContent:'center',position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',inset:0,backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 2px,#00000020 2px,#00000020 3px)'}}/>
                <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:5,color:'#78cc60',textAlign:'center',lineHeight:1.6,zIndex:1}}>
                  SYS<br/>OK<br/><span style={{color:'#c8a840',fontSize:4}}>●</span>
                </div>
              </div>
            </div>
            <div style={{width:14,height:3,background:'#a09070',margin:'0 auto'}}/>
            <div style={{width:54,height:6,background:'#c0b090',border:'1px solid #8a7858',margin:'0 auto',borderRadius:'0 0 2px 2px'}}/>
            {/* Side table */}
            <div style={{width:100,height:14,background:'linear-gradient(180deg,#6a4a28,#4a3018)',border:'2px solid #8a6a38',borderRadius:2,marginTop:2}}/>
            <div style={{display:'flex',justifyContent:'space-between',paddingLeft:8,paddingRight:8}}>
              {[0,1].map(i=>(<div key={i} style={{width:10,height:28,background:'#3a2010',border:'1px solid #5a3820'}}/>))}
            </div>
          </div>
        </div>
      </div>

      {/* HINT BAR */}
      <div style={s.hintBar}>
        {['🖱️ Click objects to interact','⌨️ ESC to close any panel','🏆 Unlock achievements by exploring'].map((t,i)=>(
          <React.Fragment key={i}>
            {i>0&&<span style={{color:'#4a3a20',fontSize:12}}>│</span>}
            <span style={{fontSize:10,color:'#7a6a4a'}}>{t}</span>
          </React.Fragment>
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Share+Tech+Mono&display=swap');
        @keyframes starTwinkle{0%,100%{opacity:.2;transform:scale(1)}50%{opacity:1;transform:scale(1.5)}}
        @keyframes cloudDrift{from{left:-70px}to{left:110%}}
        @keyframes barBounce{0%,100%{transform:scaleY(.3)}50%{transform:scaleY(1.5)}}
        @keyframes steamRise{0%{transform:translateY(0) scaleX(1);opacity:.5}100%{transform:translateY(-20px) scaleX(1.6);opacity:0}}
        @keyframes pulse{0%,100%{opacity:.4}50%{opacity:1}}
        @keyframes bookBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
        @keyframes laptopPulse{0%,100%{opacity:.3;width:55%}50%{opacity:.9;width:82%}}
        @keyframes plantSway{0%,100%{transform:translateX(-50%) rotate(-5deg)}50%{transform:translateX(-50%) rotate(5deg)}}
        @keyframes lampGlowPulse{0%,100%{opacity:.4}50%{opacity:.8}}
        @keyframes cursorBlink{0%,49%{opacity:1}50%,100%{opacity:0}}
        @keyframes charBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}
        @keyframes hintFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
      `}</style>
    </div>
  );
}

// ── Pixel Character — same structure, Kirokaze-toned ──
function PixelChar({ eyeOpen, style, name }) {
  return (
    <div style={{...style,display:'flex',flexDirection:'column',alignItems:'center',animation:'charBob 3s ease-in-out infinite'}}>
      {/* Floating hint bubble */}
      <div style={{background:'#2a1e08ee',border:'1px solid #c8a840',color:'#c8a840',fontFamily:"'Press Start 2P',monospace",fontSize:6,padding:'4px 7px',marginBottom:5,whiteSpace:'nowrap',boxShadow:'0 0 8px #c8a84040',position:'relative',animation:'hintFloat 2s ease-in-out infinite'}}>
        👆 CLICK OBJECTS!
        <div style={{position:'absolute',bottom:-6,left:'50%',transform:'translateX(-50%)',width:0,height:0,borderLeft:'5px solid transparent',borderRight:'5px solid transparent',borderTop:'5px solid #c8a840'}}/>
      </div>
      {/* Head */}
      <div style={{width:32,height:30,position:'relative',marginBottom:-2}}>
        {/* Hair */}
        <div style={{position:'absolute',top:-5,left:-2,right:-2,height:14,background:'#1a0e06',borderRadius:'4px 4px 0 0',borderBottom:'3px solid #2a1a0a'}}/>
        {/* Face */}
        <div style={{position:'absolute',bottom:0,left:0,right:0,height:23,background:'#c8956c',borderRadius:'3px 3px 4px 4px',border:'1px solid #b07850'}}>
          {/* Glasses */}
          <div style={{position:'absolute',top:4,left:2,right:2,display:'flex',alignItems:'center',gap:1}}>
            <div style={{flex:1,height:8,border:'2px solid #3a2a1a',borderRadius:2,background:'rgba(180,220,120,0.15)'}}/>
            <div style={{width:3,height:2,background:'#3a2a1a',flexShrink:0}}/>
            <div style={{flex:1,height:8,border:'2px solid #3a2a1a',borderRadius:2,background:'rgba(180,220,120,0.15)'}}/>
          </div>
          {/* Eyes */}
          <div style={{display:'flex',justifyContent:'space-around',paddingTop:5,paddingLeft:3,paddingRight:3}}>
            <div style={{width:5,height:5,borderRadius:1,background:eyeOpen?'#2a1a0a':'#c8956c',transition:'background 0.05s'}}/>
            <div style={{width:5,height:5,borderRadius:1,background:eyeOpen?'#2a1a0a':'#c8956c',transition:'background 0.05s'}}/>
          </div>
          {/* Mouth */}
          <div style={{width:10,height:3,background:'#8b3a2a',margin:'4px auto 0',borderRadius:'0 0 2px 2px'}}/>
        </div>
      </div>
      {/* Body - beige shirt */}
      <div style={{width:38,height:30,background:'linear-gradient(180deg,#c0a870,#a89050)',borderRadius:'2px 2px 4px 4px',border:'1px solid #d0b880',display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}>
        <span style={{fontFamily:"'Press Start 2P',monospace",fontSize:7,color:'#5a4020cc'}}>AI</span>
      </div>
      {/* Arms */}
      <div style={{display:'flex',justifyContent:'space-between',width:58,marginTop:-22,zIndex:-1}}>
        <div style={{width:11,height:26,background:'#c8956c',border:'1px solid #b07850',borderRadius:'3px 3px 4px 4px',transform:'rotate(25deg)',transformOrigin:'top center'}}/>
        <div style={{width:11,height:26,background:'#c8956c',border:'1px solid #b07850',borderRadius:'3px 3px 4px 4px',transform:'rotate(-25deg)',transformOrigin:'top center'}}/>
      </div>
      {/* Hands */}
      <div style={{display:'flex',gap:56,marginTop:-6}}>
        {[0,1].map(i=>(<div key={i} style={{width:10,height:8,background:'#c8956c',border:'1px solid #b07850',borderRadius:2}}/>))}
      </div>
    </div>
  );
}

// ── Live Wall Clock — retro wood frame ──
function LiveClock({ style }) {
  const [t, setT] = useState(new Date());
  useEffect(() => { const id = setInterval(()=>setT(new Date()),1000); return ()=>clearInterval(id); }, []);
  const s2 = t.getSeconds(), m = t.getMinutes(), h = t.getHours()%12;
  return (
    <div style={style}>
      <div style={{textAlign:'center'}}>
        <div style={{width:64,height:64,borderRadius:'50%',background:'linear-gradient(135deg,#c8b898,#a89878)',border:'4px solid #7a5a30',position:'relative',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 0 0 2px #5a3a18,3px 3px 0 #00000060',margin:'0 auto'}}>
          {Array.from({length:12}).map((_,i)=>(
            <div key={i} style={{position:'absolute',width:i%3===0?3:2,height:i%3===0?6:3,background:i%3===0?'#5a3a18':'#8a6a40',left:'calc(50% - 1px)',top:'50%',transformOrigin:'bottom center',transform:`rotate(${i*30}deg) translateY(-26px)`}}/>
          ))}
          {/* Clock face */}
          <div style={{position:'absolute',inset:6,borderRadius:'50%',background:'#e8ddc8',border:'1px solid #c8a870'}}/>
          {/* hour */}
          <div style={{position:'absolute',width:3,height:14,background:'#3a2810',borderRadius:2,bottom:'50%',left:'calc(50% - 1px)',transformOrigin:'bottom center',transform:`rotate(${h*30+m*0.5}deg)`,zIndex:2}}/>
          {/* minute */}
          <div style={{position:'absolute',width:2,height:20,background:'#2a1808',borderRadius:2,bottom:'50%',left:'calc(50% - 1px)',transformOrigin:'bottom center',transform:`rotate(${m*6}deg)`,zIndex:2}}/>
          {/* second */}
          <div style={{position:'absolute',width:1,height:22,background:'#c84020',borderRadius:2,bottom:'50%',left:'calc(50% - 0.5px)',transformOrigin:'bottom center',transform:`rotate(${s2*6}deg)`,zIndex:2}}/>
          <div style={{position:'absolute',width:6,height:6,borderRadius:'50%',background:'#c84020',top:'calc(50% - 3px)',left:'calc(50% - 3px)',zIndex:3}}/>
        </div>
        <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:7,color:'#8a6a40',marginTop:4}}>{String(t.getHours()).padStart(2,'0')}:{String(m).padStart(2,'0')}</div>
      </div>
    </div>
  );
}

// ── Cloud ──
function Cloud({ style }) {
  return (
    <div style={{position:'absolute',left:-70,top:'28%',...style,animation:`cloudDrift linear infinite`,animationDuration:style.animationDuration||'22s',animationDelay:style.animationDelay||'0s'}}>
      <div style={{position:'relative',width:60,height:24}}>
        <div style={{position:'absolute',width:32,height:18,background:'#2a2830',borderRadius:'50%',left:0,top:5}}/>
        <div style={{position:'absolute',width:24,height:22,background:'#2e2c38',borderRadius:'50%',left:14,top:0}}/>
        <div style={{position:'absolute',width:20,height:16,background:'#2a2830',borderRadius:'50%',left:34,top:6}}/>
      </div>
    </div>
  );
}

// ── HoverObject wrapper ──
function Obj({ id, h, sh, onClick, visited, tip, style, children }) {
  const isH = h === id;
  return (
    <div
      style={{cursor:'pointer',filter:isH?'brightness(1.2) saturate(1.1)':'brightness(1)',transform:isH?`${style.transform||''} translateY(-5px)`:(style.transform||'translateY(0)'),transition:'filter .15s,transform .15s',...style}}
      onMouseEnter={()=>sh(id)} onMouseLeave={()=>sh(null)} onClick={onClick}
    >
      {children}
      {visited && <div style={{position:'absolute',top:-9,right:-9,width:17,height:17,background:'#78cc60',color:'#0a1808',fontFamily:"'Press Start 2P',monospace",fontSize:8,display:'flex',alignItems:'center',justifyContent:'center',zIndex:5}}>✓</div>}
      {isH && tip && (
        <div style={{position:'absolute',bottom:'calc(100% + 10px)',left:'50%',transform:'translateX(-50%)',background:'#2a1e08',border:'1px solid #c8a840',color:'#c8a840',fontFamily:"'Press Start 2P',monospace",fontSize:7,padding:'5px 8px',whiteSpace:'nowrap',boxShadow:'0 0 10px #c8a84040',zIndex:20,pointerEvents:'none'}}>
          {tip}
          <div style={{position:'absolute',top:'100%',left:'50%',transform:'translateX(-50%)',width:0,height:0,borderLeft:'5px solid transparent',borderRight:'5px solid transparent',borderTop:'5px solid #c8a840'}}/>
        </div>
      )}
    </div>
  );
}

// ── STYLES — Kirokaze palette ──
const C = {
  bg:'#1a1208',
  wall:'#4a3420',
  wallDark:'#3a2818',
  floor:'#2a1e0e',
  desk:'#5a3a18',
  deskTop:'#7a5028',
  border:'#6a4a28',
  green:'#78cc60',
  crtGreen:'#78cc60',
  yellow:'#c8a840',
  brown:'#8a6a40',
  tan:'#c8b898',
  beige:'#e8ddc8',
  red:'#c83a2a',
  dim:'#7a6a4a',
  text:'#e8ddc8',
  chair:'#4a3420',
  skin:'#c8956c',
};

const s = {
  root:{width:'100vw',height:'100vh',display:'flex',flexDirection:'column',background:C.bg,overflow:'hidden',fontFamily:"'Share Tech Mono',monospace"},

  topBar:{height:36,background:'#120e06',borderBottom:`1px solid ${C.border}`,display:'flex',alignItems:'center',padding:'0 16px',gap:16,flexShrink:0,zIndex:10},
  topBarTitle:{flex:1,textAlign:'center',fontFamily:"'Press Start 2P',monospace",fontSize:9,color:C.yellow,letterSpacing:'0.1em'},
  topBarHint:{fontSize:11,color:C.dim},

  scene:{flex:1,position:'relative',display:'flex',flexDirection:'column',overflow:'hidden'},

  // Wall — warm brown, wallpaper-like tiling
  backWall:{
    height:'52%',
    background:C.wall,
    position:'relative',
    flexShrink:0,
    backgroundImage:`
      repeating-linear-gradient(90deg,transparent 0,transparent 79px,#5a3c2240 79px,#5a3c2240 80px),
      repeating-linear-gradient(0deg,transparent 0,transparent 59px,#5a3c2230 59px,#5a3c2230 60px)
    `,
  },
  wallTop:{position:'absolute',top:0,left:0,right:0,height:20,background:'linear-gradient(180deg,#6a4a28,#4a3420)',borderBottom:`2px solid #7a5a30`},
  baseboard:{position:'absolute',bottom:0,left:0,right:0,height:12,background:'linear-gradient(180deg,#7a5a30,#5a3a18)',borderTop:`2px solid #9a7a48`},

  floorEdge:{height:6,background:'linear-gradient(180deg,#5a3a18,#3a2810)',borderTop:`2px solid #7a5a30`,borderBottom:`2px solid #1a1008`,zIndex:2,flexShrink:0},
  floor:{flex:1,position:'relative',overflow:'hidden'},

  // Window — venetian blinds style
  winOuter:{border:'5px solid #7a5a30',background:'#5a3a18',borderRadius:2,overflow:'hidden',position:'relative',boxShadow:'0 4px 20px #00000080,inset 0 0 0 2px #9a7a48',width:210},
  blindsOuter:{width:'100%'},
  winGlass:{width:'100%',height:80,overflow:'hidden',position:'relative'},
  sky:{width:'100%',height:'100%',position:'relative',background:'linear-gradient(180deg,#08060f 0%,#100820 50%,#180c28 100%)',overflow:'hidden'},
  moon:{position:'absolute',right:18,top:14,width:26,height:26,background:'#e8d8a0',borderRadius:'50%',boxShadow:'0 0 12px #e0c88060',clipPath:'circle(50% at 55% 50%)'},
  winBarH:{position:'absolute',left:0,right:0,top:'calc(50% + 8px)',height:4,background:'#7a5a30',pointerEvents:'none'},
  winBarV:{position:'absolute',top:0,bottom:0,left:'calc(50% - 2px)',width:4,background:'#7a5a30',pointerEvents:'none'},
  winSill:{height:12,background:'#9a7a48',borderTop:'3px solid #b89060'},

  // Poster — framed corkboard style
  posterFrame:{width:118,border:'5px solid #7a5a30',background:'#c8a868',padding:4,boxShadow:'4px 4px 0 #00000070',},
  posterInner:{background:'linear-gradient(135deg,#c0a058,#b89048)',border:'1px solid #8a6a30',padding:'8px 6px',textAlign:'center'},
  posterTitle:{fontFamily:"'Press Start 2P',monospace",fontSize:7,color:'#5a2818',textShadow:'1px 1px 0 #c8a040',marginBottom:6,letterSpacing:1},

  // Bookshelf — dark wood
  shelf:{width:210,background:'#3a2810',border:'3px solid #7a5a30',padding:'6px 8px 0',boxShadow:'4px 4px 0 #00000060'},
  shelfPlank:{height:8,background:'linear-gradient(180deg,#9a7a48,#7a5a28)',borderTop:'2px solid #b89860',borderBottom:'2px solid #4a3018',margin:'0 -8px'},

  // Music player — retro beige hardware
  musicBox:{width:104,background:'#c0b090',border:`3px solid #8a7050`,padding:8,boxShadow:`3px 3px 0 #00000060,inset 0 1px 0 #e8d8b0`},
  musicLabel:{fontFamily:"'Press Start 2P',monospace",fontSize:6,color:'#5a4020',textAlign:'center',marginBottom:4,letterSpacing:1},
  musicScreen:{background:'#0a1008',border:'2px solid #5a4a30',height:38,display:'flex',alignItems:'flex-end',justifyContent:'center',padding:'4px 4px 2px',gap:2,marginBottom:4},

  // Desk — dark rich wood
  deskGroup:{position:'absolute',left:'50%',bottom:28,transform:'translateX(-50%)',zIndex:5},
  deskSurface:{display:'flex',alignItems:'flex-end',gap:12,background:`linear-gradient(180deg,${C.deskTop},${C.desk})`,border:'2px solid #9a7a40',borderBottom:'none',padding:'14px 22px 10px',minWidth:700,boxShadow:'0 -2px 0 #b89050,0 2px 20px #00000080',position:'relative',zIndex:2},
  deskFront:{background:`linear-gradient(180deg,${C.desk},#3a2010)`,border:'2px solid #8a6a30',borderTop:'none',height:30,minWidth:700,display:'flex',alignItems:'center'},

  // Monitor — chunky retro beige CRT
  monitor:{display:'flex',flexDirection:'column',alignItems:'center'},
  monitorBezel:{width:196,background:'#c8b898',border:'5px solid #a09070',borderRadius:'6px 6px 2px 2px',boxShadow:`0 0 0 2px #8a7858,3px 3px 0 #00000060,inset 0 2px 0 #e8d8b8`,overflow:'visible'},
  monitorScreen:{width:'100%',height:134,background:'linear-gradient(135deg,#020d01,#040d02)',position:'relative',overflow:'hidden',border:'3px solid #7a6848'},
  monitorNeck:{width:18,height:14,background:'linear-gradient(180deg,#b0a080,#907860)',border:'1px solid #8a7050'},
  monitorBase:{width:80,height:10,background:'linear-gradient(180deg,#c0b090,#a09070)',border:'2px solid #8a7050',borderRadius:'0 0 3px 3px'},

  // Keyboard — retro beige
  keyboard:{width:185,background:'#c0b090',border:'2px solid #9a8060',padding:'5px 6px',borderRadius:2,boxShadow:'0 3px 0 #6a5030,0 4px 8px #00000060'},
  mouse:{width:22,height:34,background:'linear-gradient(180deg,#c8b898,#a89878)',border:'2px solid #8a7858',borderRadius:'11px 11px 8px 8px',display:'flex',justifyContent:'center',paddingTop:5,boxShadow:'0 2px 0 #6a5838',marginLeft:6,alignSelf:'flex-end',marginBottom:2},

  // Laptop — beige with green screen
  laptopLid:{width:152,background:'#c0b090',border:'3px solid #9a8060',borderBottom:'none',borderRadius:'4px 4px 0 0',overflow:'hidden',boxShadow:'0 0 12px #00000040'},

  // Phone — dark retro
  phone:{width:48,background:'#2a2018',border:'2px solid #5a4a30',borderRadius:8,overflow:'hidden',boxShadow:'0 0 10px #00000060,3px 3px 0 #00000060',padding:'6px 0'},

  // Chair — brown leather
  chairGroup:{position:'absolute',left:'50%',bottom:0,transform:'translateX(calc(-50% - 170px))',zIndex:4},
  chairBack:{width:72,height:92,position:'relative',background:`linear-gradient(180deg,#5a3a18,#3a2410)`,border:'2px solid #8a5a28',borderRadius:'4px 4px 0 0',margin:'0 auto',boxShadow:'2px 2px 0 #00000060'},
  chairSeat:{width:88,height:20,margin:'0 auto',background:'linear-gradient(180deg,#6a4a20,#4a3018)',border:'2px solid #8a6030',borderRadius:'2px 2px 4px 4px'},

  charPos:{position:'absolute',left:'50%',bottom:24,transform:'translateX(calc(-50% - 90px))',zIndex:6},

  hintBar:{height:30,background:'#100c06',borderTop:`1px solid ${C.border}`,display:'flex',alignItems:'center',justifyContent:'center',gap:20,flexShrink:0},
};
