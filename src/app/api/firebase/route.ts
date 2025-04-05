import { NextResponse } from 'next/server';
import { db } from '../../../lib/firebaseAdmin';

export async function GET(req: Request) {
  try {
    // Parse query parameters from the request URL
    const { searchParams } = new URL(req.url);
    const documentId = searchParams.get('document');

    // Validate required parameters
    if (!documentId) {
      return NextResponse.json(
        { error: "Both 'document' parameters are required" },
        { status: 400 }
      );
    }

    // Reference the subdocument in the Firestore subcollection
    const docRef = db
      .collection('public_website_content') // Parent collection
      .doc(documentId) // Parent document

    const docSnap = await docRef.get();

    // Check if the document exists
    if (!docSnap.exists) {
      return NextResponse.json(
        { error: 'Subdocument not found' },
        { status: 404 }
      );
    }

    // Return the subdocument data as JSON
    return NextResponse.json({ id: docSnap.id, ...docSnap.data() });
  } catch (error) {
    console.error('Error fetching subdocument:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { documentId, data } = body;

    if (!documentId || !data) {
      return NextResponse.json(
        { error: "'documentId' and 'data' are required fields" },
        { status: 400 }
      );
    }

    // Reference the Firestore document
    const docRef = db.collection('public_website_content').doc(documentId);

    // Use Firestore's `set` method for add/update
    await docRef.set(data, { merge: true }); // Merge: true updates existing fields without overwriting the entire document

    return NextResponse.json({
      success: true,
      message: `Document '${documentId}' added/updated`,
    });
  } catch (error) {
    console.error('Error adding/updating document:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}