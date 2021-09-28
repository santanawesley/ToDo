import React from "react";
import { format } from "date-fns";

const masks = {
  maskDate: (date) => {
    return format(new Date(date), "dd/MM/yyyy");
  },

  currencyFormatter: (value) => {
    if (!Number(value)) return "";

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value / 100);
  },
  // modelo de chamada da mask acima no arquivo index
  // <input type="text" vonChange={(e) => setCurrency(masks.currencyFormatter(e.target.value.replace(/\D/g, '')))} value={currency}/>

  maskCPF: (cpf) => {
    return cpf
      .trim()
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  },

  maskCNPJ: (cnpj) => {
    let r = cnpj.replace(/\D/g, "");
    // r = r.replace(/^0/, '');
    if (r.length > 12) {
      r = r.replace(
        /^(\d\d)(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2}).*/,
        "$1.$2.$3/$4-$5"
      );
    } else if (r.length > 8) {
      r = r.replace(/^(\d\d)(\d{0,3})(\d{0,3})(\d{0,4}).*/, "$1.$2.$3/$4");
    } else if (r.length > 5) {
      r = r.replace(/^(\d\d)(\d{0,3})(\d{0,3}).*/, "$1.$2.$3");
    } else if (r.length > 2) {
      r = r.replace(/^(\d\d)(\d{0,3})/, "$1.$2");
    } else if (r.length > 0) {
      r = r.replace(/^(\d*)/, "$1");
    }

    return r;
  },

  toCamelCase: (text) => {
    let i;
    let j;
    let str;

    str = text.replace(/([^\W_]+[^\s-]*) */g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    // Certain minor words should be left lowercase unless
    // they are the first or last words in the string
    const lowers = ["Da", "Do", "De"];
    for (i = 0, j = lowers.length; i < j; i++)
      str = str.replace(
        new RegExp("\\s".concat(lowers[i]).concat("\\s"), "g"),
        (txt) => {
          return txt.toLowerCase();
        }
      );

    return str;
  },

  maskPhone: (phone) => {
    let r = phone.replace(/\D/g, "");
    r = r.replace(/^0/, "");
    if (r.length > 10) {
      r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 6) {
      r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
      r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else if (r.length > 0) {
      r = r.replace(/^(\d*)/, "($1");
    }

    return r;
  },

  maskCep: (cep) => {
    return cep
      .trim()
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d{1,3})$/, "$1-$2");
  },

  phoneCheck: (phone) => {
    const phoneArray = [...phone];
    return !phoneArray.every((el) => phoneArray[0] === el);
  },

  CheckCPF: {
    cpf(cpf) {
      if (cpf === null) {
        return false;
      }
      cpf += "";
      if (cpf.length !== 11) {
        return false;
      }
      if (
        cpf === "00000000000" ||
        cpf === "11111111111" ||
        cpf === "22222222222" ||
        cpf === "33333333333" ||
        cpf === "44444444444" ||
        cpf === "55555555555" ||
        cpf === "66666666666" ||
        cpf === "77777777777" ||
        cpf === "88888888888" ||
        cpf === "99999999999"
      ) {
        return false;
      }
      let numero = 0;
      let caracter = "";
      const numeros = "0123456789";
      let j = 10;
      let somatorio = 0;
      let cpfAux = cpf.substring(0, 9);
      for (let i = 0; i < 9; i++) {
        caracter = cpfAux.charAt(i);
        if (numeros.search(caracter) === -1) {
          return false;
        }
        numero = Number(caracter);
        somatorio += numero * j;
        j--;
      }
      let resto = somatorio % 11;
      let digito1 = 11 - resto;
      if (digito1 > 9) {
        digito1 = 0;
      }
      j = 11;
      somatorio = 0;
      cpfAux += digito1;
      for (let i = 0; i < 10; i++) {
        caracter = cpfAux.charAt(i);
        numero = Number(caracter);
        somatorio += numero * j;
        j--;
      }
      resto = somatorio % 11;
      let digito2 = 11 - resto;
      if (digito2 > 9) {
        digito2 = 0;
      }
      cpfAux += digito2;
      return cpf === cpfAux;
    },
  },

  CheckCNPJ: {
    cnpj(cnpj) {
      if (cnpj === "") return false;

      if (cnpj.length !== 14) return false;

      // Elimina CNPJs invalidos conhecidos
      if (
        cnpj === "00000000000000" ||
        cnpj === "11111111111111" ||
        cnpj === "22222222222222" ||
        cnpj === "33333333333333" ||
        cnpj === "44444444444444" ||
        cnpj === "55555555555555" ||
        cnpj === "66666666666666" ||
        cnpj === "77777777777777" ||
        cnpj === "88888888888888" ||
        cnpj === "99999999999999"
      )
        return false;

      // Valida DVs
      let tamanho = cnpj.length - 2;
      let numeros = cnpj.substring(0, tamanho);
      const digitos = cnpj.substring(tamanho);
      let soma = 0;
      let pos = tamanho - 7;
      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
      }
      let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (String(resultado) !== digitos.charAt(0)) return false;

      tamanho += 1;
      numeros = cnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
      }
      resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (String(resultado) !== digitos.charAt(1)) return false;

      return true;
    },
  },
};

export default masks;
