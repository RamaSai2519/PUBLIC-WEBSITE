
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server'
import { cities } from './citiesList';

type ResponseData = {
    name: string;
    value: string
}


export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const cityName: string = searchParams.get("city")!;
    const filterCity = cities.filter(e=> e.value?.toLowerCase().includes(cityName.toLowerCase()));


    return NextResponse.json(filterCity || [])
}
