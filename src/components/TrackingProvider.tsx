import { useEffect } from 'react';
import { useTracking } from '@/hooks/useTracking';

export const TrackingProvider = ({ children }: { children: React.ReactNode }) => {
  const { trackEvent } = useTracking();

  useEffect(() => {
    // Track page load
    trackEvent('page_load', {
      page: 'quiz_landing',
      url: window.location.href,
      timestamp: new Date().toISOString()
    });

    // Track browser info
    trackEvent('browser_info', {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      cookieEnabled: navigator.cookieEnabled,
      onlineStatus: navigator.onLine
    });

    // Track viewport
    trackEvent('viewport_info', {
      width: window.innerWidth,
      height: window.innerHeight,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height
    });

    // Track scroll events
    let scrollTimer: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const scrollPercent = Math.round(
          (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );
        
        if (scrollPercent > 0 && scrollPercent % 25 === 0) {
          trackEvent('scroll_milestone', {
            percent: scrollPercent,
            timestamp: new Date().toISOString()
          });
        }
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);

    // Track time on page
    const startTime = Date.now();
    const timeTracker = setInterval(() => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      if (timeSpent % 30 === 0) { // Track every 30 seconds
        trackEvent('time_on_page', {
          seconds: timeSpent,
          timestamp: new Date().toISOString()
        });
      }
    }, 1000);

    // Track visibility changes
    const handleVisibilityChange = () => {
      trackEvent('visibility_change', {
        hidden: document.hidden,
        timestamp: new Date().toISOString()
      });
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(timeTracker);
      clearTimeout(scrollTimer);
    };
  }, [trackEvent]);

  return <>{children}</>;
};