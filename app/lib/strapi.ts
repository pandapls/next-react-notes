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

export async function getAllNotes(): Promise<NotesHash> {
	const response = await fetch(`http://localhost:1337/api/notes`);
	const { data = [] }: { data: Note[] } = await response.json();
	const res: NotesHash = {};

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

	return res;
}

export async function addNote<T>(data: T) {
	const response = await fetch(`http://localhost:1337/api/notes`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	const res = await response.json();
	return res.data.attributes.slug;
}

export async function updateNote<T>(uuid: string, data: T) {
	const { id } = await getNote(uuid);
	const response = await fetch(`http://localhost:1337/api/notes/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	await response.json();
}

export async function getNote(uuid: string) {
	const response = await fetch(
		`http://localhost:1337/api/notes?filters[slug][$eq]=${uuid}`
	);
	const data = await response.json();
	return {
		title: data.data[0].attributes.title,
		content: data.data[0].attributes.content,
		updateTime: data.data[0].attributes.updatedAt,
		id: data.data[0].id,
	};
}

export async function delNote(uuid: string) {
	const { id } = await getNote(uuid);
	const response = await fetch(`http://localhost:1337/api/notes/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	await response.json();
}

export default {
	addNote,
	delNote,
	getNote,
	updateNote,
	getAllNotes,
};
