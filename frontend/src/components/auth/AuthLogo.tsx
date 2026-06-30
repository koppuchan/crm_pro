import Image from "next/image";

export function AuthLogo() {
  return (
    <Image
      src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
      alt="CRM Pro"
      width={40}
      height={40}
      className="mx-auto h-10 w-auto"
      priority
    />
  );
}
