import { lazy } from "react";

export const createLazyComponentWithPreload = <P extends object>(
  importFn: () => Promise<{ default: React.ComponentType<P> }>,
  preloadFn?: () => void
) => {
  let component: React.ComponentType<P> | null = null;
  let preloadPromise: Promise<{ default: React.ComponentType<P> }> | null =
    null;

  return {
    preload: () => {
      if (!preloadPromise) {
        preloadPromise = importFn();
        preloadPromise.catch(() => {
          preloadPromise = null; // Reset if the preload fails
        });
      }

      if (preloadFn) {
        preloadFn();
      }

      return preloadPromise;
    },
    component: lazy(() => {
      if (component) {
        return Promise.resolve({ default: component });
      }
      return importFn().then((module) => {
        component = module.default;
        return module;
      });
    }),
  };
};
