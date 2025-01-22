import { z } from 'zod';

export const ClaimCreateDtoSchema = z.object({
  userId: z.string().nonempty({ message: 'User ID is required' }),
  amount: z.number().positive({ message: 'Amount must be greater than 0' }),
  transactionDate: z.string().nonempty({ message: 'Transaction date is required' }),
  subcategoryId: z.string().nonempty({ message: 'Subcategory ID is required' }),
  description: z.string().optional(),
  // status: z.string().optional().default('PENDING'),
  receiptPath: z.string().optional(),
});

export type ClaimCreateDto = z.infer<typeof ClaimCreateDtoSchema>;