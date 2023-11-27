import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  resultado: string = '0';
  checa_operador: boolean = false;
  comeca_segundo_elemento: boolean = false;
  resultado_concluido: boolean = false;
  primeiro_elemento: string = '';
  segundo_elemento: string = '';
  operador_selecionado: string = '';
  memoria: string = '';

  constructor() { }

  digito(valor: string) {
    if (this.resultado_concluido) {
      this.resultado = valor;
      this.resultado_concluido = false;
      this.checa_operador = false;
      this.segundo_elemento = "";
    } else {
      if (this.comeca_segundo_elemento) {
        //preencher o segundo elemento
        this.segundo_elemento = this.segundo_elemento + valor;
        this.resultado = this.resultado + valor;
      } else {
        if (this.resultado == "0") {
          this.resultado = valor;
        } else {
          this.resultado = this.resultado + valor;
        }
      }
    }



  }

  operador(valor: string) {
    if (!this.checa_operador) {
      this.primeiro_elemento = this.resultado;
      this.resultado += valor;
      this.checa_operador = true;
      this.comeca_segundo_elemento = true;
      this.operador_selecionado = valor;
    }
  }

  redefinir() {
    this.resultado = "0";
    this.checa_operador = false;
    this.primeiro_elemento = '';
    this.segundo_elemento = '';
    this.operador_selecionado = '';
    this.comeca_segundo_elemento = false;
    this.memoria = '';
  }

  calcular() {
  let primeiro = parseFloat(this.primeiro_elemento);
  let segundo = parseFloat(this.segundo_elemento);

  
    if (isNaN(primeiro) || (isNaN(segundo) && this.operador_selecionado !== "²")) {
      this.resultado = "Erro: Entrada inválida";
      this.resultado_concluido = true;
    } else {
      switch (this.operador_selecionado) {
        case "+":
          this.resultado = (primeiro + segundo).toString();
          break;
        case "-":
          this.resultado = (primeiro - segundo).toString();
          break;
        case "*":
          this.resultado = (primeiro * segundo).toString();
          break;
        case "/":
          if (segundo === 0) {
            this.resultado = "Erro: Divisão por zero";
          } else {
            this.resultado = (primeiro / segundo).toString();
          }
          break;
        case "%":
          this.resultado = ((primeiro * segundo) / 100).toString();
          break;
        case "²":
          this.resultado = (Math.pow(primeiro, 2)).toString();
          segundo = null; 
          break;
        case "1/":
          this.resultado = (1 / segundo).toString();
          primeiro = null;
          break;
        default:
          this.resultado = "Erro: Operador inválido";
      }
  
      // Ajuste para lidar com casos em que o segundo não é necessário
      const segundoElementoString = segundo !== null ? segundo.toString() : "";
  
      this.memoria = `${primeiro} ${this.operador_selecionado} ${segundoElementoString} = ${this.resultado}`;
      this.resultado_concluido = true;
    }
  }
}  

