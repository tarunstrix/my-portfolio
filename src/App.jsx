import { useState, useEffect, useRef } from "react";

const PROJECTS = [
  { id: "01", name: "E-Commerce Platform", cat: "Shopify", desc: "Custom Liquid theme with smart filters and conversion-optimized checkout flow. Delivered 85% revenue increase in 3 months.", tech: ["Shopify", "Liquid", "CSS", "JavaScript"], result: "+85% Revenue" },
  { id: "02", name: "SaaS Dashboard", cat: "React / Node.js", desc: "Real-time admin panel with analytics, role-based access, REST API integration and modular component system.", tech: ["React", "Node.js", "Tailwind", "REST API"], result: "200+ Users Day 1" },
  { id: "03", name: "Corporate Website", cat: "WordPress", desc: "Custom Gutenberg blocks, advanced SEO optimization, CMS integration and blazing performance scores.", tech: ["WordPress", "PHP", "Figma", "CSS"], result: "#1 Google Rank" },
  { id: "04", name: "Portfolio Builder", cat: "Webflow / JS", desc: "Drag-and-drop portfolio generator with live preview and one-click export for creative professionals.", tech: ["Webflow", "JavaScript", "Figma"], result: "500+ Users" },
  { id: "05", name: "Food Delivery App", cat: "React Native", desc: "Mobile app with real-time order tracking, integrated payment gateway and multi-vendor management panel.", tech: ["React", "Node.js", "Java", "MongoDB"], result: "4.9★ Rating" },
  { id: "06", name: "Real Estate Portal", cat: "React / PHP", desc: "Property platform with Google Maps, advanced search filters and automated lead capture system.", tech: ["React", "PHP", "MySQL", "Maps API"], result: "3× Lead Growth" },
];

const SKILLS = [
  { group: "Frontend", items: ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"] },
  { group: "Backend", items: ["Node.js", "PHP", "Java", "REST APIs", "MySQL"] },
  { group: "Platforms", items: ["WordPress", "Shopify", "Webflow"] },
  { group: "Design", items: ["Figma", "Photoshop", "Canva", "UI/UX Design"] },
];

function useInView(threshold = 0.08) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, vis];
}

function Reveal({ children, delay = 0, y = 24, style = {} }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : `translateY(${y}px)`, transition: `opacity .65s cubic-bezier(.16,1,.3,1) ${delay}s, transform .65s cubic-bezier(.16,1,.3,1) ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

// Gold palette
const G = "#B8860B";
const GL = "#D4A017";
const GD = "#8B6510";

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [hovered, setHovered] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", budget: "", msg: "" });
  const [sent, setSent] = useState(false);
  const fileRef = useRef(null);

  // Force full width
  useEffect(() => {
    document.body.style.cssText = "margin:0;padding:0;overflow-x:hidden;width:100%;";
    const root = document.getElementById("root");
    if (root) root.style.cssText = "width:100%;margin:0;padding:0;max-width:none;";
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPhoto(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const submit = () => {
    if (form.name && form.email && form.msg) {
      setSent(true);
      setForm({ name: "", email: "", budget: "", msg: "" });
      setTimeout(() => setSent(false), 5000);
    }
  };

  const NAV = ["home", "about", "skills", "projects", "contact"];

  return (
    <div style={{ width: "100vw", background: "#FAFAF8", color: "#1A1A14", fontFamily: "'Plus Jakarta Sans',sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Fraunces:opsz,wght@9..144,400;9..144,700;9..144,900&display=swap');
        html,body,#root{margin:0;padding:0;width:100%;overflow-x:hidden;}
        *{box-sizing:border-box;}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-track{background:#F0EDE6;}
        ::-webkit-scrollbar-thumb{background:${G};}

        .serif{font-family:'Fraunces',serif;}

        /* NAV */
        .nl{font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#6B6B5A;cursor:pointer;transition:color .25s;padding:4px 0;position:relative;}
        .nl::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1.5px;background:${G};transition:width .3s;}
        .nl:hover,.nl.on{color:${G};}
        .nl:hover::after,.nl.on::after{width:100%;}

        /* BUTTONS */
        .bg{display:inline-flex;align-items:center;gap:10px;padding:15px 36px;background:linear-gradient(135deg,${GL},${GD});color:#fff;font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;border:none;cursor:pointer;transition:all .3s;box-shadow:0 4px 20px rgba(184,134,11,.25);}
        .bg:hover{transform:translateY(-2px);box-shadow:0 12px 36px rgba(184,134,11,.35);}
        .bo{display:inline-flex;align-items:center;gap:10px;padding:14px 36px;background:transparent;color:${G};font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;border:1.5px solid ${G};cursor:pointer;transition:all .3s;}
        .bo:hover{background:rgba(184,134,11,.06);transform:translateY(-2px);}

        /* CARDS */
        .card{background:#fff;border:1px solid #E8E4DA;border-radius:8px;transition:all .3s;}
        .card:hover{border-color:rgba(184,134,11,.3);box-shadow:0 16px 48px rgba(0,0,0,.08);transform:translateY(-4px);}

        /* PROJECT ROW */
        .pr{display:grid;grid-template-columns:64px 1fr 160px;gap:28px;align-items:center;padding:26px 32px;background:#fff;border:1px solid #E8E4DA;border-left:3px solid transparent;transition:all .3s;margin-bottom:4px;border-radius:6px;}
        .pr:hover{border-left-color:${G};box-shadow:0 8px 32px rgba(0,0,0,.07);transform:translateX(4px);}

        /* SKILL ITEM */
        .si{display:flex;align-items:center;gap:12px;padding:11px 14px;background:#F5F2EB;border:1px solid #EAE6DB;border-radius:5px;transition:all .25s;}
        .si:hover{background:rgba(184,134,11,.08);border-color:rgba(184,134,11,.3);}

        /* PILL */
        .pill{display:inline-block;background:rgba(184,134,11,.1);border:1px solid rgba(184,134,11,.25);color:${G};font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:5px 14px;border-radius:4px;}

        /* INPUT */
        .fi{width:100%;background:#fff;border:1.5px solid #E0DCD2;color:#1A1A14;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:400;padding:16px 20px;outline:none;transition:border-color .3s;border-radius:6px;display:block;}
        .fi:focus{border-color:${G};}
        .fi::placeholder{color:#B0ADA4;}

        /* CONTACT INFO */
        .ci{display:flex;align-items:center;gap:16px;padding:20px 24px;background:#fff;border:1px solid #E8E4DA;border-radius:8px;margin-bottom:12px;transition:all .3s;}
        .ci:hover{border-color:rgba(184,134,11,.3);box-shadow:0 4px 20px rgba(0,0,0,.06);}

        /* TAG */
        .tg{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#9A9585;}

        /* MARQUEE */
        @keyframes mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .mq{display:flex;animation:mq 28s linear infinite;white-space:nowrap;}

        /* FLOAT */
        @keyframes fl{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        .fl{animation:fl 5s ease-in-out infinite;}

        /* BLINK */
        @keyframes bl{0%,100%{opacity:1}50%{opacity:.3}}
        .bl{animation:bl 2s ease-in-out infinite;}

        /* ROTATE */
        @keyframes rr{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}

        /* PHOTO UPLOAD */
        .pu{width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;border:2px dashed rgba(184,134,11,.3);border-radius:50%;transition:all .3s;}
        .pu:hover{border-color:${G};background:rgba(184,134,11,.04);}

        /* SECTION DIVIDER */
        .sdiv{width:100%;height:1px;background:linear-gradient(90deg,transparent,#E0DCD2,transparent);margin-bottom:80px;}

        /* LABEL */
        .lbl{display:inline-flex;align-items:center;gap:10px;font-size:10px;font-weight:800;letter-spacing:4px;text-transform:uppercase;color:${G};margin-bottom:16px;}
        .lbl::before{content:'';width:24px;height:1.5px;background:${G};}

        @media(max-width:900px){
          .hgrid{grid-template-columns:1fr !important;}
          .tgrid{grid-template-columns:1fr !important;}
          .sgrid{grid-template-columns:1fr 1fr !important;}
          .pr{grid-template-columns:48px 1fr !important;}
          .prcol{display:none !important;}
          nav{padding:0 24px !important;}
          .sec{padding:72px 24px !important;}
        }
      `}</style>

      {/* ══════════════════ NAV ══════════════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 999, height: 66,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 6vw",
        background: scrolled ? "rgba(250,250,248,.97)" : "rgba(250,250,248,.8)",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid #E8E4DA" : "1px solid transparent",
        transition: "all .4s",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => go("home")}>
          <div style={{ width: 40, height: 40, background: `linear-gradient(135deg,${GL},${GD})`, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, boxShadow: `0 4px 14px rgba(184,134,11,.3)` }}>
            <span style={{ fontFamily: "'Fraunces',serif", fontWeight: 900, fontSize: 20, color: "#fff" }}>T</span>
          </div>
          <div>
            <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: 15, color: "#1A1A14", lineHeight: 1.1 }}>Tarun Kumar</div>
            <div style={{ fontSize: 9, letterSpacing: 2.5, color: "#B0ADA4", textTransform: "uppercase" }}>Full-Stack Developer</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 36 }}>
          {NAV.map(n => <span key={n} className={`nl${active === n ? " on" : ""}`} onClick={() => go(n)}>{n}</span>)}
        </div>

        <button className="bg" style={{ padding: "11px 24px", fontSize: 10 }} onClick={() => go("contact")}>Hire Me</button>
      </nav>

      {/* ══════════════════ HERO ══════════════════ */}
      <section id="home" className="sec" style={{ width: "100%", minHeight: "100vh", display: "flex", alignItems: "center", padding: "66px 6vw 60px", position: "relative", overflow: "hidden", background: "#FAFAF8" }}>
        {/* Subtle background */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 70% 40%, rgba(184,134,11,.06) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(184,134,11,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(184,134,11,.04) 1px,transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
        {/* Top gold bar */}
        <div style={{ position: "absolute", top: 66, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${G},${GL},${G})`, opacity: .4 }} />

        <div style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 400px", gap: "6vw", alignItems: "center", position: "relative", zIndex: 1 }} className="hgrid">
          {/* LEFT */}
          <div>
            <Reveal>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(184,134,11,.08)", border: "1.5px solid rgba(184,134,11,.2)", padding: "9px 18px", borderRadius: 100, marginBottom: 32 }}>
                <div className="bl" style={{ width: 7, height: 7, borderRadius: "50%", background: "#22C55E" }} />
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", color: G }}>Available for New Projects</span>
              </div>
            </Reveal>

            <Reveal delay={0.07}>
              <div style={{ fontSize: "clamp(11px,1.1vw,13px)", fontWeight: 600, letterSpacing: 5, color: "#B0ADA4", textTransform: "uppercase", marginBottom: 16 }}>Full-Stack Developer & UI Designer</div>
              <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(48px,6vw,88px)", fontWeight: 900, lineHeight: .96, marginBottom: 24, color: "#1A1A14", letterSpacing: "-1.5px" }}>
                <span style={{ background: `linear-gradient(135deg,${GL} 0%,${G} 50%,${GD} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Tarun</span>
                <br />Kumar
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                <div style={{ height: 2, width: 40, background: `linear-gradient(90deg,${G},transparent)` }} />
                <span style={{ fontSize: 11, letterSpacing: 3, color: "#C0BDB4", textTransform: "uppercase", fontWeight: 600 }}>Est. 2018</span>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <p style={{ fontSize: 17, fontWeight: 400, color: "#4A4A3A", lineHeight: 1.85, maxWidth: 560, marginBottom: 40 }}>
                I craft <strong style={{ color: "#1A1A14", fontWeight: 700 }}>premium web experiences</strong> that attract clients and drive revenue — from <strong style={{ color: G, fontWeight: 600 }}>high-converting React apps</strong> to powerful Shopify stores and WordPress solutions. 6+ years, 50+ projects, zero compromises.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 56 }}>
                <button className="bg" onClick={() => go("projects")}>View My Work →</button>
                <button className="bo" onClick={() => go("contact")}>Let's Talk</button>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div style={{ borderTop: "1.5px solid #E8E4DA", paddingTop: 36, display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
                {[["6+", "Years Experience"], ["50+", "Projects Done"], ["30+", "Happy Clients"]].map(([n, l], i) => (
                  <div key={l} style={{ paddingRight: 28, borderRight: i < 2 ? "1.5px solid #E8E4DA" : "none", paddingLeft: i > 0 ? 28 : 0 }}>
                    <div style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(36px,3.5vw,52px)", fontWeight: 900, lineHeight: 1, background: `linear-gradient(135deg,${GL},${G})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{n}</div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "#9A9585", letterSpacing: 1.5, textTransform: "uppercase", marginTop: 6 }}>{l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* RIGHT — Photo Card */}
          <Reveal delay={0.14} y={40}>
            <div className="fl" style={{ position: "relative" }}>
              <div style={{ background: "#fff", border: "1px solid #E8E4DA", borderRadius: 16, padding: 36, boxShadow: "0 24px 80px rgba(0,0,0,.1)", position: "relative", overflow: "hidden" }}>
                {/* Gold top accent */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg,${G},${GL},${G})` }} />

                {/* Photo / Avatar area */}
                <div style={{ position: "relative", width: 160, height: 160, margin: "16px auto 24px" }}>
                  {/* Rotating ring */}
                  <div style={{ position: "absolute", inset: -8, border: `1.5px solid rgba(184,134,11,.25)`, borderRadius: "50%", animation: "rr 16s linear infinite" }}>
                    <div style={{ position: "absolute", top: -5, left: "50%", transform: "translateX(-50%)", width: 10, height: 10, borderRadius: "50%", background: G, boxShadow: `0 0 10px ${G}` }} />
                  </div>

                  {photo ? (
                    <img src={photo} alt="Tarun Kumar" style={{ width: 160, height: 160, borderRadius: "50%", objectFit: "cover", border: `3px solid ${G}`, cursor: "pointer" }} onClick={() => fileRef.current?.click()} />
                  ) : (
                    <div className="pu" onClick={() => fileRef.current?.click()} style={{ width: 160, height: 160 }}>
                      <div style={{ fontSize: 32, marginBottom: 8 }}>📷</div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: G, letterSpacing: 1, textAlign: "center", lineHeight: 1.4 }}>Upload<br />Your Photo</div>
                    </div>
                  )}
                  <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhoto} />
                </div>

                <div style={{ textAlign: "center", marginBottom: 24 }}>
                  <div style={{ fontFamily: "'Fraunces',serif", fontSize: 22, fontWeight: 700, color: "#1A1A14", marginBottom: 5 }}>Tarun Kumar</div>
                  <div style={{ fontSize: 10, letterSpacing: 3.5, textTransform: "uppercase", color: G, fontWeight: 700 }}>Full-Stack Developer</div>
                </div>

                <div style={{ height: 1, background: "linear-gradient(90deg,transparent,#E8E4DA,transparent)", marginBottom: 20 }} />

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {["React", "Node.js", "WordPress", "Shopify", "Figma", "PHP"].map(t => (
                    <div key={t} style={{ background: "#F5F2EB", border: "1px solid #E8E4DA", padding: "9px 12px", textAlign: "center", fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "#5A5540", borderRadius: 5 }}>{t}</div>
                  ))}
                </div>

                {photo && (
                  <button onClick={() => fileRef.current?.click()} style={{ marginTop: 16, width: "100%", padding: "10px", background: "rgba(184,134,11,.08)", border: "1px dashed rgba(184,134,11,.3)", color: G, fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer", borderRadius: 6 }}>
                    Change Photo
                  </button>
                )}
              </div>

              {/* Floating badges */}
              <div style={{ position: "absolute", top: -14, right: -22, background: "#fff", border: `1px solid rgba(184,134,11,.3)`, borderRadius: 8, padding: "9px 16px", fontSize: 12, fontWeight: 700, color: G, whiteSpace: "nowrap", boxShadow: "0 8px 32px rgba(0,0,0,.12)" }}>⚡ React Expert</div>
              <div style={{ position: "absolute", bottom: 48, left: -28, background: "#fff", border: `1px solid rgba(184,134,11,.3)`, borderRadius: 8, padding: "9px 16px", fontSize: 12, fontWeight: 700, color: G, whiteSpace: "nowrap", boxShadow: "0 8px 32px rgba(0,0,0,.12)" }}>🎨 UI/UX Pro</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ background: "#F0EDE4", borderTop: "1px solid #E8E4DA", borderBottom: "1px solid #E8E4DA", padding: "14px 0", overflow: "hidden" }}>
        <div className="mq">
          {[...Array(2)].map((_, ri) => (
            <div key={ri} style={{ display: "flex" }}>
              {["React", "Node.js", "WordPress", "Shopify", "Webflow", "Figma", "PHP", "Java", "Tailwind", "MongoDB", "MySQL", "REST APIs", "UI/UX", "Photoshop", "JavaScript"].map((t, i) => (
                <span key={i} style={{ padding: "0 26px", fontSize: 10, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", color: i % 4 === 0 ? G : "#C0BDB4", borderRight: "1px solid #E8E4DA", whiteSpace: "nowrap" }}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════ ABOUT ══════════════════ */}
      <section id="about" className="sec" style={{ width: "100%", padding: "110px 6vw", background: "#fff" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7vw", alignItems: "center" }} className="tgrid">
          {/* LEFT */}
          <Reveal>
            <div style={{ position: "relative" }}>
              {/* Big decorative number */}
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: 200, fontWeight: 900, color: "rgba(184,134,11,.05)", lineHeight: 1, pointerEvents: "none", userSelect: "none", position: "absolute", top: -40, left: -20 }}>6</div>
              <div style={{ position: "relative", zIndex: 1 }}>
                {/* Timeline card */}
                <div style={{ background: "#FAFAF8", border: "1px solid #E8E4DA", borderRadius: 10, padding: "32px 28px", marginBottom: 16, borderLeft: `3px solid ${G}` }}>
                  <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", color: G, marginBottom: 20, paddingBottom: 14, borderBottom: "1px solid #E8E4DA" }}>Career Timeline</div>
                  {[["2018", "Started freelancing in web development"], ["2020", "Mastered React & Node.js full-stack"], ["2021", "Expanded to Shopify & WordPress"], ["2023", "50+ projects delivered globally"], ["2024", "Advanced UI/UX & Webflow expertise"]].map(([y, t], i, arr) => (
                    <div key={y} style={{ display: "flex", gap: 18, paddingBottom: i < arr.length - 1 ? 14 : 0, marginBottom: i < arr.length - 1 ? 14 : 0, borderBottom: i < arr.length - 1 ? "1px solid #F0EDE6" : "none" }}>
                      <div style={{ fontSize: 11, fontWeight: 800, color: G, minWidth: 34, letterSpacing: .5 }}>{y}</div>
                      <div style={{ fontSize: 13, color: "#5A5A48", lineHeight: 1.6, fontWeight: 500 }}>{t}</div>
                    </div>
                  ))}
                </div>
                {/* Mini value cards */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {[["⚡", "Fast Delivery", "On time, every time"], ["🎯", "Results Driven", "ROI-focused work"], ["🔍", "SEO Expert", "Built to rank"], ["📱", "Mobile-First", "Works everywhere"]].map(([ic, title, sub]) => (
                    <div key={title} style={{ background: "#FAFAF8", border: "1px solid #E8E4DA", padding: "18px 16px", borderRadius: 8, transition: "all .3s" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = `rgba(184,134,11,.3)`; e.currentTarget.style.background = "rgba(184,134,11,.04)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "#E8E4DA"; e.currentTarget.style.background = "#FAFAF8"; }}>
                      <div style={{ fontSize: 22, marginBottom: 8 }}>{ic}</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#1A1A14", marginBottom: 2 }}>{title}</div>
                      <div style={{ fontSize: 11, color: "#9A9585" }}>{sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* RIGHT */}
          <Reveal delay={0.1}>
            <div className="lbl">About Me</div>
            <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(30px,3.2vw,48px)", fontWeight: 900, lineHeight: 1.1, color: "#1A1A14", marginBottom: 20 }}>
              Turning bold ideas into<br /><span style={{ background: `linear-gradient(135deg,${GL},${G})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>digital gold</span>
            </h2>
            <div style={{ width: 44, height: 2.5, background: `linear-gradient(90deg,${G},transparent)`, marginBottom: 28 }} />
            <p style={{ fontSize: 16, fontWeight: 400, color: "#4A4A3A", lineHeight: 1.9, marginBottom: 18 }}>
              I'm a <strong style={{ color: "#1A1A14", fontWeight: 700 }}>Full-Stack Developer & UI/UX Designer</strong> with 6+ years building high-performance web solutions for clients across e-commerce, SaaS, real estate and creative industries worldwide.
            </p>
            <p style={{ fontSize: 16, fontWeight: 400, color: "#4A4A3A", lineHeight: 1.9, marginBottom: 18 }}>
              My approach blends clean, scalable code with thoughtful design — whether that's a pixel-perfect React app, a revenue-generating Shopify store, or a powerful WordPress platform. I don't just build websites; I <strong style={{ color: G, fontWeight: 600 }}>build tools that grow businesses</strong>.
            </p>
            <p style={{ fontSize: 16, fontWeight: 400, color: "#4A4A3A", lineHeight: 1.9, marginBottom: 40 }}>
              Every project gets my full creative and technical attention — resulting in premium, trustworthy products that convert visitors into loyal clients.
            </p>
            <div style={{ display: "flex", gap: 14 }}>
              <button className="bg" onClick={() => go("projects")}>See Projects</button>
              <button className="bo" onClick={() => go("contact")}>Work With Me</button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════ SKILLS ══════════════════ */}
      <section id="skills" className="sec" style={{ width: "100%", padding: "110px 6vw", background: "#FAFAF8" }}>
        <div className="sdiv" />
        <Reveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 20 }}>
            <div>
              <div className="lbl">Expertise</div>
              <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(30px,3.5vw,52px)", fontWeight: 900, color: "#1A1A14", lineHeight: 1.05 }}>
                Skills &<br /><span style={{ background: `linear-gradient(135deg,${GL},${G})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Technologies</span>
              </h2>
            </div>
            <p style={{ fontSize: 15, color: "#6A6A58", maxWidth: 340, lineHeight: 1.8, fontWeight: 400 }}>A full-stack arsenal covering frontend finesse, backend power, CMS platforms and design tools.</p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }} className="sgrid">
          {SKILLS.map((sg, gi) => (
            <Reveal key={sg.group} delay={gi * 0.07}>
              <div style={{ background: "#fff", border: "1px solid #E8E4DA", borderRadius: 10, padding: 28, borderTop: `3px solid ${G}`, boxShadow: "0 2px 12px rgba(0,0,0,.04)", transition: "all .3s" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 12px 36px rgba(0,0,0,.1)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,.04)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", color: G, marginBottom: 20, paddingBottom: 14, borderBottom: "1px solid #F0EDE6" }}>{sg.group}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {sg.items.map(item => (
                    <div key={item} className="si">
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: G, flexShrink: 0 }} />
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#2A2A1E" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div style={{ marginTop: 48, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}>
            {["React", "Node.js", "WordPress", "Shopify", "Webflow", "Figma", "PHP", "Java", "Tailwind", "MongoDB", "MySQL"].map(t => (
              <span key={t} className="pill">{t}</span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ══════════════════ PROJECTS ══════════════════ */}
      <section id="projects" className="sec" style={{ width: "100%", padding: "110px 6vw", background: "#fff" }}>
        <div className="sdiv" />
        <Reveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 52, flexWrap: "wrap", gap: 20 }}>
            <div>
              <div className="lbl">Portfolio</div>
              <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(30px,3.5vw,52px)", fontWeight: 900, color: "#1A1A14", lineHeight: 1.05 }}>
                Selected<br /><span style={{ background: `linear-gradient(135deg,${GL},${G})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Work & Projects</span>
              </h2>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: 52, fontWeight: 900, color: "rgba(184,134,11,.15)", lineHeight: 1 }}>50+</div>
              <div style={{ fontSize: 11, color: "#B0ADA4", letterSpacing: 2, textTransform: "uppercase", fontWeight: 700 }}>Projects Delivered</div>
            </div>
          </div>
        </Reveal>

        <div style={{ borderTop: "1.5px solid #E8E4DA" }}>
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <div className="pr" onMouseEnter={() => setHovered(p.id)} onMouseLeave={() => setHovered(null)}>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: 38, fontWeight: 900, color: hovered === p.id ? `rgba(184,134,11,.35)` : "#EAE6DB", transition: "color .3s", lineHeight: 1 }}>{p.id}</div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 7 }}>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: "#1A1A14" }}>{p.name}</h3>
                    <span className="pill" style={{ padding: "3px 12px", fontSize: 9 }}>{p.cat}</span>
                  </div>
                  <p style={{ fontSize: 14, color: "#6A6A58", lineHeight: 1.7, marginBottom: 10, maxWidth: 560, fontWeight: 400 }}>{p.desc}</p>
                  <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                    {p.tech.map(t => <span key={t} className="tg">{t}</span>)}
                  </div>
                </div>
                <div className="prcol" style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: G, marginBottom: 10 }}>{p.result}</div>
                  <a href="#" style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: hovered === p.id ? G : "#B0ADA4", textDecoration: "none", display: "flex", alignItems: "center", gap: 6, justifyContent: "flex-end", transition: "color .3s" }}>
                    View <span style={{ transition: "transform .3s", transform: hovered === p.id ? "translateX(4px)" : "translateX(0)", display: "inline-block" }}>→</span>
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Case Studies */}
        <Reveal>
          <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: 34, fontWeight: 900, color: "#1A1A14", marginTop: 72, marginBottom: 28 }}>
            Case <span style={{ background: `linear-gradient(135deg,${GL},${G})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Studies</span>
          </h3>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="tgrid">
          {[
            { title: "E-Commerce Redesign", sub: "Case Study 01", rows: [["Problem", "70% cart abandonment, poor mobile UX, dated Shopify design."], ["Solution", "Full theme rebuild — streamlined checkout, mobile-first, trust signals."], ["Process", "Research → Figma → Custom Liquid → A/B Test → Launch"], ["Outcome", "Cart abandonment −32%, mobile conversions +120%, revenue +85% in 90 days."]] },
            { title: "SaaS Dashboard MVP", sub: "Case Study 02", rows: [["Problem", "Startup needed a scalable admin panel built in just 6 weeks."], ["Solution", "Modular React dashboard with component library & full REST API."], ["Process", "Sprints → Component lib → API integration → QA → Vercel deploy"], ["Outcome", "Delivered in 5 weeks. 200+ users on day one. Series A funding secured."]] },
          ].map((cs, i) => (
            <Reveal key={cs.title} delay={i * 0.08}>
              <div style={{ background: "#FAFAF8", border: "1px solid #E8E4DA", borderRadius: 10, padding: 36, borderTop: `3px solid ${G}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, paddingBottom: 18, borderBottom: "1px solid #E8E4DA" }}>
                  <div style={{ fontFamily: "'Fraunces',serif", fontSize: 19, fontWeight: 700, color: "#1A1A14" }}>{cs.title}</div>
                  <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 2, color: G, opacity: .6, textTransform: "uppercase" }}>{cs.sub}</div>
                </div>
                {cs.rows.map(([label, text]) => (
                  <div key={label} style={{ display: "grid", gridTemplateColumns: "84px 1fr", gap: 16, paddingBottom: 14, marginBottom: 14, borderBottom: "1px solid #F0EDE6" }}>
                    <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: G, opacity: .8, paddingTop: 2 }}>{label}</div>
                    <div style={{ fontSize: 14, color: "#5A5A48", lineHeight: 1.75, fontWeight: 400 }}>{text}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════ CONTACT ══════════════════ */}
      <section id="contact" className="sec" style={{ width: "100%", padding: "110px 6vw", background: "#FAFAF8" }}>
        <div className="sdiv" />
        <Reveal>
          <div style={{ textAlign: "center", maxWidth: 580, margin: "0 auto 72px" }}>
            <div className="lbl" style={{ justifyContent: "center" }}>Get In Touch</div>
            <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(34px,4.5vw,64px)", fontWeight: 900, color: "#1A1A14", lineHeight: .96, marginBottom: 18 }}>
              Ready to build<br /><span style={{ background: `linear-gradient(135deg,${GL},${G})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>something great?</span>
            </h2>
            <p style={{ fontSize: 16, color: "#6A6A58", lineHeight: 1.85, fontWeight: 400 }}>Have a project in mind? I'd love to hear about it. I reply within 24 hours and love working on ambitious ideas.</p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 40, maxWidth: 1060, margin: "0 auto" }} className="tgrid">
          {/* Info */}
          <Reveal>
            <div>
              {[["✉️", "Email", "tarun@email.com"], ["📞", "Phone", "+91 98765 43210"], ["📍", "Location", "India · Remote Worldwide"]].map(([ic, lbl, val]) => (
                <div key={lbl} className="ci">
                  <div style={{ width: 46, height: 46, background: `rgba(184,134,11,.1)`, border: `1px solid rgba(184,134,11,.2)`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{ic}</div>
                  <div>
                    <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 2.5, textTransform: "uppercase", color: "#B0ADA4", marginBottom: 3 }}>{lbl}</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#2A2A1E" }}>{val}</div>
                  </div>
                </div>
              ))}

              <div style={{ marginTop: 28, paddingTop: 24, borderTop: "1px solid #E8E4DA" }}>
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", color: "#B0ADA4", marginBottom: 12 }}>Connect With Me</div>
                <div style={{ display: "flex", gap: 10 }}>
                  {[["Upwork", "#6FDA44"], ["LinkedIn", "#0A66C2"], ["Facebook", "#1877F2"]].map(([name, color]) => (
                    <a key={name} href="#" style={{ padding: "11px 18px", fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", border: `1.5px solid ${color}33`, color, textDecoration: "none", background: `${color}08`, borderRadius: 6, transition: "all .3s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = `${color}18`; e.currentTarget.style.borderColor = `${color}66`; }}
                      onMouseLeave={e => { e.currentTarget.style.background = `${color}08`; e.currentTarget.style.borderColor = `${color}33`; }}>
                      {name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <div style={{ background: "#fff", border: "1px solid #E8E4DA", borderRadius: 12, padding: 40, borderTop: `3px solid ${G}`, boxShadow: "0 8px 40px rgba(0,0,0,.07)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                <input className="fi" placeholder="Your Name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                <input className="fi" placeholder="Email Address" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
              </div>
              <input className="fi" placeholder="Project Budget (e.g. $500 – $2000)" value={form.budget} onChange={e => setForm(p => ({ ...p, budget: e.target.value }))} style={{ marginBottom: 14 }} />
              <textarea className="fi" placeholder="Describe your project — goals, timeline, and requirements..." value={form.msg} onChange={e => setForm(p => ({ ...p, msg: e.target.value }))} style={{ resize: "vertical", minHeight: 130, marginBottom: 20 }} />
              <button className="bg" style={{ width: "100%", justifyContent: "center", letterSpacing: 2.5, fontSize: 11 }} onClick={submit}>
                {sent ? "✅ Sent! I'll reply within 24 hours" : "Send Message →"}
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════ FOOTER ══════════════════ */}
      <footer style={{ width: "100%", background: "#1A1A14", padding: "36px 6vw", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => go("home")}>
          <div style={{ width: 36, height: 36, background: `linear-gradient(135deg,${GL},${GD})`, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 7 }}>
            <span style={{ fontFamily: "'Fraunces',serif", fontWeight: 900, fontSize: 17, color: "#fff" }}>T</span>
          </div>
          <div>
            <div style={{ fontFamily: "'Fraunces',serif", fontSize: 14, fontWeight: 700, color: "#F0EAD6" }}>Tarun Kumar</div>
            <div style={{ fontSize: 9, letterSpacing: 2.5, color: "#5A5A48", textTransform: "uppercase" }}>Full-Stack Developer</div>
          </div>
        </div>
        <div style={{ fontSize: 12, color: "#3A3A2E" }}>© 2024 Tarun Kumar · All rights reserved</div>
        <div style={{ display: "flex", gap: 28 }}>
          {NAV.map(n => (
            <span key={n} onClick={() => go(n)} style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", color: "#3A3A2E", cursor: "pointer", transition: "color .25s" }}
              onMouseEnter={e => e.target.style.color = G} onMouseLeave={e => e.target.style.color = "#3A3A2E"}>{n}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}