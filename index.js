
let options = {
    SYMBOL:/[\])}\'[{(]/,
    KEYWORDS:/^union$|^intersect$|^values$|^insert$|^into$|^create$|^drop$|^descrive$|^table$|^update$|^delete$|^integer$|^text$|^distinct$|^having$|^order by$|^between$|^like$|^join$|^in$|^view$/i,
    id2s: /^[a-z]+-\w+/i,
    id1s: /^[_a-z]+\w+/i,    
    LITERALS:/^[\u0400-\u052F\u2DE0-\u2DFF\uA640-\uA69F']+$/, 
    NUMS: /\d+/,
    OPERATORS:/^(\+|-|\*|\/|=|:=|>|<|>=|<=|&|\||%|!|\^)$/

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
                break;         
            }
          }

      
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


