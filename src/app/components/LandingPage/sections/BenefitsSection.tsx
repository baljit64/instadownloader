import type { BenefitItem } from '../content';
import { BenefitCard } from '../primitives';

interface BenefitsSectionProps {
  benefits: BenefitItem[];
}

export default function BenefitsSection({ benefits }: BenefitsSectionProps) {
  return (
    <section
      id="details"
      className="mt-[4.5rem] grid gap-10 px-2 py-10 md:grid-cols-3 md:px-6 lg:mt-24"
    >
      {benefits.map((benefit) => (
        <BenefitCard key={benefit.title} {...benefit} />
      ))}
    </section>
  );
}
