export function setCookie(name: string, value: string, days: number) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = '; expires=' + date.toUTCString();
  document.cookie = name + '=' + value + expires + '; path=/';
}

export function getCookie(cookieName: string): string | null {
  const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
  const targetCookie = cookies.find((cookie) =>
    cookie.startsWith(`${cookieName}=`)
  );

  if (!targetCookie) {
    return null;
  }

  const cookieValue = targetCookie.split('=')[1];

  return cookieValue;
}
