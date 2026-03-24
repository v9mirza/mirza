import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { fetchBlogs, BlogCard, BlogSkeleton } from '../components/BlogsSection'
import { useFadeIn } from '../hooks/useFadeIn'

import { motion } from 'framer-motion'

function BlogsPage() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [ref, isVisible] = useFadeIn({ threshold: 0.1 })

  useEffect(() => {
    fetchBlogs()
      .then(setBlogs)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="relative min-h-screen bg-[#18181b]"
    >
      <Navbar />
      <main className="relative z-[1] mx-auto w-full max-w-[760px] px-3 sm:px-4 md:px-5">
        {/* Page Header */}
        <section
          ref={ref}
          className={`border-b border-soft py-7 sm:py-8 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-muted text-[13px] sm:text-[14px]">
            technical writing • dev tools • system design
          </p>
          <h1 className="font-title text-accent mt-2 text-[38px] font-medium leading-none tracking-tight sm:text-[42px] md:text-[46px]">
            Blogs
          </h1>
          <p className="mt-3.5 max-w-[62ch] text-pretty text-[13px] leading-[1.58] text-[#a7adb8] sm:mt-4 sm:text-[14px]">
            I write about developer tools, system design, and ideas I find worth
            thinking through clearly. Hosted on Hashnode.
          </p>
        </section>

        {/* Blog List */}
        <section className="py-7 sm:py-8">
          {loading && (
            <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
              {[...Array(6)].map((_, i) => (
                <BlogSkeleton key={i} />
              ))}
            </div>
          )}

          {error && (
            <p className="text-muted text-[13px]">
              Couldn't load blogs right now.{' '}
              <a
                href="https://hashnode.com/@v9mirza"
                target="_blank"
                rel="noreferrer noopener"
                className="underline decoration-[#747b88] underline-offset-2 transition-colors hover:text-[#d98973]"
              >
                Visit my Hashnode
              </a>{' '}
              instead.
            </p>
          )}

          {!loading && !error && blogs.length === 0 && (
            <p className="text-muted text-[13px]">No blogs published yet.</p>
          )}

          {!loading && !error && blogs.length > 0 && (
            <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
              {blogs.map((blog) => (
                <BlogCard key={blog.slug} blog={blog} />
              ))}
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="border-soft border-t py-6 sm:py-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-muted text-[11px] leading-[1.2] opacity-80">
              © 2026 Hassan Mirza · Open to work
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
      </main>
    </motion.div>
  )
}

export default BlogsPage
