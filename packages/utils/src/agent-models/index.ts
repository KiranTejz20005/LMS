/**
 * Shared registry of LLM models the AI assistant can use.
 *
 * - `AGENT_MODELS` is the full set the backend supports.
 * - `UI_PICKER_MODEL_IDS` is the subset shown in the dashboard model picker.
 */

export const AGENT_MODEL_IDS = [
  'groq-llama-3.3-70b',
  'nvidia-llama-3.1-70b',
  'gemini-3.1-flash-lite',
  'gpt-5.4-mini',
  'claude-sonnet-3-5',
  'kimi-k2.6'
] as const;

export type AgentModelId = (typeof AGENT_MODEL_IDS)[number];
export type AgentModelProvider = 'google' | 'openai' | 'anthropic' | 'moonshot' | 'groq' | 'nvidia';
export type AgentModelCostTier = 'low' | 'high';

export interface AgentModelDescriptor {
  provider: AgentModelProvider;
  label: string;
  /** The exact model id passed to the provider SDK. */
  backendModelId: string;
  /** Whether this model is available on the free plan. */
  isFree: boolean;
  /** Cost tier shown in the model picker — 'low' ($) or 'high' ($$$). */
  costTier: AgentModelCostTier;
  /** Context window size in tokens. Used to show context usage indicator. */
  contextWindow: number;
}

export const AGENT_MODELS: Record<AgentModelId, AgentModelDescriptor> = {
  'groq-llama-3.3-70b': {
    provider: 'groq',
    label: 'Llama 3.1 8B (Groq)',
    backendModelId: 'llama-3.1-8b-instant',
    isFree: true,
    costTier: 'low',
    contextWindow: 128_000
  },
  'nvidia-llama-3.1-70b': {
    provider: 'nvidia',
    label: 'Llama 3.1 8B (NVIDIA)',
    backendModelId: 'meta/llama-3.1-8b-instruct',
    isFree: true,
    costTier: 'low',
    contextWindow: 128_000
  },
  'gemini-3.1-flash-lite': {
    provider: 'google',
    label: 'Gemini 3.1 Flash Lite',
    backendModelId: 'gemini-3.1-flash-lite',
    isFree: true,
    costTier: 'low',
    contextWindow: 1_048_576
  },
  'gpt-5.4-mini': {
    provider: 'openai',
    label: 'GPT-5.4 Mini',
    backendModelId: 'gpt-5.4-mini',
    isFree: false,
    costTier: 'low',
    contextWindow: 400_000
  },
  'claude-sonnet-3-5': {
    provider: 'anthropic',
    label: 'Claude Sonnet 4.6',
    backendModelId: 'claude-sonnet-4-6',
    isFree: false,
    costTier: 'high',
    contextWindow: 1_000_000
  },
  'kimi-k2.6': {
    provider: 'moonshot',
    label: 'Kimi K2.6',
    backendModelId: 'kimi-k2.6',
    isFree: true,
    costTier: 'low',
    contextWindow: 262_144
  }
};

export const UI_PICKER_MODEL_IDS = [
  'groq-llama-3.3-70b',
  'nvidia-llama-3.1-70b',
  'gemini-3.1-flash-lite',
  'kimi-k2.6',
  'gpt-5.4-mini',
  'claude-sonnet-3-5'
] as const satisfies readonly AgentModelId[];

export const DEFAULT_PICKER_MODEL_ID: AgentModelId = 'groq-llama-3.3-70b';
