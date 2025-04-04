import { NhostClient } from "@nhost/react";

export const nhost = new NhostClient({
    region: process.env.REACT_APP_NHOST_REGION,
    subdomain: process.env.REACT_APP_NHOST_SUBDOMAIN,
  });