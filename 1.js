// <![CDATA[

var N=4;

var los = new Array();
kkk = new Array();
var dsp = new Array();
var rr = new Array();
var old = new Array(8);
var current = new Array(8);
var click_los = new Array(8);
var found_solutions = new Array(92);

found_solutions[0]="";
found_solutions[1]="";
found_solutions[2]="";
found_solutions[3]="";
found_solutions[4]="";
found_solutions[5]="";

var f_s_count=0;

los[0]=0;
los[1]=0;
los[2]=0;
los[3]=0;
los[4]=0;
los[5]=0;
los[6]=0;
los[7]=0;

var delay;

var count = 0;
var alt = 0;
var sol =0;
var ls = 0;
var cc = 0;
var sol = 0;
var mode_flag=1;
var block_flag=0;
var brett_flag = 0;
var print_count = 0;
var click_count=0;

var x;
var richtung = true;
var delta = 2;
var pos = 100;

function init_lauf() {
        x = document.getElementById("div1");
        setInterval("neuePosition()", 100);
}

function neuePosition() {

                pos -= delta;
                if (pos < -100) pos=2000;


        x.style.left = pos + "px";
}


function init(x,y) {
  click_count=0;
  f_s_count=0;
  brett_flag=0;
  count = 0;
  print_count=0;
  alt = 0;
  sol = 0;
  ls = 0;
  cc = 0;
  ls = 0;
  delay=100;
  document.getElementById("p2").innerHTML = sol;
  for (var j=0;j<x;j++)
        rr[j] = new Array(y);

  for (var j=0;j<y;j++) {
        dsp[j]=0;
        old[j]=0;
        current[j]=0;
        los[j]=0;
  }
  for (j=0;j<N;j++)
        for (i=0;i<N;i++)
                  document.getElementsByTagName("TR")[i].getElementsByTagName("TD")[j].style.backgroundImage="none"




//delay=document.getElementById("auswahl").value;
document.veloFormular.auswahl_velo[0].checked = true;


for (i=0;i<92;i++)
        found_solutions[i]="";


deleteSolutions();
}



function get_radio(radioGruppe) {
        var gewaehlt = null;
        for (i = 0; i < radioGruppe.length; i++) {
                if (radioGruppe[i].checked)
                        gewaehlt = radioGruppe[i];
        }
        return gewaehlt;
}

function abfrage() {
        var r = get_radio(document.veloFormular.auswahl_velo);
        if (r != null) {
                delay=r.value;
        }
}


function mode_abfrage() {
        var r = get_radio(document.mode_form.auswahl_mode);
        if (r != null) {

                if (r.value == 1) {
                        mode_flag=1;
                        init(100000,N);

                }
                if (r.value == 0){
                        mode_flag=0;
                        init(100000,N);
                        solve(0);
                        /*pp(alt,N);*/
                        setzeDame();
                }

        }
}


function ausgabe(auswahl) {
        var i = auswahl.selectedIndex;

        if (i==0)
                N = 4;
        if (i==1)
                N = 5;
        if (i==2)
                N = 6;
        if (i==3)
                N = 7;
        if (i==4)
                N = 8;
        brett_flag=1;
        deleteBrett();
        paintBrett(N);
        init(100000,N);
        document.mode_form.auswahl_mode[0].checked = true;
        mode_flag=1;


}



function paintBrett(n)
{
  // Declare variables and create the header, footer, and caption.
  var oTable = document.createElement("TABLE");
      oTable.id="test";

  var oTBody0 = document.createElement("TBODY");


  var oRow, oCell;
  var i, j;




  // Insert the created elements into oTable.

  oTable.appendChild(oTBody0);



  // Insert rows and cells into bodies.
  for (i=0; i<n; i++)
  {
    var oBody = oTBody0;
    oRow = document.createElement("TR");
    oBody.appendChild(oRow);

    for (j=0; j<n; j++)
    {
      oCell = document.createElement("TD");
      if (((i+j) % 2) !=0)
        oCell.className="c2";
      else
        oCell.className="c1";

      //oCell.innerHTML = i+j;
      oRow.appendChild(oCell);

    }

  }

  // Set the background color of the first body.
  //oTBody0.setAttribute("bgColor","lemonchiffon");

  oTable.className="brett";

  // Insert the table into the document tree.
  //oTableContainer.appendChild(oTable);
  document.getElementById("oTableContainer").appendChild(oTable);
}


function deleteBrett () {
  var i=0;
  var Knoten;

  if (document.getElementById("oTableContainer").childNodes[0].nodeName != "TABLE")
          Knoten=document.getElementById("oTableContainer").childNodes[1];
  else
        Knoten=document.getElementById("oTableContainer").childNodes[0];

  verschwunden = document.getElementById("oTableContainer").removeChild(Knoten);


}


function deleteSolutions () {
        var parent = document.getElementById("links").parentNode;

        var kn_links = document.getElementById("links");
        var verschwunden = document.getElementById("links").parentNode.removeChild(kn_links);
        var y = document.createElement("div");
        parent.appendChild(y).id="links";


        var kn_mitte = document.getElementById("mitte");
        var verschwunden = document.getElementById("mitte").parentNode.removeChild(kn_mitte);
        var y = document.createElement("div");
        parent.appendChild(y).id="mitte";

        var kn_rechts = document.getElementById("rechts");
        var verschwunden = document.getElementById("rechts").parentNode.removeChild(kn_rechts);
        var y = document.createElement("div");
        parent.appendChild(y).id="rechts";



}


function free_f(px,py){
        var x;
        var j;

        for (x=0;x<py;x++){
                if ((los[x] == px) ||(Math.abs(los[x] - px) == Math.abs(x - py)))

                                return 0;
                }

    return 1;
}


function solve(col) {
        var i;
        var j;
        var flag;

        if (col == N) {
                        count++;
        rr[alt][N]="L";
        }
        else {
                for (i=0;i<N;i++) {
                        kkk[col]=i;
                        dsp[col]=i+1;

                        flag=free_f(i,col);
                        if (flag == 1) {
                                los[col]=i;
                                kkk[col]=i;
                                dsp[col]=i+1;

                                for (j=0;j<N;j++) {

                                        //document.getElementById("p1").innerHTML += dsp[j] + " ";
                                        rr[alt][j] = dsp[j];
                                }
                                alt++;
                                //document.getElementById("p1").innerHTML += "<br />";
                                solve(col+1);
                        }
                        for (j=0;j<N;j++) {

                                        //document.getElementById("p1").innerHTML += dsp[j] + " ";
                                        rr[alt][j] = dsp[j];
                        }
                        alt++;
                                //document.getElementById("p1").innerHTML += "<br />";
                    kkk[col]=0;
                    dsp[col]=0;
                }
        }
}


function sleep(milliSeconds){
var startTime = new Date().getTime(); // get the current time
while (new Date().getTime() < startTime + milliSeconds); // hog cpu
}




function pp(x,y) {
for (var j=0;j<x;j++) {
        for (var i=0;i<=y;i++) {

                document.getElementById("p1").innerHTML += rr[j][i] + " ";
        }
        document.getElementById("p1").innerHTML += "<br />";
}

}

function loescheDame () {
for (var i=0;i<N;i++) {
        var cell_del=current[i]-old[i];
        if (cell_del != 0)  {
                var cell_col=i;
                if (old[i] != 0) {
                        var cell_row=old[i]-1 ;

                        document.getElementsByTagName("TR")[cell_row].getElementsByTagName("TD")[cell_col].style.backgroundImage="none";
                }
        }
}
}




function click_free(rr,cc) {
var i;
var tmp;
rr=rr+1;
//alert(rr + " " + cc);
for (i=0; i<N ; i++) {
        tmp=los[i];
        if ( tmp != 0) {
                if ( (tmp == rr) || (i == cc) || (Math.abs(tmp - rr) == Math.abs(i - cc)))
                        return 0;
        }
}
return 1;
}


function click_setzeDame(event) {
  var i;
  var f_row;
  var f_col;
  var p_flag=0;
  if (mode_flag == 0)
        return;
  if(event.target){
        e1 = event.target.parentNode.rowIndex;
        e2 = event.target.cellIndex;
  } else {
        e1 = event.srcElement.parentElement.rowIndex;
        e2 = event.srcElement.cellIndex;

  }
  
  if (e1 == undefined)    // Correction implemented on January 8th, 2012; now V1.1
	return;
        if (los[e2] == (e1+1)) {

                                document.getElementsByTagName("TR")[e1].getElementsByTagName("TD")[e2].style.backgroundImage="none";
                                los[e2]=0;
                                click_count--;
                                return;
                        }

        p_flag=click_free(e1,e2);

        if (p_flag == 1) {
                los[e2]=e1+1;
                click_count++;
                document.getElementsByTagName("TR")[e1].getElementsByTagName("TD")[e2].style.backgroundImage="url(queen.jpg)";
                if (click_count == N) {

                        los_schon_gefunden();

                }
        }
        else
                alert("This queen position is not possible");



}

function printSol() {
  var i;
  var s;

  if (mode_flag == 0) {
          s="[";
          for (i=0; i<N ; i++) {
                  s=s+rr[ls][i] + " ";
          }
          s=s+"]" + "<br/>";
        if (print_count < 30)
                document.getElementById("links").innerHTML += s;
        if ((print_count >= 30) && (print_count < 60))
                document.getElementById("mitte").innerHTML += s;
        if (print_count >= 60)
                document.getElementById("rechts").innerHTML += s;
        print_count++;


  }
  if (mode_flag == 1) {
          s="[";
          for (i=0; i<N ; i++) {
                  s=s+los[i] + " ";
          }
          s=s+"]" + "<br/>";
        if (print_count < 30)
                document.getElementById("links").innerHTML += s;
        if ((print_count >= 30) && (print_count < 60))
                document.getElementById("mitte").innerHTML += s;
        if (print_count >= 60)
                document.getElementById("rechts").innerHTML += s;
        print_count++;

  }
}

function los_schon_gefunden() {
  var tmp="";
  var f_flag=0;
  for (var i=0;i<N;i++) {
          tmp=tmp+los[i];

  }

  for (var j=0;j<92;j++) {

        if (found_solutions[j] == tmp)
                f_flag=1;
  }
  if (f_flag==1) {
        alert("Solution already found");

  }
  else {
        found_solutions[f_s_count] = tmp;
        f_s_count++;
        document.getElementById("p2").innerHTML = f_s_count;
        if (N==8)
                var all=92;
        if (N==7)
                var all=40;
        if (N==6)
                var all=4;
        if (N==5)
                var all=10;
        if (N==4)
                var all=2;


        alert("Solution found"+" ("+f_s_count +" out of "+ all +")");
        printSol();

  }

}

function setzeDame () {

  if (brett_flag==1)
        return;

  for (var i=0;i<N;i++) {
          current[i]=rr[ls][i];
  }

  var x=rr[ls][cc];
  var z=rr[ls][N];
  if ((z == "L") && (cc == (N-1))) {
          sol++;
        printSol();
        document.getElementById("p2").innerHTML = sol;
        sleep(2000);
  }

  if (x > 0) {
        var zeile=x;
        var spalte=cc;
        document.getElementsByTagName("TR")[zeile-1].getElementsByTagName("TD")[spalte].style.backgroundImage="url(queen.jpg)";
  }

  loescheDame();

  cc++;
  if (cc == N) {
        cc = 0;
        ls++;
        if (ls > 0) {
                for (var i=0;i<N;i++) {
                        old[i]=current[i];
                    }
        }

        //document.getElementById("p1").innerHTML = ls;

  }
  setTimeout("setzeDame()",delay);
}





function run() {
  init(100000,N);
  paintBrett(N);
  solve(0);
  /*pp(alt,N);*/
  setzeDame();
}
//]]>