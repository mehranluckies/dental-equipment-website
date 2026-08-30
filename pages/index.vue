<template>
  <div class="home">
    <HeroSection />
    <RevealSection direction="up">
      <TrustSection />
    </RevealSection>
    <RevealSection direction="left">
      <SolutionsSection />
    </RevealSection>
    <RevealSection direction="right">
      <ProductsSection />
    </RevealSection>
    <RevealSection direction="right">
      <WhyChooseSection />
    </RevealSection>

    <RevealSection direction="left">
      <FeaturedProductsSection />
    </RevealSection>
    <RevealSection direction="up">
      <WorkflowSection />
    </RevealSection>

    <RevealSection direction="up">
      <CaseStudiesSection />
    </RevealSection>

    <RevealSection direction="left">
      <TestimonialsSection />
    </RevealSection>

    <RevealSection direction="right">
      <BlogSection />
    </RevealSection>

    <RevealSection direction="up">
      <CTASection />
    </RevealSection>
  </div>
  
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'DentalTech Pro - Advanced Digital Dentistry Equipment',
  description: 'Premium dental equipment and digital dentistry solutions for modern dental practices. From intraoral scanners to 3D printers and CAD/CAM systems.',
  ogTitle: 'DentalTech Pro - Advanced Digital Dentistry Equipment',
  ogDescription: 'Premium dental equipment and digital dentistry solutions for modern dental practices.',
  ogImage: '/images/og-home.jpg'
})
</script>
