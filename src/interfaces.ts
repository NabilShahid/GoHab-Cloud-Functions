export interface CountAndIds{
    Count:Number,
    Ids:Array<string>
}
export interface Collection{
    Items:Array<Object>,
    Collection:string
}
export interface NotificationItems{
    OverdueItems:Object,
    WeekItems:Object,
    TodayItems:Object,
    HabitItems:Object
}