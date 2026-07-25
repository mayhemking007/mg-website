import Image from "next/image";
import Link from "next/link";

export function SiteBrand({
  animated = false,
  eager = false,
}: {
  animated?: boolean;
  eager?: boolean;
}) {
  return (
    <Link href="/" className={`landing-brand${animated ? " site-brand-animated" : ""}`} aria-label="MemoGrafter home">
      <Image
        className="landing-brand-logo"
        src="/memo-grafter-logo.svg"
        alt=""
        width={86}
        height={86}
        loading={eager ? "eager" : "lazy"}
        unoptimized
      />
      <span className="landing-brand-wordmark" aria-hidden="true">
        <span className="landing-brand-initial">M</span>
        <span>emo</span>
        <span className="landing-brand-initial landing-brand-g">G</span>
        <span>rafter</span>
      </span>
    </Link>
  );
}
