import { CaseAssignmentRepository } from './repository.js'

const repository = new CaseAssignmentRepository()

export class CaseAssignmentService {
  findAll() {
    return repository.findAll()
  }

  findById(id: string) {
    return repository.findById(id)
  }

  findByCaseId(caseId: string) {
    return repository.findByCaseId(caseId)
  }
}
