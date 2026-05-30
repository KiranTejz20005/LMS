import { browser } from '$app/environment';
import type { TLocale } from '@cio/db/types';

interface LessonDraft {
  content: string;
  timestamp: number;
}

function draftKey(lessonId: string, locale: TLocale): string {
  return `lesson-draft-${lessonId}-${locale}`;
}

export function saveDraft(lessonId: string, locale: TLocale, content: string) {
  if (!browser) return;
  try {
    const draft: LessonDraft = { content, timestamp: Date.now() };
    localStorage.setItem(draftKey(lessonId, locale), JSON.stringify(draft));
  } catch {
    // localStorage may be full or unavailable
  }
}

export function loadDraft(lessonId: string, locale: TLocale): LessonDraft | null {
  if (!browser) return null;
  try {
    const raw = localStorage.getItem(draftKey(lessonId, locale));
    if (!raw) return null;
    return JSON.parse(raw) as LessonDraft;
  } catch {
    return null;
  }
}

export function clearDraft(lessonId: string, locale: TLocale) {
  if (!browser) return;
  try {
    localStorage.removeItem(draftKey(lessonId, locale));
  } catch {
    // ignore
  }
}
