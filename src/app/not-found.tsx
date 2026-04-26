import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] px-6 font-mono text-zinc-300">
      <div className="w-full max-w-lg">
        <div className="mb-8 space-y-1 text-xs text-zinc-500">
          <p>
            <span className="text-blue-500">$</span> GET /route
          </p>
          <p>
            <span className="text-red-500/80">✗</span> Error: route not found
          </p>
          <p>
            <span className="text-red-500/80">✗</span> exit code: 404
          </p>
        </div>

        <p className="mb-2 text-[10px] font-bold tracking-widest text-zinc-600 uppercase">
          Not Found
        </p>
        <h1 className="mb-4 text-8xl font-bold tracking-tight text-white">404</h1>
        <p className="mb-10 text-sm text-zinc-400">This route does not exist.</p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:border-blue-500/40 hover:bg-white/10 hover:shadow-[0_0_20px_var(--glow-blue)] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] focus-visible:outline-none"
        >
          <span className="text-blue-500">~/</span> Return to root
        </Link>
      </div>
    </div>
  )
}
