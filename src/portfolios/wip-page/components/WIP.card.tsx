import pdfResume from "@assets/BernardoEstrada.resume.pdf" assert { type: "pdf" };

export default function WIPCard() {
  const iconClass = "inline-block align-baseline text-3xl md:text-4xl h-8 w-8 md:h-12 md:w-12 hover:text-primary-focus";

  return (
    <div className="card grid grid-rows-1 md:grid-cols-3 justify-items-center items-center w-full max-w-fit min-w-0 overflow-hidden shadow-2xl bg-base-100 py-8 px-6 md:p-12 md:mx-0 md:mt-0">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css" />
      <div className="md:col-span-3 min-w-0 w-full">
        <div className="flex flex-col justify-start space-x-4 min-w-0 w-full max-w-2xl">
          <h3 className="text-2xl font-bold text-left text-primary-focus">Work in progress</h3>
          <br />
          <p className="text-base md:text-2xl text-left text-base-content break-words">
            I'm currently working on my portfolio, check back soon! Meanwhile you can check out my&nbsp;
            <a className="link link-primary link-hover" href="https://github.com/BernardoEstrada" target="_blank">
              GitHub
            </a>
            ,{" "}
            <a className="link link-primary link-hover" href="https://linkedin.com/in/bernardoef/" target="_blank">
              LinkedIn
            </a>
            ,{" "}
            <a className="link link-primary link-hover" href={pdfResume} target="_blank">
              resume
            </a>{" "}
            or email{" "}
            <a className="link link-primary link-hover" href="mailto:me@BernardoEstrada.tech">
              me@berest.dev
            </a>
            .
          </p>
          <p className="text-4xl md:text-5xl text-center text-base-content mt-3 flex flex-wrap justify-center gap-2">
            <a href="https://github.com/BernardoEstrada" target="_blank" className="mx-4 my-0">
              <i className={`devicon-github-original ${iconClass}`}></i>
            </a>
            <a href="https://linkedin.com/in/bernardoef/" target="_blank" className="mx-4 my-0">
              <i className={`devicon-linkedin-plain ${iconClass}`}></i>
            </a>
            <a href={pdfResume} target="_blank" className="mx-4 my-0">
              <svg
                className={iconClass}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
            </a>
            <a href="mailto:me@BernardoEstrada.tech" className="mx-4 my-0">
              <svg
                className={iconClass}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width={2.5}
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                />
              </svg>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
