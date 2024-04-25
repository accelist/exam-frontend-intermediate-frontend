export default interface CreateOrder {
    description: string,
    orderFrom: string,
    orderTo: string,
    quantity: number,
    orderedAt: Date
}