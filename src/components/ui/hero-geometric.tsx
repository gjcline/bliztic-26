"use client";

import { motion } from "framer-motion";
import { Circle, ArrowRight, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ElegantShape } from "./elegant-shape";
import { Button } from "./button";

function HeroGeometric({
    badge,
    title1 = "Elevate Your Digital Vision",
    title2 = "Crafting Exceptional Websites",
    subtitle,
    description = "Crafting exceptional digital experiences through innovative design and cutting-edge technology.",
    primaryActionText = "Get Started",
    primaryActionHref = "/contact",
    secondaryActionText = "Learn More",
    secondaryActionHref = "/services",
    tertiaryActionText,
    tertiaryActionHref,
    hideAdditionalButtons = false,
}: {
    badge?: string;
    title1?: string;
    title2?: string;
    subtitle?: string;
    description?: string;
    primaryActionText?: string;
    primaryActionHref?: string;
    secondaryActionText?: string;
    secondaryActionHref?: string;
    tertiaryActionText?: string;
    tertiaryActionHref?: string;
    hideAdditionalButtons?: boolean;
}) {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.5 + i * 0.2,
                ease: [0.25, 0.4, 0.25, 1],
            },
        }),
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

            <div className="absolute inset-0 overflow-hidden">
                <ElegantShape
                    delay={0.3}
                    width={600}
                    height={140}
                    rotate={12}
                    gradient="from-indigo-500/[0.15]"
                    className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
                />

                <ElegantShape
                    delay={0.5}
                    width={500}
                    height={120}
                    rotate={-15}
                    gradient="from-rose-500/[0.15]"
                    className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
                />

                <ElegantShape
                    delay={0.4}
                    width={300}
                    height={80}
                    rotate={-8}
                    gradient="from-violet-500/[0.15]"
                    className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
                />

                <ElegantShape
                    delay={0.6}
                    width={200}
                    height={60}
                    rotate={20}
                    gradient="from-amber-500/[0.15]"
                    className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
                />

                <ElegantShape
                    delay={0.7}
                    width={150}
                    height={40}
                    rotate={-25}
                    gradient="from-cyan-500/[0.15]"
                    className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                        custom={0}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {badge && (
                            <div className="inline-block px-3 py-1 bg-white/5 text-white/60 rounded-full text-sm font-medium mb-6 border border-white/10">
                                {badge}
                            </div>
                        )}
                        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
                            {title1 && (
                                <>
                                    <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                                        {title1}
                                    </span>
                                    <br />
                                </>
                            )}
                            {title2 && (
                                <span
                                    className={cn(
                                        "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300"
                                    )}
                                >
                                    {title2}
                                </span>
                            )}
                        </h1>
                    </motion.div>

                    {subtitle && (
                        <motion.div
                            custom={1}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <p className="text-xl sm:text-2xl md:text-3xl text-white/70 mb-6 leading-relaxed font-medium tracking-wide max-w-2xl mx-auto px-4">
                                {subtitle}
                            </p>
                        </motion.div>
                    )}

                    <motion.div
                        custom={2}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <p className="text-base sm:text-lg md:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
                            {description}
                        </p>
                    </motion.div>

                    <motion.div
                        custom={3}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        {primaryActionText && (
                            <Button asChild>
                                <a href={primaryActionHref} target="_blank" rel="noopener noreferrer">{primaryActionText}</a>
                            </Button>
                        )}
                        {secondaryActionText && (
                            <Button asChild>
                                {secondaryActionHref.startsWith('#') ? (
                                    <a
                                      href={secondaryActionHref}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        const targetId = secondaryActionHref.replace('#', '');
                                        const element = document.getElementById(targetId);
                                        if (element) {
                                          const navbarHeight = 80;
                                          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                                          const offsetPosition = elementPosition - navbarHeight;
                                          window.scrollTo({
                                            top: offsetPosition,
                                            behavior: 'smooth'
                                          });
                                        }
                                      }}
                                    >
                                      {secondaryActionText}
                                      <ArrowDown className="ml-2 w-4 h-4" />
                                    </a>
                                ) : (
                                    <Link to={secondaryActionHref} onClick={() => window.scrollTo(0, 0)}>
                                      {secondaryActionText}
                                    </Link>
                                )}
                            </Button>
                        )}
                        {tertiaryActionText && tertiaryActionHref && (
                            <Button variant="outline" asChild>
                                {tertiaryActionHref.startsWith('#') ? (
                                    <a
                                      href={tertiaryActionHref}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        const targetId = tertiaryActionHref.replace('#', '');
                                        const element = document.getElementById(targetId);
                                        if (element) {
                                          const navbarHeight = 80;
                                          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                                          const offsetPosition = elementPosition - navbarHeight;
                                          window.scrollTo({
                                            top: offsetPosition,
                                            behavior: 'smooth'
                                          });
                                        }
                                      }}
                                    >
                                      {tertiaryActionText}
                                      <ArrowDown className="ml-2 w-4 h-4" />
                                    </a>
                                ) : (
                                    <Link to={tertiaryActionHref} onClick={() => window.scrollTo(0, 0)}>
                                      {tertiaryActionText}
                                      <ArrowDown className="ml-2 w-4 h-4" />
                                    </Link>
                                )}
                            </Button>
                        )}
                    </motion.div>

                    {!hideAdditionalButtons && (
                        <motion.div
                            custom={4}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-col sm:flex-row gap-4 justify-center mt-4"
                        >
                            <Button variant="outline" asChild>
                                <Link to="/gtm-fund" onClick={() => window.scrollTo(0, 0)}>
                                    GTM Fund
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link to="/ai-workforce" onClick={() => window.scrollTo(0, 0)}>
                                    AI Workforce
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link to="/dev" onClick={() => window.scrollTo(0, 0)}>
                                    Development
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </Button>
                        </motion.div>
                    )}
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
        </div>
    );
}

export { HeroGeometric };