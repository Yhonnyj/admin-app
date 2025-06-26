// app/admin/layout.tsx
"use client";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: 'orange', padding: '20px', minHeight: '100vh', color: 'black' }}>
      <h1>LAYOUT ADMIN DE PRUEBA EN PRODUCCIÓN</h1>
      {children}
    </div>
  );
}