"use client";

import { useState } from "react";
import {
  Bell,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  Home,
  Package,
  Receipt,
  UserPlus,
  Users,
  WalletCards,
} from "lucide-react";

const customers = [
  { name: "Martina López", detail: "hace 12 días", status: "pendiente", amount: "$18.450", initials: "ML" },
  { name: "Carlos Benítez", detail: "hace 18 días", status: "vencido", amount: "$12.800", initials: "CB" },
  { name: "Sofía Rodríguez", detail: "hace 9 días", status: "pendiente", amount: "$9.650", initials: "SR" },
  { name: "Diego Fernández", detail: "hace 6 días", status: "pendiente", amount: "$7.200", initials: "DF" },
];

const navItems = [
  { label: "Inicio", icon: Home },
  { label: "Clientes", icon: Users },
  { label: "Stock", icon: Package },
  { label: "Balance", icon: WalletCards },
];

export default function HomePage() {
  const [activeNav, setActiveNav] = useState("Inicio");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col px-5 pb-28 pt-6 sm:px-7">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm" aria-label="Abrir Ajustes" onClick={() => setShowSettings(!showSettings)}>
              <span className="text-lg font-bold">A</span>
            </button>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Buen día, Agustín</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">Miércoles 9 de septiembre</p>
              <p className="text-lg font-semibold tracking-tight">Almacén La Esquina</p>
            </div>
          </div>
          <button className="relative flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground" aria-label="Ver notificaciones" onClick={() => setShowNotifications(!showNotifications)}>
            <Bell className="size-[19px]" strokeWidth={1.8} />
            <span className="absolute right-2 top-2 size-2 rounded-full bg-accent ring-2 ring-card" />
          </button>
        </header>

        {showNotifications && (
          <div className="mt-3 rounded-2xl border border-border bg-card p-4 text-sm shadow-sm">
            <p className="font-semibold">Tenés 2 cuentas vencidas</p>
            <p className="mt-1 text-muted-foreground">Revisá el seguimiento de clientes.</p>
          </div>
        )}

        {showSettings && (
          <div className="mt-3 rounded-2xl border border-border bg-card p-4 text-sm shadow-sm">
            <p className="font-semibold">Ajustes</p>
            <p className="mt-1 text-muted-foreground">Configurá tu almacén y preferencias.</p>
          </div>
        )}

        <section className="mt-8">
          <p className="text-sm font-medium text-muted-foreground">Total por cobrar</p>
          <h1 className="mt-1 text-[40px] font-semibold leading-none tracking-[-0.06em]">$48.100</h1>
          <p className="mt-3 text-sm text-muted-foreground">6 clientes con saldo</p>
        </section>

        <section className="mt-8" aria-label="Acciones rápidas">
          <h2 className="text-base font-semibold tracking-tight">Acciones rápidas</h2>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <button className="flex min-h-[112px] flex-col justify-between rounded-3xl bg-primary p-4 text-left text-primary-foreground transition-transform active:scale-[0.98]">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary-foreground/15"><Receipt className="size-5" /></span>
              <span className="text-sm font-semibold">Ingresar venta</span>
            </button>
            <button className="flex min-h-[112px] flex-col justify-between rounded-3xl border border-border bg-card p-4 text-left transition-transform active:scale-[0.98]">
              <span className="flex size-9 items-center justify-center rounded-xl bg-muted text-primary"><CircleDollarSign className="size-5" /></span>
              <span className="text-sm font-semibold">Registrar pago</span>
            </button>
            <button className="flex min-h-[112px] flex-col justify-between rounded-3xl border border-border bg-card p-4 text-left transition-transform active:scale-[0.98]">
              <span className="flex size-9 items-center justify-center rounded-xl bg-muted text-primary"><CreditCard className="size-5" /></span>
              <span className="text-sm font-semibold">Ingresar gasto</span>
            </button>
            <button className="flex min-h-[112px] flex-col justify-between rounded-3xl border border-border bg-card p-4 text-left transition-transform active:scale-[0.98]">
              <span className="flex size-9 items-center justify-center rounded-xl bg-muted text-primary"><UserPlus className="size-5" /></span>
              <span className="text-sm font-semibold">Nuevo cliente</span>
            </button>
          </div>
        </section>

        <section className="mt-9">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Seguimiento</p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight">Clientes con saldo</h2>
            </div>
            <button className="flex items-center gap-1 text-sm font-semibold text-primary">Ver todos <ChevronRight className="size-4" /></button>
          </div>
          <div className="mt-4 flex flex-col divide-y divide-border rounded-3xl border border-border bg-card px-4">
            {customers.length === 0 ? (
              <div className="px-2 py-8 text-center">
                <p className="text-sm font-semibold">No hay clientes con saldo</p>
                <p className="mt-1 text-xs text-muted-foreground">Tus cuentas pendientes van a aparecer acá.</p>
              </div>
            ) : customers.map((customer) => (
              <button key={customer.name} className="flex items-center gap-3 py-4 text-left">
                <span className="avatar avatar-neutral">{customer.initials}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold">{customer.name}</span>
                  <span className="mt-0.5 block truncate text-xs text-muted-foreground">{customer.detail}</span>
                </span>
                <span className="text-right">
                  <span className="block text-sm font-semibold">{customer.amount}</span>
                  <span className={`mt-0.5 block text-[11px] capitalize ${customer.status === "vencido" ? "text-accent" : "text-muted-foreground"}`}>{customer.status}</span>
                </span>
              </button>
            ))}
          </div>
        </section>

      </div>

      <nav className="fixed inset-x-0 bottom-0 z-10 border-t border-border bg-background/95 px-5 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md" aria-label="Navegación principal">
        <div className="mx-auto flex max-w-[440px] items-center justify-between">
          {navItems.map(({ label, icon: Icon }) => {
            const isActive = activeNav === label;
            return <button key={label} onClick={() => setActiveNav(label)} className={`flex min-w-16 flex-col items-center gap-1 text-[11px] font-medium transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`} aria-current={isActive ? "page" : undefined}><Icon className="size-[19px]" strokeWidth={isActive ? 2.4 : 1.7} /><span>{label}</span></button>;
          })}
        </div>
      </nav>
    </main>
  );
}
