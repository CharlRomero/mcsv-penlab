export class Certificate {
  constructor(name, labName) {
    this.name = name;
    this.labName = labName;
    this.dateIssued = new Date().toLocaleDateString();
  }

  // Validación de la flag del laboratorio (simulada)
  isValidFlag(flag) {
    const validFlags = ["passed", "approved"];
    return validFlags.includes(flag);
  }
}
