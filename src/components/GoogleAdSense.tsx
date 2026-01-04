"use client";

import Script from "next/script";

interface GoogleAdSenseProps {
    pId: string;
    style?: React.CSSProperties;
    className?: string;
    slot?: string;
    format?: string;
    responsive?: string;
}

export default function GoogleAdSense({ pId, style, className, slot, format = "auto", responsive = "true" }: GoogleAdSenseProps) {
    return (
        <div className={className}>
            <script
                async
                src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pId}`}
                crossOrigin="anonymous"
            />
            {slot && (
                <>
                    <ins
                        className="adsbygoogle"
                        style={{ display: "block", minWidth: "250px", ...style }}
                        data-ad-client={pId}
                        data-ad-slot={slot}
                        data-ad-format={format}
                        data-full-width-responsive={responsive}
                    />
                    <Script id={`adsbygoogle-init-${slot}`} strategy="lazyOnload">
                        {`
                            (adsbygoogle = window.adsbygoogle || []).push({});
                        `}
                    </Script>
                </>
            )}
        </div>
    );
}
