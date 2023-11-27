// Importando o Componente de Angular
import { Component } from '@angular/core';

// Decorator do Componente, definindo o seletor, template HTML e estilos CSS
@Component({
  selector: 'app-home', // Seletor usado para referenciar este componente
  templateUrl: 'home.page.html', // Template HTML associado
  styleUrls: ['home.page.scss'], // Arquivos de estilo associados
})
export class HomePage {
  // Definindo propriedades para a lógica da calculadora
  resultado: string = '0'; // Armazena o resultado atual ou o número sendo inserido
  checa_operador: boolean = false; // Verifica se um operador já foi selecionado
  comeca_segundo_elemento: boolean = false; // Indica se o segundo número (após o operador) deve começar a ser preenchido
  resultado_concluido: boolean = false; // Indica se a operação foi concluída
  primeiro_elemento: string = ''; // Armazena o primeiro número inserido
  segundo_elemento: string = ''; // Armazena o segundo número inserido
  operador_selecionado: string = ''; // Armazena o operador selecionado
  memoria: string = ''; // Armazena a expressão completa da operação realizada

  // Construtor do componente (vazio neste caso)
  constructor() { }

  // Método para tratar a entrada de dígitos
  digito(valor: string) {
    if (this.resultado_concluido) {
      // Reseta o resultado se uma operação foi concluída anteriormente
      this.resultado = valor;
      this.resultado_concluido = false;
      this.checa_operador = false;
      this.segundo_elemento = "";
    } else {
      // Adiciona o dígito ao número correto (primeiro ou segundo)
      if (this.comeca_segundo_elemento) {
        this.segundo_elemento += valor;
      } else {
        this.resultado = this.resultado === "0" ? valor : this.resultado + valor;
      }
    }
  }

  // Método para selecionar um operador
  operador(valor: string) {
    if (!this.checa_operador) {
      // Define o primeiro número e o operador selecionado
      this.primeiro_elemento = this.resultado;
      this.resultado += valor;
      this.checa_operador = true;
      this.comeca_segundo_elemento = true;
      this.operador_selecionado = valor;
    }
  }

  // Método para resetar a calculadora
  redefinir() {
    // Reseta todos os campos e indicadores para o estado inicial
    this.resultado = "0";
    this.checa_operador = false;
    this.primeiro_elemento = '';
    this.segundo_elemento = '';
    this.operador_selecionado = '';
    this.comeca_segundo_elemento = false;
    this.memoria = '';
  }

  // Método para calcular o resultado da expressão
  calcular() {
    // Converte os elementos numéricos para float
    let primeiro = parseFloat(this.primeiro_elemento);
    let segundo = parseFloat(this.segundo_elemento);

    // Verifica a validade dos números e executa a operação
    if (isNaN(primeiro) || (isNaN(segundo) && this.operador_selecionado !== "²")) {
      this.resultado = "Erro: Entrada inválida";
    } else {
      switch (this.operador_selecionado) {
        // Executa a operação matemática com base no operador
        case "+": this.resultado = (primeiro + segundo).toString(); break;
        case "-": this.resultado = (primeiro - segundo).toString(); break;
        case "*": this.resultado = (primeiro * segundo).toString(); break;
        case "/":
          this.resultado = segundo === 0 ? "Erro: Divisão por zero" : (primeiro / segundo).toString();
          break;
        case "%": this.resultado = ((primeiro * segundo) / 100).toString(); break;
        case "²": this.resultado = (Math.pow(primeiro, 2)).toString(); break;
        case "1/": this.resultado = (1 / segundo).toString(); break;
        default: this.resultado = "Erro: Operador inválido";
      }

      // Atualiza a memória da calculadora com a expressão completa
      const segundoElementoString = segundo !== null ? segundo.toString() : "";
      this.memoria = `${primeiro} ${this.operador_selecionado} ${segundoElementoString} = ${this.resultado}`;
    }
    // Indica que o resultado foi concluído
    this.resultado_concluido = true;
  }
}
