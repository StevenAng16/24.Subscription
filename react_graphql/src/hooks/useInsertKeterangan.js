import { useMutation } from "@apollo/client";
import { GetKeteranganlist } from "../graphql/query"
import { InsertKeterangan } from "../graphql/mutation"

export default function useInsertKeterangan() {
    const [insertKeterangan, {loading: loadingInsert}] = useMutation(InsertKeterangan, {refetchQueries: [GetKeteranganlist],
    });

    return {
        insertKeterangan,
        loadingInsert,
    };
}