import { useSubscription } from "@apollo/client";
import { GetKeteranganlist } from '../graphql/query'
import { SubscriptionKeterangan } from "../graphql/subscribe";

export default function useUpdateKeterangan() {
    const {data, loading, error} = useSubscription(SubscriptionKeterangan, {refetchQueries: [GetKeteranganlist],
    });

    return {
        data,
        loading,
        error,
    }
}