import type { Metadata } from 'next'

import { notFound } from 'next/navigation'

import { TopicDetail } from '@/components/block/common/topic-detail'
import { getPracticeTopic, practiceTopics } from '@/data/topics'

export function generateStaticParams() {
  return practiceTopics.map((topic) => ({ slug: topic.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const topic = getPracticeTopic(slug)
  if (!topic) {
    return { title: 'Topik tidak ditemukan' }
  }
  return { title: topic.title, description: topic.short }
}

export default async function PracticeTopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const topic = getPracticeTopic(slug)

  if (!topic) {
    notFound()
  }

  return (
    <TopicDetail
      topic={topic}
      siblings={practiceTopics}
      basePath="/practice"
      sectionLabel="Practice"
    />
  )
}
