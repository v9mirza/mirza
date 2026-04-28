import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { fetchBlogs, BlogCard, BlogSkeleton } from '../components/BlogsSection'
import { useFadeIn } from '../hooks/useFadeIn'

import { motion } from 'framer-motion'

function BlogsPage() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(6)
  const [ref, isVisible] = useFadeIn({ threshold: 0.1 })

  const loadBlogs = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchBlogs(18)
      setBlogs(data)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const previousTitle = document.title
    const descriptionMeta = document.querySelector('meta[name="description"]')
    const previousDescription = descriptionMeta?.getAttribute('content')

    document.title = 'Blogs | Hassan Mirza'
    if (descriptionMeta) {
      descriptionMeta.setAttribute(
        'content',
        'Technical writing by Hassan Mirza on developer tools, system design, and full-stack engineering workflows.',
      )
    }

    return () => {
      document.title = previousTitle
      if (descriptionMeta && previousDescription) {
        descriptionMeta.setAttribute('content', previousDescription)
      }
    }
  }, [])

  useEffect(() => {
    loadBlogs()
  }, [])

  const filteredBlogs = blogs.filter((blog) => {
    const lowerQuery = query.trim().toLowerCase()
    return (
      !lowerQuery ||
      blog.title.toLowerCase().includes(lowerQuery) ||
      (blog.brief || '').toLowerCase().includes(lowerQuery)
    )
  })

  const featuredBlog = filteredBlogs[0] || null
  const listBlogs = filteredBlogs.slice(1)
  const visibleBlogs = listBlogs.slice(0, visibleCount)
  const hasMore = visibleCount < listBlogs.length

  useEffect(() => {
    setVisibleCount(6)
  }, [query])

  const handleRetry = () => {
    loadBlogs()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="relative min-h-screen bg-[#18181b]"
    >
      <Navbar />
      <main className="relative z-[1] mx-auto w-full max-w-[700px] px-4 sm:px-5 md:px-6">
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
          {!loading && !error && (
            <div className="mb-5">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                className="border-soft w-full rounded-md border bg-transparent px-3 py-2 text-[13px] text-[#d6dae2] placeholder:text-[#727985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d98973]/60 sm:text-[14px]"
              />
            </div>
          )}

          {loading && (
            <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
              {[...Array(6)].map((_, i) => (
                <BlogSkeleton key={i} />
              ))}
            </div>
          )}

          {error && (
            <div className="border-soft rounded-md border p-3 sm:p-4">
              <p className="text-muted text-[13px]">
                Couldn't load blogs right now.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleRetry}
                  className="rounded-md border border-[#2a303b] px-3 py-1.5 text-[12px] text-[#c7cdd7] transition-colors hover:border-[#d98973]/55 hover:text-[#e2c8bf] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d98973]/60"
                >
                  Try again
                </button>
                <a
                  href="https://hashnode.com/@v9mirza"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center rounded-md border border-[#2a303b] px-3 py-1.5 text-[12px] text-[#c7cdd7] transition-colors hover:border-[#d98973]/55 hover:text-[#e2c8bf] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d98973]/60"
                >
                  Visit Hashnode
                </a>
              </div>
            </div>
          )}

          {!loading && !error && filteredBlogs.length === 0 && (
            <p className="text-muted text-[13px]">No matching blogs found.</p>
          )}

          {!loading && !error && filteredBlogs.length > 0 && (
            <>
              {featuredBlog && (
                <div className="mb-4">
                  <p className="mb-2 text-[11px] uppercase tracking-[0.14em] text-[#7f8590]">
                    Latest article
                  </p>
                  <BlogCard blog={featuredBlog} featured />
                </div>
              )}

              {listBlogs.length > 0 && (
                <>
                  <div className="mb-3 flex items-center justify-between text-[12px] text-[#8e95a1]">
                    <p>
                      Showing {visibleBlogs.length} of {listBlogs.length} posts
                    </p>
                  </div>
                  <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                    {visibleBlogs.map((blog) => (
                      <BlogCard key={blog.slug} blog={blog} />
                    ))}
                  </div>
                  {hasMore && (
                    <button
                      type="button"
                      onClick={() => setVisibleCount((prev) => prev + 6)}
                      className="mt-4 inline-flex items-center rounded-md border border-[#2a303b] px-3 py-1.5 text-[12px] text-[#c7cdd7] transition-colors hover:border-[#d98973]/55 hover:text-[#e2c8bf] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d98973]/60"
                    >
                      Load more
                    </button>
                  )}
                </>
              )}
            </>
          )}

          {!loading && (
            <div className="mt-6">
              <a
                href="https://hashnode.com/@v9mirza"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center rounded-md border border-[#2a303b] px-3 py-1.5 text-[12px] text-[#c7cdd7] transition-colors hover:border-[#d98973]/55 hover:text-[#e2c8bf] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d98973]/60 sm:text-[13px]"
              >
                Read all blogs on Hashnode
              </a>
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
