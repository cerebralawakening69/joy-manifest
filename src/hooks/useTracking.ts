import { useState, useEffect } from 'react';
import { useCookies } from './useCookies';

interface TrackingData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  facebook_pixel_id?: string;
  bemob_click_id?: string;
  affiliate_id?: string;
  user_ip?: string;
  user_agent?: string;
  device_type?: string;
  referrer?: string;
  quiz_started_at?: string;
  quiz_completed_at?: string;
  session_id?: string;
  landing_timestamp?: string;
}

interface UserSession {
  session_id: string;
  started_at: string;
  page_views: number;
  last_activity: string;
}

export const useTracking = () => {
  const { setCookie, getCookie } = useCookies();
  const [trackingData, setTrackingData] = useState<TrackingData>({});
  const [userSession, setUserSession] = useState<UserSession | null>(null);

  useEffect(() => {
    initializeTracking();
  }, []);

  const generateSessionId = (): string => {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  };

  const initializeTracking = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const referrer = document.referrer || '';
    const userAgent = navigator.userAgent;
    const currentTimestamp = new Date().toISOString();
    
    // Detectar tipo de dispositivo
    const deviceType = /Mobi|Android/i.test(userAgent) ? 'mobile' : 
                      /Tablet|iPad/i.test(userAgent) ? 'tablet' : 'desktop';

    // Gerar ou recuperar session ID
    let sessionId = getCookie('quiz_session_id');
    if (!sessionId) {
      sessionId = generateSessionId();
      setCookie('quiz_session_id', sessionId, { 
        expires: 1, // 1 dia
        sameSite: 'lax',
        secure: true 
      });
    }

    // Gerenciar sessão do usuário
    const existingSession = getCookie('quiz_user_session');
    let session: UserSession;
    
    if (existingSession) {
      try {
        session = JSON.parse(existingSession);
        session.page_views += 1;
        session.last_activity = currentTimestamp;
      } catch {
        session = {
          session_id: sessionId,
          started_at: currentTimestamp,
          page_views: 1,
          last_activity: currentTimestamp
        };
      }
    } else {
      session = {
        session_id: sessionId,
        started_at: currentTimestamp,
        page_views: 1,
        last_activity: currentTimestamp
      };
    }

    setUserSession(session);
    setCookie('quiz_user_session', JSON.stringify(session), { 
      expires: 7, // 7 dias
      sameSite: 'lax',
      secure: true 
    });

    // Capturar e persistir parâmetros UTM
    const utmData = {
      utm_source: urlParams.get('utm_source') || getCookie('quiz_utm_source'),
      utm_medium: urlParams.get('utm_medium') || getCookie('quiz_utm_medium'),
      utm_campaign: urlParams.get('utm_campaign') || getCookie('quiz_utm_campaign'),
      utm_term: urlParams.get('utm_term') || getCookie('quiz_utm_term'),
      utm_content: urlParams.get('utm_content') || getCookie('quiz_utm_content'),
    };

    // Salvar UTMs em cookies (30 dias)
    Object.entries(utmData).forEach(([key, value]) => {
      if (value) {
        setCookie(`quiz_${key}`, value, { 
          expires: 30,
          sameSite: 'lax',
          secure: true 
        });
      }
    });

    // Capturar IDs de tracking
    const facebook_pixel_id = urlParams.get('fbp') || 
                             urlParams.get('facebook_pixel_id') || 
                             getCookie('quiz_facebook_pixel_id');
    
    const bemob_click_id = urlParams.get('bemob_click_id') || 
                          urlParams.get('clickid') || 
                          urlParams.get('cid') ||
                          getCookie('quiz_bemob_click_id');

    // Extrair affiliate ID da URL ou cookie
    const affiliate_id = urlParams.get('aff') || 
                        urlParams.get('affiliate') || 
                        getCookie('quiz_affiliate_id') ||
                        'awakeningprotocol'; // fallback para seu ID

    // Salvar IDs importantes em cookies
    if (facebook_pixel_id) {
      setCookie('quiz_facebook_pixel_id', facebook_pixel_id, { 
        expires: 30,
        sameSite: 'lax',
        secure: true 
      });
    }

    if (bemob_click_id) {
      setCookie('quiz_bemob_click_id', bemob_click_id, { 
        expires: 30,
        sameSite: 'lax',
        secure: true 
      });
    }

    // Sempre salvar/atualizar affiliate ID
    setCookie('quiz_affiliate_id', affiliate_id, { 
      expires: 30,
      sameSite: 'lax',
      secure: true 
    });

    // Salvar timestamp de landing
    if (!getCookie('quiz_landing_timestamp')) {
      setCookie('quiz_landing_timestamp', currentTimestamp, { 
        expires: 1,
        sameSite: 'lax',
        secure: true 
      });
    }

    const data: TrackingData = {
      utm_source: utmData.utm_source || undefined,
      utm_medium: utmData.utm_medium || undefined,
      utm_campaign: utmData.utm_campaign || undefined,
      utm_term: utmData.utm_term || undefined,
      utm_content: utmData.utm_content || undefined,
      facebook_pixel_id: facebook_pixel_id || undefined,
      bemob_click_id: bemob_click_id || undefined,
      affiliate_id: affiliate_id,
      user_agent: userAgent,
      device_type: deviceType,
      referrer: referrer || undefined,
      session_id: sessionId,
      landing_timestamp: getCookie('quiz_landing_timestamp') || currentTimestamp
    };

    setTrackingData(data);
  };

  const startQuizTracking = () => {
    const startTime = new Date().toISOString();
    setCookie('quiz_started_at', startTime, { 
      expires: 1,
      sameSite: 'lax',
      secure: true 
    });
    
    setTrackingData(prev => ({
      ...prev,
      quiz_started_at: startTime
    }));
  };

  const getCompletionData = (): TrackingData => {
    const completion_timestamp = new Date().toISOString();
    
    return {
      ...trackingData,
      quiz_started_at: getCookie('quiz_started_at') || trackingData.quiz_started_at,
      quiz_completed_at: completion_timestamp
    };
  };

  const getAffiliateLink = (): string => {
    const affiliateId = getCookie('quiz_affiliate_id') || 'awakeningprotocol';
    return `https://pxt.pinealxt.com/ds/presentation/index.php#aff=${affiliateId}`;
  };

  const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
    const eventTimestamp = new Date().toISOString();
    const eventKey = `quiz_event_${eventName}_${Date.now()}`;
    
    const event = {
      name: eventName,
      timestamp: eventTimestamp,
      session_id: userSession?.session_id,
      data: eventData || {}
    };

    setCookie(eventKey, JSON.stringify(event), { 
      expires: 7,
      sameSite: 'lax',
      secure: true 
    });
  };

  const clearTrackingData = () => {
    // Limpar cookies de tracking se necessário
    const cookiesToClear = [
      'quiz_session_id',
      'quiz_user_session',
      'quiz_started_at',
      'quiz_landing_timestamp'
    ];

    cookiesToClear.forEach(cookie => {
      setCookie(cookie, '', { expires: -1 });
    });
  };

  return {
    trackingData,
    userSession,
    startQuizTracking,
    getCompletionData,
    getAffiliateLink,
    trackEvent,
    clearTrackingData
  };
};