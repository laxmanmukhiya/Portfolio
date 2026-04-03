// ============================================================
// GameRoom — Kirokaze pixel-art aesthetic
// FIXED: all wall objects properly spaced, no overlaps
// Wall layout left→right:
//   [POSTER] gap [WINDOW] gap [CHALKBOARD] [CALENDAR] [CLOCK] [TROPHIES] [MUSIC] [BOOKSHELF]
// ============================================================
import React, { useState, useEffect } from "react";
import { profile } from "../data/profile";

export default function GameRoom({ onObjectClick, visitedPanels }) {
  const [hoveredObj, setHoveredObj] = useState(null);
  const [blinkFrame, setBlinkFrame] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setBlinkFrame(f => (f + 1) % 60), 100);
    return () => clearInterval(t);
  }, []);

  const eyeOpen = blinkFrame < 55;
  const handleClick = (panelId) => { if (panelId) onObjectClick(panelId); };
  const isVisited = (id) => visitedPanels.has(id);

  return (
    <div style={s.root}>

      {/* ── TOP BAR ── */}
      <div style={s.topBar}>
        <div style={{display:'flex',gap:6}}>
          {['#c0392b','#e67e22','#27ae60'].map((c,i)=>(
            <span key={i} style={{display:'inline-block',width:12,height:12,borderRadius:'50%',background:c,border:`1px solid ${['#922b21','#b8600e','#1e8449'][i]}`}}/>
          ))}
        </div>
        <span style={s.topBarTitle}>// {profile.name}'s Room — Portfolio OS v1.0</span>
        <span style={s.topBarHint}>Click objects to explore ✦</span>
      </div>

      <div style={s.scene}>

        {/* ══════════════════════════════════════════
            BACK WALL
            Positions are absolute px from left edge.
            Wall is 100vw wide (~1280px on standard screen).
            Each object has clear px gap from its neighbour.

            POSTER:       left=18   width≈128  → ends ~146
            gap ~14px
            WINDOW:       left=160  width=200  → ends ~360
            gap ~40px
            CHALKBOARD:   left=400  width=148  → ends ~548
            gap ~24px
            CALENDAR:     left=572  width=64   → ends ~636
            gap ~16px
            CLOCK:        left=652  width=70   → ends ~722
            gap ~30px
            TROPHY SHELF: left=752  width=116  → ends ~868
            gap ~14px
            MUSIC:        left=882  width=108  → ends ~990
            gap ~20px
            BOOKSHELF:    right=10  width=220  → fits right edge
        ══════════════════════════════════════════ */}
        <div style={s.backWall}>
          <div style={s.wallTop}/>

          {/* Subtle paint texture patches (decorative only) */}
          <div style={{position:'absolute',left:'55%',top:28,width:65,height:38,background:'#5a3a28',opacity:0.1,clipPath:'polygon(5% 0,95% 8%,100% 92%,8% 100%)',zIndex:1,pointerEvents:'none'}}/>
          <div style={{position:'absolute',left:'74%',top:48,width:44,height:28,background:'#4a2e1c',opacity:0.08,clipPath:'polygon(0 10%,92% 0,100% 85%,10% 100%)',zIndex:1,pointerEvents:'none'}}/>

          {/* ── 1. SKILLS POSTER ── */}
          <Obj id="poster" h={hoveredObj} sh={setHoveredObj}
            onClick={()=>handleClick('skills')}
            visited={isVisited('skills')} tip="📋 View Skills"
            style={{position:'absolute',left:18,top:22,zIndex:3}}>
            <div style={s.posterFrame}>
              <div style={s.posterInner}>
                <div style={s.posterTitle}>TECH STACK</div>
                <div style={{display:'flex',flexWrap:'wrap',gap:3,justifyContent:'center',margin:'5px 0'}}>
                  {[['🐍','#5a8a3a'],['🧠','#b85a3a'],['⚙️','#9a8530'],['📊','#5a6a9a'],['☁️','#3a8a7a'],['🔥','#b87030']].map(([e,c],i)=>(
                    <div key={i} style={{width:30,height:30,border:`1px solid ${c}`,display:'flex',alignItems:'center',justifyContent:'center',background:'#2a1e10',fontSize:14}}>{e}</div>
                  ))}
                </div>
                <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:5,color:'#6a5a40',marginTop:3}}>AI & DATA SCIENCE</div>
              </div>
            </div>
            <div style={{position:'absolute',top:-12,left:-8,width:36,height:30,background:'#d4b84a',transform:'rotate(-8deg)',padding:'3px 4px',fontSize:6,fontFamily:"'Press Start 2P',monospace",color:'#5a4820',lineHeight:1.4,boxShadow:'2px 2px 0 #00000040',zIndex:4}}>
              TODO<br/>skills
            </div>
            <div style={{position:'absolute',top:-6,right:-12,width:32,height:26,background:'#b8d878',transform:'rotate(6deg)',padding:'3px 4px',fontSize:6,fontFamily:"'Press Start 2P',monospace",color:'#2a4820',lineHeight:1.4,boxShadow:'2px 2px 0 #00000040',zIndex:4}}>
              v2.0<br/>ready
            </div>
          </Obj>

          {/* Wall socket between poster & window */}
          <div style={{position:'absolute',left:142,top:88,zIndex:3}}>
            <div style={{width:18,height:14,background:'#c8b898',border:'2px solid #8a7a5a',borderRadius:1,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'1px 1px 0 #00000040'}}>
              <div style={{display:'flex',gap:3}}>{[0,1].map(i=><div key={i} style={{width:3,height:5,background:'#5a4a2a',borderRadius:1}}/>)}</div>
            </div>
          </div>

          {/* ── 2. WINDOW ── */}
          <Obj id="window" h={hoveredObj} sh={setHoveredObj} onClick={()=>{}}
            style={{position:'absolute',left:160,top:16,zIndex:3}}>
            <div style={s.winOuter}>
              <div style={s.blindsOuter}>
                {Array.from({length:8}).map((_,i)=>(
                  <div key={i} style={{height:5,background:i%2===0?'#c8b89a':'#b0a080',borderBottom:'1px solid #887050'}}/>
                ))}
              </div>
              <div style={s.winGlass}>
                <div style={s.sky}>
                  {[[6,8],[18,22],[32,6],[48,16],[62,5],[74,20],[86,10],[14,38],[58,32]].map(([x,y],i)=>(
                    <div key={i} style={{position:'absolute',left:`${x}%`,top:`${y}%`,width:i%3?2:3,height:i%3?2:3,background:'#fff',borderRadius:'50%',animation:`starTwinkle ${2+i*0.3}s ease-in-out infinite`,animationDelay:`${i*0.35}s`}}/>
                  ))}
                  <div style={s.moon}/>
                  <Cloud style={{top:'22%',animationDuration:'20s'}}/>
                  <Cloud style={{top:'50%',animationDuration:'30s',animationDelay:'-14s',opacity:0.6}}/>
                  <svg style={{position:'absolute',bottom:0,left:0,width:'100%',height:52}} viewBox="0 0 200 52" preserveAspectRatio="none">
                    {[[0,24,22],[24,18,14],[40,28,20],[62,12,24],[88,24,18],[108,20,22],[132,14,28],[162,28,16],[180,22,20]].map(([x,y,w],i)=>(
                      <rect key={i} x={x} y={y} width={w} height={52-y} fill={`hsl(30,${14+i*2}%,${9+i}%)`}/>
                    ))}
                    {[[8,20],[26,14],[44,24],[66,8],[90,18],[112,12],[135,10],[165,26],[184,18]].map(([x,y],i)=>(
                      <rect key={i} x={x} y={y} width={3} height={3} fill={i%3===0?'#e8c870':i%3===1?'#b8d878':'#d4a870'} opacity="0.75"/>
                    ))}
                  </svg>
                </div>
              </div>
              <div style={s.winBarH}/><div style={s.winBarV}/>
            </div>
            <div style={s.winSill}/>
          </Obj>

          {/* ── 3. CHALKBOARD ── */}
          <div style={{position:'absolute',left:400,top:14,zIndex:3,width:148,height:106}}>
            <div style={{width:'100%',height:'100%',background:'#2a4a2a',border:'5px solid #6a4a20',borderBottom:'9px solid #7a5828',boxShadow:'inset 0 0 18px #00000060,3px 3px 0 #00000060',padding:8,position:'relative'}}>
              <svg width="100%" height="100%" viewBox="0 0 136 92" style={{opacity:0.85}}>
                <line x1="10" y1="20" x2="40" y2="20" stroke="#c8e8c8" strokeWidth="1.5" strokeLinecap="round"/>
                <rect x="40" y="14" width="16" height="12" fill="none" stroke="#c8e8c8" strokeWidth="1.5" rx="1"/>
                <line x1="56" y1="20" x2="82" y2="20" stroke="#c8e8c8" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="82" cy="20" r="6" fill="none" stroke="#c8e8c8" strokeWidth="1.5"/>
                <line x1="88" y1="20" x2="120" y2="20" stroke="#c8e8c8" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="82" y1="26" x2="82" y2="52" stroke="#c8e8c8" strokeWidth="1.2" strokeDasharray="3 2"/>
                <text x="8" y="64" fill="#c8e8c8" fontSize="8" fontFamily="monospace">&gt; run()</text>
                <text x="8" y="76" fill="#a8c8a8" fontSize="7" fontFamily="monospace">OK: 42ms</text>
                <rect x="90" y="44" width="30" height="20" fill="#2a4a2a" opacity="0.55"/>
              </svg>
              <div style={{position:'absolute',bottom:-13,left:0,right:0,height:8,background:'#6a4a2a',display:'flex',alignItems:'center',gap:4,paddingLeft:6}}>
                {[0,1,2].map(i=>(<div key={i} style={{width:12,height:4,background:'#e8e0d0',opacity:0.9,borderRadius:1}}/>))}
              </div>
            </div>
          </div>

          {/* ── 4. CALENDAR ── */}
          <div style={{position:'absolute',left:572,top:18,zIndex:3}}>
            <div style={{position:'absolute',top:-5,left:'50%',transform:'translateX(-50%)',width:6,height:6,borderRadius:'50%',background:'#c83a2a',border:'1px solid #8a2a1a',zIndex:4}}/>
            <div style={{width:62,height:58,background:'#e8e0d0',border:'2px solid #8a6a40',boxShadow:'2px 2px 0 #00000060',padding:'3px 4px'}}>
              <div style={{background:'#b83a2a',padding:'2px 3px',marginBottom:2,textAlign:'center'}}>
                <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:5,color:'#f0d0c0'}}>APR</div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:1}}>
                {['S','M','T','W','T','F','S'].map((d,i)=>(
                  <div key={i} style={{fontSize:4,fontFamily:"'Press Start 2P',monospace",color:'#8a6a50',textAlign:'center'}}>{d}</div>
                ))}
                {Array.from({length:28}).map((_,i)=>(
                  <div key={i} style={{fontSize:4,fontFamily:"'Press Start 2P',monospace",color:i===2?'#b83a2a':'#5a4030',textAlign:'center',background:i===2?'#e8c0b0':'transparent'}}>{i+1}</div>
                ))}
              </div>
            </div>
          </div>

          {/* ── 5. CLOCK ── */}
          <LiveClock style={{position:'absolute',left:655,top:18,zIndex:3}}/>

          {/* ── 6. TROPHY SHELF ── */}
          <div style={{position:'absolute',left:755,top:20,zIndex:3}}>
            <div style={{display:'flex',gap:6,padding:'4px 10px',justifyContent:'center',alignItems:'flex-end'}}>
              {['🏆','🥈','⭐','🎖️'].map((e,i)=>(<span key={i} style={{fontSize:i===0?22:17}}>{e}</span>))}
            </div>
            <div style={{height:8,background:'linear-gradient(180deg,#9a7a48,#6a4a20)',border:'1px solid #b09050',borderRadius:'1px 1px 0 0',minWidth:118}}/>
          </div>

          {/* ── 7. MUSIC PLAYER ── */}
          <Obj id="music" h={hoveredObj} sh={setHoveredObj} onClick={()=>handleClick('music')}
            visited={isVisited('music')} tip="🎵 Music Player"
            style={{position:'absolute',left:888,top:20,zIndex:3}}>
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
                {[0,1,2].map(i=>(<div key={i} style={{width:10,height:10,borderRadius:'50%',background:'#1a1408',border:'1px solid #5a6a3060'}}/>))}
              </div>
            </div>
          </Obj>

          {/* ── 8. BOOKSHELF ── */}
          <Obj id="bookshelf" h={hoveredObj} sh={setHoveredObj} onClick={()=>handleClick('education')}
            visited={isVisited('education')} tip="📚 View Education"
            style={{position:'absolute',right:10,top:14,zIndex:3}}>
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

          <div style={s.baseboard}/>
        </div>

        {/* ── FLOOR EDGE ── */}
        <div style={s.floorEdge}/>

        {/* ══════════════════════════════════════════ FLOOR ══════════════════════════════════════════ */}
        <div style={s.floor}>
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
            <rect x="150" y="55" width="600" height="190" fill="#1a2818" rx="2" opacity="0.9"/>
            <rect x="160" y="63" width="580" height="174" fill="transparent" stroke="#2a4a28" strokeWidth="2"/>
            {[0,1,2,3,4,5,6,7,8].map(i=>(
              <rect key={i} x={150+i*67} y="55" width="33" height="190" fill={i%2===0?'#1e3820':'#162a18'} opacity="0.8"/>
            ))}
            <rect x="268" y="55" width="88" height="190" fill="#b8d878" opacity="0.05"/>
            <rect x="296" y="55" width="38" height="190" fill="#c8e888" opacity="0.03"/>
            <rect x="160" y="63" width="580" height="9" fill="#3a5a38" opacity="0.5"/>
            <rect x="160" y="224" width="580" height="9" fill="#3a5a38" opacity="0.5"/>
          </svg>

          {/* Window light on floor */}
          <div style={{position:'absolute',left:'19%',top:0,width:125,height:'100%',background:'linear-gradient(180deg,#b8d87812,transparent 80%)',pointerEvents:'none',zIndex:1,transform:'skewX(-5deg)'}}/>

          {/* ── FLOOR LAMP (far left) ── */}
          <div style={{position:'absolute',left:26,bottom:8,zIndex:4}}>
            <div style={{width:36,height:20,background:'linear-gradient(180deg,#c8b898,#a89878)',border:'2px solid #8a7858',clipPath:'polygon(10% 0,90% 0,100% 100%,0 100%)'}}/>
            <div style={{width:4,height:58,background:'linear-gradient(180deg,#7a6a50,#5a4a30)',border:'1px solid #9a8a60',margin:'0 auto'}}/>
            <div style={{width:28,height:7,background:'#c0b090',border:'2px solid #9a8860',borderRadius:2,margin:'0 auto'}}/>
            <div style={{position:'absolute',top:20,left:-20,width:80,height:58,background:'radial-gradient(ellipse at 50% 0%,#d8a84035,transparent 70%)',pointerEvents:'none',animation:'lampGlowPulse 3s ease-in-out infinite'}}/>
          </div>

          {/* ── DESK ── */}
          <div style={s.deskGroup}>
            <div style={s.deskSurface}>

              {/* MONITOR */}
              <Obj id="computer" h={hoveredObj} sh={setHoveredObj} onClick={()=>handleClick('about')}
                visited={isVisited('about')} tip="🖥️ About Me"
                style={{position:'relative',display:'flex',flexDirection:'column',alignItems:'center',gap:2}}>
                <div style={s.monitor}>
                  <div style={s.monitorBezel}>
                    <div style={s.monitorScreen}>
                      <div style={{position:'absolute',inset:0,backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 3px,#00000014 3px,#00000014 4px)',pointerEvents:'none',zIndex:2}}/>
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
                    <div style={{width:'100%',height:95,background:'#060e04',overflow:'hidden',position:'relative'}}>
                      <div style={{width:'100%',height:'100%',background:'linear-gradient(135deg,#081408,#0c1808)',padding:'8px 6px'}}>
                        <div style={{position:'absolute',inset:0,backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 2px,#00000018 2px,#00000018 3px)',zIndex:2}}/>
                        <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:6,color:'#7ab050',marginBottom:7,textAlign:'center',position:'relative',zIndex:3}}>PROJECTS.exe</div>
                        <div style={{display:'flex',justifyContent:'center',gap:4,flexWrap:'wrap',position:'relative',zIndex:3}}>
                          {['🎯','📊','🌾','🎨','📈'].map((e,i)=>(<span key={i} style={{fontSize:15}}>{e}</span>))}
                        </div>
                        <div style={{height:3,background:'#7ab050',margin:'7px 8px 0',borderRadius:2,animation:'laptopPulse 2s ease-in-out infinite',position:'relative',zIndex:3}}/>
                      </div>
                    </div>
                  </div>
                  <div style={{width:153,height:4,background:'linear-gradient(180deg,#c8b898,#a89878)',border:'1px solid #8a7858'}}/>
                  <div style={{width:153,background:'#c0b090',border:'2px solid #9a8860',borderTop:'none',borderRadius:'0 0 4px 4px',padding:'4px 6px 6px'}}>
                    <div style={{height:5,background:'#a09070',marginBottom:3}}/>
                    <div style={{width:50,height:26,background:'#908060',border:'1px solid #7a6a40',margin:'0 auto',borderRadius:2}}/>
                  </div>
                </div>
              </Obj>

              {/* PHONE */}
              <Obj id="phone" h={hoveredObj} sh={setHoveredObj} onClick={()=>handleClick('contact')}
                visited={isVisited('contact')} tip="📱 Contact Me"
                style={{position:'relative',alignSelf:'flex-end',marginBottom:4}}>
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

              {/* DESK DECO — coffee + pens */}
              <div style={{display:'flex',flexDirection:'column',gap:6,alignItems:'center',paddingBottom:4,alignSelf:'flex-end'}}>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                  <div style={{height:12,position:'relative',width:28}}>
                    <div style={{width:4,height:4,background:'#ffffff18',borderRadius:'50%',animation:'steamRise 2s ease-out infinite',position:'absolute',left:6}}/>
                    <div style={{width:4,height:4,background:'#ffffff18',borderRadius:'50%',animation:'steamRise 2s ease-out infinite',animationDelay:'0.5s',position:'absolute',left:14}}/>
                  </div>
                  <div style={{position:'relative',width:28}}>
                    <div style={{position:'absolute',right:-5,top:4,width:6,height:10,border:'2px solid #7a5030',borderLeft:'none',borderRadius:'0 4px 4px 0'}}/>
                    <div style={{width:26,height:26,background:'linear-gradient(180deg,#c8b090,#a89060)',border:'2px solid #7a5030',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12}}>☕</div>
                  </div>
                </div>
                <div style={{display:'flex',gap:2,alignItems:'flex-end',height:26}}>
                  {['#c86040','#6a8a40','#c8a030'].map((c,i)=>(
                    <div key={i} style={{width:4,height:22+i*2,background:c,border:`1px solid ${c}80`,borderRadius:'2px 2px 0 0'}}/>
                  ))}
                </div>
              </div>

            </div>{/* end deskSurface */}

            {/* Desk front */}
            <div style={s.deskFront}>
              <div style={{display:'flex',gap:0,paddingLeft:16}}>
                {[0,1].map(i=>(<div key={i} style={{width:110,height:22,border:'1px solid #8a6a3a',borderTop:'none',display:'flex',alignItems:'center',justifyContent:'center',background:'#4a3018'}}>
                  <div style={{width:8,height:4,background:'#aa8050',borderRadius:1,border:'1px solid #c8a060'}}/>
                </div>))}
              </div>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',paddingLeft:18,paddingRight:18}}>
              {[0,1].map(i=>(<div key={i} style={{width:14,height:40,background:'linear-gradient(180deg,#4a3018,#2a1a08)',border:'1px solid #6a4a20',borderTop:'none'}}/>))}
            </div>
          </div>{/* end deskGroup */}

          {/* ── CHAIR ── */}
          <div style={s.chairGroup}>
            <div style={s.chairBack}>
              <div style={{position:'absolute',inset:6,border:'1px solid #5a4a2a30',borderRadius:2}}/>
              <div style={{position:'absolute',top:-12,left:4,right:4,height:14,background:'#3a2810',border:'2px solid #6a4a2050',borderRadius:3}}/>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',width:92,margin:'-4px auto 0'}}>
              {[0,1].map(i=>(<div key={i} style={{width:10,height:22,background:'#3a2810',border:'1px solid #6a4a2040',borderRadius:2}}/>))}
            </div>
            <div style={s.chairSeat}/>
            <div style={{width:8,height:26,background:'linear-gradient(180deg,#5a4a30,#3a3020)',border:'1px solid #7a6a40',margin:'0 auto'}}/>
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

          {/* ── PIXEL CHARACTER ── */}
          <PixelChar eyeOpen={eyeOpen} style={s.charPos}/>

          {/* ── FLOOR PLANT (far right) ── */}
          <Obj id="plant" h={hoveredObj} sh={setHoveredObj} onClick={()=>{}} tip="🌿 A happy plant!"
            style={{position:'absolute',right:26,bottom:6,zIndex:4}}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
              <div style={{position:'relative',width:56,height:60}}>
                <div style={{position:'absolute',left:0,top:18,width:24,height:18,background:'#3a7a30',borderRadius:'50% 0 50% 0',transform:'rotate(-22deg)'}}/>
                <div style={{position:'absolute',right:0,top:10,width:24,height:18,background:'#4a8a38',borderRadius:'0 50% 0 50%',transform:'rotate(22deg)'}}/>
                <div style={{position:'absolute',left:'50%',top:0,width:20,height:30,background:'#3a9040',borderRadius:'50% 50% 0 0',transform:'translateX(-50%)',animation:'plantSway 3s ease-in-out infinite',transformOrigin:'bottom center'}}/>
              </div>
              <div style={{width:44,height:7,background:'#c08050',border:'2px solid #d09060',borderRadius:'2px 2px 0 0'}}/>
              <div style={{width:38,height:34,background:'linear-gradient(180deg,#9a6040,#6a3820)',border:'2px solid #b07050',borderRadius:'0 0 5px 5px'}}/>
            </div>
          </Obj>

          {/* ── SIDE TABLE + SMALL MONITOR (right side, clear of plant) ── */}
          <div style={{position:'absolute',right:96,bottom:6,zIndex:4,display:'flex',flexDirection:'column',alignItems:'center'}}>
            <div style={{width:74,background:'#c0b090',border:'3px solid #8a7858',borderRadius:'3px 3px 0 0',padding:4,boxShadow:'2px 2px 0 #00000050'}}>
              <div style={{width:'100%',height:50,background:'#0a1408',border:'2px solid #3a4a28',display:'flex',alignItems:'center',justifyContent:'center',position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',inset:0,backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 2px,#00000018 2px,#00000018 3px)'}}/>
                <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:5,color:'#78cc60',textAlign:'center',lineHeight:1.8,position:'relative',zIndex:1}}>
                  SYS<br/>OK<br/><span style={{color:'#c8a840',fontSize:4,animation:'pulse 2s ease-in-out infinite'}}>●</span>
                </div>
              </div>
            </div>
            <div style={{width:10,height:3,background:'#a09070'}}/>
            <div style={{width:44,height:5,background:'#c0b090',border:'1px solid #8a7858',borderRadius:'0 0 2px 2px'}}/>
            <div style={{width:90,height:11,background:'linear-gradient(180deg,#6a4a28,#4a3018)',border:'2px solid #8a6a38',borderRadius:2,marginTop:2}}/>
            <div style={{display:'flex',justifyContent:'space-between',width:74}}>
              {[0,1].map(i=>(<div key={i} style={{width:10,height:25,background:'#3a2010',border:'1px solid #5a3820',borderTop:'none'}}/>))}
            </div>
          </div>

        </div>{/* end floor */}
      </div>{/* end scene */}

      {/* ── HINT BAR ── */}
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
        @keyframes steamRise{0%{transform:translateY(0);opacity:.5}100%{transform:translateY(-16px);opacity:0}}
        @keyframes pulse{0%,100%{opacity:.4}50%{opacity:1}}
        @keyframes bookBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
        @keyframes laptopPulse{0%,100%{opacity:.3;width:55%}50%{opacity:.9;width:82%}}
        @keyframes plantSway{0%,100%{transform:translateX(-50%) rotate(-5deg)}50%{transform:translateX(-50%) rotate(5deg)}}
        @keyframes lampGlowPulse{0%,100%{opacity:.3}50%{opacity:.7}}
        @keyframes cursorBlink{0%,49%{opacity:1}50%,100%{opacity:0}}
        @keyframes charBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}
        @keyframes hintFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
      `}</style>
    </div>
  );
}

// ── Pixel Character ──
function PixelChar({ eyeOpen, style }) {
  return (
    <div style={{...style,display:'flex',flexDirection:'column',alignItems:'center',animation:'charBob 3s ease-in-out infinite'}}>
      <div style={{background:'#2a1e08ee',border:'1px solid #c8a840',color:'#c8a840',fontFamily:"'Press Start 2P',monospace",fontSize:6,padding:'4px 7px',marginBottom:5,whiteSpace:'nowrap',boxShadow:'0 0 8px #c8a84040',position:'relative',animation:'hintFloat 2s ease-in-out infinite'}}>
        👆 CLICK OBJECTS!
        <div style={{position:'absolute',bottom:-6,left:'50%',transform:'translateX(-50%)',width:0,height:0,borderLeft:'5px solid transparent',borderRight:'5px solid transparent',borderTop:'5px solid #c8a840'}}/>
      </div>
      <div style={{width:32,height:30,position:'relative',marginBottom:-2}}>
        <div style={{position:'absolute',top:-5,left:-2,right:-2,height:14,background:'#1a0e06',borderRadius:'4px 4px 0 0',borderBottom:'3px solid #2a1a0a'}}/>
        <div style={{position:'absolute',bottom:0,left:0,right:0,height:23,background:'#c8956c',borderRadius:'3px 3px 4px 4px',border:'1px solid #b07850'}}>
          <div style={{position:'absolute',top:4,left:2,right:2,display:'flex',alignItems:'center',gap:1}}>
            <div style={{flex:1,height:8,border:'2px solid #3a2a1a',borderRadius:2,background:'rgba(180,220,120,0.15)'}}/>
            <div style={{width:3,height:2,background:'#3a2a1a',flexShrink:0}}/>
            <div style={{flex:1,height:8,border:'2px solid #3a2a1a',borderRadius:2,background:'rgba(180,220,120,0.15)'}}/>
          </div>
          <div style={{display:'flex',justifyContent:'space-around',paddingTop:5,paddingLeft:3,paddingRight:3}}>
            <div style={{width:5,height:5,borderRadius:1,background:eyeOpen?'#2a1a0a':'#c8956c',transition:'background 0.05s'}}/>
            <div style={{width:5,height:5,borderRadius:1,background:eyeOpen?'#2a1a0a':'#c8956c',transition:'background 0.05s'}}/>
          </div>
          <div style={{width:10,height:3,background:'#8b3a2a',margin:'4px auto 0',borderRadius:'0 0 2px 2px'}}/>
        </div>
      </div>
      <div style={{width:38,height:30,background:'linear-gradient(180deg,#c0a870,#a89050)',borderRadius:'2px 2px 4px 4px',border:'1px solid #d0b880',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <span style={{fontFamily:"'Press Start 2P',monospace",fontSize:7,color:'#5a4020cc'}}>AI</span>
      </div>
      <div style={{display:'flex',justifyContent:'space-between',width:58,marginTop:-22,zIndex:-1}}>
        <div style={{width:11,height:26,background:'#c8956c',border:'1px solid #b07850',borderRadius:'3px 3px 4px 4px',transform:'rotate(25deg)',transformOrigin:'top center'}}/>
        <div style={{width:11,height:26,background:'#c8956c',border:'1px solid #b07850',borderRadius:'3px 3px 4px 4px',transform:'rotate(-25deg)',transformOrigin:'top center'}}/>
      </div>
      <div style={{display:'flex',gap:56,marginTop:-6}}>
        {[0,1].map(i=>(<div key={i} style={{width:10,height:8,background:'#c8956c',border:'1px solid #b07850',borderRadius:2}}/>))}
      </div>
    </div>
  );
}

// ── Live Clock ──
function LiveClock({ style }) {
  const [t, setT] = useState(new Date());
  useEffect(() => { const id = setInterval(()=>setT(new Date()),1000); return ()=>clearInterval(id); }, []);
  const sec = t.getSeconds(), min = t.getMinutes(), hr = t.getHours()%12;
  return (
    <div style={style}>
      <div style={{textAlign:'center'}}>
        <div style={{width:62,height:62,borderRadius:'50%',background:'linear-gradient(135deg,#c8b898,#a89878)',border:'4px solid #7a5a30',position:'relative',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 0 0 2px #5a3a18,3px 3px 0 #00000060',margin:'0 auto'}}>
          {Array.from({length:12}).map((_,i)=>(
            <div key={i} style={{position:'absolute',width:i%3===0?3:2,height:i%3===0?6:3,background:i%3===0?'#5a3a18':'#8a6a40',left:'calc(50% - 1px)',top:'50%',transformOrigin:'bottom center',transform:`rotate(${i*30}deg) translateY(-25px)`}}/>
          ))}
          <div style={{position:'absolute',inset:6,borderRadius:'50%',background:'#e8ddc8',border:'1px solid #c8a870'}}/>
          <div style={{position:'absolute',width:3,height:13,background:'#3a2810',borderRadius:2,bottom:'50%',left:'calc(50% - 1px)',transformOrigin:'bottom center',transform:`rotate(${hr*30+min*0.5}deg)`,zIndex:2}}/>
          <div style={{position:'absolute',width:2,height:19,background:'#2a1808',borderRadius:2,bottom:'50%',left:'calc(50% - 1px)',transformOrigin:'bottom center',transform:`rotate(${min*6}deg)`,zIndex:2}}/>
          <div style={{position:'absolute',width:1,height:21,background:'#c84020',borderRadius:2,bottom:'50%',left:'calc(50% - 0.5px)',transformOrigin:'bottom center',transform:`rotate(${sec*6}deg)`,zIndex:2}}/>
          <div style={{position:'absolute',width:6,height:6,borderRadius:'50%',background:'#c84020',top:'calc(50% - 3px)',left:'calc(50% - 3px)',zIndex:3}}/>
        </div>
        <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:7,color:'#8a6a40',marginTop:4}}>{String(t.getHours()).padStart(2,'0')}:{String(min).padStart(2,'0')}</div>
      </div>
    </div>
  );
}

// ── Cloud ──
function Cloud({ style }) {
  return (
    <div style={{position:'absolute',left:-70,...style,animation:'cloudDrift linear infinite',animationDuration:style.animationDuration||'22s',animationDelay:style.animationDelay||'0s'}}>
      <div style={{position:'relative',width:54,height:20}}>
        <div style={{position:'absolute',width:28,height:15,background:'#2a2830',borderRadius:'50%',left:0,top:4}}/>
        <div style={{position:'absolute',width:20,height:18,background:'#2e2c38',borderRadius:'50%',left:12,top:0}}/>
        <div style={{position:'absolute',width:17,height:13,background:'#2a2830',borderRadius:'50%',left:30,top:5}}/>
      </div>
    </div>
  );
}

// ── Obj wrapper ──
function Obj({ id, h, sh, onClick, visited, tip, style, children }) {
  const isH = h === id;
  return (
    <div
      style={{cursor:'pointer',filter:isH?'brightness(1.2) saturate(1.1)':'brightness(1)',transform:isH?`${style.transform||''} translateY(-4px)`:(style.transform||'translateY(0)'),transition:'filter .15s,transform .15s',...style}}
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

// ── STYLES ──
const s = {
  root:{width:'100vw',height:'100vh',display:'flex',flexDirection:'column',background:'#1a1208',overflow:'hidden',fontFamily:"'Share Tech Mono',monospace"},
  topBar:{height:36,background:'#120e06',borderBottom:'1px solid #6a4a28',display:'flex',alignItems:'center',padding:'0 16px',gap:16,flexShrink:0,zIndex:10},
  topBarTitle:{flex:1,textAlign:'center',fontFamily:"'Press Start 2P',monospace",fontSize:9,color:'#c8a840',letterSpacing:'0.1em'},
  topBarHint:{fontSize:11,color:'#7a6a4a'},
  scene:{flex:1,position:'relative',display:'flex',flexDirection:'column',overflow:'hidden'},
  backWall:{
    height:'52%',background:'#4a3420',position:'relative',flexShrink:0,
    backgroundImage:'repeating-linear-gradient(90deg,transparent 0,transparent 79px,#5a3c2228 79px,#5a3c2228 80px),repeating-linear-gradient(0deg,transparent 0,transparent 59px,#5a3c2218 59px,#5a3c2218 60px)',
  },
  wallTop:{position:'absolute',top:0,left:0,right:0,height:20,background:'linear-gradient(180deg,#6a4a28,#4a3420)',borderBottom:'2px solid #7a5a30'},
  baseboard:{position:'absolute',bottom:0,left:0,right:0,height:12,background:'linear-gradient(180deg,#7a5a30,#5a3a18)',borderTop:'2px solid #9a7a48'},
  floorEdge:{height:6,background:'linear-gradient(180deg,#5a3a18,#3a2810)',borderTop:'2px solid #7a5a30',borderBottom:'2px solid #1a1008',zIndex:2,flexShrink:0},
  floor:{flex:1,position:'relative',overflow:'hidden'},
  winOuter:{border:'5px solid #7a5a30',background:'#5a3a18',overflow:'hidden',position:'relative',boxShadow:'0 4px 18px #00000080,inset 0 0 0 2px #9a7a48',width:200},
  blindsOuter:{width:'100%'},
  winGlass:{width:'100%',height:76,overflow:'hidden',position:'relative'},
  sky:{width:'100%',height:'100%',position:'relative',background:'linear-gradient(180deg,#08060f 0%,#100820 60%,#180c28 100%)',overflow:'hidden'},
  moon:{position:'absolute',right:14,top:10,width:22,height:22,background:'#e8d8a0',borderRadius:'50%',boxShadow:'0 0 10px #e0c88050',clipPath:'circle(50% at 55% 50%)'},
  winBarH:{position:'absolute',left:0,right:0,top:'calc(50% + 4px)',height:4,background:'#7a5a30',pointerEvents:'none'},
  winBarV:{position:'absolute',top:0,bottom:0,left:'calc(50% - 2px)',width:4,background:'#7a5a30',pointerEvents:'none'},
  winSill:{height:11,background:'#9a7a48',borderTop:'3px solid #b89060'},
  posterFrame:{width:118,border:'5px solid #7a5a30',background:'#c8a868',padding:4,boxShadow:'4px 4px 0 #00000070'},
  posterInner:{background:'linear-gradient(135deg,#c0a058,#b89048)',border:'1px solid #8a6a30',padding:'8px 6px',textAlign:'center'},
  posterTitle:{fontFamily:"'Press Start 2P',monospace",fontSize:7,color:'#5a2818',textShadow:'1px 1px 0 #c8a040',marginBottom:6,letterSpacing:1},
  shelf:{width:210,background:'#3a2810',border:'3px solid #7a5a30',padding:'6px 8px 0',boxShadow:'4px 4px 0 #00000060'},
  shelfPlank:{height:8,background:'linear-gradient(180deg,#9a7a48,#7a5a28)',borderTop:'2px solid #b89860',borderBottom:'2px solid #4a3018',margin:'0 -8px'},
  musicBox:{width:102,background:'#c0b090',border:'3px solid #8a7050',padding:8,boxShadow:'3px 3px 0 #00000060,inset 0 1px 0 #e8d8b0'},
  musicLabel:{fontFamily:"'Press Start 2P',monospace",fontSize:6,color:'#5a4020',textAlign:'center',marginBottom:4,letterSpacing:1},
  musicScreen:{background:'#0a1008',border:'2px solid #5a4a30',height:36,display:'flex',alignItems:'flex-end',justifyContent:'center',padding:'4px 4px 2px',gap:2,marginBottom:4},
  deskGroup:{position:'absolute',left:'50%',bottom:28,transform:'translateX(-50%)',zIndex:5},
  deskSurface:{display:'flex',alignItems:'flex-end',gap:16,background:'linear-gradient(180deg,#7a5028,#5a3a18)',border:'2px solid #9a7a40',borderBottom:'none',padding:'14px 24px 10px',minWidth:660,boxShadow:'0 -2px 0 #b89050,0 2px 20px #00000080',position:'relative',zIndex:2},
  deskFront:{background:'linear-gradient(180deg,#5a3a18,#3a2010)',border:'2px solid #8a6a30',borderTop:'none',height:28,minWidth:660,display:'flex',alignItems:'center'},
  monitor:{display:'flex',flexDirection:'column',alignItems:'center'},
  monitorBezel:{width:188,background:'#c8b898',border:'5px solid #a09070',borderRadius:'6px 6px 2px 2px',boxShadow:'0 0 0 2px #8a7858,3px 3px 0 #00000060,inset 0 2px 0 #e8d8b8',overflow:'visible'},
  monitorScreen:{width:'100%',height:130,background:'#020d01',position:'relative',overflow:'hidden',border:'3px solid #7a6848'},
  monitorNeck:{width:18,height:12,background:'linear-gradient(180deg,#b0a080,#907860)',border:'1px solid #8a7050'},
  monitorBase:{width:76,height:9,background:'linear-gradient(180deg,#c0b090,#a09070)',border:'2px solid #8a7050',borderRadius:'0 0 3px 3px'},
  keyboard:{width:180,background:'#c0b090',border:'2px solid #9a8060',padding:'5px 6px',borderRadius:2,boxShadow:'0 3px 0 #6a5030,0 4px 8px #00000060'},
  mouse:{width:22,height:32,background:'linear-gradient(180deg,#c8b898,#a89878)',border:'2px solid #8a7858',borderRadius:'11px 11px 8px 8px',boxShadow:'0 2px 0 #6a5838',marginLeft:6,alignSelf:'flex-end',marginBottom:2},
  laptopLid:{width:150,background:'#c0b090',border:'3px solid #9a8060',borderBottom:'none',borderRadius:'4px 4px 0 0',overflow:'hidden'},
  phone:{width:46,background:'#2a2018',border:'2px solid #5a4a30',borderRadius:7,overflow:'hidden',boxShadow:'0 0 8px #00000050,3px 3px 0 #00000060',padding:'5px 0'},
  chairGroup:{position:'absolute',left:'50%',bottom:0,transform:'translateX(calc(-50% - 166px))',zIndex:4},
  chairBack:{width:72,height:88,position:'relative',background:'linear-gradient(180deg,#5a3a18,#3a2410)',border:'2px solid #8a5a28',borderRadius:'4px 4px 0 0',margin:'0 auto',boxShadow:'2px 2px 0 #00000060'},
  chairSeat:{width:88,height:20,margin:'0 auto',background:'linear-gradient(180deg,#6a4a20,#4a3018)',border:'2px solid #8a6030',borderRadius:'2px 2px 4px 4px'},
  charPos:{position:'absolute',left:'50%',bottom:24,transform:'translateX(calc(-50% - 86px))',zIndex:6},
  hintBar:{height:30,background:'#100c06',borderTop:'1px solid #6a4a28',display:'flex',alignItems:'center',justifyContent:'center',gap:20,flexShrink:0},
};
