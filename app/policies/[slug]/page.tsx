import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import { commerce } from "@/lib/commerce";

type Params = { slug: string };

export async function generateStaticParams() {
  const policies = await commerce.getPolicies();
  return policies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const policy = await commerce.getPolicy((await params).slug);
  return { title: policy?.title ?? "Policy" };
}

export default function PolicyPage({ params }: { params: Promise<Params> }) {
  return (
    <Suspense fallback={<div className="mx-auto mt-12 h-8 max-w-2xl bg-sand" />}>
      <PolicyContent params={params} />
    </Suspense>
  );
}

async function PolicyContent({ params }: { params: Promise<Params> }) {
  const policy = await commerce.getPolicy((await params).slug);
  if (!policy) notFound();
  return (
    <article className="mx-auto mt-12 max-w-2xl">
      <h1 className="text-2xl font-semibold uppercase tracking-[0.2em]">{policy.title}</h1>
      <div className="mt-8 space-y-4 text-sm leading-relaxed">
        {policy.body.split(/\n\s*\n/).map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </article>
  );
}
