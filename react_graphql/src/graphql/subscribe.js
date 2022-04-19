import { gql } from "@apollo/client";

export const SubscriptionKeterangan = gql`
  subscription MySubscription {
    keteranganlist {
      id
      Status
      Pelajaran
    }
  }
  `;