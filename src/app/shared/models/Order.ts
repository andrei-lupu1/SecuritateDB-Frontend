import { HistoryOrder } from "./HistoryOrder";

export class Order{
    ammount!: number;
    id!: number;
    description!: string;
    pinCode!: string;
    awb!: string;
    customerName!: string;
    phoneNumber!: string;
    email!: string;
    address!: string;
    city!: string;
    paymentMethod!: string;
    zipCode!: string;
    historyOrders!: HistoryOrder[];
}