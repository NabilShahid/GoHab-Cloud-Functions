 
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
  operand: any;
  value: string | number | boolean;
}
