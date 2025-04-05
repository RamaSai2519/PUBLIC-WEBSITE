// src/app/af/[refCode]/page.tsx
import Head from 'next/head';
import { redirect } from 'next/navigation';
import { GetServerSideProps } from 'next';

interface PageProps {
    params: {
        id: string;
    };
}

export default function AFPage({ params }: any) {
    
    //@ts-ignore
    const referralUrl = `/?utm_source=${params.id}`;
    const videoUrl = "https://s3.ap-south-1.amazonaws.com/sukoon-media/share.mp4";
    const imageUrl = "https://sukoon-media.s3.ap-south-1.amazonaws.com/whatsAppShareImage.jpeg";
    redirect(referralUrl);
    return (
        <>
            <Head>
                <title>Join Sukoon Club with Our Exclusive Referral!</title>
                <meta property="og:title" content="Join Sukoon Club with Our Exclusive Referral!" />
                <meta property="og:description" content="Use our referral link to join Sukoon Club and enjoy amazing benefits. Watch the video to learn more!" />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:video:width" content="640" />
                <meta property="og:video:height" content="360" />
                <meta property="og:url" content={referralUrl} />
                <meta property="og:type" content="video.other" />
                <meta property="og:site_name" content="Sukoon Unlimited" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Join Sukoon Club with Our Exclusive Referral!" />
                <meta name="twitter:description" content="Use our referral link to join Sukoon Club and enjoy amazing benefits. Watch the video to learn more!" />
                <meta name="twitter:image" content={imageUrl} />
                <meta name="twitter:player" content={videoUrl} />
                <meta name="twitter:player:width" content="640" />
                <meta name="twitter:player:height" content="360" />
                <meta name="twitter:url" content={referralUrl} />
            </Head>
            <div>
                <p>Redirecting...</p>
            </div>
        </>
    );
}
