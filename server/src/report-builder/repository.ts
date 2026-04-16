import { db } from '../common/db/index.js'

export class ReportBuilderRepository {
  findAll() {
    return db.report.findMany({ orderBy: { createdAt: 'desc' } })
  }

  findById(id: string) {
    return db.report.findUnique({ where: { id } })
  }
}
