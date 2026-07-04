import { useEffect } from "react";

const REDIRECT_URL =
  "https://max.ru/join/4wlzUCYjJT-UgB4VeHnd-03-K19g6Bn7hlFs6Uca19I";

const Skidki = () => {
  useEffect(() => {
    let redirected = false;
    const redirect = () => {
      if (redirected) return;
      redirected = true;
      window.location.replace(REDIRECT_URL);
    };

    const script = document.createElement("script");
    script.src =
      "https://max.tgtrack.ru/API/landing_script/v1/?linkID=f06cdb456cda&type=ya&chat=join%2F4wlzUCYjJT-UgB4VeHnd-03-K19g6Bn7hlFs6Uca19I&counterID=105144570";
    script.type = "text/javascript";
    script.defer = true;
    script.onload = () => {
      // Give the script a brief moment to fire its tracking hit, then redirect.
      window.setTimeout(redirect, 150);
    };
    script.onerror = () => redirect();
    document.body.appendChild(script);

    // Safety fallback if the script never loads (blocked, offline, etc.)
    const timer = window.setTimeout(redirect, 2500);

    return () => {
      window.clearTimeout(timer);
      script.remove();
    };
  }, []);

  return (
    <>
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=${REDIRECT_URL}`} />
      </noscript>
      <div style={{ minHeight: "100vh", background: "#fff" }} />
    </>
  );
};

export default Skidki;