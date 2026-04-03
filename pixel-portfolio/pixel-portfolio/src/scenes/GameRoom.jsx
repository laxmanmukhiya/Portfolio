// ============================================================
// GameRoom — Fully rebuilt pixel-art room scene
// Proper room perspective: back wall + floor + all objects
// integrated naturally into the space
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
          {['#ff5f57','#febc2e','#28c840'].map((c,i)=>(
            <span key={i} style={{display:'inline-block',width:12,height:12,borderRadius:'50%',background:c}}/>
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

          {/* WINDOW */}
          <Obj id="window" h={hoveredObj} sh={setHoveredObj} onClick={()=>{}} style={{position:'absolute',left:'20%',top:18,zIndex:3}}>
            <div style={s.winOuter}>
              <div style={s.winGlass}>
                <div style={s.sky}>
                  {[[6,8],[18,22],[32,6],[48,16],[62,5],[74,20],[86,10],[14,38],[58,32]].map(([x,y],i)=>(
                    <div key={i} style={{position:'absolute',left:`${x}%`,top:`${y}%`,width:i%3?2:3,height:i%3?2:3,background:'#fff',borderRadius:'50%',animation:`starTwinkle ${2+i*0.3}s ease-in-out infinite`,animationDelay:`${i*0.35}s`}}/>
                  ))}
                  <div style={s.moon}/>
                  <Cloud style={{top:'22%',animationDuration:'20s'}}/>
                  <Cloud style={{top:'50%',animationDuration:'30s',animationDelay:'-14s',opacity:0.6}}/>
                  <svg style={{position:'absolute',bottom:0,left:0,width:'100%',height:65}} viewBox="0 0 220 65" preserveAspectRatio="none">
                    {[[0,35,22,30],[24,28,14,37],[40,38,20,27],[62,22,24,43],[88,34,18,31],[108,30,22,35],[132,24,28,41],[162,40,16,25],[180,32,20,33]].map(([x,y,w,h],i)=>(
                      <rect key={i} x={x} y={y} width={w} height={65-y} fill={`hsl(240,${20+i*2}%,${7+i}%)`}/>
                    ))}
                    {[[8,28],[26,22],[44,32],[66,16],[90,26],[112,20],[135,18],[165,34],[184,26]].map(([x,y],i)=>(
                      <rect key={i} x={x} y={y} width={3} height={3} fill={i%3===0?'#ffd93d':i%3===1?'#4ecdc4':'#6c63ff'} opacity="0.75"/>
                    ))}
                  </svg>
                </div>
              </div>
              <div style={s.winBarH}/><div style={s.winBarV}/>
            </div>
            <div style={s.winSill}/>
          </Obj>

          {/* SKILLS POSTER */}
          <Obj id="poster" h={hoveredObj} sh={setHoveredObj} onClick={()=>handleClick('skills')}
            visited={isVisited('skills')} tip="📋 View Skills"
            style={{position:'absolute',left:'4%',top:22,zIndex:3}}>
            <div style={s.posterFrame}>
              <div style={s.posterInner}>
                <div style={s.posterTitle}>TECH STACK</div>
                <div style={{display:'flex',flexWrap:'wrap',gap:3,justifyContent:'center',margin:'5px 0'}}>
                  {[['🐍','#3776ab'],['🧠','#ff6b6b'],['⚙️','#ffd93d'],['📊','#6c63ff'],['☁️','#4ecdc4'],['🔥','#ff9f43']].map(([e,c],i)=>(
                    <div key={i} style={{width:30,height:30,border:`1px solid ${c}60`,display:'flex',alignItems:'center',justifyContent:'center',background:'#0a0a18',fontSize:14}}>{e}</div>
                  ))}
                </div>
                <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:5,color:'#555577',marginTop:3,letterSpacing:0.5}}>AI & DATA SCIENCE</div>
              </div>
            </div>
          </Obj>

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
            style={{position:'absolute',left:'47%',top:22,zIndex:3}}>
            <div style={s.musicBox}>
              <div style={s.musicLabel}>♪ BEATS</div>
              <div style={s.musicScreen}>
                {[4,7,3,8,5,9,4,6].map((h,i)=>(
                  <div key={i} style={{width:7,height:h*3,borderRadius:'1px 1px 0 0',background:i%2===0?'#6c63ff':'#4ecdc4',animation:`barBounce ${0.4+i*0.05}s ease-in-out infinite`,animationDelay:`${i*0.1}s`}}/>
                ))}
              </div>
              <div style={{display:'flex',justifyContent:'space-around',margin:'4px 0'}}>
                {['◀◀','▶','▶▶'].map((btn,i)=>(
                  <span key={i} style={{fontSize:i===1?11:8,color:i===1?'#6c63ff':'#555577'}}>{btn}</span>
                ))}
              </div>
              <div style={{display:'flex',justifyContent:'space-around'}}>
                {[0,1,2].map(i=>(
                  <div key={i} style={{width:10,height:10,borderRadius:'50%',background:'#2a1a3a',border:'1px solid #6c63ff60'}}/>
                ))}
              </div>
            </div>
          </Obj>

          {/* LIVE CLOCK */}
          <LiveClock style={{position:'absolute',left:'62%',top:22,zIndex:3}}/>

          {/* WALL TROPHY SHELF */}
          <div style={{position:'absolute',left:'31%',top:22,zIndex:3}}>
            <div style={{display:'flex',gap:8,padding:'4px 10px',justifyContent:'center'}}>
              {['🏆','🥈','⭐','🎖️'].map((e,i)=>(<span key={i} style={{fontSize:i===0?22:18}}>{e}</span>))}
            </div>
            <div style={{height:8,background:'linear-gradient(180deg,#8b6650,#6b4830)',border:'1px solid #a07060',borderRadius:'1px 1px 0 0'}}/>
          </div>

          <div style={s.baseboard}/>
        </div>

        {/* ═══ FLOOR LINE ═══ */}
        <div style={s.floorEdge}/>

        {/* ═══ FLOOR ═══ */}
        <div style={s.floor}>
          {/* Floor tiles via SVG */}
          <svg style={{position:'absolute',inset:0,width:'100%',height:'100%'}} viewBox="0 0 900 260" preserveAspectRatio="none">
            <defs>
              <pattern id="tile" x="0" y="0" width="90" height="65" patternUnits="userSpaceOnUse">
                <rect width="90" height="65" fill="#12121e"/>
                <rect x="0" y="0" width="89" height="64" fill="#131320"/>
                <line x1="90" y1="0" x2="90" y2="65" stroke="#1c1c2e" strokeWidth="1"/>
                <line x1="0" y1="65" x2="90" y2="65" stroke="#1c1c2e" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="900" height="260" fill="url(#tile)"/>
            {/* Rug */}
            <rect x="180" y="80" width="540" height="160" fill="#1a0a2a" rx="2" opacity="0.85"/>
            <rect x="190" y="90" width="520" height="140" fill="transparent" stroke="#2d1248" strokeWidth="2"/>
            <rect x="202" y="102" width="496" height="116" fill="transparent" stroke="#3d1858" strokeWidth="1"/>
            {[0,1,2,3,4,5,6].map(i=>(
              <rect key={i} x={212+i*65} y="112" width="58" height="96" fill="transparent" stroke="#4a206a" strokeWidth="0.5" rx="1"/>
            ))}
          </svg>

          {/* DESK */}
          <div style={s.deskGroup}>
            <div style={s.deskSurface}>

              {/* MONITOR */}
              <Obj id="computer" h={hoveredObj} sh={setHoveredObj} onClick={()=>handleClick('about')}
                visited={isVisited('about')} tip="🖥️ About Me"
                style={{position:'relative',display:'flex',flexDirection:'column',alignItems:'center',gap:2}}>
                <div style={s.monitor}>
                  <div style={s.monitorBezel}>
                    <div style={s.monitorScreen}>
                      <div style={{position:'absolute',inset:0,background:`radial-gradient(ellipse at 50% 50%,#00ff8808,transparent 70%)`,pointerEvents:'none'}}/>
                      <div style={{display:'flex',alignItems:'center',gap:4,padding:'5px 7px 3px',borderBottom:'1px solid #001a0a',background:'#000a04'}}>
                        {['#ff5f57','#febc2e','#28c840'].map((c,i)=>(
                          <span key={i} style={{display:'inline-block',width:7,height:7,borderRadius:'50%',background:c}}/>
                        ))}
                        <span style={{fontSize:8,color:'#555577',marginLeft:4}}>~/portfolio</span>
                      </div>
                      <div style={{padding:'6px 8px',display:'flex',flexDirection:'column',gap:3}}>
                        <div style={{display:'flex',alignItems:'center',gap:3}}>
                          <span style={{fontSize:9,color:'#555577'}}>❯ </span>
                          <span style={{fontSize:8,color:'#00ff88',fontFamily:"'Press Start 2P',monospace"}}>{profile.name}</span>
                          <span style={{fontSize:10,color:'#00ff88',animation:'cursorBlink 1s step-end infinite'}}>█</span>
                        </div>
                        <div style={{fontSize:9,color:'#555577',paddingLeft:12}}>{profile.role}</div>
                        <div style={{fontSize:7,color:'#ffd93d',paddingLeft:12,fontFamily:"'Press Start 2P',monospace",animation:'pulse 1.5s ease-in-out infinite'}}>[CLICK ME]</div>
                        <div style={{fontSize:8,color:'#333'}}> ──────────────</div>
                        <div style={{fontSize:9,color:'#4ecdc4',paddingLeft:12}}>📍 {profile.location}</div>
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
                        <div key={k} style={{height:12,width:row===3&&k===1?80:26,background:'#1e1e2e',border:'1px solid #3a3a4a',borderBottom:'2px solid #111',borderRadius:1}}/>
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
                    <div style={{width:'100%',height:95,background:'#050510',overflow:'hidden'}}>
                      <div style={{width:'100%',height:'100%',background:'linear-gradient(135deg,#0a0a20,#100830)',padding:'8px 6px'}}>
                        <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:6,color:'#6c63ff',marginBottom:7,textAlign:'center',textShadow:'0 0 6px #6c63ff'}}>PROJECTS.exe</div>
                        <div style={{display:'flex',justifyContent:'center',gap:4,flexWrap:'wrap'}}>
                          {['🎯','📊','🌾','🎨','📈'].map((e,i)=>(<span key={i} style={{fontSize:15}}>{e}</span>))}
                        </div>
                        <div style={{height:3,background:'#6c63ff',margin:'7px 8px 0',borderRadius:2,animation:'laptopPulse 2s ease-in-out infinite',boxShadow:'0 0 8px #6c63ff'}}/>
                      </div>
                    </div>
                  </div>
                  <div style={{width:155,height:4,background:'linear-gradient(180deg,#333,#222)',border:'1px solid #444'}}/>
                  <div style={{width:155,background:'#1a1a22',border:'2px solid #2a2a3a',borderTop:'none',borderRadius:'0 0 4px 4px',padding:'4px 6px 6px'}}>
                    <div style={{height:5,background:'#111',marginBottom:3}}/>
                    <div style={{width:50,height:28,background:'#111',border:'1px solid #333',margin:'0 auto',borderRadius:2}}/>
                  </div>
                </div>
              </Obj>

              {/* PHONE */}
              <Obj id="phone" h={hoveredObj} sh={setHoveredObj} onClick={()=>handleClick('contact')}
                visited={isVisited('contact')} tip="📱 Contact Me"
                style={{position:'relative'}}>
                <div style={s.phone}>
                  <div style={{width:16,height:4,background:'#000',borderRadius:'0 0 3px 3px',margin:'0 auto',marginBottom:6}}/>
                  <div style={{textAlign:'center',padding:'0 4px'}}>
                    <div style={{fontSize:14,marginBottom:3}}>📧</div>
                    <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:6,color:'#4ecdc4',marginBottom:2}}>Contact</div>
                    <div style={{fontSize:7,color:'#555577'}}>Tap to reach</div>
                  </div>
                  <div style={{width:16,height:4,background:'#222',border:'1px solid #333',margin:'6px auto 0'}}/>
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
                    <div style={{position:'absolute',right:-5,top:4,width:6,height:10,border:'2px solid #5c3020',borderLeft:'none',borderRadius:'0 4px 4px 0'}}/>
                    <div style={{width:28,height:28,background:'linear-gradient(180deg,#3a2010,#2a1a08)',border:'2px solid #5c3020',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13}}>☕</div>
                  </div>
                </div>
                {/* Pens */}
                <div style={{display:'flex',gap:2,alignItems:'flex-end',height:28}}>
                  {['#ff6b6b','#4ecdc4','#ffd93d'].map((c,i)=>(
                    <div key={i} style={{width:4,height:24+i*2,background:`linear-gradient(180deg,${c},${c}80)`,border:`1px solid ${c}40`,borderRadius:'2px 2px 0 0'}}/>
                  ))}
                </div>
                {/* Mini plant */}
                <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                  <div style={{fontSize:20,lineHeight:1}}>🌱</div>
                  <div style={{width:20,height:12,background:'linear-gradient(180deg,#8b4513,#5c2d0a)',border:'1px solid #a05020',borderRadius:'0 0 2px 2px'}}/>
                </div>
              </div>
            </div>
            {/* Desk front */}
            <div style={s.deskFront}>
              <div style={{display:'flex',gap:0,paddingLeft:16}}>
                {[0,1].map(i=>(<div key={i} style={{width:110,height:22,border:'1px solid #5c3e1e',borderTop:'none',display:'flex',alignItems:'center',justifyContent:'center',background:'#221508'}}>
                  <div style={{width:8,height:4,background:'#8b6030',borderRadius:1,border:'1px solid #aa8040'}}/>
                </div>))}
              </div>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',paddingLeft:18,paddingRight:18}}>
              {[0,1].map(i=>(<div key={i} style={{width:14,height:42,background:'linear-gradient(180deg,#2c1f0e,#181008)',border:'1px solid #5c3e1e',borderTop:'none'}}/>))}
            </div>
          </div>

          {/* CHAIR */}
          <div style={s.chairGroup}>
            <div style={s.chairBack}>
              <div style={{position:'absolute',inset:6,border:'1px solid #6c63ff30',borderRadius:2}}/>
              <div style={{position:'absolute',top:-12,left:4,right:4,height:14,background:'#1e0e30',border:'2px solid #6c63ff50',borderRadius:3}}/>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',width:92,margin:'-4px auto 0'}}>
              {[0,1].map(i=>(<div key={i} style={{width:10,height:22,background:'#1a0a28',border:'1px solid #6c63ff40',borderRadius:2}}/>))}
            </div>
            <div style={s.chairSeat}/>
            <div style={{width:8,height:28,background:'linear-gradient(180deg,#333,#222)',border:'1px solid #555',margin:'0 auto'}}/>
            <div style={{width:60,height:14,position:'relative',margin:'0 auto'}}>
              {[0,72,144,216,288].map(deg=>(
                <div key={deg} style={{position:'absolute',width:26,height:5,background:'#252535',border:'1px solid #3a3a4a',borderRadius:2,left:'50%',top:'50%',marginTop:-2.5,transform:`rotate(${deg}deg) translateX(14px)`,transformOrigin:'left center'}}/>
              ))}
              <div style={{position:'absolute',width:12,height:12,borderRadius:'50%',background:'#333',border:'2px solid #555',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}/>
            </div>
            <div style={{position:'relative',height:10,width:130,margin:'0 auto'}}>
              {[-24,0,24].map((x,i)=>(<div key={i} style={{position:'absolute',width:12,height:8,background:'#1a1a2a',border:'1px solid #3a3a4a',borderRadius:2,bottom:0,left:52+x}}/>))}
            </div>
          </div>

          {/* PIXEL CHARACTER */}
          <PixelChar eyeOpen={eyeOpen} style={s.charPos} name={profile.name}/>

          {/* FLOOR LAMP */}
          <div style={{position:'absolute',left:22,bottom:8,zIndex:4}}>
            <div style={{width:40,height:24,background:'linear-gradient(180deg,#1a1a2a,#252535)',border:'2px solid #3a3a5a',clipPath:'polygon(10% 0,90% 0,100% 100%,0 100%)',position:'relative'}}/>
            <div style={{width:4,height:64,background:'linear-gradient(180deg,#333,#222)',border:'1px solid #444',margin:'0 auto'}}/>
            <div style={{width:32,height:8,background:'#1a1a2a',border:'2px solid #3a3a5a',borderRadius:2,margin:'0 auto'}}/>
            <div style={{position:'absolute',top:24,left:-24,width:88,height:64,background:'radial-gradient(ellipse at 50% 0%,#ffd93d12,transparent 70%)',pointerEvents:'none',animation:'lampGlowPulse 3s ease-in-out infinite'}}/>
          </div>

          {/* FLOOR PLANT */}
          <Obj id="plant" h={hoveredObj} sh={setHoveredObj} onClick={()=>{}} tip="🌿 A happy plant!"
            style={{position:'absolute',right:34,bottom:8,zIndex:4}}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
              <div style={{position:'relative',width:64,height:68}}>
                <div style={{position:'absolute',left:0,top:22,width:28,height:20,background:'#1a7a30',borderRadius:'50% 0 50% 0',transform:'rotate(-22deg)',boxShadow:'inset 0 2px 4px rgba(0,0,0,0.3)'}}/>
                <div style={{position:'absolute',right:0,top:12,width:28,height:20,background:'#1a8a35',borderRadius:'0 50% 0 50%',transform:'rotate(22deg)'}}/>
                <div style={{position:'absolute',left:'50%',top:0,width:22,height:34,background:'#1a9040',borderRadius:'50% 50% 0 0',transform:'translateX(-50%)',animation:'plantSway 3s ease-in-out infinite',transformOrigin:'bottom center'}}/>
              </div>
              <div style={{width:50,height:8,background:'#8b4513',border:'2px solid #a05020',borderRadius:'2px 2px 0 0'}}/>
              <div style={{width:44,height:40,background:'linear-gradient(180deg,#6b3010,#4a2008)',border:'2px solid #8b4020',borderRadius:'0 0 6px 6px'}}/>
            </div>
          </Obj>
        </div>
      </div>

      {/* HINT BAR */}
      <div style={s.hintBar}>
        {['🖱️ Click objects to interact','⌨️ ESC to close any panel','🏆 Unlock achievements by exploring'].map((t,i)=>(
          <React.Fragment key={i}>
            {i>0&&<span style={{color:'#222',fontSize:12}}>│</span>}
            <span style={{fontSize:10,color:'#555577'}}>{t}</span>
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
        @keyframes lampGlowPulse{0%,100%{opacity:.15}50%{opacity:.35}}
        @keyframes cursorBlink{0%,49%{opacity:1}50%,100%{opacity:0}}
        @keyframes charBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}
        @keyframes hintFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
      `}</style>
    </div>
  );
}

// ── Pixel Character ──
function PixelChar({ eyeOpen, style, name }) {
  return (
    <div style={{...style,display:'flex',flexDirection:'column',alignItems:'center',animation:'charBob 3s ease-in-out infinite'}}>
      {/* Floating hint bubble */}
      <div style={{background:'#000c',border:'1px solid #ffd93d',color:'#ffd93d',fontFamily:"'Press Start 2P',monospace",fontSize:6,padding:'4px 7px',marginBottom:5,whiteSpace:'nowrap',boxShadow:'0 0 8px #ffd93d40',position:'relative',animation:'hintFloat 2s ease-in-out infinite'}}>
        👆 CLICK OBJECTS!
        <div style={{position:'absolute',bottom:-6,left:'50%',transform:'translateX(-50%)',width:0,height:0,borderLeft:'5px solid transparent',borderRight:'5px solid transparent',borderTop:'5px solid #ffd93d'}}/>
      </div>
      {/* Head */}
      <div style={{width:32,height:30,position:'relative',marginBottom:-2}}>
        {/* Hair */}
        <div style={{position:'absolute',top:-5,left:-2,right:-2,height:14,background:'#1a0a05',borderRadius:'4px 4px 0 0',borderBottom:'3px solid #2a1a0a'}}/>
        {/* Face */}
        <div style={{position:'absolute',bottom:0,left:0,right:0,height:23,background:'#c8956c',borderRadius:'3px 3px 4px 4px',border:'1px solid #b07850'}}>
          {/* Glasses */}
          <div style={{position:'absolute',top:4,left:2,right:2,display:'flex',alignItems:'center',gap:1}}>
            <div style={{flex:1,height:8,border:'2px solid #1a1a2a',borderRadius:2,background:'rgba(100,200,255,0.15)'}}/>
            <div style={{width:3,height:2,background:'#1a1a2a',flexShrink:0}}/>
            <div style={{flex:1,height:8,border:'2px solid #1a1a2a',borderRadius:2,background:'rgba(100,200,255,0.15)'}}/>
          </div>
          {/* Eyes behind glasses */}
          <div style={{display:'flex',justifyContent:'space-around',paddingTop:5,paddingLeft:3,paddingRight:3}}>
            <div style={{width:5,height:5,borderRadius:1,background:eyeOpen?'#1a1a2a':'#c8956c',transition:'background 0.05s'}}/>
            <div style={{width:5,height:5,borderRadius:1,background:eyeOpen?'#1a1a2a':'#c8956c',transition:'background 0.05s'}}/>
          </div>
          {/* Mouth */}
          <div style={{width:10,height:3,background:'#8b3a2a',margin:'4px auto 0',borderRadius:'0 0 2px 2px'}}/>
        </div>
      </div>
      {/* Body - hoodie */}
      <div style={{width:38,height:30,background:'linear-gradient(180deg,#1a1060,#120c4a)',borderRadius:'2px 2px 4px 4px',border:'1px solid #2a1a80',display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}>
        <span style={{fontFamily:"'Press Start 2P',monospace",fontSize:7,color:'#ffffff60'}}>AI</span>
      </div>
      {/* Arms (pointing at screen) */}
      <div style={{display:'flex',justifyContent:'space-between',width:58,marginTop:-22,zIndex:-1}}>
        <div style={{width:11,height:26,background:'#c8956c',border:'1px solid #b07850',borderRadius:'3px 3px 4px 4px',transform:'rotate(25deg)',transformOrigin:'top center'}}/>
        <div style={{width:11,height:26,background:'#c8956c',border:'1px solid #b07850',borderRadius:'3px 3px 4px 4px',transform:'rotate(-25deg)',transformOrigin:'top center'}}/>
      </div>
      {/* Hands on keyboard */}
      <div style={{display:'flex',gap:56,marginTop:-6}}>
        {[0,1].map(i=>(<div key={i} style={{width:10,height:8,background:'#c8956c',border:'1px solid #b07850',borderRadius:2}}/>))}
      </div>
    </div>
  );
}

// ── Live Wall Clock ──
function LiveClock({ style }) {
  const [t, setT] = useState(new Date());
  useEffect(() => { const id = setInterval(()=>setT(new Date()),1000); return ()=>clearInterval(id); }, []);
  const s2 = t.getSeconds(), m = t.getMinutes(), h = t.getHours()%12;
  return (
    <div style={style}>
      <div style={{textAlign:'center'}}>
        <div style={{width:64,height:64,borderRadius:'50%',background:'linear-gradient(135deg,#1a1a2a,#252535)',border:'3px solid #3a3a5a',position:'relative',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 0 0 1px #444,3px 3px 0 #00000060',margin:'0 auto'}}>
          {Array.from({length:12}).map((_,i)=>(
            <div key={i} style={{position:'absolute',width:i%3===0?3:2,height:i%3===0?6:3,background:i%3===0?'#ffd93d':'#444',left:'calc(50% - 1px)',top:'50%',transformOrigin:'bottom center',transform:`rotate(${i*30}deg) translateY(-26px)`}}/>
          ))}
          {/* hour */}
          <div style={{position:'absolute',width:3,height:14,background:'#e0e0f0',borderRadius:2,bottom:'50%',left:'calc(50% - 1px)',transformOrigin:'bottom center',transform:`rotate(${h*30+m*0.5}deg)`}}/>
          {/* minute */}
          <div style={{position:'absolute',width:2,height:20,background:'#00ff88',borderRadius:2,bottom:'50%',left:'calc(50% - 1px)',transformOrigin:'bottom center',transform:`rotate(${m*6}deg)`}}/>
          {/* second */}
          <div style={{position:'absolute',width:1,height:22,background:'#ff6b6b',borderRadius:2,bottom:'50%',left:'calc(50% - 0.5px)',transformOrigin:'bottom center',transform:`rotate(${s2*6}deg)`}}/>
          <div style={{position:'absolute',width:6,height:6,borderRadius:'50%',background:'#ffd93d',top:'calc(50% - 3px)',left:'calc(50% - 3px)',zIndex:1}}/>
        </div>
        <div style={{fontFamily:"'Press Start 2P',monospace",fontSize:7,color:'#4ecdc4',marginTop:4,textShadow:'0 0 6px #4ecdc4'}}>{String(t.getHours()).padStart(2,'0')}:{String(m).padStart(2,'0')}</div>
      </div>
    </div>
  );
}

// ── Cloud ──
function Cloud({ style }) {
  return (
    <div style={{position:'absolute',left:-70,top:'28%',...style,animation:`cloudDrift linear infinite`,animationDuration:style.animationDuration||'22s',animationDelay:style.animationDelay||'0s'}}>
      <div style={{position:'relative',width:60,height:24}}>
        <div style={{position:'absolute',width:32,height:18,background:'#1a1a38',borderRadius:'50%',left:0,top:5}}/>
        <div style={{position:'absolute',width:24,height:22,background:'#1e1e40',borderRadius:'50%',left:14,top:0}}/>
        <div style={{position:'absolute',width:20,height:16,background:'#1a1a38',borderRadius:'50%',left:34,top:6}}/>
      </div>
    </div>
  );
}

// ── HoverObject wrapper ──
function Obj({ id, h, sh, onClick, visited, tip, style, children }) {
  const isH = h === id;
  return (
    <div
      style={{cursor:'pointer',filter:isH?'brightness(1.3)':'brightness(1)',transform:isH?`${style.transform||''} translateY(-5px)`:(style.transform||'translateY(0)'),transition:'filter .15s,transform .15s',...style}}
      onMouseEnter={()=>sh(id)} onMouseLeave={()=>sh(null)} onClick={onClick}
    >
      {children}
      {visited && <div style={{position:'absolute',top:-9,right:-9,width:17,height:17,background:'#00ff88',color:'#000',fontFamily:"'Press Start 2P',monospace",fontSize:8,display:'flex',alignItems:'center',justifyContent:'center',zIndex:5}}>✓</div>}
      {isH && tip && (
        <div style={{position:'absolute',bottom:'calc(100% + 10px)',left:'50%',transform:'translateX(-50%)',background:'#000',border:'1px solid #00ff88',color:'#00ff88',fontFamily:"'Press Start 2P',monospace",fontSize:7,padding:'5px 8px',whiteSpace:'nowrap',boxShadow:'0 0 10px #00ff8840',zIndex:20,pointerEvents:'none'}}>
          {tip}
          <div style={{position:'absolute',top:'100%',left:'50%',transform:'translateX(-50%)',width:0,height:0,borderLeft:'5px solid transparent',borderRight:'5px solid transparent',borderTop:'5px solid #00ff88'}}/>
        </div>
      )}
    </div>
  );
}

// ── STYLES ──
const C = {
  bg:'#0a0a0f', wall:'#161622', floor:'#0e0e18',
  desk:'#2c1f0e', deskTop:'#3a2810', border:'#2a2a3e',
  green:'#00ff88', yellow:'#ffd93d', purple:'#6c63ff',
  cyan:'#4ecdc4', red:'#ff6b6b', dim:'#555577', text:'#e0e0f0',
  chair:'#1e0e30', skin:'#c8956c',
};

const s = {
  root:{width:'100vw',height:'100vh',display:'flex',flexDirection:'column',background:C.bg,overflow:'hidden',fontFamily:"'Share Tech Mono',monospace"},
  topBar:{height:36,background:'#05050a',borderBottom:`1px solid ${C.border}`,display:'flex',alignItems:'center',padding:'0 16px',gap:16,flexShrink:0,zIndex:10},
  topBarTitle:{flex:1,textAlign:'center',fontFamily:"'Press Start 2P',monospace",fontSize:9,color:C.green,textShadow:`0 0 8px ${C.green}60`,letterSpacing:'0.1em'},
  topBarHint:{fontSize:11,color:C.dim},
  scene:{flex:1,position:'relative',display:'flex',flexDirection:'column',overflow:'hidden'},

  backWall:{height:'52%',background:C.wall,position:'relative',flexShrink:0,
    backgroundImage:`repeating-linear-gradient(90deg,transparent 0,transparent 79px,${C.border}35 79px,${C.border}35 80px),repeating-linear-gradient(0deg,transparent 0,transparent 59px,${C.border}25 59px,${C.border}25 60px)`},
  wallTop:{position:'absolute',top:0,left:0,right:0,height:20,background:'linear-gradient(180deg,#1e1e30,#161622)',borderBottom:`2px solid #252535`},
  baseboard:{position:'absolute',bottom:0,left:0,right:0,height:12,background:'linear-gradient(180deg,#1e1e2e,#18182a)',borderTop:`1px solid #2a2a3a`},
  floorEdge:{height:6,background:'linear-gradient(180deg,#252535,#1a1a28)',borderTop:`2px solid #333348`,borderBottom:`2px solid #111120`,zIndex:2,flexShrink:0},
  floor:{flex:1,position:'relative',overflow:'hidden'},

  // Window
  winOuter:{border:'4px solid #6b5a3a',background:'#4a3828',borderRadius:2,overflow:'hidden',position:'relative',boxShadow:'0 4px 20px #00000060,inset 0 0 0 2px #7a6848',width:210},
  winGlass:{width:'100%',height:168,overflow:'hidden',position:'relative'},
  sky:{width:'100%',height:'100%',position:'relative',background:'linear-gradient(180deg,#04040f 0%,#080820 50%,#0c0c30 100%)',overflow:'hidden'},
  moon:{position:'absolute',right:18,top:14,width:26,height:26,background:'#ffeaa0',borderRadius:'50%',boxShadow:'0 0 12px #ffeaa060,0 0 24px #ffd93d30',clipPath:'circle(50% at 55% 50%)'},
  winBarH:{position:'absolute',left:0,right:0,top:'calc(50% + 8px)',height:3,background:'#6b5a3a',pointerEvents:'none'},
  winBarV:{position:'absolute',top:0,bottom:0,left:'calc(50% - 1px)',width:3,background:'#6b5a3a',pointerEvents:'none'},
  winSill:{height:10,background:'#8b7355',borderTop:'2px solid #a0845a'},

  // Poster
  posterFrame:{width:118,border:'4px solid #5a3820',background:'#3a2812',padding:3,boxShadow:'4px 4px 0 #00000060'},
  posterInner:{background:'linear-gradient(135deg,#080818,#0f0f22)',border:'1px solid #2a2a3a',padding:'8px 6px',textAlign:'center'},
  posterTitle:{fontFamily:"'Press Start 2P',monospace",fontSize:7,color:'#ff6b6b',textShadow:'0 0 8px #ff6b6b',marginBottom:6,letterSpacing:1},

  // Bookshelf
  shelf:{width:210,background:'#2a1a0a',border:'3px solid #5c4020',padding:'6px 8px 0',boxShadow:'4px 4px 0 #00000060'},
  shelfPlank:{height:8,background:'linear-gradient(180deg,#7a5540,#5c4020)',borderTop:'2px solid #8b6650',borderBottom:'2px solid #3a2810',margin:'0 -8px'},

  // Music
  musicBox:{width:104,background:'#0f0820',border:`2px solid #6c63ff`,padding:8,boxShadow:`0 0 14px #6c63ff40,4px 4px 0 #00000060`},
  musicLabel:{fontFamily:"'Press Start 2P',monospace",fontSize:6,color:'#6c63ff',textAlign:'center',marginBottom:4,letterSpacing:1},
  musicScreen:{background:'#050010',border:'1px solid #6c63ff40',height:38,display:'flex',alignItems:'flex-end',justifyContent:'center',padding:'4px 4px 2px',gap:2,marginBottom:4},

  // Desk
  deskGroup:{position:'absolute',left:'50%',bottom:28,transform:'translateX(-50%)',zIndex:5},
  deskSurface:{display:'flex',alignItems:'flex-end',gap:12,background:`linear-gradient(180deg,${C.deskTop},${C.desk})`,border:'2px solid #5c3e1e',borderBottom:'none',padding:'14px 22px 10px',minWidth:700,boxShadow:'0 -2px 0 #7a5030,0 2px 20px #00000080',position:'relative',zIndex:2},
  deskFront:{background:`linear-gradient(180deg,${C.desk},#1e1408)`,border:'2px solid #5c3e1e',borderTop:'none',height:30,minWidth:700,display:'flex',alignItems:'center'},

  // Monitor
  monitor:{display:'flex',flexDirection:'column',alignItems:'center'},
  monitorBezel:{width:196,background:'#0f0f0f',border:'5px solid #2a2a2a',borderRadius:'3px 3px 0 0',boxShadow:`0 0 0 1px #444,0 0 22px #00ff8818`,overflow:'hidden'},
  monitorScreen:{width:'100%',height:134,background:'linear-gradient(135deg,#001a0a,#000f05)',position:'relative',overflow:'hidden'},
  monitorNeck:{width:8,height:18,background:'linear-gradient(180deg,#333,#222)',border:'1px solid #444'},
  monitorBase:{width:62,height:7,background:'linear-gradient(180deg,#333,#1a1a1a)',border:'1px solid #444',borderRadius:'0 0 2px 2px'},

  // Keyboard
  keyboard:{width:185,background:'#1a1a22',border:'2px solid #2a2a3a',padding:'5px 6px',borderRadius:2,boxShadow:'0 3px 0 #0a0a14,0 4px 8px #00000060'},
  mouse:{width:22,height:34,background:'linear-gradient(180deg,#222,#1a1a1a)',border:'2px solid #3a3a4a',borderRadius:'11px 11px 8px 8px',display:'flex',justifyContent:'center',paddingTop:5,boxShadow:'0 2px 0 #111',marginLeft:6,alignSelf:'flex-end',marginBottom:2},

  // Laptop
  laptopLid:{width:152,background:'#1a1a2a',border:'3px solid #2a2a3a',borderBottom:'none',borderRadius:'4px 4px 0 0',overflow:'hidden',boxShadow:'0 0 12px #6c63ff30'},

  // Phone
  phone:{width:48,background:'#111',border:'2px solid #333',borderRadius:8,overflow:'hidden',boxShadow:'0 0 10px #4ecdc430,3px 3px 0 #00000060',padding:'6px 0'},

  // Chair
  chairGroup:{position:'absolute',left:'50%',bottom:0,transform:'translateX(calc(-50% - 170px))',zIndex:4},
  chairBack:{width:72,height:92,position:'relative',background:`linear-gradient(180deg,${C.chair},#160a25)`,border:'2px solid #6c63ff50',borderRadius:'4px 4px 0 0',margin:'0 auto',boxShadow:'0 0 12px #6c63ff20'},
  chairSeat:{width:88,height:20,margin:'0 auto',background:'linear-gradient(180deg,#22103a,#180a28)',border:'2px solid #6c63ff50',borderRadius:'2px 2px 4px 4px'},

  // Character position
  charPos:{position:'absolute',left:'50%',bottom:24,transform:'translateX(calc(-50% - 90px))',zIndex:6},

  // Hint bar
  hintBar:{height:30,background:'#03030a',borderTop:`1px solid ${C.border}`,display:'flex',alignItems:'center',justifyContent:'center',gap:20,flexShrink:0},
};
