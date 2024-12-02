export class Certificate {
  constructor(username, labName) {
    this.name = username;
    this.labName = labName;
    this.dateIssued = new Date().toLocaleDateString();
  }

  // Validación de la flag del laboratorio (simulada)
  isValidFlag(flag) {
    const validFlags = ["passed", "approved"];
    return validFlags.includes(flag);
  }
}