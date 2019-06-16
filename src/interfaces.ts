import { WhereFilterOp } from "@google-cloud/firestore";

export interface Collection {
  Items: Array<Object>;
  Collection: string;
}
export interface NotificationItem {
  Info: Array<number | string>;
  Ids: Array<string>;
}
export interface FirebaseCondition {
  key: string;
  operand: WhereFilterOp;
  value: string | number | boolean;
}
