import { db } from '../common/db/index.js'

export class CaseAssignmentRepository {
  findAll() {
    return db.caseAssignment.findMany({ orderBy: { createdAt: 'desc' } })
  }

  findById(id: string) {
    return db.caseAssignment.findUnique({ where: { id } })
  }

  findByCaseId(caseId: string) {
    return db.caseAssignment.findMany({ where: { caseId } })
  }
}
