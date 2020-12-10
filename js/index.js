var nu = "";
$(function () {

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      displayName = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;

      $("#username").text(email);
      $("#displayname").text(displayName);
      $("#photo").attr("src", photoUrl);

    } else {
      window.location.href = 'Signin.html';
    }
  });

})

function signout() {
  firebase.auth().signOut()
    .then(function () {
      // Sign-out successful.
    }).catch(function (error) {
      // An error happened.
    });
};

function getdetail(N) {
  console.log(N)
  if (Number(N) === 1) {
    detail("GuraAmi", 1)
    console.log(1)
  } else if (Number(N) === 2) {
    detail2("Koi wa Iikara Nemuritai!", 2)
    console.log(2)
  } else if (Number(N) === 3) {
    detail("Kinakochan", 3)
    console.log(3)
  } else if (Number(N) === 4) {
    detail("14 sai no onna shachou neet o hirou", 4)
    console.log(4)
  } else if (Number(N) === 5) {
    detail("SPAWN", 5)
    console.log(5)
  }
  document.querySelector('#SNvise').pushPage('view/detail.html');
}

function mail(){
  document.querySelector('#D1Nvise').pushPage('view/chat.html');
}



document.addEventListener('init', function (event) {
  var page = event.target;

  if (page.id === 'index') {
    page.querySelector('#profile').onclick = function () {
      $("#D").empty();
      document.querySelector('#Navispl').pushPage('view/profile.html');
      Profile();
    };

    page.querySelector('#home').onclick = function () {
      document.querySelector('#Navispl').pushPage('view/home.html');
    };

    page.querySelector('#search').onclick = function () {
      document.querySelector('#Navispl').pushPage('view/search.html');
    };
  }
  else if (page.id === 'home') {
    page.querySelector('#a1').onclick = function () {
      document.querySelector('#myNavigator').pushPage('view/detail.html');
      detail("GuraAmi", 1)
    };

    page.querySelector('#a2').onclick = function () {
      document.querySelector('#myNavigator').pushPage('view/detail.html');
      detail2("Koi wa Iikara Nemuritai!", 2)
    };

    page.querySelector('#a3').onclick = function () {
      document.querySelector('#myNavigator').pushPage('view/detail.html');
      detail("Kinakochan", 3)
    };

    page.querySelector('#b2').onclick = function () {
      document.querySelector('#myNavigator').pushPage('view/detail.html');
      detail2("Koi wa Iikara Nemuritai!", 2)
    };

    page.querySelector('#b1').onclick = function () {
      document.querySelector('#myNavigator').pushPage('view/detail.html');
      detail("GuraAmi", 1)
    };

    page.querySelector('#b4').onclick = function () {
      document.querySelector('#myNavigator').pushPage('view/detail.html');
      detail("14 sai no onna shachou neet o hirou", 4)
    };

  } else if (page.id === 'favorite') {
    favorite()
  } 
})

window.fn = {};

window.fn.toggleMenu = function () {
  document.getElementById('Navispl').right.toggle();
};

window.fn.loadView = function (index) {
  document.getElementById('appTabbar').setActiveTab(index);
  document.getElementById('menu').close();
};

window.fn.loadLink = function (url) {
  window.open(url, '_blank');
};

window.fn.pushPage = function (page, anim) {
  if (anim) {
    document.getElementById('Navispl').pushPage(page.id, { data: { title: page.title }, animation: anim });
  } else {
    document.getElementById('Navispl').pushPage(page.id, { data: { title: page.title } });
  }
};

function logo() {
  var db = firebase.firestore();
  db.collection("logo").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      var card = ` <img src="${doc.data().link}" width="100%">`;
      $("#logo").append(card);

    });
  })
}

$(function () {
  var db = firebase.firestore();
  db.collection("manga").get().then((querySnapshot) => {

    querySnapshot.forEach((doc) => {
      var c = `${doc.data().N}`
      var card = ` <img src="${doc.data().Poster}" width="380" height="480" id="a${doc.data().N}">
              <div style="text-align: center;"><B>${doc.data().Name}</B> </div>
              `;
      $("#a" + c).append(card);
    });
  })
})

$(function () {
  var db = firebase.firestore();
  db.collection("manga").get().then((querySnapshot) => {

    querySnapshot.forEach((doc) => {
      var c = `${doc.data().N}`
      var card = ` <img src="${doc.data().Poster}" width="380" height="480" id="a${doc.data().N}">
              <div style="text-align: center;"><B>${doc.data().Name}</B> </div>
              `;
      $("#b" + c).append(card);
    });
  })
})


function Searchmanga() {
  const search = document.getElementById('searchText').value;
  const rpsearchText = search.replace(/ /g, "");
  var db = firebase.firestore();
  $("#Research").empty();
  db.collection("manga").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const title = doc.data().Name;
      const rptitlemanga = title.replace(/ /g, "");
      var card = `
      <div class="card mb-3" style="max-width: 540px;">
      <div class="row no-gutters" id="s${doc.data().N}">
      <div class="col">
      <div>
        <img src="${doc.data().Poster}" class="card-img" width="120px">
      </div>
      </div>
      <div class="col">
      <div class="row no-gutters">
        <div class="card-body">
          <h5 class="card-title">ชื่อเรื่อง : ${doc.data().Name}</h5>
        <h5 class="card-title">ตอนที่ : ${doc.data().chapter}</h5>
        </div>
      </div>
      <div class="col">
        <div class="card-body">
        <button type="button" class="btn btn-outline-dark" id="s${doc.data().N}" style="width: 100px;" onclick="getdetail(${doc.data().N})">Detail</button>
        <ons-icon icon="md-favorite" size="40px" onclick="Addremove(${doc.data().N})"></ons-icon>
        </div>
      </div>
      </div>
      </div>
      </div>
                `;
      if (rptitlemanga.toLowerCase().indexOf(rpsearchText.toLowerCase()) != -1) {
        if (`${doc.data().N}` !== nu) {
          $("#Research").append(card);
        }
      }
    });
  })
}


function buttonsearch(N) {
  var db = firebase.firestore();
  $("#Research").empty();
  db.collection("manga").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      var Gn = `${doc.data().Number}`
      var card = `
<div class="card mb-3" style="max-width: 540px;">
<div class="row no-gutters" id="s${doc.data().N}">
<div class="col">
<div>
  <img src="${doc.data().Poster}" class="card-img" width="120px">
</div>
</div>
<div class="col">
<div class="row no-gutters">
  <div class="card-body">
    <h5 class="card-title">ชื่อเรื่อง : ${doc.data().Name}</h5>
  <h5 class="card-title">ตอนที่ : ${doc.data().chapter}</h5>
  </div>
</div>
<div class="col">
  <div class="card-body">
  <button type="button" class="btn btn-outline-dark" id="s${doc.data().N}" style="width: 100px;" onclick="getdetail(${doc.data().N})">Detail</button>
  <ons-icon icon="md-favorite" size="40px" onclick="Addremove(${doc.data().N})"></ons-icon>
  </div>
</div>
</div>
</div>
</div>
                `;
      if (Gn.toLowerCase().indexOf(N) != -1) {
        if (`${doc.data().N}` !== nu) {
          $("#Research").append(card);
        }

      } else {
        if (N === 0) {
          if (`${doc.data().N}` !== nu) {
            $("#Research").append(card);
          }
        }

      }
    });
  })
}

function buttonsearch2(N) {
  var db = firebase.firestore();
  $("#Research").empty();
  db.collection("manga").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      var Gn = `${doc.data().NumberMC}`
      var card = `
      <div class="card mb-3" style="max-width: 540px;">
      <div class="row no-gutters" id="s${doc.data().N}">
      <div class="col">
      <div>
        <img src="${doc.data().Poster}" class="card-img" width="120px">
      </div>
      </div>
      <div class="col">
      <div class="row no-gutters">
      <div class="card-body">
        <h5 class="card-title">ชื่อเรื่อง : ${doc.data().Name}</h5>
      <h5 class="card-title">ตอนที่ : ${doc.data().chapter}</h5>
      </div>
    </div>
      <div class="col">
        <div class="card-body">
        <button type="button" class="btn btn-outline-dark" id="s${doc.data().N}" style="width: 100px;" onclick="getdetail(${doc.data().N})">Detail</button>
        <ons-icon icon="md-favorite" size="40px" onclick="Addremove(${doc.data().N})"></ons-icon>
        </div>
      </div>
      </div>
      </div>
      </div>
                `;
      if (Gn.toLowerCase().indexOf(N) != -1) {
        if (`${doc.data().N}` !== nu) {
          $("#Research").append(card);
        }

      } else {
        if (N === 0) {
          if (`${doc.data().N}` !== nu) {
            $("#Research").append(card);
          }
        }

      }
    });
  })
}

function Addremove(NManga) {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var db = firebase.firestore();
      var Up = db.collection("Profile").doc(user.email);
      db.collection("Profile").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var Pemail = `${doc.data().Email}`
          var email = user.email;
          if (email === Pemail) {
            var c = 0;
            for (let i = 0; i < 16; i++) {
              if (Number(NManga) !== Number(`${doc.data().Favorite[i]}`)) {
                Up.update({
                  Favorite: firebase.firestore.FieldValue.arrayUnion(NManga)
                }).then(function () {
                  console.log("Document successfully updated!");
                })
                  .catch(function (error) {
                    console.error("Error updating document: ", error);
                  });
              } else if (Number(NManga) === Number(`${doc.data().Favorite[i]}`)) {
                c = 1;
              }
            }
            if (c === 1) {
              Up.update({
                Favorite: firebase.firestore.FieldValue.arrayRemove(NManga)
              }).then(function () {
                console.log("Document successfully Remove!");
              })
                .catch(function (error) {
                  console.error("Error updating document: ", error);
                });
            }

          }

        }
        )

      }).then(function () {
        $("#datafavorite").empty();
        favorite()
      })
    }
  })
}

function favorite() {
  var id = [];
  var db = firebase.firestore();
  db.collection("Profile").get().then((querySnepshot) => {
    querySnepshot.forEach((doc) => {
      var Pemail = `${doc.data().Email}`
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          var email = user.email;
          if (email === Pemail) {
            for (let i = 0; i < 16; i++) {
              id[Number(i)] = `${doc.data().Favorite[i]}`
            }
          }
        }
      })
    })
  })
    .then((connect) => {
      db.collection("manga").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          for (let i = 0; i < 16; i++) {
            if (id[i] === 'undefined') {

            } else if (Number(id[i]) === Number(`${doc.data().N}`)) {
              var Detail = `
                      <ons-row class='box_F'>
                          <ons-col class="gg">
                              <img src="${doc.data().Poster}" width="130" height="190">
                              <ons-row class="margin">
                                  <ons-col>
                                      <h4> <b>${doc.data().Name}</h4><small>${doc.data().tag} | chapter : ${doc.data().chapter}</small>
                                  </ons-col>
          
                                  <ons-col>
                                      
                                      <ons-icon icon="heart" size="30px" style="color: red" onclick="Addremove(${doc.data().N})">
                                      </ons-icon>
                                  </ons-col>
                              </ons-row>
                          </ons-col>
                      </ons-row>
                      <br>
                      </div>`
              $("#datafavorite").append(Detail);
            }
          }
        });
      })
    });
}

function editSelects(event) {
  var re = document.getElementById('choose-sel').value;
  console.log(re);
}

$(function () {
  var db = firebase.firestore();
  db.collection("Profile").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      var Pemail = `${doc.data().Email}`
      var pf = `<div class="profile-card">
                          <div class="card-header">
                            <div class="pic">
                              <img src="pic.png" alt="">
                            </div>
                            <div class="name">${doc.data().Name}</div>
                            <div class="desc">Developer & Designer</div>
                            <div class="sm">
                              <a href="#" class="fab fa-facebook-f"></a>
                              <a href="#" class="fab fa-twitter"></a>
                              <a href="#" class="fab fa-github"></a>
                              <a href="#" class="fab fa-youtube"></a>
                            </div>
                            <a href="#" class="contact-btn" onclick="signout()">Sight out</a>
                          </div>
                          <div class="card-footer">
                            <div class="numbers">
                              <div class="item">
                                <span>50</span>
                                Book
                              </div>
                              <div class="border"></div>
                              <div class="item">
                                <span>${doc.data().Favorite.length}</span>
                                Favorite
                              </div>
                              <div class="border"></div>
                              <div class="item">
                                <span>3</span>
                                category
                              </div>
                            </div>
                          </div>
                        </div>

          `;
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          var email = user.email;
          if (email === Pemail) {
            $("#D").append(pf);
          } else if (email.toLowerCase().indexOf("gmail") != -1) {
            var pfg = `
                          <img class="img" src="`+ user.photoUR + `" width="100" height="100">
                          <br>
                          <div>
                              <B>`+ user.displayName + `</B>
                          </div>
          `;
            // $("#D").append(pfg);
          }
        }
      });

    }
    )
  })
})

function Profile() {
  var db = firebase.firestore();
  db.collection("Profile").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      var Pemail = `${doc.data().Email}`
      var pf = `<div class="profile-card">
                          <div class="card-header">
                            <div class="pic">
                              <img src="pic.png" alt="">
                            </div>
                            <div class="name">${doc.data().Name}</div>
                            <div class="desc">Developer & Designer</div>
                            <div class="sm">
                              <a href="#" class="fab fa-facebook-f"></a>
                              <a href="#" class="fab fa-twitter"></a>
                              <a href="#" class="fab fa-github"></a>
                              <a href="#" class="fab fa-youtube"></a>
                            </div>
                            <a class="contact-btn" onclick="signout()">Sight out</a>
                          </div>
                          <div class="card-footer">
                            <div class="numbers">
                              <div class="item">
                                <span>50</span>
                                Book
                              </div>
                              <div class="border"></div>
                              <div class="item">
                                <span>${doc.data().Favorite.length}</span>
                                Favorite
                              </div>
                              <div class="border"></div>
                              <div class="item">
                                <span>3</span>
                                category
                              </div>
                            </div>
                          </div>
                        </div>

          `;
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          var email = user.email;
          if (email === Pemail) {
            $("#D").append(pf);
          } else if (email.toLowerCase().indexOf("gmail") != -1) {
            var pfg = `
                          <img class="img" src="`+ user.photoUR + `" width="100" height="100">
                          <br>
                          <div>
                              <B>`+ user.displayName + `</B>
                          </div>
          `;
            // $("#D").append(pfg);
          }
        }
      });

    }
    )
  })
}