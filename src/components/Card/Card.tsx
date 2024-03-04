import React from "react";
import cn from "classnames";
import styles from "./Card.module.scss";

interface CardProps {
  /** Card children property */
  children: React.ReactNode;
  /** Optional classname property */
  className?: string;
  /** Optional style object to add inline styling */
  style?: Record<string, string>;
  /** Card type */
  type?: "general" | "dashboard";
}

export default function Card({ style, className, children, type }: CardProps) {
  return (
    <article
      style={style}
      className={cn(className, styles.card, {
        [styles.card__dashboard]: type === "dashboard",
      })}
    >
      {children}
    </article>
  );
}
