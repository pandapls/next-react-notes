'use server';
import { addNote } from '@/lib/redis';
import { decodeFileName, isFileWithCode } from '@/lib/utils';
import dayjs from 'dayjs';
import { mkdir, stat, writeFile } from 'fs/promises';
import mime from 'mime';
import { revalidatePath } from 'next/cache';
import { join } from 'path';

const importNote = async (formData: FormData) => {
	const file = (formData.get('file') as File) || null;
	if (!file) {
		return {
			error: 'file is required',
		};
	}
	console.log(file, 'file');

	const buffer = Buffer.from(await file.arrayBuffer());
	const relativeUploadDir = `/uploads/${dayjs().format('YY-MM-DD')}`;
	const uploadDir = join(process.cwd(), 'public', relativeUploadDir);

	try {
		await stat(uploadDir);
	} catch (error) {
		if (isFileWithCode(error) && error.code === 'ENOENT') {
			await mkdir(uploadDir, { recursive: true });
		} else {
			console.error(error);
			return { error: 'stat wrong' };
		}
	}

	// 写入文件
	try {
		const uniqueSuffix = `${Math.random().toString(36).slice(-6)}`;
		const fileName = decodeFileName(file.name).replace(/\.[^/.]+$/, '');

		const uniqueFileName = `${fileName}-${uniqueSuffix}.${mime.getExtension(
			file.type
		)}`;
		await writeFile(`${uploadDir}/${uniqueFileName}`, buffer);

		const res = await addNote({
			title: fileName,
			content: buffer.toString('utf-8'),
		});

		revalidatePath('/', 'layout');

		return { fileUrl: `${relativeUploadDir}/${uniqueFileName}`, uid: res };
	} catch (error) {
		console.error(error);
		return { error: 'write file wrong' };
	}
};

export { importNote };
