"use client";

import { Grid } from "ldrs/react";
import "ldrs/react/Grid.css";

export default function AnimatedLoader({ size = 60, speed = 1.5, color }) {
  const resolvedColor = color || "var(--color-primary, #4BA4B4)";

  return (
    <div className="flex items-center justify-center" style={{ color: resolvedColor }}>
      <Grid size={String(size)} speed={speed} color="currentColor" />
    </div>
  );
}
