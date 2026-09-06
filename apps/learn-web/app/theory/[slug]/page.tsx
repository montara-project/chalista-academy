import type { Metadata } from 'next'

import { notFound } from 'next/navigation'

import { TopicDetail } from '@/components/block/common/topic-detail'
import { getTheoryTopic, theoryTopics } from '@/data/topics'

export function generateStaticParams() {
  return theoryTopics.map((topic) => ({ slug: topic.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const topic = getTheoryTopic(slug)
  if (!topic) {
    return { title: 'Topik tidak ditemukan' }
  }
  return { title: topic.title, description: topic.short }
}

export default async function TheoryTopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const topic = getTheoryTopic(slug)

  if (!topic) {
    notFound()
  }

  return (
    <TopicDetail topic={topic} siblings={theoryTopics} basePath="/theory" sectionLabel="Theory" />
  )
}
