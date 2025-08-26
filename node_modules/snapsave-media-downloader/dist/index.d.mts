interface SnapSaveDownloaderMedia {
    resolution?: string;
    shouldRender?: boolean;
    thumbnail?: string;
    type?: "image" | "video";
    url?: string;
}
interface SnapSaveDownloaderData {
    description?: string;
    preview?: string;
    media?: SnapSaveDownloaderMedia[];
}
interface SnapSaveDownloaderResponse {
    success: boolean;
    message?: string;
    data?: SnapSaveDownloaderData;
}

declare const snapsave: (url: string) => Promise<SnapSaveDownloaderResponse>;

export { snapsave };
