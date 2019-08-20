import React, { useRef, useEffect } from "react";

const SPEED = 0.01;

export default function Header(props) {
  const timeNow = Date.now();
  const headerRef = useRef();
  let frame;

  const animate = () => {
    requestAnimationFrame(animate);

    const text = props.children;

    const td = Date.now() - timeNow;
    const offset = td * SPEED;

    const h1 = headerRef.current;

    if (!h1) {
      return;
    }

    h1.innerHTML = "";

    for (let i = 0; i < text.length; i++) {
      let charElem = document.createElement("span");
      charElem.style.color =
        "hsl(" + (360 * (i + offset)) / text.length + ",80%,60%)";
      charElem.innerHTML = text[i];
      h1.appendChild(charElem);
    }
  };

  useEffect(() => {
    frame = requestAnimationFrame(animate);
    return () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, []);

  return <h1 ref={headerRef} />;
}
