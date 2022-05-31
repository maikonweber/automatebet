
// redis io
const redis = require('redis');
const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
});
(async () => {

const subscriber = redisClient.duplicate();
await subscriber.connect();

const { TelegramClient, Api } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input"); // npm i input


const apiId = 17228434;
const apiHash = "b05e1c84ad4dd7c77e9965204c016a36";
const stringSession = new StringSession("1AQAOMTQ5LjE1NC4xNzUuNTkBu56ALdSaYUL23O5CFsgt2+z5IxJET8cjyhEeB2j+7YBtgUQvbVHh8+BhMN1+IZs/nnFtEwFpxwZnHm7P59qvCh7epulQG51Mbhw3/mO5V2xUL/vhoeYBwc5PZwrDxZ38MiYox8Y3CTK/rpvn4oKK8BbXJoJ4+XWO+5+uQj4TOQmzWM9ahDxAaFjPj9IWFqiN3LvcAJFJ1k3Q8TdSTaJQghTRIP1afQ7TdD8o5DQozl307Lg/s05Q+neNey1QghMvsUXwWfyrvzkQAqx2ma5Nl7ZhVtRhr7GxzSXQmoLtLcZGdlVky/fBtq2XsyKqXvs1GKQWftURsUb6uCdSN/XSx+w=");

const strategyAlternateColum = {
    "1,2,1,2,1" : function(){
        return "Alternancia da Coluna 1 e 2";
    },
    '2,1,2,1,2' : function(){
        return "Alternancia da Coluna 2 e 1";
    },
    '1,3,1,3,1' : function(){
        return "Alternancia da Coluna 3 e 1";
    },
    '3,1,3,1,3' : function(){
        return "Alternancia da Coluna 3 e 1";
    },
    '3,2,3,2,3' : function(){
        return "Alternancia da Coluna 3 e 2";
    },
    '2,3,2,3,1' : function(){
        return "Alternancia da Coluna 2 e 3";
    },
    };  
    
    const strategyColorReapeat = {
        'true,true,true,true,true,true,true,true' : function(){
            return "Color RED REPEAT";
        },
    }

    const strategyParRepeat = {
        'true,true,true,true,true,true,true,true' : function(){ 
            return "Par REPEAT";
        },
    }

    const strategyGreenRepeat = {
        'true,true,true,true,true,true,true,true' : function(){
            return "Color Red";
        }
    }

    const strategyOneTo18 = {
        'true,true,true,true,true,true,true,true' : function(){
            return "Color Red";
        }
    }

    const strategy19to36 = {
        'true,true,true,true,true,true,true,true' : function(){
            return "One to 18";
        }
    }

    const strategyImparReapeat = {
        'true,true,true,true,true,true,true,true' : function(){
            return "Impar Reapeat";
        },
    }


const strategyDuziaRepeat = {
    '1,1,1,1,1,1' : function(){
        return "Duzia de 1";
    },
    '2,2,2,2,2,2' : function(){
        return "Duzia de 2";
    },
    '3,3,3,3,3,3' : function(){
        return "Duzia de 3";
    } 
}

const strategyColumnReapeat = { 
    '1,1,1,1,1,1,1,1': function(){
        return "Coluna 1";
    },
    '2,2,2,2,2,2,2,2': function(){
        return "Coluna 2";
    },
    '3,3,3,3,3,3,3,3': function(){
        return "Coluna 3";
    }
}
    
function getStrategy(strategy, value, number){
    let newValue = value
    obj = {
        '10' : function(){
               return newValue 
            },
        '9' : function(){
            newValue.pop();
            return newValue;    
        },
        '8' : function(){
            newValue.pop();
            newValue.pop();
            return newValue;    
        },
        '7' : function(){
            newValue.pop();
            newValue.pop();
            newValue.pop();
            return newValue;      
        },
        '6' : function(){
            newValue.pop();
            newValue.pop();
            newValue.pop();
            newValue.pop();
            return newValue;      
        },
        '5' : function(){
            newValue.pop();
            newValue.pop();
            newValue.pop();
            newValue.pop();
            newValue.pop();
            return newValue;      
        },
        '4' : function(){
            newValue.pop();
            newValue.pop();
            newValue.pop();
            newValue.pop();
            newValue.pop();
            newValue.pop();
            return newValue;      
        },
        '3' : function(){
            newValue.pop();
            newValue.pop();
            newValue.pop();
            newValue.pop();
            newValue.pop();
            newValue.pop();
            newValue.pop();
            return newValue;      
        },
        '2' : function(){
            newValue.pop();
            newValue.pop();
            newValue.pop();
            newValue.pop();
            newValue.pop();
            newValue.pop();
            newValue.pop();
            newValue.pop();
            return newValue;
        },
        '1' : function(){
            newValue.pop();
            newValue.pop();
            newValue.pop();
            newValue.pop();
            newValue.pop();
            newValue.pop();
            newValue.pop();
            newValue.pop();
            newValue.pop();
            return newValue;
        }
    }

    
    let newValue2 = obj[number]();
    // Convert newValue to string
    let StringValue = newValue2.toString();

    
    if(strategy[`${StringValue}`]){
        return strategy[`${StringValue}`]();
    }
    return `Não identificado; ${StringValue}`;
}

function colunasAlternat(json) {
    let colunas = [];
    json.forEach(element => {

        let RoletteObj = {    
            name : element.name,
            number : element.number.map(x => x.number),
            colunas: element.number.map(x => x.columa),
            colunas2: element.number.map(x => x.columa),
            bloco : element.number.map(x => x.bloco),
            bloco2 : element.number.map(x => x.bloco),
            par : element.number.map( x => x.par),
            impar : element.number.map(x => x.impar),
            green : element.number.map(x => x.green),
            red : element.number.map(x => x.red),
            oneTo18 : element.number.map(x => x.OneTo18),
            nineteenTo36 : element.number.map(x => x.x19To36),
        }     
        
        colunas.push(RoletteObj);
    })

    
    
    return colunas;
}
   
    subscriber.subscribe('Bet365', async (message) => {
        let json = JSON.parse(message);
        let preload = colunasAlternat(json);

        let array = [];
        for (let i = 0; i < preload.length; i++) {
             let obj = {
                name : preload[i].name,
                number : preload[i].number,
                colunas: preload[i].colunas,
                colunas2 : preload[i].colunas2,
                bloco : preload[i].bloco,
                red : preload[i].red,
                green : preload[i].green,
                par : preload[i].par,
                impar : preload[i].impar,
                oneTo18 : preload[i].oneTo18,
                nineteenTo36 : preload[i].nineteenTo36,

             }

                obj.strategyDuziaRepeat = getStrategy(strategyDuziaRepeat, obj.bloco, "6");
                obj.strategyColumnReapeat = getStrategy(strategyColumnReapeat, obj.colunas2, "8");
                obj.strategyAlternateColum = getStrategy(strategyAlternateColum, obj.colunas, "5");
                obj.strategy19to36 = getStrategy(strategy19to36, obj.nineteenTo36, "10");
                obj.strategyImparReapeat = getStrategy(strategyImparReapeat, obj.impar, "10");
                obj.strategyParReapeat = getStrategy(strategyParRepeat, obj.par, "10");
                obj.strategyGreen = getStrategy(strategyGreenRepeat, obj.green, "10");
                obj.strategyRed = getStrategy(strategyColorReapeat, obj.red, "10");
                obj.strategyOneTo18 = getStrategy(strategyOneTo18, obj.oneTo18, "10");
                
                console.log(obj.name, "name");
                console.log(obj.number, "number");
                console.log(obj.strategyAlternateColum, "strategyAlternateColum");
                console.log(obj.strategy19to36, "strategy19to36");
                console.log(obj.strategyColumnReapeat, "strategyColumnReapeat");
                console.log(obj.strategyDuziaRepeat, "strategyDuziaRepeat");
                console.log(obj.strategyGreen, "strategyGreen");
                console.log(obj.strategyImparReapeat, "strategyImparReapeat");
                console.log(obj.strategyOneTo18, "strategyOneTo18");
                console.log(obj.strategyParReapeat, "strategyParReapeat");
                console.log(obj.strategyRed, "strategyRed");
                console.log("-----------------------------------------------------");

        }

        

        // preload.forEach(async (element, index) => {
        //     let colunas = element.colunas;
        //     let bloco = element.bloco;
        //     let par = element.par;
                
        //     let strategyColumnRepeat = getStrategy(strategyColumnReapeat, colunas, "10");
        //     let strategyDuzia = getStrategy(strategyDuziaRepeat, bloco, "10");
        //     let strategy = getStrategy(strategyAlternateColum, colunas, "10");

        //     obj = {
        //         name : element.name,
        //         number: element.number,
        //         colunas: colunas,
        //         bloco : bloco,
        //         par : element.par,
        //         impar : element.impar,
        //         green : element.green,
        //         red : element.red,
        //         oneTo18 : element.oneTo18,
        //         nineteenTo36 : element.nineteenTo36,
        //         strategyAlternateColum : strategy,
        //         strategyDuzia : strategyDuzia,
        //         strategyColumnRepeat : strategyColumnRepeat,
        //     }  

        //     console.log(obj);
        // });



    
    });

        


})();
