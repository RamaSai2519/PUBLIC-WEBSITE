
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import { NextResponse, userAgent } from 'next/server'


export async function GET(req: Request, res: any) {

    //@ts-ignore
    const { ua } = userAgent(req)
   
    return NextResponse.json({ agent: ua })
}
