import type { SpotlightItem } from '../content';
import { SpotlightSection } from '../primitives';

interface SpotlightSectionsProps {
  sections: SpotlightItem[];
}

export default function SpotlightSections({ sections }: SpotlightSectionsProps) {
  return (
    <div className="mt-12 space-y-6">
      {sections.map((section) => (
        <SpotlightSection key={section.id} {...section} />
      ))}
    </div>
  );
}
