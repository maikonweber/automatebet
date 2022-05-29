
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
    "1, 2, 1, 2, 1, 2" : function(){
        return "Alternancia da Coluna 1 e 2";
    },
    '2, 1, 2, 1, 2, 1' : function(){
        return "Alternancia da Coluna 2 e 1";
    },
    '1, 3, 1, 3, 1, 3' : function(){
        return "Alternancia da Coluna 3 e 1";
    },
    '3, 1, 3, 1, 3, 1' : function(){
        return "Alternancia da Coluna 3 e 1";
    },
    '3, 2, 3, 2, 3, 2' : function(){
        return "Alternancia da Coluna 3 e 2";
    },
    '2, 3, 2, 3, 2, 3' : function(){
        return "Alternancia da Coluna 2 e 3";
    },
    };   

const strategyDuziaRepeat = {
    '1, 1, 1, 1, 1, 1' : function(){
        return "Duzia de 1";
    },
    '2, 2, 2, 2, 2, 2' : function(){
        return "Duzia de 2";
    },
    '3, 3, 3, 3, 3, 3' : function(){
        return "Duzia de 3";
    } 
}

const strategyColumnReapeat = { 
    '1, 1, 1, 1, 1, 1, 1, 1' : function(){
        return "Coluna 1";
    },
    '2, 2, 2, 2, 2, 2, 2, 2' : function(){
        return "Coluna 2";
    },
    '3, 3, 3, 3, 3, 3, 3, 3' : function(){
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
            value.pop();
            value.pop();
            value.pop();
            value.pop();
            value.pop();
            value.pop();
            value.pop();
            return value;      
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

 
    if(strategy[StringValue]){
        return strategy[StringValue]();
    }
    return `Não identificado, ${newValue}`;
}

function colunasAlternat(json) {
    let colunas = [];
    json.forEach(element => {
        let RoletteObj = {
            name : element.name,
            number : element.number.map((item, index ) =>  {
                return item.number;
            }),
            colunas: element.number.map(( item, index ) => {
                return item.columa
            }),
            bloco : element.number.map(( item, index ) => {
                return item.bloco
            }),
            par : element.number.map(( item, index ) => {
                return item.par
            }),
            impar : element.number.map(( item, index ) => {
                return item.impar
            }),
            green : element.number.map(( item, index ) => {

                return item.green
            }),
            red : element.number.map(( item, index ) => {
                return item.red
            }),
            oneTo18 : element.number.map(( item, index ) => {
                return item.OneTo18
            }),
            nineteenTo36 : element.number.map(( item, index ) => {
                return item.x19To36
            }),
        }     
        colunas.push(RoletteObj);
    })
    
    return colunas;
}
   
    subscriber.subscribe('Bet365', async (message) => {
        let json = JSON.parse(message);
        console.log(json);
        let colunas = colunasAlternat(json);
        colunas.forEach(async (element, index) => {
                
            let strategyColumnRepeat = getStrategy(strategyColumnReapeat, element.colunas, "8");
            let strategyDuzia = getStrategy(strategyDuziaRepeat, element.bloco, "8");
            let strategy = getStrategy(strategyAlternateColum, element.colunas, "6");

            obj = {
                name : element.name,
                number: element.number,
                strategyAlternateColum : strategy,
                bloco : element.bloco,
                strategyDuzia : strategyDuzia,
                strategyColumnRepeat : strategyColumnRepeat,
            }

            console.log(obj);
            
        });




    
    });

        


})();
