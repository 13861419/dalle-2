import Link from "next/link";

export default function Redirect() {
  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <h1 className="font-bold text-5xl w-[800px] text-center">
        This deployment has been disabled due to OpenAI API costs.
      </h1>
    </div>
  );
}
