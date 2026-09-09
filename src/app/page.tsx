"use client";

import { useState } from "react";
import {
  Bell,
  ChevronRight,
  CircleDollarSign,
  Home,
  MessageCircle,
  Package,
  Plus,
  Receipt,
  UserPlus,
  Users,
  WalletCards,
} from "lucide-react";

const customers = [
  { name: "Carlos Benítez", detail: "hace 18 días", status: "vencido", amount: "$12.800", initials: "CB" },
  { name: "Martina López", detail: "hace 12 días", status: "pendiente", amount: "$18.450", initials: "ML" },
  { name: "Sofía Rodríguez", detail: "hace 9 días", status: "pendiente", amount: "$9.650", initials: "SR" },
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
  const [showSaleFeedback, setShowSaleFeedback] = useState(false);

  const hasBalance = customers.length > 0;
  const hasTodayActivity = false;
  const hasLowStock = true;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col px-5 pb-28 pt-6 sm:px-7">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm"
              aria-label="Abrir Ajustes"
              onClick={() => setShowSettings(!showSettings)}
            >
              <span className="text-lg font-bold">A</span>
            </button>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Buen día, Agustín</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">Miércoles 9 de septiembre</p>
              <p className="text-lg font-semibold tracking-tight">Almacén La Esquina</p>
            </div>
          </div>
          <button
            className="relative flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground"
            aria-label="Ver notificaciones"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="size-[19px]" strokeWidth={1.8} />
            <span className="absolute right-2 top-2 size-2 rounded-full bg-accent ring-2 ring-card" />
          </button>
        </header>

        {showNotifications && (
          <div className="mt-3 rounded-2xl border border-border bg-card p-4 text-sm shadow-sm">
            <p className="font-semibold">Tenés 1 cuenta vencida</p>
            <p className="mt-1 text-muted-foreground">Podés enviarle un recordatorio a Carlos.</p>
          </div>
        )}

        {showSettings && (
          <div className="mt-3 rounded-2xl border border-border bg-card p-4 text-sm shadow-sm">
            <p className="font-semibold">Ajustes</p>
            <p className="mt-1 text-muted-foreground">Configurá tu almacén y preferencias.</p>
          </div>
        )}

        <section className="mt-8" aria-labelledby="primary-heading">
          <p className="text-sm font-medium text-muted-foreground">¿Qué necesitás registrar?</p>
          <h1 id="primary-heading" className="mt-1 text-[30px] font-semibold leading-tight tracking-[-0.04em]">Ingresá una venta</h1>
          <button
            className="mt-5 flex w-full items-center justify-between rounded-3xl bg-primary px-5 py-5 text-left text-primary-foreground shadow-sm transition-transform active:scale-[0.98]"
            onClick={() => setShowSaleFeedback(true)}
          >
            <span className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-primary-foreground/15"><Receipt className="size-5" /></span>
              <span><span className="block text-base font-semibold">Ingresar venta</span><span className="mt-0.5 block text-xs text-primary-foreground/70">Cargá una venta al instante</span></span>
            </span>
            <ChevronRight className="size-5" />
          </button>
          {showSaleFeedback && <p className="mt-2 text-xs font-medium text-primary">Venta lista para cargar.</p>}
        </section>

        <section className="mt-8" aria-labelledby="today-heading">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Hoy</p>
              <h2 id="today-heading" className="mt-1 text-xl font-semibold tracking-tight">Actividad del día</h2>
            </div>
            <span className="text-sm font-semibold text-muted-foreground">$0</span>
          </div>
          <div className="mt-4 rounded-3xl border border-dashed border-border bg-card px-5 py-6 text-center">
            {hasTodayActivity ? <p className="text-sm font-semibold">Tu actividad aparece acá</p> : <><p className="text-sm font-semibold">Todavía no registraste movimientos</p><p className="mt-1 text-xs text-muted-foreground">Cuando ingreses una venta, vas a verla en este resumen.</p></>}
          </div>
        </section>

        <section className="mt-9" aria-labelledby="receivable-heading">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Cuentas</p>
              <h2 id="receivable-heading" className="mt-1 text-xl font-semibold tracking-tight">Por cobrar</h2>
            </div>
            <span className="text-base font-semibold">{hasBalance ? "$48.100" : "$0"}</span>
          </div>
          {hasBalance ? <div className="mt-4 flex flex-col divide-y divide-border rounded-3xl border border-border bg-card px-4">
            {customers.map((customer) => (
              <div key={customer.name} className="flex items-center gap-3 py-4">
                <span className="avatar avatar-neutral">{customer.initials}</span>
                <span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold">{customer.name}</span><span className="mt-0.5 block truncate text-xs text-muted-foreground">{customer.detail}</span></span>
                <span className="text-right"><span className="block text-sm font-semibold">{customer.amount}</span><span className={`mt-0.5 block text-[11px] capitalize ${customer.status === "vencido" ? "text-accent" : "text-muted-foreground"}`}>{customer.status}</span></span>
                {customer.status === "vencido" && <button className="flex size-8 items-center justify-center rounded-full bg-muted text-primary" aria-label={`Enviar WhatsApp a ${customer.name}`}><MessageCircle className="size-4" /></button>}
              </div>
            ))}
          </div> : <div className="mt-4 rounded-3xl border border-dashed border-border bg-card px-5 py-7 text-center"><p className="text-sm font-semibold">No tenés cuentas por cobrar</p><p className="mt-1 text-xs text-muted-foreground">Tus clientes con saldo van a aparecer acá.</p></div>}
        </section>

        {hasLowStock && <section className="mt-6 flex items-center justify-between rounded-3xl bg-muted px-4 py-4"><div className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-xl bg-card text-primary"><Package className="size-4" /></span><span><span className="block text-sm font-semibold">Revisá tu stock</span><span className="block text-xs text-muted-foreground">3 productos tienen pocas unidades</span></span></div><ChevronRight className="size-4 text-muted-foreground" /></section>}

        <div className="mt-6 grid grid-cols-3 gap-2" aria-label="Acciones secundarias">
          <button className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card px-2 py-3 text-xs font-medium"><CircleDollarSign className="size-4 text-primary" />Registrar pago</button>
          <button className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card px-2 py-3 text-xs font-medium"><Plus className="size-4 text-primary" />Ingresar gasto</button>
          <button className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card px-2 py-3 text-xs font-medium"><UserPlus className="size-4 text-primary" />Nuevo cliente</button>
        </div>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-10 border-t border-border bg-background/95 px-5 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md" aria-label="Navegación principal"><div className="mx-auto flex max-w-[440px] items-center justify-between">{navItems.map(({ label, icon: Icon }) => { const isActive = activeNav === label; return <button key={label} onClick={() => setActiveNav(label)} className={`flex min-w-16 flex-col items-center gap-1 text-[11px] font-medium transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`} aria-current={isActive ? "page" : undefined}><Icon className="size-[19px]" strokeWidth={isActive ? 2.4 : 1.7} /><span>{label}</span></button>; })}</div></nav>
    </main>
  );
}
