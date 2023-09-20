import { useCallback, useMemo, useState } from "react";
import Particles from "react-particles";
import {
  Container,
  Engine
} from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { particleOptions } from "../config/Landing.particles";
import { ParticleImageManager } from "../config/Landing.particleIcons";
import resume from "@assets/BernardoEstrada.resume.json" assert { type: "json" }
import headshot from "@assets/headshot.jpg" assert { type: "jpg" }
import HelloWorld from "@assets/HelloWorld.json" assert { type: "json" }
import { TypeAnimation } from "react-type-animation";
import * as r_ from "radash";
import { Parallax } from "react-scroll-parallax";
import WIPCard from "./WIP.card";

export default function Landing() {
  const particlesInit = useCallback(async (engine: Engine) => {
    const manager = ParticleImageManager.getInstance();
    await manager.loadParticles();
    manager.getParticles().forEach((shape) => {
      engine.addShape(shape.name, (context, _, radius) => {
        const offset = - radius;
        const size = radius * 2;
        context.drawImage(shape.img, offset, offset, size, size);
      });
    });
    
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    await container
  }, []);


  const seq: Array<number | string | (() => void | Promise<void>)> = [
    HelloWorld[0],
    HelloWorld[1],
    ...r_.shuffle(HelloWorld)
  ].flatMap(e => [e.msg, 2000])

  const [progress, setProgress] = useState(0);

  function bezier(t: number, initial: number, p1: number, p2: number, final: number) {
    return Math.max(Math.min(
      (1 - t) * (1 - t) * (1 - t) * initial +
      3 * (1 - t) * (1 - t) * t * p1 +
      3 * (1 - t) * t * t * p2 +
      t * t * t * final
    , final), initial);
  }
  const finalBlur = 30;
  const initialProgress = 0.5;
  const progressDelay = 0.6;
  const blur = useMemo(() => {
    if (progress > 1) return finalBlur;
    return bezier((progress-initialProgress)*2-progressDelay, 0, finalBlur, finalBlur, finalBlur);
  }, [progress]);

  return (
    <>
      <div style={{ filter: `blur(${blur}px)` }}>
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={particleOptions}
          className="absolute top-0 left-0 w-full h-3/2 -z-10"
        />
      </div>
      <div className="flex flex-col items-center justify-center h-screen py-2 ">
        <Parallax speed={-10} onProgressChange={setProgress} >
          <div className="card grid grid-rows-1 md:grid-cols-3 md:grid-rows-2 justify-items-center items-center max-w-fit max-h-fit shadow-2xl bg-base-200 py-8 px-6 md:p-12 mx-2 md:mx-0 mt-96 md:mt-0">
            <div className="avatar justify-center md:row-span-3">
              <div className="w-36 md:w-56 rounded-animated transition-transform">
                <img src={headshot} alt="A headshot of Bernardo Estrada"/>
              </div>
            </div>
            <div className="md:col-span-2">
              <TypeAnimation
                cursor={true}
                sequence={seq}
                wrapper="h1"
                className="mt-2 text-2xl md:text-6xl font-bold text-center text-primary-focus"
                speed={30}
                deletionSpeed={50}
                repeat={Infinity}
              />
            </div>
            <div className="md:col-span-2">
              <h1 className="text-3xl md:text-6xl font-bold text-center text-primary-focus md:whitespace-nowrap">
                I'm <span className="text-primary">{resume.basics.name}</span>
              </h1>
            </div>
            <div className="md:col-span-2 max-w-md">
              <p className="mt-3 text-lg md:text-2xl text-center text-base-content">
                {resume.basics.headline}
              </p>
            </div>
          </div>
        </Parallax>
        <WIPCard />
      </div>
    </>
  );
}
