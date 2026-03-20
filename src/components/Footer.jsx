function Footer() {
  return (
    <footer className="border-soft border-t py-6 sm:py-7">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted text-[11px] leading-[1.2] opacity-80">
          &copy; 2026 Hassan Mirza · Open to work
        </p>
        <a
          href="mailto:v9mirza@proton.me"
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center justify-center rounded-md border border-[#2a303b] px-3 py-1.5 text-[12px] leading-[1.2] text-[#c7cdd7] transition-all duration-200 hover:border-[#d98973]/55 hover:text-[#e2c8bf] hover:scale-105 hover:shadow-md hover:shadow-[#d98973]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d98973]/60"
        >
          Let&apos;s work together
        </a>
      </div>
    </footer>
  )
}

export default Footer
