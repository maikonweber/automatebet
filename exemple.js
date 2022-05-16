 let obj =  {
    name: 'Football French Roulette',
    number: '8\n30\n11\n34\n6\n6\n6\n18\n18\n22\nx3'
  } 

    let number = obj.number.split('\n');
    for (let i = 0; i < number.length; i++) {
        // Replace if number is have a  regEx  x[0-9]* in string 
        let regEx = /x[0-9]*/g;
        for (let i = 0; i < number.length; i++) {
            if (number[i].match(regEx)) {
                number[i] = number[i].replace(regEx, '');
            }
        }
    }
    // removing of array the empty string
    number = number.filter(Boolean);
    for (let i = 0; i < number.length; i++) {
       // parse to int
         number[i] = parseInt(number[i]); 
    }
    
    obj.number = number;
    console.log(obj);
