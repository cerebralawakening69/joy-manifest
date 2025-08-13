interface CookieOptions {
  expires?: number; // days
  maxAge?: number; // seconds
  domain?: string;
  path?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

export const useCookies = () => {
  const setCookie = (name: string, value: string, options: CookieOptions = {}) => {
    const {
      expires,
      maxAge,
      domain,
      path = '/',
      secure = window.location.protocol === 'https:',
      sameSite = 'lax'
    } = options;

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    
    if (expires) {
      const date = new Date();
      date.setTime(date.getTime() + (expires * 24 * 60 * 60 * 1000));
      cookieString += `; expires=${date.toUTCString()}`;
    }
    
    if (maxAge) {
      cookieString += `; max-age=${maxAge}`;
    }
    
    if (domain) {
      cookieString += `; domain=${domain}`;
    }
    
    cookieString += `; path=${path}`;
    
    if (secure) {
      cookieString += `; secure`;
    }
    
    cookieString += `; samesite=${sameSite}`;
    
    document.cookie = cookieString;
  };

  const getCookie = (name: string): string | null => {
    const nameEQ = encodeURIComponent(name) + "=";
    const ca = document.cookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
    }
    return null;
  };

  const deleteCookie = (name: string, options: Pick<CookieOptions, 'domain' | 'path'> = {}) => {
    setCookie(name, '', { ...options, expires: -1 });
  };

  const getAllCookies = (): Record<string, string> => {
    const cookies: Record<string, string> = {};
    const ca = document.cookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      const parts = c.split('=');
      if (parts.length === 2) {
        cookies[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
      }
    }
    
    return cookies;
  };

  return {
    setCookie,
    getCookie,
    deleteCookie,
    getAllCookies
  };
};