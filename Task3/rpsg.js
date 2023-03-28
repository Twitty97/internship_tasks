class generateRandomKey {

    static randomKey = (a) => {
        var crypto = require('crypto');
        this.secretkey = crypto.randomBytes(32).toString('hex').toUpperCase();
        this.move = a[Math.floor(Math.random() * a.length)];
        // console.log("check comp move => his move is: " + this.move);
        computeHMAC.generateHMAC(this.secretkey, this.move);
    }
}

class computeHMAC{
    static generateHMAC = (secretkey, move) =>{
        var crypto = require('crypto');
        var hmac = crypto.createHmac('sha256', secretkey);
        let data = hmac.update(move);
        let gen_hmac= data.digest('hex');
        console.log("\nHMAC : " + gen_hmac.toUpperCase());
    }
}

class gameRules {
    static computeMove = (input) => {
        let index = input - 1;
        let cMove_index = a.indexOf(generateRandomKey.move);
        let len = a.length;
        let mid = Math.floor(len/2);
        let check = false;
        console.log("Computer Move is: " + generateRandomKey.move);

        if(cMove_index == index){
            console.log("Draw!");
        }

        else {

        let counter = 0;
        for(let k = index + 1; k < (mid + index + 1); k++){
            // console.log("Before => index: "+ index, "k: " + k, "mid: " + mid, "k < " + (mid + index  + 1), "cmove_index: " + cMove_index, "counter: " + counter);
            if(a.indexOf(a[k]) == -1){
                k = 0;
                mid = mid - index - counter - 1;
            }
                    if(k == cMove_index){
                    console.log("You lost!");
                    check = true;
                    break; 
                }
                counter++;
                // console.log("After => index: "+ index, "k: " + k, "mid: " + mid, "k < " + (mid + index  + 1), "cmove_index: " + cMove_index, "counter: " + counter);
        }
        if(check != true){
            console.log("You won!");
        }
    }
        console.log("HMAC key: " + generateRandomKey.secretkey);
    }
}

class generateTable {
    static move_result = (i, j) => {
        let len = a.length;
        let index = i;
        let cMove_index = j;
        let mid = Math.floor(len/2);

        let counter = 0;
        for(let k = index + 1; k < (mid + index + 1); k++){
            // console.log("Before => index: "+ index, "k: " + k, "mid: " + mid, "k < " + (mid + index  + 1), "cmove_index: " + cMove_index, "counter: " + counter);
            if(a.indexOf(a[k]) == -1){
                k = 0;
                mid = mid - index - counter - 1;
            }
                    if(k == cMove_index){
                    return false;
        }
                counter++;
                // console.log("After => index: "+ index, "k: " + k, "mid: " + mid, "k < " + (mid + index  + 1), "cmove_index: " + cMove_index, "counter: " + counter);
        }

        return true;

    }
    static showHelp() {
        let len = a.length;
        // let shift = 0;
        var d_table = {}

        for(let i = 0; i < len; i++){
            d_table[a[i]] = [];
            for (let j = 0; j < len; j++){
                if(i==j){
                    d_table[a[i]][a[j]] = 'draw';
                }
                else{
                    if(this.move_result(i, j)==true){
                        d_table[a[i]][a[j]] = 'win';
                    }
                    else {
                        d_table[a[i]][a[j]] = 'lose';
                    }
                }

            }
        }
        console.table(d_table);

        generateMenu.ShowMenu(a);
    }
}

class generateMenu {

    static ShowMenu = (a) => {
        const prompt = require('prompt-sync')();
        let n = a.length;
        console.log('\nAvailable moves: \n');
        for(let i = 0; i < n; i++){
            console.log(i+1 + ' == ' + a[i]);
        }
        console.log('0 == Exit', '\n? == help');
        const input = prompt('Make your move: ');

        if(input == 0){
            console.log("Thank you for playing. Bye!");
            return 0;
        }

        else if(input == '?'){
           generateTable.showHelp();
        }

        else if(a.indexOf(a[input-1]) > -1) {
            console.log("\nYour move is: " + a[input-1]);
            gameRules.computeMove(input);
        }

        else{
            console.log("\nIncorrect input! Check the menu and try again: "); this.ShowMenu(a);
        }
    }

}


const a = process.argv.slice(2);
let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) !== index);
if(a.length > 1 && a.length%2!=0 && findDuplicates(a) == 0) 
{ 
    generateRandomKey.randomKey(a);
    generateMenu.ShowMenu(a);
}

else {
    console.log("Incorrect input!")
    if(a.length <= 1){
    console.log("There should be at least 3 moves."); }
    if(a.length%2==0){
    console.log("The number of moves should be an odd number.");}
    if(findDuplicates(a)!=0){
    console.log("The moves should not repeat.");
} console.log("\nExample: MOVE1 MOVE2 MOVE3 or Rock Paper Scissors or Rock Paper Scissors Lizard Spock or 1 2 3 4 5 6 7 8 9.");}
