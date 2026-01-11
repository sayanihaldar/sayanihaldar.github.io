"use client"

import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
import Image from "next/image"

const Flower = () => {
    function playAnimation(shape: any) {
        // the timeline
        let tl = gsap.timeline();
        tl.from(shape, {
            opacity: 0,
            scale: 0,
            ease: "elastic.out(1,0.3)",
        })
            .to(shape, {
                rotation: "random([-360, 360])",
            }, "<")
            .to(shape, {
                y: "120vh",
                ease: "back.in(.4)",
                duration: 1,
            }, 0)

    }

    useGSAP(
        () => {
            let flair = gsap.utils.toArray(".flair");
            let gap = 100; // if you're nosy though, this number spaces the 'lil shapes out
            let index = 0;
            let wrapper = gsap.utils.wrap(0, flair.length);
            gsap.defaults({ duration: 1 })

            let mousePos = { x: 0, y: 0 };
            let lastMousePos = mousePos;
            let cachedMousePos = mousePos;

            window.addEventListener("mousemove", (e) => {
                mousePos = {
                    x: e.x,
                    y: e.y
                };
            });

            gsap.ticker.add(ImageTrail);

            function ImageTrail() {
                let travelDistance = Math.hypot(
                    lastMousePos.x - mousePos.x,
                    lastMousePos.y - mousePos.y
                );

                // keep the previous mouse position for animation
                cachedMousePos.x = gsap.utils.interpolate(
                    cachedMousePos.x || mousePos.x,
                    mousePos.x,
                    0.1
                );
                cachedMousePos.y = gsap.utils.interpolate(
                    cachedMousePos.y || mousePos.y,
                    mousePos.y,
                    0.1
                );

                if (travelDistance > gap) {
                    animateImage();
                    lastMousePos = mousePos;
                }
            }

            function animateImage() {
                let wrappedIndex = wrapper(index);

                console.log(index, flair.length);

                let img: any = flair[wrappedIndex];
                gsap.killTweensOf(img);

                gsap.set(img, {
                    clearProps: "all",
                });


                gsap.set(img, {
                    opacity: 1,
                    left: mousePos.x,
                    top: mousePos.y,
                    xPercent: -50,
                    yPercent: -50,
                });

                playAnimation(img);

                index++;
            }
        })
    return (
        <div className="flowerContent z-50 fixed top-0 h-vh w-full pointer-events-none">
            <Image className="flair fixed w-12 z-50" src="/img-flower (1).webp" alt="Flower 1" width={50} height={50} loading="lazy" />
            <Image className="flair fixed w-12 z-50" src="/img-flower (2).webp" alt="Flower 2" width={50} height={50} loading="lazy" />
            <Image className="flair fixed w-12 z-50" src="/img-flower (3).webp" alt="Flower 3" width={50} height={50} loading="lazy" />
            <Image className="flair fixed w-12 z-50" src="/img-flower (4).webp" alt="Flower 4" width={50} height={50} loading="lazy" />
            <Image className="flair fixed w-12 z-50" src="/img-flower (5).webp" alt="Flower 5" width={50} height={50} loading="lazy" />
            <Image className="flair fixed w-12 z-50" src="/img-flower (6).webp" alt="Flower 6" width={50} height={50} loading="lazy" />
            <Image className="flair fixed w-12 z-50" src="/img-flower (7).webp" alt="Flower 7" width={50} height={50} loading="lazy" />
            <Image className="flair fixed w-12 z-50" src="/img-flower (8).webp" alt="Flower 8" width={50} height={50} loading="lazy" />
            <Image className="flair fixed w-12 z-50" src="/img-flower (9).webp" alt="Flower 9" width={50} height={50} loading="lazy" />
            <Image className="flair fixed w-12 z-50" src="/img-flower (10).webp" alt="Flower 10" width={50} height={50} loading="lazy" />
        </div>
    )
}

export default Flower