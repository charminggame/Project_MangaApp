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

  $("#signout").click(function () {
    firebase.auth().signOut()
      .then(function () {
        // Sign-out successful.
      }).catch(function (error) {
        // An error happened.
      });
  });
})

document.addEventListener('init', function (event) {
  var page = event.target;

  if (page.id === 'index') {
    page.querySelector('#profile').onclick = function () {
      document.querySelector('#Navispl').pushPage('view/profile.html');
    };

    page.querySelector('#home').onclick = function () {
      document.querySelector('#Navispl').pushPage('view/home.html');
    };

    page.querySelector('#search').onclick = function () {
      document.querySelector('#Navispl').pushPage('view/search.html');
    };
  }
  else if (page.id === 'home') {

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


function Searchmanga() {
  const search = document.getElementById('searchText').value;
  const rpsearchText = search.replace(/ /g, "");
  var db = firebase.firestore();
  $("#Research").empty();
  db.collection("manga").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const title = doc.data().Name;
      const rptitlemovie = title.replace(/ /g, "");
      var card = `
<div class="card mb-3" style="max-width: 540px;">
<div class="row no-gutters">
    <div class="col">
    <div>
      <img src="${doc.data().Poster}" class="card-img">
    </div>
    </div>
    <div class="col">
      <div class="card-body">
        <h5 class="card-title">${doc.data().Name}</h5>
      </div>
    </div>
    <div class="col">
      <div class="card-body">
        <ons-icon icon="md-favorite" size="40px"></ons-icon>
      </div>
    </div>
  </div>
</div>
                `;
      if (rptitlemovie.toLowerCase().indexOf(rpsearchText.toLowerCase()) != -1) {
        $("#Research").append(card);
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
  <img src="${doc.data().Poster}" class="card-img">
</div>
</div>
<div class="col">
  <div class="card-body">
    <h5 class="card-title">${doc.data().Name}</h5>
  </div>
</div>
<div class="col">
  <div class="card-body">
    <ons-icon icon="md-favorite" size="40px"></ons-icon>
  </div>
</div>
</div>
</div>
                `;
      if (Gn.toLowerCase().indexOf(N) != -1) {
        $("#Research").append(card);
      }else{
        if(N === 0){
        $("#Research").append(card);
      }}
    });
  })
}