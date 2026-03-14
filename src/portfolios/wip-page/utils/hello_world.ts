import helloWorldJson from "@assets/HelloWorld.json";

export const HelloWorld = helloWorldJson as HelloWorld[];

export type HelloWorld = {
  lang: string;
  msg: string;
};
