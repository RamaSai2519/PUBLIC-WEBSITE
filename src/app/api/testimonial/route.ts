
import { NextResponse } from 'next/server'



export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    NextResponse.json({
        testimoial: [],
    })
}