 class consumerRoleta {
    constructor(client, rabbitClient) {
    this.client = client
    this.rabbitClient = rabbitClient
    this.interval;
    }

    async connection () {

    }

    async createPattern() {          
     const coluna1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
     const coluna2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
     const coluna3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
     const par = [2, 4, 6, 8,  10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36]
     const impar = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35]
     const bloco1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
     const bloco2 = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
     const bloco3 = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
     const red = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]
     const green = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]
     const OneTo18 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
     const x19To36 = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]

        
    
     let colunas = []
     let blocos = []
     let reds = []
     let greens = []
     let OneTo18s = []
     let imparx = []
     let parx = []


     for(let i = 0; i < newArray.length; i++) {
        if (columa1.includes(newArray[i])) {
             colunas.push(1)
        } else if (coluna2.includes(newArray[i])) {
             colunas.push(2)
        } else if (coluna3.includes(newArray[i])) {
             colunas.push(3)
        } else {
             colunas.push(0)
        }
   }
   for(let i = 0; i < newArray.length; i++) {
        if (bloco1.includes(newArray[i])) {
             blocos.push(1)
        } else if (bloco2.includes(newArray[i])) {
             blocos.push(2)
        } else if (bloco3.includes(newArray[i])) {
             blocos.push(3)
        } else {
             blocos.push(0)
        }
   }

   for(let i = 0; i < newArray.length; i++) {
        if (red.includes(newArray[i])) {
             reds.push(1)
        } else if (green.includes(newArray[i])) {
             reds.push(2)
        } else {  
             reds.push(3)
        }
   }
   for(let i = 0; i < newArray.length; i++) {
        if (green.includes(newArray[i])) {
             greens.push(1)
        } else if (red.includes(newArray[i])) {
             greens.push(2)
        }
        else {
             greens.push(3)
        }
   }
   for(let i = 0; i < newArray.length; i++) {
        if (OneTo18.includes(newArray[i])) {
             OneTo18s.push(1)
        } else if (x19To36.includes(newArray[i])) {
             OneTo18s.push(2)
        } else {
             OneTo18s.push(0)
        }
   }

  
   for(let i = 0; i < newArray.length; i++) {
   
        if (par.includes(newArray[i])) {
             parx.push(1)
        } else if (impar.includes(newArray[i])) {
             parx.push(2)
        }
        else {
             parx.push(0)
        }
   
   }

   let strategyProccess  = { 
        colunas : colunas,
        blocos : blocos,
        reds : reds,
        greens : greens,
        OneTo18s : OneTo18s,
        parOrImpar : parx,
        imparOrPar : imparx
    } 
    
    return this.regExStrategy(strategyProccess)
    
}


    async intervalInit(interval) {
        this.interval = interval
        setInterval ( async () => {
            console.log('Thick This Interval for Queue Sygnal')
            console.log('---------------------------------------')
            const LastNames = await this.client.query(`SELECT name 
            FROM robotevolution Where created > now() - interval '1 day' Group by name;`)

            LastNames.forEach(element => {
                console.log('Get Last Result from', element.name )   
                const last30 = this.client.query(`
                Select name, number from robotevolution
                WHERE created > NOW() - INTERVAL '1 day'
                AND name = $1 limit 1;
                `, [element.name])

                const objectAnalyser = {
                    'roulletName' : last30.rows.name,
                    'numberjson' : last30.rows.number
                    }

                return this.createPattern(objectAnalyser)       
            });
            
        }, interval)
    }

    async regExStrategy() {
        
    }
}