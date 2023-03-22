import { useGetAllFileInfosByArtId, useGetAllFileStreamByIds } from "@/api/FileApi";
import { FileService } from "@/services/FileService";

export const useGetArtListItemImageByArtId = (artId?: string) => {
    const { data: files } = useGetAllFileInfosByArtId(artId);

    let fileIds: string[] = [];
    if (files) {
        files.forEach(file => {
            if (file.id) {
                fileIds.push(file.id);
            }
        })
    }

    const { data: imagesData } = useGetAllFileStreamByIds(fileIds);
    const images = imagesData?.map(data => FileService.toImage(data));

    return images?.at(0);
}