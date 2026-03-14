import { Parallax } from "react-scroll-parallax";
import { ResumeSchema } from "@portfolios/types/resume";

export default function AboutCard(props: { resume: ResumeSchema }) {
  return (
    <Parallax speed={10} className="w-full flex justify-center">
      <div className="container w-full flex justify-center">
        <div className="card max-w-4xl bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">About me</h2>
            <p className="text-blue-500 ">{props.resume.basics.summary}</p>
          </div>
        </div>
      </div>
    </Parallax>
  );
}
