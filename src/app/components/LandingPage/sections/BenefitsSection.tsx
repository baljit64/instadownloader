import type { BenefitItem } from '../content';
import { BenefitCard } from '../primitives';

interface BenefitsSectionProps {
  benefits: BenefitItem[];
}

export default function BenefitsSection({ benefits }: BenefitsSectionProps) {
  return (
    <section
      id="details"
      className="mt-12 grid gap-4 md:grid-cols-3"
    >
      {benefits.map((benefit) => (
        <BenefitCard key={benefit.title} {...benefit} />
      ))}
    </section>
  );
}
