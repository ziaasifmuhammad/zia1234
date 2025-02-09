import Image from "next/image";
import Link from "next/link";

interface BrandLogoProps {
  src?: string; // Optional: Logo image source
  alt?: string; // Alternative text
  width?: number;
  height?: number;
  className?: string;
}

const BrandLogo: React.FC<BrandLogoProps> = ({
  src = "/logo.png", // Default logo path (update with your actual logo)
  alt = "Brand Logo",
  width = 150,
  height = 50,
  className = "",
}) => {
  return (
    <Link href="/">
      <a className={`flex items-center ${className}`}>
        <Image src={src} alt={alt} width={width} height={height} priority />
      </a>
    </Link>
  );
};

export default BrandLogo;