import type { Product } from '~/types'

export const products: Product[] = [
  // INTRAORAL SCANNERS
  {
    id: '1',
    slug: 'oralscan-elite-pro',
    name: 'OralScan Elite Pro',
    sku: 'OS-EP-001',
    tagline: 'Professional Wireless Intraoral Scanner',
    description: 'Advanced wireless intraoral scanner with AI-powered scanning technology and real-time color matching.',
    longDescription: 'The OralScan Elite Pro represents the pinnacle of digital impression technology. Featuring advanced AI algorithms, wireless connectivity, and unparalleled accuracy, this scanner transforms your chairside workflow. With real-time shade detection and instant feedback, you can deliver superior patient care while maximizing efficiency.',
    categoryId: '1',
    heroImage: '/images/products/oralscan-elite-pro.jpg',
    galleryImages: ['/images/products/oralscan-elite-pro-1.jpg', '/images/products/oralscan-elite-pro-2.jpg', '/images/products/oralscan-elite-pro-3.jpg'],
    videoUrl: 'https://www.youtube.com/watch?v=example',
    keyFeatures: [
      { title: 'Wireless Freedom', description: 'True wireless design for unrestricted movement and patient comfort' },
      { title: 'AI-Powered Accuracy', description: 'Advanced algorithms ensure precision scans every time' },
      { title: 'Real-Time Color', description: 'Integrated shade matching for natural-looking restorations' },
      { title: 'Fast Scanning', description: 'Complete full-arch scans in under 60 seconds' }
    ],
    specifications: [
      { label: 'Scan Speed', value: 'Full arch < 60 seconds', group: 'Performance' },
      { label: 'Accuracy', value: '±5 μm', group: 'Technical' },
      { label: 'Weight', value: '280g', group: 'Physical' },
      { label: 'Connectivity', value: 'Wireless WiFi 6', group: 'Technical' },
      { label: 'Battery Life', value: '4 hours continuous', group: 'Performance' },
      { label: 'Scan Tip', value: 'Autoclavable', group: 'Physical' }
    ],
    applications: ['Crown & Bridge', 'Implantology', 'Orthodontics', 'Prosthetics', 'Veneers'],
    isNew: true,
    isFeatured: true,
    badges: ['New', 'Wireless', 'AI-Powered'],
    relatedProductIds: ['2', '7', '15'],
    publishedAt: new Date('2026-07-01')
  },
  {
    id: '2',
    slug: 'oralscan-x3',
    name: 'OralScan X3',
    sku: 'OS-X3-001',
    tagline: 'Compact High-Performance Scanner',
    description: 'Lightweight wired intraoral scanner designed for precision and affordability.',
    longDescription: 'The OralScan X3 delivers professional-grade scanning in a compact, affordable package. Perfect for practices looking to transition to digital dentistry, this scanner offers exceptional accuracy and ease of use without compromising on quality.',
    categoryId: '1',
    heroImage: '/images/products/oralscan-x3.jpg',
    galleryImages: ['/images/products/oralscan-x3-1.jpg', '/images/products/oralscan-x3-2.jpg'],
    keyFeatures: [
      { title: 'Lightweight Design', description: 'Only 180g for reduced hand fatigue' },
      { title: 'High Accuracy', description: 'Professional-grade precision at an accessible price' },
      { title: 'Easy Integration', description: 'Compatible with major CAD software platforms' },
      { title: 'Reliable Connection', description: 'Stable wired USB-C connectivity' }
    ],
    specifications: [
      { label: 'Scan Speed', value: 'Full arch < 90 seconds', group: 'Performance' },
      { label: 'Accuracy', value: '±7 μm', group: 'Technical' },
      { label: 'Weight', value: '180g', group: 'Physical' },
      { label: 'Connectivity', value: 'USB-C', group: 'Technical' },
      { label: 'Scan Tip', value: 'Autoclavable', group: 'Physical' }
    ],
    applications: ['Crown & Bridge', 'Implantology', 'Orthodontics', 'Study Models'],
    isNew: false,
    isFeatured: true,
    badges: ['Best Value'],
    relatedProductIds: ['1', '3'],
    publishedAt: new Date('2025-03-15')
  },
  {
    id: '3',
    slug: 'oralscan-compact',
    name: 'OralScan Compact',
    sku: 'OS-C-001',
    tagline: 'Entry-Level Digital Scanning',
    description: 'Affordable entry point into digital dentistry with reliable performance.',
    longDescription: 'Start your digital dentistry journey with the OralScan Compact. This entry-level scanner provides reliable scanning performance and seamless workflow integration, making it the perfect choice for practices new to digital impressions.',
    categoryId: '1',
    heroImage: '/images/products/oralscan-compact.jpg',
    galleryImages: ['/images/products/oralscan-compact-1.jpg'],
    keyFeatures: [
      { title: 'Affordable Entry', description: 'Cost-effective solution for digital transformation' },
      { title: 'Simple Operation', description: 'Intuitive interface for quick learning curve' },
      { title: 'Proven Reliability', description: 'Trusted by thousands of dental practices' },
      { title: 'Full Compatibility', description: 'Works with all major lab systems' }
    ],
    specifications: [
      { label: 'Scan Speed', value: 'Full arch < 120 seconds', group: 'Performance' },
      { label: 'Accuracy', value: '±10 μm', group: 'Technical' },
      { label: 'Weight', value: '200g', group: 'Physical' },
      { label: 'Connectivity', value: 'USB 3.0', group: 'Technical' }
    ],
    applications: ['Crown & Bridge', 'Study Models', 'Orthodontics'],
    isNew: false,
    isFeatured: false,
    badges: ['Entry Level'],
    relatedProductIds: ['1', '2'],
    publishedAt: new Date('2024-06-10')
  },

  // LAB SCANNERS
  {
    id: '4',
    slug: 'labscan-ds-pro',
    name: 'LabScan DS-Pro',
    sku: 'LS-DSP-001',
    tagline: 'Professional Desktop Lab Scanner',
    description: 'High-speed laboratory scanner with automated carousel for batch scanning.',
    longDescription: 'Transform your laboratory workflow with the LabScan DS-Pro. This professional desktop scanner features automated scanning, exceptional accuracy, and impressive speed, enabling you to process more cases with consistent, superior quality.',
    categoryId: '2',
    heroImage: '/images/products/labscan-ds-pro.jpg',
    galleryImages: ['/images/products/labscan-ds-pro-1.jpg', '/images/products/labscan-ds-pro-2.jpg'],
    keyFeatures: [
      { title: 'Automated Scanning', description: 'Carousel system for unattended batch processing' },
      { title: 'Exceptional Speed', description: 'Scan a full model in under 30 seconds' },
      { title: 'Lab-Grade Accuracy', description: 'Precision engineering for perfect restorations' },
      { title: 'Open Architecture', description: 'Export to any CAD software platform' }
    ],
    specifications: [
      { label: 'Scan Speed', value: 'Single model < 30 seconds', group: 'Performance' },
      { label: 'Accuracy', value: '±3 μm', group: 'Technical' },
      { label: 'Scan Area', value: '80mm x 80mm', group: 'Physical' },
      { label: 'Light Source', value: 'Blue LED structured light', group: 'Technical' }
    ],
    applications: ['Full Dentures', 'Implant Bars', 'Crown & Bridge', 'Orthodontic Models'],
    isNew: false,
    isFeatured: true,
    badges: ['Lab Professional'],
    relatedProductIds: ['5', '11'],
    publishedAt: new Date('2025-01-20')
  },
  {
    id: '5',
    slug: 'labscan-ds-ex',
    name: 'LabScan DS-EX',
    sku: 'LS-DSEX-001',
    tagline: 'Ultra-High Precision Lab Scanner',
    description: 'Premium laboratory scanner with industry-leading accuracy for complex cases.',
    longDescription: 'The LabScan DS-EX sets the standard for laboratory scanning excellence. With unmatched accuracy and advanced scanning technology, this scanner handles the most demanding cases with ease, from full-arch implant work to intricate partial frameworks.',
    categoryId: '2',
    heroImage: '/images/products/labscan-ds-ex.jpg',
    galleryImages: ['/images/products/labscan-ds-ex-1.jpg', '/images/products/labscan-ds-ex-2.jpg'],
    keyFeatures: [
      { title: 'Ultimate Accuracy', description: 'Industry-leading ±2 μm precision' },
      { title: 'Large Scan Volume', description: 'Accommodate full-arch and complex cases' },
      { title: 'Advanced Texture', description: 'High-resolution color capture for natural results' },
      { title: 'Multi-Die Scanning', description: 'Scan multiple dies simultaneously' }
    ],
    specifications: [
      { label: 'Scan Speed', value: 'Single model < 25 seconds', group: 'Performance' },
      { label: 'Accuracy', value: '±2 μm', group: 'Technical' },
      { label: 'Scan Area', value: '100mm x 100mm', group: 'Physical' },
      { label: 'Resolution', value: '5 μm', group: 'Technical' }
    ],
    applications: ['Implant Bars', 'Full Dentures', 'Complex Prosthetics', 'Orthodontics'],
    isNew: true,
    isFeatured: true,
    badges: ['New', 'Premium', 'Lab Professional'],
    relatedProductIds: ['4', '12'],
    publishedAt: new Date('2026-05-10')
  },

  // 3D PRINTERS
  {
    id: '6',
    slug: 'dentaprint-f1',
    name: 'DentaPrint F1',
    sku: 'DP-F1-001',
    tagline: 'Fast Dental 3D Printer',
    description: 'High-speed DLP printer for models, surgical guides, and orthodontic appliances.',
    longDescription: 'The DentaPrint F1 delivers exceptional speed without compromising quality. Using advanced DLP technology, this printer produces accurate models and guides in record time, dramatically improving your laboratory or practice productivity.',
    categoryId: '3',
    heroImage: '/images/products/dentaprint-f1.jpg',
    galleryImages: ['/images/products/dentaprint-f1-1.jpg', '/images/products/dentaprint-f1-2.jpg'],
    keyFeatures: [
      { title: 'Ultra-Fast Printing', description: 'Complete models in under 30 minutes' },
      { title: 'DLP Technology', description: 'Layer-by-layer precision with superior detail' },
      { title: 'Large Build Volume', description: 'Print multiple models simultaneously' },
      { title: 'Easy Workflow', description: 'Intuitive software and automated processes' }
    ],
    specifications: [
      { label: 'Technology', value: 'DLP', group: 'Technical' },
      { label: 'Build Volume', value: '120mm x 67mm x 150mm', group: 'Physical' },
      { label: 'Layer Thickness', value: '25-100 μm', group: 'Technical' },
      { label: 'Print Speed', value: 'Up to 80mm/hour', group: 'Performance' },
      { label: 'Light Source', value: '405nm UV LED', group: 'Technical' }
    ],
    applications: ['Dental Models', 'Surgical Guides', 'Orthodontic Models', 'Try-ins'],
    isNew: false,
    isFeatured: true,
    badges: ['Fast Printing'],
    relatedProductIds: ['7', '8', '16'],
    publishedAt: new Date('2025-04-05')
  },
  {
    id: '7',
    slug: 'dentaprint-l4k',
    name: 'DentaPrint L4K',
    sku: 'DP-L4K-001',
    tagline: '4K LCD Precision Printer',
    description: 'High-resolution LCD printer for detailed dental applications.',
    longDescription: 'Experience unmatched detail with the DentaPrint L4K. This 4K LCD printer produces incredibly fine features, making it ideal for crowns, bridges, and intricate orthodontic appliances that demand the highest level of accuracy.',
    categoryId: '3',
    heroImage: '/images/products/dentaprint-l4k.jpg',
    galleryImages: ['/images/products/dentaprint-l4k-1.jpg', '/images/products/dentaprint-l4k-2.jpg'],
    keyFeatures: [
      { title: '4K Resolution', description: 'Exceptional detail for precise restorations' },
      { title: 'Reliable Performance', description: 'Consistent results print after print' },
      { title: 'Material Versatile', description: 'Compatible with wide range of dental resins' },
      { title: 'Affordable Quality', description: 'Professional results at accessible pricing' }
    ],
    specifications: [
      { label: 'Technology', value: 'LCD', group: 'Technical' },
      { label: 'Build Volume', value: '130mm x 75mm x 160mm', group: 'Physical' },
      { label: 'XY Resolution', value: '35 μm', group: 'Technical' },
      { label: 'Layer Thickness', value: '25-100 μm', group: 'Technical' },
      { label: 'Light Source', value: '405nm UV LED Array', group: 'Technical' }
    ],
    applications: ['Crowns & Bridges', 'Denture Bases', 'Splints', 'Retainers'],
    isNew: false,
    isFeatured: true,
    badges: ['4K Resolution'],
    relatedProductIds: ['6', '8', '16'],
    publishedAt: new Date('2025-02-18')
  },
  {
    id: '8',
    slug: 'dentaprint-ceramix',
    name: 'DentaPrint Ceramix',
    sku: 'DP-CMX-001',
    tagline: 'Ceramic Printing System',
    description: 'Advanced ceramic 3D printer for same-day crown and bridge production.',
    longDescription: 'Revolutionize your restorative workflow with the DentaPrint Ceramix. This breakthrough ceramic printer enables in-office production of high-strength, biocompatible ceramic restorations, eliminating lab turnaround time and providing same-day solutions for your patients.',
    categoryId: '3',
    heroImage: '/images/products/dentaprint-ceramix.jpg',
    galleryImages: ['/images/products/dentaprint-ceramix-1.jpg', '/images/products/dentaprint-ceramix-2.jpg'],
    keyFeatures: [
      { title: 'True Ceramic', description: 'Biocompatible zirconia and lithium disilicate' },
      { title: 'Same-Day Delivery', description: 'Complete crowns in hours, not days' },
      { title: 'Superior Strength', description: 'High-strength restorations for long-term success' },
      { title: 'Natural Aesthetics', description: 'Excellent translucency and color matching' }
    ],
    specifications: [
      { label: 'Technology', value: 'LCM (Lithography Ceramic Manufacturing)', group: 'Technical' },
      { label: 'Build Volume', value: '80mm x 80mm x 80mm', group: 'Physical' },
      { label: 'Materials', value: 'Zirconia, Lithium Disilicate', group: 'Technical' },
      { label: 'Flexural Strength', value: '>900 MPa', group: 'Performance' }
    ],
    applications: ['Crowns', 'Bridges', 'Inlays/Onlays', 'Veneers'],
    isNew: true,
    isFeatured: true,
    badges: ['New', 'Ceramic', 'Premium'],
    relatedProductIds: ['1', '14'],
    publishedAt: new Date('2026-06-01')
  },
  {
    id: '9',
    slug: 'dentaprint-aris',
    name: 'DentaPrint Aris',
    sku: 'DP-ARS-001',
    tagline: 'Professional Production Printer',
    description: 'Large-format production printer for high-volume dental laboratories.',
    longDescription: 'Meet high-volume demands with the DentaPrint Aris. Designed for production laboratories, this large-format printer maximizes throughput while maintaining exceptional quality, allowing you to scale your business without compromise.',
    categoryId: '3',
    heroImage: '/images/products/dentaprint-aris.jpg',
    galleryImages: ['/images/products/dentaprint-aris-1.jpg'],
    keyFeatures: [
      { title: 'Large Build Platform', description: 'Print multiple cases simultaneously' },
      { title: 'Production Speed', description: 'Optimized for high-volume workflows' },
      { title: 'Industrial Reliability', description: 'Built for 24/7 operation' },
      { title: 'Automated Workflows', description: 'Minimize operator intervention' }
    ],
    specifications: [
      { label: 'Technology', value: 'DLP', group: 'Technical' },
      { label: 'Build Volume', value: '192mm x 120mm x 200mm', group: 'Physical' },
      { label: 'Layer Thickness', value: '25-150 μm', group: 'Technical' },
      { label: 'Print Speed', value: 'Up to 100mm/hour', group: 'Performance' }
    ],
    applications: ['Full Dentures', 'Multiple Models', 'Mass Production', 'All Dental Applications'],
    isNew: false,
    isFeatured: true,
    badges: ['Production', 'Large Format'],
    relatedProductIds: ['6', '7'],
    publishedAt: new Date('2025-09-12')
  },

  // MATERIALS
  {
    id: '10',
    slug: 'dentaresin-model',
    name: 'DentaResin Model',
    sku: 'DR-MDL-001',
    tagline: 'High-Precision Model Resin',
    description: 'Professional model resin with excellent dimensional stability and smooth finish.',
    longDescription: 'DentaResin Model delivers exceptional accuracy and surface quality for all your model printing needs. With superior dimensional stability and easy post-processing, this resin produces models that perfectly replicate patient anatomy.',
    categoryId: '4',
    heroImage: '/images/products/dentaresin-model.jpg',
    galleryImages: ['/images/products/dentaresin-model-1.jpg'],
    keyFeatures: [
      { title: 'Dimensional Stability', description: 'Minimal shrinkage and warping' },
      { title: 'Smooth Surface', description: 'Easy finishing and polishing' },
      { title: 'Fast Curing', description: 'Quick post-processing workflow' },
      { title: 'Color Options', description: 'Beige, gray, and ivory shades' }
    ],
    specifications: [
      { label: 'Type', value: '405nm UV resin', group: 'Technical' },
      { label: 'Viscosity', value: '300-400 mPa·s at 25°C', group: 'Physical' },
      { label: 'Tensile Strength', value: '50-60 MPa', group: 'Performance' },
      { label: 'Bottle Size', value: '1000ml', group: 'Physical' }
    ],
    applications: ['Dental Models', 'Orthodontic Models', 'Study Models'],
    isNew: false,
    isFeatured: false,
    badges: ['Popular'],
    relatedProductIds: ['6', '7', '11'],
    publishedAt: new Date('2024-11-08')
  },
  {
    id: '11',
    slug: 'dentaresin-surgical',
    name: 'DentaResin Surgical',
    sku: 'DR-SRG-001',
    tagline: 'Biocompatible Surgical Guide Resin',
    description: 'Class IIa certified resin for accurate and safe surgical guide fabrication.',
    longDescription: 'DentaResin Surgical is specifically formulated for the production of surgical guides. With biocompatibility certification and exceptional accuracy, this resin ensures precise implant placement and optimal patient safety.',
    categoryId: '4',
    heroImage: '/images/products/dentaresin-surgical.jpg',
    galleryImages: ['/images/products/dentaresin-surgical-1.jpg'],
    keyFeatures: [
      { title: 'Biocompatible', description: 'Class IIa medical device certification' },
      { title: 'High Accuracy', description: 'Precise fitting for surgical procedures' },
      { title: 'Autoclavable', description: 'Sterilizable for safe clinical use' },
      { title: 'Low Odor', description: 'Patient-friendly formulation' }
    ],
    specifications: [
      { label: 'Type', value: '405nm UV resin', group: 'Technical' },
      { label: 'Biocompatibility', value: 'ISO 10993, Class IIa', group: 'Certification' },
      { label: 'Sterilization', value: 'Autoclave up to 134°C', group: 'Performance' },
      { label: 'Bottle Size', value: '500ml', group: 'Physical' }
    ],
    applications: ['Implant Guides', 'Surgical Templates', 'Bone Reduction Guides'],
    isNew: false,
    isFeatured: true,
    badges: ['Biocompatible', 'Medical Grade'],
    relatedProductIds: ['6', '7', '10'],
    publishedAt: new Date('2025-03-22')
  },
  {
    id: '12',
    slug: 'dentaresin-temp',
    name: 'DentaResin Temp',
    sku: 'DR-TMP-001',
    tagline: 'Temporary Crown & Bridge Resin',
    description: 'Strong and aesthetic temporary restoration material for chairside fabrication.',
    longDescription: 'Create beautiful temporary restorations chairside with DentaResin Temp. This biocompatible resin offers excellent strength, natural aesthetics, and easy polishability for superior temporary crowns and bridges.',
    categoryId: '4',
    heroImage: '/images/products/dentaresin-temp.jpg',
    galleryImages: ['/images/products/dentaresin-temp-1.jpg'],
    keyFeatures: [
      { title: 'Natural Aesthetics', description: 'Multiple tooth shades available' },
      { title: 'High Strength', description: 'Withstands chewing forces' },
      { title: 'Easy Finishing', description: 'Polishes to high gloss' },
      { title: 'Biocompatible', description: 'Safe for intraoral use up to 6 months' }
    ],
    specifications: [
      { label: 'Type', value: '385nm UV resin', group: 'Technical' },
      { label: 'Flexural Strength', value: '80-90 MPa', group: 'Performance' },
      { label: 'Biocompatibility', value: 'ISO 10993', group: 'Certification' },
      { label: 'Wear Time', value: 'Up to 6 months', group: 'Performance' },
      { label: 'Shades', value: 'A1, A2, A3, B1', group: 'Physical' }
    ],
    applications: ['Temporary Crowns', 'Temporary Bridges', 'Long-term Provisionals'],
    isNew: true,
    isFeatured: true,
    badges: ['New', 'Aesthetic'],
    relatedProductIds: ['8', '1'],
    publishedAt: new Date('2026-04-15')
  },
  {
    id: '13',
    slug: 'dentaresin-denture',
    name: 'DentaResin Denture',
    sku: 'DR-DNT-001',
    tagline: 'Complete Denture Base Resin',
    description: 'Durable and aesthetic resin for 3D printed complete and partial dentures.',
    longDescription: 'DentaResin Denture delivers exceptional strength and natural aesthetics for denture fabrication. With excellent impact resistance and color stability, this resin produces dentures that patients will love wearing.',
    categoryId: '4',
    heroImage: '/images/products/dentaresin-denture.jpg',
    galleryImages: ['/images/products/dentaresin-denture-1.jpg'],
    keyFeatures: [
      { title: 'Impact Resistant', description: 'Withstands daily wear and accidental drops' },
      { title: 'Color Stable', description: 'Maintains aesthetics over time' },
      { title: 'Easy Repair', description: 'Can be repaired with conventional methods' },
      { title: 'Natural Gingival Shade', description: 'Multiple pink shades available' }
    ],
    specifications: [
      { label: 'Type', value: '385nm UV resin', group: 'Technical' },
      { label: 'Flexural Strength', value: '70-80 MPa', group: 'Performance' },
      { label: 'Impact Strength', value: '>5 kJ/m²', group: 'Performance' },
      { label: 'Biocompatibility', value: 'ISO 10993, ISO 20795', group: 'Certification' }
    ],
    applications: ['Complete Dentures', 'Partial Denture Bases', 'Immediate Dentures'],
    isNew: false,
    isFeatured: false,
    badges: ['ISO Certified'],
    relatedProductIds: ['9', '7'],
    publishedAt: new Date('2025-06-30')
  },

  // MILLING MACHINES
  {
    id: '14',
    slug: 'dentalmill-c5',
    name: 'DentalMill C5',
    sku: 'DM-C5-001',
    tagline: '5-Axis Chairside Milling',
    description: 'Compact 5-axis milling system for same-day restorations in your practice.',
    longDescription: 'Transform your practice with chairside milling. The DentalMill C5 enables you to design and mill high-quality crowns, inlays, and veneers in a single appointment, providing exceptional patient satisfaction and practice efficiency.',
    categoryId: '5',
    heroImage: '/images/products/dentalmill-c5.jpg',
    galleryImages: ['/images/products/dentalmill-c5-1.jpg', '/images/products/dentalmill-c5-2.jpg'],
    keyFeatures: [
      { title: '5-Axis Precision', description: 'Mill complex anatomies with ease' },
      { title: 'Compact Design', description: 'Fits seamlessly in your operatory' },
      { title: 'Material Versatile', description: 'Mill ceramics, composites, and more' },
      { title: 'Fast Milling', description: 'Complete crowns in 10-15 minutes' }
    ],
    specifications: [
      { label: 'Axes', value: '5-axis simultaneous', group: 'Technical' },
      { label: 'Spindle Speed', value: 'Up to 60,000 RPM', group: 'Performance' },
      { label: 'Materials', value: 'Zirconia, Lithium Disilicate, PMMA, Composite', group: 'Technical' },
      { label: 'Milling Time', value: 'Crown ~12 minutes', group: 'Performance' }
    ],
    applications: ['Crowns', 'Inlays/Onlays', 'Veneers', 'Implant Abutments'],
    isNew: false,
    isFeatured: true,
    badges: ['Same-Day', 'Chairside'],
    relatedProductIds: ['1', '8', '15'],
    publishedAt: new Date('2025-05-20')
  },
  {
    id: '15',
    slug: 'dentalmill-l7',
    name: 'DentalMill L7',
    sku: 'DM-L7-001',
    tagline: 'Laboratory Production Mill',
    description: 'High-performance 5-axis mill for dental laboratory production environments.',
    longDescription: 'The DentalMill L7 is engineered for high-volume laboratory production. With exceptional speed, accuracy, and reliability, this mill handles complex cases and high workloads with ease, making it the backbone of successful modern laboratories.',
    categoryId: '5',
    heroImage: '/images/products/dentalmill-l7.jpg',
    galleryImages: ['/images/products/dentalmill-l7-1.jpg', '/images/products/dentalmill-l7-2.jpg'],
    keyFeatures: [
      { title: 'High-Speed Milling', description: 'Process more cases per day' },
      { title: 'Wet & Dry Milling', description: 'Mill all material types optimally' },
      { title: 'Automatic Tool Changer', description: '6-position tool magazine' },
      { title: 'Industrial Reliability', description: 'Built for 24/7 production' }
    ],
    specifications: [
      { label: 'Axes', value: '5-axis simultaneous', group: 'Technical' },
      { label: 'Spindle Speed', value: 'Up to 80,000 RPM', group: 'Performance' },
      { label: 'Tool Changer', value: '6 positions', group: 'Technical' },
      { label: 'Materials', value: 'All dental materials', group: 'Technical' }
    ],
    applications: ['Full Arch Bridges', 'Implant Bars', 'Complex Frameworks', 'All Restorations'],
    isNew: false,
    isFeatured: true,
    badges: ['Lab Professional', 'Production'],
    relatedProductIds: ['14', '5'],
    publishedAt: new Date('2025-08-10')
  },

  // SOFTWARE
  {
    id: '16',
    slug: 'dentalcad-pro',
    name: 'DentalCAD Pro',
    sku: 'DC-PRO-001',
    tagline: 'Professional Dental Design Software',
    description: 'Complete CAD solution for designing all types of dental restorations.',
    longDescription: 'DentalCAD Pro is the comprehensive design platform for modern dental workflows. With intuitive tools, AI-assisted design, and seamless integration with all major scanners and production equipment, this software streamlines your digital workflow from scan to final restoration.',
    categoryId: '6',
    heroImage: '/images/products/dentalcad-pro.jpg',
    galleryImages: ['/images/products/dentalcad-pro-1.jpg', '/images/products/dentalcad-pro-2.jpg'],
    keyFeatures: [
      { title: 'AI-Assisted Design', description: 'Intelligent proposal generation' },
      { title: 'Full Library', description: 'Extensive restoration and tooth libraries' },
      { title: 'Nesting Optimization', description: 'Maximize material usage' },
      { title: 'Universal Compatibility', description: 'Works with all scanner formats' }
    ],
    specifications: [
      { label: 'Platform', value: 'Windows 10/11', group: 'System' },
      { label: 'RAM', value: '16GB minimum', group: 'System' },
      { label: 'GPU', value: 'Dedicated graphics card', group: 'System' },
      { label: 'File Formats', value: 'STL, PLY, OBJ, DCM', group: 'Technical' }
    ],
    applications: ['Crown & Bridge', 'Implants', 'Orthodontics', 'Surgical Planning', 'Full Dentures'],
    isNew: false,
    isFeatured: true,
    badges: ['Software', 'AI-Powered'],
    relatedProductIds: ['1', '6', '14'],
    publishedAt: new Date('2025-01-15')
  },
  {
    id: '17',
    slug: 'dentalcad-implant',
    name: 'DentalCAD Implant',
    sku: 'DC-IMP-001',
    tagline: 'Implant Planning Software',
    description: 'Advanced software for implant case planning and surgical guide design.',
    longDescription: 'Plan implant cases with confidence using DentalCAD Implant. This specialized module combines CBCT data with intraoral scans for precise virtual implant placement, automatic guide design, and seamless communication with surgical teams.',
    categoryId: '6',
    heroImage: '/images/products/dentalcad-implant.jpg',
    galleryImages: ['/images/products/dentalcad-implant-1.jpg'],
    keyFeatures: [
      { title: 'CBCT Integration', description: 'Merge scan and CBCT data seamlessly' },
      { title: 'Virtual Planning', description: 'Position implants with precision' },
      { title: 'Auto Guide Design', description: 'Generate surgical guides automatically' },
      { title: 'Abutment Design', description: 'Design custom abutments' }
    ],
    specifications: [
      { label: 'Platform', value: 'Windows 10/11', group: 'System' },
      { label: 'CBCT Formats', value: 'DICOM', group: 'Technical' },
      { label: 'Implant Libraries', value: '50+ manufacturers', group: 'Technical' }
    ],
    applications: ['Implant Planning', 'Surgical Guides', 'Custom Abutments', 'Full-Arch Restorations'],
    isNew: true,
    isFeatured: true,
    badges: ['New', 'Implant Specialist'],
    relatedProductIds: ['1', '11', '16'],
    publishedAt: new Date('2026-03-01')
  },
  {
    id: '18',
    slug: 'dentalcad-ortho',
    name: 'DentalCAD Ortho',
    sku: 'DC-ORT-001',
    tagline: 'Orthodontic Design Module',
    description: 'Specialized software for designing orthodontic appliances and clear aligners.',
    longDescription: 'Expand your orthodontic services with DentalCAD Ortho. Design retainers, splints, and other orthodontic appliances with ease, or integrate with aligner workflows for comprehensive digital orthodontic treatment planning.',
    categoryId: '6',
    heroImage: '/images/products/dentalcad-ortho.jpg',
    galleryImages: ['/images/products/dentalcad-ortho-1.jpg'],
    keyFeatures: [
      { title: 'Appliance Design', description: 'Retainers, splints, and more' },
      { title: 'Aligner Planning', description: 'Integrate with aligner workflows' },
      { title: 'Setup Tools', description: 'Virtual tooth arrangement' },
      { title: 'Quick Turnaround', description: 'Streamlined design process' }
    ],
    specifications: [
      { label: 'Platform', value: 'Windows 10/11', group: 'System' },
      { label: 'Applications', value: 'Retainers, Splints, Night Guards, Aligners', group: 'Technical' }
    ],
    applications: ['Retainers', 'Splints', 'Night Guards', 'Aligner Planning'],
    isNew: false,
    isFeatured: false,
    badges: ['Orthodontics'],
    relatedProductIds: ['2', '7', '16'],
    publishedAt: new Date('2025-07-08')
  },

  // ACCESSORIES
  {
    id: '19',
    slug: 'dentawash-pro',
    name: 'DentaWash Pro',
    sku: 'DW-PRO-001',
    tagline: 'Automated Post-Processing Station',
    description: 'Professional washing and drying system for 3D printed dental parts.',
    longDescription: 'Streamline your post-processing workflow with DentaWash Pro. This automated system thoroughly cleans printed parts, removes uncured resin, and prepares parts for final curing, ensuring consistent quality and reducing manual labor.',
    categoryId: '7',
    heroImage: '/images/products/dentawash-pro.jpg',
    galleryImages: ['/images/products/dentawash-pro-1.jpg'],
    keyFeatures: [
      { title: 'Automated Cleaning', description: 'Consistent wash cycles every time' },
      { title: 'Dual Tanks', description: 'Pre-wash and final wash stations' },
      { title: 'Drying Function', description: 'Integrated air drying system' },
      { title: 'Solvent Recovery', description: 'Extend solvent life and reduce waste' }
    ],
    specifications: [
      { label: 'Tank Capacity', value: '4L per tank', group: 'Physical' },
      { label: 'Wash Time', value: '3-15 minutes', group: 'Performance' },
      { label: 'Drying Time', value: '5-10 minutes', group: 'Performance' },
      { label: 'Compatible Solvents', value: 'IPA, TPM', group: 'Technical' }
    ],
    applications: ['Post-Processing 3D Prints', 'Part Cleaning', 'Workflow Automation'],
    isNew: false,
    isFeatured: false,
    badges: ['Accessory'],
    relatedProductIds: ['6', '7', '20'],
    publishedAt: new Date('2025-04-12')
  },
  {
    id: '20',
    slug: 'dentacure-n2',
    name: 'DentaCure N2',
    sku: 'DC-N2-001',
    tagline: 'Nitrogen Curing Chamber',
    description: 'Professional UV curing station with nitrogen atmosphere for superior results.',
    longDescription: 'Achieve optimal material properties with the DentaCure N2. This advanced curing chamber uses nitrogen atmosphere to eliminate oxygen inhibition, resulting in superior surface quality, mechanical properties, and biocompatibility for all your 3D printed dental parts.',
    categoryId: '7',
    heroImage: '/images/products/dentacure-n2.jpg',
    galleryImages: ['/images/products/dentacure-n2-1.jpg'],
    keyFeatures: [
      { title: 'Nitrogen Atmosphere', description: 'Eliminates oxygen inhibition for perfect curing' },
      { title: 'Powerful UV', description: '405nm high-intensity LED array' },
      { title: 'Turntable', description: 'Even curing from all angles' },
      { title: 'Preset Programs', description: 'Material-specific curing profiles' }
    ],
    specifications: [
      { label: 'Wavelength', value: '405nm UV-A', group: 'Technical' },
      { label: 'Power', value: '15W LED array', group: 'Technical' },
      { label: 'Chamber Size', value: '150mm diameter', group: 'Physical' },
      { label: 'Cure Time', value: '5-60 minutes', group: 'Performance' }
    ],
    applications: ['Post-Curing 3D Prints', 'Material Optimization', 'Final Processing'],
    isNew: false,
    isFeatured: false,
    badges: ['Accessory', 'Professional'],
    relatedProductIds: ['6', '7', '19'],
    publishedAt: new Date('2025-04-12')
  },
  {
    id: '21',
    slug: 'scanner-calibration-kit',
    name: 'Scanner Calibration Kit',
    sku: 'CAL-SCN-001',
    tagline: 'Precision Calibration Tools',
    description: 'Professional calibration kit for maintaining scanner accuracy.',
    longDescription: 'Maintain peak scanner performance with our Professional Calibration Kit. Regular calibration ensures your scanner delivers consistent, accurate results day after day, protecting your investment and ensuring patient satisfaction.',
    categoryId: '7',
    heroImage: '/images/products/calibration-kit.jpg',
    galleryImages: ['/images/products/calibration-kit-1.jpg'],
    keyFeatures: [
      { title: 'Precision References', description: 'Traceable calibration standards' },
      { title: 'Complete Kit', description: 'Everything needed for calibration' },
      { title: 'Quality Assurance', description: 'Maintain consistent accuracy' },
      { title: 'Easy Process', description: 'Simple calibration workflow' }
    ],
    specifications: [
      { label: 'Includes', value: 'Calibration spheres, reference models', group: 'Contents' },
      { label: 'Accuracy', value: '±2 μm traceable', group: 'Technical' },
      { label: 'Compatibility', value: 'All OralScan and LabScan models', group: 'Technical' }
    ],
    applications: ['Scanner Maintenance', 'Quality Control', 'Accuracy Verification'],
    isNew: false,
    isFeatured: false,
    badges: ['Accessory'],
    relatedProductIds: ['1', '2', '4'],
    publishedAt: new Date('2025-02-01')
  }
]
