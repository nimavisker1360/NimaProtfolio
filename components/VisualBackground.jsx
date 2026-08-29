import dynamic from "next/dynamic";
import React, { Component, useEffect, useState } from "react";

const StarsCanvas = dynamic(() => import("./sub/StartComponent"), {
  ssr: false,
  loading: () => null,
});

const StaticFallback = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(126,34,206,0.26),transparent_34%),linear-gradient(135deg,#131424_0%,#21153d_52%,#090a12_100%)]"
  >
    <div className="absolute inset-0 bg-native bg-contain bg-right-bottom bg-no-repeat opacity-30" />
  </div>
);

class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {}

  render() {
    return this.state.failed ? <StaticFallback /> : this.props.children;
  }
}

const VisualBackground = () => {
  const [useWebGL, setUseWebGL] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const smallScreen = window.matchMedia("(max-width: 767px)").matches;
    const lowPower = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    let supported = false;

    try {
      const canvas = document.createElement("canvas");
      supported = Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
    } catch {
      supported = false;
    }

    const frame = window.requestAnimationFrame(() => {
      setUseWebGL(supported && !reducedMotion && !smallScreen && !lowPower);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (!useWebGL) return <StaticFallback />;

  return (
    <WebGLErrorBoundary>
      <StaticFallback />
      <StarsCanvas />
    </WebGLErrorBoundary>
  );
};

export default VisualBackground;
