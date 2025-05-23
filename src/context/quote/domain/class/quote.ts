export class Quote {
    constructor(
      public readonly id: string,
      public readonly from: string,
      public readonly to: string,
      public readonly amount: number,
      public readonly rate: number,
      public readonly convertedAmount: number,
      public readonly timestamp: Date,
      public readonly expiresAt: Date,
    ) {}
  }
  