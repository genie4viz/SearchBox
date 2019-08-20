import React, { useRef, useEffect } from "react";
import './vendor/fpsmeter.min'

export default function Description() {
  const fpsRef = useRef();

  useEffect(() => {
    const anchor = fpsRef.current;

    // eslint-disable-next-line no-undef
    const meter = new FPSMeter(anchor, {
      heat: true,
      graph: true
    });

    function tick() {
      meter.tick();
      requestAnimationFrame(tick);
    }

    tick();
  }, []);


  return (
    <div className="marketing">
      <span>
        Concurrent and Scheduled
      </span>
      <div className="spacer" />
      <div ref={fpsRef} className="fps" />
    </div>
  );

}
