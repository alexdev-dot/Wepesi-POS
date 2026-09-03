import Image from "next/image"
import { ShoppingBag, Box, BarChart3, Users } from "lucide-react"

const features = [
  { icon: Box, label: "Inventory\nManagement" },
  { icon: BarChart3, label: "Real-time\nReports" },
  { icon: Users, label: "Multi-user\nAccess" },
]

export function BrandPanel() {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-linear-to-br from-slate-800 to-slate-900 p-8 text-white lg:p-10">
      {/* Full hardware photo anchored to the bottom, whole set visible */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0">
        <Image
          src="/pos-hardware.png"
          alt="Point of sale hardware including a touchscreen terminal, receipt printer, cash drawer and barcode scanner"
          width={1401}
          height={1131}
          className="h-auto w-full object-contain"
          priority
        />
        {/* Blend the top edge of the photo into the panel */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-2/5 bg-[linear-gradient(to_bottom,#1e293b_0%,color-mix(in_oklab,#1e293b_70%,transparent)_45%,transparent_100%)]"
        />
      </div>
      {/* Base gradient wash so the upper area stays solid behind the copy */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_bottom,#1e293b_0%,#1e293b_18%,color-mix(in_oklab,#1e293b_55%,transparent)_40%,transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(120%_80%_at_80%_15%,rgba(48,181,74,0.15),transparent_55%)]"
      />
      <div className="relative z-10 flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center justify-center pt-4">
        <Image
          src="/logo.png"
          alt="POS System Logo"
          width={600}
          height={240}
          className="h-56 w-auto object-contain"
          priority
        />
      </div>

      {/* Heading */}
      <div className="mt-10">
        <h1 className="font-heading text-4xl font-extrabold leading-[1.1] tracking-tight text-balance lg:text-[2.75rem]">
          Smart POS.
          <br />
          Simplify <span className="text-[#30B54A]">Sales.</span>
        </h1>
        <p className="mt-5 max-w-88 text-sm leading-relaxed text-white/80">
          Manage your sales, inventory, customers and reports — all in one powerful point of sale solution.
        </p>
      </div>

      {/* Spacer so the photo shows through between heading and chips */}
      <div className="flex-1" />

      {/* Feature chips */}
      <div className="mt-6 grid grid-cols-3 gap-3 rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur-md">
        {features.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#30B54A]/20 text-[#30B54A]">
              <Icon className="h-4 w-4" />
            </span>
            <span className="whitespace-pre-line text-xs font-semibold leading-tight">{label}</span>
          </div>
        ))}
      </div>
      </div>
    </div>
  )
}
