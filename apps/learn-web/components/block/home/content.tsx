'use client'

import CtaSection from './cta-section'
import FeatureSection from './features-section'
import HeroSection from './hero-section'
import PracticeSection from './practice-section'
import StatSection from './stats-section'
import TheorySection from './theory-section'

export default function HomeContent() {
  return (
    <>
      <HeroSection />
      <StatSection />
      <TheorySection />
      <PracticeSection />
      <FeatureSection />
      <CtaSection />
    </>
  )
}
