const expectNumber = {
    'Alternancia da Coluna 1 e 2' : function () {
         const col1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
         const col2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
         const col3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
         return col3.concat(col2)
    },
    'Alternancia da Coluna 3 e 1' : function () {
         const col3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
         const col1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
         const col2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
         return col3.concat(col1)
    },
    'Alternancia da Coluna 1 e 3' : function () {
         const col1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
         const col3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
         const col2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
         return col3.concat(col2)
    },
    'Alternancia da Coluna 3 e 1' : function () {
         const col3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
         const col1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
         const col2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
         return col1.concat(col2)
    },
    'Alternancia da Coluna 2 e 1' : function () {
         const col2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
         const col1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
         const col3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
         return col3.concat(col1)
    },
    'Alternar colunas 3 e 2' : function () {
     const col3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
     const col2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
     const col1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
     return 
},
    'Alternancia da Coluna 3 e 2' : function () {
         const col3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
         const col2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
         const col1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
         return col1.concat(col2)
    },
    'Alternancia da Coluna 1 e 2_martingale' : function () {
     const col1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
     const col2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
     const col3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
     return col3
},
'Alternancia da Coluna 3 e 1_martingale' : function () {
     const col3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
     const col1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
     const col2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
     return col2
},
'Alternancia da Coluna 1 e 3_martingale' : function () {
     const col1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
     const col3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
     const col2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
     return col2
},
'Alternancia da Coluna 3 e 1_martingale' : function () {
     const col3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
     const col1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
     const col2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
     return col2
},
'Alternancia da Coluna 2 e 1_martingale' : function () {
     const col2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
     const col1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
     const col3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
     return col3
},
'Alternar colunas 3 e 2_martingale' : function () {
 const col3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
 const col2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
 const col1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
 return col1
},
'Alternancia da Coluna 3 e 2_martingale' : function () {
     const col3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
     const col2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
     const col1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
     return col1
},
    'Impar Reapeat' : function () {
         const impar = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35]
         return impar
    },
    'Par Reapeat' : function () {
         const par = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36]
         return par
    },
    '19 ao 36 Reapeat' : function () {
         const oneTo18 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
         return oneTo18
    },
    '1 ao 18 Reapeat' : function () {
         const oneTo18 = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
         return oneTo18
    },
    'Red' : function () {
         const red = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]
         return red
    },
    'White' : function () {
         const white = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]
         return white
    },
    'Bloco 1 Reapeat' : function () {
         const duzia = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
         const duzia2  = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
         const duzia3 = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
         return duzia2.concat(duzia3)
    },
    'Bloco 2 Reapeat' : function () {
         const duzia = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
         const duzia2  = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
         const duzia3 = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
         return duzia.concat(duzia3)
    },
    'Bloco 3 Reapeat' : function () {
         const duzia = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
         const duzia2  = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
         const duzia3 = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
         return duzia.concat(duzia2)
    },
    'Coluna 1 Repeat' : function () {
         const col3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
         const col1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
         const col2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
         return col2.concat(col3)
    },
    'Coluna 2 Reapeat' : function () {
         const col3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
         const col1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
         const col2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
        return col3.concat(col1)
    },
    'Coluna 3 Reapeat' : function () {
         const col3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
         const col1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
         const col2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
         return col2.concat(col1)
    },
    'Alternancia da Coluna 2 e 3' : function () {
         const col2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
         const col3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
         const col1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
         return col1
    },
    'Coluna 1 Absent' : function () {
     const col1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34] 
          return col1   
    },
    'Coluna 2 Absent' : function () {
     const col2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
          return col2
    },
    'Coluna 3 Absent' : function () {
     const col3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
          return col3 
    },
    'Bloco 1 Absent' : function () {
     const duzia = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
     const duzia2  = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
     const duzia3 = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
          return duzia   
    },
    'Bloco 2 Absent' : function () {
     const duzia = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
     const duzia2  = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
     const duzia3 = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
          return duzia2   
    },
    'Bloco 3 Absent' : function () {
     const duzia = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
     const duzia2  = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
     const duzia3 = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36] 
     return duzia3   
    }
}

const expectEstrategia = {
     'Coluna 3' : () => {
          return [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
     },
     'Coluna 2' : () => {
          return [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]
     },
     'Colunas 3'  : () => {
          return [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
     },
     'Bloco 2' : () => {
          return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].concat([13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24])   
     },
     'Bloco 2' : () => {
          return [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
     },
     'Bloco 3' : () => {
          return [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
     }, 
     '1ao18' : () => {
          return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
     },
     '19ao36' : () => {
            return [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
     },
     'Par' : () => {
          return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
     },
     'Impar' : () => {
           return [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35]

     },
     'Red' : () => {
               return [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]
     },
     'White' : () => {
               return [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]
     }

}



module.exports = expectNumber