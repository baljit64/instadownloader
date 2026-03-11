interface StructuredDataScriptProps {
  data: Record<string, unknown> | null;
}

export default function StructuredDataScript({ data }: StructuredDataScriptProps) {
  if (!data) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
