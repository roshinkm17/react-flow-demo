// Create a component that serves as the provider for the context

import { SelectedNodeContext } from "App";
import { useContext } from "react";

export function useSelectedNode() {
  const context = useContext(SelectedNodeContext);
  if (context === undefined) {
    throw new Error(
      "useSelectedNode must be used within a SelectedNodeContextProvider"
    );
  }
  return context;
}
