import { useEffect } from 'react';

// Extend window object to include fbq
declare global {
  interface Window {
    fbq: any;
  }
}

interface MetaPixelEventParams {
  content_name?: string;
  content_category?: string;
  value?: number;
  currency?: string;
  custom_data?: Record<string, any>;
}

export const useMetaPixel = () => {
  const trackEvent = (eventName: string, params?: MetaPixelEventParams) => {
    if (typeof window !== 'undefined' && window.fbq) {
      try {
        if (params) {
          window.fbq('track', eventName, params);
        } else {
          window.fbq('track', eventName);
        }
        console.log(`Meta Pixel: ${eventName}`, params);
      } catch (error) {
        console.error('Meta Pixel tracking error:', error);
      }
    }
  };

  const trackCustomEvent = (eventName: string, params?: MetaPixelEventParams) => {
    if (typeof window !== 'undefined' && window.fbq) {
      try {
        window.fbq('trackCustom', eventName, params);
        console.log(`Meta Pixel Custom: ${eventName}`, params);
      } catch (error) {
        console.error('Meta Pixel custom tracking error:', error);
      }
    }
  };

  // Standard Facebook events
  const trackLead = (params?: MetaPixelEventParams) => trackEvent('Lead', params);
  const trackCompleteRegistration = (params?: MetaPixelEventParams) => trackEvent('CompleteRegistration', params);
  const trackViewContent = (params?: MetaPixelEventParams) => trackEvent('ViewContent', params);
  const trackInitiateCheckout = (params?: MetaPixelEventParams) => trackEvent('InitiateCheckout', params);

  // Custom events for quiz flow
  const trackQuizStarted = (params?: MetaPixelEventParams) => trackCustomEvent('QuizStarted', params);
  const trackQuizProgress = (questionNumber: number, manifestationProfile?: string) => {
    trackCustomEvent('QuizProgress', {
      content_name: `Question ${questionNumber}`,
      content_category: 'Quiz',
      custom_data: { question_number: questionNumber, manifestation_profile: manifestationProfile }
    });
  };
  const trackPatternRevealed = (pattern: string) => {
    trackCustomEvent('PatternRevealed', {
      content_name: pattern,
      content_category: 'Manifestation Pattern',
      value: 18
    });
  };

  return {
    trackEvent,
    trackCustomEvent,
    trackLead,
    trackCompleteRegistration,
    trackViewContent,
    trackInitiateCheckout,
    trackQuizStarted,
    trackQuizProgress,
    trackPatternRevealed
  };
};