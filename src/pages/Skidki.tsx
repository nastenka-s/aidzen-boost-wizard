import { useEffect } from "react";

const REDIRECT_URL =
  "https://max.ru/join/4wlzUCYjJT-UgB4VeHnd-03-K19g6Bn7hlFs6Uca19I";

const Skidki = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://max.tgtrack.ru/API/landing_script/v1/?linkID=89632e94345e&type=ya&chat=join%2F4wlzUCYjJT-UgB4VeHnd-03-K19g6Bn7hlFs6Uca19I&counterID=109739630";
    script.type = "text/javascript";
    script.defer = true;
    document.body.appendChild(script);

    const timer = window.setTimeout(() => {
      window.location.replace(REDIRECT_URL);
    }, 300);

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