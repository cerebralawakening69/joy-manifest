import { useState, useEffect } from 'react';

interface TrackingData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  facebook_pixel_id?: string;
  bemob_click_id?: string;
  user_ip?: string;
  user_agent?: string;
  device_type?: string;
  referrer?: string;
  quiz_started_at?: string;
}

export const useTracking = () => {
  const [trackingData, setTrackingData] = useState<TrackingData>({});

  useEffect(() => {
    // Capturar dados de tracking da URL e browser
    const urlParams = new URLSearchParams(window.location.search);
    const referrer = document.referrer || '';
    const userAgent = navigator.userAgent;
    
    // Detectar tipo de dispositivo
    const deviceType = /Mobi|Android/i.test(userAgent) ? 'mobile' : 
                      /Tablet|iPad/i.test(userAgent) ? 'tablet' : 'desktop';

    // Capturar parâmetros UTM
    const utm_source = urlParams.get('utm_source') || '';
    const utm_medium = urlParams.get('utm_medium') || '';
    const utm_campaign = urlParams.get('utm_campaign') || '';
    const utm_term = urlParams.get('utm_term') || '';
    const utm_content = urlParams.get('utm_content') || '';
    
    // Capturar IDs de tracking
    const facebook_pixel_id = urlParams.get('fbp') || urlParams.get('facebook_pixel_id') || '';
    const bemob_click_id = urlParams.get('bemob_click_id') || urlParams.get('clickid') || '';

    const data: TrackingData = {
      utm_source: utm_source || undefined,
      utm_medium: utm_medium || undefined,
      utm_campaign: utm_campaign || undefined,
      utm_term: utm_term || undefined,
      utm_content: utm_content || undefined,
      facebook_pixel_id: facebook_pixel_id || undefined,
      bemob_click_id: bemob_click_id || undefined,
      user_agent: userAgent,
      device_type: deviceType,
      referrer: referrer || undefined,
    };

    setTrackingData(data);
  }, []);

  const startQuizTracking = () => {
    setTrackingData(prev => ({
      ...prev,
      quiz_started_at: new Date().toISOString()
    }));
  };

  const getCompletionData = () => {
    return {
      ...trackingData,
      quiz_completed_at: new Date().toISOString()
    };
  };

  return {
    trackingData,
    startQuizTracking,
    getCompletionData
  };
};