import Redis from 'ioredis';

const redis = new Redis();
export interface Note {
	title: string;
	content: string;
	updateTime: string;
}

export interface NotesHash {
	[key: string]: Note;
}
const initialData = {
	'1702459181837':
		'{"title":"sunt aut","content":"quia et suscipit suscipit recusandae","updateTime":"2023-12-13T09:19:48.837Z"}',
	'1702459182837':
		'{"title":"qui est","content":"est rerum tempore vitae sequi sint","updateTime":"2023-12-13T09:19:48.837Z"}',
	'1702459188837':
		'{"title":"ea molestias","content":"et iusto sed quo iure","updateTime":"2023-12-13T09:19:48.837Z"}',
};

export async function getAllNotes(): Promise<NotesHash> {
	const data = await redis.hgetall('notes');
	if (Object.keys(data).length == 0) {
		await redis.hset('notes', initialData);
	}
	const updatedData = await redis.hgetall('notes');

	// 将所有字符串化的 note 转换为 Note 对象
	const notes: NotesHash = {};
	for (const [key, value] of Object.entries(updatedData)) {
		notes[key] = JSON.parse(value);
	}

	return notes;
}

export async function addNote<T>(data: T) {
	const uuid = Date.now().toString();
	const serializedData = JSON.stringify(data);
	await redis.hset('notes', uuid, serializedData);
	return uuid;
}

export async function updateNote<T>(uuid: string, data: T) {
	const serializedData = JSON.stringify(data);
	await redis.hset('notes', uuid, serializedData);
}

export async function getNote(uuid: string) {
	const res = await redis.hget('notes', uuid);
	if (!res) return {};
	return JSON.parse(res);
}

export async function delNote(uuid: string) {
	return redis.hdel('notes', uuid);
}

export default redis;
