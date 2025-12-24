import Image from "next/image";

export const Logo = ({className}: {className?: string}) => {
  return (
            <Image
          unoptimized
          src="/logo.png"
          alt="Mantle Armada"
          width={256}
          height={256}
          className={`${className}` }
        />
  );
};