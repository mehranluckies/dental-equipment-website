import type { Solution } from '~/types'

export const solutions: Solution[] = [
  {
    id: '1',
    slug: 'digital-dentistry',

    name: 'solutions.digitalDentistry.name',
    tagline: 'solutions.digitalDentistry.tagline',
    description: 'solutions.digitalDentistry.description',

    heroImage: '/images/solutions/digital-dentistry.jpg',

    problem: 'solutions.digitalDentistry.problem',
    solutionApproach: 'solutions.digitalDentistry.solutionApproach',

    workflow: [
      {
        order: 1,
        title: 'solutions.digitalDentistry.workflow.scan.title',
        description: 'solutions.digitalDentistry.workflow.scan.description',
        icon: 'Scan'
      },
      {
        order: 2,
        title: 'solutions.digitalDentistry.workflow.design.title',
        description: 'solutions.digitalDentistry.workflow.design.description',
        icon: 'Monitor'
      },
      {
        order: 3,
        title: 'solutions.digitalDentistry.workflow.produce.title',
        description: 'solutions.digitalDentistry.workflow.produce.description',
        icon: 'Printer'
      },
      {
        order: 4,
        title: 'solutions.digitalDentistry.workflow.deliver.title',
        description: 'solutions.digitalDentistry.workflow.deliver.description',
        icon: 'Package'
      }
    ],

    benefits: [
      'solutions.digitalDentistry.benefits.0',
      'solutions.digitalDentistry.benefits.1',
      'solutions.digitalDentistry.benefits.2',
      'solutions.digitalDentistry.benefits.3',
      'solutions.digitalDentistry.benefits.4'
    ],

    productIds: ['1', '2', '6', '7', '14', '16'],
    caseStudyIds: ['1', '2'],
    publishedAt: new Date('2025-01-10')
  },

  {
    id: '2',
    slug: 'implantology',

    name: 'solutions.implantology.name',
    tagline: 'solutions.implantology.tagline',
    description: 'solutions.implantology.description',

    heroImage: '/images/solutions/implantology.jpg',

    problem: 'solutions.implantology.problem',
    solutionApproach: 'solutions.implantology.solutionApproach',

    workflow: [
      {
        order: 1,
        title: 'solutions.implantology.workflow.scanImage.title',
        description: 'solutions.implantology.workflow.scanImage.description',
        icon: 'ScanLine'
      },
      {
        order: 2,
        title: 'solutions.implantology.workflow.plan.title',
        description: 'solutions.implantology.workflow.plan.description',
        icon: 'Target'
      },
      {
        order: 3,
        title: 'solutions.implantology.workflow.guide.title',
        description: 'solutions.implantology.workflow.guide.description',
        icon: 'Navigation'
      },
      {
        order: 4,
        title: 'solutions.implantology.workflow.place.title',
        description: 'solutions.implantology.workflow.place.description',
        icon: 'Check'
      }
    ],

    benefits: [
      'solutions.implantology.benefits.0',
      'solutions.implantology.benefits.1',
      'solutions.implantology.benefits.2',
      'solutions.implantology.benefits.3',
      'solutions.implantology.benefits.4'
    ],

    productIds: ['1', '4', '11', '16', '17'],
    caseStudyIds: ['3', '4'],
    publishedAt: new Date('2025-02-15')
  },

  {
    id: '3',
    slug: 'orthodontics',

    name: 'solutions.orthodontics.name',
    tagline: 'solutions.orthodontics.tagline',
    description: 'solutions.orthodontics.description',

    heroImage: '/images/solutions/orthodontics.jpg',

    problem: 'solutions.orthodontics.problem',
    solutionApproach: 'solutions.orthodontics.solutionApproach',

    workflow: [
      {
        order: 1,
        title: 'solutions.orthodontics.workflow.digitalRecords.title',
        description: 'solutions.orthodontics.workflow.digitalRecords.description',
        icon: 'Scan'
      },
      {
        order: 2,
        title: 'solutions.orthodontics.workflow.treatmentPlanning.title',
        description: 'solutions.orthodontics.workflow.treatmentPlanning.description',
        icon: 'Layout'
      },
      {
        order: 3,
        title: 'solutions.orthodontics.workflow.fabrication.title',
        description: 'solutions.orthodontics.workflow.fabrication.description',
        icon: 'Printer'
      },
      {
        order: 4,
        title: 'solutions.orthodontics.workflow.monitor.title',
        description: 'solutions.orthodontics.workflow.monitor.description',
        icon: 'TrendingUp'
      }
    ],

    benefits: [
      'solutions.orthodontics.benefits.0',
      'solutions.orthodontics.benefits.1',
      'solutions.orthodontics.benefits.2',
      'solutions.orthodontics.benefits.3',
      'solutions.orthodontics.benefits.4'
    ],

    productIds: ['2', '7', '10', '16', '18'],
    caseStudyIds: ['5'],
    publishedAt: new Date('2025-03-20')
  },

  {
    id: '4',
    slug: 'prosthetics',

    name: 'solutions.prosthetics.name',
    tagline: 'solutions.prosthetics.tagline',
    description: 'solutions.prosthetics.description',

    heroImage: '/images/solutions/prosthetics.jpg',

    problem: 'solutions.prosthetics.problem',
    solutionApproach: 'solutions.prosthetics.solutionApproach',

    workflow: [
      {
        order: 1,
        title: 'solutions.prosthetics.workflow.capture.title',
        description: 'solutions.prosthetics.workflow.capture.description',
        icon: 'Camera'
      },
      {
        order: 2,
        title: 'solutions.prosthetics.workflow.design.title',
        description: 'solutions.prosthetics.workflow.design.description',
        icon: 'Palette'
      },
      {
        order: 3,
        title: 'solutions.prosthetics.workflow.tryIn.title',
        description: 'solutions.prosthetics.workflow.tryIn.description',
        icon: 'Eye'
      },
      {
        order: 4,
        title: 'solutions.prosthetics.workflow.fabricate.title',
        description: 'solutions.prosthetics.workflow.fabricate.description',
        icon: 'CheckCircle'
      }
    ],

    benefits: [
      'solutions.prosthetics.benefits.0',
      'solutions.prosthetics.benefits.1',
      'solutions.prosthetics.benefits.2',
      'solutions.prosthetics.benefits.3',
      'solutions.prosthetics.benefits.4'
    ],

    productIds: ['1', '7', '9', '13', '16'],
    caseStudyIds: ['6'],
    publishedAt: new Date('2025-04-25')
  },

  {
    id: '5',
    slug: 'same-day-dentistry',

    name: 'solutions.sameDayDentistry.name',
    tagline: 'solutions.sameDayDentistry.tagline',
    description: 'solutions.sameDayDentistry.description',

    heroImage: '/images/solutions/same-day.jpg',

    problem: 'solutions.sameDayDentistry.problem',
    solutionApproach: 'solutions.sameDayDentistry.solutionApproach',

    workflow: [
      {
        order: 1,
        title: 'solutions.sameDayDentistry.workflow.prepareScan.title',
        description: 'solutions.sameDayDentistry.workflow.prepareScan.description',
        icon: 'Scan'
      },
      {
        order: 2,
        title: 'solutions.sameDayDentistry.workflow.design.title',
        description: 'solutions.sameDayDentistry.workflow.design.description',
        icon: 'PenTool'
      },
      {
        order: 3,
        title: 'solutions.sameDayDentistry.workflow.fabricate.title',
        description: 'solutions.sameDayDentistry.workflow.fabricate.description',
        icon: 'Zap'
      },
      {
        order: 4,
        title: 'solutions.sameDayDentistry.workflow.deliver.title',
        description: 'solutions.sameDayDentistry.workflow.deliver.description',
        icon: 'Smile'
      }
    ],

    benefits: [
      'solutions.sameDayDentistry.benefits.0',
      'solutions.sameDayDentistry.benefits.1',
      'solutions.sameDayDentistry.benefits.2',
      'solutions.sameDayDentistry.benefits.3',
      'solutions.sameDayDentistry.benefits.4'
    ],

    productIds: ['1', '8', '14', '16'],
    caseStudyIds: ['1', '2'],
    publishedAt: new Date('2025-05-30')
  },

  {
    id: '6',
    slug: 'dental-laboratory',

    name: 'solutions.dentalLaboratory.name',
    tagline: 'solutions.dentalLaboratory.tagline',
    description: 'solutions.dentalLaboratory.description',

    heroImage: '/images/solutions/dental-lab.jpg',

    problem: 'solutions.dentalLaboratory.problem',
    solutionApproach: 'solutions.dentalLaboratory.solutionApproach',

    workflow: [
      {
        order: 1,
        title: 'solutions.dentalLaboratory.workflow.receive.title',
        description: 'solutions.dentalLaboratory.workflow.receive.description',
        icon: 'Download'
      },
      {
        order: 2,
        title: 'solutions.dentalLaboratory.workflow.design.title',
        description: 'solutions.dentalLaboratory.workflow.design.description',
        icon: 'Cpu'
      },
      {
        order: 3,
        title: 'solutions.dentalLaboratory.workflow.produce.title',
        description: 'solutions.dentalLaboratory.workflow.produce.description',
        icon: 'Factory'
      },
      {
        order: 4,
        title: 'solutions.dentalLaboratory.workflow.finish.title',
        description: 'solutions.dentalLaboratory.workflow.finish.description',
        icon: 'Award'
      }
    ],

    benefits: [
      'solutions.dentalLaboratory.benefits.0',
      'solutions.dentalLaboratory.benefits.1',
      'solutions.dentalLaboratory.benefits.2',
      'solutions.dentalLaboratory.benefits.3',
      'solutions.dentalLaboratory.benefits.4'
    ],

    productIds: ['4', '5', '9', '15', '16'],
    caseStudyIds: [],
    publishedAt: new Date('2025-06-15')
  }
]