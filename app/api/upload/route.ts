import { addNote } from '@/lib/redis';
import { isFileWithCode } from '@/lib/utils';
import dayjs from 'dayjs';
import { mkdir,stat,writeFile } from 'fs/promises';
import mime from 'mime';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';

const POST = async (req: NextRequest) => {
	const formData = await req.formData();
	const file = formData.get('file') as File | null;

	if (!file) {
		return NextResponse.json({ error: 'File is required' }, { status: 400 });
	}

	const buffer = Buffer.from(await file.arrayBuffer());
	const relateiveUploadDir = `/uploads/${dayjs().format('YY-MM-DD')}`;
	const uploadDir = join(process.cwd(), 'public', relateiveUploadDir);

	// 创建文件上传目录
	try {
		await stat(uploadDir);
	} catch (error) {
		if (isFileWithCode(error) && error.code === 'ENOENT') {
			await mkdir(uploadDir, { recursive: true });
		} else {
			console.error(error);
			return NextResponse.json({ error: 'stat wrong' }, { status: 500 });
		}
	}

	// 写入文件
	try {
		const uniqueSuffix = `${Math.random().toString(36).slice(-6)}`;
		const fileName = file.name.replace(/\.[^/.]+$/, '');
		const uniqueFileName = `${fileName}-${uniqueSuffix}.${mime.getExtension(
			file.type
		)}`;
		await writeFile(`${uploadDir}/${uniqueFileName}`, buffer);

		const res = await addNote({
			title: fileName,
			content: buffer.toString('utf-8'),
		});

		revalidatePath('/', 'layout');

		return NextResponse.json({
			fileUrl: `${relateiveUploadDir}/${uniqueFileName}`,
			uid: res,
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: 'write file wrong' }, { status: 500 });
	}
};

export { POST };
