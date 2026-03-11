import {
  detectSupportedPlatform,
  supportedPlatformLabels,
  type SupportedPlatform,
} from '../../lib/media';
import type { TranslationDictionary } from '../../lib/i18n';

const providerTextHints: Array<[SupportedPlatform, string[]]> = [
  ['instagram', ['instagram.com', 'instagr.am']],
  ['youtube', ['youtube.com', 'youtu.be']],
  ['tiktok', ['tiktok.com']],
  ['facebook', ['facebook.com', 'fb.watch']],
  ['x', ['x.com', 'twitter.com']],
  ['pinterest', ['pinterest.com', 'pin.it']],
];

function detectTypedPlatformHint(value: string): SupportedPlatform | null {
  const directDetection = detectSupportedPlatform(value);
  if (directDetection) {
    return directDetection;
  }

  const normalized = value.trim().toLowerCase();
  if (!normalized) {
    return null;
  }

  for (const [platform, hints] of providerTextHints) {
    if (hints.some((hint) => normalized.includes(hint))) {
      return platform;
    }
  }

  return null;
}

export function getAssistantState(
  copy: TranslationDictionary['hero'],
  value: string
) {
  const trimmed = value.trim();
  const provider = detectTypedPlatformHint(trimmed);
  const looksLikeUrl = /^https?:\/\//i.test(trimmed);

  if (!trimmed) {
    return {
      chips: copy.aiAssist.standbyChips,
      message: copy.aiAssist.standbyMessage,
      title: copy.aiAssist.standbyTitle,
      tone: 'neutral' as const,
    };
  }

  if (provider) {
    return {
      chips: [
        supportedPlatformLabels[provider],
        provider === 'instagram'
          ? copy.aiAssist.nativeExtractor
          : copy.aiAssist.universalExtractor,
        copy.aiAssist.previewFlow,
      ],
      message:
        provider === 'instagram'
          ? copy.aiAssist.nativeMessage
          : copy.aiAssist.universalMessage,
      title: `${supportedPlatformLabels[provider]} ${copy.aiAssist.recognizedSuffix}`,
      tone: 'ready' as const,
    };
  }

  if (looksLikeUrl) {
    return {
      chips: copy.aiAssist.unsupportedChips,
      message: copy.aiAssist.unsupportedMessage,
      title: copy.aiAssist.unsupportedTitle,
      tone: 'warning' as const,
    };
  }

  return {
    chips: copy.aiAssist.inputChips,
    message: copy.aiAssist.inputMessage,
    title: copy.aiAssist.inputTitle,
    tone: 'neutral' as const,
  };
}
