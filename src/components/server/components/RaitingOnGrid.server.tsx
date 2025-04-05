import { db } from '@/lib/firebaseAdmin';
import { imageUrl } from '@/utils/constants';
import Image from 'next/image';



export async function generateMetadata({ params }: any): Promise<any> {
  const docRef = db.collection('public_website_content').doc(params.id);
  const docSnap = await docRef.get();

  if (!docSnap.exists) {
    return { title: 'Document Not Found' };
  }

  const data = docSnap.data();

  return {
    title: data?.title || 'Document Details',
    description: data?.description || 'Details of the document.',
  };
}


export function RatingOnPaperGridServer() {
  const page_copy_from_firebase = [
    {
      title: 'Seniors loved Sukoon',
      value: '95%',
    },
    {
      title: 'Conversation Score',
      value: '4.8',
      icon: `https://sukoon-static-website-content.s3.ap-south-1.amazonaws.com/star.svg`,
    },
    {
      title: 'Languages Supported',
      value: '10+',
    },
  ];
  return (
    <div key="sukoon-rating" className="relative w-full ">
      <Image
        src={`${imageUrl}paper-grid.png`}
        alt={'Paper-grid-background'}
        key={'paper-grid'}
        layout="responsive"
        width={20}
        height={1080}
        className=" self-center"
      />

      <div
        key={'ratings-div'}
        className="absolute inset-0 flex items-center justify-around"
      >
        {page_copy_from_firebase.map((rating, index) => {
          return (
            <div
              key={'main-div' + index}
              className="flex flex-col justify-center items-center"
            >
              <h1
                key={'heading ' + rating.title}
                className="text-2xl font-lightFont"
              >
                {rating.title}
              </h1>
              <div
                key={'nested ' + rating.title}
                className="flex flex-row gap-2"
              >
                {rating.icon ? (
                  <Image
                    src={rating.icon}
                    key={rating.icon}
                    alt={rating.title}
                    width={40}
                    height={40}
                  />
                ) : (
                  <></>
                )}
                <p key={rating.value} className="text-5xl font-extrabold">
                  {rating.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
