import { useMutation } from "@apollo/client";
import {GetKeteranganlist} from '../graphql/query'
import {UpdateKeterangan} from '../graphql/mutation'

export default function useUpdateKeterangan() {
    const [updateKeterangan, {loading: loadingUpdate}] = useMutation(UpdateKeterangan, {refetchQueries: [GetKeteranganlist],
    });

    return {
        updateKeterangan,
        loadingUpdate
    };
}