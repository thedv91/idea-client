import { FileUploader, FileItem, FileUploaderOptions } from "ng2-file-upload";

export class PageUpload extends FileUploader {

    constructor(options: FileUploaderOptions) {
        super(options);
        this.authToken = `Bearer ${localStorage.getItem('token')}`;
    };

    onAfterAddingFile(file: FileItem) {
        file.withCredentials = false;
    }
}
