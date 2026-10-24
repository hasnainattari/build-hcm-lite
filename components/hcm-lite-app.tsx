'use client'

import { useState } from 'react'
import {
  ArrowRight,
  Bell,
  Building2,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  FileText,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  Menu,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Users,
  WalletCards,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

type SetupValues = { company: string; name: string; email: string; password: string }

const steps = ['Company', 'Admin account', 'Ready']

export function HcmLiteApp() {
  const [setupStarted, setSetupStarted] = useState(false)
  const [step, setStep] = useState(0)
  const [values, setValues] = useState<SetupValues>({ company: '', name: '', email: '', password: '' })
  const [completed, setCompleted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [activeSection, setActiveSection] = useState('Overview')

  const update = (key: keyof SetupValues, value: string) => setValues((current) => ({ ...current, [key]: value }))
  const canContinue = step === 0 ? values.company.trim().length >= 2 : Boolean(values.name.trim() && values.email.includes('@') && values.password.length >= 8)
  const moduleCards: Record<string, string[][]> = {
    People: [['Employee directory', 'Register and manage employee profiles', 'Add employee']],
    Attendance: [['Daily attendance board', 'Review check-ins, late arrivals, and corrections', 'Open attendance']],
    'Leave & payroll': [['Leave approvals', 'Review requests and track balances', 'Review requests'], ['Payroll workspace', 'Build draft payroll and review payslips', 'Open payroll']],
    Announcements: [['Company announcements', 'Keep everyone aligned with timely updates', 'Create announcement']],
  }

  if (completed) {
    const metrics = [
      { label: 'Total headcount', value: '0', detail: 'No employees added yet', icon: Users },
      { label: 'Present today', value: '0%', detail: 'Attendance will appear here', icon: Clock3 },
      { label: 'Payroll cost', value: '₹0', detail: 'No payroll runs yet', icon: WalletCards },
      { label: 'Attrition YTD', value: '0%', detail: 'No exits recorded', icon: FileText },
    ]
    return (
      <main className="min-h-screen bg-[#f6f8fb] text-slate-950">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3"><div className="flex size-9 items-center justify-center rounded-xl bg-indigo-600 text-white"><Sparkles className="size-4" /></div><span className="text-base font-bold tracking-tight">HCM <span className="text-indigo-600">Lite</span></span><span className="hidden rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 sm:inline">Admin workspace</span></div>
            <div className="flex items-center gap-1.5"><button aria-label="Search" className="hidden rounded-xl p-2 text-slate-500 hover:bg-slate-50 sm:block"><Search className="size-4" /></button><button aria-label="Notifications" className="rounded-xl p-2 text-slate-500 hover:bg-slate-50"><Bell className="size-4" /></button><button aria-label="Settings" className="rounded-xl p-2 text-slate-500 hover:bg-slate-50"><Settings2 className="size-4" /></button><div className="ml-1 flex size-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">AK</div></div>
          </div>
        </header>
        <div className="mx-auto flex max-w-[1500px]">
          <aside className="hidden w-60 shrink-0 border-r border-slate-200 bg-white px-3 py-6 lg:block"><p className="px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Workspace</p><nav className="mt-3 grid gap-1">{[['Overview', LayoutDashboard], ['People', Users], ['Attendance', Clock3], ['Leave & payroll', WalletCards], ['Announcements', Bell]].map(([label, Icon]) => <button key={label as string} onClick={() => setActiveSection(label as string)} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium ${activeSection === label ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50'}`}><Icon className="size-4" />{label as string}</button>)}</nav><div className="mt-8 border-t border-slate-100 pt-5"><button onClick={() => { setCompleted(false); setSetupStarted(false); setStep(0) }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-50"><LogOut className="size-4" />Review setup</button></div></aside>
          <section className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm font-semibold text-indigo-600">Monday, October 26, 2026</p><h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">{activeSection === 'Overview' ? `Good morning, ${values.name.split(' ')[0] || 'Admin'}` : activeSection}</h1><p className="mt-2 text-sm text-slate-500">{activeSection === 'Overview' ? `Here&apos;s what&apos;s happening across ${values.company}.` : `Manage ${activeSection.toLowerCase()} from your admin workspace.`}</p></div><Button variant="outline" className="w-full sm:w-auto"><Bell data-icon="inline-start" />Post announcement</Button></div>
            <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{metrics.map(({ label, value, detail, icon: Icon }) => <article key={label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex items-center justify-between"><p className="text-xs font-medium text-slate-500">{label}</p><Icon className="size-4 text-indigo-500" /></div><p className="mt-4 text-2xl font-semibold tracking-tight">{value}</p><p className="mt-1 text-xs text-slate-400">{detail}</p></article>)}</div>
            {activeSection !== 'Overview' && <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{(moduleCards[activeSection] || []).map(([title, detail, action]) => <article key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex size-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"><Sparkles className="size-4" /></div><h2 className="mt-4 font-semibold">{title}</h2><p className="mt-1 text-sm leading-6 text-slate-500">{detail}</p><Button variant="outline" size="sm" className="mt-5">{action}<ArrowRight data-icon="inline-end" /></Button></article>)}</div>}
            <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_.8fr]"><article className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex items-center justify-between"><div><h2 className="font-semibold">Attendance overview</h2><p className="mt-1 text-xs text-slate-500">Your weekly attendance trend</p></div><select className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-500" defaultValue="7"><option value="7">Last 7 days</option></select></div><div className="mt-8 flex h-40 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/60 text-center"><div><Clock3 className="mx-auto size-6 text-slate-300" /><p className="mt-2 text-sm font-medium text-slate-500">No attendance data yet</p><p className="mt-1 text-xs text-slate-400">Add employees to start tracking</p></div></div></article><article className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex items-center justify-between"><div><h2 className="font-semibold">Team by department</h2><p className="mt-1 text-xs text-slate-500">Current headcount distribution</p></div><Users className="size-4 text-indigo-500" /></div><div className="flex h-40 items-center justify-center text-center"><div><Building2 className="mx-auto size-6 text-slate-300" /><p className="mt-2 text-sm font-medium text-slate-500">No departments yet</p><Button variant="link" className="mt-1 h-auto p-0 text-xs text-indigo-600">Set up departments <ChevronRight data-icon="inline-end" /></Button></div></div></article></div>
            <div className="mt-6 grid gap-6 lg:grid-cols-2"><article className="rounded-2xl border border-slate-200 bg-white p-5"><h2 className="font-semibold">Recent activity</h2><div className="flex min-h-28 items-center justify-center text-sm text-slate-400">Audit activity will appear here</div></article><article className="rounded-2xl border border-slate-200 bg-white p-5"><h2 className="font-semibold">Announcements</h2><div className="flex min-h-28 items-center justify-center text-sm text-slate-400">No announcements yet</div></article></div>
          </section>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-950">
      <header className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:gap-4 sm:px-8 sm:py-5">
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-3"><div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white"><Sparkles className="size-4" /></div><span className="truncate text-base font-bold tracking-tight sm:text-lg">HCM <span className="text-indigo-600">Lite</span></span></div>
        <div className="hidden shrink-0 items-center gap-2 text-sm text-slate-500 sm:flex"><ShieldCheck className="size-4 text-emerald-600" /> Private by design</div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-8 pt-6 sm:gap-10 sm:px-8 sm:pb-12 sm:pt-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-20 lg:pt-16">
        <section className="min-w-0">
          <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 sm:mb-6"><Sparkles className="size-3.5 shrink-0" /> <span className="truncate">AI-assisted people operations</span></div>
          <h1 className="max-w-xl text-[2.65rem] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-6xl">A calmer way to run your <span className="text-indigo-600">people ops.</span></h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-500 sm:mt-6 sm:text-lg">HCM Lite brings attendance, leave, payroll, and people insights into one focused workspace built for growing teams.</p>
          <div className="mt-7 grid max-w-lg grid-cols-2 gap-2.5 sm:mt-9 sm:grid-cols-4 sm:gap-3">
            {[[Users, 'People'], [Clock3, 'Attendance'], [FileText, 'Payroll'], [CircleHelp, 'AI help']].map(([Icon, label]) => <div key={label as string} className="rounded-2xl border border-slate-200 bg-white p-3.5"><Icon className="size-4 text-indigo-600" /><p className="mt-4 text-xs font-medium text-slate-600">{label as string}</p></div>)}
          </div>
        </section>

        <section className="min-w-0 rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_24px_80px_-40px_rgba(15,23,42,.35)] sm:p-8">
          {!setupStarted ? <>
            <div className="flex items-start justify-between"><div><p className="text-sm font-semibold text-indigo-600">First-run setup</p><h2 className="mt-2 text-2xl font-semibold tracking-tight">Create your workspace</h2><p className="mt-2 text-sm leading-6 text-slate-500">Start with a secure Admin account. You can add your HR team after setup.</p></div><div className="rounded-xl bg-slate-50 p-3"><Building2 className="size-5 text-slate-500" /></div></div>
            <div className="mt-8 grid gap-3">{[['01', 'Company settings', 'Office hours, weekends, and location'], ['02', 'Admin access', 'Your first account and secure sign-in'], ['03', 'Ready to grow', 'Invite HR and add your people']].map(([number, title, text]) => <div key={number} className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4"><span className="text-xs font-bold text-indigo-600">{number}</span><div><p className="text-sm font-semibold">{title}</p><p className="mt-1 text-xs text-slate-500">{text}</p></div></div>)}</div>
            <Button className="mt-8 h-11 w-full" onClick={() => setSetupStarted(true)}>Begin setup <ArrowRight data-icon="inline-end" /></Button>
            <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-slate-400"><LockKeyhole className="size-3.5" /> No data is created until you finish setup.</p>
          </> : <>
            <div className="flex items-center justify-between"><div><p className="text-sm font-semibold text-indigo-600">Step {step + 1} of 3</p><h2 className="mt-2 text-2xl font-semibold tracking-tight">{steps[step]}</h2></div><span className="text-sm text-slate-400">{Math.round(((step + 1) / 3) * 100)}%</span></div>
            <div className="mt-5 flex gap-1.5">{steps.map((item, index) => <div key={item} className={`h-1.5 flex-1 rounded-full ${index <= step ? 'bg-indigo-600' : 'bg-slate-100'}`} />)}</div>
            {step === 0 && <div className="mt-8"><label className="text-sm font-medium" htmlFor="company">Company name</label><input id="company" autoFocus value={values.company} onChange={(event) => update('company', event.target.value)} placeholder="e.g. Northstar Labs" className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" /><p className="mt-2 text-xs text-slate-400">You can change company settings later from Admin.</p></div>}
            {step === 1 && <div className="mt-8 grid gap-4"><div><label className="text-sm font-medium" htmlFor="name">Admin name</label><input id="name" autoFocus value={values.name} onChange={(event) => update('name', event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" placeholder="e.g. Ayesha Khan" /></div><div><label className="text-sm font-medium" htmlFor="email">Work email</label><input id="email" type="email" value={values.email} onChange={(event) => update('email', event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" placeholder="you@company.com" /></div><div><label className="text-sm font-medium" htmlFor="password">Password</label><div className="relative mt-2"><input id="password" type={showPassword ? 'text' : 'password'} value={values.password} onChange={(event) => update('password', event.target.value)} className="h-11 w-full rounded-xl border border-slate-200 px-3 pr-20 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" placeholder="At least 8 characters" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-xs font-medium text-indigo-600">{showPassword ? 'Hide' : 'Show'}</button></div></div></div>}
            {step === 2 && <div className="mt-8 rounded-2xl bg-slate-50 p-5"><p className="text-sm font-semibold">Review your setup</p><dl className="mt-4 grid gap-3 text-sm"><div className="flex justify-between gap-4"><dt className="text-slate-500">Company</dt><dd className="font-medium">{values.company}</dd></div><div className="flex justify-between gap-4"><dt className="text-slate-500">Admin</dt><dd className="font-medium">{values.name}</dd></div><div className="flex justify-between gap-4"><dt className="text-slate-500">Email</dt><dd className="max-w-[58%] truncate text-right font-medium">{values.email}</dd></div></dl><div className="mt-5 flex gap-2 rounded-xl bg-emerald-50 p-3 text-xs leading-5 text-emerald-700"><ShieldCheck className="mt-0.5 size-4 shrink-0" /> Default policies are ready: 09:00 start, 15-minute grace, Sat–Sun weekend.</div></div>}
            <div className="mt-8 grid gap-3 sm:flex"><Button variant="outline" className="h-11 w-full flex-1 sm:w-auto" onClick={() => step === 0 ? setSetupStarted(false) : setStep(step - 1)}>Back</Button><Button className="h-11 w-full flex-1 sm:w-auto" disabled={!canContinue} onClick={() => step === 2 ? setCompleted(true) : setStep(step + 1)}>{step === 2 ? 'Create workspace' : 'Continue'} {step < 2 && <ChevronRight data-icon="inline-end" />}</Button></div>
          </>}
        </section>
      </div>
      <footer className="mx-auto flex max-w-7xl items-center justify-between px-5 pb-6 text-xs text-slate-400 sm:px-8"><span>Phase 1 foundation</span><span className="flex items-center gap-1.5"><LayoutDashboard className="size-3.5" /> Built for focused teams</span></footer>
    </main>
  )
}
