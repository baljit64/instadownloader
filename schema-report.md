# Structured Data Report

## Implemented graph

| Scope | Types | Notes |
|---|---|---|
| Sitewide root | `WebSite`, `Organization` | Stable IDs, publisher relationship, logo ImageObject, support contact |
| English homepage | `CollectionPage`, `WebApplication`, `SoftwareApplication`, `ItemList`, `SiteNavigationElement`, `FAQPage` | Visible application, resource collection, primary navigation, and FAQs; free Offer |
| Other localized homepages | `WebPage`, `WebApplication`, `SoftwareApplication` | Locale-specific URL/language without inventing the English-only resource collection |
| Tool pages | `WebPage`, `BreadcrumbList`, `WebApplication`, `SoftwareApplication`, `FAQPage` | App entity replaces the previous Article misuse |
| Guide pages | `WebPage`, `BreadcrumbList`, `Article`, `FAQPage` | Organization author/publisher, image, genuine modified date |
| About/contact/legal | `AboutPage`, `ContactPage`, or `WebPage` plus breadcrumb | Matches visible trust content |
| Capability notices | `WebPage` | Noindex; describes the limitation, not a working app |

## Corrections made

- Removed the English homepage WebPage and application entity from the root layout, where they appeared on every route.
- Removed `sameAs` pointing to the organization’s own home URL; no verified external identity URLs are available.
- Changed applicable app markup to co-types `WebApplication` and `SoftwareApplication` with required `name` and `offers.price`.
- Emit Article only on guides, not tool pages.
- FAQ entities are generated only from FAQs displayed in HTML.
- Breadcrumb URLs point directly to canonical pages.
- SearchAction is omitted because IGDown has no internal site-search feature. The download input is not misrepresented as search.
- The brief's “WebSiteNavigationElement” label is implemented with the valid Schema.org type `SiteNavigationElement`.
- ItemList entries and navigation URLs are generated only from links visible on the English homepage.
- VideoObject is omitted because the page does not publish an owned embedded video with the required factual metadata.
- Ratings/reviews are omitted because the repository contains no verifiable user rating data.

Google requires structured data to represent visible page content and recommends fewer complete, accurate properties over speculative markup. Sources: [structured data introduction](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data), [general guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies), [software application schema](https://developers.google.com/search/docs/appearance/structured-data/software-app).

## Validation procedure

After deployment:

1. Test `/en` and each schema template in Google Rich Results Test.
2. Test raw JSON-LD with Schema.org Validator for vocabulary-level issues.
3. Compare every FAQ question/answer with visible text.
4. Confirm `NEXT_PUBLIC_SITE_URL` makes all IDs production-absolute.
5. Monitor Search Console enhancement reports; valid markup does not guarantee a rich result.
