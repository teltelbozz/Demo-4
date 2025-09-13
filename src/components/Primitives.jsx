import React from 'react';
export function Card({ children, className = "" }) {
  return <div className={`rounded-2xl shadow-sm border p-4 bg-white ${className}`}>{children}</div>;
}
export function Chip({ children }) {
  return <span className="inline-flex items-center whitespace-nowrap px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs mr-1 mb-1 border">{children}</span>;
}
export function Btn({ children, variant = "solid", onClick, disabled, full = false, className = "" }) {
  const base = "inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const width = full ? "w-full" : "";
  const styles = variant === "solid"
    ? "!bg-black !text-white hover:bg-gray-800 disabled:opacity-50"
    : "!bg-white !text-gray-900 border hover:bg-gray-50 disabled:opacity-50";
  return <button className={`${base} ${width} ${styles} ${className}`} onClick={onClick} disabled={disabled}>{children}</button>;
}
export function Section({ title, children, actions }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div>{actions}</div>
      </div>
      {children}
    </div>
  );
}
export function Hero({ title, subtitle }) {
  return (
    <div className="rounded-3xl border bg-white p-6 md:p-8 text-center">
      <div className="text-2xl md:text-3xl font-bold">{title}</div>
      <div className="mt-2 text-gray-600">{subtitle}</div>
    </div>
  );
}
