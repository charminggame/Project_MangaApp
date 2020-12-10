var db = firebase.firestore();



function detail(Name, N) {


    console.log(Name);
    var Text = "one shot"
    var c = 0;

    db.collection("manga").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var DBname = `${doc.data().Name}`
            var DBnumber = `${doc.data().N}`
            var DBchapter = `${doc.data().chapter}`
            var c1 = 0;
            var card = `<div class="containner">
                        <div class="container_r1" >
                        <div class="row ">
                            <div class="col-5 " style=" border: 2px solid rgb(240, 230, 230);">
                                <img src="${doc.data().Poster}" alt="" width="120px" height="240px"
                                    style=" margin-right: 40px; margin-top: 25px;">
            
                            </div>
                            <div class="col-7 order-12"  style="border: 2px solid rgb(231, 228, 228);">
                                <h5 style=" margin-top: 15px; font-family: 'Itim', cursive;">
                                    เรื่องย่อ " ${doc.data().Detail}"
                                </h5>
                               
            
                            </div>
            
                        </div>
                    </div>
            
                    <div class="container_r2" style=" border: 2px solid rgb(255, 165, 48); font-family: 'Itim', cursive;">
                        <i class='fas fa-calendar-alt' style='font-size:26px; margin-left: 10px;'> Chapters</i>

                    <div class="ep" style="margin-left: 10px; margin-top: 5px; border: 2px solid rgb(255, 255, 255);" onclick="PuP('${DBname}')" >
                            <p>
                                ตอนที่ ${doc.data().chapter} <br>
                                ${doc.data().chaptername}
                            </p>
                        </div>`


            var card3 = ` </div>
                    <div class="container_r3" style="font-family: 'Itim', cursive;">
                        <div class="lastbox1">
                        <button type="button" class="btn btn-light">
                        <div class="row">
                          &nbsp&nbsp
                        <ons-icon icon="md-favorite" size="40px"></ons-icon>
                        <h2>&nbspส่งข้อความหาผู้เขียน&nbsp&nbsp</h2>
                        </div>
                        </button>
                        </div>
                        <div class="lastbox2">
                        <button type="button" class="btn btn-danger" onclick="Addremove(${doc.data().N})">
                        <div class="row">
                          &nbsp&nbsp
                        <ons-icon icon="md-favorite" size="40px"></ons-icon>
                        <h2>&nbspFavorite&nbsp&nbsp</h2>
                        </div>
                        </button>
                        </div>
                    </div>
                    `;
            if (String(Name) === String(DBname)) {
                c++;
                c1++;
                if (c === 1) {
                    for (var i = 1; i <= c; i++) {
                        console.log(doc.data().chapter);
                        var chapter = `<option value="${doc.data().chapter}">ตอนที่ ${doc.data().chapter}</option>`
                        $("#select" + i).append(chapter);
                        console.log(chapter);
                    }
                } else {
                    for (var i = 2; i <= c; i++) {
                        var chapter = `<option value="${doc.data().chapter}">ตอนที่ ${doc.data().chapter}</option>`
                        $("#select" + i).append(chapter);
                        console.log(chapter);
                    }
                }
                if (Number(N) === Number(DBnumber)) {
                    $("#D1").append(card);
                    $("#D3").append(card3);
                }
            }
        

        });
    })
}

function PuP(DBname) {
    db.collection("manga").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if(DBname == doc.data().Name){
                console.log(DBname);
                read(DBname);
    document.querySelector('#D1Nvise').pushPage('view/Read.html');
            }

        });
    })
    
  }
  


function detail2(Name, N) {
    var Text = "one shot"
    var c = 0;
    var db = firebase.firestore();
    db.collection("manga").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var DBname = `${doc.data().Name}`
            var DBnumber = `${doc.data().N}`
            var DBchapter = `${doc.data().chapter}`
            var c1 = 0;
            var card = `<div class="containner">
                        <div class="container_r1" >
                        <div class="row ">
                            <div class="col-5 " style=" border: 2px solid rgb(240, 230, 230);">
                                <img src="${doc.data().Poster}" alt="" width="120px" height="240px"
                                    style=" margin-right: 40px; margin-top: 25px;">
            
                            </div>
                            <div class="col-7 order-12"  style="border: 2px solid rgb(231, 228, 228);">
                                <h5 style=" margin-top: 15px; font-family: 'Itim', cursive;">
                                    เรื่องย่อ " ${doc.data().Detail}"
                                </h5>
                               
            
                            </div>
            
                        </div>
                    </div>
            
                    <div class="container_r2" style=" border: 2px solid rgb(255, 165, 48); font-family: 'Itim', cursive;">
                        <i class='fas fa-calendar-alt' style='font-size:26px; margin-left: 10px;'> Chapters</i>

                    <div class="ep" style="margin-left: 10px; margin-top: 5px; border: 2px solid rgb(255, 255, 255);" onclick="PuP('${DBname}')" >
                            <p>
                                ตอนที่ ${doc.data().chapter} <br>
                            </p>
                        </div>
                        <div class="ep" style="margin-left: 10px; margin-top: 5px; border: 2px solid rgb(255, 255, 255);" onclick="PuP('${DBname}')" >
                        <p>
                            ตอนที่ 2 <br>
                        </p>
                    </div>`


            var card3 = ` </div>
                    <div class="container_r3" style="font-family: 'Itim', cursive;">
                        <div class="lastbox1">
                        <button type="button" class="btn btn-light">
                        <div class="row">
                          &nbsp&nbsp
                        <ons-icon icon="md-favorite" size="40px"></ons-icon>
                        <h2>&nbspส่งข้อความหาผู้เขียน&nbsp&nbsp</h2>
                        </div>
                        </button>
                        </div>
                        <div class="lastbox2">
                        <button type="button" class="btn btn-danger" onclick="Addremove(${doc.data().N})">
                        <div class="row">
                          &nbsp&nbsp
                        <ons-icon icon="md-favorite" size="40px"></ons-icon>
                        <h2>&nbspFavorite&nbsp&nbsp</h2>
                        </div>
                        </button>
                        </div>
                    </div>
                    `;
            if (String(Name) === String(DBname)) {
                c++;
                c1++;
                // if (c === 1) {
                //     for (var i = 1; i <= c; i++) {
                //         $("#select" + i).append(chapter);
                //     }
                // } else {
                //     for (var i = 2; i <= c; i++) {
                //         $("#select" + i).append(chapter);
                //     }
                // }
                if (Number(N) === Number(DBnumber)) {
                    $("#D1").append(card);
                    $("#D3").append(card3);
                }
            }
        

        });
    })
}
