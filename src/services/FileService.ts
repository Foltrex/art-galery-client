export class FileService {
    static toImage(binaryData: ArrayBuffer) {
        const imageData = new Uint8Array(binaryData);

        const data = new Blob([imageData]);
        return URL.createObjectURL(data);
    }
}