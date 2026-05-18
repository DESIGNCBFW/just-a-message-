import { useState, useEffect, useRef, useCallback } from "react";

const CODE_SNIPPETS = [
  "const love = () => { return forever; }",
  "while(true) { love++; }",
  "if (heart.isFull()) { overflow(); }",
  "function myHeart(you) { return you * Infinity; }",
  "git commit -m 'added: you'",
  "import love from './heart';",
  "const feelings = new Map([['you', Infinity]]);",
  "throw new Error('Too much love');",
  "async function dream() { await sleep(forever); }",
  "love.push(...hugs, ...kisses);",
  "export default YouAreMyWorld;",
  "const stars = [...universe].filter(s => s !== you);",
  "return <Heart beating={true} />;",
  "npm install --save love",
  "sudo make me yours",
  "ping 192.168.love.you",
  "SELECT * FROM feelings WHERE person = 'you';",
  "print('you' * 1000000)",
  "console.log('I love you');",
  "merge(branch: 'my-heart', into: 'yours')",
  "for (let day of life) { cherish(you); }",
  "const forever = Symbol('never expires');",
  "love.addEventListener('click', holdHand);",
  "diff --git a/lonely b/together",
  "rm -rf /loneliness",
  "chmod 777 /my/heart",
  "ls -la /memories | grep you",
  "echo 'you complete me' >> /dev/heart",
  "curl -X POST /api/love --data '{\"person\":\"you\"}'",
  "Object.freeze(myLoveForYou);",
];

const LOVE_PHRASES = [
  "I love you", "Te amo", "Je t'aime", "Ich liebe dich",
  "Ti amo", "Aishiteru", "Wo ai ni", "Saranghae",
  "I love you", "Mahal kita", "Nakupenda", "Ana behibak",
  "I love you", "Volim te", "Ik hou van je", "Seni seviyorum",
  "I love you", "Kocham cię", "Miluji tě", "Тебя люблю",
  "I love you", "σ'αγαπώ", "אני אוהב אותך", "أحبك",
];

const COLORS = [
  "#ff2d55", "#ff6b6b", "#feca57", "#48dbfb",
  "#ff9ff3", "#54a0ff", "#5f27cd", "#ff6348",
  "#2ed573", "#eccc68", "#a29bfe", "#fd79a8",
  "#e17055", "#00cec9", "#6c5ce7", "#fdcb6e",
  "#e84393", "#00b894", "#d63031", "#0984e3",
];

function generateHeartPoints(count) {
  const points = [];
  for (let i = 0; i < count; i++) {
    const t = (i / count) * 2 * Math.PI;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    points.push({ x: x * 14, y: y * 14 });
  }
  return points;
}

function CodeRain() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cols = Math.floor(canvas.width / 20);
    const drops = Array(cols).fill(1);
    const chars = "01アイウエオカキクケコ</>{}[]()=>!@#$%^&*+=";

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0f0";
      ctx.font = "14px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = `hsl(${120 + Math.random() * 30}, 100%, ${40 + Math.random() * 20}%)`;
        ctx.fillText(text, i * 20, drops[i] * 20);
        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }

    animRef.current = setInterval(draw, 40);
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(animRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, zIndex: 0 }} />;
}

function FloatingCode() {
  const [lines, setLines] = useState([]);
  const counterRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const snippet = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
      const id = counterRef.current++;
      setLines(prev => [
        ...prev.slice(-25),
        {
          id,
          text: snippet,
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
          opacity: 0.4 + Math.random() * 0.4,
          size: 10 + Math.random() * 6,
          color: Math.random() > 0.7 ? "#00ff41" : Math.random() > 0.5 ? "#4fc3f7" : "#a5d6a7",
        }
      ]);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none", overflow: "hidden" }}>
      {lines.map(line => (
        <div
          key={line.id}
          style={{
            position: "absolute",
            left: `${line.x}%`,
            top: `${line.y}%`,
            color: line.color,
            fontSize: `${line.size}px`,
            fontFamily: "'Fira Code', 'Courier New', monospace",
            opacity: line.opacity,
            whiteSpace: "nowrap",
            textShadow: `0 0 8px ${line.color}`,
            animation: "fadeOut 3s forwards",
            transform: "translate(-50%, -50%)",
          }}
        >
          {line.text}
        </div>
      ))}
    </div>
  );
}

function LoveParticle({ phrase, color, targetX, targetY, startX, startY, delay, fontSize }) {
  const style = {
    position: "absolute",
    left: "50%",
    top: "50%",
    color,
    fontSize: `${fontSize}px`,
    fontFamily: "'Pacifico', cursive",
    fontWeight: "bold",
    whiteSpace: "nowrap",
    textShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
    transform: `translate(calc(-50% + ${startX}px), calc(-50% + ${startY}px))`,
    animation: `flyToHeart 1.2s ${delay}s cubic-bezier(0.23, 1, 0.32, 1) forwards`,
    "--tx": `${targetX}px`,
    "--ty": `${targetY}px`,
    opacity: 0,
    userSelect: "none",
  };

  return <div style={style}>{phrase}</div>;
}

function HeartScene() {
  const heartPoints = generateHeartPoints(120);
  const particles = heartPoints.map((pt, i) => ({
    phrase: LOVE_PHRASES[i % LOVE_PHRASES.length],
    color: COLORS[i % COLORS.length],
    targetX: pt.x,
    targetY: pt.y,
    startX: (Math.random() - 0.5) * window.innerWidth * 0.9,
    startY: (Math.random() - 0.5) * window.innerHeight * 0.9,
    delay: Math.random() * 0.8,
    fontSize: 9 + Math.random() * 6,
  }));

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 10, background: "black", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Sparkle BG */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, #1a0020 0%, #000 70%)" }} />

      {/* Floating hearts BG */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          fontSize: `${10 + Math.random() * 20}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          opacity: 0.15,
          animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 3}s`,
          color: COLORS[i % COLORS.length],
        }}>♥</div>
      ))}

      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {particles.map((p, i) => (
          <LoveParticle key={i} {...p} />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [showHeart, setShowHeart] = useState(false);
  const [buttonGlitch, setButtonGlitch] = useState(false);

  const handleClick = useCallback(() => {
    setButtonGlitch(true);
    setTimeout(() => setShowHeart(true), 400);
  }, []);

  const handleBack = useCallback(() => {
    setShowHeart(false);
    setButtonGlitch(false);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;600&family=Pacifico&family=Share+Tech+Mono&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: black; overflow: hidden; }

        @keyframes fadeOut {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          70% { opacity: 0.6; }
          100% { opacity: 0; transform: translate(-50%, calc(-50% - 40px)) scale(0.8); }
        }

        @keyframes flyToHeart {
          0% { opacity: 0; transform: translate(calc(-50% + var(--sx, 0px)), calc(-50% + var(--sy, 0px))); }
          20% { opacity: 1; }
          100% { opacity: 1; transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 20px #ff2d55, 0 0 40px #ff2d5566; }
          50% { transform: scale(1.05); box-shadow: 0 0 30px #ff2d55, 0 0 60px #ff2d5599; }
        }

        @keyframes glitch {
          0% { transform: translate(0); filter: none; }
          20% { transform: translate(-4px, 2px); filter: hue-rotate(90deg); }
          40% { transform: translate(4px, -2px); filter: hue-rotate(180deg); }
          60% { transform: translate(-2px, 4px); filter: hue-rotate(270deg); }
          80% { transform: translate(2px, -4px); filter: hue-rotate(360deg); }
          100% { transform: translate(0); filter: none; }
        }

        @keyframes scanline {
          0% { top: -10%; }
          100% { top: 110%; }
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @keyframes titleGlow {
          0%, 100% { text-shadow: 0 0 10px #00ff41, 0 0 20px #00ff41; }
          50% { text-shadow: 0 0 20px #00ff41, 0 0 40px #00ff41, 0 0 60px #00ff41; }
        }

        .crt-line {
          position: fixed;
          left: 0;
          width: 100%;
          height: 3px;
          background: rgba(255,255,255,0.04);
          animation: scanline 6s linear infinite;
          pointer-events: none;
          z-index: 100;
        }

        .btn-main {
          background: transparent;
          border: 2px solid #ff2d55;
          color: #ff2d55;
          font-family: 'Fira Code', monospace;
          font-size: 16px;
          padding: 16px 40px;
          cursor: pointer;
          letter-spacing: 3px;
          text-transform: uppercase;
          position: relative;
          overflow: hidden;
          transition: all 0.3s;
          animation: pulse 2s ease-in-out infinite;
        }

        .btn-main::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,45,85,0.3), transparent);
          transition: 0.5s;
        }

        .btn-main:hover::before { left: 100%; }
        .btn-main:hover {
          background: rgba(255,45,85,0.15);
          box-shadow: 0 0 30px #ff2d55;
          animation: none;
          transform: scale(1.05);
        }

        .btn-main.glitching {
          animation: glitch 0.4s forwards;
        }

        .btn-back {
          position: fixed;
          top: 24px; left: 24px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.3);
          color: rgba(255,255,255,0.6);
          font-family: 'Fira Code', monospace;
          font-size: 12px;
          padding: 8px 20px;
          cursor: pointer;
          letter-spacing: 2px;
          z-index: 100;
          transition: all 0.3s;
        }

        .btn-back:hover {
          border-color: #ff2d55;
          color: #ff2d55;
          box-shadow: 0 0 15px #ff2d5566;
        }
      `}</style>

      {/* CRT scanline effect */}
      <div className="crt-line" />

      {!showHeart ? (
        <>
          <CodeRain />
          <FloatingCode />

          {/* Center overlay UI */}
          <div style={{
            position: "fixed", inset: 0, zIndex: 5,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 32,
          }}>
            {/* Terminal window */}
            <div style={{
              background: "rgba(0,0,0,0.85)",
              border: "1px solid #00ff4155",
              padding: "32px 48px",
              maxWidth: 560,
              width: "90%",
              backdropFilter: "blur(4px)",
              boxShadow: "0 0 40px rgba(0,255,65,0.1), inset 0 0 40px rgba(0,0,0,0.5)",
            }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                {["#ff5f57","#febc2e","#28c840"].map((c, i) => (
                  <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
                ))}
              </div>

              <div style={{
                fontFamily: "'Share Tech Mono', monospace",
                color: "#00ff41",
                fontSize: 13,
                lineHeight: 1.8,
                animation: "titleGlow 3s ease-in-out infinite",
              }}>
                <div style={{ color: "#4fc3f7" }}>$ <span style={{ color: "#a5d6a7" }}>node</span> message.js</div>
                <div style={{ marginTop: 8, color: "#888" }}>// compiling feelings...</div>
                <div style={{ color: "#ff9ff3" }}>{">"} dependencies resolved ✓</div>
                <div style={{ color: "#ff9ff3" }}>{">"} heart.js loaded ✓</div>
                <div style={{ color: "#ff9ff3" }}>{">"} love.module initialized ✓</div>
                <div style={{ marginTop: 8 }}>
                  <span style={{ color: "#feca57" }}>OUTPUT</span>
                  <span style={{ color: "#888" }}>:</span>{" "}
                  <span style={{ color: "#ff2d55" }}>
                    [ENCRYPTED — click to reveal]
                    <span style={{ animation: "blink 1s step-end infinite" }}>█</span>
                  </span>
                </div>
              </div>
            </div>

            <button
              className={`btn-main${buttonGlitch ? " glitching" : ""}`}
              onClick={handleClick}
            >
              ./run message.sh
            </button>

            <div style={{
              fontFamily: "'Fira Code', monospace",
              color: "rgba(255,255,255,0.2)",
              fontSize: 11,
              letterSpacing: 2,
            }}>
              WARNING: may cause feelings
            </div>
          </div>
        </>
      ) : (
        <>
          <HeartScene />
          <button className="btn-back" onClick={handleBack}>
            ← back
          </button>
        </>
      )}
    </>
  );
}
