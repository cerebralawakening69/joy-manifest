import { useEffect } from 'react';

export const TrackingProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Store only critical session data in localStorage
    const sessionData = {
      page_load_time: new Date().toISOString(),
      user_agent: navigator.userAgent,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      session_start: Date.now()
    };
    
    localStorage.setItem('quiz_session_data', JSON.stringify(sessionData));
    
    // Track page visibility for bounce rate
    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (!isVisible) {
        localStorage.setItem('quiz_last_activity', new Date().toISOString());
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return <>{children}</>;
};