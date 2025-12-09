"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";

interface ShinyButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
  href?: string;
}

export default function ShinyButton({ children, className, href, ...props }: ShinyButtonProps) {
  const content = (
    <span className="relative z-10 flex items-center justify-center gap-2">
      {children}
    </span>
  );

  const classes = clsx(
    "relative px-8 py-3 rounded-full font-semibold overflow-hidden group inline-block",
    "bg-gradient-to-r from-blue-600 to-purple-600 text-white",
    className
  );

  const overlay = (
    <>
      <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 transition-all duration-1000 group-hover:left-[100%]" />
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-300 shadow-[0_0_20px_rgba(59,130,246,0.6)]" />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full h-full flex items-center justify-center">
          {content}
          {overlay}
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={classes}
      {...props}
    >
      {content}
      {overlay}
    </motion.button>
  );
}
