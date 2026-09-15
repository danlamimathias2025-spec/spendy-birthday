export interface PartnerReceiptData {
  transactionId: string;
  partnerName: string;
  senderName: string;
  ageUnlocked: number;
  bankStatus: string;
  timestamp: string;
  blockHash: string;
  gasSubsidized: string;
  partnerNote: string;
}

export const DEFAULT_RECEIPT_DATA: PartnerReceiptData = {
  transactionId: 'TX-SPENDY-2026-0915',
  partnerName: 'SPENDY',
  senderName: 'SPLENZZY',
  ageUnlocked: 24,
  bankStatus: 'Bypassed / Pending Release',
  timestamp: '2026-09-15 09:16:43 UTC',
  blockHash: '0x8f3c...b49e',
  gasSubsidized: '100% (Subsidized by Founder Reserve)',
  partnerNote:
    'Happy Birthday to the one and only SPENDY! This level up protocol is your official birthday present from SPLENZZY. Another legendary year of breaking ceilings, dominating allocations, surviving chaotic bank holds and wire freezes, and conquering market volatility together. Entering 24 today with unstoppable vision and execution. Massive liquidity events, milestone drops, and historic trades are unlocked ahead. Level up confirmed — let’s keep winning.',
};
