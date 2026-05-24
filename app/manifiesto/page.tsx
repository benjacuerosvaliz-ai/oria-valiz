import { loadDoc } from "@/lib/content";

export const metadata = {
  title: "Manifiesto",
};

export default function ManifiestoPage() {
  const doc = loadDoc("manifiesto");
  return (
    <article className="mx-auto max-w-2xl px-6 py-24">
      <p className="eyebrow mb-6">Manifiesto</p>
      <div
        className="prose-oria text-lg"
        dangerouslySetInnerHTML={{ __html: doc.html }}
      />
    </article>
  );
}
