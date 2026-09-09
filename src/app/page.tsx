"use client";

import { useState } from "react";
import {
  ChevronRight,
  CircleDollarSign,
  Home,
  MessageCircle,
  Package,
  Receipt,
  Settings,
  Users,
  WalletCards,
  X,
} from "lucide-react";

const customers = [
  { name: "Carlos Benítez", detail: "hace 18 días", status: "pendiente", amount: "$12.800", initials: "CB" },
  { name: "Martina López", detail: "hace 12 días", status: "pendiente", amount: "$18.450", initials: "ML" },
  { name: "Sofía Rodríguez", detail: "hace 31 días", status: "vencido", amount: "$9.650", initials: "SR" },
];

const navItems = [
  { label: "Inicio", icon: Home },
  { label: "Clientes", icon: Users },
  { label: "Stock", icon: Package },
  { label: "Balance", icon: WalletCards },
];

export default function HomePage() {
  const [activeNav, setActiveNav] = useState("Inicio");
  const [showSettings, setShowSettings] = useState(false);
  const [showSaleFeedback, setShowSaleFeedback] = useState(false);
  const [showTrialWarning, setShowTrialWarning] = useState(false);
  const [whatsappCustomer, setWhatsappCustomer] = useState<string | null>(null);

  const hasBalance = customers.length > 0;
  const hasTodayActivity = false;
  const hasLowStock = true;
  const overdueCount = customers.filter((customer) => customer.status === "vencido").length;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col px-5 pb-28 pt-6 sm:px-7">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm"><span className="text-lg font-bold">A</span></div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Buen día, Agustín</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">Miércoles 9 de septiembre</p>
              <p className="text-lg font-semibold tracking-tight">Almacén La Esquina</p>
            </div>
          </div>
          <button className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground" aria-label="Abrir Ajustes" onClick={() => setShowSettings(!showSettings)}><Settings className="size-[19px]" strokeWidth={1.8} /></button>
        </header>

        {showSettings && <div className="mt-3 rounded-2xl border border-border bg-card p-4 text-sm shadow-sm"><div className="flex items-start justify-between"><div><p className="font-semibold">Ajustes</p><p className="mt-1 text-muted-foreground">Configurá tu almacén y preferencias.</p></div><button aria-label="Cerrar Ajustes" onClick={() => setShowSettings(false)}><X className="size-4 text-muted-foreground" /></button></div></div>}

        <button className={`mt-6 w-full rounded-xl border px-3 py-2 text-left text-xs ${showTrialWarning ? "border-accent/30 bg-accent/10 text-foreground" : "border-border bg-card text-muted-foreground"}`} onClick={() => setShowTrialWarning(!showTrialWarning)}>{showTrialWarning ? "Sin conexión — los datos pueden no estar actualizados." : "Te quedan 12 días de prueba."}</button>

        <section className="mt-8" aria-label="Ingresar venta">
          <button className="flex w-full items-center justify-between rounded-3xl bg-primary px-5 py-5 text-left text-primary-foreground shadow-sm transition-transform active:scale-[0.98]" onClick={() => setShowSaleFeedback(true)}>
            <span className="flex items-center gap-3"><span className="flex size-11 items-center justify-center rounded-2xl bg-primary-foreground/15"><Receipt className="size-5" /></span><span><span className="block text-base font-semibold">Ingresar venta</span><span className="mt-0.5 block text-xs text-primary-foreground/70">Cargá una venta al instante</span></span></span><ChevronRight className="size-5" />
          </button>
          {showSaleFeedback && <p className="mt-2 text-xs font-medium text-muted-foreground">Venta lista para cargar.</p>}
        </section>

        <section className="mt-8" aria-labelledby="today-heading">
          <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Hoy</p><h2 id="today-heading" className="mt-1 text-xl font-semibold tracking-tight">Registraste hoy</h2></div>
          <div className="mt-4 px-5 py-5 text-center">{hasTodayActivity ? <p className="text-sm font-semibold">Tu actividad aparece acá</p> : <><p className="text-sm font-semibold">Todavía no registraste movimientos</p><p className="mt-1 text-xs text-muted-foreground">Cuando ingreses una venta, vas a verla en este resumen.</p></>}</div>
        </section>

        <section className="mt-7" aria-labelledby="receivable-heading">
          <div className="flex items-end justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Cuentas</p><h2 id="receivable-heading" className="mt-1 text-xl font-semibold tracking-tight">Por cobrar</h2></div><button className="text-sm font-semibold text-muted-foreground underline-offset-4 hover:underline">Ver todos</button></div>
          {hasBalance ? <><div className="mt-3 flex items-center justify-between"><span className="text-2xl font-semibold tracking-tight">$48.100</span><button className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">{overdueCount} vencidos · $9.650</button></div><div className="mt-4 flex flex-col divide-y divide-border rounded-3xl border border-border bg-card px-4">
            {customers.map((customer) => <div key={customer.name} className="flex items-center gap-3 py-4"><span className="avatar avatar-neutral">{customer.initials}</span><span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold">{customer.name}</span><span className="mt-0.5 block truncate text-xs text-muted-foreground">{customer.detail}</span></span><span className="text-right"><span className="block text-sm font-semibold">{customer.amount}</span><span className={`mt-0.5 block text-[11px] capitalize ${customer.status === "vencido" ? "text-accent" : "text-muted-foreground"}`}>{customer.status}</span></span><button className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground" aria-label={`Revisar WhatsApp para ${customer.name}`} onClick={() => setWhatsappCustomer(customer.name)}><MessageCircle className="size-[18px]" /></button></div>)}
          </div><button className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-card py-3 text-sm font-semibold" onClick={() => setWhatsappCustomer("Registrar pago")}> <CircleDollarSign className="size-4 text-muted-foreground" />Registrar pago</button></> : <div className="mt-4 px-5 py-6 text-center"><p className="text-sm font-semibold">No tenés cuentas por cobrar</p><p className="mt-1 text-xs text-muted-foreground">Tus clientes con saldo van a aparecer acá.</p></div>}
        </section>

        {hasLowStock && <section className="mt-6 flex items-center justify-between rounded-3xl bg-muted px-4 py-4"><div className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-xl bg-card text-muted-foreground"><Package className="size-4" /></span><span><span className="block text-sm font-semibold">Revisá tu stock</span><span className="block text-xs text-muted-foreground">3 productos tienen pocas unidades</span></span></div><ChevronRight className="size-4 text-muted-foreground" /></section>}

        {whatsappCustomer && <div className="fixed inset-0 z-20 flex items-end justify-center bg-foreground/20 px-5 pb-6"><div className="w-full max-w-[440px] rounded-3xl border border-border bg-card p-5 shadow-lg"><div className="flex items-start justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Revisión</p><h2 className="mt-1 text-lg font-semibold">Mensaje de WhatsApp</h2></div><button aria-label="Cerrar mensaje" onClick={() => setWhatsappCustomer(null)}><X className="size-5 text-muted-foreground" /></button></div><p className="mt-4 rounded-2xl bg-muted p-4 text-sm leading-6">Hola {whatsappCustomer}, ¿cómo estás? Te escribo para recordarte el saldo pendiente del almacén.</p><button className="mt-4 w-full rounded-2xl bg-primary py-3 text-sm font-semibold text-primary-foreground" onClick={() => setWhatsappCustomer(null)}>Editar mensaje</button></div></div>}
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-10 border-t border-border bg-background/95 px-5 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md" aria-label="Navegación principal"><div className="mx-auto flex max-w-[440px] items-center justify-between">{navItems.map(({ label, icon: Icon }) => { const isActive = activeNav === label; return <button key={label} onClick={() => setActiveNav(label)} className={`flex min-w-16 flex-col items-center gap-1 text-[11px] font-medium transition-colors ${isActive ? "text-foreground" : "text-muted-foreground"}`} aria-current={isActive ? "page" : undefined}><Icon className="size-[19px]" strokeWidth={isActive ? 2.4 : 1.7} /><span>{label}</span></button>; })}</div></nav>
    </main>
  );
}
