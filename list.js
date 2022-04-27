const redis = require('redis');

(async () => {

  const client = redis.createClient({
    host: 'localhost',
    port: 6379,
    password: "roullet" 
  });

  const subscriber = client.duplicate();

  await subscriber.connect();
  let possible = false;
  let result = false;
  let Gale = false;
  let sala = {
    Sala : "",
    mensage : "",
    aposta : "",
    resultado : "",
  }
  
  await subscriber.subscribe('roulleteEventsTelegram', (message) => { 
       let regEx4 = /Entrar no Bloco 1/g;
       let regEx3 = /Entrar no Bloco 2/g;
       let regEx5 = /Entrar no Bloco 3/g; 
       let regEx6 = /Entrar no Coluna 1/g;
       let regEx7 = /Entrar no Coluna 2/g;
       let regEx8 = /Entrar no Coluna 3/g;
       let regEx9 = /Cobrir o ZERO/g;
       let regEx10 = /1° Gale/g;      
       let regEx2 = /Abortar possível entrada…/g;
       let regEx =   /🧐 Possível entrada/g;

        if(result === false ) { 
          
        if(possible === false) {
        
        if(regEx.test(message)){
          possible = true;
          
      }
    } else {
      if(regEx2.test(message)){
        possible = false;
        
      } else {
        console.log("Entradas")
        if(regEx4.test(message)){
          possible = false;
          result = true;
          sala.Sala = "Bloco 1";
          sala.mensage = message;
          sala.aposta = "1";
          console.log(sala);
        } else if(regEx3.test(message)){
          possible = false;
          result = true;
          sala.Sala = "Bloco 2";
          sala.mensage = message;
          sala.aposta = "2";
          console.log(sala);
        } else if(regEx5.test(message)){
          possible = false;
          result = true;
          sala.Sala = "Bloco 3";
          sala.mensage = message;
          sala.aposta = "3";
          console.log(sala);

        } else if(regEx6.test(message)){
          possible = false;
          result = true;
          sala.Sala = "Coluna 1";
          sala.mensage = message;
          sala.aposta = "4";
          console.log(sala);
        } else if(regEx7.test(message)){
          possible = false;
          result = true;
          sala.Sala = "Coluna 2";
          sala.mensage = message;
          sala.aposta = "5";
          console.log(sala);
        }
        else if(regEx8.test(message)){
          possible = false;
          result = true;
          sala.Sala = "Coluna 3";
          sala.mensage = message;
          sala.aposta = "6";
          console.log(sala);
       
        } else if(regEx9.test(message)){
          possible = false;
          result = true;
          sala.Sala = "Coluna 3";
          sala.mensage = message;
          sala.aposta = "7";   
          console.log(sala);
        } else  {
          possible = false;
          result = false;
          console.log(message);
        }
    }
  }
} else {
    console.log("Resultado")
    let regEx10 = /1° Gale/g;
    if(regEx10.test(message)){
      result = false;
      possible = false;
      Gale = true;
      sala.result = "GREEN";
      console.log(message);
    } else if (/GREEN PAPAI/g.test(message)){
      result = false;
      possible = false;
      sala.result = "GREEN";
      console.log(message);
    } else if (Gale === true) {
      if (/GREEN PAPAI/g.test(message)){
        result = false;
        possible = false;
        sala.result = "GREEN 1 GALE";
        console.log(message);
      } else {
        console.log("Gale")
        Sala.result = "RED ou Segundo Gale";
        result = false;
        possible = false;
        console.log(message);
      }
    } else {
      console.log("Resultado")
      result = false;
      possible = false;
      console.log(message);
    }
}
  if (sala.Sala !== "") {
    console.logg(sala);
  } else {
    console.log("Menssagem Ignorada")
  }
  });
   
})();