import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const site = defineCollection({
  loader: glob({ pattern: 'site.json', base: './src/content' }),
  schema: z.object({
    brand: z.object({
      name: z.string(),
      shortName: z.string(),
      logo: z.string(),
      showWordmark: z.boolean(),
      tagline: z.string(),
    }),
    headerCta: z.object({
      label: z.string(),
      href: z.string(),
    }),
    seo: z.object({
      siteTitle: z.string(),
      defaultDescription: z.string(),
      shareImage: z.string().optional().or(z.literal('')),
    }),
    footer: z.object({
      navigateTitle: z.string(),
      navigate: z.array(z.object({
        label: z.string(),
        href: z.string(),
      })),
      contactTitle: z.string(),
      email: z.string(),
      phone: z.string(),
      addressLines: z.array(z.string()),
      affiliationTitle: z.string(),
      affiliation: z.object({
        logo: z.string(),
        name: z.string(),
        line1: z.string(),
        line2: z.string(),
      }),
      socials: z.array(z.object({
        platform: z.string(),
        label: z.string(),
        url: z.string().optional().or(z.literal('')),
      })),
      copyrightText: z.string(),
      legal: z.array(z.object({
        label: z.string(),
        href: z.string(),
      })),
    }),
    ui: z.record(z.string()),
  })
});

const pages = defineCollection({
  loader: glob({ pattern: 'pages.json', base: './src/content' }),
  schema: z.array(z.object({
    route: z.string(),
    title: z.string(),
    status: z.enum(['live', 'blank']),
    nav: z.enum(['main', 'more']).nullable(),
    order: z.number(),
  }))
});

const home = defineCollection({
  loader: glob({ pattern: 'home.json', base: './src/content' }),
  schema: z.object({
    hero: z.object({
      eyebrow: z.string(),
      headlineLine1: z.string(),
      headlineLine2: z.string(),
      headlineAccent: z.string(),
      subline: z.string(),
      cta: z.object({
        label: z.string(),
        href: z.string(),
      }),
      cornerTopLeft: z.array(z.string()),
      cornerBottomLeft: z.array(z.string()),
      cornerRight: z.array(z.string()),
      scrollLabel: z.string(),
    }),
    stepper: z.array(z.object({
      id: z.string(),
      number: z.string(),
      label: z.string(),
    })),
    whoWeAre: z.object({
      eyebrow: z.string(),
      heading: z.object({
        plain: z.string(),
        accent: z.string(),
      }),
      body: z.string(),
      link: z.object({
        label: z.string(),
        href: z.string(),
      })
    }),
    whatWeDo: z.object({
      eyebrow: z.string(),
      heading: z.string(),
      intro: z.string(),
      items: z.array(z.object({
        title: z.string(),
        icon: z.string(),
        href: z.string().optional().or(z.literal('')),
        text: z.string(),
      })),
    }),
    projects: z.object({
      eyebrow: z.string(),
      heading: z.string(),
      intro: z.string(),
      link: z.object({
        label: z.string(),
        href: z.string().optional().or(z.literal('')),
      }),
      statusLabels: z.object({
        active: z.string(),
        completed: z.string(),
        idea: z.string(),
      }),
      items: z.array(z.any()), // Can be refined later
      emptyState: z.object({
        badge: z.string(),
        title: z.string(),
        text: z.string(),
      })
    }),
    waysToEngage: z.object({
      eyebrow: z.string(),
      heading: z.string(),
      intro: z.string(),
      cards: z.array(z.object({
        title: z.string(),
        icon: z.string(),
        href: z.string().optional().or(z.literal('')),
        linkLabel: z.string(),
        text: z.string(),
      }))
    })
  })
});

const team = defineCollection({
  loader: glob({ pattern: 'team.json', base: './src/content' }),
  schema: z.object({
    currentYear: z.string(),
    hero: z.object({
      pill: z.string(),
      headingLine1: z.string(),
      headingLine2: z.string(),
      headingAccent: z.string(),
      sublineTemplate: z.string(),
      cta: z.object({
        label: z.string(),
        href: z.string().optional().or(z.literal('')),
      }),
      cornerTopLeft: z.array(z.string()),
      arcWords: z.array(z.string()),
    }),
    stepper: z.array(z.object({
      id: z.string(),
      number: z.string(),
      label: z.string(),
    })),
    structure: z.object({
      eyebrowTemplate: z.string(),
      heading: z.string(),
      intro: z.string(),
    }),
    functions: z.array(z.object({
      id: z.string(),
      name: z.string(),
      icon: z.string(),
      description: z.string(),
      hasCoreMembers: z.boolean().optional(),
    })),
    theTeam: z.object({
      eyebrowTemplate: z.string(),
      heading: z.string(),
      introTemplate: z.string(),
      groups: z.array(z.object({
        id: z.string(),
        title: z.string(),
        functions: z.array(z.string()),
      }))
    }),
    members: z.array(z.object({
      id: z.string(),
      name: z.string(),
      role: z.string(),
      function: z.string(),
      photo: z.string().optional().or(z.literal('')),
      focus: z.string().optional(),
      link: z.string().optional().or(z.literal('')),
    }))
  })
});

export const collections = { site, pages, home, team };
