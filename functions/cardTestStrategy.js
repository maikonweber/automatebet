function testStrategy(estrategiaDetect, lastNumber) {
    if(estrategiaDetect.match(/Alternando Away/g)) {
         console.log('Repetição')
         return { 
              "expect" : "Quebra no Home",
              "array" : ['H', 'D']
              }
    } else if (estrategiaDetect.match(/Par/g)) {
         console.log('Par')
         return {
              "expect" : "Quebra no Away",
              "array" : ['A', "D"]  
          }
     }
}