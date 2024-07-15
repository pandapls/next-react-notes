export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));


export interface FileWithCode extends Error {
	code?: string;
}

export function isFileWithCode(error: unknown): error is FileWithCode {
	return typeof error === 'object' && error !== null && 'code' in error;
}

// 使用 TextDecoder 解码文件名
export const decodeFileName = (fileName: string) => {
	const decoder = new TextDecoder('utf-8');
	const encodedFileName = new Uint8Array(
		fileName.split('').map((char) => char.charCodeAt(0))
	);
	return decoder.decode(encodedFileName);
};
