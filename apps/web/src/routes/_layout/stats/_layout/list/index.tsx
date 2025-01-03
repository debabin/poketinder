import { createFileRoute } from '@tanstack/react-router';
import * as z from 'zod';

const statsListSearchSchema = z.object({
  types: z.array(z.string()).catch([]),
  name: z.string().catch('')
});

export const Route = createFileRoute('/_layout/stats/_layout/list/')({
  validateSearch: statsListSearchSchema
});
