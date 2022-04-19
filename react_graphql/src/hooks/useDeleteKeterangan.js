import { useMutation } from "@apollo/client";
import { GetKeteranganlist } from "../graphql/query"
import { DeleteKeterangan } from "../graphql/mutation"

export default function useDeleteKeterangan() {
    const [deleteKeterangan, {loading: loadingDelete}] = useMutation(DeleteKeterangan, {refetchQueries: [GetKeteranganlist],
    });

    return {
        deleteKeterangan,
        loadingDelete,
    }
}