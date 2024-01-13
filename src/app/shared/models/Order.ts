import { HistoryOrder } from "./HistoryOrder";

export class Order{
    Ammount!: number;
    Id!: number;
    Description!: string;
    PinCode!: string;
    Awb!: string;
    CustomerName!: string;
    PhoneNumber!: string;
    Email!: string;
    Address!: string;
    City!: string;
    PaymentMethod!: string;
    ZipCode!: string;
    HistoryOrders!: HistoryOrder[];
}