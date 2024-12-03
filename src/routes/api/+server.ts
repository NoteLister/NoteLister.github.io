// import { db } from '$lib/server/db';
// import { notes } from '$lib/server/db/schema';
// import { json, type RequestHandler } from '@sveltejs/kit';

// export const POST: RequestHandler = async ({ request }) => {
//     try {
//         const { title, description, categoryId } = await request.json();

//         if (!title || !description || !categoryId) {
//             throw new Error('Invalid input: Title, description, and categoryId are required.');
//         }

//         // Insert the new note into the database
//         const result = await db.insert(notes).values({
//             title,
//             description,
//             categoryId,
//         });

//         return json({ success: true, result });
//     } catch (error) {
//         console.error('Error saving note:', error);
//         return json({ success: false, error: (error as Error).message || 'Internal Server Error' });
//     }
// };


