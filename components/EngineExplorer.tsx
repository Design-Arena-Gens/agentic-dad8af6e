"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BeakerIcon, BoltIcon, FunnelIcon, SparklesIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import type { Engine, FuelType } from "@/data/engines";
import { engines } from "@/data/engines";

const fuelFilters: { label: string; value: FuelType | "Tous" }[] = [
  { label: "Tous", value: "Tous" },
  { label: "Essence pure", value: "Essence" },
  { label: "Hybride", value: "Essence Hybridée" },
  { label: "Mild-Hybrid", value: "Essence Mild-Hybrid" }
];

const priorityModes = [
  { id: "performance", label: "Performance pure", description: "Puissance et couple max", icon: BoltIcon },
  { id: "efficiency", label: "Sobriété", description: "Consommation WLTP & CO₂ bas", icon: BeakerIcon },
  { id: "innovation", label: "Innovation", description: "Technologies et architecture", icon: SparklesIcon }
] as const;

type PriorityMode = (typeof priorityModes)[number]["id"];

interface Highlight {
  label: string;
  value: string;
}

const highlightItems: Highlight[] = [
  { label: "Puissance record", value: "Ferrari F163 (830 ch cumulés)" },
  { label: "Conso mixte la plus basse", value: "Renault HR12 Hybrid Turbo – 4,9 L/100 km" },
  { label: "Innovation radicale", value: "Mercedes-AMG M139l – turbo électrique dérivé de la F1" }
];

function computeScore(engine: Engine, mode: PriorityMode) {
  switch (mode) {
    case "performance":
      return engine.performanceScore;
    case "efficiency":
      return engine.efficiencyScore;
    case "innovation":
    default:
      return (engine.performanceScore + engine.efficiencyScore) / 2 + engine.innovations.length * 0.05;
  }
}

function formatScore(score: number) {
  return score.toFixed(1).replace(".", ",");
}

export function EngineExplorer() {
  const [activeFuel, setActiveFuel] = useState<FuelType | "Tous">("Tous");
  const [priority, setPriority] = useState<PriorityMode>("innovation");
  const [search, setSearch] = useState("");

  const filteredEngines = useMemo(() => {
    return engines
      .filter((engine) =>
        activeFuel === "Tous" ? true : engine.fuelType === activeFuel || (activeFuel === "Essence Hybridée" && engine.fuelType !== "Essence")
      )
      .filter((engine) => {
        if (!search.trim()) return true;
        const term = search.toLowerCase();
        return (
          engine.name.toLowerCase().includes(term) ||
          engine.manufacturer.toLowerCase().includes(term) ||
          engine.featuredIn.some((model) => model.toLowerCase().includes(term))
        );
      })
      .sort((a, b) => computeScore(b, priority) - computeScore(a, priority));
  }, [activeFuel, priority, search]);

  return (
    <section className="mx-auto mt-16 max-w-6xl px-6 pb-24">
      <div className="rounded-3xl bg-white/80 p-8 shadow-soft ring-1 ring-slate-200 backdrop-blur">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              <FunnelIcon className="h-5 w-5" />
              Filtrer le comparatif
            </div>
            <h2 className="font-display text-3xl font-semibold text-slate-900 lg:text-4xl">
              Trouvez le moteur essence idéal pour votre usage
            </h2>
            <p className="max-w-xl text-base text-slate-600">
              Classement actualisé des motorisations essence lancées depuis 2021. Utilisez les filtres pour prioriser la
              performance, la sobriété ou l&apos;innovation technologique.
            </p>
          </div>
          <div className="w-full max-w-xs">
            <label className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm focus-within:border-night focus-within:ring-2 focus-within:ring-night/10">
              <span className="text-slate-400">🔍</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Rechercher un modèle ou constructeur..."
                className="w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </label>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {fuelFilters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActiveFuel(filter.value)}
              className={clsx(
                "rounded-full border px-4 py-2 text-sm transition",
                activeFuel === filter.value
                  ? "border-night bg-night text-white shadow"
                  : "border-slate-200 bg-white text-slate-600 hover:border-night/40 hover:text-slate-900"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {priorityModes.map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => setPriority(mode.id)}
              className={clsx(
                "group rounded-2xl border border-slate-200 bg-slate-50/60 p-4 text-left transition hover:border-night/50 hover:bg-white hover:shadow-md",
                priority === mode.id && "border-night bg-white shadow-lg"
              )}
            >
              <div className="flex items-center gap-3">
                <mode.icon className="h-6 w-6 text-night" />
                <div>
                  <p className="font-medium text-slate-900">{mode.label}</p>
                  <p className="text-sm text-slate-500">{mode.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6">
          {filteredEngines.map((engine, index) => (
            <motion.article
              key={engine.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-3xl border border-slate-100 bg-gradient-to-br from-white via-white to-slate-50 p-6 shadow-sm ring-1 ring-transparent hover:ring-night/10"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-3 rounded-full bg-night px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-white">
                    <span>{engine.launchYear}</span>
                    <span className="h-1 w-1 rounded-full bg-white/60" />
                    <span>{engine.fuelType}</span>
                  </div>
                  <header>
                    <h3 className="font-display text-2xl font-semibold text-slate-900">{engine.name}</h3>
                    <p className="text-base text-slate-500">{engine.manufacturer}</p>
                  </header>
                  <p className="max-w-2xl text-sm text-slate-600">{engine.highlight}</p>
                  <ul className="flex flex-wrap gap-3 text-sm text-slate-600">
                    <li className="rounded-full bg-slate-100 px-4 py-1.5">{engine.power}</li>
                    <li className="rounded-full bg-slate-100 px-4 py-1.5">{engine.torque}</li>
                    <li className="rounded-full bg-slate-100 px-4 py-1.5">{engine.displacement}</li>
                    <li className="rounded-full bg-slate-100 px-4 py-1.5">{engine.cylinderLayout}</li>
                  </ul>
                </div>

                <div className="flex flex-col items-start gap-4 lg:items-end">
                  <div className="grid grid-cols-3 gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-center text-xs text-slate-500">
                    <div>
                      <p className="font-display text-2xl font-semibold text-night">{formatScore(engine.performanceScore)}</p>
                      <p>Performance</p>
                    </div>
                    <div>
                      <p className="font-display text-2xl font-semibold text-night">{formatScore(engine.efficiencyScore)}</p>
                      <p>Sobriété</p>
                    </div>
                    <div>
                      <p className="font-display text-2xl font-semibold text-night">{formatScore(engine.reliabilityScore)}</p>
                      <p>Fiabilité</p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
                    <p className="font-semibold text-night">À privilégier pour</p>
                    <p>{engine.bestFor}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-3">
                <div className="rounded-2xl bg-slate-100/60 p-4 text-sm text-slate-600">
                  <p className="font-semibold text-slate-800">Modèles équipés</p>
                  <ul className="mt-3 space-y-2">
                    {engine.featuredIn.map((model) => (
                      <li key={model} className="flex items-center gap-2">
                        <span className="text-night">•</span>
                        <span>{model}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl bg-slate-100/60 p-4 text-sm text-slate-600">
                  <p className="font-semibold text-slate-800">Chiffres clés</p>
                  <ul className="mt-3 space-y-2">
                    <li>
                      <span className="text-night font-medium">Consommation mixte :</span> {engine.averageConsumption}
                    </li>
                    <li>
                      <span className="text-night font-medium">Émissions CO₂ :</span> {engine.co2}
                    </li>
                    <li>
                      <span className="text-night font-medium">Innovations :</span> {engine.innovations.join(", ")}
                    </li>
                  </ul>
                </div>
                <div className="rounded-2xl bg-slate-100/60 p-4 text-sm text-slate-600">
                  <p className="font-semibold text-slate-800">À retenir</p>
                  <p className="mt-3 leading-relaxed">{engine.notes}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-dashed border-night/30 bg-night text-white">
          <div className="grid gap-6 p-6 md:grid-cols-3 md:p-10">
            {highlightItems.map((item) => (
              <div key={item.label} className="rounded-2xl bg-white/10 p-4 text-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-white/70">{item.label}</p>
                <p className="mt-2 text-base font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
