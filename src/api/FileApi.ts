import { useFetch } from "@/hooks/react-query";
import { axiosApi, FILE_SERVICE_PATH } from "@/http/axios";
import { File } from "@/models/File";
import { useQuery } from "react-query";

export const fetchImages = (ids: string[] = []) => {
    const requests = ids.map(id => {
        const url = `${FILE_SERVICE_PATH}/files/${id}/data`;
        return axiosApi.get<ArrayBuffer>(url, {responseType: 'arraybuffer'});
    })

    return Promise.all(requests)
        .then(responses => responses.map(response => response.data));
};

export const useGetAllFileStreamByIds = (ids?: string[]) => {
    return useQuery<ArrayBuffer[]>(
        [`${FILE_SERVICE_PATH}/files/data`, { ids: ids }],
        () => fetchImages(ids),
    );
}

export const useGetAllFileInfosByArtId = (artId?: string) => {
    return useFetch<File[]>(
        `${FILE_SERVICE_PATH}/files/arts/${artId}`,
        undefined,
        { enabled: !!artId }
    );
}
