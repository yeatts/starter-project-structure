import { os } from '@orpc/server'
import { z } from 'zod'
import { CaseAssignmentService } from './service.js'

const service = new CaseAssignmentService()

const CaseAssignmentSchema = z.object({
  id: z.string(),
  caseId: z.string(),
  assigneeId: z.string(),
  status: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const caseAssignmentRouter = os.router({
  list: os
    .route({ method: 'GET', path: '/case-assignments' })
    .output(z.array(CaseAssignmentSchema))
    .handler(async () => service.findAll()),

  getById: os
    .route({ method: 'GET', path: '/case-assignments/{id}' })
    .input(z.object({ id: z.string() }))
    .output(CaseAssignmentSchema.nullable())
    .handler(async ({ input }) => service.findById(input.id)),

  getByCaseId: os
    .route({ method: 'GET', path: '/case-assignments/case/{caseId}' })
    .input(z.object({ caseId: z.string() }))
    .output(z.array(CaseAssignmentSchema))
    .handler(async ({ input }) => service.findByCaseId(input.caseId)),
})
