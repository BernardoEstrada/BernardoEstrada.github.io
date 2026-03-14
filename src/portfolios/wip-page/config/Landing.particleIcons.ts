export const usedIcons = [
  "amazonwebservices",
  "angularjs",
  "apachekafka",
  "arduino",
  "bash",
  "c",
  "clojure",
  "codepen",
  "composer",
  "cplusplus",
  "csharp",
  "css3",
  "d3js",
  "dart",
  "debian",
  "denojs",
  "devicon",
  "django",
  "docker",
  "digitalocean",
  "eslint",
  "express",
  "firebase",
  "flask",
  "flutter",
  "gcc",
  "git",
  "github",
  "go",
  "googlecloud",
  "graphql",
  "html5",
  "illustrator",
  "intellij",
  "java",
  "javascript",
  "jest",
  "jenkins",
  "jetbrains",
  "jira",
  "julia",
  "jupyter",
  "kubernetes",
  "laravel",
  "latex",
  "linux",
  "markdown",
  "mongodb",
  "mysql",
  "nestjs",
  "nextjs",
  "nginx",
  "nodejs",
  "npm",
  "numpy",
  "opengl",
  "pandas",
  "php",
  "phpstorm",
  "postgresql",
  "pycharm",
  "python",
  "pytorch",
  "raspberrypi",
  "react",
  "redis",
  "rust",
  "sass",
  "socketio",
  "spring",
  "sqlite",
  "microsoftsqlserver",
  "ssh",
  "svelte",
  "swift",
  "storybook",
  "tailwindcss",
  "tensorflow",
  "terraform",
  "threejs",
  "trello",
  "typescript",
  "ubuntu",
  "unity",
  "unix",
  "vim",
  "visualstudio",
  "vuejs",
  "vscode",
  "webpack",
  "webstorm",
  "xcode",
  "yarn",
  "opencv",
  "blender",
];

// const particleIcons: Record<typeof usedIcons[number], string> = {};

// export const loadParticles = async () => {
//   const image = await Promise.all(usedIcons.map(async icon => await import(`/assets/icons/${icon}.svg`)));
//   return {
//     type: "image",
//     options: {
//       image: image.map((value) => ({ src: value, replaceColor: true })),
//     },
//   }
// }
export class ParticleImageManager {
  private static instance: ParticleImageManager;
  private particles: {
    name: string;
    img: HTMLImageElement;
    originalSvg: string;
    colorMatches?: { value: string; index: number; values: number[] }[];
  }[] = [];

  private static svgPrefix = "data:image/svg+xml;charset=utf-8;base64,";

  private constructor() {}

  public static getInstance(): ParticleImageManager {
    if (!ParticleImageManager.instance) {
      ParticleImageManager.instance = new ParticleImageManager();
    }
    return ParticleImageManager.instance;
  }

  public async loadParticles() {
    if (this.particles.length > 0) return;
    this.particles = await ParticleImageManager.importParticles();
  }

  // Use Vite's import.meta.glob for dynamic SVG imports so that
  // all icons are included in the build and work on static hosts.
  private static importParticles = async () => {
    const svgModules = import.meta.glob("/src/portfolios/assets/icons/tech/*.svg", {
      as: "raw",
    });

    return Promise.all(
      usedIcons.map(async (icon) => {
        const loader =
          svgModules[`/src/portfolios/assets/icons/tech/${icon}.svg`] ??
          svgModules[`/src/portfolios/assets/icons/tech/${icon}.SVG`];

        if (!loader) {
          throw new Error(`Icon not found for particle: ${icon}`);
        }

        const svg = (await loader()) as string;
        const img = new Image();
        img.src = ParticleImageManager.svgPrefix + btoa(svg);
        return {
          name: icon,
          img,
          originalSvg: svg,
        };
      }),
    );
  };

  public getParticles() {
    return this.particles;
  }

  // private static matchStr =
  //   "#" +
  //   "rgb"
  //     .split("")
  //     .map((c) => `(?<${c}>[0-9a-f]{1,2})`)
  //     .join("");
  // private static matchAll = new RegExp(ParticleImageManager.matchStr, "gim");

  // private static colorValueOffset = parseInt("32", 16);
  // private static maxColorValue =
  //   parseInt("ff", 16) - ParticleImageManager.colorValueOffset;
  // private static minColorValue =
  //   parseInt("00", 16) + ParticleImageManager.colorValueOffset;

  // public updateParticleColors(color: string, secondaryColor = 'rgba(0,0,0,0)') {
  //   this.particles.forEach((particle) => {
  //     if (!particle.colorMatches) {
  //       particle.colorMatches = Array.from(
  //         particle.originalSvg.matchAll(ParticleImageManager.matchAll),
  //       ).map((m) => ({
  //         value: m[0],
  //         index: m.index || 0,
  //         values: m.splice(1, 3).map((v) => parseInt(v, 16)),
  //       }));
  //     }

  //     particle.colorMatches.forEach((match) => {
  //       const totalValue = match.values.reduce((a, b) => a + b, 0);
  //       const col =
  //         totalValue < ParticleImageManager.maxColorValue &&
  //         totalValue > ParticleImageManager.minColorValue
  //           ? color
  //           : secondaryColor;
  //       particle.img.src = ParticleImageManager.svgPrefix + btoa(
  //         particle.originalSvg.substring(0, match.index) +
  //           col +
  //           particle.originalSvg.substring(match.index + match.value.length)
  //       )
  //     });
  //   });
  // }
}
