import { os } from '@orpc/server'
import { reportBuilderRouter } from './report-builder/controller.js'
import { caseAssignmentRouter } from './case-assignment/controller.js'

export const router = os.router({
  reportBuilder: reportBuilderRouter,
  caseAssignment: caseAssignmentRouter,
})

export type AppRouter = typeof router
