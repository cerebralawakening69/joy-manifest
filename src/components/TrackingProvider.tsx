// src/components/TrackingProvider.tsx
import { useEffect } from "react";
import { useTracking } from "@/src/hooks/useTracking";

export const TrackingProvider = ({ children }: { children: React.ReactNode }) => {
  const t = useTracking();

  useEffect(() => {
    // dispara 1x quando a página do quiz carrega
    t.trackLanding();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};
