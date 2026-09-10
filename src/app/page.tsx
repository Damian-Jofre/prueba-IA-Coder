"use client";

import { useMemo, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Home,
  Package,
  Pencil,
  Plus,
  Search,
  Settings,
  Users,
  WalletCards,
  X,
} from "lucide-react";

const products = [
  { name: "Aceite Cocinero 900ml", category: "Almacén", price: "$2.450", unit: "unidad", stock: 12 },
  { name: "Arroz Gallo Oro 1kg", category: "Almacén", price: "$1.850", unit: "unidad", stock: 8 },
  { name: "Coca-Cola 2.25L", category: "Bebidas", price: "$3.200", unit: "unidad", stock: 5 },
  { name: "Fideos Matarazzo 500g", category: "Almacén", price: "$1.250", unit: "unidad", stock: 0 },
  { name: "Leche La Serenísima 1L", category: "Lácteos", price: "$1.600", unit: "unidad", stock: 2 },
  { name: "Pan Lactal Blanco", category: "Panadería", price: "$2.100", unit: "paquete", stock: 6 },
  { name: "Yerba Playadito 500g", category: "Almacén", price: "$3.800", unit: "paquete", stock: 3 },
  { name: "Queso Cremoso", category: "Lácteos", price: "$8.900", unit: "kg", stock: 1.5 },
];

const noPriceProducts = [
  { name: "Agua mineral 500ml", category: "Bebidas" },
  { name: "Galletitas surtidas", category: "Almacén" },
];

const navItems = [
  { label: "Inicio", icon: Home },
  { label: "Clientes", icon: Users },
  { label: "Stock", icon: Package },
  { label: "Balance", icon: WalletCards },
];

function normalize(value: string) {
  return value
    .toLocaleLowerCase("es")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export default function CatalogPage() {
  const [activeNav, setActiveNav] = useState("Stock");
  const [query, setQuery] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [showNoPrice, setShowNoPrice] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [savedProduct, setSavedProduct] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = normalize(query);
    if (!normalizedQuery) return products;
    return products.filter((product) => normalize(product.name).includes(normalizedQuery));
  }, [query]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col px-5 pb-28 pt-6 sm:px-7">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Catálogo</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">Productos</h1>
          </div>
          <button className="flex size-10 items-center justify-center rounded-full border border-border bg-card" aria-label="Abrir Ajustes" onClick={() => setShowSettings(true)}><Settings className="size-[19px]" strokeWidth={1.8} /></button>
        </header>

        {showSettings && <div className="mt-4 rounded-2xl border border-border bg-card p-4 text-sm shadow-sm"><div className="flex items-start justify-between"><div><p className="font-semibold">Ajustes</p><p className="mt-1 text-muted-foreground">Configurá tu almacén y preferencias.</p></div><button aria-label="Cerrar Ajustes" onClick={() => setShowSettings(false)}><X className="size-4 text-muted-foreground" /></button></div></div>}

        <div className="relative mt-6">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-muted-foreground" />
          <input ref={inputRef} autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar producto..." aria-label="Buscar producto" className="h-12 w-full rounded-2xl border border-border bg-card pl-11 pr-11 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10" />
          {query && <button aria-label="Limpiar búsqueda" onClick={() => { setQuery(""); inputRef.current?.focus(); }} className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground"><X className="size-4" /></button>}
        </div>

        <div className="mt-7 flex items-end justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Inventario</p><h2 className="mt-1 text-xl font-semibold tracking-tight">Todos los productos</h2></div><span className="text-xs text-muted-foreground">{filteredProducts.length} productos</span></div>

        {filteredProducts.length > 0 ? <div className="mt-4 flex flex-col divide-y divide-border rounded-3xl border border-border bg-card px-4">
          {filteredProducts.map((product) => <div key={product.name} className="flex items-center gap-3 py-4"><span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-primary"><Package className="size-[18px]" /></span><span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold">{product.name}</span><span className="mt-0.5 block text-xs text-muted-foreground">{product.unit} · <span className={product.stock <= 2 ? "text-accent" : ""}>{product.stock === 0 ? "Sin stock" : `${product.stock} en stock`}</span></span></span><span className="flex shrink-0 items-center gap-2 text-right"><span><span className="block text-sm font-semibold">{product.price}</span><span className="mt-0.5 block text-[11px] text-muted-foreground">{product.category}</span></span><button onClick={() => setEditingProduct(product.name)} aria-label={`Ajustar stock de ${product.name}`} className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground"><Pencil className="size-3.5" /></button></span></div>)}
        </div> : <div className="mt-4 rounded-3xl border border-border bg-card px-5 py-10 text-center"><Search className="mx-auto size-7 text-muted-foreground" /><p className="mt-3 text-sm font-semibold">No encontramos productos</p><p className="mt-1 text-xs text-muted-foreground">Probá con otro nombre o revisá la ortografía.</p></div>}

        <section className="mt-6"><button className="flex w-full items-center justify-between rounded-2xl border border-border bg-card px-4 py-3 text-left" onClick={() => setShowNoPrice(!showNoPrice)}><span><span className="block text-sm font-semibold">Productos sin precio</span><span className="mt-0.5 block text-xs text-muted-foreground">{noPriceProducts.length} pendientes de completar</span></span><ChevronDown className={`size-4 text-muted-foreground transition-transform ${showNoPrice ? "rotate-180" : ""}`} /></button>{showNoPrice && <div className="mt-2 flex flex-col divide-y divide-border rounded-2xl border border-border bg-card px-4">{noPriceProducts.map((product) => <div key={product.name} className="flex items-center justify-between py-3"><span><span className="block text-sm font-medium">{product.name}</span><span className="text-xs text-muted-foreground">{product.category}</span></span><button className="rounded-full border border-border px-3 py-1.5 text-xs font-medium">Completar</button></div>)}</div>}</section>

        {editingProduct && <div className="fixed inset-0 z-20 flex items-end justify-center bg-foreground/20 px-5 pb-6"><div className="w-full max-w-[440px] rounded-3xl border border-border bg-card p-5 shadow-lg"><div className="flex items-start justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Stock</p><h2 className="mt-1 text-lg font-semibold">Ajustar stock</h2><p className="mt-1 text-xs text-muted-foreground">{editingProduct}</p></div><button aria-label="Cerrar ajuste" onClick={() => setEditingProduct(null)}><X className="size-5 text-muted-foreground" /></button></div><label className="mt-5 block text-xs font-medium text-muted-foreground" htmlFor="stock-input">Cantidad actual</label><input id="stock-input" defaultValue={products.find((product) => product.name === editingProduct)?.stock} type="number" min="0" step="0.1" className="mt-2 h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus:border-primary" /><button className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3 text-sm font-semibold text-primary-foreground" onClick={() => { setSavedProduct(editingProduct); setEditingProduct(null); }}><Check className="size-4" />Guardar cambio</button></div></div>}
        {savedProduct && <button className="fixed bottom-24 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-xs font-medium text-background shadow-lg" onClick={() => setSavedProduct(null)}><Check className="size-3.5" />Stock actualizado para {savedProduct}</button>}
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-10 border-t border-border bg-background/95 px-5 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md" aria-label="Navegación principal"><div className="mx-auto flex max-w-[440px] items-center justify-between">{navItems.map(({ label, icon: Icon }) => { const isActive = activeNav === label; return <button key={label} onClick={() => setActiveNav(label)} className={`flex min-w-16 flex-col items-center gap-1 text-[11px] font-medium transition-colors ${isActive ? "text-foreground" : "text-muted-foreground"}`} aria-current={isActive ? "page" : undefined}><Icon className="size-[19px]" strokeWidth={isActive ? 2.4 : 1.7} /><span>{label}</span></button>; })}</div></nav>
    </main>
  );
}
