interface WelcomeOutputProps {
  name: string;
}

export default function WelcomeOutput({ name }: WelcomeOutputProps) {
  return (
    <div>
      <div className="text-success">$ cat welcome.txt</div>
      <div className="text-base-content/90 mt-1">
        Hi, I'm {name}. Type <span className="text-primary">help</span> or <span className="text-primary">ls</span>, or pick a command from the sidebar.
      </div>
    </div>
  );
}
