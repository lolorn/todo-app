"use client"
import React from "react";

function HeaderBar({ children }: { children: React.ReactNode }) {
  return <div className="h-16">{children}</div>;
}

export default HeaderBar;
