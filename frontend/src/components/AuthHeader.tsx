type AuthHeaderProps = {
  title: string;
  description: string;
  tagline: string;
};
export function AuthHeader(props: AuthHeaderProps) {
  return (
    <header className="flex flex-col gap-3 max-w-md">
      <p className="uppercase font-bold text-[32px] leading-9 w-full">
        {props.title}
      </p>
      <p className="text-base text-[DM_Sans] leading-6">
        {props.description}
        <br />
        {props.tagline}
      </p>
    </header>
  );
}
