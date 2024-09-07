export class Customer {
  constructor(
    public _id: string,
    public id: string,
    public type: string,
    public customerId: string,
    public title: string,
    public firstName: string,
    public lastName: string,
    public emailAddress: string,
    public phoneNumber: string,
    public creationDate: Date | null = null,
    public orderDate: Date | null = null,
    public shipDate: Date | null = null,
    public addresses: Address[] = [],
    public details: ProductItem[] = [],
    public salesOrderCount: number | null = null
  ) { }
}

export class Address {
  constructor(
    public addressLine1: string,
    public addressLine2: string,
    public city: string,
    public state: string,
    public country : string,
    public zipCode: string
  ) { }
}

export class ProductItem {
  constructor(
    public sku: string,
    public name: string,
    public price: number,
    public quantity: number
  ) { }
}
