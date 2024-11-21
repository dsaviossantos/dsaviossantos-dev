"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Github,
  Instagram,
  Linkedin,
  TwitchIcon,
  Twitter,
  YoutubeIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BioPageContent, SocialLink, UrlLink } from "@/lib/types";

export default function HomePage({ content }: { content: BioPageContent }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-md"
    >
      <Card className="bg-green-900/60 border-green-700/50 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400/80 to-blue-500/80"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/80 to-green-400/80"></div>
        <CardHeader className="text-center relative">
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-green-400/40 rounded-full blur-3xl"
            animate={
              prefersReducedMotion
                ? {}
                : { scale: [1, 1.2, 1], opacity: [0.4, 0.5, 0.4] }
            }
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
          <motion.div
            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Avatar className="w-48 h-48 mx-auto border-2 border-green-400/70 ring-4 ring-green-400/30">
              <AvatarImage src={content.avatarUrl} alt={content.name} />
              <AvatarFallback>
                {content.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </motion.div>
          <motion.div variants={itemVariants}>
            <CardTitle className="mt-4 text-3xl font-bold text-green-100 font-['Orbitron',_sans-serif]">
              {content.name}
            </CardTitle>
          </motion.div>
          <motion.div variants={itemVariants}>
            <CardDescription className="text-green-300/90">
              {content.description}
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="space-y-4 relative z-10">
          {content.links.map((link: UrlLink, index: number) => (
            <motion.div key={index} variants={itemVariants}>
              <Button
                asChild
                variant="outline"
                className="w-full bg-green-800/30 text-green-100 border-green-600/50 hover:bg-green-700/40 hover:text-green-50 hover:border-green-400/60 transition-all duration-300 backdrop-blur-sm relative overflow-hidden group"
              >
                <motion.a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="relative z-10">{link.title}</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-400/40 to-blue-500/40 opacity-0"
                    initial={false}
                    animate={prefersReducedMotion ? {} : { opacity: 0 }}
                    whileHover={prefersReducedMotion ? {} : { opacity: 0.6 }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>
                </motion.a>
              </Button>
            </motion.div>
          ))}
        </CardContent>
        <CardFooter>
          <div className="flex justify-center space-x-4 w-full">
            {content.socialLinks.map((link: SocialLink, index: number) => {
              const Icon =
                {
                  Twitter: Twitter,
                  Instagram: Instagram,
                  Linkedin: Linkedin,
                  GitHub: Github,
                  Youtube: YoutubeIcon,
                  Twitch: TwitchIcon,
                }[link.platform] || Github;

              return (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400/90 hover:text-green-200 transition-colors duration-300"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                  animate={prefersReducedMotion ? {} : { y: [0, -5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2,
                  }}
                >
                  <Icon className="w-6 h-6" />
                  <span className="sr-only">{link.platform}</span>
                </motion.a>
              );
            })}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
