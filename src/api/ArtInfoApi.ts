import { useFetch } from "@/hooks/react-query";
import { ART_SERVICE_PATH } from "@/http/axios";
import { ArtInfo } from "@/models/ArtInfo";

export const useGetLastArtInfoByArtId = (artId?: string) => {
    return useFetch<ArtInfo>(
        `${ART_SERVICE_PATH}/art-infos/last/arts/${artId}`,
        undefined,
        { enabled: !!artId }
    );
}
