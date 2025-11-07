
        document.getElementById("demo").innerText="welcome Message";  
        x=prompt("enter x value:");
        let num=parseInt(x);
        if(x>0){
         document.getElementById("demo").innerText="num is +ve";
        }else if(x<0){
            document.getElementById("demo").innerText="num is -ve";
        }
        else{
             document.getElementById("demo").innerText="num is 0";
        }
        