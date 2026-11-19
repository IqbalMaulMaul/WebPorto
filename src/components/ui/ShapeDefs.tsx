/** Scalable silhouettes shared by the framed panels; content stays ordinary HTML. */
export const ShapeDefs = () => (
  <svg className="shape-definitions" width="0" height="0" aria-hidden="true" focusable="false">
    <defs>
      <clipPath id="hero-panel-shape" clipPathUnits="objectBoundingBox">
        <path d="M.035,0 H.965 Q1,0 1,.06 V.94 Q1,1 .965,1 H.315 Q.28,1 .28,.945 V.91 Q.28,.86 .25,.86 H.035 Q0,.86 0,.80 V.06 Q0,0 .035,0 Z" />
      </clipPath>
      <clipPath id="hero-panel-mobile" clipPathUnits="objectBoundingBox">
        <path d="M.08,0 H.92 Q1,0 1,.035 V.965 Q1,1 .92,1 H.76 Q.68,1 .68,.965 V.92 Q.68,.88 .60,.88 H.08 Q0,.88 0,.845 V.035 Q0,0 .08,0 Z" />
      </clipPath>
      <clipPath id="project-card-shape" clipPathUnits="objectBoundingBox">
        <path d="M.055,0 H.945 Q1,0 1,.04 V.84 Q1,.88 .95,.88 H.88 Q.84,.88 .84,.92 V.96 Q.84,1 .785,1 H.055 Q0,1 0,.96 V.04 Q0,0 .055,0 Z" />
      </clipPath>
    </defs>
  </svg>
);
