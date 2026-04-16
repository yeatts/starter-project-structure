import { ReportBuilderRepository } from './repository.js'

const repository = new ReportBuilderRepository()

export class ReportBuilderService {
  findAll() {
    return repository.findAll()
  }

  findById(id: string) {
    return repository.findById(id)
  }
}
