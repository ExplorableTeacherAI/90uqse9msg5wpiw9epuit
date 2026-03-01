import { type ReactElement } from "react";
import { recamanBlocks } from "@/sections/recaman";

// Initialize variables and their colors from this file's variable definitions
import { useVariableStore, initializeVariableColors } from "@/stores";
import { getDefaultValues, variableDefinitions } from "./variables";
useVariableStore.getState().initialize(getDefaultValues());
initializeVariableColors(variableDefinitions);

/**
 * The Recamán Sequence: A Number That Spirals
 *
 * An interactive, explorable explanation for learning sequences for the first time.
 */

export const blocks: ReactElement[] = recamanBlocks;
