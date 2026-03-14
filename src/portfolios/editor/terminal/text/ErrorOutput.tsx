interface ErrorOutputProps {
  command?: string;
  message?: string;
}

export default function ErrorOutput(props: ErrorOutputProps) {
  const message = props.message 
    ? props.message
    : props.command
      ? `command "${props.command}" not found`
      : 'command not found';
  return <div className="space-y-1 text-sm text-error"><p>Error: {message}</p></div>;
}