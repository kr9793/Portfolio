/**
 * ═══════════════════════════════════════════════════════════════════════════════
 *  TEMPORAL GNN THREAT MESH & NEURAL RECONSTRUCTION ENGINE
 *  Bespoke Interactive Visual Architecture for Rohan Kushwaha
 *  Cybersecurity Researcher · AI Systems Architect · Game Developer
 * ═══════════════════════════════════════════════════════════════════════════════
 *  Visualizes:
 *  - Dynamic Spatio-Temporal Graph Ingress (GraphSAGE + GRU)
 *  - NetFlow Packet Streams (68,480 pkts/s)
 *  - Counterfactual Botnet Threat Attribution (#FF2D95 vs #007BA7)
 *  - Holographic Laser DOM Card Scanning & Verification Reticles
 *  - Autonomous Auto-Tour & Seamless Live Convergence Transition
 *  - Ambient Interactive Background Graph (Mouse attraction & ripple physics)
 * ═══════════════════════════════════════════════════════════════════════════════
 */

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // COLOR PALETTE (Theme Tokens)
  // ---------------------------------------------------------------------------
  const CERULEAN = '#007BA7';
  const CERULEAN_BRIGHT = '#00E5FF';
  const MAGENTA = '#FF2D95';
  const MAGENTA_BRIGHT = '#FF5DAA';
  const VOID = '#0A0A0A';

  // ---------------------------------------------------------------------------
  // AUDIO SYNTHESIZER (Web Audio API - Zero External Dependencies)
  // ---------------------------------------------------------------------------
  class CyberAudio {
    constructor() {
      this.ctx = null;
      this.enabled = false;
      this.master = null;
      this.droneOsc = null;
      this.droneGain = null;
    }

    init() {
      if (this.ctx) return;
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        this.ctx = new AudioCtx();
        this.master = this.ctx.createGain();
        this.master.gain.value = 0.15;
        this.master.connect(this.ctx.destination);
      } catch (_) {}
    }

    resume() {
      if (!this.ctx) this.init();
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    }

    toggle() {
      this.resume();
      this.enabled = !this.enabled;
      if (this.enabled) {
        this.startDrone();
        this.packetChirp(520);
      } else {
        this.stopDrone();
      }
      return this.enabled;
    }

    startDrone() {
      if (!this.enabled || !this.ctx || this.droneOsc) return;
      try {
        const t = this.ctx.currentTime;
        this.droneOsc = this.ctx.createOscillator();
        this.droneGain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        this.droneOsc.type = 'sawtooth';
        this.droneOsc.frequency.setValueAtTime(55, t); // Deep A1 drone

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(140, t);

        this.droneGain.gain.setValueAtTime(0.001, t);
        this.droneGain.gain.exponentialRampToValueAtTime(0.04, t + 1.2);

        this.droneOsc.connect(filter);
        filter.connect(this.droneGain);
        this.droneGain.connect(this.master);
        this.droneOsc.start();
      } catch (_) {}
    }

    stopDrone() {
      if (!this.droneOsc || !this.ctx) return;
      try {
        const t = this.ctx.currentTime;
        this.droneGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
        setTimeout(() => {
          if (this.droneOsc) {
            try { this.droneOsc.stop(); } catch (_) {}
            this.droneOsc = null;
            this.droneGain = null;
          }
        }, 450);
      } catch (_) {}
    }

    packetChirp(freq = 780) {
      if (!this.enabled || !this.ctx) return;
      try {
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.8, t + 0.05);

        gain.gain.setValueAtTime(0.03, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

        osc.connect(gain);
        gain.connect(this.master);
        osc.start(t);
        osc.stop(t + 0.07);
      } catch (_) {}
    }

    scanLaser() {
      if (!this.enabled || !this.ctx) return;
      try {
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, t);
        osc.frequency.linearRampToValueAtTime(960, t + 0.18);

        gain.gain.setValueAtTime(0.05, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

        osc.connect(gain);
        gain.connect(this.master);
        osc.start(t);
        osc.stop(t + 0.23);
      } catch (_) {}
    }

    finaleChord() {
      if (!this.enabled || !this.ctx) return;
      try {
        const t = this.ctx.currentTime;
        const notes = [220, 277.18, 329.63, 440, 554.37, 659.25]; // A Major cinematic resonance
        notes.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, t);

          gain.gain.setValueAtTime(0.001, t);
          gain.gain.exponentialRampToValueAtTime(0.04 / notes.length, t + 0.1 + idx * 0.04);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.8);

          osc.connect(gain);
          gain.connect(this.master);
          osc.start(t + idx * 0.04);
          osc.stop(t + 2.0);
        });
      } catch (_) {}
    }
  }

  // ---------------------------------------------------------------------------
  // GNN TOPOLOGY GRAPH SIMULATION
  // ---------------------------------------------------------------------------
  class GnnGraph {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.nodes = [];
      this.edges = [];
      this.packets = [];
      this.mouse = { x: -1000, y: -1000, active: false };
      this.convergence = 0; // 0 to 1
      this.isolatedThreats = false;
      this.ambientMode = false;
      this.telemetryTicks = 0;

      this.initTopology();
    }

    resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = Math.floor(this.width * dpr);
      this.canvas.height = Math.floor(this.height * dpr);
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    initTopology() {
      this.resize();
      const nodeCount = Math.min(52, Math.max(28, Math.floor(this.width / 32)));
      this.nodes = [];
      this.edges = [];
      this.packets = [];

      const formulas = [
        'h_v=σ(W·AGG)',
        'GRU(h_t,h_t-1)',
        'CIC-MalMem-XAI',
        'EWMA(λ=0.05)',
        'MerkleVault[OK]',
        'FastPath:0.08µs',
        'NetFlow:68k/s',
        'GraphSAGE-L2',
        'Aegis-SOC',
        'Wilson-95%CI',
        'Havok-Recoil'
      ];

      for (let i = 0; i < nodeCount; i++) {
        // 20% are threat nodes (Botnets in Cyber Magenta), 80% are defense nodes (Cerulean)
        const isThreat = Math.random() < 0.22;
        const isHub = i % 7 === 0;
        this.nodes.push({
          id: i,
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          baseRadius: isHub ? 4.5 : isThreat ? 3.5 : 2.5,
          radius: isHub ? 4.5 : isThreat ? 3.5 : 2.5,
          isThreat,
          isHub,
          pulse: Math.random() * Math.PI * 2,
          color: isThreat ? MAGENTA : isHub ? CERULEAN_BRIGHT : CERULEAN,
          label: isHub ? formulas[i % formulas.length] : null,
          quarantined: false
        });
      }

      // Build Graph Edges based on proximity threshold
      this.rebuildEdges();
    }

    rebuildEdges() {
      this.edges = [];
      const threshold = Math.min(180, this.width * 0.22);
      for (let i = 0; i < this.nodes.length; i++) {
        for (let j = i + 1; j < this.nodes.length; j++) {
          const a = this.nodes[i];
          const b = this.nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < threshold) {
            this.edges.push({
              source: a,
              target: b,
              dist,
              weight: Math.min(1, Math.max(0.2, 1 - dist / threshold))
            });
          }
        }
      }
    }

    spawnPacket(source, target) {
      if (this.packets.length > 45) return;
      this.packets.push({
        source,
        target,
        progress: 0,
        speed: 0.015 + Math.random() * 0.025,
        color: source.isThreat ? MAGENTA_BRIGHT : CERULEAN_BRIGHT,
        size: source.isThreat ? 2.8 : 2.0
      });
    }

    update(dt, audio) {
      this.telemetryTicks++;

      // Force-directed gentle physics
      for (const n of this.nodes) {
        n.x += n.vx;
        n.y += n.vy;

        // Bounce gently inside canvas bounds
        if (n.x < 20) { n.x = 20; n.vx *= -1; }
        if (n.x > this.width - 20) { n.x = this.width - 20; n.vx *= -1; }
        if (n.y < 20) { n.y = 20; n.vy *= -1; }
        if (n.y > this.height - 20) { n.y = this.height - 20; n.vy *= -1; }

        n.pulse += dt * 3.0;

        // Mouse attraction in ambient mode
        if (this.mouse.active) {
          const dx = this.mouse.x - n.x;
          const dy = this.mouse.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180 && dist > 1) {
            const force = (180 - dist) / 180 * 0.4;
            n.vx += (dx / dist) * force;
            n.vy += (dy / dist) * force;
          }
        }

        // Apply friction
        n.vx *= 0.985;
        n.vy *= 0.985;
      }

      // Randomly inject NetFlow packets along existing edges
      if (Math.random() < 0.35 && this.edges.length > 0) {
        const edge = this.edges[Math.floor(Math.random() * this.edges.length)];
        this.spawnPacket(edge.source, edge.target);
        if (audio && Math.random() < 0.08) {
          audio.packetChirp(edge.source.isThreat ? 440 : 880);
        }
      }

      // Step Packets
      for (let i = this.packets.length - 1; i >= 0; i--) {
        const p = this.packets[i];
        p.progress += p.speed;
        if (p.progress >= 1.0) {
          // Packet arrived at destination node
          p.target.radius = p.target.baseRadius * 1.8;
          this.packets.splice(i, 1);
        }
      }

      // Recover node radius back to base
      for (const n of this.nodes) {
        if (n.radius > n.baseRadius) {
          n.radius += (n.baseRadius - n.radius) * 0.1;
        }
      }

      // Threat quarantine effect when convergence completes
      if (this.isolatedThreats) {
        for (const n of this.nodes) {
          if (n.isThreat) {
            n.quarantined = true;
            n.color = '#3E4B56'; // Threat subdued to neutral steel grey
          }
        }
      }
    }

    render() {
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.width, this.height);

      const alphaMult = this.ambientMode ? 0.38 : 1.0;

      // Draw subtle background cyber grid ticks
      if (!this.ambientMode) {
        ctx.strokeStyle = 'rgba(0, 123, 167, 0.04)';
        ctx.lineWidth = 1;
        const gridStep = 70;
        ctx.beginPath();
        for (let x = 0; x < this.width; x += gridStep) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, this.height);
        }
        for (let y = 0; y < this.height; y += gridStep) {
          ctx.moveTo(0, y);
          ctx.lineTo(this.width, y);
        }
        ctx.stroke();
      }

      // Draw Edges
      for (const edge of this.edges) {
        const a = edge.source;
        const b = edge.target;
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = Math.min(180, this.width * 0.22);
        if (dist > maxDist) continue;

        const norm = 1 - dist / maxDist;
        const isThreatEdge = a.isThreat || b.isThreat;

        let strokeStyle;
        if (isThreatEdge) {
          strokeStyle = `rgba(255, 45, 149, ${0.35 * norm * alphaMult})`;
        } else {
          strokeStyle = `rgba(0, 123, 167, ${0.45 * norm * alphaMult})`;
        }

        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = norm * 1.5;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // Draw Packets
      for (const p of this.packets) {
        const px = p.source.x + (p.target.x - p.source.x) * p.progress;
        const py = p.source.y + (p.target.y - p.source.y) * p.progress;

        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw Nodes
      for (const n of this.nodes) {
        const pulseScale = 1 + Math.sin(n.pulse) * 0.18;
        const r = n.radius * pulseScale;

        // Node Glow Halo
        const haloAlpha = n.isThreat ? (n.quarantined ? 0.05 : 0.35) : 0.25;
        ctx.fillStyle = n.isThreat
          ? `rgba(255, 45, 149, ${haloAlpha * alphaMult})`
          : `rgba(0, 123, 167, ${haloAlpha * alphaMult})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Node Center
        ctx.fillStyle = n.color;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();

        // Node Labels / Formulas (for Hubs & Threats)
        if (n.label && !this.ambientMode) {
          ctx.font = '10px "JetBrains Mono", monospace';
          ctx.fillStyle = n.isThreat ? 'rgba(255, 93, 170, 0.85)' : 'rgba(0, 229, 255, 0.85)';
          ctx.fillText(n.label, n.x + r + 6, n.y + 3);
        }
      }
    }
  }

  // ---------------------------------------------------------------------------
  // CARD SCANNER & HOLOGRAPHIC VERIFIER
  // ---------------------------------------------------------------------------
  class CardScanner {
    constructor() {
      this.cards = [];
      this.activeCardIndex = -1;
      this.scanProgress = 0; // 0 to 1 inside current card
      this.lastScannedIndex = -1;
      this.discoverCards();
    }

    discoverCards() {
      const targets = [
        { selector: '.avatar-card', tag: '[TARGET: IDENTITY & SILICON CORE]' },
        { selector: '.flagship-box', tag: '[VERIFIED: TEMPORALGNN · 96.65% F1 · 0.08µs]' },
        { selector: '.deploy-card:nth-child(1)', tag: '[VERIFIED: EXPLAINABLE MEMORY RANSOMWARE · XAI]' },
        { selector: '.deploy-card:nth-child(2)', tag: '[VERIFIED: CG-DHD CONCEPT DRIFT · λ=0.05]' },
        { selector: '.deploy-card:nth-child(3)', tag: '[VERIFIED: FORENSICGRAPH · ALLEN INTERVALS]' },
        { selector: '.matrix-card:nth-child(1)', tag: '[VERIFIED: REAL-TIME HYBRID DDOS · SCAPY+RF]' },
        { selector: '.matrix-card:nth-child(2)', tag: '[VERIFIED: PROJECT SLASH · UNREAL C++ AI]' },
        { selector: '.matrix-card:nth-child(4)', tag: '[VERIFIED: TACTICAL SHOOTER · HAVOK RECOIL]' },
        { selector: '#timeline', tag: '[TARGET: ACADEMIC & RESEARCH TIMELINE]' },
        { selector: '.direct-connect-box', tag: '[TARGET: SECURE DISPATCH & MERKLE VAULT]' }
      ];

      this.cards = [];
      targets.forEach((t) => {
        const el = document.querySelector(t.selector);
        if (el) {
          this.cards.push({ el, tag: t.tag, scanned: false });
        }
      });
    }

    getActiveCard(scrollY, vh) {
      const centerY = scrollY + vh * 0.45;
      for (let i = 0; i < this.cards.length; i++) {
        const rect = this.cards[i].el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const bottom = top + rect.height;
        if (centerY >= top && centerY <= bottom) {
          return { index: i, card: this.cards[i], rect };
        }
      }
      return null;
    }

    renderScanReticles(ctx, scrollY, vh, audio) {
      const active = this.getActiveCard(scrollY, vh);
      if (!active) return;

      const { index, card, rect } = active;
      if (index !== this.lastScannedIndex) {
        this.lastScannedIndex = index;
        card.scanned = true;
        if (audio) audio.scanLaser();
      }

      const pad = 8;
      const x = rect.left - pad;
      const y = rect.top - pad;
      const w = rect.width + pad * 2;
      const h = rect.height + pad * 2;
      const cornerLen = Math.min(24, w * 0.15);

      // Tech Reticle Corners: ┌ ┐ └ ┘
      ctx.strokeStyle = CERULEAN_BRIGHT;
      ctx.lineWidth = 2;
      ctx.beginPath();
      // Top-Left
      ctx.moveTo(x, y + cornerLen); ctx.lineTo(x, y); ctx.lineTo(x + cornerLen, y);
      // Top-Right
      ctx.moveTo(x + w - cornerLen, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w, y + cornerLen);
      // Bottom-Left
      ctx.moveTo(x, y + h - cornerLen); ctx.lineTo(x, y + h); ctx.lineTo(x + cornerLen, y + h);
      // Bottom-Right
      ctx.moveTo(x + w - cornerLen, y + h); ctx.lineTo(x + w, y + h); ctx.lineTo(x + w, y + h - cornerLen);
      ctx.stroke();

      // Sweeping Laser Beam
      const time = performance.now() * 0.002;
      const laserY = y + ((Math.sin(time) + 1) / 2) * h;

      const grad = ctx.createLinearGradient(x, laserY, x + w, laserY);
      grad.addColorStop(0, 'rgba(0, 123, 167, 0)');
      grad.addColorStop(0.5, 'rgba(0, 229, 255, 0.85)');
      grad.addColorStop(1, 'rgba(255, 45, 149, 0)');

      ctx.strokeStyle = grad;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(x, laserY);
      ctx.lineTo(x + w, laserY);
      ctx.stroke();

      // Laser Glow
      ctx.fillStyle = 'rgba(0, 229, 255, 0.08)';
      ctx.fillRect(x, Math.max(y, laserY - 12), w, 24);

      // Floating Verification Tag
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.fillStyle = CERULEAN_BRIGHT;
      ctx.fillText(card.tag, x, y - 6);
    }
  }

  // ---------------------------------------------------------------------------
  // GNN HUD OVERLAY
  // ---------------------------------------------------------------------------
  class GnnHud {
    constructor(callbacks) {
      this.callbacks = callbacks; // onToggleTour, onToggleSound, onSkip
      this.root = null;
      this.progressBar = null;
      this.statusText = null;
      this.soundBtn = null;
      this.tourBtn = null;
      this.skipBtn = null;
      this.createElements();
    }

    createElements() {
      const hud = document.createElement('div');
      hud.id = 'gnn-hud';
      hud.innerHTML = `
        <style>
          #gnn-hud {
            position: fixed;
            bottom: 22px;
            left: 50%;
            transform: translateX(-50%);
            width: calc(100% - 40px);
            max-width: 980px;
            background: rgba(10, 12, 16, 0.88);
            border: 1px solid rgba(0, 123, 167, 0.45);
            border-radius: 10px;
            padding: 10px 18px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            z-index: 100000;
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            box-shadow: 0 10px 32px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 123, 167, 0.2);
            font-family: 'JetBrains Mono', monospace;
            color: #F5F7FA;
            font-size: 11.5px;
            transition: all 0.4s ease;
          }
          #gnn-hud.minimized {
            bottom: 16px;
            left: auto;
            right: 20px;
            transform: none;
            width: auto;
            max-width: none;
            padding: 8px 14px;
            background: rgba(15, 18, 22, 0.9);
            border-color: rgba(0, 229, 255, 0.4);
          }
          .gnn-hud-left {
            display: flex;
            align-items: center;
            gap: 12px;
            flex-shrink: 0;
          }
          .gnn-beacon {
            width: 9px;
            height: 9px;
            border-radius: 50%;
            background: #00E5FF;
            box-shadow: 0 0 10px #00E5FF;
            animation: gnnPulse 1.4s infinite ease-in-out;
          }
          @keyframes gnnPulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(1.3); }
          }
          .gnn-hud-center {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 5px;
            min-width: 140px;
          }
          .gnn-status-line {
            display: flex;
            justify-content: space-between;
            font-size: 10.5px;
            color: #A4B3C2;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .gnn-status-line span.hl { color: #00E5FF; font-weight: 600; }
          .gnn-status-line span.threat { color: #FF2D95; font-weight: 600; }
          .gnn-bar-track {
            width: 100%;
            height: 5px;
            background: #1C232B;
            border-radius: 3px;
            overflow: hidden;
            position: relative;
          }
          .gnn-bar-fill {
            height: 100%;
            width: 0%;
            background: linear-gradient(90deg, #007BA7, #00E5FF 60%, #FF2D95);
            border-radius: 3px;
            transition: width 0.15s ease-out;
            box-shadow: 0 0 8px rgba(0, 229, 255, 0.6);
          }
          .gnn-hud-right {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-shrink: 0;
          }
          .gnn-btn {
            background: #151A20;
            color: #F5F7FA;
            border: 1px solid rgba(0, 123, 167, 0.35);
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 11px;
            font-family: inherit;
            cursor: pointer;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            gap: 5px;
          }
          .gnn-btn:hover {
            background: rgba(0, 123, 167, 0.22);
            border-color: #00E5FF;
            color: #00E5FF;
          }
          .gnn-btn.pri {
            background: linear-gradient(135deg, #007BA7, #FF2D95);
            border: none;
            color: #fff;
            font-weight: 600;
          }
          .gnn-btn.pri:hover {
            box-shadow: 0 0 14px rgba(255, 45, 149, 0.5);
            transform: translateY(-1px);
          }
          .gnn-btn.active {
            background: rgba(0, 229, 255, 0.2);
            border-color: #00E5FF;
            color: #00E5FF;
          }
          @media (max-width: 768px) {
            #gnn-hud {
              flex-wrap: wrap;
              padding: 8px 12px;
              gap: 10px;
            }
            .gnn-hud-center { order: 3; width: 100%; }
          }
        </style>

        <div class="gnn-hud-left">
          <div class="gnn-beacon"></div>
          <div>
            <div style="font-weight: 700; color: #F5F7FA; font-size: 12px;">TEMPORAL GNN</div>
            <div style="font-size: 9px; color: #7E8D9B;">THREAT INGRESS ENGINE</div>
          </div>
        </div>

        <div class="gnn-hud-center">
          <div class="gnn-status-line">
            <span id="gnn-status-text">CALCULATING ATTENTION WEIGHTS...</span>
            <span id="gnn-pct-text" class="hl">0%</span>
          </div>
          <div class="gnn-bar-track">
            <div id="gnn-bar-fill" class="gnn-bar-fill"></div>
          </div>
        </div>

        <div class="gnn-hud-right">
          <button id="gnn-tour-btn" class="gnn-btn active" title="Toggle Auto-Tour">
            <span>⦿</span> Touring
          </button>
          <button id="gnn-sound-btn" class="gnn-btn" title="Toggle Synthesizer Sound">
            <span>🔈</span> Sound
          </button>
          <button id="gnn-skip-btn" class="gnn-btn pri" title="Skip to Interactive CV">
            Go Live ➔
          </button>
        </div>
      `;

      document.body.appendChild(hud);
      this.root = hud;
      this.progressBar = hud.querySelector('#gnn-bar-fill');
      this.statusText = hud.querySelector('#gnn-status-text');
      this.pctText = hud.querySelector('#gnn-pct-text');
      this.soundBtn = hud.querySelector('#gnn-sound-btn');
      this.tourBtn = hud.querySelector('#gnn-tour-btn');
      this.skipBtn = hud.querySelector('#gnn-skip-btn');

      this.soundBtn.addEventListener('click', () => {
        const on = this.callbacks.onToggleSound();
        this.soundBtn.innerHTML = on ? '<span>🔊</span> Sound' : '<span>🔈</span> Sound';
        this.soundBtn.classList.toggle('active', on);
      });

      this.tourBtn.addEventListener('click', () => {
        const touring = this.callbacks.onToggleTour();
        this.tourBtn.innerHTML = touring ? '<span>⦿</span> Touring' : '<span>○</span> Tour';
        this.tourBtn.classList.toggle('active', touring);
      });

      this.skipBtn.addEventListener('click', () => {
        this.callbacks.onSkip();
      });
    }

    updateProgress(pct, status) {
      if (this.progressBar) this.progressBar.style.width = `${Math.min(100, Math.max(0, pct))}%`;
      if (this.pctText) this.pctText.textContent = `${Math.round(pct)}%`;
      if (this.statusText && status) this.statusText.innerHTML = status;
    }

    minimize() {
      if (!this.root) return;
      this.root.classList.add('minimized');
      this.root.innerHTML = `
        <div style="display:flex;align-items:center;gap:10px;">
          <div class="gnn-beacon" style="background:#00E5FF;box-shadow:0 0 8px #00E5FF;"></div>
          <span style="font-weight:700;color:#00E5FF;font-size:11px;">GNN MESH ONLINE</span>
          <button id="gnn-replay-btn" class="gnn-btn" style="padding:4px 9px;font-size:10px;">
            ↺ Replay
          </button>
        </div>
      `;
      const replay = this.root.querySelector('#gnn-replay-btn');
      if (replay) {
        replay.addEventListener('click', () => {
          window.location.reload();
        });
      }
    }
  }

  // ---------------------------------------------------------------------------
  // MASTER CONTROLLER (App Lifecycle)
  // ---------------------------------------------------------------------------
  class TemporalGnnEngine {
    constructor() {
      this.audio = new CyberAudio();
      this.canvas = null;
      this.graph = null;
      this.scanner = null;
      this.hud = null;
      this.touring = true;
      this.live = false;
      this.t0 = performance.now();
      this.progress = 0;
      this.darkCurtain = null;

      this.init();
    }

    init() {
      // 1. Create Canvas Overlay
      this.canvas = document.createElement('canvas');
      this.canvas.id = 'gnn-mesh-canvas';
      this.canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 99998;
        pointer-events: none;
        transition: opacity 0.8s ease;
      `;
      document.body.appendChild(this.canvas);

      // 2. Create High-Tech Dark Vignette Curtain
      this.darkCurtain = document.createElement('div');
      this.darkCurtain.id = 'gnn-dark-curtain';
      this.darkCurtain.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: radial-gradient(circle at 50% 50%, rgba(10, 10, 10, 0.72) 0%, rgba(10, 10, 10, 0.92) 100%);
        z-index: 99997;
        pointer-events: none;
        transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1);
      `;
      document.body.appendChild(this.darkCurtain);

      // 3. Initialize Graph & Scanner
      this.graph = new GnnGraph(this.canvas);
      this.scanner = new CardScanner();

      // 4. Initialize HUD
      this.hud = new GnnHud({
        onToggleSound: () => this.audio.toggle(),
        onToggleTour: () => {
          this.touring = !this.touring;
          return this.touring;
        },
        onSkip: () => this.goLive()
      });

      // 5. Window Resize & Mouse Listeners
      window.addEventListener('resize', () => {
        this.graph.resize();
        this.scanner.discoverCards();
      });

      window.addEventListener('pointermove', (e) => {
        this.graph.mouse.x = e.clientX;
        this.graph.mouse.y = e.clientY;
        this.graph.mouse.active = true;
      });

      window.addEventListener('pointerleave', () => {
        this.graph.mouse.active = false;
      });

      // Key shortcut Escape to skip
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') this.goLive();
      });

      // 6. Start Loop
      this.lastTime = performance.now();
      requestAnimationFrame((t) => this.loop(t));
    }

    loop(now) {
      const dt = Math.min(0.05, (now - this.lastTime) / 1000);
      this.lastTime = now;

      // Update GNN Graph Physics
      this.graph.update(dt, this.audio);
      this.graph.render();

      if (!this.live) {
        // Draw Card Scanning Hologram Reticles
        const vh = window.innerHeight;
        const scrollY = window.scrollY;
        this.scanner.renderScanReticles(this.graph.ctx, scrollY, vh, this.audio);

        // Auto-Tour Scrolling Logic
        if (this.touring) {
          const maxScroll = Math.max(1, document.documentElement.scrollHeight - vh);
          const currentScroll = window.scrollY;

          // Compute Progress (0% to 100%)
          this.progress = Math.min(100, (currentScroll / maxScroll) * 100);

          let statusMsg = 'CORRELATING <span class="hl">SPATIO-TEMPORAL EDGES</span>...';
          if (this.progress > 25 && this.progress < 50) {
            statusMsg = 'DETECTING <span class="threat">BOTNET ANOMALIES</span> [λ=0.05]';
          } else if (this.progress >= 50 && this.progress < 75) {
            statusMsg = 'XAI ATTRIBUTION: <span class="hl">CIC-MALMEM RECALL 100%</span>';
          } else if (this.progress >= 75 && this.progress < 98) {
            statusMsg = 'VERIFYING <span class="hl">MERKLE EVIDENCE VAULTS</span>';
          }

          this.hud.updateProgress(this.progress, statusMsg);

          // Scroll step
          if (currentScroll < maxScroll - 4) {
            window.scrollBy({ top: 4.5, behavior: 'instant' });
          } else {
            // Reached Bottom -> Finalize Convergence
            this.onTourComplete();
          }
        }
      }

      requestAnimationFrame((t) => this.loop(t));
    }

    onTourComplete() {
      if (this.touringComplete) return;
      this.touringComplete = true;
      this.touring = false;

      this.hud.updateProgress(100, '<span class="hl">CONVERGENCE 100%</span> · THREATS QUARANTINED');
      this.graph.isolatedThreats = true;
      this.audio.finaleChord();

      // Celebration beat before going live
      setTimeout(() => {
        this.goLive();
      }, 1600);
    }

    goLive() {
      if (this.live) return;
      this.live = true;
      this.touring = false;

      // 1. Fade out the dark curtain
      if (this.darkCurtain) {
        this.darkCurtain.style.opacity = '0';
        setTimeout(() => this.darkCurtain.remove(), 1250);
      }

      // 2. Put the GNN canvas into subtle Ambient Interactive Background mode
      if (this.canvas) {
        this.canvas.style.zIndex = '0';
        this.canvas.style.pointerEvents = 'auto'; // Enables interactive mouse physics while browsing
        this.graph.ambientMode = true;
      }

      // 3. Minimize HUD to subtle corner badge
      if (this.hud) {
        this.hud.minimize();
      }

      // 4. Smoothly glide viewport to top hero section if the full tour completed
      if (this.touringComplete) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

  // ---------------------------------------------------------------------------
  // INITIALIZE ON LOAD
  // ---------------------------------------------------------------------------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new TemporalGnnEngine());
  } else {
    new TemporalGnnEngine();
  }
})();
