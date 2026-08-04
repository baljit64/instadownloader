import type { Metadata } from 'next';
import { absoluteUrl, getOpenGraphImages, getTwitterImages, siteName } from './site';

export interface TrustSection {
  heading: string;
  paragraphs: string[];
  points?: string[];
}

export interface TrustPageConfig {
  description: string;
  eyebrow: string;
  intro: string;
  sections: TrustSection[];
  slug: string;
  title: string;
  updatedAt: string;
}

export const trustPages: Record<string, TrustPageConfig> = {
  about: {
    slug: 'about',
    title: 'About IGDown',
    description: 'Learn what IGDown does, what public Instagram links it supports, and the product principles behind its downloader experience.',
    eyebrow: 'Company and product',
    intro: 'IGDown is an independent browser-based service for resolving media from supported public Instagram post, reel, video, photo, and carousel links.',
    updatedAt: '2026-08-05',
    sections: [
      {
        heading: 'Our purpose',
        paragraphs: [
          'The product is designed around a short, understandable flow: paste a supported public URL, inspect the resolved preview, and download the file when you are authorized to do so. Clear previews and error messages matter more than inflated claims about universal access or impossible quality.',
          'IGDown is not affiliated with, sponsored by, or endorsed by Instagram or Meta. Instagram is a trademark of its respective owner.',
        ],
      },
      {
        heading: 'Product boundaries',
        paragraphs: ['The downloader does not request Instagram account credentials and does not bypass privacy or sign-in restrictions.'],
        points: [
          'Supported: public /p/, /reel/, /reels/, and /tv/ media links when a source can be resolved.',
          'Not supported: private posts, Stories, Close Friends content, direct messages, drafts, or profile pictures by username.',
          'Quality: the best public source resolved at request time, without artificial upscaling.',
        ],
      },
      {
        heading: 'How we build trust',
        paragraphs: [
          'We publish capability limits, privacy information, legal terms, copyright reporting instructions, and focused troubleshooting guidance. Optional Google Analytics is consent-gated, and declining it does not prevent use of the downloader.',
          'Questions, extraction failures, and responsible vulnerability reports can be sent to support@igdown.pro. Include enough technical context to reproduce a problem, but never send passwords, session cookies, or private account access.',
        ],
      },
    ],
  },
  contact: {
    slug: 'contact',
    title: 'Contact IGDown',
    description: 'Contact IGDown support about public-link download errors, privacy questions, copyright notices, or responsible security reports.',
    eyebrow: 'Support',
    intro: 'Email support@igdown.pro for product support, privacy requests, copyright notices, and responsible security reports.',
    updatedAt: '2026-08-05',
    sections: [
      {
        heading: 'Downloader support',
        paragraphs: ['For a failed public link, include the URL, device, browser and version, approximate time, and exact error message or screenshot. This helps reproduce extraction and download failures.'],
        points: [
          'Do not send your Instagram password, session cookie, two-factor code, or private direct-message content.',
          'Confirm the link opens in a private browser window without requiring sign-in.',
          'Allow reasonable time for investigation when an upstream Instagram change affects extraction.',
        ],
      },
      {
        heading: 'Privacy and legal requests',
        paragraphs: [
          'Use the subject “Privacy request” for questions about personal data and “DMCA notice” for a copyright report. DMCA notices should include all information listed in the DMCA Policy so they can be evaluated without unnecessary delay.',
          'This page does not promise a fixed response time. Complete, specific messages are easier to review than repeated submissions without technical or legal detail.',
        ],
      },
      {
        heading: 'Security reports',
        paragraphs: ['Report suspected security issues privately to support@igdown.pro before public disclosure. Describe the affected route, reproducible steps, impact, and any safe proof of concept. Do not access other users’ data, degrade the service, or use destructive testing.'],
      },
    ],
  },
  'privacy-policy': {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    description: 'Read how IGDown processes submitted public URLs, technical logs, optional analytics, support messages, and privacy choices.',
    eyebrow: 'Legal',
    intro: 'This policy explains the information IGDown processes when you use the website and the choices available to you.',
    updatedAt: '2026-08-05',
    sections: [
      {
        heading: 'Information processed',
        paragraphs: ['IGDown processes the public media URL you submit so the server can validate it, request the source page, resolve media, and return a result. Hosting, security, and proxy systems may process technical data such as IP address, timestamp, requested route, user agent, response status, and network diagnostics.'],
        points: [
          'Support messages contain the email address and information you choose to send.',
          'Do not submit passwords, authentication cookies, private links, or sensitive personal information.',
          'The current downloader does not require an IGDown account or Instagram credentials.',
        ],
      },
      {
        heading: 'Analytics and local storage',
        paragraphs: [
          'Google Analytics is loaded only when it is configured and you select Allow analytics. If you decline, the analytics script is not loaded. Your choice is stored in your browser’s local storage under igdown-analytics-consent so the website can remember it.',
          'Vercel Analytics and Speed Insights are enabled only when the deployment configuration explicitly turns them on. Hosting providers can still process essential request logs needed to deliver and protect the service.',
        ],
      },
      {
        heading: 'Purposes, sharing, and retention',
        paragraphs: [
          'Information is processed to deliver downloads, prevent abuse, diagnose failures, measure performance when permitted, respond to messages, and comply with law. Technical data can be handled by hosting, analytics, proxy, and extraction service providers acting as infrastructure vendors.',
          'Data is retained only as long as reasonably needed for these purposes, security, dispute resolution, and legal obligations. Exact log retention can vary by infrastructure provider and deployment configuration. IGDown does not claim to sell submitted URLs or account credentials.',
        ],
      },
      {
        heading: 'Choices and requests',
        paragraphs: [
          'You can decline optional analytics, clear the site’s local storage, avoid submitting a URL, or contact support@igdown.pro with a privacy question or request. Applicable rights vary by location and may require identity or request verification.',
          'The site is not directed to children who are not old enough to consent to online data processing in their jurisdiction. This policy may change as the product or legal requirements change; the updated date records the current version.',
        ],
      },
    ],
  },
  'terms-of-service': {
    slug: 'terms-of-service',
    title: 'Terms of Service',
    description: 'Review the rules for using IGDown, including public-link limits, responsible use, intellectual property, and service availability.',
    eyebrow: 'Legal',
    intro: 'By using IGDown, you agree to these terms. If you do not agree, do not use the service.',
    updatedAt: '2026-08-05',
    sections: [
      {
        heading: 'Permitted use',
        paragraphs: ['You may use IGDown to process supported public URLs when you have the right or lawful authority to download and use the resulting media. You are responsible for your activity, local law, platform terms, and permissions from creators or other rightsholders.'],
      },
      {
        heading: 'Prohibited use',
        paragraphs: ['You must not use the service to violate rights, privacy, access controls, or law.'],
        points: [
          'Do not attempt to bypass private accounts, authentication, rate limits, or security controls.',
          'Do not submit malicious input, automate abusive traffic, interfere with service operation, or probe data belonging to others.',
          'Do not impersonate creators, strip ownership information, or redistribute media without authorization.',
        ],
      },
      {
        heading: 'Availability and results',
        paragraphs: [
          'The service is provided on an “as available” basis. Instagram and other upstream systems can change, restrict, remove, or interrupt public media access. IGDown does not guarantee that every link will work, that a particular format or resolution will be available, or that service will be uninterrupted.',
          'To the extent permitted by law, IGDown disclaims implied warranties and is not liable for indirect, incidental, special, consequential, or punitive damages arising from use of the service. Some jurisdictions do not allow all limitations, so mandatory local rights remain unaffected.',
        ],
      },
      {
        heading: 'Intellectual property and changes',
        paragraphs: [
          'IGDown’s site code, branding, and original website content are protected by applicable rights. Media resolved from a submitted link remains subject to the rights of its creator and other rightsholders. These terms can be updated when the product or law changes; continued use after an update constitutes acceptance where permitted.',
        ],
      },
    ],
  },
  'dmca-policy': {
    slug: 'dmca-policy',
    title: 'DMCA and Copyright Policy',
    description: 'Learn how to send IGDown a complete copyright infringement notice or counter-notice and what information to include.',
    eyebrow: 'Copyright',
    intro: 'IGDown respects copyright and expects users to download or reuse media only when they are authorized to do so.',
    updatedAt: '2026-08-05',
    sections: [
      {
        heading: 'Submitting a notice',
        paragraphs: ['Send a written notice to support@igdown.pro with the subject “DMCA notice.” A complete notice should include:'],
        points: [
          'Identification of the copyrighted work claimed to be infringed.',
          'The exact IGDown or source URL and enough information to locate the allegedly infringing material or activity.',
          'Your name, mailing address, telephone number, and email address.',
          'A good-faith statement that the disputed use is not authorized by the owner, agent, or law.',
          'A statement under penalty of perjury that the notice is accurate and that you are the owner or authorized to act for the owner.',
          'A physical or electronic signature of the authorized person.',
        ],
      },
      {
        heading: 'What IGDown can review',
        paragraphs: [
          'IGDown is a link-processing tool and may not host the source post or original media. A complete notice helps determine what action is technically and legally available, which can include disabling a relevant service path, preserving necessary records, or directing a report to the host of the source material.',
          'Knowingly sending a materially false notice can create legal liability. Consider whether an exception, license, or authorized use applies before submitting a report.',
        ],
      },
      {
        heading: 'Counter-notices and repeat misuse',
        paragraphs: [
          'A person who believes material or access was disabled because of mistake or misidentification may contact the same address with a legally sufficient counter-notice. Include identification of the affected material, contact details, the required statements under applicable law, consent to relevant jurisdiction, and a signature.',
          'IGDown may restrict users or traffic patterns associated with repeated, substantiated infringement or abuse where technically identifiable and appropriate.',
        ],
      },
    ],
  },
  'cookie-policy': {
    slug: 'cookie-policy',
    title: 'Cookie Policy',
    description: 'Understand IGDown essential browser storage, optional analytics, and how to change or clear your analytics preference.',
    eyebrow: 'Privacy choices',
    intro: 'IGDown keeps optional analytics off until you give permission. The downloader remains available if you decline.',
    updatedAt: '2026-08-05',
    sections: [
      {
        heading: 'What the site stores',
        paragraphs: [
          'The analytics consent component stores your choice in local storage under igdown-analytics-consent. Local storage is browser data rather than an HTTP cookie, but it serves a similar preference-memory purpose. Essential hosting and security systems may use short-lived technical identifiers when required to route or protect requests.',
          'A protected internal statistics route can read an access cookie when an authorized operator uses that feature. It is not part of the public downloader workflow.',
        ],
      },
      {
        heading: 'Optional analytics',
        paragraphs: [
          'When a Google Analytics measurement ID is configured, the script loads only after you select Allow analytics. Google Analytics may then use browser storage or cookies to measure visits and interactions. IGDown requests IP anonymization in its configuration. Selecting Decline prevents that optional script from loading in the current browser.',
          'Vercel Analytics and Speed Insights are separately controlled by deployment configuration. See the Privacy Policy for the broader description of infrastructure and technical logs.',
        ],
      },
      {
        heading: 'Changing your choice',
        paragraphs: [
          'Use the preference reset button below, or clear site data for igdown.pro in your browser settings. After reset, reload or revisit the site and the consent prompt will appear again. Browser privacy controls can also block or delete storage independently of the website.',
        ],
      },
    ],
  },
};

export function buildTrustMetadata(page: TrustPageConfig): Metadata {
  const url = absoluteUrl(`/${page.slug}`);

  return {
    title: { absolute: `${page.title} | ${siteName}` },
    description: page.description,
    alternates: { canonical: `/${page.slug}` },
    robots: { index: true, follow: true },
    openGraph: {
      type: 'website',
      siteName,
      title: page.title,
      description: page.description,
      url,
      images: getOpenGraphImages(),
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: getTwitterImages(),
    },
  };
}
