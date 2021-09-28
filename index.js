
let options = {
    SYMBOL:/[\])}\'[{(]/,
    KEYWORDS:/^select$|^from$|^where$|^group by$|^union$|^intersect$|^insert$|^into$|^create$|^drop$|^descrive$|^table$|^update$|^delete$|^integer$|^text$|^distinct$|^having$|^order by$|^between$|^like$|^join$|^in$|^view$/i,
    id2s: /^[a-z]+-\w+/i,
    id1s: /^[_a-z]+\w+/i,    
    LITERALS:/^[\u0400-\u052F\u2DE0-\u2DFF\uA640-\uA69F']+$/, 
    NUMS: /\d+/,
    OPERATORS:/^(\+|-|\*|\/|=|:=|>|<|>=|<=|&|\||%|!|\^|\(|\))$/

}

let sqlInput = document.getElementById("sql-input");
let sqlSubmit = document.getElementById("sql-submit");

sqlSubmit.addEventListener("click",parseSql);



function parseSql(){
    let resultDiv = document.getElementById("result");
    let resultTable = document.createElement("table");
    let sql = sqlInput.value;
    let parsed = sqlParser(sql,options);
 
    resultDiv.innerHTML = `  
    <table  class="table">
    <thead>
        <th>Позиция</th>
        <th>Токен</th>
        <th>Лексема</th>
        <th>Старт</th>
        <th>Длина</th>
    </thead>
    <tbody>
    ${toHtml(parsed)}  
    </tbody>
    </table>`;
    resultDiv.appendChild(resultTable);
    console.log(resultTable.innerHTML);
    


}

function sqlParser (str,options) {
    let lexems = str.split(" ");
    let result = [];
    let startPosition = 1;
    console.log(lexems);
    
    for(let i = 0;i<lexems.length;++i){ 
        for (var key in options) {         
            if(lexems[i].match(options[key])){
                if(i>0){
                    startPosition=startPosition+lexems[i-1].length;
                }
                result.push({
                    token:key,
                    lex:lexems[i].match(options[key])[0],
                    start:startPosition,
                    len:lexems[i].match(options[key])[0].length,
                    pos:i+1
                })
                if(key!=="SYMBOL"){
                    break;
                }                  
            }
          }

        // if(lexems[i].match(options.KEYWORDS)){
          
        // }else if(lexems[i].match(options.id1s)){
        //     result.push({
        //         token:"ID",
        //         lex:lexems[i].match(options.id1s)[0],
        //         start:lexems[i].match(options.id1s)["index"],
        //         len:lexems[i].match(options.id1s)[0].length,
        //         pos:i
        //     })
                       
        // }
        // else if(lexems[i].match(options.id2s)){
        //     result.push({
        //         token:"ID2",
        //         lex:lexems[i].match(options.id2s)[0],
        //         start:lexems[i].match(options.id2s)["index"],
        //         len:lexems[i].match(options.id2s)[0].length,
        //         pos:i
        //     })
                       
        // }else if(lexems[i].match(options.NUMS)){
        //     result.push({
        //         token:"NUM",
        //         lex:lexems[i].match(options.NUMS)[0],
        //         start:lexems[i].match(options.NUMS)["index"],
        //         len:lexems[i].match(options.NUMS)[0].length,
        //         pos:i
        //     })            
        // }
        // else if(lexems[i].match(options.OPERATORS)){
        //     result.push({
        //         token:"OPEATORS",
        //         lex:lexems[i].match(options.OPERATORS)[0],
        //         start:lexems[i].match(options.OPERATORS)["index"],
        //         len:lexems[i].match(options.OPERATORS)[0].length,
        //         pos:i
        //     })            
        // }
       
    }
    return result;
   
}

function toHtml(parsedSQL){
    let html="";
    
    for(let parsedItem of parsedSQL){
        html+=`<tr>
        <td>${parsedItem.pos}</td>
        <td>${parsedItem.token}</td>
        <td>${parsedItem.lex}</td>
        <td>${parsedItem.start}</td>
        <td>${parsedItem.len}</td>
        </tr>`
    }

    return html;

}


console.log(
    sqlParser("Insert into CYCLE values (1, 'Цикл ГСЕ дисциплін вибору')",options)
    );
