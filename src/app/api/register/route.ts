
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server'

type ResponseData = {
    name: string;
    value: string
}

export async function POST(req: Request) {
    const cookiesObject: ResponseData = await req.json();
    if(typeof cookiesObject.name !== 'string' || typeof cookiesObject.value !== 'string') {
    (await cookies()).set(cookiesObject.name, JSON.stringify(cookiesObject.value));
    } else {
        (await cookies()).set(cookiesObject.name, cookiesObject.value);
    }

    if ( (await cookies()).has(cookiesObject.name)) {
        return NextResponse.json({
            message: 'Cookie set successfully',
            value:  (await cookies()).get(cookiesObject.name)
        })
    } else {
        return NextResponse.json({
            message: 'Cookie not set'
        })
    }
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const cookieName: string = searchParams.get("name")!;
    const isCookiePresent =  (await cookies()).has(cookieName);
    if (!isCookiePresent) return NextResponse.json({
        message: 'Cookie not found'
    })
    else {
        return NextResponse.json({
            message: cookieName,
            value:  (await cookies()).get(cookieName)
        })
    }
}

export async function DELETE(req: Request) {
    try{

        (await cookies()).delete('userDecodeNumber');
        (await cookies()).delete('userToken');
        redirect('/');
    } catch(e) {
        return NextResponse.json({
            message: 'All cookies deleted'
        });
    }   
    
}