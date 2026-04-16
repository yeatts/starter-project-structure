import { os } from '@orpc/server'
import { z } from 'zod'
import { ReportBuilderService } from './service.js'

const service = new ReportBuilderService()

const ReportSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const reportBuilderRouter = os.router({
  list: os
    .route({ method: 'GET', path: '/report-builder/reports' })
    .output(z.array(ReportSchema))
    .handler(async () => service.findAll()),

  getById: os
    .route({ method: 'GET', path: '/report-builder/reports/{id}' })
    .input(z.object({ id: z.string() }))
    .output(ReportSchema.nullable())
    .handler(async ({ input }) => service.findById(input.id)),
})
