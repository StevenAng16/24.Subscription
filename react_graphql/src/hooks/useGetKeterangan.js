import { useQuery } from "@apollo/client";
import { GetKeteranganlist } from '../graphql/query'
import { SubscriptionKeterangan } from "../graphql/subscribe";

export default function useUpdateKeterangan() {
    const {data, loading, error, subscribeToMore} = useQuery(GetKeteranganlist);

    const subscribeKeterangan = () => {
        subscribeToMore({
            document: SubscriptionKeterangan,
            updateQuery: (prev, {subscriptionData: {data}}) => {
                console.log(data);
                return data.keteranganlist;
            },
        });
    };

    return {
        keteranganlist: data? data.keteranganlist : [],
        loading,
        error,
        subscribeKeterangan,
    };
}