export interface NoteAttributes {
	title: string;
	content: string;
	slug: string;
	updatedAt: string;
}

interface Note {
	id: number;
	attributes: NoteAttributes;
}
type NotesHash = Record<
	string,
	{
		title: string;
		content: string;
		updateTime: string;
	}
>;


const API_NOTE_URL = 'http://localhost:1337/api/notes';
const AUTH_TOKEN =
	'Bearer 881fde9770ba5853a0c46ec615e1e10e26f3025aacbc49fbaa6690620324f83f7656e13d9d1189ee117a2b78051b1453719541dab06d36bfbb6f66dacdee49dcbc554e5614f228397a629eebcac8452f46307bca27cf14181b1428477c33502da19288185ec53a7885b596b6be060c49c2f3e581ad3c3042034bda1576ae531f';
async function strapiRequest<T>(
	path: string,
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
	data: any = null,
	requiresAuth: boolean = false
): Promise<T> {
	const headers: HeadersInit = {
		'Content-Type': 'application/json',
	};
	if (requiresAuth) {
		headers['Authorization'] = AUTH_TOKEN;
	}
	const response = await fetch(`${API_NOTE_URL}${path}`, {
		method,
		headers,
		body: data ? JSON.stringify({ data }) : null,
	});

	return response.json();
}

export async function getAllNotes(): Promise<NotesHash> {
	const { data = [] }: { data: Note[] } = (await strapiRequest('/')) || {};
	const res: NotesHash = {};

	if (data.length > 0) {
		data.forEach((item) => {
			const {
				attributes: { title, content, slug, updatedAt },
			} = item;
			res[slug] = {
				title,
				content,
				updateTime: updatedAt,
			};
		});
	}

	return res;
}

export async function addNote<T>(data: T) {
	const res = await strapiRequest<{ data: { attributes: NoteAttributes } }>(
		'/',
		'POST',
		data,
		true
	);

	if (!res.data) {
		return null;
	}

	return res.data.attributes.slug;
}

export async function updateNote<T>(uuid: string, data: T) {
	const { id } = await getNote(uuid);
	await strapiRequest(`/notes/${id}`, 'PUT', data, true);
}

export async function getNote(uuid: string) {
	const res = await strapiRequest<{ data: Note[] }>(
		`?filters[slug][$eq]=${uuid}`
	);
	const note = res.data[0];
	return {
		title: note.attributes.title,
		content: note.attributes.content,
		updateTime: note.attributes.updatedAt,
		id: note.id,
	};
}

export async function delNote(uuid: string) {
	const { id } = await getNote(uuid);
	await strapiRequest(`/notes/${id}`, 'DELETE', true);
}
