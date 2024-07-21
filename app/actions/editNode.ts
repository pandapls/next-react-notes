'use server';

import { addNote, delNote, updateNote } from '@/lib/strapi';
import { sleep } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const schema = z.object({
	title: z.string().min(1, '请填写标题'),
	content: z.string().min(1, '请填写内容').max(100, '字数最多100'),
});

export interface FormData {
	get: (name: string) => FormDataEntryValue | null;
}

export type SaveNoteResult = {
	msg: string;
	errors: string | null;
};

export type NoteData = {
	title: FormDataEntryValue | null;
	content: FormDataEntryValue | null;
	updateTime: Date;
};

const saveNote = async (prevState: SaveNoteResult, formData: FormData) => {
	const noteId = formData.get('noteId') as string | null;

	const data: NoteData = {
		title: formData.get('title'),
		content: formData.get('body'),
		updateTime: new Date(),
	};

	const { success, error } = schema.safeParse(data);
	if (!success) {
		return {
			msg: '',
			errors: error.issues.map((i) => i.message).join(';'),
		};
	}

	await sleep(2000);
	if (noteId) {
		updateNote<NoteData>(noteId, data);
		revalidatePath('/', 'layout');
		return { msg: 'Add Success!', errors: null };
	}

	const res = await addNote<NoteData>(data);
	if (!res) {
		return { msg: 'Add Fail!', errors: null };
	}
	revalidatePath('/', 'layout');
	return { msg: 'Add Success!', errors: null };
};

const deletNode = async (prevState: SaveNoteResult, formData: FormData) => {
	const noteId = formData.get('noteId') as string | null;
	if (!noteId) {
		return { msg: 'Delete Fail!', errors: null };
	}
	delNote(noteId);
	revalidatePath('/', 'layout');
	redirect('/');
};

export { deletNode,saveNote };
