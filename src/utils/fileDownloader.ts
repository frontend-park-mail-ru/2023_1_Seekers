

class FileDownloader {
    download = async (fileName: string, base64Content: string) => {
        const base64Response = await fetch(`data:*;base64,${base64Content}`);
        const blob = await base64Response.blob();
        const link = document.createElement('a');
        link.download = fileName;
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
    };
}

export const fileDownloader = new FileDownloader();
