export class UsuarioModel {
    id: string; // ID único do usuário (gerado pelo Firebase, por exemplo)
    email: string; // Endereço de e-mail do usuário
    senha: string; // Senha do usuário
    // Outras propriedades específicas do usuário, como nome, data de nascimento, etc.
  
    constructor(id: string, email: string, senha: string) {
      this.id = id;
      this.email = email;
      this.senha = senha;
      // Inclua aqui a inicialização de outras propriedades, se necessário.
    }
  }
  