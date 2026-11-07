import React, { useEffect, useRef } from "react";

const NODES = [
  {
    id: "Orchestrator",
    x: 0.5,
    y: 0.5,
    radius: 18,
    color: "#ff9e2c",
    pulse: 0,
    label: "Supervisor",
  },
  {
    id: "Agent-SQL",
    x: 0.25,
    y: 0.3,
    radius: 12,
    color: "#00e5ff",
    pulse: 1,
    label: "RAG",
  },
  {
    id: "Agent-RAG",
    x: 0.75,
    y: 0.3,
    radius: 12,
    color: "#00e5ff",
    pulse: 2,
    label: "Retrieve",
  },
  {
    id: "Agent-Guard",
    x: 0.3,
    y: 0.75,
    radius: 12,
    color: "#10b981",
    pulse: 3,
    label: "Guardrail",
  },
  {
    id: "Agent-Exec",
    x: 0.7,
    y: 0.75,
    radius: 12,
    color: "#a855f7",
    pulse: 4,
    label: "Tools",
  },
];

const AgentNetworkCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let t = 0;

    const setCanvasSize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    const render = () => {
      t += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { width, height } = canvas;
      const center = { x: NODES[0].x * width, y: NODES[0].y * height };

      NODES.slice(1).forEach((node, idx) => {
        const nx = node.x * width;
        const ny = node.y * height;
        ctx.beginPath();
        ctx.moveTo(center.x, center.y);
        ctx.lineTo(nx, ny);
        ctx.strokeStyle = "rgba(242, 235, 227, 0.08)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        const packetProgress = (Math.sin(t * 1.5 + idx * 1.2) + 1) / 2;
        const px = center.x + (nx - center.x) * packetProgress;
        const py = center.y + (ny - center.y) * packetProgress;
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      NODES.forEach((node) => {
        const nx = node.x * width;
        const ny = node.y * height;
        const pulseSize = node.radius + Math.sin(t * 2 + node.pulse) * 2;
        ctx.beginPath();
        ctx.arc(nx, ny, pulseSize + 6, 0, Math.PI * 2);
        ctx.fillStyle = `${node.color}15`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(nx, ny, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(nx, ny, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#080706";
        ctx.fill();
        ctx.font = "11px JetBrains Mono, monospace";
        ctx.fillStyle = "rgba(242, 235, 227, 0.7)";
        ctx.textAlign = "center";
        ctx.fillText(node.label, nx, ny + pulseSize + 16);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-64 md:h-80 rounded-2xl bg-story-panel border border-[#f2ebe3]/10 overflow-hidden shadow-2xl">
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs font-mono text-[#f2ebe3]/80 uppercase tracking-wider">
          Multi-agent topology
        </span>
      </div>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

export default AgentNetworkCanvas;
