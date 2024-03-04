import React from "react";
import cn from "classnames";
import Card from "../Card/Card";
import styles from "./EmptyState.module.scss";

export default function EmptyState() {
  return (
    <Card type="dashboard">
      <div className={cn(styles.wrapper)}>
        <p className={styles.statetext}>No hospitals to display</p>
        <p className={styles.helpertext}>
          Hospital list will be displayed here when available
        </p>
      </div>
    </Card>
  );
}
