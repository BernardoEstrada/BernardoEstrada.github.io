import { IOptions, RecursivePartial } from "tsparticles-engine";
import { usedIcons } from './Landing.particleIcons'

export const particleOptions: RecursivePartial<IOptions> = {
  fpsLimit: 120,
  fullScreen: false,
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "bubble",
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 100,
        duration: 2,
        opacity: 0.8,
        size: 50,
      },
    },
  },
  particles: {
    reduceDuplicates: true,
    color: {
      value: "#ffffff",
    },
    links: {
      enable: false,
    },
    move: {
      direction: "bottom",
      enable: true,
      outModes: "out",
      random: true,
      speed: 0.5,
      straight: true,
    },
    number: {
      density: {
        enable: true,
        area: 700,
      },
      value: 95,
    },
    opacity: {
      value: 1,
    },
    shape: {
      type: usedIcons,
      fill: true,
    },
    size: {
      value: { min: 10, max: 20 },
    },
  },
  detectRetina: true,
};
