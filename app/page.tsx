import Image from "next/image";
import { Metadata } from "next";
import { EngineExplorer } from "@/components/EngineExplorer";
import { engines } from "@/data/engines";

export const revalidate = 86400;

const bestEfficiency = engines.reduce((acc, engine) => (engine.efficiencyScore > acc.efficiencyScore ? engine : acc), engines[0]);
const freshestLaunch = engines.reduce((acc, engine) => (engine.launchYear > acc.launchYear ? engine : acc), engines[0]);

export const metadata: Metadata = {
  title: "Meilleurs moteurs essence récents (2021-2024) | Comparatif complet",
  description:
    "Analyse des meilleurs moteurs essence récents : puissance, sobriété, innovations hybrides et modèles phares. Classement 2024 des motorisations essence de moins de trois ans.",
  alternates: {
    canonical: "https://agentic-dad8af6e.vercel.app"
  }
};

export default function Page() {
  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[600px] bg-gradient-to-br from-slate-900 via-slate-800 to-night blur-3xl opacity-60" />
      <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-20 pt-32 text-white lg:flex-row lg:items-center">
        <div className="flex-1 space-y-8">
          <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
            2024 • Moteurs essence de moins de 3 ans
          </span>
          <h1 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            Les moteurs essence les plus avancés à adopter dès maintenant
          </h1>
          <p className="max-w-2xl text-lg text-white/80">
            Nous passons en revue les motorisations essence les plus convaincantes lancées depuis 2021. Retrouvez leurs innovations, chiffres clés,
            modèles associés et notre verdict d&apos;experts pour choisir la configuration qui correspond à votre usage.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="rounded-2xl border border-white/20 bg-white/10 px-6 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-white/70">Efficient le plus primé</p>
              <p className="mt-2 text-lg font-semibold text-white">{bestEfficiency.name}</p>
              <p className="text-white/70">{bestEfficiency.manufacturer}</p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 px-6 py-4">
              <p className="text-xs uppercase tracking-[0.2em] text-white/70">Lancement le plus récent</p>
              <p className="mt-2 text-lg font-semibold text-white">{freshestLaunch.name}</p>
              <p className="text-white/70">Année {freshestLaunch.launchYear}</p>
            </div>
          </div>
        </div>
        <div className="relative flex-1">
          <div className="absolute -left-10 top-20 hidden h-32 w-32 rounded-full bg-dawn/60 blur-3xl md:block" />
          <Image
            src="https://images.unsplash.com/photo-1541447271487-09612b3f49c7?auto=format&fit=crop&w=900&q=80"
            alt="Bloc moteur haute performance"
            width={900}
            height={900}
            priority
            className="rounded-[2.5rem] border border-white/10 object-cover shadow-2xl"
          />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 text-slate-800">
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-soft backdrop-blur">
          <h2 className="font-display text-3xl font-semibold text-slate-900">Pourquoi se concentrer sur les moteurs récents ?</h2>
          <p className="mt-4 text-base text-slate-600">
            Depuis 2021, les motorisations essence ont bénéficié d&apos;importantes avancées : hybridation plus fine, réduction des particules,
            optimisation thermodynamique (cycles Miller/Atkinson, taux de compression élevés) et généralisation du refroidissement intelligent.
            Ces innovations permettent de concilier plaisir mécanique, conformité aux normes Euro 6d et accès aux zones à faibles émissions.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-night/70">Durabilité</p>
              <p className="mt-2 text-sm text-slate-600">
                Nouvelles architectures réduisant les frictions, management thermique intelligent, matériaux composites pour minimiser l&apos;usure.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-night/70">Sobriété</p>
              <p className="mt-2 text-sm text-slate-600">
                Hybridation légère ou rechargeable, injection haute pression de dernière génération, calibrage fin de l&apos;allumage.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-night/70">Connectivité</p>
              <p className="mt-2 text-sm text-slate-600">
                Gestion électronique reprogrammable, OTA, stratégies prédictives basées sur la navigation pour anticiper les besoins énergétiques.
              </p>
            </div>
          </div>
        </div>
      </section>

      <EngineExplorer />

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
            <h3 className="font-display text-2xl font-semibold text-slate-900">Comment nous avons sélectionné ces moteurs</h3>
            <ul className="mt-6 space-y-4 text-sm text-slate-600">
              <li>
                <span className="font-semibold text-night">Critères temporels :</span> motorisations apparues sur le marché européen ou mondial entre
                2021 et 2024, disponibles sur des véhicules de série.
              </li>
              <li>
                <span className="font-semibold text-night">Analyse :</span> données constructeur, rapports d&apos;organismes indépendants (Jato, Ward&apos;s
                10 Best Engines), retours presse spécialisée et fiabilité prévisionnelle.
              </li>
              <li>
                <span className="font-semibold text-night">Notation :</span> performance, efficience, fiabilité et apport technologique pondérés selon
                le positionnement du moteur.
              </li>
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-night p-8 shadow-soft text-white">
            <h3 className="font-display text-2xl font-semibold text-white">Conseils avant d&apos;acheter</h3>
            <ul className="mt-6 space-y-4 text-sm text-white/70">
              <li>
                <span className="font-semibold text-white">Garanties :</span> privilégiez les blocs couverts au moins 5 ans (voire 7 ans chez Hyundai/Kia).
              </li>
              <li>
                <span className="font-semibold text-white">Usage :</span> un moteur performant peut rester pertinent si son hybridation permet des trajets
                quotidiens en zéro émission.
              </li>
              <li>
                <span className="font-semibold text-white">Entretien :</span> respectez les périodicités, notamment pour les moteurs turbo à haute
                pression nécessitant une huile adaptée.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
