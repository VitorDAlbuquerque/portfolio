export function calculateAge(dataNascimento: string, now: Date = new Date()): number {
  const nascimento = new Date(dataNascimento);
  let idade = now.getFullYear() - nascimento.getFullYear();
  const mes = now.getMonth() - nascimento.getMonth();
  if (mes < 0 || (mes === 0 && now.getDate() < nascimento.getDate())) {
    idade--;
  }
  return idade;
}

