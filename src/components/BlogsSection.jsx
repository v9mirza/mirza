import { useEffect, useState } from 'react'

const HASHNODE_USERNAME = 'v9mirza'
const PAGE_SIZE = 20

async function getPublicationId() {
  const query = `
    query GetPubId($username: String!) {
      user(username: $username) {
        publications(first: 1) {
          edges { node { id } }
        }
      }
    }
  `
  const res = await fetch('https://gql.hashnode.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { username: HASHNODE_USERNAME } }),
  })
  const json = await res.json()
  return json?.data?.user?.publications?.edges?.[0]?.node?.id
}

async function fetchPage(publicationId, after = null) {
  const query = `
    query GetPosts($id: ObjectId!, $first: Int!, $after: String) {
      publication(id: $id) {
        posts(first: $first, after: $after) {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              title
              brief
              slug
              url
              publishedAt
              readTimeInMinutes
              tags { name }
            }
          }
        }
      }
    }
  `
  const res = await fetch('https://gql.hashnode.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      variables: { id: publicationId, first: PAGE_SIZE, after },
    }),
  })
  const json = await res.json()
  return json?.data?.publication?.posts
}

// Fetches ALL blogs using cursor-based pagination. Pass limit to cap.
export async function fetchBlogs(limit = null) {
  const pubId = await getPublicationId()
  if (!pubId) return []

  const allPosts = []
  let cursor = null

  while (true) {
    const page = await fetchPage(pubId, cursor)
    if (!page) break

    allPosts.push(...page.edges.map((e) => e.node))

    if (!page.pageInfo.hasNextPage) break
    if (limit != null && allPosts.length >= limit) break
    cursor = page.pageInfo.endCursor
  }

  return limit != null ? allPosts.slice(0, limit) : allPosts
}

export function BlogCard({ blog }) {
  const date = new Date(blog.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
  const tag = blog.tags?.[0]?.name

  return (
    <a
      href={blog.url}
      target="_blank"
      rel="noreferrer noopener"
      className="border-soft bg-card group block rounded-md border p-3 sm:p-4 transition-all duration-300 hover:-translate-y-[2px] hover:scale-[1.01] hover:border-[#d98973]/50 hover:shadow-lg hover:shadow-[#d98973]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d98973]/60"
    >
      <div className="mb-2 flex items-center gap-2">
        <p className="text-[11px] uppercase tracking-[0.16em] text-[#7f8590] transition-colors duration-300 group-hover:text-[#d98973]/70">
          {date}
        </p>
        {tag && (
          <>
            <span className="text-[#3a3f4a] text-[11px]">·</span>
            <span className="text-[11px] text-[#7f8590]">{tag}</span>
          </>
        )}
        <span className="ml-auto text-[11px] text-[#555c68]">
          {blog.readTimeInMinutes} min read
        </span>
      </div>
      <h3 className="text-heading text-[15px] font-medium sm:text-[16px] leading-snug transition-colors duration-300 group-hover:text-[#d98973]">
        {blog.title}
      </h3>
      {blog.brief && (
        <p className="text-muted mt-2 text-[13px] leading-[1.58] line-clamp-2">
          {blog.brief}
        </p>
      )}
      <div className="mt-4 inline-flex items-center gap-2 text-[12px] text-[#c8ced8] transition-all duration-300">
        <span className="underline decoration-transparent underline-offset-4 transition-all duration-300 group-hover:decoration-[#d98973]/60">
          Read blog
        </span>
        <span className="text-[11px] text-[#969faf] opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5">
          ↗
        </span>
      </div>
    </a>
  )
}

export function BlogSkeleton() {
  return (
    <div className="border-soft bg-card rounded-md border p-3 sm:p-4 animate-pulse">
      <div className="mb-2 flex gap-2">
        <div className="h-3 w-20 rounded bg-[#2a303b]" />
        <div className="h-3 w-14 rounded bg-[#2a303b]" />
      </div>
      <div className="h-4 w-3/4 rounded bg-[#2a303b] mb-2" />
      <div className="h-3 w-full rounded bg-[#2a303b] mb-1" />
      <div className="h-3 w-5/6 rounded bg-[#2a303b]" />
    </div>
  )
}

export default BlogSkeleton
