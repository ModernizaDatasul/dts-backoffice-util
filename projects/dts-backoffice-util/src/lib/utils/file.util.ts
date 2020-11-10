export class FileUtil {

    constructor(
    ) { }

    static downladFile(datab64: any, fileName: string, contentType?: string): void {
        const dataBlob = this.b64toBlob(datab64, contentType);
        this.download(dataBlob, fileName);
    }

    private static download(file: Blob, fileName: string): void {
        const binaryData = [file];
        const downloadLink = document.createElement('a');
        const urlDownload = window.URL.createObjectURL(new Blob(binaryData, { type: file.type }));

        /**Verifica se é ie ou edge, pois o mesmo tem tratamento próprio para arquivos blob */
        if (navigator.userAgent.toUpperCase().indexOf('.NET') > 0 || navigator.userAgent.toUpperCase().indexOf('EDGE') > 0) {
            window.navigator.msSaveOrOpenBlob(file, fileName);
        } else {
            downloadLink.href = urlDownload;
            downloadLink.setAttribute('download', fileName);
            document.body.appendChild(downloadLink);
            downloadLink.click();
            window.URL.revokeObjectURL(urlDownload);
            downloadLink.remove();
        }
    }

    private static b64toBlob(b64Data: any, contentType?: string, sliceSize?: number): Blob {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }
}
