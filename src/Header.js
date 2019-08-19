import React, { useEffect, useRef } from "react";

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

        headerRef.current.innerHTML = "";

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
            cancelAnimationFrame(frame);
        }
    }, []);

    
    return <h1 ref={headerRef} />;// eslint-disable-line
}
