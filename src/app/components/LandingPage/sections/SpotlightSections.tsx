import type { SpotlightItem } from '../content';
import { SpotlightSection } from '../primitives';

interface SpotlightSectionsProps {
  sections: SpotlightItem[];
}

export default function SpotlightSections({ sections }: SpotlightSectionsProps) {
  return (
    <div className="mt-10 space-y-20 sm:space-y-28">
      {sections.map((section) => (
        <SpotlightSection key={section.id} {...section} />
      ))}
    </div>
  );
}
