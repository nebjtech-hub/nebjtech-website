import React, { useMemo, useState, useRef } from "react";
import { motion } from "framer-motion";

import {
  ArrowRight,
  Code2,
  LayoutTemplate,
  Laptop2,
  Palette,
  ShieldCheck,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Quote,
  Play,
  BadgeCheck,
  Layers,
} from "lucide-react";

/**
 * NEBJ Tech – One-page landing (React + Tailwind)
 * Responsive: mobile-first (320px OK) -> tablet -> desktop
 *
 * Assets:
 *  - /public/logo.png
 */

const COLORS = {
  primary: "#0B3CCB",
  secondary: "#1E6FFF",
  violet: "#7B4DFF",
  cyan: "#3FB8FF",
  soft: "#F2D9FF",
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 180, damping: 18 } },
};

function GradientText({ children }) {
  return (
    <span
      style={{
        background: `linear-gradient(90deg, ${COLORS.cyan}, ${COLORS.violet}, ${COLORS.primary})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {children}
    </span>
  );
}

function WaveDivider({ flip = false }) {
  return (
    <div className={"relative h-14 sm:h-20" + (flip ? " rotate-180" : "")} aria-hidden>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path
          d="M0,64 C160,120 320,120 480,86 C640,52 800,-8 960,10 C1120,28 1280,88 1440,64 L1440,120 L0,120 Z"
          fill="#ffffff"
        />
      </svg>
    </div>
  );
}

function SectionTitle({ eyebrow, title, subtitle, align = "center" }) {
  return (
    <motion.div variants={item} className={align === "left" ? "max-w-2xl" : "mx-auto max-w-2xl text-center"}>
      <p className="text-sm font-medium tracking-wide text-slate-500">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
      <p className="mt-3 text-base leading-relaxed text-slate-600">{subtitle}</p>
    </motion.div>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur">
      <Sparkles className="h-3.5 w-3.5" />
      {children}
    </span>
  );
}

function IconBadge({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm backdrop-blur">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-2xl text-white shadow"
        style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.violet})` }}
      >
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-sm font-semibold text-slate-800">{label}</p>
    </div>
  );
}

function ServiceCard({ icon: Icon, title, desc, points }) {
  return (
    <motion.div
      variants={item}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full opacity-20 blur-3xl"
        style={{ background: `radial-gradient(circle, ${COLORS.violet} 0%, transparent 65%)` }}
      />

      <div className="flex items-start gap-4">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow"
          style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.violet})` }}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">{desc}</p>
        </div>
      </div>

      <ul className="mt-4 space-y-2">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-2 text-sm text-slate-700">
            <CheckCircle2 className="mt-0.5 h-4 w-4" style={{ color: COLORS.secondary }} />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function StatMini({ value, label }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur">
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="mt-1 text-sm text-white/70">{label}</p>
    </div>
  );
}

function PortfolioCard({ title, desc, img }) {
  return (
    <motion.div variants={item} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="relative h-44">
        {img ? (
          <img src={img} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div
            className="h-full w-full"
            style={{
              background:
                `linear-gradient(135deg, ${COLORS.primary}22, ${COLORS.violet}22),` +
                `radial-gradient(circle at 30% 30%, ${COLORS.cyan}55 0%, transparent 55%)`,
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="mt-1 text-xs text-white/85">{desc}</p>
        </div>
      </div>
      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          {["React", "Tailwind", "API"].map((t) => (
            <span key={t} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Application web",
    message: "",
  });

  const CONTACT = useMemo(
    () => ({
      phoneDisplay: "+241 74 244 291",
      phoneLink: "+24174244291",
      email: "nebjtech@gmail.com",
      city: "Libreville, Gabon",
      whatsappLink: "https://wa.me/24174244291",
    }),
    []
  );

  const nav = useMemo(
    () => [
      { id: "services", label: "Services" },
      { id: "about", label: "À propos" },
      { id: "process", label: "Process" },
      { id: "realisations", label: "Réalisations" },
      { id: "contact", label: "Contact" },
    ],
    []
  );

  const services = useMemo(
    () => [
      {
        icon: Code2,
        title: "Applications web sur mesure",
        desc: "Sites vitrines, plateformes, back-offices, dashboards, réservation, etc.",
        points: ["UI/UX moderne", "Développement React / API", "Déploiement"],
      },
      {
        icon: LayoutTemplate,
        title: "Création de sites professionnels",
        desc: "Un site rapide, responsive et optimisé SEO pour convertir vos visiteurs.",
        points: ["Design premium", "Performance & SEO", "Maintenance possible"],
      },
      {
        icon: Laptop2,
        title: "Solutions Office & Windows",
        desc: "Installation, configuration et optimisation de votre poste de travail.",
        points: ["Office (install/config)", "Activation Windows", "Mises à jour & optimisation"],
      },
      {
        icon: Palette,
        title: "Design graphique",
        desc: "Identité visuelle et supports de communication adaptés à votre marque.",
        points: ["Logo", "Flyers / affiches", "Signature e-mail / carte de visite"],
      },
      {
        icon: ShieldCheck,
        title: "Sécurité & bonnes pratiques",
        desc: "On vous aide à réduire les risques et à protéger vos données.",
        points: ["Sauvegardes", "Durcissement", "Conseils & accompagnement"],
      },
      {
        icon: Layers,
        title: "Pack entreprise",
        desc: "Un pack complet pour démarrer : site + identité + outils de travail.",
        points: ["Site + email pro", "Logo + flyers", "IT & configuration"],
      },
    ],
    []
  );

  const steps = useMemo(
    () => [
      { t: "Définir le besoin", d: "Objectifs, cible, fonctionnalités, délais." },
      { t: "Design & maquettes", d: "UI moderne, parcours clair, validation." },
      { t: "Développement", d: "Front + API, intégrations, performance." },
      { t: "Livraison", d: "Mise en ligne, support & évolutions." },
    ],
    []
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "contact",
          name: formData.name,
          email: formData.email,
          service: formData.service,
          message: formData.message,
        }).toString(),
      });

      if (response.ok) {
        setFormStatus({ type: "success", message: "✓ Merci ! Votre demande a été envoyée." });
        setFormData({ name: "", email: "", service: "Application web", message: "" });
      } else {
        setFormStatus({ type: "error", message: "Erreur lors de l'envoi. Veuillez réessayer." });
      }
    } catch (error) {
      setFormStatus({ type: "error", message: "Erreur de connexion. Veuillez réessayer." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      {/* Background accents */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-20 blur-3xl"
          style={{ background: `radial-gradient(circle, ${COLORS.cyan} 0%, transparent 60%)` }}
        />
        <div
          className="absolute -right-24 top-40 h-80 w-80 rounded-full opacity-20 blur-3xl"
          style={{ background: `radial-gradient(circle, ${COLORS.violet} 0%, transparent 60%)` }}
        />
        <div
          className="absolute bottom-0 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full opacity-15 blur-3xl"
          style={{ background: `radial-gradient(circle, ${COLORS.primary} 0%, transparent 60%)` }}
        />
      </div>

      {/* Top bar */}
      <div className="hidden border-b border-slate-200/70 bg-white/70 backdrop-blur sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs text-slate-600">
          <span className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5" /> {CONTACT.city}
          </span>
          <span className="flex items-center gap-4">
            <a className="hover:text-slate-900" href={`mailto:${CONTACT.email}`}>
              {CONTACT.email}
            </a>
            <a className="hover:text-slate-900" href={`tel:${CONTACT.phoneLink}`}>
              {CONTACT.phoneDisplay}
            </a>
          </span>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6">
          <a href="#top" className="flex items-center gap-3">
            <img src="/logo.png" alt="NEBJ Tech" className="h-28 w-28 rounded-xl object-contain" />
            <div className="leading-tight">
              <p className="text-sm font-semibold">NEBJ Tech</p>
              <p className="text-xs text-slate-500">Digital Solutions</p>
            </div>
          </a>

          <nav className="hidden items-center gap-6 sm:flex">
            {nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="text-sm font-medium text-slate-600 hover:text-slate-900">
                {n.label}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-xl px-4 py-2 text-sm font-semibold text-white shadow"
              style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.violet})` }}
            >
              Obtenir un devis
            </a>
          </nav>

          <button
            className="sm:hidden rounded-xl border border-slate-200 px-3 py-2 text-sm"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Ouvrir le menu"
          >
            Menu
          </button>
        </div>

        {menuOpen ? (
          <div className="sm:hidden border-t border-slate-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 py-3">
              <div className="flex flex-col gap-3">
                {nav.map((n) => (
                  <a
                    key={n.id}
                    href={`#${n.id}`}
                    className="text-sm font-medium text-slate-700"
                    onClick={() => setMenuOpen(false)}
                  >
                    {n.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-white shadow"
                  style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.violet})` }}
                >
                  Obtenir un devis
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      {/* HERO */}
      <main id="top">
        <section className="relative overflow-hidden">
          <div
            className="relative"
            style={{
              background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.violet} 55%, ${COLORS.cyan} 110%)`,
            }}
          >
            <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-20 lg:grid-cols-2">
              <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
                <motion.div variants={item} className="flex flex-wrap items-center gap-3">
                  <Pill>Solutions Web & IT à Libreville</Pill>
                </motion.div>

                <motion.h1
                  variants={item}
                  className="text-4xl font-bold tracking-tight text-white leading-[1.05] sm:text-5xl sm:leading-[1.05]"
                >
                  Boostez votre business avec des solutions
                  <span className="block">digitales modernes.</span>
                </motion.h1>

                <motion.p variants={item} className="text-base leading-relaxed text-white/85 max-w-xl">
                  NEBJ Tech crée des <b>applications web</b> pour entreprises et particuliers, réalise vos <b>logos</b>,{" "}
                  <b>flyers</b>, <b>signature e-mail</b>, installe vos solutions <b>Office/Windows</b>.
                </motion.p>

                <motion.div variants={item} className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href="#contact"
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow"
                  >
                    Demander un devis <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#realisations"
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur"
                  >
                    Voir nos projets
                  </a>
                </motion.div>

                {/* Stats */}
                <motion.div variants={item} className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-3">
                  <StatMini value="⚡" label="Rapide" />
                  <StatMini value="🎯" label="Sur-mesure" />
                  <StatMini value="✅" label="Pro" />
                </motion.div>
              </motion.div>

              {/* Right hero card */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 140, damping: 16, delay: 0.12 }}
                className="relative"
              >
                <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 shadow-2xl backdrop-blur">
                  <div className="relative aspect-[4/3]">
                    <img
                      src="/hero.png"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                      alt="NEBJ Tech"
                      className="absolute inset-0 h-full w-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

                    <div className="absolute bottom-4 left-4 right-4 grid gap-3">
                      <div className="grid gap-3 sm:grid-cols-2">
                        <IconBadge icon={BadgeCheck} label="Livraison & support" />
                        <IconBadge icon={Code2} label="Apps web React" />
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <IconBadge icon={Palette} label="Logo & flyers" />
                        <IconBadge icon={Laptop2} label="Office / Windows" />
                      </div>
                    </div>

                    <div className="absolute right-4 top-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-900 shadow">
                          <Play className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <WaveDivider />
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
            <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <SectionTitle
                  eyebrow="Qui sommes-nous ?"
                  title={
                    <>
                      NEBJ Tech, votre partenaire <GradientText>digital</GradientText>
                    </>
                  }
                  subtitle="Basés à Libreville, nous accompagnons entreprises et particuliers : développement web, design graphique et solutions IT."
                  align="left"
                />

                <motion.div variants={item} className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                  {["Entreprise locale", "Qualité premium", "Délais clairs", "Support après livraison"].map((x) => (
                    <div key={x} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                      <p className="text-sm font-semibold text-slate-900">{x}</p>
                      <p className="mt-1 text-xs text-slate-600">Une expérience simple, rapide et professionnelle.</p>
                    </div>
                  ))}
                </motion.div>
              </div>

              <motion.div variants={item} className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div className="grid gap-6 lg:grid-cols-3 lg:items-center">
                  <div className="lg:col-span-2">
                    <p className="text-lg font-semibold text-slate-900">Vous voulez un rendu comme un vrai produit ?</p>
                    <p className="mt-1 text-sm text-slate-600">
                      On conçoit une interface moderne, on développe proprement, puis on déploie.
                    </p>
                  </div>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow"
                    style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.violet})` }}
                  >
                    Lancer mon projet <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="border-t border-slate-200/70 bg-slate-50/70">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
            <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
              <SectionTitle eyebrow="Nos services" title="On résout vos besoins web, design et IT" subtitle="Une offre claire, des livraisons propres, un rendu moderne." />

              <div className="mt-10 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((s) => (
                  <ServiceCard key={s.title} {...s} />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Band */}
        <section className="bg-slate-50/70">
          <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6">
            <div className="overflow-hidden rounded-3xl p-7 sm:p-8 text-white shadow" style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.violet})` }}>
              <div className="grid gap-6 lg:grid-cols-3 lg:items-center">
                <div className="lg:col-span-2">
                  <p className="text-sm font-semibold text-white/85">NEBJ Tech • Libreville</p>
                  <p className="mt-2 text-2xl font-bold">Restons connectés avec des solutions IT de pointe</p>
                  <p className="mt-2 text-sm text-white/85">Site • App web • Logo • Flyers • Office/Windows — un seul contact.</p>
                </div>
                <div className="flex flex-col gap-3">
                  <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900">
                    Demander un devis <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href={CONTACT.whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur"
                  >
                    WhatsApp <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="border-t border-slate-200/70 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
            <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
              <SectionTitle eyebrow="Notre process" title="Une méthode simple" subtitle="Clair, rapide, efficace — comme le template." />
              <div className="mt-10 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {steps.map((s, idx) => (
                  <motion.div key={s.t} variants={item} className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="absolute right-4 top-4 text-sm font-semibold text-slate-400">0{idx + 1}</div>
                    <p className="text-lg font-semibold text-slate-900">{s.t}</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.d}</p>
                    <div className="mt-4 h-1.5 w-16 rounded-full" style={{ background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.violet})` }} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* PORTFOLIO */}
        <section id="realisations" className="border-t border-slate-200/70 bg-slate-50/70">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
            <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
              <SectionTitle eyebrow="Projets" title="Dernières réalisations" />
              <div className="mt-10 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <PortfolioCard title="application de gestion de tickets" desc="Gestion des incidents IT de l'entreprise" img="/helpdesk.png" />
                <PortfolioCard title="Octobre Rose" desc="Application de caravane médicale" img="/octobrerose.png" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="border-t border-slate-200/70 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
            <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
              <SectionTitle eyebrow="Contact" title="Parlons de votre projet" subtitle="Réponse rapide. Devis clair. Accompagnement complet (Libreville et à distance)." />

              <div className="mt-10 grid gap-6 grid-cols-1 lg:grid-cols-2">
                <motion.div variants={item} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-lg font-semibold text-slate-900">Coordonnées</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Décris ton besoin : app, site, logo, flyers, installation Office/Windows.
                  </p>

                  <div className="mt-6 space-y-3">
                    <a className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 hover:bg-slate-100" href={`tel:${CONTACT.phoneLink}`}>
                      <Phone className="h-4 w-4" style={{ color: COLORS.primary }} />
                      <span>{CONTACT.phoneDisplay}</span>
                    </a>
                    <a className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 hover:bg-slate-100" href={`mailto:${CONTACT.email}`}>
                      <Mail className="h-4 w-4" style={{ color: COLORS.violet }} />
                      <span>{CONTACT.email}</span>
                    </a>
                    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800">
                      <MapPin className="h-4 w-4" style={{ color: COLORS.secondary }} />
                      <span>{CONTACT.city}</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <a
                      href={CONTACT.whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow"
                      style={{ background: `linear-gradient(135deg, ${COLORS.secondary}, ${COLORS.primary})` }}
                    >
                      Écrire sur WhatsApp <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </motion.div>

                <motion.div variants={item} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-lg font-semibold text-slate-900">Demande rapide</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Remplissez le formulaire ci-dessous. Nous vous répondrons rapidement.
                  </p>

                  <div className="mt-6 space-y-4">
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                      <div>
                        <label className="text-xs font-medium text-slate-600">Nom</label>
                        <input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200"
                          placeholder="Votre nom"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-slate-600">Email</label>
                        <input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200"
                          placeholder="vous@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-600">Service</label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200"
                      >
                        <option>Application web</option>
                        <option>Site vitrine</option>
                        <option>Installation Office / Windows</option>
                        <option>Logo / Flyers</option>
                        <option>Autre</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-600">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200"
                        placeholder="Décrivez votre besoin (objectif, délai, budget si possible)"
                      />
                    </div>

                    <button
                      onClick={handleFormSubmit}
                      disabled={isSubmitting}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow disabled:opacity-50"
                      style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.violet})` }}
                    >
                      {isSubmitting ? "Envoi en cours..." : "Envoyer"} <ArrowRight className="h-4 w-4" />
                    </button>

                    {formStatus && (
                      <div
                        className={`mt-4 rounded-2xl p-4 text-sm font-medium ${
                          formStatus.type === "success"
                            ? "bg-green-50 text-green-800"
                            : "bg-red-50 text-red-800"
                        }`}
                      >
                        {formStatus.message}
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-200/70 bg-slate-50">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-10 text-center sm:flex-row sm:px-6 sm:text-left">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="NEBJ Tech" className="h-14 w-14 rounded-xl object-contain" />
              <div>
                <p className="text-sm font-semibold text-slate-900">NEBJ Tech</p>
                <p className="text-xs text-slate-500">© {new Date().getFullYear()} • Tous droits réservés</p>
              </div>
            </div>
          </div>
        </footer>
      </main>

      <style>{`html{scroll-behavior:smooth;}`}</style>
    </div>
  );
}